var game = new Game(640,480); // create a new instance of the game


game.init = function(){
}
game.render = function(){
	this.renderer.clearScreen("black"); // clear screen with black color
	this.renderer.drawString("HI",10,440,20,"white"); // draw string 
}

game.update = function(){
	
}