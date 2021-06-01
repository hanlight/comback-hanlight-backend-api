import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardImage from '@Model/boardImage.model';
import BoardLike from '@Model/boardLike.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import User from '@Model/user.model';

const getBoard = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const board_limit = 10;
  const comment_limit = 3;
  const page = (req.query.page as string && (req.query.page as any) - 1) || 0;

  try {
    const result: { rows: Board[]; count: number } = await Board.findAndCountAll({
      limit: board_limit,
      offset: page * board_limit,
      attributes: ['pk', 'user_pk', 'user_name', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
      distinct: true,
      include: [
        {
          model: User,
          attributes: ['image'],
        },
        {
          model: BoardPatchLog,
          attributes: ['pk'],
        },
        {
          model: BoardComment,
          attributes: ['pk', 'user_pk', 'user_name', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          limit: comment_limit,
          include: [
            {
              model: User,
              attributes: ['image'],
            },
            {
              model: BoardPatchLog,
              attributes: ['pk'],
              limit: 1,
            },
            {
              model: BoardCommentLike,
              attributes: ['user_pk'],
            },
          ],
        },
        {
          model: BoardLike,
          attributes: ['user_pk'],
        },
        {
          model: BoardImage,
        },
      ],
    });

    const commentResult: BoardComment[] = await BoardComment.findAll({
      where: { board_pk: result.rows.map(val => val.pk) },
      attributes: ['board_pk'],
    });

    res.json({
      success: true,
      data: {
        board: result.rows.map(val => ({
          pk: val.pk,
          user_name: val.user_name,
          user_image:
            val.user_name && val.user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${val.user.image}` : null,
          content: val.content,
          files: val.boardImage.map(
            (boardImage: BoardImage) => `https://s3.ap-northeast-2.amazonaws.com/hanlight/board/${boardImage.file}`
          ),
          edited: !!val.boardPatchLog.length,
          createdAt: val.createdAt,
          isLiked: val.boardLike.some(val => val.user_pk === user.pk),
          likeCount: val.boardLike.length,
          commentCount: commentResult.filter(comment => comment.board_pk === val.pk).length,
          comment: val.comment.map(comment => ({
            pk: comment.pk,
            user_name: comment.user_name,
            user_image:
              comment.user_name && comment.user.image
                ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${comment.user.image}`
                : null,
            content: comment.content,
            createdAt: comment.createdAt,
            edited: !!comment.boardPatchLog.length,
            isLiked: comment.boardCommentLike.some(val => val.user_pk === user.pk),
            likeCount: comment.boardCommentLike.length,
            write: comment.user_pk === user.pk,
          })),
          write: val.user_pk === user.pk,
        })),
        resultCount: result.count,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getBoard;
