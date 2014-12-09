var game = new Game(window.innerWidth,window.innerHeight);

var monk;
var shoot;
var items = new Array();


game.init = function(){
	//this.setSize(1000,700);
	monk = this.loader.loadImage("test01/monk.png");
	shoot = this. loader.loadSound("test01/sound01.wav");

	for(var i = 0; i < 2000; i++){
		items.push(new Item(Utils.random(game.width),Utils.random(game.height)));
	}

	shoot.play();
}

game.render = function(){
	this.renderer.clearScreen("black");
	for(var i = 0; i < items.length; i++){
		items[i].render();
	}
}

game.update = function(){
	for(var i = 0; i < items.length; i++){
		items[i].move();
	}

	if(this.input.keyDown[Keys.space])Utils.log("pressing space");
	
}
game.onFocus = function(){
	Utils.log("Canvas focused");
}
game.onBlur = function(){
	Utils.log("Canvas not focused");
}


Item = function(x,y){
	this.x = x;
	this.y = y;
	this.rot = 0;
}

Item.prototype = {
	move: function(){
		// if(this.x>game.width+16)this.x=-16;
		// this.x+=Utils.random(100)/10;

		// if(this.y>game.height+16)this.y=-16;
		// this.y+=Utils.random(100)/10;

		this.rot+=0.01;
	},
	render: function(){
		game.renderer.drawImageRot(monk,this.x,this.y,0,0,24,this.rot);
		//game.renderer.drawRect(this.x,this.y,16,16,"red");
	}
}

