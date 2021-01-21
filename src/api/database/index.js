import { Router } from 'express';

import { getDatabaseController } from './controller';

const router = Router();
router.get('/all', getDatabaseController());

export default router;
