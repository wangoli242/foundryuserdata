# v4.1.0

## Features

- Workshop browser: browse, preview, and import community automations, packs, and startup scripts from the workshop GitHub repo. Workshop tab in the reaction manager, cloud badge on imported entries.
- Action overlays: attach combat data (attack bonus, accuracy, damage, range, tags) to native Lancer actions; survives system re-imports. Managed in the Extras dialog's Action Combat section.
- Bond panel in the Token Action HUD: bond questions, XP checklists, power activation and unlocking. Bond XP also shows in the stat bar and stat hint popup.
- New NPC automations: Squad, Miner, Engineer turrets, Baserunner, Terrain Printer, and more. Existing ones gain line-of-sight checks, damage cancellation, and zone auto-expiry.
- Live success-chance labels on the canvas during stat rolls, skill checks, saves, and HASE contests.
- Pinned range outlines in Advanced Measure: right-click a range source or weapon to pin a persistent ring. T cycles range source, G clears all.
- In-editor API function reference popup, searchable and categorized.
- New automation helpers: save-vs-effect rolls, attackWith, tier utilities, per-flow and once-per-round gates, injected damage on basic/tech attacks.
- New Effects API helpers: applyMark/findMarkedTokens/clearMarks, findEffectsOnToken, ensureLinkedEffect/ensureLinkedBonus, hasStatus, findEffectFrom.
- Aura API: ensureAura and getTokensInAura; aura lookup now covers item-owned auras.
- Phasing and Overheated built-in status effects.
- Action locks by activation type (quick, full, protocol) via item and actor flags.
- Action FX badges show the item name. Mine detonation FX. Activation FX for Bond Powers and Talents.
- Placed zones: auto-expiry on combat turn boundaries, elevation-aware containment.
- Token stat bars: Bond XP auto-inject, "Owners + scanned" visibility mode.
- Stat hint popup can hide exact values ("?") on scan-only tokens.
- Rank badges (pilot level / NPC tier) on token names in the HUD.
- Core system active synergies in the HUD with per-round/turn/scene frequency pips.
- Clickable use-tracking pips for bond powers in the HUD.
- World setting to reveal NPC stats without a scan.
- confirmCard, askCard, and pickCard choice-card helpers.

## Improvements

- Settings menu: dependent fields disable when their prerequisite is off. New settings: wreck aura colors, HASE chance labels, bond XP bars, tactical label position, action badge item names, scan-gated stat visibility.
- Tactical distance labels: line-of-sight eye indicator (green/red), above/below position setting, zoom-aware scaling, drawn above stat bars.
- Movement respects Intangible and Phasing: intangible mechs no longer block tangible ones, phasing tokens ignore hostile blocking.
- Script editor autocomplete: return types, summaries, and doc links for trigger data fields, plus the new v4 payload fields.
- Token picker: "sensors" range keyword, disposition filters, includeSelf defaults to true.
- Force Check: area-of-effect range support, success-chance indicators on targets, better handling with no targets selected.
- Drag movement pathfinds around obstacles; fallback added for installs without the core movement patch.
- Range-pulse animation costs less and pulses slightly slower.
- Standing Up posts a proper activation card.
- HUD hover range previews reflect granted-action range overrides.
- Automated Limited Handling and Standing Up reactions. Lock On respects granted-action range overrides. Mines ignore tokens at other elevations.
- Bond powers trigger automations like other activation flows.
- Attack flows can inject bonus damage into their damage rolls.
- onPreDamage is cancellable: reactions can prevent damage rolls.
- The Ignore button on cancelled flows works for all flow types.
- Activation pack export strips workshop IDs.
- Obstacle (Phasing) immunity subtype in the Effect Manager.
- NPC Miner Pulverizer Charge deployables; Engineer turret types and naming fixed.
- Setup Wizard: stat-privacy and reveal-without-scan questions.
- Compatibility checker: warning-only advisories (e.g. both JB2A packs active).
- Advanced Measure tour: Pinned Rings step.
- Status panel bonus rows show icons.
- Per-action sound toggle for mine detonation FX.
- Reaction Editor: unsaved-changes indicator and close protection.
- Workshop banners in the activation and startup script editors.
- Duration label "unlimited" renamed to "indefinite" (old value still accepted).

## Fixes

- Vision no longer leaks through pinched wall corners or along collinear wall faces.
- Injected damage no longer lost during flow state persistence.
- Per-frequency limits no longer count core-active subsystems.
- Pilot stress bar no longer breaks forms on newer alternative sheets.
- Isometric Perspective tile tab survives Monk's Active Tiles.
- Phasing tokens no longer blocked by tokens in their path in the move tool.
- Auto-start targeting no longer clicks the wrong button with multiple weapon rows.
- Knockback warns when moving an IMMOVABLE token.

## Removals

- Removed the Overwatch/Reaction reminder system (threat-range movement alerts and debug visualization).
- Removed the token stat bar configuration dialog (settings relocated).

## Documentation

- Workshop section in the README.
- API reference: formal type definitions, new trigger fields, activation/consumption config tables, worked examples.
- Docs for the new combat, effects, interactive, and HUD functions.
