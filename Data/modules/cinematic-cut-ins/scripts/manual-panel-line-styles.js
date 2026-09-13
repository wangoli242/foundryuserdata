export const DEFAULT_MANUAL_LINE_STYLE = "none";
export const DEFAULT_MANUAL_LINE_WIDTH = 3.5;
export const DEFAULT_MANUAL_LINE_COLOR = "#000000";
export const MIN_MANUAL_LINE_WIDTH = 2;
export const MAX_MANUAL_LINE_WIDTH = 18;

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

export const MANUAL_PANEL_LINE_STYLES = Object.freeze([
  {
    id: "none",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.None",
    asset: "",
    width: 0,
  },
  {
    id: "neon-glitch",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.NeonGlitch",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/neon-glitch.svg",
    width: 3.5,
  },
  {
    id: "prismatic-rift",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.PrismaticRift",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/prismatic-rift.svg",
    width: 4.5,
  },
  {
    id: "black-brush",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrush",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/black-brush.png",
    width: 3.5,
  },
  {
    id: "black-brush-clean",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrushClean",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/black-brush.png",
    width: 3.5,
    slice: {
      sourceWidth: 1614,
      sourceHeight: 704,
      leftRatio: 0.36,
      rightRatio: 0.36,
    },
  },
  {
    id: "black-brush-soft",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrushSoft",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/black-brush-soft.png",
    width: 3.5,
  },
  {
    id: "black-brush-soft-clean",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrushSoftClean",
    asset: "modules/cinematic-cut-ins/assets/manual-lines/black-brush-soft.png",
    width: 3.5,
    slice: {
      sourceWidth: 2739,
      sourceHeight: 1213,
      leftRatio: 0.36,
      rightRatio: 0.36,
    },
  },
  {
    id: "black-brush-rough",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrushRough",
    asset:
      "modules/cinematic-cut-ins/assets/manual-lines/black-brush-rough.png",
    width: 3.5,
  },
  {
    id: "black-brush-rough-clean",
    labelKey: "CINEMATIC.AllOut.PanelMode.LineStyle.BlackBrushRoughClean",
    asset:
      "modules/cinematic-cut-ins/assets/manual-lines/black-brush-rough.png",
    width: 3.5,
    slice: {
      sourceWidth: 4406,
      sourceHeight: 2217,
      leftRatio: 0.38,
      rightRatio: 0.38,
    },
  },
]);

const LINE_STYLE_BY_ID = new Map(
  MANUAL_PANEL_LINE_STYLES.map((style) => [style.id, style]),
);

function roundLineWidth(value) {
  return Math.round(value * 10) / 10;
}

export function getManualLineStyle(id) {
  return (
    LINE_STYLE_BY_ID.get(id) || LINE_STYLE_BY_ID.get(DEFAULT_MANUAL_LINE_STYLE)
  );
}

export function sanitizeManualLineStyle(id) {
  if (typeof id !== "string") return DEFAULT_MANUAL_LINE_STYLE;
  return LINE_STYLE_BY_ID.has(id) ? id : DEFAULT_MANUAL_LINE_STYLE;
}

export function sanitizeManualLineWidth(
  value,
  fallback = DEFAULT_MANUAL_LINE_WIDTH,
) {
  const parsed = Number(value);
  const fallbackNumber = Number(fallback);
  const candidate = Number.isFinite(parsed) ? parsed : fallbackNumber;
  const safe = Number.isFinite(candidate)
    ? candidate
    : DEFAULT_MANUAL_LINE_WIDTH;
  return roundLineWidth(
    Math.max(MIN_MANUAL_LINE_WIDTH, Math.min(MAX_MANUAL_LINE_WIDTH, safe)),
  );
}

export function sanitizeManualCutLineWidth(value) {
  if (value === undefined || value === null || value === "") return null;
  return sanitizeManualLineWidth(value);
}

export function sanitizeManualLineColor(
  value,
  fallback = DEFAULT_MANUAL_LINE_COLOR,
) {
  const normalized =
    typeof value === "string" ? value.trim().toLowerCase() : "";
  if (HEX_COLOR_PATTERN.test(normalized)) return normalized;

  const normalizedFallback =
    typeof fallback === "string" ? fallback.trim().toLowerCase() : "";
  return HEX_COLOR_PATTERN.test(normalizedFallback)
    ? normalizedFallback
    : DEFAULT_MANUAL_LINE_COLOR;
}

export function sanitizeManualCutLineColor(value) {
  if (value === undefined || value === null || value === "") return null;
  return sanitizeManualLineColor(value);
}

export function sanitizeManualLineGlow(value) {
  return value === true || value === "true" || value === "on" || value === "1";
}

export function getManualLineStyleDefaultWidth(id) {
  const style = getManualLineStyle(id);
  if (!style || style.id === DEFAULT_MANUAL_LINE_STYLE || !style.width)
    return DEFAULT_MANUAL_LINE_WIDTH;
  return sanitizeManualLineWidth(style.width);
}

export function getManualLineStyleOptions(selectedId) {
  const selected = sanitizeManualLineStyle(selectedId);
  return MANUAL_PANEL_LINE_STYLES.map((style) => ({
    ...style,
    selected: style.id === selected,
  }));
}
