import { query, ValidationChain } from 'express-validator';

const getCodePrintValidation: ValidationChain[] = [
  query('grade')
    .optional()
    .isInt({ min: 1, max: 3 }),
  query('classNum')
    .optional()
    .isInt({ min: 1, max: 5 }),
];

export default getCodePrintValidation;
