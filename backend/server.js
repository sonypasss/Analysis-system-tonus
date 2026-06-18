require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./src/config/database");

require("./src/models");

const routes = require("./src/routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Сервер Тонус работает");
}
);

async function start() {

  try {

    await sequelize.authenticate();

    console.log(
      "PostgreSQL подключён"
    );

    await sequelize.sync();

    console.log(
      "Таблицы созданы"
    );

    app.listen(
      PORT,
      () => {

        console.log(
          `Server started ${PORT}`
        );

      }
    );

  }

  catch (error) {

    console.log(
      error.message
    );

  }

}

start();