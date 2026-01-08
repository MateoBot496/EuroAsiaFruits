import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { login, logout, me } from "../../controllers/auth/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth([0, 1]), me);

export default router;