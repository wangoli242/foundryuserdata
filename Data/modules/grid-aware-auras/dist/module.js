(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.defineProperty,n=(e,t)=>()=>(e&&(t=e(e=0)),t),r=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,ee,te,ne,y,re,ie,ae,oe,se,ce,le,ue,de,b=n((()=>{i=`grid-aware-auras`,a=`module.${i}`,o=`auras`,s=`enableEffectAutomation`,c=`enableMacroAutomation`,l=`presets`,u=`squareGridMode`,d=`customAuraTargetFilters`,f=`ignoreLighting`,p=`clientHiddenAuras`,m=`gridAwareAuras`,h=`${m}.createAura`,g=`${m}.deleteAura`,_=`${m}.endMoveInsideAura`,v=`${m}.enterLeaveAura`,ee=`${m}.startMoveInsideAura`,te=`${m}.updateAura`,ne=`toggleEffect`,y={NONE:0,SOLID:1,DASHED:2},re={EQUIDISTANT:0,ALTERNATING:1,MANHATTAN:2,EXACT:3},ie={ALWAYS:`TOKEN.DISPLAY_ALWAYS`,OWNER:`TOKEN.DISPLAY_OWNER`,HOVER:`TOKEN.DISPLAY_HOVER`,OWNER_HOVER:`TOKEN.DISPLAY_OWNER_HOVER`,CONTROL:`TOKEN.DISPLAY_CONTROL`,DRAG:`GRIDAWAREAURAS.AuraDisplayDrag`,TURN:`GRIDAWAREAURAS.AuraDisplayOwnerTurn`,OWNER_TURN:`GRIDAWAREAURAS.AuraDisplayTurn`,NONE:`TOKEN.DISPLAY_NONE`,CUSTOM:`GRIDAWAREAURAS.AuraDisplayCustom`},ae={APPLY_WHILE_INSIDE:`GRIDAWAREAURAS.EffectModeApplyWhileInside`,APPLY_ON_ENTER:`GRIDAWAREAURAS.EffectModeApplyOnEnter`,APPLY_ON_LEAVE:`GRIDAWAREAURAS.EffectModeApplyOnLeave`,APPLY_ON_OWNER_TURN_START:`GRIDAWAREAURAS.EffectModeApplyOnOwnerTurnStart`,APPLY_ON_OWNER_TURN_END:`GRIDAWAREAURAS.EffectModeApplyOnOwnerTurnEnd`,APPLY_ON_TARGET_TURN_START:`GRIDAWAREAURAS.EffectModeApplyOnTargetTurnStart`,APPLY_ON_TARGET_TURN_END:`GRIDAWAREAURAS.EffectModeApplyOnTargetTurnEnd`,APPLY_ON_ROUND_START:`GRIDAWAREAURAS.EffectModeApplyOnRoundStart`,APPLY_ON_ROUND_END:`GRIDAWAREAURAS.EffectModeApplyOnRoundEnd`,REMOVE_WHILE_INSIDE:`GRIDAWAREAURAS.EffectModeRemoveWhileInside`,REMOVE_ON_ENTER:`GRIDAWAREAURAS.EffectModeRemoveOnEnter`,REMOVE_ON_LEAVE:`GRIDAWAREAURAS.EffectModeRemoveOnLeave`,REMOVE_ON_OWNER_TURN_START:`GRIDAWAREAURAS.EffectModeRemoveOnOwnerTurnStart`,REMOVE_ON_OWNER_TURN_END:`GRIDAWAREAURAS.EffectModeRemoveOnOwnerTurnEnd`,REMOVE_ON_TARGET_TURN_START:`GRIDAWAREAURAS.EffectModeRemoveOnTargetTurnStart`,REMOVE_ON_TARGET_TURN_END:`GRIDAWAREAURAS.EffectModeRemoveOnTargetTurnEnd`,REMOVE_ON_ROUND_START:`GRIDAWAREAURAS.EffectModeRemoveOnRoundStart`,REMOVE_ON_ROUND_END:`GRIDAWAREAURAS.EffectModeRemoveOnRoundEnd`},oe=[`APPLY_WHILE_INSIDE`,`REMOVE_WHILE_INSIDE`],se={ENTER_LEAVE:`GRIDAWAREAURAS.MacroModeEnterLeave`,ENTER:`GRIDAWAREAURAS.MacroModeEnter`,LEAVE:`GRIDAWAREAURAS.MacroModeLeave`,PREVIEW_ENTER_LEAVE:`GRIDAWAREAURAS.MacroModePreviewEnterLeave`,PREVIEW_ENTER:`GRIDAWAREAURAS.MacroModePreviewEnter`,PREVIEW_LEAVE:`GRIDAWAREAURAS.MacroModePreviewLeave`,OWNER_TURN_START_END:`GRIDAWAREAURAS.MacroModeOwnerTurnStartEnd`,OWNER_TURN_START:`GRIDAWAREAURAS.MacroModeOwnerTurnStart`,OWNER_TURN_END:`GRIDAWAREAURAS.MacroModeOwnerTurnEnd`,TARGET_TURN_START_END:`GRIDAWAREAURAS.MacroModeTargetTurnStartEnd`,TARGET_TURN_START:`GRIDAWAREAURAS.MacroModeTargetTurnStart`,TARGET_TURN_END:`GRIDAWAREAURAS.MacroModeTargetTurnEnd`,ROUND_START_END:`GRIDAWAREAURAS.MacroModeRoundStartEnd`,ROUND_START:`GRIDAWAREAURAS.MacroModeRoundStart`,ROUND_END:`GRIDAWAREAURAS.MacroModeRoundEnd`,TARGET_START_MOVE:`GRIDAWAREAURAS.MacroModeTargetStartMove`,TARGET_END_MOVE:`GRIDAWAREAURAS.MacroModeTargetEndMove`},ce={ON_ENTER:`GRIDAWAREAURAS.SequenceTriggerOnEnter`,ON_LEAVE:`GRIDAWAREAURAS.SequenceTriggerOnLeave`,WHILE_INSIDE:`GRIDAWAREAURAS.SequenceTriggerWhileInside`},le={ON_TARGET:`GRIDAWAREAURAS.SequencePositionOnTarget`,ON_OWNER:`GRIDAWAREAURAS.SequencePositionOnOwner`,OWNER_TO_TARGET:`GRIDAWAREAURAS.SequencePositionFromOwnerToTarget`,TARGET_TO_OWNER:`GRIDAWAREAURAS.SequencePositionFromTargetToOwner`},ue={CENTER:`GRIDAWAREAURAS.AuraPositionCenter`,TOP_LEFT:`GRIDAWAREAURAS.AuraPositionTopLeft`,TOP_RIGHT:`GRIDAWAREAURAS.AuraPositionTopRight`,BOTTOM_RIGHT:`GRIDAWAREAURAS.AuraPositionBottomRight`,BOTTOM_LEFT:`GRIDAWAREAURAS.AuraPositionBottomLeft`},de={NONE:`GRIDAWAREAURAS.ThtRulerOnDragModeNone`,C2C:`GRIDAWAREAURAS.ThtRulerOnDragModeC2C`,E2E:`GRIDAWAREAURAS.ThtRulerOnDragModeE2E`}}));function fe(e,...t){console.log(`Grid Aware Auras | ${e}`,...t)}function pe(e,...t){console.warn(`Grid Aware Auras | ${e}`,...t)}function me(e,t){let n=new Map;for(let r of e)he(n,t(r),()=>[]).push(r);return n}function he(e,t,n){if(e.has(t))return e.get(t);let r=n();return e.set(t,r),r}async function ge(e,t,n,r={},i=!1){if(!game.settings.get(`grid-aware-auras`,`enableEffectAutomation`))return;let{overlay:o}=r,s=typeof e==`string`?await fromUuid(e):e;if(s){if(s.canUserModify(game.user,`update`))await s.toggleStatusEffect(t,{active:n,overlay:o});else if(i){let i=typeof e==`string`?e:e.uuid,o=game.users.find(e=>e.isGM&&e.active)?.id;o?(fe(`Delegating effect toggling to GM user '${o}'.`),game.socket.emit(a,{func:ne,runOn:o,actorUuid:i,effectId:t,state:n,effectOptions:r})):pe(`No GM users available. Unable to toggle effect to actor '${s.name}'.`)}}}function _e(e,t){for(let[n,r]of Object.entries(t))if(e[n]!==r)return!1;return!0}function ve(e,t){return e.length===t.length&&e.every((n,r)=>e[r]===t[r])}function ye(){return game.modules.get(`sequencer`)?.active===!0}function be(){let e=game.modules.get(`terrain-height-tools`);return e?.active===!0&&!foundry.utils.isNewerVersion(`0.4.7`,e.version)}function x(e,t=void 0){let n=new Map;return t??=e=>e.join(`|`),function(...r){let i=t(r);if(n.has(i))return n.get(i);let a=e(...r);return n.set(i,a),a}}function xe(e,...t){return Object.fromEntries(e.map(e=>[e,t.find(t=>t&&e in t)?.[e]]))}var S=n((()=>{b()}));function Se(e,t,{description:n=``}={}){if(typeof t!=`function`)throw Error(`Resolver must be a function`);if(!De.test(e))throw Error(`Invalid name '${e}': Must only use alphanumeric, '.', '-' or '_' characters, must not start or end with '.', or contain consequtive '.'s.`);let r=e.split(`.`),i=Ee;for(let t of r){if(i=i[t],i===void 0)break;if(i instanceof Oe)throw Error(`Invalid name '${e}': Either an extension with this name already exits, or adding this would cause an invalid object.`)}if(i!==void 0)throw Error(`Invalid name '${e}': Registering this would cause an invalid object.`);i=Ee;for(let e of r.slice(0,-1))i[e]??={},i=i[e];i[r[r.length-1]]=new Oe(t,n)}function Ce(){return Object.keys(Ee).length>0}function we(e,t){let n=r=>new Proxy({},{get(i,a){let o=Te([...r,a]);if(o!==void 0){if(o instanceof Oe)try{let n=o.resolve(e,t);return typeof n==`number`?n:0}catch(e){return pe(`Error in radius expression extension '${path}'`,e),0}return n([...r,a])}},has(e,t){let n=Te(r);return n!==void 0&&!(n instanceof Oe)&&t in n},ownKeys(){let e=Te(r);return e===void 0||e instanceof Oe?[]:Object.keys(e)},getOwnPropertyDescriptor(i,a){let o=Te([...r,a]);return o===void 0?void 0:{configurable:!0,enumerable:!0,get:()=>o instanceof Oe?o(e,t):n([...r,a])}}});return n([])}function Te(e){let t=Ee;for(let n of e)if(n in t)t=t[n];else return;return t}var Ee,De,Oe,ke=n((()=>{S(),Ee={},De=/^(?:[a-z0-9\-_]+\.)*[a-z0-9\-_]+$/i,Oe=class{constructor(e,t){this.resolve=e,this.description=t}}}));function Ae(e){let t=e instanceof Token?e.document:e,n=C(t,{calculateRadius:!0}),r=new Set(n.map(e=>e.id));for(let e of t.actor?.items??[])for(let t of C(e,{calculateRadius:!0}))r.has(t.id)||(n.push(t),r.add(t.id));return n}function C(e,{calculateRadius:t=!1}={}){if(!(e instanceof TokenDocument||e instanceof Item||e instanceof foundry.data.PrototypeToken))throw Error(`Must provide an Item or Token document to getDocumentOwnAuras.`);let n=(e.getFlag(`grid-aware-auras`,`auras`)??[]).map(Fe);if(t){let t=je(e instanceof TokenDocument?e.actor:e instanceof Item?e.parent:void 0,e instanceof Item?e:void 0);n=n.map(e=>({...e,radiusCalculated:Me(e.radius,t)??-1,innerRadiusCalculated:Me(e.innerRadius,t)??-1}))}return n}function je(e=void 0,t=void 0){let n={actor:e,item:t};return Ce()&&(n.ext=we(e,t)),n}function Me(e,t){if(e===``)return;let n=e=>Math.round(e*100)/100,r=+e;if(typeof r==`number`&&!isNaN(r))return n(r);let i=foundry.utils.getProperty(t,e);if(i!==void 0)return r=parseInt(i),typeof r==`number`&&!isNaN(r)?n(r):void 0;try{let r=new Roll(e,t);if(r.isDeterministic)return r.evaluateSync(),n(r.total)}catch{return}}function Ne(e,t){for(let n of[`lineType`,`lineWidth`,`lineColor`,`lineOpacity`,`lineDashSize`,`lineGapSize`,`fillType`,`fillColor`,`fillOpacity`,`fillTexture`])if(e[n]!==t[n])return!1;return!(e.fillTextureOffset?.x!==t.fillTextureOffset?.x||e.fillTextureOffset?.y!==t.fillTextureOffset?.y||e.fillTextureScale?.x!==t.fillTextureScale?.x||e.fillTextureScale?.y!==t.fillTextureScale?.y)}function Pe(){return foundry.utils.mergeObject(ze(),{id:foundry.utils.randomID()},{inplace:!1})}function Fe(e,{newId:t=!1}={}){for(let t=+(e._v??0);t<3;t++)e=Ge[t](e);return e._v=3,e=foundry.utils.mergeObject(ze(),e,{inplace:!1}),e.effects=e.effects?.map(e=>foundry.utils.mergeObject(He(),e,{inplace:!1}))??[],e.macros=e.macros?.map(e=>foundry.utils.mergeObject(Ue(),e,{inplace:!1}))??[],e.sequencerEffects=e.sequencerEffects?.map(e=>foundry.utils.mergeObject(We(),e,{inplace:!1}))??[],t&&(e.id=foundry.utils.randomID()),e}function Ie(e){let{id:t,...n}=e;new foundry.applications.api.DialogV2({window:{title:`Export`,icon:`fas fa-download`,resizable:!0},classes:[`grid-aware-auras-import-export-dialog`],content:`<textarea>${JSON.stringify(n)}</textarea>`,buttons:[{icon:`<i class='fas fa-times'></i>`,label:game.i18n.localize(`Close`),action:`close`}],position:{width:530,height:320}}).render(!0)}function Le({newId:e=!0}={}){return new Promise(t=>{new foundry.applications.api.DialogV2({window:{title:`Import`,icon:`fas fa-upload`,resizable:!0},classes:[`grid-aware-auras-import-export-dialog`],content:`<textarea></textarea>`,buttons:[{icon:`<i class=''></i>`,label:`Import`,callback:(n,r,i)=>{let a=(i instanceof foundry.applications.api.DialogV2?i.element:i).querySelector(`textarea`).value;try{let n;try{n=JSON.parse(a)}catch(e){throw Error(`Failed to import aura: Invalid JSON provided (${e.message}).`)}if(Array.isArray(n)||typeof n!=`object`)throw Error(`Failed to import aura: Expected JSON to be an object.`);t(Fe(n,{newId:e}))}catch(e){throw ui.notifications.error(e.message),e}}},{icon:`<i class='fas fa-times'></i>`,label:game.i18n.localize(`Close`),action:`close`}],position:{width:530,height:320}}).render(!0)})}var Re,ze,Be,Ve,He,Ue,We,Ge,Ke,w=n((()=>{b(),ke(),Re={default:!0,hovered:!0,controlled:!0,dragging:!0,targeted:!0,turn:!0},ze=()=>({_v:3,name:`New Aura`,enabled:!0,clientDefaultHidden:!1,unified:!1,onlyEnabledInCombat:!1,keyPressMode:`DISABLED`,keyToPress:`AltLeft`,radius:1,innerRadius:``,position:`CENTER`,lineType:y.SOLID,lineWidth:4,lineColor:`#FF0000`,lineColorAnimation:null,lineOpacity:.8,lineDashSize:15,lineGapSize:10,lineDashOffsetAnimation:0,radiusOffset:0,fillType:CONST.DRAWING_FILL_TYPES.SOLID,fillColor:`#FF0000`,fillColorAnimation:null,fillOpacity:.1,fillTexture:``,fillTextureOffset:{x:0,y:0},fillTextureOffsetAnimation:null,fillTextureScale:{x:100,y:100},ownerVisibility:Re,nonOwnerVisibility:Re,effects:[],macros:[],sequencerEffects:[],terrainHeightTools:{rulerOnDrag:`NONE`,targetTokens:``,onlyWhenAltPressed:!1,onlyWhenTargeted:!1},elevationAware:!1,movementPenalty:0}),Be=()=>({duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.8,position:0},{color:255,alpha:.8,position:.5},{color:16711680,alpha:.8,position:1}]}),Ve=()=>({duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.1,position:0},{color:255,alpha:.1,position:.5},{color:16711680,alpha:.1,position:1}]}),He=()=>({effectId:null,isOverlay:!1,targetTokens:`ALL`,mode:`APPLY_WHILE_INSIDE`,priority:0}),Ue=()=>({macroId:null,targetTokens:`ALL`,mode:`ENTER_LEAVE`,actionType:`macro`,code:``}),We=()=>({uId:foundry.utils.randomID(),effectPath:``,targetTokens:`ALL`,trigger:`ON_ENTER`,position:`ON_TARGET`,repeatCount:1,repeatDelay:0,delay:0,opacity:1,fadeInDuration:0,fadeInEasing:`linear`,fadeOutDuration:0,fadeOutEasing:`linear`,scale:1,scaleToObject:!1,scaleInScale:1,scaleInDuration:0,scaleInEasing:`linear`,scaleOutScale:1,scaleOutDuration:0,scaleOutEasing:`linear`,playbackRate:1,belowTokens:!1}),Ge=[e=>{let{effect:t,macro:n}=e;return t?.effectId?.length&&(e.effects=[t,...e.effects??[]]),delete e.effect,n?.macroId?.length&&(e.macros=[n,...e.macros??[]]),delete e.macro,e},e=>(e.lineAnimationInvert=!1,e),e=>(delete e.animation,delete e.animationType,delete e.animationSpeed,delete e.animationWhenSelected,delete e.lineAnimationScroll,delete e.lineAnimationPulse,delete e.lineAnimationInvert,delete e.pulseToMax,delete e.lineGlow,delete e.lineGlowStrength,delete e.fillAnimation,delete e.fillAnimationSpeed,delete e.fillAnimationAngle,e)],Ke={ALWAYS:{owner:{default:!0,hovered:!0,controlled:!0,dragging:!0,targeted:!0,turn:!0},nonOwner:{default:!0,hovered:!0,targeted:!0,turn:!0}},OWNER:{owner:{default:!0,hovered:!0,controlled:!0,dragging:!0,targeted:!0,turn:!0},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}},HOVER:{owner:{default:!1,hovered:!0,controlled:!1,dragging:!1,targeted:!1,turn:!1},nonOwner:{default:!1,hovered:!0,targeted:!1,turn:!1}},OWNER_HOVER:{owner:{default:!1,hovered:!0,controlled:!1,dragging:!1,targeted:!1,turn:!1},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}},CONTROL:{owner:{default:!1,hovered:!1,controlled:!0,dragging:!1,targeted:!1,turn:!1},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}},DRAG:{owner:{default:!1,hovered:!1,controlled:!1,dragging:!0,targeted:!1,turn:!1},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}},TURN:{owner:{default:!1,hovered:!1,controlled:!1,dragging:!1,targeted:!1,turn:!0},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!0}},OWNER_TURN:{owner:{default:!1,hovered:!1,controlled:!1,dragging:!1,targeted:!1,turn:!0},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}},NONE:{owner:{default:!1,hovered:!1,controlled:!1,dragging:!1,targeted:!1,turn:!1},nonOwner:{default:!1,hovered:!1,targeted:!1,turn:!1}}}})),qe,Je,Ye=n((()=>{S(),qe=`|`,Je=class{#e=new Map;#t=new Map;#n=new Map;*getAllAuras({preview:e}={}){for(let[t,n]of this.#e){if(e!==void 0&&this.#a(t).isPreview!==e)continue;let r=this.#o(t);if(r)for(let e of n.values())yield{parent:r,aura:e}}}getTokenAuras(e){let t=this.#i(e),n=this.#e.get(t);return n?[...n.values()]:[]}getTokensInsideAura(e,t){let n=this.#s(e,t);return[...this.#n.get(n)??[]].map(e=>this.#o(e)).filter(e=>!!e)}getAurasContainingToken(e,{preview:t}={}){let n=this.#i(e);return[...this.#t.get(n)??[]].filter(e=>t===void 0||this.#c(e).tokenIsPreview===t).map(e=>this.#l(e)).filter(e=>!!e)}registerAura(e,t){let n=this.#i(e);he(this.#e,n,()=>new Map).set(t.config.id,t)}hasAura(e,t){let n=this.#i(e);return this.#e.get(n)?.has(t)??!1}isInside(e,t,n){let r=this.#i(e),i=this.#s(t,n);return this.#t.get(r)?.has(i)??!1}setIsInside(e,t,n,r){let i=this.#i(e),a=this.#s(t,n);return r===(this.#t.get(i)?.has(a)??!1)?!1:(he(this.#t,i,()=>new Set)[r?`add`:`delete`](a),he(this.#n,a,()=>new Set)[r?`add`:`delete`](i),!0)}deregisterToken(e){let t=this.#i(e),n=this.#e.get(t);if(n)for(let t of n.keys()){let n=this.#s(e,t);this.#r(n)}let r=this.#t.get(t);if(r)for(let e of r)this.#n.get(e)?.delete(t);this.#t.delete(t),this.#e.delete(t)}deregisterAura(e,t){let n=this.#i(e),r=this.#e.get(n);if(!r||!r.delete(t))return!1;let i=this.#s(e,t);return this.#r(i),!0}#r(e){let t=this.#n.get(e);if(t){for(let n of t)this.#t.get(n)?.delete(e);this.#n.delete(e)}}clear(){this.#e.clear(),this.#t.clear(),this.#n.clear()}#i(e){return[e.id,e.isPreview].join(qe)}#a(e){let[t,n]=e.split(qe);return{tokenId:t,isPreview:n===`true`}}#o(e){let{tokenId:t,isPreview:n}=this.#a(e),r=canvas.tokens.placeables.find(e=>e.id===t&&e.isPreview===n);return r||pe(`getTokenFromCompositeId: A token matching composite ID '${e}' was not found.`),r}#s(e,t){return[e.id,e.isPreview,t].join(qe)}#c(e){let[t,n,r]=e.split(qe);return{tokenId:t,tokenIsPreview:n===`true`,auraId:r}}#l(e){let{tokenId:t,tokenIsPreview:n,auraId:r}=this.#c(e),i=this.#i({id:t,isPreview:n}),a=this.#o(i),o=this.#e.get(i)?.get(r);return o||pe(`getAuraFromCompositeId: An aura matching composite ID '${e}' was not found.`),o&&a?{parent:a,aura:o}:null}}})),Xe,Ze,Qe=n((()=>{Xe={linear:`EasingLinear`,easeInCubic:`EasingEaseIn`,easeOutCubic:`EasingEaseOut`,easeInOutCubic:`EasingEaseInOut`},Ze={linear:e=>e,easeInCubic:e=>e**3,easeOutCubic:e=>1-(1-e)**3,easeInOutCubic:e=>e<.5?4*e**3:1-(-2*e+2)**3/2}}));function $e({r:e,g:t,b:n,a:r}){e/=255,t/=255,n/=255;let i=Math.max(e,t,n),a=i-Math.min(e,t,n),o=i*100,s=i===0?0:a/i*100,c=0;return a!==0&&(i===e?c=60*((t-n)/a%6):i===t?c=60*((n-e)/a+2):i===n&&(c=60*((e-t)/a+4)),c<0&&(c+=360)),{h:c,s,v:o,a:Math.round(r/255*100)}}function et({h:e,s:t,v:n,a:r}){e=e%360/360,t/=100,n/=100;let i=n*t,a=i*(1-Math.abs(e*6%2-1)),o=n-i,s=0,c=0,l=0;return 0<=e&&e<1/6?(s=i,c=a,l=0):1/6<=e&&e<2/6?(s=a,c=i,l=0):2/6<=e&&e<3/6?(s=0,c=i,l=a):3/6<=e&&e<4/6?(s=0,c=a,l=i):4/6<=e&&e<5/6?(s=a,c=0,l=i):5/6<=e&&e<1&&(s=i,c=0,l=a),s=Math.round((s+o)*255),c=Math.round((c+o)*255),l=Math.round((l+o)*255),r=Math.round(r/100*255),{r:s,g:c,b:l,a:r}}function tt(e){if(typeof e!=`string`)return;let t=/^#?(?<r>[a-f0-9]{2})(?<g>[a-f0-9]{2})(?<b>[a-f0-9]{2})(?<a>[a-f0-9]{2})?$/i.exec(e);if(t){let{r:e,g:n,b:r,a:i}=t.groups;return{r:parseInt(e,16),g:parseInt(n,16),b:parseInt(r,16),a:parseInt(i??`ff`,16)}}let n=/^#?(?<r>[a-f0-9])(?<g>[a-f0-9])(?<b>[a-f0-9])(?<a>[a-f0-9])?$/i.exec(e);if(n){let{r:e,g:t,b:r,a:i}=n.groups;return{r:parseInt(e,16)*17,g:parseInt(t,16)*17,b:parseInt(r,16)*17,a:parseInt(i??`f`,16)*17}}}function nt({r:e,g:t,b:n,a:r}){return`#`+[e,t,n,r].map(e=>Math.max(Math.min(Math.round(e),255),0).toString(16).padStart(2,`0`)).join(``)}function rt(e){return{r:e>>16&255,g:e>>8&255,b:e&255}}function it(e,t){if(t===0)return 0;let n=e>>16&255,r=e>>8&255,i=e&255,a=Math.max(0,Math.min(Math.round(n*t),255)),o=Math.max(0,Math.min(Math.round(r*t),255)),s=Math.max(0,Math.min(Math.round(i*t),255));return a<<16|o<<8|s}function at(e,t){return it(e,1/t)}function ot(e,t){let{r:n=0,g:r=0,b:i=0,a=255}=(typeof e==`string`?tt(e):typeof e==`number`?rt(e):e)??{};return`rgb(${n} ${r} ${i} / ${Math.round(100*(t??a/255))}%)`}var st=n((()=>{}));function ct(e,t,n){let r=e>>16&255,i=e>>8&255,a=e&255,o=t>>16&255,s=t>>8&255,c=t&255,l=Math.round(lt(r,o,n)),u=Math.round(lt(i,s,n)),d=Math.round(lt(a,c,n));return l<<16|u<<8|d}function lt(e,t,n){return e+(t-e)*n}var ut=n((()=>{}));function dt(e){return e.map(({color:e,alpha:t,position:n})=>({color:it(e,t),alpha:t,position:n}))}function ft(e,t,n,r){let i=(Ze[n]??Ze.linear)(r%t/t);if(i<=e[0].position)return{color:e[0].color,alpha:e[0].alpha,insertIndex:0};if(i>=e.at(-1).position)return{color:e.at(-1).color,alpha:e.at(-1).alpha,insertIndex:e.length};for(let t=0;t<e.length-1;t++){let n=e[t],r=e[t+1];if(n.position>i||r.position<i)continue;let a=(i-n.position)/(r.position-n.position);return{color:ct(n.color,r.color,a),alpha:lt(n.alpha,r.alpha,a),insertIndex:t+1}}return{color:0,alpha:0,insertIndex:0}}var pt=n((()=>{Qe(),st(),ut()})),mt,ht=n((()=>{mt={NONE:0,SOLID:1,DASHED:2}}));function T(e,t){e.moveTo(0,0);for(let n of t)switch(n.type){case`m`:e.moveTo(n.x,n.y);break;case`l`:e.lineTo(n.x,n.y);break;case`a`:e.arcTo(n.tx,n.ty,n.x,n.y,n.r);break;default:throw Error(`Unknown command`)}}function E(e,t,{dashSize:n=20,gapSize:r=void 0,offset:i=0}={}){r??=n;let a=0,o=0;e.moveTo(0,0);let s=n+r,c=(i%s+s)%s,l=!0,u=n-c;u<=0&&(l=!1,u+=r);for(let i of t)switch(i.type){case`m`:({x:a,y:o}=i),e.moveTo(a,o);break;case`l`:{let t=a,s=o,{x:c,y:d}=i,f=Math.atan2(d-s,c-t),p=Math.cos(f),m=Math.sin(f),h=Math.sqrt((d-s)**2+(c-t)**2),g=h;for(;g>2**-52;){u<=0&&(l=!l,u=l?n:r);let i=h-g,a=Math.min(g,u);g-=a,u-=a,l&&(e.moveTo(t+p*i,s+m*i),e.lineTo(t+p*(i+a),s+m*(i+a)))}e.moveTo(c,d),a=c,o=d;break}case`a`:{let t=a,s=o,{x:c,y:d,r:f}=i,{x:p,y:m}=gt(t,s,c,d,f),h=Math.atan2(s-m,t-p),g=Math.atan2(d-m,c-p),_=h,v=(g-h+Math.PI*2)%(Math.PI*2);for(;v>2**-52;){u<=0&&(l=!l,u=l?n:r);let t=u/f,i=Math.min(v,t);v-=i,u=i===t?0:u-i*f,l&&(e.moveTo(Math.cos(_)*f+p,Math.sin(_)*f+m),e.arc(p,m,f,_,_+i)),_+=i}e.moveTo(c,d),a=c,o=d;break}default:throw Error(`Unknown command`)}}function gt(e,t,n,r,i){let a=n-e,o=r-t,s=(e+n)/2,c=(t+r)/2,l=Math.sqrt(a**2+o**2),u=a/l,d=o/l,f=Math.sqrt(i**2-(l/2)**2),p=-d,m=u;return{x:s+f*p,y:c+f*m}}var _t=n((()=>{})),vt,yt=n((()=>{pt(),st(),ht(),_t(),vt=class extends PIXI.Container{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e,t,n,r){super(),this.update(e,t,n,r)}update(e,t,n,r){if(this.#e=e,this.#t=t,this.#n=n,this.#l(e))switch(this.#r?this.#r.clear():(this.#r=this.addChild(new PIXI.Graphics),this.#r.zIndex=1),this.#r.lineStyle({color:16777215,alpha:1,width:e.lineWidth,alignment:.5}),this.#r.tint=e.lineColor,this.#r.alpha=e.lineOpacity,e.lineType){case mt.SOLID:T(this.#r,t);for(let e of n)T(this.#r,e);break;case mt.DASHED:{let r={dashSize:e.lineDashSize,gapSize:e.lineGapSize};E(this.#r,t,r);for(let e of n)E(this.#r,e,r);break}}else this.#r&&=(this.removeChild(this.#r),this.#r.destroy(),void 0);let i=this.#u(e),a=this.#d(e);if(a){let i=this.#o??=this.addChild(new PIXI.TilingSprite),a=this.#a??=this.addChild(new PIXI.Graphics);i.mask=a,i.texture=e.fillTexture,i.x=r.x,i.y=r.y,i.width=r.width,i.height=r.height,i.tint=e.fillColor,i.alpha=e.fillOpacity;let{x:o,y:s}=e.fillTextureScale??{x:100,y:100};i.tileScale.set(o/100,s/100),a.clear(),a.beginFill(0,1),T(a,t);for(let e of n)a.beginHole(),T(a,e),a.endHole()}else if(i){let r=this.#a??=this.addChild(new PIXI.Graphics);if(r.clear(),e.fillType===CONST.DRAWING_FILL_TYPES.PATTERN&&e.fillTexture){let{x:t,y:n}=e.fillTextureOffset??{x:0,y:0},{x:i,y:a}=e.fillTextureScale??{x:100,y:100};r.beginTextureFill({texture:e.fillTexture,color:16777215,alpha:1,matrix:new PIXI.Matrix(i/100,0,0,a/100,t,n)})}else r.beginFill(16777215,1);r.tint=e.fillColor,r.alpha=e.fillOpacity,T(r,t);for(let e of n)r.beginHole(),T(r,e),r.endHole()}!i&&this.#a&&(this.removeChild(this.#a),this.#a.destroy(),this.#a=void 0),!a&&this.#o&&(this.removeChild(this.#o),this.#o.destroy(),this.#o=void 0),this.#i=e?.lineColorAnimation?dt(e.lineColorAnimation.keyframes):void 0,this.#s=e?.fillColorAnimation?dt(e.fillColorAnimation.keyframes):void 0,this.#c()}clear(){this.update(null,null,[],null)}tick(){!this.renderable||!this.visible||this.alpha<=0||this.#c()}#c(){let e=Date.now();if(this.#r&&this.#e?.lineColorAnimation&&this.#i){let{duration:t,easingFunc:n}=this.#e.lineColorAnimation,{color:r,alpha:i}=ft(this.#i,t,n,e);this.#r.tint=at(r,i),this.#r.alpha=i}if(this.#r&&this.#e?.lineType===mt.DASHED&&(this.#e.lineDashOffsetAnimation??0)!==0){this.#r.clear(),this.#r.lineStyle({color:16777215,alpha:1,width:this.#e.lineWidth,alignment:.5});let t={dashSize:this.#e.lineDashSize,gapSize:this.#e.lineGapSize,offset:e/1e3*this.#e.lineDashOffsetAnimation};E(this.#r,this.#t,t);for(let e of this.#n)E(this.#r,e,t)}if(this.#a&&this.#e?.fillColorAnimation&&this.#s){let{duration:t,easingFunc:n}=this.#e.fillColorAnimation,{color:r,alpha:i}=ft(this.#s,t,n,e),a=this.#o??this.#a;a.tint=at(r,i),a.alpha=i}if(this.#o&&this.#e?.fillTextureOffsetAnimation){let{x:t,y:n}=this.#e.fillTextureOffsetAnimation,r=(this.#e.fillTexture?.width??1)*(this.#o.tileScale.x||1),i=(this.#e.fillTexture?.height??1)*(this.#o.tileScale.y||1),a=e/1e3*t%r,o=e/1e3*n%i;this.#o.tilePosition.set(a,o)}}#l(e){return e&&e.lineType!==mt.NONE&&e.lineWidth>0&&(e.lineOpacity>0||!!e.lineColorAnimation)}#u(e){return e&&e.fillType!==CONST.DRAWING_FILL_TYPES.NONE&&(e.fillOpacity>0||!!e.fillColorAnimation)}#d(e){return this.#u(e)&&e.fillType===CONST.DRAWING_FILL_TYPES.PATTERN&&!!e.fillTexture&&!!e.fillTextureOffsetAnimation&&e.fillTextureOffsetAnimation.x!==0&&e.fillTextureOffsetAnimation.y!==0}}}));function bt(e,t){return e?(Ct??=game.settings.get(`grid-aware-auras`,`clientHiddenAuras`)??{},e in Ct?Ct[e]===!0:!!t?.clientDefaultHidden):!1}async function xt(e,t){if(!e)return;let n={...game.settings.get(`grid-aware-auras`,`clientHiddenAuras`)??{},[e]:!!t};await game.settings.set(i,p,n),Ct=n;let{AuraLayer:r}=await Promise.resolve().then(()=>(N(),hn));r.current?._updateAuraGraphics({updateVisibility:!0})}function St(e,t){return xt(e,!bt(e,t))}var Ct,wt=n((()=>{b(),Ct=null}));function Tt(e){return e?.document?.elevation??0}function*Et(e,t){let n=canvas.grid,r=n.type!==CONST.GRID_TYPES.SQUARE&&n.type!==CONST.GRID_TYPES.GRIDLESS,i=e.i,a=e.j;for(let e=-t;e<=t;e++)for(let o=-t;o<=t;o++){let s=i+e,c=a+o;if(!r)Math.max(Math.abs(e),Math.abs(o))<=t&&(yield{i:s,j:c});else try{let e=n.getCenterPoint({i:s,j:c}),r=n.getCenterPoint({i,j:a});n.measurePath([r,e]).distance<=t*n.distance&&(yield{i:s,j:c})}catch{}}}function Dt(e){let t=[];for(let n of e)(n.type===`m`||n.type===`l`)&&t.push({X:Math.round(n.x*D),Y:Math.round(n.y*D)});return t}function Ot(e,t){let n=e?.polygon?.vertices??[],r=[];for(let e of n)r.push({X:Math.round((e.x-t.x)*D),Y:Math.round((e.y-t.y)*D)});return r}function kt(e){let t=[];if(!e.length)return t;t.push({type:`m`,x:e[0].X/D,y:e[0].Y/D});for(let n=1;n<e.length;n++)t.push({type:`l`,x:e[n].X/D,y:e[n].Y/D});return t.push({type:`l`,x:e[0].X/D,y:e[0].Y/D}),t}function At(e,t,n=null){let r=globalThis.terrainHeightTools;if(!r||!r.getShapesAtPoint&&!r.getCell||!e||!t||t<=0)return[];let i=Tt(e)+t,a=canvas.grid,o=n??e.center,s=a.getOffset(o),c=new Set;for(let e of Et(s,Math.ceil(t)+1)){let t=a.getCenterPoint({i:e.i,j:e.j}),n=[];try{n=r.getShapesAtPoint?.(t.x,t.y)??r.getCell?.(e.j,e.i)??[]}catch{}for(let e of n){let t=e?.terrainTypeId??e?.terrainType?.id??e?.shape?.terrainTypeId??null,n=null;if(t)try{n=r.getTerrainType?.({id:t})}catch{n=null}!n&&e?.terrainType?.isSolid!==void 0&&(n=e.terrainType),!(!n?.isSolid||!n?.usesHeight)&&(e?.elevation??e?.bottom??e?.shape?.elevation??0)+(e?.height??e?.shape?.height??0)>i&&c.add(e)}}return[...c]}function jt(e,t,n,r,i=null,a=null){if(typeof ClipperLib>`u`)return null;let o=At(t,r,i);if(!o.length)return null;let s=[Dt(e)];if(a){let e=Dt(a);e.length>=3&&s.push(e)}let c=o.map(e=>Ot(e,n)).filter(e=>e.length>=3);if(!c.length)return null;try{let e=new ClipperLib.ClipperOffset;e.AddPaths(c,ClipperLib.JoinType.jtMiter,ClipperLib.EndType.etClosedPolygon);let t=new ClipperLib.Paths;e.Execute(t,D*1);let n=t.length>=1?t:c,r=new ClipperLib.Clipper;r.AddPaths(s,ClipperLib.PolyType.ptSubject,!0),r.AddPaths(n,ClipperLib.PolyType.ptClip,!0);let i=new ClipperLib.PolyTree;r.Execute(ClipperLib.ClipType.ctDifference,i,ClipperLib.PolyFillType.pftEvenOdd,ClipperLib.PolyFillType.pftNonZero);let a=[],l=[];return Mt(i,a,l),!a.length&&!l.length?null:{outers:a,holes:l,blockers:o}}catch{return null}}function Mt(e,t,n){let r=e.Childs?.()??e.m_Childs??[];for(let e of r){let r=e.Contour?.()??e.m_polygon??[];if(r.length>=3){let i=ClipperLib.Clipper.CleanPolygon(r,D*.5);if(i.length>=3){let r=kt(i);e.IsHole?.()??e.m_IsHole?n.push(r):t.push(r)}}Mt(e,t,n)}}var D,Nt=n((()=>{D=100})),Pt,Ft=n((()=>{Pt=class{#e;constructor(e,t,n,r){this.#e={width:e,height:t,radius:n,gridSize:r}}get bounds(){let{width:e,height:t,radius:n,gridSize:r}=this.#e;return new PIXI.Rectangle(-n*r,-n*r,(e+n*2)*r,(t+n*2)*r)}isInside(e,{auraOffset:t={x:0,y:0},tokenAltPosition:n,mode:r=`partial`}={}){let{width:i,height:a,gridSize:o}=this.#e,{radius:s}=this.#e,{x:c,y:l}=t;c=c/o+i/2,l=l/o+a/2;let{width:u,height:d}=e.document,{x:f,y:p}=n??e;return f=f/o+u/2,p=p/o+d/2,u===d&&r===`partial`?s+=u/2:u===d&&r===`total`?s-=u/2:r===`partial`?(f=Math.max(f-u/2,Math.min(c,f+u/2)),p=Math.max(p-d/2,Math.min(l,p+d/2))):r===`total`&&(f=c<f?f+u/2:f-u/2,p=l<p?p+d/2:p-d/2),i===a?s+=i/2:(c=Math.max(c-i/2,Math.min(f,c+i/2)),l=Math.max(l-a/2,Math.min(p,l+a/2))),(f-c)**2+(p-l)**2<s**2}*getPath(){let{width:e,height:t,radius:n,gridSize:r}=this.#e;if(e===t){let i=(e/2+n)*r;yield{type:`m`,x:-n*r,y:t/2*r},yield{type:`a`,x:e/2*r,y:-n*r,tx:-n*r,ty:-n*r,r:i},yield{type:`a`,x:(e+n)*r,y:t/2*r,tx:(e+n)*r,ty:-n*r,r:i},yield{type:`a`,x:e/2*r,y:(t+n)*r,tx:(e+n)*r,ty:(t+n)*r,r:i},yield{type:`a`,x:-n*r,y:t/2*r,tx:-n*r,ty:(t+n)*r,r:i}}else yield{type:`m`,x:-n*r,y:0},yield{type:`a`,x:0,y:-n*r,tx:-n*r,ty:-n*r,r:n*r},yield{type:`l`,x:e*r,y:-n*r},yield{type:`a`,x:(e+n)*r,y:0,tx:(e+n)*r,ty:-n*r,r:n*r},yield{type:`l`,x:(e+n)*r,y:t*r},yield{type:`a`,x:e*r,y:(t+n)*r,tx:(e+n)*r,ty:(t+n)*r,r:n*r},yield{type:`l`,x:0,y:(t+n)*r},yield{type:`a`,x:-n*r,y:t*r,tx:-n*r,ty:(t+n)*r,r:n*r},yield{type:`l`,x:-n*r,y:0}}}}));function It(e,t,n,r,i,a,o){if(n<1&&n===r)n=r=1;else if(n<1||r<1)return[];if(n%1!=0||r%1!=0)return[{x:e+n/2*o,y:t+r/2*o}];let s=a?r:n,c=a?n:r;switch(i){case CONST.TOKEN_HEXAGONAL_SHAPES.ELLIPSE_1:case CONST.TOKEN_HEXAGONAL_SHAPES.ELLIPSE_2:return Yt(s,c,a,i===CONST.TOKEN_HEXAGONAL_SHAPES.ELLIPSE_2).map(n=>({x:e+n.x*o,y:t+n.y*o}));case CONST.TOKEN_HEXAGONAL_SHAPES.TRAPEZOID_1:case CONST.TOKEN_HEXAGONAL_SHAPES.TRAPEZOID_2:return Xt(s,c,a,i===CONST.TOKEN_HEXAGONAL_SHAPES.TRAPEZOID_2).map(n=>({x:e+n.x*o,y:t+n.y*o}));case CONST.TOKEN_HEXAGONAL_SHAPES.RECTANGLE_1:case CONST.TOKEN_HEXAGONAL_SHAPES.RECTANGLE_2:return Zt(s,c,a,i===CONST.TOKEN_HEXAGONAL_SHAPES.RECTANGLE_2).map(n=>({x:e+n.x*o,y:t+n.y*o}));default:throw Error(`Unknown hex grid type.`)}}var O,k,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt=n((()=>{S(),O=1/Math.sqrt(3),k=30*Math.PI/180,Lt=60*Math.PI/180,{ELLIPSE_1:Rt,ELLIPSE_2:zt,TRAPEZOID_1:Bt,TRAPEZOID_2:Vt,RECTANGLE_1:Ht,RECTANGLE_2:Ut}=CONST.TOKEN_HEXAGONAL_SHAPES,Wt=class e{#e;#t;#n;#r;#i;constructor(t,n,r,i,a,o){r=Math.round(r),t=Math.max(1,Math.round(t)),n=Math.max(1,Math.round(n)),this.#e=e.#a(t,n,r,i,a).map(({x:e,y:t})=>({x:e*o,y:t*o})),{collidableEdges:this.#t,boundingBox:this.#n}=e.#o(this.#e),this.#r=a,this.#i=o}get bounds(){let{top:e,right:t,bottom:n,left:r}=this.#n;return new PIXI.Rectangle(r,e,t-r,n-e)}isInside(e,{auraOffset:t={x:0,y:0},tokenAltPosition:n,mode:r=`partial`}={}){let{width:i,height:a,hexagonalShape:o}=e.document,{x:s,y:c}=n??e;return It(s,c,i,a,o,this.#r,this.#i)[r===`total`?`every`:`some`](e=>this._isPointInside(e.x-t.x,e.y-t.y))}_isPointInside(e,t){if(t<this.#n.top||t>this.#n.bottom||e<this.#n.left||e>this.#n.right)return!1;let n=0;for(let{p1:r,p2:i,slope:a}of this.#t){if(t<=r.y)break;t>i.y||(t-r.y)/a+r.x<e&&n++}return n%2==1}*getPath(){if(this.#e.length){for(let e=0;e<this.#e.length;e++)yield{type:e===0?`m`:`l`,x:this.#e[e].x,y:this.#e[e].y};yield{type:`l`,x:this.#e[0].x,y:this.#e[0].y}}}static#a(e,t,n,r,i){let a=i?t:e,o=i?e:t;switch(r){case Rt:case zt:return Gt(a,o,n,i,r===zt);case Bt:case Vt:return Kt(a,o,n,i,r===Vt);case Ht:case Ut:return Jt(a,o,n,i,r===Ut);default:throw Error(`Unknown hex grid type.`)}}static#o(e){let t=[],n={top:1/0,right:-1/0,bottom:-1/0,left:1/0};for(let r=0;r<e.length;r++){let i=e[r],a=e[(r+1)%e.length];if((a.y<i.y||a.y===i.y&&a.x<i.x)&&([i,a]=[a,i]),i.y!==a.y){let e=i.x===a.x?1/0:(a.y-i.y)/(a.x-i.x);t.push({p1:i,p2:a,slope:e})}n.top=Math.min(n.top,i.y,a.y),n.right=Math.max(n.right,i.x,a.x),n.bottom=Math.max(n.bottom,i.y,a.y),n.left=Math.min(n.left,i.x,a.x)}return t.sort((e,t)=>e.p1.y===t.p1.y?e.p1.x-t.p1.x:e.p1.y-t.p1.y),{collidableEdges:t,boundingBox:n}}},Gt=x(function(e,t,n,r,i){if(e<Math.floor(t/2)+1)return[];let a=Math.floor((t-1)/2)+1,o=Math.ceil((t-1)/2)+1;return qt([e-(a-1)+n,a+n,o+n,e-(o-1)+n,o+n,a+n],i,!r,n,n*O*1.5)}),Kt=x(function(e,t,n,r,i){return e<t?[]:qt([e+n+1,n+1,t+n,e-t+n+1,t+n,n],i,!r,n,n*O*1.5)}),qt=x(function(e,t,n,r=0,i=0){let a=0,o=0,s=1/0,c=1/0,l=[...f(e[0],270),...f(e[1],330),...f(e[2],30),...f(e[3],90),...f(e[4],150),...f(e[5],210)],[u,d]=n?[r,i]:[i,r];return l.map(({x:e,y:t})=>({x:e-s-u,y:t-c-d}));function*f(e,n){n=n/180*Math.PI;let r=Math.cos(n+k)*O*(t?-1:1),i=Math.sin(n+k)*O,s=Math.cos(n-k)*O*(t?-1:1),c=Math.sin(n-k)*O;yield p(a+=r,o+=i);for(let t=0;t<e-1;t++)yield p(a+=s,o+=c),yield p(a+=r,o+=i)}function p(e,t){return n&&([e,t]=[t,e]),s=Math.min(s,e),c=Math.min(c,t),{x:e,y:t}}},e=>[e[0].join(`|`),...e.slice(1)].join(`|`)),Jt=x(function(e,t,n,r,i){if(e===1&&t>1)return[];let a=0,o=0,s=1/0,c=1/0,l=n,u=n*O*1.5,[d,f]=r?[u,l]:[l,u],p=t>1&&i,m=n===0||t>1&&t%2==+i;return[...h(e+n-+p,270),...h(n+1,330),...g(t-1,0,p),...h(n+1,30),...h(e+n-+m,90),...h(n+ +m,150),...g(t-+m,180,!0),...h(n+1,210)].map(({x:e,y:t})=>({x:e-s-d,y:t-c-f}));function*h(e,t){t=t/180*Math.PI;let n=Math.cos(t+k)*O,r=Math.sin(t+k)*O,i=Math.cos(t-k)*O,s=Math.sin(t-k)*O;yield _(a+=n,o+=r);for(let t=0;t<e-1;t++)yield _(a+=i,o+=s),yield _(a+=n,o+=r)}function*g(e,t,n){t=t/180*Math.PI;let r=Math.cos(t)*O,i=Math.sin(t)*O,s=Math.cos(t+Lt*(n?-1:1))*O,c=Math.sin(t+Lt*(n?-1:1))*O,l=Math.cos(t+Lt*(n?1:-1))*O,u=Math.sin(t+Lt*(n?1:-1))*O;for(let t=0;t<e;t++)yield _(a+=t%2==0?s:l,o+=t%2==0?c:u),yield _(a+=r,o+=i)}function _(e,t){return r||([e,t]=[t,e]),s=Math.min(s,e),c=Math.min(c,t),{x:e,y:t}}}),Yt=x(function(e,t,n,r){if(e<Math.floor(t/2)+1)return[];let i=Math[r?`ceil`:`floor`]((t-1)/2)*O*1.5+O,a=[],o=0,s=r?1:-1;for(let n=0;n<t;n++){let t=(o+1)/2,r=o*s*O*1.5+i;for(let n=0;n<e-o;n++)a.push(c(n+t,r));s*=-1,n%2==0&&o++}return a;function c(e,t){return n?{x:t,y:e}:{x:e,y:t}}}),Xt=x(function(e,t,n,r){if(e<t)return[];let i=r?O+(t-1)*O*1.5:O,a=[];for(let n=0;n<t;n++){let t=(n+1)/2,s=n*(r?-1:1)*O*1.5+i;for(let r=0;r<e-n;r++)a.push(o(r+t,s))}return a;function o(e,t){return n?{x:t,y:e}:{x:e,y:t}}}),Zt=x(function(e,t,n,r){if(e===1&&t>1)return[];let i=[],a=+!!r;for(let n=0;n<t;n++){let t=n%2===a;for(let r=0;r<e-+!t;r++)i.push(o(r+(t?.5:1),n*O*1.5+O))}return i;function o(e,t){return n?{x:t,y:e}:{x:e,y:t}}})})),$t,en,tn,nn,rn=n((()=>{b(),S(),$t=new Map([[re.EQUIDISTANT,(e,t,n)=>Math.max(e,t)<=n],[re.ALTERNATING,(e,t,n)=>Math.max(e,t)+Math.floor(Math.min(e,t)/2)<=n],[re.MANHATTAN,(e,t,n)=>e+t<=n],[re.EXACT,(e,t,n)=>e*e+t*t<=n*n]]),en=class{#e;#t;constructor(e,t,n,r,i){n=Math.round(n),e=Math.max(1,Math.round(e)),t=Math.max(1,Math.round(t)),this.#e={width:e,height:t,radius:n,mode:r,gridSize:i},this.#t=tn(e,t,n,r).map(({x:e,y:t})=>({x:e*i,y:t*i}))}get bounds(){let{width:e,height:t,radius:n,gridSize:r}=this.#e;return new PIXI.Rectangle(-n*r,-n*r,(e+n*2)*r,(t+n*2)*r)}isInside(e,{auraOffset:t={x:0,y:0},tokenAltPosition:n,mode:r=`partial`}={}){let{width:i,height:a}=e.document,{x:o,y:s}=n??e;return nn(i,a).map(e=>({x:o+e.x*this.#e.gridSize,y:s+e.y*this.#e.gridSize}))[r===`total`?`every`:`some`](e=>this._isPointInside(e.x-t.x,e.y-t.y))}_isPointInside(e,t){let{width:n,height:r,radius:i,mode:a,gridSize:o}=this.#e,s=e<0?Math.floor(e/o):Math.ceil(e/o),c=t<0?Math.floor(t/o):Math.ceil(t/o),l=Math.max(0,Math.min(n,s)),u=Math.max(0,Math.min(r,c));return $t.get(a)(Math.abs(s-l),Math.abs(c-u),i)}*getPath(){for(let e=0;e<this.#t.length;e++)yield{type:e===0?`m`:`l`,x:this.#t[e].x,y:this.#t[e].y};yield{type:`l`,x:this.#t[0].x,y:this.#t[0].y}}},tn=x(function(e,t,n,r){let i=$t.get(r);if(!i)throw Error("Unknown `mode` for generateSquareAuraBorder.");let a=[],o=n;for(let e=0;e<n;e++){let t=0;for(;t<n&&i(t+1,e+1,n);t++);o!==t&&(a.push({x:o,y:e}),a.push({x:t,y:e}),o=t)}return o>0&&a.push({x:o,y:n}),[...a.map(({x:e,y:t})=>({x:-e,y:-t})),{x:0,y:-n},{x:e,y:-n},...a.map(({x:t,y:n})=>({x:n+e,y:-t})),{x:e+n,y:0},{x:e+n,y:t},...a.map(({x:n,y:r})=>({x:n+e,y:r+t})),{x:e,y:t+n},{x:0,y:t+n},...a.map(({x:e,y:n})=>({x:-n,y:e+t})),{x:-n,y:t},{x:-n,y:0}]}),nn=x(function(e,t){let n=[];for(let r=0;r<t;r++)for(let t=0;t<e;t++)n.push({x:t+.5,y:r+.5});return n})})),an=n((()=>{Ft(),Qt(),rn()}));function on(e,t){if(typeof ClipperLib>`u`||!e?.length)return e;let n=[];for(let t of e){if(t.type===`m`&&n.length)break;(t.type===`m`||t.type===`l`||t.type===`a`)&&n.push({X:Math.round(t.x*A),Y:Math.round(t.y*A)})}if(n.length<3)return e;try{let r=new ClipperLib.ClipperOffset;r.AddPath(n,ClipperLib.JoinType.jtRound,ClipperLib.EndType.etClosedPolygon);let i=new ClipperLib.Paths;if(r.Execute(i,t*A),!i.length)return e;let a=[];for(let e of i)if(!(e.length<3)){a.push({type:`m`,x:e[0].X/A,y:e[0].Y/A});for(let t=1;t<e.length;t++)a.push({type:`l`,x:e[t].X/A,y:e[t].Y/A});a.push({type:`l`,x:e[0].X/A,y:e[0].Y/A})}return a.length?a:e}catch{return e}}var sn,A,cn=n((()=>{b(),w(),yt(),wt(),Nt(),S(),an(),ms(),sn=class{#e;#t;#n;#r;#i=!1;#a=!1;#o=[];#s;#c=null;#l=null;#u;constructor(e){this.#e=e,this.#s=new vt,this.#s.sortLayer=690,this.#u=this.#s.tick.bind(this.#s)}get graphics(){return this.#s}get config(){return this.#t}get geometry(){return this.#c}get innerGeometry(){return this.#l}get isVisible(){return this.#i}get blockers(){return this.#o}set suppressed(e){this.#a=!!e,this.updateVisibility()}*getWorldPath(){if(!this.#c)return;let e=this.#s.x,t=this.#s.y;for(let n of this.#c.getPath())n.type===`a`?yield{type:`a`,x:n.x+e,y:n.y+t,tx:n.tx+e,ty:n.ty+t,r:n.r}:yield{type:n.type,x:n.x+e,y:n.y+t}}*getInnerWorldPath(){if(!this.#l)return;let e=this.#s.x,t=this.#s.y;for(let n of this.#l.getPath())n.type===`a`?yield{type:`a`,x:n.x+e,y:n.y+t,tx:n.tx+e,ty:n.ty+t,r:n.r}:yield{type:n.type,x:n.x+e,y:n.y+t}}isWorldPointInside(e,t){if(!this.#c?._isPointInside)return!1;let n=e-this.#s.x,r=t-this.#s.y;return!(!this.#c._isPointInside(n,r)||this.#l?._isPointInside?.(n,r))}update(e,{tokenDelta:t,force:n=!1}={}){let r=e?.elevationAware&&t&&(`x`in t||`y`in t||`elevation`in t),i=n||r||!foundry.utils.objectsEqual(this.#t,e)||this.#n!==e.radiusCalculated||this.#r!==e.innerRadiusCalculated||!!t&&(`width`in t||`height`in t||`hexagonalShape`in t);this.#t=e,this.#n=e.radiusCalculated,this.#r=e.innerRadiusCalculated;let a=this.updatePosition({tokenDelta:t});if((i||n)&&e?.enabled!==!1){let{width:n,height:r,hexagonalShape:i}=xe([`width`,`height`,`hexagonalShape`],t,this.#e.document);this.#d(n,r,e.radiusCalculated,e.innerRadiusCalculated,i)}let o=this.updateVisibility();return i||a||o}updatePosition({tokenDelta:e}={}){let{x:t,y:n}=this.graphics,r=this.#s.elevation;Object.assign(this.#s,this.#f(e,this.#e)),this.#s.elevation=e?.elevation??this.#e.document.elevation;let i=this.#s.x!==t||this.#s.y!==n||this.graphics.elevation!==r;if(i&&this.#t?.enabled!==!1&&this.#t?.elevationAware&&this.#c&&typeof this.#n==`number`&&this.#n>=0){let{width:e,height:t,hexagonalShape:n}=this.#e.document;this.#d(e,t,this.#n,this.#r,n)}return i}updateVisibility(){let e=this.#i;return this.#i=this.#m(),this.#s.alpha=this.#i&&!this.#a?1:0,this.#i!==e}isInside(e,{sourceTokenPosition:t,useActualSourcePosition:n=!1,targetTokenPosition:r}={}){if(!this.#c)return!1;let i=this.#f(t,n?this.#e:this.#e.document);if(!(this.#c.isInside(e,{auraOffset:i,tokenAltPosition:r,mode:`partial`})&&!this.#l?.isInside(e,{auraOffset:i,tokenAltPosition:r,mode:`total`})))return!1;if(this.#t?.elevationAware){let t=this.#e?.document?.elevation??0,n=e?.document?.elevation??0,r=this.#n??0;if(n<t||n>t+r)return!1}return!0}destroy(...e){canvas.app.ticker.remove(this.#u),this.#s.destroy(...e)}async#d(e,t,n,r,a){let o={...ze(),...this.#t};if(this.#p()?(e=0,t=0):(e??=this.#e.document.width,t??=this.#e.document.height),a??=this.#e.document.hexagonalShape,typeof n!=`number`||n<0||typeof r==`number`&&r>=n){this.#s.clear(),this.#c=null,this.#l=null;return}if(n=Math.min(n,1e3),this.#c=f(n),this.#l=typeof r==`number`&&r>=0?f(r):null,!this.#c){this.#s.clear();return}let s=o.fillType===CONST.DRAWING_FILL_TYPES.PATTERN?await loadTexture(o.fillTexture):null,c=[...this.#c.getPath()],l=this.#l?[[...this.#l.getPath()]]:[],d=o.radiusOffset??0;if(d!==0&&(c=on(c,d),l=l.map(e=>on(e,-d))),this.#o=[],o.elevationAware){if(!this.#s)return;let e=this.#l?[...this.#l.getPath()]:null,t={x:this.#s.x,y:this.#s.y},r=jt(c,this.#e,t,n,null,e);if(r){c=r.outers.flat(),l.length=0;for(let e of r.holes)l.push(e);this.#o=r.blockers??[]}}this.#s.update({lineType:o.lineType,lineWidth:o.lineWidth,lineColor:Color.from(o.lineColor),lineColorAnimation:o.lineColorAnimation,lineOpacity:o.lineOpacity,lineDashSize:o.lineDashSize,lineGapSize:o.lineGapSize,lineDashOffsetAnimation:o.lineDashOffsetAnimation,fillType:o.fillType,fillColor:Color.from(o.fillColor),fillColorAnimation:o.fillColorAnimation,fillOpacity:o.fillOpacity,fillTexture:s,fillTextureOffset:o.fillTextureOffset,fillTextureOffsetAnimation:o.fillTextureOffsetAnimation,fillTextureScale:o.fillTextureScale},c,l,this.#c.bounds),canvas.app.ticker.remove(this.#u),canvas.app.ticker.add(this.#u);function f(n){switch(canvas.grid.type){case CONST.GRID_TYPES.GRIDLESS:return new Pt(e,t,n,canvas.grid.size);case CONST.GRID_TYPES.SQUARE:return new en(e,t,n,game.settings.get(i,u),canvas.grid.size);default:return new Wt(e,t,n,a,[CONST.GRID_TYPES.HEXEVENQ,CONST.GRID_TYPES.HEXODDQ].includes(canvas.grid.type),canvas.grid.size)}}}#f(...e){let{x:t,y:n}=xe([`x`,`y`],...e);if((t===0||t===void 0)&&(n===0||n===void 0)){let e=this.#e?.document;e&&(e.x||e.y)&&(t=e.x,n=e.y)}let{width:r,height:i}=this.#e.document;if((r<1||i<1)&&canvas.grid.type!==CONST.GRID_TYPES.GRIDLESS){let e=canvas.grid.getOffset({x:t+this.#e.w/2,y:n+this.#e.h/2});({x:t,y:n}=canvas.grid.getTopLeftPoint(e))}let a=this.#p();return a!==void 0&&(t+=Math.max(r,1)*a.x*canvas.grid.sizeX,n+=Math.max(i,1)*a.y*canvas.grid.sizeY),{x:t,y:n}}#p(){if(canvas.grid.type===CONST.GRID_TYPES.SQUARE)switch(this.#t.position){case`TOP_LEFT`:return{x:0,y:0};case`TOP_RIGHT`:return{x:1,y:0};case`BOTTOM_RIGHT`:return{x:1,y:1};case`BOTTOM_LEFT`:return{x:0,y:1}}}#m(){if(!this.#e.visible||this.#e.hasPreview||!this.#t.enabled||bt(this.#t.id,this.#t)||this.#t.onlyEnabledInCombat&&!game.combat)return!1;let e=this.#t.keyPressMode??`DISABLED`;if(e===`ONLY_WHEN_PRESSED`)return as(this.#t.keyToPress??`AltLeft`);let t=this.#h();return e===`ALSO_WHEN_PRESSED`?t||as(this.#t.keyToPress??`AltLeft`):t}#h(){let e=foundry.utils.mergeObject(Re,this.#e.isOwner?this.#t.ownerVisibility:this.#t.nonOwnerVisibility,{inplace:!1}),t=!1;if(this.#e.hover){if(e.hovered)return!0;t=!0}if(this.#e.controlled){if(e.controlled)return!0;t=!0}if(this.#e.isPreview){if(e.dragging)return!0;t=!0}if(this.#e.isTargeted){if(e.targeted)return!0;t=!0}if(this.#e.inCombat&&this.#e.combatant?.combat?.current?.tokenId===this.#e.id){if(e.turn)return!0;t=!0}return!t&&e.default}},A=100}));function ln(e){let t=[],n=null;for(let r of e)r.type===`m`?(n&&n.length>=3&&t.push(n),n=[{X:Math.round(r.x*j),Y:Math.round(r.y*j)}]):(r.type===`l`||r.type===`a`)&&n&&n.push({X:Math.round(r.x*j),Y:Math.round(r.y*j)});return n&&n.length>=3&&t.push(n),t}function un(e){let t=[];if(!e.length)return t;t.push({type:`m`,x:e[0].X/j,y:e[0].Y/j});for(let n=1;n<e.length;n++)t.push({type:`l`,x:e[n].X/j,y:e[n].Y/j});return t.push({type:`l`,x:e[0].X/j,y:e[0].Y/j}),t}function dn(e,t,n){let r=e.Childs?.()??e.m_Childs??[];for(let e of r){let r=e.Contour?.()??e.m_polygon??[];r.length>=3&&(e.IsHole?.()??e.m_IsHole?n.push(un(r)):t.push(un(r))),dn(e,t,n)}}function fn(e,t,n=[]){if(typeof ClipperLib>`u`)return null;let r=[];for(let t of e)r.push(...ln(t));if(!r.length)return null;let i=[];for(let e of t)i.push(...ln(e));let a=[];for(let e of n){let t=e?.polygon?.vertices??[];if(t.length<3)continue;let n=t.map(e=>({X:Math.round(e.x*j),Y:Math.round(e.y*j)}));a.push(n)}try{let e=new ClipperLib.Clipper;e.AddPaths(r,ClipperLib.PolyType.ptSubject,!0);let t=new ClipperLib.Paths;if(e.Execute(ClipperLib.ClipType.ctUnion,t,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero),a.length){let e=new ClipperLib.ClipperOffset;e.AddPaths(a,ClipperLib.JoinType.jtMiter,ClipperLib.EndType.etClosedPolygon);let n=new ClipperLib.Paths;e.Execute(n,j);let r=n.length>=1?n:a,i=new ClipperLib.Clipper;i.AddPaths(t,ClipperLib.PolyType.ptSubject,!0),i.AddPaths(r,ClipperLib.PolyType.ptClip,!0);let o=new ClipperLib.Paths;i.Execute(ClipperLib.ClipType.ctDifference,o,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero),t=o}let n=new ClipperLib.PolyTree;if(i.length){let e=new ClipperLib.Clipper;e.AddPaths(t,ClipperLib.PolyType.ptSubject,!0),e.AddPaths(i,ClipperLib.PolyType.ptClip,!0),e.Execute(ClipperLib.ClipType.ctDifference,n,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero)}else{let e=new ClipperLib.Clipper;e.AddPaths(t,ClipperLib.PolyType.ptSubject,!0),e.Execute(ClipperLib.ClipType.ctUnion,n,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero)}let o=[],s=[];return dn(n,o,s),{outers:o,holes:s}}catch{return null}}var j,pn,mn=n((()=>{b(),w(),_t(),N(),j=100,pn=class{#e;#t;#n=[];#r=[];#i=null;#a=[];#o=[];constructor(e){this.#e=e,this.#t=new PIXI.Container,this.#t.sortLayer=689,gn().addChild(this.#t)}get name(){return this.#e}async update(e){for(let{aura:e}of this.#n)try{e.suppressed=!1}catch{}this.#n=e;for(let e of this.#r)e.destroy(!0);this.#r=[],this.#t.removeChildren().forEach(e=>e.destroy({children:!0})),this.#i=null;let t=e.filter(({aura:e})=>e.isVisible);if(this.#t.visible=t.length>=2,t.length<2)return;for(let{aura:e}of t)e.suppressed=!0;let n=t.map(({aura:e})=>[...e.getWorldPath()]),r=t.map(({aura:e})=>[...e.getInnerWorldPath()]);if(n.every(e=>e.length===0))return;let i={...ze(),...t[0].aura.config};await this.#s(n,r,i),this.#c(n,r,t,i)}updateVisibility(){let e=this.#n.filter(({aura:e})=>e.isVisible).length;this.#t.visible=e>=2}destroy(){for(let{aura:e}of this.#n)try{e.suppressed=!1}catch{}this.#n=[];for(let e of this.#r)e.destroy(!0);this.#r=[],gn().removeChild(this.#t),this.#t.destroy({children:!0})}async#s(e,t,n){if(n.fillType===CONST.DRAWING_FILL_TYPES.NONE||(n.fillOpacity??0)<=0)return;let r=this.#u(e);if(!r)return;let i=Math.max(1,Math.ceil(r.width)+4),a=Math.max(1,Math.ceil(r.height)+4),o=PIXI.RenderTexture.create({width:i,height:a,resolution:1});this.#r.push(o);let s=-(r.x-2),c=-(r.y-2);if(n.fillType===CONST.DRAWING_FILL_TYPES.SOLID){let n=!0;for(let r=0;r<e.length;r++){if(e[r].length===0)continue;let i=new PIXI.Container;i.x=s,i.y=c;let a=new PIXI.Graphics;a.beginFill(16777215,1),T(a,e[r]),t[r]?.length>0&&(a.beginHole(),T(a,t[r]),a.endHole()),a.endFill(),i.addChild(a),canvas.app.renderer.render(i,{renderTexture:o,clear:n}),n=!1,i.destroy({children:!0})}}else if(n.fillType===CONST.DRAWING_FILL_TYPES.PATTERN){let r=n.fillTexture?await loadTexture(n.fillTexture):null;if(!r)return;let{x:i,y:a}=n.fillTextureOffset??{x:0,y:0},{x:l,y:u}=n.fillTextureScale??{x:100,y:100},d=new PIXI.Matrix(l/100,0,0,u/100,i+s,a+c),f=!0;for(let i=0;i<e.length;i++){if(e[i].length===0)continue;let a=new PIXI.Container;a.x=s,a.y=c;let l=new PIXI.Graphics;l.beginTextureFill({texture:r,color:Color.from(n.fillColor??`#ffffff`),alpha:1,matrix:d}),T(l,e[i]),t[i]?.length>0&&(l.beginHole(),T(l,t[i]),l.endHole()),l.endFill(),a.addChild(l),canvas.app.renderer.render(a,{renderTexture:o,clear:f}),f=!1,a.destroy({children:!0})}}let l=new PIXI.Sprite(o);l.x=r.x-2,l.y=r.y-2,l.alpha=n.fillOpacity??0,n.fillType===CONST.DRAWING_FILL_TYPES.SOLID&&(l.tint=Color.from(n.fillColor??`#ffffff`).valueOf()),this.#t.addChild(l)}#c(e,t,n,r){if(r.lineType===y.NONE||(r.lineOpacity??0)<=0)return;this.#i=new PIXI.Graphics,this.#i.lineStyle({color:Color.from(r.lineColor??`#000000`),alpha:r.lineOpacity??0,width:r.lineWidth??0,alignment:0}),this.#a=[],this.#o=[];let i=new Set;for(let{aura:e}of n)for(let t of e.blockers??[])i.add(t);let a=fn(e,t,[...i]);if(a){for(let e of a.outers)this.#a.push(...e);for(let e of a.holes)this.#o.push(e);let e=r.lineType===y.DASHED?{dashSize:r.lineDashSize??15,gapSize:r.lineGapSize??10}:null;if(e){E(this.#i,this.#a,e);for(let t of this.#o)E(this.#i,t,e)}else{T(this.#i,this.#a);for(let e of this.#o)T(this.#i,e)}this.#t.addChild(this.#i);return}let o=canvas.grid.size*.5;for(let t=0;t<e.length;t++){let r=this.#l(e[t]);if(r.length<2)continue;let i=n[t].token,a=i.x+i.document.width*canvas.grid.size/2,s=i.y+i.document.height*canvas.grid.size/2,c=!1;for(let e=0;e<r.length-1;e++){let i=r[e],l=r[e+1],u=(i.x+l.x)/2,d=(i.y+l.y)/2,f=u-a,p=d-s,m=Math.sqrt(f*f+p*p),h=m>0?u+f/m*o:u,g=m>0?d+p/m*o:d,_=!1;for(let e=0;e<n.length;e++)if(e!==t&&n[e].aura.isWorldPointInside(h,g)){_=!0;break}_?c=!1:(c||=(this.#a.push({type:`m`,x:i.x,y:i.y}),!0),this.#a.push({type:`l`,x:l.x,y:l.y}))}}for(let e=0;e<t.length;e++){let r=t[e];if(r.length===0)continue;let i=this.#l(r);if(i.length<2)continue;let a=n[e].token,s=a.x+a.document.width*canvas.grid.size/2,c=a.y+a.document.height*canvas.grid.size/2,l=[],u=!1;for(let t=0;t<i.length-1;t++){let r=i[t],a=i[t+1],d=(r.x+a.x)/2,f=(r.y+a.y)/2,p=s-d,m=c-f,h=Math.sqrt(p*p+m*m),g=h>0?d+p/h*o:d,_=h>0?f+m/h*o:f,v=!1;for(let t=0;t<n.length;t++)if(t!==e&&n[t].aura.isWorldPointInside(g,_)){v=!0;break}v?u=!1:(u||=(l.push({type:`m`,x:r.x,y:r.y}),!0),l.push({type:`l`,x:a.x,y:a.y}))}l.length>0&&this.#o.push(l)}let s=r.lineType===y.DASHED?{dashSize:r.lineDashSize??15,gapSize:r.lineGapSize??10}:null;if(s){E(this.#i,this.#a,s);for(let e of this.#o)E(this.#i,e,s)}else{T(this.#i,this.#a);for(let e of this.#o)T(this.#i,e)}this.#t.addChild(this.#i)}#l(e){let t=[];for(let n of e)(n.type===`m`||n.type===`l`||n.type===`a`)&&t.push({x:n.x,y:n.y});return t}#u(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)for(let e of a)`x`in e&&(t=Math.min(t,e.x),r=Math.max(r,e.x)),`y`in e&&(n=Math.min(n,e.y),i=Math.max(i,e.y));return isFinite(t)?{x:t,y:n,width:r-t,height:i-n}:null}}})),hn=r({AuraLayer:()=>M,getAuraParent:()=>gn});function gn(){return game.settings.get(`grid-aware-auras`,`ignoreLighting`)?canvas.gaaAuraLayer??canvas.primary:canvas.primary}var M,N=n((()=>{b(),w(),S(),Ye(),cn(),mn(),M=class extends CanvasLayer{#e=!1;_auraManager=new Je;_isTearingDown=!1;#t=new Map;#n=!1;#r=!1;static get current(){return game.ready?game.canvas?.gaaAuraLayer:void 0}async _draw(){for(let e of this.#t.values())e.destroy();this.#t.clear(),this._auraManager.clear(),this._isTearingDown=!1,canvas.app.ticker.addOnce(()=>{this.#e=!0,this._updateAuras({isInit:!0})},void 0,PIXI.UPDATE_PRIORITY.UTILITY)}_onDestroyToken(e){let t=this._auraManager.getTokenAuras(e);for(let n of t){if(!this._isTearingDown)for(let t of this._auraManager.getTokensInsideAura(e,n.config.id))this.#a(t,e,n.config,!1,game.userId,!1);gn().removeChild(n.graphics),n.destroy()}this._auraManager.deregisterToken(e)}_updateAuraGraphics({token:e,updatePosition:t=!0,updateVisibility:n=!0}={}){if(!this.#e)return;let r=e?[e]:canvas.tokens.placeables;for(let e of r)for(let r of this._auraManager.getTokenAuras(e))t&&r.updatePosition(),n&&r.updateVisibility();this._scheduleUnifiedAuraUpdate()}_updateAuras({token:e,tokenDelta:t,force:n=!1,userId:r,isInit:i=!1}={}){if(!this.#e)return;r??=game.userId,n||=i;let a=e?[e]:canvas.tokens.placeables;for(let e of a){let a=Ae(e),o=this._auraManager.getTokenAuras(e);for(let t of o)if(!a.some(e=>e.id===t.config.id)){for(let n of this._auraManager.getTokensInsideAura(e,t.config.id))this.#a(n,e,t.config,!1,r,!1);gn().removeChild(t.graphics),t.destroy(),this._auraManager.deregisterAura(e,t.config.id),Hooks.callAll(g,e,t.config)}for(let r of a){let a=o.find(e=>e.config.id===r.id);if(a){if(a.config?.enabled===!1&&r.enabled===!1&&!n)continue;a.update(r,{tokenDelta:t,force:n})&&Hooks.callAll(te,e,r,{x:a.graphics.x,y:a.graphics.y},{outer:a.geometry,inner:a.innerGeometry})}else{let a=new sn(e);a.update(r,{tokenDelta:t,force:n}),gn().addChild(a.graphics),this._auraManager.registerAura(e,a),Hooks.callAll(h,e,r,{x:a.graphics.x,y:a.graphics.y},{outer:a.geometry,inner:a.innerGeometry},{isInit:i})}}}e?this._testCollisionsForToken(e,{tokenDelta:t,userId:r}):this.#i({userId:r,isInit:i}),this._scheduleUnifiedAuraUpdate(),i&&canvas.app.ticker.addOnce(()=>{this._isTearingDown||!this.#e||this._updateAuraGraphics({updatePosition:!0,updateVisibility:!0})},void 0,PIXI.UPDATE_PRIORITY.UTILITY)}_updateActorAuras(e,{userId:t}={}){for(let n of e.getActiveTokens({linked:!0,document:!0}))this._updateAuras({token:n,userId:t})}_scheduleUnifiedAuraUpdate(){if(this.#e){if(this.#n){this.#r=!0;return}this.#n=!0,setTimeout(()=>{this._updateUnifiedAuras().catch(console.error).finally(()=>{this.#n=!1,this.#r&&(this.#r=!1,this._scheduleUnifiedAuraUpdate())})},100)}}async _updateUnifiedAuras(){if(!this.#e)return;let e=new Map;for(let{parent:t,aura:n}of this._auraManager.getAllAuras({preview:!1})){if(!n.config.unified||!n.config.enabled||!n.isVisible)continue;let r=n.config.name;if(!e.has(r)){e.set(r,[{token:t,aura:n}]);continue}let i=e.get(r);Ne(n.config,i[0].aura.config)&&i.push({token:t,aura:n})}for(let[t,n]of this.#t){let r=e.get(t);(!r||r.length<2)&&(n.destroy(),this.#t.delete(t))}for(let[t,n]of e){if(n.length<2)continue;let e=this.#t.get(t);e||(e=new pn(t),this.#t.set(t,e)),await e.update(n)}}#i({userId:e,sourceToken:t,sourceTokenDelta:n,targetToken:r,targetTokenDelta:i,destroyToken:a,useActualPosition:o=!1,isInit:s=!1}={}){if(!this.#e)return;let c=(t?[t]:[...game.canvas.tokens.placeables]).flatMap(e=>this._auraManager.getTokenAuras(e).map(t=>({parent:e,aura:t}))),l;if(r)l=[r];else if(t&&canvas.tokens.quadtree){let e=this._auraManager.getTokenAuras(t);if(e.length===0)l=[];else{let t=new Set;for(let n of e){let e=n.graphics.getBounds(),r=canvas.tokens.quadtree.getObjects(e);for(let e of r)t.add(e)}l=[...t]}}else l=[...game.canvas.tokens.placeables];for(let t of l){let r=xe([`x`,`y`],i,o?t:t.document);for(let{parent:i,aura:l}of c){if(i.id===t.id)continue;let c=!!game.combat,u=!l.config.onlyEnabledInCombat||c,d=l.config.enabled&&u&&i!==a&&t!==a&&l.isInside(t,{sourceTokenPosition:n,useActualSourcePosition:o,targetTokenPosition:r});this._auraManager.setIsInside(t,i,l.config.id,d)&&this.#a(t,i,l.config,d,e??game.userId,s)}}}_testCollisionsForToken(e,{tokenDelta:t,userId:n,useActualPosition:r=!1,destroyToken:i=!1}={}){this.#i({userId:n,sourceToken:e,sourceTokenDelta:t,destroyToken:i?e:void 0,useActualPosition:r}),this.#i({userId:n,targetToken:e,targetTokenDelta:t,destroyToken:i?e:void 0,useActualPosition:r})}#a(e,t,n,r,i,a){let o=t.isPreview||e.isPreview;Hooks.callAll(v,e,t,n,{hasEntered:r,isPreview:o,isInit:a,userId:i})}}})),_n=r({createAura:()=>vn,deleteAuras:()=>yn,getAurasContainingToken:()=>Sn,getDocumentOwnAuras:()=>bn,getMovementPenaltyAt:()=>Tn,getTokenAuras:()=>xn,getTokensInsideAura:()=>Cn,isAuraClientHidden:()=>bt,isTokenInside:()=>wn,registerRadiusExpressionExtension:()=>En,setAuraClientHidden:()=>xt,toggleAuraClientHidden:()=>St,toggleEffect:()=>Dn,updateAuras:()=>On});async function vn(e,t={}){e=e instanceof Token?e.document:e;let n=C(e),r=foundry.utils.mergeObject(ze(),t,{inplace:!1});return r.id=foundry.utils.randomID(),await e.update({[`flags.${i}.${o}`]:[...n,r]}),r}async function yn(e,t,{includeItems:n=!1}={}){return e=e instanceof Token?e.document:e,(await Promise.all([r(e),...e instanceof TokenDocument&&n?e.actor?.items?.map(r)??[]:[]])).flat();async function r(e){let n=C(e),r=Object.groupBy(n,e=>kn(e,t));return r[!0]?.length>0&&await e.update({[`flags.${i}.${o}`]:r[!1]??[]}),r[!0]??[]}}function bn(e){return e=e instanceof Token?e.document:e,C(e,{calculateRadius:!0})}function xn(e){let t=e instanceof Token?e.document:e;return[...bn(t).map(e=>({aura:e,owner:t})),...t.actor?.items?.map(e=>bn(e).map(t=>({aura:t,owner:e})))?.flat()??[]]}function Sn(e){return(M.current?._auraManager.getAurasContainingToken(e)??[]).map(({parent:e,aura:t})=>({parent:e,aura:t.config}))}function Cn(e,t){return M.current?._auraManager.getTokensInsideAura(e,t)??[]}function wn(e,t,n){return M.current?._auraManager.isInside(e,t,n)??!1}function Tn(e,t,{excludeToken:n}={}){let r=M.current;if(!r)return 0;let i=n instanceof Token?n.document?.id:n?.id,a=!!game.combat,o=0;for(let{parent:n,aura:s}of r._auraManager.getAllAuras({preview:!1})){let r=s.config,c=Number(r?.movementPenalty)||0;c<=0||r.enabled&&(r.onlyEnabledInCombat&&!a||i&&n.document?.id===i||s.isWorldPointInside(e,t)&&c>o&&(o=c))}return o}function En(e,t,n){return Se(e,t,n)}async function Dn(e,t,n,{overlay:r=!1}={}){let i;if(e instanceof Token||e instanceof TokenDocument)i=e.actor;else if(e instanceof Actor)i=e;else if(typeof e==`string`)return await Dn(await fromUuid(e),t,n,{overlay:r});if(!i)throw Error(`Could not resolve actor.`);await ge(i,t,!!n,{overlay:r},!0)}async function On(e,t,n,{includeItems:r=!1}={}){if(e=e instanceof Token?e.document:e,!n||![`object`,`function`].includes(typeof n))throw Error("Must provide an object or a function as the `update` parameter.");return(await Promise.all([a(e),...e instanceof TokenDocument&&r?e.actor?.items?.map(a)??[]:[]])).flat();async function a(e){let r=C(e),a=[],s=!1;for(let e of r)kn(e,t)&&(Object.assign(e,typeof n==`function`?n(e):n),a.push(e),s=!0);return s&&await e.update({[`flags.${i}.${o}`]:r}),a}}function kn(e,t){return(t?.id===void 0||typeof t.id==`string`&&e.id===t.id||t.id instanceof RegExp&&t.id.test(e.id))&&(t?.name===void 0||typeof t.name==`string`&&e.name.localeCompare(t.name,void 0,{sensitivity:`accent`})===0||t.name instanceof RegExp&&t.name.test(e.name))}var An=n((()=>{b(),ke(),w(),N(),S(),wt()})),jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn=n((()=>{jn=globalThis,Mn=jn.ShadowRoot&&(jn.ShadyCSS===void 0||jn.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,Nn=Symbol(),Pn=new WeakMap,Fn=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Nn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Mn&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Pn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Pn.set(t,e))}return e}toString(){return this.cssText}},In=e=>new Fn(typeof e==`string`?e:e+``,void 0,Nn),Ln=(e,t)=>{if(Mn)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=jn.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},Rn=Mn?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return In(t)})(e):e})),Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr=n((()=>{zn(),{is:Bn,defineProperty:Vn,getOwnPropertyDescriptor:Hn,getOwnPropertyNames:Un,getOwnPropertySymbols:Wn,getPrototypeOf:Gn}=Object,Kn=globalThis,qn=Kn.trustedTypes,Jn=qn?qn.emptyScript:``,Yn=Kn.reactiveElementPolyfillSupport,Xn=(e,t)=>e,Zn={toAttribute(e,t){switch(t){case Boolean:e=e?Jn:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Qn=(e,t)=>!Bn(e,t),$n={attribute:!0,type:String,converter:Zn,reflect:!1,useDefault:!1,hasChanged:Qn},Symbol.metadata??=Symbol(`metadata`),Kn.litPropertyMetadata??=new WeakMap,er=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$n){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Vn(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=Hn(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$n}static _$Ei(){if(this.hasOwnProperty(Xn(`elementProperties`)))return;let e=Gn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Xn(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xn(`properties`))){let e=this.properties,t=[...Un(e),...Wn(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(Rn(e))}else e!==void 0&&t.push(Rn(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ln(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?Zn:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?Zn:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??Qn)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}},er.elementStyles=[],er.shadowRootOptions={mode:`open`},er[Xn(`elementProperties`)]=new Map,er[Xn(`finalized`)]=new Map,Yn?.({ReactiveElement:er}),(Kn.reactiveElementVersions??=[]).push(`2.1.2`)}));function nr(e,t){if(!mr(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return sr===void 0?t:sr.createHTML(t)}function rr(e,t,n=e,r){if(t===L)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=pr(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=rr(e,i._$AS(e,t.values),i,r)),t}var ir,ar,or,sr,cr,P,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,F,br,xr,Sr,Cr,I,L,R,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,z,B=n((()=>{ir=globalThis,ar=e=>e,or=ir.trustedTypes,sr=or?or.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,cr=`$lit$`,P=`lit$${Math.random().toFixed(9).slice(2)}$`,lr=`?`+P,ur=`<${lr}>`,dr=document,fr=()=>dr.createComment(``),pr=e=>e===null||typeof e!=`object`&&typeof e!=`function`,mr=Array.isArray,hr=e=>mr(e)||typeof e?.[Symbol.iterator]==`function`,gr=`[ 	
\f\r]`,_r=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vr=/-->/g,yr=/>/g,F=RegExp(`>|${gr}(?:([^\\s"'>=/]+)(${gr}*=${gr}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),br=/'/g,xr=/"/g,Sr=/^(?:script|style|textarea|title)$/i,Cr=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),I=Cr(1),Cr(2),Cr(3),L=Symbol.for(`lit-noChange`),R=Symbol.for(`lit-nothing`),wr=new WeakMap,Tr=dr.createTreeWalker(dr,129),Er=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=_r;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===_r?c[1]===`!--`?o=vr:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=F):(Sr.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=F):o=yr:o===F?c[0]===`>`?(o=i??_r,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?F:c[3]===`"`?xr:br):o===xr||o===br?o=F:o===vr||o===yr?o=_r:(o=F,i=void 0);let d=o===F&&e[t+1].startsWith(`/>`)?` `:``;a+=o===_r?n+ur:l>=0?(r.push(s),n.slice(0,l)+cr+n.slice(l)+P+d):n+P+(l===-2?t:d)}return[nr(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Dr=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Er(t,n);if(this.el=e.createElement(l,r),Tr.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Tr.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(cr)){let t=u[o++],n=i.getAttribute(e).split(P),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?jr:r[1]===`?`?Mr:r[1]===`@`?Nr:Ar}),i.removeAttribute(e)}else e.startsWith(P)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Sr.test(i.tagName)){let e=i.textContent.split(P),t=e.length-1;if(t>0){i.textContent=or?or.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],fr()),Tr.nextNode(),c.push({type:2,index:++a});i.append(e[t],fr())}}}else if(i.nodeType===8)if(i.data===lr)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(P,e+1))!==-1;)c.push({type:7,index:a}),e+=P.length-1}a++}}static createElement(e,t){let n=dr.createElement(`template`);return n.innerHTML=e,n}},Or=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??dr).importNode(t,!0);Tr.currentNode=r;let i=Tr.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new kr(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Pr(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Tr.nextNode(),a++)}return Tr.currentNode=dr,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=rr(this,e,t),pr(e)?e===R||e==null||e===``?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==L&&this._(e):e._$litType$===void 0?e.nodeType===void 0?hr(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==R&&pr(this._$AH)?this._$AA.nextSibling.data=e:this.T(dr.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Dr.createElement(nr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Or(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=wr.get(e.strings);return t===void 0&&wr.set(e.strings,t=new Dr(e)),t}k(t){mr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(fr()),this.O(fr()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ar(e).nextSibling;ar(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=R}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=rr(this,e,t,0),a=!pr(e)||e!==this._$AH&&e!==L,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=rr(this,r[n+o],t,o),s===L&&(s=this._$AH[o]),a||=!pr(s)||s!==this._$AH[o],s===R?e=R:e!==R&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},jr=class extends Ar{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}},Mr=class extends Ar{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==R)}},Nr=class extends Ar{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=rr(this,e,t,0)??R)===L)return;let n=this._$AH,r=e===R&&n!==R||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==R&&(n===R||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pr=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){rr(this,e)}},Fr={M:cr,P,A:lr,C:1,L:Er,R:Or,D:hr,V:rr,I:kr,H:Ar,N:Mr,U:Nr,B:jr,F:Pr},Ir=ir.litHtmlPolyfillSupport,Ir?.(Dr,kr),(ir.litHtmlVersions??=[]).push(`3.3.2`),z=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new kr(t.insertBefore(fr(),e),e,void 0,n??{})}return i._$AI(e),i}})),Lr,V,Rr,zr=n((()=>{tr(),tr(),B(),B(),Lr=globalThis,V=class extends er{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=z(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}},V._$litElement$=!0,V.finalized=!0,Lr.litElementHydrateSupport?.({LitElement:V}),Rr=Lr.litElementPolyfillSupport,Rr?.({LitElement:V}),(Lr.litElementVersions??=[]).push(`4.2.2`)})),Br=n((()=>{})),H=n((()=>{tr(),B(),zr(),Br()})),Vr,Hr,Ur,Wr,Gr,U,Kr,qr,Jr,Yr,Xr=n((()=>{B(),{I:Vr}=Fr,Hr=e=>e,Ur=e=>e.strings===void 0,Wr=()=>document.createComment(``),Gr=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Vr(r.insertBefore(Wr(),i),r.insertBefore(Wr(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Hr(e).nextSibling;Hr(r).insertBefore(e,i),e=t}}}return n},U=(e,t,n=e)=>(e._$AI(t,n),e),Kr={},qr=(e,t=Kr)=>e._$AH=t,Jr=e=>e._$AH,Yr=e=>{e._$AR(),e._$AA.remove()}})),Zr,Qr,$r,ei=n((()=>{Zr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qr=e=>(...t)=>({_$litDirective$:e,values:t}),$r=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}}));function ti(e){this._$AN===void 0?this._$AM=e:(ii(this),this._$AM=e,ai(this))}function ni(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)ri(r[e],!1),ii(r[e]);else r!=null&&(ri(r,!1),ii(r));else ri(this,e)}var ri,ii,ai,oi,si,ci=n((()=>{Xr(),ei(),ri=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),ri(e,t);return!0},ii=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},ai=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),oi(t)}},oi=e=>{e.type==Zr.CHILD&&(e._$AP??=ni,e._$AQ??=ti)},si=class extends $r{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),ai(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(ri(this,e),ii(this))}setValue(e){if(Ur(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}})),W,li,di,G,fi=n((()=>{B(),ci(),ei(),W=()=>new li,li=class{},di=new WeakMap,G=Qr(class extends si{render(e){return R}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),R}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=di.get(t);n===void 0&&(n=new WeakMap,di.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?di.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})})),pi=n((()=>{fi()}));
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function K(e,t,n){return e?t(e):n?.(e)}var mi=n((()=>{})),hi=n((()=>{mi()})),q,gi=n((()=>{B(),ei(),q=Qr(class extends $r{constructor(e){if(super(e),e.type!==Zr.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return L}})})),_i=n((()=>{gi()}));function vi(e,{prefix:t=``}={}){let n=t.split(`.`).filter(Boolean),r=new Set,i=a([...n],e).map(e=>({path:e}));return i.sort((e,t)=>bi(e.path).localeCompare(bi(t.path),void 0,{sensitivity:`base`})),i;function a(e,t,n){if(n>16)return[];switch(!0){case t==null||typeof t==`number`:return[[...e]];case Array.isArray(t):return t.length>0?a([...e,Number],t[0]):[];case typeof t==`object`:return r.has(t)?[]:(r.add(t),Object.entries(t).filter(([e])=>e[0]!==`_`).flatMap(([t,n])=>a([...e,t],n)));default:return[]}}}function yi(e,{prefix:t=``}={}){let{ArrayField:n,NumberField:r,SchemaField:i}=foundry.data.fields,a=t.split(`.`).filter(Boolean),o=[];for(let t of Object.values(e)){let{schema:e}=t;for(let t of s([...a,e.name],e))o.find(e=>ve(e.path,t))||o.push({path:t})}return o.sort((e,t)=>bi(e.path).localeCompare(bi(t.path),void 0,{sensitivity:`base`})),o;function s(e,t){switch(!0){case t instanceof n:return s([...e,Number],t.element);case t instanceof i:return Object.values(t.fields).flatMap(t=>s([...e,t.name],t));case t instanceof r:return[[...e]];default:return[]}}}function bi(e){return e.map(e=>e===Number?`0`:e).join(`.`)}function xi(e){let t=e.charCodeAt(0);return t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57||[`.`,`-`,`_`].includes(e)}var Si,Ci,wi=n((()=>{H(),_i(),pi(),S(),Si=`gaa-data-path-autocomplete`,Ci=class extends V{static properties={_filteredDataPaths:{state:!0},_isInputFocused:{state:!0},_focusedDataPath:{state:!0},dataPaths:{attribute:!1},value:{type:String},placeholder:{type:String},disabled:{type:Boolean},name:{type:String}};static formAssociated=!0;#e;_inputRef=W();#t=null;constructor(){super(),this.#e=this.attachInternals(),this._filteredDataPaths=[],this._isInputFocused=!1,this._focusedDataPath=null,this.dataPaths=[],this.value=``,this.placeholder=``,this.disabled=!1}get _isDropdownOpen(){return this._isInputFocused&&!this.disabled&&!!this.#s()&&this._filteredDataPaths.length>0}render(){return I`
			<input
				${G(this._inputRef)}
				type="text"
				.value=${this.value}
				placeholder=${this.placeholder}
				@focus=${()=>{this._isInputFocused=!0,this.#o()}}
				@blur=${()=>this._isInputFocused=!1}
				@input=${e=>this.#u(e.target.value,e)}
				@click=${()=>this.#o()}
				@keyup=${()=>this.#o()}
				@keydown=${e=>this.#a(e)}
				?disabled=${this.disabled}
			>
		`}#n(){return I`
			<menu class="dropdown-menu-fwl">
				${this._filteredDataPaths.map(e=>I`
					<li
						class=${q({active:e===this._focusedDataPath})}
						@mousedown=${()=>this.#c(e)}
						@pointerenter=${()=>this.#l(e,!1)}
					>
						${bi(e.path)}
					</li>
				`)}
			</menu>
		`}willUpdate(e){this._isDropdownOpen&&[`value`,`dataPaths`,`_isInputFocused`].some(t=>e.has(t))&&(this.#o(),this._filteredDataPaths.length===0?this.#l(null):this._filteredDataPaths.includes(this._focusedDataPath)||this.#l(this._filteredDataPaths[0]))}update(e){super.update(e),this.#r()}updated(){this.#i()}disconnectedCallback(){super.disconnectedCallback(),this.#t?.remove(),this.#t=null}#r(){if(!this._isDropdownOpen){this.#t?.remove(),this.#t=null,this._focusedDataPath=null;return}this.#t||(this.#t=document.createElement(`div`),this.#t.classList.add(`gaa-data-path-autocomplete-dropdown`),document.body.appendChild(this.#t)),z(this.#n(),this.#t)}#i(){if(!this.#t)return;let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect(),{width:i,height:a}=this.#t.getBoundingClientRect();Object.assign(this.#t.style,{top:e+r+a>window.innerHeight?`${e-a}px`:`${e+r}px`,left:t+i>window.innerWidth?`${t+n-i}px`:`${t}px`,minWidth:`${n}px`})}#a(e){switch(e.key){case`ArrowUp`:case`ArrowDown`:{let t=this._filteredDataPaths.indexOf(this._focusedDataPath);e.key===`ArrowDown`&&t<this._filteredDataPaths.length-1?this.#l(this._filteredDataPaths[t+1]):e.key===`ArrowUp`&&t>0&&this.#l(this._filteredDataPaths[t-1]),e.preventDefault(),e.stopImmediatePropagation();break}case`Enter`:case`Tab`:this._focusedDataPath&&this.#c(this._focusedDataPath),e.preventDefault(),e.stopImmediatePropagation();break;default:this.#o();break}}#o(){let e=this.#s();if(!e){this._filteredDataPaths=[];return}let t=e.value.split(`.`).filter(e=>e!==``).map(e=>Number.isNaN(+e)?e.toLowerCase():Number);if(!t.length){this._filteredDataPaths=this.dataPaths;return}let n=[];for(let e of this.dataPaths){let{distances:r,textIndices:i}=t.reduce(({distances:t,textIndices:n,startIndex:r},i)=>{let a=-1,o=-1,s=r;for(;s<e.path.length;s++)if(e.path[s]===Number&&i===Number){a=s;break}else if(e.path[s]!==Number&&i!==Number&&(o=e.path[s].toLowerCase().indexOf(i),o>-1)){a=s;break}return{distances:[...t,a===-1?-1:a-r],textIndices:[...n,o],startIndex:s+1}},{distances:[],textIndices:[],startIndex:0});r.includes(-1)||n.push({dataPath:e,distances:r,textIndices:i})}let r=n.sort((e,n)=>{for(let r=0;r<t.length;r++){if(e.textIndices[r]!==n.textIndices[r])return e.textIndices[r]-n.textIndices[r];if(e.distances[r]!==n.distances[r])return e.distances[r]-n.distances[r]}return 0}).map(({dataPath:e})=>e);this._filteredDataPaths=r.length===1&&bi(r[0].path)===e.value?[]:r}#s(){if(!this._isInputFocused||!this._inputRef.value)return null;let{selectionStart:e,selectionEnd:t,value:n}=this._inputRef.value;if(typeof e!=`number`)return null;let r=e-1;for(;;){if(r<0)return null;if(n[r]===`@`)break;if(!xi(n[r]))return null;r--}r++;let i=e;for(;i<n.length&&xi(n[i]);i++);return t>i?null:{start:r,end:i,value:n.slice(r,i)}}#c(e){let t=this.#s();if(!t)return;let n=bi(e.path);this.#u(this.value.slice(0,t.start)+n+this.value.slice(t.end,this.value.length));let r=t.start+n.length;setTimeout(()=>{this._inputRef.value?.focus(),this._inputRef.value?.setSelectionRange(r,r)},0)}#l(e,t=!0){this._focusedDataPath=e;let n=this.#t;t&&n&&this.updateComplete.then(()=>n.querySelector(`li.active`).scrollIntoView({block:`nearest`}))}#u(e,t){this.value=e,this.#e.setFormValue(e),t?.preventDefault(),t?.stopImmediatePropagation(),this.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!1,composed:!0}))}createRenderRoot(){return this}},customElements.define(Si,Ci)}));function Ti(){return[...ki.map(({id:e,name:t,group:n})=>({value:e,label:t,group:n})),...Di().map(({id:e,name:t,group:n})=>({value:e,label:t,group:n})),...Ai.map(({id:e,name:t})=>({value:e,label:t,group:game.i18n.localize(`GRIDAWAREAURAS.AuraDisplayCustom`)}))]}function Ei(){let e=(e,t)=>{let n=game.modules.get(`token-factions`)?.api;if(n&&typeof n.getDisposition==`function`&&t)try{return n.getDisposition(t,e)}catch{}return e.document.disposition};ki=[{id:`ALL`,name:game.i18n.localize(`All`),group:``,f:()=>!0},{id:`FRIENDLY`,name:game.i18n.localize(`TOKEN.DISPOSITION.FRIENDLY`),group:game.i18n.localize(`TOKEN.Disposition`),f:(t,n)=>e(t,n)===CONST.TOKEN_DISPOSITIONS.FRIENDLY},{id:`NEUTRAL`,name:game.i18n.localize(`TOKEN.DISPOSITION.NEUTRAL`),group:game.i18n.localize(`TOKEN.Disposition`),f:(t,n)=>e(t,n)===CONST.TOKEN_DISPOSITIONS.NEUTRAL},{id:`HOSTILE`,name:game.i18n.localize(`TOKEN.DISPOSITION.HOSTILE`),group:game.i18n.localize(`TOKEN.Disposition`),f:(t,n)=>e(t,n)===CONST.TOKEN_DISPOSITIONS.HOSTILE},...Object.keys(game.model.Actor).filter(e=>e!==`base`).map(e=>({id:`ACTORTYPE_${e}`,name:game.i18n.localize(`TYPES.Actor.${e}`),group:game.i18n.localize(`Type`),f:t=>t.actor?.type===e}))],Oi()}function Di(){if(!game.modules.get(`token-factions`)?.active)return[];let e=!1;try{e=game.settings.get(`token-factions`,`color-from`)===`advanced-factions`}catch{return[]}if(!e)return[];let t=[];try{t=game.settings.get(`token-factions`,`team-setup`)??[]}catch{return[]}return t.filter(e=>e?.id).map(e=>({id:`TEAM_${e.id}`,name:e.name??e.id,group:`Advanced Team`,f:t=>t.actor?.getFlag(`token-factions`,`team`)===e.id}))}function Oi(){Ai=[];let e=game.settings.get(`grid-aware-auras`,`customAuraTargetFilters`)??[];for(let{body:t,...n}of e)try{let e=Function(`targetToken`,`sourceToken`,`aura`,t);Ai.push({...n,f:e})}catch(e){pe(`Could not compile custom filter '${n.name}'`,e)}}function J(e,t,n,r){let i=r?.length&&(ki.find(e=>e.id===r)??Di().find(e=>e.id===r)??Ai.find(e=>e.id===r));if(i)try{return!!i.f(e,t,n)}catch(e){pe(`Error thrown in aura target filter ${i.name}`,e)}return e.disposition!==CONST.TOKEN_DISPOSITIONS.SECRET}var ki,Ai,ji=n((()=>{b(),S(),ki=[],Ai=[]}));function Y(e,{selected:t,labelSelector:n,valueSelector:r,groupSelector:i,localize:a=!0,sort:o=!1}={}){Array.isArray(e)?(n??=`label`,r??=`value`,i??=`group`):(e=Object.entries(e),n??=1,r??=0);let s=e.map(e=>{let o=typeof n==`function`?n(e):e[n],s=typeof r==`function`?r(e):e[r],c=typeof i==`function`?i(e):e[i];return{label:a?game.i18n.localize(o):o,value:s,group:c,selected:t===s}});o&&s.sort((e,t)=>e.label.localeCompare(t.label));let c=s.reduce((e,t)=>{let n=t.group?.length?t.group:Mi;return e[n]??=[],e[n].push(I`<option value=${t.value} ?selected=${t.selected}>${t.label}</option>`),e},{});return[...c[Mi]??[],...Object.entries(c).filter(([e])=>e!==Mi).map(([e,t])=>I`
				<optgroup label=${a?game.i18n.localize(e):e}>
					${t}
				</optgroup>
			`)]}var Mi,Ni=n((()=>{H(),Mi=Symbol(`noGroup`)})),Pi=n((()=>{ci()})),Fi,Ii,Li,Ri=n((()=>{B(),ei(),Fi=`important`,Ii=` !`+Fi,Li=Qr(class extends $r{constructor(e){if(super(e),e.type!==Zr.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Ii);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Fi:``):n[e]=r}}return L}})})),zi=n((()=>{Ri()})),Bi,Vi,Hi=n((()=>{H(),Pi(),pt(),st(),Bi=class extends si{#e;#t;#n;#r;#i=null;render(e,t){return R}update(e,[t,n]){return this.#e=e.element,this.#t=t,this.#n=dt(t.keyframes),this.#r=n,this.#i&&cancelAnimationFrame(this.#i),this.#i=requestAnimationFrame(this.#a),L}reconnected(){this.#i&&cancelAnimationFrame(this.#i),this.#i=requestAnimationFrame(this.#a)}disconnected(){this.#i&&cancelAnimationFrame(this.#i),this.#i=null}#a=()=>{if(!this.isConnected||!this.#e||this.#t.duration<=0||this.#t.keyframes.length===0)return;let{color:e,alpha:t}=ft(this.#n,this.#t.duration,this.#t.easingFunc,Date.now());e=at(e,t);let n=e>>16&255,r=e>>8&255,i=e&255;this.#e.style.setProperty(this.#r,`rgb(${n} ${r} ${i} / ${Math.round(t*1e4)/100}%)`),this.#i=requestAnimationFrame(this.#a)}},Vi=Qr(Bi)})),Ui=n((()=>{})),Wi,Gi=n((()=>{H(),_i(),Ui(),Wi=class extends V{static properties={disabled:{type:Boolean},_isOpen:{state:!0}};static dropdownClasses=``;#e=null;constructor(){super(),this.disabled=!1,this._isOpen=!1}render(){return I`
			<div
				class=${q({"dropdown-button-fwl":!0,"dropdown-button-fwl-disabled":this.disabled})}
				@mousedown=${()=>this._isOpen=!this._isOpen}
			>
				${this._renderButton()}
				<i class="fas fa-chevron-down"></i>
			</div>
		`}_renderButton(){throw Error(`Must be overriden in a derived subclass.`)}_renderDropdown(){throw Error(`Must be overriden in a derived subclass.`)}#t(){if(!this._isOpen||this.disabled){this.#e?.remove(),this.#e=null;return}this.#e||(this.#e=document.createElement(`div`),this.#e.classList.add(`dropdown-container-fwl`,`application`,...this.constructor.dropdownClasses.split(` `).filter(Boolean)),document.body.appendChild(this.#e)),z(this._renderDropdown(),this.#e)}#n(){if(!this.#e)return;let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect(),{width:i,height:a}=this.#e.getBoundingClientRect();Object.assign(this.#e.style,{top:e+r+a>window.innerHeight?`${e-a}px`:`${e+r}px`,left:t+i>window.innerWidth?`${t+n-i}px`:`${t}px`,minWidth:`${n}px`})}connectedCallback(){super.connectedCallback(),document.body.addEventListener(`pointerdown`,this.#r)}update(e){super.update(e),this.#t()}updated(){Promise.resolve().then(()=>this.#n())}disconnectedCallback(){super.disconnectedCallback(),this.#e?.remove(),document.body.removeEventListener(`pointerdown`,this.#r)}#r=e=>{this._isOpen&&(e.target.closest(`.dropdown-container-fwl`)===this.#e||e.target.closest(this.tagName)===this||(this._isOpen=!1))};createRenderRoot(){return this}}})),Ki=n((()=>{})),qi,Ji,Yi=n((()=>{H(),pi(),zi(),st(),Ki(),qi=`color-picker-fwl`,Ji=class extends V{static properties={_rawValue:{state:!0}};static formAssociated=!0;#e=foundry.utils.randomID();#t;#n=W();#r=W();constructor(){super(),this.#t=this.attachInternals(),this._rawValue={h:0,s:100,v:100,a:100}}get name(){return this.getAttribute(`name`)}set name(e){this.setAttribute(`name`,e)}get form(){return this.#t.form}get value(){return et(this._rawValue)}set value(e){let t=$e(e);t&&(this._rawValue=t)}render(){let e=this._rawValue,t=et(e),n=nt(t);return I`
			<div class="color-picker-fwl-interactive">
				<div
					class="color-picker-fwl-color-space"
					tabindex="0"
					@pointerdown=${this.#i}
					style=${Li({"--current-color-hue":e.h})}
					${G(this.#r)}
				>
					<div
						class="color-picker-fwl-color-space-thumb"
						style=${Li({top:Math.round((100-e.v)*100)/100+`%`,left:Math.round(e.s*100)/100+`%`})}
					></div>
				</div>

				<div class="flexrow gap-05rem">
					<div class="flexcol gap-05rem">
						<input
							type="range"
							class="color-picker-fwl-hue-range"
							min="0"
							max="359"
							step="1"
							.value=${e.h}
							@input=${e=>this.#o(e,`h`)}
						>

						<input
							type="range"
							class="color-picker-fwl-alpha-range"
							min="0"
							max="100"
							step="1"
							.value=${e.a}
							@input=${e=>this.#o(e,`a`)}
							style=${Li({"--current-color-rgb":`${t.r} ${t.g} ${t.b}`})}
						>
					</div>
				</div>
			</div>

			<div class="color-picker-fwl-inputs">
				<!-- Don't update .value if the user is focused on element, otherwise as they are typing it will keep
				reformatting what they type. On blur, request an update so the text is reformatted then instead. -->
				<div style="margin-bottom: 0.5rem;">
					<label for=${`color-picker-fwl-${this.#e}-hex`}>Hex</label>
					<input
						type="text"
						id=${`color-picker-fwl-${this.#e}-hex`}
						maxlength="9"
						.value=${document.activeElement===this.#n.value?L:n}
						@input=${this.#c}
						@blur=${()=>this.requestUpdate()}
						${G(this.#n)}
					>
				</div>

				${[`r`,`g`,`b`].map(e=>I`
					<div>
						<label for=${`color-picker-fwl-${this.#e}-${e}`}>${e.toUpperCase()}</label>
						<input
							type="number"
							id=${`color-picker-fwl-${this.#e}-${e}`}
							min="0"
							max="255"
							step="1"
							.value=${Math.round(t[e])}
							@input=${t=>this.#s(t,e)}
						>
					</div>
				`)}

				<div>
					<label for=${`color-picker-fwl-${this.#e}-a`}>A</label>
					<input
						type="number"
						id=${`color-picker-fwl-${this.#e}-a`}
						min="0"
						max="100"
						step="1"
						.value=${Math.round(e.a)}
						@input=${e=>this.#o(e,`a`)}
					>
				</div>
			</div>
		`}#i(e){let{body:t}=document;e.target.focus(),this.#a(e),t.addEventListener(`pointermove`,this.#a),t.addEventListener(`pointerup`,()=>{t.removeEventListener(`pointermove`,this.#a),this.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!1,composed:!0}))},{once:!0})}#a=e=>{if(!this.#r.value)return;e.preventDefault(),e.stopImmediatePropagation();let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.#r.value.getBoundingClientRect(),s=Math.max(Math.min(t-r,a),0),c=Math.max(Math.min(n-i,o),0),{h:l,a:u}=this._rawValue,d=100*s/a,f=100*(1-c/o);this.#l({h:l,s:d,v:f,a:u})};#o(e,t){e.preventDefault(),e.stopImmediatePropagation(),this.#l({...this._rawValue,[t]:+e.currentTarget.value})}#s(e,t){e.preventDefault(),e.stopImmediatePropagation();let n=et(this._rawValue);this.#l({...n,[t]:+e.currentTarget.value})}#c(e){let t=e.currentTarget.value,n=tt(t);n&&(this._rawValue=$e(n))}#l(e,t){t?.preventDefault(),t?.stopImmediatePropagation(),typeof e==`string`&&(e=tt(e)),`r`in e&&(e=$e(e)),this._rawValue=e,this.#t.setFormValue(JSON.stringify(this.value)),this.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!1,composed:!0}))}createRenderRoot(){return this}},customElements.get(`color-picker-fwl`)||customElements.define(qi,Ji)})),Xi=n((()=>{})),Zi,Qi,$i,ea,ta,na=n((()=>{H(),Pi(),_i(),pi(),zi(),Qe(),pt(),st(),Hi(),Gi(),Yi(),Xi(),Zi=`color-animation-editor-fwl`,Qi=e=>game.i18n.localize(e),$i=class extends Wi{static properties={value:{type:Object},_selectedKeyframeIndex:{state:!0}};static dropdownClasses=`color-animation-editor-dropdown-fwl`;static formAssociated=!0;#e;#t=W();constructor(){super(),this.#e=this.attachInternals(),this.value={duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.4,position:0},{color:255,alpha:.4,position:1}]},this._selectedKeyframeIndex=0}get name(){return this.getAttribute(`name`)}set name(e){this.setAttribute(`name`,e)}get form(){return this.#e.form}_renderButton(){return I`
			<div
				class="color-animation-editor-fwl-preview-bar"
				${Vi(this.value,`--current-color`)}
			></div>
		`}_renderDropdown(){let e=this.value.keyframes.map(({color:e,alpha:t,position:n})=>{let{r,g:i,b:a}=rt(e);return{r,g:i,b:a,alpha:t,position:n}}),t=e.map(e=>`rgb(${e.r} ${e.g} ${e.b} / ${Math.round(e.alpha*1e4)/100}%) ${Math.round(e.position*1e4)/100}%`).join(`, `),n=this.value.keyframes[this._selectedKeyframeIndex];return I`
			<div class="flexrow">
				<input
					type="number"
					min="1"
					step="1"
					.value=${this.value.duration}
					@input=${e=>this.#o({duration:+e.target.value})}
					@blur=${()=>this.#d()}
					style="margin-right: 0.5rem"
				>
				<span>ms</span>

				<button
					class=${q({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`linear`})}
					@click=${()=>this.#o({easingFunc:`linear`})}
					data-tooltip=${Qi(`GRIDAWAREAURAS.EasingLinear`)}
				>
					<svg viewBox="-10 -10 120 120">
						<path d="M0,100 L100,0" />
					</svg>
				</button>
				<button
					class=${q({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeInCubic`})}
					@click=${()=>this.#o({easingFunc:`easeInCubic`})}
					data-tooltip=${Qi(`GRIDAWAREAURAS.EasingEaseIn`)}
				>
					<svg viewBox="-10 -10 120 120">
						<path d="M0,100 C32,100 67,100 100,0" />
					</svg>
				</button>
				<button
					class=${q({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeOutCubic`})}
					@click=${()=>this.#o({easingFunc:`easeOutCubic`})}
					data-tooltip=${Qi(`GRIDAWAREAURAS.EasingEaseOut`)}
				>
					<svg viewBox="0 0 100 100">
						<path d="M 0,100 C 33,0 68,0 100,0" />
					</svg>
				</button>
				<button
					class=${q({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeInOutCubic`})}
					@click=${()=>this.#o({easingFunc:`easeInOutCubic`})}
					data-tooltip=${Qi(`GRIDAWAREAURAS.EasingEaseInOut`)}
				>
					<svg viewBox="-10 -10 120 120">
						<path d="M0,100 C65,100 35,0 100,0" />
					</svg>
				</button>
			</div>

			<p class="hint">Click to add a new keyframe. Right-click a keyframe to delete it.</p>

			<div class="color-animation-editor-fwl-preview">
				<div
					class="color-animation-editor-fwl-preview-track"
					style=${Li({"--gradient-stops":t})}
					@mousedown=${e=>this.#i(e)}
					${G(this.#t)}
				></div>

				<div
					class="color-animation-editor-fwl-preview-tracker"
					style=${ta(this.value)}
				></div>

				${e.map(({r:e,g:t,b:n,position:r},i)=>I`
					<div
						class=${q({"color-animation-editor-fwl-preview-thumb":!0,active:this._selectedKeyframeIndex===i})}
						style=${Li({left:`${r*100}%`,"--current-color-rgb":`${e} ${t} ${n}`})}
						@mousedown=${e=>this.#n(e,i)}
						@contextmenu=${()=>this.#a(i)}
					></div>
				`)}
			</div>

			<div class="color-animation-editor-fwl-preview-thumb-properties-track">
				<div
					class="color-animation-editor-fwl-preview-thumb-properties"
					${G(e=>this.#f(e))}
				>
					<input
						type="number"
						min="0"
						max="100"
						step="1"
						.value=${Math.round(n.position*100)}
						@input=${e=>this.#s({position:Math.min(Math.max(e.target.value/100,0),1)})}
						@blur=${()=>this.#d()}
					>
					<span>%</span>

					<!-- <button
						type="button"
						@click=${()=>this.#a(this._selectedKeyframeIndex)}
					>
						<i class="fas fa-trash m-0"></i>
					</button> -->
				</div>
			</div>

			<color-picker-fwl
				.value=${{...rt(n.color),a:n.alpha*255}}
				@input=${e=>this.#c(e.currentTarget.value)}
				@change=${()=>this.#d()}
			></color-picker-fwl>
		`}#n(e,t){e.preventDefault(),e.stopPropagation(),this._selectedKeyframeIndex=t,this.#l()}#r=e=>{let{x:t,width:n}=this.#t.value.getBoundingClientRect(),r=(e.clientX-t)/n;this.#s({position:Math.max(Math.min(r,1),0)})};#i(e){let t=e.offsetX/e.target.clientWidth,{color:n,alpha:r,insertIndex:i}=ft(this.value.keyframes,1,`linear`,t);this.#u({...this.value,keyframes:this.value.keyframes.toSpliced(i,0,{color:n,alpha:r,position:t})}),this.#d(),this._selectedKeyframeIndex=i,this.#l()}#a(e){typeof e!=`number`||this.value.keyframes.length<=1||(this.#u({...this.value,keyframes:this.value.keyframes.toSpliced(e,1)}),this.#d(),this._selectedKeyframeIndex=Math.max(e-1,0))}#o(e){this.#u({...this.value,...e})}#s(e){if(typeof this._selectedKeyframeIndex!=`number`)return;let t=[...this.value.keyframes],n=t[this._selectedKeyframeIndex];Object.assign(n,e),`position`in e&&(t.sort((e,t)=>e.position-t.position),this._selectedKeyframeIndex=t.indexOf(n)),this.#u({...this.value,keyframes:t})}#c({r:e,g:t,b:n,a:r}){let i=e<<16|t<<8|n;this.#s({color:i,alpha:r/255})}#l(){let{body:e}=document;e.addEventListener(`pointermove`,this.#r),e.addEventListener(`pointerup`,()=>{e.removeEventListener(`pointermove`,this.#r),this.#d()},{once:!0})}#u(e){this.value=e,this.#e.setFormValue(JSON.stringify(e)),this.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!1,composed:!0}))}#d(){this.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!1,composed:!0}))}#f(e){e&&Promise.resolve().then(()=>{let{width:t}=e.getBoundingClientRect(),n=this.value.keyframes[this._selectedKeyframeIndex];e.style.left=`min(max(calc(${n.position*100}% - ${t/2}px), 0px), calc(100% - ${t}px))`})}},customElements.get(Zi)||customElements.define(Zi,$i),ea=class extends si{#e;#t=null;render(e){this.#e=e,this.#t&&cancelAnimationFrame(this.#t),this.#t=requestAnimationFrame(this.#n)}reconnected(){this.#t&&cancelAnimationFrame(this.#t),this.#t=requestAnimationFrame(this.#n)}disconnected(){this.#t&&cancelAnimationFrame(this.#t),this.#t=null}#n=()=>{if(!this.isConnected||this.#e.duration<=0)return;let e=Date.now()/this.#e.duration%1,t=Ze[this.#e.easingFunc];this.setValue(`left: ${Math.round(t(e)*1e4)/100}%`),this.#t=requestAnimationFrame(this.#n)}},ta=Qr(ea)})),ra=n((()=>{})),ia,aa,X,oa=n((()=>{H(),hi(),ra(),ia=`context-menu-fwl`,X=class e extends V{static properties={items:{type:Array}};static active;_subMenu;#e;constructor(){super(),this.items=[],this._parentMenu=void 0,this._parentMenuItem=void 0}render(){return I`
			<menu class="dropdown-menu-fwl dropdown-menu-fwl-hover" @mousedown=${this.#n}>
				${this.items.map(this.#t)}
			</menu>
		`}#t=(e,t)=>{switch(e.type){case`separator`:return I`<li class="context-menu-fwl-separator"></li>`;default:return I`<li class="context-menu-fwl-item" data-item-index=${t}>
					${K(e.icon,()=>I`<i class=${e.icon}></i>`)}
					<span>${e.label}</span>
					${K(e.children?.length,()=>I`<i class="fas fa-caret-right"></i>`)}
				</li>`}};updated(){let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect();if(e+r>window.innerHeight){let t=this._parentMenuItem?.getBoundingClientRect()?.height??0;this.style.top=`${e-r+t}px`}if(t+n>window.innerWidth){let e=this._parentMenu?.getBoundingClientRect()?.width??0;this.style.left=`${t-n-e}px`}}connectedCallback(){if(super.connectedCallback(),!this._parentMenu){this.#e=new AbortController;let{signal:e}=this.#e;document.addEventListener(`mousedown`,this.#i,{signal:e}),document.addEventListener(`keydown`,this.#r,{signal:e})}}disconnectedCallback(){super.disconnectedCallback(),this.#e?.abort()}#n=t=>{let n=+t.target.closest(`[data-item-index]`)?.dataset.itemIndex;if(isNaN(n))return;let r=this.items[n];if(r.children?.length){this._subMenu?.close();let n=t.target.closest(`li`),{y:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect();this._subMenu=e.open({x:a+o,y:i},r.children,{parentMenu:this,parentMenuItem:n})}else r.onClick?.(),this.close()};#r=e=>{e.key===`Escape`&&this.close()};#i=e=>{setTimeout(()=>{this._isTargetInside(e.target)||this.close()},1)};close(){this.parentElement&&this.remove(),this._subMenu?.close(),this._parentMenu?._subMenu===this&&(this._parentMenu._subMenu=void 0)}_isTargetInside(e){return e===this||this.contains(e)||!!this._subMenu?._isTargetInside(e)}createRenderRoot(){return this}static open(e,t,{parentMenu:n,parentMenuItem:r}={}){aa||(aa=document.createElement(`div`),aa.id=`context-menu-fwl-container`,document.body.appendChild(aa));let i=e instanceof Event?{x:e.clientX,y:e.clientY}:e,a=document.createElement(ia);return a.items=t.filter(Boolean),a._parentMenu=n,a._parentMenuItem=r,a.style.left=`${i.x}px`,a.style.top=`${i.y}px`,aa.appendChild(a),a}},customElements.get(`context-menu-fwl`)||customElements.define(ia,X)})),sa,Z,ca,la=n((()=>{H(),_i(),pi(),hi(),wi(),b(),ji(),w(),Qe(),Ni(),na(),oa(),S(),{ApplicationV2:sa}=foundry.applications.api,Z=e=>game.i18n.localize(e),ca=class extends sa{#e;#t;#n;#r;#i;#a;#o;#s;#c;#l=0;#u=null;#d=null;#f=[{name:`Geometry`,icon:`far fa-hexagon`,template:()=>this.#p()},{name:Z(`GRIDAWAREAURAS.TabLines`),icon:`fas fa-paint-brush`,template:()=>this.#m()},{name:Z(`GRIDAWAREAURAS.TabFill`),icon:`fas fa-fill-drip`,template:()=>this.#h()},{name:Z(`GRIDAWAREAURAS.TabVisibility`),icon:`fas fa-eye-low-vision`,template:()=>this.#g()},{name:Z(`GRIDAWAREAURAS.TabEffects`),icon:`fas fa-stars`,template:()=>this.#_()},{name:Z(`GRIDAWAREAURAS.TabMacros`),icon:`fas fa-scroll`,template:()=>this.#y()},{name:`Code`,icon:`fas fa-code`,template:()=>this.#b()},{name:Z(`GRIDAWAREAURAS.TabSequencer`),icon:`fas fa-list-ol`,hidden:!ye(),template:()=>this.#T()},{name:Z(`GRIDAWAREAURAS.TabTerrainHeightTools`),icon:`fas fa-chart-simple`,hidden:!be(),template:()=>this.#D()}];constructor(e,{disabled:t=!1,onChange:n,onClose:r,parentId:i,attachTo:a,radiusContext:o,...s}={}){super(s),this.#e=foundry.utils.deepClone(e),this.#t=this.#M(e.ownerVisibility,e.nonOwnerVisibility),this.#n=t,this.#r=n,this.#i=r,this.#a=i,this.#o=a,this.#s=o??{},this.#c=o?.actor?vi(o):[...yi(CONFIG.Actor.dataModels,{prefix:`actor`}),...yi(CONFIG.Item.dataModels,{prefix:`item`})]}static DEFAULT_OPTIONS={tag:`form`,window:{contentClasses:[`sheet`,`standard-form`,`grid-aware-auras-aura-config`],icon:`far fa-hexagon`,title:`Aura Configuration`},position:{width:620,height:580}};get id(){return`gaa-aura-config-${this.#a?`-`+this.#a:``}${this.#e.id}`}_renderHTML(){return I`
			<div class="sheet-header form-group">
				<label style="flex: 0; margin-right: 1rem;">${Z(`Name`)}</label>
				<div class="form-fields">
					<input type="text" name="name" .value=${this.#e.name} ?disabled=${this.#n} required>
				</div>
			</div>

			<nav class="gaa-vertical-tabs">
				${this.#f.map((e,t)=>e.hidden?R:I`
					<a class=${q({active:this.#l===t})} @click=${()=>this.#O(t)}>
						<span class="gaa-vertical-tabs-icon"><i class=${e.icon}></i></span>
						<span>${e.name}</span>
					</a>
				`)}
			</nav>

			<div class="sheet-content">
				${this.#f[this.#l].template()??R}
			</div>

			<footer class="sheet-footer">
				<button type="button" @click=${()=>this.close()}>Close</button>
			</footer>

			${K(this.#u,()=>I`
				<div class="gaa-popover" @click=${e=>!e.target.closest(`.gaa-popover-content`)&&this.#K(null,{render:!0})}>
					<div class="gaa-popover-content">
						${this.#u}
					</div>
				</div>
			`)}
		`}#p=()=>{let e=typeof this.#e.radius!=`number`&&this.#e.radius?.length>0&&isNaN(parseInt(this.#e.radius))&&typeof Me(this.#e.radius,this.#s)!=`number`,t=this.#e.innerRadius!==``&&typeof Me(this.#e.innerRadius,this.#s)!=`number`;return I`
			<div class="standard-form">
				<div class="form-group">
					<label>Radius</label>
					<div class="form-fields">
						<gaa-data-path-autocomplete
							name="radius"
							value=${this.#e.radius}
							.dataPaths=${this.#c}
							?disabled=${this.#n}>
						</gaa-data-path-autocomplete>
					</div>
					<p class="hint">${Z(`GRIDAWAREAURAS.Radius.Hint`)}</p>
					${K(e,()=>I`
						<div class="hint" style="text-align: right; color: var(--color-level-error);">${Z(`GRIDAWAREAURAS.UnresolvedRadiusConfigDialogWarning`)}</div>
					`)}
				</div>

				<div class="form-group">
					<label>Inner Radius</label>
					<div class="form-fields">
						<gaa-data-path-autocomplete
							name="innerRadius"
							value=${this.#e.innerRadius}
							placeholder="None"
							.dataPaths=${this.#c}
							?disabled=${this.#n}
						></gaa-data-path-autocomplete>
					</div>
					<p class="hint">${Z(`GRIDAWAREAURAS.InnerRadius.Hint`)}</p>
					${K(t,()=>I`
						<div class="hint" style="text-align: right; color: var(--color-level-error);">${Z(`GRIDAWAREAURAS.UnresolvedRadiusConfigDialogWarning`)}</div>
					`)}
				</div>

				<div class="form-group">
					<label>Radius Offset <span class="units">(px)</span></label>
					<div class="form-fields">
						<input type="number" name="radiusOffset" .value=${this.#e.radiusOffset??0} required step="1" ?disabled=${this.#n}>
					</div>
				</div>

				<div class="form-group">
					<label>Position</label>
					<div class="form-fields">
						<select name="position" ?disabled=${this.#n}>
							${Y(ue,{selected:this.#e.position})}
						</select>
					</div>
					<p class="hint">${Z(`GRIDAWAREAURAS.Position.Hint`)}</p>
				</div>
			</div>
		`};#m=()=>{let e=this.#e.lineType===y.NONE,t=this.#e.lineType===y.DASHED;return I`
			<div class="standard-form">
				<div class="form-group">
					<label>${Z(`GRIDAWAREAURAS.LineType`)}</label>
					<div class="form-fields">
						<select name="lineType" ?disabled=${this.#n} data-dtype="Number">
							${Y(y,{selected:this.#e.lineType,labelSelector:([e])=>`GRIDAWAREAURAS.LineType${e.titleCase()}`,valueSelector:([,e])=>e})}
						</select>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:e})}>
					<label>${Z(`DRAWING.LineWidth`)} <span class="units">(px)</span></label>
					<div class="form-fields">
						<input type="number" name="lineWidth" .value=${this.#e.lineWidth} required min="0" step="1" ?disabled=${this.#n}>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:e||!!this.#e.lineColorAnimation})}>
					<label>${Z(`DRAWING.StrokeColor`)}</label>
					<div class="form-fields">
						<color-picker name="lineColor" .value=${this.#e.lineColor} ?disabled=${this.#n}></color-picker>
						<button
							type="button"
							data-tooltip="Enable animation"
							@click=${()=>this.#A(`lineColorAnimation`,Be())}
							?disabled=${this.#n}
						>
							<i class="fas fa-sparkles m-0"></i>
						</button>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:e||!!this.#e.lineColorAnimation})}>
					<label>${Z(`DRAWING.LineOpacity`)}</label>
					<div class="form-fields">
						<range-picker name="lineOpacity" .value=${this.#e.lineOpacity} min="0" max="1" step="0.1" ?disabled=${this.#n}></range-picker>
					</div>
				</div>

				${K(this.#e.lineColorAnimation&&!e,()=>I`
					<div class="form-group">
						<label>${Z(`DRAWING.StrokeColor`)}</label>
						<div class="form-fields">
							<color-animation-editor-fwl
								name="lineColorAnimation"
								.value=${this.#e.lineColorAnimation}
								?disabled=${this.#n}
							></color-animation-editor-fwl>
							<button
								type="button"
								class="gaa-btn-active"
								data-tooltip="Disable animation"
								@click=${()=>this.#A(`lineColorAnimation`,null)}
								?disabled=${this.#n}
							>
								<i class="fas fa-sparkles m-0"></i>
							</button>
						</div>
					</div>
				`)}

				<div class=${q({"form-group":!0,hidden:!t})}>
					<label>Dash Config <span class="units">(px)</span></label>
					<div class="form-fields">
						<input type="number" name="lineDashSize" placeholder="Dash" .value=${this.#e.lineDashSize} required min="0" step="1" ?disabled=${this.#n}>
						<input type="number" name="lineGapSize" placeholder="Gap" .value=${this.#e.lineGapSize} required min="0" step="1" ?disabled=${this.#n}>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:!t})}>
					<label>Dash Animation <span class="units">(px/s)</span></label>
					<div class="form-fields">
						<input type="number" name="lineDashOffsetAnimation" placeholder="Dash" .value=${this.#e.lineDashOffsetAnimation} required step="1" ?disabled=${this.#n}>
					</div>
				</div>

			</div>
		`};#h=()=>{let e=this.#e.fillType===CONST.DRAWING_FILL_TYPES.NONE,t=this.#e.fillType===CONST.DRAWING_FILL_TYPES.PATTERN;return I`
			<div class="standard-form">
				<div class="form-group">
					<label>${Z(`DRAWING.FillTypes`)}</label>
					<div class="form-fields">
						<select name="fillType" ?disabled=${this.#n} data-dtype="Number">
							${Y(CONST.DRAWING_FILL_TYPES,{selected:this.#e.fillType,labelSelector:([e])=>`DRAWING.FillType${e.titleCase()}`,valueSelector:([,e])=>e})}
						</select>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:e||!!this.#e.fillColorAnimation})}>
					<label>${Z(`DRAWING.FillColor`)}</label>
					<div class="form-fields">
						<color-picker name="fillColor" .value=${this.#e.fillColor} ?disabled=${this.#n}></color-picker>
						<button
							type="button"
							data-tooltip="Enable animation"
							@click=${()=>this.#A(`fillColorAnimation`,Ve())}
							?disabled=${this.#n}
						>
							<i class="fas fa-sparkles m-0"></i>
						</button>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:e||!!this.#e.fillColorAnimation})}>
					<label>${Z(`DRAWING.FillOpacity`)}</label>
					<div class="form-fields">
						<range-picker name="fillOpacity" .value=${this.#e.fillOpacity} min="0" max="1" step="0.1" ?disabled=${this.#n}></range-picker>
					</div>
				</div>

				${K(!e&&this.#e.fillColorAnimation,()=>I`
					<div class="form-group">
						<label>${Z(`DRAWING.FillColor`)}</label>
						<div class="form-fields">
							<color-animation-editor-fwl
								name="fillColorAnimation"
								.value=${this.#e.fillColorAnimation}
								?disabled=${this.#n}
							></color-animation-editor-fwl>
							<button
								type="button"
								class="gaa-btn-active"
								data-tooltip="Disable animation"
								@click=${()=>this.#A(`fillColorAnimation`,null)}
								?disabled=${this.#n}
							>
								<i class="fas fa-sparkles m-0"></i>
							</button>
						</div>
					</div>
				`)}

				<div class=${q({"form-group":!0,hidden:!t})}>
					<label>${Z(`DRAWING.FillTexture`)}</label>
					<div class="form-fields">
						<file-picker name="fillTexture" type="image" value=${this.#e.fillTexture} ?disabled=${this.#n}></file-picker>
					</div>
				</div>

				<div class=${q({"form-group":!0,hidden:!t||!!this.#e.fillTextureOffsetAnimation})}>
					<label>Texture Offset <span class="units">(px)</span></label>
					<div class="form-fields">
						<input type="number" name="fillTextureOffset.x" placeholder="x" .value=${this.#e.fillTextureOffset.x} required ?disabled=${this.#n}>
						<input type="number" name="fillTextureOffset.y" placeholder="y" .value=${this.#e.fillTextureOffset.y} required ?disabled=${this.#n}>
						<button
							type="button"
							data-tooltip="Enable animation"
							@click=${()=>this.#A(`fillTextureOffsetAnimation`,{x:0,y:0})}
							?disabled=${this.#n}
						>
							<i class="fas fa-sparkles m-0"></i>
						</button>
					</div>
				</div>

				${K(t&&this.#e.fillTextureOffsetAnimation,()=>I`
					<div class="form-group">
						<label>Texture Animation <span class="units">(px/s)</span></label>
						<div class="form-fields">
							<input type="number" name="fillTextureOffsetAnimation.x" placeholder="x" .value=${this.#e.fillTextureOffsetAnimation.x} required ?disabled=${this.#n}>
							<input type="number" name="fillTextureOffsetAnimation.y" placeholder="y" .value=${this.#e.fillTextureOffsetAnimation.y} required ?disabled=${this.#n}>
							<button
								type="button"
								class="gaa-btn-active"
								data-tooltip="Disable animation"
								@click=${()=>this.#A(`fillTextureOffsetAnimation`,null)}
								?disabled=${this.#n}
							>
								<i class="fas fa-sparkles m-0"></i>
							</button>
						</div>
					</div>
				`)}

				<div class=${q({"form-group":!0,hidden:!t})}>
					<label>Texture Scale <span class="units">(%)</span></label>
					<div class="form-fields">
						<input type="number" name="fillTextureScale.x" placeholder="x" .value=${this.#e.fillTextureScale.x} required ?disabled=${this.#n}>
						<input type="number" name="fillTextureScale.y" placeholder="y" .value=${this.#e.fillTextureScale.y} required ?disabled=${this.#n}>
					</div>
				</div>

			</div>
		`};#g=()=>I`
		<div class="standard-form">
			<div class="form-group slim">
				<label>
					<input type="checkbox" name="onlyEnabledInCombat" .checked=${this.#e.onlyEnabledInCombat??!1} ?disabled=${this.#n} style="margin-right: 0.25rem;">
					${Z(`GRIDAWAREAURAS.OnlyEnabledInCombat`)}
				</label>
			</div>

			<div class="form-group slim">
				<label>
					<input type="checkbox" name="unified" .checked=${this.#e.unified??!1} ?disabled=${this.#n} style="margin-right: 0.25rem;">
					Unified
				</label>
			</div>

			<div class="form-group slim">
				<label title="When Terrain Height Tools is active, cull aura cells whose line of sight from the source is blocked by terrain.">
					<input type="checkbox" name="elevationAware" .checked=${this.#e.elevationAware??!1} ?disabled=${this.#n} style="margin-right: 0.25rem;">
					Elevation Aware (THT)
				</label>
			</div>

			<div class="form-group">
				<label title="Extra movement cost added per grid cell entered while inside this aura. Read by Lancer Automations' ruler. 0 disables.">Movement Penalty (Lancer Automations) <span class="units">(grid units / cell)</span></label>
				<div class="form-fields">
					<input type="number" name="movementPenalty" .value=${this.#e.movementPenalty??0} required min="0" step="1" ?disabled=${this.#n||!game.modules.get(`lancer-automations`)?.active} data-dtype="Number">
				</div>
			</div>

			<div class="form-group">
				<label>${Z(`GRIDAWAREAURAS.KeyPressMode`)}</label>
				<div class="form-fields">
					<select name="keyPressMode" .value=${this.#e.keyPressMode??`DISABLED`} ?disabled=${this.#n}>
						<option value="DISABLED">${Z(`GRIDAWAREAURAS.KeyPressModeDisabled`)}</option>
						<option value="ONLY_WHEN_PRESSED">${Z(`GRIDAWAREAURAS.KeyPressModeOnlyWhenPressed`)}</option>
						<option value="ALSO_WHEN_PRESSED">${Z(`GRIDAWAREAURAS.KeyPressModeAlsoWhenPressed`)}</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label>Display Aura</label>
				<div class="form-fields">
					<select name="visibilityMode" ?disabled=${this.#n} @change=${this.#j}>
						${Y(ie,{selected:this.#t})}
					</select>
				</div>
			</div>

			<fieldset class=${q({disabled:this.#n,hidden:this.#t!==`CUSTOM`})} style="padding-block-end: 0;">
				<legend>Custom</legend>

				<p class="hint" style="margin-top: 0;">
					Specify under which states the aura should be visible to owners and non-owners.
					When multiple states are appliable, the aura is visible when ANY applicable state is checked.
				</p>

				<div class="visibility-grid">
					<div class="visibility-row">
						<span class="owner text-bold">Owner</span>
						<span class="nonowner text-bold">Non-owners</span>
					</div>

					<div class="visibility-row">
						<span class="title">Default</span>
						<p class="hint">When none of the below states are applicable.</p>
						<input type="checkbox" class="owner" name="ownerVisibility.default" .checked=${this.#e.ownerVisibility.default}>
						<input type="checkbox" class="nonowner" name="nonOwnerVisibility.default" .checked=${this.#e.nonOwnerVisibility.default}>
					</div>

					<div class="visibility-row">
						<span class="title">Hovered</span>
						<input type="checkbox" class="owner" name="ownerVisibility.hovered" .checked=${this.#e.ownerVisibility.hovered}>
						<input type="checkbox" class="nonowner" name="nonOwnerVisibility.hovered" .checked=${this.#e.nonOwnerVisibility.hovered}>
					</div>

					<div class="visibility-row">
						<span class="title">Controlled/Selected</span>
						<input type="checkbox" class="owner" name="ownerVisibility.controlled" .checked=${this.#e.ownerVisibility.controlled}>
						<input type="checkbox" class="nonowner" disabled>
					</div>

					<div class="visibility-row">
						<span class="title">Dragging</span>
						<input type="checkbox" class="owner" name="ownerVisibility.dragging" .checked=${this.#e.ownerVisibility.dragging}>
						<input type="checkbox" class="nonowner" disabled>
					</div>

					<div class="visibility-row">
						<span class="title">Targeted</span>
						<input type="checkbox" class="owner" name="ownerVisibility.targeted" .checked=${this.#e.ownerVisibility.targeted}>
						<input type="checkbox" class="nonowner" name="nonOwnerVisibility.targeted" .checked=${this.#e.nonOwnerVisibility.targeted}>
					</div>

					<div class="visibility-row">
						<span class="title">Combat Turn</span>
						<p class="hint">When the token has its turn in the combat tracker.</p>
						<input type="checkbox" class="owner" name="ownerVisibility.turn" .checked=${this.#e.ownerVisibility.turn}>
						<input type="checkbox" class="nonowner" name="nonOwnerVisibility.turn" .checked=${this.#e.nonOwnerVisibility.turn}>
					</div>
				</div>
			</fieldset>
		</div>
	`;#_=()=>{let e=game.settings.get(i,s),t=(e,t,n)=>X.open(e,[{label:`Edit`,icon:`fas fa-edit`,onClick:()=>this.#F(n)},{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>this.#P(t)},{label:`Delete`,icon:`fas fa-trash`,onClick:()=>this.#I(n)}]);return I`
			${K(!e,()=>I`
				<p class="alert" role="alert">Effect automation is not turned on for this world. GMs can configure this in the settings.</p>
			`)}

			${K(this.#e.effects.length,()=>I`<ul class="automated-item-list">
				${this.#e.effects.map((n,r)=>I`
					<li @contextmenu=${e=>t(e,n,r)}>
						<div class="flexcol">
							<span><strong>${Z(CONFIG.statusEffects.find(e=>e.id===n.effectId)?.name??`None`)}</strong></span>
							<span><em>${Z(ae[n.mode]??``)}</em></span>
						</div>
						${K(!this.#n&&e,()=>I`
							<a class="menu-button" @click=${e=>t(e,n,r)}>
								<i class="fas fa-ellipsis-vertical"></i>
							</a>
						`,()=>I`
							<a class="menu-button" @click=${()=>this.#F(r)}>
								<i class="fas fa-eye"></i>
							</a>
						`)}
					</li>
				`)}
			</ul>`)}

			${K(e&&this.#e.effects.length===0,()=>I`
				<p class="hint text-center">No automated effects configured.</p>
			`)}

			<div class="automated-item-list-create-button">
				<button @click=${this.#P} ?disabled=${this.#n||!e}>
					<i class="fas fa-plus"></i>
					Create Effect
				</button>
			</div>
		`};#v=e=>{let t=this.#e.effects[e];return I`
			<form class="standard-form" @submit=${t=>this.#N(t,this.#e.effects,e)}>
				<div class="form-group">
					<label>Effect</label>
					<div class="form-fields">
						<select name="effectId" ?disabled=${this.#n}>
							<option value="" hidden>-${Z(`None`)}-</option>
							${Y(CONFIG.statusEffects,{selected:t.effectId,labelSelector:`name`,valueSelector:`id`,sort:!0})}
						</select>
					</div>
				</div>

				<div class="form-group">
					<label>Overlay</label>
					<div class="form-fields">
						<input
							type="checkbox"
							name="isOverlay"
							.checked=${t.isOverlay??!1}
							?disabled=${this.#n}>
					</div>
				</div>

				<div class="form-group">
					<label>Target Tokens</label>
					<div class="form-fields">
						<select name="targetTokens" ?disabled=${this.#n}>
							${Y(Ti(),{selected:t.targetTokens})}
						</select>
					</div>
				</div>

				<div class="form-group">
					<label>Trigger</label>
					<div class="form-fields">
						<select name="mode" ?disabled=${this.#n}>
							${Y(ae,{selected:t.mode})}
						</select>
					</div>
				</div>

				<div class="form-group">
					<label>Priority</label>
					<div class="form-fields">
						<input
							type="number"
							name="priority"
							.value=${t?.priority??0}
							step="1"
							?disabled=${this.#n}>
					</div>
				</div>

				<div class="flexrow">
					${K(this.#n,()=>I`
						<button type="button" @click=${()=>this.#K(null,{render:!0})}>
							${Z(`Close`)}
						</button>
					`,()=>I`
						<button type="button" @click=${()=>this.#I(e)}>
							<i class="fas fa-trash"></i> ${Z(`Delete`)}
						</button>
						<button type="submit">
							<i class="fas fa-check"></i> ${Z(`Confirm`)}
						</button>
					`)}
				</div>
			</form>
		`};#y=()=>{let e=game.settings.get(i,c),t=this.#e.macros.map((e,t)=>({macro:e,idx:t})).filter(({macro:e})=>(e.actionType??`macro`)!==`code`),n=(e,t,n)=>X.open(e,[{label:`Edit`,icon:`fas fa-edit`,onClick:()=>this.#R(n)},{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>this.#L(t)},{label:`Delete`,icon:`fas fa-trash`,onClick:()=>this.#z(n)}]);return I`
			${K(!e,()=>I`
				<p class="alert" role="alert">Macro automation is not turned on for this world. GMs can configure this in the settings.</p>
			`)}

			${K(t.length,()=>I`<ul class="automated-item-list">
				${t.map(({macro:t,idx:r})=>I`
					<li @contextmenu=${e=>n(e,t,r)}>
						<div class="flexcol">
							<span><strong>${game.macros.get(t.macroId)?.name??Z(`None`)}</strong></span>
							<span><em>${Z(se[t.mode]??``)}</em></span>
						</div>
						${K(!this.#n&&e,()=>I`
							<a class="menu-button" @click=${e=>n(e,t,r)}>
								<i class="fas fa-ellipsis-vertical"></i>
							</a>
						`,()=>I`
							<a class="menu-button" @click=${()=>this.#R(r)}>
								<i class="fas fa-eye"></i>
							</a>
						`)}
					</li>
				`)}
			</ul>`)}

			${K(e&&t.length===0,()=>I`
				<p class="hint text-center">No macros configured.</p>
			`)}

			<div class="automated-item-list-create-button">
				<button @click=${this.#L} ?disabled=${this.#n||!e}>
					<i class="fas fa-plus"></i>
					Create Macro
				</button>
			</div>
		`};#b=()=>{let e=game.settings.get(i,c),t=this.#e.macros.map((e,t)=>({macro:e,idx:t})).filter(({macro:e})=>(e.actionType??`macro`)===`code`),n=(e,t,n)=>X.open(e,[{label:`Edit`,icon:`fas fa-edit`,onClick:()=>this.#R(n)},{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>this.#x(t)},{label:`Delete`,icon:`fas fa-trash`,onClick:()=>this.#z(n)}]);return I`
			${K(!e,()=>I`
				<p class="alert" role="alert">Macro automation is not turned on for this world. GMs can configure this in the settings.</p>
			`)}

			${K(t.length,()=>I`<ul class="automated-item-list">
				${t.map(({macro:t,idx:r})=>I`
					<li @contextmenu=${e=>n(e,t,r)}>
						<div class="flexcol">
							<span><strong>${t.code?.split(`
`)[0]?.trim().slice(0,50)||`(empty)`}</strong></span>
							<span><em>${Z(se[t.mode]??``)}</em></span>
						</div>
						${K(!this.#n&&e,()=>I`
							<a class="menu-button" @click=${e=>n(e,t,r)}>
								<i class="fas fa-ellipsis-vertical"></i>
							</a>
						`,()=>I`
							<a class="menu-button" @click=${()=>this.#R(r)}>
								<i class="fas fa-eye"></i>
							</a>
						`)}
					</li>
				`)}
			</ul>`)}

			${K(e&&t.length===0,()=>I`
				<p class="hint text-center">No code triggers configured.</p>
			`)}

			<div class="automated-item-list-create-button">
				<button @click=${()=>this.#x()} ?disabled=${this.#n||!e}>
					<i class="fas fa-plus"></i>
					Create Code Trigger
				</button>
			</div>
		`};#x=e=>{let t=foundry.utils.mergeObject(Ue(),e??{});t.actionType=`code`,this.#e.macros.push(t),this.#R(this.#e.macros.length-1)};#S=e=>{let t=this.#e.macros[e],n=t.actionType??`macro`,r=W();return n===`code`?I`
				<form class="gaa-code-form"
					@submit=${t=>{this.#d?.save(),this.#N(t,this.#e.macros,e),this.#w()}}>
					<label class="gaa-code-label">Code</label>
					<textarea name="code" class="gaa-macro-code" rows="20" ?disabled=${this.#n} ${G(e=>{e?this.#C(e):this.#w()})}>${t.code??``}</textarea>
					<p class="hint gaa-code-hint">Async function. Scope: <code>token, parent, aura, options, api</code>.</p>

					<div class="form-group">
						<label>Target Tokens</label>
						<div class="form-fields">
							<select name="targetTokens" ?disabled=${this.#n}>
								${Y(Ti(),{selected:t.targetTokens})}
							</select>
						</div>
					</div>

					<div class="form-group">
						<label>Trigger</label>
						<div class="form-fields">
							<select name="mode" ?disabled=${this.#n}>
								${Y(se,{selected:t.mode})}
							</select>
						</div>
					</div>

					<input type="hidden" name="actionType" value="code">

					<div class="flexrow gaa-code-buttons">
						${K(this.#n,()=>I`
							<button type="button" @click=${()=>{this.#w(),this.#K(null,{render:!0})}}>
								${Z(`Close`)}
							</button>
						`,()=>I`
							<button type="button" @click=${()=>{this.#w(),this.#z(e)}}>
								<i class="fas fa-trash"></i> ${Z(`Delete`)}
							</button>
							<button type="submit">
								<i class="fas fa-check"></i> ${Z(`Confirm`)}
							</button>
						`)}
					</div>
				</form>
			`:I`
			<form class="standard-form"
				@dragover=${this.#B}
				@drop=${this.#n?R:e=>this.#V(e,r)}
				@submit=${t=>this.#N(t,this.#e.macros,e)}>
				<div class="form-group">
					<label>Macro ID</label>
					<div class="form-fields flexcol">
						<input type="text" name="macroId" value=${t.macroId} ?disabled=${this.#n} ${G(r)}>
						<p class="hint">Enter a macro's ID, or drag and drop it onto the textbox.</p>
					</div>
				</div>

				<div class="form-group">
					<label>Target Tokens</label>
					<div class="form-fields">
						<select name="targetTokens" ?disabled=${this.#n}>
							${Y(Ti(),{selected:t.targetTokens})}
						</select>
					</div>
				</div>

				<div class="form-group">
					<label>Trigger</label>
					<div class="form-fields">
						<select name="mode" ?disabled=${this.#n}>
							${Y(se,{selected:t.mode})}
						</select>
					</div>
				</div>

				<input type="hidden" name="actionType" value="macro">

				<div class="flexrow">
					${K(this.#n,()=>I`
						<button type="button" @click=${()=>this.#K(null,{render:!0})}>
							${Z(`Close`)}
						</button>
					`,()=>I`
						<button type="button" @click=${()=>this.#z(e)}>
							<i class="fas fa-trash"></i> ${Z(`Delete`)}
						</button>
						<button type="submit">
							<i class="fas fa-check"></i> ${Z(`Confirm`)}
						</button>
					`)}
				</div>
			</form>
		`};#C(e){let t=globalThis.CodeMirror;if(!t||!e)return;this.#w(),this.#d=t.fromTextArea(e,{mode:`javascript`,theme:`monokai`,lineNumbers:!0,lineWrapping:!0,indentUnit:4,tabSize:4});let n=this.#d;requestAnimationFrame(()=>{try{n.refresh()}catch{}}),setTimeout(()=>{try{n.refresh()}catch{}},50)}#w(){if(this.#d){try{this.#d.save(),this.#d.toTextArea()}catch{}this.#d=null}}#T=()=>{let e=game.settings.get(`sequencer`,`permissions-effect-create`)===0,t=(e,t,n)=>X.open(e,[{label:`Edit`,icon:`fas fa-edit`,onClick:()=>this.#U(n)},{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>this.#H(t)},{label:`Delete`,icon:`fas fa-trash`,onClick:()=>this.#W(n)}]);return I`
			${K(!e,()=>I`
				<p class="alert" role="alert">Sequencer integration requires players to have permission to create effects. GMs can configure this in the Sequencer settings.</p>
			`)}

			${K(this.#e.sequencerEffects.length,()=>I`<ul class="automated-item-list">
				${this.#e.sequencerEffects.map((n,r)=>I`
					<li @contextmenu=${e=>t(e,n,r)}>
						<div class="flexcol">
							<span><strong>${n.effectPath?.length?n.effectPath:`- No effect selected -`}</strong></span>
							<span><em>${Z(ce[n.trigger]??``)}</em></span>
							<span><em>${Z(le[n.position]??``)}</em></span>
						</div>
						${K(!this.#n&&e,()=>I`
							<a class="menu-button" @click=${e=>t(e,n,r)}>
								<i class="fas fa-ellipsis-vertical"></i>
							</a>
						`,()=>I`
							<a class="menu-button" @click=${()=>this.#U(r)}>
								<i class="fas fa-eye"></i>
							</a>
						`)}
					</li>
				`)}
			</ul>`)}

			${K(e&&this.#e.sequencerEffects.length===0,()=>I`
				<p class="hint text-center">No sequencer effects configured.</p>
			`)}

			<div class="automated-item-list-create-button">
				<button @click=${this.#H} ?disabled=${this.#n||!e}>
					<i class="fas fa-plus"></i>
					Create Sequence
				</button>
			</div>
		`};#E=e=>{let t=this.#e.sequencerEffects[e];return I`
			<form class="flexcol" @submit=${t=>this.#N(t,this.#e.sequencerEffects,e)}>
				<div class="standard-form" style="flex: 1; overflow-y: scroll; padding-right: 1rem;">
					<input type="hidden" name="uId" value=${t.uId}>

					<div class="form-group">
						<label>Effect</label>
						<div class="form-fields">
							<input type="text" name="effectPath" value=${t.effectPath} ?disabled=${this.#n}>
							<button type="button" @click=${()=>Sequencer.DatabaseViewer.show()}>
								<i class="fas fa-database"></i>
							</button>
						</div>
						<p class="hint">The Sequencer file to play. Can be a filepath, wildcard filepath or database path.</p>
					</div>

					<div class="form-group">
						<label>Target Tokens</label>
						<div class="form-fields">
							<select name="targetTokens" ?disabled=${this.#n}>
								${Y(Ti(),{selected:t.targetTokens})}
							</select>
						</div>
					</div>

					<div class="form-group">
						<label>Trigger</label>
						<div class="form-fields">
							<select name="trigger" ?disabled=${this.#n}>
								${Y(ce,{selected:t.trigger})}
							</select>
						</div>
					</div>

					<div class="form-group">
						<label>Position</label>
						<div class="form-fields">
							<select name="position" ?disabled=${this.#n}>
								${Y(le,{selected:t.position})}
							</select>
						</div>
					</div>

					<hr/>

					<div class="form-group">
						<label>Repeats</label>
						<div class="form-fields">
							<label>Count</label>
							<input type="number" name="repeatCount" value=${t.repeatCount} min="1" ?disabled=${this.#n}>
							<label>Delay</label>
							<input type="number" name="repeatDelay" value=${t.repeatDelay} min="0" ?disabled=${this.#n}>
							<span class="units">ms</span>
						</div>
						<p class="hint">How many times the effect should play, and how long between repeats.</p>
					</div>

					<div class="form-group">
						<label>Start Delay</label>
						<div class="form-fields">
							<input type="number" name="delay" value=${t.delay} min="0" ?disabled=${this.#n}>
							<span class="units">ms</span>
						</div>
					</div>

					<div class="form-group">
						<label>Playback Rate</label>
						<div class="form-fields">
							<input type="number" name="playbackRate" value=${t.playbackRate} min="0.01" step="0.01" ?disabled=${this.#n}>
							<span class="units">x</span>
						</div>
					</div>

					<hr/>

					<div class="form-group">
						<label>Opacity</label>
						<div class="form-fields">
							<range-picker name="opacity" .value=${t.opacity} min="0" max="1" step="0.05" ?disabled=${this.#n}></range-picker>
						</div>
					</div>

					<div class="form-group">
						<label>Fade In</label>
						<div class="form-fields">
							<input type="number" name="fadeInDuration" value=${t.fadeInDuration} min="0" ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">ms</span>
							<select name="fadeInEasing" ?disabled=${this.#n}>
								${Y(Xe,{selected:t.fadeInEasing,labelSelector:([,e])=>`GRIDAWAREAURAS.${e}`})}
							</select>
						</div>
					</div>

					<div class="form-group">
						<label>Fade Out</label>
						<div class="form-fields">
							<input type="number" name="fadeOutDuration" value=${t.fadeOutDuration} min="0" ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">ms</span>
							<select name="fadeOutEasing" ?disabled=${this.#n}>
								${Y(Xe,{selected:t.fadeOutEasing,labelSelector:([,e])=>`GRIDAWAREAURAS.${e}`})}
							</select>
						</div>
					</div>

					<hr/>

					<div class="form-group">
						<label>Scale</label>
						<div class="form-fields">
							<input type="number" name="scale" value=${t.scale} min="0" step="0.01" ?disabled=${this.#n}>
							<span class="units">x</span>
						</div>
					</div>

					<div class="form-group">
						<label>Scale to Object</label>
						<div class="form-fields">
							<input type="checkbox" name="scaleToObject" ?checked=${t.scaleToObject} ?disabled=${this.#n}>
						</div>
					</div>

					<div class="form-group">
						<label>Scale In</label>
						<div class="form-fields">
							<input type="number" name="scaleInScale" value=${t.scaleInScale} ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">x</span>
							<input type="number" name="scaleInDuration" value=${t.scaleInDuration} min="0" step="0.01" ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">ms</span>
							<select name="scaleInEasing" style="flex: 2" ?disabled=${this.#n}>
								${Y(Xe,{selected:t.scaleInEasing,labelSelector:([,e])=>`GRIDAWAREAURAS.${e}`})}
							</select>
						</div>
					</div>

					<div class="form-group">
						<label>Scale Out</label>
						<div class="form-fields">
							<input type="number" name="scaleOutScale" value=${t.scaleOutScale} ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">x</span>
							<input type="number" name="scaleOutDuration" value=${t.scaleOutDuration} min="0" step="0.01" ?disabled=${this.#n}>
							<span class="units" style="margin-right: 0.75rem">ms</span>
							<select name="scaleOutEasing" style="flex: 2" ?disabled=${this.#n}>
								${Y(Xe,{selected:t.scaleOutEasing,labelSelector:([,e])=>`GRIDAWAREAURAS.${e}`})}
							</select>
						</div>
					</div>

					<hr/>

					<div class="form-group">
						<label>Below Tokens</label>
						<div class="form-fields">
							<input type="checkbox" name="belowTokens" ?checked=${t.belowTokens} ?disabled=${this.#n}>
						</div>
						<p class="hint">Note that auras render at the same Z-index as tokens, so this also draws the effect below auras.</p>
					</div>
				</div>

				<div class="flexrow" style="margin-top: 1rem">
					${K(this.#n,()=>I`
						<button type="button" @click=${()=>this.#K(null,{render:!0})}>
							${Z(`Close`)}
						</button>
					`,()=>I`
						<button type="button" @click=${()=>this.#W(e)}>
							<i class="fas fa-trash"></i> ${Z(`Delete`)}
						</button>
						<button type="submit">
							<i class="fas fa-check"></i> ${Z(`Confirm`)}
						</button>
					`)}
				</div>
			</form>
		`};#D=()=>I`
		<div class="standard-form">
			<div class="form-group slim">
				<label>
					<input type="checkbox" name="terrainHeightTools.onlyWhenAltPressed" .checked=${this.#e.terrainHeightTools?.onlyWhenAltPressed??!1} ?disabled=${this.#n} style="margin-right: 0.25rem;">
					${Z(`GRIDAWAREAURAS.ThtOnlyWhenAltPressed`)}
				</label>
				<label>
					<input type="checkbox" name="terrainHeightTools.onlyWhenTargeted" .checked=${this.#e.terrainHeightTools?.onlyWhenTargeted??!1} ?disabled=${this.#n} style="margin-right: 0.25rem;">
					Only When Targeted
				</label>
			</div>

			<div class="form-group">
				<label>Token Ruler on Drag</label>
				<div class="form-fields">
					<select name="terrainHeightTools.rulerOnDrag" ?disabled=${this.#n}>
						${Y(de,{selected:this.#e.terrainHeightTools.rulerOnDrag})}
					</select>
				</div>
			</div>

			<div class=${q({"form-group":!0,hidden:this.#e.terrainHeightTools.rulerOnDrag===`NONE`})}>
				<label>Target Tokens</label>
				<div class="form-fields">
					<select name="terrainHeightTools.targetTokens" ?disabled=${this.#n}>
						${Y(Ti(),{selected:this.#e.terrainHeightTools.targetTokens})}
					</select>
				</div>
			</div>

		</div>
	`;#O(e){this.#l=e,this.render()}#k=e=>{let t=e.target.name?.length?e.target.name:e.target.closest(`[name]`)?.name;if(!t?.length)return;let n=new FormDataExtended(e.currentTarget),r=foundry.utils.getProperty(n.object,t);foundry.utils.setProperty(this.#e,t,r),this.#G()};#A(e,t){foundry.utils.setProperty(this.#e,e,t),this.#G()}#j=e=>{let t=e.target.value;if(this.#t=t,t!==`CUSTOM`){let e=Ke[t];Object.entries(e.owner).forEach(([e,t])=>this.#e.ownerVisibility[e]=t),Object.entries(e.nonOwner).forEach(([e,t])=>this.#e.nonOwnerVisibility[e]=t),this.#r?.(this.#e)}this.render()};#M(e,t){for(let[n,r]of Object.entries(Ke))if(_e(e,r.owner)&&_e(t,r.nonOwner))return n;return`CUSTOM`}#N=(e,t,n)=>{e.preventDefault();let r=new FormDataExtended(e.currentTarget);Object.assign(t[n],r.object),this.#K(null),this.#G()};#P=e=>{this.#e.effects.push({...He(),...foundry.utils.deepClone(e)}),this.#K(this.#v(this.#e.effects.length-1),{title:`Edit Effect`}),this.#G()};#F=e=>{this.#K(this.#v(e),{title:`Edit Effect`,render:!0})};#I=e=>{this.#e.effects=this.#e.effects.filter((t,n)=>n!==e),this.#K(null),this.#G()};#L=e=>{this.#e.macros.push({...Ue(),...foundry.utils.deepClone(e)}),this.#K(this.#S(this.#e.macros.length-1),{title:`Edit Macro`}),this.#G()};#R=e=>{this.#K(this.#S(e),{title:`Edit Macro`,render:!0})};#z=e=>{this.#e.macros=this.#e.macros.filter((t,n)=>n!==e),this.#K(null),this.#G()};#B=e=>{game.settings.get(`grid-aware-auras`,`enableMacroAutomation`)&&e.preventDefault()};#V=async(e,t)=>{let n=await this.#q(e);n&&t.value&&(t.value.value=n.id)};#H=e=>{this.#e.sequencerEffects.push({...We(),...foundry.utils.deepClone(e)}),this.#U(this.#e.sequencerEffects.length-1),this.#G()};#U=e=>{this.#K(this.#E(e),{title:`Edit Sequencer Effect`,render:!0})};#W=e=>{this.#e.sequencerEffects=this.#e.sequencerEffects.filter((t,n)=>n!==e),this.#K(null),this.#G()};#G(){this.#r?.(this.#e),this.render()}#K(e,{title:t,render:n=!1}={}){this.#u=e,this.element.querySelector(`.window-title`).innerText=`Aura Configuration`+(t?.length?` :: ${t}`:``),n&&this.render()}_onFirstRender(...e){super._onFirstRender(...e),this.element.addEventListener(`input`,this.#k.bind(this)),this.#o&&(this.#o[this.id]=this)}_onClose(...e){super._onClose(...e),this.#o&&delete this.#o[this.id]}_replaceHTML(e,t){z(e,t)}async close(e){if(this.#u!==null){this.#K(null,{render:!0});return}e?.callOnClose!==!1&&this.#i?.(),await super.close(e)}_updateFrame(e){super._updateFrame(e);let t=game.i18n.localize(`GRIDAWAREAURAS.Aura`);z(I`
			<button type="button"
				class="header-control icon fas fa-passport"
				data-tooltip=${`${t}: ${this.#e.id}`} data-tooltip-direction="UP"
				@click=${e=>{e.preventDefault(),game.clipboard.copyPlainText(this.#e.id),ui.notifications.info(game.i18n.format(`DOCUMENT.IdCopiedClipboard`,{label:t,type:`id`,id:this.#e.id}))}}>
			</button>
		`,this.window.header,{renderBefore:this.window.controls})}async#q(e){if(!game.settings.get(`grid-aware-auras`,`enableMacroAutomation`))return null;try{let t=e.dataTransfer.getData(`text/plain`),n=JSON.parse(t);if(n.type!==`Macro`||!(`uuid`in n))return null;let r=await fromUuid(n.uuid);return r instanceof Macro?r:null}catch{return null}}}}));function ua(){return game.settings.get(i,l)}function da(){return ua().map(e=>({...ma(),...e,config:Fe(e.config)}))}async function fa(e){await game.settings.set(i,l,e)}async function pa(e){let t=ua(),n={...ma(),config:e};await fa([...t,n]),ui.notifications.info(`Saved aura '${e.name}' as a new preset`)}var ma,ha=n((()=>{b(),w(),ma=()=>({applyToNew:[]})})),ga=n((()=>{})),_a,va,ya=n((()=>{H(),_i(),hi(),ga(),_a=`multi-select-fwl`,va=class extends V{static properties={items:{type:Array},value:{type:Array,reflect:!0},placeholder:{type:String},labelSelector:{type:String},valueSelector:{type:String},_isOpen:{state:!0}};static formAssociated=!0;#e=null;#t;constructor(){super(),this._internals=this.attachInternals(),this.items=[],this.value=[],this.placeholder=``,this._isOpen=!1,this.labelSelector=void 0,this.labelSelector=void 0}get#n(){if(!this.value?.length)return``;let e=this.items.map((e,t)=>({item:e,value:this.#u(e),index:t}));return this.value.map(t=>e.find(e=>e.value===t)).sort((e,t)=>e.index-t.index).map(e=>this.#l(e.item)).join(`, `)}render(){return I`
			<div class="multi-select-fwl-button" @mousedown=${()=>this._isOpen=!this._isOpen}>
				<div class="multi-select-fwl-button-label-container">
					${K(!this.value?.length,()=>I`
						<span class="multi-select-fwl-button-label-placeholder">${this.placeholder}</span>
					`,()=>I`
						<span class="multi-select-fwl-button-label-primary">${this.#n}</span>
						<span class="multi-select-fwl-button-label-alternate">${this.value.length} selected</span>
					`)}
				</div>
				<i class="fas fa-chevron-down"></i>
			</div>
		`}#r(){if(!this._isOpen){this.#e&&=(this.#e.remove(),null);return}this.#e||(this.#e=document.createElement(`div`),this.#e.classList.add(`multi-select-fwl-dropdown`),document.body.appendChild(this.#e));let e=new Set(this.value??[]);z(I`<menu class="dropdown-menu-fwl dropdown-menu-fwl-hover">
			${this.items.map(t=>I`
				<li
					class=${q({checked:e.has(this.#u(t))})}
					@click=${()=>this.#c(t)}>
					<i class="fas fa-check"></i>
					<span>${this.#l(t)}</span>
				</li>
			`)}
		</menu>`,this.#e)}connectedCallback(){super.connectedCallback(),this.hasAttribute(`tabindex`)||this.setAttribute(`tabindex`,0),this.#t=new AbortController;let{signal:e}=this.#t;document.addEventListener(`mousedown`,this.#o,{signal:e}),document.addEventListener(`keydown`,this.#s,{signal:e})}disconnectedCallback(){super.disconnectedCallback(),this.#t.abort(),this.#e?.remove(),this.#e=null}update(e){super.update(e),e.has(`_isOpen`)&&this.classList.toggle(`multi-select-fwl-open`,this._isOpen),this.#r()}updated(){this.#i(),this.#a()}#i(){let e=this.querySelector(`.multi-select-fwl-button-label-primary`),t=this.querySelector(`.multi-select-fwl-button-label-alternate`);if(!e||!t)return;let n=e.scrollWidth>e.clientWidth;e.style.opacity=+!n,t.style.opacity=+!!n}#a(){if(!this.#e)return;let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect(),{width:i,height:a}=this.#e.getBoundingClientRect();Object.assign(this.#e.style,{top:e+r+a>window.innerHeight?`${e-a}px`:`${e+r}px`,left:t+i>window.innerWidth?`${t+n-i}px`:`${t}px`,minWidth:`${n}px`})}#o=e=>{this._isOpen&&(e.target.closest(`.multi-select-fwl-dropdown`)===this.#e||e.target.closest(`multi-select-fwl`)===this||(this._isOpen=!1))};#s=e=>{this._isOpen&&e.key===`Escape`&&(this._isOpen=!1)};#c(e){let t=this.#u(e);this.value=this.value?.includes(t)?this.value.filter(e=>e!==t):[...this.value??[],t],this._internals.setFormValue(JSON.stringify(this.value)),this.dispatchEvent(new Event(`change`))}#l(e){switch(typeof this.labelSelector){case`function`:return this.labelSelector(e);case`string`:return e[this.labelSelector];default:return typeof e==`object`?e.label:e}}#u(e){switch(typeof this.valueSelector){case`function`:return this.valueSelector(e);case`string`:return e[this.valueSelector];default:return typeof e==`object`?e.value:e}}createRenderRoot(){return this}},customElements.get(`multi-select-fwl`)||customElements.define(_a,va)})),ba,xa,Sa=n((()=>{H(),hi(),b(),w(),ha(),st(),Hi(),oa(),ya(),la(),{ApplicationV2:ba}=foundry.applications.api,xa=class extends ba{static DEFAULT_OPTIONS={window:{contentClasses:[`sheet`,`standard-form`,`grid-aware-auras-preset-config`],icon:`far fa-cube`,title:`Aura Preset Manager`},position:{width:720,height:`auto`}};#e;#t=new Map;constructor(){super(),this.#e=da()}_renderHTML(){let e=Object.keys(game.model.Actor).filter(e=>e!==`base`).map(e=>({label:game.i18n.localize(`TYPES.Actor.${e}`),value:e}));return I`
			<table class="grid-aware-auras-table">
				<thead>
					<tr style="background: none">
						<th class="text-left">Name</th>
						<th class="text-center" style="width: 58px">Radius</th>
						<th class="text-center" style="width: 58px">Line</th>
						<th class="text-center" style="width: 58px">Fill</th>
						<th class="text-center" style="width: 190px">Auto-apply to <i class="fas fa-question-circle cursor-help" data-tooltip="Automatically apply this aura to newly created tokens of the selected actor types"></i></th>
						<th class="text-center" style="width: 45px">
							<a @click=${this.#n}>
								<i class="fas fa-plus"></i>
							</a>
						</th>
					</tr>
				</thead>
				<tbody>
					${this.#e.map((t,n)=>I`
						<tr @contextmenu=${e=>this.#r(t,n,e)}>
							<td>
								<a data-tooltip="Enable/disable aura" style="width: 18px" @click=${()=>this.#s(t.config.id,!t.config.enabled)}>
									<i class=${`fas fa-toggle-${t.config.enabled?`on`:`off`}`}></i>
								</a>

								<a @click=${()=>this.#o(t.config)}>
									${t.config.name}
									${K(t.config.effects?.length||t.config.macros?.length||t.config.sequencerEffects?.length,()=>I`<i class="fas fa-bolt" data-tooltip="This aura applies effects or calls macros"></i>`)}
								</a>
							</td>
							<td class="text-center" style="width: 58px">
								${t.config.radius}
							</td>
							<td class="text-center" style="width: 58px">
								${K(t.config.lineType!==y.NONE,()=>K(t.config.lineColorAnimation,e=>I`<div class="gaa-color-block" ${Vi(e,`--color`)}></div>`,()=>I`<div class="gaa-color-block" style=${`--color: ${ot(t.config.lineColor,t.config.lineOpacity)}`}></div>`))}
							</td>
							<td class="text-center" style="width: 58px">
								${K(t.config.fillType!==CONST.DRAWING_FILL_TYPES.NONE,()=>K(t.config.fillColorAnimation,e=>I`<div class="gaa-color-block" ${Vi(e,`--color`)}></div>`,()=>I`<div class="gaa-color-block" style=${`--color: ${ot(t.config.fillColor,t.config.fillOpacity)}`}></div>`))}
							</td>
							<td>
								<multi-select-fwl
									.items=${e}
									placeholder="None"
									.value=${t.applyToNew}
									@change=${e=>this.#c(t.config.id,e)}
								></multi-select-fwl>
							</td>
							<td class="text-center" style="width: 45px">
								${K(!this.disabled,()=>I`
									<a @click=${e=>this.#r(t,n,e)} style="width: 100%; display: inline-block;">
										<i class="fas fa-ellipsis-vertical"></i>
									</a>
								`)}
							</td>
						</tr>
					`)}
				</tbody>
			</table>
			<p class="hint">Tip: You can also save existing auras as a preset.</p>

			<footer class="sheet-footer">
				<button @click=${this.#u}>Save Presets</button>
			</footer>
		`}_replaceHTML(e,t){z(e,t)}#n=e=>{X.open(e,[{label:`New`,icon:`fas fa-file`,onClick:()=>this.#i()},{label:`Import JSON`,icon:`fas fa-upload`,onClick:()=>this.#a()}])};#r=(e,t,n)=>{n.preventDefault(),n.stopPropagation(),X.open(n,[{label:`Edit`,icon:`fas fa-edit`,onClick:()=>this.#o(e.config)},t>0&&{label:`Move to Top`,icon:`fas fa-arrow-up-to-line`,onClick:()=>this.#l(t,0)},t>0&&{label:`Move Up`,icon:`fas fa-arrow-up`,onClick:()=>this.#l(t,t-1)},t<this.#e.length-1&&{label:`Move Down`,icon:`fas fa-arrow-down`,onClick:()=>this.#l(t,t+1)},t<this.#e.length-1&&{label:`Move to Bottom`,icon:`fas fa-arrow-down-to-line`,onClick:()=>this.#l(t,this.#e.length-1)},{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>{let t=Fe({...e.config,id:foundry.utils.randomID()});this.#o(t),this.#e=[...this.#e,{config:t}],this.render()}},{label:`Export JSON`,icon:`fas fa-download`,onClick:()=>Ie(e.config)},{label:`Delete`,icon:`fas fa-trash`,onClick:()=>{this.#e=this.#e.filter((e,n)=>n!==t),this.render()}}])};#i(){let e=Pe();this.#e=[...this.#e,{config:e}],this.render()}async#a(){let e=await Le();this.#e=[...this.#e,{config:e}],this.render()}#o(e){if(this.#t.has(e.id))return;let t=new ca(e,{onChange:t=>{this.#e=this.#e.map(n=>n.config.id===e.id?{...n,config:t}:n),this.render()},onClose:()=>this.#t.delete(e.id),parentId:this.id});this.#t.set(e.id,t),t.render(!0)}#s(e,t){this.#e=this.#e.map(n=>n.config.id===e?{...n,config:{...n.config,enabled:t}}:n),this.render()}#c(e,t){let n=t.target.value;this.#e=this.#e.map(t=>t.config.id===e?{...t,applyToNew:n}:t)}#l(e,t){let[n]=this.#e.splice(e,1);this.#e.splice(t,0,n),this.render()}#u=async()=>{await fa(this.#e),this.close()};_closeOpenDialogs(){for(let e of this.#t.values())e.close({callOnClose:!1})}async close(...e){return this._closeOpenDialogs(),await super.close(...e)}}})),Ca,wa,Ta=n((()=>{H(),hi(),la(),Sa(),b(),w(),ha(),st(),wt(),Hi(),oa(),Ca=`gaa-aura-table`,wa=class extends V{static properties={value:{attribute:`value`,type:Array,reflect:!0},disabled:{type:Boolean},showHeader:{type:Boolean},subHeadingText:{type:String},parentId:{type:String},attachConfigsTo:{attribute:!1},radiusContext:{attribute:!1}};static formAssociated=!0;#e;#t=new Map;constructor(){super(),this.#e=this.attachInternals(),this.value=[],this.disabled=!1,this.showHeader=!0,this.subHeadingText=void 0,this.parentId=void 0,this.attachConfigsTo=void 0,this.radiusContext={actor:void 0,item:void 0}}get form(){return this.#e.form}get name(){return this.getAttribute(`name`)}get type(){return this.localName}get canEditPresets(){return game.user.isGM}render(){let e=game.settings.get(i,s),t=game.settings.get(i,c);return I`
			<table class="grid-aware-auras-table">
				<thead>
					${K(this.showHeader,()=>I`
						<tr style="background: none">
							<th style="width: 24px">&nbsp;</th>
							<th class="text-left">${K(!this.subHeadingText?.length,()=>`Name`)}</th>
							<th class="text-center" style="width: 58px">Radius</th>
							<th class="text-center" style="width: 58px">Line</th>
							<th class="text-center" style="width: 58px">Fill</th>
							<th class="text-center" style="width: 45px">
								${K(!this.disabled,()=>I`
									<a data-action="create-aura" @click=${this.#r}>
										<i class="fas fa-plus"></i>
									</a>
								`)}
							</th>
						</tr>
					`)}

					${K(this.subHeadingText?.length,()=>I`
						<tr style="background: none">
							<th colspan="6">
								<div class="grid-aware-auras-table-item-header">
									<span>${this.subHeadingText}</span>
									<hr class="hr-narrow" />
								</div>
							</th>
						</tr>
					`)}
				</thead>
				<tbody>
					${this.value.map(n=>this.#n(n,e,t))}
				</tbody>
			</table>
		`}#n(e,t,n){let r=typeof e.radius!=`number`&&isNaN(parseInt(e.radius))&&e.radius.length,i=Me(e.radius,this.radiusContext);return I`
			<tr data-aura-id=${e.id} @contextmenu=${t=>this.#u(e,t)}>
				<td style="width: 44px; white-space: nowrap;">
					${this.disabled?I`<i class=${`fas fa-toggle-${e.enabled?`on`:`off`}`}></i>`:I`<a data-tooltip="Enable/disable aura (all clients)" @click=${()=>this.#c(e.id,!e.enabled)}>
							<i class=${`fas fa-toggle-${e.enabled?`on`:`off`}`}></i>
						</a>`}
					<a data-tooltip="Show/hide locally (this client only)" @click=${()=>this.#l(e)}>
						<i class=${`fas fa-${bt(e.id,e)?`eye-slash`:`eye`}`}></i>
					</a>
				</td>
				<td>
					<a @click=${()=>this.#s(e)}>
						${e.name}
						${K(t&&e.effects?.length||n&&e.macros?.length||e.sequencerEffects?.length,()=>I`<i class="fas fa-bolt" data-tooltip="This aura applies effects or calls macros"></i>`)}
					</a>
				</td>
				<td class="text-center" style="width: 58px">
					${i}
					${K(r&&typeof i!=`number`,()=>I`<i class="fas fa-warning cursor-help" data-tooltip=${game.i18n.format(`GRIDAWAREAURAS.UnresolvedRadiusTableWarning`,{path:`<code>${e.radius}</code>`})}></i>`)}
					${K(r&&typeof i==`number`,()=>I`<i class="fas fa-link cursor-help" data-tooltip=${e.radius}></i>`)}
				</td>
				<td class="text-center" style="width: 58px">
					${K(e.lineType!==y.NONE,()=>K(e.lineColorAnimation,e=>I`<div class="gaa-color-block" ${Vi(e,`--color`)}></div>`,()=>I`<div class="gaa-color-block" style=${`--color: ${ot(e.lineColor,e.lineOpacity)}`}></div>`))}
				</td>
				<td class="text-center" style="width: 58px">
					${K(e.fillType!==CONST.DRAWING_FILL_TYPES.NONE,()=>K(e.fillColorAnimation,e=>I`<div class="gaa-color-block" ${Vi(e,`--color`)}></div>`,()=>I`<div class="gaa-color-block" style=${`--color: ${ot(e.fillColor,e.fillOpacity)}`}></div>`))}
				</td>
				<td class="text-center" style="width: 45px">
					<a @click=${t=>this.#u(e,t)} style="width: 100%; display: inline-block;">
						<i class="fas fa-ellipsis-vertical"></i>
					</a>
				</td>
			</tr>
		`}updated(e){e.has(`value`)&&this.#e.setFormValue(JSON.stringify(this.value))}#r=e=>{let t=ua();X.open(e,[{label:`New`,icon:`fas fa-file`,onClick:()=>this.#i()},(t.length||this.canEditPresets)&&{label:`Add Preset`,icon:`far fa-cube`,children:[...t.map(e=>({label:e.config.name,onClick:()=>this.#a(e.config)})),...this.canEditPresets?[t.length&&{type:`separator`},{label:`Edit presets`,onClick:()=>new xa().render(!0)}]:[]]},{label:`Import JSON`,icon:`fas fa-upload`,onClick:()=>this.#o()}])};#i(){let e=Pe();this.value=[...this.value,e],this.#d(),this.#s(e)}#a(e){let t=Fe(e,{newId:!0});this.value=[...this.value,t],this.#d()}async#o(){let e=await Le();this.value=[...this.value,e],this.#d(),this.#s(e)}#s(e){if(this.#t.has(e.id))return;let t=new ca(e,{disabled:this.disabled,onChange:t=>{this.value=this.value.map(n=>n.id===e.id?{...n,...t}:n),this.#d()},onClose:()=>this.#t.delete(e.id),parentId:this.parentId,attachTo:this.attachConfigsTo,radiusContext:this.radiusContext});this.#t.set(e.id,t),t.render(!0)}#c(e,t){this.value=this.value.map(n=>n.id===e?{...n,enabled:t}:n),this.#d()}async#l(e){await St(e.id,e),this.requestUpdate()}#u(e,t){t.preventDefault(),t.stopPropagation(),X.open(t,[{label:this.disabled?`View`:`Edit`,icon:this.disabled?`fas fa-eye`:`fas fa-edit`,onClick:()=>this.#s(e)},!this.disabled&&!e.enabled&&{label:`Enable`,icon:`fas fa-toggle-on`,onClick:()=>this.#c(e.id,!0)},!this.disabled&&e.enabled&&{label:`Disable`,icon:`fas fa-toggle-off`,onClick:()=>this.#c(e.id,!1)},!this.disabled&&{label:`Duplicate`,icon:`fas fa-clone`,onClick:()=>{let t=Fe({...e,id:foundry.utils.randomID()});this.#s(t),this.value=[...this.value,t],this.#d()}},this.canEditPresets&&{label:`Save as Preset`,icon:`fas fa-floppy-disk`,onClick:()=>pa(e)},{label:`Export JSON`,icon:`fas fa-download`,onClick:()=>Ie(e)},!this.disabled&&{label:`Delete`,icon:`fas fa-trash`,onClick:()=>{this.value=this.value.filter(t=>t.id!==e.id),this.#d()}}])}#d(){this.#e.setFormValue(JSON.stringify(this.value));let e=new Event(`change`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}_closeOpenDialogs(){for(let e of this.#t.values())e.close({callOnClose:!1})}createRenderRoot(){return this}},customElements.define(Ca,wa)}));function Ea(e,t){e.document instanceof Item&&(e instanceof DocumentOwnershipConfig||t.unshift({label:`Auras`,class:`configure-auras`,icon:`far fa-hexagon`,[e instanceof Application?`onclick`:`onClick`]:t=>{t.preventDefault();let n=typeof e.isEditable==`boolean`?!e.isEditable:!1;new Oa(e.document,{disabled:n}).render(!0)}}))}var Da,Oa,ka=n((()=>{H(),pi(),hi(),Ta(),b(),w(),{ApplicationV2:Da}=foundry.applications.api,Oa=class e extends Da{#e;#t;#n=W();constructor(e,{disabled:t=!1,...n}={}){super(n),this.#e=e,this.#t=t,e.apps[this.appId]=this}static DEFAULT_OPTIONS={tag:`form`,window:{contentClasses:[`sheet`,`standard-form`],icon:`far fa-hexagon`},position:{width:500,height:`auto`},form:{closeOnSubmit:!0,handler:e.#r}};get id(){return`gaa-token-aura-config-${this.#e.id}`}get title(){return`Aura Configuration: ${this.#e.name}`}_renderHTML(){return I`
			<gaa-aura-table
				name="auras"
				.value=${C(this.#e)}
				.disabled=${this.#t}
				.parentId=${this.#e.id}
				.radiusContext=${je(this.#e.parent,this.#e)}
				${G(this.#n)}>
			</gaa-aura-table>

			${K(!this.#t,()=>I`
				<footer class="sheet-footer flexrow">
					<button type="submit">
						<i class="fas fa-save"></i>
						${game.i18n.localize(`Save Changes`)}
					</button>
				</footer>
			`)}
		`}static async#r(e,t,n){let{auras:r}=n.object;await this.#e.update({[`flags.${i}.${o}`]:r})}close(e={}){return this.#n.value?._closeOpenDialogs(),super.close(e)}_replaceHTML(e,t){z(e,t)}}})),Aa,ja,Ma=n((()=>{B(),ei(),Xr(),Aa=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},ja=Qr(class extends $r{constructor(e){if(super(e),e.type!==Zr.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Jr(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=U(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=U(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=U(i[d],a[m]),Gr(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=U(i[f],a[p]),Gr(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Aa(o,p,m),u=Aa(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Gr(e,i[d]);U(t,a[p]),c[p]=t}else c[p]=U(n,a[p]),Gr(e,i[d],n),i[t]=null;p++}else Yr(i[f]),f--;else Yr(i[d]),d++;for(;p<=m;){let t=Gr(e,c[m+1]);U(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Yr(e)}return this.ut=o,qr(e,c),L}})})),Na=n((()=>{Ma()}));async function Pa(e,...t){let n=await e(...t),r=()=>setTimeout(()=>{this._state===Application.RENDER_STATES.RENDERED&&this.setPosition()},0);n.find(`> nav.sheet-tabs`).append(`
		<a class="item" data-tab="gridawareauras"><i class="far fa-hexagon"></i> ${game.i18n.localize(`GRIDAWAREAURAS.Auras`)}</a>
	`);let i=this[Ra];i||(i=this[Ra]=document.createElement(La),i.tokenConfig=this,i.addEventListener(`requestresize`,r));let a=$(`<div class="tab" data-group="main" data-tab="gridawareauras"></div>`);return n.find(`> footer`).before(a),a.get(0).appendChild(i),r(),n}async function Fa(e,t){let n=t.querySelector(`[data-application-part='gridAwareAuras']`);if(!n){pe(`Failed to add Grid-Aware Aura config to token config sheet.`);return}let r=e[Ra];r||(r=e[Ra]=document.createElement(La),r.tokenConfig=e),n.replaceChildren(r)}function Ia(e){let t=e[Ra];t&&(delete e[Ra],t._closeOpenDialogs())}var La,Ra,za,Ba=n((()=>{H(),pi(),Na(),zi(),hi(),b(),w(),N(),S(),La=`gaa-token-aura-config`,Ra=Symbol(`auraTableElementRef`),za=class extends V{static properties={tokenConfig:{attribute:!1}};tokenConfig;#e=W();get appId(){return`${this.tokenConfig.appId}-gridawareauras`}get#t(){return game.release.generation===12?this.tokenConfig.preview:this.tokenConfig._preview}get actor(){return this.tokenConfig.actor}get token(){return this.tokenConfig.token}render(){let e=this.actor,t=C(this.#t??this.token),n=(e?.items??[]).map(e=>({item:e,auras:C(e)})).filter(({auras:e})=>e.length>0);return I`
			<gaa-aura-table
				name=${`flags.${i}.${o}`}
				.value=${t}
				subHeadingText="Token"
				@change=${e=>{this.#n(e),this.#i()}}
				.radiusContext=${je(e)}
				${G(this.#e)}
				style=${Li({display:`block`,marginTop:`0.5rem`,marginBottom:n.length?`0`:`0.5rem`})}
			></gaa-aura-table>

			${ja(n,({item:e})=>e.id,({item:t,auras:n})=>I`
				<gaa-aura-table
					.value=${n}
					.parentId=${t.id}
					.showHeader=${!1}
					.subHeadingText=${t.name}
					.attachConfigsTo=${t}
					.radiusContext=${je(e,t)}
					@change=${e=>this.#r(t,e.target.value)}
				></gaa-aura-table>
			`)}

			${K(n.length>0,()=>I`
				<hr class="hr-narrow" />
				<p><small>Note that changes made to auras on items are saved immediately (even if you do not click '${game.i18n.localize(`TOKEN.Update`)}' below).</small></p>
			`)}
		`}connectedCallback(){super.connectedCallback(),this.actor&&(this.actor.apps[this.appId]={render:()=>this.requestUpdate(),close:()=>{}})}disconnectedCallback(){super.disconnectedCallback(),this.actor&&delete this.actor.apps[this.appId]}#n(e){game.release.generation===12&&this.tokenConfig._onChangeInput(e)}async#r(e,t){await e.update({[`flags.${i}.${o}`]:t}),M.current&&this.#t?.object&&M.current._updateAuras({token:this.#t.object})}#i(){this.dispatchEvent(new Event(`requestresize`))}createRenderRoot(){return this}_closeOpenDialogs(){this.#e.value?._closeOpenDialogs()}},customElements.define(La,za)}));function Va(e,t,n,{hasEntered:r,isInit:i,isPreview:a,userId:o}){if(!game.settings.get(`grid-aware-auras`,`enableEffectAutomation`)||i||a||o!==game.userId||!n.effects?.length)return;let s=Ka(e,t,n.id);for(let i of n.effects){if(!i.effectId?.length||!J(e,t,n,i.targetTokens))continue;let a=s.get(i.effectId)?.[0],o=t=>ge(e.actor,i.effectId,t,{overlay:i.isOverlay},!0);switch(i.mode){case`APPLY_ON_ENTER`:case`REMOVE_ON_ENTER`:r&&!a&&o(i.mode===`APPLY_ON_ENTER`);break;case`APPLY_ON_LEAVE`:case`REMOVE_ON_LEAVE`:!r&&!a&&o(i.mode===`APPLY_ON_LEAVE`);break;case`APPLY_WHILE_INSIDE`:r&&(!a||a.priority<i.priority)?o(!0):!r&&(!a||a.mode===`REMOVE_WHILE_INSIDE`)?o(!1):a&&o(a.mode===`APPLY_WHILE_INSIDE`);break;case`REMOVE_WHILE_INSIDE`:r&&(!a||a.priority<i.priority)?o(!1):a&&o(a.mode===`APPLY_WHILE_INSIDE`);break}}}function Ha(e,t){Wa(e,t,!0)}function Ua(e,t){Wa(e,t,!1)}function Wa(e,t,n){if(!game.settings.get(`grid-aware-auras`,`enableEffectAutomation`)||t!==game.userId)return;let r=`APPLY_ON_OWNER_TURN_${n?`START`:`END`}`,i=`REMOVE_ON_OWNER_TURN_${n?`START`:`END`}`;for(let t of M.current._auraManager.getTokenAuras(e)){let n=t.config.effects.filter(e=>e.mode===r||e.mode===i);if(!(n.length<=0))for(let i of M.current._auraManager.getTokensInsideAura(e,t.config.id)){let a;for(let o of n)a??=Ka(i),!a.has(o.effectId)&&J(i,e,t.config,o.targetTokens)&&ge(i.actor,o.effectId,o.mode===r,{overlay:o.isOverlay},!0)}}let a=`APPLY_ON_TARGET_TURN_${n?`START`:`END`}`,o=`REMOVE_ON_TARGET_TURN_${n?`START`:`END`}`,s;for(let{parent:t,aura:n}of M.current._auraManager.getAurasContainingToken(e,{preview:!1})){let r=n.config.effects.filter(e=>e.mode===a||e.mode===o);if(!(r.length<=0))for(let i of r)s??=Ka(e),!s.has(i.effectId)&&J(e,t,n.config,i.targetTokens)&&ge(e.actor,i.effectId,i.mode===a,{overlay:i.isOverlay},!0)}}function Ga(e,t,n){if(!game.settings.get(`grid-aware-auras`,`enableEffectAutomation`)||n!==game.userId)return;let r=[];for(let{parent:n,aura:i}of M.current._auraManager.getAllAuras({preview:!1})){let a;r.push(...i.config.effects.filter(n=>!t&&n.mode===`APPLY_ON_ROUND_START`||!t&&n.mode===`REMOVE_ON_ROUND_START`||!e&&n.mode===`APPLY_ON_ROUND_END`||!e&&n.mode===`REMOVE_ON_ROUND_END`).map(e=>({parent:n,aura:i,effect:e,targetTokens:a??=M.current._auraManager.getTokensInsideAura(n,i.config.id)})))}r.sort((e,t)=>{let n=e.effect.mode===`APPLY_ON_ROUND_START`||e.effect.mode===`REMOVE_ON_ROUND_START`,r=t.effect.mode===`APPLY_ON_ROUND_START`||t.effect.mode===`REMOVE_ON_ROUND_START`;return n===r?e.effect.priority-t.effect.priority:r-+n});let i=new Map;for(let{parent:e,aura:t,effect:n,targetTokens:a}of r)for(let r of a){if(!J(r,e,t.config,n.targetTokens)||he(i,r,()=>Ka(r)).has(n.effectId))continue;let a=n.mode===`APPLY_ON_ROUND_START`||n.mode===`APPLY_ON_ROUND_END`;ge(r.actor,n.effectId,a,{overlay:n.isOverlay},!0)}}function Ka(e,t,n){return me(M.current._auraManager.getAurasContainingToken(e,{preview:!1}).filter(({parent:e,aura:r})=>e!==t||r.config.id!==n).flatMap(({parent:t,aura:n})=>n.config.effects.filter(r=>oe.includes(r.mode)&&J(e,t,n,r.targetTokens))).sort((e,t)=>t.priority-e.priority),e=>e.effectId)}var qa=n((()=>{b(),ji(),N(),S()}));function Ja(e){let t=Xa.get(e);if(t)return t;let n=new Za(`token`,`parent`,`aura`,`options`,`api`,`${e}\n//# sourceURL=modules/grid-aware-auras/dynamic/macro.js`);return Xa.set(e,n),n}async function Ya(e,t,n,r,i){if(e.code?.trim())try{await Ja(e.code)(t,n,r,i,game.modules.get(`grid-aware-auras`)?.api??null)}catch(e){console.warn(`[GAA] inline macro error`,e)}}var Xa,Za,Qa=n((()=>{Xa=new Map,Za=Object.getPrototypeOf(async function(){}).constructor}));function $a(e,t,n,r){if(!game.settings.get(`grid-aware-auras`,`enableMacroAutomation`))return;let{isPreview:i,hasEntered:a}=r;for(let o of n.macros)(!i&&o.mode===`ENTER_LEAVE`||!i&&o.mode===`ENTER`&&a||!i&&o.mode===`LEAVE`&&!a||i&&o.mode===`PREVIEW_ENTER_LEAVE`||i&&o.mode===`PREVIEW_ENTER`&&a||i&&o.mode===`PREVIEW_LEAVE`&&!a)&&oo(o,e,t,n,r)}function eo(e,t,n,r){for(let i of n.macros)i.mode===`TARGET_START_MOVE`&&oo(i,e,t,n,r)}function to(e,t,n,r){for(let i of n.macros)i.mode===`TARGET_END_MOVE`&&oo(i,e,t,n,r)}function no(e,t){io(e,t,!0)}function ro(e,t){io(e,t,!1)}function io(e,t,n){if(!game.settings.get(`grid-aware-auras`,`enableMacroAutomation`))return;let r=`OWNER_TURN_${n?`START`:`END`}`;for(let i of M.current._auraManager.getTokenAuras(e)){let a;for(let o of i.config.macros)if(!(o.mode!==`OWNER_TURN_START_END`&&o.mode!==r)){a??=M.current._auraManager.getTokensInsideAura(e,i.config.id).filter(e=>!e.isPreview);for(let e of a)oo(o,e,parent,i,{isTurnStart:n,userId:t})}}let i=`TARGET_TURN_${n?`START`:`END`}`;for(let{parent:r,aura:a}of M.current._auraManager.getAurasContainingToken(e,{preview:!1}))for(let o of a.config.macros)o.mode!==`TARGET_TURN_START_END`&&o.mode!==i||oo(o,e,r,a,{isTurnStart:n,userId:t})}function ao(e,t,n){if(!game.settings.get(`grid-aware-auras`,`enableMacroAutomation`))return;let r=[],i=[];for(let{parent:n,aura:a}of M.current._auraManager.getAllAuras({preview:!1})){let o;for(let s of a.config.macros)!e&&(s.mode===`ROUND_START_END`||s.mode===`ROUND_END`)&&(o??=M.current._auraManager.getTokensInsideAura(n,a.config.id).filter(e=>!e.isPreview),r.push({parent:n,aura:a,macro:s,targetTokens:o})),!t&&(s.mode===`ROUND_START_END`||s.mode===`ROUND_START`)&&(o??=M.current._auraManager.getTokensInsideAura(n,a.config.id).filter(e=>!e.isPreview),i.push({parent:n,aura:a,macro:s,targetTokens:o}))}for(let{parent:e,aura:t,macro:i,targetTokens:a}of r)for(let r of a)oo(i,r,e,t,{isRoundStart:!1,userId:n});for(let{parent:e,aura:t,macro:r,targetTokens:a}of i)for(let i of a)oo(r,i,e,t,{isRoundStart:!0,userId:n})}function oo(e,t,n,r,i){if(!J(t,n,r,e.targetTokens))return;if((e.actionType??`macro`)===`code`){Ya(e,t,n,r,i);return}let a=game.macros.get(e.macroId);a?.canExecute?a.execute({token:t,parent:n,aura:r,options:i}):a||pe(`Attempted to call macro with ID '${e.macroId}' due to ${e.mode} from aura '${r.name}' on token '${n.name}', but it could not be found.`)}var so=n((()=>{b(),ji(),N(),Qa(),S()}));function co(e,t,n,{hasEntered:r,isInit:a,isPreview:o}){if(o||!ye())return;let s=n.sequencerEffects.filter(r=>J(e,t,n,r.targetTokens));if(s.length===0)return;Promise.all([fo,mo]).then(()=>{if(r&&a)for(let e of s)lo(e)&&c(e);else if(r)for(let e of s)[`ON_ENTER`,`WHILE_INSIDE`].includes(e.trigger)&&c(e);else for(let r of s)switch(r.trigger){case`WHILE_INSIDE`:if(r.position===`ON_OWNER`){if(M.current._auraManager.getTokensInsideAura(t,n.id).some(i=>!i.isPreview&&i!==e&&J(i,t,n,r.targetTokens)))continue;Sequencer.EffectManager.endEffects({name:[i,t.id,n.id,r.uId].join(`_`)})}else Sequencer.EffectManager.endEffects({name:uo(e.id,t.id,n.id,r.uId)},!1);break;case`ON_LEAVE`:c(r)}});function c(r){let o=uo(e.id,t.id,n.id,r.uId),s=lo(r)&&r.position===`ON_OWNER`;s&&(o=[i,t.id,n.id,r.uId].join(`_`));let c=new Sequence,l=c.effect().name(o).file(r.effectPath).origin(t).attachTo([`ON_TARGET`,`TARGET_TO_OWNER`].includes(r.position)?e:t).delay(r.delay).opacity(Math.min(Math.max(r.opacity,0),1)).playbackRate(r.playbackRate).belowTokens(r.belowTokens===!0).tieToDocuments(t);r.position===`TARGET_TO_OWNER`?l.stretchTo(t,{attachTo:!0}):r.position===`OWNER_TO_TARGET`&&l.stretchTo(e,{attachTo:!0}),lo(r)?l.persist():l.repeats(r.repeatCount,r.repeatDelay),!a&&r.fadeInDuration>0&&l.fadeIn(r.fadeInDuration,{ease:r.fadeInEasing}),r.fadeOutDuration>0&&l.fadeOut(r.fadeOutDuration,{ease:r.fadeOutEasing}),r.scaleToObject?l.scaleToObject(r.scale,{uniform:!0}):l.scale(r.scale),!a&&r.scaleInDuration>0&&l.scaleIn(r.scaleInScale,r.scaleInDuration,{ease:r.scaleInEasing}),r.scaleOutDuration>0&&l.scaleOut(r.scaleOutScale,r.scaleOutDuration,{ease:r.scaleOutEasing}),s&&l.playIf(()=>ho.has(o)?!1:(ho.add(o),!0)),l.waitUntilFinished(),c.play({local:!0})}}function lo(e){return e.trigger===`WHILE_INSIDE`}function uo(e,t,n,r){return[i,t,e,n,r].join(`_`)}var fo,po,mo,ho,go=n((()=>{b(),ji(),N(),S(),fo=new Promise(e=>Hooks.on(`sequencer.ready`,()=>setTimeout(e,0))),po=()=>new Promise(e=>Hooks.once(`sequencerEffectManagerReady`,e)),mo=po(),Hooks.on(`canvasTearDown`,()=>mo=po()),ho=new Set,Hooks.on(`endedSequencerEffect`,({data:e})=>ho.delete(e.name))}));function _o(e,t,n,{hasEntered:r,userId:a}){if(a!==game.userId||n.terrainHeightTools.rulerOnDrag===`NONE`||!be()||(as(n.keyToPress??`AltLeft`),n.terrainHeightTools.onlyWhenAltPressed))return;let o=[i,t.document.uuid,n.id,e.document.uuid].join(`|`);r&&J(e,t,n,n.terrainHeightTools.targetTokens)?terrainHeightTools.drawLineOfSightRaysBetweenTokens(t,e,{group:o,drawForOthers:!1,includeEdges:n.terrainHeightTools.rulerOnDrag===`E2E`}):terrainHeightTools.clearLineOfSightRays({group:o})}var vo=n((()=>{b(),ji(),S(),ms()}));function yo(){return canvas?.terrainHeightLosRulerLayer??canvas?.terrainHeightLosRulerLayer$??canvas?.layers?.find?.(e=>e?.constructor?.name===`LineOfSightRulerLayer`)??null}function bo(){let e=yo();if(!e)return null;if((!Q||Q.destroyed)&&(Q=new PIXI.Graphics,Q.name=Vo),Q.parent!==e)try{Q.parent?.removeChild(Q)}catch{}return e.addChild(Q),Q}function xo(e){if(typeof e!=`string`)return 16777215;let t=/#?([0-9a-f]{6})/i.exec(e);return t?parseInt(t[1],16):16777215}function So(){try{return!!game.settings.get(i,Io)}catch{return!1}}function Co(){return Ho.some(e=>e?.[Lo])?!0:So()}function*wo(){if(!Co())return;let e=M.current?._auraManager;if(e?.getAllAuras)for(let{aura:t}of e.getAllAuras({preview:!1}))t?.isVisible&&typeof t.isWorldPointInside==`function`&&(yield t)}function To(e,t,n,r,i){let a=r-t,o=i-n,s=Math.hypot(a,o);if(s<1)return;let c=Math.max(2,Math.ceil(s/Bo)),l=[...wo()];if(l.length!==0)for(let s of l){let l=xo(s.config?.lineColor??`#ffffff`);e.lineStyle(Ro,l,zo);let u=!1,d=0,f=0;for(let r=0;r<=c;r++){let i=r/c,l=t+a*i,p=n+o*i,m=s.isWorldPointInside(l,p);m&&!u?(d=l,f=p,u=!0):!m&&u&&(e.moveTo(d,f),e.lineTo(l,p),u=!1)}u&&(e.moveTo(d,f),e.lineTo(r,i))}}function Eo(e){return e?e instanceof Token||e?.document?{x:e.x+(e.w??0)/2,y:e.y+(e.h??0)/2}:typeof e.x==`number`&&typeof e.y==`number`?{x:e.x,y:e.y}:null:null}function Do(e){return e instanceof Token||!!e?.document}function Oo(e,t,n){if(e?.includeEdges===!1||!Do(e?.a)||!Do(e?.b))return[{a:t,b:n}];let r=globalThis.terrainHeightTools?.calculateLineOfSightRaysBetweenTokens;if(typeof r==`function`)try{let{left:t,centre:n,right:i}=r(e.a,e.b);return[{a:n.p1,b:n.p2},{a:t.p1,b:t.p2},{a:i.p1,b:i.p2}]}catch{}let i=Math.min((e.a.w??0)/2,(e.b.w??0)/2);if(i<=0)return[{a:t,b:n}];let a=n.x-t.x,o=n.y-t.y,s=Math.hypot(a,o);if(s<1)return[{a:t,b:n}];let c=-o/s,l=a/s;return[{a:t,b:n},{a:{x:t.x+c*i,y:t.y+l*i},b:{x:n.x+c*i,y:n.y+l*i}},{a:{x:t.x-c*i,y:t.y-l*i},b:{x:n.x-c*i,y:n.y-l*i}}]}function ko(){let e=bo();if(e){e.clear();for(let t of Ho){let n=Eo(t?.a),r=Eo(t?.b);if(!(!n||!r))for(let i of Oo(t,n,r))To(e,i.a.x,i.a.y,i.b.x,i.b.y)}}}function Ao(e){Ho=Array.isArray(e)?e.slice():[],ko()}function jo(){Ho=[],bo()?.clear?.()}function Mo(){game.settings.settings.has(`grid-aware-auras.${Io}`)||game.settings.register(i,Io,{scope:`client`,config:!1,type:Boolean,default:!1,onChange:()=>ko()})}function No(e,t){e.style.cssText=`
		margin-top: 1.25rem; padding: 4px 8px;
		background: ${t?`var(--color-warm-2, rgba(255,100,0,0.18))`:`transparent`};
		border: 1px solid ${t?`var(--color-border-highlight, #ff6400)`:`var(--color-cool-4, #555)`};
		border-radius: 4px; cursor: pointer; opacity: ${t?`1`:`0.65`};
		line-height: 1;
	`}function Po(e,t){let n=t instanceof HTMLElement?t:t?.[0];if(!n||n.querySelector(`.gaa-include-auras`))return;let r=n.querySelector(`[name="rulerIncludeNoHeightTerrain"]`);if(!r)return;let a=document.createElement(`button`);a.type=`button`,a.className=`gaa-include-auras flex0`,a.dataset.tooltip=`Include auras on the LoS ruler`,a.innerHTML=`<i class="fa-solid fa-circle-dot"></i>`,No(a,So()),a.addEventListener(`click`,async()=>{let e=!So();await game.settings.set(i,Io,e),No(a,e)}),r.after(a)}function Fo(){be()&&(Mo(),Hooks.on(`renderLineOfSightRulerToolbar`,Po),Hooks.on(`renderTokenLineOfSightToolbar`,Po),Hooks.on(`canvasReady`,()=>{let e=yo();if(!e)return;let t=Object.getPrototypeOf(e);if(t._gaaWrapped)return;let n=t._drawLineOfSightRays,r=t._clearLineOfSightRays;typeof n==`function`&&(t._drawLineOfSightRays=function(e,...t){if(Array.isArray(e)&&So())for(let t of e)t&&typeof t==`object`&&(t[Lo]=!0);let r=n.call(this,e,...t);try{Ao(e)}catch(e){console.warn(`grid-aware-auras | THT ruler overlay draw failed`,e)}return r}),typeof r==`function`&&(t._clearLineOfSightRays=function(...e){let t=r.apply(this,e);try{jo()}catch(e){console.warn(`grid-aware-auras | THT ruler overlay clear failed`,e)}return t}),t._gaaWrapped=!0}),Hooks.on(`canvasTearDown`,()=>{Q=null,Ho=[]}),Hooks.on(`refreshToken`,()=>ko()))}var Io,Lo,Ro,zo,Bo,Vo,Q,Ho,Uo=n((()=>{N(),S(),b(),Io=`lineOfSightIncludeAuras`,Lo=`_gaaIncludeAuras`,Ro=4,zo=.75,Bo=10,Vo=`gaa-tht-ruler-overlay`,Q=null,Ho=[]}));function Wo(){Fo(),Hooks.on(v,(...e)=>{Va(...e),$a(...e),co(...e),_o(...e)}),Hooks.on(ee,(...e)=>{eo(...e)}),Hooks.on(_,(...e)=>{to(...e)}),Hooks.on(`updateCombat`,(e,t,n,r)=>{if(!(!e.previous||e.scene&&e.scene.id!==game.canvas.scene.id)){if(e.previous.combatantId!==e.current.combatantId&&e.previous.tokenId?.length){let t=game.canvas.tokens.get(e.previous.tokenId);t&&(Ua(t,r),ro(t,r))}if(e.previous.round!==e.current.round){let t=e.previous.round===0;Ga(t,!1,r),ao(t,!1,r)}if(e.previous.combatantId!==e.current.combatantId&&e.current.tokenId?.length){let t=game.canvas.tokens.get(e.current.tokenId);t&&(Ha(t,r),no(t,r))}}}),Hooks.on(`deleteCombat`,(e,t,n)=>{e.round>0&&(Ga(!1,!0,n),ao(!1,!0,n))})}var Go=n((()=>{b(),qa(),so(),go(),vo(),Uo()})),Ko,qo,Jo=n((()=>{H(),_i(),hi(),b(),{ApplicationV2:Ko}=foundry.applications.api,qo=class extends Ko{#e;constructor(e={}){super(e),this.#e=[...game.settings.get(`grid-aware-auras`,`customAuraTargetFilters`)??[]]}static DEFAULT_OPTIONS={id:`gaa-custom-aura-target-filter-config`,tag:`form`,window:{contentClasses:[`standard-form`],icon:`fas fa-filter`,title:`SETTINGS.CustomAuraTargetFilters.Name`,resizable:!0},position:{width:700,height:650}};_renderHTML(){let e=`https://github.com/Wibble199/FoundryVTT-Grid-Aware-Auras/blob/v${game.modules.get(`grid-aware-auras`).version}/docs/custom-aura-target-filters.md`;return I`
			<p style="margin: 0">
				${game.i18n.localize(`SETTINGS.CustomAuraTargetFilters.LongHint`)}
				<br/>
				<a href=${e} target="_blank">
					${game.i18n.localize(`SETTINGS.CustomAuraTargetFilters.LongHintLink`)}
					<i class="fas fa-external-link"></i>
				</a>
			</p>
			<div class="filter-list">
				${this.#e.map(e=>I`
					<div class="filter-item">
						<input class="name" type="text" placeholder="Name" .value=${e.name} @change=${t=>e.name=t.target.value} required>
						<div class=${q({body:!0,"is-invalid":e._error?.length})} @click=${this.#n}>
							<span>function (targetToken, sourceToken, aura) {</span>
							<textarea rows="1" @change=${t=>e.body=t.target.value} spellcheck="false">${e.body}</textarea>
							<span>}</span>
							${K(e._error?.length,()=>I`<p class="error">${e._error}</p>`)}
						</div>
						<a class="delete" @click=${this.#r(e.id)}><i class="fas fa-times"></i></a>
					</div>
				`)}
			</div>
			<footer class="form-footer">
				<button type="button" @click=${this.#t}>
					<i class="fas fa-plus"></i>
					Create New Filter
				</button>
				<button type="submit" @click=${this.#i}>
					<i class="fa-solid fa-save"></i>
					${game.i18n.localize(`Save Changes`)}
				</button>
			</footer>
		`}#t=()=>{this.#e.push({id:foundry.utils.randomID(),name:`New Filter`,body:``}),this.render()};#n=e=>{e.currentTarget.querySelector(`textarea`).focus()};#r(e){return()=>{this.#e=this.#e.filter(t=>t.id!==e),this.render()}}#i=async()=>{for(let e of this.#e)if(!e.body?.length)e._error=`Function body cannot be empty`;else try{Function(`targetToken`,`sourceToken`,`aura`,e.body),delete e._error}catch(t){e._error=t.message}if(this.#e.some(e=>e._error?.length)){await this.render();return}let e=this.#e.map(({id:e,name:t,body:n})=>({id:e,name:t,body:n}));await game.settings.set(i,d,e),await this.close()};_replaceHTML(e,t){z(e,t)}}}));function Yo(){game.settings.register(i,u,{name:`SETTINGS.SquareGridMode.Name`,hint:`SETTINGS.SquareGridMode.Hint`,scope:`world`,default:re.EQUIDISTANT,type:Number,choices:Object.fromEntries(Object.entries(re).map(([e,t])=>[t,`GRIDAWAREAURAS.SquareGridMode${e.titleCase()}`])),config:!0,onChange:()=>M.current?._updateAuras({force:!0})}),game.settings.register(i,s,{name:`SETTINGS.EnableEffectAutomation.Name`,hint:`SETTINGS.EnableEffectAutomation.Hint`,scope:`world`,default:!1,type:Boolean,config:!0}),game.settings.register(i,c,{name:`SETTINGS.EnableMacroAutomation.Name`,hint:`SETTINGS.EnableMacroAutomation.Hint`,scope:`world`,default:!1,type:Boolean,config:!0}),game.settings.register(i,f,{name:`Auras Ignore Lighting`,hint:`When on, auras render in the interface group, unlit by scene darkness.`,scope:`world`,default:!0,type:Boolean,config:!0,requiresReload:!0}),game.settings.register(i,p,{scope:`client`,config:!1,type:Object,default:{}}),game.settings.registerMenu(i,l,{name:`SETTINGS.Presets.Name`,hint:`SETTINGS.Presets.Hint`,label:`SETTINGS.Presets.Button`,icon:`far fa-cube`,type:xa,restricted:!0}),game.settings.register(i,l,{name:`SETTINGS.Presets.Name`,scope:`world`,default:[],type:Array,config:!1}),game.settings.registerMenu(i,d,{name:`SETTINGS.CustomAuraTargetFilters.Name`,hint:`SETTINGS.CustomAuraTargetFilters.Hint`,label:`SETTINGS.CustomAuraTargetFilters.Button`,icon:`fas fa-filter`,type:qo,restricted:!0}),game.settings.register(i,d,{name:`SETTINGS.CustomAuraTargetFilters.Name`,scope:`world`,default:[],type:Array,config:!1,onChange:()=>Oi()})}var Xo=n((()=>{Jo(),Sa(),b(),ji(),N()})),Zo=n((()=>{})),Qo=n((()=>{}));function $o(){Se(`lancer.actor_max_threat`,e=>e?.items?.reduce((e,t)=>{if(t.system.destroyed)return e;switch(t.type){case`mech_weapon`:return Math.max(e,es(t.system.active_profile.range,`Threat`,ts));case`npc_feature`:return t.system.type===`Weapon`?Math.max(e,es(t.system.range,`Threat`,ts)):e;case`pilot_weapon`:return Math.max(e,es(t.system.range,`Threat`,ts));default:return e}},-1)??-1,{description:`The largest/maximum weapon threat for the actor based on it's items. Returns -1 (which will disable the aura) if no items grant threat.`}),Se(`lancer.actor_max_range`,e=>e?.items?.reduce((e,t)=>{if(t.system.destroyed)return e;switch(t.type){case`mech_weapon`:return Math.max(e,es(t.system.active_profile.range,`Range`));case`npc_feature`:return t.system.type===`Weapon`?Math.max(e,es(t.system.range,`Range`)):e;case`pilot_weapon`:return Math.max(e,es(t.system.range,`Range`));default:return e}},-1)??-1,{description:`The largest/maximum weapon range for the actor based on it's items. Returns -1 (which will disable the aura) if no items have a range.`})}function es(e,t,n=-1){let r=+e?.find(e=>e.type===t)?.val;return Number.isNaN(r)?n:r}var ts,ns=n((()=>{ke(),ts=1}));function rs(){switch(game.system.id){case`lancer`:$o();break}}var is=n((()=>{ns()}));function as(e){let t=game.keyboard?.downKeys?.has(e)??!1;return t!==ps.get(e)&&ps.set(e,t),t}function os(e){let t=M.current;!t||!canvas?.tokens||canvas.tokens.placeables.some(n=>t._auraManager.getTokenAuras(n).some(t=>(t.config.keyPressMode??`DISABLED`)!==`DISABLED`&&(t.config.keyToPress??`AltLeft`)===e))&&t._updateAuraGraphics({updatePosition:!1,updateVisibility:!0})}function ss(){if(!game.modules||!be()||!M.current||!canvas.tokens)return;for(let e of fs)terrainHeightTools.clearLineOfSightRays({group:e});fs.clear();let e=canvas.tokens.controlled;if(e.length!==1)return;let t=e[0],n=t;if(canvas.tokens.preview?.children?.length>0){for(let e of canvas.tokens.preview.children)if(e.document?.id===t.document.id){n=e;break}}let r=M.current._auraManager.getTokenAuras(t),a=Array.from(game.user.targets).filter(e=>e.document.id!==t.document.id);for(let e of r){let r=e.config,o;if(o=a.length>0?a:r.terrainHeightTools?.onlyWhenTargeted?[]:canvas.tokens.placeables,o.length!==0&&r.terrainHeightTools?.onlyWhenAltPressed&&r.terrainHeightTools.rulerOnDrag!==`NONE`){if(r.onlyEnabledInCombat&&!game.combat)continue;if(as(r.keyToPress??`AltLeft`)&&t.controlled)for(let a of o){if(a.document.id===t.document.id)continue;let o=e.isInside(a,{sourceTokenPosition:n?.isPreview&&n.x!=null&&n.y!=null?{x:n.x,y:n.y}:void 0,useActualSourcePosition:n?.isPreview}),s=[i,t.document.uuid,r.id,a.document.uuid].join(`|`);o&&J(a,t,r,r.terrainHeightTools.targetTokens)&&(terrainHeightTools.drawLineOfSightRaysBetweenTokens(n,a,{group:s,drawForOthers:!1,includeEdges:r.terrainHeightTools.rulerOnDrag===`E2E`}),fs.add(s))}}}}function cs(e,t,n,r,i){let a=canvas.grid;if(!a?.getDirectPath||!a?.getCenterPoint)return[];let o=a.size,s=(e.document.width??1)*o,c=(e.document.height??1)*o,l={x:t.x+s/2,y:t.y+c/2},u={x:n.x+s/2,y:n.y+c/2},d;try{d=a.getDirectPath([l,u])??[]}catch{return[]}if(d.length<=2)return[];let f=new Set,p=(e,t)=>`${e.id}::${t.config.id}`;for(let e of r)f.add(p(e.parent,e.aura));for(let e of i)f.add(p(e.parent,e.aura));let m=canvas.tokens.placeables.flatMap(t=>t.id===e.id?[]:M.current._auraManager.getTokenAuras(t).map(e=>({parent:t,aura:e})));if(m.length===0)return[];let h=new Map,g=d.length-1;for(let t=1;t<g;t++){let n=a.getCenterPoint(d[t]),r={x:n.x-s/2,y:n.y-c/2};for(let{parent:t,aura:n}of m){let i=p(t,n);f.has(i)||h.has(i)||n.config?.enabled&&(n.config?.onlyEnabledInCombat&&!game.combat||n.isInside?.(e,{targetTokenPosition:r})&&h.set(i,{parent:t,aura:n}))}}return[...h.values()]}function ls(){let e=M.current;if(!(!e||!canvas?.tokens))for(let t of canvas.tokens.placeables)e._updateAuraGraphics({token:t})}var us,ds,fs,ps,ms=n((()=>{An(),ka(),Ba(),Go(),b(),ji(),ha(),N(),Xo(),Zo(),Qo(),is(),S(),us=[`x`,`y`,`width`,`height`,`hexagonalShape`,`flags.grid-aware-auras.auras`],ds=new Map,fs=new Set,ps=new Map,document.addEventListener(`keydown`,e=>{let t=ps.get(e.code);ps.set(e.code,!0),t||(ss(),os(e.code))}),document.addEventListener(`keyup`,e=>{let t=ps.get(e.code);ps.set(e.code,!1),t&&(ss(),os(e.code))}),Hooks.once(`init`,()=>{Yo(),Ei(),Wo(),rs();let e={};for(let[t,n]of Object.entries(CONFIG.Canvas.layers))t===`tokens`&&(e.gaaAuraLayer={group:`interface`,layerClass:M}),e[t]=n;e.gaaAuraLayer||={group:`interface`,layerClass:M},CONFIG.Canvas.layers=e,game.modules.get(`grid-aware-auras`).api={..._n}}),Hooks.once(`ready`,()=>{switch(game.release.generation){case 12:libWrapper.register(i,`TokenConfig.prototype._renderInner`,Pa,libWrapper.WRAPPER),Hooks.on(`closeTokenConfig`,Ia),Hooks.on(`getItemSheetHeaderButtons`,Ea);break;case 13:{let e=new Set,t=t=>{if(!(t.prototype instanceof foundry.applications.api.ApplicationV2)||e.has(t))return;t.TABS.sheet.tabs.push({id:`gridAwareAuras`,icon:`far fa-hexagon`});let n=t.PARTS.footer;delete t.PARTS.footer,t.PARTS.gridAwareAuras={template:`modules/${i}/templates/v13-token-config-tab.hbs`,scrollable:[]},t.PARTS.footer=n,e.add(t)};for(let e of Object.values(CONFIG.Token.sheetClasses))for(let n of Object.values(e))t(n.cls);t(CONFIG.Token.prototypeSheetClass),Hooks.on(`renderTokenConfig`,Fa),Hooks.on(`renderPrototypeTokenConfig`,Fa),Hooks.on(`closeTokenConfig`,Ia),Hooks.on(`getItemSheetHeaderButtons`,Ea),Hooks.on(`getHeaderControlsApplicationV2`,Ea);break}}game.socket.on(a,({func:e,runOn:t,...n})=>{if(!(t?.length>0&&t!==game.userId))switch(e){case ne:{let{actorUuid:e,effectId:t,state:r,effectOptions:i}=n;ge(e,t,r,i,!1);break}}})}),Hooks.on(`preCreateToken`,(e,t)=>{let n=t.flags?.[`grid-aware-auras`]?.auras??[],r=game.actors.get(t.actorId);if(!r)return;let a=da().filter(e=>e.applyToNew.includes(r.type));for(let e of a)n.some(t=>t.name.localeCompare(e.config.name,void 0,{sensitivity:`accent`})===0)||n.push(e.config);e.updateSource({[`flags.${i}.${o}`]:n})}),Hooks.on(`createToken`,(e,t,n)=>{let r=game.canvas.tokens.get(e.id);r&&M.current&&M.current._updateAuras({token:r,userId:n})}),Hooks.on(`canvasReady`,()=>{M.current?._updateAuraGraphics({updatePosition:!0,updateVisibility:!0})}),Hooks.on(`preUpdateToken`,(e,t)=>{if(!(`x`in t||`y`in t)){ds.delete(e.id);return}ds.set(e.id,{x:e.x,y:e.y})}),Hooks.on(`updateToken`,(e,t,n,r)=>{if(!M.current)return;let i=game.canvas.tokens.get(e.id);if(!i)return;let a=`x`in t||`y`in t,o=xe([`x`,`y`],e),s=a?M.current._auraManager.getAurasContainingToken(i):[];for(let e of s)Hooks.callAll(ee,i,e.parent,e.aura.config,{userId:r});let c=ds.get(e.id);ds.delete(e.id),Object.keys(foundry.utils.flattenObject(t)).some(e=>us.includes(e))&&M.current._updateAuras({token:i,tokenDelta:t,userId:r});let l=a?M.current._auraManager.getAurasContainingToken(i):[];for(let e of l){let t=s.some(t=>t.aura===e.aura&&t.parent===e.parent);Hooks.callAll(_,i,e.parent,e.aura.config,{startedInside:t,startPosition:o,userId:r})}if(a&&c){let t=cs(i,c,{x:e.x,y:e.y},s,l);for(let{parent:e,aura:n}of t)Hooks.callAll(v,i,e,n.config,{hasEntered:!0,isPreview:!1,isInit:!1,isTraversal:!0,userId:r}),Hooks.callAll(v,i,e,n.config,{hasEntered:!1,isPreview:!1,isInit:!1,isTraversal:!0,userId:r})}}),Hooks.on(`refreshToken`,(e,{refreshPosition:t,refreshVisibility:n})=>{(t||n)&&(e.isPreview?(M.current?._updateAuras({token:e}),M.current?._testCollisionsForToken(e,{useActualPosition:!0})):M.current?._updateAuraGraphics({token:e,updatePosition:!!t}),ss())}),Hooks.on(`hoverToken`,e=>{M.current?._updateAuraGraphics({token:e,updatePosition:!1})}),Hooks.on(`controlToken`,e=>{M.current?._updateAuraGraphics({token:e}),ss()}),Hooks.on(`targetToken`,(e,t)=>{M.current?._updateAuraGraphics({token:t})}),Hooks.on(`updateActor`,(e,t,n,r)=>{M.current?._updateActorAuras(e,{userId:r})}),Hooks.on(`createItem`,(e,t,n)=>{e.actor&&M.current?._updateActorAuras(e.actor,{userId:n})}),Hooks.on(`updateItem`,(e,t,n,r)=>{e.actor&&M.current?._updateActorAuras(e.actor,{userId:r})}),Hooks.on(`deleteItem`,(e,t,n)=>{e.actor&&M.current?._updateActorAuras(e.actor,{userId:n})}),Hooks.on(`updateCombat`,e=>{for(let t of e.combatants){let e=game.canvas.tokens.get(t.tokenId);M.current?._updateAuraGraphics({token:e})}}),Hooks.on(`combatStart`,ls),Hooks.on(`createCombat`,ls),Hooks.on(`deleteCombat`,ls),Hooks.on(`destroyToken`,e=>{M.current?._onDestroyToken(e)}),Hooks.on(`canvasTearDown`,()=>{M.current&&(M.current._isTearingDown=!0)}),Hooks.on(`terrain-height-tools.updateTerrain`,()=>{let e=(t=0)=>{let n=M.current;if(n&&n._auraManager){n._updateAuras({force:!0});return}t<10&&setTimeout(()=>e(t+1),50)};e()})}));return ms(),e.isKeyPressed=as,e})({});
//# sourceMappingURL=module.js.map