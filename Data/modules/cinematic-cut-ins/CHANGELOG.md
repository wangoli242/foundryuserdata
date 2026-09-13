# Changelog

## [2.0.4] - 2026-08-25

### Added

- **Playable Preset Integration API**: Scene cut-ins and actor presets are now exposed through the shared integration API. Other modules can discover permission-filtered presets, browse actor and scene groups, and play a selection locally by stable ID.

### Fixed

- **RSReforged Quick Roll Compatibility**: Attack and critical-hit automation now responds to RSReforged Quick Rolls. Promoting an existing roll to a critical runs only the critical trigger, and later card renders do not repeat triggers that have already run.

## [2.0.3] - 2026-08-04

### Added

- **Actor Image Source**: Actor cut-ins and global styles can now use either their saved preset image or the current actor's image. Global style previews and local tests use the selected reference actor.
- **Actor Name Placeholder**: Added an Actor Name button that inserts `{{name}}` into the main text. It is replaced with the current actor's name during playback, including direct API and copied macro playback.
- **Playable Cut-In API**: Added `listPlayablePresets()`, `playPresetLocal()`, `playPresetLocalAndWait()`, and `playPresetInElement()` for module integrations. Integrations can list independent scene cut-ins and actor presets by their saved names, play them by stable ID, wait for playback to finish, or keep a cut-in inside a supplied interface element. Actor preset playback keeps its actor context, text placeholders, and random variations.

### Fixed

- **Blank Global Style Images**: Fixed empty global style image paths being replaced with the default hooded image when the editor was opened. Current Actor Image also remains authoritative over randomized image variations during playback.

## [2.0.2] - 2026-08-02

### Fixed

- **Actor Preset Editing and Turn Triggers**: Fixed loaded personal and global preset edits appearing to revert or being saved over the wrong preset when names matched. Actor automation can now explicitly target Active Config, so turn start and turn end triggers use the actor's current saved edits while personal and global preset choices remain linked to their reusable source.
- **Configuration Draft Preservation**: Controls that refresh the editor no longer discard unsaved preset names, group settings, scene scope, or cut-in changes. Newly saved presets also appear immediately in the preset and trigger selectors.

## [2.0.1] - 2026-07-28

### Added

- **Scene-Specific Automation**: Scene presets can now be limited to one or more Foundry scenes for combat start and combat end automation. Matching scene-specific presets take priority over unrestricted scene presets for that trigger, while scenes without a match continue using the unrestricted presets.
- **Main Text Case**: Added a per-preset "Preserve Main Text Case" option. When enabled, main text keeps its original capitalization in preview and playback instead of being forced to uppercase. Existing presets keep the previous uppercase behavior unless the option is enabled.
- **Movable Cinematic Effects**: Cinematic Effects can now be moved horizontally and vertically and scaled independently in personal cut-ins and All-Out Attacks. The new controls update live previews and playback, while existing presets retain their current appearance with the default position and scale.

## [2.0.0] - 2026-07-11

### Added

- **Preview Direct Movement**: Personal cut-in and All-Out Attack previews now support dragging visible elements to adjust their position directly. Personal cut-ins support character, main/sub text, and custom layers; grabbing empty scene space drags the whole cut-in band via the existing Screen Position sliders, moving only the axes the current theme supports (most themes are vertical-only, Blitz/Stellar/Blank allow both, Slash is horizontal-only). All-Out Attacks support character portraits, participant text, center text, and global layers. Ctrl + mouse wheel over a draggable element adjusts its scale or text size. Manual All-Out panel editing still keeps panel splitting as the active drag behavior while manual mode is enabled.
- **Personal Theme — Blank**: Added a minimal no-graphics cut-in theme that renders on a bare stage with no background panels, decorative lines, paint shapes, or borders. Actor artwork, main/sub text, and custom layers still appear with a simple fade entrance, so it works as a clean base for building your own look with custom layers.
- **Screen Mood Filters**: Personal cut-ins and All-Out Attacks can now apply CSS-based screen mood overlays, including Night, Dusk, Dawn, Flashback, Vignette, and Dream, with an opacity control that appears in preview and playback.
- **Screen Mood Filters — Overlay Effects**: Added Old TV, Lightning, and Monochrome Film as CSS-only screen mood filters, reusing the same opacity control as the existing moods.
- **Cinematic Effects**: Personal cut-ins and All-Out Attacks can now layer one of thirteen short, built-in effects over the scene: Debris Burst, Energy Sparks, Ember Storm, Victory Confetti, Petal Drift, Sparkle Shimmer, Lens Rain, Shockwave, Hero Flare, Film Burn, Blackout Cut, Speed Lines, or Shadow Mist. Each effect supports Low, Medium, and High strength, appears in the live preview, and can be combined with Screen Mood. For personal cut-ins, particles render in front of and behind the character for depth; All-Out Attacks play a shared effect over the whole montage. Everything is built from CSS and generated shapes with no image assets or WebGL renderer. A per-player client setting ("Disable Cinematic Effects for Me") skips the effects on low-end machines while cut-ins keep playing normally.

### Changed

- **Update Notifications via GlitchSmith Library**: Update and announcement notifications now go through the shared GlitchSmith Library notification board instead of the module's own update dialog. The module now requires GlitchSmith Library v0.9.0 or newer, and the "Disable Update Notifications" setting keeps working under the same name.

### Fixed

- **Preview Pause State**: Changing the theme or character image while the personal cut-in preview is paused no longer resumes its animations.

## [1.10.3] - 2026-06-12

### Fixed

- **Cut-In Loading with Large Images**: Cut-ins now wait until their artwork is fully loaded and decoded before the animation starts, so a slow-loading image no longer plays a truncated, half-finished animation. This applies to personal cut-ins, All-Out Attacks, and in-element playback. Very large source images will still take a moment to appear on first play, so resizing oversized art is still recommended.

## [1.10.2] - 2026-05-31

### Fixed

- **Personal Theme - Stellar R/L Character Scale**: Restored the original character scale behavior for Stellar right and left while keeping the mirror fix from v1.10.1.

## [1.10.1] - 2026-05-31

### Fixed

- **Personal Theme - Stellar R/L Mirror**: Fixed Char Adjust mirror so character flip is applied during the Stellar right and left character animations.
- **All-Out Attack - Saved Preset Fonts**: Fixed saved All-Out Attack playback and vote sessions ignoring configured main/sub fonts and bold/italic settings.
- **Personal Themes - Font Selection**: Fixed several personal themes, including Arcane, where main/sub text font rules could override the selected theme font.
- **Midi-QOL Damage Triggers**: Fixed item Dice Check and Advanced Formula triggers not seeing Midi-QOL attack/damage roll dice data because the automation path was matching against the item card instead of the workflow rolls.

## [1.10.0] - 2026-05-17

### Added

- **Personal Theme — Broadcast**: Added a CRT emergency-broadcast style cut-in theme with scanlines, signal interference, warning accents, and broadcast-caption text treatment.
- **All-Out Attack — Per-Participant Ready Image & SFX**: Each participant can now define a custom image and sound that play when they join an All-Out Attack vote.
- **All-Out Attack — Ready Image Adjustments**: Added a compact Base/Ready adjustment switch in the participant editor. Ready images can now use their own zoom, position, scale, rotation, and mirror settings without changing the normal All-Out image setup.
- **All-Out Attack — Manual Panel Layouts**: Added a manual panel editor for All-Out Attacks. You can initialize a layout, split panels directly in the preview, undo the most recent split, choose line assets (Neon Glitch, Black Brush, Soft Black Brush, Rough Black Brush, and clean brush variants), set per-split thickness/tint/glow, and map panels to participants in order. Themes do not force boundary lines, and editor outlines stay outline-only so preview colors remain visible.
- **All-Out Attack — Prismatic Rift Split Line**: Added a new SVG split line asset for manual All-Out panel layouts, with a bright fractured energy core, prism shards, and colored scanline accents.
- **All-Out Attack — Manual Panel Guide Toggle**: Added an editor-only toggle to hide manual panel guide outlines and panel numbers while keeping the selected split line asset visible.
- **Personal Cut-Ins — Hide Character**: Added a visual option to hide the main character image or video in individual cut-ins while keeping the theme background, text, sounds, and layers available.
- **Condition Triggers**: Added actor triggers for ActiveEffect condition apply/remove events, with PF2e condition item support. Conditions can be selected from the system status effect list or entered manually, and matching checks status IDs, core status IDs, slugs, and effect names/labels.
- **Actor Groups - Trigger Inheritance**: Actors can now inherit trigger rules from their group's default global preset at runtime, so group trigger changes apply without copying rules into each actor.
- **Actor Groups - Inherited Trigger Preview**: Actor trigger settings now show inherited group triggers as read-only rows, including the trigger category, detail, target preset, and macro.
- **Actor Groups - Copy Inherited Triggers**: Added a Copy to Actor button for inherited group triggers. Copying moves the current inherited rules into the actor's own trigger list and turns off group trigger inheritance for that actor, so the copied rules can be edited without double-firing.
- **Actor Groups - Trigger Inheritance Opt-Out**: Added an actor-level toggle to disable group trigger inheritance while keeping the actor's group default preset fallback available.
- **Global Preset Triggers - Target Presets**: Global preset trigger rules can now choose a target global preset. Leaving the target empty still falls back to the group's default preset.
- **Actor Trigger Preset Picker**: Actor trigger preset dropdowns now include both actor presets and global presets, so copied group triggers keep their selected targets visible and editable.
- **Text Controls — Independent Offset Mode**: Added an independent text adjustment mode where Main and Sub text offsets can be controlled separately. Existing presets keep their legacy layout behavior, while older presets can opt into the new mode through a conversion button.

### Changed

- **Configuration UI — All-Out Attack Settings**: Reorganized the All-Out Attack settings window into focused tabs for setup, panel editing, text, participants, and layers.
- **Configuration UI — Cut-In Settings**: Reorganized individual cut-in and global style settings into focused tabs for presets, visuals, text, effects, layers, and triggers.
- **New Presets — Independent Text Controls by Default**: Newly created global, scene, and actor presets now use independent text controls by default, making X/Y offsets and size adjustments more predictable across themes.

## [1.9.6] - 2026-05-10

### Added

- **PF2e Critical Success (Check) Trigger**: Added a PF2e-only Chat/Roll trigger for non-attack critical successes, covering skill checks and saving throws without relying on `flavor.includes("Critical Success")`.

### Fixed

- **Update Notifier URL**: Updated the remote update JSON URL from the old redirected GitHub repository to `glitchsmith-updates`.

## [1.9.5] - 2026-04-29

### Fixed

- **Default Spell Preset Not Working**: The "Default Spell Preset" (the fallback cut-in that plays when any spell is cast) was not firing at all. This affected all supported systems — DnD5e, PF2e, PF1e, and Midi-QOL.
- **Default Spell Preset Not Working with Midi-QOL**: Even after the above fix, utility spells (e.g. Light, Shield) with Midi-QOL active were still not triggering the default spell cut-in. Now works correctly in all cases.
- **Item Triggers on Spell Use / Template Placement**: Per-item "On Use" triggers set via the item config were not firing from the `dnd5e.useItem` hook or when placing spell templates (e.g. Fireball area).

## [1.9.4] - 2026-04-21

### Fixed

- **Item Trigger — On Use with midi-qol**: "On Use (Item Card)" trigger now fires correctly for all item types (weapons, spells, equipment, consumables) when midi-qol is active. Previously only consumables worked; equipment and attack/damage items were silently skipped.
- **Item Trigger — Keyword with midi-qol**: Keyword-based triggers (keyword, rollKeyword, diceCheck, formula) now work with midi-qol. The item card message is properly resolved from the midi-qol workflow and passed to the matching engine.

### Changed

- **Control Button Rename**: "CREATE GROUP WITH SELECTED" → "CREATE ALL-OUT WITH SELECTED" to avoid confusion with the actor group system.
- **Actor Trigger — Hide System Hooks when midi-qol active**: "On Attack/Damage/Critical (System)" options are now hidden when midi-qol is active. Only the Midi-specific trigger options are shown, reducing confusion between the two sets. (System hooks were non-functional with midi-qol anyway.)

## [1.9.3] - 2026-04-02

### Changed

- Now supports Foundry VTT V13 and V14.

## [1.9.2] - 2026-04-01

### Fixed

- **CSS Scoping**: Improved internal CSS scoping to prevent potential style conflicts with other modules.

## [1.9.1] - 2026-03-10

### Added

- **Preset Getter API**: Added 6 new public API methods for querying presets programmatically — `getGlobalPresets()`, `getGlobalPreset(nameOrId)`, `getAllOutPresets()`, `getAllOutPreset(nameOrId)`, `getActorPresets(actor)`, `getScenePresets()`. All accept either preset name or ID, and return deep-cloned copies to prevent accidental mutation of stored data.

### Fixed

- **Brush Theme Not Rendering**: The brush theme's `.cinematic-paint` CSS rule (background color, shape, position) was accidentally deleted in v1.9.0. Restored the original rule — brush theme now renders correctly again.
- **Eclipse Theme — Text Shadow Stays Yellow**: Both main and sub text shadows were hardcoded to gold (`rgba(255, 215, 0)`) instead of using the theme color variable. Now correctly follows the user-configured theme color.

## [1.9.0] - 2026-03-06

### Added

- **Personal Theme — Cleave**: New personal cut-in theme with slashing red crack lines that tear across the screen in sequence. Character emerges from darkness with a glowing silhouette, text slams in with screen shake.
- **Personal Theme — Eclipse**: New personal cut-in theme with a celestial eclipse motif. Deep indigo background, golden corona ring, and light rays frame a slow character reveal from total darkness. Designed for dramatic boss entrances.
- **Video Audio Toggle**: Video cut-in images can now play their audio track. Main character has a global toggle; layers have individual per-layer audio toggles (🔊 icon).
- **Video Loop Toggle**: Main character video loop can now be disabled for one-shot animations. Enabled by default — existing presets are unaffected.
- **All-Out Attack — Custom Vote Button Sound**: The voting button click sound can now be customized per preset via an audio file picker. Defaults to the built-in `click.mp3`.

### Fixed

- **Background Dimming Not Working**: The per-actor "Background Dimming" slider (0–100%) was never connected to any visual effect. Now correctly dims the stage background during cut-in playback.
- **Video Resource Leak**: Video elements now properly stop and are removed from DOM when cut-ins end. Previously, looping muted videos continued consuming GPU/CPU in the background.
- **Preview Loop Toggle**: Layer loop checkbox was ignored in preview when the video DOM element was reused. Now properly syncs on every update.

## [1.8.0] - 2026-02-27

### Added

- **Trigger Macro Execution**: All trigger types (Item, Chat/Roll, Turn Start/End, Resource) now have an optional "Macro" selector. When a trigger fires, the selected macro runs alongside the cut-in preset with `{ actor, item, speaker }` context. Macros can be set independently of presets — a trigger can run a macro without playing a cut-in, or both together.
- **All-Out Attack — Horizon Theme**: New "Horizon (Widescreen)" theme with horizontal character strips and gaps showing the game map behind. Strips open and close with a clean blind effect. Characters alternate left/right positioning.
- **Personal Theme — Ink (Splash)**: New personal cut-in theme with an ink splash aesthetic. Two ink splatters hit the screen in sequence with a punchy pop effect, then the character emerges from shadow. Features a sweeping red accent line and bold text animation.
- **All-Out Attack — Add Actor**: Participants can now be added to existing All-Out Attack presets via the new "Add Actor" button. The picker includes ALL/PC/NPC filter tabs and a search box.
- **Preset Export/Import (Zip)**: All preset types (Personal, Global, Scene, All-Out Attack) can now be exported as `.zip` files that bundle referenced images and sounds. Import restores assets to the server and remaps all paths automatically. Legacy `.json` import is still supported for backward compatibility.
- **Separate Sub Text Font**: Main text and sub text can now use different fonts. A new "Sub Text Font" selector appears below the existing font selector in both personal and All-Out Attack config. When unset, defaults to the main font — existing presets are unaffected.
- **Bold & Italic Font Styling**: Main text and sub text can now be individually toggled bold or italic via compact **B** / _I_ buttons next to each font selector, in both personal cut-in and All-Out Attack configuration.

### Fixed

- **All-Out Attack — Window Position**: The config window no longer opens offset to the right of the Control panel. It now opens centered on screen like other windows.
- **Neon Theme — Sub Text Not Visible**: Sub text was invisible in both preview and playback due to a missing `transform: scaleX(1)` override. Also redesigned the sub text styling and animation to match the synthwave aesthetic — now features a neon bar accent, flicker-on entrance, and glitch-out exit.

## [1.7.6] - 2026-02-26

### Fixed

- **Voltage Theme — Text Color Not Changing**: Main text and sub text colors were hardcoded (`#fff`, `#000`) instead of using CSS variables. Now correctly responds to user-configured text color settings.
- **Voltage Theme — Sub Text Clipping**: Increased horizontal padding on the sub text box to prevent text from being clipped at both ends by the parallelogram clip-path.

## [1.7.5] - 2026-02-23

### Added

- **Disable Update Notifications**: Added an option to disable update notification popups. Users can toggle this in module settings, or click "Don't show again" directly from the update dialog.

## [1.7.4] - 2026-02-22

### Fixed

- **V12 Compatibility — DialogV2 Callbacks**: Fixed `dialog.element.querySelector` crash in V12. V12 passes the HTMLElement directly as the 3rd callback argument, while V13 passes the DialogV2 instance. Updated the UpdateNotifier dialog callback to handle both versions.
- **Update Notification Scroll**: Added scrollable container to the update notification dialog so long patch notes no longer overflow the dialog window.

## [1.7.3] - 2026-02-18

### Fixed

- **Dice So Nice Wait — systems without real dice rolls (Daggerheart, etc.)**:
  - Cut-ins no longer get permanently stuck when "Wait for Dice so Nice" is enabled and the chat message contains roll data without actual dice terms (e.g., flat values only).
  - Added real dice detection: only waits for Dice So Nice when the roll contains actual dice (d20, d6, etc.), not just numeric values.
  - Added 8-second timeout safety net: even if Dice So Nice fails to fire, queued cut-ins will still play.

## [1.7.2] - 2026-02-16

**:sparkles: New Features**

- **Expanded API for Element Targeting**: You can now trigger cut-ins by targeting specific DOM elements. This allows for more dynamic and precise visual effects within the UI.
- **Local Play Functionality**: Added a "Play for Self Only" feature. This allows users to trigger cut-ins that are visible only to themselves, perfect for personal UI feedback without distracting other players.

**:bug: Bug Fixes**

- **v12 Image Border Artifacts**: Fixed a CSS rendering issue in Foundry v12 where custom images added to layers would display an unintended border/outline. (Standardized for v13, with improved compatibility for v12).

## [1.7.1] - 2026-02-11

### Fixed

- **Language display in Actors tab (group tools)**:
  - The bulk group controls now follow your Foundry language setting.
  - Labels like **Selected**, **Clear Group**, and **Assign Group to Selected** no longer appear stuck in Korean.
  - Group assignment notifications now also display in your selected language.

## [1.7.0] - 2026-02-08

### Added

- **Audio Only Mode**: Added a new "Audio Only (No Visuals)" option.
  - Plays sound/SFX without displaying any visual elements (no letterbox, no overlay).
  - Useful for triggers that should only provide auditory feedback.
- **All-Out Global Layers**:
  - Added global layer support in All-Out mode.
  - You can add/manage global layers directly in the All-Out configuration.
- **Banner Mask Mode**: Custom layers can now be masked to fit the background container shape (e.g., paint splashes).
  - _Note: Some themes with skewed/rotated backgrounds (e.g., Blitz, Brush) may cause the image to appear tilted._
- **Enhanced Resource Triggers**: Added support for **Custom Max Value** in resource triggers.
  - Allows specifying a static number or property path for the maximum value.
  - Enables support for systems like WoD5e (where max is separate) or custom attributes without standard structure.
- **Actor Groups with Default Preset**:
  - Added group management UI in Global Preset mode.
  - Actors can now be assigned to a group in Actor Config.
  - If a requested preset is missing on an actor, the group's default global preset is used as fallback.
  - Added bulk group assignment from the Control panel for multi-actor workflows.
  - Trigger preset selectors now clearly show when an empty preset will auto-use the actor group's default preset.
  - Group fallback guidance now updates immediately when changing actor group selection (no save/reload needed).

### Fixed

- **Roll Keyword Compatibility (FVTT v13 systems)**:
  - Restored `Keyword (Roll Only)` matching for roll-description-based chat cards.
  - Added support for extracting keywords from roll description/title content sections (including `roll-part-title` and `description-content`).
  - Fixed missing `rollKeyword` handling in the item trigger matching path.
  - Improved `Dice Check` keyword filtering to inspect roll-specific text content more reliably.
- **Image Mask Aspect Ratio**:
  - Fixed custom layer image masks being rendered as square in some cases.
  - Image mask size now enforces intrinsic ratio (`width auto`) to preserve original mask proportions.
- **All-Out Initial Theme Sound Defaults**:
  - Fixed an issue where default sound/SFX values were not auto-filled on first open with the initial `rebel` theme.
  - Theme default audio values now apply immediately on first render when those fields are empty.

## [1.6.2] - 2026-02-07

### Added

- **Permission Control**: Added "Minimum Access Role" setting. GMs can now restrict access to the Control Panel and Configuration buttons to specific user roles.
- **Formula `alias` Variable**: Added `alias` variable to Advanced Formulas for filtering by speaker name (e.g., `alias === "Name"`).

### Improved

- **Formula Triggers**: Advanced Formulas can now trigger on messages without dice rolls (text-only messages).
- **Formula Variables**: Separated `alias` (speaker name) from `flavor` (message text) in formulas for more precise matching.

## [1.6.0] - 2026-02-03

### Improved

- **Unrestricted Character Scaling**: Refactored character scaling logic to use the CSS `scale` property. This allows characters to be resized more freely and supports larger scale values without positioning artifacts or upward shifting.

### Fixed

- **Preview Text Fix**: Resolved an issue where text would disappear in the preview window after testing the "Typewriter" theme.

### Added

- **New Theme: Stellar**
  - High-fidelity tech UI style with diagonal slide animations.
  - Available in Left/Right variants.
- **New Theme: Neon (Retrowave)**
  - Retro-futuristic style with vibrant glow effects.
- **New Theme: Adventure Map (Old Paper)**
  - Parchment style design suitable for quest logs or treasure maps.
  - Features custom dashed path lines and ink-style text effects.
- **Audio Control**
  - Added individual **Voice/BGM Volume** and **SFX Volume** sliders (0-100%) for each cut-in configuration.
  - Allows fine-tuning audio levels per cut-in without affecting global volume.
- **Layer Delay**
  - Added **Start Delay** option for custom layers.
  - Specify delay in seconds (e.g., 0.5s) to sequence visual elements.
  - Fully supported in live preview.

## [1.5.5] - 2026-01-25

**:sparkles: New Features**

- **Dice So Nice Integration:** Added a new setting to **wait for Dice So Nice animations** to finish before playing the Cinematic Cut-in.

## [1.5.3] - 2026-01-22

**:sparkles: Improvements**

- **Expanded Roll Support (HTML/Inline Rolls):** Added native support for systems that embed roll data directly into chat HTML (e.g., 13th Age). The module now successfully detects and processes these inline rolls for triggers.
- **Analysis Dialog:** Updated to correctly parse and display data from these HTML-based rolls, ensuring accurate feedback for setup and debugging.

## [1.5.2.2] - 2026-01-21

**:bug: Bug Fixes**

- **All-Out Attack:** Fixed a critical error that occurred when starting Initiative while the "Combat Link" feature was enabled.

## [1.5.2] - 2026-01-20

**:sparkles: Improvements**

- **Advanced Dice Formula:** Added support for accessing individual roll results in advanced formula triggers. You can now use r[0].total, r[1].total, etc., to distinguish between multiple rolls (e.g., Attack vs Damage) within the same message.

**:bug: Bug Fixes**

- **All-Out Attack Rotation:** Fixed an issue where the character rotation setting was ignored during the animation sequence.
- **Legion Theme Mirroring:** Resolved a bug where the 'Mirror' option was not functioning correctly in the Legion theme's character entry animation.

## [1.5.1] - 2026-01-18

**:sparkles: New Features**

- **PF2e Actor Triggers:** Added deep integration for Pathfinder 2e. You can now select specific hooks—**Attack**, **Damage**, or **Critical**—directly within the Actor Trigger settings.

## [1.5.0] - 2026-01-18

🚀 New Features

📝 New Theme: Typewriter

A pure, text-centric theme perfect for internal monologues or system messages.

Realistic Typing: Text appears character-by-character with a blinking cursor.

Dedicated SFX: Includes a mechanical keyboard sound effect (sfx_typewriter.mp3) that syncs with the animation.

🐉 New Theme: Yakuza

Experience the intense, high-impact style inspired by legendary crime dramas.

Cinematic Finish: Features a clean, impactful layout for boss introductions or dramatic moments.

Dedicated SFX: Includes the signature impact sound (sfx_yakuza.mp3).

Visual Polish: Includes a smooth grayscale fade-out effect for a professional ending.

Font Suggestion: To get the look shown in the preview, you may need to download the Edo SZ font here.

⚔️ Group Assault Enhancements

Dragon Theme: Added a new explosive "Dragon" pop animation for All-Out Attacks.

Speed Multiplier: Adjust the pacing from 0.5x (Slow Motion) to 2.0x (Fast Paced).

Custom Vote Button: Change the "Join" button text to fit your game's UI.

🔊 Audio Improvements

Auto-Stop (Default): Sounds now stop automatically when the cut-in ends to prevent overlapping.

"Keep Playing" Option: Toggle this to let voices or BGM finish playing even after the visual disappears.

💡 Pro Tips & Improvements

Universal Line Breaks: You can now use the <br> tag in any theme to manually control line breaks.
