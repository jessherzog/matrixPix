
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
      // context.transform(0,0,0,0,0,0);
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

CanvasImage.prototype.hoverPixel = function(e, canv, x1, y1, x2, y2) {

  function findPos(obj) {
    var curleft = 0, curtop = 0;  
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
    return { x: curleft, y: curtop };
  }
  var pos = findPos( canv );    

  var mouseX = e.pageX - pos.x;
  var mouseY = e.pageY - pos.y;
  var pxData = this.context.getImageData(mouseX, mouseY, 9, 9).data;

  // $('pixel').setAttribute("style", "background-color: rgb(" + pxData[16] + "," + pxData[17] + "," + pxData[18] + ");");  
  // $('pxR').setAttribute("style", "background-color: rgb(" + pxData[16] + ",0,0);");  
  // $('pxG').setAttribute("style", "background-color: rgb(0," + pxData[17] + ",0);");  
  // $('pxB').setAttribute("style", "background-color: rgb(0,0," + pxData[18] + ");");    

  this.context.beginPath();
  this.context.moveTo(x1, y1);
  this.context.lineTo(mouseX +10, mouseY +10);
  this.context.moveTo(x2, y2);
  this.context.lineTo(mouseX +10, mouseY +10);
  this.context.stroke();

  transformador1 = new CanvasImage( canv, this.image.src );

  $('m00').setAttribute("style", "background-color: rgb(" + pxData[0] + "," + pxData[1] + "," + pxData[2] + ");"); 
  $('m00-txt').innerHTML = "r " + pxData[0] + "<br> g " + pxData[1] + "<br> b " + pxData[2];

  $('m01').setAttribute("style", "background-color: rgb(" + pxData[4] + "," + pxData[5] + "," + pxData[6] + ");"); 
  $('m01-txt').innerHTML = "r " + pxData[4] + "<br> g " + pxData[5] + "<br> b " + pxData[6];

  $('m02').setAttribute("style", "background-color: rgb(" + pxData[8] + "," + pxData[9] + "," + pxData[10] + ");"); 
  $('m02-txt').innerHTML = "r " + pxData[8] + "<br> g " + pxData[9] + "<br> b " + pxData[10];

  $('m10').setAttribute("style", "background-color: rgb(" + pxData[12] + "," + pxData[13] + "," + pxData[14] + ");"); 
  $('m10-txt').innerHTML = "r " + pxData[12] + "<br> g " + pxData[13] + "<br> b " + pxData[14];

  $('m11').setAttribute("style", "background-color: rgb(" + pxData[16] + "," + pxData[17] + "," + pxData[18] + ");"); 
  $('m11-txt').innerHTML = "r " + pxData[16] + "<br> g " + pxData[17] + "<br> b " + pxData[18];

  $('m12').setAttribute("style", "background-color: rgb(" + pxData[20] + "," + pxData[21] + "," + pxData[22] + ");"); 
  $('m12-txt').innerHTML = "r " + pxData[20] + "<br> g " + pxData[21] + "<br> b " + pxData[22];

  $('m20').setAttribute("style", "background-color: rgb(" + pxData[24] + "," + pxData[25] + "," + pxData[26] + ");"); 
  $('m20-txt').innerHTML = "r " + pxData[24] + "<br> g " + pxData[25] + "<br> b " + pxData[26];

  $('m21').setAttribute("style", "background-color: rgb(" + pxData[28] + "," + pxData[29] + "," + pxData[30] + ");"); 
  $('m21-txt').innerHTML = "r " + pxData[28] + "<br> g " + pxData[29] + "<br> b " + pxData[30];

  $('m22').setAttribute("style", "background-color: rgb(" + pxData[32] + "," + pxData[33] + "," + pxData[34] + ");"); 
  $('m22-txt').innerHTML = "r " + pxData[32] + "<br> g " + pxData[33] + "<br> b " + pxData[34];

  canv.onmouseout = function(e){

    $('m00-txt').innerHTML = "";
    $('m01-txt').innerHTML = "";
    $('m02-txt').innerHTML = "";
    $('m10-txt').innerHTML = "";
    $('m11-txt').innerHTML = "";
    $('m12-txt').innerHTML = "";
    $('m20-txt').innerHTML = "";
    $('m21-txt').innerHTML = "";
    $('m22-txt').innerHTML = "";

  }

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