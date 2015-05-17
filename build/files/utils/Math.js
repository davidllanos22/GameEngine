/**
* Interpolates between from and to by an increment time.
* 
* @param {float} from - The first value.
* @param {float} to - The second value.
* @param {float} time - Amount of interpolation. 0.0 is from and 1.0 is to.
* @return Interpolated value of from and to based on time.
*/
"use strict";

Math.lerp = function (from, to, time) {
  return (to - from) * time;
};

/**
* Returns a random integer N where 0 <= N <= x
* 
* @param {int} x - The greatest number N can be.
* @returns Random integer N where 0 <= N <= x.
*/
Math.randomTo = function (x) {
  return Math.floor(Math.random() * (x + 1));
};

/**
* Returns a random integer N where 0 <= N <= x
*  
* @param {int} min - The lowest number N can be.
* @param {int} max - The greatest number N can be.
* @returns Random integer N where min <= N <= max.
*/
Math.randomRange = function (min, max) {
  return Math.randomTo(max - min) + min;
};

/**
* Vector2 class.
* @constructor
* @param {int} x - X position of the Vector.
* @param {int} y - Y position of the Vector.
*/
Math.Vector2 = function (x, y) {

  if (x == undefined && y == undefined) {
    x = 0;
    y = 0;
  }

  this.x = x;
  this.y = y;

  this.set = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.add = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  };

  this.addX = function (x) {
    this.x += x;
    return this;
  };

  this.addY = function (y) {
    this.y += y;
    return this;
  };

  this.subtract = function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  };

  this.subtractX = function (x) {
    this.x -= x;
    return this;
  };

  this.subtractY = function (y) {
    this.y -= y;
    return this;
  };

  this.reverse = function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  this.dotProduct = function (vector) {
    return this.x * vector.x + this.y * vector.y;
  };

  this.crossProduct = function (vector) {
    return this.x * vector.y - this.y * vector.x;
  };

  this.lerp = function (vector, time) {
    this.x += Math.lerp(this.x, vector.x, time);
    this.y += Math.lerp(this.y, vector.y, time);
    return this;
  };

  this.angleBetween = function (vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  };

  this.distance = function (vector) {
    var xx = this.x - vector.x;
    var yy = this.y - vector.y;
    return Math.sqrt(xx * xx + yy * yy);
  };

  this.copy = function () {
    return new Math.Vector2(this.x, this.y);
  };
};