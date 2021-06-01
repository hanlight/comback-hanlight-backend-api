import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  const pk: string = req.body.user_pk;
  const id: string | undefined = req.body.id;
  const admin: number | undefined = (req.body.admin && parseInt(req.body.admin, 10)) || undefined;
  const tp: string | undefined = req.body.tp;

  try {
    const resultUser: User = await User.findOne({
      where: {
        pk,
      },
    });

    if (resultUser) {
      if ((resultUser.pk !== user.pk && resultUser.admin < user.admin && admin < user.admin) || user.admin >= 4) {
        const updatedUser: User = await resultUser.update({
          id,
          admin,
          tp,
        });
        res.json({
          success: true,
          data: {
            user: {
              pk: updatedUser.pk,
              admin: updatedUser.admin,
              id: updatedUser.id,
              signKey: updatedUser.signKey,
              tp: updatedUser.tp,
            },
          },
        });
      } else {
        next(new CustomError({ name: 'Forbidden' }));
      }
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default patchUser;
