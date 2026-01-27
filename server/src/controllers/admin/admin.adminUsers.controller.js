const {
  createAdmin,
  disableAdmin,
  changeRole,
} = require("../../services/admin.adminUsers.service.js");

const AdminUserController = {
  //POST /api/admin/create
  async createAdmin(req, res) {
    try {
      const { username, email, password, role } = req.body;

      const admin = await createAdmin({
        username,
        email,
        password,
        role: role || "admin",
      });

      return res.status(201).json(admin);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  //PUT /api/admin/disable/:adminId
  async disableAdmin(req, res) {
    try {
      const adminId = Number(req.params.adminId);
      const disabledBy = req.user.id;

      const result = await disableAdmin({ adminId, disabledBy });

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  //PUT /api/admin/role/:adminId

  async changeRole(req, res) {
    try {
      const adminId = Number(req.params.adminId);
      const newRole = Number(req.body.role);
      const changedBy = req.user.id;

      const result = await changeRole({ adminId, newRole, changedBy });

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },
};

module.exports = AdminUserController;
