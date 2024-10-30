// models/userModel.js
const pool = require("../config/db");

// Get Banner list
async function getBanners() {
  const query = `SELECT * FROM banners`;
  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
  getBanners,
};
