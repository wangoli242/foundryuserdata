import { FLAG_KEYS, MODULE_ID, SETTING_KEYS } from "./constants.js";

export const MENU_EXTENSION_PROVIDER_ID = "cinematic-cut-ins.playable-presets";

const REGISTER_HOOK = "glitchsmith-lib.registerMenuExtensions";
const PLAY_ACTION_ID = "play-local";
const OPEN_ACTOR_ACTION_ID = "open-actor";
const ACTORS_TAB_ID = "actors";
const SCENES_TAB_ID = "scenes";
const MENU_TOUCH_DELAY_MS = 50;

const ACTOR_SOURCE_PATHS = Object.freeze([
  "name",
  "img",
  "ownership",
  `flags.${MODULE_ID}.${FLAG_KEYS.ACTOR_PRESETS}`,
  `flags.${MODULE_ID}.config`,
]);

let registeredMenuExtensions = null;

export const scheduleCinematicMenuProviderTouch =
  createCinematicMenuTouchScheduler();

export function createCinematicMenuProvider({
  getGame = () => globalThis.game,
} = {}) {
  return Object.freeze({
    id: MENU_EXTENSION_PROVIDER_ID,
    titleKey: "CINEMATIC.MenuExtension.Title",
    subtitleKey: "CINEMATIC.MenuExtension.Subtitle",
    icon: "fa-solid fa-bolt",
    source: MODULE_ID,
    order: 220,
    home: Object.freeze({
      labelKey: "CINEMATIC.MenuExtension.HomeLabel",
      subtitleKey: "CINEMATIC.MenuExtension.HomeSubtitle",
      icon: "fa-solid fa-bolt",
      defaultSize: "1x1",
      profiles: Object.freeze(["gm", "player"]),
    }),
    canDisplay: () => canUseMenuExtension(getGame()),
    load: (context = {}) => loadMenuPage(context, getGame()),
    execute: (actionId, entryId) =>
      executeMenuAction(actionId, entryId, getGame()),
  });
}

const cinematicMenuProvider = createCinematicMenuProvider();

export function registerCinematicMenuExtensionHooks({
  hooks = globalThis.Hooks,
  scheduleTouch = scheduleCinematicMenuProviderTouch,
  getGame = () => globalThis.game,
} = {}) {
  hooks?.on?.(REGISTER_HOOK, (payload) => {
    registerFromHookPayload(payload);
  });
  hooks?.on?.("createActor", (actor) => {
    if (actor?.isOwner === true) {
      scheduleTouch();
    }
  });
  hooks?.on?.("deleteActor", (actor) => {
    if (actor?.isOwner === true) {
      scheduleTouch();
    }
  });
  hooks?.on?.("updateActor", (_actor, changed) => {
    if (hasRelevantActorSourceChange(changed)) {
      scheduleTouch();
    }
  });
  hooks?.on?.("updateUser", (user, changed) => {
    if (isCurrentUser(user, getGame()) && hasChangedPath(changed, ["role"])) {
      scheduleTouch();
    }
  });
}

export function createCinematicMenuTouchScheduler({
  touch = () => touchCinematicMenuProvider(),
  setTimer = (callback, delay) => globalThis.setTimeout(callback, delay),
  clearTimer = (timerId) => globalThis.clearTimeout(timerId),
  delay = MENU_TOUCH_DELAY_MS,
} = {}) {
  let timerId = null;
  return () => {
    if (timerId !== null) {
      clearTimer(timerId);
    }
    timerId = setTimer(() => {
      timerId = null;
      touch();
    }, delay);
  };
}

/** Fallback for library versions that publish their API before this init hook. */
export function registerCinematicMenuProvider(gameRef = globalThis.game) {
  const menuExtensions = getMenuExtensions(gameRef);
  if (!menuExtensions?.registerProvider) {
    return false;
  }
  menuExtensions.registerProvider(cinematicMenuProvider, { replace: true });
  registeredMenuExtensions = menuExtensions;
  return true;
}

export function touchCinematicMenuProvider(gameRef = globalThis.game) {
  const menuExtensions = registeredMenuExtensions ?? getMenuExtensions(gameRef);
  if (!menuExtensions?.touchProvider) {
    return false;
  }
  return menuExtensions.touchProvider(MENU_EXTENSION_PROVIDER_ID);
}

function registerFromHookPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }
  const menuExtensions = payload.menuExtensions;
  if (typeof payload.register === "function") {
    payload.register(cinematicMenuProvider, { replace: true });
    registeredMenuExtensions = menuExtensions ?? registeredMenuExtensions;
    return true;
  }
  if (!menuExtensions?.registerProvider) {
    return false;
  }
  menuExtensions.registerProvider(cinematicMenuProvider, { replace: true });
  registeredMenuExtensions = menuExtensions;
  return true;
}

function canUseMenuExtension(gameRef) {
  return (
    hasMinimumAccess(gameRef) &&
    !isClientDisabled(gameRef) &&
    Boolean(getCinematicApi(gameRef)?.listPlayablePresets)
  );
}

function hasRelevantActorSourceChange(changed) {
  return hasChangedPath(changed, ACTOR_SOURCE_PATHS);
}

function hasChangedPath(changed, relevantPaths) {
  return collectChangedPaths(changed).some((path) =>
    relevantPaths.some(
      (relevantPath) =>
        path === relevantPath || path.startsWith(`${relevantPath}.`),
    ),
  );
}

function collectChangedPaths(value, prefix = "") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return prefix ? [normalizeChangedPath(prefix)] : [];
  }

  const entries = Object.entries(value);
  if (!entries.length) {
    return prefix ? [normalizeChangedPath(prefix)] : [];
  }

  return entries.flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" && !Array.isArray(child)
      ? collectChangedPaths(child, path)
      : [normalizeChangedPath(path)];
  });
}

function normalizeChangedPath(path) {
  return path
    .split(".")
    .map((segment) => segment.replace(/^-=/u, ""))
    .join(".");
}

function isCurrentUser(user, gameRef) {
  const currentUser = gameRef?.user;
  return Boolean(
    currentUser &&
    (user === currentUser ||
      (user?.id && currentUser.id && user.id === currentUser.id)),
  );
}

function loadMenuPage(context, gameRef) {
  const presets = loadPlayablePresets(gameRef);
  if (context?.surface === "search") {
    return presets.map((preset) => createMenuEntry(preset));
  }

  const actorGroups = createActorGroups(presets, gameRef);
  const requestedTab = context?.navigation?.tabId;
  const defaultTab = actorGroups.length ? ACTORS_TAB_ID : SCENES_TAB_ID;
  const activeTab =
    requestedTab === ACTORS_TAB_ID || requestedTab === SCENES_TAB_ID
      ? requestedTab
      : defaultTab;

  if (activeTab === SCENES_TAB_ID) {
    return createMenuPage({
      activeTab,
      entries: presets
        .filter((preset) => preset.kind === "scene")
        .map((preset) => createMenuEntry(preset)),
    });
  }

  const actorUuid = context?.navigation?.path?.[0];
  const selectedGroup = actorGroups.find(
    (group) => group.actorUuid === actorUuid,
  );
  if (!selectedGroup) {
    return createMenuPage({
      activeTab,
      entries: actorGroups.map((group) =>
        createActorGroupEntry(group, gameRef),
      ),
    });
  }

  return createMenuPage({
    activeTab,
    path: [selectedGroup.actorUuid],
    title: selectedGroup.actorName,
    subtitleKey: "CINEMATIC.MenuExtension.ActorDetailSubtitle",
    breadcrumbs: [
      {
        labelKey: "CINEMATIC.MenuExtension.Tab.Actors",
        navigation: { tabId: ACTORS_TAB_ID, path: [] },
      },
      {
        label: selectedGroup.actorName,
        navigation: {
          tabId: ACTORS_TAB_ID,
          path: [selectedGroup.actorUuid],
        },
      },
    ],
    entries: selectedGroup.presets.map((preset) => createMenuEntry(preset)),
  });
}

function loadPlayablePresets(gameRef) {
  assertMenuAccess(gameRef);
  const api = getCinematicApi(gameRef);
  if (typeof api?.listPlayablePresets !== "function") {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.Unavailable",
      gameRef,
      "api-unavailable",
    );
  }

  return api
    .listPlayablePresets()
    .filter((preset) => canListPreset(preset, gameRef));
}

function createMenuPage({
  activeTab,
  path = [],
  titleKey = "CINEMATIC.MenuExtension.Title",
  title,
  subtitleKey = "CINEMATIC.MenuExtension.Subtitle",
  breadcrumbs = [],
  entries,
}) {
  return Object.freeze({
    title,
    titleKey: title ? undefined : titleKey,
    subtitleKey,
    layout: "gallery",
    tabs: Object.freeze([
      Object.freeze({
        id: ACTORS_TAB_ID,
        labelKey: "CINEMATIC.MenuExtension.Tab.Actors",
        icon: "fa-solid fa-users",
      }),
      Object.freeze({
        id: SCENES_TAB_ID,
        labelKey: "CINEMATIC.MenuExtension.Tab.Scenes",
        icon: "fa-solid fa-clapperboard",
      }),
    ]),
    activeTab,
    navigation: Object.freeze({
      tabId: activeTab,
      path: Object.freeze([...path]),
    }),
    breadcrumbs: Object.freeze(
      breadcrumbs.map((breadcrumb) => Object.freeze(breadcrumb)),
    ),
    entries: Object.freeze(entries),
  });
}

function createActorGroups(presets, gameRef) {
  const groups = new Map();
  for (const preset of presets) {
    if (preset.kind !== "actor") {
      continue;
    }
    const actor = resolveActor(preset.actorUuid, gameRef);
    if (!actor?.isOwner) {
      continue;
    }

    let group = groups.get(preset.actorUuid);
    if (!group) {
      group = {
        actorUuid: preset.actorUuid,
        actorName:
          normalizeText(actor.name) || preset.actorName || preset.actorUuid,
        actorImg: normalizeText(actor.img) || preset.img || "",
        presets: [],
      };
      groups.set(preset.actorUuid, group);
    }
    group.presets.push(preset);
  }

  return [...groups.values()].sort(
    (left, right) =>
      left.actorName.localeCompare(right.actorName) ||
      left.actorUuid.localeCompare(right.actorUuid),
  );
}

function createActorGroupEntry(group, gameRef) {
  return Object.freeze({
    id: `actor-group:${encodeURIComponent(group.actorUuid)}`,
    title: group.actorName,
    subtitle: formatLocalized(
      gameRef,
      "CINEMATIC.MenuExtension.ActorPresetCount",
      { count: group.presets.length },
    ),
    image: group.actorImg || undefined,
    icon: "fa-solid fa-user",
    keywords: [group.actorName, ...group.presets.map((preset) => preset.name)]
      .filter(Boolean)
      .join(" "),
    actions: Object.freeze([
      Object.freeze({
        id: OPEN_ACTOR_ACTION_ID,
        labelKey: "CINEMATIC.MenuExtension.Action.ViewActor",
        icon: "fa-solid fa-chevron-right",
        primary: true,
        navigation: Object.freeze({
          tabId: ACTORS_TAB_ID,
          path: Object.freeze([group.actorUuid]),
        }),
      }),
    ]),
  });
}

function createMenuEntry(preset) {
  const isActorPreset = preset.kind === "actor";
  return Object.freeze({
    id: encodeEntryId(preset),
    title: preset.name,
    subtitle: isActorPreset ? preset.actorName : undefined,
    subtitleKey: isActorPreset
      ? undefined
      : "CINEMATIC.MenuExtension.SceneCutIn",
    image: preset.img || undefined,
    icon: isActorPreset ? "fa-solid fa-user" : "fa-solid fa-clapperboard",
    keywords: [preset.name, preset.actorName, preset.kind]
      .filter(Boolean)
      .join(" "),
    actions: Object.freeze([
      Object.freeze({
        id: PLAY_ACTION_ID,
        labelKey: "CINEMATIC.MenuExtension.Action.PlayLocal",
        icon: "fa-solid fa-play",
        primary: true,
        closesFirst: true,
      }),
    ]),
  });
}

function executeMenuAction(actionId, entryId, gameRef) {
  if (actionId !== PLAY_ACTION_ID) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.UnknownAction",
      gameRef,
      "unknown-action",
    );
  }
  assertMenuAccess(gameRef);

  const selection = decodeEntryId(entryId);
  const api = getCinematicApi(gameRef);
  if (
    !selection ||
    typeof api?.listPlayablePresets !== "function" ||
    typeof api?.playPresetLocal !== "function"
  ) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.PresetUnavailable",
      gameRef,
      "preset-unavailable",
    );
  }

  const currentPreset = api
    .listPlayablePresets()
    .find((preset) => matchesSelection(preset, selection));
  if (!currentPreset || !canListPreset(currentPreset, gameRef)) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.PresetUnavailable",
      gameRef,
      "preset-unavailable",
    );
  }

  const accepted = api.playPresetLocal(selection);
  if (!accepted) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.PresetUnavailable",
      gameRef,
      "preset-unavailable",
    );
  }
  return { ok: true };
}

function canListPreset(preset, gameRef) {
  if (preset?.kind === "scene") {
    return Boolean(preset.id && preset.name);
  }
  if (preset?.kind !== "actor" || !preset.id || !preset.actorUuid) {
    return false;
  }
  return resolveActor(preset.actorUuid, gameRef)?.isOwner === true;
}

function matchesSelection(preset, selection) {
  return (
    preset?.kind === selection.kind &&
    preset?.id === selection.id &&
    (selection.kind !== "actor" || preset.actorUuid === selection.actorUuid)
  );
}

function encodeEntryId(preset) {
  const parts = [preset.kind, preset.id];
  if (preset.kind === "actor") {
    parts.push(preset.actorUuid);
  }
  return parts.map((part) => encodeURIComponent(part)).join(":");
}

function decodeEntryId(entryId) {
  if (typeof entryId !== "string") {
    return null;
  }
  try {
    const [kind, id, actorUuid, ...extra] = entryId
      .split(":")
      .map((part) => decodeURIComponent(part));
    if (extra.length || !id) {
      return null;
    }
    if (kind === "scene" && actorUuid === undefined) {
      return { kind, id };
    }
    if (kind === "actor" && actorUuid) {
      return { kind, id, actorUuid };
    }
  } catch {
    return null;
  }
  return null;
}

function assertMenuAccess(gameRef) {
  if (!hasMinimumAccess(gameRef)) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.AccessDenied",
      gameRef,
      "access-denied",
    );
  }
  if (isClientDisabled(gameRef)) {
    throw createMenuError(
      "CINEMATIC.MenuExtension.Error.ClientDisabled",
      gameRef,
      "client-disabled",
    );
  }
}

function hasMinimumAccess(gameRef) {
  const role = Number(gameRef?.user?.role);
  const minimumRole = Number(
    getSetting(gameRef, SETTING_KEYS.MIN_ACCESS_ROLE, Infinity),
  );
  return Number.isFinite(role) && role >= minimumRole;
}

function isClientDisabled(gameRef) {
  return Boolean(getSetting(gameRef, SETTING_KEYS.DISABLE_CLIENT, false));
}

function getSetting(gameRef, key, fallback) {
  try {
    return gameRef?.settings?.get?.(MODULE_ID, key) ?? fallback;
  } catch {
    return fallback;
  }
}

function getCinematicApi(gameRef) {
  return gameRef?.modules?.get?.(MODULE_ID)?.api ?? null;
}

function getMenuExtensions(gameRef) {
  return (
    gameRef?.modules?.get?.("glitchsmith-lib")?.api?.menuExtensions ?? null
  );
}

function resolveActor(uuid, gameRef) {
  try {
    const actor = globalThis.fromUuidSync?.(uuid);
    if (actor) {
      return actor;
    }
  } catch {
    // A stale UUID can still be resolved by its world Actor id below.
  }
  const id =
    typeof uuid === "string" && uuid.startsWith("Actor.")
      ? uuid.slice("Actor.".length)
      : uuid;
  return gameRef?.actors?.get?.(id) ?? null;
}

function createMenuError(localizationKey, gameRef, code) {
  const localized = gameRef?.i18n?.localize?.(localizationKey);
  const error = new Error(
    localized && localized !== localizationKey ? localized : localizationKey,
  );
  error.code = code;
  error.localizationKey = localizationKey;
  return error;
}

function formatLocalized(gameRef, localizationKey, data) {
  const formatted = gameRef?.i18n?.format?.(localizationKey, data);
  if (formatted && formatted !== localizationKey) {
    return formatted;
  }
  return String(data.count);
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}
