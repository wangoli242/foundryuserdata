# Factorization audit

Roots: `scripts startups tools`  -  Model: `sonnet`

Clusters: 63  -  factor: 6  -  maybe: 9  -  coincidental: 48

## Worth factoring

### bilinear value noise: sample 4 hash1 corners and mix(mix()) over fractional coords

- **Helper:** `VALUE_NOISE_GLSL (exported string constant containing the full noise(vec2 p) GLSL function)` in `scripts/filters/effects/glsl-utils.js`
- **Effort:** low  -  **Call sites:** 5
- **Notes:** These are almost certainly identical value-noise functions embedded as GLSL strings in JS. Extract the full noise() function body into a shared JS string constant and template-interpolate or concatenate it into each shader source. Risk: if any file's surrounding a/b assignments or hash1 signature differs slightly, verify before merging. Otherwise this is textbook dead-simple extraction.
- **Locations:**
  - `scripts/filters/effects/coldSoak.js:32`
  - `scripts/filters/effects/convectionChurn.js:38`
  - `scripts/filters/effects/fracture.js:60`
  - `scripts/filters/effects/thermalSplit.js:41`
  - `scripts/filters/effects/ventColumn.js:40`

### Dialog cancel button object: fixed icon, localized 'cancel' label, callback resolving promise with null

- **Helper:** `cancelButton(resolve) → { icon, label, callback }` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 5
- **Notes:** The only variable is the `resolve` reference from the enclosing Promise, so the helper just takes resolve as a parameter and returns the plain object. All 5 sites are identical. misc-tools.js already hosts one of the sites and is the natural home for small dialog utilities.
- **Locations:**
  - `scripts/alt-struct/structure.js:687`
  - `scripts/combat/reinforcement.js:54`
  - `scripts/interactive/combat.js:503`
  - `scripts/interactive/combat.js:1281`
  - `scripts/tools/misc-tools.js:1674`

### identical GLSL hash1+vnoise function pair copy-pasted verbatim into every effect shader string

- **Helper:** `VNOISE_GLSL — shared string constant containing hash1 and vnoise GLSL definitions` in `scripts/filters/effects/glsl-common.js`
- **Effort:** medium  -  **Call sites:** 5
- **Notes:** These are GLSL source strings embedded in JS files. A shared JS module can export a VNOISE_GLSL template-literal constant; each shader file imports it and interpolates it into its shader source string. Risk is low if shader string assembly is straightforward (simple concatenation or template literal), but needs verification that all 5 shaders build their source the same way. The flagged 3 lines are just a subset of the real duplication — the full hash1+vnoise block (11 lines) is what should be extracted.
- **Locations:**
  - `scripts/filters/effects/coldSoak.js:31`
  - `scripts/filters/effects/convectionChurn.js:37`
  - `scripts/filters/effects/fracture.js:59`
  - `scripts/filters/effects/thermalSplit.js:40`
  - `scripts/filters/effects/ventColumn.js:39`

### convert degrees to radians and write sin/cos components into this.uniforms.dirV

- **Helper:** `setDirVFromDegrees(uniforms, degrees)` in `scripts/filters/effects/filterUtils.js`
- **Effort:** low  -  **Call sites:** 4
- **Notes:** Identical 3-line idiom across 4 sibling filter files; all operate on the same uniforms.dirV shape. Extract as a standalone function (not a method) so any filter can call it. Watch for cases where the caller may later override dirV[0]/dirV[1] individually — verify no such code follows the snippet before replacing.
- **Locations:**
  - `scripts/filters/effects/guidingLight.js:185`
  - `scripts/filters/effects/noDrift.js:181`
  - `scripts/filters/effects/ricochetLip.js:281`
  - `scripts/filters/effects/slicePlane.js:150`

### Identical GLSL `hash2(vec2)` function body duplicated verbatim in four fragment shader strings

- **Helper:** `HASH2_GLSL (and companion HASH1_GLSL) — exported string constants interpolated into each shader template literal` in `scripts/filters/filter-core.js`
- **Effort:** low  -  **Call sites:** 4
- **Notes:** All four files already `import { customVertex2D, applyCustomFilter } from '../filter-core.js'`, so adding `export const HASH2_GLSL` and `export const HASH1_GLSL` there (hash1 is also byte-for-byte identical across all four) and replacing the inline GLSL definitions with `${HASH2_GLSL}` / `${HASH1_GLSL}` inside the template literals is a minimal, zero-risk change. GLSL has no module system so JS-level string interpolation is the correct mechanism. The hash constants differ between hash1 and hash2 — they are not the same function — so keep them as two separate exported constants.
- **Locations:**
  - `scripts/filters/effects/chromaRot.js:37`
  - `scripts/filters/effects/fracture.js:45`
  - `scripts/filters/effects/openSeams.js:35`
  - `scripts/filters/effects/shatterSeams.js:37`

### bearing setter that stores degrees, converts to radians, and writes sin/cos components into this.uniforms.dirV

- **Helper:** `BearingMixin(Base) — a mixin class providing get/set bearing with the deg→rad→dirV logic` in `scripts/filters/effects/bearingMixin.js`
- **Effort:** medium  -  **Call sites:** 3
- **Notes:** All three setters are byte-for-byte identical including the getter. All three classes extend PIXI.Filter directly with no shared base, so a mixin (BearingMixin(PIXI.Filter)) is the cleanest vehicle — it keeps the property on the instance, avoids exposing _bearing to a free function, and lets each class declaration simply swap `extends PIXI.Filter` for `extends BearingMixin(PIXI.Filter)`. Medium effort because the mixin pattern must be introduced and imports updated in three files, but the logic change per file is minimal.
- **Locations:**
  - `scripts/filters/effects/guidingLight.js:184`
  - `scripts/filters/effects/noDrift.js:180`
  - `scripts/filters/effects/ricochetLip.js:280`

## Maybe / judgment call

### Standard PIXI filter uniform declarations (inputSize, outputFrame, inputClamp) repeated verbatim in every GLSL shader string

- **Helper:** `PIXI_FILTER_UNIFORMS (shared string constant)` in `scripts/filters/effects/shaderCommon.js`
- **Effort:** low  -  **Call sites:** 13
- **Notes:** These are framework-required PIXI.js filter uniforms — boilerplate every PIXI filter shader must declare. Factoring into a shared const string and template-literal-interpolating it into each shader source reduces copy-paste drift if PIXI's required uniforms change, but adds indirection to what developers expect to see inline in shader code. Worth doing only if the filter files already use template literals or a shader-builder pattern; otherwise the cure is marginally worse than the disease.
- **Locations:**
  - `scripts/filters/effects/ablativeCrust.js:20`
  - `scripts/filters/effects/chromaRot.js:24`
  - `scripts/filters/effects/coldSoak.js:14`
  - `scripts/filters/effects/convectionChurn.js:20`
  - `scripts/filters/effects/doubleShell.js:23`
  - `scripts/filters/effects/guidingLight.js:18`
  - `scripts/filters/effects/noDrift.js:19`
  - `scripts/filters/effects/openSeams.js:22`
  - `scripts/filters/effects/ricochetLip.js:28`
  - `scripts/filters/effects/seamBeat.js:25`
  - `scripts/filters/effects/shatterSeams.js:24`
  - `scripts/filters/effects/slicePlane.js:17`
  - `scripts/filters/effects/ventColumn.js:20`

### Standard PixiJS filter uniform declarations (opacity, inputSize, outputFrame) repeated verbatim at the top of every GLSL shader string

- **Helper:** `FILTER_COMMON_UNIFORMS (string constant)` in `scripts/filters/effects/shared.js`
- **Effort:** low  -  **Call sites:** 12
- **Notes:** These are framework-required PixiJS uniforms that every filter shader must declare, making them expected boilerplate rather than accidental duplication. Factoring requires each .js file to import the constant and use template-literal interpolation (e.g. `${FILTER_COMMON_UNIFORMS}`) inside its GLSL string, which is a trivial mechanical change across all 12 files and eliminates the risk of one file diverging (e.g. adding mediump to opacity or changing precision). The main caveat is that inline GLSL is already hard to read; string interpolation adds one more layer of indirection. Worth doing if the codebase already uses other shared GLSL string fragments; skip if shaders are otherwise self-contained.
- **Locations:**
  - `scripts/filters/effects/ablativeCrust.js:19`
  - `scripts/filters/effects/coldSoak.js:13`
  - `scripts/filters/effects/convectionChurn.js:19`
  - `scripts/filters/effects/doubleShell.js:22`
  - `scripts/filters/effects/guidingLight.js:17`
  - `scripts/filters/effects/noDrift.js:18`
  - `scripts/filters/effects/openSeams.js:21`
  - `scripts/filters/effects/ricochetLip.js:27`
  - `scripts/filters/effects/seamBeat.js:24`
  - `scripts/filters/effects/shatterSeams.js:23`
  - `scripts/filters/effects/slicePlane.js:16`
  - `scripts/filters/effects/ventColumn.js:19`

### three co-occurring reaction descriptor properties that mark a self-targeting Quick Action triggered on activation

- **Helper:** `QUICK_ACTION_ON_ACTIVATION (spread constant: `{ triggers: ["onActivation"], onlyOnSourceMatch: true, actionType: "Quick Action" }`)` in `scripts/activations/reactions-registry.js (or a shared constants file imported by both files)`
- **Effort:** low  -  **Call sites:** 6
- **Notes:** The three flagged properties always appear alongside four more identical properties (triggerSelf: true, triggerOther: false, autoActivate: true, outOfCombat: true) at all six sites. Factoring only the three would create an incomplete abstraction; the real win is a 7-property STANDARD_QUICK_ACTION_ON_ACTIVATION constant. However, the two files diverge slightly after that: reactions-registry.js uses `...CODE_INSTEAD` while itemActivations.js uses `activationType: 'code', activationMode: 'instead'` inline, so a single constant cannot absorb the full shape without also reconciling that inconsistency. A shared constant for the 7 common properties is still worthwhile but requires also deciding how to handle the CODE_INSTEAD vs explicit-properties split across the two files.
- **Locations:**
  - `scripts/activations/reactions-registry.js:1548`
  - `scripts/activations/reactions-registry.js:1610`
  - `scripts/activations/reactions-registry.js:1913`
  - `scripts/activations/reactions-registry.js:1928`
  - `startups/itemActivations.js:419`
  - `startups/itemActivations.js:4551`

### initializing the three shared filter uniforms (color, filterMatrix, filterMatrixInverse) in each filter's constructor

- **Helper:** `a shared base class (e.g. FilterBase extends PIXI.Filter) whose constructor initializes these uniforms, replacing extraction of just these 3 lines` in `scripts/filters/effects/filter-base.js`
- **Effort:** medium  -  **Call sites:** 3
- **Notes:** The three constructors share far more than these 3 lines — they identically set _lastTime, zOrder, animated, and call setTMParams/normalizeTMParams, differing only in the fragment shader and _timeSpeed default. Extracting only the 3-line snippet as a standalone helper is low value; the real win is a base class that consolidates the entire shared constructor body. That makes this a 'maybe' rather than a clear 'factor': the snippet is genuinely duplicated, but the right fix is broader than what the cluster flags.
- **Locations:**
  - `scripts/filters/effects/chains.js:113`
  - `scripts/filters/effects/chromaRot.js:102`
  - `scripts/filters/effects/fracture.js:137`

### checking whether a Foundry item is a weapon type

- **Helper:** `isWeaponItem(item) → boolean` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The two implementations differ meaningfully: extra-config-dialog uses an explicit allowlist of known weapon types plus npc_feature check, while hover.js uses a loose substring match on 'weapon'. These may be intentionally different — the dialog version may want strict known types only, while the hover version may want forward-compatible fuzzy matching. Factoring requires choosing one semantic (or adding a parameter), which risks breaking one of the two call sites. Worth consolidating only if the intended logic is verified to be the same.
- **Locations:**
  - `scripts/interactive/extra-config-dialog.js:31` `isWeaponItem`
  - `scripts/tah/hover.js:95` `isWeaponItem`

### compute grid size as a scale factor (gridPixels / 100)

- **Helper:** `getGridScale() => number` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** Both compute the same value but access the grid size via different canvas paths. The aura.js version is more defensive (falls back through canvas.scene.grid.size first). A shared helper should use the more defensive form. Worth factoring if a shared utilities module already exists, but the one-liner nature means the win is modest.
- **Locations:**
  - `scripts/movement/tactical-distance.js:20` `gridScale`
  - `scripts/tools/aura.js:308` `gridScale`

### Remove a module-level ticker callback from canvas.app.ticker and null the reference

- **Helper:** `stopTicker(tickerFn) → null  (returns null so caller does: _tickerFn = stopTicker(_tickerFn))` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The two _tickerFn variables are separate module-level closures, so a shared helper can't zero them out itself — the idiomatic fix is to return null and let callers reassign. The guard styles differ slightly (optional chaining vs explicit check) but are functionally equivalent. Worth factoring only if more ticker-using modules are expected; for exactly two call sites the gain is marginal.
- **Locations:**
  - `scripts/movement/tactical-distance.js:139` `_stopTicker`
  - `scripts/vision/sightlines.js:136` `_stopTicker`

### debounced wheel refresh gated on token/actor ownership, with a setTimeout(..., 100) pattern

- **Helper:** `scheduleWheelRefresh(openToken, changedDoc, docType, refreshFn)` in `scripts/tah/wheel-utils.js`
- **Effort:** medium  -  **Call sites:** 2
- **Notes:** The structure is identical (guard on _openToken, resolve actor from changedDoc based on documentName, clearTimeout+setTimeout 100ms), but each file has its own module-level _openToken and _refreshTimer closures, and the docType check differs ('Item' vs 'ActiveEffect'). Factoring requires either passing those mutable refs in or making them parameters, which adds indirection. Worth doing if a third wheel type appears, but for exactly 2 call sites the shared helper saves little and may obscure the per-module state management.
- **Locations:**
  - `scripts/tah/action-wheel.js:159` `scheduleWheelRefresh`
  - `scripts/tah/status-wheel.js:385` `scheduleWheelRefresh`

### normalize jQuery, find vision tab, bail if missing, resolve tokenDoc, append block, setPosition

- **Helper:** `injectIntoTokenConfigVisionTab(html, app, block: string): void` in `scripts/vision/vision-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The five shared lines (jQuery normalize, tab find, early return, tokenDoc resolution, append+setPosition) are real boilerplate but each site builds entirely different markup (checkboxes vs select). A helper that accepts a pre-built HTML string and handles the scaffolding would save ~5 lines per site with low risk. Not a slam-dunk 'factor' because the payoff is modest and extracting to a shared util adds an import dependency between two otherwise independent vision modules.
- **Locations:**
  - `scripts/vision/tokenBlocksVision.js:189` `_onRenderTokenConfig`
  - `scripts/vision/visionFromEdge.js:752` `_onRenderTokenConfig`

## Coincidental / filtered (48)

- function `apply` in 22 files - scripts/activations/workshop-browser.js:653, scripts/filters/effects/ablativeCrust.js:119, scripts/filters/effects/chains.js:129, scripts/filters/effects/chromaRot.js:119
- repeated snippet x13 - scripts/filters/effects/ablativeCrust.js:21, scripts/filters/effects/chromaRot.js:25, scripts/filters/effects/coldSoak.js:15, scripts/filters/effects/convectionChurn.js:21
- function `dispose` in 4 files - scripts/interactive/canvas-helpers.js:366, scripts/interactive/canvas-helpers.js:428, scripts/interactive/canvas-helpers.js:493, scripts/interactive/move-waypoints.js:35
- function `rebuild` in 4 files - scripts/interactive/canvas-helpers.js:2225, scripts/interactive/movement-reach-highlight.js:133, scripts/tah/item-helpers.js:556, scripts/tah/item-helpers.js:778
- function `clear` in 5 files - scripts/bonuses/duration-widget.js:144, scripts/interactive/move-waypoints.js:31, scripts/interactive/range-pulse-manager.js:95, scripts/interactive/tools/advancedMeasure.js:226
- function `isEnabled` in 5 files - scripts/combat/speed-provider.js:15, scripts/fx/token-ground-shadow.js:19, scripts/movement/elevation.js:65, scripts/tah/tokenStatBar.js:122
- function `open` in 4 files - scripts/tah/bond-panel.js:5, scripts/tah/glossary-panel.js:38, scripts/tah/log-panel.js:19, scripts/tah/status-panel.js:134
- repeated snippet x3 - scripts/activations/reactions-registry.js:1574, scripts/activations/reactions-registry.js:1865, startups/itemActivations.js:1025
- function `place` in 2 files - scripts/interactive/canvas-helpers.js:404, scripts/interactive/canvas-helpers.js:455, scripts/interactive/shape-placement-engine.js:462
- function `clearAll` in 2 files - scripts/interactive/range-pulse-manager.js:108, scripts/movement/tactical-distance.js:185
- function `removeLabel` in 2 files - scripts/interactive/target-shapes.js:160, scripts/movement/tactical-distance.js:179
- function `esc` in 2 files - scripts/activations/api-reference-popup.js:21, scripts/uplink/mirror-card.js:18
- function `rowHtml` in 2 files - scripts/activations/api-reference-popup.js:26, scripts/tools/misc-tools.js:977
- function `update` in 2 files - scripts/activations/flow-wraps.js:196, scripts/bonuses/duration-widget.js:153
- function `commit` in 2 files - scripts/activations/targeting-ui.js:780, scripts/interactive/tools/advancedMeasure.js:2039
- function `applyStatus` in 2 files - scripts/alt-struct/base-rules.js:23, scripts/tah/status-wheel.js:139
- function `toggle` in 2 files - scripts/bonuses/duration-widget.js:42, scripts/interactive/tools/advancedMeasure.js:212
- function `step` in 2 files - scripts/Battelog/intro-terminal.js:544, scripts/seasonal/annual.js:468
- function `log` in 2 files - scripts/bonuses/flagged-effects.js:14, scripts/tools/wreck.js:10
- function `applyMark` in 2 files - scripts/bonuses/flagged-effects.js:1063, scripts/interactive/tools/advancedMeasure.js:793
- function `hasStatus` in 2 files - scripts/bonuses/flagged-effects.js:1396, scripts/combat/overwatch.js:498
- function `enabled` in 2 files - scripts/combat/per-frequency-tags.js:12, scripts/tah/index.js:16
- function `scan` in 2 files - scripts/combat/per-frequency-tags.js:150, scripts/setup/deprecations.js:40
- function `getTokenCells` in 2 files - scripts/combat/terrain-utils.js:12, scripts/tools/wreck.js:378
- function `registerSettings` in 2 files - scripts/combat/speed-provider.js:54, scripts/setup/settings-register.js:26
- function `bind` in 2 files - scripts/interactive/canvas-helpers.js:318, scripts/tah/hud.js:340
- function `unbind` in 2 files - scripts/interactive/canvas-helpers.js:338, scripts/tah/hud.js:419
- function `finish` in 2 files - scripts/interactive/canvas-helpers.js:2107, scripts/interactive/tools/advancedMeasure.js:2541
- function `followTick` in 2 files - scripts/interactive/canvas-helpers.js:2257, scripts/interactive/movement-reach-highlight.js:171
- function `keyHandler` in 2 files - scripts/interactive/cards.js:1072, scripts/interactive/shape-placement-engine.js:558
- function `executeInvade` in 2 files - scripts/interactive/combat.js:1335, scripts/tools/misc-tools.js:2415
- function `paintShape` in 2 files - scripts/interactive/canvas-helpers.js:1627, scripts/interactive/target-shapes.js:97
- function `iconHtml` in 2 files - scripts/interactive/extras-dialog.js:30, scripts/tah/status-wheel.js:232
- function `has` in 2 files - scripts/interactive/range-pulse-manager.js:100, scripts/interactive/tools/advancedMeasure.js:208
- function `setVisible` in 2 files - scripts/interactive/shape-placement-engine.js:185, scripts/interactive/tools/advancedMeasure.js:230
- function `setAreaRange` in 2 files - scripts/interactive/shape-placement-engine.js:621, scripts/interactive/tools/advancedMeasure.js:1481
- function `deriveSaveDc` in 2 files - scripts/interactive/tools/forceCheck.js:25, scripts/tools/misc-tools.js:346
- function `samePosition` in 2 files - scripts/movement/history.js:45, scripts/tools/misc-tools.js:2372
- function `renderContent` in 2 files - scripts/interactive/extra-config-dialog.js:48, scripts/interactive/extras-dialog.js:172
- function `push` in 2 files - scripts/movement/move-tracking.js:368, scripts/movement/reachability.js:46
- function `_isoActive` in 2 files - scripts/movement/iso-elevation-anim.js:8, scripts/movement/token-ruler.js:22
- function `_getIsoState` in 2 files - scripts/movement/tactical-distance.js:31, scripts/tah/tokenStatBar.js:127
- function `hide` in 2 files - scripts/setup/codemirror-hints.js:1197, scripts/vision/visionFromEdge.js:823
- function `show` in 2 files - scripts/setup/codemirror-hints.js:1204, scripts/vision/visionFromEdge.js:810
- function `buildWheelItem` in 2 files - scripts/tah/action-wheel.js:52, scripts/tah/status-wheel.js:270
- function `wheelItems` in 2 files - scripts/tah/action-wheel.js:93, scripts/tah/status-wheel.js:331
- function `_onCreateToken` in 2 files - scripts/vision/lancerDetectionModes.js:1999, scripts/vision/visionFromEdge.js:681
- function `_refreshAll` in 2 files - scripts/vision/laWallLos.js:75, scripts/vision/tokenBlocksVision.js:170
