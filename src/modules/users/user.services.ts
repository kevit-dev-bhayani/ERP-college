import {User} from './user.model';
import {logger} from '../../utils/logger';
import {IUser} from '../../interfaces';
import {newError} from '../../utils/error';

/**
 * List all Users from DataBase
 */

export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    logger.error(`Error occurred while getting all users: ${error}`);
    throw newError(500, error);
  }
};

/**
 * Creates new User in DataBase
 * @param {IUser} user => User Object to be created.
 */

export const createNewUser = async (user: IUser): Promise<object> => {
  try {
    return await User.create(user);
  } catch (error) {
    logger.error(`Error occurred while creating user: ${error}`);
    throw newError(500, error);
  }
};

/**
 * Get user By Id from DataBase
 * @param _id => Id of User object to be found
 */

export const findUserById = async (_id: string): Promise<IUser> => {
  try {
    return User.findById(_id);
  } catch (error) {
    logger.error(`Error occurred while finding user by Id: ${error}`);
    throw newError(500, error);
  }
};

/**
 * find User by email
 * @param email => email of user object to be found
 */

export const findUserByEmail = async (email: string): Promise<IUser> => {
  try {
    return await User.findOne({email});
  } catch (error) {
    logger.error(`Error occurred while finding user by Email: ${error}`);
    throw newError(500, error);
  }
};

/**
 * delete user by id
 * @param _id => id of user object to be delete
 */

export const findAndDeleteUser = async (_id: string): Promise<IUser> => {
  try {
    return await User.findByIdAndDelete(_id);
  } catch (error) {
    logger.error(`Error occurred while deleting user from DataBase: ${error}`);
    throw newError(500, error);
  }
};
