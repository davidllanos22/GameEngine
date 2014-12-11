Keys = {
	left: 37,
	right: 39,
	up: 38,
	down: 40,
	space: 32,
	w: 87,
	a: 65,
	s: 83,
	d: 68, 
	b: 88,
	start: 13
}

Input = function(game){
	this.game = game;
	this.keyDown = {};
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseClick = [false,false,false];
	this.mouseRelease = [false,false,false];
	this.mouseHold = [false,false,false];
	var input = this;

	this.game.cvs.onkeydown = function(e){input.onKeyDown(e);}
	this.game.cvs.onkeyup = function(e){input.onKeyUp(e);}
	this.game.cvs.onmousemove = function(e){input.onMouseMove(this, e);}
	this.game.cvs.onmousedown = function(e){input.onMouseDown(this, e);}
	this.game.cvs.onmouseup = function(e){input.onMouseUp(this, e);}

}


Input.prototype = {

	onKeyDown: function(e){
		this.keyDown[e.keyCode] = true;
	},
	onKeyUp: function(e){
		delete this.keyDown[e.keyCode];
	},
	onMouseMove: function(input, e){
		input.mouseX = e.x;
		input.mouseY = e.y;	
	},
	onMouseDown: function(input, e){
		this.mouseClick[e.button] = true;
		this.mouseHold[e.button] = true;
		
	},
	onMouseUp: function(input, e){
		this.mouseRelease[e.button] = true;
		this.mouseHold[e.button] = false;
		
	}
}
