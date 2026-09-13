/* --- START OF FILE CutinManager.js --- */

import {
  createPlaybackDeferred,
  playbackResult,
} from "./playback-lifecycle.js";

export class CutinManager {
  static get ID() {
    return "cinematic-overlay";
  }
  static get GROUP_ID() {
    return "cinematic-group-overlay";
  }

  static _queue = [];
  static _isPlaying = false;
  static _activeQueueJob = null;
  static _queueTimer = null;
  static _soundTimers = new Set();
  static _activeSounds = new Map();
  static _audioStopGeneration = 0;
  static _audioOwnerGenerations = new Map();

  static isVideo(path) {
    if (!path) return false;
    return path.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);
  }

  static async initialize() {
    const interfaceEl = document.getElementById("interface");
    if (!interfaceEl) return;

    if (!document.getElementById(this.ID)) {
      const overlay = document.createElement("div");
      overlay.id = this.ID;
      overlay.innerHTML = `
                <div class="cinematic-aspect-stage" id="cinematic-single-stage">
                    <div class="cinematic-wrapper">
                        <div class="cinematic-custom-layers"></div>
                        <div class="cinematic-bg-layer"><div class="cinematic-paint"></div></div>
                        <div class="cinematic-deco-line"></div>
                        

                        <div class="cinematic-extra-deco">
                            <div class="deco-elem elem-1"></div>
                            <div class="deco-elem elem-2"></div>
                            <div class="deco-elem elem-3"></div>
                            <div class="deco-elem elem-4"></div>
                            <div class="deco-elem elem-5"></div>
                            <div class="deco-elem elem-6"></div>
                            <div class="deco-elem elem-7"></div>
                            <div class="deco-elem elem-8"></div>
                        </div>

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
      interfaceEl.appendChild(overlay);
    }

    if (!document.getElementById(this.GROUP_ID)) {
      const groupOverlay = document.createElement("div");
      groupOverlay.id = this.GROUP_ID;

      const stage = document.createElement("div");
      stage.className = "cinematic-aspect-stage";
      stage.id = "cinematic-group-stage";

      const container = document.createElement("div");
      container.className = "cinematic-group-container";

      stage.appendChild(container);
      groupOverlay.appendChild(stage);

      interfaceEl.appendChild(groupOverlay);
    }

    window.addEventListener("resize", () => this._fitScreen());
    this._fitScreen();
  }

  static _fitScreen() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const baseW = 1920;
    const baseH = 1080;

    const stages = [
      { id: "cinematic-single-stage", setting: "personalScreenMode" },
      { id: "cinematic-group-stage", setting: "groupScreenMode" },
    ];

    stages.forEach((s) => {
      const stage = document.getElementById(s.id);
      if (!stage) return;

      const mode =
        game.settings.get("cinematic-cut-ins", s.setting) || "letterbox";

      stage.classList.remove(
        "mode-letterbox",
        "mode-dimmed",
        "mode-fit",
        "mode-cover",
        "mode-stretch",
      );
      stage.classList.add(`mode-${mode}`);

      let scale = winH / baseH;

      if (mode === "stretch") {
        const adaptiveW = winW / scale;

        stage.style.width = `${adaptiveW}px`;
        stage.style.height = `1080px`;
        stage.style.transform = `scale(${scale})`;
      } else if (mode === "cover") {
        scale = Math.max(winW / baseW, winH / baseH);
        stage.style.width = `1920px`;
        stage.style.height = `1080px`;
        stage.style.transform = `scale(${scale})`;
      } else {
        scale = Math.min(winW / baseW, winH / baseH);
        stage.style.width = `1920px`;
        stage.style.height = `1080px`;
        stage.style.transform = `scale(${scale})`;
      }
    });
  }

  static async play(data) {
    if (!data) return;
    this._enqueuePlayback(data);
  }

  static playAndWait(data) {
    if (!data)
      return Promise.resolve(
        playbackResult("skipped", { reason: "invalid-data" }),
      );
    return this._enqueuePlayback(data).deferred.promise;
  }

  static _enqueuePlayback(data) {
    const job = {
      data,
      deferred: createPlaybackDeferred(),
    };
    this._queue.push(job);
    void this._processQueue();
    return job;
  }

  static _settleQueueJob(job, result) {
    return job?.deferred?.settle(result) ?? false;
  }

  static _finishQueueJob(job, result) {
    if (this._activeQueueJob !== job) {
      this._settleQueueJob(job, result);
      return;
    }
    if (this._queueTimer) clearTimeout(this._queueTimer);
    this._queueTimer = null;
    this._settleQueueJob(job, result);
    this._activeQueueJob = null;
    this._isPlaying = false;
    if (this._queue.length === 0) this._updateSkipButton(false);
    void this._processQueue();
  }

  static async _processQueue() {
    if (this._isPlaying || this._queue.length === 0) return;

    this._isPlaying = true;

    const btn = document.getElementById("cinematic-skip-btn");
    const isAlreadyVisible = btn && btn.classList.contains("visible");

    if (this._queue.length >= 2 || isAlreadyVisible) {
      this._updateSkipButton(true);
    }

    const currentJob = this._queue.shift();
    this._activeQueueJob = currentJob;
    const currentData = currentJob.data;

    let duration = 4000;
    let result = playbackResult("completed");

    try {
      if (
        Array.isArray(currentData) ||
        (currentData &&
          typeof currentData === "object" &&
          currentData.participants)
      ) {
        duration = await this.playGroup(currentData);
      } else {
        const singleDuration = await this.playSingle(currentData);
        duration = typeof singleDuration === "number" ? singleDuration : 4000;
      }
    } catch (err) {
      console.error("Cinematic FX Error:", err);
      duration = 1000;
      result = playbackResult("error", { error: err });
    }

    if (this._activeQueueJob !== currentJob || currentJob.deferred.settled)
      return;
    if (!(Number(duration) > 0)) {
      this._finishQueueJob(
        currentJob,
        playbackResult("skipped", { reason: "not-played" }),
      );
      return;
    }

    this._queueTimer = setTimeout(() => {
      this._finishQueueJob(currentJob, result);
    }, duration + 100);
  }

  static THEME_SETTINGS = {
    rebel: { interval: 1.2, duration: 0.5, layout: "shatter", type: "pop" },
    comic: { interval: 1.2, duration: 0.5, layout: "shatter", type: "pop" },
    urban: { interval: 0.15, duration: 0.5, layout: "shatter", type: "slide" },
    noir: { interval: 1.2, duration: 0.5, layout: "shatter", type: "pop" },
    wanted: { interval: 1.5, duration: 2.5, layout: "full", type: "mugshot" },
    slice: { interval: 0.15, duration: 0.5, layout: "diagonal", type: "pop" },
    arcane: { interval: 0.3, duration: 0.8, layout: "diagonal", type: "slide" },
    legion: { interval: 0.2, duration: 0.6, layout: "full", type: "scan" },
    dragon: { interval: 0.4, duration: 0.6, layout: "shatter", type: "pop" },
    stellar: {
      interval: 0.3,
      duration: 0.6,
      layout: "diagonal",
      type: "slide",
    },
    stellar_left: {
      interval: 0.3,
      duration: 0.6,
      layout: "diagonal",
      type: "slide",
    },
    horizon: {
      interval: 0.15,
      duration: 0.5,
      layout: "horizontal",
      type: "slide",
    },
  };

  static processText(text, context = {}) {
    if (!text) return "";
    let t = text;
    const { actor, item } = context;

    if (actor) t = t.replace(/\{\{(name|alias)\}\}/gi, actor.name);

    if (t.includes("{{item}}")) {
      const itemName = item ? item.name : "";
      t = t.replace(/\{\{item\}\}/gi, itemName);
    }

    if (t.includes("{{target}}")) {
      const targets = game.user.targets;
      let targetName = "Enemy";
      if (targets.size > 0) targetName = targets.first().name;
      t = t.replace(/\{\{target\}\}/gi, targetName);
    }

    if (t.includes("{{round}}")) {
      const round = game.combat ? game.combat.round : 1;
      t = t.replace(/\{\{round\}\}/gi, round);
    }

    return t;
  }

  static applyRandomization(data) {
    const pick = (val) => {
      if (!val || typeof val !== "string") return val;
      const options = val.split(";");
      if (options.length <= 1) return val;
      return options[Math.floor(Math.random() * options.length)].trim();
    };

    if (data.text) data.text = pick(data.text);
    if (data.subText) data.subText = pick(data.subText);
    if (data.sound) data.sound = pick(data.sound);
    if (data.sfx) data.sfx = pick(data.sfx);

    if (
      data.variations &&
      Array.isArray(data.variations) &&
      data.variations.length > 0
    ) {
      const candidates = [
        {
          img: data.img,
          charScale: data.charScale,
          charOffsetX: data.charOffsetX,
          charOffsetY: data.charOffsetY,
          text: data.text, // 현재 결정된 메인 텍스트
          subText: data.subText, // 현재 결정된 서브 텍스트
        },
      ];

      data.variations.forEach((v) => {
        if (v.img) {
          candidates.push({
            img: v.img,
            charScale: v.charScale ?? 1.0,
            charOffsetX: v.charOffsetX ?? 0,
            charOffsetY: v.charOffsetY ?? 0,
            text: v.text,
            subText: v.subText,
          });
        }
      });

      const selected =
        candidates[Math.floor(Math.random() * candidates.length)];

      data.img = selected.img;
      data.charScale = selected.charScale;
      data.charOffsetX = selected.charOffsetX;
      data.charOffsetY = selected.charOffsetY;

      if (selected.text) data.text = selected.text;
      if (selected.subText) data.subText = selected.subText;
    } else if (
      data.img &&
      typeof data.img === "string" &&
      data.img.includes(";")
    ) {
      data.img = pick(data.img);
    }
    return data;
  }

  // Path helper (subpath support)
  static _fixPath(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const normalizedPath = path.startsWith("/") ? path : "/" + path;
    return foundry.utils.getRoute(normalizedPath);
  }

  // Video check helper
  static _isVideo(path) {
    if (!path) return false;
    return path.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);
  }

  static async playSingle(data) {
    const playbackId = this._createPlaybackInstanceId(
      data.audioOnly ? "audio-only" : "single",
    );
    if (data.audioOnly) {
      await this._handleAudio(data, playbackId);
      return 4000;
    }

    const overlay = document.getElementById(this.ID);
    if (!overlay) return 0;

    const wrapper = this._getOrInitializeWrapper(overlay);
    wrapper.id = playbackId;
    const stage = document.getElementById("cinematic-single-stage");

    const finalData = await this._preparePlayData(data);

    this._updateTextElements(wrapper, finalData);
    this._updateMainCharacter(wrapper, finalData);
    this._updateLayers(wrapper, finalData);

    this._applyStyles(overlay, wrapper, stage, finalData);

    return this._startAnimationSequence(overlay, wrapper, stage, finalData);
  }

  // -------------------------------------------------------------------------
  // --- Audio Handling ---
  // -------------------------------------------------------------------------
  static _createPlaybackInstanceId(prefix = "playback") {
    const randomId =
      globalThis.foundry?.utils?.randomID?.() ??
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return `${prefix}-${randomId}`;
  }

  static async _handleAudio(data, wrapperId = "default") {
    const stopGeneration = this._audioStopGeneration;
    const ownerGeneration = this._audioOwnerGenerations.get(wrapperId) ?? 0;
    const soundVol = (data.soundVolume ?? 80) / 100;
    const sfxVol = (data.sfxVolume ?? 80) / 100;
    const promises = [];
    if (data.sound) {
      promises.push(
        foundry.audio.AudioHelper.play(
          { src: data.sound, volume: soundVol, autoplay: true, loop: false },
          false,
        ),
      );
    }
    if (data.sfx) {
      promises.push(
        foundry.audio.AudioHelper.play(
          { src: data.sfx, volume: sfxVol, autoplay: true, loop: false },
          false,
        ),
      );
    }
    if (promises.length > 0) {
      const sounds = await Promise.all(promises);
      const activeSounds = sounds.filter((s) => s);
      if (
        stopGeneration !== this._audioStopGeneration ||
        ownerGeneration !== (this._audioOwnerGenerations.get(wrapperId) ?? 0)
      ) {
        activeSounds.forEach((sound) => sound?.stop?.());
        return;
      }
      const existing = this._activeSounds.get(wrapperId) ?? [];
      this._activeSounds.set(wrapperId, [...existing, ...activeSounds]);
    }
  }

  static _scheduleTrackedAudio(data, wrapperId, delayMs = 0) {
    const play = () => {
      const pending = this._handleAudio(data, wrapperId);
      Promise.resolve(pending).catch((error) =>
        console.warn("Cinematic FX | Audio playback failed.", error),
      );
    };
    if (!(Number(delayMs) > 0)) {
      play();
      return null;
    }
    const timer = setTimeout(() => {
      this._soundTimers.delete(timer);
      play();
    }, delayMs);
    this._soundTimers.add(timer);
    return timer;
  }

  static _stopAudio(wrapperId = "default", mediaRoot = undefined) {
    this._audioOwnerGenerations.set(
      wrapperId,
      (this._audioOwnerGenerations.get(wrapperId) ?? 0) + 1,
    );
    const sounds = this._activeSounds.get(wrapperId);
    if (sounds) {
      sounds.forEach((s) => {
        if (s?.stop) s.stop();
      });
      this._activeSounds.delete(wrapperId);
    }

    const overlay =
      mediaRoot === undefined ? document.getElementById(this.ID) : mediaRoot;
    if (overlay) {
      overlay.querySelectorAll("video").forEach((v) => {
        v.pause();
        v.removeAttribute("src");
        v.load();
        v.remove();
      });
    }
  }

  static _layerDelayTimers = new Map();

  static _revealDelayedLayers(wrapper, wrapperId = "default") {
    const existing = this._layerDelayTimers.get(wrapperId);
    if (existing) existing.forEach((id) => clearTimeout(id));

    const timers = [];
    const layerContainer = wrapper.querySelector(".cinematic-custom-layers");
    if (!layerContainer) return;

    layerContainer.querySelectorAll(".custom-layer-media").forEach((el) => {
      const delaySec = Number(el.dataset.layerDelay) || 0;
      if (delaySec > 0) {
        const timerId = setTimeout(() => {
          el.style.display = "block";
          if (el.tagName === "VIDEO") {
            el.currentTime = 0;
            el.play().catch(() => {});
          }
        }, delaySec * 1000);
        timers.push(timerId);
      }
    });

    if (timers.length > 0) this._layerDelayTimers.set(wrapperId, timers);
  }

  static _clearLayerDelayTimers(wrapperId = "default") {
    const timers = this._layerDelayTimers.get(wrapperId);
    if (timers) {
      timers.forEach((id) => clearTimeout(id));
      this._layerDelayTimers.delete(wrapperId);
    }
  }

  static async playGroup(payload) {
    const overlay = document.getElementById(this.GROUP_ID);
    if (!overlay) return 0;

    const container = overlay.querySelector(".cinematic-group-container");
    if (!container) return 0;

    const stage = document.getElementById("cinematic-group-stage");

    const playbackId = this._createPlaybackInstanceId("group");
    const totalDuration = this.renderCinematic(
      container,
      payload,
      false,
      playbackId,
    );

    const durSec = totalDuration / 1000;
    if (stage) {
      stage.style.setProperty("--custom-duration", `${durSec}s`);
    }

    const started = await (container._cinematicReady ?? Promise.resolve(true));
    if (started === false) return 0;

    if (stage) {
      requestAnimationFrame(() => stage.classList.add("animate"));
    }

    let globalSound = payload.global?.sound;
    let globalSfx = payload.global?.sfx;
    if (!globalSound && Array.isArray(payload) && payload[0])
      globalSound = payload[0].sound;

    if (globalSound || globalSfx) {
      this._scheduleTrackedAudio(
        {
          sound: globalSound,
          sfx: globalSfx,
          soundVolume: payload.global?.soundVolume ?? 80,
          sfxVolume: payload.global?.sfxVolume ?? 80,
        },
        playbackId,
      );
    }

    if (this._groupTimer) clearTimeout(this._groupTimer);

    overlay.classList.add("active");

    this._groupTimer = setTimeout(
      () => {
        this._clearLayerDelayTimers("group");
        overlay.querySelectorAll("video").forEach((v) => {
          v.pause();
          v.removeAttribute("src");
          v.load();
          v.remove();
        });
        overlay.classList.remove("active");
        container.classList.remove("active", "animate");
        if (stage) stage.classList.remove("animate");
      },
      Math.max(4000, totalDuration),
    );

    return Math.max(4000, totalDuration);
  }

  static triggerScreenShake(intensity) {
    if (!intensity || intensity <= 0) return;
    const groupOverlay = document.getElementById(this.GROUP_ID);
    const singleOverlay = document.getElementById(this.ID);
    let target = null;

    if (groupOverlay && groupOverlay.classList.contains("active")) {
      target = groupOverlay;
    } else if (singleOverlay && singleOverlay.classList.contains("active")) {
      target = singleOverlay;
    }
    if (!target) return;

    target.style.setProperty("--shake-power", intensity);
    target.classList.remove("cinematic-canvas-shake");
    void target.offsetWidth;
    target.classList.add("cinematic-canvas-shake");

    setTimeout(() => {
      if (target) {
        target.classList.remove("cinematic-canvas-shake");
        target.style.removeProperty("--shake-power");
      }
    }, 550);
  }

  static _updateSkipButton(show) {
    let btn = document.getElementById("cinematic-skip-btn");

    if (show) {
      if (!btn) {
        btn = document.createElement("button");
        btn.id = "cinematic-skip-btn";
        btn.innerHTML = "<i class='fas fa-forward'></i> SKIP ALL";

        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.stopAll();
        };

        document.body.appendChild(btn);
      }

      btn.style.display = "flex";
      requestAnimationFrame(() => {
        btn.classList.add("visible");
      });
    } else {
      if (btn) {
        btn.classList.remove("visible");
        setTimeout(() => {
          if (btn && !btn.classList.contains("visible")) {
            btn.style.display = "none";
          }
        }, 200);
      }
    }
  }

  static stopAll() {
    console.log("Cinematic FX | Playback stopped by user.");

    const activeJob = this._activeQueueJob;
    const queuedJobs = this._queue.splice(0);
    if (this._queueTimer) clearTimeout(this._queueTimer);
    this._queueTimer = null;
    this._activeQueueJob = null;
    this._settleQueueJob(
      activeJob,
      playbackResult("cancelled", { reason: "stop-all" }),
    );
    for (const job of queuedJobs) {
      this._settleQueueJob(
        job,
        playbackResult("skipped", { reason: "stop-all" }),
      );
    }
    this._animToken = null;

    if (this._timer) clearTimeout(this._timer);
    if (this._groupTimer) clearTimeout(this._groupTimer);
    this._timer = null;
    this._groupTimer = null;
    this._audioStopGeneration += 1;
    for (const timer of this._soundTimers) clearTimeout(timer);
    this._soundTimers.clear();

    this._activeSounds.forEach((sounds) => {
      sounds.forEach((s) => {
        if (s?.stop) s.stop();
      });
    });
    this._activeSounds.clear();

    const overlays = [
      document.getElementById(this.ID),
      document.getElementById(this.GROUP_ID),
    ];

    overlays.forEach((el) => {
      if (el) {
        if (el._soundTimers && Array.isArray(el._soundTimers)) {
          el._soundTimers.forEach((t) => clearTimeout(t));
        }
        el._soundTimers = [];
        el.querySelectorAll("video").forEach((v) => {
          v.pause();
          v.removeAttribute("src");
          v.load();
          v.remove();
        });
        el.classList.remove("active", "animate", "voting-mode");
        if (el.id === this.GROUP_ID) {
          const container = el.querySelector(".cinematic-group-container");
          const stage = el.querySelector(".cinematic-aspect-stage");

          if (container) {
            if (Array.isArray(container._soundTimers)) {
              container._soundTimers.forEach((timer) => clearTimeout(timer));
            }
            container._soundTimers = [];
            container._renderToken = null;
            container.classList.remove("active", "animate", "voting-mode");
            container.innerHTML = "";
          }

          stage?.querySelector(".cinematic-vote-btn")?.remove();
          stage?.querySelector(".cinematic-cancel-btn")?.remove();
        }
      }
    });

    this._isPlaying = false;
    this._updateSkipButton(false);

    for (const handle of [...this._inElementHandles]) {
      handle.stop("cancelled");
    }
  }

  static _inElementTimers = new Map();
  static _inElementSessions = new WeakMap();
  static _inElementHandles = new Set();
}

import * as Rendering from "./manager/rendering.js";
import * as Group from "./manager/group.js";
Object.assign(CutinManager, Rendering, Group);
