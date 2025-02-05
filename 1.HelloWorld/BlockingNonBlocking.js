const fs = require('fs');

// Blocking -- method   [ Synchronous Mehods ]
const result = fs.readFileSync('contact.txt', 'utf8');
console.log(result);


// Non - Blocking -- method [ Asynchronous Mehtod ]
console.log("1");
const res = fs.readFile('contact.txt', 'utf8', (err, data) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
});
console.log(res);

console.log("2");



// This below statement is used to check the no of cpu cores which can be used to make the threads in the node js 
// server
const os = require("os");
console.log(os.cpus().length);