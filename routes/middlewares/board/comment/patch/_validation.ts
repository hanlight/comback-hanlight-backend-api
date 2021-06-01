import { body, ValidationChain } from 'express-validator';

const patchCommentValidation: ValidationChain[] = [
  body('board_pk').isInt(),
  body('comment_pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 300 }),
];

export default patchCommentValidation;
