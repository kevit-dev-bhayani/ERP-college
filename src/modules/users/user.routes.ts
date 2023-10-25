import {Router} from 'express';
import {getAllUsers, createUser, getUser, updateUser, loginUser, logoutUser, deleteUser} from './user.controllers';

const route = 'users';
export const router = Router();

//List all users
router.get(`/${route}`, getAllUsers);

//signup
router.post(`/${route}/signup`, createUser);

//get user by id
router.get(`/${route}/:id`, getUser);

//update User by id
router.patch(`/${route}/update/:id`, updateUser);

//login user
router.post(`/${route}/login`, loginUser);

//logout user
router.patch(`/${route}/logout/:id`, logoutUser);

//delete User
router.delete(`/${route}/delete/:id`, deleteUser);
