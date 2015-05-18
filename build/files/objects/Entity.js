/**
* Entity class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {String} name - Name of the new instance.
*/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = (function () {
	function Entity(x, y, name) {
		_classCallCheck(this, Entity);

		this.position = new Math.Vector2(x, y);
		this.name = name;
		this.parent;
		this.sprite;
		this.rect;
		this.childs = new Array();
		this.game;
		this.init();
	}

	_createClass(Entity, [{
		key: "init",
		value: function init() {}
	}, {
		key: "setPosition",
		value: function setPosition(x, y) {
			this.position.x = x;
			this.position.y = y;
		}
	}, {
		key: "onScreen",
		value: function onScreen() {
			if (this.rect != null) return this.rect.collides(game.currentCamera.rect);
		}
	}, {
		key: "add",
		value: function add(child) {}
	}, {
		key: "remove",
		value: function remove(id) {}
	}, {
		key: "destroy",
		value: function destroy() {
			//change to remove from parent. make the reference
			this.game.currentScene.remove(this);
		}
	}, {
		key: "render",
		value: function render() {}
	}, {
		key: "update",
		value: function update() {}
	}]);

	return Entity;
})();