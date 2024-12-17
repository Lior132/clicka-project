const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");


const { SignUpUser, SignUpUserToken } = require("../controllers/outhController");

router.use(cors({
    credentials: true,
    origin: "http://localhost:8081",
  })
);

router.post("/singUpUser", SignUpUser);
router.post("/SignUpUserToken", SignUpUserToken);

module.exports = router;
