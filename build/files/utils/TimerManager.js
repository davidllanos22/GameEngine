/**
* Timer Manager class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimerManager = (function () {
  function TimerManager(game) {
    _classCallCheck(this, TimerManager);

    this.game = game;
    this.timers = [];
  }

  _createClass(TimerManager, [{
    key: "add",
    value: function add(timer) {
      if (this.timers.indexOf(timer) == -1) {
        timer.game = game;
        this.timers.push(timer);
      }
    }
  }, {
    key: "remove",
    value: function remove(timer) {
      this.timers.splice(this.timers.indexOf(timer), 1);
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < this.timers.length; i++) {
        if (this.timers[i].isRunning) this.timers[i].run();
      }
    }
  }]);

  return TimerManager;
})();