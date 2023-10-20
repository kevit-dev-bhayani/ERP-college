require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import {Application, Router} from 'express';
import {server, mongoConfig} from './config';
import {logger} from './utils/logger';
export class App {
  public app: Application;
  public routers: Router[];

  constructor(routers: Router[]) {
    this.routers = routers;
    // this.listen();
    this.app = express();
    this.initializeRoute();
    this.mongooseSetup();
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

  mongooseSetup() {
    mongoose.connection.on('connected', () => {
      logger.info('DB connected...!');
    });

    mongoose.connection.on('error', (error) => {
      logger.error(`DB error - ${error}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn(`DB disconnected...!`);
    });

    mongoose.connect(`${mongoConfig.mongoUrl}${mongoConfig.dbName}`);
  }
}
// export const app: Application = express();
