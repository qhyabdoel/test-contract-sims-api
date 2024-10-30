// models/userModel.js
const pool = require("../config/db");

// Create User
async function createUser({ email, password, first_name, last_name }) {
  const query = `
        INSERT INTO users (email, password, first_name, last_name)
        VALUES ($1, $2, $3, $4)
    `;
  const values = [email, password, first_name, last_name];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Get User list
async function getUsers() {
  const query = `SELECT * FROM users`;
  const result = await pool.query(query);
  return result.rows;
}

// Get User by ID
async function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

// Get User by Email
async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

// Update User
async function updateUser(id, { first_name, last_name }) {
  const query = `
        UPDATE users
        SET first_name = $1, last_name = $2
        WHERE id = $3 RETURNING *
    `;
  const values = [first_name, last_name, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Update profile image
async function updateProfileImage(id, profile_image) {
  const query = `
        UPDATE users
        SET profile_image = $1
        WHERE id = $2 RETURNING *
    `;
  const values = [profile_image, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Delete User
async function deleteUser(id) {
  const query = `DELETE FROM users WHERE id = $1`;
  await pool.query(query, [id]);
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
  updateProfileImage,
};
