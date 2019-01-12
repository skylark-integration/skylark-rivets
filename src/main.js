define([
	"./sightglass",
	"./factory"
],function(sightglass,factory){
    return new factory(sightglass);
});