var game = new Game(640,480); // create a new instance of the game

var timer;

var pos = {
	x: 0,
	y: 80
}
var speed = {
	x: 1,
	y: 1
}


game.init = function(){
	timer = new Timer(200,false,start,tick,finish);
}
game.render = function(){
	this.renderer.clearScreen("black"); // clear screen with black color
	this.renderer.drawRect(pos.x,pos.y,40,40,"blue");
}

game.update = function(){
	if(!timer.isRunning)timer.start();
}

var start = function(){
	Utils.log("Hi!");
}

var tick = function(){
	pos.x += speed.x;
	pos.y += speed.y;

	if(pos.x > game.width) pos.x=-40;
}

var finish = function(){
	speed.y *= -1;
}