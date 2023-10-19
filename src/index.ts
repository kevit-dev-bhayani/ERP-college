import {App} from './app';
import {router as pingPong} from './ping';

const app = new App([pingPong]);
app.listen();
