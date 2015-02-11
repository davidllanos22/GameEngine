/*! GameEngine 2015-02-11 */
Camera = function(a, b) {
    this.game = a, this.name = b, this.position = new Math.Vector2(0, 0), this.size = new Math.Vector2(a.width / 2 / a.gameScale, a.height / 2 / a.gameScale), 
    this.rect = new Rectangle(0, 0, this.size.x, this.size.y), this.angle = 0, this.shaking = !1, 
    this.limit = new Math.Vector2(0, 0), this.useLimit = !1;
}, Camera.prototype.setPosition = function(a, b, c) {
    var d = new Math.Vector2(a, b);
    c ? this.position.lerp(d, .01) : this.position = d, this.useLimit && (this.position.x < 0 && (this.position.x = 0), 
    this.position.y < 0 && (this.position.y = 0), this.position.x > this.limit.x && (this.position.x = this.limit.x), 
    this.position.y > this.limit.y && (this.position.y = this.limit.y)), this.rect.position = this.position;
}, Camera.prototype.setRotation = function(a) {
    this.angle = a;
}, Camera.prototype.shake = function(a, b) {
    if (!this.shaking) {
        var c = this, d = this.position.copy(), e = this.angle;
        this.shakeTimer = new Timer(a, !1, null, function() {
            var a = Math.randomRange(-b, b);
            c.setPosition(c.position.x - a, c.position.y - a, !1);
        }, function() {
            c.position = d, c.angle = e, c.shaking = !1;
        }), this.shakeTimer.start(), this.shaking = !0;
    }
}, Entity = function(a, b, c) {
    this.position = new Math.Vector2(a, b), this.name = c, this.parent, this.sprite, 
    this.rect, this.childs = new Array(), this.game, this.init();
}, Entity.prototype = {
    init: function() {},
    setPosition: function(a, b) {
        this.position.x = a, this.position.y = b;
    },
    onScreen: function() {
        return null != this.rect ? this.rect.collides(game.currentCamera.rect) : void 0;
    },
    add: function() {},
    remove: function() {},
    remove: function() {},
    destroy: function() {
        this.game.currentScene.remove(this);
    },
    render: function() {},
    update: function() {}
}, Rectangle = function(a, b, c, d) {
    this.position = new Math.Vector2(a, b), this.size = new Math.Vector2(c, d);
}, Rectangle.prototype = {
    setPosition: function(a, b) {
        this.position.x = a, this.position.y = b;
    },
    setSize: function(a, b) {
        this.size.x = a, this.size.y = b;
    },
    collides: function(a) {
        return null != a ? this.position.x < a.position.x + a.size.x && this.position.x + this.size.x > a.position.x && this.position.y < a.position.y + a.size.y && this.position.y + this.size.y > a.position.y : void 0;
    },
    collidesAt: function(a, b, c) {
        var d = this.copy();
        return d.position.x += b, d.position.y += c, d.collides(a);
    },
    copy: function() {
        return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
    }
}, Font = function(a, b, c, d, e) {
    this.chars = b || "ABCDEFGHIJKLMNOPQRSTUVWXYZ  0123456789    !?.;:()       ", this.w = c || 14, 
    this.h = d || 14, this.separation = e || 12, a ? this.img = a : (this.img = new Image(), 
    this.img.src = "data:image/png;base64,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");
}, Font.prototype.render = function(a, b, c, d) {
    for (var e = 0; e < this.chars.length; e++) if (this.chars.charAt(e) == a.toUpperCase()) {
        var f = e % 14, g = Math.floor(e / 14);
        d.imageSection(this.img, b, c, f, g, this.w, this.h, this.w, this.h);
    }
}, Game = function(a, b, c) {
    this.useGL = !1, this.cvs = document.createElement("canvas"), this.cvs.tabIndex = 1, 
    this.cvs.style.outline = "none", this.useGL ? (this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl"), 
    console.log(this.gl), this.gl.canvas.width = 2 * a, this.gl.canvas.height = 2 * b, 
    this.gl.viewport(0, 0, a, b), this.gl.clearColor(1, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)) : this.ctx = this.cvs.getContext("2d"), 
    void 0 != c ? c.appendChild(this.cvs) : document.body.appendChild(this.cvs), this.focused = !0, 
    this.showPauseWhenNotFocused = !1, this.focused && this.cvs.focus(), this.showFps = !1, 
    this.fillScreen = !1, this.gameScale = 1, this.scale = 1, this.fillScreenWithRatio = !1, 
    this.ratio = 0, this.pixelart = !0, this.setSize(a, b);
    var d = this;
    this.cvs.onfocus = function() {
        d.onFocusInternal();
    }, this.cvs.onblur = function() {
        d.onBlurInternal();
    }, window.onresize = function() {
        d.onResizeInternal();
    }, this.cvs.oncontextmenu = function(a) {
        a.preventDefault();
    }, this.initInternal();
}, Game.prototype = {
    initInternal: function() {
        var a = this;
        this.loader = new Loader(), this.graphics = new Graphics(this), this.input = new Input(this), 
        this.timerManager = new TimerManager(this);
        var b = new Scene(this, "Loading");
        b.render = function() {
            a.graphics.print("Loading: " + a.loader.numResourcesLoaded + "/" + a.loader.numResources, a.width / 2, a.height / 2);
        }, this.currentScene = b, this.currentCamera = new Camera(this, "Default Camera"), 
        this.loader.loadAll(function() {
            a.currentScene.changeScene(new Scene(a, "Default Scene")), a.init(), a.originalWidth = a.width, 
            a.onResizeInternal();
        }), this.desiredFps = 60, this.dt = 0, this.start = new Date().getTime(), this.step = 10 / this.desiredFps, 
        this.lastLoop = new Date(), this.loop(this);
    },
    loop: function(a) {
        var b = new Date().getTime(), c = b - a.start;
        for (a.start = c, this.thisLoop = new Date(), this.fps = 0 | Math.round(1e3 / (this.thisLoop - this.lastLoop)), 
        this.lastLoop = this.thisLoop, a.dt += Math.min(1, c / 1e3); a.dt > a.step; ) a.dt -= a.step, 
        a.updateInternal();
        a.renderInternal(), window.requestAnimationFrame(function() {
            a.loop(a);
        });
    },
    updateInternal: function() {
        this.loader.loaded || this.loader.check(), (!this.showPauseWhenNotFocused || this.focused) && (this.timerManager.update(), 
        this.loader.loaded && this.update(), this.currentScene.updateInternal(), this.input.gamepad && (this.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0]), 
        this.input.mouseReset());
    },
    renderInternal: function() {
        this.pixelart ? (this.ctx.imageSmoothingEnabled = !1, this.ctx.webkitImageSmoothingEnabled = !1, 
        this.ctx.mozImageSmoothingEnabled = !1, this.ctx.msImageSmoothingEnabled = !1) : (this.ctx.imageSmoothingEnabled = !0, 
        this.ctx.webkitImageSmoothingEnabled = !0, this.ctx.mozImageSmoothingEnabled = !0, 
        this.ctx.msImageSmoothingEnabled = !0), this.graphics.clear(), this.graphics.renderCounter = 0, 
        this.ctx.save(), this.ctx.scale(this.gameScale, this.gameScale), this.ctx.translate(Math.floor(-this.currentCamera.position.x), Math.floor(-this.currentCamera.position.y)), 
        this.ctx.rotate(this.currentCamera.angle * Math.PI / 180), this.currentScene.renderInternal(), 
        this.loader.loaded && this.render(), this.input.mouseRender(), this.ctx.restore(), 
        this.showPauseWhenNotFocused && !this.focused && (this.graphics.rect(0, 0, this.width, this.height, "rgba(0,0,0,0.8)"), 
        this.graphics.print("- PAUSED - ", (this.width / 2 - 40) / this.scale, (this.height / 2 - 20) / this.scale, 20, "white")), 
        this.showFps && this.graphics.print("FPS: " + Math.round(this.fps), 8, 8, 20, "white");
    },
    init: function() {},
    render: function() {},
    update: function() {},
    onFocusInternal: function() {
        this.focused = !0, this.onFocus();
    },
    onBlurInternal: function() {
        this.focused = !1, this.onBlur();
    },
    onResizeInternal: function() {
        if (this.fillScreen) this.setSize(window.innerWidth, window.innerHeight); else if (this.fillScreenWithRatio) {
            this.ratio = this.width / this.height;
            var a = window.innerWidth / this.ratio, b = a / this.ratio;
            b > window.innerHeight && (b = window.innerHeight, a = b * this.ratio), b < window.innerHeight && (b = window.innerHeight, 
            a = b * this.ratio), a > window.innerWidth && (a = window.innerWidth, b = a / this.ratio), 
            this.scale = a / this.originalWidth, this.scale *= this.gameScale, this.setSize(Math.floor(a), Math.floor(b)), 
            this.ctx.scale(this.scale, this.scale);
        }
    },
    onFocus: function() {},
    onBlur: function() {},
    onResize: function() {},
    setSize: function(a, b) {
        (0 == a || 0 == b) && Utils.logErr("Width and Height can't be 0."), this.width = a, 
        this.height = b, this.cvs.width = this.width, this.cvs.height = this.height, this.cvs.style.width = this.width, 
        this.cvs.style.height = this.height;
    }
}, Graphics = function(a) {
    this.game = a, this.ctx = this.game.ctx, this.renderCounter = 0, this.clearColor = "#000000", 
    this.font = new Font();
}, Graphics.prototype = {
    point: function(a, b, c) {
        this.ctx.fillStyle = c, this.ctx.fillRect(a, b, 1, 1), this.renderCounter++;
    },
    line: function(a, b, c, d, e) {
        this.ctx.strokeStyle = e, this.ctx.beginPath(), this.ctx.moveTo(a, b), this.ctx.lineTo(c, d), 
        this.ctx.stroke();
    },
    rect: function(a, b, c, d, e) {
        this.ctx.fillStyle = e, this.ctx.fillRect(a, b, c, d), this.renderCounter++;
    },
    circle: function(a, b, c, d) {
        this.ctx.fillStyle = d, this.ctx.beginPath(), this.ctx.arc(a, b, c, 0, 2 * Math.PI, !1), 
        this.ctx.fill();
    },
    setClearColor: function(a) {
        this.clearColor = a;
    },
    clear: function() {
        this.rect(0, 0, this.game.width / this.game.scale, this.game.height / this.game.scale, this.clearColor);
    },
    print: function(a, b, c) {
        for (i = 0; i < a.length; i++) this.font.render(a.charAt(i), b + this.font.separation * i, c, this.game.graphics);
        this.renderCounter++;
    },
    setFont: function(a) {
        this.font = a;
    },
    image: function(a, b, c) {
        b = Math.floor(b), c = Math.floor(c), this.ctx.drawImage(a, 0, 0, a.width, a.height, b, c, a.width, a.height), 
        this.renderCounter++;
    },
    imageSection: function(a, b, c, d, e, f, g, h, i) {
        b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), e = Math.floor(e), h = Math.floor(h), 
        i = Math.floor(i), 0 > h && (h = 0), 0 > i && (i = 0), this.ctx.drawImage(a, d * f, e * g, f, g, b, c, h, i), 
        this.renderCounter++;
    },
    imageSectionRot: function(a, b, c, d, e, f, g, h, i, j) {
        b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), e = Math.floor(e), h = Math.floor(h), 
        i = Math.floor(i), 0 > h && (h = 0), 0 > i && (i = 0), this.ctx.save(), this.ctx.translate(b + h / 2, c + i / 2), 
        this.ctx.rotate(j), this.ctx.drawImage(a, d * f, e * g, f, g, -h / 2, -i / 2, h, i), 
        this.ctx.restore(), this.renderCounter++;
    }
}, Keys = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    NUM_0: 48,
    NUM_1: 49,
    NUM_2: 50,
    NUM_3: 51,
    NUM_4: 52,
    NUM_5: 53,
    NUM_6: 54,
    NUM_7: 55,
    NUM_8: 56,
    NUM_9: 57,
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
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
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
}, Input = function(a) {
    this.game = a, this.keyDown = {}, this.keyJustDown = {}, this.keyJustReleased = {}, 
    this.mouse = new Math.Vector2(0, 0), this.mouseClick = [ !1, !1, !1 ], this.mouseRelease = [ !1, !1, !1 ], 
    this.mouseHold = [ !1, !1, !1 ], this.cursorImage, this.gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads, 
    this.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
    var b = this;
    this.game.cvs.onkeydown = function(a) {
        b.onKeyDown(a);
    }, this.game.cvs.onkeyup = function(a) {
        b.onKeyUp(a);
    }, this.game.cvs.onmousemove = function(a) {
        b.onMouseMove(this, a);
    }, this.game.cvs.onmousedown = function(a) {
        b.onMouseDown(this, a);
    }, this.game.cvs.onmouseup = function(a) {
        b.onMouseUp(this, a);
    };
}, Input.prototype = {
    onKeyDown: function(a) {
        this.keyDown[a.keyCode] = !0, 0 != this.keyJustDown[a.keyCode] && (this.keyJustDown[a.keyCode] = !0), 
        delete this.keyJustReleased[a.keyCode];
    },
    onKeyUp: function(a) {
        0 != this.keyJustReleased[a.keyCode] && (this.keyJustReleased[a.keyCode] = !0), 
        delete this.keyDown[a.keyCode], delete this.keyJustDown[a.keyCode];
    },
    check: function(a) {
        return this.keyDown[a];
    },
    pressed: function(a) {
        return this.keyJustDown[a] ? (this.keyJustDown[a] = 0, !0) : !1;
    },
    released: function(a) {
        return this.keyJustReleased[a] ? (this.keyJustReleased[a] = 0, !0) : !1;
    },
    onMouseMove: function(a, b) {
        var c = this.game.cvs.getBoundingClientRect();
        this.mouse.x = Math.round((b.clientX - c.left) / (c.right - c.left) * this.game.cvs.width / this.game.scale) / this.game.gameScale, 
        this.mouse.y = Math.round((b.clientY - c.top) / (c.bottom - c.top) * this.game.cvs.height / this.game.scale) / this.game.gameScale;
    },
    onMouseDown: function(a, b) {
        this.mouseClick[b.button] = !0, this.mouseHold[b.button] = !0;
    },
    onMouseUp: function(a, b) {
        this.mouseRelease[b.button] = !0, this.mouseHold[b.button] = !1;
    },
    mouseReset: function() {
        this.mouseClick = [ !1, !1, !1 ], this.mouseRelease = [ !1, !1, !1 ];
    },
    mouseRender: function() {
        null != this.cursorImage && (this.cursorImage instanceof Image && this.game.graphics.image(this.input.cursorImage, this.game.input.mouse.x, this.game.input.mouse.y), 
        this.game.input.cursorImage instanceof Animation);
    },
    setCursorStyle: function(a) {
        this.game.cvs.style.cursor = a;
    },
    setCursorImage: function(a) {
        this.setCursorStyle("none"), this.cursorImage = a;
    }
}, Resource = function() {
    this.url, this.type;
}, Loader = function() {
    this.resources = [], this.numResources = 0, this.numResourcesLoaded = 0, this.onFinish, 
    this.loaded = !1;
}, Loader.prototype = {
    loadImage: function(a) {
        var b = new Image();
        b.src = a + "?" + new Date().getTime();
        var c = this;
        return this.numResources++, b.onload = function() {
            Utils.logLoad("Image loaded " + a), c.numResourcesLoaded++, c.check();
        }, b;
    },
    loadSound: function(a) {
        var b = new Audio();
        b.src = a + "?" + new Date().getTime();
        var c = this;
        return this.numResources++, b.addEventListener("loadeddata", function() {
            Utils.logLoad("Audio loaded " + a), c.numResourcesLoaded++, c.check();
        }, !1), b;
    },
    loadData: function(a, b) {
        Utils.logLoad("Loading Data " + a);
        var c = new XMLHttpRequest();
        c.onreadystatechange = function() {
            4 == c.readyState && b(c.responseText);
        }, c.open("GET", a, !0), c.send();
    },
    loadAll: function(a) {
        this.onFinish = a;
    },
    check: function() {
        this.numResourcesLoaded == this.numResources && (this.loaded = !0, this.onFinish());
    }
}, Scene = function(a, b) {
    Entity.call(this, 0, 0, "Scene"), this.name = b, this.game = a, this.ySorting = !0, 
    this.init();
}, Scene.prototype = Object.create(Entity.prototype), Scene.prototype.constructor = Scene, 
Scene.prototype.init = function() {}, Scene.prototype.add = function(a) {
    a.game = this.game, this.childs.push(a);
}, Scene.prototype.remove = function(a) {
    this.childs.splice(this.childs.indexOf(a), 1);
}, Scene.prototype.renderInternal = function() {
    this.render();
    for (var a = 0; a < this.childs.length; a++) this.childs[a].render();
}, Scene.prototype.updateInternal = function() {
    for (var a = 0; a < this.childs.length; a++) this.childs[a].update();
    this.ySorting && this.childs.sort(function(a, b) {
        return ay = Math.round(a.position.y), by = Math.round(b.position.y), ay == by ? 0 : ay - by;
    }), this.update();
}, Scene.prototype.changeScene = function(a) {
    this.game.currentScene = a;
}, TransitionScene = function(a, b) {
    Scene.call(this, b.game, "Transition Scene");
    var c = this;
    this.from = a, this.to = b, this.visible = this.from, this.time = 300, this.fadeOut = new Timer(this.time, !1, null, null, function() {
        this.game.currentScene.changeScene(b);
    }), this.fadeIn = new Timer(this.time, !1, null, null, function() {
        c.visible = b, b.init(), c.fadeOut.start();
    }), this.fadeIn.start();
}, TransitionScene.prototype = Object.create(Scene.prototype), TransitionScene.prototype.constructor = TransitionScene, 
TransitionScene.prototype.render = function() {
    this.visible.renderInternal(), this.fadeIn.isRunning ? this.game.graphics.rect(0, 0, this.game.width / this.game.scale, this.game.height / this.game.scale, "rgba(255,255,255," + this.fadeIn.count / this.time + ")") : this.game.graphics.rect(0, 0, this.game.width / this.game.scale, this.game.height / this.game.scale, "rgba(255,255,255," + (this.time - this.fadeOut.count) / this.time + ")");
}, Animation = function(a, b, c, d) {
    this.frames = d, this.w = b, this.h = c;
    var e = this;
    this.actualFrame = 0, this.timer = new Timer(a, !0, null, null, function() {
        e.actualFrame == e.frames.length - 1 ? e.actualFrame = 0 : e.actualFrame++;
    }), this.timer.start();
}, Animation.prototype = {
    render: function(a, b, c, d, e) {
        game.graphics.imageSection(a, b, c, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], this.w, this.h, d, e);
    }
}, Math.lerp = function(a, b, c) {
    return (b - a) * c;
}, Math.randomTo = function(a) {
    return Math.floor(Math.random() * (a + 1));
}, Math.randomRange = function(a, b) {
    return Math.randomTo(b - a) + a;
}, Math.Vector2 = function(a, b) {
    this.x = a, this.y = b;
}, Math.Vector2.prototype = {
    set: function(a, b) {
        this.x = a, this.y = b;
    },
    add: function(a) {
        return this.x += a.x, this.y += a.y, this;
    },
    addX: function(a) {
        return this.x += a, this;
    },
    addY: function(a) {
        return this.y += a, this;
    },
    subtract: function(a) {
        return this.x -= a.x, this.y -= a.y, this;
    },
    subtractX: function(a) {
        return this.x -= a, this;
    },
    subtractY: function(a) {
        return this.y -= a, this;
    },
    lerp: function(a, b) {
        return this.x += Math.lerp(this.x, a.x, b), this.y += Math.lerp(this.y, a.y, b), 
        this;
    },
    angleBetween: function(a) {
        return Math.atan2(a.y - this.y, a.x - this.x);
    },
    distance: function(a) {
        var b = this.x - a.x, c = this.y - a.y;
        return Math.sqrt(b * b + c * c);
    },
    copy: function() {
        return new Math.Vector2(this.x, this.y);
    }
}, StateMachine = function() {
    this.states = [], this.current = "", this.last = "", this.add = function(a) {
        this.find(a) ? console.log("There is already an state with that name.") : this.states.push(a);
    }, this.remove = function(a) {
        this.find(a) ? this.states.splice(this.states.indexOf(a), 1) : console.log("No state with that name.");
    }, this.set = function(a) {
        this.find(a) ? (this.last = this.current, this.current = a) : console.log("No state with that name.");
    }, this.find = function(a) {
        for (var b = !1, c = 0; c < this.states.length && !b; ) this.states[c] == a && (b = !0), 
        c++;
        return b;
    };
}, Timer = function(a, b, c, d, e) {
    this.time = a, this.isRunning = !1, this.repeat = b, this.onStart = c, this.onTick = d, 
    this.onFinish = e, this.game, this.count = -1, this.done = !1;
}, Timer.prototype = {
    start: function() {
        game.timerManager.add(this), this.reset();
    },
    run: function() {
        (!this.done || this.repeat) && (-1 == this.count ? (null != this.onStart && this.onStart(), 
        this.count++) : this.count == this.time ? (null != this.onFinish && this.onFinish(), 
        this.done = !0, this.isRunning = !1, this.repeat ? this.reset() : game.timerManager.remove(this)) : (null != this.onTick && this.onTick(), 
        this.count++));
    },
    reset: function() {
        this.count = -1, this.done = !1, this.isRunning = !0;
    },
    pause: function() {
        this.isRunning = !1;
    },
    unpause: function() {
        this.isRunning = !0;
    }
}, TimerManager = function(a) {
    this.game = a, this.timers = [];
}, TimerManager.prototype = {
    add: function(a) {
        -1 == this.timers.indexOf(a) && (a.game = game, this.timers.push(a));
    },
    remove: function(a) {
        this.timers.splice(this.timers.indexOf(a), 1);
    },
    update: function() {
        for (var a = 0; a < this.timers.length; a++) this.timers[a].isRunning && this.timers[a].run();
    }
}, Utils = {}, Utils.getScreenShoot = function(a) {
    var b = a.cvs.toDataURL();
    return window.open(b, "_blank"), b;
}, Utils.getBase64Image = function(a) {
    var b = document.createElement("canvas");
    b.width = a.width, b.height = a.height;
    var c = canvas.getContext("2d");
    return c.drawImage(a, 0, 0), b.toDataURL("image/png");
}, Utils.log = function(a) {
    console.log({
        message: a,
        caller: this,
        stack: arguments.callee.caller.toString()
    });
}, Utils.logLoad = function(a) {
    console.log("%c [GAME ENGINE - LOADER]: " + a, "color: #10DD10");
}, Utils.logErr = function(a) {
    throw new Error("[GAME ENGINE - ERROR]: " + a);
}, Utils.logObj = function(a) {
    console.log(a);
}, Utils.loopSound = function(a) {
    a.loop = !0, a = a.cloneNode(), a.play();
}, Utils.playSound = function(a) {
    a = a.cloneNode(), a.play();
};