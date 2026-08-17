import "./chunk-DAAM-nuR.mjs";
import { t as e } from "./lancer-actor-DUbnXjU1.mjs";
import { $ as t, A as n, B as r, D as i, F as a, H as o, I as s, O as c, R as l, V as u, W as d, Y as f, Z as p, at as m, dt as h, ft as g, ht as _, j as v, x as y, y as b } from "./slidinghud-Ci-nXn7_.mjs";
import "./disclose-version-D7mHcnt5.mjs";
//#region src/module/apps/struct_stress/StructStressHUD.svelte
var x = l("<i></i>"), S = l("<i class=\"mdi mdi-hexagon-outline i--4 damage-pip damaged svelte-1gz7luo\"></i>"), C = l("<div class=\"lancer-hud-body svelte-1gz7luo\"><h4 class=\"svelte-1gz7luo\"> </h4> <div class=\"damage-preview svelte-1gz7luo\"><!> <!></div> <p class=\"message\"> </p></div>"), w = l("<form id=\"structstress\" class=\"lancer-hud structstress window-content\"><div class=\"lancer-header lancer-primary medium\"><i></i> <span> </span></div> <!> <div class=\"lancer-hud-buttons flexrow\"><button class=\"dialog-button submit default\" data-button=\"submit\" type=\"submit\"><i class=\"fas fa-check\"></i> Roll</button> <button class=\"dialog-button cancel\" data-button=\"cancel\" type=\"button\"><i class=\"fas fa-times\"></i> Cancel</button></div></form>");
function StructStressHUD(r, l) {
	g(l, !0);
	let T = m(() => l.data.title), E = m(() => l.data.stat), D = m(() => getActor(l.data.actorUuid)), O = m(() => d(D) ? ` -- ${d(D).token?.name || d(D).name}` : ""), k = m(() => d(E) === "stress" ? "reactor" : d(E)), A = m(() => getCurrent(d(D))), j = m(() => getDamage(d(D))), M = v();
	function getActor(t) {
		if (!t) return null;
		try {
			return e.fromUuidSync(t);
		} catch {
			return null;
		}
	}
	function focus(e) {
		e.focus();
	}
	function getCurrent(e) {
		return !e || !e.is_mech() && !e.is_npc() ? 0 : Math.max(e.system[d(E)].value - 1, 0);
	}
	function getDamage(e) {
		return !e || !e.is_mech() && !e.is_npc() ? 0 : e.system[d(E)].max - getCurrent(e);
	}
	var N = w(), P = p(N), F = p(P), I = t(F, 2), L = p(I);
	_(I), _(P);
	var R = t(P, 2), consequent = (e) => {
		var n = C(), r = p(n), o = p(r);
		_(r);
		var l = t(r, 2), u = p(l);
		i(u, 17, () => ({ length: d(A) }), c, (e, t) => {
			var n = x();
			f(() => b(n, 1, `cci cci-${d(k) ?? ""} i--4 damage-pip`, "svelte-1gz7luo")), s(e, n);
		}), i(t(u, 2), 17, () => ({ length: d(j) }), c, (e, t) => {
			s(e, S());
		}), _(l);
		var m = t(l, 2), h = p(m);
		_(m), _(n), f(() => {
			a(o, `${d(D)?.name ?? "UNKNOWN MECH" ?? ""} has taken ${d(k) ?? ""} damage!`), a(h, `Roll ${d(j) ?? ""}d6 to determine what happens.`);
		}), s(e, n);
	}, z = m(() => d(D) && (d(D).is_mech() || d(D).is_npc()));
	n(R, (e) => {
		d(z) && e(consequent);
	});
	var B = t(R, 2), V = p(B);
	y(V, (e) => focus?.(e));
	var H = t(V, 2);
	_(B), _(N), f(() => {
		b(F, 1, `cci cci-${d(k) ?? ""} i--4 i--light`, "svelte-1gz7luo"), a(L, `${d(T) ?? ""}${d(O) ?? ""}`);
	}), o("submit", N, (e) => {
		e.preventDefault(), M("submit");
	}), u("click", H, () => M("cancel")), s(r, N), h();
}
r(["click"]);
//#endregion
export { StructStressHUD as default };

//# sourceMappingURL=StructStressHUD-PGDvT6ZE.mjs.map