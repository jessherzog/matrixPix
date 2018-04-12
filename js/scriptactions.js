function refreshVals(){	  

	  var a = $('m00').value;  
	  var b = $('m01').value;  
	  var c = $('m02').value;
	  var d = $('m10').value;  
	  var e = $('m11').value;  
	  var f = $('m12').value;
	  var g = $('m20').value;  
	  var h = $('m21').value;  
	  var i = $('m22').value;

	  var customMatrix = [{
	  name: 'custom',
	  data:
	   [[ Number(a),  Number(b),  Number(c)],
	    [ Number(d),  Number(e),  Number(f)],
	    [ Number(g),  Number(h),  Number(i)]]
	  }];

	  customMatrix.forEach(function(m) {

		  var m = customMatrix[0];

		  transformador0.reset();
		  transformador0.convolve(m.data, m.divisor, m.offset);

		  $('fn').innerHTML = m.data[0] + '<br>' + m.data[1] + '<br>' + m.data[2];

	  });
};


// ACTIONS
$('cursor').onclick = function(){
  document.onmousemove = function(e){
    $('zed-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
    $('pos-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
    $('neg-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");

    $('m00').onclick = function() { this.value = this.value; refreshVals(); };
    $('m01').onclick = function() { this.value = this.value; refreshVals(); };
    $('m02').onclick = function() { this.value = this.value; refreshVals(); };
    $('m10').onclick = function() { this.value = this.value; refreshVals(); };
    $('m11').onclick = function() { this.value = this.value; refreshVals(); };
    $('m12').onclick = function() { this.value = this.value; refreshVals(); };
    $('m20').onclick = function() { this.value = this.value; refreshVals(); };
    $('m21').onclick = function() { this.value = this.value; refreshVals(); };
    $('m22').onclick = function() { this.value = this.value; refreshVals(); };
  };
};

// ZERO ACTIONS
$('zed-action').onclick = function(){
  document.onmousemove = function(e){
    var mouseX = e.pageX - 1000;
    var mouseY = e.pageY - 100;
    $('zed-img copy').setAttribute("style", "display: visible; left:" + mouseX + "px; top:" + mouseY + "px;");
    $('pos-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
    $('neg-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");

    $('m00').onclick = function() { this.value = 0; refreshVals(); };
    $('m01').onclick = function() { this.value = 0; refreshVals(); };
    $('m02').onclick = function() { this.value = 0; refreshVals(); };
    $('m10').onclick = function() { this.value = 0; refreshVals(); };
    $('m11').onclick = function() { this.value = 0; refreshVals(); };
    $('m12').onclick = function() { this.value = 0; refreshVals(); };
    $('m20').onclick = function() { this.value = 0; refreshVals(); };
    $('m21').onclick = function() { this.value = 0; refreshVals(); };
    $('m22').onclick = function() { this.value = 0; refreshVals(); };
  };
};

// POSTIVE INTEGER ACTIONS
$('pos-action').onclick = function(){
    document.onmousemove = function(e){
      var mouseX = e.pageX - 900;
      var mouseY = e.pageY - 100;
      $('pos-img copy').setAttribute("style", "display: visible; left:" + mouseX + "px; top:" + mouseY + "px;");
      $('zed-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
      $('neg-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
    };
    $('m00').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m01').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m02').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m10').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m11').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m12').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m20').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m21').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
    $('m22').onclick = function() { this.value = this.value * $('pos').value; refreshVals(); };
};

// NEGATIVE INTEGER ACTIONS
$('neg-action').onclick = function(){
    document.onmousemove = function(e){
      var mouseX = e.pageX - 900;
      var mouseY = e.pageY - 100;
      $('neg-img copy').setAttribute("style", "display: visible; left:" + mouseX + "px; top:" + mouseY + "px;");
      $('zed-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
      $('pos-img copy').setAttribute("style", "display: none; left: 0px; top: 0px;");
    };
    //  if hover over a matrix value, highlight/outline background color 
    //  if clicked on a matrix value, multiply by -2
    $('m00').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m01').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m02').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m10').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m11').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m12').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m20').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m21').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };
    $('m22').onclick = function() { this.value = this.value * $('neg').value;  refreshVals(); };

};