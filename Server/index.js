const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

app.use(express.json());


// רוטים
app.use('/', require('./routes/authRouters'));

// הפעלת השרת
// const PORT = process.env.PORT || 5001;
router.use(cors({
  credentials: true,
  origin: "https://clicka-project.vercel.app",
})
);

