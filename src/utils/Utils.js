//Utils is a collection of static helper functions.

Utils = {};

Utils.getScreenShoot = function(game){
  var data = game.getCanvas().toDataURL();
  window.open(data,'_blank');
  return data;
}

Utils.getBase64Image = function(img) {
    var cvs = document.createElement("canvas");
    cvs.width = img.width;
    cvs.height = img.height;
 
    var ctx = cvs.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return cvs.toDataURL("image/png");
}

//this shouldnt be here..
Utils.loopSound = function(sound){
  sound.loop = true;
	sound = sound.cloneNode()
	sound.play();
}
Utils.playSound = function(sound){
  sound = sound.cloneNode()
  sound.play();
}

