import "./chunk-DAAM-nuR.mjs";
import { C as e, D as t, I as n, R as r, S as i, W as a, Y as o, Z as s, at as c, ct as l, dt as u, et as d, ft as f, ht as p, j as m, lt as h, o as g, st as _, ut as v, v as y, w as b, y as x } from "./slidinghud-Ci-nXn7_.mjs";
import "./disclose-version-D7mHcnt5.mjs";
import { a as S } from "./legacy-BniSAU0y.mjs";
import { r as C } from "./MiniProfile-BYUp-B3F.mjs";
import w from "./AccDiffHUD-CUEThf4J.mjs";
import T from "./DamageHUD-DG46OJIW.mjs";
import E from "./StructStressHUD-PGDvT6ZE.mjs";
//#region src/module/apps/slidinghud/sidebar-width.ts
var D = v(0, (e) => {
	let t = document.getElementById("sidebar");
	async function setWidth() {
		t && (await new Promise((e) => setTimeout(e, 200)), e(t.offsetWidth || 0));
	}
	setWidth(), Hooks.on("collapseSidebar", setWidth);
}), O = h(v(null, (e) => {
	function updateData(t) {
		e(t.defaultPrevented ? null : t.dataTransfer ?? null);
	}
	document.addEventListener("dragstart", (e) => {
		setTimeout(() => updateData(e), 0);
	}, {
		capture: !0,
		passive: !0
	}), document.addEventListener("dragend", (t) => {
		e(null);
	}, {
		capture: !0,
		passive: !0
	});
}), (e) => !!e), k = r("<div class=\"component grid-enforcement svelte-imp4iy\"><!></div>"), A = r("<div id=\"hudzone\"></div>");
function SlidingHUDZone(r, h) {
	f(h, !0);
	let $isDragging = () => l(O, "$isDragging", v), $sidebarWidth = () => l(D, "$sidebarWidth", v), [v, j] = _(), M = g(h, "faded", 7), N = m(), P = d({
		hase: w,
		attack: w,
		damage: T,
		struct: E,
		stress: E
	}), F = d({
		hase: { open: null },
		attack: { open: null },
		damage: { open: null },
		struct: { open: null },
		stress: { open: null }
	});
	function open(e, t) {
		N(`${e}.cancel`), F[e].open = (/* @__PURE__ */ new Date()).getTime(), F[e].data = t;
	}
	function close(e) {
		N(`${e}.cancel`), F[e].open = null, F[e].data = null;
	}
	function refresh(e, t) {
		F[e].data = t;
	}
	function data(e) {
		if (F[e] && F[e].data) return F[e].data;
	}
	function isOpen(e) {
		return (F[e] && F[e].open) !== null;
	}
	function fade(e) {
		M(e == "out");
	}
	function forward(e, t, n) {
		N(`${e}.${t}`, n || void 0), F[e].open = null, F[e].data = null;
	}
	let I = c(() => Object.keys(F).filter((e) => F[e].open).sort((e, t) => F[t].open - F[e].open));
	var L = {
		open,
		close,
		refresh,
		data,
		isOpen,
		fade
	}, R = A();
	let z;
	t(R, 29, () => a(I), (e) => e + F[e].data.title, (t, r) => {
		let o = c(() => P[a(r)]);
		var l = k();
		b(s(l), () => a(o), (e, t) => {
			t(e, {
				get kind() {
					return a(r);
				},
				get data() {
					return F[a(r)].data;
				},
				$$events: {
					submit: () => forward(a(r), "submit", F[a(r)].data),
					cancel: () => forward(a(r), "cancel")
				}
			});
		}), p(l), i(l, () => C, null), e(7, l, () => S), n(t, l);
	}), p(R), o(() => {
		z = x(R, 1, "lancer-hud-zone svelte-imp4iy", null, z, { faded: M() || $isDragging() }), y(R, `bottom: 0; right: ${$sidebarWidth() ?? ""}px`);
	}), n(r, R);
	var B = u(L);
	return j(), B;
}
//#endregion
export { SlidingHUDZone as default };

//# sourceMappingURL=SlidingHUDZone-CYba6bF2.mjs.map