const fs = require('fs');
const data = fs.readFileSync('day1.txt').toString();
const input = data.split('\r\n').map(Number);

input.sort((a, b) => a - b);

const findTarget = (target, l = 0, r = input.length - 1) => {
    const num1 = input[l];
    const num2 = input[r];
    const sum = num1 + num2;

    if (l >= r) {
        return -1;
    } else if (sum === target) {
        return num1 * num2;
    } else if (sum < target) {
        return findTarget(target, l + 1, r);
    } else if (sum > target) {
        return findTarget(target, l, r - 1);
    }
};

let result = 1;
input.forEach(function (num) {
    const product = findTarget(2020 - num);

    if (product > -1) {
        result = result * num;
    }
})

console.log("Part one answer: " + findTarget(2020));
console.log("Part two answer: " + result)