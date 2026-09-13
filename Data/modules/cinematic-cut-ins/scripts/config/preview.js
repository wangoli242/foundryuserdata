import { applyCinematicEffectElements } from "../cinematic-effects.js";
import { applyScreenMoodElement } from "../screen-mood.js";
import { THEME_SCREEN_AXES } from "../CinematicConfig.js";
import { applyMainTextCaseClass } from "../main-text-case.js";
import { resolvePlaybackImage } from "../actor-image-source.js";

export function _fitPreviewStage() {
  if (!this.element) return;

  const container = this.element.querySelector(".preview-container");
  const stage = this.element.querySelector("#preview-stage");
  if (!container || !stage) return;

  const contW = container.clientWidth;
  const contH = container.clientHeight;

  const baseW = 1920;
  const baseH = 1080;

  const scale = Math.min(contW / baseW, contH / baseH) * 0.95;

  stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

export function _initPreviewInteraction() {
  if (!this.element) return;

  const stage = this.element.querySelector("#preview-stage");
  if (!stage) return;

  stage.classList.add("preview-interactive");

  if (stage.dataset.interactionBound === "1") return;
  stage.dataset.interactionBound = "1";

  const systemTargets = [
    {
      selector: ".cinematic-text-main",
      xName: "mainOffsetX",
      yName: "mainOffsetY",
      sizeName: "mainFontSize",
      legacyVars: ["--main-offset-x", "--main-offset-y"],
      indepVars: ["--main-visual-offset-x", "--main-visual-offset-y"],
    },
    {
      selector: ".cinematic-text-sub",
      xName: "subOffsetX",
      yName: "subOffsetY",
      sizeName: "subFontSize",
      legacyVars: ["--sub-offset-x", "--sub-offset-y"],
      indepVars: ["--sub-visual-offset-x", "--sub-visual-offset-y"],
    },
  ];

  const getInput = (name) =>
    name ? this.element.querySelector(`[name="${name}"]`) : null;

  const getActiveVariationIndex = () => {
    const match = document.activeElement?.name?.match(/^variations\.(\d+)\./);
    return match ? match[1] : null;
  };

  const resolveCharacterTarget = (charEl) => {
    const index = getActiveVariationIndex();
    const prefix = index !== null ? `variations.${index}.` : "";
    return {
      xName: `${prefix}charOffsetX`,
      yName: `${prefix}charOffsetY`,
      sizeName: `${prefix}charScale`,
      probeEl: charEl,
      probeVars: ["--char-offset-x", "--char-offset-y"],
    };
  };

  // Themes wire the offset vars through different anchors (left/right/margin,
  // mirrored transforms), so +X can render leftward on some themes (e.g.
  // arcane's `margin-left: calc(-25vh - var(--char-offset-x))`). Instead of
  // assuming +X = right, nudge the var and measure how the element actually
  // moves on screen. Runs synchronously, so nothing is ever painted and CSS
  // animation clocks don't advance between the two measurements.
  const measureAxisResponse = (el, varName, edge) => {
    const prev = stage.style.getPropertyValue(varName);
    const base = parseFloat(prev) || 0;
    const before = el.getBoundingClientRect()[edge];
    stage.style.setProperty(varName, `${base + 100}px`);
    const after = el.getBoundingClientRect()[edge];
    if (prev) stage.style.setProperty(varName, prev);
    else stage.style.removeProperty(varName);
    return (after - before) / 100; // client px per offset unit
  };

  const getStageRatio = () => {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return { x: 1920 / rect.width, y: 1080 / rect.height };
  };

  const commitInput = (input, value, fireChange) => {
    if (!input) return;
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    if (fireChange) input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const resolveLayerTarget = (node) => {
    const layerEl = node.closest(".custom-layer-media");
    if (!layerEl) return null;
    if (layerEl.classList.contains("banner-masked")) return null;
    const index = layerEl.dataset.layerIndex;
    if (index === undefined) return null;
    return {
      xName: `layers.${index}.x`,
      yName: `layers.${index}.y`,
      sizeName: `layers.${index}.scale`,
    };
  };

  const resolveTarget = (node) => {
    if (node.closest("button, a, input, select, textarea, [data-action]"))
      return null;
    const layerTarget = resolveLayerTarget(node);
    if (layerTarget) return layerTarget;
    const charEl = node.closest(".cinematic-character");
    if (charEl) return resolveCharacterTarget(charEl);
    for (const target of systemTargets) {
      const el = node.closest(target.selector);
      if (el) {
        const indep = stage.classList.contains("text-offset-independent");
        return {
          ...target,
          probeEl: el,
          probeVars: indep ? target.indepVars : target.legacyVars,
        };
      }
    }
    // Fallback: grabbing empty scene space moves the whole cut-in band
    // via the existing Screen Position sliders. Themes consume
    // --screen-x / --screen-y selectively (CSS-side axis lock), so only
    // drag along the axes the current theme actually supports.
    if (!stage.classList.contains("hide-bg")) {
      const theme = this.element.querySelector('[name="theme"]')?.value;
      const axes = THEME_SCREEN_AXES[theme] || THEME_SCREEN_AXES.default;
      if (!axes.x && !axes.y) return null;
      return {
        xName: axes.x ? "screenPosX" : null,
        yName: axes.y ? "screenPos" : null,
        percent: true,
      };
    }
    return null;
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;

    const target = resolveTarget(event.target);
    if (!target) return;

    const ratio = getStageRatio();
    if (!ratio) return;

    const xInput = getInput(target.xName);
    const yInput = getInput(target.yName);
    if (!xInput && !yInput) return;

    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const baseX = Number(xInput?.value) || 0;
    const baseY = Number(yInput?.value) || 0;

    event.preventDefault();
    stage.classList.add("dragging");

    let pendingMove = null;
    let rafId = null;

    // Offsets are raw stage pixels; the Screen Position sliders are
    // percentages of the 1920x1080 stage.
    const scaleX = target.percent ? 100 / 1920 : 1;
    const scaleY = target.percent ? 100 / 1080 : 1;

    // Probed targets convert cursor deltas through the measured on-screen
    // response, so the element tracks the cursor even on themes that
    // mirror an axis. A near-zero response means the theme ignores that
    // axis; leave its input untouched instead of drifting invisibly.
    const DEAD_AXIS = 0.01;
    let unitX = null;
    let unitY = null;
    if (target.probeEl && target.probeVars) {
      unitX = measureAxisResponse(target.probeEl, target.probeVars[0], "left");
      unitY = measureAxisResponse(target.probeEl, target.probeVars[1], "top");
    }

    const flushMove = () => {
      rafId = null;
      if (!pendingMove) return;
      const clientDX = pendingMove.clientX - startClientX;
      const clientDY = pendingMove.clientY - startClientY;
      pendingMove = null;
      if (unitX !== null || unitY !== null) {
        if (xInput && Math.abs(unitX) > DEAD_AXIS)
          xInput.value = Math.round(baseX + clientDX / unitX);
        if (yInput && Math.abs(unitY) > DEAD_AXIS)
          yInput.value = Math.round(baseY + clientDY / unitY);
      } else {
        if (xInput)
          xInput.value = Math.round(baseX + clientDX * ratio.x * scaleX);
        if (yInput)
          yInput.value = Math.round(baseY + clientDY * ratio.y * scaleY);
      }
      const trigger = xInput || yInput;
      if (trigger) trigger.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const onMove = (moveEvent) => {
      pendingMove = { clientX: moveEvent.clientX, clientY: moveEvent.clientY };
      if (rafId === null) rafId = requestAnimationFrame(flushMove);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (rafId !== null) cancelAnimationFrame(rafId);
      flushMove();
      stage.classList.remove("dragging");
      if (xInput) xInput.dispatchEvent(new Event("change", { bubbles: true }));
      if (yInput) yInput.dispatchEvent(new Event("change", { bubbles: true }));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const onWheel = (event) => {
    if (!event.ctrlKey) return;

    const target = resolveTarget(event.target);
    if (!target || !target.sizeName) return;

    const input = getInput(target.sizeName);
    if (!input) return;

    event.preventDefault();

    const step = Number(input.step) || 0.1;
    const min = input.min !== "" ? Number(input.min) : 0.1;
    const max = input.max !== "" ? Number(input.max) : Infinity;
    const direction = event.deltaY < 0 ? 1 : -1;

    let next = (Number(input.value) || 0) + direction * step;
    next = Math.min(max, Math.max(min, next));
    next = Number((Math.round(next / step) * step).toFixed(2));

    commitInput(input, next, true);
  };

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("wheel", onWheel, { passive: false });
}

function getOrCreateTextUnit(textEl) {
  if (!textEl) return null;

  if (textEl.parentElement?.classList.contains("cinematic-text-unit")) {
    return textEl.parentElement;
  }

  const parent = textEl.parentElement;
  if (!parent) return null;

  const unit = document.createElement("div");
  unit.className = textEl.classList.contains("cinematic-text-main")
    ? "cinematic-text-unit cinematic-text-main-unit"
    : "cinematic-text-unit cinematic-text-sub-unit";
  parent.insertBefore(unit, textEl);
  unit.appendChild(textEl);
  return unit;
}

function getOrCreateTextInner(textEl) {
  if (!textEl) return null;

  getOrCreateTextUnit(textEl);

  let inner = Array.from(textEl.children).find((child) =>
    child.classList.contains("cinematic-text-inner"),
  );
  if (inner) return inner;

  inner = document.createElement("span");
  inner.className = "cinematic-text-inner";
  while (textEl.firstChild) inner.appendChild(textEl.firstChild);
  textEl.appendChild(inner);
  return inner;
}

export function _onTogglePreviewPause(event, target) {
  const stage = this.element.querySelector("#preview-stage");
  if (!stage) return;

  const isPaused = stage.classList.toggle("paused");

  const videos = stage.querySelectorAll("video");

  const icon = target.querySelector("i");

  if (isPaused) {
    icon.className = "fas fa-play";

    if (this._previewTimer) clearTimeout(this._previewTimer);

    for (const video of videos) video.pause();
  } else {
    icon.className = "fas fa-pause";

    for (const video of videos) video.play().catch(() => {});

    if (this._previewTimer) clearTimeout(this._previewTimer);

    this._previewTimer = setTimeout(() => {
      this._startPreviewLoop();
    }, 3000);
  }
}

export function _startPreviewLoop() {
  const stage = this.element.querySelector("#preview-stage");
  if (!stage) return;

  if (stage.classList.contains("paused")) return;

  const playAnimation = () => {
    if (stage.classList.contains("paused")) return;

    let duration = 4000;
    let formData = {};
    try {
      formData = new foundry.applications.ux.FormDataExtended(this.element)
        .object;
      if (formData.customDuration) {
        duration = Number(formData.customDuration) * 1000 + 500;
      }
    } catch (e) {}

    this._hideDelayedLayers(stage);

    this._clearTypewriterInlineStyles(stage);

    stage.classList.remove("animate");

    const videos = stage.querySelectorAll("video");
    videos.forEach((v) => {
      v.currentTime = 0;

      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {});
      }
    });

    void stage.offsetWidth;
    stage.classList.add("animate");

    this._revealPreviewDelayedLayers(stage);

    if (formData.theme === "typewriter") {
      const { CutinManager } = game.modules.get("cinematic-cut-ins").api || {};
      if (CutinManager && CutinManager._typewriterEffect) {
        CutinManager._typewriterEffect(
          stage,
          formData.text || "",
          formData.subText || "",
          Number(formData.customDuration) || 3.5,
        );
      }
    }

    if (this._previewTimer) clearTimeout(this._previewTimer);
    this._previewTimer = setTimeout(playAnimation, duration);
  };

  playAnimation();
}

export function _updatePreviewStyles() {
  const stage = this.element.querySelector("#preview-stage");
  if (!stage) return;

  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const activeData = this._collectPreviewData(formData);

  const isPaused = stage.classList.contains("paused");
  const videoTimeMap = {};
  stage.querySelectorAll("video").forEach((v) => {
    const src = v.getAttribute("src");
    if (src) videoTimeMap[src] = v.currentTime;
  });

  this._updatePreviewCharacter(stage, activeData, isPaused, videoTimeMap);
  this._updatePreviewLayers(stage, formData, isPaused, videoTimeMap);
  this._updatePreviewTextAndUI(stage, activeData, formData);
  this._applyPreviewCSS(stage, activeData, formData);

  this._handlePreviewReset(stage, activeData, formData);
}

// --- Data Collection ---
export function _collectPreviewData(formData) {
  let data = {
    img: formData.img,
    charScale: formData.charScale,
    charOffsetX: formData.charOffsetX,
    charOffsetY: formData.charOffsetY,
    text: formData.text,
    subText: formData.subText,
    charRotation: formData.charRotation,
    charMirror: formData.charMirror,
    videoLoop: formData.videoLoop,
  };

  const activeElement = document.activeElement;
  if (
    activeElement &&
    activeElement.name &&
    activeElement.name.startsWith("variations.")
  ) {
    const match = activeElement.name.match(/^variations\.(\d+)\./);
    if (match) {
      const index = match[1];
      data.img = formData[`variations.${index}.img`] || data.img;
      data.charScale = formData[`variations.${index}.charScale`];
      data.charOffsetX = formData[`variations.${index}.charOffsetX`];
      data.charOffsetY = formData[`variations.${index}.charOffsetY`];
      if (formData[`variations.${index}.text`])
        data.text = formData[`variations.${index}.text`];
      if (formData[`variations.${index}.subText`])
        data.subText = formData[`variations.${index}.subText`];
    }
  }

  const imagePathGroup = this.element?.querySelector(".character-image-path");
  data.img = resolvePlaybackImage({
    imageSource: formData.characterImageSource,
    presetImage: data.img,
    actorImage: imagePathGroup?.dataset.actorImagePreview || "",
  });

  return data;
}

// --- Main Character Update ---
export function _updatePreviewCharacter(stage, data, isPaused, timeMap) {
  const container = stage.querySelector(".char-mask");
  if (!container) return;

  const path = data.img;
  if (!path || path.trim() === "") {
    container.innerHTML = "";
    return;
  }

  const fixedPath = this._fixPath(path);
  const isVid = this._isVideo(fixedPath);
  const className = "cinematic-character custom-media";

  let media =
    container.querySelector(".custom-media") ||
    container.querySelector(".cinematic-character");
  const tagMismatch =
    media &&
    ((isVid && media.tagName !== "VIDEO") ||
      (!isVid && media.tagName !== "IMG"));

  if (!media || tagMismatch) {
    if (isVid) {
      const autoStr = isPaused ? "" : "autoplay";
      const loopStr = data.videoLoop !== false ? "loop" : "";
      container.innerHTML = `<video class="${className}" src="${fixedPath}" ${autoStr} ${loopStr} muted playsinline></video>`;
      const newVideo = container.querySelector("video");
      if (newVideo && timeMap[fixedPath] !== undefined)
        newVideo.currentTime = timeMap[fixedPath];
    } else {
      container.innerHTML = `<img class="${className}" src="${fixedPath}" />`;
    }
  } else if (media.getAttribute("src") !== fixedPath) {
    media.setAttribute("src", fixedPath);
    if (isVid) {
      media.load();
      if (!isPaused) media.play().catch(() => {});
    }
  }
  if (media && media.tagName === "VIDEO") {
    media.loop = data.videoLoop !== false;
  }
}

export function _hideDelayedLayers(stage) {
  const layerContainer = stage.querySelector(".cinematic-custom-layers");
  if (!layerContainer) return;
  layerContainer.querySelectorAll(".custom-layer-media").forEach((el) => {
    if (Number(el.dataset.layerDelay) > 0) {
      el.style.transition = "none";
      el.style.opacity = "0";
    }
  });
}

export function _revealPreviewDelayedLayers(stage) {
  for (const timer of this._previewLayerTimers) clearTimeout(timer);
  this._previewLayerTimers = [];

  const layerContainer = stage.querySelector(".cinematic-custom-layers");
  if (!layerContainer) return;

  layerContainer.querySelectorAll(".custom-layer-media").forEach((el) => {
    const delaySec = Number(el.dataset.layerDelay) || 0;
    if (delaySec > 0) {
      const origOpacity = el.dataset.origOpacity || el.style.opacity || "1";
      el.style.opacity = "0";
      el.style.transition = "opacity 0.15s ease";
      const timerId = setTimeout(() => {
        el.style.opacity = origOpacity;
        if (el.tagName === "VIDEO") {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      }, delaySec * 1000);
      this._previewLayerTimers.push(timerId);
    }
  });
}

export function _updatePreviewLayers(stage, formData, isPaused, timeMap) {
  const layers = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^layers\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!layers[index]) layers[index] = {};
      layers[index][prop] = formData[key];
    }
  });

  for (const el of stage.querySelectorAll(
    ".layers-back-container, .layers-front-container",
  ))
    el.remove();
  let layerContainer = stage.querySelector(".cinematic-custom-layers");
  if (!layerContainer) {
    layerContainer = document.createElement("div");
    layerContainer.className = "cinematic-custom-layers";
    stage.prepend(layerContainer);
  }

  const paint = stage.querySelector(".cinematic-paint");
  const bgLayer = stage.querySelector(".cinematic-bg-layer");
  [paint, bgLayer].forEach((container) => {
    if (!container) return;
    container.querySelectorAll(".custom-layer-media").forEach((el) => {
      layerContainer.appendChild(el);
      el.classList.remove("banner-masked");
    });
  });

  const existingChildren = Array.from(layerContainer.children);

  layers.forEach((l, index) => {
    const fixedSrc = this._fixPath(l.src);
    const isVid = this._isVideo(fixedSrc);

    let el = existingChildren[index];
    let shouldCreate = true;

    if (el) {
      const currentTag = el.tagName.toLowerCase();
      const targetTag = isVid ? "video" : "img";
      const currentSrc = el.getAttribute("src");
      if (currentTag === targetTag && currentSrc === fixedSrc) {
        shouldCreate = false;
      } else {
        el.remove();
        el = null;
      }
    }

    if (shouldCreate) {
      if (!l.src) return;
      if (isVid) {
        el = document.createElement("video");
        el.src = fixedSrc;
        el.autoplay = !isPaused;
        el.loop = l.loop !== false;
        el.muted = true;
        el.playsInline = true;
        if (timeMap[fixedSrc] !== undefined) el.currentTime = timeMap[fixedSrc];
      } else {
        el = document.createElement("img");
        el.src = fixedSrc;
      }
      el.className = "custom-layer-media";

      if (existingChildren[index])
        layerContainer.insertBefore(el, layerContainer.children[index]);
      else layerContainer.appendChild(el);
    }

    let zVal = l.zIndex;
    if (zVal === undefined || zVal === null || zVal === "") {
      zVal = l.depth === "front" ? 70 : 20;
    }
    if (el.style.zIndex !== String(zVal)) el.style.zIndex = zVal;

    const mirrorScale = l.mirror ? -1 : 1;
    const scaleVal = l.scale ?? 1.0;
    const transformVal = `translate(-50%, -50%) translate(${l.x || 0}px, ${l.y || 0}px) rotate(${l.rotation || 0}deg) scale(${scaleVal * mirrorScale}, ${scaleVal})`;

    if (el.style.transform !== transformVal) el.style.transform = transformVal;

    el.style.position = "absolute";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.minWidth = "100%";
    el.style.minHeight = "100%";
    el.style.objectFit = "contain";

    const op = l.opacity ?? 1.0;
    el.dataset.origOpacity = String(op);
    const delaySec = Number(l.delay) || 0;
    if (delaySec > 0 && !isPaused) {
      el.style.opacity = "0";
    } else {
      if (el.style.opacity !== String(op)) el.style.opacity = op;
    }

    const blend = l.blend || "normal";
    if (el.style.mixBlendMode !== blend) el.style.mixBlendMode = blend;

    if (el.tagName === "VIDEO") {
      el.loop = l.loop !== false;
    }

    el.style.webkitMaskImage = "none";
    el.style.maskImage = "none";
    el.style.clipPath = "none";

    if (l.maskMode === "banner") {
      const paint = stage.querySelector(".cinematic-paint");
      const bgLayer = stage.querySelector(".cinematic-bg-layer");

      const paintStyle = paint ? getComputedStyle(paint) : null;
      const hasClipOnPaint =
        paintStyle && paintStyle.clipPath && paintStyle.clipPath !== "none";
      const targetContainer = hasClipOnPaint ? paint : bgLayer;

      if (targetContainer) {
        if (el.parentElement !== targetContainer) {
          targetContainer.appendChild(el);
        }
        el.classList.add("banner-masked");
        el.style.position = "absolute";
        el.style.inset = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.top = "0";
        el.style.left = "0";
        el.style.transform = "none";
        el.style.minWidth = "unset";
        el.style.minHeight = "unset";
        el.style.objectFit = "cover";
      }
    } else {
      el.classList.remove("banner-masked");
      if (
        el.parentElement?.classList.contains("cinematic-paint") ||
        el.parentElement?.classList.contains("cinematic-bg-layer")
      ) {
        layerContainer.appendChild(el);
        el.style.position = "absolute";
        el.style.top = "50%";
        el.style.left = "50%";
        el.style.inset = "unset";
        el.style.width = "auto";
        el.style.height = "auto";
        el.style.minWidth = "100%";
        el.style.minHeight = "100%";
        el.style.objectFit = "contain";
        el.style.transform = transformVal;
      }

      if (l.maskMode === "image" && l.maskSrc) {
        const maskUrl = `url('${this._fixPath(l.maskSrc)}')`;
        const mSize = (l.maskSize ?? 100) + "%";
        const mX = (l.maskX ?? 50) + "%";
        const mY = (l.maskY ?? 50) + "%";

        el.style.webkitMaskImage = maskUrl;
        el.style.maskImage = maskUrl;

        // Explicit auto height keeps intrinsic aspect ratio reliably
        el.style.webkitMaskSize = `${mSize} auto`;
        el.style.maskSize = `${mSize} auto`;

        el.style.webkitMaskPosition = `${mX} ${mY}`;
        el.style.maskPosition = `${mX} ${mY}`;

        el.style.webkitMaskRepeat = "no-repeat";
        el.style.maskRepeat = "no-repeat";
      } else if (l.maskMode === "shape" && l.maskShape) {
        const shapeType = (l.maskShape || "").split("(")[0];
        const s = l.maskSize ?? 100;
        const x = l.maskX ?? 50;
        const y = l.maskY ?? 50;

        if (shapeType === "circle") {
          el.style.clipPath = `circle(${s / 2}% at ${x}% ${y}%)`;
        } else if (shapeType === "ellipse") {
          el.style.clipPath = `ellipse(${s / 2}% ${s * 0.4}% at ${x}% ${y}%)`;
        } else if (shapeType === "inset") {
          const halfS = s / 2;
          const top = Math.max(0, y - halfS);
          const bottom = Math.max(0, 100 - (y + halfS));
          const left = Math.max(0, x - halfS);
          const right = Math.max(0, 100 - (x + halfS));
          el.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}%)`;
        } else {
          el.style.clipPath = l.maskShape;
        }
      }
    }

    el.dataset.layerDelay = l.delay || 0;
    el.dataset.layerIndex = index;
  });

  while (layerContainer.children.length > layers.length) {
    layerContainer.lastChild.remove();
  }
}

// --- CSS Variable Application ---
export function _applyPreviewCSS(stage, data, formData) {
  const setProp = (k, v) => stage.style.setProperty(k, v);
  const textOffsetMode =
    formData.textOffsetMode === "independent" ? "independent" : "legacy";
  const toNumber = (value) =>
    Number.isFinite(Number(value)) ? Number(value) : 0;
  const mainOffsetX = toNumber(formData.mainOffsetX);
  const mainOffsetY = toNumber(formData.mainOffsetY);
  const subOffsetX = toNumber(formData.subOffsetX);
  const subOffsetY = toNumber(formData.subOffsetY);
  const mainFlowOffsetX = textOffsetMode === "independent" ? 0 : mainOffsetX;
  const mainFlowOffsetY = textOffsetMode === "independent" ? 0 : mainOffsetY;
  const subFlowOffsetX = textOffsetMode === "independent" ? 0 : subOffsetX;
  const subFlowOffsetY = textOffsetMode === "independent" ? 0 : subOffsetY;
  const mainVisualOffsetX = textOffsetMode === "independent" ? mainOffsetX : 0;
  const mainVisualOffsetY = textOffsetMode === "independent" ? mainOffsetY : 0;
  const subVisualOffsetX = textOffsetMode === "independent" ? subOffsetX : 0;
  const subVisualOffsetY = textOffsetMode === "independent" ? subOffsetY : 0;
  const defaultMainFontSize = 8;
  const defaultSubFontSize = 2;
  const mainFontSize = toNumber(formData.mainFontSize) || defaultMainFontSize;
  const subFontSize = toNumber(formData.subFontSize) || defaultSubFontSize;
  const mainLayoutFontSize =
    textOffsetMode === "independent" ? defaultMainFontSize : mainFontSize;
  const subLayoutFontSize =
    textOffsetMode === "independent" ? defaultSubFontSize : subFontSize;
  const mainSizeScale =
    textOffsetMode === "independent" ? mainFontSize / defaultMainFontSize : 1;
  const subSizeScale =
    textOffsetMode === "independent" ? subFontSize / defaultSubFontSize : 1;

  stage.classList.toggle(
    "text-offset-independent",
    textOffsetMode === "independent",
  );

  setProp("--theme-color", formData.color);
  setProp("--cinematic-font", `"${formData.fontFamily}"`);
  if (
    formData.subFontFamily &&
    formData.subFontFamily !== formData.fontFamily
  ) {
    setProp("--cinematic-font-sub", `"${formData.subFontFamily}"`);
  } else {
    stage.style.removeProperty("--cinematic-font-sub");
  }
  setProp("--main-font-size", `${mainLayoutFontSize}rem`);
  setProp("--sub-font-size", `${subLayoutFontSize}rem`);
  setProp("--main-size-scale", mainSizeScale);
  setProp("--sub-size-scale", subSizeScale);
  setProp("--main-text-color", formData.mainTextColor);
  setProp("--sub-text-color", formData.subTextColor);
  setProp("--main-offset-x", `${mainFlowOffsetX}px`);
  setProp("--main-visual-offset-x", `${mainVisualOffsetX}px`);
  setProp("--main-offset-y", `${mainFlowOffsetY}px`);
  setProp("--main-visual-offset-y", `${mainVisualOffsetY}px`);
  setProp("--sub-offset-x", `${subFlowOffsetX}px`);
  setProp("--sub-visual-offset-x", `${subVisualOffsetX}px`);
  setProp("--sub-offset-y", `${subFlowOffsetY}px`);
  setProp("--sub-visual-offset-y", `${subVisualOffsetY}px`);
  setProp("--screen-y", `${formData.screenPos}%`);
  setProp("--screen-x", `${formData.screenPosX}%`);

  // Active Data (Variations)
  setProp("--char-scale", data.charScale);
  setProp("--char-offset-x", `${data.charOffsetX}px`);
  setProp("--char-offset-y", `${data.charOffsetY}px`);
  setProp("--char-rotate", `${data.charRotation || 0}deg`);
  setProp("--char-mirror-x", data.charMirror ? "-1" : "1");

  setProp("--dim-intensity", Number(formData.dimIntensity || 0));
  setProp("--custom-duration", `${formData.customDuration || 3.5}s`);
  setProp("--border-color", formData.borderColor);
  setProp("--border-width", `${formData.borderWidth}px`);
  setProp(
    "--char-shadow-filter",
    formData.hideCharShadow
      ? "none"
      : `drop-shadow(15px 10px 0px ${formData.charShadowColor})`,
  );

  const subTextEl = stage.querySelector(".cinematic-text-sub");
  if (
    subTextEl &&
    formData.subFontFamily &&
    formData.subFontFamily !== formData.fontFamily
  ) {
    subTextEl.style.fontFamily = `"${formData.subFontFamily}", sans-serif`;
  } else if (subTextEl) {
    subTextEl.style.removeProperty("font-family");
  }

  const mainTextEl = stage.querySelector(".cinematic-text-main");
  if (mainTextEl) {
    mainTextEl.style.fontWeight = formData.fontBold ? "900" : "normal";
    mainTextEl.style.fontStyle = formData.fontItalic ? "italic" : "normal";
  }
  if (subTextEl) {
    subTextEl.style.fontWeight = formData.subFontBold ? "900" : "normal";
    subTextEl.style.fontStyle = formData.subFontItalic ? "italic" : "normal";
  }

  applyScreenMoodElement(stage, formData);
  applyCinematicEffectElements(stage, formData);
}

// --- Text & UI Label Update ---
export function _updatePreviewTextAndUI(stage, data, formData) {
  const mainTextEl = stage.querySelector(".cinematic-text-main");
  const subTextEl = stage.querySelector(".cinematic-text-sub");
  const mainTextInner = getOrCreateTextInner(mainTextEl);
  const subTextInner = getOrCreateTextInner(subTextEl);
  if (mainTextInner && mainTextInner.innerHTML !== data.text)
    mainTextInner.innerHTML = data.text || "";
  if (subTextInner && subTextInner.innerHTML !== data.subText)
    subTextInner.innerHTML = data.subText || "";

  if (formData.hideMainText) stage.classList.add("hide-main-text");
  else stage.classList.remove("hide-main-text");

  if (formData.hideSubText) stage.classList.add("hide-sub-text");
  else stage.classList.remove("hide-sub-text");

  applyMainTextCaseClass(stage, formData);

  if (formData.hideCharacter) stage.classList.add("hide-character");
  else stage.classList.remove("hide-character");

  // UI Range Values
  const updateRangeLabel = (name, suffix = "") => {
    const el = this.element.querySelector(
      `input[name="${name}"] + .range-value`,
    );
    if (el) el.textContent = `${formData[name]}${suffix}`;
  };
  [
    "mainFontSize",
    "subFontSize",
    "shakeIntensity",
    "screenPosX",
    "screenPos",
    "dimIntensity",
    "soundVolume",
    "sfxVolume",
    "customDuration",
    "screenMoodOpacity",
    "cinematicEffectOffsetX",
    "cinematicEffectOffsetY",
    "cinematicEffectScale",
  ].forEach((n) => {
    let s = "";
    if (n.includes("Size")) s = "rem";
    else if (
      n.includes("Pos") ||
      n.startsWith("cinematicEffect") ||
      n === "dimIntensity" ||
      n === "soundVolume" ||
      n === "sfxVolume" ||
      n === "screenMoodOpacity"
    )
      s = "%";
    else if (n === "customDuration") s = "s";
    updateRangeLabel(n, s);
  });
}

// --- Reset Logic (Theme Change) ---
export function _handlePreviewReset(stage, data, formData) {
  const wasPaused = stage.classList.contains("paused");
  const currentTheme = `theme-${formData.theme}`;
  const currentFormat = `format-${formData.format}`;
  const currentHideBg = !!formData.hideBackground;
  const currentHideMain = !!formData.hideMainText;
  const currentHideSub = !!formData.hideSubText;
  const currentHideCharacter = !!formData.hideCharacter;
  const currentTextOffsetMode =
    formData.textOffsetMode === "independent" ? "independent" : "legacy";

  const needsHardReset =
    stage.dataset.lastImg !== data.img ||
    stage.dataset.lastTheme !== currentTheme ||
    stage.dataset.lastFormat !== currentFormat ||
    stage.dataset.lastHideBg !== String(currentHideBg);

  if (needsHardReset) {
    this._clearTypewriterInlineStyles(stage);

    stage.className = `cinematic-wrapper ${currentTheme} ${currentFormat}`;
    if (currentHideBg) stage.classList.add("hide-bg");
    if (currentHideMain) stage.classList.add("hide-main-text");
    if (currentHideSub) stage.classList.add("hide-sub-text");
    applyMainTextCaseClass(stage, formData);
    if (currentHideCharacter) stage.classList.add("hide-character");
    if (currentTextOffsetMode === "independent")
      stage.classList.add("text-offset-independent");
    if (stage.dataset.interactionBound === "1")
      stage.classList.add("preview-interactive");
    if (wasPaused) stage.classList.add("paused");

    applyScreenMoodElement(stage, formData);
    applyCinematicEffectElements(stage, formData);

    stage.dataset.lastImg = data.img;
    stage.dataset.lastTheme = currentTheme;
    stage.dataset.lastFormat = currentFormat;
    stage.dataset.lastHideBg = String(currentHideBg);

    stage.classList.remove("animate");
    void stage.offsetWidth;
    stage.classList.add("animate");
  }
}

export function _clearTypewriterInlineStyles(stage) {
  const { CutinManager } = game.modules.get("cinematic-cut-ins").api || {};
  if (CutinManager) CutinManager._clearTypewriterTimers(stage.id || "default");

  for (const el of stage.querySelectorAll(
    ".cinematic-text-main, .cinematic-text-sub",
  )) {
    el.style.removeProperty("opacity");
    el.style.removeProperty("display");
    el.style.removeProperty("transform");
    el.style.removeProperty("transition");
  }
}

// Path helpers
export function _fixPath(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  return foundry.utils.getRoute(normalizedPath);
}
export function _isVideo(path) {
  if (!path) return false;
  return path.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);
}

export function _createMediaElement(layerData) {
  const isVid = layerData.src.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);
  let el;
  if (isVid) {
    el = document.createElement("video");
    el.src = layerData.src;
    el.autoplay = true;
    el.loop = layerData.loop !== false;
    el.muted = true;
  } else {
    el = document.createElement("img");
    el.src = layerData.src;
  }
  el.className = "custom-layer-media";
  el.style.opacity = layerData.opacity ?? 1;
  el.style.mixBlendMode = layerData.blend || "normal";
  el.style.transform = `translate(-50%, -50%) translate(${layerData.x || 0}px, ${layerData.y || 0}px) scale(${layerData.scale ?? 1})`;
  return el;
}
