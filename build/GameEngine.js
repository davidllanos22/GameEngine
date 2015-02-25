/*! GameEngine 2015-02-25 */
Camera = function(a, b) {
    this.setPosition = function(a, b, c) {
        var d = new Math.Vector2(a, b);
        c ? this.position.lerp(d, .01) : this.position = d, this.useLimit && (this.position.x < 0 && (this.position.x = 0), 
        this.position.y < 0 && (this.position.y = 0), this.position.x > this.limit.x && (this.position.x = this.limit.x), 
        this.position.y > this.limit.y && (this.position.y = this.limit.y)), this.rect.position = this.position;
    }, this.setRotation = function(a) {
        this.angle = a;
    }, this.shake = function(a, b) {
        if (!this.shaking) {
            var c = this, d = this.position.copy(), e = this.angle;
            this.shakeTimer = new Timer(a, !1, null, function() {
                var a = Math.randomRange(-b, b);
                c.setPosition(c.position.x - a, c.position.y - a, !1);
            }, function() {
                c.position = d, c.angle = e, c.shaking = !1;
            }), this.shakeTimer.start(), this.shaking = !0;
        }
    }, this.game = a, this.name = b, this.position = new Math.Vector2(0, 0), this.size = new Math.Vector2(a.width / 2 / a.gameScale, a.height / 2 / a.gameScale), 
    this.rect = new Rectangle(0, 0, this.size.x, this.size.y), this.angle = 0, this.shaking = !1, 
    this.limit = new Math.Vector2(0, 0), this.useLimit = !1;
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
    this.setPosition = function(a, b) {
        this.position.x = a, this.position.y = b;
    }, this.setSize = function(a, b) {
        this.size.x = a, this.size.y = b;
    }, this.collides = function(a) {
        return null != a ? this.position.x < a.position.x + a.size.x && this.position.x + this.size.x > a.position.x && this.position.y < a.position.y + a.size.y && this.position.y + this.size.y > a.position.y : void 0;
    }, this.collidesAt = function(a, b, c) {
        var d = this.copy();
        return d.position.x += b, d.position.y += c, d.collides(a);
    }, this.copy = function() {
        return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.x);
    }, this.position = new Math.Vector2(a, b), this.size = new Math.Vector2(c, d);
}, Font = function(a, b, c, d, e) {
    this.chars = b || "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ     0123456789      !?.;:,          ", 
    this.w = c || 16, this.h = d || 20, this.separation = e || 16, a ? this.img = a : (this.img = new Image(), 
    this.img.src = "data:image/png;base64,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"), 
    this.render = function(a, b, c, d) {
        for (var e = 0; e < this.chars.length; e++) if (this.chars.charAt(e) == a.toUpperCase()) {
            var f = e % 16, g = Math.floor(e / 16);
            d.imageSection(this.img, b, c, f, g, this.w, this.h, this.w, this.h);
        }
    };
}, Game = function(a, b, c) {
    var d = function(a) {
        a.loader = new Loader(), a.graphics = new Graphics(a), a.input = new Input(a), a.timerManager = new TimerManager(a);
        var b = new Scene(a, "Loading");
        b.render = function() {
            a.graphics.setClearColor("#0d4c57");
            var b = "Loading: " + a.loader.numResourcesLoaded + " of " + a.loader.numResources;
            a.graphics.print(b, a.getSize().x / 2 - 16 * b.length / 2, a.getSize().y / 2);
        }, a.currentScene = b, a.currentCamera = new Camera(a, "Default Camera"), a.loader.onFinish(function() {
            a.currentScene.changeScene(new Scene(a, "Default Scene")), a.graphics.setClearColor("#000"), 
            a.init(), originalWidth = w.x, j(a);
        }), t = new Date().getTime(), v = new Date(), e(a);
    }, e = function(a) {
        var b = new Date().getTime(), c = b - t, d = new Date();
        for (r = 1e3 / (d - v) | 0, v = d, s += Math.min(1, c / 1e3); s > u; ) s -= u, f(a);
        g(a), window.requestAnimationFrame(function() {
            e(a);
        });
    }, f = function(a) {
        a.loader.loaded || a.loader.check(), (!o || n) && (a.timerManager.update(), a.loader.loaded && a.update(), 
        a.currentScene.updateInternal(), a.input.gamepad && (a.input.gamepad = navigator.getGamepads && navigator.getGamepads()[0]), 
        a.input.mouseReset());
    }, g = function(a) {
        C ? (m.imageSmoothingEnabled = !1, m.webkitImageSmoothingEnabled = !1, m.mozImageSmoothingEnabled = !1, 
        m.msImageSmoothingEnabled = !1) : (m.imageSmoothingEnabled = !0, m.webkitImageSmoothingEnabled = !0, 
        m.mozImageSmoothingEnabled = !0, m.msImageSmoothingEnabled = !0), a.graphics.clear(), 
        a.graphics.renderCounter = 0, m.save(), m.scale(y, y), m.translate(Math.floor(-a.currentCamera.position.x), Math.floor(-a.currentCamera.position.y)), 
        m.rotate(a.currentCamera.angle * Math.PI / 180), a.currentScene.renderInternal(), 
        a.loader.loaded && a.render(), a.input.mouseRender(), m.restore(), o && !n && (a.graphics.rect(0, 0, a.getSize().x, a.getSize().y, "rgba(0,0,0,0.4)"), 
        a.graphics.print("- PAUSED - ", a.getSize().x / 2 - 80, a.getSize().y / 2 - 10)), 
        p && a.graphics.print("FPS: " + r, 8, 8);
    };
    this.init = function() {}, this.render = function() {}, this.update = function() {};
    var h = function(a) {
        n = !0, a.onFocus();
    }, i = function(a) {
        n = !1, a.onBlur();
    }, j = function(a) {
        if (x) a.setSize(window.innerWidth, window.innerHeight); else if (A) {
            B = w.x / w.y;
            var b = window.innerWidth / B, c = b / B;
            c > window.innerHeight && (c = window.innerHeight, b = c * B), c < window.innerHeight && (c = window.innerHeight, 
            b = c * B), b > window.innerWidth && (b = window.innerWidth, c = b / B), z = b / originalWidth, 
            z *= y, a.setSize(Math.floor(b), Math.floor(c)), m.scale(z, z);
        }
    };
    this.onFocus = function() {}, this.onBlur = function() {}, this.onResize = function() {}, 
    this.setSize = function(a, b) {
        (0 == a || 0 == b) && Utils.logErr("Width and Height can't be 0."), w.x = a, w.y = b, 
        l.width = a, l.height = b, l.style.width = a, l.style.height = b;
    }, this.setScale = function(a) {
        y = a > 0 ? a : 0;
    }, this.getScale = function() {
        return y;
    }, this.getSize = function() {
        var a = w.x / z / y, b = w.y / z / y;
        return new Math.Vector2(a, b);
    }, this.getFps = function() {
        return r;
    }, this.fillScreenWithRatio = function(a) {
        return null == a ? A : void (A = a);
    }, this.fillScreen = function(a) {
        return null == a ? x : void (x = a);
    }, this.showPauseWhenNotFocused = function(a) {
        return null == a ? o : void (o = a);
    }, this.showFps = function(a) {
        p = a;
    }, this.add = function(a) {
        this.currentScene.add(a);
    }, this.remove = function(a) {
        this.currentScene.remove(a);
    }, this.removeAll = function() {
        this.currentScene.removeAll();
    }, this.changeScene = function(a) {
        this.currentScene.changeScene(a);
    }, this.getCanvas = function() {
        return l;
    }, this.getContext = function() {
        return m;
    };
    var k = !1, l = document.createElement("canvas"), m = null;
    l.tabIndex = 1, l.style.outline = "none", k ? (this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl"), 
    console.log(this.gl), this.gl.canvas.width = 2 * a, this.gl.canvas.height = 2 * b, 
    this.gl.viewport(0, 0, a, b), this.gl.clearColor(1, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)) : m = l.getContext("2d"), 
    void 0 != c ? c.appendChild(this.cvs) : document.body.appendChild(l);
    var n = !0, o = !1;
    n && l.focus();
    var p = !1, q = 60, r = 0, s = 0, t = 0, u = 10 / q, v = 0, w = new Math.Vector2(a, b), x = !1, y = 1, z = 1, A = !1, B = 0, C = !0;
    this.setSize(a, b);
    var D = this;
    l.onfocus = function() {
        h(D);
    }, l.onblur = function() {
        i(D);
    }, window.onresize = function() {
        j(D);
    }, l.oncontextmenu = function(a) {
        a.preventDefault();
    }, d(this);
}, Graphics = function(a) {
    this.point = function(a, b, c) {
        this.setColor(c), this.ctx.fillRect(a, b, 1, 1), this.renderCounter++;
    }, this.line = function(a, b, c, d, e) {
        this.setColor(e), this.ctx.beginPath(), this.ctx.moveTo(a, b), this.ctx.lineTo(c, d), 
        this.ctx.stroke();
    }, this.rect = function(a, b, c, d, e) {
        this.setColor(e), this.ctx.fillRect(a, b, c, d), this.renderCounter++;
    }, this.circle = function(a, b, c, d) {
        this.setColor(d), this.ctx.beginPath(), this.ctx.arc(a, b, c, 0, 2 * Math.PI, !1), 
        this.ctx.fill();
    }, this.setClearColor = function(a) {
        this.clearColor = a;
    }, this.clear = function() {
        this.rect(0, 0, this.game.getSize().x * this.game.getScale(), this.game.getSize().y * this.game.getScale(), this.clearColor);
    }, this.print = function(a, b, c, d) {
        for (null != d && (this.ctx.save(), this.ctx.scale(this.game.getScale() - (this.game.getScale() - d), this.game.getScale() - (this.game.getScale() - d))), 
        i = 0; i < a.length; i++) this.font.render(a.charAt(i), b + this.font.separation * i, c, this);
        null != d && this.ctx.restore(), this.renderCounter++;
    }, this.setColor = function(a) {
        this.ctx.strokeStyle = a, this.ctx.fillStyle = a;
    }, this.setFont = function(a) {
        this.font = a;
    }, this.image = function(a, b, c) {
        b = Math.floor(b), c = Math.floor(c), this.ctx.drawImage(a, 0, 0, a.width, a.height, b, c, a.width, a.height), 
        this.renderCounter++;
    }, this.imageSection = function(a, b, c, d, e, f, g, h, i) {
        b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), e = Math.floor(e), h = Math.floor(h), 
        i = Math.floor(i), 0 > h && (h = 0), 0 > i && (i = 0), this.ctx.drawImage(a, d * f, e * g, f, g, b, c, h, i), 
        this.renderCounter++;
    }, this.imageSectionRot = function(a, b, c, d, e, f, g, h, i, j) {
        b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), e = Math.floor(e), h = Math.floor(h), 
        i = Math.floor(i), 0 > h && (h = 0), 0 > i && (i = 0), this.ctx.save(), this.ctx.translate(b + h / 2, c + i / 2), 
        this.ctx.rotate(j), this.ctx.drawImage(a, d * f, e * g, f, g, -h / 2, -i / 2, h, i), 
        this.ctx.restore(), this.renderCounter++;
    }, this.game = a, this.ctx = this.game.getContext(), this.renderCounter = 0, this.clearColor = "#000000", 
    this.font = new Font();
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
    this.onKeyDown = function(a) {
        this.keyDown[a.keyCode] = !0, 0 != this.keyJustDown[a.keyCode] && (this.keyJustDown[a.keyCode] = !0), 
        delete this.keyJustReleased[a.keyCode];
    }, this.onKeyUp = function(a) {
        0 != this.keyJustReleased[a.keyCode] && (this.keyJustReleased[a.keyCode] = !0), 
        delete this.keyDown[a.keyCode], delete this.keyJustDown[a.keyCode];
    }, this.check = function(a) {
        return this.keyDown[a];
    }, this.pressed = function(a) {
        return this.keyJustDown[a] ? (this.keyJustDown[a] = 0, !0) : !1;
    }, this.released = function(a) {
        return this.keyJustReleased[a] ? (this.keyJustReleased[a] = 0, !0) : !1;
    }, this.onMouseMove = function(a, b) {
        var c = this.game.getCanvas().getBoundingClientRect(), d = (b.clientX - c.left) / (c.right - c.left) * this.game.getSize().x, e = (b.clientY - c.top) / (c.bottom - c.top) * this.game.getSize().y;
        this.mouse.x = d, this.mouse.y = e;
    }, this.onMouseDown = function(a, b) {
        this.mouseClick[b.button] = !0, this.mouseHold[b.button] = !0;
    }, this.onMouseUp = function(a, b) {
        this.mouseRelease[b.button] = !0, this.mouseHold[b.button] = !1;
    }, this.mouseReset = function() {
        this.mouseClick = [ !1, !1, !1 ], this.mouseRelease = [ !1, !1, !1 ];
    }, this.mouseRender = function() {
        null != this.cursorImage && (this.cursorImage instanceof Image && this.game.graphics.image(this.input.cursorImage, this.game.input.mouse.x, this.game.input.mouse.y), 
        this.game.input.cursorImage instanceof Animation);
    }, this.setCursorStyle = function(a) {
        this.game.getCanvas().style.cursor = a;
    }, this.setCursorImage = function(a) {
        this.setCursorStyle("none"), this.cursorImage = a;
    }, this.game = a, this.cvs = a.getCanvas(), this.keyDown = {}, this.keyJustDown = {}, 
    this.keyJustReleased = {}, this.mouse = new Math.Vector2(0, 0), this.mouseClick = [ !1, !1, !1 ], 
    this.mouseRelease = [ !1, !1, !1 ], this.mouseHold = [ !1, !1, !1 ], this.cursorImage, 
    this.gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads, 
    this.gamepad = navigator.getGamepads && navigator.getGamepads()[0];
    var b = this;
    this.cvs.onkeydown = function(a) {
        b.onKeyDown(a);
    }, this.cvs.onkeyup = function(a) {
        b.onKeyUp(a);
    }, this.cvs.onmousemove = function(a) {
        b.onMouseMove(this, a);
    }, this.cvs.onmousedown = function(a) {
        b.onMouseDown(this, a);
    }, this.cvs.onmouseup = function(a) {
        b.onMouseUp(this, a);
    };
}, Loader = function() {
    this.loadImage = function(a) {
        var b = new Image();
        b.src = a + "?" + new Date().getTime();
        var c = this;
        return this.numResources++, b.onload = function() {
            console.log("Image loaded " + a), c.numResourcesLoaded++, c.check();
        }, b;
    }, this.loadSound = function(a) {
        var b = new Audio();
        b.src = a + "?" + new Date().getTime();
        var c = this;
        return this.numResources++, b.addEventListener("loadeddata", function() {
            console.log("Audio loaded " + a), c.numResourcesLoaded++, c.check();
        }, !1), b;
    }, this.loadData = function(a, b) {
        var c = new XMLHttpRequest();
        c.onreadystatechange = function() {
            4 == c.readyState && (console.log("Data loaded " + a), b(c.responseText));
        }, c.open("GET", a, !0), c.send();
    }, this.onFinish = function(a) {
        this.onFinish = a;
    }, this.check = function() {
        this.numResourcesLoaded == this.numResources && (this.loaded = !0, this.onFinish());
    }, this.resources = [], this.numResources = 0, this.numResourcesLoaded = 0, this.onFinish, 
    this.loaded = !1;
}, Scene = function(a, b) {
    this.init = function() {}, this.add = function(a) {
        a.game = this.game, this.childs.push(a);
    }, this.remove = function(a) {
        this.childs.splice(this.childs.indexOf(a), 1);
    }, this.removeAll = function() {
        for (var a = this.childs.length; a > 0; ) this.remove(this.childs[0]), a = this.childs.length;
    }, this.changeScene = function(a) {
        this.game.currentScene = a;
    }, this.renderInternal = function() {
        this.render();
        for (var a = 0; a < this.childs.length; a++) this.childs[a].render();
    }, this.updateInternal = function() {
        for (var a = 0; a < this.childs.length; a++) this.childs[a].update();
        this.ySorting && this.childs.sort(function(a, b) {
            return ay = Math.round(a.position.y), by = Math.round(b.position.y), ay == by ? 0 : ay - by;
        }), this.update();
    }, Entity.call(this, 0, 0, "Scene"), this.name = b, this.game = a, this.ySorting = !0, 
    this.init();
}, Scene.prototype = Object.create(Entity.prototype), Scene.prototype.constructor = Scene, 
TransitionScene = function(a, b) {
    this.render = function() {
        this.visible.renderInternal(), this.fadeIn.isRunning ? this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + this.fadeIn.time / this.time + ")") : this.game.graphics.rect(0, 0, this.game.getSize().x, this.game.getSize().y, "rgba(255,255,255," + (this.time - this.fadeOut.time) / this.time + ")");
    }, Scene.call(this, b.game, "Transition Scene");
    var c = this;
    this.from = a, this.to = b, this.visible = this.from, this.time = 300, this.fadeOut = new Timer(this.time, !1, null, null, function() {
        this.game.currentScene.changeScene(b);
    }), this.fadeIn = new Timer(this.time, !1, null, null, function() {
        c.visible = b, b.init(), c.fadeOut.start();
    }), this.fadeIn.start();
}, TransitionScene.prototype = Object.create(Scene.prototype), TransitionScene.prototype.constructor = TransitionScene, 
Animation = function(a, b, c, d) {
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
    this.add = function(a) {
        this.find(a) ? console.log("There is already an state with that name.") : this.states.push(a);
    }, this.remove = function(a) {
        this.find(a) ? this.states.splice(this.states.indexOf(a), 1) : console.log("No state with that name.");
    }, this.set = function(a) {
        this.find(a) ? (this.last = this.current, this.current = a) : console.log("No state with that name.");
    }, this.find = function(a) {
        for (var b = !1, c = 0; c < this.states.length && !b; ) this.states[c] == a && (b = !0), 
        c++;
        return b;
    }, this.states = [], this.current = "", this.last = "";
}, Timer = function(a, b, c, d, e) {
    this.start = function() {
        game.timerManager.add(this), this.reset();
    }, this.run = function() {
        (!this.done || this.repeat) && (-1 == this.time ? (null != this.onStart && this.onStart(), 
        this.time++) : this.time == this.duration ? (null != this.onFinish && this.onFinish(), 
        this.done = !0, this.isRunning = !1, this.repeat ? (this.count++, this.reset()) : game.timerManager.remove(this)) : (null != this.onTick && this.onTick(), 
        this.time++));
    }, this.reset = function() {
        this.time = -1, this.done = !1, this.isRunning = !0;
    }, this.pause = function() {
        this.isRunning = !1;
    }, this.unpause = function() {
        this.isRunning = !0;
    }, this.duration = a, this.isRunning = !1, this.repeat = b, this.onStart = c, this.onTick = d, 
    this.onFinish = e, this.game, this.time = -1, this.count = 0, this.done = !1;
}, TimerManager = function(a) {
    this.add = function(b) {
        -1 == this.timers.indexOf(b) && (b.game = a, this.timers.push(b));
    }, this.remove = function(a) {
        this.timers.splice(this.timers.indexOf(a), 1);
    }, this.update = function() {
        for (var a = 0; a < this.timers.length; a++) this.timers[a].isRunning && this.timers[a].run();
    }, this.game = a, this.timers = [];
}, Utils = {}, Utils.getScreenShoot = function(a) {
    var b = a.cvs.toDataURL();
    return window.open(b, "_blank"), b;
}, Utils.getBase64Image = function(a) {
    var b = document.createElement("canvas");
    b.width = a.width, b.height = a.height;
    var c = b.getContext("2d");
    return c.drawImage(a, 0, 0), b.toDataURL("image/png");
}, Utils.loopSound = function(a) {
    a.loop = !0, a = a.cloneNode(), a.play();
}, Utils.playSound = function(a) {
    a = a.cloneNode(), a.play();
};