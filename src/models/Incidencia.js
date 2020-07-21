const mongoose = require('../libs/database')

const IncidenciaSchema = new mongoose.Schema({
  huesped: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Huesped'
  },
  condominio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominio'
  },
  fecha: String,
  hora: String,
  comentario: String,
  mantenimiento:{
    tipo: String,
    tipo_en: String,
    nombre: String,
    nombre_en: String,
    area: String,
    area_en: String
  },
  status: {
    type: String,
    default: "Pendiente"
  }
})
const Incidencia = mongoose.model('Incidencia', IncidenciaSchema)
export { Incidencia }
