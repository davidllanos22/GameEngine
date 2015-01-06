var game = new Game(640,480); // create a new instance of the game


game.init = function(){
}
game.render = function(){
	this.renderer.clearScreen("black"); // clear screen with black color
	this.renderer.drawString("Press space to play a sound",10,440,20,"white"); // draw string 
}

game.update = function(){
	if(this.input.keyDown[Keys.Space]){
		if(canPlay){
			Utils.playSound(Utils.random(4) < 2 ? sound01 : sound02); // play a random sound
			canPlay = false; 
		}
		canPlay = false;
	}
	else
		canPlay = true;

}