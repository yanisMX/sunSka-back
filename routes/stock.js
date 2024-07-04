import express from 'express';
import stockController from '../../endpoint/controller/stockController.js';

const router = express.Router();

router.post('/add', stockController.registerStock);
router.get('/fetchId', stockController.getStockById)
router.get('/fetchIdBar', stockController.getStockByIdBar)
router.get('/fetchIdProduit', stockController.getStockByIdProduit)
router.get('/fetchAll', stockController.getAllStock)
router.delete('/delete', stockController.deleteStock)
router.get('/fetchAll/produits', stockController.getStocksWithProducts)

export default router;