import { i as e, r as t } from "./chunk-DAAM-nuR.mjs";
//#region node_modules/svelte/src/constants.js
var n = {}, i = Symbol(), a = "http://www.w3.org/1999/xhtml", o = "http://www.w3.org/2000/svg", s = "http://www.w3.org/1998/Math/MathML", c = Array.isArray, l = Array.prototype.indexOf, u = Array.prototype.includes, d = Array.from, f = Object.defineProperty, p = Object.getOwnPropertyDescriptor, m = Object.getOwnPropertyDescriptors, h = Object.prototype, g = Array.prototype, _ = Object.getPrototypeOf, v = Object.isExtensible;
function is_function(e) {
	return typeof e == "function";
}
var noop = () => {};
function run(e) {
	return e();
}
function run_all(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function deferred() {
	var e, t;
	return {
		promise: new Promise((n, i) => {
			e = n, t = i;
		}),
		resolve: e,
		reject: t
	};
}
var y = 1024, b = 2048, x = 4096, S = 8192, ee = 16384, C = 32768, w = 1 << 25, T = 65536, E = 1 << 19, te = 1 << 20, ne = 1 << 25, re = 65536, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, D = Symbol("$state"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class StaleReactionError extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function lifecycle_outside_component(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function async_derived_orphan() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function each_key_duplicate(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function effect_in_teardown(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function effect_in_unowned_derived() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function effect_orphan(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function effect_update_depth_exceeded() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function props_invalid_value(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function state_descriptors_fixed() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function state_prototype_fixed() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function state_unsafe_mutation() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function svelte_boundary_reset_onerror() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function derived_inert() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function hydration_mismatch(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function select_multiple_invalid_value() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function svelte_boundary_reset_noop() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function transition_slide_display(e) {
	console.warn("https://svelte.dev/e/transition_slide_display");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function set_hydrating(e) {
	O = e;
}
var k;
function set_hydrate_node(e) {
	if (e === null) throw hydration_mismatch(), n;
	return k = e;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(k));
}
function reset(e) {
	if (O) {
		if (/* @__PURE__ */ get_next_sibling(k) !== null) throw hydration_mismatch(), n;
		k = e;
	}
}
function next(e = 1) {
	if (O) {
		for (var t = e, n = k; t--;) n = /* @__PURE__ */ get_next_sibling(n);
		k = n;
	}
}
function skip_nodes(e = !0) {
	for (var t = 0, n = k;;) {
		if (n.nodeType === 8) {
			var i = n.data;
			if (i === "]") {
				if (t === 0) return n;
				--t;
			} else (i === "[" || i === "[!" || i[0] === "[" && !isNaN(Number(i.slice(1)))) && (t += 1);
		}
		var a = /* @__PURE__ */ get_next_sibling(n);
		e && n.remove(), n = a;
	}
}
function read_hydration_instruction(e) {
	if (!e || e.nodeType !== 8) throw hydration_mismatch(), n;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function equals(e) {
	return e === this.v;
}
function safe_not_equal(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function safe_equals(e) {
	return !safe_not_equal(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var A = !1, j = !1;
function enable_legacy_mode_flag() {
	j = !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var M = null;
function set_component_context(e) {
	M = e;
}
function push(e, t = !1, n) {
	M = {
		p: M,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: K,
		l: j && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function pop(e) {
	var t = M, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var i of n) create_user_effect(i);
	}
	return e !== void 0 && (t.x = e), t.i = !0, M = t.p, e ?? {};
}
function is_runes() {
	return !j || M !== null && M.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var N = [];
function run_micro_tasks() {
	var e = N;
	N = [], run_all(e);
}
function queue_micro_task(e) {
	if (N.length === 0 && !R) {
		var t = N;
		queueMicrotask(() => {
			t === N && run_micro_tasks();
		});
	}
	N.push(e);
}
function flush_tasks() {
	for (; N.length > 0;) run_micro_tasks();
}
function handle_error(e) {
	var t = K;
	if (t === null) return W.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	invoke_error_boundary(e, t);
}
function invoke_error_boundary(e, t) {
	for (; t !== null;) {
		if (t.f & 128) {
			if (!(t.f & 32768)) throw e;
			try {
				t.b.error(e);
				return;
			} catch (t) {
				e = t;
			}
		}
		t = t.parent;
	}
	throw e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var ge = ~(b | x | y);
function set_signal_status(e, t) {
	e.f = e.f & ge | t;
}
function update_derived_status(e) {
	e.f & 512 || e.deps === null ? set_signal_status(e, y) : set_signal_status(e, x);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function clear_marked(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= re, clear_marked(t.deps));
}
function defer_effect(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), clear_marked(e.deps), set_signal_status(e, y);
}
//#endregion
//#region node_modules/svelte/src/store/utils.js
function subscribe_to_store(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), noop;
	let i = untrack(() => e.subscribe(t, n));
	return i.unsubscribe ? () => i.unsubscribe() : i;
}
//#endregion
//#region node_modules/svelte/src/store/shared/index.js
var P = [];
function readable(e, t) {
	return { subscribe: writable(e, t).subscribe };
}
function writable(e, t = noop) {
	let n = null, i = /* @__PURE__ */ new Set();
	function set(t) {
		if (safe_not_equal(e, t) && (e = t, n)) {
			let t = !P.length;
			for (let t of i) t[1](), P.push(t, e);
			if (t) {
				for (let e = 0; e < P.length; e += 2) P[e][0](P[e + 1]);
				P.length = 0;
			}
		}
	}
	function update(t) {
		set(t(e));
	}
	function subscribe(a, o = noop) {
		let s = [a, o];
		return i.add(s), i.size === 1 && (n = t(set, update) || noop), a(e), () => {
			i.delete(s), i.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set,
		update,
		subscribe
	};
}
function derived$1(e, t, n) {
	let i = !Array.isArray(e), a = i ? [e] : e;
	if (!a.every(Boolean)) throw Error("derived() expects stores as input, got a falsy value");
	let o = t.length < 2;
	return readable(n, (e, n) => {
		let s = !1, c = [], l = 0, u = noop, sync = () => {
			if (l) return;
			u();
			let a = t(i ? c[0] : c, e, n);
			o ? e(a) : u = typeof a == "function" ? a : noop;
		}, d = a.map((e, t) => subscribe_to_store(e, (e) => {
			c[t] = e, l &= ~(1 << t), s && sync();
		}, () => {
			l |= 1 << t;
		}));
		return s = !0, sync(), function stop() {
			run_all(d), u(), s = !1;
		};
	});
}
e(derived$1, "derived");
function get$1(e) {
	let t;
	return subscribe_to_store(e, (e) => t = e)(), t;
}
e(get$1, "get");
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var _e = !1, ve = !1, ye = Symbol();
function store_get(e, t, n) {
	let i = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ mutable_source(void 0),
		unsubscribe: noop
	};
	if (i.store !== e && !(ye in n)) if (i.unsubscribe(), i.store = e ?? null, e == null) i.source.v = void 0, i.unsubscribe = noop;
	else {
		var a = !0;
		i.unsubscribe = subscribe_to_store(e, (e) => {
			a ? i.source.v = e : set(i.source, e);
		}), a = !1;
	}
	return e && ye in n ? get$1(e) : get(i.source);
}
function setup_stores() {
	let e = {};
	function cleanup() {
		teardown(() => {
			for (var t in e) e[t].unsubscribe();
			f(e, ye, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, cleanup];
}
function capture_store_binding(e) {
	var t = ve;
	try {
		return ve = !1, [e(), ve];
	} finally {
		ve = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var be = null, F = null, I = null, xe = null, L = null, Se = null, R = !1, Ce = !1, z = null, we = null, Te = 0, Ee = 1, De = class Batch {
	id = Ee++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	unblocked = /* @__PURE__ */ new Set();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = /* @__PURE__ */ new Set();
	#o = 0;
	#s = /* @__PURE__ */ new Map();
	#c = null;
	#l = [];
	#u = [];
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Map();
	#m = /* @__PURE__ */ new Set();
	is_fork = !1;
	#h = !1;
	#g() {
		if (this.is_fork) return !0;
		for (let n of this.#s.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#p.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#p.has(e) || this.#p.set(e, {
			d: [],
			m: []
		}), this.#m.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#p.get(e);
		if (n) {
			this.#p.delete(e);
			for (var i of n.d) set_signal_status(i, b), t(i);
			for (i of n.m) set_signal_status(i, x), t(i);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, Te++ > 1e3 && (this.#w(), infinite_loop_guard()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), set_signal_status(e, b), this.schedule(e);
			for (let e of this.#f) set_signal_status(e, x), this.schedule(e);
		}
		let e = this.#l;
		this.#l = [], this.apply();
		var t = z = [], n = [], i = we = [];
		for (let i of e) try {
			this.#v(i, t, n);
		} catch (e) {
			throw reset_all(i), e;
		}
		if (I = null, i.length > 0) {
			var a = Batch.ensure();
			for (let e of i) a.schedule(e);
		}
		if (z = null, we = null, this.#g()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#p) reset_branch(e, t);
			i.length > 0 && I.#_();
			return;
		}
		let o = this.#y();
		if (o) {
			o.#b(this);
			return;
		}
		this.#d.clear(), this.#f.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), xe = this, flush_queued_effects(n), flush_queued_effects(t), xe = null, this.#c?.resolve();
		var s = I;
		if (this.linked && this.#o === 0 && this.#w(), A && !this.linked && (this.#S(), I = s), this.#l.length > 0) {
			s === null && (s = this, this.#C());
			let e = s;
			e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
		}
		s !== null && s.#_();
	}
	#v(e, t, n) {
		e.f ^= y;
		for (var i = e.first; i !== null;) {
			var a = i.f, o = (a & 96) != 0;
			if (!(o && a & 1024 || a & 8192 || this.#p.has(i)) && i.fn !== null) {
				o ? i.f ^= y : a & 4 ? t.push(i) : A && a & 16777224 ? n.push(i) : is_dirty(i) && (a & 16 && this.#f.add(i), update_effect(i));
				var s = i.first;
				if (s !== null) {
					i = s;
					continue;
				}
			}
			for (; i !== null;) {
				var c = i.next;
				if (c !== null) {
					i = c;
					break;
				}
				i = i.parent;
			}
		}
	}
	#y() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#b(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve);
		}
		let mark = (e) => {
			var t = e.reactions;
			if (t !== null) for (let e of t) {
				var n = e.f;
				if (n & 2) mark(e);
				else {
					var i = e;
					n & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), set_signal_status(i, b), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) mark(e);
		this.oncommit(() => e.discard()), e.#w(), I = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) defer_effect(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== i && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), L?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, L = null;
	}
	flush() {
		try {
			Ce = !0, I = this, this.#_();
		} finally {
			Te = 0, Se = null, z = null, we = null, Ce = !1, I = null, L = null, V.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear(), this.#a.clear(), this.#w();
	}
	register_created_effect(e) {
		this.#u.push(e);
	}
	#S() {
		this.#w();
		for (let u = be; u !== null; u = u.#n) {
			var e = u.id < this.id, t = [];
			for (let [i, [a, o]] of this.current) {
				if (u.current.has(i)) {
					var n = u.current.get(i)[0];
					if (e && a !== n) u.current.set(i, [a, o]);
					else continue;
				}
				t.push(i);
			}
			if (e) for (let [e, t] of this.async_deriveds) {
				let n = u.async_deriveds.get(e);
				n && t.promise.then(n.resolve);
			}
			if (u.#e) {
				var i = [...u.current.keys()].filter((e) => !this.current.has(e));
				if (i.length === 0) e && u.discard();
				else if (t.length > 0) {
					if (e) for (let e of this.#m) u.unskip_effect(e, (e) => {
						e.f & 4194320 ? u.schedule(e) : u.#x([e]);
					});
					u.activate();
					var a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
					for (var s of t) mark_effects(s, i, a, o);
					o = /* @__PURE__ */ new Map();
					var c = [...u.current.keys()].filter((e) => this.current.has(e) ? this.current.get(e)[0] !== e.v : !0);
					if (c.length > 0) for (let e of this.#u) !(e.f & 155648) && depends_on(e, c, o) && (e.f & 4194320 ? (set_signal_status(e, b), u.schedule(e)) : u.#d.add(e));
					if (u.#l.length > 0) {
						u.apply();
						for (var l of u.#l) u.#v(l, [], []);
						u.#l = [];
					}
					u.deactivate();
				}
			}
		}
	}
	increment(e, t) {
		if (this.#o += 1, e) {
			let e = this.#s.get(t) ?? 0;
			this.#s.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#o, e) {
			let e = this.#s.get(t) ?? 0;
			e === 1 ? this.#s.delete(t) : this.#s.set(t, e - 1);
		}
		this.#h || (this.#h = !0, queue_micro_task(() => {
			this.#h = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#d.add(t);
		for (let e of t) this.#f.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	on_fork_commit(e) {
		this.#a.add(e);
	}
	run_fork_commit_callbacks() {
		for (let e of this.#a) e(this);
		this.#a.clear();
	}
	settled() {
		return (this.#c ??= deferred()).promise;
	}
	static ensure() {
		if (I === null) {
			let e = I = new Batch();
			e.#C(), !Ce && !R && queue_micro_task(() => {
				e.#e || e.flush();
			});
		}
		return I;
	}
	apply() {
		if (!A || !this.is_fork && this.#t === null && this.#n === null) {
			L = null;
			return;
		}
		L = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) L.set(e, t);
		for (let t = be; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
			var e = !1;
			if (t.id < this.id) {
				for (let [n, [, i]] of t.current) if (!i && this.current.has(n)) {
					e = !0;
					break;
				}
			}
			if (!e) for (let [e, n] of t.previous) L.has(e) || L.set(e, n);
		}
	}
	schedule(e) {
		if (Se = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (z !== null && t === K && (A || (W === null || !(W.f & 2)) && !_e)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= y;
			}
		}
		this.#l.push(t);
	}
	#C() {
		F === null ? be = F = this : (F.#n = this, this.#t = F), F = this;
	}
	#w() {
		var e = this.#t, t = this.#n;
		e === null ? be = t : e.#n = t, t === null ? F = e : t.#t = e, this.linked = !1;
	}
};
function flushSync(e) {
	var t = R;
	R = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (flush_tasks(), I === null) return n;
			I.flush();
		}
	} finally {
		R = t;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (e) {
		invoke_error_boundary(e, Se);
	}
}
var B = null;
function flush_queued_effects(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var i = e[n++];
			if (!(i.f & 24576) && is_dirty(i) && (B = /* @__PURE__ */ new Set(), update_effect(i), i.deps === null && i.first === null && i.nodes === null && i.teardown === null && i.ac === null && unlink_effect(i), B?.size > 0)) {
				V.clear();
				for (let e of B) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) B.has(n) && (B.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || update_effect(n);
					}
				}
				B.clear();
			}
		}
		B = null;
	}
}
function mark_effects(e, t, n, i) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let a of e.reactions) {
		let e = a.f;
		e & 2 ? mark_effects(a, t, n, i) : e & 4194320 && !(e & 2048) && depends_on(a, t, i) && (set_signal_status(a, b), schedule_effect(a));
	}
}
function depends_on(e, t, n) {
	let i = n.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (u.call(t, i)) return !0;
		if (i.f & 2 && depends_on(i, t, n)) return n.set(i, !0), !0;
	}
	return n.set(e, !1), !1;
}
function schedule_effect(e) {
	I.schedule(e);
}
function reset_branch(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), set_signal_status(e, y);
		for (var n = e.first; n !== null;) reset_branch(n, t), n = n.next;
	}
}
function reset_all(e) {
	set_signal_status(e, y);
	for (var t = e.first; t !== null;) reset_all(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function createSubscriber(e) {
	let t = 0, n = source(0), i;
	return () => {
		effect_tracking() && (get(n), render_effect(() => (t === 0 && (i = untrack(() => e(() => increment(n)))), t += 1, () => {
			queue_micro_task(() => {
				--t, t === 0 && (i?.(), i = void 0, increment(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Oe = T | E;
function boundary(e, t, n, i) {
	new Boundary(e, t, n, i);
}
var Boundary = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = O ? k : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = createSubscriber(() => (this.#m = source(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, i) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = i ?? this.parent?.transform_error ?? ((e) => e), this.#i = block(() => {
			if (O) {
				let e = this.#t;
				hydrate_next();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Oe), O && (this.#e = k);
	}
	#g() {
		try {
			this.#a = branch(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = branch(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = branch(() => e(this.#e)), queue_micro_task(() => {
			var e = this.#c = document.createDocumentFragment(), t = create_text();
			e.append(t), this.#a = this.#x(() => branch(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, pause_effect(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = branch(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				move_effect(this.#a, e);
				let t = this.#n.pending;
				this.#o = branch(() => t(this.#e));
			} else this.#b(I);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		defer_effect(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = K, n = W, i = M;
		set_active_effect(this.#i), set_active_reaction(this.#i), set_component_context(this.#i.ctx);
		try {
			return De.ensure(), e();
		} catch (e) {
			return handle_error(e), null;
		} finally {
			set_active_effect(t), set_active_reaction(n), set_component_context(i);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && pause_effect(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, queue_micro_task(() => {
			this.#d = !1, this.#m && internal_set(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), get(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (destroy_effect(this.#a), null), this.#o &&= (destroy_effect(this.#o), null), this.#s &&= (destroy_effect(this.#s), null), O && (set_hydrate_node(this.#t), next(), set_hydrate_node(skip_nodes()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var i = !1, a = !1;
		let reset = () => {
			if (i) {
				svelte_boundary_reset_noop();
				return;
			}
			i = !0, a && svelte_boundary_reset_onerror(), this.#s !== null && pause_effect(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, handle_error_result = (e) => {
			try {
				a = !0, t?.(e, reset), a = !1;
			} catch (e) {
				invoke_error_boundary(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return branch(() => {
						var t = K;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => reset);
					});
				} catch (e) {
					return invoke_error_boundary(e, this.#i.parent), null;
				}
			}));
		};
		queue_micro_task(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				invoke_error_boundary(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(handle_error_result, (e) => invoke_error_boundary(e, this.#i && this.#i.parent)) : handle_error_result(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function flatten(e, t, n, i) {
	let a = is_runes() ? derived : derived_safe_equal;
	var o = e.filter((e) => !e.settled);
	if (n.length === 0 && o.length === 0) {
		i(t.map(a));
		return;
	}
	var s = K, c = capture(), l = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((e) => e.promise)) : null;
	function finish(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				i(e);
			} catch (e) {
				invoke_error_boundary(e, s);
			}
			unset_context();
		}
	}
	var u = increment_pending();
	if (n.length === 0) {
		l.then(() => finish(t.map(a))).finally(u);
		return;
	}
	function run() {
		Promise.all(n.map((e) => /* @__PURE__ */ async_derived(e))).then((e) => finish([...t.map(a), ...e])).catch((e) => invoke_error_boundary(e, s)).finally(u);
	}
	l ? l.then(() => {
		c(), run(), unset_context();
	}) : run();
}
function capture() {
	var e = K, t = W, n = M, i = I;
	return function restore(a = !0) {
		set_active_effect(e), set_active_reaction(t), set_component_context(n), a && !(e.f & 16384) && (i?.activate(), i?.apply());
	};
}
function unset_context(e = !0) {
	set_active_effect(null), set_active_reaction(null), set_component_context(null), e && I?.deactivate();
}
function increment_pending() {
	var e = K, t = e.b, n = I, i = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(i, e), () => {
		t.update_pending_count(-1, n), n.decrement(i, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function derived(e) {
	var t = 2 | b;
	return K !== null && (K.f |= E), {
		ctx: M,
		deps: null,
		effects: null,
		equals,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: i,
		wv: 0,
		parent: K,
		ac: null
	};
}
var ke = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function async_derived(e, t, n) {
	let a = K;
	a === null && async_derived_orphan();
	var o = void 0, s = source(i), c = !W, l = /* @__PURE__ */ new Set();
	return async_effect(() => {
		var t = K, n = deferred();
		o = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(unset_context);
		} catch (e) {
			n.reject(e), unset_context();
		}
		var i = I;
		if (c) {
			if (t.f & 32768) var u = increment_pending();
			if (a.b.is_rendered()) i.async_deriveds.get(t)?.reject(ke);
			else for (let e of l.values()) e.reject(ke);
			l.add(n), i.async_deriveds.set(t, n);
		}
		let handler = (e, t = void 0) => {
			u?.(), l.delete(n), t !== ke && (i.activate(), t ? (s.f |= oe, internal_set(s, t)) : (s.f & 8388608 && (s.f ^= oe), internal_set(s, e)), i.deactivate());
		};
		n.promise.then(handler, (e) => handler(null, e || "unknown"));
	}), teardown(() => {
		for (let e of l) e.reject(ke);
	}), new Promise((e) => {
		function next(t) {
			function go() {
				t === o ? e(s) : next(o);
			}
			t.then(go, go);
		}
		next(o);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function user_derived(e) {
	let t = /* @__PURE__ */ derived(e);
	return A || push_reaction_value(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function derived_safe_equal(e) {
	let t = /* @__PURE__ */ derived(e);
	return t.equals = safe_equals, t;
}
function destroy_derived_effects(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) destroy_effect(t[n]);
	}
}
function execute_derived(e) {
	var t, n = K, i = e.parent;
	if (!U && i !== null && i.f & 24576) return derived_inert(), e.v;
	set_active_effect(i);
	try {
		e.f &= ~re, destroy_derived_effects(e), t = update_reaction(e);
	} finally {
		set_active_effect(n);
	}
	return t;
}
function update_derived(e) {
	var t = execute_derived(e);
	if (!e.equals(t) && (e.wv = increment_write_version(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), xe?.capture(e, t, !0)), e.deps === null))) {
		set_signal_status(e, y);
		return;
	}
	U || (L === null ? update_derived_status(e) : (effect_tracking() || I?.is_fork) && L.set(e, t));
}
function freeze_derived_effects(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(me), t.teardown = noop, t.ac = null, remove_reactions(t, 0), destroy_effect_children(t));
}
function unfreeze_derived_effects(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && update_effect(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Ae = /* @__PURE__ */ new Set(), V = /* @__PURE__ */ new Map(), je = !1;
function source(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function state(e, t) {
	let n = source(e, t);
	return push_reaction_value(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(e, t = !1, n = !0) {
	let i = source(e);
	return t || (i.equals = safe_equals), j && n && M !== null && M.l !== null && (M.l.s ??= []).push(i), i;
}
function mutate(e, t) {
	return set(e, untrack(() => get(e))), t;
}
function set(e, t, n = !1) {
	return W !== null && (!G || W.f & 131072) && is_runes() && W.f & 4325394 && (q === null || !u.call(q, e)) && state_unsafe_mutation(), internal_set(e, n ? proxy(t) : t, we);
}
function internal_set(e, t, n = null) {
	if (!e.equals(t)) {
		V.set(e, U ? t : e.v);
		var i = De.ensure();
		if (i.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && execute_derived(t), L === null && update_derived_status(t);
		}
		e.wv = increment_write_version(), mark_reactions(e, b, n), is_runes() && K !== null && K.f & 1024 && !(K.f & 96) && (X === null ? set_untracked_writes([e]) : X.push(e)), !i.is_fork && Ae.size > 0 && !je && flush_eager_effects();
	}
	return t;
}
function flush_eager_effects() {
	je = !1;
	for (let e of Ae) {
		e.f & 1024 && set_signal_status(e, x);
		let t;
		try {
			t = is_dirty(e);
		} catch {
			t = !0;
		}
		t && update_effect(e);
	}
	Ae.clear();
}
function update(e, t = 1) {
	var n = get(e), i = t === 1 ? n++ : n--;
	return set(e, n), i;
}
function increment(e) {
	set(e, e.v + 1);
}
function mark_reactions(e, t, n) {
	var i = e.reactions;
	if (i !== null) for (var a = is_runes(), o = i.length, s = 0; s < o; s++) {
		var c = i[s], l = c.f;
		if (!(!a && c === K)) {
			var u = (l & b) === 0;
			if (u && set_signal_status(c, t), l & 131072) Ae.add(c);
			else if (l & 2) {
				var d = c;
				L?.delete(d), l & 65536 || (l & 512 && (K === null || !(K.f & 2097152)) && (c.f |= re), mark_reactions(d, x, n));
			} else if (u) {
				var f = c;
				l & 16 && B !== null && B.add(f), n === null ? schedule_effect(f) : n.push(f);
			}
		}
	}
}
function proxy(e) {
	if (typeof e != "object" || !e || D in e) return e;
	let t = _(e);
	if (t !== h && t !== g) return e;
	var n = /* @__PURE__ */ new Map(), a = c(e), o = /* @__PURE__ */ state(0), s = null, l = Q, with_parent = (e) => {
		if (Q === l) return e();
		var t = W, n = Q;
		set_active_reaction(null), set_update_version(l);
		var i = e();
		return set_active_reaction(t), set_update_version(n), i;
	};
	return a && n.set("length", /* @__PURE__ */ state(e.length, s)), new Proxy(e, {
		defineProperty(e, t, i) {
			(!("value" in i) || i.configurable === !1 || i.enumerable === !1 || i.writable === !1) && state_descriptors_fixed();
			var a = n.get(t);
			return a === void 0 ? with_parent(() => {
				var e = /* @__PURE__ */ state(i.value, s);
				return n.set(t, e), e;
			}) : set(a, i.value, !0), !0;
		},
		deleteProperty(e, t) {
			var a = n.get(t);
			if (a === void 0) {
				if (t in e) {
					let e = with_parent(() => /* @__PURE__ */ state(i, s));
					n.set(t, e), increment(o);
				}
			} else set(a, i), increment(o);
			return !0;
		},
		get(t, a, o) {
			if (a === D) return e;
			var c = n.get(a), l = a in t;
			if (c === void 0 && (!l || p(t, a)?.writable) && (c = with_parent(() => /* @__PURE__ */ state(proxy(l ? t[a] : i), s)), n.set(a, c)), c !== void 0) {
				var u = get(c);
				return u === i ? void 0 : u;
			}
			return Reflect.get(t, a, o);
		},
		getOwnPropertyDescriptor(e, t) {
			var a = Reflect.getOwnPropertyDescriptor(e, t);
			if (a && "value" in a) {
				var o = n.get(t);
				o && (a.value = get(o));
			} else if (a === void 0) {
				var s = n.get(t), c = s?.v;
				if (s !== void 0 && c !== i) return {
					enumerable: !0,
					configurable: !0,
					value: c,
					writable: !0
				};
			}
			return a;
		},
		has(e, t) {
			if (t === D) return !0;
			var a = n.get(t), o = a !== void 0 && a.v !== i || Reflect.has(e, t);
			return (a !== void 0 || K !== null && (!o || p(e, t)?.writable)) && (a === void 0 && (a = with_parent(() => /* @__PURE__ */ state(o ? proxy(e[t]) : i, s)), n.set(t, a)), get(a) === i) ? !1 : o;
		},
		set(e, t, c, l) {
			var u = n.get(t), d = t in e;
			if (a && t === "length") for (var f = c; f < u.v; f += 1) {
				var m = n.get(f + "");
				m === void 0 ? f in e && (m = with_parent(() => /* @__PURE__ */ state(i, s)), n.set(f + "", m)) : set(m, i);
			}
			if (u === void 0) (!d || p(e, t)?.writable) && (u = with_parent(() => /* @__PURE__ */ state(void 0, s)), set(u, proxy(c)), n.set(t, u));
			else {
				d = u.v !== i;
				var h = with_parent(() => proxy(c));
				set(u, h);
			}
			var g = Reflect.getOwnPropertyDescriptor(e, t);
			if (g?.set && g.set.call(l, c), !d) {
				if (a && typeof t == "string") {
					var _ = n.get("length"), v = Number(t);
					Number.isInteger(v) && v >= _.v && set(_, v + 1);
				}
				increment(o);
			}
			return !0;
		},
		ownKeys(e) {
			get(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== i;
			});
			for (var [a, s] of n) s.v !== i && !(a in e) && t.push(a);
			return t;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
function get_proxied_value(e) {
	try {
		if (typeof e == "object" && e && D in e) return e[D];
	} catch {}
	return e;
}
function is(e, t) {
	return Object.is(get_proxied_value(e), get_proxied_value(t));
}
new Set([
	"copyWithin",
	"fill",
	"pop",
	"push",
	"reverse",
	"shift",
	"sort",
	"splice",
	"unshift"
]);
var Me, Ne, Pe, Fe;
function init_operations() {
	if (Me === void 0) {
		Me = window, Ne = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Pe = p(t, "firstChild").get, Fe = p(t, "nextSibling").get, v(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), v(n) && (n[fe] = void 0);
	}
}
function create_text(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(e) {
	return Pe.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(e) {
	return Fe.call(e);
}
function child(e, t) {
	if (!O) return /* @__PURE__ */ get_first_child(e);
	var n = /* @__PURE__ */ get_first_child(k);
	if (n === null) n = k.appendChild(create_text());
	else if (t && n.nodeType !== 3) {
		var i = create_text();
		return n?.before(i), set_hydrate_node(i), i;
	}
	return t && merge_text_nodes(n), set_hydrate_node(n), n;
}
function first_child(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ get_first_child(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ get_next_sibling(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var i = create_text();
			return k?.before(i), set_hydrate_node(i), i;
		}
		merge_text_nodes(k);
	}
	return k;
}
function sibling(e, t = 1, n = !1) {
	let i = O ? k : e;
	for (var a; t--;) a = i, i = /* @__PURE__ */ get_next_sibling(i);
	if (!O) return i;
	if (n) {
		if (i?.nodeType !== 3) {
			var o = create_text();
			return i === null ? a?.after(o) : i.before(o), set_hydrate_node(o), o;
		}
		merge_text_nodes(i);
	}
	return set_hydrate_node(i), i;
}
function clear_text_content(e) {
	e.textContent = "";
}
function should_defer_append() {
	return !A || B !== null ? !1 : (K.f & C) !== 0;
}
function create_element(e, t, n) {
	let i = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, i);
}
function merge_text_nodes(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
var Ie = !1;
function add_form_reset_listener() {
	Ie || (Ie = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function without_reactive_context(e) {
	var t = W, n = K;
	set_active_reaction(null), set_active_effect(null);
	try {
		return e();
	} finally {
		set_active_reaction(t), set_active_effect(n);
	}
}
function listen_to_event_and_reset_event(e, t, n, i = n) {
	e.addEventListener(t, () => without_reactive_context(n));
	let a = e[pe];
	a ? e[pe] = () => {
		a(), i(!0);
	} : e[pe] = () => i(!0), add_form_reset_listener();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function validate_effect(e) {
	K === null && (W === null && effect_orphan(e), effect_in_unowned_derived()), U && effect_in_teardown(e);
}
function push_effect(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function create_effect(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= S);
	var i = {
		ctx: M,
		deps: null,
		nodes: null,
		f: e | b | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	I?.register_created_effect(i);
	var a = i;
	if (e & 4) z === null ? De.ensure().schedule(i) : z.push(i);
	else if (t !== null) {
		try {
			update_effect(i);
		} catch (e) {
			throw destroy_effect(i), e;
		}
		a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && !(a.f & 524288) && (a = a.first, e & 16 && e & 65536 && a !== null && (a.f |= T));
	}
	if (a !== null && (a.parent = n, n !== null && push_effect(a, n), W !== null && W.f & 2 && !(e & 64))) {
		var o = W;
		(o.effects ??= []).push(a);
	}
	return i;
}
function effect_tracking() {
	return W !== null && !G;
}
function teardown(e) {
	let t = create_effect(8, null);
	return set_signal_status(t, y), t.teardown = e, t;
}
function user_effect(e) {
	validate_effect("$effect");
	var t = K.f;
	if (!W && t & 32 && !(t & 32768)) {
		var n = M;
		(n.e ??= []).push(e);
	} else return create_user_effect(e);
}
function create_user_effect(e) {
	return create_effect(4 | te, e);
}
function user_pre_effect(e) {
	return validate_effect("$effect.pre"), create_effect(8 | te, e);
}
function component_root(e) {
	De.ensure();
	let t = create_effect(64 | E, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? pause_effect(t, () => {
			destroy_effect(t), n(void 0);
		}) : (destroy_effect(t), n(void 0));
	});
}
function effect(e) {
	return create_effect(4, e);
}
function legacy_pre_effect(e, t) {
	var n = M, i = {
		effect: null,
		ran: !1,
		deps: e
	};
	n.l.$.push(i), i.effect = render_effect(() => {
		if (e(), !i.ran) {
			i.ran = !0;
			var n = K;
			try {
				set_active_effect(n.parent), untrack(t);
			} finally {
				set_active_effect(n);
			}
		}
	});
}
function legacy_pre_effect_reset() {
	var e = M;
	render_effect(() => {
		for (var t of e.l.$) {
			t.deps();
			var n = t.effect;
			n.f & 1024 && n.deps !== null && set_signal_status(n, x), is_dirty(n) && update_effect(n), t.ran = !1;
		}
	});
}
function async_effect(e) {
	return create_effect(ae | E, e);
}
function render_effect(e, t = 0) {
	return create_effect(8 | t, e);
}
function template_effect(e, t = [], n = [], i = []) {
	flatten(i, t, n, (t) => {
		create_effect(8, () => e(...t.map(get)));
	});
}
function block(e, t = 0) {
	return create_effect(16 | t, e);
}
function branch(e) {
	return create_effect(32 | E, e);
}
function execute_effect_teardown(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = U, n = W;
		set_is_destroying_effect(!0), set_active_reaction(null);
		try {
			t.call(null);
		} finally {
			set_is_destroying_effect(e), set_active_reaction(n);
		}
	}
}
function destroy_effect_children(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && without_reactive_context(() => {
			e.abort(me);
		});
		var i = n.next;
		n.f & 64 ? n.parent = null : destroy_effect(n, t), n = i;
	}
}
function destroy_block_effect_children(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || destroy_effect(t), t = n;
	}
}
function destroy_effect(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (remove_effect_dom(e.nodes.start, e.nodes.end), n = !0), set_signal_status(e, w), destroy_effect_children(e, t && !n), remove_reactions(e, 0);
	var i = e.nodes && e.nodes.t;
	if (i !== null) for (let e of i) e.stop();
	execute_effect_teardown(e), e.f ^= w, e.f |= ee;
	var a = e.parent;
	a !== null && a.first !== null && unlink_effect(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function remove_effect_dom(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ get_next_sibling(e);
		e.remove(), e = n;
	}
}
function unlink_effect(e) {
	var t = e.parent, n = e.prev, i = e.next;
	n !== null && (n.next = i), i !== null && (i.prev = n), t !== null && (t.first === e && (t.first = i), t.last === e && (t.last = n));
}
function pause_effect(e, t, n = !0) {
	var i = [];
	pause_children(e, i, !0);
	var fn = () => {
		n && destroy_effect(e), t && t();
	}, a = i.length;
	if (a > 0) {
		var check = () => --a || fn();
		for (var o of i) o.out(check);
	} else fn();
}
function pause_children(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= S;
		var i = e.nodes && e.nodes.t;
		if (i !== null) for (let e of i) (e.is_global || n) && t.push(e);
		for (var a = e.first; a !== null;) {
			var o = a.next;
			if (!(a.f & 64)) {
				var s = (a.f & 65536) != 0 || (a.f & 32) != 0 && (e.f & 16) != 0;
				pause_children(a, t, s ? n : !1);
			}
			a = o;
		}
	}
}
function resume_effect(e) {
	resume_children(e, !0);
}
function resume_children(e, t) {
	if (e.f & 8192) {
		e.f ^= S, e.f & 1024 || (set_signal_status(e, b), De.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var i = n.next, a = (n.f & 65536) != 0 || (n.f & 32) != 0;
			resume_children(n, a ? t : !1), n = i;
		}
		var o = e.nodes && e.nodes.t;
		if (o !== null) for (let e of o) (e.is_global || t) && e.in();
	}
}
function move_effect(e, t) {
	if (e.nodes) for (var n = e.nodes.start, i = e.nodes.end; n !== null;) {
		var a = n === i ? null : /* @__PURE__ */ get_next_sibling(n);
		t.append(n), n = a;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var H = null;
function capture_signals(e) {
	var t = H;
	try {
		if (H = /* @__PURE__ */ new Set(), untrack(e), t !== null) for (var n of H) t.add(n);
		return H;
	} finally {
		H = t;
	}
}
function invalidate_inner_signals(e) {
	for (var t of capture_signals(e)) internal_set(t, t.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/runtime.js
var Le = !1, U = !1;
function set_is_destroying_effect(e) {
	U = e;
}
var W = null, G = !1;
function set_active_reaction(e) {
	W = e;
}
var K = null;
function set_active_effect(e) {
	K = e;
}
var q = null;
function push_reaction_value(e) {
	W !== null && (!A || W.f & 2) && (q === null ? q = [e] : q.push(e));
}
var J = null, Y = 0, X = null;
function set_untracked_writes(e) {
	X = e;
}
var Re = 1, Z = 0, Q = Z;
function set_update_version(e) {
	Q = e;
}
function increment_write_version() {
	return ++Re;
}
function is_dirty(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~re), t & 4096) {
		for (var n = e.deps, i = n.length, a = 0; a < i; a++) {
			var o = n[a];
			if (is_dirty(o) && update_derived(o), o.wv > e.wv) return !0;
		}
		t & 512 && L === null && set_signal_status(e, y);
	}
	return !1;
}
function schedule_possible_effect_self_invalidation(e, t, n = !0) {
	var i = e.reactions;
	if (i !== null && !(!A && q !== null && u.call(q, e))) for (var a = 0; a < i.length; a++) {
		var o = i[a];
		o.f & 2 ? schedule_possible_effect_self_invalidation(o, t, !1) : t === o && (n ? set_signal_status(o, b) : o.f & 1024 && set_signal_status(o, x), schedule_effect(o));
	}
}
function update_reaction(e) {
	var t = J, n = Y, i = X, a = W, o = q, s = M, c = G, l = Q, u = e.f;
	J = null, Y = 0, X = null, W = u & 96 ? null : e, q = null, set_component_context(e.ctx), G = !1, Q = ++Z, e.ac !== null && (without_reactive_context(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= ie;
		var d = e.fn, f = d();
		e.f |= C;
		var p = e.deps, m = I?.is_fork;
		if (J !== null) {
			var h;
			if (m || remove_reactions(e, Y), p !== null && Y > 0) for (p.length = Y + J.length, h = 0; h < J.length; h++) p[Y + h] = J[h];
			else e.deps = p = J;
			if (effect_tracking() && e.f & 512) for (h = Y; h < p.length; h++) (p[h].reactions ??= []).push(e);
		} else !m && p !== null && Y < p.length && (remove_reactions(e, Y), p.length = Y);
		if (is_runes() && X !== null && !G && p !== null && !(e.f & 6146)) for (h = 0; h < X.length; h++) schedule_possible_effect_self_invalidation(X[h], e);
		if (a !== null && a !== e) {
			if (Z++, a.deps !== null) for (let e = 0; e < n; e += 1) a.deps[e].rv = Z;
			if (t !== null) for (let e of t) e.rv = Z;
			X !== null && (i === null ? i = X : i.push(...X));
		}
		return e.f & 8388608 && (e.f ^= oe), f;
	} catch (e) {
		return handle_error(e);
	} finally {
		e.f ^= ie, J = t, Y = n, X = i, W = a, q = o, set_component_context(s), G = c, Q = l;
	}
}
function remove_reaction(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var a = l.call(n, e);
		if (a !== -1) {
			var o = n.length - 1;
			o === 0 ? n = t.reactions = null : (n[a] = n[o], n.pop());
		}
	}
	if (n === null && t.f & 2 && (J === null || !u.call(J, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512, s.f &= ~re), s.v !== i && update_derived_status(s), freeze_derived_effects(s), remove_reactions(s, 0);
	}
}
function remove_reactions(e, t) {
	var n = e.deps;
	if (n !== null) for (var i = t; i < n.length; i++) remove_reaction(e, n[i]);
}
function update_effect(e) {
	var t = e.f;
	if (!(t & 16384)) {
		set_signal_status(e, y);
		var n = K, i = Le;
		K = e, Le = !0;
		try {
			t & 16777232 ? destroy_block_effect_children(e) : destroy_effect_children(e), execute_effect_teardown(e);
			var a = update_reaction(e);
			e.teardown = typeof a == "function" ? a : null, e.wv = Re;
		} finally {
			Le = i, K = n;
		}
	}
}
async function tick() {
	if (A) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), flushSync();
}
function get(e) {
	var t = (e.f & 2) != 0;
	if (H?.add(e), W !== null && !G && !(K !== null && K.f & 16384) && (q === null || !u.call(q, e))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < Z && (e.rv = Z, J === null && n !== null && n[Y] === e ? Y++ : J === null ? J = [e] : J.push(e));
		else {
			(W.deps ??= []).push(e);
			var i = e.reactions;
			i === null ? e.reactions = [W] : u.call(i, W) || i.push(W);
		}
	}
	if (U && V.has(e)) return V.get(e);
	if (t) {
		var a = e;
		if (U) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || depends_on_old_values(a)) && (o = execute_derived(a)), V.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !G && W !== null && (Le || (W.f & 512) != 0), c = (a.f & C) === 0;
		is_dirty(a) && (s && (a.f |= 512), update_derived(a)), s && !c && (unfreeze_derived_effects(a), reconnect(a));
	}
	if (L?.has(e)) return L.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function reconnect(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (unfreeze_derived_effects(t), reconnect(t));
}
function depends_on_old_values(e) {
	if (e.v === i) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (V.has(t) || t.f & 2 && depends_on_old_values(t)) return !0;
	return !1;
}
function untrack(e) {
	var t = G;
	try {
		return G = !0, e();
	} finally {
		G = t;
	}
}
function deep_read_state(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (D in e) deep_read(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && D in n && deep_read(n);
		}
	}
}
function deep_read(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			deep_read(e[n], t);
		} catch {}
		let n = _(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = m(n);
			for (let n in t) {
				let i = t[n].get;
				if (i) try {
					i.call(e);
				} catch {}
			}
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var ze = Symbol("events"), Be = /* @__PURE__ */ new Set(), Ve = /* @__PURE__ */ new Set();
function create_event(e, t, n, i = {}) {
	function target_handler(e) {
		if (i.capture || handle_event_propagation.call(t, e), !e.cancelBubble) return without_reactive_context(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? queue_micro_task(() => {
		t.addEventListener(e, target_handler, i);
	}) : t.addEventListener(e, target_handler, i), target_handler;
}
function event(e, t, n, i, a) {
	var o = {
		capture: i,
		passive: a
	}, s = create_event(e, t, n, o);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && teardown(() => {
		t.removeEventListener(e, s, o);
	});
}
function delegated(e, t, n) {
	(t[ze] ??= {})[e] = n;
}
function delegate(e) {
	for (var t = 0; t < e.length; t++) Be.add(e[t]);
	for (var n of Ve) n(e);
}
var He = null;
function handle_event_propagation(e) {
	var t = this, n = t.ownerDocument, i = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	He = e;
	var s = 0, c = He === e && e[ze];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[ze] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		f(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = W, p = K;
		set_active_reaction(null), set_active_effect(null);
		try {
			for (var m, h = []; o !== null;) {
				var g = o.assignedSlot || o.parentNode || o.host || null;
				try {
					var _ = o[ze]?.[i];
					_ != null && (!o.disabled || e.target === o) && _.call(o, e);
				} catch (e) {
					m ? h.push(e) : m = e;
				}
				if (e.cancelBubble || g === t || g === null) break;
				o = g;
			}
			if (m) {
				for (let e of h) queueMicrotask(() => {
					throw e;
				});
				throw m;
			}
		} finally {
			e[ze] = t, delete e.currentTarget, set_active_reaction(d), set_active_effect(p);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Ue = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function create_trusted_html(e) {
	return Ue?.createHTML(e) ?? e;
}
function create_fragment_from_html(e) {
	var t = create_element("template");
	return t.innerHTML = create_trusted_html(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function assign_nodes(e, t) {
	var n = K;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function from_html(e, t) {
	var n = (t & 1) != 0, i = (t & 2) != 0, a, o = !e.startsWith("<!>");
	return () => {
		if (O) return assign_nodes(k, null), k;
		a === void 0 && (a = create_fragment_from_html(o ? e : "<!>" + e), n || (a = /* @__PURE__ */ get_first_child(a)));
		var t = i || Ne ? document.importNode(a, !0) : a.cloneNode(!0);
		if (n) {
			var s = /* @__PURE__ */ get_first_child(t), c = t.lastChild;
			assign_nodes(s, c);
		} else assign_nodes(t, t);
		return t;
	};
}
function text(e = "") {
	if (!O) {
		var t = create_text(e + "");
		return assign_nodes(t, t), t;
	}
	var n = k;
	return n.nodeType === 3 ? merge_text_nodes(n) : (n.before(n = create_text()), set_hydrate_node(n)), assign_nodes(n, n), n;
}
function comment() {
	if (O) return assign_nodes(k, null), k;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = create_text();
	return e.append(t, n), assign_nodes(t, n), e;
}
function append(e, t) {
	if (O) {
		var n = K;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = k), hydrate_next();
		return;
	}
	e !== null && e.before(t);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var We = ["touchstart", "touchmove"];
function is_passive_event(e) {
	return We.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/render.js
var Ge = !0;
function set_text(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function mount(e, t) {
	return _mount(e, t);
}
var Ke = /* @__PURE__ */ new Map();
function _mount(e, { target: t, anchor: i, props: a = {}, events: o, context: s, intro: c = !0, transformError: l }) {
	init_operations();
	var u = void 0, f = component_root(() => {
		var f = i ?? t.appendChild(create_text());
		boundary(f, { pending: () => {} }, (t) => {
			push({});
			var i = M;
			if (s && (i.c = s), o && (a.$$events = o), O && assign_nodes(t, null), Ge = c, u = e(t, a) || {}, Ge = !0, O && (K.nodes.end = k, k === null || k.nodeType !== 8 || k.data !== "]")) throw hydration_mismatch(), n;
			pop();
		}, l);
		var p = /* @__PURE__ */ new Set(), event_handle = (e) => {
			for (var n = 0; n < e.length; n++) {
				var i = e[n];
				if (!p.has(i)) {
					p.add(i);
					var a = is_passive_event(i);
					for (let e of [t, document]) {
						var o = Ke.get(e);
						o === void 0 && (o = /* @__PURE__ */ new Map(), Ke.set(e, o));
						var s = o.get(i);
						s === void 0 ? (e.addEventListener(i, handle_event_propagation, { passive: a }), o.set(i, 1)) : o.set(i, s + 1);
					}
				}
			}
		};
		return event_handle(d(Be)), Ve.add(event_handle), () => {
			for (var e of p) for (let i of [t, document]) {
				var n = Ke.get(i), a = n.get(e);
				--a == 0 ? (i.removeEventListener(e, handle_event_propagation), n.delete(e), n.size === 0 && Ke.delete(i)) : n.set(e, a);
			}
			Ve.delete(event_handle), f !== i && f.parentNode?.removeChild(f);
		};
	});
	return qe.set(u, f), u;
}
var qe = /* @__PURE__ */ new WeakMap(), BranchManager = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) resume_effect(n), this.#r.delete(t);
			else {
				var i = this.#n.get(t);
				i && (this.#t.set(t, i.effect), this.#n.delete(t), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), n = i.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let i = this.#n.get(n);
				i && (destroy_effect(i.effect), this.#n.delete(n));
			}
			for (let [e, i] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let on_destroy = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						move_effect(i, t), t.append(create_text()), this.#n.set(e, {
							effect: i,
							fragment: t
						});
					} else destroy_effect(i);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), pause_effect(i, on_destroy, !1)) : on_destroy();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (destroy_effect(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, i = should_defer_append();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (i) {
			var a = document.createDocumentFragment(), o = create_text();
			a.append(o), this.#n.set(e, {
				effect: branch(() => t(o)),
				fragment: a
			});
		} else this.#t.set(e, branch(() => t(this.anchor)));
		if (this.#e.set(n, e), i) {
			for (let [t, i] of this.#t) t === e ? n.unskip_effect(i) : n.skip_effect(i);
			for (let [t, i] of this.#n) t === e ? n.unskip_effect(i.effect) : n.skip_effect(i.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else O && (this.anchor = k), this.#a(n);
	}
};
function onMount(e) {
	M === null && lifecycle_outside_component("onMount"), j && M.l !== null ? init_update_callbacks(M).m.push(e) : user_effect(() => {
		let t = untrack(e);
		if (typeof t == "function") return t;
	});
}
function onDestroy(e) {
	M === null && lifecycle_outside_component("onDestroy"), onMount(() => () => untrack(e));
}
function create_custom_event(e, t, { bubbles: n = !1, cancelable: i = !1 } = {}) {
	return new CustomEvent(e, {
		detail: t,
		bubbles: n,
		cancelable: i
	});
}
function createEventDispatcher() {
	let e = M;
	return e === null && lifecycle_outside_component("createEventDispatcher"), (t, n, i) => {
		let a = e.s.$$events?.[t];
		if (a) {
			let o = c(a) ? a.slice() : [a], s = create_custom_event(t, n, i);
			for (let t of o) t.call(e.x, s);
			return !s.defaultPrevented;
		}
		return !0;
	};
}
function init_update_callbacks(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function if_block(e, t, n = !1) {
	var i;
	O && (i = k, hydrate_next());
	var a = new BranchManager(e), o = n ? T : 0;
	function update_branch(e, t) {
		if (O) {
			var n = read_hydration_instruction(i);
			if (e !== parseInt(n.substring(1))) {
				var o = skip_nodes();
				set_hydrate_node(o), a.anchor = o, set_hydrating(!1), a.ensure(e, t), set_hydrating(!0);
				return;
			}
		}
		a.ensure(e, t);
	}
	block(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, update_branch(n, t);
		}), e || update_branch(-1, null);
	}, o);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/key.js
var Je = Symbol("NaN");
function key(e, t, n) {
	O && hydrate_next();
	var i = new BranchManager(e), a = !is_runes();
	block(() => {
		var e = t();
		e !== e && (e = Je), a && typeof e == "object" && e && (e = {}), i.ensure(e, n);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function index(e, t) {
	return t;
}
function pause_effects(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		pause_effect(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					destroy_effects(e, d(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, f = u.parentNode;
			clear_text_content(f), f.append(u), e.items.clear();
		}
		destroy_effects(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function destroy_effects(e, t, n = !0) {
	var i;
	if (e.pending.size > 0) {
		i = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) i.add(e.items.get(n).e);
	}
	for (var a = 0; a < t.length; a++) {
		var o = t[a];
		i?.has(o) ? (o.f |= ne, move_effect(o, document.createDocumentFragment())) : destroy_effect(t[a], n);
	}
}
var Ye;
function each(e, t, n, i, a, o = null) {
	var s = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		s = O ? set_hydrate_node(/* @__PURE__ */ get_first_child(u)) : u.appendChild(create_text());
	}
	O && hydrate_next();
	var f = null, p = /* @__PURE__ */ derived_safe_equal(() => {
		var e = n();
		return c(e) ? e : e == null ? [] : d(e);
	}), m, h = /* @__PURE__ */ new Map(), g = !0;
	function commit(e) {
		_.effect.f & 16384 || (_.pending.delete(e), _.fallback = f, reconcile(_, m, s, t, i), f !== null && (m.length === 0 ? f.f & 33554432 ? (f.f ^= ne, move(f, null, s)) : resume_effect(f) : pause_effect(f, () => {
			f = null;
		})));
	}
	function discard(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: block(() => {
			m = get(p);
			var e = m.length;
			let c = !1;
			O && read_hydration_instruction(s) === "[!" != (e === 0) && (s = skip_nodes(), set_hydrate_node(s), set_hydrating(!1), c = !0);
			for (var u = /* @__PURE__ */ new Set(), d = I, _ = should_defer_append(), v = 0; v < e; v += 1) {
				O && k.nodeType === 8 && k.data === "]" && (s = k, c = !0, set_hydrating(!1));
				var y = m[v], b = i(y, v), x = g ? null : l.get(b);
				x ? (x.v && internal_set(x.v, y), x.i && internal_set(x.i, v), _ && d.unskip_effect(x.e)) : (x = create_item(l, g ? s : Ye ??= create_text(), y, b, v, a, t, n), g || (x.e.f |= ne), l.set(b, x)), u.add(b);
			}
			if (e === 0 && o && !f && (g ? f = branch(() => o(s)) : (f = branch(() => o(Ye ??= create_text())), f.f |= ne)), e > u.size && each_key_duplicate("", "", ""), O && e > 0 && set_hydrate_node(skip_nodes()), !g) if (h.set(d, u), _) {
				for (let [e, t] of l) u.has(e) || d.skip_effect(t.e);
				d.oncommit(commit), d.ondiscard(discard);
			} else commit(d);
			c && set_hydrating(!0), get(p);
		}),
		flags: t,
		items: l,
		pending: h,
		outrogroups: null,
		fallback: f
	};
	g = !1, O && (s = k);
}
function skip_to_branch(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function reconcile(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = skip_to_branch(e.effect.first), u, f = null, p, m = [], h = [], g, _, v, y;
	if (o) for (y = 0; y < s; y += 1) g = t[y], _ = a(g, y), v = c.get(_).e, v.f & 33554432 || (v.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(v));
	for (y = 0; y < s; y += 1) {
		if (g = t[y], _ = a(g, y), v = c.get(_).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(v), t.done.delete(v);
		if (v.f & 8192 && (resume_effect(v), o && (v.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(v))), v.f & 33554432) if (v.f ^= ne, v === l) move(v, null, n);
		else {
			var b = f ? f.next : l;
			v === e.effect.last && (e.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), link(e, f, v), link(e, v, b), move(v, b, n), f = v, m = [], h = [], l = skip_to_branch(f.next);
			continue;
		}
		if (v !== l) {
			if (u !== void 0 && u.has(v)) {
				if (m.length < h.length) {
					var x = h[0], S;
					f = x.prev;
					var ee = m[0], C = m[m.length - 1];
					for (S = 0; S < m.length; S += 1) move(m[S], x, n);
					for (S = 0; S < h.length; S += 1) u.delete(h[S]);
					link(e, ee.prev, C.next), link(e, f, ee), link(e, C, x), l = x, f = C, --y, m = [], h = [];
				} else u.delete(v), move(v, l, n), link(e, v.prev, v.next), link(e, v, f === null ? e.effect.first : f.next), link(e, f, v), f = v;
				continue;
			}
			for (m = [], h = []; l !== null && l !== v;) (u ??= /* @__PURE__ */ new Set()).add(l), h.push(l), l = skip_to_branch(l.next);
			if (l === null) continue;
		}
		v.f & 33554432 || m.push(v), f = v, l = skip_to_branch(v.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (destroy_effects(e, d(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (v of u) v.f & 8192 || w.push(v);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = skip_to_branch(l.next);
		var T = w.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (y = 0; y < T; y += 1) w[y].nodes?.a?.measure();
				for (y = 0; y < T; y += 1) w[y].nodes?.a?.fix();
			}
			pause_effects(e, w, E);
		}
	}
	o && queue_micro_task(() => {
		if (p !== void 0) for (v of p) v.nodes?.a?.apply();
	});
}
function create_item(e, t, n, i, a, o, s, c) {
	var l = s & 1 ? s & 16 ? source(n) : /* @__PURE__ */ mutable_source(n, !1, !1) : null, u = s & 2 ? source(a) : null;
	return {
		v: l,
		i: u,
		e: branch(() => (o(t, l ?? n, u ?? a, c), () => {
			e.delete(i);
		}))
	};
}
function move(e, t, n) {
	if (e.nodes) for (var i = e.nodes.start, a = e.nodes.end, o = t && !(t.f & 33554432) ? t.nodes.start : n; i !== null;) {
		var s = /* @__PURE__ */ get_next_sibling(i);
		if (o.before(i), i === a) return;
		i = s;
	}
}
function link(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function html(e, t, i = !1, a = !1, c = !1, l = !1) {
	var u = e, d = "";
	if (i) {
		var f = e;
		O && (u = set_hydrate_node(/* @__PURE__ */ get_first_child(f)));
	}
	template_effect(() => {
		var e = K;
		if (d === (d = t() ?? "")) {
			O && hydrate_next();
			return;
		}
		if (i && !O) {
			e.nodes = null, f.innerHTML = d, d !== "" && assign_nodes(/* @__PURE__ */ get_first_child(f), f.lastChild);
			return;
		}
		if (e.nodes !== null && (remove_effect_dom(e.nodes.start, e.nodes.end), e.nodes = null), d !== "") {
			if (O) {
				for (var l = k.data, p = hydrate_next(), m = p; p !== null && (p.nodeType !== 8 || p.data !== "");) m = p, p = /* @__PURE__ */ get_next_sibling(p);
				if (p === null) throw hydration_mismatch(), n;
				assign_nodes(k, m), u = set_hydrate_node(p);
				return;
			}
			var h = create_element(a ? "svg" : c ? "math" : "template", a ? o : c ? s : void 0);
			h.innerHTML = d;
			var g = a || c ? h : h.content;
			if (assign_nodes(/* @__PURE__ */ get_first_child(g), g.lastChild), a || c) for (; /* @__PURE__ */ get_first_child(g);) u.before(/* @__PURE__ */ get_first_child(g));
			else u.before(g);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/slot.js
function slot(e, t, n, i, a) {
	O && hydrate_next();
	var o = t.$$slots?.[n], s = !1;
	o === !0 && (o = t[n === "default" ? "children" : n], s = !0), o === void 0 ? a !== null && a(e) : o(e, s ? () => i : i);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function component(e, t, n) {
	var i;
	O && (i = k, hydrate_next());
	var a = new BranchManager(e);
	block(() => {
		var e = t() ?? null;
		if (O && read_hydration_instruction(i) === "[" != (e !== null)) {
			var o = skip_nodes();
			set_hydrate_node(o), a.anchor = o, set_hydrating(!1), a.ensure(e, e && ((t) => n(t, e))), set_hydrating(!0);
			return;
		}
		a.ensure(e, e && ((t) => n(t, e)));
	}, T);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var now = () => performance.now(), $ = {
	tick: (e) => requestAnimationFrame(e),
	now: () => now(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function run_tasks() {
	let e = $.now();
	$.tasks.forEach((t) => {
		t.c(e) || ($.tasks.delete(t), t.f());
	}), $.tasks.size !== 0 && $.tick(run_tasks);
}
function loop(e) {
	let t;
	return $.tasks.size === 0 && $.tick(run_tasks), {
		promise: new Promise((n) => {
			$.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			$.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function dispatch_event(e, t) {
	without_reactive_context(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function css_property_to_camelcase(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function css_to_keyframe(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, i] = e.split(":");
		if (!n || i === void 0) break;
		let a = css_property_to_camelcase(n.trim());
		t[a] = i.trim();
	}
	return t;
}
var linear = (e) => e, Xe = null;
function animation(e, t, n) {
	var i = (Xe ?? K).nodes, a, o, s, c = null;
	i.a ??= {
		element: e,
		measure() {
			a = this.element.getBoundingClientRect();
		},
		apply() {
			if (s?.abort(), o = this.element.getBoundingClientRect(), a.left !== o.left || a.right !== o.right || a.top !== o.top || a.bottom !== o.bottom) {
				let e = t()(this.element, {
					from: a,
					to: o
				}, n?.());
				s = animate(this.element, e, void 0, 1, () => {}, () => {
					s?.abort(), s = void 0;
				});
			}
		},
		fix() {
			if (!e.getAnimations().length) {
				var { position: t, width: n, height: i } = getComputedStyle(e);
				if (t !== "absolute" && t !== "fixed") {
					var o = e.style;
					c = {
						position: o.position,
						width: o.width,
						height: o.height,
						transform: o.transform
					}, o.position = "absolute", o.width = n, o.height = i;
					var s = e.getBoundingClientRect();
					if (a.left !== s.left || a.top !== s.top) {
						var l = `translate(${a.left - s.left}px, ${a.top - s.top}px)`;
						o.transform = o.transform ? `${o.transform} ${l}` : l;
					}
				}
			}
		},
		unfix() {
			if (c) {
				var t = e.style;
				t.position = c.position, t.width = c.width, t.height = c.height, t.transform = c.transform;
			}
		}
	}, i.a.element = e;
}
function transition(e, t, n, i) {
	var a = (e & 1) != 0, o = (e & 2) != 0, s = a && o, c = (e & 4) != 0, l = s ? "both" : a ? "in" : "out", u, d = t.inert, f = t.style.overflow, p, m;
	function get_options() {
		return without_reactive_context(() => u ??= n()(t, i?.() ?? {}, { direction: l }));
	}
	var h = {
		is_global: c,
		in() {
			if (t.inert = d, !a) {
				m?.abort(), m?.reset?.();
				return;
			}
			o || p?.abort(), p = animate(t, get_options(), m, 1, () => {
				dispatch_event(t, "introstart");
			}, () => {
				dispatch_event(t, "introend"), p?.abort(), p = u = void 0, t.style.overflow = f;
			});
		},
		out(e) {
			if (!o) {
				e?.(), u = void 0;
				return;
			}
			t.inert = !0, m = animate(t, get_options(), p, 0, () => {
				dispatch_event(t, "outrostart");
			}, () => {
				dispatch_event(t, "outroend"), e?.();
			});
		},
		stop: () => {
			p?.abort(), m?.abort();
		}
	}, g = K;
	if ((g.nodes.t ??= []).push(h), a && Ge) {
		var _ = c;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || (v.f & 32768) != 0;
		}
		_ && effect(() => {
			untrack(() => h.in());
		});
	}
}
function animate(e, t, n, i, a, o) {
	var s = i === 1;
	if (is_function(t)) {
		var c, l = !1;
		return queue_micro_task(() => {
			l || (c = animate(e, t({ direction: s ? "in" : "out" }), n, i, a, o));
		}), {
			abort: () => {
				l = !0, c?.abort();
			},
			deactivate: () => c.deactivate(),
			reset: () => c.reset(),
			t: () => c.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return a(), o(), {
		abort: noop,
		deactivate: noop,
		reset: noop,
		t: () => i
	};
	let { delay: u = 0, css: d, tick: f, easing: p = linear } = t;
	var m = [];
	if (s && n === void 0 && (f && f(0, 1), d)) {
		var h = css_to_keyframe(d(0, 1));
		m.push(h, h);
	}
	var get_t = () => 1 - i, g = e.animate(m, {
		duration: u,
		fill: "forwards"
	});
	return g.onfinish = () => {
		g.cancel(), a();
		var s = n?.t() ?? 1 - i;
		n?.abort();
		var c = i - s, l = t.duration * Math.abs(c), u = [];
		if (l > 0) {
			var m = !1;
			if (d) for (var h = Math.ceil(l / (1e3 / 60)), _ = 0; _ <= h; _ += 1) {
				var v = s + c * p(_ / h), y = css_to_keyframe(d(v, 1 - v));
				u.push(y), m ||= y.overflow === "hidden";
			}
			m && (e.style.overflow = "hidden"), get_t = () => {
				var e = g.currentTime;
				return s + c * p(e / l);
			}, f && loop(() => {
				if (g.playState !== "running") return !1;
				var e = get_t();
				return f(e, 1 - e), !0;
			});
		}
		g = e.animate(u, {
			duration: l,
			fill: "forwards"
		}), g.onfinish = () => {
			get_t = () => i, f?.(i, 1 - i), o();
		};
	}, {
		abort: () => {
			g && (g.cancel(), g.effect = null, g.onfinish = noop);
		},
		deactivate: () => {
			o = noop;
		},
		reset: () => {
			i === 0 && f?.(1, 0);
		},
		t: () => get_t()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/actions.js
function action(e, t, n) {
	effect(() => {
		var i = untrack(() => t(e, n?.()) || {});
		if (n && i?.update) {
			var a = !1, o = {};
			render_effect(() => {
				var e = n();
				deep_read_state(e), a && safe_not_equal(o, e) && (o = e, i.update(e));
			}), a = !0;
		}
		if (i?.destroy) return () => i.destroy();
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, n, i = "";
	if (typeof e == "string" || typeof e == "number") i += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var a = e.length;
		for (t = 0; t < a; t++) e[t] && (n = r(e[t])) && (i && (i += " "), i += n);
	} else for (n in e) e[n] && (i && (i += " "), i += n);
	return i;
}
function clsx$1() {
	for (var e, t, n = 0, i = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = r(e)) && (i && (i += " "), i += t);
	return i;
}
e(clsx$1, "clsx");
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
function clsx(e) {
	return typeof e == "object" ? clsx$1(e) : e ?? "";
}
var Ze = [..." 	\n\r\f\xA0\v﻿"];
function to_class(e, t, n) {
	var i = e == null ? "" : "" + e;
	if (t && (i = i ? i + " " + t : t), n) {
		for (var a of Object.keys(n)) if (n[a]) i = i ? i + " " + a : a;
		else if (i.length) for (var o = a.length, s = 0; (s = i.indexOf(a, s)) >= 0;) {
			var c = s + o;
			(s === 0 || Ze.includes(i[s - 1])) && (c === i.length || Ze.includes(i[c])) ? i = (s === 0 ? "" : i.substring(0, s)) + i.substring(c + 1) : s = c;
		}
	}
	return i === "" ? null : i;
}
function append_styles(e, t = !1) {
	var n = t ? " !important;" : ";", i = "";
	for (var a of Object.keys(e)) {
		var o = e[a];
		o != null && o !== "" && (i += " " + a + ": " + o + n);
	}
	return i;
}
function to_css_name(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function to_style(e, t) {
	if (t) {
		var n = "", i, a;
		if (Array.isArray(t) ? (i = t[0], a = t[1]) : i = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var o = !1, s = 0, c = !1, l = [];
			i && l.push(...Object.keys(i).map(to_css_name)), a && l.push(...Object.keys(a).map(to_css_name));
			var u = 0, d = -1;
			let t = e.length;
			for (var f = 0; f < t; f++) {
				var p = e[f];
				if (c ? p === "/" && e[f - 1] === "*" && (c = !1) : o ? o === p && (o = !1) : p === "/" && e[f + 1] === "*" ? c = !0 : p === "\"" || p === "'" ? o = p : p === "(" ? s++ : p === ")" && s--, !c && o === !1 && s === 0) {
					if (p === ":" && d === -1) d = f;
					else if (p === ";" || f === t - 1) {
						if (d !== -1) {
							var m = to_css_name(e.substring(u, d).trim());
							if (!l.includes(m)) {
								p !== ";" && f++;
								var h = e.substring(u, f).trim();
								n += " " + h + ";";
							}
						}
						u = f + 1, d = -1;
					}
				}
			}
		}
		return i && (n += append_styles(i)), a && (n += append_styles(a, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function set_class(e, t, n, i, a, o) {
	var s = e[ue];
	if (O || s !== n || s === void 0) {
		var c = to_class(n, i, o);
		(!O || c !== e.getAttribute("class")) && (c == null ? e.removeAttribute("class") : t ? e.className = c : e.setAttribute("class", c)), e[ue] = n;
	} else if (o && a !== o) for (var l in o) {
		var u = !!o[l];
		(a == null || u !== !!a[l]) && e.classList.toggle(l, u);
	}
	return o;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function update_styles(e, t = {}, n, i) {
	for (var a in n) {
		var o = n[a];
		t[a] !== o && (n[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, o, i));
	}
}
function set_style(e, t, n, i) {
	var a = e[de];
	if (O || a !== t) {
		var o = to_style(t, i);
		(!O || o !== e.getAttribute("style")) && (o == null ? e.removeAttribute("style") : e.style.cssText = o), e[de] = t;
	} else i && (Array.isArray(i) ? (update_styles(e, n?.[0], i[0]), update_styles(e, n?.[1], i[1], "important")) : update_styles(e, n, i));
	return i;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function select_option(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!c(t)) return select_multiple_invalid_value();
		for (var i of e.options) i.selected = t.includes(get_option_value(i));
		return;
	}
	for (i of e.options) if (is(get_option_value(i), t)) {
		i.selected = !0;
		return;
	}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function init_select(e) {
	var t = new MutationObserver(() => {
		select_option(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), teardown(() => {
		t.disconnect();
	});
}
function bind_select_value(e, t, n = t) {
	var i = /* @__PURE__ */ new WeakSet(), a = !0;
	listen_to_event_and_reset_event(e, "change", (t) => {
		var a = t ? "[selected]" : ":checked", o;
		if (e.multiple) o = [].map.call(e.querySelectorAll(a), get_option_value);
		else {
			var s = e.querySelector(a) ?? e.querySelector("option:not([disabled])");
			o = s && get_option_value(s);
		}
		n(o), e.__value = o, I !== null && i.add(I);
	}), effect(() => {
		var o = t();
		if (e === document.activeElement) {
			var s = A ? xe : I;
			if (i.has(s)) return;
		}
		if (select_option(e, o, a), a && o === void 0) {
			var c = e.querySelector(":checked");
			c !== null && (o = get_option_value(c), n(o));
		}
		e.__value = o, a = !1;
	}), init_select(e);
}
function get_option_value(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Qe = Symbol("is custom element"), $e = Symbol("is html"), et = he ? "link" : "LINK";
function remove_input_defaults(e) {
	if (O) {
		var t = !1, remove_defaults = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					set_attribute(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var i = e.checked;
					set_attribute(e, "checked", null), e.checked = i;
				}
			}
		};
		e[pe] = remove_defaults, queue_micro_task(remove_defaults), add_form_reset_listener();
	}
}
function set_selected(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function set_attribute(e, t, n, i) {
	var a = get_attributes(e);
	O && (a[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === et) || a[t] !== (a[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && get_setters(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function get_attributes(e) {
	return e[le] ??= {
		[Qe]: e.nodeName.includes("-"),
		[$e]: e.namespaceURI === a
	};
}
var tt = /* @__PURE__ */ new Map();
function get_setters(e) {
	var t = e.getAttribute("is") || e.nodeName, n = tt.get(t);
	if (n) return n;
	tt.set(t, n = []);
	for (var i, a = e, o = Element.prototype; o !== a;) {
		for (var s in i = m(a), i) i[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		a = _(a);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function bind_value(e, t, n = t) {
	var i = /* @__PURE__ */ new WeakSet();
	listen_to_event_and_reset_event(e, "input", async (a) => {
		var o = a ? e.defaultValue : e.value;
		if (o = is_numberlike_input(e) ? to_number(o) : o, n(o), I !== null && i.add(I), await tick(), o !== (o = t())) {
			var s = e.selectionStart, c = e.selectionEnd, l = e.value.length;
			if (e.value = o ?? "", c !== null) {
				var u = e.value.length;
				s === c && c === l && u > l ? (e.selectionStart = u, e.selectionEnd = u) : (e.selectionStart = s, e.selectionEnd = Math.min(c, u));
			}
		}
	}), (O && e.defaultValue !== e.value || untrack(t) == null && e.value) && (n(is_numberlike_input(e) ? to_number(e.value) : e.value), I !== null && i.add(I)), render_effect(() => {
		var n = t();
		if (e === document.activeElement) {
			var a = A ? xe : I;
			if (i.has(a)) return;
		}
		is_numberlike_input(e) && n === to_number(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
var nt = /* @__PURE__ */ new Set();
function bind_group(e, t, n, i, a = i) {
	var o = n.getAttribute("type") === "checkbox", s = e;
	let c = !1;
	if (t !== null) for (var l of t) s = s[l] ??= [];
	s.push(n), listen_to_event_and_reset_event(n, "change", () => {
		var e = n.__value;
		o && (e = get_binding_group_value(s, e, n.checked)), a(e);
	}, () => a(o ? [] : null)), render_effect(() => {
		var e = i();
		if (O && n.defaultChecked !== n.checked) {
			c = !0;
			return;
		}
		o ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = is(n.__value, e);
	}), teardown(() => {
		var e = s.indexOf(n);
		e !== -1 && s.splice(e, 1);
	}), nt.has(s) || (nt.add(s), queue_micro_task(() => {
		s.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), nt.delete(s);
	})), queue_micro_task(() => {
		if (c) {
			var e = o ? get_binding_group_value(s, e, n.checked) : s.find((e) => e.checked)?.__value;
			a(e);
		}
	});
}
function bind_checked(e, t, n = t) {
	listen_to_event_and_reset_event(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (O && e.defaultChecked !== e.checked || untrack(t) == null) && n(e.checked), render_effect(() => {
		e.checked = !!t();
	});
}
function get_binding_group_value(e, t, n) {
	for (var i = /* @__PURE__ */ new Set(), a = 0; a < e.length; a += 1) e[a].checked && i.add(e[a].__value);
	return n || i.delete(t), Array.from(i);
}
function is_numberlike_input(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function to_number(e) {
	return e === "" ? null : +e;
}
function bind_files(e, t, n = t) {
	listen_to_event_and_reset_event(e, "change", () => {
		n(e.files);
	}), O && e.files && n(e.files), render_effect(() => {
		e.files = t();
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/props.js
function bind_prop(e, t, n) {
	var i = p(e, t);
	i && i.set && (e[t] = n, teardown(() => {
		e[t] = null;
	}));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function is_bound_this(e, t) {
	return e === t || e?.[D] === t;
}
function bind_this(e = {}, t, n, i) {
	var a = M.r, o = K;
	return effect(() => {
		var s, c;
		return render_effect(() => {
			s = c, c = i?.() || [], untrack(() => {
				is_bound_this(n(...c), e) || (t(e, ...c), s && is_bound_this(n(...s), e) && t(null, ...s));
			});
		}), () => {
			let i = o;
			for (; i !== a && i.parent !== null && i.parent.f & 33554432;) i = i.parent;
			let teardown = () => {
				c && is_bound_this(n(...c), e) && t(null, ...c);
			}, s = i.teardown;
			i.teardown = () => {
				teardown(), s?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function init(e = !1) {
	let t = M, n = t.l.u;
	if (!n) return;
	let props = () => deep_read_state(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ derived(() => {
			let i = !1, a = t.s;
			for (let e in a) a[e] !== n[e] && (n[e] = a[e], i = !0);
			return i && e++, e;
		});
		props = () => get(i);
	}
	n.b.length && user_pre_effect(() => {
		observe_all(t, props), run_all(n.b);
	}), user_effect(() => {
		let e = untrack(() => n.m.map(run));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && user_effect(() => {
		observe_all(t, props), run_all(n.a);
	});
}
function observe_all(e, t) {
	if (e.l.s) for (let t of e.l.s) get(t);
	t();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
var rt = {
	get(e, t) {
		if (!e.exclude.includes(t)) return get(e.version), t in e.special ? e.special[t]() : e.props[t];
	},
	set(e, t, n) {
		if (!(t in e.special)) {
			var i = K;
			try {
				set_active_effect(e.parent_effect), e.special[t] = prop({ get [t]() {
					return e.props[t];
				} }, t, 4);
			} finally {
				set_active_effect(i);
			}
		}
		return e.special[t](n), update(e.version), !0;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.includes(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	deleteProperty(e, t) {
		return e.exclude.includes(t) ? !0 : (e.exclude.push(t), update(e.version), !0);
	},
	has(e, t) {
		return e.exclude.includes(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
	}
};
function legacy_rest_props(e, t) {
	return new Proxy({
		props: e,
		exclude: t,
		special: {},
		version: source(0),
		parent_effect: K
	}, rt);
}
function prop(e, t, n, i) {
	var a = !j || (n & 2) != 0, o = (n & 8) != 0, s = (n & 16) != 0, c = i, l = !0, u = void 0, get_fallback = () => s && a ? (u ??= /* @__PURE__ */ derived(i), get(u)) : (l && (l = !1, c = s ? untrack(i) : i), c);
	let d;
	if (o) {
		var f = D in e || se in e;
		d = p(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = capture_store_binding(() => e[t]) : m = e[t], m === void 0 && i !== void 0 && (m = get_fallback(), d && (a && props_invalid_value(t), d(m)));
	var g = a ? () => {
		var n = e[t];
		return n === void 0 ? get_fallback() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (a && !(n & 4)) return g;
	if (d) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!a || !t || _ || h) && d(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? derived : derived_safe_equal)(() => (v = !1, g()));
	o && get(y);
	var b = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? get(y) : a && o ? proxy(e) : e;
			return set(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return U && v || b.f & 16384 ? y.v : get(y);
	});
}
var it = /* @__PURE__ */ t({
	attach: () => attach,
	fade: () => fade,
	openSlidingHud: () => openSlidingHud
}), at, ot = {
	hase: null,
	attack: null,
	damage: null,
	struct: null,
	stress: null
};
async function attach() {
	if (!at) {
		let e = (await import("./SlidingHUDZone-CYba6bF2.mjs")).default, t = {};
		for (let e of [
			"attack",
			"damage",
			"hase",
			"struct",
			"stress"
		]) t[`${e}.submit`] = (t) => {
			ot[e]?.[0](t.detail), ot[e] = null;
		}, t[`${e}.cancel`] = () => {
			ot[e]?.[1](), ot[e] = null;
		};
		at = mount(e, {
			target: document.body,
			events: t,
			props: { faded: !1 }
		});
	}
	return at;
}
async function openSlidingHud(e, t) {
	return at = await attach(), at.open(e, t), new Promise((t, n) => {
		ot[e] = [t, n];
	});
}
async function fade(e = "out") {
	(await attach()).fade(e);
}
//#endregion
export { sibling as $, if_block as A, delegate as B, transition as C, each as D, html as E, set_text as F, untrack as G, event as H, append as I, legacy_pre_effect_reset as J, invalidate_inner_signals as K, comment as L, onDestroy as M, onMount as N, index as O, mount as P, first_child as Q, from_html as R, animation as S, slot as T, deep_read_state as U, delegated as V, get as W, user_effect as X, template_effect as Y, child as Z, bind_select_value as _, legacy_rest_props as a, user_derived as at, clsx as b, bind_this as c, store_get as ct, bind_files as d, pop as dt, proxy as et, bind_group as f, push as ft, set_selected as g, transition_slide_display as gt, set_attribute as h, reset as ht, it as i, state as it, createEventDispatcher as j, key as k, bind_prop as l, derived$1 as lt, remove_input_defaults as m, next as mt, fade as n, mutate as nt, prop as o, flushSync as ot, bind_value as p, enable_legacy_mode_flag as pt, legacy_pre_effect as q, openSlidingHud as r, set as rt, init as s, setup_stores as st, attach as t, mutable_source as tt, bind_checked as u, readable as ut, set_style as v, component as w, action as x, set_class as y, text as z };

//# sourceMappingURL=slidinghud-Ci-nXn7_.mjs.map