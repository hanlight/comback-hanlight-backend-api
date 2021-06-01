import { query, ValidationChain } from 'express-validator';

const deleteApproveValidation: ValidationChain[] = [query('approve_pk').isInt()];

export default deleteApproveValidation;
