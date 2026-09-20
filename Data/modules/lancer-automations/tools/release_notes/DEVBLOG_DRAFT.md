# v4.3.1 - Dev Blog (draft)

## Movement Gets a Full Overhaul
The movement system has been basically rebuilt from the ground up. Tokens now understand **surfaces**: when you walk across Terrain Height Tools terrain, your mech snaps to the correct elevation automatically using a new solid-band collision model. Two elevation modes let you choose how this works: **Ground** mode (walk on surfaces, climb up and down terrain) and **Hold** mode (maintain altitude, used by flying). Press **Z** mid-drag to swap between them, with on-screen feedback so you always know which mode you're in.

On top of that, **wall collision blocking** is now part of the movement system. Walls respect height bands, one-way doors, and open doors, so you can't just ruler-walk through a closed bulkhead anymore. And token movement now **animates per grid cell** instead of jumping between waypoints, so you actually see the mech step through each square on its path.

## 17 New Visual Effect Filters (and 12 New Status Effects)
This is the flashy one. The custom TokenMagic filter library went from 2 filters to **19**, each with its own GLSL shader. Highlights include Fracture (glowing Voronoi cracks), ChromaRot (chroma-decay signal glitch), Open Seams (armor plates pulling apart with glowing seams), Thermal Split (writhing heat cracks), Tracking Ghost (converging targeting duplicates), Vent Column (rising heat shimmer), Ricochet Lip (incoming fire sparking off armor), and Guiding Light (directional key light with a gleam sweep).

These filters power a huge expansion of **status condition visuals**. 12 new status effects (Impaired, Vulnerable, Lock On, Aided, Resist All, Phasing, Overheated, Reactor Meltdown, Prone, Bolstered, Shut Down and Disengage) now have dedicated looks. Existing effects got upgrades too: Danger Zone now shows a vent column, Overshield pulses with a double shell, Exposed cracks with thermal splits, and Shredded/Stripped use irregular shatter seams.

## Token Ground Shadows
Elevated tokens now cast a **ground shadow** onto the terrain below them. The shadow grows larger and blurs more the higher the token is, giving everyone at the table an instant visual read on elevation. Shadow direction syncs with Terrain Height Tools' sun angle when available. Three new settings let you dial in the throw distance and opacity.

## Vision and Detection Upgrades
A new **peek-range limit** for trig-based vision means tokens can no longer see over short walls from the other side of the map. If a wall is shorter than your eye height, you can see past it up close, but that advantage fades with distance. The new `lancerLosPeekRange` setting controls the falloff.

**Battlefield Awareness** now has three visual styles: Translucent (the new default), Silhouette (solid black), and Outline-only (just the contour). GMs can pick the one that fits their table's aesthetic.

Vision From Edge now **defers expensive rebuilds** while you're dragging or animating tokens, only recalculating once movement finishes. Combined with inlined LOS raycasting and other V8-friendly optimizations, sensor-heavy scenes should feel noticeably smoother.

## Token Action HUD Portraits
The TAH can now display a **portrait image** above the name band. Configure it at the world level (token art, actor art, or off) and override per-token with a custom image. Mechs can optionally pull their pilot's portrait instead. Scale is adjustable.

## Workshop Browser: Likes, Stats, and Search
The Workshop Browser now tracks **community likes and install counts** backed by Supabase. You can like/unlike entries, see how popular packs are, and a new **search bar** lets you filter the entire workshop by name, LID, or contributor. Finding and picking community content just got a lot faster.

## Immunity and Resistance Filters Actually Work Now
This is a big fix. Immunity and resistance bonuses were **ignoring their condition filters**: per-weapon gates, per-target conditions, roll-type restrictions, and item LID filters were all being skipped. That's fixed. Filtered resistances are no longer permanently baked onto actors, and deferred resistance consumption now syncs across clients via socket so everyone stays consistent. The Effect Manager UI also got smarter, showing only the filter fields relevant to each immunity subtype.

## Full Internationalization (i18n)
Every single user-facing string in the module has been moved to localization keys. The setup wizard, the settings panel, the Token Action HUD, the Battle Log, the reaction editor, scan tools, combat dialogs, status tooltips, notifications... all of it. Community translators can now localize the entire module. This was a massive effort touching nearly every file in the codebase.

The settings configuration window also got structural improvements: a new Terrain Height Tools shortcuts tab, new performance toggles, core Foundry performance shortcuts, and long setting labels now scroll on hover instead of getting clipped.

---

### Smaller stuff
- **Battlefield Awareness style setting** with Translucent, Silhouette, and Outline-only options
- **Drag-suppress origin sources** option prevents doubled lighting/vision when dragging tokens
- **Occlusion dim deferral** holds dim updates until token movement finishes, reducing flicker
- Terrain-trigger waypoints now attempt to route through unreachable waypoints instead of ignoring them
- Move-token ruler wall blocking is now elevation-aware
- Waypoint labels show the active elevation mode icon
- Movement-type cycling mid-drag now uses Foundry core's Tab key with audio and floating label feedback
- Token height utilities with squad and vehicle awareness for wall-height integration
- `executeItemActivation` API now supports talent rank actions and bond powers by path
- Isometric settings changed from per-client to world-scoped (GM-controlled)
- Hex-grid token LOS sample points now stay stable during animation
- Battle Log awards, recap screen, intro terminal, share card, and GM card are all now translatable
- Status tooltip no longer shows raw localization keys instead of translated descriptions
- Compatibility checks added for Isometric Perspective waypoint labels, Grapejuice iso, and THT LoS conflicts
