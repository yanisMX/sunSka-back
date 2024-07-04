import express from 'express'
import barController from '../../endpoint/controller/barController.js';

const router = express.Router();

router.post('/add', barController.registerBar);
router.get('/fetchName', barController.getBarByName);
router.get('/fetchId', barController.getBarById);
router.get('/fetchAll', barController.getAllBar)
router.get('/fetchId/notif', barController.getAllBarAndUrgentEntree)
router.get('/fetchId/produits', barController.getAllBarAndNbLines)
router.delete('/delete', barController.deleteBar)

export default router;