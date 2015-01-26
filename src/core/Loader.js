Resource = function(){
	this.url;
	this.type;
}

Loader = function(){
	this.resources = [];
}

Loader.prototype = {

	loadImage: function(url){
		Utils.logLoad("Loading Image " + url);
		var img = new Image();
		img.src = url + "?" + new Date().getTime();
		return img;
	},
	loadSound: function(url){
		Utils.logLoad("Loading Sound " + url);
		var audio = new Audio();
		audio.src = url + "?" + new Date().getTime();
		return audio;
	},
	loadData: function(url){
		Utils.logLoad("Loading Data " + url);
		return 1;
	},
	loadAll: function(onFinish){

	}
}