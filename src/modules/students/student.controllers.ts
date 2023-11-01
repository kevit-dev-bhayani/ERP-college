import {Request, Response, NextFunction} from 'express';
import {join} from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import {logger} from '../../utils/logger';
import {findStudents, findStudentById, createStudent, findByEmail, deleteById, checkBatch} from './student.services';
import {incrementOccupied, decrementOccupied, findById} from '../department/department.services';
import {newError} from '../../utils/error';
import {validationResult} from 'express-validator';

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
    const dept_id = req.body.department;
    await checkBatch(dept_id, req.body.batch);

    const student = await createStudent(req.body);
    await incrementOccupied(dept_id);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.json({errors: errors.array()});
      throw newError(400, errors.array());
    }
    const student = await findStudentById(req.params.id);
    const fields = Object.keys(req.body);

    if (fields.includes('department')) {
      await checkBatch(req.body.department, req.body.batch);
      await decrementOccupied(student.department);
      await incrementOccupied(req.body.department);
    }

    for (const property in req.body) {
      student[property] = req.body[property];
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw newError(400, errors.array());
    }

    const {_id} = req['data'];
    const student = await findStudentById(_id);
    student['password'] = req.body['password'];

    await student.save();
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while updating student by Id - ${error}`);
    next(error);
  }
};

export const loginStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw newError(400, errors.array());
    }

    const student = await findByEmail(req.body.email);
    const match = await bcrypt.compare(req.body.password, student?.password);
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
    const dept_id = student.department.toString();
    decrementOccupied(dept_id);
    return res.status(200).json({success: true, data: student});
  } catch (error) {
    logger.error(`Error while deleting student - ${error}`);
    next(error);
  }
};
