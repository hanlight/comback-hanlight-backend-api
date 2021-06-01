import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';
import User from '@Model/user.model';

const patchApprove = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const approve_pk: number = req.query.approve_pk as any;

  try {
    const noticeApproveLog: NoticeApproveLog = await NoticeApproveLog.findOne({
      where: { pk: approve_pk, approved: false },
      include: [{ model: Notice, required: true }],
    });

    if (noticeApproveLog) {
      if (noticeApproveLog.notice.user_pk === user.pk) {
        next(new CustomError({ name: 'Forbidden' }));
      } else {
        const [updatedNotice]: [Notice, unknown] = await Promise.all([
          noticeApproveLog.type === 'D'
            ? noticeApproveLog.notice.destroy()
            : noticeApproveLog.notice.update({
                approved: true,
                title: noticeApproveLog.title || noticeApproveLog.notice.title,
                content: noticeApproveLog.content || noticeApproveLog.notice.content,
              }),
          noticeApproveLog.update({
            user_pk: user.pk,
            user_name: user[user.type].name,
            approved: true,
          }),
        ]);
        res.json({
          success: true,
          data: {
            notice: updatedNotice,
          },
        });
      }
    } else {
      next(new CustomError({ name: 'Wrong_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default patchApprove;
