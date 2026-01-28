const express = require("express");
const auth  = require("../../middlewares/auth.js");
const AdminUserController = require("../../controllers/admin/admin.adminUsers.controller.js");

const router = express.Router();

//POST /api/admin/users
router.post("/", auth([1]), AdminUserController.createAdmin);

//PUT /api/admin/users/disable/:adminId
router.put("/disable/:adminId", auth([1]), AdminUserController.disableAdmin);

//PUT /api/admin/users/role/:adminId
router.put("/role/:adminId", auth([1]), AdminUserController.changeRole);

module.exports = router;
