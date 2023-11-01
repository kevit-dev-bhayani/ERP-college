import {ValidationError} from 'express-validator';

export const newError = (code: number, error: Error | string | ValidationError[]): Error => {
  console.log(error);
  return new Error(JSON.stringify({code, error}));
};
