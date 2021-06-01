import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import CustomError from '@Middleware/error/customError';

import Meal from '@Model/meal.model';

const getMeal = async (req: Request, res: Response, next: NextFunction) => {
  const sort: 'month' | 'week' = req.query.sort as any;
  const month: number | null = req.query.month as any;

  const date = new Date();

  try {
    const meal: Array<{
      month: number;
      date: number;
      detail: string;
    }> = await Meal.findAll({
      where:
        sort === 'week'
          ? {
              [Op.or]: [
                {
                  month: date.getMonth() + 1,
                  date: {
                    [Op.gte]: date.getDate(),
                  },
                },
                {
                  month: date.getMonth() + 2,
                },
              ],
            }
          : {
              month,
              date: {
                [Op.ne]: null,
              },
            },
      order: [['month', 'ASC'], ['date', 'ASC']],
      attributes: ['month', 'date', 'detail'],
      limit: sort === 'week' ? 7 : 32,
    });

    const result =
      sort === 'month'
        ? meal
        : new Array(7).fill(null).map((_, i) => {
            const d = new Date();
            d.setDate(date.getDate() + i);
            const dMonth = d.getMonth() + 1;
            const dDate = d.getDate();
            const dDay = d.getDay();

            if (meal.some(val => val.month === dMonth && val.date === dDate)) {
              return {
                month: dMonth,
                date: dDate,
                detail: meal[meal.findIndex(val => val.month === dMonth && val.date === dDate)].detail,
              };
            } else if (dDay === 0 || dDay === 6) {
              return {
                month: dMonth,
                date: dDate,
                detail: '주말',
              };
            } else {
              return {
                month: dMonth,
                date: dDate,
                detail: 'X',
              };
            }
          });

    await res.json({
      success: true,
      data: {
        meal: result,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getMeal;
