const { Sale } = require("../models");

class ExportController {

  async csv(req, res) {

    try {

      const sales = await Sale.findAll();

      const revenue = sales.reduce((sum, s) => sum + Number(s.totalAmount), 0);

      const checks = sales.length;

      const average = checks ? (revenue / checks).toFixed(2) : 0;

      const csv = `Показатель,Значение 
      Выручка,${revenue}
      Количество продаж,${checks}
      Средний чек,${average}
      `;

      res.setHeader("Content-Type", "text/csv");

      res.setHeader("Content-Disposition", "attachment; filename=report.csv");

      res.send(csv);

    }

    catch (error) {
        return res.status(500).json({message: error.message});

    }

  }

}

module.exports = new ExportController();