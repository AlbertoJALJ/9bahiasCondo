import handlebars from 'handlebars'
import {Condominio} from '../models/Condominio'
import {Huesped} from '../models/Huesped'
import moment from 'moment'
import {Incidencia} from "../models/Incidencia"
import translate from 'translate'
let now = moment()
moment.locale('es')
let index = {}

index.getCondo = async (req, res) => {
  Condominio.find({edificio: req.params.edificio, status: "Disponible"}, (err, edificio) => {
    res.send(edificio)
  })
}
index.huesped = async (req, res) => {
  const huesped = await Huesped.findById(req.params.id).populate({path: 'condominio', model: Condominio})
  res.send(huesped)
}
index.render_create_huesped = async (req, res) => {
  res.render('admin/huesped/create_huesped')
}
index.update_huesped = async (req, res) => {
  await Huesped.findByIdAndUpdate(req.params.id, {...req.body}, (err) => {
    req.flash('mensaje', `Huesped actualizado correctamente`)
    (err) ? console.log(err) : res.redirect(`/huesped/profile/${req.params.id}`)
  })
}
index.delete_huesped = async (req, res) => {
  await Huesped.deleteById(req.params.id, (err,huesped) => {
    Condominio.findByIdAndUpdate(huesped.condominio,{status:'Disponible', huesped_actual: null}, (err) => {
      (err) ? console.log(err) : ''
    })
    res.sendStatus(200)
  })
}
index.create_huesped = async (req, res) => {
  if (req.body.expeclinico) req.body.expeclinico = true
  req.body.fecha_ingreso = moment(req.body.fecha_ingreso, 'yyyy-MM-DD').format('L')
  const status = 'activo'
  const huespedes = new Huesped({...req.body, status})
  huespedes.historial_condominios.push(req.body.condominio)
  await huespedes.save()
  await Condominio.findById(req.body.condominio, (err,condominio) => {
    condominio.huesped_actual = huespedes.id
    condominio.status = "Ocupado"
    condominio.historial_ocupantes.push(huespedes.id)
    condominio.save()
  })
  await req.flash('mensaje', `Huesped creado correctamente`)
  await res.redirect(`/huesped/profile/${huespedes.id}`)
}
index.cuenta = async (req, res) => {
  const cuenta = {
    renta: req.body.renta,
    deposito: req.body.deposito,
    comentarios: req.body.comentarios
  }
  Huesped.findByIdAndUpdate(req.params.id, {cuenta}, (err) => {
    (err) ? console.log(err) : res.redirect(`/huesped/profile/${req.params.id}`)
  })
}
index.gastos_mensuales = async (req, res) => {
  if (req.body.mantenimientos_extras){
    const gastos_mensuales = {
      fecha: moment().format('L'),
      electricidad: parseInt(req.body.electricidad),
      aire_acondicionado: parseInt(req.body.aire_acondicionado),
      agua: parseInt(req.body.agua),
      mantenimientos_extras: parseInt(req.body.mantenimientos_extras),
      mantenimientos_extras_desc: req.body.mantenimientos_extras_desc,
      total: parseInt(req.body.electricidad) + parseInt(req.body.aire_acondicionado) + parseInt(req.body.agua) + parseInt(req.body.mantenimientos_extras)
    }
    await Huesped.findById(req.params.id, (err, huesped) => {
      huesped.gastos_mensuales.push({...gastos_mensuales})
      huesped.save()
      req.flash('mensaje', `Gastos mensuales registrados`)
      res.redirect(`/huesped/profile/${req.params.id}`)
    })
  } else {
    const gastos_mensuales = {
      fecha: moment().format('L'),
      electricidad: parseInt(req.body.electricidad),
      aire_acondicionado: parseInt(req.body.aire_acondicionado),
      agua: parseInt(req.body.agua),
      total: parseInt(req.body.electricidad) + parseInt(req.body.aire_acondicionado) + parseInt(req.body.agua)
    }
    await Huesped.findById(req.params.id, (err, huesped) => {
      huesped.gastos_mensuales.push({...gastos_mensuales})
      huesped.save()
      res.redirect(`/huesped/profile/${req.params.id}`)
    })
  }
}
index.huespedes = async (req, res) => {
  const huespedes = await Huesped.find({}).populate({path: 'condominio', model: Condominio})
  res.render('admin/huesped/list', {huespedes})
}
index.render_cuenta = async (req, res) => {
  const huesped = await Huesped.findById(req.params.id)
  res.render('admin/huesped/cuenta', {huesped})
}
index.render_gastos_mensuales = async (req, res) => {
  const huesped = await Huesped.findById(req.params.id)
  res.render('admin/huesped/gastos', {huesped})
}
index.render_edit = async (req, res) => {
  const huesped = await Huesped.findById(req.params.id)
  huesped.fecha_ingreso = moment(huesped.fecha_ingreso, "DD/MM/YYYY").format('yyyy-MM-DD')
  res.render('admin/huesped/edit', {huesped})
}
index.edit = async (req, res) => {
  await Huesped.findById(req.params.id, (err, huesped) => {
    (err) ? console.log(err) : res.render('admin/huesped/edit', {huesped})
  })
}
index.render_profile = async (req,res) => {
  const huesped = await Huesped.findById(req.params.id)
    .populate({
      path: 'condominio',
      model: Condominio,
      populate: {
        path: 'reportes',
        model: Incidencia
      }
    })
  huesped.fecha_ingreso = moment(huesped.fecha_ingreso, "DD/MM/YYYY").format('yyyy-MM-DD')
  res.render('admin/huesped/perfil', {huesped, mensaje: req.flash('mensaje')})
}
index.miPerfil = async (req,res) => {
  const huesped = await Huesped.findById(req.params.id)
    .populate({
    path: 'condominio',
    model: Condominio,
    populate: {
      path: 'reportes',
      model: Incidencia
    }
  })
  huesped.fecha_ingreso = moment(huesped.fecha_ingreso, "DD/MM/YYYY").format('yyyy-MM-DD')
  res.render('user/huesped_profile_es', {layout:false,huesped, mensaje: req.flash('mensaje')})
}
index.miPerfilEn = async (req,res) => {
  const huesped = await Huesped.findById(req.params.id)
    .populate({
      path: 'condominio',
      model: Condominio,
      populate: {
        path: 'reportes',
        model: Incidencia
      }
    })
  huesped.fecha_ingreso = moment(huesped.fecha_ingreso, "DD/MM/YYYY").format('yyyy-MM-DD')
  res.render('user/huesped_profile_en', {layout:false,huesped, mensaje: req.flash('mensaje')})
}
index.desc_gastos = async (req,res) => {
  const huesped = await Huesped.findById(req.params.huespedID)
  const gasto = huesped.gastos_mensuales.id(req.params.gastoID)
  res.render('admin/huesped/desc_gastos', {gasto})
}
module.exports = index
