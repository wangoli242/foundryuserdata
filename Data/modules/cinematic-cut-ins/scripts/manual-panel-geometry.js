import {
  sanitizeManualCutLineColor,
  sanitizeManualCutLineWidth,
  sanitizeManualLineColor,
  sanitizeManualLineGlow,
  sanitizeManualLineStyle,
} from "./manual-panel-line-styles.js";

/*
 * Manual panel geometry helpers for the All-Out Attack panel editor.
 *
 * Manual panel layout shape:
 *   {
 *     version: 1,
 *     basis: { width: 1920, height: 1080 },
 *     panels: [ { points: [[x, y], [x, y], ...] }, ... ],
 *     cuts: [ { points: [[x, y], [x, y]], style: "neon-glitch", width: 3.5, color: "#ff2d49", glow: true }, ... ]
 *   }
 *
 * Points are normalized to a 0..100 range on both axes (independent of basis aspect)
 * so that the same panel definition maps cleanly to CSS `polygon(% %)` clip-paths and
 * to the editor SVG viewBox 0..100.
 */

const POINT_EPSILON = 1e-4;
const AREA_EPSILON = 0.5;
const COLLINEAR_EPSILON = 1e-3;

export const MANUAL_PANEL_VERSION = 1;
export const MANUAL_PANEL_BASIS = Object.freeze({ width: 1920, height: 1080 });
export const MAX_MANUAL_PANELS = 32;
export const MAX_MANUAL_POINTS_PER_PANEL = 64;
export const MAX_MANUAL_CUTS = MAX_MANUAL_PANELS - 1;

export function createFullScreenPanels() {
  return {
    version: MANUAL_PANEL_VERSION,
    basis: {
      width: MANUAL_PANEL_BASIS.width,
      height: MANUAL_PANEL_BASIS.height,
    },
    panels: [
      {
        points: [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
      },
    ],
    cuts: [],
  };
}

export function clonePanels(data) {
  if (!data || typeof data !== "object") return null;
  const basis = data.basis;
  const sourcePanels =
    Array.isArray(data.panels) && data.panels.length <= MAX_MANUAL_PANELS
      ? data.panels
      : [];
  const sourceCuts =
    Array.isArray(data.cuts) && data.cuts.length <= MAX_MANUAL_CUTS
      ? data.cuts
      : [];
  return {
    version: data.version,
    basis:
      basis && typeof basis === "object"
        ? { width: Number(basis.width), height: Number(basis.height) }
        : null,
    panels: sourcePanels.map((panel) => ({
      points:
        Array.isArray(panel?.points) &&
        panel.points.length <= MAX_MANUAL_POINTS_PER_PANEL
          ? panel.points.map((p) => [Number(p?.[0]), Number(p?.[1])])
          : [],
    })),
    cuts: sourceCuts.map((cut) => {
      const clonedCut = {
        points:
          Array.isArray(cut?.points) && cut.points.length === 2
            ? cut.points.map((p) => [Number(p?.[0]), Number(p?.[1])])
            : [],
        style: sanitizeManualLineStyle(cut?.style),
      };
      const width = sanitizeManualCutLineWidth(cut?.width);
      if (width !== null) clonedCut.width = width;
      const color = sanitizeManualCutLineColor(cut?.color);
      if (color !== null) clonedCut.color = color;
      const glow = sanitizeManualLineGlow(cut?.glow);
      if (glow) {
        clonedCut.glow = true;
        clonedCut.glowColor = sanitizeManualLineColor(
          cut?.glowColor,
          color || undefined,
        );
      }
      return clonedCut;
    }),
  };
}

export function isValidPanels(data, expectedCount) {
  if (!data || typeof data !== "object") return false;
  if (data.version !== MANUAL_PANEL_VERSION) return false;

  const basis = data.basis;
  if (!basis || typeof basis !== "object") return false;
  if (!Number.isFinite(basis.width) || basis.width <= 0) return false;
  if (!Number.isFinite(basis.height) || basis.height <= 0) return false;

  if (!Array.isArray(data.panels) || data.panels.length === 0) return false;
  if (data.panels.length > MAX_MANUAL_PANELS) return false;
  if (Number.isFinite(expectedCount) && expectedCount > MAX_MANUAL_PANELS)
    return false;
  if (
    Number.isFinite(expectedCount) &&
    expectedCount > 0 &&
    data.panels.length !== expectedCount
  )
    return false;

  for (const panel of data.panels) {
    if (!panel || !Array.isArray(panel.points) || panel.points.length < 3)
      return false;
    if (panel.points.length > MAX_MANUAL_POINTS_PER_PANEL) return false;
    for (const point of panel.points) {
      if (!Array.isArray(point) || point.length !== 2) return false;
      const [x, y] = point;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      if (x < -POINT_EPSILON || x > 100 + POINT_EPSILON) return false;
      if (y < -POINT_EPSILON || y > 100 + POINT_EPSILON) return false;
    }
    if (polygonArea(panel.points) < AREA_EPSILON) return false;
  }

  if (data.cuts !== undefined) {
    if (!Array.isArray(data.cuts) || data.cuts.length > MAX_MANUAL_CUTS)
      return false;
    for (const cut of data.cuts) {
      if (!cut || !Array.isArray(cut.points) || cut.points.length !== 2)
        return false;
      if (sanitizeManualLineStyle(cut.style) !== cut.style) return false;
      if (
        cut.width !== undefined &&
        sanitizeManualCutLineWidth(cut.width) !== cut.width
      )
        return false;
      if (
        cut.color !== undefined &&
        sanitizeManualCutLineColor(cut.color) !== cut.color
      )
        return false;
      if (cut.glow !== undefined && cut.glow !== true) return false;
      if (
        cut.glowColor !== undefined &&
        sanitizeManualLineColor(cut.glowColor) !== cut.glowColor
      )
        return false;
      const [start, end] = cut.points;
      for (const point of [start, end]) {
        if (!Array.isArray(point) || point.length !== 2) return false;
        const [x, y] = point;
        if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
        if (x < -POINT_EPSILON || x > 100 + POINT_EPSILON) return false;
        if (y < -POINT_EPSILON || y > 100 + POINT_EPSILON) return false;
      }
      if (Math.hypot(end[0] - start[0], end[1] - start[1]) < COLLINEAR_EPSILON)
        return false;
    }
  }
  return true;
}

function edgePointKey(point) {
  return `${Number(point[0]).toFixed(4)},${Number(point[1]).toFixed(4)}`;
}

function edgeKey(start, end) {
  return `${edgePointKey(start)}|${edgePointKey(end)}`;
}

export function sharedEdgesBetweenPanels(left, right) {
  if (!left?.points || !right?.points) return [];
  const rightEdges = new Map();
  const collect = (points, callback) => {
    for (let i = 0; i < points.length; i++) {
      const start = points[i];
      const end = points[(i + 1) % points.length];
      callback(start, end);
    }
  };

  collect(right.points, (start, end) => {
    rightEdges.set(edgeKey(start, end), { start, end });
  });

  const shared = [];
  collect(left.points, (start, end) => {
    const reverse = rightEdges.get(edgeKey(end, start));
    if (reverse)
      shared.push({
        points: [
          [start[0], start[1]],
          [end[0], end[1]],
        ],
      });
  });
  return shared;
}

export function sanitizeManualPanels(data, expectedCount) {
  const cloned = clonePanels(data);
  if (!cloned) return null;
  if (!isValidPanels(cloned, expectedCount)) return null;
  return cloned;
}

export function polygonArea(ring) {
  if (!Array.isArray(ring) || ring.length < 3) return 0;
  let acc = 0;
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % n];
    acc += x1 * y2 - x2 * y1;
  }
  return Math.abs(acc) / 2;
}

export function polygonCentroid(ring) {
  if (!Array.isArray(ring) || ring.length === 0) return [50, 50];
  if (ring.length < 3) {
    const sum = ring.reduce((acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }), {
      x: 0,
      y: 0,
    });
    return [sum.x / ring.length, sum.y / ring.length];
  }
  let cx = 0;
  let cy = 0;
  let signed = 0;
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % n];
    const cross = x1 * y2 - x2 * y1;
    signed += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  signed /= 2;
  if (Math.abs(signed) < 1e-9) {
    const sum = ring.reduce((acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }), {
      x: 0,
      y: 0,
    });
    return [sum.x / n, sum.y / n];
  }
  cx /= 6 * signed;
  cy /= 6 * signed;
  return [cx, cy];
}

export function polygonBounds(ring) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  if (!Number.isFinite(minX)) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  return { minX, minY, maxX, maxY };
}

function lineSide(point, lineA, lineB) {
  const dx = lineB[0] - lineA[0];
  const dy = lineB[1] - lineA[1];
  return dx * (point[1] - lineA[1]) - dy * (point[0] - lineA[0]);
}

function intersectInfiniteLine(segA, segB, lineA, lineB) {
  const x1 = lineA[0];
  const y1 = lineA[1];
  const x2 = lineB[0];
  const y2 = lineB[1];
  const x3 = segA[0];
  const y3 = segA[1];
  const x4 = segB[0];
  const y4 = segB[1];

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) < 1e-12) return null;

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
}

function sanitizeRing(ring) {
  if (!Array.isArray(ring) || ring.length < 3) return [];
  const cleaned = [];
  for (const point of ring) {
    if (!Array.isArray(point) || point.length !== 2) continue;
    const x = Math.max(0, Math.min(100, Number(point[0])));
    const y = Math.max(0, Math.min(100, Number(point[1])));
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    const last = cleaned[cleaned.length - 1];
    if (
      last &&
      Math.abs(last[0] - x) < POINT_EPSILON &&
      Math.abs(last[1] - y) < POINT_EPSILON
    )
      continue;
    cleaned.push([x, y]);
  }
  if (cleaned.length >= 2) {
    const first = cleaned[0];
    const last = cleaned[cleaned.length - 1];
    if (
      Math.abs(first[0] - last[0]) < POINT_EPSILON &&
      Math.abs(first[1] - last[1]) < POINT_EPSILON
    ) {
      cleaned.pop();
    }
  }
  if (cleaned.length < 3) return cleaned;

  const compact = [];
  const n = cleaned.length;
  for (let i = 0; i < n; i++) {
    const prev = cleaned[(i - 1 + n) % n];
    const curr = cleaned[i];
    const next = cleaned[(i + 1) % n];
    const cross =
      (curr[0] - prev[0]) * (next[1] - prev[1]) -
      (curr[1] - prev[1]) * (next[0] - prev[0]);
    if (Math.abs(cross) < COLLINEAR_EPSILON) continue;
    compact.push(curr);
  }
  return compact.length >= 3 ? compact : cleaned;
}

/**
 * Split a polygon by the infinite line passing through lineA and lineB.
 *
 * Returns { left, right } where each piece is `{ points: [[x,y], ...] }`.
 * Returns null if the line does not strictly cross the polygon or either
 * resulting piece has degenerate area.
 */
export function splitPolygonByLine(polygon, lineA, lineB) {
  if (!polygon || !Array.isArray(polygon.points) || polygon.points.length < 3)
    return null;
  if (!Array.isArray(lineA) || !Array.isArray(lineB)) return null;
  const dx = lineB[0] - lineA[0];
  const dy = lineB[1] - lineA[1];
  if (dx * dx + dy * dy < 1e-6) return null;

  const points = polygon.points;
  const n = points.length;
  const leftRing = [];
  const rightRing = [];

  let hasStrictLeft = false;
  let hasStrictRight = false;

  for (let i = 0; i < n; i++) {
    const curr = points[i];
    const next = points[(i + 1) % n];
    const sCurr = lineSide(curr, lineA, lineB);
    const sNext = lineSide(next, lineA, lineB);

    if (sCurr >= -COLLINEAR_EPSILON) rightRing.push(curr);
    if (sCurr <= COLLINEAR_EPSILON) leftRing.push(curr);
    if (sCurr > COLLINEAR_EPSILON) hasStrictRight = true;
    if (sCurr < -COLLINEAR_EPSILON) hasStrictLeft = true;

    const strictA = sCurr > COLLINEAR_EPSILON;
    const strictB = sCurr < -COLLINEAR_EPSILON;
    const strictNextA = sNext > COLLINEAR_EPSILON;
    const strictNextB = sNext < -COLLINEAR_EPSILON;
    if ((strictA && strictNextB) || (strictB && strictNextA)) {
      const ip = intersectInfiniteLine(curr, next, lineA, lineB);
      if (ip) {
        rightRing.push(ip);
        leftRing.push(ip);
      }
    }
  }

  if (!hasStrictLeft || !hasStrictRight) return null;

  const leftClean = sanitizeRing(leftRing);
  const rightClean = sanitizeRing(rightRing);
  if (leftClean.length < 3 || rightClean.length < 3) return null;

  if (polygonArea(leftClean) < AREA_EPSILON) return null;
  if (polygonArea(rightClean) < AREA_EPSILON) return null;

  return {
    left: { points: leftClean },
    right: { points: rightClean },
  };
}

export function pointInPolygon(point, ring) {
  if (!Array.isArray(point) || !Array.isArray(ring) || ring.length < 3)
    return false;
  const [x, y] = point;
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-12) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function polygonToClipPath(ring) {
  if (!Array.isArray(ring) || ring.length < 3) return null;
  const parts = ring.map(
    ([x, y]) => `${formatPercent(x)}% ${formatPercent(y)}%`,
  );
  return `polygon(${parts.join(", ")})`;
}

function formatPercent(value) {
  const clamped = Math.max(0, Math.min(100, Number(value)));
  return (Math.round(clamped * 1000) / 1000).toString();
}
