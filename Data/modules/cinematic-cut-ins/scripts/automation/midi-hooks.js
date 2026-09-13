import {
  _checkFormulaTrigger,
  _checkRollTrigger,
  executeTriggerMacro,
  getActorTriggers,
  getMatchingPresets,
  playMatchedTriggers,
  playPreset,
} from "./trigger-engine.js";
import { MODULE_ID, SETTING_KEYS } from "../constants.js";

export function registerMidiHooks({
  checkFormula = _checkFormulaTrigger,
  checkRoll = _checkRollTrigger,
  executeMacro = executeTriggerMacro,
  getGame = () => globalThis.game,
  getMatching = getMatchingPresets,
  getSpeaker = (speaker) => globalThis.ChatMessage.getSpeaker(speaker),
  getTriggers = getActorTriggers,
  hooks = globalThis.Hooks,
  play = playPreset,
  playMatched = playMatchedTriggers,
  resolveUuid = (uuid) => globalThis.fromUuid(uuid),
} = {}) {
  const addDefaultSpell = (actor, item, presets) => {
    if (presets.length === 0 && item.type === "spell") {
      const triggers = getTriggers(actor) || {};
      if (triggers.defaultSpellPreset) {
        presets.push({ presetId: triggers.defaultSpellPreset });
      }
    }
  };

  async function resolveMidiCardMessage(workflow) {
    if (workflow.itemCardUuid) {
      return await resolveUuid(workflow.itemCardUuid).catch(() => null);
    }
    if (workflow.chatCard) {
      return workflow.chatCard;
    }
    return null;
  }

  function getMidiWorkflowRolls(workflow, type) {
    if (type === "damage") {
      const rolls = workflow.damageRolls?.length
        ? workflow.damageRolls
        : [workflow.damageRoll];
      return rolls.filter((roll) => roll?.terms);
    }

    return workflow.attackRoll?.terms ? [workflow.attackRoll] : [];
  }

  async function buildMidiRollMessage(workflow, type) {
    const cardMessage = await resolveMidiCardMessage(workflow);
    const rolls = getMidiWorkflowRolls(workflow, type);
    const itemName = workflow.item?.name || "";
    const activityName = workflow.activity?.name || "";
    const rollLabel = type === "damage" ? "Damage Roll" : "Attack Roll";
    const flavor = [
      itemName,
      activityName,
      rollLabel,
      cardMessage?.flavor || "",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      speaker: cardMessage?.speaker || getSpeaker({ actor: workflow.actor }),
      alias: cardMessage?.alias || workflow.actor?.name || "",
      flags: cardMessage?.flags || {},
      system: cardMessage?.system || {},
      content: cardMessage?.content || "",
      flavor,
      rolls,
    };
  }

  hooks.on("midi-qol.AttackRollComplete", async (workflow) => {
    if (!getGame().settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }

    const item = workflow.item;
    const actor = workflow.actor;

    if (item) {
      const message = await buildMidiRollMessage(workflow, "attack");
      const presets = getMatching(item, {
        triggerType: "onAttack",
        message,
      });

      if (workflow.isCritical) {
        presets.push(...getMatching(item, { triggerType: "onCrit", message }));
      }

      addDefaultSpell(item.actor, item, presets);
      await playMatched(presets, item.actor, item);
    }

    if (actor) {
      await checkMidiGlobalTriggers(actor, workflow, "attack", {
        checkFormula,
        checkRoll,
        executeMacro,
        getTriggers,
        play,
      });
    }
  });

  hooks.on("midi-qol.DamageRollComplete", async (workflow) => {
    if (!getGame().settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }

    const item = workflow.item;
    const actor = workflow.actor;

    if (item) {
      const message = await buildMidiRollMessage(workflow, "damage");
      const presets = getMatching(item, {
        triggerType: "onDamage",
        message,
      });
      if (!item.hasAttack) {
        addDefaultSpell(item.actor, item, presets);
      }
      await playMatched(presets, item.actor, item);
    }

    if (actor) {
      await checkMidiGlobalTriggers(actor, workflow, "damage", {
        checkFormula,
        checkRoll,
        executeMacro,
        getTriggers,
        play,
      });
    }
  });

  hooks.on("midi-qol.RollComplete", async (workflow) => {
    if (!getGame().settings.get(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION)) {
      return;
    }
    if (workflow.item?.hasAttack || workflow.item?.hasDamage) {
      return;
    }

    const item = workflow.item;
    if (item) {
      const message = await resolveMidiCardMessage(workflow);
      // An existing item card is already handled by createChatMessage.
      if (!message) {
        const presets = getMatching(item, { triggerType: "onUse" });
        addDefaultSpell(item.actor, item, presets);
        await playMatched(presets, item.actor, item);
      }
    }
  });
}

async function checkMidiGlobalTriggers(
  actor,
  workflow,
  type,
  { checkFormula, checkRoll, executeMacro, getTriggers, play },
) {
  if (!actor || !workflow) {
    return;
  }

  const triggers = getTriggers(actor) || {};
  const chatTriggers = triggers.chat || [];
  if (chatTriggers.length === 0) {
    return;
  }

  const rollObject =
    type === "attack" ? workflow.attackRoll : workflow.damageRoll;
  const itemName = workflow.item?.name || "";
  const fullText =
    itemName +
    " " +
    (workflow.itemCard?.flavor || "") +
    " " +
    (workflow.itemCard?.content || "");
  const cleanContent = fullText.toLowerCase();
  const fakeMessage = rollObject
    ? {
        isRoll: true,
        rolls: [rollObject],
        flavor: fullText,
        content: fullText,
      }
    : null;

  for (const trigger of chatTriggers) {
    try {
      const triggerType = trigger.trigger;
      let conditionMet = false;

      if (triggerType === "midiCrit") {
        if (type === "attack" && workflow.isCritical) {
          if (
            trigger.value &&
            typeof trigger.value === "string" &&
            trigger.value.trim() !== "" &&
            isNaN(trigger.value)
          ) {
            if (cleanContent.includes(trigger.value.toLowerCase())) {
              conditionMet = true;
            }
          } else {
            conditionMet = true;
          }
        }
      } else if (
        (triggerType === "midiAttack" && type === "attack") ||
        (triggerType === "midiDamage" && type === "damage")
      ) {
        conditionMet = true;

        const threshold = Number(trigger.value);
        if (!isNaN(threshold) && threshold > 0) {
          if (
            !fakeMessage ||
            !checkRoll(
              fakeMessage,
              threshold,
              trigger.operator || ">=",
              trigger.rollIndex ?? -1,
            )
          ) {
            conditionMet = false;
          }
        }

        const textFilter =
          trigger.keyword ||
          (isNaN(Number(trigger.value)) ? trigger.value : null);
        if (
          conditionMet &&
          textFilter &&
          textFilter.trim() !== "" &&
          !cleanContent.includes(textFilter.toLowerCase())
        ) {
          conditionMet = false;
        }
      } else if (
        triggerType === "formula" &&
        fakeMessage &&
        checkFormula(fakeMessage, trigger.value)
      ) {
        conditionMet = true;
      }

      if (conditionMet) {
        console.log(
          `Cinematic FX (Midi) | Triggered: [${triggerType}] -> ${trigger.presetId}`,
        );
        await play(actor, trigger.presetId, workflow.item);
        if (trigger.macroId) {
          await executeMacro(trigger.macroId, actor, workflow.item);
        }
        break;
      }
    } catch (error) {
      console.error("Cinematic FX | Midi Trigger Logic Error:", error, trigger);
    }
  }
}
