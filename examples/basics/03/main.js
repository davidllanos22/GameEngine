var game = new Game(640, 480); // Create a new instance of the game.

game.init = function(){
  game.graphics.setClearColor("#0d4c57");
}

game.render = function(){
	game.graphics.print("Hello World!", 100, 180, 40); // Draw a string.
}