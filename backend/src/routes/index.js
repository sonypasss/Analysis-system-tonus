const Router = require("express");

const router = new Router();

const productRoutes = require("./productRoutes");
const clientRoutes = require("./clientRoutes");
const saleRoutes = require("./saleRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const exportRoutes = require("./exportRoutes");

router.use("/products", productRoutes);
router.use("/clients", clientRoutes);
router.use("/sales", saleRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/export", exportRoutes);

module.exports = router;