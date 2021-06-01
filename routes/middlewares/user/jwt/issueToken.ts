import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import deleteUndefined from '@Lib/deleteUndefined';
import User from '@Model/user.model';

dotenv.config();

const issueToken = (type: 'login' | 'none') => (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const accessToken: string = jwt.sign(
    {
      pk: user.pk,
    },
    accessTokenSecret,
    {
      expiresIn: '24h',
    }
  );

  const response = {
    accessToken,
    user:
      type === 'login'
        ? {
            type: user.type,
            admin: user.admin,
            name: user[user.type].name,
            id: user.id,
            major: user.type === 'student' ? user.student.major : null,
            grade: user.type === 'student' ? user.student.grade : null,
            classNum: user.type === 'student' ? user.student.classNum : null,
            studentNum: user.type === 'student' ? user.student.studentNum : null,
            image: user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${user.image}` : null,
          }
        : undefined,
  };

  deleteUndefined(response);

  res.json({
    success: true,
    data: response,
  });
};

export default issueToken;
