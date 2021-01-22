import { Router } from 'express';

import {
  deleteResultsController,
  getResultsController,
  performScrapeController,
  postResultsController,
} from './controller';

const router = Router();
router.get('/perform', performScrapeController());

router.get('/results', getResultsController());
router.delete('/results', deleteResultsController());

router.post('/results', postResultsController());

export default router;
