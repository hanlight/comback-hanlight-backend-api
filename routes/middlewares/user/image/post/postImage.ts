import { NextFunction, Request, Response } from 'express';
import * as sharp from 'sharp';

import s3 from '@Lib/s3';
import CustomError from '@Middleware/error/customError';

const postProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    try {
      const resizedFile: Express.Multer.File = {
        ...req.file,
        originalname: '360x360',
        buffer: await sharp(req.file.buffer)
          .resize(360, 360)
          .toBuffer(),
      };

      const result: string = await upload(resizedFile);

      res.locals.temp = {
        ...res.locals.temp,
        file: result,
      };
      next();
    } catch (error) {
      console.log(error);
      next(new CustomError({ name: 'Unhandled_Error', message: '파일 업로드에 실패하였습니다.' }));
    }
  } else {
    next(new CustomError({ name: 'Wrong_Data' }));
  }
};

function upload(file: Express.Multer.File): Promise<string> {
  const Key = Date.now().toString() + '.' + file.mimetype.split('/')[1];
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: 'hanlight/profile-image',
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

export default postProfileImage;
