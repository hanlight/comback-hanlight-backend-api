import { query, ValidationChain } from 'express-validator';

const deleteUserValidation: ValidationChain[] = [query('user_pk').isUUID()];

export default deleteUserValidation;
