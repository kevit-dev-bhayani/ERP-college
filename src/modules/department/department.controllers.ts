import {Request, Response, NextFunction} from 'express';
import {findDepartments, createDepartment, findById, findByDeptInit, deleteByInitial} from './department.services';
import {logger} from '../../utils/logger';

/**
 *  get all department
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const getDepartments = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const departments = await findDepartments();
    return res.status(200).json({success: true, data: departments});
  } catch (error) {
    logger.error(`Error while getting all departments- ${error}`);
    next(error);
  }
};

/**
 * create new department
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const postDepartment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await createDepartment(req.body);
    return res.status(200).json({success: true, data: department});
  } catch (error) {
    logger.error(`Error while creating new departments- ${error}`);
    next(error);
  }
};

/**
 * find department by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const findDepartmentById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await findById(req.params.id);
    return res.status(200).json({success: true, data: department});
  } catch (error) {
    logger.error(`Error while finding department by id - ${error}`);
    next(error);
  }
};

/**
 * update department by id
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const updateById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await findByDeptInit(req.params.id);
    logger.info(req.body);
    for (const property in req.body) {
      department[property] = req.body[property];
    }
    await department.save();
    return res.status(200).json({success: true, data: department});
  } catch (error) {
    logger.error(`Error while finding department by id - ${error}`);
    next(error);
  }
};

/**
 * delete department by init
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 * @returns {Promise<Response>} => promise with response
 */
export const deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await deleteByInitial(req.params.id);
    return res.status(200).json({success: true, data: department});
  } catch (error) {
    logger.error(`Error while finding department by id - ${error}`);
    next(error);
  }
};
