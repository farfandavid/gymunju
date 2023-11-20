const usuarioCtrl = require ('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.get('/:id', autCtrl.verifyToken, usuarioCtrl.getUsuario);
router.post('/', usuarioCtrl.createUsuario);
router.put('/:id', autCtrl.verifyToken, usuarioCtrl.editUsuario);
router.delete('/:id', autCtrl.verifyToken, usuarioCtrl.deleteUsuario);
router.post('/login', usuarioCtrl.loginUsuario);


router.get('/search/:search', usuarioCtrl.getUsuarioUsername);

router.get('/search/usr/:search', usuarioCtrl.getUsuarioAlumno);
module.exports = router;