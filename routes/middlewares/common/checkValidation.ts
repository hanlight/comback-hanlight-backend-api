import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import CustomError from '@Middleware/error/customError';

const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.array().length) {
    console.log(result.array());
    next(new CustomError({ name: 'Wrong_Data' }));
  } else {
    next();
  }
};

export default checkValidation;
