// System Module Imports
import DG from '../../../systems/deltagreen/module/config.js'
export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */
        async buildSystemActions (groupIds) {
            // Set actor and token variables
            this.actors = (!this.actor) ? this._getActors() : [this.actor]
            this.actorType = this.actor?.type

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            if (this.actorType !== 'vehicle') {
                this.#buildCharacterActions()
            } else if (!this.actor) {
                this.#buildMultipleTokenActions()
            }
        }

        /**
         * Build character actions
         * @private
         */
        #buildCharacterActions () {
            this.buildAttributes()
            this.buildOther()
            this.buildLuck()
            this.buildSkills()
            this.buildEquipment()
        }

        #showValue () {
            return game.settings.get('token-action-hud-core', 'tooltips') === 'none'
        }

        async buildAttributes () {
            const actions = []
            for (const key in this.actor.system.statistics) {
                const encodedValue = [coreModule.api.Utils.i18n('attributes'), key].join(this.delimiter)
                const tooltip = {
                    content: String(this.actor.system.statistics[key].x5),
                    class: 'tah-system-tooltip',
                    direction: 'LEFT'
                }
                actions.push({
                    name: coreModule.api.Utils.i18n('DG.Attributes.' + key),
                    id: key,
                    info1: this.#showValue() ? { text: tooltip.content } : null,
                    tooltip,
                    actionTypeId: coreModule.api.Utils.i18n('attributes'),
                    actionId: key,
                    encodedValue
                })
            }
            await this.addActions(actions, {
                id: 'attributes',
                type: 'system'
            })
        }

        async buildLuck () {
            const actions = []
            const tooltip = {
                content: '50',
                class: 'tah-system-tooltip',
                direction: 'LEFT'
            }
            actions.push({
                name: coreModule.api.Utils.i18n('DG.Luck'),
                id: 'luck',
                info1: this.#showValue() ? { text: '50' } : null,
                tooltip,
                actionTypeId: 'attributes',
                actionId: 'luck',
                encodedValue: ['attributes', 'luck'].join(this.delimiter)
            })
            await this.addActions(actions, { id: 'luck', type: 'system' })
        }

        async buildOther () {
            if (typeof this.actor.system.sanity.value !== 'undefined') {
                const actions = []
                const groupData = {
                    id: 'other_sanity',
                    name: coreModule.api.Utils.i18n('DG.Attributes.SAN'),
                    type: 'system'
                }
                this.addGroup(groupData, { id: 'other', type: 'system' }, true)
                const tooltip = {
                    content: String(this.actor.system.sanity.value + '/' + this.actor.system.sanity.max),
                    class: 'tah-system-tooltip',
                    direction: 'LEFT'
                }
                actions.push({
                    name: coreModule.api.Utils.i18n('DG.Attributes.SAN'),
                    id: 'sanity',
                    info1: this.#showValue() ? { text: tooltip.content } : null,
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'sanity',
                    encodedValue: ['attributes', 'sanity'].join(this.delimiter)
                },
                {
                    name: '+',
                    id: 'sanity_add',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'sanity_add',
                    encodedValue: ['attributes', 'sanity_add'].join(this.delimiter)
                },
                {
                    name: '-',
                    id: 'sanity_subtract',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'sanity_subtract',
                    encodedValue: ['attributes', 'sanity_subtract'].join(this.delimiter)
                })
                await this.addActions(actions, { id: 'other_sanity', type: 'system' })
            }
            if (typeof this.actor.system.health.value !== 'undefined') {
                const actions = []
                const groupData = {
                    id: 'other_health',
                    name: coreModule.api.Utils.i18n('DG.Attributes.HP'),
                    type: 'system'
                }
                this.addGroup(groupData, { id: 'other', type: 'system' }, true)
                const tooltip = {
                    content: String(this.actor.system.health.value + '/' + this.actor.system.health.max),
                    class: 'tah-system-tooltip',
                    direction: 'LEFT'
                }
                actions.push({
                    name: coreModule.api.Utils.i18n('DG.Attributes.HP'),
                    id: 'health',
                    info1: this.#showValue() ? { text: tooltip.content } : null,
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'health',
                    encodedValue: ['attributes', 'health'].join(this.delimiter)
                },
                {
                    name: '+',
                    id: 'health_add',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'health_add',
                    encodedValue: ['attributes', 'health_add'].join(this.delimiter)
                },
                {
                    name: '-',
                    id: 'health_subtract',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'health_subtract',
                    encodedValue: ['attributes', 'health_subtract'].join(this.delimiter)
                })
                await this.addActions(actions, { id: 'other_health', type: 'system' })
            }
            if (typeof this.actor.system.wp.value !== 'undefined') {
                const actions = []
                const groupData = {
                    id: 'other_wp',
                    name: coreModule.api.Utils.i18n('DG.Attributes.WP'),
                    type: 'system'
                }
                this.addGroup(groupData, { id: 'other', type: 'system' }, true)
                const tooltip = {
                    content: String(this.actor.system.wp.value + '/' + this.actor.system.wp.max),
                    class: 'tah-system-tooltip',
                    direction: 'LEFT'
                }
                actions.push({
                    name: coreModule.api.Utils.i18n('DG.Attributes.WP'),
                    id: 'wp',
                    info1: this.#showValue() ? { text: tooltip.content } : null,
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'wp',
                    encodedValue: ['attributes', 'wp'].join(this.delimiter)
                },
                {
                    name: '+',
                    id: 'wp_add',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'wp_add',
                    encodedValue: ['attributes', 'wp_add'].join(this.delimiter)
                },
                {
                    name: '-',
                    id: 'wp_subtract',
                    tooltip,
                    actionTypeId: 'attributes',
                    actionId: 'wp_subtract',
                    encodedValue: ['attributes', 'wp_subtract'].join(this.delimiter)
                })
                await this.addActions(actions, { id: 'other_wp', type: 'system' })
            }
        }

        async buildSkills () {
            const actions = []
            for (const s in this.actor.system.skills) {
                const skill = this.actor.system.skills[s]
                if (skill.proficiency > 0) {
                    const tooltip = {
                        content: String(skill.proficiency),
                        direction: 'LEFT'
                    }
                    actions.push({
                        name: coreModule.api.Utils.i18n('DG.Skills.' + s),
                        id: skill.label.replace(/\s+/g, ''),
                        info1: this.#showValue() ? { text: tooltip.content } : null,
                        tooltip,
                        actionTypeId: 'skills',
                        actionId: s,
                        encodedValue: ['skills', s].join(this.delimiter)
                    })
                }
            }
            await this.addActions(actions, { id: 'skills', type: 'system' })

            actions.length = 0
            for (const s in this.actor.system.typedSkills) {
                const skill = this.actor.system.typedSkills[s]
                if (skill.proficiency > 0) {
                    const tooltip = {
                        content: String(skill.proficiency),
                        direction: 'LEFT'
                    }
                    actions.push({
                        name: coreModule.api.Utils.i18n('DG.TypeSkills.' + skill.group.replace(' ', '')) + ' (' + skill.label + ')',
                        id: s,
                        info1: this.#showValue() ? { text: tooltip.content } : null,
                        tooltip,
                        actionTypeId: 'typedSkills',
                        actionId: s,
                        encodedValue: ['typedSkills', s].join(this.delimiter)
                    })
                }
            }
            await this.addActions(actions, { id: 'typedSkills', type: 'system' })

            actions.length = 0
            for (const s in this.actor.system.specialTraining) {
                const training = this.actor.system.specialTraining[s]
                let score = 0
                if (DG.statistics.includes(training.attribute)) {
                    score = this.actor.system.statistics[training.attribute].x5
                } else if (DG.skills.includes(training.attribute)) {
                    score = this.actor.system.skills[training.attribute].proficiency
                } else {
                    score = this.actor.system.typedSkills[training.attribute].proficiency
                }
                if (score > 0) {
                    const tooltip = {
                        content: String(score),
                        direction: 'LEFT'
                    }
                    actions.push({
                        name: training.name,
                        id: training.id,
                        info1: this.#showValue() ? { text: tooltip.content } : null,
                        tooltip,
                        actionTypeId: 'specialTraining',
                        actionId: training.name,
                        encodedValue: ['specialTraining', training.name].join(this.delimiter)
                    })
                }
            }
            await this.addActions(actions, { id: 'specialTraining', type: 'system' })
        }

        async buildEquipment () {
            // const rituals = []
            for (const item of this.actor.items) {
                // Push the weapon name as a new group
                const groupData = {
                    id: 'weapons_' + item._id,
                    name: item.name,
                    type: 'system'
                }
                this.addGroup(groupData, { id: 'weapons', type: 'system' }, true)
                if (item.type === 'weapon') {
                    const weapons = []
                    const tooltip = {
                        content: String(this.actor.system.skills[item.system.skill].proficiency),
                        direction: 'LEFT'
                    }
                    weapons.push({
                        name: this.actor.system.skills[item.system.skill].label,
                        id: item.system.skill,
                        info1: this.#showValue() ? { text: tooltip.content } : null,
                        actionTypeId: 'weapons',
                        actionId: item._id,
                        encodedValue: ['weapons', item._id].join(this.delimiter),
                        tooltip
                    })
                    const damageTooltip = {
                        content: String(item.system.damage),
                        direction: 'LEFT'
                    }
                    if (item.system.damage !== '') {
                        weapons.push({
                            name: coreModule.api.Utils.i18n('DG.Roll.Damage'),
                            id: item._id,
                            info1: this.#showValue() ? { text: damageTooltip.content } : null,
                            actionTypeId: 'damage',
                            actionId: item._id,
                            encodedValue: ['damage', item._id].join(this.delimiter),
                            tooltip: damageTooltip
                        })
                    }
                    if (item.system.isLethal) {
                        const lethalityTooltip = {
                            content: String(item.system.lethality),
                            direction: 'LEFT'
                        }
                        weapons.push({
                            name: coreModule.api.Utils.i18n('DG.Roll.Lethality'),
                            id: item._id,
                            info1: this.#showValue() ? { text: lethalityTooltip.content } : null,
                            actionTypeId: 'lethality',
                            actionId: item._id,
                            encodedValue: ['lethality', item._id].join(this.delimiter),
                            tooltip: lethalityTooltip
                        })
                    }
                    await this.addActions(weapons, {
                        id: 'weapons_' + item._id,
                        type: 'system'
                    })
                }/* else if (item.type === 'ritual') {
                    rituals.push({
                        name: item.name,
                        id: item._id,
                        encodedValue: ['rituals', item.name].join(this.delimiter)
                    })
                } */

                /* await this.addActions(rituals, {
                    id: 'rituals',
                    type: 'system'
                }) */
            }
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        #buildMultipleTokenActions () {
        }
    }
})
