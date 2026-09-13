import {
  debugLog,
  playMatchedTriggers,
  getActorTriggers,
  getMatchingPresets,
  checkActorSystemHookTriggers,
  checkChatTriggers,
  resolveItemFromMessage,
  findItemByName,
  _extractRollsFromMessage,
  _getMessageTextForMatching,
  _rollHasRealDice,
  DSN_PENDING_CUTINS,
  setCurrentProcessingMessage,
} from "./trigger-engine.js";
import { registerChatAnalysisHooks } from "./chat-analysis.js";
import { registerCombatHooks } from "./combat-hooks.js";
import { registerConditionHooks } from "./condition-hooks.js";
import { registerResourceHooks } from "./resource-hooks.js";
export { registerMidiHooks } from "./midi-hooks.js";
export { registerRsreforgedHooks } from "./rsreforged-hooks.js";

// --------------------------
// System Specific Handlers
// --------------------------

async function handleDnD5e(message) {
  const type = message.flags.dnd5e?.roll?.type;
  const isAttack = type === "attack";
  const isDamage = type === "damage";

  let item = await resolveItemFromMessage(message);
  const isCrit =
    isAttack &&
    (message.rolls?.[0]?.isCritical || message.flags.dnd5e?.roll?.isCritical);

  const actor = item?.actor || ChatMessage.getSpeakerActor(message.speaker);
  await checkActorSystemHookTriggers(actor, { isAttack, isDamage, isCrit });

  // [CASE A] Item Use
  if (item && item.actor) {
    let presetsToPlay = [];

    if (isAttack) {
      presetsToPlay.push(
        ...getMatchingPresets(item, {
          triggerType: "onAttack",
          message: message,
        }),
      );

      if (isCrit) {
        presetsToPlay.push(
          ...getMatchingPresets(item, {
            triggerType: "onCrit",
            message: message,
          }),
        );
      }
    } else if (isDamage) {
      presetsToPlay.push(
        ...getMatchingPresets(item, {
          triggerType: "onDamage",
          message: message,
        }),
      );
    } else {
      let found = getMatchingPresets(item, {
        triggerType: "onUse",
        message: message,
      });

      if (found.length > 0) {
        presetsToPlay.push(...found);
      } else if (item.type === "spell") {
        const triggers = getActorTriggers(item.actor) || {};
        if (triggers.defaultSpellPreset) {
          presetsToPlay.push({ presetId: triggers.defaultSpellPreset });
          debugLog("Using Default Spell Preset", triggers.defaultSpellPreset);
        }
      } else {
      }
    }

    await playMatchedTriggers(presetsToPlay, item.actor, item);

    return;
  } else {
  }
}
async function handlePF2e(message) {
  const context = message.flags.pf2e?.context || {};
  const type = context.type;

  const isAttack = type && type.includes("attack");
  const isDamage = type === "damage-roll";
  const isCrit = isAttack && context.outcome === "criticalSuccess";

  const actor = ChatMessage.getSpeakerActor(message.speaker);

  await checkActorSystemHookTriggers(actor, { isAttack, isDamage, isCrit });

  let item = await resolveItemFromMessage(message);
  if (!item || !item.actor) return;

  let presetsToPlay = [];

  if (isAttack) {
    presetsToPlay.push(
      ...getMatchingPresets(item, {
        triggerType: "onAttack",
        message: message,
      }),
    );

    if (isCrit) {
      presetsToPlay.push(
        ...getMatchingPresets(item, {
          triggerType: "onCrit",
          message: message,
        }),
      );
    }
  } else if (isDamage) {
    presetsToPlay.push(
      ...getMatchingPresets(item, {
        triggerType: "onDamage",
        message: message,
      }),
    );
  } else {
    let found = getMatchingPresets(item, {
      triggerType: "onUse",
      message: message,
    });

    if (found.length > 0) {
      presetsToPlay.push(...found);
    } else if (item.type === "spell") {
      const triggers = getActorTriggers(item.actor) || {};
      if (triggers.defaultSpellPreset) {
        presetsToPlay.push({ presetId: triggers.defaultSpellPreset });
      }
    }
  }

  await playMatchedTriggers(presetsToPlay, item.actor, item);
}
async function handlePF1e(message) {
  let item = null;
  const sys = message.system;

  if (sys?.actor && sys?.item?.id) {
    const foundActor = await fromUuid(sys.actor).catch(() => null);
    if (foundActor) item = foundActor.items.get(sys.item.id);
  }
  if (!item) item = await resolveItemFromMessage(message);

  let isAttack = false;
  let isDamage = false;
  let isCrit = false;

  const attacks = sys?.rolls?.attacks || [];
  if (attacks.length > 0) {
    for (const atkData of attacks) {
      if (atkData.attack) {
        isAttack = true;
        const critThreshold = atkData.attack.options?.critical || 20;
        const d20Term = atkData.attack.terms?.find((t) => t.faces === 20);
        if (d20Term && d20Term.results?.[0]?.result >= critThreshold) {
          isCrit = true;
        }
      }
      if (atkData.damage && atkData.damage.length > 0) isDamage = true;
    }
  } else {
    const content = (message.content || "").toLowerCase();
    if (content.includes("attack") || content.includes("공격")) isAttack = true;
    if (content.includes("damage") || content.includes("피해")) isDamage = true;
    if (content.includes("critical") || content.includes("치명")) isCrit = true;
  }

  const actor = item?.actor || ChatMessage.getSpeakerActor(message.speaker);
  await checkActorSystemHookTriggers(actor, { isAttack, isDamage, isCrit });

  if (!item || !item.actor) return;

  let presetsToPlay = [];

  if (isAttack) {
    presetsToPlay.push(
      ...getMatchingPresets(item, {
        triggerType: "onAttack",
        message: message,
      }),
    );
    if (isCrit) {
      presetsToPlay.push(
        ...getMatchingPresets(item, {
          triggerType: "onCrit",
          message: message,
        }),
      );
    }
  }

  if (isDamage) {
    presetsToPlay.push(
      ...getMatchingPresets(item, {
        triggerType: "onDamage",
        message: message,
      }),
    );
  }

  if (!isAttack && !isDamage) {
    let found = getMatchingPresets(item, {
      triggerType: "onUse",
      message: message,
    });

    if (found.length > 0) {
      presetsToPlay.push(...found);
    } else if (item.type === "spell") {
      const triggers = getActorTriggers(item.actor) || {};
      if (triggers.defaultSpellPreset) {
        presetsToPlay.push({ presetId: triggers.defaultSpellPreset });
      }
    }
  }

  await playMatchedTriggers(presetsToPlay, item.actor, item);
}

async function handleGeneric(message) {
  let item = await resolveItemFromMessage(message);

  if (!item) {
    let actor = ChatMessage.getSpeakerActor(message.speaker);
    if (actor) {
      const searchName = message.flavor || message.content || "";
      item = findItemByName(actor, searchName);
    }
  }

  if (!item || !item.actor) return;

  const presets = getMatchingPresets(item, {
    triggerType: "onUse",
    message: message,
  });

  if (presets.length === 0 && item.type === "spell") {
    const triggers = getActorTriggers(item.actor) || {};
    if (triggers.defaultSpellPreset) {
      presets.push({ presetId: triggers.defaultSpellPreset });
    }
  }

  await playMatchedTriggers(presets, item.actor, item);
}

Hooks.on("createChatMessage", async (message) => {
  if (!game.settings.get("cinematic-cut-ins", "enableAutomation")) return;
  if (message.author.id !== game.user.id) return;

  setCurrentProcessingMessage(message);

  let actor = null;

  actor = ChatMessage.getSpeakerActor(message.speaker);

  if (!actor && message.item) actor = message.item.actor;

  if (!actor && canvas.tokens.controlled.length > 0) {
    actor = canvas.tokens.controlled[0].actor;
  }

  if (!actor && message.author) actor = message.author.character;

  if (!actor && message.alias)
    actor = game.actors.find((a) => a.name === message.alias);

  if (!actor) {
    if (_extractRollsFromMessage(message).length > 0) {
      console.warn(
        "Cinematic FX | ⚠️ Actor not found for this message. Select a token or assign a character.",
      );
    }
    return;
  }

  const _midiActive = game.modules.get("midi-qol")?.active;

  switch (game.system.id) {
    case "dnd5e":
      if (_midiActive) {
        // midi-qol active: handle item card messages (non-roll) here for onUse/keyword.
        // Roll messages (attack/damage) are handled by midi-qol hooks below.
        if (!message.flags.dnd5e?.roll?.type) {
          await handleGeneric(message);
        } else {
        }
      } else {
        await handleDnD5e(message);
      }
      break;
    case "pf2e":
      await handlePF2e(message);
      break;
    case "pf1":
      await handlePF1e(message);
      break;
    default:
      await handleGeneric(message);
      break;
  }

  await checkChatTriggers(message, actor);

  setCurrentProcessingMessage(null);
});

Hooks.on("diceSoNiceRollComplete", (messageId) => {
  const pending = DSN_PENDING_CUTINS.get(messageId);
  if (pending && pending.length > 0) {
    pending.forEach((data) => {
      const api = game.modules.get("cinematic-cut-ins").api;
      if (data.localOnly) {
        api.playLocal(data);
      } else {
        api.play(data);
      }
    });
    DSN_PENDING_CUTINS.delete(messageId);
  }
});

Hooks.on("dnd5e.useItem", async (item, config, options) => {
  if (game.system.id !== "dnd5e") return;
  if (game.modules.get("midi-qol")?.active) return;
  if (!game.settings.get("cinematic-cut-ins", "enableAutomation")) return;

  const presets = getMatchingPresets(item, { triggerType: "onUse" });
  await playMatchedTriggers(presets, item.actor, item);
});

/* ========================================================= */
/* Template Placement Hook                                   */
/* ========================================================= */
Hooks.on(
  "createMeasuredTemplate",
  async (templateDocument, context, userId) => {
    if (userId !== game.user.id) return;
    if (!game.settings.get("cinematic-cut-ins", "enableAutomation")) return;

    const flags = templateDocument.flags;
    let originUuid = null;

    if (flags.dnd5e?.origin) originUuid = flags.dnd5e.origin;
    else if (flags.pf2e?.origin?.uuid) originUuid = flags.pf2e.origin.uuid;
    else if (flags.core?.sourceId) originUuid = flags.core.sourceId;

    if (!originUuid) {
      const findUuid = (obj) => {
        if (!obj || typeof obj !== "object") return null;
        if (obj.itemUuid) return obj.itemUuid;
        if (obj.uuid && String(obj.uuid).includes("Item.")) return obj.uuid;
        if (obj.origin && String(obj.origin).includes("Item."))
          return obj.origin;
        for (let key in obj) {
          if (key === "core") continue;
          const found = findUuid(obj[key]);
          if (found) return found;
        }
        return null;
      };
      originUuid = findUuid(flags);
    }

    if (!originUuid) return;

    let doc = await fromUuid(originUuid).catch(() => null);
    if (!doc) return;

    let item = doc;
    // D&D 5e Activity Support
    if (
      doc.documentName === "Activity" ||
      doc.constructor.name.includes("Activity")
    ) {
      item = doc.item;
    }

    if (item) {
      const presets = getMatchingPresets(item, { triggerType: "onTemplate" });
      await playMatchedTriggers(presets, item.actor, item);
    }
  },
);

registerConditionHooks();
registerCombatHooks();
registerResourceHooks();
registerChatAnalysisHooks();
