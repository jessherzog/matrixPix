function myPrint(){
  window.print();
}

$('rand-action').onclick = function(){
  $('m00').value = Math.floor(Math.random() * 19) - 9;
  $('m01').value = Math.floor(Math.random() * 19) - 9;
  $('m02').value = Math.floor(Math.random() * 19) - 9;

  $('m10').value = Math.floor(Math.random() * 19) - 9;
  $('m11').value = Math.floor(Math.random() * 19) - 9;
  $('m12').value = Math.floor(Math.random() * 19) - 9;

  $('m20').value = Math.floor(Math.random() * 19) - 9;
  $('m21').value = Math.floor(Math.random() * 19) - 9;
  $('m22').value = Math.floor(Math.random() * 19) - 9;

  $('fn-00').innerHTML = $('m00').value;
  $('fn-01').innerHTML = $('m01').value;
  $('fn-02').innerHTML = $('m02').value;
  $('fn-10').innerHTML = $('m10').value;
  $('fn-11').innerHTML = $('m11').value;
  $('fn-12').innerHTML = $('m12').value;
  $('fn-20').innerHTML = $('m20').value;
  $('fn-21').innerHTML = $('m21').value;
  $('fn-22').innerHTML = $('m22').value;

  onMatrixChange();
};


$('reset').onclick = function(){
  $('m00').value = '0';
  $('m01').value = '0';
  $('m02').value = '0';

  $('m10').value = '0';
  $('m11').value = '1';
  $('m12').value = '0';

  $('m20').value = '0';
  $('m21').value = '0';
  $('m22').value = '0';

  $('fn-00').innerHTML = $('m00').value;
  $('fn-01').innerHTML = $('m01').value;
  $('fn-02').innerHTML = $('m02').value;
  $('fn-10').innerHTML = $('m10').value;
  $('fn-11').innerHTML = $('m11').value;
  $('fn-12').innerHTML = $('m12').value;
  $('fn-20').innerHTML = $('m20').value;
  $('fn-21').innerHTML = $('m21').value;
  $('fn-22').innerHTML = $('m22').value;

  changedImage.reset();
};

