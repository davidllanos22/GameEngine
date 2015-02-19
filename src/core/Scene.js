/**
* Scene class.
* @constructor
* @param {Game} game - instance of the Game class.
* @param {String} name - Name of the Scene.
*/
Scene = function(game,name){

	this.init = function(){}

	this.add = function(child){
		child.game = this.game;
		this.childs.push(child);
	}
	this.remove = function(child){
		this.childs.splice(this.childs.indexOf(child),1);
	}

	this.removeAll = function(){
		var l = this.childs.length;

	  while(l > 0){
	    this.remove(this.childs[0]);
	    l = this.childs.length;
	  }
	}
	this.changeScene = function(scene){
		this.game.currentScene = scene;
		//this.game.currentScene.init();
	}

	this.renderInternal = function(){
		this.render();
		for(var i = 0; i<this.childs.length; i++){
			//if(this.childs[i].onScreen())
				this.childs[i].render();
		}
	}

	this.updateInternal = function(){
		for(var i = 0; i<this.childs.length; i++){
			this.childs[i].update();
		}
		if(this.ySorting) this.childs.sort(function(a,b){
			ay = Math.round(a.position.y);
			by = Math.round(b.position.y);

			if(ay == by){
				return 0;
			} 
			return ay - by;
		});
		this.update();
	}

	Entity.call(this,0,0,"Scene");
	this.name = name;
	this.game = game;
	this.ySorting = true;
	this.init();
}

Scene.prototype = Object.create(Entity.prototype);
Scene.prototype.constructor = Scene;

/**
* TransitionScene class.
* @constructor
* @param {Scene} from - Origen Scene.
* @param {Scene} to - End Scene.
*/
TransitionScene = function(from, to){
	this.render = function(){
		this.visible.renderInternal();
		if(this.fadeIn.isRunning)this.game.graphics.rect(0,0,this.game.getSize().x,this.game.getSize().y,"rgba(255,255,255,"+this.fadeIn.time/this.time+")");
		else this.game.graphics.rect(0,0,this.game.getSize().x,this.game.getSize().y,"rgba(255,255,255,"+(this.time-this.fadeOut.time)/this.time+")");
	}

	Scene.call(this,to.game,"Transition Scene");
	var self = this;
	this.from = from;
	this.to = to;
	this.visible = this.from;
	this.time = 300;

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
