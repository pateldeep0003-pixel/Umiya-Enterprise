const express = require('express');
const { createWarranty, getWarranties, getWarrantyBySale } = require('../controllers/warrantyController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createWarranty);
router.get('/', authMiddleware, getWarranties);
router.get('/sale/:saleId', authMiddleware, getWarrantyBySale);

module.exports = router;
