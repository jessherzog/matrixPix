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

function installIdentityHandlers() {
  $("identity-image-overlay").onmousemove = (e) => {

    document.body.style.cursor = 'none';
    
    const canvas = $('identity-image-overlay');
    const context = canvas.getContext('2d'); 

    var cm = new CanvasMouse(context, {
      handleScale: true,
      handleTransforms: true
    });

    var pos = cm.getPos(e);

    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.beginPath();
    // context.moveTo(canvas.width, 0);
    // context.lineTo(pos.x+3, pos.y-13);
    // context.moveTo(canvas.width, canvas.height);
    // context.lineTo(pos.x+3, pos.y);
    // context.stroke();

    var pxData = identityImage.context.getImageData(pos.x, pos.y, 3, 3).data;

    // context.lineWidth=0.25;
    
    context.strokeRect(pos.x-21, pos.y-13, 8, 4);
    context.strokeRect(pos.x-13, pos.y-13, 8, 4);
    context.strokeRect(pos.x-5, pos.y-13, 8, 4);

    context.strokeRect(pos.x-21, pos.y-9, 8, 4);
    context.strokeRect(pos.x-13, pos.y-9, 8, 4);    
    context.strokeRect(pos.x-5, pos.y-9, 8, 4);
    
    context.strokeRect(pos.x-21, pos.y-5, 8, 4);
    context.strokeRect(pos.x-13, pos.y-5, 8, 4);
    context.strokeRect(pos.x-5, pos.y-5, 8, 4);

    context.lineWidth=1;

    showMatrixColors(pxData);
  };

  function showMatrixColors(pxData) {
    $('m00').setAttribute("style", "background-color: rgb(" + pxData[0] + "," + pxData[1] + "," + pxData[2] + ");"); 
    $('m01').setAttribute("style", "background-color: rgb(" + pxData[4] + "," + pxData[5] + "," + pxData[6] + ");"); 
    $('m02').setAttribute("style", "background-color: rgb(" + pxData[8] + "," + pxData[9] + "," + pxData[10] + ");"); 
    $('m10').setAttribute("style", "background-color: rgb(" + pxData[12] + "," + pxData[13] + "," + pxData[14] + ");"); 
    $('m11').setAttribute("style", "background-color: rgb(" + pxData[16] + "," + pxData[17] + "," + pxData[18] + ");"); 
    $('m12').setAttribute("style", "background-color: rgb(" + pxData[20] + "," + pxData[21] + "," + pxData[22] + ");"); 
    $('m20').setAttribute("style", "background-color: rgb(" + pxData[24] + "," + pxData[25] + "," + pxData[26] + ");"); 
    $('m21').setAttribute("style", "background-color: rgb(" + pxData[28] + "," + pxData[29] + "," + pxData[30] + ");"); 
    $('m22').setAttribute("style", "background-color: rgb(" + pxData[32] + "," + pxData[33] + "," + pxData[34] + ");"); 
  }

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