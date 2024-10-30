// models/userModel.js
const pool = require("../config/db");

// Get Banner list
async function getTransactionHistory(limit, offset) {
  const query = `
    SELECT * FROM transaction_history
    ORDER BY created_on DESC
    LIMIT $1 OFFSET $2;
  `;

  const values = [limit, offset];

  const result = await pool.query(query, values);
  return result.rows;
}

// Create transaction history
async function createTransactionHistory(
  invoice_number,
  transaction_type,
  description,
  total_amount
) {
  const query = `
          INSERT INTO transaction_history (invoice_number, transaction_type, description, total_amount)
          VALUES ($1, $2, $3, $4) RETURNING *
      `;
  const values = [invoice_number, transaction_type, description, total_amount];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getTransactionHistory,
  createTransactionHistory,
};
