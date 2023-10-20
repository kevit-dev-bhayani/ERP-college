import {Router} from 'express';

import {getAllUsers} from './user.controllers';

const router = Router();
const route = 'users';
router.get(`/${route}`, getAllUsers);

export {router};
