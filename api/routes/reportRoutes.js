// routes/reportRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createReport,
  getAllReports,
  getReportById,
  deleteReport,
} = require("../controllers/reportController");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadReport", upload.single("foto_keluhan"), createReport);
router.get("/getAllReport", getAllReports);
router.get("/getReportById/:id", getReportById);
router.delete("/deleteReport/:id", deleteReport);

module.exports = router;
