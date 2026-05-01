const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", allUsers);

module.exports = router;
