import { Router } from 'express';

import { executeScrapeController } from './controller';

const router = Router();
router.get('/', executeScrapeController());

export default router;
