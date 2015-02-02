/**
* Timer Manager class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
TimerManager = function(game){
  this.game = game;
  this.timers = [];
}

TimerManager.prototype = {
  add: function(timer){
    if(this.timers.indexOf(timer) == -1){
      timer.game = game;
      this.timers.push(timer);
    }
  },
  remove: function(timer){
    this.timers.splice(this.timers.indexOf(timer),1);
  },
  update: function(){
    for(var i = 0; i<this.timers.length; i++){
      if(this.timers[i].isRunning)this.timers[i].run();
    }
  }

}