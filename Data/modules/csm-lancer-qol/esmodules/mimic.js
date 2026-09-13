/*global Roll, game, ChatMessage */

import { log } from "./log.js";

async function displayMimicUpdate(x, y, z) {
    let output = `
        <p class="horus--subtle">MIMIC <s>GUN</s> RECONFIGURE</p>
        <p class="horus--subtle">\\\\ new parameters \\\\ ¿%:? limits</p>
        <p>X PATTERN RANGE/DAMAGE:${x}/${Math.ceil(x / 2) + 1}</p>
        <p>Y PATTERN RANGE/DAMAGE:${y}/${Math.ceil(y / 2) + 1}</p>
        <p>Z PATTERN RANGE/DAMAGE:${z}/${Math.ceil(z / 2) + 1}</p>
    `;
    ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker(),
        content: output
    }, {});
}

export async function mimicGun(token) {
    log('--mimicGun--');
    // Build a list of mounted Mimic Guns
    let guns = token.actor.system.loadout.weapon_mounts.flatMap(x => x.slots.map(y => y.weapon?.value)).filter(z => z?.system.lid === 'mw_mimic_gun');
    if (guns.length < 1) {
        return 'No mounted Mimic Gun found.';
    }
    // Loop over the array of mounted Mimic Guns to make profiles
    for (let i = 0; i < guns.length; i++) {
        log(`--${i}--`);
        let thisGun = guns[i];
        log(thisGun);
        let profiles = thisGun.system.profiles;
        log(profiles);

        let profile = profiles[0];

        let xRoll = await new Roll("d20").roll();
        let xProfile = {
            name: 'X PATTERN',
            range: [
                { type: 'Range', val: xRoll.total }
            ],
            damage: [
                { type: 'Kinetic', val: Math.ceil(xRoll.total / 2) + 1 }
            ]
        };

        let yRoll = await new Roll("d20").roll();
        let yProfile = {
            name: 'Y PATTERN',
            range: [
                { type: 'Range', val: yRoll.total }
            ],
            damage: [
                { type: 'Kinetic', val: Math.ceil(yRoll.total / 2) + 1 }
            ]
        };

        let zRoll = await new Roll("d20").roll();
        let zProfile = {
            name: 'Z PATTERN',
            range: [
                { type: 'Range', val: zRoll.total }
            ],
            damage: [
                { type: 'Kinetic', val: Math.ceil(zRoll.total / 2) + 1 }
            ]
        };

        const updates = {
            id: thisGun._id,
            system: {
                profiles: [
                    profile,
                    xProfile,
                    yProfile,
                    zProfile
                ]
            }
        };
        await thisGun.update(updates);
        await displayMimicUpdate(xRoll.total, yRoll.total, zRoll.total);
    }
    return 'This is not a gun.';
}
