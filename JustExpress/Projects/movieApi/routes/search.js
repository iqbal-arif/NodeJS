var express = require('express');
var router = express.Router();

/* GET Search page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Search Page' });
});

module.exports = router;
