import { Router } from 'express';
import { deleteResultsController, getResultsController } from './controller';

const router = Router();

router.get('/results', getResultsController());
router.delete('/results', deleteResultsController());

export default router;
