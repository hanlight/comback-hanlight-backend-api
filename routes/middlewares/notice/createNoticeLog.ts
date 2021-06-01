import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';
import NoticeViewLog from '@Model/noticeViewLog.model';

const createNoticeLog = async (req: Request, res: Response, next: NextFunction) => {
  const notice: Notice | Notice[] = res.locals.temp.notice;
  const resultCount = res.locals.temp.resultCount;
  const searchType: 'list' | 'post' = req.query.type as any;
  const user_pk = res.locals.user.pk;

  try {
    if (searchType === 'post' && !notice) {
      next(new CustomError({ name: 'Not_Found' }));
    } else {
      if (notice instanceof Notice) {
        await NoticeViewLog.findOrCreate({
          where: {
            notice_pk: notice.pk,
            user_pk,
          },
          defaults: {
            notice_pk: notice.pk,
            user_pk,
          },
        });
      }
      await res.json({
        success: true,
        data: {
          notice,
          resultCount: notice instanceof Notice ? undefined : resultCount,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default createNoticeLog;
