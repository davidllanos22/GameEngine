//Utils is a collection of static helper functions.

"use strict";

Utils = {};

/**
* Gets an screenshoot of the current canvas. 
* 
* @param {Game} game - A game instance.
* @return Screenshoot in base64 format.
*/
Utils.getScreenShoot = function (game) {
  var data = game.getCanvas().toDataURL();
  window.open(data, "_blank");
  return data;
};

/**
* Gets the base64 value of an image. 
* 
* @param {Image} img - Image file to process.
* @return The image in base64 format.
*/
Utils.getBase64Image = function (img) {
  var cvs = document.createElement("canvas");
  cvs.width = img.width;
  cvs.height = img.height;

  var ctx = cvs.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return cvs.toDataURL("image/png");
};

/**
* Plays a sound once.
* 
* @param {Sound} sound - The sound file to play.
*/
Utils.playSound = function (sound) {
  sound = sound.cloneNode();
  sound.play();
};

/**
* Stops a sound.
* 
* @param {Sound} sound - The sound to stop.
*/
Utils.stopSound = function (sound) {};

/**
* Plays a sound repeatedly.
* 
* @param {Sound} sound - The sound file to play.
*/
Utils.loopSound = function (sound) {
  sound.loop = true;
  sound = sound.cloneNode();
  sound.play();
};

//TODO