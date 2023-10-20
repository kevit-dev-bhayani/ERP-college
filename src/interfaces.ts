import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  isAdmin: boolean;
  designation: string;
  email: string;
  mobile: number;
  password: string;
  department: string;
  authToken: string;
}

// export const UserSchema = new mongoose.Schema({
//     name: {type:String, required: true},
//     somethingElse: Number,
//   });

//   const User = mongoose.model<IUser>('User', UserSchema);
//   export default User;
