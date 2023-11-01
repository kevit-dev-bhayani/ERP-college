import {model, Schema} from 'mongoose';

const attendanceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  isPresent: {
    type: Schema.Types.Boolean,
    required: true
  }
});

export const Attendance = model('Attendance', attendanceSchema);
