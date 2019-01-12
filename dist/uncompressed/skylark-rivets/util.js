define([
  "skylark-utils-dom/query",
  "./rivets"
],function($,Rivets) {
    Rivets.Util = {
      bindEvent: function(el, event, handler) {
        return $(el).on(event, handler);
      },
      unbindEvent: function(el, event, handler) {
        return $(el).off(event, handler);
      },
      getInputValue: function(el) {
        var $el;
        $el = $(el);
        if ($el.attr('type') === 'checkbox') {
          return $el.is(':checked');
        } else {
          return $el.val();
        }
      }
    };

    return Rivets.Util;
});
