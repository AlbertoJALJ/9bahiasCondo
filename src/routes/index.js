var express = require('express');
var router = express.Router();
import {
  render_create_huesped,
  create_huesped,
  cuenta,
  gastos_mensuales,
  huesped,
  update_huesped,
  delete_huesped
} from '../controllers/huesped'

import {
  create_condominio,
  create_incidencia,
  render_create_incidencia,
} from '../controllers/condominio'

router.get('/huesped/create/', render_create_huesped)
router.post('/huesped/edit/:id', update_huesped)
router.post('/huesped/delete/:id',delete_huesped)
router.get('/condominio/incidencia/create/:userID/:condoID', render_create_incidencia)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
router.get('/huesped/:id', huesped)
router.post('/huesped/create/', create_huesped)
router.post('/huesped/cuenta/:id',cuenta)
router.post('/huesped/gastos/:id',gastos_mensuales)

router.post('/condominio/create', create_condominio)
router.post('/condominio/incidencia/create/:userID/:condoID', create_incidencia)
module.exports = router;
