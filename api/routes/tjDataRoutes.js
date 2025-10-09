const express = require("express");
const { getOnceTjData, streamTjData } = require("../controllers/tjDataController");

const router = express.Router();

router.get("/getAllData", getOnceTjData);      
router.get("/realtime", streamTjData);

module.exports = router;