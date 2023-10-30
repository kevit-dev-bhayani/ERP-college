import {logger} from '../../utils/logger';
import {Student} from './student.model';
import {newError} from '../../utils/error';
import {IStudent} from '../../interfaces';

/**
 * list all student
 * @returns Promise<IStudent[]>
 */
export const findStudents = async (): Promise<IStudent[]> => {
  try {
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
    return await Student.findByIdAndDelete(_id);
  } catch (error) {
    logger.error(`error while deleting student by id - ${error}`);
    throw newError(500, error);
  }
};
