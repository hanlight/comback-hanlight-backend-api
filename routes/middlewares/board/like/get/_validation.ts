import { oneOf, query } from 'express-validator';

const getBoardLikeValidation = oneOf([
  [
    query('type')
      .isString()
      .custom(val => val === 'board'),
    query('board_pk').isInt(),
  ],
  [
    query('type')
      .isString()
      .custom(val => val === 'comment'),
    query('board_pk').isInt(),
    query('comment_pk').isInt(),
  ],
]);

export default getBoardLikeValidation;
