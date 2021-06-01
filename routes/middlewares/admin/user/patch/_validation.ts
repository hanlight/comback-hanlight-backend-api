import { id, tp } from '@Lib/pattern.json';
import { body, ValidationChain } from 'express-validator';

const patchUsersValidation: ValidationChain[] = [
  body('user_pk').isUUID(),
  body('id')
    .optional()
    .isString()
    .matches(id),
  body('admin')
    .optional()
    .isInt({ min: 0, max: 7 }),
  body('tp')
    .optional()
    .isString()
    .matches(tp),
];

export default patchUsersValidation;
