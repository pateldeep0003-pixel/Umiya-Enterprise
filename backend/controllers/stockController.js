const pool = require('../config/database');

const getStock = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT s.*, p.name, p.category FROM stock s JOIN products p ON s.product_id = p.id ORDER BY p.name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await pool.query(
      'SELECT * FROM stock WHERE product_id = $1',
      [productId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const result = await pool.query(
      'UPDATE stock SET quantity = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStock = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const result = await pool.query(
      'INSERT INTO stock (product_id, quantity) VALUES ($1, $2) RETURNING *',
      [product_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStock, getStockByProduct, updateStock, addStock };
