import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';

const login = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const requestPassword = res.locals.temp.password;

  if (user.password === requestPassword) {
    next();
  } else {
    next(new CustomError({ name: 'Not_User', message: '등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.' }));
  }
};

export default login;
