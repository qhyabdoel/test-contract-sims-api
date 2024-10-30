const bannersModel = require("../models/serviceModel");

// Get bamer list
async function getServices(req, res) {
  try {
    const service = await bannersModel.getServices();
    res.json({ status: 0, message: "Sukses", data: service });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error retrieving service" });
  }
}

module.exports = {
  getServices,
};
