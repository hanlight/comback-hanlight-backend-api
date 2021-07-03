import { body, ValidationChain } from 'express-validator';

const getHanseithonUserValidation: ValidationChain[] = [body('user_pk').isUUID()];

export default getHanseithonUserValidation;
