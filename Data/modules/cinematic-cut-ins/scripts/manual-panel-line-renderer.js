import {
  DEFAULT_MANUAL_LINE_COLOR,
  DEFAULT_MANUAL_LINE_STYLE,
  getManualLineStyle,
  sanitizeManualCutLineColor,
  sanitizeManualLineColor,
  sanitizeManualLineGlow,
  sanitizeManualLineWidth,
} from "./manual-panel-line-styles.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const MIN_CUT_LENGTH = 0.05;
const MANUAL_CUT_LINE_ASPECT = 16 / 9;
let manualCutLinePaintId = 0;

export const MANUAL_CUT_LINE_VIEWBOX_WIDTH = 100 * MANUAL_CUT_LINE_ASPECT;
export const MANUAL_CUT_LINE_VIEWBOX_HEIGHT = 100;
export const MANUAL_CUT_LINE_VIEWBOX = `0 0 ${MANUAL_CUT_LINE_VIEWBOX_WIDTH} ${MANUAL_CUT_LINE_VIEWBOX_HEIGHT}`;

function readCutPoints(cut) {
  if (!cut || !Array.isArray(cut.points) || cut.points.length !== 2)
    return null;
  const [start, end] = cut.points;
  if (!Array.isArray(start) || !Array.isArray(end)) return null;
  const rawX1 = Number(start[0]);
  const y1 = Number(start[1]);
  const rawX2 = Number(end[0]);
  const y2 = Number(end[1]);
  if (![rawX1, y1, rawX2, y2].every(Number.isFinite)) return null;

  const x1 = rawX1 * MANUAL_CUT_LINE_ASPECT;
  const x2 = rawX2 * MANUAL_CUT_LINE_ASPECT;

  const length = Math.hypot(x2 - x1, y2 - y1);
  if (length < MIN_CUT_LENGTH) return null;

  return {
    x1,
    y1,
    length,
    angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  };
}

function setImageHref(image, href) {
  image.setAttribute("href", href);
  image.setAttributeNS(XLINK_NS, "href", href);
}

function nextPaintId(prefix) {
  manualCutLinePaintId += 1;
  return `cinematic-manual-line-${prefix}-${manualCutLinePaintId}`;
}

function readCutPaint(cut) {
  const color = sanitizeManualCutLineColor(cut?.color);
  const glow = sanitizeManualLineGlow(cut?.glow);
  const glowColor = glow
    ? sanitizeManualLineColor(
        cut?.glowColor,
        color || DEFAULT_MANUAL_LINE_COLOR,
      )
    : null;
  return { color, glow, glowColor };
}

function appendDefs(parent) {
  const defs = document.createElementNS(SVG_NS, "defs");
  parent.appendChild(defs);
  return defs;
}

function applyGlow(group, paint, width) {
  if (!paint.glow) return;
  const defs = appendDefs(group);
  const filterId = nextPaintId("glow");
  const filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", filterId);
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-400%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "900%");

  const shadow = document.createElementNS(SVG_NS, "feDropShadow");
  shadow.setAttribute("dx", "0");
  shadow.setAttribute("dy", "0");
  shadow.setAttribute("stdDeviation", String(Math.max(0.8, width * 0.45)));
  shadow.setAttribute("flood-color", paint.glowColor);
  shadow.setAttribute("flood-opacity", "0.85");
  filter.appendChild(shadow);
  defs.appendChild(filter);
  group.setAttribute("filter", `url(#${filterId})`);
}

function appendTintedRect(parent, style, imageClass, bounds, paint) {
  const defs = appendDefs(parent);
  const maskId = nextPaintId("mask");
  const mask = document.createElementNS(SVG_NS, "mask");
  mask.setAttribute("id", maskId);
  mask.setAttribute("maskUnits", "userSpaceOnUse");
  mask.setAttribute("x", String(bounds.x));
  mask.setAttribute("y", String(bounds.y));
  mask.setAttribute("width", String(bounds.width));
  mask.setAttribute("height", String(bounds.height));
  mask.setAttribute("mask-type", "alpha");
  mask.setAttribute("style", "mask-type: alpha;");

  const source = document.createElementNS(SVG_NS, "image");
  source.setAttribute("x", String(bounds.imageX ?? bounds.x));
  source.setAttribute("y", String(bounds.imageY ?? bounds.y));
  source.setAttribute("width", String(bounds.imageWidth ?? bounds.width));
  source.setAttribute("height", String(bounds.imageHeight ?? bounds.height));
  source.setAttribute("preserveAspectRatio", "none");
  setImageHref(source, style.asset);
  mask.appendChild(source);
  defs.appendChild(mask);

  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("class", `${imageClass} tinted`);
  rect.setAttribute("x", String(bounds.x));
  rect.setAttribute("y", String(bounds.y));
  rect.setAttribute("width", String(bounds.width));
  rect.setAttribute("height", String(bounds.height));
  rect.setAttribute("fill", paint.color);
  rect.setAttribute("mask", `url(#${maskId})`);
  parent.appendChild(rect);
}

function appendStretchImage(group, style, geometry, width, imageClass, paint) {
  const bounds = { x: 0, y: -width / 2, width: geometry.length, height: width };
  if (paint.color) {
    appendTintedRect(group, style, imageClass, bounds, paint);
    return;
  }

  const image = document.createElementNS(SVG_NS, "image");
  image.setAttribute("class", imageClass);
  setImageHref(image, style.asset);
  image.setAttribute("x", String(bounds.x));
  image.setAttribute("y", String(bounds.y));
  image.setAttribute("width", String(bounds.width));
  image.setAttribute("height", String(bounds.height));
  image.setAttribute("preserveAspectRatio", "none");
  group.appendChild(image);
}

function appendSliceImage(
  group,
  style,
  className,
  imageClass,
  display,
  source,
  paint,
) {
  const slice = document.createElementNS(SVG_NS, "svg");
  slice.setAttribute("class", className);
  slice.setAttribute("x", String(display.x));
  slice.setAttribute("y", String(display.y));
  slice.setAttribute("width", String(display.width));
  slice.setAttribute("height", String(display.height));
  slice.setAttribute(
    "viewBox",
    `${source.x} 0 ${source.width} ${style.slice.sourceHeight}`,
  );
  slice.setAttribute("preserveAspectRatio", "none");

  if (paint.color) {
    appendTintedRect(
      slice,
      style,
      imageClass,
      {
        x: source.x,
        y: 0,
        width: source.width,
        height: style.slice.sourceHeight,
        imageX: 0,
        imageY: 0,
        imageWidth: style.slice.sourceWidth,
        imageHeight: style.slice.sourceHeight,
      },
      paint,
    );
  } else {
    const image = document.createElementNS(SVG_NS, "image");
    image.setAttribute("class", imageClass);
    setImageHref(image, style.asset);
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", String(style.slice.sourceWidth));
    image.setAttribute("height", String(style.slice.sourceHeight));
    image.setAttribute("preserveAspectRatio", "none");
    slice.appendChild(image);
  }
  group.appendChild(slice);
}

function appendSlicedImage(group, style, geometry, width, imageClass, paint) {
  const { sourceWidth, sourceHeight, leftRatio, rightRatio } = style.slice;
  const leftSourceWidth = sourceWidth * leftRatio;
  const rightSourceWidth = sourceWidth * rightRatio;
  const centerSourceWidth = sourceWidth - leftSourceWidth - rightSourceWidth;
  if (
    sourceWidth <= 0 ||
    sourceHeight <= 0 ||
    leftSourceWidth <= 0 ||
    rightSourceWidth <= 0 ||
    centerSourceWidth <= 0
  ) {
    appendStretchImage(group, style, geometry, width, imageClass, paint);
    return;
  }

  const naturalLeftWidth = width * (leftSourceWidth / sourceHeight);
  const naturalRightWidth = width * (rightSourceWidth / sourceHeight);
  const capScale = Math.min(
    1,
    geometry.length / Math.max(naturalLeftWidth + naturalRightWidth, 0.001),
  );
  const leftWidth = naturalLeftWidth * capScale;
  const rightWidth = naturalRightWidth * capScale;
  const centerWidth = Math.max(0, geometry.length - leftWidth - rightWidth);
  const overlap = Math.min(width * 0.4, centerWidth / 2);
  const y = -width / 2;

  if (centerWidth > 0.001) {
    appendSliceImage(
      group,
      style,
      "manual-panel-cut-line-slice body",
      imageClass,
      {
        x: leftWidth - overlap,
        y,
        width: centerWidth + overlap * 2,
        height: width,
      },
      { x: leftSourceWidth, width: centerSourceWidth },
      paint,
    );
  }
  appendSliceImage(
    group,
    style,
    "manual-panel-cut-line-slice cap start",
    imageClass,
    { x: 0, y, width: leftWidth, height: width },
    { x: 0, width: leftSourceWidth },
    paint,
  );
  appendSliceImage(
    group,
    style,
    "manual-panel-cut-line-slice cap end",
    imageClass,
    { x: geometry.length - rightWidth, y, width: rightWidth, height: width },
    { x: sourceWidth - rightSourceWidth, width: rightSourceWidth },
    paint,
  );
}

export function appendManualCutLine(parent, cut, options = {}) {
  const style = getManualLineStyle(cut?.style);
  if (!style || style.id === DEFAULT_MANUAL_LINE_STYLE || !style.asset)
    return null;
  const width = sanitizeManualLineWidth(cut?.width, style.width);

  const geometry = readCutPoints(cut);
  if (!geometry) return null;

  const group = document.createElementNS(SVG_NS, "g");
  group.setAttribute(
    "class",
    options.groupClass || "manual-panel-cut-line-segment",
  );
  group.setAttribute("data-line-style", style.id);
  group.setAttribute(
    "transform",
    `translate(${geometry.x1} ${geometry.y1}) rotate(${geometry.angle})`,
  );

  const imageClass = options.imageClass || "manual-panel-cut-line-image";
  const paint = readCutPaint(cut);
  applyGlow(group, paint, width);
  if (paint.color) group.setAttribute("data-line-color", paint.color);
  if (paint.glow) group.setAttribute("data-line-glow", "true");
  if (style.slice)
    appendSlicedImage(group, style, geometry, width, imageClass, paint);
  else appendStretchImage(group, style, geometry, width, imageClass, paint);

  parent.appendChild(group);
  return group;
}
