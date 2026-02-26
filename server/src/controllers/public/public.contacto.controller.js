
const { sendContacto } = require("../../services/contacto.service");

/**
 * Para enviar formulario de contacto (test)
 * 
 * Body:
 * - productoNombre? (string)
 * - productoReferencia? (string)
 * - nombreCliente (string, requerido)
 * - email (string, requerido)
 * - telefono? (string)
 * - empresa? (string)
 * - mensaje (string, requerido)
 */

// POST /api/public/contacto
const ContactoController = {
  async send(req, res) {
    try {
      const result = await sendContacto(req.body);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message });
    }
  },
};

module.exports = ContactoController;