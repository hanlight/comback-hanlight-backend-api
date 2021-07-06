import * as http from 'http';
import * as XLSX from 'xlsx';
import app from 'app';

import Student from '@Model/student.model';
import User from '@Model/user.model';

const port: number = 6000;

const excelFile = XLSX.readFile( "users.xlsx" ); // name / grade / classNum / studentNum
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];
const users : any = XLSX.utils.sheet_to_json( firstSheet, { defval : "" } )

http.createServer(app).listen(port, async () => {
  for (let i = 0; i < users.length; i++) {
    const signKey = Math.random().toString(36).substr(2,8).toUpperCase();
    try{
      const duplicate = await User.findOne({ 
        include:[{
          model: Student,
          required: true,
          where:{
              name : users[i].name,
              grade : users[i].grade,
              classNum : users[i].classNum,
              studentNum : users[i].studentNum,
          },
        }],
      })
      if (duplicate) {
        console.log('겹치는 유저가 있습니다.\n');
      } else {
        console.log(users[i].name + " / " + users[i].grade + " / " + users[i].classNum + " / " + users[i].studentNum + "\n");
        User.create({
            type: 'student',
            admin : 0,
            signKey,
            student: {
              name : users[i].name,
              grade : users[i].grade,
              classNum : users[i].classNum,
              studentNum : users[i].studentNum,
            },
          },
          { include: [{ model: Student }]
        });
      }
    } catch (error) {
      console.log(error);
      process.exit(5);
    }
  }
  console.log("엑셀 파일 생성 완료.\n")
  process.exit(2);
})
