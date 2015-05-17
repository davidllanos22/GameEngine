/**
* Timer Manager class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
"use strict";

TimerManager = function (game) {
  this.add = function (timer) {
    if (this.timers.indexOf(timer) == -1) {
      timer.game = game;
      this.timers.push(timer);
    }
  };

  this.remove = function (timer) {
    this.timers.splice(this.timers.indexOf(timer), 1);
  };

  this.update = function () {
    for (var i = 0; i < this.timers.length; i++) {
      if (this.timers[i].isRunning) this.timers[i].run();
    }
  };

  this.game = game;
  this.timers = [];
};