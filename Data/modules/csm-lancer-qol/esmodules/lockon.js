/* global CONFIG, game, canvas, ui */

import { log } from "./log.js";

export async function setLockOn(idList) {
    log('setLockOn');
    const lockOnEffect = CONFIG.statusEffects.find(x => x.id === 'lockon');
    const effect = {
        changes: [],
        duration: {
            startTime: 1,
            seconds: 1
        },
        icon: lockOnEffect.icon, //v11
        img: lockOnEffect.img,
        name: game.i18n.localize(lockOnEffect.name),
        statuses: [
            'lockon'
        ]
    };
    for (const id of idList) {
        const token = canvas.tokens.placeables.find(x => x.id === id);
        if (game.users.activeGM.isSelf) {
            if (!token.actor.statuses.has(lockOnEffect.id)) {
                // The token doesn't have Lock On
                await token.actor.createEmbeddedDocuments("ActiveEffect", [effect]);
            } else {
                // The token does have Lock On
                await token.actor.deleteEmbeddedDocuments("ActiveEffect", [token.actor.effects.find(i => i.name === effect.name)._id]);
            }
        }
    }
}

export async function pushLockOn(targets) {
    // This code will be replaced with the pushEffectByPlayers code
    ui.notifications.warn('This macro has been updated. Please update your "Lock On" macro from the Lancer QoL Compendiums!');
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
            log(`Local setLockOn ${idList}`);
            await setLockOn(idList);
        } else {
            // You are a user, ask a GM to do it.
            log(`Pushing setLockOn ${idList}`);
            game.socket.emit('module.csm-lancer-qol', { action: "setLockOn", payload: idList });
        }
    }
    return targets;
}
