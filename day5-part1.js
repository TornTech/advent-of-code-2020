const fs = require('fs');
const data = fs.readFileSync('day5.txt').toString();
const input = data.split('\r\n');

function makeSeatID(seats) {
  seatIDs = [];
  var column, row;

  seats.forEach(function(seat, i) {
    row = rowFinder(seat.substring(0,7))
    column = columnFinder(seat.substring(7))
    
    seatIDs[i] = (row * 8 + column)
  })
  return Math.max(...seatIDs)
}

makeSeatID(input)

function rowFinder(location) {
  var row = [0,127];
  location = location.split('')
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
  location = location.split('');
  location.forEach(function(r) {
    if (r === "L") {
      column[1] = Math.floor((column[1]-column[0]) / 2) + column[0];
    } else {
      column[0] = Math.ceil((column[1]-column[0]) / 2) + column[0];
    }
  })
  return column[0]
}