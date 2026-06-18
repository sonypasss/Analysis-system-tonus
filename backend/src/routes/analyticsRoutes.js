const Router = require("express");

const router = new Router();

const controller = require("../controllers/AnalyticsController");

router.get("/", controller.summary);
router.get("/revenue-by-date", controller.revenueByDate);
router.get("/top-products", controller.topProducts);
router.get("/top-clients", controller.topClients);

module.exports = router;