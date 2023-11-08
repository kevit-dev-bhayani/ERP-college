import {App} from './app';
import {router as pingPongRouter} from './ping';
import {router as userRouter} from './modules/users/user.routes';
import {router as studentRouter} from './modules/students/student.routes';
import {router as departmentRouter} from './modules/department/department.routes';
import {router as attendanceRouter} from './modules/attendance/attendance.routes';

const application = new App([pingPongRouter, userRouter, studentRouter, departmentRouter, attendanceRouter]);
application.listen();
// const app = new App([pingPongRouter, userRouter, studentRouter, departmentRouter, attendanceRouter]).app;
// export {app};
