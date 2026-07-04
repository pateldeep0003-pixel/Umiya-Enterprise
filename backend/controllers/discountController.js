const pool = require('../config/database');

const createDiscount = async (req, res) => {
  try {
    const { code, percentage, description, start_date, end_date } = req.body;

    const result = await pool.query(
      'INSERT INTO discounts (code, percentage, description, start_date, end_date, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [code, percentage, description, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDiscounts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM discounts WHERE end_date > NOW() ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateDiscount = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await pool.query(
      'SELECT * FROM discounts WHERE code = $1 AND start_date <= NOW() AND end_date > NOW()',
      [code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Discount code not found or expired' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDiscount, getDiscounts, validateDiscount };
