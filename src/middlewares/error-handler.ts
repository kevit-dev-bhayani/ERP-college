import {NextFunction, Request, Response} from 'express';
import {logger} from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  const {code, error} = JSON.parse(err.message);

  return res.status(code).json({success: 'error', error: error.message || error});
};
