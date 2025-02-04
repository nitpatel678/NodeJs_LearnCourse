console.log("Hey there Node");
// But we cant run dom manipulation and window functionality of javascript 
// because that has been removed from node for c++

const math = require("./math");
// const {add, sub} = require("./math");
// console.log("The value of the number is", sub(36,33));

console.log("The value of the number is", math.sub(36,33));
console.log("The value of the number is", math.add(36,33));