const { loginAdmin } = require("../../services/auth.service.js");

module.exports = {
  
//POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { token, role } = await loginAdmin(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({ role });
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  
//POST /api/auth/logout
  async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(204).send();
  },


//GET /api/auth/me 
  async me(req, res) {
    return res.status(200).json({ user: req.user });
  },
};
