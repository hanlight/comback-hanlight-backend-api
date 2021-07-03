import { body, ValidationChain } from 'express-validator';

import { days } from '@Middleware/timetable/getTimeTable';

/**
 * grade, classNum, day, detail, th
 */
const postTimeTableValidation: ValidationChain[] = [
  body('grade').isInt({ min: 1, max: 3 }),
  body('classNum').isInt({ min: 1, max: 5 }),
  body('day')
    .isString()
    .custom(val => days.includes(val)),
  body('detail').isString(),
  body('th').isInt({ min: 1, max: 10 }),
];

export default postTimeTableValidation;
