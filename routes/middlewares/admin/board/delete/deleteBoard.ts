import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardManageLog from '@Model/boardManageLog.model';
import User from '@Model/user.model';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk: number = req.body.board_pk;
  const content: string = req.body.content;

  try {
    const board: Board = await Board.findOne({ where: { pk } });

    if (board) {
      await Promise.all([
        board.destroy(),
        BoardManageLog.create({
          pk,
          board_pk: board.pk,
          user_pk: user.pk,
          user_name: user[user.type].name,
          type: 'board',
          reason: content,
        }),
      ]);
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

export default deleteBoard;
