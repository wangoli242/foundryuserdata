export class CustomStatusManager extends FormApplication
{
    constructor(actor)
    {
        super(actor, {});
        this.actor = actor;
    }

    static get defaultOptions()
    {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "custom-status-manager",
            title: "Custom Status Manager",
            template: "modules/temporary-custom-statuses/templates/manager.html",
            width: 400,
            height: "auto",
            classes: ["temp-custom-status"]
        });
    }

    getData()
    {
        // Filter effects that have our custom flag
        const effects = this.actor.effects.filter(e => e.getFlag("temporary-custom-statuses", "isCustom"));

        // Prepare effects data for display
        const effectList = effects.map(e =>
        {
            return {
                id: e.id,
                name: e.name,
                img: e.img,
                stack: e.getFlag("temporary-custom-statuses", "stack") || 1
            };
        });

        // Get default icon from settings
        const defaultIcon = game.settings.get("temporary-custom-statuses", "defaultIcon");

        // Get saved statuses
        const savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];

        return {
            effects: effectList,
            actor: this.actor,
            defaultIcon: defaultIcon,
            savedStatuses: savedStatuses
        };
    }

    async _updateObject(event, formData)
    {
        // This is called when the form is submitted (Add Status)
        if (!formData.statusName || !formData.statusIcon)
            return;

        // Save to settings if requested
        if (formData.saveStatus)
        {
            const savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];

            // Avoid duplicates by name
            const exists = savedStatuses.find(s => s.name === formData.statusName);
            if (!exists)
            {
                savedStatuses.push({
                    name: formData.statusName,
                    icon: formData.statusIcon
                });
                await game.settings.set("temporary-custom-statuses", "savedStatuses", savedStatuses);
            }
            else
            {
                // Update icon if it exists? Optional. Let's update it.
                exists.icon = formData.statusIcon;
                await game.settings.set("temporary-custom-statuses", "savedStatuses", savedStatuses);
            }
        }

        // Use the API to add the status (handles stacking)
        await game.modules.get("temporary-custom-statuses").api.addStatus(
            this.actor,
            formData.statusName,
            formData.statusIcon,
            parseInt(formData.initialStack) || 1
        );

        // Re-render to show updated list
        this.render(true);
    }

    activateListeners(html)
    {
        super.activateListeners(html);

        // Delete handlers
        html.find(".status-delete").click(this._onDeleteStatus.bind(this));

        // Stack handlers
        html.find(".status-plus").click(this._onIncreaseStack.bind(this));
        html.find(".status-minus").click(this._onDecreaseStack.bind(this));

        // Saved Status Handlers
        html.find("#savedStatusSelect").change(this._onSelectSavedStatus.bind(this));
    }

    async _onDeleteStatus(event)
    {
        event.preventDefault();
        const effectId = event.currentTarget.dataset.id;
        await game.modules.get("temporary-custom-statuses").api.removeStatus(this.actor, effectId);
        this.render(true);
    }

    async _onIncreaseStack(event)
    {
        event.preventDefault();
        const effectId = event.currentTarget.dataset.id;
        await game.modules.get("temporary-custom-statuses").api.modifyStack(this.actor, effectId, 1);
        this.render(true);
    }

    async _onDecreaseStack(event)
    {
        event.preventDefault();
        const effectId = event.currentTarget.dataset.id;
        await game.modules.get("temporary-custom-statuses").api.modifyStack(this.actor, effectId, -1);
        this.render(true);
    }

    _onSelectSavedStatus(event)
    {
        event.preventDefault();
        const selectedName = event.currentTarget.value;
        if (!selectedName)
            return;

        const savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];
        const status = savedStatuses.find(s => s.name === selectedName);

        if (status)
        {
            this.form.statusName.value = status.name;
            this.form.statusIcon.value = status.icon;

            // Also update the filepicker input if possible, or usually just setting the input value is enough
            // visual feedback for the user
        }
    }
}
