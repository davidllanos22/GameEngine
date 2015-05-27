/**
* Loader class.
* @constructor
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = (function () {
	function Loader(game) {
		_classCallCheck(this, Loader);

		this.actx = game.actx;
		this.resources = [];
		this.numResources = 0;
		this.numResourcesLoaded = 0;
		this.onFinish;
		this.loaded = false;
	}

	_createClass(Loader, [{
		key: "loadImage",
		value: function loadImage(url) {
			var _this = this;

			var img = new Image();
			img.src = url + "?" + new Date().getTime();

			this.numResources++;

			img.onload = function () {
				console.log("Image loaded: " + url);
				_this.numResourcesLoaded++;
				_this.check();
			};
			return img;
		}
	}, {
		key: "loadSound",
		value: function loadSound(url, callback) {
			var _this2 = this;

			var req = new XMLHttpRequest();
			req.open("GET", url, true);
			req.responseType = "arraybuffer";

			req.onload = function () {
				_this2.actx.decodeAudioData(req.response, function (buffer) {
					console.log("Audio file loaded: " + url);
					_this2.numResourcesLoaded++;
					_this2.check();
					callback(buffer);
				}, null);
			};
			req.send();
		}
	}, {
		key: "loadRaw",
		value: function loadRaw(url, callback) {
			var _this3 = this;

			var req = new XMLHttpRequest();
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					console.log("Raw file loaded: " + url);
					_this3.numResourcesLoaded++;
					_this3.check();
					callback(req.responseText);
				}
			};
			req.open("GET", url, true);
			req.send();
		}
	}, {
		key: "onFinish",
		value: function onFinish(_onFinish) {
			this.onFinish = _onFinish;
		}
	}, {
		key: "check",
		value: function check() {
			if (this.numResourcesLoaded == this.numResources) {
				this.loaded = true;
				this.onFinish();
			}
		}
	}]);

	return Loader;
})();