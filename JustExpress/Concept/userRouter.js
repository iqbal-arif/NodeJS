const express = require('express');
let router = express.Router();

// Validator Middleware
function validateUser(req, res, next) {
  res.locals.validated = true;
  console.log('validated!');
  next();
}

// validateUser, is the middleware that is added ONLY to this router.
// The main router does not know about it.
router.use(validateUser);

// instead of app.get(...), user router.get(..)
// This is in fact a piece of middleware
router.get('/', (req, res, next) => {
  res.json({
    msg: 'User Router works!',
  });
});

module.exports = router;
