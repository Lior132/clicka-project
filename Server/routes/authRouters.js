const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require('../middleware/authMiddleware')

const { SignUpUser, SignUpUserToken, postProfileDetailes, getProfileDetails } = require("../controllers/outhController");

router.use(cors({
    credentials: true,
    origin: "http://localhost:8081",
  })
);

router.post("/singUpUser", SignUpUser);
router.post("/SignUpUserToken", SignUpUserToken);
router.post("/profileDetails", authMiddleware, postProfileDetailes)
router.get("/profileDetails/:userId",authMiddleware, getProfileDetails)

module.exports = router;
