import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';
import User from '@Model/user.model';

const postNotice = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const title: string = req.body.title;
  const content: string = req.body.content;

  try {
    const notice: Notice = await Notice.create(
      {
        user_pk: user.pk,
        user_name: user[user.type].name,
        noticeApproveLog: {
          type: 'C',
          title,
          content,
        },
      },
      {
        include: [
          {
            model: NoticeApproveLog,
          },
        ],
      }
    );

    res.json({
      success: true,
      data: {
        notice,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postNotice;
