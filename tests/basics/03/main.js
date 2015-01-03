var game = new Game(640,480); // create a new instance of the game

game.render = function(){
	this.renderer.clearScreen("black"); // clear screen with black color
	this.renderer.drawString("Hello World!",100,180,40,"white"); // draw string
	this.renderer.drawString("Testing",100,230,20,"red"); // draw string 
}