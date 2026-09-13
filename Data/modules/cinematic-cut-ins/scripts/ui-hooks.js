import { MODULE_ID, SETTING_KEYS, UI_ACTION_IDS } from "./constants.js";

export function registerUiHooks({
  cinematicConfig,
  cinematicControl,
  cinematicItemConfig,
  getGame = () => globalThis.game,
  hooks = globalThis.Hooks,
} = {}) {
  let controlApp = null;

  hooks.on("getSceneControlButtons", (controls) => {
    const gameRef = getGame();
    if (!hasMinimumAccess(gameRef)) {
      return;
    }

    if (Array.isArray(controls)) {
      const tokenControls = controls.find(
        (control) => control.name === "token" || control.name === "tokens",
      );
      if (
        tokenControls &&
        !tokenControls.tools.find((tool) => tool.name === "cinematic-control")
      ) {
        tokenControls.tools.push(
          createSceneControlTool(() => openControlPanel()),
        );
      }
      return;
    }

    const tokenControls = controls.token || controls.tokens;
    if (tokenControls && !tokenControls.tools["cinematic-control"]) {
      tokenControls.tools["cinematic-control"] = createSceneControlTool(() =>
        openControlPanel(),
      );
    }
  });

  hooks.on("getHeaderControlsApplicationV2", (app, controls) => {
    const actor = app.document;
    if (!actor || actor.documentName !== "Actor" || !actor.isOwner) {
      return;
    }
    if (!hasMinimumAccess(getGame())) {
      return;
    }
    if (
      controls.some(
        (control) => control.action === UI_ACTION_IDS.CONFIGURE_ACTOR,
      )
    ) {
      return;
    }

    controls.unshift({
      label: "Cinematic FX",
      icon: "fas fa-bolt",
      class: "cinematic-config-btn",
      action: UI_ACTION_IDS.CONFIGURE_ACTOR,
      onClick: () =>
        new cinematicConfig({ actorUuid: actor.uuid }).render({ force: true }),
    });
  });

  hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
    const actor = sheet.actor;
    if (!actor || !actor.isOwner) {
      return;
    }
    if (!hasMinimumAccess(getGame())) {
      return;
    }
    if (buttons.some((button) => button.class === "cinematic-config-btn")) {
      return;
    }

    buttons.unshift({
      label: "Cinematic FX",
      class: "cinematic-config-btn",
      icon: "fas fa-bolt",
      onclick: () => {
        new cinematicConfig({ actorUuid: actor.uuid }).render(true);
      },
    });
  });

  hooks.on("getHeaderControlsApplicationV2", (app, controls) => {
    const item = app.document;
    if (!item || item.documentName !== "Item") {
      return;
    }
    if (!canConfigureItem(item, getGame())) {
      return;
    }
    if (
      controls.some(
        (control) => control.action === UI_ACTION_IDS.CONFIGURE_ITEM,
      )
    ) {
      return;
    }

    controls.unshift({
      label: "Cinematic",
      icon: "fas fa-bolt",
      class: "cinematic-item-config",
      action: UI_ACTION_IDS.CONFIGURE_ITEM,
      onClick: () => renderItemConfig(item),
    });
  });

  hooks.on("getItemSheetHeaderButtons", (sheet, buttons) => {
    const item = sheet.item;
    if (!item || !canConfigureItem(item, getGame())) {
      return;
    }
    if (buttons.some((button) => button.class === "cinematic-item-config")) {
      return;
    }

    buttons.unshift({
      label: "Cinematic",
      class: "cinematic-item-config",
      icon: "fas fa-bolt",
      onclick: () => renderItemConfig(item),
    });
  });

  function openControlPanel() {
    if (!controlApp) {
      controlApp = new cinematicControl();
    }
    controlApp.render({ force: true });
  }

  async function renderItemConfig(item) {
    new cinematicItemConfig({ itemUuid: item.uuid }).render({ force: true });
  }
}

function createSceneControlTool(onClick) {
  return {
    name: "cinematic-control",
    title: "Cinematic Control Panel",
    icon: "fas fa-bolt",
    button: true,
    onClick,
  };
}

function canConfigureItem(item, gameRef) {
  if (!gameRef.user.isGM && !item.isOwner) {
    return false;
  }
  return Boolean(item.actor) && hasMinimumAccess(gameRef);
}

function hasMinimumAccess(gameRef) {
  return (
    gameRef.user.role >=
    gameRef.settings.get(MODULE_ID, SETTING_KEYS.MIN_ACCESS_ROLE)
  );
}
