const fs = require('fs');
const data = fs.readFileSync('day9.txt').toString();
const input = data.split('\r\n').map(n => parseInt(n));

const preamble = 25;
const portOutputs = input.slice(preamble)

// Returns true if two numbers in array add up to specified number
const numInArray = (array, target) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (i === j || j < i) {
                continue;
            } else if (array[i] + array[j] === target) {
                return true;
            }
        }
    }
    return false;
} 

// Returns number that is not valid
const partOne = () => {
    for (let i = 0; i < portOutputs.length; i++) {
        const array = input.slice(i, i + preamble);
        const target = input[i + preamble];

        if (!numInArray(array, target)) return target;
    }
    return false;
}

const invalidNum = partOne();
console.log("Part one answer is:", partOne())

const partTwo = (target) => {
    let startIndex = 0;
    let end = 1;

    do {
        let array = input.slice(startIndex, startIndex + end);
        let sum = array.reduce((sum, acc) => sum + acc, 0)

        if (sum === invalidNum) {
            return Math.min(...array) + Math.max(...array);
        } else if (sum < invalidNum) {
            end++;
        } else {
            startIndex++;
            end = 1;
        }

    } while (startIndex < input.length)

}

console.log("Part two answer is:", partTwo(invalidNum))