import { CinematicSocket } from "./CinematicSocket.js";
import { CutinManager } from "./CutinManager.js";

export class InteractionManager {
  static initialize() {
    CinematicSocket.register("showInteractionPrompt", (data) =>
      this._onReceivePrompt(data),
    );
    CinematicSocket.register("clearInteractionPrompt", (id) =>
      this._onClearPrompt(id),
    );
  }

  static async sendPrompt(actorId, presetId) {
    if (!game.user.isGM) return;

    const actor = game.actors.get(actorId);
    if (!actor) return;

    const ownerIds = game.users
      .filter((u) => !u.isGM && actor.testUserPermission(u, "OWNER"))
      .map((u) => u.id);

    const data = {
      id: foundry.utils.randomID(),
      actorId,
      presetId,
      img: actor.img,
      name: actor.name,
      ownerIds: [...ownerIds, game.user.id],
      color: actor.getFlag("cinematic-cut-ins", "config")?.color || "#e61c34",
    };

    await CinematicSocket.executeForEveryone("showInteractionPrompt", data);
  }

  static _onReceivePrompt(data) {
    if (!data.ownerIds.includes(game.user.id)) return;

    this._onClearPrompt(data.id);

    const container = document.createElement("div");
    container.id = `prompt-${data.id}`;
    container.className = "cinematic-prompt-container";
    container.style.setProperty("--theme-color", data.color);

    container.innerHTML = `
            <div class="prompt-ring"></div>
            <div class="prompt-button">
                <img src="${data.img}" class="prompt-actor-img">
                <div class="prompt-icon"><i class="fas fa-fingerprint"></i></div>
            </div>
            <div class="prompt-label">READY?</div> 
            ${game.user.isGM ? `<div class="prompt-gm-cancel"><i class="fas fa-times"></i> CANCEL</div>` : ""}
        `;

    container.querySelector(".prompt-button").onclick = (e) => {
      e.stopPropagation();
      this._execute(data);
    };

    if (game.user.isGM) {
      container.querySelector(".prompt-gm-cancel").onclick = (e) => {
        e.stopPropagation();
        CinematicSocket.executeForEveryone("clearInteractionPrompt", data.id);
      };
    }

    const interfaceEl = document.getElementById("interface");
    if (!interfaceEl) return;
    interfaceEl.appendChild(container);
    foundry.audio.AudioHelper.play(
      {
        src: foundry.utils.getRoute(
          "modules/cinematic-cut-ins/sounds/click.mp3",
        ),
        volume: 0.8,
      },
      false,
    );
  }

  static async _execute(data) {
    const actor = game.actors.get(data.actorId);
    if (!actor) return;

    const presets = actor.getFlag("cinematic-cut-ins", "presets") || {};
    const globals =
      game.settings.get("cinematic-cut-ins", "globalPresets") || {};
    const groups = game.settings.get("cinematic-cut-ins", "actorGroups") || {};
    const actorConfig = actor.getFlag("cinematic-cut-ins", "config") || {};

    let resolvedPreset = presets[data.presetId] || globals[data.presetId];
    if (!resolvedPreset) {
      const group = actorConfig.groupId ? groups[actorConfig.groupId] : null;
      if (group?.defaultPresetId) {
        resolvedPreset = globals[group.defaultPresetId];
      }
    }

    let playData = resolvedPreset
      ? foundry.utils.deepClone(resolvedPreset)
      : { actorId: data.actorId };

    const { CutinManager } = await import("./CutinManager.js");
    playData = CutinManager.applyRandomization(playData);
    playData.actorId = actor.uuid;
    if (!playData.layers) playData.layers = [];

    if (playData.text)
      playData.text = CutinManager.processText(playData.text, { actor });
    if (playData.subText)
      playData.subText = CutinManager.processText(playData.subText, { actor });

    game.modules.get("cinematic-cut-ins").api.play(playData);

    await CinematicSocket.executeForEveryone("clearInteractionPrompt", data.id);
  }

  static _onClearPrompt(id) {
    const el = document.getElementById(`prompt-${id}`);
    if (el) {
      el.classList.add("fade-out");
      setTimeout(() => el.remove(), 300);
    }
  }
}
