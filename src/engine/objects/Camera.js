Camera = function(game, name){
	this.game = game;
	this.name = name;
	this.position = new Math.Vector2(0, 0);
	this.size = new Math.Vector2((game.width / 2) / game.gameScale, (game.height / 2) / game.gameScale);
	this.rect = new Rectangle(0,0,this.size.x,this.size.y);
	this.angle = 0;
	this.shaking = false;
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

Camera.prototype.shake = function(time,intensity){
	if(!this.shaking){
		var self = this;
		this.shakeTimer = new Timer(time,false,null,function(){ // onTick
			var r = Math.randomRange(-2,2);
			self.setPosition(self.position.x-r/2,self.position.y-r/2,false);

		},function(){ // onFinish
			self.angle = 0;
			self.shaking = false;
		});
		this.shakeTimer.start();
		this.shaking = true;
	}

}


