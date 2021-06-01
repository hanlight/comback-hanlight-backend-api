import { body, ValidationChain } from 'express-validator';

const postBoardValidation: ValidationChain[] = [
  body('content')
    .isString()
    .isLength({ max: 600 }),
  body('anonymous')
    .optional()
    .isInt({
      min: 0,
      max: 1,
    }),
];

export default postBoardValidation;
