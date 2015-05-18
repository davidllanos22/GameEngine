/**
* Timer class.

* @constructor
* @param {int} duration - Time the timer will run.
* @param {boolean} repeat - Will the animation be looped?.
* @param {function} onStart - Function triggered at the start of the timer.
* @param {function} onTick - Function triggered at every tick of the timer.
* @param {function} onFinish - Function triggered at the end of the timer.
*/
class Timer{ 
	constructor(game, duration, repeat, onStart, onTick, onFinish){
		this.game = game;
		this.duration = duration;
		this.isRunning = false;
		this.repeat = repeat;
		this.onStart = onStart;
		this.onTick = onTick;
		this.onFinish = onFinish;
		this.game;
		this.time = -1;
		this.count = 0;
		
		this.done = false;
	}

	start(){
		this.game.timerManager.add(this);
		this.reset();
	}

	run(){
		if(!this.done || this.repeat){
			if(this.time == -1){
				if(this.onStart != null) this.onStart();	
				this.time ++;
			}else if(this.time == this.duration){
				if(this.onFinish != null) this.onFinish();
				this.done = true;
				this.isRunning = false;
				if(this.repeat){
					this.count++;
					this.reset();
				}
				else this.game.timerManager.remove(this);
			}else{
				if(this.onTick != null) this.onTick();
				this.time ++;
			}
		}
	}

	reset(){
		this.time = -1;
		this.done = false;	
		this.isRunning = true;
	}

	pause(){
		this.isRunning = false;
	}

	unpause(){
		this.isRunning = true;
	}
}