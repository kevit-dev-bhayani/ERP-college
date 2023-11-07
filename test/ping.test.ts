// import * as request from 'supertest';
import request from 'supertest';
import {App} from '../src/app';
import {router as pingPongRouter} from '../src/ping';
import {router as userRouter} from '../src/modules/users/user.routes';
import {router as studentRouter} from '../src/modules/students/student.routes';
import {router as departmentRouter} from '../src/modules/department/department.routes';
import {router as attendanceRouter} from '../src/modules/attendance/attendance.routes';

const app = new App([pingPongRouter, userRouter, studentRouter, departmentRouter, attendanceRouter]).app;

test('ping pong', async () => {
  console.log('this is testing');
  await request(app).get('/ping').expect('pong');
});
