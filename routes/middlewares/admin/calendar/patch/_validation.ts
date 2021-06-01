import { body, ValidationChain } from 'express-validator';

const patchCalendarValidation: ValidationChain[] = [
  body('calendar_pk').isInt(),
  body('detail')
    .optional()
    .isString(),
  body('month')
    .optional()
    .isInt({ min: 1, max: 12 }),
  body('date')
    .optional()
    .isInt({ min: 1, max: 31 }),
];

export default patchCalendarValidation;
