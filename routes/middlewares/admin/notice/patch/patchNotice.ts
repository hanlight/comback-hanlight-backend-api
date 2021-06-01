import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';

const patchNotice = async (req: Request, res: Response, next: NextFunction) => {
  const notice_pk: number = req.body.notice_pk;
  const title: string | undefined = req.body.title;
  const content: string | undefined = req.body.content;

  try {
    const notice: Notice = await Notice.findOne({
      where: { pk: notice_pk, approved: true },
    });

    if (notice) {
      const log: NoticeApproveLog = await NoticeApproveLog.create({
        notice_pk,
        title: notice.title === title ? null : title,
        content: notice.content === content ? null : content,
        type: 'U',
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

export default patchNotice;
