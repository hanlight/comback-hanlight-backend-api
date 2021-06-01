import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const pk: string = req.query.user_pk as string;

  try {
    const user: User = await User.findOne({
      where: {
        pk,
      },
    });

    if (user) {
      await user.destroy();
      res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteUser;
