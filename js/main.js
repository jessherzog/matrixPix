let identityImage;
let changedImage;
let currentMatrix;
let currentDivisor;
let currentOffset;


/////////////////////////////////////
// Set-up

function setIdentityImage(src) {
  identityImage = new CanvasImage( $("identity-image"), src);
}

function setChangedImage(src) {
  changedImage = new CanvasImage( $("changed-image"), src);
}

function setConvolutionMatrix(matrix, divisor, offset) {
  currentMatrix = matrix;
  currentDivisor = divisor;
  currentOffset = offset;

  changedImage.reset();
  changedImage.convolve(matrix, divisor, offset);

  $('m00').value = matrix[0][0];
  $('m01').value = matrix[0][1];
  $('m02').value = matrix[0][2];

  $('m10').value = matrix[1][0];
  $('m11').value = matrix[1][1];
  $('m12').value = matrix[1][2];

  $('m20').value = matrix[2][0];
  $('m21').value = matrix[2][1];
  $('m22').value = matrix[2][2];
}


/////////////////////////////////////
// Event Handlers

function onGalleryImageChoosen(src) {

  setIdentityImage(src);
  setChangedImage(src);

  setTimeout( () => {
    setConvolutionMatrix(currentMatrix, currentDivisor, currentOffset);
  }, 1000);
  
}


/////////////////////////////////////
// Setup
  function identityHover(e) {  

    $("identity-image-overlay").setAttribute("style", "cursor: none;");
    
    const canvas = $('identity-image-overlay');
    const context = canvas.getContext('2d'); 

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    context.clearRect(0, 0, canvas.width, canvas.height);

    var pxData = identityImage.context.getImageData(mouseX, mouseY, 3, 3).data;

    context.imageSmoothingEnabled = false; 
    context.mozImageSmoothingEnabled = false; 
    context.webkitImageSmoothingEnabled = false; 
    context.msImageSmoothingEnabled = false; 

    context.lineWidth = 1;
    context.globalAlpha = 1.0;
    context.strokeRect(mouseX-20, mouseY-20, 17, 17);

    // showMatrixColors(pxData);

    ///////////

    var zoomcanvas = $('zoom-identity');
    var zoomcontext = zoomcanvas.getContext('2d');

    zoomcontext.imageSmoothingEnabled = false; 
    zoomcontext.mozImageSmoothingEnabled = false; 
    zoomcontext.webkitImageSmoothingEnabled = false; 
    zoomcontext.msImageSmoothingEnabled = false; 

    zoomcontext.drawImage(
      $("identity-image"), Math.abs(mouseX-19), Math.abs(mouseY-19), 15, 15,
      0, 0, 300, 150
    );

    //// LINES OR NO LINES ?
    // zoomcontext.beginPath();
    // zoomcontext.moveTo(zoomcanvas.width/3, 0);
    // zoomcontext.lineTo(zoomcanvas.width/3, zoomcanvas.height);
    // zoomcontext.moveTo(zoomcanvas.width - zoomcanvas.width/3, zoomcanvas.height);
    // zoomcontext.lineTo(zoomcanvas.width - zoomcanvas.width/3, 0);
    // zoomcontext.moveTo(0, zoomcanvas.height/3);
    // zoomcontext.lineTo(zoomcanvas.width, zoomcanvas.height/3);
    // zoomcontext.moveTo(zoomcanvas.width, zoomcanvas.height - zoomcanvas.height/3);
    // zoomcontext.lineTo(0, zoomcanvas.height - zoomcanvas.height/3);
    // zoomcontext.stroke();

  };





  function changedHover(e) {  

    $("changed-image-overlay").setAttribute("style", "cursor: none;");
    
    const canvas = $('changed-image-overlay');
    const context = canvas.getContext('2d'); 

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // var pxData = identityImage.context.getImageData(mouseX-20, mouseY-20, 25, 25).data;

    context.imageSmoothingEnabled = false; 
    context.mozImageSmoothingEnabled = false; 
    context.webkitImageSmoothingEnabled = false; 
    context.msImageSmoothingEnabled = false; 

    context.lineWidth = 1;
    context.globalAlpha = 1.0;
    context.strokeRect(mouseX-20, mouseY-20, 17, 17);

  // function showMatrixColors(pxData) {
  //   $('m00').setAttribute("style", "background-color: rgb(" + pxData[120] + "," + pxData[120] + "," + pxData[120] + ");"); 
  //   $('m01').setAttribute("style", "background-color: rgb(" + pxData[140] + "," + pxData[140] + "," + pxData[140] + ");"); 
  //   $('m02').setAttribute("style", "background-color: rgb(" + pxData[160] + "," + pxData[160] + "," + pxData[160] + ");"); 
  //   $('m10').setAttribute("style", "background-color: rgb(" + pxData[220] + "," + pxData[220] + "," + pxData[220] + ");"); 
  //   $('m11').setAttribute("style", "background-color: rgb(" + pxData[240] + "," + pxData[240] + "," + pxData[240] + ");"); 
  //   $('m12').setAttribute("style", "background-color: rgb(" + pxData[260] + "," + pxData[260] + "," + pxData[260] + ");"); 
  //   $('m20').setAttribute("style", "background-color: rgb(" + pxData[320] + "," + pxData[320] + "," + pxData[320] + ");"); 
  //   $('m21').setAttribute("style", "background-color: rgb(" + pxData[340] + "," + pxData[340] + "," + pxData[340] + ");"); 
  //   $('m22').setAttribute("style", "background-color: rgb(" + pxData[360] + "," + pxData[360] + "," + pxData[360] + ");"); 
  // }

  //   showMatrixColors(pxData);

    ///////////

    var zoomcanvas = $('zoom-changed');
    var zoomcontext = zoomcanvas.getContext('2d');

    zoomcontext.imageSmoothingEnabled = false; 
    zoomcontext.mozImageSmoothingEnabled = false; 
    zoomcontext.webkitImageSmoothingEnabled = false; 
    zoomcontext.msImageSmoothingEnabled = false; 

    var x = Math.abs(mouseX-19);
    var y = Math.abs(mouseY-19);

    zoomcontext.drawImage(
      $("changed-image"), x, y, 15, 15,
      0, 0, 300, 150
    );

    
    // pos.x = x;
    // pos.y = y;

    var myImageData = zoomcontext.getImageData(0, 0, zoomcanvas.width, zoomcanvas.height);
    var data = myImageData.data;

    // for (var i = 0; i < data.length; i += 80) {
      // data[i]     = 255 - data[i];     // red
      // zoomcontext.font = "50px Arial";
      // zoomcontext.fillText("0", 15, 15);
    // }


    //// LINES OR NO LINES ?
    // zoomcontext.beginPath();
    // zoomcontext.moveTo(zoomcanvas.width/3, 0);
    // zoomcontext.lineTo(zoomcanvas.width/3, zoomcanvas.height);
    // zoomcontext.moveTo(zoomcanvas.width - zoomcanvas.width/3, zoomcanvas.height);
    // zoomcontext.lineTo(zoomcanvas.width - zoomcanvas.width/3, 0);
    // zoomcontext.moveTo(0, zoomcanvas.height/3);
    // zoomcontext.lineTo(zoomcanvas.width, zoomcanvas.height/3);
    // zoomcontext.moveTo(zoomcanvas.width, zoomcanvas.height - zoomcanvas.height/3);
    // zoomcontext.lineTo(0, zoomcanvas.height - zoomcanvas.height/3);
    // zoomcontext.stroke();


    // $("changed-image-overlay").onclick = (e) => {
    //   //click, save that coordinate.


    //     // Use an input to show the current value and let
    //     // the user set a new one
    //     var input = document.getElementById("theValue");

    //     // Reading the value, which was store as "theValue"
    //     if (localStorage && 'theValue' in localStorage) {
    //       input.value = localStorage.theValue;
    //     }

    //     document.getElementById("setValue").onclick = function () {
    //       // Writing the value
    //       localStorage && (localStorage.theValue = input.value);
    //     };

    //   context.font = "20px Arial";
    //   context.fillText("🔒", 10, 30);

    //   zoomcontext.drawImage(
    //     $("changed-image"), x, y, 15, 15,
    //     0, 0, 300, 150
    //   );

    //   //click again, unsaves
    // }

  };


function installIdentityHandlers() {
  $("identity-image-overlay").onmousemove = (e) => {

    identityHover(e);
    changedHover(e);

  };

  $("changed-image-overlay").onmousemove = (e) => {

    identityHover(e);
    changedHover(e);

  };

  $("identity-image-overlay").onmouseleave = (e)=>{
    const canvas = $('identity-image-overlay');
    const context = canvas.getContext('2d'); 
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function main() {
  setIdentityImage("img/a.jpg");
  setChangedImage("img/a.jpg");

  installIdentityHandlers();
  installMatrixHandlers();
  addRecipeButtons();
}


main();


// SELECT + LOAD IMAGE
// function imgChoosen(src) {
//   $(canv).removeAttribute("style", "display: none;");

//   var canvas=document.getElementById("identity-image");
//   var ctx=canvas.getContext("2d");
//   var canvas2=document.createElement("canvas");
//   var ctx2=canvas2.getContext("2d");

//   var canvas0=document.getElementById(canv +"0");
//   var ctx0=canvas0.getContext("2d");
//   var canvas20=document.createElement("canvas");
//   var ctx20=canvas20.getContext("2d");

//   var cw=canvas.width;
//   var ch=canvas.height;

//   var newPixelCount;
//   var accumPixelCount=0;
//   var totPixels;
//   var img=new Image();
//   img.onload=start;
//   img.src=src;

//   function start(){
//       cw=canvas.width=canvas2.width=img.width;
//       ch=canvas.height=canvas2.height=img.height;

//       cw0=canvas0.width=canvas20.width=img.width;
//       ch0=canvas0.height=canvas20.height=img.height;

//       newPixelCount=cw*ch/200;
//       totPixels=cw*ch;

//       t1=performance.now();
//       requestAnimationFrame(animate);
//   }

//   function animate(){
//       ctx2.beginPath();
//       ctx20.beginPath();

//       for(var i=0;i<newPixelCount;i++){

//           accumPixelCount++;
//           if(accumPixelCount<totPixels){
//               var y=parseInt(accumPixelCount/cw);
//               var x=accumPixelCount-y*cw;
//               ctx2.rect(x,y,1,1);
//               ctx20.rect(x,y,1,1);
//           }
//       }
//       ctx2.fill();
//       ctx.clearRect(0,0,cw,ch);
//       ctx.drawImage(canvas2,0,0);
//       ctx.globalCompositeOperation='source-atop';
//       ctx.drawImage(img,0,0);
//       ctx.globalCompositeOperation='source-over';
//       //
//       ctx20.fill();
//       ctx0.clearRect(0,0,cw,ch);
//       ctx0.drawImage(canvas20,0,0);
//       ctx0.globalCompositeOperation='source-atop';
//       ctx0.drawImage(img,0,0);
//       ctx0.globalCompositeOperation='source-over';
//       //
//       if(accumPixelCount<totPixels){
//           requestAnimationFrame(animate);
//       }else{
//           transformador = new CanvasImage( $(canv), src );
//           transformador0 = new CanvasImage( $(canv +"0"), src );
//       }
//   }


//   $("choose-txt").setAttribute("style", "display: none");
// };