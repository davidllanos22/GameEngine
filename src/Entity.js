Entity = function(x,y){
	this.x = x;
	this.y = y;
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

	},
	render: function(){

	},
	update: function(){

	}

}