import { Express, NextFunction, Request, Response } from 'express';

import s3 from '@Lib/s3';
import CustomError from '@Middleware/error/customError';

const postBoardImage = async (req: Request, res: Response, next: NextFunction) => {
  if (req.files instanceof Array && req.files.length !== 0) {
    const promises = [];
    for (const file of req.files) {
      promises.push(upload(file));
    }
    Promise.all(promises)
      .then((results: string[]) => {
        res.locals.temp = {
          ...res.locals.temp,
          files: results,
        };
        next();
      })
      .catch(err => {
        console.log(err);
        next(new CustomError({ name: 'Unhandled_Error', message: '파일 업로드에 실패하였습니다.' }));
      });
  } else {
    next();
  }
};

function upload(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const Key = Date.now().toString() + '.' + file.mimetype.split('/')[1];
    s3.putObject(
      {
        Bucket: 'hanlight',
        ACL: 'public-read',
        ContentType: file.mimetype,
        Key,
        Body: file.buffer,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(Key);
        }
      }
    );
  });
}

export default postBoardImage;
