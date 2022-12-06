var express = require('express');
var router = express.Router();

/* GET Movie page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Movie Page' });
});

module.exports = router;
