import {Schema, model} from 'mongoose';

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
    ref: 'Department'
  },
  authToken: {
    type: Schema.Types.String
  }
});

const User = model('User', userSchema);
export {User};
