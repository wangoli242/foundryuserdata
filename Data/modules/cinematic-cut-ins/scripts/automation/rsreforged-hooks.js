import { MODULE_ID, SETTING_KEYS } from "../constants.js";
import {
  checkActorSystemHookTriggers,
  getMatchingPresets,
  playMatchedTriggers,
  resolveItemFromMessage,
} from "./trigger-engine.js";

const RSR_MODULE_ID = "rsreforged";
const RSR_RENDER_ROLL_HOOK = `${RSR_MODULE_ID}.renderRoll`;
const ATTACK_ROLL_TYPE = "attack";
const DEFAULT_TRACKED_MESSAGE_LIMIT = 200;

export function registerRsreforgedHooks({
  checkSystemTriggers = checkActorSystemHookTriggers,
  dispatch = dispatchRsreforgedTask,
  getAttackRoll = getRsreforgedAttackRoll,
  getGame = () => globalThis.game,
  getMatching = getMatchingPresets,
  hooks = globalThis.Hooks,
  isCritical = isRsreforgedCriticalAttack,
  playMatched = playMatchedTriggers,
  resolveActor = resolveRsreforgedActor,
  resolveItem = resolveRsreforgedItem,
  trackedMessageLimit = DEFAULT_TRACKED_MESSAGE_LIMIT,
} = {}) {
  const messageStates = new Map();

  hooks.on("createChatMessage", (message) => {
    if (!isRsreforgedQuickRoll(message)) {
      return;
    }

    rememberMessageState(messageStates, message.id, trackedMessageLimit);
  });

  hooks.on("deleteChatMessage", (message) => {
    if (message?.id) {
      messageStates.delete(message.id);
    }
  });

  // RSReforged emits this public hook after its own Dice So Nice wait. Playback
  // can start directly here without entering the generic pending-DSN queue.
  hooks.on(RSR_RENDER_ROLL_HOOK, (message, _html, rollType) => {
    if (rollType !== ATTACK_ROLL_TYPE || !message?.id) {
      return;
    }

    const state = messageStates.get(message.id);
    const gameRef = getGame();
    if (!state || !isRsreforgedProcessingAuthority(message, gameRef)) {
      return;
    }

    const attackRoll = getAttackRoll(message);
    if (!attackRoll) {
      return;
    }

    const critical = isCritical(message, attackRoll);
    const shouldRunAttack = !state.attackHandled;
    const shouldRunCritical = critical && !state.criticalHandled;

    // Record state before starting asynchronous playback. RSReforged can re-render
    // the same card again while a cut-in is still being prepared.
    state.attackHandled = true;
    if (critical) {
      state.criticalHandled = true;
    }

    if (
      (!shouldRunAttack && !shouldRunCritical) ||
      !isAutomationEnabled(gameRef)
    ) {
      return;
    }

    dispatch(
      processRsreforgedAttack(message, {
        checkSystemTriggers,
        getMatching,
        playMatched,
        resolveActor,
        resolveItem,
        shouldRunAttack,
        shouldRunCritical,
      }),
    );
  });
}

async function processRsreforgedAttack(
  message,
  {
    checkSystemTriggers,
    getMatching,
    playMatched,
    resolveActor,
    resolveItem,
    shouldRunAttack,
    shouldRunCritical,
  },
) {
  const item = await resolveItem(message);
  const actor = resolveActor(message, item);
  if (!actor) {
    return;
  }

  await checkSystemTriggers(actor, {
    isAttack: shouldRunAttack,
    isDamage: false,
    isCrit: shouldRunCritical,
  });

  if (!item) {
    return;
  }

  const presets = [];
  if (shouldRunAttack) {
    presets.push(
      ...getMatching(item, {
        triggerType: "onAttack",
        message,
      }),
    );
  }
  if (shouldRunCritical) {
    presets.push(
      ...getMatching(item, {
        triggerType: "onCrit",
        message,
      }),
    );
  }

  await playMatched(presets, actor, item);
}

async function resolveRsreforgedItem(message) {
  const activity = message?.getAssociatedActivity?.();
  const item = activity?.item ?? message?.getAssociatedItem?.();
  if (item) {
    return item;
  }
  return await resolveItemFromMessage(message);
}

function resolveRsreforgedActor(message, item) {
  if (item?.actor) {
    return item.actor;
  }

  const associatedActor = message?.getAssociatedActor?.();
  if (associatedActor) {
    return associatedActor;
  }

  return globalThis.ChatMessage?.getSpeakerActor?.(message?.speaker) ?? null;
}

function getRsreforgedAttackRoll(message) {
  const liveRolls = Array.from(message?.rolls ?? []);
  const storedRolls = message?.flags?.[RSR_MODULE_ID]?.rolls;
  const rolls = Array.isArray(storedRolls)
    ? storedRolls.map(deserializeRoll).filter(Boolean)
    : liveRolls;

  return rolls.find(isD20Roll) ?? null;
}

function deserializeRoll(roll) {
  if (!roll || typeof roll !== "object") {
    return null;
  }
  if (typeof globalThis.Roll?.fromData !== "function") {
    return roll;
  }
  try {
    return globalThis.Roll.fromData(roll);
  } catch {
    return roll;
  }
}

function isD20Roll(roll) {
  return roll?.class === "D20Roll" || roll?.constructor?.name === "D20Roll";
}

export function isRsreforgedCriticalAttack(message, roll) {
  const storedCritical = message?.flags?.[RSR_MODULE_ID]?.isCritical;
  if (typeof storedCritical === "boolean") {
    return storedCritical;
  }
  if (roll?.isCritical === true) {
    return true;
  }

  const d20 = getD20Term(roll);
  if (!d20) {
    return false;
  }
  if (
    roll?.options?.forceSuccess === true ||
    d20?.options?.forceSuccess === true
  ) {
    return true;
  }

  const threshold = Number(
    roll?.options?.criticalSuccess ??
      d20?.options?.criticalSuccess ??
      d20.faces,
  );
  if (!Number.isFinite(threshold)) {
    return false;
  }

  return Array.from(d20.results ?? []).some(
    (result) =>
      result?.active !== false &&
      result?.discarded !== true &&
      result?.rerolled !== true &&
      Number(result?.result) >= threshold,
  );
}

function getD20Term(roll) {
  try {
    if (roll?.d20?.faces === 20) {
      return roll.d20;
    }
  } catch {
    // Serialized D20Roll instances can lose the live d20 getter.
  }
  return Array.from(roll?.terms ?? []).find((term) => term?.faces === 20);
}

function isRsreforgedQuickRoll(message) {
  return message?.flags?.[RSR_MODULE_ID]?.quickRoll === true;
}

function isLocalAuthor(message, gameRef) {
  const authorId =
    message?.author?.id ??
    message?.user?.id ??
    (typeof message?.user === "string" ? message.user : null);
  return Boolean(gameRef?.user?.id && authorId === gameRef.user.id);
}

function isRsreforgedProcessingAuthority(message, gameRef) {
  if (message?.blind === true) {
    return Boolean(
      gameRef?.user?.isGM && gameRef?.users?.activeGM?.id === gameRef.user.id,
    );
  }
  return isLocalAuthor(message, gameRef);
}

function isAutomationEnabled(gameRef) {
  try {
    return Boolean(
      gameRef?.settings?.get?.(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION),
    );
  } catch {
    return false;
  }
}

function rememberMessageState(states, messageId, limit) {
  if (!messageId) {
    return;
  }

  states.delete(messageId);
  states.set(messageId, {
    attackHandled: false,
    criticalHandled: false,
  });

  const safeLimit = Math.max(1, Number(limit) || DEFAULT_TRACKED_MESSAGE_LIMIT);
  while (states.size > safeLimit) {
    states.delete(states.keys().next().value);
  }
}

function dispatchRsreforgedTask(task) {
  void Promise.resolve(task).catch((error) => {
    console.error("Cinematic FX | RSReforged trigger error:", error);
  });
}
