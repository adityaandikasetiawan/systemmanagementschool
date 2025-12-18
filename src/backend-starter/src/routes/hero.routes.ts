import express from 'express';
import { getSlides } from '../controllers/hero.controller';

const router = express.Router();

router.get('/', getSlides);

export default router;

