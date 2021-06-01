import { query, ValidationChain } from 'express-validator';

const deleteNoticeValidation: ValidationChain[] = [query('notice_pk').isInt()];

export default deleteNoticeValidation;
