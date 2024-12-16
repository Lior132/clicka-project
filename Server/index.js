// const express = require('express');
// const dotenv = require('dotenv').config();
// const cors = require('cors');
// const mongoose = require('mongoose')
// // const cookieParser = require('cookie-parser');
// const app = express();

// mongoose.connect(process.env.DATABASE_URL)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Connection error:', err));

// app.use(express.json());


// // רוטים
// app.use('/', require('./routes/authRouters'));

// // הפעלת השרת
// // const PORT = process.env.PORT || 5001;
// router.use(cors({
//   credentials: true,
//   origin: "https://clicka-project.vercel.app",
// })
// );



const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// קישור למסד הנתונים
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.use(express.json());

// הגדרת CORS בצורה נכונה
const allowedOrigins = ["http://localhost:8081", "https://clicka-project.vercel.app"];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,  // חשוב להוסיף את זה במקרה שאתה שולח מידע שדורש credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // הוספת האפשרות ל-OPTIONS ו-POST
}));

// זה מבצע את ה-preflight עבור כל הבקשות
app.options('*', cors());

// הגדרת הנתיב של יצירת משתמש
const authRouter = require("./routes/authRouters");
app.use("/", authRouter);

// הפעלת השרת
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
