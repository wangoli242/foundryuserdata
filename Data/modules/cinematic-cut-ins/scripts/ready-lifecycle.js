import { CinematicSocket } from "./CinematicSocket.js";
import { CutinManager } from "./CutinManager.js";
import { CinematicConfig } from "./CinematicConfig.js";
import { CinematicControl } from "./CinematicControl.js";
import "./CinematicAllOutConfig.js";
import { AllOutManager } from "./AllOutManager.js";
import "./CinematicItemConfig.js";
import { InteractionManager } from "./InteractionManager.js";
import {
  registerMidiHooks,
  registerRsreforgedHooks,
} from "./automation/hooks.js";
import "./manual-panel-geometry.js";
import { registerSetupTour } from "./setup-tour.js";
import "./playable-presets-api.js";
import "./playback-lifecycle.js";
import { MODULE_TITLE } from "./constants.js";
import { exposeApi, registerPlaybackSocketHandler } from "./public-api.js";
import { registerReadySettings } from "./settings.js";

export function createReadyLifecycle({
  registerSettings = () => registerReadySettings(),
  initializeSocket = () => CinematicSocket.initialize(),
  initializeCutinManager = () => CutinManager.initialize(),
  initializeAllOutManager = () => AllOutManager.initialize(),
  initializeInteractionManager = () => InteractionManager.initialize(),
  registerTour = () => registerSetupTour(),
  registerPlaybackHandler = () =>
    registerPlaybackSocketHandler({ cutinManager: CutinManager }),
  exposePublicApi = () =>
    exposeApi({
      allOutManager: AllOutManager,
      cinematicConfig: CinematicConfig,
      cinematicControl: CinematicControl,
      cutinManager: CutinManager,
      interactionManager: InteractionManager,
    }),
  isMidiQolActive = () => game.modules.get("midi-qol")?.active,
  isRsreforgedActive = () => game.modules.get("rsreforged")?.active,
  registerMidiIntegration = () => registerMidiHooks(),
  registerRsreforgedIntegration = () => registerRsreforgedHooks(),
  reportReady = () => console.log(`${MODULE_TITLE} | Ready`),
} = {}) {
  return async function completeReadyLifecycle() {
    registerSettings();
    initializeSocket();
    await initializeCutinManager();
    initializeAllOutManager();
    initializeInteractionManager();
    await registerTour();
    registerPlaybackHandler();
    exposePublicApi();

    if (isMidiQolActive()) {
      registerMidiIntegration();
    } else if (isRsreforgedActive()) {
      registerRsreforgedIntegration();
    }
    reportReady();
  };
}

export const completeReadyLifecycle = createReadyLifecycle();
