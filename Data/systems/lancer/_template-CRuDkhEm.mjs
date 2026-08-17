import "./chunk-DAAM-nuR.mjs";
import { ui as e } from "./lancer-actor-DUbnXjU1.mjs";
//#region src/module/canvas/weapon-range-template.ts
var WeaponRangeTemplate = class extends foundry.canvas.placeables.MeasuredTemplate {
	get range() {
		return this.document.getFlag(game.system.id, "range");
	}
	get isBurst() {
		return this.range.type === e.Burst;
	}
	static fromRange({ type: t, val: n }, r) {
		if (!canvas.ready) return null;
		let i = n;
		if (isNaN(i)) return null;
		let a = canvas.grid?.isSquare, o = canvas.scene?.dimensions?.distance ?? 1, s;
		switch (t) {
			case e.Cone:
				s = "cone";
				break;
			case e.Line:
				s = "ray";
				break;
			case e.Burst:
			case e.Blast:
				s = "circle";
				break;
			default: return null;
		}
		let c = {
			t: s,
			user: game.user.id,
			distance: i * o,
			width: o,
			direction: 0,
			x: 0,
			y: 0,
			angle: a ? 51 : 59,
			fillColor: game.user.color,
			flags: { [game.system.id]: {
				range: {
					type: t,
					val: n
				},
				creator: r?.id,
				ignore: {
					tokens: [e.Blast, e.Burst].includes(t) || !r ? [] : [r.id],
					dispositions: []
				}
			} }
		}, l = new (getDocumentClass("MeasuredTemplate"))(c, { parent: canvas.scene ?? void 0 }), u = new this(l);
		return u.actorSheet = r?.actor?.sheet ?? void 0, u;
	}
	drawPreview() {
		console.warn("WeaponRangeTemplate.drawPreview() is deprecated and has been replaced by placeTemplate()"), this.placeTemplate().catch(() => {});
	}
	placeTemplate() {
		if (!canvas.ready) throw ui.notifications?.error("Cannot create WeaponRangeTemplate. Canvas is not ready"), Error("Cannot create WeaponRangeTemplate. Canvas is not ready");
		this.actorSheet?.minimize();
		let e = canvas.activeLayer;
		return this.draw(), this.layer.activate(), this.layer.preview?.addChild(this), this.activatePreviewListeners(e);
	}
	activatePreviewListeners(e) {
		return new Promise((t, n) => {
			let r = {}, i = 0;
			r.mm = (e) => {
				e.stopPropagation();
				let t = Date.now();
				if (t - i <= 20) return;
				let n = e.getLocalPosition(this.layer), r = this.snapToCenter(n);
				this.isBurst && (r = this.snapToToken(n)), this.document.updateSource({
					x: r.x,
					y: r.y
				}), this.refresh(), i = t;
			}, r.rc = (t, i = !0) => {
				this.actorSheet?.maximize(), this.layer.preview?.removeChildren().forEach((e) => e.destroy()), canvas.stage?.off("mousemove", r.mm), canvas.stage?.off("mousedown", r.lc), canvas.app.view.oncontextmenu = null, canvas.app.view.onwheel = null, e?.activate(), i && n(/* @__PURE__ */ Error("Template creation cancelled"));
			}, r.lc = async (e) => {
				r.rc(e, !1);
				let i = this.snapToCenter(e.getLocalPosition(this.layer));
				if (this.isBurst) {
					i = this.snapToToken(e.getLocalPosition(this.layer));
					let t = this.document.flags[game.system.id]?.burstToken;
					if (t) {
						let e = this.document.flags[game.system.id].ignore.tokens;
						e.push(t), this.document.updateSource({ [`flags.${game.system.id}.ignore.tokens`]: e });
					}
				}
				this.document.updateSource(i);
				let a = (await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [this.document.toObject()]))?.shift();
				if (a === void 0) {
					n(/* @__PURE__ */ Error("Template creation failed"));
					return;
				}
				let o = 0, s = setInterval(() => {
					++o, a.object?.shape ? (clearInterval(s), t(a)) : o >= 100 && (clearInterval(s), n(/* @__PURE__ */ Error(`Failed to draw template after ${o * 5}ms`)));
				}, 5);
			}, r.mw = (e) => {
				e.ctrlKey && e.preventDefault(), e.stopPropagation();
				let t = canvas.grid.type > CONST.GRID_TYPES.SQUARE ? 30 : 15, n = e.shiftKey ? t : 5;
				this.document.updateSource({ direction: this.document.direction + n * Math.sign(e.deltaY) }), this.refresh();
			}, canvas.stage.on("mousemove", r.mm), canvas.stage.on("mousedown", r.lc), canvas.app.view.oncontextmenu = r.rc, canvas.app.view.onwheel = r.mw;
		});
	}
	snapToCenter({ x: e, y: t }) {
		let n = canvas.grid.getCenterPoint({
			x: e,
			y: t
		});
		return {
			x: Math.round(n.x),
			y: Math.round(n.y)
		};
	}
	snapToToken({ x: e, y: t }) {
		let n = canvas.tokens.placeables.filter((n) => n.x < e && n.x + n.w > e && n.y < t && n.y + n.h > t).reduce((n, r) => r.visible && (n == null || canvas.grid.measurePath([{
			x: e,
			y: t
		}, r.center]) < canvas.grid.measurePath([{
			x: e,
			y: t
		}, n.center])) ? r : n, null);
		return n ? (this.document.updateSource({
			distance: this.getBurstDistance(n.document.width),
			[`flags.${game.system.id}.burstToken`]: n.id
		}), {
			x: Math.round(n.center.x),
			y: Math.round(n.center.y)
		}) : (this.document.updateSource({ distance: this.getBurstDistance(1) }), this.snapToCenter({
			x: e,
			y: t
		}));
	}
	getBurstDistance(e) {
		return this.range.val + e / 2;
	}
};
//#endregion
//#region src/module/flows/_template.ts
foundry.grid.BaseGrid;
function targetsFromTemplate(e) {
	let t = canvas.scene?.getEmbeddedDocument("MeasuredTemplate", e, {}), n = canvas?.grid;
	if (t === void 0 || canvas === void 0 || n === void 0 || canvas.ready !== !0) return;
	let test_token;
	if (canvas.grid?.type === CONST.GRID_TYPES.GRIDLESS) test_token = (e) => {
		let n = e.document.width / 2, r = canvas.grid.measurePath([e.center, t]).distance;
		if (t.t === "circle") return r <= n + t.distance;
		if (t.t === "cone") {
			let i = t.object.ray.distance, a = Ray.fromAngle(t.object.ray.A.x, t.object.ray.A.y, Math.toRadians(t.direction + t.angle / 2), i), o = Ray.fromAngle(t.object.ray.A.x, t.object.ray.A.y, Math.toRadians(t.direction - t.angle / 2), i);
			return r <= t.distance + n && (in_cone_arc(t.object.ray, Math.toRadians(t.angle), e.center) || min_dist(a, e.center) < n * canvas.dimensions.size || min_dist(o, e.center) < n * canvas.dimensions.size);
		}
		if (t.t === "ray") {
			let i = Ray.fromAngle(t.object.ray.A.x, t.object.ray.A.y, t.object.ray.angle - Math.PI / 2, t.width * canvas.dimensions.size), a = Ray.fromAngle(i.B.x, i.B.y, t.object.ray.angle, t.object.ray.distance), o = Ray.fromAngle(t.object.ray.A.x, t.object.ray.A.y, t.object.ray.angle + Math.PI / 2, t.width * canvas.dimensions.size), s = Ray.fromAngle(o.B.x, o.B.y, t.object.ray.angle, t.object.ray.distance);
			return r <= t.distance + n && (min_dist(a, e.center) < n * canvas.dimensions.size || min_dist(s, e.center) < n * canvas.dimensions.size || min_dist(t.object.ray, e.center) < n * canvas.dimensions.size);
		}
		if (t.t === "rect") {
			if (t.object._getGridHighlightShape().contains(e.center.x, e.center.y)) return !0;
			let r = Ray.fromAngle(t.object.ray.A.x, t.object.ray.A.y, 0, t.object.ray.dx), i = new Ray(r.B, t.object.ray.B), a = Ray.fromAngle(i.B.x, i.B.y, Math.PI, t.object.ray.dx), o = new Ray(a.B, r.A);
			return min_dist(r, e.center) < n * canvas.dimensions.size || min_dist(i, e.center) < n * canvas.dimensions.size || min_dist(a, e.center) < n * canvas.dimensions.size || min_dist(o, e.center) < n * canvas.dimensions.size;
		}
		return !1;
	};
	else {
		let { sizeX: e, sizeY: n } = canvas.grid, r = t.object._getGridHighlightPositions().map(({ x: t, y: r }) => canvas.grid.getOffset({
			x: t + e / 2,
			y: r + n / 2
		}));
		test_token = (e) => e.document.getOccupiedGridSpaceOffsets().some((e) => r.some((t) => e.i === t.i && e.j === t.j));
	}
	let r = canvas.templates.get(e).document.getFlag(game.system.id, "ignore"), i = canvas.tokens.quadtree.getObjects(t.object.bounds, { collisionTest: (e) => {
		let t = e.t;
		return !((r?.tokens.includes(t.id) || r?.dispositions.includes(t.document.disposition)) ?? !1) && t.isVisible && test_token(t);
	} }).map((e) => e.id);
	canvas.tokens.setTargets(i);
}
function dot_product(e, t) {
	return e.dx * t.dx + e.dy * t.dy;
}
function comp(e, t) {
	return dot_product(e, t) / e.distance;
}
function min_dist(e, t) {
	let n = new Ray(e.A, t), r = comp(e, n);
	return r <= 0 ? n.distance : r >= e.distance ? new Ray(e.B, t).distance : Math.sqrt(n.distance ** 2 - r ** 2);
}
function in_cone_arc(e, t, n) {
	let r = Ray.fromAngle(e.A.x, e.A.y, e.angle, 1), i = Ray.towardsPoint(e.A, n, 1);
	return Math.acos(Math.clamp(-1, dot_product(r, i), 1)) < t / 2;
}
//#endregion
export { WeaponRangeTemplate as n, targetsFromTemplate as t };

//# sourceMappingURL=_template-CRuDkhEm.mjs.map