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

  $('fn').innerHTML = $('m00').value + ',' + $('m01').value + ',' + $('m02').value + '<br>' + $('m10').value + ',' + $('m11').value + ',' + $('m12').value + '<br>' + $('m20').value + ',' + $('m21').value + ',' + $('m22').value;

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

  $('fn').innerHTML = $('m00').value + ',' + $('m01').value + ',' + $('m02').value + '<br>' + $('m10').value + ',' + $('m11').value + ',' + $('m12').value + '<br>' + $('m20').value + ',' + $('m21').value + ',' + $('m22').value;

  changedImage.reset();
};