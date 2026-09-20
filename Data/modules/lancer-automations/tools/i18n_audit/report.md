# i18n audit

Roots: scripts, startups, templates

| surface | hardcoded | localized | conforming |
| --- | ---: | ---: | ---: |
| prose-field | 153 | 195 | 56% |
| dialog-title | 109 | 288 | 73% |
| dev-message | 55 | 0 | 0% |
| ui-label | 18 | 967 | 98% |
| notification | 18 | 163 | 90% |
| html-content | 6 | 101 | 94% |
| tooltip | 6 | 26 | 81% |
| setting-name | 0 | 167 | 100% |
| template | 0 | 297 | 100% |
| text-node | 0 | 12 | 100% |
| setting-hint | 0 | 159 | 100% |
| placeholder | 0 | 59 | 100% |
| **total** | **365** | **2434** | |

## prose-field (153)

| file | count |
| --- | ---: |
| startups/itemActivations.js | 125 |
| scripts/alt-struct/stress.js | 11 |
| scripts/activations/reactions-registry.js | 7 |
| scripts/alt-struct/structure.js | 3 |
| scripts/combat/grapple.js | 3 |
| scripts/bonuses/flagged-effects.js | 1 |
| scripts/bonuses/genericBonuses.js | 1 |
| scripts/seasonal/annual.js | 1 |
| scripts/setup/deprecations.js | 1 |

Sample:

- `scripts/activations/reactions-registry.js:149` Treads or Hover
- `scripts/activations/reactions-registry.js:800` Lock On
- `scripts/activations/reactions-registry.js:868` Bolster
- `scripts/activations/reactions-registry.js:1120` Ram by 
- `scripts/activations/reactions-registry.js:1540` Eject
- `scripts/activations/reactions-registry.js:1649` Mine Stealth
- `scripts/activations/reactions-registry.js:1681` Mine Armed
- `scripts/alt-struct/stress.js:217` Critical Stress Failure

## dialog-title (109)

| file | count |
| --- | ---: |
| startups/itemActivations.js | 89 |
| scripts/tah/hud.js | 5 |
| scripts/combat/grapple.js | 3 |
| scripts/activations/flow-steps-extra.js | 2 |
| scripts/activations/reactions-registry.js | 2 |
| scripts/combat/terrain-utils.js | 2 |
| scripts/movement/move-tracking.js | 2 |
| scripts/bonuses/infection.js | 1 |
| scripts/interactive/tools/forceCheck.js | 1 |
| scripts/tools/misc-tools.js | 1 |
| scripts/tools/movement-tools.js | 1 |

Sample:

- `scripts/activations/flow-steps-extra.js:120` THROW ${item.name}
- `scripts/activations/flow-steps-extra.js:166` ${itemName} Knockback
- `scripts/activations/reactions-registry.js:364` Overwatch
- `scripts/activations/reactions-registry.js:552` Brace
- `scripts/bonuses/infection.js:269` INFECTION :: SYS
- `scripts/combat/grapple.js:340` Grapple
- `scripts/combat/grapple.js:353` End Grapple
- `scripts/combat/grapple.js:367` Break Free

## dev-message (55)

| file | count |
| --- | ---: |
| scripts/interactive/deployables.js | 23 |
| scripts/tools/misc-tools.js | 11 |
| scripts/activations/reactions-engine.js | 8 |
| scripts/interactive/network.js | 2 |
| scripts/tools/scan.js | 2 |
| scripts/activations/flow-steps.js | 1 |
| scripts/activations/reaction-manager.js | 1 |
| scripts/interactive/action-overlays.js | 1 |
| scripts/interactive/combat.js | 1 |
| scripts/interactive/extra-config-dialog.js | 1 |
| scripts/interactive/extras-dialog.js | 1 |
| scripts/interactive/tools/chooseToken.js | 1 |
| _2 more files_ | |

Sample:

- `scripts/activations/flow-steps.js:529` lancer-automations \| Unknown flow type "${state.name}". Cannot re-launch.
- `scripts/activations/reaction-manager.js:81` lancer-automations \| Evaluation for "${reaction?.name \|\| 'Activation'}" is async and ${rea
- `scripts/activations/reactions-engine.js:581` lancer-automations \| Flow "${flowName}" not found.
- `scripts/activations/reactions-engine.js:671` lancer-automations \| startRelatedFlow: no actor found.
- `scripts/activations/reactions-engine.js:676` lancer-automations \| startRelatedFlow: action type "${actionType}" will be launched but ma
- `scripts/activations/reactions-engine.js:757` lancer-automations \| ${message}
- `scripts/activations/reactions-engine.js:1654` lancer-automations \| dispatchCustomTrigger: "${name}" is not a valid custom trigger name.
- `scripts/activations/reactions-engine.js:1691` lancer-automations \| startRelatedFlow: action type "${actionType}" cannot be re-launched a

## ui-label (18)

| file | count |
| --- | ---: |
| scripts/tah/hud.js | 6 |
| scripts/seasonal/annual.js | 5 |
| scripts/tah/tokenStatBar.js | 4 |
| scripts/setup/deprecations.js | 1 |
| scripts/tools/downtime-item.js | 1 |
| scripts/tools/pilot-reserves.js | 1 |

Sample:

- `scripts/seasonal/annual.js:176` Hello user. It is ${dateStr}.
- `scripts/seasonal/annual.js:189` Many thanks to you.
- `scripts/seasonal/annual.js:190` But now it is time to say something nice TO ME !!!!
- `scripts/seasonal/annual.js:191` or else .....
- `scripts/seasonal/annual.js:287` VERDICT >>
- `scripts/setup/deprecations.js:20` item ${lid} / ${reaction?.name \|\| 'unnamed'}
- `scripts/tah/hud.js:2015` Basic
- `scripts/tah/hud.js:2228` Basic

## notification (18)

| file | count |
| --- | ---: |
| startups/itemActivations.js | 16 |
| scripts/seasonal/annual.js | 1 |
| startups/personalStuff.js | 1 |

Sample:

- `scripts/seasonal/annual.js:302` Could not send your message. Thanks anyway.
- `startups/itemActivations.js:224` Moving Target: Anti-materiel Rifle not found on ${reactorToken.name}.
- `startups/itemActivations.js:1062` Sniper's Mark: ${target.name} is now marked.
- `startups/itemActivations.js:1065` Sniper's Mark: removed from ${target.name}.
- `startups/itemActivations.js:2363` ${token.name} takes 3 AP Kinetic damage from Sandblast.
- `startups/itemActivations.js:3071` Predatory Logic: ${target.name} has no non-Superheavy weapon.
- `startups/itemActivations.js:3147` Petrify is already affecting a character.
- `startups/itemActivations.js:3155` Petrify: ${target.name} was already petrified this scene.

## html-content (6)

| file | count |
| --- | ---: |
| startups/itemActivations.js | 2 |
| scripts/activations/flow-steps.js | 1 |
| scripts/Battelog/telemetry-debug.js | 1 |
| scripts/bonuses/effectManager.js | 1 |
| scripts/interactive/extra-config-dialog.js | 1 |

Sample:

- `scripts/activations/flow-steps.js:718` <div class="lancer-chat-message"><b>${statLabel}</b><br>
- `scripts/Battelog/telemetry-debug.js:156` <div class="battelog-debug-body">${_contentHtml()}</div>
- `scripts/bonuses/effectManager.js:2292` <p style="padding:6px 8px;">${localizeFormat('LA.effectManager.presetExists', { name })}</
- `scripts/interactive/extra-config-dialog.js:153` <div class="la-ec-body">${renderContent()}</div>
- `startups/itemActivations.js:243` <div class="lancer-chat-message"><b>${reactorToken.name} - Moving Target</b><br>The Anti-m
- `startups/itemActivations.js:5253` <b>${reactorToken.name} - RIFT COLLAPSE</b><br>Objects and terrain in the Rift area are de

## tooltip (6)

| file | count |
| --- | ---: |
| scripts/bonuses/genericBonuses.js | 5 |
| scripts/main.js | 1 |

Sample:

- `scripts/bonuses/genericBonuses.js:1720` Add global accuracy
- `scripts/bonuses/genericBonuses.js:1721` Add global difficulty
- `scripts/bonuses/genericBonuses.js:2203` Add a bonus damage type
- `scripts/bonuses/genericBonuses.js:2260` Add a bonus damage type
- `scripts/bonuses/genericBonuses.js:2373` Add a bonus damage type
- `scripts/main.js:1786` Resistance to ${capitalizedType}

