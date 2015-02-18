var game = new Game(640, 480); // Create a new instance of the game.

var image = game.loader.loadImage("image.png"); // Load an image.

game.init = function(){
  game.graphics.setClearColor("#0d4c57");
}

game.render = function(){
	game.graphics.image(image, game.width/2-image.width/2, game.height/2-image.height/2); // Draw an image.
}