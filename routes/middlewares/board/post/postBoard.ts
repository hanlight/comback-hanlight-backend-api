import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardImage from '@Model/boardImage.model';
import User from '@Model/user.model';

const postBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const content: string = req.body.content;
  const files: string[] = (res.locals.temp && res.locals.temp.files) || [];
  const anonymous = req.body.anonymous ? parseInt(req.body.anonymous, 10) : false;

  try {
    const board: Board = await Board.create(
      {
        user_pk: user.pk,
        user_name: anonymous ? null : user[user.type].name,
        content,
        boardImage: files.map(file => ({ file })),
      },
      {
        include: [
          {
            model: BoardImage,
          },
        ],
      }
    );

    res.json({
      success: true,
      data: {
        board: {
          pk: board.pk,
          user_name: board.user_name,
          user_image: !anonymous && user.image ? `https://hanlight.s3.ap-northeast-2.amazonaws.com/profile-image/${user.image}` : null,
          content: board.content,
          createdAt: board.createdAt,
          files: board.boardImage.map(
            (boardImage: BoardImage) => `https://hanlight.s3.ap-northeast-2.amazonaws.com/board/${boardImage.file}`
          ),
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postBoard;
