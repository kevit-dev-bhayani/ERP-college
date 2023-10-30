import {Request, Response, NextFunction} from 'express';
import {join} from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import {logger} from '../../utils/logger';
import {findStudents, findStudentById, createStudent, findByEmail, deleteById} from './student.services';
import {newError} from '../../utils/error';

/**
 * get all students
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getStudents = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudents();
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while getting student by Id - ${error}`);
    next(error);
  }
};

/**
 * creating a new student
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const newStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await createStudent(req.body);
    return res.status(201).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while creating student - ${error}`);
    next(error);
  }
};

/**
 * get student by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudentById(req.params.id);
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while getting student by Id - ${error}`);
    next(error);
  }
};

/**
 * get self
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getSelf = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];
    const student = await findStudentById(_id);
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while getting student by Id - ${error}`);
    next(error);
  }
};

/**
 * update student by id only by [STAFF,ADMIN]
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const updateStudentById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudentById(req.params.id);

    for (const property in req.body) {
      if (property !== 'role') {
        student[property] = req.body[property];
      } else {
        throw newError(500, `CAN'T UPDATE ROLE`);
      }
    }
    await student.save();
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while updating student by Id - ${error}`);
    next(error);
  }
};

/**
 * update self
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const updateSelf = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];
    const student = await findStudentById(_id);

    if (req.body.password) {
      student['password'] = req.body['password'];
    } else {
      throw newError(404, 'ONLY UPDATE PASSWORD');
    }
    await student.save();
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while updating student by Id - ${error}`);
    next(error);
  }
};

export const loginStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findByEmail(req.body.email);
    const match = await bcrypt.compare(req.body.password, student.password);
    if (match) {
      const privateKey = fs.readFileSync(join(__dirname, '../../../keys/private.key'));
      student.authToken = jwt.sign({_id: student._id, role: student.role}, privateKey, {algorithm: 'RS256'});
      await student.save();
      return res.status(200).json({success: true, data: student});
    }
    throw newError(401, 'INVALID CREDENTIALS');
  } catch (error) {
    logger.error(`Error while login student - ${error}`);
    next(error);
  }
};

/**
 * logout student
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];
    const student = await findStudentById(_id);
    student.authToken = undefined;
    await student.save();
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while logout student - ${error}`);
    next(error);
  }
};

/**
 * logout student by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await deleteById(req.params.id);
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while deleting student - ${error}`);
    next(error);
  }
};
