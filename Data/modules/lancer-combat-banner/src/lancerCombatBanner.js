import {buildSettings} from "./lcbSettings.js";
import {getMechClass, getCallsign, newTurnChatMessage, newRoundChatMessage, isAddCombatantUpdate} from "./lcbTools.js";
import {setColors} from "./lcbColorSet.js"

export let adaCombatBanner = new LancerCombatBanner();
adaCombatBanner.init();
let previousCombat = null;
function LancerCombatBanner() {

  let debugPause = false;
  let pendingTimer;
  let bannerContainer; 
  
  this.init = function() {
    Hooks.on("ready", () => {
      
      Hooks.on("updateCombat", (combat, update, options, userId) => {
        onUpdateCombat(combat, update, options, userId);
      });
      
      bannerContainer = document.getElementById("yourTurnContainer");
      if (bannerContainer == null) {
        let bannerContainerDiv = document.createElement("div");
        bannerContainerDiv.id = "yourTurnContainer";
        bannerContainerDiv.style.position = "fixed";
        bannerContainerDiv.style.top = "0";
        bannerContainerDiv.style.left = "0";
        bannerContainerDiv.style.width = "100%";
        bannerContainerDiv.style.pointerEvents = "none";
        bannerContainerDiv.style.zIndex = "100";
        const parent = document.getElementById("interface") || document.body;
        parent.appendChild(bannerContainerDiv);
        bannerContainer = bannerContainerDiv;
      }
      buildSettings();
      
    });
  }

  function onUpdateCombat(combat, update, options, userId) {
    if (!combat.started) {
      return;
    }
    if (typeof update["round"] === "number" && !combat.combatant ) {
      newRound(update["round"]);
    }
    else if (typeof update["turn"] === "number" && combat?.combatant && !isAddCombatantUpdate(previousCombat,combat)) {
      newTurn(combat, combat.combatant);
    }
    previousCombat = {actorID: combat.combatant?.actorID, combatantCount: combat.combatants.size};
  }
  

  function newRound(roundNumber) {
    setColors();
    newRoundChatMessage( roundNumber );
    
    safeDelete("newRoundBanner");
    safeDelete("yourTurnImageId");
    safeDelete("yourTurnBanner");    
    
    let bannerDiv = document.createElement("div");
    bannerDiv.id = "newRoundBanner";
    bannerDiv.className = "newRoundBanner";
    bannerDiv.innerHTML = `<div class="newRoundTitle">
      ${game.i18n.localize('ADA_COMBATBANNER.StartOfRound')} #${roundNumber}
    </div>`;

    bannerContainer.append(bannerDiv);
    
    if(pendingTimer){
      clearTimeout(pendingTimer);
    }
    pendingTimer = setTimeout(() => {
      if (!debugPause) {
        let element = document.getElementById("newRoundBanner");
        if(element){
          element.classList.add("removing");
        }
      }
    }, 3000);
  }
  
  function newTurn(combat, combatant) {
    setColors( combatant );
    
    let callsign = getCallsign( combatant.actor );
    let mechClass = getMechClass( combatant.actor );
    if (callsign == mechClass) {
      mechClass = "";
    }
    
    newTurnChatMessage( callsign );
    
    safeDelete("newRoundBanner");
    safeDelete("yourTurnImageId");
    safeDelete("yourTurnBanner");    

    let currentImgHTML = document.createElement("img");
    currentImgHTML.id = "yourTurnImageId";
    currentImgHTML.src = combatant.actor.img;
    currentImgHTML.classList.add("yourTurnImg", "adding");

    let bannerDiv = document.createElement("div");
    bannerDiv.id = "yourTurnBanner";
    bannerDiv.className = "yourTurnBanner";
    bannerDiv.innerHTML =`<div class="roundCount">
      ${game.i18n.localize('ADA_COMBATBANNER.Round')} #${combat.round}
    </div>
    <p id="yourTurnText" class="yourTurnText">${callsign}</p>
    ${mechClass ? `<div class="yourTurnSubheading">
      「${mechClass}」</span>
    </div>` : ""}
    <div id="yourTurnBannerBackground" class="yourTurnBannerBackground" height="150"></div>`;
    
    bannerContainer.append(currentImgHTML)
    bannerContainer.append(bannerDiv);

    if(pendingTimer){
      clearTimeout(pendingTimer);
    }
    pendingTimer = setTimeout(() => {
      if (!debugPause) {
        var element = document.getElementById("yourTurnBannerBackground");
        if(element){
          element.classList.add("removing");
        }

        element = document.getElementById("yourTurnBanner");
        if(element){
          element.classList.add("removing");
        }

        element = document.getElementById("yourTurnImageId");
        if(element){
          element.classList.add("removing");
        }
      }
    }, 5000);
  }
  
  function safeDelete(elementID) {
    var targetElement = document.getElementById(elementID);
    if (targetElement != null) {
      targetElement.remove();
    }
  }

}
