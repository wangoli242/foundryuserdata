# v4.1.0 - Dev Blog (draft)

## Workshop: Share and Browse Community Automations
The biggest new feature in v4 is the **Workshop**. A new tab in the Reaction Manager connects directly to a community GitHub repository where players share their custom automations, packs, and startup scripts. You can browse by contributor, preview entries before importing, and see status badges (NEW, UPDATE, OK) showing what you already have installed. Imported automations carry a workshop ID so updates flow cleanly, and a cloud icon badge marks everything that came from the Workshop. This is the foundation for a real sharing ecosystem around Lancer Automations.

## In-Editor API Reference Panel
Writing automations just got way less tab-switchy. A new draggable "Function Reference" popup lives right inside the activation editor, with every API function organized into searchable groups (attacks, effects, bonuses, tokens, cards, HUD actions, and more). Each entry shows return types, argument signatures, and links out to the full docs. No more flipping between your code and a browser tab.

## Action Overlays: Combat Data That Survives Re-imports
A persistent pain point: you attach attack data to a system's action, then re-import your compendium and it's gone. Action overlays solve this by storing combat data (attack bonus, accuracy, damage, range, tags) in module flags that layer on top of native Lancer actions. The new "Action Combat" section in the Extras dialog makes it point-and-click. Lock On, the TAH hover range pulse, and deployable activations all read overlays automatically.

## Live Hit-Chance Labels
During stat rolls, skill checks, saves, and HASE contests, floating percentage labels now appear on tokens showing your probability of success (or contest win chance). They update live as you hover different targets or change accuracy/difficulty. Toggleable via settings for groups that prefer not to see the math.

## Tactical Distance Labels, Upgraded
Tactical distance labels got a major glow-up. They now show a line-of-sight eye icon (green for clear, red for blocked) when Lancer LoS is enabled. Labels can sit above or below the token, scale up when you zoom out so they stay readable, and render on a high-z overlay so stat bars never cover them. Ghost labels even follow drag previews of targets you're moving around.

## Pinned Range Rings on Advanced Measure
Right-click any range source or weapon in the Advanced Measure toolbar to pin a steady, non-pulsing range outline on the map. Pin multiple tokens and sources at once for a full tactical picture. New keyboard shortcuts too: T cycles range source, G clears everything. Re-clicking the active source toggles it off.

## Bond Panel in the Token Action HUD
Pilots with bonds now get a dedicated Bond panel in the HUD. It shows bond questions with selectable answers, an XP checklist (major ideals, minor ideal, veteran power), and action buttons for tallying XP and refreshing powers. Bond powers show clickable use-tracking pips, and Bond XP appears in the stats bar. The token stat hint popup picks up Bond XP too.

## Expanded NPC Automations
A big batch of new NPC class automations landed: Squad traits (Strength in Numbers, Spread Out, Undersize, Primary Weapon), Miner (Pulverizer Charge, Rock Grinder, Collapse Plating), Engineer turret deploy/shutdown, Baserunner Defense, Terrain Printer waypoints, Sandblast zones, Remote Cloud healing, and more. Existing automations got real improvements too, like line-of-sight checks on Sniper abilities, proper damage cancellation on Anti-Materiel Rifle, and zones that auto-expire instead of needing manual cleanup reactions.

## Scanned Visibility and Stat Privacy
A new "Owners + scanned" visibility mode for token stat bars means you can gate stat visibility behind the scan mechanic. Pair it with the new "hide current values" option to show "?" instead of exact HP/heat for scanned-only tokens. Or flip the "Reveal Stats Without Scan" toggle if your table doesn't bother with hidden NPC stats at all. The setup wizard now asks about stat privacy upfront.

## New Effects API Surface
The Effects API got a serious expansion for automation authors. `applyMark`/`findMarkedTokens`/`clearMarks` give you a clean lifecycle for source-stamped effects (think Suppress or Engineer's Mark patterns). `ensureLinkedEffect` and `ensureLinkedBonus` are idempotent helpers safe to call from onInit without worrying about duplicates. `findEffectsOnToken` does multi-result queries with flag filters. `hasStatus` is the quick status check everyone was writing by hand. Duration label "unlimited" is now "indefinite" (old value still works).

## New Automation Helpers
A cluster of new utility functions make complex automations dramatically simpler to write: `executeSaveVsEffect` handles parallel save rolls with effect-on-failure in one call, `attackWith` fires a weapon programmatically with auto-reload, `tierValue` replaces manual tier branching, `getFlowFlag`/`setFlowFlag` manage per-flow state cleanly, and `consumeOncePerRound` gates once-per-round abilities. Basic and tech attacks now accept injected damage data.

## Overwatch/Reaction Reminder Removed
The built-in Overwatch reminder system (threat-range movement alerts and debug hex visualization) has been removed. This was a source of confusion and false positives. Community solutions and the Workshop can fill this niche for tables that want it.

---

### Smaller stuff
- **Mine detonation FX** with explosion visuals, sound, and a per-action sound toggle
- **Item-name labels on action FX badges** (shows the system/weapon name on the banner)
- **Phasing and Overheated** status effects are now built-in
- **Rank badges** (LL7 / T2) display next to token names in the HUD
- **Core system active synergies** shown in the HUD with frequency pips
- **Settings menu overhaul**: fields now dim and show a warning icon when their prerequisites are off
- **Bond power activation FX** and automation triggers (bond powers now fire onActivation hooks)
- **Wreck aura** color and opacity are configurable, and auras now show outside of combat
- **Move tool respects phasing**: phasing tokens pass through hostiles during pathfinding and knockback
- **Force Check** supports area-of-effect range inputs and success-chance indicators on targets
- **Zone auto-expiry** on combat turn boundaries, plus elevation-aware zone containment
- **Obstacle (Phasing)** immunity subtype in the Effect Manager
- **Standing Up** now shows a proper activation card and has an automated Limited Handling check for NPC vehicles
- **Compatibility checker** warns when both JB2A packs are active simultaneously
- **Pilot stress bar** fix for newer alternative character sheets
