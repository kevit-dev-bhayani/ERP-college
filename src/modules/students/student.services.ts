import {logger} from '../../utils/logger';
import {Student} from './student.model';
import {newError} from '../../utils/error';
import {IStudent} from '../../interfaces';

/**
 * list all student
 * @returns
 */
export const findStudents = async (): Promise<IStudent[]> => {
  try {
    return await Student.find();
  } catch (error) {
    logger.error(`error while finding student by id - ${error}`);
    throw newError(500, error);
  }
};

export const createStudent = async (studentObj: object): Promise<object> => {
  try {
    return await Student.create(studentObj);
  } catch (error) {
    logger.error(`error while creating new  student - ${error}`);
    throw newError(500, error);
  }
};

/**
 * @param _id => id of student
 * @returns
 */
export const findStudentById = async (_id: string): Promise<IStudent> => {
  try {
    return await Student.findById(_id);
  } catch (error) {
    logger.error(`error while finding student by id - ${error}`);
    throw newError(500, error);
  }
};

export const findByEmail = async (email: string): Promise<IStudent> => {
  try {
    return await Student.findOne({email});
  } catch (error) {
    logger.error(`error while finding student by email - ${error}`);
    throw newError(500, error);
  }
};

export const deleteById = async (_id: string) => {
  try {
    return await Student.findByIdAndDelete(_id);
  } catch (error) {
    logger.error(`error while deleting student by id - ${error}`);
    throw newError(500, error);
  }
};
