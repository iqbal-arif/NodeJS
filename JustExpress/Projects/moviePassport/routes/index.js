const { json } = require('express');
var express = require('express');
var router = express.Router();
const request = require('request');
const passport = require('passport');

// Importing Movie Data

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
// Global imageBaseUrl declaration
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

// see README.md note 3:
// Allowing url available in all the files through middleware
router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('User info Please!!!');
  console.log(req.user);
  // see README.md note 1:
  request.get(nowPlayingUrl, (error, response, movieData) => {
    // see README.md note 2:
    const parsedData = JSON.parse(movieData);

    res.render('index', {
      parsedData: parsedData.results,
    });
  });
  // res.render('index', {});
});

/**********GitHub Login***********/
router.get('/login', passport.authenticate('github'));
router.get(
  '/auth',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/loginFailed',
  })
);

// SINGLE MOVIE LISTING

router.get('/movie/:id', (req, res, next) => {
  // will store id number in params.id
  // res.json(req.params.id);
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // res.send gives the url link in the browser
  // res.send(thisMovieUrl);
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    // rendering in single-movie.ejs file
    res.render('single-movie', {
      parsedData,
    });
  });
});

// SEARCH ROUTER
router.post('/search', (req, res, next) => {
  // res.send('Search is WORKING');
  // api site requirement is the search should be uri encoded
  const userSearchTerm = encodeURI(req.body.movieSearch);
  // encodeURI gives the following results
  // http://api.themoviedb.org/3/search/movie?query=black%20adam&api_key=1fb720b97cc13e580c2c35e1138f90f8
  // without encodeURI, it gives result with space
  // http://api.themoviedb.org/3/search/movie?query=black adam&api_key=1fb720b97cc13e580c2c35e1138f90f8
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  // To check the link do the following
  // res.send(movieUrl);
  request.get(movieUrl, (error, response, movieData) => {
    let parsedData = JSON.parse(movieData);
    // res.json(parsedData);
    if (cat === 'person') {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results,
    });
  });
});
module.exports = router;
