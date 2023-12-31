import {ValidationError} from 'express-validator';

export const newError = (code: number, error: Error | string | ValidationError[]): Error => {
  console.log(code, error);
  return new Error(JSON.stringify({code, error}));
};
