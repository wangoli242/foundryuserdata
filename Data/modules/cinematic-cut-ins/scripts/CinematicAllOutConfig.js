import { CutinManager } from "./CutinManager.js";
import { exportPreset, importPreset } from "./preset-export.js";
import {
  clonePanels,
  createFullScreenPanels,
  MAX_MANUAL_CUTS,
  pointInPolygon,
  polygonCentroid,
  sanitizeManualPanels,
  sharedEdgesBetweenPanels,
  splitPolygonByLine,
} from "./manual-panel-geometry.js";
import {
  MANUAL_CUT_LINE_VIEWBOX,
  appendManualCutLine,
} from "./manual-panel-line-renderer.js";
import {
  SCREEN_MOOD_OPTIONS,
  normalizeScreenMoodConfig,
  applyScreenMoodElement,
} from "./screen-mood.js";
import {
  CINEMATIC_EFFECT_GROUPS,
  CINEMATIC_EFFECT_NONE_OPTION,
  CINEMATIC_EFFECT_STRENGTH_OPTIONS,
  normalizeCinematicEffectConfig,
  applyCinematicEffectElements,
  clearCinematicEffectElements,
} from "./cinematic-effects.js";
import {
  DEFAULT_MANUAL_LINE_STYLE,
  MAX_MANUAL_LINE_WIDTH,
  MIN_MANUAL_LINE_WIDTH,
  getManualLineStyleDefaultWidth,
  getManualLineStyleOptions,
  sanitizeManualLineColor,
  sanitizeManualLineStyle,
  sanitizeManualLineWidth,
} from "./manual-panel-line-styles.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const THEME_CONFIG = {
  rebel: { label: "Rebel", type: "shatter" },
  comic: { label: "Comic", type: "shatter" },
  urban: { label: "Urban", type: "shatter" },
  noir: { label: "Noir (Monochrome)", type: "shatter" },
  wanted: { label: "Wanted (Mugshot)", type: "shatter" },
  slice: { label: "Classic Slice", type: "diagonal" },
  arcane: { label: "Arcane (Fantasy)", type: "diagonal" },
  legion: { label: "Legion (Sci-Fi/Tactical)", type: "full" },
  dragon: { label: "Dragon (Epic)", type: "shatter" },
  horizon: { label: "Horizon (Widescreen)", type: "horizontal" },
};

const THEME_CENTER_DEFAULTS = {
  rebel: {
    main: "#ffffff",
    mainShadow: "#000000",
    sub: "#ffffff",
    subShadow: "#000000",
  },
  comic: {
    main: "#ffe600",
    mainShadow: "#000000",
    sub: "#ffe600",
    subShadow: "#000000",
  },
  urban: {
    main: "#00d2ff",
    mainShadow: "#00d2ff",
    sub: "#ffffff",
    subShadow: "#ffffff",
  },
  noir: {
    main: "#ffffff",
    mainShadow: "#000000",
    sub: "#ffffff",
    subShadow: "#ffffff",
  },
  wanted: {
    main: "#ff7b00",
    mainShadow: "#000000",
    sub: "#000000",
    subShadow: "#000000",
  },
  slice: {
    main: "#ffffff",
    mainShadow: "#e61c34",
    sub: "#ffffff",
    subShadow: "#000000",
  },
  arcane: {
    main: "#fdfbd4",
    mainShadow: "#d4af37",
    sub: "#d4af37",
    subShadow: "#000000",
  },
  legion: {
    main: "#00ffcc",
    mainShadow: "#003322",
    sub: "#000000",
    subShadow: "#00ffcc",
  },
  dragon: {
    main: "#fdfbd4",
    mainShadow: "#8b0000",
    sub: "#d4af37",
    subShadow: "#0a0505",
  },
  horizon: {
    main: "#ffffff",
    mainShadow: "#000000",
    sub: "#ffffff",
    subShadow: "#000000",
  },
};

const THEME_SOUND_CONFIG = {
  rebel: {
    char: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_wanted.mp3",
  },
  comic: {
    char: "modules/cinematic-cut-ins/sounds/char_comic.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_wanted.mp3",
  },
  urban: {
    char: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  },
  noir: {
    char: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_wanted.mp3",
  },
  wanted: {
    char: "modules/cinematic-cut-ins/sounds/sfx_wanted.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_wanted.mp3",
  },
  slice: {
    char: "modules/cinematic-cut-ins/sounds/char_slice.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_slice.mp3",
  },
  arcane: {
    char: "modules/cinematic-cut-ins/sounds/sfx_arcane.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_arcane.mp3",
  },
  legion: {
    char: "modules/cinematic-cut-ins/sounds/sfx_cyber.mp3",
    finish: "modules/cinematic-cut-ins/sounds/sfx_impact.mp3",
  },
  dragon: {
    char: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
    finish: "modules/cinematic-cut-ins/sounds/sfx_tribal.mp3",
  },
  horizon: {
    char: "modules/cinematic-cut-ins/sounds/char_urban.mp3",
    finish: "modules/cinematic-cut-ins/sounds/finish_urban.mp3",
  },
};

const THEME_COLORS = {
  rebel: "#e61c34",
  comic: "#ffe600",
  urban: "#00d2ff",
  noir: "#ffffff",
  wanted: "#ff7b00",
  slice: "#e61c34",
  arcane: "#00d2ff",
  legion: "#00ffcc",
  dragon: "#8b0000",
  horizon: "#e61c34",
};

const READY_TRANSFORM_NUMERIC_FIELDS = [
  "readyZoom",
  "readyZoomX",
  "readyZoomY",
  "readyScale",
  "readyX",
  "readyY",
  "readyRotation",
];
const READY_TRANSFORM_FIELDS = [
  ...READY_TRANSFORM_NUMERIC_FIELDS,
  "readyMirror",
];

const hasSubmittedValue = (value) =>
  value !== undefined && value !== null && value !== "";
const isTruthyFormValue = (value) =>
  value === true || value === "true" || value === "on" || value === "1";
const numberOrFallback = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};
const hasReadyTransformData = (data) =>
  !!data &&
  (isTruthyFormValue(data.readyTransformEnabled) ||
    READY_TRANSFORM_FIELDS.some((key) => data[key] !== undefined));

export class CinematicAllOutConfig extends HandlebarsApplicationMixin(
  ApplicationV2,
) {
  constructor(options = {}) {
    super(options);
    this.actors = options.actors || [];
    this.initialPresetId = options.initialPresetId || null;

    this._previewTimer = null;
    this._pendingPreset = null;
    this._lastTheme = "rebel";
    this._savedSidebarScrollTop = 0;
    this._didInitThemeDefaults = false;

    this._manualSelectedIndex = null;
    this._manualDragStart = null;
    this._manualDragCurrent = null;
    this._manualUndoStack = [];
    this._manualGuidesHidden = false;

    this._activeTab = "setup";
  }

  static ALLOUT_TABS = ["setup", "panels", "text", "actors", "layers"];

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: ["cinematic-config", "all-out-config"],
    window: {
      title: "All-Out Attack Configuration",
      icon: "fas fa-meteor",
      resizable: true,
      width: 1000,
      height: 750,
    },
    position: { width: 1000, height: 750 },
    actions: {
      play: CinematicAllOutConfig.prototype._onPlay,
      removeRow: CinematicAllOutConfig.prototype._onRemoveRow,
      addParticipant: CinematicAllOutConfig.prototype._onAddParticipant,
      addGlobalLayer: CinematicAllOutConfig.prototype._onAddGlobalLayer,
      removeGlobalLayer: CinematicAllOutConfig.prototype._onRemoveGlobalLayer,
      savePreset: CinematicAllOutConfig.prototype._onSavePreset,
      loadPreset: CinematicAllOutConfig.prototype._onLoadPreset,
      deletePreset: CinematicAllOutConfig.prototype._onDeletePreset,
      test: CinematicAllOutConfig.prototype._onTest,
      "toggle-pause": CinematicAllOutConfig.prototype._onTogglePreviewPause,
      exportPreset: CinematicAllOutConfig.prototype._onExportPreset,
      importPreset: CinematicAllOutConfig.prototype._onImportPreset,
      initManualPanels: CinematicAllOutConfig.prototype._onInitManualPanels,
      resetManualPanels: CinematicAllOutConfig.prototype._onResetManualPanels,
      undoManualPanelSplit:
        CinematicAllOutConfig.prototype._onUndoManualPanelSplit,
    },
  };

  static PARTS = {
    content: {
      template: "modules/cinematic-cut-ins/templates/all-out-config.hbs",
    },
  };

  async _prepareContext(options) {
    if (this.initialPresetId) {
      const presets =
        game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
      const data = presets[this.initialPresetId];
      if (data) {
        this._pendingPreset = data;
        this.initialPresetId = null;
      }
    }
    const presetsMap =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const presetsList = Object.entries(presetsMap)
      .map(([id, data]) => ({
        id,
        name: data.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    let formData = {};
    if (
      this.element &&
      this.element.querySelector &&
      this.element.querySelector("input")
    ) {
      try {
        formData = new foundry.applications.ux.FormDataExtended(this.element)
          .object;
      } catch (e) {
        formData = {};
      }
    }

    const currentGlobalLayers = this._getGlobalLayersFromForm(formData);

    const pendingGlobal = this._pendingPreset ? this._pendingPreset : {};
    const globalLayers =
      pendingGlobal.globalLayers || currentGlobalLayers || [];
    const uiGlobalLayers = (globalLayers || [])
      .map((layer, index) => ({
        originalIndex: index,
        data: {
          src: layer.src || "",
          zIndex: Number(layer.zIndex ?? 20),
          blend: layer.blend || "normal",
          opacity: Number(layer.opacity ?? 1),
          scale: Number(layer.scale ?? 1),
          x: Number(layer.x ?? 0),
          y: Number(layer.y ?? 0),
          rotation: Number(layer.rotation ?? 0),
          mirror: !!layer.mirror,
          loop: layer.loop !== false,
          delay: Number(layer.delay ?? 0),
          maskMode: layer.maskMode || "none",
          maskShape: layer.maskShape || "circle",
          maskSrc: layer.maskSrc || "",
          maskSize: Number(layer.maskSize ?? 100),
          maskX: Number(layer.maskX ?? 50),
          maskY: Number(layer.maskY ?? 50),
        },
      }))
      .sort(
        (a, b) => (Number(b.data.zIndex) || 0) - (Number(a.data.zIndex) || 0),
      );

    const uiAllOutLayers = [
      { isSystem: true, label: "TEXT & UI", z: 100 },
      { isSystem: true, label: "CHARACTER", z: 50 },
      { isSystem: true, label: "SLICE BACKGROUND", z: 10 },
      ...uiGlobalLayers.map((layer) => ({
        isSystem: false,
        originalIndex: layer.originalIndex,
        data: layer.data,
        z: Number(layer.data.zIndex) || 0,
      })),
    ].sort((a, b) => (Number(b.z) || 0) - (Number(a.z) || 0));
    const currentTheme = pendingGlobal.theme || formData.theme || "rebel";
    this._lastTheme = currentTheme;

    const showNames = pendingGlobal.showNames ?? formData.showNames ?? false;

    const hasPendingPreset = !!this._pendingPreset;
    const rawPanelMode = hasPendingPreset
      ? (pendingGlobal.panelMode ?? "theme")
      : (formData.panelMode ?? "theme");
    const panelMode = rawPanelMode === "manual" ? "manual" : "theme";
    const manualPanelsRaw = hasPendingPreset
      ? pendingGlobal.manualPanels
      : this._parseManualPanelsFormValue(formData.manualPanels);
    const sanitizedManualPanels = this._sanitizeManualPanels(manualPanelsRaw);
    const manualPanelsJson = sanitizedManualPanels
      ? JSON.stringify(sanitizedManualPanels)
      : "";
    const rawManualLineStyle = hasPendingPreset
      ? pendingGlobal.manualLineStyle
      : formData.manualLineStyle;
    const manualLineStyle = sanitizeManualLineStyle(rawManualLineStyle);
    const rawManualLineWidth = hasPendingPreset
      ? pendingGlobal.manualLineWidth
      : formData.manualLineWidth;
    const manualLineWidth = this._sanitizeManualLineWidth(
      rawManualLineWidth,
      manualLineStyle,
    );
    const manualLineTint = isTruthyFormValue(
      hasPendingPreset ? pendingGlobal.manualLineTint : formData.manualLineTint,
    );
    const manualLineColor = sanitizeManualLineColor(
      hasPendingPreset
        ? pendingGlobal.manualLineColor
        : formData.manualLineColor,
    );
    const manualLineGlow = isTruthyFormValue(
      hasPendingPreset ? pendingGlobal.manualLineGlow : formData.manualLineGlow,
    );

    const defaultColor = THEME_COLORS[currentTheme] || THEME_COLORS["rebel"];

    // Main Text Defaults
    const centerMainColor =
      pendingGlobal.centerMainColor || formData.centerMainColor || "#ffffff";
    const centerMainShadow =
      pendingGlobal.centerMainShadow || formData.centerMainShadow || "#000000";
    const centerMainSize =
      pendingGlobal.centerMainSize ?? formData.centerMainSize ?? 10; // rem
    const centerMainX = pendingGlobal.centerMainX ?? formData.centerMainX ?? 0;
    const centerMainY = pendingGlobal.centerMainY ?? formData.centerMainY ?? 0;

    // Sub Text Defaults
    const centerSubColor =
      pendingGlobal.centerSubColor || formData.centerSubColor || "#ffffff";
    const centerSubShadow =
      pendingGlobal.centerSubShadow || formData.centerSubShadow || "#000000";
    const centerSubSize =
      pendingGlobal.centerSubSize ?? formData.centerSubSize ?? 3; // rem
    const centerSubX = pendingGlobal.centerSubX ?? formData.centerSubX ?? 0;
    const centerSubY = pendingGlobal.centerSubY ?? formData.centerSubY ?? 0;

    const themeList = Object.entries(THEME_CONFIG).map(([key, conf]) => ({
      id: key,
      label: conf.label,
      selected: key === currentTheme,
    }));

    // Group-wide screen mood + cinematic effect selectors (mirror personal config).
    const moodEffectSource = {
      screenMood: pendingGlobal.screenMood ?? formData.screenMood,
      screenMoodOpacity:
        pendingGlobal.screenMoodOpacity ?? formData.screenMoodOpacity,
      cinematicEffect:
        pendingGlobal.cinematicEffect ?? formData.cinematicEffect,
      cinematicEffectStrength:
        pendingGlobal.cinematicEffectStrength ??
        formData.cinematicEffectStrength,
      cinematicEffectOffsetX:
        pendingGlobal.cinematicEffectOffsetX ?? formData.cinematicEffectOffsetX,
      cinematicEffectOffsetY:
        pendingGlobal.cinematicEffectOffsetY ?? formData.cinematicEffectOffsetY,
      cinematicEffectScale:
        pendingGlobal.cinematicEffectScale ?? formData.cinematicEffectScale,
    };
    const groupScreenMoodConfig = normalizeScreenMoodConfig(moodEffectSource);
    const groupScreenMoodOptions = SCREEN_MOOD_OPTIONS.map((option) => ({
      ...option,
      selected: option.id === groupScreenMoodConfig.screenMood,
    }));
    const groupEffectConfig = normalizeCinematicEffectConfig(moodEffectSource);
    const groupCinematicEffectGroups = CINEMATIC_EFFECT_GROUPS.map((group) => ({
      ...group,
      options: group.options.map((option) => ({
        ...option,
        selected: option.id === groupEffectConfig.cinematicEffect,
      })),
    }));
    const groupCinematicEffectStrengthOptions =
      CINEMATIC_EFFECT_STRENGTH_OPTIONS.map((option) => ({
        ...option,
        selected: option.id === groupEffectConfig.cinematicEffectStrength,
      }));

    const context = {
      presets: presetsList,
      theme: currentTheme,
      showNames: showNames,
      themeList: themeList,
      screenMoodOptions: groupScreenMoodOptions,
      screenMoodOpacity: groupScreenMoodConfig.screenMoodOpacity,
      cinematicEffectNoneOption: {
        ...CINEMATIC_EFFECT_NONE_OPTION,
        selected:
          groupEffectConfig.cinematicEffect === CINEMATIC_EFFECT_NONE_OPTION.id,
      },
      cinematicEffectGroups: groupCinematicEffectGroups,
      cinematicEffectStrengthOptions: groupCinematicEffectStrengthOptions,
      cinematicEffectOffsetX: groupEffectConfig.cinematicEffectOffsetX,
      cinematicEffectOffsetY: groupEffectConfig.cinematicEffectOffsetY,
      cinematicEffectScale: groupEffectConfig.cinematicEffectScale,
      panelMode: panelMode,
      manualPanelsJson: manualPanelsJson,
      manualLineStyle: manualLineStyle,
      manualLineStyleOptions: getManualLineStyleOptions(manualLineStyle),
      manualLineWidth: manualLineWidth,
      manualLineWidthMin: MIN_MANUAL_LINE_WIDTH,
      manualLineWidthMax: MAX_MANUAL_LINE_WIDTH,
      manualLineTint: manualLineTint,
      manualLineColor: manualLineColor,
      manualLineGlow: manualLineGlow,
      panelModeOptions: [
        { id: "theme", selected: panelMode === "theme" },
        { id: "manual", selected: panelMode === "manual" },
      ],
      sound: pendingGlobal.sound || formData.sound || "",
      sfx: pendingGlobal.sfx || formData.sfx || "",

      finishSound: pendingGlobal.finishSound || formData.finishSound || "",
      shakeIntensity:
        pendingGlobal.shakeIntensity ?? formData.shakeIntensity ?? 0,

      centerMainText:
        pendingGlobal.centerMainText ||
        formData.centerMainText ||
        "ALL-OUT ATTACK",
      centerSubText:
        pendingGlobal.centerSubText ||
        formData.centerSubText ||
        "TIME TO FINISH IT!",

      centerMainColor,
      centerMainShadow,
      centerMainSize,
      centerMainX,
      centerMainY,
      centerSubColor,
      centerSubShadow,
      centerSubSize,
      centerSubX,
      centerSubY,

      fontFamily: pendingGlobal.fontFamily || formData.fontFamily || "Teko",
      fontBold: pendingGlobal.fontBold ?? formData.fontBold ?? true,
      fontItalic: pendingGlobal.fontItalic ?? formData.fontItalic ?? false,
      subFontFamily:
        pendingGlobal.subFontFamily ||
        formData.subFontFamily ||
        pendingGlobal.fontFamily ||
        formData.fontFamily ||
        "Teko",
      subFontBold: pendingGlobal.subFontBold ?? formData.subFontBold ?? true,
      subFontItalic:
        pendingGlobal.subFontItalic ?? formData.subFontItalic ?? false,
      fontList: this._getFontList(
        pendingGlobal.fontFamily || formData.fontFamily || "Teko",
      ),
      subFontList: this._getFontList(
        pendingGlobal.subFontFamily ||
          formData.subFontFamily ||
          pendingGlobal.fontFamily ||
          formData.fontFamily ||
          "Teko",
      ),
      linkToCombat:
        pendingGlobal.linkToCombat ?? formData.linkToCombat ?? false,
      speedMultiplier:
        pendingGlobal.speedMultiplier ?? formData.speedMultiplier ?? 1.0,
      voteButtonText:
        pendingGlobal.voteButtonText || formData.voteButtonText || "",
      voteButtonSound:
        pendingGlobal.voteButtonSound ||
        formData.voteButtonSound ||
        "modules/cinematic-cut-ins/sounds/click.mp3",
      globalLayers: globalLayers,
      uiGlobalLayers: uiGlobalLayers,
      uiAllOutLayers: uiAllOutLayers,
    };

    const participants = [];
    const pendingParticipants = this._pendingPreset
      ? this._pendingPreset.participants
      : null;

    for (let i = 0; i < this.actors.length; i++) {
      const actor = this.actors[i];
      const flags = actor.getFlag("cinematic-cut-ins", "config") || {};

      const savedData =
        pendingParticipants && pendingParticipants[i]
          ? pendingParticipants[i]
          : null;
      const getVal = (key, fallback) => {
        if (savedData && savedData[key] !== undefined) return savedData[key];
        if (formData[`participant.${i}.${key}`] !== undefined)
          return formData[`participant.${i}.${key}`];
        return fallback;
      };

      const hasFormReadyTransform =
        isTruthyFormValue(formData[`participant.${i}.readyTransformEnabled`]) ||
        READY_TRANSFORM_NUMERIC_FIELDS.some((key) =>
          hasSubmittedValue(formData[`participant.${i}.${key}`]),
        ) ||
        formData[`participant.${i}.readyMirror`] !== undefined;
      const readyTransformEnabled =
        hasReadyTransformData(savedData) || hasFormReadyTransform;

      const pData = {
        index: i,
        id: actor.id,
        name: actor.name,
        img: getVal(
          "img",
          flags.img || actor.img || "icons/svg/mystery-man.svg",
        ),
        readyImg: getVal("readyImg", ""),
        readyTransformEnabled: readyTransformEnabled,
        readyTransformEnabledValue: readyTransformEnabled ? "true" : "",
        text: getVal("text", actor.name),
        color: getVal("color", defaultColor),
        textColor: getVal("textColor", "#ffffff"),
        textSize: Number(getVal("textSize", 6)) || 6,
        textX: Number(getVal("textX", 0)),
        textY: Number(getVal("textY", 0)),
        shadow: getVal("shadow", "#000000"),
        zoom: Number(getVal("zoom", 2.0)) || 2.0,
        zoomX: Number(getVal("zoomX", 0)),
        zoomY: Number(getVal("zoomY", 0)),
        scale: Number(getVal("scale", 1.0)),
        x: Number(getVal("x", 0)),
        y: Number(getVal("y", 0)),
        rotation: Number(getVal("rotation", 0)),
        mirror: getVal("mirror", false),
        readyZoom: getVal("readyZoom", ""),
        readyZoomX: getVal("readyZoomX", ""),
        readyZoomY: getVal("readyZoomY", ""),
        readyScale: getVal("readyScale", ""),
        readyX: getVal("readyX", ""),
        readyY: getVal("readyY", ""),
        readyRotation: getVal("readyRotation", ""),
        readyMirror: getVal("readyMirror", false),
        sound: getVal("sound", ""),
        sfx: getVal("sfx", ""),
        readySfx: getVal("readySfx", ""),
      };
      participants.push(pData);
    }

    context.participants = participants;
    this._pendingPreset = null;
    return context;
  }

  _getFontList(currentFont) {
    const fontSet = new Set(["Teko"]);
    const fonts = globalThis.document?.fonts;
    if (fonts?.forEach) {
      fonts.forEach((font) => {
        const family = font.family.replace(/['"]/g, "");
        if (family.length > 1) fontSet.add(family);
      });
    }
    return Array.from(fontSet)
      .map((f) => ({
        id: f,
        label: f,
        selected: f === currentFont,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  async _onRemoveRow(event, target) {
    const index = Number(target.dataset.index);

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const currentParticipants = this._extractParticipantData(formData);

    currentParticipants.splice(index, 1);
    this.actors.splice(index, 1);

    this._pendingPreset = {
      theme: formData.theme,
      showNames: formData.showNames,
      panelMode: formData.panelMode === "manual" ? "manual" : "theme",
      manualPanels: this._getManualPanelsFromForm(formData),
      manualLineStyle: this._getManualLineStyleFromForm(formData),
      manualLineWidth: this._getManualLineWidthFromForm(formData),
      manualLineTint: this._getManualLineTintFromForm(formData),
      manualLineColor: this._getManualLineColorFromForm(formData),
      manualLineGlow: this._getManualLineGlowFromForm(formData),
      centerMainText: formData.centerMainText,
      centerSubText: formData.centerSubText,
      screenMood: formData.screenMood,
      screenMoodOpacity: formData.screenMoodOpacity,
      cinematicEffect: formData.cinematicEffect,
      cinematicEffectStrength: formData.cinematicEffectStrength,
      cinematicEffectOffsetX: formData.cinematicEffectOffsetX,
      cinematicEffectOffsetY: formData.cinematicEffectOffsetY,
      cinematicEffectScale: formData.cinematicEffectScale,
      fontFamily: formData.fontFamily,
      fontBold: formData.fontBold ?? true,
      fontItalic: formData.fontItalic ?? false,
      subFontFamily: formData.subFontFamily,
      subFontBold: formData.subFontBold ?? true,
      subFontItalic: formData.subFontItalic ?? false,
      sound: formData.sound,
      sfx: formData.sfx,
      finishSound: formData.finishSound,
      shakeIntensity: Number(formData.shakeIntensity),
      linkToCombat: formData.linkToCombat,
      speedMultiplier: Number(formData.speedMultiplier) || 1.0,
      voteButtonText: formData.voteButtonText || "",
      voteButtonSound: formData.voteButtonSound || "",
      globalLayers: this._getGlobalLayersFromForm(formData),
      participants: currentParticipants,
    };

    this.render();
  }

  async _onAddParticipant(event, target) {
    const existingIds = new Set(this.actors.map((a) => a.id));
    const available = game.actors.filter((a) => !existingIds.has(a.id));
    if (!available.length) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.AllOut.Notif.NoActorsAvailable"),
      );
      return;
    }

    const sorted = available.sort((a, b) => a.name.localeCompare(b.name));
    const items = sorted
      .map((a) => {
        const type = a.hasPlayerOwner ? "character" : "npc";
        return (
          `<div class="ap-item" data-id="${a.id}" data-type="${type}" data-name="${a.name.toLowerCase()}" style="display:flex; align-items:center; gap:8px; padding:5px 8px; cursor:pointer; border-radius:4px; border:1px solid transparent;">` +
          `<img src="${a.img}" width="36" height="36" style="border-radius:4px; object-fit:cover; border:1px solid #444;">` +
          `<span style="flex:1; color:#ddd;">${a.name}</span>` +
          `<span style="font-size:0.7em; color:#666; text-transform:uppercase;">${type === "character" ? "PC" : "NPC"}</span>` +
          `</div>`
        );
      })
      .join("");

    const filterAll = game.i18n.localize("CINEMATIC.Control.Filter.All");
    const searchPh = game.i18n.localize("CINEMATIC.Control.Placeholder.Search");
    const btnStyle =
      "flex:1; padding:4px 8px; border:1px solid #555; border-radius:3px; cursor:pointer; font-size:0.85em;";

    const content = `<form autocomplete="off">
            <input type="hidden" name="actorId" value="">
            <div style="display:flex; gap:4px; margin-bottom:6px;">
                <button type="button" class="ap-filter active" data-filter="all" style="${btnStyle} background:#e61c34; color:#fff; border-color:#e61c34;">${filterAll}</button>
                <button type="button" class="ap-filter" data-filter="character" style="${btnStyle} background:#222; color:#888;"><i class="fas fa-user-alt"></i> PC</button>
                <button type="button" class="ap-filter" data-filter="npc" style="${btnStyle} background:#222; color:#888;"><i class="fas fa-dragon"></i> NPC</button>
            </div>
            <input type="text" class="ap-search" placeholder="${searchPh}" autocomplete="off" style="width:100%; margin-bottom:6px; color:#fff; padding:5px 8px; background:#222; border:1px solid #555; border-radius:3px;">
            <div class="ap-list" style="max-height:320px; overflow-y:auto; border:1px solid #444; border-radius:4px; background:#1a1a1a;">${items}</div>
        </form>`;

    let selectedId = null;
    const pickerId = foundry.utils.randomID();

    const hookId = Hooks.on("renderDialogV2", (app, html) => {
      if (!html.querySelector) html = app.element;
      const list = html.querySelector(".ap-list");
      if (!list) return;
      if (list.dataset.pickerId) return;
      list.dataset.pickerId = pickerId;
      Hooks.off("renderDialogV2", hookId);

      const applyFilters = () => {
        const activeBtn = html.querySelector(".ap-filter.active");
        const filter = activeBtn?.dataset.filter || "all";
        const query = (
          html.querySelector(".ap-search")?.value || ""
        ).toLowerCase();
        html.querySelectorAll(".ap-item").forEach((el) => {
          const matchFilter = filter === "all" || el.dataset.type === filter;
          const matchSearch = !query || el.dataset.name.includes(query);
          el.style.display = matchFilter && matchSearch ? "flex" : "none";
        });
      };

      html.querySelectorAll(".ap-filter").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          html.querySelectorAll(".ap-filter").forEach((b) => {
            b.classList.remove("active");
            Object.assign(b.style, {
              background: "#222",
              color: "#888",
              borderColor: "#555",
            });
          });
          btn.classList.add("active");
          Object.assign(btn.style, {
            background: "#e61c34",
            color: "#fff",
            borderColor: "#e61c34",
          });
          applyFilters();
        });
      });

      html.querySelector(".ap-search")?.addEventListener("input", applyFilters);

      html.querySelectorAll(".ap-item").forEach((item) => {
        item.addEventListener("click", () => {
          html.querySelectorAll(".ap-item").forEach((i) => {
            Object.assign(i.style, {
              borderColor: "transparent",
              background: "",
            });
          });
          Object.assign(item.style, {
            borderColor: "#e61c34",
            background: "rgba(230,28,52,0.15)",
          });
          selectedId = item.dataset.id;
          const hidden = html.querySelector("[name=actorId]");
          if (hidden) hidden.value = item.dataset.id;
        });
      });
    });

    const { DialogV2 } = foundry.applications.api;
    const actorId = await DialogV2.wait({
      window: {
        title: game.i18n.localize("CINEMATIC.AllOut.AddParticipant"),
        icon: "fas fa-user-plus",
      },
      content: content,
      buttons: [
        {
          action: "add",
          label: game.i18n.localize("CINEMATIC.Config.BtnAdd"),
          icon: "fas fa-plus",
          default: true,
          callback: () => selectedId,
        },
        {
          action: "cancel",
          label: "Cancel",
          icon: "fas fa-times",
          callback: () => null,
        },
      ],
      close: () => {
        Hooks.off("renderDialogV2", hookId);
        return null;
      },
    });

    if (!actorId) return;
    const actor = game.actors.get(actorId);
    if (!actor) return;

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    this.actors.push(actor);

    this._pendingPreset = {
      ...this._pendingPreset,
      ...formData,
      globalLayers: this._getGlobalLayersFromForm(formData),
      participants: this._extractParticipantData(formData),
    };

    this._saveSidebarScroll();
    this.render();
  }

  async _onSavePreset(event, target) {
    const nameInput = this.element.querySelector("#preset-name");
    const name = nameInput.value.trim();
    if (!name) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.Config.Notif.EnterName"),
      );
      return;
    }

    const currentPresets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const existingEntry = Object.entries(currentPresets).find(
      ([id, data]) => data.name === name,
    );
    let presetId = foundry.utils.randomID();

    if (existingEntry) {
      const { DialogV2 } = foundry.applications.api;

      const confirm = await DialogV2.wait({
        window: {
          title: game.i18n.localize("CINEMATIC.Config.Dialog.OverwriteTitle"),
          icon: "fas fa-meteor",
        },
        content: game.i18n.format("CINEMATIC.Config.Dialog.OverwriteGroup", {
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
      presetId = existingEntry[0];
    }

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const participantsData = this._extractParticipantData(formData);
    const globalLayers = this._getGlobalLayersFromForm(formData);
    participantsData.forEach((p, i) => {
      if (this.actors[i]) p.actorId = this.actors[i].id;
    });

    const presetData = {
      name: name,
      theme: formData.theme,
      showNames: formData.showNames,
      panelMode: formData.panelMode === "manual" ? "manual" : "theme",
      manualPanels: this._getManualPanelsFromForm(formData),
      manualLineStyle: this._getManualLineStyleFromForm(formData),
      manualLineWidth: this._getManualLineWidthFromForm(formData),
      manualLineTint: this._getManualLineTintFromForm(formData),
      manualLineColor: this._getManualLineColorFromForm(formData),
      manualLineGlow: this._getManualLineGlowFromForm(formData),
      centerMainText: formData.centerMainText,
      centerSubText: formData.centerSubText,
      screenMood: formData.screenMood,
      screenMoodOpacity: formData.screenMoodOpacity,
      cinematicEffect: formData.cinematicEffect,
      cinematicEffectStrength: formData.cinematicEffectStrength,
      cinematicEffectOffsetX: formData.cinematicEffectOffsetX,
      cinematicEffectOffsetY: formData.cinematicEffectOffsetY,
      cinematicEffectScale: formData.cinematicEffectScale,

      centerMainColor: formData.centerMainColor,
      centerMainShadow: formData.centerMainShadow,
      centerMainSize: formData.centerMainSize,
      centerMainX: formData.centerMainX,
      centerMainY: formData.centerMainY,

      centerSubColor: formData.centerSubColor,
      centerSubShadow: formData.centerSubShadow,
      centerSubSize: formData.centerSubSize,
      centerSubX: formData.centerSubX,
      centerSubY: formData.centerSubY,

      sound: formData.sound,
      sfx: formData.sfx,
      finishSound: formData.finishSound,
      fontFamily: formData.fontFamily,
      fontBold: formData.fontBold ?? true,
      fontItalic: formData.fontItalic ?? false,
      subFontFamily: formData.subFontFamily,
      subFontBold: formData.subFontBold ?? true,
      subFontItalic: formData.subFontItalic ?? false,
      globalLayers: globalLayers,
      participants: participantsData,
      shakeIntensity: Number(formData.shakeIntensity),
      linkToCombat: formData.linkToCombat,
      speedMultiplier: Number(formData.speedMultiplier) || 1.0,
      voteButtonText: formData.voteButtonText || "",
      voteButtonSound: formData.voteButtonSound || "",
    };

    currentPresets[presetId] = presetData;
    await game.user.setFlag(
      "cinematic-cut-ins",
      "allOutPresets",
      currentPresets,
    );

    ui.notifications.info(`Cinematic FX: All-Out Preset "${name}" saved.`);
    this.render();
  }

  async _onLoadPreset(event, target) {
    const select = this.element.querySelector("#preset-select");
    const presetId = select.value;
    if (!presetId) return;

    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const data = presets[presetId];
    if (!data) return;

    const newActors = [];
    if (data.participants && Array.isArray(data.participants)) {
      for (const p of data.participants) {
        const actor = game.actors.get(p.actorId);
        if (actor) newActors.push(actor);
      }
    }
    if (newActors.length === 0) {
      ui.notifications.warn("No valid actors found.");
      return;
    }
    this.actors = newActors;
    this._pendingPreset = data;
    this._manualUndoStack = [];
    ui.notifications.info(`Cinematic FX: Preset "${data.name}" loaded.`);
    this.render({ force: true });
  }

  async _onDeletePreset(event, target) {
    const select = this.element.querySelector("#preset-select");
    const presetId = select.value;
    if (!presetId) return;

    const confirm = await Dialog.confirm({
      title: "Delete Preset",
      content: "Delete this preset?",
    });
    if (!confirm) return;

    await game.user.update({
      [`flags.cinematic-cut-ins.allOutPresets.-=${presetId}`]: null,
    });

    ui.notifications.info("Cinematic FX: Group Preset deleted.");

    this.render();
  }

  _extractParticipantData(formData) {
    const list = [];
    for (let i = 0; i < this.actors.length; i++) {
      const getRaw = (key) => formData[`participant.${i}.${key}`];
      const readyTransformEnabled =
        isTruthyFormValue(getRaw("readyTransformEnabled")) ||
        READY_TRANSFORM_NUMERIC_FIELDS.some((key) =>
          hasSubmittedValue(getRaw(key)),
        ) ||
        getRaw("readyMirror") !== undefined;

      const participant = {
        img: formData[`participant.${i}.img`],
        readyImg: formData[`participant.${i}.readyImg`],
        text: formData[`participant.${i}.text`],
        color: formData[`participant.${i}.color`],
        textSize: Number(formData[`participant.${i}.textSize`]) || 6,
        textColor: formData[`participant.${i}.textColor`],
        textX: Number(formData[`participant.${i}.textX`]) || 0,
        textY: Number(formData[`participant.${i}.textY`]) || 0,
        shadow: formData[`participant.${i}.shadow`],

        zoom: Number(formData[`participant.${i}.zoom`]) || 2.0,

        zoomX: Number(formData[`participant.${i}.zoomX`]) || 0,
        zoomY: Number(formData[`participant.${i}.zoomY`]) || 0,

        scale: Number(formData[`participant.${i}.scale`]) || 1,
        x: Number(formData[`participant.${i}.x`]) || 0,
        y: Number(formData[`participant.${i}.y`]) || 0,

        rotation: Number(formData[`participant.${i}.rotation`]) || 0,
        mirror: isTruthyFormValue(formData[`participant.${i}.mirror`]),

        sound: formData[`participant.${i}.sound`],
        sfx: formData[`participant.${i}.sfx`],
        readySfx: formData[`participant.${i}.readySfx`],
      };

      if (readyTransformEnabled) {
        participant.readyTransformEnabled = true;
        participant.readyZoom = hasSubmittedValue(getRaw("readyZoom"))
          ? numberOrFallback(getRaw("readyZoom"), participant.zoom)
          : participant.zoom;
        participant.readyZoomX = hasSubmittedValue(getRaw("readyZoomX"))
          ? numberOrFallback(getRaw("readyZoomX"), participant.zoomX)
          : participant.zoomX;
        participant.readyZoomY = hasSubmittedValue(getRaw("readyZoomY"))
          ? numberOrFallback(getRaw("readyZoomY"), participant.zoomY)
          : participant.zoomY;
        participant.readyScale = hasSubmittedValue(getRaw("readyScale"))
          ? numberOrFallback(getRaw("readyScale"), participant.scale)
          : participant.scale;
        participant.readyX = hasSubmittedValue(getRaw("readyX"))
          ? numberOrFallback(getRaw("readyX"), participant.x)
          : participant.x;
        participant.readyY = hasSubmittedValue(getRaw("readyY"))
          ? numberOrFallback(getRaw("readyY"), participant.y)
          : participant.y;
        participant.readyRotation = hasSubmittedValue(getRaw("readyRotation"))
          ? numberOrFallback(getRaw("readyRotation"), participant.rotation)
          : participant.rotation;
        participant.readyMirror = isTruthyFormValue(getRaw("readyMirror"));
      }

      list.push(participant);
    }
    return list;
  }

  _getGlobalLayersFromForm(formData) {
    const list = [];
    Object.keys(formData).forEach((key) => {
      const match = key.match(/^globalLayers\.(\d+)\.(.*)$/);
      if (match) {
        const index = Number(match[1]);
        const prop = match[2];
        if (!list[index]) list[index] = {};

        if (
          [
            "zIndex",
            "x",
            "y",
            "rotation",
            "maskSize",
            "maskX",
            "maskY",
          ].includes(prop)
        ) {
          list[index][prop] = Number(formData[key]) || 0;
        } else if (["opacity", "scale", "delay"].includes(prop)) {
          const n = Number(formData[key]);
          list[index][prop] = Number.isFinite(n) ? n : 0;
        } else {
          list[index][prop] = formData[key];
        }
      }
    });

    return list
      .filter((item) => item)
      .map((layer) => ({
        src: layer.src || "",
        zIndex: layer.zIndex ?? 20,
        blend: layer.blend || "normal",
        opacity: layer.opacity ?? 1,
        scale: layer.scale ?? 1,
        x: layer.x ?? 0,
        y: layer.y ?? 0,
        rotation: layer.rotation ?? 0,
        mirror: !!layer.mirror,
        loop: layer.loop !== false,
        delay: layer.delay ?? 0,
        maskMode: layer.maskMode || "none",
        maskShape: layer.maskShape || "",
        maskSrc: layer.maskSrc || "",
        maskSize: layer.maskSize ?? 100,
        maskX: layer.maskX ?? 50,
        maskY: layer.maskY ?? 50,
        videoAudio: !!layer.videoAudio,
      }));
  }

  _parseManualPanelsFormValue(raw) {
    if (raw === undefined || raw === null || raw === "") return null;
    if (typeof raw === "object") return raw;
    if (typeof raw !== "string") return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  _sanitizeManualPanels(raw) {
    let candidate = raw;
    if (typeof candidate === "string")
      candidate = this._parseManualPanelsFormValue(candidate);
    return sanitizeManualPanels(candidate);
  }

  _getManualPanelsFromForm(formData) {
    return this._sanitizeManualPanels(
      this._parseManualPanelsFormValue(formData?.manualPanels),
    );
  }

  _writeManualPanelsToForm(data) {
    if (!this.element) return;
    const input = this.element.querySelector('input[name="manualPanels"]');
    if (!input) return;
    input.value = data ? JSON.stringify(data) : "";
  }

  _getCurrentPanelMode() {
    const select = this.element?.querySelector('select[name="panelMode"]');
    return select?.value === "manual" ? "manual" : "theme";
  }

  _getManualLineStyleFromForm(formData) {
    return sanitizeManualLineStyle(formData?.manualLineStyle);
  }

  _sanitizeManualLineWidth(rawWidth, styleId) {
    return sanitizeManualLineWidth(
      rawWidth,
      getManualLineStyleDefaultWidth(styleId),
    );
  }

  _getManualLineWidthFromForm(formData) {
    const styleId = this._getManualLineStyleFromForm(formData);
    return this._sanitizeManualLineWidth(formData?.manualLineWidth, styleId);
  }

  _getManualLineTintFromForm(formData) {
    return isTruthyFormValue(formData?.manualLineTint);
  }

  _getManualLineColorFromForm(formData) {
    return sanitizeManualLineColor(formData?.manualLineColor);
  }

  _getManualLineGlowFromForm(formData) {
    return isTruthyFormValue(formData?.manualLineGlow);
  }

  _getSidebarScrollContainer() {
    if (!this.element) return null;
    return (
      this.element.querySelector(".allout-tab-panels") ||
      this.element.querySelector(".config-sidebar")
    );
  }

  _applyActiveTab() {
    if (!this.element) return;
    const tab = CinematicAllOutConfig.ALLOUT_TABS.includes(this._activeTab)
      ? this._activeTab
      : "setup";
    this._activeTab = tab;

    const sidebar = this.element.querySelector(".config-sidebar");
    if (!sidebar) return;

    sidebar.querySelectorAll(".allout-tab-button").forEach((btn) => {
      const isActive = btn.dataset.alloutTab === tab;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    sidebar.querySelectorAll(".allout-tab-panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.alloutTabPanel === tab);
    });
  }

  _setActiveTab(tab) {
    if (!CinematicAllOutConfig.ALLOUT_TABS.includes(tab)) return;
    if (tab === this._activeTab) return;
    this._activeTab = tab;
    this._applyActiveTab();
    const container = this._getSidebarScrollContainer();
    if (container) container.scrollTop = 0;
  }

  _saveSidebarScroll() {
    const container = this._getSidebarScrollContainer();
    if (container) this._savedSidebarScrollTop = container.scrollTop;
  }

  _restoreSidebarScroll() {
    if (!this._savedSidebarScrollTop) return;
    const container = this._getSidebarScrollContainer();
    if (!container) return;

    container.scrollTop = this._savedSidebarScrollTop;
    this._savedSidebarScrollTop = 0;
  }

  async _onAddGlobalLayer(event, target) {
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const currentLayers = this._getGlobalLayersFromForm(formData);

    currentLayers.push({
      src: "",
      zIndex: 20,
      blend: "normal",
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      mirror: false,
      loop: true,
      delay: 0,
      maskMode: "none",
      maskShape: "circle(48%)",
      maskSrc: "",
      maskSize: 100,
      maskX: 50,
      maskY: 50,
    });

    this._pendingPreset = {
      ...this._pendingPreset,
      ...formData,
      globalLayers: currentLayers,
      participants: this._extractParticipantData(formData),
    };

    this._saveSidebarScroll();
    this.render();
  }

  async _onRemoveGlobalLayer(event, target) {
    const index = Number(target.dataset.index);
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const currentLayers = this._getGlobalLayersFromForm(formData);

    if (index >= 0 && index < currentLayers.length)
      currentLayers.splice(index, 1);

    this._pendingPreset = {
      ...this._pendingPreset,
      ...formData,
      globalLayers: currentLayers,
      participants: this._extractParticipantData(formData),
    };

    this._saveSidebarScroll();
    this.render();
  }

  /* -----------------------------------------------------
       폼 데이터 수집 헬퍼 함수
       (Test와 Play가 동일한 데이터를 쓰기 위해 분리함)
    ----------------------------------------------------- */
  _buildPayload() {
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const participants = this._extractParticipantData(formData);
    const globalLayers = this._getGlobalLayersFromForm(formData)
      .map((layer, index) => ({ ...layer, index }))
      .filter((l) => l.src);

    participants.forEach((participant, index) => {
      participant.readyTransformPreviewMode =
        this._getParticipantTransformMode(index) === "ready";
    });

    if (participants.length === 0) return null;

    const panelMode = formData.panelMode === "manual" ? "manual" : "theme";
    const manualPanels = this._getManualPanelsFromForm(formData);

    return {
      global: {
        theme: formData.theme,
        showNames: formData.showNames,
        panelMode: panelMode,
        manualPanels: manualPanels,
        manualLineStyle: this._getManualLineStyleFromForm(formData),
        manualLineWidth: this._getManualLineWidthFromForm(formData),
        manualLineTint: this._getManualLineTintFromForm(formData),
        manualLineColor: this._getManualLineColorFromForm(formData),
        manualLineGlow: this._getManualLineGlowFromForm(formData),
        centerMainText: formData.centerMainText,
        centerSubText: formData.centerSubText,
        screenMood: formData.screenMood,
        screenMoodOpacity: formData.screenMoodOpacity,
        cinematicEffect: formData.cinematicEffect,
        cinematicEffectStrength: formData.cinematicEffectStrength,
        cinematicEffectOffsetX: formData.cinematicEffectOffsetX,
        cinematicEffectOffsetY: formData.cinematicEffectOffsetY,
        cinematicEffectScale: formData.cinematicEffectScale,
        fontFamily: formData.fontFamily,
        fontBold: formData.fontBold ?? true,
        fontItalic: formData.fontItalic ?? false,
        subFontFamily: formData.subFontFamily,
        subFontBold: formData.subFontBold ?? true,
        subFontItalic: formData.subFontItalic ?? false,
        sound: formData.sound,
        sfx: formData.sfx,
        finishSound: formData.finishSound,
        shakeIntensity: Number(formData.shakeIntensity),

        centerMainColor: formData.centerMainColor,
        centerMainShadow: formData.centerMainShadow,
        centerMainSize: formData.centerMainSize,
        centerMainX: formData.centerMainX,
        centerMainY: formData.centerMainY,

        centerSubColor: formData.centerSubColor,
        centerSubShadow: formData.centerSubShadow,
        centerSubSize: formData.centerSubSize,
        centerSubX: formData.centerSubX,
        centerSubY: formData.centerSubY,
        linkToCombat: formData.linkToCombat,
        speedMultiplier: Number(formData.speedMultiplier) || 1.0,
        voteButtonText: formData.voteButtonText || "",
        voteButtonSound: formData.voteButtonSound || "",
        layers: globalLayers,
      },
      participants: participants,
    };
  }

  /* -----------------------------------------------------
       테스트 플레이 핸들러 (Local Only)
       소켓을 타지 않고 CutinManager를 직접 호출 -> 나만 보임
    ----------------------------------------------------- */
  async _onTest(event, target) {
    event.preventDefault();
    const payload = this._buildPayload();

    if (!payload) {
      ui.notifications.warn("No participants to test.");
      return;
    }

    CutinManager.play(payload);
  }

  /* -----------------------------------------------------
       실행 핸들러 (Broadcast)
       API를 통해 호출 -> 모든 플레이어에게 전송
    ----------------------------------------------------- */
  async _onPlay(event, target) {
    event.preventDefault();
    const payload = this._buildPayload();

    if (!payload) {
      ui.notifications.warn("No participants to execute.");
      return;
    }

    game.modules.get("cinematic-cut-ins").api.play(payload);

    this.close();
  }

  // --- PREVIEW LOGIC ---
  _onRender(context, options) {
    super._onRender(context, options);
    this._applyActiveTab();
    this._restoreSidebarScroll();
    this._fitPreview();
    this._resizeObserver = new ResizeObserver(() => this._fitPreview());
    const wrapper = this.element.querySelector(".preview-stage-wrapper");
    if (wrapper) this._resizeObserver.observe(wrapper);

    this._windowResizeHandler = () => this._fitPreview();
    window.addEventListener("resize", this._windowResizeHandler);

    const sidebar = this.element.querySelector(".config-sidebar");
    if (sidebar) {
      sidebar.addEventListener("click", (e) => {
        const tabButton = e.target.closest(".allout-tab-button");
        if (!tabButton || !sidebar.contains(tabButton)) return;
        e.preventDefault();
        const tab = tabButton.dataset.alloutTab;
        if (tab) this._setActiveTab(tab);
      });
    }

    this.element.addEventListener("click", (e) => {
      const button = e.target.closest("[data-transform-mode]");
      if (!button || !this.element.contains(button)) return;

      e.preventDefault();
      this._setParticipantTransformMode(
        button.closest(".participant-card"),
        button.dataset.transformMode,
      );
    });

    const shakeInput = this.element.querySelector(
      'input[name="shakeIntensity"]',
    );
    if (shakeInput) {
      shakeInput.addEventListener("input", (e) => {
        const span = e.target.nextElementSibling;
        if (span) span.textContent = e.target.value;
      });
    }

    const speedInput = this.element.querySelector(
      'input[name="speedMultiplier"]',
    );
    if (speedInput) {
      speedInput.addEventListener("input", (e) => {
        const span = e.target.nextElementSibling;
        if (span) span.textContent = `${e.target.value}x`;
      });
    }

    const moodOpacityInput = this.element.querySelector(
      'input[name="screenMoodOpacity"]',
    );
    if (moodOpacityInput) {
      moodOpacityInput.addEventListener("input", (e) => {
        const span = e.target.nextElementSibling;
        if (span) span.textContent = `${e.target.value}%`;
      });
    }

    for (const name of [
      "cinematicEffectOffsetX",
      "cinematicEffectOffsetY",
      "cinematicEffectScale",
    ]) {
      const input = this.element.querySelector(`input[name="${name}"]`);
      if (!input) continue;
      input.addEventListener("input", (e) => {
        const span = e.target.nextElementSibling;
        if (span) span.textContent = `${e.target.value}%`;
      });
    }

    const manualLineWidthInput = this.element.querySelector(
      'input[name="manualLineWidth"]',
    );
    const updateManualLineWidthValue = () => {
      const span = this.element.querySelector(".manual-line-width-value");
      if (span && manualLineWidthInput)
        span.textContent = manualLineWidthInput.value;
    };
    if (manualLineWidthInput) {
      manualLineWidthInput.addEventListener(
        "input",
        updateManualLineWidthValue,
      );
      updateManualLineWidthValue();
    }

    const manualLineStyleSelect = this.element.querySelector(
      'select[name="manualLineStyle"]',
    );
    if (manualLineStyleSelect && manualLineWidthInput) {
      manualLineStyleSelect.addEventListener("change", (e) => {
        const selectedOption = e.target.selectedOptions?.[0];
        const defaultWidth = Number(selectedOption?.dataset.defaultWidth);
        if (!Number.isFinite(defaultWidth) || defaultWidth <= 0) return;
        manualLineWidthInput.value = String(
          sanitizeManualLineWidth(defaultWidth),
        );
        updateManualLineWidthValue();
      });
    }

    const themeSelect = this.element.querySelector("select[name='theme']");
    if (themeSelect)
      themeSelect.addEventListener("change", (e) => this._onThemeChange(e));

    if (!this._didInitThemeDefaults && themeSelect) {
      const hasValue = (v) =>
        typeof v === "string" ? v.trim().length > 0 : !!v;
      const finishInput = this.element.querySelector(
        "file-picker[name='finishSound']",
      );
      const charSfxInputs = Array.from(
        this.element.querySelectorAll("file-picker[name*='.sfx']"),
      );

      const hasFinishSound = hasValue(finishInput?.value);
      const hasAnyCharSfx = charSfxInputs.some((input) =>
        hasValue(input.value),
      );

      if (!hasFinishSound && !hasAnyCharSfx) {
        this._onThemeChange({ target: themeSelect });
      }

      this._didInitThemeDefaults = true;
    }

    this.element.querySelectorAll(".mask-mode-select").forEach((select) => {
      select.addEventListener("change", (e) => {
        const mode = e.target.value;
        const row = e.target.closest(".layer-row");
        if (!row) return;

        const shapeInput = row.querySelector(".mask-input-shape");
        const imgInput = row.querySelector(".mask-input-image");
        const dimsInput = row.querySelector(".mask-input-dims");

        if (shapeInput)
          shapeInput.style.display = mode === "shape" ? "block" : "none";
        if (imgInput)
          imgInput.style.display = mode === "image" ? "block" : "none";
        if (dimsInput)
          dimsInput.style.display = mode === "none" ? "none" : "flex";
      });
    });

    this.element.addEventListener("input", (e) => {
      if (e.target.name !== "theme") this._updatePreview();
    });

    this.element.addEventListener("change", (e) => {
      if (e.target.name === "theme") return;

      const changedName = e.target.name || "";
      if (
        changedName.startsWith("globalLayers.") &&
        changedName.endsWith(".zIndex")
      ) {
        const formData = new foundry.applications.ux.FormDataExtended(
          this.element,
        ).object;
        this._pendingPreset = {
          ...this._pendingPreset,
          ...formData,
          globalLayers: this._getGlobalLayersFromForm(formData),
          participants: this._extractParticipantData(formData),
        };

        this._saveSidebarScroll();
        this.render();
        return;
      }

      this._updatePreview();
    });

    this.element.querySelectorAll(".participant-card").forEach((card) => {
      this._setParticipantTransformMode(
        card,
        this._getParticipantTransformMode(Number(card.dataset.index)),
        { skipPreview: true },
      );
    });

    this._setupManualPanelEditor();
    this._initGroupPreviewInteraction();

    this._updatePreview();
  }

  _getParticipantTransformMode(index) {
    const card = this.element?.querySelector(
      `.participant-card[data-index="${index}"]`,
    );
    const readyButton = card?.querySelector('[data-transform-mode="ready"]');
    return readyButton?.classList.contains("active") ? "ready" : "base";
  }

  _setParticipantTransformMode(card, mode, options = {}) {
    if (!card) return;

    const currentMode = mode === "ready" ? "ready" : "base";
    card.querySelectorAll("[data-transform-panel]").forEach((panel) => {
      panel.style.display =
        panel.dataset.transformPanel === currentMode ? "block" : "none";
    });

    card.querySelectorAll("[data-transform-mode]").forEach((button) => {
      const isActive = button.dataset.transformMode === currentMode;
      button.classList.toggle("active", isActive);
      button.style.background = isActive ? "#e61c34" : "rgba(0,0,0,0.2)";
      button.style.color = isActive ? "#fff" : "#aaa";
      button.style.borderColor = isActive ? "#e61c34" : "#444";
    });

    if (currentMode === "ready") {
      const enabledInput = card.querySelector("[data-ready-transform-enabled]");
      if (enabledInput && enabledInput.value !== "true")
        this._primeReadyTransformFields(card);
      if (enabledInput) enabledInput.value = "true";
    }

    if (!options.skipPreview) this._updatePreview();
  }

  _primeReadyTransformFields(card) {
    const index = card.dataset.index;
    const pairs = [
      ["zoom", "readyZoom"],
      ["zoomX", "readyZoomX"],
      ["zoomY", "readyZoomY"],
      ["scale", "readyScale"],
      ["x", "readyX"],
      ["y", "readyY"],
      ["rotation", "readyRotation"],
    ];

    pairs.forEach(([baseKey, readyKey]) => {
      const baseInput = card.querySelector(
        `[name="participant.${index}.${baseKey}"]`,
      );
      const readyInput = card.querySelector(
        `[name="participant.${index}.${readyKey}"]`,
      );
      if (readyInput && readyInput.value === "")
        readyInput.value = baseInput?.value ?? "";
    });

    const baseMirror = card.querySelector(
      `[name="participant.${index}.mirror"]`,
    );
    const readyMirror = card.querySelector(
      `[name="participant.${index}.readyMirror"]`,
    );
    if (readyMirror) readyMirror.checked = !!baseMirror?.checked;
  }

  _onThemeChange(event) {
    const newTheme = event.target.value;
    const oldTheme = this._lastTheme || "rebel";

    const oldDefaultColor = THEME_COLORS[oldTheme];
    const newDefaultColor = THEME_COLORS[newTheme];
    const colorInputs = this.element.querySelectorAll(
      "color-picker[name*='.color']",
    ); // 참가자 색상만 선택됨 (점 포함)

    colorInputs.forEach((input) => {
      if (input.value.toLowerCase() === oldDefaultColor.toLowerCase()) {
        input.value = newDefaultColor;
      }
    });

    const soundConfig = THEME_SOUND_CONFIG[newTheme];
    if (soundConfig) {
      // (A) Finish SFX
      const finishInput = this.element.querySelector(
        "file-picker[name='finishSound']",
      );
      if (finishInput) {
        const currentVal = finishInput.value;
        const oldFinish = THEME_SOUND_CONFIG[oldTheme]?.finish || "";
        if (!currentVal || currentVal === oldFinish) {
          finishInput.value = soundConfig.finish;
          finishInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      // (B) Character SFX
      const charSfxInputs = this.element.querySelectorAll(
        "file-picker[name*='.sfx']",
      );
      charSfxInputs.forEach((input) => {
        if (input.name.includes("participant")) {
          const currentVal = input.value;
          const oldCharSfx = THEME_SOUND_CONFIG[oldTheme]?.char || "";
          if (!currentVal || currentVal === oldCharSfx) {
            input.value = soundConfig.char;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      });
    }

    const oldCenter =
      THEME_CENTER_DEFAULTS[oldTheme] || THEME_CENTER_DEFAULTS["rebel"];
    const newCenter =
      THEME_CENTER_DEFAULTS[newTheme] || THEME_CENTER_DEFAULTS["rebel"];

    const updateColor = (name, oldVal, newVal) => {
      const el = this.element.querySelector(`color-picker[name="${name}"]`);
      if (el) {
        const current = el.value.toLowerCase();
        if (!current || current === oldVal.toLowerCase()) {
          el.value = newVal;
          el.dispatchEvent(new Event("change", { bubbles: true }));
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };

    updateColor("centerMainColor", oldCenter.main, newCenter.main);
    updateColor("centerMainShadow", oldCenter.mainShadow, newCenter.mainShadow);
    updateColor("centerSubColor", oldCenter.sub, newCenter.sub);
    updateColor("centerSubShadow", oldCenter.subShadow, newCenter.subShadow);

    this._lastTheme = newTheme;

    const stage = this.element.querySelector("#group-preview-stage");
    if (stage) {
      stage.classList.remove("paused");

      const pauseIcon = this.element.querySelector(
        'button[data-action="toggle-pause"] i',
      );
      if (pauseIcon) pauseIcon.className = "fas fa-pause";

      this._updatePreview();
    }
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

  _fitPreview() {
    if (!this.element) return;
    const wrapper = this.element.querySelector(".preview-stage-wrapper");
    const stage = this.element.querySelector("#group-preview-stage");
    if (!wrapper || !stage) return;

    const wrapW = wrapper.clientWidth;
    const wrapH = wrapper.clientHeight;

    const baseW = 1920;
    const baseH = 1080;

    const scale = Math.min(wrapW / baseW, wrapH / baseH) * 0.95;

    const transform = `translate(-50%, -50%) scale(${scale})`;
    stage.style.transform = transform;

    const overlay = wrapper.querySelector(".manual-panel-editor-overlay");
    if (overlay) overlay.style.transform = transform;
  }

  _initGroupPreviewInteraction() {
    if (!this.element) return;

    const stage = this.element.querySelector("#group-preview-stage");
    if (!stage) return;

    stage.classList.add("preview-interactive");

    if (stage.dataset.interactionBound === "1") return;
    stage.dataset.interactionBound = "1";

    const getInput = (name) =>
      name ? this.element.querySelector(`[name="${name}"]`) : null;

    const getStageRatio = () => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return { x: 1920 / rect.width, y: 1080 / rect.height };
    };

    const commitInput = (input, value, fireChange) => {
      if (!input) return;
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      if (fireChange)
        input.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const getSliceIndex = (slice) =>
      Array.from(stage.querySelectorAll(".cinematic-slice")).indexOf(slice);

    const resolveLayerTarget = (node) => {
      const layerEl = node.closest(".custom-layer-media");
      if (!layerEl) return null;
      if (layerEl.classList.contains("banner-masked")) return null;
      const index = layerEl.dataset.layerIndex;
      if (index === undefined) return null;
      return {
        xName: `globalLayers.${index}.x`,
        yName: `globalLayers.${index}.y`,
        sizeName: `globalLayers.${index}.scale`,
      };
    };

    const resolveCharacterTarget = (node) => {
      const slice = node.closest(".cinematic-slice");
      if (!slice) return null;
      const index = getSliceIndex(slice);
      if (index < 0) return null;
      if (this._getParticipantTransformMode(index) === "ready") {
        return {
          xName: `participant.${index}.readyX`,
          yName: `participant.${index}.readyY`,
          sizeName: `participant.${index}.readyScale`,
        };
      }
      return {
        xName: `participant.${index}.x`,
        yName: `participant.${index}.y`,
        sizeName: `participant.${index}.scale`,
      };
    };

    const resolveSliceTextTarget = (node) => {
      const slice = node.closest(".cinematic-slice");
      if (!slice) return null;
      const index = getSliceIndex(slice);
      if (index < 0) return null;
      return {
        xName: `participant.${index}.textX`,
        yName: `participant.${index}.textY`,
        sizeName: `participant.${index}.textSize`,
      };
    };

    const isPointInside = (rect, event) =>
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    const isVisibleAtPoint = (element, event) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0 || !isPointInside(rect, event))
        return null;
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden")
        return null;
      if (Number(style.opacity) <= 0.05) return null;
      return rect;
    };

    const getStackIndex = (element, stack) =>
      stack.findIndex(
        (stackElement) =>
          stackElement === element || element.contains(stackElement),
      );

    const centerDistance = (rect, event) => {
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      return dx * dx + dy * dy;
    };

    const resolveElementTarget = (element) => {
      if (element.classList.contains("slice-text"))
        return resolveSliceTextTarget(element);
      if (element.classList.contains("cinematic-character"))
        return resolveCharacterTarget(element);
      if (element.classList.contains("center-main")) {
        return {
          xName: "centerMainX",
          yName: "centerMainY",
          sizeName: "centerMainSize",
        };
      }
      if (element.classList.contains("center-sub")) {
        return {
          xName: "centerSubX",
          yName: "centerSubY",
          sizeName: "centerSubSize",
        };
      }
      if (element.classList.contains("custom-layer-media"))
        return resolveLayerTarget(element);
      return null;
    };

    const resolveTargetAtPoint = (event) => {
      const stack = document.elementsFromPoint(event.clientX, event.clientY);
      const groups = [
        { selector: ".slice-text", priority: 10 },
        { selector: ".cinematic-character", priority: 20 },
        { selector: ".center-main, .center-sub", priority: 30 },
        { selector: ".custom-layer-media:not(.banner-masked)", priority: 40 },
      ];
      const candidates = [];

      for (const group of groups) {
        stage.querySelectorAll(group.selector).forEach((element) => {
          const rect = isVisibleAtPoint(element, event);
          if (!rect) return;
          const target = resolveElementTarget(element);
          if (!target) return;
          const stackIndex = getStackIndex(element, stack);
          candidates.push({
            target,
            priority: group.priority,
            stackMiss: stackIndex < 0 ? 1 : 0,
            stackIndex: stackIndex < 0 ? Number.MAX_SAFE_INTEGER : stackIndex,
            distance: centerDistance(rect, event),
            area: rect.width * rect.height,
          });
        });
      }

      candidates.sort(
        (a, b) =>
          a.stackMiss - b.stackMiss ||
          a.priority - b.priority ||
          a.stackIndex - b.stackIndex ||
          a.distance - b.distance ||
          a.area - b.area,
      );
      return candidates[0]?.target ?? null;
    };

    const onPointerDown = (event) => {
      if (event.button !== 0) return;
      if (this._getCurrentPanelMode() === "manual") return;

      const target = resolveTargetAtPoint(event);
      if (!target) return;

      const ratio = getStageRatio();
      if (!ratio) return;

      const xInput = getInput(target.xName);
      const yInput = getInput(target.yName);
      if (!xInput && !yInput) return;

      const startClientX = event.clientX;
      const startClientY = event.clientY;
      const baseX = Number(xInput?.value) || 0;
      const baseY = Number(yInput?.value) || 0;

      event.preventDefault();
      stage.classList.add("dragging");

      let pendingMove = null;
      let rafId = null;

      const flushMove = () => {
        rafId = null;
        if (!pendingMove) return;
        const deltaX = (pendingMove.clientX - startClientX) * ratio.x;
        const deltaY = (pendingMove.clientY - startClientY) * ratio.y;
        pendingMove = null;
        if (xInput) xInput.value = Math.round(baseX + deltaX);
        if (yInput) yInput.value = Math.round(baseY + deltaY);
        const trigger = xInput || yInput;
        if (trigger)
          trigger.dispatchEvent(new Event("input", { bubbles: true }));
      };

      const onMove = (moveEvent) => {
        pendingMove = {
          clientX: moveEvent.clientX,
          clientY: moveEvent.clientY,
        };
        if (rafId === null) rafId = requestAnimationFrame(flushMove);
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        if (rafId !== null) cancelAnimationFrame(rafId);
        flushMove();
        stage.classList.remove("dragging");
        if (xInput)
          xInput.dispatchEvent(new Event("change", { bubbles: true }));
        if (yInput)
          yInput.dispatchEvent(new Event("change", { bubbles: true }));
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    const onWheel = (event) => {
      if (!event.ctrlKey) return;
      if (this._getCurrentPanelMode() === "manual") return;

      const target = resolveTargetAtPoint(event);
      if (!target || !target.sizeName) return;

      const input = getInput(target.sizeName);
      if (!input) return;

      event.preventDefault();

      const step = Number(input.step) || 0.1;
      const min = input.min !== "" ? Number(input.min) : 0.1;
      const max = input.max !== "" ? Number(input.max) : Infinity;
      const direction = event.deltaY < 0 ? 1 : -1;

      let next = (Number(input.value) || 0) + direction * step;
      next = Math.min(max, Math.max(min, next));
      next = Number((Math.round(next / step) * step).toFixed(2));

      commitInput(input, next, true);
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("wheel", onWheel, { passive: false });
  }

  _updatePreview() {
    if (!this.element) return;
    const stage = this.element.querySelector("#group-preview-stage");
    if (!stage) return;

    const payload = this._buildPayload();

    if (!payload) return;

    // console.log("Preview Update:", payload.global.centerMainSize);

    const currentThemeClass = `theme-${payload.global.theme}`;
    const hasSameTheme = stage.classList.contains(currentThemeClass);

    const currentCount = parseInt(stage.dataset.count || "0", 10);
    const newCount = payload.participants.length;

    const isManualNow =
      payload.global?.panelMode === "manual" && payload.global?.manualPanels;
    const wasManual = stage.dataset.panelMode === "manual";
    const manualGeometryChanged =
      isManualNow &&
      stage.dataset.manualPanelsSignature !==
        JSON.stringify(payload.global.manualPanels);
    const modeChanged = !!isManualNow !== wasManual;

    if (
      hasSameTheme &&
      currentCount === newCount &&
      stage.children.length > 0 &&
      !modeChanged &&
      !manualGeometryChanged
    ) {
      this._applyLiveStyles(stage, payload);
    } else {
      this._startConfigPreviewLoop(stage, payload);
    }
  }

  // Live-update the group screen mood + cinematic effect overlay without a
  // full montage rebuild, mirroring what renderCinematic mounts on playback.
  _applyGroupFxLive(stage, global) {
    const hasMood = global.screenMood && global.screenMood !== "none";
    const hasEffect =
      global.cinematicEffect && global.cinematicEffect !== "none";
    let overlay = stage.querySelector(".cinematic-group-fx");

    if (!hasMood && !hasEffect) {
      if (overlay) overlay.remove();
      return;
    }

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "cinematic-wrapper cinematic-group-fx";
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.setProperty(
        "--theme-color",
        global.effectColor || "#e61c34",
      );
      stage.appendChild(overlay);
    }
    if (stage.classList.contains("animate")) overlay.classList.add("animate");
    else overlay.classList.remove("animate");

    applyScreenMoodElement(overlay, global);
    if (hasEffect) applyCinematicEffectElements(overlay, global);
    else clearCinematicEffectElements(overlay);
  }

  _applyLiveStyles(stage, payload) {
    if (stage.dataset.interactionBound === "1")
      stage.classList.add("preview-interactive");
    stage.style.setProperty(
      "--cinematic-font",
      `"${payload.global.fontFamily}"`,
    );
    if (
      payload.global.subFontFamily &&
      payload.global.subFontFamily !== payload.global.fontFamily
    ) {
      stage.style.setProperty(
        "--cinematic-font-sub",
        `"${payload.global.subFontFamily}"`,
      );
    } else {
      stage.style.removeProperty("--cinematic-font-sub");
    }

    const g = payload.global;

    const val = (v, def) =>
      v !== undefined && v !== null && v !== "" ? v : def;

    // Main Text
    stage.style.setProperty(
      "--center-main-color",
      val(g.centerMainColor, "#ffffff"),
    );
    stage.style.setProperty(
      "--center-main-shadow",
      val(g.centerMainShadow, "#000000"),
    );
    stage.style.setProperty(
      "--center-main-size",
      `${val(g.centerMainSize, 10)}rem`,
    );
    stage.style.setProperty("--center-main-x", `${val(g.centerMainX, 0)}px`);
    stage.style.setProperty("--center-main-y", `${val(g.centerMainY, 0)}px`);

    // Sub Text
    stage.style.setProperty(
      "--center-sub-color",
      val(g.centerSubColor, "#ffffff"),
    );
    stage.style.setProperty(
      "--center-sub-shadow",
      val(g.centerSubShadow, "#000000"),
    );
    stage.style.setProperty(
      "--center-sub-size",
      `${val(g.centerSubSize, 3)}rem`,
    );
    stage.style.setProperty("--center-sub-x", `${val(g.centerSubX, 0)}px`);
    stage.style.setProperty("--center-sub-y", `${val(g.centerSubY, 0)}px`);

    const centerMain = stage.querySelector(".center-main");
    const centerSub = stage.querySelector(".center-sub");
    if (centerMain) centerMain.innerHTML = g.centerMainText;
    if (centerSub) centerSub.innerHTML = g.centerSubText;

    const centerSubEl = stage.querySelector(".center-sub");
    if (centerSubEl && g.subFontFamily && g.subFontFamily !== g.fontFamily) {
      centerSubEl.style.fontFamily = `"${g.subFontFamily}", sans-serif`;
    } else if (centerSubEl) {
      centerSubEl.style.removeProperty("font-family");
    }

    if (centerMain) {
      centerMain.style.fontWeight = g.fontBold ? "900" : "normal";
      centerMain.style.fontStyle = g.fontItalic ? "italic" : "normal";
    }
    if (centerSubEl) {
      centerSubEl.style.fontWeight = g.subFontBold ? "900" : "normal";
      centerSubEl.style.fontStyle = g.subFontItalic ? "italic" : "normal";
    }

    if (payload.global.showNames) stage.classList.remove("hide-text");
    else stage.classList.add("hide-text");

    this._applyGroupFxLive(stage, g);

    const slices = stage.querySelectorAll(".cinematic-slice");
    payload.participants.forEach((data, i) => {
      const slice = slices[i];
      if (!slice) return;

      const useReadyTransform = data.readyTransformPreviewMode === true;
      const transformValue = (readyKey, baseKey, fallback) => {
        if (useReadyTransform && hasSubmittedValue(data[readyKey]))
          return data[readyKey];
        return data[baseKey] ?? fallback;
      };

      slice.style.setProperty("--theme-color", data.color || "#e61c34");
      slice.style.setProperty("--text-color", data.textColor ?? "#ffffff");
      slice.style.setProperty("--char-shadow-color", data.shadow ?? "#000000");
      slice.style.setProperty(
        "--char-scale",
        transformValue("readyScale", "scale", 1.0),
      );
      slice.style.setProperty(
        "--mugshot-zoom",
        transformValue("readyZoom", "zoom", 2.0),
      ); // Wanted 테마용

      slice.style.setProperty(
        "--zoom-x",
        `${transformValue("readyZoomX", "zoomX", 0)}px`,
      );
      slice.style.setProperty(
        "--zoom-y",
        `${transformValue("readyZoomY", "zoomY", 0)}px`,
      );

      slice.style.setProperty(
        "--char-x",
        `${transformValue("readyX", "x", 0)}px`,
      );
      slice.style.setProperty(
        "--char-y",
        `${transformValue("readyY", "y", 0)}px`,
      );

      slice.style.setProperty(
        "--char-rotate",
        `${transformValue("readyRotation", "rotation", 0) || 0}deg`,
      );
      slice.style.setProperty(
        "--char-mirror-x",
        useReadyTransform && data.readyMirror !== undefined
          ? isTruthyFormValue(data.readyMirror)
            ? "-1"
            : "1"
          : data.mirror
            ? "-1"
            : "1",
      );

      slice.style.setProperty(
        "--text-size",
        `${Number(data.textSize) || 6}rem`,
      );
      slice.style.setProperty("--text-x", `${Number(data.textX) || 0}px`);
      slice.style.setProperty("--text-y", `${Number(data.textY) || 0}px`);

      const imgEl = slice.querySelector(".cinematic-character");
      const newImgSrc =
        useReadyTransform && data.readyImg
          ? data.readyImg
          : data.img || "icons/svg/mystery-man.svg";
      if (imgEl && !imgEl.src.endsWith(newImgSrc)) {
        imgEl.src = newImgSrc;
      }

      const textEl = slice.querySelector(".slice-text");
      if (textEl) textEl.innerHTML = data.text || "";

      const layerData = payload.global?.layers || [];
      CutinManager._updateLayers(slice, { layers: layerData });

      const layerContainer = slice.querySelector(".cinematic-custom-layers");
      if (layerContainer) {
        layerContainer.querySelectorAll(".custom-layer-media").forEach((el) => {
          if (el.style.display === "none") el.style.display = "block";
        });
      }
    });
  }

  _setupManualPanelEditor() {
    const overlay = this.element.querySelector(".manual-panel-editor-overlay");
    const panelModeSelect = this.element.querySelector(
      'select[name="panelMode"]',
    );
    if (!overlay || !panelModeSelect) return;

    panelModeSelect.addEventListener("change", (e) =>
      this._onPanelModeChange(e),
    );

    overlay.addEventListener("pointerdown", (e) =>
      this._onOverlayPointerDown(e),
    );
    overlay.addEventListener("pointermove", (e) =>
      this._onOverlayPointerMove(e),
    );
    overlay.addEventListener("pointerup", (e) => this._onOverlayPointerUp(e));
    overlay.addEventListener("pointercancel", () =>
      this._onOverlayPointerCancel(),
    );
    overlay.addEventListener("pointerleave", () =>
      this._onOverlayPointerCancel(),
    );

    const guidesInput = this.element.querySelector(
      ".manual-panel-guides-input",
    );
    if (guidesInput) {
      guidesInput.checked = !!this._manualGuidesHidden;
      guidesInput.addEventListener("change", (e) => {
        this._manualGuidesHidden = !!e.target.checked;
        this._applyManualGuidesVisibility();
      });
    }

    this._manualDragStart = null;
    this._manualDragCurrent = null;

    this._applyManualOverlayMode();
    this._applyManualGuidesVisibility();
    this._renderManualOverlay();
  }

  _applyManualOverlayMode() {
    const overlay = this.element?.querySelector(".manual-panel-editor-overlay");
    if (!overlay) return;
    const mode = this._getCurrentPanelMode();
    const active = mode === "manual";
    overlay.classList.toggle("active", active);
    overlay.setAttribute("aria-hidden", active ? "false" : "true");
    const hint = this.element.querySelector(".manual-panel-mode-section");
    if (hint) hint.classList.toggle("active", active);
  }

  _applyManualGuidesVisibility() {
    const overlay = this.element?.querySelector(".manual-panel-editor-overlay");
    if (!overlay) return;
    overlay.classList.toggle("hide-guides", !!this._manualGuidesHidden);
  }

  _onPanelModeChange(event) {
    const mode = event.target.value === "manual" ? "manual" : "theme";

    if (mode === "manual") {
      const formData = new foundry.applications.ux.FormDataExtended(
        this.element,
      ).object;
      let panels = this._getManualPanelsFromForm(formData);
      if (!panels) {
        panels = createFullScreenPanels();
        this._writeManualPanelsToForm(panels);
        this._manualUndoStack = [];
      }
      this._manualSelectedIndex = 0;
    } else {
      this._manualSelectedIndex = null;
      this._manualUndoStack = [];
    }

    this._manualDragStart = null;
    this._manualDragCurrent = null;
    this._applyManualOverlayMode();
    this._updatePreview();
    this._renderManualOverlay();
  }

  _onInitManualPanels(event) {
    event?.preventDefault?.();
    const select = this.element.querySelector('select[name="panelMode"]');
    if (select && select.value !== "manual") {
      select.value = "manual";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }
    const panels = createFullScreenPanels();
    this._writeManualPanelsToForm(panels);
    this._manualUndoStack = [];
    this._manualSelectedIndex = 0;
    this._manualDragStart = null;
    this._manualDragCurrent = null;
    this._updatePreview();
    this._renderManualOverlay();
    ui.notifications.info(
      game.i18n.localize("CINEMATIC.AllOut.PanelMode.Notif.Initialized"),
    );
  }

  _onResetManualPanels(event) {
    return this._onInitManualPanels(event);
  }

  _onUndoManualPanelSplit(event) {
    event?.preventDefault?.();
    const previous = this._manualUndoStack.pop();
    if (!previous) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.AllOut.PanelMode.Notif.UndoUnavailable"),
      );
      return;
    }

    this._writeManualPanelsToForm(previous);
    this._manualSelectedIndex = Math.min(
      previous.panels.length - 1,
      Math.max(0, this._manualSelectedIndex ?? 0),
    );
    this._manualDragStart = null;
    this._manualDragCurrent = null;
    this._updatePreview();
    this._renderManualOverlay();
    ui.notifications.info(
      game.i18n.localize("CINEMATIC.AllOut.PanelMode.Notif.Undone"),
    );
  }

  _getOverlayCoords(event) {
    const overlay = this.element.querySelector(".manual-panel-editor-overlay");
    if (!overlay) return null;
    const rect = overlay.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return [Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))];
  }

  _findPanelAt(point, panels) {
    if (!panels?.panels) return -1;
    for (let i = 0; i < panels.panels.length; i++) {
      if (pointInPolygon(point, panels.panels[i].points)) return i;
    }
    return -1;
  }

  _onOverlayPointerDown(event) {
    if (this._getCurrentPanelMode() !== "manual") return;
    if (event.button !== 0) return;
    event.preventDefault();

    const point = this._getOverlayCoords(event);
    if (!point) return;

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    let panels = this._getManualPanelsFromForm(formData);
    if (!panels) {
      panels = createFullScreenPanels();
      this._writeManualPanelsToForm(panels);
    }

    const target = this._findPanelAt(point, panels);
    if (target < 0) {
      this._manualSelectedIndex = null;
      this._manualDragStart = null;
      this._manualDragCurrent = null;
      this._renderManualOverlay();
      return;
    }

    this._manualSelectedIndex = target;
    this._manualDragStart = point;
    this._manualDragCurrent = point;
    this._renderManualOverlay();
  }

  _onOverlayPointerMove(event) {
    if (!this._manualDragStart) return;
    const point = this._getOverlayCoords(event);
    if (!point) return;
    this._manualDragCurrent = point;
    this._renderManualOverlay();
  }

  _onOverlayPointerUp(event) {
    if (!this._manualDragStart) return;
    const start = this._manualDragStart;
    const end = this._getOverlayCoords(event) || this._manualDragCurrent;
    this._manualDragStart = null;
    this._manualDragCurrent = null;

    if (!end) {
      this._renderManualOverlay();
      return;
    }

    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    if (dx * dx + dy * dy < 4) {
      this._renderManualOverlay();
      return;
    }

    if (this._manualSelectedIndex == null) {
      this._renderManualOverlay();
      return;
    }

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const panels =
      this._getManualPanelsFromForm(formData) || createFullScreenPanels();
    const target = panels.panels[this._manualSelectedIndex];
    if (!target) {
      this._renderManualOverlay();
      return;
    }

    const result = splitPolygonByLine(target, start, end);
    if (!result) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.AllOut.PanelMode.Notif.SplitFailed"),
      );
      this._renderManualOverlay();
      return;
    }

    const updated = clonePanels(panels);
    const lineStyle = this._getManualLineStyleFromForm(formData);
    const lineWidth = this._getManualLineWidthFromForm(formData);
    const lineTint = this._getManualLineTintFromForm(formData);
    const lineColor = this._getManualLineColorFromForm(formData);
    const lineGlow = this._getManualLineGlowFromForm(formData);
    const sharedCuts =
      lineStyle === DEFAULT_MANUAL_LINE_STYLE
        ? []
        : sharedEdgesBetweenPanels(result.left, result.right).map((edge) => {
            const cut = {
              points: edge.points,
              style: lineStyle,
              width: lineWidth,
            };
            if (lineTint) cut.color = lineColor;
            if (lineGlow) {
              cut.glow = true;
              cut.glowColor = lineColor;
            }
            return cut;
          });

    updated.panels.splice(
      this._manualSelectedIndex,
      1,
      result.left,
      result.right,
    );
    updated.cuts = Array.isArray(updated.cuts) ? updated.cuts : [];
    for (const cut of sharedCuts) {
      if (updated.cuts.length >= MAX_MANUAL_CUTS) break;
      updated.cuts.push(cut);
    }
    const undoState = clonePanels(panels);
    if (undoState) {
      this._manualUndoStack.push(undoState);
      if (this._manualUndoStack.length > MAX_MANUAL_CUTS)
        this._manualUndoStack.shift();
    }

    this._writeManualPanelsToForm(updated);
    this._updatePreview();
    this._renderManualOverlay();
  }

  _onOverlayPointerCancel() {
    if (!this._manualDragStart) return;
    this._manualDragStart = null;
    this._manualDragCurrent = null;
    this._renderManualOverlay();
  }

  _renderManualOverlay() {
    const overlay = this.element?.querySelector(".manual-panel-editor-overlay");
    if (!overlay) return;

    const shapesGroup = overlay.querySelector(".manual-panel-shapes");
    const labelsGroup = overlay.querySelector(".manual-panel-labels");
    const dragGroup = overlay.querySelector(".manual-panel-drag-overlay");
    if (!shapesGroup || !labelsGroup || !dragGroup) return;

    shapesGroup.innerHTML = "";
    labelsGroup.innerHTML = "";
    dragGroup.innerHTML = "";

    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const panels = this._getManualPanelsFromForm(formData);

    this._renderManualPreviewCutLines(panels, formData);

    const participantCount = this.actors?.length || 0;
    const panelCount = panels?.panels?.length || 0;

    this._updateManualStatus(panels, participantCount, panelCount);

    if (!panels) return;

    const svgNS = "http://www.w3.org/2000/svg";
    panels.panels.forEach((panel, idx) => {
      const polygon = document.createElementNS(svgNS, "polygon");
      polygon.setAttribute(
        "points",
        panel.points.map(([x, y]) => `${x},${y}`).join(" "),
      );
      polygon.setAttribute(
        "class",
        `manual-panel-shape${idx === this._manualSelectedIndex ? " selected" : ""}`,
      );
      polygon.dataset.panelIndex = String(idx);
      shapesGroup.appendChild(polygon);

      const center = polygonCentroid(panel.points);
      const label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", String(center[0]));
      label.setAttribute("y", String(center[1]));
      label.setAttribute(
        "class",
        `manual-panel-label${idx === this._manualSelectedIndex ? " selected" : ""}`,
      );
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("dominant-baseline", "central");
      label.textContent = String(idx + 1);
      labelsGroup.appendChild(label);
    });

    if (this._manualDragStart && this._manualDragCurrent) {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", String(this._manualDragStart[0]));
      line.setAttribute("y1", String(this._manualDragStart[1]));
      line.setAttribute("x2", String(this._manualDragCurrent[0]));
      line.setAttribute("y2", String(this._manualDragCurrent[1]));
      line.setAttribute("class", "manual-panel-drag-line");
      dragGroup.appendChild(line);

      const startDot = document.createElementNS(svgNS, "circle");
      startDot.setAttribute("cx", String(this._manualDragStart[0]));
      startDot.setAttribute("cy", String(this._manualDragStart[1]));
      startDot.setAttribute("r", "0.6");
      startDot.setAttribute("class", "manual-panel-drag-dot");
      dragGroup.appendChild(startDot);

      const endDot = document.createElementNS(svgNS, "circle");
      endDot.setAttribute("cx", String(this._manualDragCurrent[0]));
      endDot.setAttribute("cy", String(this._manualDragCurrent[1]));
      endDot.setAttribute("r", "0.6");
      endDot.setAttribute("class", "manual-panel-drag-dot");
      dragGroup.appendChild(endDot);
    }
  }

  _renderManualPreviewCutLines(panels, formData) {
    const stage = this.element?.querySelector("#group-preview-stage");
    if (!stage) return;

    stage.querySelectorAll(".manual-panel-cut-lines-svg").forEach((element) => {
      element.remove();
    });

    const cuts = Array.isArray(panels?.cuts) ? [...panels.cuts] : [];
    if (this._manualDragStart && this._manualDragCurrent) {
      const lineStyle = this._getManualLineStyleFromForm(formData);
      if (lineStyle !== DEFAULT_MANUAL_LINE_STYLE) {
        const draftCut = {
          points: [this._manualDragStart, this._manualDragCurrent],
          style: lineStyle,
          width: this._getManualLineWidthFromForm(formData),
        };
        if (this._getManualLineTintFromForm(formData)) {
          draftCut.color = this._getManualLineColorFromForm(formData);
        }
        if (this._getManualLineGlowFromForm(formData)) {
          draftCut.glow = true;
          draftCut.glowColor = this._getManualLineColorFromForm(formData);
        }
        cuts.push(draftCut);
      }
    }

    if (cuts.length === 0) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "manual-panel-cut-lines-svg");
    svg.setAttribute("viewBox", MANUAL_CUT_LINE_VIEWBOX);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    let rendered = 0;
    for (const cut of cuts) {
      const line = appendManualCutLine(svg, cut, {
        groupClass: "manual-panel-cut-line-segment",
        imageClass: "manual-panel-cut-line-image",
      });
      if (line) rendered += 1;
    }

    if (rendered > 0) stage.appendChild(svg);
  }

  _updateManualStatus(panels, participantCount, panelCount) {
    const statusEl = this.element?.querySelector(".manual-panel-status");
    if (!statusEl) return;

    if (this._getCurrentPanelMode() !== "manual") {
      statusEl.textContent = "";
      statusEl.dataset.state = "off";
      return;
    }

    if (!panels) {
      statusEl.textContent = game.i18n.localize(
        "CINEMATIC.AllOut.PanelMode.Status.Uninitialized",
      );
      statusEl.dataset.state = "warn";
      return;
    }

    if (panelCount === participantCount) {
      statusEl.textContent = game.i18n.format(
        "CINEMATIC.AllOut.PanelMode.Status.Ready",
        { count: panelCount },
      );
      statusEl.dataset.state = "ok";
    } else if (panelCount < participantCount) {
      statusEl.textContent = game.i18n.format(
        "CINEMATIC.AllOut.PanelMode.Status.NeedMoreSplits",
        {
          current: panelCount,
          target: participantCount,
          missing: participantCount - panelCount,
        },
      );
      statusEl.dataset.state = "warn";
    } else {
      statusEl.textContent = game.i18n.format(
        "CINEMATIC.AllOut.PanelMode.Status.TooMany",
        {
          current: panelCount,
          target: participantCount,
        },
      );
      statusEl.dataset.state = "warn";
    }
  }

  _onTogglePreviewPause(event, target) {
    const stage = this.element.querySelector("#group-preview-stage");
    if (!stage) return;

    const isPaused = stage.classList.toggle("paused");

    const videos = stage.querySelectorAll("video");

    const icon = target.querySelector("i");

    if (isPaused) {
      icon.className = "fas fa-play";
      if (this._previewTimer) clearTimeout(this._previewTimer);

      videos.forEach((v) => {
        v.pause();
      });
    } else {
      icon.className = "fas fa-pause";

      videos.forEach((v) => {
        v.play().catch((error) => {
          console.debug(
            "Cinematic FX | Preview video resume was blocked:",
            error,
          );
        });
      });

      if (this._previewTimer) clearTimeout(this._previewTimer);

      this._previewTimer = setTimeout(() => {
        const payload = this._buildPayload();
        if (payload) this._startConfigPreviewLoop(stage, payload);
      }, 2000);
    }
  }

  _startConfigPreviewLoop(stage, payload) {
    if (this._previewTimer) clearTimeout(this._previewTimer);

    if (stage.classList.contains("paused")) return;

    const runLoop = () => {
      if (!stage || !document.body.contains(stage)) return;

      if (stage.classList.contains("paused")) return;

      const freshPayload = this._buildPayload();
      if (!freshPayload) return;

      freshPayload.global.mute = true;

      const duration = CutinManager.renderCinematic(stage, freshPayload);
      this._applyLiveStyles(stage, freshPayload);

      this._previewTimer = setTimeout(runLoop, duration);
    };

    runLoop();
  }

  async _onExportPreset(event, target) {
    const select = this.element.querySelector("#preset-select");
    const presetId = select?.value;
    if (!presetId) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.Export.Notif.SelectFirst"),
      );
      return;
    }

    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const preset = presets[presetId];
    if (!preset) return;

    const result = await exportPreset(
      preset,
      "allout",
      preset.name || "allout",
    );
    if (result.success) {
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ExportSuccess", {
          count: result.assetCount,
        }),
      );
    }
  }

  async _onImportPreset(event, target) {
    const result = await importPreset("allout");
    if (!result.success) {
      if (result.error !== "Cancelled") ui.notifications.error(result.error);
      return;
    }

    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const presetId = foundry.utils.randomID();
    result.preset.id = presetId;
    presets[presetId] = result.preset;
    await game.user.setFlag("cinematic-cut-ins", "allOutPresets", presets);

    ui.notifications.info(
      game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
        count: result.assetCount,
      }),
    );
    this.render();
  }
}
