// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('head');
});

app.get('/patients', (req, res) => {
  db.all('SELECT * FROM patients', (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('patients', { patients: rows });
  });
});

app.post('/add-patient', (req, res) => {
  const { name, age, gender, contact } = req.body;
  db.run('INSERT INTO patients (name, age, gender, contact) VALUES (?, ?, ?, ?)', [name, age, gender, contact], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/patients');
  });
});

app.get('/doctors', (req, res) => {
  db.all('SELECT * FROM doctors', (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('doctors', { doctors: rows });
  });
});

app.post('/add-doctor', (req, res) => {
  const { name, specialty, contact } = req.body;
  db.run('INSERT INTO doctors (name, specialty, contact) VALUES (?, ?, ?)', [name, specialty, contact], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/doctors');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

