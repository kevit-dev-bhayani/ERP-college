import {Request, Response} from 'express';
import {getUsers} from './user.services';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await getUsers();
  return res.status(200).json(users);
};
