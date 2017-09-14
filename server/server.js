// All this is express boilerplate
import { __PRODUCTION__ } from 'environs';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import * as firebase from 'firebase-admin';
import config from 'config';

firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(process.env.LETTERS_FIREBASE_ADMIN_KEY)),
    databaseURL: 'https://letters-social.firebaseio.com'
});

import DB from '../db/DB';

// Modules explicitly related to React & SSR
import { renderToNodeStream } from 'react-dom/server';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

// Our modules
import configureStore from '../src/store/configureStore';
import initialReduxState from '../src/constants/initialState';
import { HTMLPageWrapperWithState } from '../src/utils/html';
import { routes } from '../src/routes';
import { loginSuccess } from '../src/actions/auth';
import { getPostsForPage } from '../src/actions/posts';

// Create the express app
const app = express();
const backend = DB();

// Add some boilerplate middlware
app.use(logger(__PRODUCTION__ ? 'combined' : 'dev'));

app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(responseTime());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'react' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
app.use(hpp());
app.use(
    cors({
        origin: config.get('ORIGINS')
    })
);

// other Route handlers
app.use('/api', backend);
app.use('/static', express.static(resolve(__dirname, '..', 'static')));

app.use('*', (req, res, next) => {
    // Use React Router to match the incoming URL to a path
    match({ routes: routes, location: req.originalUrl }, async (err, redirect, props) => {
        try {
            const store = configureStore(initialReduxState);
            // We've stored the user id in a cookie named letters-token, so we need to grab that here
            const token = req.cookies['letters-token'];
            if (token) {
                // Get the firebase user from their token
                const firebaseUser = await firebase.auth().verifyIdToken(token);
                // Normally we'd do something like query the database or send a request to
                // another service/microservice, not the same server, but for our purposes this works
                const userResponse = await fetch(`${config.get('ENDPOINT')}/users/${firebaseUser.uid}`);
                // If a user can be found, load data for them
                if (userResponse.status !== 404) {
                    const user = await userResponse.json();
                    // Redux-thunk allows us to wait for promises to finish, so we can dispatch async action creators
                    // and wait for them to finish before sending the response back down to the browser
                    await store.dispatch(loginSuccess(user));
                    await store.dispatch(getPostsForPage());
                }
            }
            const html = (
                <HTMLPageWrapperWithState reduxState={store.getState()}>
                    <Provider store={store}>
                        <RouterContext {...props} />
                    </Provider>
                </HTMLPageWrapperWithState>
            );
            const renderStream = renderToNodeStream(html);
            res.setHeader('Content-type', 'text/html');
            renderStream.pipe(res);
        } catch (e) {
            if (e.errorInfo.code === 'auth/argument-error') {
                return res.redirect(config.get('CLIENT') + '/login');
            }
            next(e);
        }
    });
});

// Error handling routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res) => {
    console.error(err);
    return res.status(err.status || 500).json({
        message: err.message
    });
});

process.on('unhandledRejection', e => {
    console.error(e);
});

export default app;
