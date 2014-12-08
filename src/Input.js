Keys = {
	left: 37,
	right: 39,
	up: 38,
	down: 40,
	space: 32,
	a: 90,
	b: 88,
	start: 13
}

Input = function(game){
	this.game = game;
	this.keyDown = {};

	var input = this;
	this.game.cvs.onkeydown = function(e){
		input.onKeyDown(e);
	}
	this.game.cvs.onkeyup = function(e){
		input.onKeyUp(e);
	}

}


Input.prototype = {

	onKeyDown: function(e){
		this.keyDown[e.keyCode] = true;
	},
	onKeyUp: function(e){
		delete this.keyDown[e.keyCode];
	}
}
