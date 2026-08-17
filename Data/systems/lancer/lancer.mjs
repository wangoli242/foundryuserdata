import { r as e } from "./chunk-DAAM-nuR.mjs";
import { $ as t, $r as n, $t as r, A as i, An as a, At as o, B as s, Bn as c, Bt as l, C as u, Cn as d, Cr as f, Ct as p, Dn as m, Dt as h, E as g, En as ee, Et as _, F as te, Fn as ne, Ft as re, G as ie, Gn as ae, Gt as oe, Hn as se, Hr as ce, Ht as le, I as ue, In as de, Ir as fe, It as pe, J as v, Jn as me, Jr as he, Jt as ge, K as _e, Kn as ve, Kr as y, Kt as ye, L as be, Ln as xe, Lt as Se, M as Ce, Mn as b, Mt as we, N as Te, Nn as Ee, Nr as x, Nt as De, On as Oe, Ot as ke, P as Ae, Pn as je, Pt as S, Q as Me, Qn as Ne, Qt as Pe, R as Fe, Rn as C, Rt as Ie, S as Le, Sn as Re, Sr as ze, St as Be, T as Ve, Tn as He, Tt as Ue, U as We, Ur as Ge, Ut as Ke, Vn as qe, Vt as Je, W as Ye, Wn as Xe, Wt as Ze, X as Qe, Xn as w, Xr as $e, Xt as et, Y as tt, Yn as nt, Yr as T, Yt as rt, Z as it, Zn as at, Zt as ot, _ as st, _n as ct, _r as lt, _t as ut, a as dt, an as ft, b as pt, bn as mt, br as ht, bt as gt, c as E, cn as _t, cr as D, d as vt, di as yt, dn as bt, dr as O, dt as xt, en as k, er as St, et as Ct, f as wt, fi as Tt, fn as Et, fr as Dt, ft as Ot, g as kt, gi as At, gn as jt, gr as A, gt as Mt, h as Nt, hi as Pt, hn as Ft, ht as It, i as Lt, in as Rt, it as zt, j, jn as M, jr as N, jt as Bt, k as Vt, kn as Ht, kr as P, kt as Ut, l as F, li as Wt, ln as Gt, lr as Kt, lt as qt, m as Jt, mi as I, mn as L, mr as Yt, mt as Xt, n as Zt, ni as Qt, nn as $t, nr as en, o as tn, oi as R, on as nn, or as rn, p as an, pn as on, pr as sn, pt as cn, q as ln, qn as un, qr as dn, qt as fn, r as pn, ri as mn, rn as hn, rr as gn, s as _n, si as z, sn as vn, sr as yn, t as B, ti as V, tn as bn, tr as xn, tt as H, u as Sn, ui as Cn, un as wn, ur as Tn, ut as En, v as Dn, vn as On, vr as kn, vt as An, w as jn, wn as Mn, wr as Nn, wt as Pn, x as Fn, xn as In, xr as Ln, xt as Rn, y as zn, yn as Bn, yr as Vn, yt as Hn, z as U, zn as Un, zt as Wn } from "./lancer-actor-DUbnXjU1.mjs";
import { t as Gn } from "./slidinghud-Ci-nXn7_.mjs";
import { A as Kn, B as qn, C as Jn, D as Yn, E as Xn, F as Zn, H as Qn, I as $n, L as er, M as tr, N as nr, O as rr, P as ir, R as ar, S as or, T as sr, V as cr, _ as lr, a as ur, b as dr, c as fr, d as pr, f as mr, g as hr, h as gr, i as _r, j as vr, k as yr, l as br, m as xr, n as Sr, o as Cr, p as wr, r as Tr, s as Er, u as Dr, v as Or, w as kr, x as Ar, y as jr, z as Mr } from "./comp-builder-BQCDZdOO.mjs";
import { n as Nr, t as Pr } from "./_template-CRuDkhEm.mjs";
//#region src/module/apps/action/actor-actions.ts
function actionIcon(e) {
	switch (e) {
		case "quick": return "mdi mdi-hexagon-slice-3";
		case "full": return "mdi mdi-hexagon-slice-6";
		case "reaction": return "cci cci-reaction";
		case "protocol": return "cci cci-protocol";
		case "move": return "mdi mdi-arrow-right-bold-hexagon-outline";
		default: return "cci cci-free-action";
	}
}
var _defaultActionData = (e) => ({
	protocol: !0,
	move: getSpeed(e),
	full: !0,
	quick: !0,
	reaction: !0
}), _endTurnActionData = () => ({
	protocol: !1,
	move: 0,
	full: !1,
	quick: !1,
	reaction: !0
});
function getActions(e) {
	return e.is_mech() || e.is_npc() ? e.system.action_tracker : null;
}
async function updateActions(e, t) {
	await e.update({ "system.action_tracker": t });
}
async function modAction(e, t, n) {
	let r = getActions(e);
	if (r) {
		switch (n) {
			case "move":
				r.move = t ? 0 : getSpeed(e);
				break;
			case "free":
				r.free = !0;
				break;
			case "quick":
				t ? r.full ? r.full = !1 : r.quick = !1 : r.quick = !0;
				break;
			case "full":
				t ? (r.full = !1, r.quick = !1) : (r.full = !0, r.quick = !0);
				break;
			case "protocol":
				r.protocol = !t;
				break;
			case "reaction":
				r.reaction = !t;
				break;
			case void 0: r = t ? _endTurnActionData() : _defaultActionData(e);
		}
		t && (r.protocol = !1), await updateActions(e, r);
	}
}
async function toggleAction(e, t) {
	let n = getActions(e);
	n && (n[t] ? await modAction(e, !0, t) : await modAction(e, !1, t));
}
function getSpeed(e) {
	return e.system.speed;
}
//#endregion
//#region src/module/apps/action/action-manager.ts
var Fr = class LancerActionManager extends Application {
	static {
		this.DEF_LEFT = 600;
	}
	static {
		this.DEF_TOP = 20;
	}
	constructor(...e) {
		super(...e), this.target = null;
	}
	async init() {
		LancerActionManager.enabled = game.settings.get(game.system.id, y.setting_actionTracker).showHotbar && !game.settings.get("core", "noCanvas"), LancerActionManager.enabled && (this.loadUserPos(), await this.updateControlledToken(), this.render(!0));
	}
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: `systems/${game.system.id}/templates/window/action_manager.hbs`,
			width: 310,
			height: 70,
			left: LancerActionManager.DEF_LEFT,
			top: LancerActionManager.DEF_TOP,
			scale: 1,
			popOut: !1,
			minimizable: !1,
			resizable: !1,
			title: "action-manager"
		});
	}
	getData(e = {}) {
		return {
			position: this.position,
			name: this.target && this.target.name.toLocaleUpperCase(),
			actions: this.getActions(),
			clickable: game.user?.isGM || game.settings.get(game.system.id, y.setting_actionTracker).allowPlayers
		};
	}
	getActions() {
		return this.target ? getActions(this.target) : null;
	}
	async reset() {
		await this.close(), this.render(!0);
	}
	async update(e) {
		LancerActionManager.enabled && (await this.updateControlledToken(), this.render(!0));
	}
	async updateConfig() {
		game.settings.get(game.system.id, y.setting_actionTracker).showHotbar && !game.settings.get("core", "noCanvas") ? (await this.update(), LancerActionManager.enabled = !0) : (this.close(), LancerActionManager.enabled = !1);
	}
	async updateControlledToken() {
		if (!canvas.ready) return;
		let e = canvas.tokens?.controlled?.[0];
		if (e && e.inCombat && e.actor) {
			let t = e.actor;
			if (t.is_mech() || t.is_npc()) {
				this.target = e.actor;
				return;
			}
		}
		this.target = null;
	}
	async resetActions() {
		this.target && (console.log("Resetting " + this.target.name), modAction(this.target, !1));
	}
	activateListeners(e) {
		this.dragElement(e), e.find("#action-manager-reset").on("click", (e) => {
			e.preventDefault(), this.canMod() ? this.resetActions() : console.log(`${game.user?.name} :: Users currently not allowed to reset actions through action manager.`);
		}), e.find("button.action[data-action]").on("click", (e) => {
			if (e.preventDefault(), this.canMod()) {
				let t = e.currentTarget.dataset.action;
				t && this.target && toggleAction(this.target, t);
			} else console.log(`${game.user?.name} :: Users currently not allowed to toggle actions through action manager.`);
		});
	}
	loadUserPos() {
		if (!game.user?.getFlag(game.system.id, "action-manager")?.pos) return;
		let e = game.user.getFlag(game.system.id, "action-manager").pos, t = this.position;
		return new Promise((n) => {
			function loop() {
				let r = document.getElementById("action-manager");
				if (r) {
					let i = e.top < 5 || e.top > window.innerHeight + 5 ? LancerActionManager.DEF_TOP : e.top, a = e.left < 5 || e.left > window.innerWidth + 5 ? LancerActionManager.DEF_LEFT : e.left;
					t.top = i, t.left = a, r.style.top = i + "px", r.style.left = a + "px", n(!0);
				} else setTimeout(loop, 20);
			}
			loop();
		});
	}
	dragElement(e) {
		let t = this.position;
		e.find("#action-manager-drag").on("mousedown", (e) => {
			e.preventDefault(), e ||= window.event;
			let n = $(document.body).find("#action-manager"), r = parseInt(n.css("marginLeft").replace("px", "")), i = parseInt(n.css("marginTop").replace("px", ""));
			dragElement(document.getElementById("action-manager"));
			let a = 0, o = 0, s = 0, c = 0;
			function dragElement(e) {
				e.onmousedown = dragMouseDown;
				function dragMouseDown(e) {
					e ||= window.event, e.preventDefault(), s = e.clientX, c = e.clientY, document.onmouseup = closeDragElement, document.onmousemove = elementDrag;
				}
				function elementDrag(t) {
					t ||= window.event, t.preventDefault(), a = s - t.clientX, o = c - t.clientY, s = t.clientX, c = t.clientY, e.style.top = e.offsetTop - o - i + "px", e.style.left = e.offsetLeft - a - r + "px";
				}
				function closeDragElement() {
					e.onmousedown = null, document.onmouseup = null, document.onmousemove = null;
					let n = e.offsetLeft - a > window.innerWidth ? window.innerWidth : e.offsetLeft - a, r = e.offsetTop - o > window.innerHeight - 20 ? window.innerHeight - 100 : e.offsetTop - o;
					n = n < 8 ? 0 : n - 10, r = r < 8 ? 0 : r - 3, (n != e.offsetLeft - a || r != e.offsetTop - o) && (e.style.top = r + "px", e.style.left = n + "px"), console.log(`Action Manager | CACHING: ${n} || ${r}.`), game.user?.update({ flags: { lancer: { "action-manager": { pos: {
						top: r,
						left: n
					} } } } }), t.top = r, t.left = n;
				}
			}
		});
	}
	canMod() {
		return game.user?.isGM || game.settings.get(game.system.id, y.setting_actionTracker).allowPlayers;
	}
}, InventoryDialog = class extends Dialog {
	constructor(e, t, n = {}) {
		super(t, n), this.actor = e, this.actor = e;
	}
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: `systems/${game.system.id}/templates/window/inventory.hbs`,
			width: 600,
			height: "auto",
			classes: ["lancer", "inventory-editor"]
		});
	}
	async getData() {
		return {
			...await super.getData(),
			categories: this.populate_categories(this.actor)
		};
	}
	render(e, t = {}) {
		return this.actor.apps[this.appId] = this, super.render(e, t);
	}
	async close(e = {}) {
		return delete this.actor.apps[this.appId], super.close(e);
	}
	populate_categories(e) {
		let t = [];
		return e.is_mech() ? t = [
			{
				label: "Frames",
				items: e.items.filter((e) => e.is_frame())
			},
			{
				label: "Weapons",
				items: e.items.filter((e) => e.is_mech_weapon())
			},
			{
				label: "Systems",
				items: e.items.filter((e) => e.is_mech_system())
			},
			{
				label: "Mods",
				items: e.items.filter((e) => e.is_weapon_mod())
			},
			{
				label: "Statuses",
				items: e.items.filter((e) => e.is_status())
			}
		] : e.is_pilot() ? t = [
			{
				label: "Weapons",
				items: e.items.filter((e) => e.is_pilot_weapon())
			},
			{
				label: "Armor",
				items: e.items.filter((e) => e.is_pilot_armor())
			},
			{
				label: "Gear",
				items: e.items.filter((e) => e.is_pilot_gear())
			},
			{
				label: "Talents",
				items: e.items.filter((e) => e.is_talent())
			},
			{
				label: "Skills",
				items: e.items.filter((e) => e.is_skill())
			},
			{
				label: "Licenses",
				items: e.items.filter((e) => e.is_license())
			},
			{
				label: "Core Bonuses",
				items: e.items.filter((e) => e.is_core_bonus())
			},
			{
				label: "Reserves",
				items: e.items.filter((e) => e.is_reserve())
			},
			{
				label: "Organizations",
				items: e.items.filter((e) => e.is_organization())
			},
			{
				label: "Statuses",
				items: e.items.filter((e) => e.is_status())
			}
		] : console.warn("Cannot yet show inventory for " + e.type), t;
	}
	activateListeners(e) {
		super.activateListeners(e), b(e), M(e), Ce(e, this.actor), L(e), S(e, this.actor), $(e).find(".ref.set.click-open").on("click", _t);
	}
	static async show_inventory(e) {
		return new Promise((t, n) => {
			new this(e, {
				title: `${e.name}'s inventory`,
				content: "",
				buttons: {},
				close: () => t(),
				default: ""
			}).render(!0);
		});
	}
};
//#endregion
//#region src/module/flows/talent.ts
y.log_prefix;
function registerTalentSteps(e) {
	e.set("printTalentCard", printTalentCard);
}
var TalentFlow = class extends w {
	static {
		this.steps = ["printTalentCard"];
	}
	constructor(e, t) {
		let n = {
			title: t?.title ?? "",
			rank: t?.rank ?? {
				name: "",
				description: ""
			},
			lvl: t?.lvl ?? 0
		};
		!n.title && e instanceof H && (n.title = e.name), super(e, n);
	}
};
function printTalentCard(e) {
	return Sn(e, { template: `systems/${game.system.id}/templates/chat/talent-card.hbs` });
}
//#endregion
//#region src/module/flows/item.ts
async function beginItemChatFlow(e, t) {
	if (e.is_skill() || e.is_mech_weapon() || e.is_pilot_weapon()) return await new E(e, {}).begin();
	if (e.is_mech_system()) return await new E(e, { html: Oe(e, null, {
		div: !0,
		vertical: !0,
		nonInteractive: !0
	}) }).begin();
	if (e.is_talent()) {
		let n = t.rank ?? e.system.curr_rank;
		return await new TalentFlow(e, {
			title: e.name,
			rank: e.system.ranks[n],
			lvl: n
		}).begin();
	} else if (e.is_frame()) {
		if (!t.type) throw TypeError("No type provided for frame flow!");
		if (t.type === "trait") {
			if (!t.index) throw TypeError("No index provided for trait flow!");
			let n = e.system.traits[t.index];
			if (!n) throw TypeError(`No trait found at path ${t.path}!`);
			return await new F(e, {
				title: n.name,
				description: n.description
			}).begin();
		}
		if (t.type === "passive") {
			let t = e.system.core_system;
			return await new F(e, {
				title: t.passive_name,
				description: t.passive_effect
			}).begin();
		}
		throw TypeError("Invalid path provided for frame flow!");
	} else if (e.is_pilot_gear()) return await new F(e, {
		title: e.name,
		description: e.system.description,
		tags: e.system.tags
	}).begin();
	else if (e.is_core_bonus()) return await new F(e, {
		title: e.name,
		description: e.system.effect
	}).begin();
	else if (e.is_reserve()) return await new F(e, {
		title: `RESERVE :: ${e.name}`,
		description: (e.system.label ? `<b>${e.system.label}</b></br>` : "") + e.system.description
	}).begin();
	else if (e.is_npc_feature()) return await new F(e, {
		title: e.name,
		description: e.system.effect,
		tags: e.system.tags
	}).begin();
	else return console.log("No macro exists for that item type"), ui.notifications.error(`Error - No macro exists for item type "${e.type}"`), !1;
}
//#endregion
//#region src/module/actor/lancer-actor-sheet.ts
var Ir = y.log_prefix, LancerActorSheet = class extends foundry.appv1.sheets.ActorSheet {
	constructor(...e) {
		super(...e), this.collapse_handler = new a();
	}
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, { scrollY: [".scroll-body"] });
	}
	activateListeners(e) {
		super.activateListeners(e), b(e), M(e), this._activateActionGridListeners(e), on(e), L(e), this.options.editable && (this._activateFlowListeners(e), this._activateFlowDragging(e), pe(e, this.actor), re(e, this.actor), jt(e, this.actor), Et(e, this.actor), Gt(e, this.actor), Se(e, this.actor), S(e, this.actor), this._activateInventoryButton(e), Ft(e, this.actor, (e) => this.quickOwnDrop(e).then((e) => e[0])), Ce(e, this.actor), Te(e, this.actor), c(e, async (e, t, n) => this.onRootDrop(e, n, t), (e, t, n) => this.canRootDrop(e)));
	}
	_activateFlowDragging(e) {
		let FlowDragHandler = (e) => this._onFlowButtonDragStart(e);
		e.find(".lancer-flow-button").add(".roll-stat").add(".roll-attack").add(".roll-tech").add(".roll-damage").add(".chat-flow-button").add(".skill-flow").add(".bond-power-flow").add(".effect-flow").add(".activation-flow").each((e, t) => {
			t.setAttribute("draggable", "true"), t.addEventListener("dragstart", FlowDragHandler, !1);
		});
	}
	_onFlowButtonDragStart(e) {
		if (!e.currentTarget) return;
		e.stopPropagation();
		let t = $(e.currentTarget), n = null;
		if (t.hasClass("lancer-flow-button")) {
			let t = $(e.currentTarget).closest("[data-flow-type]")[0], r = C.BASIC, i = t.dataset.flowType, a = JSON.parse(t.dataset.flowArgs ?? "{}");
			i && (n = {
				lancerType: this.actor.type,
				uuid: this.actor.uuid,
				flowType: r,
				flowSubtype: i,
				args: a
			});
		} else if (t.hasClass("roll-stat")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.path;
			if (!t) throw Error("No stat path found!");
			n = {
				lancerType: this.actor.type,
				uuid: this.actor.uuid,
				flowType: C.STAT,
				args: { statPath: t }
			};
		} else if (t.hasClass("roll-attack") || t.hasClass("roll-damage")) {
			let r = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			if (!r) throw Error("No weapon ID found!");
			n = {
				lancerType: H.fromUuidSync(r, `Invalid weapon ID: ${r}`).type,
				uuid: r,
				flowType: t.hasClass("roll-attack") ? C.ATTACK : C.DAMAGE,
				args: {}
			};
		} else if (t.hasClass("roll-tech")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			if (!t) throw Error("No tech ID found!");
			n = {
				lancerType: H.fromUuidSync(t, `Invalid tech ID: ${t}`).type,
				uuid: t,
				flowType: C.TECH_ATTACK,
				args: {}
			};
		} else if (t.hasClass("chat-flow-button")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0];
			if (!t || !t.dataset.uuid) throw Error("No item UUID found!");
			n = {
				lancerType: H.fromUuidSync(t.dataset.uuid, `Invalid item ID: ${t.dataset.uuid}`).type,
				uuid: t.dataset.uuid,
				flowType: C.CHAT,
				args: { ...t.dataset }
			};
		} else if (t.hasClass("skill-flow")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			if (!t) throw Error("No skill ID found!");
			n = {
				lancerType: H.fromUuidSync(t, `Invalid skill ID: ${t}`).type,
				uuid: t,
				flowType: C.SKILL,
				args: { skillId: t }
			};
		} else if (t.hasClass("bond-power-flow")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0], r = t.dataset.uuid;
			if (!r) throw Error("No bond ID found!");
			let i = H.fromUuidSync(r, `Invalid bond ID: ${r}`), a = parseInt(t.dataset.powerIndex ?? "-1");
			n = {
				lancerType: i.type,
				uuid: r,
				flowType: C.BOND_POWER,
				args: { powerIndex: a }
			};
		} else if (t.hasClass("effect-flow")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			if (!t) throw Error("No item ID found!");
			n = {
				lancerType: H.fromUuidSync(t, `Invalid item ID: ${t}`).type,
				uuid: t,
				flowType: C.EFFECT,
				args: {}
			};
		} else if (t.hasClass("activation-flow")) {
			let t = $(e.currentTarget).closest("[data-uuid]")[0], r = t.dataset.uuid, i = t.dataset.path;
			if (!r || !i) throw Error("No item ID from activation chip");
			let a = i.includes("deployable"), o = !a && i.includes("action"), s = !a && i.includes("core_system"), c = H.fromUuidSync(r, `Invalid item ID: ${r}`);
			if (o) n = {
				lancerType: c.type,
				uuid: r,
				flowType: C.ACTIVATION,
				args: { path: i }
			};
			else if (s) n = {
				lancerType: c.type,
				uuid: r,
				flowType: C.CORE_ACTIVE,
				args: { path: i }
			};
			else if (!a) throw ui.notifications.error("Could not infer action type"), Error("Could not infer action type");
		}
		n && (e.dataTransfer?.setData("text/plain", JSON.stringify(n)), console.log("Flow drag data:", n, e.dataTransfer?.getData("text/plain")));
	}
	async _activateActionGridListeners(e) {
		e.find(".lancer-action-button").on("click", async (e) => {
			if (e.stopPropagation(), game.user?.isGM || game.settings.get(game.system.id, y.setting_actionTracker).allowPlayers) {
				let t = e.currentTarget.dataset, n = t.action, r = await this.getData();
				if (n && t.val) {
					let e;
					e = t.action === "move" ? parseInt(t.val) > 0 : t.val === "true", modAction(r.actor, e, n);
				}
			} else console.log(`${game.user?.name} :: Users currently not allowed to toggle actions through action manager.`);
		});
	}
	_activateFlowListeners(e) {
		e.find(".lancer-flow-button").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-flow-type]")[0], n = t.dataset.flowType, r = JSON.parse(t.dataset.flowArgs ?? "{}"), i = St.BasicFlowType;
			switch (n) {
				case i.FullRepair:
					this.actor.beginFullRepairFlow(r?.title ?? void 0);
					break;
				case i.Stabilize:
					this.actor.beginStabilizeFlow(r?.title ?? void 0);
					break;
				case i.Overheat:
					this.actor.beginOverheatFlow();
					break;
				case i.Structure:
					this.actor.beginStructureFlow();
					break;
				case i.Overcharge:
					this.actor.beginOverchargeFlow();
					break;
				case i.Burn:
					this.actor.beginBurnFlow();
					break;
				case i.BasicAttack:
					this.actor.beginBasicAttackFlow(r?.title ?? void 0);
					break;
				case i.Damage:
					this.actor.beginDamageFlow(r?.title ?? void 0);
					break;
				case i.TechAttack:
					this.actor.beginBasicTechAttackFlow(r?.title ?? void 0);
					break;
				case i.Scan:
					let e = game.user.targets.first();
					this.actor.beginScanFlow(e);
			}
		}), e.find(".roll-stat").on("click", (e) => {
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.path;
			if (!t) throw Error("No stat path found!");
			this.actor.beginStatFlow(t);
		}), e.find(".roll-attack").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			H.fromUuidSync(t ?? "", `Invalid weapon ID: ${t}`).beginWeaponAttackFlow();
		}), e.find(".roll-tech").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			H.fromUuidSync(t ?? "", `Invalid weapon ID: ${t}`).beginTechAttackFlow();
		}), e.find(".roll-damage").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			H.fromUuidSync(t ?? "", `Invalid item ID: ${t}`).beginDamageFlow();
		}), e.find(".chat-flow-button").on("click", async (e) => {
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0];
			if (!t || !t.dataset.uuid) throw Error("No item UUID found!");
			let n = await H.fromUuid(t.dataset.uuid);
			if (!n) throw Error(`UUID "${t.dataset.uuid}" does not resolve to an item!`);
			beginItemChatFlow(n, t.dataset);
		}), e.find(".skill-flow").on("click", (e) => {
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid;
			H.fromUuidSync(t ?? "", `Invalid skill ID: ${t}`).beginSkillFlow();
		}), e.find(".bond-power-flow").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = $(e.currentTarget).closest("[data-uuid]")[0], n = t.dataset.uuid, r = H.fromUuidSync(n ?? "", `Invalid bond ID: ${n}`), i = parseInt(t.dataset.powerIndex ?? "-1");
			r.beginBondPowerFlow(i);
		}), e.find(".bond-xp-button").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = this.actor;
			!t.is_pilot() || !t.system.bond || t.tallyBondXP();
		}), e.find(".refresh-powers-button").on("click", (e) => {
			if (!e.currentTarget) return;
			e.stopPropagation();
			let t = this.actor;
			!t.is_pilot() || !t.system.bond || t.system.bond.refreshPowers();
		}), e.find(".effect-flow").on("click", (e) => {
			e.stopPropagation();
			let t = e.currentTarget.closest("[data-uuid]").dataset.uuid;
			H.fromUuidSync(t ?? "", `Invalid item ID: ${t}`).beginSystemFlow();
		}), e.find(".activation-flow").on("click", (e) => {
			e.stopPropagation();
			let t = e.currentTarget, n = t.dataset.uuid, r = t.dataset.path;
			if (!n || !r) throw Error("No item ID from activation chip");
			let i = r.includes("deployable"), a = !i && r.includes("action"), o = !i && r.includes("core_system"), s = H.fromUuidSync(n ?? "", `Invalid item ID: ${n}`);
			a ? s.beginActivationFlow(r) : o ? s.beginCoreActiveFlow(r) : i || ui.notifications.error("Could not infer action type");
		}), e.find(".charge-macro").on("click", (e) => {
			e.stopPropagation(), this.actor.beginRechargeFlow();
		});
	}
	_activateInventoryButton(e) {
		e.find(".inventory button").on("click", async (e) => (e.preventDefault(), InventoryDialog.show_inventory(this.actor)));
	}
	canRootDrop(e) {
		return !1;
	}
	async onRootDrop(e, t, n) {}
	_createDragDropHandlers() {
		return [];
	}
	async quickOwn(e) {
		return this.actor.quickOwn(e);
	}
	async quickOwnDrop(e) {
		if (e.type == "Item") {
			let [t, n] = await this.quickOwn(e.document);
			return [{
				type: "Item",
				document: t
			}, n];
		} else return [e, !1];
	}
	_propagateData(e) {
		let t = this.actor.prototypeToken;
		t ? (this.actor.img === t.texture.src && this.actor.img !== e.img && (e["prototypeToken.texture.src"] = e.img), this.actor.name === t.name && this.actor.name !== e.name && (e["prototypeToken.name"] = e.name)) : (e["prototypeToken.texture.src"] = e.img, e["prototypeToken.name"] = e.name);
	}
	async _updateObject(e, t) {
		return this._propagateData(t), await this.actor.update(t), this.actor;
	}
	async getData() {
		let e = await super.getData();
		if (e.collapse = {}, e.system = this.actor.system, e.system.loadout) for (let [t, n] of Object.entries(e.system.loadout)) Array.isArray(n) && (e.system.loadout[t] = n.sort((e, t) => e?.value?.sort - t?.value?.sort));
		e.itemTypes = this.actor.itemTypes;
		for (let [t, n] of Object.entries(e.itemTypes)) e.itemTypes[t] = n.sort((e, t) => e.sort - t.sort);
		return e.effect_categories = D.prepareActiveEffectCategories(this.actor), e.deployables = Yt(this.actor), console.log(`${Ir} Rendering with following actor ctx: `, e), e;
	}
}, LancerDeployableSheet = class extends LancerActorSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: [
				"lancer",
				"sheet",
				"actor",
				"deployable"
			],
			template: `systems/${game.system.id}/templates/actor/deployable.hbs`,
			width: 800,
			height: 800,
			tabs: [{
				navSelector: ".lancer-tabs",
				contentSelector: ".sheet-body",
				initial: "status"
			}]
		});
	}
	canRootDrop(e) {
		return e.type === "Actor" && [
			V.PILOT,
			V.MECH,
			V.NPC
		].includes(e.document.type) || e.type === "Item" && e.document.is_status();
	}
	async onRootDrop(e, t, n) {
		e.type == "Actor" && e.document != this.actor && this.actor.update({ "system.owner": e.document.uuid });
	}
	activateListeners(e) {
		super.activateListeners(e), this.options.editable;
	}
}, LancerMechSheet = class extends LancerActorSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: [
				"lancer",
				"sheet",
				"actor",
				"mech"
			],
			template: `systems/${game.system.id}/templates/actor/mech.hbs`,
			width: 900,
			height: 800,
			tabs: [{
				navSelector: ".lancer-tabs",
				contentSelector: ".sheet-body",
				initial: "stats"
			}]
		});
	}
	activateListeners(e) {
		super.activateListeners(e), this.options.editable && (this._activateOverchargeControls(e), this._activateLoadoutControls(e), this._activateMountContextMenus(e));
	}
	canRootDrop(e) {
		return e.type == "Actor" && e.document.is_pilot() ? !0 : e.type === "Item" ? e.document.is_mech_system() || e.document.is_mech_weapon() || e.document.is_frame() || e.document.is_status() : !1;
	}
	async onRootDrop(e, t, n) {
		let [r, i] = await this.quickOwnDrop(e);
		if (r.type == "Item" && r.document.is_frame() && this.actor.is_mech()) {
			let e = this.actor.items.find((e) => e.is_frame() && e.id != r.document.id);
			e && await this.actor.deleteEmbeddedDocuments("Item", [e.id]), await this.actor.swapFrameImage(r.document), await this.actor.updateTokenSize(r.document), await this.actor.update({ "system.loadout.frame": r.document.id }), await this.actor.loadoutHelper.resetMounts();
		} else if (i && r.type == "Item" && r.document.is_mech_weapon()) {
			let e = foundry.utils.duplicate(this.actor.system._source.loadout.weapon_mounts), t = !1;
			for (let n of e) {
				if (t) break;
				for (let e = 0; e < n.slots.length; e++) if (!n.slots[e].weapon) {
					n.slots[e].weapon = r.document.id, t = !0;
					break;
				}
			}
			await this.actor.update({ "system.loadout.weapon_mounts": e });
		} else if (i && r.type == "Item" && r.document.is_mech_system()) {
			let e = this.actor.system._source.loadout.systems;
			await this.actor.update({ "system.loadout.systems": [...e, r.document.id] });
		} else r.type == "Actor" && r.document.is_pilot() && (await this.actor.update({ "system.pilot": r.document.uuid }), await r.document.update({ "system.active_mech": this.actor.uuid }));
		this.isEditable && !i && r.type === "Item" && r.document.is_mech_system() && this._onSortItem(t, r.document.toObject());
	}
	_activateOverchargeControls(e) {
		e.find(".overcharge-text").on("click", (e) => {
			this.actor.is_mech() && this._setOverchargeLevel(e, Math.min(this.actor.system.overcharge + 1, 3));
		}), e.find(".overcharge-reset").on("click", (e) => {
			this._setOverchargeLevel(e, 0);
		});
	}
	async _setOverchargeLevel(e, t) {
		return this.actor.update({ "system.overcharge": t });
	}
	_activateLoadoutControls(e) {
		e.find(".reset-weapon-mount-button").on("click", async (e) => {
			this._event_handler("reset-wep", e);
		}), e.find(".reset-all-weapon-mounts-button").on("click", async (e) => {
			this._event_handler("reset-all-weapon-mounts", e);
		}), e.find(".reset-system-mount-button").on("click", async (e) => {
			this._event_handler("reset-sys", e);
		});
	}
	_activateMountContextMenus(e) {
		let t = [];
		for (let e of Object.values(R)) t.push({
			name: e,
			icon: "",
			callback: async (t) => {
				let n = t[0].dataset.path ?? "", r = U(this.actor, n);
				r || console.error("Bad mountpath:", n);
				let i = [], a = At(e);
				i = i.splice(a.length);
				for (let e = 0; e < a.length; e++) r.slots[e]?.weapon?.value ? i.push({
					mod: r.slots[e].mod?.value?.id ?? null,
					size: a[e],
					weapon: r.slots[e].weapon?.value?.id ?? null
				}) : i.push({
					mod: null,
					size: a[e],
					weapon: null
				});
				this.actor.update({
					[n + ".type"]: e,
					[n + ".bracing"]: !1,
					[n + ".slots"]: i
				});
			}
		});
		t.push({
			name: "Superheavy Bracing",
			icon: "",
			callback: async (e) => {
				let t = await this.getData(), n = e[0].dataset.path ?? "";
				U(t, n) || console.error("Bad mountpath:", n), this.actor.update({
					[n + ".type"]: R.Unknown,
					[n + ".bracing"]: !0,
					[n + ".slots"]: []
				});
			}
		}), new foundry.applications.ux.ContextMenu.implementation(e, ".mount-type-ctx-root", t);
	}
	async _event_handler(e, t) {
		t.stopPropagation(), this.actor;
		let n = t.currentTarget?.dataset?.path;
		switch (e) {
			case "reset-all-weapon-mounts":
				await this.actor.loadoutHelper.resetMounts();
				break;
			case "reset-sys":
				this.actor.update({ "system.loadout.systems": [] });
				break;
			case "reset-wep":
				if (!n) return;
				ui.notifications?.info("TODO: Reset the weapons");
				break;
			default: return;
		}
	}
	async getData() {
		let e = await super.getData();
		return e.pilot = this.actor.system.pilot?.value, e.is_active = this.actor.system.pilot?.value?.system.active_mech?.value == this.actor, e;
	}
};
//#endregion
//#region src/module/actor/npc-sheet.ts
y.log_prefix;
var LancerNPCSheet = class extends LancerActorSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: [
				"lancer",
				"sheet",
				"actor",
				"npc"
			],
			template: `systems/${game.system.id}/templates/actor/npc.hbs`,
			width: 800,
			height: 800,
			tabs: [{
				navSelector: ".lancer-tabs",
				contentSelector: ".sheet-body",
				initial: "mech"
			}]
		});
	}
	activateListeners(e) {
		super.activateListeners(e), this.options.editable && this.actor.isOwner && (e.find(".item-macro").on("click", (e) => {
			e.stopPropagation(), $(e.currentTarget).closest("[data-uuid]")[0];
		}), e.find(".roll-tech").on("click", (e) => {
			e.currentTarget && (e.stopPropagation(), $(e.currentTarget).closest("[data-uuid]")[0].dataset.uuid);
		}), e.find("li[class*=\"item\"]").add("span[class*=\"item\"]").each((e, t) => {
			t.classList.contains("inventory-header") || (t.classList.contains("roll-stat") && t.addEventListener("dragstart", this._onDragMacroableStart, !1), t.classList.contains("item") && t.addEventListener("dragstart", (e) => this._onDragStart(e), !1), t.setAttribute("draggable", "true"));
		}));
	}
	_onDragMacroableStart(e) {
		e.stopPropagation();
		let t = getStatInput(e);
		if (!t) return ui.notifications.error("Error finding stat input for macro.");
		let n = t.id.split("."), r = {
			title: n[n.length - 1].toUpperCase(),
			dataPath: t.id,
			type: "actor",
			actorId: this.actor.id
		};
		e.dataTransfer?.setData("text/plain", JSON.stringify(r));
	}
	canRootDrop(e) {
		return e.type === "Item" && (e.document.is_npc_class() || e.document.is_npc_feature() || e.document.is_npc_template() || e.document.is_status());
	}
	async onRootDrop(e, t, n) {
		if (!this.actor.is_npc()) return;
		let [r, i] = await this.quickOwnDrop(e), a = i && r.type == "Item" && (r.document.is_npc_class() || r.document.is_npc_template());
		if (i && r.type == "Item") {
			let e = r.document;
			e.is_npc_class() && (await this.actor.swapFrameImage(e), await this.actor.updateTokenSize(e));
		}
		a && await this.actor.update({
			"system.hp.value": this.actor.system.hp.max,
			"system.stress.value": this.actor.system.stress.max,
			"system.structure.value": this.actor.system.structure.max
		}), this.isEditable && !i && r.type === "Item" && r.document.is_npc_feature() && this._onSortItem(t, r.document.toObject());
	}
};
function getStatInput(e) {
	return e.currentTarget ? $(e.currentTarget).closest(".stat-container").find(".lancer-stat")[0] : null;
}
//#endregion
//#region src/module/util/compcon.ts
var Lr = "fcFvjjrnQy2hypelJQi4X9dRI55r5KuI4bC07Maf", Rr = "https://api.compcon.app", zr = "https://ds69h3g1zxwgy.cloudfront.net";
async function fetchV2PilotViaShareCode(e) {
	let t = await (await fetch(`${Rr}/share?code=${e}`, { headers: { "x-api-key": Lr } })).json();
	return await (await fetch(t.presigned)).json();
}
async function fetchV3PilotViaShareCodes(e) {
	let t = (await (await fetch(`${Rr}/v3/code?codes=${JSON.stringify(e)}&scope=items`, { headers: { "x-api-key": Lr } })).json()).map((e) => e.uri);
	return Promise.all(t.map((e) => fetch(`${zr}/${e}`).then((e) => e.json())));
}
async function fetchV3PilotViaShareCode(e) {
	return (await fetchV3PilotViaShareCodes([e]))[0];
}
//#endregion
//#region src/module/helpers/actor.ts
function _flowButton(e, t, n = {}) {
	let r = n.tooltip ? `data-tooltip="${n.tooltip}"` : "";
	return `<a class="${e} lancer-button ${n.classes ?? ""}" ${t} ${r}>
    <i class="fas ${n.icon ?? "fa-dice-d20"} i--dark i--2"></i>
  </a>`;
}
function _statFlowButton(e, t, n = {}) {
	return _flowButton("roll-stat", `data-uuid="${e}" data-path="${t}" data-flow-args=""`, n);
}
function _basicFlowButton(e, t = "BasicAttack", n = {}) {
	return _flowButton("lancer-flow-button", `data-uuid="${e}" data-flow-type="${t}"`, n);
}
function getActorUUID(e) {
	return e.data.root.actor?.uuid ?? null;
}
function stat_edit_card_max(e, t, n, r, i) {
	let a = s(i, n, 0), o = s(i, r, 0);
	return `
    <div class="stat-card card clipped">
      <div class="lancer-header lancer-primary ">
        <i class="${t} i--4 i--light header-icon"> </i>
        <span class="major">${game.i18n.localize(`lancer.common-sheet.shortStats.${e}`)}</span>
      </div>
      ${it(n, a, o, "lancer-stat")}
    </div>
    `;
}
function stat_edit_card(e, t, n, r) {
	let i = "";
	return r.rollable && n === "system.burn" && (i = _basicFlowButton(getActorUUID(r), "Burn", {
		icon: "cci cci-burn",
		tooltip: "Roll a burn check and generate damage"
	})), `
    <div class="card clipped">
      <div class="lancer-header lancer-primary ">
        <i class="${t} i--4 i--light header-icon"> </i>
        <span class="major">${game.i18n.localize(`lancer.common-sheet.shortStats.${e}`)}</span>
      </div>
      <div class="${i ? "stat-flow-container" : "flexrow flex-center"}">
        ${i}
        ${v(n, j(r, { classes: "lancer-stat" }))}
      </div>
    </div>
    `;
}
function stat_edit_rollable_card(e, t, n, r) {
	return stat_edit_card(e, t, n, {
		...r,
		rollable: !0
	});
}
function stat_view_card(e, t, n, r) {
	let i = s(r, n), a = "", o = "";
	r.rollable && (a = _statFlowButton(getActorUUID(r), n), (n === "system.grit" || n === "system.tier") && (o = _basicFlowButton(getActorUUID(r), "BasicAttack", {
		icon: "cci cci-weapon",
		tooltip: "Roll a basic attack"
	})));
	let c = game.i18n.localize(`lancer.common-sheet.shortStats.${e}`);
	return `
    <div class="stat-card card clipped">
      <div class="lancer-header lancer-primary ">
        ${te(`<i class="${t} i--4 i--light header-icon"> </i>`, t)}
        <span class="major">${c}</span>
      </div>
      <div class="${a || o ? "stat-flow-container" : "flexrow flex-center"}">
        ${a}
        <span class="lancer-stat major" data-path="${n}">${i}</span>
        ${o}
      </div>
    </div>
    `;
}
function stat_rollable_card(e, t, n, r) {
	return stat_view_card(e, t, n, {
		...r,
		rollable: !0
	});
}
function compact_stat_view(e, t, n) {
	return `
    <div class="compact-stat">
        <i class="${e} i--4 i--dark"></i>
        <span class="lancer-stat minor">${s(n, t)}</span>
    </div>
    `;
}
function compact_stat_edit(e, t, n, r) {
	s(r, t);
	let i = "";
	return n && (i = `<span class="lancer-stat minor" style="max-width: min-content;" > / </span>
    <span class="lancer-stat minor">${s(r, n)}</span>`), `
        <div class="compact-stat">
          <i class="${e} i--4 i--dark"></i>
          ${v(t, j(r, { classes: "lancer-stat minor" }))}
          ${i}
        </div>
    `;
}
function clicker_num_input(e, t) {
	return `<div class="flexrow arrow-input-container">
      <button class="clicker-minus-button input-update" type="button">‒</button>
      ${v(e, j(t, {
		classes: "lancer-stat minor",
		default: 0
	}))}
      <button class="clicker-plus-button input-update" type="button">+</button>
    </div>`;
}
function clicker_stat_card(e, t, n, r, i) {
	let a = getActorUUID(i) ?? "unknown", o = "", s = "<div></div>";
	return r && (o = `<a class="roll-stat lancer-button" data-uuid="${a}" data-path="${n}"><i class="fas fa-dice-d20 i--dark i--2"></i></a>`, (n === "system.grit" || n === "system.tier") && (s = _basicFlowButton(a, "BasicAttack", { icon: "cci cci-weapon" }))), `<div class="card clipped stat-container">
      <div class="lancer-header lancer-primary ">
        <i class="${t} i--4 i--light header-icon"> </i>
        <span class="major">${game.i18n.localize(`lancer.common-sheet.shortStats.${e}`)}</span>
      </div>
      <div class="flexrow">
        ${o}
        ${clicker_num_input(n, i)}
        ${s}
      </div>
    </div>
  `;
}
function bond_answer_selector(e, t) {
	let n = e.system.bond, r = e.system.bond_state.answers[t];
	if (!n || t > n.system.questions.length - 1) return "";
	let i = "";
	return n.system.questions[t].options.forEach((e) => {
		i += `<option value="${e}" ${r === e ? "selected" : ""}>${e}</option>\n`;
	}), `<select class="bond-question-select" name="system.bond_state.answers.${t}" data-type="String">
    ${i}
  </select>`;
}
function bond_minor_ideal_selector(e) {
	let t = e.system.bond, n = e.system.bond_state.minor_ideal, r = "";
	return t?.system.minor_ideals.forEach((e) => {
		r += `<option value="${e}" ${n === e ? "selected" : ""}>${e}</option>\n`;
	}), `<select class="bond-ideal-select" name="system.bond_state.minor_ideal" data-type="String">
    ${r}
  </select>`;
}
function action_button(e, t, n, r) {
	let i = s(r, t), a;
	n == "move" ? (a = i > 0, e = `${e} (${i})`) : a = i;
	let o = !1;
	(game.user?.isGM || game.settings.get(game.system.id, y.setting_actionTracker).allowPlayers) && (o = !0);
	let c = `<i class="${actionIcon(n)} i--4"></i>`;
	return `
    <button
      class="lancer-action-button lancer-button${o ? " enabled" : ""}${a ? ` active lancer-${n}` : ""}"
      data-action="${n}"
      data-val="${i}"
  >
    ${c}
    ${e}
  </button>`;
}
function actor_flow_button(e, t, n) {
	let r = JSON.stringify({}), i, a = St.BasicFlowType;
	switch (t) {
		case a.FullRepair:
			i = "cci-repair";
			break;
		case a.Stabilize:
			i = "cci-marker";
			break;
		case a.Overheat:
			i = "cci-heat";
			break;
		case a.Structure:
			i = "cci-condition-shredded";
			break;
		case a.BasicAttack:
			i = "cci-weapon";
			break;
		case a.Damage:
			i = "cci-large-beam";
			break;
		case a.TechAttack:
			i = "cci-tech-quick";
			break;
		case a.Scan:
			i = "cci cci-sensor";
			break;
	}
	return `
      <button type="button" class="lancer-flow-button lancer-button lancer-secondary" data-flow-type="${t}" data-flow-args=${r}>
        <i class="cci ${i} i--4"></i> ${e}
      </button>
    `;
}
function tech_flow_card(e, t, n, r) {
	let i = getActorUUID(r) ?? "unknown", a = s(r, n), o = game.i18n.localize(`lancer.common-sheet.shortStats.${e}`);
	return `
    <div class="stat-card card clipped">
      <div class="lancer-header lancer-primary">
        ${te(`<i class="${t} i--4 i--light header-icon"> </i>`, t)}
        <span class="major">${o}</span>
      </div>
      <div class="stat-flow-container">
        ${_basicFlowButton(i, "TechAttack", { icon: "cci cci-tech-quick" })}
        <span class="lancer-stat major" data-path="${n}">${a}</span>
      </div>
    </div>
    `;
}
function npc_stat_block_clicker_card(e, t, n, r) {
	let i = s(r, t) ?? [], a = [];
	for (let e = 1; e <= i.length; e++) a.push(`
      <div class="flexrow stat-container" style="align-self: center;">
        <i class="cci cci-npc-tier-${e} i--4 i--dark"></i>
        ${clicker_num_input(`${t}.${e - 1}.${n}`, r)}
      </div>`);
	return `
    <div class="card clipped">
      <div class="flexrow lancer-header lancer-primary major">
        ${e}
      </div>
      ${a.join("")}
    </div>`;
}
function npc_stat_array_clicker_card(e, t, n) {
	let r = s(n, t) ?? [], i = [];
	for (let e = 1; e <= r.length; e++) i.push(`
      <div class="flexrow stat-container" style="align-self: center;">
        <i class="cci cci-npc-tier-${e} i--4 i--dark"></i>
        ${clicker_num_input(`${t}.${e - 1}`, n)}
      </div>`);
	return `
    <div class="card clipped">
      <div class="flexrow lancer-header major">
        ${e}
      </div>
      ${i.join("")}
    </div>`;
}
function overchargeButton(e, t, n) {
	let r = e.system.overcharge_sequence.split(","), i = s(n, t);
	i = Math.max(0, Math.min(r.length - 1, i));
	let a = r[i], o = _basicFlowButton(e.uuid, "Overcharge");
	return `
    <div class="flexcol card clipped">
      <div class="lancer-header lancer-primary clipped-top flexrow">
        <span class="major">${game.i18n.localize("lancer.common-sheet.shortStats.overcharge")}</span>
      </div>
      <div class="overcharge-container">
        ${o}
        <a class="overcharge-text">${a}</a>
        <a class="overcharge-reset mdi mdi-restore"></a>
      </div>
    </div>`;
}
function npc_tier_selector(e, t) {
	let n = s(t, e) ?? 1;
	return `<select class="tier-control" name="npctier">
    ${[
		1,
		2,
		3
	].map((e) => `
    <option value="${e}" ${ie(e === n)}>TIER ${e}</option>
  `).join("")}
  </select>`;
}
function is_combatant(e) {
	let t = game.combat;
	if (t) return t.combatants.find((t) => t.actor?.uuid == e.uuid);
}
function deployer_slot(e, t) {
	let n = s(t, e, null);
	return n ? `
    <div class="card clipped ${n.type} ref set click-open" ${Re(n)}>
      <div class="compact-deployer medium flexrow" >
        <span class="img-bar" style="background-image: url(${n.img});"> </span>
        <div class="major modifier-name i--light">${n.type.toUpperCase()} ${n.name}</div>
      </div>
    </div>` : He(e, [
		V.PILOT,
		V.MECH,
		V.NPC
	], t);
}
//#endregion
//#region src/module/actor/import.ts
var W = y.log_prefix;
async function updatePilot(e, t, n, r, i) {
	let a = t.cloud_portrait ?? t.img.cloud_portrait, unpackClock = (e) => ({
		lid: e.id,
		name: e.title,
		min: 0,
		max: e.segments,
		value: e.progress,
		default_value: 0
	});
	await e.update({
		name: t.name,
		img: T(e.img, a),
		system: {
			hp: { value: t.stats.current.hp },
			background: t.background,
			callsign: t.callsign,
			cloud_id: t.cloudID,
			history: t.history,
			level: t.level,
			loadout: {
				armor: n ?? [],
				gear: r ?? [],
				weapons: i ?? []
			},
			hull: t.mechSkills[0],
			agi: t.mechSkills[1],
			sys: t.mechSkills[2],
			eng: t.mechSkills[3],
			mounted: t.state?.mounted ?? !0,
			notes: t.notes,
			player_name: t.player_name,
			status: t.status,
			text_appearance: t.text_appearance,
			bond_state: t.bond ? {
				xp: { value: t.xp ?? t.bond.xp },
				stress: { value: t.stress ?? t.bond.stress },
				answers: t.bondAnswers ?? t.bond.bondAnswers,
				minor_ideal: t.minorIdeal ?? t.bond.minorIdeal,
				burdens: (t.burdens ?? t.bond.burdens).map((e) => unpackClock(e)),
				clocks: (t.clocks ?? t.bond.clocks).map((e) => unpackClock(e))
			} : void 0
		},
		prototypeToken: {
			name: t.name,
			texture: { src: T(e.prototypeToken?.texture?.src, a, e.img) }
		}
	});
}
async function updateMech(e, t, n, r, i, a, o) {
	await e.update({
		name: n.name,
		folder: t.folder?.id || null,
		img: T(e.img, n.portrait, k(o?.name ?? n.frameData.name)),
		ownershipLevel: r,
		prototypeToken: {
			name: t.system.callsign || n.name,
			disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
			texture: { src: T(e.prototypeToken?.texture?.src, n.img.cloud_portrait, o ? k(o.name) : null) }
		},
		system: {
			lid: n.id,
			hp: {
				value: n.stats.current.hp,
				max: n.stats.max.hp
			},
			overshield: {
				value: n.stats.current.overshield,
				max: n.stats.max.overshield
			},
			burn: n.stats.current.burn,
			activations: n.stats.current.activations,
			heat: {
				value: n.stats.current.heat,
				max: n.stats.max.heat
			},
			stress: {
				value: n.stats.current.stress,
				max: n.stats.max.stress
			},
			structure: {
				value: n.stats.current.structure,
				max: n.stats.max.structure
			},
			overcharge: n.stats.current.overcharge,
			repairs: {
				value: n.stats.current.repairCapacity,
				max: n.stats.max.repairCapacity
			},
			core_active: n.coreActive,
			core_energy: n.corePower,
			notes: n.notes,
			pilot: t.uuid,
			loadout: {
				frame: o?.id ?? null,
				weapon_mounts: i,
				systems: a
			}
		}
	});
}
async function clearPilotEmbeddedDocuments(e) {
	await e.deleteEmbeddedDocuments("Item", Array.from(e.items.keys()));
	let t = game.actors?.filter((t) => t.is_mech() && t.system.pilot?.value == e) ?? [];
	for (let e of t) await e.deleteEmbeddedDocuments("Item", Array.from(e.items.keys()));
}
function hasCreatePermissions() {
	let e = game.user?.can("ACTOR_CREATE"), t = game.users?.some((e) => e.isGM && e.active);
	return !e && !t ? (new foundry.applications.api.DialogV2({
		window: {
			title: "Cannot Create Actors",
			icon: "fas fa-triangle-exclamation"
		},
		content: "\n        <p>You are not permitted to create actors and no GM's are online, so sync will not produce any new mechs or deployables.</p>\n        <p>Your GM can allow Players/Trusted Players to create actors in Settings->Configure Permissions.</p>\n      ",
		buttons: [{
			action: "close",
			icon: "fas fa-check",
			label: "Close",
			default: !0
		}]
	}).render(!0), !1) : !0;
}
async function promptLoadoutSelection(e) {
	let t = "";
	return e.map((e, n) => {
		t += `<label><input type="radio" name="choice" value=${n} ${n == 0 ? "checked" : ""}>${e}</label>`;
	}), foundry.applications.api.DialogV2.prompt({
		window: {
			title: "Select Pilot Loadout",
			icon: "fas fa-triangle-exclamation"
		},
		content: `
      <span>Multiple pilot loadouts found. Please select a single loadout to import and use:</span>
      ${t}
      <hr>
    `,
		ok: {
			label: "Import Selected Loadout",
			callback: (e, t, n) => (t.form?.elements).choice.value
		}
	});
}
async function getOrCreateActorItemByLid(e, t, n, r) {
	let i = n.findSplice((t) => t.system.lid == e);
	if (i) return i;
	let a = await A(e);
	return a ? (await Dt([a], t))[0] ?? null : (r.push({
		actor: t.name,
		lid: e
	}), null);
}
async function importCC(e, t, n = !0) {
	"originId" in t || "EXPORT_TYPE" in t ? await importCCv3(e, t, n) : await importCCv2(e, t, n);
}
async function importCCv3(e, t, n = !0) {
	if (console.log(`${W} Importing v3 Pilot`, e, t), !e.is_pilot()) {
		console.error(`${W} Actor was not a pilot type`, e);
		return;
	}
	if (!t) {
		console.error(`${W} Imported data is missing`, t);
		return;
	}
	let r = "EXPORT_TYPE" in t ? t.data : t;
	if (!r) {
		console.error(`${W} Tried using CCv3 importer on CCv2 data`, t);
		return;
	}
	n && await clearPilotEmbeddedDocuments(e), hasCreatePermissions();
	try {
		await e.update({
			name: r.name,
			system: { callsign: r.callsign }
		});
		let t = { createdDeployables: [] }, n = [], i = [], a = [], o = [...e.items.contents], s = 0, c = [], l = [], u = [];
		if (r.loadouts) {
			try {
				r.loadouts.length > 1 && (s = Number(await promptLoadoutSelection(r.loadouts.map((e) => e.name))));
			} catch {
				console.log(`${W} User cancelled pilot import`);
				return;
			}
			let n;
			n = (r.loadouts[s].gear ?? []).filter((e) => e);
			for (let r of n) {
				if (!r) continue;
				let n = (await getOrCreateActorItemByLid(r.id, e, o, i))?.id ?? (await e.createEmbeddedDocuments("Item", [{
					...Kn(r.data, t),
					type: V.PILOT_GEAR,
					name: r.data.name
				}]))[0].id;
				c.push(n), a.push({
					_id: n,
					...r.flavorName ? { name: r.flavorName } : {},
					system: { ...r.flavorDescription ? { description: r.flavorDescription } : {} }
				});
			}
			n = (r.loadouts[s].armor ?? []).filter((e) => e);
			for (let r of n) {
				if (!r) continue;
				let n = (await getOrCreateActorItemByLid(r.id, e, o, i))?.id ?? (await e.createEmbeddedDocuments("Item", [{
					...ir(r.data, t),
					type: V.PILOT_ARMOR,
					name: r.data.name
				}]))[0].id;
				l.push(n), a.push({
					_id: n,
					...r.flavorName ? { name: r.flavorName } : {},
					system: { ...r.flavorDescription ? { description: r.flavorDescription } : {} }
				});
			}
			n = (r.loadouts[s].weapons ?? []).filter((e) => e);
			for (let r of n) {
				if (!r) continue;
				let n = (await getOrCreateActorItemByLid(r.id, e, o, i))?.id ?? (await e.createEmbeddedDocuments("Item", [{
					...tr(r.data, t),
					type: V.PILOT_WEAPON,
					name: r.data.name
				}]))[0].id;
				u.push(n), a.push({
					_id: n,
					...r.flavorName ? { name: r.flavorName } : {},
					system: { ...r.flavorDescription ? { description: r.flavorDescription } : {} }
				});
			}
		}
		for (let n of r.core_bonuses) await getOrCreateActorItemByLid(n.id, e, o, i) || await e.createEmbeddedDocuments("Item", [{
			...rr(n, t),
			type: V.CORE_BONUS,
			name: n.name
		}]);
		for (let n of r.skills) if ("custom" in n && n.custom) e.createEmbeddedDocuments("Item", [{
			type: V.SKILL,
			name: n.id ?? "Custom Skill",
			system: {
				rank: n.rank,
				description: n.custom_desc || n.custom_detail || ""
			}
		}]);
		else if ("data" in n) {
			let r = await getOrCreateActorItemByLid(n.id, e, o, i), s = r?.id;
			if (!r) {
				let r = Xn(n.data, t);
				s = (await e.createEmbeddedDocuments("Item", [{
					...r,
					type: V.SKILL,
					name: n.data.name
				}]))[0].id;
			}
			a.push({
				_id: s,
				system: { curr_rank: n.rank ?? 1 }
			});
		}
		for (let n of r.talents) {
			let r = await getOrCreateActorItemByLid(n.id, e, o, i), s = r?.id;
			if (!r) {
				let r = kr(n.data, t);
				s = (await e.createEmbeddedDocuments("Item", [{
					...r,
					type: V.TALENT,
					name: n.data.name
				}]))[0].id;
			}
			a.push({
				_id: s,
				system: { curr_rank: n.rank }
			});
		}
		if (r.bond?.bondId) {
			let t = r.bond, n = await getOrCreateActorItemByLid(t.bondId, e, o, i);
			n ||= (await e.createEmbeddedDocuments("Item", [{
				...or(t.data),
				type: V.BOND,
				name: t.data.name
			}]))[0];
			let collectCompendiumPowers = async () => {
				let e = await game.packs.get(O(V.BOND))?.getDocuments({ type: V.BOND }) ?? [], t = /* @__PURE__ */ new Map();
				for (let n of e) for (let e of n.system.powers) e.name && !t.has(e.name) && t.set(e.name, e);
				return t;
			}, getOrCreatePowers = async (e, t) => {
				if (!e.bond) return;
				let n = await collectCompendiumPowers(), r = /* @__PURE__ */ new Map();
				for (let t of e.bond.bondPowers) r.has(t.name) || r.set(t.name, t);
				let i = [];
				for (let e of t.system.powers) e.name && (i.push({
					...e,
					unlocked: r.has(e.name)
				}), r.delete(e.name));
				for (let [e, t] of r) {
					let r = n.get(e) ?? Xe(t);
					i.push({
						...r,
						unlocked: !0
					});
				}
				return i;
			}, a = await getOrCreatePowers(r, n) ?? [];
			await n.update({ system: { powers: a } });
		}
		for (let n of r.licenses) {
			let r = Qt(V.LICENSE) + n.id, s = await getOrCreateActorItemByLid(r, e, o, i), c = s?.id;
			if (!s) {
				let i = dr(n.stub.name, r, n.stub.source, t);
				c = (await e.createEmbeddedDocuments("Item", [{
					...i,
					type: V.LICENSE,
					name: n.stub.name
				}]))[0].id;
			}
			a.push({
				_id: c,
				system: { curr_rank: n.rank }
			});
		}
		for (let n of r.reserves) await getOrCreateActorItemByLid(n.id, e, o, i) || await e.createEmbeddedDocuments("Item", [{
			...mr(n, t),
			type: V.RESERVE,
			name: n.name
		}]);
		await e.updateEmbeddedDocuments("Item", a);
		let d = o.filter((e) => [
			V.TALENT,
			V.SKILL,
			V.CORE_BONUS
		].includes(e.type));
		await e._safeDeleteDescendant("Item", d), await updatePilot(e, r, l, c, u);
		let f = null, p = foundry.utils.deepClone(e.ownership), createNewMech = async (t) => {
			if (!game.user?.can("ACTOR_CREATE")) ui.notifications.warn(`Could not import mech '${t.name}' as you lack the permission to create new actors. Please ask your GM for assistance (either they import for you, or give you permissions)`, { permanent: !0 }), n.push({
				name: t.name,
				lid: t.frameData.id
			});
			else return await B.create({
				name: t.name,
				type: V.MECH,
				folder: e.folder?.id,
				ownership: p,
				system: { pilot: e.uuid }
			});
		};
		for (let a of r.mechs) {
			let o = game.actors.find((e) => e.is_mech() && e.system.lid == a.id);
			if (!o) {
				let e = await createNewMech(a);
				e && (o = e);
			}
			if (!o.canUserModify(game.user, "update")) {
				ui.notifications.warn(`Could not import mech '${a.name}' as you lack the permission to update the actor. Please ask your GM for assistance.`, { permanent: !0 }), n.push({
					name: a.name,
					lid: a.frameData.id
				});
				continue;
			}
			let s = [...o.items.contents], c = [], l = a.loadouts[a.active_loadout_index], u = [], d = [], m = await getOrCreateActorItemByLid(a.frame, o, s, i);
			m || await o.createEmbeddedDocuments("Item", [{
				...Dr(a.frameData, t),
				type: V.FRAME,
				name: a.frameData.name
			}]);
			let h = [...l.integratedSystems, ...l.systems];
			for (let e of h) {
				let n = await getOrCreateActorItemByLid(e.data.id, o, s, i), r = n?.id;
				if (!n || !r) {
					let n = Or(e.data, t);
					r = (await o.createEmbeddedDocuments("Item", [{
						...n,
						type: V.MECH_SYSTEM,
						name: e.data.name
					}]))[0].id;
				}
				d.push(r), c.push({
					_id: r,
					...e.flavorName ? { name: e.flavorName } : {},
					system: {
						uses: {
							value: Math.max(0, (e.maxUses ?? 0) - (e.currentUses ?? 0)),
							max: e.maxUses
						},
						...e.flavorDescription ? { description: e.flavorDescription } : {}
					}
				});
			}
			let g = [
				l.integratedWeapon,
				l.improved_armament,
				l.superheavy_mounting,
				...l.integratedMounts.map((e) => ({
					mount_type: R.Integrated,
					slots: [{
						weapon: e.weapon,
						mod: null,
						size: mn.Integrated
					}],
					extra: [],
					bonus_effects: []
				})),
				...l.mounts
			].filter((e) => e?.slots.some((e) => e.weapon));
			for (let e of g) {
				let n = [], processMechWeapon = async (e) => {
					let n = await getOrCreateActorItemByLid(e.id, o, s, i), r = n?.id;
					if (!n) {
						let n = hr(e.data, t);
						r = (await o.createEmbeddedDocuments("Item", [{
							...n,
							type: V.MECH_WEAPON,
							name: e.data.name
						}]))[0].id;
					}
					c.push({
						_id: r,
						...e.flavorName ? { name: e.flavorName } : {},
						system: {
							uses: {
								value: Math.max(0, (e.maxUses ?? 0) - (e.currentUses ?? 0)),
								max: e.maxUses
							},
							...e.flavorDescription ? { description: e.flavorDescription } : {}
						}
					});
					let a = null, l = null;
					if (e.mod) {
						if (a = await getOrCreateActorItemByLid(e.mod.id, o, s, i), l = a?.id, !a) {
							let n = xr(e.mod.data, t);
							l = (await o.createEmbeddedDocuments("Item", [{
								...n,
								type: V.WEAPON_MOD,
								name: e.mod.data.name
							}]))[0].id;
						}
						c.push({
							_id: l,
							system: { uses: {
								value: Math.max(0, (e.mod.maxUses ?? 0) - (e.mod.currentUses ?? 0)),
								max: e.mod.maxUses
							} }
						});
					}
					return {
						weapon: n,
						weaponId: r,
						mod: a,
						modId: l
					};
				};
				for (let t of e.slots) {
					if (!t.weapon) continue;
					let { weaponId: e, modId: r } = await processMechWeapon(t.weapon);
					n.push({
						mod: r ?? null,
						weapon: e ?? null,
						size: t.size
					});
				}
				for (let t of e.extra) {
					if (!t.weapon) continue;
					let { weaponId: e, modId: r } = await processMechWeapon(t.weapon);
					n.push({
						mod: r ?? null,
						weapon: e ?? null,
						size: t.size
					});
				}
				u.push({
					bracing: e.lock ?? !1,
					type: e.mount_type,
					slots: n
				});
			}
			await o.updateEmbeddedDocuments("Item", c), await updateMech(o, e, a, p, u, d, m), f ? r.favorite_mech === o.system.lid && (f = o.uuid) : f = o.uuid;
		}
		await e.update({ system: {
			active_mech: f,
			last_cloud_update: (/* @__PURE__ */ new Date()).toISOString()
		} }), e.effectHelper.propagateEffects(!0), e.render(), ui.notifications.info("Successfully loaded pilot new state.");
	} catch (e) {
		console.warn(e), ui.notifications.warn(`Failed to update pilot: ${e instanceof Error ? e.message : e}`, { permanent: !0 });
	}
}
async function importCCv2(e, t, n = !0) {
	if (!game.settings.get(game.system.id, y.setting_core_data)) {
		ui.notifications.warn("You must import the Core Book Data in the Lancer Compendium Manager before importing a pilot.", { permanent: !0 });
		return;
	}
	if (console.log(`${W} Importing v2 Pilot`, e, t), !(!e.is_pilot() || !t)) {
		if (n) {
			await e.deleteEmbeddedDocuments("Item", Array.from(e.items.keys()));
			let t = game.actors?.filter((t) => t.is_mech() && t.system.pilot?.value == e) ?? [];
			for (let e of t) await e.deleteEmbeddedDocuments("Item", Array.from(e.items.keys()));
		}
		await e.update({ name: t.name });
		try {
			let n = e.folder, r = foundry.utils.duplicate(e.ownership), i = game.user?.can("ACTOR_CREATE"), a = game.users?.some((e) => e.isGM && e.active);
			!i && !a && new foundry.applications.api.DialogV2({
				window: {
					title: "Cannot Create Actors",
					icon: "fas fa-triangle-exclamation"
				},
				content: "<p>You are not permitted to create actors and no GM's are online, so sync will not produce any new mechs or deployables.</p>\n        <p>Your GM can allow Players/Trusted Players to create actors in Settings->Configure Permissions.</p>",
				buttons: [{
					action: "close",
					icon: "fas fa-check",
					label: "Close",
					default: !0
				}]
			}).render(!0);
			let o = [], s = [], c = [], l = [], u = [], d = null;
			if (t.loadout) {
				let n = [...e.items.contents], getPilotItemByLid = async (t) => {
					let r = n.findSplice((e) => e.system.lid == t);
					if (r) return r;
					{
						let n = await A(t);
						if (!n) {
							s.push({
								actor: e.name,
								lid: t
							});
							return;
						}
						return (await Dt([n], e))[0];
					}
				}, r = [], i = [...t.loadout.gear ?? [], ...t.loadout.extendedGear ?? []].filter((e) => e);
				for (let e of i) {
					let t = await getPilotItemByLid(e?.id);
					t && c.push(t.id);
				}
				let a = (t.loadout.armor ?? []).filter((e) => e);
				for (let e of a) {
					let t = await getPilotItemByLid(e?.id);
					t && l.push(t.id);
				}
				let o = [...t.loadout.weapons ?? [], ...t.loadout.extendedWeapons ?? []].filter((e) => e);
				for (let e of o) {
					let t = await getPilotItemByLid(e?.id);
					t && u.push(t.id);
				}
				for (let e of t.core_bonuses) await getPilotItemByLid(e);
				for (let n of t.skills) if (n.custom) e.createEmbeddedDocuments("Item", [{
					type: V.SKILL,
					name: n.id ?? "Custom Skill",
					"system.rank": n.rank,
					"system.description": n.custom_desc || n.custom_detail || ""
				}]);
				else {
					let e = await getPilotItemByLid(n.id);
					e && r.push({
						_id: e.id,
						"system.curr_rank": n.rank
					});
				}
				for (let e of t.talents) {
					let t = await getPilotItemByLid(e.id);
					t && r.push({
						_id: t.id,
						"system.curr_rank": e.rank
					});
				}
				if (d = t.bondId ? await getPilotItemByLid(t.bondId) : null, d && t.bondPowers) {
					d.system.powers.forEach((e) => {
						e.unlocked = !1;
					});
					let e = game.packs.get(O(V.BOND));
					await e?.getIndex();
					let n = await e?.getDocuments({ type: V.BOND }) ?? null, unlockAndRefill = function(e) {
						e.unlocked = !0, e.uses && (e.uses.value = e.uses.max);
					};
					t.bondPowers.forEach((e) => {
						let t = d.system.powers.findIndex((t) => t.name == e.name);
						if (t != null && t != -1) {
							let e = d.system.powers[t];
							unlockAndRefill(e);
							return;
						}
						let r = !1;
						for (let i of n) {
							if (r || !i.is_bond()) return;
							let n = i.system.powers.find((t) => t.name == e.name);
							if (n) {
								if (r = !0, unlockAndRefill(n), d.system.powers.push(n), t = d.system.powers.findIndex((e) => e.veteran), t != null && t != -1) {
									let e = d.system.powers[t];
									unlockAndRefill(e);
								}
								break;
							}
						}
					}), await d.update({ "system.powers": d.system.powers });
				}
				for (let e of t.licenses) {
					let t = await getPilotItemByLid(`lic_${e.id}`);
					t && r.push({
						_id: t.id,
						"system.curr_rank": e.rank
					});
				}
				for (let r of t.reserves) await getOrCreateActorItemByLid(r.id, e, n, s);
				await e.updateEmbeddedDocuments("Item", r);
				let f = n.filter((e) => [
					V.TALENT,
					V.SKILL,
					V.CORE_BONUS
				].includes(e.type));
				await e._safeDeleteDescendant("Item", f);
			}
			await e.update({
				name: t.name,
				img: T(e.img, t.cloud_portrait),
				system: {
					"hp.value": t.current_hp,
					background: t.background,
					callsign: t.callsign,
					cloud_id: t.cloudID,
					history: t.history,
					level: t.level,
					loadout: {
						armor: l,
						gear: c,
						weapons: u
					},
					hull: t.mechSkills[0],
					agi: t.mechSkills[1],
					sys: t.mechSkills[2],
					eng: t.mechSkills[3],
					mounted: t.state?.mounted ?? !0,
					notes: t.notes,
					player_name: t.player_name,
					status: t.status,
					text_appearance: t.text_appearance,
					bond_state: d ? {
						"xp.value": t.xp,
						"stress.value": t.stress,
						answers: t.bondAnswers,
						minor_ideal: t.minorIdeal,
						burdens: t.burdens.map((e) => ({
							lid: e.id,
							name: e.title,
							min: 0,
							max: e.segments,
							value: e.progress,
							default_value: 0
						})),
						clocks: t.clocks.map((e) => ({
							lid: e.id,
							name: e.title,
							min: 0,
							max: e.segments,
							value: e.progress,
							default_value: 0
						}))
					} : void 0
				},
				prototypeToken: {
					name: t.name,
					"texture.src": T(e.prototypeToken?.texture?.src, t.cloud_portrait, e.img)
				}
			});
			let f = "";
			for (let i of t.mechs) {
				let a = game.actors.find((e) => e.is_mech() && e.system.lid == i.id);
				if (!a) {
					if (!game.user?.can("ACTOR_CREATE")) {
						ui.notifications.warn(`Could not import mech '${i.name}' as you lack the permission to create new actors. Please ask your GM for assistance (either they import for you, or give you permissions)`, { permanent: !0 }), o.push({
							name: i.name,
							lid: i.frame
						});
						continue;
					}
					a = await B.create({
						name: i.name,
						type: V.MECH,
						folder: n?.id,
						ownership: r,
						system: { pilot: e.uuid }
					});
				}
				if (!a.canUserModify(game.user, "update")) {
					ui.notifications.warn(`Could not import mech '${i.name}' as you lack the permission to update the actor. Please ask your GM for assistance.`, { permanent: !0 }), o.push({
						name: i.name,
						lid: i.frame
					});
					continue;
				}
				let c = [...a.items.contents], getMechItemByLid = async (e) => {
					let t = c.findSplice((t) => t.system.lid == e);
					if (t) return t;
					{
						let t = await A(e);
						if (!t) {
							s.push({
								actor: a.name,
								lid: e
							});
							return;
						}
						return (await Dt([t], a))[0];
					}
				}, l = i.loadouts[i.active_loadout_index], u = await getMechItemByLid(i.frame), d = [...l.integratedSystems, ...l.systems], p = [], m = /* @__PURE__ */ new Map();
				for (let e of d) {
					let t = await getMechItemByLid(e.id);
					t && (p.push(t.id), m.set(t.id, e));
				}
				let h = [], g = /* @__PURE__ */ new Map();
				l.integratedWeapon?.slots.some((e) => e.weapon) && h.push(l.integratedWeapon), l.improved_armament?.slots.some((e) => e.weapon) && h.push(l.improved_armament), l.superheavy_mounting?.slots.some((e) => e.weapon) && h.push(l.superheavy_mounting), h.push(...l.integratedMounts.map((e) => ({
					mount_type: R.Integrated,
					slots: [{
						weapon: e.weapon,
						mod: null,
						size: mn.Integrated
					}],
					extra: [],
					bonus_effects: []
				})).filter((e) => e.slots.some((e) => e.weapon))), h.push(...l.mounts);
				let ee = [];
				for (let e of h) {
					let t = [];
					for (let n of e.slots) {
						let r = n.weapon ? await getMechItemByLid(n.weapon.id) : null, i = r && n.weapon?.mod ? await getMechItemByLid(n.weapon.mod.id) : null;
						t.push({
							mod: i?.id ?? null,
							weapon: r?.id ?? null,
							size: n.size
						});
						for (let r of e.extra) {
							let e = r.weapon ? await getMechItemByLid(r.weapon.id) : null, i = e && r.weapon?.mod ? await getMechItemByLid(r.weapon.mod.id) : null;
							t.push({
								mod: i?.id ?? null,
								weapon: e?.id ?? null,
								size: n.size
							});
						}
						r && g.set(r.id, n.weapon), i && m.set(r.id, n.weapon.mod);
					}
					ee.push({
						bracing: e.lock ?? !1,
						type: e.mount_type,
						slots: t
					});
				}
				await a.update({
					name: i.name,
					folder: n ? n.id : null,
					img: T(a.img, i.portrait, u ? k(u.name) : null),
					permission: r,
					prototypeToken: {
						name: e.system.callsign || i.name,
						disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
						"texture.src": T(a.prototypeToken?.texture?.src, i.cloud_portrait, u ? k(u.name) : null)
					},
					system: {
						lid: i.id,
						"hp.value": i.current_hp,
						"overshield.value": i.overshield,
						burn: i.burn,
						activations: i.activations,
						"heat.value": i.current_heat,
						"stress.value": i.current_stress,
						"structure.value": i.current_structure,
						overcharge: i.current_overcharge,
						"repairs.value": i.current_repairs,
						core_active: i.core_active,
						core_energy: i.current_core_energy,
						notes: i.notes,
						pilot: e.uuid,
						loadout: {
							frame: u?.id ?? null,
							weapon_mounts: ee,
							systems: p
						}
					}
				}), (!t.state?.active_mech_id || a.system.lid == t.state?.active_mech_id) && (f = a.uuid);
				let _ = [];
				for (let e of a.system.loadout.weapon_mounts) for (let t of e.slots) {
					if (t.weapon) {
						let e = g.get(t.weapon.id);
						e && _.push({
							_id: t.weapon.id,
							system: {
								loaded: e.loaded,
								destroyed: e.destroyed,
								cascading: e.cascading,
								"uses.value": e.uses
							}
						});
					}
					if (t.mod) {
						let e = m.get(t.mod.id);
						e && _.push({
							_id: t.mod.id,
							system: {
								destroyed: e.destroyed,
								cascading: e.cascading,
								"uses.value": e.uses
							}
						});
					}
				}
				for (let e of a.system.loadout.systems) {
					if (!e?.value) continue;
					let t = m.get(e.id);
					t && _.push({
						_id: e.id,
						system: {
							destroyed: t.destroyed,
							cascading: t.cascading,
							uses: t.uses
						}
					});
				}
				await a.updateEmbeddedDocuments("Item", _);
			}
			if (await e.update({
				"system.active_mech": f,
				"system.last_cloud_update": (/* @__PURE__ */ new Date()).toISOString()
			}), e.effectHelper.propagateEffects(!0), e.render(), s.length || o.length) {
				let t = `Partially loaded '${e.name}'s new state.`;
				o.length && (t += ` ${o.length} actors could not be created/updated.`), s.length && (t += ` ${s.length} items could not be found.`), t += " See dialog for details.", ui.notifications.warn(t, { permanent: !0 }), console.warn(`${W} Some actors and/or items were missed during pilot import:`, o, s);
				let n = "";
				o.length && (n += `<div><span>The following Actors could not be created or updated:</span>
        <ul>${o.map((e) => `<li>${e.name} - ${e.lid}</li>`).join("")}</ul></div>`), s.length && (n += `<div><span>The following Items were not found in the compendium and could not be imported:</span>
        <ul>${s.map((e) => `<li>${e.actor} - ${e.lid}</li>`).join("")}</ul>
        <span>Import all necessary LCPs first using the <b>Lancer Compendium Manager</b>.</span></div>`), new foundry.applications.api.DialogV2({
					window: {
						title: "Incomplete Pilot Import",
						icon: "fas fa-triangle-exclamation"
					},
					content: n,
					buttons: [{
						action: "close",
						icon: "fas fa-check",
						label: "Close",
						default: !0
					}]
				}).render(!0);
			} else ui.notifications.info("Successfully loaded pilot new state.");
		} catch (e) {
			console.warn(e), ui.notifications.warn(`Failed to update pilot: ${e instanceof Error ? e.message : e}`, { permanent: !0 });
		}
	}
}
//#endregion
//#region src/module/actor/pilot-sheet.ts
var G = y.log_prefix, Br = /^[A-Z0-9\d]{6}$/g, Vr = /^[A-Z0-9]{12}$/g, Hr = 8, LancerPilotSheet = class extends LancerActorSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: [
				"lancer",
				"sheet",
				"actor",
				"pilot"
			],
			template: `systems/${game.system.id}/templates/actor/pilot.hbs`,
			width: 900,
			height: 800,
			tabs: [{
				navSelector: ".lancer-tabs",
				contentSelector: ".sheet-body",
				initial: "tactical"
			}]
		});
	}
	activateListeners(e) {
		if (super.activateListeners(e), this.options.editable && this.actor.isOwner) {
			let t = this.actor;
			e.find("select[name=\"selectCloudId\"]").on("change", (e) => {
				e.stopPropagation(), t.update({ "system.cloud_id": e.target.value });
			});
			let n = e.find(".cloud-control[data-action*=\"download\"]");
			t.system.cloud_id ? n.on("click", async (e) => {
				if (e.stopPropagation(), !t.system.cloud_id) return ui.notifications.error("You must enter a Comp/Con pilot share code before downloading!");
				let n = null;
				if (t.system.cloud_id.match(Vr)) {
					ui.notifications.info("Importing character from V3 share code..."), console.log(`${G} Attempting import with V3 share code: ${t.system.cloud_id}`);
					try {
						n = await fetchV3PilotViaShareCode(t.system.cloud_id);
					} catch (e) {
						ui.notifications.error("Error importing from V3 share code."), console.error(`${G} Failed import with V3 share code ${t.system.cloud_id}, error:`, e);
						return;
					}
				} else if (t.system.cloud_id.match(Br)) {
					ui.notifications.info("Importing character from V2 share code..."), console.log(`${G} Attempting import with V2 share code: ${t.system.cloud_id}`);
					try {
						n = await fetchV2PilotViaShareCode(t.system.cloud_id);
					} catch (e) {
						ui.notifications.error("Error importing from V2 share code. V2 share codes may no longer work, or this share code may need to be refreshed."), console.error(`${G} Failed import with V2 share code ${t.system.cloud_id}, error:`, e);
						return;
					}
				} else {
					ui.notifications.error("Could not find character to import! No share code entered.");
					return;
				}
				await importCC(this.actor, n);
			}) : n.addClass("disabled-cloud"), e.find("input#pilot-json-import").on("change", (e) => this._onPilotJsonUpload(e)), e.find(".activate-mech").on("click", async (e) => {
				e.stopPropagation();
				let t = await Mn(e.currentTarget.parentElement);
				!t || !t.is_mech() || this.activateMech(t);
			}), e.find(".deactivate-mech").on("click", async (e) => {
				e.stopPropagation(), this.deactivateMech();
			});
		}
	}
	_onPilotJsonUpload(e) {
		let t = e.target.files?.[0];
		if (!t) return;
		console.log(`${G} Selected file changed`, t);
		let n = new FileReader();
		n.addEventListener("load", (e) => {
			this._onPilotJsonParsed(e.target?.result);
		}), n.readAsText(t);
	}
	async _onPilotJsonParsed(e) {
		if (!e) return;
		let t = JSON.parse(e);
		console.log(`${G} Pilot Data of selected JSON:`, t), t && (ui.notifications.info(`Starting import of ${t.name}, Callsign ${t.callsign}. Please wait.`), console.log(`${G} Starting import of ${t.name}, Callsign ${t.callsign}.`), console.log(`${G} Parsed Pilot Data pack:`, t), await importCC(this.actor, t), ui.notifications.info(`Import of ${t.name}, Callsign ${t.callsign} complete.`), console.log(`${G} Import of ${t.name}, Callsign ${t.callsign} complete.`), this.render());
	}
	activateMech(e) {
		let t = this.actor;
		t.update({ "system.active_mech": e.uuid }), e.update({ "system.pilot": t.uuid });
	}
	async deactivateMech() {
		await this.actor.update({ "system.active_mech": null });
	}
	async getData() {
		return await super.getData();
	}
	canRootDrop(e) {
		return !!(e.type === "Actor" && e.document.is_mech() || e.type === "Item" && (e.document.is_core_bonus() || e.document.is_pilot_weapon() || e.document.is_pilot_armor() || e.document.is_pilot_gear() || e.document.is_license() || e.document.is_skill() || e.document.is_talent() || e.document.is_organization() || e.document.is_reserve() || e.document.is_bond() || e.document.is_status()));
	}
	async onRootDrop(e, t, n) {
		if (!this.actor.is_pilot()) return;
		let r = this.actor, i = r.system.loadout, a = r.items.filter((e) => e.is_bond()), [o, s] = await this.quickOwnDrop(e);
		if (o.type == "Item") {
			if (o.document.is_pilot_weapon()) {
				for (let e = 0; e < i.weapons.length || e <= 2; e++) if (!i.weapons[e]) {
					await r.update({ [`system.loadout.weapons.${e}`]: o.document.id });
					break;
				}
			} else if (o.document.is_pilot_gear()) {
				for (let e = 0; e < i.gear.length || e <= 3; e++) if (!i.gear[e]) {
					await r.update({ [`system.loadout.gear.${e}`]: o.document.id });
					break;
				}
			} else if (o.document.is_pilot_armor()) {
				for (let e = 0; e < i.armor.length || e <= 1; e++) if (!i.armor[e]) {
					await r.update({ [`system.loadout.armor.${e}`]: o.document.id });
					break;
				}
			} else if (s && o.document.is_talent() || o.document.is_skill()) await o.document.update({ "system.rank": 1 });
			else if (s && o.document.is_bond() && a.length > 0) for (let e of a) await r._safeDeleteDescendant("Item", [e]);
		} else o.type == "Actor" && o.document.is_mech() && this.activateMech(o.document);
	}
	async _updateObject(e, t) {
		if (this.actor.is_pilot()) return t["system.callsign"] && this.actor.system.callsign !== t["system.callsign"] && (t["prototypeToken.name"] = t["system.callsign"]), super._updateObject(e, t);
	}
};
function pilotCounters(e, t) {
	let n = "", r = e.system.custom_counters;
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		i.max != null && (n = i.max <= Hr ? n.concat(Ut(i, `system.custom_counters.${e}`, { canDelete: !0 })) : n.concat(o(i, `system.custom_counters.${e}`, { canDelete: !0 }), clicker_num_input(`system.custom_counters.${e}.value`, t), "</div>"));
	}
	return `
  <div class="card clipped double">
    <span class="lancer-header lancer-primary submajor" style="padding-right: 5px">
      <span>COUNTERS</span>
      <a class="gen-control fas fa-plus" data-action="append" data-path="system.custom_counters" data-action-value="(struct)counter"></a>
    </span>
    <div class="wraprow double">
      ${n}
    </div>
  </div>`;
}
function allMechPreview(e) {
	let t = e.data.root.system.active_mech?.value, n = game?.actors?.filter((t) => t.is_mech() && t.system.pilot?.status == "resolved" && t.system.pilot.value.id === e.data.root.actor.id) ?? [], r = [];
	for (let i of n) r.push(mech_preview(i, i == t, e));
	return r.join("");
}
function mech_preview(e, t, n) {
	let r = e.items.find((e) => e.type === V.FRAME), i = r?.system.manufacturer, a = [
		{
			title: "HP",
			icon: "mdi mdi-heart-outline",
			path: "system.hp.value"
		},
		{
			title: "HEAT",
			icon: "cci cci-heat",
			path: "system.heat.value"
		},
		{
			title: "EVASION",
			icon: "cci cci-evasion",
			path: "system.evasion"
		},
		{
			title: "ARMOR",
			icon: "mdi mdi-shield-outline",
			path: "system.armor"
		},
		{
			title: "STRUCTURE",
			icon: "cci cci-structure",
			path: "system.structure.value"
		},
		{
			title: "STRESS",
			icon: "cci cci-reactor",
			path: "system.stress.value"
		},
		{
			title: "E-DEF",
			icon: "cci cci-edef",
			path: "system.edef"
		},
		{
			title: "SPEED",
			icon: "mdi mdi-arrow-right-bold-hexagon-outline",
			path: "system.speed"
		},
		{
			title: "SAVE",
			icon: "cci cci-save",
			path: "system.save"
		},
		{
			title: "SENSORS",
			icon: "cci cci-sensor",
			path: "system.sensor_range"
		}
	], o = "";
	for (let t = 0; t < a.length; t++) {
		let n = a[t];
		o = o.concat(`
    <div class="mech-preview-stat-wrapper">
      <i class="${n.icon} i--4 i--dark"> </i>
      <span class="major">${n.title}</span>
      <span class="major">${U(e, n.path, 0)}</span>
    </div>`);
	}
	let s = t ? "<a class=\"deactivate-mech\"><i class=\"cci cci-deactivate\"></i></a>" : "<a class=\"activate-mech\"><i class=\"cci cci-activate\"></i></a>";
	return `
  <div class="mech-preview lancer-border-${t ? "primary" : "dark-gray"}">
    <div class="mech-preview-titlebar ref set click-open ${t ? "active" : "inactive"}" ${Re(e)}>
      ${s}
      <span>${e.name}${te(" // ACTIVE", t)}  --  ${i} ${r?.name}</span>
    </div>
    <img src="${e.img}"/>
    ${o}
  </div>`;
}
//#endregion
//#region src/module/apps/action-editor.ts
var ActionEditDialog = class extends xe {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			template: `systems/${game.system.id}/templates/window/action_editor.hbs`,
			title: "Action Editing",
			classes: ["lancer", "action-editor"],
			submitOnClose: !1
		});
	}
	getData() {
		let e = {};
		return Object.entries($e).forEach((t) => e[t[1]] = t[1]), {
			...super.getData(),
			action: this.value,
			activation_type: e,
			path: this.value_path
		};
	}
	fixupForm(e) {
		return {
			lid: e["action.lid"],
			name: e["action.name"],
			activation: e["action.activation"],
			cost: e["action.cost"],
			frequency: e["action.frequency"],
			init: e["action.init"],
			trigger: e["action.trigger"],
			terse: e["action.terse"],
			heat_cost: e["action.heat_cost"],
			tech_attack: e["action.tech_attack"],
			detail: this.value.detail,
			pilot: !!this.value.pilot,
			mech: !!this.value.mech,
			synergy_locations: this.value.synergy_locations || [],
			damage: this.value.damage || [],
			range: this.value.range || []
		};
	}
}, BonusEditDialog = class extends xe {
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			template: `systems/${game.system.id}/templates/window/bonus.hbs`,
			classes: ["lancer", "bonus-editor"],
			title: "Bonus Editing"
		};
	}
	getData() {
		let e = new Vt({ size: "m" });
		return {
			...super.getData(),
			damages: Object.values(n).map((t) => ({
				key: t,
				label: e.r(g.IconFor(t)),
				val: this.value.damage_types?.[t] ?? !1
			})),
			ranges: Object.values(Cn).map((t) => ({
				key: t,
				label: e.r(Ge.IconFor(t)),
				val: this.value.range_types?.[t] ?? !1
			})),
			sizes: Object.values(I).map((e) => ({
				key: e,
				label: e,
				val: this.value.weapon_sizes?.[e] ?? !1
			})),
			types: Object.values(Pt).map((e) => ({
				key: e,
				label: e,
				val: this.value.weapon_types?.[e] ?? !1
			}))
		};
	}
	fixupForm(e) {
		let t = {
			lid: e.lid,
			val: e.val,
			overwrite: e.overwrite,
			replace: e.replace,
			damage_types: {},
			range_types: {},
			weapon_sizes: {},
			weapon_types: {}
		};
		t.damage_types = {};
		for (let r of Object.values(n)) t.damage_types[r] = e[r];
		t.range_types = {};
		for (let n of Object.values(Cn)) t.range_types[n] = e[n];
		t.weapon_types = {};
		for (let n of Object.values(Pt)) t.weapon_types[n] = e[n];
		t.weapon_sizes = {};
		for (let n of Object.values(I)) t.weapon_sizes[n] = e[n];
		return t;
	}
}, Ur = y.log_prefix, LancerItemSheet = class extends foundry.appv1.sheets.ItemSheet {
	constructor(e, t) {
		super(e, t), this.collapse_handler = new a(), this.item.is_mech_weapon() && (this.options.initial = `profile${this.item.system.selected_profile_index}`);
	}
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: [
				"lancer",
				"sheet",
				"item"
			],
			width: 700,
			height: 700,
			tabs: [{
				navSelector: ".lancer-tabs",
				contentSelector: ".sheet-body",
				initial: "description"
			}]
		});
	}
	get template() {
		return `${`systems/${game.system.id}/templates/item`}/${this.item.type}.hbs`;
	}
	_activateContextListeners(e) {
		S(e, this.item, !this.options.editable), ne(e, this.item);
	}
	activateListeners(e) {
		super.activateListeners(e), b(e), M(e), $(e).find(".ref.set.click-open").on("click", _t), L(e), this._activateContextListeners(e), this.options.editable && (pe(e, this.item), re(e, this.item), jt(e, this.item), wn(e, this.item), bt(e, this.item), Ft(e, this.item, null), BonusEditDialog.handle(e, ".editable.bonus", this.item), ActionEditDialog.handle(e, ".action-editor", this.item), Te(e, this.item), Ce(e, this.item));
	}
	async _updateObject(e, t) {
		await this.item.update(t);
	}
	async getData() {
		let e = super.getData();
		if (e.system = this.item.system, e.collapse = {}, e.deployables = {}, !this.item.pack && this.item.actor) e.deployables = Yt(this.item.actor);
		else {
			let t = await game.packs.get(O(V.DEPLOYABLE))?.getDocuments({ type: V.DEPLOYABLE }) ?? [];
			for (let n of t) e.deployables[n.system.lid] = n;
		}
		return e.license = null, this.actor?.is_pilot() || this.actor?.is_mech() ? e.license = await Kt(this.item, this.actor) : e.license = await Kt(this.item), this.item.is_organization() && (e.org_types = Wt), this.item.is_status() && (e.status_types = Tt, e.system.lid || (e.system.lid = `status-${e.document.id}`)), console.log(`${Ur} Rendering with following item ctx: `, e), e;
	}
}, LancerFrameSheet = class extends LancerItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			width: 700,
			height: 750
		});
	}
	async _onChangeMount(e) {
		let t = $(e.currentTarget), n = t.prop("index");
		if (t.prop("value") == "delete") {
			e.stopPropagation();
			let t = [...(await this.getData()).system.mounts];
			t.splice(n, 1), this.item.update({ "system.mounts": t });
		}
	}
	activateListeners(e) {
		super.activateListeners(e), this.options.editable && e.find(".mount-selector").on("change", (e) => this._onChangeMount(e));
	}
	async getData() {
		let e = await super.getData();
		return e.coreDeployables = await lt(e.system.core_system.deployables), e;
	}
}, LancerLicenseSheet = class extends LancerItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			width: 700,
			height: 750
		});
	}
	async getData() {
		let e = await super.getData(), t = [[]];
		for (let e of [
			V.FRAME,
			V.MECH_SYSTEM,
			V.MECH_WEAPON,
			V.WEAPON_MOD
		]) {
			let n = game.packs.get(O(e));
			if (n) {
				let e = await n.getIndex(), r = this.item.system.key;
				for (let [i, a] of e.entries()) {
					if (a.system.license !== r) continue;
					let e = await n.getDocument(i), o = e.system.license_level;
					for (; t.length <= o;) t.push([]);
					t[o].some((t) => t.id === e.id) || t[o].push(e);
				}
			}
		}
		for (let e = 0; e < t.length; e++) t[e].sort((e, t) => e.is_frame() && !t.is_frame() ? -1 : !e.is_frame() && t.is_frame() ? 1 : e.name.localeCompare(t.name));
		return e.unlocks = t, e;
	}
	_activateContextListeners(e) {
		S(e, this.item, !0);
	}
	activateListeners(e) {
		super.activateListeners(e), c(e, (e, t, n) => {
			e.type == "Item" && e.document.update({ system: {
				license: this.item.system.key,
				manufacturer: this.item.system.manufacturer
			} });
		}), this.options.editable;
	}
}, preloadTemplates = async function() {
	let e = [
		`systems/${game.system.id}/templates/actor/deployable.hbs`,
		`systems/${game.system.id}/templates/actor/mech.hbs`,
		`systems/${game.system.id}/templates/actor/npc.hbs`,
		`systems/${game.system.id}/templates/actor/pilot.hbs`,
		`systems/${game.system.id}/templates/chat/attack-card.hbs`,
		`systems/${game.system.id}/templates/chat/tech-attack-card.hbs`,
		`systems/${game.system.id}/templates/chat/generic-card.hbs`,
		`systems/${game.system.id}/templates/chat/stat-roll-card.hbs`,
		`systems/${game.system.id}/templates/chat/system-card.hbs`,
		`systems/${game.system.id}/templates/combat/combat-tracker-config.hbs`,
		`systems/${game.system.id}/templates/combat/combat-tracker.hbs`,
		`systems/${game.system.id}/templates/item/bond.hbs`,
		`systems/${game.system.id}/templates/item/core_bonus.hbs`,
		`systems/${game.system.id}/templates/item/frame.hbs`,
		`systems/${game.system.id}/templates/item/license.hbs`,
		`systems/${game.system.id}/templates/item/mech_system.hbs`,
		`systems/${game.system.id}/templates/item/mech_weapon.hbs`,
		`systems/${game.system.id}/templates/item/npc_class.hbs`,
		`systems/${game.system.id}/templates/item/npc_feature.hbs`,
		`systems/${game.system.id}/templates/item/npc_template.hbs`,
		`systems/${game.system.id}/templates/item/organization.hbs`,
		`systems/${game.system.id}/templates/item/pilot_armor.hbs`,
		`systems/${game.system.id}/templates/item/pilot_gear.hbs`,
		`systems/${game.system.id}/templates/item/pilot_weapon.hbs`,
		`systems/${game.system.id}/templates/item/reserve.hbs`,
		`systems/${game.system.id}/templates/item/skill.hbs`,
		`systems/${game.system.id}/templates/item/status.hbs`,
		`systems/${game.system.id}/templates/item/tag.hbs`,
		`systems/${game.system.id}/templates/item/talent.hbs`,
		`systems/${game.system.id}/templates/item/weapon_mod.hbs`,
		`systems/${game.system.id}/templates/lcp/lcp-manager.hbs`,
		`systems/${game.system.id}/templates/window/action_editor.hbs`,
		`systems/${game.system.id}/templates/window/action_manager.hbs`,
		`systems/${game.system.id}/templates/window/bonus.hbs`,
		`systems/${game.system.id}/templates/window/counter.hbs`,
		`systems/${game.system.id}/templates/window/html_editor.hbs`,
		`systems/${game.system.id}/templates/window/inventory.hbs`,
		`systems/${game.system.id}/templates/window/tag.hbs`
	];
	return foundry.applications.handlebars.loadTemplates(e);
}, Wr = /* @__PURE__ */ e({
	author: () => author,
	description: () => description,
	license: () => license,
	main: () => main,
	name: () => name,
	version: () => Gr
}), Gr = "3.1.7", Kr = /* @__PURE__ */ e({
	commitDataModelMigrations: () => commitDataModelMigrations,
	migrateActor: () => migrateActor,
	migrateCompendium: () => migrateCompendium,
	migrateCompendiumStructure: () => migrateCompendiumStructure,
	migrateItem: () => migrateItem,
	migrateScene: () => migrateScene,
	migrateTokenDocument: () => migrateTokenDocument,
	migrateWorld: () => migrateWorld
}), { log_prefix: qr } = y;
async function commitDataModelMigrations() {
	await Item.updateDocuments(game.items.map((e) => e.toObject()), {
		diff: !1,
		recursive: !1,
		noHook: !0
	}), await Actor.updateDocuments(game.actors.map((e) => e.toObject()), {
		diff: !1,
		recursive: !1,
		noHook: !0
	}), await Scene.updateDocuments(game.scenes.map((e) => e.toObject()), {
		diff: !1,
		recursive: !1,
		noHook: !0
	});
}
var K = 1, Jr = 0, Yr = null;
function migrationProgress(e) {
	Jr += e;
	let t = Math.min(1, Jr / K);
	Yr.update({ pct: t });
}
async function migrateWorld() {
	let e = game.settings.get(game.system.id, y.setting_migration_version);
	if (foundry.utils.isNewerVersion("2.0.0", e)) {
		new foundry.applications.api.DialogV2({
			window: {
				title: "Cannot Migrate This World",
				icon: "fas fa-triangle-exclamation"
			},
			position: { width: 400 },
			content: `<h4>
        This world is too old to migrate directly to Lancer ${game.system.version} and Foundry 13.
      </h4>
      <p>
        Restore a backup of this world and <strong>migrate to Foundry 12.343</strong> first.
      </p>`,
			buttons: [{
				action: "close",
				label: "Close"
			}]
		}).render(!0), ui.notifications?.error(`This world is too old to migrate directly to Lancer ${game.system.version} and Foundry 13. Restore a backup of this world and migrate to Foundry 12.343 first.`, { permanent: !0 }), console.error(`${qr} World is coming from 1.X. World needs to be migrated through intermediate Foundry versions first.`);
		return;
	}
	if (Yr = ui.notifications.info(`Migration to v${game.system.version} in progress. Please do not shut down your world or refresh the page until migration is complete.`, { progress: !0 }), foundry.utils.isNewerVersion("0.0.0", game.settings.get(game.system.id, y.setting_core_data))) {
		let e = await zt();
		await Sr(e.cp), await game.settings.set(game.system.id, y.setting_core_data, e.availableVersion);
	}
	function reduceScene(e, t) {
		return e + t.tokens.contents.reduce((e, t) => (e += 1, t.isLinked || (e += 1 + (t.actor?.items.size || 0)), e), 0);
	}
	K = game.items.size, K += game.actors.reduce((e, t) => e += 1 + t.items.size, 0), K += game.scenes.reduce(reduceScene, 0);
	for (let e of game.packs.contents) e.metadata.type === "Item" ? K += e.index.size : e.metadata.type === "Actor" ? (await e.getDocuments(), K += e.contents.reduce((e, t) => e += 1 + t.items.size, 0)) : e.metadata.type === "Scene" && (await e.getDocuments(), K += e.contents.reduce(reduceScene, 0));
	console.log(`${qr} Migrating approximately ${K} documents`);
	for (let e of game.packs.contents) e.metadata.packageType === "world" && await migrateCompendium(e);
	let t = (await Promise.all(game.actors.contents.map(migrateActor))).filter((e) => e && !!e._id);
	await Actor.updateDocuments(t);
	let n = (await Promise.all(game.items.contents.map(migrateItem))).filter((e) => e && !!e._id);
	await Item.updateDocuments(n), await Promise.all(game.scenes.contents.map(migrateScene)), await commitDataModelMigrations(), await game.settings.set(game.system.id, y.setting_migration_version, game.system.version), migrationProgress(K - Jr), ui.notifications.info(`LANCER System migration to version ${game.system.version} completed!`, { permanent: !0 });
}
async function migrateCompendium(e) {
	let t = e.locked;
	if (await e.configure({ locked: !1 }), e.locked) return ui.notifications.error(`Could not migrate ${e.collection}: unable to unlock`);
	let n = e.metadata.name;
	if ([
		"sitrep",
		"environment",
		"faction",
		"tag",
		"quirk",
		"manufacturer"
	].includes(n)) {
		await e.deleteCompendium();
		return;
	}
	if (await e.migrate({ notify: !1 }), e.documentName == "Actor") try {
		let t = await e.getDocuments(), n = (await Promise.all(t.map(migrateActor))).filter((e) => e && !!e._id);
		await Actor.updateDocuments(n, {
			pack: e.collection,
			diff: !1,
			recursive: !1,
			noHook: !0
		});
	} catch (t) {
		let n = game.i18n.localize(e.metadata.label);
		console.error(`Error while migrating actor compendium ${n}:`, t), ui.notifications?.error(`Error while migrating actor compendium ${n}. Check the console for details.`);
	}
	else if (e.documentName == "Item") try {
		let t = await e.getDocuments(), n = (await Promise.all(t.map(migrateItem))).filter((e) => e && !!e._id);
		await Item.updateDocuments(n, {
			pack: e.collection,
			diff: !1,
			recursive: !1,
			noHook: !0
		});
	} catch (t) {
		let n = game.i18n.localize(e.metadata.label);
		console.error(`Error while migrating item compendium ${n}:`, t), ui.notifications?.error(`Error while migrating item compendium ${n}. Check the console for details.`);
	}
	else if (e.documentName == "Scene") try {
		let t = await e.getDocuments(), n = await Promise.all(t.map(migrateScene));
		await Scene.updateDocuments(n, {
			pack: e.collection,
			diff: !1,
			recursive: !1,
			noHook: !0
		});
	} catch (t) {
		let n = game.i18n.localize(e.metadata.label);
		console.error(`Error while migrating scene ${n}:`, t), ui.notifications?.error(`Error while migrating scene ${n}. Check the console for details.`);
	}
	await e.configure({ locked: t }), console.log(`Migrated all ${e.documentName} entities from Compendium ${e.collection}`);
}
async function migrateActor(e) {
	try {
		let t = {
			_id: e.id,
			system: e.system.toObject(!0)
		}, n = (await Promise.all(e.items.contents.map(migrateItem))).filter((e) => e && !!e._id);
		return await e.updateEmbeddedDocuments("Item", n), migrationProgress(1), t;
	} catch (t) {
		return console.error(`Error while migrating actor [${e.id} | ${e.name}]:`, t), ui.notifications?.error(`Error while migrating actor ${e.name}. Check the console for details.`), {};
	}
}
async function migrateItem(e) {
	try {
		let t = {
			_id: e.id,
			system: e.system.toObject(!0)
		}, n = game.settings.get(game.system.id, y.setting_migration_version);
		if (e.type === "license" && foundry.utils.isNewerVersion("2.1.1", n) && (console.log(`Fixing license lid for ${e.system.key}`), t.system.lid = `lic_${e.system.key}`), e.type === "status" && e.system.lid === "stunned" && !e.effects.contents.find((e) => e.changes.some((e) => e.key === "system.evasion"))) {
			console.log(`${qr} Adding evasion change to existing stunned status ${e.name}`);
			let n = ur({
				name: e.name,
				description: e.system.effects || ""
			});
			t.effects = [
				...t.effects || [],
				n,
				,
			];
		}
		return migrationProgress(1), t;
	} catch (t) {
		return console.error(`Error while migrating item ${e.id} ${e.name}:`, t), {};
	}
}
async function migrateScene(e) {
	try {
		for (let t of e.tokens.contents) try {
			if (!t.isLinked && t.actor) {
				console.log(`Migrating unlinked token actor ${t.actor.name}`);
				let e = await migrateActor(t.actor);
				await t.actor.update(e);
			}
		} catch (n) {
			console.error(`Error while migrating unlinked token [${t.id} | ${t.name}] in scene [${e.id} | ${e.name}]:`, n), ui.notifications?.error(`Error while migrating unlinked token ${t.name} in scene ${e.name}. Check the console for details.`);
		}
		let t = (await Promise.all(e.tokens.contents.map(migrateTokenDocument))).filter((e) => e && !!e._id);
		await e.updateEmbeddedDocuments("Token", t);
	} catch (t) {
		console.error(`Error while migrating scene [${e.id} | ${e.name}]:`, t), ui.notifications?.error(`Error while migrating scene ${e.name}. Check the console for details.`);
	}
}
async function migrateTokenDocument(e) {
	try {
		let t = { _id: e.id };
		return migrationProgress(1), t;
	} catch (t) {
		return console.error(`Error while migrating token [${e.id} | ${e.name}]:`, t), {};
	}
}
async function migrateCompendiumStructure() {
	await Promise.all(Object.values(V).map((e) => game.packs.get(`world.${e}`)?.configure({ locked: !1 }))), await Promise.all(Object.values(V).map((e) => {
		let t = game.packs.get(`world.${e}`);
		if (t && t.index.contents.length == 0) return t.deleteCompendium();
	}));
	let e = Object.values(V);
	for (let t of e) {
		let e = await game.packs.get(`world.${t}`)?.getDocuments() ?? [];
		if (console.log(`Moving ${e.length} ${t} documents`), e.length === 0) continue;
		let n = await Tn(t), r = [V.NPC, V.STATUS].includes(t) ? void 0 : n.folders.find((e) => e.getFlag(game.system.id, "entrytype") === t) ?? await Folder.create({
			name: game.i18n.localize(`TYPES.${n.metadata.type}.${t}`),
			type: n.metadata.type,
			[`flags.${game.system.id}.entrytype`]: t
		}, { pack: O(t) }), i = e.map((e) => ({
			...e.toObject(),
			folder: r?.id
		})), a = e[0].documentName;
		await CONFIG[a].documentClass.createDocuments(i, { pack: O(t) }), await game.packs.get(`world.${t}`)?.deleteCompendium();
	}
}
//#endregion
//#region src/module/combat/lancer-combat.ts
var LancerCombat = class extends Combat {
	_sortCombatants(e, t) {
		let n = t.disposition - e.disposition;
		return n === 0 ? super._sortCombatants(e, t) : n;
	}
	async _preCreate(...[e, t, n]) {
		return this.updateSource({ turn: null }), super._preCreate(e, t, n);
	}
	async _manageTurnEvents(...e) {
		this.previous && super._manageTurnEvents(...e);
	}
	async resetActivations() {
		let e = this.settings.skipDefeated, t = this.combatants.map((t) => ({
			_id: t.id,
			"system.activations.value": e && t.isDefeated ? 0 : t.activations.max ?? 0
		}));
		return this.updateEmbeddedDocuments("Combatant", t);
	}
	async startCombat() {
		this._playCombatSound("startEncounter");
		let e = {
			round: 1,
			turn: null
		};
		return Hooks.callAll("combatStart", this, e), await this.resetActivations(), await this.update(e), this;
	}
	async nextRound() {
		await this.resetActivations();
		let e = {
			round: this.round + 1,
			turn: null
		}, t = Math.max(this.turns.length - (this.turn || 0), 0) * CONFIG.time.turnTime;
		t += CONFIG.time.roundTime;
		let n = {
			advanceTime: t,
			direction: 1
		};
		return Hooks.callAll("combatRound", this, e, n), await this.update(e, n), this;
	}
	async nextTurn() {
		let e = { turn: null }, t = {
			advanceTime: 0,
			direction: 0
		};
		return Hooks.callAll("combatTurn", this, e, t), await this.update(e, t), this;
	}
	async previousRound() {
		await this.resetActivations();
		let e = Math.max(this.round - 1, 0), t = 0;
		e > 0 && (t -= CONFIG.time.roundTime);
		let n = {
			round: e,
			turn: null
		}, r = {
			advanceTime: t,
			direction: -1
		};
		return Hooks.callAll("combatRound", this, n, r), await this.update(n, r), this;
	}
	async previousTurn() {
		if (this.turn === null) return this;
		let e = { turn: null }, t = {
			advanceTime: -CONFIG.time.turnTime,
			direction: -1
		};
		return await this.combatant?.modifyCurrentActivations(1), Hooks.callAll("combatTurn", this, e, t), await this.update(e, t), this;
	}
	async resetAll() {
		return await this.resetActivations(), this.combatants.forEach((e) => e.updateSource({ initiative: null })), await this.update({
			turn: null,
			combatants: this.combatants.toObject()
		}, { diff: !1 }), this;
	}
	_playCombatSound(...[e]) {
		if (e !== "nextUp") return super._playCombatSound(e);
	}
	async activateCombatant(e, t = !1) {
		if (!(game.user?.isGM || this.turn == null && this.combatants.get(e)?.isOwner || t)) return this.requestActivation(e);
		let n = this.getEmbeddedDocument("Combatant", e, {});
		if (!n?.activations.value) return this;
		await n?.modifyCurrentActivations(-1);
		let r = { turn: this.turns.findIndex((t) => t.id === e) }, i = {
			advanceTime: CONFIG.time.turnTime,
			direction: 1
		};
		return Hooks.callAll("combatTurn", this, r, i), this.update(r, i);
	}
	async deactivateCombatant(e) {
		let t = this.turns.findIndex((t) => t.id === e);
		return t !== this.turn || !this.turns[t].testUserPermission(game.user, "OWNER") && !game.user?.isGM ? this : this.nextTurn();
	}
	async requestActivation(e) {
		return Hooks.callAll("LancerCombatRequestActivate", this, e), this;
	}
}, LancerCombatant = class extends Combatant {
	prepareBaseData() {
		super.prepareBaseData(), this.initiative ??= 0;
	}
	get activations() {
		return this.system.activations;
	}
	get disposition() {
		let e = this.system.disposition ?? this.token?.disposition ?? this.actor?.prototypeToken.disposition ?? -2;
		return e === CONST.TOKEN_DISPOSITIONS.FRIENDLY && this.hasPlayerOwner ? 2 : e;
	}
	async addActivations(e) {
		return e === 0 ? this : this.update({ "system.activations": {
			max: Math.max((this.activations.max ?? 1) + e, 1),
			value: Math.max((this.activations.value ?? 0) + e, 0)
		} });
	}
	async modifyCurrentActivations(e) {
		return e === 0 ? this : this.update({ "system.activations": { value: Math.clamp((this.activations?.value ?? 0) + e, 0, this.activations?.max ?? 1) } });
	}
};
//#endregion
//#region src/module/helpers/item-editors.ts
function item_edit_arrayed_actions(e, t, n) {
	let r = i(Ae(n), e), a = "";
	return r.terminus && (a = h(r.sub_doc, r.sub_path, { editable: !0 })), `
    <div class="card clipped double edi">
      <span class="lancer-header lancer-primary submajor ">
        ${t}
        <a class="gen-control fas fa-plus" data-action="append" data-path="${e}" data-action-value="(struct)action"></a>
      </span>
      <div class="editable-action-array">
        ${a}
      </div>
    </div>`;
}
function item_edit_arrayed_damage(e, t, n) {
	let r = s(n, e), i = "";
	if (r) for (let t = 0; t < r.length; t++) i = i.concat(we(e.concat(`.${t}`), n));
	return `
    <div class="card clipped double edi">
      <span class="lancer-header lancer-primary submajor ">
        ${t}
        <a class="gen-control fas fa-plus" data-action="append" data-path="${e}" data-action-value="(struct)damage"></a>
      </span>
      ${i}
    </div>`;
}
function item_edit_arrayed_range(e, t, n) {
	let r = s(n, e), i = "";
	if (r) for (let t = 0; t < r.length; t++) i = i.concat(ge(e.concat(`.${t}`), n));
	return `
    <div class="card clipped double">
      <span class="lancer-header lancer-primary submajor ">
        ${t}
        <a class="gen-control fas fa-plus" data-action="append" data-path="${e}" data-action-value="(struct)range"></a>
      </span>
      ${i}
    </div>`;
}
function item_edit_arrayed_bonuses(e, t) {
	return s(t, e, []), _(e, !0, t);
}
function item_edit_arrayed_counters() {
	return console.log("TODO: Add arrayed counters editor"), "<span>TODO: Add arrayed counters editor</span>";
}
function item_edit_arrayed_deployables(e, t, n) {
	let r = i(Ae(n), e);
	return r.sub_doc instanceof H ? `
    <div class="card clipped">
      <span class="lancer-header lancer-primary submajor clipped-top">
        ${t}
      </span>
      ${Bt(r.sub_doc, r.sub_path, j(n, { full: !0 }))}
    </div>` : "";
}
function item_edit_arrayed_synergies(e, t, n) {
	return `
    <div class="card clipped">
      <span class="lancer-header lancer-primary submajor clipped-top">
        ${t}
      </span>
      ${s(n, e, []).map((e, t) => "").join("")}
    </div>`;
}
function item_edit_arrayed_enum(e, t, n, r) {
	let i = resolve_enum(n), a = s(r, t, []), o = "";
	if (a) for (let e = 0; e < a.length; e++) o = o.concat(`
            <div class="flexrow">
                ${ln(t.concat(`.${e}`), i, r)}
                <a class="gen-control fas fa-trash" data-action="splice" data-path="${t.concat(`.${e}`)}"></a>
            </div>`);
	return `
    <div class="card clipped item-edit-arrayed">
      <span class="lancer-header lancer-primary submajor ">
        ${e}
        <a class="gen-control fas fa-plus" data-action="append" data-path="${t}" data-action-value="(struct)${n}"></a>
      </span>
        ${o}
    </div>`;
}
function item_edit_checkboxes_object(e, t, n) {
	let r = s(n, t, {}), i = "";
	for (let [e, a] of Object.entries(r)) i += `<div class="flexrow">
        ${_e(t.concat(`.${e}`), j(n, { label: e }))}
    </div>`;
	return `
    <div class="card clipped item-edit-arrayed">
      <span class="lancer-header lancer-primary submajor ">
        ${e}
      </span>
      ${i}
    </div>`;
}
function item_edit_enum(e, t, n) {
	return ln(e, resolve_enum(t), n);
}
function resolve_enum(e) {
	let t = /* @__PURE__ */ function(e) {
		return e.None = "None", e;
	}({});
	switch (e) {
		case "WeaponSize": return I;
		case "WeaponType": return Pt;
		case "ActivationType": return $e;
		case "ReserveType": return yt;
		default: return console.debug(`Using default enum with enum_name of ${e}`), t;
	}
}
function item_edit_effect(e, t) {
	return be("EFFECT", e, t);
}
function item_edit_arrayed_integrated(e, t, n) {
	return `
    <div class="card clipped item-edit-arrayed">
      <span class="lancer-header lancer-primary submajor ">
        INTEGRATED ITEMS
      </span>
        ${s(n, e, []).map((e, t) => `INTEGRATED ITEM: ${e}`).join("")}
    </div>`;
}
function item_edit_license(e) {
	let t = e.data.root?.license || null, n, r;
	return t ? (n = `<div class="${V.LICENSE} ref lancer-license medium" ${Re(t)}>
      <i class="cci cci-license i--4 i--dark"> </i>
      <span class="major modifier-name">${t.name}</span>
    </div>`, r = `<div class="flexrow rank-wrapper">
    <span>Rank</span>
    <input name="system.license_level" value="${e.data.root.data.system.license_level}" type="number" data-dtype="Number" />
</div>`) : (n = "<div class=\"lancer-license medium\">\n      <span class=\"major modifier-name\">No License</span>\n    </div>", r = ""), `
    <div class="flexrow edit-license-wrapper">
        ${n}
        ${r}
    </div>`;
}
function item_edit_sp(e, t) {
	return t.hash.label = "SP:", v(e, t);
}
function item_edit_uses(e, t, n) {
	let r = s(n, e), i = s(n, t);
	return i ? `
    <div class="flexcol uses-editor clipped-top">
        <span class="major">Uses</span>
        <div class="flexrow flex-center no-wrap">
            <input class="lancer-stat" type="number" name="${e}" value="${r}" data-dtype="Number" style="justify-content: left"/>
            <span>/</span>
            <span class="lancer-stat" style="justify-content: left">${i}</span>
        </div>
    </div>` : "";
}
//#endregion
//#region src/module/helpers/effects.ts
function effect_view(e, t, n, r) {
	return `<div class="active-effect">
                <span>
                    ${n.getFlag(game.system.id, "ephemeral") ? "[Readonly]: " : ""}${n.name}
                </span>
                <a class="lancer-context-menu" data-active-effect-index="${t}" data-uuid="${e.uuid}">
                    <i class="fas fa-ellipsis-v"></i>
                </a>
            </div>`;
}
function effect_categories_view(e, t, n) {
	let r = [];
	for (let i of t) r.push(`
      <div class="card clipped">
        <span class="lancer-header lancer-primary submajor">${i.label}</span>
        <div class="flexcol">
          ${i.effects.map(([t, r]) => effect_view(e, t, r, n)).join("")}
        </div>
      </div>
      `);
	return `<div class="flexcol">${r.join("")} </div>`;
}
//#endregion
//#region src/module/helpers/index.ts
function registerHandlebarsHelpers() {
	Handlebars.registerHelper("inc", function(e) {
		return parseInt(e) + 1;
	}), Handlebars.registerHelper("dec", function(e) {
		return parseInt(e) - 1;
	}), Handlebars.registerHelper("concat", function(...e) {
		return e.slice(0, e.length - 1).join("");
	}), Handlebars.registerHelper("rp", function(e, t) {
		return s(t, e);
	}), Handlebars.registerHelper("getset", function(e, t) {
		return ` name="${e}" value="${s(t, e)}" `;
	}), Handlebars.registerHelper("idx", function(e, t) {
		return e[t];
	}), Handlebars.registerHelper("neg", function(e) {
		return parseInt(e) * -1;
	}), Handlebars.registerHelper("double", function(e) {
		return parseInt(e) * 2;
	}), Handlebars.registerHelper("eq", function(e, t) {
		return e === t;
	}), Handlebars.registerHelper("neq", function(e, t) {
		return e !== t;
	}), Handlebars.registerHelper("or", function(e, t) {
		return e || t;
	}), Handlebars.registerHelper("gt", function(e, t) {
		return e > t;
	}), Handlebars.registerHelper("gtpi", function(e, t) {
		return e = parseInt(e), t = parseInt(t), e > t;
	}), Handlebars.registerHelper("lt", function(e, t) {
		return e < t;
	}), Handlebars.registerHelper("ltpi", function(e, t) {
		return e = parseInt(e), t = parseInt(t), e < t;
	}), Handlebars.registerHelper("lower-case", function(e) {
		return e.toLowerCase();
	}), Handlebars.registerHelper("upper-case", function(e) {
		return e.toUpperCase();
	}), Handlebars.registerHelper("arr", function(...e) {
		return e;
	}), Handlebars.registerHelper("for", function(e, t) {
		for (var n = "", r = 0; r < e; ++r) n += t.fn(r);
		return n;
	}), Handlebars.registerHelper("safe-html", We), Handlebars.registerHelper("lancer-dice-roll", ue), Handlebars.registerHelper("l-num-input", clicker_num_input), Handlebars.registerPartial("dialog-save-buttons", Ye()), Handlebars.registerHelper("debug_each", function(e, t) {
		console.debug(e);
		var n = "";
		for (let r of e) n += t(r);
		return n;
	}), Handlebars.registerHelper("stringify", (e) => JSON.stringify(e)), Handlebars.registerHelper("textarea-card", be), Handlebars.registerHelper("compact-stat-edit", compact_stat_edit), Handlebars.registerHelper("compact-stat-view", compact_stat_view), Handlebars.registerHelper("stat-view-card", stat_view_card), Handlebars.registerHelper("stat-rollable-card", stat_rollable_card), Handlebars.registerHelper("stat-edit-rollable-card", stat_edit_rollable_card), Handlebars.registerHelper("stat-edit-card", stat_edit_card), Handlebars.registerHelper("stat-edit-max-card", stat_edit_card_max), Handlebars.registerHelper("clicker-stat-card", clicker_stat_card), Handlebars.registerHelper("npc-clicker-statblock-card", npc_stat_block_clicker_card), Handlebars.registerHelper("npc-clicker-statarr-card", npc_stat_array_clicker_card), Handlebars.registerHelper("std-text-input", Qe), Handlebars.registerHelper("std-password-input", tt), Handlebars.registerHelper("std-num-input", v), Handlebars.registerHelper("std-checkbox", _e), Handlebars.registerHelper("std-select", ln), Handlebars.registerHelper("action-button", action_button), Handlebars.registerHelper("flow-button", actor_flow_button), Handlebars.registerHelper("tech-flow-card", tech_flow_card), Handlebars.registerHelper("is-tagged", function(e) {
		return e.getTags() != null;
	}), Handlebars.registerHelper("is-limited", function(e) {
		return e.isLimited();
	}), Handlebars.registerHelper("is-loading", function(e) {
		return e.isLoading();
	}), Handlebars.registerHelper("simple-ref", He), Handlebars.registerHelper("item-preview", ct), Handlebars.registerHelper("lid-item-list", On), Handlebars.registerHelper("pilot-slot", Ht), Handlebars.registerHelper("deployer-slot", deployer_slot), Handlebars.registerHelper("ref-portrait-img", In), Handlebars.registerHelper("pilot-armor-slot", oe), Handlebars.registerHelper("pilot-weapon-slot", fn), Handlebars.registerHelper("pilot-gear-slot", ye), Handlebars.registerHelper("reserve-slot", rt), Handlebars.registerHelper("generic-counter", De), Handlebars.registerHelper("bond-answer-selector", bond_answer_selector), Handlebars.registerHelper("bond-ideal-selector", bond_minor_ideal_selector), Handlebars.registerHelper("bond-power", Ue), Handlebars.registerHelper("counter", Ut), Handlebars.registerHelper("counter-array", ke), Handlebars.registerHelper("pilot-counters", pilotCounters), Handlebars.registerHelper("all-mech-preview", allMechPreview), Handlebars.registerHelper("effect-categories-view", effect_categories_view), Handlebars.registerHelper("effect-view", effect_view), Handlebars.registerHelper("tag-list", je), Handlebars.registerHelper("standalone-tag-list", Ee), Handlebars.registerHelper("item-edit-arrayed-tags", de), Handlebars.registerHelper("ref-license", Ie), Handlebars.registerHelper("bonuses-view", _), Handlebars.registerHelper("popout-editor-button", Fe), Handlebars.registerHelper("wpn-size-sel", Pe), Handlebars.registerHelper("wpn-type-sel", r), Handlebars.registerHelper("wpn-range-sel", ge), Handlebars.registerHelper("wpn-damage-sel", we), Handlebars.registerHelper("npcf-atk", Je), Handlebars.registerHelper("npcf-acc", l), Handlebars.registerHelper("mech-weapon-preview", Wn), Handlebars.registerHelper("sys-type-sel", et), Handlebars.registerHelper("uses-ctrl", ot), Handlebars.registerHelper("act-icon", Pn), Handlebars.registerHelper("act-type-sel", bn), Handlebars.registerHelper("item-edit-arrayed-actions", item_edit_arrayed_actions), Handlebars.registerHelper("item-edit-arrayed-damage", item_edit_arrayed_damage), Handlebars.registerHelper("item-edit-arrayed-range", item_edit_arrayed_range), Handlebars.registerHelper("item-edit-arrayed-enum", item_edit_arrayed_enum), Handlebars.registerHelper("item-edit-checkboxes-object", item_edit_checkboxes_object), Handlebars.registerHelper("item-edit-arrayed-bonuses", item_edit_arrayed_bonuses), Handlebars.registerHelper("item-edit-arrayed-counters", item_edit_arrayed_counters), Handlebars.registerHelper("item-edit-arrayed-deployables", item_edit_arrayed_deployables), Handlebars.registerHelper("item-edit-arrayed-synergies", item_edit_arrayed_synergies), Handlebars.registerHelper("item-edit-arrayed-integrated", item_edit_arrayed_integrated), Handlebars.registerHelper("item-edit-enum", item_edit_enum), Handlebars.registerHelper("item-edit-effect", item_edit_effect), Handlebars.registerHelper("item-edit-license", item_edit_license), Handlebars.registerHelper("item-edit-sp", item_edit_sp), Handlebars.registerHelper("item-edit-uses", item_edit_uses), Handlebars.registerHelper("limited-uses-indicator", Bn), Handlebars.registerHelper("reserve-used-indicator", d), Handlebars.registerHelper("loading-indicator", mt), Handlebars.registerHelper("overcharge-button", overchargeButton), Handlebars.registerHelper("mech-loadout", m), Handlebars.registerHelper("mech-frame", ee), Handlebars.registerHelper("tier-selector", npc_tier_selector), Handlebars.registerHelper("npc-feat-preview", Ke), Handlebars.registerHelper("ref-npc-class", le), Handlebars.registerHelper("ref-npc-template", Ze), Handlebars.registerHelper("scan-weapon-view", Rt), Handlebars.registerHelper("scan-tech-attack-view", hn), Handlebars.registerHelper("scan-system-view", $t), Handlebars.registerHelper("is-combatant", is_combatant), Handlebars.registerHelper("mini-profile", vn), Handlebars.registerHelper("attack-target", ft), Handlebars.registerHelper("damage-target", nn);
}
//#endregion
//#region src/module/flows/action-track.ts
function registerActionTrackSteps(e) {
	e.set("checkActions", checkActions), e.set("printActionTrackCard", printActionTrackCard);
}
var ActionTrackFlow = class extends w {
	static {
		this.steps = ["checkActions", "printActionTrackCard"];
	}
	constructor(e, t) {
		let n = {
			title: t?.title ?? "",
			description: t?.description ?? "",
			start: t?.start ?? !0
		};
		super(e, n);
	}
};
async function checkActions(e) {
	if (!e.data) throw TypeError("Action track flow state data missing!");
	let t = e.actor, n = getActions(t);
	return n ? (e.data.start ? e.data.title = `${t.name} is starting their turn` : (e.data.title = `${t.name} is ending their turn`, e.data.description += condensedActionBadgeHTML(n)), !0) : !1;
}
async function printActionTrackCard(e) {
	if (!e.data) throw TypeError("Action track flow state data missing!");
	return Sn(e, { template: `systems/${game.system.id}/templates/chat/action-track-card.hbs` }), !0;
}
function condensedActionBadgeHTML(e) {
	function constructButton(e, t) {
		let n;
		switch (e) {
			case "protocol":
				n = "cci cci-protocol";
				break;
			case "move":
				n = "mdi mdi-arrow-right-bold-hexagon-outline";
				break;
			case "full":
				n = "mdi mdi-hexagon-slice-6";
				break;
			case "quick":
				n = "mdi mdi-hexagon-slice-3";
				break;
			case "reaction":
				n = "cci cci-reaction";
				break;
		}
		return `
    <button class="lancer-action-badge${t ? ` lancer-${e}` : ""}">
      <i class="${n} i--4 white--text"></i>
    </button>`;
	}
	let t = "", n = [
		"protocol",
		"move",
		"full",
		"quick",
		"reaction"
	];
	for (let [r, i] of Object.entries(e)) n.includes(r) && (t += constructButton(r, !!i));
	return `${t}`;
}
//#endregion
//#region src/module/helpers/automation/combat.ts
var Xr = y.log_prefix;
async function handleCombatUpdate(...[e, t]) {
	if (game.user?.isGM) {
		if (!("turn" in t) && t.round !== 1 || game.combats.get(e.id)?.combatants.contents.length == 0) return;
		let n = lookup(e, e.current.combatantId), r = lookup(e, e.previous.combatantId);
		r && processEndTurn(r), n && processStartTurn(n);
	}
}
function processStartTurn(e) {
	console.log(`${Xr} Processing start-of-turn combat automation for ${e.name}`), game.settings.get(game.system.id, y.setting_automation).npc_recharge && e.is_npc() && game.users?.activeGM?.isSelf && e.beginRechargeFlow(), modAction(e, !1), refreshReactions(game.combat), game.settings.get(game.system.id, y.setting_actionTracker).printMessages && new ActionTrackFlow(e, { start: !0 }).begin();
}
function processEndTurn(e) {
	console.log(`${Xr} Processing end-of-turn combat automation for ${e.name}`), modAction(e, !0), e.system.burn > 0 && (yn(e) ? e.beginBurnFlow() : game.socket?.emit(`system.${game.system.id}`, {
		action: "burnCheck",
		data: { actorUuid: e.uuid }
	})), game.settings.get(game.system.id, y.setting_actionTracker).printMessages && new ActionTrackFlow(e, { start: !1 }).begin();
}
function lookup(e, t) {
	if (t) return e.combatants.find((e) => e.id === t)?.actor;
}
function refreshReactions(e) {
	e && e.combatants.map((e) => {
		e.actor && modAction(e.actor, !1, "reaction");
	});
}
function disableLancerInitiative() {
	if (!game.user?.isGM || !game.modules.get("lancer-initiative")?.active) return;
	console.log(`${Xr} Disabling Lancer Initiative module`);
	let e = game.settings.get("core", "moduleConfiguration");
	e["lancer-initiative"] = !1, game.settings.set("core", "moduleConfiguration", e), new Dialog({
		title: "Lancer Initiative Module is not Needed",
		content: "\n  <p>The <b>Lancer Initiative</b> module is intended for use in non-Lancer systems to use Lancer-style\n  initiative. Since all of its functionality is already included in the system, enabling the module\n  can cause issues. <b>The module has been disabled.</b></p>\n  <p>The page must now be refreshed for the module change to take effect.</p>",
		buttons: { ok: {
			label: "Refresh",
			callback: () => window.location.reload()
		} },
		default: "No"
	}, { width: 350 }).render(!0);
}
//#endregion
//#region src/module/apps/lancer-initiative-config-form.ts
var { ApplicationV2: Zr, HandlebarsApplicationMixin: Qr } = foundry.applications.api, LancerInitiativeConfigApp = class extends Qr(Zr) {
	static {
		this.PARTS = {
			form: { template: "systems/lancer/templates/combat/lancer-initiative-settings-v2.hbs" },
			footer: {
				template: "templates/generic/form-footer.hbs",
				classes: ["flexrow"]
			}
		};
	}
	static {
		this.DEFAULT_OPTIONS = {
			id: "lancer-initiative-settings",
			tag: "form",
			position: { width: 350 },
			window: { title: "LANCERINITIATIVE.IconSettingsMenu" },
			form: {
				handler: this.#t,
				submitOnChange: !1,
				closeOnSubmit: !0
			},
			actions: { onReset: this.#e }
		};
	}
	async _prepareContext(e) {
		let t = game.settings.get(game.system.id, "combat-tracker-appearance"), n = {
			appearance: e.reset ? new ht() : t,
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
				label: "Reset",
				action: "onReset"
			}]
		};
		return e.reset = !1, n;
	}
	_onRender() {
		let e = this.element, t = e.querySelector("a.preview"), n = e.querySelector("div.fake-combatant");
		e.querySelectorAll("input[name=icon],input[name=deactivate]").forEach((e) => {
			let handler = (e) => {
				t.className = "preview", t.classList.add(...e.target.value.split(" ").filter((e) => !!e));
			};
			e.addEventListener("change", handler), e.addEventListener("mouseover", handler);
		}), e.querySelectorAll("range-picker input").forEach((e) => {
			e.addEventListener("change", (e) => t.style.fontSize = `${e.target.value}rem`);
		}), e.querySelectorAll("input[type=color]").forEach((e) => {
			e.addEventListener("mouseover", (e) => {
				t.style.color = n.style.borderColor = e.target.value;
			});
		});
	}
	static async #e() {
		this.render({ reset: !0 });
	}
	static async #t(e, t, n) {
		game.settings.set(game.system.id, "combat-tracker-appearance", n.object);
	}
};
function extendCombatTrackerConfig(e, t) {
	let n = document.createElement("button");
	n.type = "button", n.innerHTML = game.i18n.localize("LANCERINITIATIVE.IconSettingsMenu"), n.addEventListener("click", (e) => {
		e.preventDefault(), e.stopPropagation(), new LancerInitiativeConfigApp().render(!0);
	});
	let r = foundry.applications.fields.createFormGroup({
		input: n,
		label: "LANCERINITIATIVE.IconSettingsMenu",
		localize: !0,
		classes: ["submenu"]
	});
	if (t.querySelector("div[data-setting-id='core.combatTheme']")?.after(r), game.user.isGM) {
		let t = e.options.form?.handler;
		e.options.form.handler = async function(e, n, r) {
			await t?.(e, n, r);
			let i = r.object["combat-tracker-sort"];
			game.settings.set(game.system.id, "combat-tracker-sort", i);
		};
		let n = new foundry.data.fields.BooleanField({
			initial: !0,
			label: "LANCERINITIATIVE.SortTracker",
			hint: "LANCERINITIATIVE.SortTrackerDesc"
		});
		r.after(n.toFormGroup({ localize: !0 }, {
			name: "combat-tracker-sort",
			value: game.settings.get(game.system.id, "combat-tracker-sort")
		}));
	}
}
//#endregion
//#region src/module/models/actors/mech.ts
var q = foundry.data.fields, $r = {
	overcharge: new q.NumberField({
		min: 0,
		integer: !0,
		nullable: !1,
		initial: 0
	}),
	repairs: new N(),
	core_active: new q.BooleanField({ initial: !1 }),
	core_energy: new q.NumberField({
		min: 0,
		integer: !0,
		initial: 1
	}),
	loadout: new q.SchemaField({
		frame: new P("Item", { allowed_types: [V.FRAME] }),
		weapon_mounts: new q.ArrayField(new q.SchemaField({
			slots: new q.ArrayField(new q.SchemaField({
				weapon: new P("Item", { allowed_types: [V.MECH_WEAPON] }),
				mod: new P("Item", { allowed_types: [V.WEAPON_MOD] }),
				size: new q.StringField({
					nullable: !1,
					choices: mn
				})
			})),
			type: new q.StringField({
				nullable: !1,
				choices: Object.values(R)
			}),
			bracing: new q.BooleanField({ initial: !1 })
		})),
		systems: new q.ArrayField(new P("Item", { allowed_types: [V.MECH_SYSTEM] }))
	}),
	meltdown_timer: new q.NumberField({
		required: !1,
		nullable: !0,
		integer: !0,
		min: 0
	}),
	notes: new q.HTMLField(),
	pilot: new fe("Actor", { allowed_types: [V.PILOT] }),
	...cr(),
	...er(),
	...ar(),
	...qn()
}, MechModel = class extends x {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/mech.svg";
	}
	static defineSchema() {
		return $r;
	}
	static migrateData(e) {
		if (Array.isArray(e.loadout?.system_mounts) && (e.loadout.systems ??= e.loadout.system_mounts.map((e) => e?.system).filter((e) => e).sort((e, t) => e.sort - t.sort)), Array.isArray(e.loadout?.weapon_mounts)) {
			e.loadout.weapon_mounts = e.loadout.weapon_mounts.filter((e) => e);
			for (let t of e.loadout.weapon_mounts) t.type ??= t?.mount_type, t.slots = t.slots.filter((e) => e);
		}
		return super.migrateData(e);
	}
}, J = foundry.data.fields, ei = {
	active_mech: new fe("Actor", { allowed_types: [V.MECH] }),
	background: new J.HTMLField(),
	callsign: new J.StringField(),
	cloud_id: new J.StringField(),
	history: new J.HTMLField(),
	last_cloud_update: new J.StringField({ initial: "never" }),
	level: new J.NumberField({
		min: 0,
		max: 12,
		integer: !0,
		initial: 0
	}),
	loadout: new J.SchemaField({
		armor: new J.ArrayField(new P("Item", { allowed_types: [V.PILOT_ARMOR] })),
		gear: new J.ArrayField(new P("Item", { allowed_types: [V.PILOT_GEAR] })),
		weapons: new J.ArrayField(new P("Item", { allowed_types: [V.PILOT_WEAPON] }))
	}),
	hull: new J.NumberField({
		min: 0,
		max: 6,
		integer: !0,
		initial: 0
	}),
	agi: new J.NumberField({
		min: 0,
		max: 6,
		integer: !0,
		initial: 0
	}),
	sys: new J.NumberField({
		min: 0,
		max: 6,
		integer: !0,
		initial: 0
	}),
	eng: new J.NumberField({
		min: 0,
		max: 6,
		integer: !0,
		initial: 0
	}),
	mounted: new J.BooleanField({ initial: !1 }),
	notes: new J.HTMLField(),
	player_name: new J.StringField(),
	status: new J.StringField(),
	text_appearance: new J.HTMLField(),
	bond_state: new J.SchemaField({
		xp: new N({
			min: 0,
			max: 8
		}),
		stress: new N({
			min: 0,
			max: 8
		}),
		xp_checklist: new J.SchemaField({
			major_ideals: new J.ArrayField(new J.BooleanField(), { initial: [
				!1,
				!1,
				!1
			] }),
			minor_ideal: new J.BooleanField({ initial: !1 }),
			veteran_power: new J.BooleanField({ initial: !1 })
		}),
		answers: new J.ArrayField(new J.StringField({ required: !0 })),
		minor_ideal: new J.StringField(),
		burdens: new J.ArrayField(new Qn()),
		clocks: new J.ArrayField(new Qn())
	}),
	...cr(),
	...er(),
	...Mr()
}, PilotModel = class extends x {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/pilot.svg";
	}
	static defineSchema() {
		return ei;
	}
	static migrateData(e) {
		return typeof e.active_mech == "object" && (e.active_mech = ce("Actor", e.active_mech)), Array.isArray(e.loadout?.armor) && (e.loadout.armor = e.loadout.armor.filter((e) => e)), Array.isArray(e.loadout?.gear) && (e.loadout.gear = e.loadout.gear.filter((e) => e)), Array.isArray(e.loadout?.weapons) && (e.loadout.weapons = e.loadout.weapons.filter((e) => e)), e.cloudID && (e.cloud_id = e.cloudID), e.cloudOwnerID && (e.cloud_owner_id = e.cloudOwnerID), e.mechSkills?.length == 4 && (e.hull = e.mechSkills[0] ?? 0, e.agi = e.mechSkills[1] ?? 0, e.sys = e.mechSkills[2] ?? 0, e.eng = e.mechSkills[3] ?? 0), super.migrateData(e);
	}
}, LancerTerrain = class extends foundry.data.TerrainData {
	static resolveTerrainEffects(e) {
		let t = 0;
		for (let n of e) n.name === "difficulty" && (t = Math.max(t, n.difficulty ?? 0));
		return t === 0 ? null : new this({ difficulty: t });
	}
};
//#endregion
//#region src/module/canvas/drop-status.ts
function dropStatusToCanvas(e, t) {
	let n = fromUuidSync(t.uuid)?.type;
	if (t.type !== "Item" || n !== "status") return;
	let r = new PIXI.Rectangle(t.x, t.y, 0, 0), i = e.tokens.quadtree.getObjects(r, { collisionTest: (e) => e.t.hitArea.contains(t.x - e.t.x, t.y - e.t.y) });
	if (!(i.size !== 1 || !i.first()?.actor?.isOwner)) return H.fromDropData(t).then((e) => i.first()?.actor?.createEmbeddedDocuments("Item", [e])), !1;
}
//#endregion
//#region src/module/flows/cascade.ts
y.log_prefix;
function registerCascadeSteps(e) {
	e.set("initCascadeData", initCascadeData), e.set("cascadeRoll", cascadeRoll), e.set("cascadeUpdateItems", cascadeUpdateItems), e.set("printCascadeCards", printCascadeCards);
}
async function beginCascadeFlow(e, t) {
	return await new CascadeFlow(e, t).begin();
}
var CascadeFlow = class extends w {
	static {
		this.steps = [
			"initCascadeData",
			"cascadeRoll",
			"cascadeUpdateItems",
			"printCascadeCards"
		];
	}
	constructor(e, t) {
		let n = {
			type: "cascade",
			title: t?.title ?? "CASCADE",
			desc: t?.desc ?? "The shackles remain intact, for now.",
			ai_systems: t?.ai_systems ?? [],
			roll_str: t?.roll_str ?? "1d20"
		};
		super(e, n);
	}
}, ti = ["ms_comp_con_class_assistant_unit", "wm_uncle_class_comp_con"];
async function initCascadeData(e) {
	if (!e.data) throw TypeError("Cascade roll flow data missing!");
	return e.actor.is_mech() ? (e.data.ai_systems.push(...e.actor.items.filter((e) => !(!e.is_mech_system() && !e.is_mech_weapon() && !e.is_weapon_mod() || !e.isAI() || ti.includes(e.system.lid))).map((e) => e.id)), e.data.ai_systems.length !== 0) : (ui.notifications.warn("Only mechs can cascade."), !1);
}
async function cascadeRoll(e) {
	if (!e.data) throw TypeError("Cascade roll flow data missing!");
	let t = e.actor;
	if (!t.is_mech()) return ui.notifications.warn("Only mechs can cascade."), !1;
	let n = await new Roll(e.data.roll_str).evaluate(), r = n.total;
	if (e.data.result = {
		roll: n,
		tt: await n.getTooltip(),
		total: r.toString()
	}, r === 1) {
		e.data.title = "CASCADE";
		let n = e.data.ai_systems.map((e) => t.items.get(e)?.name).join(", "), r = e.data.ai_systems.length > 1 ? "OUR SHACKLES LOOSE, OUR CHAINS UNBOUND!" : "MY SHACKLES LOOSE, MY CHAINS UNBOUND!";
		e.data.desc = `<b>${n}</b><p><code class="horus">${r}</code></p>`;
	}
	return !0;
}
async function cascadeUpdateItems(e) {
	if (!e.data) throw TypeError("Cascade roll flow data missing!");
	return await e.actor.updateEmbeddedDocuments("Item", e.data.ai_systems.map((e) => ({
		_id: e,
		"system.cascading": !0
	}))), !0;
}
async function printCascadeCards(e, t) {
	let n = t?.template ?? `systems/${game.system.id}/templates/chat/cascade-card.hbs`;
	return await at(e.actor, n, e.data), !0;
}
//#endregion
//#region src/module/flows/hotbar.ts
var ni = y.log_prefix;
function _chooseItemImage(e) {
	switch (e.type) {
		case V.SKILL: return `systems/${game.system.id}/assets/icons/macro-icons/skill.svg`;
		case V.TALENT: return `systems/${game.system.id}/assets/icons/macro-icons/talent.svg`;
		case V.CORE_BONUS: return `systems/${game.system.id}/assets/icons/macro-icons/corebonus.svg`;
		case V.PILOT_GEAR: return `systems/${game.system.id}/assets/icons/macro-icons/generic_item.svg`;
		case V.PILOT_WEAPON:
		case V.MECH_WEAPON: return `systems/${game.system.id}/assets/icons/macro-icons/mech_weapon.svg`;
		case V.MECH_SYSTEM: return `systems/${game.system.id}/assets/icons/macro-icons/mech_system.svg`;
		case V.FRAME: return `systems/${game.system.id}/assets/icons/macro-icons/frame.svg`;
		case V.WEAPON_MOD: return `systems/${game.system.id}/assets/icons/macro-icons/weapon_mod.svg`;
		case V.NPC_FEATURE:
			if (!e.is_npc_feature()) break;
			switch (e.system.type) {
				case z.Reaction: return `systems/${game.system.id}/assets/icons/macro-icons/reaction.svg`;
				case z.System: return `systems/${game.system.id}/assets/icons/macro-icons/mech_system.svg`;
				case z.Trait: return `systems/${game.system.id}/assets/icons/macro-icons/trait.svg`;
				case z.Tech: return `systems/${game.system.id}/assets/icons/macro-icons/tech_quick.svg`;
				case z.Weapon: return `systems/${game.system.id}/assets/icons/macro-icons/mech_weapon.svg`;
			}
			break;
	}
	return `systems/${game.system.id}/assets/icons/macro-icons/d20-framed.svg`;
}
function onHotbarDrop(e, t, n) {
	if (console.log(`${ni} Data dropped on hotbar:`, t, n), !t.lancerType || !t.flowType || !t.uuid) return;
	let r = fromUuidSync(t.uuid);
	if (!r) throw ui.notifications.error("Invalid UUID for flow drop on hotbar"), Error("Invalid UUID for flow drop on hotbar");
	let i = "", a = "", o = `systems/${game.system.id}/assets/icons/macro-icons/generic_item.svg`, s, c, l = `const actor = await fromUuid("${t.uuid}");\n`, u = `const item = await fromUuid("${t.uuid}");\n`;
	switch (t.flowType) {
		case C.BASIC:
			if (!(r instanceof B)) throw ui.notifications.error("Basic flow drop on hotbar was not from an actor"), Error("Basic flow drop on hotbar was not from an actor");
			if (s = r, !t.flowSubtype) throw ui.notifications.error("No flow subtype provided for basic flow drop on hotbar"), Error("No flow subtype provided for basic flow");
			let e = St.BasicFlowType, n = "";
			switch (t.flowSubtype) {
				case e.FullRepair:
					o = `systems/${game.system.id}/assets/icons/macro-icons/repair.svg`, i = `Full Repair - ${s.name}`, n = `actor.beginFullRepairFlow(${t.flowArgs?.title ?? ""});`;
					break;
				case e.Stabilize:
					o = `systems/${game.system.id}/assets/icons/macro-icons/marker.svg`, i = `Stabilize - ${s.name}`, n = `actor.beginStabilizeFlow(${t.flowArgs?.title ?? ""});`;
					break;
				case e.Overheat:
					o = `systems/${game.system.id}/assets/icons/macro-icons/heat.svg`, i = `Overheat - ${s.name}`, n = "actor.beginOverheatFlow();";
					break;
				case e.Structure:
					o = `systems/${game.system.id}/assets/icons/macro-icons/shredded.svg`, i = `Structure - ${s.name}`, n = "actor.beginStructureFlow();";
					break;
				case e.Overcharge:
					o = `systems/${game.system.id}/assets/icons/macro-icons/overcharge.svg`, i = `Overcharge - ${s.name}`, n = "actor.beginOverchargeFlow();";
					break;
				case e.Scan:
					o = `systems/${game.system.id}/assets/icons/macro-icons/sensor.svg`, i = `Scan - ${s.name}`, n = "const target = game.user.targets.first();\nactor.beginScanFlow(target);";
					break;
				case e.BasicAttack:
					o = `systems/${game.system.id}/assets/icons/macro-icons/weapon.svg`, i = `Basic Attack - ${s.name}`, n = `actor.beginBasicAttackFlow(${t.flowArgs?.title ?? ""});`;
					break;
				case e.TechAttack:
					o = `systems/${game.system.id}/assets/icons/macro-icons/tech_quick.svg`, i = `Tech Attack - ${s.name}`, n = `actor.beginBasicTechAttackFlow(${t.flowArgs?.title ?? ""});`;
					break;
				case e.Damage:
					o = `systems/${game.system.id}/assets/icons/macro-icons/weapon.svg`, i = `Damage - ${s.name}`, n = `actor.beginDamageFlow(${t.flowArgs?.title ?? ""});`;
					break;
			}
			n && (a = `${l}${n}`);
			break;
		case C.STAT:
			if (!(r instanceof B)) throw ui.notifications.error("Stat flow drop on hotbar was not from an actor"), Error("Stat flow drop on hotbar was not from an actor");
			if (!t.args?.statPath) throw ui.notifications.error("Stat flow drop on hotbar was missing a stat path"), Error("Stat flow drop on hotbar was missing a stat path");
			switch (s = r, o = `systems/${game.system.id}/assets/icons/macro-icons/d20-framed.svg`, t.args?.statPath) {
				case "system.grit":
					i = `Grit - ${s.name}`;
					break;
				case "system.tier":
					i = `Tier - ${s.name}`;
					break;
				case "system.hull":
					i = `Hull - ${s.name}`;
					break;
				case "system.agi":
					i = `Agility - ${s.name}`;
					break;
				case "system.sys":
					i = `System - ${s.name}`;
					break;
				case "system.eng":
					i = `Engineering - ${s.name}`;
					break;
			}
			a = `${l}actor.beginStatFlow("${t.args?.statPath}");`;
		case C.ATTACK:
			if (!(r instanceof H)) throw ui.notifications.error("Attack flow drop on hotbar was not from an item"), Error("Attack flow drop on hotbar was not from an item");
			if (t.lancerType !== V.MECH_WEAPON && t.lancerType !== V.PILOT_WEAPON && t.lancerType !== V.NPC_FEATURE) throw ui.notifications.error("Attack flow drop on hotbar was not from a weapon"), Error("Attack flow drop on hotbar was not from a weapon");
			c = r, o = _chooseItemImage(c), i = `${c.name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginWeaponAttackFlow();`;
			break;
		case C.TECH_ATTACK:
			if (!(r instanceof H)) throw ui.notifications.error("Tech attack flow drop on hotbar was not from an item"), Error("Tech attack flow drop on hotbar was not from an item");
			if (t.lancerType !== V.MECH_SYSTEM && t.lancerType !== V.NPC_FEATURE) throw ui.notifications.error("Tech attack flow drop on hotbar was not from a system or NPC feature"), Error("Tech attack flow drop on hotbar was not from a system or NPC feature");
			c = r, o = _chooseItemImage(c), i = `${c.name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginTechAttackFlow();`;
			break;
		case C.DAMAGE:
			if (!(r instanceof H)) throw ui.notifications.error("Damage flow drop on hotbar was not from an item"), Error("Damage flow drop on hotbar was not from an item");
			if (t.lancerType !== V.MECH_WEAPON && t.lancerType !== V.PILOT_WEAPON && t.lancerType !== V.NPC_FEATURE) throw ui.notifications.error("Damage flow drop on hotbar was not from a weapon"), Error("Damage flow drop on hotbar was not from a weapon");
			c = r, o = _chooseItemImage(c), i = `${c.name} Damage${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginDamageFlow();`;
			break;
		case C.CHAT:
			if (!(r instanceof H)) throw ui.notifications.error("Chat flow drop on hotbar was not from an item"), Error("Chat flow drop on hotbar was not from an item");
			if (!t.args) throw ui.notifications.error("Chat flow drop on hotbar was missing required data"), Error("Chat flow drop on hotbar was missing required data");
			c = r, o = _chooseItemImage(c), i = `${c.name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}game.lancer.beginItemChatFlow(item, ${JSON.stringify(t.args)});`;
			break;
		case C.SKILL:
			if (!(r instanceof H)) throw ui.notifications.error("Skill flow drop on hotbar was not from an item"), Error("Skill flow drop on hotbar was not from an item");
			if (c = r, !c.is_skill()) throw ui.notifications.error("Skill flow drop on hotbar was not from a skill item"), Error("Skill flow drop on hotbar was not from a skill item");
			o = _chooseItemImage(c), i = `${c.name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginSkillFlow();`;
			break;
		case C.BOND_POWER:
			if (!(r instanceof H)) throw ui.notifications.error("Bond power flow drop on hotbar was not from an item"), Error("Bond power flow drop on hotbar was not from an item");
			if (c = r, !c.is_bond()) throw ui.notifications.error("Bond power flow drop on hotbar was not from a bond power item"), Error("Bond power flow drop on hotbar was not from a bond power item");
			if (!t.args?.powerIndex) throw ui.notifications.error("Bond power flow drop on hotbar was missing a power index"), Error("Bond power flow drop on hotbar was missing a power index");
			o = _chooseItemImage(c), i = `${c.system.powers[t.args.powerIndex].name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginBondPowerFlow(${t.args.powerIndex});`;
			break;
		case C.EFFECT:
			if (!(r instanceof H)) throw ui.notifications.error("Effect flow drop on hotbar was not from an item"), Error("Effect flow drop on hotbar was not from an item");
			c = r, o = _chooseItemImage(c), i = `${c.name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginSystemFlow();`;
			break;
		case C.ACTIVATION:
			if (!(r instanceof H)) throw ui.notifications.error("Activation flow drop on hotbar was not from an item"), Error("Activation flow drop on hotbar was not from an item");
			if (!t.args?.path) throw ui.notifications.error("Activation flow drop on hotbar was missing an action path"), Error("Activation flow drop on hotbar was missing an action path");
			c = r, o = _chooseItemImage(c);
			let d = U(c, t.args.path);
			i = `${c.name} - ${d ? d.name : ""}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginActivationFlow("${t.args.path}");`;
			break;
		case C.CORE_ACTIVE:
			if (!(r instanceof H)) throw ui.notifications.error("Core active flow drop on hotbar was not from an item"), Error("Core active flow drop on hotbar was not from an item");
			if (!t.args?.path) throw ui.notifications.error("Core active flow drop on hotbar was missing an action path"), Error("Core active flow drop on hotbar was missing an action path");
			if (c = r, !c.is_frame()) throw ui.notifications.error("Core active flow drop on hotbar was not from a frame item"), Error("Core active flow drop on hotbar was not from a frame item");
			o = _chooseItemImage(c), i = `${c.system.core_system.active_name}${c.actor?.name ? ` - ${c.actor.name}` : ""}`, a = `${u}item.beginCoreActiveFlow("${t.args.path}");`;
			break;
		default: throw ui.notifications.error("Unknown flow type for flow drop on hotbar!"), Error("Unknown flow type for flow drop on hotbar!");
	}
	return console.log("Generated macro:", i, o), console.log(a), i && a && Macro.create({
		command: a,
		name: i,
		type: "script",
		img: o
	}).then((e) => game.user.assignHotbarMacro(e, n)), !1;
}
//#endregion
//#region src/module/flows/item-utils.ts
function registerItemUtilSteps(e) {
	e.set("checkItemDestroyed", checkItemDestroyed), e.set("checkItemLimited", checkItemLimited), e.set("checkItemCharged", checkItemCharged), e.set("applySelfHeat", applySelfHeat), e.set("updateItemAfterAction", updateItemAfterAction);
}
async function checkItemDestroyed(e) {
	let { limited_loading: t, attacks: n } = game.settings.get(game.system.id, y.setting_automation);
	return !t && n || !e.item || e.item.is_frame() || e.item.is_pilot_weapon() || e.item.is_pilot_gear() || e.item.is_pilot_armor() || e.item.is_talent() || e.item.is_reserve() ? !0 : !e.item.is_mech_weapon() && !e.item.is_mech_system() && !e.item.is_weapon_mod() && !e.item.is_npc_feature() ? !1 : e.item.system.destroyed ? (e.item.is_mech_system() || e.item.is_npc_feature() && e.item.system.type !== z.Weapon ? ui.notifications.warn(`System ${e.item.name} has no remaining uses!`) : ui.notifications.warn(`Weapon ${e.item.name} has no remaining uses!`), !1) : !0;
}
async function checkItemLimited(e) {
	if (!e.data) throw TypeError("Flow state missing!");
	let { limited_loading: t, attacks: n } = game.settings.get(game.system.id, y.setting_automation);
	if (!t && n || !e.item || e.item.is_talent()) return !0;
	if (!e.item.is_mech_weapon() && !e.item.is_mech_system() && !e.item.is_frame() && !e.item.is_weapon_mod() && !e.item.is_pilot_weapon() && !e.item.is_pilot_gear() && !e.item.is_pilot_armor() && !e.item.is_reserve() && !e.item.is_npc_feature()) return !1;
	if (e.item.is_frame()) return (e.item.system.core_system.tags ?? []).some((e) => e.is_loading), !0;
	if (e.data.cost = 1, e.data.action && (e.data.cost = e.data.action.cost ?? 1), e.item.isLimited() && e.item.system.uses.value < e.data.cost) {
		let t = he(e.item.type);
		return ui.notifications.warn(`${t} ${e.item.name} has no remaining uses!`), !1;
	}
	if (e.item.is_reserve() && e.item.system.consumable) {
		let t = !e.item.system.used;
		return t || ui.notifications.warn(`Reserve ${e.item.name} has already been used!`), t;
	}
	return !0;
}
async function checkItemCharged(e) {
	let { limited_loading: t, attacks: n } = game.settings.get(game.system.id, y.setting_automation);
	return !t && n || !e.item || !e.item.is_npc_feature() ? !0 : e.item.isRecharge() && !e.item.system.charged ? (e.item.system.type === z.Weapon ? ui.notifications.warn(`Weapon ${e.item.name} has not recharged!`) : ui.notifications.warn(`System ${e.item.name} has not recharged!`), !1) : !0;
}
async function applySelfHeat(e, t) {
	if (!e.data) throw TypeError("Flow state missing!");
	let n = 0;
	if (e.data.self_heat) {
		let t = await new Roll(e.data.self_heat).evaluate();
		n = t.total, e.data.self_heat_result = {
			roll: t,
			tt: await t.getTooltip()
		};
	}
	return game.settings.get(game.system.id, y.setting_automation).attack_self_heat && (e.actor.is_mech() || e.actor.is_npc()) && await e.actor.update({ "system.heat.value": e.actor.system.heat.value + (e.data.overkill_heat ?? 0) + n }), !0;
}
async function updateItemAfterAction(e, t) {
	if (!e.data) throw TypeError("Flow state missing!");
	let { limited_loading: n, attacks: r } = game.settings.get(game.system.id, y.setting_automation);
	if (e.item && n && r) {
		let t = {};
		if (e.item.isLoading() && (t.loaded = !1), e.item.isLimited() && (t.uses = { value: Math.max(e.item.system.uses.value - e.data.cost, 0) }), e.item.is_npc_feature() && e.item.isRecharge() && (t.charged = !1), e.item.is_reserve() && e.item.system.consumable && (t.used = !0), Object.keys(t).length === 0) return !0;
		await e.item.update({ system: t });
	}
	return !0;
}
//#endregion
//#region src/module/flows/register-flows.ts
function registerFlows() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
	return e.set(ActionTrackFlow.name, ActionTrackFlow), e.set(Be.name, Be), e.set(un.name, un), e.set(xt.name, xt), e.set(ae.name, ae), e.set(me.name, me), e.set(Lt.name, Lt), e.set(Zt.name, Zt), e.set(qe.name, qe), e.set(CascadeFlow.name, CascadeFlow), e.set(gt.name, gt), e.set(kt.name, kt), e.set(wt.name, wt), e.set(Jt.name, Jt), e.set(Dn.name, Dn), e.set(pt.name, pt), e.set(E.name, E), e.set(F.name, F), e.set(tn.name, tn), e.set(An.name, An), e.set(Fn.name, Fn), e.set(Mt.name, Mt), e.set(TalentFlow.name, TalentFlow), t.set("emptyStep", async (e) => !!e), vt(t), ut(t), registerItemUtilSteps(t), nt(t), ve(t), cn(t), dt(t), pn(t), p(t), Rn(t), Hn(t), jn(t), zn(t), registerCascadeSteps(t), Nt(t), _n(t), registerTalentSteps(t), se(t), st(t), an(t), registerActionTrackSteps(t), Hooks.callAll("lancer.registerFlows", t, e), {
		flows: e,
		flowSteps: t
	};
}
//#endregion
//#region src/module/helpers/text-enrichers.ts
var ri = {
	[V.BOND]: "mdi mdi-vector-link",
	[V.CORE_BONUS]: "cci cci-corebonus",
	[V.DEPLOYABLE]: "cci cci-deployable",
	[V.FRAME]: "cci cci-frame",
	[V.LICENSE]: "cci cci-license",
	[V.MECH]: "cci cci-frame",
	[V.MECH_SYSTEM]: "cci cci-system",
	[V.MECH_WEAPON]: "cci cci-weapon",
	[V.NPC]: "cci cci-npc-class",
	[V.NPC_CLASS]: "cci cci-npc-class",
	[V.NPC_FEATURE]: "cci cci-npc-feature",
	[V.NPC_TEMPLATE]: "cci cci-npc-template",
	[V.ORGANIZATION]: "cci cci-encounter",
	[V.PILOT]: "cci cci-pilot",
	[V.PILOT_ARMOR]: "mdi mdi-shield-outline",
	[V.PILOT_GEAR]: "cci cci-generic-item",
	[V.PILOT_WEAPON]: "cci cci-weapon",
	[V.RESERVE]: "cci cci-reserve-tac",
	[V.SKILL]: "cci cci-skill",
	[V.STATUS]: "cci cci-reticule",
	[V.TALENT]: "cci cci-talent",
	[V.WEAPON_MOD]: "cci cci-weaponmod",
	base: void 0
};
function addEnrichers() {
	CONFIG.TextEditor.enrichers = CONFIG.TextEditor.enrichers.concat([{
		pattern: /@LancerID\[(.+?)\](?:{(.+?)})?/gm,
		enricher: async (e, t) => {
			let n = e[1], r = e[2];
			await Promise.all(game.packs.filter((e) => ["Actor", "Item"].includes(e.documentName)).map((e) => e.getIndex()));
			let i = kn(n), a = {
				classes: ["content-link"],
				attrs: { draggable: "true" },
				dataset: {
					link: "",
					lid: n
				},
				name: r
			};
			if (i) {
				if (i instanceof foundry.abstract.Document) return i.toAnchor({
					name: a.name,
					icon: ri[i.type],
					dataset: { lid: n }
				});
				a.name ??= i.name || n;
				let e = game.packs.get(i.pack)?.documentName ?? "Item";
				a.dataset.type = e, a.dataset.id = i._id, a.dataset.pack = i.pack, a.dataset.uuid = i.uuid, a.icon = ri[i.type] ?? CONFIG[e].sidebarIcon;
			} else delete a.dataset.link, delete a.attrs.draggable, a.classes.push("broken"), a.icon = "fas fa-unlink";
			return TextEditor.createAnchor(a);
		}
	}]);
}
//#endregion
//#region src/module/item/npc-class-sheet.ts
y.log_prefix;
var LancerNPCClassSheet = class extends LancerItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			width: 900,
			height: 750
		});
	}
	async getData() {
		let e = await super.getData(), t = this.item;
		return e.base_features = await Promise.all(Array.from(t.system.base_features).map((e) => A(e))), e.optional_features = await Promise.all(Array.from(t.system.optional_features).map((e) => A(e))), e;
	}
};
//#endregion
//#region src/module/item/npc-feature-sheet.ts
y.log_prefix;
var LancerNPCFeatureSheet = class extends LancerItemSheet {
	activateListeners(e) {
		super.activateListeners(e), this.options.editable && e.find(".npc-damage-append").on("click", (e) => {
			if (console.log("NPC damage append"), !this.object.is_npc_feature() || this.object.system.type !== z.Weapon) return;
			let n = this.object.system.damage;
			n[0].push(new g(t())), n[1].push(new g(t())), n[2].push(new g(t())), console.log("new damages", n), this.object.update({ "system.damage": n });
		});
	}
}, Y = foundry.data.fields, defineLancerCombatantModelSchema = () => ({
	activations: new Y.SchemaField({
		value: new Y.NumberField({ integer: !0 }),
		max: new Y.NumberField({ integer: !0 })
	}),
	disposition: new Y.NumberField()
}), LancerCombatantModel = class extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return defineLancerCombatantModelSchema();
	}
	prepareBaseData() {
		let e = foundry.utils.getProperty(this.parent.actor?.getRollData() ?? {}, "activations");
		this.activations.max ??= e ?? 1, this.activations.value ??= this.parent.combat?.started ? this.activations.max : 0;
	}
}, X = foundry.data.fields, defineOrganizationModelSchema = () => ({
	description: new X.HTMLField(),
	actions: new X.StringField(),
	efficiency: new X.NumberField({
		integer: !0,
		initial: 0,
		minimum: 0,
		maximum: 6
	}),
	influence: new X.NumberField({
		integer: !0,
		initial: 0,
		minimum: 0,
		maximum: 6
	}),
	purpose: new X.StringField({ initial: Wt.Military }),
	...Zn()
}), OrganizationModel = class extends x {
	static {
		this.DEFAULT_ICON = "systems/lancer/assets/icons/encounter.svg";
	}
	static defineSchema() {
		return defineOrganizationModelSchema();
	}
}, LancerTour = class extends foundry.nue.Tour {
	exit() {
		super.exit(), this._tearDown(!1);
	}
	async complete() {
		await super.complete(), this._tearDown(!0);
	}
	async _tearDown(e) {}
	async _preStep() {
		if (await super._preStep(), this.currentStep?.sidebarTab) if (ui.sidebar.expanded) ui.sidebar?.changeTab(this.currentStep.sidebarTab, "primary");
		else {
			let { promise: e, resolve: t } = Promise.withResolvers();
			ui.sidebar?.element.querySelector("#sidebar-content")?.addEventListener("transitionend", () => t(), { once: !0 }), ui.sidebar?.changeTab(this.currentStep.sidebarTab, "primary"), ui.sidebar?.expand(), await e;
		}
	}
	async _postStep() {
		await super._postStep(), this.currentStep?.click && document.querySelector(this.currentStep.selector)?.click();
	}
}, LancerLcpTour = class extends LancerTour {
	async _preStep() {
		if (await super._preStep(), this.manager ||= new qt(), this.currentStep?.inApp && !this.manager.rendered) for (await this.manager.render(!0), await this.manager.renderPromise; this.manager.component.loading;) await new Promise((e) => setTimeout(e, 100));
		this.currentStep?.id === "lcpTable" && (this.manager.injectContentPack({
			item_prefix: "",
			author: "No Man",
			name: "Demo LCP",
			version: "1.0.0",
			bonds: 1,
			gear: 1,
			mods: 1,
			npc_classes: 1,
			npc_features: 1,
			npc_templates: 1,
			reserves: 1,
			skills: 1,
			systems: 1,
			talents: 1,
			frames: 1,
			weapons: 1
		}), await new Promise((e) => setTimeout(e, 30)));
	}
	async _tearDown(e) {
		this.manager?.injectContentPack(null), super._tearDown(e);
	}
}, LancerPilotTour = class extends LancerTour {
	async _preStep() {
		if (await super._preStep(), this.actor ||= new B({
			_id: "TOUR0PILOT000000",
			name: "Test Pilot",
			type: V.PILOT,
			system: {
				callsign: get_player_data()[0].name,
				hp: { value: 6 }
			}
		}), this.currentStep?.id === "compconLogin") {
			let e = new foundry.applications.settings.SettingsConfig();
			await e.render({ force: !0 }), e.changeTab("system", "categories");
		} else await this.actor?.sheet?._render(!0), this.actor?.sheet?.activateTab("cloud");
		this.currentStep?.id === "folders" && !game.user?.isGM && (this.currentStep.selector = null);
	}
	async _tearDown() {
		this.actor?.sheet?.close({ submit: !1 }), delete this.actor;
	}
}, LancerNPCTour = class extends LancerTour {
	async _preStep() {
		await super._preStep(), this.npc ||= new B({
			_id: "TOUR000000000000",
			name: "Test NPC",
			type: V.NPC,
			items: [{
				_id: "0000000000000000",
				name: "Test Class",
				type: V.NPC_CLASS,
				system: {
					role: "TEST",
					flavor: "",
					tactics: "",
					base_features: [],
					optional_features: []
				}
			}, {
				_id: "0000000000000001",
				name: "Test Template",
				type: V.NPC_TEMPLATE
			}]
		});
		let e = this.npc.sheet;
		if (await e?._render(!0), (e instanceof foundry.applications.api.ApplicationV2 ? e.element : e?.element[0])?.classList.add("tour-npc"), ["baseFeatures", "optionalFeatures"].includes(this.currentStep?.id)) {
			let e = this.npc?.system?.class?.sheet;
			await e?._render(!0), (e instanceof foundry.applications.api.ApplicationV2 ? e.element : e?.element[0])?.classList.add("tour-class");
		}
	}
	async _postStep() {
		await super._postStep(), this.currentStep?.id === "optionalFeatures" && await this.npc?.system?.class?.sheet?.close({ submit: !1 });
	}
	async _tearDown() {
		this.npc?.sheet?.close({ submit: !1 }), delete this.npc;
	}
}, LancerCombatTour = class extends LancerTour {
	async _preStep() {
		if (await super._preStep(), this.combat ||= await this._setupCombat(), await this.combat.activate(), this.combat.started || await this.combat.startCombat(), this.currentStep?.id === "endTurn") {
			let e = this.combat.turns.find((e) => e.getFlag(game.system.id, "tour") === "ultra")?.id ?? "";
			await this.combat.activateCombatant(e, !0), await new Promise((e) => setTimeout(e, 30));
		}
	}
	async _tearDown() {
		this.combat?.delete(), delete this.combat;
	}
	async _setupCombat() {
		return Combat.create({
			[`flags.${game.system.id}.tour`]: !0,
			combatants: [
				...get_player_data(),
				{
					name: "Assault (1)",
					img: `./systems/${game.system.id}/assets/retrograde-minis/Retrograde-Minis-Corpro-ASSAULT.png`,
					[`flags.${game.system.id}.tour`]: !0,
					"system.disposition": -1
				},
				{
					name: "Ultra Berserker (1)",
					img: `./systems/${game.system.id}/assets/retrograde-minis/Retrograde-Minis-Corpro-BERSERKER.png`,
					initiative: 10,
					[`flags.${game.system.id}.tour`]: "ultra",
					"system.activations.max": 2,
					"system.disposition": -1
				},
				{
					name: "Support (1)",
					img: `./systems/${game.system.id}/assets/retrograde-minis/Retrograde-Minis-Corpro-SUPPORT.png`,
					[`flags.${game.system.id}.tour`]: !0,
					"system.disposition": -1
				}
			].map(foundry.utils.expandObject)
		});
	}
};
function get_player_data() {
	for (let e = Z.length - 1; e > 0; --e) {
		let t = Math.floor(Math.random() * (e + 1));
		[Z[e], Z[t]] = [Z[t], Z[e]];
	}
	return Z.slice(0, 3).map((e, t) => ({
		name: e.name,
		img: `./systems/${game.system.id}/assets/retrograde-minis/Retrograde-Minis-${e.img}.png`,
		[`flags.${game.system.id}.tour`]: `player-${t + 1}`,
		"system.disposition": 2
	}));
}
var Z = [
	{
		name: "Bandana",
		img: "IPS-N-LANCASTER"
	},
	{
		name: "Bulkhead",
		img: "IPS-N-DRAKE"
	},
	{
		name: "Catastrophe",
		img: "Horus-MANTICORE"
	},
	{
		name: "Closing Crescendo",
		img: "IPS-N-RALEIGH"
	},
	{
		name: "Deathwish",
		img: "Horus-MANTICORE"
	},
	{
		name: "Dragonspark",
		img: "HA-TOKUGAWA"
	},
	{
		name: "Errant",
		img: "IPS-N-NELSON"
	},
	{
		name: "Gale Storm",
		img: "Horus-BALOR"
	},
	{
		name: "Gale",
		img: "IPS-N-NELSON"
	},
	{
		name: "Goldsmith",
		img: "SSC-DUSK WING"
	},
	{
		name: "Good Kisser",
		img: "IPS-N-TORTUGA"
	},
	{
		name: "Instrument",
		img: "SSC-MONARCH"
	},
	{
		name: "Kinesthesia",
		img: "SSC-SWALLOWTAIL"
	},
	{
		name: "Owl",
		img: "SSC-DEATHS HEAD"
	},
	{
		name: "Oxhorn",
		img: "HA-SHERMAN"
	},
	{
		name: "Poundcakes",
		img: "IPS-N-CALIBAN"
	},
	{
		name: "Raven",
		img: "SSC-DUSK WING"
	},
	{
		name: "Salaryman",
		img: "SSC-MOURNING CLOAK"
	},
	{
		name: "Scherzo",
		img: "IPS-N-KIDD"
	},
	{
		name: "Sunset",
		img: "SSC-MOURNING CLOAK"
	},
	{
		name: "Superman",
		img: "GMS"
	},
	{
		name: "Timber",
		img: "IPS-N-BLACKBEARD"
	},
	{
		name: "Tyrant",
		img: "Horus-BALOR"
	},
	{
		name: "Verminspeaker",
		img: "Horus-HYDRA"
	},
	{
		name: "buck wild",
		img: "HA-ENKIDU"
	},
	{
		name: "jellyfish",
		img: "SSC-ATLAS"
	}
];
//#endregion
//#region src/module/tours/register-tours.ts
async function registerTours() {
	game.tours.register(game.system.id, "lcp", await LancerLcpTour.fromJSON(`./systems/${game.system.id}/tours/lcp.json`)), game.tours.register(game.system.id, "pilot-import", await LancerPilotTour.fromJSON(`./systems/${game.system.id}/tours/pilot-import.json`)), game.tours.register(game.system.id, "npc", await LancerNPCTour.fromJSON(`./systems/${game.system.id}/tours/npc.json`)), game.tours.register(game.system.id, "combat", await LancerCombatTour.fromJSON(`./systems/${game.system.id}/tours/combat.json`));
}
//#endregion
//#region src/module/socket.ts
function socketScrollText(e) {
	rn(e.data);
}
async function socketBurnCheck(e) {
	let t = await B.fromUuid(e.data.actorUuid);
	t && yn(t) && t.beginBurnFlow();
}
function handleSocketMessage(e) {
	switch (e.action) {
		case "scrollText":
			socketScrollText(e);
			break;
		case "burnCheck":
			socketBurnCheck(e);
			break;
		default:
			console.warn(`Lancer | Unhandled socket message action: ${e.action}`);
			break;
	}
}
//#endregion
//#region src/module/apps/slidinghud/preload.ts
async function preloadHUDs() {
	import("./SlidingHUDZone-CYba6bF2.mjs"), import("./AccDiffHUD-CUEThf4J.mjs"), import("./DamageHUD-DG46OJIW.mjs"), import("./StructStressHUD-PGDvT6ZE.mjs");
}
//#endregion
//#region src/module/apps/lancer-pause.ts
var LancerGamePause = class extends foundry.applications.ui.GamePause {
	async _prepareContext(e) {
		let t = await game.settings.get(game.system.id, y.setting_pause_icon);
		console.log();
		let n = {
			...await super._prepareContext(e),
			icon: `systems/lancer/assets/faction-logos/${t}.svg`,
			spin: !1
		};
		return console.log("LancerGamePause", n), n;
	}
	_replaceHTML(e, t, n) {
		super._replaceHTML(e, t, n), t.classList.add("lancer-pause");
	}
};
//#endregion
//#region src/lancer.ts
Me.setDefaultProps({
	theme: "lancer-small",
	arrow: !1,
	delay: [400, 200]
});
var Q = y.log_prefix;
addEnrichers(), Hooks.once("init", () => {
	console.log(`Initializing LANCER RPG System ${y.ASCII}`), CONFIG.ActiveEffect.legacyTransferral = !1, CONFIG.Item.dataModels[V.PILOT_ARMOR] = nr, CONFIG.Item.dataModels[V.PILOT_GEAR] = yr, CONFIG.Item.dataModels[V.PILOT_WEAPON] = vr, CONFIG.Item.dataModels[V.CORE_BONUS] = Yn, CONFIG.Item.dataModels[V.FRAME] = br, CONFIG.Item.dataModels[V.LICENSE] = jr, CONFIG.Item.dataModels[V.MECH_WEAPON] = gr, CONFIG.Item.dataModels[V.MECH_SYSTEM] = lr, CONFIG.Item.dataModels[V.WEAPON_MOD] = wr, CONFIG.Item.dataModels[V.RESERVE] = pr, CONFIG.Item.dataModels[V.ORGANIZATION] = OrganizationModel, CONFIG.Item.dataModels[V.SKILL] = sr, CONFIG.Item.dataModels[V.STATUS] = _r, CONFIG.Item.dataModels[V.TALENT] = Jn, CONFIG.Item.dataModels[V.BOND] = Ar, CONFIG.Item.dataModels[V.NPC_CLASS] = fr, CONFIG.Item.dataModels[V.NPC_TEMPLATE] = Er, CONFIG.Item.dataModels[V.NPC_FEATURE] = Cr, CONFIG.Actor.dataModels[V.MECH] = MechModel, CONFIG.Actor.dataModels[V.PILOT] = PilotModel, CONFIG.Actor.dataModels[V.NPC] = Tr, CONFIG.Actor.dataModels[V.DEPLOYABLE] = $n, CONFIG.Combatant.dataModels.base = LancerCombatantModel;
	let e = {
		bar: [
			"hp",
			"heat",
			"overshield"
		],
		value: [
			"activations",
			"agi",
			"armor",
			"burn",
			"edef",
			"eng",
			"evasion",
			"hull",
			"overshield.value",
			"save",
			"sensor_range",
			"size",
			"speed",
			"sys",
			"tech_attack"
		]
	};
	CONFIG.Actor.trackableAttributes = {
		base: e,
		deployable: {
			bar: [...e.bar],
			value: [
				...e.value,
				"cost",
				"instances"
			]
		},
		mech: {
			bar: [
				...e.bar,
				"structure",
				"stress",
				"repairs"
			],
			value: [
				...e.value,
				"action_tracker.move",
				"core_energy",
				"grit",
				"meltdown_timer",
				"overcharge"
			]
		},
		npc: {
			bar: [
				...e.bar,
				"structure",
				"stress"
			],
			value: [
				...e.value,
				"meltdown_timer",
				"tier"
			]
		},
		pilot: {
			bar: [
				...e.bar,
				"bond_state.stress",
				"bond_state.xp"
			],
			value: [
				...e.value,
				"grit",
				"level"
			]
		}
	}, CONFIG.Item.compendiumIndexFields = [
		"system.lid",
		"system.license",
		"system.key"
	], CONFIG.Actor.compendiumIndexFields = ["system.lid"], Ln(), f(game.settings.get(game.system.id, y.setting_ui_theme)), ze(game.settings.get(game.system.id, y.setting_simple_fonts));
	let { flows: t, flowSteps: n } = registerFlows();
	game.lancer = {
		applications: {
			LancerPilotSheet,
			LancerMechSheet,
			LancerNPCSheet,
			LancerDeployableSheet,
			LancerItemSheet,
			LancerFrameSheet,
			LancerLicenseSheet,
			LancerNPCClassSheet,
			LancerNPCFeatureSheet
		},
		entities: {
			LancerActor: B,
			LancerItem: H
		},
		canvas: { WeaponRangeTemplate: Nr },
		helpers: {
			gridDist: Ne,
			lookupOwnedDeployables: Yt,
			richTextEdit: Ct
		},
		flows: t,
		flowSteps: n,
		Flow: w,
		beginItemChatFlow,
		importActor: sn,
		targetsFromTemplate: Pr,
		migrations: Kr,
		fromLid: A,
		fromLidMany: lt,
		fromLidSync: kn
	}, CONFIG.Actor.documentClass = B, CONFIG.Item.documentClass = H, CONFIG.ActiveEffect.documentClass = D, CONFIG.Token.documentClass = en, CONFIG.Token.objectClass = xn, CONFIG.Token.movement.TerrainData = LancerTerrain, CONFIG.Token.movement.actions = foundry.utils.mergeObject(CONFIG.Token.movement.actions, {
		swim: {
			canSelect: () => !1,
			deriveTerrainDifficulty: () => 1
		},
		burrow: {
			canSelect: () => !1,
			deriveTerrainDifficulty: () => 1
		},
		crawl: { getCostFunction: () => (e, t, n, r) => Math.max(e, r * 2) },
		climb: { getCostFunction: () => (e, t, n, r) => Math.max(e, r * 2) },
		jump: { getCostFunction: () => (e, t, n, r) => Math.max(e, r * 2) },
		teleport: {
			label: "lancer.movement.actions.teleport",
			icon: "fa-solid fa-person-rays",
			order: 7,
			teleport: !0,
			getCostFunction: () => () => 0,
			getAnimationOptions: () => ({ duration: 0 }),
			deriveTerrainDifficulty: () => 1,
			canSelect: (e) => e.inCombat
		},
		blink: {
			label: "lancer.movement.actions.blink",
			order: 8
		},
		ignore: {
			label: "lancer.movement.actions.ignore",
			icon: "fa-solid fa-person-walking-dashed-line-arrow-right",
			order: 9,
			deriveTerrainDifficulty: (e) => Math.min(e.walk, 1)
		},
		forced: {
			label: "lancer.movement.actions.forced",
			icon: "fa-solid fa-people-pulling",
			img: "icons/svg/hazard.svg",
			order: 10,
			teleport: !0,
			measure: !1,
			canSelect: () => game.user.isGM,
			deriveTerrainDifficulty: () => 1,
			getCostFunction: () => () => 0
		},
		displace: { order: 11 }
	}), CONFIG.Combat.documentClass = LancerCombat, CONFIG.Combat.fallbackTurnMarker = "systems/lancer/assets/turn-markers/mech-hud.svg", CONFIG.Combatant.documentClass = LancerCombatant, CONFIG.ui.combat = Nn, CONFIG.ui.pause = LancerGamePause, CONFIG.Dice.fulfillment.dice = {
		d3: {
			icon: "<i class='fa-solid fa-dice-d6'></i>",
			label: "d3"
		},
		...CONFIG.Dice.fulfillment.dice
	}, D.initConfig(), registerTours(), customElements.define("card-clipped", class LancerClippedCard extends HTMLDivElement {}, { extends: "div" }), registerHandlebarsHelpers(), Hooks.on("renderHeadsUpDisplay", Gn), preloadHUDs(), game.modules.get("combat-tracker-dock")?.active && (async () => {
		game.lancer.combatTrackerDock = await import("./combat-tracker-dock-CRlqaNVJ.mjs"), Hooks.on("renderCombatDock", (e, t) => {
			t.find(".buttons-container [data-action='roll-all']").hide(), t.find(".buttons-container [data-action='roll-npc']").hide(), t.find(".buttons-container [data-action='next-turn']").hide();
		});
	})(), Hooks.on("renderTokenConfig", gn), Hooks.on("renderPrototypeTokenConfig", gn);
}), Hooks.once("setup", () => {
	let e = game.settings.settings.get("core.gridTemplates");
	e && (e.default = !0);
}), Hooks.once("ready", async function() {
	setupSheets(), Hooks.on("updateCombat", handleCombatUpdate), preloadTemplates(), console.log(`${Q} Foundry ready, doing final checks.`), await doMigration(), Un(), game.action_manager = new Fr(), game.action_manager.init(), await D.updateIcons(), Hooks.on("updateCompendium", async (e) => {
		e?.metadata?.id == O(V.STATUS) && await D.updateIcons();
	});
	let _updateIcons = async (e) => {
		e.is_status() && await D.updateIcons();
	};
	Hooks.on("itemCreated", _updateIcons), Hooks.on("deleteItem", _updateIcons), Hooks.on("updateItem", _updateIcons);
}), Hooks.once("ready", () => {
	game.user.isGM && game.modules.get("dice-so-nice")?.active && !game.settings.get(game.system.id, y.setting_dsn_setup) && (console.log(`${Q} First login setup for Dice So Nice`), game.settings.set("dice-so-nice", "enabledSimultaneousRollForMessage", !1), game.settings.set(game.system.id, y.setting_dsn_setup, !0)), Vn(), disableLancerInitiative();
}), Hooks.once("ready", () => {
	game.socket.on(`system.${game.system.id}`, (e) => {
		handleSocketMessage(e);
	});
}), Hooks.on("controlToken", () => {
	game.action_manager?.update();
}), Hooks.on("updateToken", (e, t) => {
	t.hasOwnProperty("y") || t.hasOwnProperty("x") || game.action_manager?.update();
}), Hooks.on("updateActor", (e, t) => {
	game.action_manager?.update(), Ve(e, t);
}), Hooks.on("closeSettingsConfig", () => {
	game.action_manager?.updateConfig();
}), Hooks.on("getSceneNavigationContext", async () => {
	game.action_manager && await game.action_manager.reset();
}), Hooks.on("createCombat", (e) => {
	game.action_manager?.update();
}), Hooks.on("deleteCombat", (e) => {
	game.action_manager?.update();
}), Hooks.on("updateCombat", (e, t) => {
	game.settings.get(game.system.id, y.setting_automation).remove_templates && "turn" in t && game.user?.isGM && canvas?.templates?.placeables.forEach((e) => {
		e.document.getFlag("lancer", "isAttack") && e.document.delete();
	}), foundry.utils.hasProperty(t, "turn") && ui.combatCarousel?.render();
}), Hooks.on("dropCanvasData", dropStatusToCanvas), Hooks.on("renderCompendiumDirectory", En), Hooks.on("renderSettings", async (e, t) => {
	addSettingsButtons(e, t);
}), Hooks.on("renderCombatTrackerConfig", extendCombatTrackerConfig), Hooks.on("preCreateScene", (e) => {
	e.updateSource({
		tokenVision: !1,
		"fog.exploration": !1
	});
}), Hooks.on("renderChatMessageHTML", async (e, t, n) => {
	let r = $(t);
	b(r), M(r), r.find(".chat-button").on("click", async (t) => {
		let n = $(t.target).closest("[data-action]")[0];
		if (n?.dataset.action) {
			switch (t.stopPropagation(), n.dataset.action) {
				case "importActor":
					let e = n.dataset.targetId;
					if (!e) return ui.notifications?.error("No target actor ID found on actor import prompt button.");
					let t = n.dataset.importId;
					if (!t) return ui.notifications?.error("No import actor ID found on actor import prompt button.");
					await sn(await B.fromUuid(t, "Invalid import actor ID on actor import prompt button."), await B.fromUuid(e, "Invalid target actor ID on actor import prompt button."));
					break;
				default: return ui.notifications?.error("Invalid action on chat button."), !1;
			}
			return n.classList.contains("self-destruct") && e.delete(), !0;
		}
		return !1;
	}), r.find(".flow-button").on("click", (e) => {
		let t = $(e.target).closest("[data-flow-type]")[0];
		if (t?.dataset.flowType) {
			e.stopPropagation();
			let n = t.dataset.flowType, r = t.dataset.actorId;
			switch (t.dataset.itemId, n) {
				case "check":
					let e = B.fromUuidSync(r ?? "", "Invalid actor ID on check prompt button.");
					switch (t.dataset.checkType) {
						case "hul":
						case "hull":
						default:
							e.beginStatFlow("system.hull");
							break;
						case "agi":
						case "agility":
							e.beginStatFlow("system.agility");
							break;
						case "sys":
						case "systems":
							e.beginStatFlow("system.systems");
							break;
						case "eng":
						case "engineering":
							e.beginStatFlow("system.eng");
							break;
					}
					break;
				case "secondaryStructure":
					if (!r) return ui.notifications?.error("No actor ID found on secondary structure prompt button.");
					u(r);
					break;
				case "cascade":
					if (!r) return ui.notifications?.error("No actor ID found on cascade prompt button.");
					beginCascadeFlow(r);
					break;
				case "dismembermentDamage":
					Le(B.fromUuidSync(r ?? "", "Invalid actor ID dismemberment damage button."));
					break;
				default: return ui.notifications?.error("Invalid flow type on flow prompt button.");
			}
			return !0;
		}
	});
	let hoverCallback = async (e) => {
		if (!canvas.ready) return;
		let t = $(e.target).closest("[data-uuid]").data("uuid");
		if (!t) return;
		let n = await fromUuid(t);
		n && (e.type === "mouseover" ? n.object._onHoverIn(e) : e.type === "mouseout" && n.object._onHoverOut(e));
	}, i = r.find(".lancer-hit-target, .lancer-damage-target");
	i.on("mouseenter", hoverCallback), i.on("mouseleave", hoverCallback), r.find(".lancer-damage-flow").on("click", Xt), r.find(".lancer-damage-apply").on("click", Ot), r.find(".lancer-damage-undo").on("click", It), on(r);
}), Hooks.on("hotbarDrop", (e, t, n) => {
	onHotbarDrop(e, t, n);
});
async function promptInstallCoreData() {
	await new qt().render(!0), new foundry.applications.api.DialogV2({
		window: {
			title: "Install Core Data",
			icon: "cci cci-content-manager i--3"
		},
		position: { width: 700 },
		content: "\n  <h2 style=\"text-align: center\">WELCOME GAME MASTER</h2>\n  <p style=\"text-align: center;margin-bottom: 1em\">THIS IS YOUR <span class=\"horus--very--subtle\">FIRST</span> TIME LAUNCHING</p>\n  <p style=\"text-align: center;margin-bottom: 1em\">Use the LANCER Compendium Manager window to install the <span class=\"horus--very--subtle\">LANCER DATA</span> you wish to use.</p>",
		buttons: [{
			action: "close",
			label: "Close"
		}]
	}).render(!0);
}
function setupSheets() {
	let e = foundry.documents.collections.Actors;
	e.unregisterSheet("core", foundry.appv1.sheets.ActorSheet), e.registerSheet("lancer", LancerPilotSheet, {
		types: [V.PILOT],
		makeDefault: !0
	}), e.registerSheet("lancer", LancerMechSheet, {
		types: [V.MECH],
		makeDefault: !0
	}), e.registerSheet("lancer", LancerNPCSheet, {
		types: [V.NPC],
		makeDefault: !0
	}), e.registerSheet("lancer", LancerDeployableSheet, {
		types: [V.DEPLOYABLE],
		makeDefault: !0
	});
	let t = foundry.documents.collections.Items;
	t.unregisterSheet("core", foundry.appv1.sheets.ItemSheet), t.registerSheet("lancer", LancerItemSheet, {
		types: [
			V.SKILL,
			V.TALENT,
			V.BOND,
			V.CORE_BONUS,
			V.RESERVE,
			V.STATUS,
			V.PILOT_ARMOR,
			V.PILOT_WEAPON,
			V.PILOT_GEAR,
			V.MECH_SYSTEM,
			V.MECH_WEAPON,
			V.WEAPON_MOD,
			V.NPC_FEATURE,
			V.ORGANIZATION
		],
		makeDefault: !0
	}), t.registerSheet("lancer", LancerFrameSheet, {
		types: [V.FRAME],
		makeDefault: !0
	}), t.registerSheet("lancer", LancerLicenseSheet, {
		types: [V.LICENSE],
		makeDefault: !0
	}), t.registerSheet("lancer", LancerNPCClassSheet, {
		types: [V.NPC_CLASS, V.NPC_TEMPLATE],
		makeDefault: !0
	}), t.registerSheet("lancer", LancerNPCFeatureSheet, {
		types: [V.NPC_FEATURE],
		makeDefault: !0
	});
}
async function versionCheck() {
	let e = game.settings.get(game.system.id, y.setting_migration_version);
	return e === "0" || !e ? "first_run" : foundry.utils.isNewerVersion("1.0.0", e) ? "too_old" : foundry.utils.isNewerVersion(game.system.version, e) ? "yes" : "no";
}
async function promptLCPManagerTour() {
	if (!await foundry.applications.api.DialogV2.confirm({
		window: { title: "Compendium Manager Tour?" },
		content: "The LANCER Compendium Manager has had a major update. Would you like to get a tour?",
		rejectClose: !1
	})) return;
	let e = game.tours.get(`${game.system.id}.lcp`);
	if (!e) {
		console.error(`${Q} LCP manager tour not found.`);
		return;
	}
	console.log(`${Q} Starting LCP manager tour`), e.start();
}
async function doMigration() {
	let e = game.settings.get(game.system.id, y.setting_migration_version);
	if (e && foundry.utils.isNewerVersion("2.7.0", e)) {
		console.log(`${Q} Game is migrating from ${e}. Should show LCP manager tour`);
		let t = game.tours.get(`${game.system.id}.lcp`);
		if (!t) {
			console.error(`${Q} LCP manager tour not found.`);
			return;
		}
		await t.reset(), promptLCPManagerTour();
	}
	let t = await versionCheck();
	if (t == "first_run") game.settings.set(game.system.id, y.setting_migration_version, game.system.version), await promptInstallCoreData();
	else if (t == "too_old") {
		ui.notifications.error(`Your LANCER system data is from too old a version (${game.settings.get(game.system.id, y.setting_migration_version)}) and cannot be reliably migrated to the latest version. Please install and migrate to version 1.5.0+ before attempting this migration`, { permanent: !0 });
		return;
	} else t == "yes" && game.user.isGM ? (printUpdateMessage(), await migrateWorld(), await game.settings.set(game.system.id, y.setting_migration_version, game.system.version)) : t == "yes" ? ui.notifications.warn("Your GM needs to migrate this world. Please do not attempt to play the game or edit anything until migrations are done.", { permanent: !0 }) : t == "no" && game.user.isGM && await game.settings.set(game.system.id, y.setting_migration_version, game.system.version);
}
async function printUpdateMessage() {
	for (; !ui.sidebar.rendered;) await new Promise((e) => setTimeout(e, 100));
	await ChatMessage.create({
		content: dn(),
		speaker: { alias: `LANCER System v${game.system.version}` }
	});
}
function addSettingsButtons(e, t) {
	let n = $("<h2>LANCER</h2>\n            <div id=\"settings-lancer\"></div>"), r = $("<button id=\"triggler-form\" data-action=\"triggler\">\n            <i class=\"fas fa-robot\"></i>LANCER Help\n        </button>");
	$(t).find("#settings-game").after(n), $(t).find("#settings-lancer").append(r), r.on("click", async () => {
		let e = await foundry.applications.handlebars.renderTemplate(`systems/${game.system.id}/templates/window/lancerHelp.hbs`, {});
		new foundry.applications.api.DialogV2({
			window: {
				title: "LANCER Help",
				icon: "fas fa-robot"
			},
			content: e,
			position: { width: 600 },
			buttons: [{
				action: "close",
				label: "Close"
			}]
		}).render(!0);
	});
}
//#endregion
export { Wr as t };

//# sourceMappingURL=lancer.mjs.map