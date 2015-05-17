/**
* Rectangle class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {int} w - Width new instance.
* @param {int} h - Height of the new instance.
*/
"use strict";

Rectangle = function (x, y, w, h) {
	this.setPosition = function (x, y) {
		this.position.x = x;
		this.position.y = y;
	};

	this.setSize = function (w, h) {
		this.size.x = w;
		this.size.y = h;
	};

	this.collides = function (rect) {
		if (rect != null) return this.position.x < rect.position.x + rect.size.x && this.position.x + this.size.x > rect.position.x && this.position.y < rect.position.y + rect.size.y && this.position.y + this.size.y > rect.position.y;
	};

	this.collidesAt = function (rect, xx, yy) {
		var rectMod = this.copy();

		rectMod.position.addX(xx);
		rectMod.position.addY(yy);

		return rectMod.collides(rect);
	};

	this.copy = function () {
		return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
	};

	this.position = new Math.Vector2(x, y);
	this.size = new Math.Vector2(w, h);
};