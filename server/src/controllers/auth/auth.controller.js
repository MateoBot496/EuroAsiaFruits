import { loginAdmin } from "../../services/auth.service.js";


//POST /api/auth/login
export const login = async (req, res) => {
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
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(204).send();
};

//GET /api/auth/me
export const me = async (req, res) => {
  return res.status(200).json({ user: req.user });
};
