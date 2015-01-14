Entity = function(x, y, name){
	this.x = x;
	this.y = y;
	this.name = name;
	this.parent;
	this.sprite;
	this.rect;
	this.childs = new Array();
	this.game;
}

Entity.prototype = {

	setPosition: function(x,y){
		this.x=x;
		this.y=y;
	},
	inScreen: function(){
		this.x=x;
		this.y=y;
	},
	add: function(child){

	},
	remove: function(child){

	},
	remove: function(id){

	},
	destroy: function(){
		//change to remove from parent. make the reference
		this.game.currentScene.remove(this);
	},
	render: function(){

	},
	update: function(){

	}

}