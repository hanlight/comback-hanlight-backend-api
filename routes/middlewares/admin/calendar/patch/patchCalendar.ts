import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Calendar from '@Model/calendar.model';
import CalendarLog from '@Model/calendarLog.model';
import User from '@Model/user.model';

const patchCalendar = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk: number = req.body.calendar_pk;
  const detail: string = req.body.detail;
  const month: number = (req.body.month && parseInt(req.body.month, 10)) || undefined;
  const date: number = (req.body.date && parseInt(req.body.date, 10)) || undefined;
  try {
    const calendar: Calendar = await Calendar.findOne({ where: { pk } });

    if (calendar) {
      const [updatedCalendar]: [Calendar, unknown] = await Promise.all([
        calendar.update({
          detail,
          month,
          date,
        }),
        CalendarLog.create({
          user_pk: user.pk,
          user_name: user[user.type].name,
          type: 'U',
          month: calendar.month,
          date: calendar.date,
          detail: calendar.detail,
        }),
      ]);

      res.json({
        success: true,
        data: {
          calendar: updatedCalendar,
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

export default patchCalendar;
