import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import Calendar from '@Model/calendar.model';

const getCalendar = async (req: Request, res: Response, next: NextFunction) => {
  const year: number = req.query.year as any;
  const month: number = req.query.month as any;

  try {
    const result = await Calendar.findAll({
      where: {
        year,
        month,
      },
      order: [['date', 'ASC']],
    }).map((val: Calendar) => ({
      date: val.date,
      detail: val.detail,
    }));

    await res.json({
      success: true,
      data: {
        calendar: result,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getCalendar;
