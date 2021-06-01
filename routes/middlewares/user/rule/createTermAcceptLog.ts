import CustomError from '@Middleware/error/customError';
import TermAcceptLog from '@Model/termAcceptLog.model';
import User from '@Model/user.model';
import { NextFunction, Request, Response } from 'express';

const createTermAcceptLog = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    await TermAcceptLog.create({
      user_pk: user.pk,
      accept: true,
    });

    next();
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default createTermAcceptLog;
