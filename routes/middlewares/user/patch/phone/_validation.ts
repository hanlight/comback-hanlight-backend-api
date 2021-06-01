import { body, ValidationChain } from 'express-validator';

const userPatchPhone: ValidationChain[] = [body('code').isString()];

export default userPatchPhone;
