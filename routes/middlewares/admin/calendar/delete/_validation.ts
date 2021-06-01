import { query, ValidationChain } from 'express-validator';

const deleteCalendarValidation: ValidationChain[] = [query('calendar_pk').isInt()];

export default deleteCalendarValidation;
