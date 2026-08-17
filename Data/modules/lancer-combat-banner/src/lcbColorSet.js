var cssDataRoot;

export function setColors(combatant){
  cssDataRoot = document.querySelector(':root');
  let mode = game.settings.get( "lancer-combat-banner", "colorMode" );

  if(mode  === "user"){
    setUserColors(combatant);
  } else if (mode  === "default"){
    setColor(  fetchColor( "defaultColor" ) );
  } else if (mode  === "side"){
    setSideColors(combatant);
  } else if (mode === "team"){
    setTeamColor(combatant);
  }

}

function _resolveTeamId(combatant){
  const tokenDoc = combatant?.token;
  if (!tokenDoc) return null;
  let flag = tokenDoc.getFlag?.("token-factions", "team");
  if (flag) return flag;
  const actor = combatant.actor;
  flag = actor?.getFlag?.("token-factions", "team");
  if (flag) return flag;
  flag = actor?.prototypeToken?.flags?.["token-factions"]?.team;
  return flag || null;
}

function setTeamColor(combatant){
  if (!game.modules.get("token-factions")?.active) {
    setColor( fetchColor( "defaultColor" ) );
    return;
  }
  let teams = [];
  try { teams = game.settings.get("token-factions", "team-setup") || []; } catch (e) { /* ignore */ }
  const teamId = _resolveTeamId(combatant);
  const team = teamId ? teams.find(t => t.id === teamId) : null;
  if (team?.color) setColor( team.color );
  else setColor( fetchColor( "defaultColor" ) );
}

function setUserColors(combatant){
  if (combatant?.hasPlayerOwner && combatant?.players[0].active) {
    const ownerColor = combatant?.players[0]["color"];
    setColor( ownerColor );
  } else {
    const firstGm = game.users.find((u) => u.isGM && u.active);
    setColor( firstGm["color"] );
  }
}

function setSideColors(combatant){
  if( combatant?.token?.disposition === 1){
    setColor(  fetchColor( "friendlyColor" ) );
  } else if( combatant?.token?.disposition === 0){
    setColor(  fetchColor( "neutralColor" ) );
  } else if( combatant?.token?.disposition === -1){
    setColor(  fetchColor( "hostileColor" ) );
  } else {
    setColor( fetchColor( "defaultColor" ) );
  }
}
function setColor( color ){
  cssDataRoot.style.setProperty('--ADA_COMBATBANNER_color', color );
  cssDataRoot.style.setProperty('--ADA_COMBATBANNER_colorTransparent', color );
}
function fetchColor( from ){
  let color = game.settings.get( "lancer-combat-banner", from );
  if( color.length === 9){
    color = color.substring(0, 7);
  }    
  return color
}