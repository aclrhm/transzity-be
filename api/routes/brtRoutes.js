const express = require("express");
const router = express.Router();
const { listRoutes, getRouteDetail } = require("../controllers/routesController");

// Endpoint: list semua rute
router.get("/listRoutes", listRoutes);
router.get("/:number", getRouteDetail);

module.exports = router;
