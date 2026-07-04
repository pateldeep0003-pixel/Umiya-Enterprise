const pool = require('../config/database');

const createWarranty = async (req, res) => {
  try {
    const { product_id, sale_id, warranty_months, coverage_description } = req.body;

    const result = await pool.query(
      'INSERT INTO warranties (product_id, sale_id, warranty_months, coverage_description, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [product_id, sale_id, warranty_months, coverage_description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWarranties = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT w.*, p.name FROM warranties w JOIN products p ON w.product_id = p.id ORDER BY w.created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWarrantyBySale = async (req, res) => {
  try {
    const { saleId } = req.params;
    const result = await pool.query(
      'SELECT * FROM warranties WHERE sale_id = $1',
      [saleId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWarranty, getWarranties, getWarrantyBySale };
