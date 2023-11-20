const alumnoCtrl = require ('./../controllers/alumno.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, alumnoCtrl.getAlumnos);
router.post('/', autCtrl.verifyToken, alumnoCtrl.createAlumno);
router.get('/:id', autCtrl.verifyToken, alumnoCtrl.getAlumno);
router.put('/:id', autCtrl.verifyToken, alumnoCtrl.editAlumno);
router.delete('/:id', autCtrl.verifyToken, alumnoCtrl.deleteAlumno);

router.post('/:id/cuota', autCtrl.verifyToken, alumnoCtrl.insertCuota);

router.get('/search/:search', alumnoCtrl.getAlumnosBusquedaDni);

module.exports = router;