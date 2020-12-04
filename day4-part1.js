const fs = require('fs');
const data = fs.readFileSync('day4.txt').toString();
const input = data.split('\r\n');

function splitByPerson(list) {
  passportList = [];
  var i = 0;
  var j = 0;

  while (i < list.length) {
    if (list[i] === '') {
      i++;
      j++;
    } else if (passportList[j] === undefined) {
      passportList[j] = list[i]
      i++
    } else {
      passportList[j] = passportList[j].concat(" " + list[i]);
      i++;
    }
  }
}
splitByPerson(input)

function arrayToObject(array) {

  cleanPasspoortList = [];

  for (var i = 0; i < array.length; i++) {

    var passportFields = [];
    passportFields = array[i].split(" ");

    var passport = {}
    for (var j = 0; j < passportFields.length; j++) {

      splitAt = passportFields[j].indexOf(":");

      fieldName = passportFields[j].substring(0,splitAt);
      fieldInput = passportFields[j].substring(splitAt + 1);
      
      passport[fieldName] = fieldInput;
    }

    cleanPasspoortList[i] = passport;
  }
}
arrayToObject(passportList)

var validPassports = 0;

function countValidPassports(list) {
  for (var i = 0; i < list.length; i++) {
    passport = list[i];

    if (passport.hasOwnProperty('byr') &&
        passport.hasOwnProperty('iyr') &&
        passport.hasOwnProperty('eyr') &&
        passport.hasOwnProperty('hgt') &&
        passport.hasOwnProperty('hcl') &&
        passport.hasOwnProperty('ecl') &&
        passport.hasOwnProperty('pid')) {
          validPassports++;
        }
  }
  return validPassports
}
countValidPassports(cleanPasspoortList)

// required:
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)

// optional:
// cid (Country ID)