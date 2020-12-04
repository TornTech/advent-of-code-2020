const fs = require('fs');
const data = fs.readFileSync('day4.txt').toString();
const input = data.split('\r\n');

// console.log(input)

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
        passport.hasOwnProperty('pid') &&
        passportValid(passport)) {
          validPassports++;
        }
  }
  return validPassports
}
countValidPassports(cleanPasspoortList)

function passportValid(passport) {
  if (validBirthYear(passport.byr) &&
      validIssueYear(passport.iyr) &&
      validExpYear(passport.eyr)   &&
      validHeight(passport.hgt)    &&
      validHairColor(passport.hcl) &&
      validEyeColor(passport.ecl)  &&
      validPassportID(passport.pid)) {
    return true;
  } else {
    return false;
  }
}

function validBirthYear(year) {
  return year >= 1920 && year <= 2002;
}

function validIssueYear(year) {
  return year >= 2010 && year <= 2020;
}

function validExpYear(year) {
  return year >= 2020 && year <= 2030;
}

function validHeight(height) {
  var cm;
  var location;

  if (height.indexOf("in") === -1) {
    cm = true;
    location = height.indexOf("cm");
  } else {
    cm = false;
    location = height.indexOf("in");
  }

  var numberHeight = height.substring(0,location);
  
  if (cm) {
    return numberHeight >= 150 && numberHeight <= 193;
  } else {
    return numberHeight >= 59 && numberHeight <= 76;
  }
}

function validHairColor(color) {
  
  return color[0] === "#" && 
         color.length === 7 &&
         ((color[1].charCodeAt(0) >= 97 && color[1].charCodeAt(0) <= 102) || (color[1] >= 0 && color[1] <= 9)) &&
         ((color[2].charCodeAt(0) >= 97 && color[2].charCodeAt(0) <= 102) || (color[2] >= 0 && color[2] <= 9)) &&
         ((color[3].charCodeAt(0) >= 97 && color[3].charCodeAt(0) <= 102) || (color[3] >= 0 && color[3] <= 9)) &&
         ((color[4].charCodeAt(0) >= 97 && color[4].charCodeAt(0) <= 102) || (color[4] >= 0 && color[4] <= 9)) &&
         ((color[5].charCodeAt(0) >= 97 && color[5].charCodeAt(0) <= 102) || (color[5] >= 0 && color[5] <= 9)) &&
         ((color[6].charCodeAt(0) >= 97 && color[6].charCodeAt(0) <= 102) || (color[6] >= 0 && color[6] <= 9))
}

function validEyeColor(color) {
  return color === "amb" ||
         color === "blu" ||
         color === "brn" ||
         color === "gry" ||
         color === "grn" ||
         color === "hzl" ||
         color === "oth"         
}
      
function validPassportID(id) {
  return id.length === 9 &&
         !isNaN(id)
}

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