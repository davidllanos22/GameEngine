Camera = function(game, name){
	this.game = game;
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.width = game.width;
	this.height = game.height;
	this.angle = 0;
}

Camera.prototype.setPosition = function(x, y, lerp){
	if(lerp){
		this.x += (x - this.x)*0.01;
		this.y += (y - this.y)*0.01;
	}else{
		this.x = x;
		this.y = y;
	}
	
}

Camera.prototype.setRotation = function(angle){
	this.angle = angle;
}


