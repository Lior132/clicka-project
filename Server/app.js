const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

  app.use(cors({
    origin: 'http://localhost:8081', // הדומיין של הלקוח שלך
    credentials: true // לאפשר שליחה וקבלה של עוגיות
  }));
  
app.use(express.json());
app.use(cookieParser());

// רוטים
app.use('/', require('./routes/authRouters'));

// הפעלת השרת
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port yes ${PORT}`);
});
