/* global game */

import { log } from "./log.js";

export async function oneStructFlowStep(state) {
    log('-- oneStructFlowStep --');
    if (!game.settings.get('csm-lancer-qol', 'oneStructNPCAutomation')) {
        return true;
    }
    log(state);
    let actor = state.actor;
    let structure = actor.system.structure;
    if (actor.is_npc && structure.max == 1) {
        log('-- 1 Struct NPC --');
        const printCard = (game.lancer.flowSteps).get("printStructureCard");
        state.data.title = 'Crushing Hit';
        state.data.desc = 'Your mech is damaged beyond repair – it is destroyed. You may still exit it as normal.';
        state.data.result = undefined;
        printCard(state);
        await actor.update({
            "system.structure": structure.value - 1,
        });
        return false;
    }
    return true;
}
