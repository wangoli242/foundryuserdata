export const MODULE_ID = "cinematic-cut-ins";
export const MODULE_TITLE = "Cinematic FX";

export const FLAG_KEYS = Object.freeze({
  ACTOR_PRESETS: "presets",
  ALL_OUT_PRESETS: "allOutPresets",
  TRIGGER_STATES: "triggerStates",
});

export const SETTING_KEYS = Object.freeze({
  ACTOR_GROUPS: "actorGroups",
  DISABLE_CINEMATIC_EFFECTS: "disableCinematicEffects",
  DISABLE_CLIENT: "disableClient",
  ENABLE_AUTOMATION: "enableAutomation",
  GLOBAL_PRESETS: "globalPresets",
  GROUP_SCREEN_MODE: "groupScreenMode",
  MIN_ACCESS_ROLE: "minAccessRole",
  PERSONAL_SCREEN_MODE: "personalScreenMode",
  SCENE_PRESETS: "scenePresets",
  WAIT_FOR_DICE_SO_NICE: "waitForDiceSoNice",
});

export const SOCKET_HANDLERS = Object.freeze({
  PLAY_CUT_IN: "playCutIn",
});

export const UI_ACTION_IDS = Object.freeze({
  CONFIGURE_ACTOR: "configure-cinematic-actor",
  CONFIGURE_ITEM: "configure-cinematic-item",
});
