import { Router } from 'express';

import definitions from './definitions';
import database from './database';
import execute from './execute';
import generic from './generic';
import results from './results';

const router = Router();

router.use('/definitions', definitions);
router.use('/scrape', results);
router.use('/execute', execute);
router.use('/database', database);

router.use('/', [generic]);

export default router;
