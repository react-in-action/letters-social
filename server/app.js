import bodyParser from 'body-parser';
import jsonAPI from 'json-server';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import logger from 'morgan';
import responseTime from 'response-time';
import { v4 as uuid } from 'node-uuid';

// Le App
const app = express();

app.use(logger('dev'));

app.use(helmet.xssFilter({
  setOnOldIE: true,
}));

app.use(responseTime());

app.use(helmet.frameguard());

app.use(helmet.ieNoOpen());

app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({
  setTo: 'coffee',
}));

// Should we really have another cookie?
app.use(cookieParser(uuid.v4(), {}));

// Parse it all
app.use(bodyParser.urlencoded({
  extended: true,
}));

// JSON
app.use(bodyParser.json());

// Forms and compression!
app.use(compression());

// Prevent parameter polution
app.use(hpp());

app.use(cors());

app.options('*', cors());

// ==== Serve the app ====
app.use('/', express.static(join(__dirname, '..')));
app.use('/api', jsonAPI.router(join(__dirname, '..', '..', 'db', 'seed', 'db.json')));

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
    error: {
      name: err.name,
      stack: err.stack,
      status: err.status,
    },
  });
});

export default app;
