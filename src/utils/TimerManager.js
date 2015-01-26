TimerManager = function(game){
  this.game = game;
  this.timers = [];
}

TimerManager.prototype = {
  add: function(timer){
    timer.game = game;
    this.timers.push(timer);
  },
  remove: function(timer){
    this.timers.splice(this.timers.indexOf(timer),1);
  },
  update: function(){
    for(var i = 0; i<this.timers.length; i++){
      this.timers[i].run();
    }
  }

}