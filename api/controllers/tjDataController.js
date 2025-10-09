const { listenTjData } = require("../models/tjDataModel");

const streamTjData = (req, res) => {
  try {
    //  SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // listen data
    const unsubscribe = listenTjData((data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    // stop listening
    req.on("close", () => {
      unsubscribe();
      res.end();
    });
  } catch (err) {
    console.error("Error streaming data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { streamTjData };
