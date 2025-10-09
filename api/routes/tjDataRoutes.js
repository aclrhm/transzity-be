const express = require("express");
const { streamTjData } = require("../controllers/tjDataController");
const router = express.Router();

router.get("/realtime", streamTjData);

module.exports = router;
