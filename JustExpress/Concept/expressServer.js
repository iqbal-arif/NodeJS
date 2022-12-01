// NODEJS is the language
// Express is node, a node module

// PATH is a Core Module.
const path = require('path');

// HTTP is a Core Mddule
// const http = require('http');
// Express Third-party Module
const express = require('express');
// Invoking Express Function
const app = express();

// Serve the Static Files
app.use(express.static("public"))

// Using "All" Express Methods
// Method takes 2 arg: 1. Route; 2. Callback to run if Route is requested

app.all("/", (req,res)=>{
    // Express handles teh basic headers (status code, mime-type)
    // res.send('<h1>This is ExpressJS Page for NodeJS</h1>')
    // Express handles the end

    // Serving Node.html
    res.sendFile(path.join(__dirname) + "/node.html")
});

// Basic 404 Page
app.all("*", (req,res) =>{
    res.send("404: This Page does not exists anymore")
})
const PORT = 3002;

// Listen to Port
app.listen(PORT);
console.log(`The server is listening on port ${PORT}`);