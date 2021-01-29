import { Router } from 'express';

import { executeScrapeController } from './controller';

const router = Router();
router.post('/', executeScrapeController());

export default router;
