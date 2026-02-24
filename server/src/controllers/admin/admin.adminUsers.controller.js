const {
  createAdmin,
  changeAdminStatus,
  listAdmins,
  changeAdminPassword
} = require("../../services/admin.adminUsers.service.js");

const AdminUserController = {
  
  // GET /api/admin/users
  async getAdmins(req, res) {
    try {
      const admins = await listAdmins();
      return res.status(200).json(admins);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  // POST /api/admin/users
  async createAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const admin = await createAdmin({
        email,
        password,
        role: 0,
        createdBy: Number(req.user.id),
      });

      return res.status(201).json(admin);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  // PUT /api/admin/users/status/:adminId
  async changeStatus(req, res) {
    try {
      const adminId = Number(req.params.adminId);
      const isActive = Number(req.body.isActive);
      const changedBy = Number(req.user.id);

      const result = await changeAdminStatus({
        adminId,
        isActive,
        changedBy,
      });

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  // PUT /api/admin/users/password/:adminId
  async changePassword(req, res) {
    try {
      const adminId = Number(req.params.adminId);
      const { oldPassword, newPassword } = req.body;

      const result = await changeAdminPassword({
        adminId,
        oldPassword,
        newPassword,
        changedBy: Number(req.user.id),
      });

      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  }
};

module.exports = AdminUserController;