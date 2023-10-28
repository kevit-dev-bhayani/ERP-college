import jwt from 'jsonwebtoken';
import {join} from 'path';
import fs from 'fs';
import {findUserById} from '../modules/users/user.services';
import {findStudentById} from '../modules/students/student.services';
import {Request, Response, NextFunction, json} from 'express';
import {newError} from '../utils/error';
import {logger} from '../utils/logger';

/**
 * Middleware to verify authToken and User from DB
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    throw 'UNAUTHENTICATED';
  }
  try {
    const privateKey = fs.readFileSync(join(__dirname, '../../keys/private.key'));
    const {_id, role} = jwt.verify(token, privateKey);
    const person = role === 'STUDENT' ? await findStudentById(_id) : await findUserById(_id);
    if (token !== person.authToken) {
      throw 'UNAUTHENTICATED';
    }

    req['data'] = {_id, role};
    next();
  } catch (error) {
    logger.error(`Error occurred while authentication - ${error}`);
    next(newError(401, error));
  }
};
