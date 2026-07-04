const express = require('express');
const { getStock, getStockByProduct, updateStock, addStock } = require('../controllers/stockController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getStock);
router.get('/:productId', authMiddleware, getStockByProduct);
router.put('/:id', authMiddleware, updateStock);
router.post('/', authMiddleware, addStock);

module.exports = router;
