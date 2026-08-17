# Performance & memory audit

Model: `opus`  -  files with findings: 33  -  total findings: 70

_Advisory only. Check each `risk` note before changing anything._

## High severity (0)

_None._

## Medium severity (32)

### `scripts/activations/targeting-ui.js:403` - listener-leak (confidence: medium)

Delegated change.laTargetBtn handler on $form stacks if buildTargetingUI called multiple times on same form element.

_Accumulates:_ Each re-call of buildTargetingUI (non-AoE branch) adds another relabel listener; each fires resolveWeaponRange on every checkbox change.

_Fix:_ Add $form.off('change.laTargetBtn') immediately before line 403 to remove the prior handler before re-registering.

_Risk:_ Safe; the namespace ensures only this handler is removed. Verify no other code registers under .laTargetBtn.

### `scripts/bonuses/effectManager.js:576` - listener-leak (confidence: high)

$(document).on('click.la-multiselect') added per initLaMultiSelect call (6× per dialog open), never removed on close.

_Accumulates:_ 6 document-level click handlers added each time the Effect Manager is opened; none are removed when it closes.

_Fix:_ In the dialog's close override (~line 3367), add $(document).off('click.la-multiselect') to remove all handlers registered under that namespace.

_Risk:_ If other code outside this dialog uses the same jQuery namespace on document, off() would remove those too. Verify no other module code uses 'click.la-multiselect'.

### `scripts/bonuses/effectManager.js:688` - listener-leak (confidence: high)

$(document).on('change', selector) in setupTriggerUI added 2× per dialog open, never removed on close.

_Accumulates:_ 2 delegated document-level change handlers accumulate per dialog open; they keep firing even after the dialog DOM is destroyed.

_Fix:_ Use a unique namespace, e.g. $(document).on('change.la-em-trigger', selector, fn), and add $(document).off('.la-em-trigger') in the close override.

_Risk:_ Ensure the namespace does not collide with other code. The handler references the dialog's html, so stale invocations are harmless but waste CPU on selector matching.

### `scripts/bonuses/flagged-effects.js:678` - alloc-churn (confidence: medium)

_collapseRemoveDuplicates allocates 3 Map/Set objects per _refreshEffects call, a moderately hot path (hover, selection, movement).

_Fix:_ Reuse module-level Map/Set instances, clearing them at the start of each call instead of allocating new ones.

_Risk:_ Ensure .clear() is called at function entry so stale data never leaks between calls.

### `scripts/bonuses/flagged-effects.js:735` - alloc-churn (confidence: medium)

_collapseAddBadges allocates 3 Map/Set objects per _refreshEffects call, same hot path as above.

_Fix:_ Reuse module-level Map/Set instances, clearing them at function entry.

_Risk:_ Same as above; ensure .clear() at entry.

### `scripts/bonuses/flagged-effects.js:789` - alloc-churn (confidence: medium)

new PIXI.TextStyle created per badge per _refreshEffects call; TextStyle construction is non-trivial.

_Fix:_ Cache a small Map of sizeRatio→TextStyle at module level (bounded by distinct icon sizes, typically 1-3 entries). Invalidate on canvas resize.

_Risk:_ Must invalidate cache if canvas dimensions change (listen for canvasReady or canvasInit to clear).

### `scripts/interactive/shape-placement-engine.js:309` - alloc-churn (confidence: medium)

PIXI.Text objects destroyed and recreated every pointermove for tilted lines; Text is expensive (internal canvas render).

_Fix:_ Pool the cell-label Text children: hide extras and reuse existing ones instead of destroy/recreate each frame. Only destroy surplus on clearCellLabels if count shrinks.

_Risk:_ Reused Text must have all properties (position, text, style) fully overwritten each frame; stale values would show wrong labels.

### `scripts/interactive/target-shapes.js:54` - hot-path (confidence: high)

paintShape clears and redraws every target's Graphics every frame, even when the token has not moved.

_Fix:_ Cache each token's last x/y/width/height; skip clear+redraw in paintShape when position is unchanged.

_Risk:_ Must invalidate cache on grid-size change, token resize, or scene change so marks still update.

### `scripts/interactive/target-shapes.js:62` - hot-path (confidence: medium)

updateLabel calls _hitChanceFor and repositions every label every frame even when nothing changed.

_Fix:_ Only call updateLabel when the underlying hit data or token position has changed (same position-cache approach).

_Risk:_ If hitChanceFor result can change mid-frame without a token move (e.g. buff toggle), a dirty flag or periodic check is safer than pure position caching.

### `scripts/interactive/tools/advancedMeasure.js:215` - alloc-churn (confidence: high)

drawDashed (dashed ticker) allocates a new Set, cells array, and calls perimeterEdges (two Maps, arrays) every frame.

_Fix:_ Cache the perimeter edges and cell list; recompute only when marks array changes (track a dirty/version counter on the store).

_Risk:_ Token movement changes cell positions without mutating the marks array; include a frame-local position check or invalidate on token update too.

### `scripts/interactive/tools/advancedMeasure.js:507` - alloc-churn (confidence: high)

new Set + two spread arrays + targetCells() array allocated every ticker frame while tool is open.

_Fix:_ Cache the Set; rebuild only when store.cells or marks change (dirty flag). Or move to a pre-allocated Set that is cleared and re-filled each frame instead of constructing a new one.

_Risk:_ Ensure the dirty flag is set on every mutation path (addShape, removeAt, toggle mark, token move).

### `scripts/interactive/tools/chooseToken.js:253` - hot-path (confidence: medium)

areaPulseTick redraws every selection highlight every frame via paintSelectionHighlight, even when token hasn't moved.

_Accumulates:_ Cost scales with number of selected tokens; constant per-frame overhead for entire tool lifetime.

_Fix:_ Cache each token's position (x,y) alongside the highlight entry; only call paintSelectionHighlight when the token's position has changed. The alpha pulse already works via entry.graphics.alpha on line 253 and does not require a redraw.

_Risk:_ If a token moves via drag or animation and the position cache isn't invalidated, the highlight will lag. Compare token.document.x/y or token.center each tick.

### `scripts/interactive/tools/chooseToken.js:1450` - alloc-churn (confidence: medium)

clearCellLabels destroys + recreates PIXI.Text objects on every pointermove in cone/line mode with tilt.

_Fix:_ Pool the PIXI.Text labels: hide unused ones instead of destroying, reuse existing ones by updating .text/.x/.y, only create new ones if the pool is exhausted. Destroy pooled texts in doCleanup.

_Risk:_ Pool must handle the case where the number of cells changes between moves. Ensure pooled texts are hidden (visible=false) not just orphaned.

### `scripts/interactive/tools/knockBackToken.js:368` - redundant-work (confidence: high)

getInRangeOffsets recomputed every pointermove but only depends on activeToken and distance, which change only on click.

_Fix:_ Cache the inRangeSet per activeIndex; recompute only when activeIndex changes (in clickHandler / updateVisuals).

_Risk:_ If distance or token position could change mid-drag (unlikely here), the cache would be stale. Invalidate on activeIndex change.

### `scripts/interactive/tools/knockBackToken.js:423` - hot-path (confidence: high)

broadcastToolPresence emits a socket message on every pointermove with no throttle, potentially 60+ times/sec.

_Fix:_ Throttle the broadcastToolPresence call inside moveHandler to ~50-100 ms (e.g. a simple timestamp guard or lodash-style throttle wrapper).

_Risk:_ Other clients will see slightly delayed cursor updates; ensure the final position is always sent (trailing call).

### `scripts/interactive/tools/pickAreaTargetToggle.js:150` - redundant-work (confidence: high)

getInRangeOffsets recomputed every hover despite constant casterToken and castRange for the picker session.

_Fix:_ Compute inRangeSet once before the picker starts (after line 106, guarded by castRange >= 0 && casterToken) and close over it in colorFor.

_Risk:_ Ensure casterToken position does not change mid-pick; if it can, recompute on token update instead.

### `scripts/main.js:927` - hot-path (confidence: high)

`_redrawHoverConnections` runs every tick (~60fps) while hovering, scanning all placeables with `.find`/`.filter` each frame.

_Fix:_ Cache the deployable/partner lookup results and only recompute when `canvas.tokens.placeables` changes (e.g. on token create/delete/update hooks), so the per-frame ticker only redraws the cached lines with the updated `_dashOffset`.

_Risk:_ If the invalidation hook is missed (e.g. a token moves mid-hover), the lines could point to stale positions. Keep a `refreshToken` hook or poll positions from the cached token refs rather than re-querying placeables.

### `scripts/movement/elevation.js:98` - alloc-churn (confidence: high)

new Map built from terrain types every call; terrainTopUnder runs twice per pointer-move during drag via _updateDragDestination.

_Fix:_ Cache typeById outside terrainTopUnder (e.g. module-level, invalidated when terrain types change or rebuilt once per drag-update cycle). Alternatively, accept a pre-built typeById parameter.

_Risk:_ If terrain types are modified mid-drag (unlikely), the cache would be stale. Invalidate on scene change or THT updates.

### `scripts/movement/elevation.js:264` - alloc-churn (confidence: high)

new Map built from terrain types every call; _terrainTopMost is called 1+N times per path recomputation inside getCompleteMovementPathWrapper loop.

_Fix:_ Same as terrainTopUnder: build typeById once per getCompleteMovementPathWrapper invocation and pass it in, or use a shared short-lived cache.

_Risk:_ Same as above—terrain types won't change mid-computation, so a per-invocation cache is safe.

### `scripts/movement/iso-elevation-anim.js:222` - ticker-leak (confidence: high)

Hooks.once consumed by ANY effect ending first, leaving other effects' tickers without hook-based cleanup.

_Accumulates:_ If N effects overlap on a non-iso scene, only the first to end gets its ticker removed via hook; the rest run until container.destroyed self-check fires.

_Fix:_ Replace Hooks.once with Hooks.on and explicitly Hooks.off inside the callback after matching, so each effect's cleanup survives other effects ending first.

_Risk:_ Verify Foundry's Hooks.off signature (needs the hook ID returned by Hooks.on). The self-cleanup at lines 210-214 is a safety net, so the ticker is not permanent, but removing it sooner saves per-frame work.

### `scripts/movement/movement-wheel.js:211` - listener-leak (confidence: medium)

setTimeout(0) defers listener registration; if closeWheel runs before it fires, listeners are added after cleanup and never removed.

_Accumulates:_ Each open-then-immediate-close (e.g. canvasPan fires in the same tick) leaks 4 document/globalThis listeners that persist for the session.

_Fix:_ Guard the setTimeout callback: at its start, check `if (!_wheelEl) return;` before assigning handlers and calling addEventListener.

_Risk:_ None significant; the guard simply skips registration when the wheel was already torn down.

### `scripts/setup/codemirror-hints.js:1077` - listener-leak (confidence: medium)

installLancerHints has no idempotency guard; if called again on the same CM instance, inputRead/cursorActivity/blur handlers accumulate.

_Accumulates:_ Each re-render or re-call adds duplicate event handlers on the same CM instance, growing over a session.

_Fix:_ Set a flag on the cm instance (e.g. cm._lancerHintsInstalled = true) and return early if already set, preventing duplicate handler registration.

_Risk:_ If the caller intentionally re-installs with a different `kind`, the guard would block it; use a kind-aware flag or remove old handlers first.

### `scripts/setup/codemirror-hints.js:1089` - listener-leak (confidence: medium)

Each _installLancerSignatureTooltip call registers new cursorActivity/blur/focus handlers with independent tip closures; duplicates fight.

_Accumulates:_ Repeated calls create parallel tooltip systems, each appending its own DOM element to document.body on cursor move.

_Fix:_ Guard with a flag on cm (e.g. cm._lancerSigTipInstalled) or store/remove prior handlers before re-registering.

_Risk:_ If the cm instance is reused across different editor contexts, ensure the flag is reset when the old context is torn down.

### `scripts/setup/codemirror-hints.js:1149` - listener-leak (confidence: medium)

cm.addOverlay called without removing prior overlay; repeated installLancerHints calls stack overlays and their per-token callbacks.

_Accumulates:_ Each call adds another overlay whose token function runs on every visible token during rendering.

_Fix:_ Store the overlay object on cm (e.g. cm._lancerArgOverlay) and call cm.removeOverlay on the old one before adding a new one.

_Risk:_ Ensure removeOverlay is called with the same object reference that was passed to addOverlay.

### `scripts/setup/lancer-modif.js:199` - listener-leak (confidence: medium)

onShow wrapper chains if tippy instance persists across re-renders (Svelte sheets reuse DOM). Each render adds another closure layer.

_Accumulates:_ One extra closure + setTimeout per render of the actor sheet, compounding on every menu open.

_Fix:_ Tag the tippy instance after wrapping (e.g. tippyInstance._laDisabledPatched = true) and skip if already tagged. This makes wrapping idempotent.

_Risk:_ If the tippy instance is replaced but the DOM element is reused and the tag persists on a stale reference, the new instance would not get patched. Verify that tippy recreation clears the flag or use a WeakSet keyed on the instance.

### `scripts/tah/statbar/state.js:16` - unbounded-growth (confidence: low)

_lastValues Map keyed per token; entries may never be removed when tokens are deleted or scenes change.

_Accumulates:_ One entry per token that ever appeared; survives scene changes if not cleared externally.

_Fix:_ Clear _lastValues (and _fadeState, _flashingTokens, _overlayHubs) on scene teardown / canvasTearDown, if not already done in another file.

_Risk:_ Cleanup may already exist in a sibling file that calls .clear() on scene change; verify before adding duplicate cleanup.

### `scripts/tah/statbar/state.js:18` - unbounded-growth (confidence: low)

_fadeState Map keyed per token; same accumulation risk as _lastValues across scene changes.

_Accumulates:_ One entry per token that triggered a fade; never pruned in this file.

_Fix:_ Same scene-teardown clear as above.

_Risk:_ Fade animations in progress could be interrupted if cleared at the wrong time; clear only on full scene tear-down.

### `scripts/tah/statbar/state.js:19` - unbounded-growth (confidence: low)

_overlayHubs Map likely keyed per token; PIXI display objects stored here are never removed in this file.

_Accumulates:_ One hub per token; if not pruned on token delete or scene change, both the Map entry and PIXI objects persist.

_Fix:_ On scene teardown, iterate _overlayHubs, destroy each hub's PIXI children, then clear the Map.

_Risk:_ Hubs may already be destroyed by their owner; double-destroy on a PIXI object is safe but verify no external code retains references.

### `scripts/tah/tokenStatBar.js:2584` - hot-path (confidence: high)

Per-pixel color interpolation and individual drawRect calls every frame for overshield animation; osW can be 50-100+ iterations.

_Fix:_ Replace per-pixel loop with 2-3 wider gradient bands or a single tinted sprite whose tint shifts each frame, cutting draw calls from O(osW) to O(1).

_Risk:_ Visual fidelity of the shimmer effect will be slightly coarser; verify the animation still reads as a sweep.

### `scripts/tah/tokenStatHint.js:1361` - hook-leak (confidence: medium)

5 Hooks (hoverToken, controlToken, deleteToken, canvasTearDown, updateToken) lack a re-entry guard, unlike the guarded hooks below.

_Accumulates:_ Each call to initTokenStatHint adds 5 duplicate hook handlers; the guarded hooks at 1401/1430 suggest re-entry was considered possible.

_Fix:_ Add a module-level `_hookedCore` guard (like `_hookedPan`) around lines 1361-1398, or merge all hook registrations under a single guard.

_Risk:_ If initTokenStatHint is provably called only once, the guard is harmless but unnecessary. Verify the call site.

### `scripts/vision/lancerDetectionModes.js:493` - alloc-churn (confidence: high)

When debug enabled, `_drawLosDebug` creates O(edges + viewers*targets) PIXI.Text objects every call, destroyed and re-created on each refreshToken.

_Fix:_ Pool or reuse PIXI.Text objects: keep a list on `_losDebugLayer`, update text/position/style in place, hide unused ones, only create new ones when needed.

_Risk:_ Must reset text content and visibility correctly; stale labels could appear if pool management is wrong.

### `scripts/vision/lancerDetectionModes.js:1253` - hot-path (confidence: high)

`refreshToken` fires per-token per-frame during animations; each call fully redraws debug overlay, redundant with sightRefresh.

_Fix:_ Debounce or batch `_drawLosDebug` with a requestAnimationFrame guard so at most one redraw per frame, e.g. `let _losDebugDirty=false; function _scheduleLosDebug(){if(!_losDebugDirty){_losDebugDirty=true;requestAnimationFrame(()=>{_losDebugDirty=false;_drawLosDebug();})}}`.

_Risk:_ Debug overlay may lag one frame behind a token move; acceptable for a diagnostic tool.

## Low severity (38)

### `scripts/activations/damage-target-button.js:11` - unbounded-growth (confidence: low)

_formulaBounds Map caches every unique formula string forever, never cleared or bounded.

_Accumulates:_ One entry per unique damage formula encountered across all rolls in the session.

_Fix:_ Add a size cap (e.g. if (_formulaBounds.size > 500) _formulaBounds.clear()) before inserting, or use a small LRU.

_Risk:_ In practice unique formulas are likely few; clearing the cache only costs a re-evaluation on next access, so risk is minimal.

### `scripts/activations/reaction-manager.js:2953` - listener-leak (confidence: high)

document-level mousemove listener added each time trigger ref popup opens, never removed.

_Accumulates:_ Each open of the trigger data reference popup adds a new mousemove listener on document that persists after popup removal.

_Fix:_ Store the mousemove and mouseup handlers as named functions; remove them in the close button handler, in the toggle-off path (line 2858-2860), and in a close() override on ReactionEditor.

_Risk:_ Ensure all removal paths (close button, toggle, editor close) consistently call removeEventListener with the same handler references.

### `scripts/activations/reaction-manager.js:2961` - listener-leak (confidence: high)

document-level mouseup listener added each time trigger ref popup opens, never removed.

_Accumulates:_ Each open of the trigger data reference popup adds a new mouseup listener on document that persists after popup removal.

_Fix:_ Same fix as the mousemove listener: store handler, removeEventListener on all teardown paths.

_Risk:_ Same as above; must use the exact same function reference for add and remove.

### `scripts/activations/reaction-manager.js:2985` - dom-leak (confidence: high)

Trigger ref popup appended to document.body is not removed when ReactionEditor closes.

_Accumulates:_ One orphaned popup div per ReactionEditor close (if popup was open). Also leaves the leaked document listeners from above.

_Fix:_ Override close() on ReactionEditor to call this._triggerRefPopup?.remove() and clean up the associated document listeners.

_Risk:_ Ensure super.close() is still called; check that _triggerRefPopup is nulled out to avoid double-remove.

### `scripts/activations/reactions-engine.js:28` - alloc-churn (confidence: high)

new Set created every createItem hook call with the same static values as line 87.

_Fix:_ Share the same module-level constant as the line-87 fix.

_Risk:_ None; same static list.

### `scripts/activations/reactions-engine.js:87` - alloc-churn (confidence: high)

new Set created every call to getReactionItems, which runs once per token per trigger event.

_Fix:_ Hoist the Set to a module-level constant (like COMBAT_INHERENT_TRIGGERS on line 16) and reuse it.

_Risk:_ None; the Set contents are static literals.

### `scripts/activations/reactions-engine.js:350` - redundant-work (confidence: high)

Allocates a new array and uses .includes() instead of the existing COMBAT_INHERENT_TRIGGERS Set at line 16.

_Fix:_ Replace `combatInherentTriggers` with `COMBAT_INHERENT_TRIGGERS` and use `.has()` instead of `.includes()`.

_Risk:_ Verify the two lists are identical (they are: both contain onEnterCombat, onExitCombat, onTurnStart, onTurnEnd, onRoundStart).

### `scripts/activations/reactions-engine.js:613` - unbounded-growth (confidence: low)

_laConfigWarnedSet only grows, never cleared; keys include token/item identifiers that change across sessions.

_Accumulates:_ One entry per unique (warning-type, lid, reactionPath) combo encountered; in practice bounded by registered reactions.

_Fix:_ Clear the set on the existing lancer-automations.clearCaches hook, or when combat ends.

_Risk:_ After clearing, warnings will re-fire once per key; this is likely acceptable and may even be desirable.

### `scripts/bonuses/flagged-effects.js:197` - alloc-churn (confidence: high)

META_KEYS Set is re-created on every _sameIdentity call; should be a module-level constant.

_Fix:_ Hoist `const META_KEYS = new Set([...])` to module scope so it is created once.

_Risk:_ None; the set contents are static literals.

### `scripts/combat/actor-change-hooks.js:6` - unbounded-growth (confidence: medium)

previousHeatValues Map grows per unique actor.id, never pruned when actors are deleted.

_Accumulates:_ One entry per actor that ever changed heat; deleted actors leave orphan entries.

_Fix:_ Add a Hooks.on('deleteActor', (actor) => { previousHeatValues.delete(actor.id); previousHPValues.delete(actor.id); }); alongside the existing hooks.

_Risk:_ None — deleteActor fires after deletion, so the cleanup is safe. Verify the hook name matches the Foundry version used.

### `scripts/combat/actor-change-hooks.js:7` - unbounded-growth (confidence: medium)

previousHPValues Map grows per unique actor.id, never pruned when actors are deleted.

_Accumulates:_ One entry per actor that ever changed HP; deleted actors leave orphan entries.

_Fix:_ Same deleteActor hook as above covers both Maps.

_Risk:_ Same as above.

### `scripts/fx/statusFX.js:1242` - redundant-work (confidence: medium)

isFXEnabled() calls getConfig() twice per EFFECT_MAP entry (24 entries per token), each allocating a spread copy.

_Fix:_ Call getConfig() once at the top of _doReconcileStatusFX and pass the config object to isFXEnabled/isMasterEnabled, or cache it in a local.

_Risk:_ Ensure the cached config is not mutated; currently getConfig() returns a fresh spread each time so callers may rely on that.

### `scripts/interactive/canvas-helpers.js:602` - alloc-churn (confidence: medium)

Range<=1 pulse path allocates a new array and spreads all ring cells into it every animation frame.

_Fix:_ Pre-flatten the ringCells array once in the outer closure (beside the `rings` variable) and reuse it each tick.

_Risk:_ Must update the pre-flattened array when `rings` is reassigned (the originToken-move branch); keep both in sync.

### `scripts/interactive/canvas-helpers.js:957` - alloc-churn (confidence: medium)

posKey() called every frame allocates a new array via .map() and joins it, even when nothing moved.

_Fix:_ Cache each entry's sub-key in a small array updated only when _originPosKey changes, or build the string with a loop instead of .map().join().

_Risk:_ Ensure the cached key still detects point-origin and token-origin changes correctly.

### `scripts/interactive/combat.js:919` - dom-leak (confidence: medium)

Detail popup DOM element survives dialog close if user right-clicks then confirms/cancels without re-right-clicking.

_Accumulates:_ One orphaned popup element per dialog open-rightclick-close cycle; same pattern at lines 1104, 1225, 1398.

_Fix:_ In each dialog's close callback (or Foundry Dialog close option), call e.g. $('.la-weapon-detail-popup').remove() to clean up any lingering popup.

_Risk:_ Ensure the close/destroy hook fires reliably in Foundry's Dialog lifecycle; test that popups are still shown correctly during normal use.

### `scripts/interactive/deployables.js:564` - unbounded-growth (confidence: medium)

_deployableInfoCache is never cleared, unlike the sibling caches cleared on clearCaches hook at line 553.

_Accumulates:_ One entry per unique deployable LID queried via getDeployableInfo; grows across scene changes and re-imports.

_Fix:_ Add `_deployableInfoCache.clear();` inside the existing `Hooks.on('lancer-automations.clearCaches', ...)` callback at line 553.

_Risk:_ None; cache is lazily repopulated on next access, same pattern as the two caches already cleared there.

### `scripts/interactive/target-shapes.js:81` - alloc-churn (confidence: medium)

getOccupiedOffsets allocates an array every frame per hex-grid target inside the ticker.

_Fix:_ Cache the offsets array per token (invalidate on position change) or reuse a scratch array.

_Risk:_ getOccupiedOffsets may be shared utility; caching must account for token size/position changes.

### `scripts/interactive/tools/advancedMeasure.js:1174` - listener-leak (confidence: medium)

makeIconDropdown adds document mousedown listener on open; if renderToolbar rebuilds DOM while open, close() is never called.

_Accumulates:_ One orphaned document mousedown listener per re-render while dropdown is open; self-cleans on next mousedown but can stack briefly.

_Fix:_ Track the current onOutside handler at module scope or in a WeakMap; remove it at the start of renderToolbar before replaceChildren.

_Risk:_ Ensure the removal still runs the full close() side-effects (un-hiding sibling popovers) or those become unnecessary after replaceChildren.

### `scripts/interactive/tools/chooseToken.js:1291` - alloc-churn (confidence: medium)

placedPresenceCells and placedPresenceLabels allocate arrays via flatMap/map on every pointermove broadcast.

_Fix:_ Cache placedPresenceCells/Labels results and invalidate only when placements change (place/remove/recompute), instead of recomputing on every pointer move.

_Risk:_ Must invalidate cache in every code path that mutates placements or their graphics/labelLayer.

### `scripts/interactive/tools/haseContest.js:74` - redundant-work (confidence: medium)

paintMark clears and redraws both token marks every animation frame even when tokens have not moved.

_Fix:_ Cache each token's x/y/width/height (and grid type) and skip the clear+redraw in paintMark when unchanged. The alpha pulse on line 68 already works without redrawing.

_Risk:_ If a token moves via drag without a document update (mid-drag), the cached position could lag. Compare against token.document.x/y which is what paintMark already reads.

### `scripts/interactive/tools/haseContest.js:87` - alloc-churn (confidence: medium)

getOccupiedOffsets allocates a new array of offset objects every animation frame per token inside the ticker.

_Fix:_ Addressed by the same position-cache guard above: skip paintMark entirely when position is unchanged, eliminating the per-frame allocation.

_Risk:_ Same as above; ensure the cache invalidates when position changes.

### `scripts/interactive/tools/knockBackToken.js:97` - alloc-churn (confidence: medium)

presenceData creates several new arrays and objects per call; invoked every pointermove via broadcastToolPresence.

_Fix:_ Throttling the broadcast (line 423 fix) removes most of the churn. Alternatively, reuse/mutate a persistent data object.

_Risk:_ If presenceData's returned object is stored externally by reference, mutating it in place could cause stale reads. Verify broadcastToolPresence copies or consumes immediately.

### `scripts/interactive/tools/knockBackToken.js:371` - redundant-work (confidence: medium)

getOccupiedGridSpaces called every pointermove; other tokens rarely move during this interaction.

_Fix:_ Cache the result and invalidate only on activeIndex change or a token update hook. Less critical than getInRangeOffsets.

_Risk:_ If another token moves while the tool is active the cache would be stale; a Hooks.on('updateToken') invalidation covers this.

### `scripts/interactive/tools/pickAreaTargetToggle.js:114` - alloc-churn (confidence: medium)

New Set created on every hover call inside updateHitLabels.

_Fix:_ Reuse a module-level or closure-scoped Set, calling .clear() at the start of each invocation instead of allocating a new one.

_Risk:_ Must ensure the Set is cleared before each use; straightforward.

### `scripts/interactive/tools/pickAreaTargetToggle.js:151` - alloc-churn (confidence: high)

Spreads Set into array solely to call .some(); unnecessary allocation on every hover.

_Fix:_ Iterate the Set directly: use a for-of loop with early return, or call result.affected.forEach-based check, avoiding the spread.

_Risk:_ None; purely mechanical replacement.

### `scripts/interactive/tools/placeToken.js:585` - alloc-churn (confidence: medium)

presenceData() called on every pointermove allocates new arrays via flatMap/map/getProtoOffsets for all placements.

_Fix:_ Cache presenceData placement cells; recompute placed cells only when placements array changes, not on every pointer move.

_Risk:_ Ensure cache is invalidated when placements are added/removed/reordered and when range or elevation changes.

### `scripts/main.js:892` - alloc-churn (confidence: high)

Each tick creates new arrays via `.filter()`, `.find()`, and a `partnerUuids` array inside `_redrawHoverConnections`.

_Fix:_ Hoist reusable arrays to module scope and repopulate them in-place (or cache results as above), eliminating per-frame allocations that pressure the GC.

_Risk:_ Minimal; just ensure the cached array is cleared when hover ends to avoid retaining stale token references.

### `scripts/movement/iso-elevation-anim.js:126` - alloc-churn (confidence: high)

Large object literal (15+ props, nested objects) allocated every refreshToken call, discarded immediately when debug is off.

_Fix:_ Guard the call site: wrap lines 126-144 in `if (globalThis._laIsoDebugOn)` so the object is never constructed when debugging is off.

_Risk:_ None; debug behavior is identical since _laIsoDebug already early-returns when the flag is off.

### `scripts/movement/iso-elevation-anim.js:157` - alloc-churn (confidence: medium)

_isoElevationDelta allocates a new {x,y} object every refreshToken call during movement.

_Fix:_ Inline the computation (token.mesh.position.x += bumpState.value * scale; y -= ...) or reuse a module-level scratch object.

_Risk:_ Minimal; ensure the scratch object is not leaked into other code paths if reused.

### `scripts/setup/codemirror-hints.js:919` - alloc-churn (confidence: high)

new RegExp constructed on every _hint call (each keystroke) from a dynamic but session-stable string.

_Fix:_ Cache the RegExp per kind (e.g. in a module-level Map keyed by triggerObj) since the pattern does not change after init.

_Risk:_ Minimal; just ensure the cache key accounts for all inputs that affect the pattern.

### `scripts/tah/consume-feedback.js:7` - unbounded-growth (confidence: medium)

_lastConsume entries for deleted items are never pruned until next scene change via canvasReady.

_Accumulates:_ Each item deleted mid-scene leaves orphaned uuid keys; grows if items are repeatedly created and destroyed on one scene.

_Fix:_ Add a Hooks.on('deleteItem', (item) => { for (const type of Object.keys(RESOURCE_FIELDS)) _lastConsume.delete(`${item.uuid}:${type}`); }) inside initConsumeFeedback.

_Risk:_ Ensure deleteItem hook fires with a valid item.uuid; if the item is re-created with the same uuid the first update will silently seed instead of showing feedback, which matches current behavior for unknown prev.

### `scripts/tah/hud.js:722` - listener-leak (confidence: high)

`unbind()` never disconnects `_favResizeObserver`; holds strong ref to removed c1 DOM subtree until next `_render()`.

_Accumulates:_ Does not accumulate (at most one leaked), but delays GC of prior column DOM between unbind and next bind.

_Fix:_ In `unbind()`, add: `this._favResizeObserver?.disconnect(); this._favResizeObserver = null;`

_Risk:_ None; the observer is re-created in every `_render()` call which already calls `disconnect()` before creating a new one.

### `scripts/tah/hud.js:1079` - listener-leak (confidence: high)

`unbind()` never removes `_favDocHandlers` (mousemove+click on document); handler fires every pointer move while HUD is closed.

_Accumulates:_ Does not accumulate (at most one set leaked), but persists from first use until next `bind()`, keeping prior render-scope DOM alive via closure.

_Fix:_ In `unbind()`, add: `if (this._favDocHandlers) { document.removeEventListener('mousemove', this._favDocHandlers.move); if (this._favDocHandlers.click) document.removeEventListener('click', this._favDocHandlers.click, true); this._favDocHandlers = null; }`

_Risk:_ Verify the favorites hover/click still works after re-bind; the listeners are re-added in `_render()` so this only affects the unbound state.

### `scripts/tah/sound.js:56` - alloc-churn (confidence: high)

SFX lookup table is re-created as a new object on every non-throttled playUiSound call (hover, targeting, etc.).

_Fix:_ Hoist the SFX object to module scope as a constant, alongside TOKEN_FEEDBACK_VARIANTS and MIN_GAP.

_Risk:_ None — the object is purely static data with no closures over local state.

### `scripts/tah/tokenStatBar.js:2797` - unbounded-growth (confidence: medium)

_lastValues Map is set per token but never cleared on scene change; sweepLancerTokens clears _overlayHubs but not _lastValues.

_Accumulates:_ One snapshot object (~10 fields + extras sub-object) per unique token ID across every scene visited in the session.

_Fix:_ Add `_lastValues.clear();` inside sweepLancerTokens alongside the existing `_overlayHubs.clear()` call (around line 4019).

_Risk:_ First actor update after scene change won't diff against a previous snapshot, so no flash fires for the initial state — matches existing first-draw behavior.

### `scripts/tah/tokenStatHint.js:955` - alloc-churn (confidence: medium)

Two `new PIXI.Point` allocations every call to tokenScreenRect, which runs on every canvasPan while popup is visible.

_Fix:_ Reuse a module-level pair of PIXI.Point objects (e.g. `const _pt1 = new PIXI.Point(); const _pt2 = new PIXI.Point();`) and call `.set(x,y)` before `toGlobal`.

_Risk:_ Ensure toGlobal does not store a reference to the passed Point; PIXI's toGlobal returns a new Point by default so reuse of the input is safe.

### `scripts/tools/aura.js:9` - unbounded-growth (confidence: low)

callbackCache Map grows with each unique function source string; entries are never pruned or evicted.

_Accumulates:_ One entry per distinct lambda source passed to createAura over the session; bounded by unique sources, so growth is slow.

_Fix:_ Not urgent. If desired, clear entries in deleteAuras by tracking which sources belong to which owner, or add a max-size eviction policy.

_Risk:_ Clearing a cache entry while the aura still exists would break the libWrapper intercept for that aura's macro callback.

### `scripts/vision/lancerDetectionModes.js:1475` - hot-path (confidence: medium)

Per-frame ticker scans `token.children` with `find()` for every placed token to locate the overlay mesh.

_Fix:_ Cache the overlay mesh as `token._laSilhouetteMesh` when created; check that reference instead of `find()`.

_Risk:_ Must clear the cached reference when the mesh is destroyed or the token is removed; check in `destroy()` path.
