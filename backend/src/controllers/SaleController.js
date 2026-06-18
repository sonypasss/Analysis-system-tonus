const {
  Sale,
  SaleItem,
  Product,
  Client
} = require("../models");

class SaleController {

  async create(req, res) {

    try {

      const {
        clientId,
        saleDate,
        items
      } = req.body;

      let totalAmount = 0;

      for (const item of items) {

        const product = await Product.findByPk(item.productId);

        if (!product) {

          return res.status(404).json({
            message: `Товар ${item.productId} не найден`
          });

        }

        totalAmount += Number(product.price)*item.quantity;

      }

      const sale = await Sale.create({
          clientId,
          saleDate,
          totalAmount
        });

      for (const item of items) {

        const product = await Product.findByPk(item.productId);

        await SaleItem.create({

          saleId:
          sale.id,

          productId:
          item.productId,

          quantity:
          item.quantity,

          price:
          product.price

        });

      }

      return res.status(201).json({
        message: "Продажа создана",
        sale
      });

    }

    catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }

  }

  async getAll(req, res) {

    try {

      const sales =
        await Sale.findAll({

          include: [
            Client,
            SaleItem
          ],

          order: [
            ["id", "DESC"]
          ]

        });

      return res.json(
        sales
      );

    }

    catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }

  }

  async getAll(req, res) {
    try {
      const sales = await Sale.findAll({
        include: [
          {
            model: Client
          }
        ],

        order: [
          ["saleDate", "DESC"]
        ]
      });

    return res.json(sales);

    }

    catch (error) {
      return res.status(500).json({message: error.message});
    }

  }

}

module.exports = new SaleController();