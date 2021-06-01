import { query, ValidationChain } from 'express-validator';

const patchApproveValidation: ValidationChain[] = [query('approve_pk').isInt()];

export default patchApproveValidation;
