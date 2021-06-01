import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const userExistCheck = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    const user: User | undefined = await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
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
    }

    switch (req.path) {
      case '/register':
        user ? next(new CustomError({ name: 'Exist_User' })) : next();
        break;
      case '/login':
        if (user) {
          res.locals.user = user;
          next();
        } else {
          next(new CustomError({ name: 'Not_User', message: '등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.' }));
        }
        break;
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default userExistCheck;
