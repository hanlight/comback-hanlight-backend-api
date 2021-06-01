import { body, ValidationChain } from 'express-validator';

const deleteBoardValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('content')
    .optional()
    .isString(),
];

export default deleteBoardValidation;
