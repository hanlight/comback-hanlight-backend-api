import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import CustomError from '@Middleware/error/customError';
import ErrorMiddleware from '@Middleware/error/errorMiddleware';
import adminController from 'routes/adminController';
import apiController from 'routes/apiController';
import { connect } from './database/index';

dotenv.config();

const app: express.Application = express();
const debug = Debug('hanlight');

app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? '*' : /hanlight\.kr/,
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', apiController);
app.use('/admin', adminController);

app.use((req, res, next) => {
  // err.status = 404;
  next(new CustomError({ name: 'Not_Found' }));
});

app.use(ErrorMiddleware);

process.on('uncaughtException', err => {
  console.error(err);
  debug('Caught exception: %j', err);
  process.exit(1);
});

connect(
  false,
  true
).then(() => console.log('데이터베이스와 성공적으로 연결되었습니다.')); // database connection

export default app;
