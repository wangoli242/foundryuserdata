import { CinematicConfig } from "./CinematicConfig.js";
import { CinematicAllOutConfig } from "./CinematicAllOutConfig.js";
import { CutinManager } from "./CutinManager.js";
import { AllOutManager } from "./AllOutManager.js";
import { InteractionManager } from "./InteractionManager.js";
import { exportPreset, importPreset } from "./preset-export.js";
import { sanitizeManualPanels } from "./manual-panel-geometry.js";
import { getSetupTour } from "./setup-tour.js";
import { ACTIVE_CONFIG_PRESET_ID } from "./preset-resolution.js";
import {
  CHARACTER_IMAGE_SOURCE,
  resolveCharacterImageSource,
} from "./actor-image-source.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class CinematicControl extends HandlebarsApplicationMixin(
  ApplicationV2,
) {
  constructor(options = {}) {
    super(options);
    this.expandedActors = new Set();
    this.selectedActorIds = new Set();
    this.activeTab = "actors";

    this.filterMode = "all"; // all, character, npc
    this.searchQuery = "";
    this.itemsPerPage = 50;
    this.currentLimit = 50;
    this._savedScrollTop = 0;

    this._onUpdateActor = this._onUpdateActor.bind(this);
    this._onUpdateUser = this._onUpdateUser.bind(this);
    this._onUpdateSetting = this._onUpdateSetting.bind(this);

    Hooks.on("updateActor", this._onUpdateActor);
    Hooks.on("updateUser", this._onUpdateUser);
    Hooks.on("updateSetting", this._onUpdateSetting);
  }

  static DEFAULT_OPTIONS = {
    tag: "div",
    id: "cinematic-control-panel",
    classes: ["cinematic-control"],
    window: {
      title: "Cinematic Control",
      icon: "fas fa-gamepad",
      resizable: true,
      width: 500,
      height: 650,
      controls: [
        {
          icon: "fas fa-question-circle",
          label: "CINEMATIC.Control.Title.SetupGuide",
          action: "setupGuide",
          visible: true,
        },
      ],
    },
    position: { width: 500, height: 650 },
    actions: {
      tabSwitch: CinematicControl.prototype._onTabSwitch,
      toggleAccordion: CinematicControl.prototype._onToggleAccordion,
      configure: CinematicControl.prototype._onConfigure,
      play: CinematicControl.prototype._onPlay,
      deletePreset: CinematicControl.prototype._onDeletePreset,
      playAllOut: CinematicControl.prototype._onOpenAllOutConfig,
      setupGuide: CinematicControl.prototype._onSetupGuide,
      playGroupPreset: CinematicControl.prototype._onPlayGroupPreset,
      editGroupPreset: CinematicControl.prototype._onEditGroupPreset,
      deleteGroupPreset: CinematicControl.prototype._onDeleteGroupPreset,
      copyMacro: CinematicControl.prototype._onCopyMacro,
      copyGroupMacro: CinematicControl.prototype._onCopyGroupMacro,
      initiateVote: CinematicControl.prototype._onInitiateVote,
      setFilter: CinematicControl.prototype._onSetFilter,
      loadMore: CinematicControl.prototype._onLoadMore,
      clearSearch: CinematicControl.prototype._onClearSearch,
      toggleActorSelect: CinematicControl.prototype._onToggleActorSelect,
      assignGroupSelected: CinematicControl.prototype._onAssignGroupSelected,
      createGlobal: CinematicControl.prototype._onCreateGlobal,
      editGlobal: CinematicControl.prototype._onEditGlobal,
      deleteGlobal: CinematicControl.prototype._onDeleteGlobal,
      exportGlobals: CinematicControl.prototype._onExportGlobals,
      importGlobals: CinematicControl.prototype._onImportGlobals,
      promptInteraction: (event, target) => {
        const { actorId, presetId } = target.dataset;
        import("./InteractionManager.js").then((m) =>
          m.InteractionManager.sendPrompt(actorId, presetId),
        );
      },
      createScene: CinematicControl.prototype._onCreateScene,
      editScene: CinematicControl.prototype._onEditScene,
      playScene: CinematicControl.prototype._onPlayScene,
      deleteScene: CinematicControl.prototype._onDeleteScene,
      copySceneMacro: CinematicControl.prototype._onCopySceneMacro,
      exportPersonalPreset: CinematicControl.prototype._onExportPersonalPreset,
      importPersonalPreset: CinematicControl.prototype._onImportPersonalPreset,
      exportGlobalPreset: CinematicControl.prototype._onExportGlobalPreset,
      importGlobalPreset: CinematicControl.prototype._onImportGlobalPreset,
      exportScenePreset: CinematicControl.prototype._onExportScenePreset,
      importScenePreset: CinematicControl.prototype._onImportScenePreset,
      exportGroupPreset: CinematicControl.prototype._onExportGroupPreset,
      importGroupPreset: CinematicControl.prototype._onImportGroupPreset,
    },
  };

  static PARTS = {
    content: { template: "modules/cinematic-cut-ins/templates/control.hbs" },
  };

  async _prepareContext(options) {
    let actors = game.actors.filter((a) => a.isOwner);

    if (this.filterMode !== "all") {
      actors = actors.filter((a) => {
        const isPlayerOwned = a.hasPlayerOwner;

        if (this.filterMode === "character") {
          return isPlayerOwned;
        }

        if (this.filterMode === "npc") {
          return !isPlayerOwned;
        }

        return true;
      });
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      actors = actors.filter((a) => a.name.toLowerCase().includes(query));
    }

    actors.sort((a, b) => a.name.localeCompare(b.name));

    const totalCount = actors.length;
    const slicedActors = actors.slice(0, this.currentLimit);
    const hasMore = totalCount > this.currentLimit;
    const actorGroups =
      game.settings.get("cinematic-cut-ins", "actorGroups") || {};
    const globalPresets =
      game.settings.get("cinematic-cut-ins", "globalPresets") || {};
    const actorGroupOptions = Object.entries(actorGroups)
      .map(([id, group]) => {
        const defaultName = group?.defaultPresetId
          ? globalPresets[group.defaultPresetId]?.presetName || ""
          : "";
        return {
          id,
          label: defaultName
            ? `${group?.name || id} (${defaultName})`
            : group?.name || id,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    const actorList = [];
    for (const actor of slicedActors) {
      try {
        const presetsMap = actor.getFlag("cinematic-cut-ins", "presets") || {};

        if (typeof presetsMap !== "object") continue;

        const personalPresets = Object.entries(presetsMap)
          .map(([id, data]) => ({
            id,
            ...data,
          }))
          .sort((a, b) =>
            (a.presetName || "").localeCompare(b.presetName || ""),
          );

        const actorConfig = actor.getFlag("cinematic-cut-ins", "config") || {};
        const groupId = actorConfig.groupId;
        const group = groupId ? actorGroups[groupId] : null;
        const groupDefaultPreset = group?.defaultPresetId
          ? globalPresets[group.defaultPresetId]
          : null;

        const presets = [...personalPresets];
        if (group && groupDefaultPreset) {
          presets.unshift({
            id: `group-default:${group.id}`,
            presetName: `Group Default: ${group.name}`,
            isGroupDefault: true,
          });
        }

        actorList.push({
          actor: actor,
          presets: presets,
          isExpanded: this.expandedActors.has(actor.id),
          isSelected: this.selectedActorIds.has(actor.id),
        });
      } catch (err) {
        console.warn(`Cinematic FX | Failed to load actor ${actor.name}:`, err);
        continue;
      }
    }

    const rawGroupPresets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const groupPresets = [];
    for (const [id, data] of Object.entries(rawGroupPresets)) {
      const previews = [];
      if (data.participants) {
        for (const p of data.participants) {
          let img = p.img;
          if (!img || img.includes("mystery-man")) {
            const actor = game.actors.get(p.actorId);
            if (actor) img = actor.img;
          }
          previews.push({ img: img || "icons/svg/mystery-man.svg" });
        }
      }
      groupPresets.push({
        id: id,
        name: data.name || "Untitled Group",
        previews: previews,
        count: previews.length,
      });
    }
    groupPresets.sort((a, b) => a.name.localeCompare(b.name));

    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    const styleList = Object.entries(globals)
      .map(([id, data]) => {
        const imageSource = resolveCharacterImageSource({
          imageSource: data.characterImageSource,
          presetImage: data.img,
        });

        return {
          id,
          name: data.presetName || "Unnamed Style",
          img: data.img || "icons/svg/mystery-man.svg",
          usesActorImage: imageSource === CHARACTER_IMAGE_SOURCE.ACTOR,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const scenePresetsMap = game.settings.get(
      "cinematic-cut-ins",
      "scenePresets",
    );
    const sceneList = Object.entries(scenePresetsMap)
      .map(([id, data]) => ({
        id,
        name: data.name || "Untitled Scene",
        img: data.img || "icons/svg/mystery-man.svg",
        text: data.text || "",
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      isActorsTab: this.activeTab === "actors",
      isGroupsTab: this.activeTab === "groups",
      isStylesTab: this.activeTab === "styles",

      isScenesTab: this.activeTab === "scenes",
      scenes: sceneList,
      hasScenes: sceneList.length > 0,

      actors: actorList,
      hasActors: actorList.length > 0,

      isFilterAll: this.filterMode === "all",
      isFilterPC: this.filterMode === "character",
      isFilterNPC: this.filterMode === "npc",

      searchQuery: this.searchQuery,
      hasMore: hasMore,
      remainingCount: totalCount - this.currentLimit,
      selectedActorCount: this.selectedActorIds.size,

      groupPresets: groupPresets,
      hasGroupPresets: groupPresets.length > 0,

      actorGroupOptions: actorGroupOptions,
      hasActorGroupOptions: actorGroupOptions.length > 0,

      styles: styleList,
      hasStyles: styleList.length > 0,
    };
  }

  /* -------------------------------------------
       Event Handlers
    ------------------------------------------- */

  _onSearch(event) {
    const query = event.target.value;

    if (this._searchDebounce) clearTimeout(this._searchDebounce);

    this._searchDebounce = setTimeout(() => {
      if (query === this.searchQuery) return;

      this.searchQuery = query;
      this.currentLimit = this.itemsPerPage;
      this.render();
    }, 300);
  }

  _onClearSearch(event, target) {
    this.searchQuery = "";
    this.currentLimit = this.itemsPerPage;
    this.render();
  }

  _onSetFilter(event, target) {
    const button = target.closest("button") || target;
    const mode = button.dataset.mode;

    if (!mode) {
      console.warn("Cinematic FX | Filter mode missing on button click.");
      return;
    }

    if (this.filterMode === mode) return;

    console.log(
      `Cinematic FX | Changing filter: ${this.filterMode} -> ${mode}`,
    );
    this.filterMode = mode;
    this.currentLimit = this.itemsPerPage;

    this.render({ position: { height: "auto" } });
  }

  _onLoadMore(event, target) {
    const scrollContainer = this.element.querySelector(
      ".tab-content.active .accordion",
    );
    if (scrollContainer) {
      this._savedScrollTop = scrollContainer.scrollTop;
    }

    this.currentLimit += this.itemsPerPage;
    this.render();
  }

  _onTabSwitch(event, target) {
    this.activeTab = target.dataset.tab;
    this.render();
  }

  _onToggleAccordion(event, target) {
    const actorId = target.dataset.actorId;
    const item = target.closest(".accordion-item");
    if (item.classList.contains("expanded")) {
      item.classList.remove("expanded");
      this.expandedActors.delete(actorId);
    } else {
      item.classList.add("expanded");
      this.expandedActors.add(actorId);
    }
  }

  _onToggleActorSelect(event, target) {
    const actorId = target.dataset.actorId;
    if (!actorId) return;
    if (target.checked) this.selectedActorIds.add(actorId);
    else this.selectedActorIds.delete(actorId);

    const counter = this.element?.querySelector("#selected-actor-count");
    if (counter) counter.textContent = String(this.selectedActorIds.size);
  }

  async _onPlay(event, target) {
    const actorId = target.dataset.actorId;
    const presetId = target.dataset.presetId;
    const actor = game.actors.get(actorId);
    if (!actor) return;

    let playData = { actorId: actorId };

    if (presetId?.startsWith("group-default:")) {
      const actorConfig = actor.getFlag("cinematic-cut-ins", "config") || {};
      const groups =
        game.settings.get("cinematic-cut-ins", "actorGroups") || {};
      const globals =
        game.settings.get("cinematic-cut-ins", "globalPresets") || {};
      const group = actorConfig.groupId ? groups[actorConfig.groupId] : null;
      const fallback = group?.defaultPresetId
        ? globals[group.defaultPresetId]
        : null;
      if (fallback) {
        playData = foundry.utils.deepClone(fallback);
        playData.actorId = actor.uuid;
        if (!playData.layers) playData.layers = [];
      }
    } else if (presetId !== ACTIVE_CONFIG_PRESET_ID) {
      const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
      const preset = presets[presetId];
      if (preset) {
        playData = foundry.utils.deepClone(preset);
        playData.actorId = actorId;

        if (!playData.layers) playData.layers = [];
      }
    }
    playData = CutinManager.applyRandomization(playData);
    if (playData.text)
      playData.text = CutinManager.processText(playData.text, {
        actor: actor,
        item: null,
      });
    if (playData.subText)
      playData.subText = CutinManager.processText(playData.subText, {
        actor: actor,
        item: null,
      });
    const api = game.modules.get("cinematic-cut-ins").api;
    if (playData.localOnly) {
      api.playLocal(playData);
    } else {
      api.play(playData);
    }
  }

  async _onDeletePreset(event, target) {
    const actorId = target.dataset.actorId;
    const presetId = target.dataset.presetId;
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const confirm = await Dialog.confirm({
      title: "Delete Preset",
      content: "Delete this preset?",
    });
    if (!confirm) return;
    await actor.update({
      [`flags.cinematic-cut-ins.presets.-=${presetId}`]: null,
    });
    this.render();
  }

  _onConfigure(event, target) {
    const actorId = target.dataset.actorId;
    const actor = game.actors.get(actorId);
    if (actor)
      new CinematicConfig({ actorUuid: actor.uuid }).render({ force: true });
  }

  async _onOpenAllOutConfig(event, target) {
    const selectedActors = [];
    if (this.selectedActorIds.size > 0) {
      for (const actorId of this.selectedActorIds) {
        const actor = game.actors.get(actorId);
        if (actor) selectedActors.push(actor);
      }
    }
    new CinematicAllOutConfig({
      actors: selectedActors,
    }).render({ force: true });
  }

  async _onSetupGuide(event, target) {
    const tour = getSetupTour();
    if (!tour) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.Control.Notif.SetupGuideUnavailable"),
      );
      return;
    }

    try {
      await tour.start();
    } catch (error) {
      console.error("Cinematic Cut-ins | Failed to start setup guide:", error);
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.Control.Notif.SetupGuideUnavailable"),
      );
    }
  }

  async _onAssignGroupSelected(event, target) {
    if (!this.selectedActorIds.size) {
      ui.notifications.warn(
        game.i18n.localize("CINEMATIC.Control.Notif.NoActorsSelected"),
      );
      return;
    }

    const select = this.element.querySelector("select[name='bulkGroupId']");
    const groupId = String(select?.value || "");

    let updated = 0;
    for (const actorId of this.selectedActorIds) {
      const actor = game.actors.get(actorId);
      if (!actor) continue;

      const current = foundry.utils.deepClone(
        actor.getFlag("cinematic-cut-ins", "config") || {},
      );
      if (groupId) current.groupId = groupId;
      else delete current.groupId;

      await actor.setFlag("cinematic-cut-ins", "config", current);
      updated += 1;
    }

    const notifKey = groupId
      ? "CINEMATIC.Control.Notif.AssignedGroup"
      : "CINEMATIC.Control.Notif.ClearedGroup";
    ui.notifications.info(game.i18n.format(notifKey, { count: updated }));
    this.render();
  }

  async _onPlayGroupPreset(event, target) {
    const presetId = target.dataset.presetId;
    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const data = presets[presetId];
    if (!data) return;

    const globalLayers = Array.isArray(data.globalLayers)
      ? data.globalLayers
      : Array.isArray(data.layers)
        ? data.layers
        : [];
    const participantCount = Array.isArray(data.participants)
      ? data.participants.length
      : undefined;
    const manualPanels =
      data.panelMode === "manual"
        ? sanitizeManualPanels(data.manualPanels, participantCount)
        : null;

    const payload = {
      global: {
        theme: data.theme,
        showNames: data.showNames,
        panelMode: manualPanels ? "manual" : "theme",
        manualPanels: manualPanels,
        centerMainText: data.centerMainText,
        centerSubText: data.centerSubText,
        centerMainColor: data.centerMainColor,
        centerMainShadow: data.centerMainShadow,
        centerMainSize: data.centerMainSize,
        centerMainX: data.centerMainX,
        centerMainY: data.centerMainY,
        centerSubColor: data.centerSubColor,
        centerSubShadow: data.centerSubShadow,
        centerSubSize: data.centerSubSize,
        centerSubX: data.centerSubX,
        centerSubY: data.centerSubY,

        fontFamily: data.fontFamily || "Teko",
        fontBold: data.fontBold ?? true,
        fontItalic: data.fontItalic ?? false,
        subFontFamily: data.subFontFamily || data.fontFamily || "Teko",
        subFontBold: data.subFontBold ?? true,
        subFontItalic: data.subFontItalic ?? false,
        sound: data.sound,
        sfx: data.sfx,
        finishSound: data.finishSound,
        shakeIntensity: data.shakeIntensity,
        layers: globalLayers,
      },
      participants: data.participants,
    };
    game.modules.get("cinematic-cut-ins").api.play(payload);
  }

  async _onEditGroupPreset(event, target) {
    const presetId = target.dataset.presetId;
    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const data = presets[presetId];
    if (!data) return;
    const actors = [];
    if (data.participants) {
      for (const p of data.participants) {
        const actor = game.actors.get(p.actorId);
        if (actor) actors.push(actor);
        else
          actors.push({
            id: p.actorId,
            name: "Unknown",
            img: p.img,
            getFlag: () => {},
          });
      }
    }
    const configApp = new CinematicAllOutConfig({
      actors: actors,
      initialPresetId: presetId,
    });
    configApp.render({ force: true });
  }

  async _onDeleteGroupPreset(event, target) {
    const presetId = target.dataset.presetId;
    const confirm = await Dialog.confirm({
      title: "Delete Group Preset",
      content: "Delete this All-Out Attack preset?",
    });
    if (!confirm) return;
    await game.user.update({
      [`flags.cinematic-cut-ins.allOutPresets.-=${presetId}`]: null,
    });
    this.render();
  }

  async _onCopyMacro(event, target) {
    const { actorId, presetId } = target.dataset;
    if (presetId?.startsWith("group-default:")) {
      ui.notifications.warn("Group default rows do not support copy macro.");
      return;
    }
    const actor = game.actors.get(actorId);
    const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
    const preset = presets[presetId];

    new foundry.applications.api.DialogV2({
      window: {
        title: `${game.i18n.localize("CINEMATIC.Macro.Title")}: ${preset.presetName}`,
        icon: "fas fa-code",
        width: 400,
      },
      content: `<p style="text-align:center; padding:10px;">${game.i18n.localize("CINEMATIC.Macro.CopyQuestion")}</p>`,
      buttons: [
        {
          action: "instant",
          label: game.i18n.localize("CINEMATIC.Macro.Instant"),
          icon: "fas fa-play",
          callback: () => {
            const apiMethod = preset.localOnly ? "playLocal" : "play";
            const code = `game.modules.get("cinematic-cut-ins").api.${apiMethod}(${JSON.stringify({ ...preset, actorId: actor.uuid }, null, 2)});`;
            game.clipboard.copyPlainText(code);
            ui.notifications.info(
              game.i18n.localize("CINEMATIC.Macro.NotifInstant"),
            );
          },
        },
        {
          action: "prompt",
          label: game.i18n.localize("CINEMATIC.Macro.Prompt"),
          icon: "fas fa-fingerprint",
          callback: () => {
            const code = `game.modules.get("cinematic-cut-ins").api.prompt("${actorId}", "${presetId}");`;
            game.clipboard.copyPlainText(code);
            ui.notifications.info(
              game.i18n.localize("CINEMATIC.Macro.NotifPrompt"),
            );
          },
        },
      ],
    }).render(true);
  }

  async _onCopyGroupMacro(event, target) {
    const { presetId } = target.dataset;
    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const data = presets[presetId];

    const globalLayers = Array.isArray(data?.globalLayers)
      ? data.globalLayers
      : Array.isArray(data?.layers)
        ? data.layers
        : [];
    const participantCount = Array.isArray(data?.participants)
      ? data.participants.length
      : undefined;
    const manualPanels =
      data?.panelMode === "manual"
        ? sanitizeManualPanels(data.manualPanels, participantCount)
        : null;

    new foundry.applications.api.DialogV2({
      window: {
        title: `${game.i18n.localize("CINEMATIC.Macro.TitleGroup")}: ${data.name}`,
        icon: "fas fa-code",
        width: 400,
      },
      content: `<p style="text-align:center; padding:10px;">${game.i18n.localize("CINEMATIC.Macro.CopyQuestion")}</p>`,
      buttons: [
        {
          action: "instant",
          label: game.i18n.localize("CINEMATIC.Macro.Instant"),
          icon: "fas fa-bolt",
          callback: () => {
            const payload = {
              global: {
                ...data,
                layers: globalLayers,
                panelMode: manualPanels ? "manual" : "theme",
                manualPanels: manualPanels,
              },
              participants: data.participants,
            };
            const code = `game.modules.get("cinematic-cut-ins").api.play(${JSON.stringify(payload, null, 2)});`;
            game.clipboard.copyPlainText(code);
            ui.notifications.info(
              game.i18n.localize("CINEMATIC.Macro.NotifInstantGroup"),
            );
          },
        },
        {
          action: "vote",
          label: game.i18n.localize("CINEMATIC.Macro.Vote"),
          icon: "fas fa-fist-raised",
          callback: () => {
            const code = `game.modules.get("cinematic-cut-ins").api.vote("${presetId}");`;
            game.clipboard.copyPlainText(code);
            ui.notifications.info(
              game.i18n.localize("CINEMATIC.Macro.NotifVote"),
            );
          },
        },
      ],
    }).render(true);
  }

  async _onInitiateVote(event, target) {
    const presetId = target.dataset.presetId;
    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const data = presets[presetId];
    if (!data) return;

    const globalLayers = Array.isArray(data.globalLayers)
      ? data.globalLayers
      : Array.isArray(data.layers)
        ? data.layers
        : [];
    const participantCount = Array.isArray(data.participants)
      ? data.participants.length
      : undefined;
    const manualPanels =
      data.panelMode === "manual"
        ? sanitizeManualPanels(data.manualPanels, participantCount)
        : null;

    const payload = {
      linkToCombat: data.linkToCombat || false,

      global: {
        theme: data.theme,
        showNames: data.showNames,
        panelMode: manualPanels ? "manual" : "theme",
        manualPanels: manualPanels,
        centerMainText: data.centerMainText,
        centerSubText: data.centerSubText,

        centerMainColor: data.centerMainColor,
        centerMainShadow: data.centerMainShadow,
        centerMainSize: data.centerMainSize,
        centerMainX: data.centerMainX,
        centerMainY: data.centerMainY,

        centerSubColor: data.centerSubColor,
        centerSubShadow: data.centerSubShadow,
        centerSubSize: data.centerSubSize,
        centerSubX: data.centerSubX,
        centerSubY: data.centerSubY,

        fontFamily: data.fontFamily || "Teko",
        fontBold: data.fontBold ?? true,
        fontItalic: data.fontItalic ?? false,
        subFontFamily: data.subFontFamily || data.fontFamily || "Teko",
        subFontBold: data.subFontBold ?? true,
        subFontItalic: data.subFontItalic ?? false,
        sound: data.sound,
        sfx: data.sfx,
        finishSound: data.finishSound,
        shakeIntensity: data.shakeIntensity,
        speedMultiplier: data.speedMultiplier,
        voteButtonText: data.voteButtonText,
        voteButtonSound: data.voteButtonSound || "",
        layers: globalLayers,
      },
      participants: data.participants,
    };

    await AllOutManager.startSession(payload);
    ui.notifications.info("Cinematic FX: Waiting for players...");
  }

  _onUpdateActor(actor, changes) {
    if (!this.rendered) return;
    if (
      foundry.utils.hasProperty(changes, "flags.cinematic-cut-ins") ||
      changes.name ||
      changes.img
    ) {
      this.render();
    }
  }

  _onUpdateUser(user, changes) {
    if (!this.rendered) return;
    if (user.id !== game.user.id) return;
    if (foundry.utils.hasProperty(changes, "flags.cinematic-cut-ins")) {
      this.render();
    }
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const searchInput = this.element.querySelector("input[name='search']");
    if (searchInput) {
      searchInput.focus();
      const len = searchInput.value.length;

      searchInput.setSelectionRange(len, len);

      const searchHandler = this._onSearch.bind(this);

      searchInput.addEventListener("input", searchHandler);
    }

    if (this._savedScrollTop > 0) {
      const scrollContainer = this.element.querySelector(
        ".tab-content.active .accordion",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = this._savedScrollTop;
      }
      this._savedScrollTop = 0;
    }
  }

  // --- Action Handlers ---

  async _onCreateGlobal(event, target) {
    const id = foundry.utils.randomID();
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");

    globals[id] = {
      id: id,
      presetName: "New Global Style",
      img: "icons/svg/mystery-man.svg",
      characterImageSource: "preset",

      theme: "brush",
      format: "popout",

      text: "CINEMATIC!",
      subText: "GLOBAL PRESET",
      preserveMainTextCase: false,
      fontFamily: "Teko",
      mainFontSize: 8,
      subFontSize: 2,

      color: "#e61c34",
      mainTextColor: "#ffffff",
      subTextColor: "#000000",
      borderColor: "#ffffff",
      borderWidth: 0,
      charShadowColor: "#000000",
      hideCharShadow: false,

      mainOffsetX: 0,
      mainOffsetY: 0,
      subOffsetX: 0,
      subOffsetY: 0,
      textOffsetMode: "independent",
      charScale: 1.0,
      charOffsetX: 0,
      charOffsetY: 0,

      sound: "",
      sfx: "",
      shakeIntensity: 0,
      variations: [],
    };

    await game.settings.set("cinematic-cut-ins", "globalPresets", globals);

    new CinematicConfig({ globalPresetId: id }).render({ force: true });
    this.render();
  }

  _onEditGlobal(event, target) {
    const id = target.dataset.id;
    new CinematicConfig({ globalPresetId: id }).render({ force: true });
  }

  async _onDeleteGlobal(event, target) {
    const id = target.dataset.id;
    const confirm = await Dialog.confirm({
      title: "Delete Style",
      content: "Delete this global style?",
    });
    if (!confirm) return;

    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    delete globals[id];

    const newGlobals = foundry.utils.deepClone(globals);
    delete newGlobals[id];

    await game.settings.set("cinematic-cut-ins", "globalPresets", newGlobals);
    this.render();
  }

  async _onExportGlobals(event, target) {
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");

    if (Object.keys(globals).length === 0) {
      ui.notifications.warn("No global styles to export.");
      return;
    }

    const filename = `cinematic-styles-${new Date().toISOString().split("T")[0]}.json`;
    const data = JSON.stringify(globals, null, 2);

    saveDataToFile(data, "json", filename);

    ui.notifications.info(
      `Cinematic FX: Exported ${Object.keys(globals).length} styles.`,
    );
  }

  async _onImportGlobals(event, target) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const text = await readTextFromFile(file);
        const json = JSON.parse(text);

        if (typeof json !== "object" || Array.isArray(json)) {
          throw new Error(
            "Invalid JSON format. Expected an object of presets.",
          );
        }

        const currentGlobals = game.settings.get(
          "cinematic-cut-ins",
          "globalPresets",
        );

        const mergedGlobals = { ...currentGlobals, ...json };

        await game.settings.set(
          "cinematic-cut-ins",
          "globalPresets",
          mergedGlobals,
        );

        ui.notifications.info(
          `Cinematic FX: Imported/Updated ${Object.keys(json).length} styles successfully.`,
        );

        this.render();
      } catch (e) {
        console.error(e);
        ui.notifications.error(`Cinematic FX: Import failed. ${e.message}`);
      }
    };

    input.click();
  }

  async _onCreateScene(event, target) {
    const id = foundry.utils.randomID();
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");

    scenes[id] = {
      id: id,
      name: "New Scene Effect",
      img: "",
      theme: "cinematic",
      format: "popout",
      text: "CHAPTER 1",
      subText: "The Adventure Begins",
      preserveMainTextCase: false,

      mainFontSize: 8,
      subFontSize: 2,
      mainOffsetX: 0,
      mainOffsetY: 0,
      subOffsetX: 0,
      subOffsetY: 0,
      textOffsetMode: "independent",
      fontFamily: "Teko",
      color: "#ffffff",
      mainTextColor: "#ffffff",
      subTextColor: "#ffffff",
      targetSceneIds: [],

      sound: "",
      sfx: "",
    };

    await game.settings.set("cinematic-cut-ins", "scenePresets", scenes);

    new CinematicConfig({ scenePresetId: id }).render({ force: true });
    this.render();
  }

  _onEditScene(event, target) {
    const id = target.dataset.id;
    new CinematicConfig({ scenePresetId: id }).render({ force: true });
  }

  async _onPlayScene(event, target) {
    const id = target.dataset.id;
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    const data = scenes[id];

    if (data) {
      const api = game.modules.get("cinematic-cut-ins").api;
      if (data.localOnly) {
        api.playLocal(data);
      } else {
        api.play(data);
      }
    }
  }

  async _onDeleteScene(event, target) {
    const id = target.dataset.id;
    const confirm = await Dialog.confirm({
      title: "Delete Scene",
      content: "Delete this scene preset?",
    });
    if (!confirm) return;

    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    const newScenes = foundry.utils.deepClone(scenes);
    delete newScenes[id];

    await game.settings.set("cinematic-cut-ins", "scenePresets", newScenes);
    this.render();
  }

  async _onCopySceneMacro(event, target) {
    const id = target.dataset.id;
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    const data = scenes[id];

    if (!data) return;

    const apiMethod = data.localOnly ? "playLocal" : "play";
    const code = `// Play Scene: ${data.name}\nconst data = ${JSON.stringify(data, null, 2)};\ngame.modules.get("cinematic-cut-ins").api.${apiMethod}(data);`;

    game.clipboard.copyPlainText(code);
    ui.notifications.info("Cinematic FX: Scene Macro copied to clipboard.");
  }

  _onUpdateSetting(setting, changes, options, userId) {
    if (!this.rendered) return;
    if (
      setting.key === "cinematic-cut-ins.globalPresets" ||
      setting.key === "cinematic-cut-ins.scenePresets"
    ) {
      this.render();
    }
  }

  async _onExportPersonalPreset(event, target) {
    const { actorId, presetId } = target.dataset;
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
    const preset = presets[presetId];
    if (!preset) return;

    const result = await exportPreset(
      preset,
      "personal",
      preset.presetName || actor.name,
    );
    if (result.success) {
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ExportSuccess", {
          count: result.assetCount,
        }),
      );
    }
  }

  async _onImportPersonalPreset(event, target) {
    const actorId = target.dataset.actorId;
    const actor = game.actors.get(actorId);
    if (!actor) return;

    const result = await importPreset("personal");
    if (!result.success) {
      if (result.error !== "Cancelled") ui.notifications.error(result.error);
      return;
    }

    const presetId = foundry.utils.randomID();
    const currentPresets = actor.getFlag("cinematic-cut-ins", "presets") || {};
    result.preset.id = presetId;
    currentPresets[presetId] = result.preset;
    await actor.setFlag("cinematic-cut-ins", "presets", currentPresets);

    ui.notifications.info(
      game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
        count: result.assetCount,
      }),
    );
    this.render();
  }

  async _onExportGlobalPreset(event, target) {
    const id = target.dataset.id;
    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");
    const preset = globals[id];
    if (!preset) return;

    const result = await exportPreset(
      preset,
      "global",
      preset.presetName || "global",
    );
    if (result.success) {
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ExportSuccess", {
          count: result.assetCount,
        }),
      );
    }
  }

  async _onImportGlobalPreset(event, target) {
    const result = await importPreset("global");
    if (!result.success) {
      if (result.error !== "Cancelled") ui.notifications.error(result.error);
      return;
    }

    const globals = game.settings.get("cinematic-cut-ins", "globalPresets");

    if (result.manifest?.type === "global-bulk") {
      const merged = { ...globals, ...result.preset };
      await game.settings.set("cinematic-cut-ins", "globalPresets", merged);
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
          count: result.assetCount,
        }),
      );
    } else {
      const presetId = foundry.utils.randomID();
      result.preset.id = presetId;
      globals[presetId] = result.preset;
      await game.settings.set("cinematic-cut-ins", "globalPresets", globals);
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
          count: result.assetCount,
        }),
      );
    }

    this.render();
  }

  async _onExportScenePreset(event, target) {
    const id = target.dataset.id;
    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    const preset = scenes[id];
    if (!preset) return;

    const result = await exportPreset(preset, "scene", preset.name || "scene");
    if (result.success) {
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ExportSuccess", {
          count: result.assetCount,
        }),
      );
    }
  }

  async _onImportScenePreset(event, target) {
    const result = await importPreset("scene");
    if (!result.success) {
      if (result.error !== "Cancelled") ui.notifications.error(result.error);
      return;
    }

    const scenes = game.settings.get("cinematic-cut-ins", "scenePresets");
    const presetId = foundry.utils.randomID();
    result.preset.id = presetId;
    scenes[presetId] = result.preset;
    await game.settings.set("cinematic-cut-ins", "scenePresets", scenes);

    ui.notifications.info(
      game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
        count: result.assetCount,
      }),
    );
    this.render();
  }

  async _onExportGroupPreset(event, target) {
    const presetId = target.dataset.presetId;
    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const preset = presets[presetId];
    if (!preset) return;

    const result = await exportPreset(
      preset,
      "allout",
      preset.name || "allout",
    );
    if (result.success) {
      ui.notifications.info(
        game.i18n.format("CINEMATIC.Export.Notif.ExportSuccess", {
          count: result.assetCount,
        }),
      );
    }
  }

  async _onImportGroupPreset(event, target) {
    const result = await importPreset("allout");
    if (!result.success) {
      if (result.error !== "Cancelled") ui.notifications.error(result.error);
      return;
    }

    const presets =
      game.user.getFlag("cinematic-cut-ins", "allOutPresets") || {};
    const presetId = foundry.utils.randomID();
    result.preset.id = presetId;
    presets[presetId] = result.preset;
    await game.user.setFlag("cinematic-cut-ins", "allOutPresets", presets);

    ui.notifications.info(
      game.i18n.format("CINEMATIC.Export.Notif.ImportSuccess", {
        count: result.assetCount,
      }),
    );
    this.render();
  }
}
