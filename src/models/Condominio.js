const mongoose = require('../libs/database')

const CondominioSchema = new mongoose.Schema({
  numero: Number,
  edificio: String,//especificar el edificio del condo
  status: String,//ocupado vacio comprado
  huesped_actual: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Huesped'
  },
  reportes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incidencia'
  }]
})
const Condominio = mongoose.model('Condominio', CondominioSchema)
export { Condominio }
