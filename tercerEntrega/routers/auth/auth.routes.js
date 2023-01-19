const express = require('express');
const passport = require('../../middlewares/passport');

const router = express.Router();

router.post('/register', passport.authenticate(
  'signup', { 
      failureRedirect: '/signup-error',
      successRedirect: '/api/index'
    })
);

router.post('/login', passport.authenticate(
  'signin', {
    failureRedirect: '/signin-error',
    successRedirect: '/api/index'
  })
);

module.exports = router;