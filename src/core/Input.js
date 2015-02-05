/**
* Contains a list of Keyboard Keys.
*/
Keys = {
	BACKSPACE: 8,    
  TAB: 9,    
  ENTER: 13,   
  SHIFT: 16,   
  CTRL: 17,   
  ALT: 18,   
  PAUSE: 19,   
  CAPS_LOCK: 20,   
  ESC: 27,   
  SPACE: 32,   
  PAGE_UP: 33,   
  PAGE_DOWN: 34,   
  END: 35,   
  HOME: 36,   
  LEFT: 37,   
  UP: 38,   
  RIGHT: 39,   
  DOWN: 40,   
  PRINT_SCREEN: 44,   
  INSERT: 45,   
  DELETE: 46,   
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
  NUM_ZERO: 96,   
  NUM_ONE: 97,   
  NUM_TWO: 98,   
  NUM_THREE: 99,   
  NUM_FOUR: 100,  
  NUM_FIVE: 101,  
  NUM_SIX: 102,  
  NUM_SEVEN: 103,  
  NUM_EIGHT: 104,  
  NUM_NINE: 105,  
  NUM_MULTIPLY: 106,  
  NUM_PLUS: 107,  
  NUM_MINUS: 109,  
  NUM_PERIOD: 110,  
  NUM_DIVISION: 111,  
  F1: 112,  
  F2: 113,  
  F3: 114,  
  F4: 115,  
  F5: 116,  
  F6: 117,  
  F7: 118,  
  F8: 119,  
  F9: 120,  
  F10: 121,  
  F11: 122,  
  F12: 123,  
  PLUS: 187,  
  MINUS: 189
}

/**
* Input class.
* @constructor
* @param {Game} game - instance of the Game class.
*/
Input = function(game){
	this.game = game;
	this.keyDown = {};
	this.keyJustDown = {};
	this.keyJustReleased = {};
	this.mouse = new Math.Vector2(0,0);
	this.mouseClick = [false,false,false];
	this.mouseRelease = [false,false,false];
	this.mouseHold = [false,false,false];
  this.cursorImage;
	
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
		else return false;
	},
	released: function(key){
		if(this.keyJustReleased[key]){
			this.keyJustReleased[key] = 0;
			return true;
		}else 
			return false;
	},
	onMouseMove: function(input, e){
		var rect = this.game.cvs.getBoundingClientRect();
		this.mouse.x = Math.round(((e.clientX-rect.left)/(rect.right-rect.left)*this.game.cvs.width)/this.game.scale)/this.game.gameScale;
		this.mouse.y = Math.round(((e.clientY-rect.top)/(rect.bottom-rect.top)*this.game.cvs.height)/this.game.scale)/this.game.gameScale;
	},
	onMouseDown: function(input, e){
		this.mouseClick[e.button] = true;
		this.mouseHold[e.button] = true;
		
	},
	onMouseUp: function(input, e){
		this.mouseRelease[e.button] = true;
		this.mouseHold[e.button] = false;
		
	},
  mouseReset: function(){
    this.mouseClick = [false,false,false];
    this.mouseRelease = [false,false,false];
  },
  mouseRender: function(){
    if(this.cursorImage != null){
      if(this.cursorImage instanceof Image)
        this.game.graphics.image(this.input.cursorImage, this.game.input.mouse.x, this.game.input.mouse.y)
      if(this.game.input.cursorImage instanceof Animation){
        //this.cursorImage.render(this.input.cursorImage.image, game.input.mouse.x, game.input.mouse.y)
      }
    }
  },
  setCursorStyle: function(a){
    this.game.cvs.style.cursor = a;
  },
  setCursorImage: function(a){
    this.setCursorStyle("none");
    this.cursorImage = a;
  }
}
