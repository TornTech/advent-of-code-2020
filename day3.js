const fs = require('fs');
const data = fs.readFileSync('day3.txt').toString();
const input = data.split('\r\n');

function partOne(array) {
    var xPos = 0;
    var yPos = 0;
    var trees = 0

    while (yPos < array.length - 1) {
        yPos++;
        xPos = (xPos + 3) % 31;

        if (array[yPos][xPos] === "#") {
            trees++;
        }
    }
    return trees;
}

function partTwo(array, right, down) {
    var xPos = 0;
    var yPos = 0;
    var trees = 0;

    width = array[0].length

    while (yPos < array.length - 1) {
        yPos = yPos + down;
        xPos = (xPos + right) % width;

        if (array[yPos][xPos] === "#") {
            trees++;
        }
    }

    return trees;
}

console.log("Part one answer is: " + partOne(input));
console.log("Part two answer is: " +
    partTwo(input, 1, 1) * 
    partTwo(input, 3, 1) * 
    partTwo(input, 5, 1) * 
    partTwo(input, 7, 1) * 
    partTwo(input, 1, 2))
