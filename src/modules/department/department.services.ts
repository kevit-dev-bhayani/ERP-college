import {Department} from './department.model';
import {IDepartment} from '../../interfaces';
import {logger} from '../../utils/logger';
import {newError} from '../../utils/error';

/**
 * Find department by Id
 * @param _id => id of department to be found
 * @returns  => Promise<IDepartment>
 */
export const findById = async (_id: string): Promise<IDepartment> => {
  try {
    return await Department.findById(_id);
  } catch (error) {
    logger.error(`Error occurred while find department by Id`);
    throw newError(500, error);
  }
};

/**
 * Find department by Id
 * @param _id => id of department to be found
 * @returns  => Promise<IDepartment>
 */
export const findByDeptInit = async (initial: string): Promise<IDepartment> => {
  try {
    return await Department.findOne({initial});
  } catch (error) {
    logger.error(`Error occurred while find department by Id`);
    throw newError(500, error);
  }
};

/**
 * Find all departments

 * @returns  Promise<IDepartment[]> => array of all departments
 */
export const findDepartments = async (): Promise<IDepartment[]> => {
  try {
    return await Department.find();
  } catch (error) {
    logger.error(`Error occurred while find department by Id`);
    throw newError(500, error);
  }
};

/**
 * Create new department
 * @params department => department obj of department to be create
 * @returns object
 */

export const createDepartment = async (department: object): Promise<object> => {
  try {
    return await Department.create(department);
  } catch (error) {
    logger.error(`Error while creating new department - ${error}`);
    throw newError(500, error);
  }
};

/**
 * delete department by id
 * @params initial => initial of department to be create
 * @returns IDepartment
 */
export const deleteByInitial = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findOneAndDelete({_id});
  } catch (error) {
    logger.error(`Error while deleting department - ${error}`);
    throw newError(500, error);
  }
};
