const fs = require('fs');

// Synchronous Method
fs.writeFileSync('./test.txt', 'Hey there NodeJS');

// Aysynchronous Method
fs.writeFile('./test.txt','Hello JavaScript', (err, data) => {});

// To Read a File
const result = fs.readFileSync('./contact.txt', "utf-8");
console.log(result);

// Read a File asynchronous way
const data = fs.readFile('./contact.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log("Error reading contact.txt");
    }
    else{
        console.log(data);
    }
});
console.log(data);

fs.appendFileSync("./test.txt", "\nThis is the testing of the append method");
const test = fs.readFileSync("./test.txt","utf-8");
console.log(test);