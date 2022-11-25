// EXPRESS Importing
//const { nextDay } = require('date-fns');
const express = require('express');
const app = express();

//COMMON CORE MODULE
const path = require('path');

// Importing LogEvents
const logEvents = require('./middleware/logEvents');

//Defining PORT for Local WEB-SERVER
const PORT = process.env.PORT || 3500;

// Defining Custom Middleware
app.use((req,res,next)=>{
    //req.method:request method, req.headers.origin: where is the request coming from, req.url:the url of the website, reqLog.txt: creat this log file
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,"reqLog.txt");
    console.log(`${req.method} ${req.path}`)
    next()
})

//Three Types of Middleware
//1. Builtin Middleware.
//2. Custom Middleware.
//3. Third-Party Middleware.
// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Defining HTTP ROUTE
//INDEX Page; REGEX Expression to search other file options, such as
// '^/$|/index(.html)?'; means ^:begins with /; $:ends at /; |: or, ()?: means optional
//Express automatically sets the statusCode for request/response

app.get('^/$|index(.html)?', (req,res) =>{
    //To send a message to browser
   // res.send('Hello World!');
    //To send a file to open in browser
    //METHOD 1:
   // res.sendFile('./views/index.html', {root:__dirname});
    //METHOD 2 , NodeJS way:
    res.sendFile(path.join(__dirname,'views', 'index.html'));
}) 

//NEW-PAGE
app.get('/new-page(.html)?', (req,res) =>{

    res.sendFile(path.join(__dirname,'views', 'new-page.html'));
}) 

//REDIRECT TO FROM OLD TO NEW-PAGE
app.get('/old-page(.html)?', (req,res) =>{

    //res.redirect('/new-page.html'); // this code will send 302 status by default and won't redirect
    res.redirect(301,'/new-page.html'); // this code will redirect with setting right code
}) 


//ROUTE HANDLERS
//Calling one Functon after Other
/*
 app.get('/hello(.html)?', (req,res, next) =>{
    console.log('Attempted to load hello.html');
    next();
 },(req,res)=>{
    res.send('Hello World!');
 })
*/
/*
//CHAIN Route Handlers
//Route Handlers works just like MiddleWare
const one = (req,res,next) =>{
    console.log('one attempt');
    next()
}
const two = (req,res,next) =>{
    console.log('Second attempt');
    next()
}
const three = (req,res,next) =>{
    console.log('Third attempt');
    res.send('Done Rendering Files')
}

app.get('/chain(.html)?', [one,two,three]);
*/
//REDIRECT TO 404 if Correct page is not found
app.get('/*', (req,res) =>{
    // Need to SET StatusCode manually
    res.status(404).sendFile(path.join(__dirname,'views', '404.html')); // this code will redirect 404.html
}) 



// App needs Listening for the Request

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


