const CatalogosService = require("../../services/catalogos.service");


//GET /api/public/catalogos
// Devuelve grupos, categorias, origenes, etiquetas y envases
 
async function getCatalogos(req, res, next) {
  try {
    const data = await CatalogosService.getCatalogos();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getActiveCatalogos(req, res, next) {
    try {
      const data = await CatalogosService.getActiveCatalogos();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

module.exports = {
  getCatalogos,
  getActiveCatalogos
};
