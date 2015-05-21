/**
* Loader class.
* @constructor
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = (function () {
	function Loader() {
		_classCallCheck(this, Loader);

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
				console.log("Image loaded " + url);
				_this.numResourcesLoaded++;
				_this.check();
			};
			return img;
		}
	}, {
		key: "loadSound",
		value: function loadSound(url) {
			var _this2 = this;

			var audio = new Audio();
			audio.src = url + "?" + new Date().getTime();

			this.numResources++;

			audio.addEventListener("loadeddata", function () {
				console.log("Audio loaded " + url);
				_this2.numResourcesLoaded++;
				_this2.check();
			}, false);

			return audio;
		}
	}, {
		key: "loadData",
		value: function loadData(url, callback) {
			var req = new XMLHttpRequest();
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					console.log("Data loaded " + url);
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