import { _extractRollsFromMessage } from "./trigger-engine.js";

export function registerChatAnalysisHooks({
  getGame = () => globalThis.game,
  getMessageId = resolveChatMessageId,
  hooks = globalThis.Hooks,
  showAnalysis = showCinematicAnalysis,
} = {}) {
  const addCinematicOption = (wrapper, menuItems) => {
    if (!Array.isArray(menuItems)) {
      return;
    }

    const gameRef = getGame();
    const label = gameRef.i18n.localize("CINEMATIC.Analysis.ContextMenuName");
    if (menuItems.some((option) => option.name === label)) {
      return;
    }

    menuItems.push({
      name: label,
      icon: '<i class="fas fa-search"></i>',
      condition: (listItem) => {
        if (!gameRef.user.isGM) {
          return false;
        }

        const messageId = getMessageId(listItem);
        return Boolean(gameRef.messages.get(messageId));
      },
      callback: (listItem) => {
        const messageId = getMessageId(listItem);
        const message = gameRef.messages.get(messageId);
        if (message) {
          void showAnalysis(message);
        }
      },
    });
  };

  hooks.on("getChatLogEntryContext", addCinematicOption);
  hooks.on("getChatMessageContextOptions", addCinematicOption);
}

export function resolveChatMessageId(
  listItem,
  {
    jqueryType = globalThis.jQuery,
    readData = (element) => globalThis.$(element).data("messageId"),
  } = {},
) {
  const isJqueryWrapper =
    typeof jqueryType === "function" && listItem instanceof jqueryType;
  const element = isJqueryWrapper ? listItem[0] : listItem;
  return element.dataset?.messageId || readData(element);
}

async function showCinematicAnalysis(message) {
  if (!message) {
    return;
  }

  const { DialogV2 } = foundry.applications.api;
  let actorInfo = `<span style="color:#ff6b6b">${game.i18n.localize("CINEMATIC.Analysis.Actor.Failed")}</span>`;
  let actor = ChatMessage.getSpeakerActor(message.speaker);

  if (!actor && message.item) {
    actor = message.item.actor;
  }
  if (!actor && message.author) {
    actor = message.author.character;
  }
  if (!actor && canvas.tokens.controlled.length > 0) {
    actor = canvas.tokens.controlled[0].actor;
    actorInfo += ` <span style="font-size:0.9em; color:#e67e22;">(${game.i18n.localize("CINEMATIC.Analysis.Actor.TokenHint")})</span>`;
  }
  if (!actor && message.alias) {
    actor = game.actors.find((candidate) => candidate.name === message.alias);
  }

  if (actor) {
    if (!actorInfo.includes("TokenHint")) {
      actorInfo = `<span style="color:#4ecdc4; font-weight:bold;">${actor.name}</span> (ID: ${actor.id})`;
    } else {
      actorInfo =
        `<span style="color:#4ecdc4; font-weight:bold;">${actor.name}</span> (ID: ${actor.id})` +
        actorInfo.replace(/<span.*Failed.*span>/, "");
    }
  }

  const rawContent =
    (message.flavor || "") +
    "\n" +
    (message.content || "") +
    "\n" +
    (message.alias || "");
  const cleanContent = rawContent
    .replace(/<br\s*\/?>/gi, "[[BR]]")
    .replace(/<\/p>|<\/div>|<\/li>|<\/h\d>/gi, "[[BR]]")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(\[\[BR\]\]\s*)+/g, "\n")
    .trim();
  const rolls = _extractRollsFromMessage(message);
  const rollHtml = buildRollHtml(rolls);

  const content = `
    <div style="font-family:'Teko', sans-serif; padding: 10px; background: rgb(11 10 19 / 95%); color: #efe6d8; border-radius: 5px;">
        <!-- 액터 정보 -->
        <div style="margin-bottom:15px; background:rgba(0,0,0,0.25); padding:10px; border-radius:5px; border:1px solid #444;">
            <strong style="color:#ccc; font-size:1.1em;">1. ${game.i18n.localize("CINEMATIC.Analysis.Label.Actor")}</strong><br>
            <div style="margin-top:5px; font-size:1.2em;">${actorInfo}</div>
        </div>

        <!-- 주사위 데이터 -->
        <div style="margin-bottom:15px; background:rgba(0,0,0,0.25); padding:10px; border-radius:5px; border:1px solid #444;">

            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:8px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                <strong style="color:#ccc; font-size:1.1em; white-space:nowrap;">2. ${game.i18n.localize("CINEMATIC.Analysis.Label.Dice")}</strong>
                <span style="font-size:0.95em; color:#999; white-space:nowrap;">${game.i18n.localize("CINEMATIC.Analysis.Hint.DiceLegend")}</span>
            </div>

            <ul style="list-style:none; padding:0; margin:0; max-height:300px; overflow-y:auto; border-radius:3px;">
                ${rollHtml}
            </ul>
        </div>

        <!-- 텍스트 키워드 -->
        <div style="margin-bottom:5px; background:rgba(0,0,0,0.25); padding:10px; border-radius:5px; border:1px solid #444;">
            <strong style="color:#ccc; font-size:1.1em;">3. ${game.i18n.localize("CINEMATIC.Analysis.Label.Keyword")}</strong>

            <div style="
                background: #222;
                padding: 10px;
                font-family: monospace;
                color: #bbb;
                font-size: 1.0em;
                margin-top: 8px;
                border: 1px solid #555;
                border-radius: 3px;
                max-height: 120px;
                overflow-y: auto;

                width: 100%;
                box-sizing: border-box;
                white-space: pre-wrap;
                overflow-wrap: break-word;
                line-height: 1.5;
            ">
${cleanContent}
            </div>
        </div>
    </div>
    `;

  new DialogV2({
    window: {
      title: game.i18n.localize("CINEMATIC.Analysis.Title"),
      icon: "fas fa-search",
      width: 500,
    },
    content,
    buttons: [
      {
        action: "close",
        label: game.i18n.localize("CINEMATIC.Analysis.Btn.Close"),
        icon: "fas fa-check",
        default: true,
      },
    ],
  }).render(true);
}

function buildRollHtml(rolls) {
  if (rolls.length === 0) {
    return `<li style="color:#888; padding:10px; font-size:1.1em;">${game.i18n.localize("CINEMATIC.Analysis.Dice.None")}</li>`;
  }

  let rollHtml = "";
  let globalDieIndex = 0;
  rolls.forEach((roll, rollIndex) => {
    rollHtml += `
            <li style="margin-top:15px; margin-bottom:8px; border-bottom:1px solid #666; padding-bottom:4px; color:#e67e22; display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:1.1em;"><strong>Roll Group #${rollIndex}</strong></span>
                    <code style="color:#ccc; font-size:1.0em; background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:3px;">${roll.formula}</code>
                </div>
                <span style="color:#fff; font-size:1.1em;">Total (t): <strong style="color:#f9ca24; font-size:1.2em;">${roll.total}</strong></span>
            </li>`;

    let termCounter = 1;
    roll.terms.forEach((term) => {
      if (term.results && term.results.length > 0) {
        term.results.forEach((result) => {
          const value = result.result;
          const checkIndex = termCounter;
          const formulaIndex = `d[${globalDieIndex}]`;

          rollHtml += `
                        <li style="
                            background: rgba(255,255,255,0.08);
                            margin-bottom: 4px;
                            padding: 6px 12px;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 1.05em;">

                            <span style="flex:1; color:#bbb;">
                                Dice Check #: <strong style="color:#ff9f43; font-size:1.2em;">${checkIndex}</strong>
                            </span>

                            <span style="flex:1; text-align:center; font-weight:bold; color:#fff; font-size:1.2em; border-left:1px solid #555; border-right:1px solid #555;">
                                ${value}
                            </span>

                            <span style="flex:1; text-align:right;">
                                Var: <code style="color:#4ecdc4; background:transparent; font-size:1.1em;">${formulaIndex}</code>
                            </span>
                        </li>`;
          globalDieIndex += 1;
        });
        termCounter += 1;
      }
    });
  });
  return rollHtml;
}
