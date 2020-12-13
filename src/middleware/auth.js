module.exports = {
    isAuthenticated : (req, res, next) => {
        if(req.user){
            next();
        }else{
            res.status(401).send('Please Login and Comeback here');
        }
    },
}