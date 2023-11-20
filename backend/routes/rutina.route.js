const rutinaCtrl = require ('./../controllers/rutina.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, rutinaCtrl.getRutinas);
router.get('/:id', autCtrl.verifyToken, rutinaCtrl.getRutina);
router.post('/', autCtrl.verifyToken, rutinaCtrl.createRutina);
router.put('/:id', autCtrl.verifyToken, rutinaCtrl.editRutina);
router.delete('/:id', autCtrl.verifyToken, rutinaCtrl.deleteRutina);

router.get('/alumno/:idAlumno', autCtrl.verifyToken, rutinaCtrl.getRutinasDeAlumno);

module.exports = router;