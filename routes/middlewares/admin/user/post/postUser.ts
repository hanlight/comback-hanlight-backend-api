import { NextFunction, Request, Response } from 'express';
import * as randomstring from 'randomstring';

import CustomError from '@Middleware/error/customError';

import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const type: 'student' | 'teacher' | 'parent' | 'graduate' = req.body.type;
  const name: string = req.body.name;
  const grade: number | undefined = (req.body.grade && parseInt(req.body.grade, 10)) || undefined;
  const classNum: number | undefined = (req.body.classNum && parseInt(req.body.classNum, 10)) || undefined;
  const studentNum: number | undefined = (req.body.studentNum && parseInt(req.body.studentNum, 10)) || undefined;

  try {
    if (type === 'student') {
      const duplicateUser = await Student.findOne({
        where: {
          grade,
          classNum,
          studentNum,
        },
      });

      if (duplicateUser) {
        next(new CustomError({ name: 'Exist_User', message: '중복 요소가 있습니다.' }));
      } else {
        const user: User = await User.create(
          {
            type,
            signKey: randomstring.generate({
              length: 6,
              charset: 'alphanumeric',
            }),
            student: {
              grade,
              classNum,
              studentNum,
              name,
            },
          },
          {
            include: [
              {
                model: Student,
              },
            ],
          }
        );

        res.json({
          success: true,
          data: {
            user,
          },
        });
      }
    } else {
      const user: User = await User.create(
        {
          type,
          signKey: randomstring.generate({
            length: 6,
            charset: 'alphanumeric',
          }),
          [type]: {
            name,
          },
        },
        {
          include: [
            {
              model: Teacher,
            },
            {
              model: Parent,
            },
            {
              model: Graduate,
            },
          ],
        }
      );
      res.json({
        success: true,
        data: {
          user,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postUser;
