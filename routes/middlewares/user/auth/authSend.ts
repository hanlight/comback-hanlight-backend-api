import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import PhoneNumber from 'awesome-phonenumber';
import CustomError from '@Middleware/error/customError';
// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
var Cache = require('memory-cache');

dotenv.config();


const authSend = async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    let pn : PhoneNumber;
    if (/^010{1}[0-9]{3,4}[0-9]{4}$/.test(phone) || /^010{1}-[0-9]{3,4}-[0-9]{4}$/.test(phone)) {
        pn = new PhoneNumber(phone,'KR');
        let verifyCode = String(Math.floor(Math.random() * 10));
        for (let i = 0; i < 5; i++) {
            verifyCode += String(Math.floor(Math.random() * 10));
        };
        if(Cache.get('0' + pn.getNumber('significant'))){
            next(new CustomError({ name: 'Wrong_Data', message: '전송 후 1분 뒤 다시 시도해주세요.' }));
        }else{
            Cache.put('0' + pn.getNumber('significant'), true, 60000);
            Cache.put(verifyCode, '0' + pn.getNumber('significant'), 180000);
    
            AWS.config.update({region: process.env.SNS_AWS_REGION});
    
            const params = {
            Message: '[한빛] 본인확인 인증번호 [' + verifyCode + ']를 화면에 입력해주세요',
            PhoneNumber: pn.getNumber('e164')
            };
    
            let publishTextPromise = new AWS.SNS().publish(params).promise();
    
            publishTextPromise.then(
            (data) => {
                console.log("MessageID is " + data.MessageId);
                res.json({
                    success: true,
                })
            }).catch(
                (err) => {
                console.error(err);
                next(new CustomError({ name: 'Wrong_Data', message: '잘못 된 전화번호입니다.' }));
            });
        }

        
    }else{
        next(new CustomError({ name: 'Wrong_Data', message: '잘못 된 전화번호입니다.' }));
    }

}


export default authSend;
