import { NextFunction, Request, Response } from 'express';
import * as Multer from 'multer';

import CustomError from '@Middleware/error/customError';

const profileImageMulter = (req: Request, res: Response, next: NextFunction) => {
  multer(req, res, err => {
    if (err) {
      next(new CustomError({ name: 'Wrong_Data', message: err.message }));
    } else {
      next();
    }
  });
};

const multer = Multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Wrong mimetype') as any, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
}).single('file');

export default profileImageMulter;
