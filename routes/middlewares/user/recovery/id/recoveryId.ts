import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const recoveryId = (req: Request, res: Response, next: NextFunction) => {
  const tp = res.locals.temp.tp;

  User.findOne({
    where: {
      tp,
    },
  })
    .then((user: User) => {
      if (user && user.id) {
        res.json({
          success: true,
          data: {
            id: user.id,
          },
        });
      } else {
        next(new CustomError({ name: 'Not_User', message: '일치하는 유저가 없습니다.' }));
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default recoveryId;
