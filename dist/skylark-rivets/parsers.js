/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["./rivets"],function(e){return e.TypeParser=function(){function e(){}return e.types={primitive:0,keypath:1},e.parse=function(e){return/^'.*'$|^".*"$/.test(e)?{type:this.types.primitive,value:e.slice(1,-1)}:"true"===e?{type:this.types.primitive,value:!0}:"false"===e?{type:this.types.primitive,value:!1}:"null"===e?{type:this.types.primitive,value:null}:"undefined"===e?{type:this.types.primitive,value:void 0}:""===e?{type:this.types.primitive,value:void 0}:!1===isNaN(Number(e))?{type:this.types.primitive,value:Number(e)}:{type:this.types.keypath,value:e}},e}(),e.TextTemplateParser=function(){function e(){}return e.types={text:0,binding:1},e.parse=function(e,t){var i,p,s,r,n,u,l;for(u=[],r=e.length,i=0,p=0;p<r;){if((i=e.indexOf(t[0],p))<0){u.push({type:this.types.text,value:e.slice(p)});break}if(i>0&&p<i&&u.push({type:this.types.text,value:e.slice(p,i)}),p=i+t[0].length,(i=e.indexOf(t[1],p))<0){n=e.slice(p-t[1].length),(null!=(s=u[u.length-1])?s.type:void 0)===this.types.text?s.value+=n:u.push({type:this.types.text,value:n});break}l=e.slice(p,i).trim(),u.push({type:this.types.binding,value:l}),p=i+t[1].length}return u},e}(),{TypeParser:e.TypeParser,TextTemplateParser:e.TextTemplateParser}});
//# sourceMappingURL=sourcemaps/parsers.js.map
