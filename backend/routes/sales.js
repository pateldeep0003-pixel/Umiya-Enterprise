const express = require('express');
const { createSale, getSales, getSaleById } = require('../controllers/salesController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, getSales);
router.get('/:id', authMiddleware, getSaleById);

module.exports = router;
