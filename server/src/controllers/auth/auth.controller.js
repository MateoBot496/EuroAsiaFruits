const { loginAdmin,
  verifyRefreshToken,
  issueAccessToken,
  revokeRefreshToken, } = require("../../services/auth.service.js");

const jwt = require("jsonwebtoken");

module.exports = {

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, role } = await loginAdmin(email, password, {
        userAgent: req.get("user-agent"),
        ipAddress: req.ip,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 60 * 1000, // 10 minutos
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 dias
      });

      return res.status(200).json({ role });
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },

  // POST /api/auth/logout
  async logout(req, res) {
    const rt = req.cookies?.refreshToken;
    if (rt) {
      try { await revokeRefreshToken(rt); } catch {}
    }

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

  // GET /api/auth/me
  async me(req, res) {
    return res.status(200).json({ user: req.user });
  },

  // POST /api/auth/refresh
  async refresh(req, res) {
    const rt = req.cookies?.refreshToken;
    if (!rt) return res.status(401).json({ message: "No refresh token" });

    try {
      const payload = await verifyRefreshToken(rt);
      const newAccessToken = issueAccessToken(payload);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 60 * 1000,
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },
};