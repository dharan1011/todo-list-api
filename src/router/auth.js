const express = require('express');
const { reset } = require('nodemon');
const passport = require('passport');
const router = express.Router();

router.get('/login', passport.authenticate('github'));

router.get('/callback', 
    passport.authenticate('github', {failureRedirect: '/v1/auth/failure', successRedirect: '/v1/auth/success'})
);

router.get('/failure', (req, res) => {
    res.send('Login Failed');
});

router.get('/success', (req, res) => {
    // console.log(req.session);
    // console.log(req.user);
    res.send('Login Success');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/v1/info');
});

router.use((err, req, res, next) => {
    res.status(500).send(err);
});

module.exports = router;