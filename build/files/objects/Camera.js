/**
* Camera class.
* @constructor
* @param {Game} game - instance of the Game class.
* @param {String} name - Name of the Scene.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = (function () {
	function Camera(game, name) {
		_classCallCheck(this, Camera);

		this.game = game;
		this.name = name;
		this.position = new Math.Vector2(0, 0);
		this.size = new Math.Vector2(game.width / 2 / game.gameScale, game.height / 2 / game.gameScale);
		this.rect = new Rectangle(0, 0, this.size.x, this.size.y);
		this.angle = 0;
		this.shaking = false;
		this.limit = new Math.Vector2(0, 0);
		this.useLimit = false;
	}

	_createClass(Camera, [{
		key: "setPosition",
		value: function setPosition(x, y, lerp) {
			var newPos = new Math.Vector2(x, y);
			if (lerp) {
				this.position.lerp(newPos, 0.01);
			} else {
				this.position = newPos;
			}

			if (this.useLimit) {
				if (this.position.x < 0) this.position.x = 0;
				if (this.position.y < 0) this.position.y = 0;
				if (this.position.x > this.limit.x) this.position.x = this.limit.x;
				if (this.position.y > this.limit.y) this.position.y = this.limit.y;
			}
			this.rect.position = this.position;
		}
	}, {
		key: "setRotation",
		value: function setRotation(angle) {
			this.angle = angle;
		}
	}, {
		key: "shake",
		value: function shake(time, intensity) {
			if (!this.shaking) {
				var self = this;
				var originalPos = this.position.copy(); // copy position vector
				var originalAngle = this.angle;

				this.shakeTimer = new Timer(time, false, null, function () {
					// onTick
					var r = Math.randomRange(-intensity, intensity);
					self.setPosition(self.position.x - r, self.position.y - r, false);
					//self.setRotation(self.angle+r,self.angle+r)
				}, function () {
					// onFinish
					self.position = originalPos;
					self.angle = originalAngle;
					self.shaking = false;
				});

				this.shakeTimer.start();
				this.shaking = true;
			}
		}
	}]);

	return Camera;
})();