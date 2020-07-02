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
  comentario: String,
  mantenimiento:{
    nombre: String,
    area: String
  },
  status: {
    type: String,
    default: "Pendiente"
  }
})
const Incidencia = mongoose.model('Incidencia', IncidenciaSchema)
export { Incidencia }
