// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");


// const { SignUpUser } = require("../controllers/outhController");

// router.post("/signUpUser", SignUpUser);
// module.exports = router;

const express = require("express");
const router = express.Router();
const { SignUpUser } = require("../controllers/outhController");

// הגדרת הנתיב של יצירת משתמש
router.post("/signUpUser", SignUpUser);

module.exports = router;
