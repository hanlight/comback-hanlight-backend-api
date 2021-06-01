import * as dotenv from 'dotenv';
import { NextFunction, Request, Response, Router } from 'express';
import * as swaggerUiExpress from 'swagger-ui-express';

import CustomError from '@Middleware/error/customError';
import Errors from '@Middleware/error/errors';

import * as swaggerJson from '../../swagger.json';

dotenv.config();
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'development') {
    console.log(process.env.NODE_ENV);
    next(new CustomError({ name: 'Not_Found' }));
  } else {
    next();
  }
});

router.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));

router.use('/errors', (req: Request, res: Response, next: NextFunction) => {
  res.json(Errors);
});

export default router;
