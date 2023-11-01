import {Schema, model} from 'mongoose';
import {Student} from '../students/student.model';
import {Attendance} from '../attendance/attendance.model';
import {logger} from '../../utils/logger';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  initial: {
    type: String,
    required: true,
    unique: true
  },
  TotalSeats: {
    type: Number,
    required: true
  },
  occupiedSeats: {
    type: Number,
    default: 0
  },
  batch: {
    type: Number,
    required: true
  }
});

departmentSchema.post('findOneAndDelete', async (department) => {
  const students = await Student.find({department: department._id});
  await Student.deleteMany({department: department._id});
  logger.warn(students);
  await Attendance.deleteMany({student: {$in: students.map((student) => student._id)}});
});

export const Department = model('Department', departmentSchema);
