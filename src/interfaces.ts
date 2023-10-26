import {Document} from 'mongoose';

export interface IUser extends Document {
  generateAuthToken(_id: any, role: Roles): unknown;
  name: string;
  role: Roles;
  designation: string;
  email: string;
  mobile: number;
  password: string;
  department: string;
  authToken: string;
}

export interface IError {
  success: string;
  error: string;
}
export enum Roles {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}
