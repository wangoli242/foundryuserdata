# v4.3.1

## Features

- 17 TokenMagic filters: ChromaRot, Open Seams, Tracking Ghost, SeamBeat, Double Shell, Vent Column, Guiding Light, Ablative Crust, No Drift, ShatterSeams, Thermal Split, SlicePlane, Overflow Wrap, Error Correction, Cold Soak, RicochetLip, Convection Churn
- Status visuals for Impaired, Vulnerable, Lock On, Aided, Resist All, Phasing, Overheated, Reactor Meltdown, Prone, Bolstered, Shut Down, Disengage. Reworked Danger Zone, Overshield, Exposed, Shredded, Slowed
- Ground and Hold elevation modes, Z swaps them mid-drag
- Wall collision in movement, with wall height, one-way walls and doors
- Ground shadows under elevated tokens
- Portrait art above the Token Action HUD name band
- Workshop Browser: likes, install counts, search
- LoS peek range
- Battlefield Awareness styles: Translucent, Silhouette, Outline-only
- Per-cell movement animation
- Resting-surface and solid-band collision through THT terrain
- Option to suppress the dragged token's own light and vision during preview
- Elevation mode badge on waypoint labels
- Token height utilities
- `executeItemActivation` reaches talent rank actions and bond powers
- Extra actions can be granted to another actor, removed when the source is deleted
- Extra actions take a `condition` gate
- `consumeAction`, `gainAction`, `modifyAction` on the API
- Bastion Rotary Grenade Launcher: Quick "Assisted Reload" for adjacent allies
- Bastion Heavy Assault Shield: Hull save or Prone on hit
- Aura `function` macros take a `scope`, `api` inside them is always this module's api
- `api.helpers` tree, `registerUserHelper` accepts constants
- LaSossis GAA fork stores aura function macros as native inline-code macros

## Improvements

- Full i18n pass
- Vision From Edge defers rebuilds during drag and animation
- LOS raycast optimizations, hex-grid animation stability
- Effect Manager immunity filters only show fields for the subtype
- Immunity announcements name their source
- Elevation tracking runs off resting surfaces
- Reachability respects walls at the token's elevation
- Terrain-trigger waypoints route through unreachable waypoints
- Move-token ruler wall blocking is elevation-aware and respects the movement action
- Movement-type cycling mid-drag uses core's Tab
- Occlusion dim deferral during movement, configurable
- Deferred resistance consumption syncs over socket
- Waypoint labels carry the elevation mode, pathfinding indicator only with the setting on
- Settings window: THT shortcuts tab, vision settings, core performance shortcuts
- Isometric settings are world-scoped
- Compatibility checks for Isometric Perspective, Grapejuice iso mode and THT LoS measurement
- Config panel scrolls long setting names on hover

## Fixes

- Immunity and resistance bonuses ignored their condition filters
- Status tooltips showed raw localization keys
- Edge-vision sample positions during previews and animation
- Isometric waypoint label position under Grape Juice
- Item extra actions on NPC features ignored action locks
- Same-named extra actions from two sources collided
- `sendMessageToReactor` typings missing options and return value
- Stat roll with a token target kept earlier targets
- Stat roll routed to a player lost its token target
- Damage flow re-targeted while a save HUD was open
- Aura function macros lost outer variables after reload
- Unlinked token with a `burrow` status hung the client on reload

## Removals

- Range Pulse Grid Line Opacity setting

## Documentation

- Immunity bonus filters per subtype, reversed role semantics
- Immunity filtering helpers, updated immunity signatures
- Granted actions and the `condition` gate
- Action economy helpers in the Items API
- Dropped unused `mech` and `pilot` from the `ExtraAction` table
