import { body } from 'express-validator';

const PostCommentValidation = [
  body('board_pk').isInt(),
  body('content')
    .isString()
    .isLength({ max: 300 }),
];

export default PostCommentValidation;
