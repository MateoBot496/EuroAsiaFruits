const express = require("express");
const auth  = require("../../middlewares/auth.js");
const AdminUserController = require("../../controllers/admin/admin.adminUsers.controller.js");

const router = express.Router();

//POST /api/admin/users
router.post("/", auth([1]), AdminUserController.createAdmin);

//GET /api/admin/users
router.get("/", auth([1]), AdminUserController.getAdmins);

//GET /api/admin/users/:adminId
router.get("/:adminId", auth([1]), AdminUserController.getAdminById);

//GET /api/admin/users/email/:email
router.get("/email/:email", auth([1]), AdminUserController.getAdminByEmail);



// PUT /api/admin/users/status/:adminId
router.put("/status/:adminId", auth([1]), AdminUserController.changeStatus);


// PUT /api/admin/users/password/:adminId
router.put("/password/:adminId", auth([1]), AdminUserController.changePassword);


module.exports = router;
