import { id, password, signKey } from '@Lib/pattern.json';
import { body, ValidationChain } from 'express-validator';

const registerValidation: ValidationChain[] = [
  body('id')
    .isString()
    .matches(id),
  body('password')
    .isString()
    .matches(password),
  body('signKey')
    .isString()
    .matches(signKey),
];

export default registerValidation;
