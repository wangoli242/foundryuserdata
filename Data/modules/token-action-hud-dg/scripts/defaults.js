import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'statistics',
                id: 'statistics',
                name: coreModule.api.Utils.i18n('DG.Navigation.Physical'),
                groups: [
                    { ...groups.attributes, nestId: 'statistics_attributes' },
                    { ...groups.other, nestId: 'statistics_other' },
                    { ...groups.luck, nestId: 'statistics_luck' }
                ]
            },
            {
                nestId: 'skills',
                id: 'skills',
                name: coreModule.api.Utils.i18n('DG.Navigation.Skills'),
                groups: [
                    { ...groups.skills, nestId: 'skills_skills' },
                    { ...groups.typedSkills, nestId: 'skills_typed' },
                    { ...groups.specialTraining, nestId: 'skills_special' }
                ]
            },
            {
                nestId: 'equipment',
                id: 'equipment',
                name: coreModule.api.Utils.i18n('DG.Navigation.Gear'),
                groups: [
                    { ...groups.weapons, nestId: 'equipment_weapons' },
                    { ...groups.rituals, nestId: 'equipment_rituals' }
                ]
            }
        ],
        groups: groupsArray
    }
})
