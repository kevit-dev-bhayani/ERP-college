import {App} from './app';
import {router as pingPongRouter} from './ping';
import {router as userRouter} from './modules/users/user.routes';

const app = new App([pingPongRouter, userRouter]);
app.listen();
