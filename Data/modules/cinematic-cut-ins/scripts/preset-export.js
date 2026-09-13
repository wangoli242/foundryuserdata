const MODULE_ID = "cinematic-cut-ins";

let _JSZip = null;

async function loadJSZip() {
  if (_JSZip) return _JSZip;
  if (window.JSZip) {
    _JSZip = window.JSZip;
    return _JSZip;
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `modules/${MODULE_ID}/scripts/lib/jszip.min.js`;
    script.onload = () => {
      _JSZip = window.JSZip;
      resolve(_JSZip);
    };
    script.onerror = () => reject(new Error("Failed to load JSZip"));
    document.head.appendChild(script);
  });
}

// ── Path helpers ─────────────────────────────────────

function _isLocalPath(p) {
  if (!p || typeof p !== "string") return false;
  if (p.startsWith("http://") || p.startsWith("https://")) return false;
  if (p.startsWith("icons/svg/")) return false;
  if (p.startsWith(`modules/${MODULE_ID}/`)) return false;
  return true;
}

function _parseSoundPaths(str) {
  if (!str || typeof str !== "string") return [];
  return str
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ── Asset path collector ─────────────────────────────

function collectAssetPaths(preset, type) {
  const paths = new Set();
  const add = (p) => {
    if (_isLocalPath(p)) paths.add(p);
  };

  if (type === "allout") {
    _parseSoundPaths(preset.sound).forEach(add);
    _parseSoundPaths(preset.sfx).forEach(add);
    add(preset.finishSound);
    add(preset.voteButtonSound);

    for (const l of preset.globalLayers || []) {
      add(l.src);
      add(l.maskSrc);
    }

    for (const p of preset.participants || []) {
      add(p.img);
      add(p.readyImg);
      _parseSoundPaths(p.sound).forEach(add);
      _parseSoundPaths(p.sfx).forEach(add);
      _parseSoundPaths(p.readySfx).forEach(add);
    }
  } else {
    add(preset.img);

    for (const v of preset.variations || []) {
      add(v.img);
    }

    for (const l of preset.layers || []) {
      add(l.src);
      add(l.maskSrc);
    }

    _parseSoundPaths(preset.sound).forEach(add);
    _parseSoundPaths(preset.sfx).forEach(add);
  }

  return paths;
}

// ── Export ────────────────────────────────────────────

export async function exportPreset(preset, type, displayName) {
  const JSZip = await loadJSZip();
  const zip = new JSZip();

  const assetPaths = collectAssetPaths(preset, type);
  const pathMap = {};
  let idx = 0;
  const assetsFolder = zip.folder("assets");
  const warnings = [];

  for (const path of assetPaths) {
    try {
      const resp = await fetch(encodeURI(path));
      if (!resp.ok) {
        warnings.push(`HTTP ${resp.status}: ${path}`);
        continue;
      }
      const blob = await resp.blob();
      const ext = path.split(".").pop() || "bin";
      const safeName = `${String(idx).padStart(3, "0")}.${ext}`;
      assetsFolder.file(safeName, blob);
      pathMap[path] = `assets/${safeName}`;
      idx++;
    } catch (err) {
      warnings.push(`${path}: ${err.message}`);
    }
  }

  let json = JSON.stringify(preset);
  for (const [original, zipPath] of Object.entries(pathMap)) {
    json = json.replaceAll(JSON.stringify(original), JSON.stringify(zipPath));
  }

  zip.file("preset.json", json);
  zip.file(
    "manifest.json",
    JSON.stringify({
      version: 1,
      module: MODULE_ID,
      moduleVersion: game.modules.get(MODULE_ID)?.version || "unknown",
      type: type,
      exportDate: new Date().toISOString(),
      assetCount: idx,
    }),
  );

  const blob = await zip.generateAsync({ type: "blob" });
  const safeName = (displayName || "preset")
    .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ _-]/g, "")
    .substring(0, 60);
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = `cinematic-${type}-${safeName}-${Date.now()}.zip`;
  a.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window }),
  );
  setTimeout(() => window.URL.revokeObjectURL(a.href), 100);

  if (warnings.length > 0) {
    console.warn(`${MODULE_ID} | Export warnings:`, warnings);
  }

  return { success: true, assetCount: idx, warnings };
}

// ── Import ───────────────────────────────────────────

export async function importPreset(expectedType) {
  const JSZip = await loadJSZip();

  const file = await new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".zip,.json";
    input.addEventListener("change", () => resolve(input.files[0] || null));
    input.click();
  });
  if (!file) return { success: false, error: "Cancelled" };

  if (file.name.endsWith(".json")) {
    return _importFromJSON(file, expectedType);
  }

  const zip = await JSZip.loadAsync(file);

  const manifestFile = zip.file("manifest.json");
  let manifest = {};
  if (manifestFile) {
    manifest = JSON.parse(await manifestFile.async("string"));
  }

  if (expectedType && manifest.type && manifest.type !== expectedType) {
    return {
      success: false,
      error: game.i18n.format("CINEMATIC.Export.Error.TypeMismatch", {
        expected: expectedType,
        actual: manifest.type,
      }),
    };
  }

  const presetFile = zip.file("preset.json");
  if (!presetFile) {
    return {
      success: false,
      error: game.i18n.localize("CINEMATIC.Export.Error.InvalidPackage"),
    };
  }

  let presetConfig = JSON.parse(await presetFile.async("string"));

  const timestamp = Date.now();
  const uploadDir = `cinematic-cut-ins-imports/${timestamp}`;

  try {
    await FilePicker.createDirectory("data", "cinematic-cut-ins-imports").catch(
      () => {},
    );
    await FilePicker.createDirectory("data", uploadDir).catch(() => {});
  } catch (err) {
    console.warn(`${MODULE_ID} | Import directory creation note:`, err.message);
  }

  const pathRewrites = {};
  const warnings = [];

  for (const [relPath, entry] of Object.entries(zip.files)) {
    if (!relPath.startsWith("assets/") || entry.dir) continue;
    try {
      const blob = await entry.async("blob");
      const fileName = relPath.replace("assets/", "");
      const result = await FilePicker.upload(
        "data",
        uploadDir,
        new File([blob], fileName),
        {},
      );
      if (result?.path) {
        pathRewrites[relPath] = result.path;
      } else {
        warnings.push(`Upload returned no path: ${fileName}`);
      }
    } catch (err) {
      warnings.push(`${relPath}: ${err.message}`);
    }
  }

  let json = JSON.stringify(presetConfig);
  for (const [zipPath, realPath] of Object.entries(pathRewrites)) {
    json = json.replaceAll(JSON.stringify(zipPath), JSON.stringify(realPath));
  }
  presetConfig = JSON.parse(json);

  return {
    success: true,
    preset: presetConfig,
    manifest,
    assetCount: Object.keys(pathRewrites).length,
    warnings,
  };
}

async function _importFromJSON(file, expectedType) {
  try {
    const text = await readTextFromFile(file);
    const json = JSON.parse(text);

    if (expectedType === "global" && typeof json === "object" && !json.theme) {
      return {
        success: true,
        preset: json,
        manifest: { type: "global-bulk" },
        assetCount: 0,
        warnings: ["Legacy JSON import — no assets bundled"],
      };
    }

    return {
      success: true,
      preset: json,
      manifest: { type: expectedType || "unknown" },
      assetCount: 0,
      warnings: ["Legacy JSON import — no assets bundled"],
    };
  } catch (err) {
    return { success: false, error: `JSON parse error: ${err.message}` };
  }
}
