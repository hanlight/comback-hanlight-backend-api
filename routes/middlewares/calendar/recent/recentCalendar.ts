import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import CustomError from '@Middleware/error/customError';

import Calendar from '@Model/calendar.model';

const recentCalendar = async (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();

  try {
    const calendar: Calendar[] = await Calendar.findAll({
      limit: 5,
      where: {
        [Op.or]: [
          {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: {
              [Op.gte]: date.getDate(),
            },
          },
          {
            year: date.getFullYear(),
            month: {
              [Op.gte]: date.getMonth() + 2,
            },
          },
          {
            year: {
              [Op.gt]: date.getFullYear(),
            },
          },
        ],
      },
      order: [['year', 'ASC'], ['month', 'ASC'], ['date', 'ASC']],
      attributes: ['year', 'month', 'date', 'detail'],
    });

    res.json({
      success: true,
      data: {
        calendar,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default recentCalendar;
