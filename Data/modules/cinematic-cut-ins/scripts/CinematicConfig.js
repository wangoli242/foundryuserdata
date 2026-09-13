import { CutinManager } from "./CutinManager.js";
import {
  CINEMATIC_EFFECT_GROUPS,
  CINEMATIC_EFFECT_NONE_OPTION,
  CINEMATIC_EFFECT_STRENGTH_OPTIONS,
  normalizeCinematicEffectConfig,
} from "./cinematic-effects.js";
import {
  SCREEN_MOOD_OPTIONS,
  normalizeScreenMoodConfig,
} from "./screen-mood.js";
import { normalizeSceneTargetIds } from "./automation/scene-scope.js";
import { shouldPreserveMainTextCase } from "./main-text-case.js";
import { ACTIVE_CONFIG_PRESET_ID } from "./preset-resolution.js";
import {
  CHARACTER_IMAGE_SOURCE,
  resolveCharacterImageSource,
  resolveEditorImage,
} from "./actor-image-source.js";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export const THEME_LIST = [
  { id: "brush", label: "CINEMATIC.Theme.Brush" },
  { id: "cyber", label: "CINEMATIC.Theme.Cyber" },
  { id: "cinematic", label: "CINEMATIC.Theme.Cinematic" },
  { id: "royal", label: "CINEMATIC.Theme.Royal" },
  { id: "saga", label: "CINEMATIC.Theme.Saga" },
  { id: "tribal", label: "CINEMATIC.Theme.Tribal" },
  { id: "impact", label: "CINEMATIC.Theme.Impact" },
  { id: "phantom", label: "CINEMATIC.Theme.Phantom" },
  { id: "arcane", label: "CINEMATIC.Theme.Arcane" },
  { id: "voltage", label: "CINEMATIC.Theme.Voltage" },
  { id: "scope", label: "CINEMATIC.Theme.Scope" },
  { id: "blitz", label: "CINEMATIC.Theme.Blitz" },
  { id: "blitz_left", label: "CINEMATIC.Theme.BlitzLeft" },
  { id: "blossom", label: "CINEMATIC.Theme.Blossom" },
  { id: "slash", label: "CINEMATIC.Theme.Slash" },
  { id: "burst", label: "CINEMATIC.Theme.Burst" },
  { id: "glitch", label: "CINEMATIC.Theme.Glitch" },
  { id: "dash", label: "CINEMATIC.Theme.Dash" },
  { id: "runes", label: "CINEMATIC.Theme.Runes" },
  { id: "typewriter", label: "CINEMATIC.Theme.Typewriter" },
  { id: "yakuza", label: "CINEMATIC.Theme.Yakuza" },
  { id: "neon", label: "CINEMATIC.Theme.Neon" },
  { id: "stellar", label: "CINEMATIC.Theme.Stellar" },
  { id: "stellar_left", label: "CINEMATIC.Theme.StellarLeft" },
  { id: "broadcast", label: "CINEMATIC.Theme.Broadcast" },
  { id: "map", label: "CINEMATIC.Theme.Map" },
  { id: "ink", label: "CINEMATIC.Theme.Ink" },
  { id: "cleave", label: "CINEMATIC.Theme.Cleave" },
  { id: "eclipse", label: "CINEMATIC.Theme.Eclipse" },
  { id: "blank", label: "CINEMATIC.Theme.Blank" },
];

export const THEME_DEFAULTS = {
  brush: { main: "#ffffff", sub: "#000000" },
  cyber: { main: "#ffffff", sub: "#ffffff" },
  cinematic: { main: "#ffffff", sub: "#ffffff" },
  royal: { main: "#fcf6ba", sub: "#fcf6ba" },
  saga: { main: "#2b1b17", sub: "#4a3b32" },
  tribal: { main: "#ffffff", sub: "#000000" },
  impact: { main: "#ffffff", sub: "#ffff00" },
  phantom: { main: "#ffffff", sub: "#ffffff" },
  arcane: { main: "#ffffff", sub: "#ffffff" },
  voltage: { main: "#ffffff", sub: "#000000" },
  scope: { main: "#ffffff", sub: "#ffffff" },
  blitz: { main: "#ffffff", sub: "#ffffffff" },
  blitz_left: { main: "#ffffff", sub: "#ffffffff" },
  stellar: { main: "#ffffff", sub: "#aaaaaa" },
  stellar_left: { main: "#ffffff", sub: "#aaaaaa" },
  broadcast: { main: "#e8fff0", sub: "#78ff9a" },
  blossom: { main: "#ffcdd2", sub: "#ffffff" },
  slash: { main: "#ffffff", sub: "#000000" },
  burst: { main: "#ffffff", sub: "#000000" },
  glitch: { main: "#00ff00", sub: "#ff00ff" },
  dash: { main: "#ffffff", sub: "#000000" },
  runes: { main: "#00ffff", sub: "#2c3e50" },
  typewriter: { main: "#00ff00", sub: "#00cc00" },
  yakuza: { main: "#ffffff", sub: "#888888" },
  neon: { main: "#ffffff", sub: "#00ffff" },
  map: { main: "#3e2723", sub: "#5d4037" },
  ink: { main: "#ffffff", sub: "#cc0000" },
  cleave: { main: "#ffffff", sub: "#ff4444" },
  eclipse: { main: "#ffffff", sub: "#ffd700" },
  blank: { main: "#ffffff", sub: "#ffffff" },
};

export const THEME_SFX_DEFAULTS = {
  rebel: "modules/cinematic-cut-ins/sounds/sfx_rebel.ogg",
  comic: "modules/cinematic-cut-ins/sounds/sfx_comic.ogg",
  urban: "modules/cinematic-cut-ins/sounds/sfx_urban.ogg",
  noir: "modules/cinematic-cut-ins/sounds/sfx_noir.ogg",
  wanted: "modules/cinematic-cut-ins/sounds/sfx_wanted.mp3",
  slice: "modules/cinematic-cut-ins/sounds/sfx_slice.ogg",
  brush: "modules/cinematic-cut-ins/sounds/sfx_brush.mp3",
  cyber: "modules/cinematic-cut-ins/sounds/sfx_cyber.mp3",
  cinematic: "modules/cinematic-cut-ins/sounds/sfx_cinematic.mp3",
  royal: "modules/cinematic-cut-ins/sounds/sfx_royal.mp3",
  saga: "modules/cinematic-cut-ins/sounds/sfx_saga.mp3",
  tribal: "modules/cinematic-cut-ins/sounds/sfx_tribal.mp3",
  impact: "modules/cinematic-cut-ins/sounds/sfx_impact.mp3",
  phantom: "modules/cinematic-cut-ins/sounds/sfx_phantom.mp3",
  arcane: "modules/cinematic-cut-ins/sounds/sfx_arcane.mp3",
  voltage: "modules/cinematic-cut-ins/sounds/sfx_voltage.mp3",
  scope: "modules/cinematic-cut-ins/sounds/sfx_cinematic.mp3",
  blitz: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  blitz_left: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  stellar: "modules/cinematic-cut-ins/sounds/sfx_cinematic.mp3",
  stellar_left: "modules/cinematic-cut-ins/sounds/sfx_cinematic.mp3",
  broadcast: "modules/cinematic-cut-ins/sounds/sfx_voltage.mp3",
  blossom: "modules/cinematic-cut-ins/sounds/sfx_cinematic.mp3",
  slash: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  burst: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
  glitch: "modules/cinematic-cut-ins/sounds/sfx_voltage.mp3",
  dash: "modules/cinematic-cut-ins/sounds/sfx_dash.mp3",
  runes: "modules/cinematic-cut-ins/sounds/sfx_impact.mp3",
  typewriter: "modules/cinematic-cut-ins/sounds/sfx_typewriter.mp3",
  yakuza: "modules/cinematic-cut-ins/sounds/sfx_yakuza.mp3",
  neon: "modules/cinematic-cut-ins/sounds/sfx_voltage.mp3",
  map: "modules/cinematic-cut-ins/sounds/sfx_impact.mp3",
  ink: "modules/cinematic-cut-ins/sounds/sfx_impact.mp3",
  cleave: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  eclipse: "modules/cinematic-cut-ins/sounds/sfx_arcane.mp3",
};

export const THEME_RESTRICTIONS = {
  slash: { locked: true, default: "popout" },
  blitz: { locked: true, default: "popout" },
  blitz_left: { locked: true, default: "popout" },
};

export const THEME_POS_DEFAULTS = {
  blitz: { x: 80, y: 20 },
  blitz_left: { x: 0, y: 20 },
  stellar: { x: 65, y: 25 },
  stellar_left: { x: 5, y: 25 },
};

// Which axes the Screen Position sliders actually move, per theme.
// The CSS only feeds --screen-x to a handful of themes (see the
// GLOBAL POSITION OVERRIDE section in theme-personal.css); everywhere
// else the X axis is locked to the theme's own layout. Same idea for
// slash, whose column is full-height so only X applies.
export const THEME_SCREEN_AXES = {
  default: { x: false, y: true },
  blitz: { x: true, y: true },
  blitz_left: { x: true, y: true },
  stellar: { x: true, y: true },
  stellar_left: { x: true, y: true },
  blank: { x: true, y: true },
  slash: { x: true, y: false },
};

export class CinematicConfig extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.actorUuid = options.actorUuid;
    this.globalPresetId = options.globalPresetId;
    this.scenePresetId = options.scenePresetId;
    this._previewTimer = null;
    this._resizeObserver = new ResizeObserver(() => this._fitPreviewStage());
    this._lastTheme = null;
    this._activeTab = "preset";
    this.referenceActorId = null;
    this._editingGroups = null;
    this._loadedPersonalPresetId = null;
    this._loadedGlobalPresetId = null;
    this._presetNameDraft = null;
  }

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: ["cinematic-config"],
    window: {
      title: "CINEMATIC.Config.Title",
      icon: "fas fa-bolt",
      resizable: true,
      width: 1215,
      height: 700,
    },
    position: { width: 1215, height: 700 },
    actions: {
      save: Actions._onSave,
      reset: Actions._onReset,
      "save-preset": Actions._onSavePreset,
      "load-preset": Actions._onLoadPreset,
      "delete-preset": Actions._onDeletePreset,
      "test-play": Actions._onTestPlay,
      "add-variation": Actions._onAddVariation,
      "remove-variation": Actions._onRemoveVariation,
      "browse-variation-img": Actions._onBrowseVariationImg,
      "add-sound-path": Actions._onAddSoundPath,
      "remove-sound-path": Actions._onRemoveSoundPath,
      "browse-audio": Actions._onBrowseAudio,
      "add-resource-trigger": Actions._onAddResourceTrigger,
      "remove-resource-trigger": Actions._onRemoveResourceTrigger,
      "add-condition-trigger": Actions._onAddConditionTrigger,
      "remove-condition-trigger": Actions._onRemoveConditionTrigger,
      "load-global": Actions._onLoadGlobal,
      "save-to-global": Actions._onSaveToGlobal,
      "add-chat-trigger": Actions._onAddChatTrigger,
      "remove-chat-trigger": Actions._onRemoveChatTrigger,
      "add-layer": Actions._onAddLayer,
      "remove-layer": Actions._onRemoveLayer,
      "move-layer": Actions._onMoveLayer,
      "toggle-pause": Preview._onTogglePreviewPause,
      "add-turn-trigger": Actions._onAddTurnTrigger,
      "remove-turn-trigger": Actions._onRemoveTurnTrigger,
      "copy-inherited-group-triggers": Actions._onCopyInheritedGroupTriggers,
      "add-actor-group": Actions._onAddActorGroup,
      "remove-actor-group": Actions._onRemoveActorGroup,
      "convert-text-offsets": Actions._onConvertTextOffsets,
      "insert-actor-name": Actions._onInsertActorName,
    },
  };

  static PARTS = {
    content: { template: "modules/cinematic-cut-ins/templates/config.hbs" },
  };

  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    if (options.actorUuid) {
      options.id = `cinematic-config-${options.actorUuid.replace(/\./g, "-")}`;
    }
    options.window.title = game.i18n.localize("CINEMATIC.Config.Title");
    return options;
  }

  _getConditionOptions() {
    const raw = CONFIG.statusEffects || {};
    const rawEffects = Array.isArray(raw) ? raw : Object.values(raw);
    const seen = new Set();

    return rawEffects
      .map((effect) => {
        const id =
          effect.id ||
          effect.flags?.core?.statusId ||
          effect.slug ||
          effect.name ||
          effect.label;
        if (!id || seen.has(id)) return null;
        seen.add(id);

        const rawLabel = effect.label || effect.name || id;
        return {
          id,
          label: game.i18n.localize(rawLabel),
          icon: effect.icon || effect.img || effect.src || "",
        };
      })
      .filter((effect) => effect)
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  // Prevent circular refs during attribute traversal
  _getTrackableAttributes(actor) {
    const paths = [];
    if (!actor?.system) return [];

    const system = actor.system;
    const visited = new Set();

    const traverse = (
      obj,
      path = "system",
      depth = 0,
      parentHasMax = false,
    ) => {
      if (!obj || typeof obj !== "object") return;

      if (depth > 8) return;
      if (visited.has(obj)) return;
      visited.add(obj);

      const hasMax = "max" in obj;

      if ("value" in obj && hasMax) {
        let label = obj.label || obj.name || obj.alias;

        if (!label) label = path.split(".").pop().toUpperCase();

        if (path.includes("resources")) {
          if (obj.label) label = obj.label;
          else label = path.split(".").pop().toUpperCase();
        }

        paths.push({
          path: `${path}.value`,
          label: `${label} (${path}.value)`,
        });
      }

      for (const key of Object.keys(obj)) {
        if (
          [
            "value",
            "max",
            "label",
            "icon",
            "img",
            "_id",
            "_stats",
            "schema",
            "parent",
            "apps",
            "actor",
            "item",
            "flags",
          ].includes(key)
        )
          continue;
        if (key.startsWith("_")) continue;
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if (desc && !("value" in desc)) continue;
        const val = obj[key];

        if (typeof val === "number" && hasMax) {
          const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
          const parentName = path.split(".").pop();
          const capitalParent =
            parentName.charAt(0).toUpperCase() + parentName.slice(1);

          paths.push({
            path: `${path}.${key}`,
            label: `${capitalParent} ${fieldName} (${path}.${key})`,
            maxPath: `${path}.max`,
          });
        }

        traverse(val, `${path}.${key}`, depth + 1, hasMax);
      }
    };

    try {
      traverse(system);
    } catch (e) {
      console.warn("Cinematic FX | Attribute traversal warning:", e);
    }

    const commonPaths = [
      { path: "system.attributes.hp.value", label: "HP" },
      { path: "system.attributes.mana.value", label: "Mana/MP" },
      { path: "system.resources.primary.value", label: "Resource 1" },
      { path: "system.resources.secondary.value", label: "Resource 2" },
      { path: "system.resources.tertiary.value", label: "Resource 3" },
      { path: "system.wounds.value", label: "Wounds" },
      { path: "system.power.value", label: "Power" },
      {
        path: "system.health.superficial",
        label: "Health Superficial",
        maxPath: "system.health.max",
      },
      {
        path: "system.health.aggravated",
        label: "Health Aggravated",
        maxPath: "system.health.max",
      },
      {
        path: "system.willpower.superficial",
        label: "Willpower Superficial",
        maxPath: "system.willpower.max",
      },
      {
        path: "system.willpower.aggravated",
        label: "Willpower Aggravated",
        maxPath: "system.willpower.max",
      },
      { path: "system.hunger.value", label: "Hunger" },
    ];

    const uniquePaths = new Map();

    paths.forEach((p) => {
      uniquePaths.set(p.path, p);
    });

    commonPaths.forEach((p) => {
      if (foundry.utils.hasProperty(actor, p.path)) {
        if (!uniquePaths.has(p.path)) {
          uniquePaths.set(p.path, p);
        }
      }
    });

    return Array.from(uniquePaths.values()).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }

  async _prepareContext(options) {
    // [A] Data source resolution
    let data = {};
    let presetsMap = {};
    let variations = [];
    let actor = null;

    let isFreshActorConfig = false;

    if (this.actorUuid) {
      actor = await fromUuid(this.actorUuid);
      if (!actor) return {};

      const actorConfig = actor.getFlag("cinematic-cut-ins", "config");
      isFreshActorConfig = !actorConfig;
      data = foundry.utils.deepClone(actorConfig || {});
      presetsMap = actor.getFlag("cinematic-cut-ins", "presets") || {};
      variations = data.variations || [];

      data.img = resolveEditorImage({
        presetImage: data.img,
        actorImage: actor.img,
        hasActorContext: true,
      });
    } else if (this.globalPresetId) {
      const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
      const globalPreset = globals[this.globalPresetId];
      if (!globalPreset) return {};
      data = foundry.utils.deepClone(globalPreset);

      presetsMap = {};
      variations = data.variations || [];
      data.img = resolveEditorImage({ presetImage: data.img });
    } else if (this.scenePresetId) {
      const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
      const scenePreset = scenes[this.scenePresetId];
      if (!scenePreset) return {};
      data = foundry.utils.deepClone(scenePreset);

      presetsMap = {};
      variations = data.variations || [];

      if (!data.name) data.name = "New Scene";
      if (data.img === undefined) data.img = "";
    }

    // Layer data migration & preparation
    let layers = [];

    if (Array.isArray(data.layers)) {
      layers = foundry.utils.deepClone(data.layers);
    } else if (data.layers && typeof data.layers === "object") {
      try {
        layers = Object.values(data.layers);
      } catch (e) {
        console.warn(
          "Cinematic FX | Failed to convert layers object to array:",
          e,
        );
        layers = [];
      }
    }

    // Legacy customBg migration
    if (data.customBg) {
      layers.unshift({
        src: data.customBg,
        zIndex: 0,
        opacity: data.customBgOpacity ?? 0.5,
        scale: data.customBgScale ?? 1.0,
        x: data.customBgOffsetX ?? 0,
        y: data.customBgOffsetY ?? 0,
        loop: data.customBgLoop ?? true,
        blend: "normal",
      });
      delete data.customBg;
    }

    // Legacy customOverlay migration
    if (data.customOverlay) {
      layers.push({
        src: data.customOverlay,
        zIndex: 70,
        opacity: 1.0,
        scale: data.customOverlayScale ?? 1.0,
        x: data.customOverlayOffsetX ?? 0,
        y: data.customOverlayOffsetY ?? 0,
        loop: data.customOverlayLoop ?? true,
        blend: "normal",
      });
      delete data.customOverlay;
    }

    if (Array.isArray(layers)) {
      layers.forEach((l) => {
        if (l && l.zIndex === undefined) {
          l.zIndex = l.depth === "front" ? 70 : l.depth === "back" ? 0 : 20;
        }
      });
    }

    const uiLayers = [];

    uiLayers.push({ isSystem: true, label: "TEXT & UI", z: 100 });
    uiLayers.push({ isSystem: true, label: "CHARACTER", z: 50 });
    uiLayers.push({ isSystem: true, label: "THEME BACKGROUND", z: 10 });

    if (Array.isArray(layers)) {
      layers.forEach((layer, index) => {
        if (!layer || typeof layer !== "object") return;
        const isVideo =
          layer.src && layer.src.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);

        uiLayers.push({
          isSystem: false,
          originalIndex: index,
          data: {
            ...layer,
            maskMode: layer.maskMode || "none",
            maskShape: layer.maskShape || "circle(48%)",
            maskSrc: layer.maskSrc || "",
            maskSize: layer.maskSize ?? 100, // 100%
            maskX: layer.maskX ?? 50, // 50% (Center)
            maskY: layer.maskY ?? 50, // 50% (Center)
          },
          z: Number(layer.zIndex) || 0,
          isVideo: !!isVideo,
        });
      });
    }

    uiLayers.sort((a, b) => b.z - a.z);

    // [B] Global preset list
    const globalPresetsMap =
      game.settings.get("cinematic-cut-ins", "globalPresets") || {};
    const globalList = Object.entries(globalPresetsMap)
      .map(([id, gData]) => ({
        id,
        name: gData.presetName,
        selected: id === this._loadedGlobalPresetId,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const actorPresetList = Object.entries(presetsMap)
      .map(([id, d]) => ({
        id,
        name: d.presetName || "Untitled",
        selected: id === this._loadedPersonalPresetId,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    const actorTriggerPresetOptions = [
      {
        id: ACTIVE_CONFIG_PRESET_ID,
        name: game.i18n.localize("CINEMATIC.Trigger.ActiveConfigOption"),
      },
      ...actorPresetList.map((preset) => ({
        ...preset,
        name: game.i18n.format("CINEMATIC.Trigger.ActorPresetOption", {
          preset: preset.name,
        }),
      })),
      ...globalList.map((preset) => ({
        ...preset,
        name: game.i18n.format("CINEMATIC.Trigger.GlobalPresetOption", {
          preset: preset.name,
        }),
      })),
    ];
    const macroList = game.macros
      .map((m) => ({ id: m.id, name: m.name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const hasTriggerRules = (triggers = {}) => {
      const listKeys = [
        "chat",
        "resources",
        "conditions",
        "turnStart",
        "turnEnd",
      ];
      return (
        listKeys.some(
          (key) => Array.isArray(triggers[key]) && triggers[key].length > 0,
        ) ||
        !!triggers.defaultSpellPreset ||
        !!triggers.turnStartPreset ||
        !!triggers.turnEndPreset
      );
    };
    const getTriggerList = (triggers, key) =>
      Array.isArray(triggers?.[key]) ? triggers[key] : [];
    const getTurnTriggerList = (triggers, key) => {
      const list = getTriggerList(triggers, key);
      if (list.length > 0) return list;

      const presetKey =
        key === "turnStart" ? "turnStartPreset" : "turnEndPreset";
      const roundKey = key === "turnStart" ? "turnStartRound" : "turnEndRound";
      const presetId = triggers?.[presetKey];
      return presetId
        ? [{ presetId, round: triggers?.[roundKey] || "", macroId: "" }]
        : [];
    };

    const actorGroupsMap =
      this._editingGroups ||
      game.settings.get("cinematic-cut-ins", "actorGroups") ||
      {};
    const actorGroups = Object.entries(actorGroupsMap)
      .map(([id, group]) => ({
        id,
        name: group?.name || `Group ${id.slice(0, 4)}`,
        defaultPresetId: group?.defaultPresetId || "",
        defaultPresetName: group?.defaultPresetId
          ? globalPresetsMap[group.defaultPresetId]?.presetName || ""
          : "",
        hasInheritedTriggers: group?.defaultPresetId
          ? hasTriggerRules(globalPresetsMap[group.defaultPresetId]?.triggers)
          : false,
        selected: (data.groupId || "") === id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const actorGroupId = data.groupId || "";
    const activeActorGroup = actorGroupId ? actorGroupsMap[actorGroupId] : null;
    const activeGroupDefaultPresetId = activeActorGroup?.defaultPresetId || "";
    const activeGroupDefaultPreset = activeGroupDefaultPresetId
      ? globalPresetsMap[activeGroupDefaultPresetId]
      : null;
    const hasActorGroupDefaultFallback =
      !!actor && !!activeActorGroup && !!activeGroupDefaultPreset;
    const groupFallbackSelectLabel = hasActorGroupDefaultFallback
      ? game.i18n.format("CINEMATIC.Trigger.SelectPresetAuto", {
          preset: activeGroupDefaultPreset.presetName || "Untitled",
        })
      : `-- ${game.i18n.localize("CINEMATIC.Trigger.SelectPreset")} --`;
    const actorGroupFallbackHint = hasActorGroupDefaultFallback
      ? game.i18n.format("CINEMATIC.Trigger.Hint.GroupFallback", {
          group: activeActorGroup.name || "-",
          preset: activeGroupDefaultPreset.presetName || "Untitled",
        })
      : "";
    const inheritGroupTriggers = data.inheritGroupTriggers !== false;
    const hasActorGroupInheritedTriggers =
      inheritGroupTriggers &&
      hasActorGroupDefaultFallback &&
      hasTriggerRules(activeGroupDefaultPreset.triggers);
    const actorGroupTriggerHint = hasActorGroupInheritedTriggers
      ? game.i18n.format("CINEMATIC.Trigger.Hint.GroupInheritance", {
          group: activeActorGroup.name || "-",
          preset: activeGroupDefaultPreset.presetName || "Untitled",
        })
      : "";
    const groupTriggerSelectLabel = this.globalPresetId
      ? game.i18n.localize("CINEMATIC.Trigger.SelectPresetAutoGroup")
      : groupFallbackSelectLabel;
    const triggerPresetOptions = this.actorUuid
      ? actorTriggerPresetOptions
      : globalList;

    const getMacroName = (macroId) =>
      macroId
        ? macroList.find((m) => m.id === macroId)?.name || macroId
        : game.i18n.localize("CINEMATIC.Trigger.NoMacro");
    const getInheritedPresetName = (presetId) => {
      if (!presetId) {
        return game.i18n.format("CINEMATIC.Trigger.Inherited.AutoPreset", {
          preset: activeGroupDefaultPreset?.presetName || "Untitled",
        });
      }
      return (
        globalPresetsMap[presetId]?.presetName ||
        presetsMap[presetId]?.presetName ||
        presetId
      );
    };
    const triggerTypeLabels = {
      keyword: game.i18n.localize("CINEMATIC.Trigger.Type.KeywordAny"),
      rollKeyword: game.i18n.localize("CINEMATIC.Trigger.Type.KeywordRoll"),
      diceCheck: game.i18n.localize("CINEMATIC.Trigger.Type.DiceCheck"),
      formula: game.i18n.localize("CINEMATIC.Trigger.Type.Formula"),
      midiAttack: game.i18n.localize("CINEMATIC.Trigger.Type.MidiAttack"),
      midiDamage: game.i18n.localize("CINEMATIC.Trigger.Type.MidiDamage"),
      midiCrit: game.i18n.localize("CINEMATIC.Trigger.Type.MidiCritical"),
      onAttack: game.i18n.localize("CINEMATIC.Trigger.Type.OnAttack"),
      onDamage: game.i18n.localize("CINEMATIC.Trigger.Type.OnDamage"),
      onCrit: game.i18n.localize("CINEMATIC.Trigger.Type.OnCritical"),
      pf2eCriticalSuccess: game.i18n.localize(
        "CINEMATIC.Trigger.PF2eCriticalSuccess",
      ),
    };
    const inheritedGroupTriggerRows = [];
    const inheritedSourceTriggers =
      hasActorGroupDefaultFallback && inheritGroupTriggers
        ? activeGroupDefaultPreset.triggers || {}
        : {};
    const addInheritedRow = (category, detail, trigger = {}) => {
      inheritedGroupTriggerRows.push({
        category,
        detail,
        presetName: getInheritedPresetName(trigger.presetId),
        macroName: getMacroName(trigger.macroId),
      });
    };

    getTurnTriggerList(inheritedSourceTriggers, "turnStart").forEach(
      (trigger) => {
        const round = trigger.round
          ? trigger.round
          : game.i18n.localize("CINEMATIC.Trigger.Inherited.AllRounds");
        addInheritedRow(
          game.i18n.localize("CINEMATIC.Trigger.TurnStart"),
          `${game.i18n.localize("CINEMATIC.Trigger.Inherited.Round")}: ${round}`,
          trigger,
        );
      },
    );
    getTurnTriggerList(inheritedSourceTriggers, "turnEnd").forEach(
      (trigger) => {
        const round = trigger.round
          ? trigger.round
          : game.i18n.localize("CINEMATIC.Trigger.Inherited.AllRounds");
        addInheritedRow(
          game.i18n.localize("CINEMATIC.Trigger.TurnEnd"),
          `${game.i18n.localize("CINEMATIC.Trigger.Inherited.Round")}: ${round}`,
          trigger,
        );
      },
    );
    getTriggerList(inheritedSourceTriggers, "chat").forEach((trigger) => {
      const type = trigger.trigger || "keyword";
      const details = [triggerTypeLabels[type] || type];
      if (trigger.value !== undefined && trigger.value !== "")
        details.push(String(trigger.value));
      if (trigger.keyword) details.push(trigger.keyword);
      if (trigger.rollIndex !== undefined && String(trigger.rollIndex) !== "")
        details.push(`#${trigger.rollIndex}`);
      addInheritedRow(
        game.i18n.localize("CINEMATIC.Trigger.ChatTriggers"),
        details.join(" / "),
        trigger,
      );
    });
    getTriggerList(inheritedSourceTriggers, "conditions").forEach((trigger) => {
      const mode =
        trigger.mode === "remove"
          ? game.i18n.localize("CINEMATIC.Trigger.Mode.Remove")
          : game.i18n.localize("CINEMATIC.Trigger.Mode.Apply");
      addInheritedRow(
        game.i18n.localize("CINEMATIC.Trigger.ConditionTriggers"),
        `${mode}: ${trigger.conditionId || "-"}`,
        trigger,
      );
    });
    getTriggerList(inheritedSourceTriggers, "resources").forEach((trigger) => {
      const mode =
        trigger.mode === "increase"
          ? game.i18n.localize("CINEMATIC.Trigger.Mode.Increase")
          : game.i18n.localize("CINEMATIC.Trigger.Mode.Decrease");
      const unit =
        trigger.type === "value"
          ? game.i18n.localize("CINEMATIC.Trigger.Unit.Value")
          : game.i18n.localize("CINEMATIC.Trigger.Unit.Percent");
      addInheritedRow(
        game.i18n.localize("CINEMATIC.Trigger.ResourceTriggers"),
        `${trigger.path || "-"} / ${mode} ${trigger.threshold ?? 0} ${unit}`,
        trigger,
      );
    });
    if (inheritedSourceTriggers.defaultSpellPreset) {
      addInheritedRow(
        game.i18n.localize("CINEMATIC.Trigger.Header.Special"),
        game.i18n.localize("CINEMATIC.Trigger.Label.DefaultSpell"),
        { presetId: inheritedSourceTriggers.defaultSpellPreset },
      );
    }
    const hasVisibleInheritedGroupTriggers =
      inheritedGroupTriggerRows.length > 0;

    // [C] Theme & format settings
    let theme = data.theme || "brush";
    if (THEME_RESTRICTIONS[theme]) {
      data.format = THEME_RESTRICTIONS[theme].default;
    }
    let format = data.format || "popout";
    const defaultPos = THEME_POS_DEFAULTS[theme] || { x: 50, y: 50 };
    let screenPos = data.screenPos ?? defaultPos.y;
    let screenPosX = data.screenPosX ?? defaultPos.x;
    let customDuration = data.customDuration ?? 3.5;

    // [D] Font list
    const fontSet = new Set(["Teko"]);
    try {
      const ignoreList = [
        "Awesome",
        "Material",
        "Icon",
        "Symbol",
        "fa-",
        "fas",
        "far",
      ];
      document.fonts.forEach((font) => {
        const family = font.family.replace(/['"]/g, "");
        if (ignoreList.some((keyword) => family.includes(keyword))) return;
        if (family.length < 2) return;
        fontSet.add(family);
      });
    } catch (e) {}

    const fontList = Array.from(fontSet).map((f) => ({
      id: f,
      label:
        f +
        (f === "Teko"
          ? game.i18n.localize("CINEMATIC.Config.FontDefault")
          : ""),
    }));
    fontList.sort((a, b) => a.label.localeCompare(b.label));

    // [E] Sound & color defaults
    const defaults = THEME_DEFAULTS[theme] || THEME_DEFAULTS["brush"];

    const soundList = (data.sound || "").split(";").map((s) => s.trim());
    let sfxList = (data.sfx || "").split(";").map((s) => s.trim());

    if (data.sfx === undefined) {
      const defaultSfx = THEME_SFX_DEFAULTS[theme];
      sfxList = defaultSfx ? [defaultSfx] : [""];
    } else {
      if (sfxList.length === 0) sfxList.push("");
    }

    // [F] Trigger data
    let triggersContext = {
      resources: [],
      chat: [],
      conditions: [],
      turnStartPreset: "",
      turnEndPreset: "",
      defaultSpellPreset: "",
    };
    let trackableAttrs = [];
    let allActors = [];
    let sourceTriggers = {};
    let hideMainText = data.hideMainText ?? false;
    let hideSubText = data.hideSubText ?? false;
    let preserveMainTextCase = shouldPreserveMainTextCase(data);
    let charRotation = data.charRotation ?? 0;
    let charMirror = data.charMirror ?? false;
    let actorImagePreview = actor?.img || "";

    if (actor) {
      sourceTriggers = actor.getFlag("cinematic-cut-ins", "triggers") || {};
      trackableAttrs = this._getTrackableAttributes(actor);
    } else if (this.globalPresetId) {
      const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
      sourceTriggers = globals[this.globalPresetId]?.triggers || {};

      allActors = game.actors
        .map((a) => ({ id: a.id, name: a.name }))
        .sort((a, b) => a.name.localeCompare(b.name));

      if (this.referenceActorId) {
        const refActor = game.actors.get(this.referenceActorId);
        if (refActor) {
          trackableAttrs = this._getTrackableAttributes(refActor);
          actorImagePreview = refActor.img || "";
        }
      } else {
        trackableAttrs = [
          { path: "", label: "Select an Actor above to scan..." },
        ];
      }
    }

    let resourceTriggers = sourceTriggers.resources || [];
    let chatTriggers = sourceTriggers.chat || [];
    let conditionTriggers = Array.isArray(sourceTriggers.conditions)
      ? sourceTriggers.conditions
      : [];
    chatTriggers = chatTriggers.map((t) => {
      const copy = { ...t };
      if (!copy.trigger) copy.trigger = "keyword";

      const isDiceLogic = [
        "diceCheck",
        "midiAttack",
        "midiDamage",
        "midiCrit",
      ].includes(copy.trigger);
      if (isDiceLogic) {
        copy.diceValue = copy.value;
        copy.diceKeyword = copy.keyword;
      }
      return copy;
    });

    let tStart = sourceTriggers.turnStart;
    let tEnd = sourceTriggers.turnEnd;

    if (!Array.isArray(tStart)) {
      if (sourceTriggers.turnStartPreset) {
        tStart = [
          {
            presetId: sourceTriggers.turnStartPreset,
            round: sourceTriggers.turnStartRound || "",
          },
        ];
      } else {
        tStart = [];
      }
    }

    if (!Array.isArray(tEnd)) {
      if (sourceTriggers.turnEndPreset) {
        tEnd = [
          {
            presetId: sourceTriggers.turnEndPreset,
            round: sourceTriggers.turnEndRound || "",
          },
        ];
      } else {
        tEnd = [];
      }
    }

    triggersContext = {
      turnStart: tStart,
      turnEnd: tEnd,

      defaultSpellPreset: sourceTriggers.defaultSpellPreset || "",
      resources: resourceTriggers,
      chat: chatTriggers,
      conditions: conditionTriggers,
    };

    const themeOptions = THEME_LIST.map((t) => ({
      id: t.id,
      label: t.label,
      selected: t.id === theme,
    }));

    const screenMoodConfig = normalizeScreenMoodConfig(data);
    const screenMoodOptions = SCREEN_MOOD_OPTIONS.map((option) => ({
      ...option,
      selected: option.id === screenMoodConfig.screenMood,
    }));

    const cinematicEffectConfig = normalizeCinematicEffectConfig(data);
    const cinematicEffectGroups = CINEMATIC_EFFECT_GROUPS.map((group) => ({
      ...group,
      options: group.options.map((option) => ({
        ...option,
        selected: option.id === cinematicEffectConfig.cinematicEffect,
      })),
    }));
    const cinematicEffectStrengthOptions =
      CINEMATIC_EFFECT_STRENGTH_OPTIONS.map((option) => ({
        ...option,
        selected: option.id === cinematicEffectConfig.cinematicEffectStrength,
      }));

    let triggerOnRoundStart = false;
    let triggerOnCombatStart = false;
    let triggerOnCombatEnd = false;
    let foundrySceneOptions = [];

    if (this.scenePresetId) {
      triggerOnRoundStart = data.triggerOnRoundStart ?? false;
      triggerOnCombatStart = data.triggerOnCombatStart ?? false;
      triggerOnCombatEnd = data.triggerOnCombatEnd ?? false;

      const targetSceneIds = new Set(
        normalizeSceneTargetIds(data.targetSceneIds),
      );
      foundrySceneOptions = Array.from(game.scenes || [])
        .map((scene) => ({
          id: scene.id,
          name: scene.name,
          selected: targetSceneIds.has(scene.id),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));
    }

    const textOffsetMode = ["legacy", "independent"].includes(
      data.textOffsetMode,
    )
      ? data.textOffsetMode
      : isFreshActorConfig
        ? "independent"
        : "legacy";
    const characterImageSource = resolveCharacterImageSource({
      imageSource: data.characterImageSource,
      presetImage: data.img,
    });

    return {
      isActorMode: !!this.actorUuid,
      isGlobalMode: !!this.globalPresetId,
      isSceneMode: !!this.scenePresetId,
      supportsActorContext: !!this.actorUuid || !!this.globalPresetId,

      isMidiActive: game.modules.get("midi-qol")?.active,

      supportsSystemHooks: ["dnd5e", "pf2e", "pf1"].includes(game.system.id),
      isPF2e: game.system.id === "pf2e",

      conditionOptions: this._getConditionOptions(),

      themeOptions: themeOptions,
      screenMoodOptions,
      cinematicEffectNoneOption: {
        ...CINEMATIC_EFFECT_NONE_OPTION,
        selected:
          cinematicEffectConfig.cinematicEffect ===
          CINEMATIC_EFFECT_NONE_OPTION.id,
      },
      cinematicEffectGroups,
      cinematicEffectStrengthOptions,
      img: data.img,
      actorImagePreview,
      characterImageSource,
      useActorImage: characterImageSource === CHARACTER_IMAGE_SOURCE.ACTOR,
      text: data.text || "Cinematic!",
      subText: data.subText || "CRITICAL ART",

      hideMainText: hideMainText,
      hideSubText: hideSubText,
      preserveMainTextCase: preserveMainTextCase,

      theme: theme,
      format: format,
      hideBackground: data.hideBackground ?? false,
      hideCharacter: data.hideCharacter ?? false,

      fontFamily: data.fontFamily || "Teko",
      fontBold: data.fontBold ?? true,
      fontItalic: data.fontItalic ?? false,
      subFontFamily: data.subFontFamily || data.fontFamily || "Teko",
      subFontBold: data.subFontBold ?? true,
      subFontItalic: data.subFontItalic ?? false,
      mainFontSize: data.mainFontSize ?? 8,
      subFontSize: data.subFontSize ?? 2,
      fontList: fontList,

      color: data.color || "#e61c34",
      soundList: soundList,
      sfxList: sfxList,

      mainTextColor: data.mainTextColor || defaults.main,
      subTextColor: data.subTextColor || defaults.sub,

      borderColor: data.borderColor || "#ffffff",
      borderWidth: data.borderWidth ?? 0,
      charShadowColor: data.charShadowColor || "#000000",
      hideCharShadow: data.hideCharShadow ?? false,

      mainOffsetX: data.mainOffsetX ?? 0,
      mainOffsetY: data.mainOffsetY ?? 0,
      subOffsetX: data.subOffsetX ?? 0,
      subOffsetY: data.subOffsetY ?? 0,
      textOffsetMode,
      isLegacyTextOffset: textOffsetMode === "legacy",

      charScale: data.charScale ?? 1.0,
      charOffsetX: data.charOffsetX ?? 0,
      charOffsetY: data.charOffsetY ?? 0,
      charRotation,
      charMirror,

      screenMood: screenMoodConfig.screenMood,
      screenMoodOpacity: screenMoodConfig.screenMoodOpacity,
      cinematicEffect: cinematicEffectConfig.cinematicEffect,
      cinematicEffectStrength: cinematicEffectConfig.cinematicEffectStrength,
      cinematicEffectOffsetX: cinematicEffectConfig.cinematicEffectOffsetX,
      cinematicEffectOffsetY: cinematicEffectConfig.cinematicEffectOffsetY,
      cinematicEffectScale: cinematicEffectConfig.cinematicEffectScale,

      screenPos: screenPos,
      screenPosX: screenPosX,

      customDuration: customDuration,

      layers: layers,
      uiLayers: uiLayers,

      presets: actorPresetList,
      globalPresets: globalList,
      triggerPresetOptions,
      actorGroups: actorGroups,
      actorGroupId,
      hasActorGroupDefaultFallback,
      hasActorGroupInheritedTriggers,
      hasVisibleInheritedGroupTriggers,
      inheritedGroupTriggerRows,
      inheritGroupTriggers,
      actorGroupFallbackHint,
      actorGroupTriggerHint,
      groupFallbackSelectLabel,
      groupTriggerSelectLabel,

      document: actor,
      variations: variations,
      shakeIntensity: data.shakeIntensity ?? 0,
      dimIntensity: data.dimIntensity ?? 0,
      soundVolume: data.soundVolume ?? 80,
      sfxVolume: data.sfxVolume ?? 80,
      keepAudioPlaying: data.keepAudioPlaying ?? false,
      audioOnly: data.audioOnly ?? false,
      localOnly: data.localOnly ?? false,
      videoLoop: data.videoLoop ?? true,
      videoAudio: data.videoAudio ?? false,

      triggers: triggersContext,
      macroList: macroList,
      availableAttributes: trackableAttrs,

      allActors: allActors,
      referenceActorId: this.referenceActorId,

      presetName: this._presetNameDraft ?? data.name ?? data.presetName ?? "",
      triggerOnRoundStart,
      triggerOnCombatStart,
      triggerOnCombatEnd,
      foundrySceneOptions,
      hasFoundryScenes: foundrySceneOptions.length > 0,
    };
  }

  async render(options) {
    const panel = this.element?.querySelector(".config-panel");
    if (panel) {
      this._savedScrollTop = panel.scrollTop;
    }
    return super.render(options);
  }

  _onRender(context, options) {
    super._onRender(context, options);

    const presetNameInput = this.element.querySelector("#preset-name");
    if (presetNameInput) {
      presetNameInput.addEventListener("input", () => {
        this._presetNameDraft = presetNameInput.value;
      });
    }

    const imageSourceSelect = this.element.querySelector(
      'select[name="characterImageSource"]',
    );
    const imagePathGroup = this.element.querySelector(".character-image-path");
    if (imageSourceSelect && imagePathGroup) {
      const syncImageSourceUI = (updatePreview = true) => {
        const useActorImage =
          imageSourceSelect.value === CHARACTER_IMAGE_SOURCE.ACTOR;
        const picker = imagePathGroup.querySelector('file-picker[name="img"]');

        imagePathGroup.classList.toggle("is-actor-image-source", useActorImage);
        if (picker) {
          picker.setAttribute("aria-disabled", String(useActorImage));
          if (useActorImage) picker.setAttribute("tabindex", "-1");
          else picker.removeAttribute("tabindex");
        }

        if (updatePreview) this._updatePreviewStyles();
      };

      imageSourceSelect.addEventListener("change", () =>
        syncImageSourceUI(true),
      );
      syncImageSourceUI(false);
    }

    if (this.globalPresetId) {
      const groupFields = this.element.querySelectorAll(
        'input[name^="groupName."], select[name^="groupDefault."]',
      );
      const syncEditingGroups = () => {
        const formData = new foundry.applications.ux.FormDataExtended(
          this.element,
        ).object;
        this._editingGroups = this._getActorGroupsFromForm(formData);
      };

      for (const field of groupFields) {
        field.addEventListener("input", syncEditingGroups);
        field.addEventListener("change", syncEditingGroups);
      }
    }

    // [1] Restore Scroll Position (if saved)
    if (this._savedScrollTop) {
      const panel = this.element.querySelector(".config-panel");
      if (panel) {
        panel.scrollTop = this._savedScrollTop;
      }
    }

    this._updatePreviewStyles();
    this._startPreviewLoop();
    this._initPreviewInteraction();

    const themeSelect = this.element.querySelector('select[name="theme"]');
    if (themeSelect) {
      this._lastTheme = themeSelect.value;
      this._updateFormatUI(this._lastTheme);
      themeSelect.addEventListener("change", (e) => this._onThemeChange(e));
    }

    // [2] Live Preview Update (Input events)
    this.element.addEventListener("input", (e) => {
      if (e.target.id === "preset-name" || e.target.id === "preset-select")
        return;
      this._updatePreviewStyles();
    });

    this.element.querySelectorAll(".font-toggle").forEach((label) => {
      label.addEventListener("click", () => {
        requestAnimationFrame(() => {
          label.classList.toggle(
            "active",
            label.querySelector("input")?.checked,
          );
          this._updatePreviewStyles();
        });
      });
    });

    this.element.addEventListener("change", (event) => {
      const target = event.target;

      if (
        target.tagName === "FILE-PICKER" &&
        target.name &&
        target.name.includes("layers") &&
        target.name.includes("src")
      ) {
        const row = target.closest(".layer-row");
        const thumbContainer = row
          ? row.querySelector(".layer-thumb-container")
          : null;

        if (thumbContainer) {
          const newSrc = target.value;
          if (!newSrc) {
            thumbContainer.innerHTML = `<i class="fas fa-image" style="color:#555;"></i>`;
            return;
          }

          const isVideo = newSrc.match(/\.(webm|mp4|m4v|ogg|ogv)$/i);

          if (isVideo) {
            thumbContainer.innerHTML = `<video src="${newSrc}" autoplay loop muted></video>`;
          } else {
            thumbContainer.innerHTML = `<img src="${newSrc}">`;
          }
        }
      }
    });

    // [3] Z-Index Change Handler (Save + Render + Scroll Preserve)
    const zInputs = this.element.querySelectorAll("input[name*='.zIndex']");
    zInputs.forEach((input) => {
      input.addEventListener("change", async (e) => {
        e.stopPropagation();

        // (A) Save Scroll Position
        const panel = this.element.querySelector(".config-panel");
        if (panel) this._savedScrollTop = panel.scrollTop;

        // (B) Collect Data
        const formData = new foundry.applications.ux.FormDataExtended(
          this.element,
        ).object;

        // Helper methods to reconstruct arrays
        const soundStr = this._getSoundStringFromForm(formData, "sound");
        const sfxStr = this._getSoundStringFromForm(formData, "sfx");
        const variations = this._getVariationsFromForm(formData);
        const layers = this._getLayersFromForm(formData);

        const resourceTriggers = this._getResourceTriggersFromForm(formData);
        const chatTriggers = this._getChatTriggersFromForm(formData);
        const conditionTriggers = this._getConditionTriggersFromForm(formData);
        const turnStartTriggers = this._getTurnTriggersFromForm(
          formData,
          "turnStart",
        );
        const turnEndTriggers = this._getTurnTriggersFromForm(
          formData,
          "turnEnd",
        );
        const triggersData = {
          turnStartPreset: null,
          turnEndPreset: null,
          turnStartRound: null,
          turnEndRound: null,
          defaultSpellPreset: formData["triggers.defaultSpellPreset"],
          resources: resourceTriggers,
          chat: chatTriggers,
          conditions: conditionTriggers,
          turnStart: turnStartTriggers,
          turnEnd: turnEndTriggers,
        };

        // Build Final Save Data
        const saveData = {
          ...formData,
          sound: soundStr,
          sfx: sfxStr,
          variations: variations,
          layers: layers,
        };

        if (this.actorUuid) {
          const actor = await fromUuid(this.actorUuid);
          saveData.inheritGroupTriggers =
            formData.inheritGroupTriggers === "on" ||
            formData.inheritGroupTriggers === true;
          await actor.setFlag("cinematic-cut-ins", "triggers", triggersData);
          delete saveData.triggers;
        }

        await this._saveToCurrentTarget(saveData);

        // (D) Re-render
        this.render();
      });
    });

    this.element.addEventListener("change", (event) => {
      const target = event.target;
      if (target.name && target.name.includes(".zIndex")) return; // Skip Z-Index (handled above)

      if (
        target.tagName === "FILE-PICKER" &&
        target.name &&
        target.name.includes(".img")
      ) {
        const row =
          target.closest(".variation-row") || target.closest(".form-fields");
        if (row) {
          const thumb = row.querySelector("img");
          if (thumb) thumb.src = target.value;
        }
      }
    });

    const presetSelect = this.element.querySelector("#preset-select");
    if (presetSelect)
      presetSelect.addEventListener("change", (e) => e.stopPropagation());

    const container = this.element.querySelector(".preview-container");
    if (container) this._resizeObserver.observe(container);

    this._fitPreviewStage();

    this._windowResizeHandler = () => this._fitPreviewStage();
    window.addEventListener("resize", this._windowResizeHandler);

    // Resource Path Helper
    const pathHelpers = this.element.querySelectorAll(".resource-path-helper");
    pathHelpers.forEach((select) => {
      select.addEventListener("change", (e) => {
        const selectedValue = e.target.value;
        if (!selectedValue) return;
        const input = e.target.parentElement.querySelector(
          ".resource-path-input",
        );
        if (input) {
          input.value = selectedValue;
          input.dispatchEvent(new Event("change", { bubbles: true }));
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        e.target.value = "";
      });
    });

    const conditionHelpers = this.element.querySelectorAll(
      ".condition-id-helper",
    );
    conditionHelpers.forEach((select) => {
      select.addEventListener("change", (e) => {
        const selectedValue = e.target.value;
        if (!selectedValue) return;
        const input = e.target.parentElement.querySelector(
          ".condition-id-input",
        );
        if (input) {
          input.value = selectedValue;
          input.dispatchEvent(new Event("change", { bubbles: true }));
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        e.target.value = "";
      });
    });

    const navItems = this.element.querySelectorAll(".cinematic-tabs-nav .item");
    navItems.forEach((nav) => {
      nav.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = nav.dataset.tab;
        this._activateTab(tab);
      });
    });

    const refSelect = this.element.querySelector("#reference-actor-select");
    if (refSelect) {
      refSelect.addEventListener("change", (e) => {
        this.referenceActorId = e.target.value;
        this.render();
      });
    }

    const actorGroupSelect = this.element.querySelector(
      'select[name="groupId"]',
    );
    if (actorGroupSelect) {
      const inheritGroupTriggersToggle = this.element.querySelector(
        'input[name="inheritGroupTriggers"]',
      );
      const updateGroupFallbackUI = () => {
        const selectedOption =
          actorGroupSelect.options[actorGroupSelect.selectedIndex];
        const groupName = selectedOption?.dataset?.groupName || "";
        const presetName = selectedOption?.dataset?.defaultPreset || "";
        const hasFallback = !!groupName && !!presetName;
        const inheritanceEnabled = inheritGroupTriggersToggle
          ? inheritGroupTriggersToggle.checked
          : true;
        const hasInheritedTriggers =
          inheritanceEnabled && selectedOption?.dataset?.hasTriggers === "true";

        const fallbackHint = hasFallback
          ? game.i18n.format("CINEMATIC.Trigger.Hint.GroupFallback", {
              group: groupName,
              preset: presetName,
            })
          : "";
        const triggerHint =
          hasFallback && hasInheritedTriggers
            ? game.i18n.format("CINEMATIC.Trigger.Hint.GroupInheritance", {
                group: groupName,
                preset: presetName,
              })
            : "";

        const actorHintEl = this.element.querySelector(
          "#actor-group-fallback-hint",
        );
        if (actorHintEl) {
          actorHintEl.textContent = fallbackHint;
          actorHintEl.style.display = hasFallback ? "block" : "none";
        }

        const triggerHintEl = this.element.querySelector(
          "#trigger-group-fallback-hint",
        );
        if (triggerHintEl) {
          const span = triggerHintEl.querySelector("span");
          if (span) span.textContent = fallbackHint;
          triggerHintEl.style.display = hasFallback ? "block" : "none";
        }

        const triggerInheritanceHintEl = this.element.querySelector(
          "#trigger-group-inheritance-hint",
        );
        if (triggerInheritanceHintEl) {
          const span = triggerInheritanceHintEl.querySelector("span");
          if (span) span.textContent = triggerHint;
          triggerInheritanceHintEl.style.display = triggerHint
            ? "block"
            : "none";
        }

        const inheritedListEl = this.element.querySelector(
          "#inherited-group-trigger-list",
        );
        if (inheritedListEl) {
          const listMatchesSelectedGroup =
            inheritedListEl.dataset.groupId === actorGroupSelect.value;
          inheritedListEl.style.display =
            hasInheritedTriggers && listMatchesSelectedGroup ? "block" : "none";
        }

        const emptyLabel = hasFallback
          ? game.i18n.format("CINEMATIC.Trigger.SelectPresetAuto", {
              preset: presetName,
            })
          : `-- ${game.i18n.localize("CINEMATIC.Trigger.SelectPreset")} --`;

        this.element
          .querySelectorAll(".group-fallback-empty-option")
          .forEach((opt) => {
            opt.textContent = emptyLabel;
          });
      };

      actorGroupSelect.addEventListener("change", updateGroupFallbackUI);
      if (inheritGroupTriggersToggle)
        inheritGroupTriggersToggle.addEventListener(
          "change",
          updateGroupFallbackUI,
        );
      updateGroupFallbackUI();
    }

    // Chat Trigger UI
    this.element.querySelectorAll(".trigger-row").forEach((row) => {
      const select = row.querySelector(".trigger-type-select");
      const generalInput = row.querySelector(".input-general");
      const diceDetail = row.querySelector(".input-dice-detail");
      const diceValueInput = row.querySelector(".input-dice-val");
      const diceKeywordInput = row.querySelector("input[name*='.diceKeyword']");

      if (!select) return;

      const updateState = () => {
        const type = select.value;
        if (generalInput) {
          generalInput.style.display = "none";
          generalInput.disabled = true;
        }
        if (diceDetail) diceDetail.style.display = "none";
        if (diceValueInput) diceValueInput.disabled = true;
        if (diceKeywordInput) diceKeywordInput.disabled = true;

        if (type === "pf2eCriticalSuccess") {
          return;
        } else if (type === "midiCrit") {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = false;
            generalInput.type = "text";
            generalInput.placeholder = "Item Name Filter (Optional)";
            if (generalInput.value === "0") generalInput.value = "";
          }
        } else if (["diceCheck", "midiAttack", "midiDamage"].includes(type)) {
          if (diceDetail) diceDetail.style.display = "flex";
          if (diceValueInput) diceValueInput.disabled = false;
          if (diceKeywordInput) {
            diceKeywordInput.disabled = false;
            diceKeywordInput.placeholder = "Item Name";
          }
        } else if (type === "formula") {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = false;
            generalInput.placeholder = "e.g. d[0] == d[1] && t >= 10";
          }
        } else {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = false;
            generalInput.placeholder = "Search Keyword";
          }
        }
      };

      select.addEventListener("change", updateState);
      updateState();
    });

    this.element.querySelectorAll(".mask-mode-select").forEach((select) => {
      select.addEventListener("change", (e) => {
        const mode = e.target.value;
        const row = e.target.closest(".layer-row");

        const shapeInput = row.querySelector(".mask-input-shape");
        const imgInput = row.querySelector(".mask-input-image");
        const dimsInput = row.querySelector(".mask-input-dims");
        const bannerWarning = row.querySelector(".banner-warning");

        if (mode === "shape") {
          if (shapeInput) shapeInput.style.display = "block";
          if (imgInput) imgInput.style.display = "none";
          if (dimsInput) dimsInput.style.display = "flex";
          if (bannerWarning) bannerWarning.style.display = "none";
        } else if (mode === "image") {
          if (shapeInput) shapeInput.style.display = "none";
          if (imgInput) imgInput.style.display = "block";
          if (dimsInput) dimsInput.style.display = "flex";
          if (bannerWarning) bannerWarning.style.display = "none";
        } else if (mode === "banner") {
          if (shapeInput) shapeInput.style.display = "none";
          if (imgInput) imgInput.style.display = "none";
          if (dimsInput) dimsInput.style.display = "none";
          if (bannerWarning) bannerWarning.style.display = "inline";
        } else {
          // None
          if (shapeInput) shapeInput.style.display = "none";
          if (imgInput) imgInput.style.display = "none";
          if (dimsInput) dimsInput.style.display = "none";
          if (bannerWarning) bannerWarning.style.display = "none";
        }
      });
    });

    this._activateTab(this._activeTab);
  }

  _activateTab(tabName) {
    this._activeTab = tabName;
    const navs = this.element.querySelectorAll(".cinematic-tabs-nav .item");
    navs.forEach((n) => {
      if (n.dataset.tab === tabName) n.classList.add("active");
      else n.classList.remove("active");
    });
    const contents = this.element.querySelectorAll(".tab-content");
    contents.forEach((c) => {
      if (c.dataset.tab === tabName) {
        c.classList.add("active");
        c.style.display = "block";
      } else {
        c.classList.remove("active");
        c.style.display = "none";
      }
    });
  }

  _updateFormatUI(theme) {
    const formatSelect = this.element.querySelector('select[name="format"]');
    if (!formatSelect) return;

    const restriction = THEME_RESTRICTIONS[theme];

    if (restriction && restriction.locked) {
      if (formatSelect.value !== restriction.default) {
        formatSelect.value = restriction.default;
        formatSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      formatSelect.disabled = true;

      formatSelect.style.opacity = "0.5";
      formatSelect.style.cursor = "not-allowed";
      formatSelect.title = "This option is fixed for the selected theme.";
    } else {
      formatSelect.disabled = false;
      formatSelect.style.opacity = "1";
      formatSelect.style.cursor = "pointer";
      formatSelect.title = "";
    }
  }
  _onThemeChange(event) {
    const newTheme = event.target.value;
    const oldTheme = this._lastTheme || "brush";

    this._updateFormatUI(newTheme);

    const oldDefaults = THEME_DEFAULTS[oldTheme] || THEME_DEFAULTS["brush"];
    const newDefaults = THEME_DEFAULTS[newTheme] || THEME_DEFAULTS["brush"];

    const mainColorInput =
      this.element.querySelector('input[name="mainTextColor"]') ||
      this.element.querySelector('color-picker[name="mainTextColor"]');
    const subColorInput =
      this.element.querySelector('input[name="subTextColor"]') ||
      this.element.querySelector('color-picker[name="subTextColor"]');

    if (mainColorInput && subColorInput) {
      const currentMain = mainColorInput.value;
      const currentSub = subColorInput.value;

      if (currentMain.toLowerCase() === oldDefaults.main.toLowerCase()) {
        mainColorInput.value = newDefaults.main;
        mainColorInput.dispatchEvent(new Event("change", { bubbles: true }));
        mainColorInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (currentSub.toLowerCase() === oldDefaults.sub.toLowerCase()) {
        subColorInput.value = newDefaults.sub;
        subColorInput.dispatchEvent(new Event("change", { bubbles: true }));
        subColorInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    const sfxInput = this.element.querySelector('input[name="sfxList.0"]');
    if (sfxInput) {
      const currentVal = sfxInput.value;
      const oldDefault = THEME_SFX_DEFAULTS[this._lastTheme];
      const newDefault = THEME_SFX_DEFAULTS[newTheme];

      if (!currentVal || currentVal === oldDefault) {
        sfxInput.value = newDefault || "";
        sfxInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    const posDefaults = THEME_POS_DEFAULTS[newTheme] || { x: 50, y: 50 };
    const xInput = this.element.querySelector('input[name="screenPosX"]');
    const yInput = this.element.querySelector('input[name="screenPos"]');
    const oldPos = THEME_POS_DEFAULTS[oldTheme] || { x: 50, y: 50 };

    if (xInput) {
      if (!xInput.value || parseInt(xInput.value) === oldPos.x) {
        xInput.value = posDefaults.x;
        xInput.dispatchEvent(new Event("change", { bubbles: true }));
        xInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    if (yInput) {
      if (!yInput.value || parseInt(yInput.value) === oldPos.y) {
        yInput.value = posDefaults.y;
        yInput.dispatchEvent(new Event("change", { bubbles: true }));
        yInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    this._lastTheme = newTheme;

    const stage = this.element.querySelector("#preview-stage");
    if (stage) {
      stage.classList.remove("paused");

      const pauseIcon = this.element.querySelector(
        'button[data-action="toggle-pause"] i',
      );
      if (pauseIcon) pauseIcon.className = "fas fa-pause";
    }

    this._updatePreviewStyles();

    this._startPreviewLoop();
  }

  async close(options) {
    if (this._windowResizeHandler) {
      window.removeEventListener("resize", this._windowResizeHandler);
    }

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._previewTimer) clearTimeout(this._previewTimer);
    return super.close(options);
  }

  _previewLayerTimers = [];
}

import * as Preview from "./config/preview.js";
import * as Actions from "./config/actions.js";

Object.assign(CinematicConfig.prototype, Preview, Actions);
