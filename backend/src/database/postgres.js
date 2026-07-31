import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

dotenv.config();

let pool;

export async function initializeDatabase() {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'android_remote_hub',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();

    logger.info('✅ PostgreSQL database connected');
    return pool;
  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

export async function query(sql, values = []) {
  try {
    const result = await pool.query(sql, values);
    return { rows: result.rows, rowCount: result.rowCount };
  } catch (error) {
    logger.error('Database query error:', error);
    throw error;
  }
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    logger.info('Database pool closed');
  }
}

export { pool };
