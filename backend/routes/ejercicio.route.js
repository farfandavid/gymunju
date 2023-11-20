const ejercicioCtrl = require ('./../controllers/ejercicio.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, ejercicioCtrl.getEjercicios);
router.get('/:id', autCtrl.verifyToken, ejercicioCtrl.getEjercicio);
router.post('/', autCtrl.verifyToken, ejercicioCtrl.createEjercicio);
router.put('/:id', autCtrl.verifyToken, ejercicioCtrl.editEjercicio);
router.delete('/:id', autCtrl.verifyToken, ejercicioCtrl.deleteEjercicio);

module.exports = router;