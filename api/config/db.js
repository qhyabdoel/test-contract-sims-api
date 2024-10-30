const { Pool } = require("pg");

// PostgreSQL connection details
const pool = new Pool({
  user: process.env.POSTGRES_USER, // Database username
  host: process.env.POSTGRES_HOST, // Database host, e.g., localhost
  database: process.env.POSTGRES_DATABASE, // Database name
  password: process.env.POSTGRES_PASSWORD, // Database password
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Allow insecure connections (useful for development/testing)
  },
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

module.exports = pool;
