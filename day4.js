const fs = require('fs');
const data = fs.readFileSync('day4.txt').toString();
const input = data.trim().split('\r\n\r\n');

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const partOne = (input) => {
    const entrySets = input.map(entry =>
        new Set(
            entry.replace(/\r\n/g, " ")
                .split(" ")
                .map(keyValuePair => keyValuePair.split(":")[0]))
    );
    
    const validPassports = entrySets.filter(keySet =>  
        requiredKeys.every(key => keySet.has(key))
    );
    
    return validPassports.length;;
}

const partTwo = (input) => {
    const entryObjects = input.map(entry =>
        entry
        .replace(/\r\n/g, " ")
        .split(" ")
        .map(keyValuePair => keyValuePair.split(":"))
        .reduce((obj, [key, value]) => ({...obj, [key]: value}), {})
    );
    
    const checkInRange = (numString, min, max) => {
        const num = parseInt(numString);
        return min <= num && num <= max;
    }
    
    const completenessCheck = obj => requiredKeys.every(key => key in obj)
    
    const validityCheck = ({byr, iyr, eyr, hgt, hcl, ecl, pid}) => {
        const byrCheck = checkInRange(byr, 1920, 2002);
        const iyrCheck = checkInRange(iyr, 2010, 2020);
        const eyrCheck = checkInRange(eyr, 2020, 2030);
        const hgtCheck = /^(?:(?:(?:59|6\d|7[0-6])in)|(?:(?:1[5-8]\d|19[0-3])cm))$/.test(hgt);
        const hclCheck = /^#[\w\d]{6}$/.test(hcl);
        const eclCheck = /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl);
        const pidCheck = /^[\d]{9}$/.test(pid);
    
        const results = {byrCheck , iyrCheck , eyrCheck , hgtCheck, hclCheck , eclCheck , pidCheck};
        return Object.values(results).every(bool => bool);
    }
    
    const validPassports = entryObjects.filter(
        entry => completenessCheck(entry) && validityCheck(entry)
    );

    return validPassports.length;
}
    
console.log("Part one answer is: " + partOne(input));
console.log("Part two answer is: " + partTwo(input));
