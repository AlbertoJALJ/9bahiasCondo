const mongoose = require('../libs/database')
var mongoose_delete = require('mongoose-delete');

const HuespedSchema = new mongoose.Schema({
  historial_condominios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominio'
  }],
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
    agua: Number,
    mantenimientos_extras: Number,
    mantenimientos_extras_desc: String,
    total : Number
  }]
})
HuespedSchema.plugin(mongoose_delete, { deletedAt : true })
HuespedSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] })
const Huesped = mongoose.model('Huesped', HuespedSchema)
export { Huesped }
