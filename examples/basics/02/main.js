var game = new Game(640,480); // Create a new instance of the game.


game.render = function(){
	game.graphics.rect(game.width/2-150, game.height/2-150, 300, 300, "#7f007f"); // Draw a rectangle.
	game.graphics.rect(game.width/2-100, game.height/2-100, 200, 200, "#ff7f00"); // Draw a rectangle.
	game.graphics.rect(game.width/2-50, game.height/2-50, 100, 100, "#996633"); // Draw a rectangle.
}