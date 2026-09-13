/* global CONST, ui, game, canvas, loadTexture, FilePicker, TokenMagic, Sequence */

import { wipeStatuses, macroEffect } from "./effects.js";
import { log } from "./log.js";

export async function updateStructure(token) {
    let structure = 0;
    let response = '';
    structure = token.actor.system.structure.value;
    if (structure <= 0) { // We ded
        response = `${token.name} structure is zero or less.`
        // If enabled, remove statuses when a token reaches 0 structure
        if (game.settings.get('csm-lancer-qol', 'enableWipOnDeath')) {
            log(`${token.name} is dead, removing statuses.`);
            await wipeStatuses(token);
        }
        // If enabled, and there is a combat, and the token is a combatant, remove the token from combat when structure reaches 0
        if (game.combat && token.combatant && game.settings.get('csm-lancer-qol', 'enableRemoveFromCombat')) {
            log(`${token.name} is dead, removing from combat.`);
            await game.combat.combatants.get(token.combatant._id).delete();
        }
        // Remove burn, heat, and overshield, set HP for an object.
        const objectHP = token.actor.system.size * 10;
        const updates = {
            system: {
                hp: { value: objectHP },
                overshield: { value: 0 },
                heat: { value: 0 },
                burn: 0
            }
        };
        if (token) await token.actor.update(updates);
        // If not biological, wreck it
        if (isBiological(token)) {
            console.log(`${token.name} is biological and not currently wreckable.`);
        } else {
            console.log(`${token.name} is a wreck!`);
            token = await wreckIt(token);
        }
        if (isMonstrosity(token) && game.settings.get('csm-lancer-qol', 'monstrosityWreck')) {
            console.log(`${token.name} is a monstrosity.`);
            token = await wreckIt(token);
        }
        if (isSquad(token) && game.settings.get('csm-lancer-qol', 'squadLostOnDeath')) {
            await token.actor.toggleStatusEffect('mia', { active: true, overlay: true });
        }
        if (token && game.settings.get('csm-lancer-qol', 'enableMacroEffects')) {
            log(await macroEffect(`Wreck`, token.actor, token, true));
        }
    } else { // We un ded
        response = `${token.name} structure is greated than zero.`
        // If not biological, un-wreck it
        if (isBiological(token)) {
            console.log(`${token.name} is biological and not currently un-wreckable.`);
        } else {
            console.log(`${token.name} is NOT a wreck.`);
            await unWreckIt(token);
        }
        if (isMonstrosity(token) && game.settings.get('csm-lancer-qol', 'monstrosityWreck')) {
            console.log(`${token.name} is a monstrosity.`);
            token = await unWreckIt(token);
        }
        if (isSquad(token) && game.settings.get('csm-lancer-qol', 'squadLostOnDeath')) {
            await token.actor.toggleStatusEffect('mia', { active: false, overlay: true });
        }
        // If enabled, and there is a combat, and the token is not a combatant, add the token to the combat if the structure is not 0
        if (game.combat && !token.combatant && game.settings.get('csm-lancer-qol', 'enableRemoveFromCombat')) {
            await token.document.toggleCombatant(); // Add un-dead back to combat
        }
        if (token && game.settings.get('csm-lancer-qol', 'enableMacroEffects')) {
            log(await macroEffect(`Wreck`, token.actor, token, false));
        }
    }
    return response;
}

// Is a token biological so we don't wreck biological tokens
function isBiological(token) {
    const actor = game.actors.find(x => x.id === token.document.actorId);
    const biologicalRoleItems = actor.items.filter(x => x.system.role === 'biological');
    if (biologicalRoleItems.length > 0) {
        log(`${token.name} is biological.`);
        return true;
    } else {
        log(`${token.name} is not biological.`);
        return false;
    }
}

// Is a token a squad
function isSquad(token) {
    const squadItems = token.actor.items.filter(x => x.system.lid === 'npcc_squad');
    if (squadItems.length > 0) {
        log(`${token.name} is a squad.`);
        return true;
    } else {
        log(`${token.name} is not a squad.`);
        return false;
    }
}

// Is a token a monstrosity
function isMonstrosity(token) {
    const monstItems = token.actor.items.filter(x => x.system.lid == 'npcc_monstrosity');
    if (monstItems.length > 0) {
        log(`${token.name} is a monstrosity.`);
        return true;
    } else {
        log(`${token.name} is not a monstrosity.`);
        return false;
    }
}

// Is a token a human
function isHuman(token) {
    const humanItems = token.actor.items.filter(x => x.system.lid == 'npcc_human');
    if (humanItems.length > 0) {
        log(`${token.name} is a human.`);
        return true;
    } else {
        log(`${token.name} is not a human.`);
        return false;
    }
}

// Is a token a pilot
function isPilot(token) {
    if (token.actor.type === 'pilot') {
        log(`${token.name} is a pilot.`);
        return true;
    } else {
        log(`${token.name} is not a pilot.`);
        return false;
    }
}

// Load a texture and signal to other clients to load it as well if push is true
export async function preLoadImageForAll(src, push = false) {
    if (push) {
        game.socket.emit('module.csm-lancer-qol', { action: "preLoadImageForAll", payload: src });
    }
    if (game.version >= 13 ) {
        await foundry.canvas.loadTexture(src);
    } else {
        await loadTexture(src);
    }
    return src;
}

// Find a random corpse image ...
async function getCorpseImage() {
    log('--getCorpseImage--');
    let corpseList = [];

    const dataCorpsePath = 'modules/csm-lancer-qol/corpses/s1';
    const dataCorpseImages = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataCorpsePath) : await FilePicker.browse('data', dataCorpsePath);
    for (const path of dataCorpseImages.files) { // Add images from data to the array
        corpseList.push(path)
    }

    log(corpseList);
    const rand = Math.floor(Math.random() * (corpseList.length));
    log(rand);
    return corpseList[rand];
}

// Find a random gore animation effect ...
async function getCorpseEffect() {
    log('--getCorpseEffect--');
    let corpseEffectList = [];

    const dataCorpseEffectsPath = 'modules/csm-lancer-qol/corpses/effects';
    const dataCorpseEffects = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataCorpseEffectsPath) : await FilePicker.browse('data', dataCorpseEffectsPath);
    for (const path of dataCorpseEffects.files) { // Add effects from data to the array
        corpseEffectList.push(path);
    }

    log(corpseEffectList);
    const rand = Math.floor(Math.random() * (corpseEffectList.length));
    log(rand);
    return corpseEffectList[rand];
}

// Find a random gore sound effect ...
async function getCorpseSound() {
    log('--getCorpseSound--');
    let corpseSoundList = [];

    const dataCorpseSoundsPath = 'modules/csm-lancer-qol/corpses/audio';
    const dataCorpseSounds = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataCorpseSoundsPath) : await FilePicker.browse('data', dataCorpseSoundsPath);
    for (const path of dataCorpseSounds.files) { // Add effects from data to the array
        corpseSoundList.push(path);
    }

    log(corpseSoundList);
    const rand = Math.floor(Math.random() * (corpseSoundList.length));
    log(rand);
    return corpseSoundList[rand];
}

// Find a random wreck image from one or both image locations that is the right size
async function getWreckImage(size) {
    log('--getWreckImage--');
    let wreckList = [];
    if (size < 1) { size = 1; } // We don't support smaller sizes right now
    if (size > 3) { size = 3; } // We don't support larger sizes right now

    let useBuiltInWrecks = true;
    if ((game.settings.get('csm-lancer-qol', 'userWrecksOnly') == true) &&
        (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '')) {
        useBuiltInWrecks = false;
    }

    if (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '') {
        const userWrecksPath = game.settings.get('csm-lancer-qol', 'userWrecksPath') + '/s' + size;
        const userWreckImages = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', userWrecksPath) : await FilePicker.browse('user', userWrecksPath);
        for (const path of userWreckImages.files) { // Add images from user to the array
            wreckList.push(path);
        }
    }

    if (useBuiltInWrecks || wreckList.length == 0) {
        const dataWrecksPath = 'modules/csm-lancer-qol/wrecks/s' + size;
        const dataWreckImages = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataWrecksPath) : await FilePicker.browse('data', dataWrecksPath);
        for (const path of dataWreckImages.files) { // Add images from data to the array
            wreckList.push(path);
        }
    }

    log(wreckList);
    const rand = Math.floor(Math.random() * (wreckList.length));
    log(rand);
    return wreckList[rand];
}

// Find a random wreck animation effect from the module location
async function getWreckEffect() {
    log('--getWreckEffect--');
    let wreckEffectList = [];

    let useBuiltInWrecks = true;
    if ((game.settings.get('csm-lancer-qol', 'userWrecksOnly') == true) &&
        (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '')) {
        useBuiltInWrecks = false;
    }

    if (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '') {
        const userWreckEffectsPath = game.settings.get('csm-lancer-qol', 'userWrecksPath') + '/effects';
        const userWreckEffect = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', userWreckEffectsPath) : await FilePicker.browse('user', userWreckEffectsPath);
        for (const path of userWreckEffect.files) { // Add effects from user to the array
            wreckEffectList.push(path);
        }
    }

    if (useBuiltInWrecks || wreckEffectList.length == 0) {
        const dataWreckEffectsPath = 'modules/csm-lancer-qol/wrecks/effects';
        const dataWreckEffects = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataWreckEffectsPath) : await FilePicker.browse('data', dataWreckEffectsPath);
        for (const path of dataWreckEffects.files) { // Add effects from data to the array
            wreckEffectList.push(path);
        }
    }

    log(wreckEffectList);
    const rand = Math.floor(Math.random() * (wreckEffectList.length));
    log(rand);
    return wreckEffectList[rand];
}

// Find a random wreck sound effect from the module location
async function getWreckSound() {
    log('--getWreckSound--');
    let wreckSoundList = [];

    let useBuiltInWrecks = true;
    if ((game.settings.get('csm-lancer-qol', 'userWrecksOnly') == true) &&
        (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '')) {
        useBuiltInWrecks = false;
    }

    if (game.settings.get('csm-lancer-qol', 'userWrecksPath') != '') {
        const userWreckSoundPath = game.settings.get('csm-lancer-qol', 'userWrecksPath') + '/audio';
        const userWreckSound = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', userWreckSoundPath) : await FilePicker.browse('user', userWreckSoundPath);
        for (const path of userWreckSound.files) { // Add audio from user to the array
            wreckSoundList.push(path);
        }
    }

    if (useBuiltInWrecks || wreckSoundList.length == 0) {
        const dataWreckSoundPath = 'modules/csm-lancer-qol/wrecks/audio';
        const dataWreckSound = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('data', dataWreckSoundPath) : await FilePicker.browse('data', dataWreckSoundPath);
        for (const path of dataWreckSound.files) { // Add audio from data to the array
            wreckSoundList.push(path);
        }
    }

    log(wreckSoundList);
    const rand = Math.floor(Math.random() * (wreckSoundList.length));
    log(rand);
    return wreckSoundList[rand];
}

// If a token is not "dead", remove effects, replace the image with a wreck, and clear heat/burn/overshield
async function wreckIt(token) {
    const isDead = token.document.getFlag('csm-lancer-qol', 'isDead');
    if (isDead) {
        log(`${token.name} is already wrecked.`);
    } else {
        log(`Wrecking ${token.name}!`);
        await TokenMagic.deleteFilters(token);
        const imgString = token.document.getFlag('csm-lancer-qol', 'wreckImgPath');
        const effString = token.document.getFlag('csm-lancer-qol', 'wreckEffectPath');
        const souString = token.document.getFlag('csm-lancer-qol', 'wreckSoundPath');
        log(`Picked ${imgString} for ${token.name}`);
        const wreckType = game.settings.get('csm-lancer-qol', 'wreckType');
        let tileWreck = false
        switch (wreckType) {
            case 'token':
                break;
            case 'PCtoken':
                tileWreck = !(token.actor.type == "mech");
                break;
            case "linkToken":
                tileWreck = !token.document.actorLink;
                break;
            case 'tile':
                tileWreck = true
                break;
        }
        if (tileWreck) {
            new Sequence()
                .sound()
                .file(souString)
                .playIf(game.settings.get('csm-lancer-qol', 'enableWreckAudio'))
                .effect()
                .file(effString)
                .scaleToObject(2.25)
                .atLocation(token)
                .waitUntilFinished(-500)
                .playIf(game.settings.get('csm-lancer-qol', 'enableWreckAnimation'))
                .thenDo(() => {
                    //Need to take into account the non-square measurements of hex tokens
                    //Testing shows maybe not? Or at least that assuming square gives better results on large tokens.
                    //const hexConstant = 1.155;
                    //const heightMultiplier = canvas.scene.grid.type == CONST.GRID_TYPES.HEXODDR || canvas.scene.grid.type == CONST.GRID_TYPES.HEXEVENR ? hexConstant : 1;
                    //const widthMultiplier = canvas.scene.grid.type == CONST.GRID_TYPES.HEXODDQ || canvas.scene.grid.type == CONST.GRID_TYPES.HEXEVENQ ? hexConstant : 1;
                    const gridSize = canvas.scene.grid.size;

                    const tileData = {
                        x: token.document.x,
                        y: token.document.y,
                        height: token.document.height * gridSize/* * heightMultiplier*/,
                        width: token.document.width * gridSize /* * widthMultiplier*/,
                        flags: {
                            'csm-lancer-qol': {
                                isWreck: true,
                                tokenDocument: token.document.toObject() //so we can restore the token later, once I've written that part
                            }
                        }
                    }
                    tileData.texture = { src: imgString };
                    canvas.scene.createEmbeddedDocuments("Tile", [tileData])
                    token.document.delete()
                    return; //return something falsy to prevent a later update - returning the token doesn't work here for some reason as it stays defined.
                })
                .play()
        } else { //it's a token wreck, proceed as before
            new Sequence()
                .sound()
                .file(souString)
                .playIf(game.settings.get('csm-lancer-qol', 'enableWreckAudio'))
                .effect()
                .file(effString)
                .scaleToObject(2.25)
                .atLocation(token)
                .waitUntilFinished(-500)
                .playIf(game.settings.get('csm-lancer-qol', 'enableWreckAnimation'))
                .thenDo(() => {
                    // token.document.update({ "texture.src": imgString });
                    const updates = [{
                        _id: token.document._id,
                        texture: {
                            src: imgString
                        },
                        displayBars: CONST.TOKEN_DISPLAY_MODES.NONE,
                        displayName: CONST.TOKEN_DISPLAY_MODES.NONE,
                        flags: {
                            'csm-lancer-qol': {
                                isDead: true,
                                originalImgPath: token.document.texture.src,
                                originalDisplayName: token.document.displayName,
                                originalDisplayBars: token.document.displayBars
                            }
                        }
                    }];
                    canvas.scene.updateEmbeddedDocuments("Token", updates);
                })
                .play()
        }
    }
    return token;
}

// If a token is dead, return it's image to a non-wreck original image
async function unWreckIt(token) {
    const isDead = token.document.getFlag('csm-lancer-qol', 'isDead');
    if (isDead) {
        log(`${token.name} is back from the dead!`);
        const originalImgPath = token.document.getFlag('csm-lancer-qol', 'originalImgPath');
        const originalDisplayName = token.document.getFlag('csm-lancer-qol', 'originalDisplayName');
        const originalDisplayBars = token.document.getFlag('csm-lancer-qol', 'originalDisplayBars');

        const updates = [{
            _id: token.document._id,
            texture: {
                src: originalImgPath
            },
            displayBars: originalDisplayBars,
            displayName: originalDisplayName,
            flags: {
                'csm-lancer-qol': {
                    isDead: false
                }
            }
        }];
        await canvas.scene.updateEmbeddedDocuments("Token", updates);
    } else {
        log(`${token.name} is already unwrecked.`);
    }
    return token;
}

export function tileHUDButton(app, html, context) {
    const tile = app?.object?.document;
    if (!tile || !tile.getFlag('csm-lancer-qol', 'isWreck')) return //if there's no tile, or that tile is not a wreck, not our problem
    // Create the button element
    const button = document.createElement('div');
    button.classList.add('control-icon', 'csm-lancer-qol');
    button.title = 'UnWreck';
    button.dataset.tooltip = 'UnWreck';
    // Create the icon inside the button
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-person-rays');
    button.appendChild(icon);
    // Add event listener for mouseup
    button.addEventListener('mouseup', () => {
        unWreckTile(tile);
    });
    const column = '.col.right';
    if (game.version >= 13) {
        html.querySelector(column).append(button);
    } else {
        html.find(column).append(button);
    }
    log(context);
}

async function unWreckTile(tile) {
    log('unWreckTile');
    log(tile);
    const isWreck = tile.getFlag('csm-lancer-qol', "isWreck");
    if (isWreck) {
        let tokenData = tile.getFlag('csm-lancer-qol', "tokenDocument");
        const actor = game.actors.get(tokenData.actorId);
        if (!actor) {
            //Can't do anything if the source actor has been deleted
            log(`No actor found for token wreck ${tokenData.name}`);
            return
        }
        log(`${tokenData.name} is back from the (tile) dead!`);
        //set the position to the position of the wreck, in case it was moved
        tokenData.x = tile.x;
        tokenData.y = tile.y;

        // Re-hydrate token
        log(tokenData);
        if (tokenData.actorLink) {
            // Make a new token from the actor
            const mech = game.actors.get(tokenData.actorId);
            if (mech.system.structure.value == 0) {
                await mech.update({ "system.structure.value": 1 });
            }
            const mechToken = await mech.getTokenDocument({ x: tile.x, y: tile.y });
            let newToken = await canvas.scene.createEmbeddedDocuments('Token', [mechToken]);
            newToken.forEach(async (token) => {
                console.log(`${token.name} was made from actor prototype.`);
                // I used to add the token back to combat here, but it moved into updateStructure()
            });
        } else {
            // Make a new token from the tokenData
            let newToken = await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
            newToken.forEach(async (token) => {
                console.log(`${token.name} was made from tokenData.`);
                if (token.actor.system.structure.value == 0) {
                    await token.actor.update({ "system.structure.value": 1 });
                }
                // I used to add the token back to combat here, but it moved into updateStructure()
            });
        }
        // Delete the tile
        await tile.delete();
        return;
    } else {
        log(`Tile ID ${tile.id} is not a (tile) wreck`);
    }
}

// When we drag a token onto a scene, pick a wreck texture and effect, ask everyone to load it, and save it to a flag
export async function preWreck(document, change, userId) {
    log('--preWreck--');
    if (game.users.activeGM.isSelf) {
        const size = document.actor?.system?.size ?? 1;
        // Load up any pre-existing values for the token
        let wreckImgPath = document.getFlag('csm-lancer-qol', 'wreckImgPath');
        let wreckEffectPath = document.getFlag('csm-lancer-qol', 'wreckEffectPath');
        let wreckSoundPath = document.getFlag('csm-lancer-qol', 'wreckSoundPath');
        // If the image path is undefined or string of spaces
        if ((/^\s*$/.test(wreckImgPath)) || (typeof wreckImgPath === 'undefined')) {
            if (isMonstrosity(document)) {
                wreckImgPath = await getCorpseImage();
            } else {
                wreckImgPath = await getWreckImage(size);
            }
        } else { // Test the path and over-write if it's invalid
            let pathTest;
            let validPath = false;
            try {
                pathTest = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', wreckImgPath) : await FilePicker.browse('user', wreckImgPath);
                validPath = pathTest?.files?.includes(wreckImgPath);
                log(pathTest);
            } catch(error) {
                ui.notifications.warn(`${document.name} has an invalid wreck image specified. LANCER QoL will replace it with a random one.`);
                log(error);
            }
            if (isMonstrosity(document)) {
                wreckImgPath = validPath ? wreckImgPath : await getCorpseImage();
            } else {
                wreckImgPath = validPath ? wreckImgPath : await getWreckImage(size);
            }
        }
        // If the effect path is undefined or string of spaces
        if ((/^\s*$/.test(wreckEffectPath)) || (typeof wreckEffectPath === 'undefined')) {
            if (isMonstrosity(document)) {
                wreckEffectPath = await getCorpseEffect();
            } else {
                wreckEffectPath = await getWreckEffect();
            }
        } else { // Test the path and over-write if it's invalid
            let pathTest;
            let validPath = false;
            try {
                pathTest = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', wreckEffectPath) : await FilePicker.browse('user', wreckEffectPath);
                validPath = pathTest?.files?.includes(wreckEffectPath);
                log(pathTest);
            } catch(error) {
                ui.notifications.warn(`${document.name} has an invalid wreck effect specified. LANCER QoL will replace it with a random one.`);
                log(error);
            }
            if (isMonstrosity(document)) {
                wreckEffectPath = validPath ? wreckEffectPath : await getCorpseEffect();
            } else {
                wreckEffectPath = validPath ? wreckEffectPath : await getWreckEffect();
            }
        }
        // If the sound path is undefined or string of spaces
        if ((/^\s*$/.test(wreckSoundPath)) || (typeof wreckSoundPath === 'undefined')) {
            if (isMonstrosity(document)) {
                wreckSoundPath = await getCorpseSound();
            } else {
                wreckSoundPath = await getWreckSound();
            }
        } else { // Test the path and over-write if it's invalid
            let pathTest;
            let validPath = false;
            try {
                pathTest = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', wreckSoundPath) : await FilePicker.browse('user', wreckSoundPath);
                validPath = pathTest?.files?.includes(wreckSoundPath);
                log(pathTest);
            } catch(error) {
                ui.notifications.warn(`${document.name} has an invalid wreck sound specified. LANCER QoL will replace it with a random one.`);
                log(error);
            }
            if (isMonstrosity(document)) {
                wreckSoundPath = validPath ? wreckSoundPath : await getCorpseSound();
            } else {
                wreckSoundPath = validPath ? wreckSoundPath : await getWreckSound();
            }
        }
        await preLoadImageForAll(wreckImgPath, true);
        await preLoadImageForAll(wreckEffectPath, true);
        await document.setFlag('csm-lancer-qol', 'wreckImgPath', wreckImgPath);
        await document.setFlag('csm-lancer-qol', 'wreckEffectPath', wreckEffectPath);
        await document.setFlag('csm-lancer-qol', 'wreckSoundPath', wreckSoundPath);
        log(document);
    }
    if (userId) { // Sometimes this is called without a userId
        log(`${game.users.find(x => x.id === userId).name}(${userId})`);
    }
}

// When a scene loads, let's pre-load all the wreck textures and effects
export async function canvasReadyWreck() {
    for (const token of canvas.tokens.placeables) {
        await preWreck(token.document);
    }
}
