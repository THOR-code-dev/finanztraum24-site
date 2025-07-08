const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const cors = require('cors');
const axios = require('axios');
const { isValid, electronicFormat } = require('iban');

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.IBAN_API_KEY;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Health-check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

/*
 POST /api/verify-iban
 Request body: { iban: string, name?: string }
 Response: { valid: boolean, iban?: string, message?: string }
*/
app.post('/api/verify-iban', async (req, res) => {
  const { iban } = req.body;
  if (!iban) {
    return res.status(400).json({ isValid: false, message: 'IBAN fehlt' });
  }

  // 1. Adım: Lokal format kontrolü
  const formattedIban = electronicFormat(iban);
  if (!isValid(formattedIban)) {
    return res.status(200).json({ isValid: false, message: 'Ungültiges IBAN-Format' });
  }

  // 2. Adım: API ile varlık kontrolü (sadece format doğruysa)
  if (!API_KEY) {
    return res.status(500).json({ isValid: false, message: 'API Key nicht konfiguriert' });
  }

  try {
    const response = await axios.get(`https://api.ibanapi.com/v1/validate-basic/${formattedIban}?api_key=${API_KEY}`);
    
    // IBANAPI'den gelen cevabı kontrol et
    if (response.data && response.data.result === 200) {
        // Başarılı ve geçerli IBAN
        return res.json({
            isValid: true,
            message: response.data.message || 'Gültige IBAN',
            bankData: response.data.data && Object.keys(response.data.data).length ? response.data.data : null
        });
    } else {
        // API'den hata veya geçersiz IBAN cevabı geldi
        return res.status(200).json({ isValid: false, message: response.data.message || 'Ungültige IBAN' });
    }
  } catch (error) {
    console.error('IBAN API Error:', error.response ? error.response.data : error.message);
    // API'den gelen hata mesajını kullan, yoksa genel bir mesaj göster
    const message = error.response && error.response.data && error.response.data.message 
                    ? error.response.data.message 
                    : 'Fehler bei der IBAN-Überprüfung.';
    return res.status(500).json({ isValid: false, message });
  }
});

const { saveApplication, getAllApplications, getApplicationById } = require('./db');
const logger = require('./logger');

// Endpoint to fetch all applications
app.get('/api/applications', (req, res) => {
  try {
    const data = getAllApplications();
    res.json(data);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Fehler beim Lesen der Anträge.' });
  }
});



// Endpoint to fetch single application by submissionId
app.get('/api/bank-offers', (req, res) => {
  const amount = parseFloat(req.query.amount) || 10000;
  const term = parseInt(req.query.term) || 60;
  const banks = [
    { bank: 'Bank A', rate: 4.8 },
    { bank: 'Bank B', rate: 5.2 },
    { bank: 'Bank C', rate: 6.0 }
  ];
  const offers = banks.map(b => {
    const r = b.rate / 12 / 100;
    const m = amount * r / (1 - Math.pow(1 + r, -term));
    return { ...b, monthly: Math.round(m), total: Math.round(m * term) };
  });
  res.json(offers);
});

app.get('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  const appData = getApplicationById(id);
  if (!appData) return res.status(404).json({ message: 'Antrag nicht gefunden.' });
  res.json(appData);
});

// Endpoint to save a new application
const isProd = process.env.NODE_ENV === 'production';
const applicationSchema = Joi.object({
  kreditBetrag: Joi.number().min(500).max(100000).required(),
  laufzeit: Joi.number().integer().min(6).max(120).required(),
  vorname: isProd ? Joi.string().max(60).required() : Joi.string().max(60),
  nachname: isProd ? Joi.string().max(60).required() : Joi.string().max(60),
  email: isProd ? Joi.string().email().required() : Joi.string().email(),
  telefon: isProd ? Joi.string().max(30).required() : Joi.string().max(30),
}).unknown(true);

app.post('/api/save-application', async (req, res) => {
  try {
    const newApp = { ...req.body, submissionId: `app_${Date.now()}`, submittedAt: new Date().toISOString() };
    await saveApplication(newApp);
    res.status(201).json({ message: 'Antrag erfolgreich gespeichert!', submissionId: newApp.submissionId });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Fehler beim Speichern des Antrags.' });
  }
});

const server = app.listen(PORT, () => {
  logger.info(`Backend läuft auf http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} bereits belegt. Önceki sunucuyu kapatın veya .env içinde farklı PORT ayarlayın.`);
  } else {
    logger.error('Server error:', err);
  }
  process.exit(1);
});
