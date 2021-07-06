import { NextFunction, Request, Response } from 'express';

import Student from '@Model/student.model';
import User from '@Model/user.model';
import CustomError from '@Middleware/error/customError';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const grade: number | undefined = req.query.grade as any;
    const classNum: number | undefined = req.query.classNum as any;

    try {
        const users: User[] = await User.findAll({
            attributes: ['signKey','type'],
            include:[{
                model: Student,
                attributes: ['grade', 'classNum', 'studentNum', 'name'],
                required: true,        
                where:{
                    classNum,
                    grade
                },
                order: [['studentNum', 'DESC']],
            }],
        });
        res.json({
            success: true,
            data: {
                users: users.filter((val: User) => {
                    return val.signKey != null;
                }).map((val: User) => ({
                    grade:val.student.grade,
                    classNum:val.student.classNum,
                    studentNum:val.student.studentNum,
                    name:val.student.name,
                    signkey:val.signKey
                })).sort((first, second) => {
                    return first.studentNum - second.studentNum;
                }),            
            },
        });
    } catch (error) {
        console.log(error);
        next(new CustomError({ name: 'Database_Error' }));
    }


};

export default getUser;
