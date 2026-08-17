import "./chunk-DAAM-nuR.mjs";
//#region src/module/integrations/combat-tracker-dock.ts
function generateDescription(e) {
	if (e.is_deployable()) {
		let t = e.system.owner?.value?.name ?? null;
		if (t !== null) return `Deployer: ${t}`;
	}
	if (e.is_npc()) return (e.system.class?.system.role?.toUpperCase() ?? "UNKNOWN") + ": " + [e.system.class?.name, ...e.itemTypes.npc_template.map((e) => e.name?.toUpperCase())].join(" // ");
}
function getInitiativeDisplay(e) {
	return {
		value: e?.activations.max,
		icon: "cci cci-activate",
		rollIcon: "fas fa-triangle-exclamation"
	};
}
function getColorByDispo(e) {
	let t = game.settings.get(game.system.id, "combat-tracker-appearance");
	return e === 2 ? t.player_color : e === 1 ? t.friendly_color : e === 0 ? t.neutral_color : e === -1 ? t.enemy_color : null;
}
function getSystemIcons(e) {
	let t = [];
	for (let n = 0; n < (e.activations.value ?? 0); ++n) t.push({
		icon: "cci cci-activate",
		color: getColorByDispo(e.disposition),
		fontSize: "1.5rem",
		visible: !0,
		enabled: !0,
		callback: (e, t) => t.parent?.activateCombatant(t.id)
	});
	return e.parent?.current.combatantId === e.id && t.push({
		icon: "cci cci-deactivate",
		fontSize: "1.5rem",
		visible: !0,
		enabled: e?.isOwner,
		callback: (e, t) => t.parent?.deactivateCombatant(t.id)
	}), t;
}
//#endregion
export { generateDescription, getInitiativeDisplay, getSystemIcons };

//# sourceMappingURL=combat-tracker-dock-CRlqaNVJ.mjs.map