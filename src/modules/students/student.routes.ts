import {Router} from 'express';
import {body} from 'express-validator';

import {authenticate} from '../../middlewares/authenticate';
import {authorize} from '../../middlewares/authorize';
import {
  getStudents,
  newStudent,
  getStudentById,
  getSelf,
  updateSelf,
  updateStudentById,
  loginStudent,
  logout,
  deleteStudent,
  findAbsent
} from './student.controllers';
import {validateNotPassword, validatePassword, validateLogin} from '../../middlewares/validator';

const Route = 'students';
export const router = Router();

//get all students
router.get(`/${Route}`, authenticate, authorize(['ADMIN', 'STAFF']), getStudents);

//create new student
router.post(`/${Route}/signup`, authenticate, authorize(['ADMIN', 'STAFF']), newStudent);

//get self
router.get(`/${Route}/me`, authenticate, authorize(['STUDENT']), getSelf);

//get student by id
router.get(`/${Route}/:id`, authenticate, authorize(['ADMIN', 'STAFF']), getStudentById);

//UPDATE self
router.patch(`/${Route}/update/password`, authenticate, authorize(['STUDENT']), validatePassword(), updateSelf);

//UPDATE student by id
router.patch(
  `/${Route}/update/:id`,
  authenticate,
  authorize(['ADMIN', 'STAFF']),
  validateNotPassword(),
  updateStudentById
);

//login
router.post(`/${Route}/login`, validateLogin(), loginStudent);

//logout
router.patch(`/${Route}/logout/me`, authenticate, authorize(['STUDENT']), logout);

//delete
router.delete(`/${Route}/delete/:id`, authenticate, authorize(['ADMIN', 'STAFF']), deleteStudent);

// second aggregation
router.post(`/${Route}/second`, authenticate, authorize(['ADMIN', 'STAFF']), findAbsent);
