/**
* Rectangle class.
* @constructor
* @param {int} x - X position of the new instance.
* @param {int} y - Y position of the new instance.
* @param {int} w - Width new instance.
* @param {int} h - Height of the new instance.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = (function () {
	function Rectangle(x, y, w, h) {
		_classCallCheck(this, Rectangle);

		this.position = new Math.Vector2(x, y);
		this.size = new Math.Vector2(w, h);
	}

	_createClass(Rectangle, [{
		key: "setPosition",
		value: function setPosition(x, y) {
			this.position.x = x;
			this.position.y = y;
		}
	}, {
		key: "setSize",
		value: function setSize(w, h) {
			this.size.x = w;
			this.size.y = h;
		}
	}, {
		key: "collides",
		value: function collides(rect) {
			if (rect != null) return this.position.x < rect.position.x + rect.size.x && this.position.x + this.size.x > rect.position.x && this.position.y < rect.position.y + rect.size.y && this.position.y + this.size.y > rect.position.y;
		}
	}, {
		key: "collidesAt",
		value: function collidesAt(rect, xx, yy) {
			var rectMod = this.copy();

			rectMod.position.addX(xx);
			rectMod.position.addY(yy);

			return rectMod.collides(rect);
		}
	}, {
		key: "copy",
		value: function copy() {
			return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
		}
	}]);

	return Rectangle;
})();