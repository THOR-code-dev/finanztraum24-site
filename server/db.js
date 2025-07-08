const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// ensure /data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const dbPath = path.join(DATA_DIR, 'finanz.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.prepare(`CREATE TABLE IF NOT EXISTS applications (
  submissionId TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  submittedAt TEXT NOT NULL
)`).run();

function saveApplication(app) {
  const stmt = db.prepare('INSERT INTO applications (submissionId, data, submittedAt) VALUES (?, ?, ?)');
  stmt.run(app.submissionId, JSON.stringify(app), app.submittedAt);
}

function getAllApplications() {
  const rows = db.prepare('SELECT * FROM applications ORDER BY submittedAt DESC').all();
  return rows.map(r => ({ ...JSON.parse(r.data), submissionId: r.submissionId, submittedAt: r.submittedAt }));
}

function getApplicationById(id) {
  const row = db.prepare('SELECT * FROM applications WHERE submissionId = ?').get(id);
  if (!row) return null;
  return { ...JSON.parse(row.data), submissionId: row.submissionId, submittedAt: row.submittedAt };
}

module.exports = {
  saveApplication,
  getAllApplications,
  getApplicationById,
};
