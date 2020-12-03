const fs = require('fs');
const data = fs.readFileSync('day2.txt').toString();
const input = data.split('\r\n');

array = [];
function convertToArrayList(input) {
  for (var i = 0; i < input.length; i++) {
    array[i] = input[i].split(" ");
  }
}
convertToArrayList(input)

newArray = []
function convertToObjectList(array) {
  for (var i = 0; i < array.length; i++) {
    object = {}
    dashIndex = array[i][0].search("-")
    object["min"] = parseInt(array[i][0].substring(0,dashIndex));
    object["max"] = parseInt(array[i][0].substring(dashIndex + 1));
    object["letter"] = array[i][1].substring(0,1);
    object["password"] = array[i][2];
    newArray[i] = object
  }
}
convertToObjectList(array)

function checkIfValid(min, max, letter, password) {
  count = 0;
  for (var i = 0; i < password.length; i++) {
    if (password[i] === letter) {
      count++
    }
  }
  if (count >= min && count <= max) {
    return 1;
  } else {
    return 0;
  }
}

function checkIfValid2(min, max, letter, password) {
  count = 0;
  if (password[min-1]===letter) {
    count++
  }

  if (password[max-1]===letter) {
    count++
  }

  if (count === 1) {
    return 1
  } else {
    return 0
  }
}


function countValid(objectlist) {
  validCount = 0;
  for (var i = 0; i < objectlist.length; i++) {
    min = objectlist[i].min;
    max = objectlist[i].max;
    letter = objectlist[i].letter;
    password = objectlist[i].password;
    if (checkIfValid2(min, max, letter, password) === 1) {
      validCount++;
    }
  }
  return validCount;
}

countValid(newArray)



