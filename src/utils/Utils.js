//Utils is a collection of static helper functions.

class Utils{
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
  static playSound (sound){
    sound = sound.cloneNode()
    sound.play();
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
  static loopSound(sound){
    sound.loop = true;
    sound = sound.cloneNode()
    sound.play();
  }
}