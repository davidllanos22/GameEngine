/**
* Font class.
* @constructor
* @param {Image} img - Image containing the characters of the font.
* @param {String} chars - String with the characters ordered the same way as the image.
* @param {int} size - Size of the sub-image to be cutted.
* @param {int} separation - Separation between the characters.
*/
Font = function(img,chars,w,h,separation){

  this.chars = chars || "ABCDEFGHIJKLMNÑO"+
                        "PQRSTUVWXYZ     "+
                        "0123456789      "+
                        "!?.;:,          ";
                      
  this.w = w || 16;
  this.h = h || 20;

  this.separation = separation || 16;
  
  if(!img){
    this.img = new Image();
    this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACACAYAAADktbcKAAAIhklEQVR4Xu2d0XbcKgxFb/7/o9PkTsZtbLDRkTAI7z51dY0M2kIHhDH9+I8/EIDASAKfjY1/NP7O9LMuDzX1gB9D4NkEEIBnxx/vH07gfwH4/CzrwMfHNkd3may7PPThAcV9CFgIDBcA7xJkdvsrkZu9/+/BVPOD/pfT7Srub6tWfrU4XNlf9ePKvmv8vzs3tAM3tD91AG7wv+sAmrj/V3FHAL4IbALgqEG8S5gu9v/UTk0JsIr/b7/f/jTUkF34b9Cva9hf7Xv73+Dvfr1w6n/Bj/14Ktp7x5/XvpU/AvCzAkIA5E2oUAFBAF6pO0wAogKgzkAFx00zeFT/C2XlaQ1e8Hf/iFvtrfy39fDPbrR1AB6m1eNzTP5b+2/4/ekKoDZ+Tp7fZQVj8MfV/mEFEJVAXge8CTi6fW//vfZW/xGA1wro8QJwmLaMNVxDzdSkwD/7E4U8OPyTSwHfm1izlABeARbit+X+918MwlGLTTEeJ/EMraG9ewAIwC6sDUBTBNA6AAtC1rSEFRJwtIAhAAXh2wshJcDrjUHpT+gAZg/ghdkwE4fwX7AEOGixZ/wiAAiASQALg81kjwD8rslbV3C9JhAEoFEAvEvgKHvrLnbUHkBDyXS6B+L1f8AeQpcSUBXAXvyyCIDV//C3ANYO9NqEQwC0GTQqfir/0QKWfRPQGj+OAvc7Ch19FDXrtwBXHLIcRa/tKWTpfzEOCAAC0HsAIwAv6ZhSwK+CU9k45Z8hAIEVCCAAK0QRHyAgEkAARHCYQWAFAgjAClHEBwiIBBAAERxmEFiBAAKwQhTxAQIigSe8BnyjmfI1zFfner+Gqw2NN4+72u/FXxz6mL3fTWYfAPRfG8sIgMZtKatlrwTbpn3xPgPV3nuUtZf9qmfZl8rGAc4gAMF3AvZK4K+x4fqaEAEYkF0Jmgz/GGiWBCiwb6pBT+72cyWgN4G99rMLwD5ehq8BE6TZvF1EAHabcAjA2AtJ3qmCANwjGuElgHcFUKi9m3bxHd/zb2Pu+y/CwAu5kcdwBdVhsiz12/C8X5uoXgHcd67hfgTvteL3ZMqirSAAfwNrvczyVDgMQnKLgFyVACczb28BRgAGiku1BLDW0IYZR5rBrmrggBry0QLgjV+UgAhXeg1Mn/xNIwCsAEJWIAhATjE4E4DWY8LeJVzIAJxlD0CtgaMSqDYMT67o8vIP3UMR+OXMvEl6jQAErwCEAdx1E24r4P8eiNrX9AjAJMk4ohtn3wKYVgDeGazB+ab3+CfPufKndqRYtTtowYWPvduvbeZ5j1L/WgEY9o6u7Kz8GoYQPylBVQdeMYDqa6SG0CAAZUitCYwANAyyp/3kanaz8PAKiaUtfgsBCAQQQAACIPIICGQlECkAWRnQbwg8lgAC8NjQ4zgE6p+YwgYCEHgAAVYADwgyLkKgRuCOOwGvRKb1NVav14Cztn/Frfga9mSoz8qP7BxIAAG471JOawIiAAMT4ylNh38O/AbX8B34rxnMcZY/+7cI6leIU/LbJ45hHDwl56byEwHY3QkYdaGJQQgRgKlS4lmdCbsSbJuOPl8ltUH5izW49UKNfdis9t7v4U+OQG9aUBlaNQE4TKZn9rP5b+D/rIybzFsEIHgFIFxogQBMlhRP6k6EABRrUesKYJY9AKGGDd2DENo/TP7f/2CYgWfr/5Pyb7ivCEDw/wsgJLA3ARGA4WmUtwMRAhB6oYW6hPbWwKPtHXsQoQKgboI6+OXNngV6jgBUzgFYl9COBIi6kUctxbztezdxF0ijvC50ew24bX3f/H/zCUvw0BlUaD97CeDllzd7Fug5AnAMovW9vDeBvfbeBBzd/gJplNeFO44Cb4uBCqbRZ/GLCVToq/Uo72Ex0Mn/0f33tp83exboOQJQWQEgAAcC3m8TWu0XSKs8LhCUPLGipxAIJ4AAhCPlgRDIQwAByBMregqBcAIIQDhSHgiBPAQQgDyxoqcQCCeAAIQj5YEQyEPg7DVgqzh43+N7aXn/RyKvvbf/2ENgGAEEoH4nYKsADgseDUPAS6D6MdDXg1sTIPooqdUn69Hd/fO99tb+8nsITEMAAajcCGQQwGmCSUcgYCUQJgCHadV+N6C17+/fe2t4r73ab+wgMJwAAsAewPBBSAfGEYgQgF8z8cntuK17CuNo0DIEHkYAAXhYwHEXAv8SiHgN6K3FvTV4dntGJASGEUAA/HsAXgEaFnwahsAdJcBV7e99D5/dnlEIgWEEEAD/OQCvAA0LPg1DYJkSwHCN9+HIQmUYXK1crt5+tNozCiEwjAACELQH4BCgYcGnYQisMEuN3oQb3T6jGAIyAQRARrcZIgB+hjxhEIEVBGAQOpqFQH4CCED+GOIBBGQCCICMDkMI5CeAAOSPIR5AQCaAAMjoMIRAfgIIQP4Y4gEEZAIIgIwOQwjkJ4AA5I8hHkBAJoAAyOgwhEB+AghA/hjiAQRkAgiAjA5DCOQngADkjyEeQEAmgADI6DCEQH4CCED+GOIBBGQCCICMDkMI5CeAAOSPIR5AQCaAAMjoMIRAfgIIQP4Y4gEEZAIIgIwOQwjkJ4AA5I8hHkBAJoAAyOgwhEB+AghA/hjiAQRkAgiAjA5DCOQngADkjyEeQEAmgADI6DCEQH4CCED+GOIBBGQCCICMDkMI5CeAAOSPIR5AQCaAAMjoMIRAfgIIQP4Y4gEEZAIIgIwOQwjkJ4AA5I8hHkBAJoAAyOgwhEB+AghA/hjiAQRkAgiAjA5DCOQngADkjyEeQEAmgADI6DCEQH4CCED+GOIBBGQCCICMDkMI5CeAAOSPIR5AQCaAAMjoMIRAfgIIQP4Y4gEEZAIIgIwOQwjkJ4AA5I8hHkBAJoAAyOgwhEB+AghA/hjiAQRkAgiAjA5DCOQngADkjyEeQEAm8AfmNNT5kF3HAAAAAABJRU5ErkJggg==";
    //this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAgCAYAAADKbvy8AAACkklEQVRoQ+2Z227EMAhEu///0V3lwZXXAs7g4CTVui9VA+Y2ZiDp62f//OsKvLrof4dMetkhqpSPtqvtH/as+NuzI5cov9n4yL5lt5V9jCn6+082AqgG4BVADfDseatrLJu9Xi/3dMlGu2gewMfzWdutQZqN8RKa8W8AP6/CWQCtzvc6bLyEzff4uz/f7Lsd2BudoZizHdj8E4VRB3gUGuUXdZfXyePzCgCJUvtO/ZgDRDEZOVHcagol+zM053XGWPAZ29blWTID1Q6lDqAOoyXEuyAUH834CgbwOllZAr2RNto0KdQqyn728ApEM+vhoe/wrDWVKOgp8miJiSgss3X3dugdzaW4rmBEoVM3MpNQZomZWSLOrPBqATP5VgOobLJpEDMJfTOAEZj9Fhox1KhXMr6yABKFVm151hbqUWNfGPKv5BtdVIUlojjV83InKglZBbIc9O9JFgD0HqVQTFQAYgjqIuVLiPqpjEaIDBApjgCqHeYBqJ73EiQKIgDpvNrFtLTMxL98iSGws/JyusgG8A36JYP0Gwr11ByzFNrymP0UtpJiiaJWy2/BOLPEqMsMzRlPTksIUTLJaUnK+M/4Wgqs1YHRpqWAo+jQlkbyaAtWCkb2Z+SK33KdSgCJohqwHg3T+bNyhUGaj5kRUQ6OYrCSQjO0QrozcqJAAlA9rzCMUvsSndkl5nAe/cd+Rq7MKFqCIjkVnjqcLkAJIFkj+zUiW7GH6WcAVG/oyhSJWqnLVsZ2i22LBhVQlUJWJ5TxmdGtjvNSe3cASMX15HSOZuilhb3KWQbAuyl0A2jciiyACr2uunwbQAHAVcWvsLsBFACMiqQWkPRm5XRuz8CKNgEbGRAsU8p5ReeCVK9x8QYuBVMwQMGAVQAAAABJRU5ErkJggg==;"
  }else{
    this.img = img;  
  }
}  

Font.prototype.render = function(char,x,y,graphics){

  for(var i = 0; i<this.chars.length;i++){
    if(this.chars.charAt(i) == char.toUpperCase()){
      var xx = i % 16;
      var yy = Math.floor(i/16);
      graphics.imageSection(this.img,x,y,xx,yy,this.w,this.h,this.w,this.h);
    }
  }
}