import { body, ValidationChain } from 'express-validator';

const recoveryIdValidation: ValidationChain[] = [body('code').isString()];

export default recoveryIdValidation;
