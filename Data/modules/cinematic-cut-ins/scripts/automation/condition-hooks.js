import { MODULE_ID, SETTING_KEYS } from "../constants.js";
import {
  executeTriggerMacro,
  getActorTriggers,
  playPreset,
} from "./trigger-engine.js";

export function registerConditionHooks({
  executeMacro = executeTriggerMacro,
  getGame = () => globalThis.game,
  getTriggers = getActorTriggers,
  hooks = globalThis.Hooks,
  play = playPreset,
} = {}) {
  const runTriggers = async (actor, document, mode) => {
    const gameRef = getGame();
    if (gameRef.users.activeGM?.id !== gameRef.user.id) {
      return;
    }
    if (!gameRef.settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }
    if (!actor || !document) {
      return;
    }

    const triggers = getTriggers(actor) || {};
    const conditionTriggers = Array.isArray(triggers.conditions)
      ? triggers.conditions
      : [];

    for (const trigger of conditionTriggers) {
      if ((trigger.mode || "apply") !== mode) {
        continue;
      }
      if (!conditionDocumentMatches(document, trigger.conditionId)) {
        continue;
      }
      if (hasActiveMatchingCondition(actor, trigger.conditionId, document)) {
        continue;
      }

      console.log(`Cinematic FX | Condition ${mode}: ${trigger.conditionId}`);
      await play(actor, trigger.presetId);
      if (trigger.macroId) {
        await executeMacro(trigger.macroId, actor, null);
      }
    }
  };

  hooks.on("createActiveEffect", async (effect) => {
    if (effect.disabled) {
      return;
    }
    await runTriggers(getConditionActor(effect), effect, "apply");
  });

  hooks.on("updateActiveEffect", async (effect, changed) => {
    if (changed.disabled === false) {
      await runTriggers(getConditionActor(effect), effect, "apply");
    } else if (changed.disabled === true) {
      await runTriggers(getConditionActor(effect), effect, "remove");
    }
  });

  hooks.on("deleteActiveEffect", async (effect) => {
    if (effect.disabled) {
      return;
    }
    await runTriggers(getConditionActor(effect), effect, "remove");
  });

  hooks.on("createItem", async (item) => {
    if (!isConditionItem(item)) {
      return;
    }
    await runTriggers(getConditionActor(item), item, "apply");
  });

  hooks.on("deleteItem", async (item) => {
    if (!isConditionItem(item)) {
      return;
    }
    await runTriggers(getConditionActor(item), item, "remove");
  });
}

function normalizeConditionKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function toDocumentArray(collection) {
  if (!collection) {
    return [];
  }
  if (Array.isArray(collection)) {
    return collection;
  }
  if (Array.isArray(collection.contents)) {
    return collection.contents;
  }
  return Array.from(collection);
}

function isConditionItem(document) {
  return document?.type === "condition";
}

function getConditionDocumentKeys(document) {
  const keys = [];
  const addKey = (value) => {
    if (value === undefined || value === null) {
      return;
    }
    const key = String(value).trim();
    if (key) {
      keys.push(key);
    }
  };

  if (document?.statuses instanceof Set) {
    document.statuses.forEach(addKey);
  } else if (Array.isArray(document?.statuses)) {
    document.statuses.forEach(addKey);
  }

  addKey(document?.flags?.core?.statusId);
  addKey(document?.slug);
  addKey(document?.system?.slug);
  addKey(document?.id);
  addKey(document?.label);
  addKey(document?.name);
  return keys;
}

function conditionDocumentMatches(document, conditionId) {
  const target = normalizeConditionKey(conditionId);
  if (!target) {
    return false;
  }
  return getConditionDocumentKeys(document).some(
    (key) => normalizeConditionKey(key) === target,
  );
}

function getConditionActor(document) {
  const parent = document?.parent;
  if (parent?.documentName === "Actor") {
    return parent;
  }
  const actor = document?.actor || parent?.actor;
  return actor?.documentName === "Actor" ? actor : null;
}

function hasActiveMatchingCondition(
  actor,
  conditionId,
  excludedDocument = null,
) {
  if (!actor) {
    return false;
  }
  const documents = [
    ...toDocumentArray(actor.effects),
    ...toDocumentArray(actor.itemTypes?.condition),
  ];

  return documents.some((document) => {
    if (
      excludedDocument &&
      (document.id === excludedDocument.id ||
        document.uuid === excludedDocument.uuid)
    ) {
      return false;
    }
    if (document.disabled) {
      return false;
    }
    return conditionDocumentMatches(document, conditionId);
  });
}
