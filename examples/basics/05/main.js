var game = new Game(640,480); // create a new instance of the game

var sound01;
var sound02;

var canPlay = true;

game.init = function(){
	sound01 = this.loader.loadSound("sound01.wav"); // load sound
	sound02 = this.loader.loadSound("sound02.wav"); // load sound
}
game.render = function(){
	this.graphics.print("Press space to play a sound",10,440,20,"white"); // draw string 
}

game.update = function(){
	if(this.input.keyDown[Keys.SPACE]){
		if(canPlay){
			Utils.playSound(Math.randomTo(4) < 2 ? sound01 : sound02); // play a random sound
			canPlay = false; 
		}
		canPlay = false;
	}
	else
		canPlay = true;

}