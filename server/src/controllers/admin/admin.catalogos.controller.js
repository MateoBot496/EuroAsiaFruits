

const CatalogosService = require("../../services/admin.catalogos.service");

// GET /api/admin/catalogos?tipo=
async function getAllByTipo(req, res) {
  try {
    const { tipo } = req.query;
    const data = await CatalogosService.getAllByTipo(tipo);
    return res.json(data);
  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
  }
}

// POST /api/admin/catalogos?tipo=
// body: { valor }
async function createTipo(req, res) {
  try {
    const { tipo } = req.query;
    const { valor } = req.body;

    const data = await CatalogosService.createTipo(tipo, valor);
    return res.status(201).json(data);
  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
  }
}

// PUT /api/admin/catalogos?tipo=
// body: { oldValor, newValor }
async function renameTipo(req, res) {
  try {
    const { tipo } = req.query;
    const { oldValor, newValor } = req.body;

    const data = await CatalogosService.renameTipo(tipo, oldValor, newValor);

    if (!data) {
      return res.status(404).json({ message: "No encontrado" });
    }

    return res.json(data);
  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
  }
}

// PUT /api/admin/catalogos/active?tipo=
// body: { valor, isActive }
async function setActive(req, res) {
  try {
    const { tipo } = req.query;
    const { valor, isActive } = req.body;

    const data = await CatalogosService.setActive(tipo, valor, isActive);

    if (!data) {
      return res.status(404).json({ message: "No encontrado" });
    }

    return res.json(data);
  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
  }
}

module.exports = {
  getAllByTipo,
  createTipo,
  renameTipo,
  setActive,
};