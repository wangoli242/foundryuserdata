/* --- START OF FILE manager/rendering.js --- */

import { applyCinematicEffectElements } from "../cinematic-effects.js";
import { applyScreenMoodElement } from "../screen-mood.js";
import { applyMainTextCaseClass } from "../main-text-case.js";
import {
  normalizeCharacterImageSource,
  resolvePlaybackImage,
} from "../actor-image-source.js";

// -------------------------------------------------------------------------
// --- DOM Initialization ---
// -------------------------------------------------------------------------
export function _getOrInitializeWrapper(overlay) {
  let wrapper = overlay.querySelector(".cinematic-wrapper");
  if (!wrapper) {
    overlay.innerHTML = `
                <div class="cinematic-aspect-stage" id="cinematic-single-stage">
                    <div class="cinematic-wrapper">
                        <div class="cinematic-custom-layers"></div>
                        <div class="cinematic-bg-layer"><div class="cinematic-paint"></div></div>
                        <div class="cinematic-deco-line"></div>
                        <div class="cinematic-border-layer">
                            <svg class="cinematic-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="royal-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#bf953f" />
                                        <stop offset="25%" stop-color="#fcf6ba" />
                                        <stop offset="50%" stop-color="#b38728" />
                                        <stop offset="75%" stop-color="#fbf5b7" />
                                        <stop offset="100%" stop-color="#aa771c" />
                                    </linearGradient>
                                </defs>
                                <polygon class="border-poly-royal" points="0,50 5,0 95,0 100,50 95,100 5,100" vector-effect="non-scaling-stroke"/>
                            </svg>
                        </div>
                        <div class="char-mask" id="media-container"></div>
                        <div class="cinematic-content">
                            <div class="cinematic-text-main"></div>
                            <div class="cinematic-text-sub"></div>
                        </div>
                        <div class="cinematic-screen-filter"></div>
                    </div>
                </div>`;
    wrapper = overlay.querySelector(".cinematic-wrapper");
  }

  const removeSelectors = [".layers-back-container", ".layers-front-container"];
  for (const selector of removeSelectors) {
    for (const el of wrapper.querySelectorAll(selector)) el.remove();
  }

  if (!wrapper.querySelector(".cinematic-custom-layers")) {
    const lc = document.createElement("div");
    lc.className = "cinematic-custom-layers";
    wrapper.prepend(lc);
  }

  wrapper.removeAttribute("style");
  return wrapper;
}

// -------------------------------------------------------------------------
// --- Data Preparation ---
// -------------------------------------------------------------------------
export async function _preparePlayData(data) {
  let finalData = { ...data };
  let actor = null;
  let actorImage = "";
  const hasOwn = (object, key) =>
    Object.prototype.hasOwnProperty.call(object, key);
  const inputHasTextOffsetMode = hasOwn(data, "textOffsetMode");
  const inputIsPresetLike = [
    "presetName",
    "theme",
    "text",
    "subText",
    "mainOffsetX",
    "mainOffsetY",
    "subOffsetX",
    "subOffsetY",
  ].some((key) => hasOwn(data, key));

  if (data.actorId) {
    actor =
      (await fromUuid(data.actorId).catch(() => null)) ||
      game.actors.get(data.actorId);
    if (actor) {
      actorImage = actor.img || "";
      const flags = actor.getFlag("cinematic-cut-ins", "config") || {};
      finalData = foundry.utils.mergeObject(
        foundry.utils.deepClone(flags),
        finalData,
        { inplace: false },
      );
      if (inputIsPresetLike) {
        if (!inputHasTextOffsetMode) finalData.textOffsetMode = "legacy";
        if (!hasOwn(data, "screenMood")) finalData.screenMood = "none";
        if (!hasOwn(data, "screenMoodOpacity"))
          finalData.screenMoodOpacity = 60;
        if (!hasOwn(data, "cinematicEffect"))
          finalData.cinematicEffect = "none";
        if (!hasOwn(data, "cinematicEffectStrength"))
          finalData.cinematicEffectStrength = 2;
        if (!hasOwn(data, "cinematicEffectOffsetX"))
          finalData.cinematicEffectOffsetX = 0;
        if (!hasOwn(data, "cinematicEffectOffsetY"))
          finalData.cinematicEffectOffsetY = 0;
        if (!hasOwn(data, "cinematicEffectScale"))
          finalData.cinematicEffectScale = 100;
      }
    }
  }

  if (!finalData.theme) finalData.theme = "brush";
  if (!finalData.format) finalData.format = "popout";
  finalData.customDuration = Number(finalData.customDuration ?? 3.5);
  finalData.characterImageSource = normalizeCharacterImageSource(
    finalData.characterImageSource,
  );

  finalData = this.applyRandomization(finalData);
  if (actor?.name) {
    if (typeof finalData.text === "string") {
      finalData.text = finalData.text.replace(
        /\{\{(name|alias)\}\}/gi,
        actor.name,
      );
    }
    if (typeof finalData.subText === "string") {
      finalData.subText = finalData.subText.replace(
        /\{\{(name|alias)\}\}/gi,
        actor.name,
      );
    }
  }
  finalData.img = resolvePlaybackImage({
    imageSource: finalData.characterImageSource,
    presetImage: finalData.img,
    actorImage,
  });

  return finalData;
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

// -------------------------------------------------------------------------
// --- Text Update ---
// -------------------------------------------------------------------------
export function _updateTextElements(wrapper, data) {
  const mainTextEl = wrapper.querySelector(".cinematic-text-main");
  const subTextEl = wrapper.querySelector(".cinematic-text-sub");
  const mainTextInner = getOrCreateTextInner(mainTextEl);
  const subTextInner = getOrCreateTextInner(subTextEl);

  const isTypewriter = data.theme === "typewriter";

  if (isTypewriter) {
    if (mainTextInner) mainTextInner.innerHTML = "";
    if (subTextInner) subTextInner.innerHTML = "";
  } else {
    if (mainTextEl && mainTextInner) {
      mainTextInner.innerHTML = data.text || "";
      mainTextEl.style.removeProperty("opacity");
      mainTextEl.style.removeProperty("display");
      mainTextEl.style.removeProperty("transform");
      mainTextEl.style.removeProperty("transition");
    }
    if (subTextEl && subTextInner) {
      subTextInner.innerHTML = data.subText || "";
      subTextEl.style.removeProperty("opacity");
      subTextEl.style.removeProperty("display");
      subTextEl.style.removeProperty("transform");
      subTextEl.style.removeProperty("transition");
    }
  }

  if (
    subTextEl &&
    data.subFontFamily &&
    data.subFontFamily !== (data.fontFamily || "Teko")
  ) {
    subTextEl.style.fontFamily = `"${data.subFontFamily}", sans-serif`;
  } else if (subTextEl) {
    subTextEl.style.removeProperty("font-family");
  }

  if (mainTextEl) {
    mainTextEl.style.fontWeight = data.fontBold ? "900" : "normal";
    mainTextEl.style.fontStyle = data.fontItalic ? "italic" : "normal";
  }
  if (subTextEl) {
    subTextEl.style.fontWeight = data.subFontBold ? "900" : "normal";
    subTextEl.style.fontStyle = data.subFontItalic ? "italic" : "normal";
  }
}

export function _clearTypewriterTimers(wrapperId) {
  if (!this._typewriterTimerMap) this._typewriterTimerMap = new Map();
  const timers = this._typewriterTimerMap.get(wrapperId);
  if (timers) {
    for (const timer of timers) clearTimeout(timer);
    this._typewriterTimerMap.delete(wrapperId);
  }
}

export function _typewriterEffect(wrapper, mainText, subText, durationSec) {
  const mainEl = wrapper.querySelector(".cinematic-text-main");
  const subEl = wrapper.querySelector(".cinematic-text-sub");
  const mainTextInner = getOrCreateTextInner(mainEl);
  const subTextInner = getOrCreateTextInner(subEl);

  const wrapperId = wrapper.id || "default";
  this._clearTypewriterTimers(wrapperId);

  if (!this._typewriterTimerMap) this._typewriterTimerMap = new Map();
  const timers = [];
  this._typewriterTimerMap.set(wrapperId, timers);

  const totalDuration = durationSec * 1000;
  const mainDuration = totalDuration * 0.35;
  const subDuration = totalDuration * 0.2;
  const fadeOutStart = totalDuration - 600;

  if (mainEl && mainTextInner) {
    mainTextInner.innerHTML = "";
    mainEl.style.setProperty("opacity", "0", "important");
  }
  if (subEl && subTextInner) {
    subTextInner.innerHTML = "";
    subEl.style.setProperty("opacity", "0", "important");
  }

  const createCursor = () => {
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    cursor.textContent = "|";
    return cursor;
  };

  const typeText = (element, inner, text, duration, onComplete) => {
    if (!element || !inner) {
      if (onComplete) onComplete();
      return;
    }

    if (!text || text.trim() === "") {
      element.style.setProperty("display", "none", "important");
      if (onComplete) onComplete();
      return;
    }

    inner.innerHTML = "";
    element.style.setProperty("opacity", "1", "important");
    element.style.setProperty("display", "block", "important");
    element.style.setProperty("transform", "none", "important");

    const cursor = createCursor();
    inner.appendChild(cursor);

    const lines = text.split(/<br\s*\/?>/i);
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    const linesDuration = duration / lines.length;

    const typeLine = () => {
      if (currentLineIndex >= lines.length) {
        cursor.remove();
        if (onComplete) onComplete();
        return;
      }

      const line = lines[currentLineIndex];
      const charDelay = linesDuration / Math.max(line.length, 1);

      const typeChar = () => {
        if (currentCharIndex < line.length) {
          const char = line[currentCharIndex];
          const charNode = document.createTextNode(
            char === " " ? "\u00A0" : char,
          );
          inner.insertBefore(charNode, cursor);
          currentCharIndex++;
          const timer = setTimeout(typeChar, charDelay);
          timers.push(timer);
        } else {
          currentLineIndex++;
          currentCharIndex = 0;
          if (currentLineIndex < lines.length) {
            inner.insertBefore(document.createElement("br"), cursor);
          }
          const timer = setTimeout(typeLine, 100);
          timers.push(timer);
        }
      };

      typeChar();
    };

    typeLine();
  };

  const startTyping = () => {
    typeText(mainEl, mainTextInner, mainText, mainDuration, () => {
      const subTimer = setTimeout(() => {
        typeText(subEl, subTextInner, subText, subDuration, () => {});
      }, 200);
      timers.push(subTimer);
    });
  };

  const initTimer = setTimeout(startTyping, 100);
  timers.push(initTimer);

  const fadeOutTimer = setTimeout(() => {
    if (mainEl) {
      mainEl.style.transition = "opacity 0.5s ease-out";
      mainEl.style.setProperty("opacity", "0", "important");
    }
    if (subEl) {
      subEl.style.transition = "opacity 0.5s ease-out";
      subEl.style.setProperty("opacity", "0", "important");
    }
  }, fadeOutStart);
  timers.push(fadeOutTimer);
}

// -------------------------------------------------------------------------
// --- Main Character Update ---
// -------------------------------------------------------------------------
export function _updateMainCharacter(wrapper, data) {
  const container =
    wrapper.querySelector("#media-container") ||
    wrapper.querySelector(".char-mask");
  if (!container) return;

  if (!data.img || data.img.trim() === "") {
    container.innerHTML = "";
    return;
  }

  const path = this._fixPath(data.img);
  const isVid = this._isVideo(path);
  const targetTag = isVid ? "VIDEO" : "IMG";

  let media = container.firstElementChild;

  if (!media || media.tagName !== targetTag) {
    media = document.createElement(targetTag);
    media.className = "cinematic-character custom-media";
    if (isVid) {
      media.muted = !data.videoAudio;
      media.loop = data.videoLoop !== false;
      media.playsInline = true;
      media.autoplay = true;
    }
    container.innerHTML = "";
    container.appendChild(media);
  }

  if (media.getAttribute("src") !== path) {
    media.src = path;
    if (isVid) media.load();
  }
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
export function _updateLayers(wrapper, data) {
  const layerContainer = wrapper.querySelector(".cinematic-custom-layers");
  if (!layerContainer) return;

  const paint = wrapper.querySelector(".cinematic-paint");
  const bgLayer = wrapper.querySelector(".cinematic-bg-layer");
  [paint, bgLayer].forEach((container) => {
    if (!container) return;
    container.querySelectorAll(".custom-layer-media").forEach((el) => {
      layerContainer.appendChild(el);
      el.classList.remove("banner-masked");
    });
  });

  const existingChildren = Array.from(layerContainer.children);
  const newLayers = data.layers || [];

  // 1. Diffing & Update
  newLayers.forEach((layerData, index) => {
    if (!layerData.src) return;

    const path = this._fixPath(layerData.src);
    const isVid = this._isVideo(path);
    const targetTag = isVid ? "VIDEO" : "IMG";

    let el = existingChildren[index];

    if (!el || el.tagName !== targetTag) {
      el = document.createElement(targetTag);
      el.className = "custom-layer-media";

      el.style.position = "absolute";
      el.style.top = "50%";
      el.style.left = "50%";
      el.style.width = "auto";
      el.style.height = "auto";
      el.style.minWidth = "100%";
      el.style.minHeight = "100%";
      el.style.objectFit = "contain";

      if (isVid) {
        el.muted = !layerData.videoAudio;
        el.playsInline = true;
        el.autoplay = true;
      }

      if (existingChildren[index]) existingChildren[index].replaceWith(el);
      else layerContainer.appendChild(el);
    }

    if (el.getAttribute("src") !== path) {
      el.src = path;
      if (isVid) el.load();
    }

    if (isVid) {
      const loop = layerData.loop !== false;
      if (el.loop !== loop) el.loop = loop;
    }

    // Z-Index
    let zVal = layerData.zIndex;
    if (zVal === undefined || zVal === null) {
      zVal =
        layerData.depth === "front" ? 70 : layerData.depth === "back" ? 0 : 20;
    }
    if (el.style.zIndex !== String(zVal)) el.style.zIndex = zVal;

    // Transform
    const mirrorScale = layerData.mirror ? -1 : 1;
    const scaleVal = layerData.scale ?? 1.0;
    const transformVal = `translate(-50%, -50%) translate(${layerData.x || 0}px, ${layerData.y || 0}px) rotate(${layerData.rotation || 0}deg) scale(${scaleVal * mirrorScale}, ${scaleVal})`;
    if (el.style.transform !== transformVal) el.style.transform = transformVal;

    // Opacity & Blend
    if (el.style.opacity !== String(layerData.opacity ?? 1))
      el.style.opacity = layerData.opacity ?? 1;
    if (el.style.mixBlendMode !== (layerData.blend || "normal"))
      el.style.mixBlendMode = layerData.blend || "normal";

    // [Masking Logic]
    el.style.webkitMaskImage = "none";
    el.style.maskImage = "none";
    el.style.clipPath = "none";

    if (layerData.maskMode === "banner") {
      const paint = wrapper.querySelector(".cinematic-paint");
      const bgLayer = wrapper.querySelector(".cinematic-bg-layer");

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

      if (layerData.maskMode === "image" && layerData.maskSrc) {
        const maskUrl = `url('${this._fixPath(layerData.maskSrc)}')`;

        const mSize = (layerData.maskSize ?? 100) + "%";
        const mX = (layerData.maskX ?? 50) + "%";
        const mY = (layerData.maskY ?? 50) + "%";

        el.style.webkitMaskImage = maskUrl;
        el.style.maskImage = maskUrl;

        el.style.webkitMaskSize = `${mSize} auto`;
        el.style.maskSize = `${mSize} auto`;

        el.style.webkitMaskPosition = `${mX} ${mY}`;
        el.style.maskPosition = `${mX} ${mY}`;

        el.style.webkitMaskRepeat = "no-repeat";
        el.style.maskRepeat = "no-repeat";
      } else if (layerData.maskMode === "shape" && layerData.maskShape) {
        const shapeType = (layerData.maskShape || "").split("(")[0].trim();

        const s = layerData.maskSize ?? 100;
        const x = layerData.maskX ?? 50;
        const y = layerData.maskY ?? 50;

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
          el.style.clipPath = layerData.maskShape;
        }
      }
    }

    const delaySec = layerData.delay || 0;
    el.dataset.layerDelay = delaySec;
    el.dataset.layerIndex = layerData.index ?? index;
    if (delaySec > 0) {
      el.style.display = "none";
    } else {
      if (el.style.display === "none") el.style.display = "block";
    }
  });

  for (let i = newLayers.length; i < existingChildren.length; i++) {
    const unused = existingChildren[i];
    unused.style.display = "none";
    unused.src = "";
    if (unused.tagName === "VIDEO") unused.pause();
  }

  const videos = layerContainer.querySelectorAll("video");
  videos.forEach((v) => {
    if (v.style.display !== "none") {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  });
}

// -------------------------------------------------------------------------
// --- Style & CSS Variable Application ---
// -------------------------------------------------------------------------
export function _applyStyles(overlay, wrapper, stage, data) {
  const screenY = data.screenPos !== undefined ? data.screenPos : 50;
  const screenX = data.screenPosX !== undefined ? data.screenPosX : 50;
  const textOffsetMode =
    data.textOffsetMode === "independent" ? "independent" : "legacy";
  const toNumber = (value) =>
    Number.isFinite(Number(value)) ? Number(value) : 0;
  const mainOffsetX = toNumber(data.mainOffsetX);
  const mainOffsetY = toNumber(data.mainOffsetY);
  const subOffsetX = toNumber(data.subOffsetX);
  const subOffsetY = toNumber(data.subOffsetY);
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
  const mainFontSize = toNumber(data.mainFontSize) || defaultMainFontSize;
  const subFontSize = toNumber(data.subFontSize) || defaultSubFontSize;
  const mainLayoutFontSize =
    textOffsetMode === "independent" ? defaultMainFontSize : mainFontSize;
  const subLayoutFontSize =
    textOffsetMode === "independent" ? defaultSubFontSize : subFontSize;
  const mainSizeScale =
    textOffsetMode === "independent" ? mainFontSize / defaultMainFontSize : 1;
  const subSizeScale =
    textOffsetMode === "independent" ? subFontSize / defaultSubFontSize : 1;

  wrapper.className = "cinematic-wrapper";
  wrapper.classList.add(`theme-${data.theme}`, `format-${data.format}`);

  if (data.hideBackground) wrapper.classList.add("hide-bg");
  if (data.hideMainText) wrapper.classList.add("hide-main-text");
  if (data.hideSubText) wrapper.classList.add("hide-sub-text");
  applyMainTextCaseClass(wrapper, data);
  if (data.hideCharacter) wrapper.classList.add("hide-character");
  if (textOffsetMode === "independent")
    wrapper.classList.add("text-offset-independent");

  applyScreenMoodElement(wrapper, data);
  applyCinematicEffectElements(wrapper, data);

  const set = (k, v) => wrapper.style.setProperty(k, v);

  set("--theme-color", data.color || "#e61c34");
  set("--cinematic-font", `"${data.fontFamily || "Teko"}"`);
  if (
    data.subFontFamily &&
    data.subFontFamily !== (data.fontFamily || "Teko")
  ) {
    set("--cinematic-font-sub", `"${data.subFontFamily}"`);
  } else {
    wrapper.style.removeProperty("--cinematic-font-sub");
  }
  set("--main-font-size", `${mainLayoutFontSize}rem`);
  set("--sub-font-size", `${subLayoutFontSize}rem`);
  set("--main-size-scale", mainSizeScale);
  set("--sub-size-scale", subSizeScale);
  set("--main-text-color", data.mainTextColor || "#ffffff");
  set("--sub-text-color", data.subTextColor || "#ffffff");
  set("--main-offset-x", `${mainFlowOffsetX}px`);
  set("--main-visual-offset-x", `${mainVisualOffsetX}px`);
  set("--main-offset-y", `${mainFlowOffsetY}px`);
  set("--main-visual-offset-y", `${mainVisualOffsetY}px`);
  set("--sub-offset-x", `${subFlowOffsetX}px`);
  set("--sub-visual-offset-x", `${subVisualOffsetX}px`);
  set("--sub-offset-y", `${subFlowOffsetY}px`);
  set("--sub-visual-offset-y", `${subVisualOffsetY}px`);
  set("--char-scale", data.charScale || 1.0);
  set("--char-offset-x", `${data.charOffsetX || 0}px`);
  set("--char-offset-y", `${data.charOffsetY || 0}px`);
  set("--char-rotate", `${data.charRotation || 0}deg`);
  set("--char-mirror-x", data.charMirror ? "-1" : "1");
  set(
    "--char-shadow-filter",
    data.hideCharShadow
      ? "drop-shadow(0px 0px 0px transparent)"
      : `drop-shadow(15px 10px 0px ${data.charShadowColor || "#000000"})`,
  );
  set("--screen-y", `${screenY}%`);
  set("--screen-x", `${screenX}%`);
  set("--dim-intensity", Number(data.dimIntensity || 0));
  set("--custom-duration", `${data.customDuration}s`);

  if (stage) {
    stage.style.setProperty("--custom-duration", `${data.customDuration}s`);
    stage.style.setProperty(
      "--dim-opacity",
      Number(data.dimIntensity ?? 70) / 100,
    );
  }

  set("--border-color", data.borderColor || "#ffffff");
  set("--border-width", `${data.borderWidth || 0}px`);

  const bgLayer = wrapper.querySelector(".cinematic-bg-layer");
  if (bgLayer) {
    if (data.borderWidth > 0) {
      const w = data.borderWidth;
      const c = data.borderColor;
      bgLayer.style.setProperty(
        "--border-filter",
        `drop-shadow(${w}px 0 0 ${c}) drop-shadow(-${w}px 0 0 ${c}) drop-shadow(0 ${w}px 0 ${c}) drop-shadow(0 -${w}px 0 ${c})`,
      );
    } else {
      bgLayer.style.setProperty("--border-filter", "none");
    }
  }

  overlay.classList.remove("active");
  void wrapper.offsetWidth;
}

export function _addCleaveSlashLine(wrapper) {
  const charEl = wrapper.querySelector(".cinematic-character");
  if (!charEl) return;

  const charRect = charEl.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const visibleTop = Math.max(charRect.top, wrapperRect.top);
  const visibleBottom = Math.min(charRect.bottom, wrapperRect.bottom);
  const visibleLeft = Math.max(charRect.left, wrapperRect.left);
  const visibleRight = Math.min(charRect.right, wrapperRect.right);

  const centerX = (visibleLeft + visibleRight) / 2 - wrapperRect.left;
  const centerY = (visibleTop + visibleBottom) / 2 - wrapperRect.top;

  const line = document.createElement("div");
  line.className = "cleave-slash-line";
  line.style.left = `${centerX}px`;
  line.style.top = `${centerY}px`;
  wrapper.appendChild(line);
}

// -------------------------------------------------------------------------
// --- Media Preloading ---
// -------------------------------------------------------------------------
// Waits until every <img>/<video> inside root is fully loaded (and images
// are decoded off the main thread), or until timeoutMs elapses.
// Resolving on error too: a broken path should never block playback.
export function _waitForMediaReady(root, timeoutMs = 7000, signal = null) {
  if (signal?.aborted) return Promise.resolve(false);
  const allMedia = Array.from(root?.querySelectorAll?.("img, video") ?? []);

  return new Promise((resolve) => {
    let settled = false;
    let remaining = allMedia.length;
    let timeoutId = null;
    const listenerCleanups = [];
    const finish = (ready) => {
      if (settled) return;
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      for (const cleanup of listenerCleanups) cleanup();
      signal?.removeEventListener?.("abort", onAbort);
      resolve(ready);
    };
    const onAbort = () => finish(false);
    signal?.addEventListener?.("abort", onAbort, { once: true });

    if (allMedia.length === 0) {
      timeoutId = setTimeout(() => finish(true), 50);
      return;
    }

    const markReady = () => {
      remaining -= 1;
      if (remaining <= 0) finish(true);
    };
    timeoutId = setTimeout(
      () => finish(true),
      Math.max(0, Number(timeoutMs) || 0),
    );
    for (const el of allMedia) {
      let mediaSettled = false;
      const done = () => {
        if (mediaSettled || settled) return;
        mediaSettled = true;
        markReady();
      };
      const listen = (type, callback) => {
        el.addEventListener?.(type, callback, { once: true });
        listenerCleanups.push(() => el.removeEventListener?.(type, callback));
      };

      if (el.tagName === "VIDEO") {
        if (el.readyState >= 4) {
          done();
          continue;
        }
        listen("canplaythrough", done);
        listen("error", done);
        try {
          el.load();
        } catch (_error) {
          done();
        }
        continue;
      }

      const decode = () => {
        if (typeof el.decode === "function")
          Promise.resolve(el.decode()).then(done, done);
        else done();
      };
      if (el.complete) {
        decode();
        continue;
      }
      listen("load", decode);
      listen("error", done);
    }
  });
}

// --- Animation Sequence ---
// Overlay visibility, audio, and the clear timer must all start AFTER media
// is loaded, so a slow-loading asset can never eat into the play duration.
export async function _startAnimationSequence(overlay, wrapper, stage, data) {
  const isTypewriter = wrapper.classList.contains("theme-typewriter");

  const wrapperId = wrapper.id || "single";

  const startAnim = () => {
    this._handleAudio(data, wrapperId);
    this._revealDelayedLayers(wrapper, wrapperId);

    if (data.theme === "cleave") {
      this._addCleaveSlashLine(wrapper);
    }

    wrapper.classList.add("animate");
    if (stage) {
      stage.classList.add("animate");
      stage.classList.add(`theme-${data.theme}`);
    }

    if (data.theme === "yakuza") {
      document.body.classList.add("cinematic-yakuza-active");
    }

    if (isTypewriter) {
      this._typewriterEffect(
        wrapper,
        data.text || "",
        data.subText || "",
        data.customDuration,
      );
    }
  };

  const playToken = Symbol("cinematic-play");
  this._animToken = playToken;

  await this._waitForMediaReady(wrapper, 7000);

  if (this._animToken !== playToken) return 0;

  overlay.classList.add("active");
  requestAnimationFrame(() => requestAnimationFrame(startAnim));

  if (data.shakeIntensity > 0) {
    setTimeout(() => this.triggerScreenShake(data.shakeIntensity), 200);
  }

  const clearTime = Math.max(1000, Number(data.customDuration) * 1000 + 200);
  if (this._timer) clearTimeout(this._timer);
  this._timer = setTimeout(() => {
    if (!data.keepAudioPlaying) {
      this._stopAudio(wrapperId);
    }
    this._clearLayerDelayTimers(wrapperId);
    overlay.classList.remove("active");
    wrapper.classList.remove("animate");
    if (stage) {
      stage.classList.remove("animate");
      stage.classList.remove(`theme-${data.theme}`);
      stage.style.removeProperty("--dim-opacity");
    }
    document.body.classList.remove("cinematic-yakuza-active");
    for (const el of wrapper.querySelectorAll(".cleave-slash-line"))
      el.remove();
  }, clearTime);

  return clearTime;
}
