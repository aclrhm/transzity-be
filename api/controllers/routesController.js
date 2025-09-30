// routesController.js
const brtRoutes = require("../../brtRoute.js");

// list semua rute
const listRoutes = (req, res) => {
  const list = brtRoutes.map(route => ({
    id: route.id,
    number: route.number,
    route_name: route.route_name,
  }));
  res.json(list);
};

// detail rute berdasarkan nomor bus
const getRouteDetail = (req, res) => {
  const { number } = req.params;
  const route = brtRoutes.find(r => r.number === number);
  if (!route) {
    return res.status(404).json({ message: "Rute tidak ditemukan" });
  }
  res.json(route);
};

module.exports = { listRoutes, getRouteDetail };