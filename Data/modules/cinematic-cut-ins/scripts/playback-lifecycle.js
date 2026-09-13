const PLAYBACK_STATUSES = new Set([
  "completed",
  "error",
  "skipped",
  "cancelled",
]);

export function playbackResult(status, details = {}) {
  const normalized = PLAYBACK_STATUSES.has(status) ? status : "error";
  return { status: normalized, ...details };
}

export function createPlaybackDeferred() {
  let settled = false;
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  return {
    promise,
    get settled() {
      return settled;
    },
    settle(result) {
      if (settled) return false;
      settled = true;
      resolvePromise(result);
      return true;
    },
  };
}

export function settledPlaybackHandle(result) {
  const deferred = createPlaybackDeferred();
  deferred.settle(result);
  return {
    finished: deferred.promise,
    stop: () => false,
  };
}

export function shouldPreservePlaybackAudio(status, data) {
  return status === "completed" && data?.keepAudioPlaying === true;
}
