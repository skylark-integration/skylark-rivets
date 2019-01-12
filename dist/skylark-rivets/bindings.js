/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["./rivets","./sightglass","./util","./parsers","./views"],function(t){var e=function(t,e){for(var s in e)i.call(e,s)&&(t[s]=e[s]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty,s=[].slice,n=[].indexOf,r=function(t,e){return function(){return t.apply(e,arguments)}};return t.Binding=function(){function e(t,e,i,s,n){this.view=t,this.el=e,this.type=i,this.keypath=s,this.options=null!=n?n:{},this.getValue=r(this.getValue,this),this.update=r(this.update,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.set=r(this.set,this),this.eventHandler=r(this.eventHandler,this),this.formattedValue=r(this.formattedValue,this),this.parseFormatterArguments=r(this.parseFormatterArguments,this),this.parseTarget=r(this.parseTarget,this),this.observe=r(this.observe,this),this.setBinder=r(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i;if(!(this.binder=this.view.binders[this.type]))for(t in i=this.view.binders)e=i[t],"*"!==t&&-1!==t.indexOf("*")&&new RegExp("^"+t.replace(/\*/g,".+")+"$").test(this.type)&&(this.binder=e,this.args=new RegExp("^"+t.replace(/\*/g,"(.+)")+"$").exec(this.type),this.args.shift());if(this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function)return this.binder={routine:this.binder}},e.prototype.observe=function(e,i,s){return t.sightglass(e,i,s,{root:this.view.rootInterface,adapters:this.view.adapters})},e.prototype.parseTarget=function(){var e;return(e=t.TypeParser.parse(this.keypath)).type===t.TypeParser.types.primitive?this.value=e.value:(this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target)},e.prototype.parseFormatterArguments=function(e,i){var s,n,r,o,h,l,a;for(e=function(){var i,s,r;for(r=[],i=0,s=e.length;i<s;i++)n=e[i],r.push(t.TypeParser.parse(n));return r}(),o=[],s=l=0,a=e.length;l<a;s=++l)n=e[s],o.push(n.type===t.TypeParser.types.primitive?n.value:((h=this.formatterObservers)[i]||(h[i]={}),(r=this.formatterObservers[i][s])||(r=this.observe(this.view.models,n.value,this.sync),this.formatterObservers[i][s]=r),r.value()));return o},e.prototype.formattedValue=function(t){var e,i,n,r,o,h,l,a,u;for(i=h=0,l=(a=this.formatters).length;h<l;i=++h)r=(e=(n=a[i]).match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g)).shift(),n=this.view.formatters[r],o=this.parseFormatterArguments(e,i),(null!=n?n.read:void 0)instanceof Function?t=(u=n.read).call.apply(u,[this.model,t].concat(s.call(o))):n instanceof Function&&(t=n.call.apply(n,[this.model,t].concat(s.call(o))));return t},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.handler,function(s){return i.call(t,this,s,e)}},e.prototype.set=function(e){var i;return e=e instanceof Function&&!this.binder.function&&t.public.executeFunctions?this.formattedValue(e.call(this.model)):this.formattedValue(e),null!=(i=this.binder.routine)?i.call(this,this.el,e):void 0},e.prototype.sync=function(){var t,e;return this.set(function(){var i,s,n,r,o,h,l;if(this.observer){if(this.model!==this.observer.target){for(i=0,n=(o=this.dependencies).length;i<n;i++)(e=o[i]).unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(h=this.options.dependencies)?h.length:void 0))for(s=0,r=(l=this.options.dependencies).length;s<r;s++)t=l[s],e=this.observe(this.model,t,this.sync),this.dependencies.push(e)}return this.observer.value()}return this.value}.call(this))},e.prototype.publish=function(){var t,e,i,n,r,o,h,l,a,u,p,c;if(this.observer){for(h=this.getValue(this.el),r=this.formatters.length-1,i=l=0,a=(u=this.formatters.slice(0).reverse()).length;l<a;i=++l)e=r-i,n=(t=u[i].split(/\s+/)).shift(),o=this.parseFormatterArguments(t,e),(null!=(p=this.view.formatters[n])?p.publish:void 0)&&(h=(c=this.view.formatters[n]).publish.apply(c,[h].concat(s.call(o))));return this.observer.setValue(h)}},e.prototype.bind=function(){var t,e,i,s,n,r,o;if(this.parseTarget(),null!=(n=this.binder.bind)&&n.call(this,this.el),null!=this.model&&(null!=(r=this.options.dependencies)?r.length:void 0))for(i=0,s=(o=this.options.dependencies).length;i<s;i++)t=o[i],e=this.observe(this.model,t,this.sync),this.dependencies.push(e);if(this.view.preloadData)return this.sync()},e.prototype.unbind=function(){var t,e,i,s,n,r,o,h,l;for(null!=(r=this.binder.unbind)&&r.call(this,this.el),null!=(o=this.observer)&&o.unobserve(),s=0,n=(h=this.dependencies).length;s<n;s++)h[s].unobserve();for(i in this.dependencies=[],l=this.formatterObservers)for(t in e=l[i])e[t].unobserve();return this.formatterObservers={}},e.prototype.update=function(t){var e,i;return null==t&&(t={}),this.model=null!=(e=this.observer)?e.target:void 0,null!=(i=this.binder.update)?i.call(this,t):void 0},e.prototype.getValue=function(e){return this.binder&&null!=this.binder.getValue?this.binder.getValue.call(this,e):t.Util.getInputValue(e)},e}(),t.ComponentBinding=function(i){function s(e,i,s){var o,h,l,a,u,p,c,d;for(this.view=e,this.el=i,this.type=s,this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.locals=r(this.locals,this),this.component=this.view.components[this.type],this.static={},this.observers={},this.upstreamObservers={},h=e.bindingRegExp(),u=0,p=(c=this.el.attributes||[]).length;u<p;u++)o=c[u],h.test(o.name)||(l=this.camelCase(o.name),a=t.TypeParser.parse(o.value),n.call(null!=(d=this.component.static)?d:[],l)>=0?this.static[l]=o.value:a.type===t.TypeParser.types.primitive?this.static[l]=a.value:this.observers[l]=o.value)}return e(s,i),s.prototype.sync=function(){},s.prototype.update=function(){},s.prototype.publish=function(){},s.prototype.locals=function(){var t,e,i,s,n,r;for(t in i={},n=this.static)s=n[t],i[t]=s;for(t in r=this.observers)e=r[t],i[t]=e.value();return i},s.prototype.camelCase=function(t){return t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},s.prototype.bind=function(){var e,i,s,n,r,o,h,l,a,u,p,c,d,v,f,b,m,y,g,w;if(!this.bound){for(i in v=this.observers)s=v[i],this.observers[i]=this.observe(this.view.models,s,function(t){return function(e){return function(){return t.componentView.models[e]=t.observers[e].value()}}}(this).call(this,i));this.bound=!0}if(null!=this.componentView)this.componentView.bind();else{for(this.el.innerHTML=this.component.template.call(this),h=this.component.initialize.call(this,this.el,this.locals()),this.el._bound=!0,o={},u=0,c=(f=t.extensions).length;u<c;u++){if(o[r=f[u]]={},this.component[r])for(e in b=this.component[r])l=b[e],o[r][e]=l;for(e in m=this.view[r])l=m[e],null==(a=o[r])[e]&&(a[e]=l)}for(p=0,d=(y=t.options).length;p<d;p++)o[r=y[p]]=null!=(g=this.component[r])?g:this.view[r];for(i in this.componentView=new t.View(Array.prototype.slice.call(this.el.childNodes),h,o),this.componentView.bind(),w=this.observers)n=w[i],this.upstreamObservers[i]=this.observe(this.componentView.models,i,function(t){return function(e,i){return function(){return i.setValue(t.componentView.models[e])}}}(this).call(this,i,n))}},s.prototype.unbind=function(){var t,e,i,s;for(t in e=this.upstreamObservers)e[t].unobserve();for(t in i=this.observers)i[t].unobserve();return null!=(s=this.componentView)?s.unbind.call(this):void 0},s}(t.Binding),t.TextBinding=function(t){function i(t,e,i,s,n){this.view=t,this.el=e,this.type=i,this.keypath=s,this.options=null!=n?n:{},this.sync=r(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return e(i,t),i.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},i.prototype.sync=function(){return i.__super__.sync.apply(this,arguments)},i}(t.Binding),{Binding:t.Binding,ComponentBinding:t.ComponentBinding,TextBinding:t.TextBinding}});
//# sourceMappingURL=sourcemaps/bindings.js.map