var game = new Game(320, 240); // Create a new instance of the game.

var sound01 = game.loader.loadSound("sound01.wav"); // Load a sound.
var	sound02 = game.loader.loadSound("sound02.wav"); // Load a sound.

game.render = function(){
	game.graphics.print("Press space to", 80, 90, 20); // Draw a string. 
	game.graphics.print("play a sound", 90, 120, 20); // Draw a string.
}
game.update = function(){
	if(game.input.pressed(Keys.SPACE))
		Utils.playSound(Math.randomTo(4) < 2 ? sound01 : sound02); // Play a random sound.
}