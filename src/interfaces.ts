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
  batch: number;
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

export enum Roles {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}
