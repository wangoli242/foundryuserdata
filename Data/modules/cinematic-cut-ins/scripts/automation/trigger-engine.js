import { CutinManager } from "../CutinManager.js";

import { resolveActorPreset } from "../preset-resolution.js";

const CINEMATIC_COOLDOWN = new Set();
export const DSN_PENDING_CUTINS = new Map();
let _currentProcessingMessage = null;

export function setCurrentProcessingMessage(msg) {
  _currentProcessingMessage = msg;
}
export function getCurrentProcessingMessage() {
  return _currentProcessingMessage;
}

const DEBUG_MODE = false;

export function debugLog(title, data = "") {
  if (DEBUG_MODE)
    console.log(
      `%c[Cinematic FX] ${title}`,
      "background: #333; color: #bada55; font-weight: bold;",
      data,
    );
}

function getTriggerList(triggers, key) {
  const list = triggers?.[key];
  return Array.isArray(list) ? list : [];
}

function getTurnTriggerList(triggers, key) {
  const list = getTriggerList(triggers, key);
  if (list.length > 0) return list;

  const presetKey = key === "turnStart" ? "turnStartPreset" : "turnEndPreset";
  const roundKey = key === "turnStart" ? "turnStartRound" : "turnEndRound";
  const presetId = triggers?.[presetKey];
  return presetId
    ? [{ presetId, round: triggers?.[roundKey] || "", macroId: "" }]
    : [];
}

function getActorGroupDefaultTriggers(actor) {
  const actorConfig = actor?.getFlag("cinematic-cut-ins", "config") || {};
  const groupId = actorConfig.groupId;
  if (actorConfig.inheritGroupTriggers === false) return {};
  if (!groupId) return {};

  const actorGroups =
    game.settings.get("cinematic-cut-ins", "actorGroups") || {};
  const globalPresets =
    game.settings.get("cinematic-cut-ins", "globalPresets") || {};
  const defaultPresetId = actorGroups[groupId]?.defaultPresetId;

  return defaultPresetId ? globalPresets[defaultPresetId]?.triggers || {} : {};
}

export function getActorTriggers(actor) {
  const actorTriggers = actor?.getFlag("cinematic-cut-ins", "triggers") || {};
  const groupTriggers = getActorGroupDefaultTriggers(actor);

  return {
    ...groupTriggers,
    ...actorTriggers,
    defaultSpellPreset:
      actorTriggers.defaultSpellPreset ||
      groupTriggers.defaultSpellPreset ||
      "",
    chat: [
      ...getTriggerList(actorTriggers, "chat"),
      ...getTriggerList(groupTriggers, "chat"),
    ],
    resources: [
      ...getTriggerList(actorTriggers, "resources"),
      ...getTriggerList(groupTriggers, "resources"),
    ],
    conditions: [
      ...getTriggerList(actorTriggers, "conditions"),
      ...getTriggerList(groupTriggers, "conditions"),
    ],
    turnStart: [
      ...getTurnTriggerList(actorTriggers, "turnStart"),
      ...getTurnTriggerList(groupTriggers, "turnStart"),
    ],
    turnEnd: [
      ...getTurnTriggerList(actorTriggers, "turnEnd"),
      ...getTurnTriggerList(groupTriggers, "turnEnd"),
    ],
  };
}

/** @param {string} macroId @param {Actor} actor @param {Item|null} item */
export async function executeTriggerMacro(macroId, actor, item) {
  if (!macroId) return;
  const macro = game.macros.get(macroId);
  if (!macro) {
    console.warn(`Cinematic FX | Macro not found: ${macroId}`);
    return;
  }
  try {
    debugLog(
      "Macro Execute",
      `Running "${macro.name}" for ${actor?.name || "unknown"}`,
    );
    await macro.execute({
      actor,
      item,
      speaker: ChatMessage.getSpeaker({ actor }),
    });
  } catch (e) {
    console.error(`Cinematic FX | Macro execution error (${macro.name}):`, e);
  }
}

export async function playMatchedTriggers(triggers, actor, item = null) {
  const seenPresets = new Set();
  for (const t of triggers) {
    if (!seenPresets.has(t.presetId)) {
      seenPresets.add(t.presetId);
      await playPreset(actor, t.presetId, item);
    }
    if (t.macroId) await executeTriggerMacro(t.macroId, actor, item);
  }
}

export async function playPreset(actor, presetId, item = null) {
  const cooldownKey = `${actor.id}-${presetId}`;

  if (CINEMATIC_COOLDOWN.has(cooldownKey)) {
    return;
  }

  const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
  const globalPresets =
    game.settings.get("cinematic-cut-ins", "globalPresets") || {};
  const actorConfig = actor.getFlag("cinematic-cut-ins", "config") || {};
  const actorGroups =
    game.settings.get("cinematic-cut-ins", "actorGroups") || {};

  const { preset } = resolveActorPreset({
    presetId,
    actorConfig,
    actorPresets: presets,
    globalPresets,
    actorGroups,
  });
  if (!preset) {
    return;
  }

  CINEMATIC_COOLDOWN.add(cooldownKey);
  setTimeout(() => CINEMATIC_COOLDOWN.delete(cooldownKey), 2000);

  let playData = foundry.utils.deepClone(preset);
  playData.actorId = actor.uuid;
  if (!playData.layers) playData.layers = [];
  playData = CutinManager.applyRandomization(playData);
  if (playData.text)
    playData.text = CutinManager.processText(playData.text, {
      actor: actor,
      item: item,
    });
  if (playData.subText)
    playData.subText = CutinManager.processText(playData.subText, {
      actor: actor,
      item: item,
    });

  const waitForDSN = game.settings.get(
    "cinematic-cut-ins",
    "waitForDiceSoNice",
  );
  const dsnActive = game.modules.get("dice-so-nice")?.active;
  const rolls = _currentProcessingMessage
    ? _extractRollsFromMessage(_currentProcessingMessage)
    : [];
  const hasRealDice = rolls.length > 0 && _rollHasRealDice(rolls);

  if (waitForDSN && dsnActive && hasRealDice && _currentProcessingMessage) {
    const msgId = _currentProcessingMessage.id;
    if (!DSN_PENDING_CUTINS.has(msgId)) {
      DSN_PENDING_CUTINS.set(msgId, []);
    }
    DSN_PENDING_CUTINS.get(msgId).push(playData);

    const DSN_TIMEOUT_MS = 8000;
    setTimeout(() => {
      const pending = DSN_PENDING_CUTINS.get(msgId);
      if (pending && pending.length > 0) {
        const api = game.modules.get("cinematic-cut-ins").api;
        pending.forEach((data) => {
          if (data.localOnly) api.playLocal(data);
          else api.play(data);
        });
        DSN_PENDING_CUTINS.delete(msgId);
      }
    }, DSN_TIMEOUT_MS);

    return;
  }

  const api = game.modules.get("cinematic-cut-ins").api;
  if (playData.localOnly) {
    api.playLocal(playData);
  } else {
    api.play(playData);
  }
}

export function findItemByName(actor, flavorText) {
  if (!actor || !flavorText) return null;
  const cleanFlavor = flavorText.toLowerCase();
  let candidates = actor.items.filter((i) => {
    return (
      i.name &&
      cleanFlavor.includes(i.name.toLowerCase()) &&
      i.getFlag("cinematic-cut-ins", "itemConfig")
    );
  });
  candidates.sort((a, b) => b.name.length - a.name.length);
  if (candidates.length > 0) return candidates[0];
  return null;
}

export async function resolveItemFromMessage(message) {
  if (message.item) {
    return message.item;
  }

  const flags = message.flags;
  let itemUuid = null;
  let resolveSource = "none";

  // Known Paths
  if (flags.sfrpg?.item) {
    itemUuid =
      typeof flags.sfrpg.item === "string"
        ? flags.sfrpg.item
        : flags.sfrpg.item.uuid;
    resolveSource = "sfrpg";
  } else if (flags.dnd5e?.item?.uuid) {
    itemUuid = flags.dnd5e.item.uuid;
    resolveSource = "dnd5e.item.uuid";
  } else if (flags.pf2e?.origin?.uuid) {
    itemUuid = flags.pf2e.origin.uuid;
    resolveSource = "pf2e";
  } else if (flags.core?.sourceId) {
    itemUuid = flags.core.sourceId;
    resolveSource = "core.sourceId";
  }

  // Deep Search
  if (!itemUuid) {
    const findUuid = (obj) => {
      if (!obj || typeof obj !== "object") return null;
      if (obj.itemUuid) return obj.itemUuid;
      if (obj.uuid && String(obj.uuid).includes("Item.")) return obj.uuid;
      for (let key in obj) {
        if (key === "core") continue;
        const found = findUuid(obj[key]);
        if (found) return found;
      }
      return null;
    };
    itemUuid = findUuid(flags);
    if (itemUuid) resolveSource = "deepSearch";
  }

  // HTML / Text Fallback (Shadowrun etc.)
  if (!itemUuid && message.content) {
    const match =
      message.content.match(/data-uuid="([^"]+)"/) ||
      message.content.match(/data-item-id="([^"]+)"/);
    if (match && match[1]) {
      if (match[1].includes("Item.")) {
        return await fromUuid(match[1]).catch(() => null);
      }
    }
  }

  if (itemUuid) {
    const resolved = await fromUuid(itemUuid).catch(() => null);
    return resolved;
  }

  return null;
}

/** @param {Item} item @param {Object} context */
export function getMatchingPresets(item, context = {}) {
  const config = item.getFlag("cinematic-cut-ins", "itemConfig");
  if (!config) return [];

  const triggers = Array.isArray(config) ? config : [config];
  const results = [];
  const { triggerType, message } = context;

  const pushResult = (t) =>
    results.push({ presetId: t.presetId, macroId: t.macroId || "" });

  for (const t of triggers) {
    if (triggerType && t.trigger === triggerType) {
      pushResult(t);
      continue;
    }

    // (A) High Roll
    if (t.trigger === "highRoll" && message) {
      const threshold = Number(t.value) || 20;
      if (_checkRollTrigger(message, threshold)) {
        pushResult(t);
        continue;
      }
    }

    // (B) Keyword (Any)
    if (t.trigger === "keyword" && message) {
      const content = _getMessageTextForMatching(message);
      if (t.value && content.includes(t.value.toLowerCase())) {
        pushResult(t);
        continue;
      }
    }

    // (C) Keyword (Roll Only)
    if (t.trigger === "rollKeyword" && message) {
      const hasRolls = _extractRollsFromMessage(message).length > 0;
      const rollContent = _getMessageTextForMatching(message, {
        rollOnly: true,
      });
      if (hasRolls && t.value && rollContent.includes(t.value.toLowerCase())) {
        pushResult(t);
        continue;
      }
    }

    // (D) Advanced Formula
    if (t.trigger === "formula" && message) {
      if (_checkFormulaTrigger(message, t.value)) {
        pushResult(t);
        continue;
      }
    }

    // (E) Dice Check
    if (t.trigger === "diceCheck" && message) {
      let passTextCheck = true;

      if (t.keyword) {
        const rollContent = _getMessageTextForMatching(message, {
          rollOnly: true,
        });
        if (!rollContent.includes(t.keyword.toLowerCase())) {
          passTextCheck = false;
        }
      }

      if (passTextCheck) {
        const threshold = Number(t.value) || 0;
        const operator = t.operator || ">=";
        const index = t.rollIndex !== undefined ? Number(t.rollIndex) : -1;

        if (_checkRollTrigger(message, threshold, operator, index)) {
          pushResult(t);
          continue;
        }
      }
    }
  }
  return results;
}

export async function checkActorSystemHookTriggers(
  actor,
  { isAttack, isDamage, isCrit },
) {
  if (!actor) return;

  const triggers = getActorTriggers(actor);
  const chatTriggers = triggers.chat || [];

  let presetsToPlay = [];

  for (const t of chatTriggers) {
    if (t.trigger === "onAttack" && isAttack) {
      presetsToPlay.push({ presetId: t.presetId, macroId: t.macroId || "" });
    } else if (t.trigger === "onDamage" && isDamage) {
      presetsToPlay.push({ presetId: t.presetId, macroId: t.macroId || "" });
    } else if (t.trigger === "onCrit" && isCrit) {
      presetsToPlay.push({ presetId: t.presetId, macroId: t.macroId || "" });
    }
  }

  await playMatchedTriggers(presetsToPlay, actor, null);
}

export function _extractRollsFromMessage(message) {
  if (message.rolls?.length > 0) return message.rolls;

  if (message.flags?.dnd5e?.rolls) {
    try {
      return message.flags.dnd5e.rolls.map((r) => Roll.fromData(r));
    } catch (e) {
      /* ignore */
    }
  }

  const content = message.content || "";
  if (content.includes("data-roll=")) {
    const regex = /data-roll="([^"]+)"/g;
    const rolls = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      try {
        const decoded = decodeURIComponent(match[1]);
        const data = JSON.parse(decoded);
        if (data.class === "Roll" || data.formula) {
          rolls.push(Roll.fromData(data));
        }
      } catch (e) {
        /* skip invalid */
      }
    }
    if (rolls.length > 0) {
      debugLog(
        "Roll Extraction",
        `Extracted ${rolls.length} roll(s) from HTML content`,
      );
      return rolls;
    }
  }

  return [];
}

export function _rollHasRealDice(rolls) {
  return rolls.some((roll) => roll.dice && roll.dice.length > 0);
}

export function _isPF2eCriticalSuccessCheck(message) {
  if (game.system.id !== "pf2e") return false;

  const context = message.flags.pf2e?.context;
  if (context?.outcome !== "criticalSuccess") return false;

  const type = context.type || "";
  if (type.includes("attack") || type === "damage-roll") return false;

  const rolls = _extractRollsFromMessage(message);
  if (rolls.length === 0) return false;

  return message.isCheckRoll !== false;
}

export function _extractTextByKeyHints(source, keyPattern, maxDepth = 6) {
  const out = [];
  const seen = new Set();

  const walk = (value, key = "", depth = 0) => {
    if (value == null || depth > maxDepth) return;

    if (typeof value === "string") {
      if (!value.trim()) return;
      if (keyPattern.test(key)) out.push(value);
      return;
    }

    if (typeof value !== "object") return;
    if (seen.has(value)) return;
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) walk(item, key, depth + 1);
      return;
    }

    for (const [childKey, childValue] of Object.entries(value)) {
      walk(childValue, childKey, depth + 1);
    }
  };

  walk(source);
  return out;
}

export function _extractRollTextFromHtml(html) {
  if (!html) return "";

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const candidates = doc.querySelectorAll(
      ".chat-roll .roll-part-title, .chat-roll .description-content, .roll-part-title, .description-content, .roll-part-content",
    );
    const texts = Array.from(candidates)
      .map((el) => el.textContent || "")
      .map((t) => t.trim())
      .filter(Boolean);

    if (texts.length > 0) return texts.join(" ");
    return (doc.body?.textContent || "").trim();
  } catch (e) {
    return "";
  }
}

export function _getMessageTextForMatching(message, { rollOnly = false } = {}) {
  const parts = [];

  if (!rollOnly) {
    parts.push(
      message.flavor || "",
      message.content || "",
      message.alias || "",
    );
  }

  const rollTextFromHtml = _extractRollTextFromHtml(message.content || "");
  if (rollTextFromHtml) parts.push(rollTextFromHtml);

  const rollStrings = _extractTextByKeyHints(
    {
      rolls: message.rolls,
      flags: message.flags,
      system: message.system,
    },
    /(roll|dice|die|formula|desc|description|title|label|flavor|text|name|part|content)/i,
  );

  if (rollStrings.length > 0) parts.push(...rollStrings);

  return parts
    .join(" ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function _checkRollTrigger(
  message,
  threshold = 20,
  operator = ">=",
  rollIndex = -1,
) {
  const rolls = _extractRollsFromMessage(message);
  if (!rolls.length) return false;

  let targetTerms = [];
  let checkTotal = false;

  if (rolls.length > 1) {
    if (rollIndex >= 0) {
      if (rolls[rollIndex]) {
        targetTerms.push(...rolls[rollIndex].terms);
        checkTotal = true;
        var specificRoll = rolls[rollIndex];
      } else {
        debugLog(
          "Roll Check",
          `Index [${rollIndex}] out of bounds (Max: ${rolls.length - 1})`,
        );
        return false;
      }
    } else {
      rolls.forEach((r) => targetTerms.push(...r.terms));
      checkTotal = true;
      return rolls.some((r) => {
        const totalCheck = checkValue(r.total, threshold, operator);
        const termCheck = r.terms.some(
          (t) =>
            t.results &&
            t.results.some((res) =>
              checkValue(res.result, threshold, operator),
            ),
        );
        return totalCheck || termCheck;
      });
    }
  } else {
    const roll = rolls[0];

    const diceTerms = roll.terms.filter(
      (t) => t.results && t.results.length > 0,
    );

    if (rollIndex > 0) {
      const termIndex = rollIndex - 1;

      if (diceTerms[termIndex]) {
        targetTerms.push(diceTerms[termIndex]);
        checkTotal = false;
        debugLog(
          "Roll Check",
          `Targeting Die Term #${rollIndex}: ${diceTerms[termIndex].formula}`,
        );
      } else {
        debugLog(
          "Roll Check",
          `Die Term #${rollIndex} not found. (Total Dice: ${diceTerms.length})`,
        );
        return false;
      }
    } else {
      targetTerms = diceTerms;
      checkTotal = true;
      var specificRoll = roll;
    }
  }

  function checkValue(val, target, op) {
    if (op === ">=") return val >= target;
    if (op === "<=") return val <= target;
    if (op === "==") return val === target;
    return false;
  }

  if (checkTotal && specificRoll) {
    if (checkValue(specificRoll.total, threshold, operator)) {
      debugLog("Roll Check", `Success: Total (${specificRoll.total}) matched.`);
      return true;
    }
  }

  for (const term of targetTerms) {
    if (term.results && term.results.length > 0) {
      if (term.results.some((r) => checkValue(r.result, threshold, operator))) {
        debugLog("Roll Check", `Success: Die Result matched.`);
        return true;
      }
    }
  }

  return false;
}

export function _checkFormulaTrigger(message, formulaStr) {
  const rolls = _extractRollsFromMessage(message);
  if (!formulaStr) return false;

  // [Security] Block infinite loops and dangerous keywords
  const blacklist =
    /\b(while|for|do|function|class|import|eval|window|document|setTimeout|setInterval)\b/;
  if (blacklist.test(formulaStr)) {
    console.warn(
      `Cinematic FX | Security Warning: Formula contains forbidden keywords. ("${formulaStr}")`,
    );
    return false;
  }

  const d = [];
  const r = []; // rolls info
  let total = 0;

  rolls.forEach((roll) => {
    total += roll.total;

    r.push({
      total: roll.total,
      formula: roll.formula,
      terms: roll.terms,
    });

    roll.terms.forEach((term) => {
      if (term.results && term.results.length > 0) {
        term.results.forEach((res) => {
          if (res.active && !res.discarded) d.push(res.result);
        });
      }
    });
  });

  const flavor = (message.flavor || "") + " " + (message.content || "");
  const alias = message.alias || "";

  try {
    const checkFunc = new Function(
      "d",
      "total",
      "t",
      "flavor",
      "r",
      "alias",
      `return (${formulaStr});`,
    );

    const result = checkFunc(d, total, total, flavor, r, alias);

    if (result) {
      debugLog("Formula Check", `Matched: "${formulaStr}" (Dice: [${d}])`);
      return true;
    }
  } catch (e) {
    console.warn(
      "Cinematic FX | Invalid Formula Runtime:",
      formulaStr,
      e.message,
    );
  }

  return false;
}

export async function checkChatTriggers(message, actor) {
  if (!actor) return;

  const triggers = getActorTriggers(actor);
  const chatTriggers = triggers.chat || [];

  if (chatTriggers.length === 0) return;

  const cleanContent = _getMessageTextForMatching(message);
  const rollContent = _getMessageTextForMatching(message, { rollOnly: true });

  for (const t of chatTriggers) {
    const type = t.trigger || "keyword";
    let conditionMet = false;

    if (
      [
        "midiAttack",
        "midiDamage",
        "midiCrit",
        "onAttack",
        "onDamage",
        "onCrit",
      ].includes(type)
    )
      continue;

    if (type === "formula") {
      if (_checkFormulaTrigger(message, t.value)) {
        conditionMet = true;
      }
    } else if (type === "pf2eCriticalSuccess") {
      if (_isPF2eCriticalSuccessCheck(message)) {
        conditionMet = true;
      }
    } else if (type === "keyword") {
      if (t.value && cleanContent.includes(t.value.toLowerCase())) {
        conditionMet = true;
      }
    } else if (type === "rollKeyword") {
      const hasRolls = _extractRollsFromMessage(message).length > 0;
      if (hasRolls && t.value && rollContent.includes(t.value.toLowerCase())) {
        conditionMet = true;
      }
    } else if (type === "diceCheck") {
      let passTextCheck = true;
      if (t.keyword && !cleanContent.includes(t.keyword.toLowerCase())) {
        if (!rollContent.includes(t.keyword.toLowerCase()))
          passTextCheck = false;
      }

      if (passTextCheck) {
        const threshold = Number(t.value) || 0;
        const operator = t.operator || ">=";
        const index = t.rollIndex !== undefined ? Number(t.rollIndex) : -1;

        if (_checkRollTrigger(message, threshold, operator, index)) {
          conditionMet = true;
        }
      }
    }

    if (conditionMet) {
      console.log(`Cinematic FX | Actor Chat Trigger: [${type}] matched.`);
      await playPreset(actor, t.presetId, null);
      if (t.macroId) await executeTriggerMacro(t.macroId, actor, null);
      break;
    }
  }
}
