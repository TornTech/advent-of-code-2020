const { group } = require('console');
const fs = require('fs');
const data = fs.readFileSync('day6.txt').toString();
const input = data.split('\r\n');

function partOne(input) {
    // Groups each group's answers into single string in groupAnswers variable
    let groupAnswers = [];
    let j = 0
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== "") {
            if (groupAnswers[j] === undefined) {
                groupAnswers[j] = input[i];
            } else {
                groupAnswers[j] = groupAnswers[j].concat(input[i]);
            }
        } else {
            j++;
        }
    }

    // Adds each group's answers into objects that counts answers
    var listOfUniqueAnswers = [];
    groupAnswers.forEach(function (answer, i) {
        let uniqueAnswers = {};
        for (var i = 0; i < answer.length; i++) {
            if (uniqueAnswers.hasOwnProperty(answer[i])) {
                uniqueAnswers[answer[i]]++;
            } else {
                uniqueAnswers[answer[i]] = 1;
            }
        }
        listOfUniqueAnswers.push(uniqueAnswers);
    })

    // Counts unique answers from each group
    let sumOfAnswers = 0;
    listOfUniqueAnswers.forEach(function (answer, i) {
        sumOfAnswers += Object.keys(answer).length;
    })
    return sumOfAnswers;
}

function partTwo(input) {
    let uniqueAnswers = {people: 1};
    let questionsAllAnswered = [];
    let finalCount = 0;
    
    input.forEach(function(answer, i) {
        for (var j = 0; j < answer.length; j++) {
            if (uniqueAnswers.hasOwnProperty(answer[j])) {
                uniqueAnswers[answer[j]]++;
            } else {
                uniqueAnswers[answer[j]] = 1;
            }
        } 
      
        if (input[i + 1] === '' || input[i + 1] === undefined) {
            questionsAllAnswered.push(uniqueAnswers);
            uniqueAnswers = {people: 0};
        } else {
            uniqueAnswers.people++;
        }
    })
    
    questionsAllAnswered.forEach(function (group) {
        for (const [key, value] of Object.entries(group)) {
            if (key !== "people" && value !== group.people) {
                delete group[key];
            } else if (key !== "people") {
                finalCount++;
            }
        }
    })
    return finalCount;
}

console.log("Part one answer: "+ partOne(input));
console.log("Part two answer: "+ partTwo(input));