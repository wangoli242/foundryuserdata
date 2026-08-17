# Macro Guide: Temporary Custom Statuses

You can add or manage custom statuses using the module's API. This is useful for macros or integration with other systems.

## API Access

The API is available at `game.modules.get("temporary-custom-statuses").api`.

## Methods

### `addStatus(actor, name, iconPath)`

Adds a new custom status to the actor. If a custom status with the same name already exists, it increments its stack count instead.

- **actor**: The Actor document (e.g., `token.actor`).
- **name**: The name of the status (e.g., "Frozen").
- **iconPath**: The path to the icon image (e.g., "icons/svg/frozen.svg").

**Example:**
```javascript
const api = game.modules.get("temporary-custom-statuses").api;
await api.addStatus(token.actor, "Frozen", "icons/svg/frozen.svg");
```

### `modifyStack(actor, effectId, delta)`

Modifies the stack count of an existing custom status.

- **actor**: The Actor document.
- **effectId**: The ID of the ActiveEffect to modify.
- **delta**: The amount to change the stack by (e.g., `1` for increase, `-1` for decrease).

**Example:**
```javascript
// Usually you'd find the effect ID first, but here is the concept
const api = game.modules.get("temporary-custom-statuses").api;
const effect = token.actor.effects.find(e => e.label === "Frozen (x2)");
if (effect) {
    await api.modifyStack(token.actor, effect.id, 1);
}
```

### `removeStatus(actor, effectId)`

Removes the status completely.

## Example Macro: Toggle "Bleeding"

This macro will add a "Bleeding" status to the selected token. If run again, it stacks.

```javascript
/* Add Bleeding Status */
const api = game.modules.get("temporary-custom-statuses").api;

if (!token) {
    ui.notifications.warn("Please select a token first.");
} else {
    // You can customize the name and icon here
    const name = "Bleeding";
    const icon = "icons/svg/blood.svg";
    
    await api.addStatus(token.actor, name, icon);
    ui.notifications.info(`Applied ${name} to ${token.name}`);
}
```
