import "./chunk-DAAM-nuR.mjs";
import { $ as e, A as t, C as n, D as r, F as i, G as a, H as o, I as s, O as c, Q as l, R as u, U as d, W as f, Y as p, Z as m, b as h, dt as g, ft as _, h as v, ht as y, j as b, m as x, mt as S, o as C, s as w, u as T, v as E, y as D } from "./slidinghud-Ci-nXn7_.mjs";
import "./disclose-version-D7mHcnt5.mjs";
import { a as O } from "./legacy-BniSAU0y.mjs";
//#region node_modules/svelte/src/easing/index.js
function cubicOut(e) {
	let t = e - 1;
	return t * t * t + 1;
}
//#endregion
//#region node_modules/svelte/src/animate/index.js
function flip(e, { from: t, to: n }, r = {}) {
	var { delay: i = 0, duration = (e) => Math.sqrt(e) * 120, easing: a = cubicOut } = r, o = getComputedStyle(e), s = o.transform === "none" ? "" : o.transform, [c, l] = o.transformOrigin.split(" ").map(parseFloat);
	c /= e.clientWidth, l /= e.clientHeight;
	var u = get_zoom(e), d = e.clientWidth / n.width / u, f = e.clientHeight / n.height / u, p = t.left + t.width * c, m = t.top + t.height * l, h = n.left + n.width * c, g = n.top + n.height * l, _ = (p - h) * d, v = (m - g) * f, y = t.width / n.width, b = t.height / n.height;
	return {
		delay: i,
		duration: typeof duration == "function" ? duration(Math.sqrt(_ * _ + v * v)) : duration,
		easing: a,
		css: (e, t) => `transform: ${s} translate(${t * _}px, ${t * v}px) scale(${e + t * y}, ${e + t * b});`
	};
}
function get_zoom(e) {
	if ("currentCSSZoom" in e) return e.currentCSSZoom;
	for (var t = e, n = 1; t !== null;) n *= +getComputedStyle(t).zoom, t = t.parentElement;
	return n;
}
//#endregion
//#region src/module/apps/components/HudCheckbox.svelte
var k = u("<i></i>"), A = u("<label><input type=\"checkbox\"/> <!> <span style=\"text-wrap: nowrap;\" class=\"svelte-14gn6zy\"> </span></label>");
function HudCheckbox(r, a) {
	_(a, !1);
	let c = b(), l = C(a, "style", 8, ""), u = C(a, "label", 8, ""), d = C(a, "icon", 8, ""), f = C(a, "tooltip", 8, null), S = C(a, "checked", 8, null), j = C(a, "value", 12, !1), M = C(a, "partial", 8, !1), N = C(a, "disabled", 8, !1), P = C(a, "visible", 8, !0);
	S() !== null && j(S()), w();
	var F = A();
	let I;
	var L = m(F);
	x(L);
	var R = e(L, 2), consequent = (e) => {
		var t = k();
		p(() => D(t, 1, `${d() ?? ""} i--2`, "svelte-14gn6zy")), s(e, t);
	};
	t(R, (e) => {
		d() && e(consequent);
	});
	var z = e(R, 2), B = m(z, !0);
	y(z), y(F), p(() => {
		I = D(F, 1, "container svelte-14gn6zy", null, I, { invisible: !P() }), E(F, l()), v(F, "data-tooltip", f()), L.disabled = N(), D(L, 1, h(M() ? "partial" : ""), "svelte-14gn6zy"), i(B, u());
	}), T(L, j), o("change", L, () => c("change", j())), n(3, F, () => O), s(r, F), g();
}
//#endregion
//#region src/module/apps/components/MiniProfile.svelte
var j = u("<span data-tooltip=\"Attack bonus\"><i class=\"cci cci-reticule\"></i> </span>"), M = u("<span><i></i> </span>"), N = u("<div class=\"mini-weapon-profile-accuracy flexrow\"><!> <!></div> <span class=\"mini-weapon-profile-separator\">//</span>", 1), P = u("<span><i></i> </span>"), F = u("<span><i></i> </span>"), I = u("<span class=\"mini-weapon-profile-separator\">//</span> <div class=\"mini-weapon-profile-damage flexrow\"></div>", 1), L = u("<div class=\"mini-weapon-profile flexrow\"><!> <div class=\"mini-weapon-profile-range flexrow\"></div> <!></div>");
function MiniProfile(n, o) {
	_(o, !1);
	let u = C(o, "profile", 8);
	w();
	var h = L(), b = m(h), consequent_2 = (n) => {
		var r = N(), o = l(r), c = m(o), consequent = (t) => {
			var n = j(), r = e(m(n));
			y(n), p(() => i(r, `${(d(u()), a(() => u().attack < 0 ? "-" : "+")) ?? ""}${(d(u()), a(() => u().attack)) ?? ""}`)), s(t, n);
		};
		t(c, (e) => {
			d(u()), a(() => u().attack) && e(consequent);
		});
		var f = e(c, 2), consequent_1 = (t) => {
			var n = M(), r = m(n), o = e(r, 1, !0);
			y(n), p((e) => {
				v(n, "data-tooltip", (d(u()), a(() => (u().accuracy ?? 0) > 0 ? "Accuracy" : "Difficulty"))), D(r, 1, `cci cci-${(d(u()), a(() => (u().accuracy ?? 0) > 0 ? "accuracy" : "difficulty")) ?? ""}`), i(o, e);
			}, [() => (d(u()), a(() => Math.abs(u().accuracy)))]), s(t, n);
		};
		t(f, (e) => {
			d(u()), a(() => u().accuracy) && e(consequent_1);
		}), y(o), S(2), s(n, r);
	};
	t(b, (e) => {
		d(u()), a(() => u().attack || u().accuracy) && e(consequent_2);
	});
	var x = e(b, 2);
	r(x, 5, () => (d(u()), a(() => u().range)), c, (t, n) => {
		var r = P(), o = m(r), c = e(o, 1, !0);
		y(r), p((e) => {
			v(r, "data-tooltip", (f(n), a(() => f(n).type))), D(o, 1, `cci cci-${e ?? ""}`), i(c, (f(n), a(() => f(n).val)));
		}, [() => (f(n), a(() => f(n).type.toLowerCase()))]), s(t, r);
	}), y(x);
	var T = e(x, 2), consequent_3 = (t) => {
		var n = I(), o = e(l(n), 2);
		r(o, 5, () => (d(u()), a(() => u().damage)), c, (t, n) => {
			var r = F(), o = m(r), c = e(o, 1, !0);
			y(r), p((e, t) => {
				v(r, "data-tooltip", (f(n), a(() => f(n).type))), D(o, 1, `cci cci-${e ?? ""} damage--${t ?? ""}`), i(c, (f(n), a(() => f(n).val)));
			}, [() => (f(n), a(() => f(n).type.toLowerCase())), () => (f(n), a(() => f(n).type.toLowerCase()))]), s(t, r);
		}), y(o), s(t, n);
	};
	t(T, (e) => {
		d(u()), a(() => u().damage) && e(consequent_3);
	}), y(h), s(n, h), g();
}
//#endregion
export { HudCheckbox as n, flip as r, MiniProfile as t };

//# sourceMappingURL=MiniProfile-BYUp-B3F.mjs.map