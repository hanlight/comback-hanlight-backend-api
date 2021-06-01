import { body, ValidationChain } from 'express-validator';

const deleteCommentValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('content')
    .optional()
    .isString(),
];

export default deleteCommentValidation;
