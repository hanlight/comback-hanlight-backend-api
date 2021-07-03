import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const S3_CONFIG = {
  AWS_ACCESSKEY_ID: process.env.AWS_ACCESSKEY_ID,
  AWS_SECRET_ACCESSKEY: process.env.AWS_SECRET_ACCESSKEY,
  AWS_REGION: process.env.S3_AWS_REGION,
};

const s3 = new AWS.S3({
  accessKeyId: S3_CONFIG.AWS_ACCESSKEY_ID,
  secretAccessKey: S3_CONFIG.AWS_SECRET_ACCESSKEY,
  region: S3_CONFIG.AWS_REGION,
});

export default s3;
