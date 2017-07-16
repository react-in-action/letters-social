// Normally we wouldn't use this babel-register hook in a production situation;
// a build step or something else would replace it
require('babel-register');
const bodyParser = require('body-parser');
const jsonAPI = require('json-server');
const compression = require('compression');
const { __PRODUCTION__ } = require('environs');
const { resolve } = require('path');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const logger = require('morgan');
const responseTime = require('response-time');
const { renderToString } = require('react-dom/server');
const React = require('react');
const { match, RouterContext } = require('react-router');
const { Provider } = require('react-redux');

const { routes } = require('../src/routes');
const configureStore = require('../src/store/configureStore').default;
const initialReduxState = require('../src/constants/initialState');

// Le App
const app = express();

app.use(logger('dev'));

app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(responseTime());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'react' }));
app.use(bodyParser.json());

// Forms and compression!
app.use(compression());
app.use(hpp());
app.use(cors());

app.options(__PRODUCTION__ ? 'http://social.learnreactjs.io' : '*', cors());

// ==== Serve the app ====
app.use(
    '/api',
    jsonAPI.router(resolve(__dirname, '..', 'db', 'seed', 'db.json'))
);

app.use('/static', express.static(resolve(__dirname, '..', 'static')));
app.use('*', (req, res) => {
    match(
        { routes: routes, location: req.originalUrl },
        (err, redirect, props) => {
            // Configure the Redux store
            const store = configureStore(initialReduxState);
            const appHtml = renderToString(
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(RouterContext, props, props.children)
                )
            );
            const html = `
            <!doctype html public="storage">
            <html>
                <head>
                    <link rel="stylesheet" href="/static/styles.css" />
                    <script src="https://use.fontawesome.com/0fcbe85f9e.js"></script>
                    <meta charset=utf-8/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Letters Social | React In Action by Mark Thomas</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                </head>
                <body>
                    <div id="app">
                        ${appHtml}
                    </div>
                <script id="intialState">window.__INTIIAL_STATE__ = ${JSON.stringify(
                    store.getState()
                )}</script>
                <script src="/bundle.js" type='text/javascript'></script>
                </body>
            </html>
        `.trim();
            // console.log(store.getState());
            res.setHeader('Content-type', 'text/html');
            res.send(html).end();
        }
    );
});

// ====ERROR-HANDLING===
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

module.exports = app;
