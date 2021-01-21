import { Router } from 'express';

import {
  getScrapeController,
  postResultsController,
} from './controller';

const router = Router();
router.get('/results', getScrapeController());
router.post('/results', postResultsController());

export default router;
