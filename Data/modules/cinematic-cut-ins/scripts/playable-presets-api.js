const MODULE_ID = "cinematic-cut-ins";

/**
 * Return only presets that can be played as a complete cut-in. Global presets
 * are style definitions and All-Out presets are stored per user, so neither is
 * exposed as a stable cross-module action target.
 */
export function listPlayablePresets(gameRef = globalThis.game) {
  const scenePresets = _setting(gameRef, "scenePresets");
  const sceneChoices = Object.entries(scenePresets).map(([id, preset]) => ({
    kind: "scene",
    id,
    name: _text(preset?.name) || id,
    img: _text(preset?.img),
    description: _text(preset?.text),
  }));

  const actorGroups = _setting(gameRef, "actorGroups");
  const globalPresets = _setting(gameRef, "globalPresets");
  const actorChoices = [];
  for (const actor of _actors(gameRef)) {
    const actorUuid =
      _text(actor?.uuid) || (_text(actor?.id) ? `Actor.${actor.id}` : "");
    if (!actorUuid) continue;
    const actorName = _text(actor?.name) || actorUuid;
    const actorImg = _text(actor?.img);
    const presets = _flag(actor, "presets");
    for (const [id, preset] of Object.entries(presets)) {
      actorChoices.push({
        kind: "actor",
        id,
        actorUuid,
        actorName,
        name: _text(preset?.presetName ?? preset?.name) || id,
        img: _text(preset?.img) || actorImg,
      });
    }

    const actorConfig = _flag(actor, "config");
    const group = actorConfig?.groupId
      ? actorGroups[actorConfig.groupId]
      : null;
    const groupPreset = group?.defaultPresetId
      ? globalPresets[group.defaultPresetId]
      : null;
    if (group && groupPreset) {
      actorChoices.push({
        kind: "actor",
        id: `group-default:${actorConfig.groupId}`,
        actorUuid,
        actorName,
        name:
          _text(group?.name) ||
          _text(groupPreset?.presetName) ||
          actorConfig.groupId,
        img: _text(groupPreset?.img) || actorImg,
        groupDefault: true,
      });
    }
  }

  sceneChoices.sort(
    (a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id),
  );
  actorChoices.sort(
    (a, b) =>
      a.actorName.localeCompare(b.actorName) ||
      a.name.localeCompare(b.name) ||
      a.id.localeCompare(b.id),
  );
  return [...sceneChoices, ...actorChoices];
}

/** Resolve a stable descriptor back to playable data on the current client. */
export function resolvePlayablePreset(selection, gameRef = globalThis.game) {
  const kind = _text(selection?.kind ?? selection?.presetKind);
  const id = _text(selection?.id ?? selection?.presetId);
  if (!kind || !id) return null;

  if (kind === "scene") {
    const preset = _setting(gameRef, "scenePresets")[id];
    return preset ? { kind, data: _clone(preset), actor: null } : null;
  }

  if (kind !== "actor") return null;
  const actor = _resolveActor(selection?.actorUuid, gameRef);
  if (!actor) return null;

  let preset = null;
  if (id.startsWith("group-default:")) {
    const actorConfig = _flag(actor, "config");
    const groupId =
      id.slice("group-default:".length) || _text(actorConfig?.groupId);
    const group = groupId ? _setting(gameRef, "actorGroups")[groupId] : null;
    preset = group?.defaultPresetId
      ? _setting(gameRef, "globalPresets")[group.defaultPresetId]
      : null;
  } else {
    preset = _flag(actor, "presets")[id] ?? null;
  }
  return preset ? { kind, data: _clone(preset), actor } : null;
}

function _resolveActor(reference, gameRef) {
  const ref = _text(reference);
  if (!ref) return null;
  try {
    const byUuid = globalThis.fromUuidSync?.(ref);
    if (byUuid) return byUuid;
  } catch (_error) {
    // Fall through to the world collection for older Foundry versions.
  }
  const id = ref.startsWith("Actor.") ? ref.slice("Actor.".length) : ref;
  return (
    gameRef?.actors?.get?.(id) ??
    _actors(gameRef).find((actor) => actor?.id === id) ??
    null
  );
}

function _actors(gameRef) {
  if (Array.isArray(gameRef?.actors?.contents)) return gameRef.actors.contents;
  if (gameRef?.actors && typeof gameRef.actors[Symbol.iterator] === "function")
    return [...gameRef.actors];
  return [];
}

function _setting(gameRef, key) {
  try {
    const value = gameRef?.settings?.get?.(MODULE_ID, key);
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch (_error) {
    return {};
  }
}

function _flag(actor, key) {
  try {
    const value = actor?.getFlag?.(MODULE_ID, key);
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch (_error) {
    return {};
  }
}

function _text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function _clone(value) {
  if (globalThis.foundry?.utils?.deepClone)
    return foundry.utils.deepClone(value);
  return structuredClone(value);
}
