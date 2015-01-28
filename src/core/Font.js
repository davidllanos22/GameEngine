Font = function(){
  this.chars =  "ABCDEFGHIJKLMN"+
                "OPQRSTUVWXYZ  "+
                "0123456789    "+
                "!?.;:()       ";
  this.size = 14;
  this.separation = 12;
  this.img = new Image();
  //this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAgCAYAAADKbvy8AAACkklEQVRoQ+2Z227EMAhEu///0V3lwZXXAs7g4CTVui9VA+Y2ZiDp62f//OsKvLrof4dMetkhqpSPtqvtH/as+NuzI5cov9n4yL5lt5V9jCn6+082AqgG4BVADfDseatrLJu9Xi/3dMlGu2gewMfzWdutQZqN8RKa8W8AP6/CWQCtzvc6bLyEzff4uz/f7Lsd2BudoZizHdj8E4VRB3gUGuUXdZfXyePzCgCJUvtO/ZgDRDEZOVHcagol+zM053XGWPAZ29blWTID1Q6lDqAOoyXEuyAUH834CgbwOllZAr2RNto0KdQqyn728ApEM+vhoe/wrDWVKOgp8miJiSgss3X3dugdzaW4rmBEoVM3MpNQZomZWSLOrPBqATP5VgOobLJpEDMJfTOAEZj9Fhox1KhXMr6yABKFVm151hbqUWNfGPKv5BtdVIUlojjV83InKglZBbIc9O9JFgD0HqVQTFQAYgjqIuVLiPqpjEaIDBApjgCqHeYBqJ73EiQKIgDpvNrFtLTMxL98iSGws/JyusgG8A36JYP0Gwr11ByzFNrymP0UtpJiiaJWy2/BOLPEqMsMzRlPTksIUTLJaUnK+M/4Wgqs1YHRpqWAo+jQlkbyaAtWCkb2Z+SK33KdSgCJohqwHg3T+bNyhUGaj5kRUQ6OYrCSQjO0QrozcqJAAlA9rzCMUvsSndkl5nAe/cd+Rq7MKFqCIjkVnjqcLkAJIFkj+zUiW7GH6WcAVG/oyhSJWqnLVsZ2i22LBhVQlUJWJ5TxmdGtjvNSe3cASMX15HSOZuilhb3KWQbAuyl0A2jciiyACr2uunwbQAHAVcWvsLsBFACMiqQWkPRm5XRuz8CKNgEbGRAsU8p5ReeCVK9x8QYuBVMwQMGAVQAAAABJRU5ErkJggg=="
  this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAA4CAYAAACi9lcJAAAM1UlEQVR4Xu1dTZIdNQyeOQFwAZI926wgVeRnk6KK5ApcAVZcggOwgTMkUOxCoIqwyiECF0g4wdCyW36yLEuf/d6b6an0KwpmHq2W/OmT7O7+2nN5sX92BHYECgKXOxY7AjsCBwTMgnj66IurfMjVxYvf/4aK5umjz1ebbIna0bFPHy62lZfLxf6165f8Xa0e+cAXr0ZiJavlBHSOy9gfxfn1Eudy6PrJ9tE4GUsKNpku/4psJCbyWB7zL8A4yS/5RI7VBcG5hOJUfkZizHhi2CdMVo5R3nlcGd/8j5f/zLHalzXOhnR00POXrwtGi8MQVG1Dxs8e3w9JzSRbyN80qWePv+gSh4C0bWKffdu+PyboczPOvk9K1vOXfxlj8+OUMTIO1ne9zi79ejha9jKXka2MiXiSG2HOZZT/KsbFNmpmmmMUGxWG5EEv3hqPjH0Po7Ag8uD6ZLGKgYGOAPVse4XYIzTic8YfdybZJCSRnnWSSR3JKqAoTm1HxKL2J/33fFoNJsqBNTuwLz/vdbFTvhBy2jHGjazFJRdghYvBU6sp0bhqu4P/qiB6hPFmCU1QShYTIUpG1Y0Wu3X1sgwzh2Utm/QAKTY6WpIP6RRc6NRlaBkkp2GPJNz90jHJ2F4C1R09k5rHlX+O7XIx1p2X/feWlE0+wJmax4zOLnFj8mbOmVVIO9u2xG4bN1IQkt9VQVRJFMRm8lhrSg8Yt8OoDpqIvS7rvXV2m3AizOVS8YelSb8g6kRE3Zr//+gyy2sSgnjmUtSbxZB4raUFci1wiOuA0czKgGxy4fevr061LNeNixuIvG4axVMvma7++Od98vPgzscXr96+W0iaD6HfRYuTsVy9evs+k9n4+HbQ+fVZF3/vyncP736Sfua4o1jlcXwSJ0Y+JPkkLNLFMYRJHeOA35ID6asEsvhfx9y76ZDs2RYYW4Mv2yN+yPgwy2ZsAJ8FzyBfZdiMH99J4Rxk/9kv/deIeQhPCWoFJDtKVeAPsnJIAaHkpHMz0VYQZXLChNPBMwWhyMI+vbtaVgI9u4KJSHgpXJG4BK9ipGnLTQAg3CjZCun4B9kUjfgqkkosBwqxcI2G//BuarYunnr8VoOhwlzPVfE6spUF3BSE7ERcdfxdp2NUCVTJjbpFt3q9mUWCoTuGKCyL4BVZwG6feoORbIvMFblkInS3R8fH45EzFNq5RTFGt87NHAadvik8sBEWPNMPYsZ14m2ahCra0oSNmJuGTX56sZoFwUl48uSzi+9/fF2mxA5A6QrRWjYF5Ex4ZNu8vJBLEo8wPKDDVJkvjFF/ktzg0sLq2iHJNPBcLVHRGslKpmjnZkyB2aQUsG4yPPNSWnSTW39PuRsgpjxNsZUF0VnylAKSM6ta1rkFYcUpOSQbTFUQnYHrr83O69hCxOnYu8kYtCnJn4i1eui42kfjKgU/GGfPl/7eXeIpn1Gsls/UowJO9OzYbCRG6apZRoLc7Pm1sDPx7DnuFcroACNAPZJGtrMk7RF1xF90bNMNjyColQvEP+ODHGthMmrHx4/4HcmhPm/0u64hK67mO3TQgwW6H74jcDsR2AviduZtj/pMCOwFcSZg99PeTgSagqCnrOlqqjw2xtSZrATlhzR0PRYpVslPUiuuEohV0RAKvbJdra6l75AnsqSJYYlIjhWLM41PXbJ5cg8+1FJ/Mla9eC0VpmfDik+tjJWYeCpUiSWdw1KVWvS2zomoXavcFUULoRurh89dZlVBjEoUZNIt8VusZeqpQQPlqVLkchyxvznpxqyA0VKOao2TbhpSxMbj0ZovqQytfWT9kKWj4vxoXZrW+njCN0lGK06tfrWk55GUIsrhtRVET6pcyNZTdXbIGZE0UoPOq11tUZlPal9tOVMQFtG4+x7UpK3fSOasCWMdrxWgnpwfsbdmstbuPqQnO0YUeO5iSCsjdqL19vQ9Ijm2ZLmRJJeXPFJmTMslqVjtFUSUQNSuiAlpol58ey/SyBeDZKdl8CwtP1IQVqwR0doOX896lgLUy0davijsDzN/Flz2CkKLKnG7jHle0h3ehWGpO7L0PVdxpJxaSeC3kGpZtdXR7GWPBEeTzVI7pupcoomKaXbK9WYkZJrmtXF5AYZk2c71h9Uo8gxxwMvyy+tr2SyqxqGuzfhtQ+t4wlQWCCtRrWUatUY9k5C91yhyrLXSmBuNR2q+5tHL7OilonMVgTxveZjCj8Lpf4pH2YhkodHB5OovysNqJlqd984L+SOZCL9TYMg9LH85oOWjJQqAclXiVZS2gZ4o+evoZSpFMfUBI9FC/MY3OHzFsRa7kTxESlTIB6I8HtB3cdjTYkKDc73cXUctJB/V08WePkSAaZJbapE48kivI8nJx4ICOpMsQcJL8siH9KfijW5DI2SufGk8QEVoVbwsYHSKsJKns4JUSqYRxTKoK9LkXJtEvksENIrULIxXC/i8UQ7OWhyVLEATW+rckWSowomqvas8HelmFBfPGEjSC1vb9xqieKuuj2j+ZdFLv8lR/N6AqdIUTUwSo5mleYaQfiO1MovnBlSrFSaOOK+J9XB7vuY3gOv1FUQvgYHysVIuAirJkiPtT77o4RBmVmW5Kmvzy0zGOxFIZyovQ4GJ6y7TUGWuel+kF+M6tvwSk3y3xHjfRJ+jNCZpByprpwpCv2w1sUw7W1E04DiePMKMKDGrbmH5A5Ixq7KcVXVWRSxihopoEtNENmU7mgPEHlaCdsYxItCzxmSdFsH1LEVhXtAZnpAAR1SOYVEApBtVOx5DaiteBJOeT/oetR/BFVJ0GvmdtbPGh4zLa2iI/VmKYSQpZwsg6Do3Cs51D3r3d/MI7IS7+RzsEWwIgb0gNpSMPZSbR8AsCH6SyHtrIY/S+UluOiGoIOXhs3xg3c4HUruSrVSuRnt7aqi1whNJxWEP2nzPnT4INinWdQ/UnhSiFx8rcnmjs0hBrDEZyUWJcR3dzL6wCI5bPqYpCEviEEkbLDlFZCOLYeYRvuXT22FQJqGnM/IS1ZN+IONspDHBXqbu5m+O7axamQtW70OLjG3L5J6JrSoIT/Hqkc2yQ8g5m/ienglJoF3wgdrV2afV22c1E62VnHs201qtzsbKTAoPG3/3xXjf1RnibdWmFITVxZD9Urm75AEeNuVFCqLW1N+/+PanX8tDJXQbRTruu59/u/jy048uRsj557//JZs1/kDEVgsYs0ju8PFe9JGzH/n84Zuv3JeSqpdnMqSHvXKToLCvPvVk3zCei49vFzwf3MnYIE1mq+SeiatfEGq78QgY3uufp12oIMrfoSClZb1tfDQjsb5Hb4uP7utKykr2iZJFAxxhMjuTsYq02fU72IV9Ro5NY5rdn3eGcFu3qbRM1gZZ4D6fPE4tA0DuYjXyBkDWsPbOWr1KX6I74snEBBqcai9ZspP7io7sbid9otIPLbgk9x1SdXe3C3BJWNpbQ8Jiva3zHI4PKggA0Kog6BdQ9ViSoRSdiXfOKCoZNrjvqVKE5rMD8u/mqeqA+K0oc3nPW3CnwIakQAE1CtKR7S8Z686ugUhjg0m35QOrgqBArU4xUhCADqlqzlIGnFiwqlCjziulzbPE5kKKxIsakwExmlCs5heg+BONzyBz2CSsLTpBf70CjHxumdtTsZniPpkM0e0RcEaXTNVUPUI0Ll5jK3Qvzqrb54Iou093lyJ0QrkFv9p6PfRnvbyzZgte/qRA/U+lOqbDuQDRJajepxXwOUW6LRuh4j6kGFKXUYOFkugA5C6bOnaRTzYbifUYMdqMwnZUQdobk4QowmUEjy1z+qjY3K4ozhyBKYMYUWdaRcTnQnwem8SRWGdJOtMotA2ChVcUqP0IHkcRb6vGKFBh/LPyi/DE+wE7AteIQLcgWNeC6Fls6caH9YTzGnO2uzojAl1xH/LQiuKalV+caExyGTMy283anSjs/TRbRaAhkfVXPt09doTOh57+ovKLEwAyvf0J+MckTxDiforbhgBQENE2j8tmxetnRH5xAqBm/9rmrN0JQt5PsXUEmoKwtooENf+9v7w5spQZwWv2rs+s3Uhs+7G3FAHzOQS4mZYe8k103tlrgVm7W5rmPWwUAbMgJtfYs2t6NNYbP+7NmzepkO7du5diWZ+Sn2sGvPHxfogBIA/mRhJ+3Z33Wh8kLQVwRbKNQQXwh8irWzvmEbJvbZCVknQJbmQss4Vb7Ss7oOjdGnZ7PB0EtjJDjBL0GGIes7TTmx0TrCOFuBNx4whs4RpihqDHEPOYi//K734NsXF2T4S3hbtMMwQd2Za+uRtm4IR2+eqW7V4QE4zbuAkq/0YIM3t/f8buVCrXoSUP3WWSd5iSsXyfdOPJ3sOLEbit1xDpruc6PKRYYyT2I3YEFgT+B1OMGN4hkkFBAAAAAElFTkSuQmCC";
}  

Font.prototype.render = function(char,x,y,graphics){

  for(var i = 0; i<this.chars.length;i++){
    if(this.chars.charAt(i) == char.toUpperCase()){
      var xx = i % 14;
      var yy = Math.floor(i/14);
      graphics.imageSection(this.img,x,y,xx,yy,this.size,this.size);
    }
  }
}