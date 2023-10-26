import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {join} from 'path';
import {Roles} from '../../interfaces';

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  role: {
    type: Schema.Types.String,
    required: true
  },
  designation: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  mobile: {
    type: Schema.Types.Number,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: ''
  },
  authToken: {
    type: Schema.Types.String
  }
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    switch (this.role) {
      case 'ADMIN':
        this.role = Roles.ADMIN;
        break;

      case 'STAFF':
        this.role = Roles.STAFF;
        break;

      default:
        break;
    }
    next();
  } catch (err) {
    throw err;
  }
});

const User = model('User', userSchema);
export {User};
