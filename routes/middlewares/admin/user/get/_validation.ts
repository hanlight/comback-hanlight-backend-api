import { query, ValidationChain } from 'express-validator';

const userTypes = ['student', 'teacher', 'graduate', 'parent'];

const getUserValidation: ValidationChain[] = [
  query('type')
    .optional()
    .isString()
    .custom((val: string) => userTypes.includes(val)),
  query('grade')
    .optional()
    .isInt({ min: 1, max: 3 }),
  query('classNum')
    .optional()
    .isInt({ min: 1, max: 5 }),
  query('studentNum')
    .optional()
    .isInt({ min: 1, max: 35 }),
  query('name')
    .optional()
    .isString(),
];

export default getUserValidation;
