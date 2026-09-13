(function(){var e=Object.defineProperty,t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),n=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};let r=`terrain-height-tools`,i=`module.${r}`,a=`default`,o=`${r}.rulers`,s=`${r}.heightMap`,c=`${r}.updateTerrain`,l=`terrain-height-tools-editor`,u={paint:`paint`,erase:`erase`,lineOfSight:`terrainHeightToolsLineOfSight`,tokenLineOfSight:`terrainHeightToolsTokenLineOfSight`,convert:`convert`,terrainVisibility:`terrainVisibility`},d={gridCells:`gridCells`,rectangle:`rectangle`,ellipse:`ellipse`,customPoly:`customPoly`,fill:`fill`,pipette:`pipette`,deleteShape:`deleteShape`},f={defaultTokenLosTokenHeight:`defaultTokenLosTokenHeight`,displayLosMeasurementGm:`displayLosMeasurementGm`,displayLosMeasurementPlayer:`displayLosMeasurementPlayer`,otherUserLineOfSightRulerOpacity:`otherUserLineOfSightRulerOpacity`,paintToolbarUseHeightElevation:`paintToolbarUseHeightElevation`,showTerrainHeightOnTokenLayer:`showTerrainHeightOnTokenLayer`,showTerrainStackViewerOnTokenLayer:`showTerrainStackViewerOnTokenLayer`,showZonesAboveNonZones:`showZonesAboveNonZones`,smartLabelPlacement:`smartLabelPlacement`,terrainHeightLayerVisibilityRadius:`terrainHeightLayerVisibilityRadius`,terrainLayerAboveTilesDefault:`terrainLayerAboveTilesDefault`,terrainStackViewerDisplayMode:`terrainStackViewerDisplayMode`,terrainTypes:`terrainTypes`,tokenElevationChange:`tokenElevationChange`,tokenElevationChangeInsertClimbWaypoints:`tokenElevationChangeInsertClimbWaypoints`,tokenLosToolPreselectToken1:`tokenLosToolPreselectToken1`,tokenLosToolPreselectToken2:`tokenLosToolPreselectToken2`,toolbarAutofade:`toolbarAutofade`,toolbarPosition:`toolbarPosition`,useFractionsForLabels:`useFractionsForLabels`},p={decreaseLosRulerHeight:`decreaseLosRulerHeight`,increaseLosRulerHeight:`increaseLosRulerHeight`,showTerrainStack:`showTerrainStack`,toggleTerrainHeightMapOnTokenLayer:`toggleTerrainHeightMapOnTokenLayer`},m={heightData:`heightData`,invisibleTerrainTypes:`invisibleTerrainTypes`,terrainLayerAboveTiles:`terrainLayerAboveTiles`},h={ignoreAutoElevation:`ignoreAutoElevation`},g={terrainTypeId:`terrainTypeId`},_={drawLineOfSightRay:`drawLineOfSightRay`,clearLineOfSightRay:`clearLineOfSightRay`},v={additiveMerge:`TERRAINHEIGHTTOOLS.PaintMode.AdditiveMerge.Name`,destructiveMerge:`TERRAINHEIGHTTOOLS.PaintMode.DestructiveMerge.Name`,totalReplace:`TERRAINHEIGHTTOOLS.PaintMode.TotalReplace.Name`},y={1:`SETTINGS.DefaultTokenLosHeight.Choice.Top`,.5:`SETTINGS.DefaultTokenLosHeight.Choice.Middle`,0:`SETTINGS.DefaultTokenLosHeight.Choice.Bottom`},b={topCenter:`SETTINGS.TerrainHeightToolsToolbarPosition.Choice.TopCenter`,bottomCenter:`SETTINGS.TerrainHeightToolsToolbarPosition.Choice.BottomCenter`},x={auto:`SETTINGS.TerrainStackViewerDisplayMode.Choice.Auto`,proportional:`SETTINGS.TerrainStackViewerDisplayMode.Choice.Proportional`,compact:`SETTINGS.TerrainStackViewerDisplayMode.Choice.Compact`};var S=t(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self,n.polygonClipping=r())})(e,(function(){"use strict";
/**
* splaytree v3.1.2
* Fast Splay tree for Node and browser
*
* @author Alexander Milevski <info@w8r.name>
* @license MIT
* @preserve
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function e(e,t){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,i,a,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol==`function`&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return c([e,t])}}function c(o){if(r)throw TypeError(`Generator is already executing.`);for(;n;)try{if(r=1,i&&(a=o[0]&2?i.return:o[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,o[1])).done)return a;switch(i=0,a&&(o=[o[0]&2,a.value]),o[0]){case 0:case 1:a=o;break;case 4:return n.label++,{value:o[1],done:!1};case 5:n.label++,i=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if((a=n.trys,!(a=a.length>0&&a[a.length-1]))&&(o[0]===6||o[0]===2)){n=0;continue}if(o[0]===3&&(!a||o[1]>a[0]&&o[1]<a[3])){n.label=o[1];break}if(o[0]===6&&n.label<a[1]){n.label=a[1],a=o;break}if(a&&n.label<a[2]){n.label=a[2],n.ops.push(o);break}a[2]&&n.ops.pop(),n.trys.pop();continue}o=t.call(e,n)}catch(e){o=[6,e],i=0}finally{r=a=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}var t=function(){function e(e,t){this.next=null,this.key=e,this.data=t,this.left=null,this.right=null}return e}();function n(e,t){return e>t?1:e<t?-1:0}function r(e,n,r){for(var i=new t(null,null),a=i,o=i;;){var s=r(e,n.key);if(s<0){if(n.left===null)break;if(r(e,n.left.key)<0){var c=n.left;if(n.left=c.right,c.right=n,n=c,n.left===null)break}o.left=n,o=n,n=n.left}else if(s>0){if(n.right===null)break;if(r(e,n.right.key)>0){var c=n.right;if(n.right=c.left,c.left=n,n=c,n.right===null)break}a.right=n,a=n,n=n.right}else break}return a.right=n.left,o.left=n.right,n.left=i.right,n.right=i.left,n}function i(e,n,i,a){var o=new t(e,n);if(i===null)return o.left=o.right=null,o;i=r(e,i,a);var s=a(e,i.key);return s<0?(o.left=i.left,o.right=i,i.left=null):s>=0&&(o.right=i.right,o.left=i,i.right=null),o}function a(e,t,n){var i=null,a=null;if(t){t=r(e,t,n);var o=n(t.key,e);o===0?(i=t.left,a=t.right):o<0?(a=t.right,t.right=null,i=t):(i=t.left,t.left=null,a=t)}return{left:i,right:a}}function o(e,t,n){return t===null?e:e===null?t:(t=r(e.key,t,n),t.left=e,t)}function s(e,t,n,r,i){if(e){r(``+t+(n?`└── `:`├── `)+i(e)+`
`);var a=t+(n?`    `:`│   `);e.left&&s(e.left,a,!1,r,i),e.right&&s(e.right,a,!0,r,i)}}var c=function(){function c(e){e===void 0&&(e=n),this._root=null,this._size=0,this._comparator=e}return c.prototype.insert=function(e,t){return this._size++,this._root=i(e,t,this._root,this._comparator)},c.prototype.add=function(e,n){var i=new t(e,n);this._root===null&&(i.left=i.right=null,this._size++,this._root=i);var a=this._comparator,o=r(e,this._root,a),s=a(e,o.key);return s===0?this._root=o:(s<0?(i.left=o.left,i.right=o,o.left=null):s>0&&(i.right=o.right,i.left=o,o.right=null),this._size++,this._root=i),this._root},c.prototype.remove=function(e){this._root=this._remove(e,this._root,this._comparator)},c.prototype._remove=function(e,t,n){var i;return t===null?null:(t=r(e,t,n),n(e,t.key)===0?(t.left===null?i=t.right:(i=r(e,t.left,n),i.right=t.right),this._size--,i):t)},c.prototype.pop=function(){var e=this._root;if(e){for(;e.left;)e=e.left;return this._root=r(e.key,this._root,this._comparator),this._root=this._remove(e.key,this._root,this._comparator),{key:e.key,data:e.data}}return null},c.prototype.findStatic=function(e){for(var t=this._root,n=this._comparator;t;){var r=n(e,t.key);if(r===0)return t;t=r<0?t.left:t.right}return null},c.prototype.find=function(e){return this._root&&(this._root=r(e,this._root,this._comparator),this._comparator(e,this._root.key)!==0)?null:this._root},c.prototype.contains=function(e){for(var t=this._root,n=this._comparator;t;){var r=n(e,t.key);if(r===0)return!0;t=r<0?t.left:t.right}return!1},c.prototype.forEach=function(e,t){for(var n=this._root,r=[],i=!1;!i;)n===null?r.length===0?i=!0:(n=r.pop(),e.call(t,n),n=n.right):(r.push(n),n=n.left);return this},c.prototype.range=function(e,t,n,r){for(var i=[],a=this._comparator,o=this._root,s;i.length!==0||o;)if(o)i.push(o),o=o.left;else{if(o=i.pop(),s=a(o.key,t),s>0)break;if(a(o.key,e)>=0&&n.call(r,o))return this;o=o.right}return this},c.prototype.keys=function(){var e=[];return this.forEach(function(t){var n=t.key;return e.push(n)}),e},c.prototype.values=function(){var e=[];return this.forEach(function(t){var n=t.data;return e.push(n)}),e},c.prototype.min=function(){return this._root?this.minNode(this._root).key:null},c.prototype.max=function(){return this._root?this.maxNode(this._root).key:null},c.prototype.minNode=function(e){if(e===void 0&&(e=this._root),e)for(;e.left;)e=e.left;return e},c.prototype.maxNode=function(e){if(e===void 0&&(e=this._root),e)for(;e.right;)e=e.right;return e},c.prototype.at=function(e){for(var t=this._root,n=!1,r=0,i=[];!n;)if(t)i.push(t),t=t.left;else if(i.length>0){if(t=i.pop(),r===e)return t;r++,t=t.right}else n=!0;return null},c.prototype.next=function(e){var t=this._root,n=null;if(e.right){for(n=e.right;n.left;)n=n.left;return n}for(var r=this._comparator;t;){var i=r(e.key,t.key);if(i===0)break;i<0?(n=t,t=t.left):t=t.right}return n},c.prototype.prev=function(e){var t=this._root,n=null;if(e.left!==null){for(n=e.left;n.right;)n=n.right;return n}for(var r=this._comparator;t;){var i=r(e.key,t.key);if(i===0)break;i<0?t=t.left:(n=t,t=t.right)}return n},c.prototype.clear=function(){return this._root=null,this._size=0,this},c.prototype.toList=function(){return d(this._root)},c.prototype.load=function(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!1);var r=e.length,i=this._comparator;if(n&&m(e,t,0,r-1,i),this._root===null)this._root=l(e,t,0,r),this._size=r;else{var a=p(this.toList(),u(e,t),i);r=this._size+r,this._root=f({head:a},0,r)}return this},c.prototype.isEmpty=function(){return this._root===null},Object.defineProperty(c.prototype,`size`,{get:function(){return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,`root`,{get:function(){return this._root},enumerable:!0,configurable:!0}),c.prototype.toString=function(e){e===void 0&&(e=function(e){return String(e.key)});var t=[];return s(this._root,``,!0,function(e){return t.push(e)},e),t.join(``)},c.prototype.update=function(e,t,n){var r=this._comparator,s=a(e,this._root,r),c=s.left,l=s.right;r(e,t)<0?l=i(t,n,l,r):c=i(t,n,c,r),this._root=o(c,l,r)},c.prototype.split=function(e){return a(e,this._root,this._comparator)},c.prototype[Symbol.iterator]=function(){var t,n,r;return e(this,function(e){switch(e.label){case 0:t=this._root,n=[],r=!1,e.label=1;case 1:return r?[3,6]:t===null?[3,2]:(n.push(t),t=t.left,[3,5]);case 2:return n.length===0?[3,4]:(t=n.pop(),[4,t]);case 3:return e.sent(),t=t.right,[3,5];case 4:r=!0,e.label=5;case 5:return[3,1];case 6:return[2]}})},c}();function l(e,n,r,i){var a=i-r;if(a>0){var o=r+Math.floor(a/2),s=e[o],c=n[o],u=new t(s,c);return u.left=l(e,n,r,o),u.right=l(e,n,o+1,i),u}return null}function u(e,n){for(var r=new t(null,null),i=r,a=0;a<e.length;a++)i=i.next=new t(e[a],n[a]);return i.next=null,r.next}function d(e){for(var n=e,r=[],i=!1,a=new t(null,null),o=a;!i;)n?(r.push(n),n=n.left):r.length>0?(n=o=o.next=r.pop(),n=n.right):i=!0;return o.next=null,a.next}function f(e,t,n){var r=n-t;if(r>0){var i=t+Math.floor(r/2),a=f(e,t,i),o=e.head;return o.left=a,e.head=e.head.next,o.right=f(e,i+1,n),o}return null}function p(e,n,r){for(var i=new t(null,null),a=i,o=e,s=n;o!==null&&s!==null;)r(o.key,s.key)<0?(a.next=o,o=o.next):(a.next=s,s=s.next),a=a.next;return o===null?s!==null&&(a.next=s):a.next=o,i.next}function m(e,t,n,r,i){if(!(n>=r)){for(var a=e[n+r>>1],o=n-1,s=r+1;;){do o++;while(i(e[o],a)<0);do s--;while(i(e[s],a)>0);if(o>=s)break;var c=e[o];e[o]=e[s],e[s]=c,c=t[o],t[o]=t[s],t[s]=c}m(e,t,n,s,i),m(e,t,s+1,r,i)}}let h=(e,t)=>e.ll.x<=t.x&&t.x<=e.ur.x&&e.ll.y<=t.y&&t.y<=e.ur.y,g=(e,t)=>{if(t.ur.x<e.ll.x||e.ur.x<t.ll.x||t.ur.y<e.ll.y||e.ur.y<t.ll.y)return null;let n=e.ll.x<t.ll.x?t.ll.x:e.ll.x,r=e.ur.x<t.ur.x?e.ur.x:t.ur.x,i=e.ll.y<t.ll.y?t.ll.y:e.ll.y,a=e.ur.y<t.ur.y?e.ur.y:t.ur.y;return{ll:{x:n,y:i},ur:{x:r,y:a}}},_=2**-52;_===void 0&&(_=2**-52);let v=_*_,y=(e,t)=>{if(-_<e&&e<_&&-_<t&&t<_)return 0;let n=e-t;return n*n<v*e*t?0:e<t?-1:1};class b{constructor(){this.reset()}reset(){this.xRounder=new x,this.yRounder=new x}round(e,t){return{x:this.xRounder.round(e),y:this.yRounder.round(t)}}}class x{constructor(){this.tree=new c,this.round(0)}round(e){let t=this.tree.add(e),n=this.tree.prev(t);if(n!==null&&y(t.key,n.key)===0)return this.tree.remove(e),n.key;let r=this.tree.next(t);return r!==null&&y(t.key,r.key)===0?(this.tree.remove(e),r.key):e}}let S=new b,C=11102230246251565e-32,w=134217729;(3+8*C)*C;function ee(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(o=l+a,s=a-(o-l),l=t[++d]):(o=u+a,s=a-(o-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d]):(o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return(a!==0||p===0)&&(i[p++]=a),p}function te(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}function T(e){return new Float64Array(e)}(3+16*C)*C,(2+12*C)*C,(9+64*C)*C*C;let E=T(4),ne=T(8),re=T(12),ie=T(16),D=T(4);function O(e,t,n,r,i,a,o){let s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,T,O=e-i,k=n-i,A=t-a,j=r-a;b=O*j,f=w*O,p=f-(f-O),m=O-p,f=w*j,h=f-(f-j),g=j-h,x=m*g-(b-p*h-m*h-p*g),S=A*k,f=w*A,p=f-(f-A),m=A-p,f=w*k,h=f-(f-k),g=k-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,E[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,E[1]=y-(_+d)+(d-S),T=v+_,d=T-v,E[2]=v-(T-d)+(_-d),E[3]=T;let ae=te(4,E),oe=22204460492503146e-32*o;if(ae>=oe||-ae>=oe||(d=e-O,s=e-(O+d)+(d-i),d=n-k,l=n-(k+d)+(d-i),d=t-A,c=t-(A+d)+(d-a),d=r-j,u=r-(j+d)+(d-a),s===0&&c===0&&l===0&&u===0)||(oe=11093356479670487e-47*o+33306690738754706e-32*Math.abs(ae),ae+=O*u+j*s-(A*l+k*c),ae>=oe||-ae>=oe))return ae;b=s*j,f=w*s,p=f-(f-s),m=s-p,f=w*j,h=f-(f-j),g=j-h,x=m*g-(b-p*h-m*h-p*g),S=c*k,f=w*c,p=f-(f-c),m=c-p,f=w*k,h=f-(f-k),g=k-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,D[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,D[1]=y-(_+d)+(d-S),T=v+_,d=T-v,D[2]=v-(T-d)+(_-d),D[3]=T;let se=ee(4,E,4,D,ne);b=O*u,f=w*O,p=f-(f-O),m=O-p,f=w*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=A*l,f=w*A,p=f-(f-A),m=A-p,f=w*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,D[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,D[1]=y-(_+d)+(d-S),T=v+_,d=T-v,D[2]=v-(T-d)+(_-d),D[3]=T;let ce=ee(se,ne,4,D,re);return b=s*u,f=w*s,p=f-(f-s),m=s-p,f=w*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=c*l,f=w*c,p=f-(f-c),m=c-p,f=w*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,D[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,D[1]=y-(_+d)+(d-S),T=v+_,d=T-v,D[2]=v-(T-d)+(_-d),D[3]=T,ie[ee(ce,re,4,D,ie)-1]}function k(e,t,n,r,i,a){let o=(t-a)*(n-i),s=(e-i)*(r-a),c=o-s,l=Math.abs(o+s);return Math.abs(c)>=33306690738754716e-32*l?c:-O(e,t,n,r,i,a,l)}let A=(e,t)=>e.x*t.y-e.y*t.x,j=(e,t)=>e.x*t.x+e.y*t.y,ae=(e,t,n)=>{let r=k(e.x,e.y,t.x,t.y,n.x,n.y);return r>0?-1:+(r<0)},oe=e=>Math.sqrt(j(e,e)),se=(e,t,n)=>{let r={x:t.x-e.x,y:t.y-e.y},i={x:n.x-e.x,y:n.y-e.y};return A(i,r)/oe(i)/oe(r)},ce=(e,t,n)=>{let r={x:t.x-e.x,y:t.y-e.y},i={x:n.x-e.x,y:n.y-e.y};return j(i,r)/oe(i)/oe(r)},le=(e,t,n)=>t.y===0?null:{x:e.x+t.x/t.y*(n-e.y),y:n},ue=(e,t,n)=>t.x===0?null:{x:n,y:e.y+t.y/t.x*(n-e.x)},de=(e,t,n,r)=>{if(t.x===0)return ue(n,r,e.x);if(r.x===0)return ue(e,t,n.x);if(t.y===0)return le(n,r,e.y);if(r.y===0)return le(e,t,n.y);let i=A(t,r);if(i==0)return null;let a={x:n.x-e.x,y:n.y-e.y},o=A(a,t)/i,s=A(a,r)/i,c=e.x+s*t.x,l=n.x+o*r.x,u=e.y+s*t.y,d=n.y+o*r.y;return{x:(c+l)/2,y:(u+d)/2}};class fe{static compare(e,t){let n=fe.comparePoints(e.point,t.point);return n===0?(e.point!==t.point&&e.link(t),e.isLeft===t.isLeft?me.compare(e.segment,t.segment):e.isLeft?1:-1):n}static comparePoints(e,t){return e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:+(e.y>t.y)}constructor(e,t){e.events===void 0?e.events=[this]:e.events.push(this),this.point=e,this.isLeft=t}link(e){if(e.point===this.point)throw Error(`Tried to link already linked events`);let t=e.point.events;for(let e=0,n=t.length;e<n;e++){let n=t[e];this.point.events.push(n),n.point=this.point}this.checkForConsuming()}checkForConsuming(){let e=this.point.events.length;for(let t=0;t<e;t++){let n=this.point.events[t];if(n.segment.consumedBy===void 0)for(let r=t+1;r<e;r++){let e=this.point.events[r];e.consumedBy===void 0&&n.otherSE.point.events===e.otherSE.point.events&&n.segment.consume(e.segment)}}}getAvailableLinkedEvents(){let e=[];for(let t=0,n=this.point.events.length;t<n;t++){let n=this.point.events[t];n!==this&&!n.segment.ringOut&&n.segment.isInResult()&&e.push(n)}return e}getLeftmostComparator(e){let t=new Map,n=n=>{let r=n.otherSE;t.set(n,{sine:se(this.point,e.point,r.point),cosine:ce(this.point,e.point,r.point)})};return(e,r)=>{t.has(e)||n(e),t.has(r)||n(r);let{sine:i,cosine:a}=t.get(e),{sine:o,cosine:s}=t.get(r);return i>=0&&o>=0?a<s?1:a>s?-1:0:i<0&&o<0?a<s?-1:+(a>s):o<i?-1:+(o>i)}}}let pe=0;class me{static compare(e,t){let n=e.leftSE.point.x,r=t.leftSE.point.x,i=e.rightSE.point.x,a=t.rightSE.point.x;if(a<n)return 1;if(i<r)return-1;let o=e.leftSE.point.y,s=t.leftSE.point.y,c=e.rightSE.point.y,l=t.rightSE.point.y;if(n<r){if(s<o&&s<c)return 1;if(s>o&&s>c)return-1;let n=e.comparePoint(t.leftSE.point);if(n<0)return 1;if(n>0)return-1;let r=t.comparePoint(e.rightSE.point);return r===0?-1:r}if(n>r){if(o<s&&o<l)return-1;if(o>s&&o>l)return 1;let n=t.comparePoint(e.leftSE.point);if(n!==0)return n;let r=e.comparePoint(t.rightSE.point);return r<0?1:r>0?-1:1}if(o<s)return-1;if(o>s)return 1;if(i<a){let n=t.comparePoint(e.rightSE.point);if(n!==0)return n}if(i>a){let n=e.comparePoint(t.rightSE.point);if(n<0)return 1;if(n>0)return-1}if(i!==a){let e=c-o,t=i-n,u=l-s,d=a-r;if(e>t&&u<d)return 1;if(e<t&&u>d)return-1}return i>a?1:i<a||c<l?-1:c>l?1:e.id<t.id?-1:+(e.id>t.id)}constructor(e,t,n,r){this.id=++pe,this.leftSE=e,e.segment=this,e.otherSE=t,this.rightSE=t,t.segment=this,t.otherSE=e,this.rings=n,this.windings=r}static fromRing(e,t,n){let r,i,a,o=fe.comparePoints(e,t);if(o<0)r=e,i=t,a=1;else if(o>0)r=t,i=e,a=-1;else throw Error(`Tried to create degenerate segment at [${e.x}, ${e.y}]`);return new me(new fe(r,!0),new fe(i,!1),[n],[a])}replaceRightSE(e){this.rightSE=e,this.rightSE.segment=this,this.rightSE.otherSE=this.leftSE,this.leftSE.otherSE=this.rightSE}bbox(){let e=this.leftSE.point.y,t=this.rightSE.point.y;return{ll:{x:this.leftSE.point.x,y:e<t?e:t},ur:{x:this.rightSE.point.x,y:e>t?e:t}}}vector(){return{x:this.rightSE.point.x-this.leftSE.point.x,y:this.rightSE.point.y-this.leftSE.point.y}}isAnEndpoint(e){return e.x===this.leftSE.point.x&&e.y===this.leftSE.point.y||e.x===this.rightSE.point.x&&e.y===this.rightSE.point.y}comparePoint(e){if(this.isAnEndpoint(e))return 0;let t=this.leftSE.point,n=this.rightSE.point,r=this.vector();if(t.x===n.x)return e.x===t.x?0:e.x<t.x?1:-1;let i=(e.y-t.y)/r.y,a=t.x+i*r.x;if(e.x===a)return 0;let o=(e.x-t.x)/r.x,s=t.y+o*r.y;return e.y===s?0:e.y<s?-1:1}getIntersection(e){let t=this.bbox(),n=e.bbox(),r=g(t,n);if(r===null)return null;let i=this.leftSE.point,a=this.rightSE.point,o=e.leftSE.point,s=e.rightSE.point,c=h(t,o)&&this.comparePoint(o)===0,l=h(n,i)&&e.comparePoint(i)===0,u=h(t,s)&&this.comparePoint(s)===0,d=h(n,a)&&e.comparePoint(a)===0;if(l&&c)return d&&!u?a:!d&&u?s:null;if(l)return u&&i.x===s.x&&i.y===s.y?null:i;if(c)return d&&a.x===o.x&&a.y===o.y?null:o;if(d&&u)return null;if(d)return a;if(u)return s;let f=de(i,this.vector(),o,e.vector());return f===null||!h(r,f)?null:S.round(f.x,f.y)}split(e){let t=[],n=e.events!==void 0,r=new fe(e,!0),i=new fe(e,!1),a=this.rightSE;this.replaceRightSE(i),t.push(i),t.push(r);let o=new me(r,a,this.rings.slice(),this.windings.slice());return fe.comparePoints(o.leftSE.point,o.rightSE.point)>0&&o.swapEvents(),fe.comparePoints(this.leftSE.point,this.rightSE.point)>0&&this.swapEvents(),n&&(r.checkForConsuming(),i.checkForConsuming()),t}swapEvents(){let e=this.rightSE;this.rightSE=this.leftSE,this.leftSE=e,this.leftSE.isLeft=!0,this.rightSE.isLeft=!1;for(let e=0,t=this.windings.length;e<t;e++)this.windings[e]*=-1}consume(e){let t=this,n=e;for(;t.consumedBy;)t=t.consumedBy;for(;n.consumedBy;)n=n.consumedBy;let r=me.compare(t,n);if(r!==0){if(r>0){let e=t;t=n,n=e}if(t.prev===n){let e=t;t=n,n=e}for(let e=0,r=n.rings.length;e<r;e++){let r=n.rings[e],i=n.windings[e],a=t.rings.indexOf(r);a===-1?(t.rings.push(r),t.windings.push(i)):t.windings[a]+=i}n.rings=null,n.windings=null,n.consumedBy=t,n.leftSE.consumedBy=t.leftSE,n.rightSE.consumedBy=t.rightSE}}prevInResult(){return this._prevInResult===void 0&&(this.prev?this.prev.isInResult()?this._prevInResult=this.prev:this._prevInResult=this.prev.prevInResult():this._prevInResult=null),this._prevInResult}beforeState(){if(this._beforeState!==void 0)return this._beforeState;if(!this.prev)this._beforeState={rings:[],windings:[],multiPolys:[]};else{let e=this.prev.consumedBy||this.prev;this._beforeState=e.afterState()}return this._beforeState}afterState(){if(this._afterState!==void 0)return this._afterState;let e=this.beforeState();this._afterState={rings:e.rings.slice(0),windings:e.windings.slice(0),multiPolys:[]};let t=this._afterState.rings,n=this._afterState.windings,r=this._afterState.multiPolys;for(let e=0,r=this.rings.length;e<r;e++){let r=this.rings[e],i=this.windings[e],a=t.indexOf(r);a===-1?(t.push(r),n.push(i)):n[a]+=i}let i=[],a=[];for(let e=0,r=t.length;e<r;e++){if(n[e]===0)continue;let r=t[e],o=r.poly;if(a.indexOf(o)===-1)if(r.isExterior)i.push(o);else{a.indexOf(o)===-1&&a.push(o);let e=i.indexOf(r.poly);e!==-1&&i.splice(e,1)}}for(let e=0,t=i.length;e<t;e++){let t=i[e].multiPoly;r.indexOf(t)===-1&&r.push(t)}return this._afterState}isInResult(){if(this.consumedBy)return!1;if(this._isInResult!==void 0)return this._isInResult;let e=this.beforeState().multiPolys,t=this.afterState().multiPolys;switch(M.type){case`union`:{let n=e.length===0,r=t.length===0;this._isInResult=n!==r;break}case`intersection`:{let n,r;e.length<t.length?(n=e.length,r=t.length):(n=t.length,r=e.length),this._isInResult=r===M.numMultiPolys&&n<r;break}case`xor`:{let n=Math.abs(e.length-t.length);this._isInResult=n%2==1;break}case`difference`:{let n=e=>e.length===1&&e[0].isSubject;this._isInResult=n(e)!==n(t);break}default:throw Error(`Unrecognized operation type found ${M.type}`)}return this._isInResult}}class he{constructor(e,t,n){if(!Array.isArray(e)||e.length===0||(this.poly=t,this.isExterior=n,this.segments=[],typeof e[0][0]!=`number`||typeof e[0][1]!=`number`))throw Error(`Input geometry is not a valid Polygon or MultiPolygon`);let r=S.round(e[0][0],e[0][1]);this.bbox={ll:{x:r.x,y:r.y},ur:{x:r.x,y:r.y}};let i=r;for(let t=1,n=e.length;t<n;t++){if(typeof e[t][0]!=`number`||typeof e[t][1]!=`number`)throw Error(`Input geometry is not a valid Polygon or MultiPolygon`);let n=S.round(e[t][0],e[t][1]);n.x===i.x&&n.y===i.y||(this.segments.push(me.fromRing(i,n,this)),n.x<this.bbox.ll.x&&(this.bbox.ll.x=n.x),n.y<this.bbox.ll.y&&(this.bbox.ll.y=n.y),n.x>this.bbox.ur.x&&(this.bbox.ur.x=n.x),n.y>this.bbox.ur.y&&(this.bbox.ur.y=n.y),i=n)}(r.x!==i.x||r.y!==i.y)&&this.segments.push(me.fromRing(i,r,this))}getSweepEvents(){let e=[];for(let t=0,n=this.segments.length;t<n;t++){let n=this.segments[t];e.push(n.leftSE),e.push(n.rightSE)}return e}}class ge{constructor(e,t){if(!Array.isArray(e))throw Error(`Input geometry is not a valid Polygon or MultiPolygon`);this.exteriorRing=new he(e[0],this,!0),this.bbox={ll:{x:this.exteriorRing.bbox.ll.x,y:this.exteriorRing.bbox.ll.y},ur:{x:this.exteriorRing.bbox.ur.x,y:this.exteriorRing.bbox.ur.y}},this.interiorRings=[];for(let t=1,n=e.length;t<n;t++){let n=new he(e[t],this,!1);n.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=n.bbox.ll.x),n.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=n.bbox.ll.y),n.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=n.bbox.ur.x),n.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=n.bbox.ur.y),this.interiorRings.push(n)}this.multiPoly=t}getSweepEvents(){let e=this.exteriorRing.getSweepEvents();for(let t=0,n=this.interiorRings.length;t<n;t++){let n=this.interiorRings[t].getSweepEvents();for(let t=0,r=n.length;t<r;t++)e.push(n[t])}return e}}class _e{constructor(e,t){if(!Array.isArray(e))throw Error(`Input geometry is not a valid Polygon or MultiPolygon`);try{typeof e[0][0][0]==`number`&&(e=[e])}catch{}this.polys=[],this.bbox={ll:{x:1/0,y:1/0},ur:{x:-1/0,y:-1/0}};for(let t=0,n=e.length;t<n;t++){let n=new ge(e[t],this);n.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=n.bbox.ll.x),n.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=n.bbox.ll.y),n.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=n.bbox.ur.x),n.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=n.bbox.ur.y),this.polys.push(n)}this.isSubject=t}getSweepEvents(){let e=[];for(let t=0,n=this.polys.length;t<n;t++){let n=this.polys[t].getSweepEvents();for(let t=0,r=n.length;t<r;t++)e.push(n[t])}return e}}class ve{static factory(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];if(!r.isInResult()||r.ringOut)continue;let i=null,a=r.leftSE,o=r.rightSE,s=[a],c=a.point,l=[];for(;i=a,a=o,s.push(a),a.point!==c;)for(;;){let e=a.getAvailableLinkedEvents();if(e.length===0){let e=s[0].point,t=s[s.length-1].point;throw Error(`Unable to complete output ring starting at [${e.x}, ${e.y}]. Last matching segment found ends at [${t.x}, ${t.y}].`)}if(e.length===1){o=e[0].otherSE;break}let n=null;for(let e=0,t=l.length;e<t;e++)if(l[e].point===a.point){n=e;break}if(n!==null){let e=l.splice(n)[0],r=s.splice(e.index);r.unshift(r[0].otherSE),t.push(new ve(r.reverse()));continue}l.push({index:s.length,point:a.point});let r=a.getLeftmostComparator(i);o=e.sort(r)[0].otherSE;break}t.push(new ve(s))}return t}constructor(e){this.events=e;for(let t=0,n=e.length;t<n;t++)e[t].segment.ringOut=this;this.poly=null}getGeom(){let e=this.events[0].point,t=[e];for(let n=1,r=this.events.length-1;n<r;n++){let r=this.events[n].point,i=this.events[n+1].point;ae(r,e,i)!==0&&(t.push(r),e=r)}if(t.length===1)return null;let n=t[0],r=t[1];ae(n,e,r)===0&&t.shift(),t.push(t[0]);let i=this.isExteriorRing()?1:-1,a=this.isExteriorRing()?0:t.length-1,o=this.isExteriorRing()?t.length:-1,s=[];for(let e=a;e!=o;e+=i)s.push([t[e].x,t[e].y]);return s}isExteriorRing(){if(this._isExteriorRing===void 0){let e=this.enclosingRing();this._isExteriorRing=e?!e.isExteriorRing():!0}return this._isExteriorRing}enclosingRing(){return this._enclosingRing===void 0&&(this._enclosingRing=this._calcEnclosingRing()),this._enclosingRing}_calcEnclosingRing(){let e=this.events[0];for(let t=1,n=this.events.length;t<n;t++){let n=this.events[t];fe.compare(e,n)>0&&(e=n)}let t=e.segment.prevInResult(),n=t?t.prevInResult():null;for(;;){if(!t)return null;if(!n)return t.ringOut;if(n.ringOut!==t.ringOut)return n.ringOut.enclosingRing()===t.ringOut?t.ringOut.enclosingRing():t.ringOut;t=n.prevInResult(),n=t?t.prevInResult():null}}}class ye{constructor(e){this.exteriorRing=e,e.poly=this,this.interiorRings=[]}addInterior(e){this.interiorRings.push(e),e.poly=this}getGeom(){let e=[this.exteriorRing.getGeom()];if(e[0]===null)return null;for(let t=0,n=this.interiorRings.length;t<n;t++){let n=this.interiorRings[t].getGeom();n!==null&&e.push(n)}return e}}class be{constructor(e){this.rings=e,this.polys=this._composePolys(e)}getGeom(){let e=[];for(let t=0,n=this.polys.length;t<n;t++){let n=this.polys[t].getGeom();n!==null&&e.push(n)}return e}_composePolys(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];if(!r.poly)if(r.isExteriorRing())t.push(new ye(r));else{let e=r.enclosingRing();e.poly||t.push(new ye(e)),e.poly.addInterior(r)}}return t}}class xe{constructor(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:me.compare;this.queue=e,this.tree=new c(t),this.segments=[]}process(e){let t=e.segment,n=[];if(e.consumedBy)return e.isLeft?this.queue.remove(e.otherSE):this.tree.remove(t),n;let r=e.isLeft?this.tree.add(t):this.tree.find(t);if(!r)throw Error(`Unable to find segment #${t.id} [${t.leftSE.point.x}, ${t.leftSE.point.y}] -> [${t.rightSE.point.x}, ${t.rightSE.point.y}] in SweepLine tree.`);let i=r,a=r,o,s;for(;o===void 0;)i=this.tree.prev(i),i===null?o=null:i.key.consumedBy===void 0&&(o=i.key);for(;s===void 0;)a=this.tree.next(a),a===null?s=null:a.key.consumedBy===void 0&&(s=a.key);if(e.isLeft){let r=null;if(o){let e=o.getIntersection(t);if(e!==null&&(t.isAnEndpoint(e)||(r=e),!o.isAnEndpoint(e))){let t=this._splitSafely(o,e);for(let e=0,r=t.length;e<r;e++)n.push(t[e])}}let i=null;if(s){let e=s.getIntersection(t);if(e!==null&&(t.isAnEndpoint(e)||(i=e),!s.isAnEndpoint(e))){let t=this._splitSafely(s,e);for(let e=0,r=t.length;e<r;e++)n.push(t[e])}}if(r!==null||i!==null){let e=null;e=r===null?i:i===null||fe.comparePoints(r,i)<=0?r:i,this.queue.remove(t.rightSE),n.push(t.rightSE);let a=t.split(e);for(let e=0,t=a.length;e<t;e++)n.push(a[e])}n.length>0?(this.tree.remove(t),n.push(e)):(this.segments.push(t),t.prev=o)}else{if(o&&s){let e=o.getIntersection(s);if(e!==null){if(!o.isAnEndpoint(e)){let t=this._splitSafely(o,e);for(let e=0,r=t.length;e<r;e++)n.push(t[e])}if(!s.isAnEndpoint(e)){let t=this._splitSafely(s,e);for(let e=0,r=t.length;e<r;e++)n.push(t[e])}}}this.tree.remove(t)}return n}_splitSafely(e,t){this.tree.remove(e);let n=e.rightSE;this.queue.remove(n);let r=e.split(t);return r.push(n),e.consumedBy===void 0&&this.tree.add(e),r}}let Se=typeof process<`u`&&process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE||1e6,Ce=typeof process<`u`&&process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS||1e6;class we{run(e,t,n){M.type=e,S.reset();let r=[new _e(t,!0)];for(let e=0,t=n.length;e<t;e++)r.push(new _e(n[e],!1));if(M.numMultiPolys=r.length,M.type===`difference`){let e=r[0],t=1;for(;t<r.length;)g(r[t].bbox,e.bbox)===null?r.splice(t,1):t++}if(M.type===`intersection`)for(let e=0,t=r.length;e<t;e++){let t=r[e];for(let n=e+1,i=r.length;n<i;n++)if(g(t.bbox,r[n].bbox)===null)return[]}let i=new c(fe.compare);for(let e=0,t=r.length;e<t;e++){let t=r[e].getSweepEvents();for(let e=0,n=t.length;e<n;e++)if(i.insert(t[e]),i.size>Se)throw Error(`Infinite loop when putting segment endpoints in a priority queue (queue size too big).`)}let a=new xe(i),o=i.size,s=i.pop();for(;s;){let e=s.key;if(i.size===o){let t=e.segment;throw Error(`Unable to pop() ${e.isLeft?`left`:`right`} SweepEvent [${e.point.x}, ${e.point.y}] from segment #${t.id} [${t.leftSE.point.x}, ${t.leftSE.point.y}] -> [${t.rightSE.point.x}, ${t.rightSE.point.y}] from queue.`)}if(i.size>Se)throw Error(`Infinite loop when passing sweep line over endpoints (queue size too big).`);if(a.segments.length>Ce)throw Error(`Infinite loop when passing sweep line over endpoints (too many sweep line segments).`);let t=a.process(e);for(let e=0,n=t.length;e<n;e++){let n=t[e];n.consumedBy===void 0&&i.insert(n)}o=i.size,s=i.pop()}return S.reset(),new be(ve.factory(a.segments)).getGeom()}}let M=new we;return{union:function(e){var t=[...arguments].slice(1);return M.run(`union`,e,t)},intersection:function(e){var t=[...arguments].slice(1);return M.run(`intersection`,e,t)},xor:function(e){var t=[...arguments].slice(1);return M.run(`xor`,e,t)},difference:function(e){var t=[...arguments].slice(1);return M.run(`difference`,e,t)}}}))}))();
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let C=globalThis,w=C.ShadowRoot&&(C.ShadyCSS===void 0||C.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,ee=Symbol(),te=new WeakMap;var T=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(w&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=te.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&te.set(t,e))}return e}toString(){return this.cssText}};let E=e=>new T(typeof e==`string`?e:e+``,void 0,ee),ne=(e,t)=>{if(w)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=C.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},re=w?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return E(t)})(e):e,{is:ie,defineProperty:D,getOwnPropertyDescriptor:O,getOwnPropertyNames:k,getOwnPropertySymbols:A,getPrototypeOf:j}=Object,ae=globalThis,oe=ae.trustedTypes,se=oe?oe.emptyScript:``,ce=ae.reactiveElementPolyfillSupport,le=(e,t)=>e,ue={toAttribute(e,t){switch(t){case Boolean:e=e?se:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},de=(e,t)=>!ie(e,t),fe={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:de};Symbol.metadata??=Symbol(`metadata`),ae.litPropertyMetadata??=new WeakMap;var pe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=fe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&D(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=O(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??fe}static _$Ei(){if(this.hasOwnProperty(le(`elementProperties`)))return;let e=j(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(le(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le(`properties`))){let e=this.properties,t=[...k(e),...A(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(re(e))}else e!==void 0&&t.push(re(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ue:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ue:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??de)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};pe.elementStyles=[],pe.shadowRootOptions={mode:`open`},pe[le(`elementProperties`)]=new Map,pe[le(`finalized`)]=new Map,ce?.({ReactiveElement:pe}),(ae.reactiveElementVersions??=[]).push(`2.1.2`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let me=globalThis,he=e=>e,ge=me.trustedTypes,_e=ge?ge.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ve=`$lit$`,ye=`lit$${Math.random().toFixed(9).slice(2)}$`,be=`?`+ye,xe=`<${be}>`,Se=document,Ce=()=>Se.createComment(``),we=e=>e===null||typeof e!=`object`&&typeof e!=`function`,M=Array.isArray,Te=e=>M(e)||typeof e?.[Symbol.iterator]==`function`,Ee=`[ 	
\f\r]`,De=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oe=/-->/g,ke=/>/g,Ae=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),je=/'/g,Me=/"/g,Ne=/^(?:script|style|textarea|title)$/i,Pe=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),N=Pe(1),Fe=Pe(2),Ie=Symbol.for(`lit-noChange`),P=Symbol.for(`lit-nothing`),Le=new WeakMap,Re=Se.createTreeWalker(Se,129);function ze(e,t){if(!M(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return _e===void 0?t:_e.createHTML(t)}let Be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=De;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===De?c[1]===`!--`?o=Oe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Ae):(Ne.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Ae):o=ke:o===Ae?c[0]===`>`?(o=i??De,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Ae:c[3]===`"`?Me:je):o===Me||o===je?o=Ae:o===Oe||o===ke?o=De:(o=Ae,i=void 0);let d=o===Ae&&e[t+1].startsWith(`/>`)?` `:``;a+=o===De?n+xe:l>=0?(r.push(s),n.slice(0,l)+ve+n.slice(l)+ye+d):n+ye+(l===-2?t:d)}return[ze(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]};var Ve=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Be(t,n);if(this.el=e.createElement(l,r),Re.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Re.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ve)){let t=u[o++],n=i.getAttribute(e).split(ye),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ke:r[1]===`?`?qe:r[1]===`@`?Je:Ge}),i.removeAttribute(e)}else e.startsWith(ye)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ne.test(i.tagName)){let e=i.textContent.split(ye),t=e.length-1;if(t>0){i.textContent=ge?ge.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Ce()),Re.nextNode(),c.push({type:2,index:++a});i.append(e[t],Ce())}}}else if(i.nodeType===8)if(i.data===be)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(ye,e+1))!==-1;)c.push({type:7,index:a}),e+=ye.length-1}a++}}static createElement(e,t){let n=Se.createElement(`template`);return n.innerHTML=e,n}};function He(e,t,n=e,r){if(t===Ie)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=we(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=He(e,i._$AS(e,t.values),i,r)),t}var Ue=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Se).importNode(t,!0);Re.currentNode=r;let i=Re.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new We(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ye(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Re.nextNode(),a++)}return Re.currentNode=Se,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},We=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=He(this,e,t),we(e)?e===P||e==null||e===``?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==Ie&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Te(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&we(this._$AH)?this._$AA.nextSibling.data=e:this.T(Se.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ve.createElement(ze(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ue(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Le.get(e.strings);return t===void 0&&Le.set(e.strings,t=new Ve(e)),t}k(t){M(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(Ce()),this.O(Ce()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=he(e).nextSibling;he(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ge=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=P}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=He(this,e,t,0),a=!we(e)||e!==this._$AH&&e!==Ie,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=He(this,r[n+o],t,o),s===Ie&&(s=this._$AH[o]),a||=!we(s)||s!==this._$AH[o],s===P?e=P:e!==P&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ke=class extends Ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},qe=class extends Ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},Je=class extends Ge{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=He(this,e,t,0)??P)===Ie)return;let n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ye=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){He(this,e)}};let Xe={M:ve,P:ye,A:be,C:1,L:Be,R:Ue,D:Te,V:He,I:We,H:Ge,N:qe,U:Je,B:Ke,F:Ye},Ze=me.litHtmlPolyfillSupport;Ze?.(Ve,We),(me.litHtmlVersions??=[]).push(`3.3.2`);let Qe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new We(t.insertBefore(Ce(),e),e,void 0,n??{})}return i._$AI(e),i},$e=globalThis;var et=class extends pe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ie}};et._$litElement$=!0,et.finalized=!0,$e.litElementHydrateSupport?.({LitElement:et});let tt=$e.litElementPolyfillSupport;tt?.({LitElement:et}),($e.litElementVersions??=[]).push(`4.2.2`);
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function F(e,t,n){return e?t(e):n?.(e)}var nt=Symbol.for(`preact-signals`);function rt(){if(ct>1)ct--;else{for(var e,t=!1;st!==void 0;){var n=st;for(st=void 0,lt++;n!==void 0;){var r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&ft(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(lt=0,ct--,t)throw e}}function it(e){if(ct>0)return e();ct++;try{return e()}finally{rt()}}var I=void 0;function at(e){var t=I;I=void 0;try{return e()}finally{I=t}}var ot,st=void 0,ct=0,lt=0,ut=0;function dt(e){if(I!==void 0){var t=e.n;if(t===void 0||t.t!==I)return t={i:0,S:e,p:I.s,n:void 0,t:I,e:void 0,x:void 0,r:t},I.s!==void 0&&(I.s.n=t),I.s=t,e.n=t,32&I.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=I.s,t.n=void 0,I.s.n=t,I.s=t),t}}function L(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}L.prototype.brand=nt,L.prototype.h=function(){return!0},L.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?at(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},L.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&at(function(){var e;(e=t.Z)==null||e.call(t)}))}},L.prototype.subscribe=function(e){var t=this;return bt(function(){var n=t.value,r=I;I=void 0;try{e(n)}finally{I=r}},{name:`sub`})},L.prototype.valueOf=function(){return this.value},L.prototype.toString=function(){return this.value+``},L.prototype.toJSON=function(){return this.value},L.prototype.peek=function(){var e=I;I=void 0;try{return this.value}finally{I=e}},Object.defineProperty(L.prototype,`value`,{get:function(){var e=dt(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(lt>100)throw Error(`Cycle detected`);this.v=e,this.i++,ut++,ct++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{rt()}}}});function R(e,t){return new L(e,t)}function ft(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function pt(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function mt(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function ht(e,t){L.call(this,void 0),this.x=e,this.s=void 0,this.g=ut-1,this.f=4,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}ht.prototype=new L,ht.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ut))return!0;if(this.g=ut,this.f|=1,this.i>0&&!ft(this))return this.f&=-2,!0;var e=I;try{pt(this),I=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return I=e,mt(this),this.f&=-2,!0},ht.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}L.prototype.S.call(this,e)},ht.prototype.U=function(e){if(this.t!==void 0&&(L.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},ht.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(ht.prototype,`value`,{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=dt(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function z(e,t){return new ht(e,t)}function gt(e){var t=e.u;if(e.u=void 0,typeof t==`function`){ct++;var n=I;I=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,_t(e),t}finally{I=n,rt()}}}function _t(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,gt(e)}function vt(e){if(I!==this)throw Error(`Out-of-order effect`);mt(this),I=e,this.f&=-2,8&this.f&&_t(this),rt()}function yt(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t?.name,ot&&ot.push(this)}yt.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.u=t)}finally{e()}},yt.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,gt(this),pt(this),ct++;var e=I;return I=this,vt.bind(this,e)},yt.prototype.N=function(){2&this.f||(this.f|=2,this.o=st,st=this)},yt.prototype.d=function(){this.f|=8,1&this.f||_t(this)},yt.prototype.dispose=function(){this.d()};function bt(e,t){var n=new yt(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}let B={NONE:0,SOLID:1,DASHED:2},V=R([]),xt=z(()=>new Map(V.value.map(e=>[e.id,e]))),St=R(null),Ct=z(()=>St.value??V.value),wt=z(()=>new Map(Ct.value.map(e=>[e.id,e])));function Tt(){let e=game.settings.get(r,f.terrainTypes);V.value=Object.freeze(e.map(e=>Object.freeze({...Et(e.id),...e})))}function Et(e=void 0){return{id:e??foundry.utils.randomID(),name:`New Terrain Type`,usesHeight:!0,isSolid:!0,isAlwaysVisible:!1,textRotation:!1,lineType:B.SOLID,lineWidth:4,lineColor:`#FF0000`,lineColorAnimation:null,lineOpacity:.8,lineDashSize:15,lineGapSize:10,lineDashOffsetAnimation:0,lineFadeDistance:0,lineFadeColor:`#FF0000`,lineFadeOpacity:.4,fillType:CONST.DRAWING_FILL_TYPES.SOLID,fillColor:`#FF0000`,fillColorAnimation:null,fillOpacity:.2,fillTexture:``,fillTextureOffset:{x:0,y:0},fillTextureScale:{x:100,y:100},fillTextureOffsetAnimation:{x:0,y:0},textFormat:``,elevatedTextFormat:``,font:CONFIG.defaultFontFamily,textSize:48,textColor:`#FFFFFF`,textColorAnimation:null,textOpacity:1,textStrokeThickness:4,textStrokeColor:``,textShadowAmount:2,textShadowColor:``,textShadowOpacity:1,defaultHeight:null,defaultElevation:null,regionBehaviors:[],flags:{}}}function Dt(e){return xt.value.get(e)}function Ot(e,t=65535){return e?.fillOpacity>0&&e.fillType!==CONST.DRAWING_FILL_TYPES.NONE?Color.from(e.fillColor):e?.lineWidth>0&&e.lineOpacity>0?Color.from(e.lineColor):t}async function kt(e,t,n=void 0){let i=e.getFlag(`terrain-height-tools`,m.invisibleTerrainTypes)??[];(n===!0||n===void 0)&&!i.includes(t)?await e.setFlag(r,m.invisibleTerrainTypes,[...i,t]):(n===!1||n===void 0)&&i.includes(t)&&await e.setFlag(r,m.invisibleTerrainTypes,i.filter(e=>e!==t))}function At(e,t){let n=new Map;for(let r of e){let e=t(r);n.has(e)||n.set(e,[]),n.get(e).push(r)}return n}function jt(e,t,n){let r=new Map;for(let n of e){let e=t(n);r.has(e)||r.set(e,[]),r.get(e).push(n)}return new Map([...r.entries()].map(([e,t])=>[e,n(t)]))}function Mt(e,...t){if(!t?.length)throw Error(`Must provide at least one function`);let n=new Map;for(let r of e){let e=t.map(e=>e(r)),i=n;for(let t=0;t<e.length;t++){let n=e[t];t<e.length-1?(i.set(n,i.get(n)??new Map),i=i.get(n)):i.has(n)||i.set(n,r)}}let r=e=>e instanceof Map?[...e.values()].flatMap(r):e;return r(n)}function Nt(e,t){let n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}var H=class e{#e;#t;constructor(e,t){this.#e=e,this.#t=t}get x(){return this.#e}get y(){return this.#t}static from(t){switch(!0){case t instanceof e:return new e(t.#e,t.#t);case Array.isArray(t)&&typeof t[0]==`number`&&typeof t[1]==`number`:return new e(t[0],t[1]);case typeof t==`object`&&typeof t.x==`number`&&typeof t.y==`number`:return new e(t.x,t.y);case typeof t==`object`&&typeof t.X==`number`&&typeof t.Y==`number`:return new e(t.X,t.Y);default:throw Error(`Invalid point. Expected a Point instance, a pair of numbers, or an object with 'x' and 'y' number properties. Got: ${t}`)}}equals(e,{precision:t=1}={}){return Math.abs(this.x-e.x)<=t&&Math.abs(this.y-e.y)<=t}offset({x:t=0,y:n=0}){return new e(this.#e+t,this.#t+n)}},Pt=class e{#e;#t;#n;#r;constructor(e,t){this.#e=e instanceof H?e:new H(e.x,e.y),this.#t=t instanceof H?t:new H(t.x,t.y)}static fromCoords(t,n,r,i){return new e(new H(t,n),new H(r,i))}get p1(){return this.#e}get p2(){return this.#t}get dx(){return this.#t.x-this.#e.x}get dy(){return this.#t.y-this.#e.y}get ux(){return this.dx/this.length}get uy(){return this.dy/this.length}get slope(){return this.#e.x===this.#t.x?1/0:this.dy/this.dx}get angle(){return this.#r??=Math.atan2(this.dy,this.dx)}get lengthSquared(){return this.dx**2+this.dy**2}get length(){return this.#n??=Math.hypot(this.dx,this.dy)}equals(e){return this.#e.equals(e.p1)&&this.#t.equals(e.p2)||this.#e.equals(e.p2)&&this.#t.equals(e.p1)}isParallelTo(e){let t=Math.abs(this.angle-e.angle);return t>Math.PI&&(t=Math.PI*2-t),t>Math.PI/2&&(t=Math.PI-t),t<=1e-6}findClosestPointOnLineTo(e,t){let{dx:n,dy:r,p1:{x:i,y:a}}=this,o=((e-i)*n+(t-a)*r)/(n*n+r*r),{x:s,y:c}=this.lerp(o),l=(e-s)**2+(t-c)**2,u=(e-i)*r-(t-a)*n;return{t:o,point:{x:s,y:c},distanceSquared:l,side:Math.sign(u)}}intersectsXAt(e){if(e>=Math.max(this.#e.x,this.#t.x)||e<=Math.min(this.#e.x,this.#t.x))return;let t=this.slope;if(t!==1/0)return t===0?this.#e.y:this.#e.y+(e-this.#e.x)*t}intersectsYAt(e){if(e>Math.max(this.#e.y,this.#t.y)||e<Math.min(this.#e.y,this.#t.y))return;let t=this.slope;if(t!==0)return t===1/0?this.#e.x:this.#e.x+(e-this.#e.y)/t}intersectsAt(e,{ignoreLength:t=!1}={}){if(this.lengthSquared<=0||e.lengthSquared<=0)return;let{x:n,y:r}=this.#e,{x:i,y:a}=this.#t,{x:o,y:s}=e.p1,{x:c,y:l}=e.p2;if(this.isParallelTo(e))return;let u=(n-i)*(s-l)-(r-a)*(o-c);if(Math.abs(u)<1e-10)return;let d=((n-o)*(s-l)-(r-s)*(o-c))/u,f=-((n-i)*(r-s)-(r-a)*(n-o))/u;if(!(!t&&(d<-1e-10||d>1.0000000001||f<-1e-10||f>1.0000000001)))return{x:n+d*(i-n),y:r+d*(a-r),t:t?d:Math.max(Math.min(d,1),0),u:t?f:Math.max(Math.min(f,1),0)}}lerp(t){return e.lerp(this.#e.x,this.#e.y,this.#t.x,this.#t.y,t)}static lerp(e,t,n,r,i){return{x:(n-e)*i+e,y:(r-t)*i+t}}angleBetween(e){let t=this.angle-e.angle+Math.PI;for(;t<0;)t+=2*Math.PI;for(;t>=Math.PI*2;)t-=2*Math.PI;return t}isBetween(e,t){e.p1.equals(t.p2)&&([e,t]=[t,e]);let n=e.angleBetween(t);return e.angleBetween(this)<=n}inverse(){return new e(this.#t,this.#e)}toString(){return`LineSegment { (${this.#e.x}, ${this.#e.y}) -> (${this.#t.x}, ${this.#t.y}) }`}},Ft=class e{vertices=[];edges=[];centroid=[0,0];boundingBox={x1:1/0,y1:1/0,x2:-1/0,y2:-1/0,get w(){return this.x2-this.x1},get h(){return this.y2-this.y1},get xMid(){return(this.x1+this.x2)/2},get yMid(){return(this.x1+this.x2)/2}};constructor(e){if(!Array.isArray(e))throw Error("Invalid polygon: `vertices` must be an array");let t=e.map(H.from),n=t[0].equals(t.at(-1));for(let e of n?t.slice(0,-1):t)this.#e(e);for(let e=0;e<this.edges.length-2;e++)for(let t=e+2;t<this.edges.length;t++)if(!(e===0&&t===this.edges.length-1)&&this.edges[e].intersectsAt(this.edges[t])!==void 0)throw Error(`Self-intersecting polygons are not supported. Use ClipperLib.Clipper.SimplifyPolygon to simplify first.`);Object.freeze(this.vertices),Object.freeze(this.edges),Object.freeze(this.centroid),Object.freeze(this.boundingBox)}static createSolid(t){return t=t instanceof e?t.vertices:t,new e(e.isClockwise(t)?t:[...t.reverse()])}static createHole(t){return t=t instanceof e?t.vertices:t,new e(e.isClockwise(t)?[...t.reverse()]:t)}static fromGeoJson(t){if(!Array.isArray(t)||Array.length<3)throw Error("Invalid polygon: `input` must be an array with at least 3 vertices");return new e(t[0][0]===t.at(-1)[0]&&t[0][1]===t.at(-1)[1]?t.slice(0,-1):t)}get boundingRect(){return new PIXI.Rectangle(this.boundingBox.x1,this.boundingBox.y1,this.boundingBox.w,this.boundingBox.h)}get isSolid(){return e.isClockwise(this.vertices)}get isHole(){return!e.isClockwise(this.vertices)}#e(e){let t=H.from(e);if(this.vertices.length>0&&t.equals(this.vertices[this.vertices.length-1],{precision:1e-10}))throw Error(`Cannot add vertex. It is identical to the previous vertex.`);this.vertices.push(t),this.edges.length>=1&&(this.edges=this.edges.with(-1,new Pt(this.edges.at(-1).p1,t))),this.edges.push(new Pt(t,this.vertices[0])),this.#t(t)}containsPolygon(e){let t=this.boundingBox,n=e.boundingBox;if(t.x1>n.x1||t.y1>n.y1||t.x2<n.x2||t.y2<n.y2)return!1;let r=e.vertices.find(e=>e.y===n.y1).offset({y:canvas.grid.sizeY*.05});return this.edges.map(e=>e.intersectsYAt(r.y)).filter(e=>typeof e==`number`&&e<r.x).length%2==1}containsPoint(e,t,{containsOnEdge:n=!0}={}){let{boundingBox:r}=this;if(e<r.x1||e>r.x2||t<r.y1||t>r.y2)return!1;if(this.edges.some(n=>{let{t:r,distanceSquared:i}=n.findClosestPointOnLineTo(e,t);return Math.abs(r)<1e-10&&Math.abs(r-1)<1e-10&&i<1e-20}))return n;let i=new Set(Mt(this.edges.map(e=>({edge:e,intersectX:e.intersectsYAt(t)})).filter(({intersectX:t})=>typeof t==`number`&&t<e),({intersectX:e})=>e,({edge:e})=>Math.sign(e.dy)).map(({edge:e})=>e)),a=new Set(this.edges.filter(e=>Math.abs(e.p1.y-t)<1e-10&&Math.abs(e.p2.y-t)<1e-10)),o=(e,t)=>{for(let n of this.traverseEdges(e,t))if(!a.has(n))return i.has(n)&&Math.sign(e.dy)===Math.sign(n.dy)?i.delete(n):!1};for(let e of i.values())o(e,1)||o(e,-1);return i.size%2==1}#t(e){this.centroid[0]+=(e.x-this.centroid[0])/this.vertices.length,this.centroid[1]+=(e.y-this.centroid[1])/this.vertices.length,e.x<this.boundingBox.x1&&(this.boundingBox.x1=e.x),e.y<this.boundingBox.y1&&(this.boundingBox.y1=e.y),e.x>this.boundingBox.x2&&(this.boundingBox.x2=e.x),e.y>this.boundingBox.y2&&(this.boundingBox.y2=e.y)}previousEdge(e){let t=this.edges.indexOf(e);switch(t){case-1:return;case 0:return this.edges[this.edges.length-1];default:return this.edges[t-1]}}nextEdge(e){let t=this.edges.indexOf(e);switch(t){case-1:return;case this.edges.length-1:return this.edges[0];default:return this.edges[t+1]}}*traverseEdges(e,t){let n=this.edges.indexOf(e);if(n<0)throw Error(`Given edge is not part of this polygon.`);let r=n;for(;;){if(r=(r+t)%this.edges.length,r<0&&(r+=this.edges.length),r===n)return;yield this.edges[r]}}pairEdges(e){if(e.length===0)return[];if(e.length>=this.edges.length)throw Error(`Cannot perform edge pairing when there are an equal or greater number of edges than exist in the Polygon.`);let t=[...e].map(e=>this.edges.indexOf(e)).sort((e,t)=>e-t);if(t.includes(-1))throw Error(`At least one of the edges provided do not exist within the Polygon.`);if(t[0]===0){let e=1,n=!1;for(;t[t.length-e]===this.edges.length-e;)e++,n=!n;n&&(t.shift(),t.push(0))}return Nt(t.map(e=>this.edges[e]),2)}toObject(){return this.vertices.map(({x:e,y:t})=>({x:e,y:t}))}toSvgPath(){return this.vertices.map(({x:e,y:t},n)=>`${n===0?`M`:`L`}${e},${t}`).join(``)+`Z`}toGeoJsonRing(){return this.vertices.map(({x:e,y:t})=>[e,t])}static isClockwise(e){let t=e.map(H.from),n=0;for(let e=0;e<t.length;e++){let r=t[e],i=t[(e+1)%t.length];n+=(i.x-r.x)*(i.y+r.y)}return n<0}static centroid(e){let t={x:0,y:0};for(let n=0;n<e.length;n++)t.x+=(e[n].x-t.x)/(n+1),t.y+=(e[n].y-t.y)/(n+1);return t}};function It(e,...t){console.error(`Terrain Height Tools | ${e}`,...t)}function Lt(e,...t){console.warn(`Terrain Height Tools | ${e}`,...t)}function Rt(e,...t){console.log(`Terrain Height Tools | ${e}`,...t)}function zt(e,...t){console.debug(`Terrain Height Tools | ${e}`,...t)}function Bt(e,t){return Math.round(e/t)*t}function Vt(e){if(!game.settings.get(`terrain-height-tools`,f.useFractionsForLabels))return e+``;let t=Math.floor(e);switch(e%1){case .5:return(t===0?``:t)+`½`;case .25:return(t===0?``:t)+`¼`;case .75:return(t===0?``:t)+`¾`;default:return e+``}}function Ht(e){return typeof e==`object`&&typeof e.x==`number`&&typeof e.y==`number`&&typeof e.h==`number`}var Ut=class{#e=new Set;#t=[];constructor(e=void 0){this.addRange(e)}add(e){this.#e.has(e)||(this.#e.add(e),this.#t.push(e))}addRange(e){if(e)for(let t of e)this.add(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.#t.length?{value:this.#t[e++],done:!1}:{value:void 0,done:!0}}}};function Wt(e,t=void 0){let n=new Map;return t??=e=>e.join(`|`),function(...r){let i=t(r);if(n.has(i))return n.get(i);let a=e(...r);return n.set(i,a),a}}let Gt=1/Math.sqrt(3);function Kt(e,t){if(canvas.grid.type===CONST.GRID_TYPES.GRIDLESS)return[];if(canvas.grid.isHexagonal){let{x:n,y:r}=canvas.grid.getCenterPoint({i:e,j:t});return canvas.grid.getShape().map(({x:e,y:t})=>({x:Math.round(e+n),y:Math.round(t+r)}))}let{x:n,y:r}=canvas.grid.getTopLeftPoint({i:e,j:t}),{sizeX:i,sizeY:a}=canvas.grid;return[{x:n,y:r},{x:n+i,y:r},{x:n+i,y:r+a},{x:n,y:r+a}]}function qt(e,t){return Kt(e,t).reduce((e,t,n)=>({x:e.x+(t.x-e.x)/(n+1),y:e.y+(t.y-e.y)/(n+1)}))}function U(e){return typeof e==`number`?e*canvas.scene.dimensions.distance:null}function Jt(e){return typeof e==`number`?e/canvas.scene.dimensions.distance:null}let Yt=Wt(function(e,t){let n=[];for(let r=0;r<e;r++)for(let e=0;e<t;e++)n.push({x:r+.5,y:e+.5});return n}),Xt=Wt(function(e,t,n,r){if(e<Math.floor(t/2)+1)return[];let i=Math[r?`ceil`:`floor`]((t-1)/2)*Gt*1.5+Gt,a=[],o=0,s=r?1:-1;for(let n=0;n<t;n++){let t=(o+1)/2,r=o*s*Gt*1.5+i;for(let n=0;n<e-o;n++)a.push(c(n+t,r));s*=-1,n%2==0&&o++}return a;function c(e,t){return n?{x:t,y:e}:{x:e,y:t}}}),Zt=Wt(function(e,t,n,r){if(e<t)return[];let i=r?Gt+(t-1)*Gt*1.5:Gt,a=[];for(let n=0;n<t;n++){let t=(n+1)/2,s=n*(r?-1:1)*Gt*1.5+i;for(let r=0;r<e-n;r++)a.push(o(r+t,s))}return a;function o(e,t){return n?{x:t,y:e}:{x:e,y:t}}}),Qt=Wt(function(e,t,n,r){if(e===1&&t>1)return[];let i=[],a=+!!r;for(let n=0;n<t;n++){let t=n%2===a;for(let r=0;r<e-+!t;r++)i.push(o(r+(t?.5:1),n*Gt*1.5+Gt))}return i;function o(e,t){return n?{x:t,y:e}:{x:e,y:t}}}),$t=Wt(function(e,t){let n=[],r=e/2,i=t/2,a=e/2,o=t/2;for(let s=0;s<e;s++)for(let c=0;c<t;c++){let l=s+.5-r,u=c+.5-i,d=Math.atan2(u,l),f=Math.sqrt(l*l+u*u),p=Math.cos(d),m=Math.sin(d),h=a*o/Math.sqrt(o*o*p*p+a*a*m*m),g=r+f*(h/(p>0?(e-r)/p:-r/p))*p,_=i+f*(h/(m>0?(t-i)/m:-i/m))*m;n.push({x:g,y:_})}return n});function en(e,t,n,r,i,a,o){if(i===CONST.GRID_TYPES.GRIDLESS&&[CONST.TOKEN_SHAPES.ELLIPSE_1,CONST.TOKEN_SHAPES.ELLIPSE_2].includes(o))return $t(n,r).map(n=>({x:e+n.x*a,y:t+n.y*a}));if([CONST.GRID_TYPES.SQUARE,CONST.GRID_TYPES.GRIDLESS].includes(i))return Yt(n,r).map(n=>({x:e+n.x*a,y:t+n.y*a}));let s=[CONST.GRID_TYPES.HEXEVENQ,CONST.GRID_TYPES.HEXODDQ].includes(i),c=s?r:n,l=s?n:r,u=[CONST.TOKEN_SHAPES.ELLIPSE_2,CONST.TOKEN_SHAPES.TRAPEZOID_2,CONST.TOKEN_SHAPES.RECTANGLE_2].includes(o);switch(o){case CONST.TOKEN_SHAPES.ELLIPSE_1:case CONST.TOKEN_SHAPES.ELLIPSE_2:return Xt(c,l,s,u).map(n=>({x:e+n.x*a,y:t+n.y*a}));case CONST.TOKEN_SHAPES.TRAPEZOID_1:case CONST.TOKEN_SHAPES.TRAPEZOID_2:return Zt(c,l,s,u).map(n=>({x:e+n.x*a,y:t+n.y*a}));case CONST.TOKEN_SHAPES.RECTANGLE_1:case CONST.TOKEN_SHAPES.RECTANGLE_2:return Qt(c,l,s,u).map(n=>({x:e+n.x*a,y:t+n.y*a}));default:throw Error(`Unknown hex grid type.`)}}function tn(e,t){if((e.length??0)===0)return[];if(!t||t.type===CONST.GRID_TYPES.GRIDLESS)return Lt("Attempted to call `polygonsFromGridCells` on a gridless grid. This operation is not supported."),[];e.sort((e,t)=>e[0]-t[0]||e[1]-t[1]);let n=e.map(e=>({position:e,poly:new Ft(Kt(...e)),cell:`${e[0]}|${e[1]}`})).flatMap(({poly:e,cell:t})=>e.edges.map(e=>({edge:e,cell:t}))),r=new Map,i=(e,t)=>{let n=r.get(e);n?n.add(t):r.set(e,new Set([t]))};for(let e=0;e<n.length;e++)for(let t=e+1;t<n.length;t++)if(n[e].edge.equals(n[t].edge)){i(n[t].cell,n[e].cell),i(n[e].cell,n[t].cell),n.splice(t,1),n.splice(e,1),e--;break}let a=[];for(;n.length;){let e=n.splice(0,1);for(;!e[0].edge.p1.equals(e[e.length-1].edge.p2);){let t=n.map(({edge:e},t)=>({edge:e,idx:t})).filter(({edge:t})=>t.p1.equals(e[e.length-1].edge.p2));if(t.length===0)throw Error(`Invalid graph detected. Missing edge.`);let r=t.length===1?t[0].idx:t.map(({edge:t,idx:n})=>({angle:e[e.length-1].edge.angleBetween(t),idx:n})).sort((e,t)=>e.angle-t.angle)[0].idx,[i]=n.splice(r,1);e.push(i)}let t=new Ut(e.map(({cell:e})=>e));for(let e of t)t.addRange(r.get(e));a.push(new Ft(e.map(({edge:e})=>e.p1)))}let o=At(a,e=>e.isHole),s=(o.get(!1)??[]).map(e=>({polygon:e,holes:[]})),c=o.get(!0)??[];for(let e of c){let t=s.filter(({polygon:t})=>t.containsPolygon(e));if(t.length===0)throw It(`Something went wrong calculating which polygon this hole belonged to: No containing polygons found.`,{holePolygon:e,solidPolygons:s}),Error(`Could not find a parent polygon for this hole.`);if(t.length===1)t[0].holes.push(e);else{let n=e.vertices.find(t=>t.y===e.boundingBox.y1).offset({y:canvas.grid.sizeY*.05}),r=t.flatMap(({polygon:e})=>e.edges.map(e=>({intersectsAt:e.intersectsYAt(n.y),shape})).filter(e=>e.intersectsAt&&e.intersectsAt<n.x));if(r.length===0)throw It(`Something went wrong calculating which polygon this hole belonged to: No edges intersected horizontal ray.`,{holePolygon:e,solidPolygons:s}),Error(`Could not find a parent polygon for this hole.`);r.sort((e,t)=>t.intersectsAt-e.intersectsAt),r[0].shape.holes.push(e)}}return s}
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let{I:nn}=Xe,rn=e=>e,an=e=>e.strings===void 0,on=()=>document.createComment(``),sn=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new nn(r.insertBefore(on(),i),r.insertBefore(on(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=rn(e).nextSibling;rn(r).insertBefore(e,i),e=t}}}return n},cn=(e,t,n=e)=>(e._$AI(t,n),e),ln={},un=(e,t=ln)=>e._$AH=t,dn=e=>e._$AH,fn=e=>{e._$AR(),e._$AA.remove()},pn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mn=e=>(...t)=>({_$litDirective$:e,values:t});var hn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let gn=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),gn(e,t);return!0},_n=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},vn=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),xn(t)}};function yn(e){this._$AN===void 0?this._$AM=e:(_n(this),this._$AM=e,vn(this))}function bn(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)gn(r[e],!1),_n(r[e]);else r!=null&&(gn(r,!1),_n(r));else gn(this,e)}let xn=e=>{e.type==pn.CHILD&&(e._$AP??=bn,e._$AQ??=yn)};var Sn=class extends hn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),vn(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(gn(this,e),_n(this))}setValue(e){if(an(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let Cn={linear:e=>e,easeInCubic:e=>e**3,easeOutCubic:e=>1-(1-e)**3,easeInOutCubic:e=>e<.5?4*e**3:1-(-2*e+2)**3/2};function wn({r:e,g:t,b:n,a:r}){e/=255,t/=255,n/=255;let i=Math.max(e,t,n),a=i-Math.min(e,t,n),o=i*100,s=i===0?0:a/i*100,c=0;return a!==0&&(i===e?c=60*((t-n)/a%6):i===t?c=60*((n-e)/a+2):i===n&&(c=60*((e-t)/a+4)),c<0&&(c+=360)),{h:c,s,v:o,a:Math.round(r/255*100)}}function Tn({h:e,s:t,v:n,a:r}){e=e%360/360,t/=100,n/=100;let i=n*t,a=i*(1-Math.abs(e*6%2-1)),o=n-i,s=0,c=0,l=0;return 0<=e&&e<1/6?(s=i,c=a,l=0):1/6<=e&&e<2/6?(s=a,c=i,l=0):2/6<=e&&e<3/6?(s=0,c=i,l=a):3/6<=e&&e<4/6?(s=0,c=a,l=i):4/6<=e&&e<5/6?(s=a,c=0,l=i):5/6<=e&&e<1&&(s=i,c=0,l=a),s=Math.round((s+o)*255),c=Math.round((c+o)*255),l=Math.round((l+o)*255),r=Math.round(r/100*255),{r:s,g:c,b:l,a:r}}function En(e){if(typeof e!=`string`)return;let t=/^#?(?<r>[a-f0-9]{2})(?<g>[a-f0-9]{2})(?<b>[a-f0-9]{2})(?<a>[a-f0-9]{2})?$/i.exec(e);if(t){let{r:e,g:n,b:r,a:i}=t.groups;return{r:parseInt(e,16),g:parseInt(n,16),b:parseInt(r,16),a:parseInt(i??`ff`,16)}}let n=/^#?(?<r>[a-f0-9])(?<g>[a-f0-9])(?<b>[a-f0-9])(?<a>[a-f0-9])?$/i.exec(e);if(n){let{r:e,g:t,b:r,a:i}=n.groups;return{r:parseInt(e,16)*17,g:parseInt(t,16)*17,b:parseInt(r,16)*17,a:parseInt(i??`f`,16)*17}}}function Dn({r:e,g:t,b:n,a:r}){return`#`+[e,t,n,r].map(e=>Math.max(Math.min(Math.round(e),255),0).toString(16).padStart(2,`0`)).join(``)}function On(e){return{r:e>>16&255,g:e>>8&255,b:e&255}}function kn(e,t){if(t===0)return 0;let n=e>>16&255,r=e>>8&255,i=e&255,a=Math.max(0,Math.min(Math.round(n*t),255)),o=Math.max(0,Math.min(Math.round(r*t),255)),s=Math.max(0,Math.min(Math.round(i*t),255));return a<<16|o<<8|s}function An(e,t){return kn(e,1/t)}function jn(e,t){let{r:n=0,g:r=0,b:i=0,a=255}=(typeof e==`string`?En(e):typeof e==`number`?On(e):e)??{};return`rgb(${n} ${r} ${i} / ${Math.round(100*(t??a/255))}%)`}function Mn(e,t,n){let r=e>>16&255,i=e>>8&255,a=e&255,o=t>>16&255,s=t>>8&255,c=t&255,l=Math.round(Nn(r,o,n)),u=Math.round(Nn(i,s,n)),d=Math.round(Nn(a,c,n));return l<<16|u<<8|d}function Nn(e,t,n){return e+(t-e)*n}function Pn(e){return e.map(({color:e,alpha:t,position:n})=>({color:kn(e,t),alpha:t,position:n}))}function Fn(e,t,n,r){let i=(Cn[n]??Cn.linear)(r%t/t);if(i<=e[0].position)return{color:e[0].color,alpha:e[0].alpha,insertIndex:0};if(i>=e.at(-1).position)return{color:e.at(-1).color,alpha:e.at(-1).alpha,insertIndex:e.length};for(let t=0;t<e.length-1;t++){let n=e[t],r=e[t+1];if(n.position>i||r.position<i)continue;let a=(i-n.position)/(r.position-n.position);return{color:Mn(n.color,r.color,a),alpha:Nn(n.alpha,r.alpha,a),insertIndex:t+1}}return{color:0,alpha:0,insertIndex:0}}let In=mn(class extends Sn{#e;#t;#n;#r;#i;#a;#o;get#s(){return!!this.#t?.fillColorAnimation&&this.#a?.fillColorCssPropertyName.length>0||!!this.#t?.lineColorAnimation&&this.#a?.lineColorCssPropertyName.length>0||!!this.#t?.textColorAnimation&&this.#a?.textColorCssPropertyName.length>0}render(e,t){return P}update(e,[t,n]){this.#e=e.element,this.#t=t,this.#a={fillColorCssPropertyName:`background-color`,lineColorCssPropertyName:`border-color`,lineWidthCssPropertyName:`border-width`,textColorCssPropertyName:`color`,...n??{}},this.#n=t.fillColorAnimation?Pn(t.fillColorAnimation.keyframes):null,this.#r=t.lineColorAnimation?Pn(t.lineColorAnimation.keyframes):null,this.#i=t.textColorAnimation?Pn(t.textColorAnimation.keyframes):null,Promise.resolve().then(()=>this.#c())}reconnected(){this.#c()}disconnected(){this.#u()}#c=()=>{if(!this.#e||!this.#a)return;let e=Date.now(),{fillColorCssPropertyName:t,lineColorCssPropertyName:n,lineWidthCssPropertyName:r,textColorCssPropertyName:i}=this.#a;if(t.length)if(this.#n){let{duration:n,easingFunc:r}=this.#t.fillColorAnimation,{color:i,alpha:a}=Fn(this.#n,n,r,e);this.#e.style.setProperty(t,jn(An(i,a),a))}else{let{fillColor:e,fillOpacity:n}=this.#t;this.#t.fillType===CONST.DRAWING_FILL_TYPES.NONE&&(n=0),this.#e.style.setProperty(t,jn(e,n))}if(n.length)if(this.#r){let{duration:t,easingFunc:r}=this.#t.lineColorAnimation,{color:i,alpha:a}=Fn(this.#r,t,r,e);this.#e.style.setProperty(n,jn(An(i,a),a))}else{let{lineColor:e,lineOpacity:t}=this.#t;this.#t.lineType===B.NONE&&(t=0),this.#e.style.setProperty(n,jn(e,t))}if(r.length&&this.#t.lineType!==B.NONE&&this.#e.style.setProperty(r,this.#t.lineWidth+`px`),i.length)if(this.#i){let{duration:t,easingFunc:n}=this.#t.textColorAnimation,{color:r,alpha:a}=Fn(this.#i,t,n,e);this.#e.style.setProperty(i,jn(An(r,a),a))}else{let{textColor:e,textOpacity:t}=this.#t;this.#e.style.setProperty(i,jn(e,t))}this.#l()};#l(){this.#s&&(this.#o&&cancelAnimationFrame(this.#o),this.#o=requestAnimationFrame(this.#c))}#u(){this.#o&&cancelAnimationFrame(this.#o),this.#o=null}}),Ln=e=>class extends e{#e;get closeSignal(){return this.#e.signal}_replaceHTML(e,t){Qe(e,t)}_preFirstRender(...e){super._preFirstRender(...e),this.#e=new AbortController}close(...e){Promise.resolve().then(()=>this.#e.abort()),super.close(...e)}},{ApplicationV2:Rn}=foundry.applications.api,zn=e=>game.i18n.localize(e);var Bn=class e extends Ln(Rn){static DEFAULT_OPTIONS={tag:`form`,window:{title:`TERRAINHEIGHTTOOLS.SelectAShape`,contentClasses:[`terrain-shape-choice-dialog`]},form:{closeOnSubmit:!1,handler:e.#r}};_terrainShapes;#e;constructor(e,t={}){super(t),this._terrainShapes=this.#n(e)}_renderHTML(){return N`
			${F(this.options.hint,()=>N`
				<p class="terrain-shape-choice-hint-text">${zn(this.options.hint)}</p>
			`)}

			<div class="terrain-shape-list">
				${this._terrainShapes.map(this.#t)}
			</div>

			<div class="standard-form">
				<footer class="form-footer">
					<button type="submit">
						<i class=${this.options.submitIcon}></i>
						<label>${zn(this.options.submitLabel)}</label>
					</button>
				</footer>
			</div>
		`}#t(e,t){return N`
			<label>
				<input class="terrain-shape-list-radio" type="radio" name="selectedTerrainShapeIndex" value=${t}>
				<div class="terrain-shape-list-item flexcol">
					<p class="flex0" style="font-size: 0.875rem;">${e.terrainTypeName}</p>
					<p class="flex0" style="font-size: 0.8125rem;">
						${F(e.usesHeight,()=>`${e.elevation} → ${e.top} (${zn(`Height`)} ${e.height})`,()=>N`&nbsp;`)}
					</p>
					<svg class="flex1" xmlns="http://www.w3.org/2000/svg" viewBox=${e.svgViewBox}>
						<path
							d=${e.svgPath}
							${In(e.terrainType,{fillColorCssPropertyName:`fill`,lineColorCssPropertyName:`stroke`,lineWidthCssPropertyName:`stroke-width`})}
						/>
					</svg>
				</div>
			</label>
		`}#n(e){let t=xt.value;return e.map(e=>{let n=t.get(e.terrainTypeId),{path:r,viewBox:i}=e.toSvg({padding:n.lineWidth});return{terrainTypeName:n.name,terrainType:n,usesHeight:!!n.usesHeight,height:Vt(U(e.height)),elevation:Vt(U(e.elevation)),top:Vt(U(e.height+e.elevation)),svgPath:r,svgViewBox:i,shape:e}}).sort((e,t)=>t.usesHeight-e.usesHeight||t.top-e.top)}static async#r(e,t,n){let r=+n.object.selectedTerrainShapeIndex;isNaN(r)||(this.#e?.(r),await this.close({submit:!1,force:!0}))}static show(t,n){return new Promise(r=>{let i=new e(t,n);i.render(!0),i.#e=e=>r(i._terrainShapes[e].shape)})}},Vn=class{#e;#t;#n;#r;#i;#a;_providerId;constructor({terrainTypeId:e,polygon:t,holes:n=[],height:r,elevation:i,top:a,bottom:o,visible:s=!0}){if(i??=o??0,a===void 0&&r===void 0)throw Error("Invalid height. `height` or `top` must be provided.");if(r!==void 0&&r<0)throw Error(`Invalid height. Must be 0 or larger.`);if(a!==void 0&&a<i)throw Error(`Invalid height. Top must be higher than elevation/bottom.`);if(r!==void 0&&a!==void 0&&a!==r+i)throw Error(`Invalid height. Top and height do not reconcile.`);this.#e=e,this.#t=Object.freeze(Ft.createSolid(t)),this.#n=Object.freeze(n.map(e=>Object.freeze(Ft.createHole(e)))),this.#r=r??a-i,this.#i=i,this.#a=s}get terrainTypeId(){return this.#e}get terrainType(){return Dt(this.#e)}get polygon(){return this.#t}get holes(){return this.#n}get height(){return this.#r}get elevation(){return this.#i}get top(){return this.#i+this.#r}get bottom(){return this.#i}get visible(){return this.#a}toObject(){return{terrainTypeId:this.#e,polygon:this.#t.toObject(),holes:this.#n.map(e=>e.toObject()),height:this.#r,elevation:this.#i}}toGeoJsonPolygon(){return[this.#t.toGeoJsonRing(),...this.#n.map(e=>e.toGeoJsonRing())]}toKeyString(){return this.#e+`|`+Math.round(this.#r*100)+`|`+Math.round(this.#i*100)+`|P`+this.#t.vertices.flatMap(({x:e,y:t})=>[e,t]).join(`;`)+`|`+this.#n.map(e=>`H${e.vertices.flatMap(({x:e,y:t})=>[e,t]).join(`;`)})`)}containsPoint(e,t,{containsOnEdge:n=!0}={}){return this.#t.containsPoint(e,t,{containsOnEdge:n})&&this.#n.every(r=>!r.containsPoint(e,t,{containsOnEdge:!n}))}toSvg({padding:e=2}={}){let{x1:t,y1:n,w:r,h:i}=this.#t.boundingBox;return{path:this.#t.toSvgPath()+` `+this.#n.map(e=>e.toSvgPath()).join(` `),viewBox:`${t-e} ${n-e} ${r+e*2} ${i+e*2}`}}getIntersections(e,t,n){let r=n?this.#i+this.#r:1/0,i=n?this.#i:-1/0;if(n&&e.h>r&&t.h>r||n&&e.h<i&&t.h<i)return[];let a=n=>{let r=n=>(n-e.h)/(t.h-e.h),i=[e,t][n];return i.h>this.top?{...Pt.lerp(e.x,e.y,t.x,t.y,r(this.top)),h:this.top,t:r(this.top)}:i.h<this.bottom?{...Pt.lerp(e.x,e.y,t.x,t.y,r(this.bottom)),h:this.bottom,t:r(this.bottom)}:{...i,t:n}},{x:o,y:s,h:c,t:l=0}=n?a(0):e,{x:u,y:d,h:f,t:p=1}=n?a(1):t,m=e=>(f-c)*e+c,h=Pt.fromCoords(o,s,u,d),g=h.inverse(),_=this.#t.edges.map(e=>[void 0,e]).concat(this.#n.flatMap(e=>e.edges.map(t=>[e,t]))),v=[];for(let[e,t]of _){let n=h.intersectsAt(t);if(!(!n||n.t<1e-10)){if(v.push({...n,edge:t,hole:e}),n.u<1e-10){let r=(e??this.#t).previousEdge(t);r.isParallelTo(h)&&v.push({...n,u:1,edge:r,hole:e})}else if(n.u>.9999999999){let r=(e??this.#t).nextEdge(t);r.isParallelTo(h)&&v.push({...n,u:0,edge:r,hole:e})}}}let y=[],b=[...At(v,e=>Bt(e.t,1e-10)).entries()].sort(([e],[t])=>e-t).map(([,e])=>e),x=!1;if(!n||c<=r&&c>=i){let e=_.map(([e,t])=>({edge:t,poly:e,...t.findClosestPointOnLineTo(o,s)})).filter(e=>e.t>-1e-10&&e.t<1.0000000001&&e.distanceSquared<1e-20);switch(e.length){case 0:x=this.#t.containsPoint(o,s,{containsOnEdge:!1})&&!this.#n.some(e=>e.containsPoint(o,s,{containsOnEdge:!0}));break;case 1:{let{edge:t,poly:n,t:r}=e[0];if(r<1e-10){let e=(n??this.#t).previousEdge(t);x=e.angleBetween(h)<e.angleBetween(t)}else if(r>.9999999999){let e=(n??this.#t).nextEdge(t);x=t.angleBetween(h)<t.angleBetween(e)}else{let e=t.angleBetween(h);x=e>0&&e<Math.PI}break}case 2:x=h.isBetween(e[0].edge,e[1].edge);break;case 4:x=e.some(({edge:e,poly:t,t:n})=>{if(n<1e-10){let n=(t??this.#t).previousEdge(e);return n.angleBetween(h)<n.angleBetween(e)}else if(n>.9999999999){let n=(t??this.#t).nextEdge(e);return e.angleBetween(h)<e.angleBetween(n)}});break;default:if(e.length%2!=0){Lt(`Error when performing line of sight calculation: the line of sight ray starts at ${e.length} vertices of a single shape, but expected 0, 1, or an even number. This case is not supported and will likely give incorrect line of sight calculation results.`);break}x=[...At(e,e=>e.poly).values()].every(e=>(e[0].poly??this.#t).pairEdges(e.map(e=>e.edge)).every(([e,t])=>h.isBetween(e,t)));break}}let S=n&&c===f&&c!==0&&(c===r||c===i),C={x:o,y:s,h:c,t:0},w=({x:e,y:t,t:n})=>{if(n===C.t)return;let r={x:e,y:t,t:n,h:m(n)};x&&y.push({start:C,end:r,skimmed:S,skimSide:S?0:void 0}),C=r};for(let e of b)switch(e.length){case 1:w(e[0]),x=!x;break;case 2:{let[t,n]=e;n.edge.p2.equals(t.edge.p1)&&([t,n]=[n,t]);let r=h.isBetween(t.edge,n.edge);r!==g.isBetween(t.edge,n.edge)&&(w(t),x=r);break}default:{if(e.length%2!=0){It(`Error occured when performing line of sight calculation: the line of sight ray met a shape and caused ${e.length} intersections at the same point but expected either 1, or an even number. This case is not supported and will likely give incorrect line of sight calculation results.`);break}let t=[...At(e,e=>e.hole).values()],n=t.every(e=>(e[0].hole??this.#t).pairEdges(e.map(e=>e.edge)).every(([e,t])=>h.isBetween(e,t)));n!==t.every(e=>(e[0].hole??this.#t).pairEdges(e.map(e=>e.edge)).every(([e,t])=>g.isBetween(e,t)))&&(w(e[0]),x=n);break}}w({x:u,y:d,t:1});let ee=.05,te=_.map(([,e])=>({edge:e,isParallel:Math.abs(h.angle-e.angle)<ee,isInverseParallel:Math.abs(g.angle-e.angle)<ee})).filter(e=>e.isParallel||e.isInverseParallel),T=[];for(let{edge:e,isParallel:t}of te){let{t:n,distanceSquared:r}=h.findClosestPointOnLineTo(e.p1.x,e.p1.y);n=Math.max(Math.min(n,1),0);let{t:i,distanceSquared:a}=h.findClosestPointOnLineTo(e.p2.x,e.p2.y);if(i=Math.max(Math.min(i,1),0),r>16||a>16||Math.abs(n-i)<=1e-10)continue;let o=t?1:-1;T.push(n<i?{t1:n,t2:i,skimSide:o}:{t1:i,t2:n,skimSide:o})}T.sort((e,t)=>e.t1-t.t2);let E;for(let e=0;e<T.length;e++)if(E??=T[e].t1,e===T.length-1||Math.abs(T[e].t2-T[e+1].t1)>1e-10||T[e].skimSide!==T[e+1].skimSide){let t=T[e].t2,n,r,i=0,a=y.length;for(let e=0;e<y.length;e++){let o=y[e];o.start.t<E&&o.end.t>E&&(n=o),o.start.t<t&&o.end.t>t&&(r=o),o.end.t<=E&&(i=e+1),o.start.t>=t&&a>e&&(a=e)}let o={t:E,h:m(E),...h.lerp(E)},s={t,h:m(t),...h.lerp(t)},c=[n?{...n,end:o}:void 0,{start:o,end:s,skimmed:!0,skimSide:S?0:T[e].skimSide},r?{...r,start:s}:void 0].filter(Boolean);y.splice(i,a-i,...c),E=void 0}if(l!==0||p!==1)for(let e of y)e.start.t=l+e.start.t*(p-l),e.end.t=l+e.end.t*(p-l);return y}static calculateLineOfSight(e,t,n,{includeNoHeightTerrain:r=!1}={}){let i=xt.value,a=[];for(let o of e){if(!i.has(o.terrainTypeId))continue;let{usesHeight:e}=i.get(o.terrainTypeId);if(!e&&!r)continue;let s=o.getIntersections(t,n,e);s.length>0&&a.push({shape:o,regions:s})}return a}static flattenLineOfSightIntersectionRegions(e){let t=[],n=Mt(e.flatMap(e=>e.regions.flatMap(e=>[e.start,e.end])),e=>e.t).sort((e,t)=>e.t-t.t),r,i=V.value.map(e=>e.id);for(let a of n){let{t:n}=a,o=e.map(({shape:e,regions:t})=>({shape:e,region:t.find(e=>e.start.t<n&&e.end.t>=n)})).filter(({region:e})=>!!e);if(o.length>0){let e=o.sort((e,t)=>i.indexOf(e.shape.terrainTypeId)-i.indexOf(t.shape.terrainTypeId)).map(e=>e.shape),n=o.every(e=>e.region.skimmed)&&!(o.some(e=>e.region.skimSide===1)&&o.some(e=>e.region.skimSide===-1));t.push({start:r,end:a,shapes:e,skimmed:n})}r=a}return t}},Hn=class{#e;#t=new Set;constructor(e){this.#e=R(new Set(e??[]))}get value(){return[...this.#e.value.values()]}set value(e){let t=new Set(e??[]),n=[];for(let e of t)this.#e.peek().has(e)||n.push(e);let r=[];for(let e of this.#e.peek())t.has(e)||r.push(e);n.length===0&&r.length===0||(this.#e.value=t,this.#n({newValues:n,removedValues:r}))}get size(){return this.#e.value.size}add(...e){let t=[],n=new Set(this.#e.value);for(let r of e)n.has(r)||(n.add(r),t.push(r));return t.length&&(this.#e.value=n),this.#n({newValues:t}),t.length>0}delete(...e){let t=[],n=new Set(this.#e.value);for(let r of e)n.delete(r)&&t.push(r);return t.length&&(this.#e.value=n),this.#n({removedValues:t}),t.length>0}clear(){if(this.#e.value.size===0)return;let e=[...this.#e.value];this.#e.value=new Set,this.#n({removedValues:e})}has(e){return this.#e.value.has(e)}subscribe(e,{signal:t}={}){this.#t.add(e);let n=()=>this.unsubscribe(e);return t?.addEventListener(`abort`,n,{once:!0}),()=>{n(),t?.removeEventListener(`abort`,n)}}unsubscribe(e){this.#t.delete(e)}unsubscribeAll(){this.#t.clear()}#n({newValues:e=[],removedValues:t=[]}={}){if(!(e.length===0&&t.length===0))for(let n of this.#t)try{n.change?.(this.#e.peek().values(),e,t),t.length>0&&n.remove?.(t),e.length>0&&n.add?.(e)}catch(e){It(`Error thrown in ObservableSet observer callback.`,e)}}};let{CanvasQuadtree:Un}=foundry.canvas.geometry,Wn=new Map,Gn=new Hn;Gn.subscribe({change:()=>Hooks.callAll(c)});function Kn(e,t,{providerIds:n}={}){return qn(new PIXI.Rectangle(e,t,0,0),{providerIds:n,collisionTest:({t:n})=>n.containsPoint(e,t)})}function qn(e,{providerIds:t,collisionTest:n}={}){let r=[];for(let[i,{provider:a}]of Wn)t?.length&&!t.includes(i)||r.push(...a.getShapes(e,{collisionTest:n}));return r}function Jn(e,t){if(!(t instanceof Xn))throw Error(`Expected provider to be an instance of TerrainProvider.`);if(Wn.has(e))throw Error(`A TerrainProvider with this ID has already been registered.`);let n=t.terrainShapes$.subscribe({add:t=>{for(let n of t)n._providerId=e;Gn.add(...t)},remove:e=>{Gn.delete(...e)}});for(let n of t.terrainShapes$.value)n._providerId=e;Gn.add(...t.terrainShapes$.value),Wn.set(e,{id:e,provider:t,cleanup:n})}function Yn(e){let t=typeof e==`string`?e:[...Wn.entries()].find(t=>t[1].provider===e)?.[0],n=Wn.get(t);n!==void 0&&(n.cleanup(),Gn.delete(...n.provider.terrainShapes$.value),Wn.delete(t))}var Xn=class{terrainShapes$=new Hn;quadtree=new Un;#e;#t;#n;constructor(){this.#e=Hooks.on(`canvasReady`,()=>this._canvasReady()),this.#t=Hooks.on(`canvasTearDown`,()=>this._canvasTearDown()),this.#n=Hooks.on(`updateScene`,(e,t,n,r)=>{e.id===canvas.scene.id&&this._updateScene(e,t,n,r)}),this.terrainShapes$.subscribe({add:e=>{for(let t of e)this.quadtree.insert({r:t.polygon.boundingRect,t})},remove:e=>{for(let t of e)this.quadtree.remove(t)}})}addShapes(...e){if(e=e?.flat?.(1),e?.some?.(e=>!(e instanceof Vn))!==!1)throw Error(`Expect shapes parameters to be of type TerrainShape`);return this.terrainShapes$.add(...e)}setShapes(...e){if(e=e?.flat?.(1)??[],e.some(e=>!(e instanceof Vn))!==!1)throw Error(`Expect shapes parameters to be of type TerrainShape`);let t=new Map([...this.terrainShapes$.value].map(e=>[e.toKeyString(),e]));e=e.map(e=>t.get(e.toKeyString())??e),this.terrainShapes$.value=e}deleteShapes(...e){if(e=e?.flat?.(1),e?.some?.(e=>!(e instanceof Vn))!==!1)throw Error(`Expect shapes parameters to be of type TerrainShape`);return this.terrainShapes$.delete(...e)}deleteAllShapes(){this.terrainShapes$.clear()}_canvasReady(){this.#r()}_updateScene(e,t,n,r){[`width`,`height`,`padding`].some(e=>e in t)&&this.#r()}_canvasTearDown(){}#r(){this.quadtree.clear();for(let e of this.terrainShapes$.value)this.quadtree.insert({r:e.polygon.boundingRect,t:e})}getShapes(e,{collisionTest:t}={}){return this.quadtree.getObjects(e,{collisionTest:t})}getShapesMulti(e,t){return new Set(e.flatMap(e=>[...this.getShapes(e,t)]))}destroy(){Hooks.off(`canvasReady`,this.#e),Hooks.off(`canvasTearDown`,this.#t),Hooks.off(`updateScene`,this.#n),this.terrainShapes$.unsubscribeAll()}};let Zn=[e=>({v:1,data:Object.fromEntries(e.map(e=>[`${e.position[0]}|${e.position[1]}`,[{terrainTypeId:e.terrainTypeId,height:e.height,elevation:e.elevation??0}]]))}),e=>({v:2,data:Object.entries(e.data)}),(e,t)=>{let n=At(e.data.flatMap(([e,t])=>{let n=e.split(`|`).map(e=>parseInt(e));return t.map(e=>({pos:n,...e}))}),e=>`${e.terrainTypeId}|${e.height}|${e.elevation}`),r=[];for(let[,e]of n){let{terrainTypeId:n,height:i,elevation:a}=e[0];for(let{polygon:o,holes:s}of tn(e.map(e=>e.pos),t))r.push({terrainTypeId:n,polygon:o.toObject(),holes:s.map(e=>e.toObject()),height:i,elevation:a})}return{v:3,data:{shapes:r}}}];function Qn(e,t,n=3){if(!e)switch(n){case 1:return{v:1,data:{}};case 2:return{v:2,data:[]};case 3:return{v:3,data:{shapes:[]}};default:throw Error(`Unknown/unsupported targetVersion '${n}'`)}for(let r=(`v`in e)?e.v:0;r<n;r++)try{e=Zn[r](e,t)}catch(e){throw ui.notifications.error(`[Terrain Height Tools] Error occured migrating data (v${r} -> v${r+1}). Check console for details.`),It(e),Error(`Error occured migrating data: ${e.message}`,{cause:e})}return e}let W=new class e extends Xn{#e=[];get canUndo(){return this.#e.length>0}_canvasReady(){this._reloadData(),this.#e=[]}_updateScene(e,t,n,r){t.flags?.[`terrain-height-tools`]?.[m.heightData]&&r!==game.userId&&this._reloadData(),super._updateScene(e,t,n,r)}_reloadData(){let e=Qn(canvas.scene.getFlag(r,m.heightData),canvas.grid).data;e.shapes=e.shapes.filter(e=>xt.value.has(e.terrainTypeId)),this.setShapes(...e.shapes.map(e=>new Vn(e)))}getShapesAtPoint(e,t){return[...this.getShapes(new PIXI.Rectangle(e,t,0,0),{collisionTest:({t:n})=>n.containsPoint(e,t,{containsOnEdge:!0})})]}async getSingleShapeAtPoint(e,t,n){let r=this.getShapesAtPoint(e,t);switch(r.length){case 0:return;case 1:return r[0];default:return Bn.show(r,n).catch(()=>void 0)}}async paintRegions(e,t,n=0,r=0,{mode:i=`totalReplace`,persist:a=!0}={}){let o=Dt(t);if(!o)throw Error(`Invalid terrain type ID '${t}'`);let s=r+n,c=r;return await this.#n(async()=>{let n=!1,r=performance.now();for(let{polygon:r,holes:a}of e){let e=Ft.createSolid(r),l=a?.map(e=>Ft.createHole(e))??[],u=[{top:s,bottom:c,paths:[[e.toGeoJsonRing(),...l.map(e=>e.toGeoJsonRing())]]}];switch(!0){case i===`totalReplace`:n=await this.eraseRegions([{polygon:r,holes:a}],{persist:!1})||n;break;case i===`destructiveMerge`&&o.usesHeight:{let e=V.value.filter(e=>e.usesHeight).map(e=>e.id);n=await this.eraseRegions([{polygon:r,holes:a}],{onlyTerrainTypeIds:e,top:s,bottom:c,persist:!1})||n;break}case i===`destructiveMerge`&&!o.usesHeight:{let e=V.value.filter(e=>!e.usesHeight).map(e=>e.id);n=await this.eraseRegions([{polygon:r,holes:a}],{onlyTerrainTypeIds:e,persist:!1})||n;break}case i===`additiveMerge`&&o.usesHeight:{let t=jt(this.getShapes(e.boundingRect,{collisionTest:({t:e})=>e.terrainType?.usesHeight&&e.top>c&&e.bottom<s}),e=>`${e.top}|${e.bottom}`,e=>({top:e[0].top,bottom:e[0].bottom,paths:e.map(e=>e.toGeoJsonPolygon())}));for(let[,e]of t){let t=[],n=(e,n,r)=>{let i=t.find(e=>e.top===n&&e.bottom===r);i?i.paths.push(...e):t.push({paths:Array.from(e),top:n,bottom:r})};for(let t of u){let r=(0,S.intersection)(t.paths,e.paths);t.bottom<e.bottom&&n(r,e.bottom,t.bottom),t.top>e.top&&n(r,t.top,e.top),n((0,S.difference)(t.paths,e.paths),t.top,t.bottom)}u=t}break}}for(let{top:e,bottom:r,paths:i}of u)n||=i.length>0,this.#t(i,t,e,r)}return zt(`paintRegion took ${Math.round(performance.now()-r)}ms`),n},a)}async paintCells(e,t,n=1,r=0,i={}){return await this.#n(async()=>await this.paintRegions(tn(e,canvas.grid),t,n,r,{...i,persist:!1}))}async fillRegion([t,n],r,i=1,a=0,{fillMode:o=`applicableBoundary`,paintMode:s=`totalReplace`}={}){let c,l=this.getShapesAtPoint(t,n);if(l.length===1)c=[l[0].toGeoJsonPolygon()];else if(l.length>1)c=(0,S.intersection)(...l.map(e=>e.toGeoJsonPolygon()));else{let{width:e,height:t,padding:n}=canvas.scene,r=e+e*n*2,i=t+t*n*2;c=[[[[0,0],[r,0],[r,i],[0,i]]]]}let u=1/0,d=-1/0,f=1/0,p=-1/0;for(let e of c.flat(2))u=Math.min(u,e[0]),d=Math.max(d,e[0]),f=Math.min(f,e[1]),p=Math.max(p,e[1]);let m=i+a,h=this.getShapes(new PIXI.Rectangle(u,f,d-u,p-f),{collisionTest:({t:e})=>o===`strictBoundary`||!e.terrainType.usesHeight||e.bottom<m&&e.top>=a});for(let e of l)h.delete(e);h.size&&(c=(0,S.difference)(c,...[...h].map(e=>e.toGeoJsonPolygon())));let g=e.#i(c).find(({polygon:e,holes:r})=>e.containsPoint(t,n,{containsOnEdge:!0})&&r.every(e=>!e.containsPoint(t,n,{containsOnEdge:!1})));return g?await this.paintRegions([g],r,i,a,{mode:s}):!1}async eraseRegions(e,{onlyTerrainTypeIds:t,excludingTerrainTypeIds:n,bottom:r,top:i,persist:a=!0}={}){return r??=-1/0,i??=1/0,await this.#n(()=>{let a=!1,o=performance.now();for(let{polygon:o,holes:s}of e){let e=Ft.createSolid(o),c=s?.map(e=>Ft.createHole(e))??[],l=[e.toGeoJsonRing(),...c.map(e=>e.toGeoJsonRing())],u=this.getShapes(e.boundingRect,{collisionTest:({t:e})=>t?.includes(e.terrainTypeId)!==!1&&n?.includes(e.terrainTypeId)!==!0&&(!e.terrainType?.usesHeight||e.top>r&&e.bottom<i)});for(let e of u){let t=e.toGeoJsonPolygon(),n=(0,S.intersection)(t,l);if(!n||n.length===0)continue;a=!0,this.deleteShapes(e);let o=Dt(e.terrainTypeId)?.usesHeight;o&&e.top>i&&this.#t(n,e.terrainTypeId,e.top,i),o&&e.bottom<r&&this.#t(n,e.terrainTypeId,r,e.bottom);let s=(0,S.difference)(t,l);this.#t(s,e.terrainTypeId,e.top,e.bottom)}}return zt(`eraseRegion took ${Math.round(performance.now()-o)}ms`),a},a)}async eraseCells(e,t={}){return await this.#n(async()=>await this.eraseRegions(tn(e,canvas.grid),{...t,persist:!1}))}async eraseShapes(...e){return await this.#n(()=>this.deleteShapes(...e))}async clear(){return await this.#n(()=>this.terrainShapes$.size===0?!1:(this.deleteAllShapes(),!0))}#t(t,n,r,i){let a=[{top:r,bottom:i,polygons:t}];if(Dt(n)?.usesHeight){let o=jt(this.getShapesMulti(e.#i(t).map(e=>e.polygon.boundingRect),{collisionTest:({t:e})=>e.terrainTypeId===n&&e.bottom<=r&&e.top>=i}),e=>`${e.top}|${e.bottom}`,e=>({top:e[0].top,bottom:e[0].bottom,shapes:e,polygons:e.map(e=>e.toGeoJsonPolygon())})),s=new Set;for(let[,e]of o){let t=[],n=(e,n,r)=>{let i=t.find(e=>e.top===n&&e.bottom===r);i?i.polygons.push(...e):t.push({polygons:Array.from(e),top:n,bottom:r})};for(let t of a){let r=(0,S.intersection)(t.polygons,e.polygons);if(r.length===0){n(t.polygons,t.top,t.bottom);continue}n(r,Math.max(e.top,t.top),Math.min(e.bottom,t.bottom)),n((0,S.difference)(t.polygons,e.polygons),t.top,t.bottom),n((0,S.difference)(e.polygons,t.polygons),e.top,e.bottom),e.shapes.forEach(e=>s.add(e))}a=t}this.deleteShapes(...s)}for(let{top:t,bottom:r,polygons:i}of a){let a=new Set(e.#i(i).flatMap(({polygon:{boundingBox:{x1:e,y1:i,w:a,h:o}}})=>[...this.getShapes(new PIXI.Rectangle(e-1,i-1,a+2,o+2),{collisionTest:({t:e})=>e.terrainTypeId===n&&e.top===t&&e.bottom===r})]));i=(0,S.union)(i,Array.from(a,e=>e.toGeoJsonPolygon())),this.deleteShapes(...a),this.addShapes(e.#i(i).map(({polygon:e,holes:i})=>new Vn({polygon:e,holes:i,terrainTypeId:n,top:t,bottom:r})))}}async#n(e,t=!0){if(!t)return await e();let n=this.#r(),i=await e();if(i)for(await canvas.scene.setFlag(r,m.heightData,this.#r()),this.#e.push(n);this.#e.length>10;)this.#e.shift();return i}async undo(){if(this.#e.length<=0)return;let e=this.#e.pop();await canvas.scene.setFlag(r,m.heightData,e),this._reloadData()}#r(){return{v:3,data:{shapes:[...this.terrainShapes$.value].map(e=>e.toObject())}}}static#i(e){return e.length===0?[]:Array.isArray(e[0][0])?e.map(e=>({polygon:new Ft(e[0]),holes:e.slice(1).map(e=>new Ft(e))})):[{polygon:new Ft(e[0]),holes:e.slice(1).map(e=>new Ft(e))}]}},$n=new Map,er=Object.fromEntries(Object.values(p).map(e=>[e,R(!1)]));function tr(){e(p.increaseLosRulerHeight,{name:`KEYBINDINGS.IncreaseLosRulerHeight`,editable:[{key:`Equal`}]}),e(p.decreaseLosRulerHeight,{name:`KEYBINDINGS.DecreaseLosRulerHeight`,editable:[{key:`Minus`}]}),e(p.showTerrainStack,{name:`KEYBINDINGS.ShowTerrainStackViewer`,editable:[{key:`Semicolon`}]}),e(p.toggleTerrainHeightMapOnTokenLayer,{name:`KEYBINDINGS.ToggleTerrainHeightMapOnTokenLayer`,onDown:()=>{let e=!game.settings.get(r,f.showTerrainHeightOnTokenLayer);game.settings.set(r,f.showTerrainHeightOnTokenLayer,e)}});function e(e,t){game.keybindings.register(r,e,{...t,onDown:n=>{er[e].value=!0,$n.get(e)?.forEach(e=>e(n)),t.onDown?.(n)},onUp:n=>{er[e].value=!1,$n.get(e)?.forEach(e=>e(n)),t.onUp?.(n)}})}}function nr(e,t){let n=$n.get(e);n||(n=new Set,$n.set(e,n)),n.add(t)}function rr(e,t){$n.get(e)?.delete(t)}function ir(e,t){e.moveTo(0,0);for(let n of t)switch(n.type){case`m`:e.moveTo(n.x,n.y);break;case`l`:e.lineTo(n.x,n.y);break;case`a`:e.arcTo(n.tx,n.ty,n.x,n.y,n.r);break;default:throw Error(`Unknown command`)}}function ar(e,t,{dashSize:n=20,gapSize:r=void 0,offset:i=0}={}){r??=n;let a=0,o=0;e.moveTo(0,0);let s=!1,c=i%(n+r);for(let i of t)switch(i.type){case`m`:({x:a,y:o}=i),e.moveTo(a,o);break;case`l`:{let t=a,l=o,{x:u,y:d}=i,f=Math.atan2(d-l,u-t),p=Math.cos(f),m=Math.sin(f),h=Math.sqrt((d-l)**2+(u-t)**2),g=h;for(;g>2**-52;){c<=0&&(s=!s,c=s?n:r);let i=h-g,a=Math.min(g,c);g-=a,c-=a,s&&(e.moveTo(t+p*i,l+m*i),e.lineTo(t+p*(i+a),l+m*(i+a)))}e.moveTo(u,d),a=u,o=d;break}case`a`:{let t=a,l=o,{x:u,y:d,r:f}=i,{x:p,y:m}=or(t,l,u,d,f),h=Math.atan2(l-m,t-p),g=Math.atan2(d-m,u-p),_=h,v=(g-h+Math.PI*2)%(Math.PI*2);for(;v>2**-52;){c<=0&&(s=!s,c=s?n:r);let t=c/f,i=Math.min(v,t);v-=i,c-=i*f,s&&(e.moveTo(Math.cos(_)*f+p,Math.sin(_)*f+m),e.arc(p,m,f,_,_+i)),_+=i}e.moveTo(u,d),a=u,o=d;break}default:throw Error(`Unknown command`)}}function or(e,t,n,r,i){let a=n-e,o=r-t,s=(e+n)/2,c=(t+r)/2,l=Math.sqrt(a**2+o**2),u=a/l,d=o/l,f=Math.sqrt(i**2-(l/2)**2),p=-d,m=u;return{x:s+f*p,y:c+f*m}}function sr(e){if(typeof e!=`object`||Array.isArray(e)||e===null)return R(e);let t=Object.fromEntries(Object.entries(e).map(([e,t])=>[e,sr(t)])),n=z(()=>Object.fromEntries(Object.entries(t).map(([e,t])=>[e,t.value])));return new Proxy({},{get(e,r){return r in n?n[r]:t[r]},set(e,n,r){if(n!==`value`)throw TypeError(`Cannot set property "${n}" on a deepSignal`);return it(()=>{for(let[e,n]of Object.entries(r))t[e]&&(t[e].value=n)}),!0}})}function cr(e,t,n){if(n.aborted)return()=>{};let r=e.subscribe(t),i=!1,a=()=>{i||(i=!0,r())};return n.addEventListener(`abort`,a,{once:!0}),()=>{n.removeEventListener(`abort`,a),a()}}function lr(e,t){if(t.aborted)return()=>{};let n=bt(e),r=!1,i=()=>{r||(r=!0,n())};return t.addEventListener(`abort`,i,{once:!0}),()=>{t.removeEventListener(`abort`,i),i()}}let G=sr({p1:void 0,h1:1,p2:void 0,h2:void 0}),K=sr({token1:void 0,h1:0,token2:void 0,h2:0}),ur=R(!1),dr=R(),fr=R();function pr(e){dr.value=e.control.name,fr.value=e.tool.name}function mr(e,t){let n=Math.min(e.x,t.x),r=Math.max(e.x,t.x),i=Math.min(e.y,t.y),a=Math.max(e.y,t.y);return new PIXI.Rectangle(n,i,r-n,a-i)}let{Token:hr}=foundry.canvas.placeables;function gr(e){if(game.modules.get(`wall-height`)?.active===!0){let t=+e.flags[`wall-height`]?.tokenHeight;if(!Number.isNaN(t)&&t>0)return Math.floor(t*2)/2}switch(game.system.id){case`lancer`:return e.actor?.system?.size??e.width;default:return e.width}}function _r(e,t,n=1,r=1){if(!(e instanceof hr||Ht(e)))throw Error("`token1` is not a Token or Point3D");if(!(t instanceof hr||Ht(t)))throw Error("`token2` is not a Token or Point3D");if(e===t)throw Error(`Cannot draw line of sight from a token to itself.`);if(!(e instanceof hr)&&!(t instanceof hr))return{left:[e,t],centre:[e,t],right:[e,t]};if(e instanceof hr&&!e.parent||t instanceof hr&&!t.parent)return null;let i=e instanceof hr?{x:e.x+e.w/2,y:e.y+e.h/2}:e,a=t instanceof hr?{x:t.x+t.w/2,y:t.y+t.h/2}:t,o=new Pt(i,a),[s,c]=vr(e,o),[l,u]=vr(t,o),d=e instanceof hr?e.document.elevation+gr(e.document)*n:e.h,f=t instanceof hr?t.document.elevation+gr(t.document)*r:t.h;return{left:[{...s,h:d},{...l,h:f}],centre:[{...i,h:d},{...a,h:f}],right:[{...c,h:d},{...u,h:f}]}}function vr(e,t){if(!(e instanceof hr))return[e,e];if(canvas.grid.type===CONST.GRID_TYPES.GRIDLESS&&e.document.width===e.document.height){let n=-t.uy,r=t.ux,i=e.w/2,a=e.x+i,o=e.y+i;return[{x:a-n*i,y:o-r*i},{x:a+n*i,y:o+r*i}]}if(canvas.grid.isHexagonal)return o(yr(e.getShape().points).map(({x:t,y:n})=>({x:Math.round(t+e.x),y:Math.round(n+e.y)})));let{x:n,y:r}=e.document,{width:i,height:a}=e.getShape();return o([{x:n,y:r},{x:n+i,y:r},{x:n+i,y:r+a},{x:n,y:r+a}]);function o(e){let n=e.map(({x:e,y:n})=>({x:e,y:n,...t.findClosestPointOnLineTo(e,n)})).sort((e,t)=>t.distanceSquared-e.distanceSquared);return[n.find(e=>e.side===1),n.find(e=>e.side===-1)]}}function yr(e,t=0,n=0){let r=[];for(let i=0;i<e.length;i+=2)r.push({x:e[i]+t,y:e[i+1]+n});return r}let{Token:br}=foundry.canvas.placeables,{CanvasLayer:xr}=foundry.canvas.layers,{PreciseText:Sr}=foundry.canvas.containers,{KeyboardManager:Cr}=foundry.helpers.interaction;var wr=class extends xr{#e=new Map;#t=void 0;constructor(){super(),this.eventMode=`static`,K.value={h1:game.settings.get(r,f.defaultTokenLosTokenHeight),h2:game.settings.get(r,f.defaultTokenLosTokenHeight)},Hooks.on(`userConnected`,e=>this._clearLineOfSightRays({userId:e.id,group:o,clearForOthers:!1})),bt(()=>{let{p1:e,h1:t,p2:n,h2:r}=G.value;e&&n?this._drawLineOfSightRays([{a:{...e,h:t},b:{...n,h:r??t},includeNoHeightTerrain:ur.value}],{group:o,drawForOthers:!0}):this._clearLineOfSightRays({group:o,clearForOthers:!0})}),G.h1.subscribe(e=>{this.#t&&(this.#t.height=e)}),bt(()=>this._updateTokenLineOfSightRulers()),Hooks.on(`updateToken`,e=>{let{token1:t,token2:n}=K.value;(t?.id===e.id||n?.id===e.id)&&this._updateTokenLineOfSightRulers()}),bt(()=>{this.hitArea=dr.value===`tokens`&&fr.value===u.lineOfSight?canvas.dimensions.rect:PIXI.Rectangle.EMPTY}),bt(()=>{this.#t&&(this.#t.visible=this.#n&&!G.value.p1)})}static get current(){return canvas.terrainHeightLosRulerLayer}get zIndex(){return 900}get#n(){return fr.value===u.lineOfSight}get#r(){return G.p1.value!==void 0}async _draw(){this.#s(!0),this.#t=this.addChild(new Dr(Color.from(game.user.color))),this.#t.height=G.value.h1,this.#t.visible=!1}async _tearDown(){await super._tearDown(),this.#s(!1),this.#i(),this.removeChild(this.#t)}_drawLineOfSightRays(e,{group:t=`default`,userId:n=void 0,sceneId:r=void 0,drawForOthers:a=!0}={}){if(n??=game.userId,r??=canvas.scene.id,r!==canvas.scene.id)return;let o=this.#o(n,t),s=this.#e.get(o);s||(s=new Tr(Color.from(game.users.get(n).color)),this.addChild(s),this.#e.set(o,s)),s._updateConfig(e.map(e=>({...e,a:typeof e.a==`string`?canvas.tokens.get(e.a):e.a,b:typeof e.b==`string`?canvas.tokens.get(e.b):e.b}))),a&&n===game.userId&&this.#a&&game.socket.emit(i,{func:_.drawLineOfSightRay,args:[e.map(e=>({...e,a:e.a instanceof br?e.a.id:e.a,b:e.b instanceof br?e.b.id:e.b})),{group:t,userId:n,sceneId:r,drawForOthers:!1}]})}_clearLineOfSightRays({group:e=`default`,userId:t=void 0,clearForOthers:n=!0}={}){t??=game.userId;let r=this.#o(t,e),a=this.#e.get(r);a&&(this.removeChild(a),this.#e.delete(r)),n&&t===game.userId&&this.#a&&game.socket.emit(i,{func:_.clearLineOfSightRay,args:[{group:e,userId:game.userId,clearForOthers:!1}]})}_updateTokenLineOfSightRulers(){let{token1:e,h1:t,token2:n,h2:r}=K.value;e&&n?this._drawLineOfSightRays([{a:e,ah:t,b:n,bh:r,includeNoHeightTerrain:ur.value}],{group:o,drawForOthers:!0}):this._clearLineOfSightRays({group:o,clearForOthers:!0})}#i(){this.#e.forEach(e=>this.removeChild(e)),this.#e.clear(),G.value={p1:void 0,p2:void 0},K.value={token1:void 0,token2:void 0}}get#a(){return game.settings.get(r,game.user.isGM?f.displayLosMeasurementGm:f.displayLosMeasurementPlayer)}_autoSelectTokenLosTargets(){if(game.settings.get(`terrain-height-tools`,f.tokenLosToolPreselectToken1)){let e=canvas.tokens.controlled?.[0]??game.user.character?.getActiveTokens()?.[0];!e&&game.system.id===`lancer`&&game.user.character?.type===`pilot`&&(e=game.user.character.system.active_mech?.value?.getActiveTokens()?.[0]),e&&(K.token1.value=e)}if(game.settings.get(`terrain-height-tools`,f.tokenLosToolPreselectToken2)){let e=game.user.targets.first();e&&K.token1.value!==e&&(K.token2.value=e)}}#o(e,t){return`${e}|${t}`}_onTokenRefresh=e=>{for(let t of this.#e.values())t._onTokenRefresh(e)};#s(e){let t=e?`on`:`off`;this[t](`pointerdown`,this.#c),this[t](`pointermove`,this.#l),this[t](`pointerup`,this.#u),(e?nr:rr)(p.increaseLosRulerHeight,this.#f),(e?nr:rr)(p.decreaseLosRulerHeight,this.#p),Hooks[t](`refreshToken`,this._onTokenRefresh)}#c=e=>{if(!this.#n||e.button!==0)return;let[t,n]=this.#d(e);G.value={p1:{x:t,y:n},p2:{x:t,y:n}}};#l=foundry.utils.throttle(e=>{if(!this.#n)return;let[t,n]=this.#d(e);this.#t.visible&&this.#t.position.set(t,n),this.#r&&(G.p2.value.x!==t||G.p2.value.y!==n)&&(G.p2.value={x:t,y:n})},1e3/60);#u=e=>{!this.#n||!this.#r||e.button!==0||(G.value={p1:void 0,p2:void 0})};#d(e){let{x:t,y:n}=this.toLocal(e.data.global);if(!(canvas.grid.type!==CONST.GRID_TYPES.GRIDLESS&&!game.keyboard.isModifierActive(Cr.MODIFIER_KEYS.SHIFT)))return[t,n];let{i:r,j:i}=canvas.grid.getOffset({x:t,y:n}),a=[qt(r,i),...Kt(r,i)].map(({x:e,y:r})=>[e,r,(e-t)**2+(r-n)**2]).sort((e,t)=>e[2]-t[2])[0];return[a[0],a[1]]}#f=e=>{e.up||this.#m(1)};#p=e=>{e.up||this.#m(-1)};#m(e){if(!this.#n)return;let t=t=>e<0&&t>.5&&t<=1||e>0&&t>=0&&t<.5?.5:t%1==0?Math.max(t+Math.sign(e),0):e<0?Math.floor(t):Math.ceil(t);this.#r?G.h2.value=t(G.h2.value??G.h1.value):G.h1.value=t(G.h1.value)}},Tr=class extends PIXI.Container{#e=[];#t;#n=new Set;#r=-1;constructor(e=16777215){super(),this.#t=e}_updateConfig(e){if(!Array.isArray(e))throw Error("Expected `rulers` to be an array.");for(let t=0;t<e.length;t++){if(!(e[t].a instanceof br||Ht(e[t].a)))throw Error(`\`rulers[${t}].a\` is not a Token or a Point3D (object with x, y and h numbers)`);if(!(e[t].b instanceof br||Ht(e[t].b)))throw Error(`\`rulers[${t}].b\` is not a Token or a Point3D (object with x, y and h numbers)`)}for(;this.#e.length>e.length;)this.#e.pop().rulers.forEach(e=>this.removeChild(e));for(;this.#e.length<e.length;)this.#e.push({config:{},rulers:[]});for(let t=0;t<e.length;t++)this.#e[t].config={...e[t]},this.#i(this.#e[t])}#i({config:e,rulers:t}){let n=(e.a instanceof br||e.b instanceof br)&&e.includeEdges!==!1?3:1;for(;t.length>n;)this.removeChild(t.pop());for(;t.length<n;)t.push(this.addChild(new Er(this.#t)));let r=_r(e.a,e.b,e.ah,e.bh);r&&(t[0].updateRuler(r.centre[0],r.centre[1],e.includeNoHeightTerrain??!1,!0),n===3&&(t[1].updateRuler(r.left[0],r.left[1],e.includeNoHeightTerrain??!1,!1),t[2].updateRuler(r.right[0],r.right[1],e.includeNoHeightTerrain??!1,!1)))}_onTokenRefresh(e){this.#n.add(e),this.#r===-1&&(this.#r=setTimeout(()=>{this.#a(),this.#r=-1},66.66666666666667))}#a(){for(let e of this.#e)(this.#n.has(e.config.a)||this.#n.has(e.config.b))&&this.#i(e);this.#n.clear()}},Er=class extends PIXI.Container{#e;#t;#n=!1;#r=[];#i;#a;#o;constructor(e=16777215){super(),this.#i=this.addChild(new PIXI.Graphics),this.#a=this.addChild(new Dr(e)),this.#o=this.addChild(new Dr(e))}set showLabels(e){this.#a.showLabels=e,this.#o.showLabels=e}updateRuler(e,t,n,r=void 0){let i=!1;(e.x!==this.#e?.x||e.y!==this.#e?.y||e.h!==this.#e?.h)&&(this.#e={...e},i=!0),(t.x!==this.#t?.x||t.y!==this.#t?.y||t.h!==this.#t?.h)&&(this.#t={...t},i=!0),n!==this.#n&&(this.#n=n,i=!0),i&&(this._recalculateLos(),this._draw()),typeof r==`boolean`&&(this.showLabels=r)}_recalculateLos(){let e=Vn.calculateLineOfSight(qn(mr(this.#e,this.#t)),this.#e,this.#t,{includeNoHeightTerrain:this.#n});this.#r=Vn.flattenLineOfSightIntersectionRegions(e)}_draw(){this.#i.clear();let e=xt.value;this.#i.lineStyle({color:0,alpha:.5,width:6}).moveTo(this.#e.x,this.#e.y).lineTo(this.#t.x,this.#t.y);let t=t=>{let n=Ot(e.get(t)??{});this.#i.lineStyle({color:n,alpha:.75,width:4})},{h:n,...r}=this.#e;for(let e of this.#r){if((r.x!==e.start.x||r.y!==e.start.y)&&this.#i.lineStyle({color:16777215,alpha:.75,width:4}).moveTo(r.x,r.y).lineTo(e.start.x,e.start.y),e.skimmed)t(e.shapes[0].terrainTypeId),this.#i.moveTo(e.start.x,e.start.y).lineTo(e.end.x,e.end.y);else{let n=[...new Set(e.shapes.map(e=>e.terrainTypeId))],r=8*n.length-4;for(let i=0;i<n.length;i++)t(n[i]),ar(this.#i,[{type:`m`,x:e.start.x,y:e.start.y},{type:`l`,x:e.end.x,y:e.end.y}],{dashSize:r,offset:8*i})}r=e.end}(r.x!==this.#t.x||r.y!==this.#t.y)&&this.#i.lineStyle({color:16777215,alpha:.75,width:4}).moveTo(r.x,r.y).lineTo(this.#t.x,this.#t.y),this.#a.height=this.#e.h,this.#a.position.set(this.#e.x,this.#e.y),this.#o.height=this.#t.h,this.#o.position.set(this.#t.x,this.#t.y)}},Dr=class extends PIXI.Container{#e;constructor(e=16777215){super(),this.#e=this.addChild(new Sr(``,CONFIG.canvasTextStyle.clone())),this.#e.anchor.set(0,.5),this.#e.position.set(10,0),this.#e.style.fill=e,this.addChild(new PIXI.Graphics).beginFill(e,.5).lineStyle({color:0,alpha:.25,width:2}).drawCircle(0,0,6)}set height(e){this.#e.text=`H${Vt(U(e))}`}set showLabels(e){this.#e.visible=e}};
/**
* @license
* Copyright 2023 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let Or=mn(class extends Sn{render(e){var t;if(e!==this._$Oi){(t=this._$Oo)==null||t.call(this),this._$Oi=e;let n=!0;this._$Oo=e.subscribe((e=>{!1===n&&this.setValue(e)})),n=!1}return e.peek()}disconnected(){var e;(e=this._$Oo)==null||e.call(this)}reconnected(){this._$Oo=this._$Oi?.subscribe((e=>{this.setValue(e)}))}}),q=(e=>(t,...n)=>e(t,...n.map((e=>e instanceof L?Or(e):e))))(N),J=mn(class extends hn{constructor(e){if(super(e),e.type!==pn.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return Ie}}),kr=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Ar=mn(class extends hn{constructor(e){if(super(e),e.type!==pn.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=dn(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=cn(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=cn(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=cn(i[d],a[m]),sn(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=cn(i[f],a[p]),sn(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=kr(o,p,m),u=kr(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=sn(e,i[d]);cn(t,a[p]),c[p]=t}else c[p]=cn(n,a[p]),sn(e,i[d],n),i[t]=null;p++}else fn(i[f]),f--;else fn(i[d]),d++;for(;p<=m;){let t=sn(e,c[m+1]);cn(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&fn(e)}return this.ut=o,un(e,c),Ie}}),jr=`important`;``+jr;
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let Mr=mn(class extends hn{constructor(e){if(super(e),e.type!==pn.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(` !important`);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?jr:``):n[e]=r}}return Ie}});
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var Nr=class extends hn{constructor(e){if(super(e),this.it=P,e.type!==pn.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===P||e==null)return this._t=void 0,this.it=e;if(e===Ie)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Nr.directiveName=`unsafeHTML`,Nr.resultType=1;let Pr=mn(Nr),Fr=Symbol(`noGroup`);function Ir(e,{selected:t,labelSelector:n,valueSelector:r,groupSelector:i,localize:a=!0,sort:o=!1}={}){Array.isArray(e)?(n??=`label`,r??=`value`,i??=`group`):(e=Object.entries(e),n??=1,r??=0);let s=e.map(e=>{let o=typeof n==`function`?n(e):e[n],s=typeof r==`function`?r(e):e[r],c=typeof i==`function`?i(e):e[i];return{label:a?game.i18n.localize(o):o,value:s,group:c,selected:t===s}});o&&s.sort((e,t)=>e.label.localeCompare(t.label));let c=s.reduce((e,t)=>{let n=t.group?.length?t.group:Fr;return e[n]??=[],e[n].push(N`<option value=${t.value} ?selected=${t.selected}>${t.label}</option>`),e},{});return[...c[Fr]??[],...Object.entries(c).filter(([e])=>e!==Fr).map(([e,t])=>N`
				<optgroup label=${a?game.i18n.localize(e):e}>
					${t}
				</optgroup>
			`)]}
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let Lr=()=>new Rr;var Rr=class{};let zr=new WeakMap,Br=mn(class extends Sn{render(e){return P}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),P}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=zr.get(t);n===void 0&&(n=new WeakMap,zr.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?zr.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Vr=mn(class extends Sn{#e;#t;#n;#r;#i=null;render(e,t){return P}update(e,[t,n]){return this.#e=e.element,this.#t=t,this.#n=Pn(t.keyframes),this.#r=n,this.#i&&cancelAnimationFrame(this.#i),this.#i=requestAnimationFrame(this.#a),Ie}reconnected(){this.#i&&cancelAnimationFrame(this.#i),this.#i=requestAnimationFrame(this.#a)}disconnected(){this.#i&&cancelAnimationFrame(this.#i),this.#i=null}#a=()=>{if(!this.isConnected||!this.#e||this.#t.duration<=0||this.#t.keyframes.length===0)return;let{color:e,alpha:t}=Fn(this.#n,this.#t.duration,this.#t.easingFunc,Date.now());e=An(e,t);let n=e>>16&255,r=e>>8&255,i=e&255;this.#e.style.setProperty(this.#r,`rgb(${n} ${r} ${i} / ${Math.round(t*1e4)/100}%)`),this.#i=requestAnimationFrame(this.#a)}});var Hr=class extends et{static properties={disabled:{type:Boolean},_isOpen:{state:!0}};static dropdownClasses=``;_internals;#e=null;constructor(){super(),this._internals=this.attachInternals(),this.disabled=!1,this._isOpen=!1,this.classList.add(`dropdown-fwl`)}get dropdownElement(){return this.#e}render(){return N`
			<div
				class=${J({"dropdown-button-fwl":!0,"dropdown-button-fwl-disabled":this.disabled})}
				@mousedown=${()=>this.toggle()}
			>
				${this._renderButton()}
				<i class="fas fa-chevron-down"></i>
			</div>
		`}open(){this.dispatchEvent(new Event(`open`,{cancelable:!0}))&&(this._isOpen=!0,this._internals.states.add(`is-open`),game.tooltip.deactivate())}close(){this.dispatchEvent(new Event(`close`,{cancelable:!0}))&&(this._internals.states.delete(`is-open`),this._isOpen=!1)}toggle(){this._isOpen?this.close():this.open()}_renderButton(){throw Error(`Must be overriden in a derived subclass.`)}_renderDropdown(){throw Error(`Must be overriden in a derived subclass.`)}#t(){if(!this._isOpen||this.disabled){this.#e?.remove(),this.#e=null;return}this.#e||(this.#e=document.createElement(`div`),this.#e.classList.add(`dropdown-container-fwl`,`application`,...(this.dropdownClasses??``).split(` `).filter(Boolean),...(this.constructor.dropdownClasses??``).split(` `).filter(Boolean)),document.body.appendChild(this.#e)),Qe(this._renderDropdown(),this.#e)}#n(){if(!this.#e)return;let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect(),{width:i,height:a}=this.#e.getBoundingClientRect();Object.assign(this.#e.style,{top:e+r+a>window.innerHeight?`${e-a}px`:`${e+r}px`,left:t+i>window.innerWidth?`${t+n-i}px`:`${t}px`,minWidth:`${n}px`})}connectedCallback(){super.connectedCallback(),document.body.addEventListener(`pointerdown`,this.#r)}update(e){super.update(e),this.#t()}updated(){Promise.resolve().then(()=>this.#n())}disconnectedCallback(){super.disconnectedCallback(),this.#e?.remove(),document.body.removeEventListener(`pointerdown`,this.#r)}#r=e=>{this._isOpen&&(e.target.closest(`.dropdown-container-fwl`)===this.#e||e.target.closest(this.tagName)===this||this.close())};createRenderRoot(){return this}},Ur=class extends et{static properties={_rawValue:{state:!0}};static formAssociated=!0;#e=foundry.utils.randomID();#t;#n=Lr();#r=Lr();constructor(){super(),this.#t=this.attachInternals(),this._rawValue={h:0,s:100,v:100,a:100}}get name(){return this.getAttribute(`name`)}set name(e){this.setAttribute(`name`,e)}get form(){return this.#t.form}get value(){return Tn(this._rawValue)}set value(e){let t=wn(e);t&&(this._rawValue=t)}render(){let e=this._rawValue,t=Tn(e),n=Dn(t);return N`
			<div class="color-picker-fwl-interactive">
				<div
					class="color-picker-fwl-color-space"
					tabindex="0"
					@pointerdown=${this.#i}
					style=${Mr({"--current-color-hue":e.h})}
					${Br(this.#r)}
				>
					<div
						class="color-picker-fwl-color-space-thumb"
						style=${Mr({top:Math.round((100-e.v)*100)/100+`%`,left:Math.round(e.s*100)/100+`%`})}
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
							style=${Mr({"--current-color-rgb":`${t.r} ${t.g} ${t.b}`})}
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
						.value=${document.activeElement===this.#n.value?Ie:n}
						@input=${this.#c}
						@blur=${()=>this.requestUpdate()}
						${Br(this.#n)}
					>
				</div>

				${[`r`,`g`,`b`].map(e=>N`
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
		`}#i(e){let{body:t}=document;e.target.focus(),this.#a(e),t.addEventListener(`pointermove`,this.#a),t.addEventListener(`pointerup`,()=>{t.removeEventListener(`pointermove`,this.#a),this.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!1,composed:!0}))},{once:!0})}#a=e=>{if(!this.#r.value)return;e.preventDefault(),e.stopImmediatePropagation();let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.#r.value.getBoundingClientRect(),s=Math.max(Math.min(t-r,a),0),c=Math.max(Math.min(n-i,o),0),{h:l,a:u}=this._rawValue,d=100*s/a,f=100*(1-c/o);this.#l({h:l,s:d,v:f,a:u})};#o(e,t){e.preventDefault(),e.stopImmediatePropagation(),this.#l({...this._rawValue,[t]:+e.currentTarget.value})}#s(e,t){e.preventDefault(),e.stopImmediatePropagation();let n=Tn(this._rawValue);this.#l({...n,[t]:+e.currentTarget.value})}#c(e){let t=e.currentTarget.value,n=En(t);n&&(this._rawValue=wn(n))}#l(e,t){t?.preventDefault(),t?.stopImmediatePropagation(),typeof e==`string`&&(e=En(e)),`r`in e&&(e=wn(e)),this._rawValue=e,this.#t.setFormValue(JSON.stringify(this.value)),this.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!1,composed:!0}))}createRenderRoot(){return this}};customElements.get(`color-picker-fwl`)||customElements.define(`color-picker-fwl`,Ur);let Wr=`color-animation-editor-fwl`,Gr=e=>game.i18n.localize(e);var Kr=class extends Hr{static properties={value:{type:Object},_selectedKeyframeIndex:{state:!0}};static dropdownClasses=`color-animation-editor-dropdown-fwl`;static formAssociated=!0;#e=Lr();constructor(){super(),this.value={duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.4,position:0},{color:255,alpha:.4,position:1}]},this._selectedKeyframeIndex=0}get name(){return this.getAttribute(`name`)}set name(e){this.setAttribute(`name`,e)}get form(){return this._internals.form}_renderButton(){return N`
			<div
				class="color-animation-editor-fwl-preview-bar"
				${Vr(this.value,`--current-color`)}
			></div>
		`}_renderDropdown(){let e=this.value.keyframes.map(({color:e,alpha:t,position:n})=>{let{r,g:i,b:a}=On(e);return{r,g:i,b:a,alpha:t,position:n}}),t=e.map(e=>`rgb(${e.r} ${e.g} ${e.b} / ${Math.round(e.alpha*1e4)/100}%) ${Math.round(e.position*1e4)/100}%`).join(`, `),n=this.value.keyframes[this._selectedKeyframeIndex];return N`
			<div class="flexrow">
				<input
					type="number"
					min="1"
					step="1"
					.value=${this.value.duration}
					@input=${e=>this.#a({duration:+e.target.value})}
					@blur=${()=>this.#u()}
					style="margin-right: 0.5rem"
				>
				<span>ms</span>

				<button
					class=${J({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`linear`})}
					@click=${()=>this.#a({easingFunc:`linear`})}
					data-tooltip=${Gr(`GRIDAWAREAURAS.EasingLinear`)}
				>
					<svg viewBox="-10 -10 120 120">
						<path d="M0,100 L100,0" />
					</svg>
				</button>
				<button
					class=${J({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeInCubic`})}
					@click=${()=>this.#a({easingFunc:`easeInCubic`})}
					data-tooltip=${Gr(`GRIDAWAREAURAS.EasingEaseIn`)}
				>
					<svg viewBox="-10 -10 120 120">
						<path d="M0,100 C32,100 67,100 100,0" />
					</svg>
				</button>
				<button
					class=${J({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeOutCubic`})}
					@click=${()=>this.#a({easingFunc:`easeOutCubic`})}
					data-tooltip=${Gr(`GRIDAWAREAURAS.EasingEaseOut`)}
				>
					<svg viewBox="0 0 100 100">
						<path d="M 0,100 C 33,0 68,0 100,0" />
					</svg>
				</button>
				<button
					class=${J({"color-animation-editor-fwl-ease-button":!0,"btn-active-fwl":this.value.easingFunc===`easeInOutCubic`})}
					@click=${()=>this.#a({easingFunc:`easeInOutCubic`})}
					data-tooltip=${Gr(`GRIDAWAREAURAS.EasingEaseInOut`)}
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
					style=${Mr({"--gradient-stops":t})}
					@mousedown=${e=>this.#r(e)}
					${Br(this.#e)}
				></div>

				<div
					class="color-animation-editor-fwl-preview-tracker"
					style=${qr(this.value)}
				></div>

				${e.map(({r:e,g:t,b:n,position:r},i)=>N`
					<div
						class=${J({"color-animation-editor-fwl-preview-thumb":!0,active:this._selectedKeyframeIndex===i})}
						style=${Mr({left:`${r*100}%`,"--current-color-rgb":`${e} ${t} ${n}`})}
						@mousedown=${e=>this.#t(e,i)}
						@contextmenu=${()=>this.#i(i)}
					></div>
				`)}
			</div>

			<div class="color-animation-editor-fwl-preview-thumb-properties-track">
				<div
					class="color-animation-editor-fwl-preview-thumb-properties"
					${Br(e=>this.#d(e))}
				>
					<input
						type="number"
						min="0"
						max="100"
						step="1"
						.value=${Math.round(n.position*100)}
						@input=${e=>this.#o({position:Math.min(Math.max(e.target.value/100,0),1)})}
						@blur=${()=>this.#u()}
					>
					<span>%</span>

					<!-- <button
						type="button"
						@click=${()=>this.#i(this._selectedKeyframeIndex)}
					>
						<i class="fas fa-trash m-0"></i>
					</button> -->
				</div>
			</div>

			<color-picker-fwl
				.value=${{...On(n.color),a:n.alpha*255}}
				@input=${e=>this.#s(e.currentTarget.value)}
				@change=${()=>this.#u()}
			></color-picker-fwl>
		`}#t(e,t){e.preventDefault(),e.stopPropagation(),this._selectedKeyframeIndex=t,this.#c()}#n=e=>{let{x:t,width:n}=this.#e.value.getBoundingClientRect(),r=(e.clientX-t)/n;this.#o({position:Math.max(Math.min(r,1),0)})};#r(e){let t=e.offsetX/e.target.clientWidth,{color:n,alpha:r,insertIndex:i}=Fn(this.value.keyframes,1,`linear`,t);this.#l({...this.value,keyframes:this.value.keyframes.toSpliced(i,0,{color:n,alpha:r,position:t})}),this.#u(),this._selectedKeyframeIndex=i,this.#c()}#i(e){typeof e!=`number`||this.value.keyframes.length<=1||(this.#l({...this.value,keyframes:this.value.keyframes.toSpliced(e,1)}),this.#u(),this._selectedKeyframeIndex=Math.max(e-1,0))}#a(e){this.#l({...this.value,...e})}#o(e){if(typeof this._selectedKeyframeIndex!=`number`)return;let t=[...this.value.keyframes],n=t[this._selectedKeyframeIndex];Object.assign(n,e),`position`in e&&(t.sort((e,t)=>e.position-t.position),this._selectedKeyframeIndex=t.indexOf(n)),this.#l({...this.value,keyframes:t})}#s({r:e,g:t,b:n,a:r}){let i=e<<16|t<<8|n;this.#o({color:i,alpha:r/255})}#c(){let{body:e}=document;e.addEventListener(`pointermove`,this.#n),e.addEventListener(`pointerup`,()=>{e.removeEventListener(`pointermove`,this.#n),this.#u()},{once:!0})}#l(e){this.value=e,this._internals.setFormValue(JSON.stringify(e)),this.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!1,composed:!0}))}#u(){this.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!1,composed:!0}))}#d(e){e&&Promise.resolve().then(()=>{let{width:t}=e.getBoundingClientRect(),n=this.value.keyframes[this._selectedKeyframeIndex];e.style.left=`min(max(calc(${n.position*100}% - ${t/2}px), 0px), calc(100% - ${t}px))`})}};customElements.get(Wr)||customElements.define(Wr,Kr);let qr=mn(class extends Sn{#e;#t=null;render(e){this.#e=e,this.#t&&cancelAnimationFrame(this.#t),this.#t=requestAnimationFrame(this.#n)}reconnected(){this.#t&&cancelAnimationFrame(this.#t),this.#t=requestAnimationFrame(this.#n)}disconnected(){this.#t&&cancelAnimationFrame(this.#t),this.#t=null}#n=()=>{if(!this.isConnected||this.#e.duration<=0)return;let e=Date.now()/this.#e.duration%1,t=Cn[this.#e.easingFunc];this.setValue(`left: ${Math.round(t(e)*1e4)/100}%`),this.#t=requestAnimationFrame(this.#n)}}),Jr=`context-menu-fwl`,Yr;var Xr=class e extends et{static properties={items:{type:Array}};static active;_subMenu;#e;constructor(){super(),this.items=[],this._parentMenu=void 0,this._parentMenuItem=void 0}render(){return N`
			<menu class="dropdown-menu-fwl dropdown-menu-fwl-hover" @mousedown=${this.#n}>
				${this.items.map(this.#t)}
			</menu>
		`}#t=(e,t)=>{switch(e.type){case`separator`:return N`<li class="dropdown-menu-fwl-separator"></li>`;case`header`:return N`<li class="dropdown-menu-fwl-header">
					<span>${e.label}</span>
				</li>`;default:return N`<li class="dropdown-menu-fwl-item" data-item-index=${t}>
					${F(e.icon,e=>N`<i class=${e}></i>`)}
					<div class="flexcol">
						<span>${e.label}</span>
						${F(e.hint,e=>N`<span class="dropdown-menu-fwl-item-hint">${e}</span>`)}
					</div>
					${F(e.children?.length,()=>N`<i class="fas fa-caret-right dropdown-menu-fwl-item-caret"></i>`)}
				</li>`}};updated(){let{top:e,left:t,width:n,height:r}=this.getBoundingClientRect();if(e+r>window.innerHeight){let t=this._parentMenuItem?.getBoundingClientRect()?.height??0;this.style.top=`${e-r+t}px`}if(t+n>window.innerWidth){let e=this._parentMenu?.getBoundingClientRect()?.width??0;this.style.left=`${t-n-e}px`}}connectedCallback(){if(super.connectedCallback(),!this._parentMenu){this.#e=new AbortController;let{signal:e}=this.#e;document.addEventListener(`mousedown`,this.#i,{signal:e}),document.addEventListener(`keydown`,this.#r,{signal:e})}}disconnectedCallback(){super.disconnectedCallback(),this.#e?.abort()}#n=t=>{let n=+t.target.closest(`[data-item-index]`)?.dataset.itemIndex;if(isNaN(n))return;let r=this.items[n];if(r.children?.length){this._subMenu?.close();let n=t.target.closest(`li`),{y:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect();this._subMenu=e.open({x:a+o,y:i},r.children,{parentMenu:this,parentMenuItem:n})}else r.onClick?.(),this.close()};#r=e=>{e.key===`Escape`&&this.close()};#i=e=>{setTimeout(()=>{this._isTargetInside(e.target)||this.close()},1)};close(){this.parentElement&&this.remove(),this._subMenu?.close(),this._parentMenu?._subMenu===this&&(this._parentMenu._subMenu=void 0)}_isTargetInside(e){return e===this||this.contains(e)||!!this._subMenu?._isTargetInside(e)}createRenderRoot(){return this}static open(e,t,{parentMenu:n,parentMenuItem:r}={}){Yr||(Yr=document.createElement(`div`),Yr.id=`context-menu-fwl-container`,document.body.appendChild(Yr));let i=e instanceof Event?{x:e.clientX,y:e.clientY}:e,a=document.createElement(Jr);return a.items=t.filter(Boolean),a._parentMenu=n,a._parentMenuItem=r,a.style.left=`${i.x}px`,a.style.top=`${i.y}px`,Yr.appendChild(a),a}};customElements.get(`context-menu-fwl`)||customElements.define(Jr,Xr);function Zr({name:e,value:t,placeholder:n}={}){return Pr(`<color-picker
		name="${e}"
		value="${t}"
		${n?`placeholder="${n}"`:``}
	></color-picker>`)}function Qr({name:e=`range`,value:t,min:n,max:r,step:i}={}){return Pr(`<range-picker
		name="${e}"
		value="${t}"
		min="${n}"
		max="${r}"
		step="${i}"
	></range-picker>`)}let{ApplicationV2:$r}=foundry.applications.api,ei=e=>game.i18n.localize(e),ti;var ni=class e extends Ln($r){#e;#t;constructor(e,t){super(),this.#e=e,this.#t=t,ti??=fetch(`modules/terrain-height-tools/presets/index.json`).then(e=>e.json())}static DEFAULT_OPTIONS={id:`tht_terrainTypesPresets`,window:{title:`TERRAINHEIGHTTOOLS.ImportTerrainTypesPreset`,resizable:!0},position:{width:720},form:{closeOnSubmit:!1}};async _renderHTML(){let e=await ti;return N`
			<p class="flex0">${ei(`TERRAINHEIGHTTOOLS.ImportTerrainTypesPresetHint`)}</p>

			<ul class="preset-list">
				${e.map(e=>N`
					<li
						class="flexcolumn"
						style=${Mr({backgroundImage:e.image?`url(modules/terrain-height-tools/presets/${e.image})`:``})}
					>
						<div class="preset-header">
							<p style="margin: 0;">
								<span class="preset-name">${e.name}</span>
								<span class="preset-author">by ${e.submittedBy}</span>
							</p>
							<p class="preset-description" style="margin: 0;">${e.description}</p>
						</div>

						<div style="flex-grow:1">&nbsp;</div>

						<div class="preset-import-buttons">
							<button @click=${()=>this.#n(e,!1)}>
								<i class='fas fa-upload'></i>
								${ei(`TERRAINHEIGHTTOOLS.ImportCombine`)}
							</button>
							<button @click=${()=>this.#n(e,!0)}>
								<i class='fas fa-upload'></i>
								${ei(`TERRAINHEIGHTTOOLS.ImportReplace`)}
							</button>
						</div>
					</li>
				`)}
			</ul>

			<footer clas="form-footer">
				<button type="button" data-action="close">
					<i class="fas fa-times"></i>
					<label>${ei(`Close`)}</label>
				</button>
			</footer>
		`}async close(e={}){return e.result?this.#e(e.result):this.#t(),super.close(e)}async#n(e,t){let n=e.file,i=await(await fetch(`modules/${r}/presets/${n}`)).json();this.close({result:{data:i,replace:t}})}static async show(){return new Promise((t,n)=>new e(t,n).render(!0))}};let{ApplicationV2:ri,DialogV2:ii}=foundry.applications.api,{FontConfig:ai}=foundry.applications.settings.menus,{FormDataExtended:oi}=foundry.applications.ux,Y=e=>game.i18n.localize(e);var si=class extends Ln(ri){static DEFAULT_OPTIONS={id:`tht_terrainTypesConfig`,tag:`form`,classes:[`sheet`],window:{title:`SETTINGS.TerrainTypes.Button`,contentClasses:[`standard-form`],resizable:!0},position:{width:820,height:720},form:{handler:this.#i,submitOnChange:!0,closeOnSubmit:!1}};_terrainTypes=R([...V.value]);#e=R(V.value[0]?.id);#t=R(`lines`);#n=new Set;_renderHTML(){return q`
			<div class="terrain-type-list-container">
				<!-- List of terrain types -->
				<ul class="terrain-type-list">
					${Ar(this._terrainTypes.value,e=>e.id,(e,t)=>q`
						<li
							class=${z(()=>J({active:e.id===this.#e.value}))}
							@click=${()=>this.#e.value=e.id}
							@contextmenu=${n=>this.#r(e.id,t,n)}
						>
							<span>${e.name}</span>
							<button type="button" @click=${n=>this.#r(e.id,t,n)}>
								<i class="fas fa-ellipsis-vertical m-0"></i>
							</button>
						</li>
					`)}
				</ul>

				<div class="terrain-type-list-vertical-separator"></div>

				<!-- Terrain type form -->
				<div class="terrain-type-edit-pane">
					${Ar(this._terrainTypes.value,e=>e.id,(e,t)=>q`
						<div
							class="standard-form"
							style=${z(()=>Mr({display:e.id===this.#e.value?`flex`:`none`}))}
							data-terrain-type-id=${e.id}
						>
							<input type="hidden" name="${t}.id" value=${e.id}>

							<div class="form-group">
								<label>${Y(`Name`)}</label>
								<div class="form-fields">
									<input type="text" name="${t}.name" value=${e.name} placeholder=${Y(`Name`)}>
								</div>
							</div>

							<nav class="sheet-tabs tabs">
								${Object.entries(ci).map(([e,t])=>q`
									<a
										class=${z(()=>J({active:this.#t.value===e}))}
										@click=${()=>this.#t.value=e}
										data-tab
									>
										<i class=${t.icon}></i>
										<label>${Y(t.label)}</label>
									</a>
								`)}
							</nav>

							${Object.entries(ci).map(([n,r])=>q`
								<div class=${z(()=>J({tab:!0,active:this.#t.value===n}))} data-tab>
									${r.parts.map(n=>{try{let r=n({app:this,terrainType:e,index:t,html:q});return typeof r==`string`?Pr(r):r}catch(e){return q`<span>Failed to render part: ${e}</span>`}})}
								</div>
							`)}
						</div>
					`)}
				</div>
			</div>

			<footer class="form-footer">
				<button type="button" @click=${()=>this.#s()}>
					<i class="fas fa-plus"></i>
					<label>${Y(`TERRAINHEIGHTTOOLS.AddTerrainType`)}</label>
				</button>
				<button type="button" @click=${()=>this.#h()}>
					<i class="fas fa-palette"></i>
					<label>${Y(`TERRAINHEIGHTTOOLS.ImportTerrainTypesPreset`)}</label>
				</button>
				<button type="button" @click=${()=>this.#g()}>
					<i class="fas fa-upload"></i>
					<label>${Y(`TERRAINHEIGHTTOOLS.ImportTerrainTypes`)}</label>
				</button>
				<button type="button" @click=${()=>this.#_()}>
					<i class="fas fa-download"></i>
					<label>${Y(`TERRAINHEIGHTTOOLS.ExportTerrainTypes`)}</label>
				</button>
			</footer>
			<footer class="form-footer">
				<button type="button" @click=${()=>this.#o()}>
					<i class="fas fa-save"></i>
					<label>${Y(`Save Changes`)}</label>
				</button>
			</footer>
		`}_preFirstRender(e){super._preFirstRender(e),cr(this._terrainTypes,()=>this.render(),this.closeSignal),cr(this._terrainTypes,foundry.utils.debounce(e=>St.value=e,500),this.closeSignal)}close(e){St.value=null;for(let e of this.#n)e.close();return super.close(e)}#r(e,t,n){n.preventDefault(),n.stopImmediatePropagation();let r=t===0,i=t===this._terrainTypes.value.length-1;Xr.open(n,[!r&&{label:Y(`TERRAINHEIGHTTOOLS.MoveToTop`),icon:`fas fa-arrow-up-to-line`,onClick:()=>this.#l(e,0)},!r&&{label:Y(`TERRAINHEIGHTTOOLS.MoveUp`),icon:`fas fa-arrow-up`,onClick:()=>this.#c(e,-1)},!i&&{label:Y(`TERRAINHEIGHTTOOLS.MoveDown`),icon:`fas fa-arrow-down`,onClick:()=>this.#c(e,1)},!i&&{label:Y(`TERRAINHEIGHTTOOLS.MoveToBottom`),icon:`fas fa-arrow-down-to-line`,onClick:()=>this.#l(e,this._terrainTypes.value.length)},{label:Y(`Duplicate`),icon:`fas fa-copy`,onClick:()=>this.#u(e)},{label:Y(`Delete`),icon:`fas fa-trash`,onClick:()=>this.#d(e)}])}static _renderLinesTab=({app:e,terrainType:t,index:n})=>q`
		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.LineType`)}</label>
			<div class="form-fields">
				<select name="${n}.lineType" data-dtype="Number">
					${Ir(B,{labelSelector:([e])=>`TERRAINHEIGHTTOOLS.LineType${e.titleCase()}`,valueSelector:1,selected:t.lineType})}
				</select>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineType===B.NONE})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineWidth`)} <span class="units">(${Y(`Pixels`)})</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.lineWidth" value=${t.lineWidth} min="0" step="1">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineType!==B.DASHED})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineDashSize`)} / ${Y(`TERRAINHEIGHTTOOLS.LineGapSize`)}</label>
			<div class="form-fields">
				<input type="number" name="${n}.lineDashSize" value=${t.lineDashSize} min="1" step="1">
				<input type="number" name="${n}.lineGapSize" value=${t.lineGapSize} min="1" step="1">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineType!==B.DASHED})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineDashAnimation`)} <span class="units">(px/s)</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.lineDashOffsetAnimation" value=${t.lineDashOffsetAnimation} step="1">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineType===B.NONE||t.lineColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.lineColor`,value:t.lineColor})}
				<button
					type="button"
					data-tooltip=${Y(`TERRAINHEIGHTTOOLS.EnableAnimation`)}
					@click=${()=>e.#a(n,`lineColorAnimation`,{duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.8,position:0},{color:255,alpha:.8,position:.5},{color:16711680,alpha:.8,position:1}]})}
				>
					<i class="fas fa-sparkles m-0"></i>
				</button>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineType===B.NONE||t.lineColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineOpacity`)}</label>
			<div class="form-fields">
				${Qr({name:`${n}.lineOpacity`,value:t.lineOpacity,min:0,max:1,step:.05})}
			</div>
		</div>

		${F(t.lineType!==B.NONE&&t.lineColorAnimation,()=>q`
			<div class="form-group">
				<label>${Y(`TERRAINHEIGHTTOOLS.LineColor`)}</label>
				<div class="form-fields">
					<color-animation-editor-fwl
						name=${`${n}.lineColorAnimation`}
						.value=${t.lineColorAnimation}
					></color-animation-editor-fwl>
					<button
						type="button"
						class="btn-active-fwl"
						data-tooltip=${Y(`TERRAINHEIGHTTOOLS.DisableAnimation`)}
						@click=${()=>e.#a(n,`lineColorAnimation`,null)}
					>
						<i class="fas fa-sparkles m-0"></i>
					</button>
				</div>
			</div>
		`)}

		<hr/>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.LineFadeDistance`)} <span class="units">(%)</span></label>
			<div class="form-fields">
				${Qr({name:`${n}.lineFadeDistance`,value:t.lineFadeDistance,min:0,max:.5,step:.05})}
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineFadeDistance===0})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineFadeColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.lineFadeColor`,value:t.lineFadeColor})}
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.lineFadeDistance===0})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LineFadeOpacity`)}</label>
			<div class="form-fields">
				${Qr({name:`${n}.lineFadeOpacity`,value:t.lineFadeOpacity,min:0,max:1,step:.05})}
			</div>
		</div>
	`;static _renderFillTab=({app:e,terrainType:t,index:n})=>q`
		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.FillType`)}</label>
			<div class="form-fields">
				<select name="${n}.fillType" data-dtype="Number">
					${Ir(CONST.DRAWING_FILL_TYPES,{labelSelector:([e])=>`DRAWING.FillType${e.titleCase()}`,valueSelector:1,selected:t.fillType})}
				</select>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.fillType===CONST.DRAWING_FILL_TYPES.NONE||t.fillColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.FillColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.fillColor`,value:t.fillColor})}
				<button
					type="button"
					data-tooltip=${Y(`TERRAINHEIGHTTOOLS.EnableAnimation`)}
					@click=${()=>e.#a(n,`fillColorAnimation`,{duration:2500,easingFunc:`linear`,keyframes:[{color:16711680,alpha:.2,position:0},{color:255,alpha:.2,position:.5},{color:16711680,alpha:.2,position:1}]})}
				>
					<i class="fas fa-sparkles m-0"></i>
				</button>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.fillType===CONST.DRAWING_FILL_TYPES.NONE||t.fillColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.FillOpacity`)}</label>
			<div class="form-fields">
				${Qr({name:`${n}.fillOpacity`,value:t.fillOpacity,min:0,max:1,step:.1})}
			</div>
		</div>

		${F(t.fillType!==CONST.DRAWING_FILL_TYPES.NONE&&t.fillColorAnimation,()=>q`
			<div class="form-group">
				<label>${Y(`TERRAINHEIGHTTOOLS.FillColor`)}</label>
				<div class="form-fields">
					<color-animation-editor-fwl
						name=${`${n}.fillColorAnimation`}
						.value=${t.fillColorAnimation}
					></color-animation-editor-fwl>
					<button
						type="button"
						class="btn-active-fwl"
						data-tooltip=${Y(`TERRAINHEIGHTTOOLS.DisableAnimation`)}
						@click=${()=>e.#a(n,`fillColorAnimation`,null)}
					>
						<i class="fas fa-sparkles m-0"></i>
					</button>
				</div>
			</div>
		`)}

		<div class=${J({"form-group":!0,hidden:t.fillType!==CONST.DRAWING_FILL_TYPES.PATTERN})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.FillTexture`)}</label>
			<div class="form-fields">
				<file-picker name="${n}.fillTexture" type="image" value=${t.fillTexture}></file-picker>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.fillType!==CONST.DRAWING_FILL_TYPES.PATTERN})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.TextureOffset`)} <span class="units">(${Y(`Pixels`)})</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.fillTextureOffset.x" value=${t.fillTextureOffset.x} step="1" required placeholder="X">
				<input type="number" name="${n}.fillTextureOffset.y" value=${t.fillTextureOffset.y} step="1" required placeholder="Y">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.fillType!==CONST.DRAWING_FILL_TYPES.PATTERN})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.TextureScale`)} <span class="units">%</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.fillTextureScale.x" value=${t.fillTextureScale.x} step="1" required placeholder="X">
				<input type="number" name="${n}.fillTextureScale.y" value=${t.fillTextureScale.y} step="1" required placeholder="Y">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.fillType!==CONST.DRAWING_FILL_TYPES.PATTERN})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.TextureOffsetAnimation`)} <span class="units">px/s</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.fillTextureOffsetAnimation.x" value=${t.fillTextureOffsetAnimation.x} step="1" required placeholder="X">
				<input type="number" name="${n}.fillTextureOffsetAnimation.y" value=${t.fillTextureOffsetAnimation.y} step="1" required placeholder="Y">
			</div>
		</div>
	`;static _renderLabelTab=({app:e,terrainType:t,index:n})=>q`
		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.LabelFormat.Name`)}</label>
			<div class="form-fields">
				<textarea class="autoresize" name="${n}.textFormat">${t.textFormat}</textarea>
				<div class="form-field-hint-icon" data-tooltip=${this.#y()} data-tooltip-class="tht_terrainTypesConfig_label-placeholder-tooltip">
					<i class="fas fa-question-circle"></i>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.ElevatedLabelFormat.Name`)}</label>
			<div class="form-fields">
				<textarea class="autoresize" name="${n}.elevatedTextFormat">${t.elevatedTextFormat}</textarea>
				<div class="form-field-hint-icon" data-tooltip=${this.#y()} data-tooltip-class="tht_terrainTypesConfig_label-placeholder-tooltip">
					<i class="fas fa-question-circle"></i>
				</div>
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.ElevatedLabelFormat.Hint`)}</p>
		</div>

		<div class="form-group">
			<label>${Y(`DRAWING.FontFamily`)}</label>
			<div class="form-fields">
				<select name="${n}.font">
					${Ir(ai.getAvailableFontChoices(),{selected:t.font})}
				</select>
			</div>
		</div>

		<div class="form-group">
			<label>${Y(`DRAWING.FontSize`)}</label>
			<div class="form-fields">
				<input type="number" name="${n}.textSize" value=${t.textSize} min="0" step="1">
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.textColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LabelColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.textColor`,value:t.textColor})}
				<button
					type="button"
					data-tooltip=${Y(`TERRAINHEIGHTTOOLS.EnableAnimation`)}
					@click=${()=>e.#a(n,`textColorAnimation`,{duration:2500,easingFunc:`linear`,keyframes:[{color:0,alpha:1,position:0},{color:16777215,alpha:1,position:.5},{color:0,alpha:1,position:1}]})}
				>
					<i class="fas fa-sparkles m-0"></i>
				</button>
			</div>
		</div>

		<div class=${J({"form-group":!0,hidden:t.textColorAnimation})}>
			<label>${Y(`TERRAINHEIGHTTOOLS.LabelOpacity`)}</label>
			<div class="form-fields">
				${Qr({name:`${n}.textOpacity`,value:t.textOpacity,min:0,max:1,step:.1})}
			</div>
		</div>

		${F(t.textColorAnimation,()=>q`
			<div class="form-group">
				<label>${Y(`TERRAINHEIGHTTOOLS.LabelColor`)}</label>
				<div class="form-fields">
					<color-animation-editor-fwl
						name=${`${n}.textColorAnimation`}
						.value=${t.textColorAnimation}
					></color-animation-editor-fwl>
					<button
						type="button"
						class="btn-active-fwl"
						data-tooltip=${Y(`TERRAINHEIGHTTOOLS.DisableAnimation`)}
						@click=${()=>e.#a(n,`textColorAnimation`,null)}
					>
						<i class="fas fa-sparkles m-0"></i>
					</button>
				</div>
			</div>
		`)}

		<hr/>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.StrokeThickness`)} <span class="units">(${Y(`Pixels`)})</span></label>
			<div class="form-fields">
				<input type="number" name="${n}.textStrokeThickness" value=${t.textStrokeThickness} min="0" step="1">
			</div>
		</div>

		<div class="form-group">
			<label>${Y(`DRAWING.StrokeColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.textStrokeColor`,value:t.textStrokeColor,placeholder:`Automatic`})}
			</div>
		</div>

		<hr/>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.ShadowAmount`)}</label>
			<div class="form-fields">
				<input type="number" name="${n}.textShadowAmount" value=${t.textShadowAmount} min="0" step="1">
			</div>
		</div>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.ShadowColor`)}</label>
			<div class="form-fields">
				${Zr({name:`${n}.textShadowColor`,value:t.textShadowColor,placeholder:`Automatic`})}
			</div>
		</div>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.ShadowOpacity`)}</label>
			<div class="form-fields">
				${Qr({name:`${n}.textShadowOpacity`,value:t.textShadowOpacity,min:0,max:1,step:.1})}
			</div>
		</div>

		<hr/>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.AllowLabelRotation.Name`)}</label>
			<div class="form-fields">
				<input type="checkbox" name="${n}.textRotation" .checked=${t.textRotation}>
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.AllowLabelRotation.Hint`)}</p>
		</div>
	`;static _renderBehaviorsTab=({app:e,terrainType:t,index:n})=>q`
		<p class="m-0">${Y(`TERRAINHEIGHTTOOLS.BehaviorsHelpText`)}</p>
		${F(t.regionBehaviors.length===0,()=>q`
				<p class="hint text-align-center">${Y(`TERRAINHEIGHTTOOLS.NoBehaviorsConfigured`)}</p>
			`,()=>q`
				<ul class="tht-behavior-list">
					${t.regionBehaviors.map(n=>q`
						<li @click=${()=>e.#p(t.id,n)}>
							<i class=${CONFIG.RegionBehavior.typeIcons[n.type]}></i>
							<a class="behavior-name">${n.name}</a>
							<a class="fas fa-pen-to-square fa-fw"></a>
							<a class="fas fa-trash fa-fw" @click=${r=>e.#m(r,t.id,n._id)}></a>
						</li>
					`)}
				</ul>
			`)}
		<button type="button" class="tht-add-behavior-button" @click=${n=>e.#f(n,t.id)}>
			<i class="fas fa-plus"></i>
			${Y(`REGION.ACTIONS.behaviorCreate`)}
		</button>
		<input type="hidden" name="${n}.regionBehaviors" data-dtype="JSON" value=${JSON.stringify(t.regionBehaviors)}>
	`;static _renderOtherTab=({terrainType:e,index:t})=>q`
		<div class="form-group">
			<label for="terrainType${t}_isZone">${Y(`TERRAINHEIGHTTOOLS.IsZone.Name`)}</label>
			<div class="form-fields">
				<input id="terrainType${t}_isZone" type="checkbox" name="${t}.isZone" .checked=${!e.usesHeight}>
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.IsZone.Hint`)}</p>
		</div>

		<div class="form-group">
			<label for="terrainType${t}_isAlwaysVisible">${Y(`TERRAINHEIGHTTOOLS.IsAlwaysVisible.Name`)}</label>
			<div class="form-fields">
				<input id="terrainType${t}_isAlwaysVisible" type="checkbox" name="${t}.isAlwaysVisible" .checked=${e.isAlwaysVisible}>
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.IsAlwaysVisible.Hint`)}</p>
		</div>

		<div class="form-group">
			<label for="terrainType${t}_isSolid">${Y(`TERRAINHEIGHTTOOLS.IsSolid.Name`)}</label>
			<div class="form-fields">
				<input id="terrainType${t}_isSolid" type="checkbox" name="${t}.isSolid" .checked=${e.isSolid}>
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.IsSolid.Hint`)}</p>
		</div>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.DefaultHeight.Name`)}</label>
			<div class="form-fields">
				<input type="number" name="${t}.defaultHeight" value=${e.defaultHeight??``} step="1">
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.DefaultHeight.Hint`)}</p>
		</div>

		<div class="form-group">
			<label>${Y(`TERRAINHEIGHTTOOLS.DefaultElevation.Name`)}</label>
			<div class="form-fields">
				<input type="number" name="${t}.defaultElevation" value=${e.defaultElevation??``} step="1">
			</div>
			<p class="hint">${Y(`TERRAINHEIGHTTOOLS.DefaultElevation.Hint`)}</p>
		</div>
	`;static#i(e,t,n){this._terrainTypes.value=this.#v(n)}#a(e,t,n){this._terrainTypes.value=this._terrainTypes.value.with(e,{...this._terrainTypes.value[e],[t]:n})}async#o(){let e=new oi(this.element),t=this.#v(e);await game.settings.set(r,f.terrainTypes,t),await this.close()}#s(){let e=Et();this._terrainTypes.value=[...this._terrainTypes.value,e],this.#e.value=e.id}#c(e,t){let n=this._terrainTypes.value.findIndex(t=>t.id===e);if(t>0&&n>=this._terrainTypes.value.length||t<0&&n<=0)return;let r=[...this._terrainTypes.value],[i]=r.splice(n,1);r.splice(n+t,0,i),this._terrainTypes.value=r}#l(e,t){let n=this._terrainTypes.value.findIndex(t=>t.id===e),r=[...this._terrainTypes.value],[i]=r.splice(n,1);r.splice(t,0,i),this._terrainTypes.value=r}#u(e){let t=this._terrainTypes.value.find(t=>t.id===e),n={...t,id:foundry.utils.randomID(),name:t.name+` (2)`};this._terrainTypes.value=[...this._terrainTypes.value,n],this.#e.value=n.id}#d(e){this._terrainTypes.value=this._terrainTypes.value.filter(t=>t.id!==e)}#f(e,t){let{dataModels:n,typeLabels:r,typeIcons:i}=CONFIG.RegionBehavior;Xr.open(e,Object.keys(n).map(e=>({label:Y(r[e]),icon:i[e],onClick:()=>this.#p(t,{_id:foundry.utils.randomID(),type:e,name:Y(r[e])})})))}#p(e,t){let n=new CONFIG.RegionBehavior.documentClass(t);Object.defineProperties(n,{collection:{value:new Map([[t._id,t]])},update:{value:n=>{n={...n,_id:t._id};let r=this._terrainTypes.value.findIndex(t=>t.id===e);if(r<0)return;let i=this._terrainTypes.value[r],a=i.regionBehaviors.findIndex(e=>e._id===t._id);this._terrainTypes.value=this._terrainTypes.value.with(r,{...i,regionBehaviors:a<0?[...i.regionBehaviors,n]:i.regionBehaviors.with(a,n)})}}});let{sheet:r}=n;r.render(!0),this.#n.has(r)||(this.#n.add(r),r.addEventListener(`close`,()=>this.#n.delete(r),{once:!0}))}#m(e,t,n){e.stopPropagation();let r=this._terrainTypes.value.findIndex(e=>e.id===t);if(r<0)return;let i=this._terrainTypes.value[r];this._terrainTypes.value=this._terrainTypes.value.with(r,{...i,regionBehaviors:i.regionBehaviors.filter(e=>e._id!==n)})}async#h(){try{let{data:e,replace:t}=await ni.show();this._importTerrainTypeSettings(e,t)}catch{return}}#g(){new ii({id:`tht_terrainTypesImport`,window:{title:Y(`TERRAINHEIGHTTOOLS.ImportTerrainTypes`),icon:`fas fa-upload`,resizable:!0},content:`<textarea placeholder="${Y(`TERRAINHEIGHTTOOLS.ImportTextPlaceholder`)}"></textarea>`,buttons:[{icon:`<i class='fas fa-upload'></i>`,label:Y(`TERRAINHEIGHTTOOLS.ImportCombine`),action:`importCombine`,callback:(e,t,{element:n})=>{if(!this._importTerrainTypeSettings(n.querySelector(`textarea`).value,!1))throw Error(`Invalid data`)}},{icon:`<i class='fas fa-upload'></i>`,label:Y(`TERRAINHEIGHTTOOLS.ImportReplace`),action:`importReplace`,callback:(e,t,{element:n})=>{if(!this._importTerrainTypeSettings(n.querySelector(`textarea`).value,!0))throw Error(`Invalid data`)}},{icon:`<i class='fas fa-times'></i>`,label:Y(`Close`),action:`close`}],position:{width:720,height:350}}).render(!0)}#_(){new ii({id:`tht_terrainTypesExport`,window:{title:Y(`TERRAINHEIGHTTOOLS.ExportTerrainTypes`),icon:`fas fa-download`,contentClasses:[`terrain-height-tool-window`],resizable:!0},content:`<textarea readonly>${JSON.stringify(this._terrainTypes)}</textarea>`,buttons:[{icon:`<i class='fas fa-check'></i>`,label:Y(`Close`),action:`close`}],position:{width:720,height:350}}).render(!0)}_importTerrainTypeSettings(e,t=!1){if(!e?.length)return;let n=Array.isArray(e)?e:JSON.parse(e);if(!Array.isArray(n))return ui.notifications.error(`Failed to import terrain type data: Expected JSON to be an array.`),!1;let r=[],i=Et();for(let e=0;e<n.length;e++){if(typeof n[e]!=`object`)return ui.notifications.error(`Expected item at index ${e} to be an object, but found ${typeof n[e]}`),!1;let a=t?void 0:this._terrainTypes.value.find(t=>t.id===n[e].id),o={...i,...a??{},...n[e]};for(let[t,n]of Object.entries(i))if(n!==null&&typeof o[t]!=typeof n)return ui.notifications.error(`Expected property '${t}' of item at index ${e} to be of type ${typeof n}, but found ${typeof o[t]}`),!1;r.push(o)}if(t)this._terrainTypes.value=r;else{let e=r.map(e=>e.id);this._terrainTypes.value=[...this._terrainTypes.value.filter(t=>!e.includes(t.id)),...r]}return this.render(),!0}#v(e){let t=Object.entries(foundry.utils.expandObject(e.object)).sort((e,t)=>e[0]-t[0]).map(([,e])=>e);for(let e of t)e.usesHeight=!e.isZone,delete e.isZone;return t}static#y(){let e=[[`%h%`,Y(`TERRAINHEIGHTTOOLS.Placeholders.Height`)],[`%e%`,Y(`TERRAINHEIGHTTOOLS.Placeholders.Elevation`)],[`%t%`,Y(`TERRAINHEIGHTTOOLS.Placeholders.Top`)]];return`
			<p>${Y(`TERRAINHEIGHTTOOLS.Placeholders.PlaceholderHelpText`)}</p>
			<table>
				<tbody>
					${e.map(([e,t])=>`<tr>
						<th>${e}</th>
						<td>${t}</td>
					</tr>`).join(``)}
				</tbody>
			</table>
		`}};let ci={lines:{label:`TERRAINHEIGHTTOOLS.TabLine`,icon:`fas fa-paint-brush`,parts:[si._renderLinesTab]},fill:{label:`TERRAINHEIGHTTOOLS.TabFill`,icon:`fas fa-fill-drip`,parts:[si._renderFillTab]},label:{label:`TERRAINHEIGHTTOOLS.TabLabel`,icon:`fas fa-font`,parts:[si._renderLabelTab]},behaviors:{label:`TERRAINHEIGHTTOOLS.TabBehaviors`,icon:`fas fa-child-reaching`,parts:[si._renderBehaviorsTab]},other:{label:`TERRAINHEIGHTTOOLS.TabOther`,icon:`fas fa-cogs`,parts:[si._renderOtherTab]}};function li(e,t){if(typeof e==`string`){let n=ci[e];if(!n)throw Error(`Could not add custom UI: Tab '${e}' does not exist.`);n.parts.push(t)}else{let{id:n,label:r,icon:i}=e,a=ci[n];a?a.parts.push(t):ci[n]={label:r,icon:i,parts:[t]}}}var di=n({calculateLineOfSight:()=>Si,calculateLineOfSightByShape:()=>Ci,calculateLineOfSightRaysBetweenTokens:()=>wi,classes:()=>fi,clearLineOfSightRays:()=>Oi,drawLineOfSightRay:()=>Ti,drawLineOfSightRays:()=>Ei,drawLineOfSightRaysBetweenTokens:()=>Di,eraseCells:()=>bi,eraseRegions:()=>xi,getCell:()=>hi,getShapes:()=>gi,getShapesAtPoint:()=>_i,getTerrainType:()=>pi,getTerrainTypes:()=>mi,heightMapProviderId:()=>s,moduleName:()=>r,paintCells:()=>vi,paintRegions:()=>yi,registerCustomTerrainTypeConfigUi:()=>li,registerTerrainProvider:()=>Jn,unregisterTerrainProvider:()=>Yn});let fi={TerrainShape:Vn,TerrainProvider:Xn};function pi(e){if(!e?.id?.length&&!e?.name?.length)throw Error("Expected `terrain` to have an `id` or `name` property.");return V.value.find(t=>t.id===e.id||t.name?.localeCompare(e.name,void 0,{sensitivity:`base`})===0)}function mi(){return V.value}function hi(e,t,n={}){return gi(e,t,n)}function gi(e,t,{providerIds:n}={}){if(canvas.grid.type===CONST.GRID_TYPES.GRIDLESS)throw Error(`Cannot use this function on gridless scenes`);let{x:r,y:i}=canvas.grid.getCenterPoint({i:t,j:e});return Kn(r,i,{providerIds:n})}function _i(e,t,{providerIds:n}={}){return Kn(e,t,{providerIds:n})}function vi(e,t,{mode:n=`totalReplace`}={}){if(canvas.grid.type===CONST.GRID_TYPES.GRIDLESS)throw Error(`Cannot use this function on gridless scenes`);if(!Array.isArray(e)||e.some(e=>!Array.isArray(e)))throw Error("Expected `cells` to be an array of arrays.");if(e.length===0)return;let r=pi(t);if(!r)throw Error(`Could not find a terrain type with ID "${t.id}" or name "${t.name}"`);if(r.usesHeight&&typeof t.height!=`number`)throw Error(`Terrain "${r.name}' requires a height, but one was not provided.`);return W.paintCells(e,r.id,t.height??0,t.elevation??0,{mode:n})}function yi(e,t,{mode:n=`totalReplace`}={}){let r=pi(t);if(!r)throw Error(`Could not find a terrain type with ID "${t.id}" or name "${t.name}"`);if(r.usesHeight&&typeof t.height!=`number`)throw Error(`Terrain "${r.name}' requires a height, but one was not provided.`);return W.paintRegions(e,r.id,t.height??0,t.elevation??0,{mode:n})}function bi(e,{top:t,bottom:n,onlyTerrainTypeIds:r,excludingTerrainTypeIds:i}={}){if(canvas.grid.type===CONST.GRID_TYPES.GRIDLESS)throw Error(`Cannot use this function on gridless scenes`);if(!Array.isArray(e)||e.some(e=>!Array.isArray(e)))throw Error("Expected `cells` to be an array of arrays.");if(e.length!==0)return W.eraseCells(e,{top:t,bottom:n,onlyTerrainTypeIds:r,excludingTerrainTypeIds:i})}function xi(e,{top:t,bottom:n,onlyTerrainTypeIds:r,excludingTerrainTypeIds:i}={}){return W.eraseRegions(e,{top:t,bottom:n,onlyTerrainTypeIds:r,excludingTerrainTypeIds:i})}function Si(e,t,{includeNoHeightTerrain:n,terrainProviderIds:r}={}){return Vn.flattenLineOfSightIntersectionRegions(Vn.calculateLineOfSight(qn(mr(e,t),{providerIds:r}),e,t,{includeNoHeightTerrain:n}))}function Ci(e,t,{includeNoHeightTerrain:n,terrainProviderIds:r}={}){return Vn.calculateLineOfSight(qn(mr(e,t),{providerIds:r}),e,t,{includeNoHeightTerrain:n})}function wi(e,t,{token1RelativeHeight:n,token2RelativeHeight:i}={}){let a=game.settings.get(r,f.defaultTokenLosTokenHeight),{left:o,centre:s,right:c}=_r(e,t,n??a,i??a);return{left:{p1:o[0],p2:o[1]},centre:{p1:s[0],p2:s[1]},right:{p1:c[0],p2:c[1]}}}function Ti(e,t,{group:n=a,drawForOthers:r=!0,includeNoHeightTerrain:i=!1,showLabels:o=!0}={}){wr.current?._drawLineOfSightRays([{a:e,b:t,includeNoHeightTerrain:i,showLabels:o}],{group:n,drawForOthers:r})}function Ei(e,{group:t=a,drawForOthers:n=!0}={}){wr.current?._drawLineOfSightRays(e.map(e=>({...e,a:e.a??e.p1,b:e.b??e.p2})),{group:t,drawForOthers:n})}function Di(e,t,{group:n=a,token1RelativeHeight:i,token2RelativeHeight:o,includeNoHeightTerrain:s=!1,drawForOthers:c=!0,includeEdges:l=!0}={}){let u=game.settings.get(r,f.defaultTokenLosTokenHeight);wr.current?._drawLineOfSightRays([{a:e,ah:i??u,b:t,bh:o??u,includeNoHeightTerrain:s,includeEdges:l}],{group:n,drawForOthers:c})}function Oi({group:e=a}={}){wr.current?._clearLineOfSightRays({group:e,clearForOthers:!0})}let ki=R(!1),Ai=R(!1),ji=R(`auto`),Mi=R(0),Ni=R(!1),Pi=R(!1),Fi=R(!1),Ii=R(!0),Li=R(!0),Ri=R(!1),zi=R(`top`),Bi=R(!0);function Vi(){game.settings.registerMenu(r,f.terrainTypes,{name:`SETTINGS.TerrainTypes.Name`,label:`SETTINGS.TerrainTypes.Button`,hint:`SETTINGS.TerrainTypes.Hint`,icon:`fas fa-paintbrush`,type:si,restricted:!0}),e(f.terrainTypes,{name:`SETTINGS.TerrainTypes.Name`,scope:`world`,default:[],type:Array,config:!1,onChange:()=>{Tt()}}),e(f.terrainLayerAboveTilesDefault,{name:`SETTINGS.TerrainHeightLayerRenderAboveTiles.Name`,hint:`SETTINGS.TerrainHeightLayerRenderAboveTiles.Hint`,scope:`world`,type:Boolean,default:!0,config:!0},Li),e(f.displayLosMeasurementGm,{name:`SETTINGS.DisplayLosMeasurementGm.Name`,hint:`SETTINGS.DisplayLosMeasurementGm.Hint`,scope:`world`,type:Boolean,default:!0,config:!0}),e(f.displayLosMeasurementPlayer,{name:`SETTINGS.DisplayLosMeasurementPlayer.Name`,hint:`SETTINGS.DisplayLosMeasurementPlayer.Hint`,scope:`world`,type:Boolean,default:!0,config:!0}),e(f.defaultTokenLosTokenHeight,{name:`SETTINGS.DefaultTokenLosHeight.Name`,hint:`SETTINGS.DefaultTokenLosHeight.Hint`,scope:`world`,type:Number,choices:y,default:1,config:!0}),e(f.toolbarPosition,{name:`SETTINGS.TerrainHeightToolsToolbarPosition.Name`,hint:`SETTINGS.TerrainHeightToolsToolbarPosition.Hint`,scope:`client`,type:String,choices:b,default:`topCenter`,config:!0},zi),e(f.toolbarPosition,{name:`SETTINGS.TerrainHeightToolsToolbarPosition.Name`,hint:`SETTINGS.TerrainHeightToolsToolbarPosition.Hint`,scope:`client`,type:String,choices:b,default:`topCenter`,config:!0},zi),e(f.toolbarAutofade,{name:`SETTINGS.TerrainHeightToolsToolbarAutofade.Name`,hint:`SETTINGS.TerrainHeightToolsToolbarAutofade.Hint`,scope:`client`,type:Boolean,default:!0,config:!0},Bi),e(f.showTerrainHeightOnTokenLayer,{name:`SETTINGS.ShowTerrainHeightOnTokenLayer`,scope:`client`,type:Boolean,config:!1,default:!0},ki),e(f.showTerrainStackViewerOnTokenLayer,{name:`SETTINGS.ShowTerrainStackViewerOnTokenLayer.Name`,hint:`SETTINGS.ShowTerrainStackViewerOnTokenLayer.Hint`,scope:`client`,type:Boolean,config:!0,default:!1},Ai),e(f.terrainStackViewerDisplayMode,{name:`SETTINGS.TerrainStackViewerDisplayMode.Name`,hint:`SETTINGS.TerrainStackViewerDisplayMode.Hint`,scope:`client`,type:String,choices:x,config:!0,default:`auto`},ji),e(f.terrainHeightLayerVisibilityRadius,{name:`SETTINGS.TerrainHeightLayerVisibilityRadius.Name`,hint:`SETTINGS.TerrainHeightLayerVisibilityRadius.Hint`,scope:`client`,type:Number,range:{min:0,max:40,step:1},config:!0,default:0},Mi),e(f.otherUserLineOfSightRulerOpacity,{name:`SETTINGS.OtherUserLineOfSightRulerOpacity.Name`,hint:`SETTINGS.OtherUserLineOfSightRulerOpacity.Hint`,scope:`client`,type:Number,range:{min:0,max:1,step:.05},config:!0,default:.5}),e(f.tokenLosToolPreselectToken1,{name:`SETTINGS.TokenLosToolPreselectToken1.Name`,hint:`SETTINGS.TokenLosToolPreselectToken1.Hint`,scope:`client`,type:Boolean,config:!0,default:!0}),e(f.tokenLosToolPreselectToken2,{name:`SETTINGS.TokenLosToolPreselectToken2.Name`,hint:`SETTINGS.TokenLosToolPreselectToken2.Hint`,scope:`client`,type:Boolean,config:!0,default:!0}),e(f.tokenElevationChange,{name:`SETTINGS.TokenElevationChange.Name`,hint:`SETTINGS.TokenElevationChange.Hint`,scope:`world`,type:Boolean,config:!0,default:!1},Ni),e(f.tokenElevationChangeInsertClimbWaypoints,{name:`SETTINGS.TokenElevationChangeInsertClimbWaypoints.Name`,hint:`SETTINGS.TokenElevationChangeInsertClimbWaypoints.Hint`,scope:`world`,type:Boolean,config:!0,default:!1},Pi),e(f.showZonesAboveNonZones,{name:`SETTINGS.ShowZonesAboveNonZones.Name`,hint:`SETTINGS.ShowZonesAboveNonZones.Hint`,scope:`world`,type:Boolean,config:!0,default:!1},Fi),e(f.useFractionsForLabels,{name:`SETTINGS.UseFractionsForLabels.Name`,hint:`SETTINGS.UseFractionsForLabels.Hint`,scope:`world`,type:Boolean,config:!0,default:!0},Ii),e(f.smartLabelPlacement,{name:`SETTINGS.TerrainHeightLayerSmartLabelPlacement.Name`,hint:`SETTINGS.TerrainHeightLayerSmartLabelPlacement.Hint`,scope:`world`,type:Boolean,config:!0,default:!0}),e(f.paintToolbarUseHeightElevation,{scope:`client`,type:Boolean,config:!1,default:!1},Ri);function e(e,t,n){game.settings.register(r,e,{...t,onChange:e=>{t.onChange?.(e),n&&(n.value=e)}}),n&&(n.value=game.settings.get(r,e))}}function Hi(e,t){let n=e.document.getFlag(r,m.terrainLayerAboveTiles);Qe(N`
		<div class="form-group">
			<label>${game.i18n.localize(`TERRAINHEIGHTTOOLS.SceneRenderAboveTiles`)}</label>
			<select name=${`flags.${r}.${m.terrainLayerAboveTiles}`} data-dtype="JSON">
				<option value="null" ?selected=${n==null}>
					${game.i18n.localize(`TERRAINHEIGHTTOOLS.SceneRenderAboveTilesChoice.UseGlobal`)}
				</option>
				<option value="true" ?selected=${n===!0}>
					${game.i18n.localize(`TERRAINHEIGHTTOOLS.SceneRenderAboveTilesChoice.AboveTiles`)}
				</option>
				<option value="false" ?selected=${n===!1}>
					${game.i18n.localize(`TERRAINHEIGHTTOOLS.SceneRenderAboveTilesChoice.BelowTiles`)}
				</option>
			</select>
		</div>
	`,t.querySelector(`.tab[data-tab='grid']`))}function Ui(e,t){if(!game.settings.get(`terrain-height-tools`,f.tokenElevationChange))return;let n=e.token.getFlag(`terrain-height-tools`,h.ignoreAutoElevation)??!1;Qe(N`
		<div class="form-group">
			<label>${game.i18n.localize(`TERRAINHEIGHTTOOLS.IgnoreAutoElevation.Name`)}</label>
			<div class="form-fields">
				<input type="checkbox" name="flags.${r}.${h.ignoreAutoElevation}" ?checked=${n} />
			</div>
			<p class="hint">${game.i18n.localize(`TERRAINHEIGHTTOOLS.IgnoreAutoElevation.Hint`)}</p>
		</div>
	`,t.querySelector(`.tab[data-tab="identity"]`))}let Wi=R(!1),Gi=R({x:0,y:0}),Ki=R(new Set),qi=R(null);function Ji(e){e.id===canvas.scene.id&&Yi({scene:e})}function Yi({scene:e}){it(()=>{Ki.value=new Set(e.getFlag(`terrain-height-tools`,m.invisibleTerrainTypes)??[]),qi.value=e.getFlag(`terrain-height-tools`,m.terrainLayerAboveTiles)??null,Wi.value=!0})}function Xi(){it(()=>{Wi.value=!1,Ki.value=new Set,qi.value=null})}let Zi=.5,{ApplicationV2:Qi}=foundry.applications.api,$i=e=>game.i18n.localize(e);var ea=class extends Ln(Qi){static DEFAULT_OPTIONS={id:`tht_terrainStackViewer`,window:{title:`TERRAINHEIGHTTOOLS.Terrain`,icon:`fas fa-chart-simple`,contentClasses:[`terrain-height-tool-window`],minimizable:!1,positioned:!1}};#e=z(()=>{if(!Wi.value)return[];Gn.value;let{x:e,y:t}=Gi.value;return Kn(e,t)});#t=z(()=>er[p.showTerrainStack].value||dr.value===`terrain-height-tools-editor`||dr.value===`tokens`&&Ai.value&&this.#e.value.length>0);constructor(){super(),bt(()=>{let e=this.#t.value;this.element&&(this.element.style.display=e?`block`:`none`),e&&(this.#e.value,this.render())}),ji.subscribe(()=>{this.#t.value&&this.render()})}async _renderFrame(e){let t=await super._renderFrame(e);return this.window.close.remove(),t}_insertElement(e){e.style.display=this.#t.value?`block`:`none`;let t=document.getElementById(e.id);t?t.replaceWith(e):foundry.ui.players.element.before(e)}_renderHTML(){let e=this.#e.value;if(e.length===0)return N`<p style="text-align: center;">${$i(`TERRAINHEIGHTTOOLS.HoverTerrainToShowDetails`)}</p>`;let t=e.map(e=>({shape:e,terrainType:Dt(e.terrainTypeId)})),n=t.filter(({terrainType:e})=>e.usesHeight).sort((e,t)=>t.shape.elevation-e.shape.elevation),r=t.filter(({terrainType:e})=>!e.usesHeight).sort((e,t)=>e.terrainType.name.localeCompare(t.terrainType.name,void 0,{sensitivity:`accent`})),i=n.length?Math.max.apply(null,n.map(({shape:e})=>e.top)):0,a=ji.value;return N`
			<!-- Non-zone shapes -->
			${(a===`auto`?i<=8:a===`proportional`)?this.#n(n,i):this.#r(n)}

			<!-- Separator -->
			${F(n.length&&r.length,()=>N`<hr>`)}

			<!-- Zones -->
			${r.map(({terrainType:e})=>N`
				<div class="terrain-layer-block" ${In(e,{lineWidthCssPropertyName:``})}>
					<p class="terrain-layer-block-title">${e.name}</p>
				</div>
			`)}
		`}#n(e,t){return N`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox=${`0 ${(t+.5)*-28-1} 230 ${(t+.5)*28+2}`}>
				<!-- Vertical axis labels -->
				<line class="axis-line"
					x1="0%" y1="0"
					x2="100%" y2="0"
				/>

				${Array.from({length:Math.ceil(t)},(e,t)=>Fe`
					<line class="axis-line"
						x1="10%" y1=${(t+1)*-28}
						x2="95%" y2=${(t+1)*-28}
					/>
					<text class="axis-line-label"
						x="8%" y=${(t+1)*-28}
						text-anchor="end" dominant-baseline="middle"
					>
						${U(t+1)}
					</text>
				`)}

				<!-- Shape blocks -->
				${e.map(({shape:e,terrainType:t})=>{let n=t.lineType===B.NONE?0:t.lineWidth;return Fe`
						<rect
							x="15%" y=${e.top*-28+n*Zi*.5+1}
							width="80%" height=${e.height*28+n*-Zi+-2}
							stroke-width=${n*Zi}
							${In(t,{fillColorCssPropertyName:`fill`,lineColorCssPropertyName:`stroke`,lineWidthCssPropertyName:``,textColorCssPropertyName:``})}
						/>

						<text class="shape-label"
							x="55%" y=${(e.elevation+e.height/2)*-28}
							text-anchor="middle" dominant-baseline="middle"
							${In(t,{fillColorCssPropertyName:``,lineColorCssPropertyName:``,lineWidthCssPropertyName:``,textColorCssPropertyName:`fill`})}
						>
							${t.name}
						</text>
					`})}
			</svg>
		`}#r(e){let t=e=>Vt(U(e));return N`${e.map(({shape:e,terrainType:n})=>N`
			<div class="terrain-layer-block" ${In(n,{lineWidthCssPropertyName:``})}>
				<p class="terrain-layer-block-title">${n.name}</p>
				<p class="terrain-layer-block-height">${t(e.bottom)} → ${t(e.top)} (${$i(`Height`)} ${t(e.height)})</p>
			</div>
		`)}`}};let ta=e=>class extends e{#e;_insertElement(e){let t=document.getElementById(e.id);t?t.replaceWith(e):this.#t(e,zi.value)}_onFirstRender(...e){return this.#e=[zi.subscribe(e=>{let t=document.getElementById(this.element.id);t&&t.replaceWith(this.element),this.#t(this.element,e)}),Bi.subscribe(e=>{this.element.classList[e?`add`:`remove`](`faded-ui`)})],super._onFirstRender(...e)}close(...e){for(let e of this.#e)e();return super.close(...e)}#t(e,t){switch(t){case`topCenter`:document.querySelector(`#ui-top`).append(e);break;case`bottomCenter`:document.querySelector(`#ui-bottom`).prepend(e);break}}},{ApplicationV2:na}=foundry.applications.api,ra=e=>game.i18n.localize(e);var ia=class e extends ta(Ln(na)){#e=R(void 0);_isSelectingToken$=z(()=>typeof this.#e.value==`number`);static DEFAULT_OPTIONS={id:`tht_tokenLineOfSightToolbar`,classes:[`tht-toolbar`,`flexrow`],window:{frame:!1,positioned:!1}};static current;constructor(...t){super(...t),e.current=this}_renderHTML(){return q`
			<div>
				<span class="tht-toolbar-item-label">Token 1</span>
				${this.#t(1,K.token1,K.h1)}
			</div>

			<div>
				<span class="tht-toolbar-item-label">Token 2</span>
				${this.#t(2,K.token2,K.h2)}
			</div>

			<label class="tht-toolbar-checkbox flex0">
				<input
					type="checkbox"
					name="rulerIncludeNoHeightTerrain"
					.checked=${ur}
					@change=${e=>ur.value=e.target.checked}>
				<span inert>${ra(`TERRAINHEIGHTTOOLS.IncludeZones`)}</span>
			</label>
		`}#t(e,t,n){let r=z(()=>t.value?.name??ra(`TERRAINHEIGHTTOOLS.NoTokenSelected`)),i=z(()=>t.value?.document.texture?.src??``),a=z(()=>Mr({visibility:i.value?`visible`:`hidden`})),o=Lr(),s=z(()=>game.i18n.format(`TERRAINHEIGHTTOOLS.TokenLineOfSightRelativeRayPosition`,{current:game.i18n.localize(y[n.value])}));cr(s,()=>Promise.resolve().then(()=>{game.tooltip.element===o.value&&game.tooltip.activate(game.tooltip.element)},0),this.closeSignal);let c=z(()=>({1:`fas fa-chevron-up`,.5:`fas fa-minus`,0:`fas fa-chevron-down`})[n]);return q`
			<div
				class=${z(()=>J({"token-selection-container":!0,"is-selecting-token":this.#e.value===e}))}
				data-tooltip=${ra(`TERRAINHEIGHTTOOLS.SelectToken`)}
				@click=${()=>this.#n(e)}
			>
				<img
					class="token-image"
					src=${i}
					style=${a}
				>
				<span class="token-name">${r}</span>
				<a
					class="token-action"
					data-tooltip=${s}
					@click=${e=>{e.stopPropagation(),n.value=(n.value+.5)%1.5}}
					${Br(o)}
				>
					<i class=${c} style="width:20px;text-align:center"></i>
				</a>
				<a
					class="token-action"
					data-tooltip=${ra(`TERRAINHEIGHTTOOLS.ClearSelectedToken`)}
					@click=${e=>this.#r(e,t)}
				>
					<i class="fas fa-xmark"></i>
				</a>
			</div>
		`}_onFirstRender(...e){super._onFirstRender(...e),lr(()=>{document.querySelector(`#board`)?.classList[this._isSelectingToken$.value?`add`:`remove`](`tht-selecting-token`)},this.closeSignal)}close(e){return K.value={token1:void 0,token2:void 0},this.#e.value=void 0,super.close(e)}#n(e){this.#e.value=this.#e.value===e?void 0:e,this.#e.value&&ui.notifications.info(game.i18n.localize(`TERRAINHEIGHTTOOLS.TokenLineOfSightSelectTokenHint`))}_onSelectToken(e){if(typeof this.#e.value!=`number`)return;let[t,n]=this.#e.value===1?[K.token1,K.token2]:[K.token2,K.token1];if(n.value===e){ui.notifications.error(game.i18n.localize(`TERRAINHEIGHTTOOLS.SameTokenSelected`));return}t.value=e,this.#e.value=void 0}#r(e,t){e.stopPropagation(),t.value=void 0,this.#e.value=void 0}};let aa=!1;function oa(){Hooks.on(`canvasReady`,()=>{aa=!0,ca(Gn.value,!0)}),Hooks.on(`canvasTearDown`,()=>{aa=!1}),Gn.subscribe({change:(e,t,n)=>ca([...t,...n])}),V.subscribe(()=>{ca(Gn.value)}),Hooks.on(`renderRegionLegend`,(e,t)=>{for(let e of la())t.querySelector(`[data-region-id="${e.id}"]`)?.style.setProperty(`display`,`none`)}),Hooks.on(`renderRegionConfig`,(e,t)=>{if(!la().includes(e.document))return;let n=document.createElement(`div`);n.innerHTML=game.i18n.localize(`TERRAINHEIGHTTOOLS.RegionManagedByThtWarning`),n.style.setProperty(`color`,`var(--error-color)`),t.querySelector(`.window-content`).prepend(n);for(let e of t.querySelectorAll(`.window-content :is(input, select, a:not([data-action='tab']), button)`))e.setAttribute(`disabled`,`disabled`)})}async function sa(e,t=!1){if(!aa||!game.user.isActiveGM)return;let n=[],i=[],a=new Set;if(t){let e=new Set([...Gn.value].map(da));for(let t of la()){let n=ua(t);e.delete(n)||(zt(`Cleaning up unused scene region ('${t._id}')`),a.add(t._id))}}let o=Mt(e,e=>e.terrainTypeId,e=>e.top,e=>e.bottom).map(({terrainTypeId:e,top:t,bottom:n})=>{let r=xt.value.get(e)?.usesHeight;return{terrainTypeId:e,top:r?t:null,bottom:r?n:null}}),s=new Map(la().map(e=>[ua(e),e])),c=At(Gn.value,da);for(let{terrainTypeId:e,top:t,bottom:l}of o){let o=fa(e,t,l),u=s.get(o),d=c.get(o),f=xt.value.get(e),p=d?.length>0&&f?.regionBehaviors.length>0;if(!p&&u&&(zt(`Deleting unnessecary scene region ${f?.name} at ${l}->${t} (region '${u._id}')`),a.add(u._id)),!p)continue;let m={...u?{_id:u._id}:{},name:`THT Automatic Region (${f.name})`,color:f.fillColor,shapes:d.flatMap(e=>[{type:`polygon`,points:e.polygon.vertices.flatMap(({x:e,y:t})=>[e,t]),hole:!1},...e.holes.map(e=>({type:`polygon`,points:e.vertices.flatMap(({x:e,y:t})=>[e,t]),hole:!0}))]),elevation:{top:f.usesHeight?U(t):null,bottom:f.usesHeight?U(l):null},behaviors:f.regionBehaviors,visibility:CONST.REGION_VISIBILITY.LAYER,locked:!0,flags:{[r]:{[g.terrainTypeId]:f.id}}};u?(zt(`Updating scene region ${f.name} at ${l}->${t} (region '${m._id}')`),i.push(m)):(zt(`Creating scene region ${f.name} at ${l}->${t}`),n.push(m))}await Promise.all([n.length?canvas.scene.createEmbeddedDocuments(`Region`,n):Promise.resolve(),i.length?canvas.scene.updateEmbeddedDocuments(`Region`,i,{recursive:!1}):Promise.resolve(),a.size?canvas.scene.deleteEmbeddedDocuments(`Region`,[...a]):Promise.resolve()])}let ca=(()=>{let e=!0,t=!1,n,r=new Set,i=!1,a=()=>{e=!1,t=!1,sa([...r],i).then(()=>{e=!0,r=new Set,i=!1,t&&a()})};return(o,s)=>{r=new Set([...r,...o]),i||=s,t=!0,e&&(clearTimeout(n),n=setTimeout(a,200))}})();function la(){return canvas.scene.regions.filter(e=>e.flags[r]?.[g.terrainTypeId])}function ua(e){return fa(e.flags[r]?.[g.terrainTypeId],e._source.elevation.top,e._source.elevation.bottom)}function da(e){let t=e.terrainType?.usesHeight;return fa(e.terrainTypeId,t?e.top:null,t?e.bottom:null)}function fa(e,t,n){return`${e}|${t}|${n}`}let pa=[`walk`,`crawl`,`climb`,`jump`,`teleport`,`blink`],ma=Symbol(`thtTerrainTop`),ha=Symbol(`thtElevationChanged`);function ga(e,t,n,r){let i=e(t,n,r);if(!(Ni.value&&!this.document._source.flags?.[`terrain-height-tools`]?.[h.ignoreAutoElevation]&&pa.includes(this.document.movementAction)))return i;let{x:a,y:o,width:s,height:c,shape:l}=this.document._source,u=gr(this.document),d=t[ma]??xa({x:a,y:o,width:s,height:c,shape:l},{terrainFilter:e=>e.bottom<=t.elevation+u}),f=t.elevation-d,p=xa({...i,width:s,height:c,shape:l},{gapSearch:{currentTerrainTop:d,currentElevationAboveTerrain:f,tokenZHeight:u}}),m=p-d;return i.elevation+=U(m),i[ma]=p,i}function _a(e,t,n,r){let i=e(t,n,r);if(!(Ni.value&&!this.document._source.flags?.[`terrain-height-tools`]?.[h.ignoreAutoElevation]&&pa.includes(this.document.movementAction)))return i;let{width:a,height:o,shape:s,elevation:c}=this.document._source,l=gr(this.document),u=xa(this.document._source,{elevation:c,height:l}),d=xa({x:i.x,y:i.y,width:a,height:o,shape:s},{elevation:c,height:l})-u;return i.elevation+=U(d),i[ha]=d!==0,i}function va(e,...t){let n=e(...t);if(!Pi.value)return n;for(let{_id:e}of n[0]){let[t]=n[1].movement[e].waypoints;t[ha]&&(t.action=`climb`)}return n}function ya(e,t){let n=e(t);if(n.length<=1||!Ni.value||!Pi.value||this.flags?.[`terrain-height-tools`]?.[h.ignoreAutoElevation])return n;let r=gr(this),i=xa(n[0],{terrainFilter:e=>e.bottom<=n[0].elevation+r});for(let e=1;e<n.length;e++){if(!pa.includes(n[e].action))continue;let t=xa(n[e],{gapSearch:{currentTerrainTop:i,currentElevationAboveTerrain:n[e].elevation-i,tokenZHeight:r}});n[e].elevation=U(t),t!==i&&(Object.assign(n[e-1],{intermediate:!1}),Object.assign(n[e],{action:`climb`,elevation:t,intermediate:!1})),i=t}return n}function ba(e,t,n,r){if(r!==game.userId||!Ni.value||e.getFlag(`terrain-height-tools`,h.ignoreAutoElevation))return;let i=xa(e);e.updateSource({elevation:i})}function xa(e,{terrainFilter:t,gapSearch:n}={}){let{x:r,y:i,width:a,height:o,shape:s}=e,{type:c,size:l}=canvas.grid,u=[{bottom:-1/0,top:0}],d=0;for(let e of en(r,i,a,o,c,l,s)){let n=W.getShapesAtPoint(e.x,e.y);if(n?.length>0)for(let e of n){let n=Dt(e.terrainTypeId);!n?.usesHeight||!n.isSolid||typeof t==`function`&&!t(e)||(d=Math.max(d,e.top),u.push({bottom:c===CONST.GRID_TYPES.GRIDLESS?e.bottom:Math.round(e.bottom),top:c===CONST.GRID_TYPES.GRIDLESS?e.top:Math.round(e.top)}))}}if(!n)return c===CONST.GRID_TYPES.GRIDLESS?d:Math.round(d);if(!u.length)return 0;u.sort((e,t)=>e.bottom-t.bottom||e.top-t.top);let f=n.currentElevationAboveTerrain+n.tokenZHeight;for(let e=0;e<u.length-1;e++)if(!(u[e+1].bottom-u[e].top<f)&&!(u[e+1].bottom<n.currentTerrainTop+n.tokenZHeight))return u[e].top;return u.at(-1).top}let{ApplicationV2:Sa}=foundry.applications.api,Ca=e=>game.i18n.localize(e);var wa=class e extends ta(Ln(Sa)){static DEFAULT_OPTIONS={id:`tht_lineOfSightRulerToolbar`,classes:[`tht-toolbar`,`flexrow`],window:{frame:!1,positioned:!1}};static current;constructor(...t){super(...t),e.current=this}_renderHTML(){return q`
			<div>
				<label class="tht-toolbar-item-label" for="tht_lineOfSightRulerToolbar_startHeight">
					${Ca(`TERRAINHEIGHTTOOLS.StartHeight.Name`)}
				</label>
				<div class="flexrow gap-05rem">
					<input
						type="number"
						id="tht_lineOfSightRulerToolbar_startHeight"
						.value=${z(()=>U(G.h1.value))}
						min="0"
						@input=${this.#e}
					>
					${F(canvas.scene.grid.units,()=>q`<span class="flex0">${canvas.scene.grid.units}</span>`)}
				</div>
			</div>

			<div>
				<label class="tht-toolbar-item-label" for="tht_lineOfSightRulerToolbar_endHeight">
					${Ca(`TERRAINHEIGHTTOOLS.EndHeight.Name`)}
				</label>
				<div class="flexrow gap-05rem">
					<input
						type="number"
						id="tht_lineOfSightRulerToolbar_endHeight"
						.value=${z(()=>{let e=G.h2.value;return typeof e==`number`?U(e):``})}
						min="0"
						placeholder=${Ca(`TERRAINHEIGHTTOOLS.SameAsStart`)}
						@input=${this.#t}
					>
					${F(canvas.scene.grid.units,()=>q`<span class="flex0">${canvas.scene.grid.units}</span>`)}
				</div>
			</div>

			<label class="tht-toolbar-checkbox flex0">
				<input
					type="checkbox"
					name="rulerIncludeNoHeightTerrain"
					.checked=${ur}
					@change=${this.#n}
				>
				<span inert>${Ca(`TERRAINHEIGHTTOOLS.IncludeZones`)}</span>
			</label>
		`}#e(e){let t=Jt(+e.target.value);!isNaN(t)&&G.h1.value!==t&&(G.h1.value=t)}#t(e){if(e.target.value===``){G.h2.value=void 0;return}let t=Jt(+e.target.value);!isNaN(t)&&G.h2.value!==t&&(G.h2.value=t)}#n(e){ur.value=e.target.checked}};let Ta=`terrainHeightLayerToggle`;function Ea(e){Object.assign(e.tokens.tools,{[u.lineOfSight]:{name:u.lineOfSight,title:`CONTROLS.TerrainHeightToolsLineOfSightRuler`,icon:`fas fa-ruler-combined`,toolclip:{heading:`CONTROLS.TerrainHeightToolsLineOfSightRuler`,items:[{heading:`CONTROLS.TerrainHeightToolsTokenLineOfSightDrawRuler`,reference:`CONTROLS.ClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsLineOfSightRulerP`}]}},[u.tokenLineOfSight]:{name:u.tokenLineOfSight,title:`CONTROLS.TerrainHeightToolsTokenLineOfSight`,icon:`fas fa-compass-drafting`,onChange:()=>{wr.current?._autoSelectTokenLosTargets()},toolclip:{heading:`CONTROLS.TerrainHeightToolsTokenLineOfSight`,items:[{paragraph:`CONTROLS.TerrainHeightToolsTokenLineOfSightP`}]}},[Ta]:{name:Ta,title:`CONTROLS.TerrainHeightToolsLayerToggle`,icon:`fas fa-chart-simple`,onChange:(e,t)=>game.settings.set(r,f.showTerrainHeightOnTokenLayer,t),toggle:!0,active:game.settings.get(r,f.showTerrainHeightOnTokenLayer),toolclip:{heading:`CONTROLS.TerrainHeightToolsLayerToggle`,items:[{paragraph:`CONTROLS.TerrainHeightToolsLayerToggleP`}]}}}),e[l]={name:l,title:`CONTROLS.GroupTerrainHeightTools`,icon:`fas fa-chart-simple`,layer:`terrainHeightEditorLayer`,activeTool:u.paint,visible:game.user.isGM,onChange:(e,t)=>{t&&canvas.terrainHeightEditorLayer?.activate()},tools:{[u.paint]:{name:u.paint,title:`CONTROLS.TerrainHeightToolsPaint`,icon:`fas fa-paintbrush-alt`},[u.erase]:{name:u.erase,title:`CONTROLS.TerrainHeightToolsErase`,icon:`fas fa-eraser`},[u.terrainVisibility]:{name:u.terrainVisibility,title:`CONTROLS.TerrainHeightToolsTerrainVisibility`,icon:`fas fa-eye-slash`},[u.convert]:{name:u.convert,title:`CONTROLS.TerrainHeightToolsShapeConvert`,icon:`fas fa-arrow-turn-right`},clear:{name:`clear`,title:`CONTROLS.TerrainHeightToolsClear`,icon:`fas fa-trash`,onChange:async()=>{await foundry.applications.api.DialogV2.confirm({window:{title:`TERRAINHEIGHTTOOLS.ClearConfirmTitle`},content:`<p>${game.i18n.format(`TERRAINHEIGHTTOOLS.ClearConfirmContent`)}</p>`,rejectClose:!1})&&W.clear()},button:!0}}}}ki.subscribe(e=>{let t=ui.controls?.controls.tokens.tools[Ta];t&&(t.active=e,ui.controls.render())}),bt(()=>{dr.value===`tokens`&&fr.value===u.lineOfSight?(wa.current??=new wa).render(!0):wa.current?.close({animate:!1}),dr.value===`tokens`&&fr.value===u.tokenLineOfSight?(ia.current??=new ia).render(!0):ia.current?.close({animate:!1})});let X=R(`gridCells`),Z=sr({terrainTypeId:void 0,height:1,elevation:0,mode:`destructiveMerge`}),Da=z(()=>Z.elevation.value+Z.height.value);function Oa(e){Z.height.value=Math.max(e-Z.elevation.value,.1)}function ka(e){let{elevation:t,height:n}=Z.value,r=t+n;Z.value={elevation:e,height:Math.max(r-e,.1)}}let Q=sr({excludedTerrainTypeIds:[],bottom:null,top:null}),Aa=sr({toDrawing:!0,toRegion:!1,toWalls:!1,setWallHeightFlags:!0,deleteAfter:!0}),ja=R(foundry.documents.WallDocument.schema.clean({}));window.wallConfig$=ja;let Ma=e=>class extends e{_configureRenderOptions(e){if(super._configureRenderOptions(e),e.isFirstRender&&ui.nav){let{right:t,top:n}=ui.nav.element.getBoundingClientRect(),r=game.settings.get(`core`,`uiConfig`).uiScale;e.position.left??=t+16*r,e.position.top??=n}}},{ApplicationV2:Na,HandlebarsApplicationMixin:Pa}=foundry.applications.api,{WallDocument:Fa}=foundry.documents,Ia=e=>game.i18n.localize(e);var La=class extends Ma(Ln(Na)){static DEFAULT_OPTIONS={id:`tht_shapeConversionConfig`,window:{title:`TERRAINHEIGHTTOOLS.ShapeConversionConfigTitle`,icon:`fas fa-arrow-turn-right`,contentClasses:[`terrain-height-tool-window`]},position:{width:200}};async _renderFrame(e){let t=await super._renderFrame(e);return this.window.close.remove(),t}_renderHTML(){return q`
			<p style="margin-top: 0; font-size: 0.95em;">${Ia(`TERRAINHEIGHTTOOLS.ShapeConversionHint`)}</p>

			<label class="flexrow align-items-center">
				<input
					type="checkbox"
					name="toDrawing"
					class="flex0"
					.checked=${Aa.toDrawing}
					@input=${e=>Aa.toDrawing.value=e.target.checked}
				>
				<span>${Ia(`TERRAINHEIGHTTOOLS.ConvertToDrawing`)}</span>
			</label>

			<label class="flexrow align-items-center">
				<input
					type="checkbox"
					name="toRegion"
					class="flex0"
					.checked=${Aa.toRegion}
					@input=${e=>Aa.toRegion.value=e.target.checked}
				>
				<span>${Ia(`TERRAINHEIGHTTOOLS.ConvertToRegion`)}</span>
			</label>

			<label class="flexrow align-items-center">
				<input
					type="checkbox"
					name="toWalls"
					class="flex0"
					.checked=${Aa.toWalls}
					@input=${e=>Aa.toWalls.value=e.target.checked}
				>
				<span>${Ia(`TERRAINHEIGHTTOOLS.ConvertToWalls`)}</span>
				<button type="button" class="flex0" @click=${()=>new Ra().render(!0)}>
					<i class="fas fa-cogs" style="margin-right: 0;"></i>
				</button>
			</label>

			${F(game.modules.get(`wall-height`)?.active,()=>q`
				<label class="flexrow align-items-center" style="padding-left: 1rem">
					<input
						type="checkbox"
						name="setWallHeightFlags"
						class="flex0"
						.checked=${Aa.setWallHeightFlags}
						?disabled=${z(()=>!Aa.toWalls.value)}
						@input=${e=>Aa.setWallHeightFlags.value=e.target.checked}
					>
					<span>${Ia(`TERRAINHEIGHTTOOLS.SetWallHeightFlags`)}</span>
				</label>
			`)}

			<label class="flexrow align-items-center">
				<input
					type="checkbox"
					name="deleteAfter"
					class="flex0"
					.checked=${Aa.deleteAfter}
					@input=${e=>Aa.deleteAfter.value=e.target.checked}
				>
				<span>${Ia(`TERRAINHEIGHTTOOLS.DeleteAfterConversion`)}</span>
			</label>
		`}},Ra=class e extends Pa(Na){constructor(e={}){super(void 0,e)}static DEFAULT_OPTIONS={id:`tht_wallConversionConfig`,classes:[`wall-config`],tag:`form`,position:{width:480},window:{contentClasses:[`standard-form`],icon:`fa-solid fa-block-brick`},form:{handler:this.#o,closeOnSubmit:!0,submitOnChange:!1},actions:{previewSound:e.#n}};static PARTS={body:{template:`templates/scene/wall-config.hbs`},footer:{template:`templates/generic/form-footer.hbs`}};static#e=[CONST.WALL_SENSE_TYPES.PROXIMITY,CONST.WALL_SENSE_TYPES.DISTANCE];#t=0;async _prepareContext(t){let n=await super._prepareContext(t),{fields:r}=Fa.schema,i={_id:null,...ja.value,flags:{}},a=[`light`,`sight`,`sound`].map(t=>({name:t,label:r[t].label,choices:r[t].choices,disabled:!e.#e.includes(i[t])})),o=[{value:-1,label:game.i18n.localize(`WALL.ANIMATION_DIRECTIONS.REVERSE`)},{value:1,label:game.i18n.localize(`WALL.ANIMATION_DIRECTIONS.DEFAULT`)}];return Object.assign(n,{fields:r,source:i,coordinates:`N/A`,thresholdFields:a,animation:i.animation??r.animation.clean({}),animationDirections:o,animationTypes:CONFIG.Wall.animationTypes,animationFieldsetClass:i.door>0&&i.animation?.type?``:`hidden`,editingMany:!1,rootId:foundry.utils.randomID(),gridUnits:canvas.scene.grid.units??game.i18n.localize(`GridUnits`),doorSounds:CONFIG.Wall.doorSounds,buttons:[{type:`submit`,icon:`fa-solid fa-floppy-disk`,label:`WALL.Submit`}]})}_onChangeForm(e,t){switch(t.target.name){case`door`:this.#r(Number(t.target.value)>CONST.WALL_DOOR_TYPES.NONE),this.#i();break;case`doorSound`:this.#t=0;break;case`light`:case`sight`:case`sound`:this.#a();break;case`animation.type`:this.#i()}}static async#n(){let e=this.form.doorSound.value,t=CONFIG.Wall.doorSounds[e];if(!t)return;let n=CONST.WALL_DOOR_INTERACTIONS,r=t[n[this.#t++%n.length]];if(!r)return;Array.isArray(r)||(r=[r]);let i=r[Math.floor(Math.random()*r.length)];await game.audio.play(i,{context:game.audio.interface})}#r(e){for(let t of[`ds`,`doorSound`,`animation.type`]){let n=this.form[t];n.disabled=!e,n.closest(`.form-group`).hidden=!e}this.setPosition()}#i(){let e=Number(this.form.door.value)>0&&!!this.form[`animation.type`].value;this.element.querySelector(`fieldset.door-animation`).classList.toggle(`hidden`,!e),this.setPosition()}#a(){for(let t of[`light`,`sight`,`sound`]){let n=Number(this.form[t].value),r=this.form[`threshold.${t}`];r.disabled=r.hidden=!e.#e.includes(n)}}_prepareSubmitData(t,n,r,i){let a=foundry.utils.expandObject(r.object);i&&(foundry.utils.mergeObject(a,i,{performDeletions:!0}),foundry.utils.mergeObject(a,i,{performDeletions:!1})),Fa.schema.validate({changes:a,clean:!0,fallback:!1});let o=a.threshold??={};for(let t of[`light`,`sight`,`sound`])e.#e.includes(a[t])||(o[t]=null);return a.door===CONST.WALL_DOOR_TYPES.NONE&&(a.animation=null),a}static#o(e,t,n,r={}){ja.value=this._prepareSubmitData(e,t,n,r.updateData)}},za=class extends PIXI.Container{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e,t,n,r){super(),this.update(e,t,n,r)}update(e,t,n,r){if(this.#e=e,this.#t=t,this.#n=n,this.#c(e))switch(this.#r?this.#r.clear():(this.#r=this.addChild(new PIXI.Graphics),this.#r.zIndex=1),this.#r.lineStyle({color:16777215,alpha:1,width:e.lineWidth,alignment:e.lineAlignment??.5}),this.#r.tint=e.lineColor,this.#r.alpha=e.lineOpacity,e.lineType){case B.SOLID:ir(this.#r,t);for(let e of n)ir(this.#r,e);break;case B.DASHED:{let r={dashSize:e.lineDashSize,gapSize:e.lineGapSize};ar(this.#r,t,r);for(let e of n)ar(this.#r,e,r);break}}else this.#r&&=(this.removeChild(this.#r),this.#r.destroy(),void 0);let i=this.#l(e),a=this.#u(e);if(a){let i=this.#o??=this.addChild(new PIXI.TilingSprite),a=this.#a??=this.addChild(new PIXI.Graphics);i.mask=a,i.texture=e.fillTexture,i.x=r.x,i.y=r.y,i.width=r.width,i.height=r.height,i.tint=e.fillColor,i.alpha=e.fillOpacity;let{x:o,y:s}=e.fillTextureScale??{x:100,y:100};i.tileScale.set(o/100,s/100),a.beginFill(0,1),ir(a,t);for(let e of n)a.beginHole(),ir(a,e),a.endHole()}else if(i){let r=this.#a??=this.addChild(new PIXI.Graphics);if(e.fillType===CONST.DRAWING_FILL_TYPES.PATTERN&&e.fillTexture){let{x:t,y:n}=e.fillTextureOffset??{x:0,y:0},{x:i,y:a}=e.fillTextureScale??{x:100,y:100};r.beginTextureFill({texture:e.fillTexture,color:16777215,alpha:1,matrix:new PIXI.Matrix(i/100,0,0,a/100,t,n)})}else r.beginFill(16777215,1);r.tint=e.fillColor,r.alpha=e.fillOpacity,ir(r,t);for(let e of n)r.beginHole(),ir(r,e),r.endHole()}!i&&this.#a&&(this.removeChild(this.#a),this.#a.destroy(),this.#a=void 0),!a&&this.#o&&(this.removeChild(this.#o),this.#o.destroy(),this.#o=void 0),this.#i=e?.lineColorAnimation?Pn(e.lineColorAnimation.keyframes):void 0,this.#s=e?.fillColorAnimation?Pn(e.fillColorAnimation.keyframes):void 0}clear(){this.update(null,null,[],null)}tick(){let e=Date.now();if(this.#r&&this.#e.lineColorAnimation&&this.#i){let{duration:t,easingFunc:n}=this.#e.lineColorAnimation,{color:r,alpha:i}=Fn(this.#i,t,n,e);this.#r.tint=An(r,i),this.#r.alpha=i}if(this.#r&&this.#e.lineType===B.DASHED&&(this.#e.lineDashOffsetAnimation??0)!==0){this.#r.clear(),this.#r.lineStyle({color:16777215,alpha:1,width:this.#e.lineWidth,alignment:.5});let t={dashSize:this.#e.lineDashSize,gapSize:this.#e.lineGapSize,offset:e/1e3*this.#e.lineDashOffsetAnimation};ar(this.#r,this.#t,t);for(let e of this.#n)ar(this.#r,e,t)}if(this.#a&&this.#e.fillColorAnimation&&this.#s){let{duration:t,easingFunc:n}=this.#e.fillColorAnimation,{color:r,alpha:i}=Fn(this.#s,t,n,e),a=this.#o??this.#a;a.tint=An(r,i),a.alpha=i}if(this.#o&&this.#e.fillTextureOffsetAnimation){let{x:t,y:n}=this.#e.fillTextureOffsetAnimation,r=e/1e3*t%(this.#e.fillTexture?.width??1),i=e/1e3*n%(this.#e.fillTexture?.height??1);this.#o.tilePosition.set(r,i)}}#c(e){return e&&e.lineType!==B.NONE&&e.lineWidth>0&&(e.lineOpacity>0||!!e.lineColorAnimation)}#l(e){return e&&e.fillType!==CONST.DRAWING_FILL_TYPES.NONE&&(e.fillOpacity>0||!!e.fillColorAnimation)}#u(e){return this.#l(e)&&e.fillType===CONST.DRAWING_FILL_TYPES.PATTERN&&!!e.fillTexture&&!!e.fillTextureOffsetAnimation&&e.fillTextureOffsetAnimation.x!==0&&e.fillTextureOffsetAnimation.y!==0}};let{CanvasAnimation:Ba}=foundry.canvas.animation,{PreciseText:Va}=foundry.canvas.containers,Ha=[.5,.4,.6,.2,.8];var Ua=class extends za{#e;#t;shape;terrainType;#n;#r;#i;#a;constructor(e,t){super(),this.sortableChildren=!0,this.#e=e,this.#t=foundry.utils.randomID(),this.shape=t,this.terrainType=wt.value.get(t.terrainTypeId),this.#i=this.terrainType?.textColorAnimation?Pn(this.terrainType.textColorAnimation.keyframes):null,this.#a=this.tick.bind(this),this.#o(),this._redrawLabel(),this.#s()}_destroy(){this.#n&&canvas.blurFilters.delete(this.#n.filters[0]),canvas.app.ticker.remove(this.#a)}get elevation(){return this.shape.elevation}sortLayer=0;sort=0;get zIndex(){return Ct.value.findIndex(e=>e.id===this.shape.terrainTypeId)}async _setVisible(e,t){let n=`thtShape_${this.#t}_alpha`;await Ba.animate([{parent:this,attribute:`alpha`,to:+!!e}],{name:n,duration:t?250:1})}async#o(){this.terrainType&&(super.update({lineType:this.terrainType.lineType,lineWidth:this.terrainType.lineWidth,lineColor:Color.from(this.terrainType.lineColor),lineOpacity:this.terrainType.lineOpacity,lineColorAnimation:this.terrainType.lineColorAnimation,lineDashSize:this.terrainType.lineDashSize,lineGapSize:this.terrainType.lineGapSize,lineDashOffsetAnimation:this.terrainType.lineDashOffsetAnimation,lineAlignment:0,fillType:this.terrainType.fillType,fillColor:Color.from(this.terrainType.fillColor),fillOpacity:this.terrainType.fillOpacity,fillColorAnimation:this.terrainType.fillColorAnimation,fillTexture:await this.#e._terrainTextures.get(this.shape.terrainTypeId),fillTextureOffset:this.terrainType.fillTextureOffset,fillTextureOffsetAnimation:this.terrainType.fillTextureOffsetAnimation,fillTextureScale:this.terrainType.fillTextureScale},Ga(this.shape.polygon),this.shape.holes.map(Ga),this.shape.polygon.boundingRect),canvas.app.ticker.add(this.#a))}#s(){if((this.terrainType.lineFadeDistance??0)<=0||this.terrainType.lineFadeOpacity<=0)return;let e=new PIXI.Graphics;this.#n=this.addChild(e),e.zIndex=.5,e.lineStyle({width:48*this.terrainType.lineFadeDistance,color:Color.from(this.terrainType.lineFadeColor??`#000000`),alpha:this.terrainType.lineFadeOpacity??1,alignment:0}),this.#l(e,this.shape.polygon);for(let t of this.shape.holes)this.#l(e,t);e.filters=[canvas.createBlurFilter(60*this.terrainType.lineFadeDistance,CONFIG.Canvas.blurQuality*2)];let t=this.addChild(new PIXI.Graphics);t.beginFill(0),this.#l(t,this.shape.polygon);for(let e of this.shape.holes)t.beginHole(),this.#l(t,e),t.endHole();e.mask=t}_redrawLabel(){this.#r&&this.removeChild(this.#r);let e=game.settings.get(r,f.smartLabelPlacement),t=this.terrainType.textRotation,n=this.#c(),i=new Va(Wa(this.shape,this.terrainType),n);this.#r=this.addChild(i),i.zIndex=30,i.anchor.set(.5);let a=(e,t,n)=>{i.x=e,i.y=t,i.rotation=n?(e<canvas.dimensions.width/2?-1:1)*Math.PI/2:0},o=this.shape.polygon.edges.concat(this.shape.holes.flatMap(e=>e.edges)),s=(e,t,n=!1)=>{let r=n?new Pt(new H(e,t-i.width/2),new H(e,t+i.width/2)):new Pt(new H(e-i.width/2,t),new H(e+i.width/2,t));return this.shape.containsPoint(e,t)&&o.every(e=>!e.intersectsAt(r))};if(!e||s(...this.shape.polygon.centroid,!1))return a(...this.shape.polygon.centroid),i;if(t&&s(...this.shape.polygon.centroid,!0))return a(...this.shape.polygon.centroid,!0),i;let c=[...new Set(Ha.map(e=>e*this.shape.polygon.boundingBox.h+this.shape.polygon.boundingBox.y1).map(e=>[CONST.GRID_TYPES.SQUARE,CONST.GRID_TYPES.HEXEVENR,CONST.GRID_TYPES.HEXODDR].includes(canvas.grid.type)?canvas.grid.getCenterPoint({x:this.shape.polygon.boundingBox.xMid,y:e}).y:e))],l={y:0,x:0,width:-1/0};for(let e of c){let t=this.shape.polygon.edges.map(t=>t.intersectsYAt(e)).concat(this.shape.holes.flatMap(t=>t.edges.flatMap(t=>t.intersectsYAt(e)))).filter(Number).sort((e,t)=>e-t);for(let[n,r]of Nt(t,2)){let t=r-n;t>l.width&&(l={x:(n+r)/2,y:e,width:t})}}if(t){let e=[...new Set(Ha.map(e=>e*this.shape.polygon.boundingBox.w+this.shape.polygon.boundingBox.x1).map(e=>[CONST.GRID_TYPES.SQUARE,CONST.GRID_TYPES.HEXEVENQ,CONST.GRID_TYPES.HEXODDQ].includes(canvas.grid.type)?canvas.grid.getCenterPoint({x:e,y:this.shape.polygon.boundingBox.yMid}).x:e))],t={y:0,x:0,height:-1/0};for(let n of e){let e=this.shape.polygon.edges.map(e=>e.intersectsXAt(n)).concat(this.shape.holes.flatMap(e=>e.edges.flatMap(e=>e.intersectsXAt(n)))).filter(Number).sort((e,t)=>e-t);for(let[r,i]of Nt(e,2)){let e=i-r;e>t.height&&(t={x:n,y:(r+i)/2,height:e})}}if(t.height>l.width)return a(t.x,t.y,!0),i}return a(l.x,l.y),i}tick(){if(super.tick(),this.#r&&this.#i){let{duration:e,easingFunc:t}=this.terrainType.textColorAnimation,{color:n,alpha:r}=Fn(this.#i,e,t,Date.now());this.#r.style.fill=An(n,r),this.#r.alpha=r}}#c(){let e=CONFIG.canvasTextStyle.clone(),t=Color.from(this.terrainType.textColor??16777215),n=t.hsv[2]>.6?0:16777215;return e.fontFamily=this.terrainType.font??CONFIG.defaultFontFamily,e.fontSize=this.terrainType.textSize,e.fill=t,e.strokeThickness=this.terrainType.textStrokeThickness,e.stroke=this.terrainType.textStrokeColor?.length?Color.from(this.terrainType.textStrokeColor):n,e.dropShadow=this.terrainType.textShadowAmount>0,e.dropShadowBlur=this.terrainType.textShadowAmount,e.dropShadowColor=this.terrainType.textShadowColor?.length?Color.from(this.terrainType.textShadowColor):n,e.dropShadowAlpha=this.terrainType.textShadowOpacity,e}#l(e,t){e.moveTo(t.vertices.at(-1).x,t.vertices.at(-1).y);for(let n=0;n<t.vertices.length;n++)e.lineTo(t.vertices[n].x,t.vertices[n].y);e.closePath(),e.endFill()}};function Wa(e,t){let n=e.elevation!==0&&t.elevatedTextFormat?.length>0?t.elevatedTextFormat:t.textFormat;return t.usesHeight?n.replace(/%h%/g,Vt(U(e.height))).replace(/%e%/g,Vt(U(e.elevation))).replace(/%t%/g,Vt(U(e.height+e.elevation))):n}function Ga(e){return[{type:`m`,x:e.vertices.at(-1).x,y:e.vertices.at(-1).y},...e.vertices.map(({x:e,y:t})=>({type:`l`,x:e,y:t}))]}let Ka=new Map;var qa=class{static APPLICATION_TYPE;constructor(){this._renderApplication()}_onMouseDownLeft(e,t){}_onMouseDownRight(e,t){}_onMouseMove(e,t){}_onMouseUpLeft(e,t){}_onMouseUpRight(e,t){}_onKeyDown(e){}_onKeyUp(e){}_cleanup(){Ka.get(this.constructor.APPLICATION_TYPE)?.close({animate:!1})}_renderApplication(){let{APPLICATION_TYPE:e}=this.constructor;if(!e)return;let t=Ka.get(e);t||(t=new e,Ka.set(e,t)),t.render(!0)}},Ja=class extends qa{static APPLICATION_TYPE=La;_onMouseDownLeft(e,t){W.getSingleShapeAtPoint(e,t,{hint:`TERRAINHEIGHTTOOLS.SelectAShapeConvertHint`,submitLabel:`TERRAINHEIGHTTOOLS.ConvertSelectedShape`,submitIcon:`fas fa-arrow-turn-right`}).then(e=>{e&&this._selectShape(e)})}async _selectShape(e){let{toDrawing:t,toRegion:n,toWalls:r,setWallHeightFlags:i,deleteAfter:a}=Aa.value,o=Dt(e.terrainTypeId);if(o){if(t){let{x1:t,y1:n,w:r,h:i}=e.polygon.boundingBox;await canvas.scene.createEmbeddedDocuments(`Drawing`,[{x:t,y:n,shape:{type:`p`,width:r,height:i,points:[...e.polygon.vertices.flatMap(e=>[e.x-t,e.y-n]),e.polygon.vertices[0].x-t,e.polygon.vertices[0].y-n]},fillAlpha:o.fillOpacity,fillColor:o.fillColor,fillType:o.fillType,texture:o.fillTexture,strokeAlpha:o.lineOpacity,strokeColor:o.lineColor,strokeWidth:o.lineWidth,text:Wa(e,o),textAlpha:o.textOpacity,textColor:o.textColor,fontFamily:o.font,fontSize:o.textSize},...e.holes.map(e=>{let{x1:t,y1:n,w:r,h:i}=e.boundingBox;return{x:t,y:n,shape:{type:`p`,width:r,height:i,points:[...e.vertices.flatMap(e=>[e.x-t,e.y-n]),e.vertices[0].x-t,e.vertices[0].y-n]},fillType:CONST.DRAWING_FILL_TYPES.NONE,texture:o.fillTexture,strokeAlpha:o.lineOpacity,strokeColor:o.lineColor,strokeWidth:o.lineWidth}})].filter(Boolean))}if(n&&await canvas.scene.createEmbeddedDocuments(`Region`,[{name:o.name,color:Color.from(o.fillColor),elevation:o.usesHeight?{top:e.top,bottom:e.bottom}:{top:null,bottom:null},shapes:[{type:`polygon`,hole:!1,points:e.polygon.vertices.flatMap(e=>[e.x,e.y])},...e.holes.map(e=>({type:`polygon`,hole:!0,points:e.vertices.flatMap(e=>[e.x,e.y])}))],visibility:CONST.REGION_VISIBILITY.ALWAYS,behaviors:o.regionBehaviors}]),r){let t=i&&game.modules.get(`wall-height`)?.active?{"wall-height":{top:U(e.top),bottom:U(e.bottom)}}:{};await canvas.scene.createEmbeddedDocuments(`Wall`,[...e.polygon.edges,...e.holes.flatMap(e=>e.edges)].map(e=>({...ja.value,c:[e.p1.x,e.p1.y,e.p2.x,e.p2.y],flags:t})))}a&&await W.eraseShapes(e),ui.notifications.info(game.i18n.localize(`TERRAINHEIGHTTOOLS.NotifyShapeConversionComplete`))}}};let Ya=navigator.appVersion.includes(`Mac`),Xa=mn(class extends Sn{render(e,t){let n=game.settings.get(`core`,`showToolclips`);return e&&n&&foundry.applications.handlebars.renderTemplate(`templates/ui/toolclip.hbs`,{...e,mod:Ya?`⌘`:game.i18n.localize(`CONTROLS.CtrlAbbr`),alt:Ya?`⌥`:game.i18n.localize(`CONTROLS.Alt`)}).then(e=>this.setValue(e)),t?game.i18n.localize(t):P}});var Za=class extends et{static properties={value:{},items:{type:Array},labelSelector:{type:String},iconSelector:{type:String},valueSelector:{type:String},toolclipSelector:{type:String}};constructor(){super(),this.value=void 0,this.items=[],this.labelSelector=void 0,this.iconSelector=void 0,this.valueSelector=void 0,this.toolclipSelector=void 0}render(){return N`
			<div class="segment-fwl">
				${this.items.map(e=>N`
					<div
						class=${J({"segment-fwl-item":!0,active:this.#n(e)===this.value})}
						@click=${()=>this.#i(e)}
						data-tooltip=${F(this.#r(e),e=>Xa(e),P)}
					>
						${F(this.#t(e),e=>N`<i class=${e}></i>`)}
						${F(this.#e(e),e=>N`<span>${e}</span>`)}
					</div>
				`)}
			</div>
		`}#e(e){switch(typeof this.labelSelector){case`function`:return this.labelSelector(e);case`string`:return e[this.labelSelector];default:return typeof e==`object`?e.label:e}}#t(e){switch(typeof this.iconSelector){case`function`:return this.iconSelector(e);case`string`:return e[this.iconSelector];default:return typeof e==`object`?e.icon:void 0}}#n(e){switch(typeof this.valueSelector){case`function`:return this.valueSelector(e);case`string`:return e[this.valueSelector];default:return typeof e==`object`?e.value:e}}#r(e){switch(typeof this.toolclipSelector){case`function`:return this.toolclipSelector(e);case`string`:return e[this.toolclipSelector];default:return typeof e==`object`?e.toolclip:void 0}}#i(e){let t=this.#n(e);this.value=t,this.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!1,composed:!0}))}createRenderRoot(){return this}};customElements.define(`segment-fwl`,Za);var Qa=class extends Hr{static properties={buttonTemplate:{},dropdownTemplate:{},dropdownClasses:{type:String}};constructor(){super(),this.buttonTemplate=P,this.dropdownTemplate=P,this.dropdownClasses=``}_renderButton(){return this.buttonTemplate}_renderDropdown(){return this.dropdownTemplate}};customElements.define(`template-dropdown-fwl`,Qa);let{ApplicationV2:$a}=foundry.applications.api,eo=e=>game.i18n.localize(e);var to=class extends ta(Ln($a)){static DEFAULT_OPTIONS={id:`tht_terrainEraseToolbar`,classes:[`tht-toolbar`,`flexrow`],window:{frame:!1,positioned:!1}};_renderHTML(){return q`
			<div class="flex0">
				<span class="tht-toolbar-item-label">${eo(`TERRAINHEIGHTTOOLS.Tool`)}</span>
				<segment-fwl
					class="flex0"
					.items=${this.#n()}
					.value=${X}
					@change=${e=>X.value=e.target.value}
				></segment-fwl>
			</div>

			<div>
				<span class="tht-toolbar-item-label">${eo(`TERRAINHEIGHTTOOLS.TerrainTypesToErase`)}</span>
				<template-dropdown-fwl
					.buttonTemplate=${z(()=>q`
						<span class="tht-erase-dropdown-button-label">${this.#e()}</span>
					`)}
					.dropdownTemplate=${z(()=>this.#t())}
					dropdownClasses="p-0"
				></template-dropdown-fwl>
			</div>

			<div class="tht-toolbar-num-input">
				<label class="tht-toolbar-item-label" for="thtEraseToolbar_rangeBottom">
					${eo(`TERRAINHEIGHTTOOLS.Bottom`)}
				</label>
				<input
					type="number"
					class="tht-erase-range-input text-align-center"
					id="thtEraseToolbar_rangeBottom"
					placeholder="- &#xf534;"
					.max=${z(()=>U(Q.top.value))}
					.value=${z(()=>U(Q.bottom.value))}
					@input=${e=>Q.bottom.value=Jt(this.#i(e))}
					@blur=${this.#o}
				>
			</div>

			<div class="tht-toolbar-num-input">
				<label class="tht-toolbar-item-label" for="thtEraseToolbar_rangeTop">
					${eo(`TERRAINHEIGHTTOOLS.Top`)}
				</label>
				<input
					type="number"
					class="tht-erase-range-input text-align-center"
					id="thtEraseToolbar_rangeTop"
					placeholder="+ &#xf534;"
					.min=${z(()=>U(Q.bottom.value))}
					.value=${z(()=>U(Q.top.value))}
					@input=${e=>Q.top.value=Jt(this.#i(e))}
					@blur=${this.#a}
				>
			</div>

			<button type="button" class="flex0" @click=${this.#u} style="border: 0">
				<i class="fas fa-cog"></i>
			</button>
		`}#e(){let e=V.value.length,t=Q.excludedTerrainTypeIds.value.length;switch(!0){case t===0:return`All`;case t===e:return q`None <i class="fa fa-triangle-exclamation"></i>`;case t<=Math.min(Math.floor(e*.5),5):return`All except ${V.value.filter(e=>Q.excludedTerrainTypeIds.value.includes(e.id)).map(e=>e.name).join(`, `)}`;default:return V.value.filter(e=>!Q.excludedTerrainTypeIds.value.includes(e.id)).map(e=>e.name).join(`, `)}}#t=()=>q`
		<ul class="tht-terrain-type-palette">
			${V.value.map(e=>q`
				<li
					class=${z(()=>J({"align-items-center":!0,"opacity-04":Q.excludedTerrainTypeIds.value.includes(e.id)}))}
					@click=${()=>this.#r(e.id)}
				>
					<div
						class="tht-terrain-preview-box"
						style=${In(e,{textColorCssPropertyName:``,lineWidthCssPropertyName:``})}
						inert
					></div>
					<label class="terrain-type-name" inert>${e.name}</label>
				</li>
			`)}
		</ul>

		<div class="p-05rem text-align-right">
			<a data-tooltip=${eo(`SelectAll`)} @click=${this.#s}>
				<i class="fas fa-circle"></i>
			</a>
			<a data-tooltip=${eo(`SelectNone`)} @click=${this.#c}>
				<i class="far fa-circle"></i>
			</a>
			<a data-tooltip=${eo(`InvertSelection`)} @click=${this.#l}>
				<i class="fas fa-circle-half-stroke"></i>
			</a>
		</div>
	`;#n(){return[canvas.grid?.type&&canvas.grid.type!==CONST.GRID_TYPES.GRIDLESS&&{value:d.gridCells,icon:`fas fa-grid-3`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeGridCells`,src:`modules/terrain-height-tools/toolclips/drawingmode-cells.mp4`,items:[{heading:`CONTROLS.CommonDraw`,content:`CONTROLS.ClickOrClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.rectangle,icon:`far fa-rectangle`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeRectangle`,src:`modules/${r}/toolclips/drawingmode-rect.mp4`,items:[{heading:`CONTROLS.CommonDraw`,reference:`CONTROLS.ClickDrag`},{heading:`CONTROLS.CommonDrawProportional`,reference:`CONTROLS.AltClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.ellipse,icon:`far fa-circle`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeEllipse`,src:`modules/${r}/toolclips/drawingmode-ellipse.mp4`,items:[{heading:`CONTROLS.CommonDraw`,reference:`CONTROLS.ClickDrag`},{heading:`CONTROLS.CommonDrawProportional`,reference:`CONTROLS.AltClickDrag`},{heading:`CONTROLS.TerrainHeightToolsDrawingModeEllipseDrawFromCenter`,reference:`CONTROLS.CtrlClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.customPoly,icon:`far fa-draw-polygon`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygon`,src:`modules/${r}/toolclips/drawingmode-custom.mp4`,items:[{heading:`CONTROLS.CommonDraw`,content:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygonDraw`},{heading:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygonRemoveLastPoint`,reference:`CONTROLS.RightClick`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.deleteShape,icon:`far fa-rectangle-xmark`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeDeleteShape`,items:[{heading:`CONTROLS.TerrainHeightToolsDrawingModeDeleteShape`,content:`CONTROLS.TerrainHeightToolsDrawingModeDeleteShapeClick`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeDeleteShapeP`}]}}].filter(Boolean)}#r(e){let t=Q.excludedTerrainTypeIds.value;Q.excludedTerrainTypeIds.value=t.includes(e)?t.filter(t=>t!==e):[...t,e]}#i(e){if([``,null,void 0].includes(e.currentTarget.value))return null;let t=+e.currentTarget.value;return Math.max(isNaN(t)?0:t,0)}#a(e){let{bottom:t,top:n}=Q.value;typeof t==`number`&&typeof n==`number`&&n<t&&(n=Q.top.value=t),e.target.value=U(n)}#o(e){let{bottom:t,top:n}=Q.value;typeof t==`number`&&typeof n==`number`&&t>n&&(t=Q.bottom.value=n),e.target.value=U(t)}#s(){Q.excludedTerrainTypeIds.value=[]}#c(){Q.excludedTerrainTypeIds.value=V.value.map(e=>e.id)}#l(){let e=new Set(Q.excludedTerrainTypeIds.value),t=V.value.map(e=>e.id);Q.excludedTerrainTypeIds.value=t.filter(t=>!e.has(t))}#u(e){Xr.open(e,[{label:eo(`SETTINGS.TerrainTypes.Button`),icon:`fas fa-cog`,onClick:()=>new si().render(!0)}])}},no=class extends qa{_previousModeName=R(void 0);_currentModeName=R(void 0);modes={};#e;#t;_canInteract=R(!0);#n;constructor(){super(),this.#e=canvas.interface.addChild(new PIXI.Graphics),this.#n=new AbortController}get _cleanupSignal(){return this.#n.signal}_selectDrawingMode(e){let t=this.modes[e];t&&(this.#e.clear(),this.#t=t,this.#t._previewGraphics=this.#e,this._previousModeName.value=this._currentModeName.value,this._currentModeName.value=e)}_onMouseDownLeft(e,t){this._canInteract.value&&this.#t?._onMouseDownLeft?.(e,t)}_onMouseUpLeft(e,t){this._canInteract.value&&this.#t?._onMouseUpLeft?.(e,t)}_onMouseMove(e,t){this._canInteract.value&&this.#t?._onMouseMove?.(e,t)}_onMouseDownRight(e,t){this._canInteract.value&&this.#t?._onMouseDownRight?.(e,t)}_onKeyDown(e){this.#t?._onKeyDown(e)}_onKeyUp(e){this.#t?._onKeyUp(e)}_cleanup(){super._cleanup(),canvas.interface.removeChild(this.#e),this.#n.abort()}},ro=class{_previewGraphics;#e;#t;_next;constructor({line:e,fill:t}={}){this.#e=e??(()=>{}),this.#t=t??(()=>{})}_onMouseDownLeft(e,t){}_onMouseUpLeft(e,t){}_onMouseMove(e,t){}_onMouseDownRight(e,t){}_onKeyDown(e){}_onKeyUp(e){}_setPreviewLineStyle(){this.#e(this._previewGraphics)}_setPreviewFillStyle(){this.#t(this._previewGraphics)}then(e){return this._next=e,this}},io=class extends ro{#e=0;#t=[];_onMouseDownLeft(e,t){Date.now()-this.#e<250&&this.#t.length>=3?(this._next(ClipperLib.Clipper.SimplifyPolygon(this.#t.map(e=>new ClipperLib.IntPoint(e[0],e[1])),ClipperLib.PolyFillType.pftNonZero).map(e=>({polygon:e}))),this.#t=[]):this.#t.push([Math.round(e),Math.round(t)]),this.#e=Date.now(),this.#n(e,t)}_onMouseMove(e,t){if(this.#t.length>0){this.#n(e,t);return}}_onMouseDownRight(e,t){this.#t.length>0&&(this.#t.pop(),this.#n(e,t))}#n(e,t){if(this._previewGraphics.clear(),this.#t.length!==0){if(this.#t.length>1){let n=ClipperLib.Clipper.SimplifyPolygon([...this.#t.map(e=>new ClipperLib.IntPoint(e[0],e[1])),new ClipperLib.IntPoint(Math.round(e),Math.round(t))],ClipperLib.PolyFillType.pftNonZero);for(let e of n){this._setPreviewFillStyle(),this._previewGraphics.moveTo(e[0].X,e[0].Y);for(let t=1;t<e.length;t++)this._previewGraphics.lineTo(e[t].X,e[t].Y);this._previewGraphics.endFill()}}this._setPreviewLineStyle(),this._previewGraphics.moveTo(...this.#t[0]);for(let e=1;e<this.#t.length;e++)this._previewGraphics.lineTo(...this.#t[e]);ar(this._previewGraphics,[{type:`m`,x:this.#t.at(-1)[0],y:this.#t.at(-1)[1]},{type:`l`,x:e,y:t},this.#t.length>1&&{type:`l`,x:this.#t[0][0],y:this.#t[0][1]}].filter(Boolean))}}},ao=class e extends ro{static minEllipseRadius=5;#e=null;#t=null;#n=!1;#r=!1;_onMouseDownLeft(e,t){this.#e=[e,t],this.#t=[e,t]}_onMouseUpLeft(){if(!this.#e)return;let{cx:t,cy:n,rx:r,ry:i}=this.#a(),a=PIXI.Circle.approximateVertexDensity((r+i)/2);r>=e.minEllipseRadius&&i>=e.minEllipseRadius&&this._next([{polygon:Array.from({length:a},(e,o)=>{let s=Math.PI*2*(o/a);return[Math.cos(s)*r+t,Math.sin(s)*i+n]})}]),this.#e=null,this.#t=null,this.#i()}_onMouseMove(e,t){this.#e&&(this.#t=[e,t],this.#i())}_onMouseDownRight(){this.#e=null,this.#t=null,this.#i()}_onKeyDown(e){this.#n=e.ctrlKey,this.#r=e.altKey,this.#i()}_onKeyUp(e){this.#n=e.ctrlKey,this.#r=e.altKey,this.#i()}#i(){if(this._previewGraphics.clear(),!this.#e)return;let{cx:t,cy:n,rx:r,ry:i}=this.#a();r>=e.minEllipseRadius&&i>=e.minEllipseRadius&&(this._setPreviewFillStyle(),this._setPreviewLineStyle(),this._previewGraphics.drawEllipse(t,n,r,i))}#a(){let e,t,n,r;if(this.#n)[e,t]=this.#e,n=Math.abs(this.#t[0]-this.#e[0]),r=Math.abs(this.#t[1]-this.#e[1]),this.#r&&(n=r=Math.max(n,r));else{let i=this.#t[0]-this.#e[0],a=this.#t[1]-this.#e[1];if(this.#r){let e=Math.max(Math.abs(i),Math.abs(a));i=e*Math.sign(i),a=e*Math.sign(a)}e=this.#e[0]+i/2,t=this.#e[1]+a/2,n=Math.abs(i/2),r=Math.abs(a/2)}return{cx:e,cy:t,rx:n,ry:r}}},oo=class extends ro{#e=new Set;#t=!1;get#n(){return[...this.#e].map(e=>e.split(`|`).map(Number))}_onMouseDownLeft(e,t){this.#t=!0,this.#r(e,t)}_onMouseMove(e,t){this.#t&&this.#r(e,t)}_onMouseUpLeft(){if(!this.#t)return;this.#t=!1;let e=this.#n;this._previewGraphics.clear(),this.#e.clear(),this._next(tn(e,canvas.grid))}#r(e,t){if(!this.#t)return;let{i:n,j:r}=canvas.grid.getOffset({x:e,y:t}),i=`${n}|${r}`;if(this.#e.has(i))return;this.#e.add(i);let a=(0,S.union)(...this.#n.map(([e,t])=>[Kt(e,t).map(({x:e,y:t})=>[e,t])]));this._previewGraphics.clear(),this._setPreviewLineStyle();for(let e of a)for(let t of e){let e=!Ft.isClockwise(t);e?this._previewGraphics.beginHole():this._setPreviewFillStyle(),this._previewGraphics.moveTo(...t.at(-1));for(let e=0;e<t.length;e++)this._previewGraphics.lineTo(...t[e]);e?this._previewGraphics.endHole():this._previewGraphics.endFill()}}},so=class e extends ro{static minRectangleSize=10;#e=null;#t=null;#n=!1;_onMouseDownLeft(e,t){this.#e=[e,t],this.#t=[e,t]}_onMouseUpLeft(){if(!this.#e)return;let{x1:t,y1:n,x2:r,y2:i,aw:a,ah:o}=this.#i();(a>=e.minRectangleSize||o>=e.minRectangleSize)&&a>0&&o>0&&this._next([{polygon:[[t,n],[r,n],[r,i],[t,i]]}]),this.#e=null,this.#t=null,this.#r()}_onMouseMove(e,t){this.#e&&(this.#t=[e,t],this.#r())}_onMouseDownRight(){this.#e=null,this.#t=null,this.#r()}_onKeyDown(e){this.#n=e.altKey,this.#r()}_onKeyUp(e){this.#n=e.altKey,this.#r()}#r(){if(this._previewGraphics.clear(),!this.#e)return;let{x1:t,y1:n,w:r,h:i,aw:a,ah:o}=this.#i();(a>=e.minRectangleSize||o>=e.minRectangleSize)&&(this._setPreviewFillStyle(),this._setPreviewLineStyle(),this._previewGraphics.drawRect(t,n,r,i))}#i(){let[e,t]=this.#e,[n,r]=this.#t,i=n-e,a=r-t;if(this.#n){let o=Math.max(Math.abs(i),Math.abs(a));i=o*Math.sign(i),a=o*Math.sign(a),n=e+i,r=t+a}return{x1:e,y1:t,x2:n,y2:r,w:i,h:a,aw:Math.abs(i),ah:Math.abs(a)}}},co=class extends ro{#e;constructor(e={}){super(),this.#e=e}_onMouseDownLeft(e,t){W.getSingleShapeAtPoint(e,t,this.#e).then(e=>{e&&this._next(e)})}},lo=class extends no{static APPLICATION_TYPE=to;#e={line:e=>e.lineStyle(4,0,.6),fill:e=>e.beginFill(0,.2)};modes={[d.gridCells]:new oo(this.#e).then(this.#t),[d.rectangle]:new so(this.#e).then(this.#t),[d.ellipse]:new ao(this.#e).then(this.#t),[d.customPoly]:new io(this.#e).then(this.#t),[d.deleteShape]:new co({hint:`TERRAINHEIGHTTOOLS.SelectAShapeEraseHint`,submitLabel:`TERRAINHEIGHTTOOLS.EraseSelectedShape`,submitIcon:`fas fa-eraser`}).then(this.#n)};constructor(){super(),X.value in this.modes||(X.value=[...Object.keys(this.modes)][0]),canvas.grid?.type===CONST.GRID_TYPES.GRIDLESS&&X.value===`gridCells`&&(X.value=`rectangle`),cr(X,e=>this._selectDrawingMode(e),this._cleanupSignal)}#t(e){let{excludedTerrainTypeIds:t,bottom:n,top:r}=Q.value;W.eraseRegions(e,{excludingTerrainTypeIds:t,bottom:n,top:r})}#n(e){W.eraseShapes(e)}};
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let uo=(e,t,n)=>{for(let n of t)if(n[0]===e)return(0,n[1])();return n?.()},{ApplicationV2:fo}=foundry.applications.api,$=e=>game.i18n.localize(e);var po=class extends ta(Ln(fo)){static DEFAULT_OPTIONS={id:`tht_terrainPaintToolbar`,classes:[`tht-toolbar`,`flexrow`],window:{frame:!1,positioned:!1}};#e=Lr();_renderHTML(){let e=z(()=>Z.terrainTypeId.value?xt.value.get(Z.terrainTypeId.value):void 0);return q`
			<div class="flex0">
				<span class="tht-toolbar-item-label">${$(`TERRAINHEIGHTTOOLS.Tool`)}</span>
				<segment-fwl
					class="flex0"
					.items=${this.#n()}
					.value=${X}
					@change=${e=>X.value=e.target.value}
				></segment-fwl>
			</div>

			<div>
				<span class="tht-toolbar-item-label">${$(`TERRAINHEIGHTTOOLS.TerrainType`)}</span>
				<template-dropdown-fwl
					.buttonTemplate=${z(()=>uo(!0,[[!V.value.length,()=>q`<span>${$(`TERRAINHEIGHTTOOLS.NoTerrainTypesWarn`)}</span>`],[!e.value,()=>q`<span>${$(`TERRAINHEIGHTTOOLS.SelectATerrainType`)}</span>`],[!!e.value,()=>q`
							<div
								class="tht-terrain-preview-box"
								style=${In(e.value,{textColorCssPropertyName:``,lineWidthCssPropertyName:``})}
							></div>
							<span>${e.value?.name}</span>
						`]]))}
					.dropdownTemplate=${z(()=>this.#t())}
					dropdownClasses="p-0"
					@open=${this.#o}
					${Br(this.#e)}
				></template-dropdown-fwl>
			</div>

			<!-- Height+elevation or top+bottom (depending on users preferences) -->
			${z(()=>Ri.value?q`
				<div class="tht-toolbar-num-input" data-tooltip=${$(`TERRAINHEIGHTTOOLS.Height.Hint`)}>
					<label class="tht-toolbar-item-label" for="thtPaintToolbar_selectedHeight">
						${$(`TERRAINHEIGHTTOOLS.Height.Name`)}
					</label>
					<input
						type="number"
						class="text-align-center"
						id="thtPaintToolbar_selectedHeight"
						min="0"
						.value=${z(()=>U(Z.height.value))}
						?disabled=${z(()=>!e.value?.usesHeight)}
						@change=${e=>Z.height.value=Jt(this.#i(e,.1))}
						@blur=${e=>e.target.value=U(Z.height.value)}
					>
				</div>

				<div class="tht-toolbar-num-input" data-tooltip=${$(`TERRAINHEIGHTTOOLS.Elevation.Hint`)}>
					<label class="tht-toolbar-item-label" for="thtPaintToolbar_selectedElevation">
						${$(`TERRAINHEIGHTTOOLS.Elevation.Name`)}
					</label>
					<input
						type="number"
						class="text-align-center"
						id="thtPaintToolbar_selectedElevation"
						min="0"
						.value=${z(()=>U(Z.elevation.value))}
						?disabled=${z(()=>!e.value?.usesHeight)}
						@change=${e=>Z.elevation.value=Jt(this.#i(e))}
						@blur=${e=>e.target.value=U(Z.elevation.value)}
					>
				</div>
			`:q`
				<div class="tht-toolbar-num-input">
					<label class="tht-toolbar-item-label" for="thtPaintToolbar_selectedBottom">
						${$(`TERRAINHEIGHTTOOLS.Bottom`)}
					</label>
					<input
						type="number"
						class="text-align-center"
						id="thtPaintToolbar_selectedBottom"
						min="0"
						.max=${z(()=>U(Da.value))}
						.value=${z(()=>U(Z.elevation.value))}
						?disabled=${z(()=>!e.value?.usesHeight)}
						@change=${e=>ka(Jt(this.#i(e)))}
						@blur=${e=>e.target.value=U(Z.elevation.value)}
					>
				</div>

				<div class="tht-toolbar-num-input">
					<label class="tht-toolbar-item-label" for="thtPaintToolbar_selectedTop">
						${$(`TERRAINHEIGHTTOOLS.Top`)}
					</label>
					<input
						type="number"
						class="text-align-center"
						id="thtPaintToolbar_selectedTop"
						.min=${z(()=>U(Z.elevation.value))}
						.value=${z(()=>U(Da.value))}
						?disabled=${z(()=>!e.value?.usesHeight)}
						@change=${e=>Oa(Jt(this.#i(e)))}
						@blur=${e=>e.target.value=U(Da.value)}
					>
				</div>
			`)}

			<button type="button" class="flex0" @click=${this.#a} style="border: 0">
				<i class="fas fa-cog"></i>
			</button>
		`}#t=()=>q`
		<ul class="tht-terrain-type-palette">
			${V.value.map(e=>q`
				<li
					class=${z(()=>J({active:Z.terrainTypeId.value===e.id}))}
					@click=${()=>this.#r(e)}
				>
					<div
						class="tht-terrain-preview-box"
						style=${In(e,{textColorCssPropertyName:``,lineWidthCssPropertyName:``})}
						inert
					></div>
					<label class="terrain-type-name" inert>${e.name}</label>
				</li>
			`)}
		</ul>
	`;#n(){return[canvas.grid?.type&&canvas.grid.type!==CONST.GRID_TYPES.GRIDLESS&&{value:d.gridCells,icon:`fas fa-grid-3`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeGridCells`,src:`modules/terrain-height-tools/toolclips/drawingmode-cells.mp4`,items:[{heading:`CONTROLS.CommonDraw`,content:`CONTROLS.ClickOrClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.rectangle,icon:`far fa-rectangle`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeRectangle`,src:`modules/${r}/toolclips/drawingmode-rect.mp4`,items:[{heading:`CONTROLS.CommonDraw`,reference:`CONTROLS.ClickDrag`},{heading:`CONTROLS.CommonDrawProportional`,reference:`CONTROLS.AltClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.ellipse,icon:`far fa-circle`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeEllipse`,src:`modules/${r}/toolclips/drawingmode-ellipse.mp4`,items:[{heading:`CONTROLS.CommonDraw`,reference:`CONTROLS.ClickDrag`},{heading:`CONTROLS.CommonDrawProportional`,reference:`CONTROLS.AltClickDrag`},{heading:`CONTROLS.TerrainHeightToolsDrawingModeEllipseDrawFromCenter`,reference:`CONTROLS.CtrlClickDrag`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.customPoly,icon:`far fa-draw-polygon`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygon`,src:`modules/${r}/toolclips/drawingmode-custom.mp4`,items:[{heading:`CONTROLS.CommonDraw`,content:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygonDraw`},{heading:`CONTROLS.TerrainHeightToolsDrawingModeCustomPolygonRemoveLastPoint`,reference:`CONTROLS.RightClick`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeP`}]}},{value:d.fill,icon:`fas fa-fill-drip`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModeFill`,src:`modules/${r}/toolclips/drawingmode-fill.mp4`,items:[{heading:`CONTROLS.TerrainHeightToolsDrawingModeFill`,content:`CONTROLS.TerrainHeightToolsDrawingModeFillClick`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModeFillP`}]}},{value:d.pipette,icon:`fas fa-eye-dropper`,toolclip:{heading:`CONTROLS.TerrainHeightToolsDrawingModePipette`,items:[{heading:`CONTROLS.Copy`,content:`CONTROLS.TerrainHeightToolsDrawingModePipetteClick`},{paragraph:`CONTROLS.TerrainHeightToolsDrawingModePipetteP`}]}}].filter(Boolean)}#r(e){Z.value={terrainTypeId:e.id,height:e.defaultHeight??Z.height.value,elevation:e.defaultElevation??Z.elevation.value},this.#e.value?.close()}#i(e,t=0){let n=+e.currentTarget.value;return Math.max(isNaN(n)?0:n,t)}#a(e){Xr.open(e,[{type:`header`,label:$(`TERRAINHEIGHTTOOLS.PaintMode.Label`)},...Object.keys(v).map(e=>{let t=e[0].toUpperCase()+e.substring(1);return{label:$(`TERRAINHEIGHTTOOLS.PaintMode.${t}.Name`),hint:$(`TERRAINHEIGHTTOOLS.PaintMode.${t}.Hint`),icon:`fas fa-check${Z.mode.value===e?``:` opacity-0`} tht-terrain-paint-mode-context-icon`,onClick:()=>Z.mode.value=e}}),{type:`separator`},{label:Ri.value?$(`TERRAINHEIGHTTOOLS.UseBottomTop`):$(`TERRAINHEIGHTTOOLS.UseHeightElevation`),icon:`fas fa-arrow-up-arrow-down`,onClick:()=>game.settings.set(r,f.paintToolbarUseHeightElevation,!Ri.value)},{label:$(`SETTINGS.TerrainTypes.Button`),icon:`fas fa-cog`,onClick:()=>new si().render(!0)}])}#o(e){if(!V.value.length){e.preventDefault(),new si().render(!0);return}}},mo=class extends ro{constructor(){super()}_onMouseDownLeft(e,t){this._next({x:e,y:t})}},ho=class extends no{static APPLICATION_TYPE=po;#e={line:e=>{let t=Z.terrainTypeId.value,n=Dt(t);e.lineStyle(n.lineWidth,Color.from(n.lineColor??`#000000`),n.lineOpacity)},fill:e=>{let t=Z.terrainTypeId.value,n=Dt(t);n.fillType!==CONST.DRAWING_FILL_TYPES.NONE&&e.beginFill(Color.from(n.fillColor??`#000000`),n.fillOpacity)}};modes={[d.gridCells]:new oo(this.#e).then(this.#t),[d.rectangle]:new so(this.#e).then(this.#t),[d.ellipse]:new ao(this.#e).then(this.#t),[d.customPoly]:new io(this.#e).then(this.#t),[d.fill]:new mo().then(this.#n),[d.pipette]:new co({hint:`TERRAINHEIGHTTOOLS.SelectAShapeCopyHint`,submitLabel:`TERRAINHEIGHTTOOLS.CopySelectedShapeConfiguration`,submitIcon:`fas fa-eye-dropper`}).then(this.#r.bind(this))};constructor(){super(),X.value in this.modes||(X.value=[...Object.keys(this.modes)][0]),canvas.grid?.type===CONST.GRID_TYPES.GRIDLESS&&X.value===`gridCells`&&(X.value=`rectangle`),cr(X,e=>this._selectDrawingMode(e),this._cleanupSignal)}_canInteract=z(()=>{if(this._currentModeName.value===d.pipette)return!0;let e=Z.terrainTypeId.value;return!!e&&xt.value.has(e)});#t(e){let{terrainTypeId:t,height:n,elevation:r,mode:i}=Z.value,a=Dt(t)?.usesHeight??!1;W.paintRegions(e,t,a?n:0,a?r:0,{mode:i})}#n({x:e,y:t}){let{terrainTypeId:n,height:r,elevation:i,mode:a}=Z.value,o=Dt(n)?.usesHeight??!1;W.fillRegion([e,t],n,o?r:0,o?i:0,{fillMode:`applicableBoundary`,paintMode:a})}#r(e){Z.value={terrainTypeId:e.terrainTypeId,height:Math.max(e.height,1),elevation:Math.max(e.elevation,0)},X.value=this._previousModeName.value}};let{ApplicationV2:go}=foundry.applications.api;var _o=class extends Ma(Ln(go)){static DEFAULT_OPTIONS={id:`tht_terrainVisibilityToggle`,window:{title:`TERRAINHEIGHTTOOLS.TerrainVisibilityConfig`,icon:`fas fa-eye-slash`,contentClasses:[`terrain-height-tool-window`],resizable:!0},position:{width:220,height:362}};async _renderFrame(e){let t=await super._renderFrame(e);return this.window.close.remove(),t}_renderHTML(){return q`
			<p class="flex0" style="margin-top: 0; font-size: 0.95em;">
				${game.i18n.localize(`TERRAINHEIGHTTOOLS.ClickToShowHideTerrain`)}
			</p>
			<ul class="tht-terrain-type-palette p-0">
				${V.value.map(e=>{let t=()=>!Ki.value.has(e.id);return q`
						<li
							class=${z(()=>J({"align-items-center":!0,"opacity-04":!t()}))}
							@click=${()=>kt(canvas.scene,e.id)}
						>
							<i
								class=${z(()=>J({far:!0,"fa-eye":t(),"fa-eye-slash":!t(),"mr-05rem":!0,"text-align-center":!0}))}
								style="flex: 0 0 1.25rem"
								inert
							></i>
							<div class="tht-terrain-preview-box" ${In(e,{textColorCssPropertyName:``})} inert></div>
							<label class="terrain-type-name" inert>${e.name}</label>
						</li>
					`})}
			</ul>
		`}_onFirstRender(...e){super._onFirstRender(...e),cr(V,()=>this.render(),this.closeSignal)}},vo=class extends qa{static APPLICATION_TYPE=_o};let{InteractionLayer:yo}=foundry.canvas.layers;var bo=class e extends yo{#e=0;static#t={[u.convert]:Ja,[u.erase]:lo,[u.paint]:ho,[u.terrainVisibility]:vo};#n=null;#r;constructor(){super()}static get layerOptions(){return foundry.utils.mergeObject(super.layerOptions,{baseClass:yo,zIndex:300})}async _draw(t){super._draw(t),this.#r=new AbortController;let n=this.#r.signal;lr(()=>{if(dr.value===`terrain-height-tools-editor`){let t=e.#t[fr.value];if(t&&this.#n instanceof t)return;this.#n?._cleanup(),this.#n=t?new t:null}else this.#n?._cleanup(),this.#n=null},n)}_activate(){this.#i(!0)}_deactivate(){this.#i(!1)}_tearDown(e){super.tearDown(e),this.#n?._cleanup(),this.#n=null}#i(e){let t=e?`on`:`off`;this[t](`pointermove`,this.#a),this[t](`pointerdown`,this.#o),this[t](`pointerup`,this.#o);let n=e?`addEventListener`:`removeEventListener`;document[n](`keydown`,this.#c),document[n](`keyup`,this.#l)}#a=e=>{let{x:t,y:n}=this.toLocal(e.data.global);this.#e>0&&this.#o(e),this.#s(t,n)};#o(e){let{x:t,y:n}=this.toLocal(e.data.global),r=(e.buttons&1)==1,i=(this.#e&1)==1;this.#n&&(r&&!i?this.#n._onMouseDownLeft(t,n):!r&&i&&this.#n._onMouseUpLeft(t,n));let a=(e.buttons&2)==2,o=(this.#e&2)==2;this.#n&&(a&&!o?this.#n._onMouseDownRight(t,n):!a&&o&&this.#n._onMouseUpRight(t,n)),this.#e=e.buttons}#s=foundry.utils.throttle((e,t)=>{this.#n?._onMouseMove(e,t)},1e3/60);#c=e=>{this.#n?._onKeyDown(e)};#l=e=>{this.#n?._onKeyUp(e)};async _onUndoKey(){if(W.canUndo)return await W.undo()}};let{loadTexture:xo}=foundry.canvas,{CanvasLayer:So}=foundry.canvas.layers;var Co=class extends So{#e=new Map;_cursorRadiusMask$=R(null);#t=z(()=>dr.value===l);#n=R(!1);_terrainTextures=new Map;#r;#i;#a=z(()=>qi.value??Li.value?510:490);constructor(){super(),this.eventMode=`static`,Hooks.on(`highlightObjects`,this._onHighlightObjects.bind(this))}static get current(){return canvas.terrainHeightGraphicsLayer}get#o(){return[...this.#e].flatMap(([,e])=>[...e]).flatMap(([,e])=>e)}_draw(){this.#i=new AbortController;let e=this.#i.signal;cr(Ct,e=>{this._reloadTextures(e),this._redrawShapes(Gn.value)},e),Gn.subscribe({add:this._addShapes.bind(this),remove:this._removeShapes.bind(this)},{signal:e}),lr(()=>this._updateShapesVisibility({animate:!0}),e),lr(()=>this._updateMaskSprite(),e),lr(()=>this._updateShapeMasks(),e),cr(this.#a,e=>{for(let t of this.#o)t.sortLayer=e;canvas.primary.sortChildren()},e),cr(Fi,e=>{for(let t of this.#o)t.sort=t.terrainType.usesHeight?t.shape.top:e?2**53-1:-1;canvas.primary.sortChildren()},e),cr(Ii,()=>{for(let e of this.#o)e._redrawLabel()},e),this.on(`globalpointermove`,this._onGlobalPointerMove)}_tearDown(){this.#i.abort(),this._clearShapes(),this.off(`globalpointermove`,this._onGlobalPointerMove)}_onGlobalPointerMove=foundry.utils.throttle(e=>{let t=this.toLocal(e.data.global);Gi.value=t,this.#r?.position.set(t.x,t.y)},1e3/60);_redrawShapes(e){if(e.length===0){this._clearShapes();return}this._clearShapes(),this._addShapes(e)}async _addShapes(e){let t=[];for(let n of e){let e=wt.value.get(n.terrainTypeId);if(!e)continue;let r=this.#e.get(n._providerId);r||(r=new Map,this.#e.set(n._providerId,r));let i=new Ua(this,n);i.sortLayer=this.#a.value,i.sort=!!e.usesHeight*(Fi.value?-1:0),r.set(n,i),canvas.primary.addChild(i),t.push(i)}this._updateShapeMasks({shapes:t}),this._updateShapesVisibility({shapes:t,animate:!1})}async _removeShapes(e){for(let t of e){let e=this.#e.get(t._providerId),n=e?.get(t);n&&(e.delete(t),n._destroy(),canvas.primary.removeChild(n))}}_clearShapes(){for(let e of this.#o)e._destroy(),canvas.primary.removeChild(e);this.#e.clear()}_reloadTextures(e){this._terrainTextures=new Map(e.filter(e=>e.fillTexture?.length).map(e=>[e.id,xo(e.fillTexture)]))}async _updateShapesVisibility({shapes:e,animate:t=!0}={}){let n=this.#t.value&&fr.value!==u.terrainVisibility,r=ki.value,i=Ki.value;await Promise.all((e??[...this.#o]).map(e=>e._setVisible(n?e.shape._providerId===s:(r||e.terrainType.isAlwaysVisible)&&!i.has(e.terrainType.id),t)))}_updateShapeMasks({shapes:e}={}){let t=this.#t.value,n=this.#n.value;for(let r of e??this.#o)r.mask=!r.terrainType.isAlwaysVisible&&!t&&!n?this.#r:null}_updateMaskSprite(){let e=Mi.value;if(zt(`Updating terrain height layer graphics mask size to ${e}`),this.#r){for(let e of this.#o)e.mask=null;canvas.primary.removeChild(this.#r)}if(e<=0){this.#r=null;return}e*=canvas.grid.size;let t=document.createElement(`canvas`);t.width=t.height=e*2;let n=t.getContext(`2d`),r=n.createRadialGradient(e,e,0,e,e,e);r.addColorStop(.8,`rgba(255, 255, 255, 1)`),r.addColorStop(1,`rgba(255, 255, 255, 0)`),n.fillStyle=r,n.fillRect(0,0,e*2,e*2);let i=PIXI.Texture.from(t),a=Gi.peek();this.#r=new PIXI.Sprite(i),this.#r.anchor.set(.5),this.#r.position.set(a.x,a.y),canvas.primary.addChild(this.#r),Object.defineProperty(this.#r,`renderable`,{get:()=>!1,set:()=>{}}),at(()=>this._updateShapeMasks())}_onHighlightObjects(e){this.#n.value=canvas.activeLayer.name===`TokenLayer`&&e}};Hooks.once(`init`,wo),Hooks.once(`ready`,To),Object.defineProperty(globalThis,`terrainHeightTools`,{value:{...di},writable:!1});function wo(){Rt(`Initialising`),Vi(),Tt(),oa(),Hooks.on(`getSceneControlButtons`,Ea),Hooks.on(`activateSceneControls`,pr),Hooks.on(`renderSceneConfig`,Hi),Hooks.on(`renderTokenConfig`,Ui),Hooks.on(`updateScene`,Ji),Hooks.on(`canvasReady`,Yi),Hooks.on(`canvasTearDown`,Xi),Hooks.on(`preCreateToken`,ba),tr(),Jn(s,W),CONFIG.Canvas.layers.terrainHeightEditorLayer={group:`interface`,layerClass:bo},CONFIG.Canvas.layers.terrainHeightGraphicsLayer={group:`interface`,layerClass:Co},CONFIG.Canvas.layers.terrainHeightLosRulerLayer={group:`interface`,layerClass:wr},game.modules.get(`lib-wrapper`)?.active&&Eo()}function To(){new ea().render(!0),game.socket.on(i,Do),game.user.isGM&&game.modules.get(`lib-wrapper`)?.active!==!0&&ui.notifications.error(game.i18n.localize(`TERRAINHEIGHTTOOLS.MissingLibWrapperWarning`),{permanent:!0})}function Eo(){libWrapper.register(r,`CONFIG.Token.objectClass.prototype._getDragWaypointPosition`,ga,libWrapper.WRAPPER),libWrapper.register(r,`CONFIG.Token.objectClass.prototype._getShiftedPosition`,_a,libWrapper.WRAPPER),libWrapper.register(r,`CONFIG.Token.documentClass.prototype.getCompleteMovementPath`,ya,libWrapper.WRAPPER),libWrapper.register(r,`CONFIG.Token.layerClass.prototype._prepareKeyboardMovementUpdates`,va,libWrapper.WRAPPER),libWrapper.register(r,`foundry.canvas.placeables.Token.prototype._onClickLeft`,function(e,...t){if(ia.current?._isSelectingToken$.value){ia.current._onSelectToken(this);return}e(...t)},libWrapper.MIXED),libWrapper.register(r,`foundry.canvas.interaction.MouseInteractionManager.prototype.can`,function(e,t,n){return t===`clickLeft`&&ia.current?._isSelectingToken$.value?!0:e(t,n)},libWrapper.MIXED),libWrapper.register(r,`foundry.canvas.layers.TokenLayer.prototype._canDragLeftStart`,function(e,t,n){return dr.value===`tokens`&&[u.tokenLineOfSight,u.lineOfSight].includes(fr.value)?!1:e(t,n)},libWrapper.MIXED)}function Do({func:e,args:t}){switch(e){case _.drawLineOfSightRay:wr.current?._drawLineOfSightRays(...t);break;case _.clearLineOfSightRay:wr.current?._clearLineOfSightRays(...t);break}}})();
//# sourceMappingURL=module.js.map