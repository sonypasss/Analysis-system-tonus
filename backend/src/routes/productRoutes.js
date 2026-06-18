const Router = require("express");

const router = new Router();

const controller =
require("../controllers/ProductController");

router.post("/", controller.create);

router.get("/search", controller.search);

router.get("/", controller.getAll);

module.exports = router;