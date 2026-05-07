/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-dg'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '2.1'

/**
 * Action types
 */
export const ACTION_TYPE = {
    attributes: 'DG.ItemWindow.Motivations.Attributes',
    skills: 'DG.Navigation.Skill',
    equipment: 'DG.Navigation.Gear'
}

/**
 * Groups
 */
export const GROUP = {
    attributes: { id: 'attributes', name: 'DG.ItemWindow.Motivations.Attributes', type: 'system' },
    luck: { id: 'luck', name: 'DG.Luck', type: 'system' },
    other: { id: 'other', name: 'DG.TypeSkills.Other', type: 'system' },
    skills: { id: 'skills', name: 'DG.Navigation.Skills', type: 'system' },
    typedSkills: { id: 'typedSkills', name: 'DG.SpecialTraining.Dialog.DropDown.CustomSkills', type: 'system' },
    specialTraining: { id: 'specialTraining', name: 'tokenActionHud.dg.specialTraining', type: 'system' },
    weapons: { id: 'weapons', name: 'DG.Gear.Weapons', type: 'system' },
    rituals: { id: 'rituals', name: 'DG.Gear.Rituals', type: 'system' }
}
