import { THEME_DEFAULTS, THEME_RESTRICTIONS } from "../CinematicConfig.js";
import { normalizeCinematicEffectConfig } from "../cinematic-effects.js";
import { normalizeScreenMoodConfig } from "../screen-mood.js";
import { CutinManager } from "../CutinManager.js";
import { normalizeSceneTargetIds } from "../automation/scene-scope.js";
import { shouldPreserveMainTextCase } from "../main-text-case.js";
import { normalizeCharacterImageSource } from "../actor-image-source.js";
import {
  ACTIVE_CONFIG_PRESET_ID,
  findPresetSaveTargetId,
} from "../preset-resolution.js";

function upsertPresetOption(
  select,
  presetId,
  label,
  { selected = false } = {},
) {
  if (!select) return;

  let option = Array.from(select.options).find(
    (entry) => entry.value === presetId,
  );
  if (!option) {
    option = document.createElement("option");
    option.value = presetId;
    select.append(option);
  }

  option.textContent = label;
  if (selected) select.value = presetId;
}

function syncSavedPresetOptions(application, { presetId, name, source }) {
  const isPersonal = source === "personal";
  const topSelect = application.element.querySelector(
    isPersonal ? "#preset-select" : "#global-preset-select",
  );
  upsertPresetOption(topSelect, presetId, name, { selected: true });

  const labelKey = isPersonal
    ? "CINEMATIC.Trigger.ActorPresetOption"
    : "CINEMATIC.Trigger.GlobalPresetOption";
  const triggerLabel = game.i18n.format(labelKey, { preset: name });
  const triggerSelects = application.element.querySelectorAll(
    'select[name^="triggers."][name$=".presetId"], select[name="triggers.defaultSpellPreset"]',
  );

  for (const select of triggerSelects) {
    upsertPresetOption(select, presetId, triggerLabel);
  }
}

export function _onInsertActorName(event) {
  event.preventDefault();

  const input = this.element?.querySelector('input[name="text"]');
  if (!input) return;

  const placeholder = "{{name}}";
  const existingIndex = input.value.toLowerCase().indexOf(placeholder);
  if (existingIndex >= 0) {
    input.focus();
    input.setSelectionRange(existingIndex, existingIndex + placeholder.length);
    return;
  }

  const start = Number.isInteger(input.selectionStart)
    ? input.selectionStart
    : input.value.length;
  const end = Number.isInteger(input.selectionEnd) ? input.selectionEnd : start;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const leadingSpace = before && !/\s$/.test(before) ? " " : "";
  const trailingSpace = after && !/^\s/.test(after) ? " " : "";
  const inserted = `${leadingSpace}${placeholder}${trailingSpace}`;

  input.value = `${before}${inserted}${after}`;
  const caret = before.length + inserted.length;
  input.focus();
  input.setSelectionRange(caret, caret);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

// --- Variation Management ---
export function _getVariationsFromForm(formData) {
  const variations = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^variations\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!variations[index]) variations[index] = {};
      variations[index][prop] = formData[key];
    }
  });
  return variations.map((v) => ({
    img: v.img,
    charScale: Number(v.charScale),
    charOffsetX: Number(v.charOffsetX),
    charOffsetY: Number(v.charOffsetY),
    text: v.text || "",
    subText: v.subText || "",
  }));
}

export async function _onAddVariation(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentVariations = this._getVariationsFromForm(formData);

  currentVariations.push({
    img: formData.img || "",
    charScale: Number(formData.charScale) || 1.0,
    charOffsetX: Number(formData.charOffsetX) || 0,
    charOffsetY: Number(formData.charOffsetY) || 0,
    text: "",
    subText: "",
  });

  const layers = this._getLayersFromForm(formData);

  await this._saveToCurrentTarget({
    ...formData,
    variations: currentVariations,
    layers,
  });
  this.render();
}

export async function _onRemoveVariation(event, target) {
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentVariations = this._getVariationsFromForm(formData);

  currentVariations.splice(index, 1);

  const layers = this._getLayersFromForm(formData);

  await this._saveToCurrentTarget({
    ...formData,
    variations: currentVariations,
    layers,
  });
  this.render();
}

export function _getLayersFromForm(formData) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^layers\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!list[index]) list[index] = {};

      if (prop === "zIndex") {
        list[index][prop] = Number(formData[key]) || 0;
      } else if (prop === "rotation" || prop === "delay") {
        list[index][prop] = Number(formData[key]) || 0;
      } else if (["maskMode", "maskShape", "maskSrc"].includes(prop)) {
        list[index][prop] = formData[key];
      } else if (["maskSize", "maskX", "maskY"].includes(prop)) {
        list[index][prop] = Number(formData[key]) || 0;
      } else {
        list[index][prop] = formData[key];
      }
    }
  });
  return list.filter((item) => item !== undefined);
}

export async function _onAddLayer(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const layers = this._getLayersFromForm(formData);

  layers.push({
    src: "",
    zIndex: 20,
    blend: "normal",
    opacity: 1.0,
    scale: 1.0,
    x: 0,
    y: 0,
    loop: true,
    delay: 0,
  });

  const variations = this._getVariationsFromForm(formData);

  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");

  await this._saveToCurrentTarget({
    ...formData,
    layers,
    variations,
    sound: soundStr,
    sfx: sfxStr,
  });

  this.render();
}

export async function _onRemoveLayer(event, target) {
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;

  const layers = this._getLayersFromForm(formData);
  const variations = this._getVariationsFromForm(formData);
  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");

  if (index >= 0 && index < layers.length) {
    layers.splice(index, 1);

    await this._saveToCurrentTarget({
      ...formData,
      layers,
      variations,
      sound: soundStr,
      sfx: sfxStr,
    });

    this.render();
  }
}

export async function _onMoveLayer(event, target) {
  const button = target.closest("button") || target;
  const index = Number(button.dataset.index);
  const direction = button.dataset.direction;

  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;

  const layers = this._getLayersFromForm(formData);
  const variations = this._getVariationsFromForm(formData);
  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");

  if (direction === "up" && index > 0) {
    [layers[index], layers[index - 1]] = [layers[index - 1], layers[index]];
  } else if (direction === "down" && index < layers.length - 1) {
    [layers[index], layers[index + 1]] = [layers[index + 1], layers[index]];
  }

  await this._saveToCurrentTarget({
    ...formData,
    layers,
    variations,
    sound: soundStr,
    sfx: sfxStr,
  });

  this.render();
}

export async function _saveTempConfig(formData, layers) {
  const updates = { ...formData, layers: layers };
  if (this.actorUuid) {
    const actor = await fromUuid(this.actorUuid);
    await actor.setFlag("cinematic-cut-ins", "config", updates);
  } else if (this.globalPresetId) {
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    if (globals[this.globalPresetId]) {
      globals[this.globalPresetId] = {
        ...globals[this.globalPresetId],
        ...updates,
      };
      await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
    }
  }
}

export async function _onTestPlay(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const playbackActor = this.actorUuid
    ? await fromUuid(this.actorUuid)
    : this.globalPresetId && this.referenceActorId
      ? game.actors.get(this.referenceActorId)
      : null;
  const currentTheme = formData.theme;
  if (THEME_RESTRICTIONS[currentTheme]) {
    formData.format = THEME_RESTRICTIONS[currentTheme].default;
  }
  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");
  const layers = this._getLayersFromForm(formData);
  const screenMoodConfig = normalizeScreenMoodConfig(formData);
  const cinematicEffectConfig = normalizeCinematicEffectConfig(formData);

  let payload = {
    ...formData,
    ...screenMoodConfig,
    ...cinematicEffectConfig,
    mainFontSize: Number(formData.mainFontSize),
    subFontSize: Number(formData.subFontSize),
    mainOffsetX: Number(formData.mainOffsetX),
    mainOffsetY: Number(formData.mainOffsetY),
    subOffsetX: Number(formData.subOffsetX),
    subOffsetY: Number(formData.subOffsetY),
    hideMainText: formData.hideMainText,
    hideSubText: formData.hideSubText,
    preserveMainTextCase: shouldPreserveMainTextCase(formData),
    hideCharacter: formData.hideCharacter,
    charScale: Number(formData.charScale),
    charOffsetX: Number(formData.charOffsetX),
    charOffsetY: Number(formData.charOffsetY),
    borderWidth: Number(formData.borderWidth),
    variations: this._getVariationsFromForm(formData),
    layers: layers,
    sound: soundStr,
    sfx: sfxStr,
    shakeIntensity: Number(formData.shakeIntensity),
    dimIntensity: Number(formData.dimIntensity),
    soundVolume: Number(formData.soundVolume ?? 80),
    sfxVolume: Number(formData.sfxVolume ?? 80),
    keepAudioPlaying: !!formData.keepAudioPlaying,
    audioOnly: !!formData.audioOnly,
    localOnly: !!formData.localOnly,
    characterImageSource: normalizeCharacterImageSource(
      formData.characterImageSource,
    ),
    actorId: playbackActor?.uuid || null,
  };

  payload = CutinManager.applyRandomization(payload);

  if (playbackActor) {
    if (payload.text)
      payload.text = CutinManager.processText(payload.text, {
        actor: playbackActor,
        item: null,
      });
    if (payload.subText)
      payload.subText = CutinManager.processText(payload.subText, {
        actor: playbackActor,
        item: null,
      });
  }
  CutinManager.play(payload);
}

export function _getResourceTriggersFromForm(formData) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^triggers\.resources\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!list[index]) list[index] = {};
      list[index][prop] = formData[key];
    }
  });

  return list
    .filter((t) => t)
    .map((t) => {
      if (!t.mode) t.mode = "decrease";
      if (t.customMax !== undefined && t.customMax.trim() === "") {
        delete t.customMax;
      }
      return t;
    });
}

export async function _onAddResourceTrigger(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentResources = this._getResourceTriggersFromForm(formData);

  currentResources.push({
    path: "system.attributes.hp.value",
    threshold: 20,
    presetId: this.actorUuid ? ACTIVE_CONFIG_PRESET_ID : "",
    macroId: "",
  });

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { resources: currentResources });
  this.render();
}

export async function _onRemoveResourceTrigger(event, target) {
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentResources = this._getResourceTriggersFromForm(formData);

  currentResources.splice(index, 1);

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { resources: currentResources });
  this.render();
}

export function _getConditionTriggersFromForm(formData) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^triggers\.conditions\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!list[index]) list[index] = {};
      list[index][prop] = formData[key];
    }
  });

  return list
    .filter((t) => t)
    .map((t) => ({
      mode: t.mode === "remove" ? "remove" : "apply",
      conditionId: String(t.conditionId || "").trim(),
      presetId: t.presetId || "",
      macroId: t.macroId || "",
    }));
}

export async function _onAddConditionTrigger(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentConditions = this._getConditionTriggersFromForm(formData);

  currentConditions.push({
    mode: "apply",
    conditionId: "",
    presetId: this.actorUuid ? ACTIVE_CONFIG_PRESET_ID : "",
    macroId: "",
  });

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { conditions: currentConditions });
  this.render();
}

export async function _onRemoveConditionTrigger(event, target) {
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentConditions = this._getConditionTriggersFromForm(formData);

  currentConditions.splice(index, 1);

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { conditions: currentConditions });
  this.render();
}

export function _getChatTriggersFromForm(formData) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(/^triggers\.chat\.(\d+)\.(.*)$/);
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!list[index]) list[index] = {};
      list[index][prop] = formData[key];
    }
  });

  return list
    .filter((t) => t)
    .map((t) => {
      if (!t.trigger) t.trigger = "keyword";

      const isDiceLogic = ["diceCheck", "midiAttack", "midiDamage"].includes(
        t.trigger,
      );

      if (isDiceLogic) {
        t.value = Number(t.diceValue) || 0;
        t.rollIndex = Number(t.rollIndex) || 0;
        t.operator = t.operator || ">=";

        if (t.diceKeyword && t.diceKeyword.trim() !== "") {
          t.keyword = t.diceKeyword.trim();
        } else {
          delete t.keyword;
        }
      } else if (["midiCrit", "pf2eCriticalSuccess"].includes(t.trigger)) {
        delete t.value;
        delete t.rollIndex;
        delete t.operator;
        delete t.keyword;
      }

      delete t.diceValue;
      delete t.diceKeyword;

      return t;
    });
}

export function _validateChatTriggers(chatTriggers) {
  const blacklist =
    /\b(while|for|do|function|class|import|eval|window|document|setTimeout|setInterval)\b/;

  for (const t of chatTriggers) {
    if (t.trigger === "formula" && t.value) {
      if (blacklist.test(t.value)) {
        ui.notifications.error(
          `Cinematic FX: Security Warning. Forbidden keywords used in formula.`,
        );
        return false;
      }
      try {
        new Function(
          "d",
          "total",
          "t",
          "flavor",
          "r",
          "alias",
          `return (${t.value});`,
        );
      } catch (e) {
        ui.notifications.error(
          `Cinematic FX: Formula Syntax Error.\n"${t.value}"`,
        );
        return false;
      }
    }
  }
  return true;
}

export async function _onSave(event, target) {
  event.preventDefault();
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const actorGroups = this._getActorGroupsFromForm(formData);

  const currentTheme = formData.theme;
  if (THEME_RESTRICTIONS[currentTheme]) {
    formData.format = THEME_RESTRICTIONS[currentTheme].default;
  }

  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");
  const variations = this._getVariationsFromForm(formData);
  const resourceTriggers = this._getResourceTriggersFromForm(formData);
  const chatTriggers = this._getChatTriggersFromForm(formData);
  const conditionTriggers = this._getConditionTriggersFromForm(formData);
  const layers = this._getLayersFromForm(formData);

  const turnStartTriggers = this._getTurnTriggersFromForm(
    formData,
    "turnStart",
  );
  const turnEndTriggers = this._getTurnTriggersFromForm(formData, "turnEnd");

  if (!this._validateChatTriggers(chatTriggers)) return;

  const triggersData = {
    defaultSpellPreset: formData["triggers.defaultSpellPreset"],
    chat: chatTriggers,
    conditions: conditionTriggers,
    resources: resourceTriggers,

    turnStart: turnStartTriggers,
    turnEnd: turnEndTriggers,

    turnStartPreset: null,
    turnStartRound: null,
    turnEndPreset: null,
    turnEndRound: null,
  };

  const saveData = {
    ...formData,
    sound: soundStr,
    sfx: sfxStr,
    variations,
    layers: layers,
    triggers: triggersData,
    preserveMainTextCase: shouldPreserveMainTextCase(formData),
    triggerOnRoundStart:
      formData.triggerOnRoundStart === "on" ||
      formData.triggerOnRoundStart === true,
    triggerOnCombatStart:
      formData.triggerOnCombatStart === "on" ||
      formData.triggerOnCombatStart === true,
    triggerOnCombatEnd:
      formData.triggerOnCombatEnd === "on" ||
      formData.triggerOnCombatEnd === true,
  };

  if (this.actorUuid || this.globalPresetId) {
    saveData.characterImageSource = normalizeCharacterImageSource(
      formData.characterImageSource,
    );
  }

  if (this.scenePresetId) {
    saveData.targetSceneIds = normalizeSceneTargetIds(formData.targetSceneIds);
  }

  // [Case A] Actor Mode
  if (this.actorUuid) {
    const actor = await fromUuid(this.actorUuid);
    if (!actor) return;
    saveData.inheritGroupTriggers =
      formData.inheritGroupTriggers === "on" ||
      formData.inheritGroupTriggers === true;
    await actor.setFlag("cinematic-cut-ins", "triggers", triggersData);
    delete saveData.triggers;
    await actor.setFlag("cinematic-cut-ins", "config", saveData);
    ui.notifications.info(
      game.i18n.format("CINEMATIC.Config.Notif.Saved", { name: actor.name }),
    );
  } else if (this.globalPresetId) {
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    const existing = globals[this.globalPresetId] || {};
    const nameInput = this.element.querySelector("#preset-name");
    const newName = nameInput ? nameInput.value.trim() : null;

    globals[this.globalPresetId] = {
      ...saveData,
      id: this.globalPresetId,
      presetName: newName || existing.presetName || "Global Style",
    };

    await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
    await game.settings.set("cinematic-cut-ins", "actorGroups", actorGroups);
    this._editingGroups = actorGroups;
    ui.notifications.info(`Cinematic FX: Global Preset updated with triggers.`);
  } else if (this.scenePresetId) {
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");

    const nameInput = this.element.querySelector("#preset-name");
    const newName = nameInput ? nameInput.value.trim() : null;

    scenes[this.scenePresetId] = {
      ...saveData,
      id: this.scenePresetId,
      name: newName || scenes[this.scenePresetId].name || "Untitled Scene",
    };

    await game.settings.set("cinematic-cut-ins", "scenePresets", scenes);
    ui.notifications.info("Cinematic FX: Scene preset updated.");
  }

  this.close();
}

export async function _onSavePreset(event, target) {
  const nameInput = this.element.querySelector("#preset-name");
  const name = nameInput.value.trim();

  if (!name) {
    ui.notifications.warn(
      game.i18n.localize("CINEMATIC.Config.Notif.EnterName"),
    );
    return;
  }

  const actor = await fromUuid(this.actorUuid);
  const currentPresets = actor.getFlag("cinematic-cut-ins", "presets") || {};

  const existingPresetId = findPresetSaveTargetId(
    currentPresets,
    this._loadedPersonalPresetId,
    name,
  );
  let presetId = foundry.utils.randomID();

  if (existingPresetId) {
    const { DialogV2 } = foundry.applications.api;

    const confirm = await DialogV2.wait({
      window: {
        title: game.i18n.localize("CINEMATIC.Config.Dialog.OverwriteTitle"),
        icon: "fas fa-exclamation-triangle",
      },
      content: game.i18n.format("CINEMATIC.Config.Dialog.OverwritePersonal", {
        name: name,
      }),
      buttons: [
        {
          action: "yes",
          label: "Overwrite",
          icon: "fas fa-check",
          default: true,
          callback: () => true,
        },
        {
          action: "no",
          label: "Cancel",
          icon: "fas fa-times",
          callback: () => false,
        },
      ],
      close: () => false,
    });

    if (!confirm) return;
    presetId = existingPresetId;
  }

  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");
  const variations = this._getVariationsFromForm(formData);
  const layers = this._getLayersFromForm(formData);

  const presetData = {
    ...formData,
    variations,
    layers: layers,
    presetName: name,
    id: presetId,
    sound: soundStr,
    sfx: sfxStr,
    characterImageSource: normalizeCharacterImageSource(
      formData.characterImageSource,
    ),
    preserveMainTextCase: shouldPreserveMainTextCase(formData),
  };

  currentPresets[presetId] = presetData;
  await actor.setFlag("cinematic-cut-ins", "presets", currentPresets);
  this._loadedPersonalPresetId = presetId;
  this._presetNameDraft = name;

  ui.notifications.info(
    game.i18n.format("CINEMATIC.Config.Notif.PresetSaved", { name: name }),
  );

  syncSavedPresetOptions(this, { presetId, name, source: "personal" });
}

export async function _onLoadPreset(event, target) {
  const select = this.element.querySelector("#preset-select");
  const presetId = select.value;
  if (!presetId) return;

  const actor = await fromUuid(this.actorUuid);
  const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
  const data = presets[presetId];

  if (!data) return;

  const newConfig = {
    ...data,
    variations: data.variations || [],
    layers: data.layers || [],
  };

  this._loadedPersonalPresetId = presetId;
  this._loadedGlobalPresetId = null;
  this._presetNameDraft = data.presetName || "";
  await actor.setFlag("cinematic-cut-ins", "config", newConfig);
  this._lastTheme = data.theme || "brush";
  this.render();
  ui.notifications.info(
    game.i18n.format("CINEMATIC.Config.Notif.PresetLoaded", {
      name: data.presetName,
    }),
  );
}

export async function _onDeletePreset(event, target) {
  const select = this.element.querySelector("#preset-select");
  const presetId = select ? select.value : null;

  if (!presetId) {
    ui.notifications.warn(
      game.i18n.localize("CINEMATIC.Config.Notif.SelectDelete"),
    );
    return;
  }

  const confirm = await Dialog.confirm({
    title: game.i18n.localize("CINEMATIC.Config.Dialog.DeleteTitle"),
    content: game.i18n.localize("CINEMATIC.Config.Dialog.DeleteContent"),
  });
  if (!confirm) return;

  const actor = await fromUuid(this.actorUuid);
  const currentPresets = actor.getFlag("cinematic-cut-ins", "presets") || {};

  if (Object.keys(currentPresets).length <= 1) {
    await actor.unsetFlag("cinematic-cut-ins", "presets");
  } else {
    await actor.update({
      [`flags.cinematic-cut-ins.presets.-=${presetId}`]: null,
    });
  }

  if (this._loadedPersonalPresetId === presetId) {
    this._loadedPersonalPresetId = null;
    this._presetNameDraft = null;
  }

  ui.notifications.info(
    game.i18n.localize("CINEMATIC.Config.Notif.PresetDeleted"),
  );
  this.render();
}

export async function _onConvertTextOffsets(event, target) {
  event.preventDefault();

  const { DialogV2 } = foundry.applications.api;
  const confirmed = await DialogV2.wait({
    window: {
      title: game.i18n.localize(
        "CINEMATIC.Config.Dialog.ConvertTextOffsetsTitle",
      ),
      icon: "fas fa-arrows-alt",
    },
    content: game.i18n.localize(
      "CINEMATIC.Config.Dialog.ConvertTextOffsetsContent",
    ),
    buttons: [
      {
        action: "yes",
        label: game.i18n.localize("CINEMATIC.Config.BtnConvertTextOffsets"),
        icon: "fas fa-check",
        default: true,
        callback: () => true,
      },
      {
        action: "no",
        label: "Cancel",
        icon: "fas fa-times",
        callback: () => false,
      },
    ],
    close: () => false,
  });
  if (!confirmed) return;

  const form = this.element;
  const modeInput = form.querySelector('[name="textOffsetMode"]');
  const mainYInput = form.querySelector('[name="mainOffsetY"]');
  const subYInput = form.querySelector('[name="subOffsetY"]');
  const hideMainInput = form.querySelector('[name="hideMainText"]');
  const mainY = Number(mainYInput?.value || 0);
  const subY = Number(subYInput?.value || 0);
  const mainContributesToLegacyFlow = !hideMainInput?.checked;

  if (modeInput) modeInput.value = "independent";
  if (subYInput)
    subYInput.value = (mainContributesToLegacyFlow ? mainY : 0) + subY;

  for (const input of [modeInput, subYInput]) {
    if (!input) continue;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const upgradeRow = target.closest(".text-offset-upgrade");
  if (upgradeRow) upgradeRow.remove();

  this._updatePreviewStyles();
  ui.notifications.info(
    game.i18n.localize("CINEMATIC.Config.Notif.TextOffsetsConverted"),
  );
}

export async function _onReset(event, target) {
  const confirm = await Dialog.confirm({
    title: game.i18n.localize("CINEMATIC.Config.Dialog.ResetTitle"),
    content: game.i18n.localize("CINEMATIC.Config.Dialog.ResetContent"),
  });
  if (!confirm) return;

  const defaultTheme = "brush";
  const defaults = {
    theme: defaultTheme,
    format: "popout",
    text: "CINEMATIC!",
    subText: "CRITICAL ART",
    mainFontSize: 8,
    subFontSize: 2,
    fontFamily: "Teko",
    mainTextColor: THEME_DEFAULTS[defaultTheme].main,
    subTextColor: THEME_DEFAULTS[defaultTheme].sub,
    mainOffsetX: 0,
    mainOffsetY: 0,
    subOffsetX: 0,
    subOffsetY: 0,
    hideMainText: false,
    hideSubText: false,
    preserveMainTextCase: false,
    hideCharacter: false,
    charScale: 1.0,
    charOffsetX: 0,
    charOffsetY: 0,
    color: "#e61c34",
    borderWidth: 0,
    borderColor: "#ffffff",
    charShadowColor: "#000000",
    hideCharShadow: false,
    screenMood: "none",
    screenMoodOpacity: 60,
    cinematicEffect: "none",
    cinematicEffectStrength: 2,
    cinematicEffectOffsetX: 0,
    cinematicEffectOffsetY: 0,
    cinematicEffectScale: 100,
    screenPos: 50,
    screenPosX: 50,
    sound: "",
    sfx: "",
    shakeIntensity: 0,
    dimIntensity: 0,
    soundVolume: 80,
    sfxVolume: 80,
    keepAudioPlaying: false,
    audioOnly: false,
    groupId: "",
    customDuration: 3.5,
    customBgLoop: true,
    customOverlayLoop: true,
    fontBold: true,
    fontItalic: false,
    subFontBold: true,
    subFontItalic: false,
    textOffsetMode: "independent",
    characterImageSource: "preset",
  };

  const form = this.element;
  const setVal = (name, val) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      if (input.type === "checkbox") input.checked = val;
      else input.value = val;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };
  const setColor = (name, val) => {
    const el =
      form.querySelector(`color-picker[name="${name}"]`) ||
      form.querySelector(`input[name="${name}"]`);
    if (el) {
      el.value = val;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  setVal("theme", defaults.theme);
  setVal("format", defaults.format);
  setVal("text", defaults.text);
  setVal("subText", defaults.subText);
  setVal("mainFontSize", defaults.mainFontSize);
  setVal("subFontSize", defaults.subFontSize);
  setVal("fontFamily", defaults.fontFamily);
  setVal("fontBold", defaults.fontBold);
  setVal("fontItalic", defaults.fontItalic);
  setVal("subFontFamily", defaults.fontFamily);
  setVal("subFontBold", defaults.subFontBold);
  setVal("subFontItalic", defaults.subFontItalic);
  setVal("mainOffsetX", defaults.mainOffsetX);
  setVal("mainOffsetY", defaults.mainOffsetY);
  setVal("subOffsetX", defaults.subOffsetX);
  setVal("subOffsetY", defaults.subOffsetY);
  setVal("textOffsetMode", defaults.textOffsetMode);

  const upgradeRow = form.querySelector(".text-offset-upgrade");
  if (upgradeRow) upgradeRow.remove();

  setVal("charScale", defaults.charScale);
  setVal("charOffsetX", defaults.charOffsetX);
  setVal("charOffsetY", defaults.charOffsetY);
  setVal("screenMood", defaults.screenMood);
  setVal("screenMoodOpacity", defaults.screenMoodOpacity);
  setVal("cinematicEffect", defaults.cinematicEffect);
  setVal("cinematicEffectStrength", defaults.cinematicEffectStrength);
  setVal("cinematicEffectOffsetX", defaults.cinematicEffectOffsetX);
  setVal("cinematicEffectOffsetY", defaults.cinematicEffectOffsetY);
  setVal("cinematicEffectScale", defaults.cinematicEffectScale);
  setVal("screenPos", defaults.screenPos);
  setVal("screenPosX", defaults.screenPosX);
  setVal("dimIntensity", defaults.dimIntensity);
  setVal("soundVolume", defaults.soundVolume);
  setVal("sfxVolume", defaults.sfxVolume);
  setVal("hideMainText", defaults.hideMainText);
  setVal("hideSubText", defaults.hideSubText);
  setVal("preserveMainTextCase", defaults.preserveMainTextCase);
  setVal("hideCharacter", defaults.hideCharacter);
  setVal("characterImageSource", defaults.characterImageSource);

  const soundInput =
    form.querySelector(`file-picker[name="sound"]`) ||
    form.querySelector(`input[name="sound"]`);
  if (soundInput) {
    soundInput.value = defaults.sound;
    soundInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
  const sfxInput =
    form.querySelector(`file-picker[name="sfx"]`) ||
    form.querySelector(`input[name="sfx"]`);
  if (sfxInput) {
    sfxInput.value = defaults.sfx;
    sfxInput.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const rangeValX = this.element.querySelector(
    'input[name="screenPosX"] + .range-value',
  );
  if (rangeValX) rangeValX.textContent = `${defaults.screenPosX}%`;

  const rangeValY = this.element.querySelector(
    'input[name="screenPos"] + .range-value',
  );
  if (rangeValY) rangeValY.textContent = `${defaults.screenPos}%`;

  const rangeValDim = this.element.querySelector(
    'input[name="dimIntensity"] + .range-value',
  );
  if (rangeValDim) rangeValDim.textContent = `${defaults.dimIntensity}%`;

  const rangeValScreenMoodOpacity = this.element.querySelector(
    'input[name="screenMoodOpacity"] + .range-value',
  );
  if (rangeValScreenMoodOpacity)
    rangeValScreenMoodOpacity.textContent = `${defaults.screenMoodOpacity}%`;

  for (const name of [
    "cinematicEffectOffsetX",
    "cinematicEffectOffsetY",
    "cinematicEffectScale",
  ]) {
    const rangeValue = this.element.querySelector(
      `input[name="${name}"] + .range-value`,
    );
    if (rangeValue) rangeValue.textContent = `${defaults[name]}%`;
  }

  const rangeValSoundVol = this.element.querySelector(
    'input[name="soundVolume"] + .range-value',
  );
  if (rangeValSoundVol)
    rangeValSoundVol.textContent = `${defaults.soundVolume}%`;

  const rangeValSfxVol = this.element.querySelector(
    'input[name="sfxVolume"] + .range-value',
  );
  if (rangeValSfxVol) rangeValSfxVol.textContent = `${defaults.sfxVolume}%`;

  const rangeValDur = this.element.querySelector(
    'input[name="customDuration"] + .range-value',
  );
  if (rangeValDur) rangeValDur.textContent = `${defaults.customDuration}s`;

  setColor("color", defaults.color);
  setColor("borderColor", defaults.borderColor);
  setColor("charShadowColor", defaults.charShadowColor);
  setColor("mainTextColor", defaults.mainTextColor);
  setColor("subTextColor", defaults.subTextColor);
  setVal("borderWidth", defaults.borderWidth);

  this._lastTheme = defaultTheme;
  this._updatePreviewStyles();
  ui.notifications.info(
    game.i18n.localize("CINEMATIC.Config.Notif.ResetComplete"),
  );
}

export function _onBrowseVariationImg(event, target) {
  const index = target.dataset.index;
  const inputName = `variations.${index}.img`;
  const input = this.element.querySelector(`input[name="${inputName}"]`);

  new FilePicker({
    type: "image",
    current: input.value || "",
    callback: (path) => {
      input.value = path;
      const imgThumb = target.parentElement.querySelector("img");
      if (imgThumb) imgThumb.src = path;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      const stageChar = this.element.querySelector(
        "#preview-stage .cinematic-character",
      );
      if (stageChar) stageChar.src = path;
    },
  }).render(true);
}

export function _getSoundStringFromForm(formData, type) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    if (key.startsWith(`${type}List.`)) {
      const val = formData[key];
      if (val && val.trim() !== "") list.push(val.trim());
    }
  });
  return list.join(";");
}

export function _getSoundArrayFromForm(formData, type) {
  const list = [];
  let i = 0;
  while (formData.hasOwnProperty(`${type}List.${i}`)) {
    list.push(formData[`${type}List.${i}`]);
    i++;
  }
  return list;
}

export async function _onAddSoundPath(event, target) {
  const type = target.dataset.type; // 'sound' or 'sfx'
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentList = this._getSoundArrayFromForm(formData, type);

  currentList.push("");
  const newStr = currentList.join(";");

  const otherType = type === "sound" ? "sfx" : "sound";
  const otherStr = this._getSoundStringFromForm(formData, otherType);

  const variations = this._getVariationsFromForm(formData);
  const layers = this._getLayersFromForm(formData);

  const updates = {
    ...formData,
    [type]: newStr,
    [otherType]: otherStr,
    variations,
    layers,
  };

  await this._saveToCurrentTarget(updates);
  this.render();
}

export async function _onRemoveSoundPath(event, target) {
  const type = target.dataset.type;
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;

  const currentList = this._getSoundArrayFromForm(formData, type);
  currentList.splice(index, 1);

  const newStr = currentList.join(";");

  const otherType = type === "sound" ? "sfx" : "sound";
  const otherStr = this._getSoundStringFromForm(formData, otherType);

  const variations = this._getVariationsFromForm(formData);
  const layers = this._getLayersFromForm(formData);

  const updates = {
    ...formData,
    [type]: newStr,
    [otherType]: otherStr,
    variations,
    layers,
  };

  await this._saveToCurrentTarget(updates);
  this.render();
}

export function _onBrowseAudio(event, target) {
  const inputName = target.dataset.target;
  const input = this.element.querySelector(`input[name="${inputName}"]`);

  new FilePicker({
    type: "audio",
    current: input.value || "",
    callback: (path) => {
      input.value = path;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    },
  }).render(true);
}

export async function _onLoadGlobal(event, target) {
  const { DialogV2 } = foundry.applications.api;

  const select = this.element.querySelector("#global-preset-select");
  const id = select.value;
  if (!id) return;

  const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
  const preset = globals[id];
  if (!preset) return;

  const newData = {
    ...preset,
    variations: preset.variations || [],
    layers: preset.layers || [],
  };

  // [Case A] Actor Mode
  if (this.actorUuid) {
    const actor = await fromUuid(this.actorUuid);

    const currentConfig = actor.getFlag("cinematic-cut-ins", "config") || {};
    if (currentConfig.img) {
      newData.img = currentConfig.img;
    } else {
      newData.img = actor.img || "icons/svg/mystery-man.svg";
    }

    const hasTriggerList = (triggers, key) =>
      Array.isArray(triggers?.[key]) && triggers[key].length > 0;
    const normalizeTurnTriggers = (triggers, type) => {
      if (Array.isArray(triggers?.[type])) return triggers[type];
      const presetKey =
        type === "turnStart" ? "turnStartPreset" : "turnEndPreset";
      const roundKey = type === "turnStart" ? "turnStartRound" : "turnEndRound";
      return triggers?.[presetKey]
        ? [
            {
              presetId: triggers[presetKey],
              round: triggers[roundKey] || "",
              macroId: "",
            },
          ]
        : [];
    };
    const hasTriggers =
      preset.triggers &&
      (["chat", "resources", "conditions", "turnStart", "turnEnd"].some((key) =>
        hasTriggerList(preset.triggers, key),
      ) ||
        !!preset.triggers.defaultSpellPreset ||
        !!preset.triggers.turnStartPreset ||
        !!preset.triggers.turnEndPreset);

    let mode = "style";

    if (hasTriggers) {
      mode = await DialogV2.wait({
        window: {
          title: "Load Global Preset",
          icon: "fas fa-file-import",
        },
        content: `
                    <div style="padding: 10px; font-size: 1.1em;">
                        <p>The preset <strong>"${preset.presetName}"</strong> contains Trigger Rules.</p>
                        <p style="color: #ccc; font-size: 0.9em;">How would you like to handle them?</p>
                    </div>
                `,
        buttons: [
          {
            action: "style",
            label: "Style Only",
            icon: "fas fa-paint-brush",
            default: true,
            callback: () => "style",
          },
          {
            action: "append",
            label: "Append Triggers",
            icon: "fas fa-plus",
            callback: () => "append",
          },
          {
            action: "replace",
            label: "Replace Triggers",
            icon: "fas fa-sync",
            callback: () => "replace",
          },
        ],
        close: () => "close",
      });
    }

    if (mode === "close") return;

    this._loadedPersonalPresetId = null;
    this._loadedGlobalPresetId = id;
    this._presetNameDraft = preset.presetName || "";

    await actor.setFlag("cinematic-cut-ins", "config", newData);

    if (mode === "style") {
      ui.notifications.info(`Loaded style only: ${preset.presetName}`);
    } else if (mode === "append") {
      const currentTriggers =
        actor.getFlag("cinematic-cut-ins", "triggers") || {};
      const presetTriggers = preset.triggers || {};
      const mergedTriggers = {
        ...currentTriggers,
        defaultSpellPreset:
          currentTriggers.defaultSpellPreset ||
          presetTriggers.defaultSpellPreset ||
          "",
        chat: [...(currentTriggers.chat || []), ...(presetTriggers.chat || [])],
        resources: [
          ...(currentTriggers.resources || []),
          ...(presetTriggers.resources || []),
        ],
        conditions: [
          ...(currentTriggers.conditions || []),
          ...(presetTriggers.conditions || []),
        ],
        turnStart: [
          ...normalizeTurnTriggers(currentTriggers, "turnStart"),
          ...normalizeTurnTriggers(presetTriggers, "turnStart"),
        ],
        turnEnd: [
          ...normalizeTurnTriggers(currentTriggers, "turnEnd"),
          ...normalizeTurnTriggers(presetTriggers, "turnEnd"),
        ],
        turnStartPreset: null,
        turnStartRound: null,
        turnEndPreset: null,
        turnEndRound: null,
      };
      await actor.setFlag("cinematic-cut-ins", "triggers", mergedTriggers);
      ui.notifications.info(`Loaded style & Appended triggers.`);
    } else if (mode === "replace") {
      await actor.setFlag("cinematic-cut-ins", "triggers", preset.triggers);
      ui.notifications.info(`Loaded style & Replaced triggers.`);
    }

    this._lastTheme = newData.theme || "brush";
    this.render();
  } else if (this.globalPresetId) {
    globals[this.globalPresetId] = {
      ...newData,
      id: this.globalPresetId,
      presetName: globals[this.globalPresetId].presetName,
      triggers: preset.triggers,
    };
    await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
    ui.notifications.info(`Imported style & triggers to current preset.`);
    this._lastTheme = newData.theme || "brush";
    this.render();
  } else if (this.scenePresetId) {
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");

    const currentScene = scenes[this.scenePresetId] || {};

    scenes[this.scenePresetId] = {
      ...currentScene,
      ...newData,
      id: this.scenePresetId,
      name: currentScene.name || "Untitled Scene",
    };

    await game.settings.set("cinematic-cut-ins", "scenePresets", scenes);

    ui.notifications.info(
      `Cinematic FX: Loaded global style "${preset.presetName}".`,
    );
    this._lastTheme = newData.theme || "brush";
    this.render();
  }
}

export async function _onSaveToGlobal(event, target) {
  const nameInput = this.element.querySelector("#preset-name");
  const name = nameInput.value.trim();
  if (!name) {
    ui.notifications.warn(
      game.i18n.localize("CINEMATIC.Config.Notif.EnterGlobalName"),
    );
    return;
  }

  const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
  const existingPresetId = findPresetSaveTargetId(
    globals,
    this._loadedGlobalPresetId,
    name,
  );
  let presetId = foundry.utils.randomID();

  if (existingPresetId) {
    const { DialogV2 } = foundry.applications.api;

    const confirm = await DialogV2.wait({
      window: {
        title: game.i18n.localize("CINEMATIC.Config.Dialog.OverwriteTitle"),
        icon: "fas fa-globe",
      },
      content: game.i18n.format("CINEMATIC.Config.Dialog.OverwriteGlobal", {
        name: name,
      }),
      buttons: [
        {
          action: "yes",
          label: "Overwrite",
          icon: "fas fa-check",
          default: true,
          callback: () => true,
        },
        {
          action: "no",
          label: "Cancel",
          icon: "fas fa-times",
          callback: () => false,
        },
      ],
      close: () => false,
    });

    if (!confirm) return;
    presetId = existingPresetId;
  }

  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const soundStr = this._getSoundStringFromForm(formData, "sound");
  const sfxStr = this._getSoundStringFromForm(formData, "sfx");
  const variations = this._getVariationsFromForm(formData);
  const layers = this._getLayersFromForm(formData);

  const presetData = {
    ...formData,
    sound: soundStr,
    sfx: sfxStr,
    variations,
    layers: layers,
    presetName: name,
    id: presetId,
    characterImageSource: normalizeCharacterImageSource(
      formData.characterImageSource,
    ),
    preserveMainTextCase: shouldPreserveMainTextCase(formData),
  };

  globals[presetId] = presetData;
  await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
  this._loadedGlobalPresetId = presetId;
  this._presetNameDraft = name;

  ui.notifications.info(
    game.i18n.format("CINEMATIC.Config.Notif.GlobalSaved", { name: name }),
  );

  syncSavedPresetOptions(this, { presetId, name, source: "global" });
}

export async function _onAddChatTrigger(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentChat = this._getChatTriggersFromForm(formData);

  currentChat.push({
    keyword: "",
    value: 0,
    presetId: this.actorUuid ? ACTIVE_CONFIG_PRESET_ID : "",
    macroId: "",
  });

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { chat: currentChat });
  this.render();
}

export async function _onRemoveChatTrigger(event, target) {
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentChat = this._getChatTriggersFromForm(formData);

  currentChat.splice(index, 1);

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, { chat: currentChat });
  this.render();
}

export function _getTurnTriggersFromForm(formData, type) {
  const list = [];
  Object.keys(formData).forEach((key) => {
    const match = key.match(new RegExp(`^triggers\\.${type}\\.(\\d+)\\.(.*)$`));
    if (match) {
      const index = Number(match[1]);
      const prop = match[2];
      if (!list[index]) list[index] = {};
      list[index][prop] = formData[key];
    }
  });
  return list.filter((t) => t.presetId || t.macroId);
}

export async function _onAddTurnTrigger(event, target) {
  const type = target.dataset.type; // 'turnStart' or 'turnEnd'
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;

  const currentTriggers = this._getTurnTriggersFromForm(formData, type);
  currentTriggers.push({
    presetId: this.actorUuid ? ACTIVE_CONFIG_PRESET_ID : "",
    round: "",
    macroId: "",
  });

  const updateData = {};
  updateData[type] = currentTriggers;

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, updateData);
  this.render();
}

export async function _onRemoveTurnTrigger(event, target) {
  const type = target.dataset.type;
  const index = Number(target.dataset.index);
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;

  const currentTriggers = this._getTurnTriggersFromForm(formData, type);
  currentTriggers.splice(index, 1);

  const updateData = {};
  updateData[type] = currentTriggers;

  await this._saveCurrentFormDraft(formData);
  await this._updateTriggersFlag(formData, updateData);
  this.render();
}

function _getTriggerList(triggers, key) {
  const list = triggers?.[key];
  return Array.isArray(list) ? list : [];
}

function _getTurnTriggerList(triggers, key) {
  const list = _getTriggerList(triggers, key);
  if (list.length > 0) return list;

  const presetKey = key === "turnStart" ? "turnStartPreset" : "turnEndPreset";
  const roundKey = key === "turnStart" ? "turnStartRound" : "turnEndRound";
  const presetId = triggers?.[presetKey];
  return presetId
    ? [{ presetId, round: triggers?.[roundKey] || "", macroId: "" }]
    : [];
}

function _hasTriggerRules(triggers = {}) {
  return (
    ["chat", "resources", "conditions", "turnStart", "turnEnd"].some(
      (key) => _getTriggerList(triggers, key).length > 0,
    ) ||
    !!triggers.defaultSpellPreset ||
    !!triggers.turnStartPreset ||
    !!triggers.turnEndPreset
  );
}

function _mergeCopiedGroupTriggers(currentTriggers, groupTriggers) {
  const current = currentTriggers || {};
  const inherited = foundry.utils.deepClone(groupTriggers || {});

  return {
    ...current,
    defaultSpellPreset:
      current.defaultSpellPreset || inherited.defaultSpellPreset || "",
    chat: [
      ..._getTriggerList(current, "chat"),
      ..._getTriggerList(inherited, "chat"),
    ],
    resources: [
      ..._getTriggerList(current, "resources"),
      ..._getTriggerList(inherited, "resources"),
    ],
    conditions: [
      ..._getTriggerList(current, "conditions"),
      ..._getTriggerList(inherited, "conditions"),
    ],
    turnStart: [
      ..._getTurnTriggerList(current, "turnStart"),
      ..._getTurnTriggerList(inherited, "turnStart"),
    ],
    turnEnd: [
      ..._getTurnTriggerList(current, "turnEnd"),
      ..._getTurnTriggerList(inherited, "turnEnd"),
    ],
    turnStartPreset: null,
    turnStartRound: null,
    turnEndPreset: null,
    turnEndRound: null,
  };
}

export async function _onCopyInheritedGroupTriggers(event) {
  event.preventDefault();
  if (!this.actorUuid) return;

  const actor = await fromUuid(this.actorUuid);
  if (!actor) return;

  const actorConfig = actor.getFlag("cinematic-cut-ins", "config") || {};
  const groupId = actorConfig.groupId;
  if (!groupId) {
    ui.notifications.warn(
      game.i18n.localize("CINEMATIC.Config.Notif.NoInheritedTriggers"),
    );
    return;
  }

  const actorGroups =
    game.settings.get("cinematic-cut-ins", "actorGroups") || {};
  const globalPresets =
    game.settings.get("cinematic-cut-ins", "globalPresets") || {};
  const group = actorGroups[groupId];
  const defaultPreset = group?.defaultPresetId
    ? globalPresets[group.defaultPresetId]
    : null;
  const groupTriggers = defaultPreset?.triggers || {};

  if (!_hasTriggerRules(groupTriggers)) {
    ui.notifications.warn(
      game.i18n.localize("CINEMATIC.Config.Notif.NoInheritedTriggers"),
    );
    return;
  }

  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const currentTriggers = {
    defaultSpellPreset: formData["triggers.defaultSpellPreset"],
    resources: this._getResourceTriggersFromForm(formData),
    chat: this._getChatTriggersFromForm(formData),
    conditions: this._getConditionTriggersFromForm(formData),
    turnStart: this._getTurnTriggersFromForm(formData, "turnStart"),
    turnEnd: this._getTurnTriggersFromForm(formData, "turnEnd"),
    turnStartPreset: null,
    turnStartRound: null,
    turnEndPreset: null,
    turnEndRound: null,
  };
  const mergedTriggers = _mergeCopiedGroupTriggers(
    currentTriggers,
    groupTriggers,
  );

  await actor.setFlag("cinematic-cut-ins", "triggers", mergedTriggers);
  await actor.setFlag("cinematic-cut-ins", "config", {
    ...actorConfig,
    inheritGroupTriggers: false,
  });

  ui.notifications.info(
    game.i18n.format("CINEMATIC.Config.Notif.CopiedInheritedTriggers", {
      preset: defaultPreset.presetName || "Untitled",
    }),
  );
  this.render();
}

export async function _saveCurrentFormDraft(formData) {
  const presetNameInput = this.element?.querySelector("#preset-name");
  if (presetNameInput) this._presetNameDraft = presetNameInput.value;

  if (this.globalPresetId) {
    this._editingGroups = this._getActorGroupsFromForm(formData);
  }

  const currentTheme = formData.theme;
  if (THEME_RESTRICTIONS[currentTheme]) {
    formData.format = THEME_RESTRICTIONS[currentTheme].default;
  }

  const draftData = {
    ...formData,
    sound: this._getSoundStringFromForm(formData, "sound"),
    sfx: this._getSoundStringFromForm(formData, "sfx"),
    variations: this._getVariationsFromForm(formData),
    layers: this._getLayersFromForm(formData),
    preserveMainTextCase: shouldPreserveMainTextCase(formData),
  };

  if (this.actorUuid || this.globalPresetId) {
    draftData.characterImageSource = normalizeCharacterImageSource(
      formData.characterImageSource,
    );
  }

  if (this.actorUuid) {
    draftData.inheritGroupTriggers =
      formData.inheritGroupTriggers === "on" ||
      formData.inheritGroupTriggers === true;
  }

  if (this.scenePresetId) {
    draftData.targetSceneIds = normalizeSceneTargetIds(formData.targetSceneIds);
    draftData.triggerOnRoundStart =
      formData.triggerOnRoundStart === "on" ||
      formData.triggerOnRoundStart === true;
    draftData.triggerOnCombatStart =
      formData.triggerOnCombatStart === "on" ||
      formData.triggerOnCombatStart === true;
    draftData.triggerOnCombatEnd =
      formData.triggerOnCombatEnd === "on" ||
      formData.triggerOnCombatEnd === true;
  }

  for (const key of Object.keys(draftData)) {
    if (
      key.startsWith("triggers.") ||
      key.startsWith("variations.") ||
      key.startsWith("layers.") ||
      key.startsWith("groupName.") ||
      key.startsWith("groupDefault.")
    ) {
      delete draftData[key];
    }
  }

  await this._saveToCurrentTarget(draftData);
}

export async function _updateTriggersFlag(formData, newParts) {
  const resList =
    newParts.resources || this._getResourceTriggersFromForm(formData);
  const chatList = newParts.chat || this._getChatTriggersFromForm(formData);
  const conditionList =
    newParts.conditions || this._getConditionTriggersFromForm(formData);

  const turnStartList =
    newParts.turnStart || this._getTurnTriggersFromForm(formData, "turnStart");
  const turnEndList =
    newParts.turnEnd || this._getTurnTriggersFromForm(formData, "turnEnd");

  const mergedTriggers = {
    defaultSpellPreset: formData["triggers.defaultSpellPreset"],

    turnStart: turnStartList,
    turnEnd: turnEndList,

    turnStartPreset: null,
    turnStartRound: null,
    turnEndPreset: null,
    turnEndRound: null,

    resources: resList,
    chat: chatList,
    conditions: conditionList,
  };

  if (this.actorUuid) {
    const actor = await fromUuid(this.actorUuid);
    if (actor)
      await actor.setFlag("cinematic-cut-ins", "triggers", mergedTriggers);
  } else if (this.globalPresetId) {
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    if (globals[this.globalPresetId]) {
      globals[this.globalPresetId].triggers = mergedTriggers;
      await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
    }
  }
}

export function _getActorGroupsFromForm(formData) {
  const nameKeys = Object.keys(formData).filter((k) =>
    k.startsWith("groupName."),
  );
  const defaultKeys = Object.keys(formData).filter((k) =>
    k.startsWith("groupDefault."),
  );

  if (nameKeys.length === 0 && defaultKeys.length === 0) {
    return (
      this._editingGroups ||
      game.settings.get("cinematic-cut-ins", "actorGroups") ||
      {}
    );
  }

  const groups = {};
  const ids = new Set([
    ...nameKeys.map((k) => k.replace("groupName.", "")),
    ...defaultKeys.map((k) => k.replace("groupDefault.", "")),
  ]);

  ids.forEach((id) => {
    const name = String(formData[`groupName.${id}`] || "").trim();
    if (!name) return;
    groups[id] = {
      id,
      name,
      defaultPresetId: String(formData[`groupDefault.${id}`] || ""),
    };
  });

  return groups;
}

export async function _onAddActorGroup(event, target) {
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const groups = this._getActorGroupsFromForm(formData);
  const id = foundry.utils.randomID();
  groups[id] = { id, name: "New Group", defaultPresetId: "" };
  this._editingGroups = groups;
  this.render();
}

export async function _onRemoveActorGroup(event, target) {
  const groupId = target.dataset.groupId;
  const formData = new foundry.applications.ux.FormDataExtended(this.element)
    .object;
  const groups = this._getActorGroupsFromForm(formData);
  delete groups[groupId];
  this._editingGroups = groups;
  this.render();
}

export async function _saveToCurrentTarget(dataToSave) {
  if (
    Object.prototype.hasOwnProperty.call(dataToSave, "characterImageSource")
  ) {
    dataToSave.characterImageSource = normalizeCharacterImageSource(
      dataToSave.characterImageSource,
    );
  }

  if (
    Object.prototype.hasOwnProperty.call(dataToSave, "preserveMainTextCase")
  ) {
    dataToSave.preserveMainTextCase = shouldPreserveMainTextCase(dataToSave);
  }

  if (Array.isArray(dataToSave.layers)) {
    Object.keys(dataToSave).forEach((key) => {
      if (key.startsWith("layers.")) {
        delete dataToSave[key];
      }
    });
  }

  const cleanUpData = {
    customBg: null,
    customBgOpacity: null,
    customBgScale: null,
    customBgOffsetX: null,
    customBgOffsetY: null,
    customBgLoop: null,
    customOverlay: null,
    customOverlayScale: null,
    customOverlayOffsetX: null,
    customOverlayOffsetY: null,
    customOverlayLoop: null,
  };

  const finalData = { ...dataToSave, ...cleanUpData };

  if (this.actorUuid) {
    const actor = await fromUuid(this.actorUuid);
    await actor.setFlag("cinematic-cut-ins", "config", finalData);
  } else if (this.globalPresetId) {
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    if (globals[this.globalPresetId]) {
      const current = { ...globals[this.globalPresetId], ...dataToSave };

      for (const key of Object.keys(cleanUpData)) delete current[key];

      globals[this.globalPresetId] = current;
      await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
    }
  } else if (this.scenePresetId) {
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    if (scenes[this.scenePresetId]) {
      const current = { ...scenes[this.scenePresetId], ...dataToSave };

      for (const key of Object.keys(cleanUpData)) delete current[key];

      scenes[this.scenePresetId] = current;
      await game.settings.set("cinematic-cut-ins", "scenePresets", scenes);
    }
  }
}
