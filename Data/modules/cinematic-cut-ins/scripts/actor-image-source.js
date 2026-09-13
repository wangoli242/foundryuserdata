export const CHARACTER_IMAGE_SOURCE = Object.freeze({
  PRESET: "preset",
  ACTOR: "actor",
});

function normalizeImagePath(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeCharacterImageSource(value) {
  return value === CHARACTER_IMAGE_SOURCE.ACTOR
    ? CHARACTER_IMAGE_SOURCE.ACTOR
    : CHARACTER_IMAGE_SOURCE.PRESET;
}

export function resolveCharacterImageSource({ imageSource, presetImage } = {}) {
  if (
    imageSource === CHARACTER_IMAGE_SOURCE.ACTOR ||
    imageSource === CHARACTER_IMAGE_SOURCE.PRESET
  ) {
    return imageSource;
  }

  return normalizeImagePath(presetImage)
    ? CHARACTER_IMAGE_SOURCE.PRESET
    : CHARACTER_IMAGE_SOURCE.ACTOR;
}

export function resolveEditorImage({
  presetImage,
  actorImage,
  hasActorContext = false,
} = {}) {
  const presetPath = normalizeImagePath(presetImage);
  if (presetPath) return presetPath;
  return hasActorContext ? normalizeImagePath(actorImage) : "";
}

export function resolvePlaybackImage({
  imageSource,
  presetImage,
  actorImage,
} = {}) {
  const presetPath = normalizeImagePath(presetImage);
  const actorPath = normalizeImagePath(actorImage);

  if (
    normalizeCharacterImageSource(imageSource) === CHARACTER_IMAGE_SOURCE.ACTOR
  ) {
    return actorPath || presetPath;
  }

  return presetPath || actorPath;
}
