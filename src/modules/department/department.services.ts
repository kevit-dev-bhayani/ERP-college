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
export const findByDeptId = async (_id: string): Promise<IDepartment> => {
  try {
    // _id = _id.toString();
    // console.log("Hello");
    return await Department.findById(_id);
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

export const fourthAgg = async (reqObj: {[Index: string]: any}) => {
  try {
    const pipeline: any = [
      {
        $addFields: {
          availableIntake: {
            $subtract: ['$TotalSeats', '$occupiedSeats']
          }
        }
      },
      {
        $group: {
          _id: '$batch',
          TotalStudents: {
            $sum: '$occupiedSeats'
          },
          totalStudentIntake: {
            $sum: '$TotalSeats'
          },
          Branches: {
            $push: {
              deptName: '$initial',
              totalStudents: '$occupiedSeats',
              TotalStudentIntake: '$TotalSeats',
              availableIntake: '$availableIntake'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          batch: '$_id',
          TotalStudents: 1,
          totalStudentIntake: 1,
          availableIntake: {
            $subtract: ['$totalStudentIntake', '$TotalStudents']
          },
          Branch: {
            $map: {
              input: '$Branches',
              as: 'branch',
              in: {
                k: '$$branch.deptName',
                v: {
                  totalStudents: '$$branch.totalStudents',
                  TotalStudentIntake: '$$branch.TotalStudentIntake',
                  availableIntake: '$$branch.availableIntake'
                }
              }
            }
          }
        }
      },
      {
        $project: {
          batch: 1,
          TotalStudents: 1,
          totalStudentIntake: 1,
          availableIntake: 1,
          Branch: {
            $arrayToObject: '$Branch'
          }
        }
      }
    ];

    if (reqObj.batch) {
      const condition = {
        $match: {
          batch: reqObj.batch
        }
      };
      pipeline.unshift(condition);
    }
    if (reqObj.branch) {
      const condition = {
        $match: {
          initial: reqObj.branch
        }
      };
      pipeline.unshift(condition);
    }
    return await Department.aggregate(pipeline);
  } catch (error) {
    logger.error(`Error while fourth pipeline execution in department - ${error}`);
    throw newError(500, error);
  }
};
