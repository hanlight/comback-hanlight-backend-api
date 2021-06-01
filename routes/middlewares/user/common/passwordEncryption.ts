import { pbkdf2Sync, randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

dotenv.config();

const PW_ENCRYPTION_CONFIG = {
  PW_ENCRYPTION_ALGORITHM: process.env.PW_ENCRYPTION_ALGORITHM,
  PW_ENCRYPTION_ITERATION: parseInt(process.env.PW_ENCRYPTION_ITERATION, 10),
  PW_ENCRYPTION_SALTSIZE: parseInt(process.env.PW_ENCRYPTION_SALTSIZE, 10),
  PW_ENCRYPTION_SIZE: parseInt(process.env.PW_ENCRYPTION_SIZE, 10),
};

const passwordEncryption = (req: Request, res: Response, next: NextFunction) => {
  const password: string = req.body.password;
  const PW_ENCRYPTION_SET = {
    PW_ENCRYPTION_ALGORITHM: PW_ENCRYPTION_CONFIG.PW_ENCRYPTION_ALGORITHM,
    PW_ENCRYPTION_ITERATION: PW_ENCRYPTION_CONFIG.PW_ENCRYPTION_ITERATION,
    PW_ENCRYPTION_SALTSIZE: PW_ENCRYPTION_CONFIG.PW_ENCRYPTION_SALTSIZE,
    PW_ENCRYPTION_SIZE: PW_ENCRYPTION_CONFIG.PW_ENCRYPTION_SIZE,
  };

  try {
    const salt =
      (res.locals.user && res.locals.user.passwordKey) || randomBytes(PW_ENCRYPTION_SET.PW_ENCRYPTION_SALTSIZE).toString('base64');
    const key = pbkdf2Sync(
      password,
      salt,
      PW_ENCRYPTION_SET.PW_ENCRYPTION_ITERATION,
      PW_ENCRYPTION_SET.PW_ENCRYPTION_SIZE,
      PW_ENCRYPTION_SET.PW_ENCRYPTION_ALGORITHM
    ).toString('base64');

    res.locals.temp = {
      ...res.locals.temp,
      password: key,
      passwordKey: salt,
    };
    next();
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Unhandled_Error', message: error.message }));
  }
};

export default passwordEncryption;
