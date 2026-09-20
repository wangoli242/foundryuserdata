# Release change notes

Base: `4.2.8`  -  Model: `opus`  -  Reviewed: 176  -  Verify-corrected: 86  -  Errored: 0

## Automation Engine

### `scripts/activations/api-reference-popup.js` - modified - improvement - user-facing - CORRECTED

Replaces hard-coded English labels in the API reference popup with localization keys, enabling translation of group headings and the search placeholder.

_Details:_ All CURATED_GROUPS label strings changed from plain English to localization keys (e.g. 'Cancel & modify the trigger' → 'LA.apiRef.group.cancelModify'). The search input placeholder is also localized via localize('LA.apiRef.searchPlaceholder').

_Changelog:_ API reference popup group headings and search placeholder are now translatable.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — i18n support is a user-facing improvement enabling non-English users to see translated UI; Changed user_facing from false to true — localized labels are directly visible in the popup UI; Added changelog bullet — translatable UI is a meaningful user-facing improvement

### `scripts/activations/flow-wraps.js` - modified - improvement - user-facing - CORRECTED

Replaces two hardcoded English strings in the activation flow wraps with localization calls: the 'Flat Modifier' label and the recharge warning notification.

_Details:_ Uses localize('LA.flow.flatModifier') and localizeFormat('LA.notify.hasNotRecharged', ...) instead of inline English text.

_Changelog:_ Flat Modifier label and recharge warning notification are now localizable.

_Verify fixed:_ kind changed from internal to improvement: localization is a user-facing improvement enabling non-English users to see translated text; user_facing changed to true: these are visible UI strings (a label and a notification); changelog added: localization of visible strings is a user-facing improvement worth noting

### `scripts/activations/reaction-export-import.js` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English UI strings in the reaction/pack export-import dialogs with localization calls (localize / localizeFormat), enabling translation support.

_Details:_ Dialog titles, button labels, notification messages, and form labels throughout ReactionExport, ReactionImport, openPackExport, openPackImport, and related helper functions are now pulled from localization keys instead of inline strings.

_Changelog:_ Export/import dialogs for reactions and packs now support localization/translation.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing capability enabling non-English users to see translated UI; Changed user_facing from false to true — users in non-English locales will see translated dialog titles, button labels, and notifications; Added changelog entry since this is a user-visible improvement for internationalization

### `scripts/activations/reaction-manager.js` - modified - internal - internal

Replaces all hardcoded English UI strings in the reaction/activation manager (dialogs, notifications, settings, trigger group labels, button labels) with localization keys using localize() and localizeFormat() helpers.

_Details:_ Covers settings registration (customReactions, generalReactions, reactionConfig, activationFolders, startupScripts, enableLaSossisItems, enablePersonalStuff), dialog titles (create/rename/delete folder, unsaved changes, reload required, edit activation, select action, find actor, etc.), notification messages (export, import, clipboard copy/paste, validation errors), trigger group labels, and common button labels (Create, Cancel, Rename, Close, Save & Close, Discard, Keep Editing, Delete All, Keep Items).

### `scripts/activations/reactions-engine.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the reactions engine with localization calls (localizeFormat/localize) for out-of-combat warnings and waiting-for-user messages.

_Details:_ Three distinct notification/message strings were converted: the 'not triggered, out of combat' warning, the 'Waiting for <user>' wait card message, and the 'remote user' fallback label.

_Changelog:_ Reaction engine notifications (out-of-combat warnings, waiting-for-user messages) are now localized and will display in the user's configured language.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-visible change for non-English users; Changed user_facing to true — players and GMs see these notification strings in the UI; Added changelog bullet — localized UI strings are a noticeable improvement for international users

### `scripts/activations/reactions-registry.js` - modified - improvement - user-facing - CORRECTED

Replaces dozens of hardcoded English UI strings in the reactions registry (dialog titles, descriptions, chat messages, notifications) with localization calls using `localize()` and `localizeFormat()`. Also removes a now-unnecessary `condition: () => false` from the Brace resistance bonus.

_Details:_ Covers Custom Paint Job, Limited Handling, Veterancy, Overwatch, Brace, Flying, Lock On, Reactor Meltdown, Eject, Dismount, Mount, Search, Jockey, Mine, Ram, and other reactions. One minor logic change: the Brace constant bonus no longer has a `condition` callback that always returned false.

_Changelog:_ Localized all reaction dialog titles, descriptions, chat messages, and notifications for translation support

_Verify fixed:_ user_facing changed from false to true: these are visible dialog titles, chat messages, and notifications that users see directly, and non-English users will now see translated text; changelog added: localization of user-visible strings is a user-facing improvement worth noting

### `scripts/activations/reactions-ui.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the reactions UI with localization calls using `localize` and `localizeFormat`.

_Details:_ Localized: macro-not-found warning, trigger/effect detail text, activation opportunity dialog title, and acknowledge button label.

_Changelog:_ Reaction dialogs and notifications are now localizable (no longer hardcoded English).

_Verify fixed:_ kind changed from 'refactor' to 'improvement' — localization is a user-facing improvement enabling non-English users; user_facing changed from false to true — UI strings (dialog title, button label, warning notification) are directly visible to users; Added changelog bullet — GMs/players using non-English locales will see translated reaction UI text

### `scripts/tools/misc-tools.js` - modified - improvement - user-facing - CORRECTED

Hardcoded English strings throughout misc-tools (disposition labels, dialog titles, notification messages, reactor meltdown text, skirmish/barrage card titles) are replaced with localization calls. Additionally, `executeItemActivation` now supports activating talent rank actions and bond powers by path, and `getWeaponType` is simplified to use the active profile.

_Details:_ Localization covers: token disposition labels (Hostile/Neutral/Friendly/Secret/Unknown), wait-for-roll messages, force-check no-targets warning, reactor meltdown dialog/cancel/detail/explosion text, skirmish weapon order and barrage mount order titles. The `executeItemActivation` API now accepts `ranks.N.actions.M` paths for talents (dispatching to TalentFlow or ActivationFlow) and `powers.N` paths for bonds (dispatching to BondPowerFlow). `getWeaponType` now checks `active_profile.type` first, then falls back through profiles and weapon_type.

_Changelog:_ Added support for activating talent actions and bond powers via `executeItemActivation`, and localized numerous UI strings in combat tools

_Settings/API:_ `executeItemActivation`

_Verify fixed:_ Changed area from 'Interactive Tools' to 'Automation Engine' — misc-tools.js contains general automation utilities (stat rolls, item activation, skirmish/barrage execution, weapon type helpers) that span multiple areas rather than being specific to the Interactive Tools subsystem

### `templates/reaction-config.html` - modified - improvement - user-facing - CORRECTED

All hardcoded English strings in the Activation Manager (reaction-config) template have been replaced with localization calls, enabling translation support. Also adds CSS styles for workshop search bar and like/stats UI.

_Details:_ Roughly 30+ hardcoded strings (tab labels, button text, column headers, empty-state messages, badges like 'EDITED', etc.) replaced with {{localize}} helpers. New CSS classes added: .la-ws-search, .la-ws-stats, and .la-ws-like for workshop search and engagement UI.

_Changelog:_ Added localization support to the Activation Manager dialog; added Workshop search and like UI styles

_Verify fixed:_ Updated changelog to also mention the new Workshop search/like CSS styles, which represent a visible UI addition (search bar and like buttons in the Workshop tab) that the original changelog omitted

## Battle Log

### `scripts/Battelog/awards.js` - modified - improvement - user-facing - CORRECTED

Replaced all hardcoded English label and description strings in the Battle Log awards definitions with localization keys (e.g. 'LA.award.EXECUTIONER.label').

_Details:_ Every award entry's `label` and `description` fields now reference i18n keys instead of inline English text, enabling translation support for award names and descriptions.

_Changelog:_ Battle Log awards (names and descriptions) are now translatable via localization files

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — adding i18n support is a user-facing improvement, not a pure refactor; Changed user_facing from false to true — users in non-English locales will see translated award names and descriptions; Added changelog bullet — localization support is a visible change that translators and non-English users will notice

### `scripts/Battelog/combat-telemetry-derive.js` - modified - improvement - user-facing

Award labels and descriptions in the combat telemetry awards section are now passed through the localize function, enabling translation/localization of award text.

_Details:_ The award.label and award.description values are wrapped with localize() instead of being used as raw strings.

_Changelog:_ Improved localization support for Battle Log combat awards

### `scripts/Battelog/gm-card.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English dialog title with a localized string key for the Battle Log GM card.

_Details:_ Imports the localize helper and swaps the literal 'Battle Log · GM' title for localize('LA.dialogTitle.battleLogGm').

_Changelog:_ Battle Log GM card title is now localizable (i18n).

_Verify fixed:_ kind changed from 'internal' to 'improvement': localization is a user-facing improvement enabling non-English translations; user_facing changed from false to true: the dialog title is visible to GMs and will now display in their configured language; changelog added: localization support is a meaningful change for non-English users

### `scripts/Battelog/intro-terminal.js` - modified - improvement - user-facing

Hard-coded English strings in the Battle Log terminal intro sequence are replaced with localization keys, enabling translation of the CRT-style intro screen.

_Details:_ The header text and all terminal line labels (parsing, timeline, hostiles, kills, efficiency, integrity, squad check, MVP, result) now use localize() calls with LA.battleLog.intro.* keys instead of inline English strings.

_Changelog:_ Localized Battle Log intro terminal text for translation support

### `scripts/Battelog/recap.js` - modified - improvement - user-facing

Replaces all hardcoded English strings in the Battle Log Recap screen with localization calls, covering dialog titles, panel group labels (Offense/Defense/Operations), stat panel titles, disposition labels, telemetry metric labels, and miscellaneous UI text.

_Details:_ Imports `localize` from string-utils and applies it to ~30+ string literals: the dialog title, panel group headers, tip-panel titles (Confirmed Kills, Assisted Kills, Actions Used, Movement, Repairs, Damage Dealt/Taken, Attacks & Tech, Attacks Avoided, Accuracy, Weapons Used, Destroyed By), disposition filter labels (Hostile/Friendly/Neutral/Secret), telemetry metric labels (HP/Heat/Damage/Kills per round), and the 'TOTAL' series label.

_Changelog:_ Localized all hardcoded English strings in the Battle Log Recap screen for translation support.

### `scripts/Battelog/share-image.js` - modified - improvement - user-facing - CORRECTED

Replaces all hard-coded English UI strings in the Battle Log share-image dialog with localization calls (localize / localizeFormat).

_Details:_ Covers the share card dialog title, copy/save/close button labels, clipboard and file-save notification messages, the watermark text, and error/warning notifications. Users playing in non-English locales will now see translated strings for the Battle Log share card feature.

_Changelog:_ Battle Log share-card dialog and notifications are now fully localizable (no longer English-only).

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing change for non-English users; Changed user_facing from false to true; Added changelog entry since non-English users will see translated UI

### `scripts/Battelog/telemetry-debug.js` - modified - improvement - user-facing - CORRECTED

Replaces two hardcoded English strings in the telemetry debug window (dialog title and clipboard-copy notification) with localization keys.

_Details:_ Uses the localize helper for 'LA.dialogTitle.battleLogTelemetryDebug' and 'LA.notify.telemetryJsonCopied'.

_Changelog:_ Telemetry debug dialog title and copy notification are now localized.

_Verify fixed:_ kind changed from 'internal' to 'improvement': localization of user-visible strings is a user-facing improvement, not purely internal; user_facing changed from false to true: both the dialog title and the clipboard notification are seen by users; changelog added: localization of visible UI text is a user-facing change worth noting

### `templates/battelog/gm-card.hbs` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English strings in the GM card template with localization keys via the `localize` helper.

_Details:_ Localized labels include Combat Concluded, GM ONLY, COMBAT ENCOUNTER, Record Outcome, VICTORY, DEFEAT, Award MVP, Dismiss, Broadcast Recap, and the footer note.

_Changelog:_ Battle Log GM card is now fully localizable (i18n)

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — i18n enablement is a real improvement; Changed user_facing to true — users in non-English locales will see translated strings; Added changelog entry for the localization support

## Bonuses & Effects

### `doc/feature/EFFECTS_AND_BONUSES.md` - modified - docs - user-facing

Added documentation explaining how immunity bonuses use filters, detailing which filter fields are available per immunity subtype and clarifying the reversed role semantics (reactorToken is self, target is the other party).

_Details:_ Documents that damage/resistance/crit/hit/miss immunities get Roll Type, Items (LID) and both code fields; effect/provoke get code fields only; terrain/obstacle/elevation get none.

### `scripts/activations/flow-steps.js` - modified - improvement - user-facing

Immunity announcements now show their source in chat messages and as floating token text instead of plain UI notifications. All hardcoded English strings in flow steps are replaced with localization calls. Resistance bonus IDs are now attached to damage target info for downstream use.

_Details:_ Hit/crit/miss immunity triggers now post a chat message naming the source bonus(es) and display floating text on the token. The immunity check functions (hasCritImmunity, hasHitImmunity, hasMissImmunity) are replaced by getAttackImmunityBonuses/getApplicableImmunityBonuses which return the matching bonus objects. consumeImmunityUse now receives the specific bonuses to consume. A new laResistance array is attached to each damage target for resistance display in the damage card. Dialog titles, notification text, and the stunned auto-fail message are all localized.

_Changelog:_ Improved immunity announcements to show their source in chat and as floating token text, and localized all flow-step messages

### `scripts/activations/reroll.js` - modified - improvement - user-facing

Reroll dialog strings (titles, button labels) are now localized via localize/localizeFormat helpers instead of hardcoded English text.

_Details:_ Affects the 'USE REROLL?' and 'KEEP WHICH?' choice cards shown during bonus rerolls, including button labels like 'Use', 'Keep', 'Alt', and 'Original'.

_Changelog:_ Localized reroll dialog titles and button labels for translation support

### `scripts/bonuses/duration-widget.js` - modified - improvement - user-facing - CORRECTED

Replaces two hardcoded English strings in the duration widget's token-picker dialog with localized string lookups.

_Details:_ The 'Pick Token' title and 'Select a token on the map to update the field.' description now use localize() calls.

_Changelog:_ Duration widget token-picker dialog is now localizable

_Verify fixed:_ kind changed from 'internal' to 'improvement': localization is a user-facing change for non-English users; user_facing changed from false to true: translated strings are visible in the UI; changelog added: localization of visible dialog text is a notable improvement for international users

### `scripts/bonuses/effectManager.js` - modified - improvement - user-facing - CORRECTED

All hard-coded English strings in the Effect Manager dialog have been replaced with localization keys, making the entire UI translatable. Additionally, immunity bonus subtypes now correctly show/hide filter fields (roll types, item LIDs, conditions, etc.) based on which subtype is selected, and immunity code field defaults use attacker/defender parameter names instead of generic ones.

_Details:_ Added IMMUNITY_FILTER_FIELDS map defining which filter controls are relevant per immunity subtype (damage, resistance, effect, provoke, crit, hit, miss). New updateFilterRows() function dynamically toggles visibility of roll-type panels, item LID/ID fields, token fields, and condition code fields based on the selected immunity subtype. Immunity code field defaults now use '(state, attacker, data, context)' and '(attacker, state, me)' signatures instead of generic parameter names. On save, irrelevant fields are now stripped from immunity bonus data based on subtype. Status effect descriptions are now localized when displayed as hover tooltips. Over 80 UI strings (labels, placeholders, tooltips, notifications, dialog titles) converted to localize()/localizeFormat() calls.

_Changelog:_ Improved immunity bonuses in the Effect Manager to show only relevant filter fields per subtype (and strip irrelevant data on save), and localized all Effect Manager UI strings for translation support.

_Verify fixed:_ Added detail about immunity bonus data being stripped of irrelevant fields on save (the IMMUNITY_FILTER_FIELDS check in gatherBonusFormData that deletes unneeded keys); Added detail about status effect description localization (localize(desc) call around line 2060); Updated changelog to mention stripping irrelevant immunity data on save

### `scripts/bonuses/flagged-effects.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English notification strings in the flagged-effects module with localization calls (`localize` and `localizeFormat`), enabling translation support for effect-related user notifications.

_Details:_ Affected messages include: active GM requirement, effect not found, increased stack, no effect names specified, out-of-combat duration warning, already-has-effect warnings (including group/bonus conflict variant), no tokens provided, and removing-all-effects info.

_Changelog:_ Effect-related notifications (errors, warnings, info) are now localizable instead of hardcoded English.

_Verify fixed:_ user_facing changed from false to true: these are visible UI notification strings shown to GMs and players; changelog added: localization of user-visible notifications is a user-facing improvement worth noting

### `scripts/bonuses/genericBonuses.js` - modified - fix - user-facing - BLOG - CORRECTED

Immunity and resistance bonuses now respect their condition filters (rollTypes, itemLids, applyToCondition) when deciding whether they apply. Filtered resistances are no longer permanently baked onto actors, and deferred resistance consumption is synced across clients via socket.

_Details:_ Adds getApplicableImmunityBonuses, getGateImmunityBonuses, getEffectImmunityBonuses, getAttackImmunityBonuses, and hasBonusFilters helpers so immunity checks consistently evaluate condition/applyToCondition/rollType/itemLid gates. Resistances with filters (hasBonusFilters) are no longer written as permanent ActiveEffect changes via addGlobalBonus. The damageCalc wrapper now passes a verified allowedIds list from the damage card so only flow-approved filtered resistances activate. Deferred resistance effect consumption is broadcast over the module socket so non-attacker clients stay in sync. Crit/hit/miss immunity checks are unified into getAttackImmunityBonuses. Some UI strings switched to localize/localizeFormat.

_Changelog:_ Fixed immunity and resistance bonuses ignoring their condition filters (e.g. per-weapon or per-target gates) and improved cross-client sync for resistance consumption

_Settings/API:_ `api.getApplicableImmunityBonuses`, `api.getAttackImmunityBonuses`, `api.getGateImmunityBonuses`, `api.getEffectImmunityBonuses`

_Verify fixed:_ Changed kind from 'improvement' to 'fix' — the core change is that condition filters were being ignored (a bug), not an enhancement

### `scripts/bonuses/status-tooltip.js` - modified - fix - user-facing

The status tooltip now localizes effect descriptions, so descriptions that contain localization keys are properly translated instead of showing raw key strings.

_Details:_ When an effect carries a CONFIG-sourced description with a localization key, it is now passed through localize() before display.

_Changelog:_ Fixed status tooltip showing raw localization keys instead of translated effect descriptions.

### `scripts/socket.js` - modified - improvement - user-facing - CORRECTED

Localizes several hardcoded English strings in the socket handler (system scan notifications, journal entry request dialog) and adds a new 'deferResistanceConsumption' socket handler for deferred resistance bonus consumption.

_Details:_ Replaced hardcoded UI strings for scan requests, journal entry creation, and journal entry request dialogs with localize/localizeFormat calls. Added a new socket message type 'deferResistanceConsumption' that routes to receiveDeferredResistanceConsumption from genericBonuses.

_Changelog:_ Added deferred resistance consumption socket handling; localized system scan and journal entry request notifications for translation support.

_Verify fixed:_ Changed area from 'Internal / Tooling' to 'Bonuses & Effects' since the most significant functional addition is the deferred resistance consumption handler, and localization is a secondary concern

### `startups/itemActivations.js` - modified - refactor - internal

Ablative Shielding automation migrated from ensureLinkedEffect (resistance_energy effect) to ensureLinkedBonus with an immunity/resistance bonus entry for Energy damage. The functional result should be equivalent.

_Details:_ Replaces api.ensureLinkedEffect call with api.ensureLinkedBonus, specifying a structured bonusData object with id, name, type 'immunity', subtype 'resistance', and damageTypes ['Energy'], using duration 'constant' instead of 'permanent'.

_Settings/API:_ `api.ensureLinkedBonus`

## Combat & Turns

### `scripts/activations/reaction-reset.js` - modified - internal - internal

Replaces hardcoded English strings in the Reaction Reset dialog with localization calls using the localize utility.

_Details:_ Dialog titles, button labels, and notification messages are now sourced from localization keys (e.g. LA.dialogTitle.resetReactionChecker, LA.common.cancel).

### `scripts/combat/actor-change-hooks.js` - modified - improvement - user-facing - CORRECTED

Replaces two hardcoded English dialog title strings ("HP MODIFIED" and "HEAT MODIFIED") with localization calls.

_Verify fixed:_ area changed from 'Internal / Tooling' to 'Combat & Turns' — this is actor change hook logic in the combat system; kind changed from 'refactor' to 'improvement' — localization is a user-facing improvement enabling translation; user_facing changed to true — users in non-English locales will see translated dialog titles instead of hardcoded English strings

### `scripts/combat/grapple.js` - modified - improvement - user-facing - CORRECTED

Replaces all hard-coded English UI strings in the grapple system with localization calls (localize / localizeFormat), covering choice-card titles, descriptions, button labels, disabled-reason tooltips, and notification messages.

_Details:_ Also passes additional context (ownerTokenId, otherToken) to the checkEffectImmunities call for grapple immunity checks, which may improve accuracy of immunity detection in edge cases.

_Changelog:_ Grapple UI text (choice cards, buttons, notifications) is now fully localized and can be translated.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing improvement enabling translation support; Changed user_facing from false to true — users in non-English locales will now see translated grapple UI strings; Added changelog entry since localization is a visible improvement for translators and non-English users

### `scripts/combat/overwatch.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in overwatch/threat-debug dialogs and notifications with localization keys, and updates provoke-immunity checks to use the renamed `getGateImmunityBonuses` API (passing both owner and other token for context-aware evaluation).

_Details:_ Localization keys added: LA.dialogTitle.overwatchAlert, LA.common.acknowledge, LA.notify.threatDebugSize, LA.notify.threatDebugVisualizationCurrentlyOnlySupportsHex, LA.notify.selectExactly2TokensToMeasureDistance, LA.notify.distanceBetween. The `getImmunityBonuses` API call is replaced by `getGateImmunityBonuses` with an additional options object containing ownerToken and otherToken, enabling directional immunity evaluation.

_Changelog:_ Overwatch and threat-debug UI strings are now localizable; provoke-immunity checks now evaluate directionally (owner vs. other token).

_Settings/API:_ `api.getGateImmunityBonuses`

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated UI strings, and directional provoke-immunity changes visible game logic outcomes; Added changelog bullet since both localization and directional immunity evaluation are user-visible improvements

### `scripts/combat/per-frequency-tags.js` - modified - improvement - user-facing - CORRECTED

Per-frequency badge labels (PER ROUND, PER TURN, PER SCENE) are now localized via the localization system instead of being hardcoded English strings.

_Details:_ Replaces hardcoded 'PER ROUND', 'PER TURN', 'PER SCENE' label strings with localize() calls using keys LA.perFrequency.perRound, LA.perFrequency.perTurn, LA.perFrequency.perScene.

_Changelog:_ Per-frequency badge labels (Per Round, Per Turn, Per Scene) now support localization.

_Verify fixed:_ Added changelog bullet since localization of visible UI labels is a user-facing improvement worth noting for non-English users

### `scripts/combat/reinforcement.js` - modified - improvement - user-facing

All hardcoded English strings in the reinforcement/delayed-appearance system have been replaced with localization calls, enabling translation support for dialogs, notifications, and chat messages.

_Details:_ Notification warnings, dialog titles, labels (Confirm/Cancel), the round-selection prompt, the NPC-arrival selection dialog, and the chat message announcing NPC arrivals are now localized via localize() and localizeFormat().

_Changelog:_ Localized all reinforcement/delayed-appearance UI strings for translation support.

### `templates/rest-emergency.html` - modified - internal - internal

Replaces all hard-coded English strings in the emergency-repair rest dialog template with localization keys ({{localize ...}}).

_Details:_ Labels like 'CATASTROPHIC DAMAGE DETECTED', 'From Pilot', 'Allies', 'GM Grant', 'Pool', 'Still Required', 'ALLY REPAIR POOL', 'GM FREE REPAIR', 'Free Repairs', and 'added to pool, no source' are now pulled from the LA.restUi.emergency.* localization namespace.

## Deployables & Thrown Weapons

### `scripts/activations/flow-steps-extra.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English string for the thrown-weapon flow step with a localized string key.

_Details:_ The description 'This weapon can be thrown.' in throwChoiceStep is now pulled from the localization system via localize('LA.flow.thisWeaponCanBeThrown').

_Changelog:_ Thrown weapon prompt text is now localizable for non-English translations.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization enables non-English users to see translated UI text; Changed user_facing from false to true — this string is shown to players in the thrown-weapon choice dialog; Added changelog bullet — localization of visible UI strings is a user-facing improvement for non-English users

### `scripts/interactive/deployables.js` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English UI strings (notifications, dialog titles, button labels, placeholders) with localization calls using `localize()` and `localizeFormat()` for i18n support.

_Details:_ Approximately 60+ hardcoded strings converted to localization keys across deployment, recall, pickup, reload, recharge, linking, and picker dialogs.

_Changelog:_ Deployable, thrown weapon, reload, recharge, and linking UI strings are now fully localizable for translation support.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing improvement enabling non-English users; Changed user_facing from false to true — translated UI strings are directly visible to users; Added changelog entry — localization of an entire subsystem's UI is a notable user-facing improvement

## Docs

### `doc/API_COMBAT.md` - modified - docs - internal

Updates the API_COMBAT documentation for executeItemActivation to reflect new flow-dispatch branches for talents (TalentFlow/ActivationFlow) and bond powers (BondPowerFlow), and documents the path syntax for talent ranks and bond powers.

_Details:_ The flow-class selection order now includes TalentFlow/ActivationFlow for talents and BondPowerFlow for bonds. The path parameter docs explain ranks[N], ranks[N].actions[M], and powers[N] syntax.

_Settings/API:_ `api.executeItemActivation`

### `doc/API_EFFECTS.md` - modified - docs - user-facing - CORRECTED

Documents new and updated immunity-filtering API surface in API_EFFECTS.md. Adds entries for `getEffectImmunityBonuses`, `getApplicableImmunityBonuses`, `getAttackImmunityBonuses`, and `getGateImmunityBonuses`. Updates signatures for `checkEffectImmunities`, `checkDamageResistances`, `applyDamageImmunities`, and the `hasCrit/Hit/MissImmunity` wrappers to include new params. Documents per-subtype filter table and clarifies `condition`/`applyToCondition` gate behavior on immunity bonuses.

_Details:_ New documentation sections cover three filtered-query helpers that return only the immunity bonuses whose gates pass in context (flow, attack, or gate-only). `checkEffectImmunities` and the `has*Immunity` helpers gain a `tokens` param for per-target filtering. `checkDamageResistances` gains `allowedIds` and `applyDamageImmunities` gains `bonuses` for prefiltered lists. A new table documents which filters each immunity subtype honours. The `condition` and `applyToCondition` field descriptions are updated to explain how they behave on immunity bonuses specifically (actor/target rebinding, skipping vs failing). Notes that a filtered `resistance` bonus is not written to `system.resistances` and therefore no longer shows as a checked resistance on the character sheet. The `consumeOnUsage` description is clarified: an immunity charge burns where that immunity is consulted, never on the bearer's own roll.

_Changelog:_ Documented new immunity-filtering API helpers (`getApplicableImmunityBonuses`, `getAttackImmunityBonuses`, `getGateImmunityBonuses`, `getEffectImmunityBonuses`) and updated existing immunity API signatures

_Settings/API:_ `api.checkEffectImmunities`, `api.getEffectImmunityBonuses`, `api.getApplicableImmunityBonuses`, `api.getAttackImmunityBonuses`, `api.getGateImmunityBonuses`, `api.checkDamageResistances`, `api.applyDamageImmunities`, `api.hasCritImmunity`, `api.hasHitImmunity`, `api.hasMissImmunity`

_Verify fixed:_ Changed kind from 'improvement' to 'docs' — this file is API documentation, not source code; the actual feature changes belong to their respective source files; Changed area from 'Bonuses & Effects' to 'Docs'; Set blog_worthy to false — the features themselves may be blog-worthy but their notes belong on the source-code changes, not the doc file; Added missed detail: filtered resistance bonuses no longer show as checked resistances on the character sheet; Added missed detail: consumeOnUsage clarification that immunity charges burn where consulted, never on bearer's own roll; Removed invented framing that condition/applyToCondition gates are new — they existed before; descriptions were updated to clarify immunity-specific behavior

### `doc/API_SPATIAL.md` - modified - docs - internal

Documents two new spatial API functions, `laTokenHeight` and `laTokenGameplayHeight`, which return a token's sight height and its SIZE-snapped equivalent.

_Details:_ laTokenHeight returns sight height (wall-height flag or SIZE + 0.1). laTokenGameplayHeight returns the same value snapped to the closest SIZE (0.5, 1, 2, 3...).

_Settings/API:_ `api.laTokenHeight`, `api.laTokenGameplayHeight`

### `doc/feature/MOVEMENT_ADVANCED.md` - modified - docs - internal

Minor wording clarification in the advanced movement documentation for the Pathfind Drag Movement toggle keybind description.

_Details:_ Changed the description of the X key toggle from 'over whatever the setting says' to 'while it is on', clarifying that the session toggle only works when the feature is enabled.

## FX & Sounds

### `scripts/filters/customFilters.js` - modified - feature - user-facing - BLOG

Massively expanded the custom TokenMagic filter library from 2 filters (fracture, chains) to 19, extracting each into its own module file under effects/. New filters include chromaRot, openSeams, trackingGhost, seamBeat, doubleShell, ventColumn, guidingLight, ablativeCrust, noDrift, shatterSeams, thermalSplit, slicePlane, overflowWrap, errorCorrection, coldSoak, ricochetLip, and convectionChurn.

_Details:_ The inline GLSL shader code and shared apply() logic were moved out to effects/ modules (fracture.js, chains.js, filter-core.js, etc.), and the registration file now imports and re-exports all 19 filters, registering each on the TokenMagic FilterType at init.

_Changelog:_ Added 17 new TokenMagic visual effect filters (chromaRot, openSeams, trackingGhost, seamBeat, doubleShell, ventColumn, guidingLight, ablativeCrust, noDrift, shatterSeams, thermalSplit, slicePlane, overflowWrap, errorCorrection, coldSoak, ricochetLip, convectionChurn) and refactored existing filters into individual modules.

### `scripts/filters/effects/ablativeCrust.js` - added - feature - user-facing - BLOG

New 'Ablative Crust' visual filter effect that renders animated angular armor plates building up and shedding around a token's contour, with configurable color, segment count, shed timing, drift, grain, and opacity.

_Details:_ GLSL fragment shader creates a ring of segmented crust plates outside the token silhouette, each on an independent lifecycle (grow → visible → shed/drift). Supports forward and reverse drift modes, grain texture, and an optional inner lip highlight. Defaults tuned for a warm sandy/gold armor look.

_Changelog:_ Added new Ablative Crust token visual effect with animated armor-plate shedding.

### `scripts/filters/effects/chains.js` - added - feature - user-facing

Adds a new 'Chains' visual filter effect that renders an animated, crossing chain-link pattern overlay on tokens or templates using a custom GLSL shader.

_Details:_ The shader draws multiple sets of diagonal chain links at varied angles with hollow metallic outlines and glow. Configurable parameters include color, intensity, scale, link width, link gap, opacity, and blend mode. The pattern animates over time.

_Changelog:_ Added a new 'Chains' visual effect filter that overlays an animated chain-link pattern.

### `scripts/filters/effects/chromaRot.js` - added - feature - user-facing - BLOG

Added a new 'ChromaRot' visual filter effect that simulates chroma decay — the luminance layer stays sharp while colour breaks down into mis-registered grey blocks, with configurable block count, drift, drop/rot thresholds, periodic snap-back to true colour, and row-roll glitch lines.

_Details:_ A GLSL fragment shader renders the effect with hard-stepped animation (no tweening), quantised shade levels, per-block hashing for dropout and rotation, and brief lock windows that momentarily restore the original image. Exposed parameters include color, blocks, drift, levels, strength, dropThreshold, rotThreshold, stepRate, lockPeriod, lockWidth, rollPeriod, and opacity.

_Changelog:_ Added new ChromaRot visual filter for a chroma-decay / signal-rot glitch effect on tokens

### `scripts/filters/effects/coldSoak.js` - added - feature - user-facing

Adds a new 'Cold Soak' visual filter effect that animates a cold front creeping up a token, desaturating colour and depositing procedural frost on thicker parts of the silhouette.

_Details:_ GLSL shader uses value noise for frost patterning, an 8-tap silhouette-depth probe so frost only appears on interior mass, and a time-driven front line that sweeps upward on a configurable period. Exposed parameters: frontPeriod, depth, coldColor, frostColor, opacity.

_Changelog:_ Added new Cold Soak visual effect filter that animates a creeping frost front across tokens

### `scripts/filters/effects/convectionChurn.js` - added - feature - user-facing

New 'Convection Churn' visual filter that makes a token's sprite appear to be liquid metal turning over in convection cells, with domain-warped noise, rising heat distortion, configurable hot/cool/rim colors, and animated glow.

_Details:_ GLSL fragment shader uses value noise with domain warping to create a molten-metal convection effect. Exposes uniforms for churnScale, rise speed, warp amplitude, color mix amount, rim width/glow, hot/cool/rim colors, and opacity. Integrates with the module's custom filter pipeline (customVertex2D, applyCustomFilter, setTMParams/normalizeTMParams).

_Changelog:_ Added new Convection Churn visual effect filter for a molten-metal convection-cell look on tokens

### `scripts/filters/effects/doubleShell.js` - added - feature - user-facing

Adds a new 'Double Shell' visual filter effect that renders two animated contour outlines around a token silhouette with a pulsing bloom glow in the gap between them.

_Details:_ The filter draws an inner shell hugging the sprite edge and an outer shell offset by a breathing gap, with a soft bloom fill between them. All colors, widths, gap range, pulse period, and strengths are configurable. Defaults produce a cool cyan/blue sci-fi look.

_Changelog:_ Added new Double Shell token filter effect with animated pulsing dual-outline and bloom glow.

### `scripts/filters/effects/errorCorrection.js` - added - feature - user-facing

Adds a new 'Error Correction' visual filter effect that sweeps an upward-moving band across a token, sharpening contrast and overlaying a configurable color tint as it passes.

_Details:_ Custom PIXI fragment shader with configurable band color, width, sweep period, contrast boost, and opacity. Integrates with the module's custom filter pipeline (filter-core.js) and Token Magic parameter system.

_Changelog:_ Added new 'Error Correction' token visual effect with a sweeping contrast-sharpening band.

### `scripts/filters/effects/fracture.js` - added - feature - user-facing - BLOG

Adds a new 'Fracture' visual filter effect that renders animated Voronoi-based glowing cracks with noise distortion on tokens or other objects. Supports configurable color, intensity, scale, crack width, opacity, warp strength, noise, masking, and blend modes.

_Details:_ GPU shader uses Voronoi F2-F1 distance for crack patterns, value noise for UV distortion and partial masking, and exponential glow with a white-hot core. Integrates with the existing custom filter framework (filter-core.js) and Token Magic params system.

_Changelog:_ Added new Fracture visual filter effect with animated glowing crack patterns

### `scripts/filters/effects/guidingLight.js` - added - feature - user-facing - BLOG

Adds a new 'Guiding Light' visual filter effect that renders a directional key light with an animated gleam sweep along the lit contour of a token, intended to visualize a helper/aid relationship.

_Details:_ The shader lights one side of the token based on a configurable compass bearing, applies a rim highlight, and sweeps a gleam across it periodically. Color, intensity, rim width, sweep period, and opacity are all configurable.

_Changelog:_ Added new Guiding Light token filter effect with directional key lighting and animated gleam sweep.

### `scripts/filters/effects/noDrift.js` - added - feature - user-facing

Adds a new 'No Drift' visual filter effect that renders a shear-ghost leaning away from the token body in a cycle, then snapping back at the rim edge. Configurable ghost/snap colors, bearing direction, timing, and strength.

_Details:_ GLSL fragment shader creates a periodic creep-and-snap ghost silhouette offset from the token, with rim detection for a snap-flash highlight. Exposed parameters include tryPeriod, slip, ghostStrength, holdStrength, snapStrength, bearing, ghostColor, snapColor, and opacity.

_Changelog:_ Added new 'No Drift' token visual effect filter with creeping ghost and snap-back animation

### `scripts/filters/effects/openSeams.js` - added - feature - user-facing - BLOG

Adds a new 'Open Seams' visual filter effect that makes a token or object appear as armour plates pulling apart, revealing glowing seams beneath with breathing animation, per-plate misalignment, and directional lip lighting.

_Details:_ GLSL fragment shader divides the sprite into a grid of plates that contract toward their centres, exposing coloured seams (configurable seam colour, core colour, gain). Plates breathe at individual phases, can randomly misalign, and have a one-sided lit lip edge. Fully parameterised with defaults (blocks, gap range, breath rate, misalign chance, light angle, opacity, colours).

_Changelog:_ Added new Open Seams visual filter effect for token/object armour-plate separation with animated breathing and seam glow.

### `scripts/filters/effects/overflowWrap.js` - added - feature - user-facing

Adds a new 'Overflow Wrap' token visual-effect filter that renders animated banding lines crawling down a token's chassis, phase-shifted by local brightness so the bands appear to wrap the shape.

_Details:_ GLSL fragment shader composites semi-transparent colored lines whose phase is offset by the token sprite's luminance. Configurable uniforms include line color, period, line count, thickness, and opacity.

_Changelog:_ Added new Overflow Wrap visual effect filter for tokens.

### `scripts/filters/effects/ricochetLip.js` - added - feature - user-facing - BLOG

Adds a new 'RicochetLip' visual filter effect that renders animated rounds/streaks flying in along a configurable bearing and sparking on the leading edge of a token sprite, simulating incoming fire ricocheting off cover or armor.

_Details:_ The GLSL shader supports configurable lane count, flight period, trail length, hardness, spark/round/lip colors, bearing direction, opacity, and confinement. Integrates with the module's custom filter pipeline via filter-core.js.

_Changelog:_ Added new RicochetLip visual filter effect for animated incoming-fire ricochets on tokens

### `scripts/filters/effects/seamBeat.js` - added - feature - user-facing

New 'SeamBeat' visual filter that splits a token sprite into grid plates along glowing seams that pulse apart on a rhythmic beat, simulating a chassis being hammered open.

_Details:_ GLSL fragment shader divides the sprite into a configurable grid of blocks, separates them with colored seam/core/rim lighting, and drives the gap width with an exponential-decay beat cycle. Fully parameterized: block count, beat period/count, gap range, seam/core/rim colors and strengths, rim width, glow, and opacity.

_Changelog:_ Added SeamBeat token filter effect — rhythmic glowing seam-split visual for damaged or overheating mechs

### `scripts/filters/effects/shatterSeams.js` - added - feature - user-facing - BLOG

Adds a new 'ShatterSeams' visual filter effect that fractures a token or object into irregular Voronoi-based shards with glowing seams, breathing animation, shard misalignment, and directional lighting on shard edges.

_Details:_ The shader uses Voronoi tessellation (with configurable jitter to control shard irregularity) to split the sprite into plates. Gaps between plates reveal colored seams with a core-to-edge gradient. Plates breathe (gap oscillates over time), can randomly misalign, and receive a one-sided specular lip highlight based on a configurable light angle. All parameters (block count, jitter, gap range, breath rate, seam/lip colors, light angle, opacity, misalign chance) are exposed as animatable uniforms.

_Changelog:_ Added new ShatterSeams visual filter that fractures tokens into irregular glowing shards with animated seams and directional lighting

### `scripts/filters/effects/slicePlane.js` - added - feature - user-facing

Added a new 'SlicePlane' visual filter effect that animates a cutting plane traveling across a token, splitting it into two halves that slide apart and close back together, with a glowing edge seam.

_Details:_ The shader supports configurable cut angle, slide distance, travel range, edge color, rate, bounce mode, and opacity. Uses the shared filter-core infrastructure for vertex/apply helpers and TemplateMacro parameter integration.

_Changelog:_ Added new SlicePlane filter effect that animates a cutting plane slicing across a token

### `scripts/filters/effects/thermalSplit.js` - added - feature - user-facing - BLOG

New 'Thermal Split' visual filter that renders animated glowing seams/cracks across token plating, with configurable heat colors, breathing width, drift, and flow parameters.

_Details:_ GLSL fragment shader uses ridged value-noise to draw writhing crack lines that breathe open and closed over time. Four nested width bands produce a white-hot core, hot line, charred shoulders, and bloom halo. Fully parameterized with defaults for crack scale, breath period, width range, drift speed, writhe amplitude/rate, flow rate/depth, hot/char/core colors, bloom, heat intensity, and opacity.

_Changelog:_ Added Thermal Split token filter effect with animated glowing seams and configurable heat, drift, and crack parameters

### `scripts/filters/effects/trackingGhost.js` - added - feature - user-facing - BLOG

Adds a new 'Tracking Ghost' visual filter effect that renders stale duplicate ghost images lagging behind a token, snapping inward in discrete steps until they converge, with a chirp ring pulse at lock-on. Ghosts are masked so they never obscure the actual token art.

_Details:_ The filter uses hot and cold colored ghost offsets that rotate around a configurable lock direction, converge over a configurable period in stepped increments, and optionally emit a bright ring chirp at the end of each cycle. Configurable parameters include lockAngle, spinRate, ghostDist, lockPeriod, steps, ghostOpacity, ringWidth, chirpStrength, and two ghost colors (colorHot/colorCold).

_Changelog:_ Added a new Tracking Ghost visual filter effect that shows converging ghost duplicates around a token, useful for lock-on or targeting visuals.

### `scripts/filters/effects/ventColumn.js` - added - feature - user-facing - BLOG

Added a new 'Vent Column' visual filter effect that renders animated heat shear across a mech's upper chassis with a rising heat plume above its silhouette.

_Details:_ Custom GLSL shader with configurable hot color, plume color, warp frequency/amplitude, rise speed, plume strength, body glow, reach, and opacity. The plume follows the token's shoulder outline and rises upward with animated noise.

_Changelog:_ Added new Vent Column token filter effect for animated heat-shimmer and rising plume visuals

### `scripts/filters/filter-core.js` - added - refactor - internal

Extracts shared vertex shader source and custom filter apply() logic into a reusable module for Lancer Automations' TokenMagic-based visual filters.

_Details:_ Provides a common GLSL vertex shader (customVertex2D) and an applyCustomFilter() function (inlined from TokenMagic's CustomFilter) that handles time advancement and filter-matrix computation, so individual custom filters can share this plumbing.

### `scripts/fx/actionFX.js` - modified - internal - internal

Replaces a hardcoded English notification string in the action FX audio preview with a localized format call.

### `scripts/fx/statusFX.js` - modified - feature - user-facing - BLOG - CORRECTED

Adds 14 new status-condition visual effects (Impaired, Vulnerable, Lock On, Aided, Resist All, Phasing, Overheated, Reactor Meltdown, Prone, Bolstered, Shut Down, Disengage, Slowed rework, and more) using new custom TokenMagic filter types, replaces several existing effects with higher-fidelity versions (Danger Zone now uses a vent column, Overshield uses a double shell, Exposed uses thermal-split cracks, Shredded/Stripped use shatter seams, Slowed uses overflow bands), and localizes all UI strings.

_Details:_ New effects added: Impaired (chromaRot), Vulnerable (shatterSeams + glow), Lock On (trackingGhost), Aided (guidingLight), Resist All (ablativeCrust), Phasing (slicePlane), Overheated (convectionChurn + glow/bloom, replaces old Danger Zone glow/bloom), Reactor Meltdown (seamBeat), Prone (noDrift, was previously a clone of Slowed), Bolstered (errorCorrection), Shut Down (coldSoak), Disengage (ricochetLip). Reworked effects: Danger Zone now ventColumn, Overshield now doubleShell, Exposed swaps adjustment for thermalSplit, Shredded/Stripped swap fracture for shatterSeams, Slowed now overflowWrap. Throttled color changed from red to amber. Stale filter IDs are tracked and cleaned up from old tokens. The config window and defaults are now driven from a single exported STATUS_FX_KEYS array. All labels and notifications are localized via localize(). TMFX puppet and dedup logic refactored into _writeFilters helper.

_Changelog:_ Added 14 new token status effects (Impaired, Vulnerable, Lock On, Aided, Resist All, Phasing, Overheated, Reactor Meltdown, Prone, Bolstered, Shut Down, Disengage, and more) and upgraded visuals for Danger Zone, Overshield, Exposed, Shredded, and Slowed effects

_Settings/API:_ `statusFXConfig`

_Verify fixed:_ settings_or_api was empty but the file registers/reads the statusFXConfig setting which now has 14 additional fx_ keys; added it

### `scripts/fx/token-ground-shadow.js` - added - feature - user-facing - BLOG

Adds a ground shadow effect beneath elevated tokens, projecting each token's silhouette onto the ground. The shadow is thrown further and blurred more the higher the token is above the terrain, providing a visual elevation cue.

_Details:_ The shadow direction is shared with Terrain Height Tools' sun angle setting when available. Shadow throw distance, opacity, and blur all scale with elevation above the nearest solid terrain. Shadows are sorted between terrain and token layers so they appear on the ground under all tokens. Uses settings tokenGroundShadow (enable/disable), tokenGroundShadowThrow (distance factor), and tokenGroundShadowOpacity.

_Changelog:_ Added ground shadows under elevated tokens that grow and blur with height, giving a clear visual elevation cue.

_Settings/API:_ `tokenGroundShadow`, `tokenGroundShadowThrow`, `tokenGroundShadowOpacity`

### `templates/statusfx-config.html` - modified - internal - internal

Replaced all hardcoded English strings in the StatusFX configuration dialog template with localization helper calls ({{localize ...}}).

_Details:_ Every label, heading, note, and button text in statusfx-config.html now uses Handlebars localize calls keyed under LA.statusFxUi.*, enabling future translation support.

## Infection

### `scripts/bonuses/infection.js` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English strings in the infection system with localization keys using `localize` and `localizeFormat` helpers.

_Details:_ Covers notification messages, dialog titles, chat card content, and tooltips across the infection flow, check, stabilize-clear, and sheet injection code.

_Changelog:_ Infection UI text is now fully localized, enabling translation support for notifications, dialog titles, chat cards, and tooltips.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing enhancement enabling non-English users; Changed user_facing from false to true — translated strings are directly visible to users; Added changelog bullet — GMs/players using non-English locales will see translated infection text

## Integrations

### `scripts/integrations/alt-sheets-flags.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English string for the 'Show in Token Bar' toggle label in the lancer-alternative-sheets integration with a localized string via the localize utility.

_Details:_ Imports localize from string-utils and uses the key 'LA.extras.showInTokenBar' instead of a raw English string.

_Changelog:_ The 'Show in Token Bar' label in the alternative-sheets integration is now localizable.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing quality improvement, not purely internal; Changed user_facing to true — non-English users will now see a translated label instead of hardcoded English; Added changelog bullet since this is a visible improvement for localized users

### `scripts/setup/tmac-presets.js` - modified - internal - internal

Replaces two hardcoded English notification strings in the Template Macro preset importer with localization calls.

## Interactive Tools

### `scripts/activations/workshop-browser.js` - modified - feature - user-facing - BLOG

Adds community likes, download/install counts, and a search bar to the Workshop Browser. Files and contributors now show like buttons and install stats fetched from Supabase, users can like/unlike workshop entries, downloads are tracked, and a debounced search field lets users filter by name, LID, or contributor across all workshop files.

_Details:_ New Supabase-backed stats system: fetchStats retrieves aggregated likes/installs/downloads and the current user's liked set via install ID. Like toggling is optimistic with rollback on error. recordDownload is called on every import. Search lazily fetches all workshop files, builds a cached term index (name, LID, pack keys), and filters with debounced input. The import-selected logic was extracted into a shared importSelected function used by both list and contributor views. UI strings moved to localization keys.

_Changelog:_ Added likes, install counts, and full-text search to the Workshop Browser

### `scripts/interactive/cards.js` - modified - refactor - user-facing - CORRECTED

Replaces hard-coded English card titles (e.g. "SELECT TARGETS", "KNOCKBACK", "PLACE TOKEN") with localization keys and passes them through a localize() helper, enabling translation support.

_Details:_ All entries in _cardDefaults now use 'LA.card.*' i18n keys instead of raw strings. The _createInfoCard function calls localize() on the default title.

_Changelog:_ Interactive card titles (Select Targets, Knockback, Place Token, etc.) are now localizable and will display in the client's configured language.

_Verify fixed:_ Changed user_facing to true: card titles are visible UI text shown to GMs/players, and localization means they will now appear in the user's language instead of always English; Added changelog bullet reflecting the user-visible localization of interactive card titles

### `scripts/interactive/combat.js` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English UI strings in the combat interactive menus (throw weapon, movement revert, choice cards, mount/system/trait/invade selection dialogs) with localization calls using `localize()` and `localizeFormat()`.

_Details:_ Covers notifications, dialog titles, button labels (Confirm, Cancel, Send), placeholder text, subtitle descriptions, and warning/error messages across throw-weapon, revert-movement, clear-movement-history, choice-menu, mount/system/trait choosers, and invade flows.

_Changelog:_ Localized all interactive combat menu strings (throw weapon, movement revert, choice cards, mount/system/trait/invade dialogs) for translation support.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing improvement enabling translation, not a pure refactor; Changed user_facing from false to true — users in non-English locales will now see translated strings instead of hardcoded English; Added changelog entry since this is a user-visible improvement

### `scripts/interactive/detail-renderers.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded 'EXTRA DEPLOYABLE' label strings with localized equivalents using the localize utility.

_Details:_ Two instances of the raw string 'EXTRA DEPLOYABLE' in laRenderItemExtras are now passed through localize('LA.deployables.extraDeployable'), enabling translation support for this label.

_Changelog:_ Extra Deployable labels in item detail popups are now localizable.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — switching hardcoded strings to localization is a user-facing improvement enabling translation; Changed user_facing to true — users in non-English locales will see translated labels instead of hardcoded English; Added changelog entry for the localization improvement

### `scripts/interactive/extra-config-dialog.js` - modified - improvement - user-facing - CORRECTED

Replaces two hardcoded English strings in the Extra Config dialog (title and close button) with localized equivalents using the localize utility.

_Details:_ 'Extra Config' -> localize('LA.dialogTitle.extraConfig'), 'Close' -> localize('LA.common.close')

_Changelog:_ Extra Config dialog title and close button are now localizable.

_Verify fixed:_ kind changed from refactor to improvement: localization is a user-facing enhancement enabling non-English users to see translated strings; user_facing changed from false to true: users in non-English locales will see translated dialog title and button label; changelog added: this is a visible improvement for localization support

### `scripts/interactive/extras-dialog.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the Extras dialog (deployable actor picker, action editor, bar editor, notifications) with localized string lookups via the localize() utility.

_Details:_ Localizes dialog titles ('Extras', 'Add Deployable Actor'), button labels ('Save', 'Close', 'Save Changes', 'Add Action', 'Save Combat'), input placeholders ('Search actors...', 'Name', 'Label', 'Value', 'Detail (optional)'), and notification messages ('Action needs a name.', 'Could not add extra bar.').

_Changelog:_ Extras dialog (actions, deployables, bars) is now fully localized and ready for translation

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated UI text, which is a visible change; Added changelog entry since localization is a user-facing improvement relevant to non-English users

### `scripts/interactive/network.js` - modified - refactor - user-facing - CORRECTED

Replaces all hardcoded English strings in the choice-card and vote-card networking code with localization calls (localize / localizeFormat), covering dialog titles, confirmation prompts, notifications, and button labels.

_Details:_ Affects cancel-choice confirmations, declined/cancelled/took-choice notifications, no-votes-yet warning, vote-tie dialog, cancel-vote confirmation, vote-concluded and vote-cancelled notifications.

_Changelog:_ Choice-card and vote-card dialogs and notifications are now fully localized, enabling non-English translations.

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated UI strings, which is a visible change; Added changelog bullet reflecting the user-facing localization improvement

### `scripts/interactive/tools/advancedMeasure.js` - modified - improvement - user-facing - CORRECTED

All hardcoded English strings in the Advanced Measure tool (toolbar labels, setting names/hints, dropdown items, button titles, and status text) have been replaced with localization keys, enabling translation support.

_Details:_ Affected strings include setting names/hints for toolbar scale and ctrl-ruler mode, range source labels (None, Manual, Threat, Sensor, Max Reach, Weapon), shape pattern labels (Blast, Burst, Cone, Line), the tool title, 'no token' / 'no weapons' placeholder text, and icon button titles. A comment clarifies that RANGE_SOURCES and SHAPE_BUTTONS use keys because they are defined at import time before i18n loads. Note: the toolclip paragraph text ('Measure with AoE shapes...') remains hardcoded English.

_Changelog:_ Added localization support to all Advanced Measure tool UI strings, enabling community translations.

_Settings/API:_ `advMeasureScale`, `ctrlRulerMode`

_Verify fixed:_ Added advMeasureScale and ctrlRulerMode to settings_or_api since those settings had their name/hint strings changed to localization keys; Noted in details that the toolclip paragraph text remains un-localized (incomplete localization pass)

### `scripts/interactive/tools/chooseToken.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English notification strings in the token-chooser with localization calls (localize/localizeFormat), covering range warnings, max-target warnings, and area labels.

_Details:_ Localized strings: 'Blast center out of range.', 'Burst target out of range.', 'Area center out of range.', max-targets-selected messages, and 'Area N' label.

_Changelog:_ Token chooser warnings and area labels are now localized, enabling translation support.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing change enabling non-English users to see translated UI strings; Changed user_facing to true — these are notification messages and labels visible to GMs/players; Added changelog entry since localization support is a user-facing improvement

### `scripts/interactive/tools/forceCheck.js` - modified - refactor - internal

Replaces a hardcoded "FORCE CHECK" title string in the force check card with a localized string lookup.

_Details:_ Imports the localize utility and uses the key 'LA.dialogTitle.forceCheckCaps' instead of the literal "FORCE CHECK" string.

### `scripts/interactive/tools/haseContest.js` - modified - improvement - user-facing - CORRECTED

Replaces the hardcoded "HASE CONTEST" title string with a localized string lookup via the localize utility.

_Details:_ Imports the localize function and uses it with the key 'LA.dialogTitle.haseContest' instead of the hardcoded English title.

_Changelog:_ HASE Contest dialog title is now localizable for translation support.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' since localization is a user-facing change enabling translation; Changed user_facing from false to true since non-English users would see a translated title; Added changelog bullet for the localization improvement

### `scripts/interactive/tools/placeZone.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English notification string with a localized string key for the out-of-range warning when placing zones.

_Details:_ The warning 'Target is out of range!' now uses localize('LA.notify.targetIsOutOfRange') instead of a raw string.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' - localization is a user-facing improvement for non-English users; Changed user_facing from false to true - users playing in non-English locales will now see a translated notification instead of hardcoded English

### `scripts/tools/downtime-item.js` - modified - improvement - user-facing - CORRECTED

Replaces all hard-coded English strings in the downtime-item module with localization calls (localize / localizeFormat), covering sheet labels, notification messages, and dialog UI text.

_Details:_ Notification messages for import errors/warnings/success, the import dialog title/body/buttons, and the item-sheet label are now sourced from localization keys (LA.downtime.*, LA.notify.*, LA.common.*).

_Changelog:_ Downtime activity import UI and notifications are now fully localizable for non-English users.

_Verify fixed:_ Changed area from 'NPC Automations' to 'Interactive Tools' — downtime activities are a player/GM interactive tool, not NPC-specific; Changed kind from 'refactor' to 'improvement' — localization is a user-facing improvement enabling non-English use; Changed user_facing from false to true — users in non-English locales will now see translated strings instead of English; Added changelog entry — this is a visible improvement for non-English users

### `scripts/tools/downtime.js` - modified - refactor - user-facing - CORRECTED

Replaces all hardcoded English strings in the downtime tool dialogs, notifications, placeholders, and buttons with localization calls (localize/localizeFormat).

_Details:_ Covers dialog titles, button labels, input placeholders, notification warnings/errors, and chat message text across the entire downtime workflow. This enables the downtime tool to be fully translatable to other languages.

_Changelog:_ Downtime tool UI is now fully localizable (all hardcoded English strings replaced with translation keys).

_Verify fixed:_ user_facing changed to true: localization is user-facing because it enables non-English users to see translated UI text; changelog added: this is a visible improvement for users in non-English locales

### `scripts/tools/item-browser.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the item browser dialog with localization calls using `localize` and `localizeFormat` from string-utils.

_Details:_ Localizes the dialog title, search placeholder, cancel button label, and the 'Copied LID' notification message.

_Changelog:_ Item browser dialog now supports localization (title, search placeholder, cancel button, copied-LID notification).

_Verify fixed:_ kind changed from 'internal' to 'improvement': localization is user-facing for non-English users; user_facing changed from false to true: translated UI text is visible to users; changelog added: localization support is a user-facing improvement worth noting

### `scripts/tools/pilot-reserves.js` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English strings in the pilot reserves dialog with localization calls using localize() and localizeFormat() from string-utils.

_Details:_ Tab labels, placeholder text, notification messages, dialog title, and button labels are all switched to localization keys (LA.reserves.tab.*, LA.notify.*, LA.common.*, LA.pilotReserves.ph.*, LA.dialogTitle.reservesFor).

_Changelog:_ Localized the Pilot Reserves dialog for translation support

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing improvement enabling non-English users to see translated UI text; Changed user_facing from false to true — users in non-English locales will now see translated strings in the reserves dialog

### `scripts/tools/rest.js` - modified - refactor - internal

Replaces all hard-coded English UI strings in the rest/emergency-recovery dialogs with localize() calls using translation keys.

_Details:_ Dialog titles ('Rest', 'Emergency Recovery'), button labels ('Confirm', 'Cancel', 'Reinitialize'), and notification warnings are now localized via LA.* keys.

### `scripts/tools/scan.js` - modified - refactor - user-facing - CORRECTED

Replaces all hardcoded English strings in the Scan tool (dialog titles, button labels, notification messages, HASE stat labels) with localization calls using `localize()` and `localizeFormat()`.

_Details:_ Covers HASE labels (Hull/Agi/Sys/Eng), permission error notifications, folder-missing errors, scan request sent messages, dialog titles (System Scan Options, SCAN Action, Generate Scan, etc.), button labels (Send to Chat, Execute Scan, Scan, Generate, Cancel), target-selection prompts, and the regeneration summary notification.

_Changelog:_ Localized all Scan tool UI strings for translation support

_Verify fixed:_ Changed user_facing from false to true: localization enables non-English users to see translated UI strings, which is a visible behavior change

### `templates/reaction-editor.html` - modified - improvement - user-facing - BLOG - CORRECTED

All hardcoded English strings in the reaction editor template were replaced with localize helper calls, enabling translation/internationalization of the entire reaction editor UI.

_Details:_ Every label, button, note, option text, warning, and heading in reaction-editor.html now uses {{localize "LA.reactionEditor.…"}} instead of inline English text. No functional or layout changes.

_Changelog:_ Reaction editor UI is now fully localizable (i18n); all labels, buttons, notes, and warnings support translation.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — i18n support is a real user-facing improvement enabling non-English users to use the reaction editor in their language; Changed user_facing from false to true — localization directly affects what users see in the UI; Added changelog entry — full i18n of a major editor UI is a meaningful user-facing improvement worth noting; Changed blog_worthy from false to true — full localization of the reaction editor is a significant feature for the international community

### `templates/rest-menu.html` - modified - improvement - user-facing

All hard-coded English strings in the rest/repair menu template have been replaced with localization calls, enabling translation support for the entire rest UI.

_Details:_ Localized labels include: REPAIRS, CONDITIONS & HEAT, Reset Heat, FREE, Clear Status Effects, no-conditions message, CHASSIS HEALTH, Restore HP to Full, Structure, Stress, DESTROYED EQUIPMENT, ALLY REPAIR POOL, GM FREE REPAIR, Free Repairs, added-to-pool suffix, and REPAIR COST.

_Changelog:_ Localized all rest menu UI strings for translation support

### `templates/scan-chat.html` - modified - internal - user-facing - CORRECTED

Replaces hardcoded English strings in the scan chat card template with localization calls (localize helper), enabling translation of labels like TECH, REACT, TRAIT, and 'Open Scan Journal'.

_Details:_ Six strings replaced with {{localize ...}} keys: noInformationProvided, tech (×2), react, trait, openScanJournal.

_Changelog:_ Scan chat cards now support localization/translation for all visible labels.

_Verify fixed:_ user_facing changed to true: these are visible UI strings in chat cards that GMs and players see, and non-English users will now see translated text; Added changelog bullet since localization of visible UI text is a user-facing improvement

### `templates/scan-chooser.html` - modified - internal - internal

Replaces hardcoded English strings in the scan-chooser dialog template with localization helper calls.

_Details:_ All static labels (title, section header, scan type names and descriptions) now use {{localize}} keys under LA.scanUi.chooser.*.

### `templates/scan-generate.html` - modified - improvement - user-facing - CORRECTED

Replaced all hard-coded English strings in the scan-generate dialog template with localization calls, enabling translation of the scan UI into other languages.

_Details:_ Localized title, mode names (Chat, Chat + Journal, Journal), mode descriptions, custom journal name label, Custom Ownership button, ownership header, and permission level options (No Change, None, Limited, Observer, Owner).

_Changelog:_ Localized the scan-generate dialog for i18n support

_Verify fixed:_ Details missed the 'Custom Ownership' button localization

### `templates/scan-overview.html` - modified - improvement - user-facing

All hardcoded English labels in the scan overview UI (section headers like HASE, STATS, WEAPONS, SYSTEMS, etc. and inline labels like RANGE, DAMAGE, ON HIT, EFFECT, UNLOADED, TRIGGER) are replaced with localization calls, enabling translation support for the scan feature.

_Details:_ Approximately 30 hardcoded strings replaced with {{localize}} Handlebars helpers using keys under LA.scanUi.overview.*.

_Changelog:_ Added localization support to the scan overview UI, enabling translation of all section headers and labels

### `templates/scan-system-options.html` - modified - improvement - user-facing - CORRECTED

Replaces all hardcoded English strings in the scan system options dialog template with localization keys using the `localize` Handlebars helper.

_Details:_ Covers the dialog title, info box text, journal entry toggle and description, custom journal name label, ownership section headers, ownership button, and all ownership level dropdown options.

_Changelog:_ The Scan System Options dialog is now fully localizable (i18n).

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing change enabling non-English users to see translated UI text; Changed user_facing to true — players and GMs using non-English locales will now see translated strings in this dialog; Added changelog entry for the localization improvement

## Internal / Tooling

### `lang/en.json` - modified - internal - internal - CHUNKED x2

Massive i18n overhaul: adds ~4,800 lines of structured localization strings under a new top-level "LA" namespace in the English language file, covering every subsystem (structure/stress, battle log, Token Action HUD, movement, vision, settings, onboarding, scanning, effects, deployables, activations, and more). Moves previously hardcoded English strings into the translation file and fixes the TYPES.Item key structure to use a nested object.

_Details:_ The new LA namespace organizes strings hierarchically by feature area: altStruct, battleLog, deployables, effectManager, flow, grapple, infection, keybindings, measure, movement, onboarding, reaction, reactionConfig, reactionEditor, recap, rest, scan, settings, tah, and others. Includes all UI labels, dialog titles, notifications, tooltips, setting names/hints, onboarding wizard text, error messages, tour/walkthrough content, status effect descriptions, keyboard shortcut references, Battle Log theming, stat bar options, vision/detection labels, wreck configuration, and telemetry prompts.

### `module.json` - modified - internal - internal

Version bump from 4.2.8 to 4.3.1 in module.json, updating the version string and download URL.

### `package.json` - modified - internal - internal

Added the i18n:check audit to the combined `check` script so it runs alongside lint, conventions, and typecheck.

### `scripts/main.js` - modified - improvement - user-facing

Main entry point updated to localize all user-facing strings (dialogs, keybinding names, notifications, button labels) via i18n helpers, add new module imports for token ground shadows, trig vision sweep, drag-origin vision sources, and token height API functions, and rename checkEffectImmunities to getEffectImmunityBonuses with richer immunity bonus data.

_Details:_ New imports: token-ground-shadow.js, trigVisionSweep, dragOriginSources, laTokenHeight/laTokenGameplayHeight (also exposed on the module API). All hardcoded English strings in the movement-history dialog, keybinding registrations, Token HUD buttons, immunity prompt, settings sidebar, and notifications are replaced with localize/localizeFormat calls. The effect immunity flow now uses getEffectImmunityBonuses returning full bonus objects (with source/name) instead of plain string arrays, and passes ownerTokenId context and bonuses to consumeImmunityUse.

_Changelog:_ Added localization for all UI strings and exposed token height helpers on the module API.

_Settings/API:_ `api.laTokenHeight`, `api.laTokenGameplayHeight`

### `scripts/seasonal/annual.js` - modified - refactor - internal

Replaces a hardcoded placeholder string in the birthday-wish textarea with a localized string via the localize utility.

_Details:_ Imports localize from string-utils and swaps the inline placeholder text for a localization key (LA.seasonal.birthdayPlaceholder).

### `scripts/setup/lancer-modif.js` - modified - refactor - internal

Replaces all hardcoded English UI strings (notifications, dialog titles, placeholders) with localization calls, and extracts the getDesiredWallHeight helper to a shared utility module.

_Details:_ Every ui.notifications and Dialog.confirm call in lancer-modif.js now uses localize() or localizeFormat() with i18n keys instead of inline English strings. The getDesiredWallHeight function was removed from this file and is now imported from tools/token-height.js.

### `scripts/tools/compendium-tools.js` - modified - refactor - user-facing - CORRECTED

Replaces hardcoded English notification strings in compendium-tools.js with localization calls using localize() and localizeFormat().

_Details:_ All ui.notifications messages (errors, warnings, info) are now routed through localization keys (e.g. LA.notify.lancerAutomationsMacroPackNotFound, LA.notify.macroNotFoundInPack, etc.). This enables translation of user-visible notification messages.

_Changelog:_ Notification messages in compendium tools are now localizable, enabling translation support.

_Verify fixed:_ Set user_facing to true: notification messages are visible to GMs/players and can now appear in other languages; Added changelog bullet since localization of visible UI strings is a user-facing improvement

### `scripts/tools/settings-utils.js` - modified - internal - internal

Replaces hardcoded English name and hint for the 'Cache Settings Reads for All Modules' setting with localization keys.

_Details:_ The setting registration for SETTING_CACHE_ALL now uses i18n keys (LA.settings.settingsCacheAllModules.name and .hint) instead of inline English strings.

### `scripts/tools/string-utils.js` - modified - refactor - internal

Adds two localization utility functions (`localize` and `localizeFormat`) to the shared string-utils module, wrapping Foundry's `game.i18n.localize` and `game.i18n.format` with null-safety.

_Details:_ These are generic helpers for i18n string localization used by other parts of the module.

### `startups/personalStuff.js` - modified - internal - internal

Trivial formatting change: switched a double-quoted string to single quotes and added a period in a warning message.

## Isometric

### `scripts/setup/iso-settings.js` - modified - refactor - user-facing

Isometric settings are converted from hardcoded English strings to localization keys, and the default scope for most iso settings changes from 'client' to 'world' (per-world instead of per-client). Two internal helper functions are exported for external use.

_Details:_ All setting name/hint strings replaced with i18n keys (LA.settings.iso.*). The registration scope defaults to 'world' now instead of 'client', meaning GMs control iso settings globally rather than each player setting them individually. The debug overlay setting explicitly keeps scope:'client'. _isoPerspectiveActive and _grapeActive are renamed and exported as isIsoPerspectiveActive and isGrapeIsoActive.

_Changelog:_ Changed isometric settings to be world-scoped (GM-controlled) instead of per-client, and added localization support for all iso setting labels.

_Settings/API:_ `iso.statBar`, `iso.tacticalDistance`, `iso.waypointLabel`, `iso.elevationAnimation`, `iso.restoreAnchor`, `iso.scrollingText`, `iso.targetReticle`, `iso.clickZone`, `iso.selectionMarquee`, `iso.moduleLabels`, `iso.effectAspect`, `iso.debugSelectionOverlay`

## Movement & Ruler

### `doc/feature/MOVEMENT.md` - modified - feature - user-facing - BLOG - CORRECTED

Auto-elevation from Terrain Height Tools now has two distinct modes: Ground (token walks on surfaces, climbs/descends terrain) and Hold (elevation at drag start acts as a floor, used by fly). A new Z keybind swaps between them mid-session.

_Details:_ Ground mode is used by walk/climb/crawl/jump and lets the token go under overhangs and off ledges. Hold mode is used by fly and prevents the token from dropping below its starting elevation. E/Q behavior differs per mode (adds on top of surface vs moves the floor). A waypoint badge indicates the active mode. Z is rebindable under Configure Controls. The X (Toggle Pathfinding) description was also updated to note it requires the Pathfind Drag Movement setting to be on.

_Changelog:_ Added Ground and Hold auto-elevation modes for terrain, with a Z keybind to swap between them

_Verify fixed:_ Added note about X keybind description change (now mentions requiring Pathfind Drag Movement setting)

### `scripts/combat/speed-provider.js` - modified - internal - internal

Replaces hardcoded English setting names for speed-provider color settings with localization keys.

_Details:_ All five speed color settings (Standard, Boost, Over-boost, Free Movement, Force Movement) now use i18n key references (LA.settings.speedProvider.*.name) instead of inline English strings.

### `scripts/combat/terrain-utils.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the dangerous-terrain immunity flow with localization calls (localize/localizeFormat).

_Details:_ Dialog title, description, button labels, and notification messages in triggerDangerousZoneFlow are now fetched via localization keys instead of inline strings.

_Changelog:_ Dangerous-terrain immunity prompts and notifications are now localizable (i18n).

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — i18n is a user-facing enhancement, not a pure refactor; Changed user_facing to true — players/GMs using non-English locales will see translated terrain immunity dialogs and notifications; Added changelog bullet for the localization improvement

### `scripts/interactive/canvas-helpers.js` - modified - internal - internal

Replaces a hardcoded English notification string for immovable tokens being knocked back with a localized format call.

_Details:_ The warn message in applyKnockbackMoves now uses localizeFormat('LA.notify.immovableMovedAnyway', { name: token.name }) instead of a template literal.

### `scripts/interactive/tools/moveToken.js` - modified - internal - internal

Replaces a hardcoded English notification string with a localized format call for the 'movement blocked by' warning.

_Details:_ The warn notification `Movement blocked by ${blocked.name}` now uses `localizeFormat('LA.notify.movementBlockedBy', { name: blocked.name })` for i18n support.

### `scripts/interactive/tools/moveTokenRuler.js` - modified - improvement - user-facing - CORRECTED

Wall-blocking logic in the move-token ruler is refactored to use a shared `makeWallBlocker` utility that is elevation-aware and respects the token's movement action, and two user-facing notification strings are localized.

_Details:_ The inline `wallBlocked` closure is replaced by `makeWallBlocker` from the new wall-block module, which now receives the movement action (or falls back to the token document's `movementAction`) and checks elevation. The wall blocker is also now created lazily inside the reachable-cells computation rather than once at the top level. The 'Pick a destination first' and 'Destination is out of range' warnings are switched to localized strings via `localize()`.

_Changelog:_ Improved move-token ruler wall blocking to be elevation-aware and respect the token's movement action; localized notification messages

_Verify fixed:_ Added detail that makeWallBlocker respects the token's movementAction (action ?? moveTok.document.movementAction); Added detail that wallBlocked is now created lazily inside the reachable-cells loop instead of once at the top level; Noted optional chaining (wallBlocked?.) meaning the blocker can be null

### `scripts/movement/cost-rules.js` - modified - improvement - user-facing - BLOG - CORRECTED

Rewrites the elevation/climbing cost model to use a surface-based resting system with 'ground' and 'hold' elevation modes, replacing the old terrain-top tracking. Multi-cell tokens now compute a per-cell resting surface via solidBands/restingSurface utilities, and the Q/E manual elevation offset interacts differently depending on the elevation mode.

_Details:_ Removed centerTopAt and standingTopFor helpers in favor of a new footprintRestingSurface function that delegates to solidBands/restingSurface from movement-utils. evalCellStep now accepts elevationMode ('ground'|'hold'|null) and zHeight context, computing next token elevation from the surface rather than terrain-top deltas. The 'hold' mode measures from a persistent floor reference (shifted by Q/E), while 'ground' chains from the last surface. footprintShapesAt now returns per-cell shape arrays (cellShapes) instead of a max top value. The start-of-path elevation initialization was simplified, removing the groundElevGrid computation. A hardcoded warning string was replaced with a localized localizeFormat call. The climb overlay arrows now show the actual step delta instead of a separately computed visual delta.

_Changelog:_ Improved elevation tracking during movement to use surface-based resting logic with ground/hold modes, producing more accurate climbing costs and elevation overlays on complex terrain

_Verify fixed:_ Added mention of localized warning string change to changelog consideration (already in details, no changelog impact needed); Added detail about climb overlay arrows now using actual stepDelta instead of a separate visualStepDelta computation, which could produce visibly different climb indicators

### `scripts/movement/elevation.js` - modified - improvement - user-facing - BLOG

Reworked auto-elevation logic to use a unified surface/resting model with ground and hold elevation modes, and added per-cell animation rendering so tokens animate through every grid cell instead of jumping between waypoints.

_Details:_ Replaced the old terrainTopUnder / _terrainTopMost gap-search system with a new surfaceUnder function backed by solidBands/restingSurface/footprintSurface utilities from movement-utils. Elevation now distinguishes 'ground' mode (snap to surface, Q/E offsets added on top) from 'hold' mode (Q/E folded into the floor reference). Added expandPerCell function that expands ruler waypoints into every intermediate grid cell for smooth token movement animation, gated by a new 'rulerPerStepRender' setting. Deleted ~140 lines of old helper functions (_tokenZHeight, _cellTopAt, _waypointCenterOffset, _waypointFootprint, _terrainTopMost, standingTopAt). Forced/displace actions now animate as straight lines.

_Changelog:_ Improved auto-elevation to use ground/hold modes with proper surface resting, and added per-cell animation so tokens move smoothly through each grid cell

_Settings/API:_ `rulerPerStepRender`

### `scripts/movement/history.js` - modified - internal - internal

Replaces hardcoded English strings for two movement-history settings (clear on turn change, clear on round change) with i18n localization keys.

_Details:_ Settings SETTING_CLEAR_ON_TURN and SETTING_CLEAR_ON_ROUND now use LA.settings.historyClearOnTurn and LA.settings.historyClearOnRound localization keys instead of inline English text.

### `scripts/movement/keybindings.js` - modified - feature - user-facing - BLOG

Adds a new 'Swap Elevation Mode' keybinding (Z) that lets users toggle between ground-snapping and altitude-holding during a drag move, with floating text feedback. Also adds floating scroll-text feedback to the existing pathfinding toggle (X), localizes all movement keybinding names/hints, and makes the X toggle respect the world setting as a master switch (X no longer works if the pathfindDragMovement setting is off).

_Details:_ New elevationModeFor() and currentElevationMode() helpers determine whether a move should snap to terrain surfaces ('ground') or hold altitude ('hold') based on the movement type (walk vs fly) and user override. The floatDragFeedback() function shows scrolling text above dragged tokens when toggling. refreshActiveDragPreviews() gains a replan option that forces Foundry to recalculate the path by injecting a cache-busting key.

_Changelog:_ Added a Z keybinding to swap between ground-snapping and altitude-holding elevation modes mid-drag, with on-screen feedback text for both elevation and pathfinding toggles.

### `scripts/movement/move-tracking.js` - modified - refactor - internal

Replaces hard-coded English strings in the Boost/Overcharge movement-cap dialogs with localization calls using localize() and localizeFormat().

_Details:_ Dialog titles ('BOOST & MOVE', 'OVERCHARGE & BOOST & MOVE') and description templates are now pulled from localization keys (LA.dialogTitle.boostAndMove, LA.dialogTitle.overchargeBoostMove, LA.movement.exceedsCapBoost, LA.movement.exceedsCapOvercharge).

### `scripts/movement/movement-utils.js` - modified - feature - user-facing - BLOG

Adds terrain-height-tools (THT) solid-band collision and resting-surface logic for token movement. New utilities compute solid height bands from THT shapes, determine the surface a token rests on (with 'ground' and 'hold' modes), and resolve footprint-level surfaces for large tokens that can step over sub-size obstructions.

_Details:_ solidBands() extracts height bands from THT terrain shapes marked solid. restingSurface() finds the elevation a token should snap to given solid bands, supporting 'ground' (highest walkable surface at or below current height) and 'hold' (push upward out of any intersecting band). footprintSurface() reconciles per-cell surfaces across a multi-cell footprint, letting large movers ignore height differences smaller than their size.

_Changelog:_ Added terrain-aware resting-surface and solid-band collision logic so tokens automatically snap to the correct elevation when moving through Terrain Height Tools terrain

### `scripts/movement/movement-wheel.js` - modified - improvement - user-facing

The movement-wheel keybinding no longer cycles movement type mid-drag (deferring to Foundry core's Tab key instead), and a libWrapper hook now plays a UI sound and shows a floating drag-feedback label when core's Tab cycle is used during a drag.

_Details:_ Removed the custom cycleDragMovementAction function. The 'M' keybinding now returns false during a drag so core handles it. A new libWrapper around TokenLayer._onCycleViewKey adds the toggle sound and floating label feedback to core's built-in cycle. Keybinding name/hint strings switched to localization keys.

_Changelog:_ Improved movement-type cycling mid-drag to use Foundry core's Tab key with audio and floating label feedback

### `scripts/movement/reachability.js` - modified - improvement - user-facing

Movement reachability and route-finding now respect wall blocking at the token's elevation and use a simplified floor-based elevation model instead of the old terrain-top approach. Adds elevation-mode awareness and token gameplay height to the pathfinding context.

_Details:_ Replaces prevTerrainTop/terrainTop with a floor-based tracking model (floor/nextFloor). Introduces wall collision checks via makeWallBlocker so reachability flood and A* route search reject paths blocked by walls at the mover's elevation. Removes standingTopFor import and related ground-elevation logic. Passes elevationMode and zHeight into the cost context.

_Changelog:_ Improved movement reachability to respect walls at the token's elevation and use a cleaner elevation model

### `scripts/movement/tactical-distance.js` - modified - internal - internal

Replaces hardcoded English choice labels for the tactical-distance and label-position settings with localization (i18n) string keys.

_Details:_ Settings 'enableTacticalDistance' choices (off/combat/always) and 'tacticalLabelPosition' choices (above/below) now reference LA.settings.* localization keys instead of inline English strings.

### `scripts/movement/terrain-trigger-waypoints.js` - modified - improvement - user-facing - CORRECTED

Terrain-trigger waypoint injection now handles unreachable waypoints, attempting to route through them rather than ignoring them. Previously only reachable path segments were routed; now the code also processes the unreachableWaypoints list, inserting terrain-trigger corners where possible and updating the remaining unreachable list.

_Details:_ The _injectRoute function was refactored to extract routeBetween and pushCorners helpers. A new loop iterates over context.unreachableWaypoints, attempting to compute movement routes for each. Successfully routed unreachable waypoints are spliced into the path; ones that truly cannot be reached are preserved. Clipped trailing non-explicit waypoints are handled specially to avoid duplicating the last segment. Route computation errors are now logged as warnings instead of silently swallowed.

_Changelog:_ Improved terrain-trigger waypoint routing to handle unreachable waypoints, allowing terrain hazard triggers to fire even on partially blocked paths.

_Verify fixed:_ Added mention of error logging change: route failures now emit console.warn instead of being silently caught

### `scripts/movement/token-move-hooks.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English string for the 'MOVEMENT REROUTED' dialog title with a localized string lookup.

_Verify fixed:_ kind changed from 'internal' to 'improvement' — localization is a user-facing improvement (non-English users now see a translated dialog title); user_facing changed from false to true — the dialog title is directly visible to users

### `scripts/movement/token-ruler.js` - modified - improvement - user-facing - CORRECTED

The token ruler now shows the current elevation-mode keybinding (hold/descend) on the last waypoint label, only shows the pathfinding indicator when the pathfind-drag setting is enabled, and fixes isometric waypoint-label projection so it applies even when the module's ruler is off (avoiding double-projection with the Grape Juice module).

_Details:_ Imports currentElevationMode from keybindings and displays an elevation-mode icon (fa-arrow-up-to-line for hold, fa-arrow-down-to-line for descend) on the final waypoint. The showPathfind flag is now gated on the pathfindDragMovement setting being enabled. Isometric label projection is applied unconditionally for both LancerTokenRuler (when settingOn is false) and LancerCanvasRuler, and the iso check was renamed from isIsoFeatureEnabled to isIsoPerspectiveFeatureEnabled with a comment noting Grape Juice compatibility.

_Changelog:_ Improved ruler waypoint labels to show the active elevation mode keybinding and to only display the pathfinding indicator when the setting is enabled; fixed isometric label positioning when using Grape Juice.

_Settings/API:_ `pathfindDragMovement`

_Verify fixed:_ Added pathfindDragMovement to settings_or_api since showPathfind is now gated on that setting

### `scripts/movement/wall-block.js` - added - feature - user-facing - BLOG - CORRECTED

Adds wall-blocking logic to the movement system so that token movement steps are blocked when they cross a wall segment at the mover's elevation, respecting wall height bands (wall-height module compatibility), one-way walls, open doors, and the GM's unconstrained-movement setting.

_Details:_ Uses the canvas wall quadtree for efficient spatial lookup, caches results per from/to/elevation key, and reads wall type from CONFIG.Token.movement.actions. Walls without the wall-height module flags block at all elevations.

_Changelog:_ Added wall collision blocking to the movement system, respecting wall heights, one-way walls, and open doors.

_Settings/API:_ `core.unconstrainedMovement`

_Verify fixed:_ Added core.unconstrainedMovement to settings_or_api — the code checks this external setting to bypass wall blocking for GMs

### `scripts/tools/movement-tools.js` - modified - refactor - user-facing - CORRECTED

Replaces all hard-coded English UI strings in movement tools (standing up, boost, teleport, fall) with localization calls via localize/localizeFormat.

_Details:_ Notifications for not-prone, standing-up detail, boost title/description, teleport title/description, already-on-ground warning, and fallen-distance info are now fed through i18n helpers.

_Changelog:_ Movement prompts and notifications (stand up, boost, teleport, fall) are now localizable for non-English translations.

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated UI strings, which is a visible change; Added changelog bullet since this is user-facing i18n support

### `templates/lancer-waypoint-label.hbs` - modified - feature - user-facing

Adds an elevation-mode badge/icon to the waypoint label UI, showing the current elevation mode alongside existing pathfinding and cost indicators.

_Details:_ New conditional block renders a div with class 'la-badge-elevmode' plus the current elevMode value, displaying an icon determined by elevIcon.

_Changelog:_ Added elevation mode indicator to waypoint labels during movement

## NPC Automations

### `templates/scan-gm-input.html` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the scan GM-input template with localization calls (localize helper), covering 'Hidden Information', 'Public Information', and 'Information to share' labels.

_Details:_ Three strings replaced with {{localize "LA.scanUi.gmInput.*"}} calls. Surrounding descriptive sentences remain in English.

_Changelog:_ Scan GM-input dialog labels (Hidden Information, Public Information, Information to share) are now localizable.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing change enabling non-English users to see translated UI labels; Changed user_facing from false to true; Added changelog bullet since translators and non-English users benefit from this

## Setup & Onboarding

### `scripts/setup/checkCompatibility.js` - modified - improvement - user-facing - CORRECTED

All hardcoded English strings in the compatibility-checker dialogs are replaced with localization keys, and three new compatibility rules are added: waypoint-label auto-enable/disable for Isometric Perspective vs Grapejuice iso, and a check for Terrain Height Tools' LoS measurement conflicting with the built-in ruler.

_Details:_ New conflict rules: waypointlabel-vs-isoperspective (auto-enables iso waypoint labels when Isometric Perspective is active), waypointlabel-vs-grapejuice (auto-disables them when only Grapejuice iso is active), and tht-los-vs-la-ruler (detects and can auto-fix Terrain Height Tools drawing duplicate LoS measurements over the LA ruler). All existing and new rule labels, button text, dialog titles, and notification strings now use localize() calls.

_Changelog:_ Added compatibility checks for Isometric Perspective waypoint labels, Grapejuice iso mode, and Terrain Height Tools LoS measurement conflicts; localized all compatibility-checker strings.

_Settings/API:_ `iso.waypointLabel`, `enableBuiltinSpeedProvider`

_Verify fixed:_ Added iso.waypointLabel and enableBuiltinSpeedProvider to settings_or_api since the new rules read/write these module settings

### `scripts/setup/deprecations.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English deprecation-warning string with a localized format call using localizeFormat and a translation key.

_Details:_ The notification shown when deprecated activation patterns are detected now uses the 'LA.notify.deprecatedActivations' localization key instead of an inline English string.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing improvement for non-English users; Changed user_facing to true — the deprecation warning notification is shown to users and will now appear in their configured language

### `scripts/setup/news.js` - modified - improvement - user-facing - CORRECTED

Extracts the install-ID helper out of news.js into the shared telemetry module and replaces several hard-coded English UI strings with localization calls.

_Details:_ Removed the local _getOrCreateInstallId function (and its INSTALL_ID_SETTING constant) in favor of the shared getOrCreateInstallId from telemetry.js. Replaced hard-coded strings like "Got it", "Close", "Could not submit. Try again later.", and the dialog title with localize() calls.

_Changelog:_ News & release dialogs now support localization (translated UI labels instead of hard-coded English).

_Verify fixed:_ kind changed from refactor to improvement: the localization of visible UI strings is a user-facing improvement, not a pure refactor; user_facing changed to true: localized strings affect what users see, especially non-English users; Added changelog bullet for the localization change

### `scripts/setup/scene-dim-from-image.js` - modified - refactor - internal

Replaced all hardcoded English UI notification strings and labels in the scene-dimension-from-image helper with localization calls (localize / localizeFormat).

_Details:_ Five inline English strings (warnings, info notifications, and a label) were replaced with localization keys such as LA.notify.noBackgroundImageSetOnThisScene, LA.notify.couldNotLoadImage, LA.notify.sceneDimensionsSet, LA.notify.sceneDimensionsScaled, LA.notify.currentSceneDimensionsAreEmptySetWidth, and LA.sceneDim.scaleWH.

### `scripts/setup/settings-onboarding.js` - modified - refactor - user-facing - BLOG - CORRECTED

Moved all hardcoded English strings in the onboarding/setup wizard to localization keys (LA.onboarding.*), making every label, explanation, choice, warning, dialog title, and notification translatable via Foundry's i18n system.

_Details:_ Every group label/blurb, question label/explain/warn, choice label, link label, window title, notification message, reload dialog, and settings menu registration now use localize() calls with LA.onboarding.* and LA.settings.* keys instead of inline English text.

_Changelog:_ The Setup Wizard and all its onboarding questions are now fully translatable — community translators can localize every label, explanation, and choice in the wizard.

_Verify fixed:_ Set user_facing to true: i18n support enables non-English users to see the setup wizard in their language, which is a visible change; Added changelog bullet since localization of the entire onboarding UI is meaningful to end users and translators; Set blog_worthy to true: full i18n of the setup wizard is a notable feature for the international community in a major version bump

### `scripts/setup/settingsMenus.js` - modified - improvement - user-facing - BLOG - CORRECTED

Full i18n of the settings configuration UI, plus new settings tabs, sections, and fields. All hardcoded English strings replaced with localization keys. New THT shortcuts tab, TAH portrait section, token ground shadow settings, new vision options, new performance toggles, new keybindings, and core Foundry performance shortcuts added to the config window.

_Details:_ Major structural changes: ACTION_FX_KEYS, UI_VARIANTS, TOKEN_VARIANTS, DAMAGE_TYPES, STAT_EVENTS, STATUS_SFX_EVENTS changed from plain string arrays to [id, labelKey] tuples. STATUS_FX_VISUAL is now derived from an imported STATUS_FX_KEYS list. The _toLabel helper was removed. New field types moduleSlider and moduleColor added for external module settings. New THT_FIELDS tab added with shortcut settings for Terrain Height Tools (drop shading, tanaka contours, lighting, stacking, labels, performance, terrain types). Performance tab gained core Foundry shortcuts (performanceMode, maxFPS, visionAnimation, lightAnimation, tokenDragPreview). TAH gained a Portrait section. Token Display gained a Ground Shadow subsection. New helper functions _extNamespaceActive, _coerceExtValue, and externalLabel added. Pointer-driven label-pan animation added for overflowing option labels. The rangePulseLineOpacity setting was retired (commented out, forced to 0).

_Changelog:_ The entire settings configuration window is now fully localizable (i18n). Added a new Terrain Height Tools shortcuts tab, TAH portrait options, token ground shadow settings, new vision settings (LoS peek range, awareness style, drag suppress origin sources), new performance toggles, two new keybindings (Toggle Pathfinding, Swap Elevation Mode), and core Foundry performance shortcuts. Retired the Range Pulse Grid Line Opacity setting.

_Settings/API:_ `tah.portrait.mode`, `tah.portrait.scope`, `tah.portrait.mechUsePilot`, `tah.portrait.scale`, `tokenGroundShadow`, `tokenGroundShadowThrow`, `tokenGroundShadowOpacity`, `lancerLosPeekRange`, `lancerAwarenessStyle`, `dragSuppressOriginSources`, `visionFromEdgeDeferDrag`, `occlusionDimDeferMoving`, `togglePathfinding`, `swapElevationMode`

_Verify fixed:_ Changed area from 'Internal / Tooling' to 'Setup & Onboarding' — this is the settings configuration UI; Changed kind from 'refactor' to 'improvement' — localization and new settings are user-facing improvements; Changed user_facing from false to true — i18n enables non-English users, and many new settings are user-facing; Added changelog — multiple user-visible changes warrant a changelog entry; Changed blog_worthy to true — full i18n of the config UI is a significant milestone; MISSED: rangePulseLineOpacity setting was retired/removed (commented out, forced to 0); MISSED: togglePathfinding and swapElevationMode keybindings not listed in settings_or_api

### `scripts/setup/telemetry.js` - modified - improvement - user-facing

Localized all hardcoded English strings in the telemetry/consent dialogs and settings to use localization keys. Also extracted `getOrCreateInstallId()` as a reusable export and made declined/opted-out users still count toward the anonymous daily total as an 'unknown' role.

_Details:_ Dialog titles, button labels, notification messages, and setting name/hint strings are now passed through localize/localizeFormat. Users who decline consent now trigger a daily ping with an empty hash and ROLE_UNKNOWN so they still count in aggregate totals without being individually tracked.

_Changelog:_ Localized all telemetry consent UI strings and improved anonymous usage counting for opted-out users

_Settings/API:_ `LA.settings.dataConsent.name`, `LA.settings.dataConsent.hint`, `LA.settings.consentMenu.name`, `LA.settings.consentMenu.label`, `LA.settings.consentMenu.hint`

### `scripts/setup/tour.js` - modified - improvement - user-facing

All hardcoded English strings in the guided tours (Configuration, Token Action HUD, Effect Manager, Activation Manager, Ruler, Advanced Measure, Add Extra) and their associated dialogs have been replaced with localization calls, making the tours fully translatable.

_Details:_ Every tour step title and content, dialog titles/labels/buttons (welcome dialog, movement warning, place-token prompt, TAH enable prompt), notification messages, and the tour settings menu registration now use localize() with translation keys instead of inline English strings. One minor copy change: the Patreon/Ko-fi blurb was reworded from a shout-out to a support message.

_Changelog:_ Localized all guided tour text, making tours fully translatable to other languages

_Settings/API:_ `LA.settings.tourMenu.name`, `LA.settings.tourMenu.label`, `LA.settings.tourMenu.hint`

### `scripts/setup/version-check.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the version-check update dialog with localization calls (localize/localizeFormat) for the dialog title, dismiss button, and remind-me-later button.

_Details:_ Keys used: LA.dialogTitle.moduleUpdate, LA.common.dismiss, LA.versionCheck.remindMeLater.

_Changelog:_ The update-available dialog is now localizable (title, dismiss, and remind-me-later buttons).

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — localization is a user-facing improvement enabling non-English users to see translated UI; Changed user_facing from false to true — GMs see this dialog and will now see localized strings; Added changelog bullet since this is a user-visible improvement

### `styles/interactive-tools.css` - modified - improvement - user-facing - CORRECTED

Long setting labels in the config panel now pan/scroll on hover instead of being permanently clipped with an ellipsis. Respects prefers-reduced-motion.

_Details:_ Adds a .la-opt-label-text inner element with a translateX hover animation (1.6s linear with 0.25s delay) driven by a --la-pan CSS variable. Labels that overflow get a .la-pans class so hovering reveals the full text.

_Changelog:_ Improved config panel so long setting names scroll into view on hover instead of being cut off

_Verify fixed:_ Changed area from 'Interactive Tools' to 'Setup & Onboarding' — the CSS targets #lancer-automations-config (the module config/settings panel), not the interactive tools UI

### `templates/grouped-settings.html` - modified - improvement - user-facing

The Save button in the grouped settings dialog is now localizable instead of hardcoded English.

_Details:_ Replaced hardcoded "Save" text with a localize call to "LA.groupedSettings.save".

_Changelog:_ Improved localization support for the grouped settings dialog.

### `templates/lancer-automations-config.html` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the module configuration dialog template with localization calls (localize helper), enabling future translations.

_Details:_ Localized strings include the banner title, subtitle, Play button, Ctrl+F hint, Contact/Patreon links, footer note, and Save button. Also wraps the option label text in an extra span for styling.

_Changelog:_ Module configuration dialog now supports localization/translation.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — i18n support is a user-facing improvement for non-English users; Changed user_facing to true — translated UI text is directly visible to users; Added changelog bullet since localization is a notable user-facing improvement

### `templates/settings-onboarding.html` - modified - improvement - user-facing - CORRECTED

Replaces all hard-coded English strings in the onboarding setup wizard template with Handlebars localize calls, enabling translation/localization.

_Details:_ Every user-visible string in the onboarding wizard (title, subtitle, intro paragraphs, button labels like Skip/Back/Next/Apply/Force, tips, and summary review text) is now pulled from localization keys under LA.onboardingUi.

_Changelog:_ The setup wizard is now fully localizable — all UI text can be translated via language files.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing capability, not a pure refactor; Changed user_facing to true — users in non-English locales will now see translated onboarding text; Added changelog entry — localization support is a meaningful user-facing improvement that GMs/players would notice

### `templates/startup-script-editor.html` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the startup script editor template with localization calls ({{localize ...}}).

_Details:_ All labels, notes, and button text in startup-script-editor.html are now passed through the localize helper, enabling translation support.

_Changelog:_ Startup script editor is now translatable (i18n support).

_Verify fixed:_ kind changed from 'internal' to 'improvement' — localization is a user-facing improvement enabling non-English users to see translated UI; user_facing changed to true — translated UI text is directly visible to users; Added changelog bullet since localization support is a notable user-facing change

## Structure & Stress

### `scripts/activations/stabilize-flow.js` - modified - improvement - user-facing

All hard-coded English strings in the Stabilize flow (dialog titles, button labels, option labels/details, notifications) are replaced with localization calls, enabling full translation support.

_Details:_ Covers stabilize dialog title, submit/cancel buttons, cool/repair/reload/clear-burn/clear-condition option labels and descriptions, and warning notifications for missing selections.

_Changelog:_ Localized all Stabilize action UI strings for translation support.

### `scripts/alt-struct/alt-struct-helpers.js` - modified - improvement - user-facing

Alt-struct flow button labels and the mech-destroyed error message are now localized via the localize utility instead of being hardcoded English strings.

_Details:_ The button label passed to altStructButton is run through localize(), and the default 'The mech is DESTROYED.' string for destroyMech is replaced with a localization key (LA.altStruct.result.mechDestroyedPlain).

### `scripts/alt-struct/base-rules.js` - modified - refactor - user-facing - CORRECTED

Replaces hardcoded English strings in the base structure/stress rules with localization keys via the localize() utility.

_Details:_ All user-visible labels and result descriptions (HULL check outcomes, Direct Hit, ENGINEERING check results, Meltdown, etc.) now use localization keys like LA.altStruct.directHit, LA.altStruct.result.hullFailedDestroyed, LA.altStruct.meltdownTitle, etc.

_Changelog:_ Structure & stress messages (HULL checks, Direct Hit, Meltdown, ENGINEERING checks) are now localized and can be translated.

_Verify fixed:_ Changed user_facing to true because all replaced strings are directly shown to GMs/players in chat messages and buttons; Added changelog bullet since localization of visible UI text is a user-facing improvement (enables translation)

### `scripts/alt-struct/index.js` - modified - refactor - user-facing - CORRECTED

Replaces all hard-coded English UI strings in the alt-structure module with localization calls (localize / localizeFormat), covering notification warnings, error messages, and flow-conflict details.

_Details:_ Affected strings include equipment destruction title, module conflict warnings, flow conflict details (new steps, new flows, modified-after, replaced-before), invalid actor ID errors, missing flow type errors, and unregistered flow errors.

_Changelog:_ Alt Structure notifications and error messages are now localizable (i18n).

_Verify fixed:_ Changed user_facing to true: localization of UI strings is visible to non-English users who will now see translated messages instead of English; Added changelog bullet: i18n of user-visible notifications is a user-facing improvement worth noting

### `scripts/alt-struct/stress.js` - modified - improvement - user-facing - CORRECTED

All hardcoded English strings in the stress-check logic (table titles, descriptions, notifications, button labels, engineering-check results, meltdown countdown text) are replaced with localization keys via localize/localizeFormat calls.

_Details:_ Covers stress table titles, stress table descriptions for every roll outcome, all ui.notifications messages, embed button labels (ENGINEERING, CRITICAL MELTDOWN, MELTDOWN), engineering check pass/fail result text, meltdown countdown dialog title and body, and critical reactor meltdown title/description.

_Changelog:_ Stress check UI (table results, notifications, button labels, meltdown countdown) is now fully localized and will display in the user's configured language.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing improvement enabling non-English users to see translated stress UI; Changed user_facing from false to true — users in non-English locales will now see translated text instead of hardcoded English; Added changelog entry since this is a user-visible improvement

### `scripts/alt-struct/structure.js` - modified - improvement - user-facing

All hardcoded English strings in the alternative structure/stress roll logic have been replaced with localization keys, enabling full translation support for structure table titles, descriptions, dialog labels, notifications, and chat card content.

_Details:_ Covers structure table titles (Crushing Hit, Direct Hit, System Trauma, Glancing Blow), all structure roll result descriptions, system trauma dialogs (weapon/system destruction selection, badges like DESTROYED/INDESTRUCTIBLE), tear-off roll prompts, HULL check result messages, cancel/destroy button labels, notification warnings, and chat message content.

_Changelog:_ Added localization support for all structure and stress roll UI text, enabling community translations.

## System Additions

### `scripts/setup/status-effects.js` - modified - refactor - user-facing - CORRECTED

Replaces hardcoded English status-effect description strings with localization calls (localize('LA.status.*.description')), and fixes the 'Bolstered' status display name to 'Bolster'.

_Details:_ All custom status effect descriptions (infection, guardian, bulwark, phasing, resistance_all, immovable, disengage, destroyed, grappling, grappled, falling, throttled, blinded, climber, hover, terrain_immunity, surefoot, reactor_meltdown, aided, brace, core_power_active, dazed, overheated) now use localization keys instead of inline English text. The 'bolster' QoL status display name was corrected from 'Bolstered' to 'Bolster'.

_Changelog:_ Status effect descriptions are now localizable; renamed 'Bolstered' status to 'Bolster'

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated descriptions, and the Bolstered->Bolster rename is visible in the UI; Updated changelog to also mention the Bolstered->Bolster rename, which is a user-visible name correction

### `templates/downtime-item.hbs` - modified - improvement - user-facing

Replaced hardcoded English strings "RESULTS" and "Add Result" in the downtime item sheet template with localization calls, enabling translation support.

_Details:_ Uses {{localize "LA.downtimeSheet.results"}} and {{localize "LA.downtimeSheet.addResult"}} instead of raw English text.

## Token Action HUD

### `doc/feature/HUD.md` - modified - docs - internal

Documents the new HUD portrait feature and its four associated settings in the Token Action HUD documentation page.

_Details:_ Adds mention of the optional portrait above the name bar (configurable via tah.portrait.mode, overridable per token in the L.A tab of the token config). Documents four new settings: HUD Portrait, Portrait Applies To, Mechs Use Pilot Art, and Portrait Scale.

_Settings/API:_ `tah.portrait.mode`

### `scripts/tah/action-wheel.js` - modified - internal - internal - CORRECTED

Replaces hardcoded English strings in the action wheel with localization keys for notifications and keybinding registration.

_Details:_ Two UI notification messages and the keybinding name/hint are now passed through localize() instead of using inline English strings.

_Verify fixed:_ Fixed 'Three UI notification messages' to 'Two UI notification messages' — only two notifications are changed (enableTheTokenActionHudToUse and noFavoriteActionsYetMarkActionsWith)

### `scripts/tah/combat-bar.js` - modified - refactor - user-facing - CORRECTED

Replaces hardcoded English action labels and tooltip strings in the combat bar with localization keys, using a new `localize()` utility. Action names (Protocol, Move, Full Action, Quick Action, Reaction) and status words (Available/Spent) are now pulled from translation files.

_Details:_ Labels in ACTION_DEFS changed from plain English strings like 'Protocol' to i18n keys like 'LA.action.protocol'. Tooltip construction also uses localize() for both the action name and the available/spent status.

_Changelog:_ Combat bar action labels and tooltips are now localizable (i18n), enabling non-English translations.

_Verify fixed:_ Set user_facing to true: localization enables non-English users to see translated labels, which is a visible change; Added changelog bullet reflecting the user-visible i18n support

### `scripts/tah/favorites.js` - modified - improvement - user-facing

Replaces hardcoded English strings in the favorites/wheel popup menu with localization calls, enabling translation support for wheel labels, 'Remove', and favorited-status text.

_Details:_ Uses localize() and localizeFormat() for 'Wheel N', 'Remove', 'On wheel N', and 'Not favorited' strings.

_Changelog:_ Localized Token Action HUD favorites popup text for translation support.

### `scripts/tah/glossary-panel.js` - modified - improvement - user-facing - CORRECTED

Replaces a hardcoded English placeholder string in the Glossary panel search input with a localized string key.

_Details:_ The search input placeholder 'Search by name…' is now fetched via localize('LA.common.searchByName').

_Changelog:_ Glossary panel search placeholder is now localizable

_Verify fixed:_ kind changed from 'internal' to 'improvement': this is a localization/i18n improvement visible to non-English users; user_facing changed to true: users playing in non-English locales will now see a translated placeholder instead of hardcoded English; changelog added: localization support is a user-facing improvement worth noting

### `scripts/tah/hud.js` - modified - improvement - user-facing - BLOG

Localizes all hardcoded English strings in the Token Action HUD to use translation keys, adds a portrait image above the HUD name band, and switches to a unified `executeItemActivation` flow for talents and bond powers.

_Details:_ Over 150 hardcoded English labels (actions, categories, dialogs, notifications, section headers) replaced with localize()/localizeFormat() calls. A new portrait element is rendered above the HUD and offsets its vertical position; the default position hugs the scene navigation bar when a portrait is present. Column identity for keyboard navigation now uses data-col attributes instead of comparing translated header text, preventing breakage in non-English locales. Talent rank activation and bond power activation now route through executeItemActivation instead of beginActivationFlow/beginBondPowerFlow. Minor fix: HUD drag no longer saves position when the user clicks without moving.

_Changelog:_ Localized the entire Token Action HUD for translation support and added character portrait display above the HUD.

### `scripts/tah/index.js` - modified - feature - user-facing - BLOG

Adds portrait display settings to the Token Action HUD (mode, scope, mech-use-pilot toggle, and scale) and converts all TAH setting/keybinding labels from hardcoded English strings to localization keys.

_Details:_ New settings: tah.portrait.mode (off/token/actor), tah.portrait.scope (mechPilot/all), tah.portrait.mechUsePilot (boolean), tah.portrait.scale (0.5–2.5). All existing TAH settings and keybindings now use LA.settings.* / LA.keybindings.* i18n keys instead of inline English text.

_Changelog:_ Added portrait display option to the Token Action HUD with configurable mode, scope, and scale settings.

_Settings/API:_ `tah.portrait.mode`, `tah.portrait.scope`, `tah.portrait.mechUsePilot`, `tah.portrait.scale`

### `scripts/tah/item-helpers.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings ('PROFILES', 'MOD', and the already-active-profile notification) with localization calls using localize/localizeFormat.

_Details:_ Section labels 'PROFILES' and 'MOD' now use localize('LA.tokenHud.profiles') and localize('LA.tokenHud.mod'). The active-profile notification uses localizeFormat('LA.notify.alreadyActiveProfile', { name }).

_Changelog:_ Token Action HUD labels and notifications now support localization instead of being hardcoded in English.

_Verify fixed:_ Changed kind from 'refactor' to 'improvement' — localization is a user-facing change enabling non-English users to see translated strings; Changed user_facing from false to true — users in non-English locales will see translated labels instead of hardcoded English; Added changelog entry since this is a user-visible improvement

### `scripts/tah/portrait.js` - added - feature - user-facing - BLOG - CORRECTED

Adds a portrait image displayed above the Token Action HUD name band, with configurable source (token art, actor art, or custom image), per-token overrides, optional mech-to-pilot substitution, and adjustable scale.

_Details:_ Supports world-level settings for portrait mode, scope (mech/pilot or all actor types), scale, and whether mechs should use their pilot's art. Per-token flags allow overriding the mode or specifying a custom image. Handles aspect-ratio caching and graceful error fallback for missing images.

_Changelog:_ Added portrait artwork display above the Token Action HUD, with per-token and world-level configuration for image source, scale, and mech-to-pilot substitution.

_Settings/API:_ `tah.portrait.mode`, `tah.portrait.scope`, `tah.portrait.mechUsePilot`, `tah.portrait.scale`, `tahPortraitMode (per-token flag)`, `tahPortraitImg (per-token flag)`

_Verify fixed:_ Clarified that tahPortraitMode and tahPortraitImg are per-token flags (not module settings) to distinguish them from the world-level settings in the list

### `scripts/tah/search.js` - modified - improvement - user-facing - CORRECTED

The Token Action HUD search feature is now fully localized: category abbreviation chips, the 'Results' column header, and search matching all use localized strings instead of hardcoded English. Additional category chips (Macros, Tech, Frame, Class, Pilot, Gear) are also supported.

_Details:_ Search matching now uses item.text (falling back to item.label) for plain-text extraction. The category abbreviation map is rebuilt per call from localization keys so it follows the active language. The Results column label is localized and tagged with a data-col attribute. The Statuses category abbreviation was removed.

_Changelog:_ Localized Token Action HUD search results, category chips, and column headers for non-English languages

_Verify fixed:_ Added note that the Statuses category abbreviation was removed (present in old hardcoded map, absent from new localization keys)

### `scripts/tah/status-panel.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the status panel (Remove, Keep, search placeholder, help tooltip) with localize() calls using translation keys.

_Details:_ Keys used: LA.common.remove, LA.common.keep, LA.tokenHud.searchStatuses, LA.tokenHud.statusHelp.

_Changelog:_ Status panel UI text (Remove, Keep, search placeholder, help tooltip) is now localizable

_Verify fixed:_ kind changed from refactor to improvement: localization is a user-facing improvement enabling non-English users; user_facing changed to true: users playing in non-English locales will see translated strings instead of hardcoded English; changelog added: this is a visible change for users with non-English language settings

### `scripts/tah/status-wheel.js` - modified - improvement - user-facing - CORRECTED

Replaces hardcoded English strings in the status wheel with localization keys for notifications and keybinding registration.

_Details:_ Two ui.notifications.info calls and the keybinding name/hint are switched from inline English to localize() / i18n key references, enabling translation support for non-English users.

_Changelog:_ Status wheel notifications and keybinding labels are now translatable.

_Verify fixed:_ Changed kind from 'internal' to 'improvement' — i18n is user-facing for non-English users; Changed user_facing from false to true — translated strings are directly visible to users; Added changelog bullet since localization is a user-facing improvement

### `scripts/tah/tokenStatBar.js` - modified - refactor - user-facing - CORRECTED

Replaces hardcoded English strings in the token stat bar UI with localization keys, covering placeholders, dialog titles, button labels, notification messages, and setting names/hints.

_Details:_ Affected strings include the extra-bar label placeholder, linked-item UUID placeholder, 'Link Item to Extra Bar' dialog title, 'Link' button label, reset/reinject/apply-defaults notification messages, reaction tooltip hint, and the Effect Icon Scale setting name and hint.

_Changelog:_ Token stat bar UI is now fully localizable (placeholders, dialogs, notifications, setting labels).

_Settings/API:_ `LA.settings.statBarEffectIconScale.name`, `LA.settings.statBarEffectIconScale.hint`

_Verify fixed:_ user_facing changed to true: localization enables non-English users to see translated UI strings, which is a visible change; settings_or_api updated: the Effect Icon Scale setting name and hint were changed to localization keys; changelog added: localization is user-facing for non-English users and worth a changelog mention

### `styles/tah.css` - modified - feature - user-facing

Adds CSS for a new portrait image displayed above the Token Action HUD, a new elevation-mode badge on waypoint labels (mirrored on the opposite side of the existing pathfind badge), and a fix ensuring hidden form groups in compact config are properly hidden.

_Details:_ The portrait is absolutely positioned above the HUD container with a drop-shadow. The elevation-mode badge reuses pathfind badge positioning but is placed on the right side instead of the left.

_Changelog:_ Added mech portrait display above the Token Action HUD and an elevation-mode indicator badge on movement waypoints.

## Token Display

### `scripts/setup/settings-register.js` - modified - feature - user-facing - CORRECTED

Localizes all setting strings to i18n keys and adds three new token ground shadow settings.

_Details:_ All hard-coded English setting names, hints, and choice labels are replaced with LA.settings.* localization keys. Three new world-scope settings are introduced: tokenGroundShadow (boolean, default false), tokenGroundShadowThrow (number 0-40, default 9), and tokenGroundShadowOpacity (number 0.05-1, default 0.55), each calling refreshAllGroundShadows on change.

_Changelog:_ Added token ground shadow settings (enable, throw distance, opacity) for drop shadows beneath tokens

_Settings/API:_ `tokenGroundShadow`, `tokenGroundShadowThrow`, `tokenGroundShadowOpacity`

_Verify fixed:_ Changed area from 'Internal / Tooling' to 'Token Display' — ground shadows are a visual token feature; Changed kind from 'refactor' to 'feature' — new shadow settings are a user-facing feature addition; Changed user_facing from false to true — the ground shadow settings are visible to GMs in the settings panel and affect token rendering

## Vision & Detection

### `doc/feature/VISION.md` - modified - feature - user-facing - CORRECTED

Documents the new 'Battlefield Awareness: style' setting (lancerAwarenessStyle) which controls how sensor-detected token overlays are rendered, offering Translucent, Silhouette, and Outline only styles.

_Details:_ The three styles differ in how much of the token body is covered: Translucent shows a partial-opacity silhouette (default), Silhouette is solid black, and Outline only draws only the contour and sweep with no body fill. Per-token Detection Visual still overrides.

_Changelog:_ Added Battlefield Awareness style setting with Translucent, Silhouette, and Outline-only overlay options for sensor-detected tokens

_Settings/API:_ `lancerAwarenessStyle`

_Verify fixed:_ Changed kind from 'docs' to 'feature' — this documents a new user-facing setting with three visual styles, not just a docs update

### `scripts/movement/vision-throttle.js` - modified - internal - internal

Replaces hard-coded English name and hint strings for the Vision Animation Throttle FPS setting with localization keys.

_Details:_ The setting key itself (visionAnimationThrottleFps) and its behavior are unchanged; only the display strings now use i18n lookup.

### `scripts/tools/token-height.js` - added - feature - user-facing

New utility module that calculates token heights for wall-height / line-of-sight integration. Accounts for Lancer SIZE values, adds a 0.1 peek so equal-height tokens can see over each other, and optionally reduces height for squads (0.5) and vehicles.

_Details:_ Exports three functions: getDesiredWallHeight (SIZE + 0.1, with squad/vehicle overrides), laTokenHeight (reads wall-height flag or falls back to calculated height), and laTokenGameplayHeight (snaps to nearest Lancer SIZE for physical interactions like fitting under terrain). Respects the autoTokenHeightVehicleSquad setting.

_Changelog:_ Added token height calculation utilities with squad and vehicle awareness for wall-height / line-of-sight integration

_Settings/API:_ `autoTokenHeightVehicleSquad`

### `scripts/vision/blindedVision.js` - modified - internal - internal

Replaces hardcoded English strings for the 'Blinded reduces vision' setting with localization keys.

_Details:_ The setting name and hint now use i18n keys LA.settings.blindedSetsVision.name and LA.settings.blindedSetsVision.hint instead of inline English text.

### `scripts/vision/dragOriginSources.js` - added - feature - user-facing

Adds a new setting to suppress the original token's light and vision sources during drag when the preview token is already carrying them, preventing doubled lighting/vision.

_Details:_ Uses libWrapper to conditionally return false from _isLightSource and _isVisionSource on the origin token while a drag preview with active sources exists. Reconciles origin sources whenever the preview's light source is re-initialized (e.g. on reachability changes). The setting defaults to off.

_Changelog:_ Added option to suppress the dragged token's original light/vision sources when the drag preview already provides them, preventing visual doubling.

_Settings/API:_ `dragSuppressOriginSources`

### `scripts/vision/laWallLos.js` - modified - internal - internal

Replaces hardcoded English strings for the 'Flagged walls only' setting with localization keys.

_Details:_ The setting name and hint for SETTING_FLAG_ONLY are now i18n keys (LA.settings.lancerLosFlagOnly.name/hint) instead of inline English text.

### `scripts/vision/lancerDetectionModes.js` - modified - improvement - user-facing - BLOG - CORRECTED

Adds a configurable Battlefield Awareness visual style setting (silhouette, outline, or veil), a new option to defer occlusion dimming while tokens are moving, significant LOS raycasting performance optimizations, hex-grid animation stability fixes, and developer profiling/regression-testing tools. All setting strings are now localization keys.

_Details:_ New setting 'lancerAwarenessStyle' lets GMs choose between silhouette (legacy filled scan), outline (rim only), or veil (semi-transparent body + rim) rendering for awareness-detected tokens. New setting 'occlusionDimDeferMoving' holds occlusion dim updates until token movement finishes, preventing flicker during drags. LOS ray-testing is optimized: lineSegmentIntersects is inlined to avoid frozen-namespace overhead, _pointToSegmentDistSq avoids Math.hypot, _runsAlongWall takes scalar coordinates, settings reads are cached per context, and PIXI.Point is replaced with plain object literals to avoid megamorphic V8 deoptimization. Hex-grid token LOS/sample points now use document position instead of placeable position so they stay stable during animation. An overlay signature mechanism skips redundant overlay refreshes when nothing has actually changed. New developer console tools: lancerLosProfile/lancerLosProfileDump for ray-count profiling, lancerLosSignature for all-pairs verdict snapshots, and lancerLosStaleCheck for cache-vs-fresh mismatch detection. The updateToken hook is now selective, only clearing pair caches when width/height/shape/flags change. Hover no longer breaks silhouette filter rendering by forcing zIndex to 0 for uncontrolled tokens with mesh filters. The silhouette shader's fill pass was removed in the default (silhouette) style, leaving only the outline+scanline rendering.

_Changelog:_ Added configurable Battlefield Awareness display style (silhouette, outline, or veil) and an option to defer occlusion dimming during token movement, plus significant LOS performance improvements and hex-grid animation stability fixes.

_Settings/API:_ `lancerAwarenessStyle`, `occlusionDimDeferMoving`

_Verify fixed:_ Added note about silhouette shader fill removal in the default style (the old `vec3 fill = outlineColor.rgb * scan * texAlpha` body fill was removed from both shader variants, changing the visual appearance of the legacy silhouette mode); Added hex-grid animation stability fixes to the changelog bullet since it is a user-visible fix

### `scripts/vision/sightlines.js` - modified - improvement - internal

Refactored the sightline zone-height calculation for tokens to use the shared `laTokenGameplayHeight` utility instead of inline size logic, and converted two setting strings to localization keys.

_Details:_ The `_zoneHeight` function previously computed a token's vertical extent inline by reading the actor's system size; it now delegates to `laTokenGameplayHeight`. The attack-hover setting name/hint are moved to i18n keys (`LA.settings.lancerLosAttackHover.name`/`.hint`).

### `scripts/vision/tokenBlocksVision.js` - modified - improvement - user-facing - CORRECTED

Refactors token-blocks-vision to use a shared token height utility (`laTokenHeight`) instead of inline Wall Height / actor size logic, and moves all hardcoded UI strings to localization keys.

_Details:_ The elevation-bounds calculation now delegates to `laTokenHeight(doc)` removing duplicated Wall Height flag and actor size logic. Token config labels and the Bulwark setting name/hint are switched from hardcoded English strings to `localize()` calls.

_Changelog:_ Vision labels and the Bulwark setting are now localizable (i18n).

_Verify fixed:_ Set user_facing to true: localization of UI strings (token config labels, setting name/hint) is visible to users in non-English locales; Added changelog bullet for the localization change, which is a user-facing improvement

### `scripts/vision/trigVisionSweep.js` - added - feature - user-facing - BLOG

Adds a trigonometric peek-range mechanic to the rendered vision sweep. When using the trig height rule, walls that the token's eye clears (parapets) are re-blocked once the token moves beyond a configurable peek range, preventing unrealistic long-distance vision over short walls.

_Details:_ Wraps ClockwiseSweepPolygon.initialize and _identifyEdges via libWrapper. After the normal edge-inclusion pipeline runs, any Wall-Height wall whose top is below the eye height is re-added to the sweep's blocking edges if the token is farther away than the computed peek reach (based on eye height, wall top, and the new setting). Registers a new 'lancerLosPeekRange' world setting (0–30, default 10) controlling the range in grid units.

_Changelog:_ Added a peek-range limit to trig-based vision so tokens can no longer see over short walls from arbitrarily far away.

_Settings/API:_ `lancerLosPeekRange`

### `scripts/vision/vision-disable-on-select.js` - modified - internal - internal

Replaces hardcoded English setting name and hint for the 'Disable Vision Above N Controlled Tokens' setting with localization keys.

### `scripts/vision/visionFromEdge.js` - modified - improvement - user-facing - BLOG - CORRECTED

Adds performance throttling for vision-from-edge during token drags and movement animations, defers expensive per-sample vision sweeps until the token stops moving. Also fixes preview/animating token shape vertex positions to use the document origin instead of the stale PIXI position, localizes all setting labels and UI strings, extracts token height into a shared utility, and adds developer diagnostic tools (sweep probe, vision snapshot/watch/compare).

_Details:_ New setting 'visionFromEdgeDeferDrag' lets GMs defer edge-vision rebuilds while dragging or animating tokens, rebuilding only once the token comes to rest. A new 'visionAnimationThrottleFps' setting controls the throttle rate. The convex-shape vertex calculation now reads from token.document instead of the placeable position to avoid off-by-one-cell bugs during previews and animations. All hardcoded English setting names/hints/choices are replaced with localization keys. The token-config tooltip and label for the per-token Vision From Edge override are also localized. New globalThis diagnostic functions: lancerSweepProbe, lancerSweepProbeDump, lancerVisionSnapshot, lancerVisionWatch, lancerVisionCompare. New exported helper `isAnyTokenMoving()` reports whether any token is mid-drag or mid-movement-animation.

_Changelog:_ Added drag/animation deferral for Vision From Edge to reduce lag when moving large tokens, and fixed edge-vision sample positions during previews and animations.

_Settings/API:_ `visionFromEdgeDeferDrag`, `visionAnimationThrottleFps`

_Verify fixed:_ Added mention of per-token config UI tooltip/label localization; Added mention of new exported isAnyTokenMoving() API helper

## Wrecks

### `scripts/tools/wreck.js` - modified - improvement - user-facing

Adds a per-token HUD Portrait configuration section to the wreck/token config tab, allowing GMs to choose between default, token art, actor portrait, custom image, or off. Also localizes all hardcoded UI strings throughout the wreck tab and replaces the old wall-height-based token height calculation with a unified helper.

_Details:_ New 'Portrait' section in the LA token config tab lets users pick a portrait mode (Default, Token art, Actor portrait, Custom image, Off) and optionally set a custom image path. The difficult-terrain spawn now uses laTokenGameplayHeight instead of reading wall-height flags directly. All UI labels, tooltips, dialog titles, button labels, and notification messages are now localized via localize/localizeFormat calls.

_Changelog:_ Added per-token HUD portrait configuration (token art, actor portrait, custom image, or off) in the token config tab, and localized all wreck-tab UI strings

_Settings/API:_ `FLAG_PORTRAIT_MODE`, `FLAG_PORTRAIT_IMG`
