const { loginAdmin } = require("../../services/auth.service.js");
const jwt = require("jsonwebtoken");

module.exports = {

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, role } = await loginAdmin(email, password);

      // crear Access token 
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 60 * 1000, // 10 minutos
      });

      // crear refresh token 
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 días
      });

      return res.status(200).json({ role });
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },


  //POST /api/auth/logout
  async logout(req, res) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("refreshToken", {
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


  //POST /api/auth/refresh
  async refresh(req, res) {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = jwt.sign(
        { id: payload.id, role: payload.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "10m" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.status(401).json({ message: "Refresh inválido o expirado" });
    }
  }
};
