import axios, { AxiosError } from 'axios';
import * as http from 'http';
import * as randomstring from 'randomstring';
import { Op } from 'sequelize';

import app from 'app';
import { connect } from './database/index';
import * as pattern from './lib/pattern.json';

import Student from '@Model/student.model';
import User from '@Model/user.model';

const port: number = 13337;
const baseUrl = 'http://127.0.0.1:' + process.env.PORT;
const argv = process.argv;
const id = argv[2];
const password = argv[3];
const admin = parseInt(argv[4], 10);
const tp = argv[5];

const idBool = new RegExp(pattern.id).test(id);
const passwordBool = new RegExp(pattern.password).test(password);
const tpBool = new RegExp(pattern.tp).test(tp);

if (!(idBool && passwordBool && !isNaN(admin) && tpBool)) {
  console.error(id, password, admin, tp, '잘못된 요청 사항입니다. 입니다.');
  process.exit(1);
}

http.createServer(app).listen(port, async () => {
  try {
    const signKey = randomstring.generate({
      length: 6,
      charset: 'alphanumeric',
    });
    const duplicate = await User.findOne({ where: { [Op.or]: [{ tp }, { id }] } });

    if (duplicate) {
      console.log('겹치는 유저가 있습니다.');
      process.exit(4);
    } else {
      await User.create(
        {
          type: 'student',
          admin,
          tp,
          signKey,
          student: {
            major: 'U',
            grade: 3,
            classNum: 2,
            studentNum: 28,
            name: '이예준',
          },
        },
        { include: [{ model: Student }] }
      );
      await axios.post(`${baseUrl}/api/user/register`, {
        id,
        password,
        signKey,
      });
      console.log('성공적으로 유저를 생성하였습니다.');
      process.exit(2);
    }
  } catch (error) {
    console.log(error);
    process.exit(5);
  }
});
