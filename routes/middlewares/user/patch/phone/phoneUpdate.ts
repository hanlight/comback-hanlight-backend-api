import { NextFunction, Request, Response } from 'express';
import PhoneNumber from 'awesome-phonenumber';
import CustomError from '@Middleware/error/customError';

const phoneUpdateCheck = async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    let pn : PhoneNumber;
    if (/^010{1}[0-9]{3,4}[0-9]{4}$/.test(phone) || /^010{1}-[0-9]{3,4}-[0-9]{4}$/.test(phone)) {
        pn = new PhoneNumber(phone,'KR');
        res.locals.temp = { 
            ...res.locals.temp,
            tp:'0' + pn.getNumber('significant')
        }
        next();
    }else{
        next(new CustomError({ name: 'Wrong_Data', message: '잘못 된 전화번호입니다.' }));
    }
        
};

export default phoneUpdateCheck;
