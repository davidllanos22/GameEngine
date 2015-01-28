Keys = {
	NUM_0: 48,
	NUM_1: 49,
	NUM_2: 50,
	NUM_3: 51,
	NUM_4: 52,
	NUM_5: 53,
	NUM_6: 54,
	NUM_7: 55,
	NUM_8: 56,
	NUM_9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	ENTER: 13
}

Input = function(game){
	this.game = game;
	this.keyDown = {};
	this.keyJustDown = {};
	this.keyJustReleased = {};
	this.mouse = new Math.Vector2(0,0);
	this.mouseClick = [false,false,false];
	this.mouseRelease = [false,false,false];
	this.mouseHold = [false,false,false];
	
	this.gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
	this.gamepad = navigator.getGamepads && navigator.getGamepads()[0];

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
		if(this.keyJustDown[e.keyCode] != 0)this.keyJustDown[e.keyCode] = true;
		delete this.keyJustReleased[e.keyCode];
	},
	onKeyUp: function(e){
		if(this.keyJustReleased[e.keyCode] != 0)this.keyJustReleased[e.keyCode] = true;
		delete this.keyDown[e.keyCode];
		delete this.keyJustDown[e.keyCode];
	},

	check: function(key){
		return this.keyDown[key];
	},
	pressed: function(key){
		if(this.keyJustDown[key]){
			this.keyJustDown[key] = 0;
			return true;
		}
		else 
			return false;
	},
	released: function(key){
		if(this.keyJustReleased[key]){
			this.keyJustReleased[key] = 0;
			return true;
		}
		else 
			return false;
	},
	onMouseMove: function(input, e){
		//this.mouseX = e.x;
		//this.mouseY = e.y;
		var rect = this.game.cvs.getBoundingClientRect();
		this.mouse.x = Math.round(((e.clientX-rect.left)/(rect.right-rect.left)*this.game.cvs.width)/this.game.scale);
		this.mouse.y = Math.round(((e.clientY-rect.top)/(rect.bottom-rect.top)*this.game.cvs.height)/this.game.scale);

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
