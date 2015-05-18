/**
* Main Game class.
* @constructor
* @param {int} width - The width of the window.
* @param {int} height - The height of the window.
* @param {element} element - HTML element to contain the game.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
	function Game(width, height, element) {
		var _this = this;

		_classCallCheck(this, Game);

		var useGL = false;

		this.cvs = document.createElement("canvas");
		this.ctx = null;
		this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
		this.cvs.style.outline = "none";

		if (!useGL) this.ctx = this.cvs.getContext("2d");else {
			this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl");
			console.log(this.gl);

			this.gl.canvas.width = width * 2;
			this.gl.canvas.height = height * 2;
			this.gl.viewport(0, 0, width, height);
			this.gl.clearColor(1, 0, 0, 1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		}

		if (element != undefined) {
			element.appendChild(this.cvs);
		} else {
			document.body.appendChild(this.cvs);
		}

		// Focus

		this.focused = true;
		this.showPauseWhenNotFocused = false;
		if (this.focused) this.cvs.focus();

		// FPS

		this.showFps = false;
		this.desiredFps = 60;
		this.fps = 0;
		this.dt = 0;
		this.start = 0;
		this.step = 10 / this.desiredFps;
		this.lastLoop = 0;

		// Scaling
		this.size = new Math.Vector2(width, height);
		this.fillScreen = false;
		this.gameScale = 1;
		this.scale = 1;
		this.fillScreenWithRatio = false;
		this.ratio = 0;
		this.pixelart = true;

		// Size

		this.setSize(width, height);

		// Events

		this.cvs.onfocus = function () {
			_this.onFocusInternal();
		};
		this.cvs.onblur = function () {
			_this.onBlurInternal();
		};
		window.onresize = function () {
			_this.onResizeInternal();
		};

		this.cvs.oncontextmenu = function (e) {
			e.preventDefault();
		};

		this.initInternal();
	}

	_createClass(Game, [{
		key: "initInternal",

		/**
  * Internal initialization.
  	*/
		value: function initInternal() {
			var _this2 = this;

			this.loader = new Loader();
			this.graphics = new Graphics(this);
			this.input = new Input(this);
			this.timerManager = new TimerManager(this);

			var loadingScreen = new Scene(this, "Loading");

			loadingScreen.render = function () {
				_this2.graphics.setClearColor("#0d4c57");
				var string = "Loading: " + _this2.loader.numResourcesLoaded + " of " + _this2.loader.numResources;
				_this2.graphics.print(string, _this2.getSize().x / 2 - string.length * 16 / 2, _this2.getSize().y / 2);
			};

			this.currentScene = loadingScreen;
			this.currentCamera = new Camera(this, "Default Camera");

			this.loader.onFinish(function () {
				_this2.currentScene.changeScene(new Scene(_this2, "Default Scene"));
				_this2.graphics.setClearColor("#000");
				_this2.init();
				_this2.originalWidth = _this2.size.x;

				_this2.onResizeInternal();
			});

			this.start = new Date().getTime();
			this.lastLoop = new Date();

			this.loop();
		}
	}, {
		key: "loop",

		/**
  * Game loop. Calls internal render and update.
  * @param {Game} game - Instance of game class.
  */
		value: function loop(game) {
			var _this3 = this;

			var now = new Date().getTime();
			var elapsed = now - this.start;

			var thisLoop = new Date();
			this.fps = 1000 / (thisLoop - this.lastLoop) | 0;
			this.lastLoop = thisLoop;

			//console.log(this.fps)

			this.dt += Math.min(1, elapsed / 1000);

			while (this.dt > this.step) {
				this.dt -= this.step;
				this.updateInternal();
			}

			this.renderInternal();

			window.requestAnimationFrame(function () {
				_this3.loop();
			});
		}
	}, {
		key: "updateInternal",

		/**
  * Internal update function used by the engine. Do not use this function in your game. Use update instead.
  */
		value: function updateInternal() {
			if (!this.loader.loaded) this.loader.check();

			if (!this.showPauseWhenNotFocused || this.focused) {
				this.timerManager.update();
				if (this.loader.loaded) game.update();
				this.currentScene.updateInternal();
				if (this.input.gamepad) this.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
				this.input.mouseReset();
			}
		}
	}, {
		key: "renderInternal",

		/**
  * Internal render function used by the engine. Do not use this function in your game. Use render instead.
  */
		value: function renderInternal() {
			//todo change to a function

			if (this.pixelart) {
				this.ctx.imageSmoothingEnabled = false;
				this.ctx.mozImageSmoothingEnabled = false;
				this.ctx.msImageSmoothingEnabled = false;
			} else {
				this.ctx.imageSmoothingEnabled = true;
				this.ctx.mozImageSmoothingEnabled = true;
				this.ctx.msImageSmoothingEnabled = true;
			}

			this.graphics.clear();
			this.graphics.renderCounter = 0;

			this.ctx.save();

			this.ctx.scale(this.gameScale, this.gameScale);

			this.ctx.translate(Math.floor(-this.currentCamera.position.x), Math.floor(-this.currentCamera.position.y));
			this.ctx.rotate(this.currentCamera.angle * Math.PI / 180);

			this.currentScene.renderInternal();

			if (this.loader.loaded) this.render();

			//this.input.mouseRender();

			this.ctx.restore();

			if (this.showPauseWhenNotFocused && !this.focused) {
				this.graphics.rect(0, 0, this.getSize().x, this.getSize().y, "rgba(0,0,0,0.4)");
				this.graphics.print("- PAUSED - ", this.getSize().x / 2 - 80, this.getSize().y / 2 - 10);
			}

			if (this.showFps) this.graphics.print("FPS: " + this.fps, 8, 8);
		}
	}, {
		key: "init",

		/**
  * Main init function.
  */
		value: function init() {}
	}, {
		key: "render",

		/**
  * Main render function.
  */
		value: function render() {}
	}, {
		key: "update",

		/**
  * Main update function.
  */
		value: function update() {}
	}, {
		key: "onFocusInternal",

		/**
  * Internal onFocus function. Do not use this function in your game. Use onFocus instead.
  */
		value: function onFocusInternal() {
			this.focused = true;
			this.onFocus();
		}
	}, {
		key: "onBlurInternal",

		/**
  * Internal onBlur function. Do not use this function in your game. Use onBlur instead.
  */
		value: function onBlurInternal() {
			this.focused = false;
			this.onBlur();
		}
	}, {
		key: "onResizeInternal",

		/**
  * Internal onResize function. Do not use this function in your game. Use onResize instead.
  */
		value: function onResizeInternal() {
			if (this.fillScreen) this.setSize(window.innerWidth, window.innerHeight); // Fill screen if fillScreen = true.
			else if (this.fillScreenWithRatio) {
				ratio = size.x / size.y;
				var nWidth = window.innerWidth / ratio;
				var nHeight = nWidth / ratio;
				if (nHeight > window.innerHeight) {
					nHeight = window.innerHeight;
					nWidth = nHeight * ratio;
				}
				if (nHeight < window.innerHeight) {
					nHeight = window.innerHeight;
					nWidth = nHeight * ratio;
				}
				if (nWidth > window.innerWidth) {
					nWidth = window.innerWidth;
					nHeight = nWidth / ratio;
				}
				this.scale = nWidth / this.originalWidth;
				this.scale *= gameScale;
				this.setSize(Math.floor(nWidth), Math.floor(nHeight));
				this.ctx.scale(scale, scale);
			}
		}
	}, {
		key: "onFocus",

		/**
  * Function triggered when the game takes focus.
  */
		value: function onFocus() {}
	}, {
		key: "onBlur",

		/**
  * Function triggered when the game loses focus.
  */
		value: function onBlur() {}
	}, {
		key: "onResize",

		/**
  * Function triggered when the game is resized.
  */
		value: function onResize() {}
	}, {
		key: "setSize",

		/**
  * Sets the size of the game.
  * @param {int} width - The width of the window.
  * @param {int} height - The height of the window.
  */
		value: function setSize(width, height) {
			if (width == 0 || height == 0) Utils.logErr("Width and Height can't be 0.");

			this.size.x = width;
			this.size.y = height;

			this.cvs.width = width;
			this.cvs.height = height;
			this.cvs.style.width = width;
			this.cvs.style.height = height;
		}
	}, {
		key: "setScale",
		value: function setScale(s) {
			this.gameScale = s > 0 ? s : 0;
		}
	}, {
		key: "getScale",
		value: function getScale() {
			return this.gameScale;
		}
	}, {
		key: "getSize",
		value: function getSize() {
			var xx = this.size.x / this.scale / this.gameScale;
			var yy = this.size.y / this.scale / this.gameScale;
			return new Math.Vector2(xx, yy);
		}
	}, {
		key: "getFps",
		value: function getFps() {
			return this.fps;
		}
	}, {
		key: "fillScreenWithRatio",
		value: (function (_fillScreenWithRatio) {
			function fillScreenWithRatio(_x) {
				return _fillScreenWithRatio.apply(this, arguments);
			}

			fillScreenWithRatio.toString = function () {
				return _fillScreenWithRatio.toString();
			};

			return fillScreenWithRatio;
		})(function (e) {
			if (e != null) fillScreenWithRatio = e;else return fillScreenWithRatio;
		})
	}, {
		key: "fillScreen",
		value: (function (_fillScreen) {
			function fillScreen(_x2) {
				return _fillScreen.apply(this, arguments);
			}

			fillScreen.toString = function () {
				return _fillScreen.toString();
			};

			return fillScreen;
		})(function (e) {
			if (e != null) fillScreen = e;else return fillScreen;
		})
	}, {
		key: "showPauseWhenNotFocused",
		value: (function (_showPauseWhenNotFocused) {
			function showPauseWhenNotFocused(_x3) {
				return _showPauseWhenNotFocused.apply(this, arguments);
			}

			showPauseWhenNotFocused.toString = function () {
				return _showPauseWhenNotFocused.toString();
			};

			return showPauseWhenNotFocused;
		})(function (e) {
			if (e != null) showPauseWhenNotFocused = e;else return showPauseWhenNotFocused;
		})
	}, {
		key: "showFps",
		value: (function (_showFps) {
			function showFps(_x4) {
				return _showFps.apply(this, arguments);
			}

			showFps.toString = function () {
				return _showFps.toString();
			};

			return showFps;
		})(function (e) {
			showFps = e;
		})
	}, {
		key: "add",

		/**
  * Adds a child to the current scene.
  * @param {Entity} child - The entity to add.
  */
		value: function add(child) {
			this.currentScene.add(child);
		}
	}, {
		key: "remove",

		/**
  * Removes a child from the current scene.
  * @param {Entity} child - The entity to remove.
  */
		value: function remove(child) {
			this.currentScene.remove(child);
		}
	}, {
		key: "removeAll",

		/**
  * Removes all childs from the current scene.
  */
		value: function removeAll() {
			this.currentScene.removeAll();
		}
	}, {
		key: "changeScene",

		/**
  * Changes to the selected scene.
  * @param {Scene} scene - The scene to change to.
  */
		value: function changeScene(scene) {
			this.currentScene.changeScene(scene);
		}
	}, {
		key: "getCanvas",
		value: function getCanvas() {
			return this.cvs;
		}
	}, {
		key: "getContext",
		value: function getContext() {
			return this.ctx;
		}
	}]);

	return Game;
})();