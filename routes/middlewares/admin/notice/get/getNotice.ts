import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
  const limit = 10;
  const searchPage = (req.query.page as string && (req.query.page as any) - 1) || 0;

  try {
    const notice: { rows: Notice[]; count: number } = await Notice.findAndCountAll({
      offset: searchPage * limit,
      limit,
      order: [['createdAt', 'DESC']],
      distinct: true,
      include: [
        {
          model: NoticeApproveLog,
        },
      ],
    });

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

export default getNotice;
