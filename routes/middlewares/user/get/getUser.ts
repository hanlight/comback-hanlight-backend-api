import { NextFunction, Request, Response } from 'express';

import User from '@Model/user.model';

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  res.json({
    success: true,
    data: {
      user: {
        type: user.type,
        admin: user.admin,
        name: user[user.type].name,
        id: user.id,
        major: user.type === 'student' ? user.student.major : null,
        grade: user.type === 'student' ? user.student.grade : null,
        classNum: user.type === 'student' ? user.student.classNum : null,
        studentNum: user.type === 'student' ? user.student.studentNum : null,
        image: user.image ? `https://s3.ap-northeast-2.amazonaws.com/hanlight/profile-image/${user.image}` : null,
      },
    },
  });
};

export default getUser;
