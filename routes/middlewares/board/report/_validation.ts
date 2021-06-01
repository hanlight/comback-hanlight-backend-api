import { body, oneOf } from 'express-validator';

const reportValidation = oneOf([
  [
    body('type')
      .isString()
      .custom(val => val === 'board'),
    body('board_pk').isInt(),
    body('content')
      .optional()
      .isString()
      .isLength({ max: 300 }),
  ],
  [
    body('type')
      .isString()
      .custom(val => val === 'comment'),
    body('board_pk').isInt(),
    body('comment_pk').isInt(),
    body('content')
      .optional()
      .isString()
      .isLength({ max: 300 }),
  ],
]);

export default reportValidation;
