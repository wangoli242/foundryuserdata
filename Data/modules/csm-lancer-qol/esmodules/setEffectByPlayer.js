/* global CONFIG, game, canvas, ui */

import { log } from "./log.js";

export async function setEffectByPlayer(effectId, idList) {
    log('setEffectByPlayer');
    const statusEffect = CONFIG.statusEffects.find(x => x.id === effectId);
    for (const id of idList) {
        const token = canvas.tokens.placeables.find(x => x.id === id);
        const existingEffect = token.actor.effects.find(i => i.name === game.i18n.localize(statusEffect.name));
        // If the user (us) is the first GM we find
        if (game.users.activeGM.isSelf) {
            if (!existingEffect) {
                // The token doesn't have the effect
                await token.actor.toggleStatusEffect(effectId, {active: true});
            } else {
                // The token does have the effect
                await token.actor.toggleStatusEffect(effectId, {active: false});
            }
        }
    }
}

export async function pushEffectByPlayer(effectId, targets) {
    if (game.users.filter(x => x.role === 4 && x.active).length < 1) {
        log('There is no active GM.');
        return ui.notifications.error('There must be an active GM for this to work.');
    }
    let idList = [];
    targets.forEach(x => idList.push(x.id));
    if (idList.length <= 0) {
        log('No targets selected');
        return ui.notifications.error('You must have at least one target selected!');
    } else {
        if (game.user.isGM) {
            // You are a GM, let's just set it.
            log(`Local setEffectByPlayer ${effectId} ${idList}`);
            setEffectByPlayer(effectId, idList);
        } else {
            // You are a user, ask a GM to do it.
            log(`Pushing setEffectByPlayer ${effectId} ${idList}`);
            game.socket.emit('module.csm-lancer-qol', { action: "setEffectByPlayer", payload: { effectId, idList } });
        }
    }
    return targets;
}
