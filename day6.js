const fs = require('fs');
const data = fs.readFileSync('day6.txt').toString();
const input = data.split('\r\n\r\n');

const groups = input.map(group => group.split("\r\n"));

// Convert each character to binary representation
const charToBin = char => 1 << (char.charCodeAt() - 97);

// Convert each word to binary representation
const wordToBin = word => [...word].map(charToBin).reduce((result, bin) => result | bin, 0);

// Count how many bits are in each binary
const countSetBits = bin => bin ? countSetBits(bin >> 1) + (bin & 1) : 0;

// Calculate part one
const countGroupOr = group => 
    countSetBits(group.reduce((total, word) => total | wordToBin(word), 0));

const partOne = groups.map(countGroupOr).reduce((a, b) => a + b);

console.log("Part one answer is: " + partOne)

// Calculate part two
const countGroupAnd = group => 
    countSetBits(group.reduce((total, word) => total & wordToBin(word), (1 << 27) - 1));

const partTwo = groups.map(countGroupAnd).reduce((a, b) => a + b);

console.log("Part one answer is: " + partTwo)
    