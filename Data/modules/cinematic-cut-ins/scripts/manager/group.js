/* --- START OF FILE manager/group.js --- */

import {
  polygonCentroid,
  polygonBounds,
  polygonToClipPath,
  sanitizeManualPanels,
} from "../manual-panel-geometry.js";
import {
  MANUAL_CUT_LINE_VIEWBOX,
  appendManualCutLine,
} from "../manual-panel-line-renderer.js";
import { applyCinematicEffectElements } from "../cinematic-effects.js";
import { applyScreenMoodElement } from "../screen-mood.js";
import {
  createPlaybackDeferred,
  playbackResult,
  shouldPreservePlaybackAudio,
} from "../playback-lifecycle.js";

function resolveManualMode(global, participantCount) {
  const inactive = { active: false, panels: null };
  if (!global || global.panelMode !== "manual") return inactive;
  const panels = sanitizeManualPanels(global.manualPanels, participantCount);
  if (!panels) return inactive;
  return { active: true, panels };
}

function applyManualPanelToSlice(slice, panel) {
  if (!panel || !Array.isArray(panel.points)) return;
  const clip = polygonToClipPath(panel.points);
  if (!clip) return;
  slice.style.setProperty("--manual-clip", clip);
  slice.style.clipPath = clip;

  const [cx, cy] = polygonCentroid(panel.points);
  const bounds = polygonBounds(panel.points);
  const colLeft = Math.max(0, Math.min(100, bounds.minX));
  const colWidth = Math.max(0, Math.min(100, bounds.maxX - bounds.minX));

  slice.style.setProperty("--base-x", `${cx}%`);
  slice.style.setProperty("--base-y", `${cy}%`);
  slice.style.setProperty("--final-center-x", `${cx}%`);
  slice.style.setProperty("--col-left", `${colLeft}%`);
  slice.style.setProperty("--col-width", `${colWidth}%`);
  slice.style.setProperty("--strip-top", `${bounds.minY}%`);
  slice.style.setProperty("--strip-bottom", `${bounds.maxY}%`);
  slice.style.setProperty("--strip-center", `${cy}%`);
}

function buildManualCutLineOverlay(cuts) {
  if (!Array.isArray(cuts) || cuts.length === 0) return null;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "manual-panel-cut-lines-svg");
  svg.setAttribute("viewBox", MANUAL_CUT_LINE_VIEWBOX);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  let rendered = 0;
  for (const cut of cuts) {
    const line = appendManualCutLine(svg, cut, {
      groupClass: "manual-panel-cut-line-segment",
      imageClass: "manual-panel-cut-line-image",
    });
    if (line) rendered += 1;
  }

  return rendered > 0 ? svg : null;
}

export function renderCinematic(
  container,
  payload,
  isStatic = false,
  playbackAudioId = null,
) {
  if (container._soundTimers && container._soundTimers.length > 0) {
    for (const timer of container._soundTimers) clearTimeout(timer);
  }
  container._soundTimers = [];

  const pendingTimers = [];
  const renderToken = foundry.utils.randomID();
  const audioOwnerId = isStatic
    ? null
    : playbackAudioId || this._createPlaybackInstanceId("group-render");
  container._renderToken = renderToken;

  let participants = [];
  let global = {
    theme: "rebel",
    fontFamily: "Teko",
    subFontFamily: "",
    showNames: false,
    centerMainText: "ALL-OUT ATTACK",
    centerSubText: "TIME TO FINISH IT!",
    shakeIntensity: 0,
    mute: false,

    centerMainColor: "#ffffff",
    centerMainSize: 10,
    centerMainX: 0,
    centerMainY: 0,
    centerSubColor: "#ffffff",
    centerSubSize: 3,
    centerSubX: 0,
    centerSubY: 0,
  };

  if (Array.isArray(payload)) {
    participants = payload;
  } else if (payload?.participants) {
    participants = payload.participants;
    global = { ...global, ...payload.global };
  }

  if (!participants || participants.length === 0) return 0;

  container.innerHTML = "";
  container.className = "cinematic-group-container";
  container.classList.remove("active", "animate");

  const currentTheme = global.theme || "rebel";
  const baseConfig =
    this.THEME_SETTINGS[currentTheme] || this.THEME_SETTINGS["rebel"];

  const speedMultiplier = Number(global.speedMultiplier) || 1.0;
  const config = {
    ...baseConfig,
    interval: baseConfig.interval / speedMultiplier,
    duration: baseConfig.duration / speedMultiplier,
  };

  container.classList.add(`theme-${currentTheme}`);
  if (!global.showNames) container.classList.add("hide-text");

  const manualMode = resolveManualMode(global, participants.length);
  if (manualMode.active) {
    container.dataset.layout = "manual";
    container.dataset.panelMode = "manual";
    container.dataset.manualPanelsSignature = JSON.stringify(manualMode.panels);
  } else {
    container.dataset.layout = config.layout;
    container.dataset.panelMode = "theme";
    delete container.dataset.manualPanelsSignature;
  }
  container.dataset.count = participants.length;
  container.style.setProperty("--cinematic-font", `"${global.fontFamily}"`);
  if (global.subFontFamily && global.subFontFamily !== global.fontFamily) {
    container.style.setProperty(
      "--cinematic-font-sub",
      `"${global.subFontFamily}"`,
    );
  } else {
    container.style.removeProperty("--cinematic-font-sub");
  }
  container.style.setProperty("--anim-duration", `${config.duration}s`);

  const set = (k, v) => container.style.setProperty(k, v);

  // Main Text
  set("--center-main-color", global.centerMainColor || "#ffffff");
  set("--center-main-shadow", global.centerMainShadow || "#000000");
  set("--center-main-size", `${global.centerMainSize || 10}rem`);
  set("--center-main-x", `${global.centerMainX || 0}px`);
  set("--center-main-y", `${global.centerMainY || 0}px`);

  // Sub Text
  set("--center-sub-color", global.centerSubColor || "#ffffff");
  set("--center-sub-shadow", global.centerSubShadow || "#000000");
  set("--center-sub-size", `${global.centerSubSize || 3}rem`);
  set("--center-sub-x", `${global.centerSubX || 0}px`);
  set("--center-sub-y", `${global.centerSubY || 0}px`);

  const count = participants.length;
  let delayIndices = Array.from({ length: count }, (_, i) => i);

  if (config.type !== "mugshot") {
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delayIndices[i], delayIndices[j]] = [delayIndices[j], delayIndices[i]];
    }
  }

  const maxDelay =
    Math.max(...delayIndices) * config.interval + config.duration;
  container.style.setProperty("--total-delay", `${maxDelay}s`);

  for (let i = 0; i < count; i++) {
    let data = participants[i];
    const slice = document.createElement("div");
    slice.className = "cinematic-slice";

    if (manualMode.active) {
      applyManualPanelToSlice(slice, manualMode.panels.panels[i]);
    } else if (config.layout === "full") {
      const colWidth = 100 / count;
      slice.style.setProperty("--col-left", `${colWidth * i}%`);
      slice.style.setProperty("--col-width", `${colWidth}%`);
      const centerPos = colWidth * i + colWidth / 2;
      slice.style.setProperty("--final-center-x", `${centerPos}%`);
    } else if (config.layout === "diagonal") {
      const step = 100 / count;

      const tilt = currentTheme === "arcane" ? 5 : 15;

      const start = i * step;
      const end = (i + 1) * step;
      let clipPoly = "";

      if (i === 0)
        clipPoly = `polygon(-50% 0%, ${end - tilt}% 0%, ${end + tilt}% 100%, -50% 100%)`;
      else if (i === count - 1)
        clipPoly = `polygon(${start - tilt}% 0%, 150% 0%, 150% 100%, ${start + tilt}% 100%)`;
      else
        clipPoly = `polygon(${start - tilt}% 0%, ${end - tilt}% 0%, ${end + tilt}% 100%, ${start + tilt}% 100%)`;

      slice.style.clipPath = clipPoly;
      slice.style.setProperty("--base-x", `${i * step + step / 2}%`);
    } else if (config.layout === "horizontal") {
      const gap = 4.5;
      const maxStripH = 15;
      const autoH = (100 - (count - 1) * gap) / count;
      const stripH = Math.min(autoH, maxStripH);
      const totalH = count * stripH + (count - 1) * gap;
      const offsetY = (100 - totalH) / 2;
      const top = offsetY + i * (stripH + gap);
      const isEven = i % 2 === 0;
      const center = top + stripH / 2;

      slice.style.setProperty("--strip-top", `${top}%`);
      slice.style.setProperty("--strip-bottom", `${top + stripH}%`);
      slice.style.setProperty("--strip-center", `${center}%`);

      if (isStatic) {
        slice.style.clipPath = `polygon(0% ${top}%, 100% ${top}%, 100% ${top + stripH}%, 0% ${top + stripH}%)`;
      } else {
        slice.style.clipPath = `polygon(0% ${center}%, 100% ${center}%, 100% ${center}%, 0% ${center}%)`;
      }

      slice.style.setProperty("--base-x", isEven ? "30%" : "70%");
      slice.style.setProperty("--base-y", `${center}%`);
    }

    slice.style.setProperty("--theme-color", data.color || "#e61c34");
    slice.style.setProperty("--text-color", data.textColor ?? "#ffffff");
    slice.style.setProperty("--char-shadow-color", data.shadow ?? "#000000");
    slice.style.setProperty("--char-scale", data.scale ?? 1.0);
    slice.style.setProperty("--mugshot-zoom", data.zoom ?? 2.0);
    slice.style.setProperty("--zoom-x", `${data.zoomX ?? 0}px`);
    slice.style.setProperty("--zoom-y", `${data.zoomY ?? 0}px`);
    slice.style.setProperty("--char-x", `${data.x ?? 0}px`);
    slice.style.setProperty("--char-y", `${data.y ?? 0}px`);
    slice.style.setProperty("--text-size", `${Number(data.textSize) || 6}rem`);
    slice.style.setProperty("--text-x", `${Number(data.textX) || 0}px`);
    slice.style.setProperty("--text-y", `${Number(data.textY) || 0}px`);
    slice.style.setProperty("--char-rotate", `${data.rotation || 0}deg`);
    slice.style.setProperty("--char-mirror-x", data.mirror ? "-1" : "1");

    const delaySec = delayIndices[i] * config.interval;
    slice.style.setProperty("--delay", `${delaySec}s`);

    if (!isStatic && (data.sound || data.sfx)) {
      pendingTimers.push({
        delay: delaySec * 1000,
        fn: () => {
          if (global.mute) return;
          const soundVol = (data.soundVolume ?? 80) / 100;
          const sfxVol = (data.sfxVolume ?? 80) / 100;

          if (data.sound) {
            const src = data.sound.includes(";")
              ? data.sound
                  .split(";")
                  [
                    Math.floor(Math.random() * data.sound.split(";").length)
                  ].trim()
              : data.sound;
            this._scheduleTrackedAudio(
              { sound: src, soundVolume: soundVol * 100 },
              audioOwnerId,
            );
          }
          if (data.sfx) {
            const src = data.sfx.includes(";")
              ? data.sfx
                  .split(";")
                  [
                    Math.floor(Math.random() * data.sfx.split(";").length)
                  ].trim()
              : data.sfx;
            this._scheduleTrackedAudio(
              { sfx: src, sfxVolume: sfxVol * 100 },
              audioOwnerId,
            );
          }
        },
      });
    }

    slice.innerHTML = `
                <div class="slice-bg"></div>
                <div class="cinematic-custom-layers"></div>
                <img class="cinematic-character" src="${data.img || "icons/svg/mystery-man.svg"}" />
                <div class="slice-text">${data.text || ""}</div>
            `;
    container.appendChild(slice);

    this._updateLayers(slice, { layers: global.layers || [] });

    if (isStatic) {
      const layerContainer = slice.querySelector(".cinematic-custom-layers");
      if (layerContainer) {
        layerContainer.querySelectorAll(".custom-layer-media").forEach((el) => {
          if (el.style.display === "none") el.style.display = "block";
          if (el.tagName === "VIDEO") {
            el.currentTime = 0;
            el.pause();
          }
        });
      }
    }
  }

  if (manualMode.active) {
    const cutLineOverlay = buildManualCutLineOverlay(manualMode.panels?.cuts);
    if (cutLineOverlay) container.appendChild(cutLineOverlay);
  }

  if (!isStatic && global.finishSound) {
    let extraDelay = 0;

    if (config.type !== "mugshot" && currentTheme !== "urban") {
      extraDelay = 0.3;
    }

    const finishDelay = maxDelay + extraDelay;

    pendingTimers.push({
      delay: finishDelay * 1000,
      fn: () => {
        if (global.mute) return;
        const src = global.finishSound;
        this._scheduleTrackedAudio(
          { sound: src, soundVolume: 80 },
          audioOwnerId,
        );
      },
    });
  }

  if (global.centerMainText || global.centerSubText) {
    const centerDiv = document.createElement("div");
    centerDiv.className = "cinematic-group-center-text";

    const typeWriter = (text) => {
      if (!text) return "";
      return [...text]
        .map(
          (char, i) =>
            `<span style="--char-i:${i}; display:inline-block;">${char === " " ? "&nbsp;" : char}</span>`,
        )
        .join("");
    };

    const isLegion = currentTheme === "legion";

    const mainContent = isLegion
      ? typeWriter(global.centerMainText)
      : global.centerMainText;
    const subContent = isLegion
      ? typeWriter(global.centerSubText)
      : global.centerSubText;

    centerDiv.innerHTML = `
                <div class="center-main-wrapper"><div class="center-main">${mainContent}</div></div>
                <div class="center-sub-wrapper"><div class="center-sub">${subContent}</div></div>
            `;

    if (global.subFontFamily && global.subFontFamily !== global.fontFamily) {
      const centerSubEl = centerDiv.querySelector(".center-sub");
      if (centerSubEl)
        centerSubEl.style.fontFamily = `"${global.subFontFamily}", sans-serif`;
    }

    const cMainEl = centerDiv.querySelector(".center-main");
    const cSubEl = centerDiv.querySelector(".center-sub");
    if (cMainEl) {
      cMainEl.style.fontWeight = global.fontBold ? "900" : "normal";
      cMainEl.style.fontStyle = global.fontItalic ? "italic" : "normal";
    }
    if (cSubEl) {
      cSubEl.style.fontWeight = global.subFontBold ? "900" : "normal";
      cSubEl.style.fontStyle = global.subFontItalic ? "italic" : "normal";
    }

    container.appendChild(centerDiv);
  }

  const flash = document.createElement("div");
  flash.className = "cinematic-group-flash";
  container.appendChild(flash);

  // Shared screen mood + cinematic effect overlay for the whole all-out
  // montage. Effects/mood CSS is scoped to `.cinematic-wrapper`, so a
  // transparent full-bleed wrapper above the panels reuses all of it
  // unchanged. `.animate` is toggled with the container in beginPlayback.
  let fxOverlay = null;
  const hasGroupMood = global.screenMood && global.screenMood !== "none";
  const hasGroupEffect =
    global.cinematicEffect && global.cinematicEffect !== "none";
  if (hasGroupMood || hasGroupEffect) {
    fxOverlay = document.createElement("div");
    fxOverlay.className = "cinematic-wrapper cinematic-group-fx";
    fxOverlay.setAttribute("aria-hidden", "true");
    // No single character in a group, so energy-tinted effects use a
    // stable accent (module red) unless the preset overrides it.
    fxOverlay.style.setProperty(
      "--theme-color",
      global.effectColor || "#e61c34",
    );
    container.appendChild(fxOverlay);
    applyScreenMoodElement(fxOverlay, global);
    applyCinematicEffectElements(fxOverlay, global);
  }

  if (!isStatic && global.shakeIntensity > 0) {
    let shakeDelay = maxDelay;
    if (config.type !== "mugshot" && currentTheme !== "urban") {
      shakeDelay += 0.3;
    }
    pendingTimers.push({
      delay: shakeDelay * 1000,
      fn: () => this.triggerScreenShake(global.shakeIntensity),
    });
  }

  const beginPlayback = () => {
    if (!container || container._renderToken !== renderToken) return false;

    container.classList.add("active");

    if (!isStatic) {
      this._clearLayerDelayTimers("group");
      this._revealDelayedLayers(container, "group");
      requestAnimationFrame(() => {
        container.classList.add("animate");
        if (fxOverlay) fxOverlay.classList.add("animate");
      });

      for (const pending of pendingTimers) {
        container._soundTimers.push(setTimeout(pending.fn, pending.delay));
      }
    }
    return true;
  };

  if (isStatic) {
    container._cinematicReady = Promise.resolve(true);
    setTimeout(beginPlayback, 50);
  } else {
    container._cinematicReady = this._waitForMediaReady(container, 7000).then(
      beginPlayback,
    );
  }

  if (isStatic) return 0;

  let safetyBuffer = 2.0; // 기본 대기 시간

  if (currentTheme === "legion") {
    safetyBuffer = 4.5;
  } else if (currentTheme === "horizon") {
    safetyBuffer = 2.5;
  }

  return (count * config.interval + config.duration + safetyBuffer) * 1000;
}

export function playInElement(targetEl, data, options = {}) {
  const deferred = createPlaybackDeferred();
  const timers = new Set();
  const animationFrames = new Set();
  const internalAbort =
    typeof AbortController === "function" ? new AbortController() : null;
  const wrapperId = `inElement-${foundry.utils.randomID()}`;
  let overlay = null;
  let wrapper = null;
  let resizeObserver = null;
  let removalObserver = null;
  let changedPosition = false;
  let originalInlinePosition = "";
  let cleaned = false;
  let playbackData = data?.audioOnly ? data : null;
  let preserveAudioAfterFinish = false;

  const schedule = (callback, delay) => {
    const timer = setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
    return timer;
  };
  const requestFrame = (callback) => {
    if (typeof requestAnimationFrame !== "function")
      return schedule(callback, 0);
    const frame = requestAnimationFrame(() => {
      animationFrames.delete(frame);
      callback();
    });
    animationFrames.add(frame);
    return frame;
  };
  const stopMedia = (root) => {
    root?.querySelectorAll?.("video").forEach((video) => {
      try {
        video.pause();
      } catch (_error) {
        /* Ignore media teardown errors. */
      }
      video.removeAttribute("src");
      try {
        video.load();
      } catch (_error) {
        /* Ignore media teardown errors. */
      }
    });
  };
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    internalAbort?.abort();
    for (const timer of timers) clearTimeout(timer);
    timers.clear();
    if (typeof cancelAnimationFrame === "function") {
      for (const frame of animationFrames) cancelAnimationFrame(frame);
    }
    animationFrames.clear();
    resizeObserver?.disconnect();
    removalObserver?.disconnect();
    options.signal?.removeEventListener?.("abort", onExternalAbort);
    this._clearLayerDelayTimers(wrapperId);
    this._clearTypewriterTimers(wrapperId);
    if (!preserveAudioAfterFinish) this._stopAudio(wrapperId, overlay);
    stopMedia(overlay);
    overlay?.remove();
    this._inElementTimers.delete(wrapperId);
    this._inElementHandles.delete(handle);
    if (this._inElementSessions.get(targetEl) === handle) {
      this._inElementSessions.delete(targetEl);
    }
    if (changedPosition && targetEl?.style?.position === "relative") {
      targetEl.style.position = originalInlinePosition;
    }
  };
  const settle = (status, details = {}) => {
    if (deferred.settled) return false;
    preserveAudioAfterFinish = shouldPreservePlaybackAudio(
      status,
      playbackData,
    );
    cleanup();
    return deferred.settle(playbackResult(status, details));
  };
  const handle = {
    finished: deferred.promise,
    stop: (reason) => settle("cancelled", { reason: reason || "stopped" }),
  };
  const onExternalAbort = () => handle.stop("aborted");

  if (!targetEl?.appendChild || !data) {
    settle("skipped", { reason: "invalid-target-or-data" });
    return handle;
  }
  if (!targetEl.isConnected) {
    settle("skipped", { reason: "target-not-connected" });
    return handle;
  }

  const previous = this._inElementSessions.get(targetEl);
  if (previous && options.replace === false) {
    settle("skipped", { reason: "target-busy" });
    return handle;
  }
  previous?.stop("replaced");
  this._inElementSessions.set(targetEl, handle);
  this._inElementHandles.add(handle);

  if (options.signal?.aborted) {
    handle.stop("aborted");
    return handle;
  }
  options.signal?.addEventListener?.("abort", onExternalAbort, { once: true });

  if (typeof MutationObserver === "function" && document?.documentElement) {
    removalObserver = new MutationObserver(() => {
      if (!targetEl.isConnected) handle.stop("target-removed");
    });
    removalObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  void (async () => {
    try {
      if (data.audioOnly) {
        await this._handleAudio(data, wrapperId);
        if (deferred.settled) {
          this._stopAudio(wrapperId, null);
          return;
        }
        schedule(
          () => settle("completed"),
          Math.max(1000, Number(data.customDuration || 4) * 1000),
        );
        return;
      }

      const finalData = await this._preparePlayData(data);
      playbackData = finalData;
      if (deferred.settled) return;
      if (!targetEl.isConnected) {
        handle.stop("target-removed");
        return;
      }

      originalInlinePosition = targetEl.style.position;
      const position = getComputedStyle(targetEl).position;
      if (position === "static" || position === "") {
        targetEl.style.position = "relative";
        changedPosition = true;
      }

      overlay = document.createElement("div");
      overlay.className = "cinematic-in-element";
      const zIndex = Number.isFinite(Number(options.zIndex))
        ? Number(options.zIndex)
        : 2147483000;
      overlay.style.cssText = `position:absolute;inset:0;overflow:hidden;isolation:isolate;contain:layout paint;z-index:${zIndex};pointer-events:none;`;
      const gradientId = `royal-gold-grad-${wrapperId}`;
      overlay.innerHTML = `
                    <div class="cinematic-wrapper" id="${wrapperId}">
                        <div class="cinematic-custom-layers"></div>
                        <div class="cinematic-bg-layer"><div class="cinematic-paint"></div></div>
                        <div class="cinematic-deco-line"></div>
                        <div class="cinematic-extra-deco">
                            <div class="deco-elem elem-1"></div><div class="deco-elem elem-2"></div>
                            <div class="deco-elem elem-3"></div><div class="deco-elem elem-4"></div>
                            <div class="deco-elem elem-5"></div><div class="deco-elem elem-6"></div>
                            <div class="deco-elem elem-7"></div><div class="deco-elem elem-8"></div>
                        </div>
                        <div class="cinematic-border-layer">
                            <svg class="cinematic-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#bf953f"/><stop offset="25%" stop-color="#fcf6ba"/>
                                    <stop offset="50%" stop-color="#b38728"/><stop offset="75%" stop-color="#fbf5b7"/>
                                    <stop offset="100%" stop-color="#aa771c"/>
                                </linearGradient></defs>
                                <polygon class="border-poly-royal" style="stroke:url(#${gradientId})" points="0,50 5,0 95,0 100,50 95,100 5,100" vector-effect="non-scaling-stroke"/>
                            </svg>
                        </div>
                        <div class="char-mask"></div>
                        <div class="cinematic-content"><div class="cinematic-text-main"></div><div class="cinematic-text-sub"></div></div>
                        <div class="cinematic-screen-filter"></div>
                    </div>`;
      targetEl.appendChild(overlay);
      wrapper = overlay.querySelector(".cinematic-wrapper");

      const applyScale = () => {
        if (deferred.settled) return;
        if (!targetEl.isConnected) {
          handle.stop("target-removed");
          return;
        }
        const width = Math.max(0, Number(targetEl.clientWidth) || 0);
        const height = Math.max(0, Number(targetEl.clientHeight) || 0);
        const scaleX = width / 1920;
        const scaleY = height / 1080;
        const fit =
          options.fit === "cover"
            ? "cover"
            : options.fit === "stretch"
              ? "stretch"
              : "contain";
        const transform =
          fit === "stretch"
            ? `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`
            : `translate(-50%, -50%) scale(${fit === "cover" ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY)})`;
        wrapper.style.transform = transform;
      };
      wrapper.style.cssText +=
        ";width:1920px;height:1080px;position:absolute;top:50%;left:50%;transform-origin:center center;";
      applyScale();
      if (typeof ResizeObserver === "function") {
        resizeObserver = new ResizeObserver(applyScale);
        resizeObserver.observe(targetEl);
      }

      this._updateTextElements(wrapper, finalData);
      this._updateMainCharacter(wrapper, finalData);
      this._updateLayers(wrapper, finalData);
      this._applyStyles(overlay, wrapper, null, finalData);
      applyScale();
      overlay.classList.add("active");

      const ready = await this._waitForMediaReady(
        wrapper,
        7000,
        internalAbort?.signal,
      );
      if (ready === false || deferred.settled) return;
      if (!targetEl.isConnected) {
        handle.stop("target-removed");
        return;
      }

      requestFrame(() =>
        requestFrame(() => {
          if (deferred.settled) return;
          const audio = this._handleAudio(finalData, wrapperId);
          Promise.resolve(audio)
            .catch((error) => {
              if (!deferred.settled) settle("error", { error });
            })
            .finally(() => {
              if (deferred.settled && !preserveAudioAfterFinish)
                this._stopAudio(wrapperId, overlay);
            });
          this._revealDelayedLayers(wrapper, wrapperId);
          wrapper.classList.add("animate");
          if (finalData.theme === "typewriter") {
            this._typewriterEffect(
              wrapper,
              finalData.text || "",
              finalData.subText || "",
              finalData.customDuration,
            );
          }
        }),
      );

      const clearTime = Math.max(
        1000,
        Number(finalData.customDuration) * 1000 + 200,
      );
      const timerId = schedule(() => {
        overlay?.classList.add("fade-out");
        schedule(
          () => settle("completed"),
          Math.max(0, Number(options.fadeOutMs ?? 500)),
        );
      }, clearTime);
      this._inElementTimers.set(wrapperId, timerId);
    } catch (error) {
      settle("error", { error });
    }
  })();

  return handle;
}
