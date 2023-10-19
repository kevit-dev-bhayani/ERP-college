require('dotenv').config();
import express from 'express';
import {Application, Router} from 'express';
import {server} from './config';
import {logger} from './utils/logger';
export class App {
  public app: Application;
  public routers: Router[];

  constructor(routers: Router[]) {
    this.routers = routers;
    // this.listen();
    this.app = express();
    this.initializeRoute();
  }
  listen() {
    this.app.listen(server.port, () => {
      logger.info(`app is running on port ${server.port}`);
    });
  }
  initializeRoute() {
    this.routers.forEach((router) => {
      this.app.use('/', router);
    });
  }
}
// export const app: Application = express();
