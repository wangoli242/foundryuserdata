/*global console, game, Hooks, Dialog */

import { log } from "./log.js";
import { registerSettings, testWrecksLocation, lancerQolTokenConfig } from "./settings.js";
import { combatTracking, setTimedEffect, setFlaggedEffect, pushFlaggedEffect, roundReminder, combatReminder } from "./combatTracking.js";
import { addStatusEffects, updateBurn, updateOverShield, updateHeat, createActiveEffect, deleteActiveEffect } from "./effects.js";
import { displayReactions } from "./reaction.js";
import { updateStructure, canvasReadyWreck, preLoadImageForAll, preWreck, tileHUDButton } from "./wreck.js";
import { setLockOn, pushLockOn } from "./lockon.js";
import { setEffectByPlayer, pushEffectByPlayer } from "./setEffectByPlayer.js";
import { mimicGun } from "./mimic.js";
import { cpjFlowStep } from "./cpjFlow.js";
import { oneStructFlowStep } from "./oneStructFlow.js";
import { engageHook } from "./engaged.js";

// Socket to handle client requests for the GM player to execute
async function handleSocketEvent({ action, payload }) {
    switch (action) {
        case "preLoadImageForAll": {
            log('Received preLoadImageForAll socket event.');
            await preLoadImageForAll(payload);
            break;
        }
        case "setLockOn": {
            log('Received lockOn socket event.');
            await setLockOn(payload);
            break;
        }
        case "setEffectByPlayer": {
            log('Received status effect socket event.');
            await setEffectByPlayer(payload.effectId, payload.idList);
            break;
        }
        case "setFlaggedEffect": {
            log('Received setFlaggedEffect socket event.');
            setFlaggedEffect(payload.targetID, payload.effect, payload.duration, payload.note, payload.originID);
            break;
        }
    }
};

// When updates occur, new dependencies are not checked, so we have to do it
async function checkDependencies() {
    const dependencies = [`sequencer`, `tokenmagic`, `lib-wrapper`, `socketlib`];

    let missing = [];
    for (let i = 0; i < dependencies.length; i++) {
        if (typeof game.modules.get(dependencies[i]) !== 'undefined') {
            log(`Not missing ${dependencies[i]}`);
        } else {
            log(`Missing ${dependencies[i]}`);
            missing.push(dependencies[i]);
        }
    }
    if (missing.length > 0 && game.user.isGM) {
        let dialogContent = `<p>Please install and enable these modules for Lancer QoL features to fully work:</p>`;
        for (let j = 0; j < missing.length; j++) {
            dialogContent = dialogContent + `<li>${missing[j]}`;
        }
        dialogContent = dialogContent + `</ul><p>Thank you!</p>`;
        log(dialogContent);
        // eslint-disable-next-line no-unused-vars
        const myDialog = new Dialog({
            title: `Lancer QoL is missing dependencies!`,
            content: dialogContent,
            buttons: { button1: { label: `OK` } }
        }).render(true);
    }
}

// Initialization Hooks - Ideally in order they are triggered on load

Hooks.once(
    'lancer.registerFlows',
    (flowSteps, flows) => {
        flowSteps.set('oneStructFlowStep', oneStructFlowStep);
        flows.get('StructureFlow')?.insertStepBefore('preStructureRollChecks', 'oneStructFlowStep');
        flowSteps.set('cpjFlowStep', cpjFlowStep);
        flows.get('StructureFlow')?.insertStepBefore('preStructureRollChecks', 'cpjFlowStep');
    }
);

Hooks.on('init', registerSettings);

Hooks.on('init', function () {
    CONFIG.debug.hooks = false;
    console.log('csm-lancer-qol | Init');
});

Hooks.on('setup', function () {
    console.log('csm-lancer-qol | Setup');
});

Hooks.on('canvasReady', canvasReadyWreck);

Hooks.on('lancer.statusesReady', addStatusEffects);

Hooks.on('ready', function () {
    console.log('csm-lancer-qol | This code runs once core initialization is ready and' +
        ' game data is available.');
    game.modules.get('csm-lancer-qol').exposed = {
        setTimedEffect,
        pushLockOn,
        pushEffectByPlayer,
        pushFlaggedEffect,
        mimicGun
    };
    game.socket.on('module.csm-lancer-qol', handleSocketEvent);
    checkDependencies();
    testWrecksLocation();
});

// Token Configuration Extensions

Hooks.on('renderTokenConfig', lancerQolTokenConfig);

// User Driven Hooks (Usually)

Hooks.on('updateActor', async function (document, change, options, userId) {
    log('**actorUpdate**');
    log(document);
    log(document.constructor.name);
    log(change);
    log(options);
    log(`${game.users.find(x => x.id === userId).name}(${userId})`);
    const tokens = document.getActiveTokens();
    const token = tokens.pop();
    if (token && game.userId === userId) { // Only if we find a valid token and we can most likely edit it ...
        if (typeof change.system?.structure !== 'undefined' && game.settings.get('csm-lancer-qol', 'enableAutomationWrecks')) {
            log(await updateStructure(token));
        }

        if (typeof change.system?.heat !== 'undefined' && game.settings.get('csm-lancer-qol', 'enableAutomation')) {
            log(await updateHeat(document));
        }

        if (typeof change.system?.overshield !== 'undefined' && game.settings.get('csm-lancer-qol', 'enableAutomation')) {
            log(await updateOverShield(document));
        }

        if (typeof change.system?.burn !== 'undefined' && game.settings.get('csm-lancer-qol', 'enableAutomation')) {
            log(await updateBurn(document));
        }
    }
});

Hooks.on('createActiveEffect', createActiveEffect);

Hooks.on('deleteActiveEffect', deleteActiveEffect);

Hooks.on('targetToken', function (user, targetedToken, isTargeted) {
    if (isTargeted) { // Only if we're targetting, not untargetting
        log(`${user.name} targeted ${targetedToken.name}`);
        if (game.settings.get('csm-lancer-qol', 'reactionReminder') !== 'd') { // If reaction reminder is enabled
            let targetedActor = game.actors.find(x => x.id === targetedToken.actor.id);
            let ownership = targetedActor.ownership[game.userId];
            if (ownership == 3 && game.userId !== user.id) { // If you are the owner, and you did not perform the target ...,
                displayReactions(targetedActor, targetedToken);
            }
        }
    } else {
        log(`${user.name} untargeted ${targetedToken.name}`);
    }
});

Hooks.on('renderTileHUD', tileHUDButton);

Hooks.on('updateCombat', combatTracking);

Hooks.on('updateCombat', roundReminder);

Hooks.on('deleteCombat', combatReminder);

Hooks.on('createToken', preWreck);

Hooks.on('updateToken', engageHook);
