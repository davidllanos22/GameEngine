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
		this.count = -1;
		this.done = false;
		game.timerManager.add(this);
		this.isRunning = true;
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
				if(this.repeat)this.count = -1;
				else game.timerManager.remove(this);
			}else{
				if(this.onTick != null) this.onTick();
				this.count ++;
			}
		}
	}
}