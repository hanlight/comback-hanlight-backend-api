import { body, oneOf } from 'express-validator';

const postBoardlikeValidation = oneOf([
  [
    body('type')
      .isString()
      .custom(val => val === 'board'),
    body('board_pk').isInt(),
  ],
  [
    body('type')
      .isString()
      .custom(val => val === 'comment'),
    body('comment_pk').isInt(),
    body('board_pk').isInt(),
  ],
]);

export default postBoardlikeValidation;
