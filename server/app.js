const bodyParser = require('body-parser');
const jsonAPI = require('json-server');
const compression = require('compression');
const { __PRODUCTION__ } = require('environs');
const { join, resolve } = require('path');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const logger = require('morgan');
const responseTime = require('response-time');

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
app.use('/api', jsonAPI.router(join(__dirname, '..', '..', 'db', 'seed', 'db.json')));
app.use('/', express.static(resolve(__dirname, '..')));

app.use('*', (req, res) => res.sendFile(resolve(__dirname, '..', 'index.html')));

// ====ERROR-HANDLING===
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  console.error(err);
  return res.status(err.status || 500).json({
    message: err.message,
  });
});

export default app;
