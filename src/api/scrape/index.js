import { Router } from 'express';

import {
  deleteResultsController,
  executeScrapeController,
  getResultsController,
  postResultsController,
} from './controller';

const router = Router();
router.get('/execute', executeScrapeController());

router.get('/results', getResultsController());
router.delete('/results', deleteResultsController());

router.post('/results', postResultsController());

export default router;
