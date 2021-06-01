import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import User from '@Model/user.model';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  const board_pk = req.query.board_pk as string;
  const user: User = res.locals.user;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
        user_pk: user.pk,
      },
    });

    if (board) {
      await board.destroy();
      await res.json({
        success: true,
      });
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteBoard;
