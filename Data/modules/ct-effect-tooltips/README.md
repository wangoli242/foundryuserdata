# FoundryVTT | Combat Tracker Effect Tooltips
![](https://img.shields.io/badge/Foundry-v11-informational)
![GitHub Latest Version](https://img.shields.io/github/v/release/dor-fvtt-released-modules/combat-tracker-effect-tooltips?sort=semver)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fct-effect-tooltips&colorB=4aa94a)

![GitHub All Releases](https://img.shields.io/github/downloads/dor-fvtt-released-modules/combat-tracker-effect-tooltips/module.zip)
![Latest Release Download Count](https://img.shields.io/github/downloads/dor-fvtt-released-modules/combat-tracker-effect-tooltips/latest/module.zip)

This simple module for FoundryVTT adds tooltips to the effect icons shown on combatants in the combat tracker.

![Preview](https://raw.githubusercontent.com/dor-fvtt-released-modules/combat-tracker-effect-tooltips/master/preview-v11.png)

### Duplicate Icons
By default, if multiple Active Effects share the same icon Foundry will only display that icon once in the Combat Tracker. This module will add a tooltip that lists all effects that use that icon.

In this version, however, I've added a 'Duplicate Icons' setting. If enabled, the module will attempt to instead duplicate the icon in the combat tracker so that each effect has its own icon (and tooltip). This has gotten relatively little testing, and almost certainly will cause issues with some game system or module or something. If that happens, just disable the setting and file a bug - I'll try to fix it.


## Credit
This is a fork of [the original](https://github.com/schultzcole/FVTT-Combat-Tracker-Effects-Tooltips) by [Cole Schultz](https://github.com/schultzcole) - thanks to him for this useful little module.

## License

Licensed under the GPLv3 License (see [LICENSE](LICENSE)).
