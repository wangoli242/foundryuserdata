import { DGDamageRoll, DGPercentileRoll, DGLethalityRoll } from '../../../systems/deltagreen/module/roll/roll.js'
import DG from '../../../systems/deltagreen/module/config.js'

export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
     */
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
        /**
         * Handle action click
         * Called by Token Action HUD Core when an action is left or right-clicked
         * @override
         * @param {object} event  The event
         * @param {object} action The action
         */
        async handleActionClick (event, action) {
            let actionTypeId, actionId
            if (typeof action === 'string' || action instanceof String) {
                [actionTypeId, actionId] = action.split('|')
            } else {
                actionTypeId = action.actionTypeId
                actionId = action.actionId
            }

            const knownCharacters = ['character']

            // If single actor is selected
            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, actionTypeId, actionId)
                return
            }

            const controlledTokens = canvas.tokens.controlled
                .filter((token) => knownCharacters.includes(token.actor?.type))

            // If multiple actors are selected
            for (const token of controlledTokens) {
                const actor = token.actor
                await this.#handleAction(event, actor, token, actionTypeId, actionId)
            }
        }

        /**
         * Handle action hover
         * Called by Token Action HUD Core when an action is hovered on or off
         * @override
         * @param {object} event  The event
         * @param {object} action The action
         */
        async handleActionHover (event, action) {
        }

        /**
         * Handle group click
         * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
         * @override
         * @param {object} event The event
         * @param {object} group The group
         */
        async handleGroupClick (event, group) {
        }

        /**
         * Handle action
         * @private
         * @param {object} event        The event
         * @param {object} actor        The actor
         * @param {object} token        The token
         * @param {string} actionTypeId The action type id
         * @param {string} actionId     The actionId
         */
        async #handleAction (event, actor, token, actionTypeId, actionId) {
            switch (actionTypeId) {
            case 'attributes':
                await this.#handleAttributesAction(event, actor, actionId)
                break
            case 'skills':
                await this.#handleSkillsAction(event, actor, actionId)
                break
            case 'weapons':
                await this.#handleWeaponsAction(event, actor, actionId)
                break
            case 'damage':
                await this.#handleDamageAction(event, actor, actionId)
                break
            case 'lethality':
                await this.#handleLethalityAction(event, actor, actionId)
                break
            case 'specialTraining':
                await this.#handleSpecialTrainingAction(event, actor, actionId)
                break
            case 'typedSkills':
                await this.#handleCustomTypedAction(event, actor, actionId)
                break
                /* case 'rituals':
                await this.#handleRitualsAction(event, actor, actionId)
                break */
            case 'utility':
                await this.#handleUtilityAction(token, actionId)
                break
            }
        }

        /**
         * Handle Attribute action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleAttributesAction (event, actor, actionId) {
            let rollType
            if (actionId === 'wp' || actionId === 'health') return
            if (actionId.includes('_add') || actionId.includes('_subtract')) {
                const attr = actionId.split('_')[0]
                const action = actionId.split('_')[1]
                const update = {}
                update.system = {}
                update.system[attr] = {}
                update.system[attr].value = action === 'add' ? this.actor.system[attr].value + 1 : this.actor.system[attr].value - 1
                if (update.system[attr].value > this.actor.system[attr].max || update.system[attr].value < this.actor.system[attr].min) return
                return await this.actor.update(update)
            }
            if (actionId === 'sanity') {
                rollType = actionId
            } else if (actionId === 'luck') {
                rollType = actionId
            } else {
                rollType = 'stat'
            }
            const options = {
                actor: this.actor,
                rollType,
                key: actionId
            }

            const roll = new DGPercentileRoll('1D100', {}, options)
            return await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle Skill action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleSkillsAction (event, actor, actionId) {
            const options = {
                actor: this.actor,
                rollType: 'skill',
                key: actionId
            }

            const skill = this.actor.system.skills[actionId]
            if (!skill) return ui.notifications.warn('Bad skill name in HUD.')

            const roll = new DGPercentileRoll('1D100', {}, options)
            await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle Typed/Custom skills action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleCustomTypedAction (event, actor, actionId) {
            const options = {
                actor: this.actor,
                rollType: 'skill',
                key: actionId
            }
            const roll = new DGPercentileRoll('1D100', {}, options)
            await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle SoecialTraining action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleSpecialTrainingAction (event, actor, actionId) {
            const attr = this.actor.system.specialTraining.find(a => a.name === actionId).attribute
            let target = 0
            if (DG.statistics.includes(attr)) {
                target = this.actor.system.statistics[attr].x5
            } else if (DG.skills.includes(attr)) {
                target = this.actor.system.skills[attr].proficiency
            } else {
                target = this.actor.system.typedSkills[attr].proficiency
            }
            const options = {
                actor: this.actor,
                rollType: 'special-training',
                key: attr,
                specialTrainingName: actionId,
                target
            }
            const roll = new DGPercentileRoll('1D100', {}, options)
            await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle Weapon action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleWeaponsAction (event, actor, actionId) {
            const item = this.actor.items.get(actionId)
            const options = {
                actor: this.actor,
                rollType: 'weapon',
                key: item.system.skill,
                item
            }
            const roll = new DGPercentileRoll('1D100', {}, options)
            await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle Damage action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleDamageAction (event, actor, actionId) {
            const item = this.actor.items.get(actionId)
            if (item.system.lethality > 0 && event.ctrlKey) {
                // Toggle on/off lethality
                const isLethal = !item.system.isLethal
                await item.update({ 'system.isLethal': isLethal })
            } else {
                const options = {
                    actor: this.actor,
                    rollType: 'damage',
                    key: item.system.damage,
                    item
                }
                const roll = new DGDamageRoll(item.system.damage, {}, options)
                await this.actor.sheet.processRoll(event, roll)
            }
        }

        /**
         * Handle Lethality action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleLethalityAction (event, actor, actionId) {
            const item = await this.actor.items.get(actionId)
            if (item.system.damage !== '' && event.ctrlKey) {
                const isLethal = !item.system.isLethal
                await item.update({ 'system.isLethal': isLethal })
            } else {
                const options = {
                    actor: this.actor,
                    rollType: 'lethality',
                    key: item.system.lethality,
                    item
                }
                const roll = new DGLethalityRoll(item.system.damage, {}, options)
                await this.actor.sheet.processRoll(event, roll)
            }
        }

        /**
         * Handle Ritual action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleRitualsAction (event, actor, actionId) {
            const options = {
                actor: this.actor,
                rollType: 'ritual',
                key: actionId
            }
            const roll = new DGPercentileRoll('1D100', {}, options)
            await this.actor.sheet.processRoll(event, roll)
        }

        /**
         * Handle utility action
         * @private
         * @param {object} token    The token
         * @param {string} actionId The action id
         */
        async #handleUtilityAction (token, actionId) {
            switch (actionId) {
            case 'endTurn':
                if (game.combat?.current?.tokenId === token.id) {
                    await game.combat?.nextTurn()
                }
                break
            }
        }
    }
})
