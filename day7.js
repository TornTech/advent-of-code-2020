const fs = require('fs');
const data = fs.readFileSync('day7.txt').toString();
const input = data.split('\r\n');

// 1. represent the graph in the form of an object of objects
const rules = input;

const bagGraph = rules.reduce((graph, rule) => {
    const [_, outerBag, innerBagList] = rule.match(/(.+) bags contain (.+)\./);

    const innerBags = innerBagList === "no other bags" ? {} : innerBagList.split(",").reduce((children, innerBag) => {
        const [_, numString, innerColour] = innerBag.match(/(\d+) (.+) bag/);
        return {...children, [innerColour]: parseInt(numString)};
    }, {});

    return {...graph, [outerBag]: innerBags};
}, {});

// 2. find the transpose of this graph
const bagTranspose = Object.entries(bagGraph).reduce(
    (transpose, [outerBag, innerBags]) => 
        Object.keys(innerBags).reduce(
            (newGraph, innerBag) => ({
        ...newGraph,
        [innerBag]: [...(newGraph[innerBag] || []), outerBag],
    }),
    {...transpose}
    ), {}
);

// 3. create  algorithm to find all ancestors
const findAllParents = (bag) => 
    (bagTranspose[bag] || []).reduce(
        (visited, nextBag) => new Set([...visited, ...findAllParents(nextBag)]), 
        new Set([bag])
    );

const parentCount = findAllParents("shiny gold").size - 1;
console.log("Part one answer is: " + parentCount);

// 4. create algorithm to count all children
const countInnerBags = (bag) => 
Object.entries(bagGraph[bag] || []).reduce(
    (count, [innerBag, quantity]) =>
    count + quantity * countInnerBags(innerBag), 1)
    
const childCount = countInnerBags("shiny gold") - 1;
console.log("Part one answer is: " + childCount);