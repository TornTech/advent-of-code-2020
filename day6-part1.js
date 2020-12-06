const { group } = require('console');
const fs = require('fs');
const data = fs.readFileSync('day6-test.txt').toString();
const input = data.split('\r\n');

let uniqueAnswers = {};
let questionsAllAnswered = [];
let peopleInGroup = 0;

input.forEach(function(answer, i) {
    for (var i = 0; i < answer.length; i++) {
        if (uniqueAnswers.hasOwnProperty(answer[i])) {
            uniqueAnswers[answer[i]]++;
        } else {
            uniqueAnswers[answer[i]] = 1;
        }
    } 

    peopleInGroup++;
    
    if (answer === '') {
        uniqueAnswers = {}
        peopleInGroup = 0;
    }
    // console.log(uniqueAnswers);
    // console.log(peopleInGroup);
    for (const [key, value] of Object.entries(uniqueAnswers)) {
        console.log(key, value);
    }
    console.log("------")
})



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
        listOfUniqueAnswers.push(uniqueAnswers)
    })

    // Counts unique answers from each group
    let sumOfAnswers = 0;
    listOfUniqueAnswers.forEach(function (answer, i) {
        sumOfAnswers += Object.keys(answer).length;
    })
    return sumOfAnswers;
}

// console.log("Part one answer: "+ partOne(input));