import {Router} from 'express';
import {
  getAllAttendance,
  createNew,
  getAttendanceById,
  updateAttendance,
  getAttendanceByStudentId,
  deleteAttendance
} from './attendance.controllers';
import {authenticate} from '../../middlewares/authenticate';
import {authorize} from '../../middlewares/authorize';

export const router = Router();

const Route = 'attendance';

//get all attendance
router.get(`/${Route}/`, authenticate, authorize(['ADMIN', 'STAFF']), getAllAttendance);

//create Attendance
router.post(`/${Route}/new`, authenticate, authorize(['ADMIN', 'STAFF']), createNew);

//get by studentId
router.get(`/${Route}/student/:id`, authenticate, authorize(['ADMIN', 'STAFF']), getAttendanceByStudentId);

//update by id
router.patch(`/${Route}/update/:id`, authenticate, authorize(['ADMIN', 'STAFF']), updateAttendance);

//get by id
router.get(`/${Route}/:id`, authenticate, authorize(['ADMIN', 'STAFF']), getAttendanceById);

//delete by id
router.delete(`/${Route}/:id`, authenticate, authorize(['ADMIN', 'STAFF']), deleteAttendance);
