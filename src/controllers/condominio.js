import handlebars from 'handlebars'
import {Condominio} from '../models/Condominio'
import {Huesped} from '../models/Huesped'
import {Incidencia} from '../models/Incidencia'
import webpush from '../webpush'
let pushSubscription

let index = {}
index.suscribir = async (req, res) => {
  pushSubscription = req.body;
  res.sendStatus(200)
}

index.create_incidencia = async (req,res) => {//actualizar incidencia, pasarlo a modelo nuevo
  const condominio = await Condominio.findById(req.params.condoID)
  const huesped = await Huesped.findById(req.param(req.params.huespedID))
  const incidencia = {
    huesped : req.params.huespedID,
    fecha: req.body.fecha,
    comentario: req.body.comentario,
    mantenimiento: {
      nombre: req.body.nombre_mantenimiento,
      area: req.body.area_mantenimiento
    }
  }
  const reporte = new Incidencia({...incidencia})
  await reporte.save()
  condominio.reportes.push(reporte)
  await condominio.save()
  
  // Payload Notification
  /*const payload = JSON.stringify({
    title: "Nueva incidencia",
    message : `Condo: ${condominio.numero}`
  });
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscription, payload);
  } catch (error) {
    console.log(error);
  }*/
  res.sendStatus(200)
}
index.create_condominio = async (req,res) => {
  const condominio = new Condominio({...req.body})
  await condominio.save()
  await res.sendStatus(200)
}
index.render_create_incidencia = async (req,res) => {
  res.render('incidencia')
}

module.exports = index
