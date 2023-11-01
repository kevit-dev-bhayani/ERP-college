import {Router} from 'express';

import {authenticate} from '../../middlewares/authenticate';
import {authorize} from '../../middlewares/authorize';
import {
  getAllUsers,
  createUser,
  getUser,
  getById,
  updateUser,
  updateUserById,
  loginUser,
  logoutUser,
  deleteUser
} from './user.controllers';
import {validateLogin} from '../../middlewares/validator';

const route = 'users';
export const router = Router();

//List all users
router.get(`/${route}`, authenticate, authorize(['ADMIN']), getAllUsers);

//signup
router.post(`/${route}/signup`, authenticate, authorize(['ADMIN']), createUser);

//get self
router.get(`/${route}/me`, authenticate, authorize(['ADMIN', 'STAFF']), getUser);

// get user by id
router.get(`/${route}/:id`, authenticate, authorize(['ADMIN']), getById);

//update self
router.patch(`/${route}/update/me`, authenticate, authorize(['STAFF', 'ADMIN']), updateUser);

//update user by id
router.patch(`/${route}/update/:id`, authenticate, authorize(['ADMIN']), updateUserById);

//login user
router.post(`/${route}/login`, validateLogin(), loginUser);

//logout user
router.patch(`/${route}/logout/me`, authenticate, authorize(['STAFF', 'ADMIN']), logoutUser);

//delete User
router.delete(`/${route}/delete/:id`, authenticate, authorize(['ADMIN']), deleteUser);
