const { admin } = require("../config/firebase");

// GET sekali 
const getOnceTjData = async (req, res) => {
  try {
    const db = admin.database();
    const snapshot = await db.ref("tj_data").once("value");
    const data = snapshot.val() || {};
    console.log("Data GET sekali:", data); 
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error GET tj_data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Realtime streaming pakai SSE
const streamTjData = (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref("tj_data");

    // Set header SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Listen realtime 
    const listener = ref.on("value", (snapshot) => {
      const data = snapshot.val() || {};
      console.log("Data realtime:", data); 
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    // Stop listener 
    req.on("close", () => {
      ref.off("value", listener);
      res.end();
    });
  } catch (err) {
    console.error("Error streaming tj_data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getOnceTjData, streamTjData };
