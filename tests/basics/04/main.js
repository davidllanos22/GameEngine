var game = new Game(640,480); // create a new instance of the game

var pos = {
	x:0,
	y:0
}
var v = 1;

game.render = function(){
	this.renderer.clearScreen("black"); // clear screen with black color
	this.renderer.drawRect(pos.x,pos.y,50,50,"red"); // draw rect
	this.renderer.drawString("Use WASD to move",10,440,20,"white"); // draw string 
}

game.update = function(){
	if(this.input.keyDown[Keys.D]) pos.x += v;
	if(this.input.keyDown[Keys.A]) pos.x -= v;
	if(this.input.keyDown[Keys.W]) pos.y -= v;
	if(this.input.keyDown[Keys.S]) pos.y += v;
}