import { body, ValidationChain } from 'express-validator';

import { password } from '@Lib/pattern.json';

const userPatchPassword: ValidationChain[] = [
  body('password')
    .isString()
    .matches(password),
];

export default userPatchPassword;
