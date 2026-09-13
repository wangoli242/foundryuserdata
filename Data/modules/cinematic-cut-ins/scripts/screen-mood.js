export const SCREEN_MOOD_OPTIONS = [
  { id: "none", label: "CINEMATIC.Config.ScreenMood.None" },
  { id: "night", label: "CINEMATIC.Config.ScreenMood.Night" },
  { id: "dusk", label: "CINEMATIC.Config.ScreenMood.Dusk" },
  { id: "dawn", label: "CINEMATIC.Config.ScreenMood.Dawn" },
  { id: "flashback", label: "CINEMATIC.Config.ScreenMood.Flashback" },
  { id: "vignette", label: "CINEMATIC.Config.ScreenMood.Vignette" },
  { id: "dream", label: "CINEMATIC.Config.ScreenMood.Dream" },
  { id: "oldtv", label: "CINEMATIC.Config.ScreenMood.OldTv" },
  { id: "lightning", label: "CINEMATIC.Config.ScreenMood.Lightning" },
  { id: "monochrome", label: "CINEMATIC.Config.ScreenMood.MonochromeFilm" },
];

const SCREEN_MOOD_IDS = new Set(SCREEN_MOOD_OPTIONS.map((option) => option.id));
const SCREEN_MOOD_CLASS_PREFIX = "cinematic-screen-filter--";

export function normalizeScreenMoodConfig(data) {
  const source = data ?? {};
  const screenMood = SCREEN_MOOD_IDS.has(source.screenMood)
    ? source.screenMood
    : "none";
  const rawOpacity = source.screenMoodOpacity;
  const parsedOpacity =
    rawOpacity === undefined || rawOpacity === null || rawOpacity === ""
      ? Number.NaN
      : Number(rawOpacity);
  const screenMoodOpacity = Number.isFinite(parsedOpacity)
    ? Math.max(0, Math.min(100, parsedOpacity))
    : 60;

  return { screenMood, screenMoodOpacity };
}

export function applyScreenMoodElement(root, data) {
  if (!root) return null;

  const { screenMood, screenMoodOpacity } = normalizeScreenMoodConfig(data);
  let filter = root.querySelector(".cinematic-screen-filter");

  if (!filter) {
    filter = root.ownerDocument.createElement("div");
    filter.classList.add("cinematic-screen-filter");
    root.appendChild(filter);
  }

  for (const option of SCREEN_MOOD_OPTIONS) {
    if (option.id === "none") continue;
    filter.classList.remove(`${SCREEN_MOOD_CLASS_PREFIX}${option.id}`);
  }

  if (screenMood === "none") {
    root.classList.remove("cinematic-has-screen-filter");
  } else {
    root.classList.add("cinematic-has-screen-filter");
    filter.classList.add(`${SCREEN_MOOD_CLASS_PREFIX}${screenMood}`);
  }

  filter.style.setProperty(
    "--screen-mood-opacity",
    String(screenMoodOpacity / 100),
  );
  return filter;
}
