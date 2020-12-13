const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = (router) => {
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = { origin : isProduction ? false : '*' };

    const sess = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ 
            mongooseConnection : mongoose.connection,
            ttl : 24 * 60 * 60
        })
    };
    if(isProduction){
        app.set('trust proxy', 1);
        sess.cookie.secure = true;
    }
    app.use(cors(origin));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(cookieParser());
    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/v1', router);
    return app;
}