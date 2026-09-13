function registerSettings() {
    game.settings.register("ct-effect-tooltips", "duplicateIcons", {
        name: `${game.i18n.localize("ct-effect-tooltips.settings.duplicateIcons.name")}`,
        hint: game.i18n.localize("ct-effect-tooltips.settings.duplicateIcons.hint"),
        scope: "world",
        config: true,
        default: false,
        requiresReload: true,
        type: Boolean
    });
}

Hooks.once('init', async () => {
    registerSettings();
});

Hooks.on("renderCombatTracker", (app, html, user) => {
    const duplicateIcons = game.settings.get("ct-effect-tooltips", "duplicateIcons");

    // Find all token effect groups in the combat tracker - there is one for each combatant.
    const tokenEffectGroups = html.find(".token-effects");

    // Iterate through each combatant's token effect group.
    tokenEffectGroups.each((i, group) => {
        // Find all effect icons within the current token effect group.
        const effectIcons = $(group).find(".token-effect");

        // Iterate through each effect icon.
        effectIcons.each((i, icon) => {
            // Get the icon path for the current effect icon.
            const rawPath = icon.getAttribute("src");

            // Find the combatant ID associated with the current effect icon.
            const combatantId = $(icon).closest(".combatant").data("combatant-id");

            // Use the combatant ID to find the associated combatant.
            const combatant = game.combat?.combatants?.get(combatantId);

            // Filter the combatant's active effects to find those with the same icon path.
            const effects = combatant?.actor?.effects?.filter(e => e.icon === rawPath && e.isTemporary && !e.disabled && !e.isSuppressed);

            // If there are any matching effects...
            if (effects && effects.length > 0) {
                // If the duplicateIcons setting is true and there are multiple effects with the same icon...
                if (duplicateIcons && effects.length > 1) {
                    // Iterate through the effects, starting from the second effect.
                    effects.slice(1).forEach((effect) => {
                        // Clone the current effect icon.
                        const newIcon = $(icon).clone();

                        // Set the title of the new icon to the current effect's name or label.
                        newIcon.attr("data-tooltip", effect.name);

                        // Insert the new icon after the original icon.
                        let index = effect.parent.effects.contents.findIndex((e) => (e.name === effect.name))
                        const targetIcons = $(group).find(".token-effect");
                        if (index >= targetIcons.length) {
                            targetIcons.last().after(newIcon);
                        } else {
                            const targetIcon = targetIcons.eq(index);
                            targetIcon.before(newIcon);
                        }
                    });

                    // Set the title of the original icon to the first effect's name or label.
                    $(icon).attr("data-tooltip", effects[0].name);
                } else {
                    // Map the effects to an array of labels (either effect names or labels).
                    const labels = effects.map(e => e.name);

                    // Join the labels with a newline character and set the icon's title attribute.
                    $(icon).attr("data-tooltip", labels.join('<br>'));
                }
            }
        });
    });
});





