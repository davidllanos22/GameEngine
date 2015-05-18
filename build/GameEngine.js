"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _inherits(subClass, superClass) {
    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), superClass && (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Camera = function() {
    function Camera(game, name) {
        _classCallCheck(this, Camera), this.game = game, this.name = name, this.position = new Math.Vector2(0, 0), 
        this.size = new Math.Vector2(game.width / 2 / game.gameScale, game.height / 2 / game.gameScale), 
        this.rect = new Rectangle(0, 0, this.size.x, this.size.y), this.angle = 0, this.shaking = !1, 
        this.limit = new Math.Vector2(0, 0), this.useLimit = !1;
    }
    return _createClass(Camera, [ {
        key: "setPosition",
        value: function(x, y, lerp) {
            var newPos = new Math.Vector2(x, y);
            lerp ? this.position.lerp(newPos, .01) : this.position = newPos, this.useLimit && (this.position.x < 0 && (this.position.x = 0), 
            this.position.y < 0 && (this.position.y = 0), this.position.x > this.limit.x && (this.position.x = this.limit.x), 
            this.position.y > this.limit.y && (this.position.y = this.limit.y)), this.rect.position = this.position;
        }
    }, {
        key: "setRotation",
        value: function(angle) {
            this.angle = angle;
        }
    }, {
        key: "shake",
        value: function(time, intensity) {
            if (!this.shaking) {
                var self = this, originalPos = this.position.copy(), originalAngle = this.angle;
                this.shakeTimer = new Timer(time, !1, null, function() {
                    var r = Math.randomRange(-intensity, intensity);
                    self.setPosition(self.position.x - r, self.position.y - r, !1);
                }, function() {
                    self.position = originalPos, self.angle = originalAngle, self.shaking = !1;
                }), this.shakeTimer.start(), this.shaking = !0;
            }
        }
    } ]), Camera;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Entity = function() {
    function Entity(x, y, name) {
        _classCallCheck(this, Entity), this.position = new Math.Vector2(x, y), this.name = name, 
        this.parent, this.sprite, this.rect, this.childs = new Array(), this.game, this.init();
    }
    return _createClass(Entity, [ {
        key: "init",
        value: function() {}
    }, {
        key: "setPosition",
        value: function(x, y) {
            this.position.x = x, this.position.y = y;
        }
    }, {
        key: "onScreen",
        value: function() {
            return null != this.rect ? this.rect.collides(game.currentCamera.rect) : void 0;
        }
    }, {
        key: "add",
        value: function() {}
    }, {
        key: "remove",
        value: function() {}
    }, {
        key: "destroy",
        value: function() {
            this.game.currentScene.remove(this);
        }
    }, {
        key: "render",
        value: function() {}
    }, {
        key: "update",
        value: function() {}
    } ]), Entity;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Rectangle = function() {
    function Rectangle(x, y, w, h) {
        _classCallCheck(this, Rectangle), this.position = new Math.Vector2(x, y), this.size = new Math.Vector2(w, h);
    }
    return _createClass(Rectangle, [ {
        key: "setPosition",
        value: function(x, y) {
            this.position.x = x, this.position.y = y;
        }
    }, {
        key: "setSize",
        value: function(w, h) {
            this.size.x = w, this.size.y = h;
        }
    }, {
        key: "collides",
        value: function(rect) {
            return null != rect ? this.position.x < rect.position.x + rect.size.x && this.position.x + this.size.x > rect.position.x && this.position.y < rect.position.y + rect.size.y && this.position.y + this.size.y > rect.position.y : void 0;
        }
    }, {
        key: "collidesAt",
        value: function(rect, xx, yy) {
            var rectMod = this.copy();
            return rectMod.position.addX(xx), rectMod.position.addY(yy), rectMod.collides(rect);
        }
    }, {
        key: "copy",
        value: function() {
            return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
        }
    } ]), Rectangle;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Font = function() {
    function Font(img, chars, w, h, separation) {
        _classCallCheck(this, Font), this.chars = chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZ      0123456789      !?.;:,-         ", 
        this.w = w || 16, this.h = h || 20, this.separation = separation || 16, img ? this.img = img : (this.img = new Image(), 
        this.img.src = "data:image/png;base64,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");
    }
    return _createClass(Font, [ {
        key: "render",
        value: function(char, x, y, g) {
            for (var i = 0; i < this.chars.length; i++) if (this.chars.charAt(i) == char.toUpperCase()) {
                var xx = i % 16, yy = Math.floor(i / 16);
                g.imageSection(this.img, x, y, xx, yy, this.w, this.h, this.w, this.h);
            }
        }
    } ]), Font;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Game = function() {
    function Game(width, height, element) {
        var _this = this;
        _classCallCheck(this, Game);
        var useGL = !1;
        this.cvs = document.createElement("canvas"), this.ctx = null, this.cvs.tabIndex = 1, 
        this.cvs.style.outline = "none", useGL ? (this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl"), 
        console.log(this.gl), this.gl.canvas.width = 2 * width, this.gl.canvas.height = 2 * height, 
        this.gl.viewport(0, 0, width, height), this.gl.clearColor(1, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)) : this.ctx = this.cvs.getContext("2d"), 
        void 0 != element ? element.appendChild(this.cvs) : document.body.appendChild(this.cvs), 
        this.focused = !0, this.showPauseWhenNotFocused = !1, this.focused && this.cvs.focus(), 
        this.showFps = !1, this.desiredFps = 60, this.fps = 0, this.dt = 0, this.start = 0, 
        this.step = 10 / this.desiredFps, this.lastLoop = 0, this.size = new Math.Vector2(width, height), 
        this.fillScreen = !1, this.gameScale = 1, this.scale = 1, this.fillScreenWithRatio = !1, 
        this.ratio = 0, this.pixelart = !0, this.setSize(width, height), this.cvs.onfocus = function() {
            _this.onFocusInternal();
        }, this.cvs.onblur = function() {
            _this.onBlurInternal();
        }, window.onresize = function() {
            _this.onResizeInternal();
        }, this.cvs.oncontextmenu = function(e) {
            e.preventDefault();
        }, this.initInternal();
    }
    return _createClass(Game, [ {
        key: "initInternal",
        value: function() {
            var _this2 = this;
            this.loader = new Loader(), this.graphics = new Graphics(this), this.input = new Input(this), 
            this.timerManager = new TimerManager(this);
            var loadingScreen = new Scene(this, "Loading");
            loadingScreen.render = function() {
                _this2.graphics.setClearColor("#0d4c57");
                var string = "Loading: " + _this2.loader.numResourcesLoaded + " of " + _this2.loader.numResources;
                _this2.graphics.print(string, _this2.getSize().x / 2 - 16 * string.length / 2, _this2.getSize().y / 2);
            }, this.currentScene = loadingScreen, this.currentCamera = new Camera(this, "Default Camera"), 
            this.loader.onFinish(function() {
                _this2.currentScene.changeScene(new Scene(_this2, "Default Scene")), _this2.graphics.setClearColor("#000"), 
                _this2.init(), _this2.originalWidth = _this2.size.x, _this2.onResizeInternal();
            }), this.start = new Date().getTime(), this.lastLoop = new Date(), this.loop();
        }
    }, {
        key: "loop",
        value: function() {
            var _this3 = this, now = new Date().getTime(), elapsed = now - this.start, thisLoop = new Date();
            for (this.fps = 1e3 / (thisLoop - this.lastLoop) | 0, this.lastLoop = thisLoop, 
            this.dt += Math.min(1, elapsed / 1e3); this.dt > this.step; ) this.dt -= this.step, 
            this.updateInternal();
            this.renderInternal(), window.requestAnimationFrame(function() {
                _this3.loop();
            });
        }
    }, {
        key: "updateInternal",
        value: function() {
            this.loader.loaded || this.loader.check(), (!this.showPauseWhenNotFocused || this.focused) && (this.timerManager.update(), 
            this.loader.loaded && game.update(), this.currentScene.updateInternal(), this.input.gamepad && (this.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0]), 
            this.input.mouseReset());
        }
    }, {
        key: "renderInternal",
        value: function() {
            this.pixelart ? (this.ctx.imageSmoothingEnabled = !1, this.ctx.mozImageSmoothingEnabled = !1, 
            this.ctx.msImageSmoothingEnabled = !1) : (this.ctx.imageSmoothingEnabled = !0, this.ctx.mozImageSmoothingEnabled = !0, 
            this.ctx.msImageSmoothingEnabled = !0), this.graphics.clear(), this.graphics.renderCounter = 0, 
            this.ctx.save(), this.ctx.scale(this.gameScale, this.gameScale), this.ctx.translate(Math.floor(-this.currentCamera.position.x), Math.floor(-this.currentCamera.position.y)), 
            this.ctx.rotate(this.currentCamera.angle * Math.PI / 180), this.currentScene.renderInternal(), 
            this.loader.loaded && this.render(), this.ctx.restore(), this.showPauseWhenNotFocused && !this.focused && (this.graphics.rect(0, 0, this.getSize().x, this.getSize().y, "rgba(0,0,0,0.4)"), 
            this.graphics.print("- PAUSED - ", this.getSize().x / 2 - 80, this.getSize().y / 2 - 10)), 
            this.showFps && this.graphics.print("FPS: " + this.fps, 8, 8);
        }
    }, {
        key: "init",
        value: function() {}
    }, {
        key: "render",
        value: function() {}
    }, {
        key: "update",
        value: function() {}
    }, {
        key: "onFocusInternal",
        value: function() {
            this.focused = !0, this.onFocus();
        }
    }, {
        key: "onBlurInternal",
        value: function() {
            this.focused = !1, this.onBlur();
        }
    }, {
        key: "onResizeInternal",
        value: function() {
            if (this.fillScreen) this.setSize(window.innerWidth, window.innerHeight); else if (this.fillScreenWithRatio) {
                ratio = size.x / size.y;
                var nWidth = window.innerWidth / ratio, nHeight = nWidth / ratio;
                nHeight > window.innerHeight && (nHeight = window.innerHeight, nWidth = nHeight * ratio), 
                nHeight < window.innerHeight && (nHeight = window.innerHeight, nWidth = nHeight * ratio), 
                nWidth > window.innerWidth && (nWidth = window.innerWidth, nHeight = nWidth / ratio), 
                this.scale = nWidth / this.originalWidth, this.scale *= gameScale, this.setSize(Math.floor(nWidth), Math.floor(nHeight)), 
                this.ctx.scale(scale, scale);
            }
        }
    }, {
        key: "onFocus",
        value: function() {}
    }, {
        key: "onBlur",
        value: function() {}
    }, {
        key: "onResize",
        value: function() {}
    }, {
        key: "setSize",
        value: function(width, height) {
            (0 == width || 0 == height) && Utils.logErr("Width and Height can't be 0."), this.size.x = width, 
            this.size.y = height, this.cvs.width = width, this.cvs.height = height, this.cvs.style.width = width, 
            this.cvs.style.height = height;
        }
    }, {
        key: "setScale",
        value: function(s) {
            this.gameScale = s > 0 ? s : 0;
        }
    }, {
        key: "getScale",
        value: function() {
            return this.gameScale;
        }
    }, {
        key: "getSize",
        value: function() {
            var xx = this.size.x / this.scale / this.gameScale, yy = this.size.y / this.scale / this.gameScale;
            return new Math.Vector2(xx, yy);
        }
    }, {
        key: "getFps",
        value: function() {
            return this.fps;
        }
    }, {
        key: "fillScreenWithRatio",
        value: function(_fillScreenWithRatio) {
            function fillScreenWithRatio() {
                return _fillScreenWithRatio.apply(this, arguments);
            }
            return fillScreenWithRatio.toString = function() {
                return _fillScreenWithRatio.toString();
            }, fillScreenWithRatio;
        }(function(e) {
            return null == e ? fillScreenWithRatio : void (fillScreenWithRatio = e);
        })
    }, {
        key: "fillScreen",
        value: function(_fillScreen) {
            function fillScreen() {
                return _fillScreen.apply(this, arguments);
            }
            return fillScreen.toString = function() {
                return _fillScreen.toString();
            }, fillScreen;
        }(function(e) {
            return null == e ? fillScreen : void (fillScreen = e);
        })
    }, {
        key: "showPauseWhenNotFocused",
        value: function(_showPauseWhenNotFocused) {
            function showPauseWhenNotFocused() {
                return _showPauseWhenNotFocused.apply(this, arguments);
            }
            return showPauseWhenNotFocused.toString = function() {
                return _showPauseWhenNotFocused.toString();
            }, showPauseWhenNotFocused;
        }(function(e) {
            return null == e ? showPauseWhenNotFocused : void (showPauseWhenNotFocused = e);
        })
    }, {
        key: "showFps",
        value: function(_showFps) {
            function showFps() {
                return _showFps.apply(this, arguments);
            }
            return showFps.toString = function() {
                return _showFps.toString();
            }, showFps;
        }(function(e) {
            showFps = e;
        })
    }, {
        key: "add",
        value: function(child) {
            this.currentScene.add(child);
        }
    }, {
        key: "remove",
        value: function(child) {
            this.currentScene.remove(child);
        }
    }, {
        key: "removeAll",
        value: function() {
            this.currentScene.removeAll();
        }
    }, {
        key: "changeScene",
        value: function(scene) {
            this.currentScene.changeScene(scene);
        }
    }, {
        key: "getCanvas",
        value: function() {
            return this.cvs;
        }
    }, {
        key: "getContext",
        value: function() {
            return this.ctx;
        }
    } ]), Game;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Graphics = function() {
    function Graphics(game) {
        _classCallCheck(this, Graphics), this.game = game, this.ctx = this.game.getContext(), 
        this.renderCounter = 0, this.clearColor = "#000000", this.font = new Font();
    }
    return _createClass(Graphics, [ {
        key: "point",
        value: function(x, y, color) {
            this.setColor(color), this.ctx.fillRect(x, y, 1, 1), this.renderCounter++;
        }
    }, {
        key: "line",
        value: function(x0, y0, x1, y1, color) {
            this.setColor(color), this.ctx.beginPath(), this.ctx.moveTo(x0, y0), this.ctx.lineTo(x1, y1), 
            this.ctx.stroke();
        }
    }, {
        key: "rect",
        value: function(x, y, w, h, color) {
            this.setColor(color), this.ctx.fillRect(x, y, w, h), this.renderCounter++;
        }
    }, {
        key: "circle",
        value: function(x, y, r, color) {
            this.setColor(color), this.ctx.beginPath(), this.ctx.arc(x, y, r, 0, 2 * Math.PI, !1), 
            this.ctx.fill();
        }
    }, {
        key: "setClearColor",
        value: function(color) {
            this.clearColor = color;
        }
    }, {
        key: "clear",
        value: function() {
            this.rect(0, 0, this.game.getSize().x * this.game.getScale(), this.game.getSize().y * this.game.getScale(), this.clearColor);
        }
    }, {
        key: "print",
        value: function(text, x, y, scale) {
            null != scale && (this.ctx.save(), this.ctx.scale(this.game.getScale() - (this.game.getScale() - scale), this.game.getScale() - (this.game.getScale() - scale)));
            for (var i = 0; i < text.length; i++) this.font.render(text.charAt(i), x + this.font.separation * i, y, this);
            null != scale && this.ctx.restore(), this.renderCounter++;
        }
    }, {
        key: "setColor",
        value: function(color) {
            this.ctx.strokeStyle = color, this.ctx.fillStyle = color;
        }
    }, {
        key: "setFont",
        value: function(newFont) {
            this.font = newFont;
        }
    }, {
        key: "image",
        value: function(src, x, y) {
            x = Math.floor(x), y = Math.floor(y), this.ctx.drawImage(src, 0, 0, src.width, src.height, x, y, src.width, src.height), 
            this.renderCounter++;
        }
    }, {
        key: "imageSection",
        value: function(src, x, y, xx, yy, sw, sh, w, h) {
            x = Math.floor(x), y = Math.floor(y), xx = Math.floor(xx), yy = Math.floor(yy), 
            w = Math.floor(w), h = Math.floor(h), 0 > w && (w = 0), 0 > h && (h = 0), this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, x, y, w, h), 
            this.renderCounter++;
        }
    }, {
        key: "imageSectionRot",
        value: function(src, x, y, xx, yy, sw, sh, w, h, rot) {
            x = Math.floor(x), y = Math.floor(y), xx = Math.floor(xx), yy = Math.floor(yy), 
            w = Math.floor(w), h = Math.floor(h), 0 > w && (w = 0), 0 > h && (h = 0), this.ctx.save(), 
            this.ctx.translate(x + w / 2, y + h / 2), this.ctx.rotate(rot), this.ctx.drawImage(src, xx * sw, yy * sh, sw, sh, -w / 2, -h / 2, w, h), 
            this.ctx.restore(), this.renderCounter++;
        }
    } ]), Graphics;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Keys = {
    NONE: -2,
    ANY: -1,
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPSLOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINTSCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    NUM0: 48,
    NUM1: 49,
    NUM2: 50,
    NUM3: 51,
    NUM4: 52,
    NUM5: 53,
    NUM6: 54,
    NUM7: 55,
    NUM8: 56,
    NUM9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    NUMZERO: 96,
    NUMONE: 97,
    NUMTWO: 98,
    NUMTHREE: 99,
    NUMFOUR: 100,
    NUMFIVE: 101,
    NUMSIX: 102,
    NUMSEVEN: 103,
    NUMEIGHT: 104,
    NUMNINE: 105,
    NUMMULTIPLY: 106,
    NUMPLUS: 107,
    NUMMINUS: 109,
    NUMPERIOD: 110,
    NUMDIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    PLUS: 187,
    MINUS: 189
}, Mouse = {
    NONE: -2,
    ANY: -1,
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
}, Input = function() {
    function Input(game) {
        var _this = this;
        _classCallCheck(this, Input), this.game = game, this.cvs = game.cvs, this.keyC = {}, 
        this.keyP = {}, this.keyR = {}, this.m = new Math.Vector2(0, 0), this.mp = [ !1, !1, !1 ], 
        this.mr = [ !1, !1, !1 ], this.mc = [ !1, !1, !1 ], this.mouseWheel = 0, this.cvs.onkeydown = function(e) {
            _this.onkeyDown(e);
        }, this.cvs.onkeyup = function(e) {
            _this.onKeyUp(e);
        }, this.cvs.onmousemove = function(e) {
            _this.onMouseMove(e);
        }, this.cvs.onmousedown = function(e) {
            _this.onMouseDown(e);
        }, this.cvs.onmouseup = function(e) {
            _this.onMouseUp(e);
        }, this.cvs.onmousewheel = function(e) {
            _this.onMouseWheel(e);
        };
    }
    return _createClass(Input, [ {
        key: "onkeyDown",
        value: function(e) {
            this.keyC[e.keyCode] = !0, 0 != this.keyP[e.keyCode] && (this.keyP[e.keyCode] = !0), 
            delete this.keyR[e.keyCode];
        }
    }, {
        key: "onKeyUp",
        value: function(e) {
            0 != this.keyR[e.keyCode] && (this.keyR[e.keyCode] = !0), delete this.keyC[e.keyCode], 
            delete this.keyP[e.keyCode];
        }
    }, {
        key: "onMouseMove",
        value: function(e) {
            var rect = this.cvs.getBoundingClientRect(), xx = (e.clientX - rect.left) / (rect.right - rect.left) * this.game.getSize().x, yy = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.game.getSize().y;
            this.m.set(Math.floor(xx), Math.floor(yy));
        }
    }, {
        key: "onMouseDown",
        value: function(e) {
            this.mp[e.button] = !0, this.mc[e.button] = !0;
        }
    }, {
        key: "onMouseUp",
        value: function(e) {
            this.mr[e.button] = !0, this.mc[e.button] = !1;
        }
    }, {
        key: "onMouseWheel",
        value: function(e) {
            this.mouseWheel = e.wheelDelta;
        }
    }, {
        key: "mouseCheck",
        value: function(button) {
            if (button == Mouse.NONE) {
                for (var pressed = !1, i = 0; i < this.mc.length; i++) this.mc[i] && (pressed = this.mc[i]);
                return !pressed;
            }
            if (button == Mouse.ANY) {
                for (var pressed = !1, i = 0; i < this.mc.length && !pressed; ) pressed = this.mc[i], 
                i++;
                return pressed;
            }
            return this.mc[button];
        }
    }, {
        key: "mousePressed",
        value: function(button) {
            if (button == Mouse.NONE) return console.warn("Please, use mc(Mouse.NONE) instead."), 
            !0;
            if (button == Mouse.ANY) {
                for (var pressed = !1, i = 0; i < this.mp.length && !pressed; ) pressed = this.mp[i], 
                i++;
                return pressed;
            }
            return this.mp[button];
        }
    }, {
        key: "mouseReleased",
        value: function(button) {
            if (button == Mouse.NONE) return console.warn("Please, use mc(Mouse.NONE) instead."), 
            !0;
            if (button == Mouse.ANY) {
                for (var pressed = !1, i = 0; i < this.mr.length && !pressed; ) pressed = this.mr[i], 
                i++;
                return pressed;
            }
            return this.mr[button];
        }
    }, {
        key: "mouseWheelUp",
        value: function() {
            return this.mouseWheel > 0;
        }
    }, {
        key: "mouseWheelDown",
        value: function() {
            return this.mouseWheel < 0;
        }
    }, {
        key: "mouse",
        value: function() {
            return this.m;
        }
    }, {
        key: "keyCheck",
        value: function(key) {
            return key == Keys.NONE ? 0 == Object.keys(this.keyC).length : key == Keys.ANY ? Object.keys(this.keyC).length > 0 : this.keyC[key];
        }
    }, {
        key: "keyPressed",
        value: function(key) {
            return key == Keys.NONE ? 0 == Object.keys(this.keyP).length : key == Keys.ANY ? Object.keys(this.keyP).length > 0 : this.keyP[key] ? (this.keyP[key] = 0, 
            !0) : !1;
        }
    }, {
        key: "keyReleased",
        value: function(key) {
            return key == Keys.NONE ? 0 == Object.keys(this.keyR).length : key == Keys.ANY ? Object.keys(this.keyR).length > 0 : this.keyR[key] ? (this.keyR[key] = 0, 
            !0) : !1;
        }
    }, {
        key: "mouseReset",
        value: function() {
            this.mp = [ !1, !1, !1 ], this.mr = [ !1, !1, !1 ], this.mouseWheel = 0;
        }
    }, {
        key: "setCursorStyle",
        value: function(a) {
            this.cvs.style.cursor = a;
        }
    } ]), Input;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Loader = function() {
    function Loader() {
        _classCallCheck(this, Loader), this.resources = [], this.numResources = 0, this.numResourcesLoaded = 0, 
        this.onFinish, this.loaded = !1;
    }
    return _createClass(Loader, [ {
        key: "loadImage",
        value: function(url) {
            var _this = this, img = new Image();
            return img.src = url + "?" + new Date().getTime(), this.numResources++, img.onload = function() {
                console.log("Image loaded " + url), _this.numResourcesLoaded++, _this.check();
            }, img;
        }
    }, {
        key: "loadSound",
        value: function(url) {
            var _this2 = this, audio = new Audio();
            return audio.src = url + "?" + new Date().getTime(), this.numResources++, audio.addEventListener("loadeddata", function() {
                console.log("Audio loaded " + url), _this2.numResourcesLoaded++, _this2.check();
            }, !1), audio;
        }
    }, {
        key: "loadData",
        value: function(url, callback) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                4 == req.readyState && (console.log("Data loaded " + url), callback(req.responseText));
            }, req.open("GET", url, !0), req.send();
        }
    }, {
        key: "onFinish",
        value: function(_onFinish) {
            this.onFinish = _onFinish;
        }
    }, {
        key: "check",
        value: function() {
            this.numResourcesLoaded == this.numResources && (this.loaded = !0, this.onFinish());
        }
    } ]), Loader;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), _get = function(_x, _x2, _x3) {
    for (var _again = !0; _again; ) {
        var object = _x, property = _x2, receiver = _x3;
        desc = parent = getter = void 0, _again = !1;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (void 0 !== desc) {
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            return void 0 === getter ? void 0 : getter.call(receiver);
        }
        var parent = Object.getPrototypeOf(object);
        if (null === parent) return void 0;
        _x = parent, _x2 = property, _x3 = receiver, _again = !0;
    }
}, Scene = function(_Entity) {
    function Scene(game, name) {
        _classCallCheck(this, Scene), _get(Object.getPrototypeOf(Scene.prototype), "constructor", this).call(this, 0, 0, "Scene"), 
        this.name = name, this.game = game, this.ySorting = !0, this.init();
    }
    return _inherits(Scene, _Entity), _createClass(Scene, [ {
        key: "add",
        value: function(child) {
            child.game = this.game, this.childs.push(child);
        }
    }, {
        key: "remove",
        value: function(child) {
            this.childs.splice(this.childs.indexOf(child), 1);
        }
    }, {
        key: "removeAll",
        value: function() {
            for (var l = this.childs.length; l > 0; ) this.remove(this.childs[0]), l = this.childs.length;
        }
    }, {
        key: "changeScene",
        value: function(scene) {
            this.game.currentScene = scene;
        }
    }, {
        key: "renderInternal",
        value: function() {
            this.render();
            for (var i = 0; i < this.childs.length; i++) this.childs[i].render();
        }
    }, {
        key: "updateInternal",
        value: function() {
            this.ySorting && this.childs.sort(function(a, b) {
                var ay = Math.ceil(a.position.y), by = Math.ceil(b.position.y);
                return ay - by;
            });
            for (var i = 0; i < this.childs.length; i++) this.childs[i].update();
            this.update();
        }
    } ]), Scene;
}(Entity), TransitionScene = function(_Scene) {
    function TransitionScene(game, from, to) {
        var _this = this;
        _classCallCheck(this, TransitionScene), _get(Object.getPrototypeOf(TransitionScene.prototype), "constructor", this).call(this, game, "Transition"), 
        this.from = from, this.to = to, this.visible = this.from, this.time = 300, this.fadeOut = new Timer(game, this.time, !1, null, null, function() {
            _this.game.currentScene.changeScene(_this.to);
        }), this.fadeIn = new Timer(game, this.time, !1, null, null, function() {
            _this.visible = to, _this.to.init(), _this.fadeOut.start();
        }), this.fadeIn.start();
    }
    return _inherits(TransitionScene, _Scene), _createClass(TransitionScene, [ {
        key: "render",
        value: function() {
            this.visible.renderInternal(), this.fadeIn.isRunning ? this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + this.fadeIn.time / this.time + ")") : this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + (this.time - this.fadeOut.time) / this.time + ")");
        }
    } ]), TransitionScene;
}(Scene), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Animation = function() {
    function Animation(game, time, w, h, frames) {
        var _this = this;
        _classCallCheck(this, Animation), this.game = game, this.frames = frames, this.w = w, 
        this.h = h, this.actualFrame = 0, this.timer = new Timer(time, !0, null, null, function() {
            _this.actualFrame == _this.frames.length - 1 ? _this.actualFrame = 0 : _this.actualFrame++;
        }), this.timer.start();
    }
    return _createClass(Animation, [ {
        key: "render",
        value: function(src, x, y, w, h, a) {
            this.game.graphics.imageSectionRot(src, x, y, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], this.w, this.h, w, h, a);
        }
    } ]), Animation;
}();

Math.lerp = function(from, to, time) {
    return (to - from) * time;
}, Math.randomTo = function(x) {
    return Math.floor(Math.random() * (x + 1));
}, Math.randomRange = function(min, max) {
    return Math.randomTo(max - min) + min;
}, Math.Vector2 = function(x, y) {
    void 0 == x && void 0 == y && (x = 0, y = 0), this.x = x, this.y = y, this.set = function(x, y) {
        this.x = x, this.y = y;
    }, this.add = function(vector) {
        return this.x += vector.x, this.y += vector.y, this;
    }, this.addX = function(x) {
        return this.x += x, this;
    }, this.addY = function(y) {
        return this.y += y, this;
    }, this.subtract = function(vector) {
        return this.x -= vector.x, this.y -= vector.y, this;
    }, this.subtractX = function(x) {
        return this.x -= x, this;
    }, this.subtractY = function(y) {
        return this.y -= y, this;
    }, this.reverse = function() {
        return this.x = -this.x, this.y = -this.y, this;
    }, this.dotProduct = function(vector) {
        return this.x * vector.x + this.y * vector.y;
    }, this.crossProduct = function(vector) {
        return this.x * vector.y - this.y * vector.x;
    }, this.lerp = function(vector, time) {
        return this.x += Math.lerp(this.x, vector.x, time), this.y += Math.lerp(this.y, vector.y, time), 
        this;
    }, this.angleBetween = function(vector) {
        return Math.atan2(vector.y - this.y, vector.x - this.x);
    }, this.distance = function(vector) {
        var xx = this.x - vector.x, yy = this.y - vector.y;
        return Math.sqrt(xx * xx + yy * yy);
    }, this.copy = function() {
        return new Math.Vector2(this.x, this.y);
    };
};

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Timer = function() {
    function Timer(game, duration, repeat, onStart, onTick, onFinish) {
        _classCallCheck(this, Timer), this.game = game, this.duration = duration, this.isRunning = !1, 
        this.repeat = repeat, this.onStart = onStart, this.onTick = onTick, this.onFinish = onFinish, 
        this.game, this.time = -1, this.count = 0, this.done = !1;
    }
    return _createClass(Timer, [ {
        key: "start",
        value: function() {
            this.game.timerManager.add(this), this.reset();
        }
    }, {
        key: "run",
        value: function() {
            (!this.done || this.repeat) && (-1 == this.time ? (null != this.onStart && this.onStart(), 
            this.time++) : this.time == this.duration ? (null != this.onFinish && this.onFinish(), 
            this.done = !0, this.isRunning = !1, this.repeat ? (this.count++, this.reset()) : this.game.timerManager.remove(this)) : (null != this.onTick && this.onTick(), 
            this.time++));
        }
    }, {
        key: "reset",
        value: function() {
            this.time = -1, this.done = !1, this.isRunning = !0;
        }
    }, {
        key: "pause",
        value: function() {
            this.isRunning = !1;
        }
    }, {
        key: "unpause",
        value: function() {
            this.isRunning = !0;
        }
    } ]), Timer;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), TimerManager = function() {
    function TimerManager(game) {
        _classCallCheck(this, TimerManager), this.game = game, this.timers = [];
    }
    return _createClass(TimerManager, [ {
        key: "add",
        value: function(timer) {
            -1 == this.timers.indexOf(timer) && (timer.game = game, this.timers.push(timer));
        }
    }, {
        key: "remove",
        value: function(timer) {
            this.timers.splice(this.timers.indexOf(timer), 1);
        }
    }, {
        key: "update",
        value: function() {
            for (var i = 0; i < this.timers.length; i++) this.timers[i].isRunning && this.timers[i].run();
        }
    } ]), TimerManager;
}(), _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), Utils = function() {
    function Utils() {
        _classCallCheck(this, Utils);
    }
    return _createClass(Utils, null, [ {
        key: "getScreenShoot",
        value: function(game) {
            var data = game.getCanvas().toDataURL();
            return window.open(data, "_blank"), data;
        }
    }, {
        key: "getBase64Image",
        value: function(img) {
            var cvs = document.createElement("canvas");
            cvs.width = img.width, cvs.height = img.height;
            var ctx = cvs.getContext("2d");
            return ctx.drawImage(img, 0, 0), cvs.toDataURL("image/png");
        }
    }, {
        key: "playSound",
        value: function(sound) {
            sound = sound.cloneNode(), sound.play();
        }
    }, {
        key: "stopSound",
        value: function() {}
    }, {
        key: "loopSound",
        value: function(sound) {
            sound.loop = !0, sound = sound.cloneNode(), sound.play();
        }
    } ]), Utils;
}();