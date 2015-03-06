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
	if(game.input.check(Keys.D) || game.input.check(Keys.RIGHT)) pos.addX(v); // Move the rectangle.
	if(game.input.check(Keys.A) || game.input.check(Keys.LEFT)) pos.subtractX(v); // Move the rectangle.
	if(game.input.check(Keys.W ) || game.input.check(Keys.UP)) pos.subtractY(v); // Move the rectangle.
	if(game.input.check(Keys.S) || game.input.check(Keys.DOWN)) pos.addY(v); // Move the rectangle.
}