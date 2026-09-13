import { CinematicSocket } from "./CinematicSocket.js";
import {
  FLAG_KEYS,
  MODULE_ID,
  SETTING_KEYS,
  SOCKET_HANDLERS,
} from "./constants.js";
import { sanitizeManualPanels } from "./manual-panel-geometry.js";
import { touchCinematicMenuProvider } from "./menu-extension.js";
import {
  listPlayablePresets,
  resolvePlayablePreset,
} from "./playable-presets-api.js";
import { playbackResult, settledPlaybackHandle } from "./playback-lifecycle.js";

let publicApi = null;

export function registerPlaybackSocketHandler({ cutinManager }) {
  CinematicSocket.register(SOCKET_HANDLERS.PLAY_CUT_IN, (data) => {
    if (isClientDisabled()) {
      return;
    }
    cutinManager.play(sanitizeAllOutPayload(data));
  });
}

export function exposeApi(dependencies) {
  publicApi ??= createPublicApi(dependencies);
  const moduleRecord = game.modules.get(MODULE_ID);
  moduleRecord.api = publicApi;
  touchCinematicMenuProvider();
  return publicApi;
}

function createPublicApi({
  allOutManager,
  cinematicConfig,
  cinematicControl,
  cutinManager,
  interactionManager,
}) {
  const playLocal = (data) => {
    if (isClientDisabled()) {
      return;
    }
    cutinManager.play(sanitizeAllOutPayload(data));
  };

  const playLocalAndWait = (data) => {
    if (isClientDisabled()) {
      return Promise.resolve(
        playbackResult("skipped", { reason: "client-disabled" }),
      );
    }
    return cutinManager.playAndWait(sanitizeAllOutPayload(data));
  };

  const playPresetLocal = (selection) => {
    const data = resolvePresetPlaybackData(selection, cutinManager);
    if (!data) {
      return false;
    }
    playLocal(data);
    return true;
  };

  const playPresetLocalAndWait = (selection) => {
    const data = resolvePresetPlaybackData(selection, cutinManager);
    if (!data) {
      return false;
    }
    return playLocalAndWait(data);
  };

  const playPresetInElement = (targetEl, selection, options = {}) => {
    const data = resolvePresetPlaybackData(selection, cutinManager);
    if (!data) {
      return false;
    }
    if (isClientDisabled()) {
      return settledPlaybackHandle(
        playbackResult("skipped", { reason: "client-disabled" }),
      );
    }
    return cutinManager.playInElement(
      targetEl,
      sanitizeAllOutPayload(data),
      options,
    );
  };

  return {
    play: (data) =>
      CinematicSocket.executeForEveryone(
        SOCKET_HANDLERS.PLAY_CUT_IN,
        sanitizeAllOutPayload(data),
      ),
    playLocal,
    playInElement: (targetEl, data, options = {}) => {
      if (isClientDisabled()) {
        return settledPlaybackHandle(
          playbackResult("skipped", { reason: "client-disabled" }),
        );
      }
      return cutinManager.playInElement(targetEl, data, options);
    },
    prompt: (actorId, presetId) =>
      interactionManager.sendPrompt(actorId, presetId),
    vote: (groupPresetId) => {
      const presets =
        game.user.getFlag(MODULE_ID, FLAG_KEYS.ALL_OUT_PRESETS) || {};
      const data = presets[groupPresetId];
      if (!data) {
        return ui.notifications.warn("Cinematic FX: Group Preset not found.");
      }

      const payload = {
        linkToCombat: data.linkToCombat || false,
        global: { ...data },
        participants: data.participants,
      };
      allOutManager.startSession(sanitizeAllOutPayload(payload));
    },

    getGlobalPresets: () => {
      return foundry.utils.deepClone(
        game.settings.get(MODULE_ID, SETTING_KEYS.GLOBAL_PRESETS) || {},
      );
    },
    getGlobalPreset: (nameOrId) => {
      const presets =
        game.settings.get(MODULE_ID, SETTING_KEYS.GLOBAL_PRESETS) || {};
      if (presets[nameOrId]) {
        return foundry.utils.deepClone(presets[nameOrId]);
      }
      const found = Object.values(presets).find(
        (preset) => (preset.presetName || preset.name) === nameOrId,
      );
      return found ? foundry.utils.deepClone(found) : null;
    },
    getAllOutPresets: () => {
      return foundry.utils.deepClone(
        game.user.getFlag(MODULE_ID, FLAG_KEYS.ALL_OUT_PRESETS) || {},
      );
    },
    getAllOutPreset: (nameOrId) => {
      const presets =
        game.user.getFlag(MODULE_ID, FLAG_KEYS.ALL_OUT_PRESETS) || {};
      if (presets[nameOrId]) {
        return foundry.utils.deepClone(presets[nameOrId]);
      }
      const found = Object.values(presets).find(
        (preset) => (preset.name || preset.presetName) === nameOrId,
      );
      return found ? foundry.utils.deepClone(found) : null;
    },
    getActorPresets: (actor) => {
      let resolvedActor = actor;
      if (typeof resolvedActor === "string") {
        resolvedActor =
          fromUuidSync(resolvedActor) ?? game.actors.get(resolvedActor);
      }
      if (!resolvedActor) {
        return {};
      }
      return foundry.utils.deepClone(
        resolvedActor.getFlag(MODULE_ID, FLAG_KEYS.ACTOR_PRESETS) || {},
      );
    },
    getScenePresets: () => {
      return foundry.utils.deepClone(
        game.settings.get(MODULE_ID, SETTING_KEYS.SCENE_PRESETS) || {},
      );
    },
    listPlayablePresets: () => listPlayablePresets(game),
    playPresetLocal,
    playPresetLocalAndWait,
    playPresetInElement,

    config: cinematicConfig,
    control: cinematicControl,
    CutinManager: cutinManager,
  };
}

function resolvePresetPlaybackData(
  selection,
  cutinManager,
  gameRef = globalThis.game,
) {
  const resolved = resolvePlayablePreset(selection, gameRef);
  if (!resolved) {
    return null;
  }

  let data = resolved.data;
  if (resolved.actor) {
    data.actorId = resolved.actor.uuid ?? resolved.actor.id;
    if (!Array.isArray(data.layers)) {
      data.layers = [];
    }
    data = cutinManager.applyRandomization(data);
    if (data.text) {
      data.text = cutinManager.processText(data.text, {
        actor: resolved.actor,
        item: null,
      });
    }
    if (data.subText) {
      data.subText = cutinManager.processText(data.subText, {
        actor: resolved.actor,
        item: null,
      });
    }
  }
  return data;
}

function sanitizeAllOutPayload(data) {
  if (!data || typeof data !== "object" || !Array.isArray(data.participants)) {
    return data;
  }

  const sourceGlobal =
    data.global && typeof data.global === "object" ? data.global : data;
  const manualPanels =
    sourceGlobal.panelMode === "manual"
      ? sanitizeManualPanels(
          sourceGlobal.manualPanels,
          data.participants.length,
        )
      : null;
  const sanitized = {
    ...data,
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

function isClientDisabled() {
  return game.settings.get(MODULE_ID, SETTING_KEYS.DISABLE_CLIENT);
}
