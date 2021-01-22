import { Router } from 'express';

import {
  deleteResultsController,
  executeScrapeController,
  getResultsController,
} from './controller';

const router = Router();
router.get('/execute', executeScrapeController());

router.get('/results', getResultsController());
router.delete('/results', deleteResultsController());

export default router;
