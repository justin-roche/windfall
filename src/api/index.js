import { Router } from 'express';

import auth from './auth';
import comment from './comment';
import generic from './generic';
import post from './post';
import scrape from './scrape';

console.log('routers.......');

const router = Router();

router.use('/auth', auth);

router.use('/post', post);

router.use('/comment', comment);

router.use('/scrape', scrape);

router.use('/', [generic]);

export default router;
