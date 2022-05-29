const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/', 
    passport.authenticate('facebook', 
        { scope: ['public_profile', 'email'] }
    )
);
router.get('/callback', 
    passport.authenticate('facebook', 
        { session: false }
    ), userController.callback
);

module.exports = router;