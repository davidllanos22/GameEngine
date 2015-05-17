/**
* Entity class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {String} name - Name of the new instance.
*/
"use strict";

Entity = function (x, y, name) {
	this.position = new Math.Vector2(x, y);
	this.name = name;
	this.parent;
	this.sprite;
	this.rect;
	this.childs = new Array();
	this.game;
	this.init();
};

Entity.prototype = {
	init: function init() {},
	setPosition: function setPosition(x, y) {
		this.position.x = x;
		this.position.y = y;
	},
	onScreen: function onScreen() {
		if (this.rect != null) return this.rect.collides(game.currentCamera.rect);
	},
	add: function add(child) {},
	remove: function remove(child) {},
	remove: function remove(id) {},
	destroy: function destroy() {
		//change to remove from parent. make the reference
		this.game.currentScene.remove(this);
	},
	render: function render() {},
	update: function update() {}

};