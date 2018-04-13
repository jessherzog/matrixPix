
function CanvasImage(canvas, src) {
  var context = canvas.getContext('2d');   // load image in canvas
  var i = new Image();
  var that = this;
  
  i.onload = function(){
    canvas.width = i.width * 5;
    canvas.height = i.height * 5;

    context.imageSmoothingEnabled = false; 
    context.mozImageSmoothingEnabled = false; 
    context.webkitImageSmoothingEnabled = false; 
    context.msImageSmoothingEnabled = false; 

      context.save();
      
      context.drawImage(i, 0, 0, i.width, i.height, 0, 0, 300, 300);
      that.original = that.getData(); // remember the original pixels
      $('choose-img').setAttribute("style", "width: " + canvas.width + "px");
      $('img-gallery').setAttribute("style", "width: " + canvas.width + "px");
      
      context.restore();
    };

    i.src = src;

  // cache these
  this.canvas = canvas;
  this.context = context;
  this.image = i;

}

CanvasImage.prototype.getData = function() {
  return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

CanvasImage.prototype.setData = function(data) {
  return this.context.putImageData(data, 0, 0);
};

CanvasImage.prototype.reset = function() {
  this.setData(this.original);
};

CanvasImage.prototype.convolve = function(matrix, divisor, offset) {
    //  original convolution code: http://www.phpied.com/files/canvas/matrix.html

  var m = [].concat(matrix[0], matrix[1], matrix[2]); // flatten
  
  if (!divisor) {
    divisor = m.reduce(function(a, b) {return a + b;}) || 1; // sum
  }
  var olddata = this.original;
  var oldpx = olddata.data;
  var newdata = this.context.createImageData(olddata);
  var newpx = newdata.data
  var len = newpx.length;
  var res = 0;
  var w = this.image.width * 5;
  for (var i = 0; i < len; i++) {
    if ((i + 1) % 4 === 0) {
      newpx[i] = oldpx[i];
      continue;
    }
    res = 0;
    var these = [
    oldpx[i - w * 4 - 4] || oldpx[i],
    oldpx[i - w * 4]     || oldpx[i],
    oldpx[i - w * 4 + 4] || oldpx[i],
    oldpx[i - 4]         || oldpx[i],
    oldpx[i],
    oldpx[i + 4]         || oldpx[i],
    oldpx[i + w * 4 - 4] || oldpx[i],
    oldpx[i + w * 4]     || oldpx[i],
    oldpx[i + w * 4 + 4] || oldpx[i]
    ];
    for (var j = 0; j < 9; j++) {
      res += these[j] * m[j];
    }
    res /= divisor;
    if (offset) {
      res += offset;
    }
    newpx[i] = res;
  }
  this.setData(newdata);
};