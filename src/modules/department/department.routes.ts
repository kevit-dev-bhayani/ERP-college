import {Router} from 'express';
import {
  getDepartments,
  postDepartment,
  findDepartmentById,
  findByInit,
  updateByInit,
  deleteDepartment
} from './department.controllers';
import {authenticate} from '../../middlewares/authenticate';
import {authorize} from '../../middlewares/authorize';
export const router = Router();
const Route = 'departments';

//get all departments
router.get(`/${Route}`, authenticate, authorize(['ADMIN']), getDepartments);

//create new department
router.post(`/${Route}/new`, authenticate, authorize(['ADMIN']), postDepartment);

//find department by Id
router.get(`/${Route}/id/:id`, authenticate, authorize(['ADMIN']), findDepartmentById);

//find department By Initial
router.get(`/${Route}/:init`, authenticate, authorize(['ADMIN']), findByInit);

//update department by initial
router.post(`/${Route}/update/:init`, authenticate, authorize(['ADMIN']), updateByInit);

//delete department by initial
router.delete(`/${Route}/delete/:init`, authenticate, authorize(['ADMIN']), deleteDepartment);
