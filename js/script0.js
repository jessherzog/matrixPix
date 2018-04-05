console.log("hello");

var transformador;
var transformador0;
var transformador1;

// MODES
$('playMode').onclick = function(){
  $("canvas").removeAttribute("style", "display: none;");
  $("canvas0").removeAttribute("style", "display: none;");
  $("m-holder").removeAttribute("style", "display: none;");
  $("actions").removeAttribute("style", "visibility: hidden;");
  $("button-contain").removeAttribute("style", "visibility: hidden;");
};

$("story-mode").onclick = function(){
  $("choose-txt").setAttribute("style", "display: block;");
  $("canvas").setAttribute("style", "display: none;");
  $("canvas0").setAttribute("style", "display: none;");
  $("m-holder").setAttribute("style", "display: none;");
  $("actions").setAttribute("style", "visibility: hidden;");
  $("button-contain").setAttribute("style", "visibility: hidden;");
};

// SELECT + LOAD IMAGE
function imgChoosen(src, canv) {
  $(canv).removeAttribute("style", "display: none;");

  var canvas=document.getElementById(canv);
  var ctx=canvas.getContext("2d");
  var canvas2=document.createElement("canvas");
  var ctx2=canvas2.getContext("2d");

  var canvas0=document.getElementById(canv +"0");
  var ctx0=canvas0.getContext("2d");
  var canvas20=document.createElement("canvas");
  var ctx20=canvas20.getContext("2d");

  var cw=canvas.width;
  var ch=canvas.height;

  var newPixelCount;
  var accumPixelCount=0;
  var totPixels;
  var img=new Image();
  img.onload=start;
  img.src=src;

  function start(){
      cw=canvas.width=canvas2.width=img.width;
      ch=canvas.height=canvas2.height=img.height;

      cw0=canvas0.width=canvas20.width=img.width;
      ch0=canvas0.height=canvas20.height=img.height;

      newPixelCount=cw*ch/200;
      totPixels=cw*ch;

      t1=performance.now();
      requestAnimationFrame(animate);
  }

  function animate(){
      ctx2.beginPath();
      ctx20.beginPath();

      for(var i=0;i<newPixelCount;i++){
          accumPixelCount++;
          if(accumPixelCount<totPixels){
              var y=parseInt(accumPixelCount/cw);
              var x=accumPixelCount-y*cw;
              ctx2.rect(x,y,1,1);
              ctx20.rect(x,y,1,1);
          }
      }
      ctx2.fill();
      ctx.clearRect(0,0,cw,ch);
      ctx.drawImage(canvas2,0,0);
      ctx.globalCompositeOperation='source-atop';
      ctx.drawImage(img,0,0);
      ctx.globalCompositeOperation='source-over';
      //
      ctx20.fill();
      ctx0.clearRect(0,0,cw,ch);
      ctx0.drawImage(canvas20,0,0);
      ctx0.globalCompositeOperation='source-atop';
      ctx0.drawImage(img,0,0);
      ctx0.globalCompositeOperation='source-over';
      //
      if(accumPixelCount<totPixels){
          requestAnimationFrame(animate);
      }else{
          transformador = new CanvasImage( $(canv), src );
          transformador0 = new CanvasImage( $(canv +"0"), src );
      }
  }

  function animateDrawImage(){
      ctx2.beginPath();
      ctx20.beginPath();

      for(var i=0;i<newPixelCount;i++){
          accumPixelCount++;
          if(accumPixelCount<totPixels){
              var y=parseInt(accumPixelCount/cw);
              var x=accumPixelCount-y*cw;
              ctx.drawImage(img,x,y,1,1,x,y,1,1);
              ctx0.drawImage(img,x,y,1,1,x,y,1,1);
          }
      }
      //
      if(accumPixelCount<totPixels){
          requestAnimationFrame(animate);
      }else{
          transformador = new CanvasImage( $(canv), src );
          transformador0 = new CanvasImage( $(canv +"0"), src );
      }
  }
  
  $("choose-txt").setAttribute("style", "display: none");
};

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
      that.original = that.getData(0,0); // remember the original pixels
      $('choose-img').setAttribute("style", "width: " + canvas.width + "px");
      $('img-gallery').setAttribute("style", "width: " + canvas.width + "px");
    context.restore();
  };

  i.src = src;
  
  // cache these
  this.context = context;
  this.image = i;

}

CanvasImage.prototype.getData = function(xPos, yPos) {
  return this.context.getImageData(xPos, yPos, canvas.width, canvas.height);
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

// PIXEL EYE DROPPER
$("canvas").onmouseover = function(){
  this.onmousemove = function(e){
    transformador.hoverPixel( e, $('canvas'), $('canvas').width, 0, $('canvas').width, $('canvas').height );
  };
};

$("canvas0").onmouseover = function(){
  this.onmousemove = function(e){
    transformador0.hoverPixel( e, $('canvas0'), 0, 0, 0, $('canvas0').height );
  };
  this.onclick = function(e){
    console.log("oo");
  };
};

// ID SELECTOR HELP
function $(id) {return document.getElementById(id)};


