export const ACTIVE_CONFIG_PRESET_ID = "cinematic-cut-ins:active-config";

export function resolveActorPreset({
  presetId,
  actorConfig = {},
  actorPresets = {},
  globalPresets = {},
  actorGroups = {},
} = {}) {
  if (presetId === ACTIVE_CONFIG_PRESET_ID) {
    return { preset: actorConfig || {}, source: "active-config" };
  }

  if (presetId && actorPresets[presetId]) {
    return { preset: actorPresets[presetId], source: "actor-preset" };
  }

  if (presetId && globalPresets[presetId]) {
    return { preset: globalPresets[presetId], source: "global-preset" };
  }

  const groupId = actorConfig?.groupId;
  const groupDefaultPresetId = groupId
    ? actorGroups[groupId]?.defaultPresetId
    : null;
  if (groupDefaultPresetId && globalPresets[groupDefaultPresetId]) {
    return {
      preset: globalPresets[groupDefaultPresetId],
      source: "group-default",
    };
  }

  return { preset: null, source: null };
}

export function findPresetSaveTargetId(
  presets = {},
  loadedPresetId = null,
  name = "",
) {
  if (
    loadedPresetId &&
    Object.prototype.hasOwnProperty.call(presets, loadedPresetId) &&
    presets[loadedPresetId]?.presetName === name
  ) {
    return loadedPresetId;
  }

  const existingEntry = Object.entries(presets).find(
    ([, data]) => data?.presetName === name,
  );
  return existingEntry?.[0] || null;
}
