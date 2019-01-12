/**
 * skylark-rivets - A version of rivets.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-rivets/
 * @license MIT
 */
define(["skylark-utils-dom/query","./rivets"],function(n,t){return t.Util={bindEvent:function(t,e,r){return n(t).on(e,r)},unbindEvent:function(t,e,r){return n(t).off(e,r)},getInputValue:function(t){var e;return"checkbox"===(e=n(t)).attr("type")?e.is(":checked"):e.val()}},t.Util});
//# sourceMappingURL=sourcemaps/util.js.map
