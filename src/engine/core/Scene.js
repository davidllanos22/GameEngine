Scene = function(game,name){
	Entity.call(this,0,0);
	this.name = name;
	this.game = game;
}

Scene.prototype = Object.create(Entity.prototype);
Scene.prototype.constructor = Scene;
Scene.prototype.add = function(child){
	child.game = this.game;
	this.childs.push(child);
}
Scene.prototype.remove = function(child){
	this.childs.splice(this.childs.indexOf(child),1);
}

Scene.prototype.renderInternal = function(){
	this.render();
	for(var i = 0; i<this.childs.length; i++){
		this.childs[i].render();
	}
	
}

Scene.prototype.updateInternal = function(){
	for(var i = 0; i<this.childs.length; i++){
		this.childs[i].update();
	}
	this.update();
}

Scene.prototype.changeScene = function(scene){
	this.game.currentScene = scene;
}