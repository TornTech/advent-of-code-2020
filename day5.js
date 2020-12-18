const fs = require('fs');
const data = fs.readFileSync('day5.txt').toString();
const input = data.split('\r\n');

const legend = {B: 1, F: 0, R: 1, L: 0};

// Convert pass to seat ID
const processPass = pass => {

    // For each pass, convert to binary string
    const binary = pass.replace(/./g, char => (char in legend? legend[char] : ""));
    
    // Convert binary to decimal
    const seatID = parseInt(binary, 2);

    return seatID;
}
// Put all seat IDs into an array
const seatIDs = input.map(processPass)

// Take the maximum seat ID
const maxSeatID = Math.max(...seatIDs)

// Sort seat IDs
const sortedIDs = [...seatIDs].sort((a, b) => a - b);

// Find the seat IDs that are spaced out by 2
const candidates = sortedIDs.filter((id, index) => sortedIDs[index + 1] - id === 2)
const mySeat = candidates[0] + 1;

console.log("Part one answer is: " + maxSeatID);
console.log("Part two answer is: " + mySeat)