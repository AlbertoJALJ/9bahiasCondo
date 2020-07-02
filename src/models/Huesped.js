const mongoose = require('../libs/database')
const HuespedSchema = new mongoose.Schema({
  nombres: String,
  apellido_paterno: String,
  apellido_materno: String,
  fecha_ingreso: String,
  fecha_salida: String,
  username: String,
  telefono: String,
  nacionalidad: String,
  expeclinico : Boolean,
  status: String,
  condominio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominio'
  },
  cuenta: {
    renta: Number,
    deposito: Number,
    comentarios: String
  },
  gastos_mensuales: [{
    fecha: String,
    electricidad: Number,
    aire_acondicionado: Number,
    mantenimientos_extras: Number
  }]
})
const Huesped = mongoose.model('Huesped', HuespedSchema)
export { Huesped }
