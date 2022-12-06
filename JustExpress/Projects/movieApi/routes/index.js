var express = require('express');
var router = express.Router();

// Importing Movie Data
const movies = require('../data/movies');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Filtering Most Popular Movies and creating new array
router.get('/most_popular', (req, res, next) => {
  // Get page variable from the query string
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }
  // API Key Validation
  if (req.query.api_key != 123456789) {
    res.json('Invalid Key!');
  } else {
    let results = movies.filter((movie) => {
      return movie.most_popular;
    });
    const indexToStart = (page - 1) * 20;
    results = results.slice(indexToStart, indexToStart + 19);
    res.json(results);
  }
});

module.exports = router;
