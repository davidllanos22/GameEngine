/**
* Loader class.
* @constructor
*/
class Loader{
	constructor(){
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

	loadSound(url){
		var audio = new Audio();
		audio.src = url + "?" + new Date().getTime();

		this.numResources++;

		audio.addEventListener('loadeddata', ()=>{
    	console.log("Audio loaded: " + url);
			this.numResourcesLoaded++;
			this.check();
		}, false);
		return audio;
	}
	
	loadRaw(url, callback){
		var req = new XMLHttpRequest();
		req.onreadystatechange = ()=>{
			if (req.readyState == 4) {
				console.log("Raw file loaded: " + url);
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