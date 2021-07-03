import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import TimeTable from '@Model/timeTable.model';
import TimeTableLog from '@Model/timeTableLog.model';
import User from '@Model/user.model';

const postTimeTable = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const grade: number = parseInt(req.body.grade, 10);
  const classNum: number = parseInt(req.body.classNum, 10);
  const day: string = req.body.day;
  const detail: string = req.body.detail;
  const th: number = parseInt(req.body.th, 10);

  try {
    const duplicate: TimeTable = await TimeTable.findOne({
      where: {
        grade,
        classNum,
        day,
        th,
      },
    });

    if (!duplicate) {
      const [timeTable]: [TimeTable, unknown] = await Promise.all([
        TimeTable.create({
          grade,
          classNum,
          day,
          detail,
          th,
        }),
        TimeTableLog.create({
          type: 'C',
          user_pk: user.pk,
          user_name: user[user.type].name,
          grade,
          classNum,
        }),
      ]);

      res.json({
        success: true,
        data: {
          timeTable,
        },
      });
    } else {
      next(new CustomError({ name: 'Exist_Data' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postTimeTable;
