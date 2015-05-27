/**
* Loader class.
* @constructor
*/
class Loader{
	constructor(game){
		this.actx = game.actx;
		this.resources = [];
		this.numResources = 0;
		this.numResourcesLoaded = 0;
		this.onFinish;
		this.loaded = false;
	}
	
	loadImage(url){
		var img = new Image();
		img.src = url + "?" + new Date().getTime();
		
		this.numResources++;

		img.onload = ()=>{
			console.log("Image loaded: " + url);
			this.numResourcesLoaded++;
			this.check();
		}	
		return img;
	}

	loadSound(url, callback){
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = 'arraybuffer';

		req.onload = ()=>{
		    this.actx.decodeAudioData(req.response, (buffer)=>{
		    	console.log("Audio file loaded: " + url);
				this.numResourcesLoaded++;
				this.check();
				callback(buffer);		    	
		    }, null);
	  	}
		req.send();
	}

	loadRaw(url, callback){
		var req = new XMLHttpRequest();
		req.onreadystatechange = ()=>{
			if (req.readyState == 4) {
				console.log("Raw file loaded: " + url);
				this.numResourcesLoaded++;
				this.check();
		    	callback(req.responseText);
		  }
		};
		req.open("GET", url, true);
		req.send();
	}

	onFinish(onFinish){
		this.onFinish = onFinish;
	}

	check(){
		if(this.numResourcesLoaded == this.numResources){ 
			this.loaded = true;
			this.onFinish();	
		}
	}
	
}