# v4.1.2

> NPC and item automations ship in the optional **LaSossis's Items** pack, off by default. They are personal content, not core features, and now require the Additional Statuses setting.

## Features

- Effect Manager targets several tokens at once. Standard / Custom / Bonus share one target, and a new "Each Target" duration origin makes every target its own reference.
- Blinded reduces vision: sight, darkvision, light perception and line of sight clamp to one space. New setting to toggle it.
- Cardless token picker. Click to pick, Shift-click to add, right click or Escape to confirm.
- "React as Target" trigger role: reactions fire from the targeted token's perspective on attack, damage, tech, check and forced-movement triggers.
- Disable/enable action API (yellow HUD indicator), separate from lock/unlock, plus `destroyItem`, `disableItem`, `restoreItem`.
- Accuracy, difficulty and flat modifier pre-fill on stat rolls, saves, contested checks and force checks.
- `targets` option on the attack flows, so callers no longer touch `setTarget`.
- New API: `activateGeneralAction`, `afterFx`, `hasReactionAvailable`, `inDangerZone`, `untilEndOfTurn`, `untilStartOfTurn`, `currentTurnKey`.

## Improvements

- Tether lines link tokens during save rolls, force checks, HASE contests and deployable links. Duration markers support several origins.
- Advanced Measure: merged pin fill, corrected pulse intensity, toolbar polish.
- API reference popup lists the new HUD action and item state functions.
- Editor hints for `isTarget`, `targetEntry`, `hitTokens`.
- "EDITED" badge marks default reactions overridden by a user edit.

## Fixes

- Battle Log no longer files removed combatants (deleted hostile tokens) as players.
- Mech and pilot weapon reactions use the correct weapon activation flow.
- Socket message reactions no longer hang when the reactor token is missing, the owner is offline, or the handler errors.
- Dismissing the Lightning Reflexes card lets the attack resolve instead of stalling the attacker.
- Damage, miss and crit overlay FX render above the interface.
- TAH shows actions as unavailable when hard-disabled by action locks.
- Guardian, Bulwark, Phasing and Infection statuses only register when their settings are on.
- No more crash when a destroyed token is still referenced during vision checks.

## Personal pack

- Witch [K]: Tear Down, Blind, Predatory Logic, Blur, Petrify, Pain Transference. Dark Cloud, Chain and Immolate are not covered.
- Everest Power Up core bonus.
- Predatory Logic takes the real Brace reaction, consuming it with its status and FX, and only offers it to mechs that still have a reaction.

## Removals

- Dropped the deprecated `item-use` activation type.

## Documentation

- `triggerTarget` reaction filter, `role` option for charge consumption, updated `activationMode` defaults.
- `activateGeneralAction`, `afterFx`, attack `targets`, accuracy/difficulty/flat pre-fills.
- `destroyItem`, `disableItem`, `restoreItem`.
- `disableActorAction` / `enableActorAction` and `disableActorActionTypes` / `enableActorActionTypes`.
