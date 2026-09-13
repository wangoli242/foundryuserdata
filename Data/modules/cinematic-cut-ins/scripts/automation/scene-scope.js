/**
 * Normalize the Foundry Scene IDs assigned to a cinematic scene preset.
 * Missing or empty values intentionally mean "all scenes" for backwards compatibility.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
export function normalizeSceneTargetIds(value) {
  const values = Array.isArray(value)
    ? value
    : value == null || value === ""
      ? []
      : [value];
  return Array.from(
    new Set(values.map((id) => String(id ?? "").trim()).filter(Boolean)),
  );
}

/**
 * Resolve the Scene associated with a Combat document across supported Foundry versions.
 *
 * @param {object|null|undefined} combat
 * @returns {string|null}
 */
export function getCombatSceneId(combat) {
  const scene = combat?.scene;
  if (typeof scene === "string") return scene || null;

  const directSceneId =
    scene?.id ?? combat?.sceneId ?? combat?._source?.scene ?? null;

  if (directSceneId) return String(directSceneId);

  const resolveCombatantSceneId = (combatant) => {
    const sceneId =
      combatant?.sceneId ??
      combatant?._source?.sceneId ??
      combatant?.token?.parent?.id ??
      combatant?.token?.scene?.id ??
      null;

    return sceneId ? String(sceneId) : null;
  };

  // Foundry V14 stores scene ownership on Combatants rather than Combat.
  const currentCombatantSceneId = resolveCombatantSceneId(combat?.combatant);
  if (currentCombatantSceneId) return currentCombatantSceneId;

  const collection = combat?.combatants;
  let combatants = [];

  if (Array.isArray(collection)) {
    combatants = collection;
  } else if (Array.isArray(collection?.contents)) {
    combatants = collection.contents;
  } else if (typeof collection?.values === "function") {
    combatants = Array.from(collection.values());
  }

  const sceneIds = Array.from(
    new Set(combatants.map(resolveCombatantSceneId).filter(Boolean)),
  );

  return sceneIds.length === 1 ? sceneIds[0] : null;
}

/**
 * Select cinematic scene presets for one automation trigger.
 *
 * Scene-specific presets override legacy/global presets only for the same trigger.
 * If no preset explicitly targets the active Combat Scene, presets without a target
 * continue to run as the global default.
 *
 * @param {Record<string, object>|object[]|null|undefined} scenePresets
 * @param {object} options
 * @param {string|null|undefined} options.sceneId
 * @param {string} options.trigger
 * @returns {object[]}
 */
export function selectSceneAutomationPresets(
  scenePresets,
  { sceneId, trigger },
) {
  if (!trigger) return [];

  const presets = Array.isArray(scenePresets)
    ? scenePresets
    : Object.values(scenePresets || {});

  const candidates = presets.filter((preset) => preset && preset[trigger]);
  const normalizedSceneId = sceneId ? String(sceneId) : null;

  if (normalizedSceneId) {
    const sceneSpecific = candidates.filter((preset) =>
      normalizeSceneTargetIds(preset.targetSceneIds).includes(
        normalizedSceneId,
      ),
    );

    if (sceneSpecific.length > 0) return sceneSpecific;
  }

  return candidates.filter(
    (preset) => normalizeSceneTargetIds(preset.targetSceneIds).length === 0,
  );
}
