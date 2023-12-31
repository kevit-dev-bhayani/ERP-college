import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: Roles;
  designation: string;
  email: string;
  mobile: number;
  password: string;
  department: string;
  authToken: string;
}

export interface IStudent extends Document {
  name: string;
  role: Roles;
  email: string;
  mobile: number;
  password: string;
  sem: number;
  department: string;
  authToken: string;
}

export interface IDepartment extends Document {
  name: string;
  initial: string;
  occupiedSeats: number;
  TotalSeats: number;
  batch: number;
}

export interface IAttendance extends Document {
  student: string;
  date: Date;
  isPresent: boolean;
}

export enum Roles {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}
