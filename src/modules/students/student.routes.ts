import {Router} from 'express';
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
  deleteStudent
} from './student.controllers';

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
router.patch(`/${Route}/update/me`, authenticate, authorize(['STUDENT']), updateSelf);

//UPDATE student by id
router.patch(`/${Route}/update/:id`, authenticate, authorize(['ADMIN', 'STAFF']), updateStudentById);

//login
router.post(`/${Route}/login`, loginStudent);

//logout
router.patch(`/${Route}/logout/me`, authenticate, authorize(['STUDENT']), logout);

//delete
router.delete(`/${Route}/delete/:id`, authenticate, authorize(['ADMIN', 'STAFF']), deleteStudent);
