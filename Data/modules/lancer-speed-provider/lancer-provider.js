class LancerTokenRuler extends foundry.canvas.placeables.tokens.TokenRuler {
  #getRanges() {
    const actor = this.token.actor;
    if (!actor) return [];
    const stunned = isStunned(actor);
    const prone = actor.statuses.has("prone");
    /** @type {boolean} */
    const startedProne = this.token.combatant
      ?.getFlag("lancer-speed-provider", "turn-status")
      ?.some((e) => e.endsWith("prone"));
    const slowed = prone || actor.statuses.has("slow");

    /**@type{number}*/
    const speed = this.token.actor.system.speed;
    const boost_bonus =
      nerveweave_boost_bonus(actor) +
      (actor.getFlag("lancer-speed-provider", "boost-bonus") ?? 0);

    // Cant move if stunned or immobilized
    if (stunned) return [];

    let value = speed;
    const ranges = [];
    if (prone || !startedProne) {
      ranges.push({
        value,
        color: game.settings.get("lancer-speed-provider", "color-standard"),
      });
      value += speed + boost_bonus;
    }
    if (!slowed) {
      ranges.push({
        value,
        color: game.settings.get("lancer-speed-provider", "color-boost"),
      });
      value += speed + boost_bonus;
    }
    if (!slowed && canOvercharge(actor)) {
      ranges.push({
        value,
        color: game.settings.get("lancer-speed-provider", "color-over-boost"),
      });
    }

    return ranges;
  }

  _getWaypointStyle(waypoint) {
    const measurement = waypoint.measurement;
    const style = super._getWaypointStyle(waypoint);
    if (style.alpha === 0) return style;
    const range = this.#getRanges().find((r) => measurement.cost <= r.value);
    if (range) style.color = range.color;
    else style.color = 0;
    return style;
  }

  _getSegmentStyle(waypoint) {
    const measurement = waypoint.measurement;
    const style = super._getSegmentStyle(waypoint);
    if (style.alpha === 0) return style;
    const range = this.#getRanges().find((r) => measurement.cost <= r.value);
    if (range && waypoint.action !== "forced") style.color = range.color;
    else style.color = 0;
    return style;
  }

  _getGridHighlightStyle(waypoint, offset) {
    const measurement = waypoint.measurement;
    const style = super._getGridHighlightStyle(waypoint, offset);
    if (style.alpha === 0) return style;
    const range = this.#getRanges().find((r) => measurement.cost <= r.value);
    if (range) style.color = range.color;
    else style.color = 0;
    return style;
  }
}

const LRITokenDocument = (TokenDocument) =>
  class extends TokenDocument {
    _inferMovementAction() {
      if (!this.actor) return "walk";
      const prone = this.actor.statuses.has("prone");
      const fly = this.actor.statuses.has("flying");
      const ignore = getIgnore(this.actor);
      const action = ignore ? "ignore" : fly ? "fly" : prone ? "crawl" : "walk";
      return action;
    }

    _onRelatedUpdate(update, options) {
      super._onRelatedUpdate(update, options);
      if (this._source.movementAction == null)
        this.movementAction = this._inferMovementAction();
    }
  };

Hooks.once("init", () => {
  game.settings.register("lancer-speed-provider", "color-standard", {
    name: "lancer-speed-provider.settings.color-standard.label",
    scope: "user",
    type: new foundry.data.fields.ColorField({ initial: "#1e88e5" }),
    config: true,
  });
  game.settings.register("lancer-speed-provider", "color-boost", {
    name: "lancer-speed-provider.settings.color-boost.label",
    scope: "user",
    type: new foundry.data.fields.ColorField({ initial: "#ffc107" }),
    config: true,
  });
  game.settings.register("lancer-speed-provider", "color-over-boost", {
    name: "lancer-speed-provider.settings.color-over-boost.label",
    scope: "user",
    type: new foundry.data.fields.ColorField({ initial: "#d81b60" }),
    config: true,
  });

  CONFIG.Token.movement.actions = foundry.utils.mergeObject(
    CONFIG.Token.movement.actions,
    {
      fly: {
        icon: "fa-solid fa-fighter-jet",
        img: "modules/lancer-speed-provider/icons/jet-fighter.svg",
      },
      crawl: {
        canSelect: (token) => token?._inferMovementAction?.() === "crawl",
      },
    },
  );

  CONFIG.Token.documentClass = LRITokenDocument(CONFIG.Token.documentClass);
  CONFIG.Token.rulerClass = LancerTokenRuler;
});

Hooks.once("setup", () => {
  const cpe = game.lancer.fromLidSync("core_power_active");
  if (!cpe) {
    Item.implementation.create({
      name: game.i18n.localize("lancer-speed-provider.statuses.core_power"),
      type: "status",
      img: "systems/lancer/assets/icons/white/corepower.svg",
      "system.lid": "core_power_active",
      "flags.lancer-speed-provider.core-status": true,
    });
  }
});

Hooks.on("preDeleteItem", (item) => {
  if (
    !item.parent &&
    item.type === "status" &&
    item.getFlag("lancer-speed-provider", "core-status")
  ) {
    ui.notifications.info(
      "Cannot delete Core Power Status with Lancer Ruler Integration active",
    );
    return false;
  }
});

Hooks.on("preCreateActiveEffect", (effect) => {
  const changes = [...effect.changes];
  const MODES = CONST.ACTIVE_EFFECT_MODES;
  if (
    effect.statuses.size === 1 &&
    effect.statuses.has("dangerzone") &&
    getFrameLid(effect.parent) === "mf_tokugawa_alt_enkidu"
  ) {
    changes.push({
      key: "system.speed",
      value: "3",
      mode: MODES.ADD,
      priority: "100",
    });
    effect.updateSource({ changes });
  } else if (
    effect.statuses.size === 1 &&
    effect.statuses.has("core_power_active") &&
    getFrameLid(effect.parent) === "mf_lycan"
  ) {
    changes.push({
      key: "system.speed",
      value: "3",
      mode: MODES.ADD,
      priority: "100",
    });
    effect.updateSource({ changes });
  } else if (
    effect.statuses.size === 1 &&
    effect.statuses.has("core_power_active") &&
    getFrameLid(effect.parent) === "mf_genghis_alt_worldkiller_genghis_mk_i"
  ) {
    changes.push({
      key: "flags.lancer-speed-provider.ignore-terrain",
      value: "true",
      mode: MODES.OVERRIDE,
      priority: "100",
    });
    effect.updateSource({ changes });
  }
});

Hooks.once("lancer.registerFlows", (steps, flows) => {
  steps.set("addCorePowerSE", async ({ actor }) => {
    if (actor.statuses.has("core_power_active")) return true;
    actor.toggleStatusEffect("core_power_active", { active: true });
    return true;
  });
  flows
    .get("CoreActiveFlow")
    ?.insertStepAfter("consumeCorePower", "addCorePowerSE");
});

Hooks.on("updateCombat", (combat, change) => {
  if (!("turn" in change) || !combat.current.tokenId) return;
  const token = game.canvas.tokens.get(combat.current.tokenId);
  if (!token?.isOwner) return;
  const combatant = combat.combatants.get(combat.current.combatantId);
  if (!combatant?.isOwner) return;
  const conditionIds = Array.from(token.actor.statuses);
  combatant.setFlag("lancer-speed-provider", "turn-status", conditionIds);
});

Hooks.on("preDeleteCombatant", (combatant) => {
  combatant.actor?.toggleStatusEffect("core_power_active", { active: false });
});

Hooks.on("preDeleteCombat", (combat) => {
  for (const c of combat.combatants) {
    c.actor?.toggleStatusEffect("core_power_active", { active: false });
  }
});

/** @returns {boolean} */
function canOvercharge(actor) {
  if (actor.is_npc()) {
    return actor.itemTypes.npc_feature.some((i) =>
      i.system.lid.startsWith("npcf_limitless"),
    );
  }
  return actor.is_mech();
}

const stunnedSet = ["stunned", "immobilized", "shutdown", "downandout"];
function isStunned(actor) {
  return stunnedSet.some((e) => actor.statuses.has(e));
}

function getFrameLid(actor) {
  return actor.system?.loadout?.frame?.value?.system?.lid ?? null;
}

function getIgnore(actor) {
  return (
    actor.getFlag("lancer-speed-provider", "ignore-terrain") ||
    (actor.is_mech() &&
      (getFrameLid(actor) === "mf_swallowtail_alt_swallowtail_ranger_variant" ||
        actor.system?.loadout?.systems.some(
          (s) =>
            s?.value?.system.lid === "ms_bulwark_mods" &&
            !s.value.system.destroyed,
        ) ||
        actor.system.pilot?.value?.items.some(
          (i) => i.system.lid === "cb_kai_bioplating",
        ))) ||
    (actor.is_npc() &&
      actor.items.some((i) =>
        [
          "npcf_bulwark_mods_spec_op",
          "npcf_bulwark_mods_barricade",
          "npcf_treads_or_hover_vehicle",
        ].includes(i.system.lid),
      ))
  );
}

function nerveweave_boost_bonus(actor) {
  if (!actor.is_mech()) return 0;
  const pilot = actor.system.pilot?.value;
  if (pilot?.items.some((i) => i.system.lid === "cb_integrated_nerveweave"))
    return 2;
  return 0;
}
