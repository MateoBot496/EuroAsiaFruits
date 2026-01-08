const {
  createAdmin,
  disableAdmin,
  changeRole,
} = require("../../services/adminUsers.service.js");

const AdminUserController = {
  
//POST /api/admin/create
  async createAdmin(req, res) {
    try {
      const { email, password, role } = req.body;
      const createdBy = req.user.id;

      const admin = await createAdmin({
        email,
        password,
        role: role === undefined ? 0 : Number(role),
        createdBy,
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
