import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import deleteUndefined from '@Lib/deleteUndefined';
import CustomError from '@Middleware/error/customError';
import Notice from '@Model/notice.model';
import NoticeViewLog from '@Model/noticeViewLog.model';

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
  const limit = 10;
  const searchType: 'list' | 'post' = req.query.type as any;
  const searchPage = (req.query.page as string && (req.query.page as any) - 1) || 0;
  const searchPk = req.query.post_pk as string;
  const searchTitle = req.query.title as string;

  const whereClause =
    searchType === 'post'
      ? {
          pk: searchPk,
          approved: true,
        }
      : {
          title: (searchTitle && { [Op.like]: `%${searchTitle}%` }) || undefined,
          approved: true,
        };

  deleteUndefined(whereClause);

  try {
    const notice: Notice | { rows: Notice[]; count: number } | undefined =
      searchType === 'post'
        ? await Notice.findOne({
            where: whereClause,
            attributes: ['pk', 'title', 'content', 'createdAt'],
          })
        : await Notice.findAndCountAll({
            where: whereClause,
            offset: searchPage * limit,
            limit,
            attributes: ['pk', 'title', 'createdAt'],
            order: [['createdAt', 'DESC']],
          });

    if (!notice) {
      next(new CustomError({ name: 'Not_Found' }));
    } else if (!(notice instanceof Notice)) {
      const noticePks = notice.rows.map(val => val.pk);
      const logs = await NoticeViewLog.findAll({
        where: {
          user_pk: res.locals.user.pk,
          notice_pk: noticePks,
        },
      });
      res.locals.temp = {
        ...res.locals.temp,
        notice: notice.rows.map(val => {
          const EditedNotice = {
            pk: val.pk,
            title: val.title,
            createdAt: val.createdAt,
            read: false,
          };
          for (const log of logs) {
            if (val.pk === log.notice_pk) {
              EditedNotice.read = true;
            }
          }
          return EditedNotice;
        }),
        resultCount: notice.count,
      };
    } else {
      res.locals.temp = {
        ...res.locals.temp,
        notice,
      };
    }
    await next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getNotice;
