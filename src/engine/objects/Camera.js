Camera = function(game, name){
	this.game = game;
	this.name = name;
	this.position = new Math.Vector2(0, 0);
	this.size = new Math.Vector2((game.width / 2) / game.gameScale, (game.height / 2) / game.gameScale);
	this.rect = new Rectangle(0,0,this.size.x,this.size.y);
	this.angle = 0;
}

Camera.prototype.setPosition = function(x, y, lerp){
	if(lerp){
		this.position.x += Math.lerp(this.position.x, x, 0.01);
		this.position.y += Math.lerp(this.position.y, y, 0.01);
	}else{
		this.position.x = x;
		this.position.y = y;
	}
	this.rect.position = this.position;
}

Camera.prototype.setRotation = function(angle){
	this.angle = angle;
}


