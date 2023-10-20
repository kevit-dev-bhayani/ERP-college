import {Router} from 'express';

import {getAllUsers} from './user.controllers';

const route = 'users';
export const router = Router();

router.get(`/${route}`, getAllUsers);
