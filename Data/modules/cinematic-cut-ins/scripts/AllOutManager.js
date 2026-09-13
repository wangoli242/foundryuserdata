import { CinematicSocket } from "./CinematicSocket.js";
import { CutinManager } from "./CutinManager.js";
import { sanitizeManualPanels } from "./manual-panel-geometry.js";

const THEME_TIMINGS = {
  rebel: { interval: 1.2, duration: 0.5 },
  comic: { interval: 1.2, duration: 0.5 },
  urban: { interval: 0.15, duration: 0.5 },
  noir: { interval: 1.2, duration: 0.5 },
  wanted: { interval: 1.5, duration: 2.5 },
  slice: { interval: 0.15, duration: 0.5 },
  arcane: { interval: 0.3, duration: 0.8 },
  legion: { interval: 0.2, duration: 0.6 },
  dragon: { interval: 0.4, duration: 0.6 },
  horizon: { interval: 0.15, duration: 0.5 },
  default: { interval: 0.5, duration: 0.5 },
};

const READY_TRANSFORM_FIELDS = [
  "readyZoom",
  "readyZoomX",
  "readyZoomY",
  "readyScale",
  "readyX",
  "readyY",
  "readyRotation",
  "readyMirror",
];
const hasReadyValue = (value) =>
  value !== undefined && value !== null && value !== "";
const isTruthyReadyValue = (value) =>
  value === true || value === "true" || value === "on" || value === "1";

export class AllOutManager {
  static _activeSession = null;
  static _sessionEnding = false;

  static _sanitizePresetData(presetData) {
    if (
      !presetData ||
      typeof presetData !== "object" ||
      !Array.isArray(presetData.participants)
    )
      return presetData;
    const sourceGlobal =
      presetData.global && typeof presetData.global === "object"
        ? presetData.global
        : presetData;
    const manualPanels =
      sourceGlobal.panelMode === "manual"
        ? sanitizeManualPanels(
            sourceGlobal.manualPanels,
            presetData.participants.length,
          )
        : null;
    const sanitized = {
      ...presetData,
      global: {
        ...sourceGlobal,
        panelMode: manualPanels ? "manual" : "theme",
        manualPanels,
      },
    };
    delete sanitized.panelMode;
    delete sanitized.manualPanels;
    return sanitized;
  }

  static initialize() {
    CinematicSocket.register("startVoteSession", (data) =>
      this._receiveStartSession(data),
    );
    CinematicSocket.register("updateVoteStatus", (data) =>
      this._receiveUpdateStatus(data),
    );
    CinematicSocket.register("endVoteSession", () => this._receiveEndSession());
  }

  static async startSession(presetData) {
    if (!game.user.isGM) return;
    const sanitizedPresetData = this._sanitizePresetData(presetData);
    const participants = Array.isArray(sanitizedPresetData?.participants)
      ? sanitizedPresetData.participants
      : [];

    const sessionData = {
      id: foundry.utils.randomID(),
      preset: sanitizedPresetData,
      status: participants.map((p) => ({
        id: p.actorId,
        ready: false,
        ownerIds: this._getOwnerIds(p.actorId),
      })),
    };

    this._sessionEnding = false;
    await CinematicSocket.executeForEveryone("startVoteSession", sessionData);
  }

  static _receiveStartSession(data) {
    this._activeSession = data;
    this._sessionEnding = false;

    const overlay = document.getElementById(CutinManager.GROUP_ID);
    const container = overlay.querySelector(".cinematic-group-container");

    CutinManager.renderCinematic(container, data.preset, true);

    overlay.classList.add("active", "voting-mode");
    container.classList.add("active", "voting-mode");

    this._checkMyTurn();
  }

  static _checkMyTurn() {
    if (!this._activeSession) return;

    const userId = game.user.id;
    const isGM = game.user.isGM;
    const overlay = document.getElementById(CutinManager.GROUP_ID);
    const stage = overlay.querySelector(".cinematic-aspect-stage");

    let myUnreadyActors = [];
    if (isGM) {
      myUnreadyActors = this._activeSession.status.filter((s) => !s.ready);
    } else {
      myUnreadyActors = this._activeSession.status.filter(
        (s) => !s.ready && s.ownerIds.includes(userId),
      );
    }

    let btn = stage.querySelector(".cinematic-vote-btn");
    const customButtonText =
      this._activeSession?.preset?.global?.voteButtonText || "JOIN ASSAULT";
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "cinematic-vote-btn";
      btn.innerHTML = `<i class='fas fa-fist-raised'></i> ${customButtonText}`;
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._onPlayerClick();
      };
      stage.appendChild(btn);
    }

    if (myUnreadyActors.length > 0) {
      btn.style.display = "block";
      if (isGM) {
        btn.innerHTML = `<i class='fas fa-gavel'></i> FORCE JOIN (${myUnreadyActors.length})`;
        btn.classList.add("gm-force");
      } else {
        btn.innerHTML = `<i class='fas fa-fist-raised'></i> ${customButtonText}`;
        btn.classList.remove("gm-force");
      }
    } else {
      btn.style.display = "none";
    }

    if (isGM) {
      let cancelBtn = stage.querySelector(".cinematic-cancel-btn");
      if (!cancelBtn) {
        cancelBtn = document.createElement("button");
        cancelBtn.className = "cinematic-cancel-btn";
        cancelBtn.innerHTML = "<i class='fas fa-times'></i> CANCEL";
        cancelBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._onCancelSession();
        };
        stage.appendChild(cancelBtn);
      }
    }
  }

  static async _onPlayerClick() {
    if (!this._activeSession) return;

    const userId = game.user.id;
    const isGM = game.user.isGM;
    let targetActorIds = [];

    if (isGM) {
      targetActorIds = this._activeSession.status
        .filter((s) => !s.ready)
        .map((s) => s.id);
    } else {
      targetActorIds = this._activeSession.status
        .filter((s) => !s.ready && s.ownerIds.includes(userId))
        .map((s) => s.id);
    }

    if (targetActorIds.length > 0) {
      await CinematicSocket.executeForEveryone("updateVoteStatus", {
        actorIds: targetActorIds,
      });
    }
  }

  static async _receiveUpdateStatus(data) {
    if (!this._activeSession) return;

    const overlay = document.getElementById(CutinManager.GROUP_ID);
    const slices = overlay.querySelectorAll(".cinematic-slice");
    const readyEntries = [];

    data.actorIds.forEach((actorId) => {
      const idx = this._activeSession.status.findIndex((s) => s.id === actorId);
      if (idx >= 0 && !this._activeSession.status[idx].ready) {
        const participant = this._activeSession.preset?.participants?.[idx];
        this._activeSession.status[idx].ready = true;
        if (slices[idx]) {
          slices[idx].classList.add("ready");

          const readyImg = participant?.readyImg?.trim();
          const imgEl = slices[idx].querySelector(".cinematic-character");
          if (readyImg && imgEl) imgEl.src = readyImg;
          this._applyReadyTransform(slices[idx], participant);
        }

        readyEntries.push({ participant });
      }
    });

    this._playReadyVoteSounds(readyEntries);

    this._checkMyTurn();

    if (game.user.isGM) {
      const allReady = this._activeSession.status.every((s) => s.ready);

      if (allReady && !this._sessionEnding) {
        this._sessionEnding = true;

        const presetToPlay = this._activeSession.preset;
        const linkCombat = presetToPlay.linkToCombat;

        await CinematicSocket.executeForEveryone("endVoteSession");

        game.modules.get("cinematic-cut-ins").api.play(presetToPlay);

        if (linkCombat && game.combat) {
          const theme = presetToPlay.global.theme || "rebel";
          const baseConfig = THEME_TIMINGS[theme] || THEME_TIMINGS.default;
          const speedMultiplier =
            Number(presetToPlay.global.speedMultiplier) || 1.0;
          const config = {
            interval: baseConfig.interval / speedMultiplier,
            duration: baseConfig.duration / speedMultiplier,
          };
          const count = presetToPlay.participants.length;

          const durationMs =
            (count * config.interval + config.duration + 2.0) * 1000;

          console.log(
            `Cinematic FX | Combat Start Scheduled in ${durationMs}ms`,
          );

          setTimeout(async () => {
            const pcIds = this._activeSession.status.map((s) => s.id);
            for (const actorId of pcIds) {
              const combatant = game.combat.combatants.find(
                (c) => c.actorId === actorId,
              );
              if (combatant && combatant.initiative === null) {
                await game.combat.rollInitiative([combatant.id]);
              }
            }

            await game.combat.rollNPC();

            if (!game.combat.started) {
              await game.combat.startCombat();
            }

            ui.notifications.info("Cinematic FX: Combat Started!");

            this._activeSession = null;
            this._sessionEnding = false;
          }, durationMs);
        } else {
          this._activeSession = null;
          this._sessionEnding = false;
        }
      }
    }
  }

  static _playReadyVoteSounds(readyEntries) {
    if (!readyEntries.length) return;

    const fallbackSound =
      this._activeSession?.preset?.global?.voteButtonSound ||
      "modules/cinematic-cut-ins/sounds/click.mp3";
    const hasCustomSound = readyEntries.some(
      (entry) => entry.participant?.readySfx,
    );

    if (!hasCustomSound) {
      this._playReadySound(fallbackSound);
      return;
    }

    readyEntries.forEach((entry, index) => {
      this._playReadySound(
        entry.participant?.readySfx || fallbackSound,
        index * 120,
      );
    });
  }

  static _applyReadyTransform(slice, participant) {
    if (!slice || !this._hasReadyTransform(participant)) return;

    const transformValue = (readyKey, baseKey, fallback) => {
      if (hasReadyValue(participant[readyKey])) return participant[readyKey];
      return participant[baseKey] ?? fallback;
    };

    slice.style.setProperty(
      "--char-scale",
      transformValue("readyScale", "scale", 1.0),
    );
    slice.style.setProperty(
      "--mugshot-zoom",
      transformValue("readyZoom", "zoom", 2.0),
    );
    slice.style.setProperty(
      "--zoom-x",
      `${transformValue("readyZoomX", "zoomX", 0)}px`,
    );
    slice.style.setProperty(
      "--zoom-y",
      `${transformValue("readyZoomY", "zoomY", 0)}px`,
    );
    slice.style.setProperty(
      "--char-x",
      `${transformValue("readyX", "x", 0)}px`,
    );
    slice.style.setProperty(
      "--char-y",
      `${transformValue("readyY", "y", 0)}px`,
    );
    slice.style.setProperty(
      "--char-rotate",
      `${transformValue("readyRotation", "rotation", 0) || 0}deg`,
    );
    slice.style.setProperty(
      "--char-mirror-x",
      participant.readyMirror !== undefined
        ? isTruthyReadyValue(participant.readyMirror)
          ? "-1"
          : "1"
        : participant.mirror
          ? "-1"
          : "1",
    );
  }

  static _hasReadyTransform(participant) {
    return (
      !!participant &&
      (isTruthyReadyValue(participant.readyTransformEnabled) ||
        READY_TRANSFORM_FIELDS.some(
          (field) => participant[field] !== undefined,
        ))
    );
  }

  static _playReadySound(src, delayMs = 0) {
    if (!src) return;

    const choices = src
      .split(";")
      .map((path) => path.trim())
      .filter(Boolean);
    if (!choices.length) return;

    const selected = choices[Math.floor(Math.random() * choices.length)];
    const ownerId = `all-out-ready-${this._activeSession?.id || "session"}`;
    CutinManager._scheduleTrackedAudio(
      {
        sound: foundry.utils.getRoute(selected),
        soundVolume: 80,
      },
      ownerId,
      delayMs,
    );
  }

  static _receiveEndSession() {
    const overlay = document.getElementById(CutinManager.GROUP_ID);
    if (!overlay) return;

    const container = overlay.querySelector(".cinematic-group-container");
    const stage = overlay.querySelector(".cinematic-aspect-stage");

    overlay.classList.remove("active", "voting-mode");
    if (container) {
      container.classList.remove("active", "voting-mode");
      container.innerHTML = "";
    }

    const btn = stage.querySelector(".cinematic-vote-btn");
    const cbtn = stage.querySelector(".cinematic-cancel-btn");
    if (btn) btn.remove();
    if (cbtn) cbtn.remove();
  }

  static _getOwnerIds(actorId) {
    const actor = game.actors.get(actorId);
    if (!actor) return [];
    return game.users
      .filter((u) => !u.isGM && actor.testUserPermission(u, "OWNER"))
      .map((u) => u.id);
  }

  static async _onCancelSession() {
    this._sessionEnding = false;
    await CinematicSocket.executeForEveryone("endVoteSession");
    this._activeSession = null;
    ui.notifications.info("Cinematic FX: Session cancelled.");
  }
}
