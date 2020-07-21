var express = require('express')
var router = express.Router()
import {isAdmin, isUser} from '../libs/auth'
import passport from 'passport'
import User from '../models/User'
import {Huesped} from '../models/Huesped'

//Español
router.get('/login/es', (req,res) => {
  res.render('login_es', {layout:false})
})
router.post('/login/es', passport.authenticate('local'), function(req, res) {
  res.redirect('/users/check/es')
});
router.get('/check/es', isUser, (req,res) => {
  if (req.user) {
    if (req.user.isAdmin){
      res.redirect('/')
    }
    else res.redirect(`/huesped/miperfil/es/${req.user.userID}`)
  }
})
//Inglés
router.get('/login/en', (req,res) => {
  res.render('login_en', {layout:false})
})
router.post('/login/en', passport.authenticate('local'), function(req, res) {
  res.redirect('/users/check/en')
});
router.get('/check/en', isUser, (req,res) => {
  if (req.user) {
    if (req.user.isAdmin){
      res.redirect('/')
    }
    else res.redirect(`/huesped/miperfil/en/${req.user.userID}`)
  }
})


router.get('/logout', isUser, function(req, res) {
  req.logout();
  res.redirect('/users/login/en')
});

router.post('/register', isAdmin, async (req, res) => {
  await User.register(new User({
    username: req.body.username,
    name: req.body.name,
    isAdmin: Boolean(req.body.isAdmin)
  }), req.body.password, (err, user) => {
    (err) ? res.send(err) : res.send(user)
  })
})

router.get('/assignUser/:id', isUser, async (req, res) => {
  const huesped = await Huesped.findById(req.params.id)
  req.userID = huesped.id
  const username = `${huesped.nombres}${(Math.round(Math.random() * 1E3))}`.replace(/ /g, "")
  const password = (Math.round(Math.random() * 1E5)).toString()
  User.register(new User({ username : username, name: huesped.nombres, userID: huesped.id }), password, (err, user) => {
    if (err) console.log(err.message)
    else  Huesped.findByIdAndUpdate(req.params.id,{username}, (err) => {
      if (err) console.log(err.message)
      req.flash('mensaje', `Nombre de usuario: ${username} contraseña: ${password}`)
      res.redirect(`/huesped/profile/${req.params.id}`)
    })
  })
})

module.exports = router
