Resource = function(){
	this.url;
	this.type;
}
/**
* Loader class.
* @constructor
*/
Loader = function(){
	this.resources = [];
	this.numResources = 0;
	this.numResourcesLoaded = 0;
	this.onFinish;
	this.loaded = false;
}

Loader.prototype = {

	loadImage: function(url){
		
		var img = new Image();
		img.src = url + "?" + new Date().getTime();

		var self = this;
		this.numResources++;

		img.onload = function () {
			Utils.logLoad("Image loaded " + url);
			self.numResourcesLoaded++;
			self.check();
		}	
		return img;
	},
	loadSound: function(url){
		var audio = new Audio();
		audio.src = url + "?" + new Date().getTime();

		var self = this;
		this.numResources++;

		audio.addEventListener('loadeddata', function(){
    	Utils.logLoad("Audio loaded " + url);
			self.numResourcesLoaded++;
			self.check();
		}, false);

		return audio;
	},
	loadData: function(url){
		Utils.logLoad("Loading Data " + url);
		return 1;
	},
	loadAll: function(onFinish){
		this.onFinish = onFinish;
		
	},check: function(){
		if(this.numResourcesLoaded == this.numResources){ 
			this.loaded = true;
			this.onFinish();	
		}
	}
}