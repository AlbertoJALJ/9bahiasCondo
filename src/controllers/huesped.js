import handlebars from 'handlebars'
import {Condominio} from '../models/Condominio'
import {Huesped} from '../models/Huesped'
let index = {}


index.huesped = async (req,res) => {
  const huesped = await Huesped.findById(req.params.id).populate({path: 'condominio', model: Condominio})
  res.send(huesped)
}

index.render_create_huesped = async (req,res) => {
  res.render('admin/create_huesped')
}
index.update_huesped = async (req,res) => {
  await Huesped.findByIdAndUpdate(req.params.id, {...req.body}, (err) => {
    (err) ? console.log(err) : res.send('actualiizado correctamente')
  })
}
index.delete_huesped = async (req,res) => {
  await Huesped.findByIdAndRemove(req.params.id, (err) => (err) ? console.log(err) : res.sendStatus(200))
}
index.create_huesped = async (req,res) => {
  const status = 'activo'
  const huespedes = new Huesped({...req.body, status})
  await huespedes.save()
  await res.sendStatus(200)
}
index.cuenta = async (req,res) => {
  const cuenta = {
    renta : req.body.renta,
    deposito : req.body.deposito,
    comentarios: req.body.comentarios
  }
  Huesped.findByIdAndUpdate(req.params.id, {cuenta} , (err) => {
    (err) ? console.log(err) : res.sendStatus(200)
  })
}
index.gastos_mensuales = async (req,res) => {
  const gastos_mensuales = {
    fecha: req.body.fecha,
    electricidad: parseInt(req.body.electricidad),
    aire_acondicionado: parseInt(req.body.aire_acondicionado),
    mantenimientos_extras: parseInt(req.body.mantenimientos_extras)
  }
  await Huesped.findById(req.params.id, (err,huesped) => {
    huesped.gastos_mensuales.push({...req.body})
    huesped.save()
    res.sendStatus(200)
  })
}

module.exports = index
