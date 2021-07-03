import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import TimeTable from '@Model/timeTable.model';
import User from '@Model/user.model';

export const days = ['월', '화', '수', '목', '금'];

const getTimeTable = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const result: TimeTable[] =
      user.type !== 'student'
        ? []
        : await TimeTable.findAll({
            where: {
              grade: user.student.grade,
              classNum: user.student.classNum,
            },
            order: ['th'],
            attributes: ['detail', 'th', 'day'],
          });

    const timetable = {};
    for (const day of days) {
      timetable[day] = await result.filter(val => val.day === day).map(val => val.detail);
    }

    await res.json({
      sucess: true,
      data: {
        timetable,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getTimeTable;
