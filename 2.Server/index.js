const http = require("http");
const fs = require("fs");

// Intialising the url =
const url = require("url");

// const myServer = http.createServer((req,res)=>{
//     console.log("New request received");
//     res.end("Hello from the server side ");
// });

// const myServer = http.createServer((req,res)=>{
//     const log = `${Date.now()} : ${req.url} New request received\n`;
//     fs.appendFile('log.txt', log,  (err,data)=>{
//         res.end("Hello from the server side ");
//     })
// });

// const myServer = http.createServer((req,res)=>{
//     if (req.url==="/favicon.ico") {
//         return res.end();
//     }
//     const log = `${Date.now()} : ${req.url} New request received\n`;
//     const myUrl = url.parse(req.url);
//     console.log(myUrl);
//     fs.appendFile('log.txt', log,  (err,data)=>{
//         switch (req.url) {
//             case '/':
//                 res.end("HOMEPAGE");
//                 break;
//             case '/about' :
//                 res.end("I am Nitin Patel ");
//                 break;
//             default:
//                 res.end("Error 404");
//                 break;
//         }
//     })
// });

// myServer.listen(8000, () => console.log("Server has been startd"));

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const log = `${Date.now()} : ${req.url} New request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("HOMEPAGE");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are the search results\n"+search);
        break;
      default:
        res.end("Error 404");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server has been startd"));
