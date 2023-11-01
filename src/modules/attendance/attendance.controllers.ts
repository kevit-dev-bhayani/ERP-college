import {Request, Response, NextFunction} from 'express';
import {createAttendance, getAll, getById, getByStudentId, deleteById} from './attendance.services';
import {logger} from '../../utils/logger';

/**
 * get all attendance
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getAllAttendance = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await getAll();
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};

/**
 * get  attendance by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendanceById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await getById(req.params.id);
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};

/**
 * get  attendance by studentId
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendanceByStudentId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await getByStudentId(req.params.id);
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};

/**
 * create new  attendance
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */

export const createNew = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await createAttendance(req.body);
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};

/**
 * update  attendance
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */

export const updateAttendance = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await getById(req.params.id);
    for (const field in req.body) {
      attendance[field] = req.body[field];
    }
    attendance.save();
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};

/**
 * delete attendance by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const deleteAttendance = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await deleteById(req.params.id);
    return res.status(200).json({success: true, data: attendance});
  } catch (error) {
    logger.error(`Error while getting all attendance - ${error}`);
    next(error);
  }
};
