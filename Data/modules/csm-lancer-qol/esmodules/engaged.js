/* global CanvasAnimation, Ray, CONFIG, game */

import { log } from "./log.js";

function tokenDistance(t1, t2) {
    log('--tokenDistance--');
    log(`Compare ${t1.document.name}'s distance to ${t2.document.name}.`);
    const spaces1 = t1.getOccupiedSpaces();
    const spaces2 = t2.getOccupiedSpaces();
    const rays = spaces1.flatMap(s => spaces2.map(t => ({ ray: new Ray(s, t) })));
    return (Math.min(...game.canvas.grid.measureDistances(rays, { gridSpaces: true })));
}

// Given a token, are there any other tokens that would cause
// that token to be considered `engaged`? In short, we contruct
// an array of rays between the spaces occupied by two tokens.
// If any of them are very close (distance 1), we say they are
// engaged. For gridless, we find the diagonal distance from
// opposite corners, divide that in half to get a pseudo-radius
// of occupation, then compare that plus the other token's
// pseudo-radius of occupation, and if they overlap, they are
// engaged.
function isEngaged(token) {
    log('--isEngaged--');
    let engagedList = [];
    game.canvas.tokens.placeables.forEach((tik) => {
        log(`Looping over token ${tik.name}`);
        if (!tik.actor) {
            log('Ignore actorless token.');
            return;
        }
        if (token.document._id === tik.document._id) { // It's us
            log('Ignore ourselves.');
            return;
        }
        if (token.document.hidden || tik.document.hidden) { // Either of us is Foundry Hidden
            log('Ignore hidden.');
            return;
        }
        if (token.actor.type === 'deployable' || tik.actor.type === 'deployable') { // Deployables cannot be engaged or cause engagement
            log('Ignore deployable.');
            return;
        }
        if (token.document.disposition === tik.document.disposition) { // We're on the same team
            log('Ignore same disposition.');
            return;
        }
        if (token.actor.type === 'mech' && tik.actor.type === 'pilot') { // Pilots to not cause a mech to be engaged
            log('Ignore pilots when I am mech.');
            return;
        }
        if (token.actor.type === 'npc' && tik.actor.type === 'pilot') { // Pilots to not cause an npc to be engaged
            log('Ignore pilots when I am mech.');
            return;
        }
        if (token.actor.system.structure?.value === 0 || tik.actor.system.structure.value === 0) { // Dead/wrecked tokens cannot be engaged or cause engagement
            log('Ignore dead mechs.');
            return;
        }
        let distance = tokenDistance(token, tik);
        log(`Distance: ${distance}`);
        if (game.canvas.grid.type === 0) { // We're gridless
            // Calculate a radius for each token
            const tokenMaxRadius = Math.sqrt(Math.pow(token.document.width, 2) + Math.pow(token.document.height, 2));
            const tikMaxRadius = Math.sqrt(Math.pow(tik.document.width, 2) + Math.pow(tik.document.height, 2));
            const threshold = tokenMaxRadius * 0.5 + tikMaxRadius * 0.5;
            log(`Threshold: ${threshold}`);
            if (distance <= threshold) { // We're close and gridless
                log('We are close!');
                engagedList.push({ "id": tik.document._id, "distance": distance });
            }
        } else { // We're not gridless
            if (distance < 1.1) { // We're close and not gridless
                log('We are close!');
                engagedList.push({ "id": tik.document._id, "distance": distance });
            }
        }
    });
    log(engagedList);
    if (engagedList.length > 0) {
        return true;
    } else {
        return false;
    };
}

async function engageToken(token) {
    log('--engageToken--');
    if (isEngaged(token)) {
        await token.actor.toggleStatusEffect('engaged', { active: true });
    } else {
        await token.actor.toggleStatusEffect('engaged', { active: false });
    }
}

export async function engageHook(document, change, options, userId) {
    if (game.settings.get('csm-lancer-qol', 'enableEngageAutomation') && game.users.activeGM.isSelf) {
        log(change);
        if (change.x || change.y) {
            if (game.version >= 13) {
                await document.object.movementAnimationPromise;
            } else {
                await CanvasAnimation.getAnimation(document.object.animationName)?.promise;
            }
            game.canvas.tokens.placeables.forEach(async (t) => {
                if (t.actor) {
                    await engageToken(t);
                } else {
                    log(`${t.name} has no attached actor!`);
                }
            })
        }
    }
}
