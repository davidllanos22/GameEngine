/**
* Timer class.
* @constructor
* @param {int} time - Time the timer will run.
* @param {boolean} repeat - Will the animation be looped?.
* @param {function} onStart - Function triggered at the start of the timer.
* @param {function} onTick - Function triggered at every tick of the timer.
* @param {function} onFinish - Function triggered at the end of the timer.

*/
Timer = function(time, repeat, onStart, onTick, onFinish){
	this.time = time;
	this.isRunning = false;
	this.repeat = repeat;
	this.onStart = onStart;
	this.onTick = onTick;
	this.onFinish = onFinish;
	this.game;
	this.count = -1;
	
	this.done = false;
}

Timer.prototype = {
	start: function(){
		game.timerManager.add(this);
		this.reset();
	},
	run: function(){
		if(!this.done || this.repeat){
			if(this.count == -1){
				if(this.onStart != null)this.onStart();	
				this.count ++;
			}else if(this.count == this.time){
				if(this.onFinish != null)  this.onFinish();
				this.done = true;
				this.isRunning = false;
				if(this.repeat){
					this.reset();
				}
				else game.timerManager.remove(this);
			}else{
				if(this.onTick != null) this.onTick();
				this.count ++;
			}
		}
	},
	reset: function(){
		this.count = -1;
		this.done = false;	
		this.isRunning = true;
	},
	pause: function(){
		this.isRunning = false;
	},
	unpause: function(){
		this.isRunning = true;
	}
}