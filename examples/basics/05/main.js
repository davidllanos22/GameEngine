var game = new Game(640, 480); // Create a new instance of the game.

var sound01 = game.loader.loadSound("sound01.wav"); // Load a sound.
var	sound02 = game.loader.loadSound("sound02.wav"); // Load a sound.

game.init = function(){
  game.graphics.setClearColor("#0d4c57"); // Set the background color.
}

game.render = function(){
  var xx = ( game.width / game.scale / game.gameScale ) / 2;
  var yy = ( game.height / game.scale / game.gameScale ) / 2;
	game.graphics.print("Press enter to", xx-105, yy-50, 20); // Draw a string. 
	game.graphics.print("play a sound", xx-90, yy-20, 20); // Draw a string.
}
game.update = function(){
	if(game.input.pressed(Keys.ENTER))
		Utils.playSound(Math.randomTo(4) < 2 ? sound01 : sound02); // Play a random sound.
}