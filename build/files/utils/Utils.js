//Utils is a collection of static helper functions.

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "getScreenShoot",

    /**
    * Gets an screenshoot of the current canvas. 
    * 
    * @param {Game} game - A game instance.
    * @return Screenshoot in base64 format.
    */
    value: function getScreenShoot(game) {
      var data = game.getCanvas().toDataURL();
      window.open(data, "_blank");
      return data;
    }
  }, {
    key: "getBase64Image",

    /**
    * Gets the base64 value of an image. 
    * 
    * @param {Image} img - Image file to process.
    * @return The image in base64 format.
    */
    value: function getBase64Image(img) {
      var cvs = document.createElement("canvas");
      cvs.width = img.width;
      cvs.height = img.height;

      var ctx = cvs.getContext("2d");
      ctx.drawImage(img, 0, 0);

      return cvs.toDataURL("image/png");
    }
  }, {
    key: "playSound",

    /**
    * Plays a sound once.
    * 
    * @param {Sound} sound - The sound file to play.
    */
    value: function playSound(sound) {
      sound = sound.cloneNode();
      sound.play();
    }
  }, {
    key: "stopSound",

    /**
    * Stops a sound.
    * 
    * @param {Sound} sound - The sound to stop.
    */
    value: function stopSound(sound) {}
  }, {
    key: "loopSound",

    /**
    * Plays a sound repeatedly.
    * 
    * @param {Sound} sound - The sound file to play.
    */
    value: function loopSound(sound) {
      sound.loop = true;
      sound = sound.cloneNode();
      sound.play();
    }
  }]);

  return Utils;
})();

//TODO