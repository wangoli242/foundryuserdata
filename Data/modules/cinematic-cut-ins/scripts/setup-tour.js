const TOUR_NAMESPACE = "cinematic-cut-ins";
const TOUR_ID = "initial-setup";
const TOUR_KEY = `${TOUR_NAMESPACE}.${TOUR_ID}`;

const STEP_PREPARE = {
  CONTROL_ACTORS: "control-actors",
  EXPAND_FIRST_ACTOR: "expand-first-actor",
  CONFIG_PRESET: "config-preset",
  CONFIG_VISUAL: "config-visual",
  CONFIG_TEXT: "config-text",
  CONFIG_TRIGGERS: "config-triggers",
};

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForSelector(selector, timeout = 1200) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const element = document.querySelector(selector);
    if (element) return element;
    await wait(50);
  }
  return null;
}

function getFirstOwnedActor() {
  return (
    game.actors
      .filter((actor) => actor.isOwner)
      .sort((a, b) => a.name.localeCompare(b.name))[0] ?? null
  );
}

class CinematicSetupTour extends foundry.nue.Tour {
  async _preStep() {
    await super._preStep();
    this._clearClickAdvance();

    const step = this.currentStep;
    if (!step) return;

    await this._prepareStep(step);
    this._scheduleClickAdvance(step);
  }

  async _postStep() {
    this._clearClickAdvance();
    if (typeof super._postStep === "function") await super._postStep();
  }

  async _prepareStep(step) {
    switch (step.prepare) {
      case STEP_PREPARE.CONTROL_ACTORS:
        await this._showControlActors();
        break;
      case STEP_PREPARE.EXPAND_FIRST_ACTOR:
        await this._showControlActors();
        await this._expandFirstActor();
        break;
      case STEP_PREPARE.CONFIG_PRESET:
        await this._showActorConfig("preset");
        break;
      case STEP_PREPARE.CONFIG_VISUAL:
        await this._showActorConfig("visual");
        break;
      case STEP_PREPARE.CONFIG_TEXT:
        await this._showActorConfig("text");
        break;
      case STEP_PREPARE.CONFIG_TRIGGERS:
        await this._showActorConfig("triggers");
        break;
    }
  }

  async _showControlActors() {
    await this._renderControlPanel();
    const actorsTab = document.querySelector(
      ".cinematic-control-wrapper [data-action='tabSwitch'][data-tab='actors']",
    );
    if (actorsTab) actorsTab.click();
    await wait(100);
  }

  async _renderControlPanel() {
    if (document.querySelector(".cinematic-control-wrapper")) return;

    const { CinematicControl } = await import("./CinematicControl.js");
    if (!this._controlApp?.rendered) this._controlApp = new CinematicControl();
    this._controlApp.render({ force: true });
    await waitForSelector(".cinematic-control-wrapper");
  }

  async _expandFirstActor() {
    const firstActorRow = document.querySelector(
      ".cinematic-control-wrapper .accordion-item:first-child",
    );
    if (!firstActorRow || firstActorRow.classList.contains("expanded")) return;

    firstActorRow.querySelector(".header-click-area")?.click();
    await wait(100);
  }

  async _showActorConfig(tab) {
    const actor = getFirstOwnedActor();
    if (!actor) return;

    if (!document.querySelector(".cinematic-config")) {
      const { CinematicConfig } = await import("./CinematicConfig.js");
      this._configApp = new CinematicConfig({ actorUuid: actor.uuid });
      this._configApp.render({ force: true });
    }

    await waitForSelector(".cinematic-config");
    await this._activateConfigTab(tab);
  }

  async _activateConfigTab(tab) {
    const tabButton = document.querySelector(
      `.cinematic-config .cinematic-tabs-nav [data-tab='${tab}']`,
    );
    if (tabButton) tabButton.click();
    await wait(100);
  }

  _scheduleClickAdvance(step) {
    if (!step.advanceOnClick || !step.selector) return;

    this._clickAdvanceTimer = window.setTimeout(() => {
      const target = document.querySelector(step.selector);
      if (!target) return;

      this._allowTargetClicks();
      const handler = () => {
        window.setTimeout(
          () => {
            if (this.currentStep?.id === step.id && this.hasNext) this.next();
          },
          Number(step.advanceDelay ?? 250),
        );
      };

      target.addEventListener("click", handler, { once: true });
      this._clickAdvanceCleanup = () =>
        target.removeEventListener("click", handler);
    }, 100);
  }

  _allowTargetClicks() {
    this._pointerState = [this.overlayElement, this.fadeElement]
      .filter(Boolean)
      .map((element) => [element, element.style.pointerEvents]);

    for (const [element] of this._pointerState) {
      element.style.pointerEvents = "none";
    }
  }

  _clearClickAdvance() {
    if (this._clickAdvanceTimer) {
      window.clearTimeout(this._clickAdvanceTimer);
      this._clickAdvanceTimer = null;
    }

    if (this._clickAdvanceCleanup) {
      this._clickAdvanceCleanup();
      this._clickAdvanceCleanup = null;
    }

    if (this._pointerState) {
      for (const [element, pointerEvents] of this._pointerState) {
        element.style.pointerEvents = pointerEvents;
      }
      this._pointerState = null;
    }
  }
}

export async function registerSetupTour() {
  if (!game.tours || !foundry.nue?.Tour?.fromJSON) {
    console.warn("Cinematic Cut-ins | Foundry Tours API is unavailable.");
    return;
  }

  if (game.tours.get(TOUR_KEY)) return;

  try {
    const tour = await CinematicSetupTour.fromJSON(
      `modules/${TOUR_NAMESPACE}/tours/${TOUR_ID}.json`,
    );
    game.tours.register(TOUR_NAMESPACE, TOUR_ID, tour);
  } catch (error) {
    console.error(
      "Cinematic Cut-ins | Failed to register setup guide tour:",
      error,
    );
  }
}

export function getSetupTour() {
  return game.tours?.get(TOUR_KEY) ?? null;
}
