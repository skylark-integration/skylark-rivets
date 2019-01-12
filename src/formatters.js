define(["./rivets"],function(Rivets){
  var  __slice = [].slice;

  Rivets["public"].formatters['call'] = function() {
    var args, value;
    value = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return value.call.apply(value, [this].concat(__slice.call(args)));
  };

  return Rivets["public"].formatters;

});
