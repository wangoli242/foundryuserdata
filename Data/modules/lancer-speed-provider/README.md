# Lancer Ruler Integration

[![Please don't upload to GitHub](https://nogithub.codeberg.page/badge.svg)](https://nogithub.codeberg.page)

Integration of LANCER's rules with the Foundry's drag ruler and terrain
feature.  It provides custom coloring for tokens different range increments and
tracks conditions and actor types to ensure that the range increments shown are
correct.

## Features

 * Highlights the spaces a token passes through with aconfigurable colors to show what type of movement action is required to reach that space.
 * Tracks whether a unit is allowed to overcharge to determine whether to show the third range band (Overcharge + Boost)
 * Checks for Immobilized, Stunned, Shutdown, or Down and Out and shows no available movement if any of those conditions are active.
 * Checks for Slowed and Prone and only shows the standard Move range band in that case
 * If a unit is prone, the crawl action becomes the default.
 * Tracks if a unit started their turn prone and if so, only shows boost options if the unit stood up.
 * If a unit is flying (has the flying condition), the fly action becomes the default.  This technically allows for aerial terrain so have fun.
 * Tracks several sources of terrain immunity and makes the ignore terrain default if they are detected.
 * If a unit heads north it makes a Pan flag.

## Installation

Search for “Lancer Ruler Integration” or “Lancer Speed Provider” on the foundry module browser.
