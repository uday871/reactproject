const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const axios = require('axios'); 
const app = express();

const port = process.env.PORT || 3000;


// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
});

// Connect to MySQL and create tables if they do not exist
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');

  // Create Users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(15) NOT NULL,
      location VARCHAR(255) NOT NULL,
      otp VARCHAR(10) DEFAULT NULL,
      otp_verified BOOLEAN DEFAULT FALSE,
      role ENUM('user', 'admin') DEFAULT 'user',
      first_login BOOLEAN DEFAULT TRUE
    );
  `;

  // Create Products table
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      discount DECIMAL(5, 2) DEFAULT 0,
      brandname VARCHAR(255) NOT NULL,
      imageUrl1 VARCHAR(255) NOT NULL,
      imageUrl2 VARCHAR(255) DEFAULT NULL,
      imageUrl3 VARCHAR(255) DEFAULT NULL,
      imageUrl4 VARCHAR(255) DEFAULT NULL,
      imageUrl5 VARCHAR(255) DEFAULT NULL,
      imageUrl6 VARCHAR(255) DEFAULT NULL
    );
  `;

  db.query(createUsersTable, (err, result) => {
    if (err) throw err;
    console.log('Users table created or already exists.');
  });

  db.query(createProductsTable, (err, result) => {
    if (err) throw err;
    console.log('Products table created or already exists.');
  });
});

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'jwtPrivateKey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access Denied.');
  next();
};

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// User registration route
app.post('/register', async (req, res) => {
  const { username, email, password, phone_number, location } = req.body;

  // Validate phone number (Indian format)
  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(phone_number)) {
    return res.status(400).send('Invalid phone number.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

  // Save user data with OTP
  db.query('INSERT INTO users (username, email, password, phone_number, location, otp) VALUES (?, ?, ?, ?, ?, ?)', 
  [username, email, hashedPassword, phone_number, location, otp], (err, result) => {
    if (err) return res.status(400).send(err);

    // Send OTP to user via SMS API
    // Replace with actual SMS sending logic
    axios.post('https://your-sms-api-url/send', {
      to: phone_number,
      message: `Your OTP is ${otp}`
    }).then(() => {
      res.send('User registered. Please verify your OTP.');
    }).catch(err => {
      res.status(500).send('Failed to send OTP.');
    });
  });
});

// OTP verification route
app.post('/verify-otp', (req, res) => {
  const { username, otp } = req.body;

  db.query('SELECT otp, otp_verified FROM users WHERE username = ?', [username], (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid username.');
    
    const user = results[0];
    if (user.otp !== otp) return res.status(400).send('Invalid OTP.');
    if (user.otp_verified) return res.status(400).send('OTP already verified.');

    db.query('UPDATE users SET otp_verified = TRUE WHERE username = ?', [username], (err) => {
      if (err) return res.status(500).send('Failed to verify OTP.');
      res.send('OTP verified successfully.');
    });
  });
});

// User login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check for admin credentials
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ id: 1, role: 'admin' }, 'jwtPrivateKey');
    return res.send({ token, firstLogin: false });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid username or password.');
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');

    // Update first_login flag if it's the first login
    if (user.first_login) {
      db.query('UPDATE users SET first_login = FALSE WHERE id = ?', [user.id], (err) => {
        if (err) throw err;
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'jwtPrivateKey');
    res.send({ token, firstLogin: user.first_login });
  });
});

// Handle product upload route
app.post('/upload-product', auth, admin, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 },
  { name: 'image6', maxCount: 1 }
]), (req, res) => {
  const { name, description, price, category, discount, brandname } = req.body;
  const imageUrl1 = req.files['image1'] ? req.files['image1'][0].path : null;
  const imageUrl2 = req.files['image2'] ? req.files['image2'][0].path : null;
  const imageUrl3 = req.files['image3'] ? req.files['image3'][0].path : null;
  const imageUrl4 = req.files['image4'] ? req.files['image4'][0].path : null;
  const imageUrl5 = req.files['image5'] ? req.files['image5'][0].path : null;
  const imageUrl6 = req.files['image6'] ? req.files['image6'][0].path : null;

  db.query('INSERT INTO products (name, description, price, category, discount, brandname, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
  [name, description, price, category, discount, brandname, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6], (err, result) => {
    if (err) throw err;
    res.send('Product uploaded successfully.');
  });
});

// Get all products route
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
