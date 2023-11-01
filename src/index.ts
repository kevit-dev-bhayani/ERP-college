import {App} from './app';
import {router as pingPongRouter} from './ping';
import {router as userRouter} from './modules/users/user.routes';
import {router as studentRouter} from './modules/students/student.routes';
import {router as DepartmentRouter} from './modules/department/department.routes';

const app = new App([pingPongRouter, userRouter, studentRouter, DepartmentRouter]);
app.listen();
