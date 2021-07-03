import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const getUserFromToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = res.locals.user;
  try {
    const user: User | undefined = await User.findOne({
      where: {
        pk: tokenDecoded.pk,
      },
    });
    
    if (user) {
      if (Number(user.updatedAt) > tokenDecoded.iat * 1000) {
        next(new CustomError({ name: 'Token_Expired' }));
      }

      switch (user.type) {
        case 'student':
          const stduent: Student = await Student.findOne({ where: { user_pk: user.pk } });
          user.student = stduent;
          break;

        case 'parent':
          const parent: Parent = await Parent.findOne({ where: { user_pk: user.pk } });
          user.parent = parent;
          break;

        case 'teacher':
          const teacher: Teacher = await Teacher.findOne({ where: { user_pk: user.pk } });
          user.teacher = teacher;
          break;

        case 'graduate':
          const graduate: Graduate = await Graduate.findOne({ where: { user_pk: user.pk } });
          user.graduate = graduate;
          break;
      }
      res.locals.user = user;
      next();
    } else {
      next(new CustomError({ name: 'Wrong_Request' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getUserFromToken;
