class ForceClientSettings {
  static moduleName = "force-client-settings";
  static version = "2.4.1";
  static migration = false;
  static forced = new Map();
  static unlocked = new Map();
  static restricted = new Map();
  static hideForced = false;

  static isGM(defaultResult = false) {
    if (game.user) {
      return game.user.role >= CONST.USER_ROLES.GAMEMASTER;
    } else {
      try {
        return game.data.users.find((u) => u._id === game.userId).role >= CONST.USER_ROLES.GAMEMASTER;
      } catch {
        return defaultResult;
      }
    }
  }

  static initialize() {
    game.settings.register(ForceClientSettings.moduleName, "forced", {
      name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced.name")}`,
      hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced.hint")}`,
      scope: "world",
      config: false,
      type: Object,
      default: {},
    });
    game.settings.register(ForceClientSettings.moduleName, "unlocked", {
      name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.unlocked.name")}`,
      hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.unlocked.hint")}`,
      scope: "client",
      config: false,
      type: Object,
      default: {},
    });
    game.settings.register(ForceClientSettings.moduleName, "restricted", {
      name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.restricted.name")}`,
      hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.restricted.hint")}`,
      scope: "world",
      config: false,
      type: Object,
      default: {},
    });
    game.settings.registerMenu(ForceClientSettings.moduleName, "forcedConfig", {
      name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-config.name")}`,
      label: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-config.label")}`,
      restricted: true,
      icon: "fas fa-lock",
      type: ForceClientSettingsConfig,
    });
    game.settings.register(ForceClientSettings.moduleName, "hideForced", {
      name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.hide-forced.name")}`,
      hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.hide-forced.hint")}`,
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      onChange: (value) => {
        ForceClientSettings.hideForced = value;
      },
    });

    ForceClientSettings.forced = new Map(Object.entries(game.settings.get(ForceClientSettings.moduleName, "forced")));
    ForceClientSettings.unlocked = new Map(Object.entries(game.settings.get(ForceClientSettings.moduleName, "unlocked")));
    ForceClientSettings.restricted = new Map(Object.entries(game.settings.get(ForceClientSettings.moduleName, "restricted")));
    ForceClientSettings.hideForced = game.settings.get(ForceClientSettings.moduleName, "hideForced");

    if (foundry.utils.isNewerVersion(game.version, 13)) {
      foundry.utils.mergeObject(foundry.applications.settings.SettingsConfig.PARTS, { main: { scrollable: [".tab.active"] } });
      libWrapper.register(
        ForceClientSettings.moduleName,
        "foundry.helpers.ClientSettings.prototype.register",
        ForceClientSettings.settingsRegister,
        "WRAPPER"
      );
      libWrapper.register(
        ForceClientSettings.moduleName,
        "foundry.helpers.ClientSettings.prototype.get",
        ForceClientSettings.settingsGet,
        "MIXED"
      );
      libWrapper.register(
        ForceClientSettings.moduleName,
        "foundry.helpers.ClientSettings.prototype.set",
        ForceClientSettings.settingsSet,
        "WRAPPER"
      );
    } else {
      libWrapper.register(
        ForceClientSettings.moduleName,
        "SettingsConfig.defaultOptions",
        ForceClientSettings.settingsConfigDefaultOptions,
        "WRAPPER"
      );
      libWrapper.register(
        ForceClientSettings.moduleName,
        "ClientSettings.prototype.register",
        ForceClientSettings.settingsRegister,
        "WRAPPER"
      );
      libWrapper.register(
        ForceClientSettings.moduleName,
        "ClientSettings.prototype.get",
        ForceClientSettings.settingsGet,
        "MIXED"
      );
      libWrapper.register(
        ForceClientSettings.moduleName,
        "ClientSettings.prototype.set",
        ForceClientSettings.settingsSet,
        "WRAPPER"
      );
    }

    for (const [key, value] of game.settings.settings) {
      try {
        ((ForceClientSettings.forced.has(key) && console.warn) || console.debug)(
          `Force Client Settings | Came late for registration of ${key}, issues may ensue`
        );
        game.settings.register(value.namespace, value.key, value);
      } catch (e) {
        console.error(`Force Client Settings | Error while re-registering game settings`, e);
      }
    }

    Hooks.on("renderSettingsConfig", ForceClientSettings.renderSettingsConfig);
    Hooks.on("ready", ForceClientSettings.migrate);
  }

  static settingsConfigDefaultOptions(wrapped, ...args) {
    return foundry.utils.mergeObject(wrapped(...args), { scrollY: [".tab.active .settings-list", ".scrollable"] });
  }

  static isForced(key) {
    return game?.settings?.settings?.get(key)?.scope !== "world"
      && !ForceClientSettings.migration
      && ForceClientSettings.forced.has(key)
      && (
        ForceClientSettings.isGM() && !ForceClientSettings.unlocked.has(key)
        || !ForceClientSettings.isGM() && (
          ForceClientSettings.forced.get(key).mode !== "soft"
          || !ForceClientSettings.unlocked.has(key))
      );
  }
 
  static isRestricted(key) {
    return !ForceClientSettings.migration
      && !ForceClientSettings.isGM()
      && ForceClientSettings.restricted.has(key);
  }

  static async saveForced() {
    await game.settings.set(
      ForceClientSettings.moduleName,
      "forced",
      Object.fromEntries(ForceClientSettings.forced)
    );
  }

  static async saveUnlocked() {
    await game.settings.set(
      ForceClientSettings.moduleName,
      "unlocked",
      Object.fromEntries(ForceClientSettings.unlocked)
    );
  }

  static async saveRestricted() {
    await game.settings.set(
      ForceClientSettings.moduleName,
      "restricted",
      Object.fromEntries(ForceClientSettings.restricted)
    );
  }

  static settingsRegister(wrapped, namespace, key, data, ...args) {
    const keyName = `${namespace}.${key}`;
    if (
      !ForceClientSettings.migration &&
      ForceClientSettings.forced.has(keyName) &&
      data?.scope !== "world"
    ) {
      if (
        ForceClientSettings.hideForced &&
        !ForceClientSettings.isGM(true) &&
        ForceClientSettings.forced.get(keyName).mode !== "soft"
      ) {
        data = { ...data, config: false };
      }
      const result = wrapped(namespace, key, data, ...args);
      console.debug(`Force Client Settings | Forcing ${keyName}`);
      if (data.type instanceof foundry?.data?.fields?.DataField) {
        const newType = Object.assign(Object.create(Object.getPrototypeOf(data.type)), data.type);
        data = {...data, type: newType};
      }
      try {
        wrapped(
          ForceClientSettings.moduleName,
          `_${keyName}`,
          { ...data, scope: "world", config: false, onChange: null },
          ...args
        );
      } catch (e) {
        console.error(`Force Client Settings | Error while forcing ${keyName}`, e);
      }
      return result;
    } else {
      return wrapped(namespace, key, data, ...args);
    }
  }

  static settingsGet(wrapped, namespace, key, ...args) {
    const keyName = `${namespace}.${key}`;
    if (ForceClientSettings.isForced(keyName)) {
      return wrapped(ForceClientSettings.moduleName, `_${keyName}`, ...args);
    }
    return wrapped(namespace, key, ...args);
  }

  static async settingsSet(wrapped, namespace, key, value, ...args) {
    const keyName = `${namespace}.${key}`;
    if (ForceClientSettings.isForced(keyName)) {
      if (ForceClientSettings.isGM()) {
        try {
          await wrapped(ForceClientSettings.moduleName, `_${keyName}`, value, ...args);
        } catch (e) {
          console.error(`Force Client Settings | Failed to set the internal world setting _${keyName} (error: ${e})`);
        }
        return await wrapped(namespace, key, value, ...args);
      } else {
        let forcedValue = game.settings.get(ForceClientSettings.moduleName, `_${keyName}`);
        return await wrapped(namespace, key, forcedValue, ...args);
      }
    } else {
      return await wrapped(namespace, key, value, ...args);
    }
  }

  static async renderSettingsConfig(app, html) {
    while (!app.rendered) {
      await new Promise((resolve) => resolve());
    }
    const isGM = ForceClientSettings.isGM();
    const fa = {
      "hard-gm": "fa-lock",
      "soft-gm": "fa-unlock-keyhole",
      "open-gm": "fa-lock-keyhole-open",
      "unlocked-gm": "fa-dungeon",
      "hard-client": "fa-lock",
      "soft-client": "fa-unlock-keyhole",
      "unlocked-client": "fa-lock-keyhole-open",
      "restricted-gm": "fa-eye-slash",
      "unrestricted-gm": "fa-eye",
    };

    let elem = $(html).find(".form-group:not(.submenu)");
    elem.each(function() {
      const key = $(this).find("input,select").first().prop("name");
      if (key && game.settings.settings.has(key) && game.settings.settings.get(key).scope !== "world") {
        const label = $(this).find("label").first();
        let mode = ForceClientSettings.forced.get(key)?.mode ?? "open";
        if ((mode === "soft" || isGM) && ForceClientSettings.unlocked.has(key)) mode = "unlocked";
        mode += isGM ? "-gm" : "-client";
        if (mode !== "open-client") {
          label.prepend(
            $("<span>")
              .html("&nbsp;")
              .prop("title", game.i18n.localize(`FORCECLIENTSETTINGS.ui.${mode}-hint`))
              .data("settings-key", key)
              .addClass(`fas ${fa[mode]}`)
              .click(async function(event) {
                await ForceClientSettings.clickToggleForceSettings(event, key, app);
              })
          );
        }
        if (["hard-client", "soft-client"].includes(mode)) {
          $(this).find("input,select").prop("disabled", "true");
        }
      }
    });
    elem = $(html).find(".form-group.submenu");
    elem.each(function() {
      const key = $(this).find("button").first().data("key");
      if (key && game.settings.menus.has(key) && !game.settings.menus.get(key).restricted) {
        const label = $(this).find("label").first();
        if (isGM) {
          let mode = ForceClientSettings.restricted.get(key)?.mode ?? "unrestricted";
          mode += isGM ? "-gm" : "-client";
          label.prepend(
            $("<span>")
              .html("&nbsp;")
              .prop("title", game.i18n.localize(`FORCECLIENTSETTINGS.ui.${mode}-hint`))
              .data("settings-key", key)
              .addClass(`fas ${fa[mode]}`)
              .click(async function(event) {
                await ForceClientSettings.clickToggleRestrictSettings(event, key, app);
              })
          );
        } else if (ForceClientSettings.isRestricted(key)) {
          $(this).remove();
        }
      }
    });
  }

  static async clickToggleForceSettings(event, key, app) {
    let mode = ForceClientSettings.forced.get(key)?.mode ?? "open";
    if (ForceClientSettings.isGM()) {
      await app.submit({ preventClose: true, preventRender: true });
      event.preventDefault();
      if (mode === "open") {
        await ForceClientSettings.forceSetting(key, "soft");
      } else if (ForceClientSettings.unlocked.has(key)) {
        await ForceClientSettings.lockSetting(key);
      } else if (event.altKey) {
        await ForceClientSettings.unlockSetting(key);
      } else if (mode === "soft") {
        await ForceClientSettings.forceSetting(key, "hard");
      } else {
        await ForceClientSettings.unforceSetting(key);
      }
      app.render();
    } else {
      if (mode === "soft") {
        await app.submit({ preventClose: true, preventRender: true });
        event.preventDefault();
        if (ForceClientSettings.unlocked.has(key)) {
          await ForceClientSettings.lockSetting(key);
        } else {
          await ForceClientSettings.unlockSetting(key);
        }
        app.render();
      }
    }
  }
  
  static async clickToggleRestrictSettings(event, key, app) {
    let mode = ForceClientSettings.restricted.get(key)?.mode ?? "unrestricted";
    if (ForceClientSettings.isGM()) {
      await app.submit({ preventClose: true, preventRender: true });
      event.preventDefault();
      if (mode === "unrestricted") {
        await ForceClientSettings.restrictSetting(key);
      } else {
        await ForceClientSettings.unrestrictSetting(key);
      }
      app.render();
    }
  }

  static async forceSetting(key, mode) {
    if (!ForceClientSettings.isGM()) return;
    try {
      const settings = { ...game.settings.settings.get(key), scope: "world", config: false, onChange: null };
      const value = game.settings.get(...key.split(/\.(.*)/).slice(0, 2));
      if (settings.type instanceof foundry?.data?.fields?.DataField) {
        settings.type = Object.assign(Object.create(Object.getPrototypeOf(settings.type)), settings.type);
        settings.dataField = settings.type;
      }
      game.settings.register(ForceClientSettings.moduleName, `_${key}`, settings);
      await game.settings.set(ForceClientSettings.moduleName, `_${key}`, value);
      ForceClientSettings.forced.set(key, { mode: mode });
      await ForceClientSettings.saveForced();
    } catch (exc) {
      console.log(`Force Client Settings | Unable to force ${key}`);
    }
  }

  static async unforceSetting(key) {
    if (!ForceClientSettings.isGM()) return;
    ForceClientSettings.forced.delete(key);
    await ForceClientSettings.saveForced();
  }

  static async unlockSetting(key) {
    if (ForceClientSettings.forced.has(key)) {
      const forced = ForceClientSettings.forced.get(key);
      if (forced.mode === "soft" || ForceClientSettings.isGM()) {
        ForceClientSettings.unlocked.set(key, true);
        ForceClientSettings.saveUnlocked();
        const settings = game.settings.settings.get(key);
        if (settings.onChange instanceof Function)
          settings.onChange(game.settings.get(settings.namespace, settings.key));
      }
    }
  }

  static async lockSetting(key) {
    if (ForceClientSettings.forced.has(key)) {
      const forced = ForceClientSettings.forced.get(key);
      if (forced.mode === "soft" || ForceClientSettings.isGM()) {
        ForceClientSettings.unlocked.delete(key);
        ForceClientSettings.saveUnlocked();
        const settings = game.settings.settings.get(key);
        if (settings.onChange instanceof Function)
          settings.onChange(game.settings.get(settings.namespace, settings.key));
      }
    }
  }

  static async restrictSetting(key) {
    if (!ForceClientSettings.isGM()) return;
    ForceClientSettings.restricted.set(key, { mode: "restricted" });
    await ForceClientSettings.saveRestricted();
  }

  static async unrestrictSetting(key) {
    if (!ForceClientSettings.isGM()) return;
    ForceClientSettings.restricted.delete(key);
    await ForceClientSettings.saveRestricted();
  }

  static async migrate() {
    ForceClientSettings.migration = true;
    if (ForceClientSettings.isGM()) {
      game.settings.register(ForceClientSettings.moduleName, "versionWorld", {
        name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.migration.name")}`,
        hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.migration.hint")}`,
        scope: "world",
        config: false,
        type: String,
        default: "1.0.0",
      });
      let versionWorld = game.settings.get(ForceClientSettings.moduleName, "versionWorld");
      const compareVersion = function(a, b) {
        a = a.split(".").map((x) => parseInt(x));
        return b
          .split(".")
          .map((x) => parseInt(x))
          .reduce((acc, x, i) => (acc === 0 ? a[i] - x : acc), 0);
      };
      if (compareVersion(versionWorld, "2.0.0") < 0) {
        // Migration from 1.x.x to 2.0.0
        game.settings.register(ForceClientSettings.moduleName, "forcedSettings", {
          name: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-settings.name")}`,
          hint: `${game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-settings.hint")}`,
          scope: "world",
          config: false,
          type: String,
          default: "{}",
        });
        let forcedSettings = game.settings.get(ForceClientSettings.moduleName, "forcedSettings");
        if (forcedSettings !== "{}") {
          forcedSettings = JSON.parse(forcedSettings);
          for (const key of Object.keys(forcedSettings)) {
            try {
              const settings = game.settings.settings.get(key);
              game.settings.register(settings.namespace, settings.key, {
                ...settings,
                scope: "world",
                onChange: null,
              });
              const value = game.settings.get(settings.namespace, settings.key);
              game.settings.register(settings.namespace, settings.key, { ...settings, onChange: null });
              await game.settings.set(settings.namespace, settings.key, value);
              await ForceClientSettings.forceSetting(`${settings.namespace}.${settings.key}`, "hard");
              console.log(`Force Client Settings | Successfully migrated ${key}`);
            } catch (exc) {
              console.log(`Force Client Settings | Could not migrate ${key}`);
            }
          }
          console.log(`Force Client Settings | Finished migration to 2.0.0`);
          ui.notifications.notify(game.i18n.localize("FORCECLIENTSETTINGS.ui.migration-note"), "warning", {
            permanent: true,
          });
        }
        game.settings.set(ForceClientSettings.moduleName, "versionWorld", "2.0.0");
      }
      if (compareVersion(versionWorld, "2.4.1") < 0) {
        // Migration from 2.0.0 to 2.4.1
        if (ForceClientSettings.forced.size > 0) {
          ForceClientSettings.forced.forEach((value, key) => {
            if (value.escaped) ForceClientSettings.unlocked.set(key, true);
            ForceClientSettings.forced.set(key, { mode: value.mode });
          });
          ForceClientSettings.saveForced();
          ForceClientSettings.saveUnlocked();
          console.log(`Force Client Settings | Finished migration to 2.4.1`);
          ui.notifications.notify(game.i18n.localize("FORCECLIENTSETTINGS.ui.migration-note"), "warning", {
            permanent: true,
          });
        }
        game.settings.set(ForceClientSettings.moduleName, "versionWorld", "2.4.1");
      }
    }
    ForceClientSettings.migration = false;
  }
}

class ForceClientSettingsConfig extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-config.title"),
      id: "force-client-settings-app",
      template: `modules/${ForceClientSettings.moduleName}/templates/forced-config.html`,
      width: 600,
      height: "auto",
      scrollY: [".settings-list"],
    });
  }
  static filter = true;

  getData(options) {
    const fa = {
      hard: "fa-lock",
      soft: "fa-unlock-keyhole",
      open: "fa-lock-keyhole-open",
      unlocked: "fa-dungeon",
    };
    const namespace_blacklist = ["force-client-settings", "force-client-controls"];
    return {
      data: {
        filter: ForceClientSettingsConfig.filter,
        namespaces: Array.from(game.settings.settings)
          .filter(
            ([, item]) =>
              item.scope !== "world" &&
              !namespace_blacklist.includes(item.namespace) &&
              (!item.config || !ForceClientSettingsConfig.filter)
          )
          .map(([, item]) => ({ namespace: item.namespace, key: item.key, name: item.name, fa: "fa-lock" }))
          .reduce(
            (acc, item) => ({
              ...acc,
              [item.namespace]: {
                namespace: item.namespace,
                keys: {
                  ...acc[item.namespace]?.keys,
                  [item.key]: {
                    key: item.key,
                    namespace: item.namespace,
                    name:
                      (game.modules.get("df-settings-clarity")?.active ? item.name.substr(2) : item.name) +
                      (`${item.namespace}.${item.key}` === "core.keybindings"
                        ? " " + game.i18n.localize("FORCECLIENTSETTINGS.settings.forced-config.keybindings")
                        : ""),
                    fa: fa[(ForceClientSettings.unlocked.has(`${item.namespace}.${item.key}`) && "unlocked")
                      || (ForceClientSettings.forced.get(`${item.namespace}.${item.key}`)?.mode ?? "open")],
                    hint: game.i18n.localize(
                      `FORCECLIENTSETTINGS.ui.${(ForceClientSettings.unlocked.has(`${item.namespace}.${item.key}`) && "unlocked")
                      || (ForceClientSettings.forced.get(`${item.namespace}.${item.key}`)?.mode ?? "open")}-gm-hint`
                    ),
                  },
                },
              },
            }),
            {}
          ),
      },
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    const app = this;
    $(html).find("span.fas").click(async function(event) {
      await ForceClientSettings.clickToggleForceSettings(event, $(event.currentTarget).data("settings-key"), app);
    });
    $(html).find("button[name='unlock-all'").click(async function(event) {
      new Dialog({
        title: "Force Client Settings",
        content: "Unlock all client settings?",
        buttons: {
          yes: {
            icon: '<i class="fas fa-check"></i>',
            label: game.i18n.localize("FORCECLIENTSETTINGS.ui.yes"),
            callback: async function() {
              ForceClientSettings.forced.clear();
              ForceClientSettings.unlocked.clear();
              await ForceClientSettings.saveForced();
              await ForceClientSettings.saveUnlocked();
              app.render();
            },
          },
          no: { icon: '<i class="fas fa-times"></i>', label: game.i18n.localize("FORCECLIENTSETTINGS.ui.no") },
        },
      }).render(true);
    });
    $(html).find("input[name='force-client-settings-filter']").on("change", function(event) {
      ForceClientSettingsConfig.filter = event.currentTarget.checked;
      app.render();
    });
  }

  _updateObject() { }
}

Hooks.once("libWrapper.Ready", ForceClientSettings.initialize);
