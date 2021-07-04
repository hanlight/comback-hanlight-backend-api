import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardLike from '@Model/boardLike.model';
import User from '@Model/user.model';

const getBoardLike = async (req: Request, res: Response, next: NextFunction) => {
  const type: 'board' | 'comment' = req.query.type as any;
  const board_pk: number = req.query.board_pk as any;
  const comment_pk: number | undefined = req.query.comment_pk as any;

  try {
    const board: Board = await Board.findOne({
      where: {
        pk: board_pk,
      },
      include:
        type === 'comment'
          ? [
              {
                model: BoardComment,
                where: {
                  pk: comment_pk,
                },
                required: false,
                include: [
                  {
                    model: BoardCommentLike,
                    include: [
                      {
                        model: User,
                        attributes: ['image'],
                      },
                    ],
                  },
                ],
              },
            ]
          : [
              {
                model: BoardLike,
                include: [
                  {
                    model: User,
                    attributes: ['image'],
                  },
                ],
              },
            ],
    });

    if (board) {
      if (type === 'comment' && !board.comment.length) {
        next(new CustomError({ name: 'Not_Found_Comment' }));
      } else {
        res.json({
          success: true,
          data: {
            like:
              type === 'board'
                ? board.boardLike.map(like => ({
                    user_name: like.user_name,
                    user_image: like.user.image
                      ? `https://hanlight.s3.ap-northeast-2.amazonaws.com/profile-image/${like.user.image}`
                      : null,
                  }))
                : board.comment[0].boardCommentLike.map(like => ({
                    user_name: like.user_name,
                    user_image: like.user.image
                      ? `https://hanlight.s3.ap-northeast-2.amazonaws.com/profile-image/${like.user.image}`
                      : null,
                  })),
          },
        });
      }
    } else {
      next(new CustomError({ name: 'Not_Found_Board' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getBoardLike;
