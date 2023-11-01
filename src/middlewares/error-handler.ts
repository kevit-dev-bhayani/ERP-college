import {NextFunction, Request, Response} from 'express';
import {logger} from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  logger.error(err.message);
  // logger.warn(' before parsing error');
  const {code, error} = JSON.parse(err.message);
  // logger.warn('after parsing error');

  return res.status(code).json({success: 'error', error: error.message || error});
};
