import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import User from '@Model/user.model';

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  function checkLevel(minLevel: number) {
    return user.admin >= minLevel ? next() : next(new CustomError({ name: 'Forbidden' }));
  }

  if (user.admin >= 2) {
    switch (`${req.method} ${req.path}`) {
      case 'GET /user':
        checkLevel(3);
        break;
      case 'POST /user':
        checkLevel(3);
        break;
      case 'PATCH /user':
        checkLevel(3);
        break;
      case 'DELETE /user':
        checkLevel(4);
        break;
      case 'GET /notice':
        checkLevel(2);
        break;
      case 'POST /notice':
        checkLevel(2);
        break;
      case 'PATCH /notice':
        checkLevel(2);
        break;
      case 'DELETE /notice':
        checkLevel(2);
        break;
      case 'PATCH /notice/approve':
        checkLevel(3);
        break;
      case 'DELETE /notice/approve':
        checkLevel(4);
        break;
      case 'POST /timetable':
        checkLevel(2);
        break;
      case 'DELETE /timetable':
        checkLevel(2);
        break;
      case 'POST /calendar':
        checkLevel(2);
        break;
      case 'PATCH /calendar':
        checkLevel(2);
        break;
      case 'DELETE /calendar':
        checkLevel(2);
        break;
      case 'DELETE /board':
        checkLevel(3);
        break;
      case 'DELETE /comment':
        checkLevel(3);
        break;
      case 'POST /hanseithon/user':
        checkLevel(3);
        break;
      default:
        console.log(`${req.method} ${req.path}`);
        next(new CustomError({ name: 'Not_Found' }));
    }
  } else {
    next(new CustomError({ name: 'Forbidden' }));
  }
};

export default checkAdmin;
