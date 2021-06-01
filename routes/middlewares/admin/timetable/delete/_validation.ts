import { query, ValidationChain } from 'express-validator';

import { days } from '@Middleware/timetable/getTimeTable';

const deleteTimeTableValidation: ValidationChain[] = [
  query('major')
    .isString()
    .custom(val => ['H', 'U', 'G'].includes(val)),
  query('grade').isInt({ min: 1, max: 3 }),
  query('classNum').isInt({ min: 1, max: 2 }),
  query('day')
    .isString()
    .custom(val => days.includes(val)),
  query('th').isInt({ min: 1, max: 10 }),
];

export default deleteTimeTableValidation;
