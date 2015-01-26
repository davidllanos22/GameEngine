var game = new Game(640,480); // create a new instance of the game

game.render = function(){
	this.graphics.print("Hello World!",100,180,40,"white"); // draw string
	this.graphics.print("Testing",100,230,20,"red"); // draw string 
}