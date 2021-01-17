import { Router } from 'express';

import { getScrapeController } from './controller';

const router = Router();
console.log('results.......');
router.get('/results', getScrapeController());
// router.get('/scrape', function (req, res) {
//   console.log('scrape');
//   res.json(JSON.stringify([1, 2]));
// });

export default router;
