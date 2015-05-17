/**
* Loader class.
* @constructor
*/
"use strict";

Loader = function () {

	this.loadImage = function (url) {
		var img = new Image();
		img.src = url + "?" + new Date().getTime();

		this.numResources++;

		img.onload = function () {
			console.log("Image loaded " + url);
			self.numResourcesLoaded++;
			self.check();
		};
		return img;
	};

	this.loadSound = function (url) {
		var audio = new Audio();
		audio.src = url + "?" + new Date().getTime();

		this.numResources++;

		audio.addEventListener("loadeddata", function () {
			console.log("Audio loaded " + url);
			self.numResourcesLoaded++;
			self.check();
		}, false);

		return audio;
	};

	this.loadData = function (url, callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				console.log("Data loaded " + url);
				callback(req.responseText);
			}
		};
		req.open("GET", url, true);
		req.send();
	};

	this.onFinish = function (onFinish) {
		this.onFinish = onFinish;
	};

	this.check = function () {
		if (this.numResourcesLoaded == this.numResources) {
			this.loaded = true;
			this.onFinish();
		}
	};
	var self = this;
	this.resources = [];
	this.numResources = 0;
	this.numResourcesLoaded = 0;
	this.onFinish;
	this.loaded = false;
};