var game = new Game(window.innerWidth,window.innerHeight);

var monk;
var shoot;
var items = new Array();


game.init = function(){
	this.fillScreen = false;
	this.setSize(640,480);
	monk = this.loader.loadImage("monk.png");
	shoot = this. loader.loadSound("sound02.wav");

	for(var i = 0; i < 2000; i++){
		items.push(new Item(Utils.random(game.width),Utils.random(game.height)));
	}
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

	if(this.input.mouseClick){
		shoot = shoot.cloneNode()
		shoot.play();
		Utils.log("click");
	}
	
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

