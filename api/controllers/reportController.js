const { admin } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");
const Report = require("../models/reportModel");

exports.createReport = async (req, res) => {
  try {
    const { id_user, nomor_bus, rute, keluhan_text } = req.body;
    const file = req.file;

    let fotoUrl = null;

    // Upload ke Firebase Storage
    if (file) {
      const filename = `reports/${uuidv4()}-${file.originalname}`;
      const fileUpload = admin.storage().bucket().file(filename);

      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2030",
      });

      fotoUrl = url;
    }

    const id_report = `REP-${Date.now()}`;
    const created_at = new Date().toISOString().split("T")[0];
    const created_time = new Date().toLocaleTimeString("id-ID");

    const reportData = {
      id_report,
      id_user,
      nomor_bus,
      rute,
      foto_keluhan: fotoUrl,
      keluhan_text,
      created_at,
      created_time,
    };

    const report = await Report.create(reportData);

    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat report" });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.getAll();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data reports" });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ error: "Report tidak ditemukan" });
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil report" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.delete(id);
    res.json({ message: "Report berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus report" });
  }
};
