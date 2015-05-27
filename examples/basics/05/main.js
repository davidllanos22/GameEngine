var game = new Game(640, 480); // Create a new instance of the game.

var sound01 = null; // Load a sound.
var	sound02 = null;

game.loader.loadSound("sound01.wav", function(b){
	sound01 = b;
});

game.loader.loadSound("sound02.wav", function(b){
	sound02 = b;
});

game.init = function(){
  game.graphics.setClearColor("#6f6169"); // Set the background color.
}

game.render = function(){
  var xx = game.getSize().x / 2;
  var yy = game.getSize().y / 2;

	game.graphics.print("Press enter to", xx - 105, yy - 50); // Draw a string. 
	game.graphics.print("play a sound", xx - 90, yy - 20); // Draw a string.
}
game.update = function(){
	if(game.input.keyPressed(Keys.ENTER))
		Utils.playSound(game, Math.randomTo(4) < 2 ? sound01 : sound02); // Play a random sound.
}