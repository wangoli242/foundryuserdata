class FistUltraEditionItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["fist-ultra-edition", "sheet", "item"],
    });
  }

  get template() {
    return `systems/fist-ultra-edition/templates/items/${this.item.type}-sheet.html`;
  }

  /** @override */
  getData() {
    const data = super.getData();
    const itemData = data.item;
    data.system = itemData.system;
    return data;
  }
}

async function attributeRoll(attribute) {
  let roll = new Roll(`2d6`, {});
  await roll.evaluate();

  let modifier = parseInt(attribute.value);
  let roll_total = roll.total + modifier;
  let first_dice = roll.dice[0].results[0].result;
  let second_dice = roll.dice[0].results[1].result;
  let text = "";

  let attribute_label = attribute.label;

  if (first_dice == 6 && second_dice == 6) {
    text =
      "Your roll is an <strong>ultra success</strong>! You do exactly what you wanted to do, with some spectacular added bonus";
  } else if (roll_total <= 6) {
    text =
      "Your roll is a <strong>failure</strong>. You don't do what you wanted to do, and things go wrong somehow.";
  } else if (roll_total >= 7 && roll_total <= 9) {
    text =
      "Your roll is a <strong>partial success</strong>. You do what you wanted to, but with a cost, compromise, or complication.";
  } else if (roll_total >= 10) {
    text =
      "Your roll is a <strong>success</strong>. You do exactly what you wanted to do, without any additional headaches.";
  }

  let result = await renderTemplate(
    "systems/fist-ultra-edition/templates/rolls/attribute-roll-result.html",
    {
      attribute_label: attribute_label,
      roll_dice: roll.dice[0].results,
      roll_modifier: attribute.value,
      roll_total: roll_total,
      text: text,
    }
  );
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content: result,
    rolls: [roll],
  });
  ui.chat.scrollBottom();
}

async function damageRoll(item) {
  let item_name = item.name;
  let item_damage = item.system["damage"];

  let roll = new Roll(item_damage, {});
  if (!validateDamageRoll(roll)) {
    // For now, do nothing if the damage roll is invalid
    return;
  }

  await roll.evaluate();

  let roll_dice = null;
  if (roll.terms.length != 1 || getTermType(roll.terms[0]) != "NumericTerm") {
    roll_dice = roll.terms[0].results;
  }

  let roll_modifier;
  if (roll.terms.length == 1) {
    roll_modifier = null;
  } else {
    roll_modifier = roll.terms[1].operator + roll.terms[2].number;
  }

  let roll_total = Math.max(roll.total, 0);

  let result = await renderTemplate(
    "systems/fist-ultra-edition/templates/rolls/damage-roll-result.html",
    {
      item_name: item_name,
      item_damage: item_damage,
      roll_dice: roll_dice,
      roll_modifier: roll_modifier,
      roll_total: roll_total,
    }
  );
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content: result,
    rolls: [roll],
  });
}

function getTermType(term) {
  return Object.getPrototypeOf(term).constructor.name;
}

// A damage roll should be one of the three following forms:
// - A numeric term (e.g. 3)
// - A die term (e.g. 2d6)
// - A die term, an operator term and a numeric term (e.g. 2d6+1)
function validateDamageRoll(roll) {
  if (roll.terms.length == 1) {
    let termType = getTermType(roll.terms[0]);
    return termType == "Die" || termType == "NumericTerm";
  }

  if (roll.terms.length == 3) {
    return (
      getTermType(roll.terms[0]) == "Die" &&
      getTermType(roll.terms[1]) == "OperatorTerm" &&
      getTermType(roll.terms[2]) == "NumericTerm"
    );
  }

  return false;
}

async function displayItem(item) {
  let result = await renderTemplate(
    "systems/fist-ultra-edition/templates/display/display-item.html",
    {
      item_name: item["name"],
      item_description: item["system"]["description"],
    }
  );
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content: result,
  });
  ui.chat.scrollBottom();
}

class FistUltraEditionCharacterSheet extends ActorSheet {
  /**
   * IDs for items on the sheet that have been expanded.
   * @type {Set<string>}
   * @protected
   */
  _expanded = new Set();

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["fist-ultra-edition", "sheet", "character"],
      template:
        "systems/fist-ultra-edition/templates/actors/character-sheet.html",
      width: 600,
      height: 800,
    });
  }

  /** @override */
  getData() {
    const data = super.getData();
    const actorData = this.actor.toObject(false);
    data.system = actorData.system;

    // Prepare items
    if (actorData.type == "character") {
      this._prepareCharacterItems(data);
    }

    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) {
      return;
    }

    // Add uses buttons
    html.find(".uses-counter").click((event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      if (item.system.uses.value < item.system.uses.max) {
        let update_object = {
          system: { uses: { value: item.system.uses.value + 1 } },
        };
        item.update(update_object);
      }
    });

    // Remove uses buttons
    html.find(".uses-counter").on("contextmenu", (event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      if (item.system.uses.value > item.system.uses.min) {
        let update_object = {
          system: { uses: { value: item.system.uses.value - 1 } },
        };
        item.update(update_object);
      }
    });

    // Add roll buttons
    html.find(".roll-attribute").click((event) => {
      let attributeKey = event.currentTarget.dataset.attribute;
      let attribute = this.actor.system.attributes[attributeKey];
      attributeRoll(attribute);
    });

    // Add item buttons
    html.find(".fist-item-create-skills").click(this._onSkilLCreate.bind(this));
    html
      .find(".fist-item-create-inventory")
      .click(this._openItemCreationDialog.bind(this));

    // Add attack buttons
    html.find(".fist-item-attack").click((event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      damageRoll(item);
    });

    // Edit item buttons
    html.find(".fist-item-edit").click((event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      item.sheet.render(true);
    });

    // Delete item buttons
    html.find(".fist-item-delete").click((event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      this._expanded.delete(item.id);
      item.delete();
    });

    // Display item buttons
    html.find(".fist-item-display").click((event) => {
      const boxItem = $(event.currentTarget).parents(".fist-item");
      const item = this.actor.items.get(boxItem.data("itemId"));
      displayItem(item);
    });

    // Hide or show item description
    html.find(".table-item-name").click((event) => this._onItemSummary(event));

    for (let itemId of this._expanded) {
      const boxItem = html.find(`[data-item-id="${itemId}"]`);
      const item = this.actor.items.get(itemId);
      this._expandItemDescription(boxItem, item);
      boxItem.toggleClass("expanded");
    }
  }

  _onSkilLCreate() {
    this._onIemCreate("skill");
  }

  _onIemCreate(type) {
    Item.implementation.create(
      { name: `New ${type.capitalize()}`, type: type },
      { parent: this.actor }
    );
  }

  _onItemSummary(event) {
    event.preventDefault();
    const boxItem = $(event.currentTarget).parents(".table-item");
    const item = this.actor.items.get(boxItem.data("itemId"));
    if (boxItem.hasClass("expanded")) {
      let summary = boxItem.children(".table-item-description");
      summary.slideUp(200, () => summary.remove());
      this._expanded.delete(item.id);
    } else {
      this._expandItemDescription(boxItem, item, true);
      this._expanded.add(item.id);
    }
    boxItem.toggleClass("expanded");
  }

  _expandItemDescription(boxItem, item, slide = false) {
    let itemDescription = this._getItemDescription(item);
    if (slide) {
      boxItem.append(itemDescription.hide());
      itemDescription.slideDown(200);
    } else {
      boxItem.append(itemDescription);
    }
  }

  _getItemDescription(item) {
    return $(
      `<div class="table-item-description mb-2">${
        item.system.description
          ? item.system.description
          : "<i>No description.</i>"
      }</div>`
    );
  }

  _prepareCharacterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const gear = [];
    const skills = [];

    // Iterate through items, allocating to containers
    for (let i of sheetData.items) {
      i.img = i.img || DEFAULT_TOKEN;

      let hint = "";

      if (i.system.isLimitedUses) {
        hint +=
          '&nbsp;<a class="tag uses-counter">' +
          i.system.uses.value +
          "/" +
          i.system.uses.max +
          " uses</a>";
      }

      if (i.type === "weapon") {
        hint +=
          '&nbsp;<a class="tag fist-item-attack">' +
          i.system.damage +
          " damage</a>";
      }

      if (i.type === "armor") {
        hint += '&nbsp;<span class="tag">' + i.system.armor + " armor";
        if (i.system.isAccessory) {
          hint += ", accessory";
        }
        hint += "</span>";
      }

      i.system.hint = hint;

      // "equipment" is the old name of "gear"
      // This is for backward compatibility and might be removed in a future
      // update
      if (
        i.type === "gear" ||
        i.type === "armor" ||
        i.type === "weapon" ||
        i.type === "equipment"
      ) {
        gear.push(i);
      }

      // "trait" is the old name of "skill"
      // This is for backward compatibility and might be removed in a future
      // update
      if (i.type === "skill" || i.type === "trait") {
        skills.push(i);
      }
    }

    // Assign and return
    actorData.gear = gear;
    actorData.skills = skills;
  }

  async _openItemCreationDialog() {
    const itemType = await foundry.applications.api.DialogV2.wait({
      window: { title: "New Item" },
      modal: true,
      buttons: [
        {
          label: "Gear",
          action: "gear",
        },
        {
          label: "Weapon",
          action: "weapon",
        },
        {
          label: "Armor",
          action: "armor",
        },
      ],
    });
    this._onIemCreate(itemType);
  }
}

const { BooleanField: BooleanField$2, NumberField: NumberField$3, SchemaField: SchemaField$3, StringField: StringField$4 } =
  foundry.data.fields;

class ArmorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new StringField$4({ required: true }),
      isLimitedUses: new BooleanField$2({}),
      uses: new SchemaField$3({
        value: new NumberField$3({
          integer: true,
          min: 0,
          initial: 0,
        }),
        min: new NumberField$3({
          integer: true,
          min: 0,
          initial: 0,
        }),
        max: new NumberField$3({
          integer: true,
          min: 0,
          initial: 1,
        }),
      }),
      armor: new NumberField$3({
        integer: true,
        min: 0,
        initial: 0,
      }),
      isAccessory: new BooleanField$2({}),
    };
  }
}

const { NumberField: NumberField$2, SchemaField: SchemaField$2, StringField: StringField$3 } = foundry.data.fields;

class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      pronouns: new StringField$3({}),
      role: new StringField$3({}),
      armor: new NumberField$2({
        integer: true,
        min: 0,
        initial: 0,
      }),
      warDice: new NumberField$2({
        integer: true,
        min: 0,
        initial: 0,
      }),
      hp: new SchemaField$2({
        value: new NumberField$2({
          integer: true,
          min: 0,
          initial: 6,
        }),
        min: new NumberField$2({
          integer: true,
          min: 0,
          initial: 0,
        }),
        max: new NumberField$2({
          integer: true,
          min: 0,
          initial: 6,
        }),
      }),
      attributes: new SchemaField$2({
        forceful: new SchemaField$2({
          value: new NumberField$2({
            integer: true,
            initial: 0,
          }),
          label: new StringField$3({
            initial: "FISTULTRAEDITION.Forceful",
          }),
        }),
        tactical: new SchemaField$2({
          value: new NumberField$2({
            integer: true,
            initial: 0,
          }),
          label: new StringField$3({
            initial: "FISTULTRAEDITION.Tactical",
          }),
        }),
        creative: new SchemaField$2({
          value: new NumberField$2({
            integer: true,
            initial: 0,
          }),
          label: new StringField$3({
            initial: "FISTULTRAEDITION.Creative",
          }),
        }),
        reflexive: new SchemaField$2({
          value: new NumberField$2({
            integer: true,
            initial: 0,
          }),
          label: new StringField$3({
            initial: "FISTULTRAEDITION.Reflexive",
          }),
        }),
      }),
    };
  }

  static migrateData(source) {
    // Migrate from 1.3.0 to 1.4.0 (hp.current renamed to hp.value)
    if (source.hp.current != null) {
      source.hp.value = source.hp.current;
      source.hp.current = null;
    }
  }
}

const { BooleanField: BooleanField$1, NumberField: NumberField$1, SchemaField: SchemaField$1, StringField: StringField$2 } =
  foundry.data.fields;

class GearData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new StringField$2({ required: true }),
      isLimitedUses: new BooleanField$1({}),
      uses: new SchemaField$1({
        value: new NumberField$1({
          integer: true,
          min: 0,
          initial: 0,
        }),
        min: new NumberField$1({
          integer: true,
          min: 0,
          initial: 0,
        }),
        max: new NumberField$1({
          integer: true,
          min: 0,
          initial: 1,
        }),
      }),
      damage: new StringField$2({}),
      armor: new NumberField$1({
        integer: true,
        min: 0,
        initial: 0,
      }),
    };
  }
}

const { StringField: StringField$1 } = foundry.data.fields;

class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new StringField$1({ required: true }),
    };
  }
}

const { BooleanField, NumberField, SchemaField, StringField } =
  foundry.data.fields;

class WeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new StringField({ required: true }),
      isLimitedUses: new BooleanField({}),
      uses: new SchemaField({
        value: new NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        min: new NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        max: new NumberField({
          integer: true,
          min: 0,
          initial: 1,
        }),
      }),
      damage: new StringField({ initial: "3" }),
    };
  }
}

Hooks.on("init", async function () {
  console.log(`Initializing FIST: Ultra Edition system`);

  CONFIG.Actor.dataModels.character = CharacterData;
  CONFIG.Item.dataModels.armor = ArmorData;
  CONFIG.Item.dataModels.gear = GearData;
  CONFIG.Item.dataModels.skill = SkillData;
  CONFIG.Item.dataModels.weapon = WeaponData;

  // Register actors sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("fist-ultra-edition", FistUltraEditionCharacterSheet, {
    types: ["character"],
    makeDefault: true,
  });

  // Register items sheets
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("fist-ultra-edition", FistUltraEditionItemSheet, {
    types: ["armor", "equipment", "gear", "skill", "trait", "weapon"],
    makeDefault: true,
  });
});

Handlebars.registerHelper("signedNumber", function (number) {
  if (number > 0) {
    return "+" + number;
  }
  return "" + number;
});
