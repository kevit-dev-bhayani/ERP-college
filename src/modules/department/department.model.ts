import {Schema, model} from 'mongoose';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  initial: {
    type: String,
    required: true,
    unique: true
  }
});

export const Department = model('Department', departmentSchema);
