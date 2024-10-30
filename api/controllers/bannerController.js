const bannersModel = require("../models/bannerModel");

// Get bamer list
async function getBanners(req, res) {
  try {
    const banners = await bannersModel.getBanners();
    res.json({ status: 0, message: "Sukses", data: banners });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error retrieving banner" });
  }
}

module.exports = {
  getBanners,
};
