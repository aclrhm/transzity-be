const express = require("express");
const { getOnceTjData, streamTjData, getTjData } = require("../controllers/tjDataController");

const router = express.Router();

router.get("/getAllData", getOnceTjData);      
router.get("/realtime", streamTjData);
router.get("/getRealtimeData", getTjData);

module.exports = router;