const express = require('express');
const app = express();

// Express comprise of 2 things
/*
1. Router
2. Middleware that comprises a web-framework.

Req--------Middleware--------> Res
Middleware function is Any function that has access to teh REQ,RES, & NEXT Object.

Middleware Application
1. Request comes in.
2. We need to validate teh user, sometimes.
3. We need to store some things in the db.
4. If there is data from the user we need to parse it and store it
5. Response
*/

function validateUser(req,res,next){
    // get info out of the req object
    // do some DB task
    res.locals.validated = true;
    console.log("Validation Ran!!!")
    next();
}

// Invoking validateUser in all path and run on all app methods
app.use(validateUser);
// Invoking validateUser in "/admin" path only, and run on all app methods
app.use("/admin",validateUser);
// Invoking validateUser in "/" path only, and run on all app.get methods only
app.get("/",validateUser);

app.get('/', (req, res, next ) => {
    res.send("<h1>Main Page</h1>")
    console.log(res.locals.validated);
});

app.get('/admin', (req, res, next ) => {
    res.send("<h1>Admin Page</h1>")
    console.log(res.locals.validated);
});

app.listen(3002, () => {
    console.log('App listening on port 3003!');
});