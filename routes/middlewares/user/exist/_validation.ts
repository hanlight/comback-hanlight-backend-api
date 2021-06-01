import { query, ValidationChain } from 'express-validator';

import { id } from '@Lib/pattern.json';

const existValidation: ValidationChain[] = [
  query('key').isIn(['id']),
  query('value')
    .isString()
    .custom((val, { req }) => {
      const idRegExp: RegExp = new RegExp(id);

      if (req.query.key as string) {
        if (req.query.key as string === 'id') {
          return idRegExp.test(val);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }),
];

export default existValidation;
