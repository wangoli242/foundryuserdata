/*global game, FormApplication, FilePicker */

import { log } from "./log.js";

export async function testWrecksLocation() {
    log('--testWrecksLocation--');
    const customPath = game.settings.get('csm-lancer-qol', 'userWrecksPath');
    if (customPath === '') return;
    const expectedSubDirs = ['s1', 's2', 's3', 'effects', 'audio'];
    const browseResults = game.version >= 13 ? await foundry.applications.apps.FilePicker.implementation.browse('user', customPath) : await FilePicker.browse('user', customPath);
    log(browseResults);
    expectedSubDirs.forEach(async x => {
        if (browseResults.dirs.includes(`${browseResults.target}/${x}`)) {
            log(`Custom Wrecks sub-directory ${x} exists.`)
        } else {
            log(`Custom Wrecks sub-directory ${x} does not exist.`);
            const createResults = await FilePicker.createDirectory('user', `${customPath}/${x}`);
            log(createResults);
        }
    })
}

class statusAutomationFormApplication extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'csm-lancer-qol-statusAutomation';
        options.template = 'modules/csm-lancer-qol/templates/status-automation.hbs';
        options.height = 'auto';
        options.width = 700;
        options.title = 'Status & Condition Automation';
        return options;
    }

    getData(options = {}) {
        log(options);
        let context = super.getData();
        context.enableAutomation = game.settings.get('csm-lancer-qol', 'enableAutomation');
        context.enableEngageAutomation = game.settings.get('csm-lancer-qol', 'enableEngageAutomation');
        context.enableConditionEffects = game.settings.get('csm-lancer-qol', 'enableConditionEffects');
        context.enableEnkiduDZEffect = game.settings.get('csm-lancer-qol', 'enableEnkiduDZEffect');
        context.enableMacroEffects = game.settings.get('csm-lancer-qol', 'enableMacroEffects');
        context.enableWipOnDeath = game.settings.get('csm-lancer-qol', 'enableWipOnDeath');
        return context;
    }

    _updateObject(event, formData) {
        log('updateObject');
        game.settings.set('csm-lancer-qol', 'enableAutomation', formData.enableAutomation);
        game.settings.set('csm-lancer-qol', 'enableEngageAutomation', formData.enableEngageAutomation);
        game.settings.set('csm-lancer-qol', 'enableConditionEffects', formData.enableConditionEffects);
        game.settings.set('csm-lancer-qol', 'enableEnkiduDZEffect', formData.enableEnkiduDZEffect);
        game.settings.set('csm-lancer-qol', 'enableMacroEffects', formData.enableMacroEffects);
        game.settings.set('csm-lancer-qol', 'enableWipOnDeath', formData.enableWipOnDeath);
    }
}

class wreckAutomationFormApplication extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'csm-lancer-qol-wreckAutomation';
        options.template = 'modules/csm-lancer-qol/templates/wreck-automation.hbs';
        options.height = 'auto';
        options.width = 700;
        options.title = 'Wreck Automation';
        return options;
    }

    getData(options = {}) {
        log(options);
        let context = super.getData();
        context.enableAutomationWrecks = game.settings.get('csm-lancer-qol', 'enableAutomationWrecks');
        context.wreckType = game.settings.get('csm-lancer-qol', 'wreckType');
        context.userWrecksPath = game.settings.get('csm-lancer-qol', 'userWrecksPath');
        context.userWrecksOnly = game.settings.get('csm-lancer-qol', 'userWrecksOnly');
        context.enableRemoveFromCombat = game.settings.get('csm-lancer-qol', 'enableRemoveFromCombat');
        context.enableWreckAnimation = game.settings.get('csm-lancer-qol', 'enableWreckAnimation');
        context.enableWreckAudio = game.settings.get('csm-lancer-qol', 'enableWreckAudio');
        context.monstrosityWreck = game.settings.get('csm-lancer-qol', 'monstrosityWreck');
        context.squadLostOnDeath = game.settings.get('csm-lancer-qol', 'squadLostOnDeath');
        return context;
    }

    _updateObject(event, formData) {
        log('updateObject');
        game.settings.set('csm-lancer-qol', 'enableAutomationWrecks', formData.enableAutomationWrecks);
        game.settings.set('csm-lancer-qol', 'wreckType', formData.wreckType);
        game.settings.set('csm-lancer-qol', 'userWrecksPath', formData.userWrecksPath);
        game.settings.set('csm-lancer-qol', 'userWrecksOnly', formData.userWrecksOnly);
        game.settings.set('csm-lancer-qol', 'enableRemoveFromCombat', formData.enableRemoveFromCombat);
        game.settings.set('csm-lancer-qol', 'enableWreckAnimation', formData.enableWreckAnimation);
        game.settings.set('csm-lancer-qol', 'enableWreckAudio', formData.enableWreckAudio);
        game.settings.set('csm-lancer-qol', 'monstrosityWreck', formData.monstrosityWreck);
        game.settings.set('csm-lancer-qol', 'squadLostOnDeath', formData.squadLostOnDeath);
    }
}

class remindersFormApplication extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'csm-lancer-qol-reminders';
        options.template = 'modules/csm-lancer-qol/templates/reminders.hbs';
        options.height = 'auto';
        options.width = 550;
        options.title = 'Reminders';
        return options;
    }

    getData(options = {}) {
        log(options);
        let context = super.getData();
        context.reactionReminder = game.settings.get('csm-lancer-qol', 'reactionReminder');
        context.roundReminder = game.settings.get('csm-lancer-qol', 'roundReminder');
        return context;
    }

    _updateObject(event, formData) {
        log('updateObject');
        game.settings.set('csm-lancer-qol', 'reactionReminder', formData.reactionReminder);
        game.settings.set('csm-lancer-qol', 'roundReminder', formData.roundReminder);
    }
}

export function registerSettings() {
    // Status & Condition Automation SubMenu
    game.settings.registerMenu('csm-lancer-qol', 'statusAutomation', {
        name: "Status & Condition Automation",
        label: "Configure",
        icon: "fas fa-cogs",
        type: statusAutomationFormApplication,
        restricted: true
    });
    game.settings.register('csm-lancer-qol', 'enableAutomation', {
        name: 'Enable Status & Condition Automation',
        hint: 'Automatically apply Danger Zone, Overshield, or Burn based on mech attributes.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableAutomation to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableEngageAutomation', {
        name: 'Enable Engaged Automation',
        hint: 'enableEngageAutomation',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableEngageAutomation to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableConditionEffects', {
        name: 'Enable Status & Condition Token Effects',
        hint: 'Apply token visual effects when status and conditions are applied.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableConditionEffects to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableEnkiduDZEffect', {
        name: 'Enkidu Frame Purple Danger Zone',
        hint: 'When Enkidu frames run hot, use a purple-ish color.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableEnkiduDZEffect to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableMacroEffects', {
        name: 'enableMacroEffects',
        hint: 'enableMacroEffects',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableMacroEffects to ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableWipOnDeath', {
        name: 'Remove Statuses on Death',
        hint: 'When structure reaches zero, remove all status effects.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting enableWipOnDeath to: ${value}`);
        }
    });
    // Wreck Automation SubMenu
    game.settings.registerMenu('csm-lancer-qol', 'wreckAutomation', {
        name: "Wreck Automation",
        label: "Configure",
        icon: "fas fa-cogs",
        type: wreckAutomationFormApplication,
        restricted: true
    });
    game.settings.register('csm-lancer-qol', 'enableAutomationWrecks', {
        name: 'Enable Wrecks Automation',
        hint: 'When set to true, automate wrecking things!',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableAutomationWrecks to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'wreckType', {
        name: 'Wreck Type',
        hint: 'Select how to present wrecks.',
        scope: 'world',
        config: false,
        type: String,
        choices: {
            'token': 'All wrecks will be tokens (selectable, targetable)',
            'tile': 'All wrecks will be tiles (not targetable)',
            'PCtoken': 'Wrecks of Player Mechs will be tokens, NPCs will be tiles',
            'linkToken': 'Wrecks of linked tokens will be tokens, others will be tiles'
        },
        default: true,
        onChange: value => {
            log(`Setting wreckType to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'userWrecksPath', {
        name: 'Custom Wrecks Folder',
        hint: 'Location of your wrecks token images, explosion effects, and explosion sounds. Set to empty to disable.',
        scope: 'world',
        config: false,
        type: String,
        default: '',
        filePicker: 'folder',
        onChange: value => {
            testWrecksLocation(value);
            log(`Setting userWrecksPath to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'userWrecksOnly', {
        name: 'Only Use Custom Wrecks Folder',
        hint: 'This disables using the built-in wreck assets if there is a custom path set as well.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting userWrecksOnly to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableRemoveFromCombat', {
        name: 'Remove Wrecks from Combat Tracker',
        hint: 'When a token is reduced to zero structure, remove it from the combat tracker.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableRemoveFromCombat to: ${value}`);
        }
    });
    game.settings.register('csm-lancer-qol', 'enableWreckAnimation', {
        name: 'Wreck Explosions',
        hint: 'Enable explosion effects when mechs are wrecked.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableWreckAnimation to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'enableWreckAudio', {
        name: 'Wreck Audio',
        hint: 'Enable explosion sound when mechs are wrecked.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting enableWreckAudio to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'monstrosityWreck', {
        name: 'Monstrosity wreck automation',
        hint: 'Monstrosities have wrecks like mechs.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting monstrosityWreck to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'squadLostOnDeath', {
        name: 'Squad MIA on Death',
        hint: 'Enable applying MIA status on dead squads.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting squadLostOnDeath to: ${value}`);
        },
    });
    // Reminder SubMenu
    game.settings.registerMenu('csm-lancer-qol', 'reminders', {
        name: "Reminders",
        label: "Configure",
        icon: "fas fa-cogs",
        type: remindersFormApplication,
        restricted: true
    });
    game.settings.register('csm-lancer-qol', 'reactionReminder', {
        name: 'Reaction Reminder',
        hint: 'Remind users they have reactions when a token is targeted.',
        scope: 'world',
        config: false,
        type: String,
        choices: {
            "d": "Disable",
            "c": "Chat Whisper",
            "p": "Pop-Up"
        },
        default: "d",
        onChange: value => {
            log(`Setting reactionReminder to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'roundReminder', {
        name: 'Round Reminder',
        hint: 'At the end of a tokens combat turn, remind burning tokens to make checks.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting roundReminder to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'cpjAutomation', {
        name: 'CPJ Automation',
        hint: 'Automate Custom Paint Job system when taking damage. (CRB pp 120)',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
            log(`Setting cpjAutomation to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'oneStructNPCAutomation', {
        name: 'One Structure NPC Automation',
        hint: 'When an NPC with one structure runs out of hit points, skip rolling on the structure table. (CRB pp 281)',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting oneStructNPCAutomation to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'effectsTimer', {
        name: 'Effects Timer',
        hint: '!!BETA!! Allow removing effects automatically during combat.',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting effectsTimer to: ${value}`);
        },
    });
    game.settings.register('csm-lancer-qol', 'debug', {
        name: 'Debug Mode',
        hint: 'Enable more verbose console logs.',
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            log(`Setting debug to: ${value}`);
        },
    });
}

export function lancerQolTokenConfig(app, html, data) {
    log('--lancerQolTokenConfig--');
    log(app);
    if (game.version >= 13) {
        log(data.document.name);
    } else {
        log(data.object.name);
    }

    // Create a new token configuration tab
    const newTab = document.createElement('a');
    newTab.className = 'item';
    newTab.dataset.action = 'tab';
    newTab.dataset.group = 'sheet';
    newTab.dataset.tab = 'LANCER QoL';
    newTab.innerHTML = '<i class="fas fa-atom"></i><span>QoL</span>';
    if (game.version >= 13) {
        html.querySelector('a[data-action="tab"][data-group="sheet"][data-tab="resources"]').insertAdjacentElement('afterend', newTab);
    } else {
        html.find('a.item[data-tab="resources"]').after(newTab);
    }

    // Create a new form group
    const newHtml = document.createElement('div');
    newHtml.className = 'tab';
    newHtml.classList.add('scrollable')
    newHtml.dataset.group = 'sheet';
    newHtml.dataset.tab = 'LANCER QoL';
    newHtml.setAttribute('data-application-part', 'lancer-qol');

    if (game.version >= 13) {
        newHtml.dataset.group = 'sheet';
        newHtml.innerHTML = `
            <div class="form-group">
                <label>Wreck Image Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckImgPath" value="${data.document.flags['csm-lancer-qol']?.wreckImgPath ?? ''}"></file-picker>
                </div>
            </div>
            <div class="form-group">
                <label>Wreck Effect Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckEffectPath" value="${data.document.flags['csm-lancer-qol']?.wreckEffectPath ?? ''}"></file-picker>
                </div>
            </div>
            <div class="form-group">
                <label>Wreck Sound Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckSoundPath" value="${data.document.flags['csm-lancer-qol']?.wreckSoundPath ?? ''}"></file-picker>
                </div>
            </div>
        `;
        html.querySelector('div[data-tab="resources"]').insertAdjacentElement('afterend', newHtml);
    } else {
        newHtml.dataset.group = 'main';
        newHtml.innerHTML = `
            <div class="form-group">
                <label>Wreck Image Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckImgPath" value="${data.object.flags['csm-lancer-qol']?.wreckImgPath ?? ''}"></file-picker>
                </div>
            </div>
            <div class="form-group">
                <label>Wreck Effect Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckEffectPath" value="${data.object.flags['csm-lancer-qol']?.wreckEffectPath ?? ''}"></file-picker>
                </div>
            </div>
            <div class="form-group">
                <label>Wreck Sound Path</label>
                <div class="form-fields">
                    <file-picker name="flags.csm-lancer-qol.wreckSoundPath" value="${data.object.flags['csm-lancer-qol']?.wreckSoundPath ?? ''}"></file-picker>
                </div>
            </div>
        `;
        html.find('div.tab[data-tab="resources"]').after(newHtml);
    }
}