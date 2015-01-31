var game = new Game(640,480); // create a new instance of the game

var timer;

var pos = new Math.Vector2(0,80);
var speed = new Math.Vector2(1,1);

game.init = function(){
	timer = new Timer(200,false,start,tick,finish);
}
game.render = function(){
	this.graphics.rect(pos.x,pos.y,40,40,"blue");
}

game.update = function(){
	if(!timer.isRunning)timer.start();
}

var start = function(){

}

var tick = function(){
	pos.add(speed);

	if(pos.x > game.width) pos.x=-40;
}

var finish = function(){
	speed.y *= -1;
}