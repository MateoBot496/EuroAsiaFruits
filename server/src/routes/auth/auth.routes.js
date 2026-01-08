const AuthController = require("../../controllers/auth/auth.controller.js");

//POST /api/auth/login
router.post("/login", AuthController.login);

//POST /api/auth/logout
router.post("/logout", AuthController.logout);

//GET /api/auth/me 
router.get("/me", auth([0,1]), AuthController.me);
