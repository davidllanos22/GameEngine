Scene = function(game,name){
	Entity.call(this,0,0);
	this.name = name;
	this.game = game;
}

Scene.prototype = Object.create(Entity.prototype);
Scene.prototype.constructor = Scene;