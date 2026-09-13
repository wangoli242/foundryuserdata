import { completeReadyLifecycle } from "./ready-lifecycle.js";
import { CinematicConfig } from "./CinematicConfig.js";
import { CinematicControl } from "./CinematicControl.js";
import { CinematicItemConfig } from "./CinematicItemConfig.js";
import { registerInitSettings } from "./settings.js";
import { registerUiHooks } from "./ui-hooks.js";
import {
  registerCinematicMenuExtensionHooks,
  registerCinematicMenuProvider,
} from "./menu-extension.js";

registerCinematicMenuExtensionHooks();

Hooks.once("init", () => {
  registerInitSettings();
  registerCinematicMenuProvider();
});

Hooks.once("ready", async () => {
  await completeReadyLifecycle();
});

registerUiHooks({
  cinematicConfig: CinematicConfig,
  cinematicControl: CinematicControl,
  cinematicItemConfig: CinematicItemConfig,
});
