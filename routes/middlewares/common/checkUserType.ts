import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const checkUserType = (type: string | string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  if (type.includes(user.type)) {
    next();
  } else {
    next(new CustomError({ name: 'Forbidden' }));
  }
};

export default checkUserType;
