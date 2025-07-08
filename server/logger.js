const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const fs = require('fs');
const LOG_DIR = path.join(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error', maxsize: 1048576, maxFiles: 3 }),
    new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log'), maxsize: 1048576, maxFiles: 3 }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: combine(colorize(), logFormat) }));
}

module.exports = logger;
