import { CustomStatusConfig } from "./config.js";
import { CustomStatusManager } from "./manager.js";

Hooks.once("init", () =>
{
    // Register Settings
    game.settings.register("temporary-custom-statuses", "defaultIcon", {
        name: "Default Icon",
        hint: "Path to the default icon used for new custom statuses.",
        scope: "world",
        config: true,
        type: String,
        filePicker: "image",
        default: "icons/svg/mystery-man.svg"
    });

    game.settings.register("temporary-custom-statuses", "enableHud", {
        name: "Enable HUD Button",
        hint: "If checked, a button will be added to the Token HUD to manage statuses.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register("temporary-custom-statuses", "savedStatuses", {
        name: "Saved Statuses",
        scope: "world",
        config: false,
        type: Object,
        default: []
    });

    // Register Menu
    game.settings.registerMenu("temporary-custom-statuses", "statusConfig", {
        name: "Manage Saved Statuses",
        label: "Manage Saved Statuses",
        hint: "Add or remove saved statuses that appear in the HUD.",
        icon: "fas fa-bars",
        type: CustomStatusConfig,
        restricted: true
    });

    // Expose API
    game.modules.get("temporary-custom-statuses").api = CustomStatusAPI;
    game.modules.get("temporary-custom-statuses").CustomStatusManager = CustomStatusManager;
});

Hooks.on("renderTokenHUD", (app, htmlOrEl, data) =>
{
    // Check if HUD button is enabled
    if (!game.settings.get("temporary-custom-statuses", "enableHud"))
        return;

    // Only for GM or trusted users? For now, let's assume valid users.
    if (!game.user.isGM)
        return;

    // v13 ApplicationV2 HUDs pass a raw HTMLElement; v12 passed jQuery. Wrap once.
    const html = htmlOrEl instanceof HTMLElement ? $(htmlOrEl) : htmlOrEl;

    const button = $(`
        <div class="control-icon" title="Custom Status">
            <i class="fas fa-magic"></i>
        </div>
    `);

    button.click((event) =>
    {
        const actor = app.object.actor;
        if (!actor)
            return;
        new CustomStatusManager(actor).render(true);
    });

    html.find(".col.right").append(button);
});

class CustomStatusAPI
{
    /**
     * Adds a custom status to an actor.
     * If the status already exists (by name), it increments the stack count.
     * @param {Actor} actor
     * @param {string} name
     * @param {string} iconPath
     * @param {number} [initialStack=1]
     * @param {Object} [options={}]
     * @param {boolean} [options.forceNew=false] - Skip duplicate check, always create a new instance
     * @param {Object} [options.extraFlags={}] - Extra flags to merge into the effect at creation
     */
    static async addStatus(actor, name, iconPath, initialStack = 1, options = {})
    {
        console.log("CustomStatusAPI.addStatus called", { name, initialStack, options });
        if (!actor)
            return;

        if (!options.forceNew)
        {
            const existingEffect = actor.effects.find(e =>
                e.getFlag("temporary-custom-statuses", "isCustom") &&
                e.getFlag("temporary-custom-statuses", "originalName") === name
            );

            if (existingEffect)
            {
                return this.modifyStack(actor, existingEffect.id, Math.max(1, initialStack));
            }
        }

        // Create New
        const stack = Math.max(1, initialStack);

        const statusId = name.slugify();
        const effectData = {
            name: name,
            img: iconPath,
            // v13 renders token status icons based on the `statuses` Set on the ActiveEffect.
            // v11-era `core.statusId` is kept for backwards-compat with anything that still reads it.
            statuses: [statusId],
            flags: {
                "temporary-custom-statuses": {
                    isCustom: true,
                    originalName: name
                },
                "statuscounter": {
                    value: stack,
                    visible: true
                },
                core: {
                    statusId: statusId
                },
                ...(options.extraFlags || {})
            }
        };
        return actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    }

    /**
     * Modifies the stack count of an existing custom status.
     * @param {Actor} actor
     * @param {string} effectId
     * @param {number} delta (positive to increase, negative to decrease)
     */
    static async modifyStack(actor, effectId, delta)
    {
        const effect = actor.effects.get(effectId);
        if (!effect)
            return;

        // Fallback to old flag if statuscounter not set, but prioritize statuscounter
        const currentStack = effect.getFlag("statuscounter", "value") || effect.getFlag("temporary-custom-statuses", "stack") || 1;

        const newStack = currentStack + delta;

        if (newStack <= 0)
        {
            return effect.delete();
        }

        return effect.update({
            "flags.statuscounter.value": newStack
        });
    }

    /**
     * Removes a custom status from an actor.
     * @param {Actor} actor
     * @param {string} effectId
     */
    static async removeStatus(actor, effectId)
    {
        if (!actor)
            return;
        const effect = actor.effects.get(effectId);
        if (effect)
            return effect.delete();
    }
}

// ... (API class end)


