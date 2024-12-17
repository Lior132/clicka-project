const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");


const { SignUpUser } = require("../controllers/outhController");

router.use(cors({
    credentials: true,
    origin: ["http://localhost:8081", "https://clicka-project.vercel.app/"],
  })
);

router.post("/singUpUser", SignUpUser);
module.exports = router;
