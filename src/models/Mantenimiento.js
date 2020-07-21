const mongoose = require('../libs/database')

const MantenimientoSchema = new mongoose.Schema({
  tipo : String,
  tipo_en: String,
  nombre : String,
  nombre_en : String
})
const Mantenimiento = mongoose.model('Mantenimiento', MantenimientoSchema)
export { Mantenimiento }
