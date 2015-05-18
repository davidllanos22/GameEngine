var game = new Game(640, 480); // Create a new instance of the game.

var pos = new Math.Vector2(100, 100); // Position of the rectangle.

var v = 1; // Speed of the rectangle.

game.init = function(){
  game.graphics.setClearColor("#0d4c57"); // Set the background color.
}

game.render = function(){
	game.graphics.rect(pos.x, pos.y, 50, 50, "#FF0066"); // Draw a rectangle.
	game.graphics.print("Use WASD or direction keys to move", 10, 440); // Draw a string. 
}

game.update = function(){
	if(game.input.keyCheck(Keys.D) || game.input.keyCheck(Keys.RIGHT)) pos.addX(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.A) || game.input.keyCheck(Keys.LEFT)) pos.subtractX(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.W ) || game.input.keyCheck(Keys.UP)) pos.subtractY(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.S) || game.input.keyCheck(Keys.DOWN)) pos.addY(v); // Move the rectangle.
}