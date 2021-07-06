import * as dotenv from 'dotenv';
import { NextFunction, Request, Response, Router } from 'express';
import * as swaggerUiExpress from 'swagger-ui-express';

import CustomError from '@Middleware/error/customError';
import Errors from '@Middleware/error/errors';
import codeprint from '@Middleware/dev/print/codeprint';
import * as swaggerJson from '../../swagger.json';
import getCodePrintValidation from '@Middleware/dev/print/_validation';

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
router.get('/print', getCodePrintValidation, codeprint);
router.use('/errors', (req: Request, res: Response, next: NextFunction) => {
  res.json(Errors);
});

export default router;
