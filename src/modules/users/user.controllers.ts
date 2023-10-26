import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {join} from 'path';

import {getUsers, createNewUser, findUserById, findUserByEmail, findAndDeleteUser} from './user.services';
import {newError} from '../../utils/error';
import {logger} from '../../utils/logger';

/**
 * get all users
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await getUsers();
    return res.status(200).json({success: true, data: users});
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // const test = await findUserByEmail(req.body.email);
    // if (test) {
    //   throw newError(500, 'EMAIL ALREADY TAKEN');
    // }
    const user = await createNewUser(req.body);
    // await user.save();
    return res.status(201).json({success: true, data: user});
  } catch (error) {
    logger.error(`Error while creating new user: ${error}`);
    next(error);
  }
};

/**
 * get User
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id, role} = req['data'];
    const user = await findUserById(_id);
    if (!user) {
      throw newError(404, 'NO USER FOUND');
    }
    return res.status(200).json({success: true, data: user});
  } catch (error) {
    logger.error(`Error while getting a user: ${error}`);
    next(error);
  }
};
/**
 * get User
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      throw newError(404, 'NO USER FOUND');
    }
    return res.status(200).json({success: true, data: user});
  } catch (error) {
    logger.error(`Error while getting a user: ${error}`);
    next(error);
  }
};

/**
 * Update self
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id, role} = req['data'];
    const user = await findUserById(_id);

    if (!user) {
      throw newError(404, 'NO USER FOUND');
    }
    if (req.body.password) {
      user['password'] = req.body['password'];
    } else {
      throw newError(404, 'ONLY UPDATE PASSWORD');
    }
    await user.save();
    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.error(`Error while updating a user: ${error}`);
    next(error);
  }
};
/**
 * Update User By Id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      throw newError(404, 'NO USER FOUND');
    }

    for (const property in req.body) {
      user[property] = req.body[property];
    }
    await user.save();
    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.error(`Error while updating a user: ${error}`);
    next(error);
  }
};

/**
 * Login User
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      throw newError(404, 'EMAIL NOT VALID');
    }
    const check = await bcrypt.compare(req.body.password, user.password);
    if (check) {
      const privateKey = fs.readFileSync(join(__dirname, '../../../keys/private.key'));
      const authToken = jwt.sign({_id: user._id, role: user.role}, privateKey, {algorithm: 'RS256'});
      user.authToken = authToken;
      await user.save();
      return res.status(200).json({success: true, data: {user}});
    }
    throw newError(401, 'Invalid Id or Password');
  } catch (error) {
    logger.error(`Error while login a user: ${error}`);
    next(error);
  }
};

/**
 * Logout user
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id, role} = req['data'];

    const user = await findUserById(_id);
    if (!user) {
      throw newError(404, 'NO USER FOUND');
    }
    user.authToken = undefined;
    user.save();
    return res.status(200).json({success: true, data: user});
  } catch (error) {
    logger.error(`Error while logout a user: ${error}`);
    next(error);
  }
};

/**
 * delete user
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findAndDeleteUser(req.params.id);
    return res.status(200).json({success: true, data: user});
  } catch (error) {
    logger.error(`Error while deleting a user: ${error}`);
    next(error);
  }
};
