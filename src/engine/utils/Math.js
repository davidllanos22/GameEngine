Math.lerp = function(from, to, time){
  return (to - from)*time;
}
Math.randomTo = function(x){
  return Math.floor((Math.random()*x));
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
  angleBetween: function (vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  },
  distance: function(vector){
    var xx = this.x - vector.x;
    var yy = this.y - vector.y;
    return Math.sqrt(xx*xx + yy*yy);
  },
  copy: function(){
    return new Math.Vector2(this.x,this.y);
  },
  toString : function(){
    return "x: " + this.x + " y: " + this.y;
  }
}