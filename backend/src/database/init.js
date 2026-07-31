import pg from 'pg';
import { logger } from '../utils/logger.js';

const { Pool } = pg;

let pool;

/**
 * Initialize database connection pool
 */
export const initializeDatabase = async () => {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'android_remote_hub',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
    });

    // Test connection
    const client = await pool.connect();
    logger.info('✅ Database connection established');
    client.release();

    // Create tables
    await createTables();
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

/**
 * Create database tables
 */
const createTables = async () => {
  const queries = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Devices table
    `CREATE TABLE IF NOT EXISTS devices (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      device_id VARCHAR(255) UNIQUE NOT NULL,
      device_name VARCHAR(255) NOT NULL,
      device_model VARCHAR(255),
      android_version VARCHAR(255),
      is_active BOOLEAN DEFAULT false,
      last_seen TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Device credentials table
    `CREATE TABLE IF NOT EXISTS device_credentials (
      id SERIAL PRIMARY KEY,
      device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
      auth_token VARCHAR(500) NOT NULL,
      token_expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Connection logs table
    `CREATE TABLE IF NOT EXISTS connection_logs (
      id SERIAL PRIMARY KEY,
      device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
      ip_address VARCHAR(255),
      connection_type VARCHAR(50),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // File transfers table
    `CREATE TABLE IF NOT EXISTS file_transfers (
      id SERIAL PRIMARY KEY,
      device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
      file_name VARCHAR(255) NOT NULL,
      file_size BIGINT,
      transfer_type VARCHAR(50),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed_at TIMESTAMP
    )`,
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    logger.info('✅ Database tables initialized');
  } catch (error) {
    logger.error('❌ Failed to create tables:', error);
  }
};

/**
 * Execute database query
 */
export const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    logger.error('Database query error:', error);
    throw error;
  }
};

/**
 * Get database client for transactions
 */
export const getClient = async () => {
  return await pool.connect();
};

export default {
  initializeDatabase,
  query,
  getClient,
};
