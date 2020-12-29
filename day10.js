const fs = require('fs');
const data = fs.readFileSync('day10.txt').toString();
const input = data.split('\r\n').map(n => parseInt(n)).sort((a, b) => a - b);

// Add device to input array
const myDevice = Math.max(...input) + 3;
const adapterList = [...input, myDevice];

// Find the number of differences between the adapter requirements
const findDifferences = (adapters, previousAdapter = 0, oneDifference = 0, threeDifference = 0) => {
    const smallestAdapter = adapters[0];

    if (adapters.length === 0) {
        return oneDifference * threeDifference;
    } else if (smallestAdapter - previousAdapter === 1) {
        return findDifferences(adapters.slice(1), smallestAdapter, oneDifference + 1, threeDifference)
    } else if (smallestAdapter - previousAdapter === 3) {
        return findDifferences(adapters.slice(1), smallestAdapter, oneDifference, threeDifference + 1)
    } else {
        return -1; // should not reach here
    }
}

console.log("Part one answer is:", findDifferences(adapterList));

// Finds the number of ways the adapters can be arranged
const findArrangements = (adapters, previousAdapter = 0, memory = {}) => {
    // No more adapters to go through
    if (adapters.length === 0) {
        return 1;
    }
    
    const firstAdapter  = adapters[0];
    const secondAdapter = adapters[1];
    const thirdAdapter  = adapters[2];

    // We have already seen how many adapters we can go through from this node
    if (memory.hasOwnProperty(firstAdapter)) {
        return memory[firstAdapter]
    }

    // Otherwise, we count the number of ways we can reach the end from this adapter
    const arrangmentCount = (findArrangements(adapters.slice(1), firstAdapter, memory))
        +
        ((secondAdapter - previousAdapter <= 3 && secondAdapter !== undefined) ? findArrangements(adapters.slice(2), secondAdapter, memory) : 0)
        +
        ((thirdAdapter - previousAdapter <= 3 && thirdAdapter !== undefined) ? findArrangements(adapters.slice(3), thirdAdapter, memory) : 0)

    // Store the number of ways into memory to make program more efficient
    memory[firstAdapter] = arrangmentCount;

    return arrangmentCount;
}

console.log("Part two answer is:", findArrangements(adapterList));

