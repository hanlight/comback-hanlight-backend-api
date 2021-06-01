import { oneOf, query } from 'express-validator';

const getMealValidation = oneOf([
  [
    query('sort')
      .isString()
      .custom(val => val === 'week'),
  ],
  [
    query('sort')
      .isString()
      .custom(val => val === 'month'),
    query('month').isInt({ min: 1, max: 12 }),
  ],
]);

export default getMealValidation;
