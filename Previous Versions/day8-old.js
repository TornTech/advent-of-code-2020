const fs = require('fs');
const data = fs.readFileSync('day8-test.txt').toString();
const input = data.split('\r\n');

function partOne(input) {

    // Creates list of instruction objects
    let listOfInstructions = [];
    
    // String -> listof Object {instruction, value}
    input.forEach(function (instruction) {
        let instructionSet = {};
        
        instruction = instruction.split(' ')
        instructionSet.cmd = instruction[0];
        instructionSet.val = Number(instruction[1]);
        
        listOfInstructions.push(instructionSet);
    })

    // Set initial accumulator to 0
    let acc = 0;

    // Set pos(ition) of index to 0
    let pos = 0;
    
    // Set array of visited positions
    let visited = [];

    do {
        let cmd = listOfInstructions[pos].cmd;
        let val = listOfInstructions[pos].val;

        if (visited.includes(pos)) {
            return acc;
        } else if (cmd === "acc") {
            acc += val;
            visited.push(pos);
            pos++;
        } else if (cmd === "nop") {
            visited.push(pos);
            pos++;
        } else if (cmd === "jmp") {
            visited.push(pos);
            pos = pos + val;
        }
    } 
    while (pos < listOfInstructions.length);
}




function partTwo(input) {

    // Creates list of instruction objects
    let listOfInstructions = [];
    
    // String -> listof Object {instruction, value}
    input.forEach(function (instruction) {
        let instructionSet = {};
        
        instruction = instruction.split(' ')
        instructionSet.cmd = instruction[0];
        instructionSet.val = Number(instruction[1]);
        
        listOfInstructions.push(instructionSet);
    })

    // Set initial accumulator to 0
    let acc = 0;

    // Set pos(ition) of index to 0
    let pos = 0;
    
    // Set array of visited positions
    let visited = [];

    do {
        let cmd = listOfInstructions[pos].cmd;
        let val = listOfInstructions[pos].val;

        console.log("Current acc: " + acc + " | Current pos: " + pos + " | Current cmd: " + cmd + " | Current val: " + val);

        if (visited.includes(pos)) {
            console.log("FINAL --- reached here at pos: " + pos)
            return false;
        } else if (cmd === "acc") {
            acc += val;
            visited.push(pos);
            pos++;
        } else if (cmd === "nop") {
            visited.push(pos);
            pos++;
        } else if (cmd === "jmp") {
            visited.push(pos);
            if (partTwo(input) === false) {
                console.log("BREAK: reached here at pos: " + pos)
                pos++;
            } else {
                console.log("reached here at pos: " + pos)
                pos = pos + val;
            }
        }
    } 
    while (pos < listOfInstructions.length);

    return acc;
}

// partOne(input);
// console.log("Part one answer: " + partOne(input));
console.log("Part two answer: " + partTwo(input));