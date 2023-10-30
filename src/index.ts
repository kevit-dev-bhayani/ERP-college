import {App} from './app';
import {router as pingPongRouter} from './ping';
import {router as userRouter} from './modules/users/user.routes';
import {router as studentRouter} from './modules/students/student.routes';

const app = new App([pingPongRouter, userRouter, studentRouter]);
app.listen();
