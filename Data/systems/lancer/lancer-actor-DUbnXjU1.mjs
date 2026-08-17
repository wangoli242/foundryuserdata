import { a as e, i as t, s as m, t as v } from "./chunk-DAAM-nuR.mjs";
import { P as y, W as x, at as S, et as C, it as w, r as E, rt as O } from "./slidinghud-Ci-nXn7_.mjs";
import { t as k } from "./lancer-data-BbwRpIt3.mjs";
//#region src/module/enums.ts
var ee = /* @__PURE__ */ function(e) {
	return e.Condition = "Condition", e.Status = "Status", e.Effect = "Effect", e;
}({}), I = /* @__PURE__ */ function(e) {
	return e.Cool = "Cool", e.Repair = "Repair", e;
}({}), te = /* @__PURE__ */ function(e) {
	return e.Reload = "Reload", e.ClearBurn = "ClearBurn", e.ClearOwnCond = "ClearOwnCond", e.ClearOtherCond = "ClearOtherCond", e;
}({}), z = /* @__PURE__ */ function(e) {
	return e.CORE_BONUS = "core_bonus", e.DEPLOYABLE = "deployable", e.FRAME = "frame", e.MECH = "mech", e.LICENSE = "license", e.NPC = "npc", e.NPC_CLASS = "npc_class", e.NPC_TEMPLATE = "npc_template", e.NPC_FEATURE = "npc_feature", e.WEAPON_MOD = "weapon_mod", e.MECH_SYSTEM = "mech_system", e.MECH_WEAPON = "mech_weapon", e.ORGANIZATION = "organization", e.PILOT_ARMOR = "pilot_armor", e.PILOT_GEAR = "pilot_gear", e.PILOT_WEAPON = "pilot_weapon", e.PILOT = "pilot", e.RESERVE = "reserve", e.SKILL = "skill", e.STATUS = "status", e.TALENT = "talent", e.BOND = "bond", e;
}({});
function EntryTypeLidPrefix(e) {
	switch (e) {
		case "core_bonus": return "cb_";
		case "deployable": return "dep_";
		case "frame": return "mf_";
		case "mech": return "mech_";
		case "license": return "lic_";
		case "npc": return "npc_";
		case "npc_class": return "npcc_";
		case "npc_template": return "npct_";
		case "npc_feature": return "npcf_";
		case "weapon_mod": return "wm_";
		case "mech_system": return "ms_";
		case "mech_weapon": return "mw_";
		case "organization": return "org_";
		case "pilot_armor":
		case "pilot_gear":
		case "pilot_weapon": return "pg_";
		case "pilot": return "pilot_";
		case "reserve": return "reserve_";
		case "skill": return "sk_";
		case "status": return "";
		case "talent": return "t_";
		case "bond": return "bond_";
		default: return "";
	}
}
var ne = /* @__PURE__ */ function(e) {
	return e.Main = "Main", e.Heavy = "Heavy", e.AuxAux = "Aux/Aux", e.Aux = "Aux", e.MainAux = "Main/Aux", e.Flex = "Flex", e.Integrated = "Integrated", e.Superheavy = "Superheavy", e.Unknown = "Unknown", e;
}({}), re = /* @__PURE__ */ function(e) {
	return e.Trait = "Trait", e.System = "System", e.Reaction = "Reaction", e.Weapon = "Weapon", e.Tech = "Tech", e;
}({}), ie = /* @__PURE__ */ function(e) {
	return e.Quick = "Quick", e.Full = "Full", e;
}({});
function getMountType(e) {
	switch (e.toLowerCase()) {
		default:
		case "main": return "Main";
		case "heavy": return "Heavy";
		case "auxaux": return "Aux/Aux";
		case "aux": return "Aux";
		case "mainaux": return "Main/Aux";
		case "flex": return "Flex";
		case "integrated": return "Integrated";
	}
}
var B = /* @__PURE__ */ function(e) {
	return e.Auxiliary = "Auxiliary", e.Main = "Main", e.Flex = "Flex", e.Heavy = "Heavy", e.Superheavy = "Superheavy", e.Integrated = "Integrated", e;
}({});
function fittingsForMount(e) {
	switch (e) {
		case "Aux": return ["Auxiliary"];
		case "Aux/Aux": return ["Auxiliary", "Auxiliary"];
		case "Flex": return ["Flex", "Auxiliary"];
		case "Main": return ["Main"];
		case "Main/Aux": return ["Main", "Auxiliary"];
		case "Heavy": return ["Heavy"];
		case "Superheavy": return ["Superheavy"];
		case "Integrated":
		case "Unknown": return ["Integrated"];
	}
}
var q = /* @__PURE__ */ function(e) {
	return e.Aux = "Auxiliary", e.Main = "Main", e.Heavy = "Heavy", e.Superheavy = "Superheavy", e;
}({}), ae = /* @__PURE__ */ function(e) {
	return e.Rifle = "Rifle", e.Cannon = "Cannon", e.Launcher = "Launcher", e.CQB = "CQB", e.Nexus = "Nexus", e.Melee = "Melee", e;
}({}), oe = /* @__PURE__ */ function(e) {
	return e.System = "System", e.AI = "AI", e.Shield = "Shield", e.Deployable = "Deployable", e.Drone = "Drone", e.Tech = "Tech", e.Armor = "Armor", e.FlightSystem = "Flight System", e.Integrated = "Integrated", e.Mod = "Mod", e;
}({}), Q = /* @__PURE__ */ function(e) {
	return e.Turn = "Turn", e.NextTurn = "Next Turn", e.Round = "Round", e.NextRound = "Next Round", e.Scene = "Scene", e.Encounter = "Encounter", e.Mission = "Mission", e.Unknown = "?", e;
}({}), se = /* @__PURE__ */ function(e) {
	return e.None = "None", e.Passive = "Passive", e.Quick = "Quick", e.QuickTech = "Quick Tech", e.Invade = "Invade", e.Full = "Full", e.FullTech = "Full Tech", e.Other = "Other", e.Reaction = "Reaction", e.Protocol = "Protocol", e.Free = "Free", e;
}({}), ce = /* @__PURE__ */ function(e) {
	return e.Range = "Range", e.Threat = "Threat", e.Thrown = "Thrown", e.Line = "Line", e.Cone = "Cone", e.Blast = "Blast", e.Burst = "Burst", e;
}({}), le = /* @__PURE__ */ function(e) {
	return e.Kinetic = "Kinetic", e.Energy = "Energy", e.Explosive = "Explosive", e.Heat = "Heat", e.Burn = "Burn", e.Variable = "Variable", e;
}({}), ue = /* @__PURE__ */ function(e) {
	return e.Melee = "Melee", e.Ranged = "Ranged", e.Tech = "Tech", e;
}({}), de = /* @__PURE__ */ function(e) {
	return e.Balanced = "Balanced", e.Artillery = "Artillery", e.Striker = "Striker", e.Controller = "Controller", e.Support = "Support", e.Defender = "Defender", e.Specialty = "Specialty", e;
}({}), fe = /* @__PURE__ */ function(e) {
	return e.Resources = "Resources", e.Tactical = "Tactical", e.Mech = "Mech", e.Project = "Project", e.Organization = "Organization", e.Bonus = "Bonus", e;
}({}), pe = /* @__PURE__ */ function(e) {
	return e.Military = "Military", e.Scientific = "Scientific", e.Academic = "Academic", e.Criminal = "Criminal", e.Humanitarian = "Humanitarian", e.Industrial = "Industrial", e.Entertainment = "Entertainment", e.Political = "Political", e;
}({}), me = /* @__PURE__ */ "any.active_effects.rest.core_power.weapon.system.deployable.drone.move.boost.other.ram.grapple.tech_attack.hp.armor.repair.overshield.burn.structure.heat.stress.overcharge.skill_check.overwatch.skirmish.barrage.improvised_attack.disengage.stabilize.tech.lock_on.bolster.hase.hull.agility.systems.engineering.brace.cascade.pilot_weapon.mount".split("."), he = /* @__PURE__ */ function(e) {
	return e.Deployable = "Deployable", e.Drone = "Drone", e.Mine = "Mine", e;
}({}), ge = /* @__PURE__ */ function(e) {
	return e.Turn = "Turn", e.Round = "Round", e.Encounter = "Encounter", e.Scene = "Scene", e.Mission = "Mission", e.Unlimited = "Unlimited", e;
}({});
function makeWeaponTypeChecklist(e) {
	let t = e.length == 0;
	return {
		CQB: t || e.includes("CQB"),
		Cannon: t || e.includes("Cannon"),
		Launcher: t || e.includes("Launcher"),
		Melee: t || e.includes("Melee"),
		Nexus: t || e.includes("Nexus"),
		Rifle: t || e.includes("Rifle")
	};
}
function makeWeaponSizeChecklist(e) {
	let t = e.length == 0;
	return {
		Auxiliary: t || e.includes("Auxiliary"),
		Heavy: t || e.includes("Heavy"),
		Main: t || e.includes("Main"),
		Superheavy: t || e.includes("Superheavy")
	};
}
function makeSystemTypeChecklist(e) {
	let t = e.length == 0;
	return {
		System: t || e.includes("System"),
		AI: t || e.includes("AI"),
		Shield: t || e.includes("Shield"),
		Deployable: t || e.includes("Deployable"),
		Drone: t || e.includes("Drone"),
		Tech: t || e.includes("Tech"),
		Armor: t || e.includes("Armor"),
		"Flight System": t || e.includes("Flight System"),
		Integrated: t || e.includes("Integrated"),
		Mod: t || e.includes("Mod")
	};
}
//#endregion
//#region src/module/config.ts
var _e = "\n╭╮╱╱╭━━━┳━╮╱╭┳━━━┳━━━┳━━━╮\n┃┃╱╱┃╭━╮┃┃╰╮┃┃╭━╮┃╭━━┫╭━╮┃\n┃┃╱╱┃┃╱┃┃╭╮╰╯┃┃╱╰┫╰━━┫╰━╯┃\n┃┃╱╭┫╰━╯┃┃╰╮┃┃┃╱╭┫╭━━┫╭╮╭╯\n┃╰━╯┃╭━╮┃┃╱┃┃┃╰━╯┃╰━━┫┃┃╰╮\n╰━━━┻╯╱╰┻╯╱╰━┻━━━┻━━━┻╯╰━╯";
function WELCOME() {
	return "\n  <div style=\"text-align: center;\">\n    <a href=\"https://massifpress.com/legal\">\n      <img style=\"max-width: 90%; border: none\" src=\"https://massifpress.com/_next/image?url=%2Fimages%2Flegal%2Fpowered_by_Lancer-01.svg&w=640&q=75\" alt=\"Powered by Lancer\">\n    </a>\n  </div>\n\n  <p><a href=\"https://github.com/Eranziel/foundryvtt-lancer/blob/master/CHANGELOG.md\">CHANGELOG</a></p>\n\n  <p>Check out the project wiki for\n  <a href=\"https://github.com/Eranziel/foundryvtt-lancer/wiki/FAQ\">FAQ</a>,\n  <a href=\"https://github.com/Eranziel/foundryvtt-lancer/wiki/Resources\">recommended modules</a>,\n  and other information about how to use the system.</p>\n\n  <p>@UUID[Compendium.lancer.lancer_info.JournalEntry.JDfVPzoWPOLyhCCa.JournalEntryPage.LVsmG9EfKH9VpVJX]{Legal & Acknowlegements}</p>\n  <p>@UUID[Compendium.lancer.lancer_info.JournalEntry.JDfVPzoWPOLyhCCa.JournalEntryPage.gotpldNfOwLxauXi]{Migrating from Earlier Versions}</p>\n  ";
}
var ve = {
	ASCII: _e,
	log_prefix: "LANCER |",
	setting_migration_version: "systemMigrationVersion",
	setting_core_data: "coreDataVersion",
	setting_lcps: "installedLCPs",
	setting_stock_icons: "keepStockIcons",
	setting_floating_damage_numbers: "floatingNumbers",
	setting_ui_theme: "uiTheme",
	setting_pause_icon: "pauseIcon",
	setting_compcon_login: "compconLogin",
	setting_status_icons: "statusIconConfig",
	setting_automation: "automationOptions",
	setting_automation_switch: "automationSwitch",
	setting_automation_attack: "attackSwitch",
	setting_scan_outputs: "scanOutputs",
	setting_actionTracker: "actionTracker",
	setting_combat_appearance: "combat-tracker-appearance",
	setting_combat_sort: "combat-tracker-sort",
	setting_pilot_oc_heat: "autoOCHeat",
	setting_overkill_heat: "autoOKillHeat",
	setting_auto_structure: "autoCalcStructure",
	setting_dsn_setup: "dsnSetup",
	setting_square_grid_diagonals: "squareGridDiagonals",
	setting_tag_config: "tagConfig",
	setting_simple_fonts: "simpleFonts"
}, ye = {
	[z.CORE_BONUS]: "Core Bonus",
	[z.DEPLOYABLE]: "Deployable",
	[z.FRAME]: "Frame",
	[z.LICENSE]: "License",
	[z.MECH]: "Mech",
	[z.MECH_SYSTEM]: "Mech System",
	[z.MECH_WEAPON]: "Mech Weapon",
	[z.NPC]: "Npc",
	[z.NPC_CLASS]: "Npc Class",
	[z.NPC_FEATURE]: "Npc Feature",
	[z.NPC_TEMPLATE]: "Npc Template",
	[z.ORGANIZATION]: "Organization",
	[z.PILOT]: "Pilot Preset",
	[z.PILOT_ARMOR]: "Pilot Armor",
	[z.PILOT_GEAR]: "Pilot Gear",
	[z.PILOT_WEAPON]: "Pilot Weapon",
	[z.RESERVE]: "Reserve",
	[z.SKILL]: "Skill",
	[z.STATUS]: "Status/Condition",
	[z.TALENT]: "Talent",
	[z.BOND]: "Bond",
	[z.WEAPON_MOD]: "Weapon Mod"
}, be = {
	[z.CORE_BONUS]: "Core Bonuses",
	[z.DEPLOYABLE]: "Deployables",
	[z.FRAME]: "Frames",
	[z.LICENSE]: "Licenses",
	[z.MECH]: "Mechs",
	[z.MECH_SYSTEM]: "Mech Systems",
	[z.MECH_WEAPON]: "Mech Weapons",
	[z.NPC]: "Npcs",
	[z.NPC_CLASS]: "Npc Classes",
	[z.NPC_FEATURE]: "Npc Features",
	[z.NPC_TEMPLATE]: "Npc Templates",
	[z.ORGANIZATION]: "Organizations",
	[z.PILOT]: "Pilot Presets",
	[z.PILOT_ARMOR]: "Pilot Armor",
	[z.PILOT_GEAR]: "Pilot Gear",
	[z.PILOT_WEAPON]: "Pilot Weapons",
	[z.RESERVE]: "Reserves",
	[z.SKILL]: "Skills",
	[z.STATUS]: "Statuses / Conditions",
	[z.TALENT]: "Talents",
	[z.BOND]: "Bonds",
	[z.WEAPON_MOD]: "Weapon Mods"
};
function friendly_entrytype_name(e, t) {
	return (t ?? 1) > 1 ? be[e] ?? `Unknown <${e}>s` : ye[e] ?? `Unknown <${e}>`;
}
function TypeIcon(e, t) {
	let m = Wn.includes(e) ? "Actor" : "Item";
	return getDocumentClass(m).getDefaultArtwork({ type: e }).img;
}
function replaceDefaultResource(e, ...t) {
	if (!e?.trim() || e.includes("systems/lancer") || e == "icons/svg/mystery-man.svg") {
		for (let e of t) if (e?.trim()) return e;
		return e || "";
	}
	return e;
}
//#endregion
//#region src/module/models/bits/range.ts
var xe = foundry.data.fields, Se = class Range {
	constructor(e) {
		this.type = e.type, this.val = e.val;
	}
	save() {
		return {
			type: this.type,
			val: this.val
		};
	}
	copy() {
		return new Range(this.save());
	}
	get formatted() {
		return `${this.type} ${this.val}`;
	}
	get icon() {
		return Range.IconFor(this.type);
	}
	get discord_emoji() {
		return Range.DiscordEmojiFor(this.type);
	}
	static DiscordEmojiFor(e) {
		switch (e) {
			case ce.Range:
			case ce.Threat:
			case ce.Thrown: return `:cc_${e.toLowerCase()}:`;
		}
		return `:cc_aoe_${e.toLowerCase()}:`;
	}
	static IconFor(e) {
		return `cci-${e.toLowerCase()}`;
	}
	static MakeChecklist(e) {
		let t = e.length == 0;
		return {
			Blast: t || e.includes(ce.Blast),
			Burst: t || e.includes(ce.Burst),
			Cone: t || e.includes(ce.Cone),
			Line: t || e.includes(ce.Line),
			Range: t || e.includes(ce.Range),
			Thrown: t || e.includes(ce.Thrown),
			Threat: t || e.includes(ce.Threat)
		};
	}
	static FlattenChecklist(e) {
		return Object.keys(e).filter((t) => e[t]);
	}
	static CombineLists(e, t) {
		let m = e.map((e) => e.copy());
		for (let e of t) {
			let t = m.find((t) => t.type == e.type);
			t ? t.val += e.val : m.push(e.copy());
		}
		return m;
	}
}, defineRangeFieldSchema = () => ({
	type: new xe.StringField({
		choices: Object.values(ce),
		initial: ce.Range
	}),
	val: new xe.NumberField({
		min: 0,
		integer: !0,
		initial: 1,
		nullable: !1
	})
}), RangeField = class extends xe.SchemaField {
	constructor(e) {
		super(defineRangeFieldSchema(), e);
	}
	initialize(e, t) {
		return new Se(e);
	}
	migrateSource(e, t) {
		return typeof t.val == "string" && (t.val = parseInt(t.val) || 1), t.type &&= restrict_enum(ce, ce.Range, t.type), super.migrateSource(e, t);
	}
	_cast(e) {
		return e instanceof Se ? e.save() : super._cast(e);
	}
};
function unpackRange(e) {
	return {
		type: e.type?.capitalize() ?? ce.Range,
		val: Number.parseInt(e.val?.toString() ?? "0") || 0
	};
}
//#endregion
//#region src/module/util/migrations.ts
function coarseLIDtoUUID(e) {
	let t = game.data.actors?.find((t) => t.system?.lid == e);
	if (t?._id) return `Actor.${t._id}`;
	let m = game.data.items?.find((t) => t.system?.lid == e);
	return m?._id ? `Item.${m._id}` : null;
}
function regRefToUuid(e, t) {
	return t ? typeof t == "string" ? t : !t.id && t.fallback_lid ? coarseLIDtoUUID(t.fallback_lid) : !t.id || !t.reg_name || t.reg_name == "comp_core" ? null : t.reg_name == "game" ? `${e}.${t.id}` : t.reg_name.startsWith("game|") ? `Actor.${t.reg_name.split("game|")[1]}.Item.${t.id}` : (console.error("Failed to process regref", t), null) : null;
}
function regRefToId(e, t) {
	let m = regRefToUuid(e, t);
	if (m) {
		let e = m.split(".");
		return e[e.length - 1];
	}
	return null;
}
function regRefToLid(e) {
	return e ? typeof e == "string" ? e : e.fallback_lid || null : null;
}
function convertNpcStats(e) {
	let t = [], m = {
		activations: "activations",
		agility: "agi",
		agi: "agi",
		armor: "armor",
		edef: "edef",
		evade: "evasion",
		evasion: "evasion",
		engineering: "eng",
		eng: "eng",
		heatcap: "heatcap",
		hp: "hp",
		hull: "hull",
		save: "save",
		sensor: "sensor_range",
		sensor_range: "sensor_range",
		size: "size",
		speed: "speed",
		stress: "stress",
		structure: "structure",
		systems: "sys",
		sys: "sys"
	};
	for (let v = 0; v < 3; v++) {
		let giv = (t) => {
			let m = e[t] ?? null;
			if (!(typeof m == "number" || Array.isArray(m))) return null;
			m = Array.isArray(m) ? m : [m], m = m.length == 0 ? [0] : m;
			let y = v >= m.length ? m[m.length - 1] : m[v], x = Array.isArray(y) ? y[0] : y;
			return typeof x == "number" ? x : null;
		}, y = {};
		for (let t of Object.keys(e)) {
			let e = giv(t);
			e && (y[m[t]] = e);
		}
		t.push(y);
	}
	return t;
}
//#endregion
//#region src/module/models/shared.ts
var Ce = foundry.data.fields, LancerDataModel = class extends foundry.abstract.TypeDataModel {
	full_update_data(e) {
		return fancy_merge_data({ system: foundry.utils.duplicate(this._source) }, e);
	}
	prepareBaseData() {
		this.finalize_tasks();
	}
	add_pre_finalize_task(e) {
		this._pre_finalize_tasks ??= [], this._pre_finalize_tasks.push(e);
	}
	finalize_tasks() {
		this._pre_finalize_tasks?.forEach((e) => e()), this._pre_finalize_tasks = [];
	}
};
function fancy_merge_data(e, t) {
	if (e == null) throw Error("Cannot merge with null or undefined - try again");
	if (typeof e == "number" || typeof e == "string" || typeof e == "boolean") return t;
	for (let [m, v] of Object.entries(t)) {
		m = formatDotpath(m);
		let t = m.startsWith("-=");
		t && (m = m.slice(2));
		let y = m.indexOf(".");
		if (y != -1) {
			if (t) throw Error("'-=' in dotpath must go at penultimate pathlet. E.x. 'system.whatever.-=val'");
			let x = m.slice(0, y), S = m.slice(y + 1), C = e[x];
			C ? e[x] = fancy_merge_data(C, { [S]: v }) : e[x] = { [S]: v };
		} else t ? Array.isArray(e) ? e.splice(parseInt(m), 1) : typeof e == "object" ? delete e[m] : console.warn("'-=' in update may only target Object or Array items") : e[m] = v;
	}
	return e;
}
var LIDField = class extends Ce.StringField {
	static get _defaults() {
		return {
			...super._defaults,
			required: !0
		};
	}
	_cast(e) {
		return regRefToLid(e) || (e.lid && (e = e.lid), e.system?.lid && (e = e.system.lid), console.warn("If passing an object as a value for an LIDField, object must have an `lid` or `system.lid` property"), e);
	}
	_validateType(e) {
		try {
			super._validateType(e);
		} catch {
			return new foundry.data.validation.DataModelValidationFailure({
				invalidValue: e,
				message: `Not a valid LID ${e}`
			});
		}
	}
}, EmbeddedRefField = class extends Ce.StringField {
	constructor(e, t) {
		super(t), this.document_type = e, this.allowed_types = t?.allowed_types ?? null;
	}
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			initial: null,
			blank: !1,
			trim: !0,
			nullable: !0
		});
	}
	_cast(e) {
		return regRefToId(this.document_type, e) || (e?.id && (e = e.id), e?.value !== void 0 && (e = e.value), e?.id && (e = e.id), e);
	}
	initialize(e, t) {
		if (super.initialize, !e) return null;
		let m = { id: e };
		return t.add_pre_finalize_task(() => {
			let v = t?.parent?.getEmbeddedDocument(this.document_type, e) ?? null;
			v ? this.allowed_types && v instanceof Dt && !this.allowed_types.includes(v.type) ? (console.log(`Failed to resolve embedded ref: Wrong type ${v.type} not in ${this.allowed_types.join("|")}`, t, e), m.status = "missing", m.value = null) : (m.status = "resolved", m.value = v) : (console.log("Failed to resolve embedded ref: ID not found.", t, e), m.status = "missing", m.value = null);
		}), m;
	}
}, SyncUUIDRefField = class extends Ce.StringField {
	constructor(e, t = {}) {
		super(t), this.document_type = e, this.allowed_types = t.allowed_types ?? null;
	}
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			initial: null,
			blank: !1,
			trim: !0,
			nullable: !0
		});
	}
	_cast(e) {
		return regRefToUuid(this.document_type, e) || (e?.uuid && (e = e.uuid), e?.value !== void 0 && (e = e.value), e?.uuid && (e = e.uuid), e);
	}
	_validateType(e) {
		try {
			if (super._validateType(e), e) return foundry.utils.parseUuid(e), !0;
		} catch {
			return new foundry.data.validation.DataModelValidationFailure({
				invalidValue: e,
				message: `Not a valid uuid ${e}`
			});
		}
	}
	initialize(e, t) {
		if (!e) return null;
		let m = { id: e };
		return t.add_pre_finalize_task(() => {
			let v = fromUuidSync(e);
			v ? this.allowed_types && !this.allowed_types.includes(v.type) ? (console.error(`Failed to resolve uuid ref: Wrong type ${v.type} not in ${this.allowed_types.join("|")}`, t, e), m.status = "missing", m.value = null) : (m.status = "resolved", Object.defineProperty(m, "value", {
				value: v,
				enumerable: !1
			})) : (console.error(`Failed to resolve uuid ref: Not found ${e}`, t, e), m.status = "missing", m.value = null);
		}), m;
	}
}, FakeBoundedNumberField = class extends Ce.NumberField {
	constructor(e = {}) {
		super(e);
	}
	initialize(e, t) {
		return {
			min: this.options?.min ?? 0,
			max: this.options?.max ?? 0,
			value: e
		};
	}
	_cast(e) {
		return typeof e == "object" && (e = e.value ?? 0), super._cast(e);
	}
}, defineFullBoundedNumberFieldSchema = (e) => ({
	min: new Ce.NumberField({
		integer: !0,
		nullable: !1,
		initial: e?.min ?? 0
	}),
	max: new Ce.NumberField({
		integer: !0,
		nullable: !1,
		initial: e?.max ?? we.defaultMax
	}),
	value: new Ce.NumberField({
		integer: !0,
		nullable: !1,
		initial: e?.initialValue ?? 0
	})
}), we = class FullBoundedNumberField extends Ce.SchemaField {
	static {
		this.defaultValue = 10;
	}
	static {
		this.defaultMax = 10;
	}
	constructor(e) {
		super(defineFullBoundedNumberFieldSchema(e), e);
	}
	initialize(e, t) {
		return {
			min: e.min ?? this.options?.min ?? 0,
			max: e.max ?? this.options?.max ?? e.value ?? FullBoundedNumberField.defaultMax,
			value: e.value ?? this.options?.initial ?? 0
		};
	}
	_cast(e) {
		if (typeof e == "number" && (e = {
			value: e,
			min: this.options?.min ?? 0,
			max: this.options?.max ?? FullBoundedNumberField.defaultMax
		}), typeof e == "string") {
			let t = FullBoundedNumberField.defaultValue;
			try {
				t = parseFloat(e);
			} catch {
				console.warn(`Failed to parse number from string ${e}`);
			}
			e = {
				value: t,
				min: this.options?.min ?? 0,
				max: this.options?.max ?? FullBoundedNumberField.defaultMax
			};
		}
		return (e.min == null || e.min == null) && (e.min = this.options?.min ?? 0), (e.max == null || e.max == null) && (e.max = this.options?.max ?? e.value ?? FullBoundedNumberField.defaultMax), super._cast(e);
	}
}, ChecklistField = class extends Ce.SchemaField {
	constructor(e, t = {}) {
		let m = {};
		for (let t of Object.values(e)) m[t] = new Ce.BooleanField({ initial: !0 });
		super(m, t);
	}
}, DamageTypeChecklistField = class extends ChecklistField {
	constructor(e = {}) {
		super(le, e);
	}
}, RangeTypeChecklistField = class extends ChecklistField {
	constructor(e = {}) {
		super(ce, e);
	}
}, WeaponTypeChecklistField = class extends ChecklistField {
	constructor(e = {}) {
		super(ae, e);
	}
}, WeaponSizeChecklistField = class extends ChecklistField {
	constructor(e = {}) {
		super(q, e);
	}
}, SystemTypeChecklistField = class extends ChecklistField {
	constructor(e = {}) {
		super(oe, e);
	}
}, defineNpcStatBlockFields = (e) => ({
	activations: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 1
	}),
	armor: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	hp: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 10
	}),
	evasion: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 5
	}),
	edef: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 8
	}),
	heatcap: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	speed: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 3
	}),
	sensor_range: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 10
	}),
	save: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 10
	}),
	hull: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	agi: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	sys: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	eng: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 0
	}),
	size: new Ce.NumberField({
		integer: !1,
		nullable: e,
		minimum: .5,
		initial: e ? null : 1
	}),
	structure: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 1
	}),
	stress: new Ce.NumberField({
		integer: !0,
		nullable: e,
		initial: e ? null : 1
	})
}), NpcStatBlockField = class extends Ce.SchemaField {
	constructor(e) {
		super(defineNpcStatBlockFields(e.nullable), e);
	}
};
Ce.ArrayField;
//#endregion
//#region src/module/models/bits/tag.ts
var Te = foundry.data.fields, Ee = "...", De = class Tag {
	constructor(e) {
		this.name = Ee, this.description = "Tag not found", this.hidden = !1, this.lid = e.lid, this.val = e.val;
		let t = game.settings.get(game.system.id, ve.setting_tag_config)[e.lid];
		t && (this.name = t.name, this.description = t.description, this.hidden = t.hidden);
	}
	get num_val() {
		let e = Number.parseInt(this.val);
		return Number.isNaN(e) ? null : e;
	}
	tierVal(e) {
		if (!this.val) return "";
		let t = this.val.match(/^{(\d*)\/(\d*)\/(\d*)}$/i);
		return !t || !t.length || !t[0] || !t[e] ? this.val : t[e];
	}
	save() {
		return {
			lid: this.lid,
			val: this.val
		};
	}
	copy() {
		return new Tag(this.save());
	}
	get should_show() {
		return !this.hidden;
	}
	get is_unique() {
		return this.lid === "tg_unique";
	}
	get is_ai() {
		return this.lid === "tg_ai";
	}
	get is_ap() {
		return this.lid === "tg_ap";
	}
	get is_limited() {
		return this.lid === "tg_limited";
	}
	get is_loading() {
		return this.lid === "tg_loading";
	}
	get is_recharge() {
		return this.lid === "tg_recharge";
	}
	get is_indestructible() {
		return this.lid === "tg_indestructible";
	}
	get is_smart() {
		return this.lid === "tg_smart";
	}
	get is_seeking() {
		return this.lid === "tg_seeking";
	}
	get is_thrown() {
		return this.lid === "tg_thrown";
	}
	get is_overkill() {
		return this.lid === "tg_overkill";
	}
	get is_accurate() {
		return this.lid === "tg_accurate";
	}
	get is_inaccurate() {
		return this.lid === "tg_inaccurate";
	}
	get is_reliable() {
		return this.lid === "tg_reliable";
	}
	get is_selfheat() {
		return this.lid === "tg_heat_self";
	}
	get is_knockback() {
		return this.lid === "tg_knockback";
	}
	get is_overshield() {
		return this.lid === "tg_overshield";
	}
	get is_cascaderesistant() {
		return this.lid === "tg_no_cascade";
	}
	get is_ordnance() {
		return this.lid === "tg_ordnance";
	}
	static MergeTags(...e) {
		if (!e.length) return [];
		let t = [], m = {};
		for (let v of e.flat()) {
			let e = m[v.lid];
			if (e) v.is_reliable || v.is_selfheat || v.is_knockback || v.is_overshield ? e.val = ((e.num_val ?? 0) + (v.num_val ?? 0)).toString() : v.is_accurate || v.is_inaccurate ? t.push(v.copy()) : v.is_limited ? e.val = Math.min(e.num_val ?? 0, v.num_val ?? 0).toString() : v.is_recharge && (e.val = Math.max(e.num_val ?? 0, v.num_val ?? 0).toString());
			else {
				let e = v.copy();
				m[v.lid] = e, t.push(e);
			}
		}
		return t;
	}
}, defineTagFieldSchema = () => ({
	lid: new LIDField(),
	val: new Te.StringField({ nullable: !1 })
}), TagField = class extends Te.SchemaField {
	constructor(e) {
		super(defineTagFieldSchema(), e);
	}
	initialize(e, t) {
		return new De(e);
	}
	_cast(e) {
		return e.num_val && (e.val = String(e.num_val)), e instanceof De ? e : super._cast(e);
	}
	migrateSource(e, t) {
		return typeof t?.tag == "object" && (t.lid = t.tag.fallback_lid), super.migrateSource(e, t);
	}
};
function unpackTagTemplate(e) {
	return {
		description: e.description,
		filter_ignore: e.filter_ignore ?? !1,
		hidden: e.hidden ?? !1,
		lid: e.id,
		name: e.name
	};
}
function unpackTag(e) {
	return {
		lid: e.id,
		val: (e.val ?? "").toString()
	};
}
//#endregion
//#region src/module/apps/action-tracker-settings.ts
var { ApplicationV2: Oe, HandlebarsApplicationMixin: ke } = foundry.applications.api, ActionTrackerConfig = class extends ke(Oe) {
	static {
		this.PARTS = {
			form: { template: "systems/lancer/templates/settings/action-tracker-config.hbs" },
			footer: { template: "templates/generic/form-footer.hbs" }
		};
	}
	static {
		this.DEFAULT_OPTIONS = {
			id: "lancer-action-tracker-settings",
			tag: "form",
			position: { width: 550 },
			window: {
				title: "lancer.actionTracker.menu-label",
				contentClasses: ["standard-form"]
			},
			form: {
				handler: this.#e,
				submitOnChange: !1,
				closeOnSubmit: !0
			},
			actions: { onReset: this.#t }
		};
	}
	async _prepareContext(e) {
		let t = game.settings.get(game.system.id, ve.setting_actionTracker);
		return {
			config: e.loadDefault ? new ActionTrackerOptions() : t,
			fields: t.schema.fields,
			buttons: [{
				type: "submit",
				name: "submit",
				icon: "fas fa-save",
				label: "Save"
			}, {
				type: "button",
				name: "reset",
				icon: "fas fa-undo",
				label: "SETTINGS.Reset",
				action: "onReset"
			}]
		};
	}
	static async #e(e, t, m) {
		let v = m.object;
		await game.settings.set(game.system.id, ve.setting_actionTracker, v);
	}
	static async #t() {
		this.render(!1, { loadDefault: !0 });
	}
}, { ApplicationV2: Ae, HandlebarsApplicationMixin: je } = foundry.applications.api, AutomationConfig = class extends je(Ae) {
	static {
		this.PARTS = {
			form: { template: "systems/lancer/templates/settings/automation-config.hbs" },
			footer: { template: "templates/generic/form-footer.hbs" }
		};
	}
	static {
		this.DEFAULT_OPTIONS = {
			id: "lancer-automation-settings",
			tag: "form",
			position: { width: 550 },
			window: {
				title: "lancer.automation.menu-label",
				contentClasses: ["standard-form"]
			},
			form: {
				handler: this.#e,
				submitOnChange: !1,
				closeOnSubmit: !0
			},
			actions: {
				onLoadEmpty: this.#n,
				onReset: this.#t
			}
		};
	}
	async _prepareContext(e) {
		super._prepareContext;
		let t = game.settings.get(game.system.id, ve.setting_automation), m = new AutomationOptions();
		Object.keys(m).forEach((e) => m[e] = !1);
		let v = {
			config: e.loadDefault ? new AutomationOptions() : e.loadEmpty ? m : t,
			fields: t.schema.fields,
			buttons: [
				{
					type: "submit",
					name: "submit",
					icon: "fas fa-save",
					label: "Save"
				},
				{
					type: "button",
					name: "reset",
					icon: "fas fa-undo",
					label: "SETTINGS.Reset",
					action: "onReset"
				},
				{
					type: "button",
					name: "clear",
					icon: "fas fa-cancel",
					label: "Clear All",
					action: "onLoadEmpty"
				}
			]
		};
		return e.loadEmpty = !1, e.loadDefault = !1, v;
	}
	static async #e(e, t, m) {
		let v = m.object;
		await game.settings.set(game.system.id, ve.setting_automation, v);
	}
	static async #t() {
		this.render(!1, { loadDefault: !0 });
	}
	static async #n() {
		this.render(!1, { loadEmpty: !0 });
	}
}, { ApplicationV2: Me, HandlebarsApplicationMixin: Ne } = foundry.applications.api, StatusIconConfig = class extends Ne(Me) {
	static {
		this.PARTS = {
			form: { template: "systems/lancer/templates/settings/status-icon-settings.hbs" },
			footer: { template: "templates/generic/form-footer.hbs" }
		};
	}
	static {
		this.DEFAULT_OPTIONS = {
			id: "lancer-status-icon-settings",
			tag: "form",
			position: { width: 650 },
			window: {
				title: "lancer.statusIconsConfig.menu-label",
				contentClasses: ["standard-form"]
			},
			form: {
				handler: this.#e,
				submitOnChange: !1,
				closeOnSubmit: !0
			},
			actions: { onReset: this.#t }
		};
	}
	async _prepareContext(e) {
		let t = game.settings.get(game.system.id, ve.setting_status_icons);
		return {
			config: e.loadDefault ? new StatusIconConfigOptions() : t,
			fields: t.schema.fields,
			buttons: [{
				type: "submit",
				name: "submit",
				icon: "fas fa-save",
				label: "Save"
			}, {
				type: "button",
				name: "reset",
				icon: "fas fa-undo",
				label: "SETTINGS.Reset",
				action: "onReset"
			}]
		};
	}
	static async #e(e, t, m) {
		let v = m.object;
		await game.settings.set(game.system.id, ve.setting_status_icons, v);
	}
	static async #t() {
		this.render(!1, { loadDefault: !0 });
	}
};
//#endregion
//#region src/module/combat/lancer-combat-tracker.ts
foundry.applications.ux.ContextMenu;
var Pe = class LancerCombatTracker extends foundry.applications.sidebar.tabs.CombatTracker {
	static {
		this.DEFAULT_OPTIONS = { actions: {
			activateCombatantTurn: LancerCombatTracker.#e,
			deactivateCombatantTurn: LancerCombatTracker.#t
		} };
	}
	static {
		this.PARTS = foundry.utils.mergeObject(foundry.applications.sidebar.tabs.CombatTracker.PARTS, { tracker: { template: "systems/lancer/templates/combat/tracker.hbs" } }, { inplace: !1 });
	}
	async _prepareTrackerContext(e, t) {
		let m = game.settings.get(game.system.id, ve.setting_combat_appearance), v = {
			[-2]: "",
			[-1]: "enemy",
			0: "neutral",
			1: "friendly",
			2: "player"
		};
		await super._prepareTrackerContext(e, t), e.turns = e.turns?.map((e) => {
			let t = this.viewed?.getEmbeddedDocument("Combatant", e.id, {}), y = Array.from(Array(t?.system.activations.value ?? 0), () => ({
				icon: m.icon,
				action: "activateCombatantTurn"
			}));
			return t === this.viewed?.combatant && y.push({
				icon: m.deactivate,
				action: "deactivateCombatantTurn"
			}), {
				...e,
				css: `${e.css} ${v[t.disposition]}`.trim(),
				buttons: y,
				activations: t?.system.activations.max,
				pending: t?.system.activations.value
			};
		}), game.settings.get(game.system.id, ve.setting_combat_sort) && e?.turns != null && e.turns.sort(function(e, t) {
			let m = e.css.indexOf("active") === -1 ? 0 : 1, v = t.css.indexOf("active") === -1 ? 0 : 1;
			return v - m === 0 ? (e.pending === 0) - +(t.pending === 0) : v - m;
		});
	}
	static async #e(e, t) {
		e.stopPropagation(), e.preventDefault();
		let { combatantId: m } = t.closest("[data-combatant-id]")?.dataset ?? {};
		this.viewed?.activateCombatant(m);
	}
	static async #t(e, t) {
		e.stopPropagation(), e.preventDefault();
		let { combatantId: m } = t.closest("[data-combatant-id]")?.dataset ?? {};
		this.viewed?.deactivateCombatant(m);
	}
	async _onActivateCombatant(e) {
		e.preventDefault(), e.stopPropagation();
		let t = e.currentTarget, m = t.closest(".combatant")?.dataset.combatantId;
		if (m) switch (t.dataset.control) {
			case "deactivateCombatant":
				await this.viewed.deactivateCombatant(m);
				break;
			case "activateCombatant":
				await this.viewed.activateCombatant(m);
				break;
		}
	}
	async _onAddActivation(e) {
		await this.viewed.getEmbeddedDocument("Combatant", e.data("combatant-id"), {}).addActivations(1);
	}
	async _onRemoveActivation(e) {
		await this.viewed.getEmbeddedDocument("Combatant", e.data("combatant-id"), {}).addActivations(-1);
	}
	async _onUndoActivation(e) {
		await this.viewed.getEmbeddedDocument("Combatant", e.data("combatant-id"), {}).modifyCurrentActivations(1);
	}
	_getEntryContextOptions() {
		let getCombatant = (e) => this.viewed?.combatants.get(e.dataset.combatantId), e = [
			{
				name: "LANCERINITIATIVE.AddActivation",
				icon: "<i class=\"fas fa-plus\"></i>",
				callback: (e) => getCombatant(e)?.addActivations(1)
			},
			{
				name: "LANCERINITIATIVE.RemoveActivation",
				icon: "<i class=\"fas fa-minus\"></i>",
				callback: (e) => getCombatant(e)?.addActivations(-1)
			},
			{
				name: "LANCERINITIATIVE.UndoActivation",
				icon: "<i class=\"fas fa-undo\"></i>",
				callback: (e) => this.viewed?.deactivateCombatant(e.dataset.combatantId).then(() => getCombatant(e)?.modifyCurrentActivations(1))
			}
		];
		return e.push(...super._getEntryContextOptions().filter((e) => e.name !== "COMBAT.CombatantReroll")), e;
	}
};
function setAppearance(e) {
	e && (document.documentElement.style.setProperty("--lancer-initiative-icon-size", `${e.icon_size}rem`), document.documentElement.style.setProperty("--lancer-initiative-player-color", e.player_color?.toString() ?? null), document.documentElement.style.setProperty("--lancer-initiative-friendly-color", e.friendly_color?.toString() ?? null), document.documentElement.style.setProperty("--lancer-initiative-neutral-color", e?.neutral_color?.toString() ?? null), document.documentElement.style.setProperty("--lancer-initiative-enemy-color", e?.enemy_color?.toString() ?? null), document.documentElement.style.setProperty("--lancer-initiative-done-color", e?.done_color?.toString() ?? null), game.combats?.render());
}
//#endregion
//#region src/module/themes.ts
var Fe = {
	gms: "theme-gms-red",
	gmsDark: "theme-gms-dark",
	msmc: "theme-msmc",
	horus: "theme-horus",
	ha: "theme-ha",
	ssc: "theme-ssc",
	ipsn: "theme-ipsn",
	gal: "theme-galsim"
};
function applySimpleFonts(e) {
	let t = document.querySelector("body");
	t && t.classList.toggle("lancer-simple-fonts", e);
}
function applyTheme(e) {
	let t = document.querySelector("body");
	t && (t.classList.remove(...Object.values(Fe)), t.classList.add(Fe[e]));
}
//#endregion
//#region src/module/settings.ts
var Ie = foundry.data.fields, registerSettings = function() {
	game.settings.register(game.system.id, ve.setting_migration_version, {
		name: "System Migration Version",
		scope: "world",
		config: !1,
		type: String,
		default: "0"
	}), game.settings.register(game.system.id, ve.setting_core_data, {
		name: "Lancer Data Version",
		scope: "world",
		config: !1,
		type: String,
		default: ""
	}), game.settings.register(game.system.id, ve.setting_lcps, {
		name: "Installed LCPs",
		scope: "world",
		config: !1,
		type: Object,
		default: { index: [] }
	}), game.settings.register(game.system.id, ve.setting_tag_config, {
		name: "Tags",
		scope: "world",
		config: !1,
		type: Object,
		default: {}
	}), game.settings.register(game.system.id, ve.setting_floating_damage_numbers, {
		name: "lancer.floatingDamageNumbers.name",
		hint: "lancer.floatingDamageNumbers.hint",
		scope: "client",
		config: !0,
		type: Boolean,
		default: !1
	}), game.settings.register(game.system.id, ve.setting_simple_fonts, {
		name: "lancer.simpleFonts.name",
		hint: "lancer.simpleFonts.hint",
		scope: "client",
		config: !0,
		type: Boolean,
		default: !1,
		onChange: (e) => applySimpleFonts(e)
	}), game.settings.register(game.system.id, ve.setting_ui_theme, {
		name: "lancer.uiTheme.name",
		hint: "lancer.uiTheme.hint",
		scope: "client",
		config: !0,
		type: new foundry.data.fields.StringField({
			required: !0,
			choices: {
				gms: "lancer.uiTheme.gms",
				gmsDark: "lancer.uiTheme.gmsDark",
				msmc: "lancer.uiTheme.msmc",
				horus: "lancer.uiTheme.horus",
				ha: "lancer.uiTheme.ha",
				ssc: "lancer.uiTheme.ssc",
				ipsn: "lancer.uiTheme.ipsn",
				gal: "lancer.uiTheme.gal"
			},
			initial: "gms"
		}),
		onChange: (e) => {
			!e || ![
				"gms",
				"gmsDark",
				"msmc",
				"horus",
				"ha",
				"ssc",
				"ipsn",
				"gal"
			].includes(e) ? applyTheme("gms") : applyTheme(e);
		}
	}), game.settings.register(game.system.id, ve.setting_pause_icon, {
		name: "lancer.pauseIcon.name",
		hint: "lancer.pauseIcon.hint",
		scope: "world",
		config: !0,
		type: new foundry.data.fields.StringField({
			required: !0,
			choices: {
				gms: "lancer.pauseIcon.gms",
				horus: "lancer.pauseIcon.horus",
				ha: "lancer.pauseIcon.ha",
				ssc: "lancer.pauseIcon.ssc",
				"ips-n": "lancer.pauseIcon.ips-n",
				albatross: "lancer.pauseIcon.albatross",
				aun: "lancer.pauseIcon.aun",
				barony: "lancer.pauseIcon.barony",
				horizon: "lancer.pauseIcon.horizon",
				ra: "lancer.pauseIcon.ra",
				sparri: "lancer.pauseIcon.sparri",
				voladores: "lancer.pauseIcon.voladores"
			},
			initial: "gms"
		}),
		default: "gms"
	}), game.settings.registerMenu(game.system.id, ve.setting_status_icons, {
		name: "lancer.statusIconsConfig.menu-name",
		label: "lancer.statusIconsConfig.menu-label",
		hint: "lancer.statusIconsConfig.menu-hint",
		icon: "cci cci-difficulty i--2",
		type: StatusIconConfig,
		restricted: !0
	}), game.settings.register(game.system.id, ve.setting_status_icons, {
		scope: "world",
		config: !1,
		type: StatusIconConfigOptions,
		onChange: async () => {
			await LancerActiveEffect.updateIcons();
		},
		default: new StatusIconConfigOptions()
	}), game.settings.registerMenu(game.system.id, ve.setting_automation, {
		name: "lancer.automation.menu-name",
		label: "lancer.automation.menu-label",
		hint: "lancer.automation.menu-hint",
		icon: "mdi mdi-state-machine",
		type: AutomationConfig,
		restricted: !0
	}), game.settings.register(game.system.id, ve.setting_automation, {
		scope: "world",
		config: !1,
		type: AutomationOptions,
		default: new AutomationOptions()
	}), game.settings.register(game.system.id, ve.setting_scan_outputs, {
		name: "lancer.scanOutput.name",
		hint: "lancer.scanOutput.hint",
		scope: "world",
		config: !0,
		type: new foundry.data.fields.StringField({
			required: !0,
			choices: {
				both: "lancer.scanOutput.both",
				chat: "lancer.scanOutput.chat",
				journal: "lancer.scanOutput.journal"
			},
			initial: "both"
		}),
		default: "both"
	}), game.settings.registerMenu(game.system.id, ve.setting_actionTracker, {
		name: "lancer.actionTracker.menu-name",
		label: "lancer.actionTracker.menu-label",
		hint: "lancer.actionTracker.menu-hint",
		icon: "mdi mdi-state-machine",
		type: ActionTrackerConfig,
		restricted: !0
	}), game.settings.register(game.system.id, ve.setting_actionTracker, {
		scope: "world",
		config: !1,
		type: ActionTrackerOptions,
		default: {}
	}), game.settings.register(game.system.id, ve.setting_dsn_setup, {
		scope: "world",
		config: !1,
		type: Boolean,
		default: !1
	}), CONFIG.LancerInitiative = { templatePath: `systems/${game.system.id}/templates/combat/combat-tracker.hbs` }, game.settings.register(game.system.id, ve.setting_combat_appearance, {
		scope: "client",
		config: !1,
		type: CombatTrackerAppearance,
		onChange: setAppearance,
		default: new CombatTrackerAppearance()
	}), game.settings.register(game.system.id, ve.setting_combat_sort, {
		scope: "world",
		config: !1,
		type: Boolean,
		onChange: (e) => {
			CONFIG.LancerInitiative.sort = e, game.combats?.render();
		},
		default: !0
	}), CONFIG.LancerInitiative.sort = game.settings.get(game.system.id, "combat-tracker-sort"), setAppearance(game.settings.get(game.system.id, "combat-tracker-appearance"));
}, AutomationOptions = class extends foundry.abstract.DataModel {
	static defineSchema() {
		let e = foundry.data.fields;
		return {
			attacks: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.attacks",
				hint: "lancer.automation.attacks-desc"
			}),
			structure: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.structure",
				hint: "lancer.automation.structure-desc"
			}),
			overcharge_heat: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.overcharge_heat",
				hint: "lancer.automation.overcharge_heat-desc"
			}),
			attack_self_heat: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.attack_self_heat",
				hint: "lancer.automation.attack_self_heat-desc"
			}),
			limited_loading: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.limited_loading",
				hint: "lancer.automation.limited_loading-desc"
			}),
			npc_recharge: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.npc_recharge",
				hint: "lancer.automation.npc_recharge-desc"
			}),
			remove_templates: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.automation.remove_templates",
				hint: "lancer.automation.remove_templates-desc"
			}),
			token_size: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.automation.token_size",
				hint: "lancer.automation.token_size-desc"
			})
		};
	}
}, ActionTrackerOptions = class extends foundry.abstract.DataModel {
	static defineSchema() {
		return {
			showHotbar: new Ie.BooleanField({
				initial: !0,
				required: !0,
				label: "lancer.actionTracker.showHotbar",
				hint: "lancer.actionTracker.showHotbar-desc"
			}),
			allowPlayers: new Ie.BooleanField({
				initial: !0,
				required: !0,
				label: "lancer.actionTracker.allowPlayers",
				hint: "lancer.actionTracker.allowPlayers-desc"
			}),
			printMessages: new Ie.BooleanField({
				initial: !0,
				required: !0,
				label: "lancer.actionTracker.printMessages",
				hint: "lancer.actionTracker.printMessages-desc"
			})
		};
	}
}, StatusIconConfigOptions = class extends foundry.abstract.DataModel {
	static defineSchema() {
		let e = foundry.data.fields;
		return {
			defaultConditionsStatus: new e.BooleanField({
				required: !0,
				initial: !0,
				label: "lancer.statusIconsConfig.defaultConditionsStatus",
				hint: "lancer.statusIconsConfig.defaultConditionsStatus-desc"
			}),
			cancerConditionsStatus: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.cancerConditionsStatus",
				hint: "lancer.statusIconsConfig.cancerConditionsStatus-desc"
			}),
			cancerNPCTemplates: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.cancerNPCTemplates",
				hint: "lancer.statusIconsConfig.cancerNPCTemplates-desc"
			}),
			hayleyConditionsStatus: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.hayleyConditionsStatus",
				hint: "lancer.statusIconsConfig.hayleyConditionsStatus-desc"
			}),
			hayleyPC: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.hayleyPC",
				hint: "lancer.statusIconsConfig.hayleyPC-desc"
			}),
			hayleyNPC: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.hayleyNPC",
				hint: "lancer.statusIconsConfig.hayleyNPC-desc"
			}),
			hayleyUtility: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.hayleyUtility",
				hint: "lancer.statusIconsConfig.hayleyUtility-desc"
			}),
			tommyConditionsStatus: new e.BooleanField({
				required: !0,
				initial: !1,
				label: "lancer.statusIconsConfig.tommyConditionsStatus",
				hint: "lancer.statusIconsConfig.tommyConditionsStatus-desc"
			})
		};
	}
}, CombatTrackerAppearance = class extends foundry.abstract.DataModel {
	static defineSchema() {
		let e = foundry.data.fields;
		return {
			icon: new e.StringField({
				required: !0,
				initial: "cci cci-activate",
				label: "LANCERINITIATIVE.Icon"
			}),
			deactivate: new e.StringField({
				required: !0,
				initial: "cci cci-deactivate",
				label: "LANCERINITIATIVE.DeactivateIcon"
			}),
			icon_size: new e.NumberField({
				required: !0,
				initial: 2,
				integer: !1,
				label: "LANCERINITIATIVE.IconSize"
			}),
			player_color: new e.ColorField({
				required: !0,
				initial: "#44abe0",
				label: "LANCERINITIATIVE.PCColor"
			}),
			friendly_color: new e.ColorField({
				required: !0,
				initial: "#44abe0",
				label: "LANCERINITIATIVE.FriendlyColor"
			}),
			neutral_color: new e.ColorField({
				required: !0,
				initial: "#146464",
				label: "LANCERINITIATIVE.NeutralColor"
			}),
			enemy_color: new e.ColorField({
				required: !0,
				initial: "#d98f30",
				label: "LANCERINITIATIVE.EnemyColor"
			}),
			done_color: new e.ColorField({
				required: !0,
				initial: "#aaaaaa",
				label: "LANCERINITIATIVE.DoneColor"
			})
		};
	}
}, Le = ve.log_prefix, Re = [
	{
		id: "resistance_burn",
		name: "lancer.statusIconsNames.resistance_burn",
		img: "systems/lancer/assets/icons/white/resistance_burn.svg"
	},
	{
		id: "resistance_energy",
		name: "lancer.statusIconsNames.resistance_energy",
		img: "systems/lancer/assets/icons/white/resistance_energy.svg"
	},
	{
		id: "resistance_explosive",
		name: "lancer.statusIconsNames.resistance_explosive",
		img: "systems/lancer/assets/icons/white/resistance_explosive.svg"
	},
	{
		id: "resistance_heat",
		name: "lancer.statusIconsNames.resistance_heat",
		img: "systems/lancer/assets/icons/white/resistance_heat.svg"
	},
	{
		id: "resistance_kinetic",
		name: "lancer.statusIconsNames.resistance_kinetic",
		img: "systems/lancer/assets/icons/white/resistance_kinetic.svg"
	},
	{
		id: "cover_hard",
		name: "lancer.statusIconsNames.cover_hard",
		img: "systems/lancer/assets/icons/white/cover_hard.svg"
	},
	{
		id: "cover_soft",
		name: "lancer.statusIconsNames.cover_soft",
		img: "systems/lancer/assets/icons/white/cover_soft.svg"
	}
], ze = [
	{
		id: "immobilized",
		name: "lancer.statusIconsNames.immobilized",
		img: "systems/lancer/assets/icons/white/condition_immobilized.svg"
	},
	{
		id: "impaired",
		name: "lancer.statusIconsNames.impaired",
		img: "systems/lancer/assets/icons/white/condition_impaired.svg"
	},
	{
		id: "jammed",
		name: "lancer.statusIconsNames.jammed",
		img: "systems/lancer/assets/icons/white/condition_jammed.svg"
	},
	{
		id: "lockon",
		name: "lancer.statusIconsNames.lockon",
		img: "systems/lancer/assets/icons/white/condition_lockon.svg"
	},
	{
		id: "shredded",
		name: "lancer.statusIconsNames.shredded",
		img: "systems/lancer/assets/icons/white/condition_shredded.svg"
	},
	{
		id: "slow",
		name: "lancer.statusIconsNames.slow",
		img: "systems/lancer/assets/icons/white/condition_slow.svg"
	},
	{
		id: "stunned",
		name: "lancer.statusIconsNames.stunned",
		img: "systems/lancer/assets/icons/white/condition_stunned.svg"
	},
	{
		id: "dangerzone",
		name: "lancer.statusIconsNames.dangerzone",
		img: "systems/lancer/assets/icons/white/status_dangerzone.svg"
	},
	{
		id: "downandout",
		name: "lancer.statusIconsNames.downandout",
		img: "systems/lancer/assets/icons/white/status_downandout.svg"
	},
	{
		id: "engaged",
		name: "lancer.statusIconsNames.engaged",
		img: "systems/lancer/assets/icons/white/status_engaged.svg"
	},
	{
		id: "exposed",
		name: "lancer.statusIconsNames.exposed",
		img: "systems/lancer/assets/icons/white/status_exposed.svg"
	},
	{
		id: "hidden",
		name: "lancer.statusIconsNames.hidden",
		img: "systems/lancer/assets/icons/white/status_hidden.svg"
	},
	{
		id: "invisible",
		name: "lancer.statusIconsNames.invisible",
		img: "systems/lancer/assets/icons/white/status_invisible.svg"
	},
	{
		id: "intangible",
		name: "lancer.statusIconsNames.intangible",
		img: "systems/lancer/assets/icons/white/status_intangible.svg"
	},
	{
		id: "prone",
		name: "lancer.statusIconsNames.prone",
		img: "systems/lancer/assets/icons/white/status_prone.svg"
	},
	{
		id: "shutdown",
		name: "lancer.statusIconsNames.shutdown",
		img: "systems/lancer/assets/icons/white/status_shutdown.svg"
	},
	{
		id: "bolster",
		name: "lancer.statusIconsNames.bolster",
		img: "icons/svg/upgrade.svg"
	},
	{
		id: "npc_tier_1",
		name: "lancer.statusIconsNames.npc_tier_1",
		img: "systems/lancer/assets/icons/white/npc_tier_1.svg"
	},
	{
		id: "npc_tier_2",
		name: "lancer.statusIconsNames.npc_tier_2",
		img: "systems/lancer/assets/icons/white/npc_tier_2.svg"
	},
	{
		id: "npc_tier_3",
		name: "lancer.statusIconsNames.npc_tier_3",
		img: "systems/lancer/assets/icons/white/npc_tier_3.svg"
	},
	{
		id: "flying",
		name: "lancer.statusIconsNames.flying",
		img: "icons/svg/wing.svg"
	}
], Be = [
	{
		id: "bolster",
		name: "lancer.statusIconsNames.bolster",
		img: "icons/svg/upgrade.svg"
	},
	{
		id: "burn",
		name: "lancer.statusIconsNames.burn",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/burn.webp"
	},
	{
		id: "dangerzone",
		name: "lancer.statusIconsNames.dangerzone",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/dangerzone.webp"
	},
	{
		id: "downandout",
		name: "lancer.statusIconsNames.downandout",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/downandout.svg"
	},
	{
		id: "engaged",
		name: "lancer.statusIconsNames.engaged",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/engaged.webp"
	},
	{
		id: "exposed",
		name: "lancer.statusIconsNames.exposed",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/exposed.webp"
	},
	{
		id: "flying",
		name: "lancer.statusIconsNames.flying",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/flying.webp"
	},
	{
		id: "hidden",
		name: "lancer.statusIconsNames.hidden",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/hidden.webp"
	},
	{
		id: "immobilized",
		name: "lancer.statusIconsNames.immobilized",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/immobilized.svg"
	},
	{
		id: "impaired",
		name: "lancer.statusIconsNames.impaired",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/impaired.svg"
	},
	{
		id: "invisible",
		name: "lancer.statusIconsNames.invisible",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/invisible.svg"
	},
	{
		id: "jammed",
		name: "lancer.statusIconsNames.jammed",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/jammed.svg"
	},
	{
		id: "lockon",
		name: "lancer.statusIconsNames.lockon",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/lockon.svg"
	},
	{
		id: "prone",
		name: "lancer.statusIconsNames.prone",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/prone.webp"
	},
	{
		id: "shredded",
		name: "lancer.statusIconsNames.shredded",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/shredded.svg"
	},
	{
		id: "shutdown",
		name: "lancer.statusIconsNames.shutdown",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/shutdown.svg"
	},
	{
		id: "slow",
		name: "lancer.statusIconsNames.slow",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/slowed.svg"
	},
	{
		id: "stunned",
		name: "lancer.statusIconsNames.stunned",
		img: "systems/lancer/assets/icons/alt-status/cancercondstat/stunned.svg"
	}
], Ve = [
	{
		id: "commander",
		name: "lancer.statusIconsNames.commander",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/commander.webp"
	},
	{
		id: "elite",
		name: "lancer.statusIconsNames.elite",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/elite.webp"
	},
	{
		id: "exotic",
		name: "lancer.statusIconsNames.exotic",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/exotic.webp"
	},
	{
		id: "grunt",
		name: "lancer.statusIconsNames.grunt",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/grunt.webp"
	},
	{
		id: "mercenary",
		name: "lancer.statusIconsNames.mercenary",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/mercenary.webp"
	},
	{
		id: "pirate",
		name: "lancer.statusIconsNames.pirate",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/pirate.webp"
	},
	{
		id: "rpv",
		name: "lancer.statusIconsNames.rpv",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/rpv.webp"
	},
	{
		id: "ship",
		name: "lancer.statusIconsNames.ship",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/ship.webp"
	},
	{
		id: "spacer",
		name: "lancer.statusIconsNames.spacer",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/spacer.webp"
	},
	{
		id: "ultra",
		name: "lancer.statusIconsNames.ultra",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/ultra.webp"
	},
	{
		id: "vehicle",
		name: "lancer.statusIconsNames.vehicle",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/vehicle.webp"
	},
	{
		id: "veteran",
		name: "lancer.statusIconsNames.veteran",
		img: "systems/lancer/assets/icons/alt-status/cancernpc/veteran.webp"
	}
], He = [
	{
		id: "bolster",
		name: "lancer.statusIconsNames.bolster",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/bolster.webp"
	},
	{
		id: "downandout",
		name: "lancer.statusIconsNames.downandout",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/downandout.webp"
	},
	{
		id: "exposed",
		name: "lancer.statusIconsNames.exposed",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/exposed.webp"
	},
	{
		id: "grappled",
		name: "lancer.statusIconsNames.grappled",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/grappled.webp"
	},
	{
		id: "hidden",
		name: "lancer.statusIconsNames.hidden",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/hidden.webp"
	},
	{
		id: "immobilized",
		name: "lancer.statusIconsNames.immobilized",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/immobilized.webp"
	},
	{
		id: "impaired",
		name: "lancer.statusIconsNames.impaired",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/impaired.webp"
	},
	{
		id: "invisible",
		name: "lancer.statusIconsNames.invisible",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/invisible.webp"
	},
	{
		id: "intangible",
		name: "lancer.statusIconsNames.intangible",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/intangible.webp"
	},
	{
		id: "jammed",
		name: "lancer.statusIconsNames.jammed",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/jammed.webp"
	},
	{
		id: "lockon",
		name: "lancer.statusIconsNames.lockon",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/lockon.webp"
	},
	{
		id: "prone",
		name: "lancer.statusIconsNames.prone",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/prone.webp"
	},
	{
		id: "shredded",
		name: "lancer.statusIconsNames.shredded",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/shredded.webp"
	},
	{
		id: "shutdown",
		name: "lancer.statusIconsNames.shutdown",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/shutdown.webp"
	},
	{
		id: "slow",
		name: "lancer.statusIconsNames.slow",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/slowed.webp"
	},
	{
		id: "stunned",
		name: "lancer.statusIconsNames.stunned",
		img: "systems/lancer/assets/icons/alt-status/hayleycondstat/stunned.webp"
	},
	{
		id: "flying",
		name: "lancer.statusIconsNames.flying",
		img: "systems/lancer/assets/icons/alt-status/hayleyutil/flying.webp"
	}
], Ue = [
	{
		id: "aceso",
		name: "lancer.statusIconsNames.aceso",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/aceso.webp"
	},
	{
		id: "camus_razor",
		name: "lancer.statusIconsNames.camus_razor",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/camus-razor.webp"
	},
	{
		id: "chains_of_prometheus",
		name: "lancer.statusIconsNames.chains_of_prometheus",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/chains-of-prometheus.webp"
	},
	{
		id: "clamp_bomb",
		name: "lancer.statusIconsNames.clamp_bomb",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/clamp-bomb.webp"
	},
	{
		id: "dimensional_shackles",
		name: "lancer.statusIconsNames.dimensional_shackles",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/dimensional-shackles.webp"
	},
	{
		id: "dominions_breadth",
		name: "lancer.statusIconsNames.dominions_breadth",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/dominions-breadth.webp"
	},
	{
		id: "duat_gate",
		name: "lancer.statusIconsNames.duat_gate",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/duat-gate.webp"
	},
	{
		id: "excommunicate",
		name: "lancer.statusIconsNames.excommunicate",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/excommunicate.webp"
	},
	{
		id: "fade_cloak",
		name: "lancer.statusIconsNames.fade_cloak",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/fade-cloak.webp"
	},
	{
		id: "flaw_minus",
		name: "lancer.statusIconsNames.flaw_minus",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/flaw-minus.webp"
	},
	{
		id: "flaw_plus",
		name: "lancer.statusIconsNames.flaw_plus",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/flaw-plus.webp"
	},
	{
		id: "gravity",
		name: "lancer.statusIconsNames.gravity",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/gravity.webp"
	},
	{
		id: "haste",
		name: "lancer.statusIconsNames.haste",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/haste.webp"
	},
	{
		id: "hunter_lock",
		name: "lancer.statusIconsNames.hunter_lock",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/hunter-lock.webp"
	},
	{
		id: "hyperdense_armor",
		name: "lancer.statusIconsNames.hyperdense_armor",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/hyperdense-armor.webp"
	},
	{
		id: "imperial_eye",
		name: "lancer.statusIconsNames.imperial_eye",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/imperial-eye.webp"
	},
	{
		id: "kraul_grapple",
		name: "lancer.statusIconsNames.kraul_grapple",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/kraul-grapple.webp"
	},
	{
		id: "metahook",
		name: "lancer.statusIconsNames.metahook",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/metahook.webp"
	},
	{
		id: "molten_puncture",
		name: "lancer.statusIconsNames.molten_puncture",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/molten-puncture.webp"
	},
	{
		id: "retort_loop",
		name: "lancer.statusIconsNames.retort_loop",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/retort-loop.webp"
	},
	{
		id: "shahnameh",
		name: "lancer.statusIconsNames.shahnameh",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/shahnameh.webp"
	},
	{
		id: "stasis",
		name: "lancer.statusIconsNames.stasis",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/stasis.webp"
	},
	{
		id: "supercharger",
		name: "lancer.statusIconsNames.supercharger",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/supercharger.webp"
	},
	{
		id: "sympathetic_shield",
		name: "lancer.statusIconsNames.sympathetic_shield",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/sympathetic-shield.webp"
	},
	{
		id: "tachyon_shield",
		name: "lancer.statusIconsNames.tachyon_shield",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/tachyon-shield.webp"
	},
	{
		id: "terrify",
		name: "lancer.statusIconsNames.terrify",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/terrify.webp"
	},
	{
		id: "tracking_bug",
		name: "lancer.statusIconsNames.tracking_bug",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/tracking-bug.webp"
	},
	{
		id: "trueblack",
		name: "lancer.statusIconsNames.trueblack",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/trueblack.webp"
	},
	{
		id: "unravel",
		name: "lancer.statusIconsNames.unravel",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/unravel.webp"
	},
	{
		id: "viral_logic",
		name: "lancer.statusIconsNames.viral_logic",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/viral-logic.webp"
	},
	{
		id: "walk_of_kings",
		name: "lancer.statusIconsNames.walk_of_kings",
		img: "systems/lancer/assets/icons/alt-status/hayleypc/walk-of-kings.webp"
	}
], We = [
	{
		id: "abjure",
		name: "lancer.statusIconsNames.abjure",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/abjure.webp"
	},
	{
		id: "chain",
		name: "lancer.statusIconsNames.chain",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/chain.webp"
	},
	{
		id: "echo_edge",
		name: "lancer.statusIconsNames.echo_edge",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/echo-edge.webp"
	},
	{
		id: "dispersal_shield_1",
		name: "lancer.statusIconsNames.dispersal_shield_1",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/dispersal-shield-1.webp"
	},
	{
		id: "dispersal_shield_2",
		name: "lancer.statusIconsNames.dispersal_shield_2",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/dispersal-shield-2.webp"
	},
	{
		id: "dispersal_shield_3",
		name: "lancer.statusIconsNames.dispersal_shield_3",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/dispersal-shield-3.webp"
	},
	{
		id: "focus_down",
		name: "lancer.statusIconsNames.focus_down",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/focus-down.webp"
	},
	{
		id: "follower_count",
		name: "lancer.statusIconsNames.follower_count",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/follower-count.webp"
	},
	{
		id: "grind_maniple",
		name: "lancer.statusIconsNames.grind_maniple",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/grind-maniple.webp"
	},
	{
		id: "illusionary_subroutines",
		name: "lancer.statusIconsNames.illusionary_subroutines",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/illusionary-subroutines.webp"
	},
	{
		id: "investiture",
		name: "lancer.statusIconsNames.investiture",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/investiture.webp"
	},
	{
		id: "latch_drone",
		name: "lancer.statusIconsNames.latch_drone",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/latch-drone.webp"
	},
	{
		id: "marked",
		name: "lancer.statusIconsNames.marked",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/marked.webp"
	},
	{
		id: "pain_transference",
		name: "lancer.statusIconsNames.pain_transference",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/pain-transference.webp"
	},
	{
		id: "petrify",
		name: "lancer.statusIconsNames.petrify",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/petrify.webp"
	},
	{
		id: "sanctuary",
		name: "lancer.statusIconsNames.sanctuary",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/sanctuary.webp"
	},
	{
		id: "spike",
		name: "lancer.statusIconsNames.spike",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/spike.webp"
	},
	{
		id: "tear_down",
		name: "lancer.statusIconsNames.tear_down",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/tear-down.webp"
	},
	{
		id: "warp_sensors",
		name: "lancer.statusIconsNames.warp_sensors",
		img: "systems/lancer/assets/icons/alt-status/hayleynpc/warp-sensors.webp"
	}
], Ge = [
	{
		id: "blind",
		name: "lancer.statusIconsNames.blind",
		img: "systems/lancer/assets/icons/alt-status/hayleyutil/blind.webp"
	},
	{
		id: "burn",
		name: "lancer.statusIconsNames.burn",
		img: "systems/lancer/assets/icons/alt-status/hayleyutil/burn.webp"
	},
	{
		id: "overshield",
		name: "lancer.statusIconsNames.overshield",
		img: "systems/lancer/assets/icons/alt-status/hayleyutil/overshield.webp"
	},
	{
		id: "reactor_meltdown",
		name: "lancer.statusIconsNames.reactor_meltdown",
		img: "systems/lancer/assets/icons/alt-status/hayleyutil/reactor-meltdown.webp"
	}
], Ke = [
	{
		id: "bolster",
		name: "lancer.statusIconsNames.bolster",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Bolstered.webp"
	},
	{
		id: "dangerzone",
		name: "lancer.statusIconsNames.dangerzone",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Danger Zone.webp"
	},
	{
		id: "destroyed",
		name: "lancer.statusIconsNames.destroyed",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Destroyed.webp"
	},
	{
		id: "downandout",
		name: "lancer.statusIconsNames.downandout",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Down and Out.webp"
	},
	{
		id: "engaged",
		name: "lancer.statusIconsNames.engaged",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Engaged.webp"
	},
	{
		id: "exposed",
		name: "lancer.statusIconsNames.exposed",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Exposed.webp"
	},
	{
		id: "grappled",
		name: "lancer.statusIconsNames.grappled",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Grappled.webp"
	},
	{
		id: "flying",
		name: "lancer.statusIconsNames.flying",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Flying.webp"
	},
	{
		id: "hidden",
		name: "lancer.statusIconsNames.hidden",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Hidden.webp"
	},
	{
		id: "hiddeninvis",
		name: "lancer.statusIconsNames.hiddeninvis",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Hidden and Invisible.webp"
	},
	{
		id: "immobilized",
		name: "lancer.statusIconsNames.immobilized",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Immobilized.webp"
	},
	{
		id: "impaired",
		name: "lancer.statusIconsNames.impaired",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Impaired.webp"
	},
	{
		id: "invisible",
		name: "lancer.statusIconsNames.invisible",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Invisible.webp"
	},
	{
		id: "intangible",
		name: "lancer.statusIconsNames.intangible",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Intangible.webp"
	},
	{
		id: "jammed",
		name: "lancer.statusIconsNames.jammed",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Jammed.webp"
	},
	{
		id: "lockon",
		name: "lancer.statusIconsNames.lockon",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Lockon.webp"
	},
	{
		id: "prone",
		name: "lancer.statusIconsNames.prone",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Prone.webp"
	},
	{
		id: "shredded",
		name: "lancer.statusIconsNames.shredded",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Shredded.webp"
	},
	{
		id: "shutdown",
		name: "lancer.statusIconsNames.shutdown",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Shut Down.webp"
	},
	{
		id: "slow",
		name: "lancer.statusIconsNames.slow",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Slowed.webp"
	},
	{
		id: "stunned",
		name: "lancer.statusIconsNames.stunned",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Stunned.webp"
	},
	{
		id: "npc_tier_1",
		name: "lancer.statusIconsNames.npc_tier_1",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Tier 1.webp"
	},
	{
		id: "npc_tier_2",
		name: "lancer.statusIconsNames.npc_tier_2",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Tier 2.webp"
	},
	{
		id: "npc_tier_3",
		name: "lancer.statusIconsNames.npc_tier_3",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Tier 3.webp"
	},
	{
		id: "tiercust",
		name: "lancer.statusIconsNames.tiercust",
		img: "systems/lancer/assets/icons/alt-status/tommystat/Tier Custom.webp"
	}
];
async function migrateLancerConditions() {
	if (!game.modules.get("lancer-conditions")?.active) return;
	console.log(`${Le} Migrating settings from Lancer Condition Icons`);
	let e = {
		defaultConditionsStatus: game.settings.get("lancer-conditions", "keepStockIcons"),
		cancerConditionsStatus: game.settings.get("lancer-conditions", "cancerConditionsStatus"),
		cancerNPCTemplates: game.settings.get("lancer-conditions", "cancerNPCTemplates"),
		hayleyConditionsStatus: game.settings.get("lancer-conditions", "hayleyConditionsStatus"),
		hayleyPC: game.settings.get("lancer-conditions", "hayleyPC"),
		hayleyNPC: game.settings.get("lancer-conditions", "hayleyNPC"),
		hayleyUtility: game.settings.get("lancer-conditions", "hayleyUtility"),
		tommyConditionsStatus: game.settings.get("lancer-conditions", "tommyConditionsStatus")
	};
	game.settings.set(game.system.id, ve.setting_status_icons, e);
	let t = game.settings.get("core", "moduleConfiguration");
	t["lancer-conditions"] = !1, game.settings.set("core", "moduleConfiguration", t), new Dialog({
		title: "Lancer Condition Icons is Integrated",
		content: "\n  <p>The icons and functionality from Lancer Condition Icons has been integrated with the system,\n  and your settings have been migrated. Lancer Condition Icons will now be disabled, and you can\n  feel free to uninstall it if no other worlds are using it.</p>\n  <p>The page must now be refreshed for the module change to take effect.</p>",
		buttons: { ok: {
			label: "Refresh",
			callback: () => window.location.reload()
		} },
		default: "No"
	}, { width: 350 }).render(!0);
}
//#endregion
//#region src/module/helpers/from-lid.ts
async function fromLidMany(e, { source: t = "all" } = {}) {
	let m = t !== "compendium", v = t !== "world", y = [];
	if (m && y.push(...game.items?.filter((t) => e.includes(t.system.lid)), ...game.actors?.filter((t) => e.includes(t.system.lid))), v) {
		let t = game.packs.filter((e) => ["Actor", "Item"].includes(e.documentName));
		await Promise.all(t.map((e) => e.getIndex())), y.push(...(await Promise.all(t.map((t) => t.getDocuments({ system: { lid__in: e } })))).flat());
	}
	return y;
}
async function fromLid(e, { source: t = "all" } = {}) {
	return (await fromLidMany([e], { source: t })).shift();
}
function fromLidSync(e, { source: t = "all" } = {}) {
	let m = t !== "compendium", v = t !== "world", y;
	return m && (y = game.items?.find((t) => t.system.lid === e) ?? game.actors?.find((t) => t.system.lid === e)), !y && v && (y = game.packs.filter((e) => ["Actor", "Item"].includes(e.documentName)).map((t) => {
		let m = t.index.find((t) => t.system?.lid === e);
		return m && (m.pack = t.collection), m;
	}).find((e) => e !== void 0)), y;
}
//#endregion
//#region src/module/util/lid.ts
function lookupOwnedDeployables(e, t) {
	if (e.is_deployable() || e.isToken) return {};
	let m = game.actors.filter((t) => t.is_deployable() && t.system.owner?.id === e.uuid), v = {};
	for (let e of m) (!t || t.includes(e.system.lid)) && (v[e.system.lid] = e);
	return v;
}
function slugify(e, t = "_") {
	return e.trim().replace(/[:\\\/-\s]+/g, t).toLowerCase();
}
function randomString(e) {
	let t = "";
	for (let m = 0; m < e; m++) {
		let e = Math.floor(Math.random() * 36);
		t += "abcdefghijklmnopqrstuvwxyz0123456789".charAt(e);
	}
	return t;
}
//#endregion
//#region src/module/util/requests.ts
async function maybeImportActor(e, t) {
	if (game.user?.can("ACTOR_CREATE")) return fulfillImportActor(e, t);
	let m = `<button class="chat-button self-destruct"
      data-action="importActor"
      data-import-id="${e.uuid}"
      data-target-id="${t.uuid}"
    >
      IMPORT ${e.name} FOR ${t.name}?
    </button>`;
	ChatMessage.create({
		blind: !0,
		whisper: game.users?.filter((e) => e.isGM).map((e) => e.id),
		content: m
	});
}
async function fulfillImportActor(e, t) {
	if (!game.user?.can("ACTOR_CREATE")) throw Error("You do not have permissions to import an actor!");
	let m = await Un.fromUuid(e), v = await Un.fromUuid(t);
	if (!m || !v) throw Error("Invalid actor(s) provided for import!");
	let y = m.toObject();
	return y.system.owner = v.uuid, y.name = deployableName(y.name, v), y.folder = v.folder?.id, y.ownership = foundry.utils.duplicate(v.ownership), Un.create(y);
}
function deployableName(e, t) {
	if (!t) return e;
	let m = t.name;
	return t.is_pilot() ? m = t.system.callsign || t.name : t.is_mech() && (m = t.name), `${e} [${m}]`;
}
//#endregion
//#region src/module/util/doc.ts
var qe = "world", Je = foundry.documents.collections.CompendiumCollection;
async function findLicenseFor(e, t) {
	let m = e.system.license;
	if (!m) return null;
	if (t) {
		let e = null;
		t.is_pilot() && (e = t), t.is_mech() && t.system.pilot?.status == "resolved" && (e = t.system.pilot.value), e && (e.items.filter((e) => e.is_license()).find((e) => e.system.key === m) || e.items.filter((e) => e.is_license()).find((e) => e.name === m));
	}
	let v = game.packs.get(get_pack_id(z.LICENSE));
	if (!v) return console.error("License pack not found"), null;
	await v.getIndex();
	let y = v.index.find((e) => e.system?.key == m) || v.index.find((e) => e.name == m);
	return y ? v.getDocument(y._id) : (console.error(`License not found: ${m}`), null);
}
function get_pack_id(e) {
	let t;
	switch (e) {
		case z.FRAME:
		case z.MECH_SYSTEM:
		case z.MECH_WEAPON:
		case z.WEAPON_MOD:
			t = "mech-items";
			break;
		case z.BOND:
		case z.CORE_BONUS:
		case z.LICENSE:
		case z.ORGANIZATION:
		case z.PILOT_ARMOR:
		case z.PILOT_GEAR:
		case z.PILOT_WEAPON:
		case z.RESERVE:
		case z.SKILL:
		case z.TALENT:
			t = "pilot-items";
			break;
		case z.NPC_CLASS:
		case z.NPC_FEATURE:
		case z.NPC_TEMPLATE:
			t = "npc-items";
			break;
		case z.DEPLOYABLE:
		case z.MECH:
		case z.PILOT:
			t = "player-actors";
			break;
		case z.NPC:
		case z.STATUS:
		default:
			t = `${e}-${is_actor_type(e) ? "actors" : "items"}`;
			break;
	}
	return `${qe}.${t}`;
}
async function get_pack(e) {
	let t = get_pack_id(e), m = game.packs.get(t);
	if (m) return m;
	{
		let m = is_actor_type(e) ? "Actor" : "Item", v = t.split(".")[1], y = {
			name: v,
			type: m,
			label: `lancer.compendium.${v}`,
			banner: `./systems/lancer/assets/banners/${v}.svg`,
			system: "lancer",
			package: "world",
			path: `./packs/${v}`
		};
		return Je.createCompendium(y);
	}
}
async function insinuate(e, t) {
	let m = [], v = [];
	for (let y of e) if (y.parent == t) m.push(y);
	else {
		v.push(y.toObject());
		let e = [];
		y.is_frame() ? e = y.system.core_system.integrated : (y.is_mech_system() || y.is_mech_weapon()) && (e = y.system.integrated);
		for (let t of e) {
			let e = await fromLid(t);
			e && v.push(e.toObject());
		}
	}
	let y = await t.createEmbeddedDocuments("Item", v) ?? [];
	for (let e of y) await importDeployablesFor(e, t);
	return [...m, ...y];
}
async function importDeployablesFor(e, t) {
	let m = lookupOwnedDeployables(t), v = Object.keys(m), y = [];
	y.push(...e.system.deployables ?? []), e.is_frame() && y.push(...e.system.core_system.deployables);
	let x = y.filter((e) => !v.includes(e));
	if (!x.length) return;
	let S = await fromLidMany(x, { source: "compendium" });
	for (let e of S) e instanceof Un && await maybeImportActor(e, t);
}
//#endregion
//#region src/module/effects/lancer-active-effect.ts
var Ye = ve.log_prefix, LancerActiveEffect = class extends ActiveEffect {
	get isSuppressed() {
		return !this.affectsUs();
	}
	affectsUs() {
		let e = this.flags[game.system.id];
		if (!e?.target_type) return !0;
		let t = null;
		if (this.parent instanceof Un ? t = this.parent : this.parent instanceof Dt && (t = this.parent.parent), !(t instanceof Un)) return !1;
		switch (e.target_type) {
			case z.PILOT: return t.is_pilot();
			case z.MECH: return t.is_mech();
			case z.DEPLOYABLE: return t.is_deployable();
			case z.NPC: return t.is_npc();
			case "mech_and_npc": return t.is_mech() || t.is_npc();
			case "only_deployable": return t.is_deployable() && t.system.type == he.Deployable;
			case "only_drone": return t.is_deployable() && t.system.type == he.Drone;
			default: return !1;
		}
	}
	static prepareActiveEffectCategories(e) {
		let t = {
			type: "passive",
			label: game.i18n.localize("lancer.effect.categories.passive"),
			effects: []
		}, m = {
			type: "inherited",
			label: game.i18n.localize("lancer.effect.categories.inherited"),
			effects: []
		}, v = {
			type: "disabled",
			label: game.i18n.localize("lancer.effect.categories.disabled"),
			effects: []
		}, y = {
			type: "passthrough",
			label: game.i18n.localize("lancer.effect.categories.passthrough"),
			effects: []
		}, x = 0;
		for (let S of e.allApplicableEffects()) S.affectsUs() ? S.disabled ? v.effects.push([x, S]) : S.flags[game.system.id]?.deep_origin ? m.effects.push([x, S]) : t.effects.push([x, S]) : y.effects.push([x, S]), x++;
		return [
			t,
			m,
			v,
			y
		];
	}
	static async updateIcons() {
		await this.initConfig(), await this.populateFromCompendiumItems(), await this.populateFromWorldItems(), Hooks.callAll("lancer.statusesReady");
	}
	static async initConfig() {
		let e = game.settings.get(game.system.id, ve.setting_status_icons);
		game.ready && !Object.keys(e).some((t) => e[t]) && (e.defaultConditionsStatus = !0, await game.settings.set(game.system.id, ve.setting_status_icons, e));
		function _backfillIcons(e, t) {
			for (let m of t) e.find((e) => e.id === m.id) || e.push({
				id: m.id,
				name: m.name,
				img: m.img
			});
			return e;
		}
		let t = [];
		e.defaultConditionsStatus && (t = _backfillIcons(t, ze)), e.cancerConditionsStatus && (t = _backfillIcons(t, Be)), e.hayleyConditionsStatus && (t = _backfillIcons(t, He)), e.tommyConditionsStatus && (t = _backfillIcons(t, Ke)), t = _backfillIcons(t, Re), e.cancerNPCTemplates && (t = _backfillIcons(t, Ve)), e.hayleyPC && (t = _backfillIcons(t, Ue)), e.hayleyNPC && (t = _backfillIcons(t, We)), e.hayleyUtility && (t = _backfillIcons(t, Ge)), console.log(`${Ye} ${t.length} status icons configured from settings`), CONFIG.statusEffects = t, CONFIG.specialStatusEffects.DEFEATED = "downandout", CONFIG.specialStatusEffects.INVISIBLE = null, CONFIG.specialStatusEffects.BLIND = null, Hooks.callAll("lancer.statusInitComplete");
	}
	static async populateFromWorldItems() {
		let e = CONFIG.statusEffects.length, t = game.items?.filter((e) => e.type === z.STATUS);
		this._populateFromItems(t, !0), console.log(`${Ye} ${CONFIG.statusEffects.length - e} status icons loaded from world items, total: ${CONFIG.statusEffects.length}`);
	}
	static async populateFromCompendiumItems() {
		let e = CONFIG.statusEffects.length, t = await game.packs.get(get_pack_id(z.STATUS))?.getDocuments({ type: z.STATUS }) || [];
		this._populateFromItems(t, !1), console.log(`${Ye} ${CONFIG.statusEffects.length - e} status icons loaded from compendiums, total: ${CONFIG.statusEffects.length}`);
	}
	static async _populateFromItems(e = [], t = !1) {
		if (e.length) for (let m of e) {
			if (!m.is_status() || !m.system.lid || !m.img) continue;
			let e = CONFIG.statusEffects.find((e) => e.id === m.system.lid);
			if (!e) {
				let e = [...m.effects].reduce((e, t) => e.concat(t.changes || []), []);
				CONFIG.statusEffects.push({
					id: m.system.lid,
					name: m.name,
					img: m.img,
					description: m.system.effects,
					changes: e
				});
			} else if (e.img = e.img || e.icon, e.img = t ? m.img || e.img : e.img || m.img, e.name = t ? m.name || e.name : e.name || m.name, m.system.effects && (e.description = m.system.effects), t && [...m.effects].length > 0) {
				let t = e.changes || [];
				m.effects.forEach((e) => {
					e.changes && e.changes.length > 0 && t.push(...e.changes);
				}), e.changes = t;
			} else !e.changes && m.effects.size && (e.changes = [...m.effects].reduce((e, t) => e.concat(t.changes || []), []));
		}
	}
}, Xe = {};
Hooks.on("applyActiveEffect", function(e, t) {
	if (t.mode == 11 || t.mode == 12) try {
		let m = Xe[t.value] ?? JSON.parse(t.value);
		Xe[t.value] = m, t.mode == 11 ? foundry.utils.setProperty(e, t.key, m) : t.mode == 12 && foundry.utils.getProperty(e, t.key).push(m);
	} catch (e) {
		console.warn(e), console.warn(`JSON effect parse failed, ${t.value}`);
	}
});
//#endregion
//#region src/module/util/misc.ts
var ChangeWatchHelper = class {
	constructor() {
		this.prior_value = null, this.prior_string = "", this.curr_value = null, this.curr_string = "", this.isDirty = !1;
	}
	clean() {
		this.isDirty = !0;
	}
	setValue(e) {
		let t = !1;
		return this.curr_string ? (this.prior_value = this.curr_value, this.prior_string = this.curr_string) : t = !0, this.curr_value = e, this.curr_string = JSON.stringify(e), t && (this.prior_string = this.curr_string, this.prior_value = this.curr_value), !t && !this.isDirty && (this.isDirty = this.curr_string != this.prior_string), this.isDirty;
	}
};
function fixCCFormula(e) {
	return e.replaceAll("{ll}", "@level").replaceAll("{grit}", "@grit");
}
function rollEvalSync(e, t) {
	let m = new Roll(e, t);
	try {
		m.evaluateSync();
	} catch {
		return 0;
	}
	return m.total;
}
function tokenDocFromUuidSync(e, t) {
	let m = fromUuidSync(e, t);
	return m instanceof TokenDocument.implementation ? m : null;
}
function userOwnsActor(e) {
	return e.isOwner && !(game.users?.players.some((t) => t.active && e.testUserPermission(t, "OWNER")) && game.user?.isGM);
}
async function tokenScrollText({ tokenId: e = "", content: t = "", style: m = {} } = {}, v = !1) {
	m = {
		anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
		direction: CONST.TEXT_ANCHOR_POINTS.TOP,
		fontSize: 28,
		fill: 16777215,
		stroke: 0,
		strokeThickness: 4,
		jitter: .25,
		...m
	}, v && game.socket?.emit(`system.${game.system.id}`, {
		action: "scrollText",
		data: {
			tokenId: e,
			content: t,
			style: m
		}
	});
	let y = canvas.tokens?.get(e);
	y && game.settings.get(game.system.id, ve.setting_floating_damage_numbers) && await canvas.interface?.createScrollingText(y.center, t, m);
}
//#endregion
//#region src/module/effects/converter.ts
var Ze = 10, Qe = 20, $e = 30, et = 50;
function frameInnateEffect(e) {
	let t = [
		"armor",
		"edef",
		"evasion",
		"save",
		"sensor_range",
		"size",
		"speed",
		"tech_attack"
	].map((t) => ({
		key: `system.${t}`,
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats[t]
	}));
	return t.push({
		key: "system.hp.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.hp
	}), t.push({
		key: "system.structure.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.structure
	}), t.push({
		key: "system.stress.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.stress
	}), t.push({
		key: "system.heat.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.heatcap
	}), t.push({
		key: "system.repairs.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.repcap
	}), t.push({
		key: "system.loadout.sp.max",
		mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
		priority: Ze,
		value: e.system.stats.sp
	}), {
		flags: { lancer: { ephemeral: !0 } },
		name: e.name,
		img: e.img,
		origin: e.uuid,
		transfer: !0,
		changes: t
	};
}
function pilotInnateEffects(e) {
	if (!e.is_pilot()) throw Error("Cannot create pilot innate effect for non-pilot actor");
	return [new LancerActiveEffect({
		name: "Pilot → Mech Bonuses",
		changes: [
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.hull",
				priority: $e,
				value: e.system.hull.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.hp.max",
				priority: $e,
				value: (2 * e.system.hull + e.system.grit).toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.repairs.max",
				priority: $e,
				value: Math.floor(e.system.hull / 2).toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.agi",
				priority: $e,
				value: e.system.agi.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.evasion",
				priority: $e,
				value: e.system.agi.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.speed",
				priority: $e,
				value: Math.floor(e.system.agi / 2).toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.sys",
				priority: $e,
				value: e.system.sys.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.edef",
				priority: $e,
				value: e.system.sys.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.tech_attack",
				priority: $e,
				value: e.system.sys.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.save",
				priority: $e,
				value: e.system.grit.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.loadout.sp.max",
				priority: $e,
				value: (Math.floor(e.system.sys / 2) + e.system.grit).toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.eng",
				priority: $e,
				value: e.system.eng.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.heat.max",
				priority: $e,
				value: e.system.eng.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
				key: "system.loadout.limited_bonus",
				priority: $e,
				value: Math.floor(e.system.eng / 2).toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.grit",
				priority: $e,
				value: e.system.grit.toString()
			},
			{
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				key: "system.level",
				priority: $e,
				value: e.system.level.toString()
			}
		],
		img: e.img,
		origin: e.uuid,
		flags: { lancer: {
			target_type: z.MECH,
			ephemeral: !0
		} }
	}, { parent: e }), new LancerActiveEffect({
		name: "Pilot → Deployable Bonuses",
		changes: [{
			mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			key: "system.grit",
			priority: $e,
			value: e.system.grit.toString()
		}, {
			mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			key: "system.level",
			priority: $e,
			value: e.system.level.toString()
		}],
		img: e.img,
		origin: e.uuid,
		flags: { lancer: {
			target_type: z.DEPLOYABLE,
			ephemeral: !0
		} }
	}, { parent: e })];
}
function npcInnateEffects(e) {
	if (!e.is_npc()) throw Error("Cannot create NPC innate effect for non-NPC actor");
	return [new LancerActiveEffect({
		name: "NPC → Deployable Bonuses",
		changes: [{
			mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			key: "system.grit",
			priority: $e,
			value: e.system.tier.toString()
		}],
		img: e.img,
		origin: e.uuid,
		flags: { lancer: {
			target_type: z.DEPLOYABLE,
			ephemeral: !0
		} }
	}, { parent: e })];
}
var tt = [
	"activations",
	"armor",
	"evasion",
	"edef",
	"speed",
	"sensor_range",
	"save",
	"hull",
	"agi",
	"sys",
	"eng",
	"size",
	"hp",
	"heatcap",
	"structure",
	"stress"
];
function makeNpcBonus(e, t, m, v) {
	switch (e) {
		case "hp": return {
			key: "system.hp.max",
			mode: m,
			priority: v,
			value: t
		};
		case "heatcap": return {
			key: "system.heat.max",
			mode: m,
			priority: v,
			value: t
		};
		case "structure": return {
			key: "system.structure.max",
			mode: m,
			priority: v,
			value: t
		};
		case "stress": return {
			key: "system.stress.max",
			mode: m,
			priority: v,
			value: t
		};
		default: return {
			key: `system.${e}`,
			mode: m,
			priority: v,
			value: t
		};
	}
}
function npcClassInnateEffect(e) {
	let t = (e?.actor)?.system.tier ?? 1, m = e.system.base_stats[t - 1], v = tt.map((e) => makeNpcBonus(e, m[e], CONST.ACTIVE_EFFECT_MODES.OVERRIDE, Ze));
	return {
		flags: { lancer: { ephemeral: !0 } },
		name: e.name,
		img: e.img,
		origin: e.uuid,
		transfer: !0,
		changes: v
	};
}
function npcFeatureBonusEffects(e) {
	if (!e.system.bonus) return null;
	let t = [];
	for (let m of tt) {
		let v = e.system.bonus[m];
		v !== null && t.push(makeNpcBonus(m, v, CONST.ACTIVE_EFFECT_MODES.ADD, Qe));
	}
	return t.length ? {
		flags: { lancer: { ephemeral: !0 } },
		name: `${e.name} - bonuses`,
		img: e.img,
		origin: e.uuid,
		transfer: !0,
		changes: t
	} : null;
}
function npcFeatureOverrideEffects(e) {
	if (!e.system.override) return null;
	let t = [];
	for (let m of tt) {
		let v = e.system.override[m];
		v !== null && t.push(makeNpcBonus(m, v, CONST.ACTIVE_EFFECT_MODES.OVERRIDE, et));
	}
	return t.length ? {
		flags: { lancer: { ephemeral: !0 } },
		name: `${e.name} - overrides`,
		img: e.img,
		origin: e.uuid,
		transfer: !0,
		changes: t
	} : null;
}
function convertBonus(e, t, m) {
	let v = e.uuid, y = e.actor;
	if (m.lid == "damage" || m.lid == "range") return {
		name: t,
		flags: { [game.system.id]: {
			target_type: z.MECH,
			ephemeral: !0
		} },
		changes: [{
			mode: 12,
			value: JSON.stringify(m),
			priority: 50,
			key: "system.bonuses.weapon_bonuses"
		}],
		transfer: !0,
		disabled: !1,
		origin: v
	};
	let x = [], S, C = m.replace || m.overwrite ? CONST.ACTIVE_EFFECT_MODES.OVERRIDE : CONST.ACTIVE_EFFECT_MODES.ADD, w = m.replace || m.overwrite ? 50 : Qe, E = m.val;
	if (E.includes("{ll}")) {
		let e = `${y?.is_pilot() || y?.is_mech() ? y.system.level : 0}`;
		E = E.replace("{ll}", e);
	}
	if (E.includes("{grit}")) {
		let e = `${y?.is_pilot() || y?.is_mech() ? y.system.grit : 0}`;
		E = E.replace("{grit}", e);
	}
	switch ((E.includes("-") || E.includes("+")) && (E = `${rollEvalSync(E)}`), m.lid) {
		case "hp":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.hp.max"
			});
			break;
		case "armor":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.armor"
			});
			break;
		case "structure":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.structure.max"
			});
			break;
		case "stress":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.stress.max"
			});
			break;
		case "heatcap":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.heat.max"
			});
			break;
		case "repcap":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.repairs.max"
			});
			break;
		case "speed":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.speed"
			});
			break;
		case "evasion":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.evasion"
			});
			break;
		case "edef":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.edef"
			});
			break;
		case "sensor":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.sensor_range"
			});
			break;
		case "attack":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.bonuses.flat.range_attack"
			});
			break;
		case "tech_attack":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.tech_attack"
			});
			break;
		case "grapple":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.bonuses.flat.grapple"
			});
			break;
		case "ram":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.bonuses.flat.ram"
			});
			break;
		case "save":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.save"
			});
			break;
		case "sp":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.loadout.sp.max"
			});
			break;
		case "size":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.size"
			});
			break;
		case "ai_cap":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.ai.max"
			});
			break;
		case "cheap_struct":
			S = z.MECH, x.push({
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				value: "1",
				priority: w,
				key: "system.structure_repair_cost"
			});
			break;
		case "cheap_stress":
			S = z.MECH, x.push({
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				value: "1",
				priority: w,
				key: "system.stress_repair_cost"
			});
			break;
		case "overcharge":
			S = z.MECH, x.push({
				mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
				value: E,
				priority: w,
				key: "system.overcharge_sequence"
			});
			break;
		case "limited_bonus":
			S = z.MECH, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.loadout.limited_bonus"
			});
			break;
		case "add_mount":
			E && typeof E == "number" && getMountType(E);
			break;
		case "no_mods": break;
		case "engineering": break;
		case "pilot_hp":
			S = z.PILOT, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.hp.max"
			});
			break;
		case "pilot_armor":
			S = z.PILOT, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.armor"
			});
			break;
		case "pilot_evasion":
			S = z.PILOT, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.evasion"
			});
			break;
		case "pilot_edef":
			S = z.PILOT, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.edef"
			});
			break;
		case "pilot_speed":
			S = z.PILOT, x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.speed"
			});
			break;
		case "deployable_hp":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.hp_bonus"
			});
			break;
		case "deployable_size":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.size"
			});
			break;
		case "deployable_armor":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.armor"
			});
			break;
		case "deployable_evasion":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.evasion"
			});
			break;
		case "deployable_edef":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.edef"
			});
			break;
		case "deployable_sensor_range":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.sensor_range"
			});
			break;
		case "deployable_tech_attack":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.tech_attack_bonus"
			});
			break;
		case "deployable_save":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.save"
			});
			break;
		case "deployable_speed":
			S = "only_deployable", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.speed"
			});
			break;
		case "drone_hp":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.hp_bonus"
			});
			break;
		case "drone_size":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.size"
			});
			break;
		case "drone_armor":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.armor"
			});
			break;
		case "drone_evasion":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.evasion"
			});
			break;
		case "drone_edef":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.edef"
			});
			break;
		case "drone_sensor_range":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.sensor_range"
			});
			break;
		case "drone_tech_attack":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.tech_attack_bonus"
			});
			break;
		case "drone_save":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.save"
			});
			break;
		case "drone_speed":
			S = "only_drone", x.push({
				mode: C,
				value: E,
				priority: w,
				key: "system.speed"
			});
			break;
		default: return console.warn(`Bonus of type ${m.lid} not yet supported. Please fix or remove it. Source: ${v}`), null;
	}
	return {
		name: t,
		flags: { [game.system.id]: {
			target_type: S,
			ephemeral: !0
		} },
		changes: x,
		transfer: !0,
		disabled: !1,
		origin: v
	};
}
function bonusAffectsWeapon(e, t) {
	if (!e.is_mech_weapon()) return !1;
	let m = e.system.active_profile;
	return !(t.weapon_sizes?.[e.system.size] === !1 || t.weapon_types?.[m.type] === !1 || !m.damage.some((e) => t.damage_types?.[e.type] === !0) || !m.range.some((e) => t.range_types?.[e.type] === !0));
}
//#endregion
//#region src/module/apps/acc_diff/invisibility.ts
var nt = class Invisibility {
	constructor(e) {
		this.uiElement = "checkbox", this.slug = "invisibility", this.humanLabel = "Invisible (*)", this.category = "diff", this.visible = !0, this.disabled = !1, this.rollPrecedence = -9999, this.data = e;
	}
	get raw() {
		return this.data;
	}
	hydrate(e, t) {
		t && (this.token = tokenDocFromUuidSync(t.targetUuid)?.object || void 0);
	}
	static perUnknownTarget() {
		return new Invisibility(0);
	}
	static perTarget(e) {
		let t = Invisibility.perUnknownTarget();
		return t.token = e, t;
	}
	get tokenInvisible() {
		return this.token ? !!this.token.actor?.system.statuses.invisible : !1;
	}
	static {
		this.slug = "invisibility";
	}
	static {
		this.category = "diff";
	}
	get uiState() {
		return this.data == 0 ? this.tokenInvisible : !!(this.data + 1);
	}
	set uiState(e) {
		this.tokenInvisible == e ? this.data = 0 : e ? this.data = 1 : this.data = -1;
	}
	modifyRoll(e) {
		return this.uiState ? `{${e}} * (1dc[👻 invisibility])` : e;
	}
};
//#endregion
//#region src/module/apps/acc_diff/spotter.ts
function adjacentSpotter(e) {
	if (!e.is_mech()) return !1;
	let t = e.getActiveTokens()[0], m = new PIXI.Rectangle(t.bounds.x - 2 * canvas.grid.sizeX, t.bounds.y - 2 * canvas.grid.sizeY, t.bounds.right + 4 * canvas.grid.sizeX, t.bounds.bottom + 4 * canvas.grid.sizeY);
	return canvas.tokens.quadtree.getObjects(m, { collisionTest: (e) => {
		if (!e.t.actor?.is_mech() || e.t === t || !e.t.actor.system.pilot?.value?.itemTypes.talent.some((e) => e.system.lid === "t_spotter")) return !1;
		let m = (e.t.actor.system.pilot?.value?.itemTypes.talent.some((e) => e.system.lid === "t_house_guard") ?? !1 ? 2 : 1) + .1;
		return e.t.document.computeRange(t.document) <= m;
	} }).size >= 1;
}
function spotter() {
	return {
		actor: null,
		target: null,
		uiElement: "checkbox",
		slug: "spotter",
		category: "acc",
		humanLabel: "Spotter (*)",
		get uiState() {
			return !!(this.actor && this.target?.usingLockOn && adjacentSpotter(this.actor));
		},
		set uiState(e) {},
		disabled: !0,
		get visible() {
			return !!this.target?.usingLockOn;
		},
		modifyRoll(e) {
			return this.uiState ? `{${e},${e}}kh[🎯 spotter]` : e;
		},
		rollPrecedence: -100,
		hydrate(e, t) {
			this.actor = e.lancerActor || null, this.target = t || null;
		}
	};
}
var rt = {
	slug: "spotter",
	category: "acc",
	perTarget(e) {
		return spotter();
	}
};
(function(e) {
	return e[e.None = 0] = "None", e[e.Soft = 1] = "Soft", e[e.Hard = 2] = "Hard", e;
})({});
var AccDiffHudWeapon = class {
	#e;
	get accurate() {
		return x(this.#e);
	}
	set accurate(e) {
		O(this.#e, e, !0);
	}
	#t;
	get inaccurate() {
		return x(this.#t);
	}
	set inaccurate(e) {
		O(this.#t, e, !0);
	}
	#n;
	get seeking() {
		return x(this.#n);
	}
	set seeking(e) {
		O(this.#n, e, !0);
	}
	#r;
	get tech() {
		return x(this.#r);
	}
	set tech(e) {
		O(this.#r, e, !0);
	}
	#i;
	get smart() {
		return x(this.#i);
	}
	set smart(e) {
		O(this.#i, e, !0);
	}
	#a;
	get melee() {
		return x(this.#a);
	}
	set melee(e) {
		O(this.#a, e, !0);
	}
	#o;
	get thrown() {
		return x(this.#o);
	}
	set thrown(e) {
		O(this.#o, e, !0);
	}
	#s;
	get engaged() {
		return x(this.#s);
	}
	set engaged(e) {
		O(this.#s, e, !0);
	}
	#c;
	get plugins() {
		return x(this.#c);
	}
	set plugins(e) {
		O(this.#c, e, !0);
	}
	#l;
	static {
		this.plugins = {};
	}
	constructor(e) {
		this.#e = w(C(e.accurate)), this.#t = w(C(e.inaccurate)), this.#n = w(C(e.seeking)), this.#r = w(C(e.tech)), this.#i = w(C(e.smart)), this.#a = w(C(e.melee)), this.#o = w(C(e.thrown)), this.#s = w(C(e.engaged)), this.#c = w(C(e.plugins));
	}
	get raw() {
		return {
			accurate: this.accurate,
			inaccurate: this.inaccurate,
			seeking: this.seeking,
			tech: this.tech,
			smart: this.smart,
			melee: this.melee,
			thrown: this.thrown,
			engaged: this.engaged,
			plugins: this.plugins
		};
	}
	get impaired() {
		return !!this.#l?.lancerActor?.system?.statuses.impaired;
	}
	get engagedStatus() {
		return !!this.#l?.lancerActor?.system?.statuses.engaged;
	}
	total(e) {
		return !!this.accurate - +!!this.inaccurate - !!this.impaired - !!this.engaged - (this.seeking || this.tech || this.melee && !this.thrown ? 0 : e);
	}
	hydrate(e) {
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate && this.plugins[t].hydrate(e);
		this.#l = e;
	}
}, AccDiffHudBase = class {
	#e;
	get grit() {
		return x(this.#e);
	}
	set grit(e) {
		O(this.#e, e, !0);
	}
	#t;
	get flatBonus() {
		return x(this.#t);
	}
	set flatBonus(e) {
		O(this.#t, e, !0);
	}
	#n;
	get accuracy() {
		return x(this.#n);
	}
	set accuracy(e) {
		O(this.#n, e, !0);
	}
	#r;
	get difficulty() {
		return x(this.#r);
	}
	set difficulty(e) {
		O(this.#r, e, !0);
	}
	#i;
	get cover() {
		return x(this.#i);
	}
	set cover(e) {
		O(this.#i, e, !0);
	}
	#a;
	get plugins() {
		return x(this.#a);
	}
	set plugins(e) {
		O(this.#a, e, !0);
	}
	#o;
	get total() {
		return x(this.#o);
	}
	set total(e) {
		O(this.#o, e);
	}
	#s;
	static {
		this.plugins = {};
	}
	constructor(e) {
		this.#e = w(C(e.grit)), this.#t = w(C(e.flatBonus)), this.#n = w(C(e.accuracy)), this.#r = w(C(e.difficulty)), this.#i = w(C(e.cover)), this.#a = w(C(e.plugins)), this.#o = S(() => this._total());
	}
	get raw() {
		return {
			grit: this.grit,
			flatBonus: this.flatBonus,
			accuracy: this.accuracy,
			difficulty: this.difficulty,
			cover: this.cover,
			plugins: this.plugins
		};
	}
	hydrate(e) {
		this.#s = e.weapon;
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate && this.plugins[t].hydrate(e);
	}
	_total() {
		return this.accuracy - this.difficulty + this.#s.total(this.cover);
	}
}, it = class AccDiffHudTarget extends AccDiffHudBase {
	#e;
	get targetUuid() {
		return x(this.#e);
	}
	set targetUuid(e) {
		O(this.#e, e, !0);
	}
	#t;
	get targetName() {
		return x(this.#t);
	}
	set targetName(e) {
		O(this.#t, e);
	}
	#n;
	get targetImg() {
		return x(this.#n);
	}
	set targetImg(e) {
		O(this.#n, e);
	}
	#r;
	get consumeLockOn() {
		return x(this.#r);
	}
	set consumeLockOn(e) {
		O(this.#r, e, !0);
	}
	#i;
	get prone() {
		return x(this.#i);
	}
	set prone(e) {
		O(this.#i, e, !0);
	}
	#a;
	get stunned() {
		return x(this.#a);
	}
	set stunned(e) {
		O(this.#a, e, !0);
	}
	#o;
	get lockOnAvailable() {
		return x(this.#o);
	}
	set lockOnAvailable(e) {
		O(this.#o, e, !0);
	}
	#s;
	get usingLockOn() {
		return x(this.#s);
	}
	set usingLockOn(e) {
		O(this.#s, e);
	}
	#c;
	#l;
	static {
		this.plugins = {};
	}
	constructor(e) {
		if (super(e), e.targetUuid && !canvas.scene.tokens.find((t) => t.uuid === e.targetUuid)) throw ui.notifications.error("Trying to access tokens from a different scene!"), Error(`Token ${e.targetUuid} not found in the active scene`);
		this.#e = w(C(e.targetUuid));
		let t = tokenDocFromUuidSync(this.targetUuid, { strict: !0 });
		this.#t = S(() => t?.name || ""), this.#n = S(() => t?.actor?.img || ""), this.#r = w(C(e.consumeLockOn)), this.#i = w(C(e.prone)), this.#a = w(C(e.stunned)), this.#o = w(C(t?.actor?.system.statuses.lockon || null)), this.#s = S(() => this.consumeLockOn && this.lockOnAvailable || null);
	}
	get raw() {
		return {
			...super.raw,
			targetUuid: this.targetUuid,
			consumeLockOn: this.consumeLockOn,
			prone: this.prone,
			stunned: this.stunned,
			plugins: this.plugins
		};
	}
	static fromParams(e) {
		let t = 0;
		e.actor?.statuses.has("cover_hard") ? t = 2 : e.actor?.statuses.has("cover_soft") && (t = 1);
		let m = {
			targetUuid: e.document.uuid,
			grit: 0,
			flatBonus: 0,
			accuracy: 0,
			difficulty: 0,
			cover: t,
			consumeLockOn: !0,
			prone: e.actor?.system.statuses.prone || !1,
			stunned: e.actor?.system.statuses.stunned || !1,
			plugins: {}
		};
		for (let t of at.targetedPlugins) m.plugins[t.slug] = t.perTarget(e);
		return new AccDiffHudTarget(m);
	}
	hydrate(e) {
		this.#c = e.weapon, this.#l = e.base;
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate && this.plugins[t].hydrate(e, this);
	}
	_total() {
		let e = this.accuracy - this.difficulty + this.#c.total(this.cover) + this.#l.accuracy - this.#l.difficulty, t = +!!this.usingLockOn, m = +!!this.prone;
		return e + t + m;
	}
}, at = class AccDiffHudData {
	#e;
	get title() {
		return x(this.#e);
	}
	set title(e) {
		O(this.#e, e, !0);
	}
	#t;
	get weapon() {
		return x(this.#t);
	}
	set weapon(e) {
		O(this.#t, e, !0);
	}
	#n;
	get base() {
		return x(this.#n);
	}
	set base(e) {
		O(this.#n, e, !0);
	}
	#r;
	get targets() {
		return x(this.#r);
	}
	set targets(e) {
		O(this.#r, e, !0);
	}
	constructor(e) {
		this.#e = w(C(e.title)), this.#t = w(C(new AccDiffHudWeapon(e.weapon))), this.#n = w(C(new AccDiffHudBase(e.base))), this.#r = w(C(e.targets.map((e) => new it(e)))), this.hydrate(e.runtimeData ? fromUuidSync(e.runtimeData) : null);
	}
	hydrate(e) {
		e instanceof Dt ? (this.lancerItem = e, this.lancerActor = e.actor ?? void 0) : e instanceof Un && (this.lancerActor = e ?? void 0), this.weapon.hydrate(this), this.base.hydrate(this);
		for (let e of this.targets) e.hydrate(this);
	}
	replaceTargets(e) {
		let t = {};
		for (let e of this.targets) t[e.targetUuid] = e;
		for (let t = this.targets.length - 1; t >= 0 && !(t < 0); t--) {
			let m = this.targets[t];
			e.some((e) => e === m.targetUuid) || this.targets.splice(t, 1);
		}
		for (let t of e) {
			let e = tokenDocFromUuidSync(t, { strict: !0 })?.object || null;
			if (!e) continue;
			let m = this.targets.find((e) => e.targetUuid === t);
			m ? (m.prone = e.actor?.system.statuses.prone || !1, m.stunned = e.actor?.system.statuses.stunned || !1, m.lockOnAvailable = e.actor?.system.statuses.lockon || !1, e.actor?.system.statuses.cover_hard ? m.cover = 2 : e.actor?.system.statuses.cover_soft && (m.cover = 1)) : this.targets.push(it.fromParams(e));
		}
		for (let e of this.targets) e.hydrate(this);
		return this;
	}
	get raw() {
		return {
			title: this.title,
			weapon: this.weapon.raw,
			base: this.base.raw,
			targets: this.targets.map((e) => e.raw),
			runtimeData: this.lancerItem?.uuid || this.lancerActor?.uuid
		};
	}
	static fromObject(e, t) {
		let m = new this(e);
		return m.hydrate(t), m;
	}
	static {
		this.plugins = [];
	}
	static {
		this.targetedPlugins = [];
	}
	static registerPlugin(e) {
		e.perRoll && (AccDiffHudWeapon.plugins[e.slug] = e), e.perUnknownTarget && (AccDiffHudBase.plugins[e.slug] = e), e.perTarget && (it.plugins[e.slug] = e, this.targetedPlugins.push(e)), this.plugins.push(e);
	}
	static fromParams(e, t, m, v, y, x, S) {
		let C = e instanceof Dt && (e.is_mech_weapon() || e.is_pilot_weapon() || e.is_npc_feature() && e.system.type === re.Weapon) ? e : null, w = e instanceof Dt && !e.is_mech_weapon() && !e.is_pilot_weapon() && !(e.is_npc_feature() && e.system.type === re.Weapon) ? e : null, E = !!(m?.toLowerCase() === "tech attack" || w), O = {
			accurate: !1,
			inaccurate: !1,
			seeking: !1,
			tech: E,
			smart: E,
			melee: C?.currentProfile().type === ae.Melee || !1,
			thrown: !1,
			engaged: !1,
			plugins: {}
		};
		S ? typeof S == "number" && (S = S >= 0 ? [S, 0] : [0, -S]) : S = [0, 0];
		for (let e of t || []) switch (e.lid) {
			case "tg_accurate":
				O.accurate = !0;
				break;
			case "tg_inaccurate":
				O.inaccurate = !0;
				break;
			case "tg_smart":
				O.smart = !0;
				break;
			case "tg_seeking":
				O.seeking = !0;
				break;
			case "tg_thrown":
				O.thrown = !0;
				break;
		}
		let k = {
			grit: y || 0,
			flatBonus: x || 0,
			cover: 0,
			accuracy: S[0],
			difficulty: S[1],
			plugins: {}
		}, ee = {
			title: m || "Accuracy and Difficulty",
			weapon: O,
			base: k,
			targets: (v || []).map((e) => {
				let t = 0;
				e.actor?.statuses.has("cover_hard") ? t = 2 : e.actor?.statuses.has("cover_soft") && (t = 1);
				let m = {
					targetUuid: e.document.uuid,
					grit: k.grit,
					flatBonus: k.flatBonus,
					accuracy: 0,
					difficulty: 0,
					cover: t,
					consumeLockOn: !0,
					prone: e.actor?.system.statuses.prone || !1,
					stunned: e.actor?.system.statuses.stunned || !1,
					plugins: {}
				};
				for (let t of this.targetedPlugins) m.plugins[t.slug] = t.perTarget(e);
				return m;
			})
		};
		for (let t of this.plugins) t.perRoll && (ee.weapon.plugins[t.slug] = t.perRoll(e)), t.perUnknownTarget && (ee.base.plugins[t.slug] = t.perUnknownTarget());
		return AccDiffHudData.fromObject(ee, e);
	}
};
//#endregion
//#region src/module/token.ts
at.registerPlugin(nt), at.registerPlugin(rt), foundry.grid.BaseGrid;
var LancerTokenDocument = class extends TokenDocument {
	_initializeSource(e, t) {
		return this.parent?.grid.isGridless && (e.shape ??= CONST.TOKEN_SHAPES.ELLIPSE_1), super._initializeSource(e, t);
	}
	_preCreate(e, t, m) {
		if (game.settings.get(game.system.id, ve.setting_automation).token_size && !this.getFlag(game.system.id, "manual_token_size")) {
			let e = Math.max(1, this.actor?.system.size ?? 1);
			this.updateSource({
				width: e,
				height: e
			});
		}
		return super._preCreate(e, t, m);
	}
	_onRelatedUpdate(e, t) {
		if (super._onRelatedUpdate(e, t), game.settings.get(game.system.id, ve.setting_automation).token_size && !this.getFlag(game.system.id, "manual_token_size")) {
			let e = this.actor ? Math.max(1, this.actor.system.size) : void 0;
			this.isOwner && this.id && e !== void 0 && (this.width !== e || this.height !== e) && this.update({
				width: e,
				height: e
			});
		}
	}
	testInsideRegion(e, t = {}) {
		if (!this.parent || this.parent !== e.parent) throw Error("The Token and the Region must be in the same Scene");
		return this.parent.grid.isGridless ? super.testInsideRegion(e, t) : this.getOccupiedGridSpaceOffsets({
			...this._source,
			...t
		}).some((m) => {
			let v = this.parent.grid.getCenterPoint(m);
			return v.elevation = t.elevation ?? this._source.elevation, e.testPoint(v);
		});
	}
	segmentizeRegionMovementPath(e, t) {
		if (!this.parent || this.parent !== e.parent) throw Error("The Token and the Region must be in the same Scene");
		if (this.parent.grid.isGridless) return super.segmentizeRegionMovementPath(e, t);
		if (t.length <= 1) return [];
		let m = [], v = this._source, { x: y = v.x, y: x = v.y, elevation: S = v.elevation, width: C = v.width, height: w = v.height, shape: E = v.shape, action: O = this.movementAction } = t[0], k = {
			x: y,
			y: x,
			elevation: S
		};
		for (let v = 1; v < t.length; v++) {
			let { x: y = k.x, y: x = k.y, elevation: S = k.elevation, width: ee = C, height: I = w, shape: te = E, action: z = O, terrain: ne = null, snapped: re = !1 } = t[v];
			y = Math.round(y), x = Math.round(x);
			let ie = {
				x: y,
				y: x,
				elevation: S,
				teleport: CONFIG.Token.movement.actions[z].teleport
			}, B = this.getCenterPoint({
				x: 0,
				y: 0,
				elevation: S,
				width: ee,
				height: I,
				shape: te
			}), q = this.getSnappedPosition({
				x: 0,
				y: 0
			}), ae = this.getOccupiedGridSpaceOffsets({
				x: 0,
				y: 0,
				elevation: S,
				width: ee,
				height: I,
				shape: te
			}).map((e) => {
				let t = this.parent.grid.getCenterPoint(e);
				return {
					x: t.x - q.x,
					y: t.y - q.y
				};
			});
			if (ee !== C || I !== w || te !== E) {
				let e = this.getCenterPoint({
					x: k.x,
					y: k.y,
					elevation: k.elevation,
					width: C,
					height: w,
					shape: E
				});
				k.x = Math.round(e.x - B.x), k.y = Math.round(e.y - B.y), k.elevation = e.elevation - B.elevation;
			}
			for (let t of e.segmentizeMovementPath([k, ie], ae)) {
				delete t.teleport, t.action = z, t.terrain = ne ? ne.clone() : null, t.snapped = re;
				let { from: e, to: v } = t;
				e.width = ee, e.height = I, e.shape = te, v.width = ee, v.height = I, v.shape = te, m.push(t);
			}
			k = ie, C = ee, w = I, E = te, O = z;
		}
		return m;
	}
	computeRange(e, t = {}, m = {}) {
		let v = this.parent?.grid ?? canvas.grid;
		if (!v || !canvas.ready) throw Error("Canvas not ready");
		if (!this.object || !e.object) throw Error("Tokens not drawn to canvas");
		if (v.isGridless) return v.measurePath([this.object.center, e.object.center], {}).distance - (this.width + e.width) / 2 + 1;
		{
			let y = this.getOccupiedGridSpaceOffsets(t).flatMap((t) => e.getOccupiedGridSpaceOffsets(m).map((e) => v.measurePath([t, e], {}).spaces));
			return Math.min(...y);
		}
	}
}, LancerToken = class extends foundry.canvas.placeables.Token {
	getOccupiedSpaces() {
		return foundry.utils.logCompatibilityWarning("getOccupiedSpaces is deprecated in favor of the core getOccupiedGridSpaceOffsets", {
			since: 13,
			until: 14
		}), this.document.getOccupiedGridSpaceOffsets()?.map((e) => canvas.grid?.getCenterPoint(e)).filter((e) => e != null);
	}
};
function extendTokenConfig(e, t) {
	let { token_size: m } = game.settings.get(game.system.id, ve.setting_automation);
	if (!m) return;
	let v = e.token.getFlag(game.system.id, "manual_token_size") ?? !1, y = foundry.applications.fields.createCheckboxInput({
		name: `flags.${game.system.id}.manual_token_size`,
		dataset: { tooltip: "lancer.tokenConfig.manual_token_size.hint" },
		classes: `lock icon ${game.system.id}`,
		value: v
	}), x = t.querySelector("input[name=width]"), S = t.querySelector("[name=height]");
	!x || !S || (x.closest(".form-group")?.querySelector("label")?.before(y), y.addEventListener("change", (e) => {
		x.disabled = !e.currentTarget.checked, S.disabled = !e.currentTarget.checked;
	}), x.disabled = !v, S.disabled = !v);
}
//#endregion
//#region src/module/flows/interfaces.ts
var ot;
(function(e) {
	function isStatRoll(e) {
		return e.type === "stat";
	}
	e.isStatRoll = isStatRoll;
	function isAttackRoll(e) {
		return e.type === "attack";
	}
	e.isAttackRoll = isAttackRoll;
	function isWeaponRoll(e) {
		return e.type === "weapon";
	}
	e.isWeaponRoll = isWeaponRoll;
	function isTechRoll(e) {
		return e.type === "tech";
	}
	e.isTechRoll = isTechRoll;
	function isActionRoll(e) {
		return e.type === "action";
	}
	e.isActionRoll = isActionRoll, e.BasicFlowType = /* @__PURE__ */ function(e) {
		return e.FullRepair = "FullRepair", e.Stabilize = "Stabilize", e.Overheat = "Overheat", e.Structure = "Structure", e.Burn = "Burn", e.Overcharge = "Overcharge", e.BasicAttack = "BasicAttack", e.Damage = "Damage", e.TechAttack = "TechAttack", e.Scan = "Scan", e;
	}({});
})(ot ||= {});
//#endregion
//#region src/module/apps/damage/data.svelte.ts
var st = ve.log_prefix, ct = (function(e) {
	return e[e.Miss = 0] = "Miss", e[e.Hit = 1] = "Hit", e[e.Crit = 2] = "Crit", e;
})({});
function ensureDamageType(e) {
	return {
		type: Object.keys(le).includes(e.type) ? e.type : le.Kinetic,
		val: e.val
	};
}
var DamageHudWeapon = class {
	#e;
	get damage() {
		return x(this.#e);
	}
	set damage(e) {
		O(this.#e, e, !0);
	}
	#t;
	get bonusDamage() {
		return x(this.#t);
	}
	set bonusDamage(e) {
		O(this.#t, e, !0);
	}
	#n;
	get reliable() {
		return x(this.#n);
	}
	set reliable(e) {
		O(this.#n, e, !0);
	}
	#r;
	get reliableValue() {
		return x(this.#r);
	}
	set reliableValue(e) {
		O(this.#r, e, !0);
	}
	#i;
	get overkill() {
		return x(this.#i);
	}
	set overkill(e) {
		O(this.#i, e, !0);
	}
	#a;
	get plugins() {
		return x(this.#a);
	}
	set plugins(e) {
		O(this.#a, e, !0);
	}
	#o;
	static {
		this.plugins = {};
	}
	constructor(e) {
		let t = e.damage.map(ensureDamageType), m = e.bonusDamage.map(ensureDamageType);
		this.#e = w(C(t)), this.#t = w(C(m)), this.#n = w(C(e.reliable)), this.#r = w(C(e.reliableValue)), this.#i = w(C(e.overkill)), this.#a = w(C(e.plugins));
	}
	get raw() {
		return {
			damage: this.damage,
			bonusDamage: this.bonusDamage,
			reliable: this.reliable,
			reliableValue: this.reliableValue,
			overkill: this.overkill,
			plugins: this.plugins
		};
	}
	hydrate(e) {
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate(e);
		this.#o = e;
	}
	get total() {
		return {
			damage: this.damage,
			bonusDamage: this.bonusDamage
		};
	}
	static parseReliableVal(e, t) {
		if (!e.val) return 0;
		let m = 1;
		t && (t instanceof Dt && t.actor?.is_npc() ? m = t.actor.system.tier || 1 : t instanceof Un && t.is_npc() && (m = t.system.tier || 1));
		let v = parseInt(e.tierVal(m));
		return Number.isNaN(v) ? 0 : v;
	}
}, DamageHudBase = class {
	#e;
	get ap() {
		return x(this.#e);
	}
	set ap(e) {
		O(this.#e, e, !0);
	}
	#t;
	get paracausal() {
		return x(this.#t);
	}
	set paracausal(e) {
		O(this.#t, e, !0);
	}
	#n;
	get halfDamage() {
		return x(this.#n);
	}
	set halfDamage(e) {
		O(this.#n, e, !0);
	}
	#r;
	get damage() {
		return x(this.#r);
	}
	set damage(e) {
		O(this.#r, e, !0);
	}
	#i;
	get bonusDamage() {
		return x(this.#i);
	}
	set bonusDamage(e) {
		O(this.#i, e, !0);
	}
	#a;
	get plugins() {
		return x(this.#a);
	}
	set plugins(e) {
		O(this.#a, e, !0);
	}
	#o;
	get total() {
		return x(this.#o);
	}
	set total(e) {
		O(this.#o, e);
	}
	#s;
	static {
		this.plugins = {};
	}
	constructor(e) {
		let t = e.damage.map(ensureDamageType), m = e.bonusDamage.map(ensureDamageType);
		this.#e = w(C(e.ap)), this.#t = w(C(e.paracausal)), this.#n = w(C(e.halfDamage)), this.#r = w(C(t)), this.#i = w(C(m)), this.#a = w(C(e.plugins)), this.#o = S(() => this._total());
	}
	get raw() {
		return {
			ap: this.ap,
			paracausal: this.paracausal,
			halfDamage: this.halfDamage,
			damage: this.damage,
			bonusDamage: this.bonusDamage,
			plugins: this.plugins
		};
	}
	hydrate(e) {
		this.#s = e.weapon;
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate(e);
	}
	_total() {
		let e = this.#s?.total || {
			damage: [],
			bonusDamage: []
		};
		return {
			damage: e.damage.concat(this.damage),
			bonusDamage: e.bonusDamage.concat(this.bonusDamage)
		};
	}
}, lt = class DamageHudTarget extends DamageHudBase {
	#e;
	get targetUuid() {
		return x(this.#e);
	}
	set targetUuid(e) {
		O(this.#e, e, !0);
	}
	#t;
	get targetName() {
		return x(this.#t);
	}
	set targetName(e) {
		O(this.#t, e);
	}
	#n;
	get targetImg() {
		return x(this.#n);
	}
	set targetImg(e) {
		O(this.#n, e);
	}
	#r;
	get quality() {
		return x(this.#r);
	}
	set quality(e) {
		O(this.#r, e, !0);
	}
	#i;
	#a;
	constructor(e) {
		if (e.damage.length && console.warn(`${st} Non-bonus damage was provided for damage target, but will be ignored.`), e.damage = [], super(e), e.targetUuid && !canvas.scene.tokens.find((t) => t.uuid === e.targetUuid)) throw ui.notifications.error("Trying to access tokens from a different scene!"), Error(`Token ${e.targetUuid} not found in the active scene`);
		this.#e = w(C(e.targetUuid));
		let t = tokenDocFromUuidSync(this.targetUuid, { strict: !0 });
		this.#t = S(() => t?.name || ""), this.#n = S(() => t?.actor?.img || ""), this.#r = w(C(e.quality));
	}
	get raw() {
		return {
			targetUuid: this.targetUuid,
			quality: this.quality,
			ap: this.ap,
			paracausal: this.paracausal,
			damage: [],
			halfDamage: this.halfDamage,
			bonusDamage: this.bonusDamage,
			plugins: this.plugins
		};
	}
	static fromParams(e, t) {
		let m = {
			targetUuid: e.document.uuid,
			quality: t?.quality ?? 1,
			ap: t?.ap || !1,
			paracausal: t?.paracausal || !1,
			halfDamage: t?.halfDamage || !1,
			damage: [],
			bonusDamage: t?.bonusDamage || [],
			plugins: {}
		};
		for (let t of ut.targetedPlugins) m.plugins[t.slug] = t.perTarget(e);
		return new DamageHudTarget(m);
	}
	hydrate(e) {
		this.#i = e.weapon, this.#a = e.base;
		for (let t of Object.keys(this.plugins)) this.plugins[t].hydrate(e, this);
	}
	_total() {
		let e = this.#a.total;
		return {
			damage: e.damage,
			bonusDamage: this.bonusDamage.concat(e.bonusDamage)
		};
	}
}, DamageHudHitResult = class {
	#e;
	get targetUuid() {
		return x(this.#e);
	}
	set targetUuid(e) {
		O(this.#e, e, !0);
	}
	#t;
	get total() {
		return x(this.#t);
	}
	set total(e) {
		O(this.#t, e, !0);
	}
	#n;
	get usedLockOn() {
		return x(this.#n);
	}
	set usedLockOn(e) {
		O(this.#n, e, !0);
	}
	#r;
	get hit() {
		return x(this.#r);
	}
	set hit(e) {
		O(this.#r, e, !0);
	}
	#i;
	get crit() {
		return x(this.#i);
	}
	set crit(e) {
		O(this.#i, e, !0);
	}
	constructor(e) {
		this.#e = w(C(e.targetUuid)), this.#t = w(C(e.total)), this.#n = w(C(e.usedLockOn)), this.#r = w(C(e.hit)), this.#i = w(C(e.crit));
	}
	get raw() {
		return {
			targetUuid: this.targetUuid,
			total: this.total,
			usedLockOn: this.usedLockOn,
			hit: this.hit,
			crit: this.crit
		};
	}
}, ut = class DamageHudData {
	#e;
	get title() {
		return x(this.#e);
	}
	set title(e) {
		O(this.#e, e, !0);
	}
	#t;
	get weapon() {
		return x(this.#t);
	}
	set weapon(e) {
		O(this.#t, e, !0);
	}
	#n;
	get base() {
		return x(this.#n);
	}
	set base(e) {
		O(this.#n, e, !0);
	}
	#r;
	get hitResults() {
		return x(this.#r);
	}
	set hitResults(e) {
		O(this.#r, e, !0);
	}
	#i;
	get targets() {
		return x(this.#i);
	}
	set targets(e) {
		O(this.#i, e, !0);
	}
	constructor(e) {
		this.#e = w(C(e.title)), this.#t = w(C(new DamageHudWeapon(e.weapon || {
			overkill: !1,
			reliable: !1,
			reliableValue: 0,
			damage: [],
			bonusDamage: [],
			plugins: {}
		}))), this.#n = w(C(new DamageHudBase(e.base))), this.#r = w(C(e.hitResults.map((e) => new DamageHudHitResult(e)))), this.#i = w(C(e.targets.map((e) => new lt(e)))), this.hydrate();
	}
	hydrate(e) {
		e instanceof Dt ? (this.lancerItem = e, this.lancerActor = e.actor ?? void 0) : e instanceof Un && (this.lancerActor = e ?? void 0), this.weapon?.hydrate(this), this.base.hydrate(this);
		for (let e of this.targets) e.hydrate(this);
	}
	replaceTargets(e) {
		let t = {};
		for (let e of this.targets) t[e.targetUuid] = e;
		for (let t = this.targets.length - 1; t >= 0 && !(t < 0); t--) {
			let m = this.targets[t];
			e.some((e) => e === m.targetUuid) || this.targets.splice(t, 1);
		}
		for (let t of e) {
			let e = tokenDocFromUuidSync(t, { strict: !0 })?.object || null;
			e && (this.targets.find((e) => e.targetUuid === t) || this.targets.push(lt.fromParams(e)));
		}
		for (let e of this.targets) e.hydrate(this);
		return this;
	}
	get raw() {
		return {
			title: this.title,
			weapon: this.weapon,
			base: this.base,
			hitResults: this.hitResults,
			targets: this.targets
		};
	}
	static fromObject(e, t) {
		let m = new this(e);
		return m.hydrate(t), m;
	}
	static {
		this.plugins = [];
	}
	static {
		this.targetedPlugins = [];
	}
	static registerPlugin(e) {
		e.perRoll && (DamageHudWeapon.plugins[e.slug] = e), e.perUnknownTarget && (DamageHudBase.plugins[e.slug] = e), e.perTarget && (lt.plugins[e.slug] = e, this.targetedPlugins.push(e)), this.plugins.push(e);
	}
	static getHitQuality(e, t) {
		if (!t || !t.length) return 1;
		let m = (t || []).find((t) => t.targetUuid === e.document.uuid);
		return m ? m.crit ? 2 : +!!m.hit : 1;
	}
	getHitQuality(e) {
		return DamageHudData.getHitQuality(e, this.hitResults);
	}
	static fromParams(e, t) {
		let m = {
			damage: [],
			bonusDamage: [],
			reliable: !1,
			reliableValue: 0,
			overkill: !1,
			plugins: {}
		}, v = {
			ap: t?.ap ?? !1,
			paracausal: t?.paracausal ?? !1,
			halfDamage: t?.halfDamage ?? !1,
			damage: t?.starting?.damage ?? [],
			bonusDamage: t?.starting?.bonusDamage ?? [],
			plugins: {}
		};
		for (let y of t?.tags || []) switch (y.lid) {
			case "tg_ap":
				v.ap = !0;
				break;
			case "tg_overkill":
				m.overkill = !0;
				break;
			case "tg_reliable": m.reliable = !0, m.reliableValue = DamageHudWeapon.parseReliableVal(y, e);
		}
		if (e instanceof Dt) if (e.is_mech_weapon()) {
			let t = e.system.active_profile;
			m.damage = t.damage, m.bonusDamage = t.bonus_damage;
		} else if (e.is_npc_feature() && e.system.type === re.Weapon) {
			let t = (e.actor?.system.tier || 1) - 1;
			m.damage = e.system.damage[t];
		} else e.is_pilot_weapon() && (m.damage = e.system.damage);
		let y = (t?.hitResults || []).map((e) => new DamageHudHitResult({
			...e,
			targetUuid: e.target.document.uuid
		})), x = {
			title: t?.title ? t.title : "Damage Roll",
			weapon: m,
			base: v,
			hitResults: y.map((e) => e.raw),
			targets: (t?.targets || []).map((e) => {
				let t = {
					targetUuid: e.document.uuid,
					quality: DamageHudData.getHitQuality(e, y),
					ap: v.ap,
					paracausal: v.paracausal,
					halfDamage: v.halfDamage,
					damage: [],
					bonusDamage: [],
					plugins: {}
				};
				for (let m of this.targetedPlugins) t.plugins[m.slug] = m.perTarget(e);
				return t;
			})
		};
		for (let t of this.plugins) t.perRoll && x.weapon && (x.weapon.plugins[t.slug] = t.perRoll(e)), t.perUnknownTarget && (x.base.plugins[t.slug] = t.perUnknownTarget());
		return DamageHudData.fromObject(x, e);
	}
};
//#endregion
//#region src/module/helpers/automation/targeting.ts
async function checkForHit(e, t, m) {
	let v = m.system, y = e ? v.edef || 8 : v.evasion || 5;
	return (t.total ?? 0) >= y;
}
function gridDist(e, t) {
	let m = e.center, v = t.center, y = new Ray(m, v);
	return canvas?.grid?.grid?.measureDistances([{ ray: y }], { gridSpaces: !0 })[0];
}
//#endregion
//#region node_modules/nanoid/index.browser.js
var nanoid = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
//#endregion
//#region src/module/flows/_render.ts
async function renderTemplateStep(e, t, m, v) {
	m._uuid = nanoid();
	let y = await foundry.applications.handlebars.renderTemplate(t, m), x = [];
	return m.roll && x.push(m.roll), m.result && x.push(m.result.roll), (m.attack_results?.length ?? 0) > 0 && x.push(...m.attack_results.map((e) => e.roll)), (m.crit_damage_results?.length ?? 0) > 0 ? x.push(...m.crit_damage_results.map((e) => e.roll)) : (m.damage_results?.length ?? 0) > 0 && x.push(...m.damage_results.map((e) => e.roll)), m.self_heat_result && x.push(m.self_heat_result.roll), createChatMessageStep(e, y, x, v);
}
async function createChatMessageStep(e, t, m, v) {
	m && !Array.isArray(m) && (m = [m]);
	let y = {
		type: CONST.CHAT_MESSAGE_STYLES.IC,
		rolls: m,
		speaker: {
			actor: e,
			token: e?.token,
			alias: e?.token ? e.token.name : null
		},
		content: t,
		flavor: "",
		flags: v ? { lancer: v } : void 0
	}, x = game.settings.get("core", "rollMode");
	switch (x) {
		case CONST.DICE_ROLL_MODES.BLIND:
			y.flavor = game.i18n.localize("CHAT.RollBlind");
			break;
		case CONST.DICE_ROLL_MODES.PRIVATE:
			y.flavor = game.i18n.localize("CHAT.RollPrivate");
			break;
		case CONST.DICE_ROLL_MODES.SELF:
			y.flavor = game.i18n.localize("CHAT.RollSelf");
			break;
	}
	ChatMessage.applyRollMode(y, x), m || delete y.rolls, (await ChatMessage.implementation.create(y))?.render();
}
//#endregion
//#region src/module/flows/flow.ts
var dt = ve.log_prefix, ft = class Flow {
	static {
		this.steps = ["emptyStep"];
	}
	constructor(e, t) {
		let m = null, v = null;
		if (typeof e == "string") {
			let t = fromUuidSync(e);
			if (t instanceof Dt) m = t;
			else if (t instanceof Un) v = t;
			else throw TypeError("Flow argument 'uuid' must resolve to an Item or an Actor.");
		} else if (e instanceof Dt) m = e;
		else if (e instanceof Un) v = e;
		else throw TypeError("Flow argument 'uuid' must be a valid UUID string, an Item, or an Actor.");
		if (m && !v && (v = m.parent, !v)) throw TypeError("Flow argument 'uuid' was given an Item which is not owned by an Actor. Only owned Items can be used in Flows.");
		if (!v) throw TypeError("Flow argument 'uuid' did not resolve to an Actor.");
		this.state = {
			name: this.constructor.name,
			actor: v,
			item: m,
			currentStep: "",
			data: t
		};
	}
	static getStep(e) {
		return game.lancer.flowSteps.get(e) ?? null;
	}
	getStep(e) {
		return Flow.getStep(e);
	}
	static insertStepBefore(e, t) {
		let m = this.steps.indexOf(e);
		m == -1 && this.steps.push(t), this.steps.splice(m, 0, t);
	}
	static insertStepAfter(e, t) {
		let m = this.steps.indexOf(e);
		m == -1 && this.steps.push(t), this.steps.splice(m + 1, 0, t);
	}
	static removeStep(e) {
		let t = this.steps.indexOf(e);
		this.steps.splice(t, 1);
	}
	async begin(e) {
		this.state.data = e || this.state.data, Hooks.callAll(`lancer.preFlow.${this.constructor.name}`, this);
		for (let t of this.constructor.steps) {
			console.log(`${dt} running flow step ${t}`), this.state.currentStep = t;
			let m = this.getStep(t);
			if (!m) return ui.notifications.error(`Lancer flow error: ${t} is not a valid step`), console.log(`${dt} Flow aborted when ${t} was not found. All steps in this flow:`, this.constructor.steps), !1;
			if (m instanceof Flow) {
				if (await m.begin() === !1) return console.log(`${dt} flow aborted when ${t} returned false`), Hooks.callAll(`lancer.postFlow.${this.constructor.name}`, this, !1), !1;
			} else if (await m(this.state, e) === !1) return console.log(`${dt} flow aborted when ${t} returned false`), Hooks.callAll(`lancer.postFlow.${this.constructor.name}`, this, !1), !1;
		}
		return Hooks.callAll(`lancer.postFlow.${this.constructor.name}`, this, !0), !0;
	}
	serialize() {
		return JSON.stringify({
			name: this.state.name,
			uuid: this.state.item ? this.state.item.uuid : this.state.actor.uuid,
			data: this.state.data
		});
	}
	static deserialize(e) {
		let t = JSON.parse(e);
		return new Flow(t.uuid, t.data);
	}
}, pt = ve.log_prefix;
function rollStr(e, t) {
	let m = "";
	if (t != 0) {
		let e = t > 0 ? "+" : "-", v = Math.abs(t);
		m = ` ${e} ${v == 1 ? "1d6" : `${v}d6kh1`}`;
	}
	return `1d20 + ${e}${m}`;
}
function applyPluginsToRoll(e, t) {
	return t.sort((e, t) => t.rollPrecedence - e.rollPrecedence).reduce((e, t) => t.modifyRoll(e), e);
}
function attackRolls(e, t) {
	let m = Object.values(t.weapon.plugins), v = m.concat(Object.values(t.base.plugins));
	return {
		roll: applyPluginsToRoll(rollStr(e, t.base.total), v),
		targeted: t.targets.map((t) => {
			let v = m.concat(Object.values(t.plugins));
			return {
				targetUuid: t.targetUuid,
				roll: applyPluginsToRoll(rollStr(e, t.total), v),
				usedLockOn: t.usingLockOn
			};
		})
	};
}
function registerAttackSteps(e) {
	e.set("initAttackData", initAttackData), e.set("checkWeaponLoaded", checkWeaponLoaded), e.set("setAttackTags", setAttackTags), e.set("setAttackEffects", setAttackEffects), e.set("setAttackTargets", setAttackTargets), e.set("showAttackHUD", showAttackHUD), e.set("rollAttacks", rollAttacks), e.set("clearTargets", clearTargets), e.set("printAttackCard", printAttackCard);
}
var BasicAttackFlow = class extends ft {
	static {
		this.steps = [
			"initAttackData",
			"setAttackTags",
			"setAttackEffects",
			"setAttackTargets",
			"showAttackHUD",
			"rollAttacks",
			"applySelfHeat",
			"printAttackCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "attack",
			title: t?.title || "",
			roll_str: t?.roll_str || "",
			grit: t?.grit || 0,
			flat_bonus: t?.flat_bonus || 0,
			attack_type: t?.attack_type || ue.Melee,
			action: t?.action || null,
			is_smart: t?.is_smart || !1,
			attack_rolls: t?.attack_rolls || {
				roll: "",
				targeted: []
			},
			attack_results: t?.attack_results || [],
			hit_results: t?.hit_results || [],
			reroll_data: t?.reroll_data || "",
			tags: t?.tags || []
		};
		super(e, m), this.name = "BasicAttackFlow";
	}
}, WeaponAttackFlow = class extends ft {
	static {
		this.steps = [
			"initAttackData",
			"checkItemDestroyed",
			"checkWeaponLoaded",
			"checkItemLimited",
			"checkItemCharged",
			"setAttackTags",
			"setAttackEffects",
			"setAttackTargets",
			"showAttackHUD",
			"rollAttacks",
			"applySelfHeat",
			"updateItemAfterAction",
			"printAttackCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "weapon",
			title: t?.title || "",
			roll_str: t?.roll_str || "",
			grit: t?.grit || 0,
			flat_bonus: t?.flat_bonus || 0,
			attack_type: t?.attack_type || ue.Melee,
			action: t?.action || null,
			is_smart: t?.is_smart || !1,
			attack_rolls: t?.attack_rolls || {
				roll: "",
				targeted: []
			},
			attack_results: t?.attack_results || [],
			hit_results: t?.hit_results || [],
			reroll_data: t?.reroll_data || "",
			tags: t?.tags || []
		};
		if (super(e, m), !this.state.item) throw TypeError("WeaponAttackFlow requires an Item, but none was provided");
	}
	async begin(e) {
		return !this.state.item || !this.state.item.is_weapon() ? (console.log(`${pt} WeaponAttackFlow aborted - no weapon provided!`), !1) : await super.begin(e);
	}
};
async function initAttackData(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	if (e.item) {
		if (e.data.title = t?.title || e.data.title || e.item.name, e.item.is_mech_weapon()) {
			if (!e.actor.is_mech()) return ui.notifications?.warn("Non-mech cannot fire a mech weapon!"), !1;
			if (!e.actor.system.pilot?.value) return ui.notifications?.warn("Cannot fire a weapon on a non-piloted mech!"), !1;
			let m = e.item.system.active_profile;
			return e.data.attack_type = m.type === ae.Melee ? ue.Melee : ue.Ranged, e.data.attack_type === ue.Ranged && (e.data.flat_bonus = e.actor.system.bonuses.flat.ranged_attack || 0), e.data.grit = e.actor.system.grit, e.actor.system.loadout.frame?.value?.system.lid == "mf_deaths_head" && e.item.system.active_profile.range.some((e) => e.type !== ce.Threat) && (e.data.flat_bonus += 1), e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, m.all_tags, e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus), !0;
		} else if (e.item.is_mech_system()) return e.actor.is_mech() ? e.actor.system.pilot?.value ? (e.data.grit = e.actor.system.tech_attack, e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, e.item.system.tags, e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus), !0) : (ui.notifications?.warn("Cannot use a system on a non-piloted mech!"), !1) : (ui.notifications?.warn("Non-mech cannot use a mech system!"), !1);
		else if (e.item.is_npc_feature()) {
			if (!e.actor.is_npc()) return ui.notifications?.warn("Non-NPC cannot fire an NPC weapon!"), !1;
			let m = (e.item.system.tier_override || e.actor.system.tier) - 1, v = e.item.system;
			return e.data.attack_type = v.weapon_type === ae.Melee ? ue.Melee : ue.Ranged, e.data.grit = v.attack_bonus[m] ?? 0, e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, v.tags, e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus, v.accuracy[m] ?? 0), !0;
		} else if (e.item.is_pilot_weapon()) return e.actor.is_pilot() ? (e.data.attack_type = e.item.system.range.some((e) => ![ce.Threat, ce.Thrown].includes(e.type)) ? ue.Ranged : ue.Melee, e.item.system, e.data.grit = e.actor.system.grit, e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, e.item.system.tags, e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus), !0) : (ui.notifications?.warn("Non-pilot cannot fire a pilot weapon!"), !1);
		return ui.notifications.error(`Error in attack flow - ${e.item.name} is an invalid type!`), !1;
	} else {
		let m = ot.isTechRoll(e.data), v = m ? "TECH ATTACK" : "BASIC ATTACK";
		return e.data.title = t?.title ?? v, e.data.attack_type = m ? ue.Tech : ue.Melee, e.data.flat_bonus = 0, e.actor.is_pilot() || e.actor.is_mech() || e.actor.is_deployable() ? m ? e.data.grit = e.actor.system.tech_attack : e.data.grit = e.actor.system.grit : e.actor.is_npc() && (e.data.grit = m ? e.actor.system.sys : e.actor.system.tier), e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.actor, [], e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus), !0;
	}
}
async function checkWeaponLoaded(e) {
	let { limited_loading: t, attacks: m } = game.settings.get(game.system.id, ve.setting_automation);
	return !t && m ? !0 : !e.item || !e.item.is_mech_weapon() && !e.item.is_pilot_weapon() && !e.item.is_npc_feature() ? !1 : e.item.isLoading() && !e.item.system.loaded ? (ui.notifications.warn(`Weapon ${e.item.name} is not loaded!`), !1) : !0;
}
async function setAttackTags(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	if (!e.item) return !0;
	let m = !1;
	if (e.item.is_mech_weapon()) {
		let t = e.item.system.active_profile;
		e.data.tags = t.all_tags, m = !0;
	} else e.data.tags = e.item.getTags() ?? [], m = !0;
	if (m && e.data.tags) {
		let t = e.data.tags.filter((e) => e.is_selfheat);
		t && t.length && (e.data.self_heat = t[0].val);
		let m = e.data.tags.filter((e) => e.is_smart);
		m && m.length && (e.data.is_smart = !0);
	}
	return m;
}
async function setAttackEffects(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	if (!e.item) return !0;
	if (e.item.is_mech_weapon()) {
		let t = e.item.system.active_profile;
		return e.data.effect = t.effect, e.data.on_attack = t.on_attack, e.data.on_hit = t.on_hit, e.data.on_crit = t.on_crit, !0;
	} else if (e.item.is_mech_system()) return e.data.effect = e.data.action?.detail ?? e.item.system.effect, !0;
	else if (e.item.is_talent()) return e.data.effect = e.data.action?.detail ?? "", !0;
	else if (e.item.is_frame()) return e.data.effect = e.data.action?.detail ?? e.item.system.core_system.active_effect, !0;
	else if (e.item.is_npc_feature()) {
		let t = e.item.system;
		return e.data.effect = t.effect, e.data.on_hit = t.on_hit, !0;
	} else if (e.item.is_pilot_weapon()) return e.data.effect = e.item.system.effect, !0;
	return ui.notifications.error(`Error in attack flow - ${e.item.name} is an invalid type!`), !1;
}
async function setAttackTargets(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	return !0;
}
async function showAttackHUD(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	try {
		e.data.acc_diff = await E("attack", e.data.acc_diff), e.data.grit = e.data.acc_diff.base.grit, e.data.flat_bonus = e.data.acc_diff.base.flatBonus, e.data.is_smart = e.data.acc_diff.weapon.smart;
	} catch {
		return !1;
	}
	return !0;
}
async function rollAttacks(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	if (!e.data.acc_diff) throw TypeError("Accuracy/difficulty data missing!");
	if (e.data.attack_rolls = attackRolls(e.data.grit + e.data.flat_bonus, e.data.acc_diff), game.settings.get(game.system.id, ve.setting_automation).attacks && e.data.attack_rolls.targeted.length > 0) {
		let t = await Promise.all(e.data.attack_rolls.targeted.map(async (t) => {
			let m = fromUuidSync(t.targetUuid, { strict: !0 })?.object, v = m?.actor;
			if (!v || !m) throw Error("Target could be not obtained from uuid " + t.targetUuid);
			let y = await new Roll(t.roll).evaluate();
			y.dice.forEach((e) => e.options.rollOrder = 1);
			let x = await y.getTooltip();
			return t.usedLockOn && game.user.isGM && v?.effectHelper.removeActiveEffect("lockon"), {
				attack: {
					roll: y,
					tt: x
				},
				hit: {
					target: m,
					total: String(y.total).padStart(2, "0"),
					usedLockOn: !!t.usedLockOn,
					hit: await checkForHit(e.data?.is_smart ?? !1, y, v),
					crit: e.data?.attack_type !== ue.Tech && (y.total || 0) >= 20
				}
			};
		}));
		return e.data.attack_results = t.map((e) => e.attack), e.data.hit_results = t.map((e) => e.hit), !0;
	} else {
		let t = await new Roll(e.data.attack_rolls.roll).evaluate(), m = await t.getTooltip();
		return e.data.attack_results = [{
			roll: t,
			tt: m
		}], e.data.hit_results = [], !0;
	}
}
async function clearTargets(e) {
	if (!e.data) throw TypeError("Flow state missing!");
	for (let e of game.user?.targets || []) e.setTarget(!1, { releaseOthers: !1 });
	return !0;
}
async function printAttackCard(e, t) {
	if (!e.data) throw TypeError("Attack flow state missing!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/attack-card.hbs`, v = { attackData: {
		origin: e.actor.id,
		attackerUuid: e.actor.uuid,
		attackerItemUuid: e.item?.uuid,
		targets: e.data.hit_results.map((e) => ({
			id: e.target.document.id,
			uuid: e.target.document.uuid,
			setConditions: e.usedLockOn ? { lockon: !e.usedLockOn } : void 0,
			total: e.total,
			hit: e.hit,
			crit: e.crit
		}))
	} };
	e.data.defense = e.data.is_smart ? "E-DEF" : "EVASION";
	let y = [];
	for (let [t, m] of e.data.hit_results.entries()) y.push({
		...m,
		...e.data.attack_results[t]
	});
	let x = {
		...e.data,
		hit_results: y,
		item_uuid: e.item?.uuid,
		profile: e.item?.currentProfile()
	};
	return await renderTemplateStep(e.actor, m, x, v), !0;
}
//#endregion
//#region src/module/flows/tech.ts
Hooks.on("createChatMessage", async (e, t, m) => {
	if (!game.users?.activeGM?.isSelf) return;
	let v = e.getFlag(game.system.id, "attackData");
	!v || !v.targets || v.targets.forEach((e) => {
		let t = game.canvas.scene?.tokens.find((t) => t.uuid === e.uuid)?.actor;
		if (!t) return;
		let m = [];
		for (let [t, v] of Object.entries(e.setConditions || {})) v ? console.log(`(Not) Applying ${t} to Token ${e.uuid}`) : (console.log(`Removing ${t} from Token ${e.uuid}`), m.push(t));
		t?.effectHelper.removeActiveEffects(m);
	});
}), ve.log_prefix;
function registerTechAttackSteps(e) {
	e.set("initTechAttackData", initTechAttackData), e.set("printTechAttackCard", printTechAttackCard);
}
var TechAttackFlow = class extends ft {
	static {
		this.steps = [
			"initTechAttackData",
			"checkItemDestroyed",
			"checkItemLimited",
			"checkItemCharged",
			"setAttackTags",
			"setAttackEffects",
			"setAttackTargets",
			"showAttackHUD",
			"rollAttacks",
			"applySelfHeat",
			"updateItemAfterAction",
			"printTechAttackCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "tech",
			title: t?.title || "",
			roll_str: t?.roll_str || "",
			grit: t?.grit || 0,
			flat_bonus: t?.flat_bonus || 0,
			attack_type: t?.attack_type || ue.Tech,
			action: t?.action || null,
			is_smart: !0,
			invade: t?.invade || !1,
			effect: t?.effect || "",
			attack_rolls: t?.attack_rolls || {
				roll: "",
				targeted: []
			},
			attack_results: t?.attack_results || [],
			hit_results: t?.hit_results || [],
			reroll_data: t?.reroll_data || "",
			tags: t?.tags || []
		};
		super(e, m);
	}
};
function commonMechTechAttackInit(e, t) {
	if (!e.data) throw TypeError("Tech attack flow state missing!");
	if (!e.item) throw TypeError("Tech attack flow state missing item!");
	t?.action_path && (e.data.action = resolveDotpath(e.item, t.action_path)), e.data.grit = e.actor.system.tech_attack, e.data.action && (e.data.title = e.data.action.name == se.Invade ? `INVADE // ${e.data.action.name}` : e.data.action.name, e.data.effect = e.data.action.detail), e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, e.item.getTags() ?? [], e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus, e.actor.is_mech() && e.actor.system.loadout.frame?.value?.system.lid == "mf_goblin" ? 1 : 0);
}
async function initTechAttackData(e, t) {
	if (!e.data) throw TypeError("Tech attack flow state missing!");
	if (e.item) {
		if (e.data.title = t?.title || e.data.title || e.item.name, e.data.attack_type = ue.Tech, e.item.is_npc_feature()) {
			if (!e.actor.is_npc()) return ui.notifications?.warn("Non-NPC cannot use an NPC system!"), !1;
			let m = e.item.system.tier_override || e.actor.system.tier - 1, v = e.item.system, y = v.accuracy ? v.accuracy[m] ?? 0 : 0;
			return e.data.grit = v.attack_bonus ? v.attack_bonus[m] ?? 0 : 0, e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.item, v.tags, e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus, y), !0;
		} else if (e.item.is_mech_system() || e.item.is_frame()) return e.actor.is_mech() ? e.actor.system.pilot?.value ? (commonMechTechAttackInit(e, t), e.data.tags = e.item.getTags() ?? void 0, !e.data.action && !e.data.effect && (e.item.is_mech_system() ? e.data.effect = e.item.system.effect : e.data.effect = e.item.system.core_system.active_effect), !0) : (ui.notifications?.warn("Cannot use a system on a non-piloted mech!"), !1) : (ui.notifications?.warn("Non-mech cannot use a mech system!"), !1);
		else if (e.item.is_talent()) return e.actor.is_pilot() ? e.actor.system.active_mech?.value ? (e.actor = e.actor.system.active_mech.value, commonMechTechAttackInit(e, t), !0) : (ui.notifications?.warn("Cannot use a talent without an active mech!"), !1) : (ui.notifications?.warn("Non-pilot cannot use a pilot talent!"), !1);
		return ui.notifications.error(`Error in tech attack flow - ${e.item.name} is an invalid type!`), !1;
	} else return !e.actor.is_mech() && !e.actor.is_npc() ? (ui.notifications.error("Error rolling tech attack macro (not a valid tech attacker)."), !1) : (e.data.title = t?.title ?? "TECH ATTACK", e.data.attack_type = ue.Tech, e.data.flat_bonus = e.actor.system.bonuses.flat.tech_attack || 0, e.actor.is_pilot() || e.actor.is_mech() ? e.data.grit = e.actor.system.tech_attack : e.actor.is_npc() && (e.data.grit = e.actor.system.sys), e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.actor, [], e.data.title, Array.from(game.user.targets), e.data.grit, e.data.flat_bonus), !0);
}
async function printTechAttackCard(e, t) {
	if (!e.data) throw TypeError("Tech attack flow state missing!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/tech-attack-card.hbs`, v = { attackData: {
		origin: e.actor.id,
		attackerUuid: e.actor.uuid,
		attackerItemUuid: e.item?.uuid,
		invade: e.data.invade,
		targets: e.data.hit_results.map((e) => ({
			id: e.target.document.id,
			uuid: e.target.document.uuid,
			setConditions: e.usedLockOn ? { lockon: !e.usedLockOn } : void 0,
			total: e.total,
			hit: e.hit,
			crit: e.crit
		}))
	} };
	e.data.defense = e.data.is_smart ? "E-DEF" : "EVASION";
	let y = [];
	for (let [t, m] of e.data.hit_results.entries()) y.push({
		...m,
		...e.data.attack_results[t]
	});
	let x = {
		...e.data,
		hit_results: y,
		item_uuid: e.item?.uuid,
		profile: e.item?.currentProfile()
	};
	return await renderTemplateStep(e.actor, m, x, v), !0;
}
//#endregion
//#region src/module/models/bits/power.ts
var mt = foundry.data.fields, definePowerFieldSchema = () => ({
	name: new mt.StringField({ nullable: !1 }),
	description: new mt.StringField({ nullable: !1 }),
	unlocked: new mt.BooleanField(),
	frequency: new mt.StringField({
		required: !1,
		nullable: !0
	}),
	uses: new mt.SchemaField({
		min: new mt.NumberField({
			integer: !0,
			initial: 0
		}),
		max: new mt.NumberField({
			integer: !0,
			initial: 0
		}),
		value: new mt.NumberField({
			integer: !0,
			initial: 0
		})
	}, {
		required: !1,
		nullable: !0
	}),
	veteran: new mt.BooleanField(),
	master: new mt.BooleanField(),
	prerequisite: new mt.StringField({
		required: !1,
		nullable: !0
	})
}), PowerField = class extends mt.SchemaField {
	constructor(e) {
		super(definePowerFieldSchema(), e);
	}
};
function parsePowerUses(e) {
	if (!e) return null;
	let t = e.split("/");
	if (t.length !== 2) return null;
	try {
		return {
			min: 0,
			max: parseInt(t[0]),
			value: parseInt(t[0])
		};
	} catch {
		return null;
	}
}
function fixupPowerUses(e) {
	let t = { ...e };
	if (!e.frequency) return t.uses = null, t;
	let m = e.frequency.split("/");
	if (m.length !== 2) return t.uses = null, t;
	if (e.uses || (t.uses = parsePowerUses(e.frequency)), !t.uses) return t;
	try {
		let e = parseInt(m[0]);
		t.uses = {
			min: t.uses.min ?? 0,
			max: e,
			value: t.uses.value ?? e
		};
	} catch {}
	return t;
}
function unpackPower(e) {
	return {
		name: e.name,
		description: e.description,
		unlocked: !1,
		frequency: e.frequency || null,
		uses: parsePowerUses(e.frequency),
		veteran: e.veteran || !1,
		master: e.master || !1,
		prerequisite: e.prerequisite || null
	};
}
//#endregion
//#region src/module/flows/bond.ts
var ht = ve.log_prefix;
function registerBondPowerSteps(e) {
	e.set("initPowerData", initPowerData), e.set("updatePowerUses", updatePowerUses), e.set("printPowerCard", printPowerCard);
}
var BondPowerFlow = class extends ft {
	static {
		this.steps = [
			"initPowerData",
			"updatePowerUses",
			"printPowerCard"
		];
	}
	constructor(e, t) {
		if (t?.powerIndex === void 0 || t?.powerIndex === null || typeof t?.powerIndex != "number" || t?.powerIndex < 0) throw Error("Bond Power Flow requires a valid power index to be provided in data!");
		let m = {
			title: t?.title ?? "",
			powerIndex: t?.powerIndex,
			description: t?.description ?? ""
		};
		super(e, m);
	}
	async begin(e) {
		return !this.state.item || !this.state.item.is_bond() ? (console.log(`${ht} BondPowerFlow aborted - no bond item provided!`), !1) : (!this.state.data || this.state.data.powerIndex < 0 || this.state.data.powerIndex >= this.state.item.system.powers.length) && (!e || e.powerIndex < 0 || e.powerIndex >= this.state.item.system.powers.length) ? (console.log(`${ht} BondPowerFlow aborted - invalid power index provided!`), !1) : await super.begin(e);
	}
};
async function initPowerData(e, t) {
	if (!e.data) throw TypeError("Bond Power flow state missing!");
	if (!e.item || !e.item.is_bond()) throw TypeError("Bond Power flow item is not a bond!");
	e.data.powerIndex = t?.powerIndex ?? e.data.powerIndex;
	let m = e.item.system.powers[e.data.powerIndex];
	return e.data.title = t?.name || m.name || e.data.title, e.data.description = t?.description || m.description || e.data.description, !0;
}
async function updatePowerUses(e, t) {
	if (!e.data) throw TypeError("Bond Power flow state missing!");
	if (!e.item || !e.item.is_bond()) throw TypeError("Bond Power flow item is not a bond!");
	if (e.item && game.settings.get(game.system.id, ve.setting_automation).limited_loading) {
		let t = e.item.system.powers[e.data.powerIndex];
		if (t.uses) {
			let m = { [`system.powers.${e.data.powerIndex}.uses.value`]: t.uses.value - 1 };
			await e.item.update(m);
		}
	}
	return !0;
}
async function printPowerCard(e, t) {
	if (!e.data) throw TypeError("Bond Power flow state missing!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/generic-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data), !0;
}
//#endregion
//#region src/module/helpers/dragdrop.ts
function handleDocDropping(e, t, m, v) {
	e.each((e, y) => {
		let x = $(y);
		x.on("dragover", (e) => {
			if (!_t) return !0;
			if (!m || m(_t, x, e)) return e.preventDefault(), !1;
		}), x.on("dragenter", (e) => _t && (!m || m(_t, x, e)) ? (e.preventDefault(), v && v("enter", _t, x, e), !1) : !0), v && x.on("dragleave", (e) => {
			_t && (!m || m(_t, x, e)) && v("leave", _t, x, e);
		}), x.on("drop", (e) => {
			if (e.originalEvent?.dataTransfer?.getData("text/plain")) if (_t) {
				let v = _t;
				(!m || m(v, x, e)) && (e.stopImmediatePropagation(), e.preventDefault(), t(v, x, e));
			} else e.stopImmediatePropagation(), e.preventDefault(), resolveNativeDrop(e.originalEvent.dataTransfer.getData("text/plain")).then((v) => {
				v && (!m || m(v, x, e)) && t(v, x, e);
			});
		});
	});
}
function handleDragging(e, t, m) {
	typeof e == "string" && (e = $(e)), e.prop("draggable", !0), e.each((e, v) => {
		let y = $(v);
		y.on("dragstart", (e) => {
			e.originalEvent.dataTransfer.clearData(), e.originalEvent.dataTransfer.setData("text/plain", t(y, e)), e.stopPropagation(), e.stopImmediatePropagation(), m && m("start", y, e);
		}), y.on("dragend", (e) => {
			m && m("stop", y, e);
		});
	});
}
var gt = /* @__PURE__ */ function(e) {
	return e.BASIC = "lancer-flow-button", e.STAT = "roll-stat", e.ATTACK = "roll-attack", e.DAMAGE = "roll-damage", e.TECH_ATTACK = "roll-tech", e.CHAT = "chat-flow-button", e.SKILL = "skill-flow", e.BOND_POWER = "bond-power-flow", e.EFFECT = "effect-flow", e.ACTIVATION = "activation-flow", e.CORE_ACTIVE = "core_system.activation-flow", e;
}({});
async function resolveNativeDrop(e) {
	if (typeof e == "string" && (e = safe_json_parse(e)), !e) {
		let t = await fromUuid(e);
		if (!t) return null;
		if (t instanceof Un) return {
			type: "Actor",
			document: t
		};
		if (t instanceof Dt) return {
			type: "Item",
			document: t
		};
		if (t instanceof Macro.implementation) return {
			type: "Macro",
			document: t
		};
		if (t instanceof JournalEntry.implementation) return {
			type: "JournalEntry",
			document: t
		};
	} else if (e.type == "Actor") {
		let t = await Un.fromUuid(e.uuid);
		return t ? {
			type: "Actor",
			document: t
		} : null;
	} else if (e.type == "Item") {
		let t = await Dt.fromUuid(e.uuid);
		return t ? {
			type: "Item",
			document: t
		} : null;
	} else if (e.type == "JournalEntry") {
		let t = await JournalEntry.fromDropData(e);
		return t ? {
			type: "JournalEntry",
			document: t
		} : null;
	} else if (e.type == "Macro") {
		let t = await Macro.fromDropData(e);
		return t ? {
			type: "Macro",
			document: t
		} : null;
	}
	return null;
}
var _t = null;
function dragging_class(e) {
	return `dragging-${e}`;
}
function setGlobalDrag(e) {
	if ((_t?.type == "Actor" || _t?.type == "Item") && $("body").removeClass(dragging_class(_t.document.type)), e instanceof Un) _t = {
		document: e,
		type: "Actor"
	};
	else if (e instanceof Dt) _t = {
		document: e,
		type: "Item"
	};
	else if (e instanceof Macro.implementation) _t = {
		document: e,
		type: "Macro"
	};
	else if (e instanceof Scene.implementation) _t = {
		document: e,
		type: "Scene"
	};
	else if (e == null) {
		_t = null;
		return;
	}
	(_t?.type == "Actor" || _t?.type == "Item") && $("body").addClass(dragging_class(_t.document.type));
}
function applyGlobalDragListeners() {
	let e = document.getElementsByTagName("body")[0], t = { canceled: !1 };
	e.addEventListener("dragstart", (e) => {
		let m = e.target, v = "";
		if (m?.dataset?.uuid) v = m.dataset.uuid;
		else if (m?.dataset?.documentId) {
			let e = $(m).parents(".sidebar-tab")[0];
			if (e?.dataset?.tab) {
				let t = e.dataset.tab;
				v = `${t.charAt(0).capitalize()}${t.slice(1, t.length - 1)}.${m.dataset.documentId}`;
			} else {
				let e = $(m).parents(".compendium.directory")[0];
				e && (v = `Compendium.${e.dataset.pack}.${m.dataset.documentId}`);
			}
		} else return;
		let y = t;
		fromUuid(v).then(async (e) => {
			await new Promise((e) => setTimeout(e, 50)), y.canceled || setGlobalDrag(e);
		});
	}, {
		capture: !0,
		passive: !0
	});
	let endListener = () => {
		setGlobalDrag(null), t.canceled = !0, t = { canceled: !1 };
	};
	e.addEventListener("dragend", endListener, {
		capture: !0,
		passive: !0
	}), e.addEventListener("drop", endListener, {
		capture: !0,
		passive: !0
	});
}
//#endregion
//#region src/module/apps/targeted-form-editor.ts
var TargetedEditForm = class extends FormApplication {
	constructor(e, t, m = {}, v) {
		super({ hasPerm: () => !0 }, m), this.target = e, this.value_path = t, this.value = resolveDotpath(e, t), this.resolve = v;
	}
	activateListeners(e) {
		super.activateListeners(e);
	}
	static handle(e, t, m) {
		e.find(t).on("click", async (e) => {
			e.stopPropagation();
			let t = e.currentTarget.dataset.path;
			if (t) {
				let e = drilldownDocument(m, t);
				return this.edit(e.sub_doc, e.sub_path);
			}
		});
	}
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			width: 400,
			height: "auto",
			classes: ["lancer", "targeted-form-editor"],
			submitOnChange: !1,
			submitOnClose: !0,
			closeOnSubmit: !0
		};
	}
	getData() {
		return {
			...super.getData(),
			value: this.value,
			path: this.value_path
		};
	}
	fixupForm(e) {
		return e;
	}
	async _updateObject(e, t) {
		if (e.submitter?.dataset.button == "cancel") return;
		t = this.fixupForm(t);
		let m = {};
		for (let [e, v] of Object.entries(t)) m[`${this.value_path}.${e}`] = v;
		return this.target.update(m).then(this.resolve);
	}
	static async edit(e, t) {
		return new Promise((m, v) => {
			new this(e, t, {}, m).render(!0);
		});
	}
}, TagEditForm = class extends TargetedEditForm {
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			template: `systems/${game.system.id}/templates/window/tag.hbs`,
			classes: ["lancer", "tag-editor"],
			title: "Tag Editing",
			submitOnClose: !1
		};
	}
	getData() {
		let e = game.settings.get(game.system.id, ve.setting_tag_config), t = {};
		return Object.entries(e).forEach((e) => t[e[1].name] = e[0]), {
			...super.getData(),
			lid: super.getData().value.lid,
			lid_options: t
		};
	}
};
//#endregion
//#region src/module/helpers/tags.ts
function handleTagEditButtons(e, t) {
	e.find(".tag-edit-button").on("click", (e) => {
		e.stopPropagation();
		let m = e.currentTarget?.dataset.path;
		if (!m) {
			ui.notifications.error("Tag edit button missing data-path attribute");
			return;
		}
		TagEditForm.edit(t, m);
	});
}
function compactTag(e, t, m = !0) {
	return tagView(e, t, !0, m);
}
function largeTag(e, t, m = !0) {
	return tagView(e, t, !1, m);
}
function tagView(e, t, m = !0, v = !0) {
	let y = t.name.replace("{VAL}", `${t.val ?? "?"}`), x = t.description.replace("{VAL}", `${t.val ?? "?"}`) ?? "";
	return `<div
    class="${v ? "editable-tag-instance" : ""} ${m ? "compact-tag flexrow" : "large-tag"}"
    ${v ? `data-path="${e}"` : ""}
    ${m ? `data-tooltip="${x}"` : ""}
  >
    ${m ? `
    <i class="mdi mdi-label i--2 i--light"></i>
    <span style="margin: 3px;" >${y}</span>` : `
    <div class="tag-header flexrow">
      <i class="mdi mdi-label i--2 i--light"></i>
      <span style="margin: 3px;" >${y}</span>
      ${v ? `
      <div class="tag-controls">
        <a class="tag-edit-button fas fa-edit" data-path="${e}"></a>
        <a class="gen-control fas fa-trash" data-action="splice" data-path="${e}"></a>
      </div>` : ""}
    </div>
    <div class="tag-description">${x}</div>`}
  </div>`;
}
function compactTagListHBS(e, t) {
	return compactTagList(t.hash.tags ?? resolveHelperDotpath(t, e) ?? [], e, { editable: resolveHelperDotpath(t, "editable", !1, !0) });
}
function largeTagListHBS(e, t) {
	return largeTagList(t.hash.tags ?? resolveHelperDotpath(t, e) ?? [], e, { editable: resolveHelperDotpath(t, "editable", !1, !0) });
}
function compactTagList(e, t, m) {
	return tagList(e, t, {
		compact: !0,
		...m
	});
}
function largeTagList(e, t, m) {
	return tagList(e, t, {
		compact: !1,
		...m
	});
}
function tagList(e, t, m) {
	let v = m?.compact ?? !0, y = [];
	for (let x = 0; x < e.length; x++) {
		let S = e[x];
		if (!S.hidden) {
			let e = `${t}.${x}`;
			y.push(v ? compactTag(e, S, m?.editable) : largeTag(e, S, m?.editable));
		}
	}
	return m?.editable ? `<div class="${v ? "compact" : "large"}-tag-row tag-list-append" data-path="${t}">
      ${y.join("")}
    </div>` : y.length ? `<div class="${v ? "compact" : "large"}-tag-row">
      ${y.join("")}
    </div>` : "";
}
function itemEditTags(e, t, m) {
	return `
  <div class="card full">
    <div class="lancer-header lancer-primary major">
      <span>${t}</span>
      ${inc_if(`<a class="gen-control fas fa-plus" data-action="append" data-path="${e}" data-action-value="(struct)tag"></a>`, resolveHelperDotpath(m, "editable", !1, !0))}
    </div>
    ${largeTagListHBS(e, m)}
  </div>`;
}
//#endregion
//#region src/module/helpers/collapse.ts
var CollapseHandler = class {
	constructor() {
		this.state = /* @__PURE__ */ new Map();
	}
	toggle(e) {
		let t = this.state.get(e) ?? !1;
		return this.state.set(e, !t), !t;
	}
	get(e) {
		return this.state.get(e) ?? !1;
	}
};
function collapseID(e, t, m) {
	let v;
	v = t instanceof foundry.abstract.Document ? t.id ?? "ephem" : typeof t == "string" ? t : "uncat", e[v] ?? (e[v] = 0);
	let y;
	return y = m ? e[v] : ++e[v], `${v}_${y}`;
}
function collapseButton(e, t, m = !1) {
	return e ? `<i class="mdi mdi-unfold-less-horizontal collapse-trigger collapse-icon" data-collapse-id="${collapseID(e, t, m)}"> </i>` : "";
}
function collapseParam(e, t, m = !1) {
	return e ? `data-collapse-id="${collapseID(e, t, m)}"` : "";
}
function applyCollapseListeners(e) {
	e.find(".collapse-trigger").on("click", handleCollapse);
}
var handleCollapse = (e) => {
	e.stopPropagation();
	let t = "lancer-collapse", m = e.currentTarget.getAttribute("data-collapse-id"), v = document.querySelector(`.collapse[data-collapse-id="${m}"]`);
	v?.classList.contains("collapsed") ? (v.classList.remove("collapsed"), sessionStorage.setItem(`${t}-${m}`, "opened")) : (v?.classList.add("collapsed"), sessionStorage.setItem(`${t}-${m}`, "closed"));
};
function initializeCollapses(e) {
	e.find(".collapse").each((e, t) => {
		let m = t.getAttribute("data-collapse-id");
		if (m) {
			let e = sessionStorage.getItem("lancer-collapse-" + m);
			e == "opened" ? t.classList.remove("collapsed") : e == "closed" && t.classList.add("collapsed");
		}
	});
}
//#endregion
//#region src/module/helpers/loadout.ts
function mechSystemViewHBS(e, t, m) {
	resolveHelperDotpath(t, "collapse");
	let v = resolveHelperDotpath(t, e);
	return v ? mechSystemView(v, e, m) : "";
}
function mechSystemView(e, t, m) {
	t ??= `system.systems.${e.uuid}`;
	let v, y, x, S, C, w;
	v = [
		oe.Deployable,
		oe.Drone,
		oe.Mod,
		oe.System,
		oe.Tech
	].includes(e.system.type) ? e.system.type === oe.Tech ? `cci cci-${slugify(e.system.type, "-")}-quick i--4` : `cci cci-${slugify(e.system.type, "-")} i--4` : "cci cci-system i--4", y = spDisplay(e.system.sp ?? 0), x = `<a class="lancer-context-menu" data-path="${t}"">
    <i class="fas fa-ellipsis-v"></i>
  </a>`, e.system.effect && (w = effectBox("EFFECT", e.system.effect, { flow: !m?.nonInteractive || !1 })), e.system.actions.length && (S = buildActionArrayHTML(e, "system.actions", m)), e.system.deployables.length && e.actor && (C = buildDeployablesArray(e, lookupOwnedDeployables(e.actor, e.system.deployables), m));
	let E = "";
	return e.isLimited() && (E = `<div class="uses-wrapper">${limitedUsesIndicator(e, t + ".value", m)}</div>`), `<${m?.div ? "div" : "li"}
    class="ref set card clipped-top lancer-system lancer-border-system ${e.system.type === oe.Tech ? "tech-item" : ""}"
    data-item-id="${e.id}"
    ${ref_params(e)}
    style="margin: 0.3em;"
  >
    <div class="lancer-header lancer-system ${e.system.destroyed ? "destroyed" : ""}" style="grid-area: 1/1/2/3; display: flex">
      <i class="${e.system.destroyed ? "mdi mdi-cog" : v}"> </i>
      ${m?.nonInteractive ? "" : "<a class=\"chat-flow-button\"><i class=\"mdi mdi-message\"></i></a>"}
      <span class="minor grow">${e.name}</span>
      ${m?.nonInteractive ? "" : collapseButton(null, e)}
      <div class="ref-controls">
        ${m?.nonInteractive ? "" : x}
      </div>
    </div>
    <div class="collapse" ${collapseParam(null, e, !0)} style="padding: 0.5em">
      ${E}
      ${w || ""}
      ${S || ""}
      ${C || ""}
      <div class="${m?.vertical ? "flexcol" : "flexrow"}">
        ${y}
        ${compactTagList(e.system.tags, t + ".system.tags", { editable: !(m?.nonInteractive ?? !1) })}
      </div>
    </div>
  </${m?.div ? "div" : "li"}>`;
}
function weaponMount(e, t) {
	let m = resolveHelperDotpath(t, "actor"), v = resolveHelperDotpath(t, e);
	if (v.bracing) return `
    <div class="mount card" >
      <div class="lancer-header lancer-primary mount-type-ctx-root" data-path="${e}">
        <span>${v.type} Weapon Mount</span>
        <a class="gen-control fas fa-trash" data-action="splice" data-path="${e}"></a>
        <a class="reset-weapon-mount-button fas fa-redo" data-path="${e}"></a>
      </div>
      <div class="lancer-body">
        <span class="major">LOCKED: BRACING</span>
      </div>
    </div>`;
	let y = v.slots.map((m, v) => mechLoadoutWeaponSlot(`${e}.slots.${v}.weapon.value`, `${e}.slots.${v}.mod.value`, m.size, t));
	v.type === "Flex" && v.slots.length === 1 && v.slots[0].weapon?.value?.system.size === q.Aux && y.push(mechLoadoutWeaponSlot(`${e}.slots.1.weapon.value`, `${e}.slots.1.mod.value`, B.Auxiliary, t));
	let x = m.loadoutHelper.validateMount(v) ?? "";
	return !x && v.type === "Flex" && v.slots[0].weapon?.value?.system.size === "Main" && (y = [y[0]]), `
    <div class="mount card" >
      <div class="lancer-header lancer-primary mount-type-ctx-root" data-path="${e}">
        <span>${v.type} Weapon Mount</span>
        <a class="gen-control fas fa-trash" data-action="splice" data-path="${e}"></a>
        <a class="reset-weapon-mount-button fas fa-redo" data-path="${e}"></a>
      </div>
      ${inc_if(`<span class="lancer-header lancer-primary error">${x.toUpperCase()}</span>`, x)}
      <div class="lancer-body">
        ${y.join("")}
      </div>
    </div>`;
}
function allWeaponMountView(e, t) {
	return `
    <div class="lancer-header lancer-dark-gray loadout-category submajor">
      <i class="mdi mdi-unfold-less-horizontal collapse-trigger collapse-icon" data-collapse-id="weapons"></i>
      <span>MOUNTED WEAPONS</span>
      <a class="gen-control fas fa-plus" data-action="append" data-path="${e}.weapon_mounts" data-action-value="(struct)wep_mount"></a>
      <a class="reset-all-weapon-mounts-button fas fa-redo" data-path="${e}.weapon_mounts"></a>
    </div>
    <div class="wraprow double collapse" data-collapse-id="weapons" style="margin-bottom: 0.75em">
      ${resolveHelperDotpath(t, e).weapon_mounts.map((m, v) => weaponMount(`${e}.weapon_mounts.${v}`, t)).join("")}
    </div>
    `;
}
function allMechSystemsView(e, t) {
	let m = resolveHelperDotpath(t, e), v = m.systems.map((m, v) => mechSystemViewHBS(`${e}.systems.${v}.value`, t));
	return `
    <div class="lancer-header lancer-dark-gray loadout-category submajor">
      <i class="mdi mdi-unfold-less-horizontal collapse-trigger collapse-icon" data-collapse-id="systems"></i>
      <span>MOUNTED SYSTEMS</span>
      <span style="flex-grow: 0">
        <i class="cci cci-system-point i--4"></i>
        ${m.sp.value} / ${m.sp.max} SP USED
      </span>
    </div>
    <div class="flexcol collapse" data-collapse-id="systems">
      ${v.join("")}
    </div>
    `;
}
function mechLoadout(e) {
	let t = "system.loadout";
	return `
    <div class="flexcol">
        ${allWeaponMountView(t, e)}
        ${allMechSystemsView(t, e)}
    </div>`;
}
function pilotSlot(e, t) {
	let m;
	if (t.hash.value) m = t.hash.value;
	else if (m = resolveHelperDotpath(t, e), !m) return simple_ref_slot(e, [z.PILOT], t);
	return `<div class="pilot-summary">
    <img class="ref set pilot click-open"
         ${ref_params(m, e)}
         data-accept-types="${z.PILOT}"
         style="height: 100%" src="${m.img || "systems/lancer/assets/icons/pilot.svg"}"/>
    <div class="lancer-header lancer-primary license-level">
      <span>LL${m.system?.level || "[--]"}</span>
    </div>
</div>`;
}
function frameView(e, t, m) {
	let v = resolveHelperDotpath(m, e);
	return v ? `
    <div class="card mech-frame ${ref_params(v)}">
      <span class="lancer-header ${manufacturerStyle(v.system.manufacturer)} submajor clipped-top">
        ${v.system.manufacturer} ${v.name}
      </span>
      <div class="wraprow double">
        <div class="frame-traits flexcol">
          ${frameTraits(e, m)}
        </div>
        ${v.system.core_system ? buildCoreSysHTML(e, t, m) : ""}
      </div>
    </div>
    ` : simple_ref_slot(e, [z.FRAME], m);
}
function buildCoreSysHTML(e, t, m) {
	let v = resolveHelperDotpath(m, e), y = compactTagListHBS(`${e}.core_system.tags`, m), x = v.system.core_system, S = "";
	(x.passive_effect !== "" || x.passive_actions.length > 0 || x.passive_bonuses.length > 0) && (S = `<div class="frame-passive">${framePassive(v)}</div>`);
	let C = "";
	return x.deployables.length && (C = buildDeployablesArrayHBS(v, "system.core_system.deployables", m, { vertical: !0 })), `<div class="core-wrapper ${manufacturerStyle(v.system.manufacturer, !0)} frame-coresys card clipped-top" style="padding: 0;">
    <div class="lancer-header ${manufacturerStyle(v.system.manufacturer)} coresys-title">
      <span>${x.name}</span><span> // </span><span>CORE</span>
      <i
        class="mdi mdi-unfold-less-horizontal collapse-trigger collapse-icon"
        data-collapse-id="${v.id}_core" >
      </i>
    </div>
    <div class="collapse" data-collapse-id="${v.id}_core">
      <div class="frame-active">${frameActive(e, t, m)}</div>
      ${S}
      ${C}
      ${y}
    </div>
  </div>`;
}
function frameTraits(e, t) {
	let m = resolveHelperDotpath(t, e);
	return m.system.traits.map((e, v) => {
		let y = buildActionArrayHTML(m, `system.traits.${v}.actions`), x = buildDeployablesArrayHBS(m, `system.traits.${v}.deployables`, t, { vertical: !0 });
		return `<div class="frame-trait clipped-top">
    <div
      class="lancer-header ${manufacturerStyle(m.system.manufacturer)} submajor frame-trait-header"
    >
      <a class="chat-flow-button" data-uuid="${m.uuid}" data-type="trait" data-index="${v}">
        <i class="mdi mdi-message"></i>
      </a>
      <span class="minor grow">${e.name}</span>
    </div>
    <div class="lancer-body">
      <div class="effect-text">${e.description || "// MISSING ENTRY //"}</div>
      ${y || ""}
      ${x || ""}
    </div>
  </div>`;
	}).join("");
}
function frameActive(e, t, m) {
	let v = resolveHelperDotpath(m, e), y = v.system.core_system, x = y.active_actions.length ? y.active_actions[0].name : y.name, S = buildActionArrayHTML(v, "system.core_system.active_actions", { hideChip: y.active_actions.length <= 1 }), C = buildDeployablesArrayHBS(v, "system.core.deployables", m, { vertical: !0 }), w = t ? manufacturerStyle(v.system.manufacturer) : "lancer-light-gray", E = `activation-${slugify(y.activation, "-")}`, O = t ? activationStyle(y.activation) : "lancer-light-gray";
	return `
  <div class="core-active-wrapper clipped-top lancer-border-bonus">
    <div class="lancer-header ${w} clipped-top submajor">
      <div class="grow">
        <span>${y.active_name}</span><span> // </span><span>ACTIVE</span>
      </div>
    </div>
    <div class="lancer-body">
      <div class="effect-text">
        ${y.active_effect ?? ""}
      </div>
      ${S || ""}
      ${C || ""}
      <div class="core-active-activate">
        <a
          class="activation-chip activation-flow lancer-button ${E} ${O}"
          data-uuid="${v.uuid}" data-path="system.core_system"
        >
          <i class="cci cci-corebonus i--5"></i>
          <b class="active-name">${x.toUpperCase()}</b>
          <i class="${activationIcon(y.activation)} i--5"></i>
        </a>
      </div>
    </div>
  </div>
  `;
}
function framePassive(e) {
	let t = e.system.core_system, m = buildActionArrayHTML(e, "system.core_system.passive_actions");
	return `
  <div class="core-passive-wrapper clipped-top lancer-border-bonus">
    <div class="lancer-header ${manufacturerStyle(e.system.manufacturer)} clipped-top submajor">
      <a class="chat-flow-button" data-uuid="${e.uuid}" data-type="passive">
        <i class="mdi mdi-message"></i>
      </a>
      <div class="grow">
        <span>${t.passive_name ?? ""}</span><span> // </span><span>PASSIVE</span>
      </div>
    </div>
    <div class="lancer-body">
      <div class="effect-text">
        ${t.passive_effect ?? ""}
      </div>
      ${m ?? ""}
    </div>
  </div>
  `;
}
//#endregion
//#region src/module/helpers/pilot.ts
function talent_view(e, t) {
	let m = resolveHelperDotpath(t, "collapse"), v = resolveHelperDotpath(t, e);
	if (!v) return "";
	let y = `<li class="card clipped-top lancer-border-talent talent-compact ref set" ${ref_params(v)}>
        <div class="lancer-header lancer-talent submajor" style="grid-area: 1/1/2/4">
          <i class="cci cci-talent i--4"></i>
          <div class="balancer"></div><div class="balancer"></div>
          <span class="major">${v.name}</span>
          ${collapseButton(m, v)}
          <div class="ref-controls">
            <a class="lancer-context-menu" data-path="${e}"">
              <i class="fas fa-ellipsis-v"></i>
            </a>
          </div>
        </div>
      <ul class="collapse talent-ranks" ${collapseParam(m, v, !0)} style="grid-area: 2/1/3/3">`;
	for (var x = 0; x < v.system.curr_rank; x++) {
		let e = "";
		v.system.ranks[x]?.actions && (e = buildActionArrayHTML(v, `system.ranks.${x}.actions`));
		let t = x < v.system.curr_rank - 1 ? "lancer-border-talent talent-rank-sep-border" : "";
		y += `<li class="talent-rank-compact card clipped ${t}" style="padding: 5px;">
        <i class="cci cci-rank-${x + 1} i--5 i--dark" style="grid-area: rank; padding: 0;"></i>
        <a
          class="chat-flow-button lancer-button lancer-talent"
          data-uuid="${v.uuid}"
          data-rank="${x}"
          style="grid-area: chat; height: fit-content; align-self: center;"
        >
          <i class="mdi mdi-message"></i>
        </a>
        <span class="major" style="grid-area: title">${v.system.ranks[x]?.name}</span>
        <div class="effect-text" style="grid-area: desc">
        ${v.system.ranks[x]?.description}
        ${e}
        </div>
        </li>`;
	}
	return y += "</ul>\n      </li>", y;
}
function skillView(e, t) {
	let m = resolveHelperDotpath(t, e);
	return m ? `
      <li class="card clipped skill-compact ref set" ${ref_params(m)}>
        <div class="lancer-header lancer-trait medium clipped-top" style="grid-area: 1/1/2/3">
          <i class="cci cci-skill i--4 i--dark"> </i>
          <a class="chat-flow-button"><i class="mdi mdi-message"></i></a>
          <span class="major modifier-name">${m.name}</span>
          <div class="ref-controls">
            <a class="lancer-context-menu" data-path="${e}">
              <i class="fas fa-ellipsis-v"></i>
            </a>
          </div>
        </div>
        <a class="flexrow skill-flow lancer-button" style="grid-area: 2/1/3/2;">
          <i class="fas fa-dice-d20 i--3 i--dark"></i>
          <div class="major roll-modifier" style="align-self: center">+${m.system.curr_rank * 2}</div>
        </a>
        <div class="desc-text" style="grid-area: 2/2/3/3">${m.system.description}</div>
      </li>` : "";
}
function coreBonusView(e, t) {
	let m = resolveHelperDotpath(t, e), v = resolveHelperDotpath(t, "collapse");
	return m ? `
      <li class="card clipped-top lancer-border-bonus ref set" ${ref_params(m)}>
        <div class="lancer-header lancer-bonus medium" style="grid-area: 1/1/2/3">
          <i class="cci cci-corebonus i--4 i--dark"> </i>
          <a class="chat-flow-button">
            <i class="mdi mdi-message"></i>
          </a>
          <span class="major modifier-name">${m.name}</span>
          ${collapseButton(v, m)}
          <div class="ref-controls">
            <a class="lancer-context-menu" data-path="${e}">
              <i class="fas fa-ellipsis-v"></i>
            </a>
          </div>
        </div>
        <div class="collapse" ${collapseParam(v, m, !0)} style="padding: 0.5em">
          <div class="desc-text" style="grid-area: 2/2/3/3">${m.system.description}</div>
          ${effectBox("Effect", m.system.effect)}
        </div>
      </li>` : "";
}
//#endregion
//#region src/module/helpers/refs.ts
function ref_params(e, t) {
	return t ? ` data-uuid="${e.uuid}" data-path="${t}" ` : ` data-uuid="${e.uuid}" `;
}
function simple_ref_slot(e = "", t, m) {
	let v, y;
	Array.isArray(t) ? (y = t, v = t.join(" ")) : (y = t.split(" "), v = t);
	let x = m.hash.value ?? resolveHelperDotpath(m, e);
	if (!x || x.status == "missing") {
		let t = (y || ["dummy"]).filter((e) => e).map((e) => `<img class="ref-icon" src="${TypeIcon(e)}"></img>`);
		return `<div class="ref ref-card slot"
                 data-accept-types="${v}"
                 data-path="${e}">
          ${t.join(" ")}
          <span class="major">Empty</span>
      </div>`;
	} else if (x.then !== void 0) return "<span>ASYNC not handled yet</span>";
	else return `<div class="ref ref-card set click-open"
                  data-accept-types="${v}"
                  data-path="${e}"
                  ${ref_params(x)}
                  >
          <img class="ref-icon" src="${x.img}"></img>
          <span class="major">${x.name}</span>
      </div>`;
}
async function click_evt_open_ref(e) {
	e.preventDefault(), e.stopPropagation();
	let t = await resolve_ref_element(e.currentTarget.closest(".ref"));
	t && t.sheet?.render(!0, { focus: !0 });
}
async function resolve_ref_element(e) {
	if (e.dataset.uuid) {
		let t = await fromUuid(e.dataset.uuid);
		if (t && (t instanceof Dt || t instanceof Un || t instanceof LancerActiveEffect)) {
			if (e.dataset.activeEffectIndex) {
				let m = parseInt(e.dataset.activeEffectIndex), v = 0;
				for (let e of t.allApplicableEffects()) {
					if (m == v) return e;
					v++;
				}
				return null;
			}
			return t;
		} else t && console.warn(`Ref element pointed at a ${t.documentName} - unsupported`);
		return null;
	} else return null;
}
function refPortrait(e, t, m, v) {
	return `<div class="portrait-img-container"><img class="portrait-img ref set" src="${e}" data-edit="${t}" ${ref_params(m)} width="100" height="100" /></div>`;
}
function itemPreview(e, t, m) {
	let v = m.hash.item ?? resolveHelperDotpath(m, e);
	return v ? (t && `${t}${e}`, v.is_mech_system() ? mechSystemViewHBS(e, m) : v.is_mech_weapon() ? mechWeaponDisplay(e, null, m) : v.is_weapon_mod() ? weaponModView(e, null, m) : v.is_talent() ? talent_view(e, m) : v.is_skill() ? skillView(e, m) : v.is_core_bonus() ? coreBonusView(e, m) : v.is_license() ? licenseRefView(e, m) : v.is_npc_feature() ? npcFeatureView(e, m) : v.is_frame() ? framePreview(e, m) : `
      <div class="ref set ref-card click-open"
              ${ref_params(v)}>
        <img class="ref-icon" src="${v.img}"></img>
        <span class="major">${v.name}</span>
        <span class="vsep"></span>
        <div class="ref-controls">
          <a class="lancer-context-menu" data-path="${e}">
            <i class="fas fa-ellipsis-v"></i>
          </a>
        </div>
      </div>`) : (console.error(`Unable to resolve ${e} in `, m.data), "<span>err</span>");
}
function limitedUsesIndicator(e, t, m) {
	let v = e.system.uses;
	return `<div class="clipped card limited-card ${m?.nonInteractive ? "non-interactive" : ""}"><span>USES</span> ${hex_array(v.value, v.max, t, "uses-hex").join("")}</div>`;
}
function loadingIndicator(e, t, m) {
	if (!e.is_weapon()) return "";
	let v = e.system.loaded;
	return `<div class="clipped card limited-card ${m?.nonInteractive ? "non-interactive" : ""}"><span>LOADED</span> ${hex_array(+!!v, 1, t, "loaded-hex").join("")}</div>`;
}
function chargedIndicator(e, t, m) {
	let v = e.system.charged;
	return `<div class="clipped card charged-box ${m?.nonInteractive ? "non-interactive" : ""}">
    <span style="margin:4px;">CHARGED</span>
    ${hex_array(+!!v, 1, t, "charged-hex").join("")}
  </div>`;
}
function reserveUsesIndicator(e, t) {
	return `<div class="clipped card limited-card"><span>USES</span> ${hex_array(+!resolveHelperDotpath(t, e), 1, e, "uses-hex").join("")}</div>`;
}
function lidItemList(e, t, m, v) {
	let y = resolveHelperDotpath(v, e, []), x = v.hash.trash ?? null, S = Array.from(y).map((m, y) => itemPreview(`${e}.${y}`, x, extendHelper(v, {
		item: t[y],
		isRef: !0
	})));
	return S.length || S.push("<div class=\"card clipped\" style=\"justify-content: center;\">DROP NPC FEATURES HERE</div>"), `
    <div class="flexcol lid-list"
      data-path="${e}"
      data-accept-types="${m}">
      ${dropIndicator(m, v)}
      ${S.join("")}
    </div>`;
}
function dropIndicator(e, t) {
	return `<div class="line-drop-target ${e.split(",").map((e) => `drop-target-${e}`).join(" ")}">DROP HERE</div>`;
}
function handleRefClickOpen(e) {
	$(e).find(".ref.set.click-open, .ref.set .click-open").on("click", click_evt_open_ref);
}
function handleDocListDropping(e, t) {
	handleDocDropping(e.find(".ref-list"), async (e, m) => {
		if (!(e.type == "Actor" || e.type == "Item")) return;
		let v = m[0].dataset.path, y = m[0].dataset.acceptTypes ?? "";
		if (!(y && !y.includes(e.document.type)) && v) {
			let m = drilldownDocument(t, v), y = m.terminus;
			if (Array.isArray(y)) {
				let t = array_path_edit_changes(m.sub_doc, m.sub_path + ".-1", e.document, "insert");
				m.sub_doc.update({ [t.path]: t.new_val });
			}
		}
	});
}
function handleLIDListDropping(e, t) {
	handleDocDropping(e.find(".lid-list"), async (e, m) => {
		if (!(e.type == "Actor" || e.type == "Item")) return;
		let v = m[0].dataset.path, y = m[0].dataset.acceptTypes ?? "";
		if (!(y && !y.includes(e.document.type)) && v) {
			let m = drilldownDocument(t, v), y = m.terminus;
			if (Array.isArray(y)) {
				let t = e.document.system.lid, v = array_path_edit_changes(m.sub_doc, m.sub_path + ".-1", t, "insert");
				m.sub_doc.update({ [v.path]: v.new_val });
			} else if (y instanceof Set) {
				let t = e.document.system.lid;
				y.add(t), m.sub_doc.update({ [m.sub_path]: Array.from(y) });
			}
		}
	});
}
function handleUsesInteraction(e, t) {
	e.find(".uses-hex").on("click", async (e) => {
		e.stopPropagation();
		let t = e.currentTarget.closest(".set[data-uuid*='Item']").dataset.uuid, m = e.currentTarget.dataset;
		if (!t) return;
		let v = await fromUuid(t), y = m.available === "true";
		if (v.is_reserve()) v.update({ "system.used": y });
		else {
			let e = v.system.uses.value;
			e = y ? Math.max(e - 1, v.system.uses.min) : Math.min(e + 1, v.system.uses.max), v.update({ "system.uses": e });
		}
	});
}
function handleLoadedInteraction(e, t) {
	e.find(".loaded-hex").on("click", async (e) => {
		e.stopPropagation();
		let t = e.currentTarget.closest(".set[data-uuid*='Item']").dataset.uuid;
		if (!t) return;
		let m = await fromUuid(t);
		m.is_weapon() && m.update({ "system.loaded": !m.system.loaded });
	});
}
function handleChargedInteraction(e, t) {
	e.find(".charged-hex").on("click", async (e) => {
		e.stopPropagation();
		let t = e.currentTarget.closest(".set[data-uuid*='Item']").dataset.uuid;
		if (!t) return;
		let m = await fromUuid(t);
		m.update({ "system.charged": !m.system.charged });
	});
}
function handleRefDragging(e) {
	handleDragging(e.find(".ref.set"), (e, t) => {
		let m = t.currentTarget.dataset.uuid;
		if (!m || !(m.includes("Item.") || m.includes("Actor.") || m.includes("Token."))) throw console.error("Unable to properly drag ref", e, t.currentTarget), Error("Drag error");
		let v = {
			type: m.includes("Item.") ? "Item" : "Actor",
			uuid: m
		};
		return JSON.stringify(v);
	});
}
function handleRefSlotDropping(e, t, m) {
	handleDocDropping(e.find(".ref.drop-settable"), async (e, v, y) => {
		m && (e = await m(e));
		let x = v[0].dataset.path, S = v[0].dataset.acceptTypes, C = e.document;
		if (!(S && !S.includes(e.document.type ?? "err")) && x) {
			let e = drilldownDocument(t, x.endsWith(".value") ? x.slice(0, x.length - 6) : x), m = {};
			if (x.includes("loadout") && e.sub_doc instanceof Un) {
				if (e.sub_doc.is_pilot()) {
					let t = e.sub_doc.system._source.loadout;
					t.armor.some((e) => e == C.id) && (m["system.loadout.armor"] = t.armor.map((e) => e == C.id ? null : e)), t.gear.some((e) => e == C.id) && (m["system.loadout.gear"] = t.gear.map((e) => e == C.id ? null : e)), t.weapons.some((e) => e == C.id) && (m["system.loadout.weapons"] = t.weapons.map((e) => e == C.id ? null : e));
				} else if (e.sub_doc.is_mech()) {
					let t = e.sub_doc.system._source.loadout;
					t.systems.some((e) => e == C.id) && (m["system.loadout.systems"] = t.systems.map((e) => e == C.id ? null : e)), t.weapon_mounts.some((e) => e.slots.some((e) => e.weapon == C.id || e.mod == C.id)) && (m["system.loadout.weapon_mounts"] = t.weapon_mounts.map((e) => ({
						slots: e.slots.map((e) => ({
							weapon: e.weapon == C.id ? null : e.weapon,
							mod: e.mod == C.id ? null : e.mod,
							size: e.size
						})),
						bracing: e.bracing,
						type: e.type
					})));
				}
			}
			m[e.sub_path] = C.id, e.sub_doc.update(m);
		}
	});
}
//#endregion
//#region src/module/helpers/chat.ts
function miniProfile(e, t) {
	let m = e.attack ? `<span data-tooltip="Attack Bonus"><i class="cci cci-reticule"></i>${e.attack}</span>` : "", v = (e.accuracy ?? 0) < 0 ? "data-tooltip=\"Difficulty\"" : "data-tooltip=\"Accuracy\"", y = e.accuracy ? `<span ${v}>${e.accuracy < 0 ? "<i class=\"cci cci-difficulty\"></i>" : "<i class=\"cci cci-accuracy\"></i>"}${Math.abs(e.accuracy)}</span>` : "", x = e.range.map((e) => `<span data-tooltip="${e.type}"><i class="cci cci-${e.type.toLowerCase()}"></i>${e.val}</span>`).join(""), S = e.damage ? e.damage.map((e) => `<span data-tooltip="${e.type}"><i class="cci cci-${e.type.toLowerCase()} damage--${e.type.toLowerCase()}"></i>${e.val}</span>`).join("") : "";
	return `
    <div class="mini-weapon-profile flexrow">
      ${e.attack || e.accuracy ? `
        <div class="mini-weapon-profile-accuracy flexrow">
          ${m}
          ${y}
        </div>
        <span class="mini-weapon-profile-separator">//</span>
        ` : ""}
      <div class="mini-weapon-profile-range flexrow">
        ${x}
      </div>
      ${e.damage ? `
      <span class="mini-weapon-profile-separator">//</span>
      <div class="mini-weapon-profile-damage flexrow">
        ${S}
      </div>` : ""}
    </div>`;
}
function attackTarget(e, t) {
	let m = e.crit ? `<span class="card clipped lancer-hit-chip crit">${game.i18n.format("lancer.chat-card.attack.crit")}</span>` : e.hit ? `<span class="card clipped lancer-hit-chip hit">${game.i18n.format("lancer.chat-card.attack.hit")}</span>` : `<span class="card clipped lancer-hit-chip miss">${game.i18n.format("lancer.chat-card.attack.miss")}</span>`, v = e.target.actor?.img, y = e.target.document.uuid, x = e.crit ? "fas fa-explosion i--2" : e.hit ? "fas fa-crosshairs i--2" : "mdi mdi-call-missed i--3";
	return `
    <div class="lancer-hit-target" data-uuid=${y}>
      <img class="lancer-hit-thumb" src="${v}" />
      <span class="lancer-hit-text-name" data-tooltip="${e.target.name}"><b>${e.target.name}</b></span>
      ${m}
      <div class="lancer-hit-roll">
        ${lancerDiceRoll(e.roll, e.tt, x)}
      </div>
    </div>`;
}
function damageTarget(e, t, m) {
	let v = e.target.actor?.statuses || /* @__PURE__ */ new Set(), y = v.has("exposed"), x = {
		energy: v.has("resistance_energy"),
		explosive: v.has("resistance_explosive"),
		kinetic: v.has("resistance_kinetic"),
		burn: v.has("resistance_burn"),
		heat: v.has("resistance_heat")
	}, S = t.configurable ? "\n          <select class=\"lancer-damage-apply-select\" title=\"Select damage multiplier\">\n            <option value=\"2\">2×</option>\n            <option value=\"1\" selected>1×</option>\n            <option value=\"0.5\">Resist</option>\n          </select>" : "", C;
	C = e.crit ? t.crit_damage_results : e.hit ? t.damage_results : t.reliable_results || [];
	let w = new Set(C.filter((t) => !t.target || t.target?.document.uuid === e.target.document.uuid).map((e) => e.d_type.toLowerCase())), E = Array.from(w).map((e) => `<i class="cci cci-${e} i--2 damage--${e}"></i>`).join(""), O = C.filter((t) => t.bonus && t.target?.document.uuid === e.target.document.uuid).map((e) => `<div class="flexrow"><span class="lancer-damage-tag" style="flex-grow: 0" data-tooltip="This row is bonus damage">BONUS</span>${lancerDiceRoll(e.roll, e.tt, `cci cci-${e.d_type.toLowerCase()} damage--${e.d_type.toLowerCase()} i--4`)}</div>`), k = [];
	for (let [e, t] of Object.entries(x)) t && k.push(`<span class="lancer-damage-tag" data-tooltip="Resist ${e.capitalize()}"><i class="mdi mdi-shield-half-full i--1"></i></span>`);
	y && k.push("<span class=\"lancer-damage-tag\" data-tooltip=\"Exposed\"><i class=\"cci cci-status-exposed i--1\"></i></span>"), (t.ap && !t.paracausal || e.ap && !(e.paracausal || t.paracausal)) && k.push("<span class=\"lancer-damage-tag\" data-tooltip=\"Armor Piercing\"><i class=\"mdi mdi-shield-off-outline i--1\"></i></span>"), (t.paracausal || e.paracausal) && k.push("<span class=\"lancer-damage-tag\" data-tooltip=\"Cannot Be Reduced\"><i class=\"cci cci-large-beam i--1\"></i></span>"), (t.half_damage || e.half_damage) && k.push("<span class=\"lancer-damage-tag\" data-tooltip=\"Half Damage\"><i class=\"mdi mdi-fraction-one-half i--1\"></i></span>");
	let ee = k.length ? `<div class="lancer-damage-tags">${k.join("")}</div>` : "", I = e.target.actor?.img, te = e.target.document.uuid;
	return `
    <div class="lancer-damage-target" data-uuid=${te}>
      <img class="lancer-hit-thumb" src="${I}" />
      <span class="lancer-hit-text-name" data-tooltip="${e.target.name}"><b>${e.target.name}</b></span>
      <div
        class="lancer-damage-button-group"
        data-target="${te}"
        data-hit="${e.hit}"
        data-crit="${e.crit}"
        data-add-burn="${t.add_burn}"
      >
        ${S}
        <button
          class="lancer-button lancer-damage-apply"
          title="Apply damage"
        >${E}</button>
      </div>
      <div class="lancer-damage-rolls-tags flexrow">
        <div class="lancer-target-bonus-damage flexcol">${O.join("")}</div>
        ${ee}
      </div>
    </div>`;
}
//#endregion
//#region src/module/helpers/npc.ts
function actionTypeSelector(e, t) {
	let m = e ? e.toLowerCase() : se.None.toLowerCase(), v = "<div class=\"flexrow flex-center\" style=\"padding: 5px; flex-wrap: nowrap;\">";
	return v += actionTypeIcon(e), v += `<select name="${t}" data-type="String" style="height: 2em;float: right" >
    <option value="${se.None}" ${m === se.None.toLowerCase() ? "selected" : ""}>NONE</option>
    <option value="${se.Full}" ${m === se.Full.toLowerCase() ? "selected" : ""}>FULL</option>
    <option value="${se.Quick}" ${m === se.Quick.toLowerCase() ? "selected" : ""}>QUICK</option>
    <option value="${se.Reaction}" ${m === se.Reaction.toLowerCase() ? "selected" : ""}>REACTION</option>
    <option value="${se.Protocol}" ${m === se.Protocol.toLowerCase() ? "selected" : ""}>PROTOCOL</option>
    <option value="${se.Passive}" ${m === se.Passive.toLowerCase() ? "selected" : ""}>PASSIVE</option>
    <option value="${se.Other}" ${m === se.Other.toLowerCase() ? "selected" : ""}>OTHER</option>
  </select>
  </div>`, v;
}
function npcFeatureScaffold(e, t, m, v) {
	let y = `lancer-${slugify(t.system.type, "-")}`, x = `cci-${slugify(t.system.type, "-")}`;
	t.system.type === re.Tech && (x += "-quick");
	let S = "";
	return t.system.type !== re.Weapon && (S = "<a class=\"chat-flow-button\"><i class=\"mdi mdi-message\"></i></a>"), `
  <div class="set ref card ${y}" data-item-id="${t.id}" ${ref_params(t)}>
    <div class="flexrow lancer-header clipped-top ${t.system.destroyed ? "destroyed" : ""}">
      <i class="${t.system.destroyed ? "mdi mdi-cog" : `cci ${x} i--4 i--light`}"> </i>
      ${S}
      <span class="minor grow">${t.name}</span>
      <a class="lancer-context-menu" data-path="${e}" ${v.hash.isRef ? `data-uuid=${t.uuid}` : ""}>
        <i class="fas fa-ellipsis-v"></i>
      </a>
    </div>
    ${m}
  </div>`;
}
function npcReactionView(e, t) {
	let m = t.hash.item ?? resolveHelperDotpath(t, e);
	return m ? (t.hash.tags = m.system.tags, npcFeatureScaffold(e, m, `<div class="flexcol lancer-body">
      ${m.system.tags.find((e) => e.lid === "tg_limited") ? limitedUsesIndicator(m, e) : ""}
      ${m.system.tags.find((e) => e.lid === "tg_recharge") ? chargedIndicator(m, e) : ""}
      ${effectBox("TRIGGER", m.system.trigger, { flow: !0 })}
      ${effectBox("EFFECT", m.system.effect)}
      ${compactTagListHBS(e + ".system.tags", t)}
    </div>`, t)) : "";
}
function npcSystemTraitView(e, t) {
	let m = t.hash.item ?? resolveHelperDotpath(t, e);
	return m ? (t.hash.tags = m.system.tags, npcFeatureScaffold(e, m, `<div class="flexcol lancer-body">
      ${m.system.tags.find((e) => e.lid === "tg_limited") ? limitedUsesIndicator(m, e) : ""}
      ${m.system.tags.find((e) => e.lid === "tg_recharge") ? chargedIndicator(m, e) : ""}
      ${effectBox("EFFECT", m.system.effect, { flow: !0 })}
      ${compactTagListHBS(e + ".system.tags", t)}
    </div>`, t)) : "";
}
function npcTechView(e, t) {
	let m = t.hash.item ?? resolveHelperDotpath(t, e);
	if (!m) return "";
	t.hash.tags = m.system.tags;
	let v = m.system, y = (t.hash.tier ?? 1) - 1, x = [], S = [];
	return v.tech_attack && x.push("<a class=\"roll-tech lancer-button\" data-tooltip=\"Roll an attack with this system\">\n        <i class=\"fas fa-dice-d20 i--4\"></i>\n      </a>"), v.tech_attack && v.attack_bonus && v.attack_bonus[y] && x.push(npcAttackBonusView(v.attack_bonus[y], "ATTACK")), v.tech_attack && v.accuracy && v.accuracy[y] && x.push(npcAccuracyView(v.accuracy[y])), v.tags.find((e) => e.is_recharge) && x.push(chargedIndicator(m, e)), m.system.tags.some((e) => e.is_limited) && S.push(limitedUsesIndicator(m, e)), npcFeatureScaffold(e, m, `
    <div class="lancer-body flex-col">
      <div class="flexrow">
        ${x.join("<span class=\"vsep\"></span>")}
      </div>
      <div class="flexrow no-wrap">
        ${S.join()}
      </div>
      <div class="flexcol" style="padding: 0 10px;">
        ${effectBox("EFFECT", v.effect, { flow: !v.tech_attack })}
        ${compactTagListHBS(e + ".system.tags", t)}
      </div>
    </div>
    `, t);
}
function npcWeaponView(e, t) {
	let m = t.hash.item ?? resolveHelperDotpath(t, e);
	if (!m || !m.is_weapon()) return "";
	t.hash.tags = m.system.tags;
	let v = m.system, y = (t.hash.tier ?? 1) - 1, x = ["<a class=\"roll-attack lancer-button no-grow\" data-tooltip=\"Roll an attack with this weapon\">\n      <i class=\"fas fa-dice-d20 i--4 i--dark\"></i>\n    </a>"], S = [];
	return v.attack_bonus[y] && x.push(npcAttackBonusView(v.attack_bonus[y])), v.accuracy[y] && x.push(npcAccuracyView(v.accuracy[y])), v.range.length && x.push(rangeArrayView(v.range, t)), v.damage[y] && v.damage[y].length && x.push(damageArrayView(v.damage[y], {
		...t,
		rollable: !0
	})), v.tags.find((e) => e.is_recharge) && S.push(chargedIndicator(m, e)), m.system.tags.some((e) => e.is_loading) && S.push(loadingIndicator(m, e)), m.system.tags.some((e) => e.is_limited) && S.push(limitedUsesIndicator(m, e)), npcFeatureScaffold(e, m, `
    <div class="lancer-body flex-col">
      <div class="flexrow no-wrap">
        ${x.join("<span class=\"vsep\"></span>")}
      </div>
      <div class="flexrow no-wrap">
        ${S.join()}
      </div>
      <div>
        <span>${v.weapon_type} // ${m.system.origin.name} ${m.system.origin.type} Feature</span>
      </div>
      ${effectBox("ON HIT", v.on_hit)}
      ${effectBox("EFFECT", v.effect)}
      ${compactTagListHBS(e + ".system.tags", t)}
    </div>
    `, t);
}
function npcScanWeaponView(e, t) {
	let m = "", v = "", y = "";
	e.effect && (m = `<div class="effect-box">
        <span class="effect-title clipped-bot">EFFECT</span>
        <span class="effect-text">${e.effect}</span>
      </div>`), e.on_hit && (v = `<div class="effect-box">
        <span class="effect-title clipped-bot">ON HIT</span>
        <span class="effect-text">${e.on_hit}</span>
      </div>`), e.tags?.length && (y = compactTagList(e.tags, "", {
		...t,
		editable: !1
	}));
	let x = {
		attack: e.attack_bonus || void 0,
		accuracy: e.accuracy || void 0,
		range: e.range || [],
		damage: e.damage
	};
	return `
    <li class="scan-feature-card">
      <details>
        <summary class="lancer-header lancer-secondary scan-feature-title">
          <i class="cci cci-weapon i--3"></i>
          <span>${e.name}</span>
          <i class="mdi mdi-unfold-less-horizontal"></i>
          <span class="scan-feature-type"> // ${e.weapon_type} // </span>
        </summary>
        ${miniProfile(x, t)}
        ${m}
        ${v}
        ${y}
      </details>
    </li>`;
}
function npcScanTechAttackView(e, t) {
	let m = "", v = "", y = "", x = "";
	m = e.tech_type === ie.Full ? "cci cci-tech-full" : "cci cci-tech-quick", e.effect && (v = `<div class="effect-box">
        <span class="effect-title clipped-bot">EFFECT</span>
        <span class="effect-text">${e.effect}</span>
      </div>`), e.on_hit && (y = `<div class="effect-box">
        <span class="effect-title clipped-bot">ON HIT</span>
        <span class="effect-text">${e.on_hit}</span>
      </div>`), e.tags?.length && (x = compactTagList(e.tags, "", {
		...t,
		editable: !1
	}));
	let S = {
		attack: e.attack_bonus || void 0,
		accuracy: e.accuracy || void 0,
		range: e.range ? [e.range] : []
	};
	return `
    <li class="scan-feature-card">
      <details>
        <summary class="lancer-header lancer-secondary scan-feature-title">
          <i class="${m} i--3"></i>
          <span>${e.name}</span>
          <i class="mdi mdi-unfold-less-horizontal"></i>
          <span class="scan-feature-type"> // ${e.tech_type || ""} TECH${e.tech_attack ? " ATTACK" : ""} // </span>
        </summary>
        ${miniProfile(S, t)}
        ${v}
        ${y}
        ${x}
      </details>
    </li>`;
}
function npcScanSystemView(e, t) {
	let m = "", v = "", y = "", x = "";
	return m = e.type === re.Tech ? e.tech_type === ie.Full ? "cci cci-tech-full" : "cci cci-tech-quick" : `cci cci-${e.type.toLowerCase()}`, e.trigger && (v = `<div class="effect-box">
          <span class="effect-title clipped-bot">TRIGGER</span>
          <span class="effect-text">${e.trigger}</span>
        </div>`), e.effect && (y = `<div class="effect-box">
          <span class="effect-title clipped-bot">EFFECT</span>
          <span class="effect-text">${e.effect}</span>
        </div>`), e.tags?.length && (x = compactTagList(e.tags, "", {
		...t,
		editable: !1
	})), `
    <li class="scan-feature-card">
      <details>
        <summary class="lancer-header lancer-${e.type.toLowerCase()} scan-feature-title">
          <i class="${m} i--3"></i>
          <span>${e.name}</span>
          <i class="mdi mdi-unfold-less-horizontal"></i>
          <span class="scan-feature-type"> // ${e.type} // </span>
        </summary>
        ${v}
        ${y}
        ${x}
      </details>
    </li>`;
}
//#endregion
//#region src/module/apps/simple-prompt.ts
function promptText(e, t = "") {
	return new Promise((m, v) => {
		new Dialog({
			title: e,
			content: ` 
          <div class="form-group">  
            <input id="textval" type="text" style="width: 100%;" value="${t}"></input>
          </div>
          <hr>
        `,
			buttons: { confirm: {
				label: "Confirm",
				callback: async (e) => {
					let t = $(e).find("#textval")[0].value;
					m(t);
				}
			} },
			close: () => m(null),
			default: "confirm"
		}, { classes: ["lancer"] }).render(!0);
	});
}
//#endregion
//#region src/module/apps/counter-editor.ts
var CounterEditForm = class extends TargetedEditForm {
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			template: `systems/${game.system.id}/templates/window/counter.hbs`,
			classes: ["lancer", "counter-editor"],
			title: "Counter Editing"
		};
	}
	fixupForm(e) {
		let t = e.name, m = e.min, v = e.max, y = e.value, x = [
			m,
			v,
			y
		].find((e) => Number.isNaN(e));
		if (x !== void 0) {
			let e = `${x} is not a valid numeric value`;
			throw ui.notifications?.error(e), Error(e);
		}
		return t = t.trim(), v < m && (v = m), y < m && (y = m), y > v && (y = v), {
			name: t,
			min: m,
			max: v,
			value: y
		};
	}
}, vt = {
	ATLAS: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-ATLAS.png",
	BALOR: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-BALOR.png",
	BARBAROSSA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-BARBAROSSA.png",
	"BLACK WITCH": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-BLACK WITCH.png",
	BLACKBEARD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-BLACKBEARD.png",
	CALENDULA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-RKF-CALENDULA.png",
	CALIBAN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-CALIBAN.png",
	"DEATH’S HEAD": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-DEATHS HEAD.png",
	DRAKE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-DRAKE.png",
	"DUSK WING": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-DUSK WING.png",
	EMPAKAAI: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-EMPAKAAI.png",
	EMPEROR: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-EMPEROR.png",
	ENKIDU: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-ENKIDU.png",
	EVEREST: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-GMS.png",
	GENGHIS: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-GENGHIS.png",
	GOBLIN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-GOBLIN-2-0.png",
	GORGON: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-GORGON.png",
	HYDRA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-HYDRA.png",
	ISKANDER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-ISKANDER-2-0.png",
	KIDD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-KIDD.png",
	KOBOLD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-KOBOLD.png",
	LANCASTER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-LANCASTER.png",
	LICH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-LICH.png",
	MANTICORE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-MANTICORE.png",
	METALMARK: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-METALMARK-2-0.png",
	MINOTAUR: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-MINOTAUR.png",
	MONARCH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-MONARCH.png",
	"MOURNING CLOAK": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-MOURNING CLOAK.png",
	NAPOLEON: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-NAPOLEON.png",
	NELSON: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-NELSON-2-0.png",
	ORCHIS: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-ORCHIS.png",
	PEGASUS: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Horus-PEGASUS-2-0.png",
	RALEIGH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-RALEIGH.png",
	SAGARMATHA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-GMS.png",
	SALADIN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-SALADIN.png",
	SHERMAN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-SHERMAN.png",
	STÖRTEBEKER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-STORTEBEKER.png",
	SUNZI: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-SUNZI.png",
	SWALLOWTAIL: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-SWALLOWTAIL-2-0.png",
	"SWALLOWTAIL (RANGER VARIANT)": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-RANGER-SWALLOWTAIL.png",
	TOKUGAWA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-TOKUGAWA.png",
	TORTUGA: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-TORTUGA.png",
	VICEROY: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-VICEROY.png",
	VLAD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-VLAD-2-0.png",
	"WHITE WITCH": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-WHITE WITCH.png",
	"“WORLDKILLER” GENGHIS MK I": "systems/lancer/assets/retrograde-minis/Retrograde-Minis-HA-GENGHIS-MK-I---WORLDKILLER.png",
	ZHENG: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-ZHENG.png",
	ACE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-ACE.png",
	AEGIS: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-AEGIS.png",
	ARCHER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-ARCHER.png",
	ASSASSIN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-ASSASSIN.png",
	ASSAULT: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-ASSAULT.png",
	AVENGER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-AVENGER.png",
	BARRICADE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-BARRICADE.png",
	BASTION: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-BASTION.png",
	BERSERKER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-BERSERKER.png",
	BOMBARD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-BOMBARD.png",
	BREACHER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-BREACHER.png",
	CATAPHRACT: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-CATAPHRACT.png",
	DEMOLISHER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-DEMOLISHER.png",
	ENGINEER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-ENGINEER.png",
	GOLIATH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-GOLIATH.png",
	HIVE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-HIVE.png",
	HORNET: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-HORNET.png",
	HUMAN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Misc-HUMAN.png",
	LEECH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-LEECH.png",
	LURKER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-LURKER.png",
	MIRAGE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-MIRAGE.png",
	MONSTROSITY: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Kaiju-RUGAM.png",
	OPERATOR: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-OPERATOR.png",
	PRIEST: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-PRIEST.png",
	PYRO: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-PYRO.png",
	RAINMAKER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-RAINMAKER.png",
	RONIN: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-RONIN.png",
	SCOURER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SCOURER.png",
	SCOUT: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SCOUT.png",
	SEEDER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SEEDER.png",
	SENTINEL: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SENTINEL.png",
	SNIPER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SNIPER.png",
	SPECTER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SPECTER.png",
	SPITE: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SPITE.png",
	STRIDER: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-STRIDER.png",
	SQUAD: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Misc-INFANTRY.png",
	SUPPORT: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-SUPPORT.png",
	TEMPEST: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-TEMPEST.png",
	WITCH: "systems/lancer/assets/retrograde-minis/Retrograde-Minis-Corpro-WITCH.png"
};
function frameToPath(e) {
	return (e ? vt[e.trim().toUpperCase()] : null) ?? null;
}
//#endregion
//#region src/module/helpers/item.ts
foundry.applications.ux.ContextMenu;
function weaponSizeSelector(e, t) {
	return t.hash.presorted = !0, t.hash.default || (t.hash.default = q.Main), std_enum_select(e, q, t);
}
function weaponTypeSelector(e, t) {
	return t.hash.default || (t.hash.default = ae.Rifle), std_enum_select(e, ae, t);
}
function rangeEditor(e, t) {
	let m = resolveHelperDotpath(t, e);
	if (!m) return "";
	let v = `<i class="cci ${m.icon} i--4 i--dark"></i>`, y = extendHelper(t, { value: m.type }, { default: ce.Range }), x = std_enum_select(e + ".type", ce, y), S = extendHelper(t, { value: m.val });
	return `<div class="flexrow flex-center" style="padding: 5px;">
    ${v}
    ${x}
    ${std_text_input(e + ".val", S)}
    ${`<a class="gen-control" data-action="splice" data-path="${e}" style="margin: 4px;"><i class="fas fa-trash"></i></a>`}
  </div>
  `;
}
function damageEditor(e, t) {
	t.hash.presorted = !0;
	let m = resolveHelperDotpath(t, e);
	if (!m) return "";
	let v = `<i class="cci ${m.icon} i--4"></i>`, y = extendHelper(t, { value: m.type }, { default: le.Kinetic }), x = std_enum_select(e + ".type", le, y), S = extendHelper(t, { value: m.val });
	return `<div class="flexrow flex-center" style="padding: 5px;">
    ${v}
    ${x}
    ${std_text_input(e + ".val", S)}
    ${`<a class="gen-control" data-action="splice" data-path="${e}" style="margin: 4px;"><i class="fas fa-trash"></i></a>`}
  </div>
  `;
}
function damageArrayView(e, t) {
	let m = t.hash.classes || "", v = [], y = t.rollable ? `<a
      class="flexrow no-grow compact-damage roll-damage lancer-button ${m}"
      style="max-width: min-content;"
      data-tooltip="Roll damage for this weapon without attacking"
    >` : `<div class="flexrow no-grow compact-damage ${m}">`, x = t.rollable ? "</a>" : "</div>";
	for (let t of e) {
		let e = `<span class="compact-damage">
      <i class="cci ${t.icon} i--4 i--dark damage--${t.type.toLowerCase()}"></i>
      ${t.val}</span>`;
		v.push(e);
	}
	return `${y}${v.join(" ")}${x}`;
}
function rangeArrayView(e, t) {
	let m = t.hash.classes || "", v = [];
	for (let t of e) {
		let e = `<span class="compact-range" data-tooltip="${t.type}"><i class="cci ${t.icon} i--4 i--dark"></i>${t.val}</span>`;
		v.push(e);
	}
	return `<div class="flexrow no-grow compact-range ${m}">${v.join(" ")}</div>`;
}
function npcAttackBonusView(e, t = "ATTACK") {
	return `<div class="compact-acc" data-tooltip="Flat attack bonus">
    <i style="margin-right: 5px;" class="cci cci-reticule i--4"></i>
    <span class="medium"> ${e < 0 ? "-" : "+"}${e} ${t}</span>
  </div>`;
}
function npcAccuracyView(e) {
	let t, m;
	if (e > 0) t = "accuracy", m = `+${e} ACCURACY`;
	else if (e < 0) t = "difficulty", m = `${e} DIFFICULTY`;
	else return "";
	return `<div class="compact-acc" data-tooltip="Innate Accuracy/Difficulty">
      <i style="margin-right: 5px" class="cci cci-${t} i--4"></i>
      <span class="medium">${m}</span>
    </div>`;
}
function systemTypeSelector(e, t) {
	return std_enum_select(e, oe, extendHelper(t, {}, { default: oe.System }));
}
function usesControl(e, t, m) {
	return `
    <div class="card clipped">
      <span class="lancer-header lancer-primary"> USES </span>
      ${std_x_of_y(e, resolveHelperDotpath(m, e, 0), t)}
    </div>
    `;
}
function npcFeatureView(e, t) {
	let m = t.hash.item ?? resolveHelperDotpath(t, e);
	if (!m) return "";
	switch (m.system.type) {
		case "Reaction": return npcReactionView(e, t);
		case "System":
		case "Trait": return npcSystemTraitView(e, t);
		case "Tech": return npcTechView(e, t);
		case "Weapon": return npcWeaponView(e, t);
		default: return "bad feature";
	}
}
function bonusesDisplay(e, t, m) {
	let v = resolveHelperDotpath(m, e, []), y = [];
	for (let m = 0; m < v.length; m++) {
		let x = v[m], S = `<a class="gen-control" data-action="splice" data-path="${e}.${m}"><i class="fas fa-trash"></i></a>`, C = `<span class="grow">${x.lid}</span> ${inc_if(S, t)}`, w = `
      <div class="bonus ${inc_if("editable", t)}" data-path="${e}.${m}">
        ${effectBox(C, x.val)}
      </div>
    `;
		y.push(w);
	}
	return `
    <div class="card bonus-list">
      <div class="lancer-header lancer-bonus">
        <span class="left">// Bonuses</span>
        ${inc_if(`<a class="gen-control fas fa-plus" data-action="append" data-path="${e}" data-action-value="(struct)bonus"></a>`, t)}
      </div>
      ${y.join("\n")}
    </div>
    `;
}
function bondPower(e, t, m) {
	let v = resolveHelperDotpath(m, e), y = v?.system.powers[t];
	if (!v || !y) return "";
	let x = `<span class="desc-text">${y.description ?? ""}</span>`;
	return `
    <div class="card clipped bond-power" data-uuid="${v.uuid}" data-power-index="${t}">
      <div class="lancer-header lancer-primary medium clipped-top">
        <i class="cci cci-trait i--4"></i>
        <a class="bond-power-flow"><i class="mdi mdi-message"></i></a>
        <span>${y.name}</span>
        ${y.veteran ? "<i class=\"mdi mdi-alpha-v-box i--3\"></i>" : ""}
        ${y.master ? "<i class=\"mdi mdi-alpha-m-box i--3\"></i>" : ""}
      </div>
      ${y.uses ? `<div class="flexrow">
            ${x}
            ${y.uses && y.uses.max ? bondPowerUsesIndicator(v, t, `${e}.system.powers.${t}`) : ""}
          </div>` : `${x}`}
    </div>
  `;
}
function pilotArmorSlot(e, t) {
	let m = resolveHelperDotpath(t, e);
	if (!m) return `<div class="${z.PILOT_ARMOR} ref drop-settable card"
                        data-path="${e}"
                        data-accept-types="${z.PILOT_ARMOR}">
          <img class="ref-icon" src="${TypeIcon(z.PILOT_ARMOR)}"></img>
          <span class="major">Equip armor</span>
      </div>`;
	let v = m.system.bonuses, y = v.find((e) => e.lid == "pilot_armor")?.val ?? "0", x = v.find((e) => e.lid == "pilot_speed")?.val ?? "0", S = v.find((e) => e.lid == "pilot_edef")?.val ?? "0", C = v.find((e) => e.lid == "pilot_evasion")?.val ?? "0", w = v.find((e) => e.lid == "pilot_hp")?.val ?? "0", E = m.system.description || "", O = m.system.effect ? effectBox("Effect", m.system.effect) : "", k = "";
	return m.system.actions.length && (k = buildActionArrayHTML(m, "system.actions")), `<div class="set ref drop-settable card clipped-top pilot-armor-compact item lancer-border-primary"
                ${ref_params(m, e)}
                data-accept-types="${z.PILOT_ARMOR}"
                >
            <div class="lancer-header lancer-primary">
              <i class="mdi mdi-shield-outline i--4 i--light"> </i>
              <span class="minor">${m.name}</span>
              <a class="lancer-context-menu" data-path="${e}"">
                <i class="fas fa-ellipsis-v"></i>
              </a>
            </div>
            <div class="flexrow" style="align-items: center; padding: 5px">
              <div class="compact-stat">
                <i class="mdi mdi-shield-outline i--2 i--dark"></i>
                <span class="minor">${y}</span>
              </div>
              <div class="compact-stat">
                <i class="mdi mdi-heart i--2 i--dark"></i>
                <span class="minor">+${w}</span>
              </div>
              <div class="compact-stat">
                <i class="cci cci-edef i--2 i--dark"></i>
                <span class="minor">${S}</span>
              </div>
              <div class="compact-stat">
                <i class="cci cci-evasion i--2 i--dark"></i>
                <span class="minor">${C}</span>
              </div>
              <div class="compact-stat">
                <i class="mdi mdi-arrow-right-bold-hexagon-outline i--2 i--dark"></i>
                <span class="minor">${x}</span>
              </div>
            </div>
            <div class="pilot-gear-body flexcol">
              ${E}
              ${O}
              ${k}
              ${compactTagListHBS(e + ".system.tags", t)}
            </div>
          </div>`;
}
function pilotWeaponRefview(e, t) {
	let m = resolveHelperDotpath(t, e);
	if (!m) return `<div class="${z.PILOT_WEAPON} ref drop-settable card flexrow"
                        data-path="${e}"
                        data-accept-types="${z.PILOT_WEAPON}">
          <img class="ref-icon" src="${TypeIcon(z.PILOT_WEAPON)}"></img>
          <span class="major">Equip weapon</span>
      </div>`;
	let v = "";
	m.system.tags.some((e) => e.is_loading) && (v = loadingIndicator(m, e)), m.system.tags.some((e) => e.is_limited) && limitedUsesIndicator(m, e);
	let y = m.system.effect ? effectBox("Effect", m.system.effect) : "", x = "";
	return m.system.actions.length && (x = buildActionArrayHTML(m, "system.actions")), `<div class="set ${z.PILOT_WEAPON} ref drop-settable card clipped-top pilot-weapon-compact item lancer-border-weapon"
    ${ref_params(m, e)}
    data-accept-types="${z.PILOT_WEAPON}"
  >
    <div class="lancer-header lancer-weapon">
      <i class="cci cci-weapon i--4 i--light"> </i>
      <span class="minor">${m.name}</span>
              <a class="lancer-context-menu" data-path="${e}"">
                <i class="fas fa-ellipsis-v"></i>
              </a>
    </div>
    <div class="pilot-gear-body flexcol">
      <div class="flexrow">
        <a
          class="flexrow roll-attack lancer-button"
          style="max-width: min-content;"
          data-tooltip="Roll an attack with this weapon"
        >
          <i class="fas fa-dice-d20 i--3 i--dark"></i>
        </a>
        ${rangeArrayView(m.system.range, t)}
        <span class="vsep"></span>
        ${damageArrayView(m.system.damage, {
		...t,
		rollable: !0
	})}

        ${inc_if("<span class=\"vsep\"></span><div class=\"uses-wrapper\">", v || "")}
        ${v}
        
        ${inc_if("</div>", v || "")}
      </div>

      ${y}
      ${x}
      ${compactTagListHBS(e + ".system.tags", t)}
    </div>
  </div>`;
}
function pilotGearRefview(e, t) {
	let m = resolveDotpath(t.data?.root, e);
	if (!m) return `<div class="${z.PILOT_GEAR} ref drop-settable card flexrow"
                        data-path="${e}"
                        data-accept-types="${z.PILOT_GEAR}">
          <img class="ref-icon" src="${TypeIcon(z.PILOT_GEAR)}"></img>
          <span class="major">Equip gear</span>
      </div>`;
	let v = "";
	m.getLimitedBase() && (v = limitedUsesIndicator(m, e));
	let y = m.system.effect ? effectBox("Effect", m.system.effect) : "", x = "";
	return m.system.actions.length && (x = buildActionArrayHTML(m, "system.actions")), `<div class="set ${z.PILOT_GEAR} ref drop-settable card clipped-top item lancer-border-system"
    ${ref_params(m, e)}
    data-accept-types="${z.PILOT_GEAR}"
  >
    <div class="lancer-header lancer-system">
      <i class="cci cci-generic-item i--4"> </i>
      <a class="chat-flow-button"><i class="mdi mdi-message"></i></a>
      <span class="minor">${m.name}</span>
      <a class="lancer-context-menu" data-path="${e}"">
        <i class="fas fa-ellipsis-v"></i>
      </a>
    </div>
    <div class="pilot-gear-body flexcol">
      <div class="flexrow">
        <div class="effect-text">
          ${m.system.description || ""}
        </div>
        ${v}
      </div>
      ${y}
      ${x}
      ${compactTagListHBS(e + ".system.tags", t)}
    </div>
  </div>`;
}
function bondPowerUsesIndicator(e, t, m) {
	let v = e.system.powers[t];
	return v.uses ? `<div class="clipped card limited-card">
    <div class="flexcol"><span>USES</span><div>${hex_array(v.uses.value, v.uses.max, m, "power-uses-hex").join("")}</div></div>
  </div>` : "";
}
function reserveRefView(e, t) {
	let m = resolveHelperDotpath(t, e);
	if (!m) return `<div class="${z.RESERVE} ref drop-settable card flexrow"
                        data-path="${e}"
                        data-accept-types="${z.RESERVE}">
          <img class="ref-icon" src="${TypeIcon(z.RESERVE)}"></img>
          <span class="major">Equip reserve</span>
      </div>`;
	let v = "", y = [
		fe.Mech,
		fe.Organization,
		fe.Project,
		fe.Resources,
		fe.Tactical,
		"Resource",
		"Bonus"
	];
	switch (y.includes(m.system.type) ? m.system.type : y.includes(m.system.label) ? m.system.label : m.system.type) {
		case "Bonus":
			v = "cci cci-accuracy";
			break;
		case fe.Mech:
			v = "cci cci-reserve-mech";
			break;
		case fe.Organization:
			v = "mdi mdi-account-multiple";
			break;
		case fe.Project:
			v = "cci cci-orbital";
			break;
		case fe.Resources:
		case "Resource":
			v = "cci cci-reserve-resource";
			break;
		case fe.Tactical:
			v = "cci cci-reserve-tac";
			break;
		default:
			v = "cci cci-reserve-tac";
			break;
	}
	let x = "";
	m.system.consumable && (x = reserveUsesIndicator(`${e}.system.used`, t));
	let S = m.system.actions.length > 0 ? buildActionArrayHTML(m, "system.actions") : "";
	return `<div class="set ${z.RESERVE} ref drop-settable card clipped-top item lancer-border-trait"
                ${ref_params(m, e)} >
    <div class="lancer-header lancer-trait">
      <i class="${v} i--4"> </i>
      <a class="chat-flow-button"><i class="mdi mdi-message"></i></a>
      <span class="minor">${m.name}</span>
      <a class="lancer-context-menu" data-path="${e}"">
        <i class="fas fa-ellipsis-v"></i>
      </a>
    </div>
    <div class="flexcol">
      <div class="flexrow">
        <div class="effect-text">
          ${m.system.description}
        </div>
        ${S}
        ${x}
      </div>
    </div>
  </div>`;
}
function mechLoadoutWeaponSlot(e, t, m, v) {
	if (resolveHelperDotpath(v, e)) return mechWeaponDisplay(e, t, v);
	{
		let t = m ? m === B.Flex ? `${B.Main} || ${B.Auxiliary}` : m : "any";
		return `
      <div class="${z.MECH_WEAPON} ref slot drop-settable card flexrow"
           data-path="${e}"
           data-accept-types="${z.MECH_WEAPON}">
        <img class="ref-icon" src="${TypeIcon(z.MECH_WEAPON)}"></img>
        <span class="major">Insert ${t} weapon</span>
      </div>`;
	}
}
function mechWeaponDisplay(e, t, m) {
	resolveHelperDotpath(m, "actor");
	let v = resolveHelperDotpath(m, e), y = t ? weaponModView(t, e, m) : "", x = resolveHelperDotpath(m, "collapse");
	if (!v) return "";
	let S = "";
	if (v.system.profiles.length > 1) {
		S = "<div class=\"flexrow weapon-profile-wrapper\">";
		for (let t = 0; t < v.system.profiles.length; t++) {
			let m = v.system.profiles[t];
			S += `<a class="gen-control weapon-profile ${t === v.system.selected_profile_index ? "selected-profile" : ""}"
data-action="set" data-action-value="(int)${t}" data-path="${e}.system.selected_profile_index">
<span class="minor">${m.name}</span>
</a>`;
		}
		S += "</div>";
	}
	let C = spDisplay(v.system.sp ?? 0), w = v.system.active_profile, E = `${e}.system.profiles.${v.system.selected_profile_index}`, O = "";
	v.system.all_tags.some((e) => e.is_loading) && (O = loadingIndicator(v, e));
	let k = w.effect ? effectBox("Effect", w.effect) : "", ee = w.on_attack ? effectBox("On Attack", w.on_attack) : "", I = w.on_hit ? effectBox("On Hit", w.on_hit) : "", te = w.on_crit ? effectBox("On Crit", w.on_crit) : "", ne = v.system.actions.length > 0 ? buildActionArrayHTML(v, "system.actions") : "";
	ne += w.actions.length > 0 ? buildActionArrayHTML(v, `system.profiles.${v.system.selected_profile_index}.actions`) : "";
	let re = "";
	return v.isLimited() && (re = limitedUsesIndicator(v, e)), `
  <div class="mech-weapon-wrapper${y ? "-modded" : ""}">
    <div class="ref set drop-settable ${z.MECH_WEAPON} flexcol item"
                  ${ref_params(v, e)}
                  data-accept-types="${z.MECH_WEAPON}"
                  style="max-height: fit-content;">
      <div class="lancer-header lancer-weapon ${v.system.destroyed ? "destroyed" : ""}">
        <i class="${v.system.destroyed ? "mdi mdi-cog" : "cci cci-weapon i--4 i--light"}"> </i>
        <a class="chat-flow-button"><i class="mdi mdi-message"></i></a>
        <span class="minor" >
          ${v.name} // ${v.system.size.toUpperCase()} ${w.type.toUpperCase()}
        </span>
        ${collapseButton(x, v)}
        <a class="lancer-context-menu" data-path="${e}">
          <i class="fas fa-ellipsis-v"></i>
        </a>
      </div>
      <div class="lancer-body collapse" ${collapseParam(x, v, !0)}>
        ${v.system.sp ? C : ""}
        ${S}
        <div class="flexrow" style="text-align: left; white-space: nowrap;">
          <a class="roll-attack lancer-button" data-tooltip="Roll an attack with this weapon">
            <i class="fas fa-dice-d20 i--4 i--dark"></i>
          </a>
          <span class="vsep"></span>
          ${rangeArrayView(w.all_range, m)}
          <span class="vsep"></span>
          ${damageArrayView(w.all_damage, {
		...m,
		rollable: !0
	})}

          ${inc_if("<span class=\"vsep\"></span><div class=\"uses-wrapper\">", O || re)}
          <!-- Loading toggle, if we are loading-->
          ${O}
          <!-- Limited toggle if we are limited-->
          ${re}
          ${inc_if("</div>", O || re)}
        </div>

        <div class="flexcol">
          ${k}
          ${ee}
          ${I}
          ${te}
          ${ne}
          ${compactTagListHBS(E + ".all_tags", m)}
        </div>
        ${y}
      </div>
    </div>
  </div>`;
}
function weaponModView(e, t, m) {
	let v = resolveHelperDotpath(m, e);
	if (t && resolveHelperDotpath(m, t), !v) return `<div class="${z.WEAPON_MOD} ref slot drop-settable card flexrow"
        data-path="${e}"
        data-accept-types="${z.WEAPON_MOD}">
      <i class="cci cci-weaponmod i--4 i--light"> </i>
      <span>No Mod Installed</span>
    </div>`;
	let y = v.system.sp ? spDisplay(v.system.sp) : "", x = v.system.tags.some((e) => e.is_limited) ? limitedUsesIndicator(v, e) : "", S = "";
	v.system.added_range.length && (S = `
      <div class="effect-box">
        <div class="effect-title clipped-bot">ADDED RANGE</div>
        ${rangeArrayView(v.system.added_range, m)}
      </div>`);
	let C = "";
	v.system.added_damage.length && (C = `
      <div class="effect-box">
        <div class="effect-title clipped-bot">ADDED DAMAGE</div>
        ${damageArrayView(v.system.added_damage, m)}
      </div>`);
	let w = v.system.effect ? effectBox("Effect", v.system.effect, { flow: !0 }) : "", E = v.system.bonuses.length > 0 ? bonusesDisplay(`${e}.system.bonuses`, !1, m) : "", O = "";
	v.system.added_tags.length && (O = `
    <div class="effect-box">
      <span class="effect-title clipped-bot">ADDED TAGS</span>
      ${compactTagListHBS(e + ".system.added_tags", m)}
    </div>
    `);
	let k = v.system.tags.length ? compactTagListHBS(`${e}.system.tags`, m) : "", ee = "";
	return v.system.actions.length && (ee = buildActionArrayHTML(v, "system.actions")), `
  <div class="set flexcol clipped-top ref ${z.WEAPON_MOD} drop-settable" ${ref_params(v, e)} data-accept-types="${z.WEAPON_MOD}">
    <div class="lancer-header lancer-mod">
      <i class="cci cci-weaponmod i--4 i--light"> </i>
      <span class="minor">${v.name}</span>
      <a class="lancer-context-menu" data-path="${e}">
        <i class="fas fa-ellipsis-v"></i>
      </a>
    </div>
    <div class="lancer-body">
      <div class="flexrow">
        ${x}
        ${y}
      </div>
      <div class="flexrow">
        ${S}
        ${C}
      </div>
      ${w}
      ${E}
      ${ee}
      ${O}
      ${k}
    </div>
  </div>`;
}
function licenseRefView(e, t) {
	let m = resolveHelperDotpath(t, e), v = m.system.manufacturer ? manufacturerStyle(m.system.manufacturer) : "gms";
	return `
    <li class="card clipped ref set" ${ref_params(m)}>
      <div class="lancer-header ${v} medium clipped-top" style="grid-area: 1/1/2/3">
        <i class="cci cci-license i--4 i--dark"> </i>
        <div class="major modifier-name">${m.name} ${m.system.curr_rank}</div>
        <div class="ref-controls">
          <a class="lancer-context-menu" data-path="${e}"">
            <i class="fas fa-ellipsis-v"></i>
          </a>
        </div>
      </div>
    </li>`;
}
function framePreview(e, t) {
	let m = resolveHelperDotpath(t, e);
	if (m) {
		let t = frameToPath(m.name) ?? "systems/lancer/assets/icons/frame.svg";
		return `
    <li class="card clipped ref set click-open" ${ref_params(m)}>
      <div class="compact-frame medium flexrow">
        <span class="img-bar" style="background-image: url(${t})"></span>
        <div class="major modifier-name i--light">${m.system.manufacturer} ${m.name}</div>
        <div class="ref-controls">
          <a class="lancer-context-menu" data-path="${e}"">
            <i class="fas fa-ellipsis-v i--light"></i>
          </a>
        </div>
      </div>
    </li>`;
	} else return "";
}
function npcClassRefView(e, t) {
	if (e) {
		let m = e.img ?? "systems/lancer/assets/icons/npc_class.svg";
		return `
    <div class="card clipped ref set click-open" ${ref_params(e)}>
      <div class="compact-class medium flexrow">
        <span class="img-bar" style="background-image: url(${m})"></span>
        <div class="major modifier-name i--light">${e.name} // ${e.system.role?.toUpperCase()}</div>
        <div class="ref-controls">
          <a class="lancer-context-menu" data-path="${t}"">
            <i class="fas fa-ellipsis-v i--light"></i>
          </a>
        </div>
      </div>
    </div>`;
	} else return "";
}
function npcTemplateRefView(e, t) {
	return e ? `
    <div class="card clipped ref set click-open" ${ref_params(e)}>
      <div class="compact-template medium flexrow">
        <span class="img-bar" style="background-image: url(${e.img})"></span>
        <div class="major modifier-name i--light">${e.name}</div>
        <div class="ref-controls">
          <a class="lancer-context-menu" data-path="${t}"">
            <i class="fas fa-ellipsis-v i--light"></i>
          </a>
        </div>
      </div>
    </div>` : "";
}
function actionTypeIcon(e) {
	let t = e ? e.toLowerCase() : se.None.toLowerCase(), m = "";
	switch (t) {
		case se.Full.toLowerCase():
			m += "<i class=\"cci cci-activation-full i--4\"></i>";
			break;
		case se.Quick.toLowerCase():
			m += "<i class=\"cci cci-activation-quick i--4\"></i>";
			break;
		case se.Reaction.toLowerCase():
			m += "<i class=\"cci cci-reaction i--4\"></i>";
			break;
		case se.Protocol.toLowerCase():
			m += "<i class=\"cci cci-protocol i--4\"></i>";
			break;
		case se.Free.toLowerCase():
			m += "<i class=\"cci cci-free-action i--4\"></i>";
			break;
		case se.FullTech.toLowerCase():
			m += "<i class=\"cci cci-tech-full i--4\"></i>";
			break;
		case se.QuickTech.toLowerCase():
		case se.Invade.toLowerCase():
			m += "<i class=\"cci cci-tech-quick i--4\"></i>";
			break;
	}
	return m;
}
function buildActionHTML(e, t, m) {
	let v = resolveDotpath(e, t);
	if (!v) return "";
	let y, x, S, C;
	m?.hideChip ? x = "" : (x = buildChipHTML(v.activation, {
		uuid: e.uuid,
		path: t
	}, { nonInteractive: m?.nonInteractive }), x = `<div class="action-flow-container">${x}<span class="vsep"></span></div>`);
	let w = m?.editable ? `<a class="fas fa-edit popout-text-edit-button" data-path="${t}.detail"></a>` : "";
	return y = v.trigger ? `
      <div class="action-detail ${m?.full ? "" : "collapsed"}">
        <hr class="hsep">
        <div>
          ${x}
          <div>
            <div class="overline">${game.i18n.localize("lancer.chat-card.label.trigger")}</div>
            ${v.trigger || "// MISSING ENTRY //"}
            <div class="overline">${game.i18n.localize("lancer.chat-card.label.effect")} ${w}</div>
            ${v.detail || "// MISSING ENTRY //"}
          </div>
        </div>
      </div>` : `
      <div class="action-detail">
        <hr class="hsep">
        ${x}
        ${w}
        ${v.detail || "// MISSING ENTRY //"}
      </div>`, m?.editable && (C = `
    <div class="action-editor-wrapper">
      <a class="gen-control" data-uuid="${e.uuid}" data-action="splice" data-path="${t}"><i class="fas fa-trash"></i></a>
      <a class="action-editor fas fa-edit" data-path="${t}"></a>
    </div>`), m?.tags && e instanceof Dt && e.getTags() && (S = compactTagListHBS("tags", spoofHelper({ tags: e.getTags() }))), `
  <div class="action-wrapper">
    <div class="title-wrapper flexrow">
      ${actionTypeIcon(v.activation)}
      <span class="action-title collapse-trigger">
        ${v.name?.toUpperCase() ?? e.name}
      </span>
      ${C ?? ""}
    </div>
    ${y ?? ""}
    ${S ?? ""}
  </div>
  `;
}
function buildActionArrayHTML(e, t, m) {
	return resolveDotpath(e, t, []).map((v, y) => buildActionHTML(e, `${t}.${y}`, m)).join("");
}
function buildDeployablesArrayHBS(e, t, m, v) {
	let y = resolveDotpath(e, t, []), x = {};
	return y.forEach((e) => {
		let t = resolveHelperDotpath(m, `deployables.${e}`);
		t && (x[e] = t);
	}), buildDeployablesArray(e, x, v);
}
function buildDeployablesArray(e, t, m) {
	let v = [];
	for (let [y, x] of Object.entries(t)) x ? v.push(buildDeployableHTML(x, {
		item: e,
		path: `deployables.${y}`
	}, m)) : v.push(`<span>Unresolved deployabled LID "${y}". Re-import + Set yourself as its owner</span>`);
	return v.join("");
}
function buildDeployableHTML(e, t, m) {
	let v, y = [], x;
	return v = `
    <div class="deployable-detail">
      ${e.system.detail}
    </div>`, [
		{
			label: "ACTIVATE",
			action: e.system.activation
		},
		{
			label: "DEACTIVATE",
			action: e.system.deactivation
		},
		{
			label: "RECALL",
			action: e.system.recall
		},
		{
			label: "REDEPLOY",
			action: e.system.redeploy
		}
	].filter((e) => !!e.action).forEach((e) => {
		y.push(buildChipHTML(e.action, {
			label: e.label,
			uuid: t ? t.item.uuid : void 0
		}, m));
	}), e.system.actions.length && (x = "<hr class=\"hsep\">", e.system.actions.forEach((t, v) => {
		x += buildActionHTML(e, `system.actions.${v}`, {
			full: !0,
			nonInteractive: m?.nonInteractive
		});
	})), `
  <div class="deployable-wrapper ref set ${m?.vertical ? "vertical" : ""}" ${ref_params(e)}>
    <img class="deployable-thumbnail" src="${e.img}">
    <div style="grid-area: title" class="title-wrapper">
      <span class="deployable-title click-open">
        ${e.name ? e.name.toUpperCase() : ""}
      </span>
      <hr class="hsep">
    </div>
    <div class="deployable-activations">
      <div class="flexcol">
        <div class="flexrow">
          ${y.join("</div>\n<div class=\"flexrow\">")}
        </div>
      </div>
      ${m?.vertical ? "" : "<span class=\"vsep\"></span>"}
    </div>
    <div style="grid-area: desc">${v || ""}</div>
    ${x ? `
          <div style="grid-area: action">${x}</div>
          <div style="grid-area: action-chip">${[].join("\n")}</div>
          ` : ""}
  </div>
  `;
}
function buildChipHTML(e, t, m) {
	let v = `activation-${slugify(e, "-")}`, y = activationStyle(e), x = m?.nonInteractive ? "noninteractive" : "", S = `${t?.label ? `${t.label.toUpperCase()} - ` : `${m?.nonInteractive ? "" : "USE "}`}${e.toUpperCase()}`;
	return t && t.uuid && t.path !== void 0 ? (t.icon ||= `<i class="${activationIcon(e)} i--3"></i>`, `
    <a
      class="activation-flow lancer-button activation-chip ${v} ${y} ${x}"
      ${`data-uuid=${t.uuid} data-path="${t.path}"`}
    >
      ${t.icon ? t.icon : ""}
      ${S}
    </a>`) : `
    <div class="activation-chip ${v} lancer-chip ${y}">
      ${t?.icon ? t.icon : ""}
      ${S}
    </div>`;
}
function buildCounterHTML(e, t, m) {
	let v = [...Array(e.max)].map((m, v) => {
		let y = v + 1 <= e.value;
		return `<i class="counter-hex mdi ${y ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} theme--light" data-available="${y}" data-path="${t}"></i>`;
	});
	return `
  <div class="card clipped-bot counter-wrapper" data-path="${t}">
    ${buildCounterHeader(e, t, m)}
    <div class="flexrow flex-center no-wrap">
      <button class="clicker-minus-button hex" type="button">‒</button>
      ${v.join("")}
      <button class="clicker-plus-button hex" type="button">+</button>
    </div>
  </div>`;
}
function buildCounterHeader(e, t, m) {
	let v = m?.noContextMenu ? "" : `<a class="lancer-context-menu" data-path="${t}" data-can-delete="${m?.canDelete ? m.canDelete : !1}">
        <i class="fas fa-ellipsis-v"></i>
      </a>`;
	return `
    <div class="lancer-header lancer-primary">
      <span>// ${e.name} //</span>
      ${v}
    </div>`;
}
function buildCounterArrayHTML(e, t, m) {
	let v = "", y;
	function isCounters(e) {
		return !("counter" in e[0]);
	}
	if (e.length > 0) if (isCounters(e)) for (let m = 0; m < e.length; m++) v = v.concat(buildCounterHTML(e[m], t.concat(`.${m}`)));
	else {
		y = e.map((e) => e.counter);
		for (let m = 0; m < e.length; m++) v = v.concat(buildCounterHTML(y[m], t.concat(`.${m}.counter`)));
	}
	return `
  <div class="card clipped double">
    <div class="lancer-header lancer-primary submajor ">
      COUNTERS
      <a class="gen-control fas fa-plus" data-action="append" data-path="${t}"
       data-action-value="(struct)counter"></a>
    </div>
    ${v}
  </div>`;
}
function genericCounter(e, t, m) {
	return buildCounterHTML({
		name: e,
		min: t.min,
		max: t.max,
		value: t.value,
		default_value: t.min,
		lid: ""
	}, m, { noContextMenu: !0 });
}
async function _updateCounterData(e, t, m) {
	let v = drilldownDocument(e, t), y = v.terminus, x = y.min || 0, S = y.max || 6, C = y.value + m;
	C < x && (C = x), C > S && (C = S), v.sub_doc.update({ [v.sub_path + ".value"]: C });
}
function handleInputPlusMinusButtons(e, t) {
	let mod_handler = (e) => async (m) => {
		m.stopPropagation();
		let v = $(m.currentTarget).siblings("input")[0], y = v.name;
		if (y) {
			let m = drilldownDocument(t, y);
			m.sub_doc.update({ [m.sub_path]: v.valueAsNumber + e });
		}
	};
	e.find("button[class*=\"clicker-minus-button\"].input-update").on("click", mod_handler(-1)), e.find("button[class*=\"clicker-plus-button\"].input-update").on("click", mod_handler(1));
}
function handleCounterInteraction(e, t) {
	e.find(".counter-hex").on("click", async (e) => {
		e.stopPropagation();
		let m = e.currentTarget, v = m.dataset.path, y = m.dataset.available === "true";
		v && _updateCounterData(t, v, y ? -1 : 1);
	});
	let mod_handler = (e) => async (m) => {
		m.stopPropagation();
		let v = $(m.currentTarget).siblings(".counter-hex")[0].dataset.path;
		v && _updateCounterData(t, v, e);
	};
	e.find("button[class*=\"clicker-minus-button\"].hex").on("click", mod_handler(-1)), e.find("button[class*=\"clicker-plus-button\"].hex").on("click", mod_handler(1));
}
function handlePowerUsesInteraction(e, t) {
	e.find(".power-uses-hex").on("click", async (e) => {
		e.stopPropagation();
		let m = e.currentTarget.dataset;
		if (m.path) {
			let e = m.path.split("."), v = parseInt(e[e.length - 1]), y = drilldownDocument(t, m.path).sub_doc, x = y.system.powers[v], S = m.available === "true";
			if (!y || !x || !x.uses) return;
			let C = x.uses.value;
			C = S ? Math.max(C - 1, x.uses.min) : Math.min(C + 1, x.uses.max), y.update({ [`system.powers.${v}.uses.value`]: C });
		}
	});
}
function handleContextMenus(e, t, m = !1) {
	_handleContextMenus(e, ".lancer-context-menu", "click", t, m), _handleContextMenus(e, ".weapon-profile-tab", "contextmenu", t, m), _handleContextMenus(e, ".tag-list-append > .editable-tag-instance.compact-tag", "contextmenu", t, m);
}
function _handleContextMenus(e, t, m, v, y) {
	let path = (e) => e[0].dataset.path || null, dd = (e) => path(e) ? drilldownDocument(v, path(e)) : null, x = [
		{
			name: y ? "View" : "Edit",
			icon: y ? "<i class=\"fas fa-eye\"></i>" : "<i class=\"fas fa-edit\"></i>",
			callback: (e) => {
				let t = e.closest(".set")[0].dataset.uuid, m = t ? fromUuidSync(t) : dd(e)?.terminus;
				if (m) {
					let e = m.sheet;
					e?.rendered ? e.maximize().then(() => e.bringToTop()) : e?.render(!0);
				}
			},
			condition: (e) => dd(e)?.terminus instanceof foundry.abstract.Document
		},
		{
			name: y ? "View" : "Edit",
			icon: y ? "<i class=\"fas fa-eye\"></i>" : "<i class=\"fas fa-edit\"></i>",
			callback: (e) => {
				let t = e[0].dataset.uuid;
				if (!t) return;
				let m = fromUuidSync(t);
				if (m) {
					let e = m.sheet;
					e?.rendered ? e.maximize().then(() => e.bringToTop()) : e?.render(!0);
				}
			},
			condition: (e) => {
				let t = e[0].dataset.uuid;
				return t ? fromUuidSync(t) instanceof Dt : !1;
			}
		},
		{
			name: y ? "View" : "Edit",
			icon: y ? "<i class=\"fas fa-eye\"></i>" : "<i class=\"fas fa-edit\"></i>",
			callback: (e) => {
				let t = [...v.allApplicableEffects()], m = parseInt(e[0].dataset.activeEffectIndex ?? "-1");
				if (t[m]) {
					let e = t[m].sheet;
					e?.rendered ? e.maximize().then(() => e.bringToTop()) : e?.render(!0);
				}
			},
			condition: (e) => e[0].dataset.activeEffectIndex != null
		},
		{
			name: "Edit",
			icon: "<i class=\"fas fa-edit\"></i>",
			callback: (e) => {
				CounterEditForm.edit(v, path(e));
			},
			condition: (e) => !y && (!!path(e)?.includes("counters") || !!path(e)?.includes("burdens") || !!path(e)?.includes("clocks"))
		},
		{
			name: "Edit",
			icon: "<i class=\"fas fa-edit\"></i>",
			callback: (e) => {
				TagEditForm.edit(v, path(e));
			},
			condition: (e) => {
				let t = path(e);
				return !y && !t?.includes("system.loadout") && !t?.includes("itemTypes") && !t?.includes("system.base_features") && !t?.includes("system.optional_features") && !!t?.includes("tags");
			}
		},
		{
			name: "Mark Repaired",
			icon: "<i class=\"fas fa-fw fa-wrench\"></i>",
			callback: (e) => {
				let t = e.closest(".set")[0].dataset.uuid, m = t ? fromUuidSync(t) : dd(e)?.terminus;
				m?.update({ "system.destroyed": !m.system.destroyed });
			},
			condition: (e) => {
				let t = e.closest(".set")[0];
				if (!t) return !1;
				let m = t.dataset.uuid, v = null;
				try {
					v = m ? fromUuidSync(m) : dd(e)?.terminus;
				} catch {}
				return !y && v instanceof Dt && (v.is_mech_system() || v.is_mech_weapon() || v.is_npc_feature()) && v.system.destroyed;
			}
		},
		{
			name: "Mark Destroyed",
			icon: "<i class=\"cci cci-eclipse\"></i>",
			callback: (e) => {
				let t = e.closest(".set")[0].dataset.uuid, m = t ? fromUuidSync(t) : dd(e)?.terminus;
				m?.update({ "system.destroyed": !m.system.destroyed });
			},
			condition: (e) => {
				let t = e.closest(".set")[0];
				if (!t) return !1;
				let m = t.dataset.uuid, v = null;
				try {
					v = m ? fromUuidSync(m) : dd(e)?.terminus;
				} catch {}
				return !y && v instanceof Dt && (v.is_mech_system() || v.is_mech_weapon() || v.is_npc_feature()) && !v.system.destroyed;
			}
		},
		{
			name: "Rename",
			icon: "<i class=\"fas fa-fw fa-edit\"></i>",
			callback: async (e) => {
				let t = path(e) + e[0].dataset.renameSubpath, m = drilldownDocument(v, t).terminus, y = await promptText("Rename profile", m);
				y && v.update({ [t]: y });
			},
			condition: (e) => !!(!y && e[0].dataset.renameSubpath && dd(e)?.terminus)
		},
		{
			name: "Remove",
			icon: "<i class=\"fas fa-fw fa-trash\"></i>",
			callback: (e) => {
				let t = dd(e);
				if (t) {
					let e = array_path_edit_changes(t.sub_doc, t.sub_path, null, "delete");
					t.sub_doc.update({ [e.path]: e.new_val });
				}
			},
			condition: (e) => {
				let t = path(e);
				return !!(!y && (!t?.includes("system.loadout") && !t?.includes("itemTypes") && !t?.includes("system.base_features") && !t?.includes("system.optional_features") && t?.includes("tags") || t?.includes("counters") || t?.includes("bond_state.burdens") || t?.includes("bond_state.clocks") || t?.substring(0, t.length - 2).endsWith("profiles")));
			}
		},
		{
			name: "Delete Document",
			icon: "<i class=\"fas fa-fw fa-trash\"></i>",
			callback: async (e) => {
				let t = e.closest(".set")[0].dataset.uuid, m = null;
				try {
					m = t ? fromUuidSync(t) : dd(e)?.terminus;
				} catch {}
				m instanceof Dt && v instanceof Un && v.removeClassFeatures(m), m?.delete();
			},
			condition: (e) => !y && dd(e)?.terminus instanceof foundry.abstract.Document
		},
		{
			name: "Unlink",
			icon: "<i class=\"fas fa-times\"></i>",
			callback: async (e) => {
				v.update({ [path(e)]: null });
			},
			condition: (e) => {
				if (y) return !1;
				let t = path(e);
				return !!((t?.startsWith("system.base_features") || t?.startsWith("system.optional_features")) && !t?.includes("system.tags"));
			}
		}
	];
	tippyContextMenu(e.find(t), m, x);
}
//#endregion
//#region src/module/flows/activation.ts
ve.log_prefix;
function registerActivationSteps(e) {
	e.set("initActivationData", initActivationData), e.set("printActionUseCard", printActionUseCard);
}
var ActivationFlow = class extends ft {
	static {
		this.steps = [
			"initActivationData",
			"checkItemDestroyed",
			"checkItemLimited",
			"checkItemCharged",
			"applySelfHeat",
			"updateItemAfterAction",
			"printActionUseCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "action",
			title: t?.title || "",
			roll_str: t?.roll_str || "",
			acc: t?.acc || 0,
			action_path: t?.action_path || "",
			action: t?.action || null,
			self_heat: t?.self_heat || void 0,
			detail: t?.detail || "",
			tags: t?.tags || []
		};
		super(e, m);
	}
};
async function initActivationData(e, t) {
	if (!e.data) throw TypeError("Activation flow state missing!");
	if (e.item) {
		if (e.data.action_path = t?.action_path || e.data.action_path || "system.actions.0", !e.data.action) {
			if (e.data.action = resolveDotpath(e.item, e.data.action_path), !e.data.action) throw Error(`Failed to resolve action ${e.data.action_path}`);
			e.data.title = e.data.action?.name;
		}
		e.data.title = t?.title || e.data.title || e.data.action?.name || e.item.name || "UNKNOWN ACTION";
		let m = e.data.detail || "";
		!m && e.data.action && (e.data.action.init && (m += `<p><b>INIT</b></p><p>${e.data.action.init}</p>`), e.data.action.trigger && (m += `<p><b>TRIGGER</b></p><p>${e.data.action.trigger}</p>`), m ? m += `<p><b>EFFECT</b></p><p>${e.data.action.detail}</p>` : m += e.data.action.detail || ""), e.data.detail = m, e.data.tags = e.item.getTags() ?? [];
		let v = e.data.tags.filter((e) => e.is_selfheat);
		return v && v.length && (e.data.self_heat = v[0].val), e.data.action.tech_attack || e.data.action.activation == se.Invade ? (new TechAttackFlow(e.item, {
			title: e.data.title,
			invade: e.data.action.activation == se.Invade,
			attack_type: ue.Tech,
			action: e.data.action,
			effect: e.data.action.detail,
			tags: e.item.is_mech_system() || e.item.is_mech_system() || e.item.is_npc_feature() ? e.item.system.tags : []
		}).begin(), !1) : !0;
	} else return !1;
}
async function printActionUseCard(e, t) {
	if (!e.data) throw TypeError("Activation flow state missing!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/activation-card.hbs`, v = { actionData: {
		actor: e.actor.id,
		system: e.item?.id || void 0,
		action: e.data.action
	} }, y = {
		title: e.data.title,
		action_chip: e.data.action ? buildChipHTML(e.data.action.activation, {}) : "",
		description: e.data.detail,
		roll: e.data.self_heat_result?.roll,
		roll_tt: e.data.self_heat_result?.tt,
		roll_icon: "cci cci-heat i--4 damage--heat",
		tags: e.data.tags
	};
	return await renderTemplateStep(e.actor, m, y, v), !0;
}
//#endregion
//#region src/module/flows/frame.ts
var yt = ve.log_prefix;
function registerCoreActiveSteps(e) {
	e.set("checkCorePower", checkCorePower), e.set("consumeCorePower", consumeCorePower);
}
var CoreActiveFlow = class extends ActivationFlow {
	static {
		this.steps = [
			"initActivationData",
			"checkItemDestroyed",
			"checkItemLimited",
			"checkItemCharged",
			"checkCorePower",
			"applySelfHeat",
			"updateItemAfterAction",
			"consumeCorePower",
			"printActionUseCard"
		];
	}
	constructor(e, t) {
		super(e, t);
	}
};
async function checkCorePower(e) {
	if (!e.actor || !e.actor.is_mech()) throw TypeError("Cannot consume core power on a non-mech!");
	return e.actor.system.core_energy == 0 ? (ui.notifications.warn("No core power remaining on this frame!"), !1) : !0;
}
async function consumeCorePower(e) {
	if (!e.actor || !e.actor.is_mech()) throw TypeError("Cannot consume core power on a non-mech!");
	e.actor.update({ "system.core_energy": 0 }), console.log(`${yt} Automatically consumed core power for ${e.actor.system.lid}`);
}
//#endregion
//#region src/module/flows/stat.ts
ve.log_prefix;
function registerStatSteps(e) {
	e.set("initStatRollData", initStatRollData), e.set("showStatRollHUD", showStatRollHUD), e.set("rollCheck", rollCheck), e.set("printStatRollCard", printStatRollCard);
}
var StatRollFlow = class extends ft {
	static {
		this.steps = [
			"initStatRollData",
			"showStatRollHUD",
			"rollCheck",
			"printStatRollCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "stat",
			title: t?.title ?? "",
			path: t?.path ?? "system.hull",
			bonus: t?.bonus ?? 0,
			acc_diff: t?.acc_diff ?? void 0,
			roll_str: t?.roll_str ?? "1d20",
			effect: t?.effect ?? void 0
		};
		!m.title && e instanceof Dt && (m.title = e.name), super(e, m);
	}
};
async function initStatRollData(e, t) {
	if (!e.data) throw TypeError("Stat roll flow state missing!");
	if (e.item) {
		if (!e.item.is_skill()) throw TypeError("Invalid item for stat roll flow!");
		if (!e.actor.is_pilot()) throw TypeError("Non-pilots can't roll skill triggers!");
		return e.data.title = t?.title || e.data.title || e.item.name, e.data.path = "system.curr_rank", e.data.bonus = e.item.system.curr_rank * 2, e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.actor, void 0, e.data.title), !0;
	} else {
		let m = e.data.path.split(".");
		return e.data.title = t?.title || e.data.title || m[m.length - 1].toUpperCase(), e.data.bonus = resolveDotpath(e.actor, e.data.path), e.data.acc_diff = t?.acc_diff ? at.fromObject(t.acc_diff) : at.fromParams(e.actor, void 0, e.data.title), e.data.effect = void 0, !0;
	}
}
async function showStatRollHUD(e) {
	if (!e.data) throw TypeError("Stat roll flow state missing!");
	try {
		e.data.acc_diff = await E("hase", e.data.acc_diff);
	} catch {
		return !1;
	}
	let t = e.data.acc_diff.base.total == 0 ? "" : ` + ${e.data.acc_diff.base.total}d6kh1`;
	return e.data.roll_str = `1d20+${e.data.bonus || 0}${t}`, !0;
}
async function rollCheck(e) {
	if (!e.data) throw TypeError("Stat roll flow state missing!");
	if (!e.data.acc_diff) throw TypeError("Stat roll acc/diff data missing!");
	let t = await new Roll(e.data.roll_str).evaluate();
	return e.data.result = {
		roll: t,
		tt: await t.getTooltip()
	}, !0;
}
async function printStatRollCard(e) {
	if (!e.data) throw TypeError("Stat roll flow state missing!");
	let t = `systems/${game.system.id}/templates/chat/stat-roll-card.hbs`;
	return await renderTemplateStep(e.actor, t, e.data), !0;
}
//#endregion
//#region src/module/flows/system.ts
ve.log_prefix;
function registerSystemSteps(e) {
	e.set("initSystemUseData", initSystemUseData), e.set("printSystemCard", printSystemCard);
}
var SystemFlow = class extends ft {
	static {
		this.steps = [
			"initSystemUseData",
			"checkItemDestroyed",
			"checkItemLimited",
			"checkItemCharged",
			"applySelfHeat",
			"updateItemAfterAction",
			"printSystemCard"
		];
	}
	constructor(e, t) {
		let m = {
			title: t?.title || "",
			type: t?.type || null,
			effect: t?.effect || "",
			tags: t?.tags || void 0
		};
		super(e, m);
	}
};
async function initSystemUseData(e) {
	if (!e.data) throw TypeError("Flow state missing!");
	if (!e.item || !e.item.is_mech_system() && !e.item.is_weapon_mod() && !e.item.is_npc_feature()) throw TypeError("Only mech systems, mods, and NPC features can do system flows!");
	e.data.title = e.data.title || e.item.name, e.data.type || (e.item.is_mech_system() ? e.data.type = oe.System : e.item.is_weapon_mod() ? e.data.type = oe.Mod : e.data.type = e.item.system.type), !e.data.effect && e.item.is_npc_feature() ? e.item.system.type === re.Reaction ? e.data.effect = `<p><b>TRIGGER</b></p><p>${e.item.system.trigger}</p><p><b>EFFECT</b></p><p>${e.item.system.effect}</p>` : e.data.effect = e.item.system.effect : e.data.effect = e.data.effect || e.item.system.effect, e.data.tags = e.data.tags || e.item.system.tags;
	let t = e.item.system.tags.find((e) => e.is_selfheat);
	return t && (e.data.self_heat = t.val || "1"), !0;
}
async function printSystemCard(e, t) {
	if (!e.data) throw TypeError("Flow state missing!");
	if (!e.item || !e.item.is_mech_system() && !e.item.is_weapon_mod() && !e.item.is_npc_feature()) throw TypeError("Only mech systems, mods, and NPC features can do system flows!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/system-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data, {}), !0;
}
//#endregion
//#region src/module/flows/damage.ts
function registerDamageSteps(e) {
	e.set("initDamageData", initDamageData), e.set("setDamageTags", setDamageTags), e.set("setDamageTargets", setDamageTargets), e.set("showDamageHUD", showDamageHUD), e.set("rollReliable", rollReliable), e.set("rollNormalDamage", rollNormalDamage), e.set("rollCritDamage", rollCritDamage), e.set("applyOverkillHeat", applyOverkillHeat), e.set("printDamageCard", printDamageCard);
}
var DamageRollFlow = class extends ft {
	static {
		this.steps = [
			"initDamageData",
			"setDamageTags",
			"setDamageTargets",
			"showDamageHUD",
			"rollReliable",
			"rollNormalDamage",
			"rollCritDamage",
			"applyOverkillHeat",
			"printDamageCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "damage",
			title: t?.title || "Damage Roll",
			configurable: t?.configurable === void 0 ? !0 : t.configurable,
			add_burn: t?.add_burn === void 0 ? !0 : t.add_burn,
			invade: t?.invade || !1,
			tags: t?.tags || [],
			ap: t?.ap || !1,
			paracausal: t?.paracausal || !1,
			half_damage: t?.half_damage || !1,
			overkill: t?.overkill || !1,
			reliable: t?.reliable || !1,
			hit_results: t?.hit_results || [],
			has_normal_hit: t?.has_normal_hit || !1,
			has_crit_hit: t?.has_crit_hit || !1,
			damage: t?.damage || [],
			bonus_damage: t?.bonus_damage || [],
			damage_results: [],
			crit_damage_results: [],
			damage_total: 0,
			crit_total: 0,
			targets: []
		};
		super(e, m);
	}
};
async function initDamageData(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	return e.data.hit_results = e.data.hit_results.map((e) => {
		let t = e.target;
		if (t instanceof LancerTokenDocument) {
			let e = t.actor?.getActiveTokens() || [];
			if (!e.length) return null;
			t = e[0];
		} else if (!(t instanceof LancerToken)) return null;
		return {
			...e,
			target: t
		};
	}).filter((e) => e !== null), e.data.has_normal_hit = e.data.hit_results.length === 0 || e.data.hit_results.some((e) => e.hit && !e.crit), e.data.has_crit_hit = e.data.hit_results.length > 0 && e.data.hit_results.some((e) => e.crit), !0;
}
async function setDamageTags(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	if (!e.item) return !0;
	if (e.item.is_mech_weapon()) {
		let t = e.item.system.active_profile;
		e.data.tags = t.all_tags;
	} else if (e.item.is_mech_system()) e.data.tags = e.item.system.tags;
	else if (e.item.is_frame()) e.data.tags = e.item.system.core_system.tags;
	else if (e.item.is_talent()) e.data.tags = [];
	else if (e.item.is_npc_feature() && e.item.system.type === "Weapon") e.data.tags = e.item.system.tags;
	else if (e.item.is_pilot_weapon()) e.data.tags = e.item.system.tags;
	else return ui.notifications.warn(`Item ${e.item.id} can't deal damage!`), !1;
	e.data.ap = !!e.data.tags.find((e) => e.is_ap), e.data.overkill = !!e.data.tags.find((e) => e.is_overkill);
	let t = e.data.tags.find((e) => e.is_reliable);
	if (t) {
		e.data.reliable = !0;
		let m = parseInt(t.tierVal(e.actor.is_npc() && e.actor.system.tier || 1) || "0");
		e.data.reliable_val = m;
	}
	return !0;
}
async function setDamageTargets(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	for (let t of e.data.hit_results) t.target instanceof LancerToken && t.target.setTarget(!0, { releaseOthers: !1 });
	return !0;
}
async function showDamageHUD(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	try {
		e.data.damage_hud_data = ut.fromParams(e.item ?? e.actor, {
			tags: e.data.tags,
			title: e.data.title,
			targets: Array.from(game.user.targets),
			hitResults: e.data.hit_results,
			ap: e.data.ap,
			paracausal: e.data.paracausal,
			halfDamage: e.data.half_damage,
			starting: {
				damage: e.data.damage,
				bonusDamage: e.data.bonus_damage
			}
		}), e.data.damage_hud_data = await E("damage", e.data.damage_hud_data), e.data.hit_results = e.data.hit_results.filter((t) => e.data?.damage_hud_data?.targets.some((e) => t.target.document.uuid === e.targetUuid)).map((t) => {
			let m = e.data?.damage_hud_data?.targets.find((e) => t.target.document.uuid === e.targetUuid);
			return {
				...t,
				hit: m.quality === ct.Hit,
				crit: m.quality === ct.Crit
			};
		});
		for (let t of e.data.damage_hud_data.targets) {
			if (e.data.hit_results.some((e) => e.target.document.uuid === t.targetUuid)) continue;
			let m = tokenDocFromUuidSync(t.targetUuid);
			!m || !m.object || e.data.hit_results.push({
				target: m.object,
				total: "10",
				hit: t.quality === ct.Hit,
				crit: t.quality === ct.Crit,
				usedLockOn: !1
			});
		}
		e.data.has_normal_hit = e.data.hit_results.length === 0 || e.data.hit_results.some((e) => e.hit && !e.crit), e.data.has_crit_hit = e.data.hit_results.some((e) => e.crit), e.data.ap = e.data.damage_hud_data.base.ap, e.data.paracausal = e.data.damage_hud_data.base.paracausal, e.data.half_damage = e.data.damage_hud_data.base.halfDamage, e.data.overkill = e.data.damage_hud_data.weapon?.overkill ?? !1, e.data.reliable = e.data.damage_hud_data.weapon?.reliable ?? !1, e.data.reliable && (e.data.reliable_val = e.data.damage_hud_data.weapon?.reliableValue ?? 0);
	} catch (e) {
		return e && console.warn(e), !1;
	}
	return !0;
}
async function _rollDamage(e, t, m, v) {
	if (!e.val || e.val == "0") return null;
	let y = new Roll(e.val);
	return m && y.terms.forEach((e) => {
		e instanceof foundry.dice.terms.Die && (e.modifiers = ["x1", `kh${e.number}`].concat(e.modifiers));
	}), await y.evaluate(), y.dice.forEach((e) => e.options.rollOrder = 2), {
		roll: y,
		tt: await y.getTooltip(),
		d_type: e.type,
		bonus: t,
		target: v
	};
}
function _collectBonusDamage(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	if (!e.data.damage_hud_data) throw TypeError("Damage configuration missing!");
	let t = foundry.utils.duplicate(e.data.bonus_damage);
	for (let m of e.data.damage_hud_data.targets) {
		let e = tokenDocFromUuidSync(m.targetUuid), v = m.bonusDamage.map((t) => ({
			...t,
			target: e?.object ?? void 0
		}));
		t.push(...v);
	}
	return t;
}
function _minReliable(e, t) {
	return e.reduce((e, t) => e + t.amount, 0) >= t.reduce((e, t) => e + t.amount, 0) ? e : t;
}
function _halveDamage(e) {
	return e.map((e) => ({
		type: e.type,
		amount: Math.ceil(e.amount / 2)
	}));
}
async function rollReliable(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	if (!e.data.damage_hud_data) throw TypeError("Damage configuration missing!");
	let t = e.data.damage_hud_data.base.total;
	e.data.damage = t.damage, e.data.bonus_damage = t.bonusDamage ?? [], e.data.reliable_val = e.data.damage_hud_data.weapon?.reliableValue ?? 0;
	let m = _collectBonusDamage(e);
	if (!e.data.damage.length && !m.length && !e.data.reliable_val) return ui.notifications?.warn("No damage configured, skipping the roll."), !1;
	if (e.data.reliable && e.data.reliable_val) {
		e.data.reliable_results = e.data.reliable_results || [];
		for (let t of e.data.damage ?? []) {
			if (!t.val || t.val == "0") continue;
			let m = await _rollDamage({
				type: t.type === le.Variable ? le.Kinetic : t.type,
				val: e.data.reliable_val.toString()
			}, !1, !1);
			if (m) {
				e.data.reliable_results.push(m), e.data.reliable_total = m.roll.total;
				break;
			}
		}
		for (let t of e.data.hit_results) if (!t.hit && !t.crit) {
			let m = e.data.damage_hud_data.targets.find((e) => e.targetUuid === t.target.document.uuid), v = m ? m.halfDamage : e.data.half_damage, y = e.data.reliable_results.map((e) => ({
				type: e.d_type,
				amount: e.roll.total || 0
			}));
			e.data.targets.push({
				target: t.target,
				damage: v ? _halveDamage(y) : y,
				hit: t.hit,
				crit: t.crit,
				ap: m ? m.ap : e.data.ap,
				paracausal: m ? m.paracausal : e.data.paracausal,
				half_damage: v
			});
		}
	}
	return !0;
}
async function rollNormalDamage(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	if (!e.data.damage_hud_data) throw TypeError("Damage configuration missing!");
	let t = e.data.damage_hud_data.targets.length > 1, m = _collectBonusDamage(e);
	if (e.data.has_normal_hit || e.data.has_crit_hit) {
		for (let t of e.data.damage ?? []) {
			let m = await _rollDamage(t, !1, e.data.overkill);
			m && e.data.damage_results.push(m);
		}
		for (let t of m ?? []) {
			let m = await _rollDamage(t, !0, e.data.overkill, t.target);
			m && (m.bonus = !0, t.target && (m.target = t.target), e.data.damage_results.push(m));
		}
		for (let m of e.data.hit_results) if (m.hit && !m.crit) {
			let v = [];
			for (let y of e.data.damage_results) y.target && y.target.document.uuid !== m.target.document.uuid || (t && y.bonus && !y.target ? v.push({
				type: y.d_type,
				amount: Math.ceil((y.roll.total || 0) / 2)
			}) : v.push({
				type: y.d_type,
				amount: y.roll.total || 0
			}));
			let y = e.data.damage_hud_data.targets.find((e) => e.targetUuid === m.target.document.uuid), x = y ? y.halfDamage : e.data.half_damage, S = _minReliable(v, e.data.reliable_results?.map((e) => ({
				type: e.d_type,
				amount: e.roll.total || 0
			})) || []);
			e.data.targets.push({
				target: m.target,
				damage: x ? _halveDamage(S) : S,
				hit: m.hit,
				crit: m.crit,
				ap: y ? y.ap : e.data.ap,
				paracausal: y ? y.paracausal : e.data.paracausal,
				half_damage: x
			});
		}
	}
	return !0;
}
async function rollCritDamage(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	if (!e.data.damage_hud_data) throw TypeError("Damage configuration missing!");
	let t = e.data.damage_hud_data.targets.length > 1;
	if (e.data.has_crit_hit) {
		if (e.actor.is_npc()) e.data.crit_damage_results = e.data.damage_results;
		else {
			let t = e.data?.hit_results, m = await Promise.all(e.data.damage_results.map(async (e) => {
				if (e.target && t && !t.find((t) => (e.target?.document?.uuid ?? null) === t.target?.document?.uuid)?.crit) return null;
				let m = await getCritRoll(e.roll);
				return m.dice.forEach((e) => e.options.rollOrder = 2), {
					roll: m,
					tt: await m.getTooltip(),
					d_type: e.d_type,
					bonus: e.bonus,
					target: e.target
				};
			}));
			e.data.crit_damage_results = m.filter((e) => e !== null);
		}
		for (let m of e.data.hit_results) {
			if (!m.crit) continue;
			let v = [];
			for (let y of e.data.crit_damage_results) y.target && y.target.document.uuid !== m.target.document.uuid || (t && y.bonus && !y.target ? v.push({
				type: y.d_type,
				amount: Math.ceil((y.roll.total || 0) / 2)
			}) : v.push({
				type: y.d_type,
				amount: y.roll.total || 0
			}));
			let y = e.data.damage_hud_data.targets.find((e) => e.targetUuid === m.target.document.uuid), x = y ? y.halfDamage : e.data.half_damage, S = _minReliable(v, e.data.reliable_results?.map((e) => ({
				type: e.d_type,
				amount: e.roll.total || 0
			})) || []);
			e.data.targets.push({
				target: m.target,
				damage: x ? _halveDamage(S) : S,
				hit: m.hit,
				crit: m.crit,
				ap: y ? y.ap : e.data.ap,
				paracausal: y ? y.paracausal : e.data.paracausal,
				half_damage: y ? y.halfDamage : e.data.half_damage
			});
		}
	}
	return e.data.damage_results = e.data.has_normal_hit ? e.data.damage_results : [], !0;
}
async function applyOverkillHeat(e) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	return e.data.overkill ? (e.data.overkill_heat = 0, (e.data.has_crit_hit ? e.data.crit_damage_results : e.data.damage_results).forEach((t) => {
		t.roll.terms.forEach((t) => {
			t instanceof foundry.dice.terms.DiceTerm && t.results.forEach((t) => {
				t.exploded && (e.data.overkill_heat += 1);
			});
		});
	}), (e.actor.is_mech() || e.actor.is_npc() || e.actor.is_deployable()) && e.actor.system.heat.max > 0 && await e.actor.update({ "system.heat.value": e.actor.system.heat.value + e.data.overkill_heat }), !0) : !0;
}
async function printDamageCard(e, t) {
	if (!e.data) throw TypeError("Damage flow state missing!");
	let m = t?.template || `systems/${game.system.id}/templates/chat/damage-card.hbs`, v = { damageData: {
		damageResults: e.data.damage_results.map((e) => ({
			...e,
			target: e.target?.document.uuid
		})),
		critDamageResults: e.data.crit_damage_results.map((e) => ({
			...e,
			target: e.target?.document.uuid
		})),
		targetDamageResults: e.data.targets.map((e) => ({
			...e,
			target: e.target.document.uuid
		})),
		ap: e.data.ap,
		paracausal: e.data.paracausal,
		half_damage: e.data.half_damage
	} };
	return await renderTemplateStep(e.actor, m, e.data, v), !0;
}
async function getCritRoll(e) {
	let t = new Roll(e.formula);
	await t.evaluate();
	let m = Array(e.terms.length), v = Array(e.terms.length).fill(0);
	e.terms.forEach((e, t) => {
		if (e instanceof foundry.dice.terms.Die) {
			let y = e;
			m[t] = y.results.map((e) => ({ ...e })), v[t] = parseInt(y.modifiers.find((e) => e.startsWith("kh"))?.substr(2) ?? "0") || y.number || 0;
		}
	}), t.terms.forEach((e, t) => {
		e instanceof foundry.dice.terms.Die && m[t].push(...e.results);
	});
	let y = Array(e.terms.length).fill([]);
	m.forEach((e, t) => {
		y[t] = e.filter((e) => e.active).sort((e, t) => e.result - t.result);
	}), y.forEach((e, t) => e.forEach((e, m) => {
		e.active = m >= v[t], e.discarded = m < v[t];
	}));
	let x = e.terms.map((e, t) => {
		if (e instanceof foundry.dice.terms.Die) {
			let v = e;
			return new foundry.dice.terms.Die({
				...e,
				modifiers: v.modifiers.filter((e) => e.startsWith("kh")).length ? v.modifiers : [...v.modifiers, `kh${v.number}`],
				results: m[t],
				number: (v.number || 0) * 2
			});
		} else if (e instanceof foundry.dice.terms.OperatorTerm) return e._evaluated = !0, e;
		else return e;
	});
	return Roll.fromTerms(x);
}
async function rollDamageCallback(e) {
	let t = e.currentTarget.closest(".chat-message.message");
	if (!t) {
		ui.notifications?.error("Damage roll button not in chat message");
		return;
	}
	let m = game.messages?.get(t.dataset.messageId), v = m?.flags.lancer?.attackData;
	if (!m || !v) {
		ui.notifications?.error("Damage roll button has no attack data available");
		return;
	}
	let y = await fromUuid(v.attackerUuid);
	if (!y) {
		ui.notifications?.error("Invalid attacker for damage roll");
		return;
	}
	if (!y.isOwner) {
		ui.notifications?.error(`You do not own ${y.name}, so you cannot roll damage for them`);
		return;
	}
	let x = await fromUuid(v.attackerItemUuid || "");
	if (x && x.parent !== y) {
		ui.notifications?.error(`Item ${x.uuid} is not owned by actor ${y.uuid}!`);
		return;
	}
	let S = [];
	for (let e of v.targets) {
		let t = tokenDocFromUuidSync(e.uuid);
		if (!t || !t.object) {
			ui.notifications?.error("Invalid target for damage roll");
			continue;
		}
		let m = !1;
		e.setConditions && (m = e.setConditions.lockOn === !1), S.push({
			target: t.object,
			total: e.total,
			usedLockOn: m,
			hit: e.hit,
			crit: e.crit
		});
	}
	let C = [];
	v.invade && C.push({
		type: le.Heat,
		val: "2"
	}), new DamageRollFlow(x ? x.uuid : v.attackerUuid, {
		title: `${x?.name || y.name} DAMAGE`,
		configurable: !0,
		invade: v.invade,
		hit_results: S,
		has_normal_hit: S.some((e) => e.hit && !e.crit),
		has_crit_hit: S.some((e) => e.crit),
		damage: C,
		bonus_damage: []
	}).begin();
}
async function applyDamage(e) {
	let t = e.currentTarget.closest(".chat-message.message");
	if (!t) {
		ui.notifications?.error("Damage application button not in chat message");
		return;
	}
	let m = game.messages?.get(t.dataset.messageId), v = m?.flags.lancer?.damageData;
	if (!m || !v) {
		ui.notifications?.error("Damage application button has no damage data available");
		return;
	}
	let y = v.targetDamageResults.map((e) => {
		let t = fromUuidSync(e.target);
		return !t || !(t instanceof LancerTokenDocument) ? null : {
			...e,
			target: t
		};
	}).filter((e) => e !== null), x = e.currentTarget.closest(".lancer-damage-button-group");
	if (!x) {
		ui.notifications?.error("No target for damage application");
		return;
	}
	let S = x.dataset;
	if (!S.target) {
		ui.notifications?.error("No target for damage application");
		return;
	}
	let C = 1, w = x.querySelector("select");
	w && (C = parseFloat(w.value), C = Number.isNaN(C) ? 1 : C);
	let E = S.addBurn === "true";
	S.crit, S.hit;
	let O = await fromUuid(S.target);
	if (!O || !(O instanceof LancerTokenDocument)) {
		ui.notifications?.error("Invalid target UUID for damage application");
		return;
	}
	let k = O.actor;
	if (!k || !(k instanceof Un)) {
		ui.notifications?.error("Invalid target for damage application, no actor found");
		return;
	}
	if (!k.isOwner) {
		ui.notifications?.error("You cannot apply damage to an actor you do not own");
		return;
	}
	let ee = y.find((e) => e?.target?.uuid === S.target);
	ee && await k.damageCalc(new AppliedDamage(ee.damage.map((e) => new jn({
		type: e.type,
		val: e.amount.toString()
	}))), {
		multiple: C,
		addBurn: E,
		ap: ee.ap,
		paracausal: ee.paracausal
	});
}
async function undoDamage(e) {
	let t = e.currentTarget.closest(".chat-message.message");
	if (!t) {
		ui.notifications?.error("Damage undo button not in chat message");
		return;
	}
	let m = game.messages?.get(t.dataset.messageId);
	if (!m) {
		ui.notifications?.error("Damage undo button has no chat message");
		return;
	}
	let v = await fromUuid(e.currentTarget.dataset?.uuid);
	if (!v || !(v instanceof Un)) {
		ui.notifications?.error("Damage undo button has no target");
		return;
	}
	if (!v.isOwner) {
		ui.notifications?.error("You cannot undo damage to an actor you do not own");
		return;
	}
	let y = parseInt(e.currentTarget.dataset.overshieldDelta), x = parseInt(e.currentTarget.dataset.hpDelta), S = e.currentTarget.dataset.addBurn === "true" ? parseInt(e.currentTarget.dataset.burnDelta) : 0, C = parseInt(e.currentTarget.dataset.heatDelta);
	if (!y && !x && !S && !C) {
		ui.notifications?.error("Damage undo button has no damage to undo!");
		return;
	}
	let w = { system: {
		"overshield.value": v.system.overshield.value + y,
		"hp.value": v.system.hp.value + x,
		burn: v.system.burn - S
	} };
	(v.is_mech() || v.is_npc() || v.is_deployable()) && (w.system["heat.value"] = v.system.heat.value - C);
	let E = new DOMParser().parseFromString(m.content, "text/html");
	E.querySelectorAll(".lancer-damage-undo").forEach((e) => e.remove()), E.querySelectorAll("span").forEach((e) => e.classList.add("strikethrough"));
	let O = E.body.innerHTML;
	await v.update(w), await m.update({ content: O });
}
//#endregion
//#region src/module/apps/lcp-manager/lcp-manager.ts
var bt = /* @__PURE__ */ m((/* @__PURE__ */ v(((t, m) => {
	(function(e) {
		typeof t == "object" && m !== void 0 ? m.exports = e() : typeof define == "function" && define.amd ? define([], e) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).JSZip = e();
	})(function() {
		return function s(t, m, v) {
			function u(x, S) {
				if (!m[x]) {
					if (!t[x]) {
						var C = typeof e == "function" && e;
						if (!S && C) return C(x, !0);
						if (y) return y(x, !0);
						var w = /* @__PURE__ */ Error("Cannot find module '" + x + "'");
						throw w.code = "MODULE_NOT_FOUND", w;
					}
					var E = m[x] = { exports: {} };
					t[x][0].call(E.exports, function(e) {
						var m = t[x][1][e];
						return u(m || e);
					}, E, E.exports, s, t, m, v);
				}
				return m[x].exports;
			}
			for (var y = typeof e == "function" && e, x = 0; x < v.length; x++) u(v[x]);
			return u;
		}({
			1: [function(e, t, m) {
				var v = e("./utils"), y = e("./support"), x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				m.encode = function(e) {
					for (var t, m, y, S, C, w, E, O = [], k = 0, ee = e.length, I = ee, te = v.getTypeOf(e) !== "string"; k < e.length;) I = ee - k, y = te ? (t = e[k++], m = k < ee ? e[k++] : 0, k < ee ? e[k++] : 0) : (t = e.charCodeAt(k++), m = k < ee ? e.charCodeAt(k++) : 0, k < ee ? e.charCodeAt(k++) : 0), S = t >> 2, C = (3 & t) << 4 | m >> 4, w = 1 < I ? (15 & m) << 2 | y >> 6 : 64, E = 2 < I ? 63 & y : 64, O.push(x.charAt(S) + x.charAt(C) + x.charAt(w) + x.charAt(E));
					return O.join("");
				}, m.decode = function(e) {
					var t, m, v, S, C, w, E = 0, O = 0, k = "data:";
					if (e.substr(0, k.length) === k) throw Error("Invalid base64 input, it looks like a data url.");
					var ee, I = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
					if (e.charAt(e.length - 1) === x.charAt(64) && I--, e.charAt(e.length - 2) === x.charAt(64) && I--, I % 1 != 0) throw Error("Invalid base64 input, bad content length.");
					for (ee = y.uint8array ? new Uint8Array(0 | I) : Array(0 | I); E < e.length;) t = x.indexOf(e.charAt(E++)) << 2 | (S = x.indexOf(e.charAt(E++))) >> 4, m = (15 & S) << 4 | (C = x.indexOf(e.charAt(E++))) >> 2, v = (3 & C) << 6 | (w = x.indexOf(e.charAt(E++))), ee[O++] = t, C !== 64 && (ee[O++] = m), w !== 64 && (ee[O++] = v);
					return ee;
				};
			}, {
				"./support": 30,
				"./utils": 32
			}],
			2: [function(e, t, m) {
				var v = e("./external"), y = e("./stream/DataWorker"), x = e("./stream/Crc32Probe"), S = e("./stream/DataLengthProbe");
				function o(e, t, m, v, y) {
					this.compressedSize = e, this.uncompressedSize = t, this.crc32 = m, this.compression = v, this.compressedContent = y;
				}
				o.prototype = {
					getContentWorker: function() {
						var e = new y(v.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new S("data_length")), t = this;
						return e.on("end", function() {
							if (this.streamInfo.data_length !== t.uncompressedSize) throw Error("Bug : uncompressed data size mismatch");
						}), e;
					},
					getCompressedWorker: function() {
						return new y(v.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
					}
				}, o.createWorkerFrom = function(e, t, m) {
					return e.pipe(new x()).pipe(new S("uncompressedSize")).pipe(t.compressWorker(m)).pipe(new S("compressedSize")).withStreamInfo("compression", t);
				}, t.exports = o;
			}, {
				"./external": 6,
				"./stream/Crc32Probe": 25,
				"./stream/DataLengthProbe": 26,
				"./stream/DataWorker": 27
			}],
			3: [function(e, t, m) {
				var v = e("./stream/GenericWorker");
				m.STORE = {
					magic: "\0\0",
					compressWorker: function() {
						return new v("STORE compression");
					},
					uncompressWorker: function() {
						return new v("STORE decompression");
					}
				}, m.DEFLATE = e("./flate");
			}, {
				"./flate": 7,
				"./stream/GenericWorker": 28
			}],
			4: [function(e, t, m) {
				var v = e("./utils"), y = function() {
					for (var e, t = [], m = 0; m < 256; m++) {
						e = m;
						for (var v = 0; v < 8; v++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[m] = e;
					}
					return t;
				}();
				t.exports = function(e, t) {
					return e !== void 0 && e.length ? v.getTypeOf(e) === "string" ? function(e, t, m, v) {
						var x = y, S = v + m;
						e ^= -1;
						for (var C = v; C < S; C++) e = e >>> 8 ^ x[255 & (e ^ t.charCodeAt(C))];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : function(e, t, m, v) {
						var x = y, S = v + m;
						e ^= -1;
						for (var C = v; C < S; C++) e = e >>> 8 ^ x[255 & (e ^ t[C])];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : 0;
				};
			}, { "./utils": 32 }],
			5: [function(e, t, m) {
				m.base64 = !1, m.binary = !1, m.dir = !1, m.createFolders = !0, m.date = null, m.compression = null, m.compressionOptions = null, m.comment = null, m.unixPermissions = null, m.dosPermissions = null;
			}, {}],
			6: [function(e, t, m) {
				var v = null;
				v = typeof Promise < "u" ? Promise : e("lie"), t.exports = { Promise: v };
			}, { lie: 37 }],
			7: [function(e, t, m) {
				var v = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", y = e("pako"), x = e("./utils"), S = e("./stream/GenericWorker"), C = v ? "uint8array" : "array";
				function h(e, t) {
					S.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
				}
				m.magic = "\b\0", x.inherits(h, S), h.prototype.processChunk = function(e) {
					this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(x.transformTo(C, e.data), !1);
				}, h.prototype.flush = function() {
					S.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
				}, h.prototype.cleanUp = function() {
					S.prototype.cleanUp.call(this), this._pako = null;
				}, h.prototype._createPako = function() {
					this._pako = new y[this._pakoAction]({
						raw: !0,
						level: this._pakoOptions.level || -1
					});
					var e = this;
					this._pako.onData = function(t) {
						e.push({
							data: t,
							meta: e.meta
						});
					};
				}, m.compressWorker = function(e) {
					return new h("Deflate", e);
				}, m.uncompressWorker = function() {
					return new h("Inflate", {});
				};
			}, {
				"./stream/GenericWorker": 28,
				"./utils": 32,
				pako: 38
			}],
			8: [function(e, t, m) {
				function A(e, t) {
					var m, v = "";
					for (m = 0; m < t; m++) v += String.fromCharCode(255 & e), e >>>= 8;
					return v;
				}
				function n(e, t, m, y, w, E) {
					var O, k, ee = e.file, I = e.compression, te = E !== x.utf8encode, z = v.transformTo("string", E(ee.name)), ne = v.transformTo("string", x.utf8encode(ee.name)), re = ee.comment, ie = v.transformTo("string", E(re)), B = v.transformTo("string", x.utf8encode(re)), q = ne.length !== ee.name.length, ae = B.length !== re.length, oe = "", Q = "", se = "", ce = ee.dir, le = ee.date, ue = {
						crc32: 0,
						compressedSize: 0,
						uncompressedSize: 0
					};
					t && !m || (ue.crc32 = e.crc32, ue.compressedSize = e.compressedSize, ue.uncompressedSize = e.uncompressedSize);
					var de = 0;
					t && (de |= 8), te || !q && !ae || (de |= 2048);
					var fe = 0, pe = 0;
					ce && (fe |= 16), w === "UNIX" ? (pe = 798, fe |= function(e, t) {
						var m = e;
						return e || (m = t ? 16893 : 33204), (65535 & m) << 16;
					}(ee.unixPermissions, ce)) : (pe = 20, fe |= function(e) {
						return 63 & (e || 0);
					}(ee.dosPermissions)), O = le.getUTCHours(), O <<= 6, O |= le.getUTCMinutes(), O <<= 5, O |= le.getUTCSeconds() / 2, k = le.getUTCFullYear() - 1980, k <<= 4, k |= le.getUTCMonth() + 1, k <<= 5, k |= le.getUTCDate(), q && (Q = A(1, 1) + A(S(z), 4) + ne, oe += "up" + A(Q.length, 2) + Q), ae && (se = A(1, 1) + A(S(ie), 4) + B, oe += "uc" + A(se.length, 2) + se);
					var me = "";
					return me += "\n\0", me += A(de, 2), me += I.magic, me += A(O, 2), me += A(k, 2), me += A(ue.crc32, 4), me += A(ue.compressedSize, 4), me += A(ue.uncompressedSize, 4), me += A(z.length, 2), me += A(oe.length, 2), {
						fileRecord: C.LOCAL_FILE_HEADER + me + z + oe,
						dirRecord: C.CENTRAL_FILE_HEADER + A(pe, 2) + me + A(ie.length, 2) + "\0\0\0\0" + A(fe, 4) + A(y, 4) + z + oe + ie
					};
				}
				var v = e("../utils"), y = e("../stream/GenericWorker"), x = e("../utf8"), S = e("../crc32"), C = e("../signature");
				function s(e, t, m, v) {
					y.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = m, this.encodeFileName = v, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
				}
				v.inherits(s, y), s.prototype.push = function(e) {
					var t = e.meta.percent || 0, m = this.entriesCount, v = this._sources.length;
					this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, y.prototype.push.call(this, {
						data: e.data,
						meta: {
							currentFile: this.currentFile,
							percent: m ? (t + 100 * (m - v - 1)) / m : 100
						}
					}));
				}, s.prototype.openedSource = function(e) {
					this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
					var t = this.streamFiles && !e.file.dir;
					if (t) {
						var m = n(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
						this.push({
							data: m.fileRecord,
							meta: { percent: 0 }
						});
					} else this.accumulate = !0;
				}, s.prototype.closedSource = function(e) {
					this.accumulate = !1;
					var t = this.streamFiles && !e.file.dir, m = n(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
					if (this.dirRecords.push(m.dirRecord), t) this.push({
						data: function(e) {
							return C.DATA_DESCRIPTOR + A(e.crc32, 4) + A(e.compressedSize, 4) + A(e.uncompressedSize, 4);
						}(e),
						meta: { percent: 100 }
					});
					else for (this.push({
						data: m.fileRecord,
						meta: { percent: 0 }
					}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
					this.currentFile = null;
				}, s.prototype.flush = function() {
					for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
						data: this.dirRecords[t],
						meta: { percent: 100 }
					});
					var m = this.bytesWritten - e, y = function(e, t, m, y, x) {
						var S = v.transformTo("string", x(y));
						return C.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e, 2) + A(e, 2) + A(t, 4) + A(m, 4) + A(S.length, 2) + S;
					}(this.dirRecords.length, m, e, this.zipComment, this.encodeFileName);
					this.push({
						data: y,
						meta: { percent: 100 }
					});
				}, s.prototype.prepareNextSource = function() {
					this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
				}, s.prototype.registerPrevious = function(e) {
					this._sources.push(e);
					var t = this;
					return e.on("data", function(e) {
						t.processChunk(e);
					}), e.on("end", function() {
						t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
					}), e.on("error", function(e) {
						t.error(e);
					}), this;
				}, s.prototype.resume = function() {
					return !!y.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
				}, s.prototype.error = function(e) {
					var t = this._sources;
					if (!y.prototype.error.call(this, e)) return !1;
					for (var m = 0; m < t.length; m++) try {
						t[m].error(e);
					} catch {}
					return !0;
				}, s.prototype.lock = function() {
					y.prototype.lock.call(this);
					for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
				}, t.exports = s;
			}, {
				"../crc32": 4,
				"../signature": 23,
				"../stream/GenericWorker": 28,
				"../utf8": 31,
				"../utils": 32
			}],
			9: [function(e, t, m) {
				var v = e("../compressions"), y = e("./ZipFileWorker");
				m.generateWorker = function(e, t, m) {
					var x = new y(t.streamFiles, m, t.platform, t.encodeFileName), S = 0;
					try {
						e.forEach(function(e, m) {
							S++;
							var y = function(e, t) {
								var m = e || t, y = v[m];
								if (!y) throw Error(m + " is not a valid compression method !");
								return y;
							}(m.options.compression, t.compression), C = m.options.compressionOptions || t.compressionOptions || {}, w = m.dir, E = m.date;
							m._compressWorker(y, C).withStreamInfo("file", {
								name: e,
								dir: w,
								date: E,
								comment: m.comment || "",
								unixPermissions: m.unixPermissions,
								dosPermissions: m.dosPermissions
							}).pipe(x);
						}), x.entriesCount = S;
					} catch (e) {
						x.error(e);
					}
					return x;
				};
			}, {
				"../compressions": 3,
				"./ZipFileWorker": 8
			}],
			10: [function(e, t, m) {
				function n() {
					if (!(this instanceof n)) return new n();
					if (arguments.length) throw Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
					this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
						var e = new n();
						for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
						return e;
					};
				}
				(n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e, t) {
					return new n().loadAsync(e, t);
				}, n.external = e("./external"), t.exports = n;
			}, {
				"./defaults": 5,
				"./external": 6,
				"./load": 11,
				"./object": 15,
				"./support": 30
			}],
			11: [function(e, t, m) {
				var v = e("./utils"), y = e("./external"), x = e("./utf8"), S = e("./zipEntries"), C = e("./stream/Crc32Probe"), w = e("./nodejsUtils");
				function f(e) {
					return new y.Promise(function(t, m) {
						var v = e.decompressed.getContentWorker().pipe(new C());
						v.on("error", function(e) {
							m(e);
						}).on("end", function() {
							v.streamInfo.crc32 === e.decompressed.crc32 ? t() : m(/* @__PURE__ */ Error("Corrupted zip : CRC32 mismatch"));
						}).resume();
					});
				}
				t.exports = function(e, t) {
					var m = this;
					return t = v.extend(t || {}, {
						base64: !1,
						checkCRC32: !1,
						optimizedBinaryString: !1,
						createFolders: !1,
						decodeFileName: x.utf8decode
					}), w.isNode && w.isStream(e) ? y.Promise.reject(/* @__PURE__ */ Error("JSZip can't accept a stream when loading a zip file.")) : v.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
						var m = new S(t);
						return m.load(e), m;
					}).then(function(e) {
						var m = [y.Promise.resolve(e)], v = e.files;
						if (t.checkCRC32) for (var x = 0; x < v.length; x++) m.push(f(v[x]));
						return y.Promise.all(m);
					}).then(function(e) {
						for (var y = e.shift(), x = y.files, S = 0; S < x.length; S++) {
							var C = x[S], w = C.fileNameStr, E = v.resolve(C.fileNameStr);
							m.file(E, C.decompressed, {
								binary: !0,
								optimizedBinaryString: !0,
								date: C.date,
								dir: C.dir,
								comment: C.fileCommentStr.length ? C.fileCommentStr : null,
								unixPermissions: C.unixPermissions,
								dosPermissions: C.dosPermissions,
								createFolders: t.createFolders
							}), C.dir || (m.file(E).unsafeOriginalName = w);
						}
						return y.zipComment.length && (m.comment = y.zipComment), m;
					});
				};
			}, {
				"./external": 6,
				"./nodejsUtils": 14,
				"./stream/Crc32Probe": 25,
				"./utf8": 31,
				"./utils": 32,
				"./zipEntries": 33
			}],
			12: [function(e, t, m) {
				var v = e("../utils"), y = e("../stream/GenericWorker");
				function s(e, t) {
					y.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
				}
				v.inherits(s, y), s.prototype._bindStream = function(e) {
					var t = this;
					(this._stream = e).pause(), e.on("data", function(e) {
						t.push({
							data: e,
							meta: { percent: 0 }
						});
					}).on("error", function(e) {
						t.isPaused ? this.generatedError = e : t.error(e);
					}).on("end", function() {
						t.isPaused ? t._upstreamEnded = !0 : t.end();
					});
				}, s.prototype.pause = function() {
					return !!y.prototype.pause.call(this) && (this._stream.pause(), !0);
				}, s.prototype.resume = function() {
					return !!y.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
				}, t.exports = s;
			}, {
				"../stream/GenericWorker": 28,
				"../utils": 32
			}],
			13: [function(e, t, m) {
				var v = e("readable-stream").Readable;
				function n(e, t, m) {
					v.call(this, t), this._helper = e;
					var y = this;
					e.on("data", function(e, t) {
						y.push(e) || y._helper.pause(), m && m(t);
					}).on("error", function(e) {
						y.emit("error", e);
					}).on("end", function() {
						y.push(null);
					});
				}
				e("../utils").inherits(n, v), n.prototype._read = function() {
					this._helper.resume();
				}, t.exports = n;
			}, {
				"../utils": 32,
				"readable-stream": 16
			}],
			14: [function(e, t, m) {
				t.exports = {
					isNode: typeof Buffer < "u",
					newBufferFrom: function(e, t) {
						if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
						if (typeof e == "number") throw Error("The \"data\" argument must not be a number");
						return new Buffer(e, t);
					},
					allocBuffer: function(e) {
						if (Buffer.alloc) return Buffer.alloc(e);
						var t = new Buffer(e);
						return t.fill(0), t;
					},
					isBuffer: function(e) {
						return Buffer.isBuffer(e);
					},
					isStream: function(e) {
						return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
					}
				};
			}, {}],
			15: [function(e, t, m) {
				function s(e, t, m) {
					var v, S = y.getTypeOf(t), O = y.extend(m || {}, C);
					O.date = O.date || /* @__PURE__ */ new Date(), O.compression !== null && (O.compression = O.compression.toUpperCase()), typeof O.unixPermissions == "string" && (O.unixPermissions = parseInt(O.unixPermissions, 8)), O.unixPermissions && 16384 & O.unixPermissions && (O.dir = !0), O.dosPermissions && 16 & O.dosPermissions && (O.dir = !0), O.dir && (e = g(e)), O.createFolders && (v = _(e)) && b.call(this, v, !0);
					var I = S === "string" && !1 === O.binary && !1 === O.base64;
					m && m.binary !== void 0 || (O.binary = !I), (t instanceof w && t.uncompressedSize === 0 || O.dir || !t || t.length === 0) && (O.base64 = !1, O.binary = !0, t = "", O.compression = "STORE", S = "string");
					var te = null;
					te = t instanceof w || t instanceof x ? t : k.isNode && k.isStream(t) ? new ee(e, t) : y.prepareContent(e, t, O.binary, O.optimizedBinaryString, O.base64);
					var z = new E(e, te, O);
					this.files[e] = z;
				}
				var v = e("./utf8"), y = e("./utils"), x = e("./stream/GenericWorker"), S = e("./stream/StreamHelper"), C = e("./defaults"), w = e("./compressedObject"), E = e("./zipObject"), O = e("./generate"), k = e("./nodejsUtils"), ee = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e) {
					e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
					var t = e.lastIndexOf("/");
					return 0 < t ? e.substring(0, t) : "";
				}, g = function(e) {
					return e.slice(-1) !== "/" && (e += "/"), e;
				}, b = function(e, t) {
					return t = t === void 0 ? C.createFolders : t, e = g(e), this.files[e] || s.call(this, e, null, {
						dir: !0,
						createFolders: t
					}), this.files[e];
				};
				function h(e) {
					return Object.prototype.toString.call(e) === "[object RegExp]";
				}
				t.exports = {
					load: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					forEach: function(e) {
						var t, m, v;
						for (t in this.files) v = this.files[t], (m = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(m, v);
					},
					filter: function(e) {
						var t = [];
						return this.forEach(function(m, v) {
							e(m, v) && t.push(v);
						}), t;
					},
					file: function(e, t, m) {
						if (arguments.length !== 1) return e = this.root + e, s.call(this, e, t, m), this;
						if (h(e)) {
							var v = e;
							return this.filter(function(e, t) {
								return !t.dir && v.test(e);
							});
						}
						var y = this.files[this.root + e];
						return y && !y.dir ? y : null;
					},
					folder: function(e) {
						if (!e) return this;
						if (h(e)) return this.filter(function(t, m) {
							return m.dir && e.test(t);
						});
						var t = this.root + e, m = b.call(this, t), v = this.clone();
						return v.root = m.name, v;
					},
					remove: function(e) {
						e = this.root + e;
						var t = this.files[e];
						if (t ||= (e.slice(-1) !== "/" && (e += "/"), this.files[e]), t && !t.dir) delete this.files[e];
						else for (var m = this.filter(function(t, m) {
							return m.name.slice(0, e.length) === e;
						}), v = 0; v < m.length; v++) delete this.files[m[v].name];
						return this;
					},
					generate: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					generateInternalStream: function(e) {
						var t, m = {};
						try {
							if ((m = y.extend(e || {}, {
								streamFiles: !1,
								compression: "STORE",
								compressionOptions: null,
								type: "",
								platform: "DOS",
								comment: null,
								mimeType: "application/zip",
								encodeFileName: v.utf8encode
							})).type = m.type.toLowerCase(), m.compression = m.compression.toUpperCase(), m.type === "binarystring" && (m.type = "string"), !m.type) throw Error("No output type specified.");
							y.checkSupport(m.type), m.platform !== "darwin" && m.platform !== "freebsd" && m.platform !== "linux" && m.platform !== "sunos" || (m.platform = "UNIX"), m.platform === "win32" && (m.platform = "DOS");
							var C = m.comment || this.comment || "";
							t = O.generateWorker(this, m, C);
						} catch (e) {
							(t = new x("error")).error(e);
						}
						return new S(t, m.type || "string", m.mimeType);
					},
					generateAsync: function(e, t) {
						return this.generateInternalStream(e).accumulate(t);
					},
					generateNodeStream: function(e, t) {
						return (e ||= {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
					}
				};
			}, {
				"./compressedObject": 2,
				"./defaults": 5,
				"./generate": 9,
				"./nodejs/NodejsStreamInputAdapter": 12,
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31,
				"./utils": 32,
				"./zipObject": 35
			}],
			16: [function(e, t, m) {
				t.exports = e("stream");
			}, { stream: void 0 }],
			17: [function(e, t, m) {
				var v = e("./DataReader");
				function i(e) {
					v.call(this, e);
					for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
				}
				e("../utils").inherits(i, v), i.prototype.byteAt = function(e) {
					return this.data[this.zero + e];
				}, i.prototype.lastIndexOfSignature = function(e) {
					for (var t = e.charCodeAt(0), m = e.charCodeAt(1), v = e.charCodeAt(2), y = e.charCodeAt(3), x = this.length - 4; 0 <= x; --x) if (this.data[x] === t && this.data[x + 1] === m && this.data[x + 2] === v && this.data[x + 3] === y) return x - this.zero;
					return -1;
				}, i.prototype.readAndCheckSignature = function(e) {
					var t = e.charCodeAt(0), m = e.charCodeAt(1), v = e.charCodeAt(2), y = e.charCodeAt(3), x = this.readData(4);
					return t === x[0] && m === x[1] && v === x[2] && y === x[3];
				}, i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return [];
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			18: [function(e, t, m) {
				var v = e("../utils");
				function i(e) {
					this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
				}
				i.prototype = {
					checkOffset: function(e) {
						this.checkIndex(this.index + e);
					},
					checkIndex: function(e) {
						if (this.length < this.zero + e || e < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
					},
					setIndex: function(e) {
						this.checkIndex(e), this.index = e;
					},
					skip: function(e) {
						this.setIndex(this.index + e);
					},
					byteAt: function() {},
					readInt: function(e) {
						var t, m = 0;
						for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) m = (m << 8) + this.byteAt(t);
						return this.index += e, m;
					},
					readString: function(e) {
						return v.transformTo("string", this.readData(e));
					},
					readData: function() {},
					lastIndexOfSignature: function() {},
					readAndCheckSignature: function() {},
					readDate: function() {
						var e = this.readInt(4);
						return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
					}
				}, t.exports = i;
			}, { "../utils": 32 }],
			19: [function(e, t, m) {
				var v = e("./Uint8ArrayReader");
				function i(e) {
					v.call(this, e);
				}
				e("../utils").inherits(i, v), i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./Uint8ArrayReader": 21
			}],
			20: [function(e, t, m) {
				var v = e("./DataReader");
				function i(e) {
					v.call(this, e);
				}
				e("../utils").inherits(i, v), i.prototype.byteAt = function(e) {
					return this.data.charCodeAt(this.zero + e);
				}, i.prototype.lastIndexOfSignature = function(e) {
					return this.data.lastIndexOf(e) - this.zero;
				}, i.prototype.readAndCheckSignature = function(e) {
					return e === this.readData(4);
				}, i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			21: [function(e, t, m) {
				var v = e("./ArrayReader");
				function i(e) {
					v.call(this, e);
				}
				e("../utils").inherits(i, v), i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return new Uint8Array();
					var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./ArrayReader": 17
			}],
			22: [function(e, t, m) {
				var v = e("../utils"), y = e("../support"), x = e("./ArrayReader"), S = e("./StringReader"), C = e("./NodeBufferReader"), w = e("./Uint8ArrayReader");
				t.exports = function(e) {
					var t = v.getTypeOf(e);
					return v.checkSupport(t), t !== "string" || y.uint8array ? t === "nodebuffer" ? new C(e) : y.uint8array ? new w(v.transformTo("uint8array", e)) : new x(v.transformTo("array", e)) : new S(e);
				};
			}, {
				"../support": 30,
				"../utils": 32,
				"./ArrayReader": 17,
				"./NodeBufferReader": 19,
				"./StringReader": 20,
				"./Uint8ArrayReader": 21
			}],
			23: [function(e, t, m) {
				m.LOCAL_FILE_HEADER = "PK", m.CENTRAL_FILE_HEADER = "PK", m.CENTRAL_DIRECTORY_END = "PK", m.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", m.ZIP64_CENTRAL_DIRECTORY_END = "PK", m.DATA_DESCRIPTOR = "PK\x07\b";
			}, {}],
			24: [function(e, t, m) {
				var v = e("./GenericWorker"), y = e("../utils");
				function s(e) {
					v.call(this, "ConvertWorker to " + e), this.destType = e;
				}
				y.inherits(s, v), s.prototype.processChunk = function(e) {
					this.push({
						data: y.transformTo(this.destType, e.data),
						meta: e.meta
					});
				}, t.exports = s;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			25: [function(e, t, m) {
				var v = e("./GenericWorker"), y = e("../crc32");
				function s() {
					v.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
				}
				e("../utils").inherits(s, v), s.prototype.processChunk = function(e) {
					this.streamInfo.crc32 = y(e.data, this.streamInfo.crc32 || 0), this.push(e);
				}, t.exports = s;
			}, {
				"../crc32": 4,
				"../utils": 32,
				"./GenericWorker": 28
			}],
			26: [function(e, t, m) {
				var v = e("../utils"), y = e("./GenericWorker");
				function s(e) {
					y.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
				}
				v.inherits(s, y), s.prototype.processChunk = function(e) {
					if (e) {
						var t = this.streamInfo[this.propName] || 0;
						this.streamInfo[this.propName] = t + e.data.length;
					}
					y.prototype.processChunk.call(this, e);
				}, t.exports = s;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			27: [function(e, t, m) {
				var v = e("../utils"), y = e("./GenericWorker");
				function s(e) {
					y.call(this, "DataWorker");
					var t = this;
					this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
						t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = v.getTypeOf(e), t.isPaused || t._tickAndRepeat();
					}, function(e) {
						t.error(e);
					});
				}
				v.inherits(s, y), s.prototype.cleanUp = function() {
					y.prototype.cleanUp.call(this), this.data = null;
				}, s.prototype.resume = function() {
					return !!y.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, v.delay(this._tickAndRepeat, [], this)), !0);
				}, s.prototype._tickAndRepeat = function() {
					this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (v.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
				}, s.prototype._tick = function() {
					if (this.isPaused || this.isFinished) return !1;
					var e = null, t = Math.min(this.max, this.index + 16384);
					if (this.index >= this.max) return this.end();
					switch (this.type) {
						case "string":
							e = this.data.substring(this.index, t);
							break;
						case "uint8array":
							e = this.data.subarray(this.index, t);
							break;
						case "array":
						case "nodebuffer": e = this.data.slice(this.index, t);
					}
					return this.index = t, this.push({
						data: e,
						meta: { percent: this.max ? this.index / this.max * 100 : 0 }
					});
				}, t.exports = s;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			28: [function(e, t, m) {
				function n(e) {
					this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
						data: [],
						end: [],
						error: []
					}, this.previous = null;
				}
				n.prototype = {
					push: function(e) {
						this.emit("data", e);
					},
					end: function() {
						if (this.isFinished) return !1;
						this.flush();
						try {
							this.emit("end"), this.cleanUp(), this.isFinished = !0;
						} catch (e) {
							this.emit("error", e);
						}
						return !0;
					},
					error: function(e) {
						return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
					},
					on: function(e, t) {
						return this._listeners[e].push(t), this;
					},
					cleanUp: function() {
						this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
					},
					emit: function(e, t) {
						if (this._listeners[e]) for (var m = 0; m < this._listeners[e].length; m++) this._listeners[e][m].call(this, t);
					},
					pipe: function(e) {
						return e.registerPrevious(this);
					},
					registerPrevious: function(e) {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
						var t = this;
						return e.on("data", function(e) {
							t.processChunk(e);
						}), e.on("end", function() {
							t.end();
						}), e.on("error", function(e) {
							t.error(e);
						}), this;
					},
					pause: function() {
						return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
					},
					resume: function() {
						if (!this.isPaused || this.isFinished) return !1;
						var e = this.isPaused = !1;
						return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
					},
					flush: function() {},
					processChunk: function(e) {
						this.push(e);
					},
					withStreamInfo: function(e, t) {
						return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
					},
					mergeStreamInfo: function() {
						for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
					},
					lock: function() {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.isLocked = !0, this.previous && this.previous.lock();
					},
					toString: function() {
						var e = "Worker " + this.name;
						return this.previous ? this.previous + " -> " + e : e;
					}
				}, t.exports = n;
			}, {}],
			29: [function(e, t, m) {
				var v = e("../utils"), y = e("./ConvertWorker"), x = e("./GenericWorker"), S = e("../base64"), C = e("../support"), w = e("../external"), E = null;
				if (C.nodestream) try {
					E = e("../nodejs/NodejsStreamOutputAdapter");
				} catch {}
				function l(e, t) {
					return new w.Promise(function(m, y) {
						var x = [], C = e._internalType, w = e._outputType, E = e._mimeType;
						e.on("data", function(e, m) {
							x.push(e), t && t(m);
						}).on("error", function(e) {
							x = [], y(e);
						}).on("end", function() {
							try {
								m(function(e, t, m) {
									switch (e) {
										case "blob": return v.newBlob(v.transformTo("arraybuffer", t), m);
										case "base64": return S.encode(t);
										default: return v.transformTo(e, t);
									}
								}(w, function(e, t) {
									var m, v = 0, y = null, x = 0;
									for (m = 0; m < t.length; m++) x += t[m].length;
									switch (e) {
										case "string": return t.join("");
										case "array": return Array.prototype.concat.apply([], t);
										case "uint8array":
											for (y = new Uint8Array(x), m = 0; m < t.length; m++) y.set(t[m], v), v += t[m].length;
											return y;
										case "nodebuffer": return Buffer.concat(t);
										default: throw Error("concat : unsupported type '" + e + "'");
									}
								}(C, x), E));
							} catch (e) {
								y(e);
							}
							x = [];
						}).resume();
					});
				}
				function f(e, t, m) {
					var S = t;
					switch (t) {
						case "blob":
						case "arraybuffer":
							S = "uint8array";
							break;
						case "base64": S = "string";
					}
					try {
						this._internalType = S, this._outputType = t, this._mimeType = m, v.checkSupport(S), this._worker = e.pipe(new y(S)), e.lock();
					} catch (e) {
						this._worker = new x("error"), this._worker.error(e);
					}
				}
				f.prototype = {
					accumulate: function(e) {
						return l(this, e);
					},
					on: function(e, t) {
						var m = this;
						return e === "data" ? this._worker.on(e, function(e) {
							t.call(m, e.data, e.meta);
						}) : this._worker.on(e, function() {
							v.delay(t, arguments, m);
						}), this;
					},
					resume: function() {
						return v.delay(this._worker.resume, [], this._worker), this;
					},
					pause: function() {
						return this._worker.pause(), this;
					},
					toNodejsStream: function(e) {
						if (v.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw Error(this._outputType + " is not supported by this method");
						return new E(this, { objectMode: this._outputType !== "nodebuffer" }, e);
					}
				}, t.exports = f;
			}, {
				"../base64": 1,
				"../external": 6,
				"../nodejs/NodejsStreamOutputAdapter": 13,
				"../support": 30,
				"../utils": 32,
				"./ConvertWorker": 24,
				"./GenericWorker": 28
			}],
			30: [function(e, t, m) {
				if (m.base64 = !0, m.array = !0, m.string = !0, m.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", m.nodebuffer = typeof Buffer < "u", m.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") m.blob = !1;
				else {
					var v = /* @__PURE__ */ new ArrayBuffer(0);
					try {
						m.blob = new Blob([v], { type: "application/zip" }).size === 0;
					} catch {
						try {
							var y = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							y.append(v), m.blob = y.getBlob("application/zip").size === 0;
						} catch {
							m.blob = !1;
						}
					}
				}
				try {
					m.nodestream = !!e("readable-stream").Readable;
				} catch {
					m.nodestream = !1;
				}
			}, { "readable-stream": 16 }],
			31: [function(e, t, m) {
				for (var v = e("./utils"), y = e("./support"), x = e("./nodejsUtils"), S = e("./stream/GenericWorker"), C = Array(256), w = 0; w < 256; w++) C[w] = 252 <= w ? 6 : 248 <= w ? 5 : 240 <= w ? 4 : 224 <= w ? 3 : 192 <= w ? 2 : 1;
				C[254] = C[254] = 1;
				function a() {
					S.call(this, "utf-8 decode"), this.leftOver = null;
				}
				function l() {
					S.call(this, "utf-8 encode");
				}
				m.utf8encode = function(e) {
					return y.nodebuffer ? x.newBufferFrom(e, "utf-8") : function(e) {
						var t, m, v, x, S, C = e.length, w = 0;
						for (x = 0; x < C; x++) (64512 & (m = e.charCodeAt(x))) == 55296 && x + 1 < C && (64512 & (v = e.charCodeAt(x + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (v - 56320), x++), w += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
						for (t = y.uint8array ? new Uint8Array(w) : Array(w), x = S = 0; S < w; x++) (64512 & (m = e.charCodeAt(x))) == 55296 && x + 1 < C && (64512 & (v = e.charCodeAt(x + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (v - 56320), x++), m < 128 ? t[S++] = m : (m < 2048 ? t[S++] = 192 | m >>> 6 : (m < 65536 ? t[S++] = 224 | m >>> 12 : (t[S++] = 240 | m >>> 18, t[S++] = 128 | m >>> 12 & 63), t[S++] = 128 | m >>> 6 & 63), t[S++] = 128 | 63 & m);
						return t;
					}(e);
				}, m.utf8decode = function(e) {
					return y.nodebuffer ? v.transformTo("nodebuffer", e).toString("utf-8") : function(e) {
						var t, m, y, x, S = e.length, w = Array(2 * S);
						for (t = m = 0; t < S;) if ((y = e[t++]) < 128) w[m++] = y;
						else if (4 < (x = C[y])) w[m++] = 65533, t += x - 1;
						else {
							for (y &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && t < S;) y = y << 6 | 63 & e[t++], x--;
							1 < x ? w[m++] = 65533 : y < 65536 ? w[m++] = y : (y -= 65536, w[m++] = 55296 | y >> 10 & 1023, w[m++] = 56320 | 1023 & y);
						}
						return w.length !== m && (w.subarray ? w = w.subarray(0, m) : w.length = m), v.applyFromCharCode(w);
					}(e = v.transformTo(y.uint8array ? "uint8array" : "array", e));
				}, v.inherits(a, S), a.prototype.processChunk = function(e) {
					var t = v.transformTo(y.uint8array ? "uint8array" : "array", e.data);
					if (this.leftOver && this.leftOver.length) {
						if (y.uint8array) {
							var x = t;
							(t = new Uint8Array(x.length + this.leftOver.length)).set(this.leftOver, 0), t.set(x, this.leftOver.length);
						} else t = this.leftOver.concat(t);
						this.leftOver = null;
					}
					var S = function(e, t) {
						var m;
						for ((t ||= e.length) > e.length && (t = e.length), m = t - 1; 0 <= m && (192 & e[m]) == 128;) m--;
						return m < 0 || m === 0 ? t : m + C[e[m]] > t ? m : t;
					}(t), w = t;
					S !== t.length && (y.uint8array ? (w = t.subarray(0, S), this.leftOver = t.subarray(S, t.length)) : (w = t.slice(0, S), this.leftOver = t.slice(S, t.length))), this.push({
						data: m.utf8decode(w),
						meta: e.meta
					});
				}, a.prototype.flush = function() {
					this.leftOver && this.leftOver.length && (this.push({
						data: m.utf8decode(this.leftOver),
						meta: {}
					}), this.leftOver = null);
				}, m.Utf8DecodeWorker = a, v.inherits(l, S), l.prototype.processChunk = function(e) {
					this.push({
						data: m.utf8encode(e.data),
						meta: e.meta
					});
				}, m.Utf8EncodeWorker = l;
			}, {
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./support": 30,
				"./utils": 32
			}],
			32: [function(e, t, m) {
				var v = e("./support"), y = e("./base64"), x = e("./nodejsUtils"), S = e("./external");
				function n(e) {
					return e;
				}
				function l(e, t) {
					for (var m = 0; m < e.length; ++m) t[m] = 255 & e.charCodeAt(m);
					return t;
				}
				e("setimmediate"), m.newBlob = function(e, t) {
					m.checkSupport("blob");
					try {
						return new Blob([e], { type: t });
					} catch {
						try {
							var v = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							return v.append(e), v.getBlob(t);
						} catch {
							throw Error("Bug : can't construct the Blob.");
						}
					}
				};
				var C = {
					stringifyByChunk: function(e, t, m) {
						var v = [], y = 0, x = e.length;
						if (x <= m) return String.fromCharCode.apply(null, e);
						for (; y < x;) t === "array" || t === "nodebuffer" ? v.push(String.fromCharCode.apply(null, e.slice(y, Math.min(y + m, x)))) : v.push(String.fromCharCode.apply(null, e.subarray(y, Math.min(y + m, x)))), y += m;
						return v.join("");
					},
					stringifyByChar: function(e) {
						for (var t = "", m = 0; m < e.length; m++) t += String.fromCharCode(e[m]);
						return t;
					},
					applyCanBeUsed: {
						uint8array: function() {
							try {
								return v.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
							} catch {
								return !1;
							}
						}(),
						nodebuffer: function() {
							try {
								return v.nodebuffer && String.fromCharCode.apply(null, x.allocBuffer(1)).length === 1;
							} catch {
								return !1;
							}
						}()
					}
				};
				function s(e) {
					var t = 65536, v = m.getTypeOf(e), y = !0;
					if (v === "uint8array" ? y = C.applyCanBeUsed.uint8array : v === "nodebuffer" && (y = C.applyCanBeUsed.nodebuffer), y) for (; 1 < t;) try {
						return C.stringifyByChunk(e, v, t);
					} catch {
						t = Math.floor(t / 2);
					}
					return C.stringifyByChar(e);
				}
				function f(e, t) {
					for (var m = 0; m < e.length; m++) t[m] = e[m];
					return t;
				}
				m.applyFromCharCode = s;
				var w = {};
				w.string = {
					string: n,
					array: function(e) {
						return l(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return w.string.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return l(e, new Uint8Array(e.length));
					},
					nodebuffer: function(e) {
						return l(e, x.allocBuffer(e.length));
					}
				}, w.array = {
					string: s,
					array: n,
					arraybuffer: function(e) {
						return new Uint8Array(e).buffer;
					},
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return x.newBufferFrom(e);
					}
				}, w.arraybuffer = {
					string: function(e) {
						return s(new Uint8Array(e));
					},
					array: function(e) {
						return f(new Uint8Array(e), Array(e.byteLength));
					},
					arraybuffer: n,
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return x.newBufferFrom(new Uint8Array(e));
					}
				}, w.uint8array = {
					string: s,
					array: function(e) {
						return f(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return e.buffer;
					},
					uint8array: n,
					nodebuffer: function(e) {
						return x.newBufferFrom(e);
					}
				}, w.nodebuffer = {
					string: s,
					array: function(e) {
						return f(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return w.nodebuffer.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return f(e, new Uint8Array(e.length));
					},
					nodebuffer: n
				}, m.transformTo = function(e, t) {
					return t ||= "", e ? (m.checkSupport(e), w[m.getTypeOf(t)][e](t)) : t;
				}, m.resolve = function(e) {
					for (var t = e.split("/"), m = [], v = 0; v < t.length; v++) {
						var y = t[v];
						y === "." || y === "" && v !== 0 && v !== t.length - 1 || (y === ".." ? m.pop() : m.push(y));
					}
					return m.join("/");
				}, m.getTypeOf = function(e) {
					return typeof e == "string" ? "string" : Object.prototype.toString.call(e) === "[object Array]" ? "array" : v.nodebuffer && x.isBuffer(e) ? "nodebuffer" : v.uint8array && e instanceof Uint8Array ? "uint8array" : v.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
				}, m.checkSupport = function(e) {
					if (!v[e.toLowerCase()]) throw Error(e + " is not supported by this platform");
				}, m.MAX_VALUE_16BITS = 65535, m.MAX_VALUE_32BITS = -1, m.pretty = function(e) {
					var t, m, v = "";
					for (m = 0; m < (e || "").length; m++) v += "\\x" + ((t = e.charCodeAt(m)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
					return v;
				}, m.delay = function(e, t, m) {
					setImmediate(function() {
						e.apply(m || null, t || []);
					});
				}, m.inherits = function(e, t) {
					function r() {}
					r.prototype = t.prototype, e.prototype = new r();
				}, m.extend = function() {
					var e, t, m = {};
					for (e = 0; e < arguments.length; e++) for (t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && m[t] === void 0 && (m[t] = arguments[e][t]);
					return m;
				}, m.prepareContent = function(e, t, x, C, w) {
					return S.Promise.resolve(t).then(function(e) {
						return v.blob && (e instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)) !== -1) && typeof FileReader < "u" ? new S.Promise(function(t, m) {
							var v = new FileReader();
							v.onload = function(e) {
								t(e.target.result);
							}, v.onerror = function(e) {
								m(e.target.error);
							}, v.readAsArrayBuffer(e);
						}) : e;
					}).then(function(t) {
						var E = m.getTypeOf(t);
						return E ? (E === "arraybuffer" ? t = m.transformTo("uint8array", t) : E === "string" && (w ? t = y.decode(t) : x && !0 !== C && (t = function(e) {
							return l(e, v.uint8array ? new Uint8Array(e.length) : Array(e.length));
						}(t))), t) : S.Promise.reject(/* @__PURE__ */ Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
					});
				};
			}, {
				"./base64": 1,
				"./external": 6,
				"./nodejsUtils": 14,
				"./support": 30,
				setimmediate: 54
			}],
			33: [function(e, t, m) {
				var v = e("./reader/readerFor"), y = e("./utils"), x = e("./signature"), S = e("./zipEntry"), C = e("./support");
				function h(e) {
					this.files = [], this.loadOptions = e;
				}
				h.prototype = {
					checkSignature: function(e) {
						if (!this.reader.readAndCheckSignature(e)) {
							this.reader.index -= 4;
							var t = this.reader.readString(4);
							throw Error("Corrupted zip or bug: unexpected signature (" + y.pretty(t) + ", expected " + y.pretty(e) + ")");
						}
					},
					isSignature: function(e, t) {
						var m = this.reader.index;
						this.reader.setIndex(e);
						var v = this.reader.readString(4) === t;
						return this.reader.setIndex(m), v;
					},
					readBlockEndOfCentral: function() {
						this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
						var e = this.reader.readData(this.zipCommentLength), t = C.uint8array ? "uint8array" : "array", m = y.transformTo(t, e);
						this.zipComment = this.loadOptions.decodeFileName(m);
					},
					readBlockZip64EndOfCentral: function() {
						this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
						for (var e, t, m, v = this.zip64EndOfCentralSize - 44; 0 < v;) e = this.reader.readInt(2), t = this.reader.readInt(4), m = this.reader.readData(t), this.zip64ExtensibleData[e] = {
							id: e,
							length: t,
							value: m
						};
					},
					readBlockZip64EndOfCentralLocator: function() {
						if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw Error("Multi-volumes zip are not supported");
					},
					readLocalFiles: function() {
						var e, t;
						for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(x.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
					},
					readCentralDir: function() {
						var e;
						for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(x.CENTRAL_FILE_HEADER);) (e = new S({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
						if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
					},
					readEndOfCentral: function() {
						var e = this.reader.lastIndexOfSignature(x.CENTRAL_DIRECTORY_END);
						if (e < 0) throw this.isSignature(0, x.LOCAL_FILE_HEADER) ? /* @__PURE__ */ Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
						this.reader.setIndex(e);
						var t = e;
						if (this.checkSignature(x.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === y.MAX_VALUE_16BITS || this.diskWithCentralDirStart === y.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === y.MAX_VALUE_16BITS || this.centralDirRecords === y.MAX_VALUE_16BITS || this.centralDirSize === y.MAX_VALUE_32BITS || this.centralDirOffset === y.MAX_VALUE_32BITS) {
							if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(x.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
							if (this.reader.setIndex(e), this.checkSignature(x.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, x.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(x.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw Error("Corrupted zip: can't find the ZIP64 end of central directory");
							this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(x.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
						}
						var m = this.centralDirOffset + this.centralDirSize;
						this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
						var v = t - m;
						if (0 < v) this.isSignature(t, x.CENTRAL_FILE_HEADER) || (this.reader.zero = v);
						else if (v < 0) throw Error("Corrupted zip: missing " + Math.abs(v) + " bytes.");
					},
					prepareReader: function(e) {
						this.reader = v(e);
					},
					load: function(e) {
						this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
					}
				}, t.exports = h;
			}, {
				"./reader/readerFor": 22,
				"./signature": 23,
				"./support": 30,
				"./utils": 32,
				"./zipEntry": 34
			}],
			34: [function(e, t, m) {
				var v = e("./reader/readerFor"), y = e("./utils"), x = e("./compressedObject"), S = e("./crc32"), C = e("./utf8"), w = e("./compressions"), E = e("./support");
				function l(e, t) {
					this.options = e, this.loadOptions = t;
				}
				l.prototype = {
					isEncrypted: function() {
						return (1 & this.bitFlag) == 1;
					},
					useUTF8: function() {
						return (2048 & this.bitFlag) == 2048;
					},
					readLocalPart: function(e) {
						var t, m;
						if (e.skip(22), this.fileNameLength = e.readInt(2), m = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(m), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
						if ((t = function(e) {
							for (var t in w) if (Object.prototype.hasOwnProperty.call(w, t) && w[t].magic === e) return w[t];
							return null;
						}(this.compressionMethod)) === null) throw Error("Corrupted zip : compression " + y.pretty(this.compressionMethod) + " unknown (inner file : " + y.transformTo("string", this.fileName) + ")");
						this.decompressed = new x(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
					},
					readCentralPart: function(e) {
						this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
						var t = e.readInt(2);
						if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
						e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
					},
					processAttributes: function() {
						this.unixPermissions = null, this.dosPermissions = null;
						var e = this.versionMadeBy >> 8;
						this.dir = !!(16 & this.externalFileAttributes), e == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), e == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
					},
					parseZIP64ExtraField: function() {
						if (this.extraFields[1]) {
							var e = v(this.extraFields[1].value);
							this.uncompressedSize === y.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === y.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === y.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === y.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
						}
					},
					readExtraFields: function(e) {
						var t, m, v, y = e.index + this.extraFieldsLength;
						for (this.extraFields ||= {}; e.index + 4 < y;) t = e.readInt(2), m = e.readInt(2), v = e.readData(m), this.extraFields[t] = {
							id: t,
							length: m,
							value: v
						};
						e.setIndex(y);
					},
					handleUTF8: function() {
						var e = E.uint8array ? "uint8array" : "array";
						if (this.useUTF8()) this.fileNameStr = C.utf8decode(this.fileName), this.fileCommentStr = C.utf8decode(this.fileComment);
						else {
							var t = this.findExtraFieldUnicodePath();
							if (t !== null) this.fileNameStr = t;
							else {
								var m = y.transformTo(e, this.fileName);
								this.fileNameStr = this.loadOptions.decodeFileName(m);
							}
							var v = this.findExtraFieldUnicodeComment();
							if (v !== null) this.fileCommentStr = v;
							else {
								var x = y.transformTo(e, this.fileComment);
								this.fileCommentStr = this.loadOptions.decodeFileName(x);
							}
						}
					},
					findExtraFieldUnicodePath: function() {
						var e = this.extraFields[28789];
						if (e) {
							var t = v(e.value);
							return t.readInt(1) === 1 && S(this.fileName) === t.readInt(4) ? C.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					},
					findExtraFieldUnicodeComment: function() {
						var e = this.extraFields[25461];
						if (e) {
							var t = v(e.value);
							return t.readInt(1) === 1 && S(this.fileComment) === t.readInt(4) ? C.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					}
				}, t.exports = l;
			}, {
				"./compressedObject": 2,
				"./compressions": 3,
				"./crc32": 4,
				"./reader/readerFor": 22,
				"./support": 30,
				"./utf8": 31,
				"./utils": 32
			}],
			35: [function(e, t, m) {
				function n(e, t, m) {
					this.name = e, this.dir = m.dir, this.date = m.date, this.comment = m.comment, this.unixPermissions = m.unixPermissions, this.dosPermissions = m.dosPermissions, this._data = t, this._dataBinary = m.binary, this.options = {
						compression: m.compression,
						compressionOptions: m.compressionOptions
					};
				}
				var v = e("./stream/StreamHelper"), y = e("./stream/DataWorker"), x = e("./utf8"), S = e("./compressedObject"), C = e("./stream/GenericWorker");
				n.prototype = {
					internalStream: function(e) {
						var t = null, m = "string";
						try {
							if (!e) throw Error("No output type specified.");
							var y = (m = e.toLowerCase()) === "string" || m === "text";
							m !== "binarystring" && m !== "text" || (m = "string"), t = this._decompressWorker();
							var S = !this._dataBinary;
							S && !y && (t = t.pipe(new x.Utf8EncodeWorker())), !S && y && (t = t.pipe(new x.Utf8DecodeWorker()));
						} catch (e) {
							(t = new C("error")).error(e);
						}
						return new v(t, m, "");
					},
					async: function(e, t) {
						return this.internalStream(e).accumulate(t);
					},
					nodeStream: function(e, t) {
						return this.internalStream(e || "nodebuffer").toNodejsStream(t);
					},
					_compressWorker: function(e, t) {
						if (this._data instanceof S && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
						var m = this._decompressWorker();
						return this._dataBinary || (m = m.pipe(new x.Utf8EncodeWorker())), S.createWorkerFrom(m, e, t);
					},
					_decompressWorker: function() {
						return this._data instanceof S ? this._data.getContentWorker() : this._data instanceof C ? this._data : new y(this._data);
					}
				};
				for (var w = [
					"asText",
					"asBinary",
					"asNodeBuffer",
					"asUint8Array",
					"asArrayBuffer"
				], l = function() {
					throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
				}, E = 0; E < w.length; E++) n.prototype[w[E]] = l;
				t.exports = n;
			}, {
				"./compressedObject": 2,
				"./stream/DataWorker": 27,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31
			}],
			36: [function(e, t, m) {
				(function(e) {
					var r, m, v = e.MutationObserver || e.WebKitMutationObserver;
					if (v) {
						var y = 0, x = new v(u), S = e.document.createTextNode("");
						x.observe(S, { characterData: !0 }), r = function() {
							S.data = y = ++y % 2;
						};
					} else if (e.setImmediate || e.MessageChannel === void 0) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
						var t = e.document.createElement("script");
						t.onreadystatechange = function() {
							u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
						}, e.document.documentElement.appendChild(t);
					} : function() {
						setTimeout(u, 0);
					};
					else {
						var C = new e.MessageChannel();
						C.port1.onmessage = u, r = function() {
							C.port2.postMessage(0);
						};
					}
					var w = [];
					function u() {
						var e, t;
						m = !0;
						for (var v = w.length; v;) {
							for (t = w, w = [], e = -1; ++e < v;) t[e]();
							v = w.length;
						}
						m = !1;
					}
					t.exports = function(e) {
						w.push(e) !== 1 || m || r();
					};
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}],
			37: [function(e, t, m) {
				var v = e("immediate");
				function u() {}
				var y = {}, x = ["REJECTED"], S = ["FULFILLED"], C = ["PENDING"];
				function o(e) {
					if (typeof e != "function") throw TypeError("resolver must be a function");
					this.state = C, this.queue = [], this.outcome = void 0, e !== u && d(this, e);
				}
				function h(e, t, m) {
					this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof m == "function" && (this.onRejected = m, this.callRejected = this.otherCallRejected);
				}
				function f(e, t, m) {
					v(function() {
						var v;
						try {
							v = t(m);
						} catch (t) {
							return y.reject(e, t);
						}
						v === e ? y.reject(e, /* @__PURE__ */ TypeError("Cannot resolve promise with itself")) : y.resolve(e, v);
					});
				}
				function c(e) {
					var t = e && e.then;
					if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function") return function() {
						t.apply(e, arguments);
					};
				}
				function d(e, t) {
					var m = !1;
					function n(t) {
						m || (m = !0, y.reject(e, t));
					}
					function i(t) {
						m || (m = !0, y.resolve(e, t));
					}
					var v = p(function() {
						t(i, n);
					});
					v.status === "error" && n(v.value);
				}
				function p(e, t) {
					var m = {};
					try {
						m.value = e(t), m.status = "success";
					} catch (e) {
						m.status = "error", m.value = e;
					}
					return m;
				}
				(t.exports = o).prototype.finally = function(e) {
					if (typeof e != "function") return this;
					var t = this.constructor;
					return this.then(function(m) {
						return t.resolve(e()).then(function() {
							return m;
						});
					}, function(m) {
						return t.resolve(e()).then(function() {
							throw m;
						});
					});
				}, o.prototype.catch = function(e) {
					return this.then(null, e);
				}, o.prototype.then = function(e, t) {
					if (typeof e != "function" && this.state === S || typeof t != "function" && this.state === x) return this;
					var m = new this.constructor(u);
					return this.state === C ? this.queue.push(new h(m, e, t)) : f(m, this.state === S ? e : t, this.outcome), m;
				}, h.prototype.callFulfilled = function(e) {
					y.resolve(this.promise, e);
				}, h.prototype.otherCallFulfilled = function(e) {
					f(this.promise, this.onFulfilled, e);
				}, h.prototype.callRejected = function(e) {
					y.reject(this.promise, e);
				}, h.prototype.otherCallRejected = function(e) {
					f(this.promise, this.onRejected, e);
				}, y.resolve = function(e, t) {
					var m = p(c, t);
					if (m.status === "error") return y.reject(e, m.value);
					var v = m.value;
					if (v) d(e, v);
					else {
						e.state = S, e.outcome = t;
						for (var x = -1, C = e.queue.length; ++x < C;) e.queue[x].callFulfilled(t);
					}
					return e;
				}, y.reject = function(e, t) {
					e.state = x, e.outcome = t;
					for (var m = -1, v = e.queue.length; ++m < v;) e.queue[m].callRejected(t);
					return e;
				}, o.resolve = function(e) {
					return e instanceof this ? e : y.resolve(new this(u), e);
				}, o.reject = function(e) {
					var t = new this(u);
					return y.reject(t, e);
				}, o.all = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var m = e.length, v = !1;
					if (!m) return this.resolve([]);
					for (var x = Array(m), S = 0, C = -1, w = new this(u); ++C < m;) h(e[C], C);
					return w;
					function h(e, C) {
						t.resolve(e).then(function(e) {
							x[C] = e, ++S !== m || v || (v = !0, y.resolve(w, x));
						}, function(e) {
							v || (v = !0, y.reject(w, e));
						});
					}
				}, o.race = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var m = e.length, v = !1;
					if (!m) return this.resolve([]);
					for (var x = -1, S = new this(u); ++x < m;) C = e[x], t.resolve(C).then(function(e) {
						v || (v = !0, y.resolve(S, e));
					}, function(e) {
						v || (v = !0, y.reject(S, e));
					});
					var C;
					return S;
				};
			}, { immediate: 36 }],
			38: [function(e, t, m) {
				var v = {};
				(0, e("./lib/utils/common").assign)(v, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = v;
			}, {
				"./lib/deflate": 39,
				"./lib/inflate": 40,
				"./lib/utils/common": 41,
				"./lib/zlib/constants": 44
			}],
			39: [function(e, t, m) {
				var v = e("./zlib/deflate"), y = e("./utils/common"), x = e("./utils/strings"), S = e("./zlib/messages"), C = e("./zlib/zstream"), w = Object.prototype.toString, E = 0, O = -1, k = 0, ee = 8;
				function p(e) {
					if (!(this instanceof p)) return new p(e);
					this.options = y.assign({
						level: O,
						method: ee,
						chunkSize: 16384,
						windowBits: 15,
						memLevel: 8,
						strategy: k,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new C(), this.strm.avail_out = 0;
					var m = v.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
					if (m !== E) throw Error(S[m]);
					if (t.header && v.deflateSetHeader(this.strm, t.header), t.dictionary) {
						var I;
						if (I = typeof t.dictionary == "string" ? x.string2buf(t.dictionary) : w.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, (m = v.deflateSetDictionary(this.strm, I)) !== E) throw Error(S[m]);
						this._dict_set = !0;
					}
				}
				function n(e, t) {
					var m = new p(t);
					if (m.push(e, !0), m.err) throw m.msg || S[m.err];
					return m.result;
				}
				p.prototype.push = function(e, t) {
					var m, S, C = this.strm, O = this.options.chunkSize;
					if (this.ended) return !1;
					S = t === ~~t ? t : !0 === t ? 4 : 0, typeof e == "string" ? C.input = x.string2buf(e) : w.call(e) === "[object ArrayBuffer]" ? C.input = new Uint8Array(e) : C.input = e, C.next_in = 0, C.avail_in = C.input.length;
					do {
						if (C.avail_out === 0 && (C.output = new y.Buf8(O), C.next_out = 0, C.avail_out = O), (m = v.deflate(C, S)) !== 1 && m !== E) return this.onEnd(m), !(this.ended = !0);
						C.avail_out !== 0 && (C.avail_in !== 0 || S !== 4 && S !== 2) || (this.options.to === "string" ? this.onData(x.buf2binstring(y.shrinkBuf(C.output, C.next_out))) : this.onData(y.shrinkBuf(C.output, C.next_out)));
					} while ((0 < C.avail_in || C.avail_out === 0) && m !== 1);
					return S === 4 ? (m = v.deflateEnd(this.strm), this.onEnd(m), this.ended = !0, m === E) : S !== 2 || (this.onEnd(E), !(C.avail_out = 0));
				}, p.prototype.onData = function(e) {
					this.chunks.push(e);
				}, p.prototype.onEnd = function(e) {
					e === E && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = y.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, m.Deflate = p, m.deflate = n, m.deflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, n(e, t);
				}, m.gzip = function(e, t) {
					return (t ||= {}).gzip = !0, n(e, t);
				};
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/deflate": 46,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			40: [function(e, t, m) {
				var v = e("./zlib/inflate"), y = e("./utils/common"), x = e("./utils/strings"), S = e("./zlib/constants"), C = e("./zlib/messages"), w = e("./zlib/zstream"), E = e("./zlib/gzheader"), O = Object.prototype.toString;
				function a(e) {
					if (!(this instanceof a)) return new a(e);
					this.options = y.assign({
						chunkSize: 16384,
						windowBits: 0,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && !(15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new w(), this.strm.avail_out = 0;
					var m = v.inflateInit2(this.strm, t.windowBits);
					if (m !== S.Z_OK) throw Error(C[m]);
					this.header = new E(), v.inflateGetHeader(this.strm, this.header);
				}
				function o(e, t) {
					var m = new a(t);
					if (m.push(e, !0), m.err) throw m.msg || C[m.err];
					return m.result;
				}
				a.prototype.push = function(e, t) {
					var m, C, w, E, k, ee, I = this.strm, te = this.options.chunkSize, z = this.options.dictionary, ne = !1;
					if (this.ended) return !1;
					C = t === ~~t ? t : !0 === t ? S.Z_FINISH : S.Z_NO_FLUSH, typeof e == "string" ? I.input = x.binstring2buf(e) : O.call(e) === "[object ArrayBuffer]" ? I.input = new Uint8Array(e) : I.input = e, I.next_in = 0, I.avail_in = I.input.length;
					do {
						if (I.avail_out === 0 && (I.output = new y.Buf8(te), I.next_out = 0, I.avail_out = te), (m = v.inflate(I, S.Z_NO_FLUSH)) === S.Z_NEED_DICT && z && (ee = typeof z == "string" ? x.string2buf(z) : O.call(z) === "[object ArrayBuffer]" ? new Uint8Array(z) : z, m = v.inflateSetDictionary(this.strm, ee)), m === S.Z_BUF_ERROR && !0 === ne && (m = S.Z_OK, ne = !1), m !== S.Z_STREAM_END && m !== S.Z_OK) return this.onEnd(m), !(this.ended = !0);
						I.next_out && (I.avail_out !== 0 && m !== S.Z_STREAM_END && (I.avail_in !== 0 || C !== S.Z_FINISH && C !== S.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = x.utf8border(I.output, I.next_out), E = I.next_out - w, k = x.buf2string(I.output, w), I.next_out = E, I.avail_out = te - E, E && y.arraySet(I.output, I.output, w, E, 0), this.onData(k)) : this.onData(y.shrinkBuf(I.output, I.next_out)))), I.avail_in === 0 && I.avail_out === 0 && (ne = !0);
					} while ((0 < I.avail_in || I.avail_out === 0) && m !== S.Z_STREAM_END);
					return m === S.Z_STREAM_END && (C = S.Z_FINISH), C === S.Z_FINISH ? (m = v.inflateEnd(this.strm), this.onEnd(m), this.ended = !0, m === S.Z_OK) : C !== S.Z_SYNC_FLUSH || (this.onEnd(S.Z_OK), !(I.avail_out = 0));
				}, a.prototype.onData = function(e) {
					this.chunks.push(e);
				}, a.prototype.onEnd = function(e) {
					e === S.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = y.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, m.Inflate = a, m.inflate = o, m.inflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, o(e, t);
				}, m.ungzip = o;
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/constants": 44,
				"./zlib/gzheader": 47,
				"./zlib/inflate": 49,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			41: [function(e, t, m) {
				var v = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
				m.assign = function(e) {
					for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
						var m = t.shift();
						if (m) {
							if (typeof m != "object") throw TypeError(m + "must be non-object");
							for (var v in m) m.hasOwnProperty(v) && (e[v] = m[v]);
						}
					}
					return e;
				}, m.shrinkBuf = function(e, t) {
					return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
				};
				var y = {
					arraySet: function(e, t, m, v, y) {
						if (t.subarray && e.subarray) e.set(t.subarray(m, m + v), y);
						else for (var x = 0; x < v; x++) e[y + x] = t[m + x];
					},
					flattenChunks: function(e) {
						var t, m, v, y, x, S;
						for (t = v = 0, m = e.length; t < m; t++) v += e[t].length;
						for (S = new Uint8Array(v), t = y = 0, m = e.length; t < m; t++) x = e[t], S.set(x, y), y += x.length;
						return S;
					}
				}, x = {
					arraySet: function(e, t, m, v, y) {
						for (var x = 0; x < v; x++) e[y + x] = t[m + x];
					},
					flattenChunks: function(e) {
						return [].concat.apply([], e);
					}
				};
				m.setTyped = function(e) {
					e ? (m.Buf8 = Uint8Array, m.Buf16 = Uint16Array, m.Buf32 = Int32Array, m.assign(m, y)) : (m.Buf8 = Array, m.Buf16 = Array, m.Buf32 = Array, m.assign(m, x));
				}, m.setTyped(v);
			}, {}],
			42: [function(e, t, m) {
				var v = e("./common"), y = !0, x = !0;
				try {
					String.fromCharCode.apply(null, [0]);
				} catch {
					y = !1;
				}
				try {
					String.fromCharCode.apply(null, new Uint8Array(1));
				} catch {
					x = !1;
				}
				for (var S = new v.Buf8(256), C = 0; C < 256; C++) S[C] = 252 <= C ? 6 : 248 <= C ? 5 : 240 <= C ? 4 : 224 <= C ? 3 : 192 <= C ? 2 : 1;
				function l(e, t) {
					if (t < 65537 && (e.subarray && x || !e.subarray && y)) return String.fromCharCode.apply(null, v.shrinkBuf(e, t));
					for (var m = "", S = 0; S < t; S++) m += String.fromCharCode(e[S]);
					return m;
				}
				S[254] = S[254] = 1, m.string2buf = function(e) {
					var t, m, y, x, S, C = e.length, w = 0;
					for (x = 0; x < C; x++) (64512 & (m = e.charCodeAt(x))) == 55296 && x + 1 < C && (64512 & (y = e.charCodeAt(x + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (y - 56320), x++), w += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
					for (t = new v.Buf8(w), x = S = 0; S < w; x++) (64512 & (m = e.charCodeAt(x))) == 55296 && x + 1 < C && (64512 & (y = e.charCodeAt(x + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (y - 56320), x++), m < 128 ? t[S++] = m : (m < 2048 ? t[S++] = 192 | m >>> 6 : (m < 65536 ? t[S++] = 224 | m >>> 12 : (t[S++] = 240 | m >>> 18, t[S++] = 128 | m >>> 12 & 63), t[S++] = 128 | m >>> 6 & 63), t[S++] = 128 | 63 & m);
					return t;
				}, m.buf2binstring = function(e) {
					return l(e, e.length);
				}, m.binstring2buf = function(e) {
					for (var t = new v.Buf8(e.length), m = 0, y = t.length; m < y; m++) t[m] = e.charCodeAt(m);
					return t;
				}, m.buf2string = function(e, t) {
					var m, v, y, x, C = t || e.length, w = Array(2 * C);
					for (m = v = 0; m < C;) if ((y = e[m++]) < 128) w[v++] = y;
					else if (4 < (x = S[y])) w[v++] = 65533, m += x - 1;
					else {
						for (y &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && m < C;) y = y << 6 | 63 & e[m++], x--;
						1 < x ? w[v++] = 65533 : y < 65536 ? w[v++] = y : (y -= 65536, w[v++] = 55296 | y >> 10 & 1023, w[v++] = 56320 | 1023 & y);
					}
					return l(w, v);
				}, m.utf8border = function(e, t) {
					var m;
					for ((t ||= e.length) > e.length && (t = e.length), m = t - 1; 0 <= m && (192 & e[m]) == 128;) m--;
					return m < 0 || m === 0 ? t : m + S[e[m]] > t ? m : t;
				};
			}, { "./common": 41 }],
			43: [function(e, t, m) {
				t.exports = function(e, t, m, v) {
					for (var y = 65535 & e | 0, x = e >>> 16 & 65535 | 0, S = 0; m !== 0;) {
						for (m -= S = 2e3 < m ? 2e3 : m; x = x + (y = y + t[v++] | 0) | 0, --S;);
						y %= 65521, x %= 65521;
					}
					return y | x << 16 | 0;
				};
			}, {}],
			44: [function(e, t, m) {
				t.exports = {
					Z_NO_FLUSH: 0,
					Z_PARTIAL_FLUSH: 1,
					Z_SYNC_FLUSH: 2,
					Z_FULL_FLUSH: 3,
					Z_FINISH: 4,
					Z_BLOCK: 5,
					Z_TREES: 6,
					Z_OK: 0,
					Z_STREAM_END: 1,
					Z_NEED_DICT: 2,
					Z_ERRNO: -1,
					Z_STREAM_ERROR: -2,
					Z_DATA_ERROR: -3,
					Z_BUF_ERROR: -5,
					Z_NO_COMPRESSION: 0,
					Z_BEST_SPEED: 1,
					Z_BEST_COMPRESSION: 9,
					Z_DEFAULT_COMPRESSION: -1,
					Z_FILTERED: 1,
					Z_HUFFMAN_ONLY: 2,
					Z_RLE: 3,
					Z_FIXED: 4,
					Z_DEFAULT_STRATEGY: 0,
					Z_BINARY: 0,
					Z_TEXT: 1,
					Z_UNKNOWN: 2,
					Z_DEFLATED: 8
				};
			}, {}],
			45: [function(e, t, m) {
				var v = function() {
					for (var e, t = [], m = 0; m < 256; m++) {
						e = m;
						for (var v = 0; v < 8; v++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[m] = e;
					}
					return t;
				}();
				t.exports = function(e, t, m, y) {
					var x = v, S = y + m;
					e ^= -1;
					for (var C = y; C < S; C++) e = e >>> 8 ^ x[255 & (e ^ t[C])];
					return -1 ^ e;
				};
			}, {}],
			46: [function(e, t, m) {
				var v, y = e("../utils/common"), x = e("./trees"), S = e("./adler32"), C = e("./crc32"), w = e("./messages"), E = 0, O = 4, k = 0, ee = -2, I = -1, te = 4, z = 2, ne = 8, re = 9, ie = 286, B = 30, q = 19, ae = 2 * ie + 1, oe = 15, Q = 3, se = 258, ce = se + Q + 1, le = 42, ue = 113, de = 1, fe = 2, pe = 3, me = 4;
				function R(e, t) {
					return e.msg = w[t], t;
				}
				function T(e) {
					return (e << 1) - (4 < e ? 9 : 0);
				}
				function D(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				function F(e) {
					var t = e.state, m = t.pending;
					m > e.avail_out && (m = e.avail_out), m !== 0 && (y.arraySet(e.output, t.pending_buf, t.pending_out, m, e.next_out), e.next_out += m, t.pending_out += m, e.total_out += m, e.avail_out -= m, t.pending -= m, t.pending === 0 && (t.pending_out = 0));
				}
				function N(e, t) {
					x._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, F(e.strm);
				}
				function U(e, t) {
					e.pending_buf[e.pending++] = t;
				}
				function P(e, t) {
					e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
				}
				function L(e, t) {
					var m, v, y = e.max_chain_length, x = e.strstart, S = e.prev_length, C = e.nice_match, w = e.strstart > e.w_size - ce ? e.strstart - (e.w_size - ce) : 0, E = e.window, O = e.w_mask, k = e.prev, ee = e.strstart + se, I = E[x + S - 1], te = E[x + S];
					e.prev_length >= e.good_match && (y >>= 2), C > e.lookahead && (C = e.lookahead);
					do
						if (E[(m = t) + S] === te && E[m + S - 1] === I && E[m] === E[x] && E[++m] === E[x + 1]) {
							x += 2, m++;
							do							;
while (E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && E[++x] === E[++m] && x < ee);
							if (v = se - (ee - x), x = ee - se, S < v) {
								if (e.match_start = t, C <= (S = v)) break;
								I = E[x + S - 1], te = E[x + S];
							}
						}
					while ((t = k[t & O]) > w && --y != 0);
					return S <= e.lookahead ? S : e.lookahead;
				}
				function j(e) {
					var t, m, v, x, w, E, O, k, ee, I, te = e.w_size;
					do {
						if (x = e.window_size - e.lookahead - e.strstart, e.strstart >= te + (te - ce)) {
							for (y.arraySet(e.window, e.window, te, te, 0), e.match_start -= te, e.strstart -= te, e.block_start -= te, t = m = e.hash_size; v = e.head[--t], e.head[t] = te <= v ? v - te : 0, --m;);
							for (t = m = te; v = e.prev[--t], e.prev[t] = te <= v ? v - te : 0, --m;);
							x += te;
						}
						if (e.strm.avail_in === 0) break;
						if (E = e.strm, O = e.window, k = e.strstart + e.lookahead, ee = x, I = void 0, I = E.avail_in, ee < I && (I = ee), m = I === 0 ? 0 : (E.avail_in -= I, y.arraySet(O, E.input, E.next_in, I, k), E.state.wrap === 1 ? E.adler = S(E.adler, O, I, k) : E.state.wrap === 2 && (E.adler = C(E.adler, O, I, k)), E.next_in += I, E.total_in += I, I), e.lookahead += m, e.lookahead + e.insert >= Q) for (w = e.strstart - e.insert, e.ins_h = e.window[w], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[w + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[w + Q - 1]) & e.hash_mask, e.prev[w & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = w, w++, e.insert--, !(e.lookahead + e.insert < Q)););
					} while (e.lookahead < ce && e.strm.avail_in !== 0);
				}
				function Z(e, t) {
					for (var m, v;;) {
						if (e.lookahead < ce) {
							if (j(e), e.lookahead < ce && t === E) return de;
							if (e.lookahead === 0) break;
						}
						if (m = 0, e.lookahead >= Q && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + Q - 1]) & e.hash_mask, m = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), m !== 0 && e.strstart - m <= e.w_size - ce && (e.match_length = L(e, m)), e.match_length >= Q) if (v = x._tr_tally(e, e.strstart - e.match_start, e.match_length - Q), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= Q) {
							for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + Q - 1]) & e.hash_mask, m = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, --e.match_length != 0;);
							e.strstart++;
						} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
						else v = x._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
						if (v && (N(e, !1), e.strm.avail_out === 0)) return de;
					}
					return e.insert = e.strstart < Q - 1 ? e.strstart : Q - 1, t === O ? (N(e, !0), e.strm.avail_out === 0 ? pe : me) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? de : fe;
				}
				function W(e, t) {
					for (var m, v, y;;) {
						if (e.lookahead < ce) {
							if (j(e), e.lookahead < ce && t === E) return de;
							if (e.lookahead === 0) break;
						}
						if (m = 0, e.lookahead >= Q && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + Q - 1]) & e.hash_mask, m = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = Q - 1, m !== 0 && e.prev_length < e.max_lazy_match && e.strstart - m <= e.w_size - ce && (e.match_length = L(e, m), e.match_length <= 5 && (e.strategy === 1 || e.match_length === Q && 4096 < e.strstart - e.match_start) && (e.match_length = Q - 1)), e.prev_length >= Q && e.match_length <= e.prev_length) {
							for (y = e.strstart + e.lookahead - Q, v = x._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - Q), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= y && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + Q - 1]) & e.hash_mask, m = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), --e.prev_length != 0;);
							if (e.match_available = 0, e.match_length = Q - 1, e.strstart++, v && (N(e, !1), e.strm.avail_out === 0)) return de;
						} else if (e.match_available) {
							if ((v = x._tr_tally(e, 0, e.window[e.strstart - 1])) && N(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return de;
						} else e.match_available = 1, e.strstart++, e.lookahead--;
					}
					return e.match_available &&= (v = x._tr_tally(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < Q - 1 ? e.strstart : Q - 1, t === O ? (N(e, !0), e.strm.avail_out === 0 ? pe : me) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? de : fe;
				}
				function M(e, t, m, v, y) {
					this.good_length = e, this.max_lazy = t, this.nice_length = m, this.max_chain = v, this.func = y;
				}
				function H() {
					this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ne, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new y.Buf16(2 * ae), this.dyn_dtree = new y.Buf16(2 * (2 * B + 1)), this.bl_tree = new y.Buf16(2 * (2 * q + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new y.Buf16(oe + 1), this.heap = new y.Buf16(2 * ie + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new y.Buf16(2 * ie + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
				}
				function G(e) {
					var t;
					return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = z, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? le : ue, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = E, x._tr_init(t), k) : R(e, ee);
				}
				function K(e) {
					var t = G(e);
					return t === k && function(e) {
						e.window_size = 2 * e.w_size, D(e.head), e.max_lazy_match = v[e.level].max_lazy, e.good_match = v[e.level].good_length, e.nice_match = v[e.level].nice_length, e.max_chain_length = v[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = Q - 1, e.match_available = 0, e.ins_h = 0;
					}(e.state), t;
				}
				function Y(e, t, m, v, x, S) {
					if (!e) return ee;
					var C = 1;
					if (t === I && (t = 6), v < 0 ? (C = 0, v = -v) : 15 < v && (C = 2, v -= 16), x < 1 || re < x || m !== ne || v < 8 || 15 < v || t < 0 || 9 < t || S < 0 || te < S) return R(e, ee);
					v === 8 && (v = 9);
					var w = new H();
					return (e.state = w).strm = e, w.wrap = C, w.gzhead = null, w.w_bits = v, w.w_size = 1 << w.w_bits, w.w_mask = w.w_size - 1, w.hash_bits = x + 7, w.hash_size = 1 << w.hash_bits, w.hash_mask = w.hash_size - 1, w.hash_shift = ~~((w.hash_bits + Q - 1) / Q), w.window = new y.Buf8(2 * w.w_size), w.head = new y.Buf16(w.hash_size), w.prev = new y.Buf16(w.w_size), w.lit_bufsize = 1 << x + 6, w.pending_buf_size = 4 * w.lit_bufsize, w.pending_buf = new y.Buf8(w.pending_buf_size), w.d_buf = 1 * w.lit_bufsize, w.l_buf = 3 * w.lit_bufsize, w.level = t, w.strategy = S, w.method = m, K(e);
				}
				v = [
					new M(0, 0, 0, 0, function(e, t) {
						var m = 65535;
						for (m > e.pending_buf_size - 5 && (m = e.pending_buf_size - 5);;) {
							if (e.lookahead <= 1) {
								if (j(e), e.lookahead === 0 && t === E) return de;
								if (e.lookahead === 0) break;
							}
							e.strstart += e.lookahead, e.lookahead = 0;
							var v = e.block_start + m;
							if ((e.strstart === 0 || e.strstart >= v) && (e.lookahead = e.strstart - v, e.strstart = v, N(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - ce && (N(e, !1), e.strm.avail_out === 0)) return de;
						}
						return e.insert = 0, t === O ? (N(e, !0), e.strm.avail_out === 0 ? pe : me) : (e.strstart > e.block_start && (N(e, !1), e.strm.avail_out), de);
					}),
					new M(4, 4, 8, 4, Z),
					new M(4, 5, 16, 8, Z),
					new M(4, 6, 32, 32, Z),
					new M(4, 4, 16, 16, W),
					new M(8, 16, 32, 32, W),
					new M(8, 16, 128, 128, W),
					new M(8, 32, 128, 256, W),
					new M(32, 128, 258, 1024, W),
					new M(32, 258, 258, 4096, W)
				], m.deflateInit = function(e, t) {
					return Y(e, t, ne, 15, 8, 0);
				}, m.deflateInit2 = Y, m.deflateReset = K, m.deflateResetKeep = G, m.deflateSetHeader = function(e, t) {
					return e && e.state && e.state.wrap === 2 ? (e.state.gzhead = t, k) : ee;
				}, m.deflate = function(e, t) {
					var m, y, S, w;
					if (!e || !e.state || 5 < t || t < 0) return e ? R(e, ee) : ee;
					if (y = e.state, !e.output || !e.input && e.avail_in !== 0 || y.status === 666 && t !== O) return R(e, e.avail_out === 0 ? -5 : ee);
					if (y.strm = e, m = y.last_flush, y.last_flush = t, y.status === le) if (y.wrap === 2) e.adler = 0, U(y, 31), U(y, 139), U(y, 8), y.gzhead ? (U(y, +!!y.gzhead.text + (y.gzhead.hcrc ? 2 : 0) + (y.gzhead.extra ? 4 : 0) + (y.gzhead.name ? 8 : 0) + (y.gzhead.comment ? 16 : 0)), U(y, 255 & y.gzhead.time), U(y, y.gzhead.time >> 8 & 255), U(y, y.gzhead.time >> 16 & 255), U(y, y.gzhead.time >> 24 & 255), U(y, y.level === 9 ? 2 : 2 <= y.strategy || y.level < 2 ? 4 : 0), U(y, 255 & y.gzhead.os), y.gzhead.extra && y.gzhead.extra.length && (U(y, 255 & y.gzhead.extra.length), U(y, y.gzhead.extra.length >> 8 & 255)), y.gzhead.hcrc && (e.adler = C(e.adler, y.pending_buf, y.pending, 0)), y.gzindex = 0, y.status = 69) : (U(y, 0), U(y, 0), U(y, 0), U(y, 0), U(y, 0), U(y, y.level === 9 ? 2 : 2 <= y.strategy || y.level < 2 ? 4 : 0), U(y, 3), y.status = ue);
					else {
						var I = ne + (y.w_bits - 8 << 4) << 8;
						I |= (2 <= y.strategy || y.level < 2 ? 0 : y.level < 6 ? 1 : y.level === 6 ? 2 : 3) << 6, y.strstart !== 0 && (I |= 32), I += 31 - I % 31, y.status = ue, P(y, I), y.strstart !== 0 && (P(y, e.adler >>> 16), P(y, 65535 & e.adler)), e.adler = 1;
					}
					if (y.status === 69) if (y.gzhead.extra) {
						for (S = y.pending; y.gzindex < (65535 & y.gzhead.extra.length) && (y.pending !== y.pending_buf_size || (y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), F(e), S = y.pending, y.pending !== y.pending_buf_size));) U(y, 255 & y.gzhead.extra[y.gzindex]), y.gzindex++;
						y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), y.gzindex === y.gzhead.extra.length && (y.gzindex = 0, y.status = 73);
					} else y.status = 73;
					if (y.status === 73) if (y.gzhead.name) {
						S = y.pending;
						do {
							if (y.pending === y.pending_buf_size && (y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), F(e), S = y.pending, y.pending === y.pending_buf_size)) {
								w = 1;
								break;
							}
							w = y.gzindex < y.gzhead.name.length ? 255 & y.gzhead.name.charCodeAt(y.gzindex++) : 0, U(y, w);
						} while (w !== 0);
						y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), w === 0 && (y.gzindex = 0, y.status = 91);
					} else y.status = 91;
					if (y.status === 91) if (y.gzhead.comment) {
						S = y.pending;
						do {
							if (y.pending === y.pending_buf_size && (y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), F(e), S = y.pending, y.pending === y.pending_buf_size)) {
								w = 1;
								break;
							}
							w = y.gzindex < y.gzhead.comment.length ? 255 & y.gzhead.comment.charCodeAt(y.gzindex++) : 0, U(y, w);
						} while (w !== 0);
						y.gzhead.hcrc && y.pending > S && (e.adler = C(e.adler, y.pending_buf, y.pending - S, S)), w === 0 && (y.status = 103);
					} else y.status = 103;
					if (y.status === 103 && (y.gzhead.hcrc ? (y.pending + 2 > y.pending_buf_size && F(e), y.pending + 2 <= y.pending_buf_size && (U(y, 255 & e.adler), U(y, e.adler >> 8 & 255), e.adler = 0, y.status = ue)) : y.status = ue), y.pending !== 0) {
						if (F(e), e.avail_out === 0) return y.last_flush = -1, k;
					} else if (e.avail_in === 0 && T(t) <= T(m) && t !== O) return R(e, -5);
					if (y.status === 666 && e.avail_in !== 0) return R(e, -5);
					if (e.avail_in !== 0 || y.lookahead !== 0 || t !== E && y.status !== 666) {
						var te = y.strategy === 2 ? function(e, t) {
							for (var m;;) {
								if (e.lookahead === 0 && (j(e), e.lookahead === 0)) {
									if (t === E) return de;
									break;
								}
								if (e.match_length = 0, m = x._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, m && (N(e, !1), e.strm.avail_out === 0)) return de;
							}
							return e.insert = 0, t === O ? (N(e, !0), e.strm.avail_out === 0 ? pe : me) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? de : fe;
						}(y, t) : y.strategy === 3 ? function(e, t) {
							for (var m, v, y, S, C = e.window;;) {
								if (e.lookahead <= se) {
									if (j(e), e.lookahead <= se && t === E) return de;
									if (e.lookahead === 0) break;
								}
								if (e.match_length = 0, e.lookahead >= Q && 0 < e.strstart && (v = C[y = e.strstart - 1]) === C[++y] && v === C[++y] && v === C[++y]) {
									S = e.strstart + se;
									do									;
while (v === C[++y] && v === C[++y] && v === C[++y] && v === C[++y] && v === C[++y] && v === C[++y] && v === C[++y] && v === C[++y] && y < S);
									e.match_length = se - (S - y), e.match_length > e.lookahead && (e.match_length = e.lookahead);
								}
								if (e.match_length >= Q ? (m = x._tr_tally(e, 1, e.match_length - Q), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (m = x._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), m && (N(e, !1), e.strm.avail_out === 0)) return de;
							}
							return e.insert = 0, t === O ? (N(e, !0), e.strm.avail_out === 0 ? pe : me) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? de : fe;
						}(y, t) : v[y.level].func(y, t);
						if (te !== pe && te !== me || (y.status = 666), te === de || te === pe) return e.avail_out === 0 && (y.last_flush = -1), k;
						if (te === fe && (t === 1 ? x._tr_align(y) : t !== 5 && (x._tr_stored_block(y, 0, 0, !1), t === 3 && (D(y.head), y.lookahead === 0 && (y.strstart = 0, y.block_start = 0, y.insert = 0))), F(e), e.avail_out === 0)) return y.last_flush = -1, k;
					}
					return t === O ? y.wrap <= 0 ? 1 : (y.wrap === 2 ? (U(y, 255 & e.adler), U(y, e.adler >> 8 & 255), U(y, e.adler >> 16 & 255), U(y, e.adler >> 24 & 255), U(y, 255 & e.total_in), U(y, e.total_in >> 8 & 255), U(y, e.total_in >> 16 & 255), U(y, e.total_in >> 24 & 255)) : (P(y, e.adler >>> 16), P(y, 65535 & e.adler)), F(e), 0 < y.wrap && (y.wrap = -y.wrap), y.pending === 0 ? 1 : k) : k;
				}, m.deflateEnd = function(e) {
					var t;
					return e && e.state ? (t = e.state.status) !== le && t !== 69 && t !== 73 && t !== 91 && t !== 103 && t !== ue && t !== 666 ? R(e, ee) : (e.state = null, t === ue ? R(e, -3) : k) : ee;
				}, m.deflateSetDictionary = function(e, t) {
					var m, v, x, C, w, E, O, I, te = t.length;
					if (!e || !e.state || (C = (m = e.state).wrap) === 2 || C === 1 && m.status !== le || m.lookahead) return ee;
					for (C === 1 && (e.adler = S(e.adler, t, te, 0)), m.wrap = 0, te >= m.w_size && (C === 0 && (D(m.head), m.strstart = 0, m.block_start = 0, m.insert = 0), I = new y.Buf8(m.w_size), y.arraySet(I, t, te - m.w_size, m.w_size, 0), t = I, te = m.w_size), w = e.avail_in, E = e.next_in, O = e.input, e.avail_in = te, e.next_in = 0, e.input = t, j(m); m.lookahead >= Q;) {
						for (v = m.strstart, x = m.lookahead - (Q - 1); m.ins_h = (m.ins_h << m.hash_shift ^ m.window[v + Q - 1]) & m.hash_mask, m.prev[v & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = v, v++, --x;);
						m.strstart = v, m.lookahead = Q - 1, j(m);
					}
					return m.strstart += m.lookahead, m.block_start = m.strstart, m.insert = m.lookahead, m.lookahead = 0, m.match_length = m.prev_length = Q - 1, m.match_available = 0, e.next_in = E, e.input = O, e.avail_in = w, m.wrap = C, k;
				}, m.deflateInfo = "pako deflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./messages": 51,
				"./trees": 52
			}],
			47: [function(e, t, m) {
				t.exports = function() {
					this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
				};
			}, {}],
			48: [function(e, t, m) {
				t.exports = function(e, t) {
					var m = e.state, v = e.next_in, y, x, S, C, w, E, O, k, ee, I, te, z, ne, re, ie, B, q, ae, oe, Q, se, ce = e.input, le;
					y = v + (e.avail_in - 5), x = e.next_out, le = e.output, S = x - (t - e.avail_out), C = x + (e.avail_out - 257), w = m.dmax, E = m.wsize, O = m.whave, k = m.wnext, ee = m.window, I = m.hold, te = m.bits, z = m.lencode, ne = m.distcode, re = (1 << m.lenbits) - 1, ie = (1 << m.distbits) - 1;
					e: do {
						te < 15 && (I += ce[v++] << te, te += 8, I += ce[v++] << te, te += 8), B = z[I & re];
						t: for (;;) {
							if (I >>>= q = B >>> 24, te -= q, (q = B >>> 16 & 255) == 0) le[x++] = 65535 & B;
							else {
								if (!(16 & q)) {
									if (!(64 & q)) {
										B = z[(65535 & B) + (I & (1 << q) - 1)];
										continue t;
									}
									if (32 & q) {
										m.mode = 12;
										break e;
									}
									e.msg = "invalid literal/length code", m.mode = 30;
									break e;
								}
								ae = 65535 & B, (q &= 15) && (te < q && (I += ce[v++] << te, te += 8), ae += I & (1 << q) - 1, I >>>= q, te -= q), te < 15 && (I += ce[v++] << te, te += 8, I += ce[v++] << te, te += 8), B = ne[I & ie];
								r: for (;;) {
									if (I >>>= q = B >>> 24, te -= q, !(16 & (q = B >>> 16 & 255))) {
										if (!(64 & q)) {
											B = ne[(65535 & B) + (I & (1 << q) - 1)];
											continue r;
										}
										e.msg = "invalid distance code", m.mode = 30;
										break e;
									}
									if (oe = 65535 & B, te < (q &= 15) && (I += ce[v++] << te, (te += 8) < q && (I += ce[v++] << te, te += 8)), w < (oe += I & (1 << q) - 1)) {
										e.msg = "invalid distance too far back", m.mode = 30;
										break e;
									}
									if (I >>>= q, te -= q, (q = x - S) < oe) {
										if (O < (q = oe - q) && m.sane) {
											e.msg = "invalid distance too far back", m.mode = 30;
											break e;
										}
										if (se = ee, (Q = 0) === k) {
											if (Q += E - q, q < ae) {
												for (ae -= q; le[x++] = ee[Q++], --q;);
												Q = x - oe, se = le;
											}
										} else if (k < q) {
											if (Q += E + k - q, (q -= k) < ae) {
												for (ae -= q; le[x++] = ee[Q++], --q;);
												if (Q = 0, k < ae) {
													for (ae -= q = k; le[x++] = ee[Q++], --q;);
													Q = x - oe, se = le;
												}
											}
										} else if (Q += k - q, q < ae) {
											for (ae -= q; le[x++] = ee[Q++], --q;);
											Q = x - oe, se = le;
										}
										for (; 2 < ae;) le[x++] = se[Q++], le[x++] = se[Q++], le[x++] = se[Q++], ae -= 3;
										ae && (le[x++] = se[Q++], 1 < ae && (le[x++] = se[Q++]));
									} else {
										for (Q = x - oe; le[x++] = le[Q++], le[x++] = le[Q++], le[x++] = le[Q++], 2 < (ae -= 3););
										ae && (le[x++] = le[Q++], 1 < ae && (le[x++] = le[Q++]));
									}
									break;
								}
							}
							break;
						}
					} while (v < y && x < C);
					v -= ae = te >> 3, I &= (1 << (te -= ae << 3)) - 1, e.next_in = v, e.next_out = x, e.avail_in = v < y ? y - v + 5 : 5 - (v - y), e.avail_out = x < C ? C - x + 257 : 257 - (x - C), m.hold = I, m.bits = te;
				};
			}, {}],
			49: [function(e, t, m) {
				var v = e("../utils/common"), y = e("./adler32"), x = e("./crc32"), S = e("./inffast"), C = e("./inftrees"), w = 1, E = 2, O = 0, k = -2, ee = 1, I = 852, te = 592;
				function L(e) {
					return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
				}
				function s() {
					this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new v.Buf16(320), this.work = new v.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
				}
				function a(e) {
					var t;
					return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = ee, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new v.Buf32(I), t.distcode = t.distdyn = new v.Buf32(te), t.sane = 1, t.back = -1, O) : k;
				}
				function o(e) {
					var t;
					return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, a(e)) : k;
				}
				function h(e, t) {
					var m, v;
					return e && e.state ? (v = e.state, t < 0 ? (m = 0, t = -t) : (m = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? k : (v.window !== null && v.wbits !== t && (v.window = null), v.wrap = m, v.wbits = t, o(e))) : k;
				}
				function u(e, t) {
					var m, v;
					return e ? (v = new s(), (e.state = v).window = null, (m = h(e, t)) !== O && (e.state = null), m) : k;
				}
				var z, ne, re = !0;
				function j(e) {
					if (re) {
						var t;
						for (z = new v.Buf32(512), ne = new v.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
						for (; t < 256;) e.lens[t++] = 9;
						for (; t < 280;) e.lens[t++] = 7;
						for (; t < 288;) e.lens[t++] = 8;
						for (C(w, e.lens, 0, 288, z, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
						C(E, e.lens, 0, 32, ne, 0, e.work, { bits: 5 }), re = !1;
					}
					e.lencode = z, e.lenbits = 9, e.distcode = ne, e.distbits = 5;
				}
				function Z(e, t, m, y) {
					var x, S = e.state;
					return S.window === null && (S.wsize = 1 << S.wbits, S.wnext = 0, S.whave = 0, S.window = new v.Buf8(S.wsize)), y >= S.wsize ? (v.arraySet(S.window, t, m - S.wsize, S.wsize, 0), S.wnext = 0, S.whave = S.wsize) : (y < (x = S.wsize - S.wnext) && (x = y), v.arraySet(S.window, t, m - y, x, S.wnext), (y -= x) ? (v.arraySet(S.window, t, m - y, y, 0), S.wnext = y, S.whave = S.wsize) : (S.wnext += x, S.wnext === S.wsize && (S.wnext = 0), S.whave < S.wsize && (S.whave += x))), 0;
				}
				m.inflateReset = o, m.inflateReset2 = h, m.inflateResetKeep = a, m.inflateInit = function(e) {
					return u(e, 15);
				}, m.inflateInit2 = u, m.inflate = function(e, t) {
					var m, I, te, z, ne, re, ie, B, q, ae, oe, Q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye = 0, be = new v.Buf8(4), xe = [
						16,
						17,
						18,
						0,
						8,
						7,
						9,
						6,
						10,
						5,
						11,
						4,
						12,
						3,
						13,
						2,
						14,
						1,
						15
					];
					if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) return k;
					(m = e.state).mode === 12 && (m.mode = 13), ne = e.next_out, te = e.output, ie = e.avail_out, z = e.next_in, I = e.input, re = e.avail_in, B = m.hold, q = m.bits, ae = re, oe = ie, ge = O;
					e: for (;;) switch (m.mode) {
						case ee:
							if (m.wrap === 0) {
								m.mode = 13;
								break;
							}
							for (; q < 16;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if (2 & m.wrap && B === 35615) {
								be[m.check = 0] = 255 & B, be[1] = B >>> 8 & 255, m.check = x(m.check, be, 2, 0), q = B = 0, m.mode = 2;
								break;
							}
							if (m.flags = 0, m.head && (m.head.done = !1), !(1 & m.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
								e.msg = "incorrect header check", m.mode = 30;
								break;
							}
							if ((15 & B) != 8) {
								e.msg = "unknown compression method", m.mode = 30;
								break;
							}
							if (q -= 4, he = 8 + (15 & (B >>>= 4)), m.wbits === 0) m.wbits = he;
							else if (he > m.wbits) {
								e.msg = "invalid window size", m.mode = 30;
								break;
							}
							m.dmax = 1 << he, e.adler = m.check = 1, m.mode = 512 & B ? 10 : 12, q = B = 0;
							break;
						case 2:
							for (; q < 16;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if (m.flags = B, (255 & m.flags) != 8) {
								e.msg = "unknown compression method", m.mode = 30;
								break;
							}
							if (57344 & m.flags) {
								e.msg = "unknown header flags set", m.mode = 30;
								break;
							}
							m.head && (m.head.text = B >> 8 & 1), 512 & m.flags && (be[0] = 255 & B, be[1] = B >>> 8 & 255, m.check = x(m.check, be, 2, 0)), q = B = 0, m.mode = 3;
						case 3:
							for (; q < 32;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							m.head && (m.head.time = B), 512 & m.flags && (be[0] = 255 & B, be[1] = B >>> 8 & 255, be[2] = B >>> 16 & 255, be[3] = B >>> 24 & 255, m.check = x(m.check, be, 4, 0)), q = B = 0, m.mode = 4;
						case 4:
							for (; q < 16;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							m.head && (m.head.xflags = 255 & B, m.head.os = B >> 8), 512 & m.flags && (be[0] = 255 & B, be[1] = B >>> 8 & 255, m.check = x(m.check, be, 2, 0)), q = B = 0, m.mode = 5;
						case 5:
							if (1024 & m.flags) {
								for (; q < 16;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								m.length = B, m.head && (m.head.extra_len = B), 512 & m.flags && (be[0] = 255 & B, be[1] = B >>> 8 & 255, m.check = x(m.check, be, 2, 0)), q = B = 0;
							} else m.head && (m.head.extra = null);
							m.mode = 6;
						case 6:
							if (1024 & m.flags && (re < (Q = m.length) && (Q = re), Q && (m.head && (he = m.head.extra_len - m.length, m.head.extra || (m.head.extra = Array(m.head.extra_len)), v.arraySet(m.head.extra, I, z, Q, he)), 512 & m.flags && (m.check = x(m.check, I, Q, z)), re -= Q, z += Q, m.length -= Q), m.length)) break e;
							m.length = 0, m.mode = 7;
						case 7:
							if (2048 & m.flags) {
								if (re === 0) break e;
								for (Q = 0; he = I[z + Q++], m.head && he && m.length < 65536 && (m.head.name += String.fromCharCode(he)), he && Q < re;);
								if (512 & m.flags && (m.check = x(m.check, I, Q, z)), re -= Q, z += Q, he) break e;
							} else m.head && (m.head.name = null);
							m.length = 0, m.mode = 8;
						case 8:
							if (4096 & m.flags) {
								if (re === 0) break e;
								for (Q = 0; he = I[z + Q++], m.head && he && m.length < 65536 && (m.head.comment += String.fromCharCode(he)), he && Q < re;);
								if (512 & m.flags && (m.check = x(m.check, I, Q, z)), re -= Q, z += Q, he) break e;
							} else m.head && (m.head.comment = null);
							m.mode = 9;
						case 9:
							if (512 & m.flags) {
								for (; q < 16;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								if (B !== (65535 & m.check)) {
									e.msg = "header crc mismatch", m.mode = 30;
									break;
								}
								q = B = 0;
							}
							m.head && (m.head.hcrc = m.flags >> 9 & 1, m.head.done = !0), e.adler = m.check = 0, m.mode = 12;
							break;
						case 10:
							for (; q < 32;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							e.adler = m.check = L(B), q = B = 0, m.mode = 11;
						case 11:
							if (m.havedict === 0) return e.next_out = ne, e.avail_out = ie, e.next_in = z, e.avail_in = re, m.hold = B, m.bits = q, 2;
							e.adler = m.check = 1, m.mode = 12;
						case 12: if (t === 5 || t === 6) break e;
						case 13:
							if (m.last) {
								B >>>= 7 & q, q -= 7 & q, m.mode = 27;
								break;
							}
							for (; q < 3;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							switch (m.last = 1 & B, --q, 3 & (B >>>= 1)) {
								case 0:
									m.mode = 14;
									break;
								case 1:
									if (j(m), m.mode = 20, t !== 6) break;
									B >>>= 2, q -= 2;
									break e;
								case 2:
									m.mode = 17;
									break;
								case 3: e.msg = "invalid block type", m.mode = 30;
							}
							B >>>= 2, q -= 2;
							break;
						case 14:
							for (B >>>= 7 & q, q -= 7 & q; q < 32;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if ((65535 & B) != (B >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths", m.mode = 30;
								break;
							}
							if (m.length = 65535 & B, q = B = 0, m.mode = 15, t === 6) break e;
						case 15: m.mode = 16;
						case 16:
							if (Q = m.length) {
								if (re < Q && (Q = re), ie < Q && (Q = ie), Q === 0) break e;
								v.arraySet(te, I, z, Q, ne), re -= Q, z += Q, ie -= Q, ne += Q, m.length -= Q;
								break;
							}
							m.mode = 12;
							break;
						case 17:
							for (; q < 14;) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if (m.nlen = 257 + (31 & B), B >>>= 5, q -= 5, m.ndist = 1 + (31 & B), B >>>= 5, q -= 5, m.ncode = 4 + (15 & B), B >>>= 4, q -= 4, 286 < m.nlen || 30 < m.ndist) {
								e.msg = "too many length or distance symbols", m.mode = 30;
								break;
							}
							m.have = 0, m.mode = 18;
						case 18:
							for (; m.have < m.ncode;) {
								for (; q < 3;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								m.lens[xe[m.have++]] = 7 & B, B >>>= 3, q -= 3;
							}
							for (; m.have < 19;) m.lens[xe[m.have++]] = 0;
							if (m.lencode = m.lendyn, m.lenbits = 7, _e = { bits: m.lenbits }, ge = C(0, m.lens, 0, 19, m.lencode, 0, m.work, _e), m.lenbits = _e.bits, ge) {
								e.msg = "invalid code lengths set", m.mode = 30;
								break;
							}
							m.have = 0, m.mode = 19;
						case 19:
							for (; m.have < m.nlen + m.ndist;) {
								for (; ue = (ye = m.lencode[B & (1 << m.lenbits) - 1]) >>> 16 & 255, de = 65535 & ye, !((le = ye >>> 24) <= q);) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								if (de < 16) B >>>= le, q -= le, m.lens[m.have++] = de;
								else {
									if (de === 16) {
										for (ve = le + 2; q < ve;) {
											if (re === 0) break e;
											re--, B += I[z++] << q, q += 8;
										}
										if (B >>>= le, q -= le, m.have === 0) {
											e.msg = "invalid bit length repeat", m.mode = 30;
											break;
										}
										he = m.lens[m.have - 1], Q = 3 + (3 & B), B >>>= 2, q -= 2;
									} else if (de === 17) {
										for (ve = le + 3; q < ve;) {
											if (re === 0) break e;
											re--, B += I[z++] << q, q += 8;
										}
										q -= le, he = 0, Q = 3 + (7 & (B >>>= le)), B >>>= 3, q -= 3;
									} else {
										for (ve = le + 7; q < ve;) {
											if (re === 0) break e;
											re--, B += I[z++] << q, q += 8;
										}
										q -= le, he = 0, Q = 11 + (127 & (B >>>= le)), B >>>= 7, q -= 7;
									}
									if (m.have + Q > m.nlen + m.ndist) {
										e.msg = "invalid bit length repeat", m.mode = 30;
										break;
									}
									for (; Q--;) m.lens[m.have++] = he;
								}
							}
							if (m.mode === 30) break;
							if (m.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block", m.mode = 30;
								break;
							}
							if (m.lenbits = 9, _e = { bits: m.lenbits }, ge = C(w, m.lens, 0, m.nlen, m.lencode, 0, m.work, _e), m.lenbits = _e.bits, ge) {
								e.msg = "invalid literal/lengths set", m.mode = 30;
								break;
							}
							if (m.distbits = 6, m.distcode = m.distdyn, _e = { bits: m.distbits }, ge = C(E, m.lens, m.nlen, m.ndist, m.distcode, 0, m.work, _e), m.distbits = _e.bits, ge) {
								e.msg = "invalid distances set", m.mode = 30;
								break;
							}
							if (m.mode = 20, t === 6) break e;
						case 20: m.mode = 21;
						case 21:
							if (6 <= re && 258 <= ie) {
								e.next_out = ne, e.avail_out = ie, e.next_in = z, e.avail_in = re, m.hold = B, m.bits = q, S(e, oe), ne = e.next_out, te = e.output, ie = e.avail_out, z = e.next_in, I = e.input, re = e.avail_in, B = m.hold, q = m.bits, m.mode === 12 && (m.back = -1);
								break;
							}
							for (m.back = 0; ue = (ye = m.lencode[B & (1 << m.lenbits) - 1]) >>> 16 & 255, de = 65535 & ye, !((le = ye >>> 24) <= q);) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if (ue && !(240 & ue)) {
								for (fe = le, pe = ue, me = de; ue = (ye = m.lencode[me + ((B & (1 << fe + pe) - 1) >> fe)]) >>> 16 & 255, de = 65535 & ye, !(fe + (le = ye >>> 24) <= q);) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								B >>>= fe, q -= fe, m.back += fe;
							}
							if (B >>>= le, q -= le, m.back += le, m.length = de, ue === 0) {
								m.mode = 26;
								break;
							}
							if (32 & ue) {
								m.back = -1, m.mode = 12;
								break;
							}
							if (64 & ue) {
								e.msg = "invalid literal/length code", m.mode = 30;
								break;
							}
							m.extra = 15 & ue, m.mode = 22;
						case 22:
							if (m.extra) {
								for (ve = m.extra; q < ve;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								m.length += B & (1 << m.extra) - 1, B >>>= m.extra, q -= m.extra, m.back += m.extra;
							}
							m.was = m.length, m.mode = 23;
						case 23:
							for (; ue = (ye = m.distcode[B & (1 << m.distbits) - 1]) >>> 16 & 255, de = 65535 & ye, !((le = ye >>> 24) <= q);) {
								if (re === 0) break e;
								re--, B += I[z++] << q, q += 8;
							}
							if (!(240 & ue)) {
								for (fe = le, pe = ue, me = de; ue = (ye = m.distcode[me + ((B & (1 << fe + pe) - 1) >> fe)]) >>> 16 & 255, de = 65535 & ye, !(fe + (le = ye >>> 24) <= q);) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								B >>>= fe, q -= fe, m.back += fe;
							}
							if (B >>>= le, q -= le, m.back += le, 64 & ue) {
								e.msg = "invalid distance code", m.mode = 30;
								break;
							}
							m.offset = de, m.extra = 15 & ue, m.mode = 24;
						case 24:
							if (m.extra) {
								for (ve = m.extra; q < ve;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								m.offset += B & (1 << m.extra) - 1, B >>>= m.extra, q -= m.extra, m.back += m.extra;
							}
							if (m.offset > m.dmax) {
								e.msg = "invalid distance too far back", m.mode = 30;
								break;
							}
							m.mode = 25;
						case 25:
							if (ie === 0) break e;
							if (Q = oe - ie, m.offset > Q) {
								if ((Q = m.offset - Q) > m.whave && m.sane) {
									e.msg = "invalid distance too far back", m.mode = 30;
									break;
								}
								se = Q > m.wnext ? (Q -= m.wnext, m.wsize - Q) : m.wnext - Q, Q > m.length && (Q = m.length), ce = m.window;
							} else ce = te, se = ne - m.offset, Q = m.length;
							for (ie < Q && (Q = ie), ie -= Q, m.length -= Q; te[ne++] = ce[se++], --Q;);
							m.length === 0 && (m.mode = 21);
							break;
						case 26:
							if (ie === 0) break e;
							te[ne++] = m.length, ie--, m.mode = 21;
							break;
						case 27:
							if (m.wrap) {
								for (; q < 32;) {
									if (re === 0) break e;
									re--, B |= I[z++] << q, q += 8;
								}
								if (oe -= ie, e.total_out += oe, m.total += oe, oe && (e.adler = m.check = m.flags ? x(m.check, te, oe, ne - oe) : y(m.check, te, oe, ne - oe)), oe = ie, (m.flags ? B : L(B)) !== m.check) {
									e.msg = "incorrect data check", m.mode = 30;
									break;
								}
								q = B = 0;
							}
							m.mode = 28;
						case 28:
							if (m.wrap && m.flags) {
								for (; q < 32;) {
									if (re === 0) break e;
									re--, B += I[z++] << q, q += 8;
								}
								if (B !== (4294967295 & m.total)) {
									e.msg = "incorrect length check", m.mode = 30;
									break;
								}
								q = B = 0;
							}
							m.mode = 29;
						case 29:
							ge = 1;
							break e;
						case 30:
							ge = -3;
							break e;
						case 31: return -4;
						case 32:
						default: return k;
					}
					return e.next_out = ne, e.avail_out = ie, e.next_in = z, e.avail_in = re, m.hold = B, m.bits = q, (m.wsize || oe !== e.avail_out && m.mode < 30 && (m.mode < 27 || t !== 4)) && Z(e, e.output, e.next_out, oe - e.avail_out) ? (m.mode = 31, -4) : (ae -= e.avail_in, oe -= e.avail_out, e.total_in += ae, e.total_out += oe, m.total += oe, m.wrap && oe && (e.adler = m.check = m.flags ? x(m.check, te, oe, e.next_out - oe) : y(m.check, te, oe, e.next_out - oe)), e.data_type = m.bits + (m.last ? 64 : 0) + (m.mode === 12 ? 128 : 0) + (m.mode === 20 || m.mode === 15 ? 256 : 0), (ae == 0 && oe === 0 || t === 4) && ge === O && (ge = -5), ge);
				}, m.inflateEnd = function(e) {
					if (!e || !e.state) return k;
					var t = e.state;
					return t.window &&= null, e.state = null, O;
				}, m.inflateGetHeader = function(e, t) {
					var m;
					return e && e.state && 2 & (m = e.state).wrap ? ((m.head = t).done = !1, O) : k;
				}, m.inflateSetDictionary = function(e, t) {
					var m, v = t.length;
					return e && e.state ? (m = e.state).wrap !== 0 && m.mode !== 11 ? k : m.mode === 11 && y(1, t, v, 0) !== m.check ? -3 : Z(e, t, v, v) ? (m.mode = 31, -4) : (m.havedict = 1, O) : k;
				}, m.inflateInfo = "pako inflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./inffast": 48,
				"./inftrees": 50
			}],
			50: [function(e, t, m) {
				var v = e("../utils/common"), y = [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					13,
					15,
					17,
					19,
					23,
					27,
					31,
					35,
					43,
					51,
					59,
					67,
					83,
					99,
					115,
					131,
					163,
					195,
					227,
					258,
					0,
					0
				], x = [
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					17,
					17,
					17,
					17,
					18,
					18,
					18,
					18,
					19,
					19,
					19,
					19,
					20,
					20,
					20,
					20,
					21,
					21,
					21,
					21,
					16,
					72,
					78
				], S = [
					1,
					2,
					3,
					4,
					5,
					7,
					9,
					13,
					17,
					25,
					33,
					49,
					65,
					97,
					129,
					193,
					257,
					385,
					513,
					769,
					1025,
					1537,
					2049,
					3073,
					4097,
					6145,
					8193,
					12289,
					16385,
					24577,
					0,
					0
				], C = [
					16,
					16,
					16,
					16,
					17,
					17,
					18,
					18,
					19,
					19,
					20,
					20,
					21,
					21,
					22,
					22,
					23,
					23,
					24,
					24,
					25,
					25,
					26,
					26,
					27,
					27,
					28,
					28,
					29,
					29,
					64,
					64
				];
				t.exports = function(e, t, m, w, E, O, k, ee) {
					var I, te, z, ne, re, ie, B, q, ae, oe = ee.bits, Q = 0, se = 0, ce = 0, le = 0, ue = 0, de = 0, fe = 0, pe = 0, me = 0, he = 0, ge = null, _e = 0, ve = new v.Buf16(16), ye = new v.Buf16(16), be = null, xe = 0;
					for (Q = 0; Q <= 15; Q++) ve[Q] = 0;
					for (se = 0; se < w; se++) ve[t[m + se]]++;
					for (ue = oe, le = 15; 1 <= le && ve[le] === 0; le--);
					if (le < ue && (ue = le), le === 0) return E[O++] = 20971520, E[O++] = 20971520, ee.bits = 1, 0;
					for (ce = 1; ce < le && ve[ce] === 0; ce++);
					for (ue < ce && (ue = ce), Q = pe = 1; Q <= 15; Q++) if (pe <<= 1, (pe -= ve[Q]) < 0) return -1;
					if (0 < pe && (e === 0 || le !== 1)) return -1;
					for (ye[1] = 0, Q = 1; Q < 15; Q++) ye[Q + 1] = ye[Q] + ve[Q];
					for (se = 0; se < w; se++) t[m + se] !== 0 && (k[ye[t[m + se]]++] = se);
					if (ie = e === 0 ? (ge = be = k, 19) : e === 1 ? (ge = y, _e -= 257, be = x, xe -= 257, 256) : (ge = S, be = C, -1), Q = ce, re = O, fe = se = he = 0, z = -1, ne = (me = 1 << (de = ue)) - 1, e === 1 && 852 < me || e === 2 && 592 < me) return 1;
					for (;;) {
						for (B = Q - fe, ae = k[se] < ie ? (q = 0, k[se]) : k[se] > ie ? (q = be[xe + k[se]], ge[_e + k[se]]) : (q = 96, 0), I = 1 << Q - fe, ce = te = 1 << de; E[re + (he >> fe) + (te -= I)] = B << 24 | q << 16 | ae | 0, te !== 0;);
						for (I = 1 << Q - 1; he & I;) I >>= 1;
						if (I === 0 ? he = 0 : (he &= I - 1, he += I), se++, --ve[Q] == 0) {
							if (Q === le) break;
							Q = t[m + k[se]];
						}
						if (ue < Q && (he & ne) !== z) {
							for (fe === 0 && (fe = ue), re += ce, pe = 1 << (de = Q - fe); de + fe < le && !((pe -= ve[de + fe]) <= 0);) de++, pe <<= 1;
							if (me += 1 << de, e === 1 && 852 < me || e === 2 && 592 < me) return 1;
							E[z = he & ne] = ue << 24 | de << 16 | re - O | 0;
						}
					}
					return he !== 0 && (E[re + he] = Q - fe << 24 | 4194304), ee.bits = ue, 0;
				};
			}, { "../utils/common": 41 }],
			51: [function(e, t, m) {
				t.exports = {
					2: "need dictionary",
					1: "stream end",
					0: "",
					"-1": "file error",
					"-2": "stream error",
					"-3": "data error",
					"-4": "insufficient memory",
					"-5": "buffer error",
					"-6": "incompatible version"
				};
			}, {}],
			52: [function(e, t, m) {
				var v = e("../utils/common"), y = 0, x = 1;
				function n(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				var S = 0, C = 29, w = 256, E = w + 1 + C, O = 30, k = 19, ee = 2 * E + 1, I = 15, te = 16, z = 7, ne = 256, re = 16, ie = 17, B = 18, q = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					3,
					3,
					3,
					3,
					4,
					4,
					4,
					4,
					5,
					5,
					5,
					5,
					0
				], ae = [
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					2,
					3,
					3,
					4,
					4,
					5,
					5,
					6,
					6,
					7,
					7,
					8,
					8,
					9,
					9,
					10,
					10,
					11,
					11,
					12,
					12,
					13,
					13
				], oe = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					2,
					3,
					7
				], Q = [
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				], se = Array(2 * (E + 2));
				n(se);
				var ce = Array(2 * O);
				n(ce);
				var le = Array(512);
				n(le);
				var ue = Array(256);
				n(ue);
				var de = Array(C);
				n(de);
				var fe, pe, me, he = Array(O);
				function D(e, t, m, v, y) {
					this.static_tree = e, this.extra_bits = t, this.extra_base = m, this.elems = v, this.max_length = y, this.has_stree = e && e.length;
				}
				function F(e, t) {
					this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
				}
				function N(e) {
					return e < 256 ? le[e] : le[256 + (e >>> 7)];
				}
				function U(e, t) {
					e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
				}
				function P(e, t, m) {
					e.bi_valid > te - m ? (e.bi_buf |= t << e.bi_valid & 65535, U(e, e.bi_buf), e.bi_buf = t >> te - e.bi_valid, e.bi_valid += m - te) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += m);
				}
				function L(e, t, m) {
					P(e, m[2 * t], m[2 * t + 1]);
				}
				function j(e, t) {
					for (var m = 0; m |= 1 & e, e >>>= 1, m <<= 1, 0 < --t;);
					return m >>> 1;
				}
				function Z(e, t, m) {
					var v, y, x = Array(I + 1), S = 0;
					for (v = 1; v <= I; v++) x[v] = S = S + m[v - 1] << 1;
					for (y = 0; y <= t; y++) {
						var C = e[2 * y + 1];
						C !== 0 && (e[2 * y] = j(x[C]++, C));
					}
				}
				function W(e) {
					var t;
					for (t = 0; t < E; t++) e.dyn_ltree[2 * t] = 0;
					for (t = 0; t < O; t++) e.dyn_dtree[2 * t] = 0;
					for (t = 0; t < k; t++) e.bl_tree[2 * t] = 0;
					e.dyn_ltree[2 * ne] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
				}
				function M(e) {
					8 < e.bi_valid ? U(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
				}
				function H(e, t, m, v) {
					var y = 2 * t, x = 2 * m;
					return e[y] < e[x] || e[y] === e[x] && v[t] <= v[m];
				}
				function G(e, t, m) {
					for (var v = e.heap[m], y = m << 1; y <= e.heap_len && (y < e.heap_len && H(t, e.heap[y + 1], e.heap[y], e.depth) && y++, !H(t, v, e.heap[y], e.depth));) e.heap[m] = e.heap[y], m = y, y <<= 1;
					e.heap[m] = v;
				}
				function K(e, t, m) {
					var v, y, x, S, C = 0;
					if (e.last_lit !== 0) for (; v = e.pending_buf[e.d_buf + 2 * C] << 8 | e.pending_buf[e.d_buf + 2 * C + 1], y = e.pending_buf[e.l_buf + C], C++, v === 0 ? L(e, y, t) : (L(e, (x = ue[y]) + w + 1, t), (S = q[x]) !== 0 && P(e, y -= de[x], S), L(e, x = N(--v), m), (S = ae[x]) !== 0 && P(e, v -= he[x], S)), C < e.last_lit;);
					L(e, ne, t);
				}
				function Y(e, t) {
					var m, v, y, x = t.dyn_tree, S = t.stat_desc.static_tree, C = t.stat_desc.has_stree, w = t.stat_desc.elems, E = -1;
					for (e.heap_len = 0, e.heap_max = ee, m = 0; m < w; m++) x[2 * m] === 0 ? x[2 * m + 1] = 0 : (e.heap[++e.heap_len] = E = m, e.depth[m] = 0);
					for (; e.heap_len < 2;) x[2 * (y = e.heap[++e.heap_len] = E < 2 ? ++E : 0)] = 1, e.depth[y] = 0, e.opt_len--, C && (e.static_len -= S[2 * y + 1]);
					for (t.max_code = E, m = e.heap_len >> 1; 1 <= m; m--) G(e, x, m);
					for (y = w; m = e.heap[1], e.heap[1] = e.heap[e.heap_len--], G(e, x, 1), v = e.heap[1], e.heap[--e.heap_max] = m, e.heap[--e.heap_max] = v, x[2 * y] = x[2 * m] + x[2 * v], e.depth[y] = (e.depth[m] >= e.depth[v] ? e.depth[m] : e.depth[v]) + 1, x[2 * m + 1] = x[2 * v + 1] = y, e.heap[1] = y++, G(e, x, 1), 2 <= e.heap_len;);
					e.heap[--e.heap_max] = e.heap[1], function(e, t) {
						var m, v, y, x, S, C, w = t.dyn_tree, E = t.max_code, O = t.stat_desc.static_tree, k = t.stat_desc.has_stree, te = t.stat_desc.extra_bits, z = t.stat_desc.extra_base, ne = t.stat_desc.max_length, re = 0;
						for (x = 0; x <= I; x++) e.bl_count[x] = 0;
						for (w[2 * e.heap[e.heap_max] + 1] = 0, m = e.heap_max + 1; m < ee; m++) ne < (x = w[2 * w[2 * (v = e.heap[m]) + 1] + 1] + 1) && (x = ne, re++), w[2 * v + 1] = x, E < v || (e.bl_count[x]++, S = 0, z <= v && (S = te[v - z]), C = w[2 * v], e.opt_len += C * (x + S), k && (e.static_len += C * (O[2 * v + 1] + S)));
						if (re !== 0) {
							do {
								for (x = ne - 1; e.bl_count[x] === 0;) x--;
								e.bl_count[x]--, e.bl_count[x + 1] += 2, e.bl_count[ne]--, re -= 2;
							} while (0 < re);
							for (x = ne; x !== 0; x--) for (v = e.bl_count[x]; v !== 0;) E < (y = e.heap[--m]) || (w[2 * y + 1] !== x && (e.opt_len += (x - w[2 * y + 1]) * w[2 * y], w[2 * y + 1] = x), v--);
						}
					}(e, t), Z(x, E, e.bl_count);
				}
				function X(e, t, m) {
					var v, y, x = -1, S = t[1], C = 0, w = 7, E = 4;
					for (S === 0 && (w = 138, E = 3), t[2 * (m + 1) + 1] = 65535, v = 0; v <= m; v++) y = S, S = t[2 * (v + 1) + 1], ++C < w && y === S || (C < E ? e.bl_tree[2 * y] += C : y === 0 ? C <= 10 ? e.bl_tree[2 * ie]++ : e.bl_tree[2 * B]++ : (y !== x && e.bl_tree[2 * y]++, e.bl_tree[2 * re]++), x = y, E = (C = 0) === S ? (w = 138, 3) : y === S ? (w = 6, 3) : (w = 7, 4));
				}
				function V(e, t, m) {
					var v, y, x = -1, S = t[1], C = 0, w = 7, E = 4;
					for (S === 0 && (w = 138, E = 3), v = 0; v <= m; v++) if (y = S, S = t[2 * (v + 1) + 1], !(++C < w && y === S)) {
						if (C < E) for (; L(e, y, e.bl_tree), --C != 0;);
						else y === 0 ? C <= 10 ? (L(e, ie, e.bl_tree), P(e, C - 3, 3)) : (L(e, B, e.bl_tree), P(e, C - 11, 7)) : (y !== x && (L(e, y, e.bl_tree), C--), L(e, re, e.bl_tree), P(e, C - 3, 2));
						x = y, E = (C = 0) === S ? (w = 138, 3) : y === S ? (w = 6, 3) : (w = 7, 4);
					}
				}
				n(he);
				var ge = !1;
				function J(e, t, m, y) {
					P(e, (S << 1) + +!!y, 3), function(e, t, m, y) {
						M(e), y && (U(e, m), U(e, ~m)), v.arraySet(e.pending_buf, e.window, t, m, e.pending), e.pending += m;
					}(e, t, m, !0);
				}
				m._tr_init = function(e) {
					ge ||= (function() {
						var e, t, m, v, y, x = Array(I + 1);
						for (v = m = 0; v < C - 1; v++) for (de[v] = m, e = 0; e < 1 << q[v]; e++) ue[m++] = v;
						for (ue[m - 1] = v, v = y = 0; v < 16; v++) for (he[v] = y, e = 0; e < 1 << ae[v]; e++) le[y++] = v;
						for (y >>= 7; v < O; v++) for (he[v] = y << 7, e = 0; e < 1 << ae[v] - 7; e++) le[256 + y++] = v;
						for (t = 0; t <= I; t++) x[t] = 0;
						for (e = 0; e <= 143;) se[2 * e + 1] = 8, e++, x[8]++;
						for (; e <= 255;) se[2 * e + 1] = 9, e++, x[9]++;
						for (; e <= 279;) se[2 * e + 1] = 7, e++, x[7]++;
						for (; e <= 287;) se[2 * e + 1] = 8, e++, x[8]++;
						for (Z(se, E + 1, x), e = 0; e < O; e++) ce[2 * e + 1] = 5, ce[2 * e] = j(e, 5);
						fe = new D(se, q, w + 1, E, I), pe = new D(ce, ae, 0, O, I), me = new D([], oe, 0, k, z);
					}(), !0), e.l_desc = new F(e.dyn_ltree, fe), e.d_desc = new F(e.dyn_dtree, pe), e.bl_desc = new F(e.bl_tree, me), e.bi_buf = 0, e.bi_valid = 0, W(e);
				}, m._tr_stored_block = J, m._tr_flush_block = function(e, t, m, v) {
					var S, C, E = 0;
					0 < e.level ? (e.strm.data_type === 2 && (e.strm.data_type = function(e) {
						var t, m = 4093624447;
						for (t = 0; t <= 31; t++, m >>>= 1) if (1 & m && e.dyn_ltree[2 * t] !== 0) return y;
						if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return x;
						for (t = 32; t < w; t++) if (e.dyn_ltree[2 * t] !== 0) return x;
						return y;
					}(e)), Y(e, e.l_desc), Y(e, e.d_desc), E = function(e) {
						var t;
						for (X(e, e.dyn_ltree, e.l_desc.max_code), X(e, e.dyn_dtree, e.d_desc.max_code), Y(e, e.bl_desc), t = k - 1; 3 <= t && e.bl_tree[2 * Q[t] + 1] === 0; t--);
						return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
					}(e), S = e.opt_len + 3 + 7 >>> 3, (C = e.static_len + 3 + 7 >>> 3) <= S && (S = C)) : S = C = m + 5, m + 4 <= S && t !== -1 ? J(e, t, m, v) : e.strategy === 4 || C === S ? (P(e, 2 + +!!v, 3), K(e, se, ce)) : (P(e, 4 + +!!v, 3), function(e, t, m, v) {
						var y;
						for (P(e, t - 257, 5), P(e, m - 1, 5), P(e, v - 4, 4), y = 0; y < v; y++) P(e, e.bl_tree[2 * Q[y] + 1], 3);
						V(e, e.dyn_ltree, t - 1), V(e, e.dyn_dtree, m - 1);
					}(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, E + 1), K(e, e.dyn_ltree, e.dyn_dtree)), W(e), v && M(e);
				}, m._tr_tally = function(e, t, m) {
					return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & m, e.last_lit++, t === 0 ? e.dyn_ltree[2 * m]++ : (e.matches++, t--, e.dyn_ltree[2 * (ue[m] + w + 1)]++, e.dyn_dtree[2 * N(t)]++), e.last_lit === e.lit_bufsize - 1;
				}, m._tr_align = function(e) {
					P(e, 2, 3), L(e, ne, se), function(e) {
						e.bi_valid === 16 ? (U(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
					}(e);
				};
			}, { "../utils/common": 41 }],
			53: [function(e, t, m) {
				t.exports = function() {
					this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
				};
			}, {}],
			54: [function(e, t, m) {
				(function(e) {
					(function(e, t) {
						if (!e.setImmediate) {
							var m, v, y, x, S = 1, C = {}, w = !1, E = e.document, O = Object.getPrototypeOf && Object.getPrototypeOf(e);
							O = O && O.setTimeout ? O : e, m = {}.toString.call(e.process) === "[object process]" ? function(e) {
								process.nextTick(function() {
									c(e);
								});
							} : function() {
								if (e.postMessage && !e.importScripts) {
									var t = !0, m = e.onmessage;
									return e.onmessage = function() {
										t = !1;
									}, e.postMessage("", "*"), e.onmessage = m, t;
								}
							}() ? (x = "setImmediate$" + Math.random() + "$", e.addEventListener ? e.addEventListener("message", d, !1) : e.attachEvent("onmessage", d), function(t) {
								e.postMessage(x + t, "*");
							}) : e.MessageChannel ? ((y = new MessageChannel()).port1.onmessage = function(e) {
								c(e.data);
							}, function(e) {
								y.port2.postMessage(e);
							}) : E && "onreadystatechange" in E.createElement("script") ? (v = E.documentElement, function(e) {
								var t = E.createElement("script");
								t.onreadystatechange = function() {
									c(e), t.onreadystatechange = null, v.removeChild(t), t = null;
								}, v.appendChild(t);
							}) : function(e) {
								setTimeout(c, 0, e);
							}, O.setImmediate = function(e) {
								typeof e != "function" && (e = Function("" + e));
								for (var t = Array(arguments.length - 1), v = 0; v < t.length; v++) t[v] = arguments[v + 1];
								return C[S] = {
									callback: e,
									args: t
								}, m(S), S++;
							}, O.clearImmediate = f;
						}
						function f(e) {
							delete C[e];
						}
						function c(e) {
							if (w) setTimeout(c, 0, e);
							else {
								var m = C[e];
								if (m) {
									w = !0;
									try {
										(function(e) {
											var m = e.callback, v = e.args;
											switch (v.length) {
												case 0:
													m();
													break;
												case 1:
													m(v[0]);
													break;
												case 2:
													m(v[0], v[1]);
													break;
												case 3:
													m(v[0], v[1], v[2]);
													break;
												default: m.apply(t, v);
											}
										})(m);
									} finally {
										f(e), w = !1;
									}
								}
							}
						}
						function d(t) {
							t.source === e && typeof t.data == "string" && t.data.indexOf(x) === 0 && c(+t.data.slice(x.length));
						}
					})(typeof self > "u" ? e === void 0 ? this : e : self);
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}]
		}, {}, [10])(10);
	});
})))()), xt = foundry.applications.api.ApplicationV2, St = foundry.applications.api.HandlebarsApplicationMixin, Ct = ve.log_prefix, wt;
async function mountLCPManager(e, t) {
	return wt ||= (await import("./LCPManager-mUuDIV7W.mjs")).default, y(wt, {
		target: e,
		props: t
	});
}
function addLCPManagerButton(e, t) {
	if (!game.user?.isGM) return;
	let m = t.querySelector(".header-actions");
	if (!m) {
		ui.notifications.error("Unable to add LCP Manager button - Compendium Tab buttons not found!", { permanent: !0 }), console.log(`${Ct} Unable to add LCP Manager button - Compendium Tab buttons not found!`, m);
		return;
	}
	let v = document.createElement("button");
	v.setAttribute("id", "lcp-manager-button"), v.setAttribute("style", "flex-basis: 100%;margin-top: 5px;"), v.innerHTML = "<i class='cci cci-content-manager i--2'></i> LANCER Compendium Manager", m.append(v), v.addEventListener("click", () => {
		new LCPManager().render(!0);
	});
}
var LCPIndex = class {
	constructor(e) {
		e ? this.index = e : this.index = [];
	}
	addManifest(e) {
		this.index.push(e);
	}
	updateManifest(e) {
		for (let t = 0; t < this.index.length; t++) {
			let m = this.index[t];
			if (m.name === e.name && m.author === e.author) {
				this.index.splice(t, 1);
				break;
			}
		}
		this.addManifest(e);
	}
}, LCPManager = class extends St(xt) {
	constructor(e = {}) {
		super(e), this.component = null, this.renderPromise = null;
	}
	static {
		this.DEFAULT_OPTIONS = {
			id: "lcp-manager",
			window: {
				title: "LANCER Compendium Manager",
				icon: "cci cci-content-manager i--3",
				resizable: !1
			},
			classes: ["lancer", "lcp-manager"],
			position: {
				width: 1200,
				height: 800
			}
		};
	}
	static {
		this.PARTS = { lcpManager: { template: "systems/lancer/templates/lcp/lcp-manager-2.hbs" } };
	}
	async _prepareContext(e) {
		return {};
	}
	_onFirstRender(e, t) {
		super._onRender(e, t);
		let m = $(this.element).find(".svelte-app-mount");
		!m || !m.length || (this.renderPromise = mountLCPManager(m[0], e), this.renderPromise?.then((e) => this.component = e));
	}
	async render(e) {
		return await super.render(e), this.renderPromise && await this.renderPromise, this;
	}
	injectContentPack(e) {
		this.component.$set({ injectedContentSummary: e });
	}
}, Tt = "core";
function isValidManifest(e) {
	return typeof e == "object" && "name" in e && typeof e.name == "string" && "author" in e && typeof e.author == "string" && "version" in e && typeof e.version == "string";
}
function generateLcpSummary(e) {
	let t = e.data ? e.data : e;
	return {
		...e.manifest,
		item_prefix: "",
		bonds: t.bonds?.length ?? 0,
		skills: t.skills?.length ?? 0,
		talents: t.talents?.length ?? 0,
		reserves: t.reserves?.length ?? 0,
		gear: t.pilotGear?.length ?? 0,
		frames: t.frames?.length ?? 0,
		systems: t.systems?.length ?? 0,
		weapons: t.weapons?.length ?? 0,
		mods: t.mods?.length ?? 0,
		npc_classes: t.npcClasses?.length ?? 0,
		npc_templates: t.npcTemplates?.length ?? 0,
		npc_features: t.npcFeatures?.length ?? 0
	};
}
function generateMultiLcpSummary(e, t) {
	return t.reduce((e, t) => t.data ? (e.bonds += t.data.bonds?.length ?? 0, e.skills += t.data.skills?.length ?? 0, e.talents += t.data.talents?.length ?? 0, e.reserves += t.data.reserves?.length ?? 0, e.gear += t.data.pilotGear?.length ?? 0, e.frames += t.data.frames?.length ?? 0, e.systems += t.data.systems?.length ?? 0, e.weapons += t.data.weapons?.length ?? 0, e.mods += t.data.mods?.length ?? 0, e.npc_classes += t.data.npcClasses?.length ?? 0, e.npc_templates += t.data.npcTemplates?.length ?? 0, e.npc_features += t.data.npcFeatures?.length ?? 0, e) : e, {
		...e,
		bonds: 0,
		skills: 0,
		talents: 0,
		reserves: 0,
		gear: 0,
		frames: 0,
		systems: 0,
		weapons: 0,
		mods: 0,
		npc_classes: 0,
		npc_templates: 0,
		npc_features: 0
	});
}
function getPackageVersion(e) {
	return e.version;
}
function getTitle(e) {
	return e.name;
}
function getAuthor(e) {
	return e.author;
}
function getInstalledVersion(e, t) {
	return t.index?.find((t) => t.name === e.name)?.version || "--";
}
function getUrl(e) {
	return e.website || "";
}
async function readZipJSON(e, t) {
	let m = e.file(t);
	if (!m) return null;
	let v = await m.async("text");
	return JSON.parse(v);
}
async function getPackID(e) {
	return `${e.author}/${e.name}`;
}
async function getZipData(e, t) {
	let m;
	try {
		m = await readZipJSON(e, t);
	} catch (e) {
		console.error(`Error reading file ${t} from package, skipping. Error follows:`), console.trace(e), m = null;
	}
	return m || [];
}
function generateItemID(e, t, m) {
	let v = t.replace(/[ \/-]/g, "_").replace(/[^A-Za-z0-9_]/g, "").toLowerCase();
	return m?.item_prefix ? `${m.item_prefix}__${e}_${v}` : `${e}__${v}`;
}
async function parseContentPack(e) {
	let t = await bt.default.loadAsync(e), m = await readZipJSON(t, "lcp_manifest.json");
	if (!m) throw Error("Content pack has no manifest");
	if (!isValidManifest(m)) throw Error("Content manifest is invalid");
	if (m.v3) throw Error("V3 LCPs are not yet supported in Foundry, please import the V2 LCP instead. (Usually listed on itch as \"for old.compcon.app\".)");
	function generateIDs(e, t) {
		if (t) for (let m of e) m.id = m.id || generateItemID(t, m.name);
		return e;
	}
	let v = generateIDs(await getZipData(t, "core_bonuses.json"), EntryTypeLidPrefix(z.CORE_BONUS)), y = generateIDs(await getZipData(t, "frames.json"), EntryTypeLidPrefix(z.FRAME)), x = generateIDs(await getZipData(t, "weapons.json"), EntryTypeLidPrefix(z.MECH_WEAPON)), S = generateIDs(await getZipData(t, "systems.json"), EntryTypeLidPrefix(z.MECH_SYSTEM)), C = generateIDs(await getZipData(t, "mods.json"), EntryTypeLidPrefix(z.WEAPON_MOD)), w = generateIDs(await getZipData(t, "pilot_gear.json"), EntryTypeLidPrefix(z.PILOT_GEAR)), E = generateIDs(await getZipData(t, "skills.json"), EntryTypeLidPrefix(z.SKILL)), O = generateIDs(await getZipData(t, "talents.json"), EntryTypeLidPrefix(z.TALENT)), k = generateIDs(await getZipData(t, "bonds.json"), EntryTypeLidPrefix(z.BOND)), ee = generateIDs(await getZipData(t, "reserves.json"), EntryTypeLidPrefix(z.RESERVE)), I = generateIDs(await getZipData(t, "tags.json"), "tg_"), te = generateIDs((await getZipData(t, "statuses.json")).map((e) => ({
		id: e.name.toLowerCase(),
		...e
	})), EntryTypeLidPrefix(z.STATUS)), ne = generateIDs(await readZipJSON(t, "npc_classes.json") || [], EntryTypeLidPrefix(z.NPC_CLASS)), re = generateIDs(await readZipJSON(t, "npc_features.json") || [], EntryTypeLidPrefix(z.NPC_FEATURE)), ie = generateIDs(await readZipJSON(t, "npc_templates.json") || [], EntryTypeLidPrefix(z.NPC_TEMPLATE));
	return {
		id: await getPackID(m),
		active: !1,
		manifest: m,
		data: {
			coreBonuses: v,
			frames: y,
			weapons: x,
			systems: S,
			mods: C,
			pilotGear: w,
			skills: E,
			talents: O,
			bonds: k,
			reserves: ee,
			tags: I,
			statuses: te,
			npcClasses: ne,
			npcFeatures: re,
			npcTemplates: ie
		}
	};
}
function convertNpmDataToContentPack(e, t, m) {
	if (!e.lcp_manifest && !m) throw Error("No manifest provided for content pack.");
	let removePlaceholders = (e) => !e.id || !e.id.startsWith("missing_");
	return {
		id: t,
		active: !0,
		manifest: e.lcp_manifest || m,
		data: {
			coreBonuses: e.core_bonuses?.filter(removePlaceholders),
			frames: e.frames?.filter(removePlaceholders),
			weapons: e.weapons?.filter(removePlaceholders),
			systems: e.systems?.filter(removePlaceholders),
			mods: e.mods?.filter(removePlaceholders),
			pilotGear: e.pilot_gear?.filter(removePlaceholders),
			skills: e.skills?.filter(removePlaceholders),
			talents: e.talents?.filter(removePlaceholders),
			bonds: e.bonds?.filter(removePlaceholders),
			reserves: e.reserves?.filter(removePlaceholders),
			tags: e.tags?.filter(removePlaceholders),
			statuses: e.statuses?.filter(removePlaceholders),
			npcClasses: e.npc_classes?.filter(removePlaceholders),
			npcFeatures: e.npc_features?.filter(removePlaceholders),
			npcTemplates: e.npc_templates?.filter(removePlaceholders)
		}
	};
}
async function getBaseContentPack() {
	let e = await import("./lancer.mjs").then((e) => e.t), t = await import("./lancer-data-BbwRpIt3.mjs").then((e) => /* @__PURE__ */ m(e.t())), v = "Massif Press", y = "Lancer Core Book Data", x = e.version, S = "https://massif-press.itch.io/corebook-pdf-free", C = {
		author: v,
		item_prefix: "",
		name: y,
		version: x,
		website: S,
		image_url: "https://img.itch.zone/aW1hZ2UvNDIyNjI3LzI1MDY2NTMuanBn/347x500/6cEGFF.jpg"
	};
	return {
		id: Tt,
		title: y,
		author: v,
		availableVersion: x,
		currentVersion: game.settings.get("lancer", ve.setting_core_data) || "--",
		url: S,
		cp: convertNpmDataToContentPack(t, Tt, C)
	};
}
async function massifContentPacks() {
	return [
		{
			id: "long-rim",
			manifest: await import("./lcp_manifest-ByVqLAd1.mjs"),
			cpData: await import("./long-rim-data-VxXXy1UG.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "wallflower",
			manifest: await import("./lcp_manifest-f3hNugnq.mjs"),
			cpData: await import("./wallflower-data-YaA1adJj.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "ktb",
			manifest: await import("./lcp_manifest-6yNGC1WX.mjs"),
			cpData: await import("./ktb-data-B5mQK4Wm.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "osr",
			manifest: await import("./lcp_manifest-BCt2L_zj.mjs"),
			cpData: await import("./osr-data-wsqDahBM.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "dustgrave",
			manifest: await import("./lcp_manifest-D6RGaTLq.mjs"),
			cpData: await import("./dustgrave-data-BG2T5P7U.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "ssmr",
			manifest: await import("./lcp_manifest-CqYDDPe3.mjs"),
			cpData: await import("./ssmr-data-CA4hSx1D.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "ows",
			manifest: await import("./lcp_manifest-AxQpKCD_.mjs"),
			cpData: await import("./ows-data-BqeKBnbQ.mjs").then((e) => /* @__PURE__ */ m(e.default))
		},
		{
			id: "sotw",
			manifest: await import("./lcp_manifest-kQiWiJH9.mjs"),
			cpData: await import("./sotw-data-B-UPK99B.mjs").then((e) => /* @__PURE__ */ m(e.default))
		}
	];
}
async function getOfficialData(e) {
	let t = await getBaseContentPack(), m = await massifContentPacks();
	return [t, ...(await Promise.all(m.map(async (t) => !t.manifest || !t.cpData ? null : {
		id: t.id,
		title: getTitle(t.manifest),
		author: getAuthor(t.manifest),
		availableVersion: getPackageVersion(t.manifest),
		currentVersion: e ? getInstalledVersion(t.manifest, e) : "--",
		url: getUrl(t.manifest),
		cp: convertNpmDataToContentPack(t.cpData, t.id, t.manifest)
	}))).filter((e) => e !== null)];
}
function mergeOfficialDataAndLcpIndex(e, t) {
	let m = t.index.filter((t) => !e.find((e) => t.name === e.title && t.author === e.author)).map((e) => ({
		...e,
		title: e.name,
		id: e.name.replace(/\s/g, "-").toLowerCase(),
		availableVersion: "",
		currentVersion: e.version
	}));
	return [...e, ...m];
}
//#endregion
//#region src/module/item/lancer-item.ts
var Et = ve.log_prefix, Dt = class LancerItem extends Item {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/generic_item.svg";
	}
	static getDefaultArtwork(e) {
		let t = CONFIG.Item.dataModels[e?.type ?? "base"];
		return t?.getDefaultArtwork instanceof Function ? t.getDefaultArtwork(e) : { img: t?.DEFAULT_ICON ?? this.DEFAULT_ICON };
	}
	rangesFor(e) {
		let t = this, m = new Set(e);
		switch (t.type) {
			case z.MECH_WEAPON:
				let e = t.system.selected_profile_index;
				return t.system.profiles[e].range.filter((e) => m.has(e.type));
			case z.PILOT_WEAPON: return t.system.range.filter((e) => m.has(e.type));
			case z.NPC_FEATURE: return t.system.type === re.Weapon ? t.system.range.filter((e) => m.has(e.type)) : [];
			default: return [];
		}
	}
	currentProfile() {
		let e = {
			type: null,
			range: []
		};
		if (this.is_mech_weapon()) {
			let t = this.system.profiles[this.system.selected_profile_index];
			e.type = t.type || null, e.range.push(...t.range), e.damage = e.damage ?? [], e.damage.push(...t.damage);
		} else if (this.is_pilot_weapon()) e.range.push(...this.system.range), e.damage = e.damage ?? [], e.damage.push(...this.system.damage);
		else if (this.is_npc_feature() && (this.system.type === re.Weapon || this.system.type === re.Tech)) {
			e.type = this.system.weapon_type?.includes(ae.Melee) ? ae.Melee : null;
			let t = 0;
			this.actor && (t = (this.actor.system.tier ?? 1) - 1), this.system.type === re.Weapon ? (e.range.push(...this.system.range), e.damage = e.damage ?? [], e.damage.push(...this.system.damage[t])) : e.range.push({
				type: ce.Range,
				val: this.actor?.system.sensor_range || 5
			}), e.accuracy = this.system.accuracy ? this.system.accuracy[t] : 0, e.attack = this.system.attack_bonus ? this.system.attack_bonus[t] : 0;
		} else this.is_mech_system() || this.is_frame() ? e.range.push({
			type: ce.Range,
			val: this.actor?.system.sensor_range || 5
		}) : this.is_talent() && e.range.push({
			type: ce.Range,
			val: this.actor?.system.active_mech?.value?.system.sensor_range || 5
		});
		return e;
	}
	_resetEquipped() {
		switch (this.type) {
			case z.MECH_SYSTEM:
			case z.MECH_WEAPON:
			case z.WEAPON_MOD:
			case z.FRAME:
			case z.PILOT_GEAR:
			case z.PILOT_ARMOR:
			case z.PILOT_WEAPON:
				this.system.equipped = !1;
				break;
			default:
				this.system.equipped = !0;
				break;
		}
	}
	prepareBaseData() {
		if (super.prepareBaseData(), Ot.includes(this.type)) {
			if (this.is_mech_weapon()) {
				this.system.all_base_tags = this.system.profiles.flatMap((e) => e.tags), this.system.all_tags = [], this.system.active_profile = this.system.profiles[this.system.selected_profile_index] ?? this.system.profiles[0];
				for (let e of this.system.profiles) e.bonus_tags = [], e.bonus_range = [], e.bonus_damage = [], e.all_tags = [], e.all_range = [], e.all_damage = [];
			} else if (this.is_npc_feature()) this.system.lid === "" && (this.system.lid = this.id), this.system.type === re.Weapon && (!this.system.damage || this.system.damage.length < 3) && (this.system.damage = [
				[],
				[],
				[]
			]);
			else if (this.is_talent()) {
				let e = this.system.ranks.slice(0, this.system.curr_rank);
				this.system.actions = e.flatMap((e) => e.actions), this.system.bonuses = e.flatMap((e) => e.bonuses), this.system.counters = e.flatMap((e) => e.counters), this.system.synergies = e.flatMap((e) => e.synergies);
			} else this.is_bond() && (this.system.powers = this.system.powers.map((e) => fixupPowerUses(e)));
			this.actor || this.prepareFinalAttributes();
		}
	}
	prepareFinalAttributes() {
		if (this.is_mech_weapon()) for (let e of this.system.profiles) {
			this.system.mod && (e.bonus_damage.push(...this.system.mod.system.added_damage), e.bonus_range.push(...this.system.mod.system.added_range), e.bonus_tags.push(...this.system.mod.system.added_tags));
			for (let t of this.actor?.system.bonuses.weapon_bonuses || []) bonusAffectsWeapon(this, t) && (t.lid == "damage" ? e.bonus_damage.push(new jn({
				type: e.damage[0]?.type ?? le.Variable,
				val: t.val
			})) : t.lid == "range" && (this.system.active_profile.type == ae.Melee ? e.bonus_range.push(new Se({
				type: ce.Threat,
				val: parseInt(t.val) ?? 0
			})) : e.bonus_range.push(new Se({
				type: ce.Range,
				val: parseInt(t.val) ?? 0
			}))));
			e.bonus_damage = jn.CombineLists([], e.bonus_damage), e.bonus_range = Se.CombineLists([], e.bonus_range), e.all_damage = jn.CombineLists(e.damage, e.bonus_damage), e.all_range = Se.CombineLists(e.range, e.bonus_range), e.all_tags = De.MergeTags(e.tags, e.bonus_tags), this.system.all_tags = De.MergeTags(this.system.all_tags, e.all_tags);
		}
		let e = (this.getTags() ?? []).find((e) => e.is_limited);
		e && this._hasUses() && (this.system.uses.max = e.num_val ?? 0), this.actor?.is_mech() && this._hasUses() && this.system.uses.max && (this.system.uses.max += this.actor.system.loadout.limited_bonus);
	}
	async update(e, t = {}) {
		return e = this.system.full_update_data(e), super.update(e, t);
	}
	_generateEphemeralEffects() {
		if (this.destroyed === !0 || !this.isEquipped()) return [];
		let e = [], t = [];
		switch (this.type) {
			case z.FRAME:
				let m = this;
				t.push({
					group: m.system.core_system.passive_name || m.system.core_system.name,
					bonuses: m.system.core_system.passive_bonuses
				});
				for (let e of m.system.traits) t.push({
					group: e.name,
					bonuses: e.bonuses
				});
				e.push(frameInnateEffect(this));
				break;
			case z.NPC_CLASS:
				e.push(npcClassInnateEffect(this));
				break;
			case z.NPC_FEATURE:
				let v = npcFeatureBonusEffects(this), y = npcFeatureOverrideEffects(this);
				v && e.push(v), y && e.push(y);
				break;
			case z.PILOT_ARMOR:
			case z.PILOT_GEAR:
			case z.PILOT_WEAPON:
			case z.MECH_SYSTEM:
			case z.WEAPON_MOD:
			case z.CORE_BONUS:
			case z.TALENT:
				t.push({ bonuses: this.system.bonuses });
				break;
			case z.MECH_WEAPON:
				let x = this;
				t.push({
					group: x.system.active_profile.name || x.system.active_profile?.name,
					bonuses: x.system.active_profile.bonuses
				});
				break;
		}
		return e.push(...t.flatMap((e) => e.bonuses.map((t) => convertBonus(this, e.group ? `${this.name} - ${e.group}` : this.name, t))).filter((e) => e)), e.map((e) => new LancerActiveEffect(e, { parent: this }));
	}
	static async _onDeleteOperation() {}
	async _preCreate(...[e, t, m]) {
		if (await super._preCreate(e, t, m) === !1) return !1;
		if (!e?._stats?.createdTime) {
			if (e.system?.lid) {
				console.log(`${Et} New ${this.type} has data provided from an import, skipping default init.`);
				return;
			}
			console.log(`${Et} Initializing new ${this.type}`), console.log(this.name), this.updateSource({ system: { lid: `${generateItemID(EntryTypeLidPrefix(this.type), this.name)}-${randomString(8)}` } });
		}
	}
	is_core_bonus() {
		return this.type === z.CORE_BONUS;
	}
	is_frame() {
		return this.type === z.FRAME;
	}
	is_license() {
		return this.type === z.LICENSE;
	}
	is_mech_system() {
		return this.type === z.MECH_SYSTEM;
	}
	is_mech_weapon() {
		return this.type === z.MECH_WEAPON;
	}
	is_npc_class() {
		return this.type === z.NPC_CLASS;
	}
	is_npc_feature() {
		return this.type === z.NPC_FEATURE;
	}
	is_npc_template() {
		return this.type === z.NPC_TEMPLATE;
	}
	is_organization() {
		return this.type === z.ORGANIZATION;
	}
	is_pilot_armor() {
		return this.type === z.PILOT_ARMOR;
	}
	is_pilot_gear() {
		return this.type === z.PILOT_GEAR;
	}
	is_pilot_weapon() {
		return this.type === z.PILOT_WEAPON;
	}
	is_reserve() {
		return this.type === z.RESERVE;
	}
	is_skill() {
		return this.type === z.SKILL;
	}
	is_status() {
		return this.type === z.STATUS;
	}
	is_talent() {
		return this.type === z.TALENT;
	}
	is_bond() {
		return this.type === z.BOND;
	}
	is_weapon_mod() {
		return this.type === z.WEAPON_MOD;
	}
	is_weapon() {
		return this.is_mech_weapon() || this.is_pilot_weapon() || this.is_npc_feature() && this.system.type === "Weapon";
	}
	getTags() {
		return this.is_pilot_armor() || this.is_pilot_gear() || this.is_pilot_weapon() || this.is_mech_system() || this.is_npc_feature() || this.is_weapon_mod() || this.is_core_bonus() ? this.system.tags : this.is_mech_weapon() ? this.system.active_profile.all_tags : this.is_frame() ? this.system.core_system.tags : null;
	}
	getBonuses() {
		return this.is_pilot_armor() || this.is_pilot_gear() || this.is_pilot_weapon() || this.is_mech_system() || this.is_core_bonus() ? this.system.bonuses : this.is_mech_weapon() ? this.system.active_profile.bonuses : this.is_frame() ? this.actor && this.actor.system.core_active ? [...this.system.core_system.passive_bonuses, ...this.system.core_system.active_bonuses] : this.system.core_system.passive_bonuses : null;
	}
	getLimitedBase() {
		let e = this.getTags()?.find((e) => e.is_limited);
		return e ? e.num_val : null;
	}
	_hasUses() {
		return this.system.uses !== void 0;
	}
	isLimited() {
		return this._hasUses() && this.system.uses.max > 0;
	}
	isLoading() {
		return (this.getTags() ?? []).some((e) => e.is_loading);
	}
	isRecharge() {
		return (this.getTags() ?? []).some((e) => e.is_recharge);
	}
	isUnique() {
		return (this.getTags() ?? []).some((e) => e.is_unique);
	}
	isAI() {
		return (this.getTags() ?? []).some((e) => e.is_ai);
	}
	isSmart() {
		return (this.getTags() ?? []).some((e) => e.is_smart);
	}
	isAP() {
		return (this.getTags() ?? []).some((e) => e.is_ap);
	}
	isOverkill() {
		return (this.getTags() ?? []).some((e) => e.is_overkill);
	}
	isReliable() {
		return (this.getTags() ?? []).some((e) => e.is_reliable);
	}
	isThrown() {
		return (this.getTags() ?? []).some((e) => e.is_thrown);
	}
	hasActions() {
		return this.system.actions !== void 0;
	}
	isEquipped() {
		let e = this.system.equipped;
		return this.actor ? e : !1;
	}
	static async fromUuid(e, t) {
		if (e instanceof LancerItem) return e;
		if (e = await fromUuid(e), !e) {
			let m = `${t ? t + " | " : ""}Item ${e} not found.`;
			throw ui.notifications?.error(m), Error(m);
		}
		if (!(e instanceof LancerItem)) {
			let m = `${t ? t + " | " : ""}Document ${e} not an item.`;
			throw ui.notifications?.error(m), Error(m);
		}
		return e;
	}
	static fromUuidSync(e, t) {
		if (e instanceof LancerItem) return e;
		if (e = fromUuidSync(e), !e) {
			let m = `${t ? t + " | " : ""}Item ${e} not found.`;
			throw ui.notifications?.error(m), Error(m);
		}
		if (!(e instanceof LancerItem)) {
			let m = `${t ? t + " | " : ""}Document ${e} not an item.`;
			throw ui.notifications?.error(m), Error(m);
		}
		return e;
	}
	async beginWeaponAttackFlow() {
		if (!this.is_mech_weapon() && !this.is_npc_feature() && !this.is_pilot_weapon()) {
			ui.notifications.error(`Item ${this.id} cannot attack as it is not a weapon!`);
			return;
		}
		await new WeaponAttackFlow(this).begin(), console.log("Finished attack flow");
	}
	async beginTechAttackFlow() {
		if (!this.is_mech_system() && !this.is_npc_feature()) {
			ui.notifications.error(`Item ${this.id} cannot attack as it is not a system!`);
			return;
		}
		await new TechAttackFlow(this).begin();
	}
	async beginDamageFlow() {
		if (!this.is_mech_weapon() && !this.is_npc_feature() && !this.is_pilot_weapon()) {
			ui.notifications.error(`Item ${this.id} cannot roll damage as it is not a weapon!`);
			return;
		}
		await new DamageRollFlow(this, { title: `${this.name} damage` }).begin();
	}
	async beginSystemFlow() {
		if (!this.is_mech_system() && !this.is_weapon_mod() && !this.is_npc_feature()) {
			ui.notifications.error(`Item ${this.id} is not a mech system, weapon mod, or NPC feature!`);
			return;
		}
		await new SystemFlow(this).begin();
	}
	async beginActivationFlow(e) {
		if (!e) {
			if (!this.system.actions || this.system.actions.length < 1) {
				ui.notifications.error(`Item ${this.id} has no actions, how did you even get here?`);
				return;
			}
			e = "system.actions.0";
		}
		let t;
		if (this.is_frame() && e === "system.core_system") {
			this.beginCoreActiveFlow(e);
			return;
		} else t = new ActivationFlow(this, { action_path: e });
		await t.begin(), console.log("Finished activation flow");
	}
	async beginCoreActiveFlow(e) {
		if (!this.is_frame()) {
			ui.notifications.error(`Item ${this.id} is not a mech frame!`);
			return;
		}
		e ??= "system.core_system", console.log("Core system activation flow on path", e);
		let t = this.system.core_system.active_actions[0]?.name ?? this.system.core_system.active_name, m = {
			lid: this.system.lid + "_core_system",
			name: `CORE ACTIVATION :: ${t}`,
			activation: this.system.core_system.activation,
			detail: this.system.core_system.active_effect,
			cost: 0,
			frequency: "",
			init: "",
			trigger: "",
			terse: "",
			pilot: !1,
			mech: !0,
			tech_attack: !1,
			heat_cost: 0,
			synergy_locations: [],
			damage: [],
			range: []
		};
		await new CoreActiveFlow(this, {
			action: m,
			action_path: e
		}).begin();
	}
	async beginSkillFlow() {
		if (!this.is_skill()) {
			ui.notifications.error(`Item ${this.id} is not a skill!`);
			return;
		}
		await new StatRollFlow(this, { path: "system.curr_rank" }).begin();
	}
	async beginBondPowerFlow(e) {
		if (!this.is_bond()) {
			ui.notifications.error(`Item ${this.id} has no bond powers!`);
			return;
		}
		await new BondPowerFlow(this, { powerIndex: e }).begin();
	}
	async refreshPowers() {
		if (!this.is_bond()) {
			ui.notifications.error(`Item ${this.id} has no bond powers!`);
			return;
		}
		for (let e = 0; e < this.system.powers.length; e++) {
			let t = this.system.powers[e];
			t.uses && await this.update({ [`system.powers.${e}.uses.value`]: t.uses.max });
		}
	}
}, Ot = [
	z.CORE_BONUS,
	z.FRAME,
	z.LICENSE,
	z.MECH_WEAPON,
	z.MECH_SYSTEM,
	z.NPC_CLASS,
	z.NPC_TEMPLATE,
	z.NPC_FEATURE,
	z.PILOT_ARMOR,
	z.PILOT_WEAPON,
	z.PILOT_GEAR,
	z.RESERVE,
	z.SKILL,
	z.STATUS,
	z.TALENT,
	z.BOND,
	z.WEAPON_MOD
];
//#endregion
//#region src/module/apps/text-editor.ts
async function richTextEdit(e, t) {
	let m = foundry.utils.getProperty(e, t);
	if (typeof m != "string") throw Error(`Document property ${t} is not a string`);
	let v = document.createElement("div");
	v.appendChild(foundry.applications.elements.HTMLProseMirrorElement.create({
		name: "result",
		toggled: !1,
		value: m
	}));
	let { result: y } = await foundry.applications.api.Dialog.input({
		id: `richEditor-${e.uuid}-${t}`,
		content: v,
		classes: ["lancer", "rich-editor"],
		window: { resizable: !0 },
		position: {
			width: 550,
			height: 400
		}
	}) ?? {};
	return y;
}
var HTMLEditDialog = class extends FormApplication {
	constructor(e, t, m, v) {
		super({ hasPerm: () => !0 }, m), this.target = e, this.text_path = t, this.text = resolveDotpath(e, t), this.resolve = v;
	}
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: `systems/${game.system.id}/templates/window/html_editor.hbs`,
			width: 650,
			height: "auto",
			resizable: !0,
			classes: ["lancer", "lancer-text-editor"],
			submitOnChange: !1,
			submitOnClose: !0,
			closeOnSubmit: !0
		});
	}
	getData() {
		let e = { text: this.text };
		return foundry.utils.mergeObject(super.getData(), e);
	}
	async _updateObject(e, t) {
		let m = t.text;
		this.target.update({ [this.text_path]: m }).then(this.resolve);
	}
	close(e) {
		return this.resolve(), super.close(e);
	}
	static async edit_text(e, t) {
		return new Promise((m, v) => {
			new this(e, t, { title: "Edit Text" }, m).render(!0);
		});
	}
}, kt = "";
function BONUS() {
	return {
		lid: "unknown",
		val: "0",
		overwrite: !1,
		replace: !1,
		damage_types: {
			Burn: !0,
			Energy: !0,
			Explosive: !0,
			Heat: !0,
			Kinetic: !0,
			Variable: !0
		},
		range_types: {
			Blast: !0,
			Burst: !0,
			Cone: !0,
			Line: !0,
			Range: !0,
			Threat: !0,
			Thrown: !0
		},
		weapon_sizes: {
			Auxiliary: !0,
			Heavy: !0,
			Main: !0,
			Superheavy: !0
		},
		weapon_types: {
			CQB: !0,
			Cannon: !0,
			Launcher: !0,
			Melee: !0,
			Nexus: !0,
			Rifle: !0
		}
	};
}
function ACTION() {
	return {
		name: "New action",
		lid: "act_" + nanoid(),
		activation: se.Quick,
		detail: kt,
		cost: 1,
		frequency: "",
		heat_cost: 0,
		init: "",
		damage: [],
		range: [],
		mech: !0,
		pilot: !0,
		synergy_locations: [],
		terse: "Terse Description",
		trigger: "",
		tech_attack: !1
	};
}
function COUNTER() {
	return {
		lid: "count_" + nanoid(),
		name: "New Counter",
		min: 1,
		max: 6,
		default_value: 1,
		value: 1
	};
}
function TAG() {
	return {
		lid: "tg_unknown",
		val: ""
	};
}
function BOND_QUESTION() {
	return {
		question: kt,
		options: [kt]
	};
}
function POWER() {
	return {
		name: "New Power",
		description: kt,
		unlocked: !1,
		frequency: null,
		uses: null,
		veteran: !1,
		master: !1,
		prerequisite: null
	};
}
function FRAME_TRAIT() {
	return {
		name: "New Trait",
		actions: [],
		bonuses: [],
		counters: [],
		synergies: [],
		deployables: [],
		integrated: [],
		description: kt,
		use: Q.Unknown
	};
}
function DAMAGE() {
	return {
		type: le.Kinetic,
		val: "1d6"
	};
}
function RANGE() {
	return {
		type: ce.Range,
		val: 5
	};
}
function TALENT_RANK() {
	return {
		name: "New Rank",
		actions: [],
		bonuses: [],
		synergies: [],
		counters: [],
		deployables: [],
		description: kt,
		exclusive: !1,
		integrated: []
	};
}
function WEAPON_PROFILE() {
	return {
		name: "Standard Profile",
		actions: [],
		bonuses: [],
		counters: [],
		damage: [],
		description: kt,
		effect: "",
		on_attack: "",
		on_crit: "",
		on_hit: "",
		range: [],
		synergies: [],
		tags: [],
		type: ae.Rifle,
		barrageable: !0,
		cost: 1,
		skirmishable: !0
	};
}
function WEAPON_MOUNT() {
	return {
		type: ne.Main,
		bracing: !1,
		slots: [MOUNT_SLOT()]
	};
}
function MOUNT_SLOT() {
	return {
		mod: null,
		size: B.Main,
		weapon: null
	};
}
var At = "bottom", jt = "right", Mt = "left", Nt = "auto", Pt = [
	"top",
	At,
	jt,
	Mt
], Ft = "start", It = "clippingParents", Lt = "viewport", Rt = "popper", zt = "reference", Bt = /*#__PURE__*/ Pt.reduce(function(e, t) {
	return e.concat([t + "-" + Ft, t + "-end"]);
}, []), Vt = /*#__PURE__*/ [].concat(Pt, [Nt]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + Ft,
		t + "-end"
	]);
}, []), Ht = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement$1(e) {
	return e instanceof getWindow(e).Element || e instanceof Element;
}
t(isElement$1, "isElement");
function isHTMLElement(e) {
	return e instanceof getWindow(e).HTMLElement || e instanceof HTMLElement;
}
function isShadowRoot(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof getWindow(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var m = t.styles[e] || {}, v = t.attributes[e] || {}, y = t.elements[e];
		!isHTMLElement(y) || !getNodeName(y) || (Object.assign(y.style, m), Object.keys(v).forEach(function(e) {
			var t = v[e];
			t === !1 ? y.removeAttribute(e) : y.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function effect$2(e) {
	var t = e.state, m = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, m.popper), t.styles = m, t.elements.arrow && Object.assign(t.elements.arrow.style, m.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var v = t.elements[e], y = t.attributes[e] || {}, x = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : m[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			!isHTMLElement(v) || !getNodeName(v) || (Object.assign(v.style, x), Object.keys(y).forEach(function(e) {
				v.removeAttribute(e);
			}));
		});
	};
}
t(effect$2, "effect");
var Ut = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement$1(e) {
	return e.split("-")[0];
}
t(getBasePlacement$1, "getBasePlacement");
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var Wt = Math.max, Gt = Math.min, Kt = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(e, t) {
	t === void 0 && (t = !1);
	var m = e.getBoundingClientRect(), v = 1, y = 1;
	if (isHTMLElement(e) && t) {
		var x = e.offsetHeight, S = e.offsetWidth;
		S > 0 && (v = Kt(m.width) / S || 1), x > 0 && (y = Kt(m.height) / x || 1);
	}
	return {
		width: m.width / v,
		height: m.height / y,
		top: m.top / y,
		right: m.right / v,
		bottom: m.bottom / y,
		left: m.left / v,
		x: m.left / v,
		y: m.top / y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(e) {
	var t = getBoundingClientRect(e), m = e.offsetWidth, v = e.offsetHeight;
	return Math.abs(t.width - m) <= 1 && (m = t.width), Math.abs(t.height - v) <= 1 && (v = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: m,
		height: v
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(e, t) {
	var m = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (m && isShadowRoot(m)) {
		var v = t;
		do {
			if (v && e.isSameNode(v)) return !0;
			v = v.parentNode || v.host;
		} while (v);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(e) {
	return getWindow(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(e) {
	return ((isElement$1(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(e) {
	return getNodeName(e) === "html" ? e : e.assignedSlot || e.parentNode || (isShadowRoot(e) ? e.host : null) || getDocumentElement(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(e) {
	return !isHTMLElement(e) || getComputedStyle(e).position === "fixed" ? null : e.offsetParent;
}
function getContainingBlock(e) {
	var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
	if (navigator.userAgent.indexOf("Trident") !== -1 && isHTMLElement(e) && getComputedStyle(e).position === "fixed") return null;
	var m = getParentNode(e);
	for (isShadowRoot(m) && (m = m.host); isHTMLElement(m) && ["html", "body"].indexOf(getNodeName(m)) < 0;) {
		var v = getComputedStyle(m);
		if (v.transform !== "none" || v.perspective !== "none" || v.contain === "paint" || ["transform", "perspective"].indexOf(v.willChange) !== -1 || t && v.willChange === "filter" || t && v.filter && v.filter !== "none") return m;
		m = m.parentNode;
	}
	return null;
}
function getOffsetParent(e) {
	for (var t = getWindow(e), m = getTrueOffsetParent(e); m && isTableElement(m) && getComputedStyle(m).position === "static";) m = getTrueOffsetParent(m);
	return m && (getNodeName(m) === "html" || getNodeName(m) === "body" && getComputedStyle(m).position === "static") ? t : m || getContainingBlock(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function within(e, t, m) {
	return Wt(e, Gt(t, m));
}
function withinMaxClamp(e, t, m) {
	var v = within(e, t, m);
	return v > m ? m : v;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(e) {
	return Object.assign({}, getFreshSideObject(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(e, t) {
	return t.reduce(function(t, m) {
		return t[m] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var qt = function toPaddingObject(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, mergePaddingObject(typeof e == "number" ? expandToHashMap(e, Pt) : e);
};
function arrow(e) {
	var t, m = e.state, v = e.name, y = e.options, x = m.elements.arrow, S = m.modifiersData.popperOffsets, C = getBasePlacement$1(m.placement), w = getMainAxisFromPlacement(C), E = ["left", "right"].indexOf(C) >= 0 ? "height" : "width";
	if (!(!x || !S)) {
		var O = qt(y.padding, m), k = getLayoutRect(x), ee = w === "y" ? "top" : Mt, I = w === "y" ? At : jt, te = m.rects.reference[E] + m.rects.reference[w] - S[w] - m.rects.popper[E], z = S[w] - m.rects.reference[w], ne = getOffsetParent(x), re = ne ? w === "y" ? ne.clientHeight || 0 : ne.clientWidth || 0 : 0, ie = te / 2 - z / 2, B = O[ee], q = re - k[E] - O[I], ae = re / 2 - k[E] / 2 + ie, oe = within(B, ae, q), Q = w;
		m.modifiersData[v] = (t = {}, t[Q] = oe, t.centerOffset = oe - ae, t);
	}
}
function effect$1(e) {
	var t = e.state, m = e.options.element, v = m === void 0 ? "[data-popper-arrow]" : m;
	v != null && (typeof v == "string" && (v = t.elements.popper.querySelector(v), !v) || contains(t.elements.popper, v) && (t.elements.arrow = v));
}
t(effect$1, "effect");
var Jt = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var Yt = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(e) {
	var t = e.x, m = e.y, v = window.devicePixelRatio || 1;
	return {
		x: Kt(t * v) / v || 0,
		y: Kt(m * v) / v || 0
	};
}
function mapToStyles(e) {
	var t, m = e.popper, v = e.popperRect, y = e.placement, x = e.variation, S = e.offsets, C = e.position, w = e.gpuAcceleration, E = e.adaptive, O = e.roundOffsets, k = e.isFixed, ee = S.x, I = ee === void 0 ? 0 : ee, te = S.y, z = te === void 0 ? 0 : te, ne = typeof O == "function" ? O({
		x: I,
		y: z
	}) : {
		x: I,
		y: z
	};
	I = ne.x, z = ne.y;
	var re = S.hasOwnProperty("x"), ie = S.hasOwnProperty("y"), B = Mt, q = "top", ae = window;
	if (E) {
		var oe = getOffsetParent(m), Q = "clientHeight", se = "clientWidth";
		if (oe === getWindow(m) && (oe = getDocumentElement(m), getComputedStyle(oe).position !== "static" && C === "absolute" && (Q = "scrollHeight", se = "scrollWidth")), oe = oe, y === "top" || (y === "left" || y === "right") && x === "end") {
			q = At;
			var ce = k && oe === ae && ae.visualViewport ? ae.visualViewport.height : oe[Q];
			z -= ce - v.height, z *= w ? 1 : -1;
		}
		if (y === "left" || (y === "top" || y === "bottom") && x === "end") {
			B = jt;
			var le = k && oe === ae && ae.visualViewport ? ae.visualViewport.width : oe[se];
			I -= le - v.width, I *= w ? 1 : -1;
		}
	}
	var ue = Object.assign({ position: C }, E && Yt), de = O === !0 ? roundOffsetsByDPR({
		x: I,
		y: z
	}) : {
		x: I,
		y: z
	};
	if (I = de.x, z = de.y, w) {
		var fe;
		return Object.assign({}, ue, (fe = {}, fe[q] = ie ? "0" : "", fe[B] = re ? "0" : "", fe.transform = (ae.devicePixelRatio || 1) <= 1 ? "translate(" + I + "px, " + z + "px)" : "translate3d(" + I + "px, " + z + "px, 0)", fe));
	}
	return Object.assign({}, ue, (t = {}, t[q] = ie ? z + "px" : "", t[B] = re ? I + "px" : "", t.transform = "", t));
}
function computeStyles(e) {
	var t = e.state, m = e.options, v = m.gpuAcceleration, y = v === void 0 ? !0 : v, x = m.adaptive, S = x === void 0 ? !0 : x, C = m.roundOffsets, w = C === void 0 ? !0 : C, E = {
		placement: getBasePlacement$1(t.placement),
		variation: getVariation(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: y,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, mapToStyles(Object.assign({}, E, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: S,
		roundOffsets: w
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, mapToStyles(Object.assign({}, E, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: w
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Xt = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
}, Zt = { passive: !0 };
function effect(e) {
	var t = e.state, m = e.instance, v = e.options, y = v.scroll, x = y === void 0 ? !0 : y, S = v.resize, C = S === void 0 ? !0 : S, w = getWindow(t.elements.popper), E = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return x && E.forEach(function(e) {
		e.addEventListener("scroll", m.update, Zt);
	}), C && w.addEventListener("resize", m.update, Zt), function() {
		x && E.forEach(function(e) {
			e.removeEventListener("scroll", m.update, Zt);
		}), C && w.removeEventListener("resize", m.update, Zt);
	};
}
var Qt = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
}, $t = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return $t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var en = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(e) {
	return e.replace(/start|end/g, function(e) {
		return en[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(e) {
	var t = getWindow(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(e) {
	return getBoundingClientRect(getDocumentElement(e)).left + getWindowScroll(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(e) {
	var t = getWindow(e), m = getDocumentElement(e), v = t.visualViewport, y = m.clientWidth, x = m.clientHeight, S = 0, C = 0;
	return v && (y = v.width, x = v.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (S = v.offsetLeft, C = v.offsetTop)), {
		width: y,
		height: x,
		x: S + getWindowScrollBarX(e),
		y: C
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(e) {
	var t = getDocumentElement(e), m = getWindowScroll(e), v = e.ownerDocument?.body, y = Wt(t.scrollWidth, t.clientWidth, v ? v.scrollWidth : 0, v ? v.clientWidth : 0), x = Wt(t.scrollHeight, t.clientHeight, v ? v.scrollHeight : 0, v ? v.clientHeight : 0), S = -m.scrollLeft + getWindowScrollBarX(e), C = -m.scrollTop;
	return getComputedStyle(v || t).direction === "rtl" && (S += Wt(t.clientWidth, v ? v.clientWidth : 0) - y), {
		width: y,
		height: x,
		x: S,
		y: C
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(e) {
	var t = getComputedStyle(e), m = t.overflow, v = t.overflowX, y = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(m + y + v);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(e)) >= 0 ? e.ownerDocument.body : isHTMLElement(e) && isScrollParent(e) ? e : getScrollParent(getParentNode(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(e, t) {
	t === void 0 && (t = []);
	var m = getScrollParent(e), v = m === e.ownerDocument?.body, y = getWindow(m), x = v ? [y].concat(y.visualViewport || [], isScrollParent(m) ? m : []) : m, S = t.concat(x);
	return v ? S : S.concat(listScrollParents(getParentNode(x)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(e) {
	var t = getBoundingClientRect(e);
	return t.top += e.clientTop, t.left += e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function getClientRectFromMixedType(e, t) {
	return t === "viewport" ? rectToClientRect(getViewportRect(e)) : isElement$1(t) ? getInnerBoundingClientRect(t) : rectToClientRect(getDocumentRect(getDocumentElement(e)));
}
function getClippingParents(e) {
	var t = listScrollParents(getParentNode(e)), m = ["absolute", "fixed"].indexOf(getComputedStyle(e).position) >= 0 && isHTMLElement(e) ? getOffsetParent(e) : e;
	return isElement$1(m) ? t.filter(function(e) {
		return isElement$1(e) && contains(e, m) && getNodeName(e) !== "body";
	}) : [];
}
function getClippingRect(e, t, m) {
	var v = t === "clippingParents" ? getClippingParents(e) : [].concat(t), y = [].concat(v, [m]), x = y[0], S = y.reduce(function(t, m) {
		var v = getClientRectFromMixedType(e, m);
		return t.top = Wt(v.top, t.top), t.right = Gt(v.right, t.right), t.bottom = Gt(v.bottom, t.bottom), t.left = Wt(v.left, t.left), t;
	}, getClientRectFromMixedType(e, x));
	return S.width = S.right - S.left, S.height = S.bottom - S.top, S.x = S.left, S.y = S.top, S;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(e) {
	var t = e.reference, m = e.element, v = e.placement, y = v ? getBasePlacement$1(v) : null, x = v ? getVariation(v) : null, S = t.x + t.width / 2 - m.width / 2, C = t.y + t.height / 2 - m.height / 2, w;
	switch (y) {
		case "top":
			w = {
				x: S,
				y: t.y - m.height
			};
			break;
		case At:
			w = {
				x: S,
				y: t.y + t.height
			};
			break;
		case jt:
			w = {
				x: t.x + t.width,
				y: C
			};
			break;
		case Mt:
			w = {
				x: t.x - m.width,
				y: C
			};
			break;
		default: w = {
			x: t.x,
			y: t.y
		};
	}
	var E = y ? getMainAxisFromPlacement(y) : null;
	if (E != null) {
		var O = E === "y" ? "height" : "width";
		switch (x) {
			case Ft:
				w[E] = w[E] - (t[O] / 2 - m[O] / 2);
				break;
			case "end":
				w[E] = w[E] + (t[O] / 2 - m[O] / 2);
				break;
			default:
		}
	}
	return w;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(e, t) {
	t === void 0 && (t = {});
	var m = t, v = m.placement, y = v === void 0 ? e.placement : v, x = m.boundary, S = x === void 0 ? It : x, C = m.rootBoundary, w = C === void 0 ? Lt : C, E = m.elementContext, O = E === void 0 ? Rt : E, k = m.altBoundary, ee = k === void 0 ? !1 : k, I = m.padding, te = I === void 0 ? 0 : I, z = mergePaddingObject(typeof te == "number" ? expandToHashMap(te, Pt) : te), ne = O === "popper" ? zt : Rt, re = e.rects.popper, ie = e.elements[ee ? ne : O], B = getClippingRect(isElement$1(ie) ? ie : ie.contextElement || getDocumentElement(e.elements.popper), S, w), q = getBoundingClientRect(e.elements.reference), ae = computeOffsets({
		reference: q,
		element: re,
		strategy: "absolute",
		placement: y
	}), oe = rectToClientRect(Object.assign({}, re, ae)), Q = O === "popper" ? oe : q, se = {
		top: B.top - Q.top + z.top,
		bottom: Q.bottom - B.bottom + z.bottom,
		left: B.left - Q.left + z.left,
		right: Q.right - B.right + z.right
	}, ce = e.modifiersData.offset;
	if (O === "popper" && ce) {
		var le = ce[y];
		Object.keys(se).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, m = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			se[e] += le[m] * t;
		});
	}
	return se;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(e, t) {
	t === void 0 && (t = {});
	var m = t, v = m.placement, y = m.boundary, x = m.rootBoundary, S = m.padding, C = m.flipVariations, w = m.allowedAutoPlacements, E = w === void 0 ? Vt : w, O = getVariation(v), k = O ? C ? Bt : Bt.filter(function(e) {
		return getVariation(e) === O;
	}) : Pt, ee = k.filter(function(e) {
		return E.indexOf(e) >= 0;
	});
	ee.length === 0 && (ee = k);
	var I = ee.reduce(function(t, m) {
		return t[m] = detectOverflow(e, {
			placement: m,
			boundary: y,
			rootBoundary: x,
			padding: S
		})[getBasePlacement$1(m)], t;
	}, {});
	return Object.keys(I).sort(function(e, t) {
		return I[e] - I[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(e) {
	if (getBasePlacement$1(e) === "auto") return [];
	var t = getOppositePlacement(e);
	return [
		getOppositeVariationPlacement(e),
		t,
		getOppositeVariationPlacement(t)
	];
}
function flip(e) {
	var t = e.state, m = e.options, v = e.name;
	if (!t.modifiersData[v]._skip) {
		for (var y = m.mainAxis, x = y === void 0 ? !0 : y, S = m.altAxis, C = S === void 0 ? !0 : S, w = m.fallbackPlacements, E = m.padding, O = m.boundary, k = m.rootBoundary, ee = m.altBoundary, I = m.flipVariations, te = I === void 0 ? !0 : I, z = m.allowedAutoPlacements, ne = t.options.placement, re = getBasePlacement$1(ne) === ne, ie = w || (re || !te ? [getOppositePlacement(ne)] : getExpandedFallbackPlacements(ne)), B = [ne].concat(ie).reduce(function(e, m) {
			return e.concat(getBasePlacement$1(m) === "auto" ? computeAutoPlacement(t, {
				placement: m,
				boundary: O,
				rootBoundary: k,
				padding: E,
				flipVariations: te,
				allowedAutoPlacements: z
			}) : m);
		}, []), q = t.rects.reference, ae = t.rects.popper, oe = /* @__PURE__ */ new Map(), Q = !0, se = B[0], ce = 0; ce < B.length; ce++) {
			var le = B[ce], ue = getBasePlacement$1(le), de = getVariation(le) === Ft, fe = ["top", At].indexOf(ue) >= 0, pe = fe ? "width" : "height", me = detectOverflow(t, {
				placement: le,
				boundary: O,
				rootBoundary: k,
				altBoundary: ee,
				padding: E
			}), he = fe ? de ? jt : Mt : de ? At : "top";
			q[pe] > ae[pe] && (he = getOppositePlacement(he));
			var ge = getOppositePlacement(he), _e = [];
			if (x && _e.push(me[ue] <= 0), C && _e.push(me[he] <= 0, me[ge] <= 0), _e.every(function(e) {
				return e;
			})) {
				se = le, Q = !1;
				break;
			}
			oe.set(le, _e);
		}
		if (Q) for (var ve = te ? 3 : 1, ye = function _loop(e) {
			var t = B.find(function(t) {
				var m = oe.get(t);
				if (m) return m.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return se = t, "break";
		}, be = ve; be > 0 && ye(be) !== "break"; be--);
		t.placement !== se && (t.modifiersData[v]._skip = !0, t.placement = se, t.reset = !0);
	}
}
var tn = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(e, t, m) {
	return m === void 0 && (m = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - m.y,
		right: e.right - t.width + m.x,
		bottom: e.bottom - t.height + m.y,
		left: e.left - t.width - m.x
	};
}
function isAnySideFullyClipped(e) {
	return [
		"top",
		jt,
		At,
		Mt
	].some(function(t) {
		return e[t] >= 0;
	});
}
function hide(e) {
	var t = e.state, m = e.name, v = t.rects.reference, y = t.rects.popper, x = t.modifiersData.preventOverflow, S = detectOverflow(t, { elementContext: "reference" }), C = detectOverflow(t, { altBoundary: !0 }), w = getSideOffsets(S, v), E = getSideOffsets(C, y, x), O = isAnySideFullyClipped(w), k = isAnySideFullyClipped(E);
	t.modifiersData[m] = {
		referenceClippingOffsets: w,
		popperEscapeOffsets: E,
		isReferenceHidden: O,
		hasPopperEscaped: k
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": O,
		"data-popper-escaped": k
	});
}
var nn = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(e, t, m) {
	var v = getBasePlacement$1(e), y = ["left", "top"].indexOf(v) >= 0 ? -1 : 1, x = typeof m == "function" ? m(Object.assign({}, t, { placement: e })) : m, S = x[0], C = x[1];
	return S ||= 0, C = (C || 0) * y, ["left", "right"].indexOf(v) >= 0 ? {
		x: C,
		y: S
	} : {
		x: S,
		y: C
	};
}
function offset(e) {
	var t = e.state, m = e.options, v = e.name, y = m.offset, x = y === void 0 ? [0, 0] : y, S = Vt.reduce(function(e, m) {
		return e[m] = distanceAndSkiddingToXY(m, t.rects, x), e;
	}, {}), C = S[t.placement], w = C.x, E = C.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += w, t.modifiersData.popperOffsets.y += E), t.modifiersData[v] = S;
}
var rn = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(e) {
	var t = e.state, m = e.name;
	t.modifiersData[m] = computeOffsets({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var an = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(e) {
	var t = e.state, m = e.options, v = e.name, y = m.mainAxis, x = y === void 0 ? !0 : y, S = m.altAxis, C = S === void 0 ? !1 : S, w = m.boundary, E = m.rootBoundary, O = m.altBoundary, k = m.padding, ee = m.tether, I = ee === void 0 ? !0 : ee, te = m.tetherOffset, z = te === void 0 ? 0 : te, ne = detectOverflow(t, {
		boundary: w,
		rootBoundary: E,
		padding: k,
		altBoundary: O
	}), re = getBasePlacement$1(t.placement), ie = getVariation(t.placement), B = !ie, q = getMainAxisFromPlacement(re), ae = getAltAxis(q), oe = t.modifiersData.popperOffsets, Q = t.rects.reference, se = t.rects.popper, ce = typeof z == "function" ? z(Object.assign({}, t.rects, { placement: t.placement })) : z, le = typeof ce == "number" ? {
		mainAxis: ce,
		altAxis: ce
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, ce), ue = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, de = {
		x: 0,
		y: 0
	};
	if (oe) {
		if (x) {
			var fe = q === "y" ? "top" : Mt, pe = q === "y" ? At : jt, me = q === "y" ? "height" : "width", he = oe[q], ge = he + ne[fe], _e = he - ne[pe], ve = I ? -se[me] / 2 : 0, ye = ie === "start" ? Q[me] : se[me], be = ie === "start" ? -se[me] : -Q[me], xe = t.elements.arrow, Se = I && xe ? getLayoutRect(xe) : {
				width: 0,
				height: 0
			}, Ce = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : getFreshSideObject(), we = Ce[fe], Te = Ce[pe], Ee = within(0, Q[me], Se[me]), De = B ? Q[me] / 2 - ve - Ee - we - le.mainAxis : ye - Ee - we - le.mainAxis, Oe = B ? -Q[me] / 2 + ve + Ee + Te + le.mainAxis : be + Ee + Te + le.mainAxis, ke = t.elements.arrow && getOffsetParent(t.elements.arrow), Ae = ke ? q === "y" ? ke.clientTop || 0 : ke.clientLeft || 0 : 0, je = ue?.[q] ?? 0, Me = he + De - je - Ae, Ne = he + Oe - je, Pe = within(I ? Gt(ge, Me) : ge, he, I ? Wt(_e, Ne) : _e);
			oe[q] = Pe, de[q] = Pe - he;
		}
		if (C) {
			var Fe = q === "x" ? "top" : Mt, Ie = q === "x" ? At : jt, Le = oe[ae], Re = ae === "y" ? "height" : "width", ze = Le + ne[Fe], Be = Le - ne[Ie], Ve = ["top", Mt].indexOf(re) !== -1, He = ue?.[ae] ?? 0, Ue = Ve ? ze : Le - Q[Re] - se[Re] - He + le.altAxis, We = Ve ? Le + Q[Re] + se[Re] - He - le.altAxis : Be, Ge = I && Ve ? withinMaxClamp(Ue, Le, We) : within(I ? Ue : ze, Le, I ? We : Be);
			oe[ae] = Ge, de[ae] = Ge - Le;
		}
		t.modifiersData[v] = de;
	}
}
var sn = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(e) {
	return e === getWindow(e) || !isHTMLElement(e) ? getWindowScroll(e) : getHTMLElementScroll(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(e) {
	var t = e.getBoundingClientRect(), m = Kt(t.width) / e.offsetWidth || 1, v = Kt(t.height) / e.offsetHeight || 1;
	return m !== 1 || v !== 1;
}
function getCompositeRect(e, t, m) {
	m === void 0 && (m = !1);
	var v = isHTMLElement(t), y = isHTMLElement(t) && isElementScaled(t), x = getDocumentElement(t), S = getBoundingClientRect(e, y), C = {
		scrollLeft: 0,
		scrollTop: 0
	}, w = {
		x: 0,
		y: 0
	};
	return (v || !v && !m) && ((getNodeName(t) !== "body" || isScrollParent(x)) && (C = getNodeScroll(t)), isHTMLElement(t) ? (w = getBoundingClientRect(t, !0), w.x += t.clientLeft, w.y += t.clientTop) : x && (w.x = getWindowScrollBarX(x))), {
		x: S.left + C.scrollLeft - w.x,
		y: S.top + C.scrollTop - w.y,
		width: S.width,
		height: S.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(e) {
	var t = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), v = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function sort(e) {
		m.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!m.has(e)) {
				var v = t.get(e);
				v && sort(v);
			}
		}), v.push(e);
	}
	return e.forEach(function(e) {
		m.has(e.name) || sort(e);
	}), v;
}
function orderModifiers(e) {
	var t = order(e);
	return Ht.reduce(function(e, m) {
		return e.concat(t.filter(function(e) {
			return e.phase === m;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function debounce$1(e) {
	var t;
	return function() {
		return t ||= new Promise(function(m) {
			Promise.resolve().then(function() {
				t = void 0, m(e());
			});
		}), t;
	};
}
t(debounce$1, "debounce");
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(e) {
	var t = e.reduce(function(e, t) {
		var m = e[t.name];
		return e[t.name] = m ? Object.assign({}, m, t, {
			options: Object.assign({}, m.options, t.options),
			data: Object.assign({}, m.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var cn = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function popperGenerator(e) {
	e === void 0 && (e = {});
	var t = e, m = t.defaultModifiers, v = m === void 0 ? [] : m, y = t.defaultOptions, x = y === void 0 ? cn : y;
	return function createPopper(e, t, m) {
		m === void 0 && (m = x);
		var y = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, cn, x),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, S = [], C = !1, w = {
			state: y,
			setOptions: function setOptions(m) {
				var S = typeof m == "function" ? m(y.options) : m;
				cleanupModifierEffects(), y.options = Object.assign({}, x, y.options, S), y.scrollParents = {
					reference: isElement$1(e) ? listScrollParents(e) : e.contextElement ? listScrollParents(e.contextElement) : [],
					popper: listScrollParents(t)
				};
				var C = orderModifiers(mergeByName([].concat(v, y.options.modifiers)));
				return y.orderedModifiers = C.filter(function(e) {
					return e.enabled;
				}), runModifierEffects(), w.update();
			},
			forceUpdate: function forceUpdate() {
				if (!C) {
					var e = y.elements, t = e.reference, m = e.popper;
					if (areValidElements(t, m)) {
						y.rects = {
							reference: getCompositeRect(t, getOffsetParent(m), y.options.strategy === "fixed"),
							popper: getLayoutRect(m)
						}, y.reset = !1, y.placement = y.options.placement, y.orderedModifiers.forEach(function(e) {
							return y.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var v = 0; v < y.orderedModifiers.length; v++) {
							if (y.reset === !0) {
								y.reset = !1, v = -1;
								continue;
							}
							var x = y.orderedModifiers[v], S = x.fn, E = x.options, O = E === void 0 ? {} : E, k = x.name;
							typeof S == "function" && (y = S({
								state: y,
								options: O,
								name: k,
								instance: w
							}) || y);
						}
					}
				}
			},
			update: debounce$1(function() {
				return new Promise(function(e) {
					w.forceUpdate(), e(y);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects(), C = !0;
			}
		};
		if (!areValidElements(e, t)) return w;
		w.setOptions(m).then(function(e) {
			!C && m.onFirstUpdate && m.onFirstUpdate(e);
		});
		function runModifierEffects() {
			y.orderedModifiers.forEach(function(e) {
				var t = e.name, m = e.options, v = m === void 0 ? {} : m, x = e.effect;
				if (typeof x == "function") {
					var C = x({
						state: y,
						name: t,
						instance: w,
						options: v
					});
					S.push(C || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			S.forEach(function(e) {
				return e();
			}), S = [];
		}
		return w;
	};
}
var ln = /*#__PURE__*/ popperGenerator({ defaultModifiers: [
	Qt,
	an,
	Xt,
	Ut,
	rn,
	tn,
	sn,
	Jt,
	nn
] }), un = "tippy-box", dn = "tippy-content", pn = "tippy-backdrop", mn = "tippy-arrow", hn = "tippy-svg-arrow", gn = {
	passive: !0,
	capture: !0
}, _n = function TIPPY_DEFAULT_APPEND_TO() {
	return document.body;
};
function getValueAtIndexOrReturn(e, t, m) {
	return Array.isArray(e) ? e[t] ?? (Array.isArray(m) ? m[t] : m) : e;
}
function isType(e, t) {
	var m = {}.toString.call(e);
	return m.indexOf("[object") === 0 && m.indexOf(t + "]") > -1;
}
function invokeWithArgsOrReturn(e, t) {
	return typeof e == "function" ? e.apply(void 0, t) : e;
}
function debounce(e, t) {
	if (t === 0) return e;
	var m;
	return function(v) {
		clearTimeout(m), m = setTimeout(function() {
			e(v);
		}, t);
	};
}
function splitBySpaces(e) {
	return e.split(/\s+/).filter(Boolean);
}
function normalizeToArray(e) {
	return [].concat(e);
}
function pushIfUnique(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function unique(e) {
	return e.filter(function(t, m) {
		return e.indexOf(t) === m;
	});
}
function getBasePlacement(e) {
	return e.split("-")[0];
}
function arrayFrom(e) {
	return [].slice.call(e);
}
function removeUndefinedProps(e) {
	return Object.keys(e).reduce(function(t, m) {
		return e[m] !== void 0 && (t[m] = e[m]), t;
	}, {});
}
function div() {
	return document.createElement("div");
}
function isElement(e) {
	return ["Element", "Fragment"].some(function(t) {
		return isType(e, t);
	});
}
function isNodeList(e) {
	return isType(e, "NodeList");
}
function isMouseEvent(e) {
	return isType(e, "MouseEvent");
}
function isReferenceElement(e) {
	return !!(e && e._tippy && e._tippy.reference === e);
}
function getArrayOfElements(e) {
	return isElement(e) ? [e] : isNodeList(e) ? arrayFrom(e) : Array.isArray(e) ? e : arrayFrom(document.querySelectorAll(e));
}
function setTransitionDuration(e, t) {
	e.forEach(function(e) {
		e && (e.style.transitionDuration = t + "ms");
	});
}
function setVisibilityState(e, t) {
	e.forEach(function(e) {
		e && e.setAttribute("data-state", t);
	});
}
function getOwnerDocument(e) {
	var t, m = normalizeToArray(e)[0];
	return m != null && (t = m.ownerDocument) != null && t.body ? m.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(e, t) {
	var m = t.clientX, v = t.clientY;
	return e.every(function(e) {
		var t = e.popperRect, y = e.popperState, x = e.props.interactiveBorder, S = getBasePlacement(y.placement), C = y.modifiersData.offset;
		if (!C) return !0;
		var w = S === "bottom" ? C.top.y : 0, E = S === "top" ? C.bottom.y : 0, O = S === "right" ? C.left.x : 0, k = S === "left" ? C.right.x : 0, ee = t.top - v + w > x, I = v - t.bottom - E > x, te = t.left - m + O > x, z = m - t.right - k > x;
		return ee || I || te || z;
	});
}
function updateTransitionEndListener(e, t, m) {
	var v = t + "EventListener";
	["transitionend", "webkitTransitionEnd"].forEach(function(t) {
		e[v](t, m);
	});
}
function actualContains(e, t) {
	for (var m = t; m;) {
		if (e.contains(m)) return !0;
		m = m.getRootNode == null ? void 0 : m.getRootNode()?.host;
	}
	return !1;
}
var vn = { isTouch: !1 }, yn = 0;
function onDocumentTouchStart() {
	vn.isTouch || (vn.isTouch = !0, window.performance && document.addEventListener("mousemove", onDocumentMouseMove));
}
function onDocumentMouseMove() {
	var e = performance.now();
	e - yn < 20 && (vn.isTouch = !1, document.removeEventListener("mousemove", onDocumentMouseMove)), yn = e;
}
function onWindowBlur() {
	var e = document.activeElement;
	if (isReferenceElement(e)) {
		var t = e._tippy;
		e.blur && !t.state.isVisible && e.blur();
	}
}
function bindGlobalEventListeners() {
	document.addEventListener("touchstart", onDocumentTouchStart, gn), window.addEventListener("blur", onWindowBlur);
}
var bn = typeof window < "u" && typeof document < "u" ? !!window.msCrypto : !1, xn = Object.assign({
	appendTo: _n,
	aria: {
		content: "auto",
		expanded: "auto"
	},
	delay: 0,
	duration: [300, 250],
	getReferenceClientRect: null,
	hideOnClick: !0,
	ignoreAttributes: !1,
	interactive: !1,
	interactiveBorder: 2,
	interactiveDebounce: 0,
	moveTransition: "",
	offset: [0, 10],
	onAfterUpdate: function onAfterUpdate() {},
	onBeforeUpdate: function onBeforeUpdate() {},
	onCreate: function onCreate() {},
	onDestroy: function onDestroy() {},
	onHidden: function onHidden() {},
	onHide: function onHide() {},
	onMount: function onMount() {},
	onShow: function onShow() {},
	onShown: function onShown() {},
	onTrigger: function onTrigger() {},
	onUntrigger: function onUntrigger() {},
	onClickOutside: function onClickOutside() {},
	placement: "top",
	plugins: [],
	popperOptions: {},
	render: null,
	showOnCreate: !1,
	touch: !0,
	trigger: "mouseenter focus",
	triggerTarget: null
}, {
	animateFill: !1,
	followCursor: !1,
	inlinePositioning: !1,
	sticky: !1
}, {
	allowHTML: !1,
	animation: "fade",
	arrow: !0,
	content: "",
	inertia: !1,
	maxWidth: 350,
	role: "tooltip",
	theme: "",
	zIndex: 9999
}), Sn = Object.keys(xn), Cn = function setDefaultProps(e) {
	Object.keys(e).forEach(function(t) {
		xn[t] = e[t];
	});
};
function getExtendedPassedProps(e) {
	var t = (e.plugins || []).reduce(function(t, m) {
		var v = m.name, y = m.defaultValue;
		return v && (t[v] = e[v] === void 0 ? xn[v] ?? y : e[v]), t;
	}, {});
	return Object.assign({}, e, t);
}
function getDataAttributeProps(e, t) {
	return (t ? Object.keys(getExtendedPassedProps(Object.assign({}, xn, { plugins: t }))) : Sn).reduce(function(t, m) {
		var v = (e.getAttribute("data-tippy-" + m) || "").trim();
		if (!v) return t;
		if (m === "content") t[m] = v;
		else try {
			t[m] = JSON.parse(v);
		} catch {
			t[m] = v;
		}
		return t;
	}, {});
}
function evaluateProps(e, t) {
	var m = Object.assign({}, t, { content: invokeWithArgsOrReturn(t.content, [e]) }, t.ignoreAttributes ? {} : getDataAttributeProps(e, t.plugins));
	return m.aria = Object.assign({}, xn.aria, m.aria), m.aria = {
		expanded: m.aria.expanded === "auto" ? t.interactive : m.aria.expanded,
		content: m.aria.content === "auto" ? t.interactive ? null : "describedby" : m.aria.content
	}, m;
}
var wn = function innerHTML() {
	return "innerHTML";
};
function dangerouslySetInnerHTML(e, t) {
	e[wn()] = t;
}
function createArrowElement(e) {
	var t = div();
	return e === !0 ? t.className = mn : (t.className = hn, isElement(e) ? t.appendChild(e) : dangerouslySetInnerHTML(t, e)), t;
}
function setContent(e, t) {
	isElement(t.content) ? (dangerouslySetInnerHTML(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? dangerouslySetInnerHTML(e, t.content) : e.textContent = t.content);
}
function getChildren(e) {
	var t = e.firstElementChild, m = arrayFrom(t.children);
	return {
		box: t,
		content: m.find(function(e) {
			return e.classList.contains(dn);
		}),
		arrow: m.find(function(e) {
			return e.classList.contains(mn) || e.classList.contains(hn);
		}),
		backdrop: m.find(function(e) {
			return e.classList.contains(pn);
		})
	};
}
function render(e) {
	var t = div(), m = div();
	m.className = un, m.setAttribute("data-state", "hidden"), m.setAttribute("tabindex", "-1");
	var v = div();
	v.className = dn, v.setAttribute("data-state", "hidden"), setContent(v, e.props), t.appendChild(m), m.appendChild(v), onUpdate(e.props, e.props);
	function onUpdate(m, v) {
		var y = getChildren(t), x = y.box, S = y.content, C = y.arrow;
		v.theme ? x.setAttribute("data-theme", v.theme) : x.removeAttribute("data-theme"), typeof v.animation == "string" ? x.setAttribute("data-animation", v.animation) : x.removeAttribute("data-animation"), v.inertia ? x.setAttribute("data-inertia", "") : x.removeAttribute("data-inertia"), x.style.maxWidth = typeof v.maxWidth == "number" ? v.maxWidth + "px" : v.maxWidth, v.role ? x.setAttribute("role", v.role) : x.removeAttribute("role"), (m.content !== v.content || m.allowHTML !== v.allowHTML) && setContent(S, e.props), v.arrow ? C ? m.arrow !== v.arrow && (x.removeChild(C), x.appendChild(createArrowElement(v.arrow))) : x.appendChild(createArrowElement(v.arrow)) : C && x.removeChild(C);
	}
	return {
		popper: t,
		onUpdate
	};
}
render.$$tippy = !0;
var Tn = 1, En = [], Dn = [];
function createTippy(e, t) {
	var m = evaluateProps(e, Object.assign({}, xn, getExtendedPassedProps(removeUndefinedProps(t)))), v, y, x, S = !1, C = !1, w = !1, E = !1, O, k, ee, I = [], te = debounce(onMouseMove, m.interactiveDebounce), z, ne = Tn++, re = null, ie = unique(m.plugins), B = {
		id: ne,
		reference: e,
		popper: div(),
		popperInstance: re,
		props: m,
		state: {
			isEnabled: !0,
			isVisible: !1,
			isDestroyed: !1,
			isMounted: !1,
			isShown: !1
		},
		plugins: ie,
		clearDelayTimeouts,
		setProps,
		setContent,
		show,
		hide,
		hideWithInteractivity,
		enable,
		disable,
		unmount,
		destroy
	};
	/* istanbul ignore if */
	if (!m.render) return B;
	var q = m.render(B), ae = q.popper, oe = q.onUpdate;
	ae.setAttribute("data-tippy-root", ""), ae.id = "tippy-" + B.id, B.popper = ae, e._tippy = B, ae._tippy = B;
	var Q = ie.map(function(e) {
		return e.fn(B);
	}), se = e.hasAttribute("aria-expanded");
	return addListeners(), handleAriaExpandedAttribute(), handleStyles(), invokeHook("onCreate", [B]), m.showOnCreate && scheduleShow(), ae.addEventListener("mouseenter", function() {
		B.props.interactive && B.state.isVisible && B.clearDelayTimeouts();
	}), ae.addEventListener("mouseleave", function() {
		B.props.interactive && B.props.trigger.indexOf("mouseenter") >= 0 && getDocument().addEventListener("mousemove", te);
	}), B;
	function getNormalizedTouchSettings() {
		var e = B.props.touch;
		return Array.isArray(e) ? e : [e, 0];
	}
	function getIsCustomTouchBehavior() {
		return getNormalizedTouchSettings()[0] === "hold";
	}
	function getIsDefaultRenderFn() {
		var e;
		return !!((e = B.props.render) != null && e.$$tippy);
	}
	function getCurrentTarget() {
		return z || e;
	}
	function getDocument() {
		var e = getCurrentTarget().parentNode;
		return e ? getOwnerDocument(e) : document;
	}
	function getDefaultTemplateChildren() {
		return getChildren(ae);
	}
	function getDelay(e) {
		return B.state.isMounted && !B.state.isVisible || vn.isTouch || O && O.type === "focus" ? 0 : getValueAtIndexOrReturn(B.props.delay, +!e, xn.delay);
	}
	function handleStyles(e) {
		e === void 0 && (e = !1), ae.style.pointerEvents = B.props.interactive && !e ? "" : "none", ae.style.zIndex = "" + B.props.zIndex;
	}
	function invokeHook(e, t, m) {
		if (m === void 0 && (m = !0), Q.forEach(function(m) {
			m[e] && m[e].apply(m, t);
		}), m) {
			var v;
			(v = B.props)[e].apply(v, t);
		}
	}
	function handleAriaContentAttribute() {
		var t = B.props.aria;
		if (t.content) {
			var m = "aria-" + t.content, v = ae.id;
			normalizeToArray(B.props.triggerTarget || e).forEach(function(e) {
				var t = e.getAttribute(m);
				if (B.state.isVisible) e.setAttribute(m, t ? t + " " + v : v);
				else {
					var y = t && t.replace(v, "").trim();
					y ? e.setAttribute(m, y) : e.removeAttribute(m);
				}
			});
		}
	}
	function handleAriaExpandedAttribute() {
		se || !B.props.aria.expanded || normalizeToArray(B.props.triggerTarget || e).forEach(function(e) {
			B.props.interactive ? e.setAttribute("aria-expanded", B.state.isVisible && e === getCurrentTarget() ? "true" : "false") : e.removeAttribute("aria-expanded");
		});
	}
	function cleanupInteractiveMouseListeners() {
		getDocument().removeEventListener("mousemove", te), En = En.filter(function(e) {
			return e !== te;
		});
	}
	function onDocumentPress(t) {
		if (!(vn.isTouch && (w || t.type === "mousedown"))) {
			var m = t.composedPath && t.composedPath()[0] || t.target;
			if (!(B.props.interactive && actualContains(ae, m))) {
				if (normalizeToArray(B.props.triggerTarget || e).some(function(e) {
					return actualContains(e, m);
				})) {
					if (vn.isTouch || B.state.isVisible && B.props.trigger.indexOf("click") >= 0) return;
				} else invokeHook("onClickOutside", [B, t]);
				B.props.hideOnClick === !0 && (B.clearDelayTimeouts(), B.hide(), C = !0, setTimeout(function() {
					C = !1;
				}), B.state.isMounted || removeDocumentPress());
			}
		}
	}
	function onTouchMove() {
		w = !0;
	}
	function onTouchStart() {
		w = !1;
	}
	function addDocumentPress() {
		var e = getDocument();
		e.addEventListener("mousedown", onDocumentPress, !0), e.addEventListener("touchend", onDocumentPress, gn), e.addEventListener("touchstart", onTouchStart, gn), e.addEventListener("touchmove", onTouchMove, gn);
	}
	function removeDocumentPress() {
		var e = getDocument();
		e.removeEventListener("mousedown", onDocumentPress, !0), e.removeEventListener("touchend", onDocumentPress, gn), e.removeEventListener("touchstart", onTouchStart, gn), e.removeEventListener("touchmove", onTouchMove, gn);
	}
	function onTransitionedOut(e, t) {
		onTransitionEnd(e, function() {
			!B.state.isVisible && ae.parentNode && ae.parentNode.contains(ae) && t();
		});
	}
	function onTransitionedIn(e, t) {
		onTransitionEnd(e, t);
	}
	function onTransitionEnd(e, t) {
		var m = getDefaultTemplateChildren().box;
		function listener(e) {
			e.target === m && (updateTransitionEndListener(m, "remove", listener), t());
		}
		if (e === 0) return t();
		updateTransitionEndListener(m, "remove", k), updateTransitionEndListener(m, "add", listener), k = listener;
	}
	function on(t, m, v) {
		v === void 0 && (v = !1), normalizeToArray(B.props.triggerTarget || e).forEach(function(e) {
			e.addEventListener(t, m, v), I.push({
				node: e,
				eventType: t,
				handler: m,
				options: v
			});
		});
	}
	function addListeners() {
		getIsCustomTouchBehavior() && (on("touchstart", onTrigger, { passive: !0 }), on("touchend", onMouseLeave, { passive: !0 })), splitBySpaces(B.props.trigger).forEach(function(e) {
			if (e !== "manual") switch (on(e, onTrigger), e) {
				case "mouseenter":
					on("mouseleave", onMouseLeave);
					break;
				case "focus":
					on(bn ? "focusout" : "blur", onBlurOrFocusOut);
					break;
				case "focusin":
					on("focusout", onBlurOrFocusOut);
					break;
			}
		});
	}
	function removeListeners() {
		I.forEach(function(e) {
			var t = e.node, m = e.eventType, v = e.handler, y = e.options;
			t.removeEventListener(m, v, y);
		}), I = [];
	}
	function onTrigger(e) {
		var t = !1;
		if (!(!B.state.isEnabled || isEventListenerStopped(e) || C)) {
			var m = O?.type === "focus";
			O = e, z = e.currentTarget, handleAriaExpandedAttribute(), !B.state.isVisible && isMouseEvent(e) && En.forEach(function(t) {
				return t(e);
			}), e.type === "click" && (B.props.trigger.indexOf("mouseenter") < 0 || S) && B.props.hideOnClick !== !1 && B.state.isVisible ? t = !0 : scheduleShow(e), e.type === "click" && (S = !t), t && !m && scheduleHide(e);
		}
	}
	function onMouseMove(e) {
		var t = e.target, v = getCurrentTarget().contains(t) || ae.contains(t);
		e.type === "mousemove" && v || isCursorOutsideInteractiveBorder(getNestedPopperTree().concat(ae).map(function(e) {
			var t = e._tippy.popperInstance?.state;
			return t ? {
				popperRect: e.getBoundingClientRect(),
				popperState: t,
				props: m
			} : null;
		}).filter(Boolean), e) && (cleanupInteractiveMouseListeners(), scheduleHide(e));
	}
	function onMouseLeave(e) {
		if (!(isEventListenerStopped(e) || B.props.trigger.indexOf("click") >= 0 && S)) {
			if (B.props.interactive) {
				B.hideWithInteractivity(e);
				return;
			}
			scheduleHide(e);
		}
	}
	function onBlurOrFocusOut(e) {
		B.props.trigger.indexOf("focusin") < 0 && e.target !== getCurrentTarget() || B.props.interactive && e.relatedTarget && ae.contains(e.relatedTarget) || scheduleHide(e);
	}
	function isEventListenerStopped(e) {
		return vn.isTouch ? getIsCustomTouchBehavior() !== e.type.indexOf("touch") >= 0 : !1;
	}
	function createPopperInstance() {
		destroyPopperInstance();
		var t = B.props, m = t.popperOptions, v = t.placement, y = t.offset, x = t.getReferenceClientRect, S = t.moveTransition, C = getIsDefaultRenderFn() ? getChildren(ae).arrow : null, w = x ? {
			getBoundingClientRect: x,
			contextElement: x.contextElement || getCurrentTarget()
		} : e, E = [
			{
				name: "offset",
				options: { offset: y }
			},
			{
				name: "preventOverflow",
				options: { padding: {
					top: 2,
					bottom: 2,
					left: 5,
					right: 5
				} }
			},
			{
				name: "flip",
				options: { padding: 5 }
			},
			{
				name: "computeStyles",
				options: { adaptive: !S }
			},
			{
				name: "$$tippy",
				enabled: !0,
				phase: "beforeWrite",
				requires: ["computeStyles"],
				fn: function fn(e) {
					var t = e.state;
					if (getIsDefaultRenderFn()) {
						var m = getDefaultTemplateChildren().box;
						[
							"placement",
							"reference-hidden",
							"escaped"
						].forEach(function(e) {
							e === "placement" ? m.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? m.setAttribute("data-" + e, "") : m.removeAttribute("data-" + e);
						}), t.attributes.popper = {};
					}
				}
			}
		];
		getIsDefaultRenderFn() && C && E.push({
			name: "arrow",
			options: {
				element: C,
				padding: 3
			}
		}), E.push.apply(E, m?.modifiers || []), B.popperInstance = ln(w, ae, Object.assign({}, m, {
			placement: v,
			onFirstUpdate: ee,
			modifiers: E
		}));
	}
	function destroyPopperInstance() {
		B.popperInstance &&= (B.popperInstance.destroy(), null);
	}
	function mount() {
		var e = B.props.appendTo, t, m = getCurrentTarget();
		t = B.props.interactive && e === _n || e === "parent" ? m.parentNode : invokeWithArgsOrReturn(e, [m]), t.contains(ae) || t.appendChild(ae), B.state.isMounted = !0, createPopperInstance();
	}
	function getNestedPopperTree() {
		return arrayFrom(ae.querySelectorAll("[data-tippy-root]"));
	}
	function scheduleShow(e) {
		B.clearDelayTimeouts(), e && invokeHook("onTrigger", [B, e]), addDocumentPress();
		var t = getDelay(!0), m = getNormalizedTouchSettings(), y = m[0], x = m[1];
		vn.isTouch && y === "hold" && x && (t = x), t ? v = setTimeout(function() {
			B.show();
		}, t) : B.show();
	}
	function scheduleHide(e) {
		if (B.clearDelayTimeouts(), invokeHook("onUntrigger", [B, e]), !B.state.isVisible) {
			removeDocumentPress();
			return;
		}
		if (!(B.props.trigger.indexOf("mouseenter") >= 0 && B.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && S)) {
			var t = getDelay(!1);
			t ? y = setTimeout(function() {
				B.state.isVisible && B.hide();
			}, t) : x = requestAnimationFrame(function() {
				B.hide();
			});
		}
	}
	function enable() {
		B.state.isEnabled = !0;
	}
	function disable() {
		B.hide(), B.state.isEnabled = !1;
	}
	function clearDelayTimeouts() {
		clearTimeout(v), clearTimeout(y), cancelAnimationFrame(x);
	}
	function setProps(t) {
		if (!B.state.isDestroyed) {
			invokeHook("onBeforeUpdate", [B, t]), removeListeners();
			var m = B.props, v = evaluateProps(e, Object.assign({}, m, removeUndefinedProps(t), { ignoreAttributes: !0 }));
			B.props = v, addListeners(), m.interactiveDebounce !== v.interactiveDebounce && (cleanupInteractiveMouseListeners(), te = debounce(onMouseMove, v.interactiveDebounce)), m.triggerTarget && !v.triggerTarget ? normalizeToArray(m.triggerTarget).forEach(function(e) {
				e.removeAttribute("aria-expanded");
			}) : v.triggerTarget && e.removeAttribute("aria-expanded"), handleAriaExpandedAttribute(), handleStyles(), oe && oe(m, v), B.popperInstance && (createPopperInstance(), getNestedPopperTree().forEach(function(e) {
				requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
			})), invokeHook("onAfterUpdate", [B, t]);
		}
	}
	function setContent(e) {
		B.setProps({ content: e });
	}
	function show() {
		var e = B.state.isVisible, t = B.state.isDestroyed, m = !B.state.isEnabled, v = vn.isTouch && !B.props.touch, y = getValueAtIndexOrReturn(B.props.duration, 0, xn.duration);
		if (!(e || t || m || v) && !getCurrentTarget().hasAttribute("disabled") && (invokeHook("onShow", [B], !1), B.props.onShow(B) !== !1)) {
			if (B.state.isVisible = !0, getIsDefaultRenderFn() && (ae.style.visibility = "visible"), handleStyles(), addDocumentPress(), B.state.isMounted || (ae.style.transition = "none"), getIsDefaultRenderFn()) {
				var x = getDefaultTemplateChildren(), S = x.box, C = x.content;
				setTransitionDuration([S, C], 0);
			}
			ee = function onFirstUpdate() {
				var e;
				if (!(!B.state.isVisible || E)) {
					if (E = !0, ae.offsetHeight, ae.style.transition = B.props.moveTransition, getIsDefaultRenderFn() && B.props.animation) {
						var t = getDefaultTemplateChildren(), m = t.box, v = t.content;
						setTransitionDuration([m, v], y), setVisibilityState([m, v], "visible");
					}
					handleAriaContentAttribute(), handleAriaExpandedAttribute(), pushIfUnique(Dn, B), (e = B.popperInstance) == null || e.forceUpdate(), invokeHook("onMount", [B]), B.props.animation && getIsDefaultRenderFn() && onTransitionedIn(y, function() {
						B.state.isShown = !0, invokeHook("onShown", [B]);
					});
				}
			}, mount();
		}
	}
	function hide() {
		var e = !B.state.isVisible, t = B.state.isDestroyed, m = !B.state.isEnabled, v = getValueAtIndexOrReturn(B.props.duration, 1, xn.duration);
		if (!(e || t || m) && (invokeHook("onHide", [B], !1), B.props.onHide(B) !== !1)) {
			if (B.state.isVisible = !1, B.state.isShown = !1, E = !1, S = !1, getIsDefaultRenderFn() && (ae.style.visibility = "hidden"), cleanupInteractiveMouseListeners(), removeDocumentPress(), handleStyles(!0), getIsDefaultRenderFn()) {
				var y = getDefaultTemplateChildren(), x = y.box, C = y.content;
				B.props.animation && (setTransitionDuration([x, C], v), setVisibilityState([x, C], "hidden"));
			}
			handleAriaContentAttribute(), handleAriaExpandedAttribute(), B.props.animation ? getIsDefaultRenderFn() && onTransitionedOut(v, B.unmount) : B.unmount();
		}
	}
	function hideWithInteractivity(e) {
		getDocument().addEventListener("mousemove", te), pushIfUnique(En, te), te(e);
	}
	function unmount() {
		B.state.isVisible && B.hide(), B.state.isMounted && (destroyPopperInstance(), getNestedPopperTree().forEach(function(e) {
			e._tippy.unmount();
		}), ae.parentNode && ae.parentNode.removeChild(ae), Dn = Dn.filter(function(e) {
			return e !== B;
		}), B.state.isMounted = !1, invokeHook("onHidden", [B]));
	}
	function destroy() {
		B.state.isDestroyed || (B.clearDelayTimeouts(), B.unmount(), removeListeners(), delete e._tippy, B.state.isDestroyed = !0, invokeHook("onDestroy", [B]));
	}
}
function tippy(e, t) {
	t === void 0 && (t = {});
	var m = xn.plugins.concat(t.plugins || []);
	bindGlobalEventListeners();
	var v = Object.assign({}, t, { plugins: m }), y = getArrayOfElements(e).reduce(function(e, t) {
		var m = t && createTippy(t, v);
		return m && e.push(m), e;
	}, []);
	return isElement(e) ? y[0] : y;
}
//#endregion
//#region src/module/helpers/commons.ts
tippy.defaultProps = xn, tippy.setDefaultProps = Cn, tippy.currentInput = vn, Object.assign({}, Ut, { effect: function effect(e) {
	var t = e.state, m = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(t.elements.popper.style, m.popper), t.styles = m, t.elements.arrow && Object.assign(t.elements.arrow.style, m.arrow);
} }), tippy.setDefaultProps({ render }), foundry.applications.ux.ContextMenu;
var On = "// MISSING ENTRY //";
function inc_if(e, t) {
	return t ? e : "";
}
function lancerDiceRoll(e, t, m) {
	let v = m ? `<i class="${m}"></i>` : "", y = t || "";
	return `
<div class="dice-roll lancer-dice-roll" data-action="expandRoll">
  <div class="dice-result">
    <div class="dice-formula flexrow">
      ${e.formula}
      <span class="dice-total major">${e.total} ${v}</span>
    </div>
    ${y}
  </div>
</div>
  `;
}
function selected(e) {
	return e ? "selected" : "";
}
function array_path_edit_changes(e, t, m, v) {
	t = formatDotpath(t);
	let y = t.split("."), x = y.splice(y.length - 1)[0], S = y.join("."), C = parseInt(x), w = resolveDotpath(e, S);
	if (Array.isArray(w) && !Number.isNaN(C)) {
		if (C > w.length && (C = w.length), C < 0 && (C = w.length + C + 1, C < 0 && (C = 0)), v == "delete") return {
			path: S,
			new_val: [...w.slice(0, C), ...w.slice(C + 1)]
		};
		if (v == "insert") return {
			path: S,
			new_val: [
				...w.slice(0, C),
				m,
				...w.slice(C)
			]
		};
		throw Error("Invalid path edit mode " + v);
	} else throw Error(`Unable to insert array item "${S}[${x}]": not an array (or not a valid index)`);
}
var IconFactory = class {
	constructor(e) {
		if (this.classes = [], this.icon_prefix = "", e.light && this.classes.push("i--light"), e.dark && this.classes.push("i--dark"), this.classes.push(`i--${e.size ?? "m"}`), e.icon_set) {
			let t = e.icon_set.split(",");
			t.length > 1 ? (this.classes.push(t[0]), this.icon_prefix = t[1].trim() + "-") : this.classes.push(e.icon_set);
		}
	}
	r(e) {
		return `<i class="${this.classes.join(" ")} ${this.icon_prefix}${e}"> </i>`;
	}
};
function effectBox(e, t, m) {
	if (t) {
		let v = m?.flow ? "<div class=\"action-flow-container flexrow\">\n        <a class=\"effect-flow lancer-button\"><i class=\"cci cci-free-action i--3\"></i><span>USE</span></a>\n        <span class=\"vsep\"></span>\n      </div>" : "";
		return `
      <div class="effect-box ${m?.add_classes || ""}">
        <span class="effect-title clipped-bot">${e}</span>
        <span class="effect-text">
          ${v}
          ${t}
        </span>
      </div>
      `;
	} else return "";
}
function spDisplay(e) {
	let t = parseInt(e.toString());
	if (isNaN(t)) return "";
	let m = "";
	for (let e = 0; e < t; e++) m += "<i class=\"cci cci-system-point i--2\"> </i>";
	return `<div class="sp-wrapper">
            ${m}
            <span class="medium" style="padding: 5px;">${e} SYSTEM POINTS</span>
          </div>`;
}
function activationIcon(e) {
	switch (e) {
		case se.Quick: return "cci cci-activation-quick";
		case se.Full: return "cci cci-activation-full";
		case se.Invade:
		case se.QuickTech: return "cci cci-tech-quick";
		case se.FullTech: return "cci cci-tech-full";
		case se.Reaction: return "cci cci-reaction";
		case se.Protocol: return "cci cci-protocol";
		case se.Free:
		case se.Passive:
		default: return "cci cci-free-action";
	}
}
function activationStyle(e) {
	switch (e) {
		case se.Quick: return "lancer-quick";
		case se.Full: return "lancer-full";
		case se.Invade:
		case se.QuickTech:
		case se.FullTech: return "lancer-tech";
		case se.Reaction: return "lancer-reaction";
		case se.Protocol: return "lancer-protocol";
		case se.Free: return "lancer-free";
		case se.Passive:
		default: return "lancer-secondary";
	}
}
function manufacturerStyle(e, t) {
	let m = slugify(e, "-");
	return [
		"gms",
		"ips-n",
		"ssc",
		"horus",
		"ha"
	].includes(m) || (m = "primary"), `lancer${t ? "-border" : ""}-${m}`;
}
function safe_json_parse(e) {
	try {
		return JSON.parse(e);
	} catch {
		return null;
	}
}
function formatDotpath(e) {
	return e.replace(/\[/g, ".").replace(/]/g, "");
}
function stepwiseResolveDotpath(e, t) {
	let m = formatDotpath(t).split("."), v = [{
		pathlet: null,
		val: e
	}];
	for (let t of m) e = e?.[t], v.push({
		pathlet: t,
		val: e
	});
	return v;
}
function drilldownDocument(e, t) {
	let m = stepwiseResolveDotpath(e, t);
	for (let e = m.length - 1; e >= 0; e--) {
		let t = m[e];
		if (t.val instanceof foundry.abstract.Document) {
			let v = m.slice(e + 1).map((e) => e.pathlet).join(".");
			return {
				sub_doc: t.val,
				sub_path: v,
				terminus: m[m.length - 1].val
			};
		}
	}
	throw Error("Drilldown document must have at least one document in its path");
}
function resolveDotpath(e, t, m = null, v) {
	let y = stepwiseResolveDotpath(e, t), x;
	return x = v?.shorten_by ? y[y.length - 1 - v.shorten_by] : y[y.length - 1], x.val === void 0 ? m : x.val;
}
function helper_root_doc(e) {
	let t = e.data?.root;
	return t.item ?? t.actor;
}
var kn = Symbol("Fail");
function resolveHelperDotpath(e, t, m = null, v = !1) {
	if (v) {
		let v = e.data;
		for (; v;) {
			let e = resolveDotpath(v?.root, t, kn);
			if (e != kn) return e;
			v = v._parent;
		}
		return m;
	} else return resolveDotpath(e.data?.root, t, m);
}
function extendHelper(e, t, m = {}) {
	return {
		fn: e.fn,
		inverse: e.inverse,
		hash: {
			...m,
			...e.hash,
			...t
		},
		data: e.data
	};
}
function spoofHelper(e) {
	let fail_callback = () => {
		throw Error("spoofHelper is not sufficient here.");
	};
	return {
		fn: fail_callback,
		inverse: fail_callback,
		hash: {},
		data: e
	};
}
function handleGenControls(e, t, m) {
	e.find(".gen-control").off("click").on("click", async (e) => {
		e.stopPropagation();
		let v = e.currentTarget, y = v.dataset.actionValue, x;
		if (y) {
			let e = await parse_control_val(y);
			if (e.success) x = e.val;
			else {
				console.error(`Gen control failed: Bad data-action-value: ${y}`);
				return;
			}
		}
		let S = v.dataset.path, C = null, w;
		if (v.dataset.uuid) {
			if (C = await fromUuid(v.dataset.uuid), !C) return ui.notifications?.error("Bad uuid: " + v.dataset.uuid);
			w = drilldownDocument(C, S);
		} else w = drilldownDocument(t, S);
		let E = {
			elt: v,
			path: S,
			action: v.dataset.action,
			raw_val: v.dataset.actionValue,
			base_document: t,
			path_target: w.terminus,
			parsed_val: x,
			target_document: w.sub_doc,
			relative_path: w.sub_path
		};
		if (E.path ? E.action ? w.sub_doc || console.error("Gen control failed: target document does not exist") : console.error("Gen control failed: missing action") : console.error("Gen control failed: missing path"), E.action == "delete") E.path_target?.delete();
		else if (E.action == "splice") {
			let e = array_path_edit_changes(E.target_document, E.relative_path, null, "delete");
			await E.target_document.update({ [e.path]: e.new_val });
		} else if (E.action == "null") await E.target_document.update({ [E.relative_path]: null });
		else if (E.action == "set" && E.parsed_val !== void 0) await E.target_document.update({ [E.relative_path]: E.parsed_val });
		else if (E.action == "append") {
			let e = array_path_edit_changes(E.target_document, E.relative_path + "[-1]", x, "insert");
			await E.target_document.update({ [e.path]: e.new_val });
		} else if (E.action == "insert") {
			let e = array_path_edit_changes(E.target_document, E.relative_path, x, "insert");
			await E.target_document.update({ [e.path]: e.new_val });
		} else console.error("Unknown gen control action: " + E.action);
		m && m(E);
	});
}
async function parse_control_val(e) {
	let t = e.match(/\((.*?)\)(.*)/);
	if (t) {
		let e = t[1], m = t[2];
		switch (e) {
			case "string": return {
				success: !0,
				val: m
			};
			case "int":
				let e = parseInt(m);
				if (!Number.isNaN(e)) return {
					success: !0,
					val: e
				};
				break;
			case "float":
				let t = parseFloat(m);
				if (!Number.isNaN(t)) return {
					success: !0,
					val: t
				};
				break;
			case "bool":
				if (m == "true") return {
					success: !0,
					val: !0
				};
				if (m == "false") return {
					success: !0,
					val: !1
				};
			case "struct": return control_structs(m);
		}
	}
	return {
		success: !1,
		val: null
	};
}
async function control_structs(e) {
	switch (e) {
		case "empty_array": return {
			success: !0,
			val: []
		};
		case "string": return {
			success: !0,
			val: ""
		};
		case "npc_stat_array": return {
			success: !0,
			val: [
				0,
				0,
				0
			]
		};
		case "frame_trait": return {
			success: !0,
			val: FRAME_TRAIT()
		};
		case "bonus": return {
			success: !0,
			val: BONUS()
		};
		case "action": return {
			success: !0,
			val: ACTION()
		};
		case "counter": return {
			success: !0,
			val: COUNTER()
		};
		case "tag": return {
			success: !0,
			val: TAG()
		};
		case "bond_question": return {
			success: !0,
			val: BOND_QUESTION()
		};
		case "power": return {
			success: !0,
			val: POWER()
		};
		case "mount_type": return {
			success: !0,
			val: ne.Main
		};
		case "range": return {
			success: !0,
			val: RANGE()
		};
		case "damage": return {
			success: !0,
			val: DAMAGE()
		};
		case "wep_mount": return {
			success: !0,
			val: WEAPON_MOUNT()
		};
		case "weapon_profile": return {
			success: !0,
			val: WEAPON_PROFILE()
		};
		case "talent_rank": return {
			success: !0,
			val: TALENT_RANK()
		};
		case "WeaponSize": return {
			success: !0,
			val: q.Main
		};
		case "WeaponType": return {
			success: !0,
			val: ae.Rifle
		};
		case "ActivationType": return {
			success: !0,
			val: se.Quick
		};
	}
	return {
		success: !1,
		val: null
	};
}
function std_input(e, t, m) {
	let v = m.hash.classes || "", y = m.hash.label || "", x = m.hash.label_classes || "", S = "" + (m.hash.default ?? ""), C = m.hash.value;
	C ??= resolveHelperDotpath(m, e) ?? S;
	let w = t.toLowerCase(), E = `<input class="grow ${v}" name="${e}" value="${C}" type="${w}" data-dtype="${t == "Password" || t == "Text" ? "String" : t}" ${t == "Text" || t == "String" ? `placeholder="${On}"` : ""}/>`;
	return y ? `
    <label class="flexrow no-wrap flex-center ${x}">
      <span class="no-grow" style="padding: 2px 5px;">${y}</span>
      ${E}
    </label>` : E;
}
function std_text_input(e, t) {
	return std_input(e, "Text", t);
}
function std_password_input(e, t) {
	return std_input(e, "Password", t);
}
function std_num_input(e, t) {
	return std_input(e, "Number", t);
}
function std_x_of_y(e, t, m, v = "") {
	return ` <div class="flexrow flex-center no-wrap ${v}">
              <input class="lancer-stat" type="number" name="${e}" value="${t}" data-dtype="Number" style="justify-content: left"/>
              <span>/</span>
              <span class="lancer-stat" style="justify-content: left"> ${m}</span>
            </div>`;
}
function std_checkbox(e, t) {
	let m = t.hash.classes || "", v = t.hash.label || "", y = t.hash.label_classes || "", x = !!t.hash.default, S = t.hash.value;
	S ??= resolveHelperDotpath(t, e) ?? x;
	let C = `<input class="${m}" name="${e}" ${inc_if("checked", S)} type="checkbox" />`;
	return v ? `
    <label class="flexrow flex-center ${y}">
      <span class="no-grow" style="padding: 2px 5px;">${v}</span>
      ${C}
    </label>` : C;
}
function std_enum_select(e, t, m) {
	let v = Object.entries(t);
	m.hash.presorted || v.sort((e, t) => e[0].localeCompare(t[0]));
	let y = m.hash.select_classes || "", x = m.hash.label_classes || "", S = m.hash.default;
	S ??= v[0][1];
	let C = m.hash.value;
	C ??= resolveHelperDotpath(m, e, S);
	let w = restrict_enum(t, S, C), E = [];
	for (let e of v) E.push(`<option value="${e[1]}" ${selected(e[1] === w)}>${e[0].toUpperCase()}</option>`);
	let O = `
      <select name="${e}" class="${y}" data-type="String" style="height: 2em; align-self: center; margin: 4px;" >
        ${E.join("")}
      </select>`;
	return m.hash.label ? `<label class="flexrow flex-center no-wrap ${x}">
      ${m.hash.label}
      ${O}
    </label>` : O;
}
function popout_editor_button(e) {
	return `<a class="fas fa-edit popout-text-edit-button" data-path="${e}"> </a>`;
}
function handlePopoutTextEditor(e, t) {
	e.find(".popout-text-edit-button").on("click", async (e) => {
		e.stopPropagation();
		let m = e.currentTarget.dataset.path;
		if (m) {
			let e = drilldownDocument(t, m);
			await HTMLEditDialog.edit_text(e.sub_doc, e.sub_path);
		}
	});
}
function safe_html_helper(e) {
	let t = document.createElement("div");
	return t.innerHTML = e, e = t.innerHTML, e = e.replace(/on[a-zA-Z\-]+=".*?"/g, ""), e || "// MISSING ENTRY //";
}
function large_textbox_card(e, t, m) {
	let v = resolveHelperDotpath(m, t, "");
	return `
  <div class="card full clipped">
    <div class="lancer-header lancer-primary">
      <span>${e}</span>
      ${popout_editor_button(t)}
    </div>
    <div class="desc-text">
      ${safe_html_helper(v?.trim() || "// MISSING ENTRY //")}
    </div>
  </div>
  `;
}
function saveCancelButtons() {
	return "<div class=\"dialog-buttons\">\n        <button data-button=\"confirm\">\n            <i class=\"fas fa-save\"></i>\n            Save\n        </button>\n        <button data-button=\"cancel\">\n            <i class=\"fas fa-times\"></i>\n            Cancel\n        </button>\n    </div>";
}
function createContextMenu(e, t, m) {
	let v = $("<div class=\"lancer-context-menu flexcol\" />");
	for (let y of t) {
		let t = $(`<div class="lancer-context-item">${y.icon ?? ""}${y.name}</div>`);
		t.on("click", () => {
			y.callback(e), m && m();
		}), v.append(t);
	}
	return v[0];
}
function tippyContextMenu(e, t, m) {
	e.each((e, v) => {
		let y = $(v), x = m.filter((e) => e.condition ? e.condition === !0 || e.condition(y) : !0);
		if (!x.length) return;
		let S = tippy(v, {
			appendTo: () => document.body,
			placement: "bottom",
			trigger: "manual",
			interactive: !0,
			allowHTML: !0,
			theme: "lancer-large"
		}), C = createContextMenu(y, x, () => S.hide());
		S.setContent(C), y.on(t, async (e) => {
			e.stopPropagation(), e.preventDefault(), S.show();
		});
	});
}
function restrict_choices(e, t, m) {
	if (!m) return t;
	let v = m.toLowerCase();
	for (let t of e) if (t.toLowerCase() == v) return t;
	return t;
}
function list_enum(e) {
	return Object.keys(e).map((t) => e[t]);
}
function restrict_enum(e, t, m) {
	return restrict_choices(list_enum(e), t, m);
}
function hex_array(e, t, m, v) {
	return [...Array(t)].map((t, y) => {
		let x = y + 1 <= e;
		return `<a><i class="${v ?? ""} mdi ${x ? "mdi-hexagon-slice-6" : "mdi-hexagon-outline"} theme--light" data-available="${x}" data-path="${m}"></i></a>`;
	});
}
//#endregion
//#region src/module/models/bits/damage.ts
var An = foundry.data.fields, jn = class Damage {
	constructor(e) {
		this.type = e.type, this.val = e.val;
	}
	save() {
		return {
			type: this.type,
			val: this.val
		};
	}
	copy() {
		return new Damage(this.save());
	}
	get icon() {
		return Damage.IconFor(this.type);
	}
	get text() {
		return `${this.val} ${this.type} Damage`;
	}
	get discord_emoji() {
		return Damage.DiscordEmojiFor(this.type);
	}
	get color() {
		return Damage.ColorFor(this.type);
	}
	static IconFor(e) {
		return `cci-${e.toLowerCase()}`;
	}
	static DiscordEmojiFor(e) {
		return `:cc_damage_${e.toLowerCase()}:`;
	}
	static ColorFor(e) {
		return `damage--${e.toLowerCase()}`;
	}
	static MakeChecklist(e) {
		let t = e.length == 0;
		return {
			Burn: t || e.includes(le.Burn),
			Energy: t || e.includes(le.Energy),
			Explosive: t || e.includes(le.Explosive),
			Heat: t || e.includes(le.Heat),
			Kinetic: t || e.includes(le.Kinetic),
			Variable: t || e.includes(le.Variable)
		};
	}
	static FlattenChecklist(e) {
		return Object.keys(e).filter((t) => e[t]);
	}
	static CombineLists(e, t) {
		let m = e.map((e) => e.copy());
		for (let e of t) {
			let t = m.find((t) => t.type == e.type);
			if (t) try {
				let m = new Roll(t.val), v = new Roll(e.val);
				for (let e of v.terms) {
					let t = !1;
					for (let v of m.terms) if (e.number && v.number && e.faces === v.faces) {
						v.number += e.number, t = !0;
						break;
					}
					!t && !e.operator && (m = new Roll(m.formula + " + " + e.formula));
				}
				t.val = m.formula;
			} catch {
				t.val += ` + ${e.val}`;
			}
			else m.push(e.copy());
		}
		return m;
	}
}, defineDamageFieldSchema = () => ({
	type: new An.StringField({
		choices: Object.values(le),
		initial: le.Kinetic
	}),
	val: new An.StringField({
		initial: "1d6",
		nullable: !1,
		required: !0,
		trim: !0
	})
}), DamageField = class extends An.SchemaField {
	constructor(e) {
		super(defineDamageFieldSchema(), e);
	}
	initialize(e, t) {
		return new jn(e);
	}
	migrateSource(e, t) {
		return t.type &&= restrict_enum(le, le.Kinetic, t.type), super.migrateSource(e, t);
	}
	_cast(e) {
		return e instanceof jn ? e.save() : super._cast(e);
	}
};
function unpackDamage(e) {
	return {
		type: e.type?.capitalize(),
		val: e.val?.toString() ?? "1"
	};
}
//#endregion
//#region src/module/actor/damage-calc.ts
var AppliedDamage = class {
	constructor(e) {
		this.Kinetic = this.sum_damage(e, le.Kinetic), this.Energy = this.sum_damage(e, le.Energy), this.Explosive = this.sum_damage(e, le.Explosive), this.Burn = this.sum_damage(e, le.Burn), this.Heat = this.sum_damage(e, le.Heat), this.Variable = this.sum_damage(e, le.Variable);
	}
	sum_damage(e, t) {
		return e.reduce((e, m) => e + (m.type === t ? parseInt(m.val) : 0), 0);
	}
};
//#endregion
//#region src/module/effects/effector.ts
ve.log_prefix;
var EffectHelper = class {
	constructor(e) {
		this.actor = e, this._passdownEffectTracker = new ChangeWatchHelper(), this.propagateEffects = foundry.utils.debounce((e) => this.propagateEffectsInner(e), 500);
	}
	async setEphemeralEffects(e, t, m = !0) {
		let v = {
			from_uuid: e,
			data: t,
			visible: m
		};
		return this.actor.update({ "system.inherited_effects": v }, { render: m });
	}
	async clearEphemeralEffects() {
		let e = this.actor.system.inherited_effects;
		e && await this.actor.update({ "system.-=inherited_effects": null }, { render: e.visible });
	}
	inheritedEffects() {
		let e = [], t = this.actor.system.inherited_effects;
		if (t) for (let m of t.data) e.push(new LancerActiveEffect(m, { parent: this.actor }));
		return e;
	}
	collectPassdownEffects() {
		if (this.actor.is_deployable()) return [];
		let e = [...this.actor.allApplicableEffects()].map((e) => e.toObject());
		return e = e.filter((e) => {
			switch (e.flags[game.system.id]?.target_type) {
				case z.PILOT: return !1;
				case z.MECH: return this.actor.is_pilot();
				case z.NPC: return !1;
				case z.DEPLOYABLE:
				case "only_deployable":
				case "only_drone": return !0;
				case "mech_and_npc": return this.actor.is_pilot();
				default: return !1;
			}
		}), e;
	}
	async propagateEffectsInner(e) {
		if (!(e || this._passdownEffectTracker.isDirty)) return;
		let propagateTo = async (e) => {
			console.debug(`Actor ${this.actor.name} propagating effects to ${e.name}`);
			let t = foundry.utils.duplicate(this._passdownEffectTracker.curr_value);
			t.forEach((e) => {
				e.flags[game.system.id] ??= {}, e.flags[game.system.id].deep_origin = e.origin, e.origin = this.actor.uuid;
			}), await e.effectHelper.setEphemeralEffects(this.actor.uuid, t);
		};
		if (this.actor.is_pilot()) this.actor.system.active_mech?.status == "resolved" && this.actor.system.active_mech.value.system.pilot?.id == this.actor.uuid && await propagateTo(this.actor.system.active_mech.value);
		else if (this.actor.is_mech()) {
			let e = this.actor.system.pilot?.value ?? null, t = game.actors.filter((t) => t.is_deployable() && t.system.owner !== null && (t.system.owner.value == this.actor || t.system.owner.value == e));
			for (let e of t) await propagateTo(e);
		} else if (this.actor.is_npc()) {
			let e = game.actors.filter((e) => e.is_deployable() && e.system.owner?.value == this.actor);
			for (let t of e) await propagateTo(t);
		}
	}
	async removeAllStatuses() {
		let e = this.actor.effects.filter((e) => e.sourceName === "None");
		await this.actor._safeDeleteDescendant("ActiveEffect", e);
		let t = this.actor.items.filter((e) => e.is_status());
		await this.actor._safeDeleteDescendant("Item", t);
	}
	async removeActiveEffect(e) {
		this.findEffect(e)?.delete();
	}
	async removeActiveEffects(e) {
		let t = e.map((e) => this.findEffect(e));
		!t || !t.some((e) => !!e) || this.actor.deleteEmbeddedDocuments("ActiveEffect", t.map((e) => e?.id || ""));
	}
	findEffect(e) {
		return this.actor.effects.find((t) => t.statuses.some((t) => t.includes(e)));
	}
}, LoadoutHelper = class {
	constructor(e) {
		this.actor = e;
	}
	refresh(e, t) {
		let m = {
			_id: e.id,
			name: e.name
		};
		t.repair && e.system.destroyed === !0 && (m["system.destroyed"] = !1), t.reload && e.system.loaded === !1 && (m["system.loaded"] = !0);
		let v = e.system.uses;
		return t.refill && v !== void 0 && v.val !== v.max && (m["system.uses"] = e.system.uses.max), Object.keys(m).some((e) => e.startsWith("system")) ? m : null;
	}
	listLoadout() {
		let e = [], t = this.actor.itemTypes;
		if (this.actor.is_mech()) {
			this.actor.system.loadout.frame?.status == "resolved" && e.push(this.actor.system.loadout.frame.value);
			for (let t of this.actor.system.loadout.weapon_mounts) for (let m of t.slots) m.weapon?.status == "resolved" && e.push(m.weapon.value), m.mod?.status == "resolved" && e.push(m.mod.value);
			e.push(...this.actor.system.loadout.systems.filter((e) => e?.value).map((e) => e.value));
		} else this.actor.is_npc() ? (this.actor.system.class && e.push(this.actor.system.class), e.push(...t.npc_class, ...t.npc_template, ...t.npc_feature)) : this.actor.is_pilot() && e.push(...t.pilot_armor, ...t.pilot_gear, ...t.pilot_weapon, ...t.talent, ...t.core_bonus, ...t.reserve);
		return e;
	}
	async fullRepair() {
		await this.actor.effectHelper.removeAllStatuses(), await this.deleteUnequippedItems();
		let e = {
			"system.hp.value": this.actor.system.hp.max,
			"system.burn": 0,
			"system.overshield.value": 0
		};
		(this.actor.is_mech() || this.actor.is_npc() || this.actor.is_deployable()) && (e["system.heat.value"] = 0), (this.actor.is_mech() || this.actor.is_npc()) && (e["system.structure.value"] = this.actor.system.structure.max, e["system.stress.value"] = this.actor.system.stress.max), this.actor.is_mech() && (e["system.core_energy"] = 1, e["system.core_active"] = !1, e["system.overcharge"] = 0, e["system.repairs.value"] = this.actor.system.repairs.max, e["system.meltdown_timer"] = null), this.actor.is_pilot() && await this.actor.system.active_mech?.value?.loadoutHelper.fullRepair(), this.actor.is_deployable() || await this.restoreAllItems(), await this.actor.update(e);
	}
	async restoreAllItems() {
		let e = this.listLoadout().map((e) => this.refresh(e, {
			reload: !0,
			repair: !0,
			refill: !0
		})).filter((e) => !!e);
		return this.actor.updateEmbeddedDocuments("Item", e);
	}
	async repairableItems() {
		return Promise.all(this.listLoadout().map((e) => this.refresh(e, { repair: !0 })).filter((e) => !!e));
	}
	reloadableItems() {
		return this.listLoadout().map((e) => this.refresh(e, { reload: !0 })).filter((e) => !!e);
	}
	async deleteUnequippedItems() {
		let e = [];
		for (let t of this.actor.items.contents) t.id && !t.isEquipped() && e.push(t);
		e.length && await this.actor._safeDeleteDescendant("Item", e);
	}
	async cleanupUnresolvedReferences() {
		let e = [];
		if (this.actor.is_pilot()) {
			let t = foundry.utils.duplicate(this.actor.system._source.loadout), m = this.actor.system.loadout;
			t.armor = t.armor.map((v, y) => m.armor[y]?.status == "missing" ? (e.push(t.armor[y]), null) : t.armor[y]), t.gear = t.gear.map((v, y) => m.gear[y]?.status == "missing" ? (e.push(t.gear[y]), null) : t.gear[y]), t.weapons = t.weapons.map((v, y) => m.weapons[y]?.status == "missing" ? (e.push(t.weapons[y]), null) : t.weapons[y]), e.length && (console.log(`Cleaning up unresolved ids ${e.join(", ")}...`), await this.actor.update({ system: { loadout: t } }));
		} else if (this.actor.is_mech()) {
			let t = foundry.utils.duplicate(this.actor.system._source.loadout), m = this.actor.system.loadout;
			m.frame?.status == "missing" && (e.push(m.frame.id), t.frame = null), t.systems = t.systems.filter((t, v) => m.systems[v]?.status == "missing" ? (e.push(m.systems[v].id), !1) : !0);
			for (let v = 0; v < m.weapon_mounts.length; v++) {
				let y = m.weapon_mounts[v];
				for (let m = 0; m < y.slots.length; m++) {
					let x = y.slots[m];
					x.mod?.status == "missing" && (t.weapon_mounts[v].slots[m].mod = null, e.push(x.mod.id)), x.weapon?.status == "missing" && (t.weapon_mounts[v].slots[m].weapon = null, e.push(x.weapon.id));
				}
			}
			e.length && (console.log(`Cleaning up unresolved ids ${e.join(", ")}...`), await this.actor.update({ system: { loadout: t } }));
		}
	}
	validateMount(e) {
		if (this.actor.is_mech()) {
			let t = this.actor.system.loadout.weapon_mounts.some((e) => e.bracing), m = !1, v = !1, y = 0, x = "";
			for (let t of e.slots) {
				if (t.weapon?.status != "resolved") continue;
				y += 1;
				let e = {
					[q.Aux]: 1,
					[q.Main]: 2,
					[q.Heavy]: 3,
					[q.Superheavy]: 3
				}[t.weapon.value.system.size] ?? 4;
				if (e > ({
					[B.Auxiliary]: 1,
					[B.Main]: 2,
					[B.Flex]: 2,
					[B.Heavy]: 3,
					[B.Superheavy]: 3,
					[B.Integrated]: 4
				}[t.size] ?? 0)) {
					x += `Weapon of size ${t.weapon.value.system.size} cannot fit on fitting of size ${t.size}. `;
					continue;
				}
				if (t.size == B.Flex && e > 1 && (v = !0), t.weapon.value.system.size == q.Superheavy) {
					let e = this.actor.system.loadout.frame?.value;
					(!e || !e.system.core_system.integrated.includes(t.weapon.value.system.lid)) && (m = !0);
				}
			}
			return v && y > 1 && (x += "Flex mounts can either have two Auxillary or one Main weapon."), m && !t && (x += "Superheavy weapons require a mount to be set as \"Bracing\"."), x || null;
		} else throw Error(`${this.actor.type} actors have no mounts to validate. Call this method on the actor you're trying to check against!`);
	}
	async resetMounts() {
		if (!this.actor.is_mech()) return;
		let e = [], t = this.actor.system.loadout.frame?.value;
		if (t) {
			let gen_mount = (e) => ({
				bracing: !1,
				slots: fittingsForMount(e).map((e) => ({
					weapon: null,
					mod: null,
					size: e
				})),
				type: e
			}), m = t.system.mounts, v = this.actor.system.pilot?.value, get_cb = (e) => v?.itemTypes.core_bonus.find((t) => t.system.lid == e), y = get_cb("cb_mount_retrofitting"), x = get_cb("cb_improved_armament"), S = get_cb("cb_integrated_weapon");
			if (m.length < 3 && x && m.push(ne.Main), y) {
				for (let e of [
					ne.Aux,
					ne.AuxAux,
					ne.Main,
					ne.Flex
				]) if (m.findSplice((t) => t == e, ne.MainAux)) break;
			}
			S && (m = [ne.Integrated, ...m]);
			for (let m of t.system.core_system.integrated) {
				let t = this.actor.items.find((e) => e.system.lid == m);
				t && t.is_mech_weapon() && e.push({
					bracing: !1,
					slots: [{
						mod: null,
						size: B.Integrated,
						weapon: t.id
					}],
					type: ne.Integrated
				});
			}
			for (let t of m) e.push(gen_mount(t));
		}
		this.actor.update({ "system.loadout.weapon_mounts": e });
	}
}, StrussHelper = class {
	constructor(e) {
		this.actor = e;
	}
	async stabilize(e, t) {
		if (!this.actor.is_mech() && !this.actor.is_npc()) {
			ui.notifications.warn(`A ${this.actor.type} can't be stabilized!`);
			return;
		}
		let m = {}, v = [];
		if (e === I.Cool) m["system.heat.value"] = 0, this.actor.effectHelper.removeActiveEffect("exposed");
		else if (e === I.Repair) {
			if (this.actor.is_mech() || this.actor.is_npc()) if (this.actor.is_mech() && this.actor.system.repairs.value <= 0) {
				ui.notifications.warn("No repairs remaining!");
				return;
			} else m["system.hp.value"] = this.actor.system.hp.max, this.actor.is_mech() && (m["system.repairs.value"] = this.actor.system.repairs.value - 1);
		} else return;
		switch (t) {
			case te.ClearBurn:
				m["system.burn"] = 0;
				break;
			case te.ClearOtherCond: break;
			case te.ClearOwnCond: break;
			case te.Reload:
				v = this.actor.loadoutHelper.reloadableItems();
				break;
			default:
				ui.notifications.warn("Invalid Stabilize choice!");
				return;
		}
		await this.actor.update(m), await this.actor.updateEmbeddedDocuments("Item", v);
	}
	getOverchargeRoll() {
		return this.actor.is_npc() ? "1d6" : this.actor.is_mech() ? this.actor.system.overcharge_sequence.split(",")[this.actor.system.overcharge] : null;
	}
};
//#endregion
//#region src/module/flows/structure.ts
ve.log_prefix;
function registerStructureSteps(e) {
	e.set("preStructureRollChecks", preStructureRollChecks), e.set("rollStructureTable", rollStructureTable), e.set("noStructureRemaining", noStructureRemaining), e.set("checkStructureMultipleOnes", checkStructureMultipleOnes), e.set("structureInsertDismembermentButton", structureInsertDismembermentButton), e.set("structureInsertHullCheckButton", structureInsertHullCheckButton), e.set("structureInsertSecondaryRollButton", structureInsertSecondaryRollButton), e.set("structureInsertCascadeRollButton", structureInsertCascadeRollButton), e.set("printStructureCard", printStructureCard), e.set("secondaryStructureRoll", secondaryStructureRoll), e.set("printSecondaryStructureCard", printSecondaryStructureCard);
}
var StructureFlow = class extends ft {
	static {
		this.steps = [
			"preStructureRollChecks",
			"rollStructureTable",
			"noStructureRemaining",
			"checkStructureMultipleOnes",
			"structureInsertDismembermentButton",
			"structureInsertHullCheckButton",
			"structureInsertSecondaryRollButton",
			"structureInsertCascadeRollButton",
			"printStructureCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "structure",
			title: t?.title ?? "",
			roll_str: t?.roll_str ?? "",
			desc: t?.desc ?? "",
			val: t?.val ?? -1,
			max: t?.max ?? -1,
			remStruct: t?.remStruct ?? 4
		};
		super(e, m);
	}
};
async function preStructureRollChecks(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only Mechs and NPCs can take structure damage"), !1;
	if (game.settings.get(game.system.id, ve.setting_automation).structure && !e.data?.reroll_data) {
		if (t.system.hp.value > 0) return ui.notifications.info("Token has hp remaining. No need to roll structure."), !1;
		let { openSlidingHud: e } = await import("./slidinghud-Ci-nXn7_.mjs").then((e) => e.i);
		try {
			await e("struct", {
				stat: "structure",
				title: "Structure Damage",
				actorUuid: t.uuid
			});
		} catch {
			return !1;
		}
	}
	if (!e.data?.reroll_data) {
		let e = t.system.hp, m = t.system.structure;
		if (e.value < 1 && m.value > 0) await t.update({
			"system.structure": m.value - 1,
			"system.hp": e.value + e.max
		});
		else return !1;
	}
	return !0;
}
var Mn = [
	"lancer.tables.structure.title.crushing",
	"lancer.tables.structure.title.direct",
	"lancer.tables.structure.title.trauma",
	"lancer.tables.structure.title.trauma",
	"lancer.tables.structure.title.trauma",
	"lancer.tables.structure.title.glancing",
	"lancer.tables.structure.title.glancing"
], Nn = [
	"lancer.tables.structureMonstrosity.title.fatal",
	"lancer.tables.structureMonstrosity.title.direct",
	"lancer.tables.structureMonstrosity.title.dismember",
	"lancer.tables.structureMonstrosity.title.powerful",
	"lancer.tables.structureMonstrosity.title.powerful",
	"lancer.tables.structureMonstrosity.title.glancing",
	"lancer.tables.structureMonstrosity.title.glancing"
];
function structTableDescriptions(e, t) {
	switch (e) {
		case 0: return "lancer.tables.structure.description.crushing";
		case 1: switch (t) {
			case 2: return "lancer.tables.structure.description.direct.2";
			case 1:
			case 0: return "lancer.tables.structure.description.direct.1";
			default: return "lancer.tables.structure.description.direct.3plus";
		}
		case 2:
		case 3:
		case 4: return "lancer.tables.structure.description.trauma";
		case 5:
		case 6: return "lancer.tables.structure.description.glancing";
	}
	return "";
}
function monstrosityTableDescriptions(e, t) {
	switch (e) {
		case 0: return "lancer.tables.structureMonstrosity.description.fatal";
		case 1: return t >= 3 ? "lancer.tables.structureMonstrosity.description.direct.3plus" : t === 2 ? "lancer.tables.structureMonstrosity.description.direct.2" : "lancer.tables.structureMonstrosity.description.direct.1";
		case 2: return "lancer.tables.structureMonstrosity.description.dismember";
		case 3:
		case 4: return "lancer.tables.structureMonstrosity.description.powerful";
		case 5:
		case 6: return "lancer.tables.structureMonstrosity.description.glancing";
	}
	return "";
}
function hasUniquePhysiology(e) {
	return e.is_npc() && e.itemTypes.npc_feature.some((e) => e.system.lid === "npcf_unique_physiology_monstrosity");
}
async function rollStructureTable(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll structure."), !1;
	if ((e.data?.reroll_data?.structure ?? t.system.structure.value) >= t.system.structure.max) return ui.notifications.info("The mech is at full Structure, no structure check to roll."), !1;
	let m = e.data?.reroll_data?.structure ?? t.system.structure.value, v = `${t.system.structure.max - m}d6kl1`;
	t.is_npc() && t.items.some((e) => ["npcf_legendary_ultra", "npcf_legendary_veteran"].includes(e.system.lid)) && (v = `{${v}, ${v}}kh`);
	let y = await new Roll(v).evaluate(), x = y.total;
	if (x === void 0) return !1;
	(x === 0 || x === 1 && m <= 1) && await t.update({
		"system.hp.value": t.system.hp.value - t.system.hp.max,
		"system.structure.value": 0
	});
	let S = hasUniquePhysiology(t);
	return e.data = {
		type: "structure",
		title: S ? Nn[x] : Mn[x],
		desc: S ? monstrosityTableDescriptions(x, m) : structTableDescriptions(x, m),
		remStruct: m,
		val: t.system.structure.value,
		max: t.system.structure.max,
		roll_str: y.formula,
		result: {
			roll: y,
			tt: await y.getTooltip(),
			total: (y.total ?? 0).toString()
		}
	}, !0;
}
async function noStructureRemaining(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll structure."), !1;
	if (e.data.remStruct > 0) return !0;
	let m = hasUniquePhysiology(t), v = game.lancer.flowSteps.get("printStructureCard");
	if (!v) throw TypeError("printStructureCard flow step missing!");
	if (typeof v != "function") throw TypeError("printStructureCard flow step is not a function.");
	return e.data.title = m ? Nn[0] : Mn[0], e.data.desc = m ? monstrosityTableDescriptions(0, 0) : structTableDescriptions(0, 0), e.data.result = void 0, await t.update({ "system.hp.value": t.system.hp.value - t.system.hp.max }), v(e), !1;
}
async function checkStructureMultipleOnes(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll structure."), !1;
	let m = e.data.result?.roll;
	if (!m) throw TypeError("Structure check hasn't been rolled yet!");
	if (m.terms[0].rolls?.length > 1) {
		let e = m.terms[0].results.findIndex((e) => !e.discarded);
		m = m.terms[0].rolls[e] || m;
	}
	if (!m) throw TypeError("Structure check hasn't been rolled yet!");
	let v = hasUniquePhysiology(t);
	return m.terms[0].results.filter((e) => e.result === 1).length > 1 && (v ? (e.data.title = Nn[0], e.data.desc = monstrosityTableDescriptions(m.total ?? 1, 1)) : (e.data.title = Mn[0], e.data.desc = structTableDescriptions(m.total ?? 1, 1)), e.data.title = game.i18n.localize(e.data.title), e.data.desc = game.i18n.localize(e.data.desc), await t.update({
		"system.hp.value": t.system.hp.value - t.system.hp.max,
		"system.structure.value": 0
	})), !0;
}
async function structureInsertDismembermentButton(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	return !t.is_mech() && !t.is_npc() ? (ui.notifications.warn("Only npcs and mechs can roll structure."), !1) : !hasUniquePhysiology(t) || e.data.result?.roll.total !== 2 ? !0 : (e.data.embedButtons = e.data.embedButtons || [], e.data.embedButtons.push(`<a
    class="flow-button lancer-button"
    data-flow-type="dismembermentDamage"
    data-actor-id="${t.uuid}"
  >
    <i class="compcon-icon kinetic i--3"></i> ROLL DAMAGE
  </a>`), !0);
}
async function beginDismembermentDamageFlow(e) {
	if (!e) {
		ui.notifications?.error("No actor found for dismemberment damage button.");
		return;
	}
	let t = e.getActiveTokens(), m = [{
		type: le.Kinetic,
		val: "1d6"
	}], v = [{
		target: t[0],
		total: "0",
		usedLockOn: !1,
		hit: !0,
		crit: !1
	}];
	await new DamageRollFlow(e, {
		title: game.i18n.localize("lancer.tables.structureMonstrosity.title.dismember"),
		damage: m,
		configurable: !1,
		add_burn: !1,
		tags: [],
		hit_results: v,
		has_normal_hit: !0,
		has_crit_hit: !1
	}).begin();
}
async function structureInsertHullCheckButton(e) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	return !t.is_mech() && !t.is_npc() ? (ui.notifications.warn("Only npcs and mechs can roll structure."), !1) : (e.data.result?.roll.total === 1 && e.data.remStruct === 2 && (e.data.embedButtons = e.data.embedButtons || [], e.data.embedButtons.push(`<a
      class="flow-button lancer-button"
      data-flow-type="check"
      data-check-type="hull"
      data-actor-id="${t.uuid}"
    >
      <i class="fas fa-dice-d20 i--3"></i> HULL
    </a>`)), !0);
}
async function structureInsertSecondaryRollButton(e) {
	if (!e.data || !e.data) throw TypeError("Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll structure."), !1;
	if (hasUniquePhysiology(t)) return !0;
	let m = e.data.result?.roll.total;
	if (!m) throw TypeError("Structure check hasn't been rolled yet!");
	return !hasUniquePhysiology(e.actor) && m >= 2 && m <= 4 && (e.data.embedButtons = e.data.embedButtons || [], e.data.embedButtons.push(`<a
      class="flow-button lancer-button"
      data-flow-type="secondaryStructure"
      data-actor-id="${t.uuid}"
    >
      <i class="fas fa-dice-d6 i--3"></i> TEAR OFF
    </a>`)), !0;
}
async function structureInsertCascadeRollButton(e) {
	if (!e.data) throw TypeError("Structure/Overheat roll flow data missing!");
	let t = e.actor;
	return !t.is_mech() && !t.is_npc() ? (ui.notifications.warn("Only npcs and mechs can roll structure/overheat."), !1) : t.items.filter((e) => e.isAI()).length ? (e.data.embedButtons = e.data.embedButtons || [], e.data.embedButtons.push(`<a
    class="flow-button lancer-button"
    data-flow-type="cascade"
    data-actor-id="${t.uuid}"
  >
    <i class="fas fa-dice-d20 i--3"></i> <span class="horus--subtle">CASCADE CHECK</span>
  </a>`), !0) : !0;
}
async function printStructureCard(e, t) {
	if (!e.data) throw TypeError("Structure roll flow data missing!");
	e.data.title = game.i18n.localize(e.data.title), e.data.desc = game.i18n.localize(e.data.desc);
	let m = t?.template || `systems/${game.system.id}/templates/chat/structure-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data), !0;
}
async function beginSecondaryStructureFlow(e, t) {
	return await new SecondaryStructureFlow(e, t).begin();
}
var SecondaryStructureFlow = class extends ft {
	static {
		this.steps = ["secondaryStructureRoll", "printSecondaryStructureCard"];
	}
	constructor(e, t) {
		let m = {
			type: "secondary_structure",
			title: t?.title ?? "Equipment Destruction",
			desc: t?.desc ?? "",
			roll_str: t?.roll_str ?? "1d6"
		};
		super(e, m);
	}
};
async function secondaryStructureRoll(e) {
	if (!e.data) throw TypeError("Secondary Structure roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can work with \"remaining structure\" logic."), !1;
	let m = await new Roll(e.data.roll_str).evaluate(), v = m.total;
	return e.data.result = {
		roll: m,
		tt: await m.getTooltip(),
		total: v.toString()
	}, v <= 3 ? (e.data.title = "Weapon Destruction", e.data.desc = "On a 1–3, all weapons on one mount of your choice are destroyed") : (e.data.title = "System Destruction", e.data.desc = "On a 4–6, a system of your choice is destroyed"), !0;
}
async function printSecondaryStructureCard(e, t) {
	let m = t?.template ?? `systems/${game.system.id}/templates/chat/structure-secondary-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data), !0;
}
function triggerStrussFlow(e, t) {
	if (!(!e.is_mech() && !e.is_npc()) && game.settings.get(game.system.id, ve.setting_automation).structure && userOwnsActor(e) && (e.is_mech() || e.is_npc())) {
		let m = t;
		(m.system?.heat?.value ?? 0) > e.system.heat.max && e.system.stress.value > 0 && e.beginOverheatFlow(), (m.system?.hp?.value ?? 1) <= 0 && e.system.structure.value > 0 && e.beginStructureFlow();
	}
}
//#endregion
//#region src/module/flows/overheat.ts
ve.log_prefix;
function registerOverheatSteps(e) {
	e.set("preOverheatRollChecks", preOverheatRollChecks), e.set("rollOverheatTable", rollOverheatTable), e.set("noStressRemaining", noStressRemaining), e.set("checkOverheatMultipleOnes", checkOverheatMultipleOnes), e.set("overheatInsertEngCheckButton", overheatInsertEngCheckButton), e.set("printOverheatCard", printOverheatCard);
}
var OverheatFlow = class extends ft {
	static {
		this.steps = [
			"preOverheatRollChecks",
			"rollOverheatTable",
			"noStressRemaining",
			"checkOverheatMultipleOnes",
			"overheatInsertEngCheckButton",
			"structureInsertCascadeRollButton",
			"printOverheatCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "overheat",
			title: t?.title ?? "",
			roll_str: t?.roll_str ?? "",
			desc: t?.desc ?? "",
			val: t?.val ?? -1,
			max: t?.max ?? -1,
			remStress: t?.remStress ?? 4
		};
		super(e, m);
	}
};
async function preOverheatRollChecks(e) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only Mechs and NPCs can take stress damage"), !1;
	if (game.settings.get(game.system.id, ve.setting_automation).structure && !e.data?.reroll_data) {
		if (t.system.heat.value <= t.system.heat.max) return ui.notifications.info("Token is not at heat cap. No need to roll stress."), !1;
		let { openSlidingHud: e } = await import("./slidinghud-Ci-nXn7_.mjs").then((e) => e.i);
		try {
			await e("stress", {
				stat: "stress",
				title: "Stress Damage",
				actorUuid: t.uuid
			});
		} catch {
			return !1;
		}
	}
	if (!e.data?.reroll_data) {
		let e = t.system.heat, m = t.system.stress;
		if (e.value > t.system.heat.max && m.value > 0) {
			if (t.is_npc() && t.system.stress.max === 1) return !0;
			await t.update({
				"system.stress": m.value - 1,
				"system.heat": e.value - t.system.heat.max
			});
		} else return !1;
	}
	return !0;
}
var Pn = [
	"lancer.tables.overheat.title.irreversible",
	"lancer.tables.overheat.title.meltdown",
	"lancer.tables.overheat.title.destabilized",
	"lancer.tables.overheat.title.destabilized",
	"lancer.tables.overheat.title.destabilized",
	"lancer.tables.overheat.title.shunt",
	"lancer.tables.overheat.title.shunt"
];
function overheatTableDescriptions(e, t) {
	switch (e) {
		case 0: return "lancer.tables.overheat.description.irreversible";
		case 1: switch (t) {
			case 2: return "lancer.tables.overheat.description.meltdown.2";
			case 1: return "lancer.tables.overheat.description.meltdown.1";
			default: return "lancer.tables.overheat.description.meltdown.3plus";
		}
		case 2:
		case 3:
		case 4: return "lancer.tables.overheat.description.destabilized";
		case 5:
		case 6: return "lancer.tables.overheat.description.shunt";
	}
	return "";
}
async function rollOverheatTable(e) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll overheat."), !1;
	if (t.is_npc() && t.system.stress.max === 1) return e.data = {
		type: "overheat",
		title: Pn[3],
		desc: overheatTableDescriptions(3, 1),
		remStress: 1,
		val: t.system.stress.value,
		max: t.system.stress.max,
		roll_str: "3",
		result: void 0
	}, !0;
	if ((e.data?.reroll_data?.stress ?? t.system.stress.value) >= t.system.stress.max) return ui.notifications.info("The mech is at full Stress, no overheat check to roll."), !1;
	let m = e.data?.reroll_data?.stress ?? t.system.stress.value, v = `${t.system.stress.max - m}d6kl1`;
	t.is_npc() && t.items.some((e) => ["npcf_legendary_ultra", "npcf_legendary_veteran"].includes(e.system.lid)) && (v = `{${v}, ${v}}kh`);
	let y = await new Roll(v).evaluate(), x = y.total;
	return x === void 0 ? !1 : (e.data = {
		type: "overheat",
		title: Pn[x],
		desc: overheatTableDescriptions(x, m),
		remStress: m,
		val: t.system.stress.value,
		max: t.system.stress.max,
		roll_str: y.formula,
		result: {
			roll: y,
			tt: await y.getTooltip(),
			total: (y.total ?? 0).toString()
		}
	}, !0);
}
async function noStressRemaining(e) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll overheat."), !1;
	if (e.data.remStress > 0 && (!t.is_npc() || t.system.stress.max > 1)) return !0;
	let m = game.lancer.flowSteps.get("printOverheatCard");
	if (!m) throw TypeError("printOverheatCard flow step missing!");
	if (typeof m != "function") throw TypeError("printOverheatCard flow step is not a function.");
	return t.is_npc() && t.system.stress.max == 1 ? (e.data.title = Pn[3], e.data.desc = overheatTableDescriptions(3, 1), e.data.result = void 0) : (e.data.title = Pn[0], e.data.desc = overheatTableDescriptions(0, 0), e.data.result = void 0), m(e), !1;
}
async function checkOverheatMultipleOnes(e) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech() && !t.is_npc()) return ui.notifications.warn("Only npcs and mechs can roll overheat."), !1;
	let m = e.data.result?.roll;
	if (!m) throw TypeError("Overheat check hasn't been rolled yet!");
	if (m.terms[0].rolls?.length > 1) {
		let e = m.terms[0].results.findIndex((e) => !e.discarded);
		m = m.terms[0].rolls[e] || m;
	}
	if (!m) throw TypeError("Overheat check hasn't been rolled yet!");
	return m.terms[0].results.filter((e) => e.result === 1).length > 1 && (e.data.title = Pn[0], e.data.desc = overheatTableDescriptions(m.total ?? 1, 1)), !0;
}
async function overheatInsertEngCheckButton(e) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	let t = e.actor;
	return !t.is_mech() && !t.is_npc() ? (ui.notifications.warn("Only npcs and mechs can roll overheat."), !1) : (e.data.result?.roll.total === 1 && e.data.remStress === 2 && (e.data.embedButtons = e.data.embedButtons || [], e.data.embedButtons.push(`<a
      class="flow-button lancer-button"
      data-flow-type="check"
      data-check-type="eng"
      data-actor-id="${t.uuid}"
    >
      <i class="fas fa-dice-d20 i--3"></i> ENGINEERING
    </a>`)), !0);
}
async function printOverheatCard(e, t) {
	if (!e.data) throw TypeError("Overheat roll flow data missing!");
	e.data.title = game.i18n.localize(e.data.title), e.data.desc = game.i18n.localize(e.data.desc);
	let m = t?.template || `systems/${game.system.id}/templates/chat/overheat-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data), !0;
}
//#endregion
//#region src/module/flows/full-repair.ts
ve.log_prefix;
function registerFullRepairSteps(e) {
	e.set("displayFullRepairDialog", displayFullRepairDialog), e.set("executeFullRepair", executeFullRepair);
}
var FullRepairFlow = class extends ft {
	static {
		this.steps = ["displayFullRepairDialog", "executeFullRepair"];
	}
	constructor(e, t) {
		let m = {
			title: t?.title || "",
			description: t?.description || "",
			tags: t?.tags || []
		};
		super(e, m);
	}
};
async function displayFullRepairDialog(e) {
	if (!e.data) throw TypeError("Full Repair flow state missing!");
	return new Promise((t, m) => {
		new Dialog({
			title: `FULL REPAIR - ${e.actor.name}`,
			content: `<h3>Are you sure you want to fully repair the ${e.actor?.type} "${e.actor?.name}"?`,
			buttons: {
				submit: {
					icon: "<i class=\"fas fa-check\"></i>",
					label: "Yes",
					callback: async (v) => {
						if (!e.actor) return m();
						t(!0);
					}
				},
				cancel: {
					icon: "<i class=\"fas fa-times\"></i>",
					label: "No",
					callback: async () => t(!1)
				}
			},
			default: "submit",
			close: () => t(!1)
		}).render(!0);
	});
}
async function executeFullRepair(e) {
	if (!e.data) throw TypeError("Full Repair flow state missing!");
	let t = `systems/${game.system.id}/templates/chat/generic-card.hbs`, m = {}, v = {
		title: e.data.title,
		description: e.data.description,
		tags: e.data.tags
	};
	return await e.actor.loadoutHelper.fullRepair(), v.title = "FULL REPAIR", v.description = `Notice: ${e.actor.name} has been fully repaired.`, await renderTemplateStep(e.actor, t, v, m), !0;
}
//#endregion
//#region src/module/flows/overcharge.ts
function registerOverchargeSteps(e) {
	e.set("initOverchargeData", initOverchargeData), e.set("rollOvercharge", rollOvercharge), e.set("updateOverchargeActor", updateOverchargeActor), e.set("printOverchargeCard", printOverchargeCard);
}
var OverchargeFlow = class extends ft {
	static {
		this.steps = [
			"initOverchargeData",
			"rollOvercharge",
			"updateOverchargeActor",
			"printOverchargeCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "overcharge",
			title: t?.title || "",
			roll_str: t?.roll_str || "",
			level: t?.level || 0
		};
		super(e, m);
	}
};
async function initOverchargeData(e, t) {
	if (!e.actor || !e.actor.is_mech()) throw Error("Only mechs can overcharge!");
	if (!e.data) throw Error("Data not found for overcharge flow!");
	return e.data.title = t?.title || e.data.title || `${e.actor.name.toUpperCase()} is OVERCHARGING`, e.data.roll_str = e.actor.strussHelper.getOverchargeRoll(), e.data.level = Math.min(e.actor.system.overcharge + 1, e.actor.system.overcharge_sequence.split(",").length - 1), e;
}
async function rollOvercharge(e) {
	if (!e.actor || !e.actor.is_mech()) throw Error("Only mechs can overcharge!");
	if (!e.data) throw Error("Data not found for overcharge flow!");
	let t = await new Roll(e.data.roll_str).evaluate(), m = await t.getTooltip();
	e.data.result = {
		roll: t,
		tt: m
	};
}
async function updateOverchargeActor(e) {
	if (!e.actor || !e.actor.is_mech()) throw Error("Only mechs can overcharge!");
	if (!e.data) throw Error("Data not found for overcharge flow!");
	if (!e.data.result) throw Error("Overcharge hasn't been rolled yet!");
	await e.actor.update({ "system.overcharge": e.data.level }), game.settings.get(game.system.id, ve.setting_automation).overcharge_heat && await e.actor.update({ "system.heat.value": e.actor.system.heat.value + e.data.result.roll.total });
}
async function printOverchargeCard(e, t) {
	if (!e.actor || !e.actor.is_mech()) throw Error("Only mechs can overcharge!");
	if (!e.data) throw Error("Data not found for overcharge flow!");
	let m = t?.template ?? `systems/${game.system.id}/templates/chat/overcharge-card.hbs`;
	return renderTemplateStep(e.actor, m, e.data);
}
//#endregion
//#region src/module/flows/npc.ts
function registerNPCSteps(e) {
	e.set("findRechargeableSystems", findRechargeableSystems), e.set("rollRecharge", rollRecharge), e.set("applyRecharge", applyRecharge), e.set("printRechargeCard", printRechargeCard);
}
var NPCRechargeFlow = class extends ft {
	static {
		this.steps = [
			"findRechargeableSystems",
			"rollRecharge",
			"applyRecharge",
			"printRechargeCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "recharge",
			title: t?.title ?? "",
			roll_str: t?.roll_str ?? "1d6",
			recharging_uuids: t?.recharging_uuids ?? [],
			charged: t?.charged ?? []
		};
		super(e, m);
	}
};
async function findRechargeableSystems(e) {
	if (!e.data) throw TypeError("Recharge flow state missing!");
	if (!e.actor) throw TypeError("Recharge flow state actor missing!");
	let t = e.actor;
	if (e.data.recharging_uuids.length >= 1) return !0;
	for (let m of t.items) m.is_npc_feature() && (m.system.charged || m.isRecharge() && e.data.recharging_uuids.push(m.uuid));
	return !(e.data.recharging_uuids.length < 1);
}
async function rollRecharge(e) {
	if (!e.data) throw TypeError("Recharge flow state missing!");
	let t = await new Roll(e.data.roll_str).evaluate(), m = await t.getTooltip();
	return e.data.result = {
		roll: t,
		tt: m
	}, !0;
}
async function applyRecharge(e) {
	if (!e.data) throw TypeError("Recharge flow state missing!");
	if (!e.actor) throw TypeError("Recharge flow state actor missing!");
	for (let t of e.data.recharging_uuids) {
		let m = await Dt.fromUuid(t);
		if (!m || m.parent !== e.actor || !m.is_npc_feature()) continue;
		let v = m.system.tags.find((e) => e.is_recharge);
		v && (v.num_val && v.num_val <= (e.data.result?.roll.total ?? 0) && await m.update({ "system.charged": !0 }), e.data.charged.push({
			name: m.name,
			target: v.num_val ?? 0,
			charged: m.system.charged
		}));
	}
	return !0;
}
async function printRechargeCard(e) {
	if (!e.data) throw TypeError("Recharge flow state missing!");
	return renderTemplateStep(e.actor, `systems/${game.system.id}/templates/chat/charge-card.hbs`, e.data), !0;
}
//#endregion
//#region src/module/flows/text.ts
var Fn = /* @__PURE__ */ m(k());
ve.log_prefix;
function registerTextSteps(e) {
	e.set("printGenericCard", printGenericCard), e.set("printGenericHTML", printGenericHTML);
}
var SimpleTextFlow = class extends ft {
	static {
		this.steps = ["printGenericCard"];
	}
	constructor(e, t) {
		let m = {
			title: t?.title ?? "",
			description: t?.description ?? "",
			tags: t?.tags ?? []
		};
		!m.title && e instanceof Dt && (m.title = e.name), super(e, m);
	}
};
async function printGenericCard(e, t) {
	if (!e.data) throw TypeError("Flow state missing!");
	return renderTemplateStep(e.actor, t?.template || `systems/${game.system.id}/templates/chat/generic-card.hbs`, e.data), !0;
}
var SimpleHTMLFlow = class extends ft {
	static {
		this.steps = ["printGenericHTML"];
	}
	constructor(e, t) {
		let m = { html: t?.html ?? "" };
		super(e, m);
	}
};
async function printGenericHTML(e) {
	if (!e.data) throw TypeError("Flow state missing!");
	if (!e.data.html) {
		if (e.item) {
			let t = {
				title: e.item.name,
				description: e.item.system.description ?? "",
				tags: e.item.system.tags ?? void 0
			};
			e.data.html = await renderTemplate(`systems/${game.system.id}/templates/chat/generic-card.hbs`, t);
		} else if (e.actor) {
			let t = { title: e.actor.name };
			e.data.html = await renderTemplate(`systems/${game.system.id}/templates/chat/generic-card.hbs`, t);
		}
	}
	return createChatMessageStep(e.actor, e.data.html), !0;
}
//#endregion
//#region src/module/flows/stabilize.ts
ve.log_prefix;
function registerStabilizeSteps(e) {
	e.set("initializeStabilize", initializeStabilize), e.set("renderStabilizePrompt", renderStabilizePrompt), e.set("applyStabilizeUpdates", applyStabilizeUpdates), e.set("printStabilizeResult", printStabilizeResult);
}
var StabilizeFlow = class extends ft {
	static {
		this.steps = [
			"initializeStabilize",
			"renderStabilizePrompt",
			"applyStabilizeUpdates",
			"printStabilizeResult"
		];
	}
	constructor(e, t) {
		let m = {
			title: t?.title || "",
			description: "",
			option1: t?.option1 || I.Cool,
			option2: t?.option2 || te.Reload
		};
		super(e, m);
	}
};
async function initializeStabilize(e) {
	if (!e.data) throw TypeError("Stabilize flow state data missing!");
	return e.data.title = e.data.title || `${e.actor.name?.capitalize()} HAS STABILIZED`, !0;
}
async function renderStabilizePrompt(e) {
	if (!e.data) throw TypeError("Stabilize flow state data missing!");
	let t = e.actor, m = await renderTemplate(`systems/${game.system.id}/templates/window/promptStabilize.hbs`, {}), v = null;
	return v = await new Promise((v, y) => {
		new Dialog({
			title: `STABILIZE - ${t.name}`,
			content: m,
			buttons: {
				submit: {
					icon: "<i class=\"fas fa-check\"></i>",
					label: "Submit",
					callback: async (t) => {
						e.data && (e.data.option1 = $(t).find(".stabilize-options-1:checked").first().val(), e.data.option2 = $(t).find(".stabilize-options-2:checked").first().val(), v(!0));
					}
				},
				cancel: {
					icon: "<i class=\"fas fa-times\"></i>",
					label: "Cancel",
					callback: async () => v(!1)
				}
			},
			default: "submit",
			close: () => v(!1)
		}).render(!0);
	}), v ?? !1;
}
async function applyStabilizeUpdates(e) {
	if (!e.data) throw TypeError("Stabilize flow state data missing!");
	let t = "", m = "";
	switch (e.data.description = "", e.data.option1) {
		case I.Cool:
			t = "Mech is cooling itself. Heat and @Compendium[world.status-items.Exposed] cleared.";
			break;
		case I.Repair:
			if (e.actor.is_mech() && e.actor.system.repairs.value <= 0) return ui.notifications.warn("Mech has no repairs left. Please try again."), !1;
			t = "Mech has spent 1 repair to regain HP.";
			break;
	}
	switch (e.data.option2) {
		case te.ClearBurn:
			m = "Mech has cleared all burn.";
			break;
		case te.ClearOwnCond:
			m = "Mech has selected to clear own condition. Please clear manually.";
			break;
		case te.ClearOtherCond:
			m = "Mech has selected to clear an allied condition. Please clear manually.";
			break;
		case te.Reload:
			m = "Mech has selected full reload. Weapons reloaded:<ul>";
			for (let t of e.actor.loadoutHelper.reloadableItems()) t.name && t["system.loaded"] === !0 && (m = m.concat(`<li>${t.name}</li>`));
			m = m.concat("</ul>");
			break;
	}
	return e.data.description = `<ul><li>${t}</li><li>${m}</li></ul>`, await e.actor.strussHelper.stabilize(e.data.option1, e.data.option2), !0;
}
async function printStabilizeResult(e) {
	if (!e.data) throw TypeError("Stabilize flow state data missing!");
	return printGenericCard(e), !0;
}
//#endregion
//#region src/module/flows/burn.ts
function registerBurnSteps(e) {
	e.set("initBurnCheckData", initBurnCheckData), e.set("rollBurnCheck", rollBurnCheck), e.set("checkBurnResult", checkBurnResult);
}
var BurnFlow = class extends DamageRollFlow {
	static {
		this.steps = [
			"initBurnCheckData",
			"rollBurnCheck",
			"checkBurnResult",
			"printDamageCard"
		];
	}
	constructor(e, t) {
		let m = {
			type: "damage",
			title: t?.title ?? "Burn Damage",
			icon: "cci cci-burn",
			amount: t?.amount ?? 0,
			damage: t?.damage ?? [{
				type: le.Burn,
				val: "1"
			}],
			configurable: t?.configurable === void 0 ? !0 : t.configurable,
			add_burn: !1,
			tags: [],
			ap: !0,
			paracausal: !1,
			half_damage: !1,
			overkill: !1,
			reliable: !1,
			hit_results: [],
			has_normal_hit: !0,
			has_crit_hit: !1,
			damage_results: [],
			crit_damage_results: [],
			damage_total: 0,
			crit_total: 0,
			targets: t?.targets ?? []
		};
		super(e, m);
	}
};
async function initBurnCheckData(e) {
	if (!e.data) throw TypeError("Burn flow state missing!");
	e.data.amount = e.actor.system.burn, e.data.damage = [{
		type: le.Burn,
		val: e.actor.system.burn.toString()
	}];
	let t = e.actor.getActiveTokens();
	if (!t || !t.length) return ui.notifications?.error("Burn flow requires the actor to have a token in the scene"), !1;
	let m = t[0];
	return e.data.hit_results = [{
		target: m,
		total: "10",
		usedLockOn: !1,
		hit: !0,
		crit: !1
	}], e.data.damage_hud_data = ut.fromParams(e.actor, {
		tags: [],
		title: e.data.title,
		targets: [m],
		hitResults: e.data.hit_results,
		ap: !1,
		paracausal: !0,
		halfDamage: !1,
		starting: {
			damage: e.data.damage,
			bonusDamage: []
		}
	}), e.data.damage_results = [], e.data.crit_damage_results = [], e.data.targets = [], !0;
}
async function rollBurnCheck(e) {
	if (!e.data) throw TypeError("Burn flow state missing!");
	let t = new StatRollFlow(e.actor, {
		title: "BURN :: ENG",
		path: "system.eng"
	}), m = await t.begin();
	if (e.data.check_total = t.state.data?.result?.roll.total, game.dice3d) {
		let e = game.messages?.contents[game.messages?.contents.length - 1];
		e && await game.dice3d.waitFor3DAnimationByMessageID(e.id);
	}
	return m && e.data.check_total !== void 0 && e.data.check_total !== null;
}
async function checkBurnResult(e) {
	if (!e.data) throw TypeError("Burn flow state missing!");
	if (!e.data.check_total) throw TypeError("Burn check hasn't been rolled yet!");
	if (e.data.check_total >= 10) return e.data.title = "BURN CLEARED!", e.data.icon = "mdi mdi-fire-extinguisher", await e.actor.update({ "system.burn": 0 }), !0;
	{
		let t = game.lancer.flowSteps.get("rollNormalDamage");
		if (!t || typeof t != "function") throw TypeError("Couldn't get rollDamagesStep flow step!");
		return await t(e);
	}
}
//#endregion
//#region src/module/flows/scan.ts
var In = ve.log_prefix, Ln = "SCAN Database", Rn = "SCAN:", zn = 3;
function scanEntryName(e, t) {
	return `${Rn} ${e} - ${t}`;
}
function registerScanSteps(e) {
	e.set("initScanData", initScanData), e.set("printScanCard", printScanCard), e.set("createScanJournal", createScanJournal);
}
var ScanFlow = class extends ft {
	static {
		this.steps = [
			"initScanData",
			"printScanCard",
			"createScanJournal"
		];
	}
	constructor(e, t) {
		let m = {
			target: t?.target || null,
			name: t?.target?.name || "Enemy Unknown",
			img: null,
			tier: 1,
			class: "Unknown Class",
			templates: []
		};
		super(e, m);
	}
};
async function initScanData(e) {
	if (!e.data) throw TypeError("Flowstate missing!");
	if (!e.data.target) return ui.notifications.error("You must target a token to scan."), !1;
	let t = e.data.target.actor;
	if (!t) return ui.notifications.error("The targeted token has no associated actor."), !1;
	if (!t.is_npc()) return ui.notifications.error("You can only scan NPC actors."), !1;
	e.data.name = e.data.target.name, e.data.img = t.img, e.data.tier = t.system.tier || 1;
	let m = t.items.find((e) => e.is_npc_class());
	e.data.class = m?.name || "Unknown Class";
	let v = t.items.filter((e) => e.is_npc_template());
	e.data.templates = v.map((e) => e.name);
	let y = (t.system.tier || 1) - 1;
	e.data.stats = {
		hull: t.system.hull,
		agi: t.system.agi,
		sys: t.system.sys,
		eng: t.system.eng,
		hp: t.system.hp.max,
		heat: t.system.heat?.max,
		structure: t.system.structure?.max,
		stress: t.system.stress?.max,
		armor: t.system.armor,
		evasion: t.system.evasion,
		edef: t.system.edef,
		speed: t.system.speed,
		size: t.system.size,
		save: t.system.save,
		sensor_range: t.system.sensor_range
	};
	let x = Array.from(t.items).sort((e, t) => e.sort - t.sort);
	return e.data.weapons = x.filter((e) => e.is_npc_feature() && e.system.type === re.Weapon).map((e) => {
		if (e.system.origin?.name === "EXOTIC") return {
			name: "UNKNOWN EXOTIC WEAPON",
			weapon_type: e.system.weapon_type || "Unknown"
		};
		let t = e.system.damage && e.system.damage[y], m = [];
		return t && (Array.isArray(t) ? m = m.concat(t.map((e) => ({
			type: e.type,
			val: e.val
		}))) : m.push(t && {
			type: t.type,
			val: t.val
		})), {
			name: e.name,
			weapon_type: e.system.weapon_type || "Unknown",
			attack_bonus: e.system.attack_bonus && e.system.attack_bonus[y],
			accuracy: e.system.accuracy && e.system.accuracy[y],
			range: e.system.range?.map((e) => ({
				type: e.type,
				val: e.val
			})).filter((e) => !!e) || [],
			damage: m.length ? m : void 0,
			effect: e.system.effect,
			on_hit: e.system.on_hit,
			tags: e.system.tags
		};
	}), e.data.techAttacks = x.filter((e) => e.is_npc_feature() && e.system.type === re.Tech && !!e.system.tech_attack).map((t) => t.is_npc_feature() ? t.system.origin?.name === "EXOTIC" ? {
		name: "UNKNOWN EXOTIC TECH ATTACK",
		type: re.Tech,
		effect: "",
		range: {
			type: ce.Range,
			val: e.data?.target?.actor?.system.sensor_range || 0
		},
		tech_attack: !0
	} : {
		name: t.name,
		type: t.system.type || re.Tech,
		tech_attack: !0,
		attack_bonus: (t.system.attack_bonus && t.system.attack_bonus[y]) ?? 0,
		accuracy: (t.system.accuracy && t.system.accuracy[y]) ?? 0,
		range: {
			type: ce.Range,
			val: e.data?.target?.actor?.system.sensor_range || 0
		},
		effect: t.system.effect,
		on_hit: t.system.on_hit,
		tags: t.system.tags
	} : null).filter((e) => !!e), e.data.systems = x.filter((e) => e.is_npc_feature() && e.system.type !== re.Weapon && e.system.type !== re.Trait && !e.system.tech_attack).map((e) => e.is_npc_feature() ? e.system.origin?.name === "EXOTIC" ? {
		name: "UNKNOWN EXOTIC SYSTEM",
		type: e.system.type || re.Trait,
		effect: ""
	} : {
		name: e.name,
		type: e.system.type || re.Trait,
		effect: e.system.effect,
		tags: e.system.tags,
		trigger: e.system.trigger,
		tech_type: e.system.tech_type
	} : null).filter((e) => !!e), e.data.traits = x.filter((e) => e.is_npc_feature() && e.system.type === re.Trait).map((e) => e.is_npc_feature() ? e.system.origin?.name === "EXOTIC" ? {
		name: "UNKNOWN EXOTIC TRAIT",
		type: e.system.type || re.Trait,
		effect: ""
	} : {
		name: e.name,
		type: e.system.type || re.Trait,
		effect: e.system.effect,
		tags: e.system.tags
	} : null).filter((e) => !!e), !0;
}
async function createScanJournal(e) {
	let t = game.settings.get(game.system.id, ve.setting_scan_outputs);
	if (!["both", "journal"].includes(t)) return !0;
	if (!e.data) throw TypeError("Flowstate missing!");
	if (!e.data.target) throw TypeError("Scan flow requires a target.");
	let m = e.data.target.actor;
	if (!m) throw TypeError("Scan flow target does not reference an actor!");
	let v = await foundry.applications.handlebars.renderTemplate(`systems/${game.system.id}/templates/journal/scan-entry.hbs`, e.data), y = game.folders.getName(Ln);
	if (!y) try {
		y = await Folder.create({
			name: Ln,
			type: "JournalEntry"
		});
	} catch (e) {
		console.error(e);
	}
	if (!y) return ui.notifications.error(`Journal folder ${Ln} does not exist and must be created by a user with permissions to do so.`), !1;
	let x = y.contents.filter((e) => e.name.includes(m.name)), S;
	if (x.length == 1) {
		console.log(`${In} Updating existing scan journal for ${e.data.name}`);
		let t = x[0].name;
		S = game.journal.getName(t);
		let m = S.pages.getName(t);
		m ? await m.update({
			_id: x[0]._id,
			text: { content: v }
		}) : (m = new JournalEntryPage({
			name: t,
			type: "text",
			sort: -1e5,
			text: { content: v }
		}), S.createEmbeddedDocuments("JournalEntryPage", [m]));
	} else {
		console.log(`${In} Creating a new scan journal for ${e.data.name}`);
		let t = scanEntryName(String(y.contents.filter((e) => e.name.startsWith(Rn)).length + 1).padStart(zn, "0"), e.data.name), m = new JournalEntryPage({
			name: t,
			type: "text",
			text: { content: v }
		});
		S = await JournalEntry.create({
			folder: y.id,
			name: t
		}), S.createEmbeddedDocuments("JournalEntryPage", [m]);
	}
	return S?.update({ ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER } }), S?.sheet?.render(!0), !0;
}
async function printScanCard(e) {
	let t = game.settings.get(game.system.id, ve.setting_scan_outputs);
	if (!["both", "chat"].includes(t)) return !0;
	if (!e.data) throw TypeError("Flowstate missing!");
	let m = `systems/${game.system.id}/templates/chat/scan-card.hbs`;
	return await renderTemplateStep(e.actor, m, e.data), !0;
}
//#endregion
//#region src/module/actor/lancer-actor.ts
ve.log_prefix;
var Bn = "+1,+1d3,+1d6,+1d6+4", Vn = /* @__PURE__ */ new Set(), Hn = foundry.utils.debounce(() => Vn.clear(), 2e4), Un = class LancerActor extends Actor {
	constructor(...e) {
		super(...e), this.npcClassSwapPromises = [];
	}
	static {
		this.DEFAULT_ICON = "icons/svg/mystery-man-black.svg";
	}
	static getDefaultArtwork(e) {
		let t = CONFIG.Actor.dataModels[e?.type ?? "base"];
		if (t?.getDefaultArtwork instanceof Function) return t.getDefaultArtwork(e);
		let m = t?.DEFAULT_ICON ?? this.DEFAULT_ICON;
		return {
			img: m,
			texture: { src: m }
		};
	}
	_configure(e) {
		super._configure(e), this.effectHelper = new EffectHelper(this), this.loadoutHelper = new LoadoutHelper(this), this.strussHelper = new StrussHelper(this);
	}
	async damageCalc(e, { multiple: t = 1, ap: m = !1, paracausal: v = !1, addBurn: y = !0 }) {
		let x = [
			le.Kinetic,
			le.Energy,
			le.Explosive,
			le.Variable
		], S = [le.Burn, le.Heat], C = [];
		this.token?.id;
		let w = {}, E = this.system.statuses.exposed;
		[
			.5,
			1,
			2
		].includes(t) || (t = 1);
		let O = t === .5;
		if (this.hasHeatcap() || (e.Energy += e.Heat, e.Heat = 0), t === 2) for (let t of Object.values(le)) e[t] *= 2;
		if (E && x.forEach((t) => Math.ceil(e[t] *= 2)), !v && !this.system.statuses.shredded) {
			let t = x.filter((e) => O || this.system.resistances[e.toLowerCase()]), v = x.filter((e) => !t.includes(e)), y = S.filter((e) => O || this.system.resistances[e.toLowerCase()]), C = m ? 0 : this.system.armor, w;
			for (let t of v) w = Math.max(C - e[t], 0), e[t] = Math.max(e[t] - C, 0), C = w;
			for (let m of t) w = Math.max(C - e[m], 0), e[m] = Math.ceil(Math.max(e[m] - C, 0) / 2), C = w;
			for (let t of y) e[t] = Math.ceil(e[t] / 2);
		}
		this.hasHeatcap() && (w["system.heat.value"] = this.system.heat.value + e.Heat);
		let k = Math.ceil(e.Kinetic + e.Energy + e.Explosive + e.Variable) + e.Burn, ee = 0;
		if (this.system.overshield.value) {
			ee = Math.min(this.system.overshield.value, k);
			let e = Math.max(this.system.overshield.value - k, 0);
			k = Math.max(k - this.system.overshield.value, 0), w["system.overshield.value"] = e;
		}
		k && (w["system.hp.value"] = this.system.hp.value - k), e.Burn && y && (w["system.burn"] = this.system.burn + e.Burn), C.push(this.update(w));
		let I = [], te = 0;
		e.Kinetic && (I.push(`${e.Kinetic}<i class="cci cci-kinetic damage--kinetic i--2"></i>`), te += 1), e.Energy && (I.push(`${e.Energy}<i class="cci cci-energy damage--energy i--2"></i>`), te += 1), e.Explosive && (I.push(`${e.Explosive}<i class="cci cci-explosive damage--explosive i--2"></i>`), te += 1), e.Variable && (I.push(`${e.Variable}<i class="cci cci-variable damage--variable i--2"></i>`), te += 1), e.Burn && (I.push(`${e.Burn}<i class="cci cci-burn damage--burn i--2"></i>`), te += 1), e.Heat && (I.push(`${e.Heat}<i class="cci cci-heat damage--heat i--2"></i>`), te += 1);
		let z = I.length ? I.join(", ") : "0", ne = te > 1 ? ` (${ee + k} total) ` : "", re = `<div class="flexrow">
      <span>${this.token ? this.token.name : this.name} took ${z} ${ne}damage!</span>
      <a
        class="lancer-button lancer-damage-undo"
        style="display: flex; flex-grow: 0; justify-content: center; align-items: center;"
        data-tooltip="Undo this damage"
        data-uuid="${this.uuid}"
        data-overshield-delta="${ee}"
        data-hp-delta="${k}"
        data-burn-delta="${e.Burn}"
        data-heat-delta="${e.Heat}"
        data-add-burn="${y}"
      >
        <i class="fas fa-undo"></i>
      </a>
    </div>`;
		return C.push(createChatMessageStep(this, re)), await Promise.all(C), k;
	}
	prepareBaseData() {
		if (!Wn.includes(this.type)) return console.log("Actor is not a LancerActor:", this), super.prepareBaseData();
		let e = this.system;
		if (e.edef = 0, e.evasion = 0, e.speed = 0, e.armor = 0, e.size = 0, e.save = 0, e.sensor_range = 0, e.tech_attack = 0, e.statuses = {
			cover_hard: !1,
			cover_soft: !1,
			dangerzone: !1,
			downandout: !1,
			engaged: !1,
			exposed: !1,
			invisible: !1,
			prone: !1,
			shutdown: !1,
			immobilized: !1,
			impaired: !1,
			jammed: !1,
			lockon: !1,
			shredded: !1,
			slowed: !1,
			stunned: !1,
			hidden: !1
		}, e.resistances = {
			burn: !1,
			energy: !1,
			explosive: !1,
			heat: !1,
			kinetic: !1,
			variable: !1
		}, e.bonuses = {
			flat: {},
			weapon_bonuses: []
		}, (this.is_mech() || this.is_deployable() || this.is_npc()) && (this.system.hull = 0, this.system.agi = 0, this.system.sys = 0, this.system.eng = 0), this.is_pilot()) this.system.grit = Math.ceil(this.system.level / 2), this.system.hp.max = Fn.rules.base_pilot_hp + this.system.grit, this.system.bond = this.items.find((e) => e.is_bond()) ?? null, this.system.size = .5, this.system.sensor_range = 5, this.system.save = this.system.grit + 10;
		else if (this.is_mech()) {
			let e = 0, t = 0;
			for (let m of this.system.loadout.systems) m?.status == "resolved" && (e += m.value.system.sp, t += +!!m.value.system.tags.some((e) => e.is_ai));
			for (let m of this.system.loadout.weapon_mounts) for (let v of m.slots) v.weapon?.status == "resolved" && (e += v.weapon.value.system.sp), v.mod?.status == "resolved" && (e += v.mod.value.system.sp, t += +!!v.mod.value.system.tags.some((e) => e.is_ai), v.weapon?.value && (v.weapon.value.system.mod = v.mod.value));
			this.system.loadout.sp = {
				max: 0,
				min: 0,
				value: e
			}, this.system.loadout.ai_cap = {
				max: 1,
				min: 0,
				value: t
			}, this.system.loadout.limited_bonus = 0, this.system.overcharge_sequence = Bn, this.system.level = 0, this.system.grit = 0, this.system.stress_repair_cost = 2, this.system.structure_repair_cost = 2;
		} else this.is_npc() ? (this.system.class = this.items.find((e) => e.is_npc_class()), this.system.templates = this.items.filter((e) => e.is_npc_template())) : this.is_deployable() && (e.armor = this.system.stats.armor, e.edef = this.system.stats.edef, e.evasion = this.system.stats.evasion, this.system.heat.max = this.system.stats.heatcap, e.save = this.system.stats.save, e.size = this.system.stats.size, e.speed = this.system.stats.speed, this.system.level = 0, this.system.grit = 0, this.system.hp_bonus = 0);
		this._markEquipped();
	}
	prepareDerivedData() {
		for (let e of this.items.contents) e.prepareFinalAttributes();
		this.effectHelper._passdownEffectTracker?.setValue(this.effectHelper.collectPassdownEffects()), this._markStatuses(), this.is_mech() && this.items.find((e) => e.system.lid === "mf_emperor") && (this.system.hp.max -= this.system.grit), this.is_deployable() && (this.system.hp.max = rollEvalSync(`${this.system.stats.hp} + ${this.system.hp_bonus}`, this.getRollData()) || 5);
	}
	_markStatuses() {
		if (this.statuses) for (let e of this.statuses.keys()) switch (this.system.statuses[e] = !0, e) {
			case "resistance_burn":
				this.system.resistances.burn = !0;
				break;
			case "resistance_energy":
				this.system.resistances.energy = !0;
				break;
			case "resistance_explosive":
				this.system.resistances.explosive = !0;
				break;
			case "resistance_heat":
				this.system.resistances.heat = !0;
				break;
			case "resistance_kinetic":
				this.system.resistances.kinetic = !0;
				break;
		}
	}
	_markEquipped() {
		for (let e of this.items) e._resetEquipped();
		if (this.is_pilot()) {
			let e = this.system.loadout;
			for (let t of e.armor) t?.value && (t.value.system.equipped = !0);
			for (let t of e.weapons) t?.value && (t.value.system.equipped = !0);
			for (let t of e.gear) t?.value && (t.value.system.equipped = !0);
		} else if (this.is_mech()) {
			let e = this.system.loadout;
			e.frame?.value && (e.frame.value.system.equipped = !0);
			for (let t of e.systems) t?.value && (t.value.system.equipped = !0);
			for (let e of this.system.loadout.weapon_mounts) for (let t of e.slots) t.weapon?.value && (t.weapon.value.system.equipped = !0), t.mod?.value && (t.mod.value.system.equipped = !0);
		}
	}
	*allApplicableEffects() {
		yield* super.allApplicableEffects(), yield* this.effectHelper.inheritedEffects();
		for (let e of this.items.contents) yield* e._generateEphemeralEffects();
		this.is_pilot() ? yield* pilotInnateEffects(this) : this.is_npc() && (yield* npcInnateEffects(this));
	}
	async update(e, t = {}) {
		return e = this.system.full_update_data(e), super.update(e, t);
	}
	async modifyTokenAttribute(e, t, m = !1, v = !0) {
		let y = foundry.utils.getProperty(this.system, e), x;
		return v ? (m && (t = Number(y.value) + t), x = { [`system.${e}.value`]: t }) : (m && (t = Number(y) + t), x = { [`system.${e}`]: t }), Hooks.call("modifyTokenAttribute", {
			attribute: e,
			value: t,
			isDelta: m,
			isBar: v
		}, x) ? this.update(x) : this;
	}
	async _preCreate(...[e, t, m]) {
		if (await super._preCreate(e, t, m) === !1) return !1;
		if (e?._stats?.createdTime) return;
		let v;
		v = this.type === z.NPC ? CONST.TOKEN_DISPOSITIONS.HOSTILE : this.type === z.PILOT ? CONST.TOKEN_DISPOSITIONS.FRIENDLY : this.type === z.DEPLOYABLE ? CONST.TOKEN_DISPOSITIONS.NEUTRAL : (this.type, z.MECH, CONST.TOKEN_DISPOSITIONS.FRIENDLY), this.updateSource({ prototypeToken: {
			actorLink: [z.PILOT, z.MECH].includes(this.type),
			disposition: v,
			lockRotation: !0
		} });
	}
	async _preUpdate(...[e, t, m]) {
		if (await super._preUpdate(e, t, m) === !1) return !1;
		this.statChangeScrollingText(e);
	}
	_onUpdate(...[e, t, m]) {
		super._onUpdate(e, t, m);
		let v = game.userId == m, y = e.system?.active_mech !== void 0;
		y && game.actors.filter((e) => e.is_mech() && e.system.pilot?.value == this)?.forEach((e) => e.render()), v && (this.effectHelper.propagateEffects(y), (this.is_mech() || this.is_deployable()) && e.system?.owner && LancerActor.fromUuid(e.system.owner).then((e) => {
			e && e.effectHelper.propagateEffects(!0);
		}), this.loadoutHelper.cleanupUnresolvedReferences());
	}
	async quickOwn(e) {
		if (e.parent != this) {
			let t = await insinuate([e], this);
			for (let e of t) {
				let t = {};
				e.isLimited() && (t["system.uses.value"] = e.system.uses.max), e.isLoading() && (t["system.loaded"] = !0), e.isRecharge() && (t["system.charged"] = !0), Object.values(t).length > 0 && await e.update(t);
			}
			return [t[0], !0];
		} else return [e, !1];
	}
	_onCreateDescendantDocuments(...e) {
		let [t, m, v, y, x, S] = e, C = null, w = v.filter((e) => e.documentName === "Item");
		if (this.is_npc() && w.some((e) => e.is_npc_class()) && (C = this.items.find((e) => e.is_npc_class() && !w.find((t) => e._id === t._id))), super._onCreateDescendantDocuments(...e), game.userId == S) {
			if (this.is_npc() && w.some((e) => e.is_npc_class() || e.is_npc_template())) {
				w = w.filter((e) => e.is_npc_class() || e.is_npc_template());
				let e = w.find((e) => e.is_npc_class());
				e && this.npcClassSwapPromises.push(this._swapNpcClass(C, e)), w.filter((e) => e.is_npc_template()).forEach((e) => this.npcClassSwapPromises.push(this._swapNpcClass(null, e)));
			}
			for (let e of w) e.isLimited() && e.update({ "system.uses.value": e.system.uses.max }), e.isLoading() && e.update({ "system.loaded": !0 }), e.isRecharge() && e.update({ "system.charged": !0 });
			this.effectHelper.propagateEffects(!1);
		}
	}
	_onUpdateDescendantDocuments(...e) {
		let [t, m, v, y, x, S] = e;
		super._onUpdateDescendantDocuments(...e), game.userId == S && this.effectHelper.propagateEffects(!1);
	}
	_onDeleteDescendantDocuments(...e) {
		let [t, m, v, y, x, S] = e;
		super._onDeleteDescendantDocuments(...e);
		for (let e of v) Vn.add(e.uuid);
		Hn(), game.userId == S && (this.loadoutHelper.cleanupUnresolvedReferences(), this.effectHelper.propagateEffects(!1));
	}
	async _safeDeleteDescendant(e, t, m) {
		if (!t.length) return;
		let v = [];
		for (let e of t) {
			let t = e.uuid ?? "";
			Vn.has(t) || (Vn.add(t), v.push(e.id));
		}
		return Hn(), this.deleteEmbeddedDocuments(e, v, m);
	}
	is_pilot() {
		return this.type === z.PILOT;
	}
	is_mech() {
		return this.type === z.MECH;
	}
	is_npc() {
		return this.type === z.NPC;
	}
	is_deployable() {
		return this.type === z.DEPLOYABLE;
	}
	hasHeatcap() {
		return this.system.heat !== void 0;
	}
	async removeClassFeatures(e) {
		if (!this.is_npc() || !e.is_npc_class() && !e.is_npc_template()) return;
		let t = [...e.system.base_features, ...e.system.optional_features], m = this.itemTypes.npc_feature.filter((e) => t.includes(e.system.lid));
		await this._safeDeleteDescendant("Item", m.filter((e) => e != null));
	}
	async swapFrameImage(e) {
		if (!game.users.activeGM?.isSelf || !(this.is_mech() || this.is_npc())) return;
		let t = frameToPath(e?.name.replace(/ \[K\]$/, "")), m = this.is_mech() ? "systems/lancer/assets/icons/mech.svg" : "systems/lancer/assets/icons/npc_class.svg", v = this.prototypeToken?.texture?.src, y = this.img;
		await this.update({
			img: replaceDefaultResource(y, t, m),
			"prototypeToken.texture.src": replaceDefaultResource(v, t, m)
		});
	}
	async updateTokenSize(e) {
		let t;
		if (e.is_frame() && this.is_mech()) t = Math.max(1, e.system.stats.size ?? 0);
		else if (e.is_npc_class() && this.is_npc()) {
			let m = this.system.tier || 1;
			t = Math.max(1, e.system.base_stats[m - 1].size);
		}
		t && await this.prototypeToken.update({
			height: t,
			width: t
		});
	}
	findMatchingFeaturesInNpc(e) {
		if (!this.is_npc()) return [];
		let t = [];
		for (let m of e) for (let e of this.itemTypes.npc_feature) e.system.lid == m && t.push(e);
		return t;
	}
	async _swapNpcClass(e, t) {
		if (!game.users.activeGM?.isSelf || !this.is_npc() || !t.is_npc_class() && !t.is_npc_template()) return;
		let m = !1;
		if (e) {
			let t = this.findMatchingFeaturesInNpc([...e.system.base_features, ...e.system.optional_features]);
			t.length && (await this._safeDeleteDescendant("Item", [e, ...t]), m = !0);
		}
		await insinuate((await Promise.all(Array.from(t.system.base_features).map((e) => fromLid(e)))).filter((e) => e), this), m = !0, t.is_npc_class() && await this.swapFrameImage(t), m && await this.update({
			"system.hp.value": this.system.hp.max,
			"system.stress.value": this.system.stress.max,
			"system.structure.value": this.system.structure.max
		});
	}
	static async fromUuid(e, t) {
		if (e instanceof LancerActor) return e;
		let m = await fromUuid(e);
		if (!m) {
			let m = `${t ? t + " | " : ""}Actor ${e} not found.`;
			throw ui.notifications?.error(m), Error(m);
		}
		if (m instanceof TokenDocument.implementation && (m = m.actor), !(m instanceof LancerActor)) {
			let m = `${t ? t + " | " : ""}Document ${e} not an actor.`;
			throw ui.notifications?.error(m), Error(m);
		}
		return m;
	}
	static fromUuidSync(e, t) {
		if (e instanceof LancerActor) return e;
		let m = fromUuidSync(e);
		if (!m) {
			let m = `${t ? t + " | " : ""}Actor ${e} not found.`;
			throw ui.notifications?.error(m), Error(m);
		}
		if (m instanceof TokenDocument.implementation && (m = m.actor), !(m instanceof LancerActor)) {
			let m = `${t ? t + " | " : ""}Document ${e} not an actor.`;
			throw ui.notifications?.error(m), Error(m);
		}
		return m;
	}
	async statChangeScrollingText(e) {
		let t = this.token?.id || canvas?.scene?.tokens.find((e) => e.actor?.id === this.id)?.id;
		if (!t) return;
		let m = [];
		if (e.system?.overshield?.value !== void 0) {
			let v = this.system.overshield.value - e.system.overshield.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Overshield`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.TOP,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0x9f6bff"
				}
			});
		}
		if (e.system?.hp?.value !== void 0) {
			let v = this.system.hp.value - e.system.hp.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} HP`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0xc2e03e"
				}
			});
		}
		if (e.system?.burn !== void 0) {
			let v = this.system.burn - e.system.burn;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Burn`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0xc43333"
				}
			});
		}
		if (this.hasHeatcap() && e.system?.heat?.value !== void 0) {
			let v = this.system.heat.value - e.system.heat.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Heat`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0xc76f38"
				}
			});
		}
		if ((this.is_mech() || this.is_npc()) && e.system?.structure?.value !== void 0) {
			let v = this.system.structure.value - e.system.structure.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Structure`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0x1f9eff"
				}
			});
		}
		if ((this.is_mech() || this.is_npc()) && e.system?.stress?.value !== void 0) {
			let v = this.system.stress.value - e.system.stress.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Stress`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0xff7b00"
				}
			});
		}
		if (this.is_mech() && e.system?.repairs !== void 0) {
			let v = this.system.repairs.value - e.system.repairs.value;
			v && m.push({
				tokenId: t,
				content: `${v < 0 ? "+" : "-"}${Math.abs(v).toString()} Repairs`,
				style: {
					anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
					direction: v < 0 ? CONST.TEXT_ANCHOR_POINTS.TOP : CONST.TEXT_ANCHOR_POINTS.BOTTOM,
					fill: "0x8c8c8c"
				}
			});
		}
		for (let e of m) await new Promise((e) => setTimeout(e, 250)), tokenScrollText(e, !0);
	}
	async beginFullRepairFlow(e) {
		return this.is_deployable() ? !1 : await new FullRepairFlow(this, e ? { title: e } : void 0).begin();
	}
	async beginStabilizeFlow(e) {
		return !this.is_mech() && !this.is_npc() ? !1 : await new StabilizeFlow(this, e ? { title: e } : void 0).begin();
	}
	async beginOverchargeFlow() {
		return this.is_mech() ? await new OverchargeFlow(this).begin() : (ui.notifications.warn("Only mechs can overcharge!"), !1);
	}
	async beginRechargeFlow() {
		return this.is_npc() ? await new NPCRechargeFlow(this).begin() : (ui.notifications.warn("Only NPCs can recharge!"), !1);
	}
	async beginStatFlow(e, t) {
		return await new StatRollFlow(this, {
			path: e,
			title: t
		}).begin();
	}
	async beginBurnFlow(e) {
		return await new BurnFlow(this, { title: e }).begin();
	}
	async beginBasicAttackFlow(e) {
		return await new BasicAttackFlow(this, e ? { title: e } : void 0).begin();
	}
	async beginDamageFlow(e) {
		return await new DamageRollFlow(this, e ? { title: e } : void 0).begin();
	}
	async beginBasicTechAttackFlow(e) {
		if (!this.is_mech() && !this.is_npc()) return ui.notifications.warn("Only mechs and NPCs can tech attack!"), !1;
		let t = {
			title: e,
			invade: !0
		};
		return await new TechAttackFlow(this, t).begin();
	}
	async beginScanFlow(e) {
		return await new ScanFlow(this, { target: e }).begin();
	}
	async beginStructureFlow() {
		return await new StructureFlow(this).begin();
	}
	async beginOverheatFlow() {
		return await new OverheatFlow(this).begin();
	}
	async tallyBondXP() {
		if (!this.is_pilot()) return;
		let e = 0;
		for (let t of this.system.bond_state.xp_checklist.major_ideals) t && (e += 1);
		this.system.bond_state.xp_checklist.minor_ideal && (e += 1), this.system.bond_state.xp_checklist.veteran_power && (e += 1), e && (await this.update({ "system.bond_state.xp.value": this.system.bond_state.xp.value + e }), await this.update({ "system.bond_state.xp_checklist": {
			major_ideals: [
				!1,
				!1,
				!1
			],
			minor_ideal: !1,
			veteran_power: !1
		} }));
	}
	static migrateData(e) {
		return super.migrateData(e);
	}
}, Wn = [
	z.MECH,
	z.DEPLOYABLE,
	z.NPC,
	z.PILOT
];
function is_actor_type(e) {
	return Wn.includes(e);
}
//#endregion
export { DAMAGE as $, ct as $n, le as $r, weaponTypeSelector as $t, drilldownDocument as A, CollapseHandler as An, FakeBoundedNumberField as Ar, buildCounterHeader as At, resolveHelperDotpath as B, handleDocDropping as Bn, convertNpcStats as Br, npcAccuracyView as Bt, beginSecondaryStructureFlow as C, reserveUsesIndicator as Cn, applyTheme as Cr, registerActivationSteps as Ct, DamageField as D, mechLoadout as Dn, unpackTagTemplate as Dr, buildActionArrayHTML as Dt, jn as E, frameView as En, unpackTag as Er, bonusesDisplay as Et, inc_if as F, handleTagEditButtons as Fn, RangeTypeChecklistField as Fr, handleCounterInteraction as Ft, selected as G, TechAttackFlow as Gn, unpackRange as Gr, pilotArmorSlot as Gt, restrict_enum as H, registerBondPowerSteps as Hn, regRefToUuid as Hr, npcClassRefView as Ht, lancerDiceRoll as I, itemEditTags as In, SyncUUIDRefField as Ir, handleInputPlusMinusButtons as It, std_num_input as J, WeaponAttackFlow as Jn, friendly_entrytype_name as Jr, rangeEditor as Jt, std_checkbox as K, registerTechAttackSteps as Kn, ve as Kr, pilotGearRefview as Kt, large_textbox_card as L, TargetedEditForm as Ln, SystemTypeChecklistField as Lr, handlePowerUsesInteraction as Lt, handleGenControls as M, initializeCollapses as Mn, LIDField as Mr, damageEditor as Mt, handlePopoutTextEditor as N, compactTagList as Nn, LancerDataModel as Nr, genericCounter as Nt, unpackDamage as O, mechSystemView as On, DamageTypeChecklistField as Or, buildCounterArrayHTML as Ot, helper_root_doc as P, compactTagListHBS as Pn, NpcStatBlockField as Pr, handleContextMenus as Pt, tippy as Q, gridDist as Qn, me as Qr, weaponSizeSelector as Qt, popout_editor_button as R, gt as Rn, WeaponSizeChecklistField as Rr, licenseRefView as Rt, beginDismembermentDamageFlow as S, ref_params as Sn, applySimpleFonts as Sr, ActivationFlow as St, triggerStrussFlow as T, simple_ref_slot as Tn, TagField as Tr, bondPower as Tt, safe_html_helper as U, PowerField as Un, Se as Ur, npcFeatureView as Ut, restrict_choices as V, BondPowerFlow as Vn, regRefToLid as Vr, npcAttackBonusView as Vt, saveCancelButtons as W, unpackPower as Wn, RangeField as Wr, npcTemplateRefView as Wt, std_text_input as X, ft as Xn, se as Xr, systemTypeSelector as Xt, std_password_input as Y, registerAttackSteps as Yn, replaceDefaultResource as Yr, reserveRefView as Yt, std_x_of_y as Z, renderTemplateStep as Zn, ge as Zr, usesControl as Zt, registerFullRepairSteps as _, makeSystemTypeChecklist as _i, itemPreview as _n, fromLidMany as _r, registerSystemSteps as _t, registerBurnSteps as a, de as ai, attackTarget as an, tokenDocFromUuidSync as ar, getOfficialData as at, SecondaryStructureFlow as b, loadingIndicator as bn, CombatTrackerAppearance as br, CoreActiveFlow as bt, SimpleHTMLFlow as c, ie as ci, click_evt_open_ref as cn, LancerActiveEffect as cr, LCPIndex as ct, registerTextSteps as d, fe as di, handleLIDListDropping as dn, get_pack_id as dr, DamageRollFlow as dt, he as ei, frameToPath as en, ot as er, richTextEdit as et, NPCRechargeFlow as f, ee as fi, handleLoadedInteraction as fn, insinuate as fr, applyDamage as ft, FullRepairFlow as g, fittingsForMount as gi, handleUsesInteraction as gn, fromLid as gr, SystemFlow as gt, registerOverchargeSteps as h, ae as hi, handleRefSlotDropping as hn, slugify as hr, undoDamage as ht, BurnFlow as i, Q as ii, npcScanWeaponView as in, fixCCFormula as ir, getBaseContentPack as it, extendHelper as j, applyCollapseListeners as jn, we as jr, buildDeployablesArrayHBS as jt, IconFactory as k, pilotSlot as kn, EmbeddedRefField as kr, buildCounterHTML as kt, SimpleTextFlow as l, pe as li, handleChargedInteraction as ln, findLicenseFor as lr, LCPManager as lt, OverchargeFlow as m, q as mi, handleRefDragging as mn, lookupOwnedDeployables as mr, rollDamageCallback as mt, ScanFlow as n, EntryTypeLidPrefix as ni, npcScanSystemView as nn, LancerTokenDocument as nr, generateLcpSummary as nt, StabilizeFlow as o, ne as oi, damageTarget as on, tokenScrollText as or, mergeOfficialDataAndLcpIndex as ot, registerNPCSteps as p, oe as pi, handleRefClickOpen as pn, fulfillImportActor as pr, registerDamageSteps as pt, std_enum_select as q, BasicAttackFlow as qn, WELCOME as qr, pilotWeaponRefview as qt, registerScanSteps as r, B as ri, npcScanTechAttackView as rn, extendTokenConfig as rr, generateMultiLcpSummary as rt, registerStabilizeSteps as s, re as si, miniProfile as sn, userOwnsActor as sr, parseContentPack as st, Un as t, z as ti, actionTypeSelector as tn, LancerToken as tr, Dt as tt, printGenericCard as u, ce as ui, handleDocListDropping as un, get_pack as ur, addLCPManagerButton as ut, OverheatFlow as v, makeWeaponSizeChecklist as vi, lidItemList as vn, fromLidSync as vr, StatRollFlow as vt, registerStructureSteps as w, resolve_ref_element as wn, Pe as wr, actionTypeIcon as wt, StructureFlow as x, refPortrait as xn, registerSettings as xr, registerCoreActiveSteps as xt, registerOverheatSteps as y, makeWeaponTypeChecklist as yi, limitedUsesIndicator as yn, migrateLancerConditions as yr, registerStatSteps as yt, resolveDotpath as z, applyGlobalDragListeners as zn, WeaponTypeChecklistField as zr, mechLoadoutWeaponSlot as zt };

//# sourceMappingURL=lancer-actor-DUbnXjU1.mjs.map