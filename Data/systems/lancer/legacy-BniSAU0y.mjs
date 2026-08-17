import "./chunk-DAAM-nuR.mjs";
import { pt as e } from "./slidinghud-Ci-nXn7_.mjs";
//#region node_modules/svelte/src/transition/index.js
var linear = (e) => e;
function cubic_out(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function cubic_in_out(e) {
	return e < .5 ? 4 * e * e * e : .5 * (2 * e - 2) ** 3 + 1;
}
function split_css_unit(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function blur(e, { delay: t = 0, duration: n = 400, easing: r = cubic_in_out, amount: i = 5, opacity: a = 0 } = {}) {
	let o = getComputedStyle(e), s = +o.opacity, c = o.filter === "none" ? "" : o.filter, l = s * (1 - a), [u, d] = split_css_unit(i);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `opacity: ${s - l * t}; filter: ${c} blur(${t * u}${d});`
	};
}
function fade(e, { delay: t = 0, duration: n = 400, easing: r = linear } = {}) {
	let i = +getComputedStyle(e).opacity;
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e) => `opacity: ${e * i}`
	};
}
function fly(e, { delay: t = 0, duration: n = 400, easing: r = cubic_out, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = split_css_unit(i), [p, m] = split_css_unit(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${l} translate(${(1 - e) * d}${f}, ${(1 - e) * p}${m});
			opacity: ${c - u * t}`
	};
}
function slide(e, { delay: t = 0, duration: n = 400, easing: r = cubic_out, axis: i = "y" } = {}) {
	let a = getComputedStyle(e), o = +a.opacity, s = i === "y" ? "height" : "width", c = parseFloat(a[s]), l = i === "y" ? ["top", "bottom"] : ["left", "right"], u = l.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`), d = parseFloat(a[`padding${u[0]}`]), f = parseFloat(a[`padding${u[1]}`]), p = parseFloat(a[`margin${u[0]}`]), m = parseFloat(a[`margin${u[1]}`]), h = parseFloat(a[`border${u[0]}Width`]), g = parseFloat(a[`border${u[1]}Width`]);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e) => `overflow: hidden;opacity: ${Math.min(e * 20, 1) * o};${s}: ${e * c}px;padding-${l[0]}: ${e * d}px;padding-${l[1]}: ${e * f}px;margin-${l[0]}: ${e * p}px;margin-${l[1]}: ${e * m}px;border-${l[0]}-width: ${e * h}px;border-${l[1]}-width: ${e * g}px;min-${s}: 0`
	};
}
function assign(e, t) {
	for (let n in t) e[n] = t[n];
	return e;
}
function crossfade({ fallback: e, ...t }) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	function crossfade(e, n, r) {
		let { delay: i = 0, duration = (e) => Math.sqrt(e) * 30, easing: a = cubic_out } = assign(assign({}, t), r), o = e.getBoundingClientRect(), s = n.getBoundingClientRect(), c = o.left - s.left, l = o.top - s.top, u = o.width / s.width, d = o.height / s.height, f = Math.sqrt(c * c + l * l), p = getComputedStyle(n), m = p.transform === "none" ? "" : p.transform, h = +p.opacity;
		return {
			delay: i,
			duration: typeof duration == "function" ? duration(f) : duration,
			easing: a,
			css: (e, t) => `
			   opacity: ${e * h};
			   transform-origin: top left;
			   transform: ${m} translate(${t * c}px,${t * l}px) scale(${e + (1 - e) * u}, ${e + (1 - e) * d});
		   `
		};
	}
	function transition(t, n, r) {
		return (i, a) => (t.set(a.key, i), () => {
			if (n.has(a.key)) {
				let e = n.get(a.key);
				return n.delete(a.key), crossfade(e, i, a);
			}
			return t.delete(a.key), e && e(i, a, r);
		});
	}
	return [transition(r, n, !1), transition(n, r, !0)];
}
//#endregion
//#region node_modules/svelte/src/internal/flags/legacy.js
e();
//#endregion
export { slide as a, fly as i, crossfade as n, fade as r, blur as t };

//# sourceMappingURL=legacy-BniSAU0y.mjs.map