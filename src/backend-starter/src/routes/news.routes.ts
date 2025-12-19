import express from 'express';
import { getAll, getLatest, getById } from '../controllers/news.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/latest', getLatest);
router.get('/:id', getById);

export default router;

