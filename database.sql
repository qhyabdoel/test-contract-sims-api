CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255) NOT NULL,
    banner_image TEXT NOT NULL,
    description TEXT
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_icon TEXT,
    service_tariff NUMERIC(10, 2) NOT NULL
);

CREATE TABLE transaction_history (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    total_amount NUMERIC(15, 2) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);