import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const signKeyCheck = (req: Request, res: Response, next: NextFunction) => {
  const signKey: string = req.body.signKey;

  User.findOne({
    where: {
      signKey,
    },
  })
    .then((user: User) => {
      if (user && user.signKey === signKey) {
        if (req.path.includes('/phone')) {
          res.locals.user = user;
          next();
        } else if (user.tp) {
          res.locals.user = user;
          next();
        } else {
          next(new CustomError({ name: 'Wrong_Request' }));
        }
      } else {
        next(new CustomError({ name: 'Not_User', message: '잘못된 키입니다.' }));
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default signKeyCheck;
