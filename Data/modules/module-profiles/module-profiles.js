/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/classes/ConfirmActivateProfileForm.ts":
/*!********************************************************!*\
  !*** ./src/main/classes/ConfirmActivateProfileForm.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmActivateProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/profile-interactions */ "./src/main/scripts/profile-interactions.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");



/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to activate said profile.
 */
class ConfirmActivateProfileForm extends FormApplication {
    constructor(profileNameToActivate, object = {}, options = {}) {
        super(object, options);
        this.profileNameToActivate = profileNameToActivate;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-confirm-activate-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__.TEMPLATES_PATH}/confirm-activate-profile.hbs`,
            title: 'Confirm Activate Profile',
            width: 660
        };
    }
    getData() {
        return {
            profileNameToActivate: this.profileNameToActivate,
            activeProfileName: _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile().name
        };
    }
    async _updateObject(event) {
        if (event?.submitter?.id === 'moduleProfilesActivateProfileSubmit') {
            _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__.activateProfile(this.profileNameToActivate, true);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/ConfirmDeleteProfileForm.ts":
/*!******************************************************!*\
  !*** ./src/main/classes/ConfirmDeleteProfileForm.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmDeleteProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to delete said profile.
 */
class ConfirmDeleteProfileForm extends FormApplication {
    constructor(profileNameToDelete, object = {}, options = {}) {
        super(object, options);
        this.profileNameToDelete = profileNameToDelete;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-confirm-delete-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/confirm-delete-profile.hbs`,
            title: 'Confirm Delete Profile',
            width: 660
        };
    }
    getData() {
        return {
            profileNameToDelete: this.profileNameToDelete
        };
    }
    // TODO - bug, name for button on module management does not update when active profile name switches
    async _updateObject(event) {
        if (event?.submitter?.id === 'moduleProfilesDeleteProfileSubmit') {
            return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.deleteProfile(this.profileNameToDelete);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/CreateModuleProfileForm.ts":
/*!*****************************************************!*\
  !*** ./src/main/classes/CreateModuleProfileForm.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * A FormApplication that allows a user to create a new module profile.
 */
class CreateModuleProfileForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-create-module-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/create-module-profile.hbs`,
            title: 'Create New Module Profile',
            width: 660,
        };
    }
    activateListeners(html) {
        if (html) {
            super.activateListeners(html);
        }
        document.getElementById('moduleProfilesCreateNewProfileName').focus();
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id === 'moduleProfilesCreateNewProfileSubmit') {
            return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.createProfile({
                name: formData.moduleProfilesCreateNewProfileName,
                description: formData.moduleProfilesCreateNewProfileDescription,
                modules: _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getCurrentModuleConfiguration(),
            });
        }
    }
}


/***/ }),

/***/ "./src/main/classes/EditModuleProfileForm.ts":
/*!***************************************************!*\
  !*** ./src/main/classes/EditModuleProfileForm.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_mapping_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");



/**
 * A FormApplication that allows a user to edit a module profile.
 */
class EditModuleProfileForm extends FormApplication {
    constructor(profileName, object = {}, options = {}) {
        super(object, options);
        this.profileName = profileName;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-edit-module-profile',
            resizable: true,
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__.TEMPLATES_PATH}/edit-module-profile.hbs`,
            title: 'Edit Module Profile',
            width: 450,
        };
    }
    getData() {
        const profile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(this.profileName);
        if (!profile) {
            const errorMessage = `Unable to load profile "${this.profileName}". Please close the window and try again.`;
            ui.notifications.error(errorMessage);
            throw new Error(errorMessage);
        }
        return profile;
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id !== 'moduleProfilesEditProfileSubmit') {
            return;
        }
        const { moduleProfilesEditProfileName, moduleProfilesEditProfileDescription, ...rest } = formData;
        return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile(this.profileName, {
            name: moduleProfilesEditProfileName,
            description: moduleProfilesEditProfileDescription,
            modules: _scripts_mapping_utils__WEBPACK_IMPORTED_MODULE_1__.mapToModuleInfos(rest),
        });
    }
}


/***/ }),

/***/ "./src/main/classes/ImportModuleProfileForm.ts":
/*!*****************************************************!*\
  !*** ./src/main/classes/ImportModuleProfileForm.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


class ImportModuleProfileForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-import-module-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/import-module-profile.hbs`,
            title: 'Import Module Profile(s)',
            height: 800,
            width: 660
        };
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id === 'moduleProfilesImportProfileSubmit') {
            return _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.importProfiles(formData['import-module-profile-text']);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/ManageModuleProfilesSettingsForm.ts":
/*!**************************************************************!*\
  !*** ./src/main/classes/ManageModuleProfilesSettingsForm.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODULE_PROFILES_UPDATED_HOOK_NAME": () => (/* binding */ MODULE_PROFILES_UPDATED_HOOK_NAME),
/* harmony export */   "RENDER_HOOK_NAME": () => (/* binding */ RENDER_HOOK_NAME),
/* harmony export */   "default": () => (/* binding */ ManageModuleProfilesSettingsForm),
/* harmony export */   "forceManageModuleProfilesHeightResize": () => (/* binding */ forceManageModuleProfilesHeightResize),
/* harmony export */   "reRenderManageModuleProfilesWindows": () => (/* binding */ reRenderManageModuleProfilesWindows)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/profile-interactions */ "./src/main/scripts/profile-interactions.ts");
/* harmony import */ var _scripts_browser_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/browser-utils */ "./src/main/scripts/browser-utils.ts");
/* harmony import */ var _CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CreateModuleProfileForm */ "./src/main/classes/CreateModuleProfileForm.ts");
/* harmony import */ var _ConfirmDeleteProfileForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfirmDeleteProfileForm */ "./src/main/classes/ConfirmDeleteProfileForm.ts");
/* harmony import */ var _EditModuleProfileForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditModuleProfileForm */ "./src/main/classes/EditModuleProfileForm.ts");
/* harmony import */ var _ImportModuleProfileForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ImportModuleProfileForm */ "./src/main/classes/ImportModuleProfileForm.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");








const RENDER_HOOK_NAME = 'renderManageModuleProfilesSettingsForm';
const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';
/**
 * A FormApplication that provides an interface for a user to manage module profiles.
 */
class ManageModuleProfilesSettingsForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: this.FORM_ID,
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_7__.TEMPLATES_PATH}/manage-profiles.hbs`,
            title: 'Manage Module Profiles',
            width: 660,
        };
    }
    getData() {
        const activeProfileName = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile().name;
        const profilesWithActiveFlag = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles().map(profile => ({
            ...profile,
            isProfileActive: activeProfileName === profile.name,
        }));
        return {
            profiles: profilesWithActiveFlag,
        };
    }
    activateListeners(html) {
        if (html) {
            super.activateListeners(html);
        }
        const createNewProfileElement = document.getElementById('module-profiles-manage-profiles-create-new');
        createNewProfileElement?.addEventListener('click', () => new _CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_3__["default"]().render(true));
        const importProfileElement = document.getElementById('module-profiles-manage-profiles-import');
        importProfileElement?.addEventListener('click', (e) => {
            // Prevents window from automatically closing
            e.preventDefault();
            new _ImportModuleProfileForm__WEBPACK_IMPORTED_MODULE_6__["default"]().render(true);
        });
        const exportAllProfilesElement = document.getElementById('module-profiles-manage-profiles-export-all');
        exportAllProfilesElement?.addEventListener('click', async (e) => {
            // Prevents window from automatically closing
            e.preventDefault();
            const exportedProfiles = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.exportAllProfiles();
            if (exportedProfiles) {
                await _scripts_browser_utils__WEBPACK_IMPORTED_MODULE_2__.copyToClipboard(exportedProfiles);
                ui.notifications.info(`All profiles have been copied to clipboard!`);
            }
        });
        const activateProfileElements = document.getElementsByClassName('module-profiles-activate-profile');
        Array.from(activateProfileElements).forEach(element => element.addEventListener('click', () => _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__.activateProfile(element.dataset.profileName)));
        const editProfileElements = document.getElementsByClassName('module-profiles-edit-profile');
        Array.from(editProfileElements).forEach(element => element.addEventListener('click', () => new _EditModuleProfileForm__WEBPACK_IMPORTED_MODULE_5__["default"](element.dataset.profileName).render(true)));
        const duplicateProfileElements = document.getElementsByClassName('module-profiles-duplicate-profile');
        Array.from(duplicateProfileElements).forEach(element => element.addEventListener('click', () => {
            const profile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(element.dataset.profileName);
            if (profile) {
                return _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.createProfile({
                    name: profile.name + ' (Copy)',
                    description: profile.description,
                    modules: profile.modules,
                });
            }
        }));
        const exportProfileElements = document.getElementsByClassName('module-profiles-export-profile');
        Array.from(exportProfileElements).forEach(element => element.addEventListener('click', async () => {
            const profileName = element.dataset.profileName;
            const exportedProfile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.exportProfileByName(profileName);
            if (exportedProfile) {
                await _scripts_browser_utils__WEBPACK_IMPORTED_MODULE_2__.copyToClipboard(exportedProfile);
                ui.notifications.info(`Profile "${profileName}" copied to clipboard!`);
            }
        }));
        const deleteProfileElements = document.getElementsByClassName('module-profiles-delete-profile');
        Array.from(deleteProfileElements).forEach((element) => element.addEventListener('click', () => new _ConfirmDeleteProfileForm__WEBPACK_IMPORTED_MODULE_4__["default"](element.dataset.profileName).render(true)));
    }
    async _updateObject() {
    }
}
ManageModuleProfilesSettingsForm.FORM_ID = 'module-profiles-manage-profiles';
/**
 * Re-renders the ManageModuleProfiles windows. This can be useful because profiles can be added/removed while the window is open, and re-rendering the
 * Application instance refreshes that data.
 * @returns {void}
 */
function reRenderManageModuleProfilesWindows() {
    Object.values(ui.windows)
        .filter(app => app.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
        .forEach(app => app.render());
}
/**
 * Forces the application to refresh the size of its first element (aka, the window content). This is primarily to be used whenever an Application adds or
 * removes elements so that the height of the Application is consistent with what is added.
 * @param {Application} app - The Application that needs to be resized.
 * @returns {void}
 */
function forceManageModuleProfilesHeightResize(app) {
    if (app?.element?.length > 0) {
        app.element[0].style.height = 'auto';
    }
}


/***/ }),

/***/ "./src/main/scripts/api.ts":
/*!*********************************!*\
  !*** ./src/main/scripts/api.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerApi": () => (/* binding */ registerApi)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * Registers the module's API. This is only meant to be called on initial game load.
 */
function registerApi() {
    const api = {
        getCurrentModuleConfiguration: _settings__WEBPACK_IMPORTED_MODULE_0__.getCurrentModuleConfiguration,
        getAllProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles,
        getActiveProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile,
        getProfileByName: _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName,
        exportAllProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.exportAllProfiles,
        exportProfileByName: _settings__WEBPACK_IMPORTED_MODULE_0__.exportProfileByName,
        createProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.createProfile,
        importProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.importProfiles,
        activateProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.activateProfile,
        saveChangesToProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile,
        deleteProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.deleteProfile,
        resetProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.resetProfiles
    };
    _settings_utils__WEBPACK_IMPORTED_MODULE_1__.registerAPI(api);
}


/***/ }),

/***/ "./src/main/scripts/browser-utils.ts":
/*!*******************************************!*\
  !*** ./src/main/scripts/browser-utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyToClipboard": () => (/* binding */ copyToClipboard)
/* harmony export */ });
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        }
        else {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = text;
            tempTextArea.setAttribute('readonly', '');
            tempTextArea.style.position = 'absolute';
            tempTextArea.style.left = '-99999px';
            tempTextArea.style.top = '-99999px';
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
        }
        return true;
    }
    catch (error) {
        ui.notifications.error('Unable to copy to clipboard. Please check console for details.');
        console.log(error);
        return false;
    }
}


/***/ }),

/***/ "./src/main/scripts/mapping-utils.ts":
/*!*******************************************!*\
  !*** ./src/main/scripts/mapping-utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToModuleInfos": () => (/* binding */ mapToModuleInfos),
/* harmony export */   "mapToModuleKeyIsActiveRecord": () => (/* binding */ mapToModuleKeyIsActiveRecord)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");

/**
 * Maps an array of ModuleInfo objects into a Record, identical to how the core module configuration stores which modules are active and which aren't.
 * @param {ModuleInfo[]} moduleInfos
 * @return {Record<string, boolean>} - The corresponding Record representation of the inputted data.
 */
function mapToModuleKeyIsActiveRecord(moduleInfos) {
    const record = {};
    moduleInfos.forEach(module => record[module.id] = module.isActive);
    return record;
}
/**
 * Maps a Record into an array of matching ModuleInfo objects stored in the game settings.
 * @param {Record<string, boolean>} moduleIDIsActiveRecord
 * @return {ModuleInfo[]} - The corresponding array of ModuleInfo objects based on the inputted data.
 */
function mapToModuleInfos(moduleIDIsActiveRecord) {
    const moduleInfos = [];
    Object.entries(moduleIDIsActiveRecord).forEach(([key, value]) => {
        moduleInfos.push({
            id: key,
            title: _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy().findModuleTitleFromModuleId(key),
            isActive: value,
        });
    });
    moduleInfos.sort((a, b) => {
        if (!a.title) {
            return 1;
        }
        if (!b.title) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    });
    return moduleInfos;
}


/***/ }),

/***/ "./src/main/scripts/profile-interactions.ts":
/*!**************************************************!*\
  !*** ./src/main/scripts/profile-interactions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateProfile": () => (/* binding */ activateProfile)
/* harmony export */ });
/* harmony import */ var _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _classes_ConfirmActivateProfileForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/ConfirmActivateProfileForm */ "./src/main/classes/ConfirmActivateProfileForm.ts");



/**
 * Activates the module profile with the given name. If changes are detected on an open Module Management window and shouldForce is false, a
 * {@link ConfirmActivateProfileForm} will be rendered instead to prevent losing unfinished work.
 * @param {string} profileName - The name of the module profile to activate.
 * @param {boolean} [shouldForce=false] - When true, will activate the profile without checking if the user will lose any unsaved work.
 * @returns {Application} - The confirmation Application when the user has work that may be overridden.
 */
function activateProfile(profileName, shouldForce = false) {
    if (!profileName) {
        const errorMessage = 'Unable to activate profile. Profile name undefined.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_1__.getActiveProfile();
    if (!shouldForce && _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__.isModuleManagementWindowOpen() && _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__.unsavedChangesExistOn(activeProfile.name)) {
        return new _classes_ConfirmActivateProfileForm__WEBPACK_IMPORTED_MODULE_2__["default"](profileName).render(true);
    }
    else {
        _settings__WEBPACK_IMPORTED_MODULE_1__.activateProfile(profileName);
    }
}


/***/ }),

/***/ "./src/main/scripts/settings-migration.ts":
/*!************************************************!*\
  !*** ./src/main/scripts/settings-migration.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "migrate": () => (/* binding */ migrate)
/* harmony export */ });
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-utils */ "./src/main/scripts/settings-utils.ts");

async function migrate() {
    const savedDataVersion = _settings_utils__WEBPACK_IMPORTED_MODULE_0__.getSettingsDataVersion();
    // @ts-expect-error - Correct way to grab version info in v13+
    const currentDataVersion = game.modules.get(_settings_utils__WEBPACK_IMPORTED_MODULE_0__.MODULE_ID)?.version;
    if (!isSettingsDataVersion(savedDataVersion) ||
        !isSettingsDataVersion(currentDataVersion) ||
        savedDataVersion === currentDataVersion) {
        console.debug(`Module Profiles: No migration necessary`, savedDataVersion, currentDataVersion);
        return;
    }
    if (savedDataVersion === '0.0.0') {
        const message = `Module Profiles: Migrating to newest data format...`;
        console.log(message);
        ui.notifications.info(message);
    }
    else {
        const message = `Module Profiles: Migrating v${savedDataVersion} -> v${currentDataVersion}`;
        console.log(message);
        ui.notifications.info(message);
    }
    const structuredSavedVersion = toStructuredVersion(savedDataVersion);
    const structuredCurrentVersion = toStructuredVersion(currentDataVersion);
    const migrationScripts = getApplicableMigrationScripts(structuredSavedVersion, structuredCurrentVersion);
    console.log(`Module Profiles: Migrating ${migrationScripts.length} script(s):`, migrationScripts.map(script => script.version).join(', '));
    const isRollbackScenario = isFirstGreaterThan(structuredSavedVersion, structuredCurrentVersion);
    const errors = [];
    for (const script of migrationScripts) {
        if (errors.length > 0) {
            continue;
        }
        if (isRollbackScenario) {
            try {
                await script.rollback();
                console.log(`Module Profiles: Migration ${script.version} was successful`);
            }
            catch (e) {
                console.error(`Module Profiles: Migration ${script.version} failed:`, e);
                errors.push(e);
            }
        }
        else {
            try {
                await script.migrate();
                console.log(`Module Profiles: Migration ${script.version} was successful`);
            }
            catch (e) {
                console.error(`Module Profiles: Migration ${script.version} failed:`, e);
                errors.push(e);
            }
        }
        if (errors.length === 0) {
            await _settings_utils__WEBPACK_IMPORTED_MODULE_0__.setSettingsDataVersion(script.version);
        }
    }
    if (errors.length === 0) {
        await _settings_utils__WEBPACK_IMPORTED_MODULE_0__.setSettingsDataVersion(currentDataVersion);
        ui.notifications.info(`Module Profiles: Migration to v${currentDataVersion} was successful`);
    }
    else {
        ui.notifications.error(`Module Profiles: Migration to v${currentDataVersion} failed, check console for details`);
    }
}
function toStructuredVersion(version) {
    const [major, minor, patch] = version.split('.');
    return {
        major: Number(major.replace(/\D/g, '')),
        minor: Number(minor.replace(/\D/g, '')),
        patch: Number(patch.replace(/\D/g, '')),
    };
}
/**
 * Migration scripts processed in-order (or reverse-order for rollbacks).
 */
const MIGRATIONS = [
    {
        version: '1.1.0',
        migrate: async () => {
            const profiles = _settings_utils__WEBPACK_IMPORTED_MODULE_0__.getProfiles();
            const newProfiles = profiles.map(profile => ({
                // @ts-expect-error - If `description` already exists, retain it
                description: '',
                ...profile,
            }));
            await _settings_utils__WEBPACK_IMPORTED_MODULE_0__.setProfiles(newProfiles);
        },
        rollback: async () => {
            // An extra "description" field doesn't hurt anything
        },
    },
];
function getApplicableMigrationScripts(fromVersion, toVersion) {
    const isRollbackScenario = isFirstGreaterThan(fromVersion, toVersion);
    if (isRollbackScenario) {
        return [...MIGRATIONS].reverse().filter(migration => {
            const migrationVersion = toStructuredVersion(migration.version);
            const isGreaterThanOrEqualToLowerBound = !isFirstGreaterThan(toVersion, migrationVersion);
            const isLessThanUpperBound = isFirstGreaterThan(fromVersion, migrationVersion);
            return isGreaterThanOrEqualToLowerBound && isLessThanUpperBound;
        });
    }
    return MIGRATIONS.filter(migration => {
        const migrationVersion = toStructuredVersion(migration.version);
        const isGreaterThanLowerBound = isFirstGreaterThan(migrationVersion, fromVersion);
        const isLessThanOrEqualToUpperBound = !isFirstGreaterThan(migrationVersion, toVersion);
        return isGreaterThanLowerBound && isLessThanOrEqualToUpperBound;
    });
}
/**
 * Returns `true` when the first version is higher than the second version, `false` when less than or equal to.
 */
function isFirstGreaterThan(firstVersion, secondVersion) {
    if (firstVersion.major > secondVersion.major) {
        return true;
    }
    if (firstVersion.major < secondVersion.major) {
        return false;
    }
    if (firstVersion.minor > secondVersion.minor) {
        return true;
    }
    if (firstVersion.minor < secondVersion.minor) {
        return false;
    }
    return firstVersion.patch > secondVersion.patch;
}
function isSettingsDataVersion(val) {
    if (val == null || typeof val !== 'string') {
        return false;
    }
    const subVersions = val.split('.');
    return subVersions.length === 3;
}


/***/ }),

/***/ "./src/main/scripts/settings-utils.ts":
/*!********************************************!*\
  !*** ./src/main/scripts/settings-utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_PROFILE_NAME": () => (/* binding */ DEFAULT_PROFILE_NAME),
/* harmony export */   "MODULE_ID": () => (/* binding */ MODULE_ID),
/* harmony export */   "TEMPLATES_PATH": () => (/* binding */ TEMPLATES_PATH),
/* harmony export */   "getActiveProfileName": () => (/* binding */ getActiveProfileName),
/* harmony export */   "getProfiles": () => (/* binding */ getProfiles),
/* harmony export */   "getSettingsDataVersion": () => (/* binding */ getSettingsDataVersion),
/* harmony export */   "getShowModuleIconAnimation": () => (/* binding */ getShowModuleIconAnimation),
/* harmony export */   "registerAPI": () => (/* binding */ registerAPI),
/* harmony export */   "registerMenus": () => (/* binding */ registerMenus),
/* harmony export */   "registerSettings": () => (/* binding */ registerSettings),
/* harmony export */   "reloadWindow": () => (/* binding */ reloadWindow),
/* harmony export */   "resetProfiles": () => (/* binding */ resetProfiles),
/* harmony export */   "setActiveProfileName": () => (/* binding */ setActiveProfileName),
/* harmony export */   "setProfiles": () => (/* binding */ setProfiles),
/* harmony export */   "setSettingsDataVersion": () => (/* binding */ setSettingsDataVersion),
/* harmony export */   "setShowModuleIconAnimation": () => (/* binding */ setShowModuleIconAnimation)
/* harmony export */ });
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");


const MODULE_ID = 'module-profiles';
const TEMPLATES_PATH = `modules/${MODULE_ID}/templates`;
const DEFAULT_PROFILE_NAME = 'Default Profile';
const PROFILES_SETTING = 'profiles';
const ACTIVE_PROFILE_NAME_SETTING = 'activeProfileName';
const SHOW_MODULE_ICON_ANIMATION_SETTING = 'showModuleIconAnimation';
const SETTINGS_DATA_VERSION_SETTING = 'settingsDataVersion';
/**
 * Registers settings for the module. This is only meant to be called on initial game load.
 */
function registerSettings() {
    game.settings.register(MODULE_ID, PROFILES_SETTING, {
        name: 'Profiles',
        hint: 'Existing module profiles',
        default: [buildDefaultProfile()],
        type: Array,
        scope: 'world',
    });
    game.settings.register(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, {
        name: 'Active Profile Name',
        default: DEFAULT_PROFILE_NAME,
        type: String,
        scope: 'world',
    });
    game.settings.register(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING, {
        name: 'Show Module Icon Animation',
        default: true,
        type: Boolean,
        scope: 'world',
        config: true,
    });
    game.settings.register(MODULE_ID, SETTINGS_DATA_VERSION_SETTING, {
        name: 'Settings Data Version (for migration purposes)',
        default: '0.0.0',
        type: String,
        scope: 'world',
    });
    function buildDefaultProfile() {
        const savedModuleConfiguration = _settings__WEBPACK_IMPORTED_MODULE_1__.getCurrentModuleConfiguration();
        return {
            name: DEFAULT_PROFILE_NAME,
            description: '',
            modules: savedModuleConfiguration,
        };
    }
}
/**
 * Registers menus for the module. This is only meant to be called on initial game load.
 */
function registerMenus() {
    game.settings.registerMenu(MODULE_ID, 'manageProfiles', {
        name: 'Manage Profiles',
        label: 'Manage Profiles',
        icon: 'fas fa-cog',
        type: _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__["default"],
        restricted: true,
    });
}
/**
 * Registers an API for the current module, accessible by `game.modules.get(MODULE_ID).api.*function()*`. This is meant to be called only on initial game load.
 * @param {Record<string, Function>} api - The API to expose.
 * @returns {void}
 */
function registerAPI(api) {
    // @ts-ignore - Not recognized due to Foundry object
    game.modules.get(MODULE_ID).api = api;
    console.debug(`${MODULE_ID} API registered`);
}
/**
 * Reloads the current window.
 * @returns {void}
 */
function reloadWindow() {
    window.location.reload();
}
/**
 * Get the Profiles game setting.
 * @return {ModuleProfile[]} - The value of the game setting.
 */
function getProfiles() {
    return game.settings.get(MODULE_ID, PROFILES_SETTING);
}
/**
 * Set the Profiles game setting.
 * @param {ModuleProfile[]} profiles - The value to save to the game setting.
 * @return {Promise<ModuleProfile[]>} - A Promise resolving to the new game setting value.
 */
async function setProfiles(profiles) {
    // Filter out references to modules that are no longer installed
    profiles.forEach(profile => profile.modules = profile.modules.filter(moduleInfo => moduleInfo.title !== undefined));
    // Sort profiles by profile name, and module infos by module title
    profiles.sort((a, b) => a.name.localeCompare(b.name));
    // @ts-ignore - undefined titles are filtered before this line
    profiles.forEach(profile => profile.modules.sort((a, b) => a.title.localeCompare(b.title)));
    return await game.settings.set(MODULE_ID, PROFILES_SETTING, profiles);
}
/**
 * Resets the Profiles game setting to the default profile.
 */
function resetProfiles() {
    return game.settings.set(MODULE_ID, PROFILES_SETTING, undefined);
}
/**
 * Get the Active Profile Name game setting.
 * @return {string} - The value of the game setting.
 */
function getActiveProfileName() {
    return game.settings.get(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING);
}
/**
 * Set the Active Profile Name game setting.
 * @param {string} activeProfileName - The value to save to the game setting.
 * @return {Promise<string>} - A Promise resolving to the new game setting value.
 */
function setActiveProfileName(activeProfileName) {
    return game.settings.set(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, activeProfileName);
}
/**
 * Get the Show Module Animation game setting.
 * @return {string} - The value of the game setting.
 */
function getShowModuleIconAnimation() {
    return game.settings.get(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING);
}
/**
 * Set the Show Module Animation game setting.
 * @param {boolean} showModuleAnimation - The value to save to the game setting.
 * @return {Promise<boolean>} - A Promise resolving to the new game setting value.
 */
function setShowModuleIconAnimation(showModuleAnimation) {
    return game.settings.set(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING, showModuleAnimation);
}
/**
 * Get the Settings Data Version game setting.
 * @return {string} - The value of the game setting.
 */
function getSettingsDataVersion() {
    return game.settings.get(MODULE_ID, SETTINGS_DATA_VERSION_SETTING);
}
/**
 * Set the Settings Data Version game setting.
 * @param {string} settingsDataVersion - The value to save to the game setting.
 * @return {Promise<string>} - A Promise resolving to the new game setting value.
 */
function setSettingsDataVersion(settingsDataVersion) {
    return game.settings.set(MODULE_ID, SETTINGS_DATA_VERSION_SETTING, settingsDataVersion);
}


/***/ }),

/***/ "./src/main/scripts/settings.ts":
/*!**************************************!*\
  !*** ./src/main/scripts/settings.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateProfile": () => (/* binding */ activateProfile),
/* harmony export */   "createProfile": () => (/* binding */ createProfile),
/* harmony export */   "deleteProfile": () => (/* binding */ deleteProfile),
/* harmony export */   "exportAllProfiles": () => (/* binding */ exportAllProfiles),
/* harmony export */   "exportProfileByName": () => (/* binding */ exportProfileByName),
/* harmony export */   "getActiveProfile": () => (/* binding */ getActiveProfile),
/* harmony export */   "getAllProfiles": () => (/* binding */ getAllProfiles),
/* harmony export */   "getCurrentModuleConfiguration": () => (/* binding */ getCurrentModuleConfiguration),
/* harmony export */   "getFoundryVersionStrategy": () => (/* binding */ getFoundryVersionStrategy),
/* harmony export */   "getProfileByName": () => (/* binding */ getProfileByName),
/* harmony export */   "getShowModuleIconAnimation": () => (/* binding */ getShowModuleIconAnimation),
/* harmony export */   "importProfiles": () => (/* binding */ importProfiles),
/* harmony export */   "registerModuleSettings": () => (/* binding */ registerModuleSettings),
/* harmony export */   "resetProfiles": () => (/* binding */ resetProfiles),
/* harmony export */   "saveChangesToProfile": () => (/* binding */ saveChangesToProfile),
/* harmony export */   "setCoreModuleConfiguration": () => (/* binding */ setCoreModuleConfiguration),
/* harmony export */   "setShowModuleIconAnimation": () => (/* binding */ setShowModuleIconAnimation)
/* harmony export */ });
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");
/* harmony import */ var _mapping_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings-utils */ "./src/main/scripts/settings-utils.ts");
/* harmony import */ var _settings_migration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-migration */ "./src/main/scripts/settings-migration.ts");
/* harmony import */ var _version_strategies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version-strategies */ "./src/main/scripts/version-strategies.ts");






async function registerModuleSettings() {
    _settings_utils__WEBPACK_IMPORTED_MODULE_3__.registerSettings();
    _settings_utils__WEBPACK_IMPORTED_MODULE_3__.registerMenus();
    await _settings_migration__WEBPACK_IMPORTED_MODULE_4__.migrate();
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles();
    if (!profiles || profiles.length === 0) {
        _settings__WEBPACK_IMPORTED_MODULE_2__.resetProfiles();
    }
}
/**
 * Gets the currently active modules from the core game settings.
 * @returns {ModuleInfo[]} - The currently-active module configuration.
 */
function getCurrentModuleConfiguration() {
    return _settings__WEBPACK_IMPORTED_MODULE_2__.getFoundryVersionStrategy().getCurrentModuleConfiguration();
}
/**
 * Gets all saved module profiles from the game settings.
 * @returns {ModuleProfile[]}
 */
function getAllProfiles() {
    return _settings_utils__WEBPACK_IMPORTED_MODULE_3__.getProfiles();
}
/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {ModuleProfile} - The currently-active module profile.
 */
function getActiveProfile() {
    const activeProfileName = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.getActiveProfileName();
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_2__.getProfileByName(activeProfileName);
    if (!activeProfile) {
        const errorMessage = 'Unable to load active profile. Please refresh the Foundry page.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    return activeProfile;
}
/**
 * Gets a saved profile from the game settings with the corresponding name.
 * @param {string} profileName - The name of the profile to return.
 * @returns {ModuleProfile | undefined} - The module profile with the given name, or `undefined` if none exists.
 */
function getProfileByName(profileName) {
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles();
    return profiles.find(profile => profile.name === profileName);
}
/**
 * Gets the array of saved profiles from the game settings in JSON format.
 * @return {string} - The JSON representation of the profile.
 */
function exportAllProfiles() {
    return JSON.stringify(_settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles(), null, 2);
}
/**
 * Gets a saved profile from the game settings in JSON format.
 * @param {string} profileName - The name of the profile to return.
 * @return {string | undefined} - The JSON representation of the profile, or `undefined` if none exists.
 */
function exportProfileByName(profileName) {
    const profile = _settings__WEBPACK_IMPORTED_MODULE_2__.getProfileByName(profileName);
    return profile ? JSON.stringify(profile, null, 2) : profile;
}
/**
 * Creates a new {@link ModuleProfile} in the game settings.
 * @param {CreateProfileParams} params - The profile params.
 * @returns {Promise<ModuleProfile[]>} - The new Array of {@link ModuleProfile}s.
 * @throws Error - When a profile exists with the given profileName
 */
async function createProfile({ name, description, modules }) {
    if (!name) {
        const postfix = name === '' ? 'Profile name must not be empty.' : 'Profile name is undefined.';
        const errorMessage = `Unable to create module profile. ${postfix}`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!modules) {
        const errorMessage = 'Unable to create module profile. Please refresh the page and try again.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (_settings__WEBPACK_IMPORTED_MODULE_2__.getProfileByName(name)) {
        const errorMessage = `Unable to create module profile. Profile "${name}" already exists!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles();
    profiles.push({ name: name, description: description, modules: modules });
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setProfiles(profiles);
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Profile "${name}" has been created!`);
    return response;
}
/**
 * Creates a {@link ModuleProfile} or multiple module profiles out of a JSON representation of those profiles.
 * @param {string} json - The JSON representation of a {@link ModuleProfile} or an Array of {@link ModuleProfile}[] objects.
 * @return {Promise<ModuleProfile[]>} - The saved array of module profiles in the game settings.
 */
async function importProfiles(json) {
    let profiles = JSON.parse(json);
    if (!Array.isArray(profiles)) {
        profiles = [profiles];
    }
    if (profiles.some(profile => !isValidModuleProfile(profile))) {
        const errorMessage = 'Unable to import profiles. Please re-export and try again.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    // Written this way to continue trying to create profiles, even when a previous profile could not be created
    for (const profile of profiles) {
        try {
            await _settings__WEBPACK_IMPORTED_MODULE_2__.createProfile(profile);
        }
        catch (ignored) {
        }
    }
    return _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles();
    function isValidModuleProfile(profile) {
        if (!profile || profile.name == null || profile.modules == null || profile.description == null) {
            return false;
        }
        return profile.modules.every(module => module.id && module.title && module.hasOwnProperty('isActive'));
    }
}
/**
 * Activates the profile with the given name, then reloads the page.
 * @param {string} profileName - The name of the module profile to load.
 * @returns {Promise<void>}
 * @throws {Error} - When profile name does not exist.
 */
async function activateProfile(profileName) {
    const profile = _settings__WEBPACK_IMPORTED_MODULE_2__.getProfileByName(profileName);
    if (!profile) {
        const errorMessage = `Unable to activate module profile. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setActiveProfileName(profile.name)
        .then(() => _settings__WEBPACK_IMPORTED_MODULE_2__.setCoreModuleConfiguration(profile.modules))
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_3__.reloadWindow());
}
/**
 * Saves the current profile settings to an existing profile.
 * @param {string} profileName - The name of the profile to update.
 * @param {UpdateProfileParams} params - New fields to update on the profile.
 * @returns {Promise<ModuleProfile[]>} - The new Array of module profiles.
 * @throws Error - When a profile name is passed and no profiles exist with that name.
 */
async function saveChangesToProfile(profileName, params) {
    const savedProfiles = _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles();
    const matchingProfileIndex = savedProfiles.findIndex(profile => profile.name === profileName);
    if (!savedProfiles[matchingProfileIndex]) {
        const errorMessage = `Unable to save module profile changes. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const existingProfile = savedProfiles[matchingProfileIndex];
    const newProfileName = params.name ?? existingProfile.name;
    savedProfiles[matchingProfileIndex] = {
        name: newProfileName,
        description: params.description ?? existingProfile.description,
        modules: params.modules ?? existingProfile.modules,
    };
    const activeProfileName = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.getActiveProfileName();
    if (activeProfileName === existingProfile.name) {
        await _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setActiveProfileName(newProfileName);
    }
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setProfiles(savedProfiles);
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Changes to profile "${newProfileName}" have been saved!`);
    return response;
}
/**
 * Deletes the profile with the given name. When the currently-active profile is deleted, the first profile is selected.
 * @param {string} profileName - The name of the profile to delete.
 * @return {Promise<ModuleProfile[] | undefined>} - The resulting value of the updated profiles setting, or `undefined` if no profiles remain.
 * @throws {Error} - When no profile with the given name exists.
 */
async function deleteProfile(profileName) {
    if (!_settings__WEBPACK_IMPORTED_MODULE_2__.getProfileByName(profileName)) {
        const errorMessage = `Unable to delete module profile. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const profilesToSave = _settings__WEBPACK_IMPORTED_MODULE_2__.getAllProfiles().filter(profile => profile.name !== profileName);
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setProfiles(profilesToSave);
    if (profilesToSave.length === 0) {
        await _settings__WEBPACK_IMPORTED_MODULE_2__.resetProfiles();
        return;
    }
    if (profileName === _settings_utils__WEBPACK_IMPORTED_MODULE_3__.getActiveProfileName()) {
        await _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setActiveProfileName(profilesToSave[0].name);
    }
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Profile "${profileName}" has been deleted!`);
    return response;
}
/**
 * Reset all module profiles to the default values. WARNING: Doing this leads to unrecoverable data loss.
 * @return {Promise<void>}
 */
async function resetProfiles() {
    await _settings_utils__WEBPACK_IMPORTED_MODULE_3__.resetProfiles()
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setActiveProfileName(_settings_utils__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_PROFILE_NAME))
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_3__.reloadWindow());
}
/**
 * Determine whether to show the module icon animations.
 */
function getShowModuleIconAnimation() {
    return _settings_utils__WEBPACK_IMPORTED_MODULE_3__.getShowModuleIconAnimation();
}
async function setShowModuleIconAnimation(showModuleAnimation) {
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_3__.setShowModuleIconAnimation(showModuleAnimation);
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_0__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Module icon animation has been ${showModuleAnimation ? 'enabled' : 'disabled'}`);
    return response;
}
async function setCoreModuleConfiguration(moduleInfos) {
    const moduleInfosToSave = _mapping_utils__WEBPACK_IMPORTED_MODULE_1__.mapToModuleKeyIsActiveRecord(moduleInfos);
    const coreModuleConfiguration = game.settings.get('core', 'moduleConfiguration');
    const mergedConfiguration = { ...coreModuleConfiguration, ...moduleInfosToSave };
    return await game.settings.set('core', 'moduleConfiguration', mergedConfiguration);
}
function getFoundryVersionStrategy() {
    const foundryVersion = game.version.split('.')[0];
    switch (foundryVersion) {
        case '9':
            return _version_strategies__WEBPACK_IMPORTED_MODULE_5__.v9;
        case '10':
            return _version_strategies__WEBPACK_IMPORTED_MODULE_5__.v10;
        case '11':
            return _version_strategies__WEBPACK_IMPORTED_MODULE_5__.v11;
        case '12':
            return _version_strategies__WEBPACK_IMPORTED_MODULE_5__.v12;
        case '13':
            return _version_strategies__WEBPACK_IMPORTED_MODULE_5__.v13;
        default:
            const errorMessage = `Module Profiles: Foundry version '${game.version}' is not supported. Please disable the Module Profiles module.`;
            ui.notifications.error(errorMessage);
            throw new Error(errorMessage);
    }
}


/***/ }),

/***/ "./src/main/scripts/ui/module-management-scripts.ts":
/*!**********************************************************!*\
  !*** ./src/main/scripts/ui/module-management-scripts.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkUpdateActiveProfileStatuses": () => (/* binding */ checkUpdateActiveProfileStatuses),
/* harmony export */   "isModuleManagementWindowOpen": () => (/* binding */ isModuleManagementWindowOpen),
/* harmony export */   "modifyModuleManagementRender": () => (/* binding */ modifyModuleManagementRender),
/* harmony export */   "refreshStatusElementsOnDependenciesClose": () => (/* binding */ refreshStatusElementsOnDependenciesClose),
/* harmony export */   "unsavedChangesExistOn": () => (/* binding */ unsavedChangesExistOn)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _mapping_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _module_management_scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");
/* harmony import */ var _classes_CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/CreateModuleProfileForm */ "./src/main/classes/CreateModuleProfileForm.ts");
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings-utils */ "./src/main/scripts/settings-utils.ts");






const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';
// TODO - Needs to be a separate function just for closeDialog instances. updateActiveProfileStatuses() should be exposed and performed when things are changed
function refreshStatusElementsOnDependenciesClose(app) {
    if (app.data.title === 'Dependencies') {
        updateAllStatusElements();
    }
}
// TODO - definitely test and rename ^^ that method accordingly
function checkUpdateActiveProfileStatuses() {
    if (_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.isModuleManagementWindowOpen()) {
        updateAllStatusElements();
    }
}
/**
 * Determines if changes exist on the Module Management window that don't align with a given profile.
 * @param {string} profileName
 * @returns {boolean} - Whether unsaved changes exist on the profile with the given name.
 */
function unsavedChangesExistOn(profileName) {
    const savedProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName);
    if (!savedProfile) {
        return false;
    }
    const unsavedModuleInfos = findUnsavedModuleInfos();
    return unsavedModuleInfos.some(unsavedModuleInfo => {
        const savedModuleInfo = savedProfile.modules.find(savedModuleInfo => savedModuleInfo.id === unsavedModuleInfo.id);
        return unsavedModuleInfo.isActive !== savedModuleInfo?.isActive;
    });
    // return Object.entries(unsavedModuleInfos).some(([moduleId, unsavedStatus]) => savedProfile.modules[moduleId] !== unsavedStatus);
}
/**
 * Determines if the Module Management window is open.
 * @returns {boolean} - Whether the Module Management window is open.
 */
function isModuleManagementWindowOpen() {
    return document.getElementById(MODULE_MANAGEMENT_WINDOW_ID) != null;
}
// TODO - test all
function modifyModuleManagementRender(app, html, data) {
    if (game.user?.isGM) {
        addFooterElements();
        modifyModuleListElements();
        updateAllStatusElements();
    }
    function addFooterElements() {
        // Create the elements
        const preFooterDiv = document.createElement('div');
        preFooterDiv.classList.add('module-profiles-footer-row');
        const statusButton = buildStatusButton();
        const saveCurrentConfigurationButton = buildCreateModuleProfileButton();
        const manageProfilesButton = buildManageProfilesButton();
        preFooterDiv.append(statusButton, saveCurrentConfigurationButton, manageProfilesButton);
        // Add elements just below the module list
        const moduleList = _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy().getModuleListContainer();
        _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy().injectManagementFooter(moduleList, preFooterDiv);
        // Update status of status buttons
        updateProfileStatusButtons();
        // Update the height of the window with the new elements
        forceModuleManagementWindowHeightResize();
        function buildStatusButton() {
            const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
            const statusButton = document.createElement('button');
            statusButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits form)
            statusButton.classList.add('module-profiles-status-button');
            statusButton.style.flexBasis = '40%';
            statusButton.dataset.profileName = activeProfile.name; // TODO - make this a little more... easier to find? idk
            statusButton.addEventListener('click', (event) => {
                event.preventDefault();
                const moduleInfos = findUnsavedModuleInfos();
                _settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile(activeProfile.name, { modules: moduleInfos })
                    .then(() => updateProfileStatusButtons());
            });
            return statusButton;
        }
        function buildCreateModuleProfileButton() {
            const createModuleProfileButton = document.createElement('button');
            createModuleProfileButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically
            // submits form)
            createModuleProfileButton.innerHTML = `<i class="fa fa-plus"></i> ${game.i18n.localize('MODULE_MANAGEMENT.createNewButton.text')}</button>`;
            createModuleProfileButton.style.flexBasis = '30%';
            createModuleProfileButton.style.marginLeft = '1rem';
            createModuleProfileButton.addEventListener('click', () => new _classes_CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__["default"]().render(true));
            return createModuleProfileButton;
        }
        function buildManageProfilesButton() {
            const manageProfilesButton = document.createElement('button');
            manageProfilesButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits
            // form)
            manageProfilesButton.style.flexBasis = '30%';
            manageProfilesButton.style.marginLeft = '1rem';
            manageProfilesButton.innerHTML = `<i class="fa fa-cog"></i> ${game.i18n.localize('MODULE_MANAGEMENT.manageModuleProfilesButton.text')}</button>`;
            manageProfilesButton.addEventListener('click', (event) => {
                event.preventDefault();
                new _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__["default"]().render(true);
            });
            return manageProfilesButton;
        }
        // TODO - combine with 'forceManageModuleProfilesHeightResize'?
        function forceModuleManagementWindowHeightResize() {
            Object.values(ui.windows)
                .filter(app => app.options.id === MODULE_MANAGEMENT_WINDOW_ID)
                .forEach(app => app.element[0].style.height = 'auto');
        }
    }
    function modifyModuleListElements() {
        const showAnimation = _settings__WEBPACK_IMPORTED_MODULE_0__.getShowModuleIconAnimation();
        const moduleElements = _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy().getModuleListElements();
        // Add status icons and add an "update" event listener to each module in the list
        moduleElements.forEach(module => {
            let statusIconContainer = createModuleStatusIcon();
            if (module.children.length > 0) {
                module.children[0].prepend(statusIconContainer);
                module.addEventListener('input', () => updateAllStatusElements());
            }
            else {
                console.log(`Error with ${_settings_utils__WEBPACK_IMPORTED_MODULE_5__.MODULE_ID} - invalid module`);
                console.log(module);
            }
        });
        function createModuleStatusIcon() {
            const span = document.createElement('span');
            span.classList.add('module-profiles-status-container');
            span.innerHTML = `<span class="module-profiles-status ${showAnimation ? 'module-profiles-status-animation' : ''} module-profiles-status-saved"></span>`;
            return span;
        }
    }
}
function updateAllStatusElements() {
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
    const modules = _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy().getModuleListElements();
    modules.forEach(module => {
        if (module.children[0]?.children[1]?.children[0]) // TODO - appropriately handle this
         {
            const statusIcon = module.children[0].children[0].firstChild;
            const checkbox = module.children[0].children[1].children[0];
            // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
            const matchingModuleInfo = activeProfile.modules.find(module => module.id === checkbox.attributes.name.value);
            if (matchingModuleInfo && matchingModuleInfo.isActive === checkbox.checked) {
                statusIcon.classList.remove('module-profiles-status-changed');
                statusIcon.classList.add('module-profiles-status-saved');
            }
            else {
                statusIcon.classList.remove('module-profiles-status-saved');
                statusIcon.classList.add('module-profiles-status-changed');
            }
        }
    });
    updateProfileStatusButtons();
}
function updateProfileStatusButtons() {
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
    const isUpToDate = !_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.unsavedChangesExistOn(activeProfile.name);
    const profileButtons = document.getElementsByClassName('module-profiles-status-button');
    Array.from(profileButtons).forEach(button => {
        const buttonProfileName = button.dataset.profileName;
        if (isUpToDate) {
            const statusButtonText = game.i18n.localize('MODULE_MANAGEMENT.statusButton.upToDate');
            button.style.backgroundColor = '';
            button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${(buttonProfileName)}</b> ${statusButtonText}`;
        }
        else {
            button.style.backgroundColor = 'orangered';
            button.innerHTML = `<i class="far fa-save"></i> ${game.i18n.localize('MODULE_MANAGEMENT.statusButton.saveChanges')} <b>${(buttonProfileName)}</b>`;
        }
        button.disabled = isUpToDate;
    });
}
function findUnsavedModuleInfos() {
    const moduleCheckboxes = _settings__WEBPACK_IMPORTED_MODULE_0__.getFoundryVersionStrategy()
        .getModuleListContainer()
        .querySelectorAll('input[type=checkbox]');
    const activeModuleIds = Array.from(moduleCheckboxes)
        .filter(checkbox => checkbox.checked)
        // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
        .map(checkbox => checkbox.attributes.name.value);
    const inactiveModuleIds = Array.from(moduleCheckboxes)
        .filter(checkbox => !checkbox.checked)
        // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
        .map(checkbox => checkbox.attributes.name.value);
    const moduleList = {};
    activeModuleIds.forEach(moduleId => moduleList[moduleId] = true);
    inactiveModuleIds.forEach(moduleId => moduleList[moduleId] = false);
    return _mapping_utils__WEBPACK_IMPORTED_MODULE_1__.mapToModuleInfos(moduleList);
}


/***/ }),

/***/ "./src/main/scripts/version-strategies.ts":
/*!************************************************!*\
  !*** ./src/main/scripts/version-strategies.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v10": () => (/* binding */ v10),
/* harmony export */   "v11": () => (/* binding */ v11),
/* harmony export */   "v12": () => (/* binding */ v12),
/* harmony export */   "v13": () => (/* binding */ v13),
/* harmony export */   "v9": () => (/* binding */ v9)
/* harmony export */ });
function getCurrentModuleConfigurationV9() {
    return Array.from(game.modules).map(([key, value]) => ({
        id: key,
        title: value.data.title,
        isActive: value.active,
    })).sort((a, b) => a.title.localeCompare(b.title));
}
function getModuleListElementsV9() {
    return document.querySelectorAll('#module-management li[data-module-name]');
}
function findModuleTitleFromModuleIdV9ToV11(moduleId) {
    return game.modules.get(moduleId)?.data.title;
}
function getCurrentModuleConfigurationV10Plus() {
    return Array.from(game.modules).map(module => ({
        // @ts-expect-error - v10+ schema
        id: module.id,
        // @ts-expect-error - v10+ schema
        title: module.title,
        // @ts-expect-error - v10+ schema
        isActive: module.active,
    })).sort((a, b) => a.title.localeCompare(b.title));
}
function getModuleListElementsV10Plus() {
    return document.querySelectorAll('#module-management li[data-module-id]');
}
function findModuleTitleFromModuleIdV12Plus(moduleId) {
    // @ts-expect-error - Title is inlined in the module object in v12
    return game.modules.get(moduleId)?.title;
}
function getModuleListContainerV9ToV12() {
    return document.getElementById('module-list');
}
function getModuleListContainerV13Plus() {
    return document.querySelector('.package-list');
}
function injectManagementFooterV9ToV12(moduleListContainer, footer) {
    moduleListContainer.after(footer);
}
function injectManagementFooterV13Plus(moduleListContainer, footer) {
    moduleListContainer.before(footer);
}
const v9 = {
    version: 9,
    getCurrentModuleConfiguration: getCurrentModuleConfigurationV9,
    findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
    getModuleListElements: getModuleListElementsV9,
    getModuleListContainer: getModuleListContainerV9ToV12,
    injectManagementFooter: injectManagementFooterV9ToV12,
};
const v10 = {
    version: 10,
    getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
    findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
    getModuleListElements: getModuleListElementsV10Plus,
    getModuleListContainer: getModuleListContainerV9ToV12,
    injectManagementFooter: injectManagementFooterV9ToV12,
};
const v11 = {
    version: 11,
    getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
    findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
    getModuleListElements: getModuleListElementsV10Plus,
    getModuleListContainer: getModuleListContainerV9ToV12,
    injectManagementFooter: injectManagementFooterV9ToV12,
};
const v12 = {
    version: 12,
    getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
    findModuleTitleFromModuleId: findModuleTitleFromModuleIdV12Plus,
    getModuleListElements: getModuleListElementsV10Plus,
    getModuleListContainer: getModuleListContainerV9ToV12,
    injectManagementFooter: injectManagementFooterV9ToV12,
};
const v13 = {
    version: 13,
    getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
    findModuleTitleFromModuleId: findModuleTitleFromModuleIdV12Plus,
    getModuleListElements: getModuleListElementsV10Plus,
    getModuleListContainer: getModuleListContainerV13Plus,
    injectManagementFooter: injectManagementFooterV13Plus,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/main/scripts/main.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/main/scripts/api.ts");
/* harmony import */ var _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");




// Module setup
Hooks.once('ready', _settings__WEBPACK_IMPORTED_MODULE_0__.registerModuleSettings);
Hooks.once('ready', _api__WEBPACK_IMPORTED_MODULE_1__.registerApi);
// Module Management window hooks
Hooks.on('renderModuleManagement', _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.modifyModuleManagementRender);
Hooks.on('closeDialog', _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.refreshStatusElementsOnDependenciesClose);
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME, _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.checkUpdateActiveProfileStatuses);
// Module Profiles Management window hooks
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME, _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.reRenderManageModuleProfilesWindows);
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.RENDER_HOOK_NAME, _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.forceManageModuleProfilesHeightResize);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLXByb2ZpbGVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBQ3VCO0FBQ1o7QUFDM0Q7QUFDQTtBQUNBO0FBQ2U7QUFDZixrREFBa0QsY0FBYztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBYyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtEQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMEVBQW1DO0FBQy9DO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ2dEO0FBQ1c7QUFDM0Q7QUFDQTtBQUNBO0FBQ2U7QUFDZixnREFBZ0QsY0FBYztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBYyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw0REFBc0I7QUFDL0M7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDZ0Q7QUFDVztBQUMzRDtBQUNBO0FBQ0E7QUFDZTtBQUNmLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBYyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw0REFBc0I7QUFDL0M7QUFDQTtBQUNBLHlCQUF5Qiw0RUFBc0M7QUFDL0QsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENnRDtBQUNTO0FBQ0U7QUFDM0Q7QUFDQTtBQUNBO0FBQ2U7QUFDZix3Q0FBd0MsY0FBYztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1FQUFjLENBQUM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrREFBeUI7QUFDakQ7QUFDQSw0REFBNEQsaUJBQWlCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrRUFBK0U7QUFDL0YscUJBQXFCLG1FQUE2QjtBQUNsRDtBQUNBO0FBQ0EscUJBQXFCLG9FQUE2QjtBQUNsRCxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2dEO0FBQ1c7QUFDNUM7QUFDZiwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsbUVBQWMsQ0FBQztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw2REFBdUI7QUFDMUM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmdEO0FBQ3VCO0FBQ2Q7QUFDTztBQUNFO0FBQ047QUFDSTtBQUNMO0FBQ3BEO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDZTtBQUNmLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBYyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsK0RBQXlCO0FBQzNELHVDQUF1Qyw2REFBdUI7QUFDOUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsZ0VBQXVCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUF1QjtBQUN2QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0VBQTBCO0FBQy9EO0FBQ0Esc0JBQXNCLG1FQUE0QjtBQUNsRDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUdBQXVHLDBFQUFtQztBQUMxSTtBQUNBLHVHQUF1Ryw4REFBcUI7QUFDNUg7QUFDQTtBQUNBLDRCQUE0QiwrREFBeUI7QUFDckQ7QUFDQSx1QkFBdUIsNERBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msa0VBQTRCO0FBQ2hFO0FBQ0Esc0JBQXNCLG1FQUE0QjtBQUNsRCxrREFBa0QsWUFBWTtBQUM5RDtBQUNBLFNBQVM7QUFDVDtBQUNBLDJHQUEyRyxpRUFBd0I7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSHVDO0FBQ1c7QUFDbEQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHVDQUF1QyxvRUFBc0M7QUFDN0Usd0JBQXdCLHFEQUF1QjtBQUMvQywwQkFBMEIsdURBQXlCO0FBQ25ELDBCQUEwQix1REFBeUI7QUFDbkQsMkJBQTJCLHdEQUEwQjtBQUNyRCw2QkFBNkIsMERBQTRCO0FBQ3pELHVCQUF1QixvREFBc0I7QUFDN0Msd0JBQXdCLHFEQUF1QjtBQUMvQyx5QkFBeUIsc0RBQXdCO0FBQ2pELDhCQUE4QiwyREFBNkI7QUFDM0QsdUJBQXVCLG9EQUFzQjtBQUM3Qyx1QkFBdUIsb0RBQXNCO0FBQzdDO0FBQ0EsSUFBSSx3REFBeUI7QUFDN0I7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnVDO0FBQ3ZDO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsWUFBWSx5QkFBeUI7QUFDckM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcseUJBQXlCO0FBQ3BDLFlBQVksY0FBYztBQUMxQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQWtDO0FBQ3JEO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DMEU7QUFDbkM7QUFDd0M7QUFDL0U7QUFDQTtBQUNBLElBQUksa0NBQWtDO0FBQ3RDLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsYUFBYSxhQUFhO0FBQzFCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVEQUF5QjtBQUNuRCx3QkFBd0IsdUZBQW9ELE1BQU0sZ0ZBQTZDO0FBQy9ILG1CQUFtQiwyRUFBMEI7QUFDN0M7QUFDQTtBQUNBLFFBQVEsc0RBQXdCO0FBQ2hDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QmtEO0FBQzNDO0FBQ1AsNkJBQTZCLG1FQUFvQztBQUNqRTtBQUNBLGdEQUFnRCxzREFBdUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGtCQUFrQixNQUFNLG1CQUFtQjtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxnQkFBZ0I7QUFDMUU7QUFDQTtBQUNBLDREQUE0RCxnQkFBZ0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGdCQUFnQjtBQUMxRTtBQUNBO0FBQ0EsNERBQTRELGdCQUFnQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtRUFBb0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtRUFBb0M7QUFDbEQsZ0VBQWdFLG9CQUFvQjtBQUNwRjtBQUNBO0FBQ0EsaUVBQWlFLG9CQUFvQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdEQUF5QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixrQkFBa0Isd0RBQXlCO0FBQzNDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEkyRjtBQUNwRDtBQUNoQztBQUNBLGtDQUFrQyxVQUFVO0FBQzVDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUNBQXlDLG9FQUFzQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGlGQUFnQztBQUM5QztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxXQUFXLDBCQUEwQjtBQUNyQyxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQkFBaUI7QUFDN0I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUIsWUFBWSwwQkFBMEI7QUFDdEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLGlCQUFpQjtBQUM3QjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksa0JBQWtCO0FBQzlCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxpQkFBaUI7QUFDN0I7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSmdHO0FBQ2hEO0FBQ1Q7QUFDVztBQUNRO0FBQ0k7QUFDdkQ7QUFDUCxJQUFJLDZEQUE4QjtBQUNsQyxJQUFJLDBEQUEyQjtBQUMvQixVQUFVLHdEQUF5QjtBQUNuQyxxQkFBcUIscURBQXVCO0FBQzVDO0FBQ0EsUUFBUSxvREFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDTztBQUNQLFdBQVcsZ0VBQWtDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNPO0FBQ1AsV0FBVyx3REFBeUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ087QUFDUCw4QkFBOEIsaUVBQWtDO0FBQ2hFLDBCQUEwQix1REFBeUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsMkJBQTJCO0FBQ3hDO0FBQ087QUFDUCxxQkFBcUIscURBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUCwwQkFBMEIscURBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLG9CQUFvQjtBQUNoQztBQUNPO0FBQ1Asb0JBQW9CLHVEQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsMEJBQTBCLG9CQUFvQixvQkFBb0I7QUFDL0U7QUFDQTtBQUNPLCtCQUErQiw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBLGlFQUFpRSxRQUFRO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUF5QjtBQUNqQywwRUFBMEUsS0FBSztBQUMvRTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscURBQXVCO0FBQzVDLG9CQUFvQix3REFBd0Q7QUFDNUUscUJBQXFCLHdEQUF5QjtBQUM5QyxzQ0FBc0Msd0dBQWlDO0FBQ3ZFLHNDQUFzQyxLQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DLFdBQVcsUUFBUSxxQ0FBcUMscUJBQXFCLGdCQUFnQixvQkFBb0I7QUFDakgsWUFBWSwwQkFBMEI7QUFDdEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixvREFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFEQUF1QjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiLFlBQVksT0FBTztBQUNuQjtBQUNPO0FBQ1Asb0JBQW9CLHVEQUF5QjtBQUM3QztBQUNBLDRFQUE0RSxZQUFZO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQWtDO0FBQ3RDLG9CQUFvQixpRUFBbUM7QUFDdkQsb0JBQW9CLHlEQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNPO0FBQ1AsMEJBQTBCLHFEQUF1QjtBQUNqRDtBQUNBO0FBQ0EsZ0ZBQWdGLFlBQVk7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaUVBQWtDO0FBQ2hFO0FBQ0EsY0FBYyxpRUFBa0M7QUFDaEQ7QUFDQSxxQkFBcUIsd0RBQXlCO0FBQzlDLHNDQUFzQyx3R0FBaUM7QUFDdkUsaURBQWlELGVBQWU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxzQ0FBc0M7QUFDbEQsWUFBWSxPQUFPO0FBQ25CO0FBQ087QUFDUCxTQUFTLHVEQUF5QjtBQUNsQywwRUFBMEUsWUFBWTtBQUN0RjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscURBQXVCO0FBQ2xELHFCQUFxQix3REFBeUI7QUFDOUM7QUFDQSxjQUFjLG9EQUFzQjtBQUNwQztBQUNBO0FBQ0Esd0JBQXdCLGlFQUFrQztBQUMxRCxjQUFjLGlFQUFrQztBQUNoRDtBQUNBLHNDQUFzQyx3R0FBaUM7QUFDdkUsc0NBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQLFVBQVUsMERBQTJCO0FBQ3JDLG9CQUFvQixpRUFBa0MsQ0FBQyxpRUFBa0M7QUFDekYsb0JBQW9CLHlEQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsV0FBVyx1RUFBd0M7QUFDbkQ7QUFDTztBQUNQLHFCQUFxQix1RUFBd0M7QUFDN0Qsc0NBQXNDLHdHQUFpQztBQUN2RSw0REFBNEQsNkNBQTZDO0FBQ3pHO0FBQ0E7QUFDTztBQUNQLDhCQUE4Qix3RUFBeUM7QUFDdkU7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFFO0FBQ3JCO0FBQ0EsbUJBQW1CLG9EQUFHO0FBQ3RCO0FBQ0EsbUJBQW1CLG9EQUFHO0FBQ3RCO0FBQ0EsbUJBQW1CLG9EQUFHO0FBQ3RCO0FBQ0EsbUJBQW1CLG9EQUFHO0FBQ3RCO0FBQ0Esc0VBQXNFLGFBQWE7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UHdDO0FBQ1M7QUFDc0I7QUFDdUI7QUFDbEI7QUFDOUI7QUFDOUM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsUUFBUSxvRkFBb0Q7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDTztBQUNQLHlCQUF5Qix1REFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnRUFBa0M7QUFDN0QsUUFBUSxnRUFBa0M7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1REFBeUI7QUFDM0Q7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMkRBQTZCLHVCQUF1QixzQkFBc0I7QUFDMUY7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQSxnRkFBZ0YsNkRBQTZEO0FBQzdJO0FBQ0E7QUFDQSwwRUFBMEUsd0VBQXVCO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSx3RUFBd0U7QUFDbEo7QUFDQTtBQUNBLG9CQUFvQixpRkFBZ0M7QUFDcEQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGlFQUFtQztBQUNqRSwrQkFBK0IsZ0VBQWtDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsc0RBQVMsRUFBRTtBQUNyRDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSx5REFBeUQ7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1REFBeUI7QUFDbkQsb0JBQW9CLGdFQUFrQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdURBQXlCO0FBQ25ELHdCQUF3Qiw2RUFBNkM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUdBQXFHLG9CQUFvQixPQUFPLGlCQUFpQjtBQUNqSjtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsa0VBQWtFLEtBQUssb0JBQW9CO0FBQ3pKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZCQUE2QixnRUFBa0M7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDREQUE2QjtBQUN4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ051QztBQUNWO0FBQzZDO0FBQytCO0FBQ3pHO0FBQ0Esb0JBQW9CLDZEQUErQjtBQUNuRCxvQkFBb0IsNkNBQWU7QUFDbkM7QUFDQSxtQ0FBbUMsdUZBQW9EO0FBQ3ZGLHdCQUF3QixtR0FBZ0U7QUFDeEYsU0FBUyx3R0FBMkUsRUFBRSwyRkFBd0Q7QUFDOUk7QUFDQSxTQUFTLHdHQUEyRSxFQUFFLDBHQUE2RTtBQUNuSyxTQUFTLHVGQUEwRCxFQUFFLDRHQUErRSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL2NsYXNzZXMvQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vY2xhc3Nlcy9Db25maXJtRGVsZXRlUHJvZmlsZUZvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vY2xhc3Nlcy9DcmVhdGVNb2R1bGVQcm9maWxlRm9ybS50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9jbGFzc2VzL0VkaXRNb2R1bGVQcm9maWxlRm9ybS50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9jbGFzc2VzL0ltcG9ydE1vZHVsZVByb2ZpbGVGb3JtLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9hcGkudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9icm93c2VyLXV0aWxzLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL3NjcmlwdHMvbWFwcGluZy11dGlscy50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9zY3JpcHRzL3Byb2ZpbGUtaW50ZXJhY3Rpb25zLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL3NjcmlwdHMvc2V0dGluZ3MtbWlncmF0aW9uLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL3NjcmlwdHMvc2V0dGluZ3MtdXRpbHMudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9zY3JpcHRzL3VpL21vZHVsZS1tYW5hZ2VtZW50LXNjcmlwdHMudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy92ZXJzaW9uLXN0cmF0ZWdpZXMudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MnO1xuaW1wb3J0ICogYXMgUHJvZmlsZUludGVyYWN0aW9ucyBmcm9tICcuLi9zY3JpcHRzL3Byb2ZpbGUtaW50ZXJhY3Rpb25zJztcbmltcG9ydCB7IFRFTVBMQVRFU19QQVRIIH0gZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncy11dGlscyc7XG4vKipcbiAqIEEgRm9ybUFwcGxpY2F0aW9uIHRvIGJlIHJlbmRlcmVkIHdoZW4geW91IHdhbnQgYSB1c2VyJ3MgY29uZmlybWF0aW9uIHRoYXQgeWVzLCBpbiBmYWN0LCB0aGV5ICpkbyogd2FudCB0byBhY3RpdmF0ZSBzYWlkIHByb2ZpbGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1BY3RpdmF0ZVByb2ZpbGVGb3JtIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9maWxlTmFtZVRvQWN0aXZhdGUsIG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9maWxlTmFtZVRvQWN0aXZhdGUgPSBwcm9maWxlTmFtZVRvQWN0aXZhdGU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRDbGFzc2VzID0gcGFyZW50Py5jbGFzc2VzID8/IFtdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucGFyZW50LFxuICAgICAgICAgICAgY2xhc3NlczogWy4uLnBhcmVudENsYXNzZXMsICdtb2R1bGUtcHJvZmlsZXMtZm9ybSddLFxuICAgICAgICAgICAgaWQ6ICdtb2R1bGUtcHJvZmlsZXMtY29uZmlybS1hY3RpdmF0ZS1wcm9maWxlJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgJHtURU1QTEFURVNfUEFUSH0vY29uZmlybS1hY3RpdmF0ZS1wcm9maWxlLmhic2AsXG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0gQWN0aXZhdGUgUHJvZmlsZScsXG4gICAgICAgICAgICB3aWR0aDogNjYwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9maWxlTmFtZVRvQWN0aXZhdGU6IHRoaXMucHJvZmlsZU5hbWVUb0FjdGl2YXRlLFxuICAgICAgICAgICAgYWN0aXZlUHJvZmlsZU5hbWU6IFNldHRpbmdzLmdldEFjdGl2ZVByb2ZpbGUoKS5uYW1lXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Py5zdWJtaXR0ZXI/LmlkID09PSAnbW9kdWxlUHJvZmlsZXNBY3RpdmF0ZVByb2ZpbGVTdWJtaXQnKSB7XG4gICAgICAgICAgICBQcm9maWxlSW50ZXJhY3Rpb25zLmFjdGl2YXRlUHJvZmlsZSh0aGlzLnByb2ZpbGVOYW1lVG9BY3RpdmF0ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcbmltcG9ydCB7IFRFTVBMQVRFU19QQVRIIH0gZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncy11dGlscyc7XG4vKipcbiAqIEEgRm9ybUFwcGxpY2F0aW9uIHRvIGJlIHJlbmRlcmVkIHdoZW4geW91IHdhbnQgYSB1c2VyJ3MgY29uZmlybWF0aW9uIHRoYXQgeWVzLCBpbiBmYWN0LCB0aGV5ICpkbyogd2FudCB0byBkZWxldGUgc2FpZCBwcm9maWxlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtRGVsZXRlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHByb2ZpbGVOYW1lVG9EZWxldGUsIG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9maWxlTmFtZVRvRGVsZXRlID0gcHJvZmlsZU5hbWVUb0RlbGV0ZTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHBhcmVudENsYXNzZXMgPSBwYXJlbnQ/LmNsYXNzZXMgPz8gW107XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5wYXJlbnQsXG4gICAgICAgICAgICBjbGFzc2VzOiBbLi4ucGFyZW50Q2xhc3NlcywgJ21vZHVsZS1wcm9maWxlcy1mb3JtJ10sXG4gICAgICAgICAgICBpZDogJ21vZHVsZS1wcm9maWxlcy1jb25maXJtLWRlbGV0ZS1wcm9maWxlJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgJHtURU1QTEFURVNfUEFUSH0vY29uZmlybS1kZWxldGUtcHJvZmlsZS5oYnNgLFxuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtIERlbGV0ZSBQcm9maWxlJyxcbiAgICAgICAgICAgIHdpZHRoOiA2NjBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2ZpbGVOYW1lVG9EZWxldGU6IHRoaXMucHJvZmlsZU5hbWVUb0RlbGV0ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBUT0RPIC0gYnVnLCBuYW1lIGZvciBidXR0b24gb24gbW9kdWxlIG1hbmFnZW1lbnQgZG9lcyBub3QgdXBkYXRlIHdoZW4gYWN0aXZlIHByb2ZpbGUgbmFtZSBzd2l0Y2hlc1xuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Py5zdWJtaXR0ZXI/LmlkID09PSAnbW9kdWxlUHJvZmlsZXNEZWxldGVQcm9maWxlU3VibWl0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFNldHRpbmdzLmRlbGV0ZVByb2ZpbGUodGhpcy5wcm9maWxlTmFtZVRvRGVsZXRlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgVEVNUExBVEVTX1BBVEggfSBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzLXV0aWxzJztcbi8qKlxuICogQSBGb3JtQXBwbGljYXRpb24gdGhhdCBhbGxvd3MgYSB1c2VyIHRvIGNyZWF0ZSBhIG5ldyBtb2R1bGUgcHJvZmlsZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHBhcmVudENsYXNzZXMgPSBwYXJlbnQ/LmNsYXNzZXMgPz8gW107XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5wYXJlbnQsXG4gICAgICAgICAgICBjbGFzc2VzOiBbLi4ucGFyZW50Q2xhc3NlcywgJ21vZHVsZS1wcm9maWxlcy1mb3JtJ10sXG4gICAgICAgICAgICBpZDogJ21vZHVsZS1wcm9maWxlcy1jcmVhdGUtbW9kdWxlLXByb2ZpbGUnLFxuICAgICAgICAgICAgdGVtcGxhdGU6IGAke1RFTVBMQVRFU19QQVRIfS9jcmVhdGUtbW9kdWxlLXByb2ZpbGUuaGJzYCxcbiAgICAgICAgICAgIHRpdGxlOiAnQ3JlYXRlIE5ldyBNb2R1bGUgUHJvZmlsZScsXG4gICAgICAgICAgICB3aWR0aDogNjYwLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhY3RpdmF0ZUxpc3RlbmVycyhodG1sKSB7XG4gICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICBzdXBlci5hY3RpdmF0ZUxpc3RlbmVycyhodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kdWxlUHJvZmlsZXNDcmVhdGVOZXdQcm9maWxlTmFtZScpLmZvY3VzKCk7XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQsIGZvcm1EYXRhKSB7XG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCA9PT0gJ21vZHVsZVByb2ZpbGVzQ3JlYXRlTmV3UHJvZmlsZVN1Ym1pdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBTZXR0aW5ncy5jcmVhdGVQcm9maWxlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmb3JtRGF0YS5tb2R1bGVQcm9maWxlc0NyZWF0ZU5ld1Byb2ZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBmb3JtRGF0YS5tb2R1bGVQcm9maWxlc0NyZWF0ZU5ld1Byb2ZpbGVEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBTZXR0aW5ncy5nZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbigpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcbmltcG9ydCAqIGFzIE1hcHBpbmdVdGlscyBmcm9tICcuLi9zY3JpcHRzL21hcHBpbmctdXRpbHMnO1xuaW1wb3J0IHsgVEVNUExBVEVTX1BBVEggfSBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzLXV0aWxzJztcbi8qKlxuICogQSBGb3JtQXBwbGljYXRpb24gdGhhdCBhbGxvd3MgYSB1c2VyIHRvIGVkaXQgYSBtb2R1bGUgcHJvZmlsZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdE1vZHVsZVByb2ZpbGVGb3JtIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9maWxlTmFtZSwgb2JqZWN0ID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb2ZpbGVOYW1lID0gcHJvZmlsZU5hbWU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRDbGFzc2VzID0gcGFyZW50Py5jbGFzc2VzID8/IFtdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucGFyZW50LFxuICAgICAgICAgICAgY2xhc3NlczogWy4uLnBhcmVudENsYXNzZXMsICdtb2R1bGUtcHJvZmlsZXMtZm9ybSddLFxuICAgICAgICAgICAgaWQ6ICdtb2R1bGUtcHJvZmlsZXMtZWRpdC1tb2R1bGUtcHJvZmlsZScsXG4gICAgICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYCR7VEVNUExBVEVTX1BBVEh9L2VkaXQtbW9kdWxlLXByb2ZpbGUuaGJzYCxcbiAgICAgICAgICAgIHRpdGxlOiAnRWRpdCBNb2R1bGUgUHJvZmlsZScsXG4gICAgICAgICAgICB3aWR0aDogNDUwLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXREYXRhKCkge1xuICAgICAgICBjb25zdCBwcm9maWxlID0gU2V0dGluZ3MuZ2V0UHJvZmlsZUJ5TmFtZSh0aGlzLnByb2ZpbGVOYW1lKTtcbiAgICAgICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgVW5hYmxlIHRvIGxvYWQgcHJvZmlsZSBcIiR7dGhpcy5wcm9maWxlTmFtZX1cIi4gUGxlYXNlIGNsb3NlIHRoZSB3aW5kb3cgYW5kIHRyeSBhZ2Fpbi5gO1xuICAgICAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2ZpbGU7XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQsIGZvcm1EYXRhKSB7XG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCAhPT0gJ21vZHVsZVByb2ZpbGVzRWRpdFByb2ZpbGVTdWJtaXQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBtb2R1bGVQcm9maWxlc0VkaXRQcm9maWxlTmFtZSwgbW9kdWxlUHJvZmlsZXNFZGl0UHJvZmlsZURlc2NyaXB0aW9uLCAuLi5yZXN0IH0gPSBmb3JtRGF0YTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNldHRpbmdzLnNhdmVDaGFuZ2VzVG9Qcm9maWxlKHRoaXMucHJvZmlsZU5hbWUsIHtcbiAgICAgICAgICAgIG5hbWU6IG1vZHVsZVByb2ZpbGVzRWRpdFByb2ZpbGVOYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG1vZHVsZVByb2ZpbGVzRWRpdFByb2ZpbGVEZXNjcmlwdGlvbixcbiAgICAgICAgICAgIG1vZHVsZXM6IE1hcHBpbmdVdGlscy5tYXBUb01vZHVsZUluZm9zKHJlc3QpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcbmltcG9ydCB7IFRFTVBMQVRFU19QQVRIIH0gZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncy11dGlscyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbXBvcnRNb2R1bGVQcm9maWxlRm9ybSBleHRlbmRzIEZvcm1BcHBsaWNhdGlvbiB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0ID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBzdXBlci5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgY29uc3QgcGFyZW50Q2xhc3NlcyA9IHBhcmVudD8uY2xhc3NlcyA/PyBbXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnBhcmVudCxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsuLi5wYXJlbnRDbGFzc2VzLCAnbW9kdWxlLXByb2ZpbGVzLWZvcm0nXSxcbiAgICAgICAgICAgIGlkOiAnbW9kdWxlLXByb2ZpbGVzLWltcG9ydC1tb2R1bGUtcHJvZmlsZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYCR7VEVNUExBVEVTX1BBVEh9L2ltcG9ydC1tb2R1bGUtcHJvZmlsZS5oYnNgLFxuICAgICAgICAgICAgdGl0bGU6ICdJbXBvcnQgTW9kdWxlIFByb2ZpbGUocyknLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICB3aWR0aDogNjYwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQsIGZvcm1EYXRhKSB7XG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCA9PT0gJ21vZHVsZVByb2ZpbGVzSW1wb3J0UHJvZmlsZVN1Ym1pdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBTZXR0aW5ncy5pbXBvcnRQcm9maWxlcyhmb3JtRGF0YVsnaW1wb3J0LW1vZHVsZS1wcm9maWxlLXRleHQnXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcbmltcG9ydCAqIGFzIFByb2ZpbGVJbnRlcmFjdGlvbnMgZnJvbSAnLi4vc2NyaXB0cy9wcm9maWxlLWludGVyYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBCcm93c2VyVXRpbHMgZnJvbSAnLi4vc2NyaXB0cy9icm93c2VyLXV0aWxzJztcbmltcG9ydCBDcmVhdGVNb2R1bGVQcm9maWxlRm9ybSBmcm9tICcuL0NyZWF0ZU1vZHVsZVByb2ZpbGVGb3JtJztcbmltcG9ydCBDb25maXJtRGVsZXRlUHJvZmlsZUZvcm0gZnJvbSAnLi9Db25maXJtRGVsZXRlUHJvZmlsZUZvcm0nO1xuaW1wb3J0IEVkaXRNb2R1bGVQcm9maWxlRm9ybSBmcm9tICcuL0VkaXRNb2R1bGVQcm9maWxlRm9ybSc7XG5pbXBvcnQgSW1wb3J0TW9kdWxlUHJvZmlsZUZvcm0gZnJvbSAnLi9JbXBvcnRNb2R1bGVQcm9maWxlRm9ybSc7XG5pbXBvcnQgeyBURU1QTEFURVNfUEFUSCB9IGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MtdXRpbHMnO1xuZXhwb3J0IGNvbnN0IFJFTkRFUl9IT09LX05BTUUgPSAncmVuZGVyTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0nO1xuZXhwb3J0IGNvbnN0IE1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSA9ICdtb2R1bGVQcm9maWxlc1VwZGF0ZWQnO1xuLyoqXG4gKiBBIEZvcm1BcHBsaWNhdGlvbiB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgYSB1c2VyIHRvIG1hbmFnZSBtb2R1bGUgcHJvZmlsZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRDbGFzc2VzID0gcGFyZW50Py5jbGFzc2VzID8/IFtdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucGFyZW50LFxuICAgICAgICAgICAgY2xhc3NlczogWy4uLnBhcmVudENsYXNzZXMsICdtb2R1bGUtcHJvZmlsZXMtZm9ybSddLFxuICAgICAgICAgICAgaWQ6IHRoaXMuRk9STV9JRCxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgJHtURU1QTEFURVNfUEFUSH0vbWFuYWdlLXByb2ZpbGVzLmhic2AsXG4gICAgICAgICAgICB0aXRsZTogJ01hbmFnZSBNb2R1bGUgUHJvZmlsZXMnLFxuICAgICAgICAgICAgd2lkdGg6IDY2MCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvZmlsZU5hbWUgPSBTZXR0aW5ncy5nZXRBY3RpdmVQcm9maWxlKCkubmFtZTtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNXaXRoQWN0aXZlRmxhZyA9IFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCkubWFwKHByb2ZpbGUgPT4gKHtcbiAgICAgICAgICAgIC4uLnByb2ZpbGUsXG4gICAgICAgICAgICBpc1Byb2ZpbGVBY3RpdmU6IGFjdGl2ZVByb2ZpbGVOYW1lID09PSBwcm9maWxlLm5hbWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2ZpbGVzOiBwcm9maWxlc1dpdGhBY3RpdmVGbGFnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhY3RpdmF0ZUxpc3RlbmVycyhodG1sKSB7XG4gICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICBzdXBlci5hY3RpdmF0ZUxpc3RlbmVycyhodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjcmVhdGVOZXdQcm9maWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2R1bGUtcHJvZmlsZXMtbWFuYWdlLXByb2ZpbGVzLWNyZWF0ZS1uZXcnKTtcbiAgICAgICAgY3JlYXRlTmV3UHJvZmlsZUVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmV3IENyZWF0ZU1vZHVsZVByb2ZpbGVGb3JtKCkucmVuZGVyKHRydWUpKTtcbiAgICAgICAgY29uc3QgaW1wb3J0UHJvZmlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kdWxlLXByb2ZpbGVzLW1hbmFnZS1wcm9maWxlcy1pbXBvcnQnKTtcbiAgICAgICAgaW1wb3J0UHJvZmlsZUVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIFByZXZlbnRzIHdpbmRvdyBmcm9tIGF1dG9tYXRpY2FsbHkgY2xvc2luZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbmV3IEltcG9ydE1vZHVsZVByb2ZpbGVGb3JtKCkucmVuZGVyKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhwb3J0QWxsUHJvZmlsZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZHVsZS1wcm9maWxlcy1tYW5hZ2UtcHJvZmlsZXMtZXhwb3J0LWFsbCcpO1xuICAgICAgICBleHBvcnRBbGxQcm9maWxlc0VsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIFByZXZlbnRzIHdpbmRvdyBmcm9tIGF1dG9tYXRpY2FsbHkgY2xvc2luZ1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQcm9maWxlcyA9IFNldHRpbmdzLmV4cG9ydEFsbFByb2ZpbGVzKCk7XG4gICAgICAgICAgICBpZiAoZXhwb3J0ZWRQcm9maWxlcykge1xuICAgICAgICAgICAgICAgIGF3YWl0IEJyb3dzZXJVdGlscy5jb3B5VG9DbGlwYm9hcmQoZXhwb3J0ZWRQcm9maWxlcyk7XG4gICAgICAgICAgICAgICAgdWkubm90aWZpY2F0aW9ucy5pbmZvKGBBbGwgcHJvZmlsZXMgaGF2ZSBiZWVuIGNvcGllZCB0byBjbGlwYm9hcmQhYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhY3RpdmF0ZVByb2ZpbGVFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZHVsZS1wcm9maWxlcy1hY3RpdmF0ZS1wcm9maWxlJyk7XG4gICAgICAgIEFycmF5LmZyb20oYWN0aXZhdGVQcm9maWxlRWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gUHJvZmlsZUludGVyYWN0aW9ucy5hY3RpdmF0ZVByb2ZpbGUoZWxlbWVudC5kYXRhc2V0LnByb2ZpbGVOYW1lKSkpO1xuICAgICAgICBjb25zdCBlZGl0UHJvZmlsZUVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlLXByb2ZpbGVzLWVkaXQtcHJvZmlsZScpO1xuICAgICAgICBBcnJheS5mcm9tKGVkaXRQcm9maWxlRWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmV3IEVkaXRNb2R1bGVQcm9maWxlRm9ybShlbGVtZW50LmRhdGFzZXQucHJvZmlsZU5hbWUpLnJlbmRlcih0cnVlKSkpO1xuICAgICAgICBjb25zdCBkdXBsaWNhdGVQcm9maWxlRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGUtcHJvZmlsZXMtZHVwbGljYXRlLXByb2ZpbGUnKTtcbiAgICAgICAgQXJyYXkuZnJvbShkdXBsaWNhdGVQcm9maWxlRWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZmlsZSA9IFNldHRpbmdzLmdldFByb2ZpbGVCeU5hbWUoZWxlbWVudC5kYXRhc2V0LnByb2ZpbGVOYW1lKTtcbiAgICAgICAgICAgIGlmIChwcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNldHRpbmdzLmNyZWF0ZVByb2ZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm9maWxlLm5hbWUgKyAnIChDb3B5KScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwcm9maWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzOiBwcm9maWxlLm1vZHVsZXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgY29uc3QgZXhwb3J0UHJvZmlsZUVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlLXByb2ZpbGVzLWV4cG9ydC1wcm9maWxlJyk7XG4gICAgICAgIEFycmF5LmZyb20oZXhwb3J0UHJvZmlsZUVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVOYW1lID0gZWxlbWVudC5kYXRhc2V0LnByb2ZpbGVOYW1lO1xuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQcm9maWxlID0gU2V0dGluZ3MuZXhwb3J0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSk7XG4gICAgICAgICAgICBpZiAoZXhwb3J0ZWRQcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgQnJvd3NlclV0aWxzLmNvcHlUb0NsaXBib2FyZChleHBvcnRlZFByb2ZpbGUpO1xuICAgICAgICAgICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhgUHJvZmlsZSBcIiR7cHJvZmlsZU5hbWV9XCIgY29waWVkIHRvIGNsaXBib2FyZCFgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBjb25zdCBkZWxldGVQcm9maWxlRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGUtcHJvZmlsZXMtZGVsZXRlLXByb2ZpbGUnKTtcbiAgICAgICAgQXJyYXkuZnJvbShkZWxldGVQcm9maWxlRWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuZXcgQ29uZmlybURlbGV0ZVByb2ZpbGVGb3JtKGVsZW1lbnQuZGF0YXNldC5wcm9maWxlTmFtZSkucmVuZGVyKHRydWUpKSk7XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoKSB7XG4gICAgfVxufVxuTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0uRk9STV9JRCA9ICdtb2R1bGUtcHJvZmlsZXMtbWFuYWdlLXByb2ZpbGVzJztcbi8qKlxuICogUmUtcmVuZGVycyB0aGUgTWFuYWdlTW9kdWxlUHJvZmlsZXMgd2luZG93cy4gVGhpcyBjYW4gYmUgdXNlZnVsIGJlY2F1c2UgcHJvZmlsZXMgY2FuIGJlIGFkZGVkL3JlbW92ZWQgd2hpbGUgdGhlIHdpbmRvdyBpcyBvcGVuLCBhbmQgcmUtcmVuZGVyaW5nIHRoZVxuICogQXBwbGljYXRpb24gaW5zdGFuY2UgcmVmcmVzaGVzIHRoYXQgZGF0YS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVSZW5kZXJNYW5hZ2VNb2R1bGVQcm9maWxlc1dpbmRvd3MoKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh1aS53aW5kb3dzKVxuICAgICAgICAuZmlsdGVyKGFwcCA9PiBhcHAub3B0aW9ucy5pZCA9PT0gTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0uRk9STV9JRClcbiAgICAgICAgLmZvckVhY2goYXBwID0+IGFwcC5yZW5kZXIoKSk7XG59XG4vKipcbiAqIEZvcmNlcyB0aGUgYXBwbGljYXRpb24gdG8gcmVmcmVzaCB0aGUgc2l6ZSBvZiBpdHMgZmlyc3QgZWxlbWVudCAoYWthLCB0aGUgd2luZG93IGNvbnRlbnQpLiBUaGlzIGlzIHByaW1hcmlseSB0byBiZSB1c2VkIHdoZW5ldmVyIGFuIEFwcGxpY2F0aW9uIGFkZHMgb3JcbiAqIHJlbW92ZXMgZWxlbWVudHMgc28gdGhhdCB0aGUgaGVpZ2h0IG9mIHRoZSBBcHBsaWNhdGlvbiBpcyBjb25zaXN0ZW50IHdpdGggd2hhdCBpcyBhZGRlZC5cbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcCAtIFRoZSBBcHBsaWNhdGlvbiB0aGF0IG5lZWRzIHRvIGJlIHJlc2l6ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcmNlTWFuYWdlTW9kdWxlUHJvZmlsZXNIZWlnaHRSZXNpemUoYXBwKSB7XG4gICAgaWYgKGFwcD8uZWxlbWVudD8ubGVuZ3RoID4gMCkge1xuICAgICAgICBhcHAuZWxlbWVudFswXS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBTZXR0aW5nc1V0aWxzIGZyb20gJy4vc2V0dGluZ3MtdXRpbHMnO1xuLyoqXG4gKiBSZWdpc3RlcnMgdGhlIG1vZHVsZSdzIEFQSS4gVGhpcyBpcyBvbmx5IG1lYW50IHRvIGJlIGNhbGxlZCBvbiBpbml0aWFsIGdhbWUgbG9hZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXBpKCkge1xuICAgIGNvbnN0IGFwaSA9IHtcbiAgICAgICAgZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb246IFNldHRpbmdzLmdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uLFxuICAgICAgICBnZXRBbGxQcm9maWxlczogU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMsXG4gICAgICAgIGdldEFjdGl2ZVByb2ZpbGU6IFNldHRpbmdzLmdldEFjdGl2ZVByb2ZpbGUsXG4gICAgICAgIGdldFByb2ZpbGVCeU5hbWU6IFNldHRpbmdzLmdldFByb2ZpbGVCeU5hbWUsXG4gICAgICAgIGV4cG9ydEFsbFByb2ZpbGVzOiBTZXR0aW5ncy5leHBvcnRBbGxQcm9maWxlcyxcbiAgICAgICAgZXhwb3J0UHJvZmlsZUJ5TmFtZTogU2V0dGluZ3MuZXhwb3J0UHJvZmlsZUJ5TmFtZSxcbiAgICAgICAgY3JlYXRlUHJvZmlsZTogU2V0dGluZ3MuY3JlYXRlUHJvZmlsZSxcbiAgICAgICAgaW1wb3J0UHJvZmlsZXM6IFNldHRpbmdzLmltcG9ydFByb2ZpbGVzLFxuICAgICAgICBhY3RpdmF0ZVByb2ZpbGU6IFNldHRpbmdzLmFjdGl2YXRlUHJvZmlsZSxcbiAgICAgICAgc2F2ZUNoYW5nZXNUb1Byb2ZpbGU6IFNldHRpbmdzLnNhdmVDaGFuZ2VzVG9Qcm9maWxlLFxuICAgICAgICBkZWxldGVQcm9maWxlOiBTZXR0aW5ncy5kZWxldGVQcm9maWxlLFxuICAgICAgICByZXNldFByb2ZpbGVzOiBTZXR0aW5ncy5yZXNldFByb2ZpbGVzXG4gICAgfTtcbiAgICBTZXR0aW5nc1V0aWxzLnJlZ2lzdGVyQVBJKGFwaSk7XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weVRvQ2xpcGJvYXJkKHRleHQpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAobmF2aWdhdG9yLmNsaXBib2FyZCkge1xuICAgICAgICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wVGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgdGVtcFRleHRBcmVhLnZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgIHRlbXBUZXh0QXJlYS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICAgICAgICAgICAgdGVtcFRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRlbXBUZXh0QXJlYS5zdHlsZS5sZWZ0ID0gJy05OTk5OXB4JztcbiAgICAgICAgICAgIHRlbXBUZXh0QXJlYS5zdHlsZS50b3AgPSAnLTk5OTk5cHgnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wVGV4dEFyZWEpO1xuICAgICAgICAgICAgdGVtcFRleHRBcmVhLnNlbGVjdCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVtcFRleHRBcmVhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoJ1VuYWJsZSB0byBjb3B5IHRvIGNsaXBib2FyZC4gUGxlYXNlIGNoZWNrIGNvbnNvbGUgZm9yIGRldGFpbHMuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuLyoqXG4gKiBNYXBzIGFuIGFycmF5IG9mIE1vZHVsZUluZm8gb2JqZWN0cyBpbnRvIGEgUmVjb3JkLCBpZGVudGljYWwgdG8gaG93IHRoZSBjb3JlIG1vZHVsZSBjb25maWd1cmF0aW9uIHN0b3JlcyB3aGljaCBtb2R1bGVzIGFyZSBhY3RpdmUgYW5kIHdoaWNoIGFyZW4ndC5cbiAqIEBwYXJhbSB7TW9kdWxlSW5mb1tdfSBtb2R1bGVJbmZvc1xuICogQHJldHVybiB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj59IC0gVGhlIGNvcnJlc3BvbmRpbmcgUmVjb3JkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnB1dHRlZCBkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9Nb2R1bGVLZXlJc0FjdGl2ZVJlY29yZChtb2R1bGVJbmZvcykge1xuICAgIGNvbnN0IHJlY29yZCA9IHt9O1xuICAgIG1vZHVsZUluZm9zLmZvckVhY2gobW9kdWxlID0+IHJlY29yZFttb2R1bGUuaWRdID0gbW9kdWxlLmlzQWN0aXZlKTtcbiAgICByZXR1cm4gcmVjb3JkO1xufVxuLyoqXG4gKiBNYXBzIGEgUmVjb3JkIGludG8gYW4gYXJyYXkgb2YgbWF0Y2hpbmcgTW9kdWxlSW5mbyBvYmplY3RzIHN0b3JlZCBpbiB0aGUgZ2FtZSBzZXR0aW5ncy5cbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj59IG1vZHVsZUlESXNBY3RpdmVSZWNvcmRcbiAqIEByZXR1cm4ge01vZHVsZUluZm9bXX0gLSBUaGUgY29ycmVzcG9uZGluZyBhcnJheSBvZiBNb2R1bGVJbmZvIG9iamVjdHMgYmFzZWQgb24gdGhlIGlucHV0dGVkIGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb01vZHVsZUluZm9zKG1vZHVsZUlESXNBY3RpdmVSZWNvcmQpIHtcbiAgICBjb25zdCBtb2R1bGVJbmZvcyA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKG1vZHVsZUlESXNBY3RpdmVSZWNvcmQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBtb2R1bGVJbmZvcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgICB0aXRsZTogU2V0dGluZ3MuZ2V0Rm91bmRyeVZlcnNpb25TdHJhdGVneSgpLmZpbmRNb2R1bGVUaXRsZUZyb21Nb2R1bGVJZChrZXkpLFxuICAgICAgICAgICAgaXNBY3RpdmU6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBtb2R1bGVJbmZvcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmICghYS50aXRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiLnRpdGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbW9kdWxlSW5mb3M7XG59XG4iLCJpbXBvcnQgKiBhcyBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cyBmcm9tICcuL3VpL21vZHVsZS1tYW5hZ2VtZW50LXNjcmlwdHMnO1xuaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm0gZnJvbSAnLi4vY2xhc3Nlcy9Db25maXJtQWN0aXZhdGVQcm9maWxlRm9ybSc7XG4vKipcbiAqIEFjdGl2YXRlcyB0aGUgbW9kdWxlIHByb2ZpbGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS4gSWYgY2hhbmdlcyBhcmUgZGV0ZWN0ZWQgb24gYW4gb3BlbiBNb2R1bGUgTWFuYWdlbWVudCB3aW5kb3cgYW5kIHNob3VsZEZvcmNlIGlzIGZhbHNlLCBhXG4gKiB7QGxpbmsgQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm19IHdpbGwgYmUgcmVuZGVyZWQgaW5zdGVhZCB0byBwcmV2ZW50IGxvc2luZyB1bmZpbmlzaGVkIHdvcmsuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbW9kdWxlIHByb2ZpbGUgdG8gYWN0aXZhdGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzaG91bGRGb3JjZT1mYWxzZV0gLSBXaGVuIHRydWUsIHdpbGwgYWN0aXZhdGUgdGhlIHByb2ZpbGUgd2l0aG91dCBjaGVja2luZyBpZiB0aGUgdXNlciB3aWxsIGxvc2UgYW55IHVuc2F2ZWQgd29yay5cbiAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbn0gLSBUaGUgY29uZmlybWF0aW9uIEFwcGxpY2F0aW9uIHdoZW4gdGhlIHVzZXIgaGFzIHdvcmsgdGhhdCBtYXkgYmUgb3ZlcnJpZGRlbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlUHJvZmlsZShwcm9maWxlTmFtZSwgc2hvdWxkRm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICghcHJvZmlsZU5hbWUpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1VuYWJsZSB0byBhY3RpdmF0ZSBwcm9maWxlLiBQcm9maWxlIG5hbWUgdW5kZWZpbmVkLic7XG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnN0IGFjdGl2ZVByb2ZpbGUgPSBTZXR0aW5ncy5nZXRBY3RpdmVQcm9maWxlKCk7XG4gICAgaWYgKCFzaG91bGRGb3JjZSAmJiBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy5pc01vZHVsZU1hbmFnZW1lbnRXaW5kb3dPcGVuKCkgJiYgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMudW5zYXZlZENoYW5nZXNFeGlzdE9uKGFjdGl2ZVByb2ZpbGUubmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25maXJtQWN0aXZhdGVQcm9maWxlRm9ybShwcm9maWxlTmFtZSkucmVuZGVyKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgU2V0dGluZ3MuYWN0aXZhdGVQcm9maWxlKHByb2ZpbGVOYW1lKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5nc1V0aWxzIGZyb20gJy4vc2V0dGluZ3MtdXRpbHMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGUoKSB7XG4gICAgY29uc3Qgc2F2ZWREYXRhVmVyc2lvbiA9IFNldHRpbmdzVXRpbHMuZ2V0U2V0dGluZ3NEYXRhVmVyc2lvbigpO1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBDb3JyZWN0IHdheSB0byBncmFiIHZlcnNpb24gaW5mbyBpbiB2MTMrXG4gICAgY29uc3QgY3VycmVudERhdGFWZXJzaW9uID0gZ2FtZS5tb2R1bGVzLmdldChTZXR0aW5nc1V0aWxzLk1PRFVMRV9JRCk/LnZlcnNpb247XG4gICAgaWYgKCFpc1NldHRpbmdzRGF0YVZlcnNpb24oc2F2ZWREYXRhVmVyc2lvbikgfHxcbiAgICAgICAgIWlzU2V0dGluZ3NEYXRhVmVyc2lvbihjdXJyZW50RGF0YVZlcnNpb24pIHx8XG4gICAgICAgIHNhdmVkRGF0YVZlcnNpb24gPT09IGN1cnJlbnREYXRhVmVyc2lvbikge1xuICAgICAgICBjb25zb2xlLmRlYnVnKGBNb2R1bGUgUHJvZmlsZXM6IE5vIG1pZ3JhdGlvbiBuZWNlc3NhcnlgLCBzYXZlZERhdGFWZXJzaW9uLCBjdXJyZW50RGF0YVZlcnNpb24pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzYXZlZERhdGFWZXJzaW9uID09PSAnMC4wLjAnKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgTW9kdWxlIFByb2ZpbGVzOiBNaWdyYXRpbmcgdG8gbmV3ZXN0IGRhdGEgZm9ybWF0Li4uYDtcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhtZXNzYWdlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgTW9kdWxlIFByb2ZpbGVzOiBNaWdyYXRpbmcgdiR7c2F2ZWREYXRhVmVyc2lvbn0gLT4gdiR7Y3VycmVudERhdGFWZXJzaW9ufWA7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmluZm8obWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnN0IHN0cnVjdHVyZWRTYXZlZFZlcnNpb24gPSB0b1N0cnVjdHVyZWRWZXJzaW9uKHNhdmVkRGF0YVZlcnNpb24pO1xuICAgIGNvbnN0IHN0cnVjdHVyZWRDdXJyZW50VmVyc2lvbiA9IHRvU3RydWN0dXJlZFZlcnNpb24oY3VycmVudERhdGFWZXJzaW9uKTtcbiAgICBjb25zdCBtaWdyYXRpb25TY3JpcHRzID0gZ2V0QXBwbGljYWJsZU1pZ3JhdGlvblNjcmlwdHMoc3RydWN0dXJlZFNhdmVkVmVyc2lvbiwgc3RydWN0dXJlZEN1cnJlbnRWZXJzaW9uKTtcbiAgICBjb25zb2xlLmxvZyhgTW9kdWxlIFByb2ZpbGVzOiBNaWdyYXRpbmcgJHttaWdyYXRpb25TY3JpcHRzLmxlbmd0aH0gc2NyaXB0KHMpOmAsIG1pZ3JhdGlvblNjcmlwdHMubWFwKHNjcmlwdCA9PiBzY3JpcHQudmVyc2lvbikuam9pbignLCAnKSk7XG4gICAgY29uc3QgaXNSb2xsYmFja1NjZW5hcmlvID0gaXNGaXJzdEdyZWF0ZXJUaGFuKHN0cnVjdHVyZWRTYXZlZFZlcnNpb24sIHN0cnVjdHVyZWRDdXJyZW50VmVyc2lvbik7XG4gICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2YgbWlncmF0aW9uU2NyaXB0cykge1xuICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JvbGxiYWNrU2NlbmFyaW8pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2NyaXB0LnJvbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE1vZHVsZSBQcm9maWxlczogTWlncmF0aW9uICR7c2NyaXB0LnZlcnNpb259IHdhcyBzdWNjZXNzZnVsYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYE1vZHVsZSBQcm9maWxlczogTWlncmF0aW9uICR7c2NyaXB0LnZlcnNpb259IGZhaWxlZDpgLCBlKTtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2NyaXB0Lm1pZ3JhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgTW9kdWxlIFByb2ZpbGVzOiBNaWdyYXRpb24gJHtzY3JpcHQudmVyc2lvbn0gd2FzIHN1Y2Nlc3NmdWxgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTW9kdWxlIFByb2ZpbGVzOiBNaWdyYXRpb24gJHtzY3JpcHQudmVyc2lvbn0gZmFpbGVkOmAsIGUpO1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBTZXR0aW5nc1V0aWxzLnNldFNldHRpbmdzRGF0YVZlcnNpb24oc2NyaXB0LnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGF3YWl0IFNldHRpbmdzVXRpbHMuc2V0U2V0dGluZ3NEYXRhVmVyc2lvbihjdXJyZW50RGF0YVZlcnNpb24pO1xuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmluZm8oYE1vZHVsZSBQcm9maWxlczogTWlncmF0aW9uIHRvIHYke2N1cnJlbnREYXRhVmVyc2lvbn0gd2FzIHN1Y2Nlc3NmdWxgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoYE1vZHVsZSBQcm9maWxlczogTWlncmF0aW9uIHRvIHYke2N1cnJlbnREYXRhVmVyc2lvbn0gZmFpbGVkLCBjaGVjayBjb25zb2xlIGZvciBkZXRhaWxzYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdG9TdHJ1Y3R1cmVkVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgY29uc3QgW21ham9yLCBtaW5vciwgcGF0Y2hdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ham9yOiBOdW1iZXIobWFqb3IucmVwbGFjZSgvXFxEL2csICcnKSksXG4gICAgICAgIG1pbm9yOiBOdW1iZXIobWlub3IucmVwbGFjZSgvXFxEL2csICcnKSksXG4gICAgICAgIHBhdGNoOiBOdW1iZXIocGF0Y2gucmVwbGFjZSgvXFxEL2csICcnKSksXG4gICAgfTtcbn1cbi8qKlxuICogTWlncmF0aW9uIHNjcmlwdHMgcHJvY2Vzc2VkIGluLW9yZGVyIChvciByZXZlcnNlLW9yZGVyIGZvciByb2xsYmFja3MpLlxuICovXG5jb25zdCBNSUdSQVRJT05TID0gW1xuICAgIHtcbiAgICAgICAgdmVyc2lvbjogJzEuMS4wJyxcbiAgICAgICAgbWlncmF0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZmlsZXMgPSBTZXR0aW5nc1V0aWxzLmdldFByb2ZpbGVzKCk7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9maWxlcyA9IHByb2ZpbGVzLm1hcChwcm9maWxlID0+ICh7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIElmIGBkZXNjcmlwdGlvbmAgYWxyZWFkeSBleGlzdHMsIHJldGFpbiBpdFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAuLi5wcm9maWxlLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYXdhaXQgU2V0dGluZ3NVdGlscy5zZXRQcm9maWxlcyhuZXdQcm9maWxlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHJvbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBBbiBleHRyYSBcImRlc2NyaXB0aW9uXCIgZmllbGQgZG9lc24ndCBodXJ0IGFueXRoaW5nXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG5mdW5jdGlvbiBnZXRBcHBsaWNhYmxlTWlncmF0aW9uU2NyaXB0cyhmcm9tVmVyc2lvbiwgdG9WZXJzaW9uKSB7XG4gICAgY29uc3QgaXNSb2xsYmFja1NjZW5hcmlvID0gaXNGaXJzdEdyZWF0ZXJUaGFuKGZyb21WZXJzaW9uLCB0b1ZlcnNpb24pO1xuICAgIGlmIChpc1JvbGxiYWNrU2NlbmFyaW8pIHtcbiAgICAgICAgcmV0dXJuIFsuLi5NSUdSQVRJT05TXS5yZXZlcnNlKCkuZmlsdGVyKG1pZ3JhdGlvbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBtaWdyYXRpb25WZXJzaW9uID0gdG9TdHJ1Y3R1cmVkVmVyc2lvbihtaWdyYXRpb24udmVyc2lvbik7XG4gICAgICAgICAgICBjb25zdCBpc0dyZWF0ZXJUaGFuT3JFcXVhbFRvTG93ZXJCb3VuZCA9ICFpc0ZpcnN0R3JlYXRlclRoYW4odG9WZXJzaW9uLCBtaWdyYXRpb25WZXJzaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGlzTGVzc1RoYW5VcHBlckJvdW5kID0gaXNGaXJzdEdyZWF0ZXJUaGFuKGZyb21WZXJzaW9uLCBtaWdyYXRpb25WZXJzaW9uKTtcbiAgICAgICAgICAgIHJldHVybiBpc0dyZWF0ZXJUaGFuT3JFcXVhbFRvTG93ZXJCb3VuZCAmJiBpc0xlc3NUaGFuVXBwZXJCb3VuZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBNSUdSQVRJT05TLmZpbHRlcihtaWdyYXRpb24gPT4ge1xuICAgICAgICBjb25zdCBtaWdyYXRpb25WZXJzaW9uID0gdG9TdHJ1Y3R1cmVkVmVyc2lvbihtaWdyYXRpb24udmVyc2lvbik7XG4gICAgICAgIGNvbnN0IGlzR3JlYXRlclRoYW5Mb3dlckJvdW5kID0gaXNGaXJzdEdyZWF0ZXJUaGFuKG1pZ3JhdGlvblZlcnNpb24sIGZyb21WZXJzaW9uKTtcbiAgICAgICAgY29uc3QgaXNMZXNzVGhhbk9yRXF1YWxUb1VwcGVyQm91bmQgPSAhaXNGaXJzdEdyZWF0ZXJUaGFuKG1pZ3JhdGlvblZlcnNpb24sIHRvVmVyc2lvbik7XG4gICAgICAgIHJldHVybiBpc0dyZWF0ZXJUaGFuTG93ZXJCb3VuZCAmJiBpc0xlc3NUaGFuT3JFcXVhbFRvVXBwZXJCb3VuZDtcbiAgICB9KTtcbn1cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgZmlyc3QgdmVyc2lvbiBpcyBoaWdoZXIgdGhhbiB0aGUgc2Vjb25kIHZlcnNpb24sIGBmYWxzZWAgd2hlbiBsZXNzIHRoYW4gb3IgZXF1YWwgdG8uXG4gKi9cbmZ1bmN0aW9uIGlzRmlyc3RHcmVhdGVyVGhhbihmaXJzdFZlcnNpb24sIHNlY29uZFZlcnNpb24pIHtcbiAgICBpZiAoZmlyc3RWZXJzaW9uLm1ham9yID4gc2Vjb25kVmVyc2lvbi5tYWpvcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0VmVyc2lvbi5tYWpvciA8IHNlY29uZFZlcnNpb24ubWFqb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmlyc3RWZXJzaW9uLm1pbm9yID4gc2Vjb25kVmVyc2lvbi5taW5vcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpcnN0VmVyc2lvbi5taW5vciA8IHNlY29uZFZlcnNpb24ubWlub3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmlyc3RWZXJzaW9uLnBhdGNoID4gc2Vjb25kVmVyc2lvbi5wYXRjaDtcbn1cbmZ1bmN0aW9uIGlzU2V0dGluZ3NEYXRhVmVyc2lvbih2YWwpIHtcbiAgICBpZiAodmFsID09IG51bGwgfHwgdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzdWJWZXJzaW9ucyA9IHZhbC5zcGxpdCgnLicpO1xuICAgIHJldHVybiBzdWJWZXJzaW9ucy5sZW5ndGggPT09IDM7XG59XG4iLCJpbXBvcnQgTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0gZnJvbSAnLi4vY2xhc3Nlcy9NYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSc7XG5pbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcbmV4cG9ydCBjb25zdCBNT0RVTEVfSUQgPSAnbW9kdWxlLXByb2ZpbGVzJztcbmV4cG9ydCBjb25zdCBURU1QTEFURVNfUEFUSCA9IGBtb2R1bGVzLyR7TU9EVUxFX0lEfS90ZW1wbGF0ZXNgO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUFJPRklMRV9OQU1FID0gJ0RlZmF1bHQgUHJvZmlsZSc7XG5jb25zdCBQUk9GSUxFU19TRVRUSU5HID0gJ3Byb2ZpbGVzJztcbmNvbnN0IEFDVElWRV9QUk9GSUxFX05BTUVfU0VUVElORyA9ICdhY3RpdmVQcm9maWxlTmFtZSc7XG5jb25zdCBTSE9XX01PRFVMRV9JQ09OX0FOSU1BVElPTl9TRVRUSU5HID0gJ3Nob3dNb2R1bGVJY29uQW5pbWF0aW9uJztcbmNvbnN0IFNFVFRJTkdTX0RBVEFfVkVSU0lPTl9TRVRUSU5HID0gJ3NldHRpbmdzRGF0YVZlcnNpb24nO1xuLyoqXG4gKiBSZWdpc3RlcnMgc2V0dGluZ3MgZm9yIHRoZSBtb2R1bGUuIFRoaXMgaXMgb25seSBtZWFudCB0byBiZSBjYWxsZWQgb24gaW5pdGlhbCBnYW1lIGxvYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNldHRpbmdzKCkge1xuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoTU9EVUxFX0lELCBQUk9GSUxFU19TRVRUSU5HLCB7XG4gICAgICAgIG5hbWU6ICdQcm9maWxlcycsXG4gICAgICAgIGhpbnQ6ICdFeGlzdGluZyBtb2R1bGUgcHJvZmlsZXMnLFxuICAgICAgICBkZWZhdWx0OiBbYnVpbGREZWZhdWx0UHJvZmlsZSgpXSxcbiAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgIHNjb3BlOiAnd29ybGQnLFxuICAgIH0pO1xuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoTU9EVUxFX0lELCBBQ1RJVkVfUFJPRklMRV9OQU1FX1NFVFRJTkcsIHtcbiAgICAgICAgbmFtZTogJ0FjdGl2ZSBQcm9maWxlIE5hbWUnLFxuICAgICAgICBkZWZhdWx0OiBERUZBVUxUX1BST0ZJTEVfTkFNRSxcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBzY29wZTogJ3dvcmxkJyxcbiAgICB9KTtcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKE1PRFVMRV9JRCwgU0hPV19NT0RVTEVfSUNPTl9BTklNQVRJT05fU0VUVElORywge1xuICAgICAgICBuYW1lOiAnU2hvdyBNb2R1bGUgSWNvbiBBbmltYXRpb24nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBzY29wZTogJ3dvcmxkJyxcbiAgICAgICAgY29uZmlnOiB0cnVlLFxuICAgIH0pO1xuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoTU9EVUxFX0lELCBTRVRUSU5HU19EQVRBX1ZFUlNJT05fU0VUVElORywge1xuICAgICAgICBuYW1lOiAnU2V0dGluZ3MgRGF0YSBWZXJzaW9uIChmb3IgbWlncmF0aW9uIHB1cnBvc2VzKScsXG4gICAgICAgIGRlZmF1bHQ6ICcwLjAuMCcsXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgc2NvcGU6ICd3b3JsZCcsXG4gICAgfSk7XG4gICAgZnVuY3Rpb24gYnVpbGREZWZhdWx0UHJvZmlsZSgpIHtcbiAgICAgICAgY29uc3Qgc2F2ZWRNb2R1bGVDb25maWd1cmF0aW9uID0gU2V0dGluZ3MuZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IERFRkFVTFRfUFJPRklMRV9OQU1FLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgbW9kdWxlczogc2F2ZWRNb2R1bGVDb25maWd1cmF0aW9uLFxuICAgICAgICB9O1xuICAgIH1cbn1cbi8qKlxuICogUmVnaXN0ZXJzIG1lbnVzIGZvciB0aGUgbW9kdWxlLiBUaGlzIGlzIG9ubHkgbWVhbnQgdG8gYmUgY2FsbGVkIG9uIGluaXRpYWwgZ2FtZSBsb2FkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZW51cygpIHtcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyTWVudShNT0RVTEVfSUQsICdtYW5hZ2VQcm9maWxlcycsIHtcbiAgICAgICAgbmFtZTogJ01hbmFnZSBQcm9maWxlcycsXG4gICAgICAgIGxhYmVsOiAnTWFuYWdlIFByb2ZpbGVzJyxcbiAgICAgICAgaWNvbjogJ2ZhcyBmYS1jb2cnLFxuICAgICAgICB0eXBlOiBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSxcbiAgICAgICAgcmVzdHJpY3RlZDogdHJ1ZSxcbiAgICB9KTtcbn1cbi8qKlxuICogUmVnaXN0ZXJzIGFuIEFQSSBmb3IgdGhlIGN1cnJlbnQgbW9kdWxlLCBhY2Nlc3NpYmxlIGJ5IGBnYW1lLm1vZHVsZXMuZ2V0KE1PRFVMRV9JRCkuYXBpLipmdW5jdGlvbigpKmAuIFRoaXMgaXMgbWVhbnQgdG8gYmUgY2FsbGVkIG9ubHkgb24gaW5pdGlhbCBnYW1lIGxvYWQuXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIEZ1bmN0aW9uPn0gYXBpIC0gVGhlIEFQSSB0byBleHBvc2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQVBJKGFwaSkge1xuICAgIC8vIEB0cy1pZ25vcmUgLSBOb3QgcmVjb2duaXplZCBkdWUgdG8gRm91bmRyeSBvYmplY3RcbiAgICBnYW1lLm1vZHVsZXMuZ2V0KE1PRFVMRV9JRCkuYXBpID0gYXBpO1xuICAgIGNvbnNvbGUuZGVidWcoYCR7TU9EVUxFX0lEfSBBUEkgcmVnaXN0ZXJlZGApO1xufVxuLyoqXG4gKiBSZWxvYWRzIHRoZSBjdXJyZW50IHdpbmRvdy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVsb2FkV2luZG93KCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn1cbi8qKlxuICogR2V0IHRoZSBQcm9maWxlcyBnYW1lIHNldHRpbmcuXG4gKiBAcmV0dXJuIHtNb2R1bGVQcm9maWxlW119IC0gVGhlIHZhbHVlIG9mIHRoZSBnYW1lIHNldHRpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9maWxlcygpIHtcbiAgICByZXR1cm4gZ2FtZS5zZXR0aW5ncy5nZXQoTU9EVUxFX0lELCBQUk9GSUxFU19TRVRUSU5HKTtcbn1cbi8qKlxuICogU2V0IHRoZSBQcm9maWxlcyBnYW1lIHNldHRpbmcuXG4gKiBAcGFyYW0ge01vZHVsZVByb2ZpbGVbXX0gcHJvZmlsZXMgLSBUaGUgdmFsdWUgdG8gc2F2ZSB0byB0aGUgZ2FtZSBzZXR0aW5nLlxuICogQHJldHVybiB7UHJvbWlzZTxNb2R1bGVQcm9maWxlW10+fSAtIEEgUHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIG5ldyBnYW1lIHNldHRpbmcgdmFsdWUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRQcm9maWxlcyhwcm9maWxlcykge1xuICAgIC8vIEZpbHRlciBvdXQgcmVmZXJlbmNlcyB0byBtb2R1bGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbnN0YWxsZWRcbiAgICBwcm9maWxlcy5mb3JFYWNoKHByb2ZpbGUgPT4gcHJvZmlsZS5tb2R1bGVzID0gcHJvZmlsZS5tb2R1bGVzLmZpbHRlcihtb2R1bGVJbmZvID0+IG1vZHVsZUluZm8udGl0bGUgIT09IHVuZGVmaW5lZCkpO1xuICAgIC8vIFNvcnQgcHJvZmlsZXMgYnkgcHJvZmlsZSBuYW1lLCBhbmQgbW9kdWxlIGluZm9zIGJ5IG1vZHVsZSB0aXRsZVxuICAgIHByb2ZpbGVzLnNvcnQoKGEsIGIpID0+IGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpO1xuICAgIC8vIEB0cy1pZ25vcmUgLSB1bmRlZmluZWQgdGl0bGVzIGFyZSBmaWx0ZXJlZCBiZWZvcmUgdGhpcyBsaW5lXG4gICAgcHJvZmlsZXMuZm9yRWFjaChwcm9maWxlID0+IHByb2ZpbGUubW9kdWxlcy5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpKTtcbiAgICByZXR1cm4gYXdhaXQgZ2FtZS5zZXR0aW5ncy5zZXQoTU9EVUxFX0lELCBQUk9GSUxFU19TRVRUSU5HLCBwcm9maWxlcyk7XG59XG4vKipcbiAqIFJlc2V0cyB0aGUgUHJvZmlsZXMgZ2FtZSBzZXR0aW5nIHRvIHRoZSBkZWZhdWx0IHByb2ZpbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldFByb2ZpbGVzKCkge1xuICAgIHJldHVybiBnYW1lLnNldHRpbmdzLnNldChNT0RVTEVfSUQsIFBST0ZJTEVTX1NFVFRJTkcsIHVuZGVmaW5lZCk7XG59XG4vKipcbiAqIEdldCB0aGUgQWN0aXZlIFByb2ZpbGUgTmFtZSBnYW1lIHNldHRpbmcuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIHZhbHVlIG9mIHRoZSBnYW1lIHNldHRpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVQcm9maWxlTmFtZSgpIHtcbiAgICByZXR1cm4gZ2FtZS5zZXR0aW5ncy5nZXQoTU9EVUxFX0lELCBBQ1RJVkVfUFJPRklMRV9OQU1FX1NFVFRJTkcpO1xufVxuLyoqXG4gKiBTZXQgdGhlIEFjdGl2ZSBQcm9maWxlIE5hbWUgZ2FtZSBzZXR0aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGl2ZVByb2ZpbGVOYW1lIC0gVGhlIHZhbHVlIHRvIHNhdmUgdG8gdGhlIGdhbWUgc2V0dGluZy5cbiAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn0gLSBBIFByb21pc2UgcmVzb2x2aW5nIHRvIHRoZSBuZXcgZ2FtZSBzZXR0aW5nIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlUHJvZmlsZU5hbWUoYWN0aXZlUHJvZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gZ2FtZS5zZXR0aW5ncy5zZXQoTU9EVUxFX0lELCBBQ1RJVkVfUFJPRklMRV9OQU1FX1NFVFRJTkcsIGFjdGl2ZVByb2ZpbGVOYW1lKTtcbn1cbi8qKlxuICogR2V0IHRoZSBTaG93IE1vZHVsZSBBbmltYXRpb24gZ2FtZSBzZXR0aW5nLlxuICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSB2YWx1ZSBvZiB0aGUgZ2FtZSBzZXR0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvd01vZHVsZUljb25BbmltYXRpb24oKSB7XG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3MuZ2V0KE1PRFVMRV9JRCwgU0hPV19NT0RVTEVfSUNPTl9BTklNQVRJT05fU0VUVElORyk7XG59XG4vKipcbiAqIFNldCB0aGUgU2hvdyBNb2R1bGUgQW5pbWF0aW9uIGdhbWUgc2V0dGluZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd01vZHVsZUFuaW1hdGlvbiAtIFRoZSB2YWx1ZSB0byBzYXZlIHRvIHRoZSBnYW1lIHNldHRpbmcuXG4gKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSAtIEEgUHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIG5ldyBnYW1lIHNldHRpbmcgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTaG93TW9kdWxlSWNvbkFuaW1hdGlvbihzaG93TW9kdWxlQW5pbWF0aW9uKSB7XG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3Muc2V0KE1PRFVMRV9JRCwgU0hPV19NT0RVTEVfSUNPTl9BTklNQVRJT05fU0VUVElORywgc2hvd01vZHVsZUFuaW1hdGlvbik7XG59XG4vKipcbiAqIEdldCB0aGUgU2V0dGluZ3MgRGF0YSBWZXJzaW9uIGdhbWUgc2V0dGluZy5cbiAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgdmFsdWUgb2YgdGhlIGdhbWUgc2V0dGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdzRGF0YVZlcnNpb24oKSB7XG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3MuZ2V0KE1PRFVMRV9JRCwgU0VUVElOR1NfREFUQV9WRVJTSU9OX1NFVFRJTkcpO1xufVxuLyoqXG4gKiBTZXQgdGhlIFNldHRpbmdzIERhdGEgVmVyc2lvbiBnYW1lIHNldHRpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2V0dGluZ3NEYXRhVmVyc2lvbiAtIFRoZSB2YWx1ZSB0byBzYXZlIHRvIHRoZSBnYW1lIHNldHRpbmcuXG4gKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59IC0gQSBQcm9taXNlIHJlc29sdmluZyB0byB0aGUgbmV3IGdhbWUgc2V0dGluZyB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNldHRpbmdzRGF0YVZlcnNpb24oc2V0dGluZ3NEYXRhVmVyc2lvbikge1xuICAgIHJldHVybiBnYW1lLnNldHRpbmdzLnNldChNT0RVTEVfSUQsIFNFVFRJTkdTX0RBVEFfVkVSU0lPTl9TRVRUSU5HLCBzZXR0aW5nc0RhdGFWZXJzaW9uKTtcbn1cbiIsImltcG9ydCB7IE1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSB9IGZyb20gJy4uL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0nO1xuaW1wb3J0ICogYXMgTWFwcGluZ1V0aWxzIGZyb20gJy4vbWFwcGluZy11dGlscyc7XG5pbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCAqIGFzIFNldHRpbmdzVXRpbHMgZnJvbSAnLi9zZXR0aW5ncy11dGlscyc7XG5pbXBvcnQgKiBhcyBTZXR0aW5nc01pZ3JhdGlvbiBmcm9tICcuL3NldHRpbmdzLW1pZ3JhdGlvbic7XG5pbXBvcnQgeyB2MTAsIHYxMSwgdjEyLCB2MTMsIHY5IH0gZnJvbSAnLi92ZXJzaW9uLXN0cmF0ZWdpZXMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlU2V0dGluZ3MoKSB7XG4gICAgU2V0dGluZ3NVdGlscy5yZWdpc3RlclNldHRpbmdzKCk7XG4gICAgU2V0dGluZ3NVdGlscy5yZWdpc3Rlck1lbnVzKCk7XG4gICAgYXdhaXQgU2V0dGluZ3NNaWdyYXRpb24ubWlncmF0ZSgpO1xuICAgIGNvbnN0IHByb2ZpbGVzID0gU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKTtcbiAgICBpZiAoIXByb2ZpbGVzIHx8IHByb2ZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBTZXR0aW5ncy5yZXNldFByb2ZpbGVzKCk7XG4gICAgfVxufVxuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50bHkgYWN0aXZlIG1vZHVsZXMgZnJvbSB0aGUgY29yZSBnYW1lIHNldHRpbmdzLlxuICogQHJldHVybnMge01vZHVsZUluZm9bXX0gLSBUaGUgY3VycmVudGx5LWFjdGl2ZSBtb2R1bGUgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uKCkge1xuICAgIHJldHVybiBTZXR0aW5ncy5nZXRGb3VuZHJ5VmVyc2lvblN0cmF0ZWd5KCkuZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb24oKTtcbn1cbi8qKlxuICogR2V0cyBhbGwgc2F2ZWQgbW9kdWxlIHByb2ZpbGVzIGZyb20gdGhlIGdhbWUgc2V0dGluZ3MuXG4gKiBAcmV0dXJucyB7TW9kdWxlUHJvZmlsZVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUHJvZmlsZXMoKSB7XG4gICAgcmV0dXJuIFNldHRpbmdzVXRpbHMuZ2V0UHJvZmlsZXMoKTtcbn1cbi8qKlxuICogR2V0cyB0aGUgc2F2ZWQsIGN1cnJlbnRseS1hY3RpdmUgbW9kdWxlIHByb2ZpbGUgZnJvbSB0aGUgZ2FtZSBzZXR0aW5ncy5cbiAqIEByZXR1cm5zIHtNb2R1bGVQcm9maWxlfSAtIFRoZSBjdXJyZW50bHktYWN0aXZlIG1vZHVsZSBwcm9maWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlUHJvZmlsZSgpIHtcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlTmFtZSA9IFNldHRpbmdzVXRpbHMuZ2V0QWN0aXZlUHJvZmlsZU5hbWUoKTtcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlID0gU2V0dGluZ3MuZ2V0UHJvZmlsZUJ5TmFtZShhY3RpdmVQcm9maWxlTmFtZSk7XG4gICAgaWYgKCFhY3RpdmVQcm9maWxlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdVbmFibGUgdG8gbG9hZCBhY3RpdmUgcHJvZmlsZS4gUGxlYXNlIHJlZnJlc2ggdGhlIEZvdW5kcnkgcGFnZS4nO1xuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aXZlUHJvZmlsZTtcbn1cbi8qKlxuICogR2V0cyBhIHNhdmVkIHByb2ZpbGUgZnJvbSB0aGUgZ2FtZSBzZXR0aW5ncyB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byByZXR1cm4uXG4gKiBAcmV0dXJucyB7TW9kdWxlUHJvZmlsZSB8IHVuZGVmaW5lZH0gLSBUaGUgbW9kdWxlIHByb2ZpbGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgb3IgYHVuZGVmaW5lZGAgaWYgbm9uZSBleGlzdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKSB7XG4gICAgY29uc3QgcHJvZmlsZXMgPSBTZXR0aW5ncy5nZXRBbGxQcm9maWxlcygpO1xuICAgIHJldHVybiBwcm9maWxlcy5maW5kKHByb2ZpbGUgPT4gcHJvZmlsZS5uYW1lID09PSBwcm9maWxlTmFtZSk7XG59XG4vKipcbiAqIEdldHMgdGhlIGFycmF5IG9mIHNhdmVkIHByb2ZpbGVzIGZyb20gdGhlIGdhbWUgc2V0dGluZ3MgaW4gSlNPTiBmb3JtYXQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIHByb2ZpbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRBbGxQcm9maWxlcygpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKSwgbnVsbCwgMik7XG59XG4vKipcbiAqIEdldHMgYSBzYXZlZCBwcm9maWxlIGZyb20gdGhlIGdhbWUgc2V0dGluZ3MgaW4gSlNPTiBmb3JtYXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byByZXR1cm4uXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCB1bmRlZmluZWR9IC0gVGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIHByb2ZpbGUsIG9yIGB1bmRlZmluZWRgIGlmIG5vbmUgZXhpc3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSkge1xuICAgIGNvbnN0IHByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKTtcbiAgICByZXR1cm4gcHJvZmlsZSA/IEpTT04uc3RyaW5naWZ5KHByb2ZpbGUsIG51bGwsIDIpIDogcHJvZmlsZTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgTW9kdWxlUHJvZmlsZX0gaW4gdGhlIGdhbWUgc2V0dGluZ3MuXG4gKiBAcGFyYW0ge0NyZWF0ZVByb2ZpbGVQYXJhbXN9IHBhcmFtcyAtIFRoZSBwcm9maWxlIHBhcmFtcy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE1vZHVsZVByb2ZpbGVbXT59IC0gVGhlIG5ldyBBcnJheSBvZiB7QGxpbmsgTW9kdWxlUHJvZmlsZX1zLlxuICogQHRocm93cyBFcnJvciAtIFdoZW4gYSBwcm9maWxlIGV4aXN0cyB3aXRoIHRoZSBnaXZlbiBwcm9maWxlTmFtZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUHJvZmlsZSh7IG5hbWUsIGRlc2NyaXB0aW9uLCBtb2R1bGVzIH0pIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgY29uc3QgcG9zdGZpeCA9IG5hbWUgPT09ICcnID8gJ1Byb2ZpbGUgbmFtZSBtdXN0IG5vdCBiZSBlbXB0eS4nIDogJ1Byb2ZpbGUgbmFtZSBpcyB1bmRlZmluZWQuJztcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVuYWJsZSB0byBjcmVhdGUgbW9kdWxlIHByb2ZpbGUuICR7cG9zdGZpeH1gO1xuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgICBpZiAoIW1vZHVsZXMpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1VuYWJsZSB0byBjcmVhdGUgbW9kdWxlIHByb2ZpbGUuIFBsZWFzZSByZWZyZXNoIHRoZSBwYWdlIGFuZCB0cnkgYWdhaW4uJztcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG4gICAgaWYgKFNldHRpbmdzLmdldFByb2ZpbGVCeU5hbWUobmFtZSkpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVuYWJsZSB0byBjcmVhdGUgbW9kdWxlIHByb2ZpbGUuIFByb2ZpbGUgXCIke25hbWV9XCIgYWxyZWFkeSBleGlzdHMhYDtcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG4gICAgY29uc3QgcHJvZmlsZXMgPSBTZXR0aW5ncy5nZXRBbGxQcm9maWxlcygpO1xuICAgIHByb2ZpbGVzLnB1c2goeyBuYW1lOiBuYW1lLCBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sIG1vZHVsZXM6IG1vZHVsZXMgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBTZXR0aW5nc1V0aWxzLnNldFByb2ZpbGVzKHByb2ZpbGVzKTtcbiAgICByZXNwb25zZS50aGVuKCgpID0+IEhvb2tzLmNhbGxBbGwoTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FKSk7XG4gICAgdWkubm90aWZpY2F0aW9ucy5pbmZvKGBQcm9maWxlIFwiJHtuYW1lfVwiIGhhcyBiZWVuIGNyZWF0ZWQhYCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIE1vZHVsZVByb2ZpbGV9IG9yIG11bHRpcGxlIG1vZHVsZSBwcm9maWxlcyBvdXQgb2YgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRob3NlIHByb2ZpbGVzLlxuICogQHBhcmFtIHtzdHJpbmd9IGpzb24gLSBUaGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIHtAbGluayBNb2R1bGVQcm9maWxlfSBvciBhbiBBcnJheSBvZiB7QGxpbmsgTW9kdWxlUHJvZmlsZX1bXSBvYmplY3RzLlxuICogQHJldHVybiB7UHJvbWlzZTxNb2R1bGVQcm9maWxlW10+fSAtIFRoZSBzYXZlZCBhcnJheSBvZiBtb2R1bGUgcHJvZmlsZXMgaW4gdGhlIGdhbWUgc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbXBvcnRQcm9maWxlcyhqc29uKSB7XG4gICAgbGV0IHByb2ZpbGVzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvZmlsZXMpKSB7XG4gICAgICAgIHByb2ZpbGVzID0gW3Byb2ZpbGVzXTtcbiAgICB9XG4gICAgaWYgKHByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiAhaXNWYWxpZE1vZHVsZVByb2ZpbGUocHJvZmlsZSkpKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdVbmFibGUgdG8gaW1wb3J0IHByb2ZpbGVzLiBQbGVhc2UgcmUtZXhwb3J0IGFuZCB0cnkgYWdhaW4uJztcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG4gICAgLy8gV3JpdHRlbiB0aGlzIHdheSB0byBjb250aW51ZSB0cnlpbmcgdG8gY3JlYXRlIHByb2ZpbGVzLCBldmVuIHdoZW4gYSBwcmV2aW91cyBwcm9maWxlIGNvdWxkIG5vdCBiZSBjcmVhdGVkXG4gICAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBTZXR0aW5ncy5jcmVhdGVQcm9maWxlKHByb2ZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChpZ25vcmVkKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCk7XG4gICAgZnVuY3Rpb24gaXNWYWxpZE1vZHVsZVByb2ZpbGUocHJvZmlsZSkge1xuICAgICAgICBpZiAoIXByb2ZpbGUgfHwgcHJvZmlsZS5uYW1lID09IG51bGwgfHwgcHJvZmlsZS5tb2R1bGVzID09IG51bGwgfHwgcHJvZmlsZS5kZXNjcmlwdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2ZpbGUubW9kdWxlcy5ldmVyeShtb2R1bGUgPT4gbW9kdWxlLmlkICYmIG1vZHVsZS50aXRsZSAmJiBtb2R1bGUuaGFzT3duUHJvcGVydHkoJ2lzQWN0aXZlJykpO1xuICAgIH1cbn1cbi8qKlxuICogQWN0aXZhdGVzIHRoZSBwcm9maWxlIHdpdGggdGhlIGdpdmVuIG5hbWUsIHRoZW4gcmVsb2FkcyB0aGUgcGFnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBtb2R1bGUgcHJvZmlsZSB0byBsb2FkLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBXaGVuIHByb2ZpbGUgbmFtZSBkb2VzIG5vdCBleGlzdC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlUHJvZmlsZShwcm9maWxlTmFtZSkge1xuICAgIGNvbnN0IHByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKTtcbiAgICBpZiAoIXByb2ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVuYWJsZSB0byBhY3RpdmF0ZSBtb2R1bGUgcHJvZmlsZS4gUHJvZmlsZSBcIiR7cHJvZmlsZU5hbWV9XCIgZG9lcyBub3QgZXhpc3QhYDtcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG4gICAgU2V0dGluZ3NVdGlscy5zZXRBY3RpdmVQcm9maWxlTmFtZShwcm9maWxlLm5hbWUpXG4gICAgICAgIC50aGVuKCgpID0+IFNldHRpbmdzLnNldENvcmVNb2R1bGVDb25maWd1cmF0aW9uKHByb2ZpbGUubW9kdWxlcykpXG4gICAgICAgIC50aGVuKCgpID0+IFNldHRpbmdzVXRpbHMucmVsb2FkV2luZG93KCkpO1xufVxuLyoqXG4gKiBTYXZlcyB0aGUgY3VycmVudCBwcm9maWxlIHNldHRpbmdzIHRvIGFuIGV4aXN0aW5nIHByb2ZpbGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge1VwZGF0ZVByb2ZpbGVQYXJhbXN9IHBhcmFtcyAtIE5ldyBmaWVsZHMgdG8gdXBkYXRlIG9uIHRoZSBwcm9maWxlLlxuICogQHJldHVybnMge1Byb21pc2U8TW9kdWxlUHJvZmlsZVtdPn0gLSBUaGUgbmV3IEFycmF5IG9mIG1vZHVsZSBwcm9maWxlcy5cbiAqIEB0aHJvd3MgRXJyb3IgLSBXaGVuIGEgcHJvZmlsZSBuYW1lIGlzIHBhc3NlZCBhbmQgbm8gcHJvZmlsZXMgZXhpc3Qgd2l0aCB0aGF0IG5hbWUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQ2hhbmdlc1RvUHJvZmlsZShwcm9maWxlTmFtZSwgcGFyYW1zKSB7XG4gICAgY29uc3Qgc2F2ZWRQcm9maWxlcyA9IFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCk7XG4gICAgY29uc3QgbWF0Y2hpbmdQcm9maWxlSW5kZXggPSBzYXZlZFByb2ZpbGVzLmZpbmRJbmRleChwcm9maWxlID0+IHByb2ZpbGUubmFtZSA9PT0gcHJvZmlsZU5hbWUpO1xuICAgIGlmICghc2F2ZWRQcm9maWxlc1ttYXRjaGluZ1Byb2ZpbGVJbmRleF0pIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVuYWJsZSB0byBzYXZlIG1vZHVsZSBwcm9maWxlIGNoYW5nZXMuIFByb2ZpbGUgXCIke3Byb2ZpbGVOYW1lfVwiIGRvZXMgbm90IGV4aXN0IWA7XG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnN0IGV4aXN0aW5nUHJvZmlsZSA9IHNhdmVkUHJvZmlsZXNbbWF0Y2hpbmdQcm9maWxlSW5kZXhdO1xuICAgIGNvbnN0IG5ld1Byb2ZpbGVOYW1lID0gcGFyYW1zLm5hbWUgPz8gZXhpc3RpbmdQcm9maWxlLm5hbWU7XG4gICAgc2F2ZWRQcm9maWxlc1ttYXRjaGluZ1Byb2ZpbGVJbmRleF0gPSB7XG4gICAgICAgIG5hbWU6IG5ld1Byb2ZpbGVOYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogcGFyYW1zLmRlc2NyaXB0aW9uID8/IGV4aXN0aW5nUHJvZmlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgbW9kdWxlczogcGFyYW1zLm1vZHVsZXMgPz8gZXhpc3RpbmdQcm9maWxlLm1vZHVsZXMsXG4gICAgfTtcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlTmFtZSA9IFNldHRpbmdzVXRpbHMuZ2V0QWN0aXZlUHJvZmlsZU5hbWUoKTtcbiAgICBpZiAoYWN0aXZlUHJvZmlsZU5hbWUgPT09IGV4aXN0aW5nUHJvZmlsZS5uYW1lKSB7XG4gICAgICAgIGF3YWl0IFNldHRpbmdzVXRpbHMuc2V0QWN0aXZlUHJvZmlsZU5hbWUobmV3UHJvZmlsZU5hbWUpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IFNldHRpbmdzVXRpbHMuc2V0UHJvZmlsZXMoc2F2ZWRQcm9maWxlcyk7XG4gICAgcmVzcG9uc2UudGhlbigoKSA9PiBIb29rcy5jYWxsQWxsKE1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSkpO1xuICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhgQ2hhbmdlcyB0byBwcm9maWxlIFwiJHtuZXdQcm9maWxlTmFtZX1cIiBoYXZlIGJlZW4gc2F2ZWQhYCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuLyoqXG4gKiBEZWxldGVzIHRoZSBwcm9maWxlIHdpdGggdGhlIGdpdmVuIG5hbWUuIFdoZW4gdGhlIGN1cnJlbnRseS1hY3RpdmUgcHJvZmlsZSBpcyBkZWxldGVkLCB0aGUgZmlyc3QgcHJvZmlsZSBpcyBzZWxlY3RlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9maWxlIHRvIGRlbGV0ZS5cbiAqIEByZXR1cm4ge1Byb21pc2U8TW9kdWxlUHJvZmlsZVtdIHwgdW5kZWZpbmVkPn0gLSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIHRoZSB1cGRhdGVkIHByb2ZpbGVzIHNldHRpbmcsIG9yIGB1bmRlZmluZWRgIGlmIG5vIHByb2ZpbGVzIHJlbWFpbi5cbiAqIEB0aHJvd3Mge0Vycm9yfSAtIFdoZW4gbm8gcHJvZmlsZSB3aXRoIHRoZSBnaXZlbiBuYW1lIGV4aXN0cy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUocHJvZmlsZU5hbWUpIHtcbiAgICBpZiAoIVNldHRpbmdzLmdldFByb2ZpbGVCeU5hbWUocHJvZmlsZU5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gZGVsZXRlIG1vZHVsZSBwcm9maWxlLiBQcm9maWxlIFwiJHtwcm9maWxlTmFtZX1cIiBkb2VzIG5vdCBleGlzdCFgO1xuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgICBjb25zdCBwcm9maWxlc1RvU2F2ZSA9IFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCkuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5uYW1lICE9PSBwcm9maWxlTmFtZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBTZXR0aW5nc1V0aWxzLnNldFByb2ZpbGVzKHByb2ZpbGVzVG9TYXZlKTtcbiAgICBpZiAocHJvZmlsZXNUb1NhdmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGF3YWl0IFNldHRpbmdzLnJlc2V0UHJvZmlsZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocHJvZmlsZU5hbWUgPT09IFNldHRpbmdzVXRpbHMuZ2V0QWN0aXZlUHJvZmlsZU5hbWUoKSkge1xuICAgICAgICBhd2FpdCBTZXR0aW5nc1V0aWxzLnNldEFjdGl2ZVByb2ZpbGVOYW1lKHByb2ZpbGVzVG9TYXZlWzBdLm5hbWUpO1xuICAgIH1cbiAgICByZXNwb25zZS50aGVuKCgpID0+IEhvb2tzLmNhbGxBbGwoTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FKSk7XG4gICAgdWkubm90aWZpY2F0aW9ucy5pbmZvKGBQcm9maWxlIFwiJHtwcm9maWxlTmFtZX1cIiBoYXMgYmVlbiBkZWxldGVkIWApO1xuICAgIHJldHVybiByZXNwb25zZTtcbn1cbi8qKlxuICogUmVzZXQgYWxsIG1vZHVsZSBwcm9maWxlcyB0byB0aGUgZGVmYXVsdCB2YWx1ZXMuIFdBUk5JTkc6IERvaW5nIHRoaXMgbGVhZHMgdG8gdW5yZWNvdmVyYWJsZSBkYXRhIGxvc3MuXG4gKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzZXRQcm9maWxlcygpIHtcbiAgICBhd2FpdCBTZXR0aW5nc1V0aWxzLnJlc2V0UHJvZmlsZXMoKVxuICAgICAgICAudGhlbigoKSA9PiBTZXR0aW5nc1V0aWxzLnNldEFjdGl2ZVByb2ZpbGVOYW1lKFNldHRpbmdzVXRpbHMuREVGQVVMVF9QUk9GSUxFX05BTUUpKVxuICAgICAgICAudGhlbigoKSA9PiBTZXR0aW5nc1V0aWxzLnJlbG9hZFdpbmRvdygpKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdG8gc2hvdyB0aGUgbW9kdWxlIGljb24gYW5pbWF0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3dNb2R1bGVJY29uQW5pbWF0aW9uKCkge1xuICAgIHJldHVybiBTZXR0aW5nc1V0aWxzLmdldFNob3dNb2R1bGVJY29uQW5pbWF0aW9uKCk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0U2hvd01vZHVsZUljb25BbmltYXRpb24oc2hvd01vZHVsZUFuaW1hdGlvbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gU2V0dGluZ3NVdGlscy5zZXRTaG93TW9kdWxlSWNvbkFuaW1hdGlvbihzaG93TW9kdWxlQW5pbWF0aW9uKTtcbiAgICByZXNwb25zZS50aGVuKCgpID0+IEhvb2tzLmNhbGxBbGwoTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FKSk7XG4gICAgdWkubm90aWZpY2F0aW9ucy5pbmZvKGBNb2R1bGUgaWNvbiBhbmltYXRpb24gaGFzIGJlZW4gJHtzaG93TW9kdWxlQW5pbWF0aW9uID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ31gKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0Q29yZU1vZHVsZUNvbmZpZ3VyYXRpb24obW9kdWxlSW5mb3MpIHtcbiAgICBjb25zdCBtb2R1bGVJbmZvc1RvU2F2ZSA9IE1hcHBpbmdVdGlscy5tYXBUb01vZHVsZUtleUlzQWN0aXZlUmVjb3JkKG1vZHVsZUluZm9zKTtcbiAgICBjb25zdCBjb3JlTW9kdWxlQ29uZmlndXJhdGlvbiA9IGdhbWUuc2V0dGluZ3MuZ2V0KCdjb3JlJywgJ21vZHVsZUNvbmZpZ3VyYXRpb24nKTtcbiAgICBjb25zdCBtZXJnZWRDb25maWd1cmF0aW9uID0geyAuLi5jb3JlTW9kdWxlQ29uZmlndXJhdGlvbiwgLi4ubW9kdWxlSW5mb3NUb1NhdmUgfTtcbiAgICByZXR1cm4gYXdhaXQgZ2FtZS5zZXR0aW5ncy5zZXQoJ2NvcmUnLCAnbW9kdWxlQ29uZmlndXJhdGlvbicsIG1lcmdlZENvbmZpZ3VyYXRpb24pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvdW5kcnlWZXJzaW9uU3RyYXRlZ3koKSB7XG4gICAgY29uc3QgZm91bmRyeVZlcnNpb24gPSBnYW1lLnZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICBzd2l0Y2ggKGZvdW5kcnlWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgICAgcmV0dXJuIHY5O1xuICAgICAgICBjYXNlICcxMCc6XG4gICAgICAgICAgICByZXR1cm4gdjEwO1xuICAgICAgICBjYXNlICcxMSc6XG4gICAgICAgICAgICByZXR1cm4gdjExO1xuICAgICAgICBjYXNlICcxMic6XG4gICAgICAgICAgICByZXR1cm4gdjEyO1xuICAgICAgICBjYXNlICcxMyc6XG4gICAgICAgICAgICByZXR1cm4gdjEzO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYE1vZHVsZSBQcm9maWxlczogRm91bmRyeSB2ZXJzaW9uICcke2dhbWUudmVyc2lvbn0nIGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSBkaXNhYmxlIHRoZSBNb2R1bGUgUHJvZmlsZXMgbW9kdWxlLmA7XG4gICAgICAgICAgICB1aS5ub3RpZmljYXRpb25zLmVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBNYXBwaW5nVXRpbHMgZnJvbSAnLi4vbWFwcGluZy11dGlscyc7XG5pbXBvcnQgKiBhcyBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cyBmcm9tICcuL21vZHVsZS1tYW5hZ2VtZW50LXNjcmlwdHMnO1xuaW1wb3J0IE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtIGZyb20gJy4uLy4uL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0nO1xuaW1wb3J0IENyZWF0ZU1vZHVsZVByb2ZpbGVGb3JtIGZyb20gJy4uLy4uL2NsYXNzZXMvQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0nO1xuaW1wb3J0IHsgTU9EVUxFX0lEIH0gZnJvbSAnLi4vc2V0dGluZ3MtdXRpbHMnO1xuY29uc3QgTU9EVUxFX01BTkFHRU1FTlRfV0lORE9XX0lEID0gJ21vZHVsZS1tYW5hZ2VtZW50Jztcbi8vIFRPRE8gLSBOZWVkcyB0byBiZSBhIHNlcGFyYXRlIGZ1bmN0aW9uIGp1c3QgZm9yIGNsb3NlRGlhbG9nIGluc3RhbmNlcy4gdXBkYXRlQWN0aXZlUHJvZmlsZVN0YXR1c2VzKCkgc2hvdWxkIGJlIGV4cG9zZWQgYW5kIHBlcmZvcm1lZCB3aGVuIHRoaW5ncyBhcmUgY2hhbmdlZFxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hTdGF0dXNFbGVtZW50c09uRGVwZW5kZW5jaWVzQ2xvc2UoYXBwKSB7XG4gICAgaWYgKGFwcC5kYXRhLnRpdGxlID09PSAnRGVwZW5kZW5jaWVzJykge1xuICAgICAgICB1cGRhdGVBbGxTdGF0dXNFbGVtZW50cygpO1xuICAgIH1cbn1cbi8vIFRPRE8gLSBkZWZpbml0ZWx5IHRlc3QgYW5kIHJlbmFtZSBeXiB0aGF0IG1ldGhvZCBhY2NvcmRpbmdseVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVXBkYXRlQWN0aXZlUHJvZmlsZVN0YXR1c2VzKCkge1xuICAgIGlmIChNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy5pc01vZHVsZU1hbmFnZW1lbnRXaW5kb3dPcGVuKCkpIHtcbiAgICAgICAgdXBkYXRlQWxsU3RhdHVzRWxlbWVudHMoKTtcbiAgICB9XG59XG4vKipcbiAqIERldGVybWluZXMgaWYgY2hhbmdlcyBleGlzdCBvbiB0aGUgTW9kdWxlIE1hbmFnZW1lbnQgd2luZG93IHRoYXQgZG9uJ3QgYWxpZ24gd2l0aCBhIGdpdmVuIHByb2ZpbGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSAtIFdoZXRoZXIgdW5zYXZlZCBjaGFuZ2VzIGV4aXN0IG9uIHRoZSBwcm9maWxlIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnNhdmVkQ2hhbmdlc0V4aXN0T24ocHJvZmlsZU5hbWUpIHtcbiAgICBjb25zdCBzYXZlZFByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKTtcbiAgICBpZiAoIXNhdmVkUHJvZmlsZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVuc2F2ZWRNb2R1bGVJbmZvcyA9IGZpbmRVbnNhdmVkTW9kdWxlSW5mb3MoKTtcbiAgICByZXR1cm4gdW5zYXZlZE1vZHVsZUluZm9zLnNvbWUodW5zYXZlZE1vZHVsZUluZm8gPT4ge1xuICAgICAgICBjb25zdCBzYXZlZE1vZHVsZUluZm8gPSBzYXZlZFByb2ZpbGUubW9kdWxlcy5maW5kKHNhdmVkTW9kdWxlSW5mbyA9PiBzYXZlZE1vZHVsZUluZm8uaWQgPT09IHVuc2F2ZWRNb2R1bGVJbmZvLmlkKTtcbiAgICAgICAgcmV0dXJuIHVuc2F2ZWRNb2R1bGVJbmZvLmlzQWN0aXZlICE9PSBzYXZlZE1vZHVsZUluZm8/LmlzQWN0aXZlO1xuICAgIH0pO1xuICAgIC8vIHJldHVybiBPYmplY3QuZW50cmllcyh1bnNhdmVkTW9kdWxlSW5mb3MpLnNvbWUoKFttb2R1bGVJZCwgdW5zYXZlZFN0YXR1c10pID0+IHNhdmVkUHJvZmlsZS5tb2R1bGVzW21vZHVsZUlkXSAhPT0gdW5zYXZlZFN0YXR1cyk7XG59XG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIE1vZHVsZSBNYW5hZ2VtZW50IHdpbmRvdyBpcyBvcGVuLlxuICogQHJldHVybnMge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgTW9kdWxlIE1hbmFnZW1lbnQgd2luZG93IGlzIG9wZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc01vZHVsZU1hbmFnZW1lbnRXaW5kb3dPcGVuKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChNT0RVTEVfTUFOQUdFTUVOVF9XSU5ET1dfSUQpICE9IG51bGw7XG59XG4vLyBUT0RPIC0gdGVzdCBhbGxcbmV4cG9ydCBmdW5jdGlvbiBtb2RpZnlNb2R1bGVNYW5hZ2VtZW50UmVuZGVyKGFwcCwgaHRtbCwgZGF0YSkge1xuICAgIGlmIChnYW1lLnVzZXI/LmlzR00pIHtcbiAgICAgICAgYWRkRm9vdGVyRWxlbWVudHMoKTtcbiAgICAgICAgbW9kaWZ5TW9kdWxlTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgIHVwZGF0ZUFsbFN0YXR1c0VsZW1lbnRzKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEZvb3RlckVsZW1lbnRzKCkge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIGVsZW1lbnRzXG4gICAgICAgIGNvbnN0IHByZUZvb3RlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmVGb290ZXJEaXYuY2xhc3NMaXN0LmFkZCgnbW9kdWxlLXByb2ZpbGVzLWZvb3Rlci1yb3cnKTtcbiAgICAgICAgY29uc3Qgc3RhdHVzQnV0dG9uID0gYnVpbGRTdGF0dXNCdXR0b24oKTtcbiAgICAgICAgY29uc3Qgc2F2ZUN1cnJlbnRDb25maWd1cmF0aW9uQnV0dG9uID0gYnVpbGRDcmVhdGVNb2R1bGVQcm9maWxlQnV0dG9uKCk7XG4gICAgICAgIGNvbnN0IG1hbmFnZVByb2ZpbGVzQnV0dG9uID0gYnVpbGRNYW5hZ2VQcm9maWxlc0J1dHRvbigpO1xuICAgICAgICBwcmVGb290ZXJEaXYuYXBwZW5kKHN0YXR1c0J1dHRvbiwgc2F2ZUN1cnJlbnRDb25maWd1cmF0aW9uQnV0dG9uLCBtYW5hZ2VQcm9maWxlc0J1dHRvbik7XG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyBqdXN0IGJlbG93IHRoZSBtb2R1bGUgbGlzdFxuICAgICAgICBjb25zdCBtb2R1bGVMaXN0ID0gU2V0dGluZ3MuZ2V0Rm91bmRyeVZlcnNpb25TdHJhdGVneSgpLmdldE1vZHVsZUxpc3RDb250YWluZXIoKTtcbiAgICAgICAgU2V0dGluZ3MuZ2V0Rm91bmRyeVZlcnNpb25TdHJhdGVneSgpLmluamVjdE1hbmFnZW1lbnRGb290ZXIobW9kdWxlTGlzdCwgcHJlRm9vdGVyRGl2KTtcbiAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBvZiBzdGF0dXMgYnV0dG9uc1xuICAgICAgICB1cGRhdGVQcm9maWxlU3RhdHVzQnV0dG9ucygpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93IHdpdGggdGhlIG5ldyBlbGVtZW50c1xuICAgICAgICBmb3JjZU1vZHVsZU1hbmFnZW1lbnRXaW5kb3dIZWlnaHRSZXNpemUoKTtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRTdGF0dXNCdXR0b24oKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQcm9maWxlID0gU2V0dGluZ3MuZ2V0QWN0aXZlUHJvZmlsZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBzdGF0dXNCdXR0b24udHlwZSA9ICdidXR0b24nOyAvLyBUT0RPIC0gcHJldmVudHMgc3VibWlzc2lvbiwgdGhlcmVmb3JlIHJlbG9hZGluZyBwYWdlPyAoYW55IGJ1dHRvbiB3aXRoIHR5cGU9XCJzdWJtaXRcIiBhdXRvbWF0aWNhbGx5IHN1Ym1pdHMgZm9ybSlcbiAgICAgICAgICAgIHN0YXR1c0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLWJ1dHRvbicpO1xuICAgICAgICAgICAgc3RhdHVzQnV0dG9uLnN0eWxlLmZsZXhCYXNpcyA9ICc0MCUnO1xuICAgICAgICAgICAgc3RhdHVzQnV0dG9uLmRhdGFzZXQucHJvZmlsZU5hbWUgPSBhY3RpdmVQcm9maWxlLm5hbWU7IC8vIFRPRE8gLSBtYWtlIHRoaXMgYSBsaXR0bGUgbW9yZS4uLiBlYXNpZXIgdG8gZmluZD8gaWRrXG4gICAgICAgICAgICBzdGF0dXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZHVsZUluZm9zID0gZmluZFVuc2F2ZWRNb2R1bGVJbmZvcygpO1xuICAgICAgICAgICAgICAgIFNldHRpbmdzLnNhdmVDaGFuZ2VzVG9Qcm9maWxlKGFjdGl2ZVByb2ZpbGUubmFtZSwgeyBtb2R1bGVzOiBtb2R1bGVJbmZvcyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB1cGRhdGVQcm9maWxlU3RhdHVzQnV0dG9ucygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c0J1dHRvbjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZENyZWF0ZU1vZHVsZVByb2ZpbGVCdXR0b24oKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVNb2R1bGVQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjcmVhdGVNb2R1bGVQcm9maWxlQnV0dG9uLnR5cGUgPSAnYnV0dG9uJzsgLy8gVE9ETyAtIHByZXZlbnRzIHN1Ym1pc3Npb24sIHRoZXJlZm9yZSByZWxvYWRpbmcgcGFnZT8gKGFueSBidXR0b24gd2l0aCB0eXBlPVwic3VibWl0XCIgYXV0b21hdGljYWxseVxuICAgICAgICAgICAgLy8gc3VibWl0cyBmb3JtKVxuICAgICAgICAgICAgY3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPiAke2dhbWUuaTE4bi5sb2NhbGl6ZSgnTU9EVUxFX01BTkFHRU1FTlQuY3JlYXRlTmV3QnV0dG9uLnRleHQnKX08L2J1dHRvbj5gO1xuICAgICAgICAgICAgY3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbi5zdHlsZS5mbGV4QmFzaXMgPSAnMzAlJztcbiAgICAgICAgICAgIGNyZWF0ZU1vZHVsZVByb2ZpbGVCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9ICcxcmVtJztcbiAgICAgICAgICAgIGNyZWF0ZU1vZHVsZVByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuZXcgQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0oKS5yZW5kZXIodHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU1vZHVsZVByb2ZpbGVCdXR0b247XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRNYW5hZ2VQcm9maWxlc0J1dHRvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmFnZVByb2ZpbGVzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBtYW5hZ2VQcm9maWxlc0J1dHRvbi50eXBlID0gJ2J1dHRvbic7IC8vIFRPRE8gLSBwcmV2ZW50cyBzdWJtaXNzaW9uLCB0aGVyZWZvcmUgcmVsb2FkaW5nIHBhZ2U/IChhbnkgYnV0dG9uIHdpdGggdHlwZT1cInN1Ym1pdFwiIGF1dG9tYXRpY2FsbHkgc3VibWl0c1xuICAgICAgICAgICAgLy8gZm9ybSlcbiAgICAgICAgICAgIG1hbmFnZVByb2ZpbGVzQnV0dG9uLnN0eWxlLmZsZXhCYXNpcyA9ICczMCUnO1xuICAgICAgICAgICAgbWFuYWdlUHJvZmlsZXNCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9ICcxcmVtJztcbiAgICAgICAgICAgIG1hbmFnZVByb2ZpbGVzQnV0dG9uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWNvZ1wiPjwvaT4gJHtnYW1lLmkxOG4ubG9jYWxpemUoJ01PRFVMRV9NQU5BR0VNRU5ULm1hbmFnZU1vZHVsZVByb2ZpbGVzQnV0dG9uLnRleHQnKX08L2J1dHRvbj5gO1xuICAgICAgICAgICAgbWFuYWdlUHJvZmlsZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG5ldyBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSgpLnJlbmRlcih0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG1hbmFnZVByb2ZpbGVzQnV0dG9uO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gLSBjb21iaW5lIHdpdGggJ2ZvcmNlTWFuYWdlTW9kdWxlUHJvZmlsZXNIZWlnaHRSZXNpemUnP1xuICAgICAgICBmdW5jdGlvbiBmb3JjZU1vZHVsZU1hbmFnZW1lbnRXaW5kb3dIZWlnaHRSZXNpemUoKSB7XG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHVpLndpbmRvd3MpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihhcHAgPT4gYXBwLm9wdGlvbnMuaWQgPT09IE1PRFVMRV9NQU5BR0VNRU5UX1dJTkRPV19JRClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChhcHAgPT4gYXBwLmVsZW1lbnRbMF0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtb2RpZnlNb2R1bGVMaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IHNob3dBbmltYXRpb24gPSBTZXR0aW5ncy5nZXRTaG93TW9kdWxlSWNvbkFuaW1hdGlvbigpO1xuICAgICAgICBjb25zdCBtb2R1bGVFbGVtZW50cyA9IFNldHRpbmdzLmdldEZvdW5kcnlWZXJzaW9uU3RyYXRlZ3koKS5nZXRNb2R1bGVMaXN0RWxlbWVudHMoKTtcbiAgICAgICAgLy8gQWRkIHN0YXR1cyBpY29ucyBhbmQgYWRkIGFuIFwidXBkYXRlXCIgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBtb2R1bGUgaW4gdGhlIGxpc3RcbiAgICAgICAgbW9kdWxlRWxlbWVudHMuZm9yRWFjaChtb2R1bGUgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXR1c0ljb25Db250YWluZXIgPSBjcmVhdGVNb2R1bGVTdGF0dXNJY29uKCk7XG4gICAgICAgICAgICBpZiAobW9kdWxlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUuY2hpbGRyZW5bMF0ucHJlcGVuZChzdGF0dXNJY29uQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBtb2R1bGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB1cGRhdGVBbGxTdGF0dXNFbGVtZW50cygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciB3aXRoICR7TU9EVUxFX0lEfSAtIGludmFsaWQgbW9kdWxlYCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kdWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZHVsZVN0YXR1c0ljb24oKSB7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtb2R1bGUtcHJvZmlsZXMtc3RhdHVzICR7c2hvd0FuaW1hdGlvbiA/ICdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLWFuaW1hdGlvbicgOiAnJ30gbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1zYXZlZFwiPjwvc3Bhbj5gO1xuICAgICAgICAgICAgcmV0dXJuIHNwYW47XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVBbGxTdGF0dXNFbGVtZW50cygpIHtcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlID0gU2V0dGluZ3MuZ2V0QWN0aXZlUHJvZmlsZSgpO1xuICAgIGNvbnN0IG1vZHVsZXMgPSBTZXR0aW5ncy5nZXRGb3VuZHJ5VmVyc2lvblN0cmF0ZWd5KCkuZ2V0TW9kdWxlTGlzdEVsZW1lbnRzKCk7XG4gICAgbW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiB7XG4gICAgICAgIGlmIChtb2R1bGUuY2hpbGRyZW5bMF0/LmNoaWxkcmVuWzFdPy5jaGlsZHJlblswXSkgLy8gVE9ETyAtIGFwcHJvcHJpYXRlbHkgaGFuZGxlIHRoaXNcbiAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0ljb24gPSBtb2R1bGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gbW9kdWxlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAtICduYW1lJyBmaWVsZCBleGlzdHMgb24gRm91bmRyeSBjaGVja2JveGVzIHdpdGggdGhlIGdpdmVuIG1vZHVsZSBJRHNcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nTW9kdWxlSW5mbyA9IGFjdGl2ZVByb2ZpbGUubW9kdWxlcy5maW5kKG1vZHVsZSA9PiBtb2R1bGUuaWQgPT09IGNoZWNrYm94LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdNb2R1bGVJbmZvICYmIG1hdGNoaW5nTW9kdWxlSW5mby5pc0FjdGl2ZSA9PT0gY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHN0YXR1c0ljb24uY2xhc3NMaXN0LnJlbW92ZSgnbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1jaGFuZ2VkJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzSWNvbi5jbGFzc0xpc3QuYWRkKCdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLXNhdmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0dXNJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ21vZHVsZS1wcm9maWxlcy1zdGF0dXMtc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICBzdGF0dXNJY29uLmNsYXNzTGlzdC5hZGQoJ21vZHVsZS1wcm9maWxlcy1zdGF0dXMtY2hhbmdlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgdXBkYXRlUHJvZmlsZVN0YXR1c0J1dHRvbnMoKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGVTdGF0dXNCdXR0b25zKCkge1xuICAgIGNvbnN0IGFjdGl2ZVByb2ZpbGUgPSBTZXR0aW5ncy5nZXRBY3RpdmVQcm9maWxlKCk7XG4gICAgY29uc3QgaXNVcFRvRGF0ZSA9ICFNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy51bnNhdmVkQ2hhbmdlc0V4aXN0T24oYWN0aXZlUHJvZmlsZS5uYW1lKTtcbiAgICBjb25zdCBwcm9maWxlQnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZHVsZS1wcm9maWxlcy1zdGF0dXMtYnV0dG9uJyk7XG4gICAgQXJyYXkuZnJvbShwcm9maWxlQnV0dG9ucykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBjb25zdCBidXR0b25Qcm9maWxlTmFtZSA9IGJ1dHRvbi5kYXRhc2V0LnByb2ZpbGVOYW1lO1xuICAgICAgICBpZiAoaXNVcFRvRGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQnV0dG9uVGV4dCA9IGdhbWUuaTE4bi5sb2NhbGl6ZSgnTU9EVUxFX01BTkFHRU1FTlQuc3RhdHVzQnV0dG9uLnVwVG9EYXRlJyk7XG4gICAgICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEgZmEtY2hlY2stY2lyY2xlXCIgc3R5bGU9XCJjb2xvcjogbWVkaXVtc2VhZ3JlZW5cIj48L2k+PGI+JHsoYnV0dG9uUHJvZmlsZU5hbWUpfTwvYj4gJHtzdGF0dXNCdXR0b25UZXh0fWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFyIGZhLXNhdmVcIj48L2k+ICR7Z2FtZS5pMThuLmxvY2FsaXplKCdNT0RVTEVfTUFOQUdFTUVOVC5zdGF0dXNCdXR0b24uc2F2ZUNoYW5nZXMnKX0gPGI+JHsoYnV0dG9uUHJvZmlsZU5hbWUpfTwvYj5gO1xuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGlzVXBUb0RhdGU7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaW5kVW5zYXZlZE1vZHVsZUluZm9zKCkge1xuICAgIGNvbnN0IG1vZHVsZUNoZWNrYm94ZXMgPSBTZXR0aW5ncy5nZXRGb3VuZHJ5VmVyc2lvblN0cmF0ZWd5KClcbiAgICAgICAgLmdldE1vZHVsZUxpc3RDb250YWluZXIoKVxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcbiAgICBjb25zdCBhY3RpdmVNb2R1bGVJZHMgPSBBcnJheS5mcm9tKG1vZHVsZUNoZWNrYm94ZXMpXG4gICAgICAgIC5maWx0ZXIoY2hlY2tib3ggPT4gY2hlY2tib3guY2hlY2tlZClcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtICduYW1lJyBmaWVsZCBleGlzdHMgb24gRm91bmRyeSBjaGVja2JveGVzIHdpdGggdGhlIGdpdmVuIG1vZHVsZSBJRHNcbiAgICAgICAgLm1hcChjaGVja2JveCA9PiBjaGVja2JveC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpO1xuICAgIGNvbnN0IGluYWN0aXZlTW9kdWxlSWRzID0gQXJyYXkuZnJvbShtb2R1bGVDaGVja2JveGVzKVxuICAgICAgICAuZmlsdGVyKGNoZWNrYm94ID0+ICFjaGVja2JveC5jaGVja2VkKVxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gJ25hbWUnIGZpZWxkIGV4aXN0cyBvbiBGb3VuZHJ5IGNoZWNrYm94ZXMgd2l0aCB0aGUgZ2l2ZW4gbW9kdWxlIElEc1xuICAgICAgICAubWFwKGNoZWNrYm94ID0+IGNoZWNrYm94LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XG4gICAgY29uc3QgbW9kdWxlTGlzdCA9IHt9O1xuICAgIGFjdGl2ZU1vZHVsZUlkcy5mb3JFYWNoKG1vZHVsZUlkID0+IG1vZHVsZUxpc3RbbW9kdWxlSWRdID0gdHJ1ZSk7XG4gICAgaW5hY3RpdmVNb2R1bGVJZHMuZm9yRWFjaChtb2R1bGVJZCA9PiBtb2R1bGVMaXN0W21vZHVsZUlkXSA9IGZhbHNlKTtcbiAgICByZXR1cm4gTWFwcGluZ1V0aWxzLm1hcFRvTW9kdWxlSW5mb3MobW9kdWxlTGlzdCk7XG59XG4iLCJmdW5jdGlvbiBnZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvblY5KCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGdhbWUubW9kdWxlcykubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgICAgIGlkOiBrZXksXG4gICAgICAgIHRpdGxlOiB2YWx1ZS5kYXRhLnRpdGxlLFxuICAgICAgICBpc0FjdGl2ZTogdmFsdWUuYWN0aXZlLFxuICAgIH0pKS5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpO1xufVxuZnVuY3Rpb24gZ2V0TW9kdWxlTGlzdEVsZW1lbnRzVjkoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtb2R1bGUtbWFuYWdlbWVudCBsaVtkYXRhLW1vZHVsZS1uYW1lXScpO1xufVxuZnVuY3Rpb24gZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkVjlUb1YxMShtb2R1bGVJZCkge1xuICAgIHJldHVybiBnYW1lLm1vZHVsZXMuZ2V0KG1vZHVsZUlkKT8uZGF0YS50aXRsZTtcbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uVjEwUGx1cygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShnYW1lLm1vZHVsZXMpLm1hcChtb2R1bGUgPT4gKHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIHYxMCsgc2NoZW1hXG4gICAgICAgIGlkOiBtb2R1bGUuaWQsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSB2MTArIHNjaGVtYVxuICAgICAgICB0aXRsZTogbW9kdWxlLnRpdGxlLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gdjEwKyBzY2hlbWFcbiAgICAgICAgaXNBY3RpdmU6IG1vZHVsZS5hY3RpdmUsXG4gICAgfSkpLnNvcnQoKGEsIGIpID0+IGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKSk7XG59XG5mdW5jdGlvbiBnZXRNb2R1bGVMaXN0RWxlbWVudHNWMTBQbHVzKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbW9kdWxlLW1hbmFnZW1lbnQgbGlbZGF0YS1tb2R1bGUtaWRdJyk7XG59XG5mdW5jdGlvbiBmaW5kTW9kdWxlVGl0bGVGcm9tTW9kdWxlSWRWMTJQbHVzKG1vZHVsZUlkKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRpdGxlIGlzIGlubGluZWQgaW4gdGhlIG1vZHVsZSBvYmplY3QgaW4gdjEyXG4gICAgcmV0dXJuIGdhbWUubW9kdWxlcy5nZXQobW9kdWxlSWQpPy50aXRsZTtcbn1cbmZ1bmN0aW9uIGdldE1vZHVsZUxpc3RDb250YWluZXJWOVRvVjEyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kdWxlLWxpc3QnKTtcbn1cbmZ1bmN0aW9uIGdldE1vZHVsZUxpc3RDb250YWluZXJWMTNQbHVzKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFja2FnZS1saXN0Jyk7XG59XG5mdW5jdGlvbiBpbmplY3RNYW5hZ2VtZW50Rm9vdGVyVjlUb1YxMihtb2R1bGVMaXN0Q29udGFpbmVyLCBmb290ZXIpIHtcbiAgICBtb2R1bGVMaXN0Q29udGFpbmVyLmFmdGVyKGZvb3Rlcik7XG59XG5mdW5jdGlvbiBpbmplY3RNYW5hZ2VtZW50Rm9vdGVyVjEzUGx1cyhtb2R1bGVMaXN0Q29udGFpbmVyLCBmb290ZXIpIHtcbiAgICBtb2R1bGVMaXN0Q29udGFpbmVyLmJlZm9yZShmb290ZXIpO1xufVxuZXhwb3J0IGNvbnN0IHY5ID0ge1xuICAgIHZlcnNpb246IDksXG4gICAgZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb246IGdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uVjksXG4gICAgZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkOiBmaW5kTW9kdWxlVGl0bGVGcm9tTW9kdWxlSWRWOVRvVjExLFxuICAgIGdldE1vZHVsZUxpc3RFbGVtZW50czogZ2V0TW9kdWxlTGlzdEVsZW1lbnRzVjksXG4gICAgZ2V0TW9kdWxlTGlzdENvbnRhaW5lcjogZ2V0TW9kdWxlTGlzdENvbnRhaW5lclY5VG9WMTIsXG4gICAgaW5qZWN0TWFuYWdlbWVudEZvb3RlcjogaW5qZWN0TWFuYWdlbWVudEZvb3RlclY5VG9WMTIsXG59O1xuZXhwb3J0IGNvbnN0IHYxMCA9IHtcbiAgICB2ZXJzaW9uOiAxMCxcbiAgICBnZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbjogZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb25WMTBQbHVzLFxuICAgIGZpbmRNb2R1bGVUaXRsZUZyb21Nb2R1bGVJZDogZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkVjlUb1YxMSxcbiAgICBnZXRNb2R1bGVMaXN0RWxlbWVudHM6IGdldE1vZHVsZUxpc3RFbGVtZW50c1YxMFBsdXMsXG4gICAgZ2V0TW9kdWxlTGlzdENvbnRhaW5lcjogZ2V0TW9kdWxlTGlzdENvbnRhaW5lclY5VG9WMTIsXG4gICAgaW5qZWN0TWFuYWdlbWVudEZvb3RlcjogaW5qZWN0TWFuYWdlbWVudEZvb3RlclY5VG9WMTIsXG59O1xuZXhwb3J0IGNvbnN0IHYxMSA9IHtcbiAgICB2ZXJzaW9uOiAxMSxcbiAgICBnZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbjogZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb25WMTBQbHVzLFxuICAgIGZpbmRNb2R1bGVUaXRsZUZyb21Nb2R1bGVJZDogZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkVjlUb1YxMSxcbiAgICBnZXRNb2R1bGVMaXN0RWxlbWVudHM6IGdldE1vZHVsZUxpc3RFbGVtZW50c1YxMFBsdXMsXG4gICAgZ2V0TW9kdWxlTGlzdENvbnRhaW5lcjogZ2V0TW9kdWxlTGlzdENvbnRhaW5lclY5VG9WMTIsXG4gICAgaW5qZWN0TWFuYWdlbWVudEZvb3RlcjogaW5qZWN0TWFuYWdlbWVudEZvb3RlclY5VG9WMTIsXG59O1xuZXhwb3J0IGNvbnN0IHYxMiA9IHtcbiAgICB2ZXJzaW9uOiAxMixcbiAgICBnZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbjogZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb25WMTBQbHVzLFxuICAgIGZpbmRNb2R1bGVUaXRsZUZyb21Nb2R1bGVJZDogZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkVjEyUGx1cyxcbiAgICBnZXRNb2R1bGVMaXN0RWxlbWVudHM6IGdldE1vZHVsZUxpc3RFbGVtZW50c1YxMFBsdXMsXG4gICAgZ2V0TW9kdWxlTGlzdENvbnRhaW5lcjogZ2V0TW9kdWxlTGlzdENvbnRhaW5lclY5VG9WMTIsXG4gICAgaW5qZWN0TWFuYWdlbWVudEZvb3RlcjogaW5qZWN0TWFuYWdlbWVudEZvb3RlclY5VG9WMTIsXG59O1xuZXhwb3J0IGNvbnN0IHYxMyA9IHtcbiAgICB2ZXJzaW9uOiAxMyxcbiAgICBnZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbjogZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb25WMTBQbHVzLFxuICAgIGZpbmRNb2R1bGVUaXRsZUZyb21Nb2R1bGVJZDogZmluZE1vZHVsZVRpdGxlRnJvbU1vZHVsZUlkVjEyUGx1cyxcbiAgICBnZXRNb2R1bGVMaXN0RWxlbWVudHM6IGdldE1vZHVsZUxpc3RFbGVtZW50c1YxMFBsdXMsXG4gICAgZ2V0TW9kdWxlTGlzdENvbnRhaW5lcjogZ2V0TW9kdWxlTGlzdENvbnRhaW5lclYxM1BsdXMsXG4gICAgaW5qZWN0TWFuYWdlbWVudEZvb3RlcjogaW5qZWN0TWFuYWdlbWVudEZvb3RlclYxM1BsdXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCAqIGFzIEFQSSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgKiBhcyBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cyBmcm9tICcuL3VpL21vZHVsZS1tYW5hZ2VtZW50LXNjcmlwdHMnO1xuaW1wb3J0ICogYXMgTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm1GdW5jdGlvbnMgZnJvbSAnLi4vY2xhc3Nlcy9NYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSc7XG4vLyBNb2R1bGUgc2V0dXBcbkhvb2tzLm9uY2UoJ3JlYWR5JywgU2V0dGluZ3MucmVnaXN0ZXJNb2R1bGVTZXR0aW5ncyk7XG5Ib29rcy5vbmNlKCdyZWFkeScsIEFQSS5yZWdpc3RlckFwaSk7XG4vLyBNb2R1bGUgTWFuYWdlbWVudCB3aW5kb3cgaG9va3Ncbkhvb2tzLm9uKCdyZW5kZXJNb2R1bGVNYW5hZ2VtZW50JywgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMubW9kaWZ5TW9kdWxlTWFuYWdlbWVudFJlbmRlcik7XG5Ib29rcy5vbignY2xvc2VEaWFsb2cnLCBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy5yZWZyZXNoU3RhdHVzRWxlbWVudHNPbkRlcGVuZGVuY2llc0Nsb3NlKTtcbkhvb2tzLm9uKE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLk1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSwgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMuY2hlY2tVcGRhdGVBY3RpdmVQcm9maWxlU3RhdHVzZXMpO1xuLy8gTW9kdWxlIFByb2ZpbGVzIE1hbmFnZW1lbnQgd2luZG93IGhvb2tzXG5Ib29rcy5vbihNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybUZ1bmN0aW9ucy5NT0RVTEVfUFJPRklMRVNfVVBEQVRFRF9IT09LX05BTUUsIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLnJlUmVuZGVyTWFuYWdlTW9kdWxlUHJvZmlsZXNXaW5kb3dzKTtcbkhvb2tzLm9uKE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLlJFTkRFUl9IT09LX05BTUUsIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLmZvcmNlTWFuYWdlTW9kdWxlUHJvZmlsZXNIZWlnaHRSZXNpemUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9