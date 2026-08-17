# Release change notes

Base: `HEAD`  -  Model: `opus`  -  Reviewed: 46  -  Verify-corrected: 15  -  Errored: 0

## Attack & Targeting

### `scripts/activations/flow-steps.js` - modified - fix - user-facing - CORRECTED

Hit/crit/miss immunity checks are extracted into a separate `hitImmunityStep` that runs before the attack card is printed, ensuring immunity results are correctly serialized into the chat message. The case where both miss and hit immunity are present now properly skips further immunity processing.

_Details:_ Previously, immunity checks (crit immunity, miss immunity, hit immunity) were embedded inside `onHitMissStep`. They are now in a dedicated `hitImmunityStep` that runs earlier so the printed attack card reflects immunity outcomes. The case where a target has both miss and hit immunity now correctly skips further immunity processing via `continue`. Additionally, `injectExtraDataUtility` is now called in `runCancellableStep`, `onActivationStep`, and `onInitActivationStep` to ensure extra data is available in those flows.

_Changelog:_ Fixed hit/crit/miss immunity checks so they are applied before the attack card is printed, ensuring the chat message accurately reflects immunity outcomes

_Verify fixed:_ Changed kind from 'improvement' to 'fix' - this corrects a bug where immunity results were not reflected in the printed attack card, which is a fix rather than an enhancement

### `scripts/activations/statroll-target-button.js` - modified - feature - user-facing

When a stat roll (save) targeting session is active, a visual tether line is now drawn between the rolling token and its current target(s), updating live as targets change.

_Details:_ Uses the new createTokenTether helper to draw lines from the roller to each targeted token. The tether refreshes on the targetToken hook and is cleaned up when the session ends.

_Changelog:_ Added a visual tether line connecting the rolling token to its target during save rolls

## Automation Engine

### `doc/AUTOMATION_SYSTEM.md` - modified - docs - user-facing - BLOG - CORRECTED

Documents the new `triggerTarget` filter identity for reactions (react only when you are the target of an attack/tech/damage), and clarifies how `activationType: "flow"` resolves its action path and how `activationMode` relates to the reaction's own flow rather than the triggering flow.

_Details:_ The filter chain now lists three identities: triggerSelf (the actor doing it), triggerTarget (the one it is done to), and triggerOther (everyone else, still includes targets for back-compat). A new explanatory paragraph describes when triggerTarget applies (attacks, tech, damage, onRoll, onCheck, onInvoluntaryMove), notes that target-reactors get `isTarget` and `targetEntry` context, fire even when the attacker is hidden, and that cancel actions require `autoActivate`. The `activationType: "flow"` description is updated to explain a resolution chain (reactionPath action → first Reaction action → system flow → generic chat card). The `activationMode` section is rewritten: it now only applies to macro/code, clarifies that it controls whether the reaction's own flow also fires (not the triggering flow), and notes `"instead"` is the default for item reactions while `"after"` is the default for general reactions.

_Changelog:_ Documented the new `triggerTarget` reaction filter, letting automations fire only for the target of an attack or effect

_Settings/API:_ `triggerTarget`, `activationType`, `activationMode`, `reactionPath`

_Verify fixed:_ Added activationType, activationMode, and reactionPath to settings_or_api since the docs materially changed their semantics/defaults, not just triggerTarget

### `scripts/activations/flow-wraps.js` - modified - feature - user-facing - CORRECTED

Stat rolls (HASE checks) now support pre-seeded accuracy, difficulty, and flat modifier values via `la_extraData`, similar to how weapon tags work on attacks. The player still sees and can adjust these values in the HUD.

_Details:_ A new `applyStatRollPresets` function reads `accuracy`, `difficulty`, and `flatModifier` from `state.la_extraData` and applies them to the stat roll state before the HUD opens. This is called in the existing `wrapStatRollFlatModifier` flow wrap.

_Changelog:_ Added support for pre-seeding accuracy, difficulty, and flat modifiers on stat rolls via automation extra data

_Settings/API:_ `la_extraData.accuracy`, `la_extraData.difficulty`, `la_extraData.flatModifier`

_Verify fixed:_ settings_or_api was empty but should list the new la_extraData fields that callers/macros can use to drive this feature

### `scripts/activations/reaction-manager.js` - modified - feature - user-facing - BLOG

Adds a new 'React as Target' (triggerTarget) role for reactions, letting a reaction fire from the perspective of the targeted token rather than the attacker or self. Also introduces grouped-default sub-reaction overrides so individual sub-reactions within a group can be independently customized/saved without affecting the others, with legacy flat-save migration support.

_Details:_ A new triggerTarget checkbox is exposed in the Reaction Editor. A TARGET_CAPABLE_TRIGGERS set restricts which trigger hooks are valid when triggerTarget is enabled (attack, tech attack, hit/miss, damage, roll, check, involuntary move). The save/load/delete logic for grouped default reactions is reworked: individual sub-slots can now carry full overrides (including custom triggers/code) while sibling subs stay on defaults. Legacy flat saves are migrated by matching trigger sets. Deletion of a grouped-default sub now nulls the slot instead of splicing to preserve index alignment. An 'after mode' warning is now shown in the editor when using macro/code activations in after mode.

_Changelog:_ Added 'React as Target' trigger role for reactions, allowing reactions to fire from the targeted token's perspective on attack, damage, and similar triggers

### `scripts/activations/reactions-engine.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds a new `triggerTarget` reaction filter so reactions can fire specifically when the reactor is the target of an attack or action, not just the source. Also enriches reaction data with `isTarget` and `targetEntry` fields, fixes message routing to fall back locally when the target user is offline, and refines hidden-token logic to allow target-reactions even when the triggering token is hidden.

_Details:_ New `triggerTarget` property on reactions allows a reaction to fire when `triggerOther` is false but the reactor is one of the hit targets. The `isOriginInvolved` helper now accepts a `role` parameter ('source', 'target', or either) instead of checking all roles indiscriminately. A `findTargetEntry` helper extracts the reactor's specific target entry (with roll/crit data) from `data.targets`. The `_buildSendMessageToReactor` function now checks `game.users.get(targetUserId)?.active` and falls back to local execution if the user is offline. Target normalization in `_handleTriggerBody` now also considers `data.token` and `data.checkAgainstToken` as single-target fallbacks.

_Changelog:_ Added `triggerTarget` reaction filter so reactions can fire when the reactor is the target of an attack, and improved reaction routing when target players are offline.

_Settings/API:_ `triggerTarget`

_Verify fixed:_ Added 'triggerTarget' to settings_or_api since it is a new configurable reaction property exposed to content authors

### `scripts/main.js` - modified - feature - user-facing - BLOG

Adds a new 'hitImmunity' flow step inserted between rolling attacks and the hit/miss callback in both WeaponAttackFlow and BasicAttackFlow, imports and initializes a new 'blindedVision' module that clamps a blinded token's sight to one space, and wires up a post-ready 'afterFxDrain' callback.

_Details:_ The hitImmunity step is registered and inserted right after rollAttacks, before the existing onHitMiss step, for both weapon and basic attack flows. BlindedVision is initialized during the init hook. bindAfterFxDrain is called via setTimeout(0) in the ready hook.

_Changelog:_ Added hit-immunity handling in attack flows and blinded-status vision clamping to one space

### `scripts/setup/codemirror-hints.js` - modified - improvement - user-facing - CORRECTED

Adds CodeMirror autocompletion hints for new reactor trigger fields: `isTarget`, `targetEntry`, and promotes `hitTokens`, `isTarget`, `targetEntry` to common trigger fields available across all triggers.

_Details:_ New hint entries document `isTarget` (boolean, true when the reactor is one of the event targets) and `targetEntry` (the reactor's own per-target entry with roll/crit data). These three fields are also added to COMMON_TRIGGER_FIELDS so they appear in autocomplete for all trigger types.

_Changelog:_ Added autocompletion hints for `isTarget` and `targetEntry` reactor trigger fields, and made `hitTokens`, `isTarget`, and `targetEntry` available as common fields across all trigger types

_Verify fixed:_ Changed area from 'Bonuses & Effects' to 'Automation Engine' — CodeMirror hints for reactor triggers are part of the automation/scripting engine, not bonuses/effects; Expanded changelog to mention hitTokens promotion to common fields, which was described in summary/details but missing from the changelog bullet

### `scripts/socket.js` - modified - fix - user-facing

Fixed socket message handler to always send an acknowledgment back to the requester, even when the reactor token is missing or an error occurs. Previously these cases could cause the requesting client to hang waiting for a response that never came.

_Details:_ When msgToken is not found, an ack with null returnData is now emitted instead of silently returning. The catch block now also emits an ack so the caller is unblocked on errors.

_Changelog:_ Fixed socket message reactions hanging indefinitely when the reactor token was missing or an error occurred

### `scripts/typing/types.d.ts` - modified - feature - user-facing - BLOG

Adds a new `triggerTarget` option to reaction configs so a reaction can fire when the reactor is one of the event's targets, even with `triggerOther` off. Also exposes per-reactor `isTarget` and `targetEntry` fields on trigger data, and removes the deprecated `item-use` activation type.

_Details:_ TriggerDataBase gains `isTarget` (boolean) and `targetEntry` (the reactor's own entry from the targets array with roll/crit info). ReactionConfig gains `triggerTarget` (boolean). The `hitTokens` doc comment is updated to note additional unwrap sources (`{ token }`, `checkAgainstToken`). The `activationType` union drops `"item-use"`.

_Changelog:_ Added `triggerTarget` reaction option so automations can fire specifically when the reactor is a target of the triggering event

_Settings/API:_ `triggerTarget`, `isTarget`, `targetEntry`

### `templates/reaction-editor.html` - modified - feature - user-facing - BLOG

Adds a new 'React as Target' checkbox to the reaction editor, allowing a reaction to fire when the token is one of the event's targets (attacks, tech, damage, checks, forced movement) even with 'React to Others' off. Also clarifies the activation mode labels and adds an explanatory warning for the 'Alongside flow' mode.

_Details:_ The 'Instead of Flow' and 'After Flow' labels are renamed to 'Instead of flow (code only)' and 'Alongside flow (also posts card)' respectively, with updated help text and a new info banner explaining that 'Alongside flow' fires the reaction's own flow/card alongside the macro/JS code.

_Changelog:_ Added 'React as Target' option for reactions, letting them fire when the token is targeted by an attack, tech, damage, check, or forced movement

_Settings/API:_ `triggerTarget`

## Battle Log

### `scripts/Battelog/telemetry-store.js` - modified - fix - user-facing

Fixed reclassification of battle log telemetry entries for combatants whose tokens were deleted or removed from the encounter. Previously they defaulted to 'players' bucket and 'player' side; now they stay in whichever bucket they were originally recorded in.

_Details:_ When reclassifyCombat runs and a combatant is no longer present (e.g. token deleted), the entry retains its original bucket instead of defaulting to 'players'. The fallback side is also derived from the original bucket ('enemy' for hostiles/secrets, 'player' otherwise) rather than always defaulting to 'player'.

_Changelog:_ Fixed battle log telemetry misclassifying removed combatants (e.g. deleted hostile tokens) as players during reclassification.

## Bonuses & Effects

### `effectManager.js` - added - feature - user-facing - BLOG - CORRECTED - CHUNKED x2

New Effect Manager dialog providing a unified GUI to apply and manage standard status effects, custom statuses, and bonuses (stat, accuracy/difficulty, damage, tag, range, immunity, target modifier, reroll) on tokens, prototype actors, or items — with duration controls, stacking, auto-consumption triggers with extensive filtering, preset save/load, interactive token and item pickers, a status picker, CodeMirror-based condition editors, and a Manage tab for viewing and removing all active effects and bonuses.

_Details:_ Supports eight bonus types (stat, roll, damage, tag, range, immunity, target_modifier, reroll) with per-type configuration. Damage bonuses have four modes (bonus, add, replace, change_type). Stat bonuses support add/replace. Immunity covers effect, damage, resistance, crit, hit, miss, elevation, terrain, obstacle, and provoke subtypes. Target modifiers include invisible, cover variants, AP, half damage, paracausal, and forced crit/hit/miss. Auto-consumption triggers cover 24 event types with filters for item LID/ID, action name, boost, status, role, distance, and custom evaluate code. Presets are stored per-user via flags. Tier gate integration for NPC tier-gated effects. Supports linking effects/bonuses to items and prototype actors in addition to live tokens, with appropriate flag storage under lancer-automations.global_bonuses. Duration options include Permanent (survives Full Repair) and Constant (no icon, always active, for bonuses). Custom tab allows Active Effect Changes via an advanced code field. Integrates with the temporary-custom-statuses module for saved custom statuses. Tabbed UI (bonus creation, item browser, manage) with highlight integration for selected tokens, combat hook cleanup on close, and ResizeObserver support.

_Changelog:_ Added the Effect Manager, a comprehensive dialog for applying and managing status effects, custom statuses, and bonuses on tokens with full duration, consumption, and preset support.

_Settings/API:_ `effectManagerPresets (user flag)`, `EffectManagerAPI.executeEffectManager`, `EffectManagerAPI.openItemBrowser`

_Verify fixed:_ Added Permanent duration (survives Full Repair) and Constant duration (no icon, always active) to details as user-visible behaviors; Added temporary-custom-statuses module integration to details; Added Custom tab Active Effect Changes advanced feature to details; Added exported API functions executeEffectManager() and openItemBrowser() to settings_or_api; Clarified effectManagerPresets is a user flag, not a game setting

### `scripts/bonuses/duration-widget.js` - modified - improvement - user-facing

Adds helper functions for turn-based durations (`untilEndOfTurn`, `untilStartOfTurn`, `currentTurnKey`) and extends the duration-mark system to support multiple origin tokens with visual tether lines connecting origins to their targets.

_Details:_ The `createDurationMarks` system now accepts `originTokens` (plural) in addition to a single `originToken`, draws yellow marks on each origin, and renders tether lines between every origin-target pair using the new `createTokenTether` utility. New exported helpers simplify building durations that end at the start or end of a specific token's turn.

_Changelog:_ Improved duration markers to support multiple origin tokens with visible tether lines to their targets

### `scripts/bonuses/effectManager.js` - modified - feature - user-facing - BLOG

The Effect Manager now supports multi-token targeting: selecting several tokens opens the manager with all of them as targets, and effects/bonuses are applied to every selected token in one action. A new 'Each Target' duration origin option gives each target its own independent duration tracking. Additionally, consumption triggers gain a new 'role' filter (Source / Target / Source or target) for attack, hit, miss, damage, tech, and check events, and the token picker supports Shift-click to add tokens to the selection.

_Details:_ Target selects across all tabs (Standard, Custom, Bonus, Manage) are now synced so changing one updates the others. Multi-token picks use a new pickTokensCardless API with preselection support. The canvas highlight system now marks multiple target tokens and multiple origin tokens simultaneously. The consumption filter layout is reorganized into a two-column row for item LID and item ID fields, with shorter labels.

_Changelog:_ Added multi-token targeting to the Effect Manager — select several tokens and apply effects or bonuses to all of them at once, with per-target duration tracking via the new 'Each Target' origin option and a new consumption role filter.

### `scripts/bonuses/flagged-effects.js` - modified - improvement - user-facing - CORRECTED

Exposes duration helper functions (untilEndOfTurn, untilStartOfTurn, currentTurnKey) on the public EffectsAPI, making them available for macro and module use.

_Details:_ Imports these three functions from duration-widget.js and adds them to the EffectsAPI export object.

_Changelog:_ Added `untilEndOfTurn`, `untilStartOfTurn`, and `currentTurnKey` helpers to the Effects API for easier macro-based duration control.

_Settings/API:_ `EffectsAPI.untilEndOfTurn`, `EffectsAPI.untilStartOfTurn`, `EffectsAPI.currentTurnKey`

_Verify fixed:_ Fixed settings_or_api entries to use 'EffectsAPI.' prefix instead of generic 'api.' to match the actual export object name

### `scripts/setup/status-effects.js` - modified - fix - user-facing - CORRECTED

The infection status effect is now only registered when the infection-damage integration setting is enabled, instead of always. Guardian, Bulwark, and Phasing statuses are now correctly gated behind the additionalStatuses setting and always tracked in the additionalStatusKeys set regardless of whether they are enabled.

_Details:_ Previously the infection status was unconditionally added (for StatusFX). Now it checks enableInfectionDamageIntegration first. The guardian/bulwark/phasing statuses were previously added outside the additionalStatuses check, meaning they appeared even when that setting was off. They are now properly nested inside the setting guard. Their keys are also hardcoded into additionalStatusKeys so isAdditionalStatusUnavailable can still identify them.

_Changelog:_ Fixed Guardian, Bulwark, Phasing, and Infection status effects respecting their relevant settings; they no longer appear when their associated settings are disabled.

_Settings/API:_ `enableInfectionDamageIntegration`, `additionalStatuses`

_Verify fixed:_ Changelog now also mentions the Infection status fix, which was omitted from the original changelog bullet despite being called out in the summary

## Combat & Turns

### `scripts/activations/reactions-ui.js` - modified - fix - user-facing

Fixes reaction activation so that mech weapons and pilot weapons are no longer incorrectly routed through the system flow, ensuring they use the proper weapon activation path instead.

_Details:_ The condition for calling beginSystemFlow now also checks item.is_mech_weapon?.() and item.is_pilot_weapon?.() in addition to the existing system.type !== "Weapon" check, preventing weapons that don't have type exactly equal to "Weapon" from bypassing the weapon activation flow.

_Changelog:_ Fixed reactions for mech and pilot weapons not using the correct weapon activation flow

### `scripts/combat/action-limits.js` - modified - improvement - internal

Action lock and action-type lock results now propagate a `kind` field from the lock data, allowing downstream consumers to distinguish between different kinds of locks.

_Details:_ Both getItemActionLocks and getItemActionTypeLocks now include `lock.kind ?? null` in their returned objects.

## Deployables & Thrown Weapons

### `scripts/interactive/deployables.js` - modified - feature - user-facing

Adds a 'disabled' lock kind distinct from full locks, shown yellow in the HUD instead of grey. Also adds new API helpers to destroy, disable, and restore items, and to disable/enable actions or action types separately from locking/unlocking.

_Details:_ lockActorAction, lockActorActionTypes, unlockActorAction, and unlockActorActionTypes now accept an optional `kind` parameter to differentiate lock types. New exported functions: disableActorAction, enableActorAction, disableActorActionTypes, enableActorActionTypes, destroyItem, disableItem, restoreItem. Unlock/filter logic is updated to match on kind so disabled-kind entries can be removed independently.

_Changelog:_ Added disable/enable action API (yellow HUD state) distinct from lock/unlock, plus destroyItem, disableItem, and restoreItem helpers.

_Settings/API:_ `disableActorAction`, `enableActorAction`, `disableActorActionTypes`, `enableActorActionTypes`, `destroyItem`, `disableItem`, `restoreItem`

## Docs

### `README.md` - modified - docs - internal

Minor rewording of the Workshop section description in the README, changing 'Talk about it in the workshop channel' to 'Anything about writing or sharing automations goes in the workshop channel'.

### `doc/API_COMBAT.md` - modified - docs - user-facing

Expanded the Combat API documentation with new parameters and two new API functions. Documents accuracy/difficulty/flatModifier pre-fill options for stat rolls, save-vs-effect, contested checks, and force checks. Documents `targets` parameter for basic/tech/weapon attacks. Adds entries for the new `activateGeneralAction` and `afterFx` API functions.

_Details:_ executeStatRoll, executeSaveVsEffect, executeContestedCheck, executeForceCheck now document accuracy/difficulty/flatModifier params that pre-fill the HASE HUD. executeBasicAttack, executeTechAttack, executeWeaponAttack now document targets param. New activateGeneralAction(actorOrToken, name) triggers a general action by registry name. New afterFx(callback) runs a callback after lancer-weapon-fx finishes its sequence.

_Changelog:_ Added API documentation for `activateGeneralAction`, `afterFx`, accuracy/difficulty/flatModifier pre-fills, and `targets` parameter on attack functions.

_Settings/API:_ `api.activateGeneralAction`, `api.afterFx`

### `doc/API_EFFECTS.md` - modified - docs - user-facing

Documents three new API helpers: `api.inDangerZone`, `api.untilEndOfTurn`/`api.untilStartOfTurn`, and `api.currentTurnKey` in the Effects API reference.

_Details:_ inDangerZone checks if heat is at or above half the heat cap. untilEndOfTurn/untilStartOfTurn build correct duration objects that handle the off-by-one case when applied on the target's own turn. currentTurnKey returns a round:turn stamp for identifying the current combat turn.

_Settings/API:_ `api.inDangerZone`, `api.untilEndOfTurn`, `api.untilStartOfTurn`, `api.currentTurnKey`

### `doc/API_ITEMS.md` - modified - docs - user-facing

Documents three new API functions: destroyItem, disableItem, and restoreItem, which allow macros/modules to programmatically destroy, disable, or restore items on actors.

_Details:_ The new API_ITEMS.md section explains that destroyed/disabled items are skipped by the reaction engine and action-lock system, and that restoreItem clears both flags.

_Changelog:_ Added API functions `destroyItem`, `disableItem`, and `restoreItem` for programmatic item state management.

_Settings/API:_ `api.destroyItem`, `api.disableItem`, `api.restoreItem`

### `doc/API_REFERENCE.md` - modified - docs - user-facing - CORRECTED

Documents new `role` field on charge-consumption config, new `triggerTarget` field on reaction config, removal of `item-use` activation type, and changed `activationMode` defaults. Also clarifies `triggerOther` description.

_Details:_ New fields: `consumeCharges[].role` ("source"|"target"), `reactions[].triggerTarget`. Removed `"item-use"` from `activationType` enum. `activationMode` default is now `"instead"` for item reactions and `"after"` for general reactions, with clarified description. `triggerOther` description updated to note it includes targets.

_Changelog:_ Documented new `role` option for charge consumption and `triggerTarget` option for reactions, allowing finer control over source-vs-target triggering; updated docs to reflect removal of `item-use` activation type and changed `activationMode` defaults

_Settings/API:_ `consumeCharges[].role`, `reactions[].triggerTarget`, `reactions[].activationType`, `reactions[].activationMode`

_Verify fixed:_ area changed from 'Bonuses & Effects' to 'Docs' — this file is API_REFERENCE.md documentation, not the implementation itself; kind changed from 'improvement' to 'docs' — this diff only changes documentation; settings_or_api expanded to include reactions[].activationType and reactions[].activationMode which were also changed

### `doc/feature/AUTOMATION_ENGINE.md` - modified - docs - internal - CORRECTED

Updates the Automation Engine documentation to clarify triggerTarget, triggerSelf, and activationMode behavior. Adds mention of `triggerTarget: true` for target-only reactions and rewords the `activationMode` descriptions for accuracy.

_Details:_ Documents that triggerTarget: true makes the reactor one of the event's targets (the one being attacked), usable with both triggerSelf and triggerOther off. Clarifies that activationMode 'instead' means the code runs alone, and 'after' fires the reaction's own flow/card alongside it, with neither touching the triggering flow.

_Settings/API:_ `triggerTarget`, `activationMode`

_Verify fixed:_ Added triggerTarget and activationMode to settings_or_api since these are automation-engine API options being documented

## FX & Sounds

### `scripts/activations/after-fx.js` - added - internal - internal - CORRECTED

Adds an internal queue system that defers automation callbacks until after lancer-weapon-fx has started its visual sequence, ensuring chat cards from triggered automations appear after the FX rather than before. Hooks into all major Lancer flow postFlow events to drain the queue.

_Details:_ Registers postFlow hooks for WeaponAttackFlow, BasicAttackFlow, TechAttackFlow, ActivationFlow, SystemFlow, CoreActiveFlow, OverchargeFlow, FullRepairFlow, StructureFlow, SecondaryStructureFlow, OverheatFlow, and CascadeFlow. Binds one tick after ready so listeners register behind lancer-weapon-fx's listeners.

_Verify fixed:_ Changed kind from 'feature' to 'internal': this is purely internal plumbing (not user-facing) with no new feature exposed to users

### `scripts/fx/actionFX.js` - modified - fix - user-facing

Adds `.aboveInterface()` to damage impact, target fail (miss), and crit/miss overlay effects so they render above the Foundry UI layer instead of potentially being hidden behind interface elements.

_Details:_ Three Sequencer effect chains updated: damage impact hits, the 'miss' red indicator, and the miss/crit overlay icons.

_Changelog:_ Fixed damage impact, miss, and crit overlay FX rendering behind the interface

## Interactive Tools

### `doc/API_INTERACTIVE.md` - modified - docs - internal

Documents new API options for pre-filling accuracy, difficulty, and flat modifier values on the HASE Contest and Force Check interactive cards.

_Details:_ openHaseContestCard gains accuracy1/difficulty1/flatModifier1 (and 2 variants for contender B). openForceCheckCard gains accuracy/difficulty/flatModifier which can be a number or a per-roller callback.

_Settings/API:_ `api.openHaseContestCard`, `api.openForceCheckCard`

### `scripts/activations/api-reference-popup.js` - modified - improvement - user-facing - CORRECTED

Updated the API reference popup's curated 'HUD actions' group to list newly added API functions: lockActorActionTypes, unlockActorActionTypes, disableActorAction, enableActorAction, disableActorActionTypes, enableActorActionTypes, destroyItem, disableItem, and restoreItem.

_Details:_ These entries make the new action-locking, disabling, and item destruction API functions discoverable in the in-app API reference popup.

_Changelog:_ The in-app API reference popup now lists the new HUD action functions (lock/unlock action types, disable/enable actions, destroy/disable/restore items).

_Settings/API:_ `lockActorActionTypes`, `unlockActorActionTypes`, `disableActorAction`, `enableActorAction`, `disableActorActionTypes`, `enableActorActionTypes`, `destroyItem`, `disableItem`, `restoreItem`

_Verify fixed:_ Set user_facing to true: the API reference popup is an in-app UI that macro authors interact with, so new entries there are user-visible; Added changelog bullet: documenting new discoverable API functions in the reference popup is a user-facing improvement worth noting

### `scripts/interactive/canvas-helpers.js` - modified - improvement - user-facing

Adds a new marching-dash tether line between token pairs on the canvas (used for deployable links), increases perimeter glow visibility, and adds options to control perimeter halo and perimeter rendering on range highlights.

_Details:_ New createTokenTether() draws animated dashed lines between token pairs. RANGE_PULSE_STYLE.perimeterAlpha doubled from 0.3 to 0.6. paintPerimeterGlow gains an optional 'halo' toggle. createMergedRangeHighlight gains 'perimeterHalo' and 'perimeter' options to optionally suppress the perimeter outline or its halo.

_Changelog:_ Added animated tether lines between linked tokens and improved range highlight perimeter visibility and configurability.

### `scripts/interactive/canvas.js` - modified - internal - internal

Re-exports new pickTokensCardless tool functions (pickTokensCardless, isCardlessTokenPickerActive, cancelCardlessTokenPicker) from the canvas barrel file.

_Details:_ Adds a new export line for the cardless token picker tool, making it available through the canvas module's public API.

_Settings/API:_ `pickTokensCardless`, `isCardlessTokenPickerActive`, `cancelCardlessTokenPicker`

### `scripts/interactive/tools/advancedMeasure.js` - modified - improvement - user-facing - CORRECTED

Refined the Advanced Measure tool's pin range visuals: added a merged fill highlight behind per-source perimeter rings, tuned the breathing pulse alpha range to avoid visual artifacts, and re-layers pin graphics so they aren't buried by the pulse. Also restyled the toolbar help tooltip to be more compact and gave active dropdown items a filled highlight instead of just accent text color.

_Details:_ Removed old debug globals (laMeasureRef, _dbgMoveCount, etc.) and replaced them with a GPU pixel-sampling diagnostic (laPinPix). Pin visuals now include a combined fill layer plus per-source perimeter-only rings that are re-raised above the pulse. The breathing alpha sweep was narrowed (0.535±0.235, peaking at 0.77) to stay below the threshold where the interior gains visible shading. The hover-token heal logic was simplified. Active dropdown items now use a solid primary-color background with white text instead of just accent-colored text. The help tooltip was made smaller (font 11.5px, max-width 360px, tighter padding). Dropdown trigger buttons now show an active style when a non-'none' value is selected.

_Changelog:_ Improved Advanced Measure pin range visuals with a merged fill highlight, corrected breathing pulse intensity, and polished toolbar dropdown and tooltip styling

_Verify fixed:_ Added mention of dropdown trigger button gaining active styling when a value is selected (markActive on trigger when current !== 'none')

### `scripts/interactive/tools/forceCheck.js` - modified - improvement - user-facing

The Force Check interactive tool now draws tether lines from each rolling target back to the token they are saving against, providing clearer visual feedback. It also accepts accuracy, difficulty, and flatModifier parameters that are forwarded to the execution call.

_Details:_ A createTokenTether visual is created and updated whenever the save-vs token or target list changes, and destroyed on cleanup. The openForceCheckCard function signature now includes accuracy, difficulty, and flatModifier options passed through to executeForceCheck.

_Changelog:_ Added visual tether lines and accuracy/difficulty/flat modifier support to the Force Check tool

_Settings/API:_ `openForceCheckCard`

### `scripts/interactive/tools/haseContest.js` - modified - improvement - user-facing

The HASE Contest card now supports accuracy, difficulty, and flat modifier parameters for both sides, and draws a visual tether line between the two selected tokens during the contest.

_Details:_ openHaseContestCard accepts new optional parameters (accuracy1, difficulty1, flatModifier1, accuracy2, difficulty2, flatModifier2) that are forwarded to executeContestedCheck. A canvas tether line (via createTokenTether) is drawn between the two contesting tokens while the card is open.

_Changelog:_ Added accuracy/difficulty/flat modifier support and a visual tether between tokens for HASE contests

_Settings/API:_ `openHaseContestCard`

### `scripts/interactive/tools/pickTokensCardless.js` - added - feature - user-facing

Adds a new 'cardless' token picker that lets users click to select tokens on the canvas without needing an open automation card. Supports single-pick (click to select and close), multi-pick via Shift-click, visual tether lines back to anchor tokens, overlap stack disambiguation, and cursor/mark previews with sound feedback.

_Details:_ Provides pickTokensCardless(), isCardlessTokenPickerActive(), and cancelCardlessTokenPicker() exports. Handles preselected tokens, optional self-exclusion, configurable mark color, right-click/Escape/Enter to confirm, shift-toggle for multi-select, and broadcasts tool presence for multiplayer visibility.

_Changelog:_ Added a standalone token picker tool for selecting tokens on the canvas without requiring an open automation card

### `scripts/tools/misc-tools.js` - modified - improvement - user-facing

Adds accuracy/difficulty/flat-modifier pre-fill support to stat rolls, save-vs-effect, contested checks, and force checks. Introduces a `targets` option for attack flows so callers can specify targets programmatically. Adds new API functions `inDangerZone`, `activateGeneralAction`, `afterFx`, and `hasReactionAvailable`. Extracts a shared `setFlowTargets` helper for targeting.

_Details:_ Stat rolls (executeStatRoll, executeSaveVsEffect, executeContestedCheck, executeForceCheck) now accept accuracy, difficulty, and flatModifier options that pre-fill the HASE HUD, with per-target function support. Attack entry points (attackWith, beginWeaponAttackFlow, executeBasicAttack, executeTechAttack) now accept a `targets` option and use a unified `setFlowTargets` helper instead of manually calling setTarget. New `inDangerZone` utility checks if heat is at or above half the heat cap. New `activateGeneralAction` triggers a general action (Brace, Boost, etc.) by name via the ReactionManager registry. `afterFx` and `hasReactionAvailable` are also newly exposed on MiscAPI.

_Changelog:_ Added accuracy/difficulty/flat-modifier pre-fill to stat rolls, saves, contested checks, and force checks; added programmatic `targets` option for all attack flows; exposed new API helpers `inDangerZone`, `activateGeneralAction`, `afterFx`, and `hasReactionAvailable`.

_Settings/API:_ `api.inDangerZone`, `api.afterFx`, `api.activateGeneralAction`, `api.hasReactionAvailable`

## Internal / Tooling

### `module.json` - modified - internal - internal

Version bump from 4.1.0 to 4.1.2 in module.json, updating the version field and download URL.

## NPC Automations

### `startups/itemActivations.js` - modified - feature - user-facing - BLOG

Adds full automations for the Witch NPC class (Tear Down, Blind, Predatory Logic, Blur, Petrify, Pain Transference) and the Everest frame's Power Up core bonus. Also wraps several activation effects (Defense Net tech miss, Sealant Blend) in afterFx for proper FX sequencing, registers Ring of Fire as a HUD-marked automation, and renames lockActorActionTypes/unlockActorActionTypes to disableActorActionTypes/enableActorActionTypes.

_Details:_ Witch automations include: Tear Down applies heat damage and a persistent mark that burns targets each turn start (with Pain Transference splash if present), clearable via Stabilize; Blind deals tier-scaled heat and forces a Systems save for Blinded/Impaired; Predatory Logic forces a target to attack with one of their own weapons (with Brace opt-out); Blur applies invisible-like targeting penalty when attacker is in danger zone; Petrify escalates through slowed→immobilized→stunned over successive turns, once per scene per target. Everest Power Up grants +1 accuracy while core power is active. Lightning Reflexes refactored to remove nested Promise wrapper. Em-dash characters replaced with hyphens throughout card titles.

_Changelog:_ Added full NPC automations for the Witch class (Tear Down, Blind, Predatory Logic, Blur, Petrify, Pain Transference) and the Everest frame's Power Up core bonus.

_Settings/API:_ `api.afterFx`, `api.disableActorActionTypes`, `api.enableActorActionTypes`, `api.executeSaveVsEffect`, `api.applyMark`, `api.findMarkedTokens`, `api.clearMarks`, `api.ensureLinkedBonus`, `api.beginWeaponAttackFlow`, `api.activateGeneralAction`, `api.currentTurnKey`, `api.addActorFlags`, `api.getActorFlags`

### `templates/reaction-config.html` - modified - feature - user-facing

Adds an "EDITED" badge next to reaction names in the reaction config UI when a default reaction has been overridden by the user's edited version.

_Details:_ Three locations in the reaction list template now show a styled 'EDITED' badge (accent-colored pill) when `this.isOverridden` is true, with a tooltip explaining the override.

_Changelog:_ Added an "EDITED" badge in the reaction config to indicate when a default reaction has been overridden by a user edit.

## Setup & Onboarding

### `scripts/setup/settings-register.js` - modified - improvement - internal

Adds requiresReload: true to an existing world-scoped boolean setting so Foundry prompts a reload when it is changed.

_Details:_ The setting at line ~114 (unnamed in the diff context but within registerSettings) now flags that changing it requires a client reload.

## Token Action HUD

### `doc/API_HUD.md` - modified - docs - user-facing

Documents four new API functions for disabling/enabling actor actions and action types in the Token Action HUD, which show yellow (like status-disabled) instead of grey (like locked).

_Details:_ Adds documentation for api.disableActorAction, api.enableActorAction, api.disableActorActionTypes, and api.enableActorActionTypes. These mirror the existing lock/unlock functions but use a yellow disabled appearance for temporary states versus grey for lasting locks. Disabled entries are tracked separately from locked ones.

_Changelog:_ Added `disableActorAction` / `enableActorAction` and `disableActorActionTypes` / `enableActorActionTypes` API functions for temporarily disabling HUD actions with a yellow indicator, distinct from locking.

_Settings/API:_ `api.disableActorAction`, `api.enableActorAction`, `api.disableActorActionTypes`, `api.enableActorActionTypes`

### `scripts/tah/hud.js` - modified - fix - user-facing

Actions that are hard-disabled (kind 'disabled') via action locks now correctly show as unavailable in the Token Action HUD, matching the behavior of status-based disabling.

_Details:_ Previously only status-based disabling marked an action as 'unavailable'. Now entries from itemLocks or sources with kind === 'disabled' also trigger the 'unavailable' visual state instead of the softer 'softDisabled' state.

_Changelog:_ Fixed Token Action HUD not showing actions as unavailable when hard-disabled by action locks.

## Vision & Detection

### `scripts/setup/settingsMenus.js` - modified - improvement - user-facing - CORRECTED

Adds a new 'Blinded' section with a 'blindedSetsVision' boolean setting to the Vision settings menu. Also adds a dependency requirement for 'enableLaSossisItems' on 'additionalStatuses', and clarifies the hint text for 'tah.telemetryFriendlyMechAsSquad'.

_Details:_ Three changes: (1) New 'blindedSetsVision' toggle in the Vision settings menu under a 'Blinded' section header. (2) The LaSossis items toggle now requires the 'additionalStatuses' setting to be enabled. (3) The 'Friendly mechs count as squad' hint in the Battle Log section is rewritten for clarity, explaining that GM-run pilots and solo testing will show up in the log.

_Changelog:_ Added a 'Blinded' vision setting that can tie the Blinded condition to token vision. The LaSossis items toggle now requires Additional Statuses to be enabled. Clarified the 'Friendly mechs count as squad' hint in Battle Log settings.

_Settings/API:_ `blindedSetsVision`, `enableLaSossisItems`, `tah.telemetryFriendlyMechAsSquad`

_Verify fixed:_ settings_or_api was missing 'enableLaSossisItems' and 'tah.telemetryFriendlyMechAsSquad' which both had user-facing changes; changelog omitted the LaSossis dependency change and the Battle Log hint rewrite, both user-visible

### `scripts/vision/blindedVision.js` - added - feature - user-facing - BLOG

Adds a new Blinded vision rule: when a token has the Blinded status, its sight range and detection modes are automatically clamped to one space. Vision is restored when the status is removed.

_Details:_ The GM-only writer pattern ensures only the active GM updates token documents. The setting defaults to enabled. Sight range and detection modes (basicSight, lightPerception) are clamped; other detection modes are left unchanged. Reconciliation runs on canvas ready, token creation, and active effect changes.

_Changelog:_ Added automatic vision reduction for Blinded tokens — sight is clamped to one space while the status is active.

_Settings/API:_ `blindedSetsVision`

### `scripts/vision/lancerDetectionModes.js` - modified - improvement - user-facing - BLOG - CORRECTED

Blinded tokens now lose line of sight to targets beyond 1 space, applied directionally so only the blinded viewer is affected. Also adds a safety check to prevent PIXI errors when a destroyed token placeable is referenced during vision checks.

_Details:_ A new _blindedBlocksSight helper checks whether the viewer has the 'blinded' status and the target is more than 1 space away; if so, LOS is denied. This is integrated into hasLineOfSight, DetectionModeLancerLineOfSight, and DetectionModeLancerLosShadow. The _isDestroyed guard prevents crashes when a token's PIXI transform has been nulled. The blinded behavior is gated behind a blindedVisionEnabled() setting imported from blindedVision.js.

_Changelog:_ Added Blinded status support to Lancer vision: blinded tokens lose line of sight beyond adjacent spaces. Fixed a crash when destroyed tokens were still referenced during vision checks.

_Settings/API:_ `blindedVisionEnabled (setting gate for blinded vision behavior)`

_Verify fixed:_ settings_or_api was empty but the feature is gated behind a blindedVisionEnabled() setting; changelog did not mention the destroyed-token crash fix, which is user-facing (prevents errors)

## Assets & generated (not AI-reviewed)

- `icons/sight-disabled.svg` (added)
