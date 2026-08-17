import "./chunk-DAAM-nuR.mjs";
import { $n as e, $r as t, ar as n } from "./lancer-actor-DUbnXjU1.mjs";
import { $ as r, A as i, B as a, C as o, D as s, F as c, G as l, H as u, I as d, J as f, K as p, L as m, M as h, N as g, O as _, Q as v, R as y, S as b, U as x, V as S, W as C, Y as w, Z as T, _ as E, at as D, c as O, dt as k, f as A, ft as j, g as M, h as N, ht as P, it as F, j as ee, m as I, mt as te, o as L, p as R, q as z, rt as B, s as V, tt as H, x as ne, y as U } from "./slidinghud-Ci-nXn7_.mjs";
import "./disclose-version-D7mHcnt5.mjs";
import { a as W, n as G, r as K } from "./legacy-BniSAU0y.mjs";
import { n as q, r as re, t as ie } from "./MiniProfile-BYUp-B3F.mjs";
//#region src/module/apps/damage/DamageInput.svelte
var J = y("<option class=\"svelte-1u0z4l8\"> </option>"), Y = y("<button class=\"lancer-button damage-delete svelte-1u0z4l8\" type=\"button\" data-tooltip=\"Remove this damage type\"><i class=\"fas fa-trash svelte-1u0z4l8\"></i></button>"), X = y("<div class=\"damage-input-container svelte-1u0z4l8\"><i></i> <select class=\"damage-input-type svelte-1u0z4l8\"></select> <input class=\"lancer-input damage-input-val svelte-1u0z4l8\" type=\"text\" data-dtype=\"string\" placeholder=\"0\"/> <!></div>");
function DamageInput(e, n) {
	j(n, !1);
	let a = ee(), f = Object.entries(t), m = L(n, "damage", 12), h = L(n, "deletable", 8, !0);
	function selected(e) {
		return m().type === e;
	}
	function dispatchDelete() {
		a("delete");
	}
	V();
	var g = X(), v = T(g), y = r(v, 2);
	s(y, 5, () => f, _, (e, t) => {
		var n = J(), r = T(n, !0);
		P(n);
		var i = {};
		w((e) => {
			M(n, e), c(r, (C(t), l(() => C(t)[0]))), i !== (i = (C(t), l(() => C(t)[1]))) && (n.value = (n.__value = (C(t), l(() => C(t)[1]))) ?? "");
		}, [() => (C(t), l(() => selected(C(t)[1])))]), d(e, n);
	}), P(y);
	var b = r(y, 2);
	I(b);
	var S = r(b, 2), consequent = (e) => {
		var t = Y();
		u("click", t, dispatchDelete), d(e, t);
	};
	i(S, (e) => {
		h() && e(consequent);
	}), P(g), w((e, t) => {
		U(v, 1, `i--3 cci cci-${e ?? ""} damage--${t ?? ""}`, "svelte-1u0z4l8"), N(v, "data-tooltip", (x(m()), l(() => m().type)));
	}, [() => (x(m()), l(() => m().type.toLowerCase())), () => (x(m()), l(() => m().type.toLowerCase()))]), E(y, () => m().type, (e) => (m(m().type = e, !0), p(() => {}))), R(b, () => m().val, (e) => (m(m().val = e, !0), p(() => {}))), o(5, g, () => W, () => ({
		delay: 100,
		duration: 300
	})), o(6, g, () => W, () => ({ duration: 100 })), d(e, g), k();
}
//#endregion
//#region src/module/apps/damage/HitRadio.svelte
var ae = 0, oe = y("<div class=\"hit-quality-arrow svelte-x2k5tj\"></div>"), Z = y("<input type=\"radio\"/> <label><i></i> <span class=\"no-grow\"> </span> <!></label>", 1), se = y("<div></div>");
function HitRadio(e, t) {
	j(t, !1);
	let n = [], a = L(t, "quality", 12), u = L(t, "disabled", 8, !1), f = L(t, "labelClass", 8, ""), p = L(t, "class", 8, ""), m = `damage-quality-input-${ae++}`, h = [
		{
			slug: "crit",
			human: "Crit",
			value: 2,
			icon: "fas fa-explosion"
		},
		{
			slug: "hit",
			human: "Hit",
			value: 1,
			icon: "fas fa-crosshairs"
		},
		{
			slug: "miss",
			human: "Miss",
			value: 0,
			icon: "mdi mdi-call-missed"
		}
	], [g, y] = G({});
	V();
	var b = se();
	let S;
	s(b, 5, () => h, _, (e, t) => {
		var s = Z(), p = v(s);
		I(p);
		var h, _ = r(p, 2), b = T(_), S = r(b, 2), E = T(S, !0);
		P(S);
		var D = r(S, 2), consequent = (e) => {
			var t = oe();
			o(1, t, () => g, () => ({ key: m })), o(2, t, () => y, () => ({ key: m })), d(e, t);
		};
		i(D, (e) => {
			C(t), x(a()), l(() => C(t).value == a()) && e(consequent);
		}), P(_), w(() => {
			N(p, "id", `${m}-${(C(t), l(() => C(t).slug)) ?? ""}`), U(p, 1, `no-grow ${(C(t), l(() => C(t).slug)) ?? ""}-cover`, "svelte-x2k5tj"), p.disabled = u(), h !== (h = (C(t), l(() => C(t).value))) && (p.value = (p.__value = (C(t), l(() => C(t).value))) ?? ""), N(_, "for", `${m}-${(C(t), l(() => C(t).slug)) ?? ""}`), U(_, 1, `lancer-hit-quality-radio-label ${f() ?? ""}`, "svelte-x2k5tj"), N(_, "data-tooltip", (C(t), l(() => C(t).human))), U(b, 1, `${(C(t), l(() => C(t).icon)) ?? ""} i--2`, "svelte-x2k5tj"), c(E, (C(t), l(() => C(t).human)));
		}), A(n, [], p, () => (C(t), l(() => C(t).value), a()), a), d(e, s);
	}), P(b), w(() => S = U(b, 1, `lancer-hit-quality-radio ${p() ?? ""}`, "svelte-x2k5tj", S, { disabled: u() })), d(e, b), k();
}
//#endregion
//#region src/module/apps/damage/DamageTarget.svelte
var ce = y("<button aria-label=\"Add a bonus damage type for only this target\" class=\"lancer-button add-damage-type small svelte-5uy3s3\" type=\"button\" data-tooltip=\"Add a bonus damage type for only this target\"><i class=\"mdi mdi-plus-thick svelte-5uy3s3\"></i></button>"), Q = y("<div class=\"target-bonus-damage-wrapper\"><!></div>"), $ = y("<button aria-label=\"Add a bonus damage type for only this target\" class=\"lancer-button add-damage-type svelte-5uy3s3\" type=\"button\" data-tooltip=\"Add a bonus damage type for only this target\"><i class=\"mdi mdi-plus-thick svelte-5uy3s3\"></i></button>"), le = y("<div><span class=\"target-name flexrow lancer-mini-header svelte-5uy3s3\">🞂<b> </b>🞀</span> <div class=\"flexrow\"><img class=\"lancer-hit-thumb accdiff-target-has-dropdown svelte-5uy3s3\"/> <div class=\"card clipped target-bonus-damage svelte-5uy3s3\"><span class=\"flexrow\" style=\"width: 100%\"><b class=\"target-bonus-damage-title svelte-5uy3s3\">Bonus</b> <!></span> <!> <!></div></div>  <div class=\"hit-quality svelte-5uy3s3\"><!></div> <div class=\"flexrow damage-target-config svelte-5uy3s3\"><!> <!> <!></div></div>");
function DamageTarget(n, a) {
	j(a, !1);
	let m = H(), h = ee(), g = L(a, "target", 12), v = H();
	function addBonusDamage() {
		g(g().bonusDamage = [...g().bonusDamage, {
			type: t.Kinetic,
			val: "1d6"
		}], !0);
	}
	function removeBonusDamage(e) {
		g(g().bonusDamage = g().bonusDamage.filter((t, n) => n !== e), !0);
	}
	function toggleAP(e) {
		h("ap", e.detail);
	}
	function toggleParacausal(e) {
		h("paracausal", e.detail), e.detail && g(g().ap = !0, !0);
	}
	function toggleHalfDamage(e) {
		h("halfDmg", e.detail);
	}
	z(() => (x(g()), e), () => {
		B(m, g().quality === e.Hit ? "target-hit" : g().quality === e.Crit ? "target-crit" : "target-miss");
	}), f(), V();
	var y = le(), b = T(y), S = r(T(b)), E = T(S, !0);
	P(S), te(), P(b);
	var D = r(b, 2), A = T(D);
	O(A, (e) => B(v, e), () => C(v));
	var M = r(A, 2), F = T(M), I = r(T(F), 2), consequent = (e) => {
		var t = ce();
		u("click", t, addBonusDamage), d(e, t);
	};
	i(I, (e) => {
		x(g()), l(() => g().bonusDamage.length) && e(consequent);
	}), P(F);
	var R = r(F, 2);
	s(R, 1, () => (x(g()), l(() => g().bonusDamage)), _, (e, t, n) => {
		var r = Q();
		DamageInput(T(r), {
			get damage() {
				return (x(g()), l(() => g().bonusDamage))[n];
			},
			set damage(e) {
				(x(g()), l(() => g().bonusDamage))[n] = e, p(() => g());
			},
			$$events: { delete: () => removeBonusDamage(n) },
			$$legacy: !0
		}), P(r), d(e, r);
	});
	var ne = r(R, 2), consequent_1 = (e) => {
		var t = $();
		u("click", t, addBonusDamage), d(e, t);
	};
	i(ne, (e) => {
		x(g()), l(() => !g().bonusDamage.length) && e(consequent_1);
	}), P(M), P(D);
	var G = r(D, 2);
	HitRadio(T(G), {
		class: "damage-target-quality flexrow",
		get quality() {
			return g().quality;
		},
		set quality(e) {
			g(g().quality = e, !0);
		},
		$$legacy: !0
	}), P(G);
	var K = r(G, 2), re = T(K);
	q(re, {
		icon: "mdi mdi-shield-off-outline",
		tooltip: "Armor Piercing (AP)",
		get disabled() {
			return x(g()), l(() => g().paracausal);
		},
		get value() {
			return g().ap;
		},
		set value(e) {
			g(g().ap = e, !0);
		},
		$$events: { change: toggleAP },
		$$legacy: !0
	});
	var ie = r(re, 2);
	q(ie, {
		icon: "cci cci-large-beam",
		tooltip: "For 'cannot be reduced' effects like the Paracausal mod",
		style: "margin: 0 0.3em",
		get value() {
			return g().paracausal;
		},
		set value(e) {
			g(g().paracausal = e, !0);
		},
		$$events: { change: toggleParacausal },
		$$legacy: !0
	}), q(r(ie, 2), {
		icon: "mdi mdi-fraction-one-half",
		tooltip: "For effects which cause the attacker to deal half damage in addition to resistance, like Heavy Gunner",
		get value() {
			return g().halfDamage;
		},
		set value(e) {
			g(g().halfDamage = e, !0);
		},
		$$events: { change: toggleHalfDamage },
		$$legacy: !0
	}), P(K), P(y), w(() => {
		U(y, 1, `damage-hud-target-card card ${C(m)}`, "svelte-5uy3s3"), c(E, (x(g()), l(() => g().targetName))), N(A, "alt", (x(g()), l(() => g().targetName ?? void 0))), N(A, "src", (x(g()), l(() => g().targetImg)));
	}), o(5, y, () => W, () => ({
		delay: 100,
		duration: 300
	})), o(6, y, () => W, () => ({ duration: 100 })), d(n, y), k();
}
//#endregion
//#region src/module/apps/damage/DamageHUD.svelte
var ue = y("<div class=\"lancer-header lancer-weapon medium\"><i class=\"cci cci-large-beam i--4 i--light\"></i> <span> </span></div>"), de = y("<div><!></div>"), fe = y("<div><!></div>"), pe = y("<div><!></div>"), me = y("<div><!></div>"), he = y("<i></i> <input class=\"lancer-input reliable-value svelte-1nxk1l1\" type=\"text\" data-dtype=\"string\"/>", 1), ge = y("<div role=\"radiogroup\" tabindex=\"0\"><span class=\"target-name flexrow lancer-mini-header svelte-1nxk1l1\">🞂<b class=\"svelte-1nxk1l1\"> </b>🞀</span> <div class=\"target-body flexrow svelte-1nxk1l1\"><img class=\"lancer-hit-thumb accdiff-target-has-dropdown svelte-1nxk1l1\"/> <!></div></div>"), _e = y("<div role=\"radiogroup\" tabindex=\"0\"><!></div>"), ve = y("<form id=\"damage-hud\" class=\"lancer lancer-hud damage-hud window-content svelte-1nxk1l1\"><!> <!> <div class=\"lancer-hud-body\"><div class=\"damage-grid svelte-1nxk1l1\"><div class=\"base-damage lancer-border-primary svelte-1nxk1l1\"><h4 class=\"damage-hud-section lancer-border-primary flexrow svelte-1nxk1l1\">Base Damage <button class=\"add-damage-type svelte-1nxk1l1\" type=\"button\" aria-label=\"Add new base damage type\"><i class=\"mdi mdi-plus-thick svelte-1nxk1l1\" data-tooltip=\"Add a base damage type\"></i></button></h4> <!> <!></div> <div class=\"bonus-damage svelte-1nxk1l1\"><h4 class=\"damage-hud-section lancer-border-primary flexrow svelte-1nxk1l1\">Bonus Damage <button class=\"add-damage-type svelte-1nxk1l1\" type=\"button\" aria-lable=\"Add new bonus damage type\"><i class=\"mdi mdi-plus-thick svelte-1nxk1l1\" data-tooltip=\"Add a bonus damage type\"></i></button></h4> <!> <!></div></div> <div class=\"damage-hud-options-grid svelte-1nxk1l1\"><h4 class=\"damage-hud-section lancer-border-primary svelte-1nxk1l1\" style=\"justify-content: center; grid-area: title\">Configuration</h4> <!> <!> <!> <!> <div class=\"flexrow\" style=\"grid-area: reliable; align-items: center\"><!> <!></div></div> <div class=\"damage-hud-targets svelte-1nxk1l1\"><!></div></div> <div class=\"lancer-hud-buttons flexrow\"><button class=\"lancer-button lancer-secondary dialog-button submit default\" data-button=\"submit\" type=\"submit\"><i class=\"fas fa-check\"></i> Roll</button> <button class=\"dialog-button cancel\" data-button=\"cancel\" type=\"button\"><i class=\"fas fa-times\"></i> Cancel</button></div></form>");
function DamageHUD(a, l) {
	j(l, !0);
	let f = ee(), p = F(!1), y = F(!1), x = F(!1), E = F(!1), O = {}, A = D(() => l.data.title), M = D(() => l.data.lancerItem), L = D(() => l.data.lancerActor), z = D(() => l.data.base), V = D(() => l.data.weapon), H = D(() => l.data.targets), W = D(() => C(L) ? ` -- ${C(L).token?.name || C(L).name}` : ""), G = D(() => l.data.base.damage), J = D(() => l.data.base.bonusDamage), Y = D(() => l.data.weapon.damage), X = D(() => l.data.weapon.bonusDamage), ae = D(() => C(M) ? findProfile() : null), oe = D(() => !C(H).length || C(H)[0]?.quality === e.Hit ? "target-hit" : C(H)[0]?.quality === e.Crit ? "target-crit" : "target-miss");
	g(() => {
		O.targetToken = Hooks.on("targetToken", (e, t, n) => {
			e.isSelf && updateTargets();
		}), O.createActiveEffect = Hooks.on("createActiveEffect", updateTargets), O.deleteActiveEffect = Hooks.on("deleteActiveEffect", updateTargets), O.updateToken = Hooks.on("updateToken", (e) => {
			foundry.canvas.animation.CanvasAnimation.getAnimation(e.object?.animationName)?.promise.then(() => updateTargets()) ?? updateTargets();
		});
	}), h(() => {
		for (let e in O) Hooks.off(e, O[e]);
	});
	function focus(e) {
		e.focus();
	}
	function updateTargets() {
		l.data && l.data.replaceTargets(Array.from(game.user.targets).map((e) => e.document.uuid));
	}
	function escToCancel(e) {
		function escHandler(e) {
			e.key === "Escape" && (e.preventDefault(), f("cancel"));
		}
		return window.addEventListener("keydown", escHandler), { destroy() {
			window.removeEventListener("keydown", escHandler);
		} };
	}
	function findProfile() {
		return C(M)?.currentProfile() ?? {
			range: [],
			damage: []
		};
	}
	function reliableType() {
		let e = [
			t.Kinetic,
			t.Energy,
			t.Explosive
		], n = C(V)?.damage.find((t) => e.includes(t.type));
		return n ? n.type : C(V)?.damage.length ? C(V)?.damage[0].type : t.Kinetic;
	}
	function addBaseDamage() {
		C(z).damage = [...C(z).damage, {
			type: t.Kinetic,
			val: "1d6"
		}];
	}
	function addBonusDamage() {
		C(z).bonusDamage = [...C(z).bonusDamage, {
			type: t.Kinetic,
			val: "1d6"
		}];
	}
	function removeBaseDamage(e, t = !0) {
		t ? C(z).damage = C(z).damage.filter((t, n) => n !== e) : C(V) && (C(V).damage = C(V).damage.filter((t, n) => n !== e));
	}
	function removeBonusDamage(e, t = !0) {
		t ? C(z).bonusDamage = C(z).bonusDamage.filter((t, n) => n !== e) : C(V) && (C(V).bonusDamage = C(V).bonusDamage.filter((t, n) => n !== e));
	}
	function toggleAP(e) {
		for (let [t, n] of C(H).entries()) n.ap = e.detail, C(H)[t] = n;
	}
	function toggleParacausal(e) {
		for (let [t, n] of C(H).entries()) n.paracausal = e.detail, C(H)[t] = n;
		e.detail && (C(z).ap = !0, toggleAP(e));
	}
	function toggleHalfDamage(e) {
		for (let [t, n] of C(H).entries()) n.halfDamage = e.detail, C(H)[t] = n;
	}
	function updateTargetModifiers() {
		C(H).every((e) => e.ap) ? (C(z).ap = !0, B(y, !1)) : C(H).some((e) => e.ap) ? (C(z).ap = !1, B(y, !0)) : (C(z).ap = !1, B(y, !1)), C(H).every((e) => e.paracausal) ? (C(z).paracausal = !0, B(x, !1)) : C(H).some((e) => e.paracausal) ? (C(z).paracausal = !1, B(x, !0)) : (C(z).paracausal = !1, B(x, !1)), C(H).every((e) => e.halfDamage) ? (C(z).halfDamage = !0, B(E, !1)) : C(H).some((e) => e.halfDamage) ? (C(z).halfDamage = !1, B(E, !0)) : (C(z).halfDamage = !1, B(E, !1));
	}
	function targetHoverIn(e, t) {
		let r = n(t, { strict: !0 })?.object;
		r && (C(p) || r._onHoverIn(e));
	}
	function targetHoverOut(e, t) {
		let r = n(t, { strict: !0 })?.object;
		r && r._onHoverOut(e);
	}
	var Z = ve(), se = T(Z), consequent = (e) => {
		var t = ue(), n = r(T(t), 2), i = T(n);
		P(n), P(t), w(() => c(i, `${C(A) ?? ""}${C(W) ?? ""}`)), d(e, t);
	};
	i(se, (e) => {
		C(A) != "" && e(consequent);
	});
	var ce = r(se, 2), consequent_1 = (e) => {
		ie(e, { get profile() {
			return C(ae);
		} });
	};
	i(ce, (e) => {
		C(ae) && e(consequent_1);
	});
	var Q = r(ce, 2), $ = T(Q), le = T($), ye = T(le), be = r(T(ye));
	P(ye);
	var xe = r(ye, 2);
	s(xe, 17, () => C(Y), _, (e, t, n) => {
		var r = de();
		DamageInput(T(r), {
			get damage() {
				return C(Y)[n];
			},
			set damage(e) {
				C(Y)[n] = e;
			},
			$$events: { delete: () => removeBaseDamage(n, !1) }
		}), P(r), d(e, r);
	}), s(r(xe, 2), 17, () => C(G), _, (e, t, n) => {
		var r = fe();
		DamageInput(T(r), {
			get damage() {
				return C(G)[n];
			},
			set damage(e) {
				C(G)[n] = e;
			},
			$$events: { delete: () => removeBaseDamage(n) }
		}), P(r), d(e, r);
	}), P(le);
	var Se = r(le, 2), Ce = T(Se), we = r(T(Ce));
	P(Ce);
	var Te = r(Ce, 2);
	s(Te, 17, () => C(X), _, (e, t, n) => {
		var r = pe();
		DamageInput(T(r), {
			get damage() {
				return C(X)[n];
			},
			set damage(e) {
				C(X)[n] = e;
			},
			$$events: { delete: () => removeBonusDamage(n, !1) }
		}), P(r), d(e, r);
	}), s(r(Te, 2), 17, () => C(J), _, (e, t, n) => {
		var r = me();
		DamageInput(T(r), {
			get damage() {
				return C(J)[n];
			},
			set damage(e) {
				C(J)[n] = e;
			},
			$$events: { delete: () => removeBonusDamage(n) }
		}), P(r), d(e, r);
	}), P(Se), P($);
	var Ee = r($, 2), De = r(T(Ee), 2);
	q(De, {
		icon: "mdi mdi-shield-off-outline",
		label: "Armor Piercing (AP)",
		get disabled() {
			return C(z).paracausal;
		},
		style: "grid-area: ap",
		get value() {
			return C(z).ap;
		},
		set value(e) {
			C(z).ap = e;
		},
		get partial() {
			return C(y);
		},
		set partial(e) {
			B(y, e, !0);
		},
		$$events: { change: toggleAP }
	});
	var Oe = r(De, 2);
	q(Oe, {
		label: "Overkill",
		style: "grid-area: overkill",
		get value() {
			return C(V).overkill;
		},
		set value(e) {
			C(V).overkill = e;
		}
	});
	var ke = r(Oe, 2);
	q(ke, {
		icon: "cci cci-large-beam",
		label: "Cannot be Reduced",
		tooltip: "For 'cannot be reduced' effects like the Paracausal mod",
		style: "grid-area: paracausal",
		get value() {
			return C(z).paracausal;
		},
		set value(e) {
			C(z).paracausal = e;
		},
		get partial() {
			return C(x);
		},
		set partial(e) {
			B(x, e, !0);
		},
		$$events: { change: toggleParacausal }
	});
	var Ae = r(ke, 2);
	q(Ae, {
		icon: "mdi mdi-fraction-one-half",
		label: "Half Damage",
		tooltip: "For effects which cause the attacker to deal half damage in addition to resistance, like Heavy Gunner",
		style: "grid-area: halfdamage",
		get value() {
			return C(z).halfDamage;
		},
		set value(e) {
			C(z).halfDamage = e;
		},
		get partial() {
			return C(E);
		},
		set partial(e) {
			B(E, e, !0);
		},
		$$events: { change: toggleHalfDamage }
	});
	var je = r(Ae, 2), Me = T(je);
	q(Me, {
		label: "Reliable",
		style: "grid-area: reliable; max-width: fit-content; padding-right: 0.5em",
		get value() {
			return C(V).reliable;
		},
		set value(e) {
			C(V).reliable = e;
		}
	});
	var Ne = r(Me, 2), consequent_2 = (e) => {
		var t = he(), n = v(t), i = r(n, 2);
		I(i), w((e, t, r) => {
			U(n, 1, `cci i--2 cci-${e ?? ""} damage--${t ?? ""}`, "svelte-1nxk1l1"), N(n, "data-tooltip", r);
		}, [
			() => reliableType().toLowerCase(),
			() => reliableType().toLowerCase(),
			() => reliableType()
		]), o(7, n, () => K), R(i, () => C(V).reliableValue, (e) => C(V).reliableValue = e), o(7, i, () => K), d(e, t);
	};
	i(Ne, (e) => {
		C(V).reliable && e(consequent_2);
	}), P(je), P(Ee);
	var Pe = r(Ee, 2), Fe = T(Pe), consequent_3 = (e) => {
		var t = ge(), n = T(t), i = r(T(n)), a = T(i, !0);
		P(i), te(), P(n);
		var o = r(n, 2), s = T(o);
		HitRadio(r(s, 2), {
			class: "damage-target-quality flexcol",
			get quality() {
				return C(H)[0].quality;
			},
			set quality(e) {
				C(H)[0].quality = e;
			}
		}), P(o), P(t), w(() => {
			U(t, 1, `single-target-container ${C(oe)}`, "svelte-1nxk1l1"), c(a, C(H)[0].targetName), N(s, "alt", C(H)[0].targetName), N(s, "src", C(H)[0].targetImg);
		}), u("mouseenter", t, (e) => targetHoverIn(e, C(H)[0].targetUuid)), u("mouseleave", t, (e) => targetHoverOut(e, C(H)[0].targetUuid)), d(e, t);
	}, consequent_4 = (e) => {
		var t = m();
		s(v(t), 25, () => C(H), (e) => e.targetUuid, (e, t) => {
			var n = _e();
			DamageTarget(T(n), {
				get target() {
					return C(t);
				},
				$$events: {
					ap: updateTargetModifiers,
					paracausal: updateTargetModifiers,
					halfDmg: updateTargetModifiers
				}
			}), P(n), w(() => U(n, 1, `target-container ${C(H).length <= 1 ? "solo" : ""}`, "svelte-1nxk1l1")), u("mouseenter", n, (e) => targetHoverIn(e, C(t).targetUuid)), u("mouseleave", n, (e) => targetHoverOut(e, C(t).targetUuid)), b(n, () => re, () => ({ duration: 200 })), d(e, n);
		}), d(e, t);
	};
	i(Fe, (e) => {
		C(H).length === 1 ? e(consequent_3) : C(H).length > 1 && e(consequent_4, 1);
	}), P(Pe), P(Q);
	var Ie = r(Q, 2), Le = T(Ie);
	ne(Le, (e) => focus?.(e));
	var Re = r(Le, 2);
	P(Ie), P(Z), ne(Z, (e) => escToCancel?.(e)), u("submit", Z, (e) => {
		e.preventDefault(), B(p, !0), f("submit");
	}), S("click", be, addBaseDamage), S("click", we, addBonusDamage), S("click", Re, () => f("cancel")), d(a, Z), k();
}
a(["click"]);
//#endregion
export { DamageHUD as default };

//# sourceMappingURL=DamageHUD-DG46OJIW.mjs.map