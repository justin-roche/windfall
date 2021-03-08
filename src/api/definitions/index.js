import { Router } from 'express';

import { getDefinitionsController } from './controller';

const router = Router();
router.get('/', getDefinitionsController());

export default router;
