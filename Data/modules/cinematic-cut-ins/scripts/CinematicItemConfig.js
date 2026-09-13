const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class CinematicItemConfig extends HandlebarsApplicationMixin(
  ApplicationV2,
) {
  constructor(options = {}) {
    super(options);
    this.itemUuid = options.itemUuid;
    this.triggers = null;
  }

  static DEFAULT_OPTIONS = {
    tag: "form",
    id: "cinematic-item-config",
    classes: ["cinematic-config"],
    window: {
      title: "Cinematic Item Settings",
      icon: "fas fa-bolt",
      resizable: true,
      width: 500,
      height: "auto",
    },
    position: { width: 500, height: "auto" },
    actions: {
      addTrigger: CinematicItemConfig.prototype._onAddTrigger,
      removeTrigger: CinematicItemConfig.prototype._onRemoveTrigger,
      save: CinematicItemConfig.prototype._onSave,
    },
  };

  static PARTS = {
    content: {
      template: "modules/cinematic-cut-ins/templates/item-config.hbs",
    },
  };

  async _prepareContext(_options) {
    const item = await fromUuid(this.itemUuid);
    if (!item) return {};

    const actor = item.actor;

    const presetsMap = actor
      ? actor.getFlag("cinematic-cut-ins", "presets") || {}
      : {};
    const presetList = Object.entries(presetsMap)
      .map(([id, data]) => ({
        id,
        name: data.presetName,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (this.triggers === null) {
      const savedConfig = item.getFlag("cinematic-cut-ins", "itemConfig") || [];
      const rawTriggers = Array.isArray(savedConfig)
        ? savedConfig
        : [savedConfig].filter((t) => t);

      this.triggers = rawTriggers.map((t) => {
        const copy = { ...t };
        if (copy.trigger === "diceCheck") {
          copy.diceValue = copy.value;
          copy.diceKeyword = copy.keyword;
        }
        return copy;
      });
    }

    const currentSystem = game.system.id;
    const hookSystems = ["dnd5e", "pf2e", "pf1"];
    const supportsHooks = hookSystems.includes(currentSystem);

    const triggerTypes = [{ value: "onUse", label: "On Use (Item Card)" }];

    if (supportsHooks) {
      triggerTypes.push(
        { value: "onAttack", label: "On Attack (System Hook)" },
        { value: "onDamage", label: "On Damage (System Hook)" },
        { value: "onCrit", label: "On Critical Hit (System Hook)" },
      );
    }

    triggerTypes.push(
      { value: "diceCheck", label: "Dice Check (Detail)" },
      { value: "formula", label: "Advanced Formula (JS)" },
      { value: "keyword", label: "Keyword (Any)" },
      { value: "rollKeyword", label: "Keyword (Roll Only)" },
    );

    const macroList = game.macros
      .map((m) => ({ id: m.id, name: m.name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      triggers: this.triggers,
      presets: presetList,
      macroList: macroList,
      triggerTypes: triggerTypes,
      itemName: item.name,
    };
  }

  _onRender(context, options) {
    super._onRender(context, options);

    this.element.querySelectorAll(".trigger-row").forEach((row) => {
      const select = row.querySelector(".trigger-type-select");
      const generalInput = row.querySelector(".input-general");
      const diceDetail = row.querySelector(".input-dice-detail");

      if (!select) return;

      const updateState = () => {
        const type = select.value;

        if (generalInput) generalInput.style.display = "none";
        if (diceDetail) diceDetail.style.display = "none";

        if (type === "diceCheck") {
          if (diceDetail) diceDetail.style.display = "flex";
        } else if (type === "formula") {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = false;
            generalInput.placeholder = "e.g. d[0] == d[1] && total >= 12";
            generalInput.type = "text";
          }
        } else if (type === "keyword" || type === "rollKeyword") {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = false;
            generalInput.placeholder = "e.g. Fireball";
          }
        } else {
          if (generalInput) {
            generalInput.style.display = "block";
            generalInput.disabled = true;
            generalInput.placeholder = "— No Input Needed —";
            generalInput.value = "";
          }
        }
      };

      select.addEventListener("change", updateState);
      updateState();
    });
  }

  _getTriggersFromForm(formData) {
    const triggers = [];
    Object.keys(formData).forEach((key) => {
      const match = key.match(/^triggers\.(\d+)\.(.*)$/);
      if (match) {
        const index = Number(match[1]);
        const field = match[2];
        if (!triggers[index]) triggers[index] = {};
        triggers[index][field] = formData[key];
      }
    });

    return triggers
      .filter((t) => t)
      .map((t) => {
        if (t.trigger === "diceCheck") {
          t.value = Number(t.diceValue) || 0;
          t.rollIndex = Number(t.rollIndex) || 0;
          t.operator = t.operator || ">=";

          if (t.diceKeyword && t.diceKeyword.trim() !== "") {
            t.keyword = t.diceKeyword.trim();
          } else {
            delete t.keyword;
          }
        } else if (t.trigger === "keyword" || t.trigger === "rollKeyword") {
          delete t.rollIndex;
          delete t.operator;
        }

        delete t.diceValue;
        delete t.diceKeyword;

        return t;
      });
  }

  async _onAddTrigger(_event, _target) {
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    this.triggers = this._getTriggersFromForm(formData);

    this.triggers.push({ trigger: "onUse", presetId: "", macroId: "" });
    this.render();
  }

  async _onRemoveTrigger(_event, target) {
    const index = Number(target.dataset.index);
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    this.triggers = this._getTriggersFromForm(formData);

    this.triggers.splice(index, 1);
    this.render();
  }

  _validateFormulas(triggers) {
    const blacklist =
      /\b(while|for|do|function|class|import|eval|window|document|setTimeout|setInterval)\b/;

    for (const t of triggers) {
      if (t.trigger === "formula" && t.value) {
        if (blacklist.test(t.value)) {
          ui.notifications.error(
            `Cinematic FX: Invalid keyword in formula. Forbidden: while, for, function, etc.`,
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
            `Cinematic FX: Formula Syntax Error. Check your logic.\n"${t.value}"`,
          );
          console.error(e);
          return false;
        }
      }
    }
    return true;
  }

  async _onSave(event, _target) {
    event.preventDefault();
    const item = await fromUuid(this.itemUuid);
    const formData = new foundry.applications.ux.FormDataExtended(this.element)
      .object;
    const finalTriggers = this._getTriggersFromForm(formData);

    if (!this._validateFormulas(finalTriggers)) {
      return;
    }

    const validTriggers = finalTriggers.filter(
      (t) =>
        (t.presetId && t.presetId !== "") || (t.macroId && t.macroId !== ""),
    );

    if (validTriggers.length > 0) {
      await item.setFlag("cinematic-cut-ins", "itemConfig", validTriggers);
      ui.notifications.info(`Cinematic FX: Settings saved for ${item.name}`);
    } else {
      await item.unsetFlag("cinematic-cut-ins", "itemConfig");
      ui.notifications.info(`Cinematic FX: Settings cleared for ${item.name}`);
    }

    this.close();
  }
}
