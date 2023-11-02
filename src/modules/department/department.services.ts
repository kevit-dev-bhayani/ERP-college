import {Department} from './department.model';
import {IDepartment} from '../../interfaces';
import {logger} from '../../utils/logger';
import {newError} from '../../utils/error';
import {ObjectId} from 'mongoose';

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
 * @params _id => id of department to be create
 * @returns IDepartment
 */
export const deleteById = async (_id: string): Promise<IDepartment> => {
  try {
    return await Department.findOneAndDelete({_id});
  } catch (error) {
    logger.error(`Error while deleting department - ${error}`);
    throw newError(500, error);
  }
};

/**
 * incrementing occupied seats in department when new student created
 * @params _id => id of department of student
 * @returns nothing
 */
export const incrementOccupied = async (_id: string): Promise<void> => {
  try {
    const department = await Department.findById(_id);
    department.occupiedSeats = department.occupiedSeats + 1;
    department.save();
  } catch (error) {
    logger.error(`Error while incrementing occupied seat in department - ${error}`);
    throw newError(500, error);
  }
};

/**
 * decrementing occupied seats in department when new student created
 * @params _id => id of department of student
 * @returns nothing
 */
export const decrementOccupied = async (_id: string): Promise<void> => {
  try {
    const department = await Department.findById(_id);
    department.occupiedSeats--;
    if (department.occupiedSeats < 0) {
      throw 'no students in this department';
    }
    department.save();
  } catch (error) {
    logger.error(`Error while decrementing occupied seat in department - ${error}`);
    throw newError(500, error);
  }
};

/**
 *  [{
  "_id": 2020,
  "totalStudents": 6,
  "Year": 2020,
  "branches": {
    "Computer Engineering": 2,
    "Information & Technology": 2,
    "Electrical Engineering": 2
  }
},
{
  "_id": 2021,
  "totalStudents": 7,
  "Year": 2021,
  "branches": {
    "Computer Engineering": 2,
    "Information & Technology": 3,
    "Electrical Engineering": 2
  }
}]
 * data in this form
 * @returns array of batches
 * 
 */

export const firstAgg = async (): Promise<object[]> => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$batch',
          totalStudents: {
            $sum: '$occupiedSeats'
          },
          Branches: {
            $push: {
              name: '$name',
              occupiedSeats: '$occupiedSeats'
            }
          }
        }
      },
      {
        $project: {
          Branch: {
            $map: {
              input: '$Branches',
              as: 'branch',
              in: {
                k: '$$branch.name',
                v: '$$branch.occupiedSeats'
              }
            }
          },
          totalStudents: 1
        }
      },
      {
        $project: {
          Year: '$_id',
          branches: {
            $arrayToObject: '$Branch'
          },
          totalStudents: 1
        }
      }
    ];
    return await Department.aggregate(pipeline);
  } catch (error) {
    logger.error(`Error while first pipeline execution in department - ${error}`);
    throw newError(500, error);
  }
};
