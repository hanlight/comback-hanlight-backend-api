import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Calendar from '@Model/calendar.model';
import CalendarLog from '@Model/calendarLog.model';
import User from '@Model/user.model';

const deleteCalendar = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const pk = req.query.calendar_pk as string;

  try {
    const calendar: Calendar = await Calendar.findOne({
      where: {
        pk,
      },
    });

    if (calendar) {
      await Promise.all([
        calendar.destroy(),
        CalendarLog.create({
          user_pk: user.pk,
          user_name: user[user.type].name,
          type: 'D',
          month: calendar.month,
          date: calendar.date,
          detail: calendar.detail,
        }),
      ]);

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

export default deleteCalendar;
