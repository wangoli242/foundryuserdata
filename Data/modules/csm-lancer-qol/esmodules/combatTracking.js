/* global CONFIG, canvas, game, Dialog, ChatMessage, ui */

import { log } from "./log.js";

export function pushFlaggedEffect(targetID, effect, duration, note, originID) {
    if (game.users.filter(x => x.role === 4 && x.active).length < 1) {
        log('There is no active GM.');
        return ui.notifications.error('There must be an active GM for this to work.');
    }
    // If it's the current originator's turn, uncrease duration turns by one
    // This avoid the effect ending immediately
    if (game.combat.current.tokenId === originID) {
        duration.turns += 1;
    }
    if (game.user.isGM) {
        // You are a GM, let's just set it.
        log(`Local setFlaggedEffect ${effect}`);
        setFlaggedEffect(targetID, effect, duration, note, originID);
    } else {
        // You are a user, ask a GM to do it.
        log(`Pushing setFlaggedEffect ${effect}`);
        game.socket.emit('module.csm-lancer-qol', { action: "setFlaggedEffect", payload: { targetID, effect, duration, note, originID } });
    }
}

export async function setFlaggedEffect(targetID, effect, duration, note, originID) {
    log('**setFlaggedEffect**');
    const statusEffect = CONFIG.statusEffects.find(x => x.name === effect);
    const target = canvas.tokens.placeables.find(x => x.id === targetID);
    let effectData = {
        name: game.i18n.localize(statusEffect.name),
        img: statusEffect.img,
        description: statusEffect.description,
        id: statusEffect.id,
        statuses: [
            statusEffect.id
        ],
        "duration.turns": duration.turns,
        flags: {
            'csm-lancer-qol': {
                targetID: targetID,
                effect: statusEffect.name,
                duration: duration, // Only turns are used, and only set to 1
                note: note,
                originID: originID,
                appliedRound: game.combat.round // Not used
            }
        },
        changes: []
    };
    log(statusEffect);
    log(effectData);
    await target.actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

// The target is the first locked on token, or the selected token.
// The origin is the first locked on token, or the selected token.
export function setTimedEffect(token) {
    log('--setTimedEffect--');
    if (!game.settings.get('csm-lancer-qol','effectsTimer')) return ui.notifications.error('The Effects Timer setting is not enabled in the LANCER QoL setting!')
    if (!token) return ui.notifications.error('Token not found!');
    if (!game.combat) return ui.notifications.error('You are not in combat!');

    let durations = [
        {
            label: 'end',
            turns: 1,
            rounds: 0
        },
        {
            label: 'start',
            turns: 1,
            rounds: 0
        }
    ]

    let targetID = token.id;
    if (game.user.targets.size > 0) {
        targetID = game.user.targets.first().document._id;
    }

    new Dialog({
        title: "Set a Timed Effect",
        content: `
            <form>
                <div class="form-group">
                    Apply&nbsp;
                    <select id="effect" name="effect">
                        ${CONFIG.statusEffects.map(o => `<option value="${o.name}">${game.i18n.localize(o.name)}</option>`)}
                    </select>
                    &nbsp;to&nbsp;
                    <select id="targetID" name="targetID">
                        ${canvas.tokens.placeables.map(n => `<option ${n.id == targetID ? 'selected' : ''} value="${n.id}">${n.name}</option>`)}
                    </select>
                </div>
                <div class="form-group">
                    until the&nbsp;
                    <select id="duration" name="duration">
                        ${durations.map(p => `<option value="${p.label}">${p.label}</option>`)}
                    </select>
                    &nbsp;of&nbsp;
                    <select id="originID" name="originID">
                        ${canvas.tokens.placeables.map(n => `<option ${n.id == targetID ? 'selected' : ''} value="${n.id}">${n.name}</option>`)}
                    </select>
                    's next turn.
                </div>
                <hr>
                <div class="form-group">
                    <label>Note:</label>
                    <input id="note" name="note" type="text" value="">
                </div>
            </form>
            <hr>
        `,
        buttons: {
            ok: {
                label: "OK",
                callback: async (html) => {
                    let targetID = html.find('[name=targetID]')[0].value;
                    let effect = html.find('[name=effect]')[0].value;
                    let duration = durations.find(x => x.label === html.find('[name=duration]')[0].value);
                    let note = html.find('[name=note]')[0].value;
                    let originID = html.find('[name=originID]')[0].value;
                    log(`TargetID selected: ${targetID}`);
                    log(`Effect selected: ${effect}`);
                    log(`Duration selected: ${duration.label} Turns: ${duration.turns} Rounds: ${duration.rounds}`);
                    log(`Note entered: ${note}`);
                    log(`OriginID selected: ${originID}`);
                    pushFlaggedEffect(targetID, effect, duration, note, originID);
                }
            },
            cancel: {
                label: "Cancel",
                callback: async (html) => {
                    log(html);
                    log('setTimedEffect canceled.');
                }
            }
        }
    }).render(true);
}

function effectsReport(token) {
    log('**effectsReport**');
    // Let's gather the effects on other tokens for which we are an originator
    const otherTokens = game.canvas.tokens.placeables.filter(
        t => t.actor.effects.filter(
            e => e.getFlag('csm-lancer-qol', 'originID') == token.id
        ).length > 0 && t.id != token.id);
    log(otherTokens);
    // Our local effects
    const effects = token.actor.effects.filter(x => x.disabled === false);
    log(effects);
    let html = ``;
    if (effects.length > 0) {
        html += `<h3>Effects on ${token.name}</h3>`;
        html += '<ul>';
        for (let m = 0; m < effects.length; m++) {
            let note = effects[m].getFlag('csm-lancer-qol', 'note');
            let duration = effects[m].getFlag('csm-lancer-qol', 'duration');
            let originID = effects[m].getFlag('csm-lancer-qol', 'originID');
            html += `<li>${effects[m].name}`;
            if (duration) {
                let originator = game.canvas.tokens.placeables.find(x => x.id === originID).name;
                html += ` until the ${duration.label} of ${originator}'s turn`;
            }
            if (note) {
                html += `<br>- <i>${note}</i>`;
            }
        }
        html += '</ul>';
    }
    if (otherTokens.length > 0) {
        html += `<h3>${token.name}'s effects on ...</h3>`;
        html += '<ul>';
        for (let m = 0; m < otherTokens.length; m++) {
            let newEffects = otherTokens[m].actor.effects.filter(x => x.getFlag('csm-lancer-qol', 'originID') == token.id);
            html += `<li>${otherTokens[m].name}`;
            html += '<ul>';
            for (let n = 0; n < newEffects.length; n++) {
                let note = newEffects[n].getFlag('csm-lancer-qol', 'note');
                let duration = newEffects[n].getFlag('csm-lancer-qol', 'duration');
                if (note) {
                    html += `<li>${newEffects[n].name} until the ${duration.label} of ${token.name}'s turn <br>- <i>${note}</i>`;
                } else {
                    html += `<li>${newEffects[n].name} until the ${duration.label} of ${token.name}'s turn`;
                }
            }
            html += '</ul>';
        }
        html += '</ul>';
    }
    if (html) {
        ChatMessage.create({
            user: game.userId,
            content: html
        });
    }
}

// Start of Turn
// At the start of any combatants turn, loop over all effects of all combatants
// and if our token at the moment is the originator, process the effects and
// possibly remove it.
async function startOfTurn(token) {
    log(`---- Start of ${token.name}'s turn ----`);
    let tokens = [];
    for (let i = 0; i < game.combat.combatants.contents.length; i++) {
        tokens.push(game.combat.combatants.contents[i].tokenId);
    }
    for (let j = 0; j < tokens.length; j++) {
        let reviewToken = canvas.tokens.placeables.find(x => x.id === tokens[j]);
        if (reviewToken) {
            log(`-- Review ${reviewToken.name}'s effects --`);
            let effects = reviewToken.actor.getEmbeddedCollection("ActiveEffect");
            for (let m = 0; m < effects.contents.length; m++) {
                let effect = effects.contents[m];
                log(`Effect: ${effect.name}`);
                if (typeof effect.getFlag('csm-lancer-qol', 'duration') !== 'undefined') {
                    // Process effect
                    if (effect.getFlag('csm-lancer-qol', 'duration.label').includes('start') &&
                        effect.getFlag('csm-lancer-qol', 'originID') === token.document._id) {
                        log(`We should update event ${effect.name} on ${token.name}`);
                        let turns = effect.getFlag('csm-lancer-qol', 'duration.turns');
                        if (turns > 0) {
                            turns--;
                            await effect.setFlag('csm-lancer-qol', 'duration.turns', turns);
                        } else {
                            log(`${effect.name} is at ${turns} turns already.`);
                        }
                    }
                } else {
                    log(`${effect.name} on ${reviewToken.name} is not a timed effect.`);
                }
            }
            let removeIds = reviewToken.actor.effects.filter(x =>
                x.getFlag('csm-lancer-qol', 'duration.turns') <= 0 &&
                x.getFlag('csm-lancer-qol', 'duration.rounds') <= 0 &&
                x.getFlag('csm-lancer-qol', 'duration.label').includes('start')
            );
            for (let n = 0; n < removeIds.length; n++) {
                await reviewToken.actor.deleteEmbeddedDocuments("ActiveEffect", [removeIds[n]._id]);
            }
        }
    }
}

// End of Turn
// At the end of any combatants turn, loop over all effects of all combatants
// and if our token at the moment is the originator, process the effects and
// possibly remove it.
async function endOfTurn(token) {
    log(`---- End of ${token.name}'s turn ----`);
    let tokens = [];
    for (let i = 0; i < game.combat.combatants.contents.length; i++) {
        tokens.push(game.combat.combatants.contents[i].tokenId);
    }
    for (let j = 0; j < tokens.length; j++) {
        let reviewToken = canvas.tokens.placeables.find(x => x.id === tokens[j]);
        if (reviewToken) {
            log(`-- Review ${reviewToken.name}'s effects --`);
            let effects = reviewToken.actor.getEmbeddedCollection("ActiveEffect");
            for (let m = 0; m < effects.contents.length; m++) {
                let effect = effects.contents[m];
                log(`Effect: ${effect.name}`);
                if (typeof effect.getFlag('csm-lancer-qol', 'duration') !== 'undefined') {
                    // Process effect
                    if (effect.getFlag('csm-lancer-qol', 'duration.label').includes('end') &&
                        effect.getFlag('csm-lancer-qol', 'originID') === token.document._id) {
                        log(`We should update event ${effect.name} on ${token.name}`);
                        let turns = effect.getFlag('csm-lancer-qol', 'duration.turns');
                        if (turns > 0) {
                            turns--;
                            await effect.setFlag('csm-lancer-qol', 'duration.turns', turns);
                        } else {
                            log(`${effect.name} is at ${turns} turns already.`);
                        }
                    }
                } else {
                    log(`${effect.name} on ${reviewToken.name} is not a timed effect.`);
                }
            }
            let removeIds = reviewToken.actor.effects.filter(x =>
                x.getFlag('csm-lancer-qol', 'duration.turns') <= 0 &&
                x.getFlag('csm-lancer-qol', 'duration.rounds') <= 0 &&
                x.getFlag('csm-lancer-qol', 'duration.label').includes('end')
            );
            for (let n = 0; n < removeIds.length; n++) {
                await reviewToken.actor.deleteEmbeddedDocuments("ActiveEffect", [removeIds[n]._id]);
            }
        }
    }
}

// End of a Round
// 1. Decrement all effect round counters by 1
async function endOfRound(combat) {
    log('--endOfRound--');
    let tokens = [];
    for (let i = 0; i < combat.combatants.contents.length; i++) {
        const tokenId = combat.combatants.contents[i].tokenId;
        if (tokenId) {
            tokens.push(tokenId);
        }
    }
    for (let j = 0; j < tokens.length; j++) {
        let token = canvas.tokens.placeables.find(x => x.id === tokens[j]);
        let effects = token.actor.getEmbeddedCollection("ActiveEffect");
        for (let m = 0; m < effects.contents.length; m++) {
            let effect = effects.contents[m];
            if (typeof effect.getFlag('csm-lancer-qol', 'duration') !== 'undefined') {
                let rounds = effect.getFlag('csm-lancer-qol', 'duration.rounds');
                if (rounds > 0) {
                    rounds--;
                    await effect.setFlag('csm-lancer-qol', 'duration.rounds', rounds);
                } else {
                    log(`${effect.name} is at ${rounds} rounds already.`);
                }
            } else {
                log(`${effect.name} is not a timed effect.`);
            }
        }
    }
    return tokens;
}

// eslint-disable-next-line no-unused-vars
export function roundReminder(combat, changed, options, user) {
    log('--roundReminder--');
    if (game.users.activeGM.isSelf && game.settings.get('csm-lancer-qol', 'roundReminder') && changed.round) {
        let content = `Round ${changed.round} starts.`;
        ChatMessage.create({
            user: game.user.id,
            content: content
        }, {});
    }
}

// eslint-disable-next-line no-unused-vars
export function combatReminder(combat, changed) {
    log('--combatReminder--');
    if (game.users.activeGM.isSelf && game.settings.get('csm-lancer-qol', 'roundReminder')) {
        let content = `Combat ended.`;
        ChatMessage.create({
            user: game.user.id,
            content: content
        }, {});
    }
}

export async function combatTracking(combat, changed, options, user) {
    if (game.settings.get('csm-lancer-qol', 'effectsTimer')) {
        log('**updateCombat - effectsTimer**');
        // log(combat);
        if (combat.current.combatantId !== null) { // Turn start
            let currentCombatant = combat.combatants.find(x => x._id === combat.current.combatantId);
            let currentActor = game.actors.find(x => x.id === currentCombatant.actorId);
            let currentToken = canvas.tokens.placeables.find(x => x.id === currentCombatant.tokenId);
            // if (currentActor) { log(`Current Turn Actor: ${currentActor.name}`); }
            log(`Current Turn Actor: ${currentActor?.name}`);
            log(`Current Turn Token: ${currentToken?.name}`);
            if (game.users.activeGM.isSelf && currentToken) {
                await startOfTurn(currentToken);
                effectsReport(currentToken);
            }
        }
        if (combat.previous.combatantId !== null) { // Turn end
            let previousCombatant = combat.combatants.find(x => x._id === combat.previous.combatantId);
            let previousActor = game.actors.find(x => x.id === previousCombatant.actorId);
            let previousToken = canvas.tokens.placeables.find(x => x.id === previousCombatant.tokenId);
            log(`Previous Turn Actor: ${previousActor?.name}`);
            log(`Previous Turn Token: ${previousToken?.name}`);
            if (game.users.activeGM.isSelf && previousToken) {
                await endOfTurn(previousToken);
            }
        }
        if (changed.round) {
            log(`ROUND ${changed.round}! FIGHT!`);
            if (game.users.activeGM.isSelf) {
                log(await endOfRound(combat));
            }
        }
        // log(changed);
        log(options);
        log(user);
    }
}
