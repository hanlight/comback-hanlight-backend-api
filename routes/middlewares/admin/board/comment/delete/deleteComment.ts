import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import BoardComment from '@Model/boardComment.model';
import BoardManageLog from '@Model/boardManageLog.model';
import User from '@Model/user.model';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk: number = req.body.board_pk;
  const reason: string | undefined = req.body.content;

  try {
    const comment: BoardComment = await BoardComment.findOne({ where: { pk } });

    if (comment) {
      await Promise.all([
        comment.destroy(),
        BoardManageLog.create({
          board_pk: comment.board_pk,
          user_pk: user.pk,
          user_name: user[user.type].name,
          type: 'comment',
          reason,
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

export default deleteComment;
