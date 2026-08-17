import "./chunk-DAAM-nuR.mjs";
import { Q as e, ar as t, hi as n, si as r, ui as i } from "./lancer-actor-DUbnXjU1.mjs";
import { $ as a, A as o, B as s, C as c, D as l, F as u, G as d, H as f, I as p, L as m, M as h, N as g, O as _, Q as v, R as y, S as b, U as x, V as S, W as C, X as w, Y as T, Z as E, at as D, c as O, dt as k, f as A, ft as j, h as M, ht as N, it as P, j as F, k as I, m as L, mt as R, n as ee, o as z, p as B, rt as V, s as H, x as te, y as U, z as ne } from "./slidinghud-Ci-nXn7_.mjs";
import { n as re, t as ie } from "./_template-CRuDkhEm.mjs";
import "./disclose-version-D7mHcnt5.mjs";
import { a as W, i as G, n as K, t as q } from "./legacy-BniSAU0y.mjs";
import { n as J, r as ae, t as oe } from "./MiniProfile-BYUp-B3F.mjs";
//#region src/module/apps/acc_diff/Plugin.svelte
function Plugin(e, t) {
	j(t, !1);
	let n = z(t, "data", 12);
	H();
	var r = m(), i = v(r), consequent = (e) => {
		J(e, {
			get label() {
				return x(n()), d(() => n().humanLabel);
			},
			get disabled() {
				return x(n()), d(() => n().disabled);
			},
			get value() {
				return n().uiState;
			},
			set value(e) {
				n(n().uiState = e, !0);
			},
			$$legacy: !0
		});
	};
	o(i, (e) => {
		x(n()), d(() => n().uiElement == "checkbox" && n().visible) && e(consequent);
	}), p(e, r), k();
}
//#endregion
//#region src/module/apps/acc_diff/Cover.svelte
var Y = 0, X = y("<div class=\"cover-arrow svelte-1r8lxxw\"></div>"), Z = y("<input type=\"radio\"/> <label><i></i> <span class=\"no-grow\"> </span> <!></label>", 1), se = y("<div></div>");
function Cover(e, t) {
	j(t, !1);
	let n = [], r = z(t, "cover", 12), i = z(t, "disabled", 8, !1), s = z(t, "labelClass", 8, ""), f = z(t, "class", 8, ""), m = `accdiff-cover-input-${Y++}`, h = [
		{
			slug: "no",
			human: "No Cover",
			value: 0,
			icon: "shield-outline"
		},
		{
			slug: "soft",
			human: "Soft Cover (-1)",
			value: 1,
			icon: "shield-half-full"
		},
		{
			slug: "hard",
			human: "Hard Cover (-2)",
			value: 2,
			icon: "shield"
		}
	], [g, y] = K({});
	H();
	var b = se();
	let S;
	l(b, 5, () => h, _, (e, t) => {
		var l = Z(), f = v(l);
		L(f);
		var h, _ = a(f, 2), b = E(_), S = a(b, 2), w = E(S, !0);
		N(S);
		var D = a(S, 2), consequent = (e) => {
			var t = X();
			c(1, t, () => g, () => ({ key: m })), c(2, t, () => y, () => ({ key: m })), p(e, t);
		};
		o(D, (e) => {
			C(t), x(r()), d(() => C(t).value == r()) && e(consequent);
		}), N(_), T(() => {
			M(f, "id", `${m}-${(C(t), d(() => C(t).slug)) ?? ""}`), U(f, 1, `no-grow ${(C(t), d(() => C(t).slug)) ?? ""}-cover`, "svelte-1r8lxxw"), f.disabled = i(), h !== (h = (C(t), d(() => C(t).value))) && (f.value = (f.__value = (C(t), d(() => C(t).value))) ?? ""), M(_, "for", `${m}-${(C(t), d(() => C(t).slug)) ?? ""}`), U(_, 1, `lancer-cover-radio-label ${s() ?? ""}`, "svelte-1r8lxxw"), U(b, 1, `mdi mdi-${(C(t), d(() => C(t).icon)) ?? ""} i--2`, "svelte-1r8lxxw"), M(b, "title", (C(t), d(() => C(t).human))), u(w, (C(t), d(() => C(t).human)));
		}), A(n, [], f, () => (C(t), d(() => C(t).value), r()), r), p(e, l);
	}), N(b), T(() => S = U(b, 1, `lancer-cover-radio ${f() ?? ""}`, "svelte-1r8lxxw", S, { disabled: i() })), p(e, b), k();
}
//#endregion
//#region src/module/apps/acc_diff/TotalAccuracy.svelte
var ce = y("<label class=\"stunned-label svelte-16bpf9g\" title=\"Stunned\"><i class=\"cci cci-condition-stunned i--3 svelte-16bpf9g\"></i></label>"), le = y("<div class=\"accdiff-target-dropdown svelte-16bpf9g\"></div>"), ue = y("<div><img/> <!> <label title=\"Consume Lock On (+1)\"><i role=\"button\" tabindex=\"0\"></i> <!></label></div> <!>", 1), de = y("<div class=\"card clipped total svelte-16bpf9g\"><span class=\"svelte-16bpf9g\"> </span> <i></i></div>"), Q = y("<!> <div class=\"accdiff-grid accdiff-weight svelte-16bpf9g\"><div></div></div>", 1);
function TotalAccuracy(t, n) {
	j(n, !0);
	let r = z(n, "target", 15), i = P(""), s = P(""), d = P(null), m = P(null), [h, y] = K({ fallback: q });
	function isTarget(e) {
		return e?.targetUuid;
	}
	w(() => {
		V(i, isTarget(r()) ? `${n.id}-consume-lockon` : "", !0), V(s, isTarget(r()) ? `${n.id}-stunned` : "", !0);
	});
	function toggleLockOn() {
		isTarget(r()) && r().lockOnAvailable && r(r().consumeLockOn = !r().consumeLockOn, !0);
	}
	let b = Object.values(r().plugins).filter((e) => e.uiElement == "checkbox" && e.uiState).map((e) => `accdiff-total-${e.slug}`).join(" ");
	g(() => {
		C(d) && C(m) && e(C(d), {
			content: C(m),
			interactive: !0,
			allowHTML: !0,
			trigger: "click mouseenter",
			placement: "right"
		});
	});
	var x = Q(), A = v(x), consequent_2 = (e) => {
		var t = ue(), u = v(t), g = E(u);
		let x;
		O(g, (e) => V(d, e), () => C(d));
		var w = a(g, 2), consequent = (e) => {
			var t = ce();
			T(() => M(t, "for", C(s))), c(7, t, () => q), p(e, t);
		};
		o(w, (e) => {
			r().stunned && e(consequent);
		});
		var k = a(w, 2);
		let A;
		var j = E(k);
		let P;
		var F = a(j, 2);
		{
			let e = D(() => !!r().usingLockOn), t = D(() => !r().lockOnAvailable);
			J(F, {
				label: "Consume\xA0Lock\xA0On (+1)",
				get checked() {
					return C(e);
				},
				get disabled() {
					return C(t);
				},
				visible: !1,
				get value() {
					return r().consumeLockOn;
				},
				set value(e) {
					r(r().consumeLockOn = e, !0);
				}
			});
		}
		N(k), N(u);
		var I = a(u, 2), consequent_1 = (e) => {
			var t = le();
			l(t, 21, () => Object.keys(r().plugins), _, (e, t) => {
				Plugin(e, {
					get data() {
						return r().plugins[C(t)];
					},
					set data(e) {
						r(r().plugins[C(t)] = e, !0);
					}
				});
			}), N(t), O(t, (e) => V(m, e), () => C(m)), p(e, t);
		};
		o(I, (e) => {
			n.onlyTarget || e(consequent_1);
		}), T(() => {
			U(u, 1, `accdiff-grid lancer-hit-thumb accdiff-target-has-dropdown ${b ?? ""}`, "svelte-16bpf9g"), M(g, "alt", r().targetName), M(g, "src", r().targetImg), x = U(g, 1, "svelte-16bpf9g", null, x, { "accdiff-target-prone": r().prone }), M(k, "for", C(i)), A = U(k, 1, "lockon-label svelte-16bpf9g", null, A, {
				checked: r().usingLockOn,
				disabled: !r().lockOnAvailable
			}), P = U(j, 1, "cci cci-condition-lock-on svelte-16bpf9g", null, P, {
				"i--click": r().lockOnAvailable,
				"i--3": !r().usingLockOn,
				"i--5": r().usingLockOn
			});
		}), S("click", j, toggleLockOn), f("keypress", j, toggleLockOn), c(5, u, () => h, () => ({
			key: `${n.id}-img`,
			delay: 100,
			duration: 200
		})), c(6, u, () => y, () => ({
			key: `${n.id}-img`,
			duration: 200
		})), p(e, t);
	}, F = D(() => isTarget(r()));
	o(A, (e) => {
		C(F) && e(consequent_2);
	});
	var I = a(A, 2), L = E(I);
	let R;
	l(L, 21, () => [r().total], (e) => r().total, (e, t) => {
		var i = de(), o = E(i), s = E(o, !0);
		N(o);
		var l = a(o, 2);
		let d;
		N(i), T((e) => {
			M(i, "id", n.id), u(s, e), d = U(l, 1, "cci i--4 i--dark white--text middle svelte-16bpf9g", null, d, {
				"cci-accuracy": r().total >= 0,
				"cci-difficulty": r().total < 0
			});
		}, [() => Math.abs(r().total)]), c(1, o, () => G, () => ({
			y: -50,
			duration: 400
		})), c(2, o, () => G, () => ({
			y: 50,
			duration: 200
		})), c(1, l, () => G, () => ({
			y: -50,
			duration: 200
		})), c(2, l, () => G, () => ({
			y: 50,
			duration: 200
		})), c(7, i, () => q), p(e, i);
	}), N(L), N(I), T(() => R = U(L, 1, `grid-enforcement total-container ${b ?? ""}`, "svelte-16bpf9g", R, {
		accurate: r().total > 0,
		inaccurate: r().total < 0
	})), c(5, I, () => h, () => ({ key: n.id })), c(6, I, () => y, () => ({ key: n.id })), p(t, x), k();
}
s(["click"]);
//#endregion
//#region src/module/apps/acc_diff/AccDiffInput.svelte
var fe = y("<button class=\"lancer-button dec-set svelte-1fyd22x\" type=\"button\" data-tooltip=\"Add global accuracy\"><i class=\"cci cci-accuracy i--3\"></i></button> <label class=\"flexcol svelte-1fyd22x\" data-tooltip=\"Global Accuracy/Difficulty Adjustment\"><strong style=\"text-wrap: nowrap\">Manual Adjust</strong> <strong class=\"accdiff-value svelte-1fyd22x\"><span> </span> <i></i></strong></label> <input class=\"difficulty lancer-invisible-input dec-set\" style=\"display: none\" type=\"number\"/> <button class=\"lancer-button dec-set svelte-1fyd22x\" type=\"button\" data-tooltip=\"Add global difficulty\"><i class=\"cci cci-difficulty i--3\"></i></button>", 1);
function AccDiffInput(e, t) {
	let n = z(t, "value", 12, 0), r = z(t, "id", 8);
	var i = fe(), o = v(i), s = a(o, 2), c = a(E(s), 2), l = E(c), m = E(l, !0);
	N(l);
	var h = a(l, 2);
	let g;
	N(c), N(s);
	var _ = a(s, 2);
	L(_);
	var y = a(_, 2);
	T((e) => {
		M(s, "for", r()), u(m, e), g = U(h, 1, "i--3 cci", null, g, {
			"cci-accuracy": n() >= 0,
			"cci-difficulty": n() < 0
		}), M(_, "id", r());
	}, [() => (x(n()), d(() => Math.abs(n())))]), f("click", o, () => n(n() + 1)), B(_, n), f("click", y, () => n(n() - 1)), p(e, i);
}
//#endregion
//#region src/module/apps/acc_diff/AccDiffHUD.svelte
var pe = y("<i class=\"cci cci-tech-quick i--4 i--light\"></i>"), me = y("<i class=\"cci cci-weapon i--4 i--light\"></i>"), he = y("<i class=\"fas fa-dice-d20 i--4 i--light\"></i>"), ge = y("<div><!> <span class=\"svelte-13q4b2q\"> </span></div>"), _e = y("<label class=\"flexrow accdiff-weight lancer-border-primary\" for=\"accdiff-flat-bonus\">Flat Modifier</label> <div class=\"accdiff-grid accdiff-flat-bonus svelte-13q4b2q\"><div class=\"accdiff-other-grid svelte-13q4b2q\"><span><b> </b> </span></div> <div class=\"accdiff-other-grid accdiff-flat-mod svelte-13q4b2q\" style=\"position: relative\"><input class=\"accdiff-flat-mod__input svelte-13q4b2q\" type=\"number\"/> <button class=\"accdiff-flat-mod__plus svelte-13q4b2q\" type=\"button\" aria-label=\"Increase flat bonus\"><i class=\"fas fa-plus svelte-13q4b2q\"></i></button> <button class=\"accdiff-flat-mod__minus svelte-13q4b2q\" type=\"button\" aria-label=\"Decrease flat bonus\"><i class=\"fas fa-minus svelte-13q4b2q\"></i></button></div> <div class=\"accdiff-other-grid svelte-13q4b2q\"><span><b>Total:</b> </span></div></div>", 1), ve = y("<!> <!>", 1), ye = y("<!> <!> <!>", 1), be = y("<!> <!> <!> <!>", 1), xe = y("<div><!></div>"), Se = y("<div role=\"radiogroup\" tabindex=\"0\"><!></div>"), Ce = y("<div class=\"grid-enforcement\"><!></div>"), we = y("<div class=\"accdiff-grid accdiff-grid__section svelte-13q4b2q\" style=\"width: 100%\"><div class=\"accdiff-grid__column svelte-13q4b2q\"><!></div> <div class=\"accdiff-grid__column svelte-13q4b2q\"><!> <!></div></div>"), Te = y("<button class=\"range-button svelte-13q4b2q\" type=\"button\"><i></i> </button>"), Ee = y("<div class=\"accdiff-grid__section svelte-13q4b2q\"><span class=\"accdiff-weight flex-center flexrow\">Targeting</span> <div class=\"accdiff-ranges flexrow svelte-13q4b2q\"></div></div>"), De = y("<div class=\"flexrow flex-center\"><label class=\"accdiff-weight total-label lancer-mini-header svelte-13q4b2q\" for=\"total-display-0\">🞂 <span class=\"svelte-13q4b2q\">Total <!></span> 🞀</label></div>"), Oe = y("<div class=\"flexrow flex-center accdiff-total svelte-13q4b2q\"><!></div>"), ke = y("<div role=\"presentation\" class=\"flexrow flex-center accdiff-total svelte-13q4b2q\"><!></div>"), Ae = y("<div></div>"), je = y("<div role=\"presentation\" class=\"flexcol card accdiff-target svelte-13q4b2q\"><label class=\"target-name flexrow lancer-mini-header svelte-13q4b2q\">🞂<span> </span>🞀</label> <div class=\"accdiff-target-body svelte-13q4b2q\"><div class=\"flexrow accdiff-total svelte-13q4b2q\"><!></div> <div class=\"flexrow\"><button aria-label=\"Increase accuracy\" class=\"i--4 no-grow accdiff-button svelte-13q4b2q\" type=\"button\"><i class=\"cci cci-accuracy i--4 svelte-13q4b2q\" style=\"border: none\"></i></button> <input style=\"display: none\" type=\"number\" min=\"0\"/> <!> <input style=\"display: none\" type=\"number\" min=\"0\"/> <button aria-label=\"Increase difficulty\" class=\"i--4 no-grow accdiff-button svelte-13q4b2q\" type=\"button\"><i class=\"cci cci-difficulty i--4 svelte-13q4b2q\" style=\"border: none\"></i></button></div></div></div>"), Me = y("<div class=\"accdiff-weight accdiff-target-row svelte-13q4b2q\"></div>"), Ne = y("<form id=\"accdiff-hud\" class=\"lancer lancer-hud accdiff window-content svelte-13q4b2q\"><!> <!> <div class=\"lancer-hud-body svelte-13q4b2q\"><!> <div class=\"accdiff-grid accdiff-grid__section svelte-13q4b2q\"><div class=\"accdiff-grid__column svelte-13q4b2q\"><h4 class=\"lancer-border-primary svelte-13q4b2q\"><i class=\"cci cci-accuracy i--4\" style=\"vertical-align: middle; border: none\"></i> <span>Accuracy</span></h4></div> <div class=\"accdiff-grid__column svelte-13q4b2q\"><h4 class=\"lancer-border-primary svelte-13q4b2q\"><i class=\"cci cci-difficulty i--4\" style=\"vertical-align: middle; border: none\"></i> <span>Difficulty</span></h4></div></div> <div class=\"accdiff-grid accdiff-grid__section svelte-13q4b2q\"><div class=\"accdiff-grid__column svelte-13q4b2q\"><!> <!> <!></div> <div class=\"accdiff-grid__column svelte-13q4b2q\"><!> <!> <!></div></div> <!> <div class=\"flexcol accdiff-grid svelte-13q4b2q\"><div class=\"flexrow accdiff-grid__section svelte-13q4b2q\" style=\"justify-content: space-evenly\"><!></div> <!></div> <div class=\"flexcol accdiff-footer lancer-border-primary svelte-13q4b2q\"><div class=\"accdiff-total svelte-13q4b2q\"><!> <div class=\"grid-enforcement\"><!></div></div></div></div> <div class=\"lancer-hud-buttons flexrow\"><button class=\"lancer-button lancer-secondary dialog-button submit default svelte-13q4b2q\" data-button=\"submit\" type=\"submit\"><i class=\"fas fa-check\"></i> Roll</button> <button class=\"dialog-button cancel svelte-13q4b2q\" data-button=\"cancel\" type=\"button\"><i class=\"fas fa-times\"></i> Cancel</button></div></form>");
function AccDiffHUD(e, s) {
	j(s, !0);
	let d = F(), y = P(!1), x = {}, O = D(() => s.data.title), A = D(() => s.data.lancerItem), z = D(() => s.data.lancerActor), H = D(() => s.data.base), G = D(() => s.data.weapon), K = D(() => s.data.targets), q = D(() => C(z) ? ` -- ${C(z).token?.name || C(z).name}` : ""), Y = D(() => C(A) ? findProfile() : null), X = D(() => C(A) ? findRanges() : null), Z = D(() => !(isTech() || isMelee() && !C(G).thrown)), se = D(() => s.kind === "attack" ? C(H).grit + C(H).flatBonus : 0), ce = D(() => Object.values(C(G).plugins).filter((e) => e.category === "acc")), le = D(() => Object.values(C(G).plugins).filter((e) => e.category === "diff")), ue = D(() => C(K).length === 1 ? Object.values(C(K)[0].plugins).filter((e) => e.category === "acc") : []), de = D(() => C(K).length === 1 ? Object.values(C(K)[0].plugins).filter((e) => e.category === "diff") : []);
	g(() => {
		x.targetToken = Hooks.on("targetToken", (e, t, n) => {
			e.isSelf && updateTargets();
		}), x.createActiveEffect = Hooks.on("createActiveEffect", updateTargets), x.deleteActiveEffect = Hooks.on("deleteActiveEffect", updateTargets), x.updateToken = Hooks.on("updateToken", (e) => {
			e.object.movementAnimationPromise?.then(updateTargets);
		});
	}), h(() => {
		for (let e in x) Hooks.off(e, x[e]);
	}), w(() => {
		if (s.data.hydrate(s.data.lancerItem || s.data.lancerActor), s.kind === "attack" && C(A) && !isTech()) {
			let e = [];
			C(A).is_pilot_weapon() || C(A).is_npc_feature() && C(A).system.type === r.Weapon ? e = C(A).system.range.map((e) => e.type) : C(A).is_mech_weapon() && (e = (C(A).system.active_profile?.range || []).map((e) => e.type)), e.some((e) => ![i.Threat, i.Thrown].includes(e)) && (C(G).engaged = !!C(G).engagedStatus);
		}
	});
	function focus(e) {
		e.focus();
	}
	function updateTargets() {
		s.data && s.data.replaceTargets(Array.from(game.user.targets).map((e) => e.document.uuid));
	}
	function targetHoverIn(e, n) {
		let r = t(n, { strict: !0 })?.object;
		if (!r || C(y)) return;
		let i = game.modules.get("terrain-height-tools");
		!i?.active || foundry.utils.isNewerVersion("0.3.3", i.version) ? r._onHoverIn(e) : drawLos(r);
	}
	function targetHoverOut(e, n) {
		let r = t(n, { strict: !0 })?.object;
		if (!r) return;
		let i = game.modules.get("terrain-height-tools");
		!i?.active || foundry.utils.isNewerVersion("0.3.3", i.version) ? r._onHoverOut(e) : clearLos();
	}
	function drawLos(e) {
		let t = (C(z)?.getActiveTokens(!0) ?? C(A)?.actor?.getActiveTokens(!0))?.shift();
		!t || t === e || terrainHeightTools.drawLineOfSightRaysBetweenTokens(t, e);
	}
	function clearLos() {
		let e = game.modules.get("terrain-height-tools");
		!e?.active || foundry.utils.isNewerVersion("0.3.3", e.version) || terrainHeightTools.clearLineOfSightRays();
	}
	function escToCancel(e) {
		function escHandler(e) {
			e.key === "Escape" && (e.preventDefault(), d("cancel"));
		}
		return window.addEventListener("keydown", escHandler), { destroy() {
			window.removeEventListener("keydown", escHandler);
		} };
	}
	function isAttack() {
		return s.kind === "attack";
	}
	function isTech() {
		return C(A) ? !(C(A).is_mech_weapon() || C(A).is_pilot_weapon() || C(A).is_npc_feature() && C(A).system.type === r.Weapon) : C(O).toLowerCase() === "tech attack";
	}
	function isMelee() {
		return !C(A) || isTech() ? !1 : C(A).currentProfile().type === n.Melee;
	}
	function gritLabel() {
		if (isTech()) return C(A)?.is_npc_feature() && C(A).system.type === r.Tech ? "Tech Item Base" : "Tech Attack";
		if (C(A)) {
			if (C(A).is_mech_weapon() || C(A).is_pilot_weapon()) return "Grit";
			if (C(A).is_npc_feature() && C(A).system.type === r.Weapon) return "Weapon Base";
		}
		if (C(z)) {
			if (C(z).is_npc()) return "Tier";
			if (C(z).is_mech() || C(z).is_pilot() || C(z).is_deployable()) return "Grit";
		}
		return "Grit";
	}
	function flatSign(e) {
		return e > 0 ? "+" : "";
	}
	function findProfile() {
		return C(A)?.currentProfile() ?? {
			range: [],
			damage: []
		};
	}
	function findRanges() {
		return C(A)?.rangesFor([
			i.Blast,
			i.Burst,
			i.Cone,
			i.Line
		]) ?? [];
	}
	function deployTemplate(e) {
		let t = C(A)?.parent, n = t?.token?.object ?? t?.getActiveTokens().shift() ?? void 0, r = re.fromRange(e, n);
		r && (ee("out"), r.document.updateSource({ [`flags.${game.system.id}.isAttack`]: !0 }), r.placeTemplate().catch((e) => {
			console.warn(e);
		}).then((e) => {
			e && ie(e.id), ee("in");
		}));
	}
	var Q = Ne(), fe = E(Q), consequent_3 = (e) => {
		var t = ge(), n = E(t), consequent_1 = (e) => {
			var t = m(), n = v(t), consequent = (e) => {
				p(e, pe());
			}, r = D(() => isTech()), alternate = (e) => {
				p(e, me());
			};
			o(n, (e) => {
				C(r) ? e(consequent) : e(alternate, -1);
			}), p(e, t);
		}, consequent_2 = (e) => {
			p(e, he());
		};
		o(n, (e) => {
			s.kind == "attack" ? e(consequent_1) : s.kind == "hase" && e(consequent_2, 1);
		});
		var r = a(n, 2), i = E(r);
		N(r), N(t), T((e) => {
			U(t, 1, `lancer-header ${e ?? ""} medium`, "svelte-13q4b2q"), u(i, `${C(O) ?? ""}${C(q) ?? ""}`);
		}, [() => isTech() ? "lancer-tech" : "lancer-weapon"]), p(e, t);
	};
	o(fe, (e) => {
		C(O) != "" && e(consequent_3);
	});
	var Pe = a(fe, 2), consequent_4 = (e) => {
		oe(e, { get profile() {
			return C(Y);
		} });
	};
	o(Pe, (e) => {
		C(Y) && e(consequent_4);
	});
	var $ = a(Pe, 2), Fe = E($), consequent_5 = (e) => {
		var t = _e(), n = a(v(t), 2), r = E(n), i = E(r), o = E(i), s = E(o);
		N(o);
		var c = a(o);
		N(i), N(r);
		var l = a(r, 2), d = E(l);
		L(d);
		var f = a(d, 2), m = a(f, 2);
		N(l);
		var h = a(l, 2), g = E(h), _ = a(E(g));
		N(g), N(h), N(n), T((e, t, n) => {
			u(s, `${e ?? ""}:`), u(c, ` ${t ?? ""}${C(H).grit ?? ""}`), u(_, ` ${n ?? ""}${C(se) ?? ""}`);
		}, [
			() => gritLabel(),
			() => flatSign(C(H).grit),
			() => flatSign(C(se))
		]), B(d, () => C(H).flatBonus, (e) => C(H).flatBonus = e), S("click", f, () => C(H).flatBonus = C(H).flatBonus + 1), S("click", m, () => C(H).flatBonus = C(H).flatBonus - 1), p(e, t);
	}, Ie = D(() => isAttack());
	o(Fe, (e) => {
		C(Ie) && e(consequent_5);
	});
	var Le = a(Fe, 4), Re = E(Le), ze = E(Re);
	J(ze, {
		label: "Accurate (+1)",
		get value() {
			return C(G).accurate;
		},
		set value(e) {
			C(G).accurate = e;
		}
	});
	var Be = a(ze, 2);
	J(Be, {
		label: "Smart (*)",
		get value() {
			return C(G).smart;
		},
		set value(e) {
			C(G).smart = e;
		}
	});
	var Ve = a(Be, 2), consequent_6 = (e) => {
		var t = ve(), n = v(t);
		J(n, {
			label: "Seeking (*)",
			get value() {
				return C(G).seeking;
			},
			set value(e) {
				C(G).seeking = e;
			}
		}), l(a(n, 2), 17, () => C(ce), _, (e, t) => {
			Plugin(e, { get data() {
				return C(t);
			} });
		}), p(e, t);
	};
	o(Ve, (e) => {
		s.kind == "attack" && e(consequent_6);
	}), N(Re);
	var He = a(Re, 2), Ue = E(He);
	J(Ue, {
		label: "Inaccurate (-1)",
		get value() {
			return C(G).inaccurate;
		},
		set value(e) {
			C(G).inaccurate = e;
		}
	});
	var We = a(Ue, 2);
	{
		let e = D(() => !!C(G).impaired);
		J(We, {
			label: "Impaired (-1)",
			get value() {
				return C(e);
			},
			disabled: !0
		});
	}
	var Ge = a(We, 2), consequent_8 = (e) => {
		var t = ye(), n = v(t), consequent_7 = (e) => {
			J(e, {
				label: "Thrown (*)",
				get value() {
					return C(G).thrown;
				},
				set value(e) {
					C(G).thrown = e;
				}
			});
		}, r = D(() => isMelee());
		o(n, (e) => {
			C(r) && e(consequent_7);
		});
		var i = a(n, 2);
		J(i, {
			label: "Engaged (-1)",
			get value() {
				return C(G).engaged;
			},
			set value(e) {
				C(G).engaged = e;
			}
		}), l(a(i, 2), 17, () => C(le), _, (e, t) => {
			Plugin(e, { get data() {
				return C(t);
			} });
		}), p(e, t);
	}, Ke = D(() => s.kind == "attack" && !isTech());
	o(Ge, (e) => {
		C(Ke) && e(consequent_8);
	}), N(He), N(Le);
	var qe = a(Le, 2), consequent_13 = (e) => {
		var t = we(), n = E(t), r = E(n), consequent_9 = (e) => {
			var t = be(), n = v(t);
			J(n, {
				style: "grid-area: prone",
				label: "Prone (+1)",
				disabled: !0,
				get value() {
					return C(K)[0].prone;
				},
				set value(e) {
					C(K)[0].prone = e;
				}
			});
			var r = a(n, 2);
			J(r, {
				label: "Stunned\xA0(EVA=5)",
				disabled: !0,
				get value() {
					return C(K)[0].stunned;
				},
				set value(e) {
					C(K)[0].stunned = e;
				}
			});
			var i = a(r, 2);
			{
				let e = D(() => !!C(K)[0].usingLockOn), t = D(() => !C(K)[0].lockOnAvailable);
				J(i, {
					style: "grid-area: lock-on",
					label: "Lock\xA0On (+1)",
					get checked() {
						return C(e);
					},
					get disabled() {
						return C(t);
					},
					get value() {
						return C(K)[0].consumeLockOn;
					},
					set value(e) {
						C(K)[0].consumeLockOn = e;
					}
				});
			}
			l(a(i, 2), 17, () => C(ue), _, (e, t) => {
				Plugin(e, { get data() {
					return C(t);
				} });
			}), p(e, t);
		};
		o(r, (e) => {
			C(K).length == 1 && e(consequent_9);
		}), N(n);
		var i = a(n, 2), s = E(i);
		l(s, 17, () => C(de), _, (e, t) => {
			Plugin(e, { get data() {
				return C(t);
			} });
		});
		var u = a(s, 2), consequent_12 = (e) => {
			var t = Ce(), n = E(t), consequent_10 = (e) => {
				var t = xe();
				Cover(E(t), {
					class: "accdiff-base-cover flexcol",
					get disabled() {
						return C(G).seeking;
					},
					get cover() {
						return C(H).cover;
					},
					set cover(e) {
						C(H).cover = e;
					}
				}), N(t), c(3, t, () => W), p(e, t);
			}, consequent_11 = (e) => {
				var t = Se();
				Cover(E(t), {
					class: "accdiff-base-cover flexcol",
					get disabled() {
						return C(G).seeking;
					},
					get cover() {
						return C(K)[0].cover;
					},
					set cover(e) {
						C(K)[0].cover = e;
					}
				}), N(t), f("mouseenter", t, (e) => targetHoverIn(e, C(K)[0].targetUuid)), f("mouseleave", t, (e) => targetHoverOut(e, C(K)[0].targetUuid)), c(3, t, () => W), p(e, t);
			};
			o(n, (e) => {
				C(K).length == 0 ? e(consequent_10) : C(K).length == 1 && e(consequent_11, 1);
			}), N(t), p(e, t);
		};
		o(u, (e) => {
			C(Z) && e(consequent_12);
		}), N(i), N(t), c(7, t, () => W), p(e, t);
	}, Je = D(() => s.kind == "attack" && (Object.values(C(G).plugins).length > 0 || C(K).length == 1));
	o(qe, (e) => {
		C(Je) && e(consequent_13);
	});
	var Ye = a(qe, 2), Xe = E(Ye);
	AccDiffInput(E(Xe), {
		id: "accdiff-manual-adjust",
		get value() {
			return C(H).accuracy;
		},
		set value(e) {
			C(H).accuracy = e;
		}
	}), N(Xe);
	var Ze = a(Xe, 2), consequent_14 = (e) => {
		var t = Ee(), n = a(E(t), 2);
		l(n, 21, () => C(X), _, (e, t) => {
			var n = Te(), r = E(n), i = a(r);
			N(n), T((e, n) => {
				U(r, 1, `cci cci-${e ?? ""} i--4 i--light`, "svelte-13q4b2q"), u(i, ` ${n ?? ""}
                ${C(t).val ?? ""}`);
			}, [() => C(t).type.toLowerCase(), () => C(X).length && C(X).length < 3 ? C(t).type.toUpperCase() : ""]), S("click", n, () => deployTemplate(C(t))), p(e, n);
		}), N(n), N(t), p(e, t);
	};
	o(Ze, (e) => {
		C(X) && C(X).length > 0 && e(consequent_14);
	}), N(Ye);
	var Qe = a(Ye, 2), $e = E(Qe), et = E($e), consequent_16 = (e) => {
		var t = m();
		I(v(t), () => C(K).length, (e) => {
			var t = De(), n = E(t), r = a(E(n)), i = a(E(r)), consequent_15 = (e) => {
				var t = ne();
				T(() => u(t, `vs ${C(K)[0].targetName ?? ""}`)), p(e, t);
			};
			o(i, (e) => {
				C(K).length > 0 && e(consequent_15);
			}), N(r), R(), N(n), N(t), c(7, n, () => W), p(e, t);
		}), p(e, t);
	};
	o(et, (e) => {
		C(K).length < 2 && e(consequent_16);
	});
	var tt = a(et, 2), nt = E(tt), consequent_17 = (e) => {
		var t = Oe();
		TotalAccuracy(E(t), {
			get target() {
				return C(H);
			},
			id: "total-display-0"
		}), N(t), p(e, t);
	}, consequent_18 = (e) => {
		var t = ke();
		TotalAccuracy(E(t), {
			id: "total-display-0",
			onlyTarget: !0,
			get target() {
				return C(K)[0];
			},
			set target(e) {
				C(K)[0] = e;
			}
		}), N(t), f("mouseenter", t, (e) => targetHoverIn(e, C(K)[0].targetUuid)), f("mouseleave", t, (e) => targetHoverOut(e, C(K)[0].targetUuid)), p(e, t);
	}, alternate_2 = (e) => {
		var t = Me();
		l(t, 31, () => C(K), (e) => e.targetUuid, (e, t, n, r) => {
			var i = je(), s = E(i), l = a(E(s)), d = E(l, !0);
			N(l), R(), N(s);
			var m = a(s, 2), h = E(m), g = E(h);
			{
				let e = D(() => `total-display-${C(n)}`);
				TotalAccuracy(g, {
					get id() {
						return C(e);
					},
					get target() {
						return C(K)[C(n)];
					},
					set target(e) {
						C(K)[C(n)] = e;
					}
				});
			}
			N(h);
			var _ = a(h, 2), v = E(_), y = a(v, 2);
			L(y);
			var x = a(y, 2), consequent_19 = (e) => {
				Cover(e, {
					get disabled() {
						return C(G).seeking;
					},
					class: "accdiff-targeted-cover flexrow flex-center",
					labelClass: "i--2",
					get cover() {
						return C(t).cover;
					},
					set cover(e) {
						C(t).cover = e;
					}
				});
			}, alternate_1 = (e) => {
				p(e, Ae());
			};
			o(x, (e) => {
				C(Z) ? e(consequent_19) : e(alternate_1, -1);
			});
			var w = a(x, 2);
			L(w);
			var O = a(w, 2);
			N(_), N(m), N(i), T(() => {
				M(s, "for", C(t).targetUuid), u(d, C(K)[C(n)].targetName);
			}), f("mouseenter", i, (e) => targetHoverIn(e, C(K)[C(n)].targetUuid)), f("mouseleave", i, (e) => targetHoverOut(e, C(K)[C(n)].targetUuid)), S("click", v, () => C(t).accuracy = C(t).accuracy + 1), B(y, () => C(t).accuracy, (e) => C(t).accuracy = e), B(w, () => C(t).difficulty, (e) => C(t).difficulty = e), S("click", O, () => C(t).difficulty = C(t).difficulty + 1), c(5, i, () => W, () => ({
				delay: 100,
				duration: 300
			})), c(6, i, () => W, () => ({ duration: 100 })), b(i, () => ae, () => ({ duration: 200 })), p(e, i);
		}), N(t), p(e, t);
	};
	o(nt, (e) => {
		C(K).length == 0 ? e(consequent_17) : C(K).length == 1 ? e(consequent_18, 1) : e(alternate_2, -1);
	}), N(tt), N($e), N(Qe), N($);
	var rt = a($, 2), it = E(rt);
	te(it, (e) => focus?.(e));
	var at = a(it, 2);
	N(rt), N(Q), te(Q, (e) => escToCancel?.(e)), T(() => M($, "id", `${s.kind ?? ""}-accdiff-dialog`)), f("submit", Q, (e) => {
		e.preventDefault(), V(y, !0), d("submit");
	}), S("click", at, () => {
		V(y, !0), d("cancel");
	}), p(e, Q), k();
}
s(["click"]);
//#endregion
export { AccDiffHUD as default };

//# sourceMappingURL=AccDiffHUD-CUEThf4J.mjs.map