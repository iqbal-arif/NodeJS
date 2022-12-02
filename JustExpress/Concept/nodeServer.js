// Importing HTTP Core Module
const http = require("http");

// Importing FS Core Module
// FS gives access to local machine file system
const fs = require("fs");
// HTTP has a createServer Method; Takes 1 argument that is a callBack function
// This callback function takes 2 argument REQ, RES

const server = http.createServer((req,res)=>{
    // Grabs anything it shows after "/"
    console.log(req.url)

    if (req.url === "/"){
    res.writeHead(200,{"content-type":"text/html"});
    // res.write("<h1>Hello NodeJs Home Page</h1>");
    const nodeHomePage = fs.readFileSync("node.html");
    res.write(nodeHomePage);
    res.end();
    }else{
    // RES for the requester
    // HTTP MESSAGE; Contains:
    // a. Start-line (node writes it) b. Header (takes 2 arg: 1. status code, 2. Object fo the mime-type) c. Body
    // Head
    res.writeHead(404,{"content-type":"text/html"});
    // Body
    res.write("<h3>Sorry!!! This is not a legit NodeJs HomePage</h3>");
    // Close connection
    res.end();
    }
});

// createServer returns object with listen method; Listen takes 1 argument
// Argument is a port to listen for http traffic on

server.listen(3001);


