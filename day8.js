const fs = require('fs');
const data = fs.readFileSync('day8.txt').toString();
const input = data.split('\r\n');

// Regex pattern for each line of input
const pattern = /(\w{3}) ([+-]\d+)/

// Parse the regex pattern into an array of instruction objects
const instructions = input.map(instruction => {
    const [_, type, numString] = instruction.match(pattern);
    const num = parseInt(numString);
    
    return {type, num};
})

// Answer for part one
const partOne = (accumulator = 0, index = 0, visited = new Set()) => {
    if (visited.has(index)) {
        return accumulator;
    };

    const {type, num} = (instructions[index] || {});
    const nextVisited = new Set([...visited, index])

    if (index === instructions.length) {
        return accumulator
    } else if (type === "acc") {
        return partOne(accumulator + num, index + 1, nextVisited);
    } else if (type === "jmp") {
        return partOne(accumulator, index + num, nextVisited);
    } else {
        return partOne(accumulator , index + 1, nextVisited);
    }
}

const partTwo = (index = 0, accumulator = 0, visited = new Set(), foundMistake = false) => {
    const {type, num} = instructions[index] || {};
    const nextVisited = new Set([...visited, index]);

    if (index === instructions.length) {
        return accumulator;
    } else if (visited.has(index)) {
        return -1;
    } else if (type === "acc") {
        return partTwo(index + 1, accumulator + num, nextVisited, foundMistake);
    } else if (type === "jmp") {
        if (foundMistake) {
            return partTwo(index + num, accumulator, nextVisited, true);
        } else {
            return Math.max(
                partTwo(index + num, accumulator, nextVisited, false),
                partTwo(index + 1, accumulator, nextVisited, true)
            )
        }
    } else {
        if (foundMistake) {
            return partTwo(index + 1, accumulator, nextVisited, true);
        } else {
            return Math.max(
                partTwo(index + 1, accumulator, nextVisited, false),
                partTwo(index + num, accumulator, nextVisited, true)
            )
        }
    }
}

console.log("Part one answer is: " + partOne());
console.log("Part one answer is: " + partTwo());