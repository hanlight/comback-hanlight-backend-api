import { query } from 'express-validator';

const getCalendarValidation = [query('year').isInt({ min: 1990, max: 2030 }), query('month').isInt({ min: 1, max: 12 })];

export default getCalendarValidation;
