export class CustomStatusConfig extends FormApplication
{
    static get defaultOptions()
    {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Custom Status Configuration",
            id: "custom-status-config",
            template: "modules/temporary-custom-statuses/templates/config.html",
            width: 500,
            height: "auto",
            classes: ["temp-custom-status-config"],
            closeOnSubmit: false,
            submitOnChange: false
        });
    }

    getData()
    {
        const savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];
        return {
            savedStatuses: savedStatuses,
            defaultIcon: "icons/svg/mystery-man.svg"
        };
    }

    activateListeners(html)
    {
        super.activateListeners(html);

        html.find(".config-delete").click(this._onDeleteStatus.bind(this));
        html.find("#add-status-btn").click(this._onAddStatus.bind(this));
    }

    async _onDeleteStatus(event)
    {
        event.preventDefault();
        const nameToDelete = event.currentTarget.dataset.name;

        let savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];
        savedStatuses = savedStatuses.filter(s => s.name !== nameToDelete);

        await game.settings.set("temporary-custom-statuses", "savedStatuses", savedStatuses);
        this.render(true);
    }

    async _onAddStatus(event)
    {
        event.preventDefault();
        const nameInput = this.element.find("input[name='newName']");
        const iconInput = this.element.find("input[name='newIcon']");

        const name = nameInput.val();
        const icon = iconInput.val();

        if (!name || !icon)
        {
            ui.notifications.warn("Please provide both a Name and an Icon path.");
            return;
        }

        let savedStatuses = game.settings.get("temporary-custom-statuses", "savedStatuses") || [];

        // Check duplicate
        if (savedStatuses.find(s => s.name === name))
        {
            ui.notifications.warn(`Status "${name}" already exists.`);
            return;
        }

        savedStatuses.push({ name, icon });
        await game.settings.set("temporary-custom-statuses", "savedStatuses", savedStatuses);

        // Clear inputs
        nameInput.val("");

        this.render(true);
    }

    async _updateObject(event, formData)
    {
        // We handle updates immediately via listeners, so this might be empty
        // or used if we had other settings here.
    }
}
