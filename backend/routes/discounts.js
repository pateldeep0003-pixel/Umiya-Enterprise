const express = require('express');
const { createDiscount, getDiscounts, validateDiscount } = require('../controllers/discountController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createDiscount);
router.get('/', getDiscounts);
router.post('/validate', validateDiscount);

module.exports = router;
