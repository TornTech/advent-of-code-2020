const fs = require('fs');
const data = fs.readFileSync('day5.txt').toString();
const input = data.split('\r\n');

var seatCombos =[]
function makeSeatID(seats) {
  var seatIDs = [];
  var column, row;

  seats.forEach(function(seat, i) {
    row = rowFinder(seat)
    column = columnFinder(seat)

    seatIDs[i] = (row * 8 + column)
    seatCombos[i] = [row, column]
  })
  return seatIDs;
}

makeSeatID(input)

function findMissingSeat(seatsIDs) {
    const seatIds = makeSeatID(input);
    seatIds.sort((a, b) => a - b);

    for (let i = 0; i < seatIds.length; i++) {
        if (seatIds[i + 1] !== undefined && seatIds[i + 1] !== seatIds[i] + 1) {
            return seatIds[i] + 1;
        }
    }
}
findMissingSeat(seatCombos)

// HELPER FUNCTIONS:

function rowFinder(location) {
  var row = [0,127];

  location = location.substring(0,7).split('')
  location.forEach(function(r) {
    if (r === "F") {
      row[1] = Math.floor((row[1]-row[0]) / 2) + row[0];
    } else {
      row[0] = Math.ceil((row[1]-row[0]) / 2) + row[0];
    }
  })
  return row[0]
}

function columnFinder(location) {
  var column = [0,7];

  location = location.substring(7).split('');
  location.forEach(function(c) {
    if (c === "L") {
      column[1] = Math.floor((column[1]-column[0]) / 2) + column[0];
    } else {
      column[0] = Math.ceil((column[1]-column[0]) / 2) + column[0];
    }
  })
  return column[0]
}