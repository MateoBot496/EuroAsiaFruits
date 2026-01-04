const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

// GET /auth/me → devuelve info del usuario logueado
router.get("/me", auth(), (req, res) => {
  res.json({ role: req.user.role, username: req.user.username });
});

module.exports = router;
