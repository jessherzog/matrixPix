// PRESET FILTERS
var matrices = [
  {
    name: 'outline',
    data:
     [[ 0,  -1,  0],
      [ -1,  5,  -1],
      [ 0,  -1,  0]]
  },
  {
    name: 'sharpen-mean-removal',
    data:
     [[-1, -1, -1],
      [-1,  9, -1],
      [-1, -1, -1]]
  },
  {
    name: 'sharpen-1',
    data:
     [[ 0, -3,  0],
      [-3, 21, -3],
      [ 0, -3,  0]]
  },
  {
    name: 'blur-0',
    data:
     [[ 1,  2,  1],
      [ 2,  4,  2],
      [ 1,  2,  1]]
  },
  {
    name: 'blur-1',
    data:
     [[ 1,  1,  1],
      [ 1,  1,  1],
      [ 1,  1,  1]]
  },
  {
    name: 'emboss-0',
    data:
     [[ 1,  1, -1],
      [ 1,  3, -1],
      [ 1, -1, -1]],
  },
  {
    name: 'emboss-1',
    data:
     [[ 2,  0,  0],
      [ 0, -1,  0],
      [ 0,  0, -1]],
    offset: 127,
  },
  {
    name: 'emboss-2',
    data:
     [[ -18,  -9,  0],
      [ -9, 9,  9],
      [ 0,  9, 18]]
  },
  {
    name: 'emboss-3',
    data:
     [[ 2,  22,  1],
      [ 22, 1,  -22],
      [ 1,  -22,  -2]],
  },
  {
    name: 'edge-detect-0',
    data:
     [[ 1,  1,  1],
      [ 1, -7,  1],
      [ 1,  1,  1]],
  },
  {
    name: 'edge-detect-1',
    data:
     [[ 0,  9,  0],
      [ 9, -36,  9],
      [ 0,  9,  0]],
  },
  {
    name: 'edge-detect-2',
    data:
     [[-5,  0,  0],
      [ 0,  0,  0],
      [ 0,  0,  5]],
  },
  {
    name: 'edge-detect-3',
    data:
     [[0,  1,  0],
      [ 1,  -4,  1],
      [ 0,  1,  0]],
  },
  {
    name: 'edge-enhance',
    data:
     [[0,  0,  0],
      [ -1,  1,  0],
      [ 0,  0,  0]],
  },
  {
    name: 'sobel-top',
    data:
     [[ 1,  2,  1],
      [ 0,  0,  0],
      [ -1,  -2,  -1]]
  },
  {
    name: 'sobel-bottom',
    data:
     [[ -1,  -2,  -1],
      [ 0,  0,  0],
      [ 1,  2,  1]]
  },
  {
    name: 'sobel-left',
    data:
     [[ 1,  0,  -1],
      [ 2,  0,  -2],
      [ 1,  0,  -1]]
  },
  {
  name: 'sobel-right',
    data:
     [[ -1,  0,  1],
      [ -2,  0,  2],
      [ -1,  0,  1]]
  }
];

function addRecipeButtons() {

  matrices.forEach(function(m) {

    var b = document.createElement('button');
    b.title = m.name;
    b.className = "prev-filter";
    b.id = "pfil-" + m.name;
    b.innerHTML = m.name;
    // b.innerHTML = m.data[0] + '<br>' + m.data[1] + '<br>' + m.data[2];

    b.onclick = function() {
      setConvolutionMatrix(m.data, m.divisor, m.offset);
      $('fn').innerHTML = m.data[0] + '<br>' + m.data[1] + '<br>' + m.data[2];
    };
    
    $('buttons').appendChild(b);
    $('buttons').appendChild(document.createElement('br'));


  });  

}

