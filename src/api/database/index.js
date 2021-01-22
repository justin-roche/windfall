import { Router } from 'express';

import {
  getDatabaseController,
  postDatabaseController,
} from './controller';

const router = Router();
router.get('/all', getDatabaseController());
router.post('/all', postDatabaseController());

export default router;
