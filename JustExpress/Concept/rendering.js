const path = require('path');
const express = require('express');
const app = express();

const helmet = require('helmet');
// app.use(helmet());

// IF helmet does not load then do the following
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Serve Static Files
app.use(express.static('public'));

// Parse JSON and UrulEncoded data into req.body
app.use(express.json());
app.use(express.urlencoded());

// Setting the Default EJS Engine behavior for the node server
// app.set('view engine', 'ejs');

// Setting the Default HANDLEBARS Engine behavior for the node server
// app.set('view engine', 'hbs');

// Setting the Default PUG Engine behavior for the node server
app.set('view engine', 'pug');

// Defining directory for views for engine to render from
app.set('views', path.join(__dirname, 'views'));

// Validator Middleware
function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get('/', (req, res, next) => {
  // the data, in teh 2nd arg, is going to be append to res.locals
  res.render('index', {
    countries: [
      {
        name: 'Pakistan',
        capital: 'Islamabad',
        western: false,
      },
      {
        name: 'U.S.A.',
        capital: 'Washington DC',
        western: true,
      },
    ],
    msg: 'Success!',
    msg2: 'Almost Success',
    // Some picture from db and now rendering in the template
    html: `<p><img src="https://unsplash.com/photos/M6XC789HLe8" /></p>`,
  });
});

// Defining render for another page
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3002, () => {
  console.log('App listening on port 3002!');
});
