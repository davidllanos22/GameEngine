var game = new Game(640, 480); // Create a new instance of the game.

game.init = function(){
  game.graphics.setClearColor("#6f6169"); // Set the background color.
}

game.render = function(){
  var str = "Hello World!";
	game.graphics.print(str, game.getSize().x / 2 - (str.length * 16) / 2, game.getSize().y / 2 - 16); // Draw a string.
}