import { Router } from 'express';

import commands from './commands';
import database from './database';
import execute from './execute';
import generic from './generic';
import results from './results';

const router = Router();

router.use('/commands', commands);
router.use('/scrape', results);
router.use('/execute', execute);
router.use('/database', database);

router.use('/', [generic]);

export default router;
