import {logger} from '../../utils/logger';
import {Student} from './student.model';
import {newError} from '../../utils/error';
import {IStudent} from '../../interfaces';
import {findById} from '../department/department.services';
import {Attendance} from '../attendance/attendance.model';

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

/**
 * second aggregation
 * @param reqObj : request body
 * @returns absent students list  in form of array
 */
export const findAbStudent = async (reqObj: {[index: string]: any}) => {
  try {
    const pipeline: any = [
      {
        $match: {
          date: new Date(reqObj.date),
          isPresent: false
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'student'
        }
      },
      {
        $unwind: {
          path: '$student'
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'student.department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: {
          path: '$department'
        }
      },
      {
        $project: {
          date: '$date',
          isPresent: '$isPresent',
          studentId: '$student._id',
          name: '$student.name',
          email: '$student.email',
          mobile: '$student.mobile',
          sem: '$student.sem',
          departmentId: '$department._id',
          department: '$department.initial',
          batch: '$department.batch'
        }
      }
    ];
    if (reqObj.batch) {
      const condition = {
        $match: {
          batch: reqObj.batch
        }
      };
      pipeline.push(condition);
    }
    if (reqObj.branch) {
      const condition = {
        $match: {
          department: reqObj.branch
        }
      };
      pipeline.push(condition);
    }
    if (reqObj.sem) {
      const condition = {
        $match: {
          sem: reqObj.sem
        }
      };
      pipeline.push(condition);
    }
    return await Attendance.aggregate(pipeline);
  } catch (error) {
    logger.error(`Error while finding absent students - ${error}`);
    throw newError(500, error);
  }
};

/**
 * third aggregation
 * @param reqObj => object pass in req.body
 * @returns object[]
 */
export const thirdAgg = async (reqObj: {[index: string]: any}) => {
  try {
    const pipeline: any = [
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: {
          path: '$department'
        }
      },
      {
        $lookup: {
          from: 'attendances',
          localField: '_id',
          foreignField: 'student',
          as: 'attendance'
        }
      },
      {
        $unwind: {
          path: '$attendance'
        }
      },
      {
        $project: {
          name: '$name',
          email: '$email',
          mobile: '$mobile',
          department: '$department.initial',
          sem: '$sem',
          date: '$attendance.date',
          isPresent: '$attendance.isPresent',
          batch: '$department.batch'
        }
      },
      {
        $match: {
          date: {
            $lte: new Date(reqObj.date)
          }
        }
      },
      {
        $group: {
          _id: '$email',
          totalDays: {
            $sum: 1
          },
          presentDays: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$isPresent', true]
                },
                then: {
                  $sum: 1
                },
                else: {
                  $sum: 0
                }
              }
            }
          },
          obj: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          totalDays: '$totalDays',
          totalPresent: '$presentDays',
          details: {
            $arrayElemAt: ['$obj', 0]
          }
        }
      },
      {
        $project: {
          _id: '$details._id',
          attendance: {
            $divide: ['$totalPresent', '$totalDays']
          },
          name: '$details.name',
          email: '$details.email',
          mobile: '$details.mobile',
          department: '$details.department',
          sem: '$details.sem',
          batch: '$details.batch'
        }
      },
      {
        $match: {
          attendance: {
            $lt: 0.75
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
      pipeline.push(condition);
    }
    if (reqObj.branch) {
      const condition = {
        $match: {
          department: reqObj.branch
        }
      };
      pipeline.push(condition);
    }
    if (reqObj.sem) {
      const condition = {
        $match: {
          sem: reqObj.sem
        }
      };
      pipeline.push(condition);
    }
    return await Student.aggregate(pipeline);
  } catch (error) {
    logger.error(`Error while third aggregation service - ${error}`);
    throw newError(500, error);
  }
};
