//Utils is a collection of static helper functions.
class Utils{
  static imageToArray(img){
    var array = [];
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.drawImage(img, 0, 0);
    for(var y = 0; y < img.height; y++){
      array[y] = [];
      for(var x = 0; x < img.height; x++){
        var data = ctx.getImageData(x, y, 1, 1).data;
        var dd = data[0] << 16 | data[1] << 8 | data[2];
        array[y][x] = Utils.hexToString(dd);
      }
    }
    return array;
  }

  static hexToString(n){
    return "#" + n.toString(16);
  }

  /**
  * Gets an screenshoot of the current canvas. 
  * 
  * @param {Game} game - A game instance.
  * @return Screenshoot in base64 format.
  */
  static getScreenShoot(game){
    var data = game.getCanvas().toDataURL();
    window.open(data,'_blank');
    return data;
  }
  /**
  * Gets the base64 value of an image. 
  * 
  * @param {Image} img - Image file to process.
  * @return The image in base64 format.
  */
  static getBase64Image(img){
      var cvs = document.createElement("canvas");
      cvs.width = img.width;
      cvs.height = img.height;
   
      var ctx = cvs.getContext("2d");
      ctx.drawImage(img, 0, 0);

      return cvs.toDataURL("image/png");
  }
  /**
  * Plays a sound once.
  * 
  * @param {Sound} sound - The sound file to play.
  */
  static playSound(game, sound){
    if(!sound) return;
    var source = game.actx.createBufferSource();
    source.buffer = sound;
    source.connect(game.actx.destination);
    source.start(0);
  }
  /**
  * Stops a sound.
  * 
  * @param {Sound} sound - The sound to stop.
  */
  static stopSound(sound){
    //TODO
  }
  /**
  * Plays a sound repeatedly.
  * 
  * @param {Sound} sound - The sound file to play.
  */
  static loopSound(game, sound){
    if(!sound) return;
    var source = game.actx.createBufferSource();
    source.buffer = sound;
    source.loop = true;
    
    source.connect(game.actx.destination);
    source.start(0);
  }
}