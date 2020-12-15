const fs = require('fs');
const data = fs.readFileSync('day2.txt').toString();
const input = data.split('\r\n');

const pattern = /(\d+)-(\d+) (\w): (\S+)/;

function partOne(input) {
    const result = input.filter(entry => {
        const [_, min, max, targetChar, password] = entry.match(pattern);
        const charCount = [...password].filter(char => char === targetChar).length;
        
        return parseInt(min) <= charCount && charCount <= parseInt(max);
    }).length;

    return result;
}

function partTwo(input) {
    const result = input.filter(entry => {
        const [_, index1, index2, targetChar, password] = entry.match(pattern);
        const char1 = password[index1 - 1];
        const char2 = password[index2 - 1];
        
        return char1 === targetChar ^ char2 === targetChar;
    }).length;

    return result;
}

console.log("Part one answer is: " + partOne(input));
console.log("Part two answer is: " + partTwo(input));