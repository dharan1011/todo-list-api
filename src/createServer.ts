import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export default (router :  Router) => {
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = { origin : isProduction ? false : '*' };
    
    app.use(cors(origin));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(cookieParser());

    app.use('/v1', router);
    return app;
}