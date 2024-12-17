// const express = require('express');
// const dotenv = require('dotenv').config();
// // const cors = require('cors');
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
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port yes ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// טוען משתני סביבה רק אם רץ מקומית (ב-Vercel זה לא חובה)
// if (process.env.NODE_ENV !== 'production') {
//   dotenv.config();
// }

if (!process.env.DATABASE_URL) {
  dotenv.config();
}

const app = express();

// חיבור למסד הנתונים
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

app.use(express.json());

// רוטים
app.use('/', require('./routes/authRouters'));

// הפעלת השרת
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
