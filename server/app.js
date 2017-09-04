// All this is express boilerplate
import { __PRODUCTION__ } from 'environs';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import jsonAPI from 'json-server';
import logger from 'morgan';
import responseTime from 'response-time';
import Raven from 'raven';

// Modules explicitly related to React & SSR
import { renderToStream } from 'react-dom/server';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

// Our modules
import configureStore from '../src/store/configureStore';
import initialReduxState from '../src/constants/initialState';
import { HTMLPageWrapperWithState } from '../src/utils/html';
import { routes } from '../src/routes';

Raven.config('https://23f0e00b78a24ac88450c8261b59ed7c@sentry.io/212515').install();

// Create the express app
const app = express();

// Add some boilerplate middlware
app.use(logger('dev'));

app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(responseTime());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'react' }));
app.use(bodyParser.json());
app.use(compression());
app.use(hpp());
app.use(cors());

// Route handlers
app.options(__PRODUCTION__ ? 'https://social.react.sh' : '*', cors());
app.use('/api', jsonAPI.router(resolve(__dirname, '..', 'db', 'seed', 'db.json')));
app.use('/static', express.static(resolve(__dirname, '..', 'static')));

app.use('*', (req, res) => {
    // Use React Router to match
    match({ routes: routes, location: req.originalUrl }, (err, redirect, props) => {
        const store = configureStore(initialReduxState);
        const html = (
            <HTMLPageWrapperWithState reduxState={store.getState()}>
                <Provider store={store}>
                    <RouterContext {...props} />
                </Provider>
            </HTMLPageWrapperWithState>
        );
        const renderStream = renderToStream(html);
        res.setHeader('Content-type', 'text/html');
        renderStream.pipe(res);
    });
});

// Error handling routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res) => {
    Raven.captureException(err);
    console.error(err);
    return res.status(err.status || 500).json({
        message: err.message
    });
});

process.on('unhandledRejection', e => {
    console.error(e);
});

export default app;
