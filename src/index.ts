import {app} from './app';
import {server} from './config';


app.listen(server.port,()=>{
    console.log("app is running " + server.port);
})
