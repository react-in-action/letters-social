let bodyParser;_b23‍.w('body-parser',[["default",function(v){bodyParser=v}]]);let jsonAPI;_b23‍.w('json-server',[["default",function(v){jsonAPI=v}]]);let __PRODUCTION__;_b23‍.w('environs',[["__PRODUCTION__",function(v){__PRODUCTION__=v}]]);let resolve;_b23‍.w('path',[["resolve",function(v){resolve=v}]]);let cors;_b23‍.w('cors',[["default",function(v){cors=v}]]);let express;_b23‍.w('express',[["default",function(v){express=v}]]);let helmet;_b23‍.w('helmet',[["default",function(v){helmet=v}]]);let hpp;_b23‍.w('hpp',[["default",function(v){hpp=v}]]);let logger;_b23‍.w('morgan',[["default",function(v){logger=v}]]);let responseTime;_b23‍.w('response-time',[["default",function(v){responseTime=v}]]);let compression;_b23‍.w('compression',[["default",function(v){compression=v}]]);let renderToString;_b23‍.w('react-dom/server',[["renderToString",function(v){renderToString=v}]]);let React;_b23‍.w('react',[["default",function(v){React=v}]]);let match,RouterContext;_b23‍.w('react-router',[["match",function(v){match=v}],["RouterContext",function(v){RouterContext=v}]]);let Provider;_b23‍.w('react-redux',[["Provider",function(v){Provider=v}]]);let configureStore;_b23‍.w('../src/store/configureStore',[["default",function(v){configureStore=v}]]);let initialReduxState;_b23‍.w('../src/constants/initialState',[["default",function(v){initialReduxState=v}]]);// Normally we wouldn't use this babel-register hook in a production situation;
// a build step or something else could replace it

// All this is express boilerplate












// Modules explicitly related to React & SSR





// Our modules


const { routes } = require('../src/routes');

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
app.use(
    '/api',
    jsonAPI.router(resolve(__dirname, '..', 'db', 'seed', 'db.json'))
);
app.use('/static', express.static(resolve(__dirname, '..', 'static')));
// SSR-related functionality
app.use('*', (req, res) => {
    // Use React Router to match
    match(
        { routes: routes, location: req.originalUrl },
        (err, redirect, props) => {
            // Configure the Redux store so we can use it during SSR
            const store = configureStore(initialReduxState);
            // HTML to send down to the browser
            const appHtml = renderToString(
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(RouterContext, props, props.children)
                )
            );
            // Use am ES2015+ string literal to interpolate our app HTML into the page
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
                <script async defer src="/static/bundle.js" type='text/javascript'></script>
                </body>
            </html>
        `.trim();
            res.setHeader('Content-type', 'text/html');
            res.send(html).end();
        }
    );
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

_b23‍.d(app);
