# API documentation audit

- API surface: **415** names
- Documented: **259** of them
- Findings: **204**

## Markdown docs

### Called by pack/startup content but not documented (4)

- `consumeAction`
- `findGrantedAction`
- `getActiveGMId`
- `resolveGrant`

### info: internal surface, neither documented nor surfaced (119)

- `TriggerUseAmmoFlow`
- `actionFX`
- `applyFlaggedEffectToTokens`
- `applyInfection`
- `applyKnockbackMoves`
- `beginTargetSession`
- `beginWeaponThrowFlow`
- `bindCardEscape`
- `cancelAreaPicker`
- `cancelBroadcastChoiceCard`
- `cancelCardlessTokenPicker`
- `cancelRulerDrag`
- `cancelSingleTargetPicker`
- `cancelVoteCardOnVoter`
- `checkOnInitReactions`
- `checkOverwatchCondition`
- `chooseInvade`
- `choseMount`
- `choseSystem`
- `choseTrait`
- `clearAreaTargetShape`
- `clearSingleTargetShape`
- `closeAdvancedMeasure`
- `confirmVoteCardOnVoter`
- `consumeBonusUse`
- `createChanceLabel`
- `createMergedRangeHighlight`
- `createPulsingRangeHighlight`
- `createTokenMark`
- `deployDeployable`
- `drawMovementTrace`
- `executeDeleteAllFlaggedEffect`
- `executeFall`
- `executeGenerateScan`
- `executeGenericBonusMenu`
- `executePackMacro`
- `executeScanOnActivation`
- `executeStandingUp`
- `executeTeleport`
- `findDeployableInCompendium`
- `findFlaggedEffectOnToken`
- `gainAction`
- `gateActions`
- `getAllFlaggedEffects`
- `getDeployableInfo`
- `getDeployableInfoSync`
- `getDowntimeActivities`
- `getHexGroundElevation`
- `getIsoProvider`
- `gridLineWidth`
- `handleManualDeployLink`
- `handleTrigger`
- `hasItem`
- `hasMechStats`
- `hasReaction`
- `hasTallerSolidAdjacent`
- `importDowntimeActionsJson`
- `importTemplateMacroPresets`
- `initAdvancedMeasureAutoClose`
- `isAdvancedMeasureActive`
- `isAreaPickerActive`
- `isCardlessTokenPickerActive`
- `isDisableable`
- `isGrantStale`
- `isHexUnderTerrain`
- `isItemDisabled`
- `isLancerActor`
- `isPositionChange`
- `isSingleTargetPickerActive`
- `isTargetSessionActive`
- `isTokenInCombat`
- `isTokenVisible`
- `isWhiteSvgIcon`
- `isoLabelTransform`
- `modifyAction`
- `openAdvancedMeasure`
- `openDeployablePicker`
- `openDocumentPicker`
- `openDowntimeImportDialog`
- `packMacros`
- `pickAreaTargetToggle`
- `pickSingleTargetToggle`
- `pickTokensCardless`
- `playMineDetonationFX`
- `pointerToWorld`
- `processDurationEffects`
- `processEffectConsumption`
- `pushEffect`
- `pushFlaggedEffect`
- `receiveVoteSubmission`
- `regenerateScans`
- `removeEffectsFromTokens`
- `removeFlaggedEffectFromTokens`
- `repairLCPData`
- `resetAdvancedMeasureState`
- `resetMovementCap`
- `resolveActionGate`
- `resolveDeployRangeCount`
- `resolveDeployable`
- `resolveDeployableSourceItem`
- `resolveGMChoiceCard`
- `setFlaggedEffect`
- `setItemDisabled`
- `setTokenFlag`
- `showMultiUserControlledChoiceCard`
- `showOverlapStackPicker`
- `showUserIdControlledChoiceCard`
- `showVoteCardOnVoter`
- `sliceDeployablesForTier`
- `startActivationManagerTour`
- `startConfigTour`
- `supportsConsumeOnUsage`
- `sweepStaleGrants`
- `templateToEffectDescriptor`
- `toggleAdvancedMeasure`
- `triggerFlaggedEffectImmunity`
- `unsetTokenFlag`
- `updateAllEngagements`
- `updateVoteCardOnVoter`

### Entry with no example beyond the signature (35)

- `API_FLAGS.md:172  getFlowFlag`
- `API_FLAGS.md:172  setFlowFlag`
- `API_HUD.md:11  getActorActions`
- `API_HUD.md:11  getItemActions`
- `API_HUD.md:11  getLinkedActions`
- `API_HUD.md:250  applyActionOverlays`
- `API_HUD.md:250  resolveGrantedActionRange`
- `API_INTERACTIVE.md:110  findItemByLid`
- `API_INTERACTIVE.md:110  getWeapons`
- `API_INTERACTIVE.md:110  rechargeSystem`
- `API_INTERACTIVE.md:110  reloadOneWeapon`
- `API_INTERACTIVE.md:262  openChoiceMenu`
- `API_INTERACTIVE.md:577  moveTokenRuler`
- `API_INTERACTIVE.md:607  boostMove`
- `API_INTERACTIVE.md:710  getActorDeployables`
- `API_INTERACTIVE.md:710  getLinkedDeployables`
- `API_INTERACTIVE.md:775  promptLinkOrUnlinkActor`
- `API_INTERACTIVE.md:792  getItemDeployables`
- `API_INTERACTIVE.md:881  openDeployableMenu`
- `API_INTERACTIVE.md:881  openItemBrowser`
- `API_INTERACTIVE.md:881  openThrowMenu`
- `API_INTERACTIVE.md:896  pickupWeaponToken`
- `API_INTERACTIVE.md:896  recallDeployable`
- `API_INTERACTIVE.md:946  delayedTokenAppearance`
- `API_ITEMS.md:121  openEndActivationMenu`
- `API_ITEMS.md:27  isItemUsable`
- `API_MOVEMENT.md:80  getMovementBands`
- `API_MOVEMENT.md:80  getMovementCap`
- `API_MOVEMENT.md:80  tokenSpeed`
- `API_REFERENCE.md:880  dispatchCustomTrigger`
- `API_REFERENCE.md:908  debugActivation`
- `API_SPATIAL.md:149  getTokenPosition`
- `API_SPATIAL.md:149  samePosition`
- `API_SPATIAL.md:329  laTokenGameplayHeight`
- `API_SPATIAL.md:329  laTokenHeight`

### Takes options but has no param table (1)

- `API_INTERACTIVE.md:607  boostMove`

### Param row missing type or default (1)

- `API_INTERACTIVE.md:170  openHaseContestCard.sourceItem/sourceAction/extraData`

### Option absent from the entry entirely (5)

- `API_INTERACTIVE.md:350  rollCard.allowEdit`
- `API_INTERACTIVE.md:350  rollCard.description`
- `API_INTERACTIVE.md:350  rollCard.flavor`
- `API_INTERACTIVE.md:350  rollCard.icon`
- `API_INTERACTIVE.md:350  rollCard.urgent`

### Option named in prose but with no type or default (5)

- `API_INTERACTIVE.md:350  rollCard.item`
- `API_INTERACTIVE.md:350  rollCard.originToken`
- `API_INTERACTIVE.md:350  rollCard.relatedToken`
- `API_INTERACTIVE.md:350  rollCard.roll`
- `API_INTERACTIVE.md:350  rollCard.title`

### Positional argument never explained (23)

- `API_COMBAT.md:418  executeSimpleActivation(actorOrToken)`
- `API_COMBAT.md:691  getSensorRange_WithBonus(input)`
- `API_COMBAT.md:710  hasTag(lid)`
- `API_EFFECTS.md:930  getApplicableImmunityBonuses(subtype)`
- `API_EFFECTS.md:930  getAttackImmunityBonuses(attackerActor)`
- `API_EFFECTS.md:930  getAttackImmunityBonuses(subtype)`
- `API_EFFECTS.md:930  getGateImmunityBonuses(subtype)`
- `API_HUD.md:11  getLinkedActions(source)`
- `API_HUD.md:152  lockActorActionTypes(kind)`
- `API_HUD.md:152  unlockActorActionTypes(kind)`
- `API_HUD.md:250  applyActionOverlays(actions)`
- `API_HUD.md:250  resolveGrantedActionRange(actionName)`
- `API_INTERACTIVE.md:607  boostMove(token)`
- `API_ITEMS.md:27  isItemUsable(item)`
- `API_MOVEMENT.md:52  undoMoveData(_distance)`
- `API_MOVEMENT.md:80  tokenSpeed(token)`
- `API_REFERENCE.md:908  debugActivation(activationName)`
- `API_REFERENCE.md:908  debugActivation(item)`
- `API_REFERENCE.md:908  debugActivation(token)`
- `API_REFERENCE.md:908  debugActivation(triggerData)`
- `API_REFERENCE.md:908  debugActivation(triggerType)`
- `API_SPATIAL.md:149  samePosition(waypointA)`
- `API_SPATIAL.md:149  samePosition(waypointB)`

## Autocomplete hints

### On the API, missing from hint manifest (7)

- `findGrantedAction`
- `gateActions`
- `isGrantStale`
- `isHexUnderTerrain`
- `resolveActionGate`
- `resolveGrant`
- `sweepStaleGrants`

### Generated hint file is stale (run build_hints.py) (4)

- `consumeAction  added since it was generated`
- `gainAction  added since it was generated`
- `isHexUnderTerrain  added since it was generated`
- `modifyAction  added since it was generated`

## Reference popup

Clean.

## Writing

Clean.

