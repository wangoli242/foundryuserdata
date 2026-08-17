# Factorization audit

Roots: `scripts startups tools`  -  Model: `sonnet`

Clusters: 69  -  factor: 30  -  maybe: 5  -  coincidental: 34

## Worth factoring

### fully suppress a DOM/Foundry event with preventDefault + stopPropagation + stopImmediatePropagation

- **Helper:** `suppressEvent(event)` in `scripts/interactive/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 16
- **Notes:** Identical three-liner across 5 files and 16 sites with no variation. A one-line call to suppressEvent(event) is clearer at each call site and the helper is trivially testable. Low risk: no logic, pure side-effects on the event object.
- **Locations:**
  - `scripts/interactive/shape-placement-engine.js:565`
  - `scripts/interactive/shape-placement-engine.js:574`
  - `scripts/interactive/shape-placement-engine.js:587`
  - `scripts/interactive/shape-placement-engine.js:605`
  - `scripts/interactive/tools/advancedMeasure.js:595`
  - `scripts/interactive/tools/advancedMeasure.js:681`
  - `scripts/interactive/tools/advancedMeasure.js:810`
  - `scripts/interactive/tools/chooseToken.js:1690`
  - `scripts/interactive/tools/chooseToken.js:1706`
  - `scripts/interactive/tools/chooseToken.js:1722`
  - `scripts/interactive/tools/chooseToken.js:1736`
  - `scripts/interactive/tools/knockBackToken.js:482`
  - `scripts/interactive/tools/knockBackToken.js:497`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:227`
  - `scripts/interactive/tools/placeToken.js:638`
  - `scripts/interactive/tools/placeToken.js:653`

### teardown of a range-pulse setup: remove wavePulse ticker, destroy rangeHighlight and pulseGraphic

- **Helper:** `teardownRangePulse(wavePulse, rangeHighlight, pulseGraphic) — removes wavePulse from ticker (null-safe) then calls destroyGraphics on both graphics` in `scripts/interactive/canvas-helpers.js`
- **Effort:** low  -  **Call sites:** 6
- **Notes:** Five of the six sites are byte-for-byte identical. The sixth (canvas-helpers.js:902) additionally removes a followTick first and guards wavePulse with an if — both already handled if the helper does a null-safe remove. The four tool files (chooseToken, moveToken, placeToken, placeZone) each return this triple as the teardown from their build: callback, making them ideal call sites. The helper should be exported from canvas-helpers.js since destroyGraphics and the ticker pattern already live there.
- **Locations:**
  - `scripts/interactive/canvas-helpers.js:886`
  - `scripts/interactive/canvas-helpers.js:971`
  - `scripts/interactive/tools/chooseToken.js:180`
  - `scripts/interactive/tools/moveToken.js:210`
  - `scripts/interactive/tools/placeToken.js:213`
  - `scripts/interactive/tools/placeZone.js:138`

### lazy-init embedButtons array then push an anchor tag with class `alt-struct-flow-button lancer-button`, varying only in data-flow-type, data-actor-id, icon, label, and optional extra data attributes

- **Helper:** `pushEmbedButton(state, flowType, actorUuid, icon, label, extraAttrs = {})` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 6
- **Notes:** All 6 sites share the identical init guard and the same outer HTML shape (class, data-flow-type, data-actor-id, icon, label). The only variation is the flow type string, icon class, label text, and 1–2 optional extra data attributes (data-check-type, data-rem-struct). A single helper that accepts those as parameters eliminates all repetition cleanly. Indentation inconsistency across sites (tabs vs spaces) is cosmetic and not a risk. The helper can live in misc-tools.js or a new scripts/alt-struct/alt-struct-helpers.js if preferred to keep alt-struct concerns co-located.
- **Locations:**
  - `scripts/alt-struct/stress.js:180`
  - `scripts/alt-struct/stress.js:247`
  - `scripts/alt-struct/stress.js:382`
  - `scripts/alt-struct/stress.js:408`
  - `scripts/alt-struct/stress.js:591`
  - `scripts/alt-struct/structure.js:1036`

### registering the three interactive-mode event listeners (pointermove, click, keydown) onto canvas.stage and document

- **Helper:** `registerInteractiveListeners(safeMove, safeClick, safeKey)` in `scripts/interactive/tools/interactive-utils.js`
- **Effort:** low  -  **Call sites:** 5
- **Notes:** All five sites use identical variable names and identical event names/phases; the only variance is the local names of the handler functions, which become parameters. A paired removeInteractiveListeners helper for teardown is likely worthwhile too, as the off() calls probably mirror this same pattern.
- **Locations:**
  - `scripts/interactive/shape-placement-engine.js:630`
  - `scripts/interactive/tools/chooseToken.js:1781`
  - `scripts/interactive/tools/knockBackToken.js:524`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:260`
  - `scripts/interactive/tools/placeToken.js:678`

### register safeMove/safeClick/safeKey handlers onto canvas.stage and document in one block

- **Helper:** `bindStageListeners(safe, moveHandler, clickHandler, keyHandler) → { safeMove, safeClick, safeKey }` in `scripts/interactive/tools/tool-utils.js`
- **Effort:** low  -  **Call sites:** 5
- **Notes:** Pattern is actually 6 lines (including the safe() wrapping assignments) and appears in 5 files — the 4 flagged plus moveToken.js. In knockBackToken/pickSingleTargetToggle/placeToken/moveToken the wrapping is trivial (safe(handler)), so those 4 can use the full helper. chooseToken.js wraps safeMove and safeClick with extra logic before registering, so it can only use a narrower 3-line variant (or pass pre-built handlers in). The helper should return { safeMove, safeClick, safeKey } so each tool's cleanup closure can still .off() them. Main risk: the outer-scope variable assignments (needed for cleanup) must move to destructuring at the call site — easy mechanical change but touches 5 files.
- **Locations:**
  - `scripts/interactive/tools/chooseToken.js:1780`
  - `scripts/interactive/tools/knockBackToken.js:523`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:259`
  - `scripts/interactive/tools/placeToken.js:677`

### safely read a module setting with a false fallback via try/catch around game.settings.get(MODULE_ID, key)

- **Helper:** `getModuleSetting(key, fallback = false)` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 4
- **Notes:** tokenStatBar and tokenStatHint are identical and trivially merged. speed-provider and elevation differ only in the setting key and coercion style (implicit boolean vs !! vs === true), all equivalent. The try/catch pattern is the real duplication. Helper should return !!game.settings.get(MODULE_ID, key) to normalise to boolean consistently. Each call site just passes its own SETTING constant.
- **Locations:**
  - `scripts/combat/speed-provider.js:11` `isEnabled`
  - `scripts/movement/elevation.js:66` `isEnabled`
  - `scripts/tah/tokenStatBar.js:115` `isEnabled`
  - `scripts/tah/tokenStatHint.js:59` `isEnabled`

### disable canvas token interactivity and suppress layer click before an interactive tool operation

- **Helper:** `beginTokenInteractionSuppression() → { prevInteractive, restoreLayerClick }` in `scripts/interactive/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 4
- **Notes:** The three lines are identical across all four sites and form a clear setup pair with a teardown pattern. The helper should return { prevInteractive, restoreLayerClick } so callers can restore state afterward. Confirm that suppressTokenLayerClick() is already importable from a shared location, or co-locate the helper there.
- **Locations:**
  - `scripts/interactive/tools/advancedMeasure.js:767`
  - `scripts/interactive/tools/chooseToken.js:325`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:75`
  - `scripts/interactive/tools/placeToken.js:256`

### Poll every 50ms up to 2000ms for a form element, then call injectButton(state, form)

- **Helper:** `pollAndInject(findForm: () => Element|null, state, onFound?: (form) => void)` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** The only meaningful differences are (1) the form-finder expression and (2) whether injectButton is awaited with .catch — both trivially parameterised. statroll doesn't use .catch so the helper should apply it uniformly or accept an optional error handler. Warning message strings differ but can be standardised or passed as a param.
- **Locations:**
  - `scripts/activations/accdiff-target-button.js:46` `injectWhenReady`
  - `scripts/activations/damage-target-button.js:79` `injectWhenReady`
  - `scripts/activations/statroll-target-button.js:38` `injectWhenReady`

### cancel and clear the single-target picker in one shot

- **Helper:** `cancelAndClearSingleTargetPicker() → void` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites are identical; the conditional guard is part of the pattern. Trivial to extract and reduces the risk of forgetting the clearSingleTargetShape() call in future sites.
- **Locations:**
  - `scripts/activations/accdiff-target-button.js:134`
  - `scripts/activations/damage-target-button.js:194`
  - `scripts/activations/statroll-target-button.js:184`

### Format a stat bonus label as either 'name = val' (replace mode) or 'name ±val' (add mode)

- **Helper:** `formatStatBonusLabel(name, bonus) => string` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites are pure display/rendering with identical two-line logic. Only 'name' differs at the call site (detail-renderers uses bonus.stat ?? bonus.id ?? '' with a 'kind' fallback; the other two use bonus.stat with bonus.stat as fallback), so name is already computed before the snippet — the helper just takes (name, bonus) and encapsulates the statMode check and sign formatting. No behavioral risk.
- **Locations:**
  - `scripts/bonuses/effectManager.js:2414`
  - `scripts/interactive/detail-renderers.js:517`
  - `scripts/tah/status-panel.js:15`

### Full `getBonusDetailStr/String(bonus)` function triplicated across three files — the flagged 3-line snippet is just the most-identical fragment of a completely duplicated display-string formatter for bonus objects

- **Helper:** `getBonusDetailString(bonus) → string` in `scripts/tools/misc-tools.js`
- **Effort:** medium  -  **Call sites:** 3
- **Notes:** The three copies diverge in meaningful ways that must be reconciled before factoring: (1) detail-renderers.js uses `bonus.lid ?? bonus.type` to handle both Lancer-system and LA-custom bonus shapes, while the other two use `bonus.type` only; (2) effectManager.js references the `DAMAGE_CHANGE_TYPE_ALL` constant for the change_type sentinel, while the others hardcode `'all'`; (3) range handling differs significantly — detail-renderers.js parses `range_types`/`weapon_types` maps via an `activeKeys()` helper, effectManager.js uses `bonus.rangeType`/`bonus.rangeMode`, and status-panel.js does the same but more tersely. The detail-renderers.js version is the most evolved and should be the canonical base. Consolidate into a shared helper, normalise the `lid`/`type` lookup and the `DAMAGE_CHANGE_TYPE_ALL` constant, then import it in all three sites.
- **Locations:**
  - `scripts/bonuses/effectManager.js:2420`
  - `scripts/interactive/detail-renderers.js:523`
  - `scripts/tah/status-panel.js:21`

### Format a damage bonus object into a human-readable label string (change_type / replace / add_base / add modes)

- **Helper:** `formatDamageBonusLabel(bonus) → string` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites duplicate the full ~10-line block, not just the flagged 2 lines. The only divergence is effectManager.js uses a DAMAGE_CHANGE_TYPE_ALL constant where the other two hardcode 'all' — the helper should accept or import that constant. The surrounding per-bonus-type dispatch (tag, range, immunity, etc.) also differs per site, so only the damage branch needs extracting.
- **Locations:**
  - `scripts/bonuses/effectManager.js:2432`
  - `scripts/interactive/detail-renderers.js:535`
  - `scripts/tah/status-panel.js:33`

### Hex cube-coordinate rounding (round q/r/s and fix largest-error axis)

- **Helper:** `hexCubeRound(q, r, s) → {q, r, s}` in `scripts/tools/hex-utils.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** Textbook hex cube-round algorithm; all three sites do identical math for the same geometric purpose. Extract the full rounding block (including the dq>dr&&dq>ds / dr>ds branches) into one pure function. Low risk: no side effects, purely arithmetic.
- **Locations:**
  - `scripts/interactive/area-geometry.js:44`
  - `scripts/interactive/tools/chooseToken.js:599`
  - `scripts/movement/hex-drag-stabilizer.js:11`

### Create and style a fixed-position `.la-stack-picker` dropdown container div with identical CSS

- **Helper:** `createStackPickerContainer(screenX, screenY) → HTMLDivElement` in `scripts/interactive/canvas-helpers.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites produce identical output — same class, same CSS string verbatim. The helper just takes screenX/screenY and returns the div; callers append children as before. Low risk: no behavioral differences to reconcile, only the inline style template changes.
- **Locations:**
  - `scripts/interactive/canvas-helpers.js:1115`
  - `scripts/interactive/tools/chooseToken.js:1568`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:158`

### Format a damage bonus object into a human-readable label string (handles change_type, replace, add_base, and default modes)

- **Helper:** `formatDamageBonusLabel(bonus) → string` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites duplicate the entire damage-mode block, not just the two flagged lines — the full ~10-line function is identical. Only minor divergence: effectManager.js uses the DAMAGE_CHANGE_TYPE_ALL constant where the other two use the literal 'all'; the shared helper should accept an optional constant or default to 'all'. Extracting removes a meaningful maintenance hazard since the mode strings and formatting logic would otherwise drift independently.
- **Locations:**
  - `scripts/bonuses/effectManager.js:2433`
  - `scripts/interactive/detail-renderers.js:536`
  - `scripts/tah/status-panel.js:34`

### Build and display a fixed-position token-stack popup: container styling, per-token rows (icon+name+check), hover highlight, viewport-edge clamping, and outside-click dismissal

- **Helper:** `createStackPicker(tokens, screenX, screenY, { isActive(token): bool, onPick(token, event): void, onClose(): void }): HTMLElement` in `scripts/interactive/stack-picker.js`
- **Effort:** medium  -  **Call sites:** 3
- **Notes:** All three implementations share identical container cssText, row layout (img+span+check icon), mouseenter/mouseleave highlight, and getBoundingClientRect viewport-clamp logic. Differences are only in the selection-state predicate (callback vs Set.has vs game.user.targets) and the click action — both are trivially injected as callbacks. One caveat: canvas-helpers.js adds an Escape keydown handler that the other two omit; the helper should support an optional onEscape param or let callers register it against the returned element. The row innerHTML uses token.document.texture.src and token.name, which are uniform across all three, so no domain mismatch.
- **Locations:**
  - `scripts/interactive/canvas-helpers.js:1116`
  - `scripts/interactive/tools/chooseToken.js:1569`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:159`

### wrap move/click/key handlers in safe() and register them as canvas pointermove, canvas click, and document keydown listeners

- **Helper:** `registerToolListeners(safe, moveHandler, clickHandler, keyHandler) → { safeMove, safeClick, safeKey }` in `scripts/interactive/tools/interactiveToolUtils.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** The flagged 3 lines are actually part of a 6-line block (lines 521-526, 257-262, 675-680) that is byte-for-byte identical across all three tools. The helper must return {safeMove, safeClick, safeKey} so each tool's doCleanup can still remove the correct listener references. Slight difference: knockBackToken and placeToken follow with startToolHeartbeat, pickSingleTargetToggle does not — but those are separate calls, so they are unaffected by the factoring.
- **Locations:**
  - `scripts/interactive/tools/knockBackToken.js:522`
  - `scripts/interactive/tools/pickSingleTargetToggle.js:258`
  - `scripts/interactive/tools/placeToken.js:676`

### GM guard + combat telemetry flag check + appendEvent call

- **Helper:** `handleRemoteBattlelogEvent(combatId, event)` in `scripts/Battelog/battelog-utils.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three bodies are byte-for-byte identical. The helper is pure delegation with no domain-specific logic, so extracting it loses nothing in clarity.
- **Locations:**
  - `scripts/Battelog/attack-capture.js:111` `handleRemoteAttackEvent`
  - `scripts/Battelog/damage-capture.js:191` `handleRemoteDamageEvent`
  - `scripts/Battelog/damage-capture.js:204` `handleRemoteDamageUndoEvent`

### clear all three attack shape/preview layers in sequence (clearSingleTargetShape → clearAreaTargetShape → clearAttackShapePreview)

- **Helper:** `clearAllAttackShapes() → void` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** All three sites call the exact same three functions in the same order with the same comment rationale ('end session first so area clear's resync is a no-op'). The two accdiff sites and the one damage site are all inside bare try/catch-ignore blocks for the same reason. The only minor variation is that damage-target-button wraps in `if (active)` first, but that guard stays at the call site — the helper is just the three-line clear sequence. Low risk extraction.
- **Locations:**
  - `scripts/activations/accdiff-target-button.js:136`
  - `scripts/activations/accdiff-target-button.js:170`
  - `scripts/activations/damage-target-button.js:196`

### HTML-escape a string (replace &, <, >, ", and optionally ')

- **Helper:** `escapeHtml(str: string): string` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The two implementations differ slightly: tokenStatHint.js also escapes single-quotes (&#39;) while reaction-export-import.js does not. The shared helper should use the broader coverage (include ') since omitting it is a minor HTML-attribute safety gap. Verify reaction-export-import.js output never lands in a single-quote-delimited attribute before merging.
- **Locations:**
  - `scripts/activations/reaction-export-import.js:89` `esc`
  - `scripts/tah/tokenStatHint.js:327` `esc`

### Build and display the overwatch opportunity dialog/chat message for a list of reactors and a target token

- **Helper:** `displayOverwatch(reactors, target) → void` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The two copies are character-for-character identical in logic; only a minor variable name difference (htmlConfig vs html in the render callback). Extract into a shared utility and import it in both reaction.js and overwatch.js.
- **Locations:**
  - `scripts/activations/reaction.js:214` `displayOverwatch`
  - `scripts/combat/overwatch.js:223` `displayOverwatch`

### compute an actor's maximum threat range across all weapons

- **Helper:** `getActorMaxThreat(actor) — canonical version in weapon-bonus-utils.js, delegating to getMaxWeaponRanges_WithBonus` in `scripts/tools/weapon-bonus-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** reaction.js carries an older, manual implementation that lacks bonus awareness; it should be deleted and replaced with an import of the weapon-bonus-utils version. The only behavioural delta to verify is the early-exit condition: reaction.js allows 'pilot' actors while weapon-bonus-utils guards on 'deployable' — confirm the bonus-aware path handles pilots correctly before switching.
- **Locations:**
  - `scripts/activations/reaction.js:284` `getActorMaxThreat`
  - `scripts/tools/weapon-bonus-utils.js:215` `getActorMaxThreat`

### Visualize token threat hexes on the debug canvas (footprint in red, threat range in green)

- **Helper:** `drawThreatDebug(token: Token): Promise<void>` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The two copies are identical except reaction.js calls getActorMaxThreat synchronously while overwatch.js awaits it. Unify by making the shared helper async (await works on non-promises too). Minor variable rename (fp vs footprintCube) is cosmetic only.
- **Locations:**
  - `scripts/activations/reaction.js:333` `drawThreatDebug`
  - `scripts/combat/overwatch.js:295` `drawThreatDebug`

### Read the 'battleLogEnabled' game setting with a safe fallback to false

- **Helper:** `isBattleLogEnabled() => boolean` in `scripts/Battelog/battlelog.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** Identical code, same domain (both in Battelog/), trivial to extract. Export from battlelog.js and import in combat-recorder.js, or put in a shared settings.js utility if one exists.
- **Locations:**
  - `scripts/Battelog/battlelog.js:35` `_battleLogEnabled`
  - `scripts/Battelog/combat-recorder.js:60` `_battleLogEnabled`

### Find the active telemetry-flagged combat containing a given actorId

- **Helper:** `findActiveCombatFor(actorId) => Combat|null` in `scripts/Battelog/battelog-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** Code is byte-for-byte identical across both files. Extract to a shared Battelog utility module and import in both attack-capture.js and damage-capture.js.
- **Locations:**
  - `scripts/Battelog/attack-capture.js:9` `_findActiveCombatFor`
  - `scripts/Battelog/damage-capture.js:29` `_findActiveCombatFor`

### Find an item on an actor by system.lid

- **Helper:** `findItemByLid(actor, lid)` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** deployables.js has an extra actor-or-token unwrapping step that should either be extracted into a separate helper or folded into the shared version as optional pre-processing; the core find logic is identical.
- **Locations:**
  - `scripts/interactive/deployables.js:2906` `findItemByLid`
  - `scripts/tools/misc-tools.js:287` `findItemByLid`

### Return the terrainHeightTools API if the THT module is active, otherwise null

- **Helper:** `thtApi() — no parameters, returns globalThis.terrainHeightTools or null` in `scripts/movement/movement-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** Identical three-line bodies; extracting to a shared module-level helper removes the duplication cleanly. Ensure THT_ID constant is accessible from the shared location.
- **Locations:**
  - `scripts/movement/cost-rules.js:110` `thtApi`
  - `scripts/movement/elevation.js:78` `thtApi`

### Guard on globalThis.terrainHeightTools, convert pixel coords to grid offset, return getHexGroundElevation(j, i) || 0

- **Helper:** `_thtGroundAt(point: {x,y}): number` in `scripts/movement/movement-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The only real differences are (1) the anim file destructures x/y into a point literal — trivially unified to accept a point object — and (2) the anim version wraps in try/catch while the ruler version does not. The shared helper should include the try/catch (the safer default), and the iso-elevation-anim call site simply passes { x, y } instead of the two separate args. Both files already live in scripts/movement/, so a shared movement-utils module keeps cohesion tight.
- **Locations:**
  - `scripts/movement/iso-elevation-anim.js:25` `_thtGroundAt`
  - `scripts/movement/token-ruler.js:923` `_thtGroundAt`

### Look up ISO provider for a token, check isTokenDisabled, and return the {reverseRotation, reverseSkewX, reverseSkewY, counterScale} object (or null)

- **Helper:** `getIsoStateForToken(token) → {reverseRotation, reverseSkewX, reverseSkewY, counterScale} | null` in `scripts/tools/iso-tools.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** The feature-enabled guard differs between the two sites (one uses isIsoFeatureEnabled(), the other uses game.settings.get with a try/catch), so each call site keeps its own guard and calls getIsoStateForToken only after passing it. The helper encapsulates only the shared tail: provider lookup, isTokenDisabled check, and object construction.
- **Locations:**
  - `scripts/movement/tactical-distance.js:10` `_getIsoState`
  - `scripts/tah/tokenStatBar.js:127` `_getIsoState`

### Cube-coordinate rounding for hex grids (identical 9-line algorithm)

- **Helper:** `cubeRound(q, r, s) => {q, r, s}` in `scripts/tools/hex-utils.js`
- **Effort:** low  -  **Call sites:** 2
- **Notes:** Bodies are byte-for-byte identical. Extract to a shared hex-utils module and import in both files. The fallback name in hex-drag-stabilizer suggests it was copied precisely because the shared version wasn't accessible at the time.
- **Locations:**
  - `scripts/interactive/area-geometry.js:42` `cubeRound`
  - `scripts/movement/hex-drag-stabilizer.js:9` `_cubeRoundFallback`

## Maybe / judgment call

### constant pair activationType:"code"/activationMode:"instead" always co-occur as the activation descriptor header before an activationCode function body

- **Helper:** `codeActivation(fn: AsyncFunction): {activationType, activationMode, activationCode}` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 20
- **Notes:** The two constant properties are always paired and carry no per-site variation, so a tiny factory removes noise. However the function signature itself (triggerType, triggerData, reactorToken, item, activationName, api) also repeats but cannot be abstracted away since each body differs — the helper only sheds 2 property lines per site. Worth doing if the file already uses a consistent object shape for registrations; skip if entries are ever extended with additional per-activation keys that would break a spread-based approach.
- **Locations:**
  - `scripts/activations/reactions-registry.js:243`
  - `scripts/activations/reactions-registry.js:400`
  - `scripts/activations/reactions-registry.js:445`
  - `scripts/activations/reactions-registry.js:583`
  - `scripts/activations/reactions-registry.js:1035`
  - `scripts/activations/reactions-registry.js:1115`
  - `scripts/activations/reactions-registry.js:1166`
  - `scripts/activations/reactions-registry.js:1298`
  - `scripts/activations/reactions-registry.js:1353`
  - `scripts/activations/reactions-registry.js:1409`
  - `scripts/activations/reactions-registry.js:1452`
  - `scripts/activations/reactions-registry.js:1479`
  - `scripts/activations/reactions-registry.js:1500`
  - `scripts/activations/reactions-registry.js:1724`
  - `scripts/activations/reactions-registry.js:1780`
  - `scripts/activations/reactions-registry.js:1809`
  - `scripts/activations/reactions-registry.js:1825`
  - `scripts/activations/reactions-registry.js:1960`
  - `scripts/activations/reactions-registry.js:2051`
  - `scripts/activations/reactions-registry.js:2071`
  - `scripts/activations/reactions-registry.js:2088`
  - `startups/itemActivations.js:360`
  - `startups/itemActivations.js:821`
  - `startups/itemActivations.js:952`
  - `startups/itemActivations.js:1058`
  - `startups/itemActivations.js:1437`
  - `startups/itemActivations.js:1473`
  - `startups/itemActivations.js:1616`
  - `startups/itemActivations.js:1675`
  - `startups/itemActivations.js:1710`
  - `startups/itemActivations.js:1805`
  - `startups/itemActivations.js:2005`
  - `startups/itemActivations.js:2213`
  - `startups/itemActivations.js:2272`
  - `startups/itemActivations.js:2417`
  - `startups/itemActivations.js:2504`
  - `startups/itemActivations.js:2587`
  - `startups/itemActivations.js:2941`
  - `startups/itemActivations.js:3234`
  - `startups/itemActivations.js:3263`
  - `startups/itemActivations.js:3312`
  - `startups/itemActivations.js:3342`
  - `startups/itemActivations.js:3412`
  - `startups/itemActivations.js:3560`
  - `startups/itemActivations.js:3585`
  - `startups/itemActivations.js:3717`
  - `startups/itemActivations.js:3852`
  - `startups/itemActivations.js:3994`
  - `startups/itemActivations.js:4028`
  - `startups/itemActivations.js:4095`
  - `startups/itemActivations.js:4202`
  - `startups/itemActivations.js:4250`

### safely read a boolean Foundry VTT module setting with try/catch fallback to false

- **Helper:** `getSettingEnabled(moduleId, key): boolean` in `scripts/tools/misc-tools.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** Members 1 and 2 are clearly the same pattern (try/catch + !! coercion). Member 3 is missing the try/catch guard, which is likely an oversight — factoring would also fix that inconsistency. The helper is trivial but unifies the safe-read pattern across all three feature modules. Only worth doing if the project already has a shared tools/utilities file; otherwise the cure is more overhead than the disease.
- **Locations:**
  - `scripts/combat/per-frequency-tags.js:7` `enabled`
  - `scripts/interactive/presence.js:11` `enabled`
  - `scripts/tah/index.js:12` `enabled`

### Panel teardown + anchor assignment + HUD-relative positioning calculation (topInHud / parentCol / leftInHud) repeated verbatim across all three open() methods

- **Helper:** `positionHudPanel(panel, anchorRow, hudEl) => { top, left } — applies position:absolute CSS and returns coordinates for optional viewport clamping` in `scripts/tah/hud-panel-utils.js (or a shared base class _HudPanel with _resetPanel / _positionPanel instance methods)`
- **Effort:** medium  -  **Call sites:** 3
- **Notes:** The teardown block (stop/remove/null) and anchor assignment are trivial boilerplate; the real win is the parentCol / leftInHud / topInHud calculation which is non-trivial and copy-pasted verbatim in at least glossary-panel and log-panel (status-panel is truncated but almost certainly has it too). However the three open() methods diverge immediately after positioning, so extraction is limited to a helper or base-class method rather than a full shared open(). Risk: status-panel adds viewport-clamping after positioning that the others may not share, so the helper boundary needs care. A lightweight base class with _resetPanel() and _positionPanel() would be cleaner than a standalone util function.
- **Locations:**
  - `scripts/tah/glossary-panel.js:68` `open`
  - `scripts/tah/log-panel.js:53` `open`
  - `scripts/tah/status-panel.js:166` `open`

### Configure a PIXI text label (center-anchor, hidden, add to canvas.stage as non-interactive) — identical 3-line idiom in all three cursor-elevation label setups

- **Helper:** `makeCursorElevLabel(options) → PIXI.Text — creates via makeText, sets anchor(0.5), visible=false, adds to canvas.stage with eventMode='none', returns label` in `scripts/interactive/tools/interactiveToolHelpers.js`
- **Effort:** low  -  **Call sites:** 3
- **Notes:** The 3 flagged lines are byte-for-byte identical in purpose and execution across all three sites. However, the preceding makeText() call differs slightly (chooseToken uses fontSize:16 with align:'center'; the other two use Math.max(14, canvas.grid.size*0.22) without align), so a helper that absorbs only the 3-line idiom saves 6 lines but little cognitive load. The bigger win would be absorbing the full makeText()+setup into makeCursorElevLabel(options) and passing the differing options as a parameter — that reduces a ~6-line block to a single call at all three sites. Worth doing if a shared interactiveToolHelpers module already exists or is being introduced; marginal if it requires creating new infrastructure solely for this.
- **Locations:**
  - `scripts/interactive/tools/chooseToken.js:265`
  - `scripts/interactive/tools/knockBackToken.js:84`
  - `scripts/interactive/tools/moveToken.js:99`

### Filter candidate overwatch reactors by ownership, reaction availability, and faction/disposition hostility toward a moved token

- **Helper:** `getPotentialOverwatchReactors(movedToken, { actorArgs? }) => Token[]` in `scripts/tools/overwatch-utils.js`
- **Effort:** medium  -  **Call sites:** 2
- **Notes:** The disposition-filtering block is nearly identical and clearly worth extracting. However, there are two meaningful divergences: (1) reaction.js passes `.actor` objects to tokenFactions.getDisposition while overwatch.js passes token objects — one is a bug or intentional difference that must be resolved before sharing; (2) the threat-aura predicate differs (inline string compare vs isThreatAura helper) so the caller would need to pass it in or both would need to adopt isThreatAura. The post-filter triggering loop is also very similar but differs in async usage (await getActorMaxThreat in overwatch.js vs sync in reaction.js) and in how startPos is passed to getMinGridDistance. Factoring the reactor-filter step alone into a shared helper is a clear win with medium effort; factoring the full trigger loop requires reconciling the async/sync split first.
- **Locations:**
  - `scripts/activations/reaction.js:74` `checkOverwatch`
  - `scripts/combat/overwatch.js:89` `checkOverwatch`

## Coincidental / filtered (34)

- repeated snippet x29 - scripts/activations/reactions-registry.js:197, scripts/activations/reactions-registry.js:315, scripts/activations/reactions-registry.js:788, scripts/activations/reactions-registry.js:1544
- repeated snippet x12 - scripts/activations/reactions-registry.js:399, scripts/activations/reactions-registry.js:645, scripts/activations/reactions-registry.js:715, scripts/activations/reactions-registry.js:819
- repeated snippet x10 - scripts/activations/reactions-registry.js:30, scripts/activations/reactions-registry.js:314, scripts/activations/reactions-registry.js:787, startups/itemActivations.js:1763
- repeated snippet x7 - scripts/activations/reactions-registry.js:2128, scripts/activations/reactions-registry.js:2173, scripts/activations/reactions-registry.js:2204, scripts/activations/reactions-registry.js:2249
- repeated snippet x5 - scripts/interactive/shape-placement-engine.js:626, scripts/interactive/tools/knockBackToken.js:521, scripts/interactive/tools/moveToken.js:340, scripts/interactive/tools/pickSingleTargetToggle.js:257
- function `dispose` in 3 files - scripts/interactive/canvas-helpers.js:222, scripts/interactive/canvas-helpers.js:272, scripts/interactive/canvas-helpers.js:337, scripts/interactive/shape-placement-engine.js:438
- repeated snippet x5 - scripts/activations/reactions-registry.js:1879, startups/itemActivations.js:2471, startups/itemActivations.js:2623, startups/itemActivations.js:2695
- repeated snippet x5 - scripts/activations/reactions-registry.js:1445, scripts/activations/reactions-registry.js:1493, scripts/activations/reactions-registry.js:1802, scripts/activations/reactions-registry.js:1818
- function `rebuild` in 3 files - scripts/interactive/canvas-helpers.js:934, scripts/interactive/movement-reach-highlight.js:132, scripts/tah/item-helpers.js:375, scripts/tah/item-helpers.js:601
- function `apply` in 2 files - scripts/filters/customFilters.js:195, scripts/filters/customFilters.js:500, scripts/vision/lancerDetectionModes.js:582, scripts/vision/lancerDetectionModes.js:632
- function `has` in 3 files - scripts/combat/overwatch.js:501, scripts/interactive/range-pulse-manager.js:97, scripts/interactive/tools/advancedMeasure.js:274
- function `clear` in 3 files - scripts/interactive/range-pulse-manager.js:92, scripts/interactive/tools/advancedMeasure.js:292, scripts/movement/token-ruler.js:150
- function `injectButton` in 3 files - scripts/activations/accdiff-target-button.js:65, scripts/activations/damage-target-button.js:98, scripts/activations/statroll-target-button.js:56
- function `place` in 2 files - scripts/interactive/canvas-helpers.js:246, scripts/interactive/canvas-helpers.js:299, scripts/interactive/shape-placement-engine.js:463
- repeated snippet x3 - scripts/activations/reactions-registry.js:1472, scripts/activations/reactions-registry.js:1753, startups/itemActivations.js:945
- repeated snippet x3 - scripts/activations/reactions-registry.js:1953, startups/itemActivations.js:814, startups/itemActivations.js:4379
- function `getRollCount` in 2 files - scripts/alt-struct/stress.js:44, scripts/alt-struct/structure.js:45
- function `commit` in 2 files - scripts/activations/targeting-ui.js:592, scripts/interactive/tools/advancedMeasure.js:1318
- function `log` in 2 files - scripts/bonuses/flagged-effects.js:5, scripts/tools/wreck.js:5
- function `getTokenCells` in 2 files - scripts/combat/terrain-utils.js:10, scripts/tools/wreck.js:351
- function `registerSettings` in 2 files - scripts/combat/speed-provider.js:157, scripts/setup/settings-register.js:3
- function `followTick` in 2 files - scripts/interactive/canvas-helpers.js:951, scripts/interactive/movement-reach-highlight.js:170
- function `executeInvade` in 2 files - scripts/interactive/combat.js:1435, scripts/tools/misc-tools.js:1631
- function `clearAll` in 2 files - scripts/interactive/range-pulse-manager.js:105, scripts/movement/tactical-distance.js:97
- function `setVisible` in 2 files - scripts/interactive/shape-placement-engine.js:184, scripts/interactive/tools/advancedMeasure.js:296
- function `renderContent` in 2 files - scripts/interactive/extra-config-dialog.js:32, scripts/interactive/extras-dialog.js:145
- function `setAreaRange` in 2 files - scripts/interactive/shape-placement-engine.js:647, scripts/interactive/tools/advancedMeasure.js:881
- function `removeLabel` in 2 files - scripts/interactive/target-shapes.js:136, scripts/movement/tactical-distance.js:82
- function `_isoActive` in 2 files - scripts/movement/iso-elevation-anim.js:8, scripts/movement/token-ruler.js:28
- function `ensureContainer` in 2 files - scripts/interactive/shape-placement-engine.js:104, scripts/interactive/target-shapes.js:32
- function `hide` in 2 files - scripts/setup/codemirror-hints.js:1092, scripts/vision/visionFromEdge.js:573
- function `show` in 2 files - scripts/setup/codemirror-hints.js:1099, scripts/vision/visionFromEdge.js:560
- function `_onCreateToken` in 2 files - scripts/vision/lancerDetectionModes.js:1100, scripts/vision/visionFromEdge.js:407
- function `_onRenderTokenConfig` in 2 files - scripts/vision/tokenBlocksVision.js:168, scripts/vision/visionFromEdge.js:494
