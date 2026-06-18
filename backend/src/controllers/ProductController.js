const { Product } = require("../models");
const { Op } = require("sequelize");

class ProductController {

  async create(req, res) {
    try {
      const {
        article,
        name,
        productGroup,
        imageUrl,
        price,
        stockQuantity
      } = req.body;

      const product = await Product.create({
        article,
        name,
        productGroup,
        imageUrl,
        price,
        stockQuantity
      });

      return res.status(201).json(product);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        order: [["id", "DESC"]]
      });

      return res.json(products);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async search(req, res) {
    try {
      const { name } = req.query;

      const products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });

      return res.json(products);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

}

module.exports = new ProductController();