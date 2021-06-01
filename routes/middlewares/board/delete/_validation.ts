import { query, ValidationChain } from 'express-validator';

const deleteBoardValidation: ValidationChain[] = [query('board_pk').isInt()];

export default deleteBoardValidation;
