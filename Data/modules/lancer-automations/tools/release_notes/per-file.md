# Release change notes

Base: `4.0.3`  -  Model: `opus`  -  Reviewed: 152  -  Verify-corrected: 47  -  Errored: 0

## Attack & Targeting

### `scripts/activations/accdiff-target-button.js` - modified - refactor - internal

Replaces inline polling logic with a shared `pollForForm` helper and consolidates three separate shape-clearing calls (`clearSingleTargetShape`, `clearAreaTargetShape`, `clearAttackShapePreview`) into a single `clearAllAttackShapes` call.

_Details:_ Removed unused imports (`clearSingleTargetShape`, `clearAreaTargetShape`) and replaced them with the new consolidated `clearAllAttackShapes` and `pollForForm` utilities from the targeting-ui module.

### `scripts/activations/damage-target-button.js` - modified - refactor - internal

Replaces inline polling loop with shared `pollForForm` utility and consolidates three separate shape-clearing calls (`clearSingleTargetShape`, `clearAreaTargetShape`, `clearAttackShapePreview`) into a single `clearAllAttackShapes` call.

### `scripts/activations/reaction.js` - deleted - removal - user-facing - BLOG - CORRECTED

Removed the Overwatch/Reaction reminder system that detected when a hostile token moved within threat range and alerted the owning player via dialog or chat message. Also removed the threat-range debug hex visualization tool.

_Details:_ The deleted file contained: checkOverwatch (triggered on token movement to detect overwatch opportunities using Grid Aware Auras or fallback distance calculation), displayOverwatch (popup dialog or chat whisper alerting players to reaction opportunities with click-to-select-reactor functionality), drawThreatDebug (hex-grid threat range visualization), and helpers to extract reaction-tagged items from mechs/pilots. It referenced the 'reactionReminder' setting and used Token Factions module integration for disposition checks.

_Changelog:_ Removed the built-in Overwatch/Reaction reminder system (threat-range movement alerts and debug visualization).

_Settings/API:_ `reactionReminder`

_Verify fixed:_ Added mention of Token Factions module integration in details; Slightly expanded changelog to mention debug visualization removal alongside alerts

### `scripts/activations/statroll-target-button.js` - modified - feature - user-facing - BLOG

Adds a live hit-chance label on the canvas when making stat/skill rolls, showing the probability of success against the current or hovered target. Also supports contest rolls by computing win chance against the opponent.

_Details:_ Introduces rollerLiveChance() which derives a real-time success probability function based on accuracy/difficulty, target evasion, or contest opponent stats. The chance label is created via createChanceLabel and displayed while the stat-roll dialog is open, updating as the user hovers different tokens. Also replaces the manual polling loop with the shared pollForForm utility.

_Changelog:_ Added live hit-chance labels on the canvas during stat and skill rolls

### `scripts/activations/targeting-ui.js` - modified - improvement - user-facing - BLOG

Adds HASE success-chance and contest-win-chance calculation helpers for skill checks, a setting-gated chance-labels toggle, a utility to clear all attack shapes at once, and a poll-for-form helper. Also fixes auto-start targeting to scope the target button search to the correct row instead of the whole form.

_Details:_ New exported functions: haseSuccessChance (computes hit probability for a HASE/grit roll vs a DC, accounting for stunned/impaired/bolster statuses and NPC tier), contestWinChance (probability that actor A's roll beats actor B's), chanceLabelsOn (reads the 'haseChanceLabels' setting), clearAllAttackShapes (clears single-target, area, and preview shapes), and pollForForm (polls DOM for a HUD form before injecting). The maybeAutoStart fix narrows the target-button query from the whole form to the specific weapon row, preventing the wrong button from being auto-clicked when multiple weapons are present. Variable renames ($tg→$toggleRow, lbl→keyLabel) are cosmetic.

_Changelog:_ Added HASE success-chance labels for skill checks and fixed auto-start targeting picking the wrong button when multiple weapons are present

_Settings/API:_ `haseChanceLabels`

### `scripts/interactive/canvas.js` - modified - internal - internal

Re-exports the new `createChanceLabel` function from target-shapes.js through the canvas module's public API barrel file.

_Settings/API:_ `createChanceLabel`

## Automation Engine

### `scripts/activations/api-reference-popup.js` - added - feature - user-facing - BLOG

Adds a new draggable "Function Reference" popup panel for activation editors, letting users browse and search all available API functions organized into curated groups (attacks, effects, bonuses, tokens, etc.) with links to documentation.

_Details:_ The popup displays curated collapsible groups covering triggerData helpers, attacks & rolls, activations, effects, bonuses, cards & choices, tokens & canvas, HUD actions, flags, and queries. It includes a live search box that filters across all entries by name or summary, shows return types and argument signatures, and links to external documentation pages. The panel is draggable and closable.

_Changelog:_ Added an in-editor API function reference popup with searchable, categorized listing of all available automation functions.

### `scripts/activations/flow-steps-extra.js` - modified - improvement - user-facing

Adds support for injecting bonus damage (not just tags and bonuses) from an attack flow into its spawned damage flow. Also simplifies comments and renames a variable for clarity.

_Details:_ The pullInjectedTagsFromAttack step now also picks up injectedDamage from ActiveFlowState.current and merges it into state.data.damage, allowing attack-phase automations to add extra damage dice that carry through to the damage roll. Other changes are comment shortening and renaming tDoc to tokenDoc.

_Changelog:_ Added support for injecting bonus damage from attack flows into their damage rolls.

### `scripts/activations/flow-steps.js` - modified - refactor - user-facing - CORRECTED

Major refactor of flow step handlers to eliminate duplicated boilerplate via shared `runCancellableStep` and `attackActionData`/`techActionData` helpers. Also adds a generic `_relaunchIgnore` that re-launches any flow type (not just hardcoded ones), wires up action overlay combat execution on activations, and improves action name resolution for TalentFlow, BondPowerFlow, and end-of-activation scenarios.

_Details:_ Cancellable steps (onPreDamage, onPreStructure, onStructure, onPreStress, onStress, onInitCheck, onInitAttack, onInitTechAttack) now use a unified `runCancellableStep` helper instead of inline cancel-function boilerplate. Attack and tech action data construction is deduplicated into `attackActionData` and `techActionData`. The `_relaunchIgnore` function replaces hardcoded flow-type checks with a generic `game.lancer.flows.get()` lookup, supporting any flow type and preserving `_cancelledBy` and `la_extraData` across re-launches. `_buildCancelFn` now supports `choice2Text: null` to drop the second button. `onActivationStep` gains action overlay combat execution via `getActionOverlay` + `executeExtraActionCombat`, and better action name resolution for TalentFlow ranks, BondPowerFlow powers, and end-activation items. The `onPreDamage` step is now cancellable (previously it fired the trigger but returned `true` unconditionally), and its `actionName` now uses the weapon name directly for better source-matching.

_Changelog:_ Damage rolls can now be prevented by cancel-damage reactions (onPreDamage is now properly cancellable). Activations automatically execute extra combat actions defined by action overlays. Improved action name display for Talent and Bond Power activations. The 'Ignore' button on cancelled flows now works for all flow types, not just a hardcoded list.

_Verify fixed:_ Added that onPreDamage is now properly cancellable (previously always returned true, ignoring cancellation) - this is a user-facing fix/feature; Added that onPreDamage actionName changed to use weapon name for better source matching; Added the generic _relaunchIgnore Ignore button improvement to changelog since it's user-facing (previously failed for unlisted flow types); Expanded changelog to cover all user-facing changes

### `scripts/activations/reaction-manager.js` - modified - feature - user-facing - BLOG

Adds Workshop integration to the Reaction Manager, including a new Workshop tab that lazy-loads a browser, workshopId tracking on reactions and startup scripts, dirty-tracking with unsaved-changes confirmation in the Reaction Editor, an API Reference popup button, bond power support in the item action picker, and expanded trigger-help signatures with new fields like hitTokens, flowState, cancel/change move confirmations, deployable context, and reroll parameters. Also strips workshopId from legacy exports and removes the old monolithic importReactions method in favor of the selective applyImportSelection flow.

_Details:_ Key changes: (1) New stripWorkshopIds utility ensures exported configs stay workshop-agnostic. (2) Old importReactions method deleted entirely. (3) Workshop tab bootstrapped on demand from workshop-browser.js. (4) Reaction Editor now tracks dirty state, shows a save spinner, and prompts Save/Discard/Keep Editing on close. (5) API Reference popup toggled via openApiRefPopup. (6) Bond items now expose their powers in the action picker. (7) NPC feature ranks and traits now appear as selectable actions themselves (not just sub-actions). (8) workshopId is preserved through save/update and used for deduplication. (9) Trigger help strings updated with hitTokens, flowState, isUndo, isModified, deployable, reactionJustConsumed, extraData, and richer cancel/reroll signatures. (10) closeOnSubmit set to false on the editor so it stays open after saving. (11) Help dialog text typos fixed and API doc link updated.

_Changelog:_ Added Workshop integration for sharing and installing community automations, unsaved-changes protection in the Reaction Editor, an API Reference popup, bond power support, and significantly expanded trigger context data across all hooks.

### `scripts/activations/reactions-engine.js` - modified - improvement - user-facing - CORRECTED

Adds bond items to the reaction-eligible item types, normalizes a hitTokens list on trigger data for consistent downstream use, and enriches all debug-auto skip/candidate log messages with structured context (setting name, value, reasons) for easier troubleshooting.

_Details:_ Bond items are now scanned for reactions. A normalized `hitTokens` array is built from targets/target before reaction evaluation begins, ensuring consistent data shape. All dbgAuto messages now include structured metadata (which setting caused a skip, current values, usage counts, etc.). The trigger telemetry log now includes a `payload` field listing all data keys. Minor variable renames (r→reaction, u→user, a→action) for readability.

_Changelog:_ Added bond items as a source of reactions and improved reaction-engine debug logging with structured context for each skip reason.

_Verify fixed:_ Added mention of the new `payload` key in trigger telemetry logging (handleTrigger), which was omitted from details

### `scripts/activations/reactions-ui.js` - modified - internal - internal

Trivial cleanup: renames short callback parameter names (m->entry, a->action) and removes a redundant comment in the reactions UI code.

### `scripts/activations/workshop-browser.js` - added - feature - user-facing - BLOG - CORRECTED

Adds a new Workshop Browser that lets users browse a community GitHub repository of shared automations, packs, and startup scripts, preview them, and import selected entries directly into their local Lancer Automations configuration.

_Details:_ The browser fetches the repository tree from GitHub, lists contributors and their files, renders List.md descriptions with interactive controls, shows status badges (NEW/UPDATE/OK/BROKEN) comparing remote files against locally installed automations, and supports bulk importing of individual automations, startup scripts, and multi-entry packs. Users can preview entries in the existing ReactionEditor/StartupScriptEditor before importing. Packs are handled via a dedicated dialog listing each contained item/general/startup entry with per-entry status and selective import.

_Changelog:_ Added a Workshop Browser for browsing and importing community-shared automations, packs, and startup scripts from a public GitHub repository.

_Verify fixed:_ Changed area from 'Interactive Tools' to 'Automation Engine' — the workshop browser is for browsing/importing automations and startup scripts, which is core automation infrastructure, not interactive measurement/drawing tools

### `scripts/interactive/action-overlays.js` - added - feature - user-facing - BLOG - CORRECTED

Introduces an action-overlay system that lets combat data (attack bonus, accuracy, difficulty, damage, range, tags, attack type) be attached to an item's native actions via module flags, surviving system re-imports. Overlays are patch-merged with null/empty-value clearing, and a resolver computes granted action range using add/upgrade/override modes.

_Details:_ Exports getActionOverlays, getActionOverlay, setActionOverlay, removeActionOverlay, resolveGrantedActionRange, and applyActionOverlays. Dot characters in action names are escaped for Foundry flag storage. applyActionOverlays folds stored combat data onto action arrays without overwriting name, activation, or detail fields.

_Changelog:_ Added action-overlay system allowing combat data (attack bonus, accuracy, damage, range, tags) to be attached to native actions and persist through re-imports.

_Settings/API:_ `setActionOverlay`, `getActionOverlay`, `getActionOverlays`, `removeActionOverlay`, `resolveGrantedActionRange`, `applyActionOverlays`

_Verify fixed:_ Changed area from 'Interactive Tools' to 'Automation Engine' — this is core infrastructure for attaching combat data to actions, not an interactive UI tool

### `scripts/main.js` - modified - improvement - user-facing - CORRECTED

Bond power activations now trigger the onActivation automation step (effects, reactions, etc.), the isometric tile tab is reapplied on ready, and `openExtrasDialog` is exposed on the module API. Also includes cosmetic comment cleanup and local variable renames.

_Details:_ Functional changes: (1) BondPowerFlow now gets the lancer-automations:onActivation step inserted after printPowerCard, so bond powers trigger the same automation hooks as other activations. (2) reapplyIsometricTileTab() is imported from integrations/isometric-tile-tab.js and called in the ready hook. (3) openExtrasDialog is added to the public module API object. Everything else is formatting/rename only (`====` comment markers stripped, `HEX` → `HEX_ASPECT`, `c` → `cls`).

_Changelog:_ Bond powers now trigger automation effects (reactions, per-activation bonuses, etc.) like other activation flows.

_Settings/API:_ `openExtrasDialog`

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — BondPowerFlow automation support is a real functional addition; Changed user_facing from false to true — bond power automation and API exposure are visible to users; Changed area from 'Internal / Tooling' to 'Automation Engine' — primary functional change is BondPowerFlow step wiring; Added changelog bullet for bond power automation support

### `scripts/setup/codemirror-hints.js` - modified - improvement - user-facing - CORRECTED

Significantly enriched the CodeMirror autocomplete hints for trigger data fields: every entry now includes return types, summaries, and doc links. Many new trigger payload fields were added (e.g. hitTokens, attackType, tags, actionType, deployType, heatCleared, rollDice, currentHP, maxHP, etc.), cancel functions gained expanded signatures with title/allowConfirm params, and per-trigger field mappings were updated to reflect the actual v4 payloads. New exported helpers (apiDocUrl, getApiEntries, getTriggerHelperEntries) expose the manifest for use by a reference panel.

_Details:_ New trigger fields include: hitTokens, techItem, isInvade, attackType, actionType, tags, deployType, types, hpChange, hpLost, currentHP, maxHP, heatChange, heatCleared, inDangerZone, distanceToMove, elevationToMove, distanceMoved, elevationMoved, rollDice, reactionJustConsumed, checkAgainstToken, targetVal, statName, document, change, options, onHpGain, onHeatLoss, cancelDamage, cancelStructureOutcome, cancelStressOutcome, modifyRoll. Removed 'unlimited' from addGlobalBonus duration options. onTurnStart/onTurnEnd/onEnterCombat/onExitCombat/onDestroyed/onTokenCreated/onTokenRemoved now show no extra fields beyond common ones. flowState and actionData removed from COMMON_TRIGGER_FIELDS and instead listed per-trigger where relevant. reroll and changeRoll gained expanded signatures. onCheck and onInitCheck now expose statName, checkAgainstToken, targetVal instead of the old checkType/checkResult. onActivation/onInitActivation expanded with actionType, actionData, deployable, reactionJustConsumed, extraData. onPreMove now includes isDrag, cancel, distanceToMove, elevationToMove. onDeploy now includes item and deployType instead of deployable alone.

_Changelog:_ Improved the script editor autocomplete to show return types, summaries, and documentation links for all trigger data fields, and added many new payload fields to match v4 triggers.

_Settings/API:_ `apiDocUrl`, `getApiEntries`, `getTriggerHelperEntries`

_Verify fixed:_ Added detail about flowState/actionData moved from common fields to per-trigger listings; Added detail about reroll/changeRoll expanded signatures; Added detail about onCheck/onInitCheck field changes (statName/checkAgainstToken/targetVal replacing checkType/checkResult); Added detail about onActivation/onInitActivation expanded fields; Added detail about onPreMove gaining isDrag, cancel, distanceToMove, elevationToMove; Added detail about onDeploy field changes (added item/deployType, removed deployable from that trigger's specific list)

### `scripts/tools/misc-tools.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds several new utility functions to the misc-tools API (executeSaveVsEffect, attackWith, getTier/tierValue, getFlowFlag/setFlowFlag, consumeOncePerRound) and extends basic/tech attacks to carry injected damage data. Also wires executeExtraActionCombat through executeBasicAttack for consistency and adds playMineDetonationFX import.

_Details:_ executeSaveVsEffect runs parallel save rolls against targets, applying effects on failure with optional half-damage-on-save. attackWith is a convenience wrapper to target tokens and fire a weapon flow with optional auto-reload. getTier/tierValue read clamped NPC tier. getFlowFlag/setFlowFlag read/write per-flow flags. consumeOncePerRound provides a once-per-round gate per subject. executeBasicAttack and executeTechAttack now accept a damage array injected into flow state. executeTechAttack also now supports injected tags. executeExtraActionCombat now delegates to executeBasicAttack and passes action.damage. Contested checks now pass contest metadata (opponent actor UUID and stat) into each roll's extra data.

_Changelog:_ Added new automation helpers: save-vs-effect rolls, attackWith convenience wrapper, tier utilities, per-flow and once-per-round gates, and injected damage on basic/tech attacks

_Settings/API:_ `api.playMineDetonationFX`, `api.executeSaveVsEffect`, `api.attackWith`, `api.getTier`, `api.tierValue`, `api.getFlowFlag`, `api.setFlowFlag`, `api.consumeOncePerRound`

_Verify fixed:_ Added detail about executeTechAttack now also injecting tags (not just damage); Added detail about executeContestedCheck passing contest metadata (opponent actorUuid and stat) into each roll

### `templates/reaction-config.html` - modified - feature - user-facing - BLOG - CORRECTED

Adds a new "Workshop" tab to the reaction config UI and marks Workshop-imported reactions/groups with a cloud icon badge showing their workshop ID.

_Details:_ A new tab with a globe icon is added to the reaction manager nav. All reaction and group name displays across every tab (custom, defaults, startup) now show a cloud-download icon next to items that have a workshopId. The Workshop tab itself loads with a placeholder and includes styled CSS for rendering markdown listings, tables, file selectors, and fade-in transitions.

_Changelog:_ Added Workshop tab to the reaction manager for browsing and importing community-shared automations; workshop-imported reactions and groups now display a cloud icon badge

_Verify fixed:_ Updated changelog to also mention the visible cloud icon badge on workshop-imported items, which is a distinct user-facing change

## Battle Log

### `scripts/Battelog/combat-telemetry-derive.js` - modified - refactor - internal - CORRECTED

Trivial variable rename from `v` to `statValue` in the awards-building function for readability.

_Verify fixed:_ kind changed from 'internal' to 'refactor' — this is a pure code readability rename, not an internal infrastructure change

### `scripts/Battelog/combat-telemetry-mock.js` - modified - internal - internal

Trivial variable-rename refactor in the combat telemetry mock: short single-letter parameter names (a, b, f, t) replaced with descriptive names (actor, item, combatant, target), and a multi-line comment condensed.

### `scripts/Battelog/recap.js` - modified - refactor - internal

Pure variable-rename refactor in the Battle Log recap UI code. Short parameter names like `a`, `x`, `s`, `p`, `bd`, `n` are renamed to descriptive names (`award`, `entry`, `ser`, `player`, `battleData`, `count`, etc.). A JSDoc comment line was also removed. No logic changes.

### `scripts/Battelog/telemetry-store.js` - modified - internal - internal

Trims and rewrites internal code comments for brevity and renames a local variable from `out` to `telemetry` in `emptyTelemetry()`.

_Details:_ No functional changes. Several multi-line JSDoc and inline comments were condensed to shorter single-line versions, and a local variable was renamed for clarity.

## Bonuses & Effects

### `scripts/activations/flows.js` - modified - fix - user-facing

Flow state persistence now correctly preserves injected damage data across attack flows, preventing it from being discarded when no other extra data matches.

_Details:_ Added a check for `injectedDamage` in the flow state persistence logic, ensuring states with injected damage are not skipped.

_Changelog:_ Fixed injected damage being lost during attack flow state persistence

### `scripts/bonuses/duration-widget.js` - modified - refactor - internal

Extracts the duration-building logic from getDurationConfig into a new exported buildDuration helper function, and renames a local variable from `val` to `durationLabel` for clarity.

_Details:_ The new buildDuration(durationLabel, originID, turnsInput) function encapsulates the permanent/indefinite/turn-based duration object construction so it can be reused elsewhere. No behavioral change.

### `scripts/bonuses/effectManager.js` - modified - improvement - user-facing - CORRECTED

Adds an 'Obstacle (Phasing)' immunity subtype option to the Effect Manager, and fixes the Active Effect Changes example to use a numeric value instead of a string.

_Details:_ A new immunity subtype 'obstacle' (labeled 'Obstacle (Phasing)') is added to the immunity dropdown in the Effect Manager. The Active Effect Changes default example value is corrected from string `"1"` to number `1`. Internally, duplicated duration-building logic is extracted into a shared `buildDuration()` helper imported from duration-widget.js, and `getBonusDetailString` is moved to genericBonuses.js. Several variable renames and minor comment cleanups improve readability.

_Changelog:_ Added Obstacle (Phasing) as a new immunity subtype in the Effect Manager

_Verify fixed:_ Trimmed summary to focus on user-facing changes rather than leading with internal refactors; Trimmed details to not over-emphasize internal refactoring that users won't see

### `scripts/bonuses/flagged-effects.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds several new Effects API helpers for marking tokens, querying effects, and idempotent effect linking. Also adds a `hasStatus` utility and renames the duration label 'unlimited' to 'indefinite' (with backward-compat shim).

_Details:_ New exported functions: `applyMark` (stamp a source-linked effect on targets), `findMarkedTokens` (find tokens carrying a mark from a source), `clearMarks` (remove all marks from a source), `findEffectsOnToken` (return all matching effects with flag filters), `findEffectFrom` (find effect by origin token), `ensureLinkedEffect` (idempotent linkEffectToItem), `hasStatus` (check if token/actor has any of given status ids). The internal `findEffectOnToken` string branch now delegates to `findEffectsOnToken`. Duration label 'unlimited' is silently mapped to 'indefinite'. Variable renamed `hasCustom` -> `customStatusMatch`. JSDoc trimmed/added across multiple functions. `removeEffectsByName` also newly exported on the API.

_Changelog:_ Added new Effects API helpers: applyMark/findMarkedTokens/clearMarks for source-stamped effects, findEffectsOnToken for multi-result queries with flag filters, ensureLinkedEffect for idempotent linking, hasStatus for quick status checks, and exposed removeEffectsByName on the public API. Duration label 'unlimited' renamed to 'indefinite' (old value still accepted).

_Settings/API:_ `api.EffectsAPI.applyMark`, `api.EffectsAPI.findMarkedTokens`, `api.EffectsAPI.clearMarks`, `api.EffectsAPI.findEffectFrom`, `api.EffectsAPI.findEffectsOnToken`, `api.EffectsAPI.ensureLinkedEffect`, `api.EffectsAPI.hasStatus`, `api.EffectsAPI.removeEffectsByName`

_Verify fixed:_ Added mention of the 'unlimited' -> 'indefinite' rename to the changelog bullet, since it is a user-facing behavioral change that was missing from the changelog despite being noted in the summary

### `scripts/bonuses/genericBonuses.js` - modified - improvement - user-facing - CORRECTED

Adds a new `getBonusDetailString` export that produces human-readable one-line descriptions for every bonus type (accuracy, damage, immunity, target_modifier, reroll, etc.), useful for the Effect Manager and status panels. Extracts duplicated MutationObserver HUD-reinject logic into a shared `observeHudReinject` helper. Adds `ensureLinkedBonus` (idempotent variant of `linkBonusToItem`). Exposes `getGlobalBonus`, `ensureLinkedBonus`, and `checkDamageResistances` on the public BonusesAPI. Updates bonus icons to new pill and dice-shield assets. Remaining changes are comment trimming, variable renames (`res`→`resistances`, `d`→`dmg`), and added JSDoc return-type annotations.

_Details:_ getBonusDetailString covers accuracy, difficulty, stat, damage (add/replace/change_type/add_base), tag, range, immunity (effect/damage/resistance/crit/hit/miss/elevation/terrain/obstacle/provoke), target_modifier, and reroll bonus types. observeHudReinject consolidates ~4 near-identical MutationObserver blocks. ensureLinkedBonus deduplicates by bonusData.id before delegating to linkBonusToItem.

_Changelog:_ Added human-readable bonus detail strings in the Effect Manager, an idempotent `ensureLinkedBonus` API, exposed `getGlobalBonus`, `checkDamageResistances`, and `getBonusDetailString` on the Bonuses API, and updated bonus icons for generic items and immunities.

_Settings/API:_ `api.ensureLinkedBonus`, `api.getGlobalBonus`, `api.checkDamageResistances`, `api.getBonusDetailString`

_Verify fixed:_ getBonusDetailString is exported and thus effectively part of the public API surface but was missing from settings_or_api; changelog did not mention the icon changes (pill.svg, dice-shield.svg) which are user-visible

### `scripts/setup/status-effects.js` - modified - feature - user-facing - CORRECTED

Adds new built-in status effects for 'Phasing' and 'Overheated'. Phasing is registered globally if not already present; Overheated is added to the additional statuses list alongside the existing Dazed entry.

_Details:_ Phasing allows moving through other characters but not ending on them. Overheated prevents actions that inflict self-heat (including Overcharge and Heat X Self systems) and removes Overkill from weapons. A comment was added noting that some additional statuses also exist in the prototype pattern groups LCP.

_Changelog:_ Added Phasing and Overheated status effects, making them available without external modules.

_Verify fixed:_ Dazed already existed in the old code and is not new; only a comment was added above it. Removed the claim that Dazed was a new addition.

### `scripts/tools/aura.js` - modified - feature - user-facing - BLOG

Adds `ensureAura` (create-if-not-exists) and `getTokensInAura` API methods, and improves `findAura` to search item-owned auras and use the Grid-Aware Auras token API. `deleteAuras` now defaults to `includeItems: true` for non-Item owners.

_Details:_ ensureAura deduplicates by aura name, making it safe to call repeatedly (e.g. from onInit). getTokensInAura returns the tokens currently standing inside a named aura. findAura now resolves auras on Items directly and uses getTokenAuras when available before falling back to actor flags.

_Changelog:_ Added `ensureAura` and `getTokensInAura` aura API helpers and improved aura lookup to cover item-owned auras.

_Settings/API:_ `api.ensureAura`, `api.getTokensInAura`

### `scripts/tools/weapon-bonus-utils.js` - modified - refactor - internal - CORRECTED

Renames internal variable `mockState` to `bonusState` and adds JSDoc `@returns` type annotations to several exported utility functions in weapon-bonus-utils.

_Details:_ Pure code-quality change: variable rename for clarity and added return-type documentation to getWeaponProfiles_WithBonus, getItemTags_WithBonus, getMaxWeaponRanges_WithBonus, getActorMaxThreat, getSensorRange_WithBonus, getMaxWeaponReach_WithBonus, and getMaxItemRanges_WithBonus. Also slightly shortened the JSDoc summary for getActorMaxReach_WithBonus.

_Verify fixed:_ Changed area from 'Internal / Tooling' to 'Bonuses & Effects' since this file is core bonus/range calculation logic, not tooling

### `startups/personalStuff.js` - modified - improvement - user-facing - CORRECTED

ZDA (Zone of Deadly Approach) aura is now registered as a default general reaction instead of being added via a raw createToken hook. The toggle macro is simplified.

_Details:_ The createToken hook is removed and replaced with a registerDefaultGeneralReactions call that registers 'ZDA Aura' under the 'General (LaSossis)' category, running ensureZDAAura in its onInit for mech/npc/pilot tokens. The toggle macro (window.toggleLancerZDA) is simplified to always ensure the aura exists first then toggle, removing the branching create-then-enable path. Actor type checking uses a Set constant instead of inline array includes.

_Changelog:_ ZDA (Zone of Deadly Approach) aura is now delivered as a default general reaction rather than a raw hook, making it visible in the reactions UI under 'General (LaSossis)'.

_Settings/API:_ `api.registerDefaultGeneralReactions`

_Verify fixed:_ area changed from 'NPC Automations' to 'Bonuses & Effects' — ZDA applies to mechs, NPCs, and pilots, not just NPCs, and is an aura/effect feature; kind changed from 'refactor' to 'improvement' — registering as a default reaction integrates with the module's reaction framework and makes the aura visible in the reactions UI; user_facing changed from false to true — the ZDA aura now appears as a named default general reaction in the reactions UI, which users can see; changelog added — the switch from hook to registered reaction is visible to users

## Combat & Turns

### `scripts/combat/action-limits.js` - modified - feature - user-facing - CORRECTED

Adds support for locking actions by activation type (e.g. quick, full, protocol) in addition to by action name. New item-level 'actionTypeLocks' and actor-level 'lockedActionTypes' flags allow effects and items to broadly restrict categories of actions, with optional exceptions.

_Details:_ Two new exported helpers (getItemActionTypeLocks, getActorActionTypeLocks) check type-based locks from item flags and actor flags respectively. getActionLockInfo now accepts an optional activation parameter and merges type-based locks into its results alongside existing name-based locks.

_Changelog:_ Added support for locking actions by activation type (quick, full, etc.) via item and actor flags, enabling broader action restrictions from effects and items.

_Settings/API:_ `actionTypeLocks (item flag)`, `lockedActionTypes (actor flag)`

_Verify fixed:_ settings_or_api was empty but should list the two new flags (actionTypeLocks item flag, lockedActionTypes actor flag) since they are API surface for automation/macro authors

### `scripts/combat/overwatch.js` - modified - internal - internal

Purely cosmetic rename of local variables (e.g. `disp` → `factionDisposition`, `isTargetBad` → `isTargetHostile`, `a` → `aura`) and minor JSDoc rewording in the overwatch module.

_Details:_ No logic changes; only variable renames for clarity, lambda parameter renames, and comment edits.

### `scripts/combat/per-frequency-tags.js` - modified - fix - user-facing

Fixes per-frequency tag scanning to skip core-active subsystems when evaluating frequency limits, preventing incorrect use-count tracking on subsystems flagged as core-active.

_Details:_ Adds a check for `sub._coreActive` in `scanFreqLimitFromSub`, causing it to return 0 (no limit) for core-active subsystems, same as if the subsystem were null.

_Changelog:_ Fixed per-frequency limit scanning incorrectly applying to core-active subsystems

### `scripts/combat/reinforcement.js` - modified - internal - internal

Removed redundant inline comments from the reinforcement/delayed-appearance code. No logic changes.

## Deployables & Thrown Weapons

### `scripts/interactive/deployables.js` - modified - feature - user-facing - CORRECTED

Adds new `lockActorActionTypes` and `unlockActorActionTypes` API functions that lock/unlock actions by activation type (e.g. Quick, Full, Protocol) rather than by individual action name. Also integrates action overlays into item action retrieval, improves end-activation menu labels and card titles to use custom descriptions, and strips deploy-owner prefix from FX names.

_Details:_ New exported functions `lockActorActionTypes` and `unlockActorActionTypes` allow locking all actions of a given activation type with optional exceptions. `getItemActions` now applies action overlays via `applyActionOverlays`. End-activation cards now use `endActionDescription` as the title (instead of generic 'End <name>') and show `item.system.effect` as the detail instead of the description. The end-activation menu also uses custom descriptions in its labels. Deploy FX calls now strip owner prefix from deployable names via `stripDeployOwner`. Various minor variable renames and comment cleanups.

_Changelog:_ Added action-type locking (`lockActorActionTypes`/`unlockActorActionTypes`) for deployables. End-activation cards and menus now show custom action descriptions. Action overlays are now applied to item actions. Deploy FX no longer includes the owner prefix in the name.

_Settings/API:_ `lockActorActionTypes`, `unlockActorActionTypes`

_Verify fixed:_ Added detail about end-activation card now showing item.system.effect as detail instead of endActionDescription, which the proposed note omitted; Expanded changelog to mention action overlays and deploy FX name stripping, which are user-visible changes the proposed changelog omitted

## Docs

### `README.md` - modified - docs - user-facing

README rewritten for clarity and polish: adds a new Workshop section linking the community automation-sharing repo, cleans up doc table links to use friendly names instead of raw paths, adds horizontal rules between feature sections, trims verbose wording throughout, removes the standalone Support section (Discord link moved earlier), and renames 'Tokenmagic' to 'Token Magic FX'.

_Details:_ New Workshop section points to github.com/Agraael/Lancer-automations-workshop and its Discord channel. Feature-guide and API-reference tables now use short display names instead of file paths. Minor copy-editing throughout (semicolons to periods, trimmed phrases). Standalone Support section at the bottom removed since the Discord link already appears in the 'Where to reach me' section.

_Changelog:_ Added a Workshop section to the README linking the community automation-sharing repository

### `doc/API_COMBAT.md` - modified - docs - user-facing

Documents new API functions (executeSaveVsEffect, attackWith, getTier, tierValue, getFlowFlag, setFlowFlag, consumeOncePerRound) and updates existing combat API docs with corrected signatures and descriptions.

_Details:_ Added full documentation for executeSaveVsEffect (save-or-effect rolls with parallel owner routing), attackWith (programmatic weapon attacks with reload support), getTier/tierValue (tier ladder helpers), getFlowFlag/setFlowFlag (flow state helpers), and consumeOncePerRound (once-per-round gating). Updated getActorMaxThreat and getMaxWeaponRanges_WithBonus from async to sync signatures. Added opts parameter with noFX to executeSkirmish. Noted tags/damage forwarding on executeBasicAttack and executeTechAttack. Minor wording cleanup throughout.

_Changelog:_ Added API documentation for executeSaveVsEffect, attackWith, getTier, tierValue, getFlowFlag, setFlowFlag, and consumeOncePerRound; updated several existing combat API signatures.

_Settings/API:_ `api.executeSaveVsEffect`, `api.attackWith`, `api.getTier`, `api.tierValue`, `api.getFlowFlag`, `api.setFlowFlag`, `api.consumeOncePerRound`

### `doc/API_EFFECTS.md` - modified - docs - user-facing - CORRECTED

Updates the Effects API reference with new documented functions (applyMark/findMarkedTokens/clearMarks, hasStatus, ensureLinkedEffect, ensureLinkedBonus, findEffectsOnToken, findEffectFrom), adds return types to function signatures, and tightens wording throughout.

_Details:_ New API sections documented: applyMark/findMarkedTokens/clearMarks (source-stamped effect lifecycle for Suppress/Engineer's Mark patterns), hasStatus (convenience status check), ensureLinkedEffect and ensureLinkedBonus (idempotent onInit helpers), findEffectsOnToken (multi-match with flag filters), findEffectFrom (originID-based effect lookup). deleteEffect corrected to async with await in examples. Return types added to many function signatures (deleteEffect, deleteAllEffects, executeEffectManager, getGlobalBonuses, getGlobalBonus, addConstantBonus, getConstantBonuses, removeConstantBonus, getLinkedEffects, getLinkedBonuses, getImmunityBonuses, checkDamageResistances, applyDamageImmunities). Prose streamlined throughout. Removed outdated note about checkDamageResistances not being in BonusesAPI. duration option type loosened from literal union to generic string.

_Changelog:_ Added API documentation for applyMark/clearMarks lifecycle, hasStatus helper, ensureLinkedEffect/ensureLinkedBonus idempotent helpers, findEffectsOnToken multi-match query, and findEffectFrom origin lookup

_Settings/API:_ `api.applyMark`, `api.findMarkedTokens`, `api.clearMarks`, `api.hasStatus`, `api.findEffectsOnToken`, `api.findEffectFrom`, `api.ensureLinkedEffect`, `api.ensureLinkedBonus`

_Verify fixed:_ Added findEffectFrom to summary text (was only in settings_or_api); Added detail about deleteEffect examples updated to use await; Added detail about duration option type change from literal union to generic string; Added findEffectFrom to changelog bullet

### `doc/API_HOWTO.md` - modified - docs - internal

Minor documentation improvements to API_HOWTO.md: adds return-type annotations to function signatures, documents the new `ensureAura` helper, clarifies the `owner` parameter description, and tweaks wording.

_Details:_ Return types added to registerDefaultItemReactions, registerDefaultGeneralReactions, createAura, and deleteAuras signatures. The `fn` param type is now a proper arrow-function signature. A new `ensureAura` helper is documented. Minor wording change from 'lambda callbacks' to 'function callbacks'.

_Settings/API:_ `ensureAura`

### `doc/API_INTERACTIVE.md` - modified - docs - user-facing

Updated API_INTERACTIVE.md with new API additions (expires option for placeZone, disposition option for chooseToken, getTokensInAura helper, and three new sugar functions confirmCard/askCard/pickCard), added return-type annotations to function signatures, and cleaned up prose throughout.

_Details:_ New API surface: chooseToken gains `disposition` filter and `range` accepts `"sensors"`. placeZone gains `expires` option for auto-deleting templates on combat events. New `api.getTokensInAura` reads GAA live occupancy. New convenience wrappers `api.confirmCard`, `api.askCard`, `api.pickCard` over startChoiceCard. Many function signatures now show return types in the summary line. Prose edits are mostly semicolons-to-periods and minor wording trims.

_Changelog:_ Added API docs for new `confirmCard`, `askCard`, `pickCard` sugar functions, `getTokensInAura` helper, zone auto-expiry (`expires`), and target-picker `disposition` filter; added return-type annotations throughout the interactive API reference.

_Settings/API:_ `api.confirmCard`, `api.askCard`, `api.pickCard`, `api.getTokensInAura`, `api.chooseToken (disposition param, sensors range)`, `api.placeZone (expires param)`

### `doc/API_ITEMS.md` - modified - docs - internal

Minor punctuation and wording tweaks in the API Items documentation. Semicolons replaced with periods, small phrasing adjustments for consistency.

### `doc/API_MOVEMENT.md` - modified - docs - internal

Minor documentation cleanup in the Movement API reference: added return-type annotations to the function summary line, removed a redundant introductory sentence, and lightly reworded bullet descriptions.

### `doc/API_REFERENCE.md` - modified - docs - user-facing - CORRECTED

Major rewrite of the API reference: adds formal shared type definitions (CancelFunction, CancelMoveFunction, ModifyValueFunction, RerollFunction, ChangeRollFunction, ActivationCallback, actionData, flowState), replaces loose `Object`/`Function`/`Array` types with precise TypeScript-style signatures throughout all trigger data blocks, documents new trigger fields (hitTokens, cancelDamage, rollDice, cancelStructureOutcome, cancelStressOutcome, modifyRoll, flowState on structure/stress, isUndo/isModified on move), renames `token` to `triggeringToken` in onPreMove data, adds the `obstacle` immunity subtype, documents `unlimited` as retired alias for `indefinite`, documents `permanent` duration as surviving Full Repair, converts the activation object and consumption config from code blocks to structured tables with defaults, adds worked examples (Dispersal Shield, Squad Leader accuracy, failed Agility gate), documents `onMessage` callback, `reactionPath`, `item-use` activation type, `Automation` action type, and the `ReactionGroup` wrapper, updates `debugActivation` to return an Object summary and accept an optional label parameter, and includes a full `registerDefaultItemReactions` example.

_Details:_ New trigger data fields: onPreDamage gains hitTokens and cancelDamage; onStructureResult/onStressResult gain rollDice, cancelStructureOutcome/cancelStressOutcome, modifyRoll, flowState; onStructure/onStress gain flowState; onPreMove gains isUndo/isModified and renames `token` to `triggeringToken`. New immunity subtype 'obstacle' for phasing. `permanent` duration now documented as surviving Full Repair. Callback signatures consolidated into a table adding onInit and onMessage. `debugActivation` updated: returns Object summary, accepts optional label string. Activation object converted to table with new fields: reactionPath, onInit, onMessage, item-use activationType, Automation actionType. ReactionGroup type documented. Flow flag best practice changed from direct la_extraData mutation to api.setFlowFlag/getFlowFlag.

_Changelog:_ Expanded the API reference with formal type definitions, new trigger fields (cancelDamage, modifyRoll, rollDice, onMessage), structured tables for activation and consumption config, and worked examples.

_Settings/API:_ `api.setFlowFlag`, `api.getFlowFlag`, `api.registerDefaultItemReactions`, `api.applyMark`, `api.chooseToken`, `api.debugActivation`, `api.sendMessageToReactor`

_Verify fixed:_ Added missing onPreMove `token` → `triggeringToken` rename to summary and details; Added missing `permanent` duration surviving Full Repair to summary and details; Added missing `debugActivation` signature update (returns Object, gains label param) to summary and details; Added `flowState` on onStructure/onStress (not just result triggers) to details; Added `api.sendMessageToReactor` to settings_or_api (referenced in onMessage field description)

### `doc/API_SPATIAL.md` - modified - docs - internal

Minor copy-editing tweaks to API_SPATIAL.md: shortened phrases, fixed Markdown escaping for pipe characters in absolute-value notation, and replaced semicolons with periods.

### `doc/API_TOKEN_DISPLAY.md` - modified - docs - internal

Minor punctuation and link cleanup in the Extra Bars API documentation. Semicolons replaced with periods and a redundant cross-reference link removed.

### `doc/AUTOMATION_SYSTEM.md` - modified - docs - internal - CORRECTED

Documentation-only edits to AUTOMATION_SYSTEM.md: adds a note explaining the legacy 'reaction' naming convention, updates code examples to use the new `askCard` API instead of `startChoiceCard`, removes the deprecated `"before"` timing option (only `"after"` and `"instead"` remain), fixes the external registration examples to use `registerDefaultItemReactions`/`registerDefaultGeneralReactions` instead of the old `registerExternal*` names, and applies minor punctuation/wording cleanup throughout.

_Details:_ Key semantic doc changes: (1) New callout box explaining that 'reactions' in the internals means 'activations'. (2) True Grit example rewritten to use `api.askCard()` with `owner` instead of `api.startChoiceCard()` with manual choices. (3) `"before"` timing value removed from the table; any non-`"instead"` value now lands in `"after"`. (4) Section B examples corrected from `registerExternalItemReactions`/`registerExternalGeneralReactions` to `registerDefaultItemReactions`/`registerDefaultGeneralReactions`.

_Settings/API:_ `api.askCard`, `api.startChoiceCard (removed)`, `api.registerDefaultItemReactions`, `api.registerDefaultGeneralReactions`, `api.registerExternalItemReactions (removed)`, `api.registerExternalGeneralReactions (removed)`

_Verify fixed:_ settings_or_api: added the removed/replaced API names (startChoiceCard, registerExternalItemReactions, registerExternalGeneralReactions) since the doc explicitly documents their removal/rename

### `doc/MACROS.md` - modified - docs - internal

Trivial formatting edits to the macros documentation: added horizontal-rule separators between sections and a minor rewording of the Ram macro description.

### `doc/feature/ATTACK_TARGETING.md` - modified - docs - internal

Formatting-only edits to the Attack & Targeting feature doc: adds horizontal rules between sections, breaks long sentences at semicolons into separate sentences, and documents the new 'ruler' button on the measure toolbar.

_Details:_ The only substantive content addition is a short paragraph describing the measure toolbar's ruler button, which toggles distance labels from the reference token with a line-of-sight indicator. All other changes are punctuation/formatting (replacing semicolons with periods, adding --- section dividers).

### `doc/feature/AUTOMATION_ENGINE.md` - modified - docs - internal

Expands the Automation Engine documentation with new sections on changing built-in automations, debugging with debugActivation(), and sharing automations via the Workshop, plus formatting improvements.

_Details:_ Adds a 'Changing a built-in automation' section explaining how to disable, edit, or copy built-in automations. Adds a 'Debugging what you get' section documenting triggerData.debugActivation() and its API equivalent. Adds a 'Sharing automations' section covering Copy/Paste, Export/Import packs, and the Workshop tab for browsing community-shared automation files. Also adds horizontal rule separators between sections and minor punctuation fixes.

_Settings/API:_ `api.debugActivation`

### `doc/feature/BATTLE_LOG.md` - modified - docs - internal

Reformats the Battle Log documentation by breaking dense paragraphs into bullet lists and adding horizontal rule separators between sections.

_Details:_ No content changes; purely formatting improvements for readability.

### `doc/feature/EFFECTS_AND_BONUSES.md` - modified - docs - internal

Trivial formatting edits to the Effects & Bonuses documentation: semicolons replaced with periods, long paragraphs split, and horizontal rules added between sections for readability.

### `doc/feature/FX_AND_SOUNDS.md` - modified - docs - internal

Reformats the FX & Sounds documentation page for readability: breaks dense paragraphs into bullet lists, adds horizontal rules between sections, and switches one video embed from a relative path to an absolute GitHub URL.

### `doc/feature/GAMEPLAY_AUTOMATION.md` - modified - docs - internal

Formatting-only edits to the Gameplay Automation doc: adds horizontal rules between sections, breaks long paragraphs into shorter ones, and replaces semicolons with periods for readability. One new paragraph documents the existing `revealStatsWithoutScan` setting.

_Details:_ The only non-formatting addition is a short paragraph explaining `revealStatsWithoutScan`, which turns off the scan gate so stats show without running a scan.

_Settings/API:_ `revealStatsWithoutScan`

### `doc/feature/HUD.md` - modified - docs - internal

Trivial formatting changes to the Token Action HUD documentation: replaces semicolons with periods in several sentences and adds horizontal rule (---) separators between sections.

### `doc/feature/INFECTION.md` - modified - docs - internal

Reformats the Infection feature documentation by breaking long paragraphs into shorter ones and adding horizontal rules between sections. No content changes.

### `doc/feature/INTERACTIVE_TOOLS.md` - modified - docs - internal - CORRECTED

Formatting and readability improvements to the Interactive Tools documentation: adds horizontal rules between sections, breaks long dense paragraphs into shorter ones, and fixes minor punctuation. Also corrects 'Blast / Cone / Line' to 'Blast / Burst / Cone / Line' for zone types and adds a tip about attaching behaviour to hand-placed templates via TemplateMacro.

_Details:_ Adds Burst to the zone type list. Adds a new sentence about skipping the API for one-off effects by placing a template by hand and using TemplateMacro. All other edits are paragraph splits, added --- separators, and semicolons replaced with periods.

_Verify fixed:_ MISSED: new paragraph about placing templates by hand and attaching behaviour via TemplateMacro for one-off effects (a user-relevant tip, though the doc remains non-user-facing overall)

### `doc/feature/ISOMETRIC.md` - modified - docs - internal

Minor formatting cleanup in the Isometric documentation: splits a long paragraph, adds horizontal rules between sections, and tweaks one sentence.

### `doc/feature/MOVEMENT.md` - modified - docs - internal

Adds horizontal rule separators between sections in the Movement feature documentation for improved readability. Also splits one long paragraph into two shorter ones and fixes minor punctuation.

### `doc/feature/MOVEMENT_ADVANCED.md` - modified - docs - internal

Rewrites the advanced movement documentation to simplify the source-patch instructions from two patches down to one, clarifies that pathfinding and splits now use a Token#createTerrainMovementPath wrap instead of requiring a core edit, and adds horizontal-rule separators between sections.

_Details:_ The old doc described two Foundry source patches (modifyPlannedMovement hook and splitMovementPath fix). The new version explains that LA now wraps Token#createTerrainMovementPath natively, removing the need for the first patch entirely and keeping only the splitMovementPath patch for hex-grid edge cases. Minor copy edits throughout.

### `doc/feature/NPC_EXAMPLES.md` - modified - docs - internal

Updates the NPC automation examples doc to reflect renamed API methods (startChoiceCard→pickCard/askCard, applyFlaggedEffectToTokens→applyEffectsToTokens, chooseToken filter/range changes), the new zone `expires` option replacing manual flag-based cleanup, the `api.tierValue` helper, renamed variables from *Reaction to *Automation, and a duration label change from 'unlimited' to 'indefinite'.

_Details:_ Key API changes documented: `startChoiceCard` split into `pickCard` (returns picked entry or null) and `askCard` (yes/no confirm); `chooseToken` now accepts `range: 'sensors'` and `disposition: 'friendly'` instead of manual range lookup and filter callback; `placeZone` gains `expires: { on: 'ownerTurnStart' }` eliminating the need for a separate cleanup reaction and actor flags; `api.tierValue(token, [v1,v2,v3])` replaces manual tier branching. The Smoke Launchers example is dramatically simplified from two reactions to one.

_Settings/API:_ `api.pickCard`, `api.askCard`, `api.applyEffectsToTokens`, `api.tierValue`, `api.placeZone`

### `doc/feature/SETUP_AND_TOOLS.md` - modified - docs - internal

Minor formatting and wording tweaks in the Setup & Tools documentation page. Adds horizontal rule separators between sections and slightly rewords the content packs description.

### `doc/feature/TOKEN_DISPLAY.md` - modified - docs - internal

Trivial formatting changes to the Token Display documentation: adds horizontal rules between sections, splits a few long sentences into shorter ones, updates an API doc link from API_REFERENCE.md to API_TOKEN_DISPLAY.md, and adds a note about the 'Reveal Stats Without Scanning' setting.

_Details:_ The only substantive addition is a new paragraph mentioning the 'Reveal Stats Without Scanning' setting under 'Activations → Scan' that drops the scan gate for the stat hint, scanned stat bars, and consume feedback.

### `doc/feature/VISION.md` - modified - docs - internal - CORRECTED

Reformats the Vision feature doc with horizontal rules between sections, splits long paragraphs for readability, fixes an image path (img → vid), and adds a note that lancerLos is mostly visual for now plus a link to the hasLineOfSight API.

_Details:_ Added --- separators between every section. Broke up dense paragraphs in vision modes, token height, and vision-from-edge sections. Changed vis-los.gif path from doc/img to doc/vid. Added mention that lancerLos has no integrated in-play tool yet and linked to API_SPATIAL.md#line-of-sight. Added note that lancerLos works with hand-placed walls and walls generated by Terrain Height Tools, and that token-blocks-sight (including Bulwark) counts because they act as walls.

_Verify fixed:_ Added missing detail about lancerLos working with Terrain Height Tools-generated walls and token-blocks-sight/Bulwark counting as walls

### `doc/feature/WRECK.md` - modified - docs - internal

Adds horizontal-rule separators between sections and minor formatting tweaks (sentence splitting) in the Wrecks feature documentation.

## FX & Sounds

### `scripts/fx/actionFX.js` - modified - feature - user-facing - BLOG

Refactored all per-action FX functions into a shared data-driven system and added item-name labels on action badges, mine detonation FX, and activation FX for Bond Powers and Talents.

_Details:_ Replaced ~15 individual play*FX functions with a BADGE_FX data table and shared _playBadgeFX builder. Action badges can now display the item/system name on the SVG banner (controlled by the 'actionBadgeItemName' setting), with automatic text fitting and two-line wrapping for long names. Added playMineDetonationFX with explosion visuals and sound for deployable mines. Deployable actors of type Mine now auto-trigger mine detonation FX instead of generic activation FX. Added hooks for BondPowerFlow and TalentFlow so bond powers and talent rank cards play activation FX. Added 'Overcharge (NPC)' to the set of titles with specific FX. Fixed contested-outcome and stat-roll-outcome FX to render aboveInterface.

_Changelog:_ Added item-name labels on action FX badges, mine detonation effects, and activation FX for Bond Powers and Talents

_Settings/API:_ `actionBadgeItemName`

### `scripts/fx/statusFX.js` - modified - internal - internal

Shortens and consolidates code comments in the status FX module. Renames one local variable from `fid` to `filterId`.

## Integrations

### `scripts/setup/qol-compat.js` - modified - internal - internal

Shortened an internal code comment in the csm-lancer-qol compatibility shim. No functional change.

## Interactive Tools

### `scripts/interactive/canvas-helpers.js` - modified - improvement - user-facing - CORRECTED

Major performance refactor of the range-pulse wave animation to pre-paint ring graphics once and update only alpha per frame instead of re-tessellating every tick. Also adds new shared helpers (suppressTokenInteraction, teardownRangePulse, createPickerSession, makeHitLabel), fixes fade-in/out lifecycle bugs, allows merged range highlights without a wave, supports perimeterAlpha pass-through, slows pulse speed from 1.25 to 1, and warns when knockback moves an IMMOVABLE token.

_Details:_ The range-pulse tick no longer calls pulseGraphic.clear() and redraws every frame; instead each distance ring is painted into a child Graphics once and the per-frame loop only sets alpha/visibility. createMergedRangeHighlight gains wave (bool) and perimeterAlpha options, and exposes .graphics on the returned destroy function. destroyGraphics now guards against already-destroyed objects. createFadeInOut fixes a race where the fade-out callback could fire twice or the ticker could leak. The overlap-stack picker now passes the click event to onPick. Knockback warns on IMMOVABLE status.

_Changelog:_ Improved range-pulse animation performance by pre-painting ring graphics and updating only alpha per frame, slowed pulse speed slightly for a smoother feel, and added a warning when knockback forces movement on an IMMOVABLE token.

_Verify fixed:_ Added pulse speed change (1.25 → 1) to changelog as it is a user-visible animation difference; Added mention of .graphics property exposed on createMergedRangeHighlight destroy function in details

### `scripts/interactive/cards.js` - modified - improvement - user-facing

Adds a new 'placeZone' info card type for placed zones with an elevation-aware toggle and a zone list UI. Also changes the immovable detection from using the module API's findEffectOnToken to checking the token's built-in statuses, and switches the immovable icon from a CCI font icon to a custom SVG mask icon.

_Details:_ The placeZone card includes a checkbox for elevation awareness, a 'Place Zone' button, and a container for listing placed zones. The immovable icon change removes the dependency on the module's own API for status detection, instead reading token.actor.statuses.has('immovable').

_Changelog:_ Added placed-zone management card with elevation-aware toggle for interactive tools

### `scripts/interactive/combat.js` - modified - improvement - user-facing - CORRECTED

Minor formatting tweaks in throw menu and vote result labels; internal code cleanup in mount chooser.

_Details:_ Throw menu weapon description parts now joined with ', ' instead of ' — '. Vote result chat message title uses ':' instead of ' — '. The choseMount JSDoc block was relocated from a detached position to directly above the function. Internal variable names like hasRechargeNM were simplified to hasRecharge.

_Changelog:_ Throw menu and vote result labels use cleaner punctuation (commas/colons instead of em-dashes).

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — the separator changes in throw menu tooltips and vote result chat messages are visible to users; Set user_facing to true — players/GMs see the throw menu labels and vote result chat messages; Added changelog bullet for the user-visible formatting changes

### `scripts/interactive/detail-renderers.js` - modified - internal - internal

Trivial variable rename from `lancer` to `game` in `tagConfigName`, and repositioned a JSDoc comment block from `stripDeployOwner` to `laRenderDeployables` where it actually belongs.

### `scripts/interactive/extras-dialog.js` - modified - feature - user-facing - BLOG

The Extras dialog now has an 'Action Combat' section that lets users attach attack/damage overlays to native system actions (without modifying the action itself). The side-drawer also now follows the parent window when it is dragged.

_Details:_ New overlay editing mode hides the basic action fields (name, activation, icon) and shows only combat fields. Overlays are stored/removed via new action-overlays.js helpers. A MutationObserver tracks the parent window's inline style so the floating drawer repositions when the dialog is dragged. Many local variables were renamed for clarity (val→dmgAmount, dq→drawerFind, e→lidEntry, etc.).

_Changelog:_ Added ability to attach attack and damage data to native Lancer actions via the Extras dialog's new Action Combat section.

### `scripts/interactive/index.js` - modified - internal - internal

Adds the new action-overlays module to the interactive barrel file, importing, re-exporting, and spreading it into the InteractiveAPI object.

### `scripts/interactive/network.js` - modified - improvement - internal

Added three new convenience choice-card helpers (confirmCard, askCard, pickCard) that wrap startChoiceCard for common patterns: single-button confirm, yes/no ask with token-owner routing, and pick-one-from-list. Unified the single-user and multi-user controlled choice card code paths by merging broadcast-cancel logic into showUserIdControlledChoiceCard and reducing showMultiUserControlledChoiceCard to a thin delegate, eliminating ~120 lines of duplicated code.

_Details:_ confirmCard resolves true/false on click/dismiss. askCard resolves {confirmed, responderIds} and auto-routes control to the token owner or active GM. pickCard resolves the chosen entry or null. Minor variable renames (v→voteIdx, v→value) for clarity. BOM added to file.

_Settings/API:_ `confirmCard`, `askCard`, `pickCard`

### `scripts/interactive/overlap-picker.js` - modified - refactor - internal - CORRECTED

Renamed a local variable from `out` to `overlapping` in the overlap-picker module. Purely a rename with no behavioral change.

_Verify fixed:_ Changed kind from 'internal' to 'refactor' since this is a code clarity rename

### `scripts/interactive/shape-placement-engine.js` - modified - refactor - internal

Replaces manual event listener setup/teardown (makeSafe + individual on/off calls) with the new createPickerSession helper, simplifying the shape placement engine's event binding and cleanup.

_Details:_ The four individual safe-wrapped event variables (safeMove, safeClick, safeKey, safeWheel) and their manual registration/removal are replaced by a single createPickerSession instance with bind/unbind calls.

### `scripts/interactive/target-shapes.js` - modified - feature - internal

Adds a session-independent `createChanceLabel` API that displays a live hit-chance percentage label on a token, managed outside of the normal targeting session lifecycle. Also refactors label creation to use the shared `makeHitLabel` helper and renames variables for clarity.

_Details:_ New exported function `createChanceLabel(token, fn)` attaches a persistent, auto-updating hit/crit percentage label to any token. The label updates every tick via the existing pulse ticker and returns a handle with a `destroy()` method. The `_chanceLabels` map is integrated into container setup, teardown, and the canvasReady cleanup hook. Minor renames (g -> graphic, res -> hitChance) and import changes (makeText/HIT_LABEL_STYLE/hitLabelFontSize replaced by makeHitLabel).

_Settings/API:_ `createChanceLabel`

### `scripts/interactive/tools/advancedMeasure.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds pinned range outlines (★) to the Advanced Measure tool, allowing users to right-click a range source or weapon to pin its range ring persistently. Also adds keyboard shortcuts T (cycle range source) and G (clear all), re-clicking the active range source now toggles it off, fixes stale hover-token state with a geometric pointer check, and truncates long dropdown labels with ellipsis.

_Details:_ Pinned ranges are session-lived, support multiple tokens and sources simultaneously, merge into union regions per source type, and animate with a subtle breathing alpha. Clear (button and G key) now also resets range source, pulse, movement reach, and tactical labels. A debug inspector is exposed via globalThis.laMeasureRef(). The toolbar hover detection is hardened against stale mouseenter/mouseleave by using document.elementFromPoint. Settings registrations drop unused name/hint strings. suppressTokenLayerClick replaced by suppressTokenInteraction.

_Changelog:_ Added pinned range outlines (★) to the Advanced Measure tool—right-click any range source or weapon to pin a persistent, non-pulsing ring. Re-clicking the active range source now toggles it off. New keyboard shortcuts: T cycles range source, G clears all.

_Settings/API:_ `lancer-automations.advancedMeasureStateChange (Hook)`

_Verify fixed:_ Moved re-click-to-toggle-off from details to summary and changelog as it is a user-facing behavior change; Noted in details that Clear/G now also resets range source, pulse, movement reach, and tactical labels (broader reset behavior); Clarified advancedMeasureStateChange is a Hook in settings_or_api

### `scripts/interactive/tools/chooseToken.js` - modified - improvement - user-facing

The token picker now supports 'sensors' as a range keyword (auto-resolving to the mech's sensor range), disposition-based filtering ('friendly'/'hostile'), and defaults includeSelf to true. Internally, event wiring and the overlapping-token stack popup are refactored to use shared helpers (createPickerSession, showOverlapStackPicker, teardownRangePulse, suppressTokenInteraction).

_Details:_ New option handling at the top of chooseToken: range:'sensors' resolves to the caster's sensor_range; disposition:'friendly'|'hostile' auto-applies isFriendly/isHostile filters. The includeSelf default changed from false to true. The inline stack-picker DOM construction is replaced by a call to the shared showOverlapStackPicker helper. Manual event listener add/remove replaced by createPickerSession().bind()/.unbind(). Range pulse teardown extracted to teardownRangePulse.

_Changelog:_ Improved token picker to support 'sensors' range and disposition-based filtering, and changed default to include self

### `scripts/interactive/tools/forceCheck.js` - modified - improvement - user-facing

Force Check cards now support structured range inputs (arrays with Blast/Burst/Cone/Line/Range/Threat entries), show HASE success-chance overlays on target tokens, and allow submitting with no targets (resolving as incomplete). The targeting UI auto-starts when no preset targets are provided.

_Details:_ Range can now be an array of {type, val} objects to define area-of-effect shapes. Success chance indicators appear on tokens during targeting via haseSuccessChance. The run button is no longer disabled when no targets are selected—clicking it with zero targets cleanly closes the card. beginTargetSession and buildTargetingUI now receive the success-chance callback. Shape cleanup consolidated to clearAllAttackShapes.

_Changelog:_ Improved Force Check tool with area-of-effect range support, success-chance indicators on targets, and better handling when no targets are selected

### `scripts/interactive/tools/haseContest.js` - modified - feature - user-facing

Adds win-chance labels to the HASE Contest tool. When chance labels and target info are enabled, each side of the contest now shows a floating label on the token indicating the probability of winning.

_Details:_ Imports createChanceLabel, targetInfoAllowed, contestWinChance, and chanceLabelsOn. Chance labels are created/updated whenever a token or skill selection changes, and destroyed when the tool closes.

_Changelog:_ Added win-chance labels to the HASE Contest tool, showing each side's probability of winning.

### `scripts/interactive/tools/knockBackToken.js` - modified - refactor - internal - CORRECTED

Migrates the knockback token picker from manual makeSafe/event-binding to the new createPickerSession helper, consolidating event registration and cleanup.

_Details:_ Replaces individual safeMove/safeClick/safeAbort/safeKey variables and manual canvas.stage.on/off and addEventListener calls with a single session object using session.bind() and session.unbind().

_Verify fixed:_ Fixed typo 'event-bindng' -> 'event-binding' in summary

### `scripts/interactive/tools/moveToken.js` - modified - refactor - user-facing

Refactors the move-token interactive picker to use the new `createPickerSession` API instead of manually managing individual event listeners, and adds a phasing check so tokens with the phasing status bypass path-collision blocking.

_Details:_ Replaced `makeSafe` + manual `safeMove/safeClick/safeAbort/safeKey` event wiring with `createPickerSession(...).bind(...)` and `session.unbind()`. Extracted range-pulse teardown into a shared `teardownRangePulse` helper. The path-collision check (`options.canBeBlocked`) now also calls `isPhasing(token.document)` so phasing tokens are not stopped by blocking tokens in their path.

_Changelog:_ Fixed move tool so phasing tokens are no longer blocked by other tokens in their path

### `scripts/interactive/tools/pickAreaTargetToggle.js` - modified - refactor - internal

Replaces inline hit-label creation code with a call to the new `makeHitLabel` helper from canvas-helpers, removing duplicated label setup logic.

### `scripts/interactive/tools/pickSingleTargetToggle.js` - modified - refactor - internal - CORRECTED

Refactors the single-target-toggle picker to use the shared `createPickerSession` helper for event binding/unbinding and the shared `showOverlapStackPicker` for the overlap stack popup, replacing inline DOM construction and manual event wiring.

_Details:_ Replaces manual canvas event listener setup (pointermove, click, rightdown, keydown) with `session.bind`/`session.unbind` via `createPickerSession`. Replaces ~40 lines of inline stack-picker DOM creation with a call to the extracted `showOverlapStackPicker` helper. Switches from `suppressTokenLayerClick` + manual `interactiveChildren` toggling to the unified `suppressTokenInteraction` helper. Escape key now checks for the stack picker via DOM query (`document.querySelector('.la-stack-picker')`) instead of a local variable reference.

_Verify fixed:_ Added detail about Escape key detection changing from local variable check to DOM query

### `scripts/interactive/tools/placeToken.js` - modified - refactor - internal

Refactors the placeToken interactive tool to use the new createPickerSession/suppressTokenInteraction helpers and the shared teardownRangePulse utility, replacing manual event binding/unbinding and inline cleanup logic.

_Details:_ Replaces makeSafe + manual canvas.stage.on/off and document event listener management with session.bind/unbind via createPickerSession. Consolidates token interaction suppression into a single suppressTokenInteraction call. Extracts range-pulse teardown into the shared teardownRangePulse helper. Minor variable renames (tx/ty -> worldX/worldY, d -> doc).

### `scripts/interactive/tools/placeZone.js` - modified - feature - user-facing - BLOG - CORRECTED

Placed template zones now support automatic expiry tied to combat turns, and zones are elevation-aware by default so tokens outside the zone's elevation band are excluded from containment checks.

_Details:_ Added `expires` option (`on: 'ownerTurnStart' | 'ownerTurnEnd'`, optional `turns` count) that auto-deletes placed templates when the caster's turn starts or ends. Zones now inherit the caster token's elevation and pass `elevationGated` to templatemacro's `findContained`. A new toggle (`data-role="zone-elev-toggle"`) on the placement card lets the user disable elevation-aware containment.

_Changelog:_ Added automatic zone expiry on combat turn boundaries and elevation-aware zone containment for placed templates

_Settings/API:_ `expires`, `elevationAware`

_Verify fixed:_ Added 'expires' and 'elevationAware' to settings_or_api since these are new API options callers can pass to placeZone; Removed mention of internal refactors (teardownRangePulse helper, variable rename) from details as they are trivial internals

### `scripts/tools/downtime.js` - modified - refactor - internal

Renames local variables in the downtime tool for clarity (actList→activityOptions, activeOutcome→isRollable, actOutcome→activityResults, dlg→dialog). No behavioral changes.

### `scripts/tools/scan-lookup.js` - modified - feature - user-facing

Adds a world-level setting 'revealStatsWithoutScan' that, when enabled, treats all NPCs as scanned for every user, bypassing the normal scan journal check. Intended for tables that don't play with hidden NPC stats.

_Details:_ A new helper _revealWithoutScan() reads the 'revealStatsWithoutScan' setting and, if truthy, causes isActorScannedForUser() to always return true.

_Changelog:_ Added a world setting to reveal all NPC stats without requiring a scan, for tables that don't use hidden stats.

_Settings/API:_ `revealStatsWithoutScan`

### `scripts/tools/scan.js` - modified - internal - internal

Trivial renaming of local variables (`sysObj` → `sysSlot`, `info` → `gmNotes`) and addition of JSDoc `@returns` annotations to two exported scan functions. No behavioral changes.

### `styles/interactive-tools.css` - modified - improvement - user-facing

Adds visual styling for settings whose prerequisites are unmet (dimmed out with a warning icon), and extends the header wrap/overflow CSS from the acc/diff HUD to also cover the damage HUD and any form whose id starts with 'accdiff'.

_Details:_ New `.la-req-unmet` styles dim unmet-requirement settings rows and show an orange help-cursor icon. The acc/diff header wrapping rules are broadened from `#accdiff-hud` to `form[id^="accdiff"]` and duplicated for `#damage-hud` so long roll titles wrap correctly there too.

_Changelog:_ Improved settings panel to visually dim options whose prerequisites are not met, and fixed long roll-title wrapping in the damage HUD

### `templates/reaction-editor.html` - modified - improvement - user-facing - BLOG

The reaction (activation) editor now shows Workshop integration banners indicating whether an activation is a workshop preview or an imported workshop file, warns about overwrite behavior, and adds a separate Close button alongside Save. A 'Function Reference' link is added next to the existing Trigger Data Reference. The Activation Code section auto-opens when it has content, and the Save button shows a dirty-star indicator for unsaved changes.

_Details:_ Workshop preview banner explains that saving imports into activations under the author's folder. Imported-from-workshop banner warns that updates will overwrite local changes and suggests copy/rename to detach. Hidden fields added for workshopId and originalName.

_Changelog:_ Added Workshop integration banners and dirty-state indicator to the activation editor, plus a dedicated Close button and Function Reference link

## Internal / Tooling

### `module.json` - modified - internal - internal

Version bump from 4.0.3 to 4.1.0 in module.json, updating the version string and download URL.

### `scripts/combat/grid-helpers.js` - modified - refactor - internal - CORRECTED

Renames short loop variables (c1/c2, o1/o2, o, stepData) to more descriptive names (center1/center2, offset1/offset2, offset, step) and removes one line from a JSDoc comment. Pure readability cleanup with no behavioral changes.

_Verify fixed:_ Changed kind from 'internal' to 'refactor' since this is a code readability/naming cleanup, not tooling or infrastructure work

### `scripts/interactive/extra-config.js` - modified - docs - internal - CORRECTED

Trivial comment and JSDoc changes in extra-config.js: removed or shortened inline comments and added JSDoc @returns annotations to several exported functions.

_Verify fixed:_ Changed kind from 'internal' to 'docs' since the changes are purely documentation (comment edits and JSDoc additions)

### `scripts/socket.js` - modified - refactor - internal

Pure rename-and-comment cleanup in the socket helper module: single-letter variables like `td`, `r`, `t`, `d`, `kbItem` are expanded to descriptive names (`resolvedDoc`, `reaction`, `placeable`, `doc`, `knockbackItem`), and a few comments are trimmed or shortened.

_Details:_ No logic, API, or behavior changes. Only variable renames for readability and minor JSDoc/comment removals.

### `scripts/tools/pilot-reserves.js` - modified - internal - internal

Adds a JSDoc return-type annotation to the openAddReserveDialog function. No functional change.

### `scripts/typing/types.d.ts` - modified - refactor - internal - CORRECTED

Major update to the TypeScript type definitions file, adding detailed interfaces for cancel/modify/reroll helper functions, a new OnPreDamage trigger type, and expanding the API surface with many new method signatures while removing deprecated or consolidated ones.

_Details:_ Added CancelCardOpts, CancelFunction, CancelMoveFunction, ChangeMoveFunction, ModifyValueFunction, RerollFunction, ChangeRollFunction interfaces. Added TriggerDataOnPreDamage. Added hitTokens to TriggerDataBase. Renamed token to triggeringToken in OnPreMove. Added API methods: playMineDetonationFX, hasStatus, ensureLinkedEffect, applyMark, findMarkedTokens, findEffectFrom, findEffectsOnToken, clearMarks, ensureLinkedBonus, confirmCard, askCard, pickCard, getTokensInAura, ensureAura, executeSaveVsEffect, attackWith, getTier, tierValue, getFlowFlag, setFlowFlag, consumeOncePerRound, getActionOverlays/getActionOverlay/setActionOverlay/removeActionOverlay/applyActionOverlays, resolveGrantedActionRange. Removed: checkOverwatchCondition, undoMoveData, getMovementCap, initMovementCap, getItemLID, isItemAvailable, hasReactionAvailable, isFriendly, getItemTags_WithBonus, getMaxItemRanges_WithBonus, getTerrainAt, performSystemScan, removeEffectByName, getWeaponProfiles_WithBonus (duplicate), getWeaponType, getItemType. Changed getActorMaxThreat and getMaxWeaponRanges_WithBonus from async to sync. Renamed beginThrowWeaponFlow to beginWeaponThrowFlow. Changed chooseToken range to accept 'sensors' and added disposition option. Changed executeDowntimeAction to executeDowntime (removed parameters). placeTemplate gained rangeOrigin and expires options. addGlobalBonus origin now accepts Token in addition to string, and gained icon option. openForceCheckCard range now accepts array of range objects.

_Settings/API:_ `api.playMineDetonationFX`, `api.hasStatus`, `api.ensureLinkedEffect`, `api.applyMark`, `api.findMarkedTokens`, `api.findEffectFrom`, `api.findEffectsOnToken`, `api.clearMarks`, `api.ensureLinkedBonus`, `api.confirmCard`, `api.askCard`, `api.pickCard`, `api.getTokensInAura`, `api.ensureAura`, `api.executeSaveVsEffect`, `api.attackWith`, `api.getTier`, `api.tierValue`, `api.getFlowFlag`, `api.setFlowFlag`, `api.consumeOncePerRound`, `api.getActionOverlays`, `api.getActionOverlay`, `api.setActionOverlay`, `api.removeActionOverlay`, `api.applyActionOverlays`, `api.resolveGrantedActionRange`, `api.beginWeaponThrowFlow`

_Verify fixed:_ Added missing chooseToken disposition option to details; Added missing placeTemplate rangeOrigin and expires options to details; Added missing addGlobalBonus origin type change (now accepts Token) and icon option to details; Added missing openForceCheckCard range array format change to details; Added missing removed methods: getWeaponProfiles_WithBonus (duplicate), getWeaponType, getItemType to details

### `tools/build_api_types.py` - modified - improvement - internal

Improved the API type-generation build script to handle arrow functions, class methods, spread imports, sync vs async return types, and additional API keys defined in main.js.

_Details:_ The script now correctly distinguishes async (Promise<any>) from sync (any) return types, resolves `...spread` namespace imports to discover exported names, parses arrow and method definitions in addition to regular functions, and picks up ~40 extra API keys from main.js that weren't in any *API object.

## Isometric

### `scripts/integrations/isometric-tile-tab.js` - added - fix - user-facing

Adds a compatibility fix that re-applies the Isometric Perspective module's tile-sheet tab when Monks Active Tiles replaces the tile sheet class, which would otherwise drop the isometric tab.

_Details:_ Detects when both 'isometric-perspective' and 'monks-active-tiles' are active, then re-imports and re-calls createTileIsometricTab() to restore the lost tab.

_Changelog:_ Fixed Isometric Perspective tile tab being lost when Monks Active Tiles is also active

### `scripts/movement/iso-elevation-anim.js` - modified - internal - internal

Shortens and condenses multi-line code comments in the isometric elevation animation file. No logic changes.

_Details:_ Three comment blocks were trimmed to single-line equivalents for brevity.

## Movement & Ruler

### `scripts/combat/speed-provider.js` - modified - refactor - internal

Removes the hardcoded name and hint strings from the built-in speed provider setting registration, likely because localization or a different UI now supplies them.

_Details:_ The 'name' and 'hint' properties were removed from the game.settings.register call for the speed-provider enabled setting. The setting already had config: false, so it never appeared in the standard settings UI.

### `scripts/movement/cost-rules.js` - modified - feature - user-facing

Adds detection of the 'phasing' status on tokens, allowing the movement system to recognize when a token has phasing (via the status or an obstacle-immunity bonus).

_Details:_ New PHASING_STATUSES constant and exported isPhasing() helper that checks for the 'phasing' status or an 'obstacle' immunity bonus on the actor.

_Changelog:_ Added support for the phasing status in movement cost calculations

### `scripts/movement/elevation.js` - modified - internal - internal

Removes inline name/hint strings from four movement-related settings registrations, since these are now handled elsewhere (likely a centralized localization or settings UI file).

_Details:_ Affected settings: CLIMB_WAYPOINTS_ENABLED, SPLIT_AT_TRIGGER_BOUNDARIES, DISABLE_AUTO_TERRAIN_ELEVATION, and disableAutoElevationOnMeasure. All had their name and hint properties removed; config remains false for all.

### `scripts/movement/keybindings.js` - modified - docs - internal

Trivial wording change in the Free Movement keybinding hint: 'programmatic' replaced with 'from code'.

### `scripts/movement/move-tracking.js` - modified - refactor - internal - CORRECTED

Purely cosmetic rename of short lambda parameter names (m -> move, c -> combatant) and minor comment shortening in move-tracking.js. No logic changes.

_Verify fixed:_ Changed kind from 'internal' to 'refactor' since these are code style improvements (variable renames, comment rewording), not build/tooling changes

### `scripts/movement/path-replay.js` - modified - internal - internal

Shortened a comment at the top of the path-replay module. No functional changes.

### `scripts/movement/reachability.js` - modified - improvement - user-facing

Movement reachability and route-finding now respect intangible status and phasing. Intangible tokens only block other intangible tokens (and vice versa), and phasing tokens ignore hostile-token blocking entirely.

_Details:_ Both computeMovementReach and computeMovementRoute check the mover's intangible status and phasing state. Hostile tokens only act as movement walls when the mover and blocker share the same intangible/tangible state, and phasing movers skip hostile blocking altogether.

_Changelog:_ Improved movement to respect intangible and phasing status — intangible mechs no longer block tangible ones and phasing tokens ignore hostile blocking.

### `scripts/movement/tactical-distance.js` - modified - improvement - user-facing - BLOG

Tactical distance labels now include a line-of-sight eye icon (green/red) when Lancer LoS is enabled, support positioning above or below the token, scale up at low zoom levels, and render on a high-z overlay so stat bars never cover them. Ghost labels follow drag previews of target tokens.

_Details:_ New settings: 'tacticalLabelPosition' (above/below, default below) and 'tacticalMinZoomScale' (counter-scale labels when zoomed out). Labels moved from token children to a dedicated PIXI overlay container (z 100000) with a per-frame ticker for repositioning. Uses Material Design Icons webfont for eye-on/eye-off glyphs colored green (#4dd35f) for visible or red (#ff5b52) for blocked LoS. Ghost labels duplicate distance info onto drag-preview clones of target tokens.

_Changelog:_ Improved tactical distance labels with a line-of-sight indicator, configurable above/below positioning, zoom-aware scaling, and rendering above stat bars.

_Settings/API:_ `tacticalLabelPosition`, `tacticalMinZoomScale`

### `scripts/movement/terrain-trigger-waypoints.js` - modified - improvement - user-facing

Integrated the pathfind-drag-movement setting into the waypoint injection pipeline so dragged tokens can be routed around obstacles at drop time. Added a libWrapper fallback on Token.createTerrainMovementPath for systems where the core modifyPlannedMovement patch is absent.

_Details:_ injectTriggerSilentsAtDrop now checks PATHFIND_DRAG_MOVEMENT and calls _injectRoute before trigger/tier splits. A new _transformFoundPath helper applies pathfinding, trigger splits, and tier splits to a path array. A WRAPPER on createTerrainMovementPath serves as a fallback seam when _patchDetected is false. Removed unused name/hint strings from the two config:false settings.

_Changelog:_ Improved drag movement to support pathfinding around obstacles and added a fallback for systems without the core movement patch.

_Settings/API:_ `PATHFIND_DRAG_MOVEMENT`, `SPLIT_AT_SPEED_TIERS`

### `scripts/movement/token-move-hooks.js` - modified - internal - internal

Renames a local variable from `originalPathWps` to `originalPathWaypoints` for clarity, and adds a brief comment explaining that rerouted moves intentionally do not carry `_cancelledBy`.

### `scripts/movement/token-ruler.js` - modified - internal - internal

Removes hardcoded name and hint strings from the per-step ruler path client setting registration, likely because localization or another mechanism now provides them.

_Details:_ The `name` and `hint` fields were removed from the `PER_STEP_RENDER` setting registration call. The setting itself remains with the same scope, config, and type. Since `config: false`, this setting was never visible in the settings UI, so removing the name/hint has no user-facing impact.

### `scripts/tools/movement-tools.js` - modified - improvement - user-facing

Refactored Standing Up to use the shared activation card (executeSimpleActivation) instead of a plain chat message, and extracted the core prone-removal logic into a reusable applyStandingUp helper. Minor: fall effect duration label changed from 'unlimited' to 'indefinite'.

_Details:_ New exported applyStandingUp(token) function performs the mechanical side (remove Prone, play FX, fire battlelog hook, charge movement cap) without UI prompts—useful for other callers. executeStandingUp now delegates to executeSimpleActivation for a consistent activation chat card. Falling effect duration label tweaked from 'unlimited' to 'indefinite'.

_Changelog:_ Improved Standing Up to display a proper activation card instead of a plain chat message.

## NPC Automations

### `extra/systems.json` - modified - improvement - user-facing

Added Miner Pulverizer Charge deployable data (T1–T3) for the NPC Miner class, fixed Engineer turret types from 'Drone' to 'Deployable', corrected a typo in 'Engineer Rebake Turret T3', and standardized all NPC deployable naming from '(NPC) Name' to 'Name (NPC)'.

_Details:_ New Miner Pulverizer Charge mine deployables at three tiers with scaling evasion/edef and explosive damage. Engineer turrets were incorrectly typed as Drone and are now Deployable. The T3 Rebake turret had a typo ('Engineer c Turret T3') which is now fixed.

_Changelog:_ Added NPC Miner Pulverizer Charge deployables and fixed Engineer turret deployable types and naming

### `scripts/activations/reaction-export-import.js` - modified - improvement - user-facing - CORRECTED

Several internal helper functions for the pack export/import UI (packSection, packGroup, packPick, packSelectAllBar, wirePackSelectAll) are changed from private to exported, and their names are un-prefixed. Additionally, pack export now strips workshop IDs via ReactionManager.stripWorkshopIds on the serialized pack data, and pack import strips workshop IDs from each imported category before applying.

_Details:_ The export path wraps the serialized pack object with ReactionManager.stripWorkshopIds before saving. The import path calls stripWorkshopIds on itemReactions, generalReactions, and startupScripts individually before applying them. The UI helper exports enable reuse from other modules.

_Changelog:_ Activation pack export/import now strips workshop IDs, making exported packs cleaner and preventing workshop metadata from leaking into imports.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — stripping workshop IDs from exported/imported packs is a functional behavior change, not just a refactor; Changed user_facing from false to true — exported pack files will now have different content (no workshop IDs), and imports will behave differently by stripping those IDs; Added changelog bullet — the workshop ID stripping is a user-visible improvement to pack export/import

### `scripts/activations/reactions-registry.js` - modified - improvement - user-facing

Adds automated 'Limited Handling' NPC reaction (blocks Standing Up unless an adjacent ally is confirmed) and a 'Standing Up' general action that clears Prone. Lock On now respects granted-action range overrides. Mines now check elevation so tokens at different heights don't trigger them. Several duration labels changed from 'unlimited' to 'indefinite', and em-dashes replaced with hyphens throughout UI text.

_Details:_ New Limited Handling reaction for NPC vehicles auto-fires on Standing Up and prompts whether an allied character is adjacent, cancelling the action if not. New Standing Up general reaction calls applyStandingUp to clear Prone. Lock On uses resolveGrantedActionRange to allow systems to override sensor range. Mine detonation now compares mover elevation to mine elevation, preventing false triggers. CODE_INSTEAD constant extracted to reduce repetition across ~40 reaction definitions. Effect durations changed from 'unlimited' to 'indefinite' for Shutdown+Stunned, Hidden, Mine Stealth, and Squeeze-Prone.

_Changelog:_ Added automated Limited Handling (NPC vehicle) and Standing Up reactions; Lock On now respects granted-action range overrides; mines no longer trigger on tokens at different elevations

### `startups/itemActivations.js` - modified - feature - user-facing - BLOG - CORRECTED - CHUNKED x2

Major expansion and refactoring of NPC item automations. Adds new NPC automations for Engineer's Mark, turret deploy/shutdown, Baserunner Defense, Terrain Printer waypoints, Sandblast zones, Remote Cloud healing, Squad traits (Strength in Numbers, Spread Out, Undersize, Primary Weapon), Heavy Frame, Tunneller, Pulverizer Charge/Detonation, Collapse Plating, Rock Grinder, and more. Existing automations are migrated to newer API methods (askCard/confirmCard/pickCard instead of startChoiceCard with callbacks, ensureLinkedBonus/ensureLinkedEffect instead of manual dedup checks, findEffectsOnToken/findMarkedTokens/applyMark/clearMarks instead of manual iteration, executeSaveVsEffect instead of manual save+effect application, tierValue helper, zone expires option replacing manual turn-start cleanup).

_Details:_ Renames all variables from *Reaction to *Automation. Adds line-of-sight checks to Moving Target Sniper and Sniper's Mark. Anti-Materiel Rifle now uses onPreDamage with cancelDamage instead of onHit+onMessage. Defense Net Ring of Fire now applies heat damage on target turn start via aura TARGET_TURN_START mode. Smoke Launchers zones now auto-expire, register for both the original and a new 'npc_carrier_SmokeLaunchers' LID, and support placing up to 2 zones. Remote Cloud healing zones auto-expire and use consumeOncePerRound. Squad Leader now checks jammed status. Splint Triage and Dispersal Shield token chooser now use disposition:'friendly' instead of manual filter. Consolidates multiple registerDefaultItemReactions calls into one. Removes redundant null-checks on api parameter. Aura owner-only visibility now includes onlyEnabledInCombat flag. Stealth Scanner Specialist now gets a Lock On action overlay on init. Resist All effect duration changed from start-of-own-turn to end-of-triggering-token's-turn. Sealant Gun hostile path now uses executeSaveVsEffect. Architect Protector onInit simplified to a single ensureLinkedEffect call for both terrain_immunity and guardian. Tremor, Rift Collapse, Insertion Catapult, Rainmaker Volley, and Sandblast saves all migrated to executeSaveVsEffect. Sandblast template gains expires and deleted hook. Sharpen and Volley use api.tierValue. Quick March/Press On/Pour It On use disposition:'friendly' and range:'sensors'. Break Free (Sealant) uses api.findEffectsOnToken with hasFlags filter. Standalone hook functions and separate registerDefaultItemReactions calls consolidated into single registration blocks.

_Changelog:_ Added automations for many new NPC classes (Squad, Miner, Engineer turrets, Baserunner, and more) and improved existing NPC automations with line-of-sight checks, better damage cancellation, and zone auto-expiry.

_Settings/API:_ `api.askCard`, `api.confirmCard`, `api.pickCard`, `api.ensureLinkedBonus`, `api.ensureLinkedEffect`, `api.ensureAura`, `api.findEffectsOnToken`, `api.findMarkedTokens`, `api.applyMark`, `api.clearMarks`, `api.executeSaveVsEffect`, `api.tierValue`, `api.consumeOncePerRound`, `api.hasLineOfSight`, `api.hasStatus`, `api.attackWith`, `api.setFlowFlag`, `api.getFlowFlag`, `api.findEffectFrom`, `api.getTokensInAura`, `api.lockActorActionTypes`, `api.unlockActorActionTypes`, `api.setItemAsActivated`, `api.openForceCheckCard`, `api.moveToken`, `api.getImmunityBonuses`, `api.setActionOverlay`, `api.getActionOverlay`, `api.lockActorAction`, `api.chooseToken`

_Verify fixed:_ Added detail about Smoke Launchers registering for additional LID 'npc_carrier_SmokeLaunchers'; Added detail about Smoke Launchers now supporting count:2 (two zones); Added detail about Stealth Scanner Specialist getting Lock On action overlay on init; Added detail about Resist All duration change from start-of-own-turn to end-of-triggering-token's-turn; Added detail about Splint Triage and Dispersal Shield using disposition:'friendly'; Added detail about Sealant Gun hostile path using executeSaveVsEffect; Added detail about Architect Protector simplification

## Setup & Onboarding

### `scripts/setup/checkCompatibility.js` - modified - improvement - user-facing

The compatibility checker now supports warning-only rules (no auto-fix) alongside fixable conflicts, and adds a new warning when both JB2A packs (free and Patreon) are active simultaneously. Warnings are shown once and remembered via a setting.

_Details:_ Warning-only rules use a yellow icon and an 'Understood' button instead of the auto-fix flow. The dialog adapts its title, buttons, and layout depending on whether fixable conflicts, warnings, or both are present. A new 'compatWarningsShown' setting tracks which warnings the GM has already seen.

_Changelog:_ Added warning-only compatibility advisories (e.g. duplicate JB2A modules) alongside auto-fixable conflict checks.

_Settings/API:_ `compatWarningsShown`

### `scripts/setup/settings-onboarding.js` - modified - improvement - user-facing

Adds two new onboarding wizard questions for stat-bar privacy (owner-only vs scanned) and reveal-without-scan, reshuffles the Quick and Essential question sets, and shortens many explanation texts throughout the wizard.

_Details:_ New 'stat-privacy' choice question drives statBarVisibilityOutOfCombat, statBarVisibilityInCombat, and tokenStatHintHideCurrentOnScan together. New 'reveal-without-scan' toggle for revealStatsWithoutScan. 'stat-privacy' added to recommended defaults (owner), quick, and essential lists. 'dialog-theme' and 'tf-border-under-token' moved into essential/quick sets. Token Factions condition now checks settings.settings.has() instead of module active. Choice questions with an apply() function now expand into multiple setting keys. Various explain strings shortened for brevity.

_Changelog:_ Added stat-privacy and reveal-without-scan questions to the Setup Wizard, letting GMs configure token stat visibility in one step.

_Settings/API:_ `statBarVisibilityOutOfCombat`, `statBarVisibilityInCombat`, `tokenStatHintHideCurrentOnScan`, `revealStatsWithoutScan`

### `scripts/setup/settings-register.js` - modified - improvement - user-facing

Registers several new world settings: compatWarningsShown (tracks shown compatibility warnings), haseChanceLabels and actionBadgeItemName (Token Action HUD display toggles), wreckAuraColor and wreckAuraOpacity (customize wreck aura appearance), and revealStatsWithoutScan (bypass scan requirement). Also removes inline name/hint strings from several existing hidden settings, moving their UI labels elsewhere.

_Details:_ New setting keys: compatWarningsShown (Array), haseChanceLabels (Boolean, default true), actionBadgeItemName (Boolean, default true), wreckAuraColor (String, default '#8B4513'), wreckAuraOpacity (Number, default 0.2), revealStatsWithoutScan (Boolean, default false). Name/hint metadata removed from guardianBulwarkAuraMode, syncActorImgToToken, syncActorNameToToken, scanJournalSource, scanPlayerOwnershipMode, autoTokenHeight, autoTokenHeightVehicleSquad — these are config:false settings whose labels are likely rendered by a custom settings UI now.

_Changelog:_ Added new settings for wreck aura color/opacity, HASE chance labels, action badge item names, reveal-stats-without-scan, and compatibility warning tracking.

_Settings/API:_ `compatWarningsShown`, `haseChanceLabels`, `actionBadgeItemName`, `wreckAuraColor`, `wreckAuraOpacity`, `revealStatsWithoutScan`

### `scripts/setup/settingsMenus.js` - modified - improvement - user-facing - BLOG - CORRECTED

Overhauled the settings menu with conditional field dependencies (requires/requiresAll), new settings, collapsible section reorganization, and cleaner hint text. Fields now visually disable and show a warning icon when their prerequisite settings are off.

_Details:_ New settings added: revealStatsWithoutScan (scan section — treats every actor as scanned for stat bars and feedback), haseChanceLabels (targeting — live success % during stat rolls/saves/contests), tacticalLabelPosition and tacticalMinZoomScale (tactical distance), wreckAuraColor and wreckAuraOpacity (wrecks), statBarAutoInjectBondXp (token stat bars — cyan XP bar on bonded pilots), tokenStatHintHideCurrentOnScan (token stat hint — hides current HP/heat/resources without owner access), actionBadgeItemName (statuses — shows item name on action badges instead of action type), mineDetonation action FX key. A new 'scanned' visibility option ('Owners + scanned') was added to stat bar visibility choices. Stat bar pilot stress setting relabeled to 'Display Pilot Stress Bar' with expanded scope covering bond stress on sheets and Annoying's Alternative Sheets recoloring. Subsections converted to collapsible sections throughout; settings tabs reordered (Wrecks moved after Vision). A requires system disables dependent fields when their parent toggle is off, with chained resolution and a warning icon tooltip. External module settings now support moduleSelect type (used for lancer-style-library theme selector). Variable renames throughout for readability (internal).

_Changelog:_ Improved settings menu with conditional field dependencies that disable and warn when prerequisites are off, plus new settings for HASE chance labels, wreck aura customization, bond XP bars, tactical label positioning, scan-gated stat visibility, action badge item names, and a 'scanned' stat bar visibility tier.

_Settings/API:_ `revealStatsWithoutScan`, `haseChanceLabels`, `tacticalLabelPosition`, `tacticalMinZoomScale`, `wreckAuraColor`, `wreckAuraOpacity`, `statBarAutoInjectBondXp`, `tokenStatHintHideCurrentOnScan`, `actionBadgeItemName`

_Verify fixed:_ Added user-facing detail for revealStatsWithoutScan (every actor reads as scanned) and haseChanceLabels (live success %) — the proposed note listed them but didn't describe what they do; Added missed detail: statBarDefaultPilotStress relabeled to 'Display Pilot Stress Bar' with expanded hint covering bond stress on sheets and Annoying's Alternative Sheets recoloring; Added missed detail: settings tab reorder (Wrecks moved after Vision); Added actionBadgeItemName to changelog bullet — it was in details/settings_or_api but omitted from the changelog; Added 'scanned' visibility tier to changelog bullet for completeness

### `scripts/setup/telemetry.js` - modified - improvement - user-facing - CORRECTED

Minor copy tweak in the telemetry first-launch popup ("Don't count me" → "I'm already counted") and condensed an internal comment.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — the popup text change is user-visible; Changed user_facing to true — the button label wording change is shown to users in the first-launch dialog

### `scripts/setup/tour.js` - modified - improvement - user-facing

Added a new 'Pinned Rings' tour step explaining how to right-click range sources to pin steady rings, updated the Range Pulse step text to mention the T-key cycling shortcut, and reworded the welcome dialog's documentation notice into a more prominent warning. Internally, the tour registration and start logic was heavily refactored from repetitive per-tour code into a data-driven TOURS array with a single generic loop.

_Details:_ New tour step 'pins' teaches right-click pinning of range rings (with ★ indicator). Welcome dialog moves the README link from inline text to a bold 'Last warning' callout box. All tour start functions now delegate to a shared startTour() helper, and registerTourBootstrap() uses a declarative TOURS config array instead of duplicated per-tour wrappers.

_Changelog:_ Added a 'Pinned Rings' step to the Advanced Measure tour and updated the welcome dialog with a stronger documentation reminder

### `templates/startup-script-editor.html` - modified - feature - user-facing

The startup script editor now shows contextual banners for Workshop-sourced scripts: a preview banner when viewing a Workshop file before import, and a warning banner on already-imported scripts noting that Workshop updates will overwrite local changes.

_Details:_ Adds a hidden workshopId field and two conditional info boxes—one for workshop preview mode and one for imported scripts—styled with accent/warning colors.

_Changelog:_ Added Workshop integration banners to the startup script editor, warning when scripts are imported from the Workshop and may be overwritten by updates.

## Structure & Stress

### `scripts/alt-struct/stress.js` - modified - internal - internal

Updated a code comment to be more concise: the explanation for legendary NPC stress roll behavior was shortened.

### `scripts/alt-struct/structure.js` - modified - internal - internal

Shortened JSDoc comments on two internal structure-flow functions without changing any logic.

_Details:_ Condensed multi-line doc comments for npcOneStructStep and handleTearOffChoice into single-line summaries.

## System Additions

### `doc/feature/SYSTEM_ADDITIONS.md` - modified - docs - user-facing - CORRECTED

Documents the new always-registered Phasing status effect and reformats the System Additions doc with horizontal rules and bullet lists.

_Details:_ Phasing is now listed as always registered alongside Guardian, Bulwark, and Infection. Its mechanic is described: moves through other characters in pathfinding and knockback but can't end movement on them. The rest is formatting: splitting a long paragraph, adding --- dividers between sections, and converting inline mechanics list to bullet points.

_Changelog:_ **Phasing** is now an always-registered status effect — it lets a token move through other characters during pathfinding and knockback, but not end its movement on them.

_Verify fixed:_ area changed from 'Docs' to 'System Additions' — the content describes a system-additions feature, not generic docs; user_facing changed to true — Phasing is a new always-registered status visible to all GMs/players; Added changelog bullet for the Phasing status addition, which is a real user-facing change

### `scripts/setup/lancer-modif.js` - modified - fix - user-facing

Fixes pilot stress bar injection on newer alternative character sheets that already include their own bond-stress input, preventing a duplicate input from breaking the form. Also includes minor internal cleanup (removed unused function parameter, trimmed comments).

_Details:_ When an alt sheet already has an input[name="system.bond_state.stress.value"], the module now skips injecting its own stress bar and instead recolors the existing bar to the stress-yellow color. A comment about insertStepAfter behavior was clarified, an unused 'label' parameter was removed from _buildTypeSizeTags' inner helper, and several block comments were shortened.

_Changelog:_ Fixed pilot stress bar breaking character sheet forms on newer alternative sheets that ship their own bond-stress input.

## Token Action HUD

### `doc/API_HUD.md` - modified - docs - user-facing - BLOG - CORRECTED

Updated the TAH HUD API documentation to add return-type annotations to all function signatures, document the new action-overlay API (setActionOverlay, getActionOverlay, getActionOverlays, removeActionOverlay, applyActionOverlays, resolveGrantedActionRange), expand lockActorAction to cover weapon-row locking, and note that native actions can now overlay combat data.

_Details:_ New documented APIs: setActionOverlay, getActionOverlay, getActionOverlays, removeActionOverlay, applyActionOverlays, resolveGrantedActionRange. These allow attaching combat data (attack rolls, damage, range grants) to an item's native system.actions, stored in a flag so re-imports don't wipe it. resolveGrantedActionRange supports mode-based merging (upgrade/add/override) consumed by Lock On automation and TAH hover range pulse. lockActorAction docs now mention that passing a weapon name as actionName grays out the weapon row and its FIGHT/SKIRMISH/BARRAGE/ATTACK entries. The intro paragraph now mentions overlaying combat data onto native actions. All function summaries now include return types. Minor punctuation changes throughout.

_Changelog:_ Added action overlay API (setActionOverlay, resolveGrantedActionRange, etc.) for attaching combat data to native item actions, and documented weapon-row locking via lockActorAction.

_Settings/API:_ `api.setActionOverlay`, `api.getActionOverlay`, `api.getActionOverlays`, `api.removeActionOverlay`, `api.applyActionOverlays`, `api.resolveGrantedActionRange`

_Verify fixed:_ Added detail about overlay combat data mention in the intro paragraph; Expanded details to cover range grant merging modes and integration with Lock On / TAH hover range pulse

### `scripts/tah/bond-panel.js` - added - feature - user-facing - BLOG

Adds a new Bond panel to the Token Action HUD, allowing GMs and players to view and interact with their pilot's bond directly from the HUD. The panel displays bond questions with selectable answers, an XP checklist (major ideals, minor ideal, veteran power boon), and action buttons to tally XP and refresh bond powers.

_Details:_ The panel reads bond data from the actor's system data or items, persists answer and checklist state via actor updates to system.bond_state, and includes Tally XP and Refresh Powers buttons that call actor.tallyBondXP() and bond.refreshPowers() respectively.

_Changelog:_ Added a Bond panel to the Token Action HUD for managing bond questions, XP checklists, and bond power refreshes.

### `scripts/tah/combat-bar.js` - modified - internal - internal

Trivial variable renames in the combat bar builder: `c` to `combatant` and `val` to `actionValue` for clarity.

### `scripts/tah/consume-feedback.js` - modified - feature - user-facing

Adds floating consume-feedback numbers for bond power uses, and allows a custom label override on consume feedback spawns. When a bond power's uses change, a floating number now appears on the token showing the power's name and delta.

_Details:_ The snapshotting and diffing logic now tracks each bond's individual power uses (keyed by item UUID + power index). A new labelOverride parameter on spawnConsumeFeedback lets callers supply a custom label instead of the auto-formatted one, used here to show e.g. 'Weaponize -1'.

_Changelog:_ Added floating consume-feedback numbers when bond power uses change.

### `scripts/tah/glossary-panel.js` - modified - refactor - internal

Refactored GlossaryPanel to extend a new shared HudPanel base class, removing duplicated panel lifecycle, positioning, and animation logic in favor of inherited _resetPanel and _mount methods.

_Details:_ Constructor, isVisible, close, refresh, and all viewport-clamping/positioning code were replaced by the shared HudPanel superclass. The tahScale import was replaced by the HudPanel import.

### `scripts/tah/hover.js` - modified - improvement - user-facing

Hover range previews in Token Action HUD now account for granted-action range overrides by passing results through resolveGrantedActionRange.

_Details:_ The computePreviewRange function was split so that the base range is computed first, then wrapped through resolveGrantedActionRange when an actionName is present. Also includes a minor variable rename (val -> value).

_Changelog:_ Improved TAH hover range previews to reflect granted-action range overrides

### `scripts/tah/hud-panel.js` - added - refactor - internal

Adds a new HudPanel base class that encapsulates shared logic for TAH side-panels: opening, closing, refreshing, positioning/clamping to the viewport, and fade-in/fade-out animations.

_Details:_ Provides _resetPanel and _mount helpers that handle absolute positioning relative to an anchor row, optional viewport clamping (width, height, and vertical position), and mouse-enter/leave callbacks for collapse scheduling. Intended to be subclassed by specific panel implementations.

### `scripts/tah/hud.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds a Bond panel to the HUD for pilot actors, showing bond name, stress/XP counters (with inverted color scale for stress), bond powers with usage pips, and an unlock-power dialog. Adds rank badges (LL7/T2) to token names and frame/pilot/NPC class rows. Displays core system active synergies with per-round/turn/scene frequency pips. Improves action locking to pass activation type for more precise lock checks, and makes invade options and weapon attack rows lockable. Switches range toggles to a pin-based system. Applies action overlays to deployable/NPC/trait/talent actions. Passes source items through to executeSimpleActivation for better tracking. Makes HUD drag restricted to title/label bars when unlocked. Force Check now defaults save target to the acting token.

_Details:_ New BondPanel integrated alongside Log/Glossary/Status panels with full open/close lifecycle. Bond powers support master/veteran icons, use-tracking pips, and a right-click popup. _lockable() now accepts an activation parameter. New _lockableAttack() helper applies both action-type and weapon-name locks to attack rows. Invade option rows are now wrapped in _lockable(). Core system _corePowerItems() renders active_synergies with frequency pip badges. Range preview toggles refactored from direct advancedMeasure state manipulation to toggleRangePin/hasRangePin API. invertScale support added for stat counters (used by stress). Weapon popup now shows action lock reason HTML. Invade popup shows action lock reason. endItemActivation replaces beginActivationFlow for deployable activations. Force Check passes saveVs: this._token. Deployable tool icons changed to MDI icons.

_Changelog:_ Added Bond panel to the HUD with stress/XP tracking, bond power activation, and power unlocking; added rank badges (LL/Tier) to token titles; added core system active synergy display with frequency tracking; improved action locking precision for attacks, tech actions, and invade options; range preview toggles now use a pin system; Force Check now defaults save target to the acting token

_Verify fixed:_ MISSED: core system active synergies section with per-round/turn/scene frequency pips in _corePowerItems; MISSED: invade option rows are now lockable via _lockable() wrapper; MISSED: Force Check now passes saveVs: this._token as default save target; MISSED: endItemActivation replaces beginActivationFlow for deployable activation rows; MISSED: deployable tool icons changed from system asset paths to MDI icons (mdi-target, mdi-flare); MISSED: invade popup now shows action lock reason HTML

### `scripts/tah/index.js` - modified - improvement - user-facing

Shortened several TAH setting hints for clarity, removed hardcoded name/hint strings from settings that are now localized, and added a new 'mineDetonation' action FX sound toggle.

_Details:_ Settings whose name/hint were removed (now presumably localized): tah.narrativeMode, tah.areaElevationAware, battleLogEnabled, tah.telemetryFriendlyMechAsSquad, tah.disableAwards, tah.telemetryDebug, tah.showDisposition. Hint text was shortened on volume sliders (uiSoundVolume, tokenFeedbackVolume, damageSoundVolume, actionFxVolume, battleLogVolume) and maxColumnItems / preventWasdMovement. A new 'mineDetonation' key was added to the per-action FX sound toggle list.

_Changelog:_ Added a per-action sound toggle for mine detonation FX and shortened several Token Action HUD setting descriptions.

_Settings/API:_ `tah.actionFxSound.mineDetonation`

### `scripts/tah/item-helpers.js` - modified - feature - user-facing - CORRECTED

Adds clickable use-tracking pips for bond powers in the Token Action HUD popup, using calendar icons and respecting the power's frequency label.

_Details:_ The new `appendBondPowerPips` function renders a row of calendar-icon pips (filled/unfilled) for each bond power's uses, allowing players to click to toggle usage directly from the HUD popup.

_Changelog:_ Added clickable use-tracking pips for bond powers in the Token Action HUD

_Verify fixed:_ Changed kind from 'improvement' to 'feature' — this is an entirely new function adding new functionality, not an improvement to existing behavior; Removed mention of JSDoc comment removal from summary — that is a trivial internal cleanup, not user-facing

### `scripts/tah/log-panel.js` - modified - refactor - internal

LogPanel now extends a shared HudPanel base class, removing duplicated panel lifecycle code (constructor, isVisible, close, refresh, positioning/mounting logic) in favor of inherited methods (_resetPanel, _mount).

_Details:_ Variable renames (ts→timestamp, m→msg, sp→speaker) and removal of minor comments are also included as mechanical cleanup.

### `scripts/tah/search.js` - modified - internal - internal

Renames local variable `text` to `plainLabel` for clarity and shortens a JSDoc comment. No behavioral change.

### `scripts/tah/stats-bar.js` - modified - feature - user-facing

Adds Bond XP display to the TAH stats bar for pilot actors that have a bond. Shows current/max Bond XP alongside existing stress and other stats.

_Details:_ Bond XP appears in teal (#00b8d4) with a head-cog icon, only when the pilot has a bond item and bondXpMax > 0. Also simplifies the file's doc comment and removes a minor inline comment.

_Changelog:_ Added Bond XP display to the Token Action HUD stats bar for pilots with bonds.

### `scripts/tah/status-panel.js` - modified - refactor - user-facing - CORRECTED

Refactors StatusPanel to extend a new HudPanel base class, extracting shared panel lifecycle (mounting, closing, visibility, refresh) into the parent. Also centralizes bonus detail string formatting via a shared getBonusDetailString helper, adds an icon to each bonus row, and switches help tooltip from title to data-tooltip.

_Details:_ The large inline getBonusDetailStr switch was replaced by delegating to the shared getBonusDetailString from genericBonuses.js (keeping only the 'multi' recursive case locally). Panel open/close/refresh/visibility logic moved to HudPanel base class methods (_resetPanel, _mount, super.close, inherited isVisible/refresh). Bonus rows now render an icon via laHudRenderIcon using bonus.icon or getBonusIcon(bonus). The help tip changed from title attribute to data-tooltip, which enables rich HTML tooltip content (line breaks via <br>). The 'hasSC' variable was renamed to 'hasStatusCounter', 'updateCRow' to 'updateCustomRow'.

_Changelog:_ Bonus rows in the status panel now display an icon next to each bonus entry.

_Verify fixed:_ Set user_facing to true because bonus rows now show icons (visible change) and help tooltip switched to data-tooltip with HTML formatting; Added changelog bullet for the visible bonus-row icon addition; Updated details to note the tooltip change from title to data-tooltip enables HTML content (br tags)

### `scripts/tah/tokenStatHint.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds a new setting to hide current stat values (HP, heat, overcharge, repairs, core power, reaction, bond XP, extra bars) for scanned-only tokens, showing '?' instead. Also adds bond XP display to the token stat hint popup for pilots with bonds.

_Details:_ New setting `tokenStatHintHideCurrentOnScan` lets GMs mask exact current values behind '?' for tokens a player has only scanned (not owned/observed). The maskCurrent flag propagates through all stat rows (revealed and damaged views) and extra bars. Bond XP (value/max) is now shown for pilot tokens that have a bond item, using the color from the auto-injected XP bar. Extra bars with `hideInHint: true` are now filtered out of the hover popup. Minor variable renames and removal of inline name/hint strings from setting registrations.

_Changelog:_ Added option to hide exact current stats (showing '?' instead) for scan-only tokens in the stat hint popup, added bond XP display for pilots, and extra bars can now be hidden from the hint via hideInHint flag

_Settings/API:_ `tokenStatHintHideCurrentOnScan`

_Verify fixed:_ MISSED: extra bars with hideInHint flag are now filtered out of the stat hint popup (user-facing change for anyone configuring extra bars)

### `styles/tah.css` - modified - feature - user-facing - CORRECTED

Adds CSS for pilot level / NPC tier rank badges shown next to token names in the HUD, a new Bond management panel with selects, checkboxes, and action buttons, a draggable-cursor style for unlocked HUD columns, and improved dark-mode styling for the status search row.

_Details:_ New classes: .la-hud-token-rank (orange rank left of token name), .la-hud-rank (green inline rank on Pilot/Frame/Class rows), .la-hud-bond-panel and related .la-bond-* classes for a bond selection/configuration UI. Also adds grab cursor when the HUD is unlocked and tweaks the status search row background to use a neutral tint instead of primary-color, with a dark-mode override. Minor spacing tweaks (margin-right, padding) on an existing tooltip/icon element.

_Changelog:_ Added pilot level and NPC tier display in the Token Action HUD, a new Bond management panel, draggable HUD columns when unlocked, and improved dark-mode styling.

_Verify fixed:_ Added mention of the small margin-right/padding tweak on the existing element (lines +37-38) which the details omitted; Added draggable HUD columns to changelog bullet, which was mentioned in summary/details but missing from changelog

## Token Display

### `scripts/tah/statbar/config.js` - modified - feature - user-facing

Adds a new stat-bar auto-inject setting for Bond XP and a new 'scanned' visibility mode for stat bars.

_Details:_ New setting key SETTING_AUTO_INJECT_BOND_XP ('statBarAutoInjectBondXp') allows auto-injecting Bond XP as a stat bar. New visibility constant VIS_SCANNED ('scanned') adds a visibility mode that likely ties stat-bar visibility to whether the token has been scanned.

_Changelog:_ Added Bond XP auto-inject option and 'scanned' visibility mode for token stat bars.

_Settings/API:_ `statBarAutoInjectBondXp`

### `scripts/tah/tokenStatBar.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds a new 'Owners + scanned' visibility mode for token stat bars (visible to owners and players who have scanned the token), auto-injection of a Bond XP bar on bonded pilot tokens, and scrolling text feedback for Bond XP changes. Also removes the old `TokenStatBarConfig` FormApplication class (settings config UI relocated elsewhere).

_Details:_ New VIS_SCANNED visibility option appears in per-token visibility dropdowns as 'Owners + scanned'. Bond XP auto-inject is gated by SETTING_AUTO_INJECT_BOND_XP (default false). Bond XP scrolling text shows delta unless the auto-injected bar already handles feedback. The legacy TokenStatBarConfig settings form class is deleted. Various variable renames (arr→workingExtras/extras) and comment trimming throughout.

_Changelog:_ Added 'Owners + scanned' visibility mode for token stat bars and optional auto-injected Bond XP bar for bonded pilots

_Settings/API:_ `SETTING_AUTO_INJECT_BOND_XP`

_Verify fixed:_ Changed area from 'Token Action HUD' to 'Token Display' - this file is the token stat bar overlay, not the Token Action HUD integration; Removed mention of belowBarsY export from summary - it is an internal helper for positioning, not a user-facing change

### `templates/token-stat-bar-config.html` - deleted - removal - user-facing

Removed the custom token stat bar configuration dialog template, which provided settings for enabling custom stat bars, per-token defaults (hidden, combat-only, row height, pilot stress), visibility modes, and bulk-apply functionality.

_Details:_ This was the Handlebars template for the token stat bar config form. Its removal indicates the custom token stat bar feature has been dropped or replaced in v4.0.0.

_Changelog:_ Removed the custom token stat bar configuration UI.

## Vision & Detection

### `scripts/setup/migrations.js` - modified - internal - internal

Adds a new migration entry 'lancerLosModes_v1' that re-runs the automatic vision setup if the lancerVisionAutoAdd setting is enabled, likely to migrate to a new line-of-sight mode schema.

_Details:_ The migration mirrors the pattern of the existing vision migration above it, calling lancerAutoVisionSetup when the auto-add setting is on.

### `scripts/vision/lancerDetectionModes.js` - modified - fix - user-facing

Fixes line-of-sight vertex-graze detection so that a ray skimming opposite corners of a gap ('pinch' case) now correctly blocks vision, and adds detection for rays running collinear with a wall face. Reorders height checks before endpoint/tip-graze logic so adjacent-shadow rules take priority.

_Details:_ _skimsVertex now returns directional side info (±1) instead of a boolean, enabling detection of opposite-side skims that pinch a line of sight closed. A new _runsAlongWall helper catches rays collinear with wall edges. The debug dump (_dumpLos) now includes reverse rays, dense checks, and cached render values for better diagnostics.

_Changelog:_ Fixed line-of-sight edge cases where vision could leak through pinched wall corners or along collinear wall faces.

### `scripts/vision/visionFromEdge.js` - modified - docs - internal

Minor wording tweaks to the hint text for the Vision From Edge settings.

_Details:_ The 'Vision From Edge' setting hint was simplified from mentioning 'large tokens can peek around corners' to 'token perimeter instead of its center'. The sample density hint received minor grammar cleanup.

## Wrecks

### `scripts/tools/wreck.js` - modified - improvement - user-facing - CORRECTED

Wreck aura color and opacity are now configurable via module settings instead of being hardcoded, and wreck auras are no longer restricted to only showing during combat.

_Details:_ The buildWreckAuraFlag function now reads 'wreckAuraColor' and 'wreckAuraOpacity' settings, falling back to the previous defaults (#8B4513, 0.2). Line opacity is derived as fillOpacity * 4 (clamped to 1). The onlyEnabledInCombat flag was changed from true to false so wreck auras display outside of combat. The token-factions team lookup now checks game.settings.settings.has() instead of game.modules.get()?.active, which is a minor robustness fix. Remaining changes are variable renames (origDisp→origDisposition, effPath→effectPath, etc.).

_Changelog:_ Added settings to customize wreck aura color and opacity, and made wreck auras visible outside of combat.

_Settings/API:_ `wreckAuraColor`, `wreckAuraOpacity`

_Verify fixed:_ Added detail about lineOpacity now being derived from fillOpacity * 4 rather than hardcoded 0.8; Added note about token-factions lookup change being a robustness fix

## Assets & generated (not AI-reviewed)

- `FX/audio/extra/boulder_ground_1.wav` (added)
- `FX/audio/extra/explosion_ground_1.wav` (added)
- `FX/audio/extra/mine.wav` (added)
- `FX/svg/Mine.svg` (added)
- `doc/vid/ae-workshop.gif` (added)
- `doc/vid/fs-damage-feedback.mp4` (modified)
- `icons/back-forth.svg` (added)
- `icons/cross-mark.svg` (added)
- `icons/dice-shield.svg` (added)
- `icons/overheated.svg` (added)
- `icons/pill.svg` (added)
- `icons/spiked-halo.svg` (added)
