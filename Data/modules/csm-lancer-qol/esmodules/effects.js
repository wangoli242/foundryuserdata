/* global console, CONFIG, TokenMagic, ui, game */

import { log } from "./log.js";

export function addStatusEffects() {
    let statusEffects = [...CONFIG.statusEffects];
    console.log('csm-lancer-qol | addStatusEffects');
    qolStatusEffects.forEach((qolEffect) => {
        console.log(`csm-lancer-qol | Testing for ${qolEffect.name}(id:${qolEffect.id})`);
        const existingEffect = statusEffects.find(x => x.name === qolEffect.name || x.id === qolEffect.id);
        if (!existingEffect) {
            console.log(`csm-lancer-qol | ${qolEffect.name} not found, adding our own`);
            statusEffects.push(qolEffect);
        } else {
            console.log(`csm-lancer-qol | ${qolEffect.name} already defined`);
        }
    });
    CONFIG.statusEffects = statusEffects;
}

export async function updateHeat(actor) {
    let danger = 0;
    let response = '';
    let foundStatus = CONFIG.statusEffects.findLast(e => e.id === 'dangerzone');
    foundStatus ??= CONFIG.statusEffects.findLast(e => e.name === 'Danger Zone');
    if (typeof foundStatus === 'undefined') {
        return ui.notifications.error(`Lancer QoL could not find a Danger Zone status!`);
    }
    danger = actor.system.heat.value / actor.system.heat.max;
    log(danger);
    if (danger >= 0.5) {
        response = `${actor.name} is in the Danger Zone!`;
        await actor.toggleStatusEffect('dangerzone', {active: true});
    } else {
        response = `${actor.name} is NOT in the Danger Zone!`;
        await actor.toggleStatusEffect('dangerzone', {active: false});
    }
    return response;
}

export async function updateBurn(actor) {
    let burn = 0;
    let response = '';
    let foundStatus = CONFIG.statusEffects.findLast(e => e.id === 'burn');
    foundStatus ??= CONFIG.statusEffects.findLast(e => e.name === 'Burn');
    if (typeof foundStatus === 'undefined') {
        return ui.notifications.error(`Lancer QoL could not find a Burn status!`);
    }
    burn = actor.system.burn;
    log(burn);
    if (burn > 0) {
        response = `${actor.name} is burning!`;
        await actor.toggleStatusEffect('burn', {active: true});
    } else {
        response = `${actor.name} is NOT burning.`;
        await actor.toggleStatusEffect('burn', {active: false});
    }
    return response;
}

export async function updateOverShield(actor) {
    let shield = 0;
    let response = '';
    let foundStatus = CONFIG.statusEffects.findLast(e => e.id === 'overshield');
    foundStatus ??= CONFIG.statusEffects.findLast(e => e.name === 'Overshield');
    if (typeof foundStatus === 'undefined') {
        return ui.notifications.error(`Lancer QoL could not find a Overshield status!`);
    }
    shield = actor.system.overshield.value;
    log(shield);
    if (shield > 0) {
        response = `${actor.name} is shielded!`;
        await actor.toggleStatusEffect('overshield', {active: true});
    } else {
        response = `${actor.name} is NOT shielded.`;
        await actor.toggleStatusEffect('overshield', {active: false});
    }
    return response;
}

async function updateEffect(name, token, enable) {
    const effectMap = [
        {
            name: 'Cascading',
            preset: cascadingEffect,
            effects: [
                'cascading1',
                'cascading2'
            ]
        },
        {
            name: 'Invisible',
            preset: invisibleEffect,
            effects: [
                'invisible'
            ]
        },
        {
            name: 'Jammed',
            preset: jammedEffect,
            effects: [
                'jammed'
            ]
        },
        {
            name: 'Intangible',
            preset: intangibleEffect,
            effects: [
                'intangible1',
                'intangible2',
                'intangible3'
            ]
        },
        {
            name: "Danger Zone",
            preset: ((token.actor.items.filter(y => y.system.lid === 'mf_tokugawa_alt_enkidu').length > 0) && (game.settings.get('csm-lancer-qol', 'enableEnkiduDZEffect'))) ? enkiduDangerZoneEffect : dangerZoneEffect,
            effects: [
                'DangerZoneGlow',
                'DangerZoneBloom'
            ]
        },
        {
            name: "Burn",
            preset: burnEffect,
            effects: [
                'BurnGlow'
            ]
        },
        {
            name: "Overshield",
            preset: overshieldEffect,
            effects: [
                'OverShieldGlow'
            ]
        }
    ];
    // If I weren't a caveman, I would find a way to just search the effects.
    const effectData = effectMap.find(x => x.name === name);
    log(effectData);
    if (typeof effectData !== 'undefined') {
        if (enable) {
            if (!TokenMagic.hasFilterId(token, effectData.effects[0])) { await token.TMFXaddUpdateFilters(effectData.preset); }
        } else {
            for (var i = 0; i < effectData.effects.length; i++) {
                if (TokenMagic.hasFilterId(token, effectData.effects[i])) { await token.TMFXdeleteFilters(effectData.effects[i]); }
            }
        }
    }
    return name;
}

// If it has a macro, we can execute it ...
let macroEffectCount = 10;
let macroEffectThrottle = +new Date();
export async function macroEffect(name, actor, token, enable) {
    log('**macroEffect**');
    const now = +new Date();
    const suffix = enable ? 'apply' : 'remove';
    const macro = game.macros.find(m => m.name === `${name}.${suffix}`);
    if (!macro) return `No macro named ${name}.${suffix} found.`;
    if (now - macroEffectThrottle > 500) { // 0.5 second throttle
        macroEffectCount = 10;
        macroEffectThrottle = now;
        await macro.execute({ token, actor });
    } else {
        if (macroEffectCount > 0) {
            log(`Slow down! ${macroEffectCount}`);
            macroEffectCount--;
            await macro.execute({ token, actor });
        } else {
            log('Run-away loop detected!');
        }
    }
    return `Macro ${name}.${suffix} executed.`;
}

// Remove all effects from a token ...
export async function wipeStatuses(token) {
    await token.actor.deleteEmbeddedDocuments("ActiveEffect", token.actor.effects.map(e => e.id));
}

export async function createActiveEffect(document, change, userId) {
    log('**createActiveEffect**');
    const statusName = document.name;
    log(statusName);
    const tokens = document.parent.getActiveTokens();
    const token = tokens.pop();
    log(token);
    if (token && game.userId === userId && game.settings.get('csm-lancer-qol', 'enableConditionEffects')) {
        log(await updateEffect(statusName, token, true));
    }
    if (token && game.userId === userId && game.settings.get('csm-lancer-qol', 'enableMacroEffects')) {
        log(await macroEffect(statusName, document.parent, token, true));
    }
    log(change);
    log(`${game.users.find(x => x.id === userId).name}(${userId})`);
}

export async function deleteActiveEffect(document, change, userId) {
    log('**deleteActiveEffect**');
    const statusName = document.name;
    log(statusName);
    const tokens = document.parent.getActiveTokens();
    const token = tokens.pop();
    log(token);
    if (token && game.userId === userId && game.settings.get('csm-lancer-qol', 'enableConditionEffects')) {
        log(await updateEffect(statusName, token, false));
    }
    if (token && game.userId === userId && game.settings.get('csm-lancer-qol', 'enableMacroEffects')) {
        log(await macroEffect(statusName, document.parent, token, false));
    }
    log(change);
    log(`${game.users.find(x => x.id === userId).name}(${userId})`);
}

// Foundry VTT Based Active Effects
const qolStatusEffects = [
    {
        id: "dangerzone",
        name: "Danger Zone",
        img: "systems/lancer/assets/icons/white/status_dangerzone.svg"
    },
    {
        id: "burn",
        name: "Burn",
        img: "icons/svg/fire.svg"
    },
    {
        id: "overshield",
        name: "Overshield",
        img: "icons/svg/circle.svg"
    },
    {
        id: "engaged",
        name: "Engaged",
        img: "systems/lancer/assets/icons/white/status_engaged.svg"
    },
    {
        id: "cascading",
        name: "Cascading",
        img: "icons/svg/paralysis.svg"
    },
    {
        id: "bolster",
        name: "Bolstered",
        img: "systems/lancer/assets/icons/white/accuracy.svg"
    },
    {
        id: "mia",
        name: "M.I.A.",
        img: "modules/csm-lancer-qol/icons/mia_lg.svg"
    }
]

// TokenMagic FX Definitions
const dangerZoneEffect = [
    {
        filterType: "glow",
        filterId: "DangerZoneGlow",
        outerStrength: 4,
        innerStrength: 2,
        color: 0xff9633,
        quality: 0.5,
        padding: 10,
        animated: {
            color: {
                active: true,
                loopDuration: 6000,
                animType: "colorOscillation",
                val1: 0xEE5500,
                val2: 0xff9633
            },
            outerStrength: {
                active: true,
                loopDuration: 6000,
                animType: "cosOscillation",
                val1: 2,
                val2: 5
            }
        }
    },
    {
        filterType: "xbloom",
        filterId: "DangerZoneBloom",
        threshold: 0.35,
        bloomScale: 0,
        brightness: 1,
        blur: 0.1,
        padding: 10,
        quality: 15,
        blendMode: 0,
        animated: {
            bloomScale: {
                active: true,
                loopDuration: 6000,
                animType: "sinOscillation",
                val1: 0.4,
                val2: 1.0
            }
        }
    }
];
const enkiduDangerZoneEffect = [
    {
        filterType: "glow",
        filterId: "DangerZoneGlow",
        outerStrength: 4,
        innerStrength: 2,
        color: 0x9c24f2,
        quality: 0.5,
        padding: 10,
        animated: {
            color: {
                active: true,
                loopDuration: 6000,
                animType: "colorOscillation",
                val1: 0xf224cc,
                val2: 0x9c24f2
            },
            outerStrength: {
                active: true,
                loopDuration: 6000,
                animType: "cosOscillation",
                val1: 2,
                val2: 5
            }
        }
    },
    {
        filterType: "xbloom",
        filterId: "DangerZoneBloom",
        threshold: 0.35,
        bloomScale: 0,
        brightness: 1,
        blur: 0.1,
        padding: 10,
        quality: 15,
        blendMode: 0,
        animated: {
            bloomScale: {
                active: true,
                loopDuration: 6000,
                animType: "sinOscillation",
                val1: 0.4,
                val2: 1.0
            }
        }
    }
];
const burnEffect = [
    {
        filterType: "xglow",
        filterId: "BurnGlow",
        auraType: 2,
        color: 0x903010,
        thickness: 9.8,
        scale: 4.,
        time: 0,
        auraIntensity: 2,
        subAuraIntensity: 1.5,
        threshold: 0.40,
        discard: true,
        animated: {
            time: {
                active: true,
                speed: 0.0027,
                animType: "move"
            },
            thickness: {
                active: true,
                loopDuration: 3000,
                animType: "cosOscillation",
                val1: 2,
                val2: 5
            }
        }
    }
];
const overshieldEffect = [
    {
        filterType: "outline",
        filterId: "OverShieldGlow",
        padding: 10,
        color: 0x48dee0,
        thickness: 1,
        quality: 5,
        zOrder: 9,
        animated: {
            thickness: {
                active: true,
                loopDuration: 800,
                animType: "syncCosOscillation",
                val1: 1,
                val2: 6
            }
        }
    }
];
const invisibleEffect = [
    {
        filterType: "liquid",
        filterId: "invisible",
        color: 0x20AAEE,
        time: 0,
        blend: 8,
        intensity: 4,
        spectral: true,
        scale: 0.9,
        animated:
        {
            time:
            {
                active: true,
                speed: 0.0010,
                animType: "move"
            },
            color:
            {
                active: true,
                loopDuration: 6000,
                animType: "colorOscillation",
                val1: 0xFFFFFF,
                val2: 0x00AAFF
            }
        }
    }
];
const jammedEffect = [
    {
        filterType: "electric",
        filterId: "jammed",
        color: 0xFFFFFF,
        time: 0,
        blend: 1,
        intensity: 5,
        animated:
        {
            time:
            {
                active: true,
                speed: 0.0020,
                animType: "move"
            }
        }
    }
];
const cascadingEffect = [
    {
        filterType: "pixel",
        filterId: "cascading1",
        sizeX: 1,
        sizeY: 1,
        animated:
        {
            sizeX:
            {
                active: true,
                animType: "halfCosOscillation",
                loopDuration: 1500,
                val1: 1,
                val2: 3
            },
            sizeY:
            {
                active: true,
                animType: "halfCosOscillation",
                loopDuration: 1500,
                val1: 1,
                val2: 3
            }
        }
    },
    {
        filterType: "bevel",
        filterId: "cascading2",
        rotation: 0,
        thickness: 5,
        lightColor: 0xFF0000,
        lightAlpha: 0.8,
        shadowColor: 0x00FF00,
        shadowAlpha: 0.5,
        animated:
        {
            rotation:
            {
                active: true,
                clockWise: true,
                loopDuration: 1600,
                animType: "syncRotation"
            }
        }
    }
];
const intangibleEffect = [
    {
        filterType: "distortion",
        filterId: "intangible1",
        maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
        maskSpriteScaleX: 5,
        maskSpriteScaleY: 5,
        padding: 20,
        animated:
        {
            maskSpriteX: { active: true, speed: 0.05, animType: "move" },
            maskSpriteY: { active: true, speed: 0.07, animType: "move" }
        }
    },
    {
        filterType: "adjustment",
        filterId: "intangible2",
        saturation: 1,
        brightness: 1,
        contrast: 1,
        gamma: 1,
        red: 0.2,
        green: 0.2,
        blue: 0.2,
        alpha: 1,
        animated:
        {
            alpha:
            {
                active: true,
                loopDuration: 4000,
                animType: "syncCosOscillation",
                val1: 0.35,
                val2: 2.75
            }
        }
    },
    {
        filterType: "glow",
        filterId: "intangible3",
        padding: 10,
        color: 0x666666,
        thickness: 0.1,
        quality: 5,
        zOrder: 9,
        animated: {
            thickness: {
                active: true,
                loopDuration: 4000,
                animType: "syncCosOscillation",
                val1: 6,
                val2: 0
            }
        }
    }
];
