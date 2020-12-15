const fs = require('fs');
const data = fs.readFileSync('day1.txt').toString();
const input = data.split('\r\n').map(Number);

function sumto2020(input) {
  for (var i = 0; i < input.length; i++) {
    for (var j = 1; j < input.length; j++) {
      for (var k = 2; k < input.length; k++) {
        if ((input[i] + input[j] + input[k]) === 2020) {
          return input[i] * input [j] * input [k];
        }
      }
    }
  }
}