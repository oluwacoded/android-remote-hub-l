import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken } from '../utils/auth.js';
import { query } from '../database/init.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Configure multer for file uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || 104857600) },
});

/**
 * POST /api/files/upload
 * Upload file to device
 */
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { deviceId, targetPath } = req.body;
    const userId = req.user.id;

    if (!deviceId || !req.file) {
      return res.status(400).json({ error: 'Device ID and file required' });
    }

    // Verify device ownership
    const device = await query(
      'SELECT id FROM devices WHERE device_id = $1 AND user_id = $2',
      [deviceId, userId]
    );

    if (device.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Record file transfer
    const transfer = await query(
      `INSERT INTO file_transfers (device_id, file_name, file_size, transfer_type, status)
       VALUES ($1, $2, $3, 'upload', 'pending')
       RETURNING id`,
      [device.rows[0].id, req.file.originalname, req.file.size]
    );

    logger.info(`✅ File upload initiated: ${req.file.originalname} to ${deviceId}`);

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: transfer.rows[0].id,
        filename: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
      },
    });
  } catch (error) {
    logger.error('File upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

/**
 * GET /api/files/download/:fileId
 * Download file from device
 */
router.get('/download/:fileId', authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;
    const userId = req.user.id;

    // Verify access
    const transfer = await query(
      `SELECT ft.id, ft.file_name, ft.file_size, d.user_id
       FROM file_transfers ft
       JOIN devices d ON ft.device_id = d.id
       WHERE ft.id = $1 AND d.user_id = $2`,
      [fileId, userId]
    );

    if (transfer.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(uploadDir, transfer.rows[0].file_name);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    logger.info(`✅ File downloaded: ${transfer.rows[0].file_name}`);

    res.download(filePath, transfer.rows[0].file_name);
  } catch (error) {
    logger.error('File download error:', error);
    res.status(500).json({ error: 'File download failed' });
  }
});

/**
 * GET /api/files/transfers/:deviceId
 * Get file transfer history for device
 */
router.get('/transfers/:deviceId', authenticateToken, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;

    const result = await query(
      `SELECT ft.id, ft.file_name, ft.file_size, ft.transfer_type, ft.status, ft.created_at
       FROM file_transfers ft
       JOIN devices d ON ft.device_id = d.id
       WHERE d.device_id = $1 AND d.user_id = $2
       ORDER BY ft.created_at DESC
       LIMIT 50`,
      [deviceId, userId]
    );

    res.json({
      transfers: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    logger.error('Failed to fetch transfers:', error);
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
});

export default router;
