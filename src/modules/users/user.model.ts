import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  isAdmin: {
    type: Schema.Types.Boolean,
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
    next();
  } catch (err) {
    throw err;
  }
});

const User = model('User', userSchema);
export {User};
