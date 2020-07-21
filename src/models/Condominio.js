const mongoose = require('../libs/database')
var mongoose_delete = require('mongoose-delete');
const CondominioSchema = new mongoose.Schema({
  numero: Number,
  edificio: String,//especificar el edificio del condo
  status: {
    type: String,
    default: 'Disponible'
  },//ocupado vacio comprado
  numero_cuartos:Number,
  huesped_actual: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Huesped'
  },
  reportes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incidencia'
  }],
  historial_ocupantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Huesped'
  }]
})
CondominioSchema.plugin(mongoose_delete, { deletedAt : true })
CondominioSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] })
const Condominio = mongoose.model('Condominio', CondominioSchema)
export { Condominio }
