Timer = function(time, repeat, onStart, onTick, onFinish){
	this.time = time;
	this.repeat = repeat;
	this.onStart = onStart;
	this.onTick = onTick;
	this.onFinish = onFinish;

	this.count = -1;
	
	this.done = false;
}

Timer.prototype = {

	run: function(){
		if(!this.done || this.repeat){
			if(this.count == -1){
					this.onStart();	
					this.count ++;
			}else if(this.count == this.time){
				if(this.onFinish != null)this.onFinish();
				this.done = true;
				if(this.repeat)this.count = -1;
			}else{
				if(this.onTick != null) this.onTick();
				this.count ++;
			}
		}
	}
}