const pool = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    const salesResult = await pool.query(
      "SELECT COUNT(*) as total_sales, COALESCE(SUM(total_amount), 0) as total_revenue FROM sales WHERE created_at > NOW() - INTERVAL '30 days'"
    );

    const productsResult = await pool.query('SELECT COUNT(*) as total_products FROM products');

    const lowStockResult = await pool.query(
      'SELECT COUNT(*) as low_stock FROM stock WHERE quantity < 10'
    );

    const recentSalesResult = await pool.query(
      'SELECT * FROM sales ORDER BY created_at DESC LIMIT 5'
    );

    const categoryResult = await pool.query(
      'SELECT p.category, COUNT(*) as count, COALESCE(SUM(si.subtotal), 0) as revenue FROM sale_items si JOIN products p ON si.product_id = p.id GROUP BY p.category'
    );

    res.json({
      sales: {
        total: salesResult.rows[0].total_sales,
        revenue: salesResult.rows[0].total_revenue
      },
      products: productsResult.rows[0].total_products,
      lowStock: lowStockResult.rows[0].low_stock,
      recentSales: recentSalesResult.rows,
      categoryWise: categoryResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardStats };
