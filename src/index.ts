import {app} from './app';
import {server} from './config';
import {logger} from './utils/logger';

app.listen(server.port, () => {
  logger.info('app is running ' + server.port);
});
