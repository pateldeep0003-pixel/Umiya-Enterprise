const pool = require('../config/database');

const createPurchase = async (req, res) => {
  try {
    const { supplier_name, items, total_amount, notes } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      'INSERT INTO purchases (supplier_name, total_amount, notes, user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [supplier_name, total_amount, notes, userId]
    );

    const purchaseId = result.rows[0].id;

    for (const item of items) {
      await pool.query(
        'INSERT INTO purchase_items (purchase_id, product_id, quantity, unit_cost) VALUES ($1, $2, $3, $4)',
        [purchaseId, item.product_id, item.quantity, item.unit_cost]
      );

      await pool.query(
        'UPDATE stock SET quantity = quantity + $1 WHERE product_id = $2',
        [item.quantity, item.product_id]
      );
    }

    res.status(201).json({ id: purchaseId, message: 'Purchase created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchases = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM purchases ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPurchase, getPurchases };
