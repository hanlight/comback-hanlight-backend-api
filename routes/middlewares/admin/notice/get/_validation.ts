import { query, ValidationChain } from 'express-validator';

const GetNoticeValidation: ValidationChain[] = [
  query('page')
    .optional()
    .isInt(),
];

export default GetNoticeValidation;
