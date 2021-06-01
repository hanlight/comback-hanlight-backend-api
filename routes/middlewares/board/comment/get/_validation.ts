import { query, ValidationChain } from 'express-validator';

const getCommentValidation: ValidationChain[] = [
  query('board_pk').isInt(),
  query('page')
    .optional()
    .isInt(),
];

export default getCommentValidation;
