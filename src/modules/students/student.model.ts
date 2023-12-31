import {NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import {Schema, model} from 'mongoose';
import {Roles} from '../../interfaces';
import {Attendance} from '../attendance/attendance.model';

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: Roles.STUDENT
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Department'
  },
  sem: {
    type: Number,
    required: true
  },
  authToken: {
    type: String
  }
});

studentSchema.pre('save', async function (next: NextFunction) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isModified('role') && this.role !== Roles.STUDENT) {
      throw 'PLZ ENTER VALID ROLE';
    }
    next();
  } catch (error) {
    next(error);
  }
});

studentSchema.post('findOneAndDelete', async (student) => {
  await Attendance.deleteMany({student: student._id});
});

export const Student = model('Student', studentSchema);
