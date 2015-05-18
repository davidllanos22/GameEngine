/**
* Scene class.
* @constructor
* @param {Game} game - instance of the Game class.
* @param {String} name - Name of the Scene.
*/
class Scene extends Entity{
	constructor(game, name){
		super(0, 0, "Scene");
		this.name = name;
		this.game = game;
		this.ySorting = true;
		this.init();
	}

	add(child){
		child.game = this.game;
		this.childs.push(child);
	}

	remove(child){
		this.childs.splice(this.childs.indexOf(child),1);
	}

	removeAll(){
		var l = this.childs.length;
 
	  while(l > 0){
	    this.remove(this.childs[0]);
	    l = this.childs.length;
	  }
	}

	changeScene(scene){
		this.game.currentScene = scene;
		//this.game.currentScene.init();
	}

	renderInternal(){
		this.render();
		for(var i = 0; i<this.childs.length; i++){
			//if(this.childs[i].onScreen())
				this.childs[i].render();
		}
	}

	updateInternal(){
		if(this.ySorting) this.childs.sort(function(a,b){
			var ay = Math.ceil(a.position.y);
			var by = Math.ceil(b.position.y);

			return ay - by;
		});

		for(var i = 0; i<this.childs.length; i++){
			this.childs[i].update();
		}
		this.update();
	}
}

/**
* TransitionScene class.
*
* @constructor
* @param {Scene} from - Origen Scene.
* @param {Scene} to - End Scene.
*/
class TransitionScene extends Scene{
	constructor(game, from, to){
		super(game, "Transition");
		this.from = from;
		this.to = to;
		this.visible = this.from;
		this.time = 300;

		this.fadeOut = new Timer(game, this.time, false, null, null, ()=>{
			this.game.currentScene.changeScene(this.to);
		});

		this.fadeIn = new Timer(game, this.time, false, null, null, ()=>{
			this.visible = to;
			this.to.init();
			this.fadeOut.start();
		});
		
		this.fadeIn.start();
	}

	render(){
		this.visible.renderInternal();
		if(this.fadeIn.isRunning)this.game.graphics.rect(0,0,this.game.getSize().x,this.game.getSize().y,"rgba(255,255,255,"+this.fadeIn.time/this.time+")");
		else this.game.graphics.rect(0,0,this.game.getSize().x,this.game.getSize().y,"rgba(255,255,255,"+(this.time-this.fadeOut.time)/this.time+")");
	}

	
}
