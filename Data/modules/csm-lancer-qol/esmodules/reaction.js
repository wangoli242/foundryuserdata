/*global game, Dialog, ChatMessage */

import { log } from "./log.js";

function getReactionsOnMech(mech) { // Get all the items/systems from an Actor that have tags
    let response = [];

    // Get reactions from systems
    const items = mech.items.filter(x => typeof x.system.tags != 'undefined');
    // For each item, check if it is tagged as a reaction and add it to the results
    for (let i = 0; i < items.length; i++) {
        let itemType = items[i].type;
        log(itemType);
        if (itemType === 'talent') {
            let talentRanks = items[i].system.ranks;
            for (const rank of talentRanks) {
                let actions = rank.actions;
                for (const action of actions) {
                    log(action.name);
                }
            }
        }
        let itemTags = items[i].system.tags;
        for (let j = 0; j < itemTags.length; j++) {
            if (itemTags[j].lid === 'tg_reaction') {
                log(itemTags[j]);
                response.push(items[i].name);
            }
        }
    }

    // If the mech is linked, the pilot might have reactions
    let pilot = game.actors.find(x => x.id === mech.system.pilot?.value._id);
    if (typeof pilot !== 'undefined') {
        return response.concat(getReactionsOnPilot(pilot));
    } else {
        return response;
    }
}

function getReactionsOnUnlinkedMech(token) { // Get all the items/systems from a Token that have tags
    let response = [];
    const items = token.document.actor.items?.filter(x => typeof x.system.tags != 'undefined');
    // For each item, check if it is tagged as a reaction and add it to the results
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let itemTags = items[i].system.tags;
            for (let j = 0; j < itemTags.length; j++) {
                if (itemTags[j].lid === 'tg_reaction') {
                    log(itemTags[j]);
                    response.push(items[i].name);
                }
            }
        }
    }
    return response;
}

function getReactionsOnPilot(pilot) {
    log('getReactionsOnPilot');
    let response = [];
    // Get all the items/systems from an pilot that have tags
    const items = pilot.items.filter(x => x.type === 'talent');
    // For each item, check if it is tagged as a reaction and add it to the results
    for (let i = 0; i < items.length; i++) {
        let curRank = items[i].system.curr_rank;
        let talentRanks = items[i].system.ranks;
        for (let j = 0; j < talentRanks.length; j++) {
            log(`Item: ${items[i].name}. Talent: ${talentRanks[j].name}. Rank: ${j}.`);
            log(curRank);
            let actions = talentRanks[j].actions;
            for (const action of actions) {
                if (action.activation === 'Reaction') {
                    if (curRank > j) {
                        log(action.name);
                        response.push(`Talent: ${action.name}`);
                    }
                }
            }
        }
    }
    return response;
}

export function displayReactions(actor, token) {
    log('displayReaction');
    // Get a list of reactions for an actor
    let reactions = token.document.isLinked ?
        getReactionsOnMech(actor) :
        getReactionsOnUnlinkedMech(token);
    if (reactions.length > 0) { // If there are reactions
        // Build a message in HTML
        let html = "<h3>Someone has targeted " + actor.name + "! Consider using your reactions!</h3>";
        html += "<ul>";
        for (let i = 0; i < reactions.length; i++) {
            html += "<li>" + reactions[i] + "</li>";
        }
        html += "</ul>";
        // If the settings are for a pop-up ...
        if (game.settings.get('csm-lancer-qol', 'reactionReminder') == 'p') {
            new Dialog({
                title: "Reaction Reminder for " + actor.name,
                content: html,
                buttons: {
                    ok: {
                        label: "OK"
                    }
                }
            }).render(true);
        }
        // if the settings are for chat messages ...
        if (game.settings.get('csm-lancer-qol', 'reactionReminder') == 'c') {
            ChatMessage.create({
                user: game.userId,
                content: html,
                whisper: [game.userId]
            });
        }
    }
}
