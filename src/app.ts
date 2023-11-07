require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {Application, Router} from 'express';
import {server, mongoConfig} from './config';
import {logger} from './utils/logger';
import {errorHandler} from './middlewares/error-handler';

export class App {
  public app: Application;
  public routers: Router[];

  constructor(routers: Router[]) {
    this.routers = routers;
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoute();
    this.mongooseSetup();
    // this.app.listen();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'Connection'],
        credentials: true,
        optionsSuccessStatus: 200
      })
    );
  }

  initializeRoute() {
    this.routers.forEach((router) => {
      this.app.use('/', router);
    });
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(server.port, () => {
      logger.info(`app is running on port ${server.port}`);
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
