import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import NoticeApproveLog from '@Model/noticeApproveLog.model';

const deleteApprove = async (req: Request, res: Response, next: NextFunction) => {
  const pk = req.query.approve_pk as string;

  try {
    const noticeApproveLog: NoticeApproveLog = await NoticeApproveLog.findOne({ where: { pk, approved: false } });
    if (noticeApproveLog) {
      await noticeApproveLog.destroy();
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

export default deleteApprove;
