var game = new Game(640, 480); // Create a new instance of the game.

var rect = new Rectangle(100, 200, 100, 100); // Position and size of the rectangle.
var rect2 = new Rectangle(350, 150, 200, 200); // Position and size of the rectangle.


var v = 1; // Speed of the rectangle.

game.init = function(){
  game.graphics.setClearColor("#6f6169"); // Set the background color.
}

game.render = function(){
  rect2.render(game.graphics, "#1f74a7");
  rect.render(game.graphics, "#df2020");

	game.graphics.print("Use WASD or direction keys to move", 10, 440); // Draw a string. 

  if(rect.collides(rect2))
    game.graphics.print("Collision!", 10, 10); // Draw a string. 
}

game.update = function(){
	if(game.input.keyCheck(Keys.D) || game.input.keyCheck(Keys.RIGHT)) rect.position.addX(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.A) || game.input.keyCheck(Keys.LEFT)) rect.position.subtractX(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.W ) || game.input.keyCheck(Keys.UP)) rect.position.subtractY(v); // Move the rectangle.
	if(game.input.keyCheck(Keys.S) || game.input.keyCheck(Keys.DOWN)) rect.position.addY(v); // Move the rectangle.
}