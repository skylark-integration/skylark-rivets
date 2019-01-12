/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["./rivets","./util","./views"],function(e){var i=[].indexOf;return e.public.binders.text=function(e,i){return null!=e.textContent?e.textContent=null!=i?i:"":e.innerText=null!=i?i:""},e.public.binders.html=function(e,i){return e.innerHTML=null!=i?i:""},e.public.binders.show=function(e,i){return e.style.display=i?"":"none"},e.public.binders.hide=function(e,i){return e.style.display=i?"none":""},e.public.binders.enabled=function(e,i){return e.disabled=!i},e.public.binders.disabled=function(e,i){return e.disabled=!!i},e.public.binders.checked={publishes:!0,priority:2e3,bind:function(i){return e.Util.bindEvent(i,"change",this.publish)},unbind:function(i){return e.Util.unbindEvent(i,"change",this.publish)},routine:function(e,i){var t;return"radio"===e.type?e.checked=(null!=(t=e.value)?t.toString():void 0)===(null!=i?i.toString():void 0):e.checked=!!i}},e.public.binders.unchecked={publishes:!0,priority:2e3,bind:function(i){return e.Util.bindEvent(i,"change",this.publish)},unbind:function(i){return e.Util.unbindEvent(i,"change",this.publish)},routine:function(e,i){var t;return"radio"===e.type?e.checked=(null!=(t=e.value)?t.toString():void 0)!==(null!=i?i.toString():void 0):e.checked=!i}},e.public.binders.value={publishes:!0,priority:3e3,bind:function(i){if("INPUT"!==i.tagName||"radio"!==i.type)return this.event="SELECT"===i.tagName?"change":"input",e.Util.bindEvent(i,this.event,this.publish)},unbind:function(i){if("INPUT"!==i.tagName||"radio"!==i.type)return e.Util.unbindEvent(i,this.event,this.publish)},routine:function(e,t){var n,r,u,s,l,d,o;if("INPUT"===e.tagName&&"radio"===e.type)return e.setAttribute("value",t);if(null!=window.jQuery){if(e=jQuery(e),(null!=t?t.toString():void 0)!==(null!=(s=e.val())?s.toString():void 0))return e.val(null!=t?t:"")}else if("select-multiple"===e.type){if(null!=t){for(o=[],r=0,u=e.length;r<u;r++)n=e[r],o.push(n.selected=(l=n.value,i.call(t,l)>=0));return o}}else if((null!=t?t.toString():void 0)!==(null!=(d=e.value)?d.toString():void 0))return e.value=null!=t?t:""}},e.public.binders.if={block:!0,priority:4e3,bind:function(e){var i,t;if(null==this.marker)return i=[this.view.prefix,this.type].join("-").replace("--","-"),t=e.getAttribute(i),this.marker=document.createComment(" rivets: "+this.type+" "+t+" "),this.bound=!1,e.removeAttribute(i),e.parentNode.insertBefore(this.marker,e),e.parentNode.removeChild(e)},unbind:function(){if(this.nested)return this.nested.unbind(),this.bound=!1},routine:function(i,t){var n,r,u,s;if(!!t==!this.bound){if(t){for(n in u={},s=this.view.models)r=s[n],u[n]=r;return(this.nested||(this.nested=new e.View(i,u,this.view.options()))).bind(),this.marker.parentNode.insertBefore(i,this.marker.nextSibling),this.bound=!0}return i.parentNode.removeChild(i),this.nested.unbind(),this.bound=!1}},update:function(e){var i;return null!=(i=this.nested)?i.update(e):void 0}},e.public.binders.unless={block:!0,priority:4e3,bind:function(i){return e.public.binders.if.bind.call(this,i)},unbind:function(){return e.public.binders.if.unbind.call(this)},routine:function(i,t){return e.public.binders.if.routine.call(this,i,!t)},update:function(i){return e.public.binders.if.update.call(this,i)}},e.public.binders["on-*"]={function:!0,priority:1e3,unbind:function(i){if(this.handler)return e.Util.unbindEvent(i,this.args[0],this.handler)},routine:function(i,t){return this.handler&&e.Util.unbindEvent(i,this.args[0],this.handler),e.Util.bindEvent(i,this.args[0],this.handler=this.eventHandler(t))}},e.public.binders["each-*"]={block:!0,priority:4e3,bind:function(e){var i,t,n,r;if(null==this.marker)i=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],e.removeAttribute(i),e.parentNode.insertBefore(this.marker,e),e.parentNode.removeChild(e);else for(t=0,n=(r=this.iterated).length;t<n;t++)r[t].bind()},unbind:function(e){var i,t,n;if(null!=this.iterated)for(i=0,t=(n=this.iterated).length;i<t;i++)n[i].unbind()},routine:function(i,t){var n,r,u,s,l,d,o,a,h,b,c,p,f,v,g,m,y,N,k;if(d=this.args[0],t=t||[],this.iterated.length>t.length)for(c=0,v=(y=Array(this.iterated.length-t.length)).length;c<v;c++)y[c],(b=this.iterated.pop()).unbind(),this.marker.parentNode.removeChild(b.els[0]);for(u=p=0,g=t.length;p<g;u=++p)if(l=t[u],(r={index:u})[e.public.iterationAlias(d)]=u,r[d]=l,null==this.iterated[u]){for(s in N=this.view.models)l=N[s],null==r[s]&&(r[s]=l);a=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,(o=this.view.options()).preloadData=!0,h=i.cloneNode(!0),(b=new e.View(h,r,o)).bind(),this.iterated.push(b),this.marker.parentNode.insertBefore(h,a.nextSibling)}else this.iterated[u].models[d]!==l&&this.iterated[u].update(r);if("OPTION"===i.nodeName)for(f=0,m=(k=this.view.bindings).length;f<m;f++)(n=k[f]).el===this.marker.parentNode&&"value"===n.type&&n.sync()},update:function(e){var i,t,n,r,u,s;for(t in i={},e)n=e[t],t!==this.args[0]&&(i[t]=n);for(r=0,u=(s=this.iterated).length;r<u;r++)s[r].update(i)}},e.public.binders["class-*"]=function(e,i){var t;if(!i==(-1!==(t=" "+e.className+" ").indexOf(" "+this.args[0]+" ")))return e.className=i?e.className+" "+this.args[0]:t.replace(" "+this.args[0]+" "," ").trim()},e.public.binders["*"]=function(e,i){return null!=i?e.setAttribute(this.type,i):e.removeAttribute(this.type)},e.public.binders});
//# sourceMappingURL=sourcemaps/binders.js.map
