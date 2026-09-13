## 3.0.0

- This version should work in V12 or V13 Foundry VTT.
- Adopt new v13 ways to construct and manipulate html/css.
- Adopt v13 animation movement detection to allow Engaged automation to work.
- Update FilePicker changes for V13.
- Update texture load commands for V13.

## 2.1.9

- Update module.json to support loading in V13 Foundry
- This is a preparatory step for V13 and no code is changed to support V13 yet

## 2.1.8

- Expose the `pushFlaggedEffect` function so that macros can use it to set custom effects directly without needing a dialog.
- Move some combat effect tracking logic out of the dialog function and into the `pushFlaggedEffect` function.
- Thanks to `reCaste` for their help with this work!

## 2.1.7

- Fixed a bug where the QoL wreck values would contain unusual spaces instead of being empty, or having a valid asset.

## 2.1.6

- Added some safeguards to validate if wreck images, effects, or audio files exist. If they do not, they are replaced with valid ones that do exist.
- Verify wreck assets on each scene load for all tokens on a scene.

## 2.1.5

- If you edit a prototype token's QoL fields, or edit them on a token in a scene, they should no longer be over-written.

## 2.1.4

- When wrecks use tiles, custom sounds were not working. This is because the sound was hardcoded. Custom wreck sounds should now work with tile wreck settings.
- When engaged detection is enabled, actorless tokens should not throw such visible errors.

## 2.1.3

- Load QoL statuses after the Lancer system had finished loaded its statuses, specifically item statuses.

## 2.1.2

- Don't let the Timed Effect macro work unless the setting is enabled. This can lead to a frustrating bug where timed effects do not disappear when they should.
- Add token configuration settings to allow viewing and setting the token wreck effects, image, and sound.

## 2.1.1

- If wreck automation is enabled, when a token reaches zero structure, a `Wreck.apply` macro will be called if it exists. And when a token's structure increases from zero, a `Wreck.remove` macro will be called if it exists.

## 2.1.0

- Add a new status called `M.I.A` with new custom art from Grim!
- When a Squad is reduced to zero structure, automatically apply the M.I.A status as an overlay to help communicate that the Squad is no longer a threat.
- Added monstrosity `wreck` animations, sounds, and corpse token images. Now monstrosities can have a `wreck` process when they reach zero structure.
- Refactored several toggleStatusEffect to clean up code readability and remove ambiguous status changes.
- Re-order settings to help make things a little easier to find.

## 2.0.4

- Statuses and effects were not having their icon applied correctly when using timed-effect macro.

## 2.0.3

- Stop building custom effects to toggle them from actor sheet updates or player macros.

## 2.0.2

- Re-factor the "zero structure" workflow so that biological actors tokens will not be skipped when they're reduced to zero structure. This should allow biological tokens to be removed from combat, and have statuses stripped, even if they don't get "wrecked".
- Fix console warning when engaged automation is enabled.
- Fix console warning when rolling mimic gun X/Y/Z profiles.
- Remove some old v11 references for adding tokens back into combat when "un-wrecked".

## 2.0.1

- Macros called when a status effect is added should be working properly now.

## 2.0.0

- Update to work with Foundry VTT v12
- Update to work with LANCER system module v2.6.0
- Changes to support localized status names.
- Toggle combatant has moved from the token to the token document.

## 1.8.7

- When a token is wrecked, and removed from combat, the token along with any selected tokens are removed from combat. This should now only remove the wrecking token.

## 1.8.6

- When a token is wrecked, disable the showing of the token name and bars.

## 1.8.5

- Fix multiple bugs where multiple GM players being active resulted in odd behavior, like multiple statuses being applied.
- Thanks to Kazl for this bug report!

## 1.8.4

- Replace the Lock On macro for players to lock onto un-owned tokens with a new macro.
- Add a macro that allows players to set bolstered on un-owned tokens.

## 1.8.3

- Fix console errors when non-mech tokens are moved with the engage automation enabled.
- Update the engage automation to not trigger for hidden tokens. This is for Foundry hidden, not Lancer hidden.
- Refactor some of the effect application functions

## 1.8.2

- Engaged automation should now affect pilots. Enemy pilots and enemy mechs can cause a pilot to be engaged. Pilots cannot cause mechs to be engaged.
- Engaged automation should not affect tokens with a structure of 0.

## 1.8.1

- Fix bug where the Engaged status was being applied multiple times in scenes with visioned enabled.
- Restrict engaged automation to only affect NPC and Mech type tokens.

## 1.8.0

- Add new auto-Engaged feature to assign the Engaged status based on mech adjancency and disposition.

## 1.7.3

- Enkidu's special Danger Zone color effect is an option now. It defaults to being enabled.

## 1.7.2

- Fix a bug in the Round Reminder feature that was creating un-desired "Round undefined starts" messages in chat. Thank you to Stasy for helping find and fix the issue!

## 1.7.1

- If a custom wrecks folder is set, let's make sure it has the right folder structure on world load in addition to when the setting is updated.

## 1.7.0

- Removed status effects generated from world items. This feature is available in the Lancer system now!
- Removed burn damage reminder. This feature is replaced with automated burn damage in the Lancer system now!

## 1.6.0

- Allow for custom explosion animations and sounds as part of the wreck automation.
- Add a fall through for missing wreck assets back to built-in assets if no custom items are found, even if the option to only use custom assets is checked.
- When picking a custom wrecks assets location (that is not empty), check if the proper sub-directories for token images, effects, and audio. If they do not exist, create them.
- When applying statuses for Timed Effects, make sure we add descriptions. This should help with DFreds Effects Panel.
- When a combatant has no token, avoid referencing that token. This avoids some console errors while using Monk's Combat Details.
- When applying a Timed Effect, the target is now the default for both token fields. This is based on feedback that most timed effects expire at the end of the targeted tokens next turn.

## 1.5.0

- When opening the Timed Effect dialog, use the first targeted token as the default token to get an effect. Fall back to the selected token.
- Add a round reminder feature that will post rounds to chat and post when combat ends.

## 1.4.6

- The Timed Effect dialog has been re-formatted to more accurately reflect what is being applied, by which token, for how long.
- The chat cards showing applied statuses has been updated to reflect timed effect information.

## 1.4.5

- Fix a bug in the Timed Effect dialog that led to the wrong target being populated.
- Update the card displayed showing statuses on a token on it's turn in combat to display more information about timed effects.
- When setting a Timed Effect, the originator field will default to the current active combatant.

## 1.4.4

- Updated the Time Effect system to allow players to use it.
- Set burn reminder default to off. Now that the new Lancer system automates burn damage at the end of a turn, this is not needed. It may get removed at a later date.
- Add a final card in chat when an NPC with one structure is destroyed.
- Remove the delay for loading custom status effects. Lancer system is less destructive with status effects now.
- Removed non-working reset buttons from settings dialogs.
- Fixed some macro readability issues.

## 1.4.3

- New structure flow option that allows NPCs with a single structure point to skip rolling on the structure table. See Core Rule Book page 281.
- Small typo in a setting change log.

## 1.4.2

- Bug fix (thanks to tradiuz). Wreck tile/token options sometimes were prepended with `selected` text.

## 1.4.1

- Add a status effect automation option to remove all statuses when an actor's structure reaches zero.

## 1.4.0

- Add automation for Custom Paint Job system.

## 1.3.11

- Fix the Bolstered status by updating the ID and icon image.
- Refresh statuses more often, but not too often.

### 1.3.10

- Add a macro that should remove all effects/statuses from a token.

### 1.3.9

- Add a throttle to the automated macro to prevent run-away loops.

### 1.3.8

- Make removing wrecks from the combat tracker into an option.

### 1.3.7

- Bug fixed when automaticly detecting overshield, danger zone, and burn.

### 1.3.6

- For effect items added to status effects, include the item description as the effect description.
- Tune how tokens are discovered from an actor.

### 1.3.5

- Change status effects to only add QoL required effects as a last restort if they do not exist.
- Code refactors for speed and efficiency.

### 1.3.4

- Include Jammed, Cascading, Invisible, Burn, Danger Zone, Intangible macros for the automated effect macros feature.

### 1.3.3

- Include Overshield example macros for use with automated effect macros feature.
- The Lock On example macro had a bug.

### 1.3.2

- Include a Lock On example macro for use with automated effect macros feature.
- Small bug fix for unusual actor problems.

### 1.3.1

- Remove wrecked tokens/tiles from combat.
- Add un-wrecked tokens/tiles to combat.
- Wrecked tokens (not tiles) have their HP set to a value for an object (10 * size). Currently this does not alter the hp max value.

### 1.3.0

- Add a new feature that will execute macros based on an applied status effect. This is a new feature, so if you suspect it is causing problems, please disable it via the configuration settings for Lancer QoL.

### 1.2.0

- Add an option to add status/effect/condition items from the world as usable token statuses.

### 1.1.12

- Settings layout re-worked.

### 1.1.11

- When adding QoL statuses, don't add them if there is a status that shares the same id or name as the status.
- Add Danger Zone as a QoL managed status. It will try to add this status if one is not defined already.
- When Lancer status icons are changed, re-add any QoL statuses if they do not exist.
- When a status is applied via automation, we look for statuses to use by id and name.
- Add error messages when applying Overshield, Danger Zone, or Burn if a status can not be found.

### 1.1.10

- Switch to using name instead of id for referencing statuses. This avoids a problem with Condition Lab.

### 1.1.9

- Thanks to Aqua Socks for reporting an error that broke QoL. A missing `async` caused QoL to fail to load.

### 1.1.8

- Use existing status effects if they exist. Otherwise, add our own.
- Some cleanup in code.

### 1.1.7

- Add a reminder for checking on Burn damage when an actor ends it turn with Burn.

### 1.1.6

- Add special Danger Zone effect for Enkidu frame
- Remove some old files no longer used

### 1.1.5

- Allow the GM to be able to use the Lock On macro
- Add Lock On check to verify there is an active GM in the game

### 1.1.4

- Added CHANGELOG.md file
- Fix mimic gun function to only update mounted mimic guns
- Update Lock On macro for players to allow the Lock On status to be toggled

### 1.1.3

- Add new Mimic Gun Macro
- Trim data from macro source files

### 1.1.2

- New macro added that allows players to force a GM to apply the "Lock On" status to mechs the player doesn't own. A GM needs to be online for this to work.

### 1.1.1

- Re-add status IDs that were erroneously removed when I was cleaning up deprecation warnings.

### 1.1.0

- Remove some lingering deprecation warnings for 'data' errors
- Migrate more label references to name
- Improve/fix tile wreck workflow

### 1.0.8

- Configuration options were changed a little to allow wrecks, token effects, and condition automation to be controlled independently.

### 1.0.7

- Attempt to repair the reaction reminder

### 1.0.6

- Updates to the deploy process to get away from the constantly changing URL problem
- Added token magic effects for the intangible status

### 1.0.5

- If a token has no size, don't throw errors.
- Move the settings up higher in the load process to avoid errors for tokens dragged onto a scene without Lancer QoL enabled.

### 1.0.4

- Timed Effects Overhaul
- Updated timed effects to work with v11 better
- Pared down and re-factored all of the logic to better allow for effects that expire on another units start or end of turn

### 1.0.3

- Found a logic gap in the Ammo Case macro where extraneous kits were not removed when ranking up or down.

### 1.0.2

- Update the Ammo Case macro to work in V11 with Lancer 2.x. This macro can be used if you update Walking Armory outside of Comp/Con and you want to update mechs to reflect the right Ammo Case systems.

### 1.0.1

- Replace the old HP0 macro with a new one that is more direct. This macro sets the HP for any selected token to 0.

### 1.0.0

- Updates to support the new Lancer 2.0.0 system!
- Removed some macros that are in the main Lancer system compendiums.
