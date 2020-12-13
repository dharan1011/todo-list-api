const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/authController');

router.get('/login', passport.authenticate('github'));
router.get('/callback', 
    passport.authenticate('github', {failureRedirect: '/v1/auth/failure', successRedirect: '/v1/auth/success'})
);
router.get('/success', authController.loginSuccess);
router.get('/failure', authController.loginFailure);
router.get('/logout', authController.logout);

router.use(authController.errorHandler);

module.exports = router;