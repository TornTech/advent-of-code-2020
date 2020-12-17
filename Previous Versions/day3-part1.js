const fs = require('fs');
const data = fs.readFileSync('day3.txt').toString();
const input = data.split('\r\n');

var xPos = 0;
var yPos = 0;

trees = 0

function slide(array) {
  while (yPos < array.length - 1 ) {
    yPos++;
    xPos = (xPos+3) % 31;

    if (array[yPos][xPos] === "#") {
      trees++;
    }
  }
  return trees;
}

slide(input);