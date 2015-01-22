Scene = function(game,name){
	Entity.call(this,0,0,"Scene");
	this.name = name;
	this.game = game;
	this.ySorting = true;
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
			if(this.childs[i].onScreen())this.childs[i].render();
	}
}

Scene.prototype.updateInternal = function(){
	for(var i = 0; i<this.childs.length; i++){
		this.childs[i].update();
	}
	if(this.ySorting) this.childs.sort(function(a,b){return a.position.y-b.position.y;});
	this.update();
}

Scene.prototype.changeScene = function(scene){
	this.game.currentScene = scene;
	//this.game.currentScene.init();
}


/*

*/

TransitionScene = function(from, to){
	Scene.call(this,to.game,"Transition Scene");
	var self = this;
	this.from = from;
	this.to = to;
	this.visible = this.from;
	this.time = 200;

	this.fadeOut = new Timer(this.time, false, null, null, function(){
		this.game.currentScene.changeScene(to);
	});
	this.fadeIn = new Timer(this.time, false, null, null, function(){
		self.visible = to;
		to.init();
		self.fadeOut.start();
	});
	this.fadeIn.start();
}

TransitionScene.prototype = Object.create(Scene.prototype);
TransitionScene.prototype.constructor = TransitionScene;

TransitionScene.prototype.render = function(){
	this.visible.renderInternal();
	if(this.fadeIn.isRunning)this.game.renderer.drawRect(0,0,game.width,game.height,"rgba(255,255,255,"+this.fadeIn.count/this.time+")");
	else this.game.renderer.drawRect(0,0,game.width,game.height,"rgba(255,255,255,"+(this.time-this.fadeOut.count)/this.time+")");
}