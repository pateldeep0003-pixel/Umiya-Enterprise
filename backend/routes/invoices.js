const express = require('express');
const { createInvoice, getInvoices, getInvoiceById, updateInvoiceStatus } = require('../controllers/invoiceController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createInvoice);
router.get('/', authMiddleware, getInvoices);
router.get('/:id', authMiddleware, getInvoiceById);
router.put('/:id/status', authMiddleware, updateInvoiceStatus);

module.exports = router;
