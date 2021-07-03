import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import PhoneNumber from 'awesome-phonenumber';
import CustomError from '@Middleware/error/customError';
// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
var Cache = require('memory-cache');
import { body } from 'express-validator';
dotenv.config();


const authCheckCode = async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const phone = Cache.get(code);
    
    if(code == undefined || phone == undefined){
        next(new CustomError({ name: 'Wrong_Data', message: '잘못 된 인증코드입니다.' }));
    }else{
        res.locals.temp = { 
            ...res.locals.temp,
            tp:phone
        }
        next();
    }

}


export default authCheckCode;
