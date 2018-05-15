console.log("matrix");

function installMatrixHandlers() {

  console.log("installMatrixHandlers");

  $("m00").onchange = onMatrixChange;
  $("m01").onchange = onMatrixChange;
  $("m02").onchange = onMatrixChange;
  $("m10").onchange = onMatrixChange;
  $("m11").onchange = onMatrixChange;
  $("m12").onchange = onMatrixChange;
  $("m20").onchange = onMatrixChange;
  $("m21").onchange = onMatrixChange;
  $("m22").onchange = onMatrixChange;
}


function onMatrixChange() {

  console.log("matrixChange");

  const a = $('m00').value;  
  const b = $('m01').value;  
  const c = $('m02').value;
  const d = $('m10').value;  
  const e = $('m11').value;  
  const f = $('m12').value;
  const g = $('m20').value;  
  const h = $('m21').value;  
  const i = $('m22').value;

 
  const matrix =
    [
    [ Number(a),  Number(b),  Number(c)],
    [ Number(d),  Number(e),  Number(f)],
    [ Number(g),  Number(h),  Number(i)]
    ]
    ;

  setConvolutionMatrix(matrix);

  $('fn-00').innerHTML = matrix[0][0];
  $('fn-01').innerHTML = matrix[0][1];
  $('fn-02').innerHTML = matrix[0][2];
  $('fn-10').innerHTML = matrix[1][0];
  $('fn-11').innerHTML = matrix[1][1];
  $('fn-12').innerHTML = matrix[1][2];
  $('fn-20').innerHTML = matrix[2][0];
  $('fn-21').innerHTML = matrix[2][1];
  $('fn-22').innerHTML = matrix[2][2];

}

