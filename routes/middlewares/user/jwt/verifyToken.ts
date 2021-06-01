import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import CustomError from '@Middleware/error/customError';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string | string[] = req.headers.access_token;
  const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET;

  try {
    const decoded = await jwt.verify(accessToken as string, accessTokenSecret);
    res.locals.user = decoded;
    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        next(new CustomError({ name: 'Token_Expired' }));
        break;
      case 'JsonWebTokenError':
        next(new CustomError({ name: 'Wrong_Request' }));
        break;
      default:
        next(new CustomError({ name: 'Unhandled_Error' }));
        break;
    }
  }
};

export default verifyToken;
