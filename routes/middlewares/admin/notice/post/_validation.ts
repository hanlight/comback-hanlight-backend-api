import { body, ValidationChain } from 'express-validator';

const postNoticeValidation: ValidationChain[] = [body('title').isString(), body('content').isString()];

export default postNoticeValidation;
