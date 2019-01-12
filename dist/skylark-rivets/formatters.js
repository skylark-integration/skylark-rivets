/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["./rivets"],function(l){var t=[].slice;return l.public.formatters.call=function(){var l,c;return c=arguments[0],l=2<=arguments.length?t.call(arguments,1):[],c.call.apply(c,[this].concat(t.call(l)))},l.public.formatters});
//# sourceMappingURL=sourcemaps/formatters.js.map
