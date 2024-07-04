import express from 'express';
import sortieController from '../../endpoint/controller/sortieController.js';

const router = express.Router();

router.post('/add', sortieController.registerSortie);
router.get('/fetchIdStock', sortieController.getSortieByStock)
router.get('/fetchId', sortieController.getOneSortie)
router.delete('/deleteLatest', sortieController.deleteLatestSortie)

export default router;