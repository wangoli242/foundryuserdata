# Convention discovery

APIs examined: 45  -  inconsistent: 26  -  consistent: 19

## Inconsistent

### `game.settings.get` - 415 sites in 102 files

- **Concept:** Read a module setting value
- **House form:** game.settings.get('lancer-automations', '<key>')
- **Worth a rule:** yes
- **Recommendation:** Standardize on a single named constant (e.g. MODULE_ID) for the module namespace argument; ban inline string literals 'lancer-automations' in game.settings.get calls
- **Variant:** Uses string literal 'lancer-automations' as module ID - `scripts/Battelog/combat-telemetry-derive.js:101`, `scripts/Battelog/gm-card.js:16`, `scripts/Battelog/intro-terminal.js:13`, `scripts/activations/accdiff-target-button.js:86`, `scripts/activations/damage-target-button.js:187`, `scripts/activations/flow-steps-extra.js:10`, `scripts/activations/flow-steps.js:895`, `scripts/activations/flow-wraps.js:362`, `scripts/activations/reaction-export-import.js:159`, `scripts/activations/reactions-engine.js:397`, `scripts/activations/reactions-registry.js:1299`, `scripts/activations/stabilize-flow.js:268`, `scripts/activations/statroll-target-button.js:159`, `scripts/activations/targeting-ui.js:27`
- **Variant:** Uses MODULE_ID constant as module ID - `scripts/activations/auto-damage.js:9`, `scripts/activations/auto-struct.js:13`
- **Variant:** Uses MODULE constant as module ID - `scripts/Battelog/telemetry-store.js:18`
- **Variant:** Uses ReactionManager.ID as module ID - `scripts/activations/reaction-manager.js:230`

### `game.modules.get` - 246 sites in 67 files

- **Concept:** Look up an installed Foundry module object to check its active state or access its API
- **House form:** game.modules.get(<id>)?.<property>
- **Worth a rule:** yes
- **Recommendation:** Always use game.modules.get(<id>)?.<property>; game.modules is guaranteed to exist by the time any module code runs so the ?. on game.modules (site 1) is unnecessary noise, and the bare .api access (site 8) risks a runtime error if the module is absent.
- **Variant:** game.modules?.get(...) — optional-chains game.modules itself before calling get - `scripts/Battelog/telemetry-store.js:154`
- **Variant:** game.modules.get(...).api — accesses .api without optional chaining on the result - `scripts/bonuses/duration-widget.js:58`

### `game.settings.register` - 230 sites in 29 files

- **Concept:** Register a Foundry VTT module setting with game.settings.register
- **House form:** game.settings.register(MODULE_ID, KEY, { ... })
- **Worth a rule:** yes
- **Recommendation:** Always pass the module ID through a constant (prefer MODULE_ID); replace the three literal 'lancer-automations' strings in canvas-helpers.js, advancedMeasure.js, and settings-register.js with the imported constant.
- **Variant:** Module ID passed as a named constant (MODULE_ID, MODULE, MODULE_NAMESPACE, ReactionManager.ID, NEWS_MODULE_ID) - `scripts/activations/reaction-manager.js:162`, `scripts/combat/speed-provider.js:55`, `scripts/fx/statusFX.js:257`, `scripts/movement/elevation.js:23`, `scripts/movement/history.js:218`, `scripts/movement/tactical-distance.js:521`, `scripts/movement/terrain-trigger-waypoints.js:465`, `scripts/movement/token-ruler.js:1338`, `scripts/movement/vision-throttle.js:41`, `scripts/seasonal/annual.js:618`, `scripts/seasonal/sound.js:40`, `scripts/setup/iso-settings.js:91`, `scripts/setup/migrations.js:81`, `scripts/setup/news.js:597`, `scripts/setup/telemetry.js:239`
- **Variant:** Module ID hard-coded as the string literal 'lancer-automations' - `scripts/interactive/canvas-helpers.js:174`, `scripts/interactive/tools/advancedMeasure.js:1002`, `scripts/setup/settings-register.js:41`

### `canvas.tokens.get` - 146 sites in 43 files

- **Concept:** Look up a PlaceableToken on the canvas by its ID
- **House form:** canvas.tokens.get(id)
- **Worth a rule:** yes
- **Recommendation:** Always use canvas.tokens.get(id); drop the ?. on canvas.tokens — canvas is always defined when these code paths run, so the optional chain is misleading noise.
- **Variant:** canvas.tokens?.get(id) — optional-chains canvas.tokens before calling get - `scripts/Battelog/state-capture.js:47`, `scripts/Battelog/telemetry-store.js:165`
- **Variant:** canvas.tokens.get(id) — calls get directly with no guard on canvas.tokens - `scripts/activations/damage-target-button.js:140`, `scripts/activations/flow-steps-extra.js:93`, `scripts/activations/flow-steps.js:63`, `scripts/activations/reactions-engine.js:1757`, `scripts/activations/reactions-registry.js:470`, `scripts/activations/reactions-ui.js:651`, `scripts/activations/statroll-target-button.js:120`, `scripts/bonuses/duration-widget.js:60`, `scripts/bonuses/effectManager.js:68`, `scripts/bonuses/flagged-effects.js:176`, `scripts/bonuses/genericBonuses.js:106`, `scripts/combat/action-limits.js:216`, `scripts/combat/actor-change-hooks.js:46`, `scripts/combat/grapple.js:44`, `scripts/combat/overwatch.js:221`, `scripts/combat/reinforcement.js:121`

### `ui.notifications.info` - 129 sites in 46 files

- **Concept:** Display an informational toast notification to the user
- **House form:** ui.notifications.info(...)
- **Worth a rule:** yes
- **Recommendation:** Always use `ui.notifications.info(...)` without optional chaining; `ui` and `ui.notifications` are guaranteed to exist in Foundry's runtime environment
- **Variant:** ui.notifications?.info(...) — optional chaining on notifications - `scripts/Battelog/telemetry-debug.js:196`

### `ui.notifications.error` - 107 sites in 24 files

- **Concept:** Display an error notification toast to the user via Foundry's UI notification system
- **House form:** ui.notifications.error(message)
- **Worth a rule:** yes
- **Recommendation:** Standardize on ui.notifications.error(...) without optional chaining; ui.notifications is always present after Foundry initializes and the optional chaining is unnecessary noise that silently swallows errors if the object is somehow absent.
- **Variant:** ui.notifications.error(...) — direct property access, no optional chaining - `scripts/Battelog/share-image.js:313`, `scripts/activations/flow-steps.js:524`, `scripts/activations/reaction-export-import.js:75`, `scripts/activations/reaction-manager.js:628`, `scripts/activations/reaction-reset.js:63`, `scripts/activations/workshop-browser.js:411`, `scripts/alt-struct/alt-struct-helpers.js:38`, `scripts/alt-struct/structure.js:771`, `scripts/bonuses/effectManager.js:2511`, `scripts/bonuses/flagged-effects.js:181`, `scripts/interactive/action-overlays.js:75`, `scripts/interactive/combat.js:1355`, `scripts/interactive/deployables.js:79`
- **Variant:** ui.notifications?.error(...) — optional chaining on notifications - `scripts/alt-struct/index.js:249`, `scripts/bonuses/infection.js:220`, `scripts/setup/lancer-modif.js:594`, `scripts/setup/settingsMenus.js:2004`, `scripts/tah/tokenStatBar.js:3459`
- **Variant:** return ui.notifications.error(...) — result is returned (used as early-return value) - `scripts/bonuses/flagged-effects.js:181`

### `game.settings.set` - 83 sites in 20 files

- **Concept:** Persist a Foundry settings value for a given namespace/key
- **House form:** await game.settings.set(namespace, key, value)
- **Worth a rule:** yes
- **Recommendation:** Always await game.settings.set; add a lint rule or grep check for bare (non-awaited) game.settings.set calls.
- **Variant:** game.settings.set(…) without await - `scripts/setup/version-check.js:129`

### `game.socket.emit` - 54 sites in 27 files

- **Concept:** Send a module-scoped socket message to other clients carrying an action discriminator and payload
- **House form:** game.socket.emit('module.lancer-automations', { action: '<name>', ... })
- **Worth a rule:** yes
- **Recommendation:** Always use the literal 'module.lancer-automations' as the first argument; the CHANNEL alias in presence.js should be inlined or verified to equal the same constant, and the bare 'reload' emit is a different Foundry mechanism and should stay clearly separated from module socket traffic.
- **Variant:** Channel passed as a variable (CHANNEL) instead of the literal string 'module.lancer-automations' - `scripts/interactive/presence.js:62`
- **Variant:** Completely different emit: game.socket.emit('reload') with no module channel or action payload - `scripts/fx/statusFX.js:241`

### `canvas.app.ticker.remove` - 38 sites in 11 files

- **Concept:** Remove a ticker callback from the PIXI application's ticker loop
- **House form:** canvas.app.ticker.remove(fn)
- **Worth a rule:** yes
- **Recommendation:** Standardise on canvas.app?.ticker?.remove(fn) (optional chaining only, no explicit guard) to safely handle teardown during canvas destruction without the noise of separate if-statements
- **Variant:** canvas.app.ticker.remove(fn) — raw, no guard (majority) - `scripts/interactive/canvas-helpers.js:259`, `scripts/interactive/movement-reach-highlight.js:174`, `scripts/interactive/shape-placement-engine.js:117`, `scripts/interactive/target-shapes.js:51`, `scripts/interactive/tools/advancedMeasure.js:175`, `scripts/interactive/tools/chooseToken.js:354`, `scripts/interactive/tools/haseContest.js:90`, `scripts/tah/tokenStatBar.js:1737`, `scripts/interactive/canvas-helpers.js:365`, `scripts/interactive/movement-reach-highlight.js:196`, `scripts/interactive/shape-placement-engine.js:224`, `scripts/interactive/target-shapes.js:246`, `scripts/interactive/tools/advancedMeasure.js:233`, `scripts/interactive/tools/chooseToken.js:355`, `scripts/interactive/tools/haseContest.js:133`
- **Variant:** canvas.app?.ticker?.remove(fn) — optional chaining on app and ticker - `scripts/main.js:1026`
- **Variant:** canvas?.app?.ticker?.remove(fn) — optional chaining on canvas, app, and ticker - `scripts/movement/tactical-distance.js:127`
- **Variant:** if (_tickerFn && canvas?.app?.ticker) canvas.app.ticker.remove(fn) — explicit if-guard before raw call - `scripts/vision/sightlines.js:137`

### `canvas.app.ticker.add` - 30 sites in 14 files

- **Concept:** Register a per-frame ticker callback with the PIXI application ticker
- **House form:** canvas.app.ticker.add(fn)
- **Worth a rule:** yes
- **Recommendation:** Always use canvas.app.ticker.add(fn); the single optional-chaining outlier in scripts/main.js:1022 should be normalised to match the rest of the project.
- **Variant:** canvas.app?.ticker?.add(fn) — optional chaining on app and ticker - `scripts/main.js:1022`

### `canvas.stage.addChild` - 28 sites in 14 files

- **Concept:** Add a PIXI display object to the canvas stage
- **House form:** canvas.stage.addChild(x).eventMode = 'none'
- **Worth a rule:** yes
- **Recommendation:** Always set eventMode = 'none' on the object before calling addChild (separate statement), so every addChild call is uniform and the intent is explicit regardless of whether the return value is used
- **Variant:** addChild result used only to set eventMode = 'none' - `scripts/interactive/deployables.js:3146`, `scripts/interactive/shape-placement-engine.js:307`, `scripts/interactive/target-shapes.js:43`, `scripts/interactive/tools/advancedMeasure.js:1388`, `scripts/interactive/tools/chooseToken.js:216`, `scripts/interactive/tools/haseContest.js:85`, `scripts/interactive/tools/moveTokenRuler.js:334`, `scripts/interactive/tools/pickAreaTargetToggle.js:106`, `scripts/interactive/tools/placeToken.js:253`, `scripts/interactive/shape-placement-engine.js:313`, `scripts/interactive/target-shapes.js:45`, `scripts/interactive/tools/chooseToken.js:292`
- **Variant:** addChild called without setting eventMode (result discarded or unused) - `scripts/combat/grid-helpers.js:776`, `scripts/interactive/canvas-helpers.js:273`, `scripts/interactive/tools/pickSingleTargetToggle.js:58`, `scripts/vision/lancerDetectionModes.js:1256`, `scripts/vision/sightlines.js:69`, `scripts/interactive/canvas-helpers.js:281`
- **Variant:** eventMode set on the object before addChild instead of on the return value - `scripts/interactive/canvas-helpers.js:281`

### `game.actors.get` - 26 sites in 12 files

- **Concept:** Look up an actor from the world actor collection by ID
- **House form:** game.actors.get(id)
- **Worth a rule:** yes
- **Recommendation:** Standardise on game.actors.get(id) everywhere; game.actors is always present during active play so the optional chain on the collection itself adds noise without safety benefit
- **Variant:** game.actors?.get(id) — optional-chains game.actors before calling .get - `scripts/Battelog/combat-telemetry-derive.js:1016`, `scripts/Battelog/damage-capture.js:20`, `scripts/Battelog/recap.js:1121`, `scripts/tah/tokenStatBar.js:3947`, `scripts/Battelog/recap.js:1487`

### `game.lancer.flows.get` - 25 sites in 9 files

- **Concept:** Retrieve a registered Lancer flow class by name from the global flows registry
- **House form:** game.lancer?.flows?.get(name)
- **Worth a rule:** yes
- **Recommendation:** Always use game.lancer?.flows?.get(name) with optional chaining; the bare form is an inconsistency that can throw at startup before lancer is ready
- **Variant:** game.lancer.flows.get(name) — no optional chaining, crashes if game.lancer or flows is undefined - `scripts/activations/reactions-engine.js:572`, `scripts/tools/misc-tools.js:553`, `startups/itemActivations.js:3627`, `scripts/tah/hud.js:3309`, `scripts/tools/misc-tools.js:978`, `scripts/tah/hud.js:3310`

### `foundry.utils.mergeObject` - 25 sites in 14 files

- **Concept:** Deep-merges two objects, optionally without mutating the first argument
- **House form:** foundry.utils.mergeObject(target, source) — two-arg, no options, result used directly or assigned
- **Worth a rule:** yes
- **Recommendation:** Standardise to { inplace: false } whenever the first argument is a reusable default object (sites 8, 12, 17 are at risk of mutating their base on repeated calls); the super.defaultOptions and `|| {}` groups are fine as-is.
- **Variant:** Two-arg, no options — super.defaultOptions pattern (return value used, first arg is freshly created each call so mutation is harmless) - `scripts/activations/reaction-export-import.js:10`, `scripts/activations/reaction-manager.js:2056`, `scripts/activations/reaction-reset.js:9`, `scripts/fx/statusFX.js:136`, `scripts/setup/settings-onboarding.js:920`, `scripts/setup/settingsMenus.js:1702`, `scripts/tools/downtime-item.js:38`, `scripts/activations/reaction-export-import.js:32`
- **Variant:** Two-arg, no options — first arg is `x || {}` or a live state property, result assigned back to same property (intentional in-place mutation or throwaway {}) - `scripts/activations/flow-steps.js:533`, `scripts/activations/flows.js:125`, `scripts/activations/reactions-engine.js:580`, `scripts/tools/misc-tools.js:674`, `scripts/tools/misc-tools.js:1019`
- **Variant:** Two-arg, no options — first arg is a named default/config object that may be reused; mutation of the source default is a latent bug - `scripts/interactive/tools/placeToken.js:379`, `scripts/tools/aura.js:173`, `scripts/tools/misc-tools.js:1016`
- **Variant:** Three-arg with { inplace: false } — explicitly guards the default object from mutation - `scripts/tah/tokenStatBar.js:826`, `scripts/tah/tokenStatBar.js:1044`

### `foundry.utils.deepClone` - 22 sites in 9 files

- **Concept:** Deep-clone a value before mutating or passing it
- **House form:** foundry.utils.deepClone(value)
- **Worth a rule:** yes
- **Recommendation:** Remove the _clone wrapper in reroll.js and call foundry.utils.deepClone directly; the fallback guard is unnecessary since the module already requires Foundry to be loaded.
- **Variant:** Direct call: foundry.utils.deepClone(value) - `scripts/activations/reaction-manager.js:801`, `scripts/bonuses/effectManager.js:2869`, `scripts/interactive/extras-dialog.js:926`, `scripts/interactive/tools/placeToken.js:380`, `scripts/setup/tmac-presets.js:89`, `scripts/tah/tokenStatBar.js:951`, `scripts/tools/aura.js:109`, `startups/personalStuff.js:61`, `scripts/activations/reaction-manager.js:802`, `scripts/bonuses/effectManager.js:2882`, `scripts/interactive/extras-dialog.js:941`, `scripts/tah/tokenStatBar.js:992`, `scripts/activations/reaction-manager.js:1734`, `scripts/tah/tokenStatBar.js:1042`, `scripts/activations/reaction-manager.js:1735`, `scripts/tah/tokenStatBar.js:1062`, `scripts/activations/reaction-manager.js:1751`
- **Variant:** Local wrapper _clone(value) with JSON.parse/stringify fallback guarding on typeof foundry?.utils?.deepClone - `scripts/activations/reroll.js:5`

### `canvas.tokens.placeables.find` - 20 sites in 12 files

- **Concept:** Search the canvas token placeables array for a matching token
- **House form:** canvas.tokens.placeables.find(...)
- **Worth a rule:** yes
- **Recommendation:** Use canvas.tokens.placeables.find(...) everywhere; site 1 should drop the optional chaining to match the other 17 call sites
- **Variant:** canvas.tokens?.placeables?.find(...) — optional chaining on canvas.tokens and placeables - `scripts/activations/reactions-engine.js:40`

### `canvas.grid.getCenterPoint` - 18 sites in 8 files

- **Concept:** Get the pixel-space center point of a grid cell
- **House form:** canvas.grid.getCenterPoint(offset) called directly, result used without guard
- **Worth a rule:** yes
- **Recommendation:** Remove the existence guard in scripts/main.js:308 and call canvas.grid.getCenterPoint directly, matching every other call site; the guard implies an older Foundry compat shim that is no longer needed if the rest of the codebase assumes the method exists.
- **Variant:** Existence-guarded ternary: canvas.grid.getCenterPoint ? canvas.grid.getCenterPoint({x,y}) : fallback - `scripts/main.js:308`

### `game.users.get` - 16 sites in 5 files

- **Concept:** Look up a User document by ID from the global users collection
- **House form:** game.users.get(id)
- **Worth a rule:** yes
- **Recommendation:** Always use game.users.get(id) without optional-chaining game.users; the collection is always present when the game is initialized, so the ?. on site 1 is unnecessary and inconsistent.
- **Variant:** game.users?.get(id) — optional-chains the collection itself - `scripts/Battelog/telemetry-store.js:111`

### `.update` - 16 sites in 6 files

- **Concept:** Update a Foundry document (or subsystem) with new data
- **House form:** await doc.update({ ... }) inside an async function, sometimes with /** @type {any} */ cast on the argument or receiver
- **Worth a rule:** no
- **Recommendation:** The non-awaited sites are legitimately inside sync callbacks and cannot be awaited; site 2 is a different API entirely — no harmonisation needed, but consider excluding canvas.perception.update from any future lint rule that targets document .update calls.
- **Variant:** Not awaited — fire-and-forget inside a synchronous event callback (onClick / onValueChanged) - `scripts/tah/hud.js:2881`, `scripts/tah/hud.js:3402`, `scripts/tah/hud.js:3416`
- **Variant:** canvas.perception.update — completely different subsystem (perception layer), not a Foundry document update - `scripts/movement/vision-throttle.js:34`

### `game.keybindings.register` - 14 sites in 7 files

- **Concept:** Register a rebindable keybinding for the module
- **House form:** game.keybindings.register(MODULE_ID, key, { … })
- **Worth a rule:** yes
- **Recommendation:** Standardise on MODULE_ID as the first argument everywhere; replace both MODULE and the inline string literal 'lancer-automations' with MODULE_ID.
- **Variant:** First arg is the constant MODULE_ID - `scripts/interactive/keybindings.js:27`, `scripts/movement/keybindings.js:65`, `scripts/movement/movement-wheel.js:126`, `scripts/tah/action-wheel.js:186`, `scripts/tah/status-wheel.js:385`, `scripts/interactive/keybindings.js:34`, `scripts/movement/keybindings.js:81`, `scripts/movement/keybindings.js:97`
- **Variant:** First arg is the constant MODULE (different name for the same value) - `scripts/tah/index.js:108`, `scripts/tah/index.js:122`, `scripts/tah/index.js:136`
- **Variant:** First arg is the raw string literal 'lancer-automations' - `scripts/main.js:569`, `scripts/main.js:586`, `scripts/main.js:591`

### `canvas.scene.createEmbeddedDocuments` - 11 sites in 6 files

- **Concept:** Create embedded documents (tokens, templates, lights, tiles) on the current scene
- **House form:** const [doc] = await canvas.scene.createEmbeddedDocuments("Type", [data])
- **Worth a rule:** yes
- **Recommendation:** Always await and destructure the result as `const [doc] = await canvas.scene.createEmbeddedDocuments("Type", [data])` using double quotes; sites 5, 7, 8, 10 drop the result silently which hides bugs, and quote style should be unified to double quotes
- **Variant:** Result ignored (no await, no destructure) - `scripts/tools/wreck.js:598`
- **Variant:** await but result not captured - `scripts/tools/wreck.js:668`, `scripts/tools/wreck.js:728`, `scripts/tools/wreck.js:779`
- **Variant:** Single quotes instead of double quotes for document type - `scripts/tools/wreck.js:598`, `startups/itemActivations.js:4643`, `scripts/tools/wreck.js:668`, `scripts/tools/wreck.js:728`, `scripts/tools/wreck.js:732`, `scripts/tools/wreck.js:779`, `scripts/tools/wreck.js:783`

### `.setFlag` - 11 sites in 5 files

- **Concept:** Persist a named flag value on a Foundry document (user, token, effect)
- **House form:** await <doc>.setFlag(MODULE_ID, FLAG_CONSTANT, value)
- **Worth a rule:** yes
- **Recommendation:** Replace all hardcoded 'lancer-automations' namespace strings with the MODULE_ID constant to match the dominant pattern
- **Variant:** Uses MODULE_ID constant for the namespace - `scripts/setup/settingsMenus.js:477`, `scripts/tah/favorites.js:51`, `scripts/tah/tokenStatBar.js:980`, `scripts/setup/settingsMenus.js:478`, `scripts/tah/tokenStatBar.js:1009`, `scripts/tah/tokenStatBar.js:1050`, `scripts/tah/tokenStatBar.js:1075`, `scripts/tah/tokenStatBar.js:1096`, `scripts/tah/tokenStatBar.js:1129`
- **Variant:** Uses hardcoded string 'lancer-automations' for the namespace - `scripts/tah/hud.js:3054`, `startups/itemActivations.js:1378`

### `foundry.utils.hasProperty` - 9 sites in 4 files

- **Concept:** Check whether a dot-notation property path exists on a changes/update object
- **House form:** foundry.utils.hasProperty(changes, '...')
- **Worth a rule:** yes
- **Recommendation:** Always pass the raw argument without null-coalescing (let the caller guard upstream if needed), and standardise the parameter name to 'changes'; null-coalescing inside the call silently hides missing-data bugs and the singular 'change' is likely a copy-paste inconsistency
- **Variant:** foundry.utils.hasProperty(changes ?? {}, '...') — null-coalesces the first argument before passing it - `scripts/integrations/alt-sheets-flags.js:129`, `scripts/integrations/alt-sheets-flags.js:191`, `scripts/tah/tokenStatBar.js:4025`
- **Variant:** foundry.utils.hasProperty(change, '...') — uses singular 'change' instead of 'changes' - `scripts/tah/tokenStatBar.js:4182`, `scripts/tah/tokenStatBar.js:4199`

### `game.packs.get` - 8 sites in 5 files

- **Concept:** Retrieve a compendium pack by ID from the global pack collection
- **House form:** game.packs.get(id) with immediate null-check
- **Worth a rule:** yes
- **Recommendation:** Use game.packs.get(id) (no optional chaining) and always assign to a variable with an explicit null-check; reserve inline ?? fallback only for re-fetch-after-configure patterns already present in lancer-modif.js
- **Variant:** Optional chaining: game.packs?.get(...) - `scripts/activations/flow-steps-extra.js:274`
- **Variant:** Nullish coalesce fallback without null-check (used inline in expression) - `scripts/setup/lancer-modif.js:1153`, `scripts/setup/lancer-modif.js:1184`

### `game.lancer.flowSteps.get` - 8 sites in 5 files

- **Concept:** Retrieve a registered flow step function by name from the Lancer API
- **House form:** game.lancer?.flowSteps?.get(...)
- **Worth a rule:** yes
- **Recommendation:** Standardise on game.lancer?.flowSteps?.get(...) throughout; sites 1 and 5 drop all optional chaining (crash risk), and sites 3/7/8 omit it on game.lancer (partial guard).
- **Variant:** game.lancer.flowSteps.get(...) — no optional chaining on either game.lancer or flowSteps - `scripts/activations/flows.js:45`, `scripts/tools/auto-focus.js:152`
- **Variant:** game.lancer?.flowSteps?.get(...) — optional chaining on both game.lancer and flowSteps - `scripts/activations/reroll.js:366`, `scripts/bonuses/infection.js:305`, `scripts/activations/reroll.js:372`
- **Variant:** game.lancer.flowSteps?.get(...) — optional chaining only on flowSteps, not on game.lancer - `scripts/alt-struct/structure.js:166`, `scripts/alt-struct/structure.js:174`, `scripts/alt-struct/structure.js:178`

### `canvas.animatePan` - 8 sites in 7 files

- **Concept:** Pan the canvas to a token's position with optional animation duration
- **House form:** canvas.animatePan({ x: token.center.x, y: token.center.y, duration: N })
- **Worth a rule:** yes
- **Recommendation:** Always call canvas.animatePan({ x: token.center.x, y: token.center.y, duration: N }) with an explicit duration; never pass a Point object directly or use token.x/token.y
- **Variant:** passes full object with x, y, duration - `scripts/activations/reactions-ui.js:655`, `scripts/combat/overwatch.js:292`, `scripts/tools/auto-focus.js:71`, `scripts/tools/misc-tools.js:1710`, `scripts/uplink/panel.js:292`
- **Variant:** passes object with x, y but no duration - `scripts/interactive/tools/advancedMeasure.js:1998`
- **Variant:** passes token.center directly (no wrapping object) - `scripts/interactive/cards.js:548`, `scripts/interactive/cards.js:555`
- **Variant:** uses token.x/token.y instead of token.center.x/token.center.y - `scripts/combat/overwatch.js:292`

## Consistent (19)

- `Hooks.on` x341 - Register a Foundry hook listener with an event name and callback
- `ui.notifications.warn` x173 - Display a warning toast notification to the user
- `.render` x77 - Open/show a Foundry VTT application or dialog window
- `Hooks.once` x51 - Register a one-time handler for a Foundry lifecycle hook (init/setup/ready/custom)
- `foundry.utils.randomID` x36 - Generate a random unique ID string
- `foundry.utils.getProperty` x36 - Read a nested property from an object by dot-path string
- `Hooks.off` x30 - Deregisters a previously registered Foundry hook by name and handler reference or numeric ID
- `Hooks.callAll` x30 - Fire a named hook event with optional payload arguments
- `game.i18n.localize` x26 - Translate a dot-notation i18n key (or plain string) into the current-locale label
- `.getFlag` x23 - Read a Foundry document flag by module-id and key
- `game.settings.settings.get` x19 - Look up a registered Foundry setting object (metadata) by its namespaced key
- `canvas.tokens.placeables.filter` x18 - Filter the list of placed tokens on the canvas by some predicate
- `canvas.grid.getOffset` x17 - Convert a canvas pixel coordinate to a grid offset (row/col) object
- `foundry.utils.setProperty` x15 - Set a nested property on a plain object by dot-path string
- `canvas.scene.tokens.get` x14 - Look up a TokenDocument from the current scene by ID
- `canvas.stage.on` x13 - Register a listener on the PIXI stage for pointer/click events
- `CONFIG.statusEffects.find` x13 - Look up a status effect entry from the global registry by id (or occasionally by name)
- `canvas.stage.off` x9 - Removes a previously registered PIXI event listener from the canvas stage
- `game.lancer.flowSteps.set` x8 - Register a named async step function into the lancer flow steps registry
