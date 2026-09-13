export const CINEMATIC_EFFECT_NONE_OPTION = Object.freeze({
  id: "none",
  label: "CINEMATIC.Config.CinematicEffect.None",
});

export const CINEMATIC_EFFECT_GROUPS = Object.freeze([
  Object.freeze({
    id: "particles",
    label: "CINEMATIC.Config.CinematicEffect.Group.Particles",
    options: Object.freeze([
      Object.freeze({
        id: "debris_burst",
        label: "CINEMATIC.Config.CinematicEffect.DebrisBurst",
      }),
      Object.freeze({
        id: "spark_burst",
        label: "CINEMATIC.Config.CinematicEffect.SparkBurst",
      }),
      Object.freeze({
        id: "ember_storm",
        label: "CINEMATIC.Config.CinematicEffect.EmberStorm",
      }),
      Object.freeze({
        id: "victory_confetti",
        label: "CINEMATIC.Config.CinematicEffect.VictoryConfetti",
      }),
      Object.freeze({
        id: "petal_drift",
        label: "CINEMATIC.Config.CinematicEffect.PetalDrift",
      }),
      Object.freeze({
        id: "sparkle_shimmer",
        label: "CINEMATIC.Config.CinematicEffect.SparkleShimmer",
      }),
      Object.freeze({
        id: "lens_rain",
        label: "CINEMATIC.Config.CinematicEffect.LensRain",
      }),
    ]),
  }),
  Object.freeze({
    id: "cinematic",
    label: "CINEMATIC.Config.CinematicEffect.Group.Cinematic",
    options: Object.freeze([
      Object.freeze({
        id: "shockwave",
        label: "CINEMATIC.Config.CinematicEffect.Shockwave",
      }),
      Object.freeze({
        id: "hero_flare",
        label: "CINEMATIC.Config.CinematicEffect.HeroFlare",
      }),
      Object.freeze({
        id: "film_burn",
        label: "CINEMATIC.Config.CinematicEffect.FilmBurn",
      }),
      Object.freeze({
        id: "blackout_cut",
        label: "CINEMATIC.Config.CinematicEffect.BlackoutCut",
      }),
      Object.freeze({
        id: "speed_lines",
        label: "CINEMATIC.Config.CinematicEffect.SpeedLines",
      }),
      Object.freeze({
        id: "shadow_mist",
        label: "CINEMATIC.Config.CinematicEffect.ShadowMist",
      }),
    ]),
  }),
]);

export const CINEMATIC_EFFECT_STRENGTH_OPTIONS = Object.freeze([
  Object.freeze({
    id: 1,
    label: "CINEMATIC.Config.CinematicEffect.Strength.Low",
  }),
  Object.freeze({
    id: 2,
    label: "CINEMATIC.Config.CinematicEffect.Strength.Medium",
  }),
  Object.freeze({
    id: 3,
    label: "CINEMATIC.Config.CinematicEffect.Strength.High",
  }),
]);

const EFFECT_OPTIONS = CINEMATIC_EFFECT_GROUPS.flatMap(
  (group) => group.options,
);
const EFFECT_IDS = new Set(EFFECT_OPTIONS.map((option) => option.id));
const EFFECT_CLASS_PREFIX = "cinematic-effect--";
const ROOT_ACTIVE_CLASS = "cinematic-has-effect";

const LAYER_DEFINITIONS = Object.freeze({
  back: Object.freeze({ className: "cinematic-effect-layer--back" }),
  front: Object.freeze({ className: "cinematic-effect-layer--front" }),
  overlay: Object.freeze({ className: "cinematic-effect-layer--overlay" }),
});

// Victory Confetti — curated festive palette. Each entry is
// [highlight, main, shade] used for the satin two-tone gradient per piece.
const VICTORY_CONFETTI_PALETTE = Object.freeze([
  ["#fff3c4", "#ffd24a", "#d3941a"], // gold
  [
    "color-mix(in srgb, var(--theme-color, #e61c34) 55%, #ffffff)",
    "var(--theme-color, #e61c34)",
    "color-mix(in srgb, var(--theme-color, #e61c34) 60%, #141624)",
  ], // theme
  ["#ffffff", "#eef1fa", "#aeb6d2"], // white / silver
  ["#fff3c4", "#ffd24a", "#d3941a"], // gold (weighted)
  ["#8d97cc", "#2b3352", "#161b32"], // deep navy
  ["#ffdcc8", "#ff8a5c", "#cf5730"], // coral accent
  ["#ffffff", "#eef1fa", "#aeb6d2"], // white / silver
  [
    "color-mix(in srgb, var(--theme-color, #e61c34) 55%, #ffffff)",
    "var(--theme-color, #e61c34)",
    "color-mix(in srgb, var(--theme-color, #e61c34) 60%, #141624)",
  ], // theme
]);

const VICTORY_CONFETTI_ROLES = Object.freeze([
  "square",
  "circle",
  "square",
  "ribbon",
  "circle",
  "square",
  "glint",
  "square",
  "ribbon",
  "circle",
  "square",
  "glint",
]);

function victoryConfettiVariables(item, { index, between, setVar }) {
  const role = VICTORY_CONFETTI_ROLES[index % VICTORY_CONFETTI_ROLES.length];
  const isBack = index % 3 === 2;
  // Ribbons cycle gold/theme/white/coral only (navy ribbons vanish on dark
  // scenes); other pieces walk the full weighted palette. Ribbons appear at
  // role indices 3 and 8 of each 12-block, so derive the ribbon ordinal.
  const ribbonOrdinal = Math.floor(index / 12) * 2 + (index % 12 === 8 ? 1 : 0);
  const paletteIndex =
    role === "ribbon"
      ? [0, 1, 6, 5][ribbonOrdinal % 4]
      : index % VICTORY_CONFETTI_PALETTE.length;
  const [hi, c1, c2] = VICTORY_CONFETTI_PALETTE[paletteIndex];

  setVar("--fx-hi", hi);
  setVar("--fx-c1", c1);
  setVar("--fx-c2", c2);
  // Streamers falling straight through mid-screen hover over the character
  // and draw the eye — keep them decorating the side lanes instead.
  let x = between(2, 98);
  if (role === "ribbon" && x > 34 && x < 66) {
    x = x < 50 ? between(6, 32) : between(68, 94);
  }
  setVar("--fx-x", `${x.toFixed(2)}%`);
  setVar("--fx-y", `${between(6, 92).toFixed(2)}%`); // reduced-motion static scatter
  setVar("--fx-intro-delay", `${((index % 8) * 0.018).toFixed(3)}s`);

  // Depth logic: back pieces smaller, slower, dimmer; front sharp and bold.
  const depth = isBack ? between(0.5, 0.72) : between(0.92, 1.3);
  let width;
  let height;
  let fallDuration;
  if (role === "ribbon") {
    // Short paper curls — the S-curve mask stroke covers ~half the strip
    // width, and anything longer than ~1:4 reads as a squiggly wire
    // instead of a curled shaving.
    width = between(16, 21) * depth;
    height = between(42, 68) * depth;
    fallDuration = between(4.4, 5.8);
  } else if (role === "glint") {
    width = between(44, 64) * depth;
    height = width;
    fallDuration = between(4.8, 6.4);
  } else {
    width = between(26, 41) * depth;
    height = role === "circle" ? width : width * between(1.05, 1.5);
    fallDuration = between(3.4, 4.8);
  }
  if (isBack) fallDuration *= 1.35;

  setVar("--fx-w", `${width.toFixed(2)}px`);
  setVar("--fx-h", `${height.toFixed(2)}px`);
  setVar("--fx-duration", `${fallDuration.toFixed(2)}s`);
  setVar("--fx-delay", `${(-between(0, fallDuration)).toFixed(2)}s`);
  setVar("--fx-fall", `${between(1360, 1460).toFixed(0)}px`);

  // Serpentine sway while falling + final drift.
  const swayBase = role === "ribbon" ? between(90, 170) : between(50, 130);
  setVar(
    "--fx-sway",
    `${(swayBase * (between(0, 1) < 0.5 ? -1 : 1)).toFixed(2)}px`,
  );
  setVar("--fx-drift", `${between(-90, 90).toFixed(2)}px`);

  // 3D tumble: random near-horizontal axis so pieces foreshorten to slivers.
  setVar("--fx-rz", `${between(-52, 52).toFixed(2)}deg`);
  setVar("--fx-ax", between(0.55, 1).toFixed(3));
  setVar("--fx-ay", between(-0.9, 0.9).toFixed(3));
  const tumble = role === "ribbon" ? between(1.5, 2.3) : between(0.95, 1.85);
  setVar("--fx-tumble", `${tumble.toFixed(2)}s`);
  setVar("--fx-tdelay", `${(-between(0, tumble)).toFixed(2)}s`);
}

const EFFECT_DEFINITIONS = Object.freeze({
  debris_burst: Object.freeze({
    counts: Object.freeze({ 1: 20, 2: 32, 3: 46 }),
    layerForIndex: (index, count) => {
      if (index === 0) return "front";
      const sparks = Math.max(5, Math.round(count / 5));
      if (index >= count - sparks) return "front";
      return index % 4 === 2 ? "back" : "front";
    },
    roleForIndex: (index, count) => {
      if (index === 0) return "flash";
      const sparks = Math.max(5, Math.round(count / 5));
      if (index >= count - sparks) return "spark";
      return ["shard-a", "shard-b", "shard-c"][index % 3];
    },
    vars: (item, { index, count, strength, between, setVar }) => {
      const role = item.dataset.role;
      if (role === "flash") {
        setVar("--fx-size", `${between(250, 290).toFixed(0)}px`);
        return;
      }
      const isSpark = role === "spark";
      const isBack = !isSpark && index % 4 === 2;
      const angle = (index * 137.5 + between(-26, 26)) % 360;
      const radians = (angle * Math.PI) / 180;
      const reach =
        (isSpark ? between(430, 880) : between(330, 720)) *
        (0.72 + strength * 0.16) *
        (isBack ? 0.62 : 1);
      setVar("--fx-dx", `${(Math.cos(radians) * reach).toFixed(1)}px`);
      setVar("--fx-dy", `${(Math.sin(radians) * reach).toFixed(1)}px`);
      setVar("--fx-angle", `${angle.toFixed(1)}deg`);
      setVar("--fx-droop", `${between(70, 200).toFixed(1)}px`);
      setVar("--fx-spin", `${between(-300, 300).toFixed(0)}deg`);
      setVar("--fx-pop-delay", `${between(0, 0.06).toFixed(3)}s`);
      if (isSpark) {
        setVar("--fx-size", `${between(7, 12).toFixed(1)}px`);
      } else {
        const size = isBack ? between(18, 34) : between(30, 74);
        setVar("--fx-size", `${size.toFixed(1)}px`);
        setVar("--fx-aspect", between(0.55, 0.92).toFixed(2));
      }
    },
  }),
  spark_burst: Object.freeze({
    counts: Object.freeze({ 1: 15, 2: 26, 3: 36 }),
    layerForIndex: (index, count) => {
      if (index === 0) return "back"; // core flash
      if (index === 1) return "front"; // arc-a
      if (index === 2 && count >= 20) return "front"; // arc-b
      const start = count >= 20 ? 3 : 2;
      const rel = index - start;
      const needles = Math.round((count - start) * 0.55);
      if (rel < needles) return rel % 4 === 3 ? "back" : "front";
      return "front"; // glint
    },
    roleForIndex: (index, count) => {
      if (index === 0) return "core";
      if (index === 1) return "arc-a";
      if (index === 2 && count >= 20) return "arc-b";
      const start = count >= 20 ? 3 : 2;
      const rel = index - start;
      const needles = Math.round((count - start) * 0.55);
      if (rel < needles) return rel % 4 === 3 ? "needle-b" : "needle-a";
      return "glint";
    },
    vars: (item, { index, between, setVar }) => {
      const role = item.dataset.role;
      const angle = ((index * 137.508) % 360) + between(-16, 16);
      setVar("--fx-angle", `${angle.toFixed(2)}deg`);
      if (role === "core") {
        setVar("--fx-core-size", `${between(430, 520).toFixed(0)}px`);
        return;
      }
      if (role === "arc-a" || role === "arc-b") {
        setVar("--fx-arc-len", `${between(280, 390).toFixed(0)}px`);
        setVar("--fx-arc-w", `${between(96, 132).toFixed(0)}px`);
        setVar("--fx-delay", `${between(0, 0.06).toFixed(3)}s`);
        return;
      }
      if (role === "glint") {
        setVar("--fx-out", `${between(190, 470).toFixed(0)}px`);
        setVar("--fx-size", `${between(26, 46).toFixed(1)}px`);
        setVar("--fx-delay", `${between(0.05, 0.55).toFixed(3)}s`);
        setVar("--fx-tw-dur", `${between(1.2, 2).toFixed(2)}s`);
        return;
      }
      const back = role === "needle-b";
      setVar(
        "--fx-out",
        `${between(back ? 400 : 300, back ? 720 : 620).toFixed(0)}px`,
      );
      setVar(
        "--fx-len",
        `${between(back ? 250 : 160, back ? 420 : 300).toFixed(0)}px`,
      );
      setVar(
        "--fx-w",
        `${between(back ? 18 : 12, back ? 28 : 20).toFixed(1)}px`,
      );
      setVar("--fx-delay", `${between(0, 0.08).toFixed(3)}s`);
    },
  }),
  ember_storm: Object.freeze({
    // Trailing item is a heat-shimmer strip (SMIL-animated turbulence)
    // along the fire line; appended last to keep prior seeded draws.
    counts: Object.freeze({ 1: 21, 2: 35, 3: 55 }),
    layerForIndex: (index, count) => {
      if (index === count - 1) return "back";
      return index % 3 === 0 ? "back" : "front";
    },
    roleForIndex: (index, count) => {
      if (index === count - 1) return "haze";
      if (index % 3 === 0) return "glow";
      if (index % 5 === 1) return "pop";
      return index % 2 === 0 ? "mote-a" : "mote-b";
    },
    vars: (item, { between, setVar, index }) => {
      if (item.dataset.role === "haze") return;
      const isBack = index % 3 === 0;
      const isPop = !isBack && index % 5 === 1;
      const size = isBack
        ? between(26, 44)
        : isPop
          ? between(16, 25)
          : between(11, 21);
      const rise = isBack ? between(380, 640) : between(720, 1180);
      const duration = isBack
        ? between(5.4, 7.6)
        : isPop
          ? between(2.5, 3.4)
          : between(3.2, 4.9);
      setVar("--fx-x", `${between(2, 98).toFixed(2)}%`);
      setVar("--fx-y", `${between(8, 92).toFixed(2)}%`);
      setVar("--fx-size", `${size.toFixed(2)}px`);
      setVar("--fx-rise", `${(-rise).toFixed(0)}px`);
      setVar("--fx-drift-x", `${between(-110, 110).toFixed(0)}px`);
      setVar("--fx-sway", `${between(12, 38).toFixed(1)}px`);
      setVar("--fx-duration", `${duration.toFixed(2)}s`);
      setVar("--fx-delay", `${(-between(0, duration)).toFixed(2)}s`);
      setVar("--fx-sway-duration", `${between(0.9, 2).toFixed(2)}s`);
      setVar("--fx-sway-delay", `${(-between(0, 2.4)).toFixed(2)}s`);
      setVar("--fx-flicker-duration", `${between(0.3, 0.62).toFixed(2)}s`);
    },
  }),
  victory_confetti: Object.freeze({
    counts: Object.freeze({ 1: 28, 2: 44, 3: 58 }),
    layerForIndex: (index) => (index % 3 === 2 ? "back" : "front"),
    roleForIndex: (index) =>
      VICTORY_CONFETTI_ROLES[index % VICTORY_CONFETTI_ROLES.length],
    vars: victoryConfettiVariables,
  }),
  petal_drift: Object.freeze({
    counts: Object.freeze({ 1: 24, 2: 38, 3: 54 }),
    // Every third petal is a small distant one on the back layer; the rest
    // drift in front of the character. Coherent depth: back = smaller,
    // dimmer, slower, longer travel time.
    layerForIndex: (index) => (index % 3 === 2 ? "back" : "front"),
    roleForIndex: (index) => ["petal-a", "petal-b", "petal-c"][index % 3],
    vars: (item, { between, setVar, index }) => {
      const isBack = index % 3 === 2;

      // Entry point along the upwind (top / left) edges. Wind blows
      // from top-left to bottom-right.
      const fromTop = between(0, 1) < 0.56;
      const startX = fromTop ? between(-12, 60) : between(-16, -4);
      const startY = fromTop ? between(-14, -5) : between(-6, 76);

      // Depth-scaled metrics. Every 7th front petal is a slightly larger
      // hero petal sailing closer to the camera. Sizes stay small — big
      // petals read as flat cutouts and expose the vector artwork.
      const isHero = !isBack && index % 7 === 0;
      const size = isBack
        ? between(14, 24)
        : isHero
          ? between(44, 62)
          : between(26, 44);
      const sweep = isBack ? between(760, 1180) : between(1420, 2250);
      const fall = sweep * between(0.22, 0.48);
      const duration = isBack
        ? between(8.2, 11.5)
        : isHero
          ? between(4.6, 5.8)
          : between(5.4, 7.8);

      setVar("--fx-x", `${startX.toFixed(2)}%`);
      setVar("--fx-y", `${startY.toFixed(2)}%`);
      setVar("--fx-size", `${size.toFixed(2)}px`);
      setVar("--fx-sweep-x", `${sweep.toFixed(0)}px`);
      setVar("--fx-fall", `${fall.toFixed(0)}px`);
      setVar("--fx-duration", `${duration.toFixed(2)}s`);
      // Pre-scatter: negative delay so frame 0 is already mid-storm.
      setVar("--fx-delay", `${(-between(0, duration)).toFixed(2)}s`);

      // Flutter (inner axis): rocking tilt + rotateY flip wobble.
      // Tilt leans into the top-left → bottom-right wind diagonal so
      // full-face petals never sit notch-up (avoids a heart read).
      setVar("--fx-tilt", `${between(18, 78).toFixed(2)}deg`);
      setVar("--fx-rock", `${between(9, 24).toFixed(2)}deg`);
      const flutter = isBack ? between(2.2, 3.4) : between(1.25, 2.3);
      setVar("--fx-flutter-duration", `${flutter.toFixed(2)}s`);
      setVar("--fx-flutter-delay", `${(-between(0, flutter)).toFixed(2)}s`);
    },
  }),
  sparkle_shimmer: Object.freeze({
    counts: Object.freeze({ 1: 22, 2: 34, 3: 48 }),
    layerForIndex: (index) => {
      const slot = index % 6;
      return slot === 0 || slot === 5 ? "front" : "back";
    },
    roleForIndex: (index) => {
      const slot = index % 6;
      if (slot === 0 || slot === 3) return "glint";
      if (slot === 5) return "glint-theme";
      return "mote";
    },
    vars: (item, { index, strength, between, setVar }) => {
      const slot = index % 6;
      const role =
        slot === 0 || slot === 3
          ? "glint"
          : slot === 5
            ? "glint-theme"
            : "mote";
      const front = slot === 0 || slot === 5;

      // Alternate each role's own sequence between screen halves so both
      // the theme panel and the dark half stay populated (index % 2 would
      // correlate with the role slot and stack every hero glint on one side).
      const cycle = Math.floor(index / 6);
      const side = (cycle + slot) % 2;
      let x = side === 0 ? between(3, 52) : between(52, 97);
      const y = between(6, 92);
      // Keep looping front glints off the character's face area
      // (screen center); passing is fine, parking is not.
      if (front && x > 32 && x < 68 && y < 60) {
        x = x < 50 ? between(4, 30) : between(70, 96);
      }

      const sizeScale = 0.86 + strength * 0.1;
      let size;
      if (role === "glint") {
        size = (slot === 0 ? between(48, 96) : between(34, 64)) * sizeScale;
      } else if (role === "glint-theme") {
        size = between(22, 40) * sizeScale;
      } else {
        size = between(7, 15) * sizeScale;
      }

      const duration = role === "mote" ? between(2.6, 4.2) : between(1.9, 3.1);
      const rotStart = between(-32, 32);
      const rotDrift = between(16, 38) * (index % 2 === 0 ? 1 : -1);

      setVar("--fx-x", `${x.toFixed(2)}%`);
      setVar("--fx-y", `${y.toFixed(2)}%`);
      setVar("--fx-size", `${size.toFixed(2)}px`);
      setVar("--fx-duration", `${duration.toFixed(2)}s`);
      setVar("--fx-delay", `${(-between(0, duration)).toFixed(2)}s`);
      setVar("--fx-rot-a", `${rotStart.toFixed(2)}deg`);
      setVar("--fx-rot-b", `${(rotStart + rotDrift).toFixed(2)}deg`);
      setVar("--fx-drift-y", `${(-between(6, 26)).toFixed(2)}px`);
    },
  }),
  shockwave: Object.freeze({
    counts: Object.freeze({ 1: 1, 2: 2, 3: 3 }),
    layerForIndex: () => "back",
    roleForIndex: () => "ring",
    vars: legacyItemVariables,
  }),
  lens_rain: Object.freeze({
    // Rain seen through a camera lens: fast faint streaks fall BEHIND the
    // character while beads of water cling to the "lens" in front; a few
    // runner drops break loose and slide down leaving a wet track.
    counts: Object.freeze({ 1: 30, 2: 44, 3: 58 }),
    layerForIndex: (index, count) =>
      index < Math.round(count * 0.45) ? "back" : "front",
    roleForIndex: (index, count) => {
      const rain = Math.round(count * 0.45);
      if (index < rain) return "rain";
      const runners = Math.max(3, Math.round(count * 0.1));
      if (index < rain + runners) return "runner";
      return index % 3 === 0 ? "bead-a" : "bead-b";
    },
    vars: (item, { between, setVar }) => {
      const role = item.dataset.role;
      if (role === "rain") {
        setVar("--fx-x", `${between(-4, 104).toFixed(1)}%`);
        setVar("--fx-len", `${between(120, 260).toFixed(0)}px`);
        setVar("--fx-w", `${between(1, 1.8).toFixed(2)}px`);
        const duration = between(0.7, 1.3);
        setVar("--fx-duration", `${duration.toFixed(2)}s`);
        setVar("--fx-delay", `${(-between(0, duration)).toFixed(2)}s`);
        setVar("--fx-opacity", between(0.22, 0.48).toFixed(2));
        return;
      }
      if (role === "runner") {
        setVar("--fx-x", `${between(6, 94).toFixed(1)}%`);
        setVar("--fx-y", `${between(-2, 34).toFixed(1)}%`);
        setVar("--fx-size", `${between(14, 19).toFixed(1)}px`);
        setVar("--fx-fall", `${between(320, 720).toFixed(0)}px`);
        setVar("--fx-duration", `${between(5, 9).toFixed(2)}s`);
        setVar("--fx-delay", `${(-between(0, 9)).toFixed(2)}s`);
        return;
      }
      // Bead life cycle: land with a splat, sit (one rain-hit tremble
      // with a tiny slip), then evaporate. Long scattered cycles keep
      // the field alive without synchronized pops.
      setVar("--fx-x", `${between(2, 98).toFixed(1)}%`);
      setVar("--fx-y", `${between(4, 94).toFixed(1)}%`);
      setVar("--fx-size", `${between(10, 30).toFixed(1)}px`);
      const life = between(6, 12);
      setVar("--fx-duration", `${life.toFixed(2)}s`);
      setVar("--fx-delay", `${(-between(0, life)).toFixed(2)}s`);
      setVar("--fx-opacity", between(0.8, 1).toFixed(2));
    },
  }),
  hero_flare: Object.freeze({
    // Trailing item is an iridescent spectral ring around the hot core,
    // spun via a registered @property angle; appended last so ghost
    // artifact draws stay stable.
    counts: Object.freeze({ 1: 10, 2: 12, 3: 15 }),
    layerForIndex: (index) => (index === 5 ? "back" : "front"),
    roleForIndex: (index, count) => {
      if (index === count - 1) return "spectral";
      const fixed = [
        "streak",
        "fringe-red",
        "fringe-cyan",
        "core",
        "spikes",
        "veil",
      ];
      if (index < fixed.length) return fixed[index];
      return index % 2 === 0 ? "ghost-hex" : "ghost-disc";
    },
    vars: (item, { index, between, setVar }) => {
      if (item.dataset.role === "spectral") {
        setVar("--fx-x", "63%");
        setVar("--fx-y", "38%");
        setVar("--fx-size", "330px");
        return;
      }
      // Optical axis: hot core upper-right, ghosts step down the diagonal
      // through frame centre (classic lens-artifact axis).
      const coreX = 63;
      const coreY = 38;
      const dirX = -13.5;
      const dirY = 11.5;

      setVar("--fx-cx", `${coreX}%`);
      setVar("--fx-cy", `${coreY}%`);

      if (index < 6) {
        // Fixed optical elements: deterministic, only a touch of jitter.
        setVar("--fx-jitter", `${between(-4, 4).toFixed(2)}px`);
        return;
      }

      const ghostIndex = index - 6;
      const t = 0.55 + ghostIndex * 0.42 + between(-0.06, 0.06);
      const x = coreX + dirX * t + between(-1.5, 1.5);
      const y = coreY + dirY * t + between(-1.5, 1.5);
      const size = between(48, 112) * (0.7 + t * 0.28);

      setVar("--fx-x", `${x.toFixed(2)}%`);
      setVar("--fx-y", `${y.toFixed(2)}%`);
      setVar("--fx-size", `${size.toFixed(2)}px`);
      setVar("--fx-intro-delay", `${(0.09 + ghostIndex * 0.05).toFixed(3)}s`);
      setVar("--fx-drift-x", `${(dirX * t * 0.9).toFixed(2)}px`);
      setVar("--fx-drift-y", `${(dirY * t * 0.9).toFixed(2)}px`);
      setVar("--fx-rotation-start", `${between(-24, 24).toFixed(2)}deg`);
      setVar("--fx-ghost-alpha", between(0.6, 1).toFixed(2));
    },
  }),
  film_burn: Object.freeze({
    counts: Object.freeze({ 1: 5, 2: 7, 3: 10 }),
    layerForIndex: (index) => (index === 0 ? "overlay" : "front"),
    roleForIndex: (index) => {
      if (index === 0) return "flash";
      if (index === 1) return "vignette";
      return ["hole-a", "hole-b", "hole-c"][(index - 2) % 3];
    },
    vars: (item, { index, strength, between, setVar }) => {
      if (index === 0 || index === 1) return;
      const holeIndex = index - 2;
      // Edge/corner anchors — film catches fire at the frame borders,
      // never parked over the character's face (screen center).
      const anchors = [
        [16, 22],
        [85, 70],
        [82, 20],
        [18, 76],
        [50, 9],
        [10, 52],
        [90, 44],
        [58, 90],
      ];
      const [anchorX, anchorY] = anchors[holeIndex % anchors.length];
      const shrink = holeIndex < 4 ? 1 : 0.52;
      const size = between(200, 320) * (0.8 + strength * 0.1) * shrink;
      setVar("--fx-x", `${(anchorX + between(-7, 7)).toFixed(2)}%`);
      setVar("--fx-y", `${(anchorY + between(-6, 6)).toFixed(2)}%`);
      setVar("--fx-size", `${size.toFixed(0)}px`);
      setVar("--fx-rot", `${between(-180, 180).toFixed(1)}deg`);
      setVar("--fx-grow", between(1.35, 1.8).toFixed(2));
      setVar(
        "--fx-delay",
        `${(holeIndex * 0.055 + between(0, 0.03)).toFixed(3)}s`,
      );
      setVar("--fx-flicker-delay", `${(-between(0, 0.4)).toFixed(2)}s`);
    },
  }),
  blackout_cut: Object.freeze({
    // 0 panel-a (upper black half), 1 panel-b (lower black half),
    // 2 slash-trail (soft theme smear), 3 slash (white-hot blade line),
    // 4..count-2 glint (sparks trailing the tip),
    // count-1 flash (one-frame white pop, last so it covers the glints).
    counts: Object.freeze({ 1: 9, 2: 13, 3: 17 }),
    layerForIndex: () => "overlay",
    roleForIndex: (index, count) => {
      if (index < 4)
        return ["panel-a", "panel-b", "slash-trail", "slash"][index];
      return index === count - 1 ? "flash" : "glint";
    },
    vars: (item, { index, count, strength, between, setVar }) => {
      // Katana cut line: one shared diagonal, upper-right -> lower-left.
      setVar("--fx-cut-angle", "-32deg");
      if (index < 4 || index === count - 1) return;

      // Glints pop along the cut, staggered to trail the sweep tip.
      const glintCount = Math.max(count - 5, 1);
      const step = (index - 4) / Math.max(glintCount - 1, 1);
      const progress = clamp(step + between(-0.05, 0.05), 0, 1);
      const along = 520 - 1040 * progress;
      const off = between(-30, 30);
      const size = between(26, 54) * (0.8 + strength * 0.14);

      setVar("--fx-along", `${along.toFixed(1)}px`);
      setVar("--fx-off", `${off.toFixed(1)}px`);
      setVar("--fx-size", `${size.toFixed(1)}px`);
      setVar("--fx-spin", `${between(-48, 48).toFixed(1)}deg`);
      setVar("--fx-glint-delay", `${(0.055 + progress * 0.2).toFixed(3)}s`);
      setVar("--fx-glint-duration", `${between(0.26, 0.4).toFixed(2)}s`);
    },
  }),
  speed_lines: Object.freeze({
    counts: Object.freeze({ 1: 26, 2: 40, 3: 56 }),
    // Last 4 wedges are subtle corner accents rendered in front of the character.
    layerForIndex: (index, count) => (index >= count - 4 ? "front" : "back"),
    roleForIndex: (index, count) => {
      if (index >= count - 4) return "corner";
      return index % 3 === 2 ? "line-b" : "line-a";
    },
    vars: (item, { index, count, strength, between, setVar }) => {
      const CORNERS = 4;
      const main = count - CORNERS;
      const isCorner = index >= main;

      // Angle: main field evenly strewn around the frame with jitter;
      // corner accents pinned near the four diagonals.
      let angleDeg;
      if (isCorner) {
        angleDeg = ([38, 142, 218, 322][index - main] ?? 45) + between(-9, 9);
      } else {
        angleDeg = (index / main) * 360 + between(-5, 5);
      }
      const theta = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);

      // Inner tip sits on a jittered ellipse so the frame center stays clear.
      // Higher strength reaches further inward.
      const reach = 0.74 - strength * 0.065;
      const tipJitter = between(0.95, 1.07) * (isCorner ? 1.2 : 1);
      const semiX = 960 * reach * tipJitter;
      const semiY = 540 * (reach + 0.06) * tipJitter;
      const tip = 1 / Math.sqrt((cos / semiX) ** 2 + (sin / semiY) ** 2);

      // Outer base is anchored past the frame edge along this ray.
      const edgeX =
        Math.abs(cos) > 1e-4 ? 960 / Math.abs(cos) : Number.POSITIVE_INFINITY;
      const edgeY =
        Math.abs(sin) > 1e-4 ? 540 / Math.abs(sin) : Number.POSITIVE_INFINITY;
      const outer = Math.min(edgeX, edgeY) + 150;

      // Low strength keeps its lower item count and layer opacity, but
      // slightly thicker wedges so lines still read over the bright panel.
      const thicknessBoost = strength === 1 ? 1.25 : 1;
      let thickness;
      if (isCorner) thickness = between(16, 30);
      else if (index % 3 === 2) thickness = between(13, 24);
      else thickness = between(30, 60);
      thickness *= thicknessBoost;

      setVar("--fx-angle", `${angleDeg.toFixed(2)}deg`);
      setVar("--fx-tip", `${tip.toFixed(1)}px`);
      setVar("--fx-len", `${Math.max(120, outer - tip).toFixed(1)}px`);
      setVar("--fx-thick", `${thickness.toFixed(1)}px`);
      setVar("--fx-flick", between(0.74, 0.88).toFixed(3));
      setVar("--fx-flicker-dur", `${between(0.22, 0.34).toFixed(3)}s`);
      setVar("--fx-flicker-delay", `${(-between(0, 0.34)).toFixed(3)}s`);
      setVar("--fx-intro-delay", `${((index % 6) * 0.016).toFixed(3)}s`);
    },
  }),
  shadow_mist: Object.freeze({
    // Ominous villain aura: two turbulent smoke banks creep along the
    // bottom in FRONT of the character, a breathing vignette darkens the
    // frame edges, and slow wisps rise behind the character.
    counts: Object.freeze({ 1: 10, 2: 14, 3: 19 }),
    layerForIndex: (index) => (index < 2 ? "front" : "back"),
    roleForIndex: (index) => {
      if (index < 2) return index === 0 ? "bank-a" : "bank-b";
      if (index === 2) return "veil";
      return index % 2 === 0 ? "wisp-a" : "wisp-b";
    },
    vars: (item, { between, setVar }) => {
      const role = item.dataset.role;
      if (role === "bank-a" || role === "bank-b") {
        setVar("--fx-drift", `${between(60, 130).toFixed(0)}px`);
        setVar("--fx-duration", `${between(9, 13).toFixed(1)}s`);
        setVar("--fx-delay", `${(-between(0, 8)).toFixed(1)}s`);
        return;
      }
      if (role === "veil") return;
      setVar("--fx-x", `${between(-6, 100).toFixed(1)}%`);
      setVar("--fx-size", `${between(150, 340).toFixed(0)}px`);
      setVar("--fx-rise", `${(-between(180, 460)).toFixed(0)}px`);
      setVar("--fx-drift-x", `${between(-130, 130).toFixed(0)}px`);
      const duration = between(7, 12);
      setVar("--fx-duration", `${duration.toFixed(1)}s`);
      setVar("--fx-delay", `${(-between(0, duration)).toFixed(1)}s`);
      setVar("--fx-max-opacity", between(0.4, 0.72).toFixed(2));
      setVar("--fx-spin", `${between(-40, 40).toFixed(0)}deg`);
    },
  }),
});

const STRENGTH_VARS = Object.freeze({
  1: Object.freeze({ opacity: 0.58, scale: 0.86, glow: "8px" }),
  2: Object.freeze({ opacity: 0.8, scale: 1, glow: "14px" }),
  3: Object.freeze({ opacity: 1, scale: 1.18, glow: "22px" }),
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function effectClassName(effectId) {
  return `${EFFECT_CLASS_PREFIX}${effectId.replaceAll("_", "-")}`;
}

function hashString(value) {
  let hash = 2166136261;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seedText) {
  let state = hashString(seedText) || 0x6d2b79f5;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function between(random, min, max) {
  return min + (max - min) * random();
}

function setStyleVariable(element, name, value) {
  element.style.setProperty(name, String(value));
}

function getSeedMaterial(data) {
  const source = data ?? {};
  return (
    source.cinematicEffectSeed ??
    source.actorId ??
    source.img ??
    source.presetName ??
    source.theme ??
    "default"
  );
}

function getExistingLayers(root) {
  const layers = {};
  for (const [layerId, definition] of Object.entries(LAYER_DEFINITIONS)) {
    layers[layerId] = root.querySelector(`.${definition.className}`);
  }
  return layers;
}

function ensureLayers(root) {
  const layers = getExistingLayers(root);
  for (const [layerId, definition] of Object.entries(LAYER_DEFINITIONS)) {
    if (layers[layerId]) continue;
    const layer = root.ownerDocument.createElement("div");
    layer.classList.add("cinematic-effect-layer", definition.className);
    layer.setAttribute?.("aria-hidden", "true");
    root.appendChild(layer);
    layers[layerId] = layer;
  }
  return layers;
}

function clearLayer(layer) {
  if (!layer) return;
  layer.replaceChildren();
  layer.classList.remove("is-active");
  const previousEffect = layer.dataset.cinematicEffect;
  if (previousEffect) layer.classList.remove(effectClassName(previousEffect));
  delete layer.dataset.cinematicEffect;
}

function clearLayers(layers) {
  for (const layer of Object.values(layers)) clearLayer(layer);
}

function configureLayer(layer, effectId, config) {
  const previousEffect = layer.dataset.cinematicEffect;
  if (previousEffect && previousEffect !== effectId) {
    layer.classList.remove(effectClassName(previousEffect));
  }

  const vars = STRENGTH_VARS[config.cinematicEffectStrength];
  layer.dataset.cinematicEffect = effectId;
  layer.classList.add(effectClassName(effectId));
  setStyleVariable(layer, "--cinematic-effect-opacity", vars.opacity);
  setStyleVariable(layer, "--cinematic-effect-scale", vars.scale);
  setStyleVariable(layer, "--cinematic-effect-glow", vars.glow);
  setStyleVariable(
    layer,
    "--cinematic-effect-offset-x",
    `${config.cinematicEffectOffsetX}%`,
  );
  setStyleVariable(
    layer,
    "--cinematic-effect-offset-y",
    `${config.cinematicEffectOffsetY}%`,
  );
  setStyleVariable(
    layer,
    "--cinematic-effect-user-scale",
    config.cinematicEffectScale / 100,
  );
}

/**
 * Legacy shared per-item variable generator. Effects migrate to their own
 * `vars(item, ctx)` generator in EFFECT_DEFINITIONS; the random draw order
 * here is preserved so seeded layouts stay stable for effects still using it.
 */
function legacyItemVariables(item, { random, index, strength }) {
  configureItemVariables(item, random, index, strength);
}

function configureItemVariables(item, random, index, strength) {
  const angle = between(random, 0, 360);
  const distance = between(random, 420, 1120) * (0.88 + strength * 0.09);
  const size = between(random, 7, 28) * (0.82 + strength * 0.09);
  const length = between(random, 32, 180) * (0.85 + strength * 0.1);
  const driftX = between(random, -440, 440);

  setStyleVariable(item, "--fx-x", `${between(random, 2, 98).toFixed(2)}%`);
  setStyleVariable(item, "--fx-y", `${between(random, 4, 96).toFixed(2)}%`);
  setStyleVariable(item, "--fx-size", `${size.toFixed(2)}px`);
  setStyleVariable(item, "--fx-length", `${length.toFixed(2)}px`);
  setStyleVariable(
    item,
    "--fx-thickness",
    `${between(random, 2, 9).toFixed(2)}px`,
  );
  setStyleVariable(item, "--fx-angle", `${angle.toFixed(2)}deg`);
  setStyleVariable(
    item,
    "--fx-spin",
    `${between(random, -540, 540).toFixed(2)}deg`,
  );
  setStyleVariable(item, "--fx-distance", `${distance.toFixed(2)}px`);
  setStyleVariable(item, "--fx-distance-neg", `${(-distance).toFixed(2)}px`);
  setStyleVariable(item, "--fx-drift-x", `${driftX.toFixed(2)}px`);
  setStyleVariable(
    item,
    "--fx-rise",
    `${(-between(random, 760, 1380)).toFixed(2)}px`,
  );
  setStyleVariable(
    item,
    "--fx-fall",
    `${between(random, 1160, 1520).toFixed(2)}px`,
  );
  setStyleVariable(
    item,
    "--fx-rotation-start",
    `${between(random, -180, 180).toFixed(2)}deg`,
  );
  setStyleVariable(
    item,
    "--fx-rotation-end",
    `${between(random, 420, 1080).toFixed(2)}deg`,
  );
  setStyleVariable(item, "--fx-hue", `${Math.round(between(random, 0, 360))}`);
  setStyleVariable(
    item,
    "--fx-delay",
    `${(-between(random, 0, 4.2)).toFixed(2)}s`,
  );
  setStyleVariable(
    item,
    "--fx-intro-delay",
    `${((index % 8) * 0.018).toFixed(3)}s`,
  );
  setStyleVariable(
    item,
    "--fx-duration",
    `${between(random, 1.7, 4.2).toFixed(2)}s`,
  );
  setStyleVariable(item, "--fx-ring-delay", `${(index * 0.12).toFixed(2)}s`);
  setStyleVariable(
    item,
    "--fx-ring-scale",
    `${(3.1 + strength * 0.45 + index * 0.18).toFixed(2)}`,
  );
  setStyleVariable(
    item,
    "--fx-flare-size",
    `${between(random, 110, 330).toFixed(2)}px`,
  );
}

function populateEffect(layers, effectId, strength, seedMaterial) {
  const definition = EFFECT_DEFINITIONS[effectId];
  if (!definition) return;

  const count = definition.counts[strength];
  const random = createSeededRandom(`${effectId}:${strength}:${seedMaterial}`);

  for (let index = 0; index < count; index += 1) {
    const layerId = definition.layerForIndex(index, count);
    const layer = layers[layerId];
    if (!layer) continue;

    const item = layer.ownerDocument.createElement("span");
    item.classList.add("cinematic-effect-item");
    item.dataset.role = definition.roleForIndex(index, count);
    item.dataset.effectIndex = String(index);

    // Inner carrier so trajectory (item) and secondary motion such as
    // sway/tumble/flicker (inner) can be animated on independent axes.
    const inner = layer.ownerDocument.createElement("i");
    inner.classList.add("cinematic-effect-inner");
    item.appendChild(inner);

    (definition.vars ?? legacyItemVariables)(item, {
      random,
      index,
      count,
      strength,
      between: (min, max) => between(random, min, max),
      setVar: (name, value) => setStyleVariable(item, name, value),
    });
    layer.appendChild(item);
  }

  for (const layer of Object.values(layers)) {
    if (layer.children.length > 0) layer.classList.add("is-active");
  }
}

export function normalizeCinematicEffectConfig(data) {
  const source = data ?? {};
  const cinematicEffect = EFFECT_IDS.has(source.cinematicEffect)
    ? source.cinematicEffect
    : "none";
  const rawStrength = source.cinematicEffectStrength;
  const parsedStrength =
    rawStrength === undefined || rawStrength === null || rawStrength === ""
      ? Number.NaN
      : Number(rawStrength);
  const cinematicEffectStrength = Number.isFinite(parsedStrength)
    ? clamp(Math.round(parsedStrength), 1, 3)
    : 2;

  const normalizeRange = (value, fallback, min, max) => {
    const parsed =
      value === undefined || value === null || value === ""
        ? Number.NaN
        : Number(value);
    return Number.isFinite(parsed) ? clamp(parsed, min, max) : fallback;
  };

  const cinematicEffectOffsetX = normalizeRange(
    source.cinematicEffectOffsetX,
    0,
    -100,
    100,
  );
  const cinematicEffectOffsetY = normalizeRange(
    source.cinematicEffectOffsetY,
    0,
    -100,
    100,
  );
  const cinematicEffectScale = normalizeRange(
    source.cinematicEffectScale,
    100,
    25,
    300,
  );

  return {
    cinematicEffect,
    cinematicEffectStrength,
    cinematicEffectOffsetX,
    cinematicEffectOffsetY,
    cinematicEffectScale,
  };
}

/**
 * Client-side kill switch for particle accents: players on weak machines can
 * keep cut-ins but skip the effects. Reads Foundry settings when available;
 * outside Foundry (tests, harness) it is always off.
 */
function effectsDisabledForClient() {
  try {
    return (
      globalThis.game?.settings?.get(
        "cinematic-cut-ins",
        "disableCinematicEffects",
      ) === true
    );
  } catch (_) {
    return false;
  }
}

export function applyCinematicEffectElements(root, data) {
  if (!root) return null;

  const source = data ?? {};
  const config = normalizeCinematicEffectConfig(source);
  if (config.cinematicEffect !== "none" && effectsDisabledForClient()) {
    config.cinematicEffect = "none";
  }
  const existingLayers = getExistingLayers(root);

  if (config.cinematicEffect === "none") {
    clearLayers(existingLayers);
    root.classList.remove(ROOT_ACTIVE_CLASS);
    delete root.dataset.cinematicEffectSignature;
    return existingLayers;
  }

  const layers = ensureLayers(root);
  const effectClass = effectClassName(config.cinematicEffect);
  const signature = `${config.cinematicEffect}:${config.cinematicEffectStrength}:${hashString(getSeedMaterial(source))}`;

  root.classList.add(ROOT_ACTIVE_CLASS);

  for (const layer of Object.values(layers)) {
    configureLayer(layer, config.cinematicEffect, config);
    layer.classList.remove("is-active");
    if (!layer.classList.contains(effectClass))
      layer.classList.add(effectClass);
  }

  if (root.dataset.cinematicEffectSignature !== signature) {
    for (const layer of Object.values(layers)) layer.replaceChildren();
    populateEffect(
      layers,
      config.cinematicEffect,
      config.cinematicEffectStrength,
      getSeedMaterial(source),
    );
    root.dataset.cinematicEffectSignature = signature;
  } else {
    for (const layer of Object.values(layers)) {
      if (layer.children.length > 0) layer.classList.add("is-active");
    }
  }

  return layers;
}

export function clearCinematicEffectElements(
  root,
  { removeLayers = false } = {},
) {
  if (!root) return;
  const layers = getExistingLayers(root);
  clearLayers(layers);
  root.classList.remove(ROOT_ACTIVE_CLASS);
  delete root.dataset.cinematicEffectSignature;

  if (!removeLayers) return;
  for (const layer of Object.values(layers)) layer?.remove();
}

export const CINEMATIC_EFFECT_IDS = Object.freeze([...EFFECT_IDS]);
