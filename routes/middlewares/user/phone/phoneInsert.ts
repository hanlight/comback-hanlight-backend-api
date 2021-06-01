import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const phoneInsert = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    await user.update({
      tp: res.locals.temp.tp,
    });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default phoneInsert;
