import { Router } from 'express';

import {
  getScrapeController,
  performScrapeController,
  postResultsController,
} from './controller';

const router = Router();
router.get('/perform', performScrapeController());
router.get('/results', getScrapeController());

router.post('/results', postResultsController());

export default router;
