const { Sale } = require("../models");
const { Op } = require("sequelize");

class AnalyticsController {

  async summary(req, res) {

    try {

      const { start, end } = req.query;

      const where = {};

      if (start && end) {
        where.saleDate = {
          [Op.between]: [start, end]
        };
      }

      const sales = await Sale.findAll({where});
      const revenue = sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);
      const checks = sales.length;
      const averageCheck = checks ? Number((revenue / checks).toFixed(2)): 0;
      const clients = new Set(sales.map(s => s.clientId)).size;

      return res.json({
        revenue,
        checks,
        averageCheck,
        clients
      });

    }

    catch (error) {

      return res.status(500).json({
        message:
          error.message
      });

    }

  }

  async revenueByDate(req, res) {
    try {
      const { start, end } = req.query;
      const where = {};
      
      if (start && end) {
      where.saleDate = {
        [Op.between]: [start, end]
      };
      }

      const sales = await Sale.findAll({
        where,
        order: [["saleDate", "ASC"]]
      });

      const result = sales.map(sale => ({
        date: sale.saleDate.toISOString().slice(0, 10),
        revenue: Number(sale.totalAmount)
      }));

      return res.json(result);

    }

    catch (error) {
      
      return res.status(500).json({message: error.message});
    }

  }

  async topProducts(req, res) {
    try {
      const sequelize = Sale.sequelize;
      const [result] = await sequelize.query(`
        SELECT
        p.name,
        SUM(si.quantity)::INTEGER AS quantity

        FROM sale_items si

        JOIN products p
        ON p.id = si."productId"

        GROUP BY p.name

        ORDER BY quantity DESC

      LIMIT 10
      `);
      
      return res.json(result);

    }

    catch (error) {
      return res.status(500).json({
        message: error.message});

    }

  }

  async topClients(req, res) {
    try {
      const sequelize = Sale.sequelize;
      const [result] = await sequelize.query(`
        SELECT
      c.name,
      SUM(s."totalAmount") AS revenue

      FROM sales s

      JOIN clients c
      ON c.id=s."clientId"

      GROUP BY c.name

      ORDER BY revenue DESC

      LIMIT 10
    `);
    
      return res.json(result);

    }

    catch (error) {
      return res.status(500).json({
        message: error.message
      });

    }
  }

}

module.exports = new AnalyticsController();