import { Router } from 'express';

import { getCommandsController } from './controller';

const router = Router();
router.get('/', getCommandsController());

export default router;
