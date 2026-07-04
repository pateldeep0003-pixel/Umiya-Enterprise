const pool = require('../config/database');

const createInvoice = async (req, res) => {
  try {
    const { sale_id, customer_name, items, subtotal, tax_amount = 0, discount_amount = 0, total_amount } = req.body;

    const result = await pool.query(
      'INSERT INTO invoices (sale_id, customer_name, subtotal, tax_amount, discount_amount, total_amount, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [sale_id, customer_name, subtotal, tax_amount, discount_amount, total_amount, 'pending']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM invoices ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE invoices SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createInvoice, getInvoices, getInvoiceById, updateInvoiceStatus };
