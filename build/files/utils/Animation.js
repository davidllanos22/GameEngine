/**
* Animation class.
* @constructor
* @param {int} time - Time of the animation.
* @param {Array} frames - Array of frames represented as [[0,0],[0,1]].
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = (function () {
  function Animation(game, time, w, h, frames) {
    var _this = this;

    _classCallCheck(this, Animation);

    this.game = game;
    this.frames = frames;
    this.w = w;
    this.h = h;
    this.actualFrame = 0;
    this.timer = new Timer(game, time, true, null, null, function () {
      if (_this.actualFrame == _this.frames.length - 1) _this.actualFrame = 0;else _this.actualFrame++;
    });
    this.timer.start();
  }

  _createClass(Animation, [{
    key: "render",
    value: function render(src, x, y, w, h, a) {
      this.game.graphics.imageSectionRot(src, x, y, this.frames[this.actualFrame][0], this.frames[this.actualFrame][1], this.w, this.h, w, h, a);
    }
  }]);

  return Animation;
})();