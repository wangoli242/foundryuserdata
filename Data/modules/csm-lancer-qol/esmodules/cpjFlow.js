/* global CONST, Roll, ChatMessage, game, renderTemplate */

import { log } from "./log.js";

async function scratchThePaint(actor) {
    log('scratchThePaint');
    let cpj = actor.items.find(i => i.system.lid === 'ms_custom_paint_job');
    if (cpj) {
        await actor.update({ 'system.hp.value': 1 });
        await actor.updateEmbeddedDocuments("Item", [{ _id: cpj._id, 'system.destroyed': true }]);
        return 'Paint is scratched!';
    } else {
        return 'No paintjob to scratch!';
    }
};

export async function cpjFlowStep(state) {
    log('-- cpjFlowStep --');
    if (!game.settings.get('csm-lancer-qol', 'cpjAutomation')) {
        return true;
    }
    log(state);
    let cpj = state.actor.items.find(i => i.system.lid === "ms_custom_paint_job");
    if (cpj) {
        log('There is a custom paint job.');

        if (cpj.system.destroyed) {
            log('Custom Paint Job was already scratched!');
            const cpjScratchedChat = await renderTemplate(
                `systems/${game.system.id}/templates/chat/generic-card.hbs`,
                {
                    title: "CUSTOM PAINT JOB",
                    description: "Your paint was already scratched!",
                });
            const scratchData = {
                type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                speaker: {
                    actor: state.actor,
                    token: state.actor?.token,
                    alias: state.actor?.token ? state.actor.token.name : null,
                },
                content: cpjScratchedChat
            }
            await ChatMessage.create(scratchData);
            return true;
        }

        let roll = new Roll('1d6');
        await roll.roll();
        log(`Custom Paint Job roll is a ${roll.total}`);

        const cpjSuccessChat = await renderTemplate(
            `systems/${game.system.id}/templates/chat/generic-card.hbs`,
            {
                title: "CUSTOM PAINT JOB",
                description: "The hit only scratched your paint!",
                roll,
                roll_tt: await roll.getTooltip(),
            });
        const successData = {
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: roll,
            speaker: {
                actor: state.actor,
                token: state.actor?.token,
                alias: state.actor?.token ? state.actor.token.name : null,
            },
            content: cpjSuccessChat
        }
        const cpjNoSuccessChat = await renderTemplate(
            `systems/${game.system.id}/templates/chat/generic-card.hbs`,
            {
                title: "CUSTOM PAINT JOB",
                description: "Your paint job didn't protect you this time...",
                roll,
                roll_tt: await roll.getTooltip(),
            });
        const noSuccessData = {
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: roll,
            speaker: {
                actor: state.actor,
                token: state.actor?.token,
                alias: state.actor?.token ? state.actor.token.name : null,
            },
            content: cpjNoSuccessChat
        }
        if (roll.total === 6) {
            await scratchThePaint(state.actor);
            await ChatMessage.create(successData);
            return false;
        } else {
            await ChatMessage.create(noSuccessData);
        }
    } else {
        log('No custom paint job detected.');
    }
    return true;
}
