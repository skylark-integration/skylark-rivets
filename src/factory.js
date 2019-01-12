define([
	"./rivets",
	"./adapter",
	"./binders",
	"./bindings",
	"./formatters",
	"./parsers",
	"./util",
	"./views"
],function(Rivets){
	Rivets.factory = function(sightglass) {
	    Rivets.sightglass = sightglass;
	    Rivets["public"]._ = Rivets;
	    return Rivets["public"];
	};

	return Rivets.factory;
});