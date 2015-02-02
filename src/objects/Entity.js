/**
* Entity class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {String} name - Name of the new instance.
*/
Entity = function(x, y, name){
	this.position = new Math.Vector2(x, y);
	this.name = name;
	this.parent;
	this.sprite;
	this.rect;
	this.childs = new Array();
	this.game;
	this.init();
}

Entity.prototype = {
	init: function(){
	},
	setPosition: function(x, y){
		this.position.x = x;
		this.position.y = y;
	},
	onScreen: function(){
		if(this.rect != null)return this.rect.collides(game.currentCamera.rect);
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