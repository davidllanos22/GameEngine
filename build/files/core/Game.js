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

				this.cvs = document.createElement("canvas");
				this.ctx = this.cvs.getContext("2d");
				this.glcvs = document.createElement("canvas");
				this.gl = this.glcvs.getContext("webgl");

				this.cvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
				this.cvs.style.outline = "none";
				this.glcvs.tabIndex = 1; // Set canvas tabIndex to 1. Used for focus and blur.
				this.glcvs.style.outline = "none";

				this.gl.viewport(0, 0, width, height);
				this.gl.clearColor(0, 0, 0, 1);
				this.gl.enable(this.gl.DEPTH_TEST);
				this.gl.depthFunc(this.gl.LEQUAL);

				if (element != undefined) {
						//element.appendChild(this.cvs);
						element.appendChild(this.glcvs);
				} else {
						//document.body.appendChild(this.cvs);
						document.body.appendChild(this.glcvs);
				}

				// Focus
				this.focused = true;
				this.showPauseWhenNotFocused = false;
				if (this.focused) {
						this.cvs.focus();
						this.glcvs.focus();
				}

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
				this.glcvs.onfocus = function () {
						_this.onFocusInternal();
				};
				this.glcvs.onblur = function () {
						_this.onBlurInternal();
				};
				window.onresize = function () {
						_this.onResizeInternal();
				};

				this.glcvs.oncontextmenu = function (e) {
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
								_this2.originalHeight = _this2.size.y;

								_this2.onResizeInternal();
						});

						var normal_v = " \n                    attribute vec2 a_position;\n                    uniform sampler2D u_image;\n                    varying vec2 f_texcoord;\n\n                    uniform vec2 u_resolution;\n                     \n                    void main(void){\n                      vec2 zeroToOne = a_position;\n                      vec2 zeroToTwo = zeroToOne * 2.0;\n                      vec2 clipSpace = zeroToTwo - 1.0;\n\n                      gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);\n                      f_texcoord = (clipSpace + 1.0) / 2.0;\n                    }\n                  ";

						var normal_f = " \n                    precision mediump float;\n                    uniform sampler2D u_image;\n                    varying vec2 f_texcoord;\n\n                    void main(void){\n                      vec2 texcoord = f_texcoord;\n                      gl_FragColor = texture2D(u_image, texcoord);\n                    }\n                  ";

						var wave_v = " \n                  attribute vec2 a_position;\n                  uniform sampler2D u_image;\n                  varying vec2 f_texcoord;\n\n                  uniform vec2 u_resolution;\n                   \n                  void main(void){\n                    vec2 zeroToOne = a_position;\n                    vec2 zeroToTwo = zeroToOne * 2.0;\n                    vec2 clipSpace = zeroToTwo - 1.0;\n\n                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);\n                    f_texcoord = (clipSpace + 1.0) / 2.0;\n                  }\n                ";

						var wave_f = " \n                  precision mediump float;\n                  uniform sampler2D u_image;\n                  uniform float offset;\n                  uniform float dX;\n                  uniform float dY;\n                  varying vec2 f_texcoord;\n\n\n                  void main(void){\n                    vec2 texcoord = f_texcoord;\n                    texcoord.x += sin(texcoord.y * (4.0 * 2.0 * 3.14159) + offset) / dX;\n                    texcoord.y += sin(texcoord.y * (4.0 * 2.0 * 3.14159) + offset) / dY;\n                    gl_FragColor = texture2D(u_image, texcoord);\n                  }\n                ";

						var crt_v = " \n                  attribute vec2 a_position;\n                  varying vec2 f_texcoord;\n                   \n                  void main(void){\n\n                    gl_Position = vec4(a_position * vec2(1, -1), 0.0, 1.0);\n                    f_texcoord = (a_position + 1.0) / 2.0;\n                  }\n                ";

						var crt_f = " \n                  \n                precision highp float;\n                uniform vec2 u_resolution;\n                uniform float time;\n\n                uniform sampler2D u_image;\n\n                varying vec2 f_texcoord;\n\n                uniform float speed;\n                uniform vec3 tint;\n                uniform float lineWidth;\n                \n                float rand(vec2 co){\n                    return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);\n                }\n\n                void main(void){\n                    vec2 pixel = gl_FragCoord.xy / u_resolution;\n                    \n                    vec3 col = texture2D(u_image, f_texcoord).xyz;\n                    \n                    // start with the source texture and misalign the rays it a bit\n                     // col.r = texture2D(u_image, vec2(pixel.x + 0.002, - pixel.y)).r;\n                     // col.g = texture2D(u_image, vec2(pixel.x + 0.001, - pixel.y)).g;\n                     // col.b = texture2D(u_image, vec2(pixel.x - 0.002, - pixel.y)).b;\n\n                    // contrast curve\n                    col = clamp(col * 0.5 + 0.5 * col * col * 1.2, 0.0, 1.0);\n\n                    //vignette\n                    col *= 0.6 + 0.4 * 16.0 * pixel.x * pixel.y * (1.0 - pixel.x) * (1.0 - pixel.y);\n\n                    //color tint\n                    //col *= vec3(0.9, 1.0, 0.8);\n\n                    col *= tint;\n\n                    //scanline (last 2 constants are crawl speed and size)\n                    col *= 0.8 + 0.2 * sin(speed * time + pixel.y * lineWidth);\n\n                    //flickering (semi-randomized)\n                    col *= 1.0 - 0.07 * rand(vec2(time, tan(time)));\n\n                    gl_FragColor = vec4(col, 1.0);\n                }\n                ";

						var baw_v = " \n                  attribute vec2 a_position;\n                  uniform sampler2D u_image;\n                  varying vec2 f_texcoord;\n\n                  uniform vec2 u_resolution;\n                   \n                  void main(void){\n                    vec2 zeroToOne = a_position;\n                    vec2 zeroToTwo = zeroToOne * 2.0;\n                    vec2 clipSpace = zeroToTwo - 1.0;\n\n                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);\n                    f_texcoord = (clipSpace + 1.0) / 2.0;\n                  }\n                ";

						var baw_f = " \n                  precision mediump float;\n                  uniform sampler2D u_image;\n                  varying vec2 f_texcoord;\n                  uniform float amount;\n\n                  void main(void){\n                    vec2 texcoord = f_texcoord;\n                    vec3 col = texture2D(u_image, f_texcoord).rgb;\n                    float r = col.r;\n                    float g = col.g;\n                    float b = col.b;\n\n                    float avg = (r + g + b) / 3.0;\n\n                    float rr = r * (1.0 - amount) + avg * amount;\n                    float gg = g * (1.0 - amount) + avg * amount;\n                    float bb = b * (1.0 - amount) + avg * amount;\n\n                    col = vec3(rr, gg, bb);\n\n                    gl_FragColor = vec4(col, 1.0);\n                  }\n                ";

						var sepia_v = " \n                  attribute vec2 a_position;\n                  uniform sampler2D u_image;\n                  varying vec2 f_texcoord;\n\n                  uniform vec2 u_resolution;\n\n                   \n                  void main(void){\n                    vec2 zeroToOne = a_position;\n                    vec2 zeroToTwo = zeroToOne * 2.0;\n                    vec2 clipSpace = zeroToTwo - 1.0;\n\n                    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);\n                    f_texcoord = (clipSpace + 1.0) / 2.0;\n                  }\n                ";

						var sepia_f = " \n                  precision mediump float;\n                  uniform sampler2D u_image;\n                  varying vec2 f_texcoord;\n                  uniform float amount;\n\n                  void main(void){\n                    vec2 texcoord = f_texcoord;\n                    vec3 col = texture2D(u_image, f_texcoord).rgb;\n                    float r = col.r;\n                    float g = col.g;\n                    float b = col.b;\n\n                    float red = (r * 0.393) + (g * 0.769) + (b * 0.189);\n                    float green = (r * 0.349) + (g * 0.686) + (b * 0.168);\n                    float blue = (r * 0.272) + (g * 0.534) + (b * 0.131);\n\n                    float rr = r * (1.0 - amount) + red * amount;\n                    float gg = g * (1.0 - amount) + green * amount;\n                    float bb = b * (1.0 - amount) + blue * amount;\n\n                    col = vec3(rr, gg, bb);\n\n                    gl_FragColor = vec4(col, 1.0);\n                  }\n                ";

						this.graphics.shaderList.add("normal", new Shader(this.gl, normal_v, normal_f));
						this.graphics.shaderList.add("wave", new Shader(this.gl, wave_v, wave_f));
						this.graphics.shaderList.add("crt", new Shader(this.gl, crt_v, crt_f));
						this.graphics.shaderList.add("blackAndWhite", new Shader(this.gl, baw_v, baw_f));
						this.graphics.shaderList.add("sepia", new Shader(this.gl, sepia_v, sepia_f));

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

						this.graphics.crt();
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
								var ratio = this.size.x / this.size.y;
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
								this.scale *= this.gameScale;
								this.setSize(Math.floor(nWidth), Math.floor(nHeight));
								this.ctx.scale(this.scale, this.scale);
								this.gl.viewport(0, 0, nWidth, nHeight);
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
						if (width == 0 || height == 0) console.error("Width and Height can't be 0.");

						this.size.x = width;
						this.size.y = height;

						this.cvs.width = width;
						this.cvs.height = height;
						this.cvs.style.width = width;
						this.cvs.style.height = height;

						this.glcvs.width = width;
						this.glcvs.height = height;
						this.glcvs.style.width = width;
						this.glcvs.style.height = height;
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
		}, {
				key: "saveData",
				value: function saveData(key, value) {
						if (key == null || value == null) {
								console.error("Key or value can't be null.");
								return;
						}
						localStorage.setItem(key, value);
						return this.getData(key);
				}
		}, {
				key: "clearData",
				value: function clearData() {
						localStorage.clear();
				}
		}, {
				key: "getData",
				value: function getData(key) {
						if (key == null) {
								console.error("Key can't be null.");
								return;
						}
						return localStorage.getItem(key);
				}
		}]);

		return Game;
})();