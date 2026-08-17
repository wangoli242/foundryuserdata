import { i as e } from "./chunk-DAAM-nuR.mjs";
import { Kr as t, at as n, ct as r, nt as i, ot as a, rt as o, st as s } from "./lancer-actor-DUbnXjU1.mjs";
import { $ as c, A as l, C as u, D as d, E as f, F as p, G as m, H as h, I as g, J as _, L as v, N as y, O as b, Q as x, R as S, T as C, U as w, W as T, Y as E, Z as D, a as O, d as k, dt as A, ft as j, h as M, ht as N, j as P, l as F, m as I, mt as L, nt as R, o as z, ot as ee, q as B, rt as V, s as H, tt as U, u as W, v as G, y as K } from "./slidinghud-Ci-nXn7_.mjs";
import { n as q, t as J } from "./comp-builder-BQCDZdOO.mjs";
import "./disclose-version-D7mHcnt5.mjs";
import { r as Y } from "./legacy-BniSAU0y.mjs";
//#region src/module/apps/components/Spinner.svelte
var X = S("<div class=\"spinner__container svelte-80lzm7\"><div class=\"spinner__spinner svelte-80lzm7\"></div> <!></div>");
function Spinner(e, t) {
	var n = X();
	C(c(D(n), 2), t, "default", {}, null), N(n), g(e, n);
}
//#endregion
//#region src/module/apps/lcp-manager/LCPDetails.svelte
var Z = S("<a style=\"margin: 5px\"> </a>"), Q = S("<div style=\"margin: 10px\"> </div>"), $ = S("<img/>"), te = S("<li><span class=\"lcp-manifest-badge\"> </span> pilot skills</li>"), ne = S("<li><span class=\"lcp-manifest-badge\"> </span> talents</li>"), re = S("<li><span class=\"lcp-manifest-badge\"> </span> bonds</li>"), ie = S("<li><span class=\"lcp-manifest-badge\"> </span> reserves</li>"), ae = S("<li><span class=\"lcp-manifest-badge\"> </span> pilot gear</li>"), oe = S("<li><span class=\"lcp-manifest-badge\"> </span> frames</li>"), se = S("<li><span class=\"lcp-manifest-badge\"> </span> mech systems</li>"), ce = S("<li><span class=\"lcp-manifest-badge\"> </span> mech weapons</li>"), le = S("<li><span class=\"lcp-manifest-badge\"> </span> weapon mods</li>"), ue = S("<li><span class=\"lcp-manifest-badge\"> </span> NPC classes</li>"), de = S("<li><span class=\"lcp-manifest-badge\"> </span> NPC templates</li>"), fe = S("<li><span class=\"lcp-manifest-badge\"> </span> NPC features</li>"), pe = S("<button type=\"button\" class=\"lcp-import\" title=\"Import LCP\" tabindex=\"-1\"><i class=\"cci cci-content-manager i--4\"></i> Import LCP</button>"), me = S("<div class=\"lcp-details__content svelte-tnc0x4\"><!> <div class=\"lcp-description minor desc-text svelte-tnc0x4\"><div><!> <span>Contents:</span> <ul class=\"svelte-tnc0x4\"><!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!></ul> <!></div></div> <!></div>"), he = S("<div class=\"lcp-details card clipped svelte-tnc0x4\"><div class=\"lancer-header lancer-primary major\"><span> </span></div> <!></div>");
function LCPDetails(e, t) {
	j(t, !1);
	let n = U(), r = P(), i = z(t, "contentSummary", 8, null), a = z(t, "showImportButton", 8), o = z(t, "disabled", 8, !1), s = U(null), d = U("fade-in");
	B(() => (w(i()), T(s)), () => {
		i() !== T(s) && (V(d, "fade-out"), setTimeout(() => {
			V(s, i()), V(d, "fade-in");
		}, 100));
	}), B(() => T(s), () => {
		V(n, T(s) ? `${T(s).name}${T(s).version ? ` v${T(s).version}` : ""}` : "No LCP Selected");
	}), _(), H();
	var y = he(), b = D(y), S = D(b), C = D(S, !0);
	N(S), N(b);
	var O = c(b, 2), consequent_16 = (e) => {
		var t = me(), n = D(t), consequent = (e) => {
			var t = Z(), n = D(t);
			N(t), E(() => {
				M(t, "href", (T(s), m(() => T(s).website))), K(t, 1, `medium transition ${T(d)}`, "svelte-tnc0x4"), p(n, `by ${(T(s), m(() => T(s).author)) ?? ""}`);
			}), g(e, t);
		}, alternate = (e) => {
			var t = Q(), n = D(t);
			N(t), E(() => {
				K(t, 1, `medium transition ${T(d)}`, "svelte-tnc0x4"), p(n, `by ${(T(s), m(() => T(s).author)) ?? ""}`);
			}), g(e, t);
		};
		l(n, (e) => {
			T(s), m(() => T(s).website) ? e(consequent) : e(alternate, -1);
		});
		var i = c(n, 2), _ = D(i), y = D(_), consequent_1 = (e) => {
			var t = $();
			E(() => {
				K(t, 1, `manifest-image transition ${T(d)}`, "svelte-tnc0x4"), M(t, "src", (T(s), m(() => T(s).image_url))), M(t, "title", (T(s), m(() => T(s).name))), M(t, "alt", (T(s), m(() => T(s).name)));
			}), g(e, t);
		};
		l(y, (e) => {
			T(s), m(() => T(s).image_url) && e(consequent_1);
		});
		var b = c(y, 4), S = D(b), consequent_2 = (e) => {
			var t = te(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).skills)))), g(e, t);
		};
		l(S, (e) => {
			T(s), m(() => T(s).skills) && e(consequent_2);
		});
		var C = c(S, 2), consequent_3 = (e) => {
			var t = ne(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).talents)))), g(e, t);
		};
		l(C, (e) => {
			T(s), m(() => T(s).talents) && e(consequent_3);
		});
		var O = c(C, 2), consequent_4 = (e) => {
			var t = re(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).bonds)))), g(e, t);
		};
		l(O, (e) => {
			T(s), m(() => T(s).bonds) && e(consequent_4);
		});
		var k = c(O, 2), consequent_5 = (e) => {
			var t = ie(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).reserves)))), g(e, t);
		};
		l(k, (e) => {
			T(s), m(() => T(s).reserves) && e(consequent_5);
		});
		var A = c(k, 2), consequent_6 = (e) => {
			var t = ae(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).gear)))), g(e, t);
		};
		l(A, (e) => {
			T(s), m(() => T(s).gear) && e(consequent_6);
		});
		var j = c(A, 2), consequent_7 = (e) => {
			var t = oe(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).frames)))), g(e, t);
		};
		l(j, (e) => {
			T(s), m(() => T(s).frames) && e(consequent_7);
		});
		var P = c(j, 2), consequent_8 = (e) => {
			var t = se(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).systems)))), g(e, t);
		};
		l(P, (e) => {
			T(s), m(() => T(s).systems) && e(consequent_8);
		});
		var F = c(P, 2), consequent_9 = (e) => {
			var t = ce(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).weapons)))), g(e, t);
		};
		l(F, (e) => {
			T(s), m(() => T(s).weapons) && e(consequent_9);
		});
		var I = c(F, 2), consequent_10 = (e) => {
			var t = le(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).mods)))), g(e, t);
		};
		l(I, (e) => {
			T(s), m(() => T(s).mods) && e(consequent_10);
		});
		var R = c(I, 2), consequent_11 = (e) => {
			var t = ue(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).npc_classes)))), g(e, t);
		};
		l(R, (e) => {
			T(s), m(() => T(s).npc_classes) && e(consequent_11);
		});
		var z = c(R, 2), consequent_12 = (e) => {
			var t = de(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).npc_templates)))), g(e, t);
		};
		l(z, (e) => {
			T(s), m(() => T(s).npc_templates) && e(consequent_12);
		});
		var ee = c(z, 2), consequent_13 = (e) => {
			var t = fe(), n = D(t), r = D(n, !0);
			N(n), L(), N(t), E(() => p(r, (T(s), m(() => T(s).npc_features)))), g(e, t);
		};
		l(ee, (e) => {
			T(s), m(() => T(s).npc_features) && e(consequent_13);
		}), N(b);
		var B = c(b, 2), consequent_14 = (e) => {
			var t = v();
			f(x(t), () => (T(s), m(() => T(s).description))), g(e, t);
		};
		l(B, (e) => {
			T(s), m(() => T(s).description) && e(consequent_14);
		}), N(_), N(i);
		var V = c(i, 2), consequent_15 = (e) => {
			var t = pe();
			E(() => t.disabled = o()), u(7, t, () => Y), h("click", t, () => r("importLcp")), g(e, t);
		};
		l(V, (e) => {
			w(a()), T(s), m(() => !a() && !T(s).aggregate) && e(consequent_15);
		}), N(t), E(() => K(_, 1, `transition ${T(d)}`, "svelte-tnc0x4")), u(7, t, () => Y), g(e, t);
	};
	l(O, (e) => {
		T(s) && e(consequent_16);
	}), N(y), E(() => {
		K(S, 1, `transition ${T(d)}`, "svelte-tnc0x4"), p(C, T(n));
	}), g(e, y), A();
}
//#endregion
//#region src/module/apps/lcp-manager/LCPSelector.svelte
var ge = S("<div><div class=\"lancer-header lancer-primary major\">Import From File</div> <div class=\"file-select-container svelte-1nrbihl\"><label class=\"lancer-file-input\"><input id=\"lcp-file\" type=\"file\" multiple=\"\" aria-label=\"Select LCP file\" name=\"lcp-up\" class=\"lcp-up\" accept=\".lcp\"/> <span class=\"lancer-file-input-display\"><div class=\"lancer-file-input__button\">Browse</div> <span class=\"lancer-file-input__filenames\"> </span></span></label> <button class=\"lancer-button deselect-file svelte-1nrbihl\"><i class=\"fas fa-broom\"></i> Unselect File</button></div></div>");
function LCPSelector(e, t) {
	let n = O(O(t, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]), ["deselect", "disabled"]);
	j(t, !1);
	let r = P(), a = z(t, "disabled", 8, !1), deselect = () => {
		V(l, null), V(u, null), console.log("Deselecting file"), r("lcpLoaded", null);
	}, l = U(null), u = U(null), d = [], f = null;
	function filesSelected(e) {
		let t = e.target?.files;
		if (t) {
			V(u, ""), d = [];
			for (let e = 0; e < t.length; e++) {
				let n = t[e];
				console.log(`Selected file: ${n.name}`), V(u, T(u) + n.name), e < t.length - 1 && V(u, T(u) + ", "), d.push({
					name: n.name,
					data: null,
					loaded: !1,
					cp: null
				});
				let r = new FileReader();
				r.addEventListener("loadend", (e) => {
					let t = r.result, i = d.find((e) => e.name === n.name);
					i && (i.loaded = !0, t && (i.data = t));
				}), r.readAsArrayBuffer(n);
			}
			waitAndDispatchLcpLoaded();
		}
	}
	async function waitAndDispatchLcpLoaded() {
		if (!d || !d.length) return;
		for (; d.some((e) => !e.loaded);) await new Promise((e) => setTimeout(e, 100));
		if (d.length === 1) {
			let e = d[0];
			if (!e.data) {
				ui.notifications.error(`Failed to load LCP ${e.name}`);
				return;
			}
			try {
				e.cp = await s(e.data), r("lcpLoaded", {
					contentPacks: [e.cp],
					contentSummary: i(e.cp)
				});
				return;
			} catch (t) {
				ui.notifications.error(`Could not load ${e.name}: ${t.message || t}`, { permanent: !0 });
				return;
			}
		}
		let e = {
			name: "Selected LCPs",
			author: "Various",
			item_prefix: "",
			version: "",
			description: ""
		};
		await Promise.all(d.map(async (t) => {
			if (!t.data) {
				ui.notifications.error(`Failed to load LCP ${t.name}`);
				return;
			}
			try {
				t.cp = await s(t.data);
				let n = t.cp.manifest.website ? `<a href="${t.cp.manifest.website}">${t.cp.manifest.author}</a>` : `<em>${t.cp.manifest.author}</em>`;
				e.description += `<b>${t.cp.manifest.name}</b> v${t.cp.manifest.version} by ${n}<br />`;
			} catch (e) {
				ui.notifications.error(`Could not load ${t.name}: ${e.message || e}`, { permanent: !0 });
			}
		}));
		let t = d.map((e) => e.cp).filter((e) => !!e);
		t.length && (f = o(e, t), r("lcpLoaded", {
			contentPacks: t,
			contentSummary: f
		}));
	}
	var _ = { deselect };
	H();
	var v = ge(), y = c(D(v), 2), b = D(y), x = D(b), S = c(x, 2), C = c(D(S), 2), M = D(C, !0);
	N(C), N(S), N(b);
	var I = c(b, 2);
	return N(y), N(v), E(() => {
		G(v, (w(n), m(() => n.style))), x.disabled = a(), p(M, T(u) || "Choose file..."), I.disabled = a();
	}), k(x, () => T(l), (e) => V(l, e)), h("change", x, filesSelected), h("click", I, deselect), g(e, v), F(t, "deselect", deselect), A(_);
}
//#endregion
//#region src/module/apps/lcp-manager/LCPTable.svelte
var _e = S("<input class=\"content-checkbox svelte-1ggr976\" type=\"checkbox\"/>"), ve = S("<span class=\"content-checkbox svelte-1ggr976\"></span>"), ye = S("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"svelte-1ggr976\"><i class=\"fas fa-external-link-alt svelte-1ggr976\"></i></a>"), be = S("<i class=\"fas fa-check svelte-1ggr976\"></i>"), xe = S("<i class=\"fas fa-arrow-right svelte-1ggr976\"></i>"), Se = S("<i class=\"fas fa-lock svelte-1ggr976\"></i>"), Ce = S("<div><!> <span class=\"content-label svelte-1ggr976\"> </span> <span class=\"content-label svelte-1ggr976\"> </span> <span class=\"content-label svelte-1ggr976\"><!></span> <span class=\"curr-version svelte-1ggr976\"> </span> <span class=\"content-icon svelte-1ggr976\"><!></span> <span class=\"avail-version svelte-1ggr976\"> </span></div>"), we = S("<div class=\"lcp-table flexcol svelte-1ggr976\"><div class=\"lancer-header clipped-top lancer-primary major svelte-1ggr976\">Available and Installed Content</div> <div id=\"lcp-table\" class=\"svelte-1ggr976\"><div class=\"lcp-table__rows svelte-1ggr976\"><div class=\"row header svelte-1ggr976\"><div class=\"svelte-1ggr976\"><input class=\"content-checkbox svelte-1ggr976\" name=\"select-all\" type=\"checkbox\"/></div> <span class=\"svelte-1ggr976\">TITLE</span> <span class=\"svelte-1ggr976\">AUTHOR</span> <span class=\"svelte-1ggr976\"></span> <span class=\"svelte-1ggr976\">CURRENT</span> <span class=\"svelte-1ggr976\"></span> <span class=\"svelte-1ggr976\">AVAILABLE</span></div> <!></div></div> <div class=\"lcp-table__buttons svelte-1ggr976\"><button type=\"button\" class=\"lancer-button lcp-bulk-import svelte-1ggr976\" title=\"Import/Update Selected\" tabindex=\"-1\"><i class=\"cci cci-content-manager i--4 svelte-1ggr976\"></i> Import/Update Selected</button> <button type=\"button\" class=\"lancer-button lcp-clear-all svelte-1ggr976\" title=\"Clear Compendium Data\" tabindex=\"-1\"><i class=\"fas fa-trash i--2 svelte-1ggr976\"></i> Clear Compendium Data</button></div></div>");
function LCPTable(e, t) {
	let n = O(O(t, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]), [
		"deselect",
		"lcpData",
		"disabled"
	]);
	j(t, !1);
	let r = U(), a = P(), s = z(t, "lcpData", 8), u = z(t, "disabled", 8, !1), deselect = () => {
		for (let e of s()) R(f, T(f)[e.id].checked = !1);
	};
	y(() => debounceAggregateSummary());
	let f = U({});
	function toggleSelectAllOfficial() {
		for (let e of s()) T(f)[e.id].selectable && R(f, T(f)[e.id].checked = !T(r));
	}
	function toggleRow(e) {
		R(f, T(f)[e].checked = !T(f)[e].checked), debounceAggregateSummary();
	}
	let S = {
		author: "Massif Press",
		name: "Selected Official Sources",
		version: "1.0.0",
		item_prefix: "",
		description: "",
		website: "https://massif-press.itch.io/"
	};
	function generateAggregateSummary() {
		let e = s().filter((e) => T(f)[e.id].checked);
		if (!e.length) return null;
		if (e.length === 1) {
			let t = i(e[0].cp);
			return t.aggregate = !0, t;
		}
		return o(S, e.filter((e) => !!e.cp).map((e) => e.cp));
	}
	let C = null;
	function debounceAggregateSummary() {
		C && clearTimeout(C), C = setTimeout(() => {
			a("aggregateSummary", generateAggregateSummary());
		}, 100);
	}
	let k = null;
	function onMouseenterRow(e) {
		k = e;
		let t = s().find((t) => t.id === e);
		if (!t || !t.cp || !t.cp.data) {
			a("lcpHovered", null);
			return;
		}
		a("lcpHovered", i(t.cp));
	}
	function onMouseleaveRow(e) {
		setTimeout(() => {
			k === e && (k = null, a("lcpHovered", null));
		}, 50);
	}
	function dispatchLcpsToInstall() {
		a("installManyLcps", s().filter((e) => T(f)[e.id].checked).map((e) => e.cp));
	}
	function clearCompendiums() {
		a("clearCompendiums");
	}
	B(() => T(f), () => {
		V(r, Object.values(T(f)).every((e) => !e.selectable || e.checked));
	}), B(() => (w(s()), T(f)), () => {
		if (s() !== void 0) for (let e of s()) T(f)[e.id] || R(f, T(f)[e.id] = {
			checked: e.availableVersion > e.currentVersion,
			selectable: !!e.availableVersion
		});
	}), _();
	var ee = { deselect };
	H();
	var q = we(), J = c(D(q), 2), Y = D(J), X = D(Y), Z = D(X), Q = D(Z);
	I(Q), N(Z), L(12), N(X), d(c(X, 2), 1, s, b, (e, t) => {
		var n = Ce(), r = D(n), consequent = (e) => {
			var n = _e();
			I(n), E(() => {
				M(n, "name", (T(t), m(() => T(t).id))), n.disabled = u();
			}), W(n, () => T(f)[T(t).id].checked, (e) => R(f, T(f)[T(t).id].checked = e)), h("change", n, () => debounceAggregateSummary()), g(e, n);
		}, alternate = (e) => {
			g(e, ve());
		};
		l(r, (e) => {
			T(f), T(t), m(() => T(f)[T(t).id].selectable) ? e(consequent) : e(alternate, -1);
		});
		var i = c(r, 2), a = D(i, !0);
		N(i);
		var o = c(i, 2), s = D(o, !0);
		N(o);
		var d = c(o, 2), _ = D(d), consequent_1 = (e) => {
			var n = ye();
			E(() => M(n, "href", (T(t), m(() => T(t).url)))), h("click", n, (e) => e.stopPropagation()), g(e, n);
		};
		l(_, (e) => {
			T(t), m(() => T(t).url) && e(consequent_1);
		}), N(d);
		var y = c(d, 2), b = D(y, !0);
		N(y);
		var S = c(y, 2), C = D(S), consequent_4 = (e) => {
			var n = v(), r = x(n), consequent_2 = (e) => {
				g(e, be());
			}, consequent_3 = (e) => {
				g(e, xe());
			}, alternate_1 = (e) => {
				g(e, Se());
			};
			l(r, (e) => {
				T(t), m(() => T(t).currentVersion === T(t).availableVersion) ? e(consequent_2) : (T(f), T(t), m(() => T(f)[T(t).id]) ? e(consequent_3, 1) : e(alternate_1, -1));
			}), g(e, n);
		};
		l(C, (e) => {
			T(t), m(() => T(t).availableVersion) && e(consequent_4);
		}), N(S);
		var w = c(S, 2), O = D(w, !0);
		N(w), N(n), E(() => {
			K(n, 1, (T(t), m(() => `row${T(t).availableVersion ? " has-data" : ""}`)), "svelte-1ggr976"), p(a, (T(t), m(() => T(t).title))), p(s, (T(t), m(() => T(t).author))), p(b, (T(t), m(() => T(t).currentVersion))), p(O, (T(t), m(() => T(t).availableVersion)));
		}), h("mouseenter", n, () => onMouseenterRow(T(t).id)), h("mouseleave", n, () => onMouseleaveRow(T(t).id)), h("click", n, () => toggleRow(T(t).id)), h("keypress", n, () => toggleRow(T(t).id)), g(e, n);
	}), N(Y), N(J);
	var $ = c(J, 2), te = D($), ne = c(te, 2);
	return N($), N(q), E((e, t) => {
		G(q, (w(n), m(() => n.style))), Q.disabled = u(), te.disabled = e, ne.disabled = t;
	}, [() => (w(u()), w(s()), T(f), m(() => u() || !s().some((e) => T(f)[e.id].checked))), () => (w(u()), w(s()), m(() => u() || !s().some((e) => e.currentVersion !== "--")))]), W(Q, () => T(r), (e) => V(r, e)), h("click", Q, toggleSelectAllOfficial), h("change", Q, () => debounceAggregateSummary()), h("click", te, dispatchLcpsToInstall), h("click", ne, clearCompendiums), g(e, q), F(t, "deselect", deselect), A(ee);
}
//#endregion
//#region src/module/apps/lcp-manager/LCPManager.svelte
var Te = S("<span class=\"monospace\">Loading data, please wait…</span>"), Ee = S("<span class=\"monospace svelte-8hb725\"> </span> <div class=\"lcp-manager__progress-bar svelte-8hb725\"></div>", 1), De = S("<div class=\"lcp-manager__progress-bar svelte-8hb725\"></div>"), Oe = S("<div class=\"flexrow lcp-manager__main-content svelte-8hb725\" style=\"flex: 1 1\"><!> <div class=\"lcp-manager__detail-column svelte-8hb725\"><!> <!></div></div> <div class=\"lcp-manager__progress-area svelte-8hb725\"><div class=\"lcp-manager__progress svelte-8hb725\"><!> <!></div></div>", 1), ke = S("<div class=\"lcp-manager svelte-8hb725\"><!></div>");
function LCPManager(i, o) {
	j(o, !1);
	let s = U(), d = U(), f = U(), h = U(), v = t.log_prefix, y = z(o, "injectedContentSummary", 12, null), b = z(o, "loading", 12, !0), S = U([]), C = [], O = U(null), k = U(null), M = U(null), P = U(null), F = U(!1), I = U(!1), L = U(!1), R = U(0), W = U(0), K = U(), X = U();
	async function init$1() {
		b(!0);
		let e = new r(game.settings.get(game.system.id, t.setting_lcps).index);
		V(S, a(await n(e), e)), b(!1);
	}
	e(init$1, "init"), init$1();
	function lcpLoaded(e) {
		if (!e.detail) {
			C = [], V(O, null);
			return;
		}
		V(O, e.detail.contentSummary), C = e.detail.contentPacks, T(K)();
	}
	function lcpHovered(e) {
		V(k, e.detail);
	}
	function updateAggregateSummary(e) {
		V(M, e.detail), C = [], V(O, null), T(X)();
	}
	async function updateLcpIndex(e) {
		let n = new r(game.settings.get(game.system.id, t.setting_lcps).index);
		n.updateManifest(e), await game.settings.set(game.system.id, t.setting_lcps, n);
		let i = T(S).find((t) => t.title === e.name && t.author === e.author);
		i ? i.currentVersion = e.version : T(S).push({
			title: e.name,
			author: e.author,
			currentVersion: e.version,
			availableVersion: "",
			url: e.website,
			id: e.item_prefix || e.name.replace(/\s/g, "-").toLowerCase()
		}), V(S, [...T(S)]);
	}
	function _canImportLcp() {
		return game.user?.isGM ? T(h) ? !0 : (ui.notifications.warn("Please update the Core data before importing LCPs."), !1) : (ui.notifications.warn("Only GM can modify the Compendiums."), !1);
	}
	async function importLcp(e = null) {
		if (!e) {
			ui.notifications.error("You must select an LCP file before importing.");
			return;
		}
		if (!_canImportLcp()) return;
		let n = e.manifest;
		!e || !n || (`${e.manifest.name}${e.manifest.version}`, V(F, !0), V(R, 0), V(P, e), updateProgressBar(0, 1), console.log(`${v} Starting import of ${e.manifest.name} v${e.manifest.version}.`), console.log(`${v} Parsed content pack:`, e), await q(e, (e, t) => updateProgressBar(e, t)), updateProgressBar(1, 1), console.log(`${v} Import of ${e.manifest.name} v${e.manifest.version} complete.`), V(F, !1), setTimeout(() => {
			!T(F) && !T(I) && V(P, null);
		}, 1e3), e.manifest.name === "Lancer Core Book Data" && e.manifest.author === "Massif Press" && await game.settings.set(game.system.id, t.setting_core_data, e.manifest.version), updateLcpIndex(n));
	}
	async function importManyLcps(e = null) {
		if (e ||= C, _canImportLcp()) {
			V(I, !0), V(W, 0);
			for (let [t, n] of e.entries()) n && (V(W, Math.min(Math.ceil(t / e.length * 100), 100)), await importLcp(n));
			V(I, !1);
		}
	}
	function updateProgressBar(e, t) {
		let n = Math.min(e / t, 1);
		V(R, Math.floor(n * 100));
	}
	async function clearCompendiums() {
		await foundry.applications.api.DialogV2.confirm({
			window: {
				title: "Clear Compendiums",
				icon: "fas fa-triangle-exclamation"
			},
			content: "<p>Are you sure you want to delete all actors and items from the Lancer compendiums?</p>\n        <p><i class=\"fas fa-triangle-exclamation i--4\"></i> This action cannot be undone!</p>"
		}) && (V(L, !0), await J(), V(S, a(await n(), new r(game.settings.get(game.system.id, t.setting_lcps).index))), T(X)(), V(L, !1));
	}
	B(() => (T(F), T(I), T(L)), () => {
		V(s, T(F) || T(I) || T(L));
	}), B(() => (w(y()), T(k), T(O), T(M)), () => {
		V(d, y() ?? T(k) ?? T(O) ?? T(M));
	}), B(() => (T(k), T(d)), () => {
		V(f, T(k) !== null && !T(d)?.aggregate);
	}), B(() => T(S), () => {
		V(h, T(S).find((e) => e.id === "core")?.currentVersion);
	}), _();
	var Z = {
		get injectedContentSummary() {
			return y();
		},
		set injectedContentSummary(e) {
			y(e), ee();
		},
		get loading() {
			return b();
		},
		set loading(e) {
			b(e), ee();
		}
	};
	H();
	var Q = ke(), $ = D(Q), consequent = (e) => {
		Spinner(e, {
			children: (e, t) => {
				g(e, Te());
			},
			$$slots: { default: !0 }
		});
	}, alternate = (e) => {
		var t = Oe(), n = x(t), r = D(n);
		LCPTable(r, {
			get lcpData() {
				return T(S);
			},
			get disabled() {
				return T(s);
			},
			set disabled(e) {
				V(s, e);
			},
			get deselect() {
				return T(K);
			},
			set deselect(e) {
				V(K, e);
			},
			$$events: {
				lcpHovered,
				aggregateSummary: updateAggregateSummary,
				installManyLcps: (e) => importManyLcps(e.detail),
				clearCompendiums
			},
			$$legacy: !0
		});
		var i = c(r, 2), a = D(i);
		LCPSelector(a, {
			get disabled() {
				return T(s);
			},
			set disabled(e) {
				V(s, e);
			},
			get deselect() {
				return T(X);
			},
			set deselect(e) {
				V(X, e);
			},
			$$events: { lcpLoaded },
			$$legacy: !0
		}), LCPDetails(c(a, 2), {
			get contentSummary() {
				return T(d);
			},
			get showImportButton() {
				return T(f);
			},
			get disabled() {
				return T(s);
			},
			set disabled(e) {
				V(s, e);
			},
			$$events: { importLcp: () => importManyLcps() },
			$$legacy: !0
		}), N(i), N(n);
		var o = c(n, 2), h = D(o), _ = D(h), consequent_1 = (e) => {
			var t = Ee(), n = x(t), r = D(n);
			N(n);
			var i = c(n, 2);
			let a;
			E(() => {
				p(r, `${(T(P), m(() => `${T(P)?.manifest.name} v${T(P)?.manifest.version}`)) ?? ""}
            ${T(R) ?? ""}%`), a = G(i, "", a, { width: `${T(R)}%` });
			}), u(7, n, () => Y), u(7, i, () => Y), g(e, t);
		};
		l(_, (e) => {
			(T(F) || T(I)) && e(consequent_1);
		});
		var v = c(_, 2), consequent_2 = (e) => {
			var t = De();
			let n;
			E(() => n = G(t, "", n, { width: `${T(W)}%` })), u(7, t, () => Y), g(e, t);
		};
		l(v, (e) => {
			T(I) && e(consequent_2);
		}), N(h), N(o), g(e, t);
	};
	return l($, (e) => {
		b() ? e(consequent) : e(alternate, -1);
	}), N(Q), g(i, Q), A(Z);
}
//#endregion
export { LCPManager as default };

//# sourceMappingURL=LCPManager-mUuDIV7W.mjs.map