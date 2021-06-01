import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const register = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { id } = req.body;
  const { password, passwordKey } = res.locals.temp;

  user
    .update({
      id,
      password,
      passwordKey,
      signKey: null,
    })
    .then(() =>
      res.json({
        success: true,
      })
    )
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default register;
