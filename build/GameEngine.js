/*! GameEngine 2015-01-28 */
Camera = function(a, b) {
    this.game = a, this.name = b, this.position = new Math.Vector2(0, 0), this.size = new Math.Vector2(a.width / 2 / a.gameScale, a.height / 2 / a.gameScale), 
    this.rect = new Rectangle(0, 0, this.size.x, this.size.y), this.angle = 0, this.shaking = !1;
}, Camera.prototype.setPosition = function(a, b, c) {
    var d = new Math.Vector2(a, b);
    c ? this.position.lerp(d, .01) : this.position = d, this.rect.position = this.position;
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
        return this.rect.collides(game.currentCamera.rect);
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
        return this.position.x < a.position.x + a.size.x && this.position.x + this.size.x > a.position.x && this.position.y < a.position.y + a.size.y && this.position.y + this.size.y > a.position.y;
    }
}, Font = function() {
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ  0123456789    !?.;:()       ", this.size = 14, 
    this.separation = 12, this.img = new Image(), this.img.src = "data:image/png;base64,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";
}, Font.prototype.render = function(a, b, c, d) {
    for (var e = 0; e < this.chars.length; e++) if (this.chars.charAt(e) == a.toUpperCase()) {
        var f = e % 14, g = Math.floor(e / 14);
        d.imageSection(this.img, b, c, f, g, this.size, this.size);
    }
}, Game = function(a, b, c) {
    this.useGL = !1, this.cvs = document.createElement("canvas"), this.cvs.tabIndex = 1, 
    this.cvs.style.outline = "none", this.useGL ? (this.gl = this.cvs.getContext("experimental-webgl") || this.cvs.getContext("webgl"), 
    console.log(this.gl), this.gl.canvas.width = 2 * a, this.gl.canvas.height = 2 * b, 
    this.gl.viewport(0, 0, a, b), this.gl.clearColor(1, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)) : this.ctx = this.cvs.getContext("2d"), 
    void 0 != c ? c.appendChild(this.cvs) : document.body.appendChild(this.cvs), this.focused = !0, 
    this.showPauseWhenNotFocused = !1, this.focused && this.cvs.focus(), this.meter = new FPSMeter({
        position: "absolute",
        width: 100,
        theme: "transparent"
    }), this.meter.hide(), this.showFps = !1, this.fillScreen = !1, this.gameScale = 1, 
    this.scale = 1, this.fillScreenWithRatio = !1, this.ratio = 0, this.pixelart = !0, 
    this.setSize(a, b);
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
        this.initDone = !1, this.loader = new Loader(), this.graphics = new Graphics(this), 
        this.input = new Input(this), this.timerManager = new TimerManager(this), this.currentScene = new Scene(this, "Default Scene"), 
        this.currentCamera = new Camera(this, "Default Camera"), this.fps = 60, this.dt = 0, 
        this.start = new Date().getTime(), this.step = 10 / this.fps, this.loop(this);
    },
    loop: function(a) {
        this.meter.tickStart();
        var b = new Date().getTime(), c = b - a.start;
        for (a.start = c, a.dt += Math.min(1, c / 1e3); a.dt > a.step; ) a.dt -= a.step, 
        a.updateInternal();
        a.renderInternal(), this.meter.tick(), window.requestAnimationFrame(function() {
            a.loop(a);
        });
    },
    updateInternal: function() {
        this.initDone || (this.initDone = !0, this.init(), this.originalWidth = this.width, 
        this.onResizeInternal()), (!this.showPauseWhenNotFocused || this.focused) && (this.timerManager.update(), 
        this.currentScene.updateInternal(), this.update()), this.input.mouseClick = [ !1, !1, !1 ], 
        this.input.mouseRelease = [ !1, !1, !1 ];
    },
    renderInternal: function() {
        this.pixelart ? (this.ctx.imageSmoothingEnabled = !1, this.ctx.webkitImageSmoothingEnabled = !1, 
        this.ctx.mozImageSmoothingEnabled = !1, this.ctx.msImageSmoothingEnabled = !1) : (this.ctx.imageSmoothingEnabled = !0, 
        this.ctx.webkitImageSmoothingEnabled = !0, this.ctx.mozImageSmoothingEnabled = !0, 
        this.ctx.msImageSmoothingEnabled = !0), this.graphics.clear(), this.graphics.renderCounter = 0, 
        this.ctx.save(), this.ctx.scale(this.gameScale, this.gameScale), this.ctx.translate(Math.floor(-this.currentCamera.position.x), Math.floor(-this.currentCamera.position.y)), 
        this.ctx.rotate(this.currentCamera.angle * Math.PI / 180), this.currentScene.renderInternal(), 
        this.render(), this.ctx.restore(), this.showPauseWhenNotFocused && !this.focused && (this.graphics.rect(0, 0, this.width, this.height, "rgba(0,0,0,0.8)"), 
        this.graphics.print("- PAUSED - ", (this.width / 2 - 40) / this.scale, (this.height / 2 - 20) / this.scale, 20, "white")), 
        this.showFps && this.graphics.print("FPS: " + Math.round(this.meter.fps), 8, 8, 20, "white");
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
    rect: function(a, b, c, d, e) {
        a = Math.floor(a), b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), this.ctx.fillStyle = e, 
        this.ctx.fillRect(a, b, c, d), this.renderCounter++;
    },
    setClearColor: function(a) {
        this.clearColor = a;
    },
    clear: function() {
        this.rect(0, 0, this.game.width, this.game.height, this.clearColor);
    },
    print: function(a, b, c, d, e) {
        for (this.ctx.fillStyle = e, i = 0; i < a.length; i++) this.font.render(a.charAt(i), b + this.font.separation * i, c, game.graphics);
        this.renderCounter++;
    },
    image: function(a, b, c) {
        b = Math.floor(b), c = Math.floor(c), this.ctx.drawImage(a, 0, 0, a.width, a.height, b, c, a.width, a.height), 
        this.renderCounter++;
    },
    imageSection: function(a, b, c, d, e, f, g) {
        b = Math.floor(b), c = Math.floor(c), d = Math.floor(d), e = Math.floor(e), f = Math.floor(f), 
        g = Math.floor(g), this.ctx.drawImage(a, d * f, e * g, f, g, b, c, f, g), this.renderCounter++;
    },
    imageRot: function(a, b, c, d, e, f, g) {
        this.ctx.save(), this.ctx.translate(b + f / 2, c + f / 2), this.ctx.rotate(g), this.ctx.drawImage(a, d * f, e * f, f, f, -f / 2, -f / 2, f, f), 
        this.ctx.restore(), this.renderCounter++;
    }
}, Keys = {
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
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
}, Input = function(a) {
    this.game = a, this.keyDown = {}, this.keyJustDown = {}, this.keyJustReleased = {}, 
    this.mouse = new Math.Vector2(0, 0), this.mouseClick = [ !1, !1, !1 ], this.mouseRelease = [ !1, !1, !1 ], 
    this.mouseHold = [ !1, !1, !1 ];
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
        this.mouse.x = Math.round((b.clientX - c.left) / (c.right - c.left) * this.game.cvs.width / this.game.scale), 
        this.mouse.y = Math.round((b.clientY - c.top) / (c.bottom - c.top) * this.game.cvs.height / this.game.scale);
    },
    onMouseDown: function(a, b) {
        this.mouseClick[b.button] = !0, this.mouseHold[b.button] = !0;
    },
    onMouseUp: function(a, b) {
        this.mouseRelease[b.button] = !0, this.mouseHold[b.button] = !1;
    }
}, Resource = function() {
    this.url, this.type;
}, Loader = function() {
    this.resources = [];
}, Loader.prototype = {
    loadImage: function(a) {
        Utils.logLoad("Loading Image " + a);
        var b = new Image();
        return b.src = a + "?" + new Date().getTime(), b;
    },
    loadSound: function(a) {
        Utils.logLoad("Loading Sound " + a);
        var b = new Audio();
        return b.src = a + "?" + new Date().getTime(), b;
    },
    loadData: function(a) {
        return Utils.logLoad("Loading Data " + a), 1;
    },
    loadAll: function() {}
}, Scene = function(a, b) {
    Entity.call(this, 0, 0, "Scene"), this.name = b, this.game = a, this.ySorting = !0;
}, Scene.prototype = Object.create(Entity.prototype), Scene.prototype.constructor = Scene, 
Scene.prototype.add = function(a) {
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
    this.from = a, this.to = b, this.visible = this.from, this.time = 200, this.fadeOut = new Timer(this.time, !1, null, null, function() {
        this.game.currentScene.changeScene(b);
    }), this.fadeIn = new Timer(this.time, !1, null, null, function() {
        c.visible = b, b.init(), c.fadeOut.start();
    }), this.fadeIn.start();
}, TransitionScene.prototype = Object.create(Scene.prototype), TransitionScene.prototype.constructor = TransitionScene, 
TransitionScene.prototype.render = function() {
    this.visible.renderInternal(), this.fadeIn.isRunning ? this.game.graphics.rect(0, 0, game.width, game.height, "rgba(255,255,255," + this.fadeIn.count / this.time + ")") : this.game.graphics.rect(0, 0, game.width, game.height, "rgba(255,255,255," + (this.time - this.fadeOut.count) / this.time + ")");
}, Animation = function(a, b) {
    this.frames = b;
    var c = this;
    this.actualFrame = 0, this.timer = new Timer(a, !0, null, null, function() {
        c.actualFrame == c.frames.length - 1 ? c.actualFrame = 0 : c.actualFrame++;
    }), this.timer.start();
}, Animation.prototype = {
    render: function(a, b, c, d, e) {
        game.graphics.imageSection(a, b, c, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], d, e);
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
    add: function(a) {
        return this.x += a.x, this.y += a.y, this;
    },
    addX: function(a) {
        return this.x += a.x, this;
    },
    addY: function(a) {
        return this.y += a.y, this;
    },
    subtract: function(a) {
        return this.x -= a.x, this.y -= a.y, this;
    },
    subtractX: function(a) {
        return this.x -= a.x, this;
    },
    subtractY: function(a) {
        return this.y -= a.y, this;
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
    },
    toString: function() {
        return "x: " + this.x + " y: " + this.y;
    }
}, Timer = function(a, b, c, d, e) {
    this.time = a, this.isRunning = !1, this.repeat = b, this.onStart = c, this.onTick = d, 
    this.onFinish = e, this.game, this.count = -1, this.done = !1;
}, Timer.prototype = {
    start: function() {
        this.count = -1, this.done = !1, game.timerManager.add(this), this.isRunning = !0;
    },
    run: function() {
        (!this.done || this.repeat) && (-1 == this.count ? (null != this.onStart && this.onStart(), 
        this.count++) : this.count == this.time ? (null != this.onFinish && this.onFinish(), 
        this.done = !0, this.isRunning = !1, this.repeat ? this.count = -1 : game.timerManager.remove(this)) : (null != this.onTick && this.onTick(), 
        this.count++));
    }
}, TimerManager = function(a) {
    this.game = a, this.timers = [];
}, TimerManager.prototype = {
    add: function(a) {
        a.game = game, this.timers.push(a);
    },
    remove: function(a) {
        this.timers.splice(this.timers.indexOf(a), 1);
    },
    update: function() {
        for (var a = 0; a < this.timers.length; a++) this.timers[a].run();
    }
}, Utils = {}, Utils.log = function(a) {
    console.log("%c [GAME ENGINE - LOG]: " + a, "color: #1010DD");
}, Utils.logLoad = function(a) {
    console.log("%c [GAME ENGINE - LOADER]: " + a, "color: #10DD10");
}, Utils.logErr = function(a) {
    throw new Error("[GAME ENGINE - ERROR]: " + a);
}, Utils.logObj = function(a) {
    console.log(a);
}, Utils.playSound = function(a) {
    a = a.cloneNode(), a.play();
}, function(a, b) {
    function c(a, b) {
        for (var c in b) try {
            a.style[c] = b[c];
        } catch (d) {}
        return a;
    }
    function d(a) {
        return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof a;
    }
    function e(a, b) {
        if ("array" !== d(b)) return -1;
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0, e = b.length; e > c; c++) if (b[c] === a) return c;
        return -1;
    }
    function f() {
        var a, b = arguments;
        for (a in b[1]) if (b[1].hasOwnProperty(a)) switch (d(b[1][a])) {
          case "object":
            b[0][a] = f({}, b[0][a], b[1][a]);
            break;

          case "array":
            b[0][a] = b[1][a].slice(0);
            break;

          default:
            b[0][a] = b[1][a];
        }
        return 2 < b.length ? f.apply(null, [ b[0] ].concat(Array.prototype.slice.call(b, 2))) : b[0];
    }
    function g(a) {
        return a = Math.round(255 * a).toString(16), 1 === a.length ? "0" + a : a;
    }
    function h(a, b, c, d) {
        a.addEventListener ? a[d ? "removeEventListener" : "addEventListener"](b, c, !1) : a.attachEvent && a[d ? "detachEvent" : "attachEvent"]("on" + b, c);
    }
    function i(a, k) {
        function n(a, b, c, d) {
            return y[0 | a][Math.round(Math.min((b - c) / (d - c) * K, K))];
        }
        function o() {
            I.legend.fps !== S && (I.legend.fps = S, I.legend[q] = S ? "FPS" : "ms"), D = S ? G.fps : G.duration, 
            I.count[q] = D > 999 ? "999+" : D.toFixed(D > 99 ? 0 : H.decimals);
        }
        function p() {
            for (z = j(), P < z - H.threshold && (G.fps -= G.fps / Math.max(1, 60 * H.smoothing / H.interval), 
            G.duration = 1e3 / G.fps), E = H.history; E--; ) Q[E] = 0 === E ? G.fps : Q[E - 1], 
            R[E] = 0 === E ? G.duration : R[E - 1];
            if (o(), H.heat) {
                if (L.length) for (E = L.length; E--; ) L[E].el.style[x[L[E].name].heatOn] = S ? n(x[L[E].name].heatmap, G.fps, 0, H.maxFps) : n(x[L[E].name].heatmap, G.duration, H.threshold, 0);
                if (I.graph && x.column.heatOn) for (E = J.length; E--; ) J[E].style[x.column.heatOn] = S ? n(x.column.heatmap, Q[E], 0, H.maxFps) : n(x.column.heatmap, R[E], H.threshold, 0);
            }
            if (I.graph) for (F = 0; F < H.history; F++) J[F].style.height = (S ? Q[F] ? Math.round(C / H.maxFps * Math.min(Q[F], H.maxFps)) : 0 : R[F] ? Math.round(C / H.threshold * Math.min(R[F], H.threshold)) : 0) + "px";
        }
        function t() {
            20 > H.interval ? (A = m(t), p()) : (A = setTimeout(t, H.interval), B = m(p));
        }
        function u(a) {
            a = a || window.event, a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, 
            a.cancelBubble = !0), G.toggle();
        }
        function v() {
            H.toggleOn && h(I.container, H.toggleOn, u, 1), a.removeChild(I.container);
        }
        function w() {
            if (I.container && v(), x = i.theme[H.theme], y = x.compiledHeatmaps || [], !y.length && x.heatmaps.length) {
                for (F = 0; F < x.heatmaps.length; F++) for (y[F] = [], E = 0; K >= E; E++) {
                    var b, d = y[F], e = E;
                    b = .33 / K * E;
                    var f = x.heatmaps[F].saturation, j = x.heatmaps[F].lightness, k = void 0, l = void 0, m = void 0, n = m = void 0, p = k = l = void 0, p = void 0, m = .5 >= j ? j * (1 + f) : j + f - j * f;
                    0 === m ? b = "#000" : (n = 2 * j - m, l = (m - n) / m, b *= 6, k = Math.floor(b), 
                    p = b - k, p *= m * l, 0 === k || 6 === k ? (k = m, l = n + p, m = n) : 1 === k ? (k = m - p, 
                    l = m, m = n) : 2 === k ? (k = n, l = m, m = n + p) : 3 === k ? (k = n, l = m - p) : 4 === k ? (k = n + p, 
                    l = n) : (k = m, l = n, m -= p), b = "#" + g(k) + g(l) + g(m)), d[e] = b;
                }
                x.compiledHeatmaps = y;
            }
            I.container = c(document.createElement("div"), x.container), I.count = I.container.appendChild(c(document.createElement("div"), x.count)), 
            I.legend = I.container.appendChild(c(document.createElement("div"), x.legend)), 
            I.graph = H.graph ? I.container.appendChild(c(document.createElement("div"), x.graph)) : 0, 
            L.length = 0;
            for (var q in I) I[q] && x[q].heatOn && L.push({
                name: q,
                el: I[q]
            });
            if (J.length = 0, I.graph) for (I.graph.style.width = H.history * x.column.width + (H.history - 1) * x.column.spacing + "px", 
            E = 0; E < H.history; E++) J[E] = I.graph.appendChild(c(document.createElement("div"), x.column)), 
            J[E].style.position = "absolute", J[E].style.bottom = 0, J[E].style.right = E * x.column.width + E * x.column.spacing + "px", 
            J[E].style.width = x.column.width + "px", J[E].style.height = "0px";
            c(I.container, H), o(), a.appendChild(I.container), I.graph && (C = I.graph.clientHeight), 
            H.toggleOn && ("click" === H.toggleOn && (I.container.style.cursor = "pointer"), 
            h(I.container, H.toggleOn, u));
        }
        "object" === d(a) && a.nodeType === b && (k = a, a = document.body), a || (a = document.body);
        var x, y, z, A, B, C, D, E, F, G = this, H = f({}, i.defaults, k || {}), I = {}, J = [], K = 100, L = [], M = 0, N = H.threshold, O = 0, P = j() - N, Q = [], R = [], S = "fps" === H.show;
        G.options = H, G.fps = 0, G.duration = 0, G.isPaused = 0, G.tickStart = function() {
            O = j();
        }, G.tick = function() {
            z = j(), M = z - P, N += (M - N) / H.smoothing, G.fps = 1e3 / N, G.duration = P > O ? N : z - O, 
            P = z;
        }, G.pause = function() {
            return A && (G.isPaused = 1, clearTimeout(A), l(A), l(B), A = B = 0), G;
        }, G.resume = function() {
            return A || (G.isPaused = 0, t()), G;
        }, G.set = function(a, b) {
            return H[a] = b, S = "fps" === H.show, -1 !== e(a, r) && w(), -1 !== e(a, s) && c(I.container, H), 
            G;
        }, G.showDuration = function() {
            return G.set("show", "ms"), G;
        }, G.showFps = function() {
            return G.set("show", "fps"), G;
        }, G.toggle = function() {
            return G.set("show", S ? "ms" : "fps"), G;
        }, G.hide = function() {
            return G.pause(), I.container.style.display = "none", G;
        }, G.show = function() {
            return G.resume(), I.container.style.display = "block", G;
        }, G.destroy = function() {
            G.pause(), v(), G.tick = G.tickStart = function() {};
        }, w(), t();
    }
    var j, k = a.performance;
    j = k && (k.now || k.webkitNow) ? k[k.now ? "now" : "webkitNow"].bind(k) : function() {
        return +new Date();
    };
    for (var l = a.cancelAnimationFrame || a.cancelRequestAnimationFrame, m = a.requestAnimationFrame, k = [ "moz", "webkit", "o" ], n = 0, o = 0, p = k.length; p > o && !l; ++o) m = (l = a[k[o] + "CancelAnimationFrame"] || a[k[o] + "CancelRequestAnimationFrame"]) && a[k[o] + "RequestAnimationFrame"];
    l || (m = function(b) {
        var c = j(), d = Math.max(0, 16 - (c - n));
        return n = c + d, a.setTimeout(function() {
            b(c + d);
        }, d);
    }, l = function(a) {
        clearTimeout(a);
    });
    var q = "string" === d(document.createElement("div").textContent) ? "textContent" : "innerText";
    i.extend = f, window.FPSMeter = i, i.defaults = {
        interval: 100,
        smoothing: 10,
        show: "fps",
        toggleOn: "click",
        decimals: 1,
        maxFps: 60,
        threshold: 100,
        position: "absolute",
        zIndex: 10,
        left: "5px",
        top: "5px",
        right: "auto",
        bottom: "auto",
        margin: "0 0 0 0",
        theme: "dark",
        heat: 0,
        graph: 0,
        history: 20
    };
    var r = [ "toggleOn", "theme", "heat", "graph", "history" ], s = "position zIndex left top right bottom margin".split(" ");
}(window), function(a, b) {
    b.theme = {};
    var c = b.theme.base = {
        heatmaps: [],
        container: {
            heatOn: null,
            heatmap: null,
            padding: "5px",
            minWidth: "95px",
            height: "30px",
            lineHeight: "30px",
            textAlign: "right",
            textShadow: "none"
        },
        count: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            right: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "24px",
            fontFamily: "Consolas, Andale Mono, monospace",
            zIndex: 2
        },
        legend: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            left: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "12px",
            lineHeight: "32px",
            fontFamily: "sans-serif",
            textAlign: "left",
            zIndex: 2
        },
        graph: {
            heatOn: null,
            heatmap: null,
            position: "relative",
            boxSizing: "padding-box",
            MozBoxSizing: "padding-box",
            height: "100%",
            zIndex: 1
        },
        column: {
            width: 4,
            spacing: 1,
            heatOn: null,
            heatmap: null
        }
    };
    b.theme.dark = b.extend({}, c, {
        heatmaps: [ {
            saturation: .8,
            lightness: .8
        } ],
        container: {
            background: "#222",
            color: "#fff",
            border: "1px solid #1a1a1a",
            textShadow: "1px 1px 0 #222"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#3f3f3f"
        }
    }), b.theme.light = b.extend({}, c, {
        heatmaps: [ {
            saturation: .5,
            lightness: .5
        } ],
        container: {
            color: "#666",
            background: "#fff",
            textShadow: "1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#eaeaea"
        }
    }), b.theme.colorful = b.extend({}, c, {
        heatmaps: [ {
            saturation: .5,
            lightness: .6
        } ],
        container: {
            heatOn: "backgroundColor",
            background: "#888",
            color: "#fff",
            textShadow: "1px 1px 0 rgba(0,0,0,.2)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        column: {
            background: "#777",
            backgroundColor: "rgba(0,0,0,.2)"
        }
    }), b.theme.transparent = b.extend({}, c, {
        heatmaps: [ {
            saturation: .8,
            lightness: .5
        } ],
        container: {
            padding: 0,
            color: "#fff",
            textShadow: "1px 1px 0 rgba(0,0,0,.5)"
        },
        count: {
            padding: "0 5px",
            height: "40px",
            lineHeight: "40px"
        },
        legend: {
            padding: "0 5px",
            height: "40px",
            lineHeight: "42px"
        },
        graph: {
            height: "40px"
        },
        column: {
            width: 5,
            background: "#999",
            heatOn: "backgroundColor",
            opacity: .5
        }
    });
}(window, FPSMeter);