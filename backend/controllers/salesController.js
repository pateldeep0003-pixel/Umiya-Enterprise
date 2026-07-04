const pool = require('../config/database');

const createSale = async (req, res) => {
  try {
    const { customer_name, items, total_amount, discount_amount = 0, notes } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      'INSERT INTO sales (customer_name, total_amount, discount_amount, notes, user_id, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [customer_name, total_amount, discount_amount, notes, userId]
    );

    const saleId = result.rows[0].id;

    for (const item of items) {
      await pool.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5)',
        [saleId, item.product_id, item.quantity, item.unit_price, item.subtotal]
      );

      await pool.query(
        'UPDATE stock SET quantity = quantity - $1 WHERE product_id = $2',
        [item.quantity, item.product_id]
      );
    }

    res.status(201).json({ id: saleId, message: 'Sale created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sales ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    const items = await pool.query('SELECT * FROM sale_items WHERE sale_id = $1', [id]);

    res.json({ sale: sale.rows[0], items: items.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSale, getSales, getSaleById };
