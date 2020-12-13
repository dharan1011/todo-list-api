
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/v1/info');
};
exports.loginSuccess = function(req, res) {
    // console.log(req.session);
    // console.log(req.user);
    res.send('Login Success');
};

exports.loginFailure = function(req, res) {
    res.redirect('https://foobar.works');
};

exports.errorHandler = (err, req, res, next) => {
    res.status(500).send(err);
};