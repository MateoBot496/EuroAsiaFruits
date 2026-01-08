const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const AuthController = require("../../controllers/auth/auth.controller");

//POST /api/auth/login
router.post("/login", AuthController.login);

//POST /api/auth/logout
router.post("/logout", auth([0,1]), AuthController.logout);

//GET /api/auth/me 
router.get("/me", auth([0,1]), AuthController.me);

module.exports = router;