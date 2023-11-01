import {Attendance} from './attendance.model';
import {IAttendance} from '../../interfaces';
import {logger} from '../../utils/logger';
import {newError} from '../../utils/error';

/**
 * get all attendance
 * @returns Promise<IAttendance[]> =>array of attendance
 */
export const getAll = async (): Promise<IAttendance[]> => {
  try {
    return await Attendance.find();
  } catch (error) {
    logger.error(`Error while getting all Attendance - ${error}`);
    throw newError(500, error);
  }
};

/**
 * post new attendance
 * @params attendanceObj => req.body passed by staff, admin
 * @returns Promise<IAttendance> => attendance of student which marked
 */
export const createAttendance = async (attendanceObj: object): Promise<object> => {
  try {
    return await Attendance.create(attendanceObj);
  } catch (error) {
    logger.error(`Error while getting posing new  Attendance - ${error}`);
    throw newError(500, error);
  }
};

/**
 * get attendance by id
 * @params _id => id passed by staff / admin
 * @returns Promise<IAttendance> => attendance of student which marked
 */
export const getById = async (_id: string): Promise<IAttendance> => {
  try {
    return await Attendance.findById(_id);
  } catch (error) {
    logger.error(`Error while getting all Attendance - ${error}`);
    throw newError(500, error);
  }
};

/**
 * get attendance by studentId
 * @params _id => id passed by staff / admin
 * @returns Promise<IAttendance> => attendance of student which marked
 */
export const getByStudentId = async (student: string): Promise<IAttendance[]> => {
  try {
    return await Attendance.find({student});
  } catch (error) {
    logger.error(`Error while getting all Attendance - ${error}`);
    throw newError(500, error);
  }
};

/**
 * get attendance by id
 * @params _id => id passed by staff / admin
 * @returns Promise<IAttendance> => attendance of student which marked
 */
export const deleteById = async (_id: string): Promise<IAttendance> => {
  try {
    return await Attendance.findByIdAndDelete(_id);
  } catch (error) {
    logger.error(`Error while getting all Attendance - ${error}`);
    throw newError(500, error);
  }
};
