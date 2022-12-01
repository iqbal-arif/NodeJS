const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const { appendFile } = require('fs');
app.use(helmet());

// IF helmet does not load then do the following
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// Serve Static Files
app.use(express.static('public'));

// Parse JSON and UrulEncoded data into req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Setting the Default EJS Engine behavior for the node server
app.set('view engine', 'ejs');

// Defining directory for views for engine to render from
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    res.locals.msg =
      'Sorry, This username & password combination does not exists';
  } else {
    res.locals.msg = '';
  }
  next();
});

// Defining render for another page
app.get('/', (req, res, next) => {
  res.send('EJS Login Site is working');
});
// Rendering Login Page
app.get('/login', (req, res, next) => {
  // the req object has a query property in Express
  //  req.query is an object with a property of every key in the query string
  // The query string is where you put insecure data
  //   console.log(req.query);
  res.render('login');
});

// Posting the form content
app.post('/process_login', (req, res, next) => {
  // req.body is made by urlencoded that parse the http message for sent data
  const username = req.body.username;
  const password = req.body.password;
  // Check the db to validate credentials
  // After verification save it in a cookie
  if (password === 'arif') {
    // res.cookie takes 2 args:
    // 1. name of the cookie, 2. value to set it to
    res.cookie('username', username);
    // res.redirect takes 1 args
    // 1. where to send the browser
    res.redirect('/welcome');
  } else {
    // The "?" is query string; is a special character in URL
    // anything after "?" is less concern;  currently, shows two keys and values
    res.redirect('/login?msg=fail&text=hello');
  }
  //   res.json(req.body);
});

//  Rendering Welcome Page
app.get('/welcome', (req, res, next) => {
  res.render('welcome', {
    username: req.cookies.username,
  });
});

// app.param(); takes 2 args:
// 1. param to look for in the route; 2. the callback to run with the usuals
app.param('id', (req, res, next, id) => {
  console.log('Param called', id);
  //   if id has something to do with stories
  //  if id has something to do with blog
  next();
});

//  app.get("/user/:uid",....)
//  app.get("/user/admin/:uid",....)
//  app.get("/user/profile/:uid",....)

// in a route, anytime something has ":" in front it is a wildcard!
// wildcard will match anything in that slot

app.get('/story/:id', (req, res, next) => {
  // the req.params object always exists
  // it will have a property for each wildcard in the route
  res.send(`<h1>Story ${req.params.storyId}</h1>`);
});

// Route for Bank Statement
app.get('/statement', (req, res, next) => {
  //this will render the statement in the browser
  //   app.sendFile(
  //     path.join(__dirname, 'userStatement/BankStatementChequing.png'),
  //     'JimStatement.png')
  //  app has a download method
  // res.download() takes 2 arg;
  // 1. filename; 2. optionally, the filename you want it to be.
  //   3. callback which comes with the error.
  // download is setting the headers!
  // 1. content-disposition to attachment, with a filename of the 2nd arg
  res.download(
    path.join(__dirname, 'usersStatements/BankStatementChequing.png'),
    'JimStatement.png'
  );
  //   if there is an error in sending the file, headers may already be sent
  if (error) {
    // res.headerSent is a bool, true if headers are already sent
    if (!res.headersSent) {
      res.redirect('/download/error');
    }
  }
  //   res.send('The bank statement route is working');
});

app.get('/logout', (req, res, next) => {
  // res.clearCookie takes 1 arg: that is the name
  res.clearCookie('username');
  res.redirect('/login');
});

app.listen(3002, () => {
  console.log('App listening on port 3002!');
});
