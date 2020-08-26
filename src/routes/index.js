var express = require('express');
var router = express.Router();
import {isAdmin, isUser} from '../libs/auth'
import {
  /* render_update_password_es,
  update_password_es, */
  render_create_huesped,
  getCondo,
  create_huesped,
  cuenta,
  gastos_mensuales,
  huesped,
  update_huesped,
  delete_huesped,
  huespedes,
  render_cuenta,
  render_gastos_mensuales,
  render_edit,
  edit,
  render_profile,
  miPerfil,
  desc_gastos,
  desc_gastos_es,
  desc_gastos_en,
  miPerfilEn,
  render_update_condominio_huesped,
  update_condominio_huesped
} from '../controllers/huesped'

import {
  create_condominio,
  create_incidencia_en,
  create_incidencia_es,
  render_create_incidencia_en,
  render_create_incidencia_es,
  render_create_condominio,
  create_mantenimiento,
  getTipoIncidencia,
  lista_incidencia,
  incidencia,
  incidencia_resuelta,
  condominios,
  delete_condominio,
  liberar_condominio,
  historial_condominios,
  getTipoIncidenciaEn,
  mailsend
} from '../controllers/condominio'
router.get('/getCondos/:edificio', getCondo)
router.get('/getTipoIncidencia/', getTipoIncidencia)
router.get('/getTipoIncidencia/en', getTipoIncidenciaEn)

router.get('/',isAdmin, async function(req, res) {
  console.log(req.session);
  res.render('index');
})
router.get('/huesped/create/', isAdmin, render_create_huesped)
router.post('/huesped/edit/:id', isAdmin, update_huesped)
router.get('/huesped/delete/:id', isAdmin, delete_huesped)
router.get('/huesped/:id', isAdmin, huesped)
router.post('/huesped/create/', isAdmin, create_huesped)
router.get('/huesped/cuenta/:id', isAdmin,render_cuenta)
router.post('/huesped/cuenta/:id', isAdmin,cuenta)
router.get('/huesped/gastos/:id', isAdmin,render_gastos_mensuales)
router.post('/huesped/gastos/:id', isAdmin,gastos_mensuales)
router.get('/huespedes/', isAdmin, huespedes)
router.get('/huesped/edit/:id', isAdmin, render_edit)
router.post('/huesped/edit/:id', isAdmin, edit)
router.get('/huesped/profile/:id', isAdmin, render_profile)
router.get('/huesped/desc_gastos/:huespedID/:gastoID', isAdmin, desc_gastos)
router.get('/huesped/desc_gastos_es/:huespedID/:gastoID', isUser, desc_gastos_es)
router.get('/huesped/desc_gastos_en/:huespedID/:gastoID', isUser, desc_gastos_en)
router.get('/huesped/condominio/:id', render_update_condominio_huesped)
router.post('/huesped/condominio/:id', update_condominio_huesped)

router.get('/condominio/create', isAdmin, render_create_condominio)
router.post('/condominio/create', isAdmin, create_condominio)
router.get('/condominio/incidencia/lista', isAdmin, lista_incidencia)
router.get('/condominio/incidencia/:id', isAdmin, incidencia)
router.get('/condominio/incidencia/resuelta/:id', isAdmin, incidencia_resuelta)
router.get('/condominios',isAdmin, condominios)
router.get('/condominio/delete/:id', isAdmin, delete_condominio)
router.get('/condominio/free/:id', isAdmin, liberar_condominio)
router.get('/condominio/huespeds/:id', isAdmin,historial_condominios)

router.get('/condominio/incidencia/en/create/:userID/:condoID', isUser, render_create_incidencia_en)
router.get('/condominio/incidencia/es/create/:userID/:condoID', isUser, render_create_incidencia_es)
router.post('/condominio/incidencia/es/create/:userID/:condoID', isUser, create_incidencia_es)
router.post('/condominio/incidencia/en/create/:userID/:condoID', isUser, create_incidencia_en)


router.get('/huesped/miperfil/es/:id', isUser, miPerfil)
router.get('/huesped/miperfil/en/:id', isUser, miPerfilEn)
/* router.get('/huesped/update/password', isUser, render_update_password_es)
router.post('/huesped/update/password', isUser, update_password_es) */


router.post('/mantenimiento/create/', isAdmin, create_mantenimiento )


module.exports = router;
