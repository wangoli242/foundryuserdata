import "./chunk-DAAM-nuR.mjs";
import { Ar as e, Br as t, D as n, Dr as r, E as i, Er as a, Fr as o, Gr as s, H as c, Ir as l, Kr as u, Lr as ee, Mr as d, Nr as f, O as p, Or as te, Pr as ne, Qr as re, Rr as m, Tr as h, Un as ie, Ur as ae, V as oe, Vr as g, Wn as se, Wr as _, Xr as v, Zr as ce, _i as le, ai as y, ci as b, ct as ue, di as de, dr as x, ei as S, en as fe, gr as pe, hi as C, hr as me, ii as w, ir as he, jr as T, mi as E, oi as ge, pi as D, si as O, ti as k, ur as _e, vi as A, yi as j, zr as M } from "./lancer-actor-DUbnXjU1.mjs";
//#region src/module/models/bits/action.ts
var N = foundry.data.fields, ve = {
	required: !0,
	blank: !1,
	nullable: !0,
	initial: null,
	readonly: !0,
	validationError: "is not a properly formatted frequency"
}, ye = class FrequencyField extends N.StringField {
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, ve);
	}
	_validateType(e) {
		if (typeof e == "string") FrequencyField.ParseField(e);
		else if (e != null) throw Error();
	}
	static ParseField(e) {
		if (e = e.trim(), e == "Unlimited") return { interval: "Unlimited" };
		let t = e.match(/(\d)+\s*\/\s*(.*)/);
		if (!t) throw Error(`Frequency must be of a format alike "X / [${Object.values(ce).join(" | ")}]. Illegal option: "${e}"`);
		let n = Number.parseInt(t[1]), r = t[2];
		if (r = r[0].toUpperCase() + r.substring(1), !Object.keys(ce).includes(r)) throw Error(`Frequency interval must one of [${Object.values(ce).join(" | ")}]. Illegal option: "${r}"`);
		if (n < 1) throw Error(`Frequency use count must be a positive integer. Illegal option: ${n}`);
		return {
			uses: n,
			interval: r
		};
	}
}, getActionFieldSchema = () => ({
	lid: new d(),
	name: new N.StringField(),
	activation: new N.StringField({
		choices: Object.values(v),
		initial: v.Quick
	}),
	cost: new N.NumberField({
		min: 0,
		integer: !0,
		nullable: !1
	}),
	frequency: new ye(),
	init: new N.HTMLField(),
	trigger: new N.HTMLField(),
	terse: new N.HTMLField(),
	detail: new N.HTMLField(),
	pilot: new N.BooleanField(),
	mech: new N.BooleanField(),
	tech_attack: new N.BooleanField(),
	heat_cost: new N.NumberField({
		min: 0,
		integer: !0,
		nullable: !1
	}),
	synergy_locations: new N.ArrayField(new N.StringField({ required: !0 })),
	damage: new N.ArrayField(new n()),
	range: new N.ArrayField(new _())
}), ActionField = class extends N.SchemaField {
	constructor(e) {
		super(getActionFieldSchema(), e);
	}
};
function unpackAction(e) {
	return {
		activation: repairActivationType(e.activation ?? v.Quick),
		cost: e.cost ?? 0,
		damage: e.damage?.map(p) ?? [],
		detail: e.detail ?? "",
		frequency: e.frequency ?? "",
		heat_cost: e.heat_cost ?? 0,
		init: e.init ?? "",
		lid: e.id ?? "",
		mech: e.mech ?? !0,
		name: e.name ?? "Action",
		pilot: e.pilot ?? !1,
		range: e.range?.map(s) ?? [],
		synergy_locations: e.synergy_locations ?? [],
		terse: e.terse ?? "",
		trigger: e.trigger ?? "",
		tech_attack: e.tech_attack ?? !1
	};
}
function repairActivationType(e) {
	for (let t of Object.values(v)) if (t === e) return t;
	return e.toLowerCase() === "full action" ? v.Full : e.toLowerCase() === "quick action" ? v.Quick : e.toLowerCase() === "free action" ? v.Free : v.Quick;
}
//#endregion
//#region src/module/models/bits/bonus.ts
var P = foundry.data.fields, defineBonusFieldSchema = () => ({
	lid: new P.StringField({ nullable: !1 }),
	val: new P.StringField({ nullable: !1 }),
	overwrite: new P.BooleanField(),
	replace: new P.BooleanField(),
	damage_types: new te(),
	range_types: new o(),
	weapon_types: new M(),
	weapon_sizes: new m()
}), BonusField = class extends P.SchemaField {
	constructor(e) {
		super(defineBonusFieldSchema(), e);
	}
};
function unpackBonus(e) {
	return {
		lid: e.id,
		val: e.val?.toString() ?? "",
		damage_types: e.damage_types ? i.MakeChecklist(e.damage_types) : null,
		range_types: e.range_types ? ae.MakeChecklist(e.range_types) : null,
		weapon_sizes: e.weapon_sizes ? A(e.weapon_sizes) : null,
		weapon_types: e.weapon_types ? j(e.weapon_types) : null,
		overwrite: e.overwrite ?? !1,
		replace: e.replace ?? !1
	};
}
//#endregion
//#region src/module/models/bits/synergy.ts
var F = foundry.data.fields, defineSynergyFieldSchema = () => ({
	locations: new F.ArrayField(new F.StringField({
		choices: re,
		initial: "any"
	})),
	detail: new F.StringField({ nullable: !1 }),
	damage_types: new te(),
	range_types: new o(),
	weapon_types: new M(),
	weapon_sizes: new m(),
	system_types: new ee()
}), SynergyField = class extends F.SchemaField {
	constructor(e) {
		super(defineSynergyFieldSchema(), e);
	}
	migrateSource(e, t) {
		return t.locations?.some((e) => e.includes(",")) && (t.locations = t.locations.flatMap((e) => e.split(",").map((e) => e.trim()))), t.locations &&= t.locations.map((e) => e.toLowerCase()), super.migrateSource(e, t);
	}
};
function unpackSynergy(e) {
	let t = e.locations ?? [];
	Array.isArray(t) || (t = [t]);
	let n = t.flatMap((e) => {
		let t = e.toLowerCase().trim();
		return t.includes(",") ? t.split(",").map((e) => e.trim()) : t;
	}), r = null;
	if (e.weapon_sizes) {
		let t = e.weapon_sizes;
		Array.isArray(t) || (t = [t]), t.includes("any") && (t = [
			E.Aux,
			E.Heavy,
			E.Main,
			E.Superheavy
		]), r = A(t);
	}
	let i = null;
	if (e.weapon_types) {
		let t = e.weapon_types;
		Array.isArray(t) || (t = [t]), t.includes("any") && (t = [
			C.CQB,
			C.Cannon,
			C.Launcher,
			C.Melee,
			C.Nexus,
			C.Rifle
		]), i = j(t);
	}
	let a = null;
	if (e.system_types) {
		let t = e.system_types;
		Array.isArray(t) || (t = [t]), t.includes("any") && (t = [
			D.AI,
			D.Armor,
			D.Deployable,
			D.Drone,
			D.FlightSystem,
			D.Integrated,
			D.Mod,
			D.Shield,
			D.System,
			D.Tech
		]), a = le(t);
	}
	return {
		detail: e.detail,
		locations: n,
		damage_types: null,
		range_types: null,
		weapon_sizes: r,
		weapon_types: i,
		system_types: a
	};
}
//#endregion
//#region src/module/models/bits/counter.ts
var I = foundry.data.fields, defineCounterFieldSchema = () => ({
	lid: new d(),
	name: new I.StringField(),
	min: new I.NumberField({
		integer: !0,
		nullable: !1,
		initial: 0
	}),
	max: new I.NumberField({
		integer: !0,
		nullable: !0,
		initial: 6
	}),
	default_value: new I.NumberField({
		integer: !0,
		nullable: !1,
		initial: 0
	}),
	value: new I.NumberField({
		integer: !0,
		nullable: !1,
		initial: 0
	})
}), L = class CounterField extends I.SchemaField {
	constructor(e) {
		super(defineCounterFieldSchema(), e);
	}
	static migrateData(e) {
		e.value = e.value ?? e.val, super.migrateData(e);
	}
	static bound_val(e, t) {
		return t = Math.round(t), t = Math.max(t, e.min), e.max !== null && (t = Math.min(t, e.max)), t;
	}
	clean(e, t) {
		let n = super.clean(e, t);
		return n == null ? n : (n.initialized = CounterField.bound_val(n, n.initialized || 0), n.default_value = CounterField.bound_val(n, n.default_value || 0), n);
	}
	_validateType(e) {
		if (e.max != null && e.min != null && e.max < e.min) throw Error("max must be > min");
	}
};
function unpackCounter(e) {
	let t = e.default_value ?? e.min ?? 0;
	return {
		default_value: t,
		value: t,
		lid: e.id,
		max: e.max ?? 6,
		min: e.min ?? 0,
		name: e.name
	};
}
//#endregion
//#region src/module/models/actors/shared.ts
var R = foundry.data.fields;
function template_universal_actor() {
	return {
		lid: new d(),
		burn: new R.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 0
		}),
		activations: new R.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 1
		}),
		custom_counters: new R.ArrayField(new L()),
		hp: new T({
			initialValue: 10,
			max: 10
		}),
		overshield: new T({
			initialValue: 0,
			max: 14
		}),
		inherited_effects: new R.SchemaField({
			from_uuid: new R.StringField(),
			data: new R.ArrayField(new R.ObjectField()),
			visible: new R.BooleanField()
		}, {
			nullable: !0,
			initial: null
		})
	};
}
function template_action_tracking() {
	return { action_tracker: new R.SchemaField({
		protocol: new R.BooleanField(),
		move: new R.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 0
		}),
		full: new R.BooleanField(),
		quick: new R.BooleanField(),
		reaction: new R.BooleanField(),
		free: new R.BooleanField(),
		used_reactions: new R.ArrayField(new R.StringField({ nullable: !1 }))
	}) };
}
function template_heat() {
	return { heat: new T({
		initialValue: 0,
		max: 6
	}) };
}
function template_struss() {
	return {
		stress: new T({
			initialValue: 0,
			max: 1
		}),
		structure: new T({
			initialValue: 0,
			max: 1
		})
	};
}
function template_statuses() {
	return {};
}
//#endregion
//#region src/module/models/actors/deployable.ts
var z = foundry.data.fields, defineDeployableSchema = () => ({
	actions: new z.ArrayField(new ActionField()),
	counters: new z.ArrayField(new L()),
	synergies: new z.ArrayField(new SynergyField()),
	tags: new z.ArrayField(new h()),
	activation: new z.StringField({
		choices: Object.values(v),
		initial: v.Quick
	}),
	stats: new z.SchemaField({
		armor: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 0
		}),
		edef: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 10
		}),
		evasion: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 10
		}),
		heatcap: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 0
		}),
		hp: new z.StringField({ initial: "5" }),
		save: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 10
		}),
		size: new z.NumberField({
			min: .5,
			integer: !1,
			nullable: !1,
			initial: .5
		}),
		speed: new z.NumberField({
			min: 0,
			integer: !0,
			nullable: !1,
			initial: 0
		})
	}),
	cost: new z.NumberField({
		min: 0,
		integer: !0,
		nullable: !1,
		initial: 1
	}),
	instances: new z.NumberField({
		min: 1,
		integer: !0,
		nullable: !1,
		initial: 1
	}),
	deactivation: new z.StringField({
		choices: Object.values(v),
		initial: null,
		nullable: !0
	}),
	detail: new z.HTMLField(),
	recall: new z.StringField({
		choices: Object.values(v),
		initial: null,
		nullable: !0
	}),
	redeploy: new z.StringField({
		choices: Object.values(v),
		initial: null,
		nullable: !0
	}),
	type: new z.StringField({
		choices: Object.values(S),
		initial: S.Deployable
	}),
	avail_mounted: new z.BooleanField({ initial: !0 }),
	avail_unmounted: new z.BooleanField({ initial: !1 }),
	deployer: new l("Actor", { allowed_types: [
		k.MECH,
		k.PILOT,
		k.NPC
	] }),
	owner: new l("Actor", { allowed_types: [
		k.MECH,
		k.PILOT,
		k.NPC
	] }),
	...template_universal_actor(),
	...template_heat(),
	...template_statuses()
}), DeployableModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/deployable.svg";
	}
	static defineSchema() {
		return defineDeployableSchema();
	}
	static migrateData(e) {
		return e.type && e.type[0] == e.type[0].toLowerCase() && (e.type = c(S, S.Deployable, e.type)), e.stats ||= {
			armor: e.armor || 0,
			edef: e.edef || 8,
			evasion: e.evasion || 5,
			heatcap: e.heatcap || 0,
			hp: he(e.max_hp?.toString() || "5"),
			save: e.save || 10,
			size: e.size || .5,
			speed: e.speed || 0
		}, e.hp && typeof e.hp == "string" && (e.stats.hp = he(e.hp), delete e.hp), e.stats?.size !== void 0 && (e.stats?.size >= 1 ? e.stats.size = Math.floor(e.stats.size) : e.stats.size = .5), super.migrateData(e);
	}
};
function unpackDeployableData(e) {
	let t = Number.parseInt(e.hp?.toString() || "5") || 5;
	return {
		actions: e.actions?.map(unpackAction),
		bonuses: e.bonuses?.map(unpackBonus),
		counters: e.counters?.map(unpackCounter),
		synergies: e.synergies?.map(unpackSynergy),
		tags: e.tags?.map(a),
		activation: e.activation,
		stats: {
			armor: e.armor,
			edef: e.edef,
			evasion: e.evasion,
			heatcap: e.heatcap,
			hp: he(e.hp?.toString() || "5"),
			save: e.save,
			size: e.size,
			speed: e.speed
		},
		activations: 0,
		avail_mounted: void 0,
		avail_unmounted: void 0,
		hp: {
			min: 0,
			max: t,
			value: t
		},
		burn: void 0,
		cost: e.cost,
		custom_counters: void 0,
		deactivation: e.deactivation,
		deployer: void 0,
		detail: e.detail,
		instances: e.instances,
		lid: void 0,
		overshield: void 0,
		recall: e.recall,
		redeploy: e.redeploy,
		type: c(S, S.Deployable, e.type)
	};
}
function unpackDeployable(e, t) {
	let n = "dep_" + me(e.name), r = unpackDeployableData(e);
	return r.lid = n, t.createdDeployables.push({
		name: e.name,
		system: r,
		type: k.DEPLOYABLE
	}), n;
}
//#endregion
//#region src/module/models/items/shared.ts
var B = foundry.data.fields;
function template_universal_item() {
	return { lid: new d() };
}
function template_destructible() {
	return {
		cascading: new B.BooleanField(),
		destroyed: new B.BooleanField()
	};
}
function template_uses() {
	return { uses: new e({
		integer: !0,
		nullable: !1,
		initial: 0
	}) };
}
function template_bascdt() {
	return {
		bonuses: new B.ArrayField(new BonusField()),
		actions: new B.ArrayField(new ActionField()),
		synergies: new B.ArrayField(new SynergyField()),
		counters: new B.ArrayField(new L()),
		deployables: new B.ArrayField(new d()),
		integrated: new B.ArrayField(new d()),
		tags: new B.ArrayField(new h())
	};
}
function template_licensed() {
	return {
		manufacturer: new B.StringField({
			required: !0,
			nullable: !1,
			blank: !1,
			initial: "GMS"
		}),
		license_level: new B.NumberField({
			integer: !0,
			minimum: 0,
			maximum: 3
		}),
		license: new B.StringField({
			required: !0,
			nullable: !1,
			blank: !1,
			initial: "mf_unknown"
		})
	};
}
function migrateManufacturer(e) {
	return e?.fallback_lid || "GMS";
}
function addDeployableTags(e, t, n) {
	let r = e?.map((e) => unpackDeployable(e, n)), i = n.createdDeployables.filter((e) => e.system.lid && r?.includes(e.system.lid)), o = t?.map(a);
	if (i?.length) {
		let e = new Set(i.map((e) => e.system.type));
		e.has(S.Deployable) && o?.push({
			lid: "tg_deployable",
			val: "0"
		}), e.has(S.Drone) && o?.push({
			lid: "tg_drone",
			val: "0"
		}), e.has(S.Mine) && o?.push({
			lid: "tg_mine",
			val: "0"
		});
	}
	return {
		deployables: r,
		tags: o
	};
}
//#endregion
//#region src/module/models/items/pilot_armor.ts
var be = foundry.data.fields, definePilotArmorModelSchema = () => ({
	description: new be.StringField({ nullable: !0 }),
	effect: new be.StringField(),
	...template_universal_item(),
	...template_uses(),
	...template_bascdt()
}), PilotArmorModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/role_tank.svg";
	}
	static defineSchema() {
		return definePilotArmorModelSchema();
	}
};
function unpackPilotArmor(e, t) {
	let { deployables: n, tags: r } = addDeployableTags(e.deployables, e.tags, t);
	return {
		name: e.name,
		type: k.PILOT_ARMOR,
		system: {
			actions: e.actions?.map(unpackAction) ?? [],
			bonuses: e.bonuses?.map(unpackBonus) ?? [],
			synergies: e.synergies?.map(unpackSynergy),
			counters: void 0,
			deployables: n ?? [],
			description: e.description ?? "",
			effect: e.effect,
			lid: e.id,
			tags: r ?? []
		}
	};
}
//#endregion
//#region src/module/models/items/pilot_weapon.ts
var V = foundry.data.fields, definePilotWeaponModelSchema = () => ({
	description: new V.StringField({ nullable: !0 }),
	range: new V.ArrayField(new _()),
	damage: new V.ArrayField(new n()),
	effect: new V.StringField(),
	loaded: new V.BooleanField(),
	...template_universal_item(),
	...template_uses(),
	...template_bascdt()
}), PilotWeaponModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/role_artillery.svg";
	}
	static defineSchema() {
		return definePilotWeaponModelSchema();
	}
};
function unpackPilotWeapon(e, t) {
	let { deployables: n, tags: r } = addDeployableTags(e.deployables, e.tags, t);
	return {
		name: e.name,
		type: k.PILOT_WEAPON,
		system: {
			actions: e.actions?.map(unpackAction) ?? [],
			bonuses: e.bonuses?.map(unpackBonus) ?? [],
			synergies: e.synergies?.map(unpackSynergy),
			counters: void 0,
			deployables: n ?? [],
			description: e.description ?? "",
			range: e.range?.map(s) ?? [],
			damage: e.damage?.map(p) ?? [],
			effect: e.effect,
			loaded: void 0,
			lid: e.id,
			tags: r ?? []
		}
	};
}
//#endregion
//#region src/module/models/items/pilot_gear.ts
var xe = foundry.data.fields, definePilotGearModelSchema = () => ({
	description: new xe.StringField({ nullable: !0 }),
	effect: new xe.StringField(),
	...template_universal_item(),
	...template_uses(),
	...template_bascdt()
}), PilotGearModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/generic_item.svg";
	}
	static defineSchema() {
		return definePilotGearModelSchema();
	}
};
function unpackPilotGear(e, t) {
	let { deployables: n, tags: r } = addDeployableTags(e.deployables, e.tags, t);
	return {
		name: e.name,
		type: k.PILOT_GEAR,
		system: {
			actions: e.actions?.map(unpackAction) ?? [],
			bonuses: e.bonuses?.map(unpackBonus) ?? [],
			synergies: e.synergies?.map(unpackSynergy),
			counters: void 0,
			deployables: n ?? [],
			description: e.description ?? "",
			effect: e.effect,
			lid: e.id,
			tags: r ?? []
		}
	};
}
//#endregion
//#region src/module/models/items/core_bonus.ts
var H = foundry.data.fields, defineCoreBonusModelSchema = () => ({
	description: new H.StringField({ nullable: !0 }),
	effect: new H.StringField(),
	mounted_effect: new H.StringField(),
	manufacturer: new H.StringField(),
	...template_universal_item(),
	...template_bascdt()
}), CoreBonusModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/core_bonus.svg";
	}
	static defineSchema() {
		return defineCoreBonusModelSchema();
	}
	static migrateData(e) {
		return e.source && (e.manufacturer = migrateManufacturer(e.source)), super.migrateData(e);
	}
};
function unpackCoreBonus(e, t) {
	return {
		name: e.name,
		type: k.CORE_BONUS,
		system: {
			actions: e.actions?.map(unpackAction) ?? [],
			bonuses: e.bonuses?.map(unpackBonus) ?? [],
			counters: e.counters?.map(unpackCounter) ?? [],
			deployables: e.deployables?.map((e) => unpackDeployable(e, t)) ?? [],
			description: e.description,
			effect: e.effect,
			integrated: e.integrated,
			lid: e.id,
			manufacturer: e.source,
			mounted_effect: e.mounted_effect,
			synergies: e.synergies?.map(unpackSynergy),
			tags: []
		}
	};
}
//#endregion
//#region src/module/models/items/skill.ts
var Se = foundry.data.fields, defineSkillModelSchema = () => ({
	description: new Se.HTMLField(),
	detail: new Se.StringField(),
	curr_rank: new Se.NumberField({
		nullable: !1,
		initial: 1,
		min: 1,
		max: 3
	}),
	...template_universal_item()
}), SkillModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/skill.svg";
	}
	static defineSchema() {
		return defineSkillModelSchema();
	}
	static migrateData(e) {
		return e.rank && (e.curr_rank = e.rank), super.migrateData(e);
	}
};
function unpackSkill(e, t) {
	return {
		name: e.name,
		type: k.SKILL,
		system: {
			lid: e.id,
			curr_rank: 1,
			description: e.description,
			detail: e.detail
		}
	};
}
//#endregion
//#region src/module/models/items/talent.ts
var U = foundry.data.fields, defineTalentModelSchema = () => ({
	curr_rank: new U.NumberField({
		nullable: !1,
		initial: 1,
		min: 1,
		max: 3
	}),
	description: new U.HTMLField(),
	terse: new U.StringField(),
	ranks: new U.ArrayField(new U.SchemaField({
		name: new U.StringField(),
		description: new U.HTMLField(),
		exclusive: new U.BooleanField({ initial: !1 }),
		actions: new U.ArrayField(new ActionField()),
		bonuses: new U.ArrayField(new BonusField()),
		synergies: new U.ArrayField(new SynergyField()),
		deployables: new U.ArrayField(new d()),
		counters: new U.ArrayField(new L()),
		integrated: new U.ArrayField(new d())
	})),
	...template_universal_item()
}), TalentModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/talent.svg";
	}
	static defineSchema() {
		return defineTalentModelSchema();
	}
};
function unpackTalent(e, t) {
	return {
		name: e.name,
		type: k.TALENT,
		system: {
			lid: e.id,
			curr_rank: void 0,
			description: e.description,
			ranks: e.ranks.map((e) => ({
				actions: e.actions?.map(unpackAction) ?? [],
				bonuses: e.bonuses?.map(unpackBonus) ?? [],
				counters: e.counters?.map(unpackCounter) ?? [],
				deployables: e.deployables?.map((e) => unpackDeployable(e, t)) ?? [],
				description: e.description,
				exclusive: e.exclusive,
				integrated: e.integrated,
				name: e.name,
				synergies: e.synergies?.map(unpackSynergy) ?? []
			})),
			terse: e.terse
		}
	};
}
//#endregion
//#region src/module/models/bits/question.ts
var W = foundry.data.fields, defineBondQuestionFieldSchema = () => ({
	question: new W.StringField({ nullable: !1 }),
	options: new W.ArrayField(new W.StringField({ nullable: !1 }))
}), BondQuestionField = class extends W.SchemaField {
	constructor(e) {
		super(defineBondQuestionFieldSchema(), e);
	}
}, G = foundry.data.fields, defineBondModelSchema = () => ({
	major_ideals: new G.ArrayField(new G.StringField()),
	minor_ideals: new G.ArrayField(new G.StringField()),
	questions: new G.ArrayField(new BondQuestionField()),
	powers: new G.ArrayField(new ie()),
	...template_universal_item()
}), BondModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/bond.svg";
	}
	static defineSchema() {
		return defineBondModelSchema();
	}
};
function unpackBond(e) {
	let t = e.powers.map((e) => se(e));
	return {
		name: e.name,
		type: k.BOND,
		system: {
			lid: e.id,
			major_ideals: e.major_ideals,
			minor_ideals: e.minor_ideals,
			questions: e.questions,
			powers: t
		}
	};
}
//#endregion
//#region src/module/models/items/license.ts
var Ce = foundry.data.fields, defineLicenseModelSchema = () => ({
	key: new Ce.StringField(),
	manufacturer: new Ce.StringField(),
	curr_rank: new Ce.NumberField({
		nullable: !1,
		initial: 1,
		min: 1,
		max: 3
	}),
	...template_universal_item()
}), LicenseModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/license.svg";
	}
	static defineSchema() {
		return defineLicenseModelSchema();
	}
	static migrateData(e) {
		return typeof e.manufacturer == "object" && (e.manufacturer = e.manufacturer.fallback_lid), e.rank && (e.curr_rank = e.rank), super.migrateData(e);
	}
};
function unpackLicense(e, t, n, r) {
	return {
		name: e,
		type: k.LICENSE,
		system: {
			lid: `lic_${t}`,
			key: t,
			manufacturer: n
		}
	};
}
//#endregion
//#region src/module/models/bits/ammo.ts
var K = foundry.data.fields, defineAmmoFieldSchema = () => ({
	name: new K.StringField({ nullable: !1 }),
	description: new K.StringField({ nullable: !1 }),
	cost: new K.NumberField({ nullable: !0 }),
	allowed_types: new M(),
	allowed_sizes: new m(),
	restricted_types: new M(),
	restricted_sizes: new m()
}), AmmoField = class extends K.SchemaField {
	constructor(e) {
		super(defineAmmoFieldSchema(), e);
	}
};
function unpackAmmo(e) {
	return {
		name: e.name,
		description: e.description,
		cost: e.cost ?? null,
		allowed_types: e.allowed_types ? j(e.allowed_types) : null,
		allowed_sizes: e.allowed_sizes ? A(e.allowed_sizes) : null,
		restricted_types: e.restricted_types ? j(e.restricted_types) : null,
		restricted_sizes: e.restricted_sizes ? A(e.restricted_sizes) : null
	};
}
//#endregion
//#region src/module/models/items/mech_system.ts
var q = foundry.data.fields, defineMechSystemModelSchema = () => ({
	effect: new q.HTMLField(),
	sp: new q.NumberField({
		nullable: !1,
		initial: 0
	}),
	description: new q.HTMLField(),
	type: new q.StringField(),
	ammo: new q.ArrayField(new AmmoField()),
	...template_universal_item(),
	...template_bascdt(),
	...template_destructible(),
	...template_licensed(),
	...template_uses()
}), MechSystemModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/mech_system.svg";
	}
	static defineSchema() {
		return defineMechSystemModelSchema();
	}
	static migrateData(e) {
		return e.source && (e.manufacturer = migrateManufacturer(e.source)), super.migrateData(e);
	}
};
function unpackMechSystem(e, t) {
	let { deployables: n, tags: r } = addDeployableTags(e.deployables, e.tags, t);
	return {
		name: e.name,
		type: k.MECH_SYSTEM,
		system: {
			lid: e.id,
			actions: e.actions?.map(unpackAction),
			bonuses: e.bonuses?.map(unpackBonus),
			cascading: void 0,
			counters: e.counters?.map(unpackCounter),
			deployables: n,
			description: e.description,
			destroyed: void 0,
			effect: e.effect,
			integrated: e.integrated,
			license: e.license_id || e.license,
			license_level: e.license_level,
			manufacturer: e.source,
			sp: e.sp,
			synergies: e.synergies?.map(unpackSynergy),
			tags: r,
			type: e.type,
			ammo: e.ammo?.map(unpackAmmo),
			uses: {
				value: 0,
				max: 0
			}
		}
	};
}
//#endregion
//#region src/module/models/items/mech_weapon.ts
var J = foundry.data.fields, defineProfileSchema = () => ({
	name: new J.StringField({ initial: "Base Profile" }),
	type: new J.StringField({
		choices: Object.values(C),
		initial: C.Rifle
	}),
	damage: new J.ArrayField(new n()),
	range: new J.ArrayField(new _()),
	tags: new J.ArrayField(new h()),
	description: new J.StringField(),
	effect: new J.StringField(),
	on_attack: new J.StringField(),
	on_hit: new J.StringField(),
	on_crit: new J.StringField(),
	cost: new J.NumberField({
		nullable: !1,
		initial: 0
	}),
	skirmishable: new J.BooleanField(),
	barrageable: new J.BooleanField(),
	actions: new J.ArrayField(new ActionField()),
	bonuses: new J.ArrayField(new BonusField()),
	synergies: new J.ArrayField(new SynergyField()),
	counters: new J.ArrayField(new L())
}), defineMechWeaponModelSchema = () => ({
	deployables: new J.ArrayField(new d()),
	integrated: new J.ArrayField(new d()),
	sp: new J.NumberField({
		nullable: !1,
		initial: 0
	}),
	actions: new J.ArrayField(new ActionField()),
	profiles: new J.ArrayField(new J.SchemaField(defineProfileSchema()), {
		min: 1,
		initial: [{
			damage: [{
				val: "1d6",
				type: "Kinetic"
			}],
			range: [{
				type: "Range",
				val: 5
			}],
			tags: [],
			skirmishable: !0,
			barrageable: !0,
			actions: [],
			bonuses: [],
			synergies: [],
			counters: []
		}]
	}),
	loaded: new J.BooleanField(),
	selected_profile_index: new J.NumberField({
		nullable: !1,
		initial: 0
	}),
	size: new J.StringField({
		choices: Object.values(E).concat("Ship-class"),
		initial: E.Main
	}),
	no_core_bonuses: new J.BooleanField(),
	no_mods: new J.BooleanField(),
	no_bonuses: new J.BooleanField(),
	no_synergies: new J.BooleanField(),
	no_attack: new J.BooleanField(),
	...template_universal_item(),
	...template_destructible(),
	...template_licensed(),
	...template_uses()
}), MechWeaponModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/mech_weapon.svg";
	}
	static defineSchema() {
		return defineMechWeaponModelSchema();
	}
	static migrateData(e) {
		return e.source && (e.manufacturer = migrateManufacturer(e.source)), super.migrateData(e);
	}
};
function unpackMechWeapon(e, t) {
	let n = [], { deployables: r, tags: i } = addDeployableTags(e.deployables, e.tags, t);
	r ??= [], i ??= [];
	let a = e.integrated ?? [], o = (e.profiles?.length ?? 0) > 0;
	for (let l of o ? e.profiles : [e]) {
		let u = [], ee = [];
		if (o) {
			let { deployables: e, tags: n } = addDeployableTags(l.deployables, l.tags, t);
			u = e ?? [], ee = n ?? [];
		}
		r.push(...u), a.push(...l.integrated ?? []);
		let d, f;
		l.barrage == null && l.skirmish == null ? (d = !0, f = e.mount != E.Superheavy) : l.barrage == null ? (f = l.skirmish, d = !1) : l.skirmish == null ? (f = !1, d = l.barrage) : (f = l.skirmish, d = l.barrage);
		let te = o ? [...i, ...ee] : i;
		n.push({
			damage: l.damage?.filter((e) => e.val != "N/A").map(p),
			range: l.range?.filter((e) => e.val != "N/A").map(s),
			tags: te,
			effect: l.effect,
			on_attack: l.on_attack,
			on_crit: l.on_crit,
			on_hit: l.on_hit,
			cost: l.cost ?? 1,
			barrageable: d,
			skirmishable: f,
			actions: l.actions?.map(unpackAction),
			bonuses: l.bonuses?.map(unpackBonus),
			counters: l.counters?.map(unpackCounter),
			description: l.description ?? e.description,
			name: l.name ?? `${e.name} :: ${e.profiles?.length ?? 1}`,
			synergies: l.synergies?.map(unpackSynergy),
			type: c(C, C.Rifle, l.type ?? e.type)
		});
	}
	return {
		name: e.name,
		type: k.MECH_WEAPON,
		system: {
			cascading: void 0,
			deployables: r,
			destroyed: void 0,
			integrated: e.integrated,
			license: e.license_id || e.license,
			license_level: e.license_level,
			lid: e.id,
			loaded: void 0,
			manufacturer: e.source,
			no_attack: e.no_attack,
			no_bonuses: e.no_bonus,
			no_core_bonuses: e.no_core_bonus,
			no_mods: e.no_mods,
			no_synergies: e.no_synergy,
			actions: e.actions?.map(unpackAction) || [],
			profiles: n,
			selected_profile_index: 0,
			size: e.mount,
			sp: e.sp,
			uses: {
				value: 0,
				max: 0
			}
		}
	};
}
//#endregion
//#region src/module/models/items/weapon_mod.ts
var Y = foundry.data.fields, defineWeaponModModel = () => ({
	added_tags: new Y.ArrayField(new h()),
	added_damage: new Y.ArrayField(new n()),
	added_range: new Y.ArrayField(new _()),
	effect: new Y.HTMLField(),
	description: new Y.HTMLField(),
	sp: new Y.NumberField({
		nullable: !1,
		initial: 0
	}),
	allowed_types: new M(),
	allowed_sizes: new m(),
	...template_universal_item(),
	...template_bascdt(),
	...template_destructible(),
	...template_licensed(),
	...template_uses()
}), WeaponModModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/weapon_mod.svg";
	}
	static defineSchema() {
		return defineWeaponModModel();
	}
	static migrateData(e) {
		return e.source && (e.manufacturer = migrateManufacturer(e.source)), super.migrateData(e);
	}
};
function unpackWeaponMod(e, t) {
	let { deployables: n, tags: r } = addDeployableTags(e.deployables, e.tags, t);
	return {
		name: e.name,
		type: k.WEAPON_MOD,
		system: {
			lid: e.id,
			actions: e.actions?.map(unpackAction),
			bonuses: e.bonuses?.map(unpackBonus),
			cascading: void 0,
			counters: e.counters?.map(unpackCounter),
			deployables: n,
			description: e.description,
			destroyed: void 0,
			effect: e.effect,
			integrated: e.integrated,
			license: e.license_id || e.license,
			license_level: e.license_level,
			manufacturer: e.source,
			sp: e.sp,
			synergies: e.synergies?.map(unpackSynergy),
			tags: r,
			uses: {
				value: 0,
				max: 0
			},
			added_damage: e.added_damage?.map(p),
			added_range: e.added_range?.map(s),
			added_tags: e.added_tags?.map(a),
			allowed_sizes: A(e.allowed_sizes ?? []),
			allowed_types: j(e.allowed_types ?? [])
		}
	};
}
//#endregion
//#region src/module/models/items/reserve.ts
var X = foundry.data.fields, defineReserveModelSchema = () => ({
	consumable: new X.BooleanField(),
	label: new X.StringField(),
	type: new X.StringField({ initial: de.Tactical }),
	used: new X.BooleanField(),
	description: new X.HTMLField(),
	...template_universal_item(),
	...template_bascdt()
}), ReserveModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/reserve_tac.svg";
	}
	static defineSchema() {
		return defineReserveModelSchema();
	}
};
function unpackReserve(e, t) {
	return {
		name: e.name ?? e.label ?? "Unnamed Reserve",
		type: k.RESERVE,
		system: {
			lid: e.id,
			description: e.description,
			actions: e.actions?.map(unpackAction),
			bonuses: e.bonuses?.map(unpackBonus),
			consumable: e.consumable,
			counters: e.counters?.map(unpackCounter),
			deployables: e.deployables?.map((e) => unpackDeployable(e, t)),
			integrated: e.integrated,
			label: e.label,
			synergies: e.synergies?.map(unpackSynergy),
			tags: void 0,
			type: c(de, de.Tactical, e.type),
			used: e.used
		}
	};
}
//#endregion
//#region src/module/models/items/frame.ts
var Z = foundry.data.fields, defineFrameSchema = () => ({
	description: new Z.HTMLField(),
	mechtype: new Z.ArrayField(new Z.StringField({
		nullable: !1,
		choices: Object.values(y)
	})),
	mounts: new Z.ArrayField(new Z.StringField({
		nullable: !1,
		choices: Object.values(ge)
	})),
	stats: new Z.SchemaField({
		armor: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 0
		}),
		edef: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 8
		}),
		evasion: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 8
		}),
		heatcap: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 5
		}),
		hp: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 10
		}),
		repcap: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 0
		}),
		save: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 10
		}),
		sensor_range: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 10
		}),
		size: new Z.NumberField({
			integer: !1,
			minimum: .5,
			initial: 1
		}),
		sp: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 0
		}),
		speed: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 4
		}),
		stress: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 4
		}),
		structure: new Z.NumberField({
			integer: !0,
			minimum: 0,
			initial: 4
		}),
		tech_attack: new Z.NumberField({
			integer: !0,
			initial: 0
		})
	}),
	traits: new Z.ArrayField(new Z.SchemaField({
		name: new Z.StringField(),
		description: new Z.HTMLField(),
		bonuses: new Z.ArrayField(new BonusField()),
		counters: new Z.ArrayField(new L()),
		integrated: new Z.ArrayField(new d()),
		deployables: new Z.ArrayField(new d()),
		actions: new Z.ArrayField(new ActionField()),
		synergies: new Z.ArrayField(new SynergyField()),
		use: new Z.StringField({
			nullable: !0,
			initial: null
		})
	})),
	core_system: new Z.SchemaField({
		name: new Z.StringField(),
		description: new Z.HTMLField(),
		activation: new Z.StringField({
			nullable: !1,
			choices: Object.values(v)
		}),
		deactivation: new Z.StringField({
			nullable: !0,
			choices: Object.values(v),
			initial: null
		}),
		use: new Z.StringField({
			nullable: !0,
			initial: null
		}),
		active_name: new Z.StringField(),
		active_effect: new Z.HTMLField(),
		active_synergies: new Z.ArrayField(new SynergyField()),
		active_bonuses: new Z.ArrayField(new BonusField()),
		active_actions: new Z.ArrayField(new ActionField()),
		passive_name: new Z.StringField(),
		passive_effect: new Z.HTMLField(),
		passive_synergies: new Z.ArrayField(new SynergyField()),
		passive_bonuses: new Z.ArrayField(new BonusField()),
		passive_actions: new Z.ArrayField(new ActionField()),
		deployables: new Z.ArrayField(new d()),
		counters: new Z.ArrayField(new L({ required: !0 })),
		integrated: new Z.ArrayField(new d()),
		tags: new Z.ArrayField(new h())
	}),
	...template_universal_item(),
	...template_licensed()
}), FrameModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/mech.svg";
	}
	static defineSchema() {
		return defineFrameSchema();
	}
	static migrateData(e) {
		return e.source && (e.manufacturer = migrateManufacturer(e.source)), e.stats?.size !== void 0 && (e.stats.size >= 1 ? e.stats.size = Math.floor(e.stats.size) : e.stats.size = .5), super.migrateData(e);
	}
};
function unpackFrame(e, t) {
	let n = e.core_system, r = fe(e.name), i = repairActivationType(n.activation ?? v.Quick), { deployables: a, tags: o } = addDeployableTags(n.deployables, n.tags, t);
	return {
		name: e.name,
		type: k.FRAME,
		img: r ?? void 0,
		system: {
			core_system: {
				activation: i,
				active_actions: n.active_actions?.map(unpackAction),
				active_bonuses: n.active_bonuses?.map(unpackBonus),
				active_effect: n.active_effect,
				active_name: n.active_name,
				active_synergies: n.active_synergies?.map(unpackSynergy),
				counters: n.counters?.map(unpackCounter),
				deactivation: n.deactivation,
				deployables: a,
				description: n.description,
				integrated: n.integrated,
				name: n.name,
				passive_actions: n.passive_actions?.map(unpackAction),
				passive_bonuses: n.passive_bonuses?.map(unpackBonus),
				passive_effect: n.passive_effect,
				passive_name: n.passive_name,
				passive_synergies: n.passive_synergies?.map(unpackSynergy),
				tags: o,
				use: c(w, w.Unknown, n.use)
			},
			description: e.description,
			license: e.license_id || e.id,
			license_level: e.license_level ?? 2,
			lid: e.id,
			manufacturer: e.source,
			mechtype: e.mechtype?.map((e) => c(y, y.Striker, e)),
			mounts: e.mounts,
			stats: e.stats,
			traits: e.traits?.map((e) => ({
				actions: e.actions?.map(unpackAction) ?? [],
				bonuses: e.bonuses?.map(unpackBonus) ?? [],
				counters: e.counters?.map(unpackCounter) ?? [],
				deployables: e.deployables?.map((e) => unpackDeployable(e, t)) ?? [],
				description: e.description,
				integrated: e.integrated ?? [],
				name: e.name,
				synergies: e.synergies?.map(unpackSynergy) ?? [],
				use: c(w, w.Unknown, e.use)
			}))
		}
	};
}
//#endregion
//#region src/module/models/items/npc_class.ts
var Q = foundry.data.fields, defineNpcClassModelSchema = () => ({
	role: new Q.StringField(),
	flavor: new Q.HTMLField(),
	tactics: new Q.HTMLField(),
	base_features: new Q.SetField(new d()),
	optional_features: new Q.SetField(new d()),
	base_stats: new Q.ArrayField(new ne({ nullable: !1 }), {
		min: 3,
		max: 3,
		initial: [
			{},
			{},
			{}
		]
	}),
	...template_universal_item()
}), NpcClassModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/npc_class.svg";
	}
	static defineSchema() {
		return defineNpcClassModelSchema();
	}
	static migrateData(e) {
		if (e.flavor ??= e.info?.flavor, e.tactics ??= e.info?.tactics, e.base_features = e.base_features?.map((e) => g(e)).filter((e) => e), e.optional_features = e.optional_features?.map((e) => g(e)).filter((e) => e), typeof e.base_stats == "object" && !Array.isArray(e.base_stats) && (e.base_stats = t(e.base_stats)), e.base_stats) for (let t = 0; t < e.base_stats.length; t++) e.base_stats[t].size !== void 0 && (e.base_stats[t].size >= 1 ? e.base_stats[t].size = Math.floor(e.base_stats[t].size) : e.base_stats[t].size = .5);
		return super.migrateData(e);
	}
};
function unpackNpcClass(e, n) {
	let r = fe(e.name.replace(/ \[K\]$/, ""));
	return {
		name: e.name,
		type: k.NPC_CLASS,
		img: r ?? void 0,
		system: {
			lid: e.id,
			role: e.role,
			flavor: e.info.flavor,
			tactics: e.info.tactics,
			base_features: e.base_features,
			optional_features: e.optional_features,
			base_stats: t(e.stats)
		}
	};
}
//#endregion
//#region src/module/models/items/npc_template.ts
var we = foundry.data.fields, defineNpcTemplateModelSchema = () => ({
	description: new we.HTMLField(),
	base_features: new we.SetField(new d()),
	optional_features: new we.SetField(new d()),
	...template_universal_item()
}), NpcTemplateModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/npc_template.svg";
	}
	static defineSchema() {
		return defineNpcTemplateModelSchema();
	}
	static migrateData(e) {
		return e.base_features = e.base_features?.map((e) => g(e)).filter((e) => e), e.optional_features = e.optional_features?.map((e) => g(e)).filter((e) => e), super.migrateData(e);
	}
};
function unpackNpcTemplate(e, t) {
	return {
		name: e.name,
		type: k.NPC_TEMPLATE,
		system: {
			lid: e.id,
			description: e.description,
			base_features: e.base_features,
			optional_features: e.optional_features
		}
	};
}
//#endregion
//#region src/module/models/items/npc_feature.ts
var $ = foundry.data.fields, defineNpcFeatureModelSchema = () => ({
	effect: new $.HTMLField(),
	bonus: new ne({ nullable: !0 }),
	override: new ne({ nullable: !0 }),
	tags: new $.ArrayField(new h()),
	type: new $.StringField({
		choices: Object.values(O),
		initial: O.Trait
	}),
	charged: new $.BooleanField(),
	loaded: new $.BooleanField(),
	tier_override: new $.NumberField({
		integer: !0,
		min: 0,
		max: 3
	}),
	weapon_type: new $.StringField(),
	damage: new $.ArrayField(new $.ArrayField(new n())),
	range: new $.ArrayField(new _()),
	on_hit: new $.HTMLField(),
	accuracy: new $.ArrayField(new $.NumberField({
		integer: !0,
		initial: 0
	}), {
		min: 3,
		max: 3,
		initial: [
			0,
			0,
			0
		]
	}),
	attack_bonus: new $.ArrayField(new $.NumberField({
		integer: !0,
		initial: 0
	}), {
		min: 3,
		max: 3,
		initial: [
			0,
			0,
			0
		]
	}),
	trigger: new $.StringField(),
	tech_type: new $.StringField({
		choices: Object.values(b),
		initial: b.Quick
	}),
	tech_attack: new $.BooleanField({
		nullable: !0,
		initial: null
	}),
	origin: new $.SchemaField({
		type: new $.StringField(),
		name: new $.StringField(),
		base: new $.BooleanField()
	}),
	...template_destructible(),
	...template_uses(),
	...template_universal_item()
}), NpcFeatureModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/npc_feature.svg";
	}
	static getDefaultArtwork(e) {
		let t = this.DEFAULT_ICON;
		switch (e?.system?.type) {
			case O.Reaction:
				t = "systems/lancer/assets/icons/reaction.svg";
				break;
			case O.System:
				t = "systems/lancer/assets/icons/system.svg";
				break;
			case O.Tech:
				t = "systems/lancer/assets/icons/tech_full.svg";
				break;
			case O.Trait:
				t = "systems/lancer/assets/icons/trait.svg";
				break;
			case O.Weapon:
				t = "systems/lancer/assets/icons/weapon.svg";
				break;
		}
		return { img: t };
	}
	static defineSchema() {
		return defineNpcFeatureModelSchema();
	}
	static migrateData(e) {
		return e.bonus && typeof e.bonus == "object" && !Array.isArray(e.bonus) && (e.bonus = t(e.bonus)[0]), e.override && typeof e.override == "object" && !Array.isArray(e.override) && (e.override = t(e.override)[0]), e.type && e.type !== O.Tech ? e.tech_attack = !1 : e.tech_attack === null && (e.tech_attack = !!e.attack_bonus || !!e.accuracy), super.migrateData(e);
	}
};
function unpackNpcFeature(e, t) {
	let n = {
		name: e.name,
		type: k.NPC_FEATURE,
		system: {
			lid: e.id,
			effect: e.effect,
			bonus: e.bonus,
			override: e.override,
			tags: (e.tags || []).map(a),
			type: e.type,
			origin: e.origin,
			charged: void 0,
			uses: void 0,
			loaded: void 0,
			destroyed: void 0,
			tier_override: 0
		}
	};
	if (e.type == O.Reaction) {
		let t = n.system;
		t.trigger = e.trigger;
	} else if (e.type != O.System && e.type != O.Trait) {
		if (e.type == O.Tech) {
			let t = n.system;
			t.tech_type = c(b, b.Quick, e.tech_type), t.accuracy = e.accuracy ?? [
				0,
				0,
				0
			], t.attack_bonus = e.attack_bonus ?? [
				0,
				0,
				0
			], t.tech_attack = !!e.attack_bonus || !!e.accuracy;
		} else if (e.type == O.Weapon) {
			let t = n.system;
			t.accuracy = e.accuracy ?? [
				0,
				0,
				0
			], t.attack_bonus = e.attack_bonus ?? [
				0,
				0,
				0
			], t.weapon_type = e.weapon_type, t.on_hit = e.on_hit, t.damage = [];
			let r = 0, i = !1;
			for (; !i;) {
				i = !0;
				let n = [];
				for (let t of e.damage) t.damage.length > r && (n.push(p({
					type: t.type,
					val: t.damage[r]
				})), i = !1);
				i || t.damage.push(n), r += 1;
			}
			t.range = e.range.map(s);
		}
	}
	return n;
}
//#endregion
//#region src/module/models/items/status.ts
var Te = foundry.data.fields, defineStatusModelSchema = () => ({
	effects: new Te.HTMLField(),
	type: new Te.StringField({
		choices: [
			"status",
			"condition",
			"effect"
		],
		initial: "effect"
	}),
	...template_universal_item()
}), StatusModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/reticule.svg";
	}
	static defineSchema() {
		return defineStatusModelSchema();
	}
	static migrateData(e) {
		return e.type &&= e.type.toLowerCase(), super.migrateData(e);
	}
	async _preCreate(...[e, t, n]) {
		if (await super._preCreate(e, t, n) === !1) return !1;
		if (this.parent.parent) return this.parent.parent.toggleStatusEffect(this.lid, { active: !0 }), !1;
	}
};
function generateStunnedEffect({ name: e = "Stunned", description: t = "" }) {
	return {
		name: e,
		description: t,
		changes: [{
			key: "system.evasion",
			mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			priority: null,
			value: "5"
		}]
	};
}
function unpackStatus(e, t) {
	let n = e.id || e.icon.replace("-", "") || e.name.toLowerCase(), r = `systems/lancer/assets/icons/white/${e.type.toLowerCase()}_${n}.svg`, i = Array.isArray(e.effects) ? e.effects.join("<br>") : e.effects, a;
	return n === "stunned" && (a = generateStunnedEffect({
		name: e.name,
		description: i
	})), {
		name: e.name,
		type: k.STATUS,
		img: r,
		effects: a ? [a] : [],
		system: {
			lid: n,
			effects: i,
			terse: e.terse,
			type: oe([
				"status",
				"condition",
				"effect"
			], "effect", e.type)
		}
	};
}
//#endregion
//#region src/module/models/actors/npc.ts
var Ee = foundry.data.fields, De = {
	destroyed: new Ee.BooleanField({ initial: !1 }),
	meltdown_timer: new Ee.NumberField({
		required: !1,
		nullable: !0,
		integer: !0,
		min: 0
	}),
	notes: new Ee.HTMLField(),
	tier: new Ee.NumberField({
		min: 1,
		max: 3,
		initial: 1,
		integer: !0
	}),
	...template_universal_actor(),
	...template_action_tracking(),
	...template_heat(),
	...template_statuses(),
	...template_struss()
}, NpcModel = class extends f {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/npc_class.svg";
	}
	static defineSchema() {
		return De;
	}
};
function generateNpcDataFromClass(e) {
	return {
		name: e.name,
		type: k.NPC,
		img: e.img ?? void 0,
		system: { notes: `Updated via LCP import at ${(/* @__PURE__ */ new Date()).toISOString()}` }
	};
}
//#endregion
//#region src/module/comp-builder.ts
var Oe = u.log_prefix, ke = Object.values(k).filter((e) => ![k.MECH, k.PILOT].includes(e));
async function clearAll(e = !1) {
	await setAllLock(!1, e);
	let t = e ? new Set(Object.values(k).map((e) => `world.${e}`)) : new Set(Object.values(k).map(x));
	for (let e of t) {
		let t = game.packs.get(e);
		if (!t) continue;
		let n = Array.from(t.index.keys());
		await t.documentClass.deleteDocuments(n, { pack: t.collection }), await Folder.deleteDocuments(Array.from(t.folders.keys()), { pack: t.collection });
	}
	await setAllLock(!0, e);
}
async function importCP(e, progress_callback) {
	await setAllLock(!1);
	try {
		progress_callback ||= (e, t) => {};
		let t = 0;
		t += e.data.coreBonuses?.length ?? 0, t += e.data.frames?.length ?? 0, t += e.data.mods?.length ?? 0, t += e.data.npcClasses?.length ?? 0, t += e.data.npcFeatures?.length ?? 0, t += e.data.npcTemplates?.length ?? 0, t += e.data.pilotGear?.length ?? 0, t += e.data.reserves?.length ?? 0, t += e.data.skills?.length ?? 0, t += e.data.statuses?.length ?? 0, t += e.data.systems?.length ?? 0, t += e.data.tags?.length ?? 0, t += e.data.talents?.length ?? 0, t += e.data.bonds?.length ?? 0, t += e.data.weapons?.length ?? 0, t += e.data.npcClasses?.length ?? 0, t += e.data.npcClasses?.reduce((e, t) => e + (t.base_features?.length ?? 0), 0) ?? 0;
		let n = /* @__PURE__ */ new Map();
		for (let e of ke) (await (await _e(e)).getDocuments()).forEach((e) => {
			n.set(e.system.lid || e.name, e);
		});
		let i = 0, progress_hook = (e) => {
			e.pack && !e.parent && (i++, progress_callback(i, t));
		};
		Hooks.on("createItem", progress_hook), Hooks.on("createActor", progress_hook);
		let a = { createdDeployables: [] }, o = e.data.coreBonuses?.map((e) => unpackCoreBonus(e, a)) ?? [], s = e.data.frames?.map((e) => unpackFrame(e, a)) ?? [], c = e.data.mods?.map((e) => unpackWeaponMod(e, a)) ?? [], l = e.data.npcClasses?.map((e) => unpackNpcClass(e, a)) ?? [], ee = l.map((e) => generateNpcDataFromClass(e)) ?? [], d = e.data.npcFeatures?.map((e) => unpackNpcFeature(e, a)) ?? [], f = e.data.npcTemplates?.map((e) => unpackNpcTemplate(e, a)) ?? [], p = e.data.pilotGear?.filter((e) => e.type == "Armor").map((e) => unpackPilotArmor(e, a)) ?? [], te = e.data.pilotGear?.filter((e) => e.type == "Gear").map((e) => unpackPilotGear(e, a)) ?? [], ne = e.data.pilotGear?.filter((e) => e.type == "Weapon").map((e) => unpackPilotWeapon(e, a)) ?? [], re = e.data.reserves?.map((e) => unpackReserve(e, a)) ?? [], m = e.data.skills?.map((e) => unpackSkill(e, a)) ?? [], h = e.data.statuses?.map((e) => unpackStatus(e, a)) ?? [], ie = e.data.systems?.map((e) => unpackMechSystem(e, a)) ?? [], ae = e.data.tags?.map((e) => r(e)) ?? [], oe = e.data.talents?.map((e) => unpackTalent(e, a)) ?? [], g = e.data.bonds?.map((e) => unpackBond(e)) ?? [], se = e.data.weapons?.map((e) => unpackMechWeapon(e, a)) ?? [], _ = [], v = (await game.packs.get(x(k.LICENSE))?.getDocuments({ type: k.LICENSE }))?.map((e) => e.system.key) ?? [];
		for (let t of e.data.frames ?? []) {
			let e = t.license_id ?? t.id;
			v.includes(e) || _.push(unpackLicense(t.name, e, t.source, a));
		}
		let createOrUpdateDocs = async (e, t, r) => {
			let i = [], a = [], o = await _e(r), s = [k.NPC, k.STATUS].includes(r) ? void 0 : o.folders.find((e) => e.getFlag(game.system.id, "entrytype") === r) ?? await Folder.create({
				name: game.i18n.localize(`TYPES.${o.metadata.type}.${r}`),
				type: o.metadata.type,
				[`flags.${game.system.id}.entrytype`]: r
			}, { pack: x(r) }), c = [];
			for (let e of t) {
				let t = e.system.lid || e.name, r = n.get(t);
				r ? i.push({
					...e,
					_id: r.id,
					folder: s?.id
				}) : (e.folder = s?.id, a.push(e));
			}
			return c.push(...await e.createDocuments(a, { pack: x(r) })), c.push(...await e.updateDocuments(i, { pack: x(r) })), c;
		};
		await createOrUpdateDocs(CONFIG.Item.documentClass, o, k.CORE_BONUS), await createOrUpdateDocs(CONFIG.Item.documentClass, s, k.FRAME), await createOrUpdateDocs(CONFIG.Item.documentClass, c, k.WEAPON_MOD), await createOrUpdateDocs(CONFIG.Item.documentClass, _, k.LICENSE), await createOrUpdateDocs(CONFIG.Item.documentClass, l, k.NPC_CLASS), await createOrUpdateDocs(CONFIG.Item.documentClass, f, k.NPC_TEMPLATE), await createOrUpdateDocs(CONFIG.Item.documentClass, d, k.NPC_FEATURE), await createOrUpdateDocs(CONFIG.Item.documentClass, p, k.PILOT_ARMOR), await createOrUpdateDocs(CONFIG.Item.documentClass, te, k.PILOT_GEAR), await createOrUpdateDocs(CONFIG.Item.documentClass, ne, k.PILOT_WEAPON), await createOrUpdateDocs(CONFIG.Item.documentClass, re, k.RESERVE), await createOrUpdateDocs(CONFIG.Item.documentClass, m, k.SKILL), await createOrUpdateDocs(CONFIG.Item.documentClass, h, k.STATUS), await createOrUpdateDocs(CONFIG.Item.documentClass, ie, k.MECH_SYSTEM), await createOrUpdateDocs(CONFIG.Item.documentClass, oe, k.TALENT), await createOrUpdateDocs(CONFIG.Item.documentClass, g, k.BOND), await createOrUpdateDocs(CONFIG.Item.documentClass, se, k.MECH_WEAPON), await createOrUpdateDocs(CONFIG.Actor.documentClass, a.createdDeployables, k.DEPLOYABLE);
		let ce = await createOrUpdateDocs(CONFIG.Actor.documentClass, ee, k.NPC), le = [];
		for (let e of ce) {
			let t = e.items.find((e) => e.type === k.NPC_CLASS);
			t && (await e.removeClassFeatures(t), await e.deleteEmbeddedDocuments("Item", [t.id]));
			let n = l.find((t) => t.name === e.name)?.system.lid;
			if (!n) continue;
			let r = await pe(n, { source: "compendium" });
			r && (await e.quickOwn(r), le.push(...e.npcClassSwapPromises));
		}
		await Promise.all(le);
		let y = foundry.utils.duplicate(game.settings.get(game.system.id, u.setting_tag_config));
		for (let e of ae) i++, y[e.lid] = e, progress_callback(i, t);
		game.settings.set(game.system.id, u.setting_tag_config, y), Hooks.off("createItem", progress_hook), Hooks.off("createActor", progress_hook);
		for (let e of ke) (await _e(e)).clear();
		progress_callback(i, t);
	} catch (e) {
		console.error(e);
	}
	await setAllLock(!0);
}
async function setAllLock(e = !1, t = !1) {
	let n = t ? new Set(Object.values(k).map((e) => `world.${e}`)) : new Set(Object.values(k).map(x));
	for (let t of n) await game.packs.get(t)?.configure({ locked: e });
}
async function clearCompendiumData(e = { v1: !1 }) {
	ui.notifications.info("Clearing all LANCER Compendium data. Please wait."), console.log(`${Oe} Clearing all LANCER Compendium data.`), await game.settings.set(game.system.id, u.setting_core_data, ""), await game.settings.set(game.system.id, u.setting_lcps, new ue(null)), await clearAll(e.v1), ui.notifications.info("LANCER Compendiums cleared.");
}
//#endregion
export { unpackPilotGear as A, template_struss as B, TalentModel as C, CoreBonusModel as D, unpackSkill as E, template_universal_item as F, L as H, DeployableModel as I, template_action_tracking as L, unpackPilotWeapon as M, PilotArmorModel as N, unpackCoreBonus as O, unpackPilotArmor as P, template_heat as R, unpackBond as S, SkillModel as T, template_universal_actor as V, MechSystemModel as _, generateStunnedEffect as a, unpackLicense as b, NpcClassModel as c, ReserveModel as d, unpackReserve as f, unpackMechWeapon as g, MechWeaponModel as h, StatusModel as i, PilotWeaponModel as j, PilotGearModel as k, FrameModel as l, unpackWeaponMod as m, importCP as n, NpcFeatureModel as o, WeaponModModel as p, NpcModel as r, NpcTemplateModel as s, clearCompendiumData as t, unpackFrame as u, unpackMechSystem as v, unpackTalent as w, BondModel as x, LicenseModel as y, template_statuses as z };

//# sourceMappingURL=comp-builder-BQCDZdOO.mjs.map