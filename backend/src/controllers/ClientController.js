const { Client } = require("../models");

class ClientController {

  async create(req, res) {
    try {

      const {
        name,
        inn,
        region,
        segment,
        phone
      } = req.body;

      const client =
        await Client.create({
          name,
          inn,
          region,
          segment,
          phone
        });

      return res.status(201).json(client);

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }
  }

  async getAll(req, res) {
    try {

      const clients =
        await Client.findAll({

          order: [
            ["id", "DESC"]
          ]

        });

      return res.json(clients);

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }
  }

}

module.exports = new ClientController();