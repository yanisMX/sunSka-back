import express from 'express';
import entreeController from '../../endpoint/controller/entreeController.js';

const router = express.Router();

router.post('/add', entreeController.registerEntree);
router.get('/fetchIdStock', entreeController.getEntreeByStock)
router.post('/changeStatus', entreeController.changeStatus)
router.get('/fetchId', entreeController.getOneEntree)
router.get('/fetchAll', entreeController.getAllEntreeFullInfo)
router.get('/fetchIdBar/latestByProduct', entreeController.getLatestEntreeByProduct)

export default router;