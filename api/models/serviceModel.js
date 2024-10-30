// models/userModel.js
const pool = require("../config/db");

// Get Banner list
async function getServices() {
  const query = `SELECT * FROM services`;
  const result = await pool.query(query);
  return result.rows;
}

async function getServiceByCode(service_code) {
  const query = `
    SELECT * FROM services
    WHERE service_code = $1
  `;
  const result = await pool.query(query, [service_code]);
  return result.rows[0];
}

module.exports = {
  getServices,
  getServiceByCode,
};
