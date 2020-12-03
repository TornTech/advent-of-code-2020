const fs = require('fs');
const data = fs.readFileSync('day3.txt').toString();
const input = data.split('\r\n');


function slide(array, right, down) {
  var xPos = 0;
  var yPos = 0;
  var trees = 0;

  width = array[0].length

  while (yPos < array.length - 1 ) {
    yPos = yPos + down;
    xPos = (xPos + right) % width;

    if (array[yPos][xPos] === "#") {
      trees++;
    }
  }

  return trees;
}

slide(input,1,1) * slide(input,3,1) * slide(input,5,1) *  slide(input,7,1) * slide(input,1,2)