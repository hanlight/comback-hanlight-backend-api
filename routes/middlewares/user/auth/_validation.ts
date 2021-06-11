import { body, ValidationChain } from 'express-validator';

const authValidation: ValidationChain[] = [body('phone').isString()];

export default authValidation;
