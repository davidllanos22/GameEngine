Entity = function(x,y){
	this.x = x;
	this.y = y;
	this.sprite;
	this.rectangle;
	this.childs = new Array();
	this.game;
}

Entity.prototype = {

	setPosition: function(x,y){
		this.x=x;
		this.y=y;
	},
	addChild: function(child){

	},
	removeChild: function(child){

	},
	removeChild: function(id){

	},
	destroy: function(){

	},
	render: function(){

	},
	update: function(){

	}

}