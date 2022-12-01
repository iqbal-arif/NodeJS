const express = require('express');

const app = express();

// APP has few METHODS
/* 
HTTP verbs & CRUD app correspondence
1. GET - READ  (Default for all browsers)
2. POST - CREATE
3. DELETE - DELETE
4. PUT - UPDATE
5. ALL - Will accept any method

Methods Take 2 Arguments:
1. Path
2. Callback to run if an HTTP request that matches THIS verb.
*/
// For Multiple GET Method, only the first one will run

// app.all('/', (req, res) => {
//     // res.send("<h1>Welcome to ExpressJS Home Page!</h1>");
// });
app.get('/', (req, res) => {
    console.log(req)
    res.send("<h1>Welcome to ExpressJS Home GET Page!</h1>"); 
});
app.post('/', (req, res) => {
    res.send("<h1>Welcome to ExpressJS Home POST Page!</h1>"); 
    
});
app.delete('/', (req, res) => {
    
});
app.put('/', (req, res) => {
    
});




const PORT = 3002;
// Listen to Port
app.listen(PORT);
console.log(`The server is listening on port ${PORT}`);