import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';
import User from '@Model/user.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';

const getHanseithonUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    user_pk
  } = req.body as any;

  User.findOne({
    where: {
      pk: user_pk,
    },
    attributes: ['type'],
    include: [
      { model: Student, required: true, attributes: ['name'] },
      { model: Teacher, required: true, attributes: ['name'] },
      { model: Graduate, required: true, attributes: ['name'] },
      { model: Parent, required: true, attributes: ['name'] },
    ],
  })
    .then((user: User) => {
      if(user){
        res.json({
          
          success: true,
          data: {
              user : {
                  name : user[user.type].name,
                  type : user.type
              }
          },
        })
      }else{
        next(new CustomError({ name: 'Not_User', message: '존재하지 않는 유저입니다 PK를 확인해주세요'}));
      }
    })
    .catch(err => {
      console.log(err);
      next(new CustomError({ name: 'Database_Error' }));
    });
};

export default getHanseithonUser;
