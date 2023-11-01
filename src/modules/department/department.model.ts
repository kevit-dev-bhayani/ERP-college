import {Student} from '../students/student.model';
import {Schema, model} from 'mongoose';

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
  await Student.deleteMany({department: department._id});
});

export const Department = model('Department', departmentSchema);
