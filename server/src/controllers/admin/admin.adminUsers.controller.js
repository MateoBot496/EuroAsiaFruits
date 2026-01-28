const {
  createAdmin,
  disableAdmin,
  changeRole,
} = require("../../services/admin.adminUsers.service.js");

const AdminUserController = {
  
//POST /api/admin/users
  async createAdmin(req, res) {
    try {
      const { username, email, password} = req.body;

      const admin = await createAdmin({
        username,
        email,
        password,
        role: 0,
        createdBy: req.user.id
      });

      return res.status(201).json(admin);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  
//PUT /api/admin/users/disable/:adminId
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

  
};

module.exports = AdminUserController;
