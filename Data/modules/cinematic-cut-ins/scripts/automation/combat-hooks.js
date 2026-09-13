import { CutinManager } from "../CutinManager.js";
import { MODULE_ID, SETTING_KEYS } from "../constants.js";
import {
  executeTriggerMacro,
  getActorTriggers,
  playPreset,
} from "./trigger-engine.js";
import {
  getCombatSceneId,
  selectSceneAutomationPresets,
} from "./scene-scope.js";

export function registerCombatHooks({
  cloneScene = (scene) => globalThis.foundry.utils.deepClone(scene),
  executeMacro = executeTriggerMacro,
  getGame = () => globalThis.game,
  getModuleApi = (gameRef) => gameRef.modules.get(MODULE_ID).api,
  getSceneId = getCombatSceneId,
  getTriggers = getActorTriggers,
  hooks = globalThis.Hooks,
  play = playPreset,
  processText = (text, context) => CutinManager.processText(text, context),
  randomizeScene = (scene) => CutinManager.applyRandomization(scene),
  selectScenePresets = selectSceneAutomationPresets,
} = {}) {
  const playScene = (scene, typeLabel, gameRef) => {
    console.log(`Cinematic FX | ${typeLabel} Trigger: ${scene.name}`);

    let playData = cloneScene(scene);
    if (!playData.layers) {
      playData.layers = [];
    }

    playData = randomizeScene(playData);
    if (playData.text) {
      playData.text = processText(playData.text, {
        actor: null,
        item: null,
      });
    }
    if (playData.subText) {
      playData.subText = processText(playData.subText, {
        actor: null,
        item: null,
      });
    }

    const api = getModuleApi(gameRef);
    if (playData.localOnly) {
      api.playLocal(playData);
    } else {
      api.play(playData);
    }
  };

  hooks.on("updateCombat", async (combat, changed, _options, _userId) => {
    void _options;
    void _userId;
    const gameRef = getGame();
    if (gameRef.users.activeGM?.id !== gameRef.user.id) {
      return;
    }
    if (!gameRef.settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }

    const previousCombatantId = combat.previous?.combatantId;
    const currentCombatantId = combat.combatant?.id;
    const currentRound = combat.round || 1;

    if (changed.round) {
      const scenes = gameRef.settings.get(
        MODULE_ID,
        SETTING_KEYS.SCENE_PRESETS,
      );
      const combatSceneId = getSceneId(combat);
      const combatStartQueue =
        changed.round === 1
          ? selectScenePresets(scenes, {
              sceneId: combatSceneId,
              trigger: "triggerOnCombatStart",
            })
          : [];

      let roundStartQueue = selectScenePresets(scenes, {
        sceneId: combatSceneId,
        trigger: "triggerOnRoundStart",
      });

      // A preset configured for both events plays only its Combat Start
      // automation when round 1 begins.
      if (changed.round === 1) {
        roundStartQueue = roundStartQueue.filter(
          (scene) => !scene.triggerOnCombatStart,
        );
      }

      combatStartQueue.forEach((scene) => {
        playScene(scene, "Combat Start", gameRef);
      });
      roundStartQueue.forEach((scene) => {
        playScene(scene, "Round Start", gameRef);
      });
    }

    const isTurnChanged =
      currentCombatantId !== previousCombatantId || changed.round !== undefined;
    if (!isTurnChanged) {
      return;
    }

    if (previousCombatantId && previousCombatantId !== currentCombatantId) {
      const previousCombatant = combat.combatants.get(previousCombatantId);
      if (previousCombatant?.actor) {
        const previousActor = previousCombatant.actor;
        const triggers = getTriggers(previousActor) || {};
        const endTriggers = Array.isArray(triggers.turnEnd)
          ? triggers.turnEnd
          : triggers.turnEndPreset
            ? [
                {
                  presetId: triggers.turnEndPreset,
                  round: triggers.turnEndRound,
                },
              ]
            : [];

        for (const trigger of endTriggers) {
          if (!isRoundMatch(trigger.round, currentRound)) {
            continue;
          }
          await play(previousActor, trigger.presetId);
          if (trigger.macroId) {
            await executeMacro(trigger.macroId, previousActor, null);
          }
        }
      }
    }

    const currentCombatant = combat.combatant;
    if (!currentCombatant?.actor) {
      return;
    }

    const actor = currentCombatant.actor;
    const triggers = getTriggers(actor) || {};
    const startTriggers = Array.isArray(triggers.turnStart)
      ? triggers.turnStart
      : triggers.turnStartPreset
        ? [
            {
              presetId: triggers.turnStartPreset,
              round: triggers.turnStartRound,
            },
          ]
        : [];

    for (const trigger of startTriggers) {
      if (!isRoundMatch(trigger.round, currentRound)) {
        continue;
      }
      await play(actor, trigger.presetId);
      if (trigger.macroId) {
        await executeMacro(trigger.macroId, actor, null);
      }
    }
  });

  hooks.on("deleteCombat", async (combat, _options, _userId) => {
    void _options;
    void _userId;
    const gameRef = getGame();
    if (gameRef.users.activeGM?.id !== gameRef.user.id) {
      return;
    }
    if (!gameRef.settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }

    const scenes = gameRef.settings.get(MODULE_ID, SETTING_KEYS.SCENE_PRESETS);
    const combatEndQueue = selectScenePresets(scenes, {
      sceneId: getSceneId(combat),
      trigger: "triggerOnCombatEnd",
    });

    for (const scene of combatEndQueue) {
      playScene(scene, "Combat End", gameRef);
    }
  });
}

function isRoundMatch(roundSetting, currentRound) {
  if (!roundSetting || String(roundSetting).trim() === "") {
    return true;
  }
  if (String(roundSetting).toLowerCase() === "all") {
    return true;
  }

  const targetRounds = String(roundSetting)
    .split(",")
    .map((round) => Number(round.trim()));
  return targetRounds.includes(currentRound);
}
