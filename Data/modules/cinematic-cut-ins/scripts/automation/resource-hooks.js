import { FLAG_KEYS, MODULE_ID, SETTING_KEYS } from "../constants.js";
import {
  executeTriggerMacro,
  getActorTriggers,
  playPreset,
} from "./trigger-engine.js";

export function registerResourceHooks({
  executeMacro = executeTriggerMacro,
  getGame = () => globalThis.game,
  getProperty = (object, path) =>
    globalThis.foundry.utils.getProperty(object, path),
  getTriggers = getActorTriggers,
  hasProperty = (object, path) =>
    globalThis.foundry.utils.hasProperty(object, path),
  hooks = globalThis.Hooks,
  play = playPreset,
} = {}) {
  hooks.on("updateActor", async (actor, changed, _options, userId) => {
    void _options;

    const gameRef = getGame();
    if (gameRef.user.id !== userId) {
      return;
    }
    if (!gameRef.settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }

    const triggers = getTriggers(actor) || {};
    const resourceTriggers = triggers.resources || [];
    if (resourceTriggers.length === 0) {
      return;
    }

    const triggerStates =
      actor.getFlag(MODULE_ID, FLAG_KEYS.TRIGGER_STATES) || {};
    let stateChanged = false;

    // Existing releases evaluate thresholds for every originating Actor update,
    // even when the changed payload does not contain the configured value path.
    for (let index = 0; index < resourceTriggers.length; index += 1) {
      const trigger = resourceTriggers[index];
      if (!trigger.path) {
        continue;
      }

      const valuePath = trigger.path;
      hasProperty(changed, valuePath);
      const currentValue = getProperty(actor, valuePath);
      if (currentValue === undefined) {
        continue;
      }

      const mode = trigger.mode || "decrease";
      const type = trigger.type || "percent";
      const threshold = Number(trigger.threshold) || 0;
      const stateKey = `trigger_${index}_${trigger.presetId}`;
      const wasActive = triggerStates[stateKey] || false;
      const isActive = isThresholdActive({
        actor,
        currentValue,
        getProperty,
        mode,
        threshold,
        trigger,
        type,
        valuePath,
      });

      if (isActive === null) {
        continue;
      }

      if (isActive && !wasActive) {
        const isAlive = mode === "increase" || currentValue > -100;
        if (isAlive) {
          console.log(
            `Cinematic FX | Resource Triggered: ${valuePath} (${currentValue}) / Mode: ${mode} / Type: ${type}`,
          );
          await play(actor, trigger.presetId);
          if (trigger.macroId) {
            await executeMacro(trigger.macroId, actor, null);
          }
        }

        triggerStates[stateKey] = true;
        stateChanged = true;
      } else if (!isActive && wasActive) {
        triggerStates[stateKey] = false;
        stateChanged = true;
      }
    }

    if (stateChanged) {
      await actor.setFlag(MODULE_ID, FLAG_KEYS.TRIGGER_STATES, triggerStates);
    }
  });
}

function isThresholdActive({
  actor,
  currentValue,
  getProperty,
  mode,
  threshold,
  trigger,
  type,
  valuePath,
}) {
  if (type === "value") {
    return mode === "decrease"
      ? currentValue <= threshold
      : currentValue >= threshold;
  }

  const maxValue = resolveMaxValue(trigger, actor, valuePath, getProperty);
  if (maxValue === undefined || maxValue === 0) {
    return null;
  }

  const percent = (currentValue / maxValue) * 100;
  return mode === "decrease" ? percent <= threshold : percent >= threshold;
}

function resolveMaxValue(trigger, actor, valuePath, getProperty) {
  if (trigger.customMax) {
    const parsed = Number(trigger.customMax);
    const isNumeric =
      !isNaN(parsed) && trigger.customMax.toString().trim() !== "";
    if (isNumeric) {
      return parsed;
    }

    const valueFromPath = getProperty(actor, trigger.customMax);
    if (valueFromPath !== undefined && valueFromPath !== null) {
      return valueFromPath;
    }
  }

  let maxPath = valuePath.replace(/\.value$/, ".max");
  if (maxPath === valuePath) {
    const pathParts = valuePath.split(".");
    pathParts.pop();
    maxPath = `${pathParts.join(".")}.max`;
  }
  return getProperty(actor, maxPath);
}
