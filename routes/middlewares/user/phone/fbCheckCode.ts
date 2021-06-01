import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as qs from 'querystring';

import CustomError from '@Middleware/error/customError';

dotenv.config();

const FB_CONFIG = {
  FB_VERSION: process.env.FB_VERSION,
  FB_APP_ID: process.env.FB_APP_ID,
  FB_APP_SECRET: process.env.FB_APP_SECRET,
};

const fbIssueToken = async (req: Request, res: Response, next: NextFunction) => {
  const fbIssueUrl = `https://graph.accountkit.com/${FB_CONFIG.FB_VERSION}/access_token?`;
  const fbVerifyUrl = `https://graph.accountkit.com/${FB_CONFIG.FB_VERSION}/me?`;
  const query = {
    grant_type: 'authorization_code',
    code: req.body.code,
    access_token: ['AA', FB_CONFIG.FB_APP_ID, FB_CONFIG.FB_APP_SECRET].join('|'),
  };

  try {
    const fbIssueResponse: AxiosResponse<{
      id: string;
      access_token: string;
      token_refresh_interval_sec: number;
    }> = await axios.get(fbIssueUrl + qs.stringify(query));

    const fbVerifyResponse: AxiosResponse<{
      id: string;
      phone: {
        number: string;
        country_prefix: string;
        national_number: string;
      };
      application: {
        id: string;
      };
    }> = await axios.get(`${fbVerifyUrl}access_token=${fbIssueResponse.data.access_token}`);

    if (fbVerifyResponse.data.application.id === FB_CONFIG.FB_APP_ID) {
      res.locals.temp = {
        ...res.locals.temp,
        tp: '0' + fbVerifyResponse.data.phone.national_number,
      };
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('code 에러');
    next(new CustomError({ name: 'Wrong_Request' }));
  }
};

export default fbIssueToken;
