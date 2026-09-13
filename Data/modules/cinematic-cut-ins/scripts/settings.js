import { CutinManager } from "./CutinManager.js";
import { MODULE_ID, SETTING_KEYS } from "./constants.js";
import { scheduleCinematicMenuProviderTouch } from "./menu-extension.js";

export function registerInitSettings({
  refreshMenu = scheduleCinematicMenuProviderTouch,
} = {}) {
  game.settings.register(MODULE_ID, SETTING_KEYS.MIN_ACCESS_ROLE, {
    name: "Minimum Access Role",
    hint: "Minimum user role required to access Cinematic Control Panel and Config buttons.",
    scope: "world",
    config: true,
    type: Number,
    default: 4,
    choices: {
      1: "Player",
      2: "Trusted Player",
      3: "Assistant GM",
      4: "Game Master",
    },
    onChange: refreshMenu,
  });
}

export function registerReadySettings({
  fitScreen = () => CutinManager._fitScreen(),
  refreshMenu = scheduleCinematicMenuProviderTouch,
} = {}) {
  game.settings.register(MODULE_ID, SETTING_KEYS.ENABLE_AUTOMATION, {
    name: "Enable Automation",
    hint: "Trigger Cut-ins automatically when Items are used.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.DISABLE_CLIENT, {
    name: "Disable for Me",
    hint: "Do not show Cut-in effects on my screen.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: refreshMenu,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.DISABLE_CINEMATIC_EFFECTS, {
    name: game.i18n.localize("CINEMATIC.Setting.DisableCinematicEffects"),
    hint: game.i18n.localize("CINEMATIC.Setting.DisableCinematicEffectsHint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });

  const screenChoices = {
    letterbox: "CINEMATIC.ScreenMode.Letterbox",
    dimmed: "CINEMATIC.ScreenMode.Dimmed",
    fit: "CINEMATIC.ScreenMode.Fit",
    stretch: "CINEMATIC.ScreenMode.Stretch",
    cover: "CINEMATIC.ScreenMode.Cover",
  };

  game.settings.register(MODULE_ID, SETTING_KEYS.PERSONAL_SCREEN_MODE, {
    name: game.i18n.localize("CINEMATIC.Setting.PersonalScreenMode"),
    hint: game.i18n.localize("CINEMATIC.Setting.ScreenModeHint"),
    scope: "client",
    config: true,
    type: String,
    choices: localizeChoices(screenChoices),
    default: "letterbox",
    onChange: fitScreen,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.GROUP_SCREEN_MODE, {
    name: game.i18n.localize("CINEMATIC.Setting.GroupScreenMode"),
    hint: game.i18n.localize("CINEMATIC.Setting.ScreenModeHint"),
    scope: "client",
    config: true,
    type: String,
    choices: localizeChoices(screenChoices),
    default: "letterbox",
    onChange: fitScreen,
  });

  // The GlitchSmith Library notifier owns update-notification settings.
  game.settings.register(MODULE_ID, SETTING_KEYS.GLOBAL_PRESETS, {
    name: "Global Style Presets",
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: refreshMenu,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.SCENE_PRESETS, {
    name: "Scene Presets",
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: refreshMenu,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.ACTOR_GROUPS, {
    name: "Actor Groups",
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: refreshMenu,
  });

  game.settings.register(MODULE_ID, SETTING_KEYS.WAIT_FOR_DICE_SO_NICE, {
    name: game.i18n.localize("CINEMATIC.Setting.WaitForDSN"),
    hint: game.i18n.localize("CINEMATIC.Setting.WaitForDSNHint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
  });
}

function localizeChoices(choices) {
  return Object.fromEntries(
    Object.entries(choices).map(([key, label]) => [
      key,
      game.i18n.localize(label),
    ]),
  );
}
