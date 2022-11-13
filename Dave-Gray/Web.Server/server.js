//COMMON CORE MODULE
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

//Importing Custom Module from logEvents file
const logEvents = require("./logEvents")

// Importing Events Core Module
const EventEmitter = require('events');

//Defining Event Class

class Emitter extends EventEmitter {};

//Initialze Object
const myEmitter = new Emitter();

// Add listener for the log Event

myEmitter.on('log', (msg,fileName) => logEvents(msg, fileName));

//Defining PORT for Local WEB-SERVER

const PORT = process.env.PORT || 3500;

//File Serving Function

const serveFile = async (filePath, contentType, response) =>{
    try {
        const rawData = await fs.promises.readFile(
            filePath,
            //to set contentType equal to ' ' for image file.
            !contentType.includes('image') ?'utf-8': '');
        //To handle JSON file that is parse 
        const data = contentType === 'application/json'? JSON.parse(rawData):rawData;
        //Setting 200 & 404 statuscode based on the file type
        response.writeHead(
            filePath.includes('404.html')? 404: 200,
             {'Content-Type': contentType});
        //JSON is stringify to display on the web
        response.end(
            contentType === 'application/json'? JSON.stringify(data) :data
        );

    } catch (error) {
       console.error(error); 
       myEmitter.emit('log', `${error.name}: ${error.message}`,'errLog.txt')

       response.statusCode = 500;
       response.end();
    }
}

// Creating a Server call

const server = http.createServer((req,res) =>{
    console.log(req.url, req.method);

    // Emit Event with message
    myEmitter.emit('log', `${req.url}\t${req.method}`,'reqLog.txt')

    // What will be for the request. Build a path
    
    //METHOD 1:
    /*
    let filePath;
    if (req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf8', (err,data) =>{
            res.end(data);
        })
    }*/
    
    //METHOD 2:
    /*
    let filePath;
    switch (req.url){
        case '/':
            res.statusCode =200;
            filePath = path.join(__dirname, 'views', 'index.html');
            fs.readFile(filePath, 'utf8', (err,data) =>{
                res.end(data);
            });
            break;
    }*/

    //METHOD 3:
    //For all different file cases/types, following is the efficient way
    //Looking at the extension by using extension method
    const extension = path.extname(req.url);

    //Define a content type
    let contentType ;
    switch (extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    //Chain Ternary Statement
    //first case checks if the file is html and url has /
    //second case checks if file is html and after url has / then do this
    //thrid case checks if file is only html then render that
    //default whatever the file maybe render that url
    let filePath = contentType === 'text/html' && req.url === '/'? path.join(__dirname,'views', 'index.html'):contentType === 'text/html' && req.url.slice(-1) === '/'? path.join(__dirname,'views', req.url, 'index.html'): contentType === 'text/html' ? path.join(__dirname,'views', req.url): path.join(__dirname,req.url);

    //if there is no file-extention just a / then add the file html in the filepath variable. This makes .html extension not requried in the browser

    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    //Checking file existance

    const fileExists = fs.existsSync(filePath);

    if (fileExists){
        // serve the file
        serveFile(filePath,contentType,res);
    }else{
        // 404
        // 301 redirect
        // console.log(path.parse(filePath));
        //using .base to get the full file name
        switch(path.parse(filePath).base){
            //for Redirecting from Old to New page
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
                //For Redirecting to the Root Folder
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                // serve a 404 response 
                serveFile(path.join(__dirname,"views", '404.html'),'text/html',res);

        };
    }

})

// Web-Server needs Listening for the Request

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


