import { body, ValidationChain } from 'express-validator';

const patchNoticeValidation: ValidationChain[] = [
  body('notice_pk').isInt(),
  body('title')
    .optional()
    .isString(),
  body('content')
    .optional()
    .isString(),
];

export default patchNoticeValidation;
