/**
* Timer class.

* @constructor
* @param {int} duration - Time the timer will run.
* @param {boolean} repeat - Will the animation be looped?.
* @param {function} onStart - Function triggered at the start of the timer.
* @param {function} onTick - Function triggered at every tick of the timer.
* @param {function} onFinish - Function triggered at the end of the timer.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = (function () {
	function Timer(game, duration, repeat, onStart, onTick, onFinish) {
		_classCallCheck(this, Timer);

		this.game = game;
		this.duration = duration;
		this.isRunning = false;
		this.repeat = repeat;
		this.onStart = onStart;
		this.onTick = onTick;
		this.onFinish = onFinish;
		this.game;
		this.time = -1;
		this.count = 0;

		this.done = false;
	}

	_createClass(Timer, [{
		key: "start",
		value: function start() {
			this.game.timerManager.add(this);
			this.reset();
		}
	}, {
		key: "run",
		value: function run() {
			if (!this.done || this.repeat) {
				if (this.time == -1) {
					if (this.onStart != null) this.onStart();
					this.time++;
				} else if (this.time == this.duration) {
					if (this.onFinish != null) this.onFinish();
					this.done = true;
					this.isRunning = false;
					if (this.repeat) {
						this.count++;
						this.reset();
					} else this.game.timerManager.remove(this);
				} else {
					if (this.onTick != null) this.onTick();
					this.time++;
				}
			}
		}
	}, {
		key: "reset",
		value: function reset() {
			this.time = -1;
			this.done = false;
			this.isRunning = true;
		}
	}, {
		key: "pause",
		value: function pause() {
			this.isRunning = false;
		}
	}, {
		key: "unpause",
		value: function unpause() {
			this.isRunning = true;
		}
	}]);

	return Timer;
})();