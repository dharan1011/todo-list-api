import {Router} from 'express';

import todoRoute from './todo';
import authRoute from './auth';
import infoRoute from './info';

const router = Router();

router.use('/todo', todoRoute);
router.use('/auth', authRoute);
router.use('/info', infoRoute);

export default router;