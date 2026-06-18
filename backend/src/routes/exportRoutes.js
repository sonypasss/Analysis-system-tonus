const Router = require("express");

const router = new Router();

const controller = require("../controllers/ExportController");

router.get("/csv", controller.csv);

module.exports = router;