Math.lerp = function(from, to, time){
  return (to - from)*time;
}
Math.Vector2 = function(x, y){
  this.x = x;
  this.y = y;
}

Math.Vector2.prototype = {
  add: function(vector){
    this.x += vector.x;
    this.y += vector.y;
  },
  addX: function(vector){
    this.x += vector.x;
  },
  addY: function(vector){
    this.y += vector.y;
  },
  subtract: function(vector){
    this.x -= vector.x;
    this.y -= vector.y;
  },
  subtractX: function(vector){
    this.x -= vector.x;
  },
  subtractY: function(vector){
    this.y -= vector.y;
  },
  copy: function(){
    return new Math.Vector2(this.x,this.y);
  },
  toString : function(){
    return "x: " + this.x + " y: " + this.y;
  }
}