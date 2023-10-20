import {NextFunction, Request, Response} from 'express';
import {getUsers} from './user.services';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
