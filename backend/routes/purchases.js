const express = require('express');
const { createPurchase, getPurchases } = require('../controllers/purchaseController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createPurchase);
router.get('/', authMiddleware, getPurchases);

module.exports = router;
