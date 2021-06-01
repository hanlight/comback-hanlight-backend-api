import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';
import User from '@Model/user.model';

const deleteNotice = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk = req.query.notice_pk as string;

  try {
    const notice: Notice = await Notice.findOne({ where: { pk, approved: true } });
    if (notice) {
      const log: NoticeApproveLog = await NoticeApproveLog.create({
        notice_pk: notice.pk,
        user_pk: user.pk,
        user_name: user[user.type].name,
        type: 'D',
      });

      res.json({
        success: true,
        data: {
          noticeApproveLog: log,
        },
      });
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default deleteNotice;
