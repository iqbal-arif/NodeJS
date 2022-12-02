const express = require('express');
let router = express.Router();

// router.use is specific to this particular router
// app.use is same as router.use

// instead of app.get(...), user router.get(..)
// This is in fact a piece of middleware
router.get('/', (req, res, next) => {
  res.json({
    msg: 'Router works!',
  });
});

// router.all
// router.post
// router.delete
// router.put

module.exports = router;
