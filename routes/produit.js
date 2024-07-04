import express from 'express';
import produitController from '../../endpoint/controller/produitController.js';

const router = express.Router();

router.post('/add', produitController.registerProduit);
router.get('/fetchName', produitController.getProduitByName)
router.get('/fetchId', produitController.getProduitById)
router.get('/fetchAll', produitController.getAllProduit)
router.delete('/delete', produitController.deleteProduit)

export default router;