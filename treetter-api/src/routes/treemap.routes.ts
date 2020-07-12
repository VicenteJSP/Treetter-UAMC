import { Router } from 'express';
import { getTreemap } from '../controllers/treemap.controller'

const router = Router();

router.route('/:user?')
    .get(getTreemap);

export default router;