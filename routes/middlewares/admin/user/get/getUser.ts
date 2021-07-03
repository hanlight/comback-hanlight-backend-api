import { NextFunction, Request, Response } from 'express';
import { col, Includeable, Op } from 'sequelize';

import deleteUndefined from '@Lib/deleteUndefined';

import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const limit = 15;
  const page = (req.query.page as string && (req.query.page as any) - 1) || 0;

  const type: 'student' | 'teacher' | 'graduate' | 'parent' | undefined = req.query.type as any;
  const grade: number | undefined = req.query.grade as any;
  const classNum: number | undefined = req.query.classNum as any;
  const studentNum: number | undefined = req.query.studentNum as any;
  const name: string | undefined = req.query.name as string;

  const userClause = {
    type,
  };

  const stduentClause = {
    grade,
    classNum,
    studentNum,
    name: name ? { [Op.like]: `%${name}%` } : undefined,
  };

  const onlyNameClause = {
    name: name ? { [Op.like]: `%${name}%` } : undefined,
  };

  deleteUndefined(userClause);
  deleteUndefined(stduentClause);
  deleteUndefined(onlyNameClause);

  const include: Includeable[] = [];

  if (type === 'student' || grade || classNum || studentNum) {
    include.push({
      model: Student,
      where: stduentClause,
      attributes: ['grade', 'classNum', 'studentNum', 'name'],
      required: true,
    });
  } else if (type === 'graduate') {
    include.push({
      model: Graduate,
      where: onlyNameClause,
      attributes: ['name'],
      required: true,
    });
  } else if (type === 'parent') {
    include.push({
      model: Parent,
      where: onlyNameClause,
      attributes: ['name'],
      required: true,
    });
  } else if (type === 'teacher') {
    include.push({
      model: Teacher,
      where: onlyNameClause,
      attributes: ['name'],
      required: true,
    });
  } else {
    include.push(
      {
        model: Student,
        attributes: ['grade', 'classNum', 'studentNum', 'name'],
        where: onlyNameClause,
        required: false,
      },
      {
        model: Graduate,
        attributes: ['name'],
        where: onlyNameClause,
        required: false,
      },
      {
        model: Parent,
        attributes: ['name'],
        where: onlyNameClause,
        required: false,
      },
      {
        model: Teacher,
        where: onlyNameClause,
        attributes: ['name'],
        required: false,
      }
    );
  }

  const users: User[] = await User.findAll({
    limit,
    offset: page * limit,
    where: userClause,
    attributes: ['pk', 'type', 'admin', 'signKey', 'id', 'tp'],
    include,
  });
  res.json({
    success: true,
    data: {
      user: users,
    },
  });
};

export default getUser;
