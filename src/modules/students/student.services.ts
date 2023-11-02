import {logger} from '../../utils/logger';
import {Student} from './student.model';
import {newError} from '../../utils/error';
import {IStudent} from '../../interfaces';
import {findById} from '../department/department.services';

/**
 * list all student
 * @returns Promise<IStudent[]>
 */
export const findStudents = async (): Promise<IStudent[]> => {
  try {
    // logger.warn('hello' + (await Student.find()));
    return await Student.find();
  } catch (error) {
    logger.error(`error while finding student by id - ${error}`);
    throw newError(500, error);
  }
};

/**
 * create new student
 * @params studentObj => obj of student to be created
 * @returns Promise<IStudent[]>
 */
export const createStudent = async (studentObj: object): Promise<object> => {
  try {
    return await Student.create(studentObj);
  } catch (error) {
    logger.error(`error while creating new  student - ${error}`);
    throw newError(500, error);
  }
};

/**
 * find student by id
 * @param _id => id of student
 * @returns  Promise<IStudent>
 */
export const findStudentById = async (_id: string): Promise<IStudent> => {
  try {
    return await Student.findById(_id);
  } catch (error) {
    logger.error(`error while finding student by id - ${error}`);
    throw newError(500, error);
  }
};

/**
 * find student by email
 * @param email => email of student
 * @returns  Promise<IStudent>
 */
export const findByEmail = async (email: string): Promise<IStudent> => {
  try {
    return await Student.findOne({email});
  } catch (error) {
    logger.error(`error while finding student by email - ${error}`);
    throw newError(500, error);
  }
};

/**
 * delete student by id
 * @param _id => id of student
 * @returns  Promise<IStudent>
 */
export const deleteById = async (_id: string) => {
  try {
    return await Student.findOneAndDelete({_id});
  } catch (error) {
    logger.error(`error while deleting student by id - ${error}`);
    throw newError(500, error);
  }
};

/**
 * check batch
 * @param _id => id of student
 */

export const checkBatch = async (_id: string, batch: number): Promise<void> => {
  try {
    const department = await findById(_id);
    if (department.occupiedSeats === department.TotalSeats) {
      throw 'department is full';
    }
  } catch (error) {
    logger.error(`error while checking student by id - ${error}`);
    throw newError(500, error);
  }
};
