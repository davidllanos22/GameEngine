/**
* Contains a list of Keyboard Keys.
*/
var Keys = {
  NONE: -2,
  ANY: -1,
  BACKSPACE: 8,    
  TAB: 9,    
  ENTER: 13,   
  SHIFT: 16,   
  CTRL: 17,   
  ALT: 18,   
  PAUSE: 19,   
  CAPSLOCK: 20,   
  ESC: 27,   
  SPACE: 32,   
  PAGEUP: 33,   
  PAGEDOWN: 34,   
  END: 35,   
  HOME: 36,   
  LEFT: 37,   
  UP: 38,   
  RIGHT: 39,   
  DOWN: 40,   
  PRINTSCREEN: 44,   
  INSERT: 45,   
  DELETE: 46,   
  NUM0: 48,   
  NUM1: 49,   
  NUM2: 50,   
  NUM3: 51,   
  NUM4: 52,   
  NUM5: 53,   
  NUM6: 54,   
  NUM7: 55,   
  NUM8: 56,   
  NUM9: 57,   
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
  NUMZERO: 96,   
  NUMONE: 97,   
  NUMTWO: 98,   
  NUMTHREE: 99,   
  NUMFOUR: 100,  
  NUMFIVE: 101,  
  NUMSIX: 102,  
  NUMSEVEN: 103,  
  NUMEIGHT: 104,  
  NUMNINE: 105,  
  NUMMULTIPLY: 106,  
  NUMPLUS: 107,  
  NUMMINUS: 109,  
  NUMPERIOD: 110,  
  NUMDIVISION: 111,  
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
* Contains a list of Mouse Buttons.
*/
var Mouse = {
  NONE: -2,
  ANY: -1,
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
}

/**
* Input class.
* @constructor
* @param {Game} game - instance of the Game class.
*/
class Input{
  constructor(game){
    this.game = game;
    this.cvs = game.glcvs;
    this.keyC = {};
    this.keyP = {};
    this.keyR = {};
    this.m = new Math.Vector2(0, 0);
    this.mp = [false, false, false];
    this.mr = [false, false, false];
    this.mc = [false, false, false];
    this.mouseWheel = 0;
    
    window.onkeydown = (e) => {this.onkeyDown(e);}
    window.onkeyup = (e) => {this.onKeyUp(e);}
    window.onmousemove = (e) => {this.onMouseMove(e);}
    window.onmousedown = (e) => {this.onMouseDown(e);}
    window.onmouseup = (e) => {this.onMouseUp(e);}
    window.onmousewheel = (e) => {this.onMouseWheel(e);}
  }

  onkeyDown(e){
    if(e == 32 || e == 37 || e == 38 || e == 39 || e == 40){
        e.preventDefault();
    }

    this.keyC[e.keyCode] = true;
    if(this.keyP[e.keyCode] != 0)this.keyP[e.keyCode] = true;
    delete this.keyR[e.keyCode];
  }

  onKeyUp(e){
    if(this.keyR[e.keyCode] != 0)this.keyR[e.keyCode] = true;
    delete this.keyC[e.keyCode];
    delete this.keyP[e.keyCode];
  }

  onMouseMove(e){
    e.preventDefault();
    var rect = this.cvs.getBoundingClientRect();
    var xx = (e.clientX - rect.left) / (rect.right - rect.left) * this.game.getSize().x;
    var yy = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.game.getSize().y;
    this.m.set(Math.floor(xx), Math.floor(yy));
  }

  onMouseDown(e){
    e.preventDefault();
    this.mp[e.button] = true;
    this.mc[e.button] = true;
  }

  onMouseUp(e){
    e.preventDefault();
    this.mr[e.button] = true;
    this.mc[e.button] = false;
  }
  
  onMouseWheel(e){
    this.mouseWheel = e.wheelDelta;
  }

  mouseCheck(button){
    if(button == Mouse.NONE){
      var pressed = false;
      for(var i = 0; i < this.mc.length; i++){
        if(this.mc[i]) pressed = this.mc[i];
      }
      return !pressed;
    }else if(button == Mouse.ANY){
      var pressed = false;
      var i = 0;
      while(i < this.mc.length && !pressed){
        pressed = this.mc[i];
        i++;
      }
      return pressed;
    }
    return this.mc[button];
  }

  mousePressed(button){
    if(button == Mouse.NONE){
      console.warn("Please, use mc(Mouse.NONE) instead.");
      return true;
    }else if(button == Mouse.ANY){
      var pressed = false;
      var i = 0;
      while(i < this.mp.length && !pressed){
        pressed = this.mp[i];
        i++;
      }
      return pressed;
    }
    return this.mp[button];
  }

  mouseReleased(button){
    if(button == Mouse.NONE){
      console.warn("Please, use mc(Mouse.NONE) instead.");
      return true;
    }else if(button == Mouse.ANY){
      var pressed = false;
      var i = 0;
      while(i < this.mr.length && !pressed){
        pressed = this.mr[i];
        i++;
      }
      return pressed;
    }
    return this.mr[button];
  }

  mouseWheelUp(){
    return this.mouseWheel > 0;
  }

  mouseWheelDown(){
    return this.mouseWheel < 0;
  }

  mouse(){
    return this.m;
  }

  keyCheck(key){
    if(key == Keys.NONE) return Object.keys(this.keyC).length == 0;
    else if(key == Keys.ANY) return Object.keys(this.keyC).length > 0;

    return this.keyC[key];
  }

  keyPressed(key){
    if(key == Keys.NONE) return Object.keys(this.keyP).length == 0;
    else if(key == Keys.ANY) return Object.keys(this.keyP).length > 0;

    if(this.keyP[key]){
      this.keyP[key] = 0;
      return true;
    }
    else return false;
  }

  keyReleased(key){
    if(key == Keys.NONE) return Object.keys(this.keyR).length == 0;
    else if(key == Keys.ANY) return Object.keys(this.keyR).length > 0;

    if(this.keyR[key]){
      this.keyR[key] = 0;
      return true;
    }
    else return false;
  }

  mouseReset(){
    this.mp = [false, false, false];
    this.mr = [false, false, false];
    this.mouseWheel = 0;
  }

  setCursorStyle(a){
    this.cvs.style.cursor = a;
  }

  getCursorStyle(){
    return this.cvs.style.cursor;
  }
}