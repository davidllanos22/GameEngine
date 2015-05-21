var game = new Game(640,480); // Create a new instance of the game.

game.init = function(){
  game.graphics.setClearColor("#6f6169"); // Set the background color.
}

game.render = function(){
  var xx = game.getSize().x / 2;
  var yy = game.getSize().y / 2;
  
	game.graphics.rect(xx - 150, yy - 150, 300, 300, "#df2020"); // Draw a rectangle.
	game.graphics.rect(xx - 100, yy - 100, 200, 200, "#ffa433"); // Draw a rectangle.
	game.graphics.rect(xx - 50, yy - 50, 100, 100, "#ffee58"); // Draw a rectangle.
}