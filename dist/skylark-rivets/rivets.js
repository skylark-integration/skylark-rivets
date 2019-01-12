/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["skylark-langx/skylark","./sightglass"],function(e,n){var t={options:["prefix","templateDelimiters","rootInterface","preloadData","handler","executeFunctions"],extensions:[],extensions:["binders","formatters","components","adapters"],public:{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,executeFunctions:!1,iterationAlias:function(e){return"%"+e+"%"},handler:function(e,n,t){return this.call(e,n,t.view.models)},configure:function(e){var n,i,r,l;for(r in null==e&&(e={}),e)if(l=e[r],"binders"===r||"components"===r||"formatters"===r||"adapters"===r)for(i in l)n=l[i],t[r][i]=n;else t.public[r]=l},bind:function(e,n,i){var r;return null==n&&(n={}),null==i&&(i={}),(r=new t.View(e,n,i)).bind(),r},init:function(e,n,i){var r,l,a;if(null==i&&(i={}),null==n&&(n=document.createElement("div")),(l=(e=t.public.components[e]).template.call(this,n))instanceof HTMLElement){for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(l)}else n.innerHTML=l;return r=e.initialize.call(this,n,i),(a=new t.View(n,r)).bind(),a}}};return e.rivets=t});
//# sourceMappingURL=sourcemaps/rivets.js.map
