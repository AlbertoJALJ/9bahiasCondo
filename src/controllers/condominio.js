import handlebars from 'handlebars'
import { Condominio } from '../models/Condominio'
import { Huesped } from '../models/Huesped'
import { Incidencia } from '../models/Incidencia'
import { Mantenimiento } from '../models/Mantenimiento'
import moment from 'moment'
const hotelEmail = process.env.email
let now = moment()
moment.locale('es')
let pushSubscription
let index = {}
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});

//API
index.getTipoIncidencia = async (req, res) => {
  if (req.headers.tipo) {
    Mantenimiento.find({ tipo: req.headers.tipo }, (err, mantenimiento) => {
      (err) ? console.log(err) : res.send(mantenimiento)
    })
  }
}
index.getTipoIncidenciaEn = async (req, res) => {
  if (req.headers.tipo) {
    Mantenimiento.find({ tipo_en: req.headers.tipo }, (err, mantenimiento) => {
      (err) ? console.log(err) : res.send(mantenimiento)
    })
  }
}
//API
index.create_mantenimiento = async (req, res) => {
  const mantenimiento = new Mantenimiento({ ...req.body })
  await mantenimiento.save()
  res.sendStatus(200)
}
index.create_incidencia_es = async (req, res) => {
  const huesped = await Huesped.findById(req.params.userID)
  const condominio = await Condominio.findById(req.params.condoID)
  const mantenimiento = await Mantenimiento.findOne({ nombre: req.body.mantenimiento })
  const incidencia = {
    huesped: req.params.userID,
    condominio: req.params.condoID,
    fecha: moment().format("DD/MM/YYYY hh:mm"),
    comentario: req.body.comentarios_mantenimiento,
    mantenimiento: {
      tipo: mantenimiento.tipo,
      tipo_en: mantenimiento.tipo_en,
      nombre: mantenimiento.nombre,
      nombre_en: mantenimiento.nombre_en,
      area: req.body.area_mantenimiento
    }
  }
  const reporte = new Incidencia({ ...incidencia })
  await reporte.save()
  condominio.reportes.push(reporte)
  await condominio.save()
  var incidenciaReport = {
    from: '9 Bahías condo Huatulco',
    to: hotelEmail,
    subject: 'Nueva reporte de incidencia',
    html: `
    <h1>Nuevo reporte de incidencia</h1>
    <h3>Reporte generado por ${huesped.nombres} ${huesped.apellido_paterno} ${huesped.apellido_materno} </h3>
    <p> Mantenimiento de tipo : ${incidencia.mantenimiento.tipo} (${incidencia.mantenimiento.nombre}) </p>
    <p> Condominio : ${condominio.numero} Edificio: ${condominio.edificio}</p>
    `
  };
  try {
    await transporter.sendMail(incidenciaReport)
    console.log('Reportado al administrador')
    req.flash('mensaje', `Tu problema será atendido lo más pronto posible`)
  res.redirect(`/huesped/miperfil/es/${req.user.userID}`)
  } catch (error) {
    req.flash('mensaje', `Ocurrió un problema, contacta con el administrador`)
    res.redirect(`/huesped/miperfil/es/${req.user.userID}`)
  }
}
index.create_incidencia_en = async (req, res) => {
  const huesped = await Huesped.findById(req.params.userID)
  const condominio = await Condominio.findById(req.params.condoID)
  const mantenimiento = await Mantenimiento.findOne({ nombre: req.body.mantenimiento })
  const incidencia = {
    huesped: req.params.huespedID,
    condominio: req.params.condoID,
    fecha: moment().format("DD/MM/YYYY hh:mm"),
    comentario: req.body.comentarios_mantenimiento,
    mantenimiento: {
      tipo: mantenimiento.tipo,
      tipo_en: mantenimiento.tipo_en,
      nombre: mantenimiento.nombre,
      nombre_en: mantenimiento.nombre_en,
      area: req.body.area_mantenimiento
    }
  }
  const reporte = new Incidencia({ ...incidencia })
  await reporte.save()
  condominio.reportes.push(reporte)
  await condominio.save()

  var incidenciaReport = {
    from: '9 Bahías condo Huatulco',
    to: hotelEmail,
    subject: 'Nueva reporte de incidencia',
    html: `
    <h1>Nuevo reporte de incidencia</h1>
    <h3>Reporte generado por ${huesped.nombres} ${huesped.apellido_paterno} ${huesped.apellido_materno} </h3>
    <p> Mantenimiento de tipo : ${incidencia.mantenimiento.tipo} (${incidencia.mantenimiento.nombre}) </p>
    <p> Condominio : ${condominio.numero} Edificio: ${condominio.edificio}
    `
  };
  try {
    await transporter.sendMail(incidenciaReport)
    console.log('Reportado al administrador')
    req.flash('mensaje', `Your problem will be solved as soon as possible`)
    res.redirect(`/huesped/miperfil/en/${req.user.userID}`)
  } catch (error) {
    console.log(error)
    req.flash('mensaje', `There is a problem, please contact admin`)
    res.redirect(`/huesped/miperfil/en/${req.user.userID}`)
  }
}
index.create_condominio = async (req, res) => {
  const condominio = new Condominio({ ...req.body })
  await condominio.save()
  await res.redirect('/condominios')
}
index.render_create_incidencia_en = async (req, res) => {
  const huesped = await Huesped.findById(req.params.userID)
  res.render('user/incidencia_en', { layout: false, huesped })
}
index.render_create_incidencia_es = async (req, res) => {
  const huesped = await Huesped.findById(req.params.userID)
  res.render('user/incidencia_es', { layout: false, huesped })
}
index.render_create_condominio = async (req, res) => {
  res.render('admin/condominio/create_condominio')
}
index.lista_incidencia = async (req, res) => {
  const incidencias = await Incidencia.find().populate({ path: 'huesped', model: Huesped }).populate({ path: 'condominio', model: Condominio }).sort('asc')
  incidencias.reverse()
  res.render('admin/incidencia/listado', { incidencias })
}
index.incidencia = async (req, res) => {
  const incidencia = await Incidencia.findById(req.params.id).populate({ path: 'huesped', model: Huesped }).populate({ path: 'condominio', model: Condominio })
  res.send(incidencia)
}
index.incidencia_resuelta = async (req, res) => {
  await Incidencia.findByIdAndUpdate(req.params.id, { status: 'Resuelto' }, (err) => {
    (err) ? console.log(err) : res.redirect(`/condominio/incidencia/lista`)
  })
}
index.condominios = async (req, res) => {
  const condominios = await Condominio.find({}).populate({ path: 'huesped_actual', model: Huesped })
  res.render('admin/condominio/list', { condominios })
}
index.delete_condominio = async (req, res) => {
  await Huesped.findOne({ condominio: req.params.id }, (err, huesped) => {
    if (huesped) { // retornar con flash un mensaje
      res.render('admin/condominio/list', { mensaje: 'No se puede eliminar, está ocupado' })
    } else Condominio.deleteById(req.params.id, (err, condominio) => {
      if (err) console.log(err)
      req.flash('mensaje', `Condominio eliminado correctamente`)
      res.redirect('/condominios')
      
    })
  })
}
index.liberar_condominio = async (req, res) => {
  const condominio = await Condominio.findById(req.params.id)
  const huesped = await Huesped.findById(condominio.huesped_actual)
  condominio.status = 'Disponible'
  condominio.huesped_actual = null
  condominio.save()
  huesped.condominio = null
  huesped.save()
  res.redirect('/condominios')
}
index.historial_condominios = async (req, res) => {
  const condominio = await Condominio.findById(req.params.id).populate({ path: 'historial_ocupantes', model: Huesped })
  console.log(condominio.historial_ocupantes)
  res.render('admin/condominio/historial_huespeds', { huespedes: condominio.historial_ocupantes })
}

module.exports = index
