const asistenciaCtrl = require ('./../controllers/asistencia.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, asistenciaCtrl.getAsistencias);
router.get('/:id', autCtrl.verifyToken, asistenciaCtrl.getAsistencia);
router.post('/', autCtrl.verifyToken, asistenciaCtrl.createAsistencia);
router.put('/:id', autCtrl.verifyToken, asistenciaCtrl.editAsistencia);
router.delete('/:id', autCtrl.verifyToken, asistenciaCtrl.deleteAsistencia);

router.get('/alumno/:idAlumno', autCtrl.verifyToken, asistenciaCtrl.getAsistenciasDeAlumno);

module.exports = router;