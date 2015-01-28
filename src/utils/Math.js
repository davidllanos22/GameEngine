Math.lerp = function(from, to, time){
  return (to - from)*time;
}
Math.randomTo = function(x){ // From 0 to x 
  return Math.floor((Math.random()*(x+1)));
}
Math.randomRange = function(min, max){ // from min to max
  return Math.randomTo((max-min))+min;
}

Math.Vector2 = function(x, y){
  this.x = x;
  this.y = y;
}

Math.Vector2.prototype = {
  add: function(vector){
    this.x += vector.x;
    this.y += vector.y;
    return this;
  },
  addX: function(vector){
    this.x += vector.x;
    return this;
  },
  addY: function(vector){
    this.y += vector.y;
    return this;
  },
  subtract: function(vector){
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  },
  subtractX: function(vector){
    this.x -= vector.x;
    return this;
  },
  subtractY: function(vector){
    this.y -= vector.y;
    return this;
  },
  lerp: function(vector, time){
    this.x += Math.lerp(this.x, vector.x, time);
    this.y += Math.lerp(this.y, vector.y, time);
    return this;
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
  }
}