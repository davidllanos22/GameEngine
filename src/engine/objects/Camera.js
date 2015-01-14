Camera = function(game, name){
	this.game = game;
	this.name = name;
	this.x;
	this.y;
	this.width;
	this.height;
	this.angle;
}

Camera.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
}

Camera.prototype.setPosition = function(width, height){
	this.width = width;
	this.height = height;
}

Camera.prototype.setRotation = function(angle){
	this.angle = angle;
}


