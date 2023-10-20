import {User} from './user.model';
import {logger} from '../utils/logger';
import {IUser} from '../interfaces';
import {newError} from '../utils/error';

export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    logger.error(`Error occurred while getting all users: ${error}`);
    throw newError(500, error);
  }
};
