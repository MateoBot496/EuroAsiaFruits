const bcrypt = require("bcrypt");
const pool = require("./../src/config/db.js");

(async () => {
  try {
    const newPassword = "admin123"; // 👈 contraseña nueva
    const email = "admin@mail.com";

    const hash = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE usuarios SET password_hash = ? WHERE email = ?", [
      hash,
      email,
    ]);

    console.log("✅ Contraseña reseteada");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${newPassword}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
