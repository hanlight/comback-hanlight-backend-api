import { body, ValidationChain } from 'express-validator';

const userPatchPhone: ValidationChain[] = [body('phone').isString()];

export default userPatchPhone;
