import {Router} from 'express';
import {
  getDepartments,
  postDepartment,
  findDepartmentById,
  updateById,
  deleteDepartment,
  First
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

//update department by id
router.patch(`/${Route}/update/:id`, authenticate, authorize(['ADMIN']), updateById);

//delete department by id
router.delete(`/${Route}/delete/:id`, authenticate, authorize(['ADMIN']), deleteDepartment);

//first aggregation
router.get(`/first`, authenticate, authorize(['ADMIN']), First);
