/**
* Timer Manager class.
* @constructor
* @param {Game} game - Instance of the Game class.
*/
class TimerManager{
  constructor(game){
    this.game = game;
    this.timers = [];
  }

  add(timer){
    if(this.timers.indexOf(timer) == -1){
      timer.game = game;
      this.timers.push(timer);
    }
  }

  remove(timer){
    this.timers.splice(this.timers.indexOf(timer),1);
  }
  
  update(){
    for(var i = 0; i<this.timers.length; i++){
      if(this.timers[i].isRunning)this.timers[i].run();
    }
  }
}